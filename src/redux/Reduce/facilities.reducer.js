import { FACILITIES_DATA } from "../ActionType";

const intialState = {
    isLoding: false,
    facilities: [],
    error: null
}

export const facilitiesReducer = (state = intialState, action) => {

    console.log(action);

    switch (action.type) {
        case FACILITIES_DATA :
            return {
                facilities :state.facilities.concat(action.payload),
            }

        default:
            return state;
    }

}