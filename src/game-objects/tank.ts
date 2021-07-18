import { Canvas } from "../canvas";
import { GameObject } from "../game-object";
import { RenderUtil } from "../render-util";
import { Vector2f } from "../vector2f";
import { Bullet } from "./bullet";

export class Tank extends GameObject {

    position: Vector2f = new Vector2f()
    size: Vector2f = new Vector2f()
    rotation: number = 0
    target: Vector2f = new Vector2f()
    power: number = 2
    speed: number = 0

    constructor() {
        super()
        this.size = new Vector2f(50, 70)
        this.position.x = 300
        this.position.y = 300
    }

    public draw(context: CanvasRenderingContext2D): void {
        RenderUtil.drawTank(context, this.position.x, this.position.y, this.size.w, this.size.h, this.rotation);
        this.drawCrossHair(context);
        RenderUtil.drawText(context, 50, 50, `rotation: ${this.rotation}`);
    }

    private drawCrossHair(context: CanvasRenderingContext2D) {
        let crossHairSize = 10;
        RenderUtil.drawLine(context, this.target.x - crossHairSize, this.target.y, this.target.x + crossHairSize, this.target.y);
        RenderUtil.drawLine(context, this.target.x, this.target.y - crossHairSize, this.target.x, this.target.y + crossHairSize);
    }

    public update(): void {
        this.move();
        this.faceAimPos();
    }

    private move(): void {
        this.position.x += Math.cos(this.rotation + Math.PI/2) * this.speed
        this.position.y += Math.sin(this.rotation + Math.PI/2) * this.speed
    }

    public onMouseMove(event: MouseEvent) {
        let canvas: Canvas = this.parent!.getCanvasObject()
        this.target.x = event.pageX - canvas.canvas.offsetLeft;
        this.target.y = event.pageY - canvas.canvas.offsetTop;
    }

    private faceAimPos() {
        let aim: Vector2f = new Vector2f(
            this.target.x - this.position.x,
            this.target.y - this.position.y
        );
        let trans = aim.y / aim.x;
        this.rotation = Math.atan(trans) + Math.PI / 2

        if (aim.x < 0) {
            this.rotation -= Math.PI
        }
    }

    public onKeyDown(event: KeyboardEvent) {
        switch (event.key) {
            case 'w':
                this.goUp();
                break;
            case 's':
                this.goDown();
                break;
            case ' ':
                this.shoot();
                break;
            default:
                break;
        }
    }

    private shoot() {
        let bullet: Bullet = new Bullet(this.rotation, 9)
        bullet.position.x = this.position.x - Math.cos(this.rotation + Math.PI/2) * 70
        bullet.position.y = this.position.y - Math.sin(this.rotation + Math.PI/2) * 70
        this.parent!.registerGameObject(bullet)
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
            default:
                break;
        }
    }

    public goUp() {
        this.speed = -this.power
    }

    public goDown() {
        this.speed = this.power
    }

    public stopY() {
        this.speed = 0;
    }

    goingUp(): boolean {
        return this.speed < 0
    }

    goingDown(): boolean {
        return this.speed > 0
    }
}