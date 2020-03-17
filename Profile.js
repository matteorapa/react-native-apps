import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';
//import {createAppContainer} from 'react-navigation';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import styles from './MyStyleSheet';

export default class Profile extends React.Component {

  constructor({ navigation }) {
    super();
    this.state = {
      nav: navigation,
      username: '',
      password: '',
      isLoggedIn: false
    };
  }

  componentDidMount() {

    this.apiCall();

  }

  async apiCall() {
    try{
    let response = await fetch('http://myvault.technology/api/login', { method: 'GET', });
    //let responseJson = await response.json(); - changed to .text below cos of "JSON Parse error: Unrecognized token'<'"
    let responseJson = await response.text();
    this.setState({ data: responseJson.info });
    }
    catch(e){
      console.log(e);
    }
  }
  async login() {
    //post request
    console.log('Sending credentials post to express server using username: ' + this.state.username + ' and password: ' + this.state.password);
  }

  render() {
      return (
        <View style={styles.container}>

          <View style={styles.header}>

            <View style={styles.headerContainer}>
              <Text style={styles.HeaderText}>Login</Text>

              <TouchableOpacity style={{ position: 'absolute', justifyContent: 'center', right: 20, padding: 20 }} onPress={() => this.state.nav.navigate('Settings')}>
                <Image source={require('./assets/settings.png')} style={styles.SettingsButton} ></Image>
              </TouchableOpacity>

            </View >
          </View>

          <View style={styles.body}>
            <View style={styles.SignInFormContainer}>
              <View style={styles.SignInForm}>
                <Text style={styles.UsernamePasswordText}>Username</Text>
                <TextInput name='username'
                  style={styles.UsernamePasswordInput} placeholder={"Username"}
                  onChangeText={(username) => this.setState({ username })}
                  value={this.state.username}
                />

                <Text style={styles.UsernamePasswordText}>Password</Text>
                <TextInput style={styles.UsernamePasswordInput} placeholder={"Password"}
                  onChangeText={(password) => this.setState({ password })}
                  value={this.state.password} 
                  />
              </View>
            </View>
            <View style={{ flex: 3 }}>

              <View style={{ flex: 1 }}>
                <TouchableOpacity title="Sign-in" style={styles.SignInButton} onPress={() => this.login()}>
                  <Text style={styles.text}>Sign In</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 2 }}>
                <TouchableOpacity style={styles.CreateAnAccountTouchableOpacity} onPress={() => this.state.nav.navigate('CreateAnAccount')}>
                  <Text style={styles.CreateAnAccountTouchableOpacityText}>Create an Account</Text>
                </TouchableOpacity>
              </View>

            </View>
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
        </View >
      )
  }
}