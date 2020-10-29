import { Cell } from './parametrs';

interface DrawMapInterface {
    drawCellMap(table: Cell[][], cellSize: number): void;
}





export default class DrawMap implements DrawMapInterface{
    ctx: any;

    constructor(ctx: any) {
        this.ctx = ctx;
    }

    drawCellMap(table: Cell[][], cellSize: number): void {
        let { ctx } = this;

        for (let i = 0; i < table.length; i++){
            for (let j = 0; j < table[i].length; j++){
                let item = table[i][j],
                    x = cellSize * j,
                    y = cellSize * i;

                ctx.beginPath();
                ctx.fillStyle = item.type ? '#000' : '#fff';
                ctx.strokeStyle = 'green';
                ctx.fillRect( x, y, cellSize , cellSize);
                ctx.strokeRect(x, y, cellSize, cellSize);
                ctx.font = '17px serif';
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                ctx.fillStyle = 'red';
                ctx.fillText(item.score, x + cellSize / 2, y + cellSize / 2, cellSize); 
            }
        }

    }
}
