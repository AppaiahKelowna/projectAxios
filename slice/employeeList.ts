import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { store } from "../store/store";

export interface employee {
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

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 5000,
    headers: {'Content-Type': 'application/json'}
})

export const fetchEmployeeList = createAsyncThunk("employees/fetchEmployees", async () => {
    console.log("Inside fetchEmployeeList")
    try {
        const response = await api.get<employee[]>("/users")
         const data = response.data ? response.data : []
         console.log("Response Data", data)
         return data
    } catch (error) {
        console.log("api call Error", error)
        return []
    }
})

export const fetchEachEmployeeByID = createAsyncThunk("user/fetchEachUser", async (id) => {
    try {
        const response = await api.get<employee>(`/users/${id}`)
        const data = response.data
        console.log("Response Data", data)
        return data
    } catch (error) {
        console.log("api call Error", error)
        throw error
    }
})

interface EmployeeState {
    employeesList: employee[],
    current: employee | null;
}

const initialState: EmployeeState = {
    employeesList: [],
    current: null
}

const employeeList = createSlice({
    name: "employeeList",
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchEmployeeList.fulfilled, (state, action) => {
           state.employeesList = action.payload
        })
        builder
        .addCase(fetchEachEmployeeByID.fulfilled, (state, action) => {
            state.current = action.payload
        })
    }
})

export default employeeList.reducer;
export const employeeData = (state) => state.employeedata.employeesList;
export const currentEmployeeData = (state) => state.employeedata.current;
