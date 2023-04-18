import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { Button } from "@react-native-material/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UsersIcon, HomeIcon, AdjustmentsVerticalIcon, BookOpenIcon } from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from "../../ultils/context/LoginProvider";
import client from "../../api/client";
import * as Location from 'expo-location';
import { getDistance } from "geolib";
import axios from "axios";


const UserCheckInOutPage = ({ }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = route.params.tokenPass;
  //     useLayoutEffect(() => {
  //       navigationChange.setOptions({
  //           headerShown: false,
  //       })
  //   },[])

  const { userId, userPassword, employeeName, userCompanyCode, checkInOutId, setCheckInOutId,
    userIdByType, userEmailByType, userPassWordByType, employeeNameByType, userCompanyCodeByType } = useContext(LoginContext);

  // set Timezone repairing for post checkInTime/OutTime method
  const today = new Date();
  const getSeconds = ('0' + today.getSeconds()).slice(-2);
  const getMinutes = ('0' + today.getMinutes()).slice(-2);
  const getHours = today.getHours();
  // const getDate = today.getDate();
  const getDate = today.getDate() >= 10 ? today.getDate() : '0'+ today.getDate(); 
  const getMonth = today.getMonth() + 1;
  const getYear = today.getFullYear();
  const getMonthCheck = (today.getMonth() + 1 >= 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1));

  // get some variables 
  const [checkInTimeSeconds, setCheckInTimeSeconds] = useState('00')
  const [checkInTimeMinutes, setCheckInTimeMinutes] = useState('00');
  const [checkInTimeHours, setCheckInTimeHours] = useState('00');
  const [checkOutTimeSeconds, setCheckOutTimeSeconds] = useState('00');
  const [checkOutTimeMinutes, setCheckOutTimeMinutes] = useState('00');
  const [checkOutTimeHours, setCheckOutTimeHours] = useState('00');
  const [showButtonCheckIn, setShowButtonCheckIn] = useState(false);
  const [showButtonCheckOut, setShowButtonCheckOut] = useState(true);
  const [checkOutId, setCheckOutId] = useState([]);

  // Gps state
  const [latitudeCheck, setLatitudeCheck] = useState("");
  const [longitudeCheck, setLongitudeCheck] = useState("");
  const [distanceCheck, setDistanceCheck] = useState("");

  // repairing for post value
  // const checkInPost = {
  //   employee_id: userId !== null ? userId : userIdByType,
  //   company_code: userCompanyCode !== null ? userCompanyCode : userCompanyCodeByType,
  //   shiftsName: "A",
  //   checkInTime: getHours + ':' + getMinutes + ':' + getSeconds
  // }

  const checkInPost = {
    user_id: userId !== null ? userId : userIdByType,
    shifts_name: "A",
    check_in_time: getHours + ':' + getMinutes + ':' + getSeconds,
  }

  const checkOutPost = {
    id: checkInOutId !== '' ? checkInOutId : checkOutId,
    user_id: userId !== null ? userId : userIdByType,
    shifts_name: "A",
    check_out_time: getHours + ':' + getMinutes + ':' + getSeconds
  }

  // repairing for get data value (using for auto getting checkInTime if has)
  const checkDataUser = {
    // company_code: userCompanyCode !== null ? userCompanyCode : userCompanyCodeByType,
    user_id: userId !== null ? userId : userIdByType
  }

  const checkInHandle = () => {
    checkInTimeToPostMethod();
  }

  const checkOutHandle = () => {
    if (distanceCheck < 50000) {
      setCheckOutTimeHours(getHours);
      setCheckOutTimeMinutes(getMinutes);
      setCheckOutTimeSeconds(getSeconds);
    }
    checkOutTimeToPostMethod();
    console.log('checkDistance', distanceCheck, 'm');
  }

  // const checkInTimeToPostMethod = async () => {
  //   setShowButtonCheckOut(true);
  //   check location by gps for sure that can be able checkIn
  //   if (distanceCheck > 5000 || distanceCheck === "" || distanceCheck === undefined) {
  //     getGpsLocation();
  //     alert('Please wait, loading your GPS !!!')
  //   } else if (distanceCheck > 6000 || distanceCheck === "") {
  //     getGpsLocation();
  //     alert('your are currently out of check in range: ' + `${distanceCheck}` + "meters")
  //   } else if (distanceCheck < 5000) {
  //     const resData = await client.post("/CheckIn", { ...checkInPost })
  //       .then((res) => {
  //         alert('has been checkIn done');
  //         setCheckInTimeHours(getHours);
  //         setCheckInTimeMinutes(getMinutes);
  //         setCheckInTimeSeconds(getSeconds);
  //         // setCheckInTimeSeconds(getSeconds);

  //         setCheckInOutId(res.data.data.id)
  //         setShowButtonCheckOut(false);
  //         setShowButtonCheckIn(true);
  //       })
  //       .catch((err) => {
  //         alert('something wrong')
  //         console.log(err.message)
  //       })
  //   }
  // }
// ******************************************** check in (with check location)
  const checkInTimeToPostMethod = async () => {
    setShowButtonCheckOut(true);
    // check location by gps for sure that can be able checkIn
    if (distanceCheck > 5000 || distanceCheck === "" || distanceCheck === undefined) {
      getGpsLocation();
      alert('Please wait, loading your GPS !!!')
    } else if (distanceCheck > 6000 || distanceCheck === "") {
      getGpsLocation();
      alert('your are currently out of check in range: ' + `${distanceCheck}` + "meters")
    } else if (distanceCheck < 5000) {
      const resData = await client.post("/checkinout/CheckIn", { ...checkInPost },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((res) => {
        alert('has been checkIn done');
        console.log('res', res.data.data)
        setCheckInOutId(res.data.data.id)
        setCheckInTimeHours(getHours);
        setCheckInTimeMinutes(getMinutes);
        setCheckInTimeSeconds(getSeconds);
        setShowButtonCheckOut(false);
        setShowButtonCheckIn(true);
      })
      .catch((err) => {
        alert('something wrong')
        console.log(err.message)
      })
    }
  }
// ******************************************** check in (with check location)

  // const checkInTimeToPostMethod = async () => {
  //   const resData = await client.post("/checkinout/CheckIn", { ...checkInPost },
  //     {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`
  //       }
  //     }
  //   )
  //     .then((res) => {
  //       alert('has been checkIn done');
  //       console.log('res', res.data.data)
  //       setCheckInOutId(res.data.data.id)
  //       setCheckInTimeHours(getHours);
  //       setCheckInTimeMinutes(getMinutes);
  //       setCheckInTimeSeconds(getSeconds);
  //       setShowButtonCheckOut(false);
  //       setShowButtonCheckIn(true);
  //     })
  //     .catch((err) => {
  //       alert('something wrong')
  //       console.log(err.message)
  //     })
  // }

  // const checkOutTimeToPostMethod = async () => {
  //   const resData = await client.post("/checkinout/CheckOut", { ...checkOutPost },
  //     {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`
  //       }
  //     }
  //   )
  //     .then((res) => {
  //       alert('has been checkOut done');
  //       console.log(res.data)
  //       setShowButtonCheckIn(false);
  //       // console.log('getData', res.data.data);
  //     })
  //     .catch((err) => {
  //       alert('has some issue and need more repair')
  //       console.log(err.message)
  //     })
  // }

  // const checkOutTimeToPostMethod = async () => {
  //   check location by gps for sure that can be able checkOut
  //   if (distanceCheck > 50000 || distanceCheck === "" || distanceCheck === undefined) {
  //     getGpsLocation();
  //     alert('Please wait, loading your GPS !!!')
  //   } else if (distanceCheck > 60000 || distanceCheck === "") {
  //     getGpsLocation();
  //     alert('your are currently out of check in range: ' + `${distanceCheck}` + "meters")
  //   } else if (distanceCheck < 50000) {
  //     const resData = await client.post("/checkinout/CheckOut", { ...checkOutPost })
  //       .then((res) => {
  //         alert('has been checkOut done');
  //         setShowButtonCheckIn(false);
  //       })
  //       .catch((err) => {
  //         alert('has some issue and need more repair')
  //         console.log(err.message)
  //       })
  //   }
  // }

  // ******************************************** check out (with check location)
  const checkOutTimeToPostMethod = async () => {
    // check location by gps for sure that can be able checkOut
    if (distanceCheck > 50000 || distanceCheck === "" || distanceCheck === undefined) {
      getGpsLocation();
      alert('Please wait, loading your GPS !!!')
    } else if (distanceCheck > 60000 || distanceCheck === "") {
      getGpsLocation();
      alert('your are currently out of check in range: ' + `${distanceCheck}` + "meters")
    } else if (distanceCheck < 50000) {
      const resData = await client.post("/checkinout/CheckOut", { ...checkOutPost },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((res) => {
        alert('has been checkOut done');
        console.log(res.data)
        setShowButtonCheckIn(false);
        // console.log('getData', res.data.data);
      })
      .catch((err) => {
        alert('has some issue and need more repair')
        console.log(err.message)
      })
    }
  }
  // ******************************************** check out (with check location)

  // const getDataLoading = async () => {
  //   const resDate = await client.get(`/checkinout/getAllCheckByemployeeId?user_id=${checkDataUser.user_id}`, 
  //   {
  //     headers: {
  //             'Accept': 'application/json',
  //             'Content-Type': 'application/json',
  //              Authorization : `Bearer ${token}`
  //             }
  // } 
  //   )
  //     .then((res) => {
  //       const separateTime = getYear + "-" + getMonthCheck + "-" + getDate;
  //       const getInfo = res.data.data;
  //       getInfo.filter((getTime) => {
  //         return getTime.created_at.slice(0, 10) == separateTime
  //       }).map((value) => {
  //         setCheckInTimeHours(value.check_in_time.slice(0, 2));
  //         setCheckInTimeMinutes(value.check_in_time.slice(3, 5));
  //         setCheckInTimeSeconds(value.check_in_time.slice(6, 8));

  //         if (value.check_out_time !== null){
  //           setCheckOutTimeHours(value.check_out_time.slice(0, 2));
  //           setCheckOutTimeMinutes(value.check_out_time.slice(3, 5));  
  //           setCheckOutTimeSeconds(value.check_out_time.slice(6, 8))
  //         }

  //         if (value.check_in_time !== null && value.check_out_time ==  null){
  //           setShowButtonCheckOut(false);
  //           setShowButtonCheckIn(true);
  //         } else if (value.check_in_time !== null && value.check_out_time !== null) {
  //           setShowButtonCheckOut(false);
  //           setShowButtonCheckIn(false);
  //         } 
  //         setCheckOutId(value.id)
  //       })
  //     })
  //     .catch((err) => {
  //       alert('something stuck and need to check');
  //       console.log(err.message)
  //     })
  // }

  const getDataLoading = async () => {
    const resDate = await client.get(`/checkinout/getAllCheckByemployeeId?user_id=${checkDataUser.user_id}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then((res) => {
        const separateTime = getYear + "-" + getMonthCheck + "-" + getDate;
        const getInfo = res.data.data;
        getInfo.filter((getTime) => {
          return getTime.created_at.slice(0, 10) == separateTime
        }).map((value) => {
          // set show time check_in
          if (value.check_in_time.length === 7) {
            setCheckInTimeHours(value.check_in_time.slice(0, 1));
            setCheckInTimeMinutes(value.check_in_time.slice(2, 4));
            setCheckInTimeSeconds(value.check_in_time.slice(5, 7));
          } else {
            setCheckInTimeHours(value.check_in_time.slice(0, 2));
            setCheckInTimeMinutes(value.check_in_time.slice(3, 5));
            setCheckInTimeSeconds(value.check_in_time.slice(6, 8));
          };

          // set show time check_out
          if (value.check_out_time !== null) {
            switch(value.check_out_time.length) {
              case 7:
                setCheckOutTimeHours(value.check_out_time.slice(0, 1));
                setCheckOutTimeMinutes(value.check_out_time.slice(2, 4));
                setCheckOutTimeSeconds(value.check_out_time.slice(5, 7));
                break
              case 8:
                setCheckOutTimeHours(value.check_out_time.slice(0, 2));
                setCheckOutTimeMinutes(value.check_out_time.slice(3, 5));
                setCheckOutTimeSeconds(value.check_out_time.slice(6, 8));
                break
              default:
                setCheckOutTimeHours('00');
                setCheckOutTimeMinutes('00');
                setCheckOutTimeSeconds('00');
                break
            }
          } 

          if (value.check_in_time !== null && value.check_out_time == null) {
            setShowButtonCheckOut(false);
            setShowButtonCheckIn(true);
          } else if (value.check_in_time !== null && value.check_out_time !== null) {
            setShowButtonCheckOut(false);
            setShowButtonCheckIn(false);
          }
          setCheckOutId(value.id)
        })
      })
      .catch((err) => {
        alert('something stuck and need to check');
        console.log(err.message)
      })
  }

  // get map permissions
  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
  };

  // get map Gps
  const getGpsLocation = async () => {
    return new Promise(async (resolve) => {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLatitudeCheck(location.coords.latitude);
      setLongitudeCheck(location.coords.longitude);
      getDistanceCalculation();
      return resolve(true);
    });
  };

  // get distance calculation
  const getDistanceCalculation = () => {
    return new Promise(async (resolve) => {
      var dis = getDistance(
        { latitude: 10.787957, longitude: 106.678361 },
        { latitude: latitudeCheck, longitude: longitudeCheck }
      );
      setDistanceCheck(dis);
      return resolve(true);
    });
  };

  // reset checkInTimeButton
  const resetAtMidnight = () => {
    const now = new Date()
    const night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // the next day, ...
      0, 0, 0 // ...at 00:00:00 hours
    );
    const msToMidNight = night.getTime() - now.getTime();

    setTimeout(() => {
      setShowButtonCheckIn(true);
      setCheckInTimeSeconds('00')
      setCheckInTimeMinutes('00')
      setCheckInTimeHours('00')

      setCheckOutTimeHours('00');
      setCheckOutTimeMinutes('00');
      setCheckOutTimeSeconds('00');

      console.log(`code will be triggered after: ${msToMidNight} `)
    }, msToMidNight);
  }

  useEffect(() => {
    getDataLoading();
    resetAtMidnight();
    // console.log('token', token);
  }, [])

  useEffect(() => {
    getPermissions();
    getGpsLocation();
  }, [employeeName, distanceCheck]);

  return (
    <>
      <SafeAreaView className="flex-1 max-w-screen-lg max-h-screen bg-gray-500">
        <View className="flex-row items-center justify-end mr-2 mt-4 mb-20">
          <Text className="mr-2 font-bold">  {employeeName !== null ? employeeName : employeeNameByType}  </Text>
          <UsersIcon size={40} color="#00CCBB" />
        </View>

        <View className="flex-1 justify-center items-center mb-14">
          <View className="flex-row flex space-x-1">
            <View className="w-5/12 h-40 justify-center items-center bg-cyan-400 rounded-lg border-2 border-sky-600">
              {/* <Text>CheckInTime</Text> */}
              <Text className='font-extrabold text-xl'>{checkInTimeHours}:{checkInTimeMinutes}:{checkInTimeSeconds}</Text>
            </View>

            <View className="w-5/12 h-40 justify-center items-center bg-cyan-400 rounded-lg border-2 border-sky-600">
              {/* <Text>CheckOutTime</Text> */}
              <Text className='font-extrabold text-xl'>{checkOutTimeHours}:{checkOutTimeMinutes}:{checkOutTimeSeconds}</Text>
            </View>
          </View>
        </View>

        <View className="flex-1 justify-center items-center mb-20 mt-5">
          {showButtonCheckOut && <TouchableOpacity
            className="border-2 h-12 w-80 items-center justify-center border-yellow-300  rounded-lg mt-4 bg-yellow-500 shadow-lg shadow-yellow-500/50 "
            onPress={() => checkInHandle()}>
            <Text className="font-bold text-lg">CheckIn</Text>
          </TouchableOpacity>}

          {showButtonCheckIn ? <TouchableOpacity
            className="border-2 h-12 w-80 items-center justify-center border-yellow-300  rounded-lg mt-4 bg-yellow-500 shadow-lg shadow-yellow-500/50"
            onPress={() => checkOutHandle()}>
            <Text className="font-bold text-lg">CheckOut</Text>
          </TouchableOpacity> : <View></View>}
        </View>

        {/* DayOff need permission zone */}
        <View className="flex-row mb-30 ">
          <View className="flex-1 justify-center items-center ">
            <View className="flex-row  space-x-3">
              <View>
                <TouchableOpacity
                  className="justify-center items-center  w-24 h-20 bg-cyan-400 rounded-lg border-2 border-sky-600 shadow-lg shadow-sky-500/50"
                  onPress={() => navigation.navigate('UserRemoteCheckInOut', { tokenPass: token })}>
                  {/* <Text className="font-bold text-md">{route.params.userId}</Text> */}
                  <Text className="font-bold text-md">Remote</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  className="justify-center items-center  w-24 h-20 bg-cyan-400 rounded-lg border-2 border-sky-600 shadow-lg shadow-sky-500/50"
                  onPress={() => navigation.navigate("AbsenceWithPermissionOfDay", { tokenPass: token })}>
                  <Text className="font-bold text-md">DayOff</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* AdminBottomNavigate */}
        <SafeAreaView className="fixed flex-1 justify-end bottom-[-35] ">
          <View className="flex flex-row justify-around items-center bg-slate-700 h-20 ">
            <TouchableOpacity onPress={() => navigation.navigate('Home')}
              className="hover:bg-red-400 ">
              <View className="flex flex-col items-center">
                <HomeIcon width={30} height={30} />
                <Text className="text-sm font-bold">Home</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('UserHistoryInfo',
              { id: userId !== null ? userId : userIdByType, tokenPass: token })}

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
  );
};

export default UserCheckInOutPage;
