import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import Stack from './homeStack';
import Footer from './Footer';
import styles from './MyStyleSheet';

export default class Home extends React.Component {

  constructor({ navigation }) {
    super();
    this.state = { nav: navigation };
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Text style={styles.HeaderText}>MyVault</Text>
          </View>
        </View>

        <View style={styles.body}>

          <View className="buttonGrid" style={styles.buttonGrid}>

            <View className="column" style={styles.column}>
              <View className="row" style={styles.row}>

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.text}>Add Expense</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.text}>Add Income</Text>
                </TouchableOpacity>

              </View >
              <View className="row" style={styles.row}>

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.text}>Add Target</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.text}>Revert Expense</Text>
                </TouchableOpacity>

              </View>
              <View className="row" style={styles.row}>

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.text}>My Overview</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.text}>Expense Chart</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </View>

        < View style={styles.footer} >
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
        </View >

      </View>
    )
  }
}