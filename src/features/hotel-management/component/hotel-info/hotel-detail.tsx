import { Avatar, List, message } from "antd";

import {  HotelInfor } from "./hotel-info";
import { useEffect, useState } from "react";

import { Hotel } from "../../../../model/hotel/hotel";
import { Tab, TabBar } from "../../../../components/custom/tab-bar";
import { BranchList } from "./branch-list";
import { hotelService } from "../../../../service/hotel-service/hotel-service";
import { Branch } from "../../../../model/branch/branch";



export const HotelDetail = ({ input }: { input: Hotel }) => {
    const [tab, setTab] = useState<number>(1)
    const [data, setData] = useState<Hotel>(new Hotel())
    const [branchList, setBranchList] = useState<Branch[]>([])

    const [tabs, setTabs] = useState<Tab[]>([
        { id: 1, label: "Thông tin chung" },
        { id: 2, label: "Danh sách chi nhánh", count: 0 }
    ])





    const getBranchList = (id: number) => {
        // AxiosBranchManagementService.getList(id).then((res) => {

        //     if (res.status == 200) {
        //         setBranchList(res.data)
        //         setTabs((tabs) => tabs.map((tab) => tab.id == 2 ? { ...tab, count: res.data.length } : tab))
        //     } else {
        //         message.error(res.message)
        //     }

        // })
    }

    useEffect(() => {
        // getDetail(input.id)
        // getBranchList(input.id)
        setData(input)
    }, [input])

    const renderBody = () => {
        switch (tab) {
            case 1:
                return <HotelInfor data={data} />

            case 2:
                return <BranchList list={branchList} />

        }
    }

    return (
        <div className="space-y-4">


            <TabBar currentTab={tab} tabs={tabs} onChange={(value) => {
                setTab(value)
            }}/>

            <>
                {renderBody()}
            </>
        </div>
    )
}
