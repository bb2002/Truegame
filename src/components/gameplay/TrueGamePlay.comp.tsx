import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import WheelRoulette from "../common/WheelRoulette";
import useGameInit from "../../hooks/useGameInit";
import Container from "../common/Container";
import {Button} from "react-native-elements";
import {Challenge, PlayerItem} from "../../libraries/types/Types";

const TrueGamePlayComp = () => {
    const { gameInit } = useGameInit()
    const [rolling, setRolling] = useState(false)
    const [step, setStep] = useState(0)
    const [player, setPlayer] = useState<PlayerItem | undefined>(undefined)

    const onPlayerSelected = (player: PlayerItem) => {
        setPlayer(player)       // 플레이어 선택
        setStep(1)        // 진실/도전 버튼 보이기
    }

    const onChallengeSelected = (challenge: Challenge) => {
        setStep(2)
    }

    return (
        <Container style={Styles.containerOuter}>
            <View style={Styles.containerInner}>
                <WheelRoulette
                    players={gameInit.players}
                    rolling={rolling}
                    freeRotateNum={15}
                    duration={2500}
                    containerStyle={{
                        borderRadius: 16,
                        borderWidth: 4,
                        borderColor: "#27ae60",
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
                                source={require("../../../assets/icons/level_highteen_icon.png")}
                                style={Styles.rollButtonImg}
                                resizeMode="cover">
                                <Text style={Styles.rollButtonText}>클릭</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    )
                }

                {
                    step === 2 && (
                        <TouchableOpacity
                            onPress={() => {
                                setRolling(false)
                                setStep(0)
                            }}
                            style={Styles.challengeTextView}>
                            <Text>여기에 질문이 보입니다.</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </Container>
    );
};

const Styles = StyleSheet.create({
    containerOuter: {
        backgroundColor: "#3498db"
    },
    containerInner: {
        flex: 1,
        margin: 24,
        backgroundColor: "#ecf0f1",
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
        backgroundColor: "#27ae60",
        color: "white"
    },
    challengeTextView: {
        width: "100%",
        flex: 1
    }
})

export default TrueGamePlayComp;