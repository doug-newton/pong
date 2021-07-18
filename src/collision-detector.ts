import { CollidableGameObject } from "./collidable-game-object";
import { CollisionByStander } from "./collision-by-stander";
import { TLBB } from "./tlbb";

export class CollisionDetector {
    tlbbs: TLBB[] = []

    collidables: CollidableGameObject[] = []
    collisionByStander: CollisionByStander = new CollisionByStander()

    registerCollidable(collidable: CollidableGameObject) {
        this.collidables.push(collidable)
    }

    detectCollisions(): void {
        for (let i: number = 0; i < this.collidables.length; i++) {
            for (let j: number = 0; j < this.collidables.length; j++) {
                if (i == j) continue;

                let a: CollidableGameObject = this.collidables[i]
                let b: CollidableGameObject = this.collidables[j]

                if (a.collidable == false) continue;
                if (b.collidable == false) continue;

                let abox: TLBB = a.getTLBB();
                let bbox: TLBB = b.getTLBB();

                if (this.collide(abox, bbox)) {
                    a.standBy(this.collisionByStander, b);
                }
            }
        }
    }

    collide(a: TLBB, b: TLBB): boolean {

        if (a.left > b.left + b.width)
            return false;
        if (b.left > a.left + a.width)
            return false;
        if (a.top > b.top + b.height)
            return false;
        if (b.top > a.top + a.height)
            return false;

        return true;
    }
}