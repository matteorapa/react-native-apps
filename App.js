// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Switch, ScrollView } from 'react-native-gesture-handler';

function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style ={styles.HeaderText}>MyVault</Text>
        </View>
      </View>

      <View style={styles.body}>

        <View className="buttonGrid" style={styles.buttonGrid}>

          <View className="column" style={styles.column}>
            <View className="row" style={styles.row}>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Add Expense</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Add Income</Text>
              </TouchableOpacity>

            </View >
            <View className="row" style={styles.row}>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Add Target</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Revert Expense</Text>
              </TouchableOpacity>
              
            </View>
            <View className="row" style={styles.row}>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>My Overview</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Expense Chart</Text>
              </TouchableOpacity>

            </View>
          </View>
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

        <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('MyFinancials')}>
          <Image source ={require('./assets/coins.png')} style ={{width:'80%', height: '80%', alignSelf: 'center', resizeMode:'contain', top: 7}}></Image>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('MyProfile')}>
          <Image source ={require('./assets/profile.png')} style ={{width:'60%', height: '80%', alignSelf: 'center', resizeMode:'contain',  top: 4}}></Image>
        </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}


function MyProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <View style={styles.headerContainer}>
          <Text style ={styles.HeaderText}>My Profile</Text>

          <TouchableOpacity style={{position:'absolute',justifyContent:'center', right:20, padding:20}} onPress={() => navigation.navigate('Settings')}>
            <Image source ={require('./assets/settings.png')} style={styles.SettingsButton} ></Image>
          </TouchableOpacity>
          
        </View >
      </View>

      <View style={styles.body}>
        <View style={styles.SignInFormContainer}>
          <View style={styles.SignInForm}>
            <Text style={styles.UsernamePasswordText}>Username</Text>
            <TextInput style={styles.UsernamePasswordInput} placeholder={"Username"}></TextInput>

            <Text style={styles.UsernamePasswordText}>Password</Text>
            <TextInput style={styles.UsernamePasswordInput} placeholder={"Password"}></TextInput>
          </View>
        </View>
        <View style={{flex: 3}}>

          <View style ={{flex:1}}>
            <TouchableOpacity style={styles.SignInButton}>
              <Text style={styles.text}>Sign In</Text> 
            </TouchableOpacity>
          </View>
          <View style={{flex:2}}>
          <TouchableOpacity style={styles.CreateAnAccountTouchableOpacity} onPress={() => navigation.navigate('CreateAnAccount')}>
              <Text style={styles.CreateAnAccountTouchableOpacityText}>Create an Account</Text>
            </TouchableOpacity>
          </View>

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

          <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('MyFinancials')}>
            <Image source ={require('./assets/coins.png')} style ={{width:'80%', height: '80%', alignSelf: 'center', resizeMode:'contain', top: 7}}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('MyProfile')}>
            <Image source ={require('./assets/profile.png')} style ={{width:'60%', height: '80%', alignSelf: 'center', resizeMode:'contain',  top: 4}}></Image>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

function CreateAnAccountScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style ={styles.HeaderText}>Create an Account</Text>
      </View >

      <View style={styles.CreateAccountFormContainer}>
          <View style={styles.CreateAccountForm}>
            <Text style={styles.UsernamePasswordText}>Name</Text>
            <TextInput style={styles.UsernamePasswordInput} placeholder={"John"}></TextInput>
            <Text style={styles.UsernamePasswordText}>Surname</Text>
            <TextInput style={styles.UsernamePasswordInput} placeholder={"Doe"}></TextInput>
            <Text style={styles.UsernamePasswordText}>Email</Text>
            <TextInput style={styles.UsernamePasswordInput} placeholder={"johndoe@mailbox.com"}></TextInput>
            <Text style={styles.UsernamePasswordText}>Pasword</Text>
            <TextInput style={styles.UsernamePasswordInput} placeholder={"*********"}></TextInput>
          </View>
      </View> 

      <View style={{flex:2}}> 
        <TouchableOpacity style={styles.SignInButton}>
          <Text style={{fontSize: 20, textAlign:'center', color: '#26baee'}}>Go!</Text>
        </TouchableOpacity>
        <View style={{flex:1}}></View>

      </View>
    </View>
  );
}

function SettingsScreen({ navigation }) {

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

          <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('MyFinancials')}>
          <Image source ={require('./assets/coins.png')} style ={{width:'80%', height: '80%', alignSelf: 'center', resizeMode:'contain', top: 7}}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('MyProfile')}>
          <Image source ={require('./assets/profile.png')} style ={{width:'60%', height: '80%', alignSelf: 'center', resizeMode:'contain',  top: 4}}></Image>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

function UpcomingEventsScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style ={styles.HeaderText}>Upcoming Events</Text>
        </View>
      </View>

      <View style={styles.body}>
        <ScrollView>
          <TouchableOpacity style={{height: 100, backgroundColor: 'grey'}}>
            <Text style={{fontSize: 50, position: 'absolute', top: 10, left: 30}}>14</Text>
            <Text style={{fontSize: 20, position: 'absolute', bottom: 10, left: 30}}>March</Text>
            <Text style ={{position: 'absolute', fontSize: 30,right: 30, top: 30}}>Wuhan Trip</Text>
          </TouchableOpacity>
          <View style={{height: 20}}></View>
        </ScrollView>
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

        <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('MyFinancials')}>
          <Image source ={require('./assets/coins.png')} style ={{width:'80%', height: '80%', alignSelf: 'center', resizeMode:'contain', top: 7}}></Image>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('MyProfile')}>
          <Image source ={require('./assets/profile.png')} style ={{width:'60%', height: '80%', alignSelf: 'center', resizeMode:'contain',  top: 4}}></Image>
        </TouchableOpacity>

        </View>
      </View>
    </View>
    </View>
  );
}

function AnalyticsScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style ={styles.HeaderText}>Analytics</Text>
        </View>
      </View>

      <View style={styles.body}>

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

        <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('MyFinancials')}>
          <Image source ={require('./assets/coins.png')} style ={{width:'80%', height: '80%', alignSelf: 'center', resizeMode:'contain', top: 7}}></Image>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('MyProfile')}>
          <Image source ={require('./assets/profile.png')} style ={{width:'60%', height: '80%', alignSelf: 'center', resizeMode:'contain',  top: 4}}></Image>
        </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}

function MyFinancialsScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style ={styles.HeaderText}>My Financials</Text>
        </View>
      </View>

      <View style={styles.body}>

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

        <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('MyFinancials')}>
          <Image source ={require('./assets/coins.png')} style ={{width:'80%', height: '80%', alignSelf: 'center', resizeMode:'contain', top: 7}}></Image>
        </TouchableOpacity>

        <TouchableOpacity style={{ backgroundColor: 'lightgray', width: '20%' }} onPress={() => navigation.navigate('MyProfile')}>
          <Image source ={require('./assets/profile.png')} style ={{width:'60%', height: '80%', alignSelf: 'center', resizeMode:'contain',  top: 4}}></Image>
        </TouchableOpacity>

        </View>
      </View>
    </View>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="MyProfile" component={MyProfileScreen} options={{headerShown:false}}/>
        <Stack.Screen name="CreateAnAccount" component={CreateAnAccountScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown:false}}/>
        <Stack.Screen name="UpcomingEvents" component={UpcomingEventsScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Analytics" component={AnalyticsScreen} options={{headerShown:false}}/>
        <Stack.Screen name="MyFinancials" component={MyFinancialsScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

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