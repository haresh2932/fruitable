import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { facilitiesReducer } from "./facilities.reducer";

export const rootreducers = combineReducers({
    counter: counterReducer,
    facilities:facilitiesReducer
});


