export enum Gender {
    MEN,
    WOMAN
}

export interface PlayerItem {
    index: number
    playerName: string
    playerGender: Gender
}

export enum GameLevel {
    LEVEL_HIGHTEEN,
    LEVEL_19,
    LEVEL_COUPLE_EASY,
    LEVEL_COUPLE_HOT,
    LEVEL_SKINSHIP
}

export enum Challenge {
    TRUE = 0,       // 진실
    TRY         // 도전
}