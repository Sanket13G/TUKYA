// import AuthContext from "../Components/AuthProvider";
// import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState, useContext } from "react";
// import { Button } from "react-bootstrap";
// import "../Components/Style.css";
// import dgdcImage from "../Images/report.jpeg";

// import DatePicker from "react-datepicker";
// import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import ipaddress from "../Components/IpAddress";
// import {
//   Card,
//   CardBody,
//   Container,
//   Row,
//   Col,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Table,
// } from "reactstrap";
// import Rate_Chart_Service from "../services/Rate_Chart_Service";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
  
//   faSearch,
//   faUserCircle,
  
//   faRefresh,
//   faFilePdf,
 
// } from "@fortawesome/free-solid-svg-icons";

// import {
  
//   faPrint,
 
// } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import { toast } from "react-toastify";


// export default function Party_bill_summary() {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useContext(AuthContext);
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate(
//         "/login?message=You need to be authenticated to access this page."
//       );
//     }
//   }, [isAuthenticated, navigate]);

//   const [startDate, setStartDate] = useState(new Date()); // Default to today's date
//   const [endDate, setEndDate] = useState(new Date()); // Default to today's date
//   const [selectedParty, setSelectedParty] = useState(null); // Define the selectedParty state
//   const [tempParty, settempParty] = useState(null); // Define the selectedParty state
//   const [Invoices, setInvoices] = useState([]); // Define the selectedParty state
//   const [noRecordsFound, setNoRecordsFound] = useState(false); // Add this state variable

//   const formatDateTime = (value) => {
//     if (!value) {
//       return ""; // Return an empty string if value is empty or undefined
//     }

//     const date = new Date(value);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const [parties, setParties] = useState([]);
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

//   useEffect(() => {
//     findParties();
//     fetchData();
//   }, []);
//   const [filterPartyId, setFilterPartyId] = useState(null);
//   const [PartyList, setPartyList] = useState([]);
//   let totalExportNop = 0;
//   let totalExportRate = 0;
//   let totalExportSubNop = 0;
//   let totalExportSubRate = 0;
//   let totalImportNop = 0;
//   let totalImportRate = 0;
//   let totalImportSubNop = 0;
//   let totalImportSubRate = 0;
//   let totalHolidayRate = 0;
//   let totalDemuragesRate = 0;
//   let totalExportSplCartRate = 0;
//   let totalExportHpRate = 0;
//   let totalExportPcRate = 0;
//   let totalExportOcRate = 0;
//   let totalImportSplCartRate = 0;
//   let totalImportHpRate = 0;
//   let totalImportPcRate = 0;
//   let totalImportOcRate = 0;
//   let totalHolidaySubNop = 0;

//   const fetchData = () => {
//     axios
//       .get(`http://${ipaddress}parties/getAll/${companyid}/${branchId}`)
//       .then((response) => {
//         // console.log("Response data received:", response.data);
//         if (Array.isArray(response.data)) {
//           setPartyList(response.data);
//         } else {
//           console.error("Response data is not an array:", response.data);
//         }
//       });
//   };
//   // console.log(PartyList);

//   if (Array.isArray(Invoices) && Invoices.length > 0) {
//     totalExportNop = Invoices.reduce(
//       (sum, invoice) => sum + invoice.exportNoOfPackages,
//       0
//     );
//     totalExportRate = Invoices.reduce(
//       (sum, invoice) => sum + invoice.exportRate,
//       0
//     );
//     totalExportSubNop = Invoices.reduce(
//       (sum, invoice) => sum + invoice.exportSubNop,
//       0
//     );

//     totalExportSubRate = Invoices.reduce(
//       (sum, invoice) => sum + invoice.exportSubRate,
//       0
//     );

//     totalImportNop = Invoices.reduce(
//       (sum, invoice) => sum + invoice.importNoOfPackages,
//       0
//     );
//     totalImportRate = Invoices.reduce(
//       (sum, invoice) => sum + invoice.importRate,
//       0
//     );
//     totalImportSubNop = Invoices.reduce(
//       (sum, invoice) => sum + invoice.importSubNop,
//       0
//     );
//     totalImportSubRate = Invoices.reduce(
//       (sum, invoice) => sum + invoice.importSubRate,
//       0
//     );
//     totalHolidayRate = Invoices.reduce(
//       (sum, invoice) => sum + invoice.holidayRate,
//       0
//     );
//     totalDemuragesRate = Invoices.reduce(
//       (sum, invoice) => sum + invoice.demuragesRate,
//       0
//     );

//     totalExportSplCartRate = Invoices.reduce(
//       (sum, invoice) => sum + invoice.exportScRate,
//       0
//     );
//     totalExportHpRate = Invoices.reduce(
//       (sum, invoice) => sum + invoice.exportHpRate,
//       0
//     );
//     totalExportPcRate = Invoices.reduce(
//       (sum, invoice) => sum + invoice.exportPcRate,
//       0
//     );
//     totalExportOcRate = Invoices.reduce(
//       (sum, invoice) => sum + invoice.exportPenalty,
//       0
//     );

//     totalImportSplCartRate = Invoices.reduce(
//       (sum, invoice) => sum + invoice.importScRate,
//       0
//     );
//     totalImportHpRate = Invoices.reduce(
//       (sum, invoice) => sum + invoice.importHpRate,
//       0
//     );
//     totalImportPcRate = Invoices.reduce(
//       (sum, invoice) => sum + invoice.importPcRate,
//       0
//     );
//     totalImportOcRate = Invoices.reduce(
//       (sum, invoice) => sum + invoice.importPenalty,
//       0
//     );
//     totalHolidaySubNop = Invoices.reduce(
//       (sum, invoice) => sum + invoice.holidaySubNop,
//       0
//     );
//   }
//   function getPartyById(pid) {
//     const party = PartyList.find((party) => party.partyId === pid);
//     // console.log(party);

//     return party; // Return pname or a message if not found
//   }

//   const findParties = async () => {
//     const partyResponse = await Rate_Chart_Service.getAllParties(
//       companyid,
//       branchId
//     );
//     const partyOptions = partyResponse.data.map((party) => ({
//       value: party.partyId,
//       label: party.partyName,
//     }));
//     setParties(partyOptions);
//   };

//   console.log(PartyList);
//   const handlePartySelect = (event) => {
//     const selectedPartyValue = event.target.value;
//     // console.log("Selected Party Value: ", selectedPartyValue);
//     setSelectedParty(selectedPartyValue);
//   };

//   const handleStartDateChange = (date) => {
//     setStartDate(date);
//     // console.log("Selected Start Date: ", date);
//   };

//   const handleEndDateChange = (date) => {
//     setEndDate(date);
//     // console.log("Selected End Date: ", date);
//   };
//   const handleReset = () => {
//     setStartDate(new Date()); // Reset Bill Date From to today's date
//     setEndDate(new Date()); // Reset Bill Date To to today's date
//     setSelectedParty("Select Party"); // Reset selected party to an empty string
//     setInvoices([]);
//     setParties([]);

//     findParties();
//   };
//   const handleSearch = () => {
//     // console.log("Selected Start Date: ", formatDateTime(startDate));
//     // console.log("Selected End Date: ", formatDateTime(endDate));
//     // console.log("Selected Party: ", selectedParty);

//     axios
//       .get(
//         `http://${ipaddress}predictable/list/${companyid}/${branchId}/${startDate}/${endDate}/${selectedParty}`
//       )
//       .then((response) => {
//         console.log("Response data received:", response.data);
//         if (Array.isArray(response.data)) {
//           setInvoices(response.data);
//           setNoRecordsFound(response.data.length === 0);
//         } else {
//           console.error("Response data is not an array:", response.data);
//         }
//       });
//   };

//   let totalIgst = 0;
//   let totalCgst = 0;
//   let totalSgst = 0;

//   Invoices.forEach((invoice, index) => {
//     // console.log(invoice.importNop+"-----"+invoice.partyId);
// console.log("invoice.companyId ",invoice.companyId);
//     if (invoice.companyId == 0) {
//        if(!invoice.branchId.startsWith('B')){
//         totalIgst += parseInt(invoice.branchId);
       
//        }
//        else{
//         totalIgst += 0;
//        }
//       // console.log(`Invoice igst ${index + 1}:`, totalIgst);
//     } else {
//         if(!invoice.branchId.startsWith('B')){
//           totalCgst += invoice.branchId / 2;
//           totalSgst += invoice.branchId / 2;
         
//         }
//         else{
//           totalCgst += 0;
//       totalSgst += 0;
//         }
//       // console.log(`Invoice cgst sgst ${index + 1}:`, totalSgst,totalCgst);
//     }
//   });

//   const handlePdfDownload = async () => {
//     try {
//       const response = await axios.get(
//         `http://${ipaddress}predictable/generatePrint/${companyid}/${branchId}/${startDate}/${endDate}/${selectedParty}`
//       );
//       toast.success("Party Bill Summary PDF Created Successfully ", {
//         position: "top-center",
//         autoClose: 2000,
//       });
//       if (response.status === 200) {
//         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

//         // Create a Blob from the Base64 data
//         const pdfBlob = new Blob(
//           [Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0))],
//           { type: "application/pdf" }
//         );

//         // Create a URL for the Blob
//         const blobUrl = URL.createObjectURL(pdfBlob);

//         // Create an anchor element for downloading
//         const downloadLink = document.createElement("a");
//         downloadLink.href = blobUrl;
//         downloadLink.download = "Party_bill_summary.pdf"; // Set the filename for the downloaded PDF
//         downloadLink.style.display = "none";
//         document.body.appendChild(downloadLink);

//         // Trigger the download
//         downloadLink.click();

//         // Clean up
//         document.body.removeChild(downloadLink);
//         window.URL.revokeObjectURL(blobUrl);

//         toast.success("Downloading Pdf!", {
//           position: toast.POSITION.TOP_CENTER,
//           autoClose: 800,
//         });
//       } else {
//         throw new Error("Failed to generate PDF");
//       }
//     } catch (error) { }
//   };

//   const handlePrint = async () => {
//     try {
//       const response = await axios.get(
//         `http://${ipaddress}predictable/generatePrint/${companyid}/${branchId}/${startDate}/${endDate}/${selectedParty}`
//       );
  
//       if (response.status === 200) {
//         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF
  
//         // Convert Base64 to Uint8Array
//         const uint8Array = Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0));
  
//         // Create a Blob from the Uint8Array data
//         const pdfBlob = new Blob([uint8Array], { type: "application/pdf" });
  
//         // Create a URL for the Blob
//         const blobUrl = URL.createObjectURL(pdfBlob);
  
//         // Open the print dialog for the PDF
//         const printWindow = window.open(blobUrl, "_blank");
//         if (printWindow) {
//           printWindow.onload = () => {
//             // Close the print window after printing
//             printWindow.print();
//             printWindow.onafterprint = () => {
//               printWindow.close();
//             };
//           };
//         } else {
//           console.error("Failed to open a new window for printing.");
//           // Handle the error, show an error message, etc.
//         }
//       } else {
//         console.error("Error downloading PDF:", response.statusText);
//         // Handle other status codes (e.g., error responses) as needed
//       }
//     } catch (error) {
//       console.error("Error downloading PDF:", error);
//       // Handle the error, show an error message, etc.
//     }
//   };
  

//   const handlePrint1 = () => {
//     const dgdc1 = dgdcImage;
//     // Create an Image object to preload the image
//     const image = new Image();
//     image.src = dgdc1;
//     // Add an onload event handler to execute the print code when the image is loaded
//     image.onload = () => {
//       handlePrintcode(dgdc1, startDate, endDate);
//     };
//   };


//   const handlePrintcode = (dgdcImage1, sdate, edate) => {


//     const printWindow = window.open("", "_blank");
//     printWindow.document.open();
//     printWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//       <head>    
//         <title>Bill Summary Report</title>
//         <style>
//           @page {
//             margin: 1cm;
//           }
  
//           .printable-area {
//             font-family: Arial, sans-serif;
//           }
  
//           table {
//             width: 100%;
//             border-collapse: collapse;
//           }
  
//           th, td {
//             border: 1px solid #dddddd;
//             text-align: center;
//             padding: 8px;
//           }
  
//           /* Add CSS to remove spacing around tables and images */
//           table, img {
//             margin: 0;
//             padding: 0;
//             border-spacing: 0;
//             border-collapse: collapse;
//           }
  
//           /* Style for the additional row */
//           .additional-row {
//             background-color: lightgray;
//             font-weight: bold;
//           }
  
//           #page-header {
//             display: flex;
//             justify-content: center; /* Center content horizontally */
//             align-items: center; /* Center content vertically */
//           }
//             table {
//             width: 100%;
//             border-collapse: collapse;
//             border: 1px solid #000; /* Add border to the table */
//           }
    
//           th, td {
//             border: 1px solid #000; /* Add border to table cells */
//             text-align: center;
//             padding: 8px;
//           }
    
//           /* Add CSS to remove spacing around tables and images */
//           table, img {
//             margin: 0;
//             padding: 0;
//             border-spacing: 0;
//             border-collapse: collapse;
//           }
    
    
//         </style>
//       </head>
//       <body>
//     `);

//     printWindow.document.write(`
//       <div id="page-header">
//         <img src="${dgdcImage1}" alt="Header Image" style="max-width: 306px; max-height: 306px;"> 
//       </div>
//       <h4 style="text-align: center; font-size: 24px;">Bill Summary Report</h4>

//     <h3>Start Date:${formatDateTime(sdate)}	End Date: ${formatDateTime(
//       edate
//     )}</h3>  
//       `);

//     printWindow.document.write(` 
//     <table rules="all" class="table border border-primary table-striped table-hover centered-table table-responsive" style="width: 100%;">
//       <thead>
//         <tr className="text-center">
//                 <th rowspan="2" style="background: skyblue; align-items: center;" scope="col" colspan="0">Sr No.</th>
//                 <th style="background: skyblue; align-items: center;" scope="col" colspan="2">
//                   EXP PKGS
//                 </th>
//                 <th style="background: skyblue; align-items: center;" scope="col" colspan="2">
//                   IMP PCKGS
//                 </th>
//                 <th style="background: skyblue; align-items: center;" scope="col" colspan="3"
//                 ></th>
//                 <th style="background: skyblue; align-items: center;" scope="col" colspan="4">
//                   Export Details
//                 </th>
//                 <th style="background: skyblue; align-items: center;" scope="col" colspan="4">
//                   Import Details
//                 </th>
//                 <th style="background: skyblue; align-items: center;" scope="col" colspan="6"></th> 
//               </tr>
//               <tr className="text-center">
//                 <th style="background: skyblue; align-items: center;" >EXP</th>
//                 <th style="background: skyblue; align-items: center;" >SUB</th>
//                 <th style="background: skyblue; align-items: center;" >IMP</th>
//                 <th style="background: skyblue; align-items: center;" > SUB</th>
//                 <th style="background: skyblue; align-items: center;" >TOT PKGS </th>
//                 <th style="background: skyblue; align-items: center;" >IIND SAT</th>
//                 <th style="background: skyblue; align-items: center;" >DEMU</th>
//                 <th style="background: skyblue; align-items: center;" >SC</th>
//                 <th style="background: skyblue; align-items: center;" >HW Wt</th>
//                 <th style="background: skyblue; align-items: center;" >PC</th>
//                 <th style="background: skyblue; align-items: center;" >OC</th>
//                 <th style="background: skyblue; align-items: center;" >SC</th>
//                 <th style="background: skyblue; align-items: center;" >HW Wt</th>
//                 <th style="background: skyblue; align-items: center;" > PC</th>
//                 <th style="background: skyblue; align-items: center;" > OC</th>
//                 <th style="background: skyblue; align-items: center;" >Total Amount</th>
//                 <th style="background: skyblue; align-items: center;" >IGST</th>
//                 <th style="background: skyblue; align-items: center;" >SGST</th>
//                 <th style="background: skyblue; align-items: center;" >CGST</th>
//                 <th style="background: skyblue; align-items: center;" >Grand Total</th>
//               </tr>
//       </thead>
//   `);

//     Invoices.forEach((invoice, index) => {
//       const party = getPartyById(invoice.partyId);

//       printWindow.document.write(`
//     <tr className="text-center">
//     <td rowspan="2">${index + 1}</td>
//       <td colspan="4">${party.erpCode}</td>
//       <td colspan="3">${party.iecNo}</td>
//       <td colspan="4"><strong>${party.partyName
//         }</strong></td> <!-- Add strong tags for bold -->
//       <td colspan="4">${party.email}</td>
//       <td colspan="6">${party.gstNo}</td>
//     </tr>
//   `);
//       printWindow.document.write(`
//     <tr className="text-center">
//     <td>
//     ${invoice.exportNop}
//       <br />
//       ${invoice.exportRate}
//     </td>
//     <td>
//     ${invoice.exportSubNop} <br />
//     ${invoice.exportSubRate}
//     </td>
//     <td>
//     ${invoice.importNop}
//       <br />
//       ${invoice.importRate}
//     </td>
//     <td>
//     ${invoice.importSubNop}
//       <br />
//       ${invoice.importSubRate}
//     </td>
//     <td>
//     ${invoice.exportNop +
//         invoice.importNop +
//         invoice.importSubNop +
//         invoice.exportSubNop
//         }
//       <br />
//       ${invoice.exportRate +
//         invoice.importRate +
//         invoice.importSubRate +
//         invoice.exportSubRate
//         }
//     </td>
//     <td>${invoice.holidayRate}</td>
//     <td>${invoice.demuragesRate}</td>
//     <td>${invoice.exportSplCartRate}</td>
//     <td>${invoice.exportHpRate}</td>
//     <td>${invoice.exportPcRate}</td>
//     <td>${invoice.exportOcRate}</td>
//     <td>${invoice.importSplCartRate}</td>
//     <td>${invoice.importHpRate}</td>
//     <td>${invoice.importPcRate}</td>
//     <td>${invoice.importOcRate}</td>
//     <td>
//     ${invoice.exportRate +
//         invoice.importRate +
//         invoice.importSubRate +
//         invoice.exportSubRate +
//         invoice.holidayRate +
//         invoice.demuragesRate +
//         invoice.exportSplCartRate +
//         invoice.exportHpRate +
//         invoice.exportPcRate +
//         invoice.exportOcRate +
//         invoice.importSplCartRate +
//         invoice.importHpRate +
//         invoice.importPcRate +
//         invoice.importOcRate
//         }
//     </td>
//     ${invoice.importNop === 1
//           ? "<td>" + invoice.holidaySubNop + "</td><td>0</td><td>0</td>"
//           : "<td>0</td><td>" +
//           invoice.holidaySubNop / 2 +
//           "</td><td>" +
//           invoice.holidaySubNop / 2 +
//           "</td>"
//         }

//     <td>
//       ${invoice.exportRate +
//         invoice.importRate +
//         invoice.importSubRate +
//         invoice.exportSubRate +
//         invoice.holidayRate +
//         invoice.demuragesRate +
//         invoice.exportSplCartRate +
//         invoice.exportHpRate +
//         invoice.exportPcRate +
//         invoice.exportOcRate +
//         invoice.importSplCartRate +
//         invoice.importHpRate +
//         invoice.importPcRate +
//         invoice.importOcRate +
//         invoice.holidaySubNop
//         }
//     </td>
//   </tr>
//   `);
//     });

//     printWindow.document.write(`
// <tr class="text-center">
//   <td class="text-center" style="font-weight: bold; font-size: 15px;">
//     Total
//   </td>
//   <td>
//     ${totalExportNop}
//     <br />
//     ${totalExportRate}
//   </td>
//   <td>
//     ${totalExportSubNop}
//     <br />
//     ${totalExportSubRate}
//   </td>
//   <td>
//     ${totalImportNop}
//     <br />
//     ${totalImportRate}
//   </td>
//   <td>
//     ${totalImportSubNop}
//     <br />
//     ${totalImportSubRate}
//   </td>
//   <td>
//     ${totalExportNop + totalImportNop + totalImportSubNop + totalExportSubNop}
//     <br />
//     ${totalExportRate +
//       totalImportRate +
//       totalImportSubRate +
//       totalExportSubRate
//       }
//   </td>
//   <td>${totalHolidayRate}</td>
//   <td>${totalDemuragesRate}</td>
//   <td>${totalExportSplCartRate}</td>
//   <td>${totalExportHpRate}</td>
//   <td>${totalExportPcRate}</td>
//   <td>${totalExportOcRate}</td>
//   <td>${totalImportSplCartRate}</td>
//   <td>${totalImportHpRate}</td>
//   <td>${totalImportPcRate}</td>
//   <td>${totalImportOcRate}</td>
//   <td>
//     ${totalExportRate +
//       totalImportRate +
//       totalImportSubRate +
//       totalExportSubRate +
//       totalHolidayRate +
//       totalDemuragesRate +
//       totalExportSplCartRate +
//       totalExportHpRate +
//       totalExportPcRate +
//       totalExportOcRate +
//       totalImportSplCartRate +
//       totalImportHpRate +
//       totalImportPcRate +
//       totalImportOcRate
//       }
//   </td>
//   <td>${totalIgst}</td>
//   <td>${totalSgst}</td>
//   <td>${totalCgst}</td>
//   <td>
//     ${totalExportRate +
//       totalImportRate +
//       totalImportSubRate +
//       totalExportSubRate +
//       totalHolidayRate +
//       totalDemuragesRate +
//       totalExportSplCartRate +
//       totalExportHpRate +
//       totalExportPcRate +
//       totalExportOcRate +
//       totalImportSplCartRate +
//       totalImportHpRate +
//       totalImportPcRate +
//       totalImportOcRate +
//       totalHolidaySubNop
//       }
//   </td>
// </tr>
// `);

//     printWindow.document.write(`<tr></tr> `);

//     printWindow.document.close();
//     printWindow.print();
//     printWindow.onafterprint = () => printWindow.close();
//   };


//   const sortedInvoices = Invoices.slice().sort((a, b) => {
//     const partyA = getPartyById(a.partyId);
//     const partyB = getPartyById(b.partyId);

//     // Perform null or undefined check before accessing properties
//     const partyAName = partyA ? partyA.partyName : '';
//     const partyBName = partyB ? partyB.partyName : '';

//     return partyAName.localeCompare(partyBName);
// });



//   return (
//     <div className="Container">
//       <h5
//         className="pageHead"
//         style={{
//           fontFamily: "Your-Heading-Font",
//           paddingLeft: "4%",
//           paddingRight: "-50px",
//         }}
//       >
//         <FontAwesomeIcon
//           icon={faUserCircle}
//           style={{
//             marginRight: "8px",
//             color: "black", // Set the color to golden
//           }}
//         />
//         Party Bill Summary Report
//       </h5>

//       <Card>
//         <CardBody>
//           <Row>
//             <Col md={3}>
//               <FormGroup>
//                 <Label className="forlabel" for="branchId">
//                   Bill Date From <span style={{ color: "red" }}>*</span>
//                 </Label>
//                 <div>
//                   <DatePicker
//                     dateFormat="dd/MM/yyyy"
//                     selected={startDate}
//                     onChange={handleStartDateChange}
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     className="form-control border-right-0"
//                     customInput={<input style={{ width: "100%" }} />}
//                   />
//                 </div>
//               </FormGroup>
//             </Col>
//             <Col md={3}>
//               <FormGroup>
//                 <Label className="forlabel" for="branchId">
//                   Bill Date To<span style={{ color: "red" }}>*</span>
//                 </Label>
//                 <div className="input-group">
//                   <DatePicker
//                     dateFormat="dd/MM/yyyy"
//                     selected={endDate}
//                     onChange={handleEndDateChange}
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     className="form-control border-right-0"
//                     customInput={<input style={{ width: "100%" }} />}
//                   />
//                 </div>
//               </FormGroup>
//             </Col>
//             <Col md={3}>
//               <FormGroup>
//                 <Label for="search" className="forlabel">
//                   Select Party
//                 </Label>
//                 <select
//                   id="partySelect"
//                   className="form-control form-select"
//                   required
//                   name="party"
//                   onChange={handlePartySelect}
//                 >
//                   {/* <option  value={tempParty}>Select Party</option> */}
//                   <option value="Select Party">Select Party</option>

//                   {parties.map((party) => (
//                     <option key={party.value} value={party.value}>
//                       {party.label}
//                     </option>
//                   ))}
//                 </select>
//               </FormGroup>
//             </Col>

//             <Col md={3} style={{ marginTop: 22 }}>
//               <Button
//                 type="button"
//                 className=""
//                 variant="outline-primary"
//                 style={{ marginTop: "10px", marginRight: 10 }}
//                 onClick={handleSearch}
//               >
//                 <FontAwesomeIcon
//                   icon={faSearch}
//                   style={{ marginRight: "5px" }}
//                 />
//                 Search
//               </Button>
//               <Button
//                 type="button"
//                 className=""
//                 variant="outline-danger"
//                 style={{ marginTop: "10px" }}
//                 onClick={handleReset}
//               >
//                 <FontAwesomeIcon
//                   icon={faRefresh}
//                   style={{ marginRight: "5px" }}
//                 />
//                 Reset
//               </Button>
//             </Col>
//           </Row>
//         </CardBody>
//       </Card>
//       {noRecordsFound && (
//         <div className="no-records-found text-center">
//           <p style={{ color: 'red' }}>
//             Sorry! No records found
//           </p>
//         </div>
//       )}

//       {Invoices && (      //   <div className="no-records-found text-center">
//         //     <p style={{ color: "red" }}>Sorry! No records found</p>
//         //   </div>
//         // ) : (
//         <Card style={{ marginTop: 30 }}>
//           <CardBody>
//             <Row>
//               <Col className="text-end">
//                 {/* {Invoices && Invoices.length > 0 && (  // Check if Invoices is not null and not empty
//       <> */}
//                 <Button
//                   type="submit"
//                   className=""
//                   style={{ marginRight: 10 }}
//                   variant="outline-success"
//                   onClick={handlePrint}
//                 >
//                   <FontAwesomeIcon
//                     icon={faPrint}
//                     style={{ marginRight: "5px" }}
//                   />
//                   Print
//                 </Button>

//                 <Button
//                   type="button"
//                   className=""
//                   variant="outline-primary"
//                   onClick={handlePdfDownload}
//                 >
//                   <FontAwesomeIcon
//                     icon={faFilePdf}
//                     style={{ marginRight: "5px" }}
//                   />
//                   PDF
//                 </Button>
//                 {/* </>
//               )} */}
//               </Col>
//             </Row>
//             <Table style={{ marginTop: 10 }} striped responsive bordered>
//               <thead>
//                 <tr className="text-center">
//                   <th
//                     rowSpan="1"
//                     style={{ width: "3%", background: "#BADDDA" }}
//                   ></th>
//                   <th
//                     colSpan="2"
//                     style={{ width: "5%", background: "#BADDDA" }}
//                   >
//                     EXPORT PKGS
//                   </th>
//                   <th
//                     colSpan="2"
//                     style={{ width: "5%", background: "#BADDDA" }}
//                   >
//                     IMPORT PCKGS
//                   </th>
//                   <th
//                     colSpan="3"
//                     style={{ width: "5%", background: "#BADDDA" }}
//                   ></th>
//                   <th
//                     colSpan="4"
//                     style={{ width: "5%", background: "#BADDDA" }}
//                   >
//                     EXPORT DETAILS
//                   </th>
//                   <th
//                     colSpan="4"
//                     style={{ width: "5%", background: "#BADDDA" }}
//                   >
//                     IMPORT DETAILS
//                   </th>
//                   <th
//                     colSpan="6"
//                     style={{ width: "5%", background: "#BADDDA" }}
//                   ></th>
//                 </tr>
//                 <tr className="text-center">
//                   <th style={{ background: "#BADDDA" }}>SR.NO</th>

//                   <th style={{ background: "#BADDDA" }}>EXP</th>
//                   <th style={{ background: "#BADDDA" }}>SUB</th>
//                   <th style={{ background: "#BADDDA" }}>IMP</th>
//                   <th style={{ background: "#BADDDA" }}> SUB</th>
//                   <th style={{ background: "#BADDDA" }}>TOT PKGS </th>

//                   <th style={{ background: "#BADDDA" }}>IIND SAT</th>
//                   <th style={{ background: "#BADDDA" }}>DEMURAGES</th>
//                   <th style={{ background: "#BADDDA" }}>SC</th>

//                   <th style={{ background: "#BADDDA" }}>HW WT</th>
//                   <th style={{ background: "#BADDDA" }}>PC</th>

//                   <th style={{ background: "#BADDDA" }}>OC</th>
//                   <th style={{ background: "#BADDDA" }}>SC</th>
//                   <th style={{ background: "#BADDDA" }}>HW WT</th>

//                   <th style={{ background: "#BADDDA" }}> PC</th>
//                   <th style={{ background: "#BADDDA" }}> OC</th>

//                   <th style={{ background: "#BADDDA" }}>TOTAL AMOUNT</th>
//                   <th style={{ background: "#BADDDA" }}>IGST</th>
//                   <th style={{ background: "#BADDDA" }}>SGST</th>
//                   <th style={{ background: "#BADDDA" }}>CGST</th>

//                   <th style={{ background: "#BADDDA" }}>GRAND TOTAL</th>
//                 </tr>
//               </thead>
//               <tbody className="text-center">
//                 {sortedInvoices.length === 0 ? (
//                   <tr>
//                     <td colSpan="21">No invoices available</td>
//                   </tr>
//                 ) : (
//                   <>
//                     {sortedInvoices.map((invoice, index) => {
//                       const party = getPartyById(invoice.partyId); // Replace with your actual function

//                       return (
//                         <React.Fragment key={index}>
//                           <tr>
//                             <td colSpan={3}>
//                               {party ? party.erpCode : "NULL"}
//                             </td>
//                             <td colSpan={2}>
//                               {party ? party.partyId : "Party ID"}
//                             </td>
//                             <td
//                               colSpan={4}
//                               style={{ fontWeight: "bold", fontSize: 17 }}
//                             >
//                               {party ? party.partyName : "Party Name"}
//                             </td>
//                             <td colSpan={7}>
//                               {party ? party.email : "Party Salary"}
//                             </td>
//                             <td colSpan={5}>
//                               {party ? party.gstNo : "Party ID"}
//                             </td>
//                             {/* Other <td> elements here */}
//                           </tr>
//                           <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>
//                               {invoice.exportNoOfPackages}
//                               <br />
//                               {invoice.exportRate}
//                             </td>
//                             <td>
//                               {invoice.exportSubNop} <br />
//                               {invoice.exportSubRate}
//                             </td>
//                             <td>
//                               {invoice.importNoOfPackages}
//                               <br />
//                               {invoice.importRate}
//                             </td>
//                             <td>
//                               {invoice.importSubNop}
//                               <br />
//                               {invoice.importSubRate}
//                             </td>
//                             <td>
//                               {invoice.exportNoOfPackages +
//                                 invoice.importNoOfPackages +
//                                 invoice.importSubNop +
//                                 invoice.exportSubNop}
//                               <br />
//                               {invoice.exportRate +
//                                 invoice.importRate +
//                                 invoice.importSubRate +
//                                 invoice.exportSubRate}
//                             </td>
//                             <td>{invoice.holidayRate}</td>
//                             <td>{invoice.demuragesRate}</td>
//                             <td>{invoice.exportScRate}</td>
//                             {/* <td>{invoice.exportHpNop}</td> */}
//                             <td>{invoice.exportHpRate}</td>
//                             {/* <td>{invoice.exportPcNop}</td> */}
//                             <td>{invoice.exportPcRate}</td>
//                             {/* <td>{invoice.exportOcNop}</td> */}
//                             <td>{invoice.exportPenalty}</td>
//                             {/* <td>{invoice.importSplCartNop}</td> */}
//                             <td>{invoice.importScRate}</td>
//                             {/* <td>{invoice.importHpNop}</td> */}
//                             <td>{invoice.importHpRate}</td>
//                             {/* <td>{invoice.importPcNop}</td> */}
//                             <td>{invoice.importPcRate}</td>
//                             {/* <td>{invoice.importOcNop}</td> */}
//                             <td>{invoice.importPenalty}</td>
//                             <td>
//                               {invoice.exportRate +
//                                 invoice.importRate +
//                                 invoice.importSubRate +
//                                 invoice.exportSubRate +
//                                 invoice.holidayRate +
//                                 invoice.demuragesRate +
//                                 invoice.exportScRate +
//                                 invoice.exportHpRate +
//                                 invoice.exportPcRate +
//                                 invoice.exportPenalty +
//                                 invoice.importScRate +
//                                 invoice.importHpRate +
//                                 invoice.importPcRate +
//                                 invoice.importPenalty}
//                             </td>
//                             {invoice.companyId == 0 ? (
//                               <>
//                                 <td>{invoice.branchId}</td>
//                                 <td>0</td>
//                                 <td>0</td>
//                               </>
//                             ) : (
//                               <>
//                                 <td>0</td>
//                                 <td>{invoice.branchId.startsWith('B')?0:invoice.branchId/2}</td>
//                                 <td>{invoice.branchId.startsWith('B')?0:invoice.branchId/2}</td>
//                               </>
//                             )}

//                             <td>
//                               {invoice.exportRate +
//                                 invoice.importRate +
//                                 invoice.importSubRate +
//                                 invoice.exportSubRate +
//                                 invoice.holidayRate +
//                                 invoice.demuragesRate +
//                                 invoice.exportScRate +
//                                 invoice.exportHpRate +
//                                 invoice.exportPcRate +
//                                 invoice.exportPenalty +
//                                 invoice.importScRate +
//                                 invoice.importHpRate +
//                                 invoice.importPcRate +
//                                 invoice.importPenalty +
//                                 (
//                                   invoice.companyId === 0 ? (
//                                     (invoice.branchId.startsWith('B')?0:invoice.branchId)
//                                   )
//                                     : (
//                                       (invoice.branchId.startsWith('B')?0:(invoice.branchId / 2 + invoice.branchId / 2))
//                                     )
//                                 )}
//                             </td>
//                           </tr>
//                         </React.Fragment>
//                       );
//                     })}
//                     <tr>
//                       <td
//                         className="text-center"
//                         style={{ fontWeight: "bold", fontSize: 15 }}
//                       >
//                         Total
//                       </td>
//                       <td>
//                         {totalExportNop}
//                         <br />
//                         {totalExportRate}
//                       </td>
//                       <td>
//                         {totalExportSubNop}
//                         <br />
//                         {totalExportSubRate}
//                       </td>
//                       <td>
//                         {totalImportNop}
//                         <br />
//                         {totalImportRate}
//                       </td>
//                       <td>
//                         {totalImportSubNop}
//                         <br />
//                         {totalImportSubRate}
//                       </td>
//                       <td>
//                         {totalExportNop +
//                           totalImportNop +
//                           totalImportSubNop +
//                           totalExportSubNop}
//                         <br />
//                         {totalExportRate +
//                           totalImportRate +
//                           totalImportSubRate +
//                           totalExportSubRate}
//                       </td>
//                       <td>{totalHolidayRate}</td>
//                       <td>{totalDemuragesRate}</td>
//                       <td>{totalExportSplCartRate}</td>
//                       <td>{totalExportHpRate}</td>
//                       <td>{totalExportPcRate}</td>
//                       <td>{totalExportOcRate}</td>
//                       <td>{totalImportSplCartRate}</td>
//                       <td>{totalImportHpRate}</td>
//                       <td>{totalImportPcRate}</td>
//                       <td>{totalImportOcRate}</td>
//                       <td>
//                         {totalExportRate +
//                           totalImportRate +
//                           totalImportSubRate +
//                           totalExportSubRate +
//                           totalHolidayRate +
//                           totalDemuragesRate +
//                           totalExportSplCartRate +
//                           totalExportHpRate +
//                           totalExportPcRate +
//                           totalExportOcRate +
//                           totalImportSplCartRate +
//                           totalImportHpRate +
//                           totalImportPcRate +
//                           totalImportOcRate}
//                       </td>
//                       <td>{totalIgst}</td>
//                       <td>{totalSgst}</td>
//                       <td>{totalCgst}</td>
//                       <td>
//                         {totalExportRate +
//                           totalImportRate +
//                           totalImportSubRate +
//                           totalExportSubRate +
//                           totalHolidayRate +
//                           totalDemuragesRate +
//                           totalExportSplCartRate +
//                           totalExportHpRate +
//                           totalExportPcRate +
//                           totalExportOcRate +
//                           totalImportSplCartRate +
//                           totalImportHpRate +
//                           totalImportPcRate +
//                           totalImportOcRate +
//                           (totalIgst+totalCgst+totalSgst)}
//                       </td>
//                     </tr>
//                     {/* only igst,cgst,sgst ius remaing */}
//                   </>
//                 )}
//               </tbody>
//             </Table>
//           </CardBody>
//         </Card>
//       )}
//     </div>
//   );
// }


import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { Button, Pagination } from 'react-bootstrap';
import "../Components/Style.css";
import dgdcImage from "../Images/report.jpeg";
import DatePicker from "react-datepicker";
import ipaddress from "../Components/IpAddress";
import {
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Table,
} from "reactstrap";
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRefresh, faFilePdf } from "@fortawesome/free-solid-svg-icons";

import { faPrint } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import ReactLoading from 'react-loading';
import Select from 'react-select';
export default function Party_bill_summary() {

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity and color as needed
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999, // Ensure the overlay is above other elements
    },
  };









  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedParty, setSelectedParty] = useState(null);
  const [Invoices, setInvoices] = useState([]);
  const [noRecordsFound, setNoRecordsFound] = useState(false);

  const [noRecordsFound2, setNoRecordsFound2] = useState(false);
  const [startDate2, setStartDate2] = useState(new Date());
  const [endDate2, setEndDate2] = useState(new Date());
  const [selectedParty2, setSelectedParty2] = useState(null);
  const [selectedPartyId, setSelectedPartyId] = useState('');


  const [Invoices2, setInvoices2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parties2, setParties2] = useState([]);
  const [partyName, setparty_Name] = useState('Select Party......');


  const formatDateTime2 = (value) => {
    if (!value) {
      return ""; // Return an empty string if value is empty or undefined
    }

    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Function to calculate the total for a specific column
  const calculateTotal = (data, columnIndex) => {
    const total = data.reduce((sum, row) => sum + (row[columnIndex] || 0), 0);
    return total !== 0 ? total : '';
  };

  // Pagination 
  const [currentPage5, setCurrentPage5] = useState(1);
  const itemsPerPage5 = 31; // Number of items to display per page

  const indexOfLastItem5 = currentPage5 * itemsPerPage5;
  const indexOfFirstItem5 = indexOfLastItem5 - itemsPerPage5;
  const currentItems5 = Invoices2.slice(indexOfFirstItem5, indexOfLastItem5);
  const totalPages5 = Math.ceil(Invoices2.length / itemsPerPage5);

  const handlePageChange5 = (page) => {
    setCurrentPage5(page);
  };

  const displayPages5 = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage5 - middlePage;
    let endPage = currentPage5 + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages5, centerPageCount);
    }

    if (endPage > totalPages5) {
      endPage = totalPages5;
      startPage = Math.max(1, totalPages5 - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };




  const formatDateTime = (value) => {
    if (!value) {
      return "";
    }

    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [parties, setParties] = useState([]);
  const { branchId, companyid } = useContext(AuthContext);

  useEffect(() => {
    findParties();
    fetchData();
  }, []);
  const [filterPartyId, setFilterPartyId] = useState(null);
  const [PartyList, setPartyList] = useState([]);
  let totalExportNop = 0;
  let totalExportRate = 0;
  let totalExportSubNop = 0;
  let totalExportSubRate = 0;
  let totalImportNop = 0;
  let totalImportRate = 0;
  let totalImportSubNop = 0;
  let totalImportSubRate = 0;
  let totalHolidayRate = 0;
  let totalDemuragesRate = 0;
  let totalExportSplCartRate = 0;
  let totalExportHpRate = 0;
  let totalExportPcRate = 0;
  let totalExportOcRate = 0;
  let totalImportSplCartRate = 0;
  let totalImportHpRate = 0;
  let totalImportPcRate = 0;
  let totalImportOcRate = 0;
  let totalHolidaySubNop = 0;

  const fetchData = () => {
    axios
      .get(`http://${ipaddress}parties/getAll/${companyid}/${branchId}`)
      .then((response) => {
        // console.log("Response data received:", response.data);
        if (Array.isArray(response.data)) {
          setPartyList(response.data);

        } else {
          console.error("Response data is not an array:", response.data);
        }
      });
  };
  // console.log(PartyList);

  if (Array.isArray(Invoices) && Invoices.length > 0) {
    totalExportNop = Invoices.reduce(
      (sum, invoice) => sum + invoice.exportNoOfPackages,
      0
    );
    totalExportRate = Invoices.reduce(
      (sum, invoice) => sum + invoice.exportRate,
      0
    );
    totalExportSubNop = Invoices.reduce(
      (sum, invoice) => sum + invoice.exportSubNop,
      0
    );

    totalExportSubRate = Invoices.reduce(
      (sum, invoice) => sum + invoice.exportSubRate,
      0
    );

    totalImportNop = Invoices.reduce(
      (sum, invoice) => sum + invoice.importNoOfPackages,
      0
    );
    totalImportRate = Invoices.reduce(
      (sum, invoice) => sum + invoice.importRate,
      0
    );
    totalImportSubNop = Invoices.reduce(
      (sum, invoice) => sum + invoice.importSubNop,
      0
    );
    totalImportSubRate = Invoices.reduce(
      (sum, invoice) => sum + invoice.importSubRate,
      0
    );
    totalHolidayRate = Invoices.reduce(
      (sum, invoice) => sum + invoice.holidayRate,
      0
    );
    totalDemuragesRate = Invoices.reduce(
      (sum, invoice) => sum + invoice.demuragesRate,
      0
    );

    totalExportSplCartRate = Invoices.reduce(
      (sum, invoice) => sum + invoice.exportScRate,
      0
    );
    totalExportHpRate = Invoices.reduce(
      (sum, invoice) => sum + invoice.exportHpRate,
      0
    );
    totalExportPcRate = Invoices.reduce(
      (sum, invoice) => sum + invoice.exportPcRate,
      0
    );
    totalExportOcRate = Invoices.reduce(
      (sum, invoice) => sum + invoice.exportPenalty,
      0
    );

    totalImportSplCartRate = Invoices.reduce(
      (sum, invoice) => sum + invoice.importScRate,
      0
    );
    totalImportHpRate = Invoices.reduce(
      (sum, invoice) => sum + invoice.importHpRate,
      0
    );
    totalImportPcRate = Invoices.reduce(
      (sum, invoice) => sum + invoice.importPcRate,
      0
    );
    totalImportOcRate = Invoices.reduce(
      (sum, invoice) => sum + invoice.importPenalty,
      0
    );
    totalHolidaySubNop = Invoices.reduce(
      (sum, invoice) => sum + invoice.holidaySubNop,
      0
    );
  }
  function getPartyById(pid) {
    const party = PartyList.find((party) => party.partyId === pid);
    // console.log(party);

    return party; // Return pname or a message if not found
  }

  const findParties = async () => {
    const partyResponse = await Rate_Chart_Service.getAllParties(
      companyid,
      branchId
    );
    const partyOptions = partyResponse.data.map((party) => ({
      value: party.partyId,
      label: party.partyName,
    }));
    setParties(partyOptions);
    
  };

  // useEffect(() => {
  //   handleSearch2('', new Date(), new Date());
  // }, []);

  const handleSearch2 = async (selectedParty2, startDate2, endDate2) => {
    setCurrentPage5(1);
    setInvoices2([]);
    setLoading(true);
    try {
      const results = await axios.get(`http://${ipaddress}predictable/dailyReport`, { params: { companyid: companyid, branchId: branchId, PartyId: selectedParty2, startDate: startDate2.toISOString().split('T')[0], endDate: endDate2.toISOString().split('T')[0], }, });
      if (!results.data || results.data.length === 0) {
        toast.info('No data found', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
        });
      } else {
        setInvoices2(results.data);
        // setNoRecordsFound2(results.data.length === 0);
      }
    } catch (error) {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    }
    finally {
      setLoading(false);
    }
  };













  // const handleSearch2 = (selectedParty2, startDate2, endDate2) => {
  //   setCurrentPage5(1);
  //   console.log("Start Date " + startDate2);
  //   console.log("End Date " + endDate2);
  //   axios
  //     .get(
  //       `http://${ipaddress}predictable/dailyReport`,
  //       {
  //         params: {
  //           companyid: companyid,
  //           branchId: branchId,
  //           PartyId: selectedParty2,
  //           startDate: startDate2.toISOString().split('T')[0],
  //           endDate: endDate2.toISOString().split('T')[0],
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log("Response data received:", response.data);
  //       if (Array.isArray(response.data)) {
  //         setInvoices2(response.data);
  //         setNoRecordsFound2(response.data.length === 0);
  //       } else {
  //         console.error("Response data is not an array:", response.data);
  //       }
  //     });
  // };


  const handleReset2 = () => {
    setStartDate2(new Date());
    setEndDate2(new Date());
    setSelectedParty2('Select Party');
    setInvoices2([]);
    handleSearch2('', new Date(), new Date());
  };















  // console.log(PartyList);
  const handlePartySelect = (event) => {
    const selectedPartyValue = event.target.value;
    // console.log("Selected Party Value: ", selectedPartyValue);
    setSelectedParty(selectedPartyValue);
  };



  const handlePartySelect2 = selectedOption => {

    // setSelectedParty2(selectedOption ? selectedOption.value : '');
    // setSelectedPartyId(selectedOption ? selectedOption.label : '' );

    setSelectedPartyId(selectedOption ? selectedOption.value : null);
    setSelectedParty2(selectedOption);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // console.log("Selected Start Date: ", date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    // console.log("Selected End Date: ", date);
  };
  const handleReset = () => {
    setStartDate(new Date()); // Reset Bill Date From to today's date
    setEndDate(new Date()); // Reset Bill Date To to today's date
    setSelectedParty("Select Party"); // Reset selected party to an empty string
    setInvoices([]);
    // setParties([]);

    // findParties();
  };
  const handleSearch = () => {
    axios
      .get(
        `http://${ipaddress}predictable/list/${companyid}/${branchId}/${startDate}/${endDate}/${selectedParty}`
      )
      .then((response) => {
        console.log("Response data received:", response.data);
        if (Array.isArray(response.data)) {
          setInvoices(response.data);
          setNoRecordsFound(response.data.length === 0);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      });
  };

  let totalIgst = 0;
  let totalCgst = 0;
  let totalSgst = 0;

  Invoices.forEach((invoice, index) => {
    // console.log(invoice.importNop+"-----"+invoice.partyId);
    console.log("invoice.companyId ", invoice.companyId);
    if (invoice.companyId == 0) {
      if (!invoice.branchId.startsWith('B')) {
        totalIgst += parseInt(invoice.branchId);

      }
      else {
        totalIgst += 0;
      }
      // console.log(`Invoice igst ${index + 1}:`, totalIgst);
    } else {
      if (!invoice.branchId.startsWith('B')) {
        totalCgst += invoice.branchId / 2;
        totalSgst += invoice.branchId / 2;

      }
      else {
        totalCgst += 0;
        totalSgst += 0;
      }
      // console.log(`Invoice cgst sgst ${index + 1}:`, totalSgst,totalCgst);
    }
  });

  const handlePdfDownload = async () => {
    try {
      const response = await axios.get(
        `http://${ipaddress}predictable/generatePrint/${companyid}/${branchId}/${startDate}/${endDate}/${selectedParty}`
      );
      toast.success("Party Bill Summary PDF Created Successfully ", {
        position: "top-center",
        autoClose: 2000,
      });
      if (response.status === 200) {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob(
          [Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0))],
          { type: "application/pdf" }
        );

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = "Party_bill_summary.pdf"; // Set the filename for the downloaded PDF
        downloadLink.style.display = "none";
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
      } else {
        throw new Error("Failed to generate PDF");
      }
    } catch (error) { }
  };

  const handlePrint = async () => {
    try {
      const response = await axios.get(
        `http://${ipaddress}predictable/generatePrint/${companyid}/${branchId}/${startDate}/${endDate}/${selectedParty}`
      );

      if (response.status === 200) {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Convert Base64 to Uint8Array
        const uint8Array = Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0));

        // Create a Blob from the Uint8Array data
        const pdfBlob = new Blob([uint8Array], { type: "application/pdf" });

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Open the print dialog for the PDF
        const printWindow = window.open(blobUrl, "_blank");
        if (printWindow) {
          printWindow.onload = () => {
            // Close the print window after printing
            printWindow.print();
            printWindow.onafterprint = () => {
              printWindow.close();
            };
          };
        } else {
          console.error("Failed to open a new window for printing.");
          // Handle the error, show an error message, etc.
        }
      } else {
        console.error("Error downloading PDF:", response.statusText);
        // Handle other status codes (e.g., error responses) as needed
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle the error, show an error message, etc.
    }
  };


  const handlePrint1 = () => {
    const dgdc1 = dgdcImage;
    // Create an Image object to preload the image
    const image = new Image();
    image.src = dgdc1;
    // Add an onload event handler to execute the print code when the image is loaded
    image.onload = () => {
      handlePrintcode(dgdc1, startDate, endDate);
    };
  };


  const handlePrintcode = (dgdcImage1, sdate, edate) => {


    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>    
        <title>Bill Summary Report</title>
        <style>
          @page {
            margin: 1cm;
          }
  
          .printable-area {
            font-family: Arial, sans-serif;
          }
  
          table {
            width: 100%;
            border-collapse: collapse;
          }
  
          th, td {
            border: 1px solid #dddddd;
            text-align: center;
            padding: 8px;
          }
  
          /* Add CSS to remove spacing around tables and images */
          table, img {
            margin: 0;
            padding: 0;
            border-spacing: 0;
            border-collapse: collapse;
          }
  
          /* Style for the additional row */
          .additional-row {
            background-color: lightgray;
            font-weight: bold;
          }
  
          #page-header {
            display: flex;
            justify-content: center; /* Center content horizontally */
            align-items: center; /* Center content vertically */
          }
            table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #000; /* Add border to the table */
          }
    
          th, td {
            border: 1px solid #000; /* Add border to table cells */
            text-align: center;
            padding: 8px;
          }
    
          /* Add CSS to remove spacing around tables and images */
          table, img {
            margin: 0;
            padding: 0;
            border-spacing: 0;
            border-collapse: collapse;
          }
    
    
        </style>
      </head>
      <body>
    `);

    printWindow.document.write(`
      <div id="page-header">
        <img src="${dgdcImage1}" alt="Header Image" style="max-width: 306px; max-height: 306px;"> 
      </div>
      <h4 style="text-align: center; font-size: 24px;">Bill Summary Report</h4>

    <h3>Start Date:${formatDateTime(sdate)}	End Date: ${formatDateTime(
      edate
    )}</h3>  
      `);

    printWindow.document.write(` 
    <table rules="all" class="table border border-primary table-striped table-hover centered-table table-responsive" style="width: 100%;">
      <thead>
        <tr className="text-center">
                <th rowspan="2" style="background: skyblue; align-items: center;" scope="col" colspan="0">Sr No.</th>
                <th style="background: skyblue; align-items: center;" scope="col" colspan="2">
                  EXP PKGS
                </th>
                <th style="background: skyblue; align-items: center;" scope="col" colspan="2">
                  IMP PCKGS
                </th>
                <th style="background: skyblue; align-items: center;" scope="col" colspan="3"
                ></th>
                <th style="background: skyblue; align-items: center;" scope="col" colspan="4">
                  Export Details
                </th>
                <th style="background: skyblue; align-items: center;" scope="col" colspan="4">
                  Import Details
                </th>
                <th style="background: skyblue; align-items: center;" scope="col" colspan="6"></th> 
              </tr>
              <tr className="text-center">
                <th style="background: skyblue; align-items: center;" >EXP</th>
                <th style="background: skyblue; align-items: center;" >SUB</th>
                <th style="background: skyblue; align-items: center;" >IMP</th>
                <th style="background: skyblue; align-items: center;" > SUB</th>
                <th style="background: skyblue; align-items: center;" >TOT PKGS </th>
                <th style="background: skyblue; align-items: center;" >IIND SAT</th>
                <th style="background: skyblue; align-items: center;" >DEMU</th>
                <th style="background: skyblue; align-items: center;" >SC</th>
                <th style="background: skyblue; align-items: center;" >HW Wt</th>
                <th style="background: skyblue; align-items: center;" >PC</th>
                <th style="background: skyblue; align-items: center;" >OC</th>
                <th style="background: skyblue; align-items: center;" >SC</th>
                <th style="background: skyblue; align-items: center;" >HW Wt</th>
                <th style="background: skyblue; align-items: center;" > PC</th>
                <th style="background: skyblue; align-items: center;" > OC</th>
                <th style="background: skyblue; align-items: center;" >Total Amount</th>
                <th style="background: skyblue; align-items: center;" >IGST</th>
                <th style="background: skyblue; align-items: center;" >SGST</th>
                <th style="background: skyblue; align-items: center;" >CGST</th>
                <th style="background: skyblue; align-items: center;" >Grand Total</th>
              </tr>
      </thead>
  `);

    Invoices.forEach((invoice, index) => {
      const party = getPartyById(invoice.partyId);

      printWindow.document.write(`
    <tr className="text-center">
    <td rowspan="2">${index + 1}</td>
      <td colspan="4">${party.erpCode}</td>
      <td colspan="3">${party.iecNo}</td>
      <td colspan="4"><strong>${party.partyName
        }</strong></td> <!-- Add strong tags for bold -->
      <td colspan="4">${party.email}</td>
      <td colspan="6">${party.gstNo}</td>
    </tr>
  `);
      printWindow.document.write(`
    <tr className="text-center">
    <td>
    ${invoice.exportNop}
      <br />
      ${invoice.exportRate}
    </td>
    <td>
    ${invoice.exportSubNop} <br />
    ${invoice.exportSubRate}
    </td>
    <td>
    ${invoice.importNop}
      <br />
      ${invoice.importRate}
    </td>
    <td>
    ${invoice.importSubNop}
      <br />
      ${invoice.importSubRate}
    </td>
    <td>
    ${invoice.exportNop +
        invoice.importNop +
        invoice.importSubNop +
        invoice.exportSubNop
        }
      <br />
      ${invoice.exportRate +
        invoice.importRate +
        invoice.importSubRate +
        invoice.exportSubRate
        }
    </td>
    <td>${invoice.holidayRate}</td>
    <td>${invoice.demuragesRate}</td>
    <td>${invoice.exportSplCartRate}</td>
    <td>${invoice.exportHpRate}</td>
    <td>${invoice.exportPcRate}</td>
    <td>${invoice.exportOcRate}</td>
    <td>${invoice.importSplCartRate}</td>
    <td>${invoice.importHpRate}</td>
    <td>${invoice.importPcRate}</td>
    <td>${invoice.importOcRate}</td>
    <td>
    ${invoice.exportRate +
        invoice.importRate +
        invoice.importSubRate +
        invoice.exportSubRate +
        invoice.holidayRate +
        invoice.demuragesRate +
        invoice.exportSplCartRate +
        invoice.exportHpRate +
        invoice.exportPcRate +
        invoice.exportOcRate +
        invoice.importSplCartRate +
        invoice.importHpRate +
        invoice.importPcRate +
        invoice.importOcRate
        }
    </td>
    ${invoice.importNop === 1
          ? "<td>" + invoice.holidaySubNop + "</td><td>0</td><td>0</td>"
          : "<td>0</td><td>" +
          invoice.holidaySubNop / 2 +
          "</td><td>" +
          invoice.holidaySubNop / 2 +
          "</td>"
        }

    <td>
      ${invoice.exportRate +
        invoice.importRate +
        invoice.importSubRate +
        invoice.exportSubRate +
        invoice.holidayRate +
        invoice.demuragesRate +
        invoice.exportSplCartRate +
        invoice.exportHpRate +
        invoice.exportPcRate +
        invoice.exportOcRate +
        invoice.importSplCartRate +
        invoice.importHpRate +
        invoice.importPcRate +
        invoice.importOcRate +
        invoice.holidaySubNop
        }
    </td>
  </tr>
  `);
    });

    printWindow.document.write(`
<tr class="text-center">
  <td class="text-center" style="font-weight: bold; font-size: 15px;">
    Total
  </td>
  <td>
    ${totalExportNop}
    <br />
    ${totalExportRate}
  </td>
  <td>
    ${totalExportSubNop}
    <br />
    ${totalExportSubRate}
  </td>
  <td>
    ${totalImportNop}
    <br />
    ${totalImportRate}
  </td>
  <td>
    ${totalImportSubNop}
    <br />
    ${totalImportSubRate}
  </td>
  <td>
    ${totalExportNop + totalImportNop + totalImportSubNop + totalExportSubNop}
    <br />
    ${totalExportRate +
      totalImportRate +
      totalImportSubRate +
      totalExportSubRate
      }
  </td>
  <td>${totalHolidayRate}</td>
  <td>${totalDemuragesRate}</td>
  <td>${totalExportSplCartRate}</td>
  <td>${totalExportHpRate}</td>
  <td>${totalExportPcRate}</td>
  <td>${totalExportOcRate}</td>
  <td>${totalImportSplCartRate}</td>
  <td>${totalImportHpRate}</td>
  <td>${totalImportPcRate}</td>
  <td>${totalImportOcRate}</td>
  <td>
    ${totalExportRate +
      totalImportRate +
      totalImportSubRate +
      totalExportSubRate +
      totalHolidayRate +
      totalDemuragesRate +
      totalExportSplCartRate +
      totalExportHpRate +
      totalExportPcRate +
      totalExportOcRate +
      totalImportSplCartRate +
      totalImportHpRate +
      totalImportPcRate +
      totalImportOcRate
      }
  </td>
  <td>${totalIgst}</td>
  <td>${totalSgst}</td>
  <td>${totalCgst}</td>
  <td>
    ${totalExportRate +
      totalImportRate +
      totalImportSubRate +
      totalExportSubRate +
      totalHolidayRate +
      totalDemuragesRate +
      totalExportSplCartRate +
      totalExportHpRate +
      totalExportPcRate +
      totalExportOcRate +
      totalImportSplCartRate +
      totalImportHpRate +
      totalImportPcRate +
      totalImportOcRate +
      totalHolidaySubNop
      }
  </td>
</tr>
`);

    printWindow.document.write(`<tr></tr> `);

    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };


  const sortedInvoices = Invoices.slice().sort((a, b) => {
    const partyA = getPartyById(a.partyId);
    const partyB = getPartyById(b.partyId);

    // Perform null or undefined check before accessing properties
    const partyAName = partyA ? partyA.partyName : '';
    const partyBName = partyB ? partyB.partyName : '';

    return partyAName.localeCompare(partyBName);
  });



  return (
    <>
      {loading && (
        <div style={styles.overlay}>
          <ReactLoading type="spin" color="#0000FF" height={300} width={80} />
        </div>
      )}

      <div className='' style={{ marginTop: 20 }}>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item tabspace" role="presentation">
            <button style={{ color: 'gray' }} className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"><h6>Summary Report</h6></button>
          </li>

          <li className="nav-item tabspace" role="presentation">
            <button style={{ color: 'gray' }} className="nav-link" id="transaction-tab" data-bs-toggle="tab" data-bs-target="#transaction" type="button" role="tab" aria-controls="transaction" aria-selected="false"><h6>Daily Report</h6></button>
          </li>


        </ul>

        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

            <div className="Container">
              {/* <h5
          className="pageHead"
          style={{
            fontFamily: "Your-Heading-Font",
            paddingLeft: "4%",
            paddingRight: "-50px",
          }}
        >
          <FontAwesomeIcon
            icon={faUserCircle}
            style={{
              marginRight: "8px",
              color: "black", // Set the color to golden
            }}
          />
          Party Bill Summary Report
        </h5> */}

              <Card>
                <CardBody>
                  <Row>
                    <Col md={3}>
                      <FormGroup>
                        <Label className="forlabel" for="branchId">
                          Bill Date From <span style={{ color: "red" }}>*</span>
                        </Label>
                        <div>
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            onChange={handleStartDateChange}
                            wrapperClassName="custom-react-datepicker-wrapper"
                            className="form-control border-right-0"
                            customInput={<input style={{ width: "100%" }} />}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label className="forlabel" for="branchId">
                          Bill Date To<span style={{ color: "red" }}>*</span>
                        </Label>
                        <div className="input-group">
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={endDate}
                            onChange={handleEndDateChange}
                            wrapperClassName="custom-react-datepicker-wrapper"
                            className="form-control border-right-0"
                            customInput={<input style={{ width: "100%" }} />}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="search" className="forlabel">
                          Select Party
                        </Label>
                        <select
                          id="partySelect"
                          className="form-control form-select"
                          required
                          name="party"
                          onChange={handlePartySelect}
                        >
                          {/* <option  value={tempParty}>Select Party</option> */}
                          <option value="Select Party">Select Party</option>

                          {parties.map((party) => (
                            <option key={party.value} value={party.value}>
                              {party.label}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </Col>

                    <Col md={3} style={{ marginTop: 22 }}>
                      <Button
                        type="button"
                        className=""
                        variant="outline-primary"
                        style={{ marginTop: "10px", marginRight: 10 }}
                        onClick={handleSearch}
                      >
                        <FontAwesomeIcon
                          icon={faSearch}
                          style={{ marginRight: "5px" }}
                        />
                        Search
                      </Button>
                      <Button
                        type="button"
                        className=""
                        variant="outline-danger"
                        style={{ marginTop: "10px" }}
                        onClick={handleReset}
                      >
                        <FontAwesomeIcon
                          icon={faRefresh}
                          style={{ marginRight: "5px" }}
                        />
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              {noRecordsFound && (
                <div className="no-records-found text-center">
                  <p style={{ color: 'red' }}>
                    Sorry! No records found
                  </p>
                </div>
              )}

              {Invoices && Invoices.length > 0 && (

                <Card>
                  <CardBody>
                    <Row>
                      <Col className="text-end">
                        {/* {Invoices && Invoices.length > 0 && (  // Check if Invoices is not null and not empty
      <> */}
                        <Button
                          type="submit"
                          className=""
                          style={{ marginRight: 10 }}
                          variant="outline-success"
                          onClick={handlePrint}
                        >
                          <FontAwesomeIcon
                            icon={faPrint}
                            style={{ marginRight: "5px" }}
                          />
                          Print
                        </Button>

                        <Button
                          type="button"
                          className=""
                          variant="outline-primary"
                          onClick={handlePdfDownload}
                        >
                          <FontAwesomeIcon
                            icon={faFilePdf}
                            style={{ marginRight: "5px" }}
                          />
                          PDF
                        </Button>
                        {/* </>
              )} */}
                      </Col>
                    </Row>
                    <Table style={{ marginTop: 10 }} striped responsive bordered>
                      <thead>
                        <tr className="text-center">
                          <th
                            rowSpan="1"
                            style={{ width: "3%", background: "#BADDDA" }}
                          ></th>
                          <th
                            colSpan="2"
                            style={{ width: "5%", background: "#BADDDA" }}
                          >
                            EXPORT PKGS
                          </th>
                          <th
                            colSpan="2"
                            style={{ width: "5%", background: "#BADDDA" }}
                          >
                            IMPORT PCKGS
                          </th>
                          <th
                            colSpan="3"
                            style={{ width: "5%", background: "#BADDDA" }}
                          ></th>
                          <th
                            colSpan="4"
                            style={{ width: "5%", background: "#BADDDA" }}
                          >
                            EXPORT DETAILS
                          </th>
                          <th
                            colSpan="4"
                            style={{ width: "5%", background: "#BADDDA" }}
                          >
                            IMPORT DETAILS
                          </th>
                          <th
                            colSpan="6"
                            style={{ width: "5%", background: "#BADDDA" }}
                          ></th>
                        </tr>
                        <tr className="text-center">
                          <th style={{ background: "#BADDDA" }}>SR.NO</th>

                          <th style={{ background: "#BADDDA" }}>EXP</th>
                          <th style={{ background: "#BADDDA" }}>SUB</th>
                          <th style={{ background: "#BADDDA" }}>IMP</th>
                          <th style={{ background: "#BADDDA" }}> SUB</th>
                          <th style={{ background: "#BADDDA" }}>TOT PKGS </th>

                          <th style={{ background: "#BADDDA" }}>IIND SAT</th>
                          <th style={{ background: "#BADDDA" }}>DEMURAGES</th>
                          <th style={{ background: "#BADDDA" }}>SC</th>

                          <th style={{ background: "#BADDDA" }}>HW WT</th>
                          <th style={{ background: "#BADDDA" }}>PC</th>

                          <th style={{ background: "#BADDDA" }}>OC</th>
                          <th style={{ background: "#BADDDA" }}>SC</th>
                          <th style={{ background: "#BADDDA" }}>HW WT</th>

                          <th style={{ background: "#BADDDA" }}> PC</th>
                          <th style={{ background: "#BADDDA" }}> OC</th>

                          <th style={{ background: "#BADDDA" }}>TOTAL AMOUNT</th>
                          <th style={{ background: "#BADDDA" }}>IGST</th>
                          <th style={{ background: "#BADDDA" }}>SGST</th>
                          <th style={{ background: "#BADDDA" }}>CGST</th>

                          <th style={{ background: "#BADDDA" }}>GRAND TOTAL</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {sortedInvoices.length === 0 ? (
                          <tr>
                            <td colSpan="21">No invoices available</td>
                          </tr>
                        ) : (
                          <>
                            {sortedInvoices.map((invoice, index) => {
                              const party = getPartyById(invoice.partyId); // Replace with your actual function

                              return (
                                <React.Fragment key={index}>
                                  <tr>
                                    <td colSpan={3}>
                                      {party ? party.erpCode : "NULL"}
                                    </td>
                                    <td colSpan={2}>
                                      {party ? party.partyId : "Party ID"}
                                    </td>
                                    <td
                                      colSpan={4}
                                      style={{ fontWeight: "bold", fontSize: 17 }}
                                    >
                                      {party ? party.partyName : "Party Name"}
                                    </td>
                                    <td colSpan={7}>
                                      {party ? party.email : "Party Salary"}
                                    </td>
                                    <td colSpan={5}>
                                      {party ? party.gstNo : "Party ID"}
                                    </td>
                                    {/* Other <td> elements here */}
                                  </tr>
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      {invoice.exportNoOfPackages}
                                      <br />
                                      {invoice.exportRate}
                                    </td>
                                    <td>
                                      {invoice.exportSubNop} <br />
                                      {invoice.exportSubRate}
                                    </td>
                                    <td>
                                      {invoice.importNoOfPackages}
                                      <br />
                                      {invoice.importRate}
                                    </td>
                                    <td>
                                      {invoice.importSubNop}
                                      <br />
                                      {invoice.importSubRate}
                                    </td>
                                    <td>
                                      {invoice.exportNoOfPackages +
                                        invoice.importNoOfPackages +
                                        invoice.importSubNop +
                                        invoice.exportSubNop}
                                      <br />
                                      {invoice.exportRate +
                                        invoice.importRate +
                                        invoice.importSubRate +
                                        invoice.exportSubRate}
                                    </td>
                                    <td>{invoice.holidayRate}</td>
                                    <td>{invoice.demuragesRate}</td>
                                    <td>{invoice.exportScRate}</td>
                                    {/* <td>{invoice.exportHpNop}</td> */}
                                    <td>{invoice.exportHpRate}</td>
                                    {/* <td>{invoice.exportPcNop}</td> */}
                                    <td>{invoice.exportPcRate}</td>
                                    {/* <td>{invoice.exportOcNop}</td> */}
                                    <td>{invoice.exportPenalty}</td>
                                    {/* <td>{invoice.importSplCartNop}</td> */}
                                    <td>{invoice.importScRate}</td>
                                    {/* <td>{invoice.importHpNop}</td> */}
                                    <td>{invoice.importHpRate}</td>
                                    {/* <td>{invoice.importPcNop}</td> */}
                                    <td>{invoice.importPcRate}</td>
                                    {/* <td>{invoice.importOcNop}</td> */}
                                    <td>{invoice.importPenalty}</td>
                                    <td>
                                      {invoice.exportRate +
                                        invoice.importRate +
                                        invoice.importSubRate +
                                        invoice.exportSubRate +
                                        invoice.holidayRate +
                                        invoice.demuragesRate +
                                        invoice.exportScRate +
                                        invoice.exportHpRate +
                                        invoice.exportPcRate +
                                        invoice.exportPenalty +
                                        invoice.importScRate +
                                        invoice.importHpRate +
                                        invoice.importPcRate +
                                        invoice.importPenalty}
                                    </td>
                                    {invoice.companyId == 0 ? (
                                      <>
                                        <td>{invoice.branchId}</td>
                                        <td>0</td>
                                        <td>0</td>
                                      </>
                                    ) : (
                                      <>
                                        <td>0</td>
                                        <td>{invoice.branchId.startsWith('B') ? 0 : invoice.branchId / 2}</td>
                                        <td>{invoice.branchId.startsWith('B') ? 0 : invoice.branchId / 2}</td>
                                      </>
                                    )}

                                    <td>
                                      {invoice.exportRate +
                                        invoice.importRate +
                                        invoice.importSubRate +
                                        invoice.exportSubRate +
                                        invoice.holidayRate +
                                        invoice.demuragesRate +
                                        invoice.exportScRate +
                                        invoice.exportHpRate +
                                        invoice.exportPcRate +
                                        invoice.exportPenalty +
                                        invoice.importScRate +
                                        invoice.importHpRate +
                                        invoice.importPcRate +
                                        invoice.importPenalty +
                                        (
                                          invoice.companyId === 0 ? (
                                            (invoice.branchId.startsWith('B') ? 0 : invoice.branchId)
                                          )
                                            : (
                                              (invoice.branchId.startsWith('B') ? 0 : (invoice.branchId / 2 + invoice.branchId / 2))
                                            )
                                        )}
                                    </td>
                                  </tr>
                                </React.Fragment>
                              );
                            })}
                            <tr>
                              <td
                                className="text-center"
                                style={{ fontWeight: "bold", fontSize: 15 }}
                              >
                                Total
                              </td>
                              <td>
                                {totalExportNop}
                                <br />
                                {totalExportRate}
                              </td>
                              <td>
                                {totalExportSubNop}
                                <br />
                                {totalExportSubRate}
                              </td>
                              <td>
                                {totalImportNop}
                                <br />
                                {totalImportRate}
                              </td>
                              <td>
                                {totalImportSubNop}
                                <br />
                                {totalImportSubRate}
                              </td>
                              <td>
                                {totalExportNop +
                                  totalImportNop +
                                  totalImportSubNop +
                                  totalExportSubNop}
                                <br />
                                {totalExportRate +
                                  totalImportRate +
                                  totalImportSubRate +
                                  totalExportSubRate}
                              </td>
                              <td>{totalHolidayRate}</td>
                              <td>{totalDemuragesRate}</td>
                              <td>{totalExportSplCartRate}</td>
                              <td>{totalExportHpRate}</td>
                              <td>{totalExportPcRate}</td>
                              <td>{totalExportOcRate}</td>
                              <td>{totalImportSplCartRate}</td>
                              <td>{totalImportHpRate}</td>
                              <td>{totalImportPcRate}</td>
                              <td>{totalImportOcRate}</td>
                              <td>
                                {totalExportRate +
                                  totalImportRate +
                                  totalImportSubRate +
                                  totalExportSubRate +
                                  totalHolidayRate +
                                  totalDemuragesRate +
                                  totalExportSplCartRate +
                                  totalExportHpRate +
                                  totalExportPcRate +
                                  totalExportOcRate +
                                  totalImportSplCartRate +
                                  totalImportHpRate +
                                  totalImportPcRate +
                                  totalImportOcRate}
                              </td>
                              <td>{totalIgst}</td>
                              <td>{totalSgst}</td>
                              <td>{totalCgst}</td>
                              <td>
                                {totalExportRate +
                                  totalImportRate +
                                  totalImportSubRate +
                                  totalExportSubRate +
                                  totalHolidayRate +
                                  totalDemuragesRate +
                                  totalExportSplCartRate +
                                  totalExportHpRate +
                                  totalExportPcRate +
                                  totalExportOcRate +
                                  totalImportSplCartRate +
                                  totalImportHpRate +
                                  totalImportPcRate +
                                  totalImportOcRate +
                                  (totalIgst + totalCgst + totalSgst)}
                              </td>
                            </tr>
                            {/* only igst,cgst,sgst ius remaing */}
                          </>
                        )}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              )}
            </div>


          </div>


          <div className="tab-pane fade show " id="transaction" role="tabpanel" aria-labelledby="transaction-tab">



            <Card>
              <CardBody>
                <Row>
                  <Col md={2}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">
                        Start Date <span style={{ color: "red" }}>*</span>
                      </Label>
                      <div>
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={startDate2}
                          onChange={(date) => setStartDate2(date)}
                          wrapperClassName="custom-react-datepicker-wrapper"
                          className="form-control border-right-0"
                          customInput={<input style={{ width: "100%" }} />}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">
                        End Date<span style={{ color: "red" }}>*</span>
                      </Label>
                      <div>
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={endDate2}
                          onChange={(date) => setEndDate2(date)}
                          wrapperClassName="custom-react-datepicker-wrapper"
                          className="form-control border-right-0"
                          customInput={<input style={{ width: "100%" }} />}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md={5}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Select Party</Label>
                      <Select
                        options={parties}
                        value={selectedParty2}
                        onChange={handlePartySelect2}
                        isClearable
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                            boxShadow: 'none',
                            '&:hover': {
                              border: '1px solid #ccc'
                            }
                          }),
                          indicatorSeparator: () => ({
                            display: 'none'
                          }),
                          dropdownIndicator: () => ({
                            display: 'none'
                          })
                        }}
                      />
                    </FormGroup>
                  </Col>

                  <Col md={3} style={{ marginTop: 22 }}>
                    <Button
                      type="button"
                      className=""
                      variant="outline-primary"
                      style={{ marginTop: "10px", marginRight: 10 }}
                      onClick={(e) => handleSearch2(selectedPartyId, startDate2, endDate2)}
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{ marginRight: "5px" }}
                      />
                      Search
                    </Button>
                    <Button
                      type="button"
                      className=""
                      variant="outline-danger"
                      style={{ marginTop: "10px" }}
                      onClick={handleReset2}
                    >
                      <FontAwesomeIcon
                        icon={faRefresh}
                        style={{ marginRight: "5px" }}
                      />
                      Reset
                    </Button>
                  </Col>
                </Row>
              {/* </CardBody>
            </Card> */}
            {!Invoices2 || Invoices2.length === 0 && (
              <div className="no-records-found text-center">
                <p style={{ color: 'red' }}>
                  No records found
                </p>
              </div>
            )}


            {Invoices2 && Invoices2.length > 0 && (
              <div className="table-responsive">
                <Table className="table table-bordered custom-table mt-3">
                  <thead>
                    <tr className='text-center'>
                      <th rowSpan="2" style={{ width: '8%', background: '#BADDDA' }}>Bill Date</th>
                      <th colSpan="2" style={{ width: '5%', background: '#BADDDA' }}>IMP PCKGS</th>
                      <th colSpan="2" style={{ width: '5%', background: '#BADDDA' }}>EXP PKGS</th>
                      <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>Total PKGS</th>
                      <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>IIND SAT</th>
                      <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>DEMURAGES</th>
                      <th colSpan="4" style={{ width: '30%', background: '#BADDDA' }}>EXPORT</th>
                      <th colSpan="4" style={{ width: '30%', background: '#BADDDA' }}>IMPORT</th>
                      <th rowSpan="2" style={{ width: '30%', background: '#BADDDA' }}>Bill Amount</th>
                    </tr>
                    <tr className='text-center'>
                      <th style={{ width: '6%', background: '#BADDDA' }}>IMP</th>
                      <th style={{ width: '6%', background: '#BADDDA' }}>SUB</th>
                      <th style={{ width: '6%', background: '#BADDDA' }}>EXP</th>
                      <th style={{ width: '6%', background: '#BADDDA' }}>SUB</th>
                      <th style={{ width: '8%', background: '#BADDDA' }}>SC</th>
                      <th style={{ width: '8%', background: '#BADDDA' }}>HW Wt</th>
                      <th style={{ width: '8%', background: '#BADDDA' }}>PC</th>
                      <th style={{ width: '8%', background: '#BADDDA' }}>OC</th>
                      <th style={{ width: '8%', background: '#BADDDA' }}>SC</th>
                      <th style={{ width: '8%', background: '#BADDDA' }}>HW Wt</th>
                      <th style={{ width: '8%', background: '#BADDDA' }}>PC</th>
                      <th style={{ width: '8%', background: '#BADDDA' }}>OC</th>
                    </tr>
                  </thead>
                  <tbody>

                    {currentItems5.map((import2, index) =>
                      <tr className="text-center dynamic-row-width" style={{ height: '40px' }}>

                        <td>{formatDateTime2(import2[0])}</td>
                        <td>{import2[1] !== 0 ? import2[1] : ''}</td>
                        <td>{import2[2] !== 0 ? import2[2] : ''}</td>
                        <td>{import2[3] !== 0 ? import2[3] : ''}</td>
                        <td>{import2[4] !== 0 ? import2[4] : ''}</td>
                        <td>{import2[5] !== 0 ? import2[5] : ''}</td>
                        <td>{import2[6] !== 0 ? import2[6] : ''}</td>
                        <td>{import2[7] !== 0 ? import2[7] : ''}</td>
                        <td>{import2[8] !== 0 ? import2[8] : ''}</td>
                        <td>{import2[9] !== 0 ? import2[9] : ''}</td>
                        <td>{import2[10] !== 0 ? import2[10] : ''}</td>
                        <td>{import2[11] !== 0 ? import2[11] : ''}</td>
                        <td>{import2[12] !== 0 ? import2[12] : ''}</td>
                        <td>{import2[13] !== 0 ? import2[13] : ''}</td>
                        <td>{import2[14] !== 0 ? import2[14] : ''}</td>
                        <td>{import2[15] !== 0 ? import2[15] : ''}</td>
                        <td>{import2[16] !== 0 ? import2[16] : ''}</td>

                      </tr>
                    )}
                  </tbody>
                  <tr className="text-center dynamic-row-width total-row">
                    <td>Total</td>
                    <td>{calculateTotal(currentItems5, 1)}</td>
                    <td>{calculateTotal(currentItems5, 2)}</td>
                    <td>{calculateTotal(currentItems5, 3)}</td>
                    <td>{calculateTotal(currentItems5, 4)}</td>
                    <td>{calculateTotal(currentItems5, 5)}</td>
                    <td>{calculateTotal(currentItems5, 6)}</td>
                    <td>{calculateTotal(currentItems5, 7)}</td>
                    <td>{calculateTotal(currentItems5, 8)}</td>
                    <td>{calculateTotal(currentItems5, 9)}</td>
                    <td>{calculateTotal(currentItems5, 10)}</td>
                    <td>{calculateTotal(currentItems5, 11)}</td>
                    <td>{calculateTotal(currentItems5, 12)}</td>
                    <td>{calculateTotal(currentItems5, 13)}</td>
                    <td>{calculateTotal(currentItems5, 14)}</td>
                    <td>{calculateTotal(currentItems5, 15)}</td>
                    <td>{calculateTotal(currentItems5, 16)}</td>
                  </tr>



                </Table>
                <div className="text-center">

                  <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                    <Pagination.First onClick={() => handlePageChange5(1)} />
                    <Pagination.Prev
                      onClick={() => handlePageChange5(currentPage5 - 1)}
                      disabled={currentPage5 === 1}
                    />
                    <Pagination.Ellipsis />

                    {displayPages5().map((pageNumber) => (
                      <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPage5}
                        onClick={() => handlePageChange5(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    ))}

                    <Pagination.Ellipsis />
                    <Pagination.Next
                      onClick={() => handlePageChange5(currentPage5 + 1)}
                      disabled={currentPage5 === totalPages5}
                    />
                    <Pagination.Last onClick={() => handlePageChange5(totalPages5)} />
                  </Pagination>
                </div>





              </div>

            )}




 </CardBody>
            </Card>

          </div>

        </div>

      </div>















    </>
  );
}


