import { createStore } from 'vuex'

const moduleCharacters = {
    namespaced: true,

    state: () => ({
        charactersCache: new Map(),
        characters: new Map(),
        loading: false,
        totalCharacters: 0,
        currentPage: 1,
        perPage: 10,
        apiPerPage: 20,
        search: ""
    }),

    mutations: {
        setLoading(state, value) { state.loading = value },

        setCharacters(state, charactersArray) {
            const map = new Map()
            charactersArray.forEach(c => map.set(c.id, c))
            state.characters = map
        },

        setCurrentPage(state, page) { state.currentPage = page },
        setTotalCharacters(state, total) { state.totalCharacters = total },
        setCache(state, { apiPage, searchKey, data }) {
            state.charactersCache.set(`${apiPage}_${searchKey}`, data)
        },
        setSearch(state, value) { state.search = value }
    },

    actions: {
        async fetchCharacters({ state, commit }) {
            commit('setLoading', true)

            const uiPage = state.currentPage
            const perPage = state.perPage
            const apiPerPage = state.apiPerPage
            const searchKey = state.search ? encodeURIComponent(state.search) : ''

            const neededApiPage = Math.ceil((uiPage * perPage) / apiPerPage)

            const cacheKey = `${neededApiPage}_${searchKey}`

            if (!state.charactersCache.has(cacheKey)) {
                try {
                    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${neededApiPage}${searchKey ? `&name=${searchKey}` : ''}`)
                    const data = await res.json()
                    commit('setTotalCharacters', data.info?.count || 0)
                    commit('setCache', { apiPage: neededApiPage, searchKey, data: data.results || [] })
                } catch {
                    commit('setCache', { apiPage: neededApiPage, searchKey, data: [] })
                    commit('setTotalCharacters', 0)
                }
            }

            const apiData = state.charactersCache.get(cacheKey) || []

            const start = ((uiPage - 1) * perPage) % apiPerPage
            const end = start + perPage

            commit('setCharacters', apiData.slice(start, end))
            commit('setLoading', false)
        }
    },

    getters: {
        getCharactersArray(state) {
            return Array.from(state.characters.values())
        },

        getIsLoading(state) { return state.loading },

        getTotalPages(state) {
            return Math.ceil(state.totalCharacters / state.perPage)
        },

        getImageById: (state) => (id) => {
            return state.characters.get(id)?.image || null
        }
    }
}

export default createStore({
    modules: {
        characters: moduleCharacters
    }
})
