import { CollidableGameObject } from "./collidable-game-object";
import { RenderUtil } from "./render-util";
import { TLBB } from "./tlbb";
import { Vector2f } from "./vector2f";

export class Brick extends CollidableGameObject {

    pos: Vector2f = new Vector2f()
    dim: Vector2f = new Vector2f()
    visible: boolean = true

    constructor(offsetX: number = 0, offsetY: number = 0) {
        super()
        this.dim = new Vector2f(50, 25);
        this.pos = new Vector2f(200 + offsetX * this.dim.w, 200 + offsetY * this.dim.h);
    }

    getTLBB(): TLBB {
        return {
            left: this.pos.x,
            top: this.pos.y,
            width: this.dim.w,
            height: this.dim.h
        }
    }

    public draw(context: CanvasRenderingContext2D): void {
        if (this.visible) {
            RenderUtil.drawRect(context, this.pos.x, this.pos.y, this.dim.w, this.dim.h)
        }
    }

    public update(): void {
    }

    public override collideWithBall(ball: CollidableGameObject) {
        this.visible = false
    }

}