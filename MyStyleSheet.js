import { StyleSheet, Platform, ViewPagerAndroid } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


export default StyleSheet.create({

    // typography
    heading: {
        fontSize: 36,
        padding: 5,
        marginVertical: Platform.OS === 'ios'? 17: 10,
        marginHorizontal: 24,
        top: Platform.OS === 'ios'? 15:0
    },
    addExpenseHeading:{
        fontSize: 17,
        fontWeight:'200',
        textAlign:'center',
    },
    linkText: {
        fontSize: 18, 
    },
    smallText:{
        fontSize: 12,
        color: 'grey'
    },
    mutedText: {
        color: 'grey',
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
    },

    personalDetailsText:{
        fontSize: 20, 
        fontWeight: '500', 
        color: 'black',
        paddingBottom:15,
        paddingTop:15
    },

    homeScreenButtonText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '700',
    },


    //containers

    container: {
        flex:1,
        backgroundColor: 'white',

    },

    addExpenseTitleContainer:{
        flexDirection: 'row', 
        backgroundColor: 'grey', 
        alignSelf: 'center',
        borderRadius: 30,
        margin:20,
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
        shadowColor: "black",
        borderRadius: 25,
        borderWidth:1,

        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 7,
         
    },

    loginSignupButton : {
        width: '60%',
        top:15,
        borderRadius: 25,
        padding: 16,
        marginVertical: 12,
        marginHorizontal: 24,
        backgroundColor: 'lightgrey',
        shadowColor: "#707070",
        borderColor:'black',
        borderWidth:0.5,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 7,

        elevation: 11,
    },

    formBox : {
        width: '80%',
        borderRadius: 50,
        paddingVertical: 40,
        paddingHorizontal: 20,
        marginVertical: 12,
        marginHorizontal: 24,
        backgroundColor: 'lightgrey',
        shadowColor: "#707070",
        borderColor:'black',
        borderWidth:0.5,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 7,

        elevation: 11,
    },

    

    body: {
        flex: 10,
    },

    footer: {
        flex: 1,
        flexDirection: 'row',
        zIndex:1
    },
    footerItem: {
        
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
        backgroundColor: 'lightgrey',
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
        height: Platform.OS === 'ios' ? 390 : 350,
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
        right: 30,
        top: Platform.OS === 'ios' ? 105 : -5,
        borderRadius: 50,
        padding: 10
    },

    expenseTitleInput: {
        width: '80%',
        backgroundColor: 'grey',
        position: 'absolute',
        top: Platform.OS === 'ios' ? 30 : -65,
        left: 42,
        borderRadius: 50,
        padding: 10,
        textAlign: 'center',
        zIndex: 1,
    },

    periodicDateInput: {
        width: '25%',
        backgroundColor: 'grey',
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 30 : -65,
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

    periodicCategoryPicker: {
        width: Platform.OS === 'ios' ? 180 : '60%',
        bottom: Platform.OS === 'ios' ? 150 : 100,
        alignSelf: Platform.OS === 'ios'?'flex-end': 'center',
        marginRight:Platform.OS==='ios'? 10:0
    },

    Label2: {
        flex: 1,
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',
        top: Platform.OS === 'ios' ? 95 : -20
    },

    Label3: {
        flex: 1,
        padding: 20,
        fontSize: 20,
        fontWeight: 'bold',

    },

    viewDetails: {
        fontWeight: '300',
        fontSize: 20,
        paddingBottom: Platform.OS === 'ios'? 20:5,
        paddingTop: Platform.OS === 'ios'? 20:5
    },

    expenseViewSortText: {
        fontSize: 12,
        fontWeight: '700',
        textAlign: 'center',
        justifyContent:'space-around'

    },

    themecolorpickerbuttons:{
        flex:1, 
        marginLeft:25, 
        marginRight:25, 
        marginBottom:10, 
        width: 80, 
        height: 80, 
        borderRadius: 40, 
        justifyContent: 'space-around'
    }

}); 