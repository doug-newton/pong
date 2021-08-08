import { GameObject } from "../game-object";
import { GameSettings } from "../game-settings";
import { RenderUtil } from "../render-util";
import { Style } from "../style";
import { Vector2f } from "../geometry/vector2f";
import { Tank } from "./tank";
import { Geometry, Line, Ray } from "../geometry/geometry";

export class Laser extends GameObject {

    tank: Tank
    points: Vector2f[] = []
    firstRay: Ray = new Ray(0, 0, 0)

    constructor(tank: Tank) {
        super();
        this.tank = tank
        this.firstRay.origin.x = this.tank.position.x
        this.firstRay.origin.y = this.tank.position.y
    }

    laserStyle: Style = new Style("red", "red", 1, false, true)


    public draw(context: CanvasRenderingContext2D): void {
        RenderUtil.drawText(context, 50, 100, `rotation: ${this.firstRay.angle}`);

        if (this.points.length < 2)
        {
            return
        }

        for (let i = 0; i < this.points.length - 1; i++) {
            let p1: Vector2f = this.points[i]
            let p2: Vector2f = this.points[i + 1]
            RenderUtil.drawLine(context, p1.x, p1.y, p2.x, p2.y, this.laserStyle)
        }



    }

    public update(): void {
        this.firstRay.origin.x = this.tank.position.x
        this.firstRay.origin.y = this.tank.position.y

        this.firstRay.angle = this.tank.rotation 
        let maxReflections = 8

        if (this.firstRay.angle < 0) {
            this.firstRay.angle += Math.PI * 2
        }

        let rays: Ray[] = []

        let i: number = 0

        let lines: Line[] = [
            new Line(Infinity, 0, null),
            new Line(Infinity, 1280, null),
            new Line(0, null, 0),
            new Line(0, null, 560)
        ]

        let currentRay: Ray | null = new Ray(this.firstRay.origin.x, this.firstRay.origin.y, 
            this.firstRay.angle)

        while (i < maxReflections) {

            if (currentRay != null) {
                rays.push(currentRay)
            }
            else break;

            let nextRay: Ray | null = null

            for (let line of lines) {
                nextRay = Geometry.reflectRayOffLine(currentRay, line)
                if (nextRay != null) {
                    currentRay = nextRay
                }
            }

            i++
        }

        this.points = []

        for (let ray of rays) {
            this.points.push(new Vector2f(ray.origin.x, ray.origin.y))
        }

    }

}