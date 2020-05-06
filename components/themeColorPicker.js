import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Picker, Platform, Alert, Modal, RefreshControl } from 'react-native';
import styles from '../MyStyleSheet';
import Footer from './Footer';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import { alertMethod } from '../screens/splashScreen';

var darkColor = ''
export default class themeColorPicker extends React.Component {

    constructor({ navigation }) {
        super();
        this.state = {
            nav: navigation,
            color: global.color,
            dark: global.dark,
        };
    }

    meth() {
        this.state.nav.pop();
        this.state.nav.navigate('reloadPreferencesScreen')
        alertMethod();
    }




    async apiCall() {
        console.log(this.state.dark)
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
                    this.state.nav.pop();
                    this.state.nav.navigate('reloadPreferencesScreen')
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
                <View style={{ backgroundColor: 'transparent', flex: 1, width: '97%', alignSelf: 'center', top: 50 }}>
                    <View style={{ backgroundColor: global.dark, height: "70%", top: '4%', borderRadius: 40, borderWidth: 3, alignContent: 'flex-end' }}>
                        <ScrollView>
                            <TouchableOpacity style={{ position: 'absolute', zIndex: 1, top: 15, right: 45, width: 75, height: 40, borderRadius: 25, backgroundColor: global.dark === '#303030' ? '#505050' : 'lightgrey', justifyContent: 'center', borderWidth: 2 }}
                                onPress={() => this.postNewTheme()}
                            >
                                <Text style={[styles.text, { color: 'white' }]}>save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ position: 'absolute', zIndex: 1, top: 15, left: 45, width: 75, height: 40, borderRadius: 25, backgroundColor: global.dark === '#303030' ? '#505050' : 'lightgrey', justifyContent: 'center', borderWidth: 2 }}
                                onPress={() => this.state.nav.pop()}
                            >
                                <Text style={[styles.text, { color: 'white' }]}>back</Text>
                            </TouchableOpacity>

                            <View style={styles.body}>
                                <View style={{ flexDirection: 'row', top: 80 }}>
                                    <TouchableOpacity onPress={() => this.setState({ color: 'lightblue' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'lightblue', borderWidth: this.state.color === 'lightblue' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: '#26baee' })} style={[styles.themecolorpickerbuttons, { backgroundColor: '#26baee', borderWidth: this.state.color === '#26baee' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: 'blue' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'blue', borderWidth: this.state.color === 'blue' ? 2 : 0 }]} />
                                </View>
                                <View style={{ flexDirection: 'row', top: 80 }}>
                                    <TouchableOpacity onPress={() => this.setState({ color: 'lightgreen' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'lightgreen', borderWidth: this.state.color === 'lightgreen' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: 'green' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'green', borderWidth: this.state.color === 'green' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: 'darkgreen' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'darkgreen', borderWidth: this.state.color === 'darkgreen' ? 2 : 0 }]} />
                                </View>
                                <View style={{ flexDirection: 'row', top: 80 }}>
                                    <TouchableOpacity onPress={() => this.setState({ color: 'red' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'red', borderWidth: this.state.color === 'red' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: 'darkred' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'darkred', borderWidth: this.state.color === 'darkred' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: 'maroon' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'maroon', borderWidth: this.state.color === 'maroon' ? 2 : 0 }]} />
                                </View>
                                <View style={{ flexDirection: 'row', top: 80 }}>
                                    <TouchableOpacity onPress={() => this.setState({ color: 'orange' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'orange', borderWidth: this.state.color === 'orange' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: 'yellow' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'yellow', borderWidth: this.state.color === 'yellow' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: 'pink' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'pink', borderWidth: this.state.color === 'pink' ? 2 : 0 }]} />
                                </View>
                                <View style={{ flexDirection: 'row', top: 80 }}>
                                    <TouchableOpacity onPress={() => this.setState({ color: 'wheat' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'wheat', borderWidth: this.state.color === 'wheat' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: 'lavender' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'lavender', borderWidth: this.state.color === 'lavender' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: 'coral' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'coral', borderWidth: this.state.color === 'coral' ? 2 : 0 }]} />
                                </View>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', top: 100, marginBottom: 120 }}>
                                    <TouchableOpacity style={{ backgroundColor: this.state.dark === 'white' ? "lightgrey" : "darkgrey", width: 120, height: 60, justifyContent: 'space-around', alignSelf: 'center', borderWidth: this.state.dark === 'white' ? 2 : 0 }}
                                        onPress={()=>this.setState({dark: 'white'})}
                                    >
                                        <Text style={{ textAlign: 'center' }}>Light Mode</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: this.state.dark === '#303030' ? "lightgrey" : "darkgrey", width: 120, height: 60, justifyContent: 'space-around', alignSelf: 'center', borderWidth: this.state.dark === '#303030' ? 2 : 0 }}
                                        onPress={() => this.setState({ dark: '#303030' })}
                                    >
                                        <Text style={{ textAlign: 'center' }}>Dark Mode</Text>
                                    </TouchableOpacity>


                                </View>

                            </View>
                        </ScrollView>
                    </View>
                </View >
            </Modal>
        )
    }

}