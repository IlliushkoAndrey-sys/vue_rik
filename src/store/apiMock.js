import axios from 'axios'

const apiMock = axios.create({
    baseURL: '/',
    timeout: 5000,
})

// 1. Request Interceptor (вже є у тебе, залишаємо)
apiMock.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token')
    if (token) {
        config.headers['x-student-auth-token'] = token
    }
    return config
})

apiMock.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                console.info('Токен прострочено, спроба оновлення...')


                const { data } = await axios.post('/mock-auth/refresh')

                const newToken = data.token
                localStorage.setItem('auth_token', newToken)

                originalRequest.headers['x-student-auth-token'] = newToken

                return apiMock(originalRequest)
            } catch (refreshError) {
                console.error('Не вдалося оновити токен. Потрібен повний логін.')
                localStorage.removeItem('auth_token')
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default apiMock