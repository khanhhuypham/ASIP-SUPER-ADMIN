import { useEffect, useState } from "react"
import { PopupInterface } from "../../constants/interface"
import { User } from "../../model/user/user"
import { userService } from "../../service/user-service/user-service"
import { Tab, TabBar } from "../../components/custom/tab-bar"
import { STATUS } from "../../constants/enum"
import { Button, Input, message, Modal, Select } from "antd"
import { DialogContent } from "../../components/custom/dialog-content"
import { tab_filter_id } from "../../constants/tag-id"
import { UserManagementTable } from "./component/user-management-table"
import { CreateUser } from "./component/create-user"
import { UserDetail } from "./component/user-detail"
import IconUnlock from "../../components/icons/icon-unclock"
import {  ExternalLabelDebounceSelect } from "../../components/custom/field/external-label-debounce-select"
import { OptionType } from "../../components/custom/field/debounce-select"
import { hotelService } from "../../service/hotel-service/hotel-service"
import { Hotel } from "../../model/hotel/hotel"
import { branchService } from "../../service/branch-service/branch-service"
import { Branch } from "../../model/branch/branch"
import { HotelManagmentListProps } from "../hotel-management/hotel-management"

export interface UserManagmentListProps {
    data?: User[]
    loading?: boolean
    key_search?: string
    hotel_id?: number
    branch_id?: number
    currentTab?:STATUS
    page?: number
    limit?: number
    total_record?: number
    onPageChange?: ((page: number) => void)
    onEdit?: ((arg0: User) => void)
    onResetPWD?: ((arg0: User) => void)
    onChangeStatus?: ((arg0: User) => void)
    onShowDetail?: ((arg0: User) => void)
}



const UserManagment = () => {

    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });
    const [tabs, setTabs] = useState<Tab[]>([
        { id: STATUS.ALL, label: "Tất cả", count: 0 },
        { id: STATUS.ACTIVE, label: "Đang hoạt động", count: 0 },
        { id: STATUS.INACTIVE, label: "Ngừng hoạt động", count: 0 },
    ])


    const [parameter, setParameter] = useState<UserManagmentListProps>({
        data: [],
        loading: false,
        hotel_id:-1,
        branch_id:-1,
        currentTab:STATUS.ALL,
        page: 1,
        limit: 10,
        total_record: 0,
        key_search: "",
    })

    const [branchList, setBranchList] = useState<Branch[]>([])

    const [hotelParam, setHotelParam] = useState<HotelManagmentListProps>({
        data: [],
        page: 1,
        limit: 10,
        key_search: "",
    })




    const getList = () => {

        userService.list(parameter).then((res) => {
            if (res.status == 200) {
                setParameter({
                    ...parameter,
                    data: res.data.list,
                    total_record: res.data.total_record
                })
            } else {
                message.error(res.message)
            }
        })
    }


    const getHotelList = () => {

        hotelService.list(hotelParam).then((res) => {
            if (res.status == 200) {
                setHotelParam({ ...hotelParam,data: res.data.list})
            } else {
                message.error(res.message)
            }
        })
    }

    const getBranchList = (hotelId: number) => {

        branchService.getList(hotelId).then((res) => {
            if (res.status == 200) {
                setBranchList(res.data ?? [])
            } else {
                message.error(res.message)
            }
        })

    }

    const changeStatus = (user: User) => {

        userService.changeStatus(user.id).then((res) => {
            if (res.status == 200) {
                getList()
            } else {
                message.error(res.message)
            }
        })
    }



    useEffect(() => {
        getList()
    }, [parameter.page,parameter.key_search,parameter.hotel_id,parameter.branch_id]);

    


    useEffect(() => {
        getHotelList()
    }, [hotelParam.page,hotelParam.key_search]);


    const showModalCreate = (data: User) => {
        let component = <CreateUser data={data} />;
        setDialog({ ...dialog, open: true, content: component, title: data.id == 0 ? "Tạo nhân viên" : "Chỉnh sửa nhân viện" })
    }


    const showDetailModal = (data: User) => {
        let component = <UserDetail input={data} />
        setDialog({ ...dialog, open: true, content: component, title: "Chi tiết chi nhánh" })
    }



    const showModalConfirm = (data: User) => {
        let content = <DialogContent
            icon={<p className="p-3 bg-blue-100 w-fit rounded-full text-center"><IconUnlock fill={true} /></p>}
            title="Đặt lại mật khẩu"
            content={<p>Bạn có chắc chắn muốn đặt lại mật khẩu cho khách sạn <b>{data.name}</b> này không?</p>}
            btnConfirm={
                <Button color="blue" variant="solid" onClick={() => {
                    setDialog({ ...dialog, open: false })
                    // showResetPWDModal(data)
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

        setDialog({ ...dialog, open: true, content: content, title: "" })
    }

    const onSearch = (key: string) => {
        
    };



    const Header = () => {
        return (
            <div id={tab_filter_id} className="space-y-4">

                <div className="flex justify-between">

                    <div className="space-x-2">
                        <Input
                            placeholder="Tìm kiếm"
                            className="w-64"
                            prefix={<i className="fa-solid fa-magnifying-glass" />}
                            allowClear
                            onChange={(e) => {
                                // const newValue = e.target.value;
                                // getList({...parameter,key_search:newValue})
                            }}
                        />

                        <ExternalLabelDebounceSelect
                            showSearch={true}
                            options={[{ value: "-1", label: "Tất cả" }, ...(hotelParam.data ?? []).map((b) => ({ value: b.id.toString(), label: b.name }))]}
                            placeholder="Select users"
                            value={parameter.hotel_id !== undefined ? [parameter.hotel_id] : undefined}
                            onSearch={(value) =>  setHotelParam({ ...hotelParam,key_search: value,page:1})}
                            onScrollDown={(value: boolean) => console.log(value)}
                            onChange={(newValue) => {
                            
                                if (!Array.isArray(newValue)) {
                                    setParameter({ ...parameter, hotel_id: Number(newValue.value) });
                                    getBranchList(Number(newValue.value))
                                }
                                
                            }}
                            className="w-[150px]"
                        />
                    

                        <Select
                            value={parameter.branch_id}
                            className="w-[150px]"
                            showSearch
                            placeholder="Tên chi nhánh"
                            optionFilterProp="children"
                            options={[{ value: -1, label: "Tất cả" }, ...branchList.map((b) => ({ value: b.id, label: b.name }))]}
                            onChange={(value) => setParameter({ ...parameter,branch_id:value})}
                            dropdownStyle={{ maxHeight: 400 }}
                            notFoundContent="Không tìm thấy khách sạn"
                        />

                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="primary" onClick={() => showModalCreate(new User())}>+ Thêm nhân viên</Button>
                    </div>

                </div>

                <TabBar currentTab={parameter.currentTab ?? STATUS.ALL} tabs={tabs} onChange={(value) => setParameter({ ...parameter,currentTab:value,page:1})} />
            </div>
        )
    };


    return (
        <div className="panel space-y-6">

            <Header />
            <UserManagementTable
                data={parameter.data}
                loading={false}
                page={parameter.page}
                limit={parameter.limit}
                total_record={parameter.total_record}
                onPageChange={(page) => {
                    setParameter({ ...parameter, page });
                }}
                onResetPWD={(value) => showModalConfirm(value)} //2 = popup confirmation of reset password
                onEdit={(value) => showModalCreate(value)}
                onChangeStatus={(value) => showModalConfirm(value)}
                onShowDetail={(value) => showDetailModal(value)}
            />

            <Modal
                // width={750}
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


export default UserManagment;


