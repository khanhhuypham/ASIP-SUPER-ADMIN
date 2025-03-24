import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { IRootState } from "../../store";
import { toggleSidebar, toggleTheme } from "../../store/themeConfigSlice";

import Dropdown from "../custom/drop-down";
import IconBellBing from "../icons/icon-bell-bing";
import IconLaptop from "../icons/icon-laptop";
import IconLogout from "../icons/icon-logout";
import IconMenu from "../icons/icon-menu";
import IconMoon from "../icons/icon-moon";
import IconSun from "../icons/icon-sun";
import IconUser from "../icons/icon-user";
import { ROUTE_LINK } from "../../router/module-router";
import { ImageCustom } from "../custom/image-custom";
import { removeUser } from "../../store/userSlice";


export const Header = () => {
    const dispatch = useDispatch();

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === "rtl";

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    const user = useSelector((state: IRootState) => state.userData.user);
    

    return (
        <header className={`z-40 navbar${themeConfig.semidark && themeConfig.menu === "horizontal" ? "dark" : ""}`}>
            <div className="shadow-sm">
                <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
                    <div className="flex items-center justify-between horizontal-logo lg:hidden ltr:mr-2 rtl:ml-2">
                        <Link to="/" className="flex items-center main-logo shrink-0">
                            {/* <ImageCustom className="inline w-8 ltr:-ml-1 rtl:-mr-1" /> */}
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5  font-semibold  align-middle hidden md:inline dark:text-white-light transition-all duration-300">
                                ASIP
                            </span>
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            onClick={() => {
                                dispatch(toggleSidebar());
                            }}
                        >
                            <IconMenu className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                        <p className="flex-1 font-extrabold text-orange-600 uppercase">{themeConfig.menuContent}</p>

                        <div>
                            {themeConfig.theme === "light" ? (
                                <button
                                    className={`${themeConfig.theme === "light" &&
                                        "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                        }`}
                                    onClick={() => {
                                        dispatch(toggleTheme("dark"));
                                    }}
                                >
                                    <IconSun />
                                </button>
                            ) : (
                                ""
                            )}
                            {themeConfig.theme === "dark" && (
                                <button
                                    className={`${themeConfig.theme === "dark" &&
                                        "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                        }`}
                                    onClick={() => {
                                        dispatch(toggleTheme("system"));
                                    }}
                                >
                                    <IconMoon />
                                </button>
                            )}
                            {themeConfig.theme === "system" && (
                                <button
                                    className={`${themeConfig.theme === "system" &&
                                        "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                        }`}
                                    onClick={() => {
                                        dispatch(toggleTheme("light"));
                                    }}
                                >
                                    <IconLaptop />
                                </button>
                            )}
                        </div>

                        <div className="dropdown shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                                btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                button={
                                    <span>
                                        <IconBellBing />
                                        <span className="absolute top-0 flex w-3 h-3 ltr:right-0 rtl:left-0">
                                            <span className="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                                        </span>
                                    </span>
                                }
                            ></Dropdown>
                        </div>
                        <div className="flex dropdown shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                                btnClassName="relative group block"
                                button={
                                    <ImageCustom imageUrl={user.avatar} className="object-cover rounded-full w-9 h-9 saturate-50 group-hover:saturate-100 border border-[#f2f2f2]" />
                                }
                            >
                                <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                                    <li>
                                        <div className="flex items-center px-4 py-4">

                                            <ImageCustom imageUrl={user.avatar} className="object-cover w-10 h-10 rounded-full border border-[#f2f2f2]" />
                                            <div className="truncate ltr:pl-4 rtl:pr-4">
                                                <h4 className="text-base">
                                                    {user.name ?? ""}
                                                </h4>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link to='' className="text-gray-600 dark:hover:text-white">
                                            <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                            Tài khoản của tôi
                                        </Link>
                                    </li>
                                    <li className="border-t border-white-light dark:border-white-light/10">
                                        <a
                                            href="/#"
                                            onClick={(e) => {
                                                e.preventDefault();

                                                dispatch(removeUser())
                                                window.location.href = ROUTE_LINK.LOGIN;
                                            }}
                                            className="text-danger !py-3"
                                        >
                                            <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                                            Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
