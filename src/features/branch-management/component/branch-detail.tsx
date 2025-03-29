import { Avatar, Tag } from "antd";


import iconApple from "../../../assets/images/icon-apple.png"
import { Branch } from "../../../model/branch/branch";

export const BranchInfor = ({ data }: { data: Branch }) => {

    const Status = () => {
        if (data.active ) {
            return <Tag color="green">Đang kinh doanh</Tag>;
        } else {
            return <Tag color="red">Ngừng kinh doanh</Tag>;
        }
    }
    return (
        <div className="rounded-lg border max-w-lg mx-auto my-5 p-5">

            <div className="flex items-center justify-between mb-5">

                <div>
                    <Avatar size={40} src={iconApple} />
                    <div className="font-bold text-base text-gray-800">{data.name}</div>
                </div>
                <Status/>
            </div>

            {/* Details Section */}
            <div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <div className="font-bold text-gray-600 w-40 text-sm">Tện khách sạn</div>
                    <div className="text-sm">Ov123</div>
                </div>
             
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-bold text-gray-600 w-40 text-sm">Số điện thoại</span>
                    <span className="text-sm">{data.phone}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-bold text-gray-600 w-40 text-sm">Email</span>
                    <span className="text-sm">{data.email}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-bold text-gray-600 w-40 text-sm">Địa chỉ chi nhánh</span>
                    <span className="text-sm">{data.address}</span>
                </div>
            
                <div className="flex justify-between py-2">
                    <div className="font-bold text-gray-600 w-40 text-sm">Mô tả chi nhánh</div>
                    <div className="text-sm">{data.description === "" ? "-" : data.description}</div>
                </div>
            </div>
        </div>
    )
}