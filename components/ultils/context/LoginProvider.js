import AsyncStorage from '@react-native-async-storage/async-storage';
import React ,{createContext, useContext, useEffect, useState } from 'react'


const LoginContext = createContext();

const LoginProvider = ({children}) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState('');
  // store id is using for log in 
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [userCompanyCode, setUserCompanyCode] =  useState('');
  const [checkInOutId, setCheckInOutId] = useState('');

  //login by typing text 
  const [userIdByType, setUserIdByType] = useState('');
  const [userEmailByType, setUserEmailByType] = useState('');
  const [userPassWordByType, setUserPassWordByType] = useState('');
  const [employeeNameByType, setEmployeeNameByType] = useState('');
  const [userCompanyCodeByType, setUserCompanyCodeByType] = useState('');

  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminCompanyCode, setAdminCompanyCode] = useState('');

  //login by typing text 
  const [adminIdByType, setAdminIdByType] = useState('');
  const [adminEmailByType,setAdminEmailByType] = useState('');
  const [adminPassWordByType, setAdminPassWordByType] = useState('');
  const [adminNameByType, setAdminNameByType] = useState('');
  const [adminCompanyCodeByType, setAdminCompanyCodeByType] = useState('');

  return (
  <LoginContext.Provider value={{userId, setUserId, 
                                userPassword, setUserPassword, 
                                employeeName, setEmployeeName,
                                emailUser, setEmailUser,
                                userCompanyCode, setUserCompanyCode,
                                checkInOutId, setCheckInOutId,
                                adminId, setAdminId,
                                adminPassword, setAdminPassword,
                                adminName, setAdminName,
                                adminCompanyCode, setAdminCompanyCode,
                                userIdByType, setUserIdByType,
                                adminEmailByType,setAdminEmailByType,
                                userEmailByType, setUserEmailByType,
                                userPassWordByType, setUserPassWordByType,
                                employeeNameByType, setEmployeeNameByType,
                                userCompanyCodeByType, setUserCompanyCodeByType,
                                adminIdByType, setAdminIdByType,
                                adminPassWordByType, setAdminPassWordByType,
                                adminNameByType, setAdminNameByType,
                                adminCompanyCodeByType, setAdminCompanyCodeByType }}>
    {children}
  </LoginContext.Provider>
  )
}

// export const useLogin = () => useContext(LoginContext);

export  {LoginProvider, LoginContext}

