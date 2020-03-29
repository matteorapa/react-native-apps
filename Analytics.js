import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Switch, ScrollView, AutoScrolling } from 'react-native-gesture-handler';
import styles from './MyStyleSheet';
import Footer from './Footer';
export default class Analytics extends React.Component {

  constructor({ navigation }) {
    super();
    this.state = { nav: navigation };
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Text style={styles.HeaderText}>Analytics</Text>
          </View>
        </View>

        <View style={styles.body}>
        </View>

        < View style={styles.footer} >
          <View style={{ position: "absolute", backgroundColor: 'lightgrey', height: 80, width: 80, borderRadius: 50, top: -17, alignSelf: 'center' }}></View>
          <View style={{ zIndex: 1, position: "absolute", backgroundColor: global.color, height: 55, width: 55, borderRadius: 50, top: -5, alignSelf: 'center' }}>
            <TouchableOpacity style={{ position: "absolute", width: '63%', backgroundColor: global.color, height: '85%', borderRadius: 80, alignSelf: 'center', top: 2 }} onPress={() => this.state.nav.navigate('AddExpense')} >
              <Image source={require('./assets/plus.png')} style={{ position: 'absolute', top: 0, width: '90%', height: '80%', alignSelf: 'center', resizeMode: 'contain', top: 7 }}></Image>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('Home')}>
              <Image source={require('./assets/wallet.png')} style={{ width: '50%', height: '70%', alignSelf: 'center', resizeMode: 'contain', top: 4 }}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('Analytics')}>
              <Image source={require('./assets/chart.png')} style={{ width: '60%', height: '70%', alignSelf: 'center', resizeMode: 'contain', top: 7 }}></Image>
            </TouchableOpacity>

            <View style={{ backgroundColor: 'lightgray', width: '20%' }} >

            </View>

            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('ViewExpenses')}>
              <Image source={require('./assets/coins.png')} style={{ width: '80%', height: '80%', alignSelf: 'center', resizeMode: 'contain', top: 7 }}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => this.state.nav.navigate('Profile')}>
              <Image source={require('./assets/profile.png')} style={{ width: '60%', height: '80%', alignSelf: 'center', resizeMode: 'contain', top: 4 }}></Image>
            </TouchableOpacity>
          </View>
        </View >


      </View>
    )
  }
}