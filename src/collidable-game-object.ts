import { GameObject } from "./game-object";
import { TLBB } from "./tlbb";

export abstract class CollidableGameObject extends GameObject {
    abstract getTLBB(): TLBB
    collideWithPaddle(paddle: CollidableGameObject) { }
    collideWithBall(ball: CollidableGameObject) { }
    standBy(byStander: any, peer: CollidableGameObject) { }
}