import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
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

      <View style={[styles.container, styles.central]}>
        
        <View>
              <Text style={styles.mutedText}>Create Account</Text>
        </View>
        <View style={styles.formBox}>

          <View >
            <Text>Name</Text>
            <TextInput style={styles.input}
                    placeholder={"Name"}
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                    Name={this.state.name}
                  />
          </View>

          <View>
            <Text>Surname</Text>
            <TextInput style={styles.input}
                    placeholder={"Surname"}
                    onChangeText={(surname) => this.setState({ surname })}
                    value={this.state.surname}
                    Surname={this.state.surname}
                  />
          </View>

          <View>
                  <Text style={styles.Label1}>Date of Birth</Text>
                  <TextInput style={styles.input}
                    placeholder={"yyyy/mm/dd"}
                    onChangeText={(dob) => this.setState({ dob })}
                    value={this.state.dob}
                    DOB={this.state.dob}
                  />
          </View>

          <View>
                  <Text>Email</Text>
                  <TextInput style={styles.input}
                    placeholder={"johndoe@mailbox.com"}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    Email={this.state.email}
                  />
          </View>

                <View>
                  <Text>Pasword</Text>
                  <TextInput style={styles.input}
                    placeholder={"Password"}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    Password={this.state.password}
                    secureTextEntry={true}
                  />
                </View>
                
          </View>

          <View style={styles.roundButton}>
            <TouchableOpacity  onPress={() => this.signup()}>
                <Text style={{ fontSize: 20, textAlign: 'center', color: '#26baee' }}  >Sign up</Text>
              </TouchableOpacity>  
            </View>

            <View>
              
              <TouchableOpacity onPress={() => this.state.nav.navigate('Login')}>
                <Text style={[styles.centerText, styles.actionText]}>Sign in instead.</Text>
              </TouchableOpacity>
            </View>
          </View>

       
      
      

    );
  }
}
