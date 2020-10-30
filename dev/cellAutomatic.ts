import { Parametrs, Cell, IRegulirationFunc } from './parametrs';
import DrawMap from './drawMap';

class CellAutomatic {
    cnv: any;
    ctx: any;
    w: number;
    h: number;
    parametrs: Parametrs;
    drawApi: DrawMap;

    constructor() {
        this.cnv = document.getElementById('canvas');
        this.ctx = this.cnv.getContext('2d');
        this.w = 0;
        this.h = 0;
        this.parametrs = new Parametrs();
        this.drawApi = new DrawMap(this.ctx);

        window.addEventListener('resize', ()=> this.setSize());
    }

    calculationTable(): void{
        let table: Cell[][] = this.parametrs.table,
            allRegulation: IRegulirationFunc[] = this.parametrs.regulation,
            сonsideredNeighbors: number[] = this.parametrs.сonsideredNeighbors,
            rosibleRules = сonsideredNeighbors.map((el, index) => allRegulation[index]);
            

        for( let row = 0; row < table.length; row++ ){
            for (let col = 0; col < table[row].length; col++) {
                let cell = table[row][col];
                cell.score = 0;
                rosibleRules.forEach((f)=> f(row, col) ? ++cell.score : false );
            }
        }
    }

    changeCellType(): void{
        let table: Cell[][] = this.parametrs.table;
        

        for( let row = 0; row < table.length; row++ ){
            for (let col = 0; col < table[row].length; col++) {
                let cell = table[row][col];
                let newType = this.parametrs.changeTypeCellFunc(cell.score, cell.type);
                cell.type = newType;
            }
        }
    }

    setSize(): void{
        this.cnv.width = this.w = Math.floor(document.documentElement.clientWidth);
        this.cnv.height = this.h = Math.floor(document.documentElement.clientHeight);
    }

    init(): void{
        this.setSize();
        this.parametrs.createTable(this.w, this.h);
        this.calculationTable();
        this.changeCellType();
        this.drawApi.drawCellMap(this.parametrs.table, this.parametrs.cellSize);
    }

}

window.onload = () => {
    let cellAutomatic = new CellAutomatic();
    cellAutomatic.init();
    console.log(cellAutomatic);
}

