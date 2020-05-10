import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, Modal, Platform, Picker } from 'react-native';
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
      showFilter: false,
      filterCategory: '',
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
    this.setState({ show: false })
    this.componentDidMount();
  }

  getAllExpenses() {
    APIGetByTimeLink = 'http://myvault.technology/api/expenses/';
    this.setState({ isClicked: 'all' })
    APIGetByTimeLink = APIGetByTimeLink;
    this.componentDidMount();
  }

  getWeekExpenses() {
    APIGetByTimeLink = 'http://myvault.technology/api/expenses/';
    this.setState({ isClicked: 'this week' })
    APIGetByTimeLink = APIGetByTimeLink + 'w';
    this.componentDidMount();
  }
  getMonthExpenses() {
    APIGetByTimeLink = 'http://myvault.technology/api/expenses/';
    this.setState({ isClicked: 'this month' })
    APIGetByTimeLink = APIGetByTimeLink + 'm';
    this.componentDidMount();
  }
  getYearExpenses() {
    APIGetByTimeLink = 'http://myvault.technology/api/expenses/';
    this.setState({ isClicked: 'this year' })
    APIGetByTimeLink = APIGetByTimeLink + 'y';
    this.componentDidMount();
  }

  convertCurrency(c) {

    switch (c) {
      case 'eur':
        return '€';

      case 'gbp':
        return '£';

      case 'usd':
        return '$';

      default:
        break;
    }
  }

  render() {
    global.currentScreen = 'ViewExpenses'

    if (this.state.isLoading) {
      return (
        <View style={[styles.container, { backgroundColor: global.dark }]}>
          <Text style={[styles.heading, { color: global.color }]}>Expenses</Text>
          <View style={styles.body}>
          </View>
          <Footer navigateUser={this.navigateUser} />
        </View>

      );
    }
    else if (this.state.dataSource[0] === undefined) {
      return (
        <View style={[styles.container, { backgroundColor: global.dark }]}>
          <View style={styles.header}>
            <View style={styles.headerContainer}>
              <Text style={[styles.heading, { color: global.color }]}>Expenses</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, width: '100%', alignSelf: 'center', flexDirection: 'row' }}>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'all' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1, borderWidth: this.state.isClicked === 'all' ? 1 : 0 }}
                onPress={() => this.getAllExpenses()}
              >
                <Text style={styles.expenseViewSortText}>ALL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this week' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1, borderWidth: this.state.isClicked === 'this week' ? 1 : 0 }}
                onPress={() => this.getWeekExpenses()}
              >
                <Text style={styles.expenseViewSortText}>THIS WEEK</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this month' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1, borderWidth: this.state.isClicked === 'this month' ? 1 : 0 }}
                onPress={() => this.getMonthExpenses()}
              >
                <Text style={styles.expenseViewSortText}>THIS MONTH</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this year' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1, borderWidth: this.state.isClicked === 'this year' ? 1 : 0 }}
                onPress={() => this.getYearExpenses()}
              >
                <Text style={styles.expenseViewSortText}>THIS YEAR</Text>
              </TouchableOpacity>

            </View>

            <View style={{ flex: 7, justifyContent: 'space-around' }}>
              <Text style={{ textAlign: 'center' }}>No expenses to show!</Text>
            </View>
          </View>

          <Footer navigateUser={this.navigateUser} />

        </View>
      );
    }
    else {
      let expenses = this.state.dataSource.map((val, key) => {
        if (val.expenseType == this.state.filterCategory | this.state.filterCategory === '') {
          return <View key={key} style={[styles.container, { backgroundColor: global.dark }]} >
            <View style={{ height: 10 }}></View>

            <TouchableOpacity style={{ width: '95%', height: 80, alignSelf: 'center', backgroundColor: global.dark==='white'? 'darkgrey' : '#505050', borderRadius: 20, borderWidth: global.dark === 'grey' ? 1 : 0, shadowOpacity: 0.2, shadowRadius: 7, elevation: 11, margin: 10, marginBottom: 10 }}
              onPress={() => this.setState({ show: true, id: val.expenseid, title: val.transactionTitle, date: val.transactionDate, currency: val.transactionCurrency, category: val.expenseType, cashcard: val.transactionPlace, amount: val.expenseCost, online: val.transactionOnline })} >
              <Text style={{ fontSize: 40, fontWeight: '600', position: 'absolute', top: Platform.OS === 'ios' ? 18 : 13, left: 30, color: global.color }}>{this.convertCurrency(val.transactionCurrency)}{val.expenseCost}</Text>
              <Text style={{ position: 'absolute', fontSize: 15, right: 30, top: 10 }}>{val.transactionDate.split('T00:00:00.000Z')}</Text>
              <Text style={{ position: 'absolute', fontSize: 25, right: 30, top: 40, maxWidth:'45%' }}>{val.transactionTitle}</Text>
            </TouchableOpacity>

            < Modal transparent={true} visible={this.state.show} animationType={'fade'}>
              <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center' }}>
                <View style={{ backgroundColor: global.color, paddingLeft: 20, paddingRight: 20, paddingBottom: 50, paddingTop: 20, borderRadius: 40, width: '90%', height: '60%', alignSelf: 'center', justifyContent: 'center' }}>
                  <ScrollView>

                    <TouchableOpacity style={{ justifyContent: 'space-around', width: 50, height: 50, borderRadius: 25, backgroundColor: 'grey', position: 'absolute', right: 20, top: 20 }} onPress={() => { this.setState({ show: false }) }}>
                      <Text style={{ fontSize: 40, textAlign: 'center', color: 'white' }}>-</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', marginTop: 80 }}>
                      <View style={{ alignItems: 'flex-start', flex: 4, marginRight: 20 }}>
                        <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Title</Text>

                        <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Category</Text>

                        <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Currency</Text>

                        <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Price</Text>

                        <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Date</Text>

                        <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Purchase</Text>

                        <Text style={[styles.viewDetails, { fontWeight: "600" }]}>Purchased by</Text>
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
                    <TouchableOpacity style={{ backgroundColor: 'grey', borderRadius: 20, height: 30, justifyContent: 'space-around', top: 30, marginBottom: 50 }} onPress={() => this.deleteExpense()}>
                      <Text style={{ color: 'white', fontSize: 15, fontWeight: '500', textAlign: 'center' }}>Remove</Text>
                    </TouchableOpacity>

                  </ScrollView>
                </View>
              </View>
            </Modal >
          </View >
        }
      });



      return (
        <View style={[styles.container, { backgroundColor: global.dark }]}>
          <View style={styles.header}>
            <View style={styles.headerContainer}>
              <Text style={[styles.heading, { color: global.color }]}>Expenses</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{ flex: 1, width: '100%', alignSelf: 'center', flexDirection: 'row' }}>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'all' ? global.color : 'darkgrey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1, borderWidth: this.state.isClicked === 'all' ? 1 : 0 }}
                onPress={() => { this.getAllExpenses(), this.setState({ filterCategory: "" }) }}
              >
                <Text style={styles.expenseViewSortText}>ALL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this week' ? global.color : 'darkgrey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1, borderWidth: this.state.isClicked === 'this week' ? 1 : 0 }}
                onPress={() => { this.getWeekExpenses(), this.setState({ filterCategory: "" }) }}
              >
                <Text style={styles.expenseViewSortText}>THIS WEEK</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this month' ? global.color : 'darkgrey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1, borderWidth: this.state.isClicked === 'this month' ? 1 : 0 }}
                onPress={() => { this.getMonthExpenses(), this.setState({ filterCategory: "" }) }}
              >
                <Text style={styles.expenseViewSortText}>THIS MONTH</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this year' ? global.color : 'darkgrey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1, borderWidth: this.state.isClicked === 'this year' ? 1 : 0 }}
                onPress={() => { this.getYearExpenses(), this.setState({ filterCategory: "" }) }}
              >
                <Text style={styles.expenseViewSortText}>THIS YEAR</Text>
              </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity
                style={{ padding: 10, backgroundColor: global.dark, width: 170, alignSelf: 'flex-start', marginLeft: '2.5%', borderWidth: 1, margin: 10,borderColor:global.dark==='white'? 'black':'#909090' }}
                onPress={() => this.componentDidMount()}
              >
                <Text style={[styles.text, { fontSize: 12,color:global.dark==='white'? 'black':'#909090' }]}>REFRESH</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ padding: 10, backgroundColor: global.dark, width: 170, alignSelf: 'flex-end', marginRight: '2.5%', borderWidth: 1, margin: 10, borderColor:global.dark==='white'? 'black':'#909090' }}
                onPress={() => this.setState({ showFilter: true })}
              >
                <Text style={[styles.text, { fontSize: 12, color:global.dark==='white'? 'black':'#909090' }]}>{this.state.filterCategory === '' ? 'FILTER' : 'FILTER: ' + this.state.filterCategory.toLocaleUpperCase()}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 7 }}>
              <ScrollView name='scroll'>
                {expenses}
              </ScrollView>
            </View>
          </View>

          <Footer navigateUser={this.navigateUser} />


          < Modal transparent={true} visible={this.state.showFilter} animationType={'none'}>
            <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'space-around' }}>
              <View style={{ backgroundColor: global.color, paddingLeft: 20, paddingRight: 20, paddingBottom: 50, paddingTop: 70, borderRadius: 40, width: '75%', alignSelf: 'center', justifyContent: 'center', height: '50%' }}>


                <TouchableOpacity style={{ justifyContent: 'space-around', width: 50, height: 50, borderRadius: 25, backgroundColor: 'grey', position: 'absolute', right: 30, top: 25 }} onPress={() => { this.setState({ showFilter: false }) }}>
                  <Text style={{ fontSize: 40, textAlign: 'center', color: 'white' }}>-</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row' }}>

                  <Picker
                    style={[styles.categoryPicker, { left: '22%' }]}
                    selectedValue={this.state.filterCategory}
                    onValueChange={(itemValue, itemIndex) => this.setState({ filterCategory: itemValue })}
                  >
                    <Picker.Item label="All" value="" />
                    <Picker.Item label="Groceries" value="Groceries" />
                    <Picker.Item label="Food" value="Food" />
                    <Picker.Item label="Shopping" value="Shopping" />
                    <Picker.Item label="Travel" value="Travel" />
                    <Picker.Item label="Leisure" value="Leisure" />
                    <Picker.Item label="Health" value="Health" />
                    <Picker.Item label="Home" value="Home" />
                    <Picker.Item label="Tech" value="Tech" />
                    <Picker.Item label="Utilities" value="Utilities" />
                    <Picker.Item label="Bills" value="Bills" />
                    <Picker.Item label="Other" value="Other" />
                  </Picker>


                </View>
                <TouchableOpacity style={{ backgroundColor: 'grey', borderRadius: 20, height: 40, justifyContent: 'space-around', bottom: 20 }} onPress={() => this.setState({ showFilter: false })}>
                  <Text style={{ color: 'white', fontSize: 15, fontWeight: '300', textAlign: 'center' }}>APPLY FILTER</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal >
        </View>


      );
    }
  }
}