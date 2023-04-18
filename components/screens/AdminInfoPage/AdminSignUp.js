import { View, Text, TouchableWithoutFeedback} from 'react-native'
import React from 'react'

const AdminSignUp = ({onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
        <View className='w-2/5 h-12  mt-14 items-center justify-center rounded-r bg-pink-500'>
            <Text className='text-sm text-white font-bold'>SignUp</Text>
        </View>
    </TouchableWithoutFeedback>
  )
}

export default AdminSignUp