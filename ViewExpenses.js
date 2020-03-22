import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import styles from './MyStyleSheet';

export default class ViewExpenses extends React.Component {

  constructor({ navigation }) {
    super();
    this.state = {
      nav: navigation,
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch('http://myvault.technology/api/expenses/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + global.clientToken,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          this.setState({
            isLoading: false,
            dataSource: response.output,
          })
        }
        else {
          alert('there was an error loading details')
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>

        </View>
      );
    }
    else {
      let expenses = this.state.dataSource.map((val, key) => {
        return <View style={styles.container} >

          <View style={{ height: 20 }}></View>
          <TouchableOpacity style={{ width: '95%', height: 80, alignSelf: 'center', backgroundColor: 'grey', borderRadius: 20 }}>
            <Text style={{ fontSize: 40, fontWeight: '600', position: 'absolute', top: Platform.OS === 'ios' ? 18 : 13, left: 30, color: '#26baee' }}>{val.expenseCost}</Text>
            <Text style={{ position: 'absolute', fontSize: 15, right: 30, top: 10 }}>{val.transactionDate}</Text>
            <Text style={{ position: 'absolute', fontSize: 25, right: 30, top: 40 }}>{val.transactionTitle}</Text>
          </TouchableOpacity>

        </View>
      });

      return (
        <View style={styles.container} >
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContainer}>
                <Text style={styles.HeaderText}>Expenses</Text>
              </View>
            </View>

            <View style={styles.body}>
              <ScrollView>
                {expenses}

              </ScrollView>
            </View>

            <View style={styles.footer}>
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
            </View>
          </View>
        </View>
      );
    }

  }
}