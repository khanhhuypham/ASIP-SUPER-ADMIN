import React from 'react';

import { ROUTE_LINK } from './router/module-router';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './router/protected-router';
import { dashboardRouter } from './router/app-router';
import NotFoundPage from './features/not-found/not-found-page';
import { LoginPage } from './features/login/login-page';
import { Layout } from './components/layout/layout';
import store from './store';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { TOAST_CONFIG } from "./config/toast-config";


function App() {
    const token = store.getState().userData.user.access_token;
    

    return (
        <>
           <ToastContainer {...TOAST_CONFIG} />
            <BrowserRouter>
                <Routes>
                    <Route
                        index
                        path={ROUTE_LINK.LOGIN}
                        element={token !== "" ? <Navigate replace to={ROUTE_LINK.HOTEL_MANAGEMENT} /> : <LoginPage />}
                    />

                    <Route element={<Layout />}>
                        <Route element={<ProtectedRoutes />}>
                            {dashboardRouter.map((route, index) => (
                                <Route key={index} path={route.path} element={route.component} />
                            ))}
                        </Route>
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </>

    );
}

export default App;
