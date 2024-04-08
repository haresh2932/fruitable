import axios from "axios"
import { ADD_PRODUCTS, EDIT_PRODUCTS, GET_PRODUCTS, REMOVE_PRODUCTS } from "../ActionType"
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

export const addProducts = (data) => async(dispatch) => {
    try {
        await axios.post(BASE_URL + 'products',data)
            .then((response) => dispatch({type:ADD_PRODUCTS,payload:response.data}))           
            .catch((error) => console.log(error))

    } catch {

    }
}

export const removeProducts = (id) => async(dispatch) => {
    try {
        await axios.delete(BASE_URL + 'products/' + id)
            .then((response) => dispatch({type:REMOVE_PRODUCTS,payload:id}))           
            .catch((error) => console.log(error))

    } catch {

    }
}

export const editProducts=(data)=>async(dispatch)=>{
    console.log(data);
    try {
        await axios.put(BASE_URL + 'products/' + data.id)
            .then((response) => dispatch({type:EDIT_PRODUCTS,payload:data}))           
            .catch((error) => console.log(error))

    } catch {

    }
}