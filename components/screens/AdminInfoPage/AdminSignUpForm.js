import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { isValidObjField, updateErr, isValidEmail } from "../../ultils/method";
import { Formik } from "formik";
import * as Yub from "yup";
import client from "../../api/client";


const AdminSignUpForm = () => {

  const validationSchema = Yub.object({
    companyName: Yub.string().trim().min(3, 'Invalid companyName!').required('companyName is required!'),
    companyAddress: Yub.string().trim().min(3, 'Invalid companyAddress!').required('companyAddress is required!'),
    companyPhone: Yub.string().matches(new RegExp('[0-9]{7}')).required('companyPhone is required!'),
    userName:Yub.string().trim().min(3, 'Invalid userName').required('userName is required!'),
    email: Yub.string().email('Invalid email!').required('Email is required!'),
    password: Yub.string().trim().min(8,'password is too short!').required('password is required!'),
    passwordConfirmed: Yub.string().equals([Yub.ref('password'), null], 'password does not match!')
  })

  const userInfo = {
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    userName: '',
    email: '',
    password: '',
    passwordConfirmed: '',
  };

  // const signUp = async(values, formikActions) => {
  //     const res =  await client.post('/createAdmin', {
  //       ...values
  //     })
  //     console.log(res.data)
  //     formikActions.resetForm();
  // }

    const signUp = (values, formikActions) => {
      const postAPI = client.post('/createAdmin', {
        ...values
      })
      .then( res => {
        console.log(res.data);
      })
      .catch (err => {
        console.log(err);
      })

      setTimeout(() => {
        alert('Great you have been created a new account done!!!')
      }, 500);
      formikActions.resetForm();
    }

  return (
    <View
      className="items-center pt-6 bg-white"
      style={{ width: Dimensions.get("window").width, paddingHorizontal: 20 }}
    >
      <ScrollView>
        <Formik initialValues={userInfo} validationSchema={validationSchema} 
        onSubmit={signUp} >
          {({values,errors, handleChange, touched, handleBlur, handleSubmit, }) => {
            
            const { companyName,companyAddress,companyPhone,userName,email,password,passwordConfirmed} = values;
            return(
            <>
            <View className='flex-row justify-between'>
              <Text className="font-bold">UserName</Text>
              {errors ? <Text className='font-bold text-red-600 text-ms'>{touched.userName && errors.userName}</Text> : null}
            </View>
              <TextInput
                autoCapitalize="none"
                placeholder=" UserName"
                className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                value={userName}
                onChangeText={handleChange("userName")}
                onBlur={handleBlur('userName')}
              />

            <View className='flex-row justify-between'>
              <Text className="font-bold">CompanyName</Text>
              {errors ? <Text className='font-bold text-red-600 text-ms'>{touched.companyName && errors.companyName}</Text> : null}
            </View>
              <TextInput
                autoCapitalize="none"
                placeholder=" CompanyName"
                className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                value={companyName}
                onChangeText={handleChange("companyName")}
                onBlur={handleBlur('companyName')}
                error={touched.companyName && errors.companyName}
              />

            <View className='flex-row justify-between'>
              <Text className="font-bold">CompanyAddress</Text>
              {errors ? <Text className='font-bold text-red-600 text-ms'>{touched.companyAddress && errors.companyAddress}</Text> : null}
            </View>
              <TextInput
                autoCapitalize="none"
                placeholder=" CompanyAddress"
                className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                value={companyAddress}
                onChangeText={handleChange("companyAddress")}
                onBlur={handleBlur('companyAddress')}
              />

            <View className='flex-row justify-between'>
              <Text className="font-bold">CompanyPhone</Text>
              {errors ? <Text className='font-bold text-red-600 text-ms'>{touched.companyPhone && errors.companyPhone}</Text> : null}
            </View>
              <TextInput
                placeholder=" CompanyPhone"
                className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                value={companyPhone}
                onChangeText={handleChange("companyPhone")}
                onBlur={handleBlur('companyPhone')}
            
              />

            <View className='flex-row justify-between'>
              <Text className="font-bold">Email</Text>
              {errors ? <Text className='font-bold text-red-600 text-ms'>{touched.email && errors.email}</Text> : null}
            </View>
              <TextInput
                autoCapitalize="none"
                placeholder=" Email"
                className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                value={email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur('email')}
              />

            <View className='flex-row justify-between'>
              <Text className="font-bold">Password</Text>
              {errors ? <Text className='font-bold text-red-600 text-ms'>{touched.password && errors.password}</Text> : null}
            </View>
              <TextInput
                autoCapitalize="none"
                secureTextEntry
                placeholder=" Password"
                className="mb-2 border-2 mt-1 border-sky-600 h-10 rounded-md text-sm  w-80"
                value={password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur('password')}
              />

            <View className='flex-row justify-between'>
              <Text className="font-bold">Password Confirmed</Text>
              {errors ? <Text className='font-bold text-red-600 text-ms'>{touched.passwordConfirmed && errors.passwordConfirmed}</Text> : null}
            </View>
              <TextInput
                autoCapitalize="none"
                secureTextEntry
                placeholder=" Password confirmed"
                className="border-2 mt-1 border-sky-600 h-10 rounded-md text-sm  w-80"
                value={passwordConfirmed}
                onChangeText={handleChange("passwordConfirmed")}
                onBlur={handleBlur('passwordConfirmed')}
              />

              <TouchableOpacity
                className="border-2 h-10 w-80 items-center justify-center border-yellow-300  rounded-lg mt-4 bg-yellow-500 shadow-lg shadow-yellow-500/50"
                onPress={handleSubmit}
              >
                <Text className="text-lg font-bold">Sign Up</Text>
              </TouchableOpacity>
            </>)
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default AdminSignUpForm;
