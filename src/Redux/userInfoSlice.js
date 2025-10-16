import {createSlice} from "@reduxjs/toolkit";
const userDataInStorage =JSON.parse(localStorage.getItem('userData')) || {};

function  saveToLocalStorage(state){
    localStorage.setItem("userData" , JSON.stringify(state));
}

const initialState = {
    userInfo : userDataInStorage.userInfo || [],
    currentUser: userDataInStorage.currentUser || null,
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
              saveToLocalStorage(state)

            },
            setLoggedInUser: (state, action) => {
                state.currentUser = action.payload;
                saveToLocalStorage(state)
            },
            logoutUser: (state) => {
                state.currentUser = null;
                saveToLocalStorage(state)
            },

        }


    })
export default userInfoSlice.reducer
export const {
    addUserInfo,
    setLoggedInUser,
    logoutUser
} = userInfoSlice.actions