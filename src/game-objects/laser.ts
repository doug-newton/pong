import { GameObject } from "../game-object";
import { GameSettings } from "../game-settings";
import { RenderUtil } from "../render-util";
import { Style } from "../style";
import { Vector2f } from "../geometry/vector2f";
import { Tank } from "./tank";
import { Ray } from "../geometry/geometry";

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
    }

    public update(): void {
    }

}