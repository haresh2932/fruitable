import { GET_PRODUCTS} from "../ActionType";

const initialState = {
    isLoading: false,
    products: [],
    error: null
}

export const productReducer=(state=initialState,action)=>{
    console.log(action);

    switch (action.type){
        case GET_PRODUCTS:
            return{
                isLoading: false,  
                products:state.products.concat(action.payload),
                error: null
            }
            default:
                return state
    }
}