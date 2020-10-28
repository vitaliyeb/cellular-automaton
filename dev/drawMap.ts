
interface DrawMapInterface {
    drawCellMap(cellSize: number): void;
}


export default class DrawMap implements DrawMapInterface{
    ctx: any;

    constructor(ctx: any) {
        this.ctx = ctx;
    }

    drawCellMap(cellSize: number): void {
        let { ctx } = this;
        ctx.beginPath();


    }
}
