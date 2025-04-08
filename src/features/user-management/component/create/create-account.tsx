import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { ExternalLabelTextField } from "../../../../components/custom/field/external-label-textfield";
import { LoginForm } from "../../../../model/user/login-form";
import IconEyeSlash from "../../../../components/icons/icon-eye-slash";
import IconEye from "../../../../components/icons/icon-eye";



export const CreateAccount = (
    { data, onComplete, onRollBack }:
    { data: LoginForm, onComplete?: ((agr0: LoginForm) => void), onRollBack?: (() => void) }
) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showReEnterPassword, setShowReEnterPassword] = useState(false);

    
    const formik = useFormik({
        initialValues: new LoginForm(),
        validationSchema: Yup.object({

            username: Yup.string()
                .min(2, "Độ dài tối thiểu 2 ký tự")
                .max(50, "Độ dài tối đa 50 ký tự")
                .required("Tên đăng nhập không được bỏ trống"),
            password: Yup.string()
                .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
                .required("Mật khẩu không được để trống"),

            re_enter_password: Yup.string()
                .oneOf([Yup.ref("password"), null], "Mật khẩu nhập lại không khớp")
                .required("Vui lòng nhập lại mật khẩu"),

        }),
        onSubmit: (values) => {
            console.log(values)
            onComplete && onComplete(values)
        },
    });

    const generateRandomCode = (): string => {
        // Generate a random 3-digit number between 100 and 999
        const randomNumber = Math.floor(Math.random() * 900) + 100;
        // Combine the prefix with the random number
        return `KH00${randomNumber}`;
    };


    useEffect(() => {
        formik.setValues(data)
    }, [data])


    return (
        <div className="space-y-6 ">
         
            <form className='flex gap-5' onSubmit={formik.handleSubmit}>

                <div className='space-y-6 flex-1'>

                    <ExternalLabelTextField
                        label="Tên tài khoản"
                        name="username"
                        placeholder="Nhập thông tin"
                        value={formik.values.username}
                        error={formik.touched.username && formik.errors.username}
                        onChange={(value) => {
                            formik.setFieldValue("username", value)
                        }}
                        required
                    />



                    <ExternalLabelTextField
                        label="Mật khẩu"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu"
                        value={formik.values.password}
                        error={formik.touched.password && formik.errors.password}
                        onChange={(value) => {
                            formik.setFieldValue("password", value)
                        }}
                        required
                        suffix={
                            <button
                                className="underline text-sm"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setShowPassword(!showPassword)
                                }}
                            >{showPassword ? <IconEyeSlash/> : <IconEye/>}</button>
                        }
                    />

                    <ExternalLabelTextField
                        label="Nhập lại mật khẩu"
                        name="re_enter_password"
                        placeholder="Nhập mật khẩu"
                        type={showReEnterPassword ? "text" : "password"}
                        value={formik.values.re_enter_password}
                        error={formik.touched.re_enter_password && formik.errors.re_enter_password}
                        onChange={(value) => {
                            formik.setFieldValue("re_enter_password", value)
                        }}
                        required
                        suffix={
                            <button
                                className="underline text-sm"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setShowReEnterPassword(!showReEnterPassword)
                                }}
                            >{showReEnterPassword ? <IconEyeSlash/> : <IconEye/>}</button>
                        }
                    />


                    <div className='flex justify-end gap-2'>
                        <button className="border px-4 py-2 rounded-lg h-9" onClick={() => onRollBack && onRollBack()}>
                            Trở lại
                        </button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg h-9">
                            Hoàn tất
                        </button>
                    </div>
                </div>

            </form>

        </div>
    )
};
