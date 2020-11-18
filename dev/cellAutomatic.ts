import { Parametrs, Cell, IRegulirationFunc } from './parametrs';
import DrawMap from './drawMap';
import {makeLogger} from "ts-loader/dist/logger";

class CellAutomatic {
    cnv: any;
    ctx: any;
    w: number;
    h: number;
    changeCeillTimerId: any;
    parametrs: Parametrs;
    drawApi: DrawMap;
    [propName: string]: any;

    constructor() {
        this.cnv = document.getElementById('canvas');
        this.ctx = this.cnv.getContext('2d');
        changeCeillTimerId: undefined;
        this.w = 0;
        this.h = 0;
        this.parametrs = new Parametrs();
        this.drawApi = new DrawMap(this.ctx);

        window.addEventListener('resize', ()=> this.setSize());
        document.querySelector('.panel').addEventListener('click', (e: any)=>{
            let methodName: string = e.target.getAttribute("data-method");
            if(methodName) return this[methodName](e);
        });
    }

    start(): void{
        this.changeCeillTimerId = setTimeout(()=>{
            this.calculationTable();
            this.changeCellType();
            this.drawApi.drawCellMap(this.parametrs.table, this.parametrs.cellSize);
            this.start();
        }, this.parametrs.interval);
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
        let cellSize: number = this.parametrs.cellSize,
            w = Math.floor(document.documentElement.clientWidth / cellSize) * cellSize,
            h = Math.floor(document.documentElement.clientHeight / cellSize) * cellSize;

        this.cnv.width = this.w = w;
        this.cnv.height = this.h = h;
    }



    openClosePanel(e: Event): void{
        document.querySelector('.panel').classList.toggle('panel_active');
    }

    init(): void{
        this.setSize();
        this.parametrs.createTable(this.w, this.h);
        this.start();
    }

}

window.onload = () => {
    let cellAutomatic = new CellAutomatic();
    cellAutomatic.init();
    console.log(cellAutomatic);
}

