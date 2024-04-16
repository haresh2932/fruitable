import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { facilitiesReducer } from "./facilities.reducer";
import { productReducer } from "./product.reducer";
import { reviewReducer } from "./review.reducer";
import { cartReducer } from "./cart.reducer";
import cartSlice from "../Slice/cart.slice";


export const rootreducers = combineReducers({
    counter: counterReducer,
    facilities:facilitiesReducer,
    products:productReducer,
    reviews:reviewReducer,
    cart:cartReducer,
    cart_slice:cartSlice
});


