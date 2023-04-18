import axios from "axios";

//https://timesheet.allxone.asia/core/public/api/getAllEmployeeInfo
// export default axios.create({baseURL: 'http://127.0.0.1:8001/api' }, {
//     headers: {
//         'Content-type': 'Application/json',
//         'Accept': 'application/json',
//     },
//     data: undefined
//   },);

// https://timesheet.allxone.asia/core/public/
  export default axios.create({baseURL: 'http://127.0.0.1:8001/api' }, 
  // export default axios.create({baseURL: 'https://timesheet.allxone.asia/core/public/api' }, 
  {data: undefined}, {headers:undefined});

// export default axios.create({baseURL: 'https://timesheet.allxone.asia/core/public/api' }, {
//     headers: {
//         'Content-type': 'Application/json',
//         'Accept': 'application/json',
//     },
//     data: undefined
//   },);


