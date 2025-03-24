import { useEffect, useState } from "react"
import { PopupInterface } from "../../constants/interface"
import { Button, Input, Modal, Select, DatePicker } from "antd"
import { Hotel } from "../../model/hotel/hotel"
import { tab_filter_id } from "../../constants/tag-id"
import { DialogContent } from "../../components/custom/dialog-content"
import IconPause from "../../components/icons/icon-pause"
import { HotelDetail } from "./component/hotel-info/hotel-detail"
import { removeVietnameseFromString } from "../../utils/helpers"
import { CreateForm } from "./component/create/create-form"
import { HotelManagementTable } from "./component/table/hotel-management-table"
import { ResetPWD } from "./component/reset-password"
import { EditHotel } from "./component/edit-hotel"
import { TabBar } from "../../components/custom/tab-bar"
import { reportFilter } from "../../constants/constant"
import IconUnlock from "../../components/icons/icon-unclock"

const { RangePicker } = DatePicker;
export interface HotelManagmentListProps {
    data: Hotel[]
    loading: boolean,
    search_key?: string
    onPageChange?: ((page: number) => void)
    onEdit?: ((arg0: Hotel) => void)
    onResetPWD?: ((arg0: Hotel) => void)
    onChangeStatus?: ((arg0: Hotel) => void)
    onShowDetail?: ((arg0: Hotel) => void)
}



const HotelManagment = () => {

    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });
    const [data, setData] = useState<Hotel[]>([
        new Hotel({ id: 1 }),
        new Hotel({ id: 2 }),
        new Hotel({ id: 3 }),
        new Hotel({ id: 4 }),
    ])
    const [fullData, setFullData] = useState<Hotel[]>([])


    const tabs = [
        { id: 1, label: "tất cả" },
        { id: 2, label: "Đang hoạt động (30)" },
        { id: 3, label: "Ngừng hoạt động (30)" },

    ];

    const getRoomtType = () => {

    }

    const deleteRoomtType = (data: Hotel) => {

    }

    useEffect(() => {
        getRoomtType()
    }, []);


    const showModalCreate = (data: Hotel) => {
        let component = data.id == 0 ?
            (
                <CreateForm data={data} onComplete={() => {
                    setDialog({ ...dialog, open: false,width:undefined })
                }} />
            )
            :
            (
                <EditHotel data={data} onComplete={() => {
                    setDialog({ ...dialog, open: false })
                }} />
            )
        let width = data.id == 0 ? 750 :undefined
        let title = data.id == 0 ? "Tạo khách sạn" : "Chỉnh sửa khách sạn"

        setDialog({ ...dialog, open:true, width:width, content:component, title:title })
    }



    const showDetailModal = (data: Hotel) => {
        let component = <HotelDetail data={data} />
        setDialog({ ...dialog, open: true, content: component, title: "Chi tiết khách sạn" })
    }


    const showResetPWDModal = (data: Hotel) => {
        let component = <ResetPWD data={data} onComplete={() => {
            setDialog({ ...dialog, open: false })
        }}/>
        setDialog({ ...dialog, open: true, content: component, title: "Đặt lại mật khẩu" })
    }

    const showModalConfirm = (type:number,data: Hotel) => {
        
        let content = <></>

        switch (type){

            case 1:// 1 = popup confirmation of active and inactive hotel
                if (data.active) {
                    content = <DialogContent
                        icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconPause /></p>}
                        title="Tạm ngưng khách sạn?"
                        content={<p>Bạn có chắc chắn muốn tạm ngưng khách sạn <b>{data.name}</b> này không?</p>}
                        btnConfirm={<Button color="danger" variant="solid">Xác nhận</Button>}
                    />
                }else{
                    content = <DialogContent
                        icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconPause /></p>}
                        title="Bật hoạt động khách sạn"
                        content={<p>Bạn có chắc chắn muốn bật hoạt động khách sạn <b>{data.name}</b> này không?</p>}
                        btnConfirm={<Button color="blue" variant="solid">Xác nhận</Button>}
                  
                    />
                }

               
                break

            case 2:// 2 = popup confirmation of reset password
                content = <DialogContent
                    icon={<p className="p-3 bg-blue-100 w-fit rounded-full text-center"><IconUnlock fill={true}/></p>}
                    title="Đặt lại mật khẩu"
                    content={<p>Bạn có chắc chắn muốn đặt lại mật khẩu cho khách sạn <b>{data.name}</b> này không?</p>}
                    btnConfirm={
                        <Button color="blue" variant="solid" onClick={() => {
                            setDialog({ ...dialog, open: false})
                            showResetPWDModal(data)
                        }}>Xác nhận</Button>
                    }
                  
                />
                break

        }

        setDialog({ ...dialog, open: true, content: content, title: "" })
    }


    const onSearch = (key: string) => {
        let keySearch = key.toLowerCase();
        const filteredData = fullData.filter((item) => item.active);

        const data = keySearch
            ? filteredData.filter((item) => {
                let name = item.name.toLowerCase();
                if (!removeVietnameseFromString(keySearch)) {
                    name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    keySearch = keySearch.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                }
                return name.includes(keySearch);
            })
            : filteredData;


        setData(data);

    };



    const Header = () => {
        return (
            <div id={tab_filter_id} className="space-y-4">

                <div className="flex justify-between">
                    <Input
                        placeholder="Tìm kiếm hạng phòng"
                        className="w-64"
                        prefix={<i className="fa-solid fa-magnifying-glass" />}
                        allowClear
                        onChange={(e) => onSearch(e.target.value)}
                    />
                    <div className="flex justify-end gap-3">
                       
                        <Select
                            defaultValue={1}
                            
                            // optionFilterProp="label"
                            className="w-[150px]"
                            onChange={(value: number) => { console.log(value) }}
                            options={reportFilter}
                        />
                        <RangePicker/>

                        <Button type="primary" onClick={() => showModalCreate(new Hotel())}>+ Tạo khách sạn</Button>

                    </div>

                </div>

                <TabBar tabs={tabs} onChange={(value) => {

                }} />
            </div>
        )
    };


    return (
        <div className="panel space-y-6">

            <Header />

            <HotelManagementTable
                data={data}
                loading={false}
                onEdit={(value) => showModalCreate(value)}
                onResetPWD={(value) => showModalConfirm(2,value)} //2 = popup confirmation of reset password
                onChangeStatus={(value) => showModalConfirm(1,value)} // 1 = popup confirmation of active and inactive hotel
                onShowDetail={(value) => showDetailModal(value)}
            />

            <Modal
                width={dialog.width}
                className="w-full"
                title={dialog.title}
                centered
                open={dialog.open}
                onCancel={() => setDialog({ ...dialog, open: false })}
                footer={<></>}
            >
                {dialog.content ?? <></>}
            </Modal>
        </div>
    );

}


export default HotelManagment;


