import { Canvas } from "./canvas";
import { GameObject } from "./game-object";
import { GameSettings } from "./game-settings";
import { RenderUtil } from "./render-util";
import { Style } from "./style";
import { Vector2f } from "./vector2f";

export class Paddle extends GameObject {

    constructor() {
        super()
        this.pos = new Vector2f(0,0);
        this.dim = new Vector2f(200, 20);
        this.pos.y = GameSettings.canvasDimensions.h - 50
    }

    style: Style = new Style("white", "cyan", 1, true, true);

    pos: Vector2f = new Vector2f()
    dim: Vector2f = new Vector2f()

    public draw(context: CanvasRenderingContext2D): void {
        RenderUtil.drawRect(context, this.pos.x, this.pos.y, this.dim.w, this.dim.h, this.style)
    }

    public update(): void {
    }

    public onMouseMove(event: MouseEvent) {
        let canvas: Canvas = this.getParent().getCanvasObject()
        this.pos.x = (event.pageX - canvas.canvas.offsetLeft) - this.dim.w / 2
    }

}