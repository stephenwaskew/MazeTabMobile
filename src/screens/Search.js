import React, { useState } from "react";
import { StyleSheet, Text, View,ScrollView,TextInput,FlatList,ActivityIndicator,Animated} from 'react-native';

import{ MaterialIcons } from "@expo/vector-icons";
import Constant from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import MiniCard from "../components/MiniCard";
import {useTheme} from '@react-navigation/native'

import {Ionicons} from '@expo/vector-icons'
import {useSelector,useDispatch} from 'react-redux'
//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=songs&type=video&key=AIzaSyDtCWCduSedfthvh

const SearchScreen = ({navigation})=>{
    const {colors} =  useTheme()
    const mycolor = colors.iconColor

    const [value,setValue] = useState("")
    // const [miniCardData,setMiniCard] = useState([])
    const dispatch = useDispatch()
    const miniCardData = useSelector(state=>{
        return state.cardData
    })
    const [loading,setLoading] = useState(false)
    const fetchData = () =>{
        setLoading(true)
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key="ADD API KEY HERE"`)
        .then(res=>res.json())
        .then(data=>{
            setLoading(false)
            dispatch({type:"add",payload:data.items})
            //setMiniCard(data.items)
        })
    }

  return (
    <View
      style={{
        flex: 1,
        marginTop: Constant.statusBarHeight,
      }}
    >
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-around",
          shadowOffset: { width: 5, height: 5 },
          shadowColor: "black",
          shadowOpacity: 1.0,
          backgroundColor: colors.headerColor,
        }}
      >
        <MaterialIcons
        style={{color:mycolor}}
          name="arrow-back"
          size={32}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <TextInput
          style={{ width: "70%", backgroundColor: "#e6e6e6" }}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
        <MaterialIcons
          style={{color:mycolor}}
          name="send"
          size={32}
          color="black"
          onPress={() => fetchData()}
        />
      </View>
     {loading ? <ActivityIndicator style={{marginTop:10}} size="large" color="red" />: null}
     <FlatList
     data={miniCardData}
     renderItem={({item})=>{
         return <MiniCard
         videoId={item.id.videoId}
         title={item.snippet.title}
         channel={item.snippet.channelTitle}
         />
     }}
     keyExtractor={item=>item.id.videoId}
     />
    </View>
  );
};

export default SearchScreen;
