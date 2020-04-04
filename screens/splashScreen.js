import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
global.x = 'loading';
export default class splashScreen extends React.Component {

    constructor({ navigation }) {
        super();
        this.state = {
            nav: navigation,
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.state.nav.navigate('Home')
        }, 2000);

        Animated.timing(this._animatedValue, {
            toValue: 1,
            duration: 2000
        }).start();


        fetch('http://myvault.technology/api/pref', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.clientToken,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    this.setState({
                        color: response.output[0].colour,
                        dark: response.output[0].dark,

                    })
                    global.color = this.state.color,
                        global.dark = this.state.dark,
                        console.log(global.dark)
                }
                else {
                    alert('there was an error loading details')
                }

            })

            .catch((error) => {
                console.log(error);
            });

    }

    reload() {
        this.componentWillMount();
        this.componentDidMount();
        global.x = 'reloading'
    }
    
    componentWillMount() {
        this._animatedValue = new Animated.Value(0);
    }

    render() {
        const interpolatedRotateAnimation = this._animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '-360deg']
        });
        return (

            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>

                </View>

                <Animated.View style={{ flex: 1, transform: [{ rotate: interpolatedRotateAnimation }] }}>
                    <Image source={require('../assets/gear.png')} style={{ resizeMode: 'contain', alignSelf: 'center', width: '80%', bottom: 369 }} />
                </Animated.View>

                <TouchableOpacity style={{ position: 'absolute', zIndex: 1, bottom: 45, width: 200, height: 40, borderRadius: 25, backgroundColor: 'grey', alignSelf: 'center', padding: 10 }}
                    onPress={() => this.reload()}
                >
                    <Text style={{ color: 'white', textAlign: 'center' }}>Reload with new theme</Text>
                </TouchableOpacity>

                <Text style={{ fontWeight: 'bold', fontSize: 25, textAlign: "center", top: 100 }}>{global.x}</Text>

                <View style={{ flex: 1 }}>

                </View>
            </View>
        )

    }
}