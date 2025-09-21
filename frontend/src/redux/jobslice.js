import { createSlice } from "@reduxjs/toolkit";
const jobslice = createSlice({
  name: "job",
  initialState: {
    alljobs:[],
    alladminjobs:[],
    singlejob:[],
    searchjobbytext:"",
    allAppliedJob:[],
    searchedQuery:""
  },
    reducers: {
        setAllJobs: (state, action) => {
            state.alljobs = action.payload;
        }  ,
        setsinglejob:(state,action)=>{
          state.singlejob=action.payload

        } ,
        setAllAdminJobs:(state,action)=>{
          state.alladminjobs=action.payload

        } ,
        setsearchjobbytext:(state,action)=>{
          state.searchjobbytext=action.payload
        },
        setAllAppliedJob:(state,action)=>{
          state.allAppliedJob=action.payload
        },
        setSearchedQuery:(state,action)=>{
          state.searchedQuery=action.payload
        }

    },
});
export const { setAllJobs,setsinglejob, setAllAdminJobs,setsearchjobbytext,setAllAppliedJob,setSearchedQuery} = jobslice.actions;
export default jobslice.reducer;