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
        this.changeCeillTimerId = undefined;
        this.w = 0;
        this.h = 0;
        this.parametrs = new Parametrs();
        this.drawApi = new DrawMap(this.ctx);

        window.addEventListener('resize', ()=> this.setSize());
    }

    drawTick(): void{
        this.changeCellType();
        this.calculationTable();
        this.drawApi.drawCellMap(this.parametrs.table, this.parametrs.cellSize);
    }

    start(): void{
        if (this.changeCeillTimerId) return;
        this.changeCeillTimerId = setTimeout(()=>{
            this.drawTick();
            this.changeCeillTimerId = undefined;
            this.start();
        }, this.parametrs.interval);
    }

    pause(): void {
        clearTimeout(this.changeCeillTimerId);
        this.changeCeillTimerId = undefined;
    }

    stop(): void {
        this.pause();
        let table: object[][] = this.parametrs.table;
        this.parametrs.resetTable();
        this.drawApi.drawCellMap(this.parametrs.table, this.parametrs.cellSize);
    }

    initEventsPanel(): void {
        document.querySelector('.panel').addEventListener('click', (e):void =>{
            let methodName: string = (<HTMLTextAreaElement>e.target).getAttribute("data-method");
            if(methodName) return this[methodName](e);
        });
        this.cnv.addEventListener('click', (e: MouseEvent):void => {
            let x: number = e.offsetX, 
                y: number = e.offsetY,
                cellSize: number = this.parametrs.cellSize,
                currentColEl: number = Math.ceil(x / cellSize) - 1,
                currentRowEl: number = Math.ceil(y / cellSize) - 1;
            
                this.parametrs.toggleTypeCell(currentRowEl, currentColEl);
                this.calculationTable();
                this.drawApi.drawCellMap(this.parametrs.table, this.parametrs.cellSize);
        });
        Array.from(document.querySelectorAll('.setBD-change')).forEach(el => el.addEventListener('input', (e: InputEvent)=>this.changeBD(e)))
        document.querySelector('.apply-change-cellSize').addEventListener('click',()=>this.changeCellSize());

    }

    calculationTable(): void{
        let table: Cell[][] = this.parametrs.table,
            allRegulation: IRegulirationFunc[] = this.parametrs.regulation,
            consideredNeighbors: Array<number> = this.parametrs.consideredNeighbors,
            rosibleRules = consideredNeighbors.map((el, index) => allRegulation[el]);

        for( let row = 0; row < table.length; row++ ){
            for (let col = 0; col < table[row].length; col++) {
                let cell = table[row][col];
                cell.score = 0;
                rosibleRules.forEach(f => f(row, col) ? ++cell.score : false );
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
        this.drawTick();
        this.initEventsPanel();
    }

    setSelectCell(e: MouseEvent): void{
        let el = e.target as HTMLElement;
        this.setActiveCustomElement(el)
    }

    setPropertyHappyDead(e: MouseEvent): void{
        let el = e.target as HTMLElement;
        this.setActiveCustomElement(el)
    }

    setSizeCell(e: MouseEvent): void{
        (document.querySelector('.change_size') as HTMLInputElement).value = String(this.parametrs.cellSize);
        document.querySelector('.warning-cellSize').textContent = '';
        let el = e.target as HTMLElement;
        this.setActiveCustomElement(el);
    }

    setActiveCustomElement(newActiveElement: HTMLElement): void{
        document.querySelector('.panel__setting-items > svg.active').classList.remove('active');
        newActiveElement.classList.add('active');
        
        document.querySelector(".panel__actions > div.active").classList.remove('active');;
        document.querySelector(`#${newActiveElement.getAttribute('data-open')}`).classList.add('active');
    }

    toggleCellOutside(e: MouseEvent): void{
        let el = e.target as HTMLElement,
            idCell: number = Number(el.getAttribute('data-num'))-1,
            consideredNeighbors = this.parametrs.consideredNeighbors;

        el.classList.toggle('active');
        let hasActive: boolean = el.classList.contains('active');

        if (hasActive){
            let after = consideredNeighbors.slice(idCell, 8),
                before = consideredNeighbors.slice(0, idCell);
            this.parametrs.consideredNeighbors = before.concat(idCell, after);
        }else {
            this.parametrs.consideredNeighbors.splice(consideredNeighbors.indexOf(idCell), 1)
        };
    }

    changeCellSize(): void{
        let value: string = (<HTMLInputElement>document.querySelector('.change_size')).value,
            num: number = Number(value);
        if (isNaN(num)){
            document.querySelector('.warning-cellSize').textContent = `${value} not a number.`;
            return;
        }
        document.querySelector('.warning-cellSize').textContent = ``;
        this.parametrs.cellSize = num;
        this.setSize();
        this.parametrs.createTable(this.w, this.h);
        this.drawTick();

    }

    changeBD(e: InputEvent): void {
        let value: string = (<HTMLInputElement>e.target).value,
            arrValues: string[] = value.split(',').filter(el => el.trim() !== ''),
            variableValues: number[];
        try {
            variableValues =arrValues.map((value: string): number|never =>{
                let number = Number(value);
                if (isNaN(number)) throw Error(`${value} is not a number.`);
                return number;
            });
            document.querySelector('.setBD__warning').textContent = '';
            let pole = (<HTMLInputElement>e.target).getAttribute('data-pole');
            this.parametrs[pole] = variableValues;
            
        } catch (e) {
            document.querySelector('.setBD__warning').textContent = e.message;
        }
    }


}

window.onload = () => {
    let cellAutomatic = new CellAutomatic();
    cellAutomatic.init();
    console.log(cellAutomatic);
}
