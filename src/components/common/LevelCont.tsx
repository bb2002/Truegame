import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from "react-native";
import {GameLevel} from "../../libraries/types/Types";
import PayIcon from "./PayIcon";

interface LevelContProps {
    icon: any,
    title: string,
    target: string,
    value: GameLevel
    numOfPerson: string,
    place: string,
    backgroundColor: string
    onClick: (value: GameLevel) => void,
    isNeedPro: boolean

}

const LevelCont = ({ icon, title, target, value, numOfPerson, place, backgroundColor, onClick, isNeedPro }: LevelContProps) => {
    return (
        <TouchableOpacity
            onPress={() => onClick(value)}>
            <View style={{...Styles.container, backgroundColor: backgroundColor}}>
                <Image source={icon}
                       style={Styles.icon}
                       resizeMode="cover"/>
                <View style={{ flex: 1, alignSelf: "stretch" }}>
                    <View style={Styles.levelTitleCont}>
                        <Text style={Styles.levelTitle}>{title}</Text>
                        {
                            isNeedPro && (
                                <PayIcon />
                            )
                        }
                    </View>

                    <Text style={Styles.levelContent}>대상: {target}</Text>
                    <Text style={Styles.levelContent}>인원: {numOfPerson}</Text>
                    <Text style={Styles.levelContent}>장소: {place}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
};

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "#FCC195",
        alignItems: "center",
        flexDirection: "row",
        padding: 8,
        marginTop: 8,
        marginBottom: 8
    },
    icon: {
        width: 48,
        height: 48,
        marginRight: 16
    },
    levelTitleCont: {
        flexDirection: "row",
        width: "100%"
    },
    levelTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginRight: "auto"
    },
    levelContent: {
        color: "white",
        fontSize: 12
    }
})

export default LevelCont;