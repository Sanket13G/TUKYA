// import { redirect } from "react-router-dom";
// import AuthContext from "../Components/AuthProvider";
// import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState, useContext } from "react";
// import "../Components/Style.css";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import {
//   Button,
//   ButtonToggle,
//   CardBody,
//   Container,
//   Table,
//   ToastHeader,
// } from "reactstrap";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
// import DatePicker from "react-datepicker";
// import ipaddress from "../Components/IpAddress";
// import { saveAs } from "file-saver";
// import axios from "axios";
// import dgdcImage from "../Images/report.jpeg";
// import { faFilePdf, faPrint } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   pdf,
//   StyleSheet,
//   PDFViewer,
//   Image,
//   BlobProvider,
// } from "@react-pdf/renderer";
// import { toast } from "react-toastify";

// export default function Subcontract_report() {
//   const navigate = useNavigate();
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [selectedParty, setSelectedParty] = useState("");
//   const [showSubContractDataTable, setSubContractDataTable] = useState(false);
//   const [SubImportContractData, setSubImportContractData] = useState([]);
//   const [subContractData, setSubContractData] = useState([]);
//   const [subExportSubAllData, setExportSubAllData] = useState([]);
//   const [subImportSubAllData, setImportSubAllData] = useState([]);
//   const [showExportSubAllDataTable, setExportSubAllDataTable] = useState(false);
//   const [partyNameToIdMap, setPartyNameToIdMap] = useState({});
//   const [requestId, setRequestId] = useState("");
//   const [subRequestIdData, setsubRequestIdData] = useState([]);
//   const [showAlert, setShowAlert] = useState(false);
//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     role,
//     companyname,
//     branchname,
//     isAuthenticated,
//     login,
//     logout,
//   } = useContext(AuthContext);
//   const styles = StyleSheet.create({
//     page: {
//       flexDirection: "column",
//       padding: 20,
//     },
//     header: {
//       flexDirection: "row",
//       alignItems: "center",
//       marginBottom:5,
//     },
//     image: {
//       width: 306,
//       height: 100,
//       marginLeft: 117,
//       justifyContent: "center",
//     },
//     headerText: {
//       flex: 1,
//       textAlign: "center",
//       fontSize: 12,
//       fontWeight: "bold",
//     },
//     centeredText: {
//       fontSize: 13,
//       textAlign: "center", // Center text horizontally
//       paddingBottom: 4,
//     },
//     reportHeader: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       paddingBottom: 4,
//       fontSize: 10,
//     },
//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//       marginBottom: 10,
//     },
//     tableRow: {
//       flexDirection: "row",
//       borderBottomWidth: 0.4,
//       borderBottomColor: "black",
//       fontSize: 10,
//       borderRightWidth: 0.4,
//       borderLeftWidth: 0.4,
//       borderLeftColor: "black",
//       borderRightColor: "black",
//       flexWrap: "wrap",
//     },
//     tableCell: {
//       flex: 1,
//       borderWidth: 0.4,
//       borderStyle: "solid",
//       borderColor: "#000",
//       padding: 1,
//       fontWeight: "bold",
//       textAlign: "center",
//       fontSize: 7,
//     },
//     tableCellHeader: {
//       fontWeight: "bold",
//       textAlign: "center",
//       fontSize: 9,
//     },
//   });
//   // const styles = StyleSheet.create({
//   //   page: {
//   //     paddingTop: 27,
//   //     paddingBottom: 60,
//   //     paddingHorizontal: 30,
//   //   },
//   //   header: {
//   //     marginBottom: 20,
//   //   },
//   //   heading: {
//   //     fontSize: 10,
//   //     marginBottom: 0,
//   //     fontWeight: "bold",
//   //     alignItems: "center",
//   //   },
//   //   table: {
//   //     width: "100%",
//   //     borderCollapse: "collapse",
//   //     marginBottom: 10,
//   //   },
//   //   centeredText: {
//   //     fontSize: 14,
//   //     textAlign: "center", // Center text horizontally
//   //   },
//   //   leftColumn: {
//   //     width: "100%",
//   //     paddingTop: 18,
//   //   },
//   //   headingwithbox: {
//   //     fontSize: 10,
//   //     marginBottom: 0,
//   //     fontWeight: "bold",
//   //     alignItems: "center",

//   //     // Add padding for space between text and border
//   //   },
//   //   headerText: {
//   //     fontSize: 10,
//   //     fontWeight: "bold",
//   //   },
//   //   viewheadingwithbox: {
//   //     border: "1px solid black",
//   //     padding: 5,
//   //   },
//   //   paragraph: {
//   //     fontSize: 12,
//   //     marginBottom: 5,
//   //   },
//   // reportHeader: {
//   //   flexDirection: "row",
//   //   justifyContent: "space-between",
//   //   paddingBottom: 18,
//   //   fontSize: 12,
//   // },
//   //   headingwithborder: {
//   //     fontSize: 10,
//   //     marginBottom: 0,
//   //     fontWeight: "bold",
//   //     alignItems: "center",
//   //     borderBottom: "1px solid black",
//   //     // Add padding for space between text and border
//   //   },
//   //   image: {
//   //     width: 400,
//   //     height: 126,
//   //     marginBottom: 0,
//   //     marginLeft: 70,
//   //     justifyContent: "center",
//   //   },
//   //   dateSize: {
//   //     fontSize: 8,
//   //   },
//   //   normaltext: {
//   //     fontSize: 10,
//   //     marginTop: 25,
//   //     fontWeight: "bold",
//   //   },
//   //   line: {
//   //     width: "100%", // Adjust the width of the line
//   //     marginTop: 10, // Adjust the space above the line
//   //     marginBottom: 10, // Adjust the space below the line
//   //     borderTop: "1pt solid black", // Style the line
//   //   },
//   //   rightText: {
//   //     fontSize: 9,
//   //     textAlign: "left", // Center text horizontally
//   //     paddingTop: 18,
//   //   },
//   //   tableRow: {
//   //     flexDirection: "row",
//   //     borderBottomWidth: 0.4,
//   //     borderBottomColor: "black",
//   //     fontSize: 10,
//   //     borderRightWidth: 0.4,
//   //     borderLeftWidth: 0.4,
//   //     borderLeftColor: "black",
//   //     borderRightColor: "black",
//   //     flexWrap: "wrap",
//   //   },
//   //   tableCell: {
//   //     border: "0.4px solid black",
//   //     padding: 5,
//   //     flexWrap: "wrap",
//   //     width: 73,
//   //   },
//   //   tableCellHeader: {
//   //     fontWeight: "bold",
//   //     flexWrap: "wrap",
//   //     width: 73,
//   //     border: "0.4px solid black",
//   //   },
//   // });

//   const CustomHeader = () => {
//     return (
//       <View style={styles.header}>
//         <Image src={dgdcImage} style={styles.image} />
//       </View>
//     );
//   };
//   const formatedDate = (inputDate) => {
//     const date = new Date(inputDate);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${day}/${month}/${year}`;
//   };
//   const formatDate = (inputDate, setTimeTo) => {
//     const date = new Date(inputDate);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     const hours = setTimeTo === "start" ? "00" : "23";
//     const minutes = setTimeTo === "start" ? "00" : "59";
//     return `${year}-${month}-${day} ${hours}:${minutes}`;
//   };

//   const formattedStartDate = formatDate(startDate, "start");
//   const formattedEndDate = formatDate(endDate, "end");

//   const StarDate = formatedDate(formattedStartDate);
//   const EndDate = formatedDate(formattedEndDate);

//   console.log("stastdate ", startDate);

//   console.log("enddate ", endDate);
//   // If the user is not authenticated, redirect to the login page
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate(
//         "/login?message=You need to be authenticated to access this page."
//       );
//     }
//   }, [isAuthenticated, navigate]);
//   console.log(startDate);

//   const [partys, setPartys] = useState([]);
//   const [getpartyId, setGetpartyId] = useState({});
//   const fetchPartyNames = async () => {
//     try {
//       const response = await fetch(
//         `http://${ipaddress}parties/getAll/${companyid}/${branchId}`
//       );
//       const data = await response.json();
//       const namesMap = {};
//       data.forEach((party) => {
//         namesMap[party.partyId] = party.partyName;
//       });
//       setGetpartyId(namesMap);
//       setPartys(data);
//       setPartyNameToIdMap(namesMap);
//     } catch (error) {
//       console.error("Error fetching party names:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPartyNames();
//   }, []);

//   const handlePartyChange = (event) => {
//     const selectedPartyName = event.target.value;
//     setSelectedParty(selectedPartyName);
//   };

//   const fetchImportSubAllData = () => {
//     // Make an API request here to fetch the list of airline names based on the provided criteria
//     fetch(
//       `http://${ipaddress}importsub/findImportSubAllData?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         // Ensure that 'data' is an array before updating the 'airlines' state
//         if (Array.isArray(data) && data.length > 0) {
//           // Update the 'airlines' state with the fetched data
//           setImportSubAllData(data);
//           setExportSubAllDataTable("true");
//           // setSubContractDataTable(false)
//           // setSubContractData([]);
//           setShowAlert(false);
//         } else {
//           console.error("API response is not an array:", data);
//           // setShowAlert(true);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching airline names:", error);
//         // setShowAlert(true);
//       });
//   };
//   const fetchExportSubAllData = () => {
//     // Make an API request here to fetch the list of airline names based on the provided criteria
//     fetch(
//       `http://${ipaddress}exportsub/findExportSubAllData?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         // Ensure that 'data' is an array before updating the 'airlines' state
//         if (Array.isArray(data) && data.length > 0) {
//           // Update the 'airlines' state with the fetched data
//           setExportSubAllData(data);
//           setExportSubAllDataTable("true");
//           setSubContractDataTable("false");
//           setSubContractData([]);
//           setSubImportContractData([]);
//           toast.success("Data Found !", {
//             position: "top-center",
//             autoClose: 540, // Duration in milliseconds
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         } else {
//           console.error("API response is not an array:", data);
//           toast.error("Data Not Found !", {
//             position: "top-center",
//             autoClose: 540, // Duration in milliseconds
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching airline names:", error);
//         // setShowAlert(true);
//       });
//   };


//   const fetchSubContractData = () => {
//     // Make an API request here to fetch the list of airline names based on the provided criteria
//     fetch(
//       `http://${ipaddress}exportsub/findSubContractData?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&exporter=${selectedParty}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         // Ensure that 'data' is an array before updating the 'airlines' state
//         if (Array.isArray(data) && data.length > 0) {
//           // Update the 'airlines' state with the fetched data
//           setSubContractData(data);
//           setSubContractDataTable("true");
//           setExportSubAllDataTable("false");
//           setExportSubAllData([]);
//           setImportSubAllData([]);
//           toast.success("Data Found !", {
//             position: "top-center",
//             autoClose: 540, // Duration in milliseconds
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         } else {
//           console.error("API response is not an array:", data);
//           toast.error("Data Not Found !", {
//             position: "top-center",
//             autoClose: 540, // Duration in milliseconds
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//           setSubContractDataTable("false");
//           setExportSubAllDataTable("false");
//           setExportSubAllData([]);
//           setImportSubAllData([]);
//           setSubContractData([]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching airline names:", error);
//         // setShowAlert(true);
//       });
//   };
  
//   const fetchSubImportContractData = () => {
//     // Make an API request here to fetch the list of airline names based on the provided criteria
//     fetch(
//       `http://${ipaddress}importsub/findImportSubContractData?companyId=${companyid}&branchId=${branchId}&exporter=${selectedParty}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           // Update the 'airlines' state with the fetched data
//           setSubImportContractData(data);
//           console.log("jgjdsgfdsgfjsdghfjdgshf", data);
//           setSubContractDataTable("true");
//         } else {
//           console.error("API response is not an array:", data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching airline names:", error);
//         toast.error("No records found", {
//           autoClose: 700,
//           position: "top-center",
//         });
//       });
//   };


//   const handleSearch = () => {
//     if (startDate && endDate && !selectedParty) {
//       fetchExportSubAllData();
//       fetchImportSubAllData();
//     } else if (startDate && endDate && selectedParty) {
//       fetchSubContractData();
//       fetchSubImportContractData();
//     }
//   };

//   const groupedDataImpSubAll = subImportSubAllData.reduce((groups, item) => {
//     const requestId = item.requestId;
//     if (!groups[requestId]) {
//       groups[requestId] = [];
//     }
//     groups[requestId].push(item);
//     return groups;
//   }, {});

//   const groupedDataExSubAll = subExportSubAllData.reduce((groups, item) => {
//     const requestId = item.requestId;
//     if (!groups[requestId]) {
//       groups[requestId] = [];
//     }
//     groups[requestId].push(item);
//     return groups;
//   }, {});
//   // Define a function to calculate the net weight for a specific requestId
//   const calculateNetWeightForSubAllRequestId = (requestId) => {
//     let totalNetWeight = 0;
//     if (groupedDataImpSubAll[requestId]) {
//       groupedDataImpSubAll[requestId].forEach((item) => {
//         totalNetWeight += item.netWeight;
//       });
//     }
//     return totalNetWeight;
//   };

//   // Inside your component function, call this function for each requestId
//   const calculateForSubAllNetWeights = () => {
//     const netWeights = {};
//     Object.keys(groupedDataImpSubAll).forEach((requestId) => {
//       const totalNetWeight = calculateNetWeightForSubAllRequestId(requestId);
//       netWeights[requestId] = totalNetWeight;
//     });
//     return netWeights;
//   };
//   const netWeightsSubAll = calculateForSubAllNetWeights();

//   // // Define a function to get the exporter for a specific requestId
//   // const getExporterForRequestId = (requestId) => {
//   //   // Check if the requestId exists in both grouped datasets
//   //   if (groupedDataImpSubAll[requestId] && groupedDataExSubAll[requestId]) {
//   //     // Extract the exporter name (partyName) from either dataset, as they are the same
//   //     const exporter = groupedDataImpSubAll[requestId][0].partyName; // Assuming partyName is a property in the data
//   //     return exporter;
//   //   }
//   //   // Return null or an appropriate value if the requestId is not found in both datasets
//   //   return null;
//   // };

//   // // Inside your component function, call this function for each requestId
//   // const getExportersForSubAll = () => {
//   //   const exporters = {};
//   //   Object.keys(groupedDataImpSubAll).forEach((requestId) => {
//   //     const exporter = getExporterForRequestId(requestId);
//   //     if (exporter !== null) {
//   //       exporters[requestId] = exporter;
//   //     }
//   //   });
//   //   return exporters;
//   // };

//   // // Call getExportersForSubAll() to get the exporter for each requestId present in both datasets
//   // const exportersSubAll = getExportersForSubAll();

//   const groupedDataImp = SubImportContractData.reduce((groups, item) => {
//     const requestId = item.requestId;
//     if (!groups[requestId]) {
//       groups[requestId] = [];
//     }
//     groups[requestId].push(item);
//     return groups;
//   }, {});

//   const groupedData = subContractData.reduce((groups, item) => {
//     const requestId = item.requestId;
//     if (!groups[requestId]) {
//       groups[requestId] = [];
//     }
//     groups[requestId].push(item);
//     return groups;
//   }, {});
//   // Define a function to calculate the net weight for a specific requestId
//   const calculateNetWeightForRequestId = (requestId) => {
//     let totalNetWeight = 0;
//     if (groupedDataImp[requestId]) {
//       groupedDataImp[requestId].forEach((item) => {
//         totalNetWeight += item.netWeight;
//       });
//     }
//     return totalNetWeight;
//   };

//   // Inside your component function, call this function for each requestId
//   const calculateNetWeights = () => {
//     const netWeights = {};
//     Object.keys(groupedDataImp).forEach((requestId) => {
//       const totalNetWeight = calculateNetWeightForRequestId(requestId);
//       netWeights[requestId] = totalNetWeight;
//     });
//     return netWeights;
//   };

//   // Call calculateNetWeights() to get the net weights for each requestId
//   const netWeights = calculateNetWeights();

//   const mergedData = [...subExportSubAllData, ...subImportSubAllData];

//   const handlePrintSubALlData = () => {
//     const isoDate = new Date().toISOString();
//     const date = new Date(isoDate);
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based, so we add 1.
//     const year = date.getFullYear().toString();

//     const printWindow = window.open("", "_blank");
//     printWindow.document.open();

//     const recordsPerPage = 100;
//     const totalRecords = Object.keys(mergedData).length;

//     for (
//       let pageIndex = 0;
//       pageIndex < Math.ceil(totalRecords / recordsPerPage);
//       pageIndex++
//     ) {
//       const currentPageNumber = pageIndex + 1;
//       printWindow.document.write(`
//       <!DOCTYPE html>
//           <html>
//           <head>    
//           <title> Sub_Contract Report</title>
      
//               <style>
//               @page {
//                 margin: 1cm;
//                  /* Adjust this value to position the header correctly */
//             }
      
//             .printable-area {
//                 font-family: Arial, sans-serif;
//                 page-break-before: always;
//             }
      
//             table {
//                 width: 100%;
//                 border-collapse: collapse;
//             }
      
//             th, td {
//                 border: 1px solid #dddddd;
//                 text-align: left;
//                 padding: 8px;
//             }
      
//             th {
//                 background-color: #f2f2f2;
//             }
//             .container {
//               display: flex;
//               justify-content: space-between;
//           }
//           .left-column {
//               width: 70%; /* Adjust the width as needed */
//           }
//           .page-break {
//             page-break-before: always; /* This will force a page break before the element */
//           }
//           .right-column {
//               width: 30%; /* Adjust the width as needed */
//               text-align: right; /* Align text to the right */
//           }
//             .header img {
//                 max-width: auto; /* Ensure the image doesn't exceed the page width */
//                 max-height: auto; /* Adjust the maximum image height as needed */
              
//             }
//             .report-header {
//               display: flex;
//               justify-content: space-between;
//               margin-bottom: 5px;
//             }
      
//             #page-header {
//                 position: static;
//                 top: 0;
//                 left: 0;
//                 right: 0;
//                 text-align: center;
//             }
              
//         </style>
//           </head>
//           <body>
//           <div id="page-header">
//           <img src="${dgdcImage}" alt="Header Image" style="max-width: 500px; display: block; margin: 0 auto;"> 
//               <div style="text-align: center;">
//               <h3>Subcontract Report</h3>
//               </div>
//           </div>
//           <div class="report-header">
//           <div>Start Date: ${StarDate}</div>
//           <div>End Date: ${EndDate}</div>
//           <div>Party Name: </div>
//         </div>
//         <table>
//         <thead>
//           <tr>
//             <th style="background-color: #BADDDA; font-size: 12px;"></th>
//             <th style="background-color: #BADDDA; font-size: 12px;">Ser No</th>
//             <th style="background-color: #BADDDA; font-size: 12px;">Ser Date</th>
//             <th style="background-color: #BADDDA; font-size: 12px;">No of Pkgs</th>
//             <th style="background-color: #BADDDA; font-size: 12px;">Passed Out Weight</th>
//             <th style="background-color: #BADDDA; font-size: 12px;">Sir No</th>
//             <th style="background-color: #BADDDA; font-size: 12px;">Sir Date</th>
//             <th style="background-color: #BADDDA; font-size: 12px;">No of Pkgs</th>
//             <th style="background-color: #BADDDA; font-size: 12px;">Passed In Weight</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${Object.keys(groupedDataExSubAll)
//             .slice(pageIndex * recordsPerPage, (pageIndex + 1) * recordsPerPage)
//             .map(
//               (requestId) => `
//               <!-- Table rows for requestId ${requestId} here -->
//               <tr>
//                 <td style="font-weight: bold;font-size: 12px;">Request ID</td>
//                 <td style= "font-size: 10px;">${requestId}</td>
//                 <td style= "font-size: 12px;">Challan No</td>
//                 <td style= "font-size: 10px;">${
//                   groupedDataExSubAll[requestId][0].challanNo
//                 }</td>
//                 <td style= "font-size: 12px;">Challan Date</td>
//                 <td style= "font-size: 10px;">${formatedDate(
//                   groupedDataExSubAll[requestId][0].challanDate
//                 )}</td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//               </tr>
//               <tr>
//                 <td style="font-weight: bold;font-size: 12px;">Party Name</td>
//                 <td style= "font-size: 10px;">${
//                   getpartyId[groupedDataExSubAll[requestId][0].exporter]
//                 }</td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//               </tr>
//               ${groupedDataExSubAll[requestId]
//                 .map(
//                   (item, itemIndex) => `
//                 <!-- Table rows for items within requestId ${requestId} here -->
//                 <tr>
//                   <td></td>
//                   <td style= "font-size: 10px;">${item.serNo}</td>
//                   <td style= "font-size: 10px;">${formatedDate(
//                     item.serDate
//                   )}</td>
//                   <td style= "font-size: 10px;">${item.nopieces}</td>
//                   <td style= "font-size: 10px;">${item.passoutWeight} (${
//                     item.passoutWeightUnit
//                   })</td>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                 </tr>
//                 ${groupedDataImpSubAll[requestId]
//                   ?.map(
//                     (itemm, itemIndex) => `
//                   <!-- Table rows for imported items within requestId ${requestId} here -->
//                   <tr>
//                     <td colspan="5"></td>
//                     <td style= "font-size: 10px;">${itemm.sirNo}</td>
//                     <td style= "font-size: 10px;">${formatedDate(
//                       itemm.sirDate
//                     )}</td>
//                     <td style= "font-size: 10px;">${itemm.nop}</td>
//                     <td style= "font-size: 10px;">${itemm.netWeight} (${
//                       itemm.netWeightUnit
//                     })</td>
                   
//                   </tr>
//                 `
//                   )
//                   .join("")}
//                 <tr>
//                   <td colspan="7"></td>
//                   <td style= "font-size: 12px;font-weight: bold;">Pending</td>
//                   <td style= "font-size: 10px;">${
//                     netWeightsSubAll[requestId] !== undefined
//                       ? item.passoutWeight - netWeightsSubAll[requestId]
//                       : item.passoutWeight
//                   }
//                   (${item.passoutWeightUnit})</td>
//                 </tr>
//                 <tr>
//                   <td colspan="9">
//                     <hr style="border-top: 2px solid #000; margin: 0; padding: 0;" />
//                   </td>
//                 </tr>
//               `
//                 )
//                 .join("")}
//             `
//             )
//             .join("")}
//         </tbody>
//       </table>
  
//           </div>
          
//           <!-- Your footer content here -->
//         </body>
//         </html>
//       `);

//       if (pageIndex < Math.ceil(totalRecords / recordsPerPage) - 1) {
//         printWindow.document.write('<div class="page-break"></div>');

//         currentPageNumber++;
//       }
//     }

//     printWindow.document.close();
//     printWindow.print();
//     printWindow.onafterprint = () => printWindow.close();
//   };

//   const handlePrint = () => {
//     const isoDate = new Date().toISOString();
//     const date = new Date(isoDate);
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based, so we add 1.
//     const year = date.getFullYear().toString();

//     const printWindow = window.open("", "_blank");
//     printWindow.document.open();

//     const recordsPerPage = 100;
//     const totalRecords = Object.keys(groupedData).length;

//     for (
//       let pageIndex = 0;
//       pageIndex < Math.ceil(totalRecords / recordsPerPage);
//       pageIndex++
//     ) {
//       const currentPageNumber = pageIndex + 1;
//       printWindow.document.write(`
//       <!DOCTYPE html>
//           <html>
//           <head>    
//           <title> Sub_Contract Report</title>
      
//               <style>
//               @page {
//                 margin: 1cm;
//                  /* Adjust this value to position the header correctly */
//             }
      
//             .printable-area {
//                 font-family: Arial, sans-serif;
//                 page-break-before: always;
//             }
      
//             table {
//                 width: 100%;
//                 border-collapse: collapse;
//             }
      
//             th, td {
//                 border: 1px solid #dddddd;
//                 text-align: left;
//                 padding: 8px;
//             }
      
//             th {
//                 background-color: #f2f2f2;
//             }
//             .container {
//               display: flex;
//               justify-content: space-between;
//           }
//           .left-column {
//               width: 70%; /* Adjust the width as needed */
//           }
//           .page-break {
//             page-break-before: always; /* This will force a page break before the element */
//           }
//           .right-column {
//               width: 30%; /* Adjust the width as needed */
//               text-align: right; /* Align text to the right */
//           }
//             .header img {
//                 max-width: auto; /* Ensure the image doesn't exceed the page width */
//                 max-height: auto; /* Adjust the maximum image height as needed */
              
//             }
//             .report-header {
//               display: flex;
//               justify-content: space-between;
//               margin-bottom: 5px;
//             }
      
//             #page-header {
//                 position: static;
//                 top: 0;
//                 left: 0;
//                 right: 0;
//                 text-align: center;
//             }
              
//         </style>
//           </head>
//           <body>
//           <div id="page-header">
//           <img src="${dgdcImage}" alt="Header Image" style="max-width: 500px; display: block; margin: 0 auto;"> 
//               <div style="text-align: center;">
//               <h3>Subcontract Report</h3>
//               </div>
//           </div>
//           <div class="report-header">
//           <div>Start Date: ${StarDate}</div>
//           <div>End Date: ${EndDate}</div>
//           <div>Party Name: ${getpartyId[selectedParty]}</div>
//         </div>
//         <table>
//         <thead>
//           <tr>
//             <th style="background-color: #BADDDA; font-size: 12px;"></th>
//             <th style="background-color: #BADDDA; font-size: 12px;">Ser No</th>
//             <th style="background-color: #BADDDA; font-size: 12px;">Ser Date</th>
//             <th style="background-color: #BADDDA; font-size: 12px;">No of Pkgs</th>
//             <th style="background-color: #BADDDA; font-size: 12px;">Passed Out Weight</th>
//             <th style="background-color: #BADDDA; font-size: 12px;">Sir No</th>
//             <th style="background-color: #BADDDA; font-size: 12px;">Sir Date</th>
//             <th style="background-color: #BADDDA; font-size: 12px;">No of Pkgs</th>
//             <th style="background-color: #BADDDA; font-size: 12px;">Passed In Weight</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${Object.keys(groupedData)
//             .slice(pageIndex * recordsPerPage, (pageIndex + 1) * recordsPerPage)
//             .map(
//               (requestId) => `
//               <!-- Table rows for requestId ${requestId} here -->
//               <tr>
//                 <td style="font-weight: bold;font-size: 12px;">Request ID</td>
//                 <td style= "font-size: 10px;">${requestId}</td>
//                 <td style= "font-size: 12px;">Challan No</td>
//                 <td style= "font-size: 10px;">${
//                   groupedData[requestId][0].challanNo
//                 }</td>
//                 <td style= "font-size: 12px;">Challan Date</td>
//                 <td style= "font-size: 10px;">${formatedDate(
//                   groupedData[requestId][0].challanDate
//                 )}</td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//               </tr>
//               <tr>
//                 <td style="font-weight: bold;font-size: 12px;">Party Name</td>
//                 <td style= "font-size: 10px;">${getpartyId[selectedParty]}</td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//                 <td></td>
//               </tr>
//               ${groupedData[requestId]
//                 .map(
//                   (item, itemIndex) => `
//                 <!-- Table rows for items within requestId ${requestId} here -->
//                 <tr>
//                   <td></td>
//                   <td style= "font-size: 10px;">${item.serNo}</td>
//                   <td style= "font-size: 10px;">${formatedDate(
//                     item.serDate
//                   )}</td>
//                   <td style= "font-size: 10px;">${item.nopieces}</td>
//                   <td style= "font-size: 10px;">${item.passoutWeight} (${
//                     item.passoutWeightUnit
//                   })</td>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                 </tr>
//                 ${groupedDataImp[requestId]
//                   ?.map(
//                     (itemm, itemIndex) => `
//                   <!-- Table rows for imported items within requestId ${requestId} here -->
//                   <tr>
//                     <td colspan="5"></td>
//                     <td style= "font-size: 10px;">${itemm.sirNo}</td>
//                     <td style= "font-size: 10px;">${formatedDate(
//                       itemm.sirDate
//                     )}</td>
//                     <td style= "font-size: 10px;">${itemm.nop}</td>
//                     <td style= "font-size: 10px;">${itemm.netWeight} (${
//                       itemm.netWeightUnit
//                     })</td>
                   
//                   </tr>
//                 `
//                   )
//                   .join("")}
//                 <tr>
//                   <td colspan="7"></td>
//                   <td style= "font-size: 12px;font-weight: bold;">Pending</td>
//                   <td style= "font-size: 10px;">${
//                     netWeights[requestId] !== undefined
//                       ? item.passoutWeight - netWeights[requestId]
//                       : item.passoutWeight
//                   }
//                   (${item.passoutWeightUnit})</td>
//                 </tr>
//                 <tr>
//                   <td colspan="9">
//                     <hr style="border-top: 2px solid #000; margin: 0; padding: 0;" />
//                   </td>
//                 </tr>
//               `
//                 )
//                 .join("")}
//             `
//             )
//             .join("")}
//         </tbody>
//       </table>
  
//           </div>
          
//           <!-- Your footer content here -->
//         </body>
//         </html>
//       `);

//       if (pageIndex < Math.ceil(totalRecords / recordsPerPage) - 1) {
//         printWindow.document.write('<div class="page-break"></div>');

//         currentPageNumber++;
//       }
//     }

//     printWindow.document.close();
//     printWindow.print();
//     printWindow.onafterprint = () => printWindow.close();
//   };

//   const PAGE_BREAK_ROWS_PDF = 9;
//   const handlePDFDownload = async () => {
//     const pdfBlob = await pdf(
//       <MyPDFDocument
//         {...{
//           StarDate,
//           EndDate,
//           selectedParty,
//           groupedData,
//           groupedDataImp,
//           netWeights,
//         }}
//       />
//     ).toBlob();
//     saveAs(pdfBlob, "SubContract_Report.pdf");
//   };
//   const MyPDFDocument = ({
//     StarDate,
//     EndDate,
//     selectedParty,
//     groupedData,
//     groupedDataImp,
//     netWeights,
//   }) => (
//     <Document>
//       {Array.from({
//         length: Math.ceil(
//           Object.keys(groupedData).length / PAGE_BREAK_ROWS_PDF
//         ),
//       }).map((_, pageIndex) => (
//         <Page key={pageIndex} size="A4" style={styles.page}>
//           <View style={styles.header}>
//             <Image src={dgdcImage} style={styles.image} />
//           </View>
//           <View style={[styles.centeredText, { fontWeight: "bold" }]}>
//             <Text style={[styles.centeredText, { fontWeight: "bold" }]}>
//               Subcontract Report
//             </Text>
//           </View>

//           <View style={styles.reportHeader}>
//             <Text>Start Date: {StarDate}</Text>
//             <Text>End Date: {EndDate}</Text>
//             <Text>Party Name: {getpartyId[selectedParty]}</Text>
//           </View>

//           <View style={styles.table}>
//             <View style={styles.tableRow}>
//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text></Text>
//               </View>
//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text style={{ fontWeight: "bold"}}>SER No</Text>
//               </View>

//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text>SER Date</Text>
//               </View>

//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text>NOP</Text>
//               </View>

//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text>Passed out Weight</Text>
//               </View>
//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text>SIR No</Text>
//               </View>

//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text>SIR Date</Text>
//               </View>

//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text>No Of Pkg</Text>
//               </View>

//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text>Passed in Weight</Text>
//               </View>
//             </View>
//             {Object.keys(groupedData)
//               .slice(
//                 pageIndex * PAGE_BREAK_ROWS_PDF,
//                 (pageIndex + 1) * PAGE_BREAK_ROWS_PDF
//               )
//               .map((requestId, index) => (
//                 <React.Fragment key={index}>
//                   <View style={styles.tableRow}>
//                     <View style={{ ...styles.tableCell }}>
//                       <Text style={{ fontSize: 9 }}>Request Id</Text>
//                     </View>
//                     <View style={{ ...styles.tableCell }}>
//                       <Text>{requestId}</Text>
//                     </View>
//                     <View style={[styles.tableCell,{fontSize:9}]}>
//                       <Text style={{ fontSize: 9 }}>Challan No</Text>
//                     </View>
//                     <View style={{ ...styles.tableCell }}>
//                       <Text>{groupedData[requestId][0].challanNo}</Text>
//                     </View>
//                     <View style={[styles.tableCell,{fontSize:9}]}>
//                       <Text style={{ fontSize: 9 }}>Challan Date</Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text>
//                         {formatedDate(groupedData[requestId][0].challanDate)}
//                       </Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                   </View>
//                   <View style={styles.tableRow}>
//                     <View style={{ ...styles.tableCell }}>
//                       <Text style={{ fontSize: 9 }}>Party Name</Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text>{getpartyId[selectedParty]}</Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                     <View style={styles.tableCell}></View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                   </View>
//                   {groupedData[requestId].map((item, itemIndex) => (
//                     <React.Fragment key={itemIndex}>
//                       <View style={styles.tableRow}>
//                         <View style={styles.tableCell}></View>
//                         <View style={{ ...styles.tableCell }}>
//                           <Text>{item.serNo}</Text>
//                         </View>
//                         <View style={styles.tableCell}>
//                           <Text>{formatedDate(item.serDate)}</Text>
//                         </View>
//                         <View style={styles.tableCell}>
//                           <Text>{item.nopieces}</Text>
//                         </View>
//                         <View style={styles.tableCell}>
//                           <Text>
//                             {item.passoutWeight} ({item.passoutWeightUnit})
//                           </Text>
//                         </View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                       </View>
//                       {groupedDataImp[requestId]?.map((itemm, itemIndex) => (
//                         <React.Fragment key={itemIndex}>
//                           <View style={styles.tableRow}>
//                             <View style={styles.tableCell}></View>
//                             <View style={styles.tableCell}></View>
//                             <View style={styles.tableCell}></View>
//                             <View style={styles.tableCell}></View>
//                             <View style={styles.tableCell}></View>
//                             <View style={{ ...styles.tableCell }}>
//                               <Text>{itemm.sirNo}</Text>
//                             </View>
//                             <View style={styles.tableCell}>
//                               <Text>{formatedDate(itemm.sirDate)}</Text>
//                             </View>
//                             <View style={styles.tableCell}>
//                               <Text>{itemm.nop}</Text>
//                             </View>
//                             <View style={styles.tableCell}>
//                               <Text>
//                                 {itemm.netWeight} ({itemm.netWeightUnit})
//                               </Text>
//                             </View>
//                           </View>
//                         </React.Fragment>
//                       ))}
//                       <View style={styles.tableRow}>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}>
//                           <Text style={{fontSize:9,fontWeight:'bold'}}>Pending</Text>
//                         </View>
//                         <View style={styles.tableCell}>
//                           <Text>
//                           {netWeights[requestId] !== undefined
//                               ? item.passoutWeight - netWeights[requestId]
//                               : item.passoutWeight}{" "}
//                             ({item.passoutWeightUnit})
//                           </Text>
//                         </View>
//                       </View>
//                     </React.Fragment>
//                   ))}
//                 </React.Fragment>
//               ))}
//           </View>
//         </Page>
//       ))}
//     </Document>
//   );
//   const PAGE_BREAK_ROWS_PDF_SUB = 18;
//   const handlePDFDownloadSubAll = async () => {
//     const pdfBlob = await pdf(
//       <MyPDFDocumentSubAll
//         {...{
//           StarDate,
//           EndDate,
//           groupedDataExSubAll,
//           groupedDataImpSubAll,
//           netWeightsSubAll,
//         }}
//       />
//     ).toBlob();
//     saveAs(pdfBlob, "SubContract_Report.pdf");
//   };
//   const MyPDFDocumentSubAll = ({
//     StarDate,
//     EndDate,
//     groupedDataExSubAll,
//     groupedDataImpSubAll,
//     netWeightsSubAll,
//   }) => (
//     <Document>
//       {Array.from({
//         length: Math.ceil(
//           Object.keys(subExportSubAllData).length / PAGE_BREAK_ROWS_PDF
//         ),
//       }).map((_, pageIndex) => (
//         <Page key={pageIndex} size="A4" style={styles.page}>
//           <View style={styles.header}>
//             <Image src={dgdcImage} style={styles.image} />
//           </View>
//           <View style={[styles.centeredText, { fontWeight: "bold" }]}>
//             <Text style={[styles.centeredText, { fontWeight: "bold" }]}>
//               Subcontract Report
//             </Text>
//           </View>

//           <View style={styles.reportHeader}>
//             <Text>Start Date: {StarDate}</Text>
//             <Text>End Date: {EndDate}</Text>
//             {/* <Text>Party Name: {getpartyId[selectedParty]}</Text> */}
//           </View>

//           <View style={styles.table}>
//             <View style={styles.tableRow}>
//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text></Text>
//               </View>
//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text style={{ fontWeight: "bold" }}>SER No</Text>
//               </View>

//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text>SER Date</Text>
//               </View>

//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text>No Of Pkg</Text>
//               </View>

//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text>Passed out Weight</Text>
//               </View>
//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text>SIR No</Text>
//               </View>

//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text>SIR Date</Text>
//               </View>

//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text>NOP</Text>
//               </View>

//               <View style={[styles.tableCell, styles.tableCellHeader]}>
//                 <Text>Passed in Weight</Text>
//               </View>
//             </View>
//             {Object.keys(groupedDataExSubAll)
//               .slice(
//                 pageIndex * PAGE_BREAK_ROWS_PDF,
//                 (pageIndex + 1) * PAGE_BREAK_ROWS_PDF
//               )
//               .map((requestId, index) => (
//                 <React.Fragment key={index}>
//                   <View style={styles.tableRow}>
//                     <View style={{ ...styles.tableCell }}>
//                       <Text style={{ fontSize: 9 }}>Request Id</Text>
//                     </View>
//                     <View style={{ ...styles.tableCell }}>
//                       <Text>{requestId}</Text>
//                     </View>
//                     <View style={[styles.tableCell,{fontSize:9}]}>
//                       <Text  style={{ fontSize: 9 }}>Challan No</Text>
//                     </View>
//                     <View style={{ ...styles.tableCell }}>
//                       <Text>{groupedDataExSubAll[requestId][0].challanNo}</Text>
//                     </View>
//                     <View style={[styles.tableCell,{fontSize:9}]}>
//                       <Text  style={{ fontSize: 9 }}>Challan Date</Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text>
//                         {formatedDate(groupedDataExSubAll[requestId][0].challanDate)}
//                       </Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                   </View>
//                   <View style={styles.tableRow}>
//                     <View style={{ ...styles.tableCell }}>
//                       <Text style={{ fontSize: 9 }}>Party Name</Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text>{getpartyId[groupedDataExSubAll[requestId][0].exporter]}</Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                     <View style={styles.tableCell}></View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                     <View style={styles.tableCell}>
//                       <Text></Text>
//                     </View>
//                   </View>
//                   {groupedDataExSubAll[requestId].map((item, itemIndex) => (
//                     <React.Fragment key={itemIndex}>
//                       <View style={styles.tableRow}>
//                         <View style={styles.tableCell}></View>
//                         <View style={{ ...styles.tableCell }}>
//                           <Text>{item.serNo}</Text>
//                         </View>
//                         <View style={styles.tableCell}>
//                           <Text>{formatedDate(item.serDate)}</Text>
//                         </View>
//                         <View style={styles.tableCell}>
//                           <Text>{item.nopieces}</Text>
//                         </View>
//                         <View style={styles.tableCell}>
//                           <Text>
//                             {item.passoutWeight} ({item.passoutWeightUnit})
//                           </Text>
//                         </View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                       </View>
//                       {groupedDataImpSubAll[requestId]?.map((itemm, itemIndex) => (
//                         <React.Fragment key={itemIndex}>
//                           <View style={styles.tableRow}>
//                             <View style={styles.tableCell}></View>
//                             <View style={styles.tableCell}></View>
//                             <View style={styles.tableCell}></View>
//                             <View style={styles.tableCell}></View>
//                             <View style={styles.tableCell}></View>
//                             <View style={{ ...styles.tableCell }}>
//                               <Text>{itemm.sirNo}</Text>
//                             </View>
//                             <View style={styles.tableCell}>
//                               <Text>{formatedDate(itemm.sirDate)}</Text>
//                             </View>
//                             <View style={styles.tableCell}>
//                               <Text>{itemm.nop}</Text>
//                             </View>
//                             <View style={styles.tableCell}>
//                               <Text>
//                                 {itemm.netWeight} ({itemm.netWeightUnit})
//                               </Text>
//                             </View>
//                           </View>
//                         </React.Fragment>
//                       ))}
//                       <View style={styles.tableRow}>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}></View>
//                         <View style={styles.tableCell}>
//                           <Text style={{fontSize:9,fontWeight:'bold'}}>Pending</Text>
//                         </View>
//                         <View style={styles.tableCell}>
//                           <Text>
//                           {netWeightsSubAll[requestId] !== undefined
//                               ? item.passoutWeight - netWeightsSubAll[requestId]
//                               : item.passoutWeight}{" "}
//                             ({item.passoutWeightUnit})
//                           </Text>
//                         </View>
//                       </View>
//                     </React.Fragment>
//                   ))}
//                 </React.Fragment>
//               ))}
//           </View>
//         </Page>
//       ))}
//     </Document>
//   );


//   return (
//     <div>
//       <h4 style={{ marginLeft: 18, marginTop: 25 }}>Sub Contract Report</h4>
//       {/* style={{marginTop:25,marginRight:1,marginLeft:18,padding: 8}} */}
//       <Card
//         style={{ marginTop: 25, marginRight: 18, marginLeft: 18, padding: 8 }}
//       >
//         <Container>
//           <Form>
//             <Row>
//               <Col md={3}>
//                 <Form.Group>
//                   <Form.Label className="inputhead">SIR Date From</Form.Label>
//                   <div className="input-group">
//                     <DatePicker
//                       selected={startDate}
//                       onChange={(date) => setStartDate(date)}
//                       dateFormat="dd/MM/yyyy" // You can customize the date format
//                       name="startDate"
//                       required
//                       className="form-control border-right-0 inputField"
//                       customInput={<input style={{ width: "18vw" }} />}
//                     />
//                   </div>
//                 </Form.Group>
//               </Col>
//               <Col md={3}>
//                 <Form.Group>
//                   <Form.Label className="inputhead">SIR Date To</Form.Label>
//                   <div className="input-group">
//                     <DatePicker
//                       selected={endDate}
//                       onChange={(date) => setEndDate(date)}
//                       dateFormat="dd/MM/yyyy" // You can customize the date format
//                       name="endDate"
//                       required
//                       className="form-control border-right-0 inputField"
//                       customInput={<input style={{ width: "18vw" }} />}
//                     />
//                   </div>{" "}
//                 </Form.Group>
//               </Col>
//               <Col md={3}>
//                 <label htmlFor="company" className="inputhead">
//                   Select Party
//                 </label>
//                 <select
//                   name="company"
//                   id="dw1"
//                   className=""
//                   onChange={handlePartyChange}
//                   value={selectedParty}
//                 >
//                   <option value="">Select</option>
//                   {partys.map((party) => (
//                     <option key={party.partyId} value={party.partyId}>
//                       {party.partyName}
//                     </option>
//                   ))}
//                 </select>
//               </Col>
//               <Col md={3}>
//                 <div style={{ marginTop: 30 }}>
//                   <Button
//                     color="success"
//                     outline
//                     style={{ marginRight: 18 }}
//                     onClick={handleSearch}
//                   >
//                     SEARCH
//                   </Button>

//                   <Button color="warning" outline>
//                     RESET
//                   </Button>
//                 </div>
//               </Col>
//             </Row>
//           </Form>
//         </Container>
//       </Card>
//       {(showSubContractDataTable === "true" && subContractData.length > 0) ||
//       SubImportContractData.length > 0 ? (
//         <Card
//           style={{ marginTop: 25, marginRight: 18, marginLeft: 18, padding: 8 }}
//         >
//           <Row>
//             <Col md={9}></Col>
//             <Col md={3}>
//             <BlobProvider
//                             document={<MyPDFDocument    {...{
//                               StarDate,
//                               EndDate,
//                               selectedParty,
//                               groupedData,
//                               groupedDataImp,
//                               netWeights,
//                             }}/>}
//                           >
//                             {({ blob, url, loading, error }) => (
//                               <a
//                                 href={url}
//                                 style={{ textDecoration: "none" }}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                               >
//                                 <Button
//                                   type="button"
//                                   color="danger"
//                                   outline
//                                   style={{
//                                     marginLeft: 9,
//                                     textDecoration: "none",
//                                   }}
//                                 >
//                                   <FontAwesomeIcon
//                                     icon={faPrint}
//                                     style={{ marginRight: "5px" }}
//                                   />
//                                   PRINT
//                                 </Button>
//                               </a>
//                             )}
//                           </BlobProvider>
//               <button
//                 className="btn btn-outline-danger btn-margin"
//                 type="button"
//                 onClick={handlePDFDownload}
//                 style={{ marginLeft: "10px" }}
//               >
//                 <FontAwesomeIcon
//                   icon={faFilePdf}
//                   style={{ marginRight: "5px" }}
//                 />
//                 PDF
//               </button>
//             </Col>
//           </Row>
//           <div className="table-responsive">
//             <Table
//               className="table table-striped table-hover"
//               style={{ marginTop: 9 }}
//             >
//               <thead>
//                 <tr>
//                   <th style={{ backgroundColor: "#BADDDA" }}></th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>Ser No</th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>Ser Date</th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>No of Pkgs</th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>
//                     Passed Out Weight
//                   </th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>Sir No</th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>Sir Date</th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>No of Pkgs</th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>
//                     Passed In Weight
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.keys(groupedData).map((requestId, index) => (
//                   <React.Fragment key={index}>
//                     <tr>
//                       <td style={{ fontWeight: "bold" }}>Request ID</td>
//                       <td>{requestId}</td>
//                       <td>Challan No</td>
//                       <td>{groupedData[requestId][0].challanNo}</td>
//                       <td>Challan Date</td>
//                       <td>
//                         {formatedDate(groupedData[requestId][0].challanDate)}
//                       </td>
//                       {/* Add more table cells as needed */}
//                     </tr>
//                     <tr>
//                       <td style={{ fontWeight: "bold" }}>Party Name</td>
//                       <td>{getpartyId[selectedParty]}</td>
//                     </tr>
//                     {groupedData[requestId].map((item, itemIndex) => (
//                       <React.Fragment key={itemIndex}>
//                         <tr>
//                           <td></td>
//                           <td>{item.serNo}</td>
//                           <td>{formatedDate(item.serDate)}</td>
//                           <td>{item.nopieces}</td>
//                           <td>
//                             {item.passoutWeight} ({item.passoutWeightUnit})
//                           </td>

//                           {/* Use data from subImportContractData for the same requestId and selectedParty */}
//                         </tr>
//                         {groupedDataImp[requestId]?.map((itemm, itemIndex) => (
//                           <React.Fragment key={itemIndex}>
//                             <tr>
//                               <td colSpan="5"></td>
//                               <td>{itemm.sirNo}</td>
//                               <td>{formatedDate(itemm.sirDate)}</td>
//                               <td>{itemm.nop}</td>
//                               <td>
//                                 {itemm.netWeight}({itemm.netWeightUnit})
//                               </td>
//                               {/* Add more table cells as needed */}
//                             </tr>
//                           </React.Fragment>
//                         ))}
//                         <tr>
//                           <td colSpan="7"></td>
//                           <td colSpan="1">
//                             <strong>Pending</strong>
//                           </td>
//                           <td>
//                             {netWeights[requestId] !== undefined
//                               ? item.passoutWeight - netWeights[requestId]
//                               : item.passoutWeight}{" "}
//                             ({item.passoutWeightUnit})
//                           </td>
//                         </tr>

//                         <tr>
//                           <td colSpan="9">
//                             <hr
//                               style={{
//                                 borderTop: "2px solid #000",
//                                 margin: "0",
//                                 padding: "0",
//                               }}
//                             />
//                           </td>
//                         </tr>
//                       </React.Fragment>
//                     ))}
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//         </Card>
//       ) : null}

//       {(showExportSubAllDataTable === "true" &&
//         subExportSubAllData.length > 0) ||
//       subImportSubAllData.length > 0 ? (
//         <Card
//           style={{ marginTop: 25, marginRight: 18, marginLeft: 18, padding: 8 }}
//         >
//           <Row>
//             <Col md={9}></Col>
//             <Col md={3}>

//             <BlobProvider
//                             document={<MyPDFDocumentSubAll   {...{
//                               StarDate,
//                               EndDate,
//                               groupedDataExSubAll,
//                               groupedDataImpSubAll,
//                               netWeightsSubAll,
//                             }}/>}
//                           >
//                             {({ blob, url, loading, error }) => (
//                               <a
//                                 href={url}
//                                 style={{ textDecoration: "none" }}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                               >
//                                 <Button
//                                   type="button"
//                                   color="danger"
//                                   outline
//                                   style={{
//                                     marginLeft: 9,
//                                     textDecoration: "none",
//                                   }}
//                                 >
//                                   <FontAwesomeIcon
//                                     icon={faPrint}
//                                     style={{ marginRight: "5px" }}
//                                   />
//                                   PRINT
//                                 </Button>
//                               </a>
//                             )}
//                           </BlobProvider>
//               {/* <button
//                 style={{ marginLeft: 9 }}
//                 className="btn btn-outline-danger btn-margin"
//                 type="button"
//                 onClick={handlePrintSubALlData}
//               >
//                 <FontAwesomeIcon
//                   icon={faPrint}
//                   style={{ marginRight: "5px" }}
//                 />
//                 Print
//               </button> */}
//               <button
//                 className="btn btn-outline-danger btn-margin"
//                 type="button"
//                 onClick={handlePDFDownloadSubAll}
//                 style={{ marginLeft: "10px" }}
//               >
//                 <FontAwesomeIcon
//                   icon={faFilePdf}
//                   style={{ marginRight: "5px" }}
//                 />
//                 PDF
//               </button>
//             </Col>
//           </Row>
//           <div className="table-responsive">
//             <Table
//               className="table table-striped table-hover"
//               style={{ marginTop: 9 }}
//             >
//               <thead>
//                 <tr>
//                   <th style={{ backgroundColor: "#BADDDA" }}></th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>Ser No</th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>Ser Date</th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>No of Pkgs</th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>
//                     Passed Out Weight
//                   </th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>Sir No</th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>Sir Date</th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>No of Pkgs</th>
//                   <th style={{ backgroundColor: "#BADDDA" }}>
//                     Passed In Weight
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.keys(groupedDataExSubAll).map((requestId, index) => (
//                   <React.Fragment key={index}>
//                     <tr>
//                       <td style={{ fontWeight: "bold" }}>Request ID</td>
//                       <td>{requestId}</td>
//                       <td>Challan No</td>
//                       <td>{groupedDataExSubAll[requestId][0].challanNo}</td>
//                       <td>Challan Date</td>
//                       <td>
//                         {formatedDate(
//                           groupedDataExSubAll[requestId][0].challanDate
//                         )}
//                       </td>
//                       {/* Add more table cells as needed */}
//                     </tr>
//                     <tr>
//                       <td style={{ fontWeight: "bold" }}>Party Name</td>
//                       <td>
//                         {getpartyId[groupedDataExSubAll[requestId][0].exporter]}
//                       </td>
//                     </tr>
//                     {groupedDataExSubAll[requestId].map((item, itemIndex) => (
//                       <React.Fragment key={itemIndex}>
//                         <tr>
//                           <td></td>
//                           <td>{item.serNo}</td>
//                           <td>{formatedDate(item.serDate)}</td>
//                           <td>{item.nopieces}</td>
//                           <td>
//                             {item.passoutWeight} ({item.passoutWeightUnit})
//                           </td>

//                           {/* Use data from subImportContractData for the same requestId and selectedParty */}
//                         </tr>
//                         {groupedDataImpSubAll[requestId]?.map(
//                           (itemm, itemIndex) => (
//                             <React.Fragment key={itemIndex}>
//                               <tr>
//                                 <td colSpan="5"></td>
//                                 <td>{itemm.sirNo}</td>
//                                 <td>{formatedDate(itemm.sirDate)}</td>
//                                 <td>{itemm.nop}</td>
//                                 <td>
//                                   {itemm.netWeight}({itemm.netWeightUnit})
//                                 </td>
//                                 {/* Add more table cells as needed */}
//                               </tr>
//                             </React.Fragment>
//                           )
//                         )}
//                         <tr>
//                           <td colSpan="7"></td>
//                           <td colSpan="1">
//                             <strong>Pending</strong>
//                           </td>
//                           <td>
//                             {netWeightsSubAll[requestId] !== undefined
//                               ? item.passoutWeight - netWeightsSubAll[requestId]
//                               : item.passoutWeight}{" "}
//                             ({item.passoutWeightUnit})
//                           </td>
//                         </tr>

//                         <tr>
//                           <td colSpan="9">
//                             <hr
//                               style={{
//                                 borderTop: "2px solid #000",
//                                 margin: "0",
//                                 padding: "0",
//                               }}
//                             />
//                           </td>
//                         </tr>
//                       </React.Fragment>
//                     ))}
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//         </Card>
//       ) : null}
//     </div>
//   );
// }



import { redirect } from "react-router-dom";
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { FormGroup, Label } from "reactstrap";
import "../Components/Style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  Button,
  ButtonToggle,
  CardBody,
  Container,
  Table,
  ToastHeader,
} from "reactstrap";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import ipaddress from "../Components/IpAddress";
import { saveAs } from "file-saver";
import axios from "axios";
import dgdcImage from "../Images/report.jpeg";
import { faFilePdf, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Document,
  Page,
  Text,
  View,
  pdf,
  StyleSheet,
  PDFViewer,
  Image,
  BlobProvider,
} from "@react-pdf/renderer";
import { toast } from "react-toastify";

export default function Subcontract_report() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedParty, setSelectedParty] = useState("");
  const [showSubContractDataTable, setSubContractDataTable] = useState(false);
  const [SubImportContractData, setSubImportContractData] = useState([]);
  const [subContractData, setSubContractData] = useState([]);
  const [subExportSubAllData, setExportSubAllData] = useState([]);
  const [subImportSubAllData, setImportSubAllData] = useState([]);
  const [showExportSubAllDataTable, setExportSubAllDataTable] = useState(false);
  const [partyNameToIdMap, setPartyNameToIdMap] = useState({});
  const [requestId, setRequestId] = useState("");
  const [subRequestIdData, setsubRequestIdData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    isAuthenticated,
    login,
    logout,
  } = useContext(AuthContext);
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 20,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
    },
    image: {
      width: 306,
      height: 100,
      marginLeft: 117,
      justifyContent: "center",
    },
    headerText: {
      flex: 1,
      textAlign: "center",
      fontSize: 12,
      fontWeight: "bold",
    },
    centeredText: {
      fontSize: 13,
      textAlign: "center", // Center text horizontally
      paddingBottom: 4,
    },
    reportHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingBottom: 4,
      fontSize: 10,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 0.4,
      borderBottomColor: "black",
      fontSize: 10,
      borderRightWidth: 0.4,
      borderLeftWidth: 0.4,
      borderLeftColor: "black",
      borderRightColor: "black",
      flexWrap: "wrap",
    },
    tableCell: {
      flex: 1,
      borderWidth: 0.4,
      borderStyle: "solid",
      borderColor: "#000",
      padding: 1,
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 7,
    },
    tableCellHeader: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 9,
    },
  });
  // const styles = StyleSheet.create({
  //   page: {
  //     paddingTop: 27,
  //     paddingBottom: 60,
  //     paddingHorizontal: 30,
  //   },
  //   header: {
  //     marginBottom: 20,
  //   },
  //   heading: {
  //     fontSize: 10,
  //     marginBottom: 0,
  //     fontWeight: "bold",
  //     alignItems: "center",
  //   },
  //   table: {
  //     width: "100%",
  //     borderCollapse: "collapse",
  //     marginBottom: 10,
  //   },
  //   centeredText: {
  //     fontSize: 14,
  //     textAlign: "center", // Center text horizontally
  //   },
  //   leftColumn: {
  //     width: "100%",
  //     paddingTop: 18,
  //   },
  //   headingwithbox: {
  //     fontSize: 10,
  //     marginBottom: 0,
  //     fontWeight: "bold",
  //     alignItems: "center",

  //     // Add padding for space between text and border
  //   },
  //   headerText: {
  //     fontSize: 10,
  //     fontWeight: "bold",
  //   },
  //   viewheadingwithbox: {
  //     border: "1px solid black",
  //     padding: 5,
  //   },
  //   paragraph: {
  //     fontSize: 12,
  //     marginBottom: 5,
  //   },
  // reportHeader: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   paddingBottom: 18,
  //   fontSize: 12,
  // },
  //   headingwithborder: {
  //     fontSize: 10,
  //     marginBottom: 0,
  //     fontWeight: "bold",
  //     alignItems: "center",
  //     borderBottom: "1px solid black",
  //     // Add padding for space between text and border
  //   },
  //   image: {
  //     width: 400,
  //     height: 126,
  //     marginBottom: 0,
  //     marginLeft: 70,
  //     justifyContent: "center",
  //   },
  //   dateSize: {
  //     fontSize: 8,
  //   },
  //   normaltext: {
  //     fontSize: 10,
  //     marginTop: 25,
  //     fontWeight: "bold",
  //   },
  //   line: {
  //     width: "100%", // Adjust the width of the line
  //     marginTop: 10, // Adjust the space above the line
  //     marginBottom: 10, // Adjust the space below the line
  //     borderTop: "1pt solid black", // Style the line
  //   },
  //   rightText: {
  //     fontSize: 9,
  //     textAlign: "left", // Center text horizontally
  //     paddingTop: 18,
  //   },
  //   tableRow: {
  //     flexDirection: "row",
  //     borderBottomWidth: 0.4,
  //     borderBottomColor: "black",
  //     fontSize: 10,
  //     borderRightWidth: 0.4,
  //     borderLeftWidth: 0.4,
  //     borderLeftColor: "black",
  //     borderRightColor: "black",
  //     flexWrap: "wrap",
  //   },
  //   tableCell: {
  //     border: "0.4px solid black",
  //     padding: 5,
  //     flexWrap: "wrap",
  //     width: 73,
  //   },
  //   tableCellHeader: {
  //     fontWeight: "bold",
  //     flexWrap: "wrap",
  //     width: 73,
  //     border: "0.4px solid black",
  //   },
  // });

  const CustomHeader = () => {
    return (
      <View style={styles.header}>
        <Image src={dgdcImage} style={styles.image} />
      </View>
    );
  };
  const formatedDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };
  const formatDate = (inputDate, setTimeTo) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = setTimeTo === "start" ? "00" : "23";
    const minutes = setTimeTo === "start" ? "00" : "59";
    return `${year}-${month}-${day}`;
  };

  const formattedStartDate = formatDate(startDate, "start");
  const formattedEndDate = formatDate(endDate, "end");

  const StarDate = formatedDate(formattedStartDate);
  const EndDate = formatedDate(formattedEndDate);
  const [pendingStatus, setPendingStatus] = useState('N');

  const handleReset = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    // formattedStartDate = formatDate(new Date(), "start");
    // formattedEndDate = formatDate(new Date(), "end");
    setSelectedParty('');
    setPendingStatus('');
    handleSearch();
  };

  console.log("stastdate ", startDate);

  console.log("enddate ", endDate);
  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);
  console.log(startDate);

  const [partys, setPartys] = useState([]);
  const [getpartyId, setGetpartyId] = useState({});
  const fetchPartyNames = async () => {
    try {
      const response = await fetch(
        `http://${ipaddress}parties/getAll/${companyid}/${branchId}`
      );
      const data = await response.json();
      const namesMap = {};
      data.forEach((party) => {
        namesMap[party.partyId] = party.partyName;
      });
      setGetpartyId(namesMap);
      setPartys(data);
      setPartyNameToIdMap(namesMap);
    } catch (error) {
      console.error("Error fetching party names:", error);
    }
  };

  useEffect(() => {
    fetchPartyNames();
  }, []);

  const handlePartyChange = (event) => {
    const selectedPartyName = event.target.value;
    setSelectedParty(selectedPartyName);
  };

  const fetchImportSubAllData = () => {
    // Make an API request here to fetch the list of airline names based on the provided criteria

    const dataToSend = { companyid, branchId, formattedStartDate, formattedEndDate };
    const queryParams = new URLSearchParams(dataToSend).toString();

    console.log("******************** Selected Party NOT ImportSub **********************************");

    fetch(
      `http://${ipaddress}importsub/findImportSubAllData?${queryParams}`
    )
      // axios.get(`http://${ipaddress}importsub/findImportSubAllData?${queryParams}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("ImportSubData");
        console.log(data);
        // Ensure that 'data' is an array before updating the 'airlines' state
        if (Array.isArray(data) && data.length > 0) {
          // Update the 'airlines' state with the fetched data
          console.log("ImportSubData");
          console.log(data);
          setImportSubAllData(data);
          setExportSubAllDataTable("true");
          // setSubContractDataTable(false)
          // setSubContractData([]);
          setShowAlert(false);
        } else {
          console.error("API response is not an array:", data);
          // setShowAlert(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching airline names:", error);
        // setShowAlert(true);
      });
  };
  const fetchExportSubAllData = () => {
    console.log("******************** Selected Party NULL  EXportSub **********************************");
    // Make an API request here to fetch the list of airline names based on the provided criteria
    fetch(
      `http://${ipaddress}exportsub/findExportSubAllData?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Ensure that 'data' is an array before updating the 'airlines' state
        if (Array.isArray(data) && data.length > 0) {
          // Update the 'airlines' state with the fetched data
          console.log("ExportSubData");
          console.log(data);

          setExportSubAllData(data);
          setExportSubAllDataTable("true");
          setSubContractDataTable("false");
          setSubContractData([]);
          setSubImportContractData([]);
          toast.success("Data Found !", {
            position: "top-center",
            autoClose: 540, // Duration in milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          console.error("API response is not an array:", data);
          toast.error("Data Not Found !", {
            position: "top-center",
            autoClose: 540, // Duration in milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching airline names:", error);
        // setShowAlert(true);
      });
  };


  const fetchSubContractData = () => {


    console.log("******************** Selected Party  ExportSub **********************************");

    // Make an API request here to fetch the list of airline names based on the provided criteria
    fetch(
      `http://${ipaddress}exportsub/findSubContractData?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&exporter=${selectedParty}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Ensure that 'data' is an array before updating the 'airlines' state
        if (Array.isArray(data) && data.length > 0) {
          // Update the 'airlines' state with the fetched data
          setSubContractData(data);
          setSubContractDataTable("true");
          setExportSubAllDataTable("false");
          setExportSubAllData([]);
          setImportSubAllData([]);
          toast.success("Data Found !", {
            position: "top-center",
            autoClose: 540, // Duration in milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          console.error("API response is not an array:", data);
          toast.error("Data Not Found !", {
            position: "top-center",
            autoClose: 540, // Duration in milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setSubContractDataTable("false");
          setExportSubAllDataTable("false");
          setExportSubAllData([]);
          setImportSubAllData([]);
          setSubContractData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching airline names:", error);
        // setShowAlert(true);
      });
  };

  const fetchSubImportContractData = () => {

    console.log("******************** Selected Party  ImportSub **********************************");

    // Make an API request here to fetch the list of airline names based on the provided criteria
    fetch(
      `http://${ipaddress}importsub/findImportSubContractData?companyId=${companyid}&branchId=${branchId}&exporter=${selectedParty}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Update the 'airlines' state with the fetched data
          setSubImportContractData(data);
          console.log("jgjdsgfdsgfjsdghfjdgshf", data);
          setSubContractDataTable("true");
        } else {
          console.error("API response is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching airline names:", error);
        toast.error("No records found", {
          autoClose: 700,
          position: "top-center",
        });
      });
  };


  const handleSearch = async () => {
    if (startDate && endDate && !selectedParty) {
      fetchExportSubAllData();
      await fetchImportSubAllData();
    } else if (startDate && endDate && selectedParty) {
      fetchSubContractData();
      await fetchSubImportContractData();
    }
  };

  const groupedDataImpSubAll = subImportSubAllData.reduce((groups, item) => {
    const requestId = item.requestId;
    if (!groups[requestId]) {
      groups[requestId] = [];
    }
    groups[requestId].push(item);
    return groups;
  }, {});

  const groupedDataExSubAll = subExportSubAllData.reduce((groups, item) => {
    const requestId = item.requestId;
    if (!groups[requestId]) {
      groups[requestId] = [];
    }
    groups[requestId].push(item);
    return groups;
  }, {});
  // Define a function to calculate the net weight for a specific requestId
  const calculateNetWeightForSubAllRequestId = (requestId) => {
    let totalNetWeight = 0;
    if (groupedDataImpSubAll[requestId]) {
      groupedDataImpSubAll[requestId].forEach((item) => {
        totalNetWeight += item.netWeight;
      });
    }
    return totalNetWeight;
  };

  // Inside your component function, call this function for each requestId
  const calculateForSubAllNetWeights = () => {
    const netWeights = {};
    Object.keys(groupedDataImpSubAll).forEach((requestId) => {
      const totalNetWeight = calculateNetWeightForSubAllRequestId(requestId);
      netWeights[requestId] = totalNetWeight;
    });
    return netWeights;
  };
  const netWeightsSubAll = calculateForSubAllNetWeights();

  // // Define a function to get the exporter for a specific requestId
  // const getExporterForRequestId = (requestId) => {
  //   // Check if the requestId exists in both grouped datasets
  //   if (groupedDataImpSubAll[requestId] && groupedDataExSubAll[requestId]) {
  //     // Extract the exporter name (partyName) from either dataset, as they are the same
  //     const exporter = groupedDataImpSubAll[requestId][0].partyName; // Assuming partyName is a property in the data
  //     return exporter;
  //   }
  //   // Return null or an appropriate value if the requestId is not found in both datasets
  //   return null;
  // };

  // // Inside your component function, call this function for each requestId
  // const getExportersForSubAll = () => {
  //   const exporters = {};
  //   Object.keys(groupedDataImpSubAll).forEach((requestId) => {
  //     const exporter = getExporterForRequestId(requestId);
  //     if (exporter !== null) {
  //       exporters[requestId] = exporter;
  //     }
  //   });
  //   return exporters;
  // };

  // // Call getExportersForSubAll() to get the exporter for each requestId present in both datasets
  // const exportersSubAll = getExportersForSubAll();

  const groupedDataImp = SubImportContractData.reduce((groups, item) => {
    const requestId = item.requestId;
    if (!groups[requestId]) {
      groups[requestId] = [];
    }
    groups[requestId].push(item);
    return groups;
  }, {});

  const groupedData = subContractData.reduce((groups, item) => {
    const requestId = item.requestId;
    if (!groups[requestId]) {
      groups[requestId] = [];
    }
    groups[requestId].push(item);
    return groups;
  }, {});
  // Define a function to calculate the net weight for a specific requestId
  const calculateNetWeightForRequestId = (requestId) => {
    let totalNetWeight = 0;
    if (groupedDataImp[requestId]) {
      groupedDataImp[requestId].forEach((item) => {
        totalNetWeight += item.netWeight;
      });
    }
    return totalNetWeight;
  };

  // Inside your component function, call this function for each requestId
  const calculateNetWeights = () => {
    const netWeights = {};
    Object.keys(groupedDataImp).forEach((requestId) => {
      const totalNetWeight = calculateNetWeightForRequestId(requestId);
      netWeights[requestId] = totalNetWeight;
    });
    return netWeights;
  };

  // Call calculateNetWeights() to get the net weights for each requestId
  const netWeights = calculateNetWeights();

  const mergedData = [...subExportSubAllData, ...subImportSubAllData];

  const handlePrintSubALlData = () => {
    const isoDate = new Date().toISOString();
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based, so we add 1.
    const year = date.getFullYear().toString();

    const printWindow = window.open("", "_blank");
    printWindow.document.open();

    const recordsPerPage = 100;
    const totalRecords = Object.keys(mergedData).length;

    for (
      let pageIndex = 0;
      pageIndex < Math.ceil(totalRecords / recordsPerPage);
      pageIndex++
    ) {
      const currentPageNumber = pageIndex + 1;
      printWindow.document.write(`
      <!DOCTYPE html>
          <html>
          <head>    
          <title> Sub_Contract Report</title>
      
              <style>
              @page {
                margin: 1cm;
                 /* Adjust this value to position the header correctly */
            }
      
            .printable-area {
                font-family: Arial, sans-serif;
                page-break-before: always;
            }
      
            table {
                width: 100%;
                border-collapse: collapse;
            }
      
            th, td {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }
      
            th {
                background-color: #f2f2f2;
            }
            .container {
              display: flex;
              justify-content: space-between;
          }
          .left-column {
              width: 70%; /* Adjust the width as needed */
          }
          .page-break {
            page-break-before: always; /* This will force a page break before the element */
          }
          .right-column {
              width: 30%; /* Adjust the width as needed */
              text-align: right; /* Align text to the right */
          }
            .header img {
                max-width: auto; /* Ensure the image doesn't exceed the page width */
                max-height: auto; /* Adjust the maximum image height as needed */
              
            }
            .report-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            }
      
            #page-header {
                position: static;
                top: 0;
                left: 0;
                right: 0;
                text-align: center;
            }
              
        </style>
          </head>
          <body>
          <div id="page-header">
          <img src="${dgdcImage}" alt="Header Image" style="max-width: 500px; display: block; margin: 0 auto;"> 
              <div style="text-align: center;">
              <h3>Subcontract Report</h3>
              </div>
          </div>
          <div class="report-header">
          <div>Start Date: ${StarDate}</div>
          <div>End Date: ${EndDate}</div>
          <div>Party Name: </div>
        </div>
        <table>
        <thead>
          <tr>
            <th style="background-color: #BADDDA; font-size: 12px;"></th>
            <th style="background-color: #BADDDA; font-size: 12px;">Ser No</th>
            <th style="background-color: #BADDDA; font-size: 12px;">Ser Date</th>
            <th style="background-color: #BADDDA; font-size: 12px;">No of Pkgs</th>
            <th style="background-color: #BADDDA; font-size: 12px;">Passed Out Weight</th>
            <th style="background-color: #BADDDA; font-size: 12px;">Sir No</th>
            <th style="background-color: #BADDDA; font-size: 12px;">Sir Date</th>
            <th style="background-color: #BADDDA; font-size: 12px;">No of Pkgs</th>
            <th style="background-color: #BADDDA; font-size: 12px;">Passed In Weight</th>
          </tr>
        </thead>
        <tbody>
          ${Object.keys(groupedDataExSubAll)
          .slice(pageIndex * recordsPerPage, (pageIndex + 1) * recordsPerPage)
          .map(
            (requestId) => `
              <!-- Table rows for requestId ${requestId} here -->
              <tr>
                <td style="font-weight: bold;font-size: 12px;">Request ID</td>
                <td style= "font-size: 10px;">${requestId}</td>
                <td style= "font-size: 12px;">Challan No</td>
                <td style= "font-size: 10px;">${groupedDataExSubAll[requestId][0].challanNo
              }</td>
                <td style= "font-size: 12px;">Challan Date</td>
                <td style= "font-size: 10px;">${formatedDate(
                groupedDataExSubAll[requestId][0].challanDate
              )}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td style="font-weight: bold;font-size: 12px;">Party Name</td>
                <td style= "font-size: 10px;">${getpartyId[groupedDataExSubAll[requestId][0].exporter]
              }</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              ${groupedDataExSubAll[requestId]
                .map(
                  (item, itemIndex) => `
                <!-- Table rows for items within requestId ${requestId} here -->
                <tr>
                  <td></td>
                  <td style= "font-size: 10px;">${item.serNo}</td>
                  <td style= "font-size: 10px;">${formatedDate(
                    item.serDate
                  )}</td>
                  <td style= "font-size: 10px;">${item.nopieces}</td>
                  <td style= "font-size: 10px;">${item.passoutWeight} (${item.passoutWeightUnit
                    })</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                ${groupedDataImpSubAll[requestId]
                      ?.map(
                        (itemm, itemIndex) => `
                  <!-- Table rows for imported items within requestId ${requestId} here -->
                  <tr>
                    <td colspan="5"></td>
                    <td style= "font-size: 10px;">${itemm.sirNo}</td>
                    <td style= "font-size: 10px;">${formatedDate(
                          itemm.sirDate
                        )}</td>
                    <td style= "font-size: 10px;">${itemm.nop}</td>
                    <td style= "font-size: 10px;">${itemm.netWeight} (${itemm.netWeightUnit
                          })</td>
                   
                  </tr>
                `
                      )
                      .join("")}
                <tr>
                  <td colspan="7"></td>
                  <td style= "font-size: 12px;font-weight: bold;">Pending</td>
                  <td style= "font-size: 10px;">${netWeightsSubAll[requestId] !== undefined
                      ? item.passoutWeight - netWeightsSubAll[requestId]
                      : item.passoutWeight
                    }
                  (${item.passoutWeightUnit})</td>
                </tr>
                <tr>
                  <td colspan="9">
                    <hr style="border-top: 2px solid #000; margin: 0; padding: 0;" />
                  </td>
                </tr>
              `
                )
                .join("")}
            `
          )
          .join("")}
        </tbody>
      </table>
  
          </div>
          
          <!-- Your footer content here -->
        </body>
        </html>
      `);

      if (pageIndex < Math.ceil(totalRecords / recordsPerPage) - 1) {
        printWindow.document.write('<div class="page-break"></div>');

        currentPageNumber++;
      }
    }

    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

  const handlePrint = () => {
    const isoDate = new Date().toISOString();
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based, so we add 1.
    const year = date.getFullYear().toString();

    const printWindow = window.open("", "_blank");
    printWindow.document.open();

    const recordsPerPage = 100;
    const totalRecords = Object.keys(groupedData).length;

    for (
      let pageIndex = 0;
      pageIndex < Math.ceil(totalRecords / recordsPerPage);
      pageIndex++
    ) {
      const currentPageNumber = pageIndex + 1;
      printWindow.document.write(`
      <!DOCTYPE html>
          <html>
          <head>    
          <title> Sub_Contract Report</title>
      
              <style>
              @page {
                margin: 1cm;
                 /* Adjust this value to position the header correctly */
            }
      
            .printable-area {
                font-family: Arial, sans-serif;
                page-break-before: always;
            }
      
            table {
                width: 100%;
                border-collapse: collapse;
            }
      
            th, td {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }
      
            th {
                background-color: #f2f2f2;
            }
            .container {
              display: flex;
              justify-content: space-between;
          }
          .left-column {
              width: 70%; /* Adjust the width as needed */
          }
          .page-break {
            page-break-before: always; /* This will force a page break before the element */
          }
          .right-column {
              width: 30%; /* Adjust the width as needed */
              text-align: right; /* Align text to the right */
          }
            .header img {
                max-width: auto; /* Ensure the image doesn't exceed the page width */
                max-height: auto; /* Adjust the maximum image height as needed */
              
            }
            .report-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            }
      
            #page-header {
                position: static;
                top: 0;
                left: 0;
                right: 0;
                text-align: center;
            }
              
        </style>
          </head>
          <body>
          <div id="page-header">
          <img src="${dgdcImage}" alt="Header Image" style="max-width: 500px; display: block; margin: 0 auto;"> 
              <div style="text-align: center;">
              <h3>Subcontract Report</h3>
              </div>
          </div>
          <div class="report-header">
          <div>Start Date: ${StarDate}</div>
          <div>End Date: ${EndDate}</div>
          <div>Party Name: ${getpartyId[selectedParty]}</div>
        </div>
        <table>
        <thead>
          <tr>
            <th style="background-color: #BADDDA; font-size: 12px;"></th>
            <th style="background-color: #BADDDA; font-size: 12px;">Ser No</th>
            <th style="background-color: #BADDDA; font-size: 12px;">Ser Date</th>
            <th style="background-color: #BADDDA; font-size: 12px;">No of Pkgs</th>
            <th style="background-color: #BADDDA; font-size: 12px;">Passed Out Weight</th>
            <th style="background-color: #BADDDA; font-size: 12px;">Sir No</th>
            <th style="background-color: #BADDDA; font-size: 12px;">Sir Date</th>
            <th style="background-color: #BADDDA; font-size: 12px;">No of Pkgs</th>
            <th style="background-color: #BADDDA; font-size: 12px;">Passed In Weight</th>
          </tr>
        </thead>
        <tbody>
          ${Object.keys(groupedData)
          .slice(pageIndex * recordsPerPage, (pageIndex + 1) * recordsPerPage)
          .map(
            (requestId) => `
              <!-- Table rows for requestId ${requestId} here -->
              <tr>
                <td style="font-weight: bold;font-size: 12px;">Request ID</td>
                <td style= "font-size: 10px;">${requestId}</td>
                <td style= "font-size: 12px;">Challan No</td>
                <td style= "font-size: 10px;">${groupedData[requestId][0].challanNo
              }</td>
                <td style= "font-size: 12px;">Challan Date</td>
                <td style= "font-size: 10px;">${formatedDate(
                groupedData[requestId][0].challanDate
              )}</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td style="font-weight: bold;font-size: 12px;">Party Name</td>
                <td style= "font-size: 10px;">${getpartyId[selectedParty]}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              ${groupedData[requestId]
                .map(
                  (item, itemIndex) => `
                <!-- Table rows for items within requestId ${requestId} here -->
                <tr>
                  <td></td>
                  <td style= "font-size: 10px;">${item.serNo}</td>
                  <td style= "font-size: 10px;">${formatedDate(
                    item.serDate
                  )}</td>
                  <td style= "font-size: 10px;">${item.nopieces}</td>
                  <td style= "font-size: 10px;">${item.passoutWeight} (${item.passoutWeightUnit
                    })</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                ${groupedDataImp[requestId]
                      ?.map(
                        (itemm, itemIndex) => `
                  <!-- Table rows for imported items within requestId ${requestId} here -->
                  <tr>
                    <td colspan="5"></td>
                    <td style= "font-size: 10px;">${itemm.sirNo}</td>
                    <td style= "font-size: 10px;">${formatedDate(
                          itemm.sirDate
                        )}</td>
                    <td style= "font-size: 10px;">${itemm.nop}</td>
                    <td style= "font-size: 10px;">${itemm.netWeight} (${itemm.netWeightUnit
                          })</td>
                   
                  </tr>
                `
                      )
                      .join("")}
                <tr>
                  <td colspan="7"></td>
                  <td style= "font-size: 12px;font-weight: bold;">Pending</td>
                  <td style= "font-size: 10px;">${netWeights[requestId] !== undefined
                      ? item.passoutWeight - netWeights[requestId]
                      : item.passoutWeight
                    }
                  (${item.passoutWeightUnit})</td>
                </tr>
                <tr>
                  <td colspan="9">
                    <hr style="border-top: 2px solid #000; margin: 0; padding: 0;" />
                  </td>
                </tr>
              `
                )
                .join("")}
            `
          )
          .join("")}
        </tbody>
      </table>
  
          </div>
          
          <!-- Your footer content here -->
        </body>
        </html>
      `);

      if (pageIndex < Math.ceil(totalRecords / recordsPerPage) - 1) {
        printWindow.document.write('<div class="page-break"></div>');

        currentPageNumber++;
      }
    }

    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

  const PAGE_BREAK_ROWS_PDF = 9;
  const handlePDFDownload = async () => {
    const pdfBlob = await pdf(
      <MyPDFDocument
        {...{
          StarDate,
          EndDate,
          selectedParty,
          groupedData,
          groupedDataImp,
          netWeights,
        }}
      />
    ).toBlob();
    saveAs(pdfBlob, "SubContract_Report.pdf");
  };
  const MyPDFDocument = ({
    StarDate,
    EndDate,
    selectedParty,
    groupedData,
    groupedDataImp,
    netWeights,
  }) => (
    <Document>
      {Array.from({
        length: Math.ceil(
          Object.keys(groupedData).length / PAGE_BREAK_ROWS_PDF
        ),
      }).map((_, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image src={dgdcImage} style={styles.image} />
          </View>
          <View style={[styles.centeredText, { fontWeight: "bold" }]}>
            <Text style={[styles.centeredText, { fontWeight: "bold" }]}>
              Subcontract Report
            </Text>
          </View>

          <View style={styles.reportHeader}>
            <Text>Start Date: {StarDate}</Text>
            <Text>End Date: {EndDate}</Text>
            <Text>Party Name: {getpartyId[selectedParty]}</Text>
          </View>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text></Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text style={{ fontWeight: "bold" }}>SER No</Text>
              </View>

              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text>SER Date</Text>
              </View>

              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text>NOP</Text>
              </View>

              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text>Passed out Weight</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text>SIR No</Text>
              </View>

              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text>SIR Date</Text>
              </View>

              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text>No Of Pkg</Text>
              </View>

              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text>Passed in Weight</Text>
              </View>
            </View>
            {Object.keys(groupedData)
              .slice(
                pageIndex * PAGE_BREAK_ROWS_PDF,
                (pageIndex + 1) * PAGE_BREAK_ROWS_PDF
              )
              .map((requestId, index) => (
                <React.Fragment key={index}>
                  <View style={styles.tableRow}>
                    <View style={{ ...styles.tableCell }}>
                      <Text style={{ fontSize: 9 }}>Request Id</Text>
                    </View>
                    <View style={{ ...styles.tableCell }}>
                      <Text>{requestId}</Text>
                    </View>
                    <View style={[styles.tableCell, { fontSize: 9 }]}>
                      <Text style={{ fontSize: 9 }}>Challan No</Text>
                    </View>
                    <View style={{ ...styles.tableCell }}>
                      <Text>{groupedData[requestId][0].challanNo}</Text>
                    </View>
                    <View style={[styles.tableCell, { fontSize: 9 }]}>
                      <Text style={{ fontSize: 9 }}>Challan Date</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text>
                        {formatedDate(groupedData[requestId][0].challanDate)}
                      </Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={{ ...styles.tableCell }}>
                      <Text style={{ fontSize: 9 }}>Party Name</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text>{getpartyId[selectedParty]}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                    <View style={styles.tableCell}></View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                  </View>
                  {groupedData[requestId].map((item, itemIndex) => (
                    <React.Fragment key={itemIndex}>
                      <View style={styles.tableRow}>
                        <View style={styles.tableCell}></View>
                        <View style={{ ...styles.tableCell }}>
                          <Text>{item.serNo}</Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text>{formatedDate(item.serDate)}</Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text>{item.nopieces}</Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text>
                            {item.passoutWeight} ({item.passoutWeightUnit})
                          </Text>
                        </View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                      </View>
                      {groupedDataImp[requestId]?.map((itemm, itemIndex) => (
                        <React.Fragment key={itemIndex}>
                          <View style={styles.tableRow}>
                            <View style={styles.tableCell}></View>
                            <View style={styles.tableCell}></View>
                            <View style={styles.tableCell}></View>
                            <View style={styles.tableCell}></View>
                            <View style={styles.tableCell}></View>
                            <View style={{ ...styles.tableCell }}>
                              <Text>{itemm.sirNo}</Text>
                            </View>
                            <View style={styles.tableCell}>
                              <Text>{formatedDate(itemm.sirDate)}</Text>
                            </View>
                            <View style={styles.tableCell}>
                              <Text>{itemm.nop}</Text>
                            </View>
                            <View style={styles.tableCell}>
                              <Text>
                                {itemm.netWeight} ({itemm.netWeightUnit})
                              </Text>
                            </View>
                          </View>
                        </React.Fragment>
                      ))}
                      <View style={styles.tableRow}>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}>
                          <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Pending</Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text>
                            {netWeights[requestId] !== undefined
                              ? item.passoutWeight - netWeights[requestId]
                              : item.passoutWeight}{" "}
                            ({item.passoutWeightUnit})
                          </Text>
                        </View>
                      </View>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
          </View>
        </Page>
      ))}
    </Document>
  );
  const PAGE_BREAK_ROWS_PDF_SUB = 18;
  const handlePDFDownloadSubAll = async () => {
    const pdfBlob = await pdf(
      <MyPDFDocumentSubAll
        {...{
          StarDate,
          EndDate,
          groupedDataExSubAll,
          groupedDataImpSubAll,
          netWeightsSubAll,
        }}
      />
    ).toBlob();
    saveAs(pdfBlob, "SubContract_Report.pdf");
  };
  const MyPDFDocumentSubAll = ({
    StarDate,
    EndDate,
    groupedDataExSubAll,
    groupedDataImpSubAll,
    netWeightsSubAll,
  }) => (
    <Document>
      {Array.from({
        length: Math.ceil(
          Object.keys(subExportSubAllData).length / PAGE_BREAK_ROWS_PDF
        ),
      }).map((_, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image src={dgdcImage} style={styles.image} />
          </View>
          <View style={[styles.centeredText, { fontWeight: "bold" }]}>
            <Text style={[styles.centeredText, { fontWeight: "bold" }]}>
              Subcontract Report
            </Text>
          </View>

          <View style={styles.reportHeader}>
            <Text>Start Date: {StarDate}</Text>
            <Text>End Date: {EndDate}</Text>
            {/* <Text>Party Name: {getpartyId[selectedParty]}</Text> */}
          </View>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text></Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text style={{ fontWeight: "bold" }}>SER No</Text>
              </View>

              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text>SER Date</Text>
              </View>

              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text>No Of Pkg</Text>
              </View>

              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text>Passed out Weight</Text>
              </View>
              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text>SIR No</Text>
              </View>

              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text>SIR Date</Text>
              </View>

              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text>NOP</Text>
              </View>

              <View style={[styles.tableCell, styles.tableCellHeader]}>
                <Text>Passed in Weight</Text>
              </View>
            </View>
            {Object.keys(groupedDataExSubAll)
              .slice(
                pageIndex * PAGE_BREAK_ROWS_PDF,
                (pageIndex + 1) * PAGE_BREAK_ROWS_PDF
              )
              .map((requestId, index) => (
                <React.Fragment key={index}>
                  <View style={styles.tableRow}>
                    <View style={{ ...styles.tableCell }}>
                      <Text style={{ fontSize: 9 }}>Request Id</Text>
                    </View>
                    <View style={{ ...styles.tableCell }}>
                      <Text>{requestId}</Text>
                    </View>
                    <View style={[styles.tableCell, { fontSize: 9 }]}>
                      <Text style={{ fontSize: 9 }}>Challan No</Text>
                    </View>
                    <View style={{ ...styles.tableCell }}>
                      <Text>{groupedDataExSubAll[requestId][0].challanNo}</Text>
                    </View>
                    <View style={[styles.tableCell, { fontSize: 9 }]}>
                      <Text style={{ fontSize: 9 }}>Challan Date</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text>
                        {formatedDate(groupedDataExSubAll[requestId][0].challanDate)}
                      </Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={{ ...styles.tableCell }}>
                      <Text style={{ fontSize: 9 }}>Party Name</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text>{getpartyId[groupedDataExSubAll[requestId][0].exporter]}</Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                    <View style={styles.tableCell}></View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                    <View style={styles.tableCell}>
                      <Text></Text>
                    </View>
                  </View>
                  {groupedDataExSubAll[requestId].map((item, itemIndex) => (
                    <React.Fragment key={itemIndex}>
                      <View style={styles.tableRow}>
                        <View style={styles.tableCell}></View>
                        <View style={{ ...styles.tableCell }}>
                          <Text>{item.serNo}</Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text>{formatedDate(item.serDate)}</Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text>{item.nopieces}</Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text>
                            {item.passoutWeight} ({item.passoutWeightUnit})
                          </Text>
                        </View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                      </View>
                      {groupedDataImpSubAll[requestId]?.map((itemm, itemIndex) => (
                        <React.Fragment key={itemIndex}>
                          <View style={styles.tableRow}>
                            <View style={styles.tableCell}></View>
                            <View style={styles.tableCell}></View>
                            <View style={styles.tableCell}></View>
                            <View style={styles.tableCell}></View>
                            <View style={styles.tableCell}></View>
                            <View style={{ ...styles.tableCell }}>
                              <Text>{itemm.sirNo}</Text>
                            </View>
                            <View style={styles.tableCell}>
                              <Text>{formatedDate(itemm.sirDate)}</Text>
                            </View>
                            <View style={styles.tableCell}>
                              <Text>{itemm.nop}</Text>
                            </View>
                            <View style={styles.tableCell}>
                              <Text>
                                {itemm.netWeight} ({itemm.netWeightUnit})
                              </Text>
                            </View>
                          </View>
                        </React.Fragment>
                      ))}
                      <View style={styles.tableRow}>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}></View>
                        <View style={styles.tableCell}>
                          <Text style={{ fontSize: 9, fontWeight: 'bold' }}>Pending</Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text>
                            {netWeightsSubAll[requestId] !== undefined
                              ? item.passoutWeight - netWeightsSubAll[requestId]
                              : item.passoutWeight}{" "}
                            ({item.passoutWeightUnit})
                          </Text>
                        </View>
                      </View>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
          </View>
        </Page>
      ))}
    </Document>
  );


  return (
    <div>
      <h4 style={{ marginLeft: 18, marginTop: 25 }}>Sub Contract Report</h4>
      {/* style={{marginTop:25,marginRight:1,marginLeft:18,padding: 8}} */}
      <Card
        style={{ marginTop: 25, marginRight: 18, marginLeft: 18, padding: 8 }}
      >
        <Container>
          <Form>
            <Row>
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="inputhead">SIR Date From</Form.Label>
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      wrapperClassName="custom-react-datepicker-wrapper"
                      dateFormat="dd/MM/yyyy" // You can customize the date format
                      name="startDate"
                      required
                      className="form-control border-right-0 inputField"
                      customInput={<input style={{ width: "100%" }} />}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="inputhead">SIR Date To</Form.Label>
                  <div>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      wrapperClassName="custom-react-datepicker-wrapper"
                      dateFormat="dd/MM/yyyy" // You can customize the date format
                      name="endDate"
                      required
                      className="form-control border-right-0 inputField"
                      customInput={<input style={{ width: "100%" }} />}
                    />
                  </div>{" "}
                </Form.Group>
              </Col>
              <Col md={3}>
                <label htmlFor="company" className="inputhead">
                  Select Party
                </label>
                <select
                  name="company"
                  className="form-select"
                  onChange={handlePartyChange}
                  value={selectedParty}
                >
                  <option value="">Select</option>
                  {partys.map((party) => (
                    <option key={party.partyId} value={party.partyId}>
                      {party.partyName}
                    </option>
                  ))}
                </select>
              </Col>
              {/* <Col md={2}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Pending</Label>
                  <select
                    className="form-select"
                    aria-label="SC Status"
                    value={pendingStatus}
                    onChange={(e) => setPendingStatus(e.target.value)}
                  >
                    <option value="">Select Pemding Status</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>
                </FormGroup>
              </Col> */}
              <Col md={3}>
                <div style={{ marginTop: 30 }}>
                  <Button
                    color="primary"
                    outline
                    style={{ marginRight: 18 }}
                    onClick={handleSearch}
                  >
                    SEARCH
                  </Button>

                  <Button
                    onClick={handleReset}
                    color="success" outline>
                    RESET
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </Card>
      {(showSubContractDataTable === "true" && subContractData.length > 0) ||
        SubImportContractData.length > 0 ? (
        <Card
          style={{ marginTop: 25, marginRight: 18, marginLeft: 18, padding: 8 }}
        >
          <Row>
            <Col md={9}></Col>
            <Col md={3}>
              <BlobProvider
                document={<MyPDFDocument    {...{
                  StarDate,
                  EndDate,
                  selectedParty,
                  groupedData,
                  groupedDataImp,
                  netWeights,
                }} />}
              >
                {({ blob, url, loading, error }) => (
                  <a
                    href={url}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      type="button"
                      color="danger"
                      outline
                      style={{
                        marginLeft: 9,
                        textDecoration: "none",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPrint}
                        style={{ marginRight: "5px" }}
                      />
                      PRINT
                    </Button>
                  </a>
                )}
              </BlobProvider>
              <button
                className="btn btn-outline-danger btn-margin"
                type="button"
                onClick={handlePDFDownload}
                style={{ marginLeft: "10px" }}
              >
                <FontAwesomeIcon
                  icon={faFilePdf}
                  style={{ marginRight: "5px" }}
                />
                PDF
              </button>
            </Col>
          </Row>
          <div className="table-responsive">
            <Table
              className="table table-striped table-hover"
              style={{ marginTop: 9 }}
            >
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#BADDDA" }}></th>
                  <th style={{ backgroundColor: "#BADDDA" }}>Ser No</th>
                  <th style={{ backgroundColor: "#BADDDA" }}>Ser Date</th>
                  <th style={{ backgroundColor: "#BADDDA" }}>No of Pkgs</th>
                  <th style={{ backgroundColor: "#BADDDA" }}>
                    Passed Out Weight
                  </th>
                  <th style={{ backgroundColor: "#BADDDA" }}>Sir No</th>
                  <th style={{ backgroundColor: "#BADDDA" }}>Sir Date</th>
                  <th style={{ backgroundColor: "#BADDDA" }}>No of Pkgs</th>
                  <th style={{ backgroundColor: "#BADDDA" }}>
                    Passed In Weight
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(groupedData).map((requestId, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Request ID</td>
                      <td>{requestId}</td>
                      <td>Challan No</td>
                      <td>{groupedData[requestId][0].challanNo}</td>
                      <td>Challan Date</td>
                      <td>
                        {formatedDate(groupedData[requestId][0].challanDate)}
                      </td>
                      {/* Add more table cells as needed */}
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Party Name</td>
                      <td>{getpartyId[selectedParty]}</td>
                    </tr>
                    {groupedData[requestId].map((item, itemIndex) => (
                      <React.Fragment key={itemIndex}>
                        <tr>
                          <td></td>
                          <td>{item.serNo}</td>
                          <td>{formatedDate(item.serDate)}</td>
                          <td>{item.nopieces}</td>
                          <td>
                            {item.passoutWeight} ({item.passoutWeightUnit})
                          </td>
                          {/* Use data from subImportContractData for the same requestId and selectedParty */}
                        </tr>
                        {groupedDataImp[requestId]?.map((itemm, itemIndex) => (
                          <React.Fragment key={itemIndex}>
                            <tr>
                              <td colSpan="5"></td>
                              <td>{itemm.sirNo}</td>
                              <td>{formatedDate(itemm.sirDate)}</td>
                              <td>{itemm.nop}</td>
                              <td>
                                {itemm.netWeight}({itemm.netWeightUnit})
                              </td>
                              {/* Add more table cells as needed */}
                            </tr>
                          </React.Fragment>
                        ))}
                        <tr>
                          <td colSpan="7"></td>
                          <td colSpan="1">
                            <strong>
                              {netWeights[requestId] !== undefined &&
                                (item.passoutWeight - netWeights[requestId]) === 0
                                ? "Passed In Full"
                                : "Pending"}
                            </strong>
                          </td>
                          <td>
                            {netWeights[requestId] !== undefined
                              ? (item.passoutWeight - netWeights[requestId] !== 0
                                ? `${item.passoutWeight - netWeights[requestId]} (${item.passoutWeightUnit})`
                                : "")
                              : `${item.passoutWeight} (${item.passoutWeightUnit})`}
                          </td>
                        </tr>

                        <tr>
                          <td colSpan="9">
                            <hr
                              style={{
                                borderTop: "2px solid #000",
                                margin: "0",
                                padding: "0",
                              }}
                            />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      ) : null}

      {(showExportSubAllDataTable === "true" &&
        subExportSubAllData.length > 0) ||
        subImportSubAllData.length > 0 ? (
        <Card
          style={{ marginTop: 25, marginRight: 18, marginLeft: 18, padding: 8 }}
        >
          <Row>
            <Col md={9}></Col>
            <Col md={3}>

              <BlobProvider
                document={<MyPDFDocumentSubAll   {...{
                  StarDate,
                  EndDate,
                  groupedDataExSubAll,
                  groupedDataImpSubAll,
                  netWeightsSubAll,
                }} />}
              >
                {({ blob, url, loading, error }) => (
                  <a
                    href={url}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      type="button"
                      color="danger"
                      outline
                      style={{
                        marginLeft: 9,
                        textDecoration: "none",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPrint}
                        style={{ marginRight: "5px" }}
                      />
                      PRINT
                    </Button>
                  </a>
                )}
              </BlobProvider>
              {/* <button
                style={{ marginLeft: 9 }}
                className="btn btn-outline-danger btn-margin"
                type="button"
                onClick={handlePrintSubALlData}
              >
                <FontAwesomeIcon
                  icon={faPrint}
                  style={{ marginRight: "5px" }}
                />
                Print
              </button> */}
              <button
                className="btn btn-outline-danger btn-margin"
                type="button"
                onClick={handlePDFDownloadSubAll}
                style={{ marginLeft: "10px" }}
              >
                <FontAwesomeIcon
                  icon={faFilePdf}
                  style={{ marginRight: "5px" }}
                />
                PDF
              </button>
            </Col>
          </Row>
          <div className="table-responsive">
            <Table
              className="table table-striped table-hover"
              style={{ marginTop: 9 }}
            >
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#BADDDA" }}></th>
                  <th style={{ backgroundColor: "#BADDDA" }}>Ser No</th>
                  <th style={{ backgroundColor: "#BADDDA" }}>Ser Date</th>
                  <th style={{ backgroundColor: "#BADDDA" }}>No of Pkgs</th>
                  <th style={{ backgroundColor: "#BADDDA" }}>
                    Passed Out Weight
                  </th>
                  <th style={{ backgroundColor: "#BADDDA" }}>Sir No</th>
                  <th style={{ backgroundColor: "#BADDDA" }}>Sir Date</th>
                  <th style={{ backgroundColor: "#BADDDA" }}>No of Pkgs</th>
                  <th style={{ backgroundColor: "#BADDDA" }}>
                    Passed In Weight
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(groupedDataExSubAll).map((requestId, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Request ID</td>
                      <td>{requestId}</td>
                      <td>Challan No</td>
                      <td>{groupedDataExSubAll[requestId][0].challanNo}</td>
                      <td>Challan Date</td>
                      <td>
                        {formatedDate(
                          groupedDataExSubAll[requestId][0].challanDate
                        )}
                      </td>
                      {/* Add more table cells as needed */}
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Party Name</td>
                      <td>
                        {getpartyId[groupedDataExSubAll[requestId][0].exporter]}
                      </td>
                    </tr>
                    {groupedDataExSubAll[requestId].map((item, itemIndex) => (
                      <React.Fragment key={itemIndex}>
                        <tr>
                          <td></td>
                          <td>{item.serNo}</td>
                          <td>{formatedDate(item.serDate)}</td>
                          <td>{item.nopieces}</td>
                          <td>
                            {item.passoutWeight} ({item.passoutWeightUnit})
                          </td>

                          {/* Use data from subImportContractData for the same requestId and selectedParty */}
                        </tr>
                        {groupedDataImpSubAll[requestId]?.map(
                          (itemm, itemIndex) => (
                            <React.Fragment key={itemIndex}>
                              <tr>
                                <td colSpan="5"></td>
                                <td>{itemm.sirNo}</td>
                                <td>{formatedDate(itemm.sirDate)}</td>
                                <td>{itemm.nop}</td>
                                <td>
                                  {itemm.netWeight}({itemm.netWeightUnit})
                                </td>
                                {/* Add more table cells as needed */}
                              </tr>
                            </React.Fragment>
                          )
                        )}
                        <tr>
                          <td colSpan="7"></td>
                          <td colSpan="1">
                            <strong>
                              {netWeightsSubAll[requestId] !== undefined &&
                                (item.passoutWeight - netWeightsSubAll[requestId]) === 0
                                ? "Passed In Full"
                                : "Pending"}
                            </strong>
                          </td>
                          <td>
                            {netWeightsSubAll[requestId] !== undefined
                              ? (item.passoutWeight - netWeightsSubAll[requestId] !== 0
                                ? `${item.passoutWeight - netWeightsSubAll[requestId]} (${item.passoutWeightUnit})`
                                : " ")
                              : `${item.passoutWeight} (${item.passoutWeightUnit})`}
                          </td>
                        </tr>

                        <tr>
                          <td colSpan="9">
                            <hr
                              style={{
                                borderTop: "2px solid #000",
                                margin: "0",
                                padding: "0",
                              }}
                            />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      ) : null}
    </div>
  );
}