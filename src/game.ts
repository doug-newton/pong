import { Ball } from "./ball";
import { BaseGame } from "./base-game";
import { Paddle } from "./paddle";

export class Game extends BaseGame {

    constructor() {
        super()
        this.registerGameObject(new Ball())
        this.registerGameObject(new Paddle())
    }

}