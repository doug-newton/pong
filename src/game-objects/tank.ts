import { GameObject } from "../game-object";
import { RenderUtil } from "../render-util";
import { Vector2f } from "../vector2f";

export class Tank extends GameObject {

    pos: Vector2f = new Vector2f()
    dim: Vector2f = new Vector2f()
    vel: Vector2f = new Vector2f()

    constructor() {
        super()
        this.dim = new Vector2f(50, 70)
    }

    public draw(context: CanvasRenderingContext2D): void {
        RenderUtil.drawRect(context, this.pos.x, this.pos.y, this.dim.w, this.dim.h)
    }

    public update(): void {
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
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
        this.vel.y = -this.speed
    }

    public goDown() {
        this.vel.y = this.speed
    }

    public goLeft() {
        this.vel.x = -this.speed
    }

    public goRight() {
        this.vel.x = this.speed
    }

    public stopX() {
        this.vel.x = 0;
    }

    public stopY() {
        this.vel.y = 0;
    }

    public stop() {
        this.vel.x = 0;
        this.vel.y = 0;
    }

    goingUp(): boolean {
        return this.vel.y < 0
    }

    goingDown(): boolean {
        return this.vel.y > 0
    }

    goingLeft(): boolean {
        return this.vel.x < 0
    }

    goingRight(): boolean {
        return this.vel.x > 0
    }

}