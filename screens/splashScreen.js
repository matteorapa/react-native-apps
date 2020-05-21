import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Animated, BackHandler, Dimensions, Easing } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import { Easing } from 'react-native-reanimated';
import styles from '../MyStyleSheet';


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
            fadeValue1: new Animated.Value(0),
            fadeValue2: new Animated.Value(0),
            fadeValue3: new Animated.Value(0),
        };
    }


    backbutton = () => {
        return true;
    }

    componentDidMount() {
        console.disableYellowBox = true;
        this.periodicAPICall();

        BackHandler.addEventListener('hardwareBackPress', this.backbutton);
        setTimeout(() => {
            this.state.nav.navigate('reloadPreferencesScreen')
            this.state.nav.navigate('Home')
        }, 5500);

        fetch('https://myvault.technology/api/pref', {
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
                    console.log(response.output[0].dark)
                }
                else {
                    alert('there was an error loading details')
                }

                if (response.output[0].dark === 'grey') {
                    global.dark = '#303030'
                    
                }
                else if (response.output[0].dark === 'white') {
                    global.dark = 'white'
                    
                }
                global.color = this.state.color
            })

            .catch((error) => {
                console.log(error);
            });

    }

    async periodicAPICall() {

        await fetch('https://myvault.technology/api/expenses/periodic', {
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
                    console.log(response)
                }
                else {
                    console.log('something went wrong!')
                    console.log(response)
                }
            })
            .catch(error => console.warn(error))

    }

    _fadeAnimation = () => {
        Animated.timing(this.state.fadeValue1, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: 'false'
        }).start()
        setTimeout(() => {
            Animated.timing(this.state.fadeValue1, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: 'false'
            }).start()
        }, 1000);
        setTimeout(() => {
            Animated.timing(this.state.fadeValue2, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: 'false'
            }).start()
        }, 1500);
        setTimeout(() => {
            Animated.timing(this.state.fadeValue2, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: 'false'
            }).start()
        }, 2500);
        setTimeout(() => {
            Animated.timing(this.state.fadeValue3, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: 'false'
            }).start()
        }, 3000);
        setTimeout(() => {
            Animated.timing(this.state.fadeValue3, {
                toValue: 0,
                duration: 500,
                useNativeDriver: 'false'
            }).start()
        }, 3500);
        setTimeout(() => {
            Animated.timing(this.state.fadeValue3, {
                toValue: 1,
                duration: 500,
                useNativeDriver: 'false'
            }).start()
        }, 4000);setTimeout(() => {
            Animated.timing(this.state.fadeValue3, {
                toValue: 0,
                duration: 500,
                useNativeDriver: 'false'
            }).start()
        }, 4500);
        setTimeout(() => {
            Animated.timing(this.state.fadeValue3, {
                toValue: 1,
                duration: 500,
                useNativeDriver: 'false'
            }).start()
        }, 5000);setTimeout(() => {
            Animated.timing(this.state.fadeValue3, {
                toValue: 0,
                duration: 500,
                useNativeDriver: 'false'
            }).start()
        }, 5500);
    }


    render() {


        return (


            <View style={[styles.container, { backgroundColor: 'darkgrey' }]} >


                <View style={{ height: '50%', alignSelf:'center', justifyContent:'space-around',  top:'25%'}}>
                    <Animated.View style={{ width: (screenWidth), opacity: this.state.fadeValue1 }} onPress={this._fadeAnimation()}>
                        <Text style={{ textAlign: 'center', justifyContent: 'space-around', fontSize: 32, fontWeight: '200' }}>Retrieving your data</Text>
                    </Animated.View>

                    <Animated.View style={{ width: (screenWidth), opacity: this.state.fadeValue2 }} onPress={this._fadeAnimation()}>
                        <Text style={{ textAlign: 'center', justifyContent: 'space-around', fontSize: 32, fontWeight: '200' }}>Calculating your expenses</Text>
                    </Animated.View>

                    <Animated.View style={{ width: (screenWidth),  opacity: this.state.fadeValue3 }} onPress={this._fadeAnimation()}>
                        <Text style={{ textAlign: 'center', justifyContent: 'space-around', fontSize: 32, fontWeight: '200' }}>Opening your vault</Text>
                    </Animated.View>
                </View>


            </View>

        )
    }
}