import { createStore } from 'vuex'
import moduleCharacters from '../store/characters.js'


export default createStore({
    modules: {
        characters: moduleCharacters
    }
})
