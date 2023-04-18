import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import React from 'react'
import { HomeIcon, AdjustmentsVerticalIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const AdminBottomNavigate = () => {
    const navigation = useNavigation();
    return (
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
    )
}

export default AdminBottomNavigate