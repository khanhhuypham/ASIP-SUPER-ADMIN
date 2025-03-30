import { Avatar, Tag } from "antd";


import iconApple from "../../../assets/images/icon-apple.png"
import { Branch } from "../../../../model/branch/branch";
import { BranchInfor } from "./branch-info";
import { AccountList } from "./acount-list";
import { useEffect, useState } from "react";
import { Tab, TabBar } from "../../../../components/custom/tab-bar";

export const BranchDetail = ({ input }: { input: Branch }) => {
    const [tab, setTab] = useState<number>(1)
    const [data, setData] = useState<Branch>(new Branch())
    // const [branchList, setBranchList] = useState<Branch[]>([])

    const [tabs, setTabs] = useState<Tab[]>([
        { id: 1, label: "Thông tin chung" },
        { id: 2, label: "Danh sách nhân viên", count: 0 }
    ])



    const renderBody = () => {
        switch (tab) {
            case 1:
                return <BranchInfor data={data} />

            case 2:
                return <AccountList />

        }
    }

    useEffect(() => {
        // getDetail(input.id)
        // getBranchList(input.id)
        setData(input)
    }, [input])

    return (
        <div className="space-y-4">


            <TabBar currentTab={tab} tabs={tabs} onChange={(value) => {
                setTab(value)
            }} />

            <>
                {renderBody()}
            </>
        </div>
    )
}