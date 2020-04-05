import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Picker, Platform, Alert, Modal, RefreshControl } from 'react-native';
import styles from '../MyStyleSheet';
import Footer from './Footer';
import { TextInput, Switch } from 'react-native-gesture-handler';
import splashScreen from '../screens/splashScreen';

export default class themeColorPicker extends React.Component {

    constructor({ navigation }) {
        super();
        this.state = {
            nav: navigation,
            color: global.color,
            dark: global.dark,
        };
    }

    async apiCall() {

        await fetch('http://myvault.technology/api/pref', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.clientToken,
            },
            body: JSON.stringify({
                colour: this.state.color,
                dark: this.state.dark,
            })
        })


            .then(response => (response.json()))
            .then((response) => {

                if (response.success) {
                    this.state.nav.navigate('splashScreen')
                }
                else {
                    console.log('something went wrong!')
                    console.log(response)
                    Alert.alert('Oops!', 'Something went wrong')
                }
            })
            .catch(error => console.warn(error))

    }

    async postNewTheme() {
        this.apiCall();
        console.log('Sending credentials put to express server using color: ' + this.state.color + ' dark: ' + this.state.dark);
    }

    render() {
        return (
            <Modal animationType={'slide'} transparent={true} visible={true}>
                <View style={{ backgroundColor: 'transparent', flex: 1, width: '97%', alignSelf: 'center' }}>
                    <View style={{ backgroundColor: global.dark, height: 580, top: '12%', borderRadius: 40, borderWidth:3 }}>

                        <TouchableOpacity style={{ position: 'absolute', zIndex: 1, top: 15, right: 45, width: 75, height: 40, borderRadius: 25, backgroundColor: global.dark === 'grey'? 'grey':'lightgrey', justifyContent: 'center', borderWidth:2}}
                            onPress={() => this.postNewTheme()}
                        >
                            <Text style={[styles.text, {color:'white'}]}>save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', zIndex: 1, top: 15, left: 45, width: 75, height: 40, borderRadius: 25, backgroundColor: global.dark === 'grey'? 'grey':'lightgrey', justifyContent: 'center', borderWidth:2 }}
                            onPress={() => this.state.nav.navigate('Profile')}
                        >
                            <Text style={[styles.text, {color:'white'}]}>back</Text>
                        </TouchableOpacity>

                        <View style={styles.body}>
                            <View style={{ flexDirection: 'row', top: 80 }}>
                                <TouchableOpacity onPress={() => this.setState({ color: 'lightblue' })} style={{ backgroundColor: 'lightblue', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%', borderWidth: this.state.color === 'lightblue'? 2:0}} />
                                <TouchableOpacity onPress={() => this.setState({ color: '#26baee' })} style={{ backgroundColor: '#26baee', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%', borderWidth: this.state.color === '#26baee'? 2:0 }} />
                                <TouchableOpacity onPress={() => this.setState({ color: 'blue' })} style={{ backgroundColor: 'blue', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%', borderWidth: this.state.color === 'blue'? 2:0 }} />
                            </View>
                            <View style={{ flexDirection: 'row', top: 80 }}>
                                <TouchableOpacity onPress={() => this.setState({ color: 'lightgreen' })} style={{ backgroundColor: 'lightgreen', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%', borderWidth: this.state.color === 'lightgreen'? 2:0 }} />
                                <TouchableOpacity onPress={() => this.setState({ color: 'green' })} style={{ backgroundColor: 'green', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%', borderWidth: this.state.color === 'green'? 2:0 }} />
                                <TouchableOpacity onPress={() => this.setState({ color: 'darkgreen' })} style={{ backgroundColor: 'darkgreen', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%', borderWidth: this.state.color === 'darkgreen'? 2:0 }} />
                            </View>
                            <View style={{ flexDirection: 'row', top: 80 }}>
                                <TouchableOpacity onPress={() => this.setState({ color: 'red' })} style={{ backgroundColor: 'red', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%', borderWidth: this.state.color === 'red'? 2:0 }} />
                                <TouchableOpacity onPress={() => this.setState({ color: 'darkred' })} style={{ backgroundColor: 'darkred', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%', borderWidth: this.state.color === 'darkred'? 2:0 }} />
                                <TouchableOpacity onPress={() => this.setState({ color: 'maroon' })} style={{ backgroundColor: 'maroon', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%', borderWidth: this.state.color === 'maroon'? 2:0 }} />
                            </View>
                            <View style={{ flexDirection: 'row', top: 80 }}>
                                <TouchableOpacity onPress={() => this.setState({ color: 'orange' })} style={{ backgroundColor: 'orange', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%', borderWidth: this.state.color === 'orange'? 2:0 }} />
                                <TouchableOpacity onPress={() => this.setState({ color: 'yellow' })} style={{ backgroundColor: 'yellow', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%', borderWidth: this.state.color === 'yellow'? 2:0 }} />
                                <TouchableOpacity onPress={() => this.setState({ color: 'pink' })} style={{ backgroundColor: 'pink', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%', borderWidth: this.state.color === 'pink'? 2:0 }} />
                            </View>
                            <View style={{ flexDirection: 'row', top: 80 }}>
                                <TouchableOpacity onPress={() => this.setState({ color: 'wheat' })} style={{ backgroundColor: 'wheat', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%', borderWidth: this.state.color === 'wheat'? 2:0 }} />
                                <TouchableOpacity onPress={() => this.setState({ color: 'lavender' })} style={{ backgroundColor: 'lavender', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%', borderWidth: this.state.color === 'lavender'? 2:0 }} />
                                <TouchableOpacity onPress={() => this.setState({ color: 'coral' })} style={{ backgroundColor: 'coral', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%', borderWidth: this.state.color === 'coral'? 2:0 }} />
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', top: 100 }}>
                                <TouchableOpacity style={{ backgroundColor: this.state.dark === 'white' ? "lightgrey" : "darkgrey", width: 120, height: 60, justifyContent: 'space-around', alignSelf: 'center', borderWidth: this.state.dark === 'white'? 2:0}}
                                    onPress={() => this.setState({ dark: 'white' })}
                                >
                                    <Text style={{ textAlign: 'center' }}>Light Mode</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: this.state.dark === 'grey' ? "lightgrey" : "darkgrey", width: 120, height: 60, justifyContent: 'space-around', alignSelf: 'center', borderWidth: this.state.dark === 'grey'? 2:0}}
                                    onPress={() => this.setState({ dark: 'grey' })}
                                >
                                    <Text style={{ textAlign: 'center' }}>Dark Mode</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View >
            </Modal>
        )
    }

}