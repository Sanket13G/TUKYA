// import AuthContext from "../Components/AuthProvider";
// import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState, useContext, useRef } from "react";
// import "../Components/Style.css";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import ipaddress from "../Components/IpAddress";
// import Card from "react-bootstrap/Card";
// import { CardBody, Input } from "reactstrap";
// import DGDCimage from "../Images/DGDC.png";
// import { saveAs } from "file-saver";
// import { toast } from "react-toastify";
// import axios from "axios";
// import dgdcImage from "../Images/report.jpeg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css"; // Import the styles
// import {
//   faArrowsToEye,
//   faBorderAll,
//   faEye,
//   faFileArrowUp,
//   faSearch,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   faCheck,
//   faSave,
//   faTimes,
//   faSyncAlt,
//   faFileExcel,
//   faFilePdf,
//   faPrint,
// } from "@fortawesome/free-solid-svg-icons";
// import { Table } from "react-bootstrap";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import { Line, pdf, PDFDownloadLink } from "@react-pdf/renderer";
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   PDFViewer,
//   Image as MyImage,
// } from "@react-pdf/renderer";
// import { BlobProvider } from "@react-pdf/renderer";
// import { data } from "jquery";

// const styles = StyleSheet.create({
//   page: {
//     paddingTop: 18,
//     paddingBottom: 18,
//     paddingHorizontal: 18,
//   },
//   header: {
//     marginBottom: 5,
//   },
//   heading: {
//     fontSize: 9,
//     marginBottom: 0,
//     fontWeight: "bold",
//     alignItems: "center",
//     height : 20
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: 4,
//   },
//   centeredText: {
//     fontSize: 13,
//     textAlign: "center", // Center text horizontally
//   },
//   leftColumn: {
//     width: "100%",
//     paddingTop: 9,
//   },
//   headingwithbox: {
//     fontSize: 9,
//     marginBottom: 0,
//     fontWeight: "bold",
//     alignItems: "center",

//     // Add padding for space between text and border
//   },
//   headerText: {
//     fontSize: 9,
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
//   headingwithborder: {
//     fontSize: 9,
//     marginBottom: 0,
//     fontWeight: "bold",
//     alignItems: "center",
//     borderBottom: "1px solid black",
//     // Add padding for space between text and border
//   },
//   image: {
//     width: 306,
//     height: 100,
//     marginLeft: 117,
//     justifyContent: "center",
//   },
//   dateSize: {
//     fontSize: 8,
//   },
//   normaltext: {
//     fontSize: 9,
//     marginTop: 4,
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
//     paddingTop: 5,
//   },
//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 0.4,
//     borderBottomColor: "black",
//     fontSize: 9,
//     borderRightWidth: 0.4,
//     borderLeftWidth: 0.4,
//     borderLeftColor: "black",
//     borderRightColor: "black",
//     flexWrap: "wrap",
//   },
//   tableCell: {
//     border: "0.4px solid black",
//     padding: 2,
//     fontSize: 7,
//     flexWrap: "wrap",
//     width: 48,
//     textAlign: "center",
//   },
//   tableHeader: {
//     fontWeight: "bold",
//     flexWrap: "wrap",
//     width: 48,
//     fontSize: 9,
//     textAlign: "center",
//     height: 30,
//     border: "0.4px solid black",
//   },
// });

// export default function Import_Register_1() {
//   const navigate = useNavigate();

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

//   const formatTpNo = (tpNo) => {
//     // Remove leading zeros using a regular expression
//     return tpNo.replace(/^0+/, "");
//   };

//   const formatPctmNO = (pctmNo) => {
//     // Remove leading zeros using a regular expression
//     return pctmNo.replace(/^0+/, "");
//   };

//   const CustomHeader = () => {
//     return (
//       <View style={styles.header}>
//         <MyImage src={dgdcImage} style={styles.image} />
//       </View>
//     );
//   };
//   const today = new Date().toISOString().split("T")[0];

//   // State to store selected date
//   const currentDate = new Date();
//   const currentDateString = currentDate.toISOString().split("T")[0];

//   const [selectedDate, setSelectedDate] = useState(new Date());
//   console.log("date2 ", selectedDate);
//   const [pdfData, setPdfData] = useState(null);
//   // State to store the Transhipment Permit No (replace with actual data)
//   const [transhipmentPermitNo, setTranshipmentPermitNo] =
//     useState(currentDateString);
//   const [generatedPDF, setGeneratedPDF] = useState(null);
//   const [showPdfModal, setShowPdfModal] = useState(false);
//   const [responseData, setResponseData] = useState([]);
//   const [tpdata, setTpdata] = useState([]);
//   const [error, setError] = useState(null);

//   const totalRows = tpdata.length;
//   const [vehicleNo, setVehicleNo] = useState("");
//   const formatedDate = (inputDate) => {
//     const date = new Date(inputDate);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${day}/${month}/${year}`;
//   };

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
//     } catch (error) {
//       console.error("Error fetching party names:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPartyNames();
//   }, []);

//   // If the user is not authenticated, redirect to the login page
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate(
//         "/login?message=You need to be authenticated to access this page."
//       );
//     }
//   }, [isAuthenticated, navigate]);

//   const formatDate = (date) => {
//     const formattedDate = new Date(date).toISOString().split("T")[0];
//     return formattedDate;
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     const formattedDate = formatDate(date);

//     // Replace this with your actual API call logic
//     fetch(
//       `http://${ipaddress}import/tpdate?date=${formattedDate}&cid=${companyid}&bid=${branchId}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         // Assuming data is an array containing Transhipment Permit No
//         if (data && data.length > 0) {
//           setResponseData(data); // Update responseData with fetched data
//           console.log("dataaa ", data); // Log the updated data
//         } else {
//           setResponseData([]); // Update responseData to an empty array if no data available
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   const handleTPDateChange = async (date) => {
//     setSelectedDate(date);
//     const formattedDate = formatDate(date);

//     try {
//       const response = await fetch(
//         `http://${ipaddress}import/getalldata?cid=${companyid}&bid=${branchId}&date=${formattedDate}&tpno=${transhipmentPermitNo}`
//       );
//       const data = await response.json();
//       if (data && data.length > 0) {
//         setTpdata(data);
//         console.log("dataaa ", data);
//         console.log(tpdata);
//       } else {
//         setTpdata([]);
//       }

//       setError(null); // Clear the error if data is successfully fetched
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error); // Set the error state if there's an error
//     }
//   };

//   const handleTranshipmentPermitNoChange = (value) => {
//     setTranshipmentPermitNo(value);
//     // handleTPDateChange(selectedDate);
//     setTpdata([]);
//   };

//   const handleShowButtonClick = () => {
//     if (!selectedDate) {
//       // Show an alert if the date is not selected
//       alert("Please select a Transhipment Permit Date.");
//       return;
//     }

//     handleTPDateChange(selectedDate);
//   };

//   const handleResetButtonClick = () => {
//     setSelectedDate(new Date());
//     setTranshipmentPermitNo("");
//     setTpdata([]);
//     setResponseData([]);
//   };

//   const [currentDateTime, setCurrentDateTime] = useState("");

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       const options = {
//         year: "2-digit", // '2-digit' for short year format
//         month: "2-digit", // '2-digit' for leading zeros
//         day: "2-digit", // '2-digit' for leading zeros
//         hour: "2-digit", // '2-digit' for leading zeros
//         minute: "2-digit", // '2-digit' for leading zeros
//       };
//       const formattedDateTime = now.toLocaleString("en-US", options);
//       setCurrentDateTime(formattedDateTime);
//     }, 1000); // Update every second

//     return () => clearInterval(interval);
//   }, []);

//   const [consoles, setConsoles] = useState([]);
//   const [getConsoleId, setGetConsoleId] = useState({});

//   const fetchConsoleNames = async () => {
//     try {
//       const response = await fetch(
//         `http://${ipaddress}externalParty/console/${companyid}/${branchId}`
//       );
//       const data = await response.json();
//       const consoleMap = {};
//       data.forEach((console) => {
//         consoleMap[console.externaluserId] = console.userName;
//       });
//       setGetConsoleId(consoleMap);
//       setConsoles(data);
//     } catch (error) {
//       console.error("Error fetching party names:", error);
//     }
//   };

//   useEffect(() => {
//     fetchConsoleNames();
//   }, []);

//   console.log("date ", currentDateTime);

//   function fetchCompanyName(companyId) {
//     // Make an Axios GET request to retrieve the company name based on companyId
//     return axios
//       .get(`http://${ipaddress}import/findCompanyname/${companyId}`)
//       .then(function (response) {
//         return response.data; // Return the retrieved company name
//       })
//       .catch(function (error) {
//         console.error("Error fetching company name:", error);
//         return ""; // Return an empty string or handle the error as needed
//       });
//   }

//   function fetchBranchName(companyId, branchId) {
//     // Make an Axios GET request to retrieve the branch name based on branchId
//     return axios
//       .get(
//         `http://${ipaddress}import/findBranchName/${companyId}/${branchId}`
//       )
//       .then(function (response) {
//         return response.data; // Return the retrieved branch name
//       })
//       .catch(function (error) {
//         console.error("Error fetching branch name:", error);
//         return ""; // Return an empty string or handle the error as needed
//       });
//   }
//   function fetchPartyName(companyId, branchId, partyId) {
//     // Make an Axios GET request to retrieve the company name based on companyId
//     return axios
//       .get(
//         `http://${ipaddress}import/findPartyName/${companyId}/${branchId}/${partyId}`
//       )
//       .then(function (response) {
//         return response.data; // Return the retrieved company name
//       })
//       .catch(function (error) {
//         console.error("Error fetching company name:", error);
//         return ""; // Return an empty string or handle the error as needed
//       });
//   }
//   const handleXLSDownload = async () => {
//     const modifiedRecordList = await Promise.all(
//       tpdata.map(async (item, index) => {
//         const companyname = await fetchCompanyName(item.companyId);
//         const branchname = await fetchBranchName(item.companyId, item.branchId);
//         const partyName = await fetchPartyName(
//           item.companyId,
//           item.branchId,
//           item.nameOfExporter
//         );
//         return {
//           "Sr.No": index + 1,
//           "Company Name": companyname,
//           "Branch Name": branchname,
//           "SER No": item.serNo,
//           "SER Date": formatedDate(item.serDate),
//           "Parcle Type": " ",
//           "NAME OF THE Exporter ": getpartyId[item.nameOfExporter],
//           "NO OF PKGS": item.noOfPackages,
//           DESC: item.descriptionOfGoods,
//           "VALUE IN RS": item.fobValueInINR,
//           "PORT OF DESTINATION": item.portOfDestination,
//         };
//       })
//     );

//     const distanceRow = {
//       "Sr.No": "",
//       "Company Name": "",
//       "Branch Name": "",
//       "SER NO": "",
//       "SER DATE": "",
//       "PARCEL TYPE": "",
//       "NAME OF THE Exporter ": "",
//       "NO OF PKGS": "",
//       DESC: "",
//       "VALUE IN RS": "",
//       "PORT OF DESTINATION": "",
//     };

//     const workbook = XLSX.utils.book_new();
//     const worksheet = XLSX.utils.json_to_sheet([...modifiedRecordList]);

//     // Add headers for all fields
//     const headers = Object.keys(modifiedRecordList[0]);
//     headers.forEach((header, index) => {
//       worksheet[XLSX.utils.encode_cell({ r: 0, c: index })] = {
//         t: "s",
//         v: header,
//         s: { font: { bold: true } },
//       };
//     });

//     // Set column widths based on data
//     const colWidths = headers.map((header) => ({
//       wch: header.length + 2, // You can adjust the width as needed
//     }));

//     worksheet["!cols"] = colWidths;

//     XLSX.utils.book_append_sheet(workbook, worksheet, "Export_Tp");
//     const xlsFile = XLSX.write(workbook, { type: "binary", bookType: "xls" });
//     const blob = new Blob([s2ab(xlsFile)], {
//       type: "application/vnd.ms-excel",
//     });

//     saveAs(blob, "Export_Tp.xls");
//   };
//   const s2ab = (s) => {
//     const buf = new ArrayBuffer(s.length);
//     const view = new Uint8Array(buf);
//     for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
//     return buf;
//   };
 

//   const PAGE_BREAK_ROWS_PDF = 11;
//   const handlePDFDownload = async () => {
//     const pdfBlob = await pdf(
//       <MyPDFDocument {...{ totalNoOfPackages, tpdata }} />
//     ).toBlob();
//     saveAs(pdfBlob, "Import_Register.pdf");
//   };

//   const handlePDFDisplay = async () => {
//     const pdfBlob = await pdf(
//       <MyPDFDocument {...{ totalNoOfPackages, tpdata }} />
//     ).toBlob();
  
//     const pdfUrl = URL.createObjectURL(pdfBlob);
  
//     // Open a new window/tab and load the PDF content
//     const newWindow = window.open(pdfUrl, '_blank');
//     if (newWindow) {
//       newWindow.document.write('<iframe width="100%" height="100%" src="' + pdfUrl + '"></iframe>');
//     } else {
//       alert('Pop-up blocked. Please allow pop-ups for this site to view the PDF.');
//     }
//   };






//   const MyPDFDocument = ({ totalNoOfPackages, tpdata }) => (
//     <Document>
//       {Array.from({
//         length: Math.ceil(tpdata.length / PAGE_BREAK_ROWS_PDF),
//       }).map((_, pageIndex) => (
//         <Page size="A4" orientation="landscape" style={{ ...styles.page }}>
//           <View style={styles.hr}></View>
//           <View style={[styles.centeredText, { fontWeight: "bold" }]}>
//             <Text style={[styles.centeredText, { fontWeight: "bold" }]}>
//               Import Register
//             </Text>
//           </View>

//           <View>
//             <Text style={[styles.centeredText, { fontSize: 10 }]}>
//               Transhipment Permit No. : {formatTpNo(tpdata[0].tpNo)}
//               {"\n"}
//             </Text>
//           </View>
//           <View
//             style={{ flexDirection: "row", paddingTop: 9, paddingBottom: 5 }}
//           >
//             <View style={{ width: "20%" }}>
//               <Text style={{ fontSize: 9 }}>
//                 Date : {formatedDate(tpdata[0].tpDate)}
//                 {"\n"}
//               </Text>
//               <Text style={{ fontSize: 9 }}>
//                 Page No : {pageIndex + 1}
//                 {"\n"}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.table}>
//             {" "}
//             <View style={styles.tableRow}>
//               <Text style={[styles.tableCell, styles.tableHeader,{width:34} ]}>SR No</Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}>
//                 SIR No & Dt
//               </Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}>
//                 CONSOLE
//               </Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}>
//                 IMPORTER
//               </Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}>TP NO</Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}>
//                 PCTM NO
//               </Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}>IGM</Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}>
//                 M.A.W.B NO
//               </Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}>
//                 H.A.W.B NO
//               </Text>
//               <Text style={[styles.tableCell, styles.tableHeader,{width:34}]}>NOP</Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}>
//                 DESC
//               </Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}>
//                 EXAM DATE
//               </Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}>
//                 DELIVERY DATE
//               </Text>
//               <Text
//                 style={[styles.tableHeader, styles.colSpanHeader, {width:70}]}
//                 colSpan={2}
//               >
//                 IDF Cash No & Date
//               </Text>
//               <Text
//                 style={[styles.tableHeader, styles.colSpanHeader, {width:70}]}
//                 colSpan={2}
//               >
//                 Signature of Importer With Date
//               </Text>
//               <Text
//                 style={[styles.tableHeader, styles.colSpanHeader, {width:69}]}
//                 colSpan={2}
//               >
//                 Signature of D.G.D.C
//               </Text>
//             </View>
//             <View style={styles.tableRow}>
//               <Text style={[styles.tableCell, styles.tableHeader,{width:34}]}></Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}></Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}></Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}></Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}></Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}></Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}></Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}></Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}></Text>
//               <Text style={[styles.tableCell, styles.tableHeader,{width:34}]}></Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}></Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}></Text>
//               <Text style={[styles.tableCell, styles.tableHeader]}></Text>
//               <Text
//                 style={[styles.tableHeader, styles.colSpanHeader, { width: 35 }]}
//               >
//                 {" "}
//                 Cash No{" "}
//               </Text>
//               <Text
//                 style={[styles.tableHeader, styles.colSpanHeader, { width: 35 }]}
//               >
//                 {" "}
//                 Date
//               </Text>
//               <Text
//                 style={[styles.tableHeader, styles.colSpanHeader, { width: 35 }]}
//               >
//                 Sign
//               </Text>
//               <Text
//                 style={[styles.tableHeader, styles.colSpanHeader, { width: 35 }]}
//               >
//                 {" "}
//                 Date
//               </Text>
//               <Text
//                 style={[styles.tableHeader, styles.colSpanHeader, { width: 35 }]}
//               >
//                 Sign
//               </Text>
//               <Text
//                 style={[styles.tableHeader, styles.colSpanHeader, { width: 34 }]}
//               >
//                 {" "}
//                 Date
//               </Text>
//             </View>
//             {tpdata
//               .slice(
//                 pageIndex * PAGE_BREAK_ROWS_PDF,
//                 (pageIndex + 1) * PAGE_BREAK_ROWS_PDF
//               )
//               .map((item, index) => (
//                 <View style={styles.tableRow} key={index}>
//                   <Text style={{ ...styles.tableCell,width:34}}>
//                     {index + 1 + pageIndex * PAGE_BREAK_ROWS_PDF}
//                   </Text>
//                   <Text style={{ ...styles.tableCell }}>{item.sirNo && item.doNumber
//                             ? `${item.sirNo} | ${item.doNumber}`
//                             : ""}</Text>
//                   <Text style={{ ...styles.tableCell }}>
//                     {getConsoleId[item.consoleName]}
//                   </Text>
//                   <Text style={{ ...styles.tableCell }}>
//                     {getpartyId[item.importerId]}
//                   </Text>
//                   <Text style={{ ...styles.tableCell }}>
//                     {formatTpNo(item.tpNo)}
//                   </Text>
//                   <Text style={{ ...styles.tableCell }}>
//                     {formatPctmNO(item.pctmNo)}
//                   </Text>
//                   <Text style={{ ...styles.tableCell }}>
//                     {item.igmNo}
//                   </Text>
//                   <Text style={{ ...styles.tableCell }}>
//                     {item.mawb}
//                   </Text>
//                   <Text style={{ ...styles.tableCell }}>
//                     {item.hawb}
//                   </Text>
//                   <Text style={{ ...styles.tableCell ,width:34 }}>
//                     {item.nop}
//                   </Text>
//                   <Text style={{ ...styles.tableCell }}>
//                     {item.descriptionOfGoods}
//                   </Text>
//                   <Text style={[styles.tableCell]}></Text>
//                   <Text style={[styles.tableCell]}></Text>
//                   <Text style={[styles.tableCell, { width: 35 }]}></Text>
//                   <Text style={[styles.tableCell, { width: 35 }]}></Text>
//                   <Text style={[styles.tableCell, { width: 35 }]}></Text>
//                   <Text style={[styles.tableCell, { width: 35 }]}></Text>
//                   <Text style={[styles.tableCell, { width: 35 }]}></Text>
//                   <Text style={[styles.tableCell, { width: 34 }]}></Text>
//                 </View>
//               ))}
//           </View>

//           {/* Display the "Total" row only on the last page */}
//           {pageIndex === Math.ceil(tpdata.length / PAGE_BREAK_ROWS_PDF) - 1 && (
//             <View style={styles.tableRow}>
//               <Text style={{ ...styles.tableCell, width:34 }}>Total</Text>
//               <Text style={{ ...styles.tableCell }}></Text>
//               <Text style={[styles.tableCell, styles.tableCellHeader]}></Text>
//               <Text style={{ ...styles.tableCell }}></Text>

//               <Text style={{ ...styles.tableCell }}>
            
//               </Text>

//               <Text style={{ ...styles.tableCell }}></Text>

//               <Text style={{ ...styles.tableCell }}> </Text>
//               <Text style={{ ...styles.tableCell }}></Text>
//               <Text style={{ ...styles.tableCell }}></Text>
//               <Text style={{ ...styles.tableCell,width:34}}>    {totalNoOfPackages} &nbsp;({numberToWords(totalNoOfPackages)})</Text>
//               <Text style={{ ...styles.tableCell }}></Text>
//               <Text style={{ ...styles.tableCell }}></Text>
//               <Text style={{ ...styles.tableCell }}></Text>
//               <Text style={[styles.tableCell, { width: 35 }]}></Text>
//                   <Text style={[styles.tableCell, { width: 35 }]}></Text>
//                   <Text style={[styles.tableCell, { width: 35 }]}></Text>
//                   <Text style={[styles.tableCell, { width: 35 }]}></Text>
//                   <Text style={[styles.tableCell, { width: 35 }]}></Text>
//                   <Text style={[styles.tableCell, { width: 34 }]}></Text>
//             </View>
//           )}
// {/* 
//           <View>
//             <Text style={styles.rightText}>
//               {"\n\n"}(Signature of Custodian)
//             </Text>
//           </View> */}
//         </Page>
//       ))}
//     </Document>
//   );
//   const handlePrint = () => {
//     const dgdc1 = dgdcImage;
//     // Create an Image object to preload the image
//     const image = new Image();
//     image.src = dgdc1;

//     // Add an onload event handler to execute the print code when the image is loaded
//     image.onload = () => {
//       handlePrintcode(dgdc1);
//     };
//   };

//   const handlePrintcode = (dgdc) => {
//     const isoDate = new Date().toISOString();
//     const date = new Date(isoDate);
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based, so we add 1.
//     const year = date.getFullYear().toString();

//     const printWindow = window.open("", "_blank");
//     printWindow.document.open();

//     const recordsPerPage = 100;
//     const totalRecords = tpdata.length;

//     for (
//       let pageIndex = 0;
//       pageIndex < Math.ceil(totalRecords / recordsPerPage);
//       pageIndex++
//     ) {
//       printWindow.document.write(`
//     <!DOCTYPE html>
//     <html>
//     <head>    
//     <title>Import_Register_Report</title>

//         <style>
//         @page {
//           margin:0.5cm;
//            /* Adjust this value to position the header correctly */
//       }

//       .printable-area {
//           font-family: Arial, sans-serif;
//           page-break-before: always;
//       }

//       table {
//           width: 100%;
//           border-collapse: collapse;
//       }

//       td {
//           border: 1px solid #dddddd;
//           text-align: center;
//           padding: 9px;
//           font-size: 10px;
//       }

//       th {
//         border: 1px solid #dddddd;
//           background-color: #f2f2f2;
//           text-align: center;
//           font-size: 12px;
//       }
//       .container {
//         display: flex;
//         justify-content: space-between;
//     }
//     .left-column {
//         width: 70%; /* Adjust the width as needed */
//     }
//     .page-break {
//       page-break-before: always; /* This will force a page break before the element */
//     }
//     .right-column {
//         width: 30%; /* Adjust the width as needed */
//         text-align: right; /* Align text to the right */
//     }
//       .header img {
//           max-width: auto; /* Ensure the image doesn't exceed the page width */
//           max-height: auto; /* Adjust the maximum image height as needed */
//       }

//       #page-header {
//           position: static;
//           top: 0;
//           left: 0;
//           right: 0;
//           text-align: center;
//       }
        
//   </style>
//     </head>
//     <body>
//     <div id="page-header">
  
//     <div style="text-align: center;">
//     <div style="font-size: 14px; font-weight:bold;">Import Register</br>
//      Transhipment permit No.:${formatTpNo(tpdata[0].tpNo)}</div>
//     </div>
// </div>

//     <div class="content">
//     <div class="container">
//     <div class="right-column" style="font-weight: bold; font-size: 12px; display: flex; justify-content: space-between;">
//     <span style="padding-bottom: 18px;">For Period: ${formatedDate(
//       tpdata[0].tpDate
//     )} To ${formatedDate(tpdata[0].tpDate)}</span>
//     Page No: ${pageIndex + 1}
// </div>
//   </div>
//         <table style="padding-top: 5px;">
//             <thead>
//                 <tr>
//                 <th style={{ backgroundColor: "#BADDDA" }}>SR No</th>
//                 <th style={{ backgroundColor: "#BADDDA" }} >
//                   SIR No & Dt
//                 </th>
//                 <th style={{ backgroundColor: "#BADDDA" }}>CONSOLE</th>
//                 <th style={{ backgroundColor: "#BADDDA" }}>IMPORTER NAME</th>
//                 <th style={{ backgroundColor: "#BADDDA" }}>TP NO</th>
//                 <th style={{ backgroundColor: "#BADDDA" }}>PCTM NO</th>
//                 <th style={{ backgroundColor: "#BADDDA" }}>IGM</th>
//                 <th style={{ backgroundColor: "#BADDDA" }}>M.A.W.B NO</th>
//                 <th style={{ backgroundColor: "#BADDDA" }}>H.A.W.B NO</th>
//                 <th style={{ backgroundColor: "#BADDDA" }}>NOP</th>
//                 <th style={{ backgroundColor: "#BADDDA" }}>
//                  DESC
//                 </th>
//                 <th style={{ backgroundColor: "#BADDDA" }}>EXAM DATE</th>
//                 <th style={{ backgroundColor: "#BADDDA" }}>
//                   DELIVARY DATE
//                 </th>
//                 <th style="width:14%;font-size: 12px;" colspan="2">
//                  IDF CASH NO & DATE 
//                 </th>
//                 <th style="width:14%;font-size: 12px;" colspan="2">
//                 SIGNATURE OF IMPORTER WITH DATE
//                 </th>
//                 <th style="width:14%;font-size: 12px;" colspan="2">
//                 SIGNATURE OF D.G.D.C
//                 </th>
//                 </tr>

//                 <thead>
//                 <tr>
//                   <th></th>
//                   <th></th>
//                   <th></th>
//                   <th></th>
//                   <th></th>
//                   <th></th>
//                   <th></th>
//                   <th></th>
//                   <th></th>
//                   <th></th>
//                   <th></th>
//                   <th></th>
//                   <th></th>
//                   <th style="font-size: 12px;">CASH </th>
//                   <th style="font-size: 12px;">DATE</th>
//                   <th style="font-size: 12px;">SIGN</th>
//                   <th style="font-size: 12px;">DATE</th>
//                   <th style="font-size: 12px;">NAME</th>
//                   <th style="font-size: 12px;">SIGN</th>
//                 </tr>
//               </thead>
//             </thead>
//             <tbody>
//                 ${tpdata
//                   .slice(
//                     pageIndex * recordsPerPage,
//                     (pageIndex + 1) * recordsPerPage
//                   )
//                   .map(
//                     (item, index) => `
//                     <td>${index + 1}</td>

//                     <td>
//                     ${
//                       item.sirNo && item.doNumber
//                         ? `<strong>${item.sirNo}</strong> | ${item.doNumber}`
//                         : ""
//                     }
//                   </td>

//                     <td>${getConsoleId[item.consoleName]}</td>
//                     <td>${getpartyId[item.importerId]}</td>
//                     <td>${formatTpNo(item.tpNo)}</td>
//                     <td>${formatPctmNO(item.pctmNo)}</td>
//                     <td>${item.igmNo}</td>
//                     <td>${item.mawb}</td>
//                     <td>${item.hawb}</td>
//                     <td>${item.nop}</td>
//                     <td>${item.descriptionOfGoods}</td>
//                     <td>${formatedDate(item.doDate)}</td>
//                     <td>${formatedDate(item.doDate)}</td>
//                     <td></td>
//                     <td></td>  
//                     <td></td>
//                     <td></td>  
//                     <td></td>
//                     <td></td> 
//                       </tr>
//                   `
//                   )
//                   .join("")}
                
//                 <tr>
//                     <td class="bold-text">Total</td>
//                     <td class="bold-text"></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td class="bold-text"></td>
//                     <td></td>
//                     <td></td>  
//                     <td></td>  
//                     <td>${totalNoOfPackages} &nbsp;(${numberToWords(
//         totalNoOfPackages
//       )})</td>
//                     <td></td>
//                     <td></td>
//                     <td></td>  
//                     <td></td>
//                     <td></td>  
//                     <td></td>
//                     <td></td>  
//                     <td></td>
//                     <td></td>  
                   
                    
//                 </tr>
//                 </tbody>
//                 </table>
//             </div>
//             <div>
//             </div>
//         </body>
//         </html>
//     `);

//       if (pageIndex < Math.ceil(totalRecords / recordsPerPage) - 1) {
//         printWindow.document.write('<div class="printable-area"></div>');
//       }
//     }

//     printWindow.document.close();
//     printWindow.print();
//     printWindow.onafterprint = () => printWindow.close();
//   };
//   function numberToWords(number) {
//     const words = [
//       "",
//       "One",
//       "Two",
//       "Three",
//       "Four",
//       "Five",
//       "Six",
//       "Seven",
//       "Eight",
//       "Nine",
//       "Ten",
//       "Eleven",
//       "Twelve",
//       "Thirteen",
//       "Fourteen",
//       "Fifteen",
//       "Sixteen",
//       "Seventeen",
//       "Eighteen",
//       "Nineteen",
//     ];

//     const tensWords = [
//       "",
//       "",
//       "Twenty",
//       "Thirty",
//       "Forty",
//       "Fifty",
//       "Sixty",
//       "Seventy",
//       "Eighty",
//       "Ninety",
//     ];

//     if (number === 0) return "Zero";

//     if (number < 20) {
//       return words[number];
//     }

//     if (number < 100) {
//       const tens = Math.floor(number / 10);
//       const remainder = number % 10;
//       return tensWords[tens] + (remainder ? ` ${words[remainder]}` : "");
//     }

//     if (number < 1000) {
//       const hundreds = Math.floor(number / 100);
//       const remainder = number % 100;
//       return (
//         words[hundreds] +
//         " Hundred" +
//         (remainder ? ` ${numberToWords(remainder)}` : "")
//       );
//     }

//     if (number < 1000000) {
//       const thousands = Math.floor(number / 1000);
//       const remainder = number % 1000;
//       return (
//         numberToWords(thousands) +
//         " Thousand" +
//         (remainder ? ` ${numberToWords(remainder)}` : "")
//       );
//     }

//     if (number < 10000000) {
//       const millions = Math.floor(number / 1000000);
//       const remainder = number % 1000000;
//       return (
//         numberToWords(millions) +
//         " Million" +
//         (remainder ? ` ${numberToWords(remainder)}` : "")
//       );
//     }

//     return "Number is too large to convert";
//   }

//   // Example usage:
//   console.log(numberToWords(10000000)); // Outputs: "Ten Million"

//   function getCurrentDateTimeFormatted() {
//     const currentDate = new Date();

//     const day = currentDate.getDate();
//     const month = currentDate.getMonth() + 1;
//     const year = currentDate.getFullYear() % 100; // Get the last two digits of the year
//     const hours = currentDate.getHours();
//     const minutes = currentDate.getMinutes();

//     const period = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12; // Convert to 12-hour format
//     const formattedMinutes = String(minutes).padStart(2, "0");

//     const formattedDateTime = `${month}/${day}/${year}, ${formattedHours}:${formattedMinutes} ${period}`;

//     return formattedDateTime;
//   }

//   const [pdfBlob, setPdfBlob] = useState(null);

//   const [totalNoOfPackages, setTotalNoOfPackages] = useState(0);
//   const [totalFobValueInINR, setTotalFobValueInINR] = useState(0);

//   // Calculate totals when the tpdata changes
//   useEffect(() => {
//     let packagesTotal = 0;
//     let fobValueTotal = 0;

//     tpdata.forEach((item) => {
//       packagesTotal += item.nop;
//       fobValueTotal += item.fobValueInINR;
//     });

//     setTotalNoOfPackages(packagesTotal);
//     setTotalFobValueInINR(fobValueTotal);
//   }, [tpdata]);


//   const formatDateTime2 = (value) => {
//     if (!value) {
//       return "";
//     }
//     const date = new Date(value);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");
//     return `${day}/${month}/${year} `;
//   };

//   const getExcel = (imp) => {
//     const filename = `Import_Register_${formatDateTime2(new Date())}.xlsx`; // Note: Changed file extension to xlsx
//     axios.post(`http://${ipaddress}import/register1excel`, imp, { responseType: 'blob' }) // Added responseType: 'blob'
//       .then(async (response) => {
//         const blob = new Blob([response.data], { type: response.headers['content-type'] });
  
//         // Create a temporary URL for the blob
//         const url = window.URL.createObjectURL(blob);
  
//         // Create a link element to trigger the download
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = filename;
//         document.body.appendChild(a);
//         a.click();
  
//         // Clean up
//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//       })
//       .catch((error) => {
//         toast.error("Something went wrong", {
//           autoClose: 700
//         });
//       });
//   };

//   return (
//     <div className="Container">
//       <h5
//         className="pageHead"
//         style={{
//           fontFamily: "Your-Heading-Font",
//           paddingLeft: "2%",
//           paddingRight: "-20px",
//         }}
//       >
//         {" "}
//         <FontAwesomeIcon
//           icon={faFileArrowUp}
//           style={{
//             marginRight: "8px",
//             color: "black", // Set the color to golden
//           }}
//         />
//         Import Register Report
//       </h5>
//       <Card>
//         <CardBody>
//           <Form>
//             <Row>
//               <Col md={3}>
//                 <Form.Group>
//                   <Form.Label className="forlabel">
//                     Transhipment Permit Date
//                   </Form.Label>

//                   <DatePicker
//                     selected={selectedDate}
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     onChange={handleDateChange}
//                     value={selectedDate}
//                     dateFormat="dd/MM/yyyy"
//                     className="form-control"
//                     customInput={<input style={{ width: "100%" }} />}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={3}>
//                 <Form.Group>
//                   <Form.Label className="forlabel">
//                     Transhipment Permit No
//                   </Form.Label>
//                   <select
//                     name="company"
//                     className="form-select"
//                     value={transhipmentPermitNo}
//                     onChange={(e) =>
//                       handleTranshipmentPermitNoChange(e.target.value)
//                     }
//                   >
//                     {responseData.length > 0 && <option>Select</option>}
//                     {responseData.length > 0 &&
//                       responseData.map((item) => {
//                         // Remove leading zeros and display the number
//                         const formattedTpNo = item.replace(/^0+/, ""); // Removes leading zeros
//                         return (
//                           <option key={item} value={item}>
//                             {formattedTpNo}
//                           </option>
//                         );
//                       })}
//                   </select>
//                 </Form.Group>
//               </Col>
//               <Col
//                 md={3}
//                 className="d-flex justify-content-center align-items-center"
//               >
//                 <div style={{ marginTop: 18 }}>
//                   <Button
//                     onClick={handleShowButtonClick}
//                     variant="outline-primary"
//                     style={{ marginRight: 20 }}
//                   >
//                     <FontAwesomeIcon
//                       icon={faArrowsToEye}
//                       style={{ marginRight: "5px" }}
//                     />
//                     Show
//                   </Button>
//                   <Button
//                     onClick={handleResetButtonClick}
//                     variant="outline-danger"
//                   >
//                     <FontAwesomeIcon
//                       icon={faSyncAlt}
//                       style={{ marginRight: "5px" }}
//                     />
//                     Reset
//                   </Button>
//                 </div>
//               </Col>
//             </Row>
//           </Form>
//           <hr />
//           <handlePDFDownload2 tpdata={tpdata} />

//           <div hidden={!tpdata.length > 0}>
//             <Row>
//               <div style={{ float: "right", marginBottom: 9 }}>
//                 <button
//                   style={{ marginLeft: 9 }}
//                   className="btn btn-outline-danger btn-margin"
//                   type="button"
//                   onClick={handlePDFDisplay}
//                 >
//                   <FontAwesomeIcon
//                     icon={faPrint}
//                     style={{ marginRight: "5px" }}
//                   />
//                   Print
//                 </button>
//                 <button
//                   className="btn btn-outline-danger btn-margin"
//                   type="button"
//                   onClick={handlePDFDownload}
//                   style={{ marginLeft: "10px" }}
//                 >
//                   <FontAwesomeIcon
//                     icon={faFilePdf}
//                     style={{ marginRight: "5px" }}
//                   />
//                   PDF
//                 </button>
//                 <button
//                   className="btn btn-outline-danger btn-margin"
//                   type="button"
//                   style={{ marginLeft: "10px", marginRight: 9 }}
//                   onClick={()=>getExcel(tpdata)}
//                 >
//                   <FontAwesomeIcon
//                     icon={faFileExcel}
//                     style={{ marginRight: "5px" }}
//                   />
//                   XLS
//                 </button>
//               </div>
//             </Row>

//             <CardBody>
//               <div className="table-responsive">
//                 <Table className="table table-striped table-hover">
//                   <thead>
//                     <tr>
//                       <th style={{ backgroundColor: "#BADDDA" }}>SR No</th>
//                       <th style={{ backgroundColor: "#BADDDA" }}>
//                         SIR No & Dt
//                       </th>
//                       <th style={{ backgroundColor: "#BADDDA" }}>CONSOLE</th>
//                       <th style={{ backgroundColor: "#BADDDA" }}>IMPORTER</th>
//                       <th style={{ backgroundColor: "#BADDDA" }}>TP NO</th>
//                       <th style={{ backgroundColor: "#BADDDA" }}>PCTM NO</th>
//                       <th style={{ backgroundColor: "#BADDDA" }}>IGM</th>
//                       <th style={{ backgroundColor: "#BADDDA" }}>M.A.W.B NO</th>
//                       <th style={{ backgroundColor: "#BADDDA" }}>H.A.W.B NO</th>
//                       <th style={{ backgroundColor: "#BADDDA" }}>NOP</th>
//                       <th style={{ backgroundColor: "#BADDDA" }}>
//                         Description
//                       </th>
//                       <th style={{ backgroundColor: "#BADDDA" }}>EXAM DATE</th>
//                       <th style={{ backgroundColor: "#BADDDA" }}>
//                         DELIVARY DATE
//                       </th>
//                     </tr>
//                   </thead>
//                   <thead>
//                     <tr>
//                       <th style={{ backgroundColor: "#BADDDA" }}>Total</th>
//                       <th style={{ backgroundColor: "#BADDDA" }}> </th>
//                       <th style={{ backgroundColor: "#BADDDA" }}> </th>
//                       <th style={{ backgroundColor: "#BADDDA" }}> </th>
//                       <th style={{ backgroundColor: "#BADDDA" }}> </th>
//                       <th style={{ backgroundColor: "#BADDDA" }}> </th>
//                       <th style={{ backgroundColor: "#BADDDA" }}></th>
//                       <th style={{ backgroundColor: "#BADDDA" }}></th>
//                       <th style={{ backgroundColor: "#BADDDA" }}></th>
//                       <th style={{ backgroundColor: "#BADDDA" }}>
//                         {totalNoOfPackages}
//                       </th>
//                       <th style={{ backgroundColor: "#BADDDA" }}></th>
//                       <th style={{ backgroundColor: "#BADDDA" }}></th>
//                       <th style={{ backgroundColor: "#BADDDA" }}></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {tpdata.map((item, index) => (
//                       <tr key={index}>
//                         <td>{index + 1}</td>

//                         <td>
//                           {item.sirNo && item.doNumber
//                             ? `${item.sirNo} | ${item.doNumber}`
//                             : ""}
//                         </td>

//                         <td>{getConsoleId[item.consoleName]}</td>
//                         <td>{getpartyId[item.importerId]}</td>
//                         <td>{formatTpNo(item.tpNo)}</td>
//                         <td>{formatPctmNO(item.pctmNo)}</td>
//                         <td>{item.igmNo}</td>
//                         <td>{item.mawb}</td>
//                         <td>{item.hawb}</td>
//                         <td>{item.nop}</td>
//                         <td>{item.descriptionOfGoods}</td>
//                         <td>{formatedDate(item.doDate)}</td>
//                         <td>{formatedDate(item.doDate)}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>
//             </CardBody>

//             <div style={{ display: "flex" }}>
//               <div style={{ flex: "25%", padding: "10px" }}>
//                 <strong>Total No of Packages:</strong> {totalNoOfPackages}
//               </div>
//               <div style={{ flex: "25%", padding: "10px" }}>
//                 <strong>Total Value Rs.=:</strong> {totalFobValueInINR}
//               </div>
//             </div>
//           </div>
//         </CardBody>
//       </Card>
//     </div>
//   );
// }

import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext, useRef } from "react";
import "../Components/Style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ipaddress from "../Components/IpAddress";
import Card from "react-bootstrap/Card";
import { CardBody, Input } from "reactstrap";
import DGDCimage from "../Images/DGDC.png";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import axios from "axios";
import dgdcImage from "../Images/report.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import {
  faArrowsToEye,
  faBorderAll,
  faEye,
  faFileArrowUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCheck,
  faSave,
  faTimes,
  faSyncAlt,
  faFileExcel,
  faFilePdf,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import { Line, pdf, PDFDownloadLink } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image as MyImage,
} from "@react-pdf/renderer";
import { BlobProvider } from "@react-pdf/renderer";
import { data } from "jquery";
import InviceService from "../services/InviceService";

const styles = StyleSheet.create({
  page: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 18,
  },
  header: {
    marginBottom: 5,
  },
  heading: {
    fontSize: 9,
    marginBottom: 0,
    fontWeight: "bold",
    alignItems: "center",
    height : 20
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 4,
  },
  centeredText: {
    fontSize: 13,
    textAlign: "center", // Center text horizontally
  },
  leftColumn: {
    width: "100%",
    paddingTop: 9,
  },
  headingwithbox: {
    fontSize: 9,
    marginBottom: 0,
    fontWeight: "bold",
    alignItems: "center",

    // Add padding for space between text and border
  },
  headerText: {
    fontSize: 9,
    fontWeight: "bold",
  },
  viewheadingwithbox: {
    border: "1px solid black",
    padding: 5,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 5,
  },
  headingwithborder: {
    fontSize: 9,
    marginBottom: 0,
    fontWeight: "bold",
    alignItems: "center",
    borderBottom: "1px solid black",
    // Add padding for space between text and border
  },
  image: {
    width: 306,
    height: 100,
    marginLeft: 117,
    justifyContent: "center",
  },
  dateSize: {
    fontSize: 8,
  },
  normaltext: {
    fontSize: 9,
    marginTop: 4,
    fontWeight: "bold",
  },
  line: {
    width: "100%", // Adjust the width of the line
    marginTop: 10, // Adjust the space above the line
    marginBottom: 10, // Adjust the space below the line
    borderTop: "1pt solid black", // Style the line
  },
  rightText: {
    fontSize: 9,
    textAlign: "left", // Center text horizontally
    paddingTop: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.4,
    borderBottomColor: "black",
    fontSize: 9,
    borderRightWidth: 0.4,
    borderLeftWidth: 0.4,
    borderLeftColor: "black",
    borderRightColor: "black",
    flexWrap: "wrap",
  },
  tableCell: {
    border: "0.4px solid black",
    padding: 2,
    fontSize: 7,
    flexWrap: "wrap",
    width: 48,
    textAlign: "center",
  },
  tableHeader: {
    fontWeight: "bold",
    width: 48,
    fontSize: 9,
    textAlign: "center",
    border: "0.4px solid black",
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Import_Register_1() {
  const navigate = useNavigate();

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



  const printGetPass = async (type) => {

    const dataToSend = {
      companyid,
      branchId,
      selectedDate,
      transhipmentPermitNo  
    };
    try {

        const response = await InviceService.getImportRegisterPrint(dataToSend);


        if (type === 'PDF') {
            const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

            // Create a Blob from the Base64 data
            const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

            // Create a URL for the Blob
            const blobUrl = URL.createObjectURL(pdfBlob);

            // Create an anchor element for downloading
            const downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = 'Import_Register.pdf'; // Set the filename for the downloaded PDF
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            // Trigger the download
            downloadLink.click();
            // Clean up
            document.body.removeChild(downloadLink);
            window.URL.revokeObjectURL(blobUrl);

            toast.success("Downloading Pdf!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 800,
            });

        } if (type === 'PRINT') {
            // If the response is HTML, open a new window to display the HTML content
            const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

            // Create a Blob from the Base64 data
            const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

            // Create an object URL for the Blob
            const blobUrl = URL.createObjectURL(pdfBlob);

            // Open a new window and set the PDF content as the source
            window.open(blobUrl, '_blank');
        }
    } catch (error) {
        // Handle errors
        console.error('Error handling response:', error);
    };
};





















  
  const formatTpNo = (tpNo) => {
    // Remove leading zeros using a regular expression
    return tpNo.replace(/^0+/, "");
  };

  const formatPctmNO = (pctmNo) => {
    // Remove leading zeros using a regular expression
    return pctmNo.replace(/^0+/, "");
  };

  const CustomHeader = () => {
    return (
      <View style={styles.header}>
        <MyImage src={dgdcImage} style={styles.image} />
      </View>
    );
  };
  const today = new Date().toISOString().split("T")[0];

  // State to store selected date
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(new Date());
  // console.log("date2 ", selectedDate);
  const [pdfData, setPdfData] = useState(null);
  // State to store the Transhipment Permit No (replace with actual data)
  const [transhipmentPermitNo, setTranshipmentPermitNo] =
    useState(currentDateString);
  const [generatedPDF, setGeneratedPDF] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [tpdata, setTpdata] = useState([]);
  const [error, setError] = useState(null);

  const totalRows = tpdata.length;
  const [vehicleNo, setVehicleNo] = useState("");
  const formatedDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

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
    } catch (error) {
      console.error("Error fetching party names:", error);
    }
  };

  useEffect(() => {
    fetchPartyNames();
  }, []);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };


  useEffect(() => {
    handleDateChange(new Date());
  }, []);


  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);


    // console.log("Calling with date "+date);

    // Replace this with your actual API call logic
    fetch(
      `http://${ipaddress}import/tpdate?date=${formattedDate}&cid=${companyid}&bid=${branchId}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an array containing Transhipment Permit No
        if (data && data.length > 0) {
          setResponseData(data); // Update responseData with fetched data
          console.log("dataaa ", data); // Log the updated data
        } else {
          setResponseData([]); // Update responseData to an empty array if no data available
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleTPDateChange = async (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);

    try {
      const response = await fetch(
        `http://${ipaddress}import/getalldata?cid=${companyid}&bid=${branchId}&date=${formattedDate}&tpno=${transhipmentPermitNo}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setTpdata(data);
        // console.log("dataaa ", data);
        // console.log(tpdata);
      } else {
        setTpdata([]);
      }

      setError(null); // Clear the error if data is successfully fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error); // Set the error state if there's an error
    }
  };

  const handleTranshipmentPermitNoChange = (value) => {
    setTranshipmentPermitNo(value);
    // handleTPDateChange(selectedDate);
    setTpdata([]);
  };

  const handleShowButtonClick = () => {
    if (!selectedDate) {
      // Show an alert if the date is not selected
      alert("Please select a Transhipment Permit Date.");
      return;
    }

    handleTPDateChange(selectedDate);
  };

  const handleResetButtonClick = () => {
    setSelectedDate(new Date());
    setTranshipmentPermitNo("");
    setTpdata([]);
    setResponseData([]);
    handleDateChange(new Date());
  };

  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options = {
        year: "2-digit", // '2-digit' for short year format
        month: "2-digit", // '2-digit' for leading zeros
        day: "2-digit", // '2-digit' for leading zeros
        hour: "2-digit", // '2-digit' for leading zeros
        minute: "2-digit", // '2-digit' for leading zeros
      };
      const formattedDateTime = now.toLocaleString("en-US", options);
      setCurrentDateTime(formattedDateTime);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const [consoles, setConsoles] = useState([]);
  const [getConsoleId, setGetConsoleId] = useState({});

  const fetchConsoleNames = async () => {
    try {
      const response = await fetch(
        `http://${ipaddress}externalParty/console/${companyid}/${branchId}`
      );
      const data = await response.json();
      const consoleMap = {};
      data.forEach((console) => {
        consoleMap[console.externaluserId] = console.userName;
      });
      setGetConsoleId(consoleMap);
      setConsoles(data);
    } catch (error) {
      console.error("Error fetching party names:", error);
    }
  };

  useEffect(() => {
    fetchConsoleNames();
  }, []);

 
  function fetchCompanyName(companyId) {
    // Make an Axios GET request to retrieve the company name based on companyId
    return axios
      .get(`http://${ipaddress}import/findCompanyname/${companyId}`)
      .then(function (response) {
        return response.data; // Return the retrieved company name
      })
      .catch(function (error) {
        console.error("Error fetching company name:", error);
        return ""; // Return an empty string or handle the error as needed
      });
  }

  function fetchBranchName(companyId, branchId) {
    // Make an Axios GET request to retrieve the branch name based on branchId
    return axios
      .get(
        `http://${ipaddress}import/findBranchName/${companyId}/${branchId}`
      )
      .then(function (response) {
        return response.data; // Return the retrieved branch name
      })
      .catch(function (error) {
        console.error("Error fetching branch name:", error);
        return ""; // Return an empty string or handle the error as needed
      });
  }
  function fetchPartyName(companyId, branchId, partyId) {
    // Make an Axios GET request to retrieve the company name based on companyId
    return axios
      .get(
        `http://${ipaddress}import/findPartyName/${companyId}/${branchId}/${partyId}`
      )
      .then(function (response) {
        return response.data; // Return the retrieved company name
      })
      .catch(function (error) {
        console.error("Error fetching company name:", error);
        return ""; // Return an empty string or handle the error as needed
      });
  }
  
  function numberToWords(number) {
    const words = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    const tensWords = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (number === 0) return "Zero";

    if (number < 20) {
      return words[number];
    }

    if (number < 100) {
      const tens = Math.floor(number / 10);
      const remainder = number % 10;
      return tensWords[tens] + (remainder ? ` ${words[remainder]}` : "");
    }

    if (number < 1000) {
      const hundreds = Math.floor(number / 100);
      const remainder = number % 100;
      return (
        words[hundreds] +
        " Hundred" +
        (remainder ? ` ${numberToWords(remainder)}` : "")
      );
    }

    if (number < 1000000) {
      const thousands = Math.floor(number / 1000);
      const remainder = number % 1000;
      return (
        numberToWords(thousands) +
        " Thousand" +
        (remainder ? ` ${numberToWords(remainder)}` : "")
      );
    }

    if (number < 10000000) {
      const millions = Math.floor(number / 1000000);
      const remainder = number % 1000000;
      return (
        numberToWords(millions) +
        " Million" +
        (remainder ? ` ${numberToWords(remainder)}` : "")
      );
    }

    return "Number is too large to convert";
  }

  // Example usage:
  // console.log(numberToWords(10000000)); // Outputs: "Ten Million"

  function getCurrentDateTimeFormatted() {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear() % 100; // Get the last two digits of the year
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = String(minutes).padStart(2, "0");

    const formattedDateTime = `${month}/${day}/${year}, ${formattedHours}:${formattedMinutes} ${period}`;

    return formattedDateTime;
  }

  const [totalNoOfPackages, setTotalNoOfPackages] = useState(0);
  const [totalFobValueInINR, setTotalFobValueInINR] = useState(0);

  // Calculate totals when the tpdata changes
  useEffect(() => {
    let packagesTotal = 0;
    let fobValueTotal = 0;

    tpdata.forEach((item) => {
      packagesTotal += item.nop;
      fobValueTotal += item.fobValueInINR;
    });

    setTotalNoOfPackages(packagesTotal);
    setTotalFobValueInINR(fobValueTotal);
  }, [tpdata]);


  const formatDateTime2 = (value) => {
    if (!value) {
      return "";
    }
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} `;
  };

  const getExcel = (imp) => {
    const filename = `Import_Register_${formatDateTime2(new Date())}.xlsx`; // Note: Changed file extension to xlsx
    axios.post(`http://${ipaddress}import/register1excel`, imp, { responseType: 'blob' }) // Added responseType: 'blob'
      .then(async (response) => {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
  
        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(blob);
  
        // Create a link element to trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
  
        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        toast.error("Something went wrong", {
          autoClose: 700
        });
      });
  };

  return (
    <div className="Container">
      <h5
        className="pageHead"
        style={{
          fontFamily: "Your-Heading-Font",
          paddingLeft: "2%",
          paddingRight: "-20px",
        }}
      >
        {" "}
        <FontAwesomeIcon
          icon={faFileArrowUp}
          style={{
            marginRight: "8px",
            color: "black", // Set the color to golden
          }}
        />
        Import Register Report
      </h5>
      <Card>
        <CardBody>
          <Form>
            <Row>
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="forlabel">
                    Transhipment Permit Date
                  </Form.Label>

                  <DatePicker
                    selected={selectedDate}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    onChange={handleDateChange}
                    value={selectedDate}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    customInput={<input style={{ width: "100%" }} />}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="forlabel">
                    Transhipment Permit No
                  </Form.Label>
                  <select
                    name="company"
                    className="form-select"
                    value={transhipmentPermitNo}
                    onChange={(e) =>
                      handleTranshipmentPermitNoChange(e.target.value)
                    }
                  >
                    {responseData.length > 0 && <option>Select</option>}
                    {responseData.length > 0 &&
                      responseData.map((item) => {
                        // Remove leading zeros and display the number
                        const formattedTpNo = item.replace(/^0+/, ""); // Removes leading zeros
                        return (
                          <option key={item} value={item}>
                            {formattedTpNo}
                          </option>
                        );
                      })}
                  </select>
                </Form.Group>
              </Col>
              <Col
                md={3}
                className="d-flex justify-content-center align-items-center"
              >
                <div style={{ marginTop: 18 }}>
                  <Button
                    onClick={handleShowButtonClick}
                    variant="outline-primary"
                    style={{ marginRight: 20 }}
                  >
                    <FontAwesomeIcon
                      icon={faArrowsToEye}
                      style={{ marginRight: "5px" }}
                    />
                    Show
                  </Button>
                  <Button
                    onClick={handleResetButtonClick}
                    variant="outline-danger"
                  >
                    <FontAwesomeIcon
                      icon={faSyncAlt}
                      style={{ marginRight: "5px" }}
                    />
                    Reset
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
          <hr />
          <handlePDFDownload2 tpdata={tpdata} />

          <div hidden={!tpdata.length > 0}>
            <Row>
              <div style={{ float: "right", marginBottom: 9 }}>
                <button
                  style={{ marginLeft: 9 }}
                  className="btn btn-outline-danger btn-margin"
                  type="button"
                  onClick={(e)=>printGetPass("PRINT")}
                >
                  <FontAwesomeIcon
                    icon={faPrint}
                    style={{ marginRight: "5px" }}
                  />
                  Print
                </button>
                <button
                  className="btn btn-outline-danger btn-margin"
                  type="button"
                  onClick={(e)=>printGetPass("PDF")}
                  style={{ marginLeft: "10px" }}
                >
                  <FontAwesomeIcon
                    icon={faFilePdf}
                    style={{ marginRight: "5px" }}
                  />
                  PDF
                </button>
                <button
                  className="btn btn-outline-danger btn-margin"
                  type="button"
                  style={{ marginLeft: "10px", marginRight: 9 }}
                  onClick={()=>getExcel(tpdata)}
                >
                  <FontAwesomeIcon
                    icon={faFileExcel}
                    style={{ marginRight: "5px" }}
                  />
                  XLS
                </button>
              </div>
            </Row>

            <CardBody>
              <div className="table-responsive">
                <Table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#BADDDA" }}>SR No</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>
                        SIR No & Dt
                      </th>
                      <th style={{ backgroundColor: "#BADDDA" }}>CONSOLE</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>IMPORTER</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>TP NO</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>PCTM NO</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>IGM</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>M.A.W.B NO</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>H.A.W.B NO</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>NOP</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>
                        Description
                      </th>
                      <th style={{ backgroundColor: "#BADDDA" }}>EXAM DATE</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>
                        DELIVARY DATE
                      </th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#BADDDA" }}>Total</th>
                      <th style={{ backgroundColor: "#BADDDA" }}> </th>
                      <th style={{ backgroundColor: "#BADDDA" }}> </th>
                      <th style={{ backgroundColor: "#BADDDA" }}> </th>
                      <th style={{ backgroundColor: "#BADDDA" }}> </th>
                      <th style={{ backgroundColor: "#BADDDA" }}> </th>
                      <th style={{ backgroundColor: "#BADDDA" }}></th>
                      <th style={{ backgroundColor: "#BADDDA" }}></th>
                      <th style={{ backgroundColor: "#BADDDA" }}></th>
                      <th style={{ backgroundColor: "#BADDDA" }}>
                        {totalNoOfPackages}
                      </th>
                      <th style={{ backgroundColor: "#BADDDA" }}></th>
                      <th style={{ backgroundColor: "#BADDDA" }}></th>
                      <th style={{ backgroundColor: "#BADDDA" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tpdata.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>
                          {item.sirNo && item.doNumber
                            ? `${item.sirNo} | ${item.doNumber}`
                            : ""}
                        </td>

                        <td>{getConsoleId[item.consoleName]}</td>
                        <td>{getpartyId[item.importerId]}</td>
                        <td>{formatTpNo(item.tpNo)}</td>
                        <td>{formatPctmNO(item.pctmNo)}</td>
                        <td>{item.igmNo}</td>
                        <td>{item.mawb}</td>
                        <td>{item.hawb}</td>
                        <td>{item.nop}</td>
                        <td>{item.descriptionOfGoods}</td>
                        <td>{formatedDate(item.doDate)}</td>
                        <td>{formatedDate(item.doDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>

            <div style={{ display: "flex" }}>
              <div style={{ flex: "25%", padding: "10px" }}>
                <strong>Total No of Packages:</strong> {totalNoOfPackages}
              </div>
              <div style={{ flex: "25%", padding: "10px" }}>
                <strong>Total Value Rs.=:</strong> {totalFobValueInINR}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}