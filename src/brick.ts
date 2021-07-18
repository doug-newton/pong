import { CollidableGameObject } from "./collidable-game-object";
import { RenderUtil } from "./render-util";
import { Style } from "./style";
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
        this.assignRandomColor()
    }

    assignRandomColor() {
        let random: number = Math.floor(Math.random()*this.colors.length + 0)
        this.style.fillColor = this.colors[random]
    }

    colors: string[] = [
        'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'
    ]

    getTLBB(): TLBB {
        return {
            left: this.pos.x,
            top: this.pos.y,
            width: this.dim.w,
            height: this.dim.h
        }
    }

    style: Style = new Style("white", "red", 1, true, true);

    public draw(context: CanvasRenderingContext2D): void {
        if (this.visible) {
            RenderUtil.drawRect(context, this.pos.x, this.pos.y, this.dim.w, this.dim.h, this.style)
        }
    }

    public update(): void {
    }

    public override collideWithBall(ball: CollidableGameObject) {
        this.visible = false
    }

}