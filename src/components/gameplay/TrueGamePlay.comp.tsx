import React, {useState} from 'react';
import {Text, ImageBackground, StyleSheet, TouchableOpacity, View} from "react-native";
import WheelRoulette from "../common/WheelRoulette";
import useGameInit from "../../hooks/useGameInit";
import Container from "../common/Container";
import {Button} from "react-native-elements";

const TrueGamePlayComp = () => {
    const { gameInit } = useGameInit()
    const [rolling, setRolling] = useState(false)

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
                        margin: 16
                    }}/>
                
                <View style={{ flexDirection: "row" }}>
                    <Button
                        title="진실"
                        containerStyle={Styles.gameButton}
                        titleStyle={{ fontSize: 24 }}
                        buttonStyle={{ paddingTop: 16, paddingBottom: 16 }} />
                    <Button
                        title="도전"
                        containerStyle={Styles.gameButton}
                        titleStyle={{ fontSize: 24 }}
                        buttonStyle={{ paddingTop: 16, paddingBottom: 16, backgroundColor: "#e74c3c" }} />
                </View>

                <TouchableOpacity
                    style={Styles.rollButtonTO}
                    onPress={() => setRolling(!rolling)}>
                    <ImageBackground
                        source={require("../../../assets/icons/level_highteen_icon.png")}
                        style={Styles.rollButtonImg}
                        resizeMode="cover">
                        <Text style={Styles.rollButtonText}>클릭</Text>
                    </ImageBackground>
                </TouchableOpacity>
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
    }
})

export default TrueGamePlayComp;