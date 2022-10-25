export enum ReviewType {
    LIKE,
    DISLIKE
}

export interface IReviewModel {
    userId: number;
    comicId: number;
    type: ReviewType;
    createdTime: Date;
}

export class ReviewModel implements IReviewModel {
    userId: number;
    comicId: number;
    type: ReviewType;
    createdTime: Date;

    constructor() {
        this.userId = 0;
        this.comicId = 0;
        this.type = ReviewType.LIKE;
        this.createdTime = new Date();
    }
}