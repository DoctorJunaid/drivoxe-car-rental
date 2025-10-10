import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";


const initialState = {
    cart: [],

}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cart.find(item => item.id === newItem.id);
            if (existingItem) {
                toast.info("Already on cart!");
            } else {
                state.cart.push({...newItem, quantity: newItem.quantity});
                toast.success(" Added to cart!");
            }
        },
       removeFromCart : (state, action) => {
            const itemId = action.payload;
            state.cart = state.cart.filter(item => item.id !== itemId);
        }


    }
})
export default cartSlice.reducer
export const {addToCart , removeFromCart } = cartSlice.actions