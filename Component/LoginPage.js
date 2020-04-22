import React,{Component} from 'react'
import {Dimensions} from 'react-native'
import { Icon ,Container, Card, CardItem, Content, Form, Input ,Text, Footer, Header,Item, Label, Button, View} from 'native-base';
import styles from '../styles'

class LoginPage extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        username:'',
        password:'',
        hidePassword: true,
        hideState:<Icon name='eye'/>
    }
    saveUsername = (text) => {
        this.setState({username:text})
    }

    savePassword = (text) => {
        this.setState({password:text})
    }

    handlePassword = () =>{
        this.setState(prevState =>  
            ({  hideState: prevState.hideState == <Icon name='eye'/> ? <Icon name='eye-closed'/> : <Icon name='eye'/>,
                hidePassword : !this.state.hidePassword
            }))
    }

    render(){
        return(
            <Container>
                <Header/>
                <Form style={styles.loginpage}>
                    <Content padder>
                        <Form style={{alignItems:'center'}}>
                            <Card style={{marginBottom:20,width: Dimensions.get('window').width * 0.5}}>
                                <CardItem bordered style={{justifyContent:'center'}} >
                                    <Text>MyAPP v.1.0.0</Text>
                                </CardItem>
                            </Card>
                            <Card>
                                <CardItem bordered>
                                    <Form style={styles.coolform}
                                    >
                                        <Input 
                                            onChange={text=>this.saveUsername(text)}
                                            placeholder='Username'
                                            value={this.state.username}
                                        />
                                    </Form>
                                </CardItem>
                                <CardItem bordered>
                                    <Form style={styles.coolform}>
                                        <Form style={{flex:3}}> 
                                            <Input 
                                                onChangeText={text=>this.savePassword(text)}
                                                placeholder='Password'
                                                secureTextEntry={this.state.hidePassword}
                                                value={this.state.password}
                                            />
                                        </Form>
                                        <Form style={{flex:1}}>
                                            <Button  
                                                onPress={()=>this.handlePassword()} 
                                                transparent
                                            >
                                                <Text>{this.state.hideState}</Text>
                                            </Button>
                                        </Form>
                                    </Form>
                                </CardItem>
                            </Card>
                        </Form>
                        <Form style={{width:85,marginLeft:140,marginTop:50}}>
                            <Button rounded onPress={()=>this.props.navigation.navigate('Class')}>
                                <Text>Login</Text>
                            </Button>
                        </Form>
                    </Content>
                </Form>
            </Container>
        )
    }
}

export default LoginPage