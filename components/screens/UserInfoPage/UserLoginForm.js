import {View, Text, TextInput, Dimensions, TouchableOpacity, ScrollView,} from "react-native";
import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import client from "../../api/client";
import { Formik } from "formik";
import * as Yub from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from "../../ultils/context/LoginProvider";


const UserLoginForm = () => {

  const { setUserId, setUserPassword, setEmployeeName, setEmailUser, setUserCompanyCode, setUserEmailByType,
    setUserIdByType, setUserPassWordByType, setEmployeeNameByType, setUserCompanyCodeByType } = useContext(LoginContext);
  //Navigate zone using for changing page purpose
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // validate form
  const validationSchema = Yub.object({
    password: Yub.string().trim().required("password is required!"),
    email: Yub.string().trim().email().required("email is required!"),
  });

  const userInfo = {
    email: "",
    password: ""
  }

  // Login by using api 
  const signIn = async (values, formikActions) => {
    // console.log('values', values)
    const res = await client
      .post("/login", { ...values })
      .then((res) => {
        alert("Login success!!");
        // console.log('id', res.data.user.id);
        // console.log('email', res.data.user.email);
        // console.log('password', values.password);
        console.log('token', res.data.authorisation.token);


        //use useContext to pass userId to another component
        // setUserId(res.data.data.id); 
        // setUserPassword(values.password);
        const userIdStore = JSON.stringify(res.data.user.id);


        // const companyCodeUserStore = values.company_code;
        // const employeeUserNameStore = values.employeeUserName;
        const emailUserStore = values.email;
        const passwordUserStore = values.password;

        setUserIdByType(res.data.user.id);
        setUserEmailByType(values.email);
        setUserPassWordByType(values.password);
        // setEmployeeNameByType(values.employeeUserName);
        // setUserCompanyCodeByType(values.company_code);

        // AsyncStorage.setItem("companyCodeUserStore", companyCodeUserStore);
        // AsyncStorage.setItem("employeeUserNameStore", employeeUserNameStore);
        AsyncStorage.setItem("userIdStore", userIdStore);
        AsyncStorage.setItem("emailUserStore", emailUserStore);
        AsyncStorage.setItem("passwordUserStore", passwordUserStore);

        setTimeout(() => {
          navigation.navigate("UserCheckInOut", { tokenPass: res.data.authorisation.token });
          alert('check');
        }, 1500);
      })
      .catch((err) => {
        alert("Login failed!!!");
        console.log(err.message);
      });

    formikActions.resetForm();
  };

  // Automatically login if has been signed in before
  const fetchUser = async () => {
    const userIdStore = await AsyncStorage.getItem("userIdStore");
    // const companyCodeUserStore = await AsyncStorage.getItem("companyCodeUserStore");
    // const employeeUserNameStore = await AsyncStorage.getItem("employeeUserNameStore");
    const emailUserStore = await AsyncStorage.getItem("emailUserStore");
    const passwordUserStore = await AsyncStorage.getItem("passwordUserStore");

    setUserId(await AsyncStorage.getItem("userIdStore"));//use localStorage to get and pass value to another page
    setEmailUser(await AsyncStorage.getItem("emailUserStore"));

    const autoLogin = {
      email: emailUserStore,
      password: passwordUserStore,
      id: userIdStore,
    };

    if (emailUserStore && passwordUserStore !== null) {
      // console.log('check Login data', autoLogin);
      const userAutoLogin = await client
        .post("/login", { ...autoLogin })
        .then((res) => {
          // console.log(res.data.data);
          setUserIdByType(res.data.user.id);
          setUserEmailByType(res.data.user.email);

          navigation.navigate("UserCheckInOut", { tokenPass: res.data.authorisation.token });
        })

        .catch((err) => {
          alert("Login failed!!!");
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View
      className="items-center pt-6 bg-white"
      style={{ width: Dimensions.get("window").width, paddingHorizontal: 20 }}
    >
      <ScrollView>
        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={signIn}
        >
          {({
            values,
            errors,
            handleChange,
            touched,
            handleBlur,
            handleSubmit,
          }) => {
            // const { company_code, employeeUserName, password } = values;
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

export default UserLoginForm;
