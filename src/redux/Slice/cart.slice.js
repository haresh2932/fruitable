import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    cart: [],
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addtocart: (state, action) => {
            console.log(action);
            
            let index = state.cart.findIndex((v) => v.pid === action.payload)
            console.log(index);

            if (index !== -1) {
                state.cart[index].qty++
            } else {
                state.cart.push({ pid: action.payload, qty: 1 })
            }
            // state.cart.push({ pid: action.payload, qty: 1 })
        }
    }
})

export const { addtocart } = cartSlice.actions
export default cartSlice.reducer