import { Collidable } from "./collidable";

export class CollisionByStander {
    allowPaddle(paddle: Collidable, peer: Collidable) {
        peer.collideWithPaddle(paddle);
    }
}