import { CollidableGameObject } from "./collidable-game-object";

export class CollisionByStander {
    allowPaddle(paddle: CollidableGameObject, peer: CollidableGameObject) {
        peer.collideWithPaddle(paddle);
    }
    allowBall(ball: CollidableGameObject, peer: CollidableGameObject) {
        peer.collideWithBall(ball);
    }
    allowBrick(brick: CollidableGameObject, peer: CollidableGameObject){
        peer.collideWithBrick(brick);
    }
}