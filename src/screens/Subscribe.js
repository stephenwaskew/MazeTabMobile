import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constant from 'expo-constants';
import Header from '../components/Header';

const Subscribe = () => {
    return (
        <View style={{
            flex:1,
            marginTop:Constant.statusBarHeight,
            }}>
            <Header />
            <Text>
                Subscribe to videos
            </Text>


        </View>
    )
}

export default Subscribe