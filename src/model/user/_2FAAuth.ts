export class _2FA_Auth {

    username:string = ""
    secret: string = "";
    QR_Code: string = "";

    
    constructor(data?: Partial<_2FA_Auth>) {
        Object.assign(this, data);
    }
}


