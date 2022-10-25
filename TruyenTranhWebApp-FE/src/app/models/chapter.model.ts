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

    constructor() {
        this.id = 0;
        this.name = "";
        this.chapterIndex = 0;
        this.comicId = 0;
        this.createdTime = new Date();
    }
}