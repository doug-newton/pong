import { Vector2f } from "./vector2f"

interface GameSettingsConfig {
    canvasDimensions: Vector2f
}

class GameSettings_Singleton {
    constructor(config: GameSettingsConfig) {
        this.canvasDimensions = config.canvasDimensions
    }
    canvasDimensions: Vector2f
}

export const GameSettings: GameSettings_Singleton = new GameSettings_Singleton({
    canvasDimensions: new Vector2f(1280, 560)
})