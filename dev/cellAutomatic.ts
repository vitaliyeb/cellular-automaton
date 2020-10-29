import Parametrs from './parametrs';
import DrawMap from './drawMap';

class CellAutomatic {
    cnv: any;
    ctx: any;
    html: any;
    w: number;
    h: number;
    parametrs: Parametrs;
    drawApi: DrawMap;

    constructor() {
        this.cnv = document.getElementById('canvas');
        this.ctx = this.cnv.getContext('2d');
        this.html = document.querySelector('html');
        this.w = 0;
        this.h = 0;
        this.parametrs = new Parametrs();
        this.drawApi = new DrawMap(this.ctx);

        window.addEventListener('resize', ()=> this.setSize());
    }

    setSize(): void{
        this.cnv.width = this.w = Math.floor(this.html.clientWidth);
        this.cnv.height = this.h = Math.floor(this.html.clientHeight);
    }

    init(): void{
        this.setSize();
        this.parametrs.createTable(this.w, this.h);
        this.drawApi.drawCellMap(this.parametrs.table, this.parametrs.cellSize);
    }

}
let cellAutomatic = new CellAutomatic();
cellAutomatic.init();
console.log(cellAutomatic)





