import { GameObject } from "../game-object";
import { RenderUtil } from "../render-util";
import { Style } from "../style";
import { Vector2f } from "../vector2f";
import { Tank } from "./tank";

export class Laser extends GameObject {

    tank: Tank

    constructor(tank: Tank) {
        super();
        this.tank = tank
    }

    laserStyle: Style = new Style("red", "red", 1, false, true)

    public draw(context: CanvasRenderingContext2D): void {
        let laserEnd: Vector2f = new Vector2f(
            this.tank.position.x - Math.cos(this.tank.rotation + Math.PI / 2) * 2000,
            this.tank.position.y - Math.sin(this.tank.rotation + Math.PI / 2) * 2000
        )
        RenderUtil.drawLine(context,
            this.tank.position.x - Math.cos(this.tank.rotation + Math.PI / 2) * 75,
            this.tank.position.y - Math.sin(this.tank.rotation + Math.PI / 2) * 75,
            laserEnd.x,
            laserEnd.y,
            this.laserStyle)
    }

    public update(): void {
    }

}