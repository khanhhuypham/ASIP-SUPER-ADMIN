import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";

import { InternalLabelTextField } from "../../../../components/custom/field/internal-label-textfield";
import { Button } from "antd";
import { LoginForm } from "../../../../model/user/login-form";
import IconCreateSuccess from "../../../../assets/images/icon-create-success.png";
import { Hotel } from "../../../../model/hotel/hotel";
import IconEyeSlash from "../../../../components/icons/icon-eye-slash";
import IconEye from "../../../../components/icons/icon-eye";




export const CreateAccountSuccess = ({ hotel, loginForm, onComplete }: { hotel: Hotel, loginForm: LoginForm, onComplete?: (() => void) }) => {

    const [showPassword, setShowPassword] = useState(false);



    useEffect(() => {
        console.log(hotel, loginForm)
    }, [hotel, loginForm])


    return (
        <div className="space-y-6 w-full">

            <div className="flex flex-col justify-center items-center gap-2">
                <img src={IconCreateSuccess} width={200} height={200} />
                <p className="font-bold text-xl">Tạo tài khoản thành công</p>
            </div>


            <div className="space-y-4">
                <InternalLabelTextField
                    label="Mã khách sạn"
                    name="hotel_code"
                    value={hotel.code}
                    disabled={true}
                />

                <InternalLabelTextField
                    label="Tên tài khoản"
                    name="username"
                    value={loginForm.username}
                    disabled={true}
                />

                <InternalLabelTextField
                    label="Mật khẩu"
                    name="password"
                    value={loginForm.password}
                    disabled={true}
                    type={showPassword ? "text" : "password"}
                    suffix={
                        <button
                            className="underline text-sm"
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setShowPassword(!showPassword)
                            }}
                        >{showPassword ? <IconEyeSlash /> : <IconEye/>}</button>
                    }
                />


                <Button
                    type="primary"
                    className="w-full h-10 bg-gradient-to-r from-[#3985FF] to-[#0866FF]"
                    onClick={onComplete}
                    iconPosition="end"
                >
                    <span className="font-bold text-lg">Xác nhận</span>

                </Button>


            </div>
        </div>
    )
};

