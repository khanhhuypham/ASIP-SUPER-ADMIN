export class Hotel {
    id: number = 0;
    avatar: string = "";
    code: string = "";
    name: string = "";
    active:boolean = true
    owner:string = ""
    phone:string = ""
    email:string = ""
    note:string = ""

    
    constructor(data?: Partial<Hotel>) {
        Object.assign(this, data);
    }
}


