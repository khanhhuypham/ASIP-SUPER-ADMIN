import { Avatar, Button, Dropdown, MenuProps, Pagination, PaginationProps, Switch, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import { UserOutlined } from '@ant-design/icons';

import { MenuInfo } from "rc-menu/lib/interface";
import { BranchManagmentListProps } from "../branch-management";
import { tab_filter_id, tab_menu_id } from "../../../constants/tag-id";
import { Branch } from "../../../model/branch/branch";
import IconThreedots from "../../../components/icons/icon-three-dots";
import IconPencil from "../../../components/icons/icon-pencil";
import IconEye from "../../../components/icons/icon-eye";
import IconPauseCircle from "../../../components/icons/icon-pause-circle";
import IconPlayCircle from "../../../components/icons/icon-play-circle";



export const BranchManagementTable = ({
    data,
    loading,
    onEdit,
    onChangeStatus,
    onShowDetail
}: BranchManagmentListProps) => {
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

    const columns: ColumnsType<Branch> = [
        {
            title: "STT",
            width: 70,
            align: "center",
            render: (_, __, index) => index + 1,
        },


        {
            title: 'Tên chi nhánh',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: Branch, b: Branch) => {
                if (!a.name || !b.name) return 0;
                return a.name.localeCompare(b.name, "vi");
            },

        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            ellipsis: true,
            width: "30%",
        },

        {
            title: 'Tên khách sạn',
            dataIndex: 'hotel',
            key: "hotel",
            render: (_, data, index) => <span>{data.hotel.name}</span>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a: Branch, b: Branch) => {
                if (!a.created_at || !b.created_at) return 0;
                const dateA = new Date(
                    a.created_at.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")
                );
                const dateB = new Date(
                    b.created_at.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")
                );
                return dateA.getTime() - dateB.getTime();
            },

        },

        {
            title: 'Trạng thái',
            dataIndex: 'active',
            key: 'active',
            // sorter: (a: Branch, b: Branch) => {
            //     if (typeof a.active !== "number" || typeof b.is_active !== "number")
            //         return 0;
            //     return b.is_active - a.is_active; // Đang hoạt động (1) sẽ lên trên
            // },

            render: (_, data) => {
                if (data.active) {
                    return <Tag color="green">Đang kinh doanh</Tag>;
                } else {
                    return <Tag color="red">Ngừng kinh doanh</Tag>;
                }
            },
        },
        {
            dataIndex: '',
            key: 'action',
            render: (i, data) => {
                const items: MenuProps['items'] = [
                    {
                        label: data.active ? "Tạm ngưng" : "Bật hoạt động",
                        icon: data.active ? <IconPauseCircle className="w-5 h-5" /> : <IconPlayCircle className="w-5 h-5" />,
                        key: '0',
                    },
                    {
                        label: "Chỉnh sửa",
                        icon: <IconPencil className="w-5 h-5" />,
                        key: '1',
                    },
                    {
                        label: "Xem chi tiết",
                        icon: <IconEye className="w-5 h-5" />,
                        key: '2',
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
                                onEdit && onEdit(data);
                                break;
                            case '2':
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


    return (
        <div ref={tableRef}>
            <Table<Branch>
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                // pagination={true}
                loading={loading}
                // footer={() => <Pagination align="end" current={page} pageSize={10} onChange={onPageChange} total={total_record} showTotal={showTotal} />}
                tableLayout="auto"
                scroll={{
                    x: 1500,
                    y: tableMaxHeight - 100 // minus footer height
                }}
            />

        </div>
    );
};

