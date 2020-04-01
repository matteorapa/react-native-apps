import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import styles from '../MyStyleSheet';
import Footer from '../components/Footer';
import { PieChart } from "react-native-chart-kit";


export default class Analytics extends React.Component {

  constructor({ navigation }) {
    super();
    this.navigateUser = this.navigateUser.bind(this);
  }

  navigateUser(screen) {
    this.props.navigation.navigate(screen);
  }
  render() {
    var pieData = [
      {
        name: 'Seoul',
        population: 21500000,
        color: 'blue',
        legendFontColor: 'black',
        legendFontSize: 15,
      },
      {
        name: 'Toronto',
        population: 2800000,
        color: 'yellow',
        legendFontColor: 'black',
        legendFontSize: 15,
      },
      {
        name: 'Beijing',
        population: 527612,
        color: 'red',
        legendFontColor: 'black',
        legendFontSize: 15,
      },
      {
        name: 'New York',
        population: 8538000,
        color: 'grey',
        legendFontColor: 'black',
        legendFontSize: 15,
      },
      {
        name: 'Moscow',
        population: 11920000,
        color: 'green',
        legendFontColor: 'black',
        legendFontSize: 15,
      },
    ];

    const cf = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5
    };

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Analytics</Text>

        <View style={styles.body}>
          <View>
            <PieChart
              data={pieData}
              width={220}
              height={220}
              chartConfig={cf}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>
        </View>
        <Footer navigateUser={this.navigateUser} />
      </View>
    )
  }
}