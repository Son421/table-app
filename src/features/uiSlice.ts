import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

interface uiState {
    popup: boolean
}

const initialState: uiState = {
    popup: false,
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
         },
         openPopup(state){ 
            state.popup = true
         },
    },
});

export const {changeVisibility, closePopup, openPopup} = uiSlice.actions;

export const ui = (state: RootState) => state.ui.popup;

export default uiSlice.reducer;