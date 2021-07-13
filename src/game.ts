import { Canvas } from "./canvas";

export class Game {

    constructor() {
    }

    private init() {
        this.registerEventListeners()
    }

    private canvas: Canvas = new Canvas()

    private registerEventListeners() {
        document.addEventListener('mousedown', (ev: MouseEvent) => this.onMouseDown(ev));
        document.addEventListener('mouseup', (ev: MouseEvent) => this.onMouseUp(ev));
        document.addEventListener('mousemove', (ev: MouseEvent) => this.onMouseMove(ev));
        document.addEventListener('contextmenu', e => {
            e.preventDefault();
            return false;
        })
    }

    private onMouseDown(event: MouseEvent): void{
    }

    private onMouseUp(event: MouseEvent): void{
    }

    private onMouseMove(event: MouseEvent): void{
    }

    private draw(): void {
        this.canvas.clear()
    }

    private update() {
    }

    private gameLoop() {
        this.update();
        this.draw();
        window.requestAnimationFrame(() => {
            this.gameLoop();
        })
    }

    run(){
        this.init();
        this.gameLoop();
    }

}