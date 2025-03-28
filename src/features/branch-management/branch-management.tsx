import { useEffect, useState } from "react"
import { PopupInterface } from "../../constants/interface"
import { Button, Input, Modal, Select, DatePicker } from "antd"
import { Hotel } from "../../model/hotel/hotel"
import { tab_filter_id } from "../../constants/tag-id"
import { DialogContent } from "../../components/custom/dialog-content"
import IconPause from "../../components/icons/icon-pause"

import { TabBar } from "../../components/custom/tab-bar"
import { reportFilter } from "../../constants/constant"
import { Branch } from "../../model/branch/branch"
import { BranchManagementTable } from "./component/branch-management-table"
import { CreateBranch } from "../hotel-management/component/create/create-branch"
import { BranchInfor } from "./component/branch-detail"

const { RangePicker } = DatePicker;

export interface BranchManagmentListProps {
    data: Branch[]
    loading: boolean,
    search_key?: string
    onPageChange?: ((page: number) => void)
    onEdit?: ((arg0: Branch) => void)
    onResetPWD?: ((arg0: Branch) => void)
    onChangeStatus?: ((arg0: Branch) => void)
    onShowDetail?: ((arg0: Branch) => void)
}



const BranchManagment = () => {

    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });
    const [data, setData] = useState<Branch[]>([
        new Branch({ id: 1 }),
        new Branch({ id: 2 }),
        new Branch({ id: 3 }),
        new Branch({ id: 4 }),
    ])
    const [fullData, setFullData] = useState<Branch[]>([])


    const tabs = [
        { id: 1, label: "tất cả" },
        { id: 2, label: "Đang hoạt động (30)" },
        { id: 3, label: "Ngừng hoạt động (30)" },

    ];

    const getRoomtType = () => {

    }

    useEffect(() => {
        getRoomtType()
    }, []);



    const showModalCreate = (data: Branch) => {
        let component = <CreateBranch data={new Branch()} />;

        setDialog({ ...dialog, open: true, content: component, title: data.id == 0 ? "Tạo khách sạn" : "Chỉnh sửa khách sạn" })
    }




    const showDetailModal = (data: Branch) => {
        let component = <BranchInfor data={data} />
        setDialog({ ...dialog, open: true, content: component, title: "Chi tiết chi nhánh" })
    }


    const showResetPWDModal = (data: Branch) => {

    }


    const showModalConfirm = (data: Branch) => {
        let content = <DialogContent
            icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconPause /></p>}
            title="Tạm ngưng khách sạn?"
            content={<p>Bạn có chắc chắn muốn tạm ngưng khách sạn <b>{data.name}</b> này không?</p>}
            btnConfirm={<Button color="danger" variant="solid">Xác nhận</Button>}
        />
        setDialog({ ...dialog, open: true, content: content, title: "" })
    }


    const onSearch = (key: string) => {


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
                        <RangePicker />

                        <Button type="primary" onClick={() => showModalCreate(new Branch())}>+ Tạo khách sạn</Button>

                    </div>

                </div>

                {/* <TabBar tabs={tabs} onChange={(value) => {

                }} /> */}
            </div>
        )
    };


    return (
        <div className="panel space-y-6">

            <Header />
            <BranchManagementTable
                data={data}
                loading={false}
                onEdit={(value) => showModalCreate(value)}
                onResetPWD={(value) => showResetPWDModal(value)}
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


export default BranchManagment;


