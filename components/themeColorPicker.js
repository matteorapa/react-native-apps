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
                    <View style={{ backgroundColor: global.color, height: 580, top: '12%', borderRadius: 40 }}>

                        <TouchableOpacity style={{ position: 'absolute', zIndex: 1, top: 15, right: 45, width: 75, height: 40, borderRadius: 25, backgroundColor: 'grey', justifyContent: 'center', padding: 10 }}
                            onPress={() => this.postNewTheme()}
                        >
                            <Text style={{ color: 'white', textAlign: 'center' }}>save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ position: 'absolute', zIndex: 1, top: 15, left: 45, width: 75, height: 40, borderRadius: 25, backgroundColor: 'grey', justifyContent: 'center', padding: 10 }}
                            onPress={() => this.state.nav.navigate('Profile')}
                        >
                            <Text style={{ color: 'white', textAlign: 'center' }}>back</Text>
                        </TouchableOpacity>

                        <View style={styles.body}>
                            <View style={{ flexDirection: 'row', top: 80 }}>
                                <TouchableOpacity onPress={() => [this.state.color = 'lightblue', alert('lightblue')]} style={{ backgroundColor: 'lightblue', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => [this.state.color = '#26baee', alert('26baee')]} style={{ backgroundColor: '#26baee', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => this.state.color = 'blue'} style={{ backgroundColor: 'blue', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                            </View>
                            <View style={{ flexDirection: 'row', top: 80 }}>
                                <TouchableOpacity onPress={() => this.state.color = 'lightgreen'} style={{ backgroundColor: 'lightgreen', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => this.state.color = 'green'} style={{ backgroundColor: 'green', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => this.state.color = 'darkgreen'} style={{ backgroundColor: 'darkgreen', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                            </View>
                            <View style={{ flexDirection: 'row', top: 80 }}>
                                <TouchableOpacity onPress={() => this.state.color = 'red'} style={{ backgroundColor: 'red', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => this.state.color = 'darkred'} style={{ backgroundColor: 'darkred', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => this.state.color = 'maroon'} style={{ backgroundColor: 'maroon', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                            </View>
                            <View style={{ flexDirection: 'row', top: 80 }}>
                                <TouchableOpacity onPress={() => this.state.color = 'orange'} style={{ backgroundColor: 'orange', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => this.state.color = 'yellow'} style={{ backgroundColor: 'yellow', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => this.state.color = 'pink'} style={{ backgroundColor: 'pink', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                            </View>
                            <View style={{ flexDirection: 'row', top: 80 }}>
                                <TouchableOpacity onPress={() => this.state.color = 'white'} style={{ backgroundColor: 'white', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => this.state.color = 'lightgrey'} style={{ backgroundColor: 'lightgrey', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => this.state.color = 'darkgrey'} style={{ backgroundColor: 'darkgrey', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', top: 100 }}>
                                <TouchableOpacity style={{ backgroundColor: this.state.dark === 'white' ? "grey" : "darkgrey", width: 120, height: 60, justifyContent: 'space-around', alignSelf: 'center' }}
                                    onPress={() => this.setState({ dark: 'white' })}
                                >
                                    <Text style={{ textAlign: 'center' }}>Light Mode</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: this.state.dark === 'grey' ? "grey" : "darkgrey", width: 120, height: 60, justifyContent: 'space-around', alignSelf: 'center' }}
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