import { Ball } from "./ball";
import { BaseGame } from "./base-game";
import { Brick } from "./brick";
import { Paddle } from "./paddle";

export class Game extends BaseGame {

    paddleTop: Paddle = new Paddle()
    paddleBottom: Paddle = new Paddle()
    ball: Ball = new Ball()
    brick: Brick = new Brick()
    bricks: Brick[] = []

    constructor() {
        super()

        this.createBricks()

        for (let brick of this.bricks){
            this.registerGameObject(brick);
        }

        this.registerGameObject(this.ball)
        this.registerGameObject(this.brick)
        this.paddleTop.pos.y = 50;
        this.registerGameObject(this.paddleBottom)
        this.registerGameObject(this.paddleTop)

        this.collisionDetector.registerCollidable(this.paddleTop)
        this.collisionDetector.registerCollidable(this.paddleBottom)
        this.collisionDetector.registerCollidable(this.ball)
        this.collisionDetector.registerCollidable(this.brick)

        for (let brick of this.bricks){
            this.collisionDetector.registerCollidable(brick)
        }

    }

    createBricks() {
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                let brick: Brick = new Brick(x, y)
                this.bricks.push(brick)
            }
        }
    }
}