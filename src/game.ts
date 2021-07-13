import { Ball } from "./ball";
import { BaseGame } from "./base-game";
import { Paddle } from "./paddle";

export class Game extends BaseGame {

    paddleTop: Paddle = new Paddle()
    paddleBottom: Paddle = new Paddle()

    constructor() {
        super()
        this.registerGameObject(new Ball())
        this.paddleTop.pos.y = 50;
        this.registerGameObject(this.paddleBottom)
        this.registerGameObject(this.paddleTop)
    }

}