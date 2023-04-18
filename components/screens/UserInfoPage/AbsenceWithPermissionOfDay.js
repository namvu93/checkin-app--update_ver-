import { View, Text, SafeAreaView, TouchableOpacity} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LoginContext } from "../../ultils/context/LoginProvider";
import client from "../../api/client";
import { UsersIcon, HomeIcon, AdjustmentsVerticalIcon, BookOpenIcon } from "react-native-heroicons/outline";
import DateTimePickerModal from "react-native-modal-datetime-picker";


const AbsenceWithPermissionOfDay = () => {

  const { userId, userPassword, employeeName, userCompanyCode, checkInOutId, setCheckInOutId,
    userIdByType, userPassWordByType, employeeNameByType, userCompanyCodeByType } = useContext(LoginContext);
  const navigation = useNavigation();
  const route = useRoute();
  const token = route.params.tokenPass;

  //get some variables for datepicker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isVisibleStartDate, setIsVisibleStartDate] = useState(false);
  const [isVisibleEndDate, setIsVisibleEndDate] = useState(false);

  

  // function for handel picker date value *********
  const datesArray = [];

  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    datesArray.push(new Date(date));
  }

  const formattedDatesArray = datesArray.map(date => {
    return date.toISOString().slice(0, 10);
  });
// *************************************************

const takeDateOffHandle = () => {
  postDateOffIntoDatabaseHandle();
  setTimeout(() => {
    alert('Great, take day_off success')
  }, 700);
}
  // Post data to get date_off
  const postDateOffIntoDatabaseHandle = async () => {
    formattedDatesArray.forEach((dayOff) => {
      const resData = client.post("/checkinout/CheckIn",
        {
          user_id: userId !== null ? userId : userIdByType,
          shifts_name: "A",
          check_in_time: "00:00:00",
          check_out_time: "00:00:00",
          day_off: dayOff,
          created_at: dayOff,
          updated_at: dayOff
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
        .then((res) => {
          console.log('great', res.data.data)
        })
        .catch((err) => {
          console.log(err.message)
        })
    })
  }

  const handlePickerVisibilityStartDate = () => {
    setIsVisibleStartDate(!isVisibleStartDate);
  };

  const handlePickerVisibilityEndDate = () => {
    setIsVisibleEndDate(!isVisibleEndDate);
  };

  const handleDateTimeChangeStartDate = (date) => {
    setStartDate(date);
    setIsVisibleStartDate(false);
  };

  const handleDateTimeChangeEndDate = (date) => {
    setEndDate(date);
    setIsVisibleEndDate(false);
  };


  return (
    <>
      <SafeAreaView className="flex-1 max-w-screen-lg max-h-screen bg-gray-500">
        <View className="flex-row items-center justify-end mr-2 mt-4 mb-20">
          <Text className="mr-2 font-bold">  {employeeName !== null ? employeeName : employeeNameByType}  </Text>
          <UsersIcon size={40} color="#00CCBB" />
        </View>

        <View className="justify-center items-center mt-6 mb-10">
          <Text className="font-bold text-2xl text-blue-700 ">Date dayOff</Text>
        </View>

        {/* Start_date and end_date location */}
        <View className="flex-1 justify-center items-center mb-14">
          <View>
            <TouchableOpacity onPress={handlePickerVisibilityStartDate}
              className="border-2 h-12 w-80 items-center justify-center border-indigo-600  rounded-lg mt-4 bg-indigo-600 shadow-lg shadow-yellow-500/50">
              <View>
                <Text className="font-bold text-lg">Start Date</Text>
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isVisibleStartDate}
              mode="date"
              onConfirm={handleDateTimeChangeStartDate}
              onCancel={handlePickerVisibilityStartDate}
            />

            <TouchableOpacity onPress={handlePickerVisibilityEndDate}
              className="border-2 h-12 w-80 items-center justify-center border-indigo-600  rounded-lg mt-4 bg-indigo-600 shadow-lg shadow-yellow-500/50">
              <View>
                <Text className="font-bold text-lg">End Date</Text>
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isVisibleEndDate}
              mode="date"
              onConfirm={handleDateTimeChangeEndDate}
              onCancel={handlePickerVisibilityEndDate}
            />
          </View>

          <TouchableOpacity
            className="border-2 h-12 w-80 items-center justify-center border-yellow-300  rounded-lg mt-[60px] bg-yellow-500 shadow-lg shadow-yellow-500/50"
            onPress={() => takeDateOffHandle()}>
            <Text className="font-bold text-lg">Take Day Off</Text>
          </TouchableOpacity>
        </View>

        {/* AdminBottomNavigate */}
        <SafeAreaView className="fixed flex-1 justify-end bottom-[-35]">
          <View className="flex flex-row justify-around items-center bg-slate-700 h-20 ">
            <TouchableOpacity onPress={() => navigation.navigate('Home')}
              className="hover:bg-red-400 ">
              <View className="flex flex-col items-center">
                <HomeIcon width={30} height={30} />
                <Text className="text-sm font-bold">Home</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('check')}
              className="hover:bg-red-400 ">
              <View className="flex flex-col items-center">
                <BookOpenIcon width={30} height={30} />
                <Text className="text-sm font-bold">User</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('UserSignOut')}
              className="hover:bg-red-400 ">
              <View className="flex flex-col items-center">
                <AdjustmentsVerticalIcon width={30} height={30} />
                <Text className="text-sm font-bold">Home</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaView>
    </>
  )
}

export default AbsenceWithPermissionOfDay