import {configureStore} from "@reduxjs/toolkit";
import carReducer from "../Redux/carSlice";
import cartReducer from "../Redux/cartSlice";
import userInfoReducer  from "../Redux/userInfoSlice.js";

const store = configureStore({
    reducer: {
        car: carReducer,
        cart : cartReducer,
        userInfo : userInfoReducer,


    },
});
export default store;