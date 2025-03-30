import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Hotel } from "../../../../model/hotel/hotel";
import { ExternalLabelTextField } from "../../../../components/custom/field/external-label-textfield";
import { emailRegex, phoneRegExp } from "../../../../constants/regex";
import { ExternalLabelTextArea } from "../../../../components/custom/field/external-label-textarea";

export const CreateHotel = (
    { data, onComplete, onCancel }:
        { data: Hotel, onComplete?: ((agr0: Hotel) => void), onCancel?: (() => void) }
) => {
    const [randomNumber, setRandomNumber] = useState<number>(0)

    const formik = useFormik({
        initialValues: new Hotel(),
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, "Độ dài tối thiểu 2 ký tự")
                .max(50, "Độ dài tối đa 50 ký tự")
                .required("Tên khách hàng không được bỏ trống"),


            phone: Yup.string()
                .matches(phoneRegExp, "số điện thoại không hợp lệ")
                .required("Số điện thoại không được để trống"),

            owner_name: Yup.string()
                .min(2, "Độ dài tối thiểu 2 ký tự")
                .max(50, "Độ dài tối đa 50 ký tự")
                .required("Tên chủ khách sạn không được bỏ trống"),

            email: Yup.string()
                .matches(emailRegex, "Email không hợp lệ")
                .nullable(),

        }),
        onSubmit: (values) => {
            onComplete && onComplete({ ...values, id: 1 })
        },
    });

    const generateRandomCode = (name: string): string => {
        // Normalize the name and remove diacritical marks
        const normalized = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        // Replace Đ with D
        const sanitized = normalized.replace(/Đ/g, "D").replace(/đ/g, "d");
    
        const prefix = sanitized .split(" ").map((item) => item.charAt(0).toUpperCase()).join("");
    
        return `${prefix}00${randomNumber}`;
    };


    useEffect(() => {

        if (data.id == 0) {
            formik.resetForm()

            setRandomNumber(Math.floor(Math.random() * 900) + 100)

        } else {
            formik.setValues(data)
        }

    }, [data])

    useEffect(() => {
        if (formik.values.name == "") return

        formik.setFieldValue("code", generateRandomCode(formik.values.name))

    }, [formik.values.name])


    return (
        <div className="space-y-6 ">

            <form className='flex gap-5' onSubmit={formik.handleSubmit}>

                <div className='space-y-6 flex-1'>

                    <ExternalLabelTextField
                        label="Tên khách sạn"
                        name="name"
                        value={formik.values.name}
                        error={formik.touched.name && formik.errors.name}
                        onChange={(value) => {
                            formik.setFieldValue("name", value)
                        }}
                        required
                    />
                    <ExternalLabelTextField
                        label="Mã khách sạn"
                        name="code"
                        value={formik.values.code}
                        error={formik.touched.code && formik.errors.code}
                        onChange={(value) => {
                            formik.setFieldValue("code", value)
                        }}
                        required
                    />
                    <ExternalLabelTextField
                        label="Chủ khách sạn"
                        name="owner_name"
                        value={formik.values.owner_name}
                        error={formik.touched.owner_name && formik.errors.owner_name}
                        onChange={(value) => {
                            formik.setFieldValue("owner_name", value)
                        }}
                        required
                    />


                    <ExternalLabelTextField
                        label="Số điện thoại"
                        name="phone"
                        value={formik.values.phone}
                        error={formik.touched.phone && formik.errors.phone}
                        onChange={(value) => {
                            formik.setFieldValue("phone", value)
                        }}
                        required
                    />
                    <ExternalLabelTextField
                        label="Email"
                        name="email"
                        value={formik.values.email}
                        error={formik.touched.email && formik.errors.email}
                        onChange={(value) => {
                            formik.setFieldValue("email", value)
                        }}
                        required
                    />


                    <ExternalLabelTextArea
                        label="Ghi chú"
                        name="note"
                        placeHolder="Nhập ghi chú"
                        value={formik.values.note}
                        error={formik.errors.note}
                        onChange={(value) => {
                            formik.setFieldValue("note", value)
                        }}
                        rows={3}
                    />

                    <div className='flex justify-end gap-2'>

                        <button
                            className="border px-4 py-2 rounded-lg h-9"
                            onClick={() => onCancel && onCancel()}
                        >
                            Trở lại
                        </button>


                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg h-9">
                            Tiếp tục
                        </button>

                    </div>
                </div>

            </form>

        </div>
    )
};


