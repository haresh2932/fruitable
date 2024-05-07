import { createContext, useReducer } from "react"
import { contactReducer } from "./reducer/contact.reducer"
import axios from "axios"
import { BASE_URL } from "../utils/utilis"
import { GET_CONTACT } from "./ActionType"

const initialState = {
    isLoading: false,
    contact: [],
    error: null
}

export const ContactContext = createContext()

export const ContactProvider = ({ children }) => {
    const [state, dispatch] = useReducer(contactReducer, initialState)

    const addContact = async (data) => {
        try {
            const response = await axios.post(BASE_URL + 'contact', data)
            return response.data
        } catch (error) {
            return error.message
        }
    }

    const getContact=async()=>{
        try {
            const response=await axios.get(BASE_URL+'contact')
           dispatch({type:GET_CONTACT,payload:response.data})
        } catch (error) {
            return error.message
        }
    }
    return (
        <ContactContext.Provider
            value={{
                ...state,
                addContact,
                getContact
            }}
        >
            {children}
        </ContactContext.Provider>
    )


}