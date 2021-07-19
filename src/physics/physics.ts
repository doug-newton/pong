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

        let result: Vector2f = new Vector2f()

        if (this.isVertical(line1)) {
            if (line1.xIntercept == null) return null
            if (line2.yIntercept == null) return null
            if (this.isHorizontal(line2)) {
                result.x = line1.xIntercept
                result.y = line2.yIntercept
            }
            else {
                result.x = line1.xIntercept
                result.y = line2.gradient * result.x + line2.yIntercept
            }
        }
        else if (this.isHorizontal(line1)) {
            if (line1.yIntercept == null) return null
            if (this.isVertical(line2)) {
                if (line2.xIntercept == null) return null
                result.x = line2.xIntercept
                result.y = line1.yIntercept
            }
            else {
                if (line2.yIntercept == null) return null
                result.x = (line1.yIntercept - line2.yIntercept) / line2.gradient
                result.y = line1.yIntercept
            }
        }
        else if (this.isVertical(line2)) {
            if (line2.xIntercept == null) return null
            if (line1.yIntercept == null) return null
            if (this.isHorizontal(line1)) {
                result.x = line2.xIntercept
                result.y = line1.yIntercept
            }
            else {
                result.x = line2.xIntercept
                result.y = line1.gradient * result.x + line1.yIntercept
            }
        }
        else if (this.isHorizontal(line2)) {
            if (line2.yIntercept == null) return null
            if (this.isVertical(line1)) {
                if (line1.xIntercept == null) return null
                result.x = line1.xIntercept
                result.y = line2.yIntercept
            }
            else {
                if (line1.yIntercept == null) return null
                result.x = (line2.yIntercept - line1.yIntercept) / line1.gradient
                result.y = line2.yIntercept
            }
        }
        else {
            if (line1.yIntercept == null) return null
            if (line2.yIntercept == null) return null
            result.x = - ((line1.yIntercept - line2.yIntercept) / (line1.gradient - line1.gradient))
            result.y = line1.gradient * result.x + line1.yIntercept
        }

        return result
    }

    private isVertical(line: Line) {
        return line.gradient == NaN
    }

    private isHorizontal(line: Line) {
        return line.gradient == 0
    }
    
}

export const Physics: Physics_Singleton = new Physics_Singleton()


