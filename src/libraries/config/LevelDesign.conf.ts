import {GameLevel} from "../types/Types";

export type TrueGamePlayDesignPlatform = {
    backgroundColorOuter: string,               // 외부 배경색
    backgroundColorInner: string,               // 내부 배경색
    rouletteColor: string,                      // 룰렛의 Border 색
    rouletteButtonIcon: any,                    // 클릭 버튼의 아이콘
    rouletteTextBackgroundColor: string         // 클릭 버튼의 배경
}

export function getTrueGamePlayDesign(level: GameLevel)  {
    const config = {} as TrueGamePlayDesignPlatform

    switch(level) {
        case GameLevel.LEVEL_HIGHTEEN:
            config.backgroundColorInner = "#D2FFE6"
            config.backgroundColorOuter = "#10A9F2"
            config.rouletteButtonIcon = require("../../../assets/icons/level_highteen_icon.png")
            config.rouletteTextBackgroundColor = "#10A9F2"
            config.rouletteColor = "#7EB246"
            break;
        case GameLevel.LEVEL_19:
            config.backgroundColorInner = "#FDCDC0"
            config.backgroundColorOuter = "#FD701E"
            config.rouletteButtonIcon = require("../../../assets/icons/level_19_icon.png")
            config.rouletteTextBackgroundColor = "#FEA125"
            config.rouletteColor = "#FFCE48"
            break;
        case GameLevel.LEVEL_COUPLE_EASY:
            config.backgroundColorInner = "#FDCDC0"
            config.backgroundColorOuter = "#FD701E"
            config.rouletteButtonIcon = require("../../../assets/icons/level_copeasy_icon.png")
            config.rouletteTextBackgroundColor = "#FEA125"
            config.rouletteColor = "#FFCE48"
            break;
        case GameLevel.LEVEL_COUPLE_HOT:
            config.backgroundColorInner = "#BB6BC7"
            config.backgroundColorOuter = "#FC512C"
            config.rouletteButtonIcon = require("../../../assets/icons/level_cophot_icon.png")
            config.rouletteTextBackgroundColor = "#DA4721"
            config.rouletteColor = "#DA4721"
            break;
        case GameLevel.LEVEL_29:
            config.backgroundColorInner = "#ED7D31"
            config.backgroundColorOuter = "#990100"
            config.rouletteButtonIcon = require("../../../assets/icons/level_29_icon.png")
            config.rouletteTextBackgroundColor = "#DA4721"
            config.rouletteColor = "#DA4721"
            break
    }

    return config
}