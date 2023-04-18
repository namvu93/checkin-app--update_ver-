import { View, Text, SafeAreaView, TextInput, ScrollView, Modal, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UsersIcon, HomeIcon, AdjustmentsVerticalIcon } from "react-native-heroicons/outline";
import { Searchbar, DataTable, Button } from "react-native-paper";
import client from "../../api/client";
import { LoginContext } from "../../ultils/context/LoginProvider";
// import AdminBottomNavigate from "./AdminManagePage/AdminBottomNavigate";
import AdminBottomNavigate from '../AdminManagePage/AdminBottomNavigate'

const optionsPerPage = [8, 9, 10];
const UserHistoryInfo = () => {
  const { adminId, adminPassword, adminName, adminCompanyCode,
    adminIdByType, adminPassWordByType, adminNameByType, adminCompanyCodeByType } = useContext(LoginContext);
  // using useNavigation to going to another page
  const navigation = useNavigation();
  // using useRoute to pass params to another page
  const route = useRoute();
  const token = route.params.tokenPass;

  const getUserInfoById = {
    user_id: route.params.id,
  }

    // useLayoutEffect(() => {
    //   navigationChange.setOptions({
    //     headerShown: false,
    //   });
    // }, []);

  const [employeeInfoShowTable, setEmployeeInfoShowTable] = useState([]);
  const [userInfoById, setUserInfoById] = useState([]);
  

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0])
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage])

  useEffect( () => {
    getUserInfoByIdThroughAPI();
  }, [])

  const getUserInfoByIdThroughAPI = async() => {
    const resDate = await client.get(`/checkinout/getAllCheckByemployeeId?user_id=${getUserInfoById.user_id}`, 
    {
      headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
               Authorization : `Bearer ${token}`
              }
  } 
    )
    .then( (res) => {
      // console.log('checkData1123',res.data.data);
      setUserInfoById(res.data.data)
    })
    .catch((err) => {
      alert('something wrong and need to check')
      console.log(err.message)
    })
  }

  return (
    <>
      <SafeAreaView className="max-w-screen-lg max-h-screen bg-gray-500  flex-1">
        {/* <View className="flex-row items-center justify-end mr-2 mt-3">
          <Text className="mr-2 font-bold">{adminName !== null ? adminName : adminNameByType}</Text>
          <UsersIcon size={40} color="#00CCBB" />
        </View> */}

        {/* User Info locate */}

        <View className="justify-center items-center mt-20 mb-5">
          <Text className="font-bold text-2xl text-blue-700 ">Info Details</Text>
        </View>

        {/* Check in/Out info  locate*/}
        <ScrollView className="p-2 ">
          <SafeAreaView className="mt-3">
            <View className="p-2 border bg-teal-50 rounded-md ">
              <DataTable>
                <DataTable.Header className="justify-center items-center">
                  <DataTable.Title>
                    <Text className="font-bold text-base ">WorkingDate</Text>
                  </DataTable.Title>
                  {/* <DataTable.Title className="justify-center items-center">
                    <Text className="font-bold text-base ">TimeOut</Text>
                  </DataTable.Title> */}
                  <DataTable.Title className="justify-center items-center">
                    <Text className="font-bold text-base ">WrkTim</Text>
                  </DataTable.Title>
                  <DataTable.Title className="justify-center items-center">
                    <Text className="font-bold text-base ">DateOff</Text>
                  </DataTable.Title>
                  <DataTable.Title className="justify-center items-center">
                    <Text className="font-bold text-base ">Remote</Text>
                  </DataTable.Title>
                </DataTable.Header>

                {userInfoById === null ? <Text> There is no data at this right now!!!</Text> : userInfoById.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage).map((value, key) => {
                  return (
                    <DataTable.Row key={key}>
                      {/* <DataTable.Cell >
                        <Text className=" text-base ">{value.checkInTime}</Text>
                      </DataTable.Cell> */}
                      <DataTable.Cell className='justify-center items-center'>
                        <Text className=" text-base ">{value.created_at.slice(0,10)}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell numeric className='justify-center items-center'>
                        <Text className=" text-base ">{value.dailyWorkingTime}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell numeric className='justify-center items-center'>
                        <Text className=" text-base ">{value.dayOffche !== null ? value.dayOffche : 0 }</Text>
                      </DataTable.Cell>
                      <DataTable.Cell numeric className='justify-center items-center'>
                        <Text className=" text-base ">{value.remote !== null ? value.remote : 0}</Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  )
                })}
                <DataTable.Pagination
                  page={page}
                  numberOfPages={Math.ceil(employeeInfoShowTable.length / optionsPerPage)}
                  onPageChange={page => setPage(page)}
                  // label="1-2 of 6"
                  label={`${from + 1}-${to} of ${employeeInfoShowTable.length}`}
                  showFastPaginationControls
                  optionsPerPage={optionsPerPage}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                />

              </DataTable>
            </View>
          </SafeAreaView>
        </ScrollView>
      <AdminBottomNavigate />
      </SafeAreaView>
      {/* AdminBottomNavigate */}
      {/* <AdminBottomNavigate /> */}
    </>
  );
};

export default UserHistoryInfo;
