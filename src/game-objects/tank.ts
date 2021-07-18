import { Canvas } from "../canvas";
import { GameObject } from "../game-object";
import { RenderUtil } from "../render-util";
import { Style } from "../style";
import { Vector2f } from "../vector2f";
import { Bullet } from "./bullet";

export class Tank extends GameObject {

    position: Vector2f = new Vector2f()
    size: Vector2f = new Vector2f()
    rotation: number = 0
    target: Vector2f = new Vector2f()
    power: number = 9
    reversePower: number = 3
    speed: number = 0
    bulletSpeed: number = 15

    laserStyle: Style = new Style("red", "red", 1, false, true)

    constructor() {
        super()
        this.size = new Vector2f(50, 70)
        this.position.x = 300
        this.position.y = 300
    }

    public draw(context: CanvasRenderingContext2D): void {
        RenderUtil.drawTank(context, this.position.x, this.position.y, this.size.w, this.size.h, this.rotation);
        RenderUtil.drawCrosshair(context, this.target.x, this.target.y);
        RenderUtil.drawText(context, 50, 50, `rotation: ${this.rotation}`);
        this.drawLaser(context)
    }

    private drawLaser(context: CanvasRenderingContext2D): void {
        let laserEnd: Vector2f = new Vector2f(
            this.position.x - Math.cos(this.rotation + Math.PI / 2) * 2000,
            this.position.y - Math.sin(this.rotation + Math.PI / 2) * 2000
        )
        RenderUtil.drawLine(context,
            this.position.x - Math.cos(this.rotation + Math.PI / 2) * 75,
            this.position.y - Math.sin(this.rotation + Math.PI / 2) * 75,
            laserEnd.x,
            laserEnd.y,
            this.laserStyle)
    }

    public update(): void {
        if (!this.canGoForwards() && this.goingUp()) 
            this.stopY()
        this.move();
        this.faceAimPos();
    }

    public onMouseMove(event: MouseEvent) {
        let canvas: Canvas = this.parent!.getCanvasObject()
        this.target.x = event.pageX - canvas.canvas.offsetLeft;
        this.target.y = event.pageY - canvas.canvas.offsetTop;
    }

    public onKeyDown(event: KeyboardEvent) {
        switch (event.key) {
            case 'w':
                this.goForwards();
                break;
            case 's':
                this.goBackwards();
                break;
            case ' ':
                this.shoot();
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
                    else {
                        this.breaking = false
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

    private move(): void {
        this.position.x += Math.cos(this.rotation + Math.PI/2) * this.speed
        this.position.y += Math.sin(this.rotation + Math.PI/2) * this.speed
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

    private shoot() {
        let bullet: Bullet = new Bullet(this.rotation, this.bulletSpeed)
        bullet.position.x = this.position.x - Math.cos(this.rotation + Math.PI/2) * 70
        bullet.position.y = this.position.y - Math.sin(this.rotation + Math.PI/2) * 70
        this.parent!.registerGameObject(bullet)
    }

    private breaking: boolean = false

    private goForwards() {
        if (!this.canGoForwards()) 
            return
        this.speed = -this.power
    }

    private goBackwards() {
        if (this.breaking) 
            return false
        this.speed = this.reversePower
    }

    private stopY() {
        this.speed = 0;
        this.breaking = true
    }

    private goingUp(): boolean {
        return this.speed < 0
    }

    private goingDown(): boolean {
        return this.speed > 0
    }

    private canGoForwards(): boolean {
        if (this.breaking)
            return false
        let targetTransform: Vector2f = new Vector2f(
            this.target.x - this.position.x,
            this.target.y - this.position.y
        )
        let difference = targetTransform.x * targetTransform.x + targetTransform.y * targetTransform.y
        return difference >= 85 * 85;
    }
}