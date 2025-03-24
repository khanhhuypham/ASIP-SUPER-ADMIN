export class LoginForm {


    hotel_code: string = "";
    username: string = "";
    password: string = "";
    
    constructor(data?: Partial<LoginForm>) {
        Object.assign(this, data);
    }
}


