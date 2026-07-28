import { createStore } from 'vuex'
import moduleCharacters from './characters.js'
import moduleLocations from './locations.js'
import {episodesModule} from "@/store/episodes.js";



export default createStore({
    modules: {
        characters: moduleCharacters,
        locations: moduleLocations,
        episodes: episodesModule
    }
})
