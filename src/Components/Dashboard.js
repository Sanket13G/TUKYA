// import AuthContext from '../Components/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import React, { useEffect, useState, useContext } from 'react';
// import '../Components/Style.css';
// import ipaddress from "../Components/IpAddress";
// import axios from "axios";
// import { axisClasses } from '@mui/x-charts';
// import { BarChart } from '@mui/x-charts';
// import Table from 'react-bootstrap/Table';
// import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
// import { Card, CardBody, Row, Col } from "reactstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIdBadge, faChartGantt } from '@fortawesome/free-solid-svg-icons';

// export default function Dashboard222() {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useContext(AuthContext);

//   // If the user is not authenticated, redirect to the login page
//   useEffect(() => {
//     if (!isAuthenticated) {

//       navigate('/login?message=You need to be authenticated to access this page.');
//     }
//   }, [isAuthenticated, navigate]);

//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     role,
//     companyname,
//     branchname,
//     login,
//     logout,
//   } = useContext(AuthContext);

//   // Export Values
//   const [exportOpeningBalance, setExportOpeningBalance] = useState("0");
//   const [exportReceived, setExportReceived] = useState("0");
//   const [exportReceivedsub, setExportReceivedSub] = useState("0");
//   const [exportTotalReceived, setExportTotalReceieved] = useState("0");
//   const [exportDeliveries, setExportDeliveries] = useState("0");
//   const [exportDeliveriesSub, setExportDeliveriesSub] = useState("0");
//   const [exportTotalDeliveries, setExportTotalDeliveries] = useState("0");
//   const [exportRegularSubTotal, setExportRegularSubTotal] = useState("0");
//   const [exportStock, setExportStock] = useState("0");
//   const [exportSubStock , setExportSubStock] = useState("0");
//   // Import Values
//   const [importOpeningBalance, setImportOpeningBalance] = useState("0");
//   const [importReceived, setImportReceived] = useState("0");
//   const [importSubReceived, setImportSubReceived] = useState("0");
//   const [importNIPTReceived, setImportNIPTReceived] = useState("0");
//   const [importTotalReceived, setImportTotalReceived] = useState("0");
//   const [importDeliveries, setImportDeliveries] = useState("0");
//   const [importSubDeliveries, setImportSubDeliveries] = useState("0");
//   const [importNIPTDelivery, setImportNIPTDelivery] = useState("0");
//   const [importTotalDeliveries, setImportTotalDeliveries] = useState("0");
//   const [importStock, setImportStock] = useState("0");
//   const [importSubStock , setImportSubStock ] = useState('0');
//   const [ importNIPTStock,setImportNIPTStock] = useState("0");
  
//   const [importValue, setImportValue] = useState("0");

//   //Forward out and Forward In
//   const [ForwardOut, setForwardOut] = useState("0");
//   const [ForwardIN, setForwardIN] = useState("0");
//   const [importSubOpeningBalance, setImportSubOpeningBalance] = useState("0");
//   const [exportSubOpeningBalance, setExportSubOpeningBalance] = useState("0");
//   // Import Detention Values
//   const [importdetentionDeposite, setImportDetentionDeposite] = useState("0");
//   const [importdetentionDepositeWithdrawn, setImportDetentionDepositeWithdrawn] = useState("0");
//   const [importdetentionOpeningBalanceValue, setImportDetentionOpeningBalanceValue] = useState("0");
//   const [importdetentionStock, setImportDetentionStock] = useState("0");

//   // Export Detention Values
//   const [exportDetentionDeposite, setExportDetentionDeposite] = useState("0");
//   const [exportDetentionDepositeWithdrawn, setExportDetentionDepositeWithdrawn] = useState("0");
//   const [exportDetentionOpeningBalanceValue, setExportDetentionOpeningBalanceValue] = useState("0");
//   const [exportDetentionStock, setExportDetentionStock] = useState("0");

//   // const [dataset, setDataset] = useState([]);

//   const chartSetting = {
//     yAxis: [
//       {
//         label: '',
//       },
//     ],
//     width: 500,
//     height: 300,
//     sx: {
//       [`.${axisClasses.left} .${axisClasses.label}`]: {
//         transform: 'translate(0, 0)',
//       },
//     },
//   };


//   const [dataset, setDataset] = useState([]);
//   const [dataset1, setDataset1] = useState([]);


//   const valueFormatter = (value) => `${value} Packages`;
//   const valueFormatter1 = (value) => `${value} ⟨₹⟩`;


//   const formatYAxisValue = (value) => {
//     // Convert values to millions (M) and round to whole numbers
//     return `${Math.round(value / 1000000)}M`;
//   };


//   const fetchExpoxtData = async () => {
//     console.log("*************************Export Data******************");

//     try {
//       const response = await axios.get(`http://${ipaddress}dashboard/getexportdata/${companyid}/${branchId}`)
//       if (response) {
//         // toast.success("Export Data Fetched successfully", { position: "top-center" });

//         console.log("*************************Export Data******************");
        
//         console.log(response.data.exportData);

       

//         console.log("*************************Import Data******************");
//         console.log(response.data.importData);

// console.log("Export Opening Balance");
//         console.log(response.data.exportData[0]);
//         setExportOpeningBalance(response.data.exportData[0][0]);
//         setExportReceived(response.data.exportData[0][1]);
//         setExportReceivedSub(response.data.exportData[0][3]);
//         setExportStock(response.data.exportData[0][2]);
//         setExportSubStock(response.data.exportData[0][4]);
//         // Calculate the sum
//         const sum11 = parseInt(response.data.exportData[0][0]) + parseInt(response.data.exportData[0][1]) + parseInt(response.data.exportData[0][2]);
//         // Update the state with the sum
//         setExportTotalReceieved(sum11.toString());
//         // console.log("//////////////Export Opening Balance///////////////" + sum11.toString());
//         setExportDeliveries(response.data.exportData[0][5]);
//         setExportDeliveriesSub(response.data.exportData[0][6]);

//         // Calculate the sum1
//         const sum13 = parseInt(response.data.exportData[0][5]) + parseInt(response.data.exportData[0][6]);
//         // Update the state with the sum
//         setExportTotalDeliveries(sum13.toString());

//         setExportDetentionOpeningBalanceValue(response.data.exportData[0][7]);
//         setExportDetentionDeposite(response.data.exportData[0][8]);
//         setExportDetentionDepositeWithdrawn(response.data.exportData[0][9]);

//         const sum42 = parseInt(response.data.exportData[0][7]) + parseInt(response.data.exportData[0][8]) - parseInt(response.data.exportData[0][9]);

//         setExportDetentionStock(sum42);

//         setExportSubOpeningBalance(response.data.exportData[0][10]);














//         setImportOpeningBalance(response.data.importData[0][0]);
//         setImportReceived(response.data.importData[0][1]);
//         setImportSubReceived(response.data.importData[0][3]);
//         setImportNIPTReceived(response.data.importData[0][2]);

//         // const sum = parseInt(response.data[0]) + parseInt(response.data[1]) + parseInt(response.data[2]) + parseInt(response.data[3]);
//         // setImportTotalReceived(sum.toString());

       
        
//         setImportStock(response.data.importData[0][4]);

//         setImportNIPTStock(response.data.importData[0][5]);

//         setImportDeliveries(response.data.importData[0][8]);
//         setImportSubDeliveries(response.data.importData[0][10]);
//         setImportNIPTDelivery(response.data.importData[0][9]);


//         setForwardOut(response.data.importData[0][7]);
//         setForwardIN(response.data.importData[0][6]);

//         setImportSubStock(response.data.importData[0][11]);


//         setImportDetentionOpeningBalanceValue(response.data.importData[0][12]);
//         setImportDetentionDeposite(response.data.importData[0][13]);
//         setImportDetentionDepositeWithdrawn(response.data.importData[0][14]);


//         const sum4 = parseInt(response.data.importData[0][12]) + parseInt(response.data.importData[0][13]) - parseInt(response.data.importData[0][14]);

//         setImportDetentionStock(sum4);

//         setImportSubOpeningBalance(response.data.importData[0][15]);
      

//         // const sum5 = parseInt(response.data[10]) + parseInt(response.data[11]);
//         // setForwardStock(sum5);







//       } else {
//         throw new Error('Failed to get Data');
//       }
//     } catch (error) {
//       console.log("*************************Export Data******************");
//     }
//   };

//   // const fetchImportData = async () => {

//   //   try {
//   //     const response = await axios.get(`http://${ipaddress}dashboard/getimportdata/${companyid}/${branchId}`)
//   //     if (response) {
//   //       // toast.success("Import Data Fetched successfully", { position: "top-center" });

//   //       console.log(response.data);
//   //       setImportOpeningBalance(response.data[0]);
//   //       setImportReceived(response.data[1]);
//   //       setImportSubReceived(response.data[2]);
//   //       setImportNIPTReceived(response.data[3]);

//   //       const sum = parseInt(response.data[0]) + parseInt(response.data[1]) + parseInt(response.data[2]) + parseInt(response.data[3]);
//   //       setImportTotalReceived(sum.toString());

//   //       setImportDeliveries(response.data[4]);
//   //       setImportSubDeliveries(response.data[5]);
//   //       setImportNIPTDelivery(response.data[6]);

//   //       const sum1 = parseInt(response.data[4]) + parseInt(response.data[5]) + parseInt(response.data[6]);
//   //       setImportTotalDeliveries(sum1.toString());

//   //       const sum3 = sum + sum1;
//   //       // setImportStock(sum3);
//   //       setImportStock(response.data[12]);

//   //       setImportDetentionOpeningBalanceValue(response.data[6]);
//   //       setImportDetentionDeposite(response.data[7]);
//   //       setImportDetentionDepositeWithdrawn(response.data[8]);


//   //       const sum4 = parseInt(response.data[6]) + parseInt(response.data[7]) - parseInt(response.data[8]);

//   //       setImportDetentionStock(sum4);

//   //       setForwardOut(response.data[10]);

//   //       setForwardIN(response.data[11]);

//   //       // const sum5 = parseInt(response.data[10]) + parseInt(response.data[11]);
//   //       // setForwardStock(sum5);





//   //     } else {
//   //       throw new Error('Failed to get Data');
//   //     }
//   //   } catch (error) {
//   //   }
//   // };


//   const fetchBarGraphData = async () => {
//     try {
//       const response = await axios.get(`http://${ipaddress}dashboard/getbargraphdata/${companyid}/${branchId}`);


//       if (response && response.data && Array.isArray(response.data)) {
//         const updatedDataset = response.data.map((item) => {
//           return {
//             export: item[0],
//             import: item[1],
//             // month: item[2],
//             month: formatMonth(item[2]),
//           };
//         });

//         setDataset(updatedDataset);
//         // console.log(updatedDataset);
//       } else {
//         throw new Error('Invalid response format');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       // Handle the error, you might want to set a default or empty dataset in case of an error
//     }



//   };

//   const fetchGraphData = async () => {
//     try {
//       const response = await axios.get(`http://${ipaddress}dashboard/getgraphdata/${companyid}/${branchId}`);


//       if (response && response.data && Array.isArray(response.data)) {
//         const updatedDataset = response.data.map((item) => {
//           return {
//             Bill: item[0],
//             Month: formatMonth(item[1]),
//           };
//         });

//         setDataset1(updatedDataset);
//         console.log(updatedDataset);
//       } else {
//         throw new Error('Invalid response format');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       // Handle the error, you might want to set a default or empty dataset in case of an error
//     }
//   };



//   const formatMonth = (dateString) => {
//     // Implement your custom date formatting logic here
//     // For example, converting '2023-10' to '2023-OCT'
//     const [year, month] = dateString.split('-');
//     const monthAbbreviation = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'short' }).toUpperCase();

//     return `${year}-${monthAbbreviation}`;
//   };


//   const [xAxisData, setXAxisData] = useState([]);
//   const [seriesData, setSeriesData] = useState([]);

//   // const fetchGraphData = async () => {
//   //   try {
//   //     const response = await axios.get(`http://${ipaddress}dashboard/getgraphdata/${companyid}/${branchId}`);

//   //     // Assuming response.data is an array of objects like [129931, '2023-10']
//   //     const graphData = response.data;

//   //     // Extracting the first and second values into separate arrays
//   //     const firstValues = graphData.map(data => data[0]);
//   //     const secondValues = graphData.map(data => data[1]);

//   //     // Update the state with the fetched data
//   //     setXAxisData(firstValues);
//   //     setSeriesData(secondValues);

//   //     console.log("xAxisData:", firstValues);
//   //     console.log("seriesData:", secondValues);
//   //   } catch (error) {
//   //     console.error('Error fetching data:', error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   // Fetch data when the component mounts
//   //   fetchGraphData();
//   // }, []);

//   useEffect(() => {
//     fetchExpoxtData();
//     fetchBarGraphData();
//     fetchGraphData();
   
//   }, [0]);

//   // useEffect(() => {
//   //   // Call the fetchExportData method when the component mounts
//   //   fetchExpoxtData(ipaddress, companyid, branchId);
//   //   // fetchImportData(ipaddress, companyid, branchId);
//   //   // fetchBarGraphData(ipaddress, companyid, branchId);
//   //   // fetchGraphData(ipaddress, companyid, branchId);
//   // }, [ipaddress, companyid, branchId]);



//   return (
//     <>
//       <div className='Container'>
//         <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
//           icon={faIdBadge}
//           style={{
//             marginRight: '8px',
//             color: 'black', // Set the color to golden
//           }}
//         />Admin Dashboard</h5>
//         <Card style={{ backgroundColor: "#F8F8F8" }}>
//           <CardBody>
//             <Row>

//               <Col md={6}>

//                 <Table className="table table-bordered custom-table mt-3">
//                   <thead>
//                     <tr className='text-center'>
//                       <th colSpan="4">Export</th>
//                     </tr>
//                     <tr className='text-center'>
//                       <th></th>
//                       <th>Total</th>
//                       <th>Regular</th>
//                       <th>Detention</th>
//                     </tr>
//                   </thead>
//                   <tbody>

//                    <tr className='text-center'>
//                       <th style={{ backgroundColor: '#87CEEB'}} colSpan={4}><b>Opening Balance</b></th>
//                     </tr>

//                     <tr className='text-center'>
//                       <td style={{ width: '220px' }}>Export</td>
//                       <td className='text-center'>{exportOpeningBalance + exportDetentionOpeningBalanceValue} </td>
//                       <td className='text-center'>{exportOpeningBalance}</td>
//                       <td className='text-center'> {exportDetentionOpeningBalanceValue}</td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td style={{ width: '220px' }}>Export-Sub</td>
//                       <td className='text-center'>{exportSubOpeningBalance} </td>
//                       <td className='text-center'>{exportSubOpeningBalance}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td> <b>Sub Total</b></td>
//                       <td className='text-center'><b> {exportOpeningBalance + exportDetentionOpeningBalanceValue + exportSubOpeningBalance}</b></td>
//                       <td className='text-center'><b> {exportOpeningBalance + exportSubOpeningBalance}</b></td>
//                       <td className='text-center'><b>{exportDetentionOpeningBalanceValue}</b></td>
//                     </tr>

//                     <tr style={{ height: '20px' }}>
//                     </tr>
//                     <tr className='text-center'>
//                       <th style={{ backgroundColor: '#87CEEB'}} colSpan={4}><b>Received</b></th>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Export</td>
//                       <td className='text-center'>{exportReceived}</td>
//                       <td className='text-center'>{exportReceived}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Export Subcontract</td>
//                       <td className='text-center'>{exportReceivedsub}</td>
//                       <td className='text-center'>{exportReceivedsub}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td> <b>Sub Total</b></td>
//                       <td className='text-center'><b> { exportReceived + exportReceivedsub}</b></td>
//                       <td className='text-center'><b> {exportReceived + exportReceivedsub}</b></td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr style={{ height: '20px' }}>
//                     </tr>
//                     <tr className='text-center'>
//                       <th style={{ backgroundColor: '#87CEEB'}} colSpan={4}><b>Deliveries</b></th>
//                     </tr>
//                     <tr className='text-center'>
//                       <td className='text-center'>Export</td>
//                       <td className='text-center'> {exportDeliveries}</td>
//                       <td className='text-center'> {exportDeliveries}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td className='text-center'>Export Subcontract</td>
//                       <td className='text-center'>{exportDeliveriesSub}</td>
//                       <td className='text-center'>{exportDeliveriesSub}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td className='text-center'> <b>Sub Total</b></td>
//                       <td className='text-center'><b>{exportDeliveries + exportDeliveriesSub}</b></td>
//                       <td className='text-center'><b>{exportDeliveries + exportDeliveriesSub}</b></td>
//                       <td className='text-center'><b></b></td>
//                     </tr>

//                     <tr style={{ height: '20px' }}>
//                     </tr>
//                     <tr className='text-center'>
//                       <th style={{ backgroundColor: '#87CEEB'}} colSpan={4}><b>Detention</b></th>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Detention Deposit</td>
//                       <td className='text-center'>{exportDetentionDeposite}</td>
//                       <td className='text-center'></td>
//                       <td className='text-center'>{exportDetentionDeposite}</td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Detention Issue & Withdrawn</td>
//                       <td className='text-center'>{exportDetentionDepositeWithdrawn}</td>
//                       <td className='text-center'></td>
//                       <td className='text-center'>{exportDetentionDepositeWithdrawn}</td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td> <b>Sub Total</b></td>
//                       <td className='text-center'><b>{exportDetentionDeposite + exportDetentionDepositeWithdrawn}</b></td>
//                       <td className='text-center'><b></b></td>
//                       <td className='text-center'><b>{exportDetentionDeposite + exportDetentionDepositeWithdrawn}</b></td>
//                     </tr>


//                     <tr style={{ height: '20px' }}>
//                     </tr>
//                     <tr className='text-center'>
//                       <th style={{ backgroundColor: '#87CEEB'}} colSpan={4}><b>Stock</b></th>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Export</td>
//                       <td className='text-center'>{exportStock}</td>
//                       <td className='text-center'>{exportStock}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Export Subcontract</td>
//                       <td className='text-center'>{exportSubStock} </td>
//                       <td className='text-center'> {exportSubStock}</td>
//                       <td className='text-center'> </td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Detention (Export)</td>
//                       <td className='text-center'>{exportDetentionStock} </td>
//                       <td className='text-center'> </td>
//                       <td className='text-center'> {exportDetentionStock}</td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td> <b>Stock at Vault(Total)</b></td>
//                       <td className='text-center'><b>{ exportStock + exportSubStock + exportDetentionStock }</b></td>
//                       <td className='text-center'><b> {exportStock + exportSubStock}</b></td>
//                       <td className='text-center'><b>{exportDetentionStock}</b></td>
//                     </tr>
//                   </tbody>
//                 </Table>


//               </Col>

//               <Col md={6}>

//                 <Table className="table table-bordered custom-table mt-3">
//                   <thead>
//                     <tr className='text-center'>
//                       <th colSpan="4">Import</th>
//                     </tr>
//                     <tr className='text-center'>
//                       <th></th>
//                       <th>Total</th>
//                       <th>Regular</th>
//                       <th>Detention</th>
//                     </tr>
//                   </thead>
//                   <tbody>

//                   {/* <tr style={{ height: '20px' }}>
//                     </tr>  */}
//                     <tr className='text-center'>
//                       <th style={{ backgroundColor: '#87CEEB'}} colSpan={4}><b>Opening balance</b></th>
//                     </tr>
//                     <tr className='text-center'>
//                       <td style={{ width: '240px' }}>Import</td>
//                       <td className='text-center'>{importOpeningBalance + importdetentionOpeningBalanceValue}</td>
//                       <td className='text-center'>{importOpeningBalance}</td>
//                       <td className='text-center'>{importdetentionOpeningBalanceValue}</td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td style={{ width: '240px' }}>Import Subcontract</td>
//                       <td className='text-center'>{importSubOpeningBalance}</td>
//                       <td className='text-center'>{importSubOpeningBalance}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td> <b>Sub Total</b></td>
//                       <td className='text-center'><b>{ importOpeningBalance + importdetentionOpeningBalanceValue +importSubOpeningBalance}</b></td>
//                       <td className='text-center'><b>{importOpeningBalance + importSubOpeningBalance }</b></td>
//                       <td className='text-center'><b>{importdetentionOpeningBalanceValue}</b></td>
//                     </tr>
//                     <tr style={{ height: '20px' }}>
//                     </tr> 
//                     <tr className='text-center'>
//                       <th style={{ backgroundColor: '#87CEEB'}} colSpan={4}><b>Received</b></th>
//                     </tr>

//                     <tr className='text-center'>
//                       <td>Import From Cargo</td>
//                       <td className='text-center'>{importReceived}</td>
//                       <td className='text-center'>{importReceived} </td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Import Subcontract</td>
//                       <td className='text-center'>{importSubReceived}</td>
//                       <td className='text-center'>{importSubReceived}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Import NIPT</td>
//                       <td className='text-center'>{importNIPTReceived}</td>
//                       <td className='text-center'>{importNIPTReceived}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td> <b>Sub Total</b></td>
//                       <td className='text-center'><b>{importReceived + importNIPTReceived + importSubReceived}</b></td>
//                       <td className='text-center'><b>{importReceived + importSubReceived + importNIPTReceived}</b></td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr style={{ height: '20px' }}>
//                     </tr>
//                     <tr style={{ height: '20px' }}>
//                     </tr> 
//                     <tr className='text-center'>
//                       <th style={{ backgroundColor: '#87CEEB'}} colSpan={4}><b>Deliveries</b></th>
//                     </tr>
//                     <tr className='text-center'>
//                       <td className='text-center'>Import</td>
//                       <td className='text-center'>{importDeliveries}</td>
//                       <td className='text-center'>{importDeliveries}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td className='text-center'>Import NIPT</td>
//                       <td className='text-center'>{importNIPTDelivery}</td>
//                       <td className='text-center'>{importNIPTDelivery}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td className='text-center'>Import Subcontract</td>
//                       <td className='text-center'>{importSubDeliveries}</td>
//                       <td className='text-center'>{importSubDeliveries}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td className='text-center'> <b>Sub Total</b></td>
//                       <td className='text-center'><b>{importDeliveries + importNIPTDelivery + importSubDeliveries}</b></td>
//                       <td className='text-center'><b>{importDeliveries + importNIPTDelivery + importSubDeliveries}</b></td>
//                       <td className='text-center'><b></b></td>
//                     </tr>

//                     <tr style={{ height: '20px' }}>
//                     </tr>
//                     <tr className='text-center'>
//                       <th style={{ backgroundColor: '#87CEEB'}} colSpan={4}><b>Detention</b></th>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Detention Deposit</td>
//                       <td className='text-center'>{importdetentionDeposite}</td>
//                       <td className='text-center'></td>
//                       <td className='text-center'>{importdetentionDeposite}</td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Detention Issue & Withdrawn</td>
//                       <td className='text-center'>{importdetentionDepositeWithdrawn}</td>
//                       <td className='text-center'></td>
//                       <td className='text-center'>{importdetentionDepositeWithdrawn}</td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td> <b>Sub Total</b></td>
//                       <td className='text-center'><b>{importdetentionDeposite + importdetentionDepositeWithdrawn}</b></td>
//                       <td className='text-center'><b></b></td>
//                       <td className='text-center'><b>{importdetentionDeposite + importdetentionDepositeWithdrawn}</b></td>
//                     </tr>

//                     <tr style={{ height: '20px' }}>
//                     </tr>

//                     <tr className='text-center'>
//                       <th style={{ backgroundColor: '#87CEEB'}} colSpan={4}><b>Forwarded Packages</b></th>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Forwarded Out</td>
//                       <td className='text-center'>{ForwardOut}</td>
//                       <td className='text-center'>{ForwardOut}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Forwarded In</td>
//                       <td className='text-center'>{ForwardIN}</td>
//                       <td className='text-center'>{ForwardIN}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td><b>Sub Total</b></td>
//                       <td className='text-center'><b>{ForwardIN +ForwardOut}</b></td>
//                       <td className='text-center'><b>{ForwardIN +ForwardOut}</b></td>
//                       <td className='text-center'><b></b></td>
//                     </tr>
//                     <tr style={{ height: '20px' }}>
//                     </tr> 
//                     <tr className='text-center'>
//                       <th style={{ backgroundColor: '#87CEEB'}} colSpan={4}><b>Stock</b></th>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Import</td>
//                       <td className='text-center'>{importStock}</td>
//                       <td className='text-center'> {importStock}</td>
//                       <td className='text-center'> </td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Import NIPT</td>
//                       <td className='text-center'>{importNIPTStock}</td>
//                       <td className='text-center'>{importNIPTStock}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Import (Subcontract)</td>
//                       <td className='text-center'>{importSubStock}</td>
//                       <td className='text-center'>{importSubStock}</td>
//                       <td className='text-center'></td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td>Detention (Import)</td>
//                       <td className='text-center'>{importdetentionStock}</td>
//                       <td className='text-center'> </td>
//                       <td className='text-center'>{importdetentionStock}</td>
//                     </tr>
//                     <tr className='text-center'>
//                       <td> <b>Stock at Vault(Total)</b></td>
//                       <td className='text-center'><b>{importStock + importNIPTStock + importSubStock + importdetentionStock}</b></td>
//                       <td className='text-center'><b> {importStock + importNIPTStock + importSubStock}</b></td>
//                       <td className='text-center'><b>{importdetentionStock}</b></td>
//                     </tr>

//                   </tbody>
//                 </Table>


//               </Col>
//             </Row>
// {/* 
//           </CardBody>
//         </Card>

//         <Card style={{ marginTop: 25 }} >
//           <CardBody> */}
//           <Row style={{ marginTop: '20px', backgroundColor: 'white' }}>

//               <Col md={6} className='text-center' style={{ marginTop: '30px' }} >
//                 <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%' }} > <FontAwesomeIcon
//                   icon={faChartGantt}
//                   style={{
//                     marginRight: '8px',
//                     color: 'black', // Set the color to golden
//                   }}
//                 />Export & Import (Monthwise) </h5>


//                 {dataset && dataset.length > 0 && (
//                   <BarChart
//                     style={{ marginLeft: '10px' }}
//                     dataset={dataset}
//                     xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
//                     series={[
//                       { dataKey: 'export', label: 'Export', valueFormatter },
//                       { dataKey: 'import', label: 'Import', valueFormatter },
//                     ]}
//                     {...chartSetting}
//                   />
//                 )}
//               </Col>




//               <Col md={6} className='text-center' style={{ marginTop: '30px' }} >
//                 <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%' }}>
//                   <FontAwesomeIcon
//                     icon={faChartGantt}
//                     style={{
//                       marginRight: '8px',
//                       color: 'black', // Set the color to golden
//                     }}
//                   />
//                   Billing (INR) of Import & Export
//                 </h5>


//                 {dataset && dataset.length > 0 && (


//                   <LineChart
//                     width={500}
//                     height={300}
//                     data={dataset1}
//                     margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
//                   >
//                     <XAxis dataKey="Month" domain={['auto', 'dataMax']} padding={{ left: 50, right: 30 }} />
//                     <YAxis label={{
//                       value: 'Rupees',
//                       angle: -90,
//                       position: 'insideLeft',
//                       // offset: -5,
//                       width: 60, // Adjust the width to create space for the label
//                     }}
//                       tickFormatter={formatYAxisValue}
//                     />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="Bill" stroke="#8884d8" activeDot={{ r: 8 }} />
//                   </LineChart>


//                 )}
//               </Col>


//             </Row>
//           </CardBody>
//         </Card>
//       </div>
//     </>
//   )
// }



import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import axios from "axios";
import { axisClasses } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts';
import Table from 'react-bootstrap/Table';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { Card, CardBody, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faChartGantt } from '@fortawesome/free-solid-svg-icons';

export default function Dashboard222() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {

      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    login,
    logout,
    userType
  } = useContext(AuthContext);

  // Export Values
  const [exportOpeningBalance, setExportOpeningBalance] = useState("0");
  const [exportReceived, setExportReceived] = useState("0");
  const [exportReceivedsub, setExportReceivedSub] = useState("0");
  const [exportTotalReceived, setExportTotalReceieved] = useState("0");
  const [exportDeliveries, setExportDeliveries] = useState("0");
  const [exportDeliveriesSub, setExportDeliveriesSub] = useState("0");
  const [exportTotalDeliveries, setExportTotalDeliveries] = useState("0");
  const [exportRegularSubTotal, setExportRegularSubTotal] = useState("0");
  const [exportStock, setExportStock] = useState("0");
  const [exportSubStock, setExportSubStock] = useState("0");
  // Import Values
  const [importOpeningBalance, setImportOpeningBalance] = useState("0");
  const [importReceived, setImportReceived] = useState("0");
  const [importSubReceived, setImportSubReceived] = useState("0");
  const [importNIPTReceived, setImportNIPTReceived] = useState("0");
  const [importPCReceived, setImportPCReceived] = useState("0");
  const [importDeliveries, setImportDeliveries] = useState("0");
  const [importSubDeliveries, setImportSubDeliveries] = useState("0");
  const [importNIPTDelivery, setImportNIPTDelivery] = useState("0");
  const [importTotalDeliveries, setImportTotalDeliveries] = useState("0");
  const [importStock, setImportStock] = useState("0");
  const [importSubStock, setImportSubStock] = useState('0');
  const [importNIPTStock, setImportNIPTStock] = useState("0");

  const [importValue, setImportValue] = useState("0");

  //Forward out and Forward In
  const [ForwardOut, setForwardOut] = useState("0");
  const [ForwardIN, setForwardIN] = useState("0");
  const [importSubOpeningBalance, setImportSubOpeningBalance] = useState("0");
  const [exportSubOpeningBalance, setExportSubOpeningBalance] = useState("0");
  // Import Detention Values
  const [importdetentionDeposite, setImportDetentionDeposite] = useState("0");
  const [importdetentionDepositeWithdrawn, setImportDetentionDepositeWithdrawn] = useState("0");
  const [importdetentionOpeningBalanceValue, setImportDetentionOpeningBalanceValue] = useState("0");
  const [importdetentionStock, setImportDetentionStock] = useState("0");

  // Export Detention Values
  const [exportDetentionDeposite, setExportDetentionDeposite] = useState("0");
  const [exportDetentionDepositeWithdrawn, setExportDetentionDepositeWithdrawn] = useState("0");
  const [exportDetentionOpeningBalanceValue, setExportDetentionOpeningBalanceValue] = useState("0");
  const [exportDetentionStock, setExportDetentionStock] = useState("0");

  // const [dataset, setDataset] = useState([]);

  const chartSetting = {
    yAxis: [
      {
        label: '',
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(0, 0)',
      },
    },
  };


  const [dataset, setDataset] = useState([]);
  const [dataset1, setDataset1] = useState([]);


  const valueFormatter = (value) => `${value} Packages`;
  const valueFormatter1 = (value) => `${value} ⟨₹⟩`;


  const formatYAxisValue = (value) => {
    // Convert values to millions (M) and round to whole numbers
    return `${Math.round(value / 1000000)}M`;
  };


  const fetchExpoxtData = async () => {

    try {
      const response = await axios.get(`http://${ipaddress}dashboard/getexportdata/${companyid}/${branchId}`)
      if (response) {

        setExportOpeningBalance(response.data.exportData[0][0]);
        setExportReceived(response.data.exportData[0][1]);
        setExportReceivedSub(response.data.exportData[0][3]);
        setExportStock(response.data.exportData[0][2]);
        setExportSubStock(response.data.exportData[0][4]);
        // Calculate the sum
        const sum11 = parseInt(response.data.exportData[0][0]) + parseInt(response.data.exportData[0][1]) + parseInt(response.data.exportData[0][2]);
        // Update the state with the sum
        setExportTotalReceieved(sum11.toString());
        // console.log("//////////////Export Opening Balance///////////////" + sum11.toString());
        setExportDeliveries(response.data.exportData[0][5]);
        setExportDeliveriesSub(response.data.exportData[0][6]);

        // Calculate the sum1
        const sum13 = parseInt(response.data.exportData[0][5]) + parseInt(response.data.exportData[0][6]);
        // Update the state with the sum
        setExportTotalDeliveries(sum13.toString());

        setExportDetentionOpeningBalanceValue(response.data.exportData[0][7]);
        setExportDetentionDeposite(response.data.exportData[0][8]);
        setExportDetentionDepositeWithdrawn(response.data.exportData[0][9]);

        const sum42 = parseInt(response.data.exportData[0][7]) + parseInt(response.data.exportData[0][8]) - parseInt(response.data.exportData[0][9]);

        setExportDetentionStock(sum42);

        setExportSubOpeningBalance(response.data.exportData[0][10]);




        setImportOpeningBalance(response.data.importData[0][0]);
        setImportReceived(response.data.importData[0][1]);
        setImportSubReceived(response.data.importData[0][3]);
        setImportNIPTReceived(response.data.importData[0][2]);
        setImportPCReceived(response.data.importData[0][16]);
        // const sum = parseInt(response.data[0]) + parseInt(response.data[1]) + parseInt(response.data[2]) + parseInt(response.data[3]);
        // setImportTotalReceived(sum.toString());



        setImportStock(response.data.importData[0][4]);

        setImportNIPTStock(response.data.importData[0][5]);

        setImportDeliveries(response.data.importData[0][8]);
        setImportSubDeliveries(response.data.importData[0][10]);
        setImportNIPTDelivery(response.data.importData[0][9]);


        setForwardOut(response.data.importData[0][7]);
        setForwardIN(response.data.importData[0][6]);

        setImportSubStock(response.data.importData[0][11]);


        setImportDetentionOpeningBalanceValue(response.data.importData[0][12]);
        setImportDetentionDeposite(response.data.importData[0][13]);
        setImportDetentionDepositeWithdrawn(response.data.importData[0][14]);


        const sum4 = parseInt(response.data.importData[0][12]) + parseInt(response.data.importData[0][13]) - parseInt(response.data.importData[0][14]);

        setImportDetentionStock(sum4);

        setImportSubOpeningBalance(response.data.importData[0][15]);


        // const sum5 = parseInt(response.data[10]) + parseInt(response.data[11]);
        // setForwardStock(sum5);







      } else {
        throw new Error('Failed to get Data');
      }
    } catch (error) {
      console.log("*************************Export Data******************");
    }
  };


  const fetchBarGraphData = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}dashboard/getbargraphdata/${companyid}/${branchId}`);


      if (response && response.data && Array.isArray(response.data)) {
        const updatedDataset = response.data.map((item) => {
          return {
            export: item[0],
            import: item[1],
            // month: item[2],
            month: formatMonth(item[2]),
          };
        });

        setDataset(updatedDataset);
        // console.log(updatedDataset);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error, you might want to set a default or empty dataset in case of an error
    }



  };

  const fetchGraphData = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}dashboard/getgraphdata/${companyid}/${branchId}`);


      if (response && response.data && Array.isArray(response.data)) {
        const updatedDataset = response.data.map((item) => {
          return {
            Bill: item[0],
            Month: formatMonth(item[1]),
          };
        });

        setDataset1(updatedDataset);
        console.log(updatedDataset);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error, you might want to set a default or empty dataset in case of an error
    }
  };



  const formatMonth = (dateString) => {
    // Implement your custom date formatting logic here
    // For example, converting '2023-10' to '2023-OCT'
    const [year, month] = dateString.split('-');
    const monthAbbreviation = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'short' }).toUpperCase();

    return `${year}-${monthAbbreviation}`;
  };


  const [xAxisData, setXAxisData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);



  useEffect(() => {

    if (userType === 'SEEPZ Custodian' || role === 'ROLE_ADMIN' || userType === 'Accounts User') {
      fetchExpoxtData();
      fetchBarGraphData();
      fetchGraphData();
    }
  }, [0]);




  return (
    <>
      <div className='Container'>
        <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
          icon={faIdBadge}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        />Admin Dashboard</h5>
        <Card style={{ backgroundColor: "#F8F8F8" }}>
          <CardBody>
            <Row>

              <Col md={6}>

                <Table className="table table-bordered custom-table mt-3">
                  <thead>
                    <tr className='text-center'>
                      <th colSpan="4">Export</th>
                    </tr>
                    <tr className='text-center'>
                      <th></th>
                      <th>Total</th>
                      <th>Regular</th>
                      <th>Detention</th>
                    </tr>
                  </thead>
                  <tbody>

                    <tr className='text-center'>
                      <th style={{ backgroundColor: '#87CEEB' }} colSpan={4}><b>Opening Balance</b></th>
                    </tr>

                    <tr className='text-center'>
                      <td style={{ width: '220px' }}>Export</td>
                      <td className='text-center'>{exportOpeningBalance + exportDetentionOpeningBalanceValue} </td>
                      <td className='text-center'>{exportOpeningBalance}</td>
                      <td className='text-center'> {exportDetentionOpeningBalanceValue}</td>
                    </tr>
                    <tr className='text-center'>
                      <td style={{ width: '220px' }}>Export-Sub</td>
                      <td className='text-center'>{exportSubOpeningBalance} </td>
                      <td className='text-center'>{exportSubOpeningBalance}</td>
                      <td className='text-center'></td>
                    </tr>
                    <tr className='text-center'>
                      <td> <b>Sub Total</b></td>
                      <td className='text-center'><b> {exportOpeningBalance + exportDetentionOpeningBalanceValue + exportSubOpeningBalance}</b></td>
                      <td className='text-center'><b> {exportOpeningBalance + exportSubOpeningBalance}</b></td>
                      <td className='text-center'><b>{exportDetentionOpeningBalanceValue}</b></td>
                    </tr>

                    <tr style={{ height: '20px' }}>
                    </tr>
                    <tr className='text-center'>
                      <th style={{ backgroundColor: '#87CEEB' }} colSpan={4}><b>Received</b></th>
                    </tr>
                    <tr className='text-center'>
                      <td>Export</td>
                      <td className='text-center'>{exportReceived}</td>
                      <td className='text-center'>{exportReceived}</td>
                      <td className='text-center'></td>
                    </tr>
                    <tr className='text-center'>
                      <td>Export Subcontract</td>
                      <td className='text-center'>{exportReceivedsub}</td>
                      <td className='text-center'>{exportReceivedsub}</td>
                      <td className='text-center'></td>
                    </tr>
                    <tr className='text-center'>
                      <td> <b>Sub Total</b></td>
                      <td className='text-center'><b> {exportReceived + exportReceivedsub}</b></td>
                      <td className='text-center'><b> {exportReceived + exportReceivedsub}</b></td>
                      <td className='text-center'></td>
                    </tr>
                    <tr style={{ height: '20px' }}>
                    </tr>
                    <tr className='text-center'>
                      <th style={{ backgroundColor: '#87CEEB' }} colSpan={4}><b>Deliveries</b></th>
                    </tr>
                    <tr className='text-center'>
                      <td className='text-center'>Export</td>
                      <td className='text-center'> {exportDeliveries}</td>
                      <td className='text-center'> {exportDeliveries}</td>
                      <td className='text-center'></td>
                    </tr>
                    <tr className='text-center'>
                      <td className='text-center'>Export Subcontract</td>
                      <td className='text-center'>{exportDeliveriesSub}</td>
                      <td className='text-center'>{exportDeliveriesSub}</td>
                      <td className='text-center'></td>
                    </tr>
                    <tr className='text-center'>
                      <td className='text-center'> <b>Sub Total</b></td>
                      <td className='text-center'><b>{exportDeliveries + exportDeliveriesSub}</b></td>
                      <td className='text-center'><b>{exportDeliveries + exportDeliveriesSub}</b></td>
                      <td className='text-center'><b></b></td>
                    </tr>

                    <tr style={{ height: '20px' }}>
                    </tr>
                    <tr className='text-center'>
                      <th style={{ backgroundColor: '#87CEEB' }} colSpan={4}><b>Detention</b></th>
                    </tr>
                    <tr className='text-center'>
                      <td>Detention Deposit</td>
                      <td className='text-center'>{exportDetentionDeposite}</td>
                      <td className='text-center'></td>
                      <td className='text-center'>{exportDetentionDeposite}</td>
                    </tr>
                    <tr className='text-center'>
                      <td>Detention Issue & Withdrawn</td>
                      <td className='text-center'>{exportDetentionDepositeWithdrawn}</td>
                      <td className='text-center'></td>
                      <td className='text-center'>{exportDetentionDepositeWithdrawn}</td>
                    </tr>
                    <tr className='text-center'>
                      <td> <b>Sub Total</b></td>
                      <td className='text-center'><b>{exportDetentionDeposite + exportDetentionDepositeWithdrawn}</b></td>
                      <td className='text-center'><b></b></td>
                      <td className='text-center'><b>{exportDetentionDeposite + exportDetentionDepositeWithdrawn}</b></td>
                    </tr>


                    <tr style={{ height: '20px' }}>
                    </tr>
                    <tr className='text-center'>
                      <th style={{ backgroundColor: '#87CEEB' }} colSpan={4}><b>Stock</b></th>
                    </tr>
                    <tr className='text-center'>
                      <td>Export</td>
                      <td className='text-center'>{exportStock}</td>
                      <td className='text-center'>{exportStock}</td>
                      <td className='text-center'></td>
                    </tr>
                    <tr className='text-center'>
                      <td>Export Subcontract</td>
                      <td className='text-center'>{exportSubStock} </td>
                      <td className='text-center'> {exportSubStock}</td>
                      <td className='text-center'> </td>
                    </tr>
                    <tr className='text-center'>
                      <td>Detention (Export)</td>
                      <td className='text-center'>{exportDetentionStock} </td>
                      <td className='text-center'> </td>
                      <td className='text-center'> {exportDetentionStock}</td>
                    </tr>
                    <tr className='text-center'>
                      <td> <b>Stock at Vault(Total)</b></td>
                      <td className='text-center'><b>{exportStock + exportSubStock + exportDetentionStock}</b></td>
                      <td className='text-center'><b> {exportStock + exportSubStock}</b></td>
                      <td className='text-center'><b>{exportDetentionStock}</b></td>
                    </tr>
                  </tbody>
                </Table>


              </Col>

              <Col md={6}>

                <Table className="table table-bordered custom-table mt-3">
                  <thead>
                    <tr className='text-center'>
                      <th colSpan="4">Import</th>
                    </tr>
                    <tr className='text-center'>
                      <th></th>
                      <th>Total</th>
                      <th>Regular</th>
                      <th>Detention</th>
                    </tr>
                  </thead>
                  <tbody>

                    {/* <tr style={{ height: '20px' }}>
                    </tr>  */}
                    <tr className='text-center'>
                      <th style={{ backgroundColor: '#87CEEB' }} colSpan={4}><b>Opening balance</b></th>
                    </tr>
                    <tr className='text-center'>
                      <td style={{ width: '240px' }}>Import</td>
                      <td className='text-center'>{importOpeningBalance + importdetentionOpeningBalanceValue}</td>
                      <td className='text-center'>{importOpeningBalance}</td>
                      <td className='text-center'>{importdetentionOpeningBalanceValue}</td>
                    </tr>
                    <tr className='text-center'>
                      <td style={{ width: '240px' }}>Import Subcontract</td>
                      <td className='text-center'>{importSubOpeningBalance}</td>
                      <td className='text-center'>{importSubOpeningBalance}</td>
                      <td className='text-center'></td>
                    </tr>
                    <tr className='text-center'>
                      <td> <b>Sub Total</b></td>
                      <td className='text-center'><b>{importOpeningBalance + importdetentionOpeningBalanceValue + importSubOpeningBalance}</b></td>
                      <td className='text-center'><b>{importOpeningBalance + importSubOpeningBalance}</b></td>
                      <td className='text-center'><b>{importdetentionOpeningBalanceValue}</b></td>
                    </tr>
                    <tr style={{ height: '20px' }}>
                    </tr>
                    <tr className='text-center'>
                      <th style={{ backgroundColor: '#87CEEB' }} colSpan={4}><b>Received</b></th>
                    </tr>

                    <tr className='text-center'>
                      <td>Import From Cargo</td>
                      <td className='text-center'>{importReceived}</td>
                      <td className='text-center'>{importReceived} </td>
                      <td className='text-center'></td>
                    </tr>
                    <tr className='text-center'>
                      <td>Import NIPT</td>
                      <td className='text-center'>{importNIPTReceived}</td>
                      <td className='text-center'>{importNIPTReceived}</td>
                      <td className='text-center'></td>
                    </tr>

                    {importPCReceived > 0 && (
                      <tr className='text-center'>
                        <td>Import PC</td>
                        <td className='text-center'>{importPCReceived}</td>
                        <td className='text-center'>{importPCReceived}</td>
                        <td className='text-center'></td>
                      </tr>
                    )}
                    <tr className='text-center'>
                      <td>Import Subcontract</td>
                      <td className='text-center'>{importSubReceived}</td>
                      <td className='text-center'>{importSubReceived}</td>
                      <td className='text-center'></td>
                    </tr>

                    <tr className='text-center'>
                      <td> <b>Sub Total</b></td>
                      <td className='text-center'><b>{importReceived + importNIPTReceived + importPCReceived + importSubReceived}</b></td>
                      <td className='text-center'><b>{importReceived + importSubReceived + importPCReceived + importNIPTReceived}</b></td>
                      <td className='text-center'></td>
                    </tr>
                    <tr style={{ height: '20px' }}>
                    </tr>
                    <tr style={{ height: '20px' }}>
                    </tr>
                    <tr className='text-center'>
                      <th style={{ backgroundColor: '#87CEEB' }} colSpan={4}><b>Deliveries</b></th>
                    </tr>
                    <tr className='text-center'>
                      <td className='text-center'>Import</td>
                      <td className='text-center'>{importDeliveries}</td>
                      <td className='text-center'>{importDeliveries}</td>
                      <td className='text-center'></td>
                    </tr>
                    <tr className='text-center'>
                      <td className='text-center'>Import NIPT</td>
                      <td className='text-center'>{importNIPTDelivery}</td>
                      <td className='text-center'>{importNIPTDelivery}</td>
                      <td className='text-center'></td>
                    </tr>
                    <tr className='text-center'>
                      <td className='text-center'>Import Subcontract</td>
                      <td className='text-center'>{importSubDeliveries}</td>
                      <td className='text-center'>{importSubDeliveries}</td>
                      <td className='text-center'></td>
                    </tr>
                    <tr className='text-center'>
                      <td className='text-center'> <b>Sub Total</b></td>
                      <td className='text-center'><b>{importDeliveries + importNIPTDelivery + importSubDeliveries}</b></td>
                      <td className='text-center'><b>{importDeliveries + importNIPTDelivery + importSubDeliveries}</b></td>
                      <td className='text-center'><b></b></td>
                    </tr>

                    <tr style={{ height: '20px' }}>
                    </tr>
                    <tr className='text-center'>
                      <th style={{ backgroundColor: '#87CEEB' }} colSpan={4}><b>Detention</b></th>
                    </tr>
                    <tr className='text-center'>
                      <td>Detention Deposit</td>
                      <td className='text-center'>{importdetentionDeposite}</td>
                      <td className='text-center'></td>
                      <td className='text-center'>{importdetentionDeposite}</td>
                    </tr>
                    <tr className='text-center'>
                      <td>Detention Issue & Withdrawn</td>
                      <td className='text-center'>{importdetentionDepositeWithdrawn}</td>
                      <td className='text-center'></td>
                      <td className='text-center'>{importdetentionDepositeWithdrawn}</td>
                    </tr>
                    <tr className='text-center'>
                      <td> <b>Sub Total</b></td>
                      <td className='text-center'><b>{importdetentionDeposite + importdetentionDepositeWithdrawn}</b></td>
                      <td className='text-center'><b></b></td>
                      <td className='text-center'><b>{importdetentionDeposite + importdetentionDepositeWithdrawn}</b></td>
                    </tr>

                    <tr style={{ height: '20px' }}>
                    </tr>

                    <tr className='text-center'>
                      <th style={{ backgroundColor: '#87CEEB' }} colSpan={4}><b>Forwarded Packages</b></th>
                    </tr>
                    <tr className='text-center'>
                      <td>Forwarded Out</td>
                      <td className='text-center'>{ForwardOut}</td>
                      <td className='text-center'>{ForwardOut}</td>
                      <td className='text-center'></td>
                    </tr>
                    <tr className='text-center'>
                      <td>Forwarded In</td>
                      <td className='text-center'>{ForwardIN}</td>
                      <td className='text-center'>{ForwardIN}</td>
                      <td className='text-center'></td>
                    </tr>
                    <tr className='text-center'>
                      <td><b>Sub Total</b></td>
                      <td className='text-center'><b>{ForwardIN + ForwardOut}</b></td>
                      <td className='text-center'><b>{ForwardIN + ForwardOut}</b></td>
                      <td className='text-center'><b></b></td>
                    </tr>
                    <tr style={{ height: '20px' }}>
                    </tr>
                    <tr className='text-center'>
                      <th style={{ backgroundColor: '#87CEEB' }} colSpan={4}><b>Stock</b></th>
                    </tr>
                    <tr className='text-center'>
                      <td>Import</td>
                      <td className='text-center'>{importStock}</td>
                      <td className='text-center'> {importStock}</td>
                      <td className='text-center'> </td>
                    </tr>
                    <tr className='text-center'>
                      <td>Import NIPT</td>
                      <td className='text-center'>{importNIPTStock}</td>
                      <td className='text-center'>{importNIPTStock}</td>
                      <td className='text-center'></td>
                    </tr>
                    <tr className='text-center'>
                      <td>Import (Subcontract)</td>
                      <td className='text-center'>{importSubStock}</td>
                      <td className='text-center'>{importSubStock}</td>
                      <td className='text-center'></td>
                    </tr>
                    <tr className='text-center'>
                      <td>Detention (Import)</td>
                      <td className='text-center'>{importdetentionStock}</td>
                      <td className='text-center'> </td>
                      <td className='text-center'>{importdetentionStock}</td>
                    </tr>
                    <tr className='text-center'>
                      <td> <b>Stock at Vault(Total)</b></td>
                      <td className='text-center'><b>{importStock + importNIPTStock + importSubStock + importdetentionStock}</b></td>
                      <td className='text-center'><b> {importStock + importNIPTStock + importSubStock}</b></td>
                      <td className='text-center'><b>{importdetentionStock}</b></td>
                    </tr>

                  </tbody>
                </Table>


              </Col>
            </Row>
            {/* 
          </CardBody>
        </Card>

        <Card style={{ marginTop: 25 }} >
          <CardBody> */}


            {(userType === 'SEEPZ Custodian' || userType === 'ROLE_ADMIN' || userType === 'Accounts User') && (


              <Row style={{ marginTop: '20px', backgroundColor: 'white' }}>

                <Col md={6} className='text-center' style={{ marginTop: '30px' }} >
                  <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%' }} > <FontAwesomeIcon
                    icon={faChartGantt}
                    style={{
                      marginRight: '8px',
                      color: 'black', // Set the color to golden
                    }}
                  />Export & Import (Monthwise) </h5>


                  {dataset && dataset.length > 0 && (
                    <BarChart
                      style={{ marginLeft: '10px' }}
                      dataset={dataset}
                      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                      series={[
                        { dataKey: 'export', label: 'Export', valueFormatter },
                        { dataKey: 'import', label: 'Import', valueFormatter },
                      ]}
                      {...chartSetting}
                    />
                  )}
                </Col>




                <Col md={6} className='text-center' style={{ marginTop: '30px' }} >
                  <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%' }}>
                    <FontAwesomeIcon
                      icon={faChartGantt}
                      style={{
                        marginRight: '8px',
                        color: 'black', // Set the color to golden
                      }}
                    />
                    Billing (INR) of Import & Export
                  </h5>


                  {dataset && dataset.length > 0 && (


                    <LineChart
                      width={500}
                      height={300}
                      data={dataset1}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <XAxis dataKey="Month" domain={['auto', 'dataMax']} padding={{ left: 50, right: 30 }} />
                      <YAxis label={{
                        value: 'Rupees',
                        angle: -90,
                        position: 'insideLeft',
                        // offset: -5,
                        width: 60, // Adjust the width to create space for the label
                      }}
                        tickFormatter={formatYAxisValue}
                      />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Bill" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>


                  )}
                </Col>


              </Row>

            )}
          </CardBody>
        </Card>
      </div>
    </>
  )
}

