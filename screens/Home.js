import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, BackHandler, Dimensions, Platform } from 'react-native';
import { Switch, ScrollView } from 'react-native-gesture-handler';
import { LineChart } from "react-native-chart-kit";
import styles from '../MyStyleSheet';
import Footer from '../components/Footer';
import { exp } from 'react-native-reanimated';
var lineChartLink = 'https://myvault.technology/api/analytics/MonthlyTotals';
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
var temp = [0];
var count = 0;
var dataLabels = [''];

export default class Home extends React.Component {

  constructor({ navigation }) {
    super();
    this.navigateUser = this.navigateUser.bind(this);
    this.state = {
      nav: navigation,
      lineData: [],
      array: [],
      isLoading: true,
      lineCurrency: 'EUR',
      expensesData: []
    }

  }

  navigateUser(screen) {
    this.props.navigation.navigate(screen);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backbutton);
    this.LineChartAPICall();
    this.ExpensesAPICall();

  }

  backbutton = () => {
    return true;
  }

  LineChartAPICall() {
    temp = [0];
    dataLabels = [''];
    fetch(lineChartLink + this.state.lineCurrency, {
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
          if (temp = []) {
            for (i = 0; i < response.size; i++) {
              temp.push(parseInt(response.datasets[i].data));
            }
          }
          for (i = 0; i < response.size; i++) {
            dataLabels.push(months[i])
          }
          this.setState({
            isLoading: false,
            array: temp
          })

          console.log(response.datasets)
        }

        else {
          alert('there was an error loading charts')
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }

  ExpensesAPICall() {
    fetch('https://myvault.technology/api/expenses/m', {
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
            expensesData: response.output,

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

  LineChartLinkEdit() {
    temp = [0];
    dataLabels = [''];
    lineChartLink = 'https://myvault.technology/api/analytics/MonthlyTotals';
    this.LineChartAPICall();
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
    global.currentScreen = 'Home';

    const line = {
      labels: dataLabels,
      datasets: [
        { data: temp }
      ],
    };

    if (this.state.isLoading) {
      return (
        <View style={[styles.container,{backgroundColor:global.dark}]}>
          <Text>Loading</Text>
        </View>
      )
    }
    else {
      let expenses = this.state.expensesData.map((val, key) => {
        if (count < 10) {
          count++;
          return <View key={key} style={[styles.container, { backgroundColor: global.dark }]} >
            <View style={{ height: 10 }}></View>
            <TouchableOpacity style={{ width: '95%', height: 80, alignSelf: 'center', backgroundColor: global.dark === '#303030'? '#505050' : 'darkgrey', borderRadius: 20, borderWidth: global.dark === 'grey' ? 1 : 0, shadowOpacity: 0.2, shadowRadius: 7, elevation: 11, margin: 10, marginBottom: 10 }}>
              <Text style={{ fontSize: 40, fontWeight: '600', position: 'absolute', top: Platform.OS === 'ios' ? 18 : 13, left: 20, color: global.color }}>{this.convertCurrency(val.transactionCurrency)}{val.expenseCost}</Text>
              <Text style={{ position: 'absolute', fontSize: 15, right: 30, top: 10 }}>{val.transactionDate.split('T00:00:00.000Z')}</Text>
              <Text style={{ position: 'absolute', fontSize: 25, right: 30, top: 40, maxWidth:'45%' }}>{val.transactionTitle}</Text>
            </TouchableOpacity>
          </View >
        }
        count = 0
      });
      return (
        <View style={[styles.container, { backgroundColor: global.dark }]} >

          <Text style={[styles.heading, { color: global.color }]}>MyVault</Text>

          <View style={styles.body}>

            <View style={{ width: '95%', alignSelf: 'center', height: 1, backgroundColor: global.dark === '#303030'? '#505050' : 'darkgrey', marginTop: 10, marginBottom: 50 }} />

            <LineChart
              data={line}
              width={Math.round(Dimensions.get('window').width) - 20} // from react-native
              height={Platform === 'ios' ? 250 : 200}
              fromZero={true}
              withInnerLines={false}
              withDots={false}
              chartConfig={{
                backgroundGradientFrom: global.dark,
                backgroundGradientTo: global.dark,
                fillShadowGradientOpacity: 0.1,
                fillShadowGradient: global.color,
                color: (opacity = 0) => global.dark === '#303030'? global.color : '#505050',
                strokeWidth: 2,

              }}
              bezier
              style={{
                alignSelf:'center',
                marginVertical: 8,
                borderRadius: 0
              }}
            />

            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'center', marginLeft: '5%', marginBottom: 20, top:-10 }}>

              <TouchableOpacity
                style={{ backgroundColor: this.state.lineCurrency === 'EUR' ? global.color : global.dark, width: 100, height: 30, top: 20, justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1 ,borderColor:global.dark==='white'? '#303030':'#909090'}}
                onPress={() => { this.setState({ lineCurrency: 'EUR' }, this.LineChartLinkEdit) }}

              >
                <Text style={[styles.expenseViewSortText,{color: global.dark==='white'? 'black':'#909090'}]}>EUR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.lineCurrency === 'GBP' ? global.color : global.dark, width: 100, height: 30, top: 20, justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1,borderColor:global.dark==='white'? '#303030':'#909090' }}
                onPress={() => { this.setState({ lineCurrency: 'GBP' }, this.LineChartLinkEdit) }}

              >
                <Text style={[styles.expenseViewSortText,{color: global.dark==='white'? 'black':'#909090'}]}>GBP</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.lineCurrency === 'USD' ? global.color : global.dark, width: 100, height: 30, top: 20, justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1, borderColor:global.dark==='white'? '#303030':'#909090' }}
                onPress={() => { this.setState({ lineCurrency: 'USD' }, this.LineChartLinkEdit) }}

              >
                <Text style={[styles.expenseViewSortText,{color: global.dark==='white'? 'black':'#909090'}]}>USD</Text>
              </TouchableOpacity>

            </View>

            <View style={{ width: '95%', alignSelf: 'center', height: 1, backgroundColor: global.dark === '#303030'? '#505050' : 'darkgrey', marginTop: 10, marginBottom: 0 }} />
            <ScrollView>

              <TouchableOpacity
                style={{ width: 80, height: 20, backgroundColor: 'transparent', justifyContent: 'space-around', marginTop: 20, borderWidth: 0.5, alignSelf: 'flex-end', marginRight: 20, borderColor: global.dark === '#303030'? 'lightgrey' : '#505050' }}
                onPress={() => { this.LineChartLinkEdit(), this.ExpensesAPICall() }}>
                <Text style={[styles.text, { fontSize: 12, color: global.dark === '#303030'? 'lightgrey' : '#505050' }]}>REFRESH</Text>
              </TouchableOpacity>

              {expenses}

              <TouchableOpacity
                style={{ width: '55%', height: 40, alignSelf: 'center', backgroundColor: 'grey', borderRadius: 20, borderWidth: global.dark === '#303030' ? 1 : 0, shadowOpacity: 0.2, shadowRadius: 7, elevation: 11, margin: 10, marginBottom: 10, justifyContent: 'space-around', marginBottom: 50 }}
                onPress={() => this.state.nav.navigate('ViewExpenses')}
              >
                <Text style={{ textAlign: 'center' }}>VIEW ALL EXPENSES</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>


          <Footer navigateUser={this.navigateUser} />

        </View >

      )
    }
  }
}