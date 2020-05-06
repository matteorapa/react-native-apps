import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Animated, BackHandler, Dimensions, Easing } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import { Easing } from 'react-native-reanimated';

export function alertMethod() {

    console.log('its working');


}

screenHeight = Math.round(Dimensions.get('window').height);
screenWidth = Math.round(Dimensions.get('window').width);
export default class splashScreen extends React.Component {

    constructor({ navigation }) {
        super();
        this.state = {
            nav: navigation,
            yValue1: new Animated.Value(screenHeight),
            yValue2: new Animated.Value(screenHeight),
            yValue3: new Animated.Value(screenHeight),
            yValue4: new Animated.Value(screenHeight),
            yValue5: new Animated.Value(screenHeight),
            yValue6: new Animated.Value(screenHeight),
            yValue7: new Animated.Value(screenHeight),
            yValue8: new Animated.Value(screenHeight),
            yValue9: new Animated.Value(screenHeight),

        };
    }


    backbutton = () => {
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backbutton);
        setTimeout(() => {
            this.state.nav.navigate('reloadPreferencesScreen')
            this.state.nav.navigate('Home')
        }, 4000);

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
                }
                else {
                    alert('there was an error loading details')
                }

                if(this.state.dark = 'grey'){
                    global.dark = '#303030'
                }
                else if(this.state.dark = 'white'){
                    global.dark = 'white'
                }
                global.color = this.state.color
            })

            .catch((error) => {
                console.log(error);
            });

    }

    async apiCall() {

        await fetch('http://myvault.technology/api/expenses/periodic', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.clientToken,
            },
        })


            .then(response => (response.json()))
            .then((response) => {

                if (response.success) {
                }
                else {
                    console.log('something went wrong!')
                    console.log(response)
                }
            })
            .catch(error => console.warn(error))

    }

    _moveAnimation = () => {
        Animated.timing(this.state.yValue1, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.ease,
        }).start()
        setTimeout(() => {
            Animated.timing(this.state.yValue2, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.ease,
            }).start()
        }, 250);
        setTimeout(() => {
            Animated.timing(this.state.yValue3, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.ease,
            }).start()
        }, 500);
        setTimeout(() => {
            Animated.timing(this.state.yValue4, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.ease,
            }).start()
        }, 750);
        setTimeout(() => {
            Animated.timing(this.state.yValue5, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.ease,
            }).start()
        }, 1000);
        setTimeout(() => {
            Animated.timing(this.state.yValue6, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.ease,
            }).start()
        }, 1250);
        setTimeout(() => {
            Animated.timing(this.state.yValue7, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.ease,
            }).start()
        }, 1500);
        setTimeout(() => {
            Animated.timing(this.state.yValue8, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.ease,
            }).start()
        }, 1750);
        setTimeout(() => {
            Animated.timing(this.state.yValue9, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.ease,
            }).start()
        }, 2000);

    }

    render() {


        return (

            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'lightblue', bottom: this.state.yValue1 }} onPress={this._moveAnimation()}>

                    </Animated.View>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'red', bottom: this.state.yValue2 }} >

                    </Animated.View>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'darkgreen', bottom: this.state.yValue3 }} >

                    </Animated.View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'lightgreen', bottom: this.state.yValue4 }} onPress={this._moveAnimation()}>

                    </Animated.View>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'grey', bottom: this.state.yValue5 }} >

                    </Animated.View>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'wheat', bottom: this.state.yValue6 }} >

                    </Animated.View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'coral', bottom: this.state.yValue7 }} onPress={this._moveAnimation()}>

                    </Animated.View>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'lavender', bottom: this.state.yValue8 }} >

                    </Animated.View>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'darkred', bottom: this.state.yValue9 }} >

                    </Animated.View>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>Welcome Back!</Text>
                </View>
            </View>
        )

    }
}