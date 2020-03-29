import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from '../MyStyleSheet';


export default class Footer extends React.Component {

  render() {
      return (
          < View style={styles.footer} >
           
            <TouchableOpacity style={styles.footerItem} onPress={() => this.props.navigateUser('Home')}>
              <Image source={require('../assets/wallet.png')} style={styles.footerIcon}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footerItem} onPress={() => this.props.navigateUser('Analytics')}>
              <Image source={require('../assets/chart.png')} style={styles.footerIcon}></Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footerItem} onPress={() => this.props.navigateUser('AddExpense')} >
              <Image source={require('../assets/plus.png')} style={styles.footerIcon} ></Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footerItem} onPress={() => this.props.navigateUser('ViewExpenses')}>
              <Image source={require('../assets/coins.png')} style={styles.footerIcon} ></Image>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footerItem} onPress={() => this.props.navigateUser('Profile')}>
              <Image source={require('../assets/profile.png')} style={styles.footerIcon} ></Image>
            </TouchableOpacity>
          
        </View >
        )
    }
}