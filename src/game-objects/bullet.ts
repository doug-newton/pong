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
    maxBounces: number = 3
    numBounces: number = 0

    constructor(rotation: number, speed: number) {
        super();
        this.rotation = rotation;
        this.speed = speed;

        this.velocity = new Vector2f(
            Math.cos(this.rotation - Math.PI / 2) * this.speed,
            Math.sin(this.rotation - Math.PI / 2) * this.speed
        )

        let randomColorIndex = Math.floor(Math.random() * this.colors.length)
        this.style.fillColor = this.colors[randomColorIndex]
    }

    colors: string[] = ['white', 'red', 'green', 'blue', 'yellow', 'orange', 'magenta']

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
            this.bounceX()
        }

        if (this.position.x > rightBound) {
            this.bounceX()
        }

        if (this.position.y < topBound) {
            this.bounceY()
        }

        if (this.position.y > bottomBound) {
            this.bounceY()
        }
    }

    private bounceX() {
        this.velocity.x = -this.velocity.x
        this.numBounces ++
        if (this.numBounces > this.maxBounces) {
            this.parent!.unregisterGameObject(this)
        }
    }

    private bounceY() {
        this.velocity.y = -this.velocity.y
        this.numBounces ++
        if (this.numBounces > this.maxBounces) {
            this.parent!.unregisterGameObject(this)
        }
    }

}