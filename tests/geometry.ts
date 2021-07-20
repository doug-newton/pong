import { expect } from 'chai';
import { Geometry } from '../src/geometry/geometry';

describe('geometry', () => {
    let error: number = 0.09

    it('can calculate the gradient from an angle', () => {
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

})