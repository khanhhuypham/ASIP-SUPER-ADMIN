import { _2FA_Auth } from "../../model/user/_2FAAuth";
import { User } from "../../model/user/user";
import { BaseResponse } from "../base-response";
import axiosClient, { VERSION } from "../configURL";

export const authService = {


    GetConfig: async (client_key: string) => {
        const { data } = await axiosClient().get<BaseResponse<undefined>>(
            `${VERSION}/auth/config-client-key/${client_key}`
        );

        return data;
    },

    SignIn: async (username: string, password: string) => {
        // 1. Get a standard Axios client instance.
        //    The request interceptor *will* run, but we will override the Authorization header.
        const apiClient = axiosClient(); // Use the factory function

        try {
            // 2. Make the POST request.
            //    Pass the specific headers for *this request only* in the config object (3rd argument for post).
            const response = await apiClient.post<BaseResponse<_2FA_Auth>>(
                `${VERSION}/auth/admin/sign-in`, // URL
                { username, password }, // Request body (data)
                {
                    // Axios request config (overrides defaults/interceptors)
                    headers: {
                        ProjectId: 1459,
                        // This Authorization header will override any set by the interceptor
                        // Authorization: `Basic ${secret_key}`,
                        // Content-Type is already set by default in axiosClient, no need to repeat unless changing it
                        // 'Content-Type': 'application/json'
                    },
                    // Note: The 'ProjectId' header (if applicable based on 'port') will still be added by the interceptor
                }
            );
            // 3. Return the data from the response
            return response.data;
        } catch (error) {
            // The response interceptor will handle 401 redirects.
            // We might want to handle other errors specifically here or re-throw.
            console.error("SignIn failed:", error);
            // Rethrow the error so the calling component knows about the failure
            throw error;
        }
    },

    VerifyOtp: async (username: string, otp: string) => {
        const { data } = await axiosClient().post<BaseResponse<User>>(`${VERSION}/auth/admin/verify-otp`,
            {
                username,
                otp,
            }
        );
        return data;
    },
};
