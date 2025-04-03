import { useEffect, useState } from "react";
import { tab_filter_id } from "../../../constants/tag-id";
import useDebounce from "../../../hooks/useDebounce";
import { STATUS } from "../../../constants/enum";
import { hotelService } from "../../../service/hotel-service/hotel-service";
import { branchService } from "../../../service/branch-service/branch-service";
import { toast } from "react-toastify";
import { HotelManagmentListProps } from "../../hotel-management/hotel-management";
import { Branch } from "../../../model/branch/branch";
import { UserManagmentListProps } from "../user-management";
import { Button, Input, Select } from "antd";
import { Tab, TabBar } from "../../../components/custom/tab-bar";
import { ExternalLabelDebounceSelect } from "../../../components/custom/field/external-label-debounce-select";
import { UserStatistics } from "../../../model/user/user";

export const UserManagementHeader = (
    { data, statistic, onCreate, onSetData }:
        {
            data: UserManagmentListProps,
            statistic: UserStatistics
            onCreate?: () => void,
            onSetData?: (data: UserManagmentListProps) => void
        }
) => {

    const [branchList, setBranchList] = useState<Branch[]>([])

     const [hotelParam, setHotelParam] = useState<HotelManagmentListProps>({
        data: [],
        page: 1,
        limit: 10,
        key_search: "",
    })

    const [searchInput, setSearchInput] = useState("");

    const [tabs, setTabs] = useState<Tab[]>([
        { id: STATUS.ALL, label: "Tất cả", count: 0 },
        { id: STATUS.ACTIVE, label: "Đang hoạt động", count: 0 },
        { id: STATUS.INACTIVE, label: "Ngừng hoạt động", count: 0 },
    ])


    const getHotelList = (p:HotelManagmentListProps) => {

        hotelService.list(p).then((res) => {
            if (res.status == 200) {
                setHotelParam({ ...p, data: res.data.list })
            } else {
                toast.error(res.message)
            }
        })
    }

    const getBranchList = (hotelId: number) => {

        branchService.getList(hotelId).then((res) => {
            if (res.status == 200) {
                setBranchList(res.data ?? [])
            } else {
                toast.error(res.message)
            }
        })

    }

    useEffect(() => {
        getHotelList(hotelParam)
    }, [])

    useEffect(() => {
        setTabs([
            { id: STATUS.ALL, label: "Tất cả", count:statistic.total },
            { id: STATUS.ACTIVE, label: "Đang hoạt động", count: statistic.total_active },
            { id: STATUS.INACTIVE, label: "Ngừng hoạt động", count: statistic.total_inactive },
        ])
    }, [statistic])

    useEffect(() => {
        onSetData && onSetData({ ...data, search_key: searchInput })
    }, [useDebounce(searchInput, 300)]);


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
                            setSearchInput(e.target.value)
                        }}
                    />

                    <ExternalLabelDebounceSelect
                        showSearch={true}
                        options={[{ value: "-1", label: "Tất cả" }, ...(hotelParam.data ?? []).map((b) => ({ value: b.id.toString(), label: b.name }))]}
                        placeholder="Select users"
                        value={data.hotel_id !== undefined ? [data.hotel_id] : undefined}
                        onSearch={(value) => setHotelParam({ ...hotelParam, key_search: value, page: 1 })}
                        onScrollDown={(value: boolean) => console.log(value)}
                        onChange={(newValue) => {

                            if (!Array.isArray(newValue)) {
                                onSetData && onSetData({ ...data, hotel_id: Number(newValue.value) });
                                getBranchList(Number(newValue.value))
                            }

                        }}
                        className="w-[150px]"
                    />


                    <Select
                        value={data.branch_id}
                        className="w-[150px]"
                        showSearch
                        placeholder="Tên chi nhánh"
                        optionFilterProp="children"
                        options={[{ value: -1, label: "Tất cả" }, ...branchList.map((b) => ({ value: b.id, label: b.name }))]}
                        onChange={(value) => onSetData && onSetData({ ...data, branch_id: value })}
                        dropdownStyle={{ maxHeight: 400 }}
                        notFoundContent="Không tìm thấy khách sạn"
                    />

                </div>

                <div className="flex justify-end gap-3">
                    <Button type="primary" onClick={onCreate}>+ Thêm nhân viên</Button>
                </div>

            </div>

            <TabBar currentTab={data.currentTab ?? STATUS.ALL} tabs={tabs} onChange={(value) => onSetData && onSetData({ ...data, currentTab: value, page: 1 })} />
        </div>
    )
}