class Geometry_Singleton {

    private notInfinity: number = 16331239353195370

    public getGradientFromAngle(theta: number): number {
        let result: number = Math.tan(theta)
        if (result == this.notInfinity)
            result = Infinity
        return result
    }

}

export const Geometry: Geometry_Singleton = new Geometry_Singleton();