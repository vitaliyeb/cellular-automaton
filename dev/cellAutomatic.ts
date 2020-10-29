import { Parametrs } from './parametrs';
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

        window.addEventListener('resize', ()=> {
            console.log('resize');
            this.setSize()
        });
    }

    setSize(): void{
        console.log(document.documentElement.clientHeight);
        this.cnv.width = this.w = Math.floor(document.documentElement.clientWidth);
        this.cnv.height = this.h = Math.floor(document.documentElement.clientHeight);
        console.log(this.cnv.width, this.cnv.height, this.h)
    }

    init(): void{
        this.setSize();
        // this.parametrs.createTable(this.w, this.h);
        // this.drawApi.drawCellMap(this.parametrs.table, this.parametrs.cellSize);
    }

}
let cellAutomatic = new CellAutomatic();
cellAutomatic.init();
console.log(cellAutomatic)
