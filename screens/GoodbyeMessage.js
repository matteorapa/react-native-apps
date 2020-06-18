import * as React from 'react';
import { View, Text, Modal, BackHandler, Image } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default class splashScreen extends React.Component {

    constructor({ navigation }) {
        super();
        this.state = {
            nav: navigation,
        };
    }

    backbutton = () => {
        return true;
    }

    componentDidMount() {
        console.disableYellowBox = true;
        BackHandler.addEventListener('hardwareBackPress', this.backbutton);
        setTimeout(() => {
            this.state.nav.navigate('Login')
        }, 4000);

        this.delete();
    }

    delete() {
        fetch('https://myvault.technology/api/users', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + global.clientToken,
            }
        })
            .then(response =>
                response.json().then(json => {
                    return json;
                })
            )
            .catch(error => console.warn(error))
    }

    render() {

        return (


            <Modal animationType={'fade'} transparent={true}>
                <View style={{ backgroundColor: global.dark === '#303030' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)', flex: 1, width: 400, alignSelf: 'center', justifyContent: 'space-around' }}>
                    <View style={{ backgroundColor: global.color, height: 300, borderRadius: 40, justifyContent: 'space-around' }}>
                        <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>Goodbye</Text>
                        <View style={{flexDirection:'row', justifyContent:'center', top:40, margin:'5%'}}>
                            
                            <Image style={{resizeMode:'contain', width:150, position:'absolute', top:-200}}source={require('../assets/vault.png')}>

                            </Image>
                        </View>
                        <Text style={{ textAlign: 'center', marginTop: '20%', fontSize: 20, fontWeight: '700' }}>Your vault is now closed permanently!</Text>
                    </View>
                </View >
            </Modal>
        )

    }
}