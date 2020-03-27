import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';
//import {createAppContainer} from 'react-navigation';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import styles from './MyStyleSheet';

export default class Login extends React.Component {

  constructor({ navigation }) {
    super();
    
    this.state = {
      nav: navigation,
      email: '',
      password: '',
      clientToken: '',
      isLoggedIn: true,
    };
  }
  // component did mount is a lifecycle method so is called when program is run 
  //to prevent alert showing when program is run ive changed the api call to a reg method
  componentDidMount() {
    //this.apiCall();
  }

  async apiCall() {

    await fetch('http://myvault.technology/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })


      .then(response => (response.json()))
      .then((response) => {

        if (response.token) {
          global.clientToken = response.token
          this.state.nav.navigate('Home')
          this.setState({ email: '' })
          this.setState({ password: '' })
        }
        else {
          console.log('Unsuccessful')
          console.log(response)
          Alert.alert('Oops!', 'Incorrect email or password')
          this.setState({ email: '' })
          this.setState({ password: '' })
        }
      })
      .catch(error => console.warn(error))

  }

  async login() {
    if (this.state.email === '' || this.state.password === '') {
      Alert.alert('Oops!', 'Please ensure all fields are filled')
    }
    else {
      this.apiCall();
      console.log('Sending credentials post to express server using username: ' + this.state.email + ' and password: ' + this.state.password);
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.loginHeader}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, width: '50%', alignSelf: 'center' }}>
              <Image source={require('./assets/lock.png')} style={{ flex: 1, width: '40%', alignSelf: 'center', resizeMode: 'contain', bottom: 0 }}></Image>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.SignInFormContainer}>
            <View style={styles.SignInForm}>
              <Text style={styles.UsernamePasswordText}>Username</Text>
              <TextInput name='email'
                style={styles.UsernamePasswordInput} placeholder={"Email"}
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
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

        </View>
      </View >
    )
  }
}