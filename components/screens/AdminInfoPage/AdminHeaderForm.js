import { View, Text, Animated } from 'react-native'
import React from 'react'

const AdminHeaderForm = ({
    leftHeading,
    rightHeading,
    leftHeaderTranslateX = 40,
    leftHeaderTranslateY = -20,
    rightHeaderOpacity = 0
}) => {
  return (
    <>
    <Animated.Text className='text-3xl text-black-700 font-bold'
    style={{transform: [{translateX: leftHeaderTranslateX}]}}
    >{leftHeading}</Animated.Text>
    <Animated.Text className='text-3xl text-black-700 font-bold'
    style={{opacity: rightHeaderOpacity, transform: [{translateY: leftHeaderTranslateY}]}}
    >{rightHeading}</Animated.Text>
    </>    
  )
}

export default AdminHeaderForm