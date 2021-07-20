import { Vector2f } from "../vector2f"

let ex1: string = 'vertical lines must define an x-intercept'
let ex2: string = 'non-vertical lines must define a y-intercept'
let ex3: string = 'vertical lines cannot have a y-intercept'
let ex4: string = 'horizontal lines cannot have an x-intercept'
let ex5: string = 'line and line segment intersection is only implemented for vertical or horizontal line segments'

export class Line {

    yint: number | null = 0
    xint: number | null = 0
    m: number = 0

    constructor(m: number, xint: number | null, yint: number | null) {
        if (m == Infinity) {
            if (xint == null) throw ex1
            if (yint != null) throw ex3
        }
        else if (m == 0 && xint != null) throw ex4
        else if (yint == null) throw ex2

        this.m = m
        this.xint = xint
        this.yint = yint
    }
}

export class LineSegment {
    p0: Vector2f
    p1: Vector2f
    constructor(x0: number, y0: number, x1: number, y1: number) {
        this.p0 = new Vector2f(x0, y0)
        this.p1 = new Vector2f(x1, y1)
    }
}

export class Ray {
    origin: Vector2f
    angle: number
    constructor(x: number, y: number, angle: number) {
        this.origin = new Vector2f(x, y)
        this.angle = angle
    }
}

class Geometry_Singleton {

    private notInfinity: number = 16331239353195370

    public getGradientFromAngle(theta: number): number {
        let result: number = Math.tan(theta)
        if (result == this.notInfinity)
            result = Infinity
        return result
    }

    public getLineIntersection(line1: Line, line2: Line): Vector2f | null {

        if (line1.m == line2.m) return null

        let x: number
        let y: number

        if (this.isVertical(line1)) {
            x = line1.xint!
            y = line2.m * x + line2.yint!
            return new Vector2f(x, y)
        }
        else if (this.isVertical(line2)) {
            x = line2.xint!
            y = line1.m * x + line1.yint!
            return new Vector2f(x, y)
        }
        else {
            x = -(line1.yint! - line2.yint!) / (line1.m - line2.m)
            y = line1.m * x + line1.yint!
            return new Vector2f(x, y)
        }
    }

    public lineFromRay(ray: Ray): Line {
        let m: number = this.getGradientFromAngle(ray.angle)
        let xint: number | null
        let yint: number | null

        if (m == Infinity) {
            xint = ray.origin.x
            yint = null
            return new Line(m, xint, yint)
        }
        else if (m == 0) {
            xint = null
            yint = ray.origin.y
            return new Line(m, xint, yint)
        }
        else {
            xint = null
            yint = ray.origin.y - m * ray.origin.x
            return new Line(m, xint, yint)
        }
    }

    public lineFromLineSegment(lineSegment: LineSegment): Line | null {
        let dy: number = lineSegment.p1.y - lineSegment.p0.y
        let dx: number = lineSegment.p1.x - lineSegment.p0.x
        let m: number
        let xint: number | null
        let yint: number | null

        if (dy == 0 && dx == 0) return null

        if (dx == 0) {
            m = Infinity
            xint = lineSegment.p0.x
            yint = null
            return new Line(m, xint, yint)
        }
        else if (dy == 0) {
            m = 0
            xint = null
            yint = lineSegment.p0.y
            return new Line(m, xint, yint)
        }
        else {
            m = dy / dx
            xint = null
            yint = lineSegment.p0.y - m * lineSegment.p0.x
            return new Line(m, xint, yint)
        }
    }

    public lineAndLineSegmentIntersection(line: Line, lineSegment: LineSegment): Vector2f | null {
        let line2: Line | null = this.lineFromLineSegment(lineSegment)
        if (line2 == null) return null

        if (!this.isHorizontal(line2) && !this.isVertical(line2)) throw ex5

        let n: Vector2f | null = this.getLineIntersection(line, line2)

        if (n == null) return null

        if (this.isHorizontal(line2)) {
            let lesserEdge = lineSegment.p0.x < lineSegment.p1.x ? lineSegment.p0.x : lineSegment.p1.x
            let greaterEdge = lineSegment.p0.x > lineSegment.p1.x ? lineSegment.p0.x : lineSegment.p1.x
            if (lesserEdge <= n.x && n.x <= greaterEdge) return n
            else return null
        }
        else if (this.isVertical(line2)) {
            let lesserEdge = lineSegment.p0.y < lineSegment.p1.y ? lineSegment.p0.y : lineSegment.p1.y
            let greaterEdge = lineSegment.p0.y > lineSegment.p1.y ? lineSegment.p0.y : lineSegment.p1.y
            if (lesserEdge <= n.y && n.y <= greaterEdge) return n
            else return null
        }

        return null
    }

    private isVertical(line: Line): boolean {
        return line.m == Infinity
    }

    private isHorizontal(line: Line): boolean {
        return line.m == 0
    }

}

export const Geometry: Geometry_Singleton = new Geometry_Singleton()