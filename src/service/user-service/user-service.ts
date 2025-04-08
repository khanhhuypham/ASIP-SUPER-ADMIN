import axios from "axios";
import { STATUS } from "../../constants/enum";
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

        let active: boolean | undefined = undefined;

        switch (param.currentTab) {
            case STATUS.ALL:
                active = undefined;
                break;
            case STATUS.ACTIVE:
                active = true;
                break;
            case STATUS.INACTIVE:
                active = false;
                break;
        }

        try {
            const response = await apiClient.get< BaseResponse<Pagination<User[], UserStatistics>>>(`${VERSION}/user`, {
                params: {
              
                    branch_id: param.branch_id != -1 ? param.branch_id : undefined,
                    hotel_id: param.hotel_id != -1 ? param.hotel_id : undefined,
                    active: active,
                    search_key: param.search_key,
                    limit: param.limit,
                    page: param.page,
                },
            });
            // 3. Return the data from the response
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data as BaseResponse<undefined>;
            }

            throw error;
        }
    },

    getDetail: async (id: number) => {
        // 1. Get a standard Axios client instance.
        // The request interceptor *will* run, but we will override the Authorization header.
        const apiClient = axiosClient(ProjectId); // Use the factory function

        try {
            const response = await apiClient.get<BaseResponse<User>>(`${VERSION}/user/${id}`);
            // 3. Return the data from the response
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data as BaseResponse<undefined>;
            }

            throw error;
        }
    },

    create: async (user: User,login:LoginForm) => {
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

                    username:login.username,
                    password:login.re_enter_password
                }
            );
            // 3. Return the data from the response
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data as BaseResponse<undefined>;
            }

            throw error;
        }
    },

    update: async (user: User) => {
        // 1. Get a standard Axios client instance.
        //    The request interceptor *will* run, but we will override the Authorization header.
        const apiClient = axiosClient(ProjectId); // Use the factory function

        try {
            const response = await apiClient.patch<BaseResponse<undefined>>( `${VERSION}/user/${user.id}`,
                {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    branch_id: user.branch.id
                }
            );
            // 3. Return the data from the response
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data as BaseResponse<undefined>;
            }

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
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data as BaseResponse<undefined>;
            }

            throw error;
        }
    },
};
