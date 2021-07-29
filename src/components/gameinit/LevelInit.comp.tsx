import React from 'react';
import {ScrollView, StyleSheet} from "react-native";
import LevelCont from "../common/LevelCont";
import {GameLevel} from "../../libraries/types/Types";
import useGameInit from "../../hooks/useGameInit";
import {StackNavigationProp} from "@react-navigation/stack";
import {GameInitParam} from "../../libraries/types/PageTypes";

interface LevelInitCompProps {
    navigation: StackNavigationProp<GameInitParam>
}

const LevelInitComp = ({ navigation }: LevelInitCompProps) => {
    const { setLevel } = useGameInit()

    const onLevelSelected = (value: GameLevel) => {
        setLevel(value)

        switch(value) {
            case GameLevel.LEVEL_HIGHTEEN:
            case GameLevel.LEVEL_19:
            case GameLevel.LEVEL_COUPLE_EASY:
            case GameLevel.LEVEL_COUPLE_HOT:
                navigation.navigate("TrueGamePlay")
                break
            case GameLevel.LEVEL_SKINSHIP:
                navigation.navigate("SkinShipGamePlay")
        }
    }

    return (
        <ScrollView style={Styles.container}>
            <LevelCont
                title="하이틴 난이도"
                numOfPerson="상관 없음"
                target="가볍고 장난스럽게 즐기고 싶은 남녀"
                icon={require("../../../assets/icons/level_highteen_icon.png")}
                place="상관 없음"
                onClick={onLevelSelected}
                value={GameLevel.LEVEL_HIGHTEEN}
                backgroundColor="#FCC195"/>

            <LevelCont
                title="19금 난이도"
                numOfPerson="2 ~ 6명"
                target="오늘은 자극적이게 놀고 싶은 남녀"
                icon={require("../../../assets/icons/level_19_icon.png")}
                place="조금 개인적인 공간"
                onClick={onLevelSelected}
                value={GameLevel.LEVEL_19}
                backgroundColor="#FCA2A2"/>

            <LevelCont
                title="커플게임 순한맛"
                numOfPerson="2명"
                target="뜨겁게 놀고 싶은 젊은 남녀"
                icon={require("../../../assets/icons/level_copeasy_icon.png")}
                place="조금 개인적인 공간"
                onClick={onLevelSelected}
                value={GameLevel.LEVEL_COUPLE_EASY}
                backgroundColor="#CBF3B4"/>

            <LevelCont
                title="커플게임 매운맛"
                numOfPerson="2명"
                target="뜨겁게 놀고 싶은 젊은 남녀"
                icon={require("../../../assets/icons/level_cophot_icon.png")}
                place="개인적인 공간"
                onClick={onLevelSelected}
                value={GameLevel.LEVEL_COUPLE_HOT}
                backgroundColor="#F5A4C4"/>

            <LevelCont
                title="스킨쉽 모드"
                numOfPerson="2 ~ 4명"
                target="뜨겁게 놀고 싶은 젊은 남녀"
                icon={require("../../../assets/icons/level_skinship_icon.png")}
                place="개인적인 공간"
                onClick={onLevelSelected}
                value={GameLevel.LEVEL_SKINSHIP}
                backgroundColor="#CFA0FC"/>

        </ScrollView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default LevelInitComp;