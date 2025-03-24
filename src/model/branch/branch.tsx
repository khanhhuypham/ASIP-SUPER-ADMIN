export class Branch {
    id: number = 0;
    avatar: string = "";
    name: string = "";
    phone:string = ""
    email:string = ""
    address:string = ""
    active:boolean = true
    description:string = ""

    
    constructor(data?: Partial<Branch>) {
        Object.assign(this, data);
    }
}


