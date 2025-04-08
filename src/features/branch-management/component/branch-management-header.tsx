import { Button, Input } from "antd"

import { tab_filter_id } from "../../../constants/tag-id"
import { Tab, TabBar } from "../../../components/custom/tab-bar"
import { STATUS } from "../../../constants/enum"
import { BranchListProps } from "../branch-management"
import { Branch } from "../../../model/branch/branch"
import { HotelManagmentListProps } from "../../hotel-management/hotel-management"
import { useEffect, useState } from "react"
import { hotelService } from "../../../service/hotel-service/hotel-service"
import useDebounce from "../../../hooks/useDebounce"
import { toast } from "react-toastify"
import { APIParameterOfSelect } from "../../../components/custom/field/external-label-select-with-api"
import SelectWithAPi from "../../../components/custom/select-with-api"
import { SelectOption } from "../../../constants/interface"


let timeout: ReturnType<typeof setTimeout> | null;

export const Header = (
    { data, fullData, onCreate, onSetData }:
        {
            data: BranchListProps,
            fullData: Branch[]
            onCreate?: () => void,
            onSetData?: (data: BranchListProps) => void
        }
) => {

    const [hotelParam, setHotelParam] = useState<HotelManagmentListProps>({
        data: [],
        page: 1,
        limit: 10,
        search_key: "",
    })
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

                    const newData = res.data.list.map((hotel) => ({ value: hotel.id, label: hotel.name }));

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




    useEffect(() => {
        setTabs([
            { id: STATUS.ALL, label: "Tất cả", count: fullData?.length },
            { id: STATUS.ACTIVE, label: "Đang hoạt động", count: fullData.filter((data) => data.active).length },
            { id: STATUS.INACTIVE, label: "Ngừng hoạt động", count: fullData.filter((data) => !data.active).length },
        ])
    }, [data])

    useEffect(() => {
        onSetData && onSetData({ ...data, search_key: searchInput })
    }, [useDebounce(searchInput, 300)]);


    return (
        <div id={tab_filter_id} className="space-y-4">

            <div className="flex justify-between">

                <div className="space-x-2">
                    <Input
                        placeholder="Tìm kiếm chi nhánh"
                        className="w-64"
                        prefix={<i className="fa-solid fa-magnifying-glass" />}
                        allowClear

                        onChange={(e) => setSearchInput(e.target.value)}
                    />

                    <SelectWithAPi
                        fetchData={getHotelList}
                        showSearch={true}
                        value={data.hotel_id}
                        defaultValue={{ value: -1, label: "tất cả" }}
                        placeholder="Vui lòng chọn khách sạn"
                        onChange={(newValue: SelectOption[] | SelectOption) => {

                            if (!Array.isArray(newValue)) {
                                onSetData && onSetData({ ...data, hotel_id:Number(newValue.value) })
                            }

                        }}
                        className="w-[200px]"
                    />

          
                </div>

                <div className="flex justify-end ">
                    <Button type="primary" onClick={onCreate}>+ Thêm chi nhánh</Button>
                </div>

            </div>

            <TabBar currentTab={data.active ?? STATUS.ALL} tabs={tabs} onChange={(value) => {
                onSetData && onSetData({ ...data, active: value })
            }} />
        </div>
    )
}