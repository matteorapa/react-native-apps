import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';
import Stack from './homeStack';

export default function Settings({ navigation }) {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Text style ={styles.HeaderText}>Settings</Text>
          </View>
        </View>
  
        <View style={styles.body}>
          <View style={{flex:1}}>
            <TouchableOpacity>
            <Text style={{fontSize:20, left: 80, color:'white'}}>Personal Details</Text> 
          </TouchableOpacity>
          </View>
          <View style={{flex:1}}> 
            <TouchableOpacity>
            <Text style={{fontSize:20, left: 80, color:'white'}}>Account Details</Text> 
          </TouchableOpacity>
          </View>
          <View style={{flex:1}}>
            <Text style={{fontSize:20, left: 80, color:'white'}}>Use face id</Text> 
          <Switch style={{position:'absolute', right: 80}}></Switch>
          </View>
          <View style={{flex:1}}> 
            <TouchableOpacity>
            <Text style={{fontSize:20, left: 80, color:'white'}}>Privacy Policy</Text> 
          </TouchableOpacity>
          </View>
          <View style={{flex:1}}> 
            <TouchableOpacity>
            <Text style={{fontSize:20, left: 80, color:'white'}}> Close Account</Text> 
          </TouchableOpacity>
          </View>
          <View style={{flex:1}}> 
            <TouchableOpacity onPress = {() => navigation.navigate('MyProfile')} style={{backgroundColor: 'darkgrey', padding: 20,}}>
            <Text style={{fontSize:20, left: 80, color:'red'}}>Log out</Text> 
          </TouchableOpacity>
          </View>
            
        </View>
  
        <View style={styles.footer}>
          <View style={{flexDirection: 'row' }}>
  
          <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('Home')}>
            <Image source ={require('./assets/wallet.png')} style ={{width:'50%', height: '70%', alignSelf: 'center', resizeMode:'contain', top:4}}></Image>
            </TouchableOpacity>
  
            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('UpcomingEvents')}>
            <Image source ={require('./assets/calendar.png')} style ={{width:'70%', height: '70%', alignSelf: 'center', resizeMode:'contain', top:7}}></Image>
            </TouchableOpacity>
  
            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('Analytics')}>
            <Image source ={require('./assets/chart.png')} style ={{width:'60%', height: '70%', alignSelf: 'center', resizeMode:'contain', top: 7}}></Image>
            </TouchableOpacity>
  
            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('Financials')}>
            <Image source ={require('./assets/coins.png')} style ={{width:'80%', height: '80%', alignSelf: 'center', resizeMode:'contain', top: 7}}></Image>
            </TouchableOpacity>
  
            <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('Profile')}>
            <Image source ={require('./assets/profile.png')} style ={{width:'60%', height: '80%', alignSelf: 'center', resizeMode:'contain',  top: 4}}></Image>
            </TouchableOpacity>
  
          </View>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({

    header:{
      flex: 2,
    },
  
    body:{
      flex:10,
    },
  
    footer:{
      flex:1,
    },
  
    headerContainer:{
      flex:2, 
      justifyContent:'center',
    },
  
    HeaderText: {
      fontSize: 30, 
      color: '#26baee', 
      textAlign: 'center', 
      top: 0, 
      fontWeight: 'bold',
    },
  
    button:{
      width: 150,
      height: 150,
      margin: 0,
      borderRadius: 80,
      backgroundColor: '#26baee',
      alignContent: 'center',
      justifyContent: 'center',
    },
  
    SettingsButton:{
      width:35, 
      resizeMode:'contain', 
      position:'absolute', 
    },
    
    column:{
      display: 'flex',
      flexDirection: 'column',
    },
    
    row:{
      display: 'flex',
      flexDirection: 'row',
    },
  
    buttonGrid:{
      flex: 1, 
      backgroundColor: 'transparent', 
      alignItems: 'center', 
      justifyContent: 'center'
    },
  
    container:{
      flex: 1, 
      backgroundColor: '#323232',
      width: '100%', 
      height: '100%',
      alignContent: 'center',
      justifyContent: 'center',
    },
  
    text:{
      textAlign:'center',
      fontSize: 15,
    },
  
   SignInFormContainer:{
      flex:5, 
      alignSelf: 'center',
      justifyContent: 'center',
      width: '70%',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      backgroundColor: 'lightgray',
    },
  
    SignInForm:{
      flex: 1,
      height: '100%',
      alignContent: 'center',
      justifyContent: 'center',
      //paddingBottom: 150,
    },
  
    UsernamePasswordText:{
      flex:1, 
      alignSelf: 'center', 
      top:20, 
      fontSize: 20, 
      fontWeight: 'bold',
    },
  
    UsernamePasswordInput:{
      flex: 1, 
      alignSelf: 'center',
    },
  
    SignInButton:{
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      top: 30,
      width: '50%',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      backgroundColor: 'lightgrey',
    },
  
    CreateAnAccountTouchableOpacity:{
      textAlign:'center', 
      padding: 5, 
      top:40,
    },
  
    CreateAnAccountTouchableOpacityText:{
      textAlign:'center',
      color: "#26baee",
    },
  
    CreateAccountFormContainer:{
      flex:6, 
      alignSelf: 'center',
      justifyContent: 'center',
      width: '70%',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      backgroundColor: 'lightgray',
    },
  
    CreateAccountForm:{
      flex: 1,
      height: '100%',
      alignContent: 'center',
      justifyContent: 'center',
    }
  }); 