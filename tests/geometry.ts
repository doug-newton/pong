import { expect } from 'chai';
import { Geometry, Line, Ray } from '../src/geometry/geometry';
import { Vector2f } from '../src/vector2f';

describe('geometry', () => {
    let delta: number = 0.00001

    it('gradient can be calculated from angle', () => {
        let theta: number 
        let m: number 

        theta = 0
        m = Geometry.getGradientFromAngle(theta)
        expect(m).to.equal(0)

        theta = Math.PI / 2
        m = Geometry.getGradientFromAngle(theta)
        expect(m).to.equal(Infinity)

        theta = Math.PI
        m = Geometry.getGradientFromAngle(theta)
        expect(m).to.be.approximately(0, delta)

        theta = Math.PI * 2
        m = Geometry.getGradientFromAngle(theta)
        expect(m).to.be.approximately(0, delta)

        theta = Math.PI / 4
        m = Geometry.getGradientFromAngle(theta)
        expect(m).to.be.approximately(1, delta)

        theta = 0.463647609
        m = Geometry.getGradientFromAngle(theta)
        expect(m).to.be.approximately(1/2, delta)
    })

    it('parallel lines dont intersect', () => {
        let a: Line = new Line(2, null, 3)
        let b: Line = new Line(2, null, 4)

        let n: Vector2f | null = Geometry.getLineIntersection(a, b)
        expect(n).to.deep.equal(null)

        n = Geometry.getLineIntersection(b, a)
        expect(n).to.deep.equal(null)
    })

    it('vertical lines intersect with non-vertical lines', () => {
        let a: Line = new Line(Infinity, 3, null)
        let b: Line = new Line(2, null, 4)

        let n: Vector2f | null = Geometry.getLineIntersection(a, b)
        expect(n).to.deep.equal(new Vector2f(3, 10))
        n = Geometry.getLineIntersection(b, a)
        expect(n).to.deep.equal(new Vector2f(3, 10))
    })

    it('non-parallel, non-vertical lines intersect', () => {
        let a: Line = new Line(1, null, 3)
        let b: Line = new Line(2, null, 1)

        let n: Vector2f | null = Geometry.getLineIntersection(a, b)
        expect(n).to.deep.equal(new Vector2f(2, 5))
        n = Geometry.getLineIntersection(b, a)
        expect(n).to.deep.equal(new Vector2f(2, 5))
    })

    it('can create line from ray', () => {
        let ray: Ray = new Ray(2, 6, 0.463647609)
        let line: Line = Geometry.lineFromRay(ray);
        let expected: Line = new Line(1 / 2, null, 5)

        expect(line.m).to.be.approximately(expected.m, delta)
        expect(line.xint).to.be.equal(expected.xint)
        expect(line.yint).to.be.approximately(expected.yint!, delta)
    })

})