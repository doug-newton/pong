import { GameObject } from "./game-object";
import { RenderUtil } from "./render-util";

class Vector2f {
    x: number = 0
    y: number = 0
}

export class Ball extends GameObject {

    pos: Vector2f = new Vector2f()
    vel: Vector2f = new Vector2f()

    constructor() {
        super()
        this.vel.x = 5
        this.vel.y = 3
    }

    public override draw(canvas: CanvasRenderingContext2D): void {
        RenderUtil.drawCircle(canvas, this.pos.x, this.pos.y, 50);
    }

    public override update(): void {
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        this.checkBoundsCollision();
    }

    private checkBoundsCollision(): void {
        let radius: number = 50
        let width: number = 640
        let height: number = 480

        if (this.pos.x > width - radius){
            this.pos.x = width - radius;
            this.vel.x = -this.vel.x
        }
        else if (this.pos.x < 0 + radius){
            this.pos.x = 0 + radius
            this.vel.x = -this.vel.x
        }

        if (this.pos.y > height - radius){
            this.pos.y = height - radius;
            this.vel.y = -this.vel.y
        }
        else if (this.pos.y < 0 + radius){
            this.pos.y = 0+ radius
            this.vel.y = -this.vel.y
        }
    }

}