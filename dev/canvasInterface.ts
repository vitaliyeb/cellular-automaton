
class CanvasInterface {
    cnv: any;
    ctx: any;
    w: number;
    h: number;

    constructor() {
        this.cnv = document.getElementById('canvas');
        this.ctx = this.cnv.getContext('2d');
        this.w = window.innerWidth;
        this.h = window.innerHeight;


        window.addEventListener('resize', ()=> this.setSize());
    }

    setSize(): void{
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.cnv.width = this.w;
        this.cnv.height = this.h;
    }

}
let canvasInterface = new CanvasInterface();
console.log(canvasInterface)





