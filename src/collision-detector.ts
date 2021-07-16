import { Collidable } from "./collidable";
import { CollisionByStander } from "./collision-by-stander";
import { TLBB } from "./tlbb";

export class CollisionDetector {
    tlbbs: TLBB[] = []

    collidables: Collidable[] = []
    collisionByStander: CollisionByStander = new CollisionByStander()

    registerCollidable(collidable: Collidable) {
        this.collidables.push(collidable)
    }

    detectCollisions(): void {
        for (let i: number = 0; i < this.collidables.length; i++) {
            for (let j: number = 0; j < this.collidables.length; j++) {
                if (i == j) continue;

                let a: Collidable = this.collidables[i]
                let b: Collidable = this.collidables[j]

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