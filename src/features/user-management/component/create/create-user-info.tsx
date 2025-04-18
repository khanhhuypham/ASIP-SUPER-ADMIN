import { useFormik } from "formik";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import { User } from "../../../../model/user/user";
import { ExternalLabelTextField } from "../../../../components/custom/field/external-label-textfield";
import ExternalLabelSelectField from "../../../../components/custom/field/external-label-select-field";
import { toast } from "react-toastify";
import { Branch } from "../../../../model/branch/branch";
import { hotelService } from "../../../../service/hotel-service/hotel-service";
import { branchService } from "../../../../service/branch-service/branch-service";
import ExternalLabelSelectWithAPI, { APIParameterOfSelect } from "../../../../components/custom/field/external-label-select-with-api";
import { emailRegex, phoneRegExp } from "../../../../constants/regex";
import { SelectOption } from "../../../../constants/interface";




let timeout: ReturnType<typeof setTimeout> | null;

export const CreateUserInfo = (
    { data,saveUserForm, onComplete, onCancel }:
    { data: User,saveUserForm:boolean ,onComplete?: ((agr0: User) => void), onCancel?: (() => void) }
) => {
    const [randomNumber, setRandomNumber] = useState<number>(0)
    const [hotel, setHotel] = useState<{value:number,label:string} | undefined>(undefined)
    const [branchList, setBranchList] = useState<Branch[]>([])



    const formik = useFormik({
        initialValues: new User(),
        validationSchema: Yup.object({

            name: Yup.string()
                .min(2, "Độ dài tối thiểu 2 ký tự")
                .max(50, "Độ dài tối đa 50 ký tự")
                .required("Tên khách hàng không được bỏ trống"),

            phone: Yup.string()
                .matches(phoneRegExp, "số điện thoại không hợp lệ")
                .required("Số điện thoại không được để trống"),

            email: Yup.string().matches(emailRegex, "Email không hợp lệ").nullable(),


            branch: Yup.object().shape({
                id: Yup.number().required("Chi nhánh không được bỏ trống"),
            }).required("Chi nhánh không được bỏ trống"),


        }),
        onSubmit: (values) => {
         
            onComplete && onComplete(values)

        },
    });




    const getHotelList = (param: APIParameterOfSelect, setPram: (data: APIParameterOfSelect) => void) => {

        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }

        const fetch = () => {

            hotelService.list({ search_key: param.search_key, page: param.page, limit: param.limit }).then((res) => {
                if (res.status == 200) {

                    let newData = res.data.list.map((hotel) => ({ value: hotel.id, label: hotel.name }))

                    setPram({
                        ...param,
                        data: [...param.data, ...newData],
                        loading: false,
                        total_record: res.data.total_record
                    })

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
            if (saveUserForm) {
            
                getBranchList(data.branch.hotel.id)
                setHotel({value:data.branch.hotel.id,label:data.branch.hotel.name})
                formik.setValues(data)
            }else{
                formik.resetForm()
                setHotel(undefined)
                setRandomNumber(Math.floor(Math.random() * 900) + 100)
            }
           
        } else {
         
            setHotel({value:data.branch.hotel.id,label:data.branch.hotel.name})
            formik.setValues(data)
        }

        

    }, [data])

    // useEffect(() => {
    //     console.log(data)
    // },[])



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
                        placeholder="Vui lòng nhập tên"
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
                        disabled={true}
                    />


                    <ExternalLabelTextField
                        label="Số điện thoại"
                        name="phone"
                        placeholder="Vui lòng nhập số điện thoại"
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
                        placeholder="Vui lòng nhập email"
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
                        placeholder="Vui lòng chọn khách sạn"
                        value={hotel}
    
                        onChange={(hotel: SelectOption[] | SelectOption) => {

                            if (!Array.isArray(hotel)) {
                               
                                formik.setFieldValue("branch", new Branch());
                                getBranchList(Number(hotel.value));
                            }

                        }}
                        
                    />


                    <ExternalLabelSelectField
                        label="Chi nhánh"
                        name="branch"
                        showSearch={true}
                        placeholder="Vui lòng chọn chi nhánh"
                        options={branchList.map((branch) => ({ value: branch.id, label: branch.name }))}
                        value={formik.values.branch.id > 0 ? { value: formik.values.branch.id, label: formik.values.branch.name } : undefined}
                        error={formik.touched.branch && formik.errors.branch?.id}
                        onChange={(value:SelectOption[] | SelectOption) => {
                          
                            if (!Array.isArray(value)) {
                                const branch = branchList.find((b) => b.id === value.value);
                                if (branch) {
                                    console.log("branch: ", branch)
                                    formik.setFieldValue("branch", branch);
                                }
                            }
                        }}
                        required
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
