import {ActionType, createAction, createReducer} from "typesafe-actions";
import {GameLevel, PlayerItem} from "../libraries/types/Types";
import produce from "immer";

export const GAMEINIT_PAGE = "gameinit.page"
export const PLAYER_SETUP = "gameinit.player"
export const LEVEL_SETUP = "gameinit.level"
export const GAMEINIT_RESET = "gameinit.reset"

export const gameInitPage = createAction(GAMEINIT_PAGE)<number>()
export const playerSetup = createAction(PLAYER_SETUP)<PlayerItem[]>()
export const levelSetup = createAction(LEVEL_SETUP)<GameLevel>()
export const gameInitReset = createAction(GAMEINIT_RESET)()

const actions = {
    gameInitPage,
    playerSetup,
    levelSetup,
    gameInitReset
}

export type GameInitAction = ActionType<typeof actions>
export type GameInitState = {
    page: number,
    players: PlayerItem[],
    level: GameLevel
}

const initalState: GameInitState = {
    page: 0,
    players: [],
    level: GameLevel.LEVEL_HIGHTEEN
}

const gameInit = createReducer<GameInitState, GameInitAction>(initalState, {
    [GAMEINIT_PAGE]: (state, action) => produce(state, draft => {
        draft.page = action.payload
    }),
    [PLAYER_SETUP]: (state, action) => produce(state, draft => {
        draft.players = action.payload
    }),
    [LEVEL_SETUP]: (state, action) => produce(state, draft => {
        draft.level = action.payload
    })
})

export default gameInit