import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../../api/API';
import {localStorageKeys} from "../../core/models/localStorageKeys";


export const getUserProfile = createAsyncThunk(
    'user/profile',
    async function (user, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.USER, {
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem(localStorageKeys.accessToken)
                }
            });

            if (!response.ok) {
                if(response.status === 404)
                    throw new Error("Пользователь не найден!");
            }

            response = await response.json();
            dispatch(setUser(response));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    id: null,
    login: null,
    email: null,
    firstName: null,
    secondName: null,
    avatar: null,
    projects: []
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id;
            state.login = action.payload.login;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.secondName = action.payload.secondName;
            state.avatar = action.payload.avatar;
            state.projects = action.payload.projects;
        },
        removeUser(state) {
            state.id = null;
            state.login = null;
            state.email = null;
            state.firstName = null;
            state.secondName = null;
            state.avatar = null;
            state.projects = null;
        },
    },
    extraReducers: builder => builder
        .addCase(getUserProfile.rejected, (state, action) => {
            throw new Error(action.payload);
        })
})
;

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
