import axios from "axios"
import { ADD_PRODUCTS, EDIT_PRODUCTS, ERROR_PRODUCTS, GET_PRODUCTS, LOADING_PRODUCTS, REMOVE_PRODUCTS } from "../ActionType"
import { BASE_URL } from "../../utils/utilis"


    export const loadingProducts = () => async(dispatch) => {
        dispatch({type:LOADING_PRODUCTS})
    }

    export const errorProducts = (error) => async(dispatch) => {
        dispatch({type:ERROR_PRODUCTS, payload:error})
    }
export const getProducts = () => async(dispatch) => {
    
    try {
        dispatch(loadingProducts()) ;
        await axios.get(BASE_URL + 'products/list-products')
            .then((response) => {
                console.log(response);
                // dispatch({ type: GET_PRODUCTS, payload: response.data })
            })
            .catch((error) => {
                console.log(error.message);
                // dispatch(errorProducts(error.message));
            })

    } catch(error) {
        dispatch(errorProducts(error.message))
    }

}

export const addProducts = (data) => async(dispatch) => {
    try {
        dispatch(loadingProducts()) ;
        await axios.post(BASE_URL + 'products',data)
            .then((response) => dispatch({type:ADD_PRODUCTS,payload:response.data}))           
            .catch((error) => 
            dispatch(errorProducts(error.message))
        )

    } catch(error) {
        dispatch(errorProducts(error.message))
    }
}

export const removeProducts = (id) => async(dispatch) => {
    try {
        dispatch(loadingProducts()) ;
        await axios.delete(BASE_URL + 'products/'+id )
            .then(dispatch({type:REMOVE_PRODUCTS,payload:id}))           
            .catch((error) =>  dispatch(errorProducts(error.message)))

    } catch(error) {
        dispatch(errorProducts(error.message))
    }
}

export const editProducts=(data)=>async(dispatch)=>{
    console.log(data);
    try {
        dispatch(loadingProducts()) ;
        await axios.put(BASE_URL + 'products/' + data.id,data)
            .then(dispatch({type:EDIT_PRODUCTS,payload:data}))           
            .catch((error) =>  dispatch(errorProducts(error.message)))

    } catch(error) {
        dispatch(errorProducts(error.message))
    }
}