import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { BaseResponse } from "../base-response";

import { Media } from "../../model/media/media";
import { VERSION } from "../configURL";

const FILE_TYPES = {
    IMAGE: {
        types: ["image/jpeg", "image/jpg", "image/png"],
        code: "1",
    },
    PDF: {
        types: ["application/pdf"],
        code: "2",
    },
    VIDEO: {
        types: ["video/mp4", "video/quicktime"],
        code: "3",
    },
} as const;

export const uploadService = {
    Upload: async (fileList: FileList,target:string) => {
        // Create a new FormData object and append each file
        const formData = new FormData();
        const types: string[] = [];
        Array.from(fileList).forEach((file) => {
            formData.append("files", file);
            // const fileType = Object.values(FILE_TYPES).find((element) =>
            //     element.types.some((allowedType) => allowedType === file.type)
            // );
            // types.push(fileType?.code ?? "1");
        });
        // formData.append("types", types.join(","));

        formData.append("target", target);
        

        const { data } = await axiosClient().post<BaseResponse<Media[]>>("/upload",
            formData
        );


        return data;
    },
};







const axiosClient = (): AxiosInstance => {
    const client = axios.create({
        baseURL: `${process.env.REACT_APP_IMAGE_URL}`,
        headers: {  "content-type": "multipart/form-data" },
        timeout: 10000,
        responseType: "json",
        withCredentials: false,
    });

    client.interceptors.request.use((config: any) => {
        // store.dispatch(loadingToggle());
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
