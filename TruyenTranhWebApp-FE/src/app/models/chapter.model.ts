import { ComicModel } from "./comic.model";
import { ContentModel } from "./content.model";

export interface IChapterModel {
    id: number;
    name: string;
    chapterIndex: number;
    createdTime: Date;
}

export class ChapterModel implements IChapterModel {
    id: number;
    name: string;
    chapterIndex: number;
    createdTime: Date;

    comic?: ComicModel;
    contents: ContentModel[];
    contentImages: File[];

    constructor() {
        this.id = 0;
        this.name = "";
        this.chapterIndex = 0;
        this.createdTime = new Date();

        this.contents = [];
        this.contentImages = [];
    }

    getChapterName(): string {
        let name = this.name ? ` - ${this.name}` : '';
        return 'Chương ' + this.chapterIndex + name;
    }
}