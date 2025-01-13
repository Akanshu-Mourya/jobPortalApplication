import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        companies: [],
        searchCompanyByText: "",
        // allCompany: [],
        searchedQuery: ""
    },
    reducers: {
        // actions
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        }, setCompanies: (state, action) => {
            state.companies = action.payload;
        }, setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        }, setAllCompanies: (state, action) => {
            state.allCompany = action.payload;
        }, setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
    }
});
export const { setSingleCompany, setCompanies, setSearchCompanyByText, setAllCompanies, setSearchedQuery } = companySlice.actions;
export default companySlice.reducer;