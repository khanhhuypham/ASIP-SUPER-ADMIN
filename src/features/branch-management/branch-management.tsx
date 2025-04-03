import { useEffect, useState } from "react"
import { PopupInterface } from "../../constants/interface"
import { Button, Modal, DatePicker, message } from "antd"
import { DialogContent } from "../../components/custom/dialog-content"
import IconPause from "../../components/icons/icon-pause"
import { Branch } from "../../model/branch/branch"
import { BranchManagementTable } from "./component/branch-management-table"


import { CreateBranch } from "./component/create-branch"
import { branchService } from "../../service/branch-service/branch-service"
import { BranchDetail } from "./component/branch-info/branch-detail"

import { STATUS } from "../../constants/enum"
import { Header } from "./component/branch-management-header"
import { toast } from "react-toastify"

const { RangePicker } = DatePicker;

export interface BranchListProps {
    data: Branch[]
    loading: boolean
    search_key?: string
    hotel_id?: number
    active?: STATUS
    onEdit?: ((arg0: Branch) => void)
    onChangeStatus?: ((arg0: Branch) => void)
    onShowDetail?: ((arg0: Branch) => void)
}

const BranchManagment = () => {

    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });

    const [parameter, setParameter] = useState<BranchListProps>({
        data: [],
        loading: false,
        hotel_id:-1,
        search_key: "",
    })

    const [fullData, setFullData] = useState<Branch[]>([])


    const getList = (p: BranchListProps) => {
        let data: Branch[] = []
        const hotel_id = p.hotel_id == -1 ? undefined : p.hotel_id

        branchService.getList(hotel_id, p.search_key).then((res) => {

            if (res.status == 200) {
                data = res.data ?? []
            } else {
                toast.error(res.message)
            }

            setParameter({...parameter, data: filterData(data), loading: false})
            setFullData(data)
        })
    }


    const changeStatus = (branch: Branch) => {

        branchService.changeStatus(branch.id).then((res) => {
            if (res.status == 200) {
                toast.success("Cập nhật trạng thái thành công")
                getList(parameter)
            } else {
                toast.error(res.message)
            }
        })
    }



    useEffect(() => {
        setParameter({ ...parameter, loading: true })
        getList(parameter)
    }, [parameter.hotel_id, parameter.search_key]);

    useEffect(() => {
        setParameter({...parameter, data: filterData(fullData)})
    }, [parameter.active]);


    const filterData = (fullData: Branch[]): Branch[] => {
  
        switch (parameter.active) {
            case STATUS.ALL:
                return fullData;
                
            case STATUS.ACTIVE:
                return fullData.filter((data) => data.active);
                
            case STATUS.INACTIVE:
                return fullData.filter((data) => !data.active);
                
            default:
                return []; // Return an empty array as a fallback
        }
    }

    const showModalCreate = (data: Branch) => {
        let component = <CreateBranch data={data} onComplete={(_) => {
            getList(parameter)
            setDialog({ ...dialog, open: false })
        }} />;
        setDialog({ ...dialog, open: true, content: component, title: data.id == 0 ? "Tạo chi nhánh" : "Chỉnh sửa chi nhánh" })
    }


    const showDetailModal = (data: Branch) => {
        let component = <BranchDetail input={data} />
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



    return (
        <div className="panel space-y-6">

            <Header data={parameter} fullData={fullData} onCreate={() => showModalCreate(new Branch())} onSetData={(data) => setParameter(data)} />

            <BranchManagementTable
                data={parameter.data}
                loading={parameter.loading}
                onEdit={(value) => showModalCreate(value)}
                onChangeStatus={(value) => showModalConfirm(value)}
                onShowDetail={(value) => showDetailModal(value)}
            />

            <Modal
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


