import { expect } from 'chai';
import { Geometry, Line } from '../src/geometry/geometry';
import { Vector2f } from '../src/vector2f';

describe('geometry', () => {
    let error: number = 0.09

    it('gradient can be calculated from angle', () => {
        let theta: number = Math.PI / 6
        let m: number = Geometry.getGradientFromAngle(theta)
        expect(Math.abs(m - 1 / 2)).to.be.lessThan(error)

        theta = 0
        m = Geometry.getGradientFromAngle(theta)
        expect(m).to.equal(0)

        theta = Math.PI / 2
        m = Geometry.getGradientFromAngle(theta)
        expect(m).to.equal(Infinity)

        theta = Math.PI
        m = Geometry.getGradientFromAngle(theta)
        expect(Math.abs(m - 0)).to.be.lessThan(error)

        theta = Math.PI * 2
        m = Geometry.getGradientFromAngle(theta)
        expect(Math.abs(m - 0)).to.be.lessThan(error)

        theta = Math.PI / 4
        m = Geometry.getGradientFromAngle(theta)
        expect(m * m - 2).to.be.lessThan(error)
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

})