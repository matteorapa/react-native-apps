import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Picker, Platform, Alert, Modal, RefreshControl } from 'react-native';
import styles from '../MyStyleSheet';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import { alertMethod } from '../screens/splashScreen';

export default class themeColorPicker extends React.Component {

    constructor({ navigation }) {
        super();
        this.state = {
            nav: navigation,
            color: global.color,
            dark: global.dark,
            darkColor: ''
        };
    }

    meth() {
        this.state.nav.pop();
        this.state.nav.navigate('reloadPreferencesScreen')
        alertMethod();
    }




    async apiCall() {
        console.log(this.state.dark)
        await fetch('https://myvault.technology/api/pref', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + global.clientToken,
            },
            body: JSON.stringify({
                colour: this.state.color,
                dark: this.state.darkColor,
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
        if (this.state.dark === '#303030') {
            this.setState({
                darkColor: 'grey'
            }, () => { this.apiCall() });
        }
        else {
            this.setState({
                darkColor: 'white'
            }, () => { this.apiCall() });
        }
        console.log('Sending credentials put to express server using color: ' + this.state.color + ' darkColor: ' + this.state.darkColor
        );
    }

    render() {
        return (
            <Modal animationType={'slide'} transparent={true} visible={true}>
                <View style={{ backgroundColor: 'transparent', flex: 1, width: '97%', alignSelf: 'center', top: 50 }}>
                    <View style={{ backgroundColor: this.state.dark === 'grey' ? '#303030' : 'white', height: "70%", top: '4%', borderRadius: 40, borderWidth: 3, alignContent: 'flex-end' }}>
                        <ScrollView>
                            <TouchableOpacity style={{ position: 'absolute', zIndex: 1, top: 15, right: 45, width: 75, height: 40, borderRadius: 25, backgroundColor: this.state.color, justifyContent: 'center', borderWidth: 2 }}
                                onPress={() => this.postNewTheme()}
                            >
                                <Text style={[styles.text, { color: 'black' }]}>save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ position: 'absolute', zIndex: 1, top: 15, left: 45, width: 75, height: 40, borderRadius: 25, backgroundColor: this.state.color, justifyContent: 'center', borderWidth: 2 }}
                                onPress={() => this.state.nav.pop()}
                            >
                                <Text style={[styles.text, { color: 'black' }]}>back</Text>
                            </TouchableOpacity>

                            <View style={styles.body}>
                                <View style={{ flexDirection: 'row', top: 80 }}>
                                    <TouchableOpacity onPress={() => this.setState({ color: '#add8e6' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'lightblue', borderWidth: this.state.color === 'lightblue' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: '#26baee' })} style={[styles.themecolorpickerbuttons, { backgroundColor: '#26baee', borderWidth: this.state.color === '#26baee' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: '#7fffd4' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'aquamarine', borderWidth: this.state.color === 'blue' ? 2 : 0 }]} />
                                </View>
                                <View style={{ flexDirection: 'row', top: 80 }}>
                                    <TouchableOpacity onPress={() => this.setState({ color: '#90ee90' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'lightgreen', borderWidth: this.state.color === 'lightgreen' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: '#008000' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'green', borderWidth: this.state.color === 'green' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: '#006400' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'darkgreen', borderWidth: this.state.color === 'darkgreen' ? 2 : 0 }]} />
                                </View>
                                <View style={{ flexDirection: 'row', top: 80 }}>
                                    <TouchableOpacity onPress={() => this.setState({ color: '#ff0000' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'red', borderWidth: this.state.color === 'red' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: '#dc143c' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'crimson', borderWidth: this.state.color === 'darkred' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: '#800000' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'maroon', borderWidth: this.state.color === 'maroon' ? 2 : 0 }]} />
                                </View>
                                <View style={{ flexDirection: 'row', top: 80 }}>
                                    <TouchableOpacity onPress={() => this.setState({ color: '#ff8c00' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'darkorange', borderWidth: this.state.color === 'orange' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: '#ffd700' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'gold', borderWidth: this.state.color === 'yellow' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: '#ffc0cb' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'pink', borderWidth: this.state.color === 'pink' ? 2 : 0 }]} />
                                </View>
                                <View style={{ flexDirection: 'row', top: 80 }}>
                                    <TouchableOpacity onPress={() => this.setState({ color: '#f5deb3' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'wheat', borderWidth: this.state.color === 'wheat' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: '#e6e6fa' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'lavender', borderWidth: this.state.color === 'lavender' ? 2 : 0 }]} />
                                    <TouchableOpacity onPress={() => this.setState({ color: '#ff7f50' })} style={[styles.themecolorpickerbuttons, { backgroundColor: 'coral', borderWidth: this.state.color === 'coral' ? 2 : 0 }]} />
                                </View>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', top: 100, marginBottom: 120 }}>
                                    <TouchableOpacity style={{ backgroundColor: this.state.dark === 'white' ? this.state.color : "darkgrey", width: 120, height: 60, justifyContent: 'space-around', alignSelf: 'center', borderWidth: this.state.dark === 'white' ? 2 : 0 }}
                                        onPress={() => this.setState({ dark: 'white' })}
                                    >
                                        <Text style={{ textAlign: 'center' }}>Light Mode</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: this.state.dark === '#303030' ? this.state.color : "darkgrey", width: 120, height: 60, justifyContent: 'space-around', alignSelf: 'center', borderWidth: this.state.dark === '#303030' ? 2 : 0 }}
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