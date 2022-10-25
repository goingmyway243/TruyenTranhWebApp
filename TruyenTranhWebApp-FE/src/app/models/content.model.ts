export interface IContentModel {
    id: number;
    fileName: string;
    contentIndex: number;
    chapterId: number;
}

export class ContentModel implements IContentModel {
    id: number;
    fileName: string;
    contentIndex: number;
    chapterId: number;

    constructor() {
        this.id = 0;
        this.fileName = "";
        this.contentIndex = 0;
        this.chapterId = 0;
    }
}