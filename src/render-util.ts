
import { Style } from './style';

const defaultStyle: Style = new Style("#000", "#000", 1, false, true)

class RenderUtil_Singleton {

    drawLine(context: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, style: Style = defaultStyle) {
        context.beginPath();
        this.applyStyle(context, style);
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.stroke();
    }

    drawCircle(context: CanvasRenderingContext2D, x0: number, y0: number, r: number, style: Style = defaultStyle) {
        context.beginPath();
        this.applyStyle(context, style);
        context.arc(x0, y0, r, 0, 2 * Math.PI, false)
        if (style.bStroke)
            context.stroke()
        if (style.bFill)
            context.fill()
    }

    drawRect(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, style: Style = defaultStyle) {
        this.applyStyle(context, style);
        if (style.bFill)
            context.fillRect(x, y, w, h);
        if (style.bStroke) 
            context.strokeRect(x, y, w, h);
    }

    applyStyle(context: CanvasRenderingContext2D, style: Style) {
        style.apply(context)
    }
}

export const RenderUtil: RenderUtil_Singleton = new RenderUtil_Singleton()