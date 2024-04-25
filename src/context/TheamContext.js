import { useReducer } from "react"
import { createContext } from "react"
import { theamReducer } from "./reducer/theam.reducer"
import { TOGGLE_THEAME } from "./ActionTypes"

const initialState = {
    theam: 'light'
}

export const TheamContext = createContext()


export const TheamProvider = ({ children }) => {
    const [state, dispatch] = useReducer(theamReducer, initialState)

    const toggleTheam = () => {
        const newTheam = state.theam === 'light' ? 'dark' : 'light'
        dispatch({ tyep: TOGGLE_THEAME, payload: newTheam })
    }

    return (
        <TheamContext.Provider value={{
            ...state,
            toggleTheam
        }}
        >
            {children}
        </TheamContext.Provider>
    )
}