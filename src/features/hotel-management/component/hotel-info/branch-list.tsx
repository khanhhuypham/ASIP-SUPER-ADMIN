import { Table, TableProps } from "antd"
import { Hotel } from "../../../../model/hotel/hotel";

export const BranchList = ({ data }: { data: Hotel }) => {

    return  <Table<DataType> columns={columns} dataSource={dataSource} />
}

interface DataType {
    key: string;
    name: string;
    created_at: string;
    phone:string;

}

const columns: TableProps<DataType>['columns'] = [
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

const dataSource: DataType[] = [
    {
        key: '1',
        name: 'HD0000001',
        created_at: "09:00 - 01/01/2025",
        phone:"0938271555",
     
    
    },
    {
        key: '2',
        name: 'HD0000002',
        created_at: "09:00 - 01/01/2025",
        phone:"0938271555"

    },
    {
        key: '3',
        name: 'HD0000003',
        created_at: "09:00 - 01/01/2025",
        phone:"0938271555",
      
    },
];
