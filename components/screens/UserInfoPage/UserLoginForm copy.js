import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import client from "../../api/client";
import { Formik } from "formik";
import * as Yub from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from "../../ultils/context/LoginProvider";


const UserLoginForm = () => {

  const { setUserId, setUserPassword, setEmployeeName, setUserCompanyCode,
    setUserIdByType,setUserPassWordByType, setEmployeeNameByType, setUserCompanyCodeByType} = useContext(LoginContext);
  //Navigate zone using for changing page purpose
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  // validate form
  const validationSchema = Yub.object({
    company_code: Yub.string().trim().required("company code is required!"),
    employeeUserName: Yub.string().trim().required("required locate!"),
    password: Yub.string().trim().required("password is required!"),
  });

  const userInfo = {
    company_code: "",
    employeeUserName: "",
    password: "",
  };

  // Login by using api 
  const signIn = async (values, formikActions) => {
    console.log('check', values);
    const res = await client
      .post("/employeeLogin", { ...values })
      .then((res) => {
        alert("Login success!!");
        console.log(res.data);
        //use useContext to pass userId to another component
        // setUserId(res.data.data.id); 
        // setUserPassword(values.password);
        const userIdStore = JSON.stringify(res.data.data.id);
        const companyCodeUserStore = values.company_code;
        const employeeUserNameStore = values.employeeUserName;
        const passwordUserStore = values.password;

        setUserIdByType(JSON.stringify(res.data.data.id));
        setUserPassWordByType(values.password);
        setEmployeeNameByType(values.employeeUserName);
        setUserCompanyCodeByType(values.company_code);

        AsyncStorage.setItem("userIdStore", userIdStore);
        AsyncStorage.setItem("companyCodeUserStore", companyCodeUserStore);
        AsyncStorage.setItem("employeeUserNameStore", employeeUserNameStore);
        AsyncStorage.setItem("passwordUserStore", passwordUserStore);

        setTimeout(() => {
          navigation.navigate("UserCheckInOut");
        }, 1500);
      })
      .catch((err) => {
        alert("Login failed!!!");
        console.log(err);
      });

    formikActions.resetForm();
  };

  // Automatically login if has been signed in before
  const fetchUser = async () => {
    const userIdStore = await AsyncStorage.getItem("userIdStore");
    const companyCodeUserStore = await AsyncStorage.getItem("companyCodeUserStore");
    const employeeUserNameStore = await AsyncStorage.getItem("employeeUserNameStore");
    const passwordUserStore = await AsyncStorage.getItem("passwordUserStore");

    setUserId(await AsyncStorage.getItem("userIdStore"));//use localStorage to get and pass value to another page
    setEmployeeName(await AsyncStorage.getItem("employeeUserNameStore"));
    setUserCompanyCode(await AsyncStorage.getItem("companyCodeUserStore"));

    const autoLogin = {
      company_code: companyCodeUserStore,
      employeeUserName: employeeUserNameStore,
      password: passwordUserStore,
      id: userIdStore
    };

    if (employeeUserNameStore && companyCodeUserStore && passwordUserStore !== null ) {
      const userAutoLogin = await client
        .post("/employeeLogin", { ...autoLogin })
        .then((res) => {
          // console.log(res.data.data);
          navigation.navigate("UserCheckInOut");
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
            const { company_code, employeeUserName, password } = values;
            return (
              <>
                <View className="flex-row justify-between">
                  <Text className="font-bold"> CompanyCode</Text>
                  {errors ? (
                    <Text className="font-bold text-red-600 text-ms">
                      {touched.company_code && errors.company_code}
                    </Text>
                  ) : null}
                </View>
                <TextInput
                  autoCapitalize="none"
                  placeholder=" Company_Code"
                  className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80 "
                  value={company_code}
                  onChangeText={handleChange("company_code")}
                  onBlur={handleBlur("company_code")}
                />

                <View className="flex-row justify-between">
                  <Text className="font-bold"> EmployeeUserName</Text>
                  {errors ? (
                    <Text className="font-bold text-red-600 text-ms">
                      {touched.employeeUserName && errors.employeeUserName}
                    </Text>
                  ) : null}
                </View>
                <TextInput
                  autoCapitalize="none"
                  placeholder=" EmployeeUserName"
                  className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80 "
                  value={employeeUserName}
                  onChangeText={handleChange("employeeUserName")}
                  onBlur={handleBlur("employeeUserName")}
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
