import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/screens/HomeScreen';

import AdminLoginPage from './components/screens/AdminLoginPage';
import AdminManagePage from './components/screens/AdminManagePage';
import UserInfoManageByAdminPage from './components/screens/AdminManagePage/UserInfoManageByAdminPage';
import UserEditInfoByAdmin from './components/screens/AdminManagePage/UserEditInfoByAdmin';
import CreateNewEmployeeByAdmin from './components/screens/AdminManagePage/CreateNewEmployeeByAdmin';
import AdminSignOut from './components/screens/AdminManagePage/AdminSignOut';

import UserCheckInPage from './components/screens/UserCheckInPage';
import UserCheckInOutPage from './components/screens/UserInfoPage/UserCheckInOutPage';
import AbsenceWithPermissionOfDay from './components/screens/UserInfoPage/AbsenceWithPermissionOfDay';
import UserSignOut from './components/screens/UserInfoPage/UserSignOut';
import UserRemoteCheckInOut from './components/screens/UserInfoPage/UserRemoteCheckInOut';
import UserHistoryInfo from './components/screens/UserInfoPage/UserHistoryInfoPage';

import { LoginProvider } from './components/ultils/context/LoginProvider';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();



export default function App() {

  return (
    <>
      <LoginProvider>
      <PaperProvider>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      
      <Stack.Screen name='Home' component={HomeScreen} />

      <Stack.Screen name='AdminLogIn' component={AdminLoginPage} />
      <Stack.Screen name='AdminManage' component={AdminManagePage} />
      <Stack.Screen name='UserInfoManageByAdmin' component={UserInfoManageByAdminPage} />
      <Stack.Screen name='UserEditInfoByAdmin' component={UserEditInfoByAdmin} />
      <Stack.Screen name='CreateNewEmployeeByAdmin' component={CreateNewEmployeeByAdmin} />
      <Stack.Screen name='AdminSignOut' component={AdminSignOut} />

      <Stack.Screen name='UserCheckIn' component={UserCheckInPage}/>
      <Stack.Screen name='UserCheckInOut' component={UserCheckInOutPage}/>
      <Stack.Screen name='UserSignOut' component={UserSignOut}/>
      <Stack.Screen name='UserRemoteCheckInOut' component={UserRemoteCheckInOut}/>
      <Stack.Screen name='UserHistoryInfo' component={UserHistoryInfo}/>
      <Stack.Screen name='AbsenceWithPermissionOfDay' component={AbsenceWithPermissionOfDay}/>
    </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    </LoginProvider>

    </>
  );
}
