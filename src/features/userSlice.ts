import {createSlice,  createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import constants from "../constants";

interface user {
    name: string;
    username: string;
    email: string;
    phone: string;
}

interface userState {
    value: user[];
    loading: boolean;
    error: string | null;
    searchedUser: user[];
    searchedText: string;
    searchType: string;
}

const initialState: userState = {
    value: [],
    loading: false,
    error: null,
    searchedUser: [],
    searchedText: '',
    searchType: 'name',
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
        setSearchedText(state, action: PayloadAction<string>){
            state.searchedText = action.payload
        },
        setSearchType(state, action: PayloadAction<string>){
            state.searchType = action.payload
        },
        searchByName(state, action: PayloadAction<string>) {
            state.searchedUser = state.value.filter(user =>
                user.name.toLowerCase().startsWith(action.payload.toLowerCase())
            );
        },
        searchByUsername(state, action: PayloadAction<string>) {
            state.searchedUser = state.value.filter(user =>
                user.username.toLowerCase().startsWith(action.payload.toLowerCase())
            );
        },
        searchByEmail(state, action: PayloadAction<string>) {
            state.searchedUser = state.value.filter(user =>
                user.email.toLowerCase().startsWith(action.payload.toLowerCase())
            );
        },
        searchByPhone(state, action: PayloadAction<string>) {
            state.searchedUser = state.value.filter(user =>
                user.phone.startsWith(action.payload)
            );
        },
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

export const {searchByEmail, searchByName, searchByPhone, searchByUsername, setSearchType, setSearchedText} = usersSlice.actions;

export const users = (state: RootState) => state.users.value;
export const searchedUser = (state: RootState) => state.users.searchedUser;
export const selectLoading = (state: RootState) => state.users.loading;
export const selectError = (state: RootState) => state.users.error;

export default usersSlice.reducer;