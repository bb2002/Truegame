import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, Modal, View, Platform, Linking, Alert} from "react-native";
import LevelCont from "../common/LevelCont";
import {GameLevel} from "../../libraries/types/Types";
import useGameInit from "../../hooks/useGameInit";
import {StackNavigationProp} from "@react-navigation/stack";
import {GameInitParam} from "../../libraries/types/PageTypes";
import {Ionicons} from "@expo/vector-icons";
import {checkIsPro, PRO_VERSION_APPSTORE, PRO_VERSION_GOOGLEPLAY} from "../../libraries/Utils";
import {Button, Card} from "react-native-elements";
import { FontAwesome } from '@expo/vector-icons';

interface LevelInitCompProps {
    navigation: StackNavigationProp<GameInitParam>
}

const LevelInitComp = ({ navigation }: LevelInitCompProps) => {
    const { gameInit, setLevel, setGamePage } = useGameInit()
    const [proModal, setProModal] = useState(false)

    const onLevelSelected = (value: GameLevel) => {
        setLevel(value)

        switch(value) {
            case GameLevel.LEVEL_HIGHTEEN:
            case GameLevel.LEVEL_19:
                navigation.navigate("TrueGamePlay")
                break
            case GameLevel.LEVEL_29:
                if(checkIsPro()) {
                    navigation.navigate("TrueGamePlay")
                } else {
                    setProModal(true)
                }
                break

            case GameLevel.LEVEL_COUPLE_HOT:
            case GameLevel.LEVEL_COUPLE_EASY:
                if(gameInit.players.length === 2) {
                    if(value === GameLevel.LEVEL_COUPLE_HOT && !checkIsPro()) {
                        setProModal(true)
                    } else {
                        navigation.navigate("TrueGamePlay")
                    }
                } else {
                    Alert.alert("인원 수 오류", "이 모드는 2명만 플레이 가능합니다.", [
                        {
                            text: "확인"
                        }
                    ])
                }
                break
            case GameLevel.LEVEL_SKINSHIP:
                if(checkIsPro()) {
                    navigation.navigate("SkinShipGamePlay")
                } else {
                    setProModal(true)
                }
        }
    }

    return (
            <ScrollView style={Styles.container}>
                <View style={Styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={proModal}
                        onRequestClose={() => {
                            setProModal(false)
                        }}>
                        <View style={Styles.centeredView}>
                            <View style={Styles.modalView}>
                                <Card.Title h3={true}>PRO 버전 구입</Card.Title>
                                <View style={{ borderWidth: 0.5, borderColor: "#bdc3c7", width: "100%", marginBottom: 16 }} />
                                <Text style={Styles.modalText}>게임을 즐기고 계신가요?</Text>
                                <Text style={Styles.modalText}>이 난이도를 플레이 하려면 PRO 버전 구입이 필요합니다.</Text>
                                <View style={{ borderWidth: 0.5, borderColor: "#bdc3c7", width: "100%", marginBottom: 16 }} />
                                <Button icon={<FontAwesome name="won" size={16} color="white" />} title="2,000 구입하기" containerStyle={{ marginBottom: 8 }}
                                        onPress={async () => {
                                            if(Platform.OS === "ios") {
                                                await Linking.openURL(PRO_VERSION_APPSTORE)
                                            } else if(Platform.OS === "android") {
                                                await Linking.openURL(PRO_VERSION_GOOGLEPLAY)
                                            }
                                        }}/>
                                <Button title="나중에" type="clear" titleStyle={{color: "#7f8c8d"}} onPress={() => setProModal(false)} />

                            </View>
                        </View>
                    </Modal>
                </View>
                <Ionicons name="arrow-back" size={32} color="black" onPress={() => {
                    setGamePage(0)
                }}/>

                <LevelCont
                    title="하이틴 난이도"
                    numOfPerson="상관없음"
                    target="서로에게 궁금한 게 많은 남녀"
                    icon={require("../../../assets/icons/level_highteen_icon.png")}
                    place="상관없음"
                    onClick={onLevelSelected}
                    value={GameLevel.LEVEL_HIGHTEEN}
                    backgroundColor="#2980b9"
                    isNeedPro={false}/>

                <LevelCont
                    title="19금 난이도"
                    numOfPerson="상관없음"
                    target="어느정도 수위 있게 놀고 싶은 남녀"
                    icon={require("../../../assets/icons/level_19_icon.png")}
                    place="상관없음"
                    onClick={onLevelSelected}
                    value={GameLevel.LEVEL_19}
                    backgroundColor="#f39c12"
                    isNeedPro={false}/>

                <LevelCont
                    title="29금 난이도"
                    numOfPerson="2 ~ 6명"
                    target="오늘은 갈 때까지 가고 싶은 남녀"
                    icon={require("../../../assets/icons/level_29_icon.png")}
                    place="개인적인 공간"
                    onClick={onLevelSelected}
                    value={GameLevel.LEVEL_29}
                    backgroundColor="#c0392b"
                    isNeedPro={!checkIsPro()}/>

                <LevelCont
                    title="커플게임 순한맛"
                    numOfPerson="2명"
                    target="서로를 알아가고 싶은 두 남녀"
                    icon={require("../../../assets/icons/level_copeasy_icon.png")}
                    place="조금 개인적인 공간"
                    onClick={onLevelSelected}
                    value={GameLevel.LEVEL_COUPLE_EASY}
                    backgroundColor="#27ae60"
                    isNeedPro={false}/>

                <LevelCont
                    title="커플게임 매운맛"
                    numOfPerson="2명"
                    target="뜨거운 분위기를 즐기고 싶은 두 남녀"
                    icon={require("../../../assets/icons/level_cophot_icon.png")}
                    place="개인적인 공간"
                    onClick={onLevelSelected}
                    value={GameLevel.LEVEL_COUPLE_HOT}
                    backgroundColor="#c0392b"
                    isNeedPro={!checkIsPro()}/>

                <LevelCont
                    title="스킨쉽 게임"
                    numOfPerson="2 ~ 4명"
                    target="뜨겁게 놀고 싶은 남녀"
                    icon={require("../../../assets/icons/level_skinship_icon.png")}
                    place="개인적인 공간"
                    onClick={onLevelSelected}
                    value={GameLevel.LEVEL_SKINSHIP}
                    backgroundColor="#CFA0FC"
                    isNeedPro={!checkIsPro()}/>
            </ScrollView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        width: "80%",
        backgroundColor: "white",
        padding: 32,
        alignItems: "center",
        shadowColor: "#000",
        borderRadius: 8,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: "column"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        fontSize: 16,
        textAlign: "center"
    }
})

export default LevelInitComp;