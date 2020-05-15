import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import styles from '../MyStyleSheet';
var compareToMonths = [2,4,6,9,11];
const regex = new RegExp("^[a-zA-Z0-9.,?!@£$+€&*-]+$");
const day = new RegExp("^[1-31]+$");
const month = new RegExp("^[1-12]+$");
const year = new RegExp("^[1900-2020]+$");
export default class CreateAnAccountScreen extends React.Component {

  constructor({ navigation }) {
    super();
    this.state = {
      nav: navigation,
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword:'',
      dob: '',
      day: '',
      month: '',
      year: '',
    };
  }

  // componentDidMount() {
  //   this.apiCall();
  // }

  async apiCall() {
    try {
      fetch('httpss://myvault.technology/api/users', {
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
            this.setState({confirmPassword:''})
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
    if (this.state.name === '' || this.state.surname === '' || this.state.email === '' || this.state.password === '' || !this.state.email.includes("@") || !this.state.email.includes(".com")) {
      Alert.alert('Oops', 'Please ensure valid data is entered in all fields!')
    }
    else if (!day.test(this.state.day)) {
      Alert.alert('Error posting date', 'Please ensure date is valid!');
    }
    else if (!month.test(this.state.month)) {
      Alert.alert('Error posting date', 'Please ensure date is valid!');
    }
    else if (this.state.day > 29 && this.state.month == 2) {
      Alert.alert('Error posting date', 'Please ensure date is valid!');
    }
    else if (!year.test(this.state.year)) {
      Alert.alert('Error posting date', 'Please ensure date is valid!');
    }
    else if (this.state.day > 30 && this.state.month == compareToMonths) {
      Alert.alert('Error posting date', 'Please ensure date is valid');
    }
    else if (!regex.test(this.state.password)){
      Alert.alert('Error','Password contains invalid characters!')
    }
    else if(this.state.password !== this.state.confirmPassword){
      Alert.alert('Error','Passwords do not match!')
    }
    else {
      this.apiCall();
      console.log('Sending credentials post to express server using name: ' + this.state.name + ' surname: ' + this.state.surname + ' email: ' + this.state.email + ' password: ' + this.state.password + ' dob: ' + this.state.dob);
    }
  }

  setDOB() {
    this.setState({
      dob: this.state.year + '-' + this.state.month + '-' + this.state.day
    }, () => { this.signup() });

  }

  render() {

    return (

      <View style={[styles.container, styles.central, { backgroundColor: 'darkgrey' }]}>

        <View>
          <Text style={styles.heading}>Sign Up</Text>
        </View>
        <View style={styles.formBox}>
          <View>

            <View style={{ flexDirection: 'row', width: '100%', padding: 5 }}>
              <Text style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>Name</Text>

              <TextInput style={{ flex: 2, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 0.4, borderColor: 'grey' }}
                onChangeText={(name) => this.setState({ name })}
                autoCapitalize={true}
              />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', padding: 5 }}>
              <Text style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>Surname</Text>

              <TextInput style={{ flex: 2, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 0.4, borderColor: 'grey' }}
                onChangeText={(surname) => this.setState({ surname })}
                autoCapitalize={true}
              />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', padding: 5 }}>
              <Text style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>Email</Text>

              <TextInput style={{ flex: 2, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 0.4, borderColor: 'grey' }}
                onChangeText={(email) => this.setState({ email })}
                autoCapitalize={false}
              />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', padding: 5 }}>
              <Text style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>Password</Text>

              <TextInput style={{ flex: 2, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 0.4, borderColor: 'grey' }}
                onChangeText={(password) => this.setState({ password })}
                autoCapitalize={false}
                secureTextEntry={true}
              />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', padding: 5 }}>
              <Text style={{ flex: 1, paddingTop: 0, paddingBottom: 0 }}>Confirm Password</Text>

              <TextInput style={{ flex: 2, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 0.4, borderColor: 'grey' }}
                onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                autoCapitalize={false}
                secureTextEntry={true}
              />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', padding: 5 }}>

              <Text style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>DOB</Text>

              <View style={{ flex: 2, paddingTop: 10, paddingBottom: 10, flexDirection: 'row' }}>
                <TextInput style={{ flex: 1, borderBottomWidth: 0.4, borderColor: 'grey', marginRight: 7, paddingTop: 5, paddingBottom: 5, textAlign: 'center' }} placeholder={'DD'} maxLength={2}
                  onChangeText={(day) => this.setState({ day })}
                />
                <TextInput style={{ flex: 1, borderBottomWidth: 0.4, borderColor: 'grey', marginRight: 7, paddingTop: 5, paddingBottom: 5, textAlign: 'center' }} placeholder={'MM'} maxLength={2}
                  onChangeText={(month) => this.setState({ month })}
                />
                <TextInput style={{ flex: 2, borderBottomWidth: 0.4, borderColor: 'grey', paddingTop: 5, paddingBottom: 5, textAlign: 'center' }} placeholder={'YYYY'} maxLength={4}
                  onChangeText={(year) => this.setState({ year })}
                />
              </View>
            </View>

          </View>
        </View>

        <View style={[styles.loginSignupButton,{borderRadius:100, width:100, height:100, justifyContent:'space-around'}]}>
          <TouchableOpacity onPress={() => this.setDOB()}>
            <Text style={{ fontSize: 15, textAlign: 'center' }}  >Sign up</Text>
          </TouchableOpacity>
        </View>

        <View>

          <TouchableOpacity onPress={() => this.state.nav.navigate('Login')}>
            <Text style={[styles.centerText, styles.actionText, { marginTop: 20, fontSize: 15 }]}>Sign in instead?</Text>
          </TouchableOpacity>
        </View>
      </View>





    );
  }
}
