import * as React from 'react';
import { View, Text, Modal, BackHandler } from 'react-native';
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
        BackHandler.addEventListener('hardwareBackPress', this.backbutton);
        setTimeout(() => {
            this.state.nav.navigate('Login')
        }, 2500);

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
                <View style={{ backgroundColor: 'transparent', flex: 1, width: 400, alignSelf: 'center', justifyContent: 'space-around' }}>
                    <View style={{ backgroundColor: global.color, height: 300, borderRadius: 40, justifyContent: 'space-around' }}>
                        <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>Goodbye</Text>
                        <Text style={{ textAlign: 'center', marginTop: '20%', fontSize: 20, fontWeight: '700' }}>You will be missed!</Text>
                    </View>
                </View >
            </Modal>
        )

    }
}