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

    _moveAnimation = () => {
        Animated.timing(this.state.yValue1, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.bounce,
        }).start()
        setTimeout(() => {
            Animated.timing(this.state.yValue2, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.bounce,
            }).start()
        }, 1000);
        setTimeout(() => {
            Animated.timing(this.state.yValue3, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.bounce,
            }).start()
        }, 2000);

    }

    render() {


        return (

            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'lightblue', bottom: this.state.yValue3}} onPress={this._moveAnimation()}>

                    </Animated.View>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'lightgreen', bottom: this.state.yValue1 }} >
                   
                    </Animated.View>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'pink', bottom: this.state.yValue2 }} >
                        
                    </Animated.View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'wheat', bottom: this.state.yValue1}} onPress={this._moveAnimation()}>

                    </Animated.View>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'lavender', bottom: this.state.yValue2 }} >
                   
                    </Animated.View>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'grey', bottom: this.state.yValue3 }} >
                        
                    </Animated.View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'darkred', bottom: this.state.yValue2}} onPress={this._moveAnimation()}>

                    </Animated.View>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'coral', bottom: this.state.yValue3 }} >
                   
                    </Animated.View>
                    <Animated.View style={{ width: (screenWidth / 3), height: (screenWidth / 3), backgroundColor: 'red', bottom: this.state.yValue1 }} >
                        
                    </Animated.View>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={{fontSize:25, fontWeight:'bold', textAlign:'center'}}>Welcome Back!</Text>
                </View>
            </View>
        )

    }
}