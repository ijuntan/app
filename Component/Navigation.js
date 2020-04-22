import React, { Component } from 'react'
import ClassDashboard from './ClassDashboard'
import LoginPage from './LoginPage'
import TasksDashboard from './TasksDashboard'
import TasksDrawer from './TasksDrawer'
import Pomodoro from './Pomodoro'
import Setting from './Setting'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { View, TouchableOpacity } from 'react-native'
import SplashScreen from './SplashScreen'
import ClassDrawer from './ClassDrawer'
import { Icon } from 'native-base'

class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Icon name='menu' style={{paddingLeft:10}}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const Tab = createMaterialTopTabNavigator ({
  Class : { screen : ClassDashboard },
  Task : { screen : TasksDashboard }
},
{
  navigationOptions: () => {
    return {
      headerLeft: (
        <Icon name='menu' style={{paddingLeft:10}}/>
      )
    };
  }
}
)

const DrawerStack = createDrawerNavigator ({
  Dashboard: { screen : Tab },
  Classes:{ screen : ClassDrawer },
  Tasks:{ screen: TasksDrawer },
  Pomodoro: { screen: Pomodoro }, 
  Setting: { screen: Setting }     
  }
,
{
  navigationOptions: ({navigation})=>({headerLeft:<NavigationDrawerStructure navigationProps={navigation}/>})
},
)

const MenuNavigator = createStackNavigator({
  Drawer : { screen: DrawerStack } ,
  Login : { screen : LoginPage },
  Splash :{ screen : SplashScreen },
},
{
  initialRouteName:'Drawer',
}
)


export const MenuContainer = createAppContainer(MenuNavigator)
