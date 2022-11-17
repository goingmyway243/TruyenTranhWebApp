import { AppComponent } from "../app.component";
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

    getContentImage(comicId: number): string {
        return comicId == 0 ? '' : `${AppComponent.baseUrl}images/${comicId}/${this.id}.jpg`;
    }
}