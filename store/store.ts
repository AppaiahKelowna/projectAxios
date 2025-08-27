import { configureStore } from "@reduxjs/toolkit";
import employeeList from "../slice/employeeList";

export const store = configureStore({
    reducer: {
        employeedata: employeeList
    }
})
