

import BranchManagment from "../features/branch-management/branch-management";
import HotelManagment from "../features/hotel-management/hotel-management";
import UserManagment from "../features/user-management/user-management";
import { ROUTE_LINK } from "./module-router";



export const dashboardRouter = [
   
    { path: ROUTE_LINK.HOTEL_MANAGEMENT, component: <HotelManagment /> },
    { path: ROUTE_LINK.BRANCH_MANAGEMENT, component: <BranchManagment /> },
    { path: ROUTE_LINK.USER_MANAGEMENT, component: <UserManagment/> },
];
