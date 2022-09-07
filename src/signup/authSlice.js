import { createSlice } from "@reduxjs/toolkit";
import jwt_Decode from "jwt-decode";


export const authSlice = createSlice({
    name:'authNtoken',
    initialState:{
        token:"",
        userID:"",
        userType:"",
        userData:{},
    },
    reducers:{
        getTOKEN: (state,action) => {
            return{
                ...state, 
                token:action.payload
            }
        },

        setData: (state,action) => {
            return{
                ...state, 
                userData: action.payload,
            }
        },

        setUserID: (state,action) => {
            return{
                ...state,
                userID:action.payload,
            }
        },

        setUserType: (state,action) => {
            return{
                ...state,
                userType:action.payload,
            }
        },

        logout: (state) => {
            state.token = "";
            state.userID = ""; 
            state.userType = "";
        }
        
    }
})

export const { getTOKEN,logout,setData,setUserID,setUserType } = authSlice.actions;
export default authSlice.reducer;