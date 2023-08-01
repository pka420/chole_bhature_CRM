import { configureStore } from "@reduxjs/toolkit";
import { employeeContactSlice } from "../contacts/employeeContactsSlice.js";
import { customerContactSlice } from "../contacts/customerContactsSlice.js";

export const store = configureStore({
    reducer: {
        [employeeContactSlice.reducerPath]: employeeContactSlice.reducer,
        [customerContactSlice.reducerPath]: customerContactSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(employeeContactSlice.middleware),
    devTools: true
})
