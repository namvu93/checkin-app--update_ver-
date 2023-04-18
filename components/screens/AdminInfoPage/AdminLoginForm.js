import {View, Text, TextInput, Dimensions, TouchableOpacity, ScrollView,} from "react-native";
import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import client from "../../api/client";
import { Formik } from "formik";
import * as Yub from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from "../../ultils/context/LoginProvider";

const AdminLoginForm = () => {
  const { setAdminId, setAdminPassword, setAdminName, setAdminCompanyCode, setAdminEmailByType,
    setAdminIdByType, setAdminPassWordByType, setAdminNameByType, setAdminCompanyCodeByType } = useContext(LoginContext)

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  // validate form
  const validationSchema = Yub.object({
    password: Yub.string().trim().required("password is required!"),
    email: Yub.string().trim().email().required("email is required!"),
  });

  const userInfo = {
    email: "",
    password: ""
  };

  // Login by using api 
  const signUp = (values, formikActions) => {
    const res = client.post('/login', { ...values })
      .then((res) => {
        alert('Login success!!')
        // console.log(res.data.data);
        // console.log('token', res.data.authorisation.token);

        const adminIdStore = JSON.stringify(res.data.user.id) //store adminId using for auto login
        const emailAdminStore = values.email;
        const passwordAdminStore = values.password;


        //use for passing data to another page when not auto login
        setAdminIdByType(res.data.user.id);
        setAdminEmailByType(values.email)
        setAdminPassWordByType(values.password);

        AsyncStorage.setItem("adminIdStore", adminIdStore);
        AsyncStorage.setItem("emailAdminStore", emailAdminStore);
        AsyncStorage.setItem("passwordAdminStore", passwordAdminStore);

        // console.log('great login successfully');
        setTimeout(() => {
          navigation.navigate('AdminManage', { tokenPass: res.data.authorisation.token })
        }, 1500);

      })
      .catch((err) => {
        alert('Login failed!!!')
        console.log(err);
      });

    formikActions.resetForm();
  };

  // Automatically login if has been signed in before
  const fetchUser = async () => {
    const adminIdStore = await AsyncStorage.getItem("adminIdStore");
    const emailAdminStore = await AsyncStorage.getItem("emailAdminStore");
    const passwordAdminStore = await AsyncStorage.getItem("passwordAdminStore");

    setAdminId(await AsyncStorage.getItem("adminIdStore"));//use localStorage to get and pass value to another page
    setEmailAdmin(await AsyncStorage.getItem("emailAdminStore"));


    const autoLogin = {
      email: emailAdminStore,
      password: passwordAdminStore,
      id: adminIdStore,
    };

    if (emailAdminStore && passwordAdminStore !== null) {
      console.log('check Login data', autoLogin);

      const userAutoLogin = await client
        .post("/login", { ...autoLogin })
        .then((res) => {
          // console.log(res.data.data);
          setAdminIdByType(res.data.user.id);
          setAdminEmailByType(res.data.user.email);

          navigation.navigate("AdminManage", { tokenPass: res.data.authorisation.token });
        })

        .catch((err) => {
          alert("Login failed!!!");
          console.log(err);
        });
    }
  };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  return (
    <View
      className="items-center pt-6 bg-white"
      style={{ width: Dimensions.get("window").width, paddingHorizontal: 20 }}
    >
      <ScrollView>
        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={signUp}
        >
          {({
            values,
            errors,
            handleChange,
            touched,
            handleBlur,
            handleSubmit,
          }) => {
            // const { company_code, userName, password } = values;
            const { email, password } = values;
            return (
              <>
                <View className="flex-row justify-between">
                  <Text className="font-bold">Email</Text>
                  {errors ? (
                    <Text className="font-bold text-red-600 text-ms">
                      {touched.email && errors.email}
                    </Text>
                  ) : null}
                </View>
                <TextInput
                  autoCapitalize="none"
                  placeholder=" Email"
                  className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80 "
                  value={email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />

                <View className="flex-row justify-between">
                  <Text className="font-bold"> Password</Text>
                  {errors ? (
                    <Text className="font-bold text-red-600 text-ms">
                      {touched.password && errors.password}
                    </Text>
                  ) : null}
                </View>
                <TextInput
                  secureTextEntry
                  autoCapitalize="none"
                  placeholder=" Password"
                  className="border-2 mt-1 border-sky-600 h-10 rounded-md text-sm  w-80"
                  value={password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />

                <TouchableOpacity
                  className="border-2 h-10 w-80 items-center justify-center border-yellow-300  rounded mt-6 bg-yellow-500 shadow-lg shadow-yellow-500/50"
                  onPress={handleSubmit}
                >
                  <Text className="text-lg font-bold">Login</Text>
                </TouchableOpacity>
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default AdminLoginForm;
