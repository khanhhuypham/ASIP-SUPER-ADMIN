

import { _2FA_Auth } from "../../model/user/_2FAAuth"
import { User } from "../../model/user/user"
import { BaseResponse } from "../base-response"
import axiosClient, { VERSION } from "../configURL"


export const authService = {

    
    Login: async (email:string,password:string) => {
        const {data} = await axiosClient().post<BaseResponse<_2FA_Auth>>(`${VERSION}/auth/login`,{
            email,
            password
        })

        
        return data
    },
    
    verifyOTP: async (secret:string,opt:string) => {
        const {data} = await axiosClient().post<BaseResponse<User>>(`${VERSION}/auth/otp/verify`,{
            email:"khanhhuypham.1110@gmail.com",
            opt
        })

        
        return data
    },


    GetConfig: async (client_key:string) => {
        const {data} = await axiosClient().get<BaseResponse<undefined>>(`${VERSION}/auth/config-client-key/${client_key}`)

        return data
    },

    SignIn: async (email:string,password:string) => {
        const {data} = await axiosClient().post<BaseResponse<undefined>>(`${VERSION}/auth/sign-in`,{
            email,
            password
        })

        return data
    },
    

    VerifyOtp: async (email:string,password:string) => {
        const {data} = await axiosClient().post<BaseResponse<undefined>>(`${VERSION}/auth/verify-otp`,{
            email,
            password
        })
        return data
    },



    
    
      
} 