import { Canvas } from "./canvas";
import { GameObject } from "./game-object";
import { IGame } from "./i-game";

export class BaseGame implements IGame {

    protected registerGameObject(o: GameObject){
        this.gameObjects.push(o);
        o.onRegister(this)
    }

    protected init() {
        this.registerEventListeners()
    }

    public getCanvasObject(): Canvas {
        return this.canvas
    }

    protected canvas: Canvas = new Canvas()
    protected gameObjects: GameObject[] = []

    protected registerEventListeners() {
        document.addEventListener('mousedown', (ev: MouseEvent) => this.onMouseDown(ev));
        document.addEventListener('mouseup', (ev: MouseEvent) => this.onMouseUp(ev));
        document.addEventListener('mousemove', (ev: MouseEvent) => this.onMouseMove(ev));
        document.addEventListener('keydown', (ev: KeyboardEvent) => this.onKeyDown(ev));
        document.addEventListener('keypress', (ev: KeyboardEvent) => this.onKeyPress(ev));
        document.addEventListener('keyup', (ev: KeyboardEvent) => this.onKeyUp(ev));
        document.addEventListener('contextmenu', e => {
            e.preventDefault();
            return false;
        })
    }

    protected onMouseDown(event: MouseEvent): void{
        this.gameObjects.forEach(o => o.onMouseDown(event));
    }

    protected onMouseUp(event: MouseEvent): void{
        this.gameObjects.forEach(o => o.onMouseUp(event));
    }

    protected onMouseMove(event: MouseEvent): void{
        this.gameObjects.forEach(o => o.onMouseMove(event));
    }

    protected onKeyDown(event: KeyboardEvent): void {
        this.gameObjects.forEach(o => o.onKeyDown(event));
    }

    protected onKeyPress(event: KeyboardEvent): void {
        this.gameObjects.forEach(o => o.onKeyPress(event));
    }

    protected onKeyUp(event: KeyboardEvent): void {
        this.gameObjects.forEach(o => o.onKeyUp(event));
    }

    protected draw(): void {
        this.canvas.clear()
        this.gameObjects.forEach(o => o.draw(this.canvas.context));
    }

    protected update() {
        this.gameObjects.forEach(o => o.update());
    }

    protected gameLoop() {
        this.update();
        this.draw();
        window.requestAnimationFrame(() => {
            this.gameLoop();
        })
    }

    public run(){
        this.init();
        this.gameLoop();
    }
}
