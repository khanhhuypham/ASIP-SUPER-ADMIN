import { HotelManagmentListProps } from "../../features/hotel-management/hotel-management";
import { UserManagmentListProps } from "../../features/user-management/user-management";
import { Branch } from "../../model/branch/branch";
import { Hotel, HotelStatistics } from "../../model/hotel/hotel";
import { _2FA_Auth } from "../../model/user/_2FAAuth";
import { LoginForm } from "../../model/user/login-form";
import { User, UserStatistics } from "../../model/user/user";
import { BaseResponse, Pagination } from "../base-response";
import axiosClient, { ProjectId, VERSION } from "../configURL";

export const userService = {


    list: async (param: UserManagmentListProps) => {
        // 1. Get a standard Axios client instance.
        //    The request interceptor *will* run, but we will override the Authorization header.
        const apiClient = axiosClient(ProjectId); // Use the factory function

        try {
            const response = await apiClient.get<BaseResponse<Pagination<User[],UserStatistics>>>(`${VERSION}/user`,
                {
                    params: {
                        // is_active: param.is_active,
                        branch_id:param.branch_id,
                        hotel_id:param.hotel_id,
                        limit: param.limit,
                        page: param.page,
                    },
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

    
    create: async (user: User) => {
        // 1. Get a standard Axios client instance.
        //    The request interceptor *will* run, but we will override the Authorization header.
        const apiClient = axiosClient(ProjectId); // Use the factory function

        try {
            const response = await apiClient.post<BaseResponse<undefined>>(`${VERSION}/user`,
                {
                    name: user.name,
                    code: user.code,
                    email: user.email,
                    phone: user.phone,
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

    update: async (user: User) => {
        // 1. Get a standard Axios client instance.
        //    The request interceptor *will* run, but we will override the Authorization header.
        const apiClient = axiosClient(ProjectId); // Use the factory function

        try {
            const response = await apiClient.patch<BaseResponse<undefined>>(`${VERSION}/user/${user.id}`,
                {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
    
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


    changeStatus: async (id: number) => {
        // 1. Get a standard Axios client instance.
        //    The request interceptor *will* run, but we will override the Authorization header.
        const apiClient = axiosClient(ProjectId); // Use the factory function

        try {
            const response = await apiClient.get<BaseResponse<undefined>>(`${VERSION}/user/${id}/change-status`);
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

};
