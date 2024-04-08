import { ADD_PRODUCTS, EDIT_PRODUCTS, GET_PRODUCTS, REMOVE_PRODUCTS } from "../ActionType";

const initialState = {
    isLoading: false,
    products: [],
    error: null
}

export const productReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case GET_PRODUCTS:
            return {
                isLoading: false,
                products: action.payload,
                error: null
            }
        case ADD_PRODUCTS:
            return {
                isLoading: false,
                products: state.products.concat(action.payload),
                error: null
            }
        case REMOVE_PRODUCTS:
            return {
                isLoading: false,
                products: state.products.filter((v) => v.id !== action.payload),
                error: null
            }
        case EDIT_PRODUCTS:
            return {
                isLoading: false,
                products: state.products.map((v) => v.id === action.payload.id ? action.payload : v),
                error: null
            }



        default:
            return state
    }
}