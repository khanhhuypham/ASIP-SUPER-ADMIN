import { useState, useRef, useEffect } from "react";

interface Tab {
    id:number,
    label:string
}

export const TabBar = ({tabs,onChange}:{tabs:Tab[],onChange?:((ag0:number) => void)}) => {
    const [tab, setTab] = useState<number>(1);
    const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);


    useEffect(() => {
        const activeTab = tabRefs.current[tab - 1];
       

        if (activeTab) {
            setUnderlineStyle({
                width: activeTab.offsetWidth,
                left: activeTab.offsetLeft,
            });
        }

        onChange && onChange(tab)
    }, [tab]);

 

    return (
        <div className="relative flex border-b border-gray-200 h-[40px]">
            {tabs.map(({ id, label }, index) => (
                <button
                    key={id}
                    ref={(el) => {tabRefs.current[index] = el}}
                    className={`relative px-4 pb-1 text-sm font-medium transition-colors duration-300 ${
                        tab === id ? "text-black" : "text-gray-400"
                    }`}
                    onClick={() => setTab(id)}
                    role="tab"
                    aria-selected={tab === id}
                >
                    {label}
                </button>
            ))}

            <div
                className="absolute bottom-0 h-[2px] bg-black transition-all duration-300 ease-in-out"
                style={{
                    width: `${underlineStyle.width}px`,
                    left: `${underlineStyle.left}px`,
                }}
            />
        </div>
    );
};