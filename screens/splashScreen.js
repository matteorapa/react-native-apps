import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Switch, ScrollView, AutoScrolling } from 'react-native-gesture-handler';
import styles from '../MyStyleSheet';
import walletIcon from '../assets/wallet.png';
import Footer from '../components/Footer';
export default class splashScreen extends React.Component {
    constructor({ navigation }) {
        super();
        this.state = {
            nav: navigation,
            color: 'lightgreen',
        };
    }

    componentDidMount() {
        global.color = this.state.color
        setTimeout(() => {
            this.state.nav.navigate('Home')
        }, 2000);

        Animated.timing(this._animatedValue, {
            toValue: 1,
            duration: 2000
        }).start();


    }



    componentWillMount() {
        this._animatedValue = new Animated.Value(0);
    }

    render() {
        const interpolatedRotateAnimation = this._animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>

                </View>

                <Animated.View style={{ flex: 1, transform: [{ rotate: interpolatedRotateAnimation }] }}>
                    <Image source={require('../assets/gear.png')} style={{ resizeMode: 'contain', alignSelf: 'center', width: '80%', bottom: 365 }} />
                </Animated.View>


                <Text style={{ fontWeight: 'bold', fontSize: 25, textAlign: "center", top: 100 }}>Opening your vault</Text>

                <View style={{ flex: 1 }}>

                </View>
            </View>
        )
    }
}