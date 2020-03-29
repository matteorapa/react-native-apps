import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Switch, ScrollView, AutoScrolling } from 'react-native-gesture-handler';
import styles from './MyStyleSheet';
import walletIcon from './assets/wallet.png';
import Footer from './Footer';

export default class reEnter extends React.Component {
    constructor({ navigation }) {
        super();
        this.state = {
            nav: navigation,
        };
    }
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View>
                    <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center' }}>
                        <Text>Re - enter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}