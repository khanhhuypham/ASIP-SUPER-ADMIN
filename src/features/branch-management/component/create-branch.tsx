import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { message } from "antd";
import { Branch } from "../../../model/branch/branch";
import { Hotel } from "../../../model/hotel/hotel";
import { emailRegex, phoneRegExp } from "../../../constants/regex";
import { hotelService } from "../../../service/hotel-service/hotel-service";
import ExternalLabelSelectField from "../../../components/custom/field/external-label-select-field";
import { ExternalLabelTextField } from "../../../components/custom/field/external-label-textfield";
import { ExternalLabelTextArea } from "../../../components/custom/field/external-label-textarea";
import { branchService } from "../../../service/branch-service/branch-service";



export const CreateBranch = ({
    data,
    onComplete,
    onRollBack,
}: {
    data: Branch;
    onComplete?: (agr0: Branch) => void;
    onRollBack?: () => void;
}) => {

    const [hotelList,setHotelList] = useState<Hotel[]>([])

    const formik = useFormik({
        initialValues: new Branch(),
        validationSchema: Yup.object({



            name: Yup.string()
                .min(2, "Độ dài tối thiểu 2 ký tự")
                .max(50, "Độ dài tối đa 50 ký tự")
                .required("Tên khách hàng không được bỏ trống"),

            phone: Yup.string()
                .matches(phoneRegExp, "số điện thoại không hợp lệ")
                .required("Số điện thoại không được để trống"),

            email: Yup.string().matches(emailRegex, "Email không hợp lệ").nullable(),

            address: Yup.string()
                .min(2, "Độ dài tối thiểu 2 ký tự")
                .required("Địa chỉ không được bỏ trống"),
        }),
        onSubmit: (values) => {
            
            if (data.id == 0) {
                create(values)
            } else {
                update(values)
            }
        },
    });


    const getHotelList = () => {
        hotelService.list({page:1,limit:500}).then((res) => {
            if (res.status == 200) {
                setHotelList(res.data.list)
            } else {
                message.error(res.message)
            }
        })
    }

    const create = (data:Branch) => {
        branchService.create(data).then((res) => {
            if (res.status == 201) {
                onComplete && onComplete(data);
            } else {
                message.error(res.message)
            }
        })
    }

    const update = (data:Branch) => {
        branchService.update(data).then((res) => {
            if (res.status == 200) {
                onComplete && onComplete(data);
            } else {
                message.error(res.message)
            }
        })
    }

  

    useEffect(() => {
        if (data.id == 0) {
            formik.resetForm();
        } else {
            formik.setValues(data);
        }

        getHotelList()
    }, [data]);

    return (
        <div className="">
            <form className="flex gap-5" onSubmit={formik.handleSubmit}>
                <div className="space-y-6 flex-1">


                    <ExternalLabelSelectField
                        label="Khách sạn"
                        name="hotel"
                        selectedOptions={[formik.values.hotel.id]}
                        options={hotelList.map((hotel) => ({value:hotel.id,label:hotel.name}))}
                        showSearch={true}
                        required
                        placeholder="Vui lòng chọn khách sạn"
                        onChange={(value) => {

                            const hotel = hotelList.find((h) => h.id == value)

                            if (hotel){
                                formik.setFieldValue("hotel", value);
                            }
                        }}
                    />


                    <ExternalLabelTextField
                        label="Tên chi nhánh"
                        name="name"
                        value={formik.values.name}
                        error={formik.touched.name && formik.errors.name}
                        onChange={(value) => {
                            formik.setFieldValue("name", value);
                        }}
                        required
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

                    <ExternalLabelTextField
                        label="Địa chỉ"
                        name="address"
                        value={formik.values.address}
                        error={formik.touched.address && formik.errors.address}
                        onChange={(value) => {
                            formik.setFieldValue("address", value);
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
                            formik.setFieldValue("description", value);
                        }}
                        rows={3}
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            className="border px-4 py-2 rounded-lg h-9"
                            onClick={() => onRollBack && onRollBack()}
                        >
                            Trở lại
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg h-9"
                        >
                            Tiếp tục
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};


