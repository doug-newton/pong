import { CollidableGameObject } from "./collidable-game-object";

export class CollisionByStander {
    allowPaddle(paddle: CollidableGameObject, peer: CollidableGameObject) {
        peer.collideWithPaddle(paddle);
    }
}