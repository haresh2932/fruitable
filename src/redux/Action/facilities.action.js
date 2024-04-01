import { FACILITIES_DATA } from "../ActionType"

export const addfacilities=(data)=>(dispatch)=>{
    dispatch({type:FACILITIES_DATA,payload:data})
}