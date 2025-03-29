import { useEffect, useState } from "react"
import { PopupInterface } from "../../constants/interface"
import { Button, Input, Modal, Select, DatePicker, message } from "antd"
import { Hotel } from "../../model/hotel/hotel"
import { tab_filter_id } from "../../constants/tag-id"
import { DialogContent } from "../../components/custom/dialog-content"
import IconPause from "../../components/icons/icon-pause"

import { TabBar } from "../../components/custom/tab-bar"
import { reportFilter } from "../../constants/constant"
import { Branch } from "../../model/branch/branch"
import { BranchManagementTable } from "./component/branch-management-table"

import { BranchInfor } from "./component/branch-detail"
import { CreateBranch } from "./component/create-branch"
import { branchService } from "../../service/branch-service/branch-service"

const { RangePicker } = DatePicker;

export interface BranchManagmentListProps {
    data: Branch[]
    loading: boolean
    search_key?: string
    onEdit?: ((arg0: Branch) => void)
    onChangeStatus?: ((arg0: Branch) => void)
    onShowDetail?: ((arg0: Branch) => void)
}



const BranchManagment = () => {

    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });
    const [data, setData] = useState<Branch[]>([])
    const [fullData, setFullData] = useState<Branch[]>([])



    const getList = () => {

        branchService.getList(1).then((res) => {
            if (res.status == 200) {
                setData(res.data);
                setFullData(res.data)
            } else {
                message.error(res.message)
            }
        })
    }

    const changeStatus = (branch:Branch) => {

        branchService.changeStatus(branch.id).then((res) => {
            if (res.status == 200) {
                getList()
            } else {
                message.error(res.message)
            }
        })
    }

    useEffect(() => {
        getList()
    }, []);



    const showModalCreate = (data: Branch) => {
        let component = <CreateBranch data={data} onComplete={(_) => {
            getList()
            setDialog({ ...dialog, open: false })
        }}/>;
        setDialog({ ...dialog, open: true, content: component, title: data.id == 0 ? "Tạo khách sạn" : "Chỉnh sửa khách sạn" })
    }


    const showDetailModal = (data: Branch) => {
        let component = <BranchInfor data={data} />
        setDialog({ ...dialog, open: true, content: component, title: "Chi tiết chi nhánh" })
    }



    const showModalConfirm = (data: Branch) => {
        let content = <></>

        if (data.active) {

            content = <DialogContent
                icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconPause /></p>}
                title="Tạm ngưng chinh nhánh?"
                content={<p>Bạn có chắc chắn muốn tạm ngưng chi nhánh <b>{data.name}</b> của khách sạn <b>{data.hotel?.name ?? ""}</b> không?</p>}
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
                title="Bật hoạt động cho chi nhánh"
                content={<p>Bạn có chắc chắn muốn bật hoạt động cho chi nhánh <b>{data.name}</b> của <b>{data.hotel?.name ?? ""}</b> này không?</p>}
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


                        <Button type="primary" onClick={() => showModalCreate(new Branch())}>+ Thêm chi nhánh</Button>

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


