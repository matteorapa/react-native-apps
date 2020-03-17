import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';
//import {createAppContainer} from 'react-navigation';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import Home from './Home';
import styles from './MyStyleSheet';
var Name;
var Surname;
var Email;
var Password;

export default class CreateAnAccountScreen extends React.Component {

  constructor({ navigation }) {
    super();
    this.state = {
      nav: navigation,
      name: '',
      surname: '',
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    this.apiCall();
  }

  async apiCall() {
    try {
      fetch('https://myvault.technology/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          surname: this.state.surname,
          email: this.state.email,
          password:this.state.password,
        }),
      });
    }
    catch (e) { 
      console.log(e);
    }
  }

  async signup() {
    //post request
    this.componentDidMount();
    console.log('Sending credentials post to express server using name: ' + this.state.name + ' surname: ' + this.state.surname + ' email: ' + this.state.email + ' password: ' + this.state.password);
  }

  render() {

    return (

      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.HeaderText}>Create an Account</Text>
        </View >

        <View style={styles.CreateAccountFormContainer}>
          <ScrollView>
            <View style={styles.CreateAccountForm}>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.CreateAccountLabel}>Name</Text>
                <TextInput style={styles.CreateAccountInput}
                  placeholder={"John"}
                  onChangeText={(name) => this.setState({ name })}
                  value={this.state.name}
                  Name={this.state.name}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.CreateAccountLabel}>Surname</Text>
                <TextInput style={styles.CreateAccountInput}
                  placeholder={"Doe"}
                  onChangeText={(surname) => this.setState({ surname })}
                  value={this.state.surname}
                  Surname={this.state.surname}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.CreateAccountLabel}>Email</Text>
                <TextInput style={styles.CreateAccountInput}
                  placeholder={"johndoe@mailbox.com"}
                  onChangeText={(email) => this.setState({ email })}
                  value={this.state.email}
                  Email={this.state.email}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.CreateAccountLabel}>Pasword</Text>
                <TextInput style={styles.CreateAccountInput}
                  placeholder={"*********"}
                  onChangeText={(password) => this.setState({ password })}
                  value={this.state.password}
                  Password={this.state.password}
                />
              </View>

            </View>
          </ScrollView>
        </View >
        <View style={{ flex: 1 }}></View>
        <View style={{ flex: 3 }}>
          <TouchableOpacity style={styles.SignUpButton} onPress={()=>this.signup()}>
            <Text style={{ fontSize: 20, textAlign: 'center', color: '#26baee' }}  >Go!</Text>
          </TouchableOpacity>
          <View style={{ flex: 3 }}></View>

        </View>
      </View >

    );
  }
}
