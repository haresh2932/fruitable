import { applyMiddleware, createStore } from "redux"
import { rootreducers } from "./Reduce"
import {thunk} from 'redux-thunk'

export const configStore=()=>{
    const store=createStore(rootreducers,applyMiddleware(thunk))
    return store
}