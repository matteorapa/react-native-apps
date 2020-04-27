import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, BackHandler, Dimensions, Platform } from 'react-native';
import { Switch, ScrollView } from 'react-native-gesture-handler';
import { LineChart } from "react-native-chart-kit";
import styles from '../MyStyleSheet';
import Footer from '../components/Footer';
import { exp } from 'react-native-reanimated';

const dataLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
var temp = [0];
var count = 0;
export default class Home extends React.Component {

  constructor({ navigation }) {
    super();
    this.navigateUser = this.navigateUser.bind(this);
    this.state = {
      nav: navigation,
      lineData: [],
      array: [],
      isLoading: true,
      dataSource: []
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
    fetch('http://myvault.technology/api/analytics/MonthlyTotals', {
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
            for (i = 0; i < 12; i++) {
              temp.push(parseInt(response.datasets[i].data));
            }
          }
          this.setState({
            isLoading: false,
            lineData: [],
            array: temp
          })

          console.log(this.state.array)
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

    const line = {
      labels: dataLabels,
      datasets: [
        { data: temp }
      ],
    };



    if (this.state.isLoading | this.state.dataSource === []) {
      return (
        <View style={styles.container}>
          <Text>An error occured loading your recent expenses</Text>
          <Text>View all your expenses?</Text>
        </View>
      )
    }
    else {
      let expenses = this.state.dataSource.map((val, key) => {
        if (count < 10) {

          count++;
          return <View key={key} style={[styles.container, { backgroundColor: global.dark }]} >
            <View style={{ height: 10 }}></View>
            <TouchableOpacity style={{ width: '95%', height: 80, alignSelf: 'center', backgroundColor: 'grey', borderRadius: 20, borderWidth: global.dark === 'grey' ? 1 : 0, shadowOpacity: 0.2, shadowRadius: 7, elevation: 11, margin: 10, marginBottom: 10 }}
              onPress={() => this.setState({ show: true, id: val.expenseid, title: val.transactionTitle, date: val.transactionDate, currency: val.transactionCurrency, category: val.expenseType, cashcard: val.transactionPlace, amount: val.expenseCost, online: val.transactionOnline })} >
              <Text style={{ fontSize: 40, fontWeight: '600', position: 'absolute', top: Platform.OS === 'ios' ? 18 : 13, left: 30, color: global.color }}>{val.expenseCost}</Text>
              <Text style={{ position: 'absolute', fontSize: 15, right: 30, top: 10 }}>{val.transactionDate.split('T00:00:00.000Z')}</Text>
              <Text style={{ position: 'absolute', fontSize: 25, right: 30, top: 40 }}>{val.transactionTitle}</Text>
            </TouchableOpacity>
          </View >
        }

      });

      return (
        <View style={[styles.container, { backgroundColor: global.dark }]} >

          <Text style={styles.heading}>MyVault</Text>

          <View style={styles.body}>

            <View style={{ width: '95%', alignSelf: 'center', height: 1, backgroundColor: global.dark === 'grey' ? 'black' : 'grey', marginTop: 10, marginBottom: 50 }} />

            <LineChart
              data={line}
              width={Math.round(Dimensions.get('window').width)} // from react-native
              height={Platform === 'ios'? 250:230}
              yAxisLabel={'€'}
              withInnerLines={false}
              withDots={false}
              chartConfig={{
                backgroundGradientFrom: global.dark,
                backgroundGradientTo: global.dark,
                fillShadowGradientOpacity: 0,
                color: (opacity = 0) => global.dark === 'grey' ? 'black' : 'black',
                strokeWidth: 2,

              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 0
              }}
            />

            <View style={{ width: '95%', alignSelf: 'center', height: 1, backgroundColor: global.dark === 'grey' ? 'black' : 'grey', marginTop: 30, marginBottom: 30 }} />
            <ScrollView>
              {expenses}

              <TouchableOpacity 
              style={{ width: '55%', height: 40, alignSelf: 'center', backgroundColor: 'grey', borderRadius: 20, borderWidth: global.dark === 'grey' ? 1 : 0, shadowOpacity: 0.2, shadowRadius: 7, elevation: 11, margin: 10, marginBottom: 10, justifyContent:'space-around', marginBottom:50}}
              onPress={() => this.state.nav.navigate('ViewExpenses')}
              >
                <Text style={{textAlign:'center'}}>VIEW ALL EXPENSES</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>


          <Footer navigateUser={this.navigateUser} />

        </View >

      )
    }
  }
}