import { EDIT_DATA, FACILITIES_DATA, REMOVE_DATA } from "../ActionType";

const intialState = {
    isLoding: false,
    facilities: [],
    error: null
}

export const facilitiesReducer = (state = intialState, action) => {

    console.log(action);

    switch (action.type) {
        case FACILITIES_DATA:
            return {
                ...state,
                facilities: state.facilities.concat(action.payload),
            }
        case REMOVE_DATA:
            return {
                ...state,
                facilities: state.facilities.filter((v) => v.id !== action.payload)
            }
        case EDIT_DATA:
            return {
                ...state,
                facilities: state.facilities.map((v) => v.id === action.payload.id?{...v, ...action.payload.newdata}:v)
            }
        default:
            return state;
    }
    

}