import { Button, message, QRCode, QRCodeProps, Space, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoCompany from "../../../assets/images/logo-company.png"
import { SyncOutlined } from '@ant-design/icons';
import { authService } from "../../../service/auth/authservice";
import { ROUTE_LINK } from "../../../router/module-router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/userSlice";
import { User } from "../../../model/user/user";
import { _2FA_Auth } from "../../../model/user/_2FAAuth";
import { CheckCircleFilled, CloseCircleFilled, ReloadOutlined } from '@ant-design/icons';
import { QRStatus } from "antd/es/qr-code/interface";
import { IRootState } from "../../../store";

export const OPTContent = ({ data, onComplete }: { data: _2FA_Auth, onComplete?: (() => void) }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginForm = useSelector((state: IRootState) => state.userData.loginForm);
    const [loading, setLoading] = useState(false);
    const [QRCodeStatus, setQRCodeStatus] = useState<QRStatus>("scanned");
    const [_2FASecret, set_2FASecret] = useState<_2FA_Auth>(new _2FA_Auth());



    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!/^[0-9]?$/.test(value)) return; // Allow only numbers

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // If a digit was entered (value is not empty) AND it's not the last input field
        if (value && index < otp.length - 1) { // Use otp.length instead of undefined 'length'
            // Find the next input field in the ref array and focus it
            inputsRef.current[index + 1]?.focus(); // Use optional chaining just in case
        }

    };

    const verifyOTP = (username: string, OTP: string) => {

        authService.VerifyOtp(username, OTP).then((res) => {

            if (res.status == 201) {
                console.log("res: ", res);
                dispatch(setUser(new User({ access_token: res.data.access_token, id: res.data.user_id })))
                navigate(ROUTE_LINK.HOTEL_MANAGEMENT)
                onComplete && onComplete()
            } else {
                message.error(res.message)
            }
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            console.log("error: ", error);
        });

    };


    const getQRcode = () => {
        setQRCodeStatus("loading")
        authService.generateQRCode(1).then((res) => {

            if (res.status == 201) {
                setQRCodeStatus("active")
                setOtp(["", "", "", "", "", ""])
                inputsRef.current[0]?.focus();
                set_2FASecret(res.data)

            } else {
                setQRCodeStatus("scanned")
                message.error(res.message)
            }

        })

    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace" && otp[index] === "") {
            // If the current input is empty and Backspace is pressed, move to the previous input
            if (index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        }
    };


    const customStatusRender: QRCodeProps['statusRender'] = (info) => {
        switch (info.status) {
            case 'expired':
                return (
                    <div>
                        <CloseCircleFilled style={{ color: 'red' }} /> {info.locale?.expired}
                        <p>
                            <Button type="link" onClick={info.onRefresh}>
                                <ReloadOutlined /> {info.locale?.refresh}
                            </Button>
                        </p>
                    </div>
                );
            case 'loading':
                return (
                    <Space direction="vertical">
                        <Spin />
                        <p>Loading...</p>
                    </Space>
                );
            case 'scanned':
                return (
                    <div className="flex flex-col gap-2">
                        <div>
                            <CheckCircleFilled style={{ color: 'green' }} /> {info.locale?.scanned}
                        </div>

                        <Button type="text" icon={<ReloadOutlined />} onClick={() => getQRcode()}>
                            Refresh
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    };


    useEffect(() => {

        set_2FASecret(data)
        setOtp(["", "", "", "", "", ""])
        inputsRef.current = inputsRef.current.slice(0, otp.length);
        // Automatically focus the first input when the component appears
        inputsRef.current[0]?.focus();

        if(loginForm.QR_Code_Of_2FA && loginForm.QR_Code_Of_2FA == data.QR_Code){
            setQRCodeStatus("scanned")
        }else{
            setQRCodeStatus("active")
        }


    }, [data])



    return (

        <div className="p-6 space-y-6 md:space-y-8">
            <img src={logoCompany} />
            <div>
                <h1 className="font-bold text-[24px]">Xác minh tài khoản</h1>
                <p className="text-sm text-gray-500">Nhập mã xác minh gồm 6 chữ số đã được gửi tới Google Authenticator của bạn.</p>
            </div>

            <div className="flex flex-col items-center w-full">
                {
                    QRCodeStatus === "active" && (
                        <div className="flex justify-start w-[250px]">
                            <Button type="text" icon={<ReloadOutlined />} onClick={() => getQRcode()}>
                                Refresh
                            </Button>
                        </div>
                    )
                }

                <QRCode value={_2FASecret.QR_Code} size={250} status={QRCodeStatus} onRefresh={getQRcode} statusRender={customStatusRender} />
            </div>

            <div className="flex justify-center gap-3">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        ref={(el) => { inputsRef.current[index] = el }}
                        type="text"
                        value={value}
                        maxLength={1}
                        onChange={(event) => handleChange(index, event)}
                        onKeyDown={(event) => handleKeyDown(index, event)} // Add this line
                        style={{
                            width: "40px",
                            height: "40px",
                            textAlign: "center",
                            fontSize: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "6px",
                        }}
                    />
                ))}
            </div>

            <Button
                type="primary"
                className="w-full h-10 bg-gradient-to-r from-[#3985FF] to-[#0866FF]"
                loading={loading ? { icon: <SyncOutlined spin /> } : false}
                disabled={otp.some(digit => digit.length === 0)}
                iconPosition="end"
                onClick={() => { verifyOTP(_2FASecret.username, otp.join("")) }}
            >
                <span className="font-bold text-base">Xác minh</span>

            </Button>

        </div>
    )
}

