import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            characters: [],
            loading: false
        }
    },

    mutations: {
        setCharacters(state, characters) {
            state.characters = characters
        },
        setLoading(state, value) {
            state.loading = value
        }
    },

    actions: {
        async fetchCharacters({ commit }) {
            commit('setLoading', true)

            const res = await fetch('https://rickandmortyapi.com/api/character')
            const data = await res.json()

            commit('setCharacters', data.results)
            commit('setLoading', false)
        }
    },

    getters: {
        allCharacters(state) {
            return state.characters
        },
        isLoading(state) {
            return state.loading
        }
    }
})