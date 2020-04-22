import React, { Component } from 'react'
import { View, Text, Dimensions, Easing } from 'react-native'
import { Card, Header, Container, Content, Button, Icon, Form, Input } from 'native-base'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
class Pomodoro extends Component {
    constructor(props){
        super(props)
        this._circularProgressRef = React.createRef();
        this.state = {
            focusTime:25,
            time:'25:00',
            breakTime:5,
            fill:0,
            cycle:'Focus',
            cycleSession:true,
            timerId: null,
            timerRunning:false,
            seconds:0,
            minutes:25
        }
    }

    countdownTimer = () => {
        if (this.state.cycleSession==true)
        {
            this.state.cycle='Focus'
        }
        else
        {
            this.state.cycle='Break'
        }

        if (this.state.cycle=='Focus')
        {
            this.state.minutes=this.state.focusTime
        }
        else
        {
            this.state.minutes=this.state.breakTime
        }

        let second = this.state.minutes*60

        if (this.state.timerId != null)
        {
            let minutes = Math.floor(second/60)
            let seconds = second%60
            let time = ("0" + minutes).slice(-2) + ':' + ("0" + seconds).slice(-2)
            this._circularProgressRef.current.animate(0,0,Easing.linear)
            clearInterval(this.state.timerId);
            this.setState({
                timerId: null, 
                timerRunning:false,
                time: time,
            });
        }
        else
        {
            let timerId = setInterval(() =>{
                if(!this.state.time){
                   if (this.state.timerId != null)
                   {
                       clearInterval(timerId);
                       this.setState({timerId: null,cycleSession: !this.state.cycleSession,});
                   }
   
                  return false;
                }

            
                second = second - 1
                let minutes = Math.floor(second/60)
                let seconds = second%60
                let time = ("0" + minutes).slice(-2) + ':' + ("0" + seconds).slice(-2)
                if( time == '00:00'){
                    let time = ("0" + minutes).slice(-2) + ':' + ("0" + second).slice(-2)
                    this._circularProgressRef.current.animate(0,0,Easing.linear)
                    clearInterval(this.state.timerId);
                    this.setState({
                        timerId: null, 
                        timerRunning:true,
                        time: time,
                    });
                }
                this.setState({
                seconds: seconds,
                minutes: minutes,
                time: time,
                });
           },1000);
           this._circularProgressRef.current.animate(100, second*1000, Easing.linear)
           this.setState({
               seconds: this.state.seconds,
               minutes: this.state.minutes,
               timerId, 
               time: this.state.time,
               timerRunning: true
           })
        }
        
        
    };


    addFocusTime = () => {
        let focus = parseInt(this.state.focusTime) + 1
        let time = ("0" + focus).slice(-2) + ':00'
        if ( focus<60 ){
            this.setState({focusTime: focus, minutes:focus, time:time})
        }
    }

    minusFocusTime = () => {
        let focus = parseInt(this.state.focusTime) - 1
        let time = ("0" + focus).slice(-2) + ':00'
        if ( focus>0 ){
            this.setState({focusTime: focus, minutes:focus, time:time})
        }
    }

    addBreakTime = () => {
        let breakTime = this.state.breakTime + 1
        let time = ("0" + focus).slice(-2) + ':00'
        if ( focus<60 ){
            this.setState({breakTime: breakTime, minutes:breakTime, time:time})
        }
    }

    minusBreakTime = () => {
        let breakTime = this.state.breakTime - 1
        let time = ("0" + focus).slice(-2) + ':00'
        if ( focus>0 ){
            this.setState({breakTime: breakTime, minutes:breakTime, time:time})
        }
    }

   handleFocus = (text) => {
        let time = ("0" + text).slice(-2) + ':00'
       this.setState({focusTime:text, time:time, minutes:text})
   }
   

    handleFill = () => {
        this.setState({fill: 0})
    }

    render(){
        return(
            <Container>
                <Content padder>
                    <View style={{flex:1}}>
                        <Card style={{height: Dimensions.get('window').height * 0.85,}}>
                            <View style={{flex:8, alignItems:'center',justifyContent:'center'}}>
                                <AnimatedCircularProgress
                                    size={350}
                                    width={5}
                                    fill={this.state.fill}
                                    backgroundWidth={20}
                                    tintColor="#00e0ff"
                                    backgroundColor="#3d5875"
                                    rotation={0}
                                    ref={this._circularProgressRef}
                                >
                                {
                                    fill => (
                                    <View>
                                        <Text style={{fontSize:20,paddingLeft:45,paddingBottom:20}}>
                                            {this.state.cycle}
                                        </Text>
                                        <Text style={{fontSize:50,paddingBottom:30}}>
                                            {this.state.time}
                                        </Text>
                                    </View>
                                    )
                                }
                                </AnimatedCircularProgress>
                            </View>

                            <View style={{flex:1,flexDirection:'row',padding:20,alignItems:'center',justifyContent:'center'}}>
                                {   this.state.timerRunning == false
                                    ?
                                        <Button onPress={this.countdownTimer}> 
                                        <Text style={{fontSize:20,padding:10,color:'white'}}>
                                            Start
                                        </Text>
                                        </Button>
                                    :
                                        <Button onPress={this.countdownTimer}> 
                                        <Text style={{fontSize:20,padding:10,color:'white'}}>
                                            Stop
                                        </Text>
                                        </Button>
                                        
                                } 
                                <View style={{paddingLeft:10}}></View>  
                                <Button onPress={this.countdownTimer}> 
                                        <Text style={{fontSize:20,padding:10,color:'white'}}>
                                            Reset
                                        </Text>
                                </Button>
                            </View>

                            <View style={{flex:1,flexDirection:'row',paddingLeft:10,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{paddingRight:55,fontSize:20}}>
                                Focus
                            </Text>
                            <Text style={{paddingLeft:55,fontSize:20}}>
                                Break
                            </Text>
                            </View>

                            <View style={{flex:1,flexDirection:'row',paddingBottom:20,paddingLeft:20,alignItems:'center',justifyContent:'center'}}> 
                                <View style={{flex:1,flexDirection:'row',paddingLeft:20}}> 
                                    <Button onPress={this.minusFocusTime}>
                                        <Icon name="remove"/>
                                    </Button>
                                    
                                    <Form>
                                        <Input onChangeText={text=>this.handleFocus(text)}>
                                            <Text style={{padding:10}}>
                                                {this.state.focusTime}
                                            </Text>
                                        </Input>
                                    </Form>
                                    
                                    <Button onPress={this.addFocusTime}>
                                        <Icon name="add"/>
                                    </Button>
                                </View>

                                <View style={{flex:1,flexDirection:'row',paddingLeft:20}}> 
                                    <Button onPress={this.minusBreakTime}>
                                        <Icon name="remove"/>
                                    </Button>
                                    <Text style={{padding:10}}>
                                        {this.state.breakTime}
                                    </Text>
                                    <Button onPress={this.addBreakTime}>
                                        <Icon name="add"/>
                                    </Button>
                                </View>
                                
                            </View>

                            
                            
                            
                        </Card>
                    </View>
                </Content>
            </Container>
            
        )
    }
}

export default Pomodoro