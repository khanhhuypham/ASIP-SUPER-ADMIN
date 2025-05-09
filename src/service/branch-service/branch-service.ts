
import axios from "axios";
import { Branch } from "../../model/branch/branch";
import { BaseResponse } from "../base-response";
import axiosClient, { ProjectId, VERSION } from "../configURL";
import { User } from "../../model/user/user";




export const branchService = {
    getList: async (hotel_id?:number,search_key?:string) => {
        const apiClient = axiosClient(ProjectId);
        try {
            const response = await apiClient.get<BaseResponse<Branch[]>>(`${VERSION}/branch`,{
                params: {
                    hotel_id: hotel_id,
                    search_key:search_key
                },
            });
            return response?.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data as BaseResponse<undefined>;
            }

            throw error;
        }
    },

    getAllEmployeesByBranchId: async (id:number) => {
        const apiClient = axiosClient(ProjectId);
        try {
            const response = await apiClient.get<BaseResponse<User[]>>(`${VERSION}/branch/get-all-employees/${id}`);
            return response?.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data as BaseResponse<undefined>;
            }

            throw error;
        }
    },

    changeStatus: async (branchId: number) => {
        const apiClient = axiosClient(ProjectId);

        try {
            const response = await apiClient.get<BaseResponse<undefined>>(`${VERSION}/branch/${branchId}/change-status`);
            return response?.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data as BaseResponse<undefined>;
            }

            throw error;
        }
    },

    create: async (branch:Branch) => {
        const apiClient = axiosClient(ProjectId);

        try {
            const response = await apiClient.post<BaseResponse<Branch>>(`${VERSION}/branch`,
                {
                    hotel_id:branch.hotel.id,
                    name:branch.name,
                    address:branch.address,
                    phone:branch.phone,
                    email:branch.email,
                    description:branch.description,
                }
            );
            return response?.data;
        } catch (error) {
    
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data as BaseResponse<undefined>;
            }

            throw error;
        }
    },

    update: async (branch:Branch) => {
        const apiClient = axiosClient(ProjectId);
        try {
            const response = await apiClient.patch<BaseResponse<Branch>>(`${VERSION}/branch/${branch.id}`,
                {
                    name:branch.name,
                    address:branch.address,
                    phone:branch.phone,
                    email:branch.email,
                    description:branch.description,
                }
            );

            return response?.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data as BaseResponse<undefined>;
            }

            throw error;
        }
    },
};
