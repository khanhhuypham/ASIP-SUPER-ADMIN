import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { User } from "../../../../model/user/user";
import { ExternalLabelTextField } from "../../../../components/custom/field/external-label-textfield";
import ExternalLabelSelectField from "../../../../components/custom/field/external-label-select-field";
import { toast } from "react-toastify";
import { Branch } from "../../../../model/branch/branch";
import { HotelManagmentListProps } from "../../../hotel-management/hotel-management";
import { hotelService } from "../../../../service/hotel-service/hotel-service";
import { branchService } from "../../../../service/branch-service/branch-service";
import { SelectWithApi } from "../../../../components/custom/field/select-with-api";
import ExternalLabelSelectWithAPI from "../../../../components/custom/field/external-label-select-with-api";



let timeout: ReturnType<typeof setTimeout> | null;

export const CreateUserInfo = (
    { data, onComplete, onCancel }:
    { data: User, onComplete?: ((agr0: User) => void), onCancel?: (() => void) }
) => {
    const [randomNumber, setRandomNumber] = useState<number>(0)

    const [branchList, setBranchList] = useState<Branch[]>([])

    const [hotelParam, setHotelParam] = useState<HotelManagmentListProps>({
        data: [],
        page: 1,
        limit: 10,
        search_key: "",
    })

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

            onComplete && onComplete({ ...values })

            // data.id == 0
            //     ? onComplete && onComplete({ ...values })
            //     : update(values)

        },
    });




    const getHotelList = (value: string, callback: (data: { value: string; label: string }[]) => void) => {
    
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    
        const fetch = () => {
    
            hotelService.list({ search_key:value,page: 1, limit: 10 }).then((res) => {
                if (res.status == 200) {
                    callback((res.data.list ?? []).map((hotel) => ({ value: hotel.id.toString(), label: hotel.name })));
                } else {
                    toast.error(res.message)
                }
            })
        }
        timeout = setTimeout(fetch, 300);

    };

    const getBranchList = (hotelId: number) => {

        branchService.getList(hotelId).then((res) => {
            if (res.status == 200) {
                setBranchList(res.data ?? [])
            } else {
                toast.error(res.message)
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

        // getHotelList(hotelParam)
        getBranchList(1)

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


                    <ExternalLabelSelectWithAPI
                        fetchData={getHotelList}
                        label="Khách sạn"
                        name="hotel"
                        showSearch={true}
                        required
                        placeholder="Vui lòng chọn khách sạn"
                        onChange={(value) => {

                    
                        }}
                    />


                    <ExternalLabelSelectField
                        label="Chi nhánh"
                        name="hotel"
                        // selectedOptions={[formik.values.hotel.id]}
                        options={branchList.map((branch) => ({ value: branch.id, label: branch.name }))}
                        showSearch={true}
                        required
                        placeholder="Vui lòng chọn chi nhánh"
                        onChange={(value) => {

                            // const hotel = hotelList.find((h) => h.id == value)

                            // if (hotel) {
                            //     formik.setFieldValue("hotel", value);
                            // }

                        }}
                    />


                    {/* <SelectWithApi placeholder="input search text" style={{ width: 200 }} /> */}


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
