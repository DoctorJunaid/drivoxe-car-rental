import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

const cartDataInStorage = JSON.parse(localStorage.getItem("cartData")) || {};

function saveToLocalStorage(carts){
    localStorage.setItem("cartData" , JSON.stringify(carts))
}


const initialState = {
    carts : cartDataInStorage || {},
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const {userEmail  , item } = action.payload;
            if(!userEmail){
                toast.error("Please Log in first")
                return ;
            }
            if(!state.carts[userEmail]){
                state.carts[userEmail] =[]
            }
            const existingItem = state.carts[userEmail].find(items => items.id === item.id);
            if (existingItem) {
                toast.info("Already on cart!");
            } else {
                state.carts[userEmail].push({...item, quantity: item.quantity || 1});
                saveToLocalStorage(state.carts)
                toast.success(" Added to cart!");
            }
        },
       removeFromCart : (state, action) => {
            const {userEmail , itemId}   = action.payload;
            state.carts[userEmail] = state.carts[userEmail].filter(item => item.id !== itemId);
            saveToLocalStorage(state.carts)
        }


    }
})
export default cartSlice.reducer
export const {addToCart , removeFromCart } = cartSlice.actions