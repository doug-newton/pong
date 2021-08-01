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
        this.firstRay.origin = this.tank.position
    }

    laserStyle: Style = new Style("red", "red", 1, false, true)

    public draw(context: CanvasRenderingContext2D): void {
        if (this.points.length < 2)
            return;
    }

    public update(): void {
        this.firstRay.angle = this.tank.rotation

        let maxReflections = 3

        let rays: Ray[] = []

        let i: number = 0
        let currentRay: Ray | null = this.firstRay

        while (i < maxReflections) {

            if (currentRay != null) {
                rays.push(currentRay)
            }
            else break;

            let line: Line = new Line(Infinity, 100, null)
            currentRay = Geometry.reflectRayOffLine(currentRay, line)

            i++
        }

        this.points = []

        for (let ray of rays) {
            this.points.push(new Vector2f(ray.origin.x, ray.origin.y))
        }

    }

}