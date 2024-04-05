import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { facilitiesReducer } from "./facilities.reducer";
import { productReducer } from "./product.reducer";


export const rootreducers = combineReducers({
    counter: counterReducer,
    facilities:facilitiesReducer,
    products:productReducer,
});


