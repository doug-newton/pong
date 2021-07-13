import { GameObject } from "./game-object";
import { GameSettings } from "./game-settings";
import { RenderUtil } from "./render-util";
import { Vector2f } from "./vector2f";

export class Paddle extends GameObject {

    constructor() {
        super()
        this.pos = new Vector2f(0,0);
        this.dim = new Vector2f(100, 20);
    }

    pos: Vector2f = new Vector2f()
    dim: Vector2f = new Vector2f()

    public draw(context: CanvasRenderingContext2D): void {
        RenderUtil.drawRect(context, this.pos.x, this.pos.y, this.dim.w, this.dim.h)
    }

    public update(): void {
    }

    public onMouseMove(event: MouseEvent) {
        let cursor = new Vector2f()
        cursor.x = (event.pageX)
        cursor.y = (event.pageY)
        this.pos.x = cursor.x
        this.pos.y = cursor.y
    }

}