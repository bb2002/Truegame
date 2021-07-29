import {combineReducers} from "redux";
import gameInit from "./GameInit.redux";

const rootReducer = combineReducers({
    gameInit
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>