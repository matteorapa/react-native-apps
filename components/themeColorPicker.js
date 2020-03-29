import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Picker, Platform, Alert, Modal, RefreshControl } from 'react-native';
import styles from '../MyStyleSheet';
import Footer from './Footer';
import { TextInput, Switch } from 'react-native-gesture-handler';

export default class themeColorPicker extends React.Component {

    constructor({ navigation }) {
        super();
        this.state = {
            nav: navigation,
            themeRefresh: 'false'
        };
    }

    componentWillUnmount(){
        global.themeRefresh = true;
    }

    render() {
        return (
            <Modal animationType={'slide'} transparent={true} visible={true}>
                <View style={{ backgroundColor: 'transparent', flex: 1, width: '97%', alignSelf: 'center' }}>
                    <View style={{ backgroundColor: global.color, height: '73%', top: '15%', borderRadius: 40 }}>
                        <View style={styles.header}>
                        </View>

                        <View style={styles.body}>
                            <View style={{ flexDirection: 'row', bottom: 10 }}>
                                <TouchableOpacity onPress={() => global.color = 'lightblue'} style={{ backgroundColor: 'lightblue', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => global.color = '#26baee'} style={{ backgroundColor: '#26baee', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => global.color = 'blue'} style={{ backgroundColor: 'blue', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                            </View>
                            <View style={{ flexDirection: 'row', bottom: 10 }}>
                                <TouchableOpacity onPress={() => global.color = 'lightgreen'} style={{ backgroundColor: 'lightgreen', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => global.color = 'green'} style={{ backgroundColor: 'green', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => global.color = 'darkgreen'} style={{ backgroundColor: 'darkgreen', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                            </View>
                            <View style={{ flexDirection: 'row', bottom: 10 }}>
                                <TouchableOpacity onPress={() => global.color = 'red'} style={{ backgroundColor: 'red', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => global.color = 'darkred'} style={{ backgroundColor: 'darkred', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => global.color = 'maroon'} style={{ backgroundColor: 'maroon', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                            </View>
                            <View style={{ flexDirection: 'row', bottom: 10 }}>
                                <TouchableOpacity onPress={() => global.color = 'orange'} style={{ backgroundColor: 'orange', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => global.color = 'yellow'} style={{ backgroundColor: 'yellow', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => global.color = 'pink'} style={{ backgroundColor: 'pink', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                            </View>
                            <View style={{ flexDirection: 'row', bottom: 10 }}>
                                <TouchableOpacity onPress={() => global.color = 'lightgrey'} style={{ backgroundColor: 'lightgrey', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => global.color = 'darkgrey'} style={{ backgroundColor: 'darkgrey', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                                <TouchableOpacity onPress={() => global.color = 'grey'} style={{ backgroundColor: 'grey', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', marginLeft: '10%' }} />
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <TouchableOpacity onPress={() => this.state.nav.navigate('Profile')} style={{ backgroundColor: 'grey', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', margin: 20 }}>
                                    <Text style={{ textAlign: 'center' }}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.state.nav.navigate('reEnter')} style={{ backgroundColor: 'grey', width: 80, height: 80, borderRadius: 40, justifyContent: 'space-around', alignSelf: 'center', margin: 20 }}>
                                    <Text style={{ textAlign: 'center' }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View >
            </Modal>
        )
    }

}