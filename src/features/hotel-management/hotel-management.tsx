import { useEffect, useState } from "react"
import { PopupInterface } from "../../constants/interface"
import { Button, Input, Modal, Select, DatePicker, message } from "antd"
import { Hotel } from "../../model/hotel/hotel"
import { tab_filter_id } from "../../constants/tag-id"
import { DialogContent } from "../../components/custom/dialog-content"
import IconPause from "../../components/icons/icon-pause"
import { HotelDetail } from "./component/hotel-info/hotel-detail"
import { CreateForm } from "./component/create/create-form"
import { HotelManagementTable } from "./component/table/hotel-management-table"
import { ResetPWD } from "./component/reset-password"
import { EditHotel } from "./component/edit-hotel"
import { Tab, TabBar } from "../../components/custom/tab-bar"
import { Antd_DATE_FORMAT, reportFilter } from "../../constants/constant"
import IconUnlock from "../../components/icons/icon-unclock"
import { STATUS } from "../../constants/enum"
import { SearchOutlined } from "@ant-design/icons";
import { hotelService } from "../../service/hotel-service/hotel-service"
import useDebounce from "../../hooks/useDebounce"

const { RangePicker } = DatePicker;


export interface HotelManagmentListProps {
    data?: Hotel[]
    loading?: boolean,
    key_search?: string
    is_active?: STATUS
    from_date?: string
    to_date?: string
    page?: number
    limit?: number
    total_record?: number
    onPageChange?: ((page: number) => void)
    onEdit?: ((arg0: Hotel) => void)
    onResetPWD?: ((arg0: Hotel) => void)
    onChangeStatus?: ((arg0: Hotel) => void)
    onShowDetail?: ((arg0: Hotel) => void)
}



const HotelManagment = () => {

    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });


    const [tabs, setTabs] = useState<Tab[]>([
        { id: STATUS.ALL, label: "Tất cả", count: 0 },
        { id: STATUS.ACTIVE, label: "Đang hoạt động", count: 0 },
        { id: STATUS.INACTIVE, label: "Ngừng hoạt động", count: 0 },
    ])

    const [parameter, setParameter] = useState<HotelManagmentListProps>({
        data: [],
        loading: false,
        is_active: STATUS.ALL,
        from_date: "",
        to_date: "",
        page: 1,
        limit: 10,
        total_record: 0,
        key_search: "",
    });
    const [searchInput, setSearchInput] = useState(parameter.key_search || "");


    useEffect(() => {
        getHotelList(parameter);
    }, [parameter.is_active, parameter.key_search, parameter.from_date, parameter.to_date, parameter.page]);


    useEffect(() => {
        setParameter(prev => ({ ...prev, key_search: searchInput }));
    }, [useDebounce(searchInput, 300)]);

    //====================================================================================================API===================================================================================================
    const getHotelList = (param: HotelManagmentListProps) => {
        hotelService.list(param).then((res) => {

            if (res.status == 200) {
                console.log(res.data)
                setParameter({
                    ...parameter,
                    data: res.data.list,
                    total_record: res.data.total_record
                })

                setTabs((prev) => prev.map((tab) => {
                    switch (tab.id) {
                        case STATUS.ALL:
                            return { ...tab, count: res.data.statistic.total }
                        case STATUS.ACTIVE:
                            return { ...tab, count: res.data.statistic.total_active }
                        case STATUS.INACTIVE:
                            return { ...tab, count: res.data.statistic.total_inactive }
                        default:
                            return tab
                    }
                }))


            } else {
                message.error(res.message)
            }
        })
    }



    const changeStatus = (data: Hotel) => {
        hotelService.changeStatus(data.id).then((res) => {
            if (res.status == 200) {
                getHotelList(parameter)
                message.success("Thay đổi trạng thái thành công");
            } else {

                message.error(res.message);
            }
        })
    }


    //===================================================================================================Show modal===================================================================================================
    const showModalCreate = (data: Hotel) => {
        let component = data.id == 0 ?
            (
                <CreateForm data={data}
                    onComplete={() => {
                        getHotelList(parameter)
                        setDialog({ ...dialog, open: false, width: undefined })
                    }}
                    onCancel={() => setDialog({ ...dialog, open: false })}
                />
            )
            :
            (
                <EditHotel data={data} onComplete={() => {
                    getHotelList(parameter)
                    setDialog({ ...dialog, open: false })
                }} />
            )
        let width = data.id == 0 ? 750 : undefined
        let title = data.id == 0 ? "Tạo khách sạn" : "Chỉnh sửa khách sạn"

        setDialog({ ...dialog, open: true, width: width, content: component, title: title })
    }



    const showDetailModal = (data: Hotel) => {
        let component = <HotelDetail input={data} />
        setDialog({ ...dialog, open: true, content: component, title: "Chi tiết khách sạn" })
    }


    const showResetPWDModal = (data: Hotel) => {
        let component = <ResetPWD data={data} onComplete={() => {
            setDialog({ ...dialog, open: false })
        }} />
        setDialog({ ...dialog, open: true, content: component, title: "Đặt lại mật khẩu" })
    }

    const showModalConfirm = (type: number, data: Hotel) => {

        let content = <></>

        switch (type) {

            case 1:// 1 = popup confirmation of active and inactive hotel


                if (data.is_active == STATUS.ACTIVE) {


                    content = <DialogContent
                        icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconPause /></p>}
                        title="Tạm ngưng khách sạn?"
                        content={<p>Bạn có chắc chắn muốn tạm ngưng khách sạn <b>{data.name}</b> này không?</p>}
                        btnConfirm={
                            <Button color="red" variant="solid" onClick={() => {
                                changeStatus(data)
                                setDialog({ ...dialog, open: false })
                            }}>
                                Xác nhận
                            </Button >
                        }
                        btnCancel={
                            < Button variant="outlined"
                                onClick={() => setDialog({ ...dialog, open: false })}
                                style={{ color: "black", border: "1px solid #E5E7EB", }}
                            >
                                Trở lại
                            </Button >
                        }
                    />



                } else {
                    content = <DialogContent
                        icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconPause /></p>}
                        title="Bật hoạt động khách sạn"
                        content={<p>Bạn có chắc chắn muốn bật hoạt động khách sạn <b>{data.name}</b> này không?</p>}
                        btnConfirm={
                            <Button color="blue" variant="solid" onClick={() => {
                                changeStatus(data)
                                setDialog({ ...dialog, open: false })
                            }}>
                                Xác nhận
                            </Button>
                        }
                        btnCancel={
                            <Button variant="outlined"
                                onClick={() => setDialog({ ...dialog, open: false })}
                                style={{ color: "#374151", border: "1px solid #E5E7EB", }}
                            >
                                Trở lại
                            </Button>
                        }
                    />
                }


                break

            case 2:// 2 = popup confirmation of reset password
                content = <DialogContent
                    icon={<p className="p-3 bg-blue-100 w-fit rounded-full text-center"><IconUnlock fill={true} /></p>}
                    title="Đặt lại mật khẩu"
                    content={<p>Bạn có chắc chắn muốn đặt lại mật khẩu cho khách sạn <b>{data.name}</b> này không?</p>}
                    btnConfirm={
                        <Button color="blue" variant="solid" onClick={() => {
                            setDialog({ ...dialog, open: false })
                            showResetPWDModal(data)
                        }}>
                            Xác nhận
                        </Button>
                    }
                    btnCancel={
                        <Button variant="outlined" onClick={() => setDialog({ ...dialog, open: false })}>
                            Trở lại
                        </Button>
                    }
                />
                break
        }

        setDialog({ ...dialog, open: true, content: content, title: "" })
    }



    //===================================================================================================Function===================================================================================================
    const onChangeStatus = (status: number) => {
        setParameter({ ...parameter, is_active: status, page: 1 })
    };
    const onChangeDateRange = (from_date: string, to_date: string) => {
        setParameter({ ...parameter, from_date: from_date, to_date: to_date, page: 1 })
    };


    return (
        <div className="panel space-y-6">
            {/* header */}
            <div id={tab_filter_id} className="space-y-4">

                <div className="flex justify-between">
                    <Input
                        placeholder="Tìm kiếm hạng phòng"
                        className="w-64"
                        value={searchInput} // Use value instead of defaultValue
                        prefix={<SearchOutlined />}
                        allowClear
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSearchInput(e.target.value); // Update only the local state
                        }}
                    />
                    <div className="flex justify-end gap-3">
                        <RangePicker format={Antd_DATE_FORMAT.DDMMYYY} onChange={(value, dateString) => {
                            console.log('Formatted Selected Time: ', dateString);
                            onChangeDateRange(dateString[0], dateString[1])
                        }} />

                        <Button type="primary" onClick={() => showModalCreate(new Hotel())}>+ Tạo khách sạn</Button>
                    </div>
                </div>

                <TabBar currentTab={parameter.is_active ?? STATUS.ALL} tabs={tabs} onChange={(value) => onChangeStatus(value)} />

            </div>
            {/* header */}
            <HotelManagementTable
                data={parameter.data}
                loading={false}
                page={parameter.page}
                limit={parameter.limit}
                total_record={parameter.total_record}
                onPageChange={(page) => {
                    setParameter({ ...parameter, page });
                }}
                onEdit={(value) => showModalCreate(value)}
                onResetPWD={(value) => showModalConfirm(2, value)} //2 = popup confirmation of reset password
                onChangeStatus={(value) => showModalConfirm(1, value)} // 1 = popup confirmation of active and inactive hotel
                onShowDetail={(value) => showDetailModal(value)}
            />

            <Modal
                width={dialog.width}
                className="w-full"
                title={dialog.title}
                centered
                open={dialog.open}
                onCancel={() => setDialog({ ...dialog, open: false, width: undefined })}
                footer={<></>}
            >
                {dialog.content ?? <></>}
            </Modal>
        </div>
    );

}



export default HotelManagment;


