

interface ICell {
    type: number;
    score: number;
}

class Cell implements ICell{
    type: number;
    score: number;
    constructor(type: number, score: number) {

    }
}

export default class Parametrs {
    cellSize: number;
    table: ICell[][];
    сonsideredNeighbors: string[];

    constructor() {
        this.cellSize = 50;
        this.table = undefined;
        this.сonsideredNeighbors = ['1', '2', '3', '4', '5', '6', '7', '8'];
    }

    createTable(w: number, h: number) {
        let { cellSize } = this;
        let wDivision: number = Math.ceil(w / cellSize),
            hDivision: number = Math.ceil( h / cellSize);
        let cellObject: ICell = {
            type: 0,
            score: 0
        };
        let table: ICell[][] = Array(hDivision).fill(Array(wDivision).fill(cellObject));
        this.table = table;
    }
}
