import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';
//import {createAppContainer} from 'react-navigation';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import Home from './Home';
import styles from '../MyStyleSheet';

export default class CreateAnAccountScreen extends React.Component {

  constructor({ navigation }) {
    super();
    this.state = {
      nav: navigation,
      name: '',
      surname: '',
      email: '',
      password: '',
      dob: '',
    };
  }

  // componentDidMount() {
  //   this.apiCall();
  // }

  async apiCall() {
    try {
      fetch('http://myvault.technology/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          surname: this.state.surname,
          email: this.state.email,
          password: this.state.password,
          dob: this.state.dob,
        }),
      })
        .then(response => (response.json()))
        .then((response) => {

          if (response.success) {
            alert('Account Created! Please Log-in')
            this.state.nav.navigate('Login')
          }
          else {
            console.log('Account already exists!')
            console.log(response)
            Alert.alert('Oops!', 'Account already exists')
            this.setState({ name: '' })
            this.setState({ surname: '' })
            this.setState({ email: '' })
            this.setState({ password: '' })
            this.setState({ dob: '' })
          }
        })
        .catch(error => console.warn(error))
    }
    catch (e) {
      console.log(e);
    }
  }

  async signup() {
    //this.componentDidMount();
    if (this.state.name === '' || this.state.surname === '' || this.state.email === '' || this.state.password === '' || this.state.dob === '') {
      Alert.alert('Oops', 'Please ensure all fields are filled')
    }
    else {
      this.apiCall();
      console.log('Sending credentials post to express server using name: ' + this.state.name + ' surname: ' + this.state.surname + ' email: ' + this.state.email + ' password: ' + this.state.password + ' dob: ' + this.state.dob);
    }
  }

  render() {

    return (

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.HeaderText}>Create an Account</Text>
        </View >
        <View style={styles.body}>
          <View style={styles.FormContainer1}>
            <ScrollView>
              <View style={styles.Form1}>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.Label1}>Name</Text>
                  <TextInput style={styles.Input1}
                    placeholder={"John"}
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                    Name={this.state.name}
                  />
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.Label1}>Surname</Text>
                  <TextInput style={styles.Input1}
                    placeholder={"Doe"}
                    onChangeText={(surname) => this.setState({ surname })}
                    value={this.state.surname}
                    Surname={this.state.surname}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.Label1}>Email</Text>
                  <TextInput style={styles.Input1}
                    placeholder={"johndoe@mailbox.com"}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    Email={this.state.email}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.Label1}>Pasword</Text>
                  <TextInput style={styles.Input1}
                    placeholder={"*********"}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    Password={this.state.password}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.Label1}>DOB</Text>
                  <TextInput style={styles.Input1}
                    placeholder={"yyyy-mm-dd"}
                    onChangeText={(dob) => this.setState({ dob })}
                    value={this.state.dob}
                    DOB={this.state.dob}
                  />
                </View>

              </View>
            </ScrollView>
          </View >
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 3 }}>
            <TouchableOpacity style={styles.SignUpButton} onPress={() => this.signup()}>
              <Text style={{ fontSize: 20, textAlign: 'center', color: '#26baee' }}  >Go!</Text>
            </TouchableOpacity>
            <View style={{ flex: 3 }}></View>

          </View>
        </View>
      </View >

    );
  }
}
