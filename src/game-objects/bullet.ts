import { GameObject } from "../game-object";
import { GameSettings } from "../game-settings";
import { RenderUtil } from "../render-util";
import { Style } from "../style";
import { Vector2f } from "../vector2f";

export class Bullet extends GameObject {

    position: Vector2f = new Vector2f()
    speed: number
    rotation: number
    velocity: Vector2f = new Vector2f()
    style: Style = new Style("white", "white", 1, true, true)

    constructor(rotation: number, speed: number) {
        super();
        this.rotation = rotation;
        this.speed = speed;

        this.velocity = new Vector2f(
            Math.cos(this.rotation - Math.PI / 2) * this.speed,
            Math.sin(this.rotation - Math.PI / 2) * this.speed
        )
    }

    public draw(context: CanvasRenderingContext2D): void {
        RenderUtil.drawCircle(context, this.position.x, this.position.y, 5, this.style)
    }

    public update(): void {
        this.checkBoundsCollision()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

    private checkBoundsCollision() {
        let leftBound: number = 0
        let rightBound: number = GameSettings.canvasDimensions.x
        let topBound: number = 0
        let bottomBound: number = GameSettings.canvasDimensions.y

        if (this.position.x < leftBound) {
            this.velocity.x = -this.velocity.x
        }

        if (this.position.x > rightBound) {
            this.velocity.x = -this.velocity.x
        }

        if (this.position.y < leftBound) {
            this.velocity.y = -this.velocity.y
        }

        if (this.position.y > bottomBound) {
            this.velocity.y = -this.velocity.y
        }
    }

}