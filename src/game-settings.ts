interface GameSettingsConfig {
    width: number 
    height: number 
}

class GameSettings_Singleton {
    constructor(config: GameSettingsConfig){
        this.width = config.width
        this.height = config.height
    }
    width: number
    height: number
}

export const GameSettings: GameSettings_Singleton = new GameSettings_Singleton({
    width: 1280,
    height: 560
})