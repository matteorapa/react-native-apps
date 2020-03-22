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
        </View >

      </View>
    )
  }
}