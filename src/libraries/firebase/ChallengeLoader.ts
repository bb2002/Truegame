import {Challenge, ChallengeItem, GameLevel, Gender, PlayerItem} from "../types/Types";
import firebase from "firebase/app";

export function getChallenge(
    level: GameLevel, callback: (challenges: ChallengeItem) => void,
    players: PlayerItem[], me: PlayerItem, playCount: number, type: Challenge
) {
    firebase.database().ref(`${level}/`).on("value", snapshot => {
        const arr = snapshot.val() as any[]
        const challenges = [] as ChallengeItem[]

        // Challenges 를 읽어옵니다.
        for(let a of arr) {
            challenges.push({
                playCount: a.playcount,
                text: a.text,
                type: a.type == "true" ? Challenge.TRUE : Challenge.TRY
            })
        }

        /**
         * 조건에 맞는 질문을 필터링 합니다.
         */
        let filteredChallenges
        filteredChallenges = challenges.filter(chal => chal.type === type)              // 도전인지, 진실인지 필터
        filteredChallenges = filteredChallenges.filter(chal => chal.playCount <= playCount)     // 플레이 카운트 필터


        if(me.playerGender === Gender.WOMAN) {
            // 여성인경우, 남성 전용 질문 필터
            filteredChallenges = filteredChallenges.filter(chal => !chal.text.startsWith("$_MANONLY"))
        } else {
            // 남성인경우, 여성 전용 질문 필터
            filteredChallenges = filteredChallenges.filter(chal => !chal.text.startsWith("$_GIRLONLY"))
        }

        if(filteredChallenges.length === 0) {
            callback(throwNotFoundChallenge())
            return
        }

        /**
         * 질문 하나를 뽑습니다.
         */
        let selectedChallenge = filteredChallenges[getRandomInt(0, filteredChallenges.length)]

        /**
         * 변수를 Mapping 합니다.
         */
        selectedChallenge.text = selectedChallenge.text.replace("$_MANONLY", "")
        selectedChallenge.text = selectedChallenge.text.replace("$_GIRLONLY", "")
        selectedChallenge.text = selectedChallenge.text.replace("$player", me.playerName)

        /**
         * 타깃을 뽑습니다.
         */
        let filteredTargets = players.filter(player => player.index !== me.index)
        switch(level) {
            case GameLevel.LEVEL_HIGHTEEN:
            case GameLevel.LEVEL_COUPLE_EASY:
            case GameLevel.LEVEL_COUPLE_HOT:
                break;
            case GameLevel.LEVEL_19:
            case GameLevel.LEVEL_29:
                let tmp = filteredTargets.filter(player => player.playerGender !== me.playerGender)
                if(tmp.length !== 0) filteredTargets = tmp
                break;
        }

        if(filteredTargets.length === 0) {
            callback(throwNotFoundChallenge())
            return
        }

        let selectedTarget = filteredTargets[getRandomInt(0, filteredTargets.length)]
        selectedChallenge.text = selectedChallenge.text.replace("$target", selectedTarget.playerName)

        callback(selectedChallenge)
    })
}

function throwNotFoundChallenge() {
    return {
        playCount: 0,
        text: "어울리는 도전을 찾을 수 없습니다.",
        type: Challenge.TRY
    } as ChallengeItem
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}