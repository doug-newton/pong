import { GameSettings } from "./game-settings";
import { RenderUtil } from "./render-util";
import { Style } from "./style";

export class Canvas {

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementsByTagName('canvas')[0]
        this.canvas.width = GameSettings.width
        this.canvas.height = GameSettings.height
        this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
    }

    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D
    style: Style = new Style("black", "black", 1, true, true)

    clear(){
        RenderUtil.drawRect(this.context, 0, 0, GameSettings.width, GameSettings.height, this.style)
    }
}