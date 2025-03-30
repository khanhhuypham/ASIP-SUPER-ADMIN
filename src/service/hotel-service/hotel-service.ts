import { HotelManagmentListProps } from "../../features/hotel-management/hotel-management";
import { Branch } from "../../model/branch/branch";
import { Hotel, HotelStatistics } from "../../model/hotel/hotel";
import { _2FA_Auth } from "../../model/user/_2FAAuth";
import { LoginForm } from "../../model/user/login-form";
import { User } from "../../model/user/user";
import { BaseResponse, Pagination } from "../base-response";
import axiosClient, { ProjectId, VERSION } from "../configURL";

export const hotelService = {
    list: async (param: HotelManagmentListProps) => {
        // 1. Get a standard Axios client instance.
        //    The request interceptor *will* run, but we will override the Authorization header.
        const apiClient = axiosClient(ProjectId); // Use the factory function

        try {
            const response = await apiClient.get<BaseResponse<Pagination<Hotel[],HotelStatistics>>>(`${VERSION}/hotel`,
                {
                    params: {
                        is_active: param.is_active,
                        key_search: param.key_search,
                        from_date: param.from_date,
                        to_date: param.to_date,
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

    countTab: async (param: HotelManagmentListProps) => {
        // 1. Get a standard Axios client instance.
        //    The request interceptor *will* run, but we will override the Authorization header.
        const apiClient = axiosClient(ProjectId); // Use the factory function

        try {
            const response = await apiClient.get<BaseResponse<HotelStatistics>>(`${VERSION}/company/count-tab`,
                {
                    params: {
                        key_search: param.key_search,
                        from_date: param.from_date,
                        to_date: param.to_date,
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

    create: async (hotel: Hotel, branch: Branch, loginForm: LoginForm) => {
        // 1. Get a standard Axios client instance.
        //    The request interceptor *will* run, but we will override the Authorization header.
        const apiClient = axiosClient(ProjectId); // Use the factory function

        try {
            const response = await apiClient.post<BaseResponse<undefined>>(`${VERSION}/hotel`,
                {
                    name: hotel.name,
                    code: hotel.code,
                    email: hotel.email,
                    phone: hotel.phone,
                    owner_name: hotel.owner_name,
                    note: hotel.note,

                    branch:{
                        name: branch.name,
                        email: branch.email,
                        phone: branch.phone,
                        address: branch.address,
                        note: branch.description,
                    },

                    // username: loginForm.username,
                    // password: loginForm.password,
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

    update: async (hotel: Hotel) => {
        // 1. Get a standard Axios client instance.
        //    The request interceptor *will* run, but we will override the Authorization header.
        const apiClient = axiosClient(ProjectId); // Use the factory function

        try {
            const response = await apiClient.patch<BaseResponse<undefined>>(`${VERSION}/hotel/${hotel.id}`,
                {
                    name: hotel.name,
                    email: hotel.email,
                    phone: hotel.phone,
                    owner_name: hotel.owner_name,
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

    getDetail: async (id: number) => {
        // 1. Get a standard Axios client instance.
        //    The request interceptor *will* run, but we will override the Authorization header.
        const apiClient = axiosClient(ProjectId); // Use the factory function

        try {
            const response = await apiClient.get<BaseResponse<Hotel>>( `${VERSION}/company/${id}/detail`
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
            const response = await apiClient.get<BaseResponse<undefined>>(`${VERSION}/hotel/${id}/change-status`);
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
