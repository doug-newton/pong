import { GameSettings } from "./game-settings";

export class Canvas {

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementsByTagName('canvas')[0]
        this.canvas.width = GameSettings.width
        this.canvas.height = GameSettings.height
        this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    }

    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D

    clear(){
        this.context.clearRect(0, 0, GameSettings.width, GameSettings.height)
    }
}