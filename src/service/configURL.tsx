import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import store from "../store";
import { ROUTE_LINK } from "../router/module-router";
// import { loadingToggle } from "../store/loadingSlice";

export const VERSION = "v1";
export const ProjectId = 1459;

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

        // Add ProjectId if port is provided
        if (port !== null) {
            // Check if port is actually provided
            config.headers = config.headers ?? {}; // Ensure headers object exists
            config.headers.ProjectId = port;
        }

        if (!config.headers?.Authorization) {
            // Check if Authorization is NOT already set
            const user = store.getState().userData.user; // Assuming this path is correct
            if (user) {
                // IMPORTANT: Replace this hardcoded token with a dynamic one from the user state!
                // Example: const token = store.getState().userData.token;
                const token = user.access_token;
                config.headers = config.headers ?? {};
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    });

    client.interceptors.response.use(
        (response: AxiosResponse) => {
            // store.dispatch(loadingToggle());
            if (response.status === 401 || response.data.status === 401) {
                // showToast({ message: "Token không hợp lệ", type: "warning" });
                setTimeout(() => {
                    window.location.href = ROUTE_LINK.LOGIN;
                }, 2000);
            }

            return response;
        },
        (error: AxiosError) => {
            // store.dispatch(loadingToggle());

            try {
                const { response } = error;

                if (response?.status === 401) {
                    window.location.href = ROUTE_LINK.LOGIN;
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

// const axiosClient = (port: number | null = null): AxiosInstance => {
//     const client = axios.create({
//         // Use || for default value if REACT_APP_API_URL is undefined/empty
//         baseURL: `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api`, // Added a fallback default
//         headers: { "Content-Type": "application/json" },
//         timeout: 10000,
//         responseType: "json",
//         withCredentials: false, // Usually false for token-based auth
//     });

//     // --- Request Interceptor ---
//     client.interceptors.request.use(
//         (config) => { // Use AxiosRequestConfig if possible, 'any' is less safe
//             // Add ProjectId if port is provided
//             if (port !== null) { // Check if port is actually provided
//                 config.headers = config.headers ?? {}; // Ensure headers object exists
//                 config.headers.ProjectId = port;
//             }

//             // Add Bearer token *unless* an Authorization header is already set
//             // This allows specific requests (like SignIn) to override it.
//             if (!config.headers?.Authorization) { // Check if Authorization is NOT already set
//                 const user = store.getState().userData.user; // Assuming this path is correct
//                 if (user) {
//                     // IMPORTANT: Replace this hardcoded token with a dynamic one from the user state!
//                     // Example: const token = store.getState().userData.token;
//                     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxNDIwMTc2LCJleHAiOjE3NDE2NzkzNzZ9.f3uTUu14V62Aa1fbjBdq4YAxWeigV5Mi-5e3H8mqOfI"; // <-- Replace HARDCODED token
//                     config.headers = config.headers ?? {};
//                     config.headers.Authorization = `Bearer ${token}`;
//                 }
//             }

//             return config;
//         },
//         (error) => {
//             // Handle request setup errors (rare)
//             console.error("Request Interceptor Error:", error);
//             return Promise.reject(error);
//         }
//     );

//     // --- Response Interceptor ---
//     client.interceptors.response.use(
//         (response: AxiosResponse) => {
//             // You might not need to check status code 401 here if the error handler does it.
//             // Checking response.data.status might be specific to your API structure.
//             // if (response.status === 401 || response.data?.status === 401) { // Added optional chaining
//             //     console.warn("Response Interceptor: Unauthorized (401). Redirecting...");
//             //     // Avoid immediate redirect, let error handler manage it for consistency
//             // }
//             return response; // Pass successful responses through
//         },
//         (error: AxiosError) => {
//             // Handle API errors
//             try {
//                 const { response } = error;

//                 if (response?.status === 401) {
//                     console.warn("Response Error Interceptor: Unauthorized (401). Redirecting to /login-page");
//                     // Optional: Add a small delay if needed, but direct redirect is often fine
//                     // setTimeout(() => {
//                          window.location.href = "/login-page";
//                     // }, 500); // Short delay example

//                     // Optional: Dispatch a logout action
//                     // store.dispatch(logoutAction());
//                 } else {
//                     // Log other errors
//                     console.error("API Error:", error.response?.status, error.message, error.response?.data);
//                 }
//             } catch (e) {
//                 // Catch errors within the error handler itself
//                 console.error("Error handling API error:", e);
//             }
//             // IMPORTANT: Always reject the promise so the calling code knows there was an error
//             return Promise.reject(error);
//         }
//     );
//     return client;
// };
