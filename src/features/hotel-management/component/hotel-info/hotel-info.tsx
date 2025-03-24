import { Avatar } from "antd";

import { Hotel } from "../../../../model/hotel/hotel";
import iconApple from "../../../../assets/images/icon-apple.png"

export const HotelInfor = ({ data }: { data: Hotel }) => {

    return (
        <div className="rounded-lg border max-w-lg mx-auto my-5 p-5">

            <div className="flex items-center justify-between mb-5">

                <div>
                    {/* <Avatar size={40} src={process.env.REACT_APP_IMAGE_URL + data.avatar.url} /> */}
                    <Avatar size={40} src={iconApple} />
                    <div className="font-bold text-base text-gray-800">{data.name}</div>
                </div>
                <button
                    className="bg-green-100 text-green-800 border-none rounded-md px-3 py-2 ml-auto text-xs cursor-default"
                >
                    {/* {customerData.status} */} Đang hoạt động
                </button>
            </div>

            {/* Details Section */}
            <div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <div className="font-bold text-gray-600 w-40 text-sm">Mã khách sạn</div>
                    <div className="text-sm">{data.code}</div>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-bold text-gray-600 w-40 text-sm">Chủ khách sạn</span>
                    <span className="text-sm">{data.owner}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-bold text-gray-600 w-40 text-sm">Số điện thoại</span>
                    <span className="text-sm">{data.phone}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-bold text-gray-600 w-40 text-sm">Email</span>
                    <span className="text-sm">{data.email}</span>
                </div>
            
                <div className="flex justify-between py-2">
                    <div className="font-bold text-gray-600 w-40 text-sm">Ghi chú</div>
                    <div className="text-sm">{data.note === "" ? "-" : data.note}</div>
                </div>
            </div>
        </div>
    )
}