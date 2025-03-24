import { MEDIA_TYPE } from "../../constants/enum";


export class Media {
    id: number = 0
    url: string = "";
    type: MEDIA_TYPE = MEDIA_TYPE.IMAGE;
    
    constructor(data?: Partial<Media>) {
        Object.assign(this, data);
    }
}
