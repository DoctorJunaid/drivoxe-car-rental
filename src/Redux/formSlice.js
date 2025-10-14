import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    userInfo : [],
    currentUser: null,
}
const userInfoSlice = createSlice(
    {name : 'userInfo',
        initialState,
        reducers : {
            addUserInfo : (state, action) => {
              const newUserInfo = action.payload;
              const userExist = state.userInfo.find(user => user.email === newUserInfo.email);
              if(userExist){
                  return;
              }
              state.userInfo.push(newUserInfo);
            },
            setLoggedInUser: (state, action) => {
                state.currentUser = action.payload;
            },
            logoutUser: (state) => {
                state.currentUser = null;
            },
        }


    })
export default userInfoSlice.reducer
export const {addUserInfo} = userInfoSlice.actions
export const {setLoggedInUser, logoutUser} = userInfoSlice.actions