import { createSlice } from "@reduxjs/toolkit"

const initialState={
    cart:[]
}

export const cartSlice=createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        addtocart:(state,action)=>{
            console.log(action);
            state.cart.push(action.payload)
        }
    }
})

export const {addtocart}=cartSlice.actions
export default cartSlice.reducer