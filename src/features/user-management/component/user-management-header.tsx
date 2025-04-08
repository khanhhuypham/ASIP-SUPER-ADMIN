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
import { UserStatistics } from "../../../model/user/user";
import { APIParameterOfSelect } from "../../../components/custom/field/external-label-select-with-api";
import { SelectOption } from "../../../constants/interface";
import SelectWithAPi from "../../../components/custom/select-with-api";

let timeout: ReturnType<typeof setTimeout> | null;
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

    const [searchInput, setSearchInput] = useState("");

    const [tabs, setTabs] = useState<Tab[]>([
        { id: STATUS.ALL, label: "Tất cả", count: 0 },
        { id: STATUS.ACTIVE, label: "Đang hoạt động", count: 0 },
        { id: STATUS.INACTIVE, label: "Ngừng hoạt động", count: 0 },
    ])


    const getHotelList = (param: APIParameterOfSelect, setParam: (data: APIParameterOfSelect) => void) => {

        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }

        const fetch = () => {

            hotelService.list({ search_key: param.search_key, page: param.page, limit: param.limit }).then((res) => {
                if (res.status == 200) {

                    const newData = res.data.list.map((hotel) => ({ value: hotel.id,label: hotel.name}));

                    const existingData = param.data || [];

                    const mergedData = [...existingData, ...newData];

                    // Add "Tất cả" only if it doesn't already exist
                    if (!mergedData.some((item) => item.value === -1)) {
                        mergedData.unshift({ value: -1, label: "Tất cả" });
                    }

                    setParam({
                        ...param,
                        data: mergedData,
                        loading: false,
                        total_record: res.data.total_record
                    })

                } else {
                    toast.error(res.message)
                }
            })
        }
        timeout = setTimeout(fetch, 300);

    };


    const getBranchList = (hotelId: number) => {

        branchService.getList(hotelId).then((res) => {
            if (res.status == 200) {
                setBranchList(res.data ?? [])
            } else {
                toast.error(res.message)
            }
        })

    }

    // useEffect(() => {
    //     getHotelList(hotelParam)
    // }, [])

    useEffect(() => {
        setTabs([
            { id: STATUS.ALL, label: "Tất cả", count: statistic.total },
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


                    <SelectWithAPi
                        fetchData={getHotelList}
                        showSearch={true}
                        value={data.hotel_id}
                        defaultValue={{value:-1,label:"tất cả"}}
                        placeholder="Vui lòng chọn khách sạn"
                        onChange={(value: SelectOption[] | SelectOption) => {

                            if (!Array.isArray(value)) {
                                console.log("value: ", value)
                                onSetData && onSetData({ ...data, hotel_id: Number(value.value), branch_id: -1 });
                                getBranchList(Number(value.value))
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