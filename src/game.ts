import { BaseGame } from "./base-game";
import { Tank } from "./game-objects/tank";

export class Game extends BaseGame {

    tank: Tank = new Tank()

    constructor() {
        super()
        this.registerGameObject(this.tank)
    }

}