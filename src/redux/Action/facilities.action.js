import { EDIT_DATA, FACILITIES_DATA, REMOVE_DATA } from "../ActionType"

export const addfacilities=(data)=>(dispatch)=>{
    dispatch({type:FACILITIES_DATA,payload:data})
}

export const removeFacility=(id)=>(dispatch)=>{
    dispatch({type:REMOVE_DATA,payload:id})
}

export const editFacility=(ID,newdata)=>(dispatch)=>{
    console.log(newdata);
    dispatch({
        type:EDIT_DATA,
        payload:{ID,newdata}
    })

}