import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies:[],
    searchcompanybytext:'',
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies:(state,action) => {
      state.companies = action.payload;
    },
    setsearchcompanybytext:(state,action)=>{
      state.searchcompanybytext=action.payload
    }

  },
});

export const { setSingleCompany,setCompanies,setsearchcompanybytext } = companySlice.actions;
export default companySlice.reducer;
