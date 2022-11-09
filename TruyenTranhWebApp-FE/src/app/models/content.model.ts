import { ChapterModel } from "./chapter.model";

export interface IContentModel {
    id: number;
    fileName: string;
    contentIndex: number;
}

export class ContentModel implements IContentModel {
    id: number;
    fileName: string;
    contentIndex: number;

    chapter?: ChapterModel;

    constructor() {
        this.id = 0;
        this.fileName = "";
        this.contentIndex = 0;
    }
}