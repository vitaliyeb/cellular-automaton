

interface ICell {
    type: number;
    score: number;
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
    сonsideredNeighbors: string[];

    constructor() {
        this.cellSize = 50;
        this.table = undefined;
        this.сonsideredNeighbors = ['1', '2', '3', '4', '5', '6', '7', '8'];
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

        console.log(table);
        
        table[5][7] = new Cell(1, 0);
        
        this.table = table;
    }
}

export {
    Cell,
    Parametrs
}