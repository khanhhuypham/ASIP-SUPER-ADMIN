import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IRootState } from "../../store";
import AnimateHeight from "react-animate-height";
import { NavLink, useNavigate } from "react-router-dom";
import logoCompany from "../../assets/images/logo-company.png"
import PerfectScrollbar from "react-perfect-scrollbar";
import { toggleSidebar } from "../../store/themeConfigSlice";
import IconAccountSetting from "../icons/icon-account-setting";
import IconBuildingLocation from "../icons/icon-building-location";
import { ROUTE_LINK } from "../../router/module-router";
import { STRING_MENU } from "../../constants/menu-string";
import IconCaretRight from "../icons/icon-caret-right";
import IconLayoutSideBar from "../icons/icon-layout-sidebar";
import { IconProps } from "../../constants/interface";
import { COOKIE_KEYS } from "../../constants/cookie-key";
import Cookies from "js-cookie";
import IconAccount from "../icons/icon-account";



interface SideBarSection {
    label: string;
    key: React.Key;
    items: SideBarItem[];
}

interface SideBarItem {
    label: string;
    key: React.Key;
    navLink?: string;
    icon?: React.ReactElement;
    children?: SideBarItem[];
    select?: boolean;
}

const menu: SideBarSection[] = [
    {
        label: STRING_MENU.DASHBOARD,
        key: STRING_MENU.DASHBOARD,
        items: [
            {
                label: STRING_MENU.HOTEL_MANAGEMENT,
                key: STRING_MENU.HOTEL_MANAGEMENT,
                navLink: ROUTE_LINK.HOTEL_MANAGEMENT,
                icon: <IconBuildingLocation />,
                select: true,
            },

            {
                label: STRING_MENU.BRANCH_MANAGEMENT,
                key: STRING_MENU.BRANCH_MANAGEMENT,
                navLink: ROUTE_LINK.BRANCH_MANAGEMENT,
                icon: <IconAccountSetting />,
            },

            {
                label: STRING_MENU.USER_MANAGEMENT,
                key: STRING_MENU.USER_MANAGEMENT,
                navLink: ROUTE_LINK.USER_MANAGEMENT,
                icon: <IconAccount />,
            },
        ],
    },
];

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const semidry = useSelector(
        (state: IRootState) => state.themeConfig.semidark
    );
    const [section, setSection] = useState<SideBarSection[]>(menu);
    
    const toggleMenu = (item: SideBarItem) => {
       
        const newSections = updateSection(section, item.key.toString());
        setSection(newSections);
        // // Save the selected tab to cookies
        Cookies.set(COOKIE_KEYS.TAB_DEFAULT,JSON.stringify(item),{ expires: 24 * 60 * 60 });
    };


    useEffect(() => {
        // Get the selected tab from cookies 
        const storedTab = Cookies.get(COOKIE_KEYS.TAB_DEFAULT);
        if (storedTab) {
            const tab = JSON.parse(storedTab) as SideBarItem;
            console.log("tab: ",tab)
            toggleMenu(tab);
        }
    },[])

    const updateSection = (
        sections: SideBarSection[],
        keyToToggle: string
    ): SideBarSection[] => {
        
        const updateItem = (items: SideBarItem[], key: string): SideBarItem[] => {

            return items.map((item) => {
                if (item.key === keyToToggle) {
                    return { ...item, select: true };
                } else if (item.children) {
                    return { ...item, children: updateItem(item.children, keyToToggle) };
                } else {
                    return { ...item, select: false };
                }
            });
        };

        return sections.map((section) => {
            const items: SideBarItem[] = section.items.map((item) => {
                if (item.key === keyToToggle) {
                    return { ...item, select: true };
                } else if (item.children) {
                    return { ...item, children: updateItem(item.children, keyToToggle) };
                } else {
                    return { ...item, select: false };
                }
            });

            return { ...section, items: items };
        });
    };

    const renderItem = (item: SideBarItem) => {
        const activeColor = "#0866FF";
        const inActiveColor = "#374151";
        const icon = React.cloneElement(
            item.icon as React.ReactElement<IconProps>,
            {
                fillColor: item.select ? activeColor : inActiveColor,
                strokeColor: item.select ? activeColor : inActiveColor,
            }
        );

        if (item.children && item.children.length > 0) {
            return (
                <>
                    <button
                        type="button"
                        className={`w-full ${item.select ? "active" : ""}`}
                        onClick={() => toggleMenu(item)}
                    >
                        <div className="flex justify-between items-center py-3 px-6">
                            <div className="flex items-center gap-3">
                                {icon}
                                <span
                                    className={`text-[${inActiveColor}] dark:text-[#C5C6C9] dark:group-hover:text-white-dark`}
                                >
                                    {item.label}
                                </span>
                            </div>

                            <div className={!item.select ? "rtl:rotate-90 -rotate-90" : ""}>
                                <IconCaretRight
                                    className={
                                        item.select
                                            ? "fill-orange-500 dark:group-hover:fill-white-dark"
                                            : "fill-gray-500 group-hover:fill-orange-500 "
                                    }
                                />
                            </div>
                        </div>
                    </button>

                    <AnimateHeight duration={300} height={item.select ? "auto" : 0}>
                        <ul className="relative font-semibold space-y-0.5 py-3 px-6">
                            {item.children.map((child) => {
                                return <li>{renderItem(child)}</li>;
                            })}
                        </ul>
                    </AnimateHeight>
                </>
            );
        } else {
            return (
                <button
                    onClick={() => {
                        navigate(item.navLink ?? "");
                        toggleMenu(item);
                    }}
                    className={`relative w-full rounded ${item.select ? "active" : ""}`}
                >
                    {item.select && (
                        <div className="absolute w-[4px] h-full left-0 top-0 bg-blue-600 rounded-r-xl"></div>
                    )}
                    <div
                        className={`flex items-center gap-3 py-3 pl-6 ${item.select ? "bg-blue-100" : ""
                            }`}
                    >
                        {icon}

                        <span style={{ color: item.select ? activeColor : inActiveColor }}>
                            {item.label}
                        </span>
                    </div>
                </button>
            );
        }
    };

    return (
        <div className={semidry ? "dark" : ""}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidry ? "text-white-dark" : ""
                    }`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between gap-4 px-4 py-3">
       
                        <NavLink to="/" className="flex items-center main-logo ">
                            <img className="ml-[5px]" src={logoCompany} alt="logo" />
                        </NavLink>

                        <button
                            type="button"
                            className="flex items-center w-8 h-8 transition duration-300 rounded-full collapse-icon hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconLayoutSideBar className="m-auto" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        {section.map((s,index) => {
                            return (
                                <div className="space-y-4" key={index}>
                                    <hr />
                                    <div>
                                        <p className="text-gray-400 font-semibold pl-4">
                                            {s.label}
                                        </p>
                                        <ul className="relative font-semibold space-y-0.5">
                                            {s.items.map((item) => (
                                                <li className="">{renderItem(item)}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;




