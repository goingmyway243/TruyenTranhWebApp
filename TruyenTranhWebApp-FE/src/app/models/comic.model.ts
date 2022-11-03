import { GenreModel } from "./genre.model";

export enum StatusType {
    PENDING,
    PUBLISH,
    UNPUBLISH,
    REJECTED
}

export interface IComicModel {
    id: number;
    title: string;
    description: string;
    view: number;
    status: StatusType;
    userId: number;
    authorId: number;
    createdTime: Date;
}

export class ComicModel implements IComicModel {
    id: number;
    title: string;
    description: string;
    view: number;
    status: StatusType;
    userId: number;
    authorId: number;
    createdTime: Date;

    genres: GenreModel[];

    constructor() {
        this.id = 0;
        this.title = "";
        this.description = "";
        this.view = 0;
        this.status = StatusType.PENDING;
        this.userId = 0;
        this.authorId = 0;
        this.createdTime = new Date();

        this.genres = [];
    }
}