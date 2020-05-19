import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Animated, BackHandler, Dimensions, Easing } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import { Easing } from 'react-native-reanimated';

var { width, height } = Dimensions.get('window');
export default class reloadPreferencesScreen extends React.Component {

    constructor({ navigation }) {
        super();
        this.state = {
            nav: navigation,
        };
    }


    backbutton = () => {
        return true;
    }

    componentDidMount() {
        console.disableYellowBox = true;
        BackHandler.addEventListener('hardwareBackPress', this.backbutton);
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
                    this.state.nav.navigate('Home')
                    global.dark=this.state.dark
                    global.color = this.state.color
                }
                else {
                    alert('there was an error loading details')
                }

                

            })

            .catch((error) => {
                console.log(error);
            });

    }

    render() {


        return (

            <View style={{ flex: 1, backgroundColor: 'darkgrey', justifyContent:'space-around'}}>
                    <TouchableOpacity style={{ zIndex: 1, width: 200, height: 200, borderRadius: 100, backgroundColor: 'grey', alignSelf: 'center', padding: 10, justifyContent:'space-around' }}
                        onPress={() => this.componentDidMount()}
                    >
                        <Text style={{ color: 'white', textAlign: 'center', textAlign:'center' }}>Reload with new theme</Text>
                    </TouchableOpacity>
            </View>
        )

    }
}