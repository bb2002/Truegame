import React from 'react';
import {Input, Text} from "react-native-elements";
import {EvilIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import {StyleSheet, Switch, View} from "react-native";
import {Gender, PlayerItem} from "../../libraries/types/Types";

interface PlayerSettingProps {
    form: PlayerItem,
    setForm: (form: PlayerItem) => void
    onDeletePressed: () => void
}

const PlayerInputCont = ({ form, setForm, onDeletePressed }: PlayerSettingProps) => {
    return (
        <View style={Styles.container}>
            <Input placeholder="플레이어 이름"
                   value={form.playerName}
                   inputContainerStyle={Styles.nameInputContainer}
                   style={Styles.nameStyle}
                   onChangeText={(text: string) => setForm({ ...form, playerName: text })}
                   containerStyle={Styles.nameContainerStyle}
                   leftIcon={
                       form.playerGender === Gender.WOMAN ?
                           <MaterialCommunityIcons name="face-woman-outline" size={18} color="#e84393" /> :
                           <MaterialCommunityIcons name="face-profile" size={18} color="#0984e3" />}/>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Switch
                    value={form.playerGender === Gender.WOMAN}
                    onValueChange={(value: boolean) => setForm({ ...form, playerGender: value ? Gender.WOMAN : Gender.MEN })}/>
                <Text style={Styles.genderText}>
                    {
                        form.playerGender === Gender.WOMAN ? "여성" : "남성"
                    }
                </Text>
            </View>
            <EvilIcons name="close" size={24} color="black" onPress={onDeletePressed}/>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: "#d7d7d7"
    },
    nameInputContainer: {
        borderBottomWidth: 0,
    },
    nameStyle: {
        fontSize: 14,
    },
    nameContainerStyle: {
        width: 200,
        height: 50,
        padding: 0,
        margin: 0,
        marginRight: "auto"
    },
    genderText: {
        fontSize: 10,
        margin: 0,
        padding: 0,
        fontWeight: "bold"
    }
})

export default PlayerInputCont;