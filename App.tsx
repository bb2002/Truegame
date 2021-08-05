import React, {useEffect} from 'react';
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
import { RootSiblingParent } from 'react-native-root-siblings';
import firebase from 'firebase/app'
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCvE6qJ25aP9UsiaqXbcr9Bgmh76qlQG8c",
    authDomain: "truegame-32389.firebaseapp.com",
    databaseURL: "https://truegame-32389-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "truegame-32389",
    storageBucket: "truegame-32389.appspot.com",
    messagingSenderId: "308706299348",
    appId: "1:308706299348:web:cb5d0343e8562a577cda41",
    measurementId: "G-49RQ9EWMVC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator<GameInitParam>()
const store = createStore(rootReducer)

export default function App() {
    return (
        <Provider store={store}>
            <RootSiblingParent>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="GameInit" component={GameInit} />
                        <Stack.Screen name="TrueGamePlay" component={TrueGamePlay} />
                        <Stack.Screen name="SkinShipGamePlay" component={SkinShipGamePlay} />
                    </Stack.Navigator>
                </NavigationContainer>
            </RootSiblingParent>
        </Provider>
    );
}