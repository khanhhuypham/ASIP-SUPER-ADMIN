

import BranchManagment from "../features/branch-management/branch-management";
import HotelManagment from "../features/hotel-management/hotel-management";
import { ROUTE_LINK } from "./module-router";



export const dashboardRouter = [
    { path: ROUTE_LINK.DASHBOARD, component: <></> },
   
    { path: ROUTE_LINK.HOTEL_MANAGEMENT, component: <HotelManagment /> },
    { path: ROUTE_LINK.BRANCH_MANAGEMENT, component: <BranchManagment /> },
];
