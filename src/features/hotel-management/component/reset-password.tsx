import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { ExternalLabelTextField } from "../../../components/custom/field/external-label-textfield";
import { LoginForm } from "../../../model/user/login-form";
import { Branch } from "../../../model/branch/branch";
import { Hotel } from "../../../model/hotel/hotel";
import { InternalLabelTextField } from "../../../components/custom/field/internal-label-textfield";




export const ResetPWD = (
    { data, onComplete, onRollBack }:
        { data: Hotel, onComplete?: (() => void), onRollBack?: (() => void) }
) => {
    const [files, setFiles] = useState<FileList | undefined>()
    const [showPassword, setShowPassword] = useState(false);


    const formik = useFormik({
        initialValues: new LoginForm(),
        validationSchema: Yup.object({

        }),
        onSubmit: (values) => {
            onComplete && onComplete()

        },
    });

    const generateRandomCode = (): string => {
        // Generate a random 3-digit number between 100 and 999
        const randomNumber = Math.floor(Math.random() * 900) + 100;
        // Combine the prefix with the random number
        return `KH00${randomNumber}`;
    };


    useEffect(() => {


    }, [data])


    return (
        <div className="space-y-6 ">

            <form className='' onSubmit={formik.handleSubmit}>

                <div className='space-y-6 flex-1 py-6 border-y-[1px]'>

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


                    <InternalLabelTextField
                        label="Nhập lại mật khẩu"
                        name="username"
                        value={formik.values.username}
                        onChange={(value) => {
                            formik.setFieldValue("username", value)
                        }}
                        required
                    />

                </div>

                <div className='flex justify-end gap-2 mt-4'>

                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Hoàn tất
                    </button>
                </div>

            </form>

        </div>
    )
};


