import { ADD_REVIEWS, ERROR_REVIEWS, GET_REVIEWS, LOADING_REVIEWS } from "../ActionType";

const initialValues = {
    isLoading: false,
    reviews: [],
    error: null
}

export const reviewReducer = (state = initialValues, action) => {
    console.log(action);

    switch (action.type) {
        case LOADING_REVIEWS:
            return {
                ...state,
                isLoading: true
            }
        case ERROR_REVIEWS:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case ADD_REVIEWS:
            return {
                isLoading: false,
                reviews: state.reviews.concat(action.payload),
                error: null
            }
        case GET_REVIEWS: {
            return {
                isLoading: false,
                reviews: action.payload,
                error: null
            }
        }

        default:
            return state

    }



}