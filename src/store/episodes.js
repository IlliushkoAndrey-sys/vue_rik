export const episodesModule = {
    namespaced: true,
    state: () => ({
        episodes: [],
        loading: false,
    }),
    getters: {
        seasons(state) {
            return state.episodes.reduce((acc, ep) => {
                const match = ep.episode.match(/S(\d+)/);
                if (!match) return acc;
                const season = match[1];
                if (!acc[season]) acc[season] = [];
                acc[season].push(ep);
                return acc;
            }, {});
        },
    },
    mutations: {
        setLoading(state, value) { state.loading = value; },
        appendEpisodes(state, episodes) { state.episodes.push(...episodes); },
    },
    actions: {
        async fetchAllEpisodes({ state, commit }) {
            if (state.episodes.length) return;

            commit('setLoading', true);
            let url = 'https://rickandmortyapi.com/api/episode';

            while (url) {
                const res = await fetch(url);
                const data = await res.json();
                commit('appendEpisodes', data.results);
                url = data.info.next;
            }

            commit('setLoading', false);
        },
    },
};
