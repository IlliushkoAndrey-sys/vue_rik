# Auth Header Middleware Prompt

## Objective
Create a mock authentication header workflow for the student-facing API layer so front-end consumers can practice handling expiring tokens and 401 refresh logic without hitting the real identity provider.

## Plan Requirements
1. Inspect existing API middleware stack (e.g., Axios interceptors or Express middlewares) and document current request/response flow.
2. Introduce a mock middleware that issues a token, injects it into every outbound response header, and logs issuance time.
3. Store the token server-side (in memory is fine) with a 50-second TTL; once expired, subsequent calls must return `401 Unauthorized` with a clear error body.
4. Ensure new middleware is toggleable via env flag (e.g., `VITE_USE_MOCK_AUTH=true`).
5. Provide usage notes for students: how to obtain the token, how to detect expiry, and how to request a fresh token.

## Deliverables
- Updated middleware file(s) plus any new helper modules.
- Documentation snippet (README or new guide) explaining the mock auth flow and headers to expect.
- At least one automated or manual test description that covers token expiry -> 401 path.

## Constraints & Tips
- Keep the token logic standalone so it can later be swapped with a real auth provider.
- Prefer dependency-free utilities; if a library is required, justify it.
- Use consistent header naming (`x-student-auth-token`).
- Surface expiry timestamp in responses to aid client-side timers.
- Remember to clean up timers/intervals to avoid memory leaks during dev hot reloads.

## Outstanding Questions
- Which routes should enforce the mock auth (all API calls or specific namespaces)? - all api calls
- Should expired tokens trigger an automatic re-issue endpoint, or must students call a dedicated refresh route? - students must call a dedicated refresh 
- Do we need role-based variations (student vs. admin) for this exercise? -no, just 1 role
