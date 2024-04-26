import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from '../../redux/loaderSlice/LoaderSlice'
import cartReducer from '../../redux/cartSlice/CartSlice'
export const store = configureStore({
    reducer : {
        cart : cartReducer,
        loader : loaderReducer
    }
})