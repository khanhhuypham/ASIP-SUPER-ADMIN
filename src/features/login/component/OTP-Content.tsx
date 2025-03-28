import { Button, message, QRCode } from "antd";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoCompany from "../../../assets/images/logo-company.png"
import { SyncOutlined } from '@ant-design/icons';
import { authService } from "../../../service/auth/authservice";
import { ROUTE_LINK } from "../../../router/module-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/userSlice";
import { User } from "../../../model/user/user";
import { _2FA_Auth } from "../../../model/user/_2FAAuth";




export const OPTContent = ({ data }: { data: _2FA_Auth }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
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

            if (res.status == 200) {
                dispatch(setUser(new User({ access_token: res.data.access_token })))
                navigate(ROUTE_LINK.HOTEL_MANAGEMENT)
            } else {
                message.error(res.message)
            }
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            console.log("error: ", error);
        });

    };




    useEffect(() => {
        set_2FASecret(data)
        setOtp(["", "", "", "", "", ""])
        inputsRef.current = inputsRef.current.slice(0, otp.length);
        
    }, [data])



    return (

        <div className="p-6 space-y-6 md:space-y-8">
            <img src={logoCompany} />
            <div>
                <h1 className="font-bold text-[24px]">Xác minh tài khoản</h1>
                <p className="text-sm text-gray-500">Nhập mã xác minh gồm 6 chữ số đã được gửi tới Google Authenticator của bạn.</p>
            </div>

            <div className="flex justify-center w-full">
                {/* <QRCode value={_2FASecret.qr_code}  errorLevel="H" size={250} /> */}
                <div className="border bg-white rounded-lg">
                    <img src={_2FASecret.QR_Code} width={250} height={250} className="object-contain rounded-lg"/>
                </div>

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



