import { Avatar, List } from "antd";

import {  HotelInfor } from "./hotel-info";
import { useState } from "react";

import { Hotel } from "../../../../model/hotel/hotel";
import { TabBar } from "../../../../components/custom/tab-bar";
import { BranchList } from "./branch-list";


export const HotelDetail = ({ data }: { data: Hotel }) => {

    const [tab, setTab] = useState<number>(1)
    
    const tabs = [
        { id: 1, label: "Thông tin chung" },
        { id: 2, label: "Danh sách chi nhánh (30)" },
     
    ];

    const renderBody = () => {
        switch (tab) {
            case 1:
                return <HotelInfor data={data}/>
  
            case 2:
                return <BranchList data={data}/>

        }
    }

    return (
        <div className="space-y-4">


            <TabBar tabs={tabs} onChange={(value) => {
                setTab(value)
            }} />

            <>
              
                {renderBody()}
            </>
        </div>
    )
}