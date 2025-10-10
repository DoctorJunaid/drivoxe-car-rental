import {configureStore} from "@reduxjs/toolkit";
import carReducer from "../Redux/carSlice";
import cartReducer from "../Redux/cartSlice";

const store = configureStore({
    reducer: {
        car: carReducer,
        cart : cartReducer,

    },
});
export default store;