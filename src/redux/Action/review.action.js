// import { type } from "@testing-library/user-event/dist/type"
import { ADD_REVIEWS } from "../ActionType"
import axios from 'axios';
import { BASE_URL } from "../../utils/utilis";


export const addReview = (data) => async (dispatch) => {
    try {
        await axios.post(BASE_URL + 'review', data)
            .then((response) => dispatch({ type: ADD_REVIEWS, payload: data }))
            .catch((error) => console.log(error))
    } catch (error) {

    }
}