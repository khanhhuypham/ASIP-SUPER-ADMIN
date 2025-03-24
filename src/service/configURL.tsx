import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import store from "../store";
// import { loadingToggle } from "../store/loadingSlice";
import { User } from "../model/user/user";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "../constants/cookie-key";

export const VERSION = "v1";
export const PATIENT_PORT = 1232;
export const LIGHTNOVEL_PORT = 1233;
export const HIS_CONNECTOR_PORT = 1236;

const axiosClient = (port: number | null = null): AxiosInstance => {
    const client = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}/api`,
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
        responseType: "json",
        withCredentials: false,
    });

    client.interceptors.request.use((config: any) => {
        // store.dispatch(loadingToggle());

        config.headers.ProjectId = port;
        // config.headers = config.headers || {};

        const user = store.getState().userData.user

        // if (user) {
        //     // config.headers.Authorization = `Bearer ${user.access_token}`;
           
        //     config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxNDIwMTc2LCJleHAiOjE3NDE2NzkzNzZ9.f3uTUu14V62Aa1fbjBdq4YAxWeigV5Mi-5e3H8mqOfI`;
        // }
        config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQyMjczMTc0LCJleHAiOjE3NDI1MzIzNzR9.DZuzHN3wxALucgZdFRdqfkegAkmlWxyGXAB02whknT0`;

        return config;
    });

    client.interceptors.response.use(
        (response: AxiosResponse) => {
            // store.dispatch(loadingToggle());
            if (response.status === 401 || response.data.status === 401) {
                // showToast({ message: "Token không hợp lệ", type: "warning" });
                setTimeout(() => {
                    window.location.href = "/login-page";
                }, 2000);
            }

            return response;
        },
        (error: AxiosError) => {
            // store.dispatch(loadingToggle());

            try {
                const { response } = error;

                if (response?.status === 401) {
                    window.location.href = "/login-page";

                }
                console.error(error);
            } catch (e) {
                console.error(e);
            }
            throw error;
        }
    );
    return client;
};

export default axiosClient;
