import { View, Text, ScrollView, SafeAreaView, Dimensions, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from '@react-navigation/native'
import { Button, DataTable } from "react-native-paper";
import {
    UsersIcon,
    MagnifyingGlassCircleIcon,
  } from "react-native-heroicons/outline";
  import { Formik } from "formik";
import * as Yub from "yup";
import client from "../../api/client";

const UserEditInfoByAdmin = () => {
    // hidden header bar default
        const navigation = useNavigation();
        const route = useRoute();
    // useLayoutEffect(() => {
    //   navigation.setOptions({
    //     headerShown: false,
    //   });
    // }, []);
    
    const validationSchema = Yub.object( {
      name: Yub.string().trim().min(3, 'Invalid name').required('Name has as least 3 character!!!'),
      address: Yub.string().trim().min(3, 'Invalid address').required('address has as least 3 character!!!'),
      phone: Yub.string().matches(new RegExp('[0-9]{7}')).required('phone is required'),
      email: Yub.string().email('Invalid email').required('email is required'),
      // password: Yub.string().trim().min(8, 'password is too short!').required('password is required'),
    });
    
    const userInfo = {
        name: '' ,
        address: '',
        phone: '',
        email: '',
        company_code: route.params.company_codeEdit,
        id:route.params.idEdit
      };

      const signUp = (values, formikActions) => {
        const postAPI = client.post('/editEmployee', {...values})
        .then( res => {
          console.log(res.data.data);
          alert('great update done');
          formikActions.resetForm();
          setTimeout(() => {
            navigation.navigate('AdminManage')
          }, 500);
        })
        .catch (err => {
          console.log(err);
        })
      }

  return (
    <>
    <SafeAreaView>
      <View className='flex-row items-center justify-end mr-2 mt-3'>
      <Text className='mr-2 font-bold'>Admin</Text>
      <UsersIcon size={40} color='#00CCBB'/>
      </View>

      <View className='justify-center items-center mt-6 mb-5'>
        <Text className='font-bold text-2xl text-blue-700 '>Edit User Info</Text>
      </View>
      </SafeAreaView>

    {/* update form zone */}
    <View
      className="items-center pt-6 bg-white flex-1 mt-8"
      style={{ width: Dimensions.get("window").width, paddingHorizontal: 20 }}
    >
      <ScrollView>
        <Formik initialValues={userInfo} validationSchema={validationSchema}
        onSubmit={signUp} >
          {({values,errors, handleChange, touched, handleBlur, handleSubmit }) => {
            
            const {name,email,address,phone,id,company_code} = values;
            return(
            <>
            <View className='flex-row justify-between'>
              <Text className="font-bold">Name</Text>
              {errors ? <Text className='font-bold text-red-600 text-ms'>{touched.name && errors.name}</Text> : null}
            </View>
              <TextInput
                autoCapitalize="none"
                placeholder={route.params.nameEdit}
                className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                value={name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur('name')}
              />

            <View className='flex-row justify-between'>
              <Text className="font-bold">Address</Text>
              {errors ? <Text className='font-bold text-red-600 text-ms'>{touched.address && errors.address}</Text> : null}
            </View>
              <TextInput
                autoCapitalize="none"
                placeholder={route.params.addressEdit}
                className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                value={address}
                onChangeText={handleChange("address")}
                onBlur={handleBlur('address')}
                error={touched.address && errors.address}
              />

            <View className='flex-row justify-between'>
              <Text className="font-bold">Phone</Text>
              {errors ? <Text className='font-bold text-red-600 text-ms'>{touched.phone && errors.phone}</Text> : null}
            </View>
              <TextInput
                autoCapitalize="none"
                placeholder={route.params.phoneEdit}
                className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                value={phone}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur('phone')}
              />

            <View className='flex-row justify-between'>
              <Text className="font-bold">Email</Text>
              {errors ? <Text className='font-bold text-red-600 text-ms'>{touched.email && errors.email}</Text> : null}
            </View>
              <TextInput
                placeholder={route.params.emailEdit}
                className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                value={email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur('email')}
              />

              <TouchableOpacity
                className="border-2 h-10 w-80 items-center justify-center border-yellow-300  rounded-lg mt-4 bg-yellow-500 shadow-lg shadow-yellow-500/50"
                onPress={handleSubmit}
              >
                <Text className="text-lg font-bold">Update</Text>
              </TouchableOpacity>
            </>)
          }}
        </Formik>
      </ScrollView>
    </View>

    </>
  )
}

export default UserEditInfoByAdmin