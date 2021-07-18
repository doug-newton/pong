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
    m: number = 0

    constructor(tank: Tank) {
        super();
        this.tank = tank
    }

    laserStyle: Style = new Style("red", "red", 1, false, true)

    public draw(context: CanvasRenderingContext2D): void {
        RenderUtil.drawText(context, 50, 100, `m: ${this.m}`);

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

        this.points = []
        let x: number = this.tank.position.x - Math.cos(this.tank.rotation + Math.PI / 2) * 75;
        let y: number = this.tank.position.y - Math.sin(this.tank.rotation + Math.PI / 2) * 75;
        let x1: number = this.tank.position.x - Math.cos(this.tank.rotation + Math.PI / 2) * 2000;
        let y1: number = this.tank.position.y - Math.sin(this.tank.rotation + Math.PI / 2) * 2000;

        let dx: number = x1 - x
        let dy: number = y1 - y
        let gradient = dy / dx
        let m = gradient

        this.points.push(
            new Vector2f(x, y),
        )

        let negativeRotation: boolean = this.tank.rotation < 0

        for (let i: number = 0; i < 4; i++)
        {
            let reflection: Reflection = this.nextIntersection(x, y, m, negativeRotation)
            let boundCollisionType: BoundCollisionType = reflection.boundCollisionType

            let nextPoint: Vector2f = reflection.pos
            this.points.push(nextPoint);

            dx = nextPoint.x - x
            dy = nextPoint.y - y

            x = nextPoint.x
            y = nextPoint.y

            negativeRotation = !negativeRotation
            m = -m
        }

        let a = 3
        if (a==4)
        {
            negativeRotation = !negativeRotation

            let myPoint: Vector2f = new Vector2f(50, 300)
            this.points.push(myPoint);

            x = myPoint.x
            y = myPoint.y
            m = 0.5

            let reflection: Reflection = this.nextIntersection(x, y, m, negativeRotation)
            let boundCollisionType: BoundCollisionType = reflection.boundCollisionType

            let nextPoint: Vector2f = reflection.pos
            this.points.push(nextPoint);
        }
    }

    nextIntersection(x: number, y: number, m: number, negativeRotation: boolean): Reflection {
        let leftBound: number = 0
        let topBound: number = 0
        let rightBound: number = GameSettings.canvasDimensions.w
        let bottomBound: number = GameSettings.canvasDimensions.h
        let boundCollisionType: BoundCollisionType = BoundCollisionType.NONE

        let c: number = 0
        let xx: number = 0;
        let yy: number = 0;

        if (negativeRotation) {
            xx = 0
        }
        else {
            xx = rightBound
        }

        c = y - x * m
        yy = m * xx + c

        if (topBound < yy && yy < bottomBound) {
            if (xx == 0) {
                boundCollisionType = BoundCollisionType.LEFT
            }
            else if (x == rightBound) {
                boundCollisionType = BoundCollisionType.RIGHT
            }
        }
        else if (leftBound < x && x < rightBound) {
            if (yy == 0) {
                boundCollisionType = BoundCollisionType.TOP
            }
            else if (yy == bottomBound) {
                boundCollisionType = BoundCollisionType.BOTTOM
            }
        }

        return new Reflection(new Vector2f(xx, yy), boundCollisionType)

    }
}