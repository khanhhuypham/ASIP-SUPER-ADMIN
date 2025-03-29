import { Branch } from "../../model/branch/branch";
import { BaseResponse } from "../base-response";
import axiosClient, { ProjectId, VERSION } from "../configURL";




export const branchService = {
    getList: async (companyId: number) => {
        const apiClient = axiosClient(ProjectId);
        try {
            const response = await apiClient.get<BaseResponse<Branch[]>>(`${VERSION}/branch`,{
                params: {
                    company_id: companyId,
                },
            });
            return response?.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    changeStatus: async (branchId: number) => {
        const apiClient = axiosClient(ProjectId);

        try {
            const response = await apiClient.get<BaseResponse<undefined>>(`${VERSION}/branch/${branchId}/change-status`);
            return response?.data;
        } catch (error) {
            console.error(error);
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
            console.error(error);
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
            console.error(error);
            throw error;
        }
    },
};
