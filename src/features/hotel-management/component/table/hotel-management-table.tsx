import { Avatar, Button, Dropdown, MenuProps, Pagination, PaginationProps, Switch, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import { UserOutlined } from '@ant-design/icons';

import { tab_filter_id, tab_menu_id } from "../../../../constants/tag-id";

import { MenuInfo } from "rc-menu/lib/interface";
import { convertToMoneyFormat } from "../../../../utils/string-utils";
import { HotelManagmentListProps } from "../../hotel-management";
import { Hotel } from "../../../../model/hotel/hotel";
import IconThreedots from "../../../../components/icons/icon-three-dots";
import IconPencil from "../../../../components/icons/icon-pencil";
import IconEye from "../../../../components/icons/icon-eye";
import IconUnlock from "../../../../components/icons/icon-unclock";
import IconPauseCircle from "../../../../components/icons/icon-pause-circle";
import IconPlayCircle from "../../../../components/icons/icon-play-circle";


export const HotelManagementTable = ({
    data,
    // page,
    // limit,
    // total_record,
    loading,
    // onPageChange,
    onEdit,
    onResetPWD,
    onChangeStatus,
    onShowDetail
}: HotelManagmentListProps) => {
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

    const columns: ColumnsType<Hotel> = [
        {
            title: 'STT',
            dataIndex: '',
            key: '',
            render: (record, _, index) => index + 1,
            width: 60
        },
        {
            title: 'Mã khách sạn',
            dataIndex: 'code',
        },
        {
            title: 'Tên khách sạn',
            dataIndex: 'name',
        },
        {
            title: 'SL chi nhánh',
            dataIndex: '',
            // render: (_, data, index) => <span>{data.room.length}</span>,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updated_at',
        },
        {
            title: 'Trạng thái',
            dataIndex: '',
            key: '',
            render: (_, data) => {
                if (data.active) {
                    return <Tag color="green">Đang kinh doanh</Tag>;
                } else {
                    return <Tag color="gray">Ngừng kinh doanh</Tag>;
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
                        icon: data.active ? <IconPauseCircle  className="w-5 h-5"/> : <IconPlayCircle  className="w-5 h-5"/>,
                        key: '0',
                    },
                    {
                        label: "Đặt lại mật khẩu",
                        icon: <IconUnlock fill={false} className="w-5 h-5"/>,
                        key: '1',
                    },
                    {
                        label: "Chỉnh sửa",
                        icon: <IconPencil  className="w-5 h-5"/>,
                        key: '2',
                    },
                    {
                        label: "Xem chi tiết",
                        icon: <IconEye className="w-5 h-5"/>,
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


    return (
        <div ref={tableRef}>
            <Table<Hotel>
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

