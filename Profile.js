import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import Stack from './homeStack';
import styles from './MyStyleSheet';

export default class Profile extends React.Component {

  constructor({ navigation }) {
    super();
    this.state = { nav: navigation };
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Text style={styles.HeaderText}>Profile</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => this.state.nav.navigate('PersonalDetails')}>
              <Text style={{ fontSize: 20, left: 80, color: 'white' }}>Personal Details</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
              <Text style={{ fontSize: 20, left: 80, color: 'white' }}>Account Details</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, left: 80, color: 'white' }}>Use face id</Text>
            <Switch style={{ position: 'absolute', right: 80 }}></Switch>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
              <Text style={{ fontSize: 20, left: 80, color: 'white' }}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
              <Text style={{ fontSize: 20, left: 80, color: 'white' }}> Close Account</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => this.state.nav.navigate('Profile')} onPress={()=> this.state.nav.navigate('Login')}>
              <Text style={{ fontSize: 20, left: 80, color: 'red' }}>Log out</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.footer}>
          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('Home')}>
              <Image source={require('./assets/wallet.png')} style={{ width: '50%', height: '70%', alignSelf: 'center', resizeMode: 'contain', top: 4 }}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('ViewExpenses')}>
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
}

