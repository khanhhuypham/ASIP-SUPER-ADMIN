import { combineReducers, createSlice } from "@reduxjs/toolkit";

import Cookies from 'js-cookie';
import { IRootState } from ".";
import { COOKIE_KEYS } from "../constants/cookie-key";
import { User } from "../model/user/user";
import { LoginForm } from "../model/user/login-form";



export interface IUserState {
    user: User;
    loginForm: LoginForm;
}

// Retrieve the user from cookies and parse it safely
const storedUser = Cookies.get(COOKIE_KEYS.USER);
const storedLoginForm = Cookies.get(COOKIE_KEYS.LOGINFORM);



const initialState: IUserState = {
    user: storedUser ? (JSON.parse(storedUser) as User) : new User(),
    loginForm: storedLoginForm ? (JSON.parse(storedLoginForm) as LoginForm) : new LoginForm(),
};



export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser(state, { payload }) {
            state.user = payload;

      
            Cookies.set(COOKIE_KEYS.USER,JSON.stringify(payload),{ expires: 24 * 60 * 60 });
        },

        removeUser(state) {
            state.user = new User();
            Cookies.remove(COOKIE_KEYS.USER)
        }
    },
});

export const { setUser,removeUser } = userSlice.actions;


