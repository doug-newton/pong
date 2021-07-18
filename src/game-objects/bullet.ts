import { GameObject } from "../game-object";
import { RenderUtil } from "../render-util";
import { Vector2f } from "../vector2f";

export class Bullet extends GameObject {

    position: Vector2f = new Vector2f()
    speed: number
    rotation: number

    constructor(rotation: number, speed: number) {
        super();
        this.rotation = rotation;
        this.speed = speed;
    }

    public draw(context: CanvasRenderingContext2D): void {
        RenderUtil.drawCircle(context, this.position.x, this.position.y, 5)
    }

    public update(): void {
        this.position.x += Math.cos(this.rotation - Math.PI/2) * this.speed
        this.position.y += Math.sin(this.rotation - Math.PI/2) * this.speed
    }

}