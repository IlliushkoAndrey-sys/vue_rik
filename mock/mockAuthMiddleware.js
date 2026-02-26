import crypto from 'node:crypto'

const DEFAULT_HEADER = 'x-student-auth-token'
const DEFAULT_TTL_MS = 50_000

const sendJson = (res, statusCode, body = {}, headerName, tokenValue) => {
    res.statusCode = statusCode
    if (tokenValue) {
        res.setHeader(headerName, tokenValue)
    }
    res.setHeader('content-type', 'application/json')
    res.end(JSON.stringify(body))
}

export function createMockAuthMiddleware({ headerName = DEFAULT_HEADER, ttlMs = DEFAULT_TTL_MS } = {}) {
    const tokenState = {
        value: null,
        issuedAt: 0,
        expiresAt: 0,
    }

    const issueToken = () => {
        const issuedAt = Date.now()
        const token = crypto.randomUUID()
        tokenState.value = token
        tokenState.issuedAt = issuedAt
        tokenState.expiresAt = issuedAt + ttlMs
        console.info(`[mock-auth] Issued token ${token} at ${new Date(issuedAt).toISOString()} valid until ${new Date(tokenState.expiresAt).toISOString()}`)
        return tokenState
    }

    const invalidateToken = () => {
        tokenState.value = null
        tokenState.issuedAt = 0
        tokenState.expiresAt = 0
    }

    const isExpired = () => !tokenState.value || Date.now() >= tokenState.expiresAt

    const ensureToken = () => (tokenState.value && !isExpired() ? tokenState : issueToken())

    const writeUnauthorized = (res, reason) => {
        sendJson(
            res,
            401,
            {
                error: 'mock_auth_token_expired',
                message: reason,
                expiresAt: tokenState.expiresAt,
            },
            headerName,
            tokenState.value
        )
    }

    const routes = {
        '/mock-auth/token': (req, res) => {
            const { value, issuedAt, expiresAt } = ensureToken()
            sendJson(
                res,
                200,
                { token: value, issuedAt, expiresAt },
                headerName,
                value
            )
        },
        '/mock-auth/refresh': (req, res) => {
            const { value, issuedAt, expiresAt } = issueToken()
            sendJson(
                res,
                200,
                {
                    token: value,
                    issuedAt,
                    expiresAt,
                },
                headerName,
                value
            )
        },
        '/mock-auth/protected': (req, res) => {
            if (isExpired()) {
                writeUnauthorized(res, 'Token expired; call /mock-auth/refresh to obtain a new one.')
                return
            }

            const headerValue = req.headers[headerName]
            if (!headerValue || headerValue !== tokenState.value) {
                writeUnauthorized(res, 'Missing or invalid mock auth token header.')
                return
            }

            sendJson(
                res,
                200,
                {
                    message: 'Protected resource accessed with a valid mock token.',
                    expiresAt: tokenState.expiresAt,
                },
                headerName,
                tokenState.value
            )
        },
        '/mock-auth/logout': (_req, res) => {
            invalidateToken()
            sendJson(res, 204, {}, headerName)
        },
    }

    return (req, res, next) => {
        if (!req.url) {
            next()
            return
        }

        const url = new URL(req.url, 'http://localhost')
        const handler = routes[url.pathname]
        if (!handler) {
            if (url.pathname.startsWith('/mock-auth')) {
                sendJson(res, 404, { error: 'mock_route_not_found' }, headerName, tokenState.value)
                return
            }

            if (url.pathname.startsWith('/api')) {
                if (isExpired()) {
                    writeUnauthorized(res, 'Token expired while accessing API route.')
                    return
                }

                const headerValue = req.headers[headerName]
                if (!headerValue || headerValue !== tokenState.value) {
                    writeUnauthorized(res, 'Mock auth token missing for API call.')
                    return
                }

                res.setHeader(headerName, tokenState.value)
            }

            next()
            return
        }

        if (req.method !== 'POST' && url.pathname !== '/mock-auth/protected' && url.pathname !== '/mock-auth/logout') {
            sendJson(res, 405, { error: 'method_not_allowed' }, headerName, tokenState.value)
            return
        }

        handler(req, res)
    }
}
