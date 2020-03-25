import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Modal, Platform } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import styles from './MyStyleSheet';
var APILink = 'http://myvault.technology/api/expenses/del/';

export default class ViewExpenses extends React.Component {
  constructor({ navigation }) {
    super();
    this.state = {
      nav: navigation,
      isLoading: true,
      show: false,
      id:'',
      title: '',
      amount: '',
      currency: '',
      date: '',
      category: '',
      online: false,
      cashcard: '',
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

  async apiCall() {
    APILink = APILink + this.state.id ;
    await fetch(APILink, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + global.clientToken,
      },
    })
      .then(response => (response.json()))
      .then((response) => {

        if (response.success) {
          this.setState({show:false})
          this.state.nav.navigate('Home')
          APILink = 'http://myvault.technology/api/expenses/del/';
        }
        else {
          console.log('Unsuccessful')
          console.log(response)
          Alert.alert('Oops!', 'Something went wrong removing the expense')
          this.state.nav.navigate('ViewExpenses')
        }
      })
      .catch(error => console.warn(error))

  }

   deleteExpense() {
      this.apiCall();
      console.log('removing record no. ' + this.state.id);
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
          <TouchableOpacity style={{ width: '95%', height: 80, alignSelf: 'center', backgroundColor: 'grey', borderRadius: 20 }} onPress={() => this.setState({ show: true, id: val.expenseid, title: val.transactionTitle, date: val.transactionDate, currency: val.transactionCurrency, category: val.expenseType, cashcard: val.transactionPlace, amount:val.expenseCost, online: val.transactionOnline})} >
            <Text style={{ fontSize: 40, fontWeight: '600', position: 'absolute', top: Platform.OS === 'ios' ? 18 : 13, left: 30, color: '#26baee' }}>{val.expenseCost}</Text>
            <Text style={{ position: 'absolute', fontSize: 15, right: 30, top: 10 }}>{val.transactionDate}</Text>
            <Text style={{ position: 'absolute', fontSize: 25, right: 30, top: 40 }}>{val.transactionTitle}</Text>
          </TouchableOpacity>
          
          < Modal transparent={true} visible={this.state.show} animationType={'fade'}>
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
              <View style={{ backgroundColor: '#26baee', padding: 70, borderRadius: 40, width: '90%', alignSelf: 'center', top: '12.5%', height: '75%', justifyContent:'space-around'}}>
                <TouchableOpacity style={{justifyContent:'space-around', width: 50, height: 50, borderRadius: 25, backgroundColor: 'grey', position: 'absolute', right: 30, top: 30}} onPress={() => { this.setState({ show: false })}}>
                  <Text style={{fontSize: 40, textAlign: 'center', borderColor:'black', color:'#26baee'}}>-</Text>
                </TouchableOpacity>
                <Text style={styles.viewExpenseDetails}>Title: {this.state.title}</Text>
                <Text style={styles.viewExpenseDetails}>Price: {this.state.amount}</Text>
                <Text style={styles.viewExpenseDetails}>Currency: {this.state.currency}</Text>
                <Text style={styles.viewExpenseDetails}>Date: {this.state.date}</Text>
                <Text style={styles.viewExpenseDetails}>Purchase : {this.state.online ? 'Online' : 'Local'}</Text>
                <Text style={styles.viewExpenseDetails}>Category: {this.state.category}</Text>
                <Text style={styles.viewExpenseDetails}>Purchased by: {this.state.cashcard}</Text>
                <TouchableOpacity style={{backgroundColor: 'grey', borderRadius: 20, height: 30, justifyContent:'space-around', top: 30}} onPress={() => this.deleteExpense()}>
                  <Text style={{color: '#26baee', fontSize:15, fontWeight: '500', textAlign: 'center'}}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal >
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