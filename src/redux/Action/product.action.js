import axios from "axios"
import { GET_PRODUCTS } from "../ActionType"
import { BASE_URL } from "../../utils/utilis"

export const getProducts = () => async(dispatch) => {

    try {
        await axios.get(BASE_URL + 'products')
            .then((response) => {
                dispatch({ type: GET_PRODUCTS, payload: response.data })
            })
            .catch((error) => {
                console.log(error);
            })

    } catch {

    }

}