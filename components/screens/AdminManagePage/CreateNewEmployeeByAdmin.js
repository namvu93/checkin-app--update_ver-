import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, {useLayoutEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yub from "yup";
import client from "../../api/client";
import {
  UsersIcon,
} from "react-native-heroicons/outline";

const CreateNewEmployeeByAdmin = () => {
  const navigation = useNavigation();
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, []);

  const validationSchema = Yub.object({
    company_code: Yub.string()
      .trim()
      .min(3, "Invalid companyCode!")
      .required("companyCode is required!"),
    name: Yub.string()
      .trim()
      .min(3, "Invalid name!")
      .required("name is required!"),
    email: Yub.string().email("Invalid email!").required("Email is required!"),
    phone: Yub.string()
      .matches(new RegExp("[0-9]{7}"))
      .required("phone is required!"),
    address: Yub.string()
      .trim()
      .min(3, "Invalid address")
      .required("address is required!"),
    employeeUserName: Yub.string()
      .trim()
      .min(3, "Invalid employeeUserName")
      .required("employeeUserName is required"),
    department: Yub.string()
      .trim()
      .min(3, "department is too short!")
      .required("department is required!"),
    password: Yub.string().equals(
      [Yub.ref("password"), null],
      "password is required!"
    ),
  });

  const userInfo = {
    company_code: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    employeeUserName: "",
    password: "",
  };

  const signUp = (values, formikActions) => {
    const postAPI = client
      .post("/createEmployee", {
        ...values,
      })
      .then((res) => {
        alert("Great you have been created a new user account done!!!");
        console.log(res.data);
        setTimeout(() => {
          formikActions.resetForm();
          navigation.goBack('AdminManage')
        }, 500);

      })
      .catch((err) => {
        // console.log(err);
        console.log(err.message);
      });
    
  };

  return (
    <>
      <SafeAreaView>
        <View className="flex-row items-center justify-end mr-2 mt-3">
          <Text className="mr-2 font-bold">Admin</Text>
          <UsersIcon size={40} color="#00CCBB" />
        </View>

        <View className="justify-center items-center mt-6 mb-5">
          <Text className="font-bold text-2xl text-blue-700 ">
            Create New User
          </Text>
        </View>
      </SafeAreaView>

      {/* create form zone */}
      <View
        className="items-center pt-6 bg-white flex-1 mt-8"
        style={{ width: Dimensions.get("window").width, paddingHorizontal: 20 }}
      >
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
            const {
              company_code,
              name,
              email,
              phone,
              address,
              department,
              employeeUserName,
              password,
            } = values;
            return (
              <>
              <ScrollView>
                <View className="flex-row justify-between">
                  <Text className="font-bold">Company Code</Text>
                  {errors ? (
                    <Text className="font-bold text-red-600 text-ms">
                      {touched.company_code && errors.company_code}
                    </Text>
                  ) : null}
                </View>
                <TextInput
                  autoCapitalize="none"
                  placeholder=" Company Code"
                  className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                  value={company_code}
                  onChangeText={handleChange("company_code")}
                  onBlur={handleBlur("company_code")}
                />

                <View className="flex-row justify-between">
                  <Text className="font-bold">Name</Text>
                  {errors ? (
                    <Text className="font-bold text-red-600 text-ms">
                      {touched.name && errors.name}
                    </Text>
                  ) : null}
                </View>
                <TextInput
                  autoCapitalize="none"
                  placeholder=" Name"
                  className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                  value={name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                />

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
                  className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                  value={email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />

                <View className="flex-row justify-between">
                  <Text className="font-bold">Phone</Text>
                  {errors ? (
                    <Text className="font-bold text-red-600 text-ms">
                      {touched.phone && errors.phone}
                    </Text>
                  ) : null}
                </View>
                <TextInput
                  autoCapitalize="none"
                  placeholder=" Phone"
                  className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                  value={phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                />

                <View className="flex-row justify-between">
                  <Text className="font-bold">Address</Text>
                  {errors ? (
                    <Text className="font-bold text-red-600 text-ms">
                      {touched.address && errors.address}
                    </Text>
                  ) : null}
                </View>
                <TextInput
                  autoCapitalize="none"
                  placeholder=" Address"
                  className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                  value={address}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  error={touched.address && errors.address}
                />

                <View className="flex-row justify-between">
                  <Text className="font-bold">Department</Text>
                  {errors ? (
                    <Text className="font-bold text-red-600 text-ms">
                      {touched.department && errors.department}
                    </Text>
                  ) : null}
                </View>
                <TextInput
                  autoCapitalize="none"
                  placeholder=" Department"
                  className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                  value={department}
                  onChangeText={handleChange("department")}
                  onBlur={handleBlur("department")}
                />

                <View className="flex-row justify-between">
                  <Text className="font-bold">EmployeeUserName</Text>
                  {errors ? (
                    <Text className="font-bold text-red-600 text-ms">
                      {touched.employeeUserName && errors.employeeUserName}
                    </Text>
                  ) : null}
                </View>
                <TextInput
                autoCapitalize="none"
                  placeholder=" EmployeeUserName"
                  className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                  value={employeeUserName}
                  onChangeText={handleChange("employeeUserName")}
                  onBlur={handleBlur("employeeUserName")}
                />

                <View className="flex-row justify-between">
                  <Text className="font-bold">Password</Text>
                  {errors ? (
                    <Text className="font-bold text-red-600 text-ms">
                      {touched.password && errors.password}
                    </Text>
                  ) : null}
                </View>
                <TextInput
                  autoCapitalize="none"
                  secureTextEntry
                  placeholder=" Password"
                  className="mb-2 mt-1 border-2 border-sky-600 h-10 rounded-md text-sm w-80"
                  value={password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />

                <TouchableOpacity
                  className="border-2 h-10 w-80 items-center justify-center border-yellow-300  rounded-lg mt-4 bg-yellow-500 shadow-lg shadow-yellow-500/50"
                  onPress={handleSubmit}
                >
                  <Text className="text-lg font-bold">Create</Text>
                </TouchableOpacity>
                </ScrollView>
              </>
            );
          }}
        </Formik>
      </View>
    </>
  );
};

export default CreateNewEmployeeByAdmin;
