import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, DataTable } from "react-native-paper";
import AdminBottomNavigate from "./AdminBottomNavigate";

import { UsersIcon, HomeIcon, AdjustmentsVerticalIcon } from "react-native-heroicons/outline";

const optionsPerPage = [5, 6, 7];
const CurrentUserInfoTables = ({ filterData }) => {
  const navigation = useNavigation();

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0])
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage])

  return (
    <>
      <SafeAreaView className=''>
        <ScrollView className="p-2">
          <SafeAreaView className="mt-3">
            <View className="p-2 border bg-teal-50 rounded-md ">
              <DataTable>
                <DataTable.Header className='justify-center items-center'>
                  <DataTable.Title >
                    <Text className="font-bold text-base ">User</Text>
                  </DataTable.Title>
                  <DataTable.Title className='justify-center items-center'>
                    <Text className="font-bold text-base ">Zone</Text>
                  </DataTable.Title>
                  <DataTable.Title numeric className='justify-center items-center'>
                    <Text className="font-bold text-base ">AllTime</Text>
                  </DataTable.Title>
                  <DataTable.Title numeric className='justify-center items-center'>
                    <Text className="font-bold text-base ">OT</Text>
                  </DataTable.Title>
                  <DataTable.Title numeric className='justify-center items-center'>
                    <Text className="font-bold text-base ">Late</Text>
                  </DataTable.Title>
                  <DataTable.Title numeric className='justify-center items-center'>
                    <Text className="font-bold text-base ">Info</Text>
                  </DataTable.Title>
                </DataTable.Header>

                {filterData === null ? <Text> There is no data at this right now!!!</Text> : filterData.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage).map((value, key) => {
                  return (
                    <DataTable.Row key={key}>
                      <DataTable.Cell >
                        <Text className=" text-base ">{value.name.slice(0, 5)}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell className='justify-center items-center'>
                        <Text className=" text-base ">{value.datePartByMonth}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell numeric className='justify-center items-center'>
                        <Text className=" text-base ">{value.allWorkingTime}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell numeric className='justify-center items-center'>
                        {/* <Text className=" text-base ">{value.overTime.slice(0, 5)}</Text> */}
                        {/* <Text className=" text-base ">{value.overTime.slice(0, 5)}</Text> */}
                      </DataTable.Cell>
                      <DataTable.Cell numeric className='justify-center items-center'>
                        <Text className=" text-base ">{value.latingTime}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell numeric className='justify-center items-center'>

                        <Button className="bg-teal-200 " onPress={() => navigation.navigate('UserInfoManageByAdmin', {
                          id: value.id,
                          company_code: value.company_code,
                          name: value.name,
                          email: value.email,
                          phone: value.phone,
                          address: value.address,
                          // shiftsName: value.shiftsName,
                          // checkInTime: value.checkInTime,
                          // checkOutTime: value.checkOutTime,
                          // dayOffche: value.dayOffche,
                          remote: value.remote
                        })}>
                          More
                        </Button>

                      </DataTable.Cell>
                    </DataTable.Row>
                  )
                })}

                <DataTable.Pagination
                  page={page}
                  onPageChange={page => setPage(page)}
                  label={`${from + 1}-${to} of ${filterData.length}`}
                  showFastPaginationControls
                  optionsPerPage={optionsPerPage}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                  numberOfPages={Math.ceil(filterData.length / optionsPerPage)}


                />
              </DataTable>
            </View>
          </SafeAreaView>
        </ScrollView>
      </SafeAreaView>

      {/* bottom navigator */}
      {/* <SafeAreaView className="">
      <AdminBottomNavigate className='' />
      </SafeAreaView> */}


    </>
  );
};

export default CurrentUserInfoTables;
