export interface IGenreModel {
    id: number;
    name: string;
}

export class GenreModel implements IGenreModel {
    id: number;
    name: string;

    constructor() {
        this.id = 0;
        this.name = "";
    }
}