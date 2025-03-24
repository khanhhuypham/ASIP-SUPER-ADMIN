import { combineReducers, createSlice } from "@reduxjs/toolkit";

import Cookies from 'js-cookie';
import { IRootState } from ".";
import { COOKIE_KEYS } from "../constants/cookie-key";
import { User } from "../model/user/user";



export interface IUserState {
    user: User;
}

// Retrieve the user from cookies and parse it safely
const storedUser = Cookies.get(COOKIE_KEYS.USER);


console.log(storedUser)

const initialState: IUserState = {
    user: storedUser ? (JSON.parse(storedUser) as User) : new User(),
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


