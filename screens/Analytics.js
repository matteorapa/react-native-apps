import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styles from '../MyStyleSheet';
import Footer from '../components/Footer';
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";
var p = []

export default class Analytics extends React.Component {

  constructor({ navigation }) {
    super();
    this.navigateUser = this.navigateUser.bind(this);
    this.state ={
      isLoading:true,
      pieData: []
    }
  }

  componentDidMount() {
    fetch('http://myvault.technology/api/analytics/category', {
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
  render() {
    // var pieData = [
    //   {
    //     'name': 'Seoul',
    //     'x': 21500000,
    //     'color': '#1167b1',
    //     'legendFontColor': 'black',
    //     'legendFontSize': 15,
    //   },
    //   {
    //     name: 'Toronto',
    //     x: 2800000,
    //     color: 'yellow',
    //     legendFontColor: 'black',
    //     legendFontSize: 15,
    //   },
    //   {
    //     name: 'Beijing',
    //     x: 527612,
    //     color: 'red',
    //     legendFontColor: 'black',
    //     legendFontSize: 15,
    //   },
    //   {
    //     name: 'New York',
    //     x: 8538000,
    //     color: 'grey',
    //     legendFontColor: 'black',
    //     legendFontSize: 15,
    //   },
    //   {
    //     name: 'Moscow',
    //     x: 11920000,
    //     color: 'green',
    //     legendFontColor: 'black',
    //     legendFontSize: 15,
    //   },
    // ];
    const line = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
          strokeWidth: 4, // optional
        },
      ],
    };

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Analytics</Text>

        <View style={styles.body}>
          <View style={{ alignContent:'flex-end', backgroundColor:'grey', width: '100%', marginLeft:0}}>
            <PieChart
              data={this.state.pieData}
              width={420}
              height={350}
              
              style={{backgroundColor:'white', width:'100%'}}
              hasLegend={true}
              absolute={false}
              chartConfig={{
              backgroundColor:'black',
              color: (opacity = 0) => 'rgb(0, 0, 0)',
              strokeWidth: 1, // optional, default 3
              barPercentage: 0.5,
              }}
              accessor="population"
              paddingLeft = '38'
              
            />
          </View>
          <View>
            <Text>
              Bezier Line Chart
            </Text>
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
        </View>
        <Footer navigateUser={this.navigateUser} />
      </View>
    )
  }
}