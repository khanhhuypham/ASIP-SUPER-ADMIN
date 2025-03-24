import { Navigate, Outlet } from 'react-router-dom';

import { ROUTE_LINK } from './module-router';
import store from '../store';

export const ProtectedRoutes = () => {
    const token = store.getState().userData.user.access_token;

    if (token === "") {
        return <Navigate to={ROUTE_LINK.LOGIN} replace />;
    }

    return <Outlet />;
};
