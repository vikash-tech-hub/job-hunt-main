import { createSlice } from "@reduxjs/toolkit";
import { use } from "react";
const authslice=createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        setUser:(state,action)=>{
            state.user=action.payload
        }
    }
});
export const {setLoading,setUser}=authslice.actions;
export default authslice.reducer;