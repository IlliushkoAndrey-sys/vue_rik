import { createStore } from 'vuex'
import moduleCharacters from './characters.js'
import moduleLocations from './locations.js'



export default createStore({
    modules: {
        characters: moduleCharacters,
        locations: moduleLocations,
    }
})
