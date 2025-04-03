import { Avatar, Button, Dropdown, MenuProps, Pagination, PaginationProps, Switch, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import { MenuInfo } from "rc-menu/lib/interface";
import { UserManagmentListProps } from "../user-management";
import { tab_filter_id, tab_menu_id } from "../../../constants/tag-id";
import IconThreedots from "../../../components/icons/icon-three-dots";
import IconUnlock from "../../../components/icons/icon-unclock";
import IconPencil from "../../../components/icons/icon-pencil";
import IconEye from "../../../components/icons/icon-eye";
import { User } from "../../../model/user/user";
import { on } from "events";
import IconPlayCircle from "../../../components/icons/icon-play-circle";
import IconPauseCircle from "../../../components/icons/icon-pause-circle";


export const UserManagementTable = ({
    data,
    loading,
    page,
    total_record,
    onPageChange,
    onChangeStatus,
    onEdit,
    onResetPWD,
    onShowDetail
}: UserManagmentListProps) => {
    const [tableMaxHeight, setTableMaxHeight] = useState(0);
    const tableRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleResize = () => {
            let remainingHeight = window.innerHeight - (24 + 24 + 20 + 20 + 12 + 140);
            const header = document.querySelector(".navbar") as HTMLElement;
            const tab = document.getElementById(tab_menu_id) as HTMLElement;
            const filter = document.getElementById(tab_filter_id) as HTMLElement;

            if (header) {
                remainingHeight -= header.offsetHeight;
            }
            if (tab) {
                remainingHeight -= tab.offsetHeight;
            }
            if (filter) {
                remainingHeight -= filter.offsetHeight;
            }

            console.log(remainingHeight)

            setTableMaxHeight(remainingHeight);

            if (tableRef.current) {
                const tableBody = tableRef.current.querySelector('.ant-table-body');
                if (tableBody) {
                    (tableBody as HTMLElement).style.minHeight = `${remainingHeight}px`;
                }
            }

        };
        handleResize();
        // window.addEventListener("resize", handleResize);
        // return () => window.removeEventListener("resize", handleResize);
    }, []);

    const columns: ColumnsType<User> = [
        {
            title: 'STT',
            dataIndex: '',
            key: '',
            render: (record, _, index) => index + 1,
            width: 60
        },
        {
            title: 'Mã nhân viên',
            dataIndex: 'code',
            sorter: (a: User, b: User) => {
                if (!a.code || !b.code) return 0;
                return a.code.localeCompare(b.code, "vi");
            },
            width: 150
        },
        {
            title: 'Tên nhân viên',
            dataIndex: 'name',
            render: (_, data, index) => (
                <div className="flex items-center gap-2">
                    <Avatar size={25} src={data.avatar} />
                    <p className="font-semibold">{data.name}</p>
                </div>
            ),
            sorter: (a: User, b: User) => {
                if (!a.name || !b.name) return 0;
                return a.name.localeCompare(b.name, "vi");
            },
        },

        {
            title: 'Ngày vào làm',
            dataIndex: 'created_at',
            width: 150,
            sorter: (a: User, b: User) => {
                if (!a.created_at || !b.created_at) return 0;
                const dateA = new Date(a.created_at.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
                const dateB = new Date(b.created_at.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
                return dateA.getTime() - dateB.getTime();
            },
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updated_at',
            width: 150,
            sorter: (a: User, b: User) => {
                if (!a.updated_at || !b.updated_at) return 0;
                const dateA = new Date(a.updated_at.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
                const dateB = new Date(b.updated_at.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
                return dateA.getTime() - dateB.getTime();
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'active',

            render: (_, data) => {
                if (data.active) {
                    return <Tag color="green">Đang hoạt động</Tag>;
                } else {
                    return <Tag color="red">Ngừng hoạt động</Tag>;
                }
            },

        },
        {
            dataIndex: '',
            key: '',
            render: (i, data) => {

                const items: MenuProps['items'] = [
                    {
                        label: data.active ? "Tạm ngưng" : "Bật hoạt động",
                        icon: data.active ? <IconPauseCircle className="w-5 h-5" /> : <IconPlayCircle className="w-5 h-5" />,
                        key: '0',
                    },
                    {
                        label: "Đặt lại mật khẩu",
                        icon: <IconUnlock fill={false} className="w-5 h-5" />,
                        key: '1',
                    },
                    {
                        label: "Chỉnh sửa",
                        icon: <IconPencil className="w-5 h-5" />,
                        key: '2',
                    },
                    {
                        label: "Xem chi tiết",
                        icon: <IconEye className="w-5 h-5" />,
                        key: '3',
                    },
                ];

                return <Dropdown menu={{
                    items, onClick: (e: MenuInfo) => {
                        switch (e.key) {
                            case '0':
                                // Call the onEdit function passed as a prop
                                onChangeStatus && onChangeStatus(data);
                                break;
                            case '1':
                                onResetPWD && onResetPWD(data)
                                break;
                            case '2':
                                onEdit && onEdit(data);
                                break;
                            case '3':
                                onShowDetail && onShowDetail(data); // Call the onShowDetail function passed as a prop
                                break;
                            default:
                                break;
                        }
                    }
                }} trigger={['click']}  >
                    <Button icon={<IconThreedots />} onClick={(e) => { e.preventDefault() }} />
                </Dropdown>
            }
        },
    ];

    const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items`;
    return (
        <div ref={tableRef}>
            <Table<User>
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={false}
                loading={loading}
                footer={() => <Pagination align="end" current={page} pageSize={10} onChange={onPageChange} total={total_record} showTotal={showTotal} />}
                tableLayout="auto"
                scroll={{
                    x: 1500,
                    y: tableMaxHeight - 100 // minus footer height
                }}
                rowSelection={{
                    type: "checkbox",
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(selectedRowKeys, selectedRows);
                    },
                }}
            />

        </div>
    );
};
