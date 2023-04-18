import { View, Text, TouchableWithoutFeedback,} from 'react-native'
import React from 'react'

const AdminLog = ({onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
        <View className='w-2/5 h-12 mt-14 items-center justify-center rounded-l bg-cyan-500'>
            <Text className='text-sm text-white font-bold'>Login</Text>
        </View>
    </TouchableWithoutFeedback>
  )
}

export default AdminLog