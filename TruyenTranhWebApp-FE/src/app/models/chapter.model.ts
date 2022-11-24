import { Utils } from "../utils/utils";
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
    deletedContents: ContentModel[];

    constructor() {
        this.id = 0;
        this.name = "";
        this.chapterIndex = 0;
        this.createdTime = new Date();

        this.contents = [];
        this.contentImages = [];

        this.deletedContents = [];
    }

    getChapterName(indexOnly?: boolean): string {
        let name = this.name ? ` - ${this.name}` : '';
        let result = 'Chương ' + this.chapterIndex;
        return indexOnly ? result : result + name;
    }

    getTimeDiff(): string {
        return Utils.getTimeDiff(this.createdTime);
    }
}