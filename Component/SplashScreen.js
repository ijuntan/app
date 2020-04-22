import React, {Component} from 'react'
import {View,Button,TextInput,Text} from 'react-native'
import {Container, Header, Content, Card, CardItem, Icon, Footer} from 'native-base'
import styles from '../styles'

class SplashScreen extends Component{
    static navigationOptions ={
        header: null
    }
    changeToLogin = () => {
        this.props.navigation.navigate('Login')
    }

    render(){
        setTimeout(this.changeToLogin,2000)

        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text>SplashScreen </Text>
            </View>
        )
    }
}

export default SplashScreen;