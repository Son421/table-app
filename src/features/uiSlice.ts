import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface uiState {
    popup: boolean,
    search: boolean,
}

const initialState: uiState = {
    popup: false,
    search: false,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState, 
    reducers:{
        changeVisibility(state){ 
           state.popup = !state.popup
        },
        closePopup(state){ 
            state.popup = false
            state.search = false
        },
        openPopup(state){ 
            state.popup = true
        },
        searching(state){
            state.search = true
        },
        stopSearching(state){
            state.search = false
        },
    },
});

export const {changeVisibility, closePopup, openPopup, searching, stopSearching} = uiSlice.actions;

export const ui = (state: RootState) => state.ui.popup;

export default uiSlice.reducer;