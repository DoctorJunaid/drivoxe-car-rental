import {configureStore} from "@reduxjs/toolkit";
import carReducer from "../Redux/carSlice";

const store = configureStore({
    reducer: {
        car: carReducer,

    },
});
export default store;