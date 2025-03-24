export class _2FA_Auth {


    QR_Code: string = "";
    secret: string = "";
    
    
    constructor(data?: Partial<_2FA_Auth>) {
        Object.assign(this, data);
    }
}


