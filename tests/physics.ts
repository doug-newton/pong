import { expect } from 'chai';
import { E2BIG } from 'constants';
import { Line } from '../src/physics/line';
import { Physics } from '../src/physics/physics';
import { Vector2f } from '../src/vector2f';

describe('physics', ()=>{

    /*
    it('can detect ray / line segment intersection', ()=>{
        expect(0).to.equal(1)
    })

    it('can reflect a ray off a vertical line', ()=>{
        expect(0).to.equal(1)
    })

    it('can reflect a ray off a horizontal line', ()=>{
        expect(0).to.equal(1)
    })
    */

    it('tan90 is infitnity', () => {
        console.log(Math.PI)
        let a: number = Math.tan(Math.PI / 2)
        expect(a).to.equal(Infinity)
    })

    it('parallel lines don\'t intersect', () => {
        let line1: Line = new Line()
        line1.gradient = 2
        line1.xIntercept = 2

        let line2: Line = new Line()
        line2.gradient = 2
        line2.yIntercept = 3

        let intersection: Vector2f | null = Physics.lineIntersection(line1, line2)
        expect(intersection).to.equal(null)
    });

    it('vertical and horizontal lines intersect', () => {
        let line1: Line = new Line()
        line1.gradient = null
        line1.xIntercept = 2

        let line2: Line = new Line()
        line2.gradient = 0
        line2.yIntercept = 3

        let intersection: Vector2f | null = Physics.lineIntersection(line1, line2)
        expect(intersection).to.deep.equal(new Vector2f(2, 3))

        intersection = Physics.lineIntersection(line2, line1)
        expect(intersection).to.deep.equal(new Vector2f(2, 3))
    });

    it('non-parallel lines intersect correctly', () => {
        let line1: Line = new Line()
        line1.gradient = 1
        line1.yIntercept = 3

        let line2: Line = new Line()
        line2.gradient = 2
        line2.yIntercept = 1

        let intersection: Vector2f | null = Physics.lineIntersection(line1, line2)
        expect(intersection).to.deep.equal(new Vector2f(2, 5))
    })

})