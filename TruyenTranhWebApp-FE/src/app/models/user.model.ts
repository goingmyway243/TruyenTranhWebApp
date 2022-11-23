import { AppComponent } from "../app.component";
import { ComicModel } from "./comic.model";
import { ReviewModel } from "./review.model";

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

    reviews: ReviewModel[];
    comics: ComicModel[];

    constructor() {
        this.id = 0;
        this.name = "";
        this.email = "";
        this.pass = "";
        this.role = RoleType.USER;

        this.reviews = [];
        this.comics = [];
    }

    getAvatar(): string {
        return `${AppComponent.baseUrl}images/${this.id}.jpg`;
    }
}