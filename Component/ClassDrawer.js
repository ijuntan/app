import React , {Component} from 'react'
import {Text,View,Dimensions} from 'react-native'
import { Container, Content,Card,Fab,Icon} from 'native-base'

class ClassDrawer extends Component {
    render(){
    const title = (this.props.title?this.props.title:'Classes')
        return(
            <Container>
                <Content padder>
                    <View style={{alignItems:'center',justifyContent:'center',height: Dimensions.get('window').height*0.1}}>
                        <Text>{title}</Text>
                    </View>
                    <Card style={{alignItems:'center',justifyContent:'center',height: Dimensions.get('window').height*0.75}}>
                    <View style={{flex:1}}>
                    </View>
                    </Card>
                </Content>
                <Fab
                    active='false'
                    containerStyle={{marginBottom:10 }}
                    
                    style={{ backgroundColor: '#5067FF' }}
                >
                    <Icon name="add"/>
                </Fab>
            </Container>
        )
    }
}

export default ClassDrawer