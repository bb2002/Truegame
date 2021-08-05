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
    LEVEL_HIGHTEEN = "highteen",
    LEVEL_19 = "19",
    LEVEL_29 = "29",
    LEVEL_COUPLE_EASY = "copeasy",
    LEVEL_COUPLE_HOT = "cophard",
    LEVEL_SKINSHIP = "skinship"
}

export enum Challenge {
    TRUE = 0,       // 진실
    TRY         // 도전
}

export type ChallengeItem = {
    playCount: number,          // 판 수가 이거 이상 높아야 합니다.
    text: string,               // 질문입니다.
    type: Challenge             // 도전 형태입니다.
}