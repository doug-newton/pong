export abstract class GameObject {
    public abstract draw(context: CanvasRenderingContext2D): void
    public abstract update(): void
}