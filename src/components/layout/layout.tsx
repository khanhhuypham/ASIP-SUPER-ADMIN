import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import store, { IRootState } from "../../store";
import {
    toggleAnimation,
    toggleLayout,
    toggleMenu,
    toggleNavbar,
    toggleRTL,
    toggleSemidark,
    toggleSidebar,
    toggleTheme,
} from "../../store/themeConfigSlice";
import { Header } from "./header";
import Sidebar from "./side-bar";

export const Layout = () => {
    const dispatch = useDispatch();
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem("theme") ?? themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem("menu") ?? themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem("layout") ?? themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem("rtlClass") ?? themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem("animation") ?? themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem("navbar") ?? themeConfig.navbar));
        dispatch(toggleSemidark(localStorage.getItem("semidark") ?? themeConfig.semidark));
    }, [
        dispatch,
        themeConfig.theme,
        themeConfig.menu,
        themeConfig.layout,
        themeConfig.rtlClass,
        themeConfig.animation,
        themeConfig.navbar,
        themeConfig.locale,
        themeConfig.semidark,
    ]);

    return (
        <div
            className={`${(store.getState().themeConfig.sidebar && "toggle-sidebar") || ""} ${themeConfig.menu} ${themeConfig.layout
                } ${themeConfig.rtlClass} main-section antialiased relative font-nunito text-sm font-normal`}
        >
            <div className="relative">
                {/* sidebar menu overlay */}
                <button
                    className={`${(!themeConfig.sidebar && "hidden") || ""} fixed inset-0 bg-[black]/60 z-50 lg:hidden`}
                    onClick={() => dispatch(toggleSidebar())}
                ></button>

                {/* BEGIN APP SETTING LAUNCHER */}
                {/* <Setting /> */}
                {/* END APP SETTING LAUNCHER */}

                <div className={`${themeConfig.navbar} main-container text-black dark:text-white-dark min-h-screen`}>
                    {/* BEGIN SIDEBAR */}
                    <Sidebar />
                    {/* END SIDEBAR */}

                    <div className="main-content flex flex-col min-h-screen">
                        {/* BEGIN TOP NAVBAR */}
                        <Header />
                        {/* END TOP NAVBAR */}

                        {/* BEGIN CONTENT AREA */}
                        <Suspense>
                            <div className={`${themeConfig.animation} p-6 animate__animated`}>
                                <Outlet />
                            </div>
                        </Suspense>

                        {/* BEGIN FOOTER */}
                        {/* <Footers /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
