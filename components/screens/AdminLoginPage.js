import { View, Text, ScrollView, Animated, Dimensions } from 'react-native'
import React, { useLayoutEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';

import AdminLog from './AdminInfoPage/AdminLog';
import AdminSignUp from './AdminInfoPage/AdminSignUp';
import AdminLoginForm from './AdminInfoPage/AdminLoginForm';
import AdminSignUpForm from './AdminInfoPage/AdminSignUpForm';
import AdminHeaderForm from './AdminInfoPage/AdminHeaderForm';

const {width} = Dimensions.get('window');

const AdminLoginPage = () => {
    //hide header default
//     const navigationChange = useNavigation();
//   useLayoutEffect(() => {
//       navigationChange.setOptions({
//         headerShown: false,
//       })
//   },[])

    const animation = useRef(new Animated.Value(0)).current;
    const scrollView = useRef()
    
    const rightHeaderOpacity = animation.interpolate({
       inputRange: [0, width],
       outputRange: [1, 0],
    });
    const leftHeaderTranslateX = animation.interpolate({
        inputRange: [0, width],
        outputRange: [0, 40],
     });
    const leftHeaderTranslateY = animation.interpolate({
        inputRange: [0, width],
        outputRange: [0, -20],
     });
    
  return (<>
    <View className='flex-1 pt-24 bg-gray-500'>
        <View className='h-14 justify-center items-center'>
            <View className='flex-row mb-2'>
             <AdminHeaderForm 
             leftHeading='Welcome '
             rightHeading='Back'
             rightHeaderOpacity={rightHeaderOpacity}
             leftHeaderTranslateX={leftHeaderTranslateX}
             leftHeaderTranslateY={leftHeaderTranslateY}
             />
                
            </View>
            <Text className='text-lg text-red-300 font-bold'>Admin</Text>
        </View>

        <View className=' flex-row  pt-10 pb-12 h-24 justify-center items-center '>
            <AdminLog onPress={() => scrollView.current.scrollTo({x: 0})}/>
            <AdminSignUp onPress={() => scrollView.current.scrollTo({x: width})}/>
        </View>

        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
        ref={scrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: animation}}}], {useNativeDriver: false} )}
        >
           <AdminLoginForm/>

           <AdminSignUpForm/>
        </ScrollView>
    </View>
    </>
  )
}

export default AdminLoginPage