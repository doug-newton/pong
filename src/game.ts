import { Ball } from "./ball";
import { Canvas } from "./canvas";
import { GameObject } from "./game-object";
import { Paddle } from "./paddle";

export class Game {

    constructor() {
        this.gameObjects.push(new Ball())
        this.gameObjects.push(new Paddle())
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
        this.gameObjects.forEach(o => o.onMouseDown(event));
    }

    private onMouseUp(event: MouseEvent): void{
        this.gameObjects.forEach(o => o.onMouseUp(event));
    }

    private onMouseMove(event: MouseEvent): void{
        this.gameObjects.forEach(o => o.onMouseMove(event));
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