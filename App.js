import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Constant from 'expo-constants';
import {NavigationContainer,DefaultTheme,DarkTheme,useTheme} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { StyleSheet, Text, View } from 'react-native';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import VideoPlayer from './src/screens/VideoPlayer';
import Subscribe from './src/screens/Subscribe';
import {reducer} from './src/reducers/reducer';
import {themeReducer} from './src/reducers/themeReducer'

import {Provider, useSelector} from 'react-redux'

import {createStore, combineReducers} from 'redux'
import Explore from './src/screens/Explore';

const customDarkTheme={
  ...DarkTheme,
  colors:{
    ...DarkTheme.colors,
    headerColor:"#404040",
    iconColor:"white",
    tabIcon:"white"
  }
}

const customDefaultTheme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    headerColor:"white",
    iconColor:"black",
    tabIcon:"red"
  }
}

const rooReducer = combineReducers({
  cardData:reducer, //[],
  myDarMode:themeReducer//false
})
const store = createStore(rooReducer)

const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator()


const RootHome = () => {
  const {colors} = useTheme()
  return (
    <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name === 'home') {
          iconName = 'home';
        } else if (route.name === 'add item') {
          iconName = 'add';
        } else if (route.name === 'subscribe') {
          iconName = 'subscriptions'
        }

        // You can return any component that you like here!
        return <MaterialIcons name={iconName} size={32} color={color} />;
        
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.tabIcon,
      inactiveTintColor: 'gray',
    }}
    
    >
      <Tabs.Screen name="home" component={Home} />
      <Tabs.Screen name="add item" component={Explore} />
      <Tabs.Screen name="subscribe" component={Subscribe} />
    </Tabs.Navigator>
  )
}

export default App = ()=>{
  return(
     <Provider store={store}>
      <Navigation />
    </Provider>
  )
 
}

export function Navigation() {

  let currentTheme = useSelector(state=>{
    return state.myDarMode
  })
  return (
 
      <NavigationContainer theme={currentTheme?customDarkTheme:customDefaultTheme}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="rootHome" component={RootHome} />
          <Stack.Screen name="search" component={Search} />
          <Stack.Screen name="videoplayer" component={VideoPlayer} />
        </Stack.Navigator>
      </NavigationContainer>
   
  );
}
