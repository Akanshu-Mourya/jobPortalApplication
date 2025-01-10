import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        companies: [],
        searchCompanyByText: "",
        allCompany: [],
    },
    reducers: {
        // actions
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        }, setCompanies: (state, action) => {
            state.companies = action.payload;
        }, setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        },
         setAllCompanies: (state, action) => {
            state.allCompany = action.payload;
        },
    }
});
export const { setSingleCompany, setCompanies, setSearchCompanyByText, setAllCompanies } = companySlice.actions;
export default companySlice.reducer;