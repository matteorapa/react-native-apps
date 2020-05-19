import * as React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Modal, Picker } from 'react-native';
import styles from '../MyStyleSheet';
import Footer from '../components/Footer';
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';
var pieChartLink = 'https://myvault.technology/api/analytics/CategoryTotals';
var lineChartLink = 'https://myvault.technology/api/analytics/MonthlyTotals';
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const BarDataLabels = ['EUR', 'GBP', 'USD'];
var temp = [0];
var BarTemp = [0];
dataLabels = ['']; 
export default class Analytics extends React.Component {

  screenWidth = Math.round(Dimensions.get('window').width);

  constructor({ navigation }) {
    super();
    this.navigateUser = this.navigateUser.bind(this);
    this.state = {
      isLoading: true,
      pieData: [],
      lineData: [],
      barData: [],
      array: [],
      BarArray: [],
      isClicked: 'all',
      pieFilterModalShow: false,
      currencyFilter: 'EUR',
      timeFilter: 'a',
      lineCurrency: 'EUR',
    }
  }

  componentDidMount() {
    console.disableYellowBox = true;
    this.PieChartAPICall();
    this.LineChartAPICall();
    this.BarChartAPICall();
  }

  PieChartAPICall() {
    fetch(pieChartLink + this.state.currencyFilter + '/' + this.state.timeFilter + '/', {
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
            pieData: response.pieData,
          })
          console.log(this.state.pieData)
        }
        else {
          alert('there was an error loading charts')
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }

  LineChartAPICall() {
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

  BarChartAPICall() {
    fetch('https://myvault.technology/api/analytics/CurrencyTotals', {
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
          if (BarTemp = []) {
            for (i = 0; i < 3; i++) {
              BarTemp.push(parseInt(response.datasets[i].data));
            }
          }
          this.setState({
            isLoading: false,
            barData: [],
            BarArray: BarTemp
          })
          console.log(BarTemp)
        }



        else {
          alert('there was an error loading charts')
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }

  navigateUser(screen) {
    this.props.navigation.navigate(screen);
  }

  FilterPieChart() {
    this.setState({ pieData: [] })
    pieChartLink = 'https://myvault.technology/api/analytics/CategoryTotals';
    this.PieChartAPICall();
    this.setState({ pieFilterModalShow: false })
  }

  FilterLineChart() {
    temp = [0];
    dataLabels = [''];
    lineChartLink = 'https://myvault.technology/api/analytics/MonthlyTotals';
    this.LineChartAPICall();
  }


  render() {

      const line = {
        labels: dataLabels,
        datasets: [
          { data: temp }
        ],
      };
    

    const bar = {
      labels: BarDataLabels,
      datasets: [
        { data: BarTemp }
      ],
    };

    screenHeight = 0.35 * Math.round(Dimensions.get('window').height);

    return (
      <View style={[styles.container, { backgroundColor: global.dark }]} >
        <Text style={[styles.heading, { color: global.color }]}>Analytics</Text>

        <View style={styles.body}>
          <ScrollView>

            <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: global.dark === 'grey' ? 'black' : 'grey', marginBottom: 50 }} />

            <View>
              <PieChart
                data={this.state.pieData}
                width={screenWidth-20}
                height={screenHeight}
                style={{ backgroundColor: 'transparent', position: 'relative' }}
                hasLegend={true}
                absolute={false}
                chartConfig={{
                  color: (opacity = 0) => 'rgb(0, 0, 0)',
                  barPercentage: 0.5,
                }}
                accessor="population"
                paddingLeft='38'

              />

              <TouchableOpacity
                style={{ width: 150, height: 30, justifyContent: 'space-around', borderWidth: 1, alignSelf: 'center', marginTop: 25, borderColor:global.dark==='white'? '#303030':'#909090' }}
                onPress={() => this.setState({ pieFilterModalShow: true })}
              >
                <Text style={[styles.expenseViewSortText, {color: global.dark ==='white'? 'black': '#909090'}]}>FILTER</Text>
              </TouchableOpacity>

            </View>

            <View>

              <View style={{ width: '95%', alignSelf: 'center', height: 1, backgroundColor: global.dark === 'grey' ? 'black' : 'grey', marginTop: 50, marginBottom: 50 }} />

              <LineChart
                data={line}
                width={screenWidth-10} // from react-native
                height={240}
                withInnerLines={false}
                withDots={false}
                chartConfig={{
                  backgroundGradientFrom: global.dark,
                  backgroundGradientTo: global.dark,
                  fillShadowGradientOpacity: 0,
                  color: (opacity = 0) => global.dark === 'white' ? '#505050' : global.color,
                  strokeWidth: 2,

                }}
                bezier
                style={{
                  alignSelf:'center',
                  marginLeft:5,
                  marginVertical: 0,
                  borderRadius: 0
                }}
              />
            </View>

            <View style={{width: '90%',  flexDirection: 'row', justifyContent:'center',  marginLeft: '5%'}}>

              <TouchableOpacity
                style={{ backgroundColor: this.state.lineCurrency === 'EUR' ? global.color : global.dark, width: 100, height: 30, top: 20, justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1, borderColor:global.dark==='white'? '#303030':'#909090'}}
                onPress={() => { this.setState({ lineCurrency: 'EUR' }, this.FilterLineChart )}}
              >
                <Text style={[styles.expenseViewSortText, {color: global.dark ==='white'? 'black': '#909090'}]}>EUR</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.lineCurrency === 'GBP' ? global.color : global.dark, width: 100, height: 30, top: 20, justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1,borderColor:global.dark==='white'? '#303030':'#909090'}}
                onPress={() => { this.setState({ lineCurrency: 'GBP' }, this.FilterLineChart )}}
              >
                <Text style={[styles.expenseViewSortText, {color: global.dark ==='white'? 'black': '#909090'}]}>GBP</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.lineCurrency === 'USD' ? global.color : global.dark, width: 100, height: 30, top: 20, justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1,borderColor:global.dark==='white'? '#303030':'#909090' }}
                onPress={() => { this.setState({ lineCurrency: 'USD' }, this.FilterLineChart )}}
              >
                <Text style={[styles.expenseViewSortText, {color: global.dark ==='white'? 'black': '#909090'}]}>USD</Text>
              </TouchableOpacity>

            </View>

            <View style={{ width: '95%', alignSelf: 'center', height: 1, backgroundColor: global.dark === 'grey' ? 'black' : 'grey', marginTop: 50, marginBottom: 50 }} />

            <BarChart
              // style={graphStyle}
              data={bar}
              width={screenWidth}
              withInnerLines={false}
              height={400}
              fromZero={true}
              chartConfig={{
                backgroundGradientFrom: global.dark,
                backgroundGradientTo: global.dark,
                color: (opacity = 0) => global.dark==='white'? '#303030':global.color,
              }}
            />

            <View style={{ width: '95%', alignSelf: 'center', height: 1, backgroundColor: global.dark === 'grey' ? 'black' : 'grey', marginTop: 50, marginBottom: 50 }} />

          </ScrollView>
        </View>

        <Footer navigateUser={this.navigateUser} />


        < Modal transparent={true} visible={this.state.pieFilterModalShow} animationType={'none'}>
          <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'space-around' }}>
            <View style={{ backgroundColor: global.color, paddingLeft: 5, paddingRight: 5, paddingBottom: 20, paddingTop: 5, borderRadius: 40, width: '75%', alignSelf: 'center', justifyContent: 'center', height: '50%' }}>

              <TouchableOpacity style={{ justifyContent: 'space-around', width: 50, height: 50, borderRadius: 25, backgroundColor: 'grey', position: 'absolute', right: 30, top: 25 }} onPress={() => { this.setState({ pieFilterModalShow: false }) }}>
                <Text style={{ fontSize: 40, textAlign: 'center', color: 'white' }}>-</Text>
              </TouchableOpacity>


              <Picker
                style={[styles.categoryPicker, { left: '22%', top: 50 }]}
                selectedValue={this.state.currencyFilter}
                onValueChange={(itemValue, itemIndex) => this.setState({ currencyFilter: itemValue })}
              >
                <Picker.Item label="Euro (€)" value="EUR" />
                <Picker.Item label="Pound (£)" value="GBP" />
                <Picker.Item label="Dollar ($)" value="USD" />
              </Picker>

              <View style={{ flex: 1, width: '90%', alignSelf: 'center', flexDirection: 'row', height: 50, top: '20%' }}>

                <TouchableOpacity
                  style={{ backgroundColor: this.state.timeFilter === 'a' ? 'grey' : global.color, width: '50%', height: 30, top: '5%', justifyContent: 'space-around', borderWidth: 1, borderRightWidth: 0 }}
                  onPress={() => this.setState({ timeFilter: 'a' })}
                >
                  <Text style={styles.expenseViewSortText}>ALL</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ backgroundColor: this.state.timeFilter === 'w' ? 'grey' : global.color, width: '50%', height: 30, top: '5%', justifyContent: 'space-around', borderWidth: 1 }}
                  onPress={() => this.setState({ timeFilter: 'w' })}
                >
                  <Text style={styles.expenseViewSortText}>THIS WEEK</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, width: '90%', alignSelf: 'center', flexDirection: 'row', height: 50, top: 5 }}>
                <TouchableOpacity
                  style={{ backgroundColor: this.state.timeFilter === 'm' ? 'grey' : global.color, width: '50%', height: 30, top: '5%', justifyContent: 'space-around', borderWidth: 1, borderRightWidth: 0 }}
                  onPress={() => this.setState({ timeFilter: 'm' })}
                >
                  <Text style={styles.expenseViewSortText}>THIS MONTH</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ backgroundColor: this.state.timeFilter === 'y' ? 'grey' : global.color, width: '50%', height: 30, top: '5%', justifyContent: 'space-around', borderWidth: 1 }}
                  onPress={() => this.setState({ timeFilter: 'y' })}
                >
                  <Text style={styles.expenseViewSortText}>THIS YEAR</Text>
                </TouchableOpacity>

              </View>


              <TouchableOpacity style={{ backgroundColor: 'grey', width: 150, borderRadius: 20, height: 40, justifyContent: 'space-around', bottom: 10, alignSelf: 'center' }} onPress={() => this.FilterPieChart()}>
                <Text style={{ color: 'white', fontSize: 15, fontWeight: '300', textAlign: 'center' }}>APPLY FILTER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal >
      </View>
    )
  }
}