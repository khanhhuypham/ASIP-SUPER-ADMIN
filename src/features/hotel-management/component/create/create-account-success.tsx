import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";

import { InternalLabelTextField } from "../../../../components/custom/field/internal-label-textfield";
import { Button } from "antd";
import { LoginForm } from "../../../../model/user/login-form";
import IconCreateSuccess from "../../../../assets/images/icon-create-success.png";



export const CreateAccountSuccess = ({ data, onComplete }: { data: LoginForm, onComplete?: (() => void) }) => {
    const [files, setFiles] = useState<FileList | undefined>()
    const [showPassword, setShowPassword] = useState(false);


    const formik = useFormik({
        initialValues: new LoginForm(),

        validationSchema: Yup.object({


        }),
        onSubmit: (values) => {


        },
    });





    useEffect(() => {
        formik.setValues(data)
    }, [data])


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
                    value={formik.values.hotel_code}
                    onChange={(value) => {
                        formik.setFieldValue("hotel_code", value)
                    }}
                    required
                />

                <InternalLabelTextField
                    label="Tên tài khoản"
                    name="username"
                    value={formik.values.username}
                    onChange={(value) => {
                        formik.setFieldValue("username", value)
                    }}
                    required
                />

                <InternalLabelTextField
                    label="Mật khẩu"
                    name="password"
                    value={formik.values.password}
                    onChange={(value) => {
                        formik.setFieldValue("password", value)
                    }}
                    required
                    type={showPassword ? "text" : "password"}
                    suffix={
                        <button
                            className="underline text-sm"
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setShowPassword(!showPassword)
                            }}
                        >{showPassword ? "Ẩn" : "Hiện"}</button>
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


