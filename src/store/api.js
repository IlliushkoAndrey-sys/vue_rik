import axios from 'axios'


const api = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/',
    timeout: 5000,
});


api.interceptors.request.use(
    (config) => {
    console.log(`Відправка запиту на: ${config.url}`);
    return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
        if(error.response) {
            const status = error.response.status;

            switch (status) {
                case 404:
                    console.warn('Нічого не знайдено за вашим запитом');
                    break;
                case 500:
                    alert('Помилка сервера. Спробуйте пізніше');
                    break;
                default:
                    console.error(`Сталася помилка: ${status} `);
            }
        } else if (error.request) {
            alert('Мережа недоступна. Перевірте з`єднання.');
        }

        return Promise.reject(error);
    }

);

export default api;