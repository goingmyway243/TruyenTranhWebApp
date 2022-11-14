export enum RoleType {
    ADMIN,
    USER
}

export interface IUserModel {
    id: number;
    name: string;
    email: string;
    pass: string;
    role: RoleType;
}

export class UserModel implements IUserModel {
    id: number;
    name: string;
    email: string;
    pass: string;
    role: RoleType;

    constructor() {
        this.id = 0;
        this.name = "";
        this.email = "";
        this.pass = "";
        this.role = RoleType.USER;
    }
}