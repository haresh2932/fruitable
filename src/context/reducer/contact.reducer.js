import { ADD_CONTACT, GET_CONTACT } from "../ActionType";

export const contactReducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contact: state.contact.concat(action.payload)
            }
        case GET_CONTACT:
            return {
                ...state,
                contact:action.payload
            }


        default:
            return state
    }
}