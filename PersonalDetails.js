import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import Stack from './homeStack';
import styles from './MyStyleSheet';
var APILink = 'http://myvault.technology/api/users/';

export default class PersonalDetails extends React.Component {

    constructor({ navigation }) {
        super();
        this.state = { 
            nav: navigation, 
            isLoading: true,
            dataSource: null 
        };
    }


    componentDidMount() {
        APILink = APILink + 'Test@test.com';
        return fetch(APILink)
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

                </View>
            );
        }
        else {
            let users = this.state.dataSource.map((val, key) => {
                return <View style={styles.container} >

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.Label1}>Name</Text>
                        <Text style={styles.Input1}>{val.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.Label1}>Surname</Text>
                        <Text style={styles.Input1}>{val.surname}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.Label1}>Email</Text>
                        <Text style={styles.Input1}>{val.email}</Text>
                    </View>
                </View>
            });

            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.HeaderText}>Personal Details</Text>
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