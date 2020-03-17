import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import Stack from './homeStack';
import styles from './MyStyleSheet';

export default class PersonalDetails extends React.Component {

    constructor({ navigation }) {
        super();
        this.state = { nav: navigation };

        this.state = {
            isLoading: true,
            dataSource: null
        };
    }


    componentDidMount() {

        return fetch('http://myvault.technology/api/users')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.users,
                })
            })

            .catch((error) => {
                console.log(error);
            });
    }



    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.HeaderText}>PersonalDetails loaded </Text>
                        </View>
                    </View>

                    <View style={styles.body}>

                    </View>

                    <View style={styles.footer}>
                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('Home')}>
                                <Image source={require('./assets/wallet.png')} style={{ width: '50%', height: '70%', alignSelf: 'center', resizeMode: 'contain', top: 4 }}></Image>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('UpcomingEvents')}>
                                <Image source={require('./assets/calendar.png')} style={{ width: '70%', height: '70%', alignSelf: 'center', resizeMode: 'contain', top: 7 }}></Image>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('Analytics')}>
                                <Image source={require('./assets/chart.png')} style={{ width: '60%', height: '70%', alignSelf: 'center', resizeMode: 'contain', top: 7 }}></Image>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('Financials')}>
                                <Image source={require('./assets/coins.png')} style={{ width: '80%', height: '80%', alignSelf: 'center', resizeMode: 'contain', top: 7 }}></Image>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('Profile')}>
                                <Image source={require('./assets/profile.png')} style={{ width: '60%', height: '80%', alignSelf: 'center', resizeMode: 'contain', top: 4 }}></Image>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            );
        } 
        else {
            let users = this.state.dataSource.map((val, key) => {
                return <View key={key} style={styles.text} >
                    <Text>{val.name}</Text>
                    <Text>{val.surname}</Text>
                    <Text>{val.email}</Text>
                </View>
            });

            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.HeaderText}>PersonalDetails didnt load</Text>
                        </View>
                    </View>

                    <View style={styles.body}>

                        {users}

                    </View>

                    <View style={styles.footer}>
                        
                    </View>
                </View>
            );
        }

    }
}