import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constant from 'expo-constants'
import { Feather } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
  const navigation = useNavigation()
  const {colors} = useTheme() 
  const currentTheme = useSelector(state=>{
    return state.myDarMode
  }) 
  const mycolor = colors.iconColor
  const dispatch = useDispatch()
  return (
    <View>
      <View style={{
          marginTop:Constant.statusBarHeight,
          height:40,
          backgroundColor: colors.headerColor,
          flexDirection:"row",
          justifyContent:"space-between",
          elevation: 4,
          shadowOffset:{  width: 10,  height: 10,  },
          shadowColor: 'black',
          shadowOpacity: 1.0,
      }}>
          <View style={{
              flexDirection:"row",
              margin:5
          }}>
          <MaterialCommunityIcons style={{
              marginLeft:20
          }} 
          name="food-variant" size={36} color="blue" />
          <Text style={{
              fontSize:22,
              marginLeft:5,
              marginTop:5,
              color:mycolor,
              fontWeight: "bold"
          }}>MazeTab</Text>
          </View>
          <View style={{
              flexDirection:"row",
              justifyContent:"space-between",
              width:150,
              marginTop:5
          }}>
          <Feather name="compass" size={32} color={mycolor} />
          <MaterialCommunityIcons name="file-document-box-search-outline" size={32} color={mycolor} 
          onPress={()=>navigation.navigate("search")}
          />
          
          <MaterialCommunityIcons name="account-badge-horizontal-outline" size={32} color={mycolor}
          onPress={()=>dispatch({type:"change_theme",payload:!currentTheme})} />
          </View>
      </View>
    </View>
  );
}


