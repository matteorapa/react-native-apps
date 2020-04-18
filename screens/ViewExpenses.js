import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Modal, Platform } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import Footer from '../components/Footer';
import styles from '../MyStyleSheet';

var APIDelLink = 'http://myvault.technology/api/expenses/del/';
var APIGetByTimeLink = 'http://myvault.technology/api/expenses/';

export default class ViewExpenses extends React.Component {

  constructor({ navigation }) {
    super();

    this.state = {
      nav: navigation,
      isLoading: true,
      show: false,
      id: '',
      title: '',
      amount: '',
      currency: '',
      date: '',
      category: '',
      online: false,
      cashcard: '',
      isClicked: 'all',
    };

    this.navigateUser = this.navigateUser.bind(this);
    this.call = this.call.bind(this);
  }

  navigateUser(screen) {
    this.props.navigation.navigate(screen);
  }

  call(method) {
    getAllExpenses();
  }

  componentDidMount() {
    fetch(APIGetByTimeLink, {
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
    APIDelLink = APIDelLink + this.state.id;
    await fetch(APIDelLink, {
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
          this.setState({ show: false })
          this.state.nav.navigate('Home')
          APIDelLink = 'http://myvault.technology/api/expenses/del/';
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

  getAllExpenses() {
    this.setState({ isClicked: 'all' })
    APIGetByTimeLink = APIGetByTimeLink;
    this.componentDidMount();

    APIGetByTimeLink = 'http://myvault.technology/api/expenses/';
  }

  getWeekExpenses() {
    this.setState({ isClicked: 'this week' })
    APIGetByTimeLink = APIGetByTimeLink + 'w';
    this.componentDidMount();

    APIGetByTimeLink = 'http://myvault.technology/api/expenses/';
  }
  getMonthExpenses() {
    this.setState({ isClicked: 'this month' })
    APIGetByTimeLink = APIGetByTimeLink + 'm';
    this.componentDidMount();

    APIGetByTimeLink = 'http://myvault.technology/api/expenses/';
  }
  getYearExpenses() {
    this.setState({ isClicked: 'this year' })
    APIGetByTimeLink = APIGetByTimeLink + 'y';
    this.componentDidMount();

    APIGetByTimeLink = 'http://myvault.technology/api/expenses/';
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>My Expenses</Text>
          <View style={styles.body}>
          </View>
          <Footer navigateUser={this.navigateUser} />
        </View>

      );
    }
    else if (this.state.dataSource[0] === undefined) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContainer}>
              <Text style={styles.heading}>Expenses</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, width: '100%', alignSelf: 'center', flexDirection: 'row' }}>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'all' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around' }}
                onPress={() => this.getAllExpenses()}
              >
                <Text style={styles.expenseViewSortText}>ALL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this week' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around' }}
                onPress={() => this.getWeekExpenses()}
              >
                <Text style={styles.expenseViewSortText}>THIS WEEK</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this month' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around' }}
                onPress={() => this.getMonthExpenses()}
              >
                <Text style={styles.expenseViewSortText}>THIS MONTH</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this year' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around' }}
                onPress={() => this.getYearExpenses()}
              >
                <Text style={styles.expenseViewSortText}>THIS YEAR</Text>
              </TouchableOpacity>

            </View>

            <View style={{ flex: 7, justifyContent:'space-around' }}>
              <Text style ={{textAlign:'center'}}>No expenses to show!</Text>
            </View>
          </View>

          <Footer navigateUser={this.navigateUser} />

        </View>
      );
    }
    else {

      let expenses = this.state.dataSource.map((val, key) => {

        return <View key={key} style={styles.container} >
          <View style={{ height: 20 }}></View>

          <TouchableOpacity style={{ width: '95%', height: 80, alignSelf: 'center', backgroundColor: 'grey', borderRadius: 20 }} onPress={() => this.setState({ show: true, id: val.expenseid, title: val.transactionTitle, date: val.transactionDate, currency: val.transactionCurrency, category: val.expenseType, cashcard: val.transactionPlace, amount: val.expenseCost, online: val.transactionOnline })} >
            <Text style={{ fontSize: 40, fontWeight: '600', position: 'absolute', top: Platform.OS === 'ios' ? 18 : 13, left: 30, color: global.color }}>{val.expenseCost}</Text>
            <Text style={{ position: 'absolute', fontSize: 15, right: 30, top: 10 }}>{val.transactionDate.split('T00:00:00.000Z')}</Text>
            <Text style={{ position: 'absolute', fontSize: 25, right: 30, top: 40 }}>{val.transactionTitle}</Text>
          </TouchableOpacity>

          < Modal transparent={true} visible={this.state.show} animationType={'fade'}>
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
              <View style={{ flex: 1, backgroundColor: global.color, paddingLeft: 20, paddingRight: 20, paddingBottom: 50, paddingTop: 70, borderRadius: 40, width: '90%', alignSelf: 'center', justifyContent: 'center' }}>


                <TouchableOpacity style={{ justifyContent: 'space-around', width: 50, height: 50, borderRadius: 25, backgroundColor: 'grey', position: 'absolute', right: 30, top: 50 }} onPress={() => { this.setState({ show: false }) }}>
                  <Text style={{ fontSize: 40, textAlign: 'center', color: 'white' }}>-</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ alignItems: 'flex-start', flex: 4, marginRight: 20 }}>
                    <Text style={[styles.viewDetails]}>Title</Text>

                    <Text style={styles.viewDetails}>Category</Text>

                    <Text style={styles.viewDetails}>Currency</Text>

                    <Text style={styles.viewDetails}>Price</Text>

                    <Text style={styles.viewDetails}>Date</Text>

                    <Text style={styles.viewDetails}>Purchase</Text>

                    <Text style={styles.viewDetails}>Purchased by</Text>
                  </View>

                  <View style={{ flex: 0.1, height: '100%', backgroundColor: global.dark, zIndex: 1, alignSelf: 'center' }}></View>

                  <View style={{ alignItems: 'flex-end', marginLeft: 20, flex: 4 }}>
                    <Text style={styles.viewDetails}>{this.state.title}</Text>
                    <Text style={styles.viewDetails}>{this.state.category}</Text>
                    <Text style={styles.viewDetails}>{this.state.currency}</Text>
                    <Text style={styles.viewDetails}>{this.state.amount}</Text>
                    <Text style={styles.viewDetails}>{this.state.date.split('T00:00:00.000Z')}</Text>
                    <Text style={styles.viewDetails}>{this.state.online ? 'Online' : 'Local'}</Text>
                    <Text style={styles.viewDetails}>{this.state.cashcard}</Text>

                  </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: 'grey', borderRadius: 20, height: 30, justifyContent: 'space-around', top: 30 }} onPress={() => this.deleteExpense()}>
                  <Text style={{ color: 'white', fontSize: 15, fontWeight: '500', textAlign: 'center' }}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal >
        </View >

      });


      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContainer}>
              <Text style={styles.heading}>Expenses</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, width: '100%', alignSelf: 'center', flexDirection: 'row' }}>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'all' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around' }}
                onPress={() => this.getAllExpenses()}
              >
                <Text style={styles.expenseViewSortText}>ALL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this week' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around' }}
                onPress={() => this.getWeekExpenses()}
              >
                <Text style={styles.expenseViewSortText}>THIS WEEK</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this month' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around' }}
                onPress={() => this.getMonthExpenses()}
              >
                <Text style={styles.expenseViewSortText}>THIS MONTH</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this year' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around' }}
                onPress={() => this.getYearExpenses()}
              >
                <Text style={styles.expenseViewSortText}>THIS YEAR</Text>
              </TouchableOpacity>

            </View>

            <View style={{ flex: 7 }}>
              <ScrollView name='scroll'>
                {expenses}
              </ScrollView>
            </View>
          </View>

          <Footer navigateUser={this.navigateUser} />

        </View>
      );
    }
  }
}