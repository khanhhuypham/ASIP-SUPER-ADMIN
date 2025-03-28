import { STATUS } from "../../constants/enum";

export class Hotel {
    id: number = 0;
    avatar: string = "";
    code: string = "";
    name: string = "";
    is_active:STATUS = STATUS.ACTIVE
    active:boolean = true
    owner:string = ""
    phone:string = ""
    email:string = ""
    note:string = ""

    
    constructor(data?: Partial<Hotel>) {
        Object.assign(this, data);
    }
}


