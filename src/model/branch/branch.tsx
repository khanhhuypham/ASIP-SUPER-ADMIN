import { Hotel } from "../hotel/hotel";
import { User } from "../user/user";

export class Branch {
    id: number = 0;
    avatar: string = "";
    name: string = "";
    phone: string = ""
    email: string = ""
    address: string = ""
    active: boolean = true
    description: string = ""
    profile_image: string = "";
    created_at: string = "";
    updated_at: string = "";
    hotel:Hotel = new Hotel()
    users:User[] = []



    constructor(data?: Partial<Branch>) {
        Object.assign(this, data);
    }

    // Helper method để chuyển is_active number sang boolean
    get isActive(): boolean {
        return this.active === true;
    }

    // Helper method để format created_at date
    get formattedCreatedAt(): string {
        return this.created_at || "";
    }

    // Helper method để format updated_at date
    get formattedUpdatedAt(): string {
        return this.updated_at || "";
    }

}


