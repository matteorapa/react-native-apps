import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Alert, Platform, KeyboardAvoidingView, BackHandler } from 'react-native';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import styles from '../MyStyleSheet';
const validPasswordChars = new RegExp("^[a-zA-Z0-9.,?!@£$+€&*-]+$");

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
    console.disableYellowBox = true;
    BackHandler.addEventListener('hardwareBackPress', this.backbutton);
  }

  backbutton = () => {
    return true;
  }

  async apiCall() {

    await fetch('https://myvault.technology/api/login', {
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
    else if (!validPasswordChars.test(this.state.password)){
      Alert.alert('Error','Password contains invalid characters!')
    }
    else {
      this.apiCall();
      console.log('Sending credentials post to express server using username: ' + this.state.email + ' and password: ' + this.state.password);
    }
  }

  render() {
    return (
      <View style={[styles.container, styles.central,{backgroundColor:'darkgrey'}]} >
        <View>
          <Text style={styles.heading}>MyVault</Text>
        </View>
        <View style={[styles.formBox, {width: 300, height:300, borderRadius:150, justifyContent:'space-around'}]}>
          <TextInput style={{textAlign:'center', padding: 10, marginTop:50}} name='email'
            placeholder={"Email"}
            onChangeText={(email) => this.setState({ email })}
            autoCapitalize={false}
            value={this.state.email}
          />

          <TextInput style={{textAlign:'center', padding:10, marginBottom:50}} placeholder={"Password"}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            autoCapitalize={false}
            secureTextEntry={true}
          />


        </View>
        <TouchableOpacity style={[styles.loginSignupButton,{borderRadius:100, width:100, height:100, justifyContent:'space-around'}]} title="Sign-in" onPress={() => this.login()}>
          <Text style={styles.text}>Sign In</Text>
        </TouchableOpacity>

        <View>
          <Text style={[styles.mutedText, { top: 30, color:'#707070' }]}>Don't have an account?</Text>
          <Text></Text>
          <TouchableOpacity onPress={() => this.state.nav.navigate('CreateAnAccount')}>
            <Text style={{ marginTop: 30, fontSize:15, textAlign:'center', color:'white'}}>Create one!</Text>
          </TouchableOpacity>
        </View>



      </View>
    )
  }
}