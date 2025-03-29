import { Table, TableProps } from "antd"
import { Hotel } from "../../../../model/hotel/hotel";
import { useEffect, useRef, useState } from "react";
import { Branch } from "../../../../model/branch/branch";

export const BranchList = ({ list }: { list: Branch[] }) => {
    const [tableMaxHeight, setTableMaxHeight] = useState(0);
    const tableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {

            let remainingHeight = 400

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



    return (
        <div ref={tableRef}>
            <Table<Branch> columns={columns} dataSource={list}  tableLayout="auto"
                scroll={{
                    y: tableMaxHeight - 100 // minus footer height
                }} 
            />
        </div>
    )
}



const columns: TableProps<Branch>['columns'] = [
    {
        title: 'Tên chi nhánh',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'created_at',

    },
];

