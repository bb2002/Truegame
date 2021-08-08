import React, {useState} from 'react';
import WheelRouletteSmall from "../common/WheelRouletteSmall";
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign, Ionicons} from '@expo/vector-icons';
import useGameInit from "../../hooks/useGameInit";
import {StackNavigationProp} from "@react-navigation/stack";
import {GameInitParam} from "../../libraries/types/PageTypes";
import { useEffect } from 'react';
import {getSkinShips} from "../../libraries/firebase/ChallengeLoader";

interface SkinShipGamePlayCompProps {
    navigation: StackNavigationProp<GameInitParam>
}

const SkinShipGamePlayComp = ({ navigation }: SkinShipGamePlayCompProps) => {
    const { gameInit } = useGameInit()
    const [rolling, setRolling] = useState(false)
    const [ignoreIndex, setIgnoreIndex] = useState(-1)
    const [actions, setActions] = useState<string[] | undefined>(undefined)
    const [positions, setPositions] = useState<string[] | undefined>(undefined)

    useEffect(() => {
        getSkinShips((actions, positions) => {
            setActions(actions)
            setPositions(positions)
        })
    }, [])

    if(actions === undefined || positions === undefined) {
        return (
            <View style={{...Styles.container, justifyContent: "center", alignItems: "center", flex: 1}}>
                <AntDesign name="loading1" size={24} color="white" />
                <Text style={{ color: "white", marginTop: 16 }}>잠시만 기다려주세요...</Text>
            </View>
        )
    } else {
        return (
            <View style={Styles.container}>
                <Ionicons name="arrow-back" size={32} color="white" onPress={() => {
                    navigation.goBack()
                }}/>

                <WheelRouletteSmall
                    rolling={rolling}
                    strings={gameInit.players.map(value => value.playerName)}
                    duration={1500}
                    onItemSelected={(value, index) => setIgnoreIndex(index)}
                />
                <Text style={Styles.textOfConst}>님이</Text>
                <WheelRouletteSmall
                    rolling={rolling}
                    strings={actions}
                    duration={1500} />
                <View style={{ marginTop: 16, marginBottom: 16 }} />
                <WheelRouletteSmall
                    rolling={rolling && ignoreIndex !== -1}
                    strings={gameInit.players.map(value => value.playerName)}
                    duration={1500}
                    ignoreIndex={ignoreIndex} />
                <View style={{ marginTop: 8, marginBottom: 8 }} />
                <WheelRouletteSmall
                    rolling={rolling}
                    strings={positions}
                    duration={1500} />
                <Text style={Styles.textOfConst}>에</Text>

                <TouchableOpacity style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 64 }}
                                  onPress={() => {
                                      setRolling(!rolling)
                                      setIgnoreIndex(-1)
                                  }}>
                    {
                        rolling ? (
                            <AntDesign name="back" size={24} color="white" />
                        ) : (

                            <ImageBackground
                                source={require("../../../assets/icons/level_skinship_icon.png")}
                                style={{
                                    width: 96,
                                    height: 96,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                <Text style={{
                                    fontSize: 24,
                                    color: "white",
                                    fontWeight: "bold",
                                    backgroundColor: "#691F99",
                                    fontFamily: 'netmarbleB'
                                }}>클릭</Text>
                            </ImageBackground>
                        )
                    }
                </TouchableOpacity>

            </View>
        );
    }
};

const Styles = StyleSheet.create({
    container: {
        padding: 16
    },
    textOfConst: {
        fontSize: 24,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 16
    }
})

export default SkinShipGamePlayComp;