import { useEffect, useState } from "react"
import { PopupInterface } from "../../constants/interface"
import { User, UserStatistics } from "../../model/user/user"
import { userService } from "../../service/user-service/user-service"
import { Tab, TabBar } from "../../components/custom/tab-bar"
import { STATUS } from "../../constants/enum"
import { Button, Input, message, Modal, Select } from "antd"
import { DialogContent } from "../../components/custom/dialog-content"
import { UserManagementHeader as Header } from "./component/user-management-header"
import { UserManagementTable } from "./component/user-management-table"
import { UserDetail } from "./component/user-detail"
import IconUnlock from "../../components/icons/icon-unclock"
import IconPause from "../../components/icons/icon-pause"
import { CreateUserForm } from "./component/create-user-form"



export interface UserManagmentListProps {
    data: User[]
    loading?: boolean
    search_key?: string
    hotel_id?: number
    branch_id?: number
    currentTab?: STATUS
    page?: number
    limit?: number
    total_record?: number
    onPageChange?: ((limit: number,page: number) => void)
    onEdit?: ((arg0: User) => void)
    onResetPWD?: ((arg0: User) => void)
    onChangeStatus?: ((arg0: User) => void)
    onShowDetail?: ((arg0: User) => void)
}



const UserManagment = () => {

    const [dialog, setDialog] = useState<PopupInterface>({ open: false, content: undefined, title: "" });
 
    const [parameter, setParameter] = useState<UserManagmentListProps>({
        data: [],
        loading: false,
        branch_id: -1,
        currentTab: STATUS.ALL,
        page: 1,
        limit: 10,
        total_record: 0,
        search_key: "",
    })
    const [statistic, setStatistic] = useState<UserStatistics>(new UserStatistics())



    const getList = (param: UserManagmentListProps) => {

        userService.list(param).then((res) => {
            if (res.status == 200) {
                setParameter({
                    ...param,
                    data: res.data?.list ?? [],
                    total_record: res.data?.total_record ?? 0
                })

                if (res.data) {
                    setStatistic(res.data.statistic)
                }
            } else {
                message.error(res.message)
            }
        })
    }


    const changeStatus = (user: User) => {

        userService.changeStatus(user.id).then((res) => {
            if (res.status == 200) {
                getList(parameter)
            } else {
                message.error(res.message)
            }
        })
    }



    const showModalCreate = (data: User) => {
        let component = <CreateUserForm data={data} 
            onComplete={() => {
                setDialog({ ...dialog, open: false })
                getList(parameter)
            }}
            onCancel={() => setDialog({ ...dialog, open: false })}
        />;

        setDialog({ ...dialog, open: true, content: component, title: data.id == 0 ? "Tạo nhân viên" : "Chỉnh sửa nhân viên" })
    }


    const showDetailModal = (data: User) => {
        let component = <UserDetail input={data} />
        setDialog({ ...dialog, open: true, content: component, title: "Chi tiết nhân viên" })
    }


    const showModalConfirm = (type: number, data: User) => {

        let content = <></>

        switch (type) {

            case 1:// 1 = popup confirmation of active and inactive hotel

                if (data.active) {


                    content = <DialogContent
                        icon={<p className="p-3 bg-red-100 w-fit rounded-full text-center"><IconPause /></p>}
                        title="Khoá nhân viên?"
                        content={<p>Bạn có chắc chắn muốn tạm khoá nhân viên <b>{data.name}</b> này không?</p>}
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
                        title="Mở khoá nhân viên"
                        content={<p>Bạn có chắc chắn muốn mở khoá cho nhân viên <b>{data.name}</b> này không?</p>}
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
                    content={<p>Bạn có chắc chắn muốn đặt lại mật khẩu cho nhân viên này <b>{data.name}</b> này không?</p>}
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
                break
        }

        setDialog({ ...dialog, open: true, content: content, title: "" })
    }

    return (
        <div className="panel space-y-6">

     
            <Header data={parameter} statistic={statistic} onCreate={() => showModalCreate(new User())} onSetData={(data) =>  getList(data)} />
            
            <UserManagementTable
                data={parameter.data}
                loading={false}
                page={parameter.page}
                limit={parameter.limit}
                total_record={parameter.total_record}
                onPageChange={(limit:number,page:number) => {
                    getList({ ...parameter, limit: limit,page:page });
                }}
                onResetPWD={(value) => showModalConfirm(2,value)} //2 = popup confirmation of reset password
                onEdit={(value) => showModalCreate(value)}
                onChangeStatus={(value) => showModalConfirm(1,value)}
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


export default UserManagment;


