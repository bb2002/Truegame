import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// @ts-ignore           IDE 버그로 자꾸 빨간줄 쳐저서 제거
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import GameInit from "./src/pages/GameInit";
import {createStore} from "redux";
import rootReducer from "./src/redux";
import {Provider} from "react-redux";
import TrueGamePlay from "./src/pages/TrueGamePlay";
import {GameInitParam} from "./src/libraries/types/PageTypes";
import SkinShipGamePlay from "./src/pages/SkinShipGamePlay";

const Stack = createStackNavigator<GameInitParam>()
const store = createStore(rootReducer)

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="GameInit" component={GameInit} />
                    <Stack.Screen name="TrueGamePlay" component={TrueGamePlay} />
                    <Stack.Screen name="SkinShipGamePlay" component={SkinShipGamePlay} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>

    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
