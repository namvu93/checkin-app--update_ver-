import { View, Text, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native'
import React, { useLayoutEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import UserLoginForm from './UserInfoPage/UserLoginForm';
import { UsersIcon, HomeIcon, AdjustmentsVerticalIcon } from "react-native-heroicons/outline";

const UserCheckInPage = () => {
  const navigation = useNavigation();
    const scrollView = useRef()


  return (
    <>
    
    <View className='flex-1 pt-24 bg-gray-500'>
        <View className='h-14 justify-center items-center'>
            <View>
                <Text className='text-3xl text-black-700 font-bold'>Welcome</Text>
             </View>
            <Text className='text-lg text-red-300 font-bold'>User</Text>
        </View>

        <View className=' flex-row  pt-10 pb-12 h-24 justify-center items-center '>
            <View className='w-80 h-12 mt-14 items-center justify-center rounded-md bg-cyan-500'>
            <Text className='text-sm text-white font-bold'>Login</Text>
        </View>
        </View>

        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
        ref={scrollView}
        scrollEventThrottle={16}
        >
           <UserLoginForm/>

        </ScrollView>

        
    </View>

    {/* AdminBottomNavigate */}
    <View>
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
                <Text className="text-sm font-bold">User</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('check')}
              className="hover:bg-red-400 ">
              <View className="flex flex-col items-center">
                <AdjustmentsVerticalIcon width={30} height={30} />
                <Text className="text-sm font-bold">Home</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        </View>
    
    </>
  )
}

export default UserCheckInPage