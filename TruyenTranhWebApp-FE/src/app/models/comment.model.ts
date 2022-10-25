export interface ICommentModel {
    id: number;
    comment: string;
    userId: number;
    chapterId: number;
}

export class CommentModel implements ICommentModel {
    id: number;
    comment: string;
    userId: number;
    chapterId: number;

    constructor() {
        this.id = 0;
        this.comment = "";
        this.userId = 0;
        this.chapterId = 0;
    }
}