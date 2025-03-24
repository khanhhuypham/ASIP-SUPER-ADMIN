export class User {
    id: number = 0;
    access_token: string = "";
    avatar: string = "";
    name: string = "";
    
    constructor(data?: Partial<User>) {
        Object.assign(this, data);
    }
}


