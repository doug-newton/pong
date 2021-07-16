import { GameObject } from "./game-object";
import { TLBB } from "./tlbb";

export abstract class Collidable extends GameObject {
    abstract getTLBB(): TLBB
    collideWithPaddle(paddle: Collidable) { }
    standBy(byStander: any, peer: Collidable) { }
}