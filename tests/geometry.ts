import { expect } from 'chai';
import { Geometry, Line, LineSegment, Ray } from '../src/geometry/geometry';
import { Vector2f } from '../src/geometry/vector2f';

describe('geometry', () => {
    let delta: number = 0.00001

    it('can calculate gradient from an angle', () => {
        let theta: number 
        let m: number 

        theta = 0
        m = Geometry.getGradientFromAngle(theta)
        expect(m).to.equal(0)

        theta = Math.PI / 2
        m = Geometry.getGradientFromAngle(theta)
        expect(m).to.equal(Infinity)

        theta = Math.PI / 4
        m = Geometry.getGradientFromAngle(theta)
        expect(m).to.be.approximately(1, delta)
    })

    it('can calculate angles from a gradient', ()=>{
        let m: number = 1
        let angles: Vector2f = Geometry.getAnglesFromGradient(m)
        expect(angles).to.deep.equal(new Vector2f(Math.PI / 4, 5 * Math.PI / 4))
    })

    it('doesn\'t intersect parallel lines', () => {
        let a: Line = new Line(2, null, 3)
        let b: Line = new Line(2, null, 4)

        let n: Vector2f | null = Geometry.getLineIntersection(a, b)
        expect(n).to.deep.equal(null)

        n = Geometry.getLineIntersection(b, a)
        expect(n).to.deep.equal(null)
    })

    it('intersects vertical lines with non-vertical lines', () => {
        let a: Line = new Line(Infinity, 3, null)
        let b: Line = new Line(2, null, 4)

        let n: Vector2f | null = Geometry.getLineIntersection(a, b)
        expect(n).to.deep.equal(new Vector2f(3, 10))
        n = Geometry.getLineIntersection(b, a)
        expect(n).to.deep.equal(new Vector2f(3, 10))
    })

    it('intersects non-parallel, non-vertical lines', () => {
        let a: Line = new Line(1, null, 3)
        let b: Line = new Line(2, null, 1)

        let n: Vector2f | null = Geometry.getLineIntersection(a, b)
        expect(n).to.deep.equal(new Vector2f(2, 5))
        n = Geometry.getLineIntersection(b, a)
        expect(n).to.deep.equal(new Vector2f(2, 5))
    })

    it('creates lines from rays', () => {
        let ray: Ray = new Ray(2, 6, 0.463647609)
        let line: Line = Geometry.lineFromRay(ray);
        let expected: Line = new Line(1 / 2, null, 5)

        expect(line.m).to.be.approximately(expected.m, delta)
        expect(line.xint).to.be.equal(expected.xint)
        expect(line.yint).to.be.approximately(expected.yint!, delta)
    })

    it('creates non-vertical, non-horizontal lines from non-vertical, non-horizontal line segments', () => {
        let lineSegment: LineSegment = new LineSegment(0, 0, 5, 10)
        let line: Line | null = Geometry.lineFromLineSegment(lineSegment)
        expect(line).to.deep.equal(new Line(2, null, 0))
    })

    it('creates vertical lines from vertical line segments', () => {
        let lineSegment: LineSegment = new LineSegment(0, 0, 0, 5)
        let line: Line | null = Geometry.lineFromLineSegment(lineSegment)
        expect(line).to.deep.equal(new Line(Infinity, 0, null))
    })

    it('creates horizontal lines from horizontal line segments', () => {
        let lineSegment: LineSegment = new LineSegment(0, 5, 10, 5)
        let line: Line | null = Geometry.lineFromLineSegment(lineSegment)
        expect(line).to.deep.equal(new Line(0, null, 5))
    })

    it('doesn\'t create lines from zero-length line segments', () => {
        let lineSegment: LineSegment = new LineSegment(1, 0, 1, 0)
        let line: Line | null = Geometry.lineFromLineSegment(lineSegment)
        expect(line).to.equal(null)
    })

    it('can calculate normals from a line #1', ()=> {
        let lineSegment: LineSegment = new LineSegment(0, 5, 10, 5)
        let line: Line | null = Geometry.lineFromLineSegment(lineSegment)
        let normals: Vector2f = Geometry.getNormals(line!)
        expect(normals).to.deep.equal(new Vector2f(Math.PI / 2, 3 * Math.PI / 2))
    })

    it('can detect ray and line intersection #1', ()=>{
        let ray: Ray = new Ray(50, 50, Math.PI / 4)
        let line: Line = new Line(Infinity, 100, null)
        let p: Vector2f | null = Geometry.getRayLineIntersection(ray, line);
        expect(p).not.to.equal(null)
        expect(p).to.deep.equal(new Vector2f(100, 100))
    })

    it('can detect ray and line intersection #2', ()=>{
        let ray: Ray = new Ray(50, 50, Math.PI / 4)
        let line: Line = new Line(Infinity, 0, null)
        let p: Vector2f | null = Geometry.getRayLineIntersection(ray, line);
        expect(p).to.equal(null)
    })

    it('can detect ray and line segment intersection', () => {
        let ray: Ray = new Ray(50, 50, Math.PI / 4)
        let lineSegment: LineSegment = new LineSegment(100, 0, 100, 200)
        let p: Vector2f | null = Geometry.getRayLineSegmentIntersection(ray, lineSegment);
        expect(p).to.deep.equal(new Vector2f(100, 100))
    })

    it('can reflect a ray off a line', ()=>{
        let ray: Ray = new Ray(50, 50, Math.PI / 4)
        let line: Line = new Line(Infinity, 100, null)

        let r: Ray | null = Geometry.reflectRayOffLine(ray, line)
        expect(r).to.deep.equal(new Ray(100, 100, 3 * Math.PI / 4))
    })

    it('can reflect a ray off a line segment #1', ()=>{
        let ray: Ray = new Ray(50, 50, Math.PI / 4)
        let lineSegment: LineSegment = new LineSegment(100, 0, 100, 200)

        let r: Ray | null = Geometry.reflectRayOffLineSegment(ray, lineSegment)
        expect(r).to.deep.equal(new Ray(100, 100, 3 * Math.PI / 4))
    })

})