import { StyleSheet, Platform, ViewPagerAndroid } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

dark = false;

export default StyleSheet.create({

    // typography
    heading: {
        fontSize: 36,
        padding: 6,
        marginVertical: 36,
        marginHorizontal: 24
    },
    linkText: {
        fontSize: 18, 
    },
    smallText:{
        fontSize: 12,
        color: 'grey'
    },
    centerText:{
        textAlign: 'center',
    },
    actionText: {
        color: 'darkslategrey'
    },
    mutedText: {
        color: 'grey',
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
    },

    homeScreenButtonText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '700',
    },


    //containers

    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%'

    },

    central: {
            flex: 1, 
            alignItems: 'center',
            justifyContent: 'center',
    },

    link: {
        padding: 16,
        marginVertical: 12,
        marginHorizontal: 24,
        backgroundColor: 'white',
        shadowColor: "lightgray",
        borderRadius: 6,

        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
         
    },

    roundButton : {
        width: '80%',
        borderRadius: 25,
        padding: 16,
        marginVertical: 12,
        marginHorizontal: 24,
        backgroundColor: 'white',
        shadowColor: "lightgray",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },

    formBox : {
        width: '80%',
        borderRadius: 25,
        paddingVertical: 32,
        paddingHorizontal: 16,
        marginVertical: 12,
        marginHorizontal: 24,
        backgroundColor: 'white',
        shadowColor: "lightgray",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },

    input : {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        marginBottom: 10,
        fontSize: 16,
        padding: 3,
        marginVertical: 6
    },

    body: {
        flex: 10,
    },

    footer: {
        flex: 1,
        flexDirection: 'row'
    },
    footerItem: {
        backgroundColor: 'lightgray',
         width: '20%'
    },
    footerIcon: {
        width: '50%',
         height: '60%',
          alignSelf: 'center',
           resizeMode: 'contain',
            
    },

    Homebutton1: {
        width: 150,
        height: 150,
        borderRadius: 50,
        backgroundColor: '#26baee',
        alignContent: 'center',
        justifyContent: 'center',
    },

    Homebutton2: {
        width: 150,
        height: 150,
        margin: 0,
        borderRadius: 80,
        backgroundColor: 'grey',
        alignContent: 'center',
        justifyContent: 'center',
    },

    Homebutton3: {
        width: 150,
        height: 150,
        margin: 0,
        borderRadius: 80,
        backgroundColor: 'darkgrey',
        alignContent: 'center',
        justifyContent: 'center',
    },

    Homebutton4: {
        width: 150,
        height: 150,
        margin: 0,
        borderRadius: 80,
        backgroundColor: 'lightgrey',
        alignContent: 'center',
        justifyContent: 'center',
    },

    SettingsButton: {
        width: 35,
        resizeMode: 'contain',
        position: 'absolute',
    },

    column: {
        display: 'flex',
        flexDirection: 'column',
    },

    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    centerRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    centerColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    

    buttonGrid: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
    },

    Label3: {
        flex: 1,
        zIndex: 11,
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',
        left: 30
    },

    AddExpenseContainer: {
        height: Platform.OS === 'ios' ? 420 : 300,
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
        borderRadius: 50,
        width: '96%',
        alignSelf: 'center'
    },

    currencyPicker: {
        width: Platform.OS === 'ios' ? 50 : 80,
        right: Platform.OS === 'ios' ? 45 : 30,
        top: Platform.OS === 'ios' ? 20 : -10
    },

    amountInput: {
        width: 120,
        backgroundColor: 'darkgrey',
        height: 40,
        right: 20,
        top: Platform.OS === 'ios' ? 105 : -5,
        borderRadius: 50,
        padding: 10
    },

    expenseTitleInput: {
        width: '80%',
        backgroundColor: 'darkgrey',
        position: 'absolute',
        top: Platform.OS === 'ios' ? 30 : -65,
        left: 42,
        borderRadius: 50,
        padding: 10,
        textAlign: 'center',
        zIndex: 1,
    },

    categoryPicker: {
        width: Platform.OS === 'ios' ? 180 : 200,
        bottom: Platform.OS === 'ios' ? 30 : 10,
        left: 20
    },

    Label2: {
        flex: 1,
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',
        top: Platform.OS === 'ios' ? 95 : -20
    },

    viewExpenseDetails: {
        fontWeight: '300',
        fontSize: 20,

    },

    expenseViewSortText: {
        fontSize: 12,
        fontWeight: '700',
        textAlign: 'center',
        justifyContent:'space-around'

    }

}); 