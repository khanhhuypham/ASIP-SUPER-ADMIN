export class LoginForm {

    QR_Code_Of_2FA?: string 
    username: string = "";
    password: string = "";
    re_enter_password: string = "";
    constructor(data?: Partial<LoginForm>) {
        Object.assign(this, data);
    }
}
