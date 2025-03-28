import { useState, useRef, useEffect } from "react";

export interface Tab {
    id: number;
    label: string;
    count?: number
}

export const TabBar = ({
    currentTab,
    tabs,
    onChange = () => { }, // Default to a no-op function
}: {
    currentTab: number;
    tabs: Tab[];
    onChange?: (id: number) => void;
}) => {

    

    useEffect(() => {
  

    }, [currentTab]); // Add `tabs` to the dependency array

    return (
        <div className="tabs">
            <ul className="tab-list">
                {tabs.map((tab) => (
                    <li
                        key={tab.id}
                        className={`tab-item ${tab.id === currentTab ? "active" : ""}`}
                        onClick={() => onChange(tab.id)}
                    >
                        {tab.label} {tab.count && `(${tab.count})`}
                    </li>
                ))}
            </ul>
        </div>

    );
};