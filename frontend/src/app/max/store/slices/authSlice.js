import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../../api/API';
import {localStorageKeys} from "../../core/models/localStorageKeys";


export const registrationUser = createAsyncThunk(
    'user/registration',
    async function (user, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.USER, {
                method: 'post',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                response = await response.json()
                if(response.statusCode === 400) {
                    if (response.message === "This email already exist!")
                        throw new Error("Почта уже занята!");
                    if (response.message === "This login already exist!")
                        throw new Error("Логин уже занят!");
                }
                throw new Error("Ошибка сервера!");
            }

            response = await response.json();

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const activateUser = createAsyncThunk(
    'user/activation',
    async function (code, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.ACTIVATION+"/"+code, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Не удалось активировать аккаунт!");
            }

            return;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async function (user, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.AUTH + "/login", {
                method: 'post',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                if(response.status === 401)
                    throw new Error("Неправильный логин или пароль!");
                if(response.status === 403)
                    throw new Error("Необходимо подтвердить аккаунт через ссылку на почте!");
            }

            response = await response.json();
            dispatch(setAuth(response));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    id: null,
    login: null,
    accessToken: null,
    isActivate: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuth(state, action) {
            state.id = action.payload.id;
            state.login = action.payload.login;
            state.accessToken = action.payload.accessToken;
            state.isActivate = action.payload.isActivate;

            localStorage.setItem(localStorageKeys.userId, action.payload.id);
            localStorage.setItem(localStorageKeys.login, action.payload.login);
            localStorage.setItem(localStorageKeys.accessToken, action.payload.accessToken);
            localStorage.setItem(localStorageKeys.isActivate, action.payload.isActivate);
        },
        removeAuth(state) {
            state.id = null;
            state.login = null;
            state.accessToken = null;
            state.isActivate = false;

            localStorage.removeItem(localStorageKeys.userId);
            localStorage.removeItem(localStorageKeys.login);
            localStorage.removeItem(localStorageKeys.accessToken);
            localStorage.removeItem(localStorageKeys.isActivate);
        },
    },
    extraReducers: builder => builder
        .addCase(loginUser.rejected, (state, action) => {
            throw new Error(action.payload);
        })
        .addCase(registrationUser.rejected, (state, action) => {
            throw new Error(action.payload);
        })
        .addCase(activateUser.rejected, (state, action) => {
            throw new Error(action.payload);
        })
})
;

export const {setAuth, removeAuth} = authSlice.actions;

export default authSlice.reducer;
