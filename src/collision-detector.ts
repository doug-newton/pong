/*    top-left-aligned bounding box    */

interface TLBB {
    top: number
    left: number
    width: number
    height: number
}

export class CollisionDetector {
    tlbbs: TLBB[] = []

    detectCollision(): void {
        for (let i: number = 0; i < this.tlbbs.length; i++) {
            for (let j: number = 0; j < this.tlbbs.length; j++) {
                if (i == j) continue;

                let a: TLBB = this.tlbbs[i]
                let b: TLBB = this.tlbbs[j]

                if (this.collide(a, b)) {

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