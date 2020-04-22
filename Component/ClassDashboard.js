import React, {Component} from 'react'
import {View,Text,Dimensions,BackHandler} from 'react-native'
import Dialog  from 'react-native-dialog'
import { Body, Container, Content, Form, Card, ListItem, Fab, Icon , CheckBox, Button, Input} from 'native-base'
import { getClass } from '../libs/Firebase'


class ClassDashboard extends Component {
    constructor(props) {     
        super(props);     
        this.state = {
            items: [],
            visible: false,
            username : ''
        }
    }   

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress)

        if (this.props.items)
        {
            let items = this.props.items
            this.setState({items});
        }
        else
        {
            getClass().then((data) => {
                let items = data.map((item) => {
                    return {
                        name: item.data.name,
                        checked: false
                    }
                })
                this.setState({items})
            });
        }
    }   
    componentWillUnmount() {     
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);   
    }   
    handleBackPress = () => {     
        return true;
    }

    handleCheck = (index) => {
        let current = this.state.items
        current[index].checked = !current[index].checked
        this.setState({ items: current})
    }

    _showDialog = () => this.setState({ visible: true });

    _hideDialog = () => {
        this.setState({ visible: false })
        console.log('hide dialog');
    }

    saveUsername = (text) => {
        this.setState({username:text})
    }

    render(){
        const title = ( this.props.title ? this.props.title : 'class')
        return(
            <Container>
                <Content padder>
                    <View>
                            <Dialog.Container visible={this.state.visible}>
                                <Dialog.Title><Text>Input your {title}</Text></Dialog.Title>
                                <Form style={styles.coolform}
                                    >
                                        <Input 
                                            onChange={text=>this.saveUsername(text)}
                                            placeholder='Name'
                                            value={this.state.username}
                                        />
                                </Form>
                                <Dialog.Button label='Cancel' onPress={this._hideDialog}/>
                                <Dialog.Button label='Save' onPress={this._hideDialog}/>
                                
                                
                            </Dialog.Container>
                    
                    </View>
                    <Form style={{flex:1}}>
                        <Card style={{alignItems:'stretch',justifyContent:'flex-start',height: Dimensions.get('window').height*0.78}}>
                            <View>
                                {this.state.items.map((item,index)=>
                                        {
                                            return (
                                                <ListItem>
                                                    <CheckBox checked={item.checked} onPress={()=>this.handleCheck(index)} />
                                                    <Body>
                                                    <Text> {item.name}</Text>
                                                    </Body>
                                                </ListItem>
                                            )
                                        }
                                    )
                                }
                                
                            </View>
                            
                        </Card>
                    </Form>           
                </Content>
                <Fab
                    active='false'
                    containerStyle={{marginBottom:10 }}
                    style={{ backgroundColor: '#5067FF' }}
                    onPress={this._showDialog}
                >
                    <Icon name="add"/>
                </Fab>
            </Container>
        )
    }
}
export default ClassDashboard