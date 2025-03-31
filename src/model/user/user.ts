export class User {
    id: number = 0;
    code: string = "";
    access_token: string = "";
    avatar: string = "";
    name: string = "";
    phone: string = "";
    email: string = "";
    active: boolean = true;
    created_at: string = "";
    updated_at: string = "";
    
    constructor(data?: Partial<User>) {
        Object.assign(this, data);
    }
}


export class UserStatistics {
    total: number = 0;
    total_active: number = 0;
    total_inactive: number = 0;

    constructor(data?: Partial<UserStatistics>) {
        Object.assign(this, data);
    }
}