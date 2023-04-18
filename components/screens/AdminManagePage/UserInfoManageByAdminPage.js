import { View, Text, SafeAreaView, TextInput, ScrollView, Modal, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UsersIcon, HomeIcon, AdjustmentsVerticalIcon } from "react-native-heroicons/outline";
import { Searchbar, DataTable, Button } from "react-native-paper";
import client from "../../api/client";
import { LoginContext } from "../../ultils/context/LoginProvider";
// import AdminBottomNavigate from "./AdminManagePage/AdminBottomNavigate";
import AdminBottomNavigate from './AdminBottomNavigate'

const optionsPerPage = [3, 4, 5];
const UserInfoManageByAdminPage = () => {
  const { adminId, adminPassword, adminName, adminCompanyCode,
    adminIdByType, adminPassWordByType, adminNameByType, adminCompanyCodeByType } = useContext(LoginContext);
  // using useNavigation to going to another page
  const navigation = useNavigation();
  // using useRoute to pass params to another page
  const route = useRoute();

  //   useLayoutEffect(() => {
  //     navigationChange.setOptions({
  //       headerShown: false,
  //     });
  //   }, []);

  const [employeeInfoShowTable, setEmployeeInfoShowTable] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0])
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage])


  useEffect(() => {
    getEmployeeDataShowIntoTable();
  }, [])

  const getEmployeeDataByIdShowIntoTable = {
    employee_id: route.params.id,
    company_code: route.params.company_code
  }

  const deleteEmployeeById = {
    id: route.params.id,
    company_code: route.params.company_code
  }

  const getEmployeeDataShowIntoTable = async () => {
    const resUserData = await client.post("/getAllCheckByemployeeId", getEmployeeDataByIdShowIntoTable)
      .then((res) => {
        // alert('great, has some data showing into table');
        // console.log('great, has some data showing into table')
        console.log(res.data.data)
        setEmployeeInfoShowTable(res.data.data)
      })
      .catch((err) => {
        console.log('fail, something stuck');
        console.log(err.message)
      })
  }

  const deleteUser = async () => {
    const resUserData = await client.post('/deleteEmployee', deleteEmployeeById)
      .then((res) => {
        alert('great delete done!!!');
        setModalVisible(!modalVisible);
        setTimeout(() => {
          navigation.navigate('AdminManage')
        }, 1000);
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <>
      <SafeAreaView>
        <View className="flex-row items-center justify-end mr-2 mt-3">
          <Text className="mr-2 font-bold">{adminName !== null ? adminName : adminNameByType}</Text>
          <UsersIcon size={40} color="#00CCBB" />
        </View>

        <View className="justify-center items-center mt-6 mb-5">
          <Text className="font-bold text-2xl text-blue-700 ">
            Private User Info
          </Text>
        </View>

        {/* User Info locate */}
        <ScrollView className="p-2">
          <SafeAreaView className="mt-1 ">
            <View className="items-center justify-center p-3 border bg-teal-50 rounded-md ">
              <Text className="text-lg font-bold">User Info</Text>
              <View className="mt-6 left-1/5">
                <Text className="mb-2 font-bold">Name:  {route.params.name}</Text>
                <Text className="mb-2 font-bold">Email:  {route.params.email}</Text>
                <Text className="mb-2 font-bold">Phone:  {route.params.phone}</Text>
                <Text className="mb-2 font-bold">Address:  {route.params.address}</Text>

              </View>

            </View>
          </SafeAreaView>
        </ScrollView>

        <SafeAreaView className="items-end mr-2 flex-row justify-end">
          <View className="border-2 w-1/4 rounded-md mr-2">
            <Button textColor="black" onPress={() => navigation.navigate('UserEditInfoByAdmin', { idEdit: route.params.id, company_codeEdit: route.params.company_code, nameEdit: route.params.name, addressEdit: route.params.address, phoneEdit: route.params.phone, emailEdit: route.params.email })}>User Edit</Button>
          </View>

          <View className="border-2 w-1/4 rounded-md ">
            <Button textColor="black" onPress={() => setModalVisible(true)}>Delete</Button>
          </View>
        </SafeAreaView>

        <View className="justify-center items-center mt-6 mb-5">
          <Text className="font-bold text-2xl text-blue-700 ">Info Details</Text>
        </View>

        {/* Filter locate */}
        {/* <View className="opacity-40 p-3 ">
        <Searchbar
          placeholder="filter"
          className="bg-teal-50 opacity-60 shadow-md  "
        />
      </View> */}

        {/* Check in/Out info  locate*/}
        <ScrollView className="p-2 ">
          <SafeAreaView className="mt-3">
            <View className="p-2 border bg-teal-50 rounded-md ">
              <DataTable>
                <DataTable.Header className="justify-center items-center">
                  <DataTable.Title>
                    <Text className="font-bold text-base ">Time Zone</Text>
                  </DataTable.Title>
                  <DataTable.Title className="justify-center items-center">
                    <Text className="font-bold text-base ">Ca</Text>
                  </DataTable.Title>
                  <DataTable.Title className="justify-center items-center">
                    <Text className="font-bold text-base ">Check In</Text>
                  </DataTable.Title>
                  <DataTable.Title
                    numeric
                    className="justify-center items-center"
                  >
                    <Text className="font-bold text-base ">Check Out</Text>
                  </DataTable.Title>
                </DataTable.Header>

                {employeeInfoShowTable === null ? <Text> There is no data at this right now!!!</Text> : employeeInfoShowTable.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage).map((value, key) => {
                  return (
                    <DataTable.Row key={key}>
                      <DataTable.Cell >
                        <Text className=" text-base ">{value.shiftsName}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell className='justify-center items-center'>
                        <Text className=" text-base ">{value.monthpart}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell numeric className='justify-center items-center'>
                        <Text className=" text-base ">{value.checkInTime}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell numeric className='justify-center items-center'>
                        <Text className=" text-base ">{value.checkOutTime}</Text>
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

      </SafeAreaView>

      {/* AdminBottomNavigate */}
      <AdminBottomNavigate />

      {/* Modal locate */}
      <View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}
          onRequestClose={() => {
            alert('close modal');
            setModalVisible(!modalVisible);
          }}>
          <View className='flex-1 justify-center items-center mt-10'>
            <View className='bg-cyan-200 rounded-md p-6 '>
              <Text className=' text-center mb-3 mt-1 font-bold'>Are you sure to delete this user !!!</Text>

              <View className='flex-row justify-center items-center'>
                <Pressable className='bg-slate-500 p-2 rounded-md mr-1'
                  onPress={() => deleteUser()}>
                  <Text className=' opacity-6 text-base mb-2 w-20 text-center font-bold'>Delete</Text>
                </Pressable>
                <Pressable className='bg-slate-500 p-2 rounded-md ml-1'
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text className=' opacity-6 text-base mb-2 w-20 text-center font-bold'>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default UserInfoManageByAdminPage;
