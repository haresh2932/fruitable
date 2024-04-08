import { ADD_REVIEWS } from "../ActionType";

const initialValues = {
    isLoading: false,
    reviews: [],
    error: null
}

export const reviewReducer = (state = initialValues, action) => {
    console.log(action);

    switch (action.type) {
        case ADD_REVIEWS:
            return {
                ...state,
                reviews: state.reviews.concat(action.payload),
            }



        default:
            return state

    }



}