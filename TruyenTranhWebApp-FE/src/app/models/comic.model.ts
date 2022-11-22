import { AppComponent } from "../app.component";
import { AuthorModel } from "./author.model";
import { ChapterModel } from "./chapter.model";
import { CommentModel } from "./comment.model";
import { GenreModel } from "./genre.model";
import { ReviewModel } from "./review.model";
import { UserModel } from "./user.model";

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
    createdTime: Date;

    user?: UserModel;
    author?: AuthorModel;
    genres: GenreModel[];
    chapters: ChapterModel[];
    reviews: ReviewModel[];
}

export class ComicModel implements IComicModel {
    id: number;
    title: string;
    description: string;
    view: number;
    status: StatusType;
    createdTime: Date;

    user?: UserModel;
    author?: AuthorModel;
    genres: GenreModel[];
    chapters: ChapterModel[];
    comments: CommentModel[];
    reviews: ReviewModel[];
    coverImage?: File;

    statusString?: string;
    statusClass?: string;

    constructor() {
        this.id = 0;
        this.title = "";
        this.description = "";
        this.view = 0;
        this.status = StatusType.PENDING;
        this.createdTime = new Date();

        this.genres = [];
        this.chapters = [];
        this.comments = [];
        this.reviews = [];
    }

    getComicCover(): string {
        return `${AppComponent.baseUrl}images/${this.id}/cover.jpg`;
    }
}