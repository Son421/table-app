import {createSlice,  createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import constants from "../constants";

interface user {
    name: string;
    username: string;
    email: string;
    phone: string;
    id: number;
}

interface userState {
    value: user[];
    loading: boolean;
    error: string | null;
    searchedUser: user[];
}

const initialState: userState = {
    value: [],
    loading: false,
    error: null,    
    searchedUser: [],
}

export const fetchUsers = createAsyncThunk<user[], void>(
    'users/fetchUsers',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(constants.url); 
            
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Error fetching users');
        }
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState, 
    reducers:{
        searchUsers(state, action: PayloadAction<user>) {
            state.searchedUser = state.value.filter(user => {
                const correctName = action.payload.name.split('').length !== 0 ?action.payload.name.toLowerCase().split(' ').every(part => user.name.toLowerCase().split(' ').some(namePart => namePart.startsWith(part))) : true;

                const correctUsername = action.payload.username.split('').length !== 0 ? user.username.toLowerCase().startsWith(action.payload.username.toLowerCase()) : true;

                const correctEmail = action.payload.email.split('').length !== 0 ? action.payload.email.toLowerCase().split('@').every((part, index) => {
                    const emailParts = user.email.toLowerCase().split('@'); 
                    return emailParts[index] && emailParts[index].startsWith(part);
                }): true;

                const correctPhone = action.payload.phone.split('').length !== 0 ? action.payload.phone.replace(/[^0-9x]/g, '').split('x').every((part, index) => {
                    const phoneParts = user.phone.replace(/[^0-9x]/g, '').split('x');
                    return phoneParts[index] && phoneParts[index].startsWith(part);
                }): true;

                return correctName && correctUsername && correctEmail && correctPhone;
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<user[]>) => {
                state.value = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {searchUsers} = usersSlice.actions;

export const users = (state: RootState) => state.users.value;
export const searchedUser = (state: RootState) => state.users.searchedUser;
export const selectLoading = (state: RootState) => state.users.loading;
export const selectError = (state: RootState) => state.users.error;

export default usersSlice.reducer;