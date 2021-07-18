import { Canvas } from "./canvas";

export interface IGame {
    getCanvasObject(): Canvas 
    registerGameObject(gameObject: any): void
}