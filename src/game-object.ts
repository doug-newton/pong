import { IGame } from "./i-game";

export abstract class GameObject {
    public abstract draw(context: CanvasRenderingContext2D): void
    public abstract update(): void
    public onMouseDown(event: MouseEvent): void { }
    public onMouseUp(event: MouseEvent): void { }
    public onMouseMove(event: MouseEvent): void { }
    public onKeyDown(event: KeyboardEvent): void { }
    public onKeyPress(event: KeyboardEvent): void { }
    public onKeyUp(event: KeyboardEvent): void { }

    onRegister(game: IGame): void {
        this.parent = game;
    }

    parent?: IGame

    getParent(): IGame {
        return this.parent!
    }
}
