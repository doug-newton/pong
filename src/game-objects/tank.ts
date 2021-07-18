import { Canvas } from "../canvas";
import { GameObject } from "../game-object";
import { RenderUtil } from "../render-util";
import { Vector2f } from "../vector2f";

export class Tank extends GameObject {

    position: Vector2f = new Vector2f()
    size: Vector2f = new Vector2f()
    relativeVelocity: Vector2f = new Vector2f()
    rotation: number = 0
    target: Vector2f = new Vector2f()

    constructor() {
        super()
        this.size = new Vector2f(50, 70)
        this.position.x = 300
        this.position.y = 300
    }

    public draw(context: CanvasRenderingContext2D): void {
        RenderUtil.drawRect(context, this.position.x, this.position.y, this.size.w, this.size.h, this.rotation)
        RenderUtil.drawLine(context, this.position.x, this.position.y, this.target.x, this.target.y)
        RenderUtil.drawCircle(context, this.target.x, this.target.y, 5)
        RenderUtil.drawText(context, 50, 50, `rotation: ${this.rotation}`)
    }

    public update(): void {
        this.position.x += this.relativeVelocity.x
        this.position.y += this.relativeVelocity.y
        this.faceAimPos();
    }

    public onMouseMove(event: MouseEvent) {
        let canvas: Canvas = this.parent!.getCanvasObject()
        this.target.x = event.pageX - canvas.canvas.offsetLeft;
        this.target.y = event.pageY - canvas.canvas.offsetTop;
    }

    private faceAimPos() {
        let trans = (this.target.y - this.position.y) / (this.target.x - this.position.x)
        this.rotation = Math.atan(trans) + Math.PI / 2
    }

    public onKeyDown(event: KeyboardEvent) {
        switch (event.key) {
            case 'w':
                this.goUp();
                break;
            case 'a':
                this.goLeft();
                break;
            case 's':
                this.goDown();
                break;
            case 'd':
                this.goRight();
                break;
            default:
                break;
        }
    }

    public onKeyUp(event: KeyboardEvent) {
        switch (event.key) {
            case 'w':
                {
                    if (this.goingUp()) {
                        this.stopY();
                    }
                }
                break;
            case 's':
                {
                    if (this.goingDown()) {
                        this.stopY();
                    }
                }
                break;
            case 'a':
                {
                    if (this.goingLeft()) {
                        this.stopX();
                    }
                }
            case 'd':
                {
                    if (this.goingRight()) {
                        this.stopX();
                    }
                }
                break;
            default:
                break;
        }
    }

    speed: number = 2

    public goUp() {
        this.relativeVelocity.y = -this.speed
    }

    public goDown() {
        this.relativeVelocity.y = this.speed
    }

    public goLeft() {
        this.relativeVelocity.x = -this.speed
    }

    public goRight() {
        this.relativeVelocity.x = this.speed
    }

    public stopX() {
        this.relativeVelocity.x = 0;
    }

    public stopY() {
        this.relativeVelocity.y = 0;
    }

    public stop() {
        this.relativeVelocity.x = 0;
        this.relativeVelocity.y = 0;
    }

    goingUp(): boolean {
        return this.relativeVelocity.y < 0
    }

    goingDown(): boolean {
        return this.relativeVelocity.y > 0
    }

    goingLeft(): boolean {
        return this.relativeVelocity.x < 0
    }

    goingRight(): boolean {
        return this.relativeVelocity.x > 0
    }

}