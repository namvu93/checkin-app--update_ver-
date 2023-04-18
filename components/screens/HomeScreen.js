import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button } from "@react-native-material/core";
import { LinearGradient } from 'react-native-svg';

const HomeScreen = ({navigation}) => {
    const navigationChange = useNavigation();

    useLayoutEffect(() => {
        navigationChange.setOptions({
            headerShown: false,
        })
    },[])

  return (
    <SafeAreaView style={styles.viewContent}  >
        <Image
    source={require('../../assets/images/logo.png')}
      className="h-10 w-60 "/>

      <TouchableOpacity onPress={() => navigation.navigate('AdminLogIn')}
      className='border-2 border-indigo-600 h-12 rounded-md text-sm w-40 bg-indigo-700 justify-center items-center mt-14'>
        <Text className='text-base text-white font-medium'>Admin</Text>
      </TouchableOpacity>

      <View className='mt-5 px-4'>
      <TouchableOpacity onPress={() => navigation.navigate('UserCheckIn')}
      className='border-2 border-indigo-600 h-12 rounded-md text-sm w-40 bg-indigo-700 justify-center items-center'>
        <Text className='text-base text-white font-medium'>User</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    viewContent: {
    flex: 1,
    backgroundColor: 'grey' ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  AdminButton:{
    width:160,
    height:50,
    justifyContent:'center',
    alignItems:"center"
  },
  UserButton:{
    width:160,
    height:50,
    justifyContent:'center',
    alignItems:"center"
  },
  
});

export default HomeScreen