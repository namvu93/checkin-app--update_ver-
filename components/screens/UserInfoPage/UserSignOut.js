import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState, useContext } from "react";
import { useNavigation } from '@react-navigation/native';
import { UsersIcon, HomeIcon, AdjustmentsVerticalIcon } from "react-native-heroicons/outline";
import { Searchbar, DataTable, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from '../../ultils/context/LoginProvider';

const UserSignOut = () => {
    const { adminId, adminPassword, adminName, adminCompanyCode } = useContext(LoginContext);
    const navigation = useNavigation();

    const checkMethod = () => {
        AsyncStorage.removeItem("userIdStore")
        AsyncStorage.removeItem("emailUserStore");
        AsyncStorage.removeItem("passwordUserStore");
        // console.log('has been sign out of this account')
        setTimeout(() => {
            navigation.navigate('Home')
        }, 1500);
    }

  return (
    <>
      <SafeAreaView>
        <View className="flex-row items-center justify-end mr-2 mt-3">
          <Text className="mr-2 font-bold">{adminName}</Text>
          <UsersIcon size={40} color="#00CCBB" />
        </View>

        <View className="justify-center items-center mt-6 mb-5">
          <Text className="font-bold text-2xl text-blue-700 ">
            Sign Out User
          </Text>
        </View>

      </SafeAreaView>

        <SafeAreaView className="items-center">
            <TouchableOpacity className="border-2 h-12 w-80 border-yellow-300  rounded-lg mt-4 bg-yellow-500 shadow-lg shadow-yellow-500/50 items-center justify-center"
            onPress={() => checkMethod()}>
                <Text className="font-bold text-base">SignOut</Text>
            </TouchableOpacity>
        </SafeAreaView>

      {/* AdminBottomNavigate */}
        <SafeAreaView className="fixed flex-1 justify-end bottom-[-35]">
          <View className="flex flex-row justify-around items-center bg-slate-700 h-20 ">
            <TouchableOpacity onPress={() => navigation.navigate('Home')}
              className="hover:bg-red-400 ">
              <View className="flex flex-col items-center">
                <HomeIcon width={30} height={30} />
                <Text className="text-sm font-bold">Home</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('check')}
              className="hover:bg-red-400 ">
              <View className="flex flex-col items-center">
                <HomeIcon width={30} height={30} />
                <Text className="text-sm font-bold">Admin</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('AdminSignOut')}
              className="hover:bg-red-400 ">
              <View className="flex flex-col items-center">
                <AdjustmentsVerticalIcon width={30} height={30} />
                <Text className="text-sm font-bold">SignOut</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

   
    </>
  )
}

export default UserSignOut