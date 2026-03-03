import axios from 'axios'

const api = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/',
    timeout: 5000,
})

api.interceptors.request.use(
    (config) => {
        console.log(`Запит на: ${config.url}`)
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 404:
                    console.warn('Нічого не знайдено за вашим запитом')
                    break
                case 500:
                    alert('Помилка сервера. Спробуйте пізніше')
                    break
                default:
                    console.error(`Сталася помилка: ${error.response.status}`)
            }
        } else if (error.request) {
            alert('Мережа недоступна. Перевірте з’єднання.')
        }
        return Promise.reject(error)
    }
)

export default api