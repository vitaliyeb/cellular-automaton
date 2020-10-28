
export default class Parametrs {
    cellSize: number;
    table: object[];
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
        let table: object[] = Array(hDivision).fill(Array(wDivision).fill({
            type: 0,
            score: 0
        }));
        this.table = table;
    }
}
