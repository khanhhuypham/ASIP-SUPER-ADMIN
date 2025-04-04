import { Button, Input } from "antd"
import { ExternalLabelDebounceSelect } from "../../../components/custom/field/external-label-debounce-select"
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

export const Header = (
    { data, fullData,onCreate, onSetData }:
    {
        data: BranchListProps,
        fullData:Branch[]
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


    const getHotelList = (p: HotelManagmentListProps) => {

        hotelService.list(p).then((res) => {
            if (res.status == 200) {
                setHotelParam({ ...p, data: res.data.list })
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
            { id: STATUS.ALL, label: "Tất cả", count: fullData?.length },
            { id: STATUS.ACTIVE, label: "Đang hoạt động", count:fullData.filter((data) => data.active).length },
            { id: STATUS.INACTIVE, label: "Ngừng hoạt động", count: fullData.filter((data) => !data.active).length },
        ])
    }, [data])

    useEffect(() => {
        onSetData && onSetData({ ...data, search_key: searchInput})
    }, [useDebounce(searchInput, 300)]);


    return (
        <div id={tab_filter_id} className="space-y-4">

            <div className="flex justify-between">

                <div className="space-x-2">
                    <Input
                        placeholder="Tìm kiếm hạng phòng"
                        className="w-64"
                        prefix={<i className="fa-solid fa-magnifying-glass" />}
                        allowClear
                     
                        onChange={(e) => setSearchInput(e.target.value)}
                    />

                    <ExternalLabelDebounceSelect
                        showSearch={true}
                        options={[{ value: "-1", label: "Tất cả" }, ...(hotelParam.data ?? []).map((b) => ({ value: b.id.toString(), label: b.name }))]}
                        placeholder="Select users"
                        value={data.hotel_id !== undefined ? [data.hotel_id] : undefined}
                        onSearch={(value) => setHotelParam({ ...hotelParam, search_key: value, page: 1 })}
                        onScrollDown={(value: boolean) => console.log(value)}
                        onChange={(newValue) => {
                            if (!Array.isArray(newValue)) {
                                onSetData && onSetData({ ...data, hotel_id: Number(newValue.value) })
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