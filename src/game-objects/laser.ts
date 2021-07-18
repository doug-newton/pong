import { GameObject } from "../game-object";
import { GameSettings } from "../game-settings";
import { RenderUtil } from "../render-util";
import { Style } from "../style";
import { Vector2f } from "../vector2f";
import { Tank } from "./tank";

enum BoundCollisionType {
    NONE, TOP, RIGHT, LEFT, BOTTOM
}

class Reflection {
    pos: Vector2f
    boundCollisionType: BoundCollisionType
    constructor(pos: Vector2f, boundCollisionType: BoundCollisionType) {
        this.pos = new Vector2f(pos.x, pos.y)
        this.boundCollisionType = boundCollisionType
    }
}

export class Laser extends GameObject {

    tank: Tank
    points: Vector2f[] = []

    constructor(tank: Tank) {
        super();
        this.tank = tank
    }

    laserStyle: Style = new Style("red", "red", 1, false, true)

    public draw(context: CanvasRenderingContext2D): void {
        if (this.points.length < 2) 
            return;

        for (let i = 0; i < this.points.length - 1; i++) {
            let p1: Vector2f = this.points[i]
            let p2: Vector2f = this.points[i + 1]
            RenderUtil.drawLine(context, p1.x, p1.y, p2.x, p2.y, this.laserStyle)
        }

        for (let i = 0; i < this.points.length; i++) {
            let point: Vector2f = this.points[i]
            RenderUtil.drawCircle(context, point.x, point.y, 5)
        }
    }

    public update(): void {
    }
}