import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { User } from "../../../model/user/user";
import { ExternalLabelTextField } from "../../../components/custom/field/external-label-textfield";
import ExternalLabelSelectField from "../../../components/custom/field/external-label-select-field";
import { userService } from "../../../service/user-service/user-service";
import { message } from "antd";
import { toast } from "react-toastify";



export const CreateUser = (
    { data, onComplete }:
        { data: User, onComplete?: (() => void) }
) => {
    const [randomNumber, setRandomNumber] = useState<number>(0)

    const formik = useFormik({
        initialValues: new User(),
        validationSchema: Yup.object({

            // username: Yup.string()
            //     .min(2, "Độ dài tối thiểu 2 ký tự")
            //     .max(50, "Độ dài tối đa 50 ký tự")
            //     .required("Tên đăng nhập không được bỏ trống"),
            // password: Yup.string()
            //     .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
            //     .required("Mật khẩu không được để trống"),

            // re_enter_password: Yup.string()
            //     .oneOf([Yup.ref("password"), null], "Mật khẩu nhập lại không khớp")
            //     .required("Vui lòng nhập lại mật khẩu"),

        }),
        onSubmit: (values) => {
      
            data.id == 0
            ? create(values)
            : update(values)

        },
    });


    const create = (data: User) => {
        userService.create(data).then((res) => {
            if (res.status == 200) {
                onComplete && onComplete()
                toast.success("Thêm mới thành công");
            } else {
                toast.error(res.message);
            }
        })
    }

    const update = (data: User) => {
        userService.update(data).then((res) => {
            if (res.status == 200) {
                onComplete && onComplete()
                toast.success("Cập nhật thành công");
            } else {
                toast.error(res.message);
            }
        })
    }



    const generateRandomCode = (name: string): string => {
        // Normalize the name and remove diacritical marks
        const normalized = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        // Replace Đ with D
        const sanitized = normalized.replace(/Đ/g, "D").replace(/đ/g, "d");

        const prefix = sanitized.split(" ").map((item) => item.charAt(0).toUpperCase()).join("");

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
                        label="Tên nhân viên"
                        name="name"
                        placeholder="Nhập thông tin"
                        value={formik.values.name}
                        error={formik.touched.name && formik.errors.name}
                        onChange={(value) => {
                            formik.setFieldValue("name", value)
                        }}
                        required
                    />

                    <ExternalLabelTextField
                        label="Mã nhân viên"
                        name="code"
                        value={formik.values.code}
                        error={formik.touched.code && formik.errors.code}
                        onChange={(value) => {
                            formik.setFieldValue("code", value)
                        }}
                    />


                    <ExternalLabelTextField
                        label="Số điện thoại"
                        name="phone"
                        value={formik.values.phone}
                        error={formik.touched.phone && formik.errors.phone}
                        onChange={(value) => {
                            formik.setFieldValue("phone", value);
                        }}
                        required
                    />
                    <ExternalLabelTextField
                        label="Email"
                        name="email"
                        value={formik.values.email}
                        error={formik.touched.email && formik.errors.email}
                        onChange={(value) => {
                            formik.setFieldValue("email", value);
                        }}
                        required
                    />


                    {/* <ExternalLabelSelectField
                        label="Khách sạn"
                        name="hotel"
                        selectedOptions={[formik.values.hotel.id]}
                        options={hotelList.map((hotel) => ({ value: hotel.id, label: hotel.name }))}
                        showSearch={true}
                        required
                        placeholder="Vui lòng chọn khách sạn"
                        onChange={(value) => {

                            const hotel = hotelList.find((h) => h.id == value)

                            if (hotel) {
                                formik.setFieldValue("hotel", value);
                            }

                        }}
                    />

                    <ExternalLabelSelectField
                        label="Khách sạn"
                        name="hotel"
                        selectedOptions={[formik.values.hotel.id]}
                        options={hotelList.map((hotel) => ({ value: hotel.id, label: hotel.name }))}
                        showSearch={true}
                        required
                        placeholder="Vui lòng chọn khách sạn"
                        onChange={(value) => {

                            const hotel = hotelList.find((h) => h.id == value)

                            if (hotel) {
                                formik.setFieldValue("hotel", value);
                            }

                        }}
                    /> */}


                    <div className='flex justify-end gap-2'>

                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg h-9">
                            Hoàn tất
                        </button>
                    </div>
                </div>

            </form>

        </div>
    )
};
