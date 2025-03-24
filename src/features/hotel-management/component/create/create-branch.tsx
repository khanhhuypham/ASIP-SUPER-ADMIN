import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Hotel } from "../../../../model/hotel/hotel";
import { ExternalLabelTextField } from "../../../../components/custom/field/external-label-textfield";
import { emailRegex, phoneRegExp } from "../../../../constants/regex";
import { ExternalLabelTextArea } from "../../../../components/custom/field/external-label-textarea";
import { Branch } from "../../../../model/branch/branch";



export const CreateBranch = (
        { data, onComplete,onRollBack }:
        { data: Branch, onComplete?: (() => void),onRollBack?:(() => void)}
) => {
    const [files, setFiles] = useState<FileList | undefined>()


    const formik = useFormik({
        initialValues: new Branch(),
        validationSchema: Yup.object({
            // name: Yup.string()
            //     .min(2, "Độ dài tối thiểu 2 ký tự")
            //     .max(50, "Độ dài tối đa 50 ký tự")
            //     .required("Tên khách hàng không được bỏ trống"),


            // phone: Yup.string()
            //     .matches(phoneRegExp, "số điện thoại không hợp lệ")
            //     .required("Số điện thoại không được để trống"),

            // email: Yup.string()
            //     .matches(emailRegex, "Email không hợp lệ")
            //     .nullable(),

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

        if (data.id == 0) {
            formik.resetForm()
            setFiles(undefined)
            formik.setFieldValue("code", generateRandomCode())
        } else {
            formik.setValues(data)

        }

    }, [data])


    return (
        <div className="">
         
            <form className='flex gap-5' onSubmit={formik.handleSubmit}>

                <div className='space-y-6 flex-1'>

                    <ExternalLabelTextField
                        label="Tên chi nhánh"
                        name="name"
                        value={formik.values.name}
                        error={formik.errors.name}
                        onChange={(value) => {
                            formik.setFieldValue("name", value)
                        }}
                        required
                    />



                    <ExternalLabelTextField
                        label="Số điện thoại"
                        name="phone"
                        value={formik.values.phone}
                        error={formik.errors.phone}
                        onChange={(value) => {
                            formik.setFieldValue("phone", value)
                        }}
                        required
                    />
                    <ExternalLabelTextField
                        label="Email"
                        name="email"
                        value={formik.values.email}
                        error={formik.errors.email}
                        onChange={(value) => {
                            formik.setFieldValue("email", value)
                        }}
                        required
                    />


                    <ExternalLabelTextField
                        label="Địa chỉ"
                        name="address"
                        value={formik.values.address}
                        error={formik.errors.address}
                        onChange={(value) => {
                            formik.setFieldValue("address", value)
                        }}
                        required
                    />
                    <ExternalLabelTextArea
                        label="Mô tả"
                        name="description"
                        placeHolder="Mô tả"
                        value={formik.values.description}
                        error={formik.errors.description}
                        onChange={(value) => {
                            formik.setFieldValue("description", value)
                        }}
                        rows={3}
                    />

                    <div className='flex justify-end gap-2'>
                        <button className="border px-4 py-2 rounded-lg" onClick={() => onRollBack && onRollBack()}>
                            Trở lại
                        </button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                            Tiếp tục
                        </button>
                    </div>
                </div>

            </form>

        </div>
    )
};

