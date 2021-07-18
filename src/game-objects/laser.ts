import { GameObject } from "../game-object";
import { GameSettings } from "../game-settings";
import { RenderUtil } from "../render-util";
import { Style } from "../style";
import { Vector2f } from "../vector2f";
import { Tank } from "./tank";

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

        let leftBound: number = 0
        let topBound: number = 0
        let rightBound: number = GameSettings.canvasDimensions.w
        let bottomBound: number = GameSettings.canvasDimensions.h

        this.points = []
        let x: number = this.tank.position.x - Math.cos(this.tank.rotation + Math.PI / 2) * 75;
        let y: number = this.tank.position.y - Math.sin(this.tank.rotation + Math.PI / 2) * 75;
        let x1: number = this.tank.position.x - Math.cos(this.tank.rotation + Math.PI / 2) * 2000;
        let y1: number = this.tank.position.y - Math.sin(this.tank.rotation + Math.PI / 2) * 2000;

        let gradient = (y1 - y) / (x1 - x)

        //    if (this.tank.rotation > 0 && this.tank.rotation < Math.PI){

        this.m = gradient
        let c = y - x * this.m

        let xx: number = 0;
        let yy: number = 0;

        if (this.tank.rotation < 0) {
            xx = 0
        }
        else {
            xx = rightBound
        }

        yy = this.m * xx + c

        this.points.push(
            new Vector2f(x, y),
            new Vector2f(xx, yy),
            new Vector2f(300, 300),
            new Vector2f(500, 400),
            //    new Vector2f(
                //    this.tank.position.x - Math.cos(this.tank.rotation + Math.PI / 2) * 2000,
                //    this.tank.position.y - Math.sin(this.tank.rotation + Math.PI / 2) * 2000
            //    ),
        )
    }
}