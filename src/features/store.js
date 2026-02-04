import { configureStore } from "@reduxjs/toolkit"
import authReducer from './authSlice'
import cartReducer from './cartSlice'
import paginationReducer from './paginationSlice'
import checkOutReducer from './checkoutSlice'

const store = configureStore({
    reducer : {   
        cart : cartReducer, 
        pagination : paginationReducer,
        checkout : checkOutReducer,
         auth : authReducer,
    } ,
    devTools: process.env.NODE_ENV !== "production",
})

export default store;