import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Alert, Platform, KeyboardAvoidingView, BackHandler } from 'react-native';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import styles from '../MyStyleSheet';

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
    BackHandler.addEventListener('hardwareBackPress', this.backbutton);
  }

  backbutton = () => {
    return true;
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

          this.state.nav.navigate('splashScreen')
          this.setState({ email: '' })
          this.setState({ password: '' })
        }
        else {
          console.log('Unsuccessful')
          console.log(response)
          Alert.alert(
            'Oops!',
            'No account is linked to those credentials!',
            [
              { text: 'Sign Up', onPress: () => this.state.nav.navigate('CreateAnAccount') },
              { text: 'Retry', onPress: () => console.log('retry') },
            ],
            { cancelable: false },
          );
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
      <View style={[styles.container, styles.central]} >
        <View>
          <Text style={styles.heading}>MyVault</Text>
        </View>
        <View style={styles.formBox}>
          <Text>Email</Text>
          <TextInput style={styles.input} name='email'
            placeholder={"Email"}
            onChangeText={(email) => this.setState({ email })}
            autoCapitalize={false}
            value={this.state.email}
          />

          <Text >Password</Text>
          <TextInput style={styles.input} placeholder={"Password"}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            autoCapitalize={false}
            secureTextEntry={true}
          />


        </View>
        <TouchableOpacity style={styles.roundButton} title="Sign-in" onPress={() => this.login()}>
          <Text style={styles.text}>Sign In</Text>
        </TouchableOpacity>

        <View>
          <Text style={[styles.mutedText, { top: 30 }]}>Don't have an account?</Text>
          <Text></Text>
          <TouchableOpacity onPress={() => this.state.nav.navigate('CreateAnAccount')}>
            <Text style={[styles.centerText, styles.actionText, { top: 30, fontSize:15}]}>Create an Account</Text>
          </TouchableOpacity>
        </View>



      </View>
    )
  }
}