import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";

export const rootreducers = combineReducers({
    counter: counterReducer
});


