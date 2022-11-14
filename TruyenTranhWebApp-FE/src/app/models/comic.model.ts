import { AppComponent } from "../app.component";
import { AuthorModel } from "./author.model";
import { ChapterModel } from "./chapter.model";
import { GenreModel } from "./genre.model";
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

    user?: UserModel;
    author?: AuthorModel;
    genres: GenreModel[];
    chapters: ChapterModel[];
    coverImage?: File;

    statusString?: string;
    statusClass?: string;

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

    // getComicStatusString(): string {
    //     let result = '';

    //     switch (this.status.toString()) {
    //         case StatusType[StatusType.PENDING]: {
    //             result = 'Chờ duyệt';
    //             break;
    //         }
    //         case StatusType[StatusType.PUBLISH]: {
    //             result = 'Công khai';
    //             break;
    //         }
    //         case StatusType[StatusType.UNPUBLISH]: {
    //             result = 'Ẩn';
    //             break;
    //         }
    //         case StatusType[StatusType.REJECTED]: {
    //             result = 'Không duyệt';
    //             break;
    //         }
    //     }

    //     return result;
    // }

    // getComicStatusClass(): string {
    //     let result = '';

    //     switch (this.status.toString()) {
    //         case StatusType[StatusType.PENDING]: {
    //             result = 'pending';
    //             break;
    //         }
    //         case StatusType[StatusType.PUBLISH]: {
    //             result = 'publish';
    //             break;
    //         }
    //         case StatusType[StatusType.UNPUBLISH]: {
    //             result = 'unpublish';
    //             break;
    //         }
    //         case StatusType[StatusType.REJECTED]: {
    //             result = 'reject';
    //             break;
    //         }
    //     }

    //     return result;
    // }
}