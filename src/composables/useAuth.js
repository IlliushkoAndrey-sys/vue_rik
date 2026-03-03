import { ref } from 'vue'
import apiMock from '../store/apiMock.js'

const token = ref(localStorage.getItem('auth_token') || null)

export function useAuth() {
    const login = async () => {
        const res = await apiMock.post('/mock-auth/token')
        token.value = res.data.token
        localStorage.setItem('auth_token', token.value)
        return token.value
    }

    const logout = async () => {
        try {
            await apiMock.post('/mock-auth/logout')
        } finally {
            token.value = null
            localStorage.removeItem('auth_token')
        }
    }

    const isAuthenticated = () => !!token.value

    return { token, login, logout, isAuthenticated }
}