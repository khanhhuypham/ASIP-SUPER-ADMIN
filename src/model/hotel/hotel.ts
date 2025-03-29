import { STATUS } from "../../constants/enum";
import { Branch } from "../branch/branch";


export class Hotel {
    id: number = 0;
    avatar: string = "";
    code: string = "";
    name: string = "";
    active:boolean = true;
    is_active: STATUS = STATUS.ACTIVE;
    owner_name: string = "";
    phone: string = "";
    email: string = "";
    note: string = "";
    address: string = "";
    created_at: string = "";
    updated_at: string = "";
    branches: Branch[] = [];

    constructor(data?: Partial<Hotel>) {
        Object.assign(this, data);
    }
}


export class HotelStatistics {
    total: number = 0;
    total_active: number = 0;
    total_inactive: number = 0;

    constructor(data?: Partial<HotelStatistics>) {
        Object.assign(this, data);
    }
}
