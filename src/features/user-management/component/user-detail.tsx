import { useEffect, useState } from "react"
import { User } from "../../../model/user/user"
import { Avatar, Tag } from "antd"
import iconApple from "../../../assets/images/icon-apple.png"
export const UserDetail = ({ input }: { input: User }) => {

    const [data, setData] = useState<User>(new User())


    useEffect(() => {

        setData(input)
    }, [input])



    const Status = () => {
        if (data.active) {
            return <Tag color="green">Đang hoạt động</Tag>;
        } else {
            return <Tag color="red">Ngừng hoạt động</Tag>;
        }
    }

    return (
        <div className="rounded-lg border max-w-lg mx-auto my-5 p-5">

            <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-2">
                    {/* <Avatar size={40} src={process.env.REACT_APP_IMAGE_URL + data.avatar.url} /> */}
                    <Avatar size={40} src={iconApple} />
                    <div>
                        <p className="font-bold text-base text-gray-800">{data.name}</p>
                        <p>Nhân viên</p>
                    </div>
                    
                </div>
                <Status />
            </div>

            {/* Details Section */}
            <div>
                <div className="flex justify-between border-b border-gray-100 py-2">
                    <div className="font-bold text-gray-600 w-40 text-sm">Mã khách sạn</div>
                    <div className="text-sm">{data.code}</div>
                </div>
                <div className="flex justify-between border-b border-gray-100 py-2">
                    <span className="font-bold text-gray-600 w-40 text-sm">Tên tài khoản</span>
                    <span className="text-sm">blueblock123</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 py-2">
                    <span className="font-bold text-gray-600 w-40 text-sm">Số điện thoại</span>
                    <span className="text-sm">{data.phone}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 py-2">
                    <span className="font-bold text-gray-600 w-40 text-sm">Email</span>
                    <span className="text-sm">{data.email}</span>
                </div>

                {/* <div className="flex justify-between py-2">
                    <div className="font-bold text-gray-600 w-40 text-sm">Ghi chú</div>
                    <div className="text-sm">{data.note === "" ? "-" : data.note}</div>
                </div> */}

            </div>
        </div>
    )

}
