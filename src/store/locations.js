const moduleLocations = {
    namespaced: true,

    state: () => ({
        locationsCache: new Map(),
        locations: new Map(),
        loading: false,
        totalLocations: 0,
        perPage: 10,
        apiPerPage: 20,
    }),

    mutations: {
        setLoading(state, value) {state.loading = value},

        setLocations(state, locationsArray) {
            const map = new Map()
            locationsArray.forEach(location => map.set(location.id, location))
            state.locations = map
        },
        setTotalLocations(state, total) {state.totalLocations = total},
        setCache(state, { apiPage, searchKey, data })  {
            state.locationsCache.set(`${apiPage}_${searchKey}`, data)
        },
        clearCache(state) {
            state.locationsCache.clear()
        }
    },

    actions: {

        async fetchLocations({ state, commit}, {page = 1, search = ''}) {
            commit('setLoading', true)

            if (page === 1) {
                commit('clearCache')
            }

            const perPage = state.perPage
            const apiPerPage = state.apiPerPage
            const searchKey = search ? encodeURIComponent(search) : ''

            const neededApiPage = Math.ceil((page * perPage) / apiPerPage)


            const cacheKey = `${neededApiPage}_${searchKey}`

            if (!state.locationsCache.has(cacheKey)) {
                try {
                    const res = await fetch(`https://rickandmortyapi.com/api/location?page=${neededApiPage}${searchKey ? `&name=${searchKey}` : ''}`)
                    const data = await res.json()
                    commit('setTotalLocations', data.info?.count || 0)
                    commit('setCache', {apiPage: neededApiPage, searchKey, data: data.results || []})
                } catch {
                    commit('setCache', {apiPage: neededApiPage, searchKey, data: []})
                    commit('setTotalLocations', 0)
                }
            }

            const apiData = state.locationsCache.get(cacheKey) || []

            const start = ((page - 1) * perPage) % apiPerPage
            const end = start + perPage

            commit('setLocations', apiData.slice(start, end))
            commit('setLoading', false)
        }
    },

    getters: {
        getLocationsArray(state) {
            return Array.from(state.locations.values())
        },

        getIsLoading(state) {return state.loading },

        getTotalPages(state) {
            return Math.ceil( state.totalLocations / state.perPage)
        }


    }
}

export default moduleLocations