
import imgLogin from "../../assets/images/image-login.png"
import logoCompany from "../../assets/images/logo-company.png"
import { InternalLabelTextField } from "../../components/custom/field/internal-label-textfield"
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoginForm } from "../../model/user/login-form";
import { useEffect, useState } from "react";
import { Button, message, Modal } from "antd";
import { SyncOutlined } from '@ant-design/icons';
import Checkbox from "../../components/custom/checkbox";
import { useSelector } from "react-redux";

import { authService } from "../../service/auth/authservice";
import { PopupInterface } from "../../constants/interface";
import { OPTContent } from "./component/OTP-Content";
import { _2FA_Auth } from "../../model/user/_2FAAuth";
import { IRootState } from "../../store";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "../../constants/cookie-key";


export const LoginPage = () => {
    const userSlice = useSelector((state: IRootState) => state.userData);
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [dialog, setDialog] = useState<PopupInterface>({ open: false, title: "" });



    const formik = useFormik({
        initialValues: new LoginForm(),

        validationSchema: Yup.object({


            username: Yup.string()
                .min(2, "Độ dài tối thiểu 2 ký tự")
                .max(50, "Độ dài tối đa 50 ký tự")
                .required("Tên đăng nhập không được bỏ trống"),

            password: Yup.string()
                .required("Mật khẩu không được bỏ trống"),


        }),
        onSubmit: (values) => {

            signIn(values.username, values.password)

        },
    });


    const signIn = (username: string, password: string) => {

        authService.SignIn(username, password).then((res) => {
            
            if (res.status == 201) {
                showQRCode({ ...res.data, username: username })
            } else {
                message.error(res.message)
            }
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            console.log("error: ", error);
        });

    };




    const showQRCode = (data: _2FA_Auth) => {
  
        let component = <OPTContent data={data} onComplete={() => {

            Cookies.set(COOKIE_KEYS.REMEMBER_ME, JSON.stringify(rememberMe), { expires: 24 * 60 * 60 });

            if (rememberMe) {
                let loginForm = {...formik.values,QR_Code_Of_2FA:data.QR_Code}
                Cookies.set(COOKIE_KEYS.LOGINFORM, JSON.stringify(loginForm), { expires: 24 * 60 * 60 });
            } else {
                Cookies.remove(COOKIE_KEYS.LOGINFORM);
            }

        }} />
        setDialog({ ...dialog, open: true, content: component, title: "Chi tiết khách sạn" })
    }




    useEffect(() => {
        formik.resetForm()
 
        const storedValue = Cookies.get(COOKIE_KEYS.REMEMBER_ME);

        if (storedValue) {
            const rememberMe = JSON.parse(storedValue) as boolean;
            setRememberMe(rememberMe);

            if (rememberMe) {
                formik.setFieldValue("username", userSlice.loginForm.username)
                formik.setFieldValue("password", userSlice.loginForm.password)
            }
        }

    }, [])



    return (

        <>
            <div className="h-screen flex">
                <div className=" w-[600px] h-full py-10 bg-white">

                    <div className="px-5 flex justify-start">
                        <img className=" h-[25px] object-contain" src={logoCompany} />
                    </div>

                    <div className="h-full flex justify-center items-center">
                        <div className="px-20 space-y-10 ">
                            <div>
                                <h1 className="font-bold text-[32px]">Chào mừng đến với Asip</h1>
                                <p className="text-base text-gray-500">Vui lòng đăng nhập để tiếp tục vào tài khoản của bạn.</p>
                            </div>

                            <div className="space-y-4">


                                <InternalLabelTextField
                                    label="Tên tài khoản"
                                    name="username"
                                    value={formik.values.username}
                                    error={formik.touched.username && formik.errors.username}
                                    onChange={(value) => {
                                        formik.setFieldValue("username", value)
                                    }}
                                    required
                                />

                                <InternalLabelTextField
                                    label="Mật khẩu"
                                    name="password"
                                    value={formik.values.password}
                                    error={formik.touched.password && formik.errors.password}
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

                                <div className="flex items-end justify-between h-6">
                                    <Checkbox label="Lưu đăng nhập" checked={rememberMe} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setRememberMe(event.target.checked)
                                    }} />
                                    <button type="button" className="text-sm font-medium text-primary-600 hover:underline text-primary">
                                        Quên mật khẩu?
                                    </button>
                                </div>

                                <Button
                                    type="primary"
                                    className="w-full h-10 bg-gradient-to-r from-[#3985FF] to-[#0866FF]"
                                    loading={loading ? { icon: <SyncOutlined spin /> } : false}

                                    onClick={() => {
                                        setLoading(true);
                                        formik.handleSubmit()

                                    }}
                                    iconPosition="end"
                                >
                                    <span className="font-bold text-lg">Đăng nhập</span>

                                </Button>


                            </div>

                        </div>
                    </div>

                </div>
                <div className="flex-1 py-[100px] h-full flex justify-center items-center bg-gray-50">
                    <img
                        className="w-[60%] object-contain max-h-full"
                        src={imgLogin}
                        alt="Login Image"
                    />
                </div>
            </div>

            <Modal
                className="rounded-none"
                centered
                title={dialog.title}
                open={dialog.open}
                footer={false}
                onCancel={() => {
                    setDialog({ ...dialog, open: false })
                }}
            >
                {dialog.content ?? <></>}
            </Modal>
        </>
    )
}