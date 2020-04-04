import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styles from '../MyStyleSheet';
import Footer from '../components/Footer';
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';
var pieChartLink = 'http://myvault.technology/api/analytics/category';

export default class Analytics extends React.Component {

  constructor({ navigation }) {
    super();
    this.navigateUser = this.navigateUser.bind(this);
    this.state = {
      isLoading: true,
      pieData: [],
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
    const line = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        { data: [20, 45, 28, 80, 99, 43] },
      ],
    };

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Analytics</Text>

        <View style={styles.body}>
          <ScrollView>

            <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'grey', marginBottom: 50 }} />

            <View style={{ width: '100%' }}>
              <PieChart
                data={this.state.pieData}
                width={420}
                height={350}

                style={{ backgroundColor: 'white' }}
                hasLegend={true}
                absolute={false}
                chartConfig={{
                  backgroundColor: 'black',
                  color: (opacity = 0) => 'rgb(0, 0, 0)',
                  strokeWidth: 1, // optional, default 3
                  barPercentage: 0.5,
                }}
                accessor="population"
                paddingLeft='38'

              />
            </View>
            <View style={{ flex: 1, width: '90%', height: 60, alignSelf: 'center', flexDirection: 'row' }}>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'all' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around' }}
                onPress={() => this.getAllPie()}
              >
                <Text style={styles.expenseViewSortText}>ALL</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this week' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around' }}
                onPress={() => this.getWeekPie()}
              >
                <Text style={styles.expenseViewSortText}>THIS WEEK</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this month' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around' }}
                onPress={() => this.getMonthPie()}
              >
                <Text style={styles.expenseViewSortText}>THIS MONTH</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ backgroundColor: this.state.isClicked === 'this year' ? global.color : 'grey', width: '25%', height: '60%', top: '5%', justifyContent: 'space-around' }}
                onPress={() => this.getYearPie()}
              >
                <Text style={styles.expenseViewSortText}>THIS YEAR</Text>
              </TouchableOpacity>

            </View>
            <View>

              <View style={{ width: '90%', alignSelf: 'center', height: 1, backgroundColor: 'grey', marginTop: 50, marginBottom: 50 }} />

              <LineChart
                data={line}
                width={Dimensions.get('window').width} // from react-native
                height={240}
                yAxisLabel={'$'}
                chartConfig={{
                  backgroundColor: '#e26a00',
                  backgroundGradientFrom: 'black',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </View>
          </ScrollView>
        </View>

        <Footer navigateUser={this.navigateUser} />

      </View>
    )
  }
}