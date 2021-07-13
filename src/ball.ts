import { GameObject } from "./game-object";
import { GameSettings } from "./game-settings";
import { RenderUtil } from "./render-util";
import { Style } from "./style";
import { Vector2f } from "./vector2f";

export class Ball extends GameObject {

    pos: Vector2f = new Vector2f()
    vel: Vector2f = new Vector2f()
    radius: number = 10
    style: Style = new Style("green", "fuchsia", 6, true, true);

    constructor() {
        super()
        this.vel.x = 5
        this.vel.y = 3
    }

    public override draw(canvas: CanvasRenderingContext2D): void {
        RenderUtil.drawCircle(canvas, this.pos.x, this.pos.y, this.radius, this.style);
    }

    public override update(): void {
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        this.checkBoundsCollision();
    }

    private checkBoundsCollision(): void {
        let radius: number = this.radius
        let width: number = GameSettings.canvasDimensions.w
        let height: number = GameSettings.canvasDimensions.h

        if (this.pos.x > width - radius) {
            this.pos.x = width - radius;
            this.vel.x = -this.vel.x
        }
        else if (this.pos.x < 0 + radius) {
            this.pos.x = 0 + radius
            this.vel.x = -this.vel.x
        }

        if (this.pos.y > height - radius) {
            this.pos.y = height - radius;
            this.vel.y = -this.vel.y
        }
        else if (this.pos.y < 0 + radius) {
            this.pos.y = 0 + radius
            this.vel.y = -this.vel.y
        }
    }

}