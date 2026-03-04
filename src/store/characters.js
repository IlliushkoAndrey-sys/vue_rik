import api from '../api/api.js';

let abortController = null;

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
        setCharacter(state, character) {
            state.characters.set(character.id, character)
        },

        setTotalCharacters(state, total) { state.totalCharacters = total },
        setCache(state, { key, data }) {
            state.charactersCache.set(key, data)
        },
        clearCache(state) {
            state.charactersCache.clear()
        }
    },

    actions: {

        async fetchCharacters({ state, commit },{page= 1, search = ''}) {
            if(abortController) abortController.abort();
            abortController = new AbortController();

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
                    const {data} = await api.get('character', {
                        params: {page: neededApiPage, name: search},
                        signal: abortController.signal,
                    });

                    commit('setTotalCharacters', data.info?.count || 0);
                    commit('setCache', {key: cacheKey, data: data.results || []});
                } catch(err) {
                    if (err.name === 'CanceledError') return;
                    commit('setCache', { key: cacheKey, data: [] })
                    commit('setTotalCharacters', 0)
                }
            }

            const apiData = state.charactersCache.get(cacheKey) || [];

            const start = ((page - 1) * perPage) % apiPerPage
            const end = start + perPage

            commit('setCharacters', apiData.slice(start, end))
            commit('setLoading', false)
        },

        async fetchCharacterById({ state, commit }, id) {
            if (state.characters.has(id)) {
                return state.characters.get(id);
            }

            try {
                const {data} = await api.get(`character/${id}`);
                commit ('setCharacter', data);
                    return data;
                } catch {
                return null;
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
