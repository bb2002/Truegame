import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import WheelRoulette from "../common/WheelRoulette";
import useGameInit from "../../hooks/useGameInit";
import Container from "../common/Container";
import {Button} from "react-native-elements";
import {Challenge, ChallengeItem, PlayerItem} from "../../libraries/types/Types";
import {getTrueGamePlayDesign, TrueGamePlayDesignPlatform} from "../../libraries/config/LevelDesign.conf";
import {getChallenge} from "../../libraries/firebase/ChallengeLoader";
import {AntDesign, Ionicons} from '@expo/vector-icons';
import TimerComp from "../common/Timer.comp";
import {StackNavigationProp} from "@react-navigation/stack";
import {GameInitParam} from "../../libraries/types/PageTypes";

interface TrueGamePlayCompProps {
    navigation: StackNavigationProp<GameInitParam>
}

const TrueGamePlayComp = ({ navigation }: TrueGamePlayCompProps) => {
    const { gameInit } = useGameInit()
    const [rolling, setRolling] = useState(false)
    const [step, setStep] = useState(0)
    const [player, setPlayer] = useState<PlayerItem>(gameInit.players[0])
    const [design, setDesign] = useState<TrueGamePlayDesignPlatform>(getTrueGamePlayDesign(gameInit.level))
    const [playCount, setPlayCount] = useState(1)
    const [selChallenge, setSelChallenge] = useState<ChallengeItem | undefined>(undefined)

    useEffect(() => {
        const cfg = getTrueGamePlayDesign(gameInit.level)
        setDesign(cfg)
    }, [gameInit.level])

    const onPlayerSelected = (player: PlayerItem) => {
        setPlayer(player)       // 플레이어 선택
        setStep(1)        // 진실/도전 버튼 보이기
    }

    const onChallengeSelected = (challenge: Challenge) => {
        setStep(2)
        setPlayCount(playCount + 1)

        getChallenge(gameInit.level, (challenge) => {
            setSelChallenge(challenge)
        }, gameInit.players, player, playCount, challenge)
    }

    return (
        <Container style={{ backgroundColor: design.backgroundColorOuter }}>
            <View style={{...Styles.containerInner, backgroundColor: design.backgroundColorInner}}>
                <Ionicons name="arrow-back-outline" size={36}
                          color="white" onPress={() => navigation.goBack()} />

                <WheelRoulette
                    players={gameInit.players}
                    rolling={rolling}
                    freeRotateNum={15}
                    duration={2500}
                    containerStyle={{
                        borderRadius: 16,
                        borderWidth: 4,
                        borderColor: design.rouletteColor,
                        marginHorizontal: 16,
                        marginTop: 72,
                        marginBottom: 32
                    }}
                    onPlayerSelected={onPlayerSelected} />

                {
                    step === 1 && (
                        <View style={{ flexDirection: "row" }}>
                            <Button
                                title="진실"
                                containerStyle={Styles.gameButton}
                                titleStyle={{ fontSize: 24 }}
                                onPress={() => onChallengeSelected(Challenge.TRUE)}
                                buttonStyle={{ paddingTop: 16, paddingBottom: 16 }} />
                            <Button
                                title="도전"
                                containerStyle={Styles.gameButton}
                                titleStyle={{ fontSize: 24 }}
                                onPress={() => onChallengeSelected(Challenge.TRY)}
                                buttonStyle={{ paddingTop: 16, paddingBottom: 16, backgroundColor: "#e74c3c" }} />
                        </View>
                    )
                }

                {
                    step === 0 && (
                        <TouchableOpacity
                            style={Styles.rollButtonTO}
                            onPress={() => setRolling(!rolling)}
                            disabled={rolling}>
                            <ImageBackground
                                source={design.rouletteButtonIcon}
                                style={Styles.rollButtonImg}
                                resizeMode="cover">
                                <Text style={{...Styles.rollButtonText, backgroundColor: design.rouletteTextBackgroundColor}}>클릭</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                    )
                }

                {
                    step === 2 && (
                        <View style={{ flex: 1 }}>
                            {
                                selChallenge?.timer !== undefined && (
                                    <TimerComp time={selChallenge.timer} color='black' />
                                )
                            }


                            <TouchableOpacity
                                onPress={() => {
                                    setRolling(false)
                                    setStep(0)
                                }}
                                style={Styles.challengeTextView}>
                                {
                                    selChallenge === undefined ? (
                                        <AntDesign name="loading1" size={24} color="black" />
                                    ) : (
                                        <Text style={Styles.challengeText}>{selChallenge.text}</Text>
                                    )
                                }

                            </TouchableOpacity>
                        </View>

                    )
                }
            </View>
        </Container>
    );
};

const Styles = StyleSheet.create({
    containerInner: {
        flex: 1,
        margin: 24,
        borderRadius: 16
    },
    gameButton: {
        flex: 1,
        margin: 8,
    },
    rollButtonTO: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: "auto"
    },
    rollButtonImg: {
        height: 96,
        width: 96,
        justifyContent: "center",
        alignItems: "center"
    },
    rollButtonText: {
        fontSize: 32,
        color: "white"
    },
    challengeTextView: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    challengeText: {
        fontSize: 32,
        textAlign: "center",
        lineHeight: 48
    }
})

export default TrueGamePlayComp;