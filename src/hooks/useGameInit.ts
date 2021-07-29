import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux";
import {gameInitPage, levelSetup, playerSetup} from "../redux/GameInit.redux";
import {GameLevel, PlayerItem} from "../libraries/types/Types";

export default function useGameInit() {
    const gameInit = useSelector((state: RootState) => state.gameInit)
    const dispatch = useDispatch()

    const setGamePage = (page: number) => {
        dispatch(gameInitPage(page))
    }

    const setPlayers = (players: PlayerItem[]) => {
        dispatch(playerSetup(players))
    }

    const setLevel = (level: GameLevel) => {
        dispatch(levelSetup(level))
    }

    return {
        gameInit,
        setGamePage,
        setPlayers,
        setLevel
    }
}