

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
    interval: number;
    table: ICell[][];
    continuationlive: number[];
    birth: number[];
    сonsideredNeighbors: number[];
    regulation: IRegulirationFunc[];

    constructor() {
        this.cellSize = 40;
        this.interval = 200;
        this.table = undefined;
        this.continuationlive = [2, 3];
        this.birth = [3];
        this.сonsideredNeighbors = [0, 1, 2, 3, 4, 5, 6, 7];
        this.regulation = [
            (row: number, col: number)=> this.table[row - 1]?.[col - 1]?.['type'] === 1, //0
            (row: number, col: number)=> this.table[row - 1]?.[col]?.['type'] === 1,  //1
            (row: number, col: number)=> this.table[row - 1]?.[col + 1]?.['type'] === 1,  //2
            (row: number, col: number)=> this.table[row]?.[col + 1]?.['type'] === 1,  //3
            (row: number, col: number)=> this.table[row + 1]?.[col + 1]?.['type'] === 1,  //4
            (row: number, col: number)=> this.table[row + 1]?.[col]?.['type'] === 1,  //5
            (row: number, col: number)=> this.table[row + 1]?.[col - 1]?.['type'] === 1,  //6
            (row: number, col: number)=> this.table[row]?.[col - 1]?.['type'] === 1  //7
        ]
    }

    changeTypeCellFunc(score: number, type: number) {
        if( type && this.continuationlive.includes(score)) return 1;
        if( !type && this.birth.includes(score)) return 1;
        return 0;
    }

    createTable(w: number, h: number) {
        let { cellSize } = this;
        let wDivision: number = Math.floor(w / cellSize),
            hDivision: number = Math.floor( h / cellSize),
            table: ICell[][] = [];

        for( let h = 0; h < hDivision; h++ ){
            let row = [];
            for( let w = 0; w < wDivision; w++ ) row.push( new Cell(0, 0));
            table.push(row);
        }
        table[3][2] =  new Cell(1, 0);
        table[3][3] =  new Cell(1, 0);
        table[3][4] =  new Cell(1, 0);



        this.table = table;
    }
}


export {
    Cell,
    Parametrs,
    IRegulirationFunc
}