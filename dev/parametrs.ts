

interface ICell {
    type: number;
    score: number;
}

interface IRegulirationFunc {
    (row: number, column: number): boolean;
}


class Cell implements ICell{
    type: number;
    score: number;
    constructor(type: number, score: number) {
        this.type = type;
        this.score = score;
    }
}

class Parametrs {
    cellSize: number;
    table: ICell[][];
    сonsideredNeighbors: number[];
    regulation: IRegulirationFunc[];

    constructor() {
        this.cellSize = 50;
        this.table = undefined;
        this.сonsideredNeighbors = [0, 1, 2, 3, 4, 5, 6, 7];
        this.regulation = [

        ]
    }

    createTable(w: number, h: number) {
        let { cellSize } = this;
        let wDivision: number = Math.ceil(w / cellSize),
            hDivision: number = Math.ceil( h / cellSize),
            table: ICell[][] = [];

        for( let h = 0; h < hDivision; h++ ){
            let row = [];
            for( let w = 0; w < wDivision; w++ ) row.push( new Cell(0, 0));
            table.push(row);
        }
        
        this.table = table;
    }
}

export {
    Cell,
    Parametrs
}