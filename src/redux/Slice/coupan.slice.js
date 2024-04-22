import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utils/utilis"

const initialState = {
    isLoading: false,
    coupan: [],
    error: null
}

export const addCoupan = createAsyncThunk(
    'coupan/add',

    async (data) => {
        console.log(data);
        try {
            const response = await axios.post(BASE_URL + 'coupan',data)
            console.log(response);
            return response.data

        } catch (error) {
            return error.message
        }
    }

)

const coupanSlice = createSlice({
    name: "coupan",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addCoupan.fulfilled, (state, action) => {
            console.log(state,action);
           state.coupan= state.coupan.concat(action.payload)
        })

    }

})

export default coupanSlice.reducer