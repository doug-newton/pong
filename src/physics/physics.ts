import { Vector2f } from "../vector2f"
import { Line } from "./line"

class LineSegment {
    start: Vector2f = new Vector2f()
    end: Vector2f = new Vector2f()
}

class Ray {
    origin: Vector2f = new Vector2f()
    angle: number = 0
}

class Physics_Singleton {

    lineIntersection(line1: Line, line2: Line): Vector2f | null {

        if (line1.gradient == line2.gradient) return null;

        if (this.isVertical(line1)) {
            if (line1.xIntercept == null)
            {
                throw 'vertical line must define an x-intercept'
            }
        }
        else if (line1.yIntercept == null)
            throw 'non-vertical line must define a y-intercept'

        if (this.isVertical(line2)) {
            if (line2.xIntercept == null)
            {
                throw 'vertical line must define an x-intercept'
            }
        }
        else if (line2.yIntercept == null) 
            throw 'non-vertical line must define a y-intercept'

        if (line1.xIntercept == null) return null
        if (line2.yIntercept == null) return null
        return new Vector2f(line1.xIntercept, line2.yIntercept);
    }

    private isVertical(line: Line):boolean {
        return line.gradient == null
    }

    private isHorizontal(line: Line):boolean {
        return line.gradient == 0
    }
    
}

export const Physics: Physics_Singleton = new Physics_Singleton()


