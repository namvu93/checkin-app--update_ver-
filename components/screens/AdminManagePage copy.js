import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState, useContext } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {UsersIcon,} from "react-native-heroicons/outline";
import { Searchbar, Button } from "react-native-paper";
import CurrentUserInfoTables from "./AdminManagePage/CurrentUserInfoTables";
import client from "../api/client";
import { LoginContext } from "../ultils/context/LoginProvider";
import AdminBottomNavigate from "./AdminManagePage/AdminBottomNavigate";
import { HomeIcon, AdjustmentsVerticalIcon } from "react-native-heroicons/outline";

const AdminManagePage = () => {
  const { adminId, adminPassword, adminName, adminCompanyCode,
    adminIdByType, adminPassWordByType, adminNameByType, adminCompanyCodeByType } = useContext(LoginContext);

  //hide header default
  const navigation = useNavigation();
  const isVisible = useIsFocused();
  // useLayoutEffect(() => {
  //   navigationChange.setOptions({
  //     headerShown: false,
  //   });
  // }, []);

  // get some variables
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState(data);

  useEffect(() => {
    getAllApiData()

  }, [isVisible])

  const getAllApiData = async () => {
    const getApi = await client.post("/getAllEmployeeInfo")
      .then((res) => {
        // alert('getAllData success!!!');
        // console.log(res.data.data)
        setData(res.data.data)
        setFilterData(res.data.data)
      })
      .catch((err) => {
        alert('get data fails, there is some issue need to check')
        console.log(err.message)
      })
  }

  const filterHandleData = (text) => {
    if (text) {
      const newData = data.filter(value => {
        const valueData = value.name ? value.name.toUpperCase() : ''.toUpperCase();
        const getData = text.toUpperCase();
        return valueData.indexOf(getData) > -1;
      })
      setFilterData(newData);
    } else {
      setFilterData(data);
    }
  }

  return (
    <>
      <SafeAreaView>
        <View className="flex-row items-center justify-end mr-2 mt-3">
          <Text className="mr-2 font-bold">{adminName !== null ? adminName : adminNameByType}</Text>
          <UsersIcon size={40} color="#00CCBB" />
        </View>

        <View className="justify-center items-center mt-6 mb-5">
          <Text className="font-bold text-2xl text-blue-700 ">User Manage</Text>
        </View>

        <View className='items-end mr-2'>
          <View className="border-2 w-1/2 rounded-md ">
            <Button
              textColor="black"
              onPress={() => navigation.navigate("CreateNewEmployeeByAdmin")}>
              Create New User
            </Button>
          </View>
        </View>

        <View className="opacity-40 p-3 ">
          <Searchbar
            autoCapitalize="none"
            onChange={(event) => filterHandleData(event.nativeEvent.text)}
            placeholder="filter"
            className="bg-teal-50 opacity-60 shadow-md"
          />
        </View>
      </SafeAreaView>

      {/* filter Table */}
      <SafeAreaView>
        <CurrentUserInfoTables filterData={filterData} />
      </SafeAreaView>

      {/* bottom navigate  */}
      <AdminBottomNavigate />

    </>
  );
};

export default AdminManagePage;
