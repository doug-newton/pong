export class Vector2f {
    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }
    x: number = 0
    y: number = 0
    get w(): number {
        return this.x
    }
    set w(w: number) {
        this.x = w
    }
    get h(): number {
        return this.y
    }
    set h(h: number) {
        this.y = h
    }
    set(v: Vector2f) {
        console.log('set called')
        this.x = v.x
        this.y = v.y
    }
}
