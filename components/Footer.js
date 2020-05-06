import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from '../MyStyleSheet';


export default class Footer extends React.Component {

  render() {
    return (
      < View style={styles.footer} >



        <TouchableOpacity style={[styles.footerItem, {backgroundColor: global.dark === '#303030'? '#707070' : 'lightgrey'}]} onPress={() => this.props.navigateUser('Home')}>
          <Image source={require('../assets/wallet.png')} style={styles.footerIcon}></Image>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.footerItem, {backgroundColor: global.dark === '#303030'? '#707070' : 'lightgrey'}]} onPress={() => this.props.navigateUser('Analytics')}>
          <Image source={require('../assets/chart.png')} style={styles.footerIcon}></Image>
        </TouchableOpacity>

        <View style={{ backgroundColor: global.dark === '#303030'? '#707070' : 'lightgrey', width: '20%' }} >
          <View style={{ position: "absolute", backgroundColor: global.dark === '#303030'? '#707070' : 'lightgrey', height: 80, width: 80, borderRadius: 50, top: -30, alignSelf: 'center' }}>
            <View style={{ zIndex: 2, position: "absolute", backgroundColor: global.color, height: 55, width: 55, borderRadius: 50, alignSelf: 'center', top: 10 }}>
              <TouchableOpacity style={{ position: "absolute", width: '63%', backgroundColor: global.color, height: '85%', borderRadius: 80, alignSelf: 'center', top: 2 }} onPress={() => this.props.navigateUser('AddExpense')} >
                <Image source={require('../assets/plus.png')} style={{ position: 'absolute', top: 0, width: '150%', height: '100%', alignSelf: 'center', resizeMode: 'contain', top: 3 }}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={[styles.footerItem, {backgroundColor: global.dark === '#303030'? '#707070' : 'lightgrey'}]}onPress={() => this.props.navigateUser('ViewExpenses')}>
          <Image source={require('../assets/coins.png')} style={styles.footerIcon} ></Image>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.footerItem, {backgroundColor: global.dark === '#303030'? '#707070' : 'lightgrey'}]} onPress={() => this.props.navigateUser('Profile')}>
          <Image source={require('../assets/profile.png')} style={styles.footerIcon} ></Image>
        </TouchableOpacity>

      </View >

    )
  }
}