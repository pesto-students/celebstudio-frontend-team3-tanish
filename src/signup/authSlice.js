import { createSlice } from "@reduxjs/toolkit";
import jwt_Decode from "jwt-decode";


export const authSlice = createSlice({
    name:'authNtoken',
    initialState:{
        status:true,
        token:"",
        userID:"BU1234AIR",
        userType:"business",
    },
    reducers:{
        getTOKEN: (state,action) => {
            state.token =  action.payload;
            if(state.token){
                state.status = true;
                const decode = jwt_Decode(state.token);
                state.userID = decode.userID;
                state.userType = decode.userType;
                if(state.userID != null && state.userType != null){
                    console.log("jwt decode sucessful")
                }
                else{
                    console.log("jwt decode failed");
                }
            }
            else{
                state.status=false;
            }
        },

        logout: (state) => {
            state.status = false;
            state.token = "";
            state.userID = "";
            state.userType = "";
        }
        
    }
})

export const { getTOKEN,logout } = authSlice.actions;
export default authSlice.reducer;