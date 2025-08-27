import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "../store/store";

interface employee {
    id: number,
    name: string,
    username: string,
    email: string,
    address: address,
    phone: string,
    website: string,
    company: company
}
interface address {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: geo
}
interface geo {
    lat: string,
    lng: string
}
interface company {
    name: string,
    catchPhrase: string,
    bs: string
}

export const fetchEmployeeList = createAsyncThunk("employees/fetchEmployees", async () => {
    console.log("Inside fetchEmployeeList")
    try {
        const response = await axios.get<employee[]>("https://jsonplaceholder.typicode.com/users")
        if(response.data) {
            console.log("Response Data", response.data)
            return response.data
        }
        console.log("Response Data is empty", [])
        return []
    } catch (error) {
        console.log("api call Error", error)
    }
})

const initialState : employee[] = []

const employeeList = createSlice({
    name: "employeeList",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchEmployeeList.fulfilled, (state, action) => {
           return action.payload ?? []
        })
    }
})

export default employeeList.reducer;
export const employeeData = (state) => state.employeedata.values;
