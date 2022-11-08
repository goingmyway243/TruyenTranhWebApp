import { AppComponent } from "../app.component";
import { ChapterModel } from "./chapter.model";
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
    chapters: ChapterModel[];
    coverImage?: File;

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
        this.chapters = [];
    }

    getComicCover(): string {
        return `${AppComponent.baseUrl}/images/${this.id}/cover.jpg`;
    }
}