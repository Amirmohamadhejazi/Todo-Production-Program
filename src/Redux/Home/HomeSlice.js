import { createSlice } from "@reduxjs/toolkit";

const HomeSlice = createSlice({
    name: "HomeSlice",
    initialState: {
        loading: false,
        DataHome:[],
    },
    reducers: {

        HomeLoading(state, action) {
            return { ...state, loading: action.payload  };
        },
        getData(state, action) {
            return { ...state};
        },
        SetData(state, action) {
            return {...state, DataHome:action.payload};
        },

    },
});

export const {
    HomeLoading,
    getData,
    SetData,
} =
    HomeSlice.actions;

export default HomeSlice.reducer;
