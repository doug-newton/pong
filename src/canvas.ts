export class Canvas {
    width: number = 640
    height: number = 480

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementsByTagName('canvas')[0]
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    }

    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D

    clear(){
        this.context.clearRect(0, 0, this.width, this.height)
    }
}