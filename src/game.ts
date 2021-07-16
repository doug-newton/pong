import { Ball } from "./ball";
import { BaseGame } from "./base-game";
import { Paddle } from "./paddle";

export class Game extends BaseGame {

    paddleTop: Paddle = new Paddle()
    paddleBottom: Paddle = new Paddle()
    ball: Ball = new Ball()

    constructor() {
        super()
        this.registerGameObject(this.ball)
        this.paddleTop.pos.y = 50;
        this.registerGameObject(this.paddleBottom)
        this.registerGameObject(this.paddleTop)

        this.collisionDetector.registerCollidable(this.paddleTop)
        this.collisionDetector.registerCollidable(this.paddleBottom)
        this.collisionDetector.registerCollidable(this.ball)
    }

}