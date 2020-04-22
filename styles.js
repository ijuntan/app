import {StyleSheet, Dimensions} from 'react-native'
export default styles= StyleSheet.create ({
    firstmenu:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.785,
        backgroundColor:'#add8e6',
        margin:10
    },
    cardstyle:{
        height: Dimensions.get('window').height * 0.5,
        width: Dimensions.get('window').width * 0.8,
        justifyContent:'center',
        alignItems:'center'
    },
    loginpage:{
        flex:1,
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor:'#add8e6',
        margin:15
    },
    coolform:{
        flexDirection:'row', 
        width: window.width, 
        margin: 5, 
        padding:4, 
        alignItems:'center', 
        justifyContent:'center', 
        borderWidth:4, 
        borderColor:'#888', 
        borderRadius:5, 
        backgroundColor:'#fff'
    },
    tasks:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})

