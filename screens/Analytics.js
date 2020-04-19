import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styles from '../MyStyleSheet';
import Footer from '../components/Footer';
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';
import { Value } from 'react-native-reanimated';
var pieChartLink = 'http://myvault.technology/api/analytics/category';
const dataLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
var temp = [0];
export default class Analytics extends React.Component {

  constructor({ navigation }) {
    super();
    this.navigateUser = this.navigateUser.bind(this);
    this.state = {
      isLoading: true,
      pieData: [],
      lineData: [],
      array: [],
      isClicked: 'all'
    }
  }

  componentDidMount() {
    fetch(pieChartLink, {
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

    //line chart data

    fetch('http://myvault.technology/api/analytics/monthly', {
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
          for (i = 0; i < 12; i++) {
            temp.push(parseInt(response.datasets[i].data));
          }
          this.setState({
            isLoading: false,
            lineData: response.datasets,
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

  navigateUser(screen) {
    this.props.navigation.navigate(screen);
  }


  getAllPie() {
    this.setState({ isClicked: 'all' })
    pieChartLink = pieChartLink;
    this.componentDidMount();

    pieChartLink = 'http://myvault.technology/api/analytics/category';
  }

  getWeekPie() {
    this.setState({ isClicked: 'this week' })
    pieChartLink = pieChartLink + '/w';
    this.componentDidMount();

    pieChartLink = 'http://myvault.technology/api/analytics/category';
  }
  getMonthPie() {
    this.setState({ isClicked: 'this month' })
    pieChartLink = pieChartLink + '/m';
    this.componentDidMount();

    pieChartLink = 'http://myvault.technology/api/analytics/category';
  }
  getYearPie() {
    this.setState({ isClicked: 'this year' })
    pieChartLink = pieChartLink + '/y';
    this.componentDidMount();

    pieChartLink = 'http://myvault.technology/api/analytics/category';
  }


  render() {
    // let values = this.state.lineData.map((val, key) => {
    //   this.state.array.push(5)
    //   return null
    // })


    
    console.log("this " + this.state.array)
  
    const line = {
      labels: dataLabels,
      datasets: [
        { data: temp }

      ],

    };
    temp = [0]

    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = 0.35 * Math.round(Dimensions.get('window').height);

    return (
      <View style={[styles.container, { backgroundColor: global.dark }]}>
        <Text style={styles.heading}>Analytics</Text>

        <View style={styles.body}>
          <ScrollView>

            <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: global.dark === 'grey' ? 'black' : 'grey', marginBottom: 50 }} />

            <View >
              <PieChart
                data={this.state.pieData}
                width={screenWidth}
                height={screenHeight}
                style={{ backgroundColor: global.dark }}
                hasLegend={true}
                absolute={false}
                chartConfig={{
                  color: (opacity = 0) => 'rgb(0, 0, 0)',
                  barPercentage: 0.5,
                }}
                accessor="population"
                paddingLeft='38'

              />
            </View>
            <View style={{ flex: 1, width: '95%', height: 60, alignSelf: 'center', flexDirection: 'row' }}>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'all' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1, borderWidth: this.state.isClicked === 'all' ? 1 : 0 }}
                onPress={() => this.getAllPie()}
              >
                <Text style={styles.expenseViewSortText}>ALL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this week' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1, borderWidth: this.state.isClicked === 'this week' ? 1 : 0 }}
                onPress={() => this.getWeekPie()}
              >
                <Text style={styles.expenseViewSortText}>THIS WEEK</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this month' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1, borderWidth: this.state.isClicked === 'this month' ? 1 : 0 }}
                onPress={() => this.getMonthPie()}
              >
                <Text style={styles.expenseViewSortText}>THIS MONTH</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this year' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around', borderBottomWidth: 1, borderTopWidth: 1, borderWidth: this.state.isClicked === 'this year' ? 1 : 0 }}
                onPress={() => this.getYearPie()}
              >
                <Text style={styles.expenseViewSortText}>THIS YEAR</Text>
              </TouchableOpacity>

            </View>
            <View>

              <View style={{ width: '95%', alignSelf: 'center', height: 1, backgroundColor: global.dark === 'grey' ? 'black' : 'grey', marginTop: 50, marginBottom: 50 }} />
              
              <LineChart
                data={line}
                width={Dimensions.get('window').width} // from react-native
                height={240}
                yAxisLabel={'$'}
                withInnerLines={false}
                withDots={false}
                chartConfig={{
                  backgroundGradientFrom: global.dark,
                  backgroundGradientTo: global.dark,
                  fillShadowGradientOpacity: 0,
                  color: (opacity = 0) => global.color === 'grey' ? 'white' : 'black',
                  strokeWidth: 2,

                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 0
                }}
              />
            </View>

            <View style={{ width: '95%', alignSelf: 'center', height: 1, backgroundColor: global.dark === 'grey' ? 'black' : 'grey', marginTop: 50, marginBottom: 50 }} />


          </ScrollView>
        </View>

        <Footer navigateUser={this.navigateUser} />

      </View>
    )
  }
}