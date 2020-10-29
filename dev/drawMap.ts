
interface DrawMapInterface {
    drawCellMap(table: object[][], cellSize: number): void;
}





export default class DrawMap implements DrawMapInterface{
    ctx: any;

    constructor(ctx: any) {
        this.ctx = ctx;
    }

    drawCellMap(table: object[][], cellSize: number): void {
        let { ctx } = this;
        for (let i = 0; i < table.length; i++){
            for (let j = 0; j < table[i].length; j++){
                ctx.beginPath();
                // ctx.fillStyle = table[i][j].type ? '#000' : '#fff';
                ctx.fillRect( cellSize * j, cellSize * i, cellSize , cellSize);
            }
        }

    }
}
