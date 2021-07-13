export class Style {
    constructor(strokeColor: string, fillColor: string, lineWidth: number, bFill: boolean, bStroke: boolean) {
        this.strokeColor = strokeColor
        this.fillColor = fillColor
        this.lineWidth = lineWidth
        this.bFill = bFill
        this.bStroke = bStroke
    }

    strokeColor: string = "#000"
    fillColor: string = "#000"
    lineWidth: number = 1
    bFill: boolean = true;
    bStroke: boolean = true

    apply(context: CanvasRenderingContext2D): void {
        context.strokeStyle = this.strokeColor
        context.fillStyle = this.fillColor
        context.lineWidth = this.lineWidth
    }
}