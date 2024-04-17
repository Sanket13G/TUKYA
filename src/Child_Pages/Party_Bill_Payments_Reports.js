// import AuthContext from '../Components/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import React, { useEffect, useState, useContext } from 'react';
// import { Button } from 'react-bootstrap';
// import axios from "axios";
// import '../Components/Style.css';
// import DatePicker from "react-datepicker";
// import ipaddress from "../Components/IpAddress";
// import { toast } from "react-toastify";
// import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleRight, faAtom, faBolt, faBoxesPacking, faIdBadge, faHandHoldingHand, faHistory, faList, faList12, faListAlt, faPencil, faPlaneDeparture, faPlus, faPlusCircle, faSearch, faUserCircle, faUsersViewfinder, faFileAlt, faEye, faRefresh, faFilePdf, faFileExcel, faArrowsToEye } from '@fortawesome/free-solid-svg-icons';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';

// export default function Party_Bill_Payments_Reports(props) {
//   const navigate = useNavigate();
//   const [selectedParty, setSelectedParty] = useState("");
//   const [partys, setPartys] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(new Date());

//   const [invoiceDataParty, setInvoiceDataParty] = useState([]);
//   const [invoiceNumber, setInvoiceNumber] = useState([]);
//   const [invoiceDate, setInvoiceDate] = useState([]);
//   const [invoiceAmount, setInvoiceAmount] = useState([]);
//   const [amountPaid, setAmountPaid] = useState([]);
//   const [balanceAmount, setBalanceAmount] = useState([]);
//   const [getpartyId, setGetpartyId] = useState({});


//   const [invoicePartyDataTable, setInvoicePartyDataTable] = useState(false);
//   const [invoiceAllData, setInvoiceAllData] = useState([]);
//   const [invoiceAllDataTable, setInvoiceAllDataTable] = useState(false);

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

//   const formatedDate = (inputDate) => {
//     const date = new Date(inputDate);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${day}/${month}/${year}`;
//   };

//   // If the user is not authenticated, redirect to the login page
//   useEffect(() => {
//     if (!isAuthenticated) {

//       navigate('/login?message=You need to be authenticated to access this page.');
//     }
//   }, [isAuthenticated, navigate]);

//   const formatDate = (inputDate, setTimeTo) => {
//     const date = new Date(inputDate);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     const hours = setTimeTo === "start" ? "00" : "23";
//     const minutes = setTimeTo === "start" ? "00" : "59";
//     return `${year}-${month}-${day} ${hours}:${minutes}`;
//   };


//   const handleReset = () => {
//     setSelectedParty("");
//     setStartDate(null);
//     setEndDate(new Date());
//     setInvoicePartyDataTable(false);
//     setInvoiceDataParty([]);

//   };

//   const handlePartyChange = (event) => {
//     const selectedPartyName = event.target.value;
//     setSelectedParty(selectedPartyName);

//     if (selectedPartyName === "") {
//       // Handle the case when "Select" is chosen, and no party is selected.
//       // You can set default values or perform any other necessary actions here.
//       // setInvoiceAllDataTable(true);

//     } else {
//       const selectedParty = partys.find(
//         (party) => party.partyId === selectedPartyName
//       );

//       if (selectedParty) {
//         // Access the properties of the selected party.
//         const gstRate = selectedParty.taxApplicable === "Y" ? 18 : 0;

//       } else {

//       }
//     }
//   };


//   const handlePrint = async () => {


//     if (startDate && endDate && !selectedParty) {

 

//       const requestData = new FormData();
//       requestData.append('formattedStartDate', formattedStartDate);
//       requestData.append('formattedEndDate', formattedEndDate);


//       try {
//         const response = await axios.post(`http://${ipaddress}Invoice/Print1/${companyid}/${branchId}`, requestData);


//         if (response.status === 200) {
//           const base64PDF = response.data;

//           // Create a new window for displaying the PDF
//           const newWindow = window.open('', '_blank');

//           // Write the HTML content to the new window
//           newWindow.document.write(`
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>PDF Viewer</title>
//         <style>
//           body {
//             margin: 0;
//             padding: 0;
//             overflow: hidden;
//           }
//           embed {
//             width: 100vw;
//             height: 100vh;
//           }
//         </style>
//       </head>
//       <body>
//         <embed src="data:application/pdf;base64,${base64PDF}" type="application/pdf" width="100%" height="100%">
//       </body>
//       </html>
//     `);
//         } else {
//           console.error('Failed to generate PDF. Status:', response.status);
//           throw new Error('Failed to generate PDF');
//         }
//       } catch (error) {
//         console.error('Error calling server:', error);
//         // Handle the error, e.g., show an error message to the user
//       }


//     }

//     else if (startDate && endDate && selectedParty) {
     

//       const requestData = new FormData();
//       requestData.append('formattedStartDate', formattedStartDate);
//       requestData.append('formattedEndDate', formattedEndDate);
//       // console.log(companyid);

//       try {
//         const response = await axios.post(`http://${ipaddress}Invoice/Print2/${companyid}/${branchId}/${selectedParty}`, requestData)


      

//         if (response.status === 200) {

//           const base64PDF = response.data;

//           // Create a new window for displaying the PDF
//           const newWindow = window.open('', '_blank');

//           // Write the HTML content to the new window
//           newWindow.document.write(`
//             <!DOCTYPE html>
//             <html>
//             <head>
//               <title>PDF Viewer</title>
//               <style>
//                 body {
//                   margin: 0;
//                   padding: 0;
//                   overflow: hidden;
//                 }
//                 embed {
//                   width: 100vw;
//                   height: 100vh;
//                 }
//               </style>
//             </head>
//             <body>
//               <embed src="data:application/pdf;base64,${base64PDF}" type="application/pdf" width="100%" height="100%">
//             </body>
//             </html>
//           `);
//         } else {
//           throw new Error('Failed to generate PDF');
//         }
//       } catch (error) {
//       }

//     }




//   };


//   const [serNoArray, setSerNoArray] = useState([]);


  


//   const handlePDF = async () => {


//     if (startDate && endDate && !selectedParty) {

//       const requestData = new FormData();
//       requestData.append('formattedStartDate', formattedStartDate);
//       requestData.append('formattedEndDate', formattedEndDate);


//       try {
//         const response = await axios.post(`http://${ipaddress}Invoice/Print1/${companyid}/${branchId}`, requestData);


//         if (response.status === 200) {
//           const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

//           // Create a Blob from the Base64 data
//           const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

//           // Create a URL for the Blob
//           const blobUrl = URL.createObjectURL(pdfBlob);

//           // Create an anchor element for downloading
//           const downloadLink = document.createElement('a');
//           downloadLink.href = blobUrl;
//           downloadLink.download = 'bill_invoice.pdf'; // Set the filename for the downloaded PDF
//           downloadLink.style.display = 'none';
//           document.body.appendChild(downloadLink);

//           // Trigger the download
//           downloadLink.click();

//           // Clean up
//           document.body.removeChild(downloadLink);
//           window.URL.revokeObjectURL(blobUrl);


//         } else {
//           throw new Error('Failed to generate PDF');
//         }
//       } catch (error) {
//       }

//     }


//     else if (startDate && endDate && selectedParty) {

//       const requestData = new FormData();
//       requestData.append('formattedStartDate', formattedStartDate);
//       requestData.append('formattedEndDate', formattedEndDate);


//       try {
//         const response = await axios.post(`http://${ipaddress}Invoice/Print2/${companyid}/${branchId}/${selectedParty}`, requestData);


//         if (response.status === 200) {
//           const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

//           // Create a Blob from the Base64 data
//           const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

//           // Create a URL for the Blob
//           const blobUrl = URL.createObjectURL(pdfBlob);

//           // Create an anchor element for downloading
//           const downloadLink = document.createElement('a');
//           downloadLink.href = blobUrl;
//           downloadLink.download = 'bill_invoice.pdf'; // Set the filename for the downloaded PDF
//           downloadLink.style.display = 'none';
//           document.body.appendChild(downloadLink);

//           // Trigger the download
//           downloadLink.click();

//           // Clean up
//           document.body.removeChild(downloadLink);
//           window.URL.revokeObjectURL(blobUrl);

        

//         } else {
//           throw new Error('Failed to generate PDF');
//         }
//       } catch (error) {
//       }

//     }


//   };


//   const handleXLS = async () => {
//     if (startDate && endDate && !selectedParty) {
//       const requestData = new FormData();
//       requestData.append('formattedStartDate', formattedStartDate);
//       requestData.append('formattedEndDate', formattedEndDate);
  
//       try {
//         const response = await axios.post(`http://${ipaddress}Invoice/Excel1/${companyid}/${branchId}`, requestData);
  
//         if (response.status === 200) {
//           const xlsxBase64 = response.data; // Assuming response.data contains the Base64-encoded XLSX
  
//           // Create a Blob from the Base64 data
//           const xlsxBlob = new Blob([Uint8Array.from(atob(xlsxBase64), c => c.charCodeAt(0))], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
//           // Create a URL for the Blob
//           const blobUrl = URL.createObjectURL(xlsxBlob);
  
//           // Create an anchor element for downloading
//           const downloadLink = document.createElement('a');
//           downloadLink.href = blobUrl;
//           downloadLink.download = 'party-bill-payment-report.xlsx'; // Set the filename for the downloaded XLSX
//           downloadLink.style.display = 'none';
//           document.body.appendChild(downloadLink);
  
//           // Trigger the download
//           downloadLink.click();
  
//           // Clean up
//           document.body.removeChild(downloadLink);
//           window.URL.revokeObjectURL(blobUrl);
  
//         } else {
//           throw new Error('Failed to generate XLSX');
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     } else if (startDate && endDate && selectedParty) {
//       const requestData = new FormData();
//       requestData.append('formattedStartDate', formattedStartDate);
//       requestData.append('formattedEndDate', formattedEndDate);
  
//       try {
//         const response = await axios.post(`http://${ipaddress}Invoice/Excel2/${companyid}/${branchId}/${selectedParty}`, requestData);
  
//         if (response.status === 200) {
//           const xlsxBase64 = response.data; // Assuming response.data contains the Base64-encoded XLSX
  
//           // Create a Blob from the Base64 data
//           const xlsxBlob = new Blob([Uint8Array.from(atob(xlsxBase64), c => c.charCodeAt(0))], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
//           // Create a URL for the Blob
//           const blobUrl = URL.createObjectURL(xlsxBlob);
  
//           // Create an anchor element for downloading
//           const downloadLink = document.createElement('a');
//           downloadLink.href = blobUrl;
//           downloadLink.download = 'party-bill-payment-report.xlsx'; // Set the filename for the downloaded XLSX
//           downloadLink.style.display = 'none';
//           document.body.appendChild(downloadLink);
  
//           // Trigger the download
//           downloadLink.click();
  
//           // Clean up
//           document.body.removeChild(downloadLink);
//           window.URL.revokeObjectURL(blobUrl);
  
       
//         } else {
//           throw new Error('Failed to generate XLSX');
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };
  




















//   const fetchPartyNames = async () => {
//     try {
//       const response = await fetch(
//         `http://${ipaddress}parties/getAll/${companyid}/${branchId}`
//       );
//       const data = await response.json();
//       const namesMap = {};
//       const emailMap = {};
//       const gstNoMap = {};
//       const gstRateMap = {};
//       data.forEach((party) => {
//         namesMap[party.partyId] = party.partyName;
//         emailMap[party.partyId] = party.email; // Store email
//         gstNoMap[party.partyId] = party.gstNo;


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

//   const formattedStartDate = formatDate(startDate, "start");
//   const formattedEndDate = formatDate(endDate, "end");

//   const fetchAllInvoiceData = () => {
//     fetch(
//       `http://${ipaddress}Invoice/invoiceAllDataOfParty?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         if (Array.isArray(data) && data.length > 0) {
//           // Update the 'airlines' state with the fetched data
//           setInvoiceDataParty(data);
//           setInvoiceAllData(data);
//           console.log("Invoice Data Of Particular Party", data);
//           setInvoiceAllDataTable(true);
//           setInvoicePartyDataTable(false);

//           //   setInvoicePartyTypeDataTable(false);
//           //   setInvoiceDataPartyType([]);
//           toast.success("Invoice Data Found", {
//             autoClose: 900,
//             position: "top-center",
//           });
//         } else {
//           console.error("API response is not an array:", data);
//           toast.error("Invoice Data Not Found", {
//             autoClose: 900,
//             position: "top-center",
//           });
//           setInvoiceAllDataTable(false);
//           setInvoicePartyDataTable(false);
//           setInvoiceDataParty([]);
//           //   setInvoicePartyTypeDataTable(false);
//           //   setInvoiceDataPartyType([]);
//         }
//       })
//       .catch((error) => { });
//   };

//   const fetchInvoiceDataOfParty = () => {

//     const formattedStartDate = formatDate(startDate, "start");
//     const formattedEndDate = formatDate(endDate, "end");

//     if (selectedParty) {
//       // Make an API request here to fetch the list of airline names based on the provided criteria
//       fetch(
//         `http://${ipaddress}Invoice/invoiceDataOfParty?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&partyId=${selectedParty}`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           if (Array.isArray(data) && data.length > 0) {
//             // Update the 'airlines' state with the fetched data
//             setInvoiceDataParty(data);
//             setInvoiceAllData(data);
//             console.log("Invoice Data Of Particular Party", data);
//             setInvoiceAllDataTable(true);
//             setInvoicePartyDataTable(false);


//             toast.success("Invoice Data Found", {
//               autoClose: 900,
//               position: "top-center",
//             });
//           } else {
//             console.error("API response is not an array:", data);
//             setInvoiceAllDataTable(false);
//             setInvoicePartyDataTable(false);
//             setInvoiceDataParty([]);
//             toast.error("Invoice Data Not Found", {
//               autoClose: 900,
//               position: "top-center",
//             });

//           }
//         })
//         .catch((error) => { });
//     }
//   };



//   const handleSearch = () => {
//     if (startDate && endDate && !selectedParty) {
    

//       fetchAllInvoiceData();
//     } if (startDate && startDate && selectedParty) {


//       console.log(startDate, startDate, selectedParty);
  
//       fetchInvoiceDataOfParty();
//     }

//   };


//   return (
//     <>
//       <div className="container">
//         <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
//           icon={faFileAlt}
//           style={{
//             marginRight: '8px',
//             color: 'black', // Set the color to golden
//           }}
//         />Party Bill Payments Report</h5>

//         <Card>
//           <CardBody>
//             <Row>

//               <Col md={3}>
//                 <FormGroup>
//                   <label htmlFor="company" className="forlabel">
//                     Select Party
//                   </label>
//                   <select
//                     name="company"
//                     id="dw1"
//                     className=""
//                     onChange={handlePartyChange}
//                     value={selectedParty}
//                   >
//                     <option value="">Select</option>
//                     {partys.map((party) => (
//                       <option key={party.partyId} value={party.partyId}>
//                         {party.partyName}
//                       </option>
//                     ))}
//                   </select>
//                 </FormGroup>
//               </Col>
//               <Col md={3}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Bill Date From <span style={{ color: 'red' }}>*</span></Label>
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
//                 </FormGroup>
//               </Col>
//               <Col md={3}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Bill Date To<span style={{ color: 'red' }}>*</span></Label>
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
//                 </FormGroup>
//               </Col>


//               <Col md={3} style={{ marginTop: 22 }}>
//                 <Button type="button" className="" onClick={handleSearch} disabled={!startDate || !endDate} variant="outline-primary" style={{ marginTop: '10px', marginRight: 10 }}>
//                   <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
//                   Search
//                 </Button>
//                 <Button type="button" className="" onClick={handleReset} variant="outline-danger" style={{ marginTop: '10px' }}>
//                   <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
//                   Reset
//                 </Button>
//               </Col>
//             </Row>


//           </CardBody>
//         </Card>
//         <Card style={{ marginTop: 30 }}>
//           <CardBody>
//             <Row>
//               <Col className='text-end'>
//                 <Button type="button" className="" style={{ marginRight: 10 }} onClick={handlePrint} variant="outline-primary" >
//                   <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
//                   Print
//                 </Button>
//                 <Button type="button" className="" style={{ marginRight: 10 }} onClick={handleXLS} variant="outline-success" >
//                   <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '5px' }} />
//                   XLS
//                 </Button>
//                 <Button type="button" className="" variant="outline-primary" onClick={handlePDF}  >
//                   <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />
//                   PDF
//                 </Button>
//               </Col>
//             </Row>
//             <Table style={{ marginTop: 10 }} striped responsive bordered>

//               <thead>
//                 <tr>
//                   <th style={{ background: '#BADDDA' }}>Sr. No</th>
//                   <th style={{ background: '#BADDDA' }}>Party Name</th>
//                   <th style={{ background: '#BADDDA' }}>Invoice Number</th>
//                   <th style={{ background: '#BADDDA' }}>Invoice Date</th>
//                   <th style={{ background: '#BADDDA' }}>Invoice Amount</th>
//                   <th style={{ background: '#BADDDA' }}>Amount Paid</th>
//                   <th style={{ background: '#BADDDA' }}>Balance Amount</th>

//                 </tr>
//               </thead>
//               <tbody>
//                 {invoiceDataParty.map((item, index) => {
//                   return (
//                     <React.Fragment key={index}>
//                       <tr>
//                         <td>{index + 1}</td>

//                         <td>{getpartyId[item.partyId]}</td>
//                         {/* <td>{item.partyId}</td> */}
//                         <td>{item.invoiceNO}</td>
//                         <td>{formatedDate(item.invoiceDate)}</td>
//                         <td>{item.totalInvoiceAmount}</td>

//                         <td>{item.clearedAmt}</td>

//                         <td>{item.totalInvoiceAmount - item.clearedAmt}</td>
//                       </tr>
//                     </React.Fragment>
//                   );
//                 })}
//               </tbody>
//             </Table>
//           </CardBody>
//         </Card>
//       </div>
//     </>
//   )
// }


import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import axios from "axios";
import '../Components/Style.css';
import DatePicker from "react-datepicker";
import ipaddress from "../Components/IpAddress";
import { toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAtom, faBolt, faBoxesPacking, faIdBadge, faHandHoldingHand, faHistory, faList, faList12, faListAlt, faPencil, faPlaneDeparture, faPlus, faPlusCircle, faSearch, faUserCircle, faUsersViewfinder, faFileAlt, faEye, faRefresh, faFilePdf, faFileExcel, faArrowsToEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';

export default function Party_Bill_Payments_Reports(props) {
  const navigate = useNavigate();
  const [selectedParty, setSelectedParty] = useState("");
  const [partys, setPartys] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(new Date());

  const [invoiceDataParty, setInvoiceDataParty] = useState([]);
  const [invoiceNumber, setInvoiceNumber] = useState([]);
  const [invoiceDate, setInvoiceDate] = useState([]);
  const [invoiceAmount, setInvoiceAmount] = useState([]);
  const [amountPaid, setAmountPaid] = useState([]);
  const [balanceAmount, setBalanceAmount] = useState([]);
  const [getpartyId, setGetpartyId] = useState({});


  const [invoicePartyDataTable, setInvoicePartyDataTable] = useState(false);
  const [invoiceAllData, setInvoiceAllData] = useState([]);
  const [invoiceAllDataTable, setInvoiceAllDataTable] = useState(false);

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

  const formatedDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {

      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  const formatDate = (inputDate, setTimeTo) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = setTimeTo === "start" ? "00" : "23";
    const minutes = setTimeTo === "start" ? "00" : "59";
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };


  const handleReset = () => {
    setSelectedParty("");
    setStartDate(null);
    setEndDate(new Date());
    setInvoicePartyDataTable(false);
    setInvoiceDataParty([]);

  };

  const handlePartyChange = (event) => {
    const selectedPartyName = event.target.value;
    setSelectedParty(selectedPartyName);

    if (selectedPartyName === "") {
      // Handle the case when "Select" is chosen, and no party is selected.
      // You can set default values or perform any other necessary actions here.
      // setInvoiceAllDataTable(true);

    } else {
      const selectedParty = partys.find(
        (party) => party.partyId === selectedPartyName
      );

      if (selectedParty) {
        // Access the properties of the selected party.
        const gstRate = selectedParty.taxApplicable === "Y" ? 18 : 0;

      } else {

      }
    }
  };


  const handlePrint = async () => {


    if (startDate && endDate && !selectedParty) {



      const requestData = new FormData();
      requestData.append('formattedStartDate', formattedStartDate);
      requestData.append('formattedEndDate', formattedEndDate);


      try {
        const response = await axios.post(`http://${ipaddress}Invoice/Print1/${companyid}/${branchId}`, requestData);


        if (response.status === 200) {
          const base64PDF = response.data;

          // Create a new window for displaying the PDF
          const newWindow = window.open('', '_blank');

          // Write the HTML content to the new window
          newWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>PDF Viewer</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          embed {
            width: 100vw;
            height: 100vh;
          }
        </style>
      </head>
      <body>
        <embed src="data:application/pdf;base64,${base64PDF}" type="application/pdf" width="100%" height="100%">
      </body>
      </html>
    `);
        } else {
          console.error('Failed to generate PDF. Status:', response.status);
          throw new Error('Failed to generate PDF');
        }
      } catch (error) {
        console.error('Error calling server:', error);
        // Handle the error, e.g., show an error message to the user
      }


    }

    else if (startDate && endDate && selectedParty) {


      const requestData = new FormData();
      requestData.append('formattedStartDate', formattedStartDate);
      requestData.append('formattedEndDate', formattedEndDate);
      // console.log(companyid);

      try {
        const response = await axios.post(`http://${ipaddress}Invoice/Print2/${companyid}/${branchId}/${selectedParty}`, requestData)




        if (response.status === 200) {

          const base64PDF = response.data;

          // Create a new window for displaying the PDF
          const newWindow = window.open('', '_blank');

          // Write the HTML content to the new window
          newWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>PDF Viewer</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  overflow: hidden;
                }
                embed {
                  width: 100vw;
                  height: 100vh;
                }
              </style>
            </head>
            <body>
              <embed src="data:application/pdf;base64,${base64PDF}" type="application/pdf" width="100%" height="100%">
            </body>
            </html>
          `);
        } else {
          throw new Error('Failed to generate PDF');
        }
      } catch (error) {
      }

    }




  };


  const [serNoArray, setSerNoArray] = useState([]);





  const handlePDF = async () => {


    if (startDate && endDate && !selectedParty) {

      const requestData = new FormData();
      requestData.append('formattedStartDate', formattedStartDate);
      requestData.append('formattedEndDate', formattedEndDate);


      try {
        const response = await axios.post(`http://${ipaddress}Invoice/Print1/${companyid}/${branchId}`, requestData);


        if (response.status === 200) {
          const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

          // Create a Blob from the Base64 data
          const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

          // Create a URL for the Blob
          const blobUrl = URL.createObjectURL(pdfBlob);

          // Create an anchor element for downloading
          const downloadLink = document.createElement('a');
          downloadLink.href = blobUrl;
          downloadLink.download = 'bill_invoice.pdf'; // Set the filename for the downloaded PDF
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);

          // Trigger the download
          downloadLink.click();

          // Clean up
          document.body.removeChild(downloadLink);
          window.URL.revokeObjectURL(blobUrl);


        } else {
          throw new Error('Failed to generate PDF');
        }
      } catch (error) {
      }

    }


    else if (startDate && endDate && selectedParty) {

      const requestData = new FormData();
      requestData.append('formattedStartDate', formattedStartDate);
      requestData.append('formattedEndDate', formattedEndDate);


      try {
        const response = await axios.post(`http://${ipaddress}Invoice/Print2/${companyid}/${branchId}/${selectedParty}`, requestData);


        if (response.status === 200) {
          const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

          // Create a Blob from the Base64 data
          const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

          // Create a URL for the Blob
          const blobUrl = URL.createObjectURL(pdfBlob);

          // Create an anchor element for downloading
          const downloadLink = document.createElement('a');
          downloadLink.href = blobUrl;
          downloadLink.download = 'bill_invoice.pdf'; // Set the filename for the downloaded PDF
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);

          // Trigger the download
          downloadLink.click();

          // Clean up
          document.body.removeChild(downloadLink);
          window.URL.revokeObjectURL(blobUrl);



        } else {
          throw new Error('Failed to generate PDF');
        }
      } catch (error) {
      }

    }


  };


  const handleXLS = async () => {
    if (startDate && endDate && !selectedParty) {
      const requestData = new FormData();
      requestData.append('formattedStartDate', formattedStartDate);
      requestData.append('formattedEndDate', formattedEndDate);

      try {
        const response = await axios.post(`http://${ipaddress}Invoice/Excel1/${companyid}/${branchId}`, requestData);

        if (response.status === 200) {
          const xlsxBase64 = response.data; // Assuming response.data contains the Base64-encoded XLSX

          // Create a Blob from the Base64 data
          const xlsxBlob = new Blob([Uint8Array.from(atob(xlsxBase64), c => c.charCodeAt(0))], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

          // Create a URL for the Blob
          const blobUrl = URL.createObjectURL(xlsxBlob);

          // Create an anchor element for downloading
          const downloadLink = document.createElement('a');
          downloadLink.href = blobUrl;
          downloadLink.download = 'party-bill-payment-report.xlsx'; // Set the filename for the downloaded XLSX
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);

          // Trigger the download
          downloadLink.click();

          // Clean up
          document.body.removeChild(downloadLink);
          window.URL.revokeObjectURL(blobUrl);

        } else {
          throw new Error('Failed to generate XLSX');
        }
      } catch (error) {
        console.error(error);
      }
    } else if (startDate && endDate && selectedParty) {
      const requestData = new FormData();
      requestData.append('formattedStartDate', formattedStartDate);
      requestData.append('formattedEndDate', formattedEndDate);

      try {
        const response = await axios.post(`http://${ipaddress}Invoice/Excel2/${companyid}/${branchId}/${selectedParty}`, requestData);

        if (response.status === 200) {
          const xlsxBase64 = response.data; // Assuming response.data contains the Base64-encoded XLSX

          // Create a Blob from the Base64 data
          const xlsxBlob = new Blob([Uint8Array.from(atob(xlsxBase64), c => c.charCodeAt(0))], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

          // Create a URL for the Blob
          const blobUrl = URL.createObjectURL(xlsxBlob);

          // Create an anchor element for downloading
          const downloadLink = document.createElement('a');
          downloadLink.href = blobUrl;
          downloadLink.download = 'party-bill-payment-report.xlsx'; // Set the filename for the downloaded XLSX
          downloadLink.style.display = 'none';
          document.body.appendChild(downloadLink);

          // Trigger the download
          downloadLink.click();

          // Clean up
          document.body.removeChild(downloadLink);
          window.URL.revokeObjectURL(blobUrl);


        } else {
          throw new Error('Failed to generate XLSX');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };





















  const fetchPartyNames = async () => {
    try {
      const response = await fetch(
        `http://${ipaddress}parties/getAll/${companyid}/${branchId}`
      );
      const data = await response.json();
      const namesMap = {};
      const emailMap = {};
      const gstNoMap = {};
      const gstRateMap = {};
      data.forEach((party) => {
        namesMap[party.partyId] = party.partyName;
        emailMap[party.partyId] = party.email; // Store email
        gstNoMap[party.partyId] = party.gstNo;


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

  const formattedStartDate = formatDate(startDate, "start");
  const formattedEndDate = formatDate(endDate, "end");

  const fetchAllInvoiceData = () => {
    fetch(
      `http://${ipaddress}Invoice/invoiceAllDataOfParty?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Update the 'airlines' state with the fetched data
          setInvoiceDataParty(data);
          setInvoiceAllData(data);
          console.log("Invoice Data Of Particular Party", data);
          setInvoiceAllDataTable(true);
          setInvoicePartyDataTable(false);

          //   setInvoicePartyTypeDataTable(false);
          //   setInvoiceDataPartyType([]);
          toast.success("Invoice Data Found", {
            autoClose: 900,
            position: "top-center",
          });
        } else {
          console.error("API response is not an array:", data);
          toast.error("Invoice Data Not Found", {
            autoClose: 900,
            position: "top-center",
          });
          setInvoiceAllDataTable(false);
          setInvoicePartyDataTable(false);
          setInvoiceDataParty([]);
          //   setInvoicePartyTypeDataTable(false);
          //   setInvoiceDataPartyType([]);
        }
      })
      .catch((error) => { });
  };

  const fetchInvoiceDataOfParty = () => {

    const formattedStartDate = formatDate(startDate, "start");
    const formattedEndDate = formatDate(endDate, "end");

    if (selectedParty) {
      // Make an API request here to fetch the list of airline names based on the provided criteria
      fetch(
        `http://${ipaddress}Invoice/invoiceDataOfParty?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&partyId=${selectedParty}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            // Update the 'airlines' state with the fetched data
            setInvoiceDataParty(data);
            setInvoiceAllData(data);
            console.log("Invoice Data Of Particular Party", data);
            setInvoiceAllDataTable(true);
            setInvoicePartyDataTable(false);


            toast.success("Invoice Data Found", {
              autoClose: 900,
              position: "top-center",
            });
          } else {
            console.error("API response is not an array:", data);
            setInvoiceAllDataTable(false);
            setInvoicePartyDataTable(false);
            setInvoiceDataParty([]);
            toast.error("Invoice Data Not Found", {
              autoClose: 900,
              position: "top-center",
            });

          }
        })
        .catch((error) => { });
    }
  };



  const handleSearch = () => {
    if (startDate && endDate && !selectedParty) {


      fetchAllInvoiceData();
    } if (startDate && startDate && selectedParty) {


      console.log(startDate, startDate, selectedParty);

      fetchInvoiceDataOfParty();
    }

  };

  // Extracting Totals 
  let totalInvoiceAmount = 0;
  let totalClearedAmount = 0;

  invoiceDataParty.forEach((item) => {
    totalInvoiceAmount += item.totalInvoiceAmount;
    totalClearedAmount += item.clearedAmt;
  });

  // Calculate totalBalanceAmount separately
  const totalBalanceAmount = totalInvoiceAmount - totalClearedAmount;









  return (
    <>
      <div className="container">
        <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
          icon={faFileAlt}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        />Party Bill Payments Report</h5>

        <Card>
          <CardBody>
            <Row>

              <Col md={3}>
                <FormGroup>
                  <label htmlFor="company" className="forlabel">
                    Select Party
                  </label>
                  <select
                    name="company"
                    id="dw1"
                    className=""
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
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Bill Date From <span style={{ color: 'red' }}>*</span></Label>
                  <div className="input-group">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="dd/MM/yyyy" // You can customize the date format
                      name="startDate"
                      required
                      className="form-control border-right-0 inputField"
                      customInput={<input style={{ width: "18vw" }} />}
                    />
                  </div>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Bill Date To<span style={{ color: 'red' }}>*</span></Label>
                  <div className="input-group">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      dateFormat="dd/MM/yyyy" // You can customize the date format
                      name="endDate"
                      required
                      className="form-control border-right-0 inputField"
                      customInput={<input style={{ width: "18vw" }} />}
                    />
                  </div>{" "}
                </FormGroup>
              </Col>


              <Col md={3} style={{ marginTop: 22 }}>
                <Button type="button" className="" onClick={handleSearch} disabled={!startDate || !endDate} variant="outline-primary" style={{ marginTop: '10px', marginRight: 10 }}>
                  <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                  Search
                </Button>
                <Button type="button" className="" onClick={handleReset} variant="outline-danger" style={{ marginTop: '10px' }}>
                  <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                  Reset
                </Button>
              </Col>
            </Row>


          </CardBody>
        </Card>



        {invoiceDataParty.length > 0 && (

        <Card style={{ marginTop: 30 }}>
          <CardBody>
            <Row>
              <Col className='text-end'>
                <Button type="button" className="" style={{ marginRight: 10 }} onClick={handlePrint} variant="outline-primary" >
                  <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                  Print
                </Button>
                <Button type="button" className="" style={{ marginRight: 10 }} onClick={handleXLS} variant="outline-success" >
                  <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '5px' }} />
                  XLS
                </Button>
                <Button type="button" className="" variant="outline-primary" onClick={handlePDF}  >
                  <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />
                  PDF
                </Button>
              </Col>
            </Row>
            <Table style={{ marginTop: 10 }} striped responsive bordered>

              <thead>
                <tr>
                  <th style={{ background: '#BADDDA' }}>Sr. No</th>
                  <th style={{ background: '#BADDDA' }}>Party Name</th>
                  <th style={{ background: '#BADDDA' }}>Invoice Number</th>
                  <th style={{ background: '#BADDDA' }}>Invoice Date</th>
                  <th style={{ background: '#BADDDA' }}>Invoice Amount</th>
                  <th style={{ background: '#BADDDA' }}>Amount Paid</th>
                  <th style={{ background: '#BADDDA' }}>Balance Amount</th>

                </tr>
              </thead>
              <tbody>
                {invoiceDataParty.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{index + 1}</td>

                        <td>{getpartyId[item.partyId]}</td>
                        {/* <td>{item.partyId}</td> */}
                        <td>{item.invoiceNO}</td>
                        <td>{formatedDate(item.invoiceDate)}</td>
                        <td>{item.totalInvoiceAmount}</td>

                        <td>{item.clearedAmt}</td>

                        <td>{item.totalInvoiceAmount - item.clearedAmt}</td>
                      </tr>
                    </React.Fragment>
                  );
                })}
                <tr>
                  <td colSpan="7"></td>
                </tr>
              </tbody>
              <tfoot>

                <tr>
                  <td colSpan="4"><b>Total</b></td>
                  <td colSpan="1"><b>{totalInvoiceAmount}</b></td>
                  <td colSpan="1"><b>{totalClearedAmount}</b></td>
                  <td colSpan="1"><b>{totalBalanceAmount}</b></td>
                </tr>
              </tfoot>

            </Table>
          </CardBody>
        </Card>
        )}
      </div>
    </>
  )
}


