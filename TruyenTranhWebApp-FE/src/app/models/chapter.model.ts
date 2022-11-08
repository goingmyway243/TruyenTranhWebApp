import { ComicModel } from "./comic.model";

export interface IChapterModel {
    id: number;
    name: string;
    chapterIndex: number;
    comicId: number;
    createdTime: Date;
}

export class ChapterModel implements IChapterModel {
    id: number;
    name: string;
    chapterIndex: number;
    comicId: number;
    createdTime: Date;

    comic?: ComicModel;
    contentImages: File[];

    constructor() {
        this.id = 0;
        this.name = "";
        this.chapterIndex = 0;
        this.comicId = 0;
        this.createdTime = new Date();

        this.contentImages = [];
    }

    getChapterName(): string {
        let name = this.name ? ` - ${this.name}` : '';
        return 'Chương ' + this.chapterIndex + name;
    }
}