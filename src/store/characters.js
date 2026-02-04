const moduleCharacters = {
    namespaced: true,

    state: () => ({
        charactersCache: new Map(),
        characters: new Map(),
        loading: false,
        totalCharacters: 0,
        perPage: 10,
        apiPerPage: 20,
    }),

    mutations: {
        setLoading(state, value) { state.loading = value },

        setCharacters(state, charactersArray) {
            const map = new Map()
            charactersArray.forEach(c => map.set(c.id, c))
            state.characters = map
        },

        setTotalCharacters(state, total) { state.totalCharacters = total },
        setCache(state, { apiPage, searchKey, data }) {
            state.charactersCache.set(`${apiPage}_${searchKey}`, data)
        },
        clearCache(state) {
            state.charactersCache.clear()
        }
    },

    actions: {

        async fetchCharacters({ state, commit },{page= 1, search = ''}) {
            commit('setLoading', true)

            if (page === 1) {
                commit('clearCache')
            }

            const perPage = state.perPage
            const apiPerPage = state.apiPerPage
            const searchKey = search ? encodeURIComponent(search) : ''

            const neededApiPage = Math.ceil((page * perPage) / apiPerPage)

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

            const start = ((page - 1) * perPage) % apiPerPage
            const end = start + perPage

            commit('setCharacters', apiData.slice(start, end))
            commit('setLoading', false)
        },

        async fetchCharacterById({ state, commit }, id) {
            if(state.characters.has(id)) return

            try {
                const res = await fetch(
                    `https://rickandmortyapi.com/api/character/${id}`,
                )
                const data = await res.json()

                commit('setCharacters', [
                    ...state.characters.values(),
                    data
                ])
            } catch (e) {
                console.error('Failed to fetch character', id)
            }
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

export default moduleCharacters
