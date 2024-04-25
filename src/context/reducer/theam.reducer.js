import { TOGGLE_THEAME } from "../ActionTypes";

export const theamReducer=(state,action)=>{
    console.log(action);

    switch (action.type) {
        case TOGGLE_THEAME:
                return{
                    theam:action.payload
                }      
        default:
            return state;
    }

}