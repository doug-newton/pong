import { Ball } from "./ball";
import { Canvas } from "./canvas";
import { GameObject } from "./game-object";

export class Game {

    constructor() {
        this.gameObjects.push(new Ball())
    }

    private init() {
        this.registerEventListeners()
    }

    private canvas: Canvas = new Canvas()
    private gameObjects: GameObject[] = []

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
        this.gameObjects.forEach(o => o.draw(this.canvas.context));
    }

    private update() {
        this.gameObjects.forEach(o => o.update());
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