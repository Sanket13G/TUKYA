// // import AuthContext from '../Components/AuthProvider';
// // import { useNavigate } from 'react-router-dom';
// // import React, { useEffect, useState, useContext } from 'react';

// // import Table from 'react-bootstrap/Table';
// // import { Modal } from 'react-bootstrap';
// // import { Button, Pagination } from 'react-bootstrap';
// // import Rate_Chart_Service from "../services/Rate_Chart_Service";
// // import InviceService from '../services/InviceService';
// // import { Card, CardBody, Row, Col, FormGroup, Label, Input } from "reactstrap";
// // import Select from 'react-select';
// // import Swal from 'sweetalert2';
// // import DatePicker from "react-datepicker";
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faSearch, faSave, faServer, faAdd, faCross, faMultiply, faBolt, faDownLong, faDownload, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
// // import { toast } from 'react-toastify';
// // import '../Components/Style.css';
// // function Payment_and_bill() {
// //   const navigate = useNavigate();
// //   const { isAuthenticated } = useContext(AuthContext);
// //   const [parties, setParties] = useState([]);

// //   const [partiesByInviceType, setpartiesByInviceType] = useState([]);

// //   const [partyName, setparty_Name] = useState('');
// //   const [partyName2, setparty_Name2] = useState('');
// //   const [partyName3, setparty_Name3] = useState('');
// //   const [partyId2, setPartyId2] = useState('');
// //   const [partyId3, setPartyId3] = useState('');
// //   const [partyData, setPartyData] = useState([]);
// //   const [partyData2, setPartyData2] = useState([]);
// //   const [partyData3, setPartyData3] = useState([]);
// //   const [combinewResults, setcombinewResults] = useState([]);
// //   const [errors, setErrors] = useState({});
// //   const [modalContent, setModalContent] = useState({});
// //   const [modalType, setModalType] = useState('');
// //   const [heavyModel, setHeavyModel] = useState(false);
// //   const closeHeavyModel = () => { setHeavyModel(false); }
// //   const [InvoiceData, setInvoiceData] = useState([]);
// //   const [InvoiceNo, setInvoiceNo] = useState('');


// //   const makeFieldEmpty = () => {
// //     setparty_Name(''); setPartyId(''); setPartyId2(''); setPartyId3('');
// //     setparty_Name2(''); setparty_Name3(''); setPartyData([]); setPartyData2([]); setPartyData3([]);

// //     setcombinewResults([]); setErrors([]); setInvoiceData([]); setInvoiceNo('');
// //     setInvoicePayment([]);
// //     setInvoiceDataHistory([]);














// //   };



// //   // const [InvoiceDetail, setInvoiceDetail] = useState({});
// //   const openHeavModal = (data, type) => {

// //     console.log(data);
// //     if ((type === 'export' && data.exportHpStatus !== 0) || (type === 'import' && data.importHpStatus !== 0) || (type === 'exportpc' && data.exportPcStatus !== 0) ||
// //       (type === 'exportsc' && data.exportScStatus !== 0) || (type === 'importsc' && data.importScStatus !== 0) || (type === 'importpc' && data.importPcStatus !== 0) ||
// //       (type === 'exportoc' && data.exportScStatus !== 0) || (type === 'importsc' && data.exportScStatus !== 0) || (type === 'holiday' && data.holidayStatus !== 0)) {
// //       setHeavyModel(true);
// //       setModalType(type);
// //       setModalContent(data);
// //     }

// //   };

// //   const [totalRate, setTotalRate] = useState(0);
// //   const [niptPackages, setNiptpackages] = useState(0);

// //   // Pagination 
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 15; // Number of items to display per page

// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = combinewResults.slice(indexOfFirstItem, indexOfLastItem);
// //   const totalPages = Math.ceil(combinewResults.length / itemsPerPage);
// //   const handlePageChange = (page) => {
// //     setCurrentPage(page);
// //   };

// //   const displayPages2 = () => {
// //     const centerPageCount = 5;
// //     const middlePage = Math.floor(centerPageCount / 2);
// //     let startPage = currentPage - middlePage;
// //     let endPage = currentPage + middlePage;

// //     if (startPage < 1) {
// //       startPage = 1;
// //       endPage = Math.min(totalPages, centerPageCount);
// //     }

// //     if (endPage > totalPages) {
// //       endPage = totalPages;
// //       startPage = Math.max(1, totalPages - centerPageCount + 1);
// //     }

// //     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
// //   };


// //   function calculateTotalRateForPage(currentItems) {
// //     return currentItems.reduce((acc, record) => {
// //       const importRate = record.importRate || 0;
// //       const exportRate = record.exportRate || 0;
// //       const importScRate = record.importScStatus || 0;
// //       const importPcRate = record.importPcStatus || 0;
// //       const importHeavyRate = record.importHpStatus || 0;
// //       const exportScRate = record.exportScStatus || 0;
// //       const exportPcRate = record.exportPcStatus || 0;
// //       const exportHeavyRate = record.exportHpStatus || 0;
// //       const HolidayRate = record.holidayStatus || 0;
// //       const importpenalty = record.importpenalty || 0;
// //       const exportpenalty = record.exportpenalty || 0;
// //       const importSubRate = record.importSubRate || 0;
// //       const exportSubRate = record.exportSubRate || 0;
// //       const demuragesRate = record.demuragesRate || 0;
// //       return acc + importRate + demuragesRate + exportRate + importSubRate + exportSubRate + HolidayRate + importScRate + importPcRate + importHeavyRate + exportScRate + exportPcRate + exportHeavyRate + importpenalty + exportpenalty;
// //     }, 0);
// //   }


// //   function calculateNiptNop(current) {
// //     return current.reduce((acc, record) => {
// //       const niptPackages = record.niptPackages || 0;

// //       return acc + niptPackages;

// //     }, 0);
// //   };



// //   useEffect(() => {
// //     // Calculate the total rate for the current page
// //     const totalRateForPage = calculateTotalRateForPage(currentItems);

// //     const totalNiptPackages = calculateNiptNop(currentItems);

// //     setNiptpackages(totalNiptPackages);
// //     // Update the total rate state
// //     setTotalRate(totalRateForPage);
// //   }, [currentItems]);




// //   // Function to get the modal header based on modalType
// //   const getModalHeader = (modalType) => {
// //     switch (modalType) {
// //       case 'export':
// //         return 'Export Heavy Weight';
// //       case 'import':
// //         return 'Import Heavy Weight';
// //       case 'importsc':
// //         return 'Import Special Carting';
// //       case 'exportsc':
// //         return 'Export Special Carting';
// //       case 'importpc':
// //         return 'Import Personal Carriage';
// //       case 'exportpc':
// //         return 'Export Personal Carriage';
// //       case 'holiday':
// //         return 'Holiday';
// //       default:
// //         return 'Default Header';
// //     }
// //   };

// //   // Function to get the input label based on modalType
// //   const getInputLabel = (modalType) => {
// //     switch (modalType) {
// //       case 'export':
// //         return 'Export Package Weight';
// //       case 'import':
// //         return 'Import Package Weight';
// //       case 'importsc':
// //         return 'Import Package';
// //       case 'exportsc':
// //         return 'Export Package';
// //       case 'importpc':
// //         return 'Import Package';
// //       case 'exportpc':
// //         return 'Export Package';
// //       case 'holiday':
// //         return 'Holiday';
// //       default:
// //         return 'Default Label';
// //     }
// //   };

// //   // Function to get the input rate label based on modalType
// //   const getInputRateLabel = (modalType) => {
// //     switch (modalType) {
// //       case 'export':
// //         return 'Export Heavy Weight Rate';
// //       case 'import':
// //         return 'Import Heavy Weight Rate';
// //       case 'importsc':
// //         return 'Import Special Carting Rate';
// //       case 'exportsc':
// //         return 'Export Special Carting  Rate';
// //       case 'importpc':
// //         return 'Import Personal Carriage Rate';
// //       case 'exportpc':
// //         return 'Export Personal Carriage Rate';
// //       case 'holiday':
// //         return 'Holiday Rate';
// //       default:
// //         return 'Default Rate Label';
// //     }
// //   };

// //   // Function to get the input value based on modalType and modalContent
// //   const getInputValue = (modalType, modalContent) => {
// //     switch (modalType) {
// //       case 'export':
// //         return modalContent.exportHpWeight;
// //       case 'import':
// //         return modalContent.importHpWeight;
// //       case 'importsc':
// //         return modalContent.nop;
// //       case 'exportsc':
// //         return modalContent.exportNoOfPackages;
// //       case 'importpc':
// //         return modalContent.nop;
// //       case 'exportpc':
// //         return modalContent.exportNoOfPackages;
// //       case 'holiday':
// //         return modalContent.totalPackages;
// //       default:
// //         return '';
// //     }
// //   };

// //   // Function to get the input rate value based on modalType and modalContent
// //   const getInputRateValue = (modalType, modalContent) => {
// //     switch (modalType) {
// //       case 'export':
// //         return modalContent.exportHpStatus;
// //       case 'import':
// //         return modalContent.importHpStatus;
// //       case 'importsc':
// //         return modalContent.importScStatus;
// //       case 'exportsc':
// //         return modalContent.exportScStatus;
// //       case 'importpc':
// //         return modalContent.importPcStatus;
// //       case 'exportpc':
// //         return modalContent.exportPcStatus;
// //       case 'holiday':
// //         return modalContent.holidayStatus;
// //       default:
// //         return '';
// //     }
// //   };













// //   const {
// //     jwtToken,
// //     userId,
// //     username,
// //     branchId,
// //     companyid,
// //     role,
// //     companyname,
// //     branchname,
// //     logintype,
// //     logintypeid,

// //     login,
// //     logout,
// //   } = useContext(AuthContext);


// //   useEffect(() => {
// //     findParties();
// //     findPartiesByInvoiceType();
// //   }, []);




// //   const SearchPartyAmount = (partyId) => {

// //     alert("Party" + partyId)



// //   };

// //   const openAdvanceModel = () => {
// //     setadvancemodel(true);
// //   };


// //   // Proforma History
// //   const [partyName6, setpartyName6] = useState('');
// //   const [partyId6, setPartyId6] = useState('');
// //   const [ProformaDataHistory, setProformaDataHistory] = useState([]);

// //   const handlePartyChange6 = selectedOption => {
// //     setpartyName6(selectedOption ? selectedOption.label : '');
// //     setPartyId6(selectedOption ? selectedOption.value : '');


// //   };

// //   const SearchProformaHistry = async (partyId) => {

// //     if (!partyName6) {
// //       return toast.error("Please Select Party!", {
// //         position: toast.POSITION.TOP_CENTER,
// //         autoClose: 600,
// //       });

// //     } else {
// //       const response = await InviceService.getProformaByPartyId(companyid, branchId, partyId);
// //       setProformaDataHistory(response.data);
// //     }

// //   };

// //   // download Single Bill
// //   const downloadSingleProforma = async (partyId, invoiceNo) => {
// //     try {
// //       const response = await InviceService.getSingleBillPDFromBillsTab(companyid, branchId, partyId, invoiceNo);

// //       if (response.status === 200) {
// //         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

// //         // Create a Blob from the Base64 data
// //         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

// //         // Create a URL for the Blob
// //         const blobUrl = URL.createObjectURL(pdfBlob);

// //         // Create an anchor element for downloading
// //         const downloadLink = document.createElement('a');
// //         downloadLink.href = blobUrl;
// //         downloadLink.download = 'bill_invoice.pdf'; // Set the filename for the downloaded PDF
// //         downloadLink.style.display = 'none';
// //         document.body.appendChild(downloadLink);

// //         // Trigger the download
// //         downloadLink.click();

// //         // Clean up
// //         document.body.removeChild(downloadLink);
// //         window.URL.revokeObjectURL(blobUrl);

// //         toast.success("Downloading Pdf!", {
// //           position: toast.POSITION.TOP_CENTER,
// //           autoClose: 800,
// //         });
// //       } else {
// //         // Handle other status codes (e.g., error responses) as needed
// //         console.error("Error downloading PDF:", response.statusText);
// //         // Handle the error, show an error message, etc.
// //       }
// //     } catch (error) {
// //       console.error("Error downloading PDF:", error);
// //       // Handle the error, show an error message, etc.
// //     }
// //   };

// //   // Download Single Invice 
// //   const downloadSingleProformaFromTab = async (partyId, invoiceNo) => {
// //     try {

// //       const response = await InviceService.getSingleProformaPDFromBillsTab(companyid, branchId, partyId, invoiceNo);


// //       if (response.status === 200) {
// //         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

// //         // Create a Blob from the Base64 data
// //         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

// //         // Create a URL for the Blob
// //         const blobUrl = URL.createObjectURL(pdfBlob);

// //         // Create an anchor element for downloading
// //         const downloadLink = document.createElement('a');
// //         downloadLink.href = blobUrl;
// //         downloadLink.download = 'Annexure.pdf'; // Set the filename for the downloaded PDF
// //         downloadLink.style.display = 'none';
// //         document.body.appendChild(downloadLink);

// //         // Trigger the download
// //         downloadLink.click();

// //         // Clean up
// //         document.body.removeChild(downloadLink);
// //         window.URL.revokeObjectURL(blobUrl);

// //         toast.success("Downloading Pdf!", {
// //           position: toast.POSITION.TOP_CENTER,
// //           autoClose: 800,
// //         });
// //       } else {
// //         // Handle other status codes (e.g., error responses) as needed
// //         console.error("Error downloading PDF:", response.statusText);
// //         // Handle the error, show an error message, etc.
// //       }
// //     } catch (error) {
// //       console.error("Error downloading PDF:", error);
// //       // Handle the error, show an error message, etc.
// //     }

// //   };






















// //   const findPartiesByInvoiceType = async () => {
// //     const partyResponse = await Rate_Chart_Service.getAllPartiesByInviceType(companyid, branchId, "Instant");
// //     const partyOptions = partyResponse.data.map(party => ({
// //       value: party.partyId,
// //       label: party.partyName
// //     }));
// //     setpartiesByInviceType(partyOptions);

// //   };


// //   // Getall Parties
// //   const findParties = async () => {
// //     const partyResponse = await Rate_Chart_Service.getAllParties(companyid, branchId);
// //     const partyOptions = partyResponse.data.map(party => ({
// //       value: party.partyId,
// //       label: party.partyName
// //     }));
// //     setParties(partyOptions);

// //   };

// //   const formatDateTime = (value) => {
// //     if (!value) {
// //       return ""; // Return an empty string if value is empty or undefined
// //     }

// //     const date = new Date(value);
// //     const day = String(date.getDate()).padStart(2, "0");
// //     const month = String(date.getMonth() + 1).padStart(2, "0");
// //     const year = date.getFullYear();
// //     return `${day}/${month}/${year}`;
// //   };


// //   const handlePartyChange = selectedOption => {
// //     setparty_Name(selectedOption ? selectedOption.label : '');
// //     setSearchCriteria({ ...searchCriteria, PartyId: selectedOption ? selectedOption.value : '' });
// //   };
// //   const handlePartyChange2 = selectedOption => {
// //     setparty_Name2(selectedOption ? selectedOption.label : '');
// //     setPartyId2(selectedOption ? selectedOption.value : '');


// //   };
// //   const handlePartyChange3 = async (selectedOption, { action }) => {

// //     if (action === 'clear') {
// //       setparty_Name3('');
// //       setPartyId3('');
// //       setInvoicePayment([]);
// //       setAdvAmt(0);
// //       setBalAdvAmt(0);
// //       setPaymentMode('');
// //     }
// //     else {
// //       setparty_Name3(selectedOption ? selectedOption.label : '');
// //       setPartyId3(selectedOption ? selectedOption.value : '');
// //       // getTransByPartyId(selectedOption ? selectedOption.value : '');
// //       getInvoiceDataByPartyId(selectedOption ? selectedOption.value : '');
// //       getbyAdvancePartyId(selectedOption ? selectedOption.value : '')

// //     }

// //   };

// //   const findCombinedResults = async (data) => {
// //     // console.log(data);
// //     const results = await InviceService.getCombinedImportsandxports(data);
// //     // console.log(results.data);
// //     return results.data;
// //   };

// //   // Download Pdf
// //   const downLoadPdf = async (invoiceNo) => {
// //     try {

// //       console.log("Printing   ");
// //       // console.log(invoiceList);
// //       const response = await InviceService.downLoadProforma(companyid, branchId, invoiceNo);

// //       if (response.status === 200) {
// //         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

// //         // Create a Blob from the Base64 data
// //         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

// //         // Create a URL for the Blob
// //         const blobUrl = URL.createObjectURL(pdfBlob);

// //         // Create an anchor element for downloading
// //         const downloadLink = document.createElement('a');
// //         downloadLink.href = blobUrl;
// //         downloadLink.download = 'ProformaNoBill.pdf'; // Set the filename for the downloaded PDF
// //         downloadLink.style.display = 'none';
// //         document.body.appendChild(downloadLink);

// //         // Trigger the download
// //         downloadLink.click();

// //         // Clean up
// //         document.body.removeChild(downloadLink);
// //         window.URL.revokeObjectURL(blobUrl);

// //         toast.success("Downloading Pdf!", {
// //           position: toast.POSITION.TOP_CENTER,
// //           autoClose: 800,
// //         });
// //       } else {
// //         // Handle other status codes (e.g., error responses) as needed
// //         console.error("Error downloading PDF:", response.statusText);
// //         // Handle the error, show an error message, etc.
// //       }
// //     } catch (error) {
// //       console.error("Error downloading PDF:", error);
// //       // Handle the error, show an error message, etc.
// //     }
// //   };


// //   // DownLoad Bill

// //   const downLoadBillPdf = async (invoiceNo, invoiceList) => {
// //     try {
// //       const response = await InviceService.downLoadBill(companyid, branchId, invoiceNo, invoiceList);

// //       if (response.status === 200) {
// //         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

// //         // Create a Blob from the Base64 data
// //         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

// //         // Create a URL for the Blob
// //         const blobUrl = URL.createObjectURL(pdfBlob);

// //         // Create an anchor element for downloading
// //         const downloadLink = document.createElement('a');
// //         downloadLink.href = blobUrl;
// //         downloadLink.download = 'Annexure.pdf'; // Set the filename for the downloaded PDF
// //         downloadLink.style.display = 'none';
// //         document.body.appendChild(downloadLink);

// //         // Trigger the download
// //         downloadLink.click();

// //         // Clean up
// //         document.body.removeChild(downloadLink);
// //         window.URL.revokeObjectURL(blobUrl);

// //         toast.success("Downloading Pdf!", {
// //           position: toast.POSITION.TOP_CENTER,
// //           autoClose: 800,
// //         });
// //       } else {
// //         // Handle other status codes (e.g., error responses) as needed
// //         console.error("Error downloading PDF:", response.statusText);
// //         // Handle the error, show an error message, etc.
// //       }
// //     } catch (error) {
// //       console.error("Error downloading PDF:", error);
// //       // Handle the error, show an error message, etc.
// //     }
// //   };

















// //   const findBillingTransaction = async () => {

// //     if (!partyName) {
// //       return toast.error("Please Select Party!", {
// //         position: toast.POSITION.TOP_CENTER,
// //         autoClose: 600,
// //       });

// //     } else {
// //       const result = await findCombinedResults(searchCriteria);
// //       setcombinewResults(result);

// //       console.log("Combined Results ");
// //       console.log(result.data);
// //     }


// //     // console.log(result);
// //   };





// //   const initialSearchCriteria = {
// //     companyid: companyid,
// //     branchId: branchId,
// //     userId: userId,
// //     PartyId: '',
// //     startDate: new Date().toISOString(),
// //     endDate: new Date().toISOString(),

// //   };
// //   const initialSearchCriteria2 =
// //   {
// //     companyid: companyid,
// //     branchId: branchId,
// //     PartyId: '',
// //     startDate: new Date().toISOString(),
// //     endDate: new Date().toISOString(),
// //     invoiceNo: ''
// //   };

// //   const [InvoiceHistoryData, setInvoiceHistoryData] = useState([]);
// //   const [currentPage1, setCurrentPage1] = useState(1);
// //   const itemsPerPage1 = 30; // Number of items to display per page



// //   // Calculate the start and end indices for the current page
// //   const indexOfLastItem1 = currentPage1 * itemsPerPage1;
// //   const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
// //   const currentItems1 = InvoiceHistoryData.slice(indexOfFirstItem1, indexOfLastItem1);
// //   const totalPages1 = Math.ceil(InvoiceHistoryData.length / itemsPerPage1);

// //   // console.log("total Pages "+totalPages1);
// //   const handlePageChange1 = (page) => {
// //     setCurrentPage1(page);
// //   };

// //   const displayPages = () => {
// //     const centerPageCount = 5;
// //     const middlePage = Math.floor(centerPageCount / 2);
// //     let startPage = currentPage1 - middlePage;
// //     let endPage = currentPage1 + middlePage;

// //     if (startPage < 1) {
// //       startPage = 1;
// //       endPage = Math.min(totalPages1, centerPageCount);
// //     }

// //     if (endPage > totalPages1) {
// //       endPage = totalPages1;
// //       startPage = Math.max(1, totalPages1 - centerPageCount + 1);
// //     }

// //     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
// //   };



// //   const [searchCriteria2, setSearchCriteria2] = useState(initialSearchCriteria2);
// //   const [partyName5, setparty_Name5] = useState('');
// //   const [invoiceNumbers, setInvoiceNumbers] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const response = await InviceService.SearchInvoiceNoList({ params: searchCriteria2 });
// //       // console.log("Invoice List");
// //       // console.log(response.data);
// //       setInvoiceNumbers(response.data);
// //       // Handle the response or set it in the state
// //     };

// //     if (partyName5) {
// //       fetchData();
// //     }
// //   }, [searchCriteria2]); // This will trigger whenever searchCriteria2 changes


// //   const handlePartyChange5 = async selectedOption => {
// //     const partyId = selectedOption ? selectedOption.value : '';
// //     setparty_Name5(selectedOption ? selectedOption.label : '');

// //     // Update the state in the callback of setSearchCriteria2
// //     setSearchCriteria2(prevSearchCriteria => ({
// //       ...prevSearchCriteria,
// //       PartyId: partyId
// //     }));
// //   };
// //   const findHistory = async () => {
// //     if (!partyName5) {
// //       return toast.error("Please Select Party!", {
// //         position: toast.POSITION.TOP_CENTER,
// //         autoClose: 600,
// //       });
// //     }
// //     const response = await InviceService.SearchInvoiceNoListByInvoiceHistoryNumber({ params: searchCriteria2 });
// //     if (!response.data || response.data.length === 0) {
// //       toast.error("No records found!", {
// //         position: toast.POSITION.TOP_CENTER,
// //         autoClose: 600,
// //       });
// //       setInvoiceHistoryData([]);
// //     } else {
// //       setInvoiceHistoryData(response.data);
// //     }



// //     // console.log("Demurage History ");
// //     // console.log(response.data);

// //   };



// //   const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria);
// //   // const resetSearchCriteria = () => {
// //   //   setSearchCriteria(initialSearchCriteria);
// //   // };

// //   const datesArray = combinewResults.map(item => item.date);

// //   // Find the lowest and highest dates
// //   const lowestDate = new Date(Math.min(...datesArray));
// //   const highestDate = new Date(Math.max(...datesArray));


// //   const GenerateInvoice = async () => {
// //     Swal.fire({
// //       title: 'Are you sure?',
// //       html: `Generating Proforma for <b>${partyName}</b> from  ${formatDateTime(lowestDate)} to ${formatDateTime(highestDate)}!`,
// //       showCancelButton: true,
// //       width: 'auto',
// //       confirmButtonText: 'OK',
// //       customClass: {
// //         title: 'your-custom-title-class1', // Define a custom class for the title
// //         cancelButton: 'your-custom-cancel-button-class', // Define a custom class for the cancel button
// //         confirmButton: 'your-custom-confirm-button-class', // Define a custom class for the confirm button
// //         content: 'your-custom-content-class', // Define a custom class for the content
// //       },
// //       buttonsStyling: false,
// //     }).then((result) => {
// //       if (result.isConfirmed) {
// //         handleGenerateInvoice();
// //       }
// //     });

// //     const modal = document.querySelector('.swal2-popup');
// //     if (modal) {
// //       modal.style.bottom = '6vw'; // Adjust the top value as needed
// //     }
// //   };


// //   // Getting Invoice Detail list By Invoice Number

// //   const getInvoiceDetailByInvoiceNumber = async (partyId, invoiceno) => {

// //     await InviceService.getInvoiceDetailByInvoiceNo(companyid, branchId, partyId, invoiceno).then((res) => {

// //       setInvoiceData(res.data);
// //       setInvoiceNo(invoiceno);

// //     });
// //   };




// //   const handleGenerateInvoice = async () => {


// //     try {
// //       const response = await InviceService.generateInvoice(searchCriteria);

// //       getInvoiceDetailByInvoiceNumber(response.data.partyId, response.data.proformaNo);

// //       toast.success("Invoice Created Sccessfully", {
// //         position: toast.POSITION.TOP_CENTER,
// //         autoClose: 600,
// //       });
// //       findBillingTransaction();
// //       // Handle the successful response here
// //     } catch (error) {
// //       // Handle the error here
// //       toast.error("Something Went Wrong!", {
// //         position: toast.POSITION.TOP_CENTER,
// //         autoClose: 600,
// //       });
// //       findBillingTransaction();
// //       console.error("An error occurred while generating the invoice:", error);
// //       // You can also display an error message to the user if needed
// //     }
// //   };

// //   // If the user is not authenticated, redirect to the login page
// //   useEffect(() => {
// //     if (!isAuthenticated) {
// //       navigate(
// //         "/login?message=You need to be authenticated to access this page."
// //       );
// //     }
// //   }, [isAuthenticated, navigate]);




// //   // /////////////****************////////////////////////*******************/////********/*//////////////////// */ */ */


// //   const [InvoiceDataHistory, setInvoiceDataHistory] = useState([]);
// //   const SearchInvoiceHistry = async (partiId2) => {



// //     if (!partyName2) {
// //       return toast.error("Please Select Party!", {
// //         position: toast.POSITION.TOP_CENTER,
// //         autoClose: 600,
// //       });

// //     } else {
// //       const response = await InviceService.getMainByPartyId(companyid, branchId, partiId2);
// //       setInvoiceDataHistory(response.data);
// //     }
// //   };

// //   // download Single Bill
// //   const downloadSingleBill = async (partyId, invoiceNo) => {
// //     try {
// //       const response = await InviceService.getSingleBillPDFromBillsTab(companyid, branchId, partyId, invoiceNo);

// //       if (response.status === 200) {
// //         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

// //         // Create a Blob from the Base64 data
// //         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

// //         // Create a URL for the Blob
// //         const blobUrl = URL.createObjectURL(pdfBlob);

// //         // Create an anchor element for downloading
// //         const downloadLink = document.createElement('a');
// //         downloadLink.href = blobUrl;
// //         downloadLink.download = 'Annexure.pdf'; // Set the filename for the downloaded PDF
// //         downloadLink.style.display = 'none';
// //         document.body.appendChild(downloadLink);

// //         // Trigger the download
// //         downloadLink.click();

// //         // Clean up
// //         document.body.removeChild(downloadLink);
// //         window.URL.revokeObjectURL(blobUrl);

// //         toast.success("Downloading Pdf!", {
// //           position: toast.POSITION.TOP_CENTER,
// //           autoClose: 800,
// //         });
// //       } else {
// //         // Handle other status codes (e.g., error responses) as needed
// //         console.error("Error downloading PDF:", response.statusText);
// //         // Handle the error, show an error message, etc.
// //       }
// //     } catch (error) {
// //       console.error("Error downloading PDF:", error);
// //       // Handle the error, show an error message, etc.
// //     }
// //   };

// //   // Download Single Invice 
// //   const downloadSingleInvice = async (partyId, invoiceNo) => {
// //     try {

// //       const response = await InviceService.getSingleInvicePDFromBillsTab(companyid, branchId, partyId, invoiceNo);


// //       if (response.status === 200) {
// //         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

// //         // Create a Blob from the Base64 data
// //         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

// //         // Create a URL for the Blob
// //         const blobUrl = URL.createObjectURL(pdfBlob);

// //         // Create an anchor element for downloading
// //         const downloadLink = document.createElement('a');
// //         downloadLink.href = blobUrl;
// //         downloadLink.download = 'Invoice.pdf'; // Set the filename for the downloaded PDF
// //         downloadLink.style.display = 'none';
// //         document.body.appendChild(downloadLink);

// //         // Trigger the download
// //         downloadLink.click();

// //         // Clean up
// //         document.body.removeChild(downloadLink);
// //         window.URL.revokeObjectURL(blobUrl);

// //         toast.success("Downloading Pdf!", {
// //           position: toast.POSITION.TOP_CENTER,
// //           autoClose: 800,
// //         });
// //       } else {
// //         // Handle other status codes (e.g., error responses) as needed
// //         console.error("Error downloading PDF:", response.statusText);
// //         // Handle the error, show an error message, etc.
// //       }
// //     } catch (error) {
// //       console.error("Error downloading PDF:", error);
// //       // Handle the error, show an error message, etc.
// //     }

// //   };

// //   // Download Single Demurages Report


// //   // downloadSingleDemurages

// //   const downloadSingleDemurages = async (partyId, invoiceNo) => {
// //     try {

// //       const response = await InviceService.getSingleDemuragesPDFromBillsTab(companyid, branchId, partyId, invoiceNo);


// //       if (response.status === 200) {
// //         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

// //         // Create a Blob from the Base64 data
// //         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

// //         // Create a URL for the Blob
// //         const blobUrl = URL.createObjectURL(pdfBlob);

// //         // Create an anchor element for downloading
// //         const downloadLink = document.createElement('a');
// //         downloadLink.href = blobUrl;
// //         downloadLink.download = 'Demurages Report.pdf'; // Set the filename for the downloaded PDF
// //         downloadLink.style.display = 'none';
// //         document.body.appendChild(downloadLink);

// //         // Trigger the download
// //         downloadLink.click();

// //         // Clean up
// //         document.body.removeChild(downloadLink);
// //         window.URL.revokeObjectURL(blobUrl);

// //         toast.success("Downloading Pdf!", {
// //           position: toast.POSITION.TOP_CENTER,
// //           autoClose: 800,
// //         });
// //       } else {
// //         // Handle other status codes (e.g., error responses) as needed
// //         console.error("Error downloading PDF:", response.statusText);
// //         // Handle the error, show an error message, etc.
// //       }
// //     } catch (error) {
// //       console.error("Error downloading PDF:", error);
// //       // Handle the error, show an error message, etc.
// //     }

// //   };


// //   //  make Advance tab Empty

// //   const makeAdvanceTabEmpty = () => {
// //     setTransId(''); setDocType(''); setTransDate(new Date()); setPartyId(''); setPaymentMode(''); setChequeNo(''); setChequeDate(null);
// //     setBankName(''); setsrNo(0); setTransactionNo(''); setTransactionDate(null); setTransactionAmt(0); setTransbankName(''); setCurrency('');
// //     setReceiptAmt(0); setNarration(''); setClearedAmt(0); setAdvTransId(''); setAdvTransDate(null); setAdvFlag(''); setBalAdvAmt(0); setAdvAmt(0);
// //     setBankReconFlag(''); setBankReconDate(null); setBankReconAmt(0); setTdsPercentage(0); setTdsAmt(0); setTdsStatus(''); setCreatedBy(''); setCreatedDate(null);
// //     setEditedBy(''); setEditedDate(null); setApprovedBy(''); setApprovedDate(null);


// //   };
// //   // **************************************************************************************************
// //   // Payement Section 

// //   const [transId, setTransId] = useState('');
// //   const [docType, setDocType] = useState('');
// //   const [transDate, setTransDate] = useState(new Date()); // Initialize with null for Date
// //   const [partyId, setPartyId] = useState('');
// //   const [paymentMode, setPaymentMode] = useState('');
// //   const [chequeNo, setChequeNo] = useState('');
// //   const [chequeDate, setChequeDate] = useState(null);
// //   const [bankName, setBankName] = useState('');
// //   const [srNo, setsrNo] = useState('');
// //   const [transactionNo, setTransactionNo] = useState('');
// //   const [transactionDate, setTransactionDate] = useState(null);
// //   const [transactionAmt, setTransactionAmt] = useState(0); // Initialize with 0 for double
// //   const [transbankName, setTransbankName] = useState('');
// //   const [currency, setCurrency] = useState("INR");
// //   const [receiptAmt, setReceiptAmt] = useState(0);
// //   const [narration, setNarration] = useState('');
// //   const [clearedAmt, setClearedAmt] = useState(0);
// //   const [advTransId, setAdvTransId] = useState('');
// //   const [advTransDate, setAdvTransDate] = useState(new Date);
// //   const [advFlag, setAdvFlag] = useState('');
// //   const [balAdvAmt, setBalAdvAmt] = useState(0);
// //   const [advAmt, setAdvAmt] = useState(0);
// //   const [bankReconFlag, setBankReconFlag] = useState('');
// //   const [bankReconDate, setBankReconDate] = useState(null);
// //   const [bankReconAmt, setBankReconAmt] = useState(0);
// //   const [tdsPercentage, setTdsPercentage] = useState(0);
// //   const [tdsAmt, setTdsAmt] = useState(0);
// //   const [tdsStatus, setTdsStatus] = useState('');
// //   const [createdBy, setCreatedBy] = useState('');
// //   const [createdDate, setCreatedDate] = useState(null);
// //   const [editedBy, setEditedBy] = useState('');
// //   const [editedDate, setEditedDate] = useState(null);
// //   const [approvedBy, setApprovedBy] = useState('');
// //   const [approvedDate, setApprovedDate] = useState(null);
// //   const [invoiceNo, setinvoiceNo] = useState('');
// //   const [invoiceDate, setinvoiceDate] = useState(null);
// //   const [invoiceAmt, setinvoiceAmt] = useState('');
// //   const [advancemodel, setadvancemodel] = useState(false)


// //   const [InvoicePayment, setInvoicePayment] = useState([]);


// //   const getInvoiceDataByPartyId = (partyId) => {

// //     InviceService.getMainByPartyId(companyid, branchId, partyId).then((res) => {

// //       setInvoicePayment(res.data)

// //     });

// //   };


// //   const addAdvance = async (partyId) => {

// //     const newErrors = {};

// //     if (!partyId3) {
// //       newErrors['partyId3'] = 'party is required.';
// //       return setErrors(newErrors);
// //     }
// //     if (!paymentMode) {
// //       newErrors['paymentMode'] = 'paymentMode is required.';
// //       return setErrors(newErrors);
// //     }


// //     if (paymentMode === 'NF' || paymentMode === 'UP') {
// //       if (!transactionAmt) {
// //         newErrors['transactionAmt'] = 'transactionAmt is required.';
// //         return setErrors(newErrors);
// //       }
// //       if (!transactionNo) {
// //         newErrors['transactionNo'] = 'paymentMode is required.';
// //         return setErrors(newErrors);
// //       }
// //       if (!transactionDate) {
// //         newErrors['transactionDate'] = 'transactionDate is required.';
// //         return setErrors(newErrors);
// //       }
// //     };
// //     if (paymentMode === 'CQ') {
// //       if (!chequeNo) {
// //         newErrors['chequeNo'] = 'chequeNo is required.';
// //         return setErrors(newErrors);
// //       }

// //       if (!chequeDate) {
// //         newErrors['chequeDate'] = 'chequeDate is required.';
// //         return setErrors(newErrors);
// //       }

// //       if (!transbankName) {
// //         newErrors['transbankName'] = 'TransbankName is required.';
// //         return setErrors(newErrors);
// //       }
// //       if (!transactionAmt) {
// //         newErrors['transactionAmt'] = 'transactionAmt is required.';
// //         return setErrors(newErrors);
// //       }

// //     };


// //     if (paymentMode === 'CA') {

// //       if (!transactionAmt) {
// //         newErrors['transactionAmt'] = 'transactionAmt is required.';
// //         return setErrors(newErrors);
// //       }


// //     }






// //     const response = await InviceService.addAdvamce(companyid, branchId, partyId, FinTranceData);
// //     toast.success('Advance Amount Added Successfully !', {
// //       position: toast.POSITION.TOP_CENTER,
// //       autoClose: 600,
// //     });
// //     await getTransByReceiptId(response.data.partyId, response.data.transId);
// //   };



// //   const getTransByReceiptId = async (partyId, receiptId) => {
// //     InviceService.getTransByReceiptId(companyid, branchId, receiptId, partyId).then((res) => {
// //       setTransId(res.data.transId);
// //       setDocType(res.data.docType);
// //       setTransDate(res.data.transDate);
// //       setPartyId(res.data.partyId);
// //       setPaymentMode(res.data.paymentMode);
// //       setChequeNo(res.data.chequeNo);
// //       setChequeDate(res.data.chequeDate);
// //       setBankName(res.data.bankName);
// //       setsrNo(res.data.srNo);
// //       setTransactionNo(res.data.transactionNo);
// //       setTransactionDate(res.data.transactionDate);
// //       setTransactionAmt(res.data.transactionAmt);
// //       setTransbankName(res.data.transbankName);
// //       setCurrency(res.data.currency);
// //       setReceiptAmt(res.data.receiptAmt);
// //       setNarration(res.data.narration);
// //       setClearedAmt(res.data.clearedAmt);
// //       setAdvTransId(res.data.advTransId);
// //       setAdvTransDate(res.data.advTransDate);
// //       setAdvFlag(res.data.advFlag);
// //       setBalAdvAmt(res.data.balAdvAmt);
// //       setAdvAmt(res.data.advAmt);
// //       setBankReconFlag(res.data.bankReconFlag);
// //       setBankReconDate(res.data.bankReconDate);
// //       setBankReconAmt(res.data.bankReconDate);
// //       setTdsPercentage(res.data.tdsPercentage);
// //       setTdsAmt(res.data.tdsAmt);
// //       setTdsStatus(res.data.tdsStatus);
// //       setCreatedBy(res.data.createdBy);
// //       setCreatedDate(res.data.createdDate);
// //       setEditedBy(res.data.editedBy);
// //       setEditedDate(res.data.editedDate);
// //       setApprovedBy(res.data.approvedBy);
// //       setApprovedDate(res.data.approvedDate);
// //       setinvoiceNo(res.data.invoiceNo);
// //       setinvoiceDate(res.data.inviceDate);
// //       setinvoiceAmt(res.data.invoiceAmt);
// //     });
// //   };




// //   const getbyAdvancePartyId = async (partyId) => {
// //     const response = await InviceService.getPartyAdvAndClearedAmount(companyid, branchId, partyId);
// //     const [advAndCleared] = response.data;
// //     const [totalAdvAmt, totalClearedAmt] = advAndCleared.split(',').map(value => {
// //       if (value.trim() === 'null') {
// //         return 0; // Replace 'null' strings with 0
// //       }
// //       return parseFloat(value.trim()); // Parse other values to float
// //     });
// //     console.log("Advance Received ");
// //     console.log(response.data);


// //     // console.log("Advance Amount ", totalAdvAmt);
// //     console.log("Cleared Amount ", totalClearedAmt);
// //     console.log("Balance Amount ", totalAdvAmt - totalClearedAmt);
// //     setAdvAmt(totalAdvAmt);
// //     setBalAdvAmt(totalAdvAmt - totalClearedAmt);
// //     // console.log(response.data);
// //   };

// //   const FinTranceData = {
// //     transId, docType, transDate, partyId, paymentMode, chequeNo, chequeDate, bankName, transactionNo,
// //     transactionDate, transactionAmt, currency, receiptAmt, narration, clearedAmt, advTransId, advTransDate, advFlag,
// //     balAdvAmt, advAmt, bankReconFlag, bankReconDate, bankReconAmt, tdsPercentage, tdsAmt, tdsStatus, createdBy, createdDate, editedBy,
// //     editedDate, approvedBy, approvedDate, transbankName
// //   };

// //   const FinTranceDTLData =
// //   {
// //     invoiceNo, transId, transDate, srNo, partyId, invoiceDate, invoiceAmt, receiptAmt, createdBy,
// //     createdDate, editedBy, editedDate, approvedBy, approvedDate
// //   };


// //   const getTransByPartyId = async (partyId) => {
// //     const response = await InviceService.getTransIdByPartyId(companyid, branchId, partyId);

// //     // console.log(partyId);
// //     // console.log(response.data);
// //     setAdvAmt(response.data.advAmt);
// //     setBalAdvAmt(response.data.balAdvAmt);


// //   }



// //   const addAdvanceAmount = () => {


// //   };



// //   //Party

// //   const [InvoiceDataHistory1, setInvoiceDataHistory1] = useState([]);
// //   const SearchInvoiceHistry1 = async () => {
// //     if (logintype === 'Party') {

// //       const response = await InviceService.getMainByPartyId(companyid, branchId, logintypeid);
// //       setInvoiceDataHistory1(response.data);
// //     }


// //   };

// //   useEffect(() => {
// //     SearchInvoiceHistry1();
// //   }, [])



// //   return (

// //     <>
// //       {logintype === 'Party' ? (
// //         <>

// //           {InvoiceDataHistory1.length > 0 ? (
// //             <div>
// //               <h4 className='text-center'>{partyName}</h4>

// //               <Table striped responsive bordered>
// //                 <thead>
// //                   <tr className='text-center'>
// //                     <th style={{ background: '#BADDDA' }}>Sr No</th>
// //                     <th style={{ background: '#BADDDA' }}>Bill No</th>
// //                     <th style={{ background: '#BADDDA' }}>Date</th>
// //                     <th style={{ background: '#BADDDA' }}>Amount</th>
// //                     <th style={{ background: '#BADDDA' }}>Annexure</th>
// //                     <th style={{ background: '#BADDDA' }}>Invice</th>
// //                     {/* <th style={{ background: '#BADDDA' }}>Demurage</th> */}
// //                     <th style={{ background: '#BADDDA' }}>Payment Status</th>

// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {InvoiceDataHistory1.map((invoice, index) =>
// //                     <tr className="text-center dynamic-row-width">
// //                       <td>{index + 1}</td>
// //                       <td>{invoice.billNO}</td>
// //                       <td>{formatDateTime(invoice.invoiceDate)}</td>
// //                       <td>{invoice.totalInvoiceAmount}</td>
// //                       <td>
// //                         <Button
// //                           variant="outline-success"
// //                           onClick={(e) => downloadSingleBill(invoice.partyId, invoice.invoiceNO)}
// //                         >
// //                           <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
// //                           {/* Download */}
// //                         </Button>
// //                       </td>
// //                       <td>

// //                         <Button
// //                           variant="outline-success"
// //                           onClick={(e) => downloadSingleInvice(invoice.partyId, invoice.invoiceNO)}
// //                         >
// //                           <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
// //                           {/* Download */}
// //                         </Button>


// //                       </td>
// //                       {/* <td>

// //                         <Button
// //                           variant="outline-success"
// //                           onClick={(e) => downloadSingleDemurages(invoice.partyId, invoice.invoiceNO)}
// //                         >
// //                           <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
// //                           Download
// //                         </Button>


// //                       </td> */}
// //                       <td>{invoice.paymentStatus === 'P' ? "Pending" : invoice.paymentStatus === 'C' ? "Cleared" : ''}</td>

// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </Table>

// //             </div>



// //           ) : null}

// //         </>
// //       )
// //         :
// //         (
// //           <div className='' style={{ marginTop: 20 }}>
// //             <ul className="nav nav-tabs" id="myTab" role="tablist">
// //               <li className="nav-item tabspace" role="presentation">
// //                 <button style={{ color: 'gray' }} className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"><h6>Billing Transaction</h6></button>
// //               </li>
// //               <li className="nav-item tabspace" role="presentation">
// //                 <button style={{ color: 'gray' }} className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><h6>Bills</h6></button>
// //               </li>

// //               <li className="nav-item tabspace" role="presentation">
// //                 <button style={{ color: 'gray' }} className="nav-link" id="Proforma-tab" data-bs-toggle="tab" data-bs-target="#Proforma" type="button" role="tab" aria-controls="Proforma" aria-selected="false"><h6>Proforma</h6></button>
// //               </li>

// //               <li className="nav-item tabspace" role="presentation">
// //                 <button style={{ color: 'gray' }} className="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" aria-controls="history" aria-selected="false"><h6>History</h6></button>
// //               </li>


// //               <li className="nav-item tabspace" role="presentation">
// //                 <button onClick={() => { makeFieldEmpty(); makeAdvanceTabEmpty(); }} style={{ color: 'gray' }} className="nav-link" id="payment-tab" data-bs-toggle="tab" data-bs-target="#payment" type="button" role="tab" aria-controls="payment" aria-selected="false"><h6>Payment Transaction</h6></button>
// //               </li>

// //               <li className="nav-item tabspace" role="presentation">
// //                 <button onClick={() => { makeFieldEmpty(); makeAdvanceTabEmpty(); }} style={{ color: 'gray' }} className="nav-link" id="advance-tab" data-bs-toggle="tab" data-bs-target="#advance" type="button" role="tab" aria-controls="advance" aria-selected="false"><h6>Add Advance</h6></button>
// //               </li>

// //             </ul>
// //             <div className="tab-content" id="myTabContent">
// //               <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
// //                 <Card>
// //                   <CardBody>
// //                     <Row>
// //                       <Col md={4}>

// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Select Party</Label>
// //                           <Select
// //                             options={partiesByInviceType}
// //                             value={{ value: partyName, label: partyName }}
// //                             onChange={handlePartyChange}
// //                             className={`${errors.partyname ? 'error-border' : ''
// //                               } responsive-select`}
// //                             isClearable
// //                             styles={{
// //                               control: (provided, state) => ({
// //                                 ...provided,
// //                                 border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
// //                                 boxShadow: 'none',
// //                                 '&:hover': {
// //                                   border: '1px solid #ccc'
// //                                 }
// //                               }),
// //                               indicatorSeparator: () => ({
// //                                 display: 'none'
// //                               }),
// //                               dropdownIndicator: () => ({
// //                                 display: 'none'
// //                               })
// //                             }}
// //                           />



// //                         </FormGroup>



// //                       </Col>

// //                       <Col md={3}>
// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">From Date</Label>
// //                           <div>
// //                             <DatePicker
// //                               selected={searchCriteria.startDate ? new Date(searchCriteria.startDate) : null}
// //                               wrapperClassName="custom-react-datepicker-wrapper"
// //                               onChange={(date) => {
// //                                 if (date) {
// //                                   setSearchCriteria({ ...searchCriteria, startDate: date.toISOString() });
// //                                 } else {
// //                                   setSearchCriteria({ ...searchCriteria, startDate: null });
// //                                 }
// //                               }}
// //                               dateFormat="dd/MM/yyyy" // Specify the combined format
// //                               className="form-control"
// //                               customInput={<input style={{ width: '100%' }} />}
// //                             />
// //                           </div>
// //                         </FormGroup>

// //                       </Col>
// //                       <Col md={3}>


// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">To Date</Label>
// //                           <div>
// //                             <DatePicker
// //                               selected={searchCriteria.endDate ? new Date(searchCriteria.endDate) : null}
// //                               wrapperClassName="custom-react-datepicker-wrapper"
// //                               onChange={(date) => {
// //                                 if (date) {
// //                                   setSearchCriteria({ ...searchCriteria, endDate: date.toISOString() });
// //                                 } else {
// //                                   setSearchCriteria({ ...searchCriteria, endDate: null });
// //                                 }
// //                               }}
// //                               dateFormat="dd/MM/yyyy" // Specify the combined format
// //                               className="form-control"
// //                               customInput={<input style={{ width: '100%' }} />}

// //                             />
// //                           </div>
// //                         </FormGroup>


// //                       </Col>
// //                       <Col md={2}>
// //                         <Button
// //                           variant="outline-primary"
// //                           style={{ marginTop: '2vw' }}
// //                           onClick={findBillingTransaction}

// //                         >
// //                           <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
// //                           Search
// //                         </Button>
// //                       </Col>



// //                     </Row>
// //                   </CardBody>
// //                 </Card>

// //                 {combinewResults.length > 0 ? (

// //                   <div className="mt-4">
// //                     <Table responsive bordered className="">
// //                       <thead>
// //                         <tr className="text-center">
// //                           <th rowSpan="2" style={{ width: '15%', background: '#BADDDA' }}>Party</th>
// //                           <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>Date</th>
// //                           <th colSpan="2" style={{ width: '10%', background: '#BADDDA' }}>IMP PKGS</th>
// //                           <th colSpan="2" style={{ width: '10%', background: '#BADDDA' }}>EXP PKGS</th>
// //                           <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>TOT PKGS</th>
// //                           <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>IIND SAT</th>
// //                           <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>DEMURAGES</th>
// //                           <th colSpan="4" style={{ width: '25%', background: '#BADDDA' }}>EXPORT</th>
// //                           <th colSpan="4" style={{ width: '25%', background: '#BADDDA' }}>IMPORT</th>
// //                         </tr>
// //                         <tr className='text-center'>
// //                           <th style={{ width: '6%', background: '#BADDDA' }}>IMP</th>
// //                           <th style={{ width: '6%', background: '#BADDDA' }}>SUB</th>

// //                           <th style={{ width: '6%', background: '#BADDDA' }}>EXP</th>
// //                           <th style={{ width: '6%', background: '#BADDDA' }}>SUB</th>

// //                           <th style={{ width: '8%', background: '#BADDDA' }}>SC</th>
// //                           <th style={{ width: '8%', background: '#BADDDA' }}>HW Wt</th>
// //                           <th style={{ width: '8%', background: '#BADDDA' }}>PC</th>
// //                           <th style={{ width: '8%', background: '#BADDDA' }}>OC</th>
// //                           <th style={{ width: '8%', background: '#BADDDA' }}>SC</th>
// //                           <th style={{ width: '8%', background: '#BADDDA' }}>HW Wt</th>
// //                           <th style={{ width: '8%', background: '#BADDDA' }}>PC</th>
// //                           <th style={{ width: '8%', background: '#BADDDA' }}>OC</th>
// //                         </tr>

// //                       </thead>

// //                       <tbody>

// //                         {currentItems.map((import2, index) =>

// //                           <tr className="text-center dynamic-row-width">
// //                             <td>{import2.partyName}</td>
// //                             <td>{formatDateTime(import2.date)}</td>
// //                             <td>{import2.nop}</td>
// //                             <td>{import2.importSubNop}</td>
// //                             <td>{import2.exportNoOfPackages}</td>
// //                             <td>{import2.exportSubNop}</td>
// //                             <td>{import2.totalPackages}</td>

// //                             <td onClick={() => openHeavModal(import2, 'holiday')}>{import2.holidayStatus}</td>
// //                             <td onClick={() => openHeavModal(import2, 'demurage')}>{import2.demuragesRate}</td>
// //                             <td onClick={() => openHeavModal(import2, 'exportsc')}>{import2.exportScStatus}</td>
// //                             <td onClick={() => openHeavModal(import2, 'export')}>{import2.exportHpStatus}</td>
// //                             <td onClick={() => openHeavModal(import2, 'exportpc')}>{import2.exportPcStatus}</td>
// //                             <td onClick={() => openHeavModal(import2, 'exportoc')}>{import2.exportpenalty}</td>

// //                             <td onClick={() => openHeavModal(import2, 'importsc')}>{import2.importScStatus}</td>
// //                             <td onClick={() => openHeavModal(import2, 'import')}>{import2.importHpStatus}</td>
// //                             <td onClick={() => openHeavModal(import2, 'importpc')}>{import2.importPcStatus}</td>
// //                             {/* <td className="table-column">{import2.importHpStatus}</td> */}
// //                             <td onClick={() => openHeavModal(import2, 'importoc')}>{import2.importpenalty}</td>
// //                           </tr>
// //                         )
// //                         }
// //                       </tbody>
// //                     </Table>
// //                     <div>
// //                       <Row>

// //                         <Col md={1}></Col>
// //                         <Col md={4}>
// //                           <Button
// //                             variant="outline-success"
// //                             style={{ marginTop: '2vw' }}
// //                             onClick={GenerateInvoice}
// //                           >
// //                             <FontAwesomeIcon icon={faBolt} style={{ marginRight: '5px' }} />
// //                             Generate Proforma
// //                           </Button>
// //                         </Col>
// //                         <Col md={3}></Col>
// //                         <Col md={2}>

// //                           <FormGroup>
// //                             <Label className="forlabel" for="branchId">Total NIPT Packages</Label>
// //                             <Input type="text" name="passengerName"
// //                               className="form-control"
// //                               value={niptPackages}
// //                               readOnly
// //                               id='service'
// //                             />
// //                           </FormGroup>
// //                         </Col>
// //                         <Col md={2}>

// //                           <FormGroup>
// //                             <Label className="forlabel" for="branchId">Total Bill</Label>
// //                             <Input type="text" name="passengerName"
// //                               className="form-control"
// //                               value={totalRate}
// //                               readOnly
// //                               id='service'
// //                             />
// //                           </FormGroup>
// //                         </Col>
// //                       </Row>

// //                     </div>

// //                     <div className="text-center">

// //                       <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
// //                         <Pagination.First onClick={() => handlePageChange(1)} />
// //                         <Pagination.Prev
// //                           onClick={() => handlePageChange(currentPage - 1)}
// //                           disabled={currentPage === 1}
// //                         />
// //                         <Pagination.Ellipsis />

// //                         {displayPages2().map((pageNumber) => (
// //                           <Pagination.Item
// //                             key={pageNumber}
// //                             active={pageNumber === currentPage}
// //                             onClick={() => handlePageChange(pageNumber)}
// //                           >
// //                             {pageNumber}
// //                           </Pagination.Item>
// //                         ))}

// //                         <Pagination.Ellipsis />
// //                         <Pagination.Next
// //                           onClick={() => handlePageChange(currentPage + 1)}
// //                           disabled={currentPage === totalPages}
// //                         />
// //                         <Pagination.Last onClick={() => handlePageChange(totalPages)} />
// //                       </Pagination>


// //                       {/* 
// //                   <Pagination>
// //                     <Pagination.Prev
// //                       onClick={() => handlePageChange(currentPage - 1)}
// //                       disabled={currentPage === 1}
// //                     />
// //                     {[...Array(Math.ceil(combinewResults.length / itemsPerPage)).keys()].map((page) => (
// //                       <Pagination.Item
// //                         key={page + 1}
// //                         active={page + 1 === currentPage}
// //                         onClick={() => handlePageChange(page + 1)}
// //                       >
// //                         {page + 1}
// //                       </Pagination.Item>
// //                     ))}
// //                     <Pagination.Next
// //                       onClick={() => handlePageChange(currentPage + 1)}
// //                       disabled={currentPage === Math.ceil(combinewResults.length / itemsPerPage)}
// //                     />
// //                   </Pagination> */}
// //                     </div>



// //                   </div>

// //                 ) : null}

// //                 {InvoiceData.length > 0 ? (
// //                   <div>
// //                     <h4 className='text-center'>{partyName}</h4>

// //                     <Table striped responsive bordered>
// //                       <thead>
// //                         <tr className='text-center'>
// //                           <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>Sr No</th>
// //                           <th rowSpan="2" style={{ width: '8%', background: '#BADDDA' }}>Date</th>
// //                           <th colSpan="2" style={{ width: '5%', background: '#BADDDA' }}>IMP PCKGS</th>
// //                           <th colSpan="2" style={{ width: '5%', background: '#BADDDA' }}>EXP PKGS</th>
// //                           <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>Total PKGS</th>
// //                           <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>IIND SAT</th>
// //                           <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>DEMURAGES</th>
// //                           <th colSpan="4" style={{ width: '30%', background: '#BADDDA' }}>EXPORT</th>
// //                           <th colSpan="4" style={{ width: '30%', background: '#BADDDA' }}>IMPORT</th>
// //                         </tr>
// //                         <tr className='text-center'>
// //                           <th style={{ width: '6%', background: '#BADDDA' }}>IMP</th>
// //                           <th style={{ width: '6%', background: '#BADDDA' }}>SUB</th>

// //                           <th style={{ width: '6%', background: '#BADDDA' }}>EXP</th>
// //                           <th style={{ width: '6%', background: '#BADDDA' }}>SUB</th>
// //                           <th style={{ width: '8%', background: '#BADDDA' }}>SC</th>
// //                           <th style={{ width: '8%', background: '#BADDDA' }}>HW Wt</th>
// //                           <th style={{ width: '8%', background: '#BADDDA' }}>PC</th>
// //                           <th style={{ width: '8%', background: '#BADDDA' }}>OC</th>
// //                           <th style={{ width: '8%', background: '#BADDDA' }}>SC</th>
// //                           <th style={{ width: '8%', background: '#BADDDA' }}>HW Wt</th>
// //                           <th style={{ width: '8%', background: '#BADDDA' }}>PC</th>
// //                           <th style={{ width: '8%', background: '#BADDDA' }}>OC</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {InvoiceData.map((invoice, index) =>
// //                           <tr className="text-center dynamic-row-width">
// //                             <td>{index + 1}</td>
// //                             <td>{formatDateTime(invoice.proformaNoDate)}</td>
// //                             <td>{invoice.importNoOfPackages}</td>
// //                             <td>{invoice.importSubNop}</td>
// //                             <td>{invoice.exportNoOfPackages}</td>
// //                             <td>{invoice.exportSubNop}</td>
// //                             <td>{invoice.totalPackages}</td>
// //                             <td>{invoice.holidayRate}</td>
// //                             <td>{invoice.demuragesRate}</td>
// //                             <td>{invoice.exportScRate}</td>
// //                             <td>{invoice.exportHpRate}</td>
// //                             <td>{invoice.exportPcRate}</td>
// //                             <td>{invoice.exportPenalty}</td>
// //                             <td>{invoice.importScRate}</td>
// //                             <td>{invoice.importHpRate}</td>
// //                             <td>{invoice.importPcRate}</td>
// //                             <td>{invoice.importPenalty}</td>
// //                           </tr>
// //                         )}
// //                       </tbody>
// //                     </Table>
// //                     <Row>
// //                       <Col md={3}>
// //                         <Button
// //                           variant="outline-success"
// //                           style={{ marginTop: '1.7vw' }}
// //                           onClick={() => downLoadPdf(InvoiceNo)}
// //                         >
// //                           <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
// //                           Download Proforma
// //                         </Button></Col>



// //                     </Row>

// //                   </div>



// //                 ) : null}




// //               </div>


// //               <div className="tab-pane fade " id="Proforma" role="tabpanel" aria-labelledby="Proforma-tab">
// //                 <Card>

// //                   <CardBody>

// //                     <Row>
// //                       <Col md={5}>

// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Select Party</Label>


// //                           <Select
// //                             options={parties}
// //                             value={{ value: partyName6, label: partyName6 }}
// //                             onChange={handlePartyChange6}
// //                             className={errors.partyName6 ? 'error-border' : ''}
// //                             isClearable
// //                             styles={{
// //                               control: (provided, state) => ({
// //                                 ...provided,
// //                                 border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
// //                                 boxShadow: 'none',
// //                                 '&:hover': {
// //                                   border: '1px solid #ccc'
// //                                 }
// //                               }),
// //                               indicatorSeparator: () => ({
// //                                 display: 'none'
// //                               }),
// //                               dropdownIndicator: () => ({
// //                                 display: 'none'
// //                               })
// //                             }}
// //                           />
// //                         </FormGroup>

// //                       </Col>

// //                       <Col md={2}>
// //                         <Button
// //                           variant="outline-primary"
// //                           style={{ marginTop: '2vw' }}

// //                           onClick={(e) => SearchProformaHistry(partyId6)}
// //                         >
// //                           <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
// //                           Search
// //                         </Button>
// //                       </Col>
// //                     </Row>

// //                     {/*  Invoice History  */}





// //                     {ProformaDataHistory.length > 0 ? (
// //                       <div>
// //                         <h4 className='text-center'>{partyName}</h4>

// //                         <Table striped responsive bordered>
// //                           <thead>
// //                             <tr className='text-center'>
// //                               <th style={{ background: '#BADDDA' }}>Sr No</th>
// //                               <th style={{ background: '#BADDDA' }}>Proforma No</th>
// //                               <th style={{ background: '#BADDDA' }}>Date</th>
// //                               <th style={{ background: '#BADDDA' }}>Amount</th>
// //                               {/* <th style={{ background: '#BADDDA' }}>Annexure</th> */}
// //                               <th style={{ background: '#BADDDA' }}>Download</th>
// //                               {/* <th style={{ background: '#BADDDA' }}>Demurage</th> */}
// //                               {/* <th style={{ background: '#BADDDA' }}>Payment Status</th> */}

// //                             </tr>
// //                           </thead>
// //                           <tbody>
// //                             {ProformaDataHistory.map((invoice, index) =>
// //                               <tr className="text-center dynamic-row-width">
// //                                 <td>{index + 1}</td>
// //                                 <td>{invoice.proformaNo}</td>
// //                                 <td>{formatDateTime(invoice.proformaDate)}</td>
// //                                 <td>{invoice.totalInvoiceAmount}</td>
// //                                 <td>
// //                                   <Button
// //                                     variant="outline-success"
// //                                     onClick={(e) => downloadSingleProformaFromTab(invoice.partyId, invoice.proformaNo)}
// //                                   >
// //                                     <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
// //                                     {/* Download */}
// //                                   </Button>
// //                                 </td>
// //                                 {/* <td> */}

// //                                 {/* <Button
// //                                     variant="outline-success"
// //                                     onClick={(e) => downloadSingleInvice(invoice.partyId, invoice.invoiceNO)}
// //                                   >
// //                                     <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
// //                                     Download
// //                                   </Button>


// //                                 </td>
// //                                 <td>

// //                                   <Button
// //                                     variant="outline-success"
// //                                     onClick={(e) => downloadSingleDemurages(invoice.partyId, invoice.invoiceNO)}
// //                                   >
// //                                     <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
// //                                     Download
// //                                   </Button>


// //                                 </td> */}
// //                                 {/* <td>{invoice.paymentStatus === 'P' ? "Pending" : invoice.paymentStatus === 'C' ? "Cleared" : ''}</td> */}

// //                               </tr>
// //                             )}
// //                           </tbody>
// //                         </Table>

// //                       </div>



// //                     ) : null}










































// //                   </CardBody>
// //                 </Card>
// //               </div>


// //               <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">



// //                 <Card>

// //                   <CardBody>

// //                     <Row>
// //                       <Col md={5}>

// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Select Party</Label>


// //                           <Select
// //                             options={parties}
// //                             value={{ value: partyName2, label: partyName2 }}
// //                             onChange={handlePartyChange2}
// //                             className={errors.partyName2 ? 'error-border' : ''}
// //                             isClearable
// //                             styles={{
// //                               control: (provided, state) => ({
// //                                 ...provided,
// //                                 border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
// //                                 boxShadow: 'none',
// //                                 '&:hover': {
// //                                   border: '1px solid #ccc'
// //                                 }
// //                               }),
// //                               indicatorSeparator: () => ({
// //                                 display: 'none'
// //                               }),
// //                               dropdownIndicator: () => ({
// //                                 display: 'none'
// //                               })
// //                             }}
// //                           />
// //                         </FormGroup>

// //                       </Col>

// //                       <Col md={2}>
// //                         <Button
// //                           variant="outline-primary"
// //                           style={{ marginTop: '2vw' }}

// //                           onClick={(e) => SearchInvoiceHistry(partyId2)}
// //                         >
// //                           <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
// //                           Search
// //                         </Button>
// //                       </Col>
// //                     </Row>

// //                     {/*  Invoice History  */}





// //                     {InvoiceDataHistory.length > 0 ? (
// //                       <div>
// //                         <h4 className='text-center'>{partyName}</h4>

// //                         <Table striped responsive bordered>
// //                           <thead>
// //                             <tr className='text-center'>
// //                               <th style={{ background: '#BADDDA' }}>Sr No</th>
// //                               <th style={{ background: '#BADDDA' }}>Bill No</th>
// //                               <th style={{ background: '#BADDDA' }}>Date</th>
// //                               <th style={{ background: '#BADDDA' }}>Amount</th>
// //                               <th style={{ background: '#BADDDA' }}>Invoice</th>
// //                               <th style={{ background: '#BADDDA' }}>Annexure</th>
// //                               {/* <th style={{ background: '#BADDDA' }}>Demurage</th> */}
// //                               <th style={{ background: '#BADDDA' }}>Payment Status</th>

// //                             </tr>
// //                           </thead>
// //                           <tbody>
// //                             {InvoiceDataHistory.map((invoice, index) =>
// //                               <tr className="text-center dynamic-row-width">
// //                                 <td>{index + 1}</td>
// //                                 <td>{invoice.billNO}</td>
// //                                 <td>{formatDateTime(invoice.invoiceDate)}</td>
// //                                 <td>{invoice.totalInvoiceAmount}</td>

// //                                 <td>

// //                                   <Button
// //                                     variant="outline-success"
// //                                     onClick={(e) => downloadSingleInvice(invoice.partyId, invoice.invoiceNO)}
// //                                   >
// //                                     <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
// //                                     Download
// //                                   </Button>


// //                                 </td>

// //                                 <td>
// //                                   <Button
// //                                     variant="outline-success"
// //                                     onClick={(e) => downloadSingleBill(invoice.partyId, invoice.invoiceNO)}
// //                                   >
// //                                     <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
// //                                     Download
// //                                   </Button>
// //                                 </td>

// //                                 {/* <td>

// //                                   <Button
// //                                     variant="outline-success"
// //                                     onClick={(e) => downloadSingleDemurages(invoice.partyId, invoice.invoiceNO)}
// //                                   >
// //                                     <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
// //                                     Download
// //                                   </Button>


// //                                 </td> */}
// //                                 <td>{invoice.paymentStatus === 'P' ? "Pending" : invoice.paymentStatus === 'C' ? "Cleared" : ''}</td>

// //                               </tr>
// //                             )}
// //                           </tbody>
// //                         </Table>
// //                       </div>
// //                     ) : null}


// //                   </CardBody>
// //                 </Card>
// //               </div>
// //               {/* History Tab for Bill By SirNo and Hawb No And Master No */}
// //               <div className="tab-pane fade " id="history" role="tabpanel" aria-labelledby="history-tab">
// //                 <Card>
// //                   <CardBody>
// //                     <Row>
// //                       <Col md={2}>
// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">From Date</Label>
// //                           <div>
// //                             <DatePicker
// //                               selected={searchCriteria2.startDate ? new Date(searchCriteria2.startDate) : null}
// //                               wrapperClassName="custom-react-datepicker-wrapper"
// //                               onChange={(date) => {
// //                                 if (date) {
// //                                   setSearchCriteria2({ ...searchCriteria2, startDate: date.toISOString() });
// //                                 } else {
// //                                   setSearchCriteria2({ ...searchCriteria2, startDate: null });
// //                                 }
// //                               }}
// //                               dateFormat="dd/MM/yyyy" // Specify the combined format
// //                               className="form-control"
// //                               customInput={<input style={{ width: '100%' }} />}
// //                             />
// //                           </div>
// //                         </FormGroup>

// //                       </Col>
// //                       <Col md={2}>


// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">To Date</Label>
// //                           <div>
// //                             <DatePicker
// //                               selected={searchCriteria2.endDate ? new Date(searchCriteria2.endDate) : null}
// //                               wrapperClassName="custom-react-datepicker-wrapper"
// //                               onChange={(date) => {
// //                                 if (date) {
// //                                   setSearchCriteria2({ ...searchCriteria2, endDate: date.toISOString() });
// //                                 } else {
// //                                   setSearchCriteria2({ ...searchCriteria2, endDate: null });
// //                                 }
// //                               }}
// //                               dateFormat="dd/MM/yyyy" // Specify the combined format
// //                               className="form-control"
// //                               customInput={<input style={{ width: '100%' }} />}
// //                             />
// //                           </div>
// //                         </FormGroup>
// //                       </Col>
// //                       <Col md={4}>

// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Select Party</Label>
// //                           <Select
// //                             options={parties}
// //                             value={{ value: partyName5, label: partyName5 }}
// //                             onChange={handlePartyChange5}
// //                             className={`${errors.partyName5 ? 'error-border' : ''
// //                               } responsive-select`}
// //                             isClearable
// //                             styles={{
// //                               control: (provided, state) => ({
// //                                 ...provided,
// //                                 border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
// //                                 boxShadow: 'none',
// //                                 '&:hover': {
// //                                   border: '1px solid #ccc'
// //                                 }
// //                               }),
// //                               indicatorSeparator: () => ({
// //                                 display: 'none'
// //                               }),
// //                               dropdownIndicator: () => ({
// //                                 display: 'none'
// //                               })
// //                             }}
// //                           />
// //                         </FormGroup>
// //                       </Col>
// //                       <Col md={2}>
// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Invoice No</Label>
// //                           <select
// //                             className="form-select"
// //                             aria-label="Invoice No"
// //                             value={searchCriteria2.invoiceNo}
// //                             onChange={(e) => setSearchCriteria2({ ...searchCriteria2, invoiceNo: e.target.value })}>
// //                             <option value="">Select Invoice No</option>
// //                             {invoiceNumbers.map((invoiceNo, index) => (
// //                               <option key={index} value={invoiceNo}>
// //                                 {invoiceNo}
// //                               </option>
// //                             ))}
// //                           </select>
// //                         </FormGroup>
// //                       </Col>
// //                       <Col md={2}>
// //                         <Button
// //                           variant="outline-primary"
// //                           style={{ marginTop: '2vw' }}
// //                           onClick={findHistory}
// //                         >
// //                           <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
// //                           Search
// //                         </Button>
// //                       </Col>
// //                     </Row>
// //                   </CardBody>
// //                 </Card>


// //                 {/* Table For Showing History */}

// //                 {InvoiceHistoryData.length > 0 ? (
// //                   <div>
// //                     <h4 className='text-center'>{partyName}</h4>

// //                     <Table striped responsive bordered>
// //                       <thead>
// //                         <tr className='text-center'>
// //                           <th style={{ background: '#BADDDA' }}>Sr No</th>
// //                           <th style={{ background: '#BADDDA' }}>Invoice No </th>
// //                           <th style={{ background: '#BADDDA' }}>Invoice Date </th>
// //                           <th style={{ background: '#BADDDA' }}>HAWB/ReqId</th>
// //                           <th style={{ background: '#BADDDA' }}>SIR/SER</th>
// //                           <th style={{ background: '#BADDDA' }}>Packages</th>
// //                           <th style={{ background: '#BADDDA' }}>In Date </th>
// //                           <th style={{ background: '#BADDDA' }}>Out Date </th>
// //                           <th style={{ background: '#BADDDA' }}>Charges</th>
// //                           <th style={{ background: '#BADDDA' }}>Service Type</th>
// //                         </tr>
// //                       </thead>
// //                       <tbody>
// //                         {currentItems1.map((invoice, index) =>
// //                           <tr className="text-center dynamic-row-width">
// //                             <td>{((currentPage1 - 1) * itemsPerPage1) + index + 1}</td>
// //                             <td>{invoice.inviceNo}</td>
// //                             <td>{formatDateTime(invoice.inviceDate)}</td>
// //                             <td>{invoice.masterNo.startsWith('000') ? '' : invoice.masterNo}</td>
// //                             <td>{invoice.subMasterNo.startsWith('000') ? '' : invoice.subMasterNo}</td>
// //                             <td>{invoice.packages}</td>
// //                             <td>{formatDateTime(invoice.inDate)}</td>
// //                             <td>{formatDateTime(invoice.outDate)}</td>
// //                             <td>{invoice.demurageRate}</td>
// //                             <td>{invoice.packageType}</td>
// //                           </tr>
// //                         )}
// //                       </tbody>
// //                     </Table>


// //                     <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
// //                       <Pagination.First onClick={() => handlePageChange1(1)} />
// //                       <Pagination.Prev
// //                         onClick={() => handlePageChange1(currentPage1 - 1)}
// //                         disabled={currentPage1 === 1}
// //                       />
// //                       <Pagination.Ellipsis />

// //                       {displayPages().map((pageNumber) => (
// //                         <Pagination.Item
// //                           key={pageNumber}
// //                           active={pageNumber === currentPage1}
// //                           onClick={() => handlePageChange1(pageNumber)}
// //                         >
// //                           {pageNumber}
// //                         </Pagination.Item>
// //                       ))}

// //                       <Pagination.Ellipsis />
// //                       <Pagination.Next
// //                         onClick={() => handlePageChange1(currentPage1 + 1)}
// //                         disabled={currentPage1 === totalPages1}
// //                       />
// //                       <Pagination.Last onClick={() => handlePageChange1(totalPages1)} />
// //                     </Pagination>
// //                   </div>



// //                 ) : null}
// //               </div>


// //               <div className="tab-pane fade" id="payment" role="tabpanel" aria-labelledby="payment-tab">

// //                 <Card>
// //                   <CardBody>


// //                     <Row>

// //                       <Col md={3}>

// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Receipt Id</Label>
// //                           <Input
// //                             type="text"
// //                             name="approvedBy"
// //                             id="service"
// //                             readOnly
// //                             value={transId}
// //                             className="inputField"
// //                           />
// //                         </FormGroup>
// //                       </Col>
// //                       <Col md={3}>
// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Receipt Date</Label>
// //                           <div>
// //                             <DatePicker
// //                               selected={transDate}
// //                               wrapperClassName="custom-react-datepicker-wrapper"
// //                               onChange={(date) => {
// //                                 if (date) {
// //                                   setTransDate(date);
// //                                 }
// //                               }}
// //                               value={transDate}
// //                               dateFormat="dd/MM/yyyy"
// //                               className="form-control"
// //                               customInput={<input style={{ width: '100%' }} />}
// //                             />

// //                           </div>
// //                         </FormGroup>
// //                       </Col>
// //                       <Col md={3}>
// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Receipt Amount</Label>
// //                           <Input
// //                             type="number"
// //                             name="receiptAmt"
// //                             value={receiptAmt}
// //                             onChange={(e) => {
// //                               let inputText = e.target.value;
// //                               if (inputText.length > 10) { inputText = inputText.slice(0, 10); }
// //                               setReceiptAmt(inputText);
// //                             }}
// //                           />
// //                         </FormGroup>
// //                       </Col>

// //                       <Col md={3}>
// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Currency</Label>
// //                           <Input
// //                             type="text"
// //                             name="currency"
// //                             value={currency}
// //                             onChange={(e) => setCurrency(e.target.value)}
// //                             maxLength={8}
// //                             defaultValue={currency}
// //                           />
// //                         </FormGroup>
// //                       </Col>
// //                     </Row>
// //                     <Row>
// //                       <Col md={3}>
// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Select Party</Label>
// //                           <Select
// //                             options={parties}
// //                             value={{ value: partyName3, label: partyName3 }}
// //                             onChange={handlePartyChange3}
// //                             className={errors.partyname ? 'error-border' : ''}
// //                             isClearable
// //                             styles={{
// //                               control: (provided, state) => ({
// //                                 ...provided,
// //                                 border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
// //                                 boxShadow: 'none',
// //                                 '&:hover': {
// //                                   border: '1px solid #ccc'
// //                                 }
// //                               }),
// //                               indicatorSeparator: () => ({
// //                                 display: 'none'
// //                               }),
// //                               dropdownIndicator: () => ({
// //                                 display: 'none'
// //                               })
// //                             }}
// //                           />
// //                         </FormGroup>
// //                       </Col>

// //                       <Col md={3}>

// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Advance Amount</Label>
// //                           <Input
// //                             type="text"
// //                             name="approvedBy"
// //                             value={advAmt}
// //                             readOnly
// //                             id='service'
// //                             onChange={(e) => setAdvAmt(e.target.value)}
// //                           />
// //                         </FormGroup>


// //                       </Col>
// //                       <Col md={3}>
// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Balance Amount</Label>
// //                           <Input
// //                             type="text"
// //                             name="balAdvAmt"
// //                             value={balAdvAmt}
// //                             onChange={(e) => setBalAdvAmt(e.target.value)}
// //                             maxLength={8}
// //                             readOnly
// //                             id='service'
// //                           />
// //                         </FormGroup>
// //                       </Col>
// //                       <Col md={3}>
// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Payment Type</Label>
// //                           <select
// //                             className="form-select"
// //                             aria-label="SC Status"
// //                             disabled={InvoicePayment.length === 0} // Disables if InvoicePayment is empty
// //                             value={paymentMode}
// //                             onChange={(e) => setPaymentMode(e.target.value)}
// //                           >
// //                             <option value="">Select Payment Type</option>
// //                             <option value="CQ">CHEQUE</option>
// //                             <option value="NF">NEFT</option>
// //                             <option value="UP">UPI</option>
// //                             <option value="CA">CASH</option>
// //                           </select>
// //                         </FormGroup>
// //                       </Col>
// //                     </Row>


// //                     {/* Add Paymenr By Payment Type  */}


// //                     {paymentMode === 'CQ' ? (
// //                       <Row>

// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" htmlFor="branchId">
// //                               Cheque Number
// //                             </Label>
// //                             <Input
// //                               type="text"
// //                               value={chequeNo}
// //                               onChange={(e) => setChequeNo(e.target.value)}
// //                             />
// //                           </FormGroup>
// //                         </Col>
// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" for="branchId">Cheque Date</Label>
// //                             <div>
// //                               <DatePicker
// //                                 selected={chequeDate}
// //                                 wrapperClassName="custom-react-datepicker-wrapper"
// //                                 onChange={(date) => {
// //                                   if (date) { setChequeDate(date); }
// //                                 }}
// //                                 value={chequeDate}
// //                                 dateFormat="dd/MM/yyyy"
// //                                 className="form-control"
// //                                 customInput={<input style={{ width: '100%' }} />}
// //                               />
// //                             </div>
// //                           </FormGroup>
// //                         </Col>
// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" htmlFor="branchId">
// //                               Bank Name
// //                             </Label>
// //                             <Input
// //                               type="text"
// //                               value={bankName}
// //                               onChange={(e) => setBankName(e.target.value)}
// //                             />
// //                           </FormGroup>
// //                         </Col>
// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" htmlFor="branchId">
// //                               Transaction Amount
// //                             </Label>
// //                             <Input
// //                               type="number"
// //                               value={transactionAmt}
// //                               onChange={(e) => setTransactionAmt(e.target.value)}
// //                               className={errors.transactionAmt ? 'error-border' : ''}
// //                             />
// //                             {errors.transactionAmt && (
// //                               <div className="error-message">
// //                                 {errors.transactionAmt}
// //                               </div>
// //                             )}

// //                           </FormGroup>
// //                         </Col>

// //                       </Row>

// //                     ) : null}

// //                     {paymentMode === 'NF' || paymentMode === 'UP' ? (
// //                       <Row>
// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" htmlFor="branchId">
// //                               Transaction Number
// //                             </Label>
// //                             <Input
// //                               type="text"
// //                               value={transactionNo}
// //                               onChange={(e) => setTransactionNo(e.target.value)}
// //                               className={errors.transactionNo ? 'error-border' : ''}
// //                             />
// //                             {errors.transactionNo && (
// //                               <div className="error-message">
// //                                 {errors.transactionNo}
// //                               </div>
// //                             )}

// //                           </FormGroup>
// //                         </Col>

// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" for="branchId">Transaction Date</Label>
// //                             <div>
// //                               <DatePicker
// //                                 selected={transactionDate}
// //                                 wrapperClassName="custom-react-datepicker-wrapper"
// //                                 onChange={(date) => {
// //                                   if (date) {
// //                                     setTransactionDate(date);
// //                                   }
// //                                 }}
// //                                 value={transactionDate}
// //                                 dateFormat="dd/MM/yyyy"
// //                                 className={`form-control ${errors.paymentMode ? 'error-border' : ''}`}
// //                                 customInput={<input style={{ width: '100%' }} />}
// //                               />
// //                               {errors.transactionDate && (
// //                                 <div className="error-message">
// //                                   {errors.transactionDate}
// //                                 </div>
// //                               )}

// //                             </div>
// //                           </FormGroup>
// //                         </Col>

// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" htmlFor="branchId">
// //                               Transaction Amount
// //                             </Label>
// //                             <Input
// //                               type="number"
// //                               value={transactionAmt}
// //                               onChange={(e) => setTransactionAmt(e.target.value)}
// //                               className={errors.transactionDate ? 'error-border' : ''}
// //                             />
// //                             {errors.transactionDate && (
// //                               <div className="error-message">
// //                                 {errors.transactionDate}
// //                               </div>
// //                             )}

// //                           </FormGroup>
// //                         </Col>
// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" htmlFor="branchId">
// //                               Bank Name
// //                             </Label>
// //                             <Input
// //                               type="text"
// //                               value={transbankName}
// //                               onChange={(e) => setTransbankName(e.target.value)}
// //                               className={errors.transbankName ? 'error-border' : ''}
// //                             />
// //                             {errors.transbankName && (
// //                               <div className="error-message">
// //                                 {errors.transbankName}
// //                               </div>
// //                             )}
// //                           </FormGroup>
// //                         </Col>
// //                       </Row>

// //                     ) : null}

// //                     {paymentMode === 'CA' ? (
// //                       <Row>

// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" htmlFor="branchId">
// //                               Amount
// //                             </Label>
// //                             <Input
// //                               type="number"
// //                               value={transactionAmt}
// //                               onChange={(e) => setTransactionAmt(e.target.value)}
// //                               className={errors.transactionAmt ? 'error-border' : ''}
// //                             />
// //                             {errors.transactionAmt && (
// //                               <div className="error-message">
// //                                 {errors.transactionAmt}
// //                               </div>
// //                             )}
// //                           </FormGroup>
// //                         </Col>


// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" for="branchId">Received Date</Label>
// //                             <div>
// //                               <DatePicker
// //                                 selected={transactionDate}
// //                                 wrapperClassName="custom-react-datepicker-wrapper"
// //                                 onChange={(date) => {
// //                                   if (date) {
// //                                     setTransactionDate(date);
// //                                   }
// //                                 }}
// //                                 value={transactionDate}
// //                                 dateFormat="dd/MM/yyyy"
// //                                 className={`form-control ${errors.transactionDate ? 'error-border' : ''}`}
// //                                 customInput={<input style={{ width: '100%' }} />}
// //                               />
// //                               {errors.transactionDate && (
// //                                 <div className="error-message">
// //                                   {errors.transactionDate}
// //                                 </div>
// //                               )}
// //                             </div>
// //                           </FormGroup>
// //                         </Col>
// //                       </Row>
// //                     ) : null}

// //                     <Row>
// //                       <Col md={3}>
// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">TDS Percentage</Label>
// //                           <Input
// //                             type="number"
// //                             name="tdsPercentage"
// //                             onChange={(e) => {
// //                               let inputText = e.target.value;
// //                               // Check if the input has exceeded 10 digits
// //                               if (inputText.length > 2) {
// //                                 // Trim the input to the first 10 digits
// //                                 inputText = inputText.slice(0, 2);
// //                               }
// //                               // Update the state with the sanitized input
// //                               setTdsPercentage(inputText);
// //                             }}
// //                             value={tdsPercentage}
// //                             className="inputField"
// //                           />
// //                         </FormGroup>
// //                       </Col>
// //                       <Col md={3}>
// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">TDS Amount</Label>
// //                           <Input
// //                             type="number"
// //                             name="approvedBy"
// //                             onChange={(e) => {
// //                               let inputText = e.target.value;
// //                               // Check if the input has exceeded 10 digits
// //                               if (inputText.length > 6) {
// //                                 // Trim the input to the first 10 digits
// //                                 inputText = inputText.slice(0, 6);
// //                               }
// //                               // Update the state with the sanitized input
// //                               setTdsAmt(inputText);
// //                             }}

// //                             value={tdsAmt}
// //                             className="inputField"
// //                           />
// //                         </FormGroup>
// //                       </Col>

// //                       <Col md={3}>

// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Remarks</Label>
// //                           <Input
// //                             type="text"
// //                             name="approvedBy"
// //                             value={narration}
// //                             className="inputField"
// //                             onChange={(e) => setNarration(e.target.value)}
// //                             maxLength={50}
// //                           />
// //                         </FormGroup>
// //                       </Col>
// //                     </Row>

// //                     <div className="text-center">
// //                       <Button
// //                         variant="outline-success"
// //                         style={{ marginTop: '2vw' }}
// //                         onClick={SearchPartyAmount}>
// //                         <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
// //                         SAVE
// //                       </Button>
// //                     </div>



// //                     {/* Invice Data For Payment */}


// //                     {InvoicePayment.length > 0 ? (
// //                       <div>
// //                         <h4 className='text-center'>{partyName}</h4>

// //                         <Table striped responsive bordered>
// //                           <thead>
// //                             <tr className='text-center'>
// //                               <th style={{ background: '#BADDDA' }}>Sr No</th>
// //                               <th style={{ background: '#BADDDA' }}>Invice Number</th>
// //                               <th style={{ background: '#BADDDA' }}>Invice Date</th>
// //                               <th style={{ background: '#BADDDA' }}>Invice Amount</th>
// //                               <th style={{ background: '#BADDDA' }}>Cleared Amount</th>
// //                               <th style={{ background: '#BADDDA' }}>Received Amount</th>
// //                             </tr>

// //                           </thead>
// //                           <tbody>
// //                             {InvoicePayment.map((invoice, index) =>
// //                               <tr className="text-center dynamic-row-width">
// //                                 <td>{index + 1}</td>
// //                                 <td>{invoice.invoiceNO}</td>
// //                                 <td>{formatDateTime(invoice.invoiceDate)}</td>
// //                                 <td>{invoice.totalInvoiceAmount}</td>
// //                                 <td>{invoice.clearedAmt}
// //                                 </td>
// //                                 <td className="text-center" style={{ textAlign: 'center' }}>
// //                                   <Input
// //                                     text="number"
// //                                     name="received amount"
// //                                     style={{ display: 'inline-block', width: '40%' }}
// //                                   />
// //                                 </td>

// //                               </tr>
// //                             )}
// //                           </tbody>
// //                         </Table>

// //                       </div>
// //                     ) : null}
// //                   </CardBody>
// //                 </Card>
// //               </div>






// //               <div className="tab-pane fade" id="advance" role="tabpanel" aria-labelledby="advance-tab">
// //                 <Card>
// //                   <CardBody>
// //                     <Row>
// //                       <Col md={3}>
// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Select Party</Label>
// //                           <Select
// //                             options={parties}
// //                             value={{ value: partyName3, label: partyName3 }}
// //                             onChange={handlePartyChange3}
// //                             className={errors.partyId3 ? 'error-border' : ''}
// //                             isClearable
// //                             styles={{
// //                               control: (provided, state) => ({
// //                                 ...provided,
// //                                 border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
// //                                 boxShadow: 'none',
// //                                 '&:hover': {
// //                                   border: '1px solid #ccc'
// //                                 }
// //                               }),
// //                               indicatorSeparator: () => ({
// //                                 display: 'none'
// //                               }),
// //                               dropdownIndicator: () => ({
// //                                 display: 'none'
// //                               })
// //                             }}
// //                           />
// //                           {errors.partyId3 && (
// //                             <div className="error-message">
// //                               {errors.partyId3}
// //                             </div>
// //                           )}
// //                         </FormGroup>
// //                       </Col>

// //                       <Col md={3}>
// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Payment Type</Label>

// //                           <select
// //                             className={`form-select ${errors.paymentMode ? 'error-border' : ''}`}
// //                             aria-label="SC Status"
// //                             value={paymentMode}
// //                             onChange={(e) => setPaymentMode(e.target.value)}
// //                           >
// //                             <option value="">Select Payment Type</option>
// //                             <option value="CQ">CHEQUE</option>
// //                             <option value="NF">NEFT</option>
// //                             <option value="UP">UPI</option>
// //                             <option value="CA">CASH</option>
// //                           </select>

// //                           {errors.paymentMode && (
// //                             <div className="error-message">
// //                               {errors.paymentMode}
// //                             </div>
// //                           )}
// //                         </FormGroup>
// //                       </Col>
// //                       <Col md={3}>
// //                         <FormGroup>
// //                           <Label className="forlabel" htmlFor="branchId">
// //                             Advance Receipt No
// //                           </Label>
// //                           <Input
// //                             type="text"
// //                             value={transId}
// //                             onChange={(e) => setTransId(e.target.value)}
// //                             readOnly
// //                             id='service'
// //                           />
// //                         </FormGroup>
// //                       </Col>

// //                       <Col md={3}>
// //                         <FormGroup>
// //                           <Label className="forlabel" for="branchId">Advance Receipt Date</Label>
// //                           <div>
// //                             <DatePicker
// //                               selected={transDate}
// //                               wrapperClassName="custom-react-datepicker-wrapper"
// //                               onChange={(date) => {
// //                                 if (date) {
// //                                   setTransDate(date);
// //                                 }
// //                               }}
// //                               value={transDate}
// //                               dateFormat="dd/MM/yyyy"
// //                               className="form-control"
// //                               customInput={<input style={{ width: '100%' }} />}
// //                             />

// //                           </div>
// //                         </FormGroup>
// //                       </Col>


// //                     </Row>




// //                     {paymentMode === 'CQ' ? (
// //                       <Row>

// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" htmlFor="branchId">
// //                               Cheque Number
// //                             </Label>
// //                             <Input
// //                               type="text"
// //                               value={chequeNo}
// //                               onChange={(e) => setChequeNo(e.target.value)}
// //                             />
// //                           </FormGroup>
// //                         </Col>
// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" for="branchId">Cheque Date</Label>
// //                             <div>
// //                               <DatePicker
// //                                 selected={chequeDate}
// //                                 wrapperClassName="custom-react-datepicker-wrapper"
// //                                 onChange={(date) => {
// //                                   if (date) { setChequeDate(date); }
// //                                 }}
// //                                 value={chequeDate}
// //                                 dateFormat="dd/MM/yyyy"
// //                                 className="form-control"
// //                                 customInput={<input style={{ width: '100%' }} />}
// //                               />

// //                             </div>
// //                           </FormGroup>
// //                         </Col>
// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" htmlFor="branchId">
// //                               Bank Name
// //                             </Label>
// //                             <Input
// //                               type="text"
// //                               value={bankName}
// //                               onChange={(e) => setBankName(e.target.value)}
// //                             />
// //                           </FormGroup>
// //                         </Col>
// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" htmlFor="branchId">
// //                               Transaction Amount
// //                             </Label>
// //                             <Input
// //                               type="number"
// //                               value={transactionAmt}
// //                               onChange={(e) => setTransactionAmt(e.target.value)}
// //                               className={errors.transactionAmt ? 'error-border' : ''}
// //                             />
// //                             {errors.transactionAmt && (
// //                               <div className="error-message">
// //                                 {errors.transactionAmt}
// //                               </div>
// //                             )}

// //                           </FormGroup>
// //                         </Col>

// //                       </Row>

// //                     ) : null}


// //                     {paymentMode === 'NF' || paymentMode === 'UP' ? (
// //                       <Row>

// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" htmlFor="branchId">
// //                               Transaction Number
// //                             </Label>
// //                             <Input
// //                               type="text"
// //                               value={transactionNo}
// //                               onChange={(e) => setTransactionNo(e.target.value)}
// //                               className={errors.transactionNo ? 'error-border' : ''}
// //                             />
// //                             {errors.transactionNo && (
// //                               <div className="error-message">
// //                                 {errors.transactionNo}
// //                               </div>
// //                             )}

// //                           </FormGroup>
// //                         </Col>


// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" for="branchId">Transaction Date</Label>
// //                             <div>
// //                               <DatePicker
// //                                 selected={transactionDate}
// //                                 wrapperClassName="custom-react-datepicker-wrapper"
// //                                 onChange={(date) => {
// //                                   if (date) {
// //                                     setTransactionDate(date);
// //                                   }
// //                                 }}
// //                                 value={transactionDate}
// //                                 dateFormat="dd/MM/yyyy"
// //                                 className={`form-control ${errors.paymentMode ? 'error-border' : ''}`}
// //                                 customInput={<input style={{ width: '100%' }} />}
// //                               />
// //                               {errors.transactionDate && (
// //                                 <div className="error-message">
// //                                   {errors.transactionDate}
// //                                 </div>
// //                               )}

// //                             </div>
// //                           </FormGroup>
// //                         </Col>


// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" htmlFor="branchId">
// //                               Transaction Amount
// //                             </Label>
// //                             <Input
// //                               type="number"
// //                               value={transactionAmt}
// //                               onChange={(e) => setTransactionAmt(e.target.value)}
// //                               className={errors.transactionDate ? 'error-border' : ''}
// //                             />
// //                             {errors.transactionDate && (
// //                               <div className="error-message">
// //                                 {errors.transactionDate}
// //                               </div>
// //                             )}

// //                           </FormGroup>
// //                         </Col>
// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" htmlFor="branchId">
// //                               Bank Name
// //                             </Label>
// //                             <Input
// //                               type="text"
// //                               value={transbankName}
// //                               onChange={(e) => setTransbankName(e.target.value)}
// //                               className={errors.transbankName ? 'error-border' : ''}
// //                             />
// //                             {errors.transbankName && (
// //                               <div className="error-message">
// //                                 {errors.transbankName}
// //                               </div>
// //                             )}
// //                           </FormGroup>
// //                         </Col>


// //                       </Row>

// //                     ) : null}



// //                     {paymentMode === 'CA' ? (
// //                       <Row>

// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" htmlFor="branchId">
// //                               Amount
// //                             </Label>
// //                             <Input
// //                               type="number"
// //                               value={transactionAmt}
// //                               onChange={(e) => setTransactionAmt(e.target.value)}
// //                               className={errors.transactionAmt ? 'error-border' : ''}
// //                             />

// //                             {errors.transactionAmt && (
// //                               <div className="error-message">
// //                                 {errors.transactionAmt}
// //                               </div>
// //                             )}

// //                           </FormGroup>
// //                         </Col>


// //                         <Col md={3}>
// //                           <FormGroup>
// //                             <Label className="forlabel" for="branchId">Received Date</Label>
// //                             <div>
// //                               <DatePicker
// //                                 selected={transactionDate}
// //                                 wrapperClassName="custom-react-datepicker-wrapper"
// //                                 onChange={(date) => {
// //                                   if (date) {
// //                                     setTransactionDate(date);
// //                                   }
// //                                 }}
// //                                 value={transactionDate}
// //                                 dateFormat="dd/MM/yyyy"
// //                                 className={`form-control ${errors.transactionDate ? 'error-border' : ''}`}
// //                                 customInput={<input style={{ width: '100%' }} />}
// //                               />
// //                               {errors.transactionDate && (
// //                                 <div className="error-message">
// //                                   {errors.transactionDate}
// //                                 </div>
// //                               )}
// //                             </div>
// //                           </FormGroup>
// //                         </Col>
// //                       </Row>

// //                     ) : null}


// //                     <div className="text-center">

// //                       <Button
// //                         variant="outline-success"
// //                         style={{ marginTop: '1.5vw' }}
// //                         onClick={() => addAdvance(partyId3)}>
// //                         <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
// //                         ADD
// //                       </Button>
// //                     </div>

// //                   </CardBody>
// //                 </Card>
// //               </div>

// //             </div>
// //           </div >



// //         )

// //       }



// //       {/* Weight Showing Model */}

// //       <Modal show={heavyModel} onHide={closeHeavyModel} size="lg">
// //         <div className='modal-content'>

// //           <div className="modal-header-bg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
// //             <div style={{ flex: '1' }}>
// //               <h4 className="text-center mb-1">{getModalHeader(modalType)}</h4>
// //             </div>
// //             <FontAwesomeIcon icon={faMultiply} style={{ marginLeft: '5px', cursor: 'pointer', height: '1.5vw' }} onClick={closeHeavyModel} />
// //           </div>
// //           <hr style={{ marginTop: '0.5vw', marginBottom: '0.5vw' }} />
// //           <Row style={{ marginLeft: '2vw', marginRight: '2vw' }}>
// //             <Col>
// //               <FormGroup>
// //                 <Label className="forlabel" htmlFor="branchId">
// //                   {getInputLabel(modalType)}
// //                 </Label>
// //                 <Input
// //                   type="text"
// //                   name="mobile"
// //                   id="service"
// //                   value={getInputValue(modalType, modalContent)}
// //                 />
// //               </FormGroup>
// //             </Col>
// //             <Col>
// //               <FormGroup>
// //                 <Label className="forlabel" htmlFor="branchId">
// //                   {getInputRateLabel(modalType)}
// //                 </Label>
// //                 <Input
// //                   type="text"
// //                   name="mobile"
// //                   id="service"
// //                   value={getInputRateValue(modalType, modalContent)}
// //                 />
// //               </FormGroup>
// //             </Col>
// //           </Row>

// //         </div>
// //       </Modal>

// //     </>
// //   );
// // };
// // export default Payment_and_bill;




// import AuthContext from '../Components/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import React, { useEffect, useState, useContext } from 'react';

// import Table from 'react-bootstrap/Table';
// import { Modal } from 'react-bootstrap';
// import { Button, Pagination } from 'react-bootstrap';
// import Rate_Chart_Service from "../services/Rate_Chart_Service";
// import InviceService from '../services/InviceService';
// import { Card, CardBody, Row, Col, FormGroup, Label, Input } from "reactstrap";
// import Select from 'react-select';
// import Swal from 'sweetalert2';
// import DatePicker from "react-datepicker";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faSave, faServer, faAdd, faCross, faMultiply, faBolt, faDownLong, faDownload, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
// import { toast } from 'react-toastify';
// import '../Components/Style.css';
// import ReactLoading from 'react-loading';
// function Payment_and_bill() {
//   const styles = {
//     overlay: {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity and color as needed
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 9999, // Ensure the overlay is above other elements
//     },
// };





//   const navigate = useNavigate();
//   const { isAuthenticated } = useContext(AuthContext);
//   const [parties, setParties] = useState([]);

//   const [partiesByInviceType, setpartiesByInviceType] = useState([]);

//   const [partyName, setparty_Name] = useState('');
//   const [partyName2, setparty_Name2] = useState('');
//   const [partyName3, setparty_Name3] = useState('');
//   const [partyId2, setPartyId2] = useState('');
//   const [partyId3, setPartyId3] = useState('');
//   const [partyData, setPartyData] = useState([]);
//   const [partyData2, setPartyData2] = useState([]);
//   const [partyData3, setPartyData3] = useState([]);
//   const [combinewResults, setcombinewResults] = useState([]);
//   const [combinewResults5, setcombinewResults5] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [modalContent, setModalContent] = useState({});
//   const [modalType, setModalType] = useState('');
//   const [heavyModel, setHeavyModel] = useState(false);
//   const closeHeavyModel = () => { setHeavyModel(false); }
//   const [InvoiceData, setInvoiceData] = useState([]);
//   const [InvoiceNo, setInvoiceNo] = useState('');
//   // const [InvoiceData2, setInvoiceData2] = useState([]);




//   // const findBillingTransaction2222 = async () => {
//   //   setcombinewResults5([]);
//   //   // alert("ALerting.....");
//   //   const results = await InviceService.getBillingTransactionAfter(searchCriteria);
//   //   // setcombinewResults(results);
//   //   setcombinewResults5(results.data);
//   //   // console.log("Combined Results ");
//   //   // console.log(results.data);
//   //   // alert("ALerting.....");
//   // };


//   const [loading, setLoading] = useState(false);

//   const findBillingTransaction2222 = async () => {
//     setcombinewResults5([]);
//     setCurrentPage5(1);
//     setLoading(true);
//     try {
//       // if (!partyName) {
//       //   toast.error('Please Select Party', {
//       //     position: toast.POSITION.TOP_CENTER,
//       //     autoClose: 600,
//       //   });
//       // }  
//       const results = await InviceService.getBillingTransactionAfter(searchCriteria);
//       if (!results.data || results.data.length === 0) {
//         toast.info('No data found', {
//           position: toast.POSITION.TOP_CENTER,
//           autoClose: 600,
//         });
//       } else {
//         // setcombinewResults(results);
//         setcombinewResults5(results.data);
//       }
//     } catch (error) {
//       toast.error('Something went wrong', {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 600,
//       });
//     }
//     finally {
//       setLoading(false);
//     }
//   };






//   const makeFieldEmpty = () => {
//     setparty_Name(''); setPartyId(''); setPartyId2(''); setPartyId3('');
//     setparty_Name2(''); setparty_Name3(''); setPartyData([]); setPartyData2([]); setPartyData3([]);

//     setcombinewResults([]); setErrors([]); setInvoiceData([]); setInvoiceNo('');
//     setInvoicePayment([]);
//     setInvoiceDataHistory([]);
//   };



//   // const [InvoiceDetail, setInvoiceDetail] = useState({});
//   const openHeavModal = (data, type) => {

//     // console.log(data);
//     if ((type === 'export' && data.exportHpStatus !== 0) || (type === 'import' && data.importHpStatus !== 0) || (type === 'exportpc' && data.exportPcStatus !== 0) ||
//       (type === 'exportsc' && data.exportScStatus !== 0) || (type === 'importsc' && data.importScStatus !== 0) || (type === 'importpc' && data.importPcStatus !== 0) ||
//       (type === 'exportoc' && data.exportScStatus !== 0) || (type === 'importsc' && data.exportScStatus !== 0) || (type === 'holiday' && data.holidayStatus !== 0)) {
//       setHeavyModel(true);
//       setModalType(type);
//       setModalContent(data);
//     }

//   };

//   const [totalRate, setTotalRate] = useState(0);
//   const [niptPackages, setNiptpackages] = useState(0);
//   const [totalRate2, setTotalRate2] = useState(0);
//   const [niptPackages2, setNiptpackages2] = useState(0);

//   // Pagination 
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 15; // Number of items to display per page

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = combinewResults.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(combinewResults.length / itemsPerPage);
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const displayPages2 = () => {
//     const centerPageCount = 5;
//     const middlePage = Math.floor(centerPageCount / 2);
//     let startPage = currentPage - middlePage;
//     let endPage = currentPage + middlePage;

//     if (startPage < 1) {
//       startPage = 1;
//       endPage = Math.min(totalPages, centerPageCount);
//     }

//     if (endPage > totalPages) {
//       endPage = totalPages;
//       startPage = Math.max(1, totalPages - centerPageCount + 1);
//     }

//     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//   };


//   // Pagination 
//   const [currentPage5, setCurrentPage5] = useState(1);
//   const itemsPerPage5 = 31; // Number of items to display per page

//   const indexOfLastItem5 = currentPage5 * itemsPerPage5;
//   const indexOfFirstItem5 = indexOfLastItem5 - itemsPerPage5;
//   const currentItems5 = combinewResults5.slice(indexOfFirstItem5, indexOfLastItem5);
//   const totalPages5 = Math.ceil(combinewResults5.length / itemsPerPage5);

//   const handlePageChange5 = (page) => {
//     setCurrentPage5(page);
//   };

//   const displayPages5 = () => {
//     const centerPageCount = 5;
//     const middlePage = Math.floor(centerPageCount / 2);
//     let startPage = currentPage5 - middlePage;
//     let endPage = currentPage5 + middlePage;

//     if (startPage < 1) {
//       startPage = 1;
//       endPage = Math.min(totalPages5, centerPageCount);
//     }

//     if (endPage > totalPages5) {
//       endPage = totalPages5;
//       startPage = Math.max(1, totalPages5 - centerPageCount + 1);
//     }

//     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//   };















//   function calculateTotalRateForPage(currentItems) {
//     return currentItems.reduce((acc, record) => {
//       const importRate = record.importRate || 0;
//       const exportRate = record.exportRate || 0;
//       const importScRate = record.importScStatus || 0;
//       const importPcRate = record.importPcStatus || 0;
//       const importHeavyRate = record.importHpStatus || 0;
//       const exportScRate = record.exportScStatus || 0;
//       const exportPcRate = record.exportPcStatus || 0;
//       const exportHeavyRate = record.exportHpStatus || 0;
//       const HolidayRate = record.holidayStatus || 0;
//       const importpenalty = record.importpenalty || 0;
//       const exportpenalty = record.exportpenalty || 0;
//       const importSubRate = record.importSubRate || 0;
//       const exportSubRate = record.exportSubRate || 0;
//       const demuragesRate = record.demuragesRate || 0;
//       return acc + importRate + demuragesRate + exportRate + importSubRate + exportSubRate + HolidayRate + importScRate + importPcRate + importHeavyRate + exportScRate + exportPcRate + exportHeavyRate + importpenalty + exportpenalty;
//     }, 0);
//   }


//   function calculateNiptNop(current) {
//     return current.reduce((acc, record) => {
//       const niptPackages = record.niptPackages || 0;

//       return acc + niptPackages;

//     }, 0);
//   };



//   useEffect(() => {
//     // Calculate the total rate for the current page
//     const totalRateForPage = calculateTotalRateForPage(currentItems);

//     const totalNiptPackages = calculateNiptNop(currentItems);

//     setNiptpackages(totalNiptPackages);
//     // Update the total rate state
//     setTotalRate(totalRateForPage);
//   }, [currentItems]);




//   useEffect(() => {
//     // Calculate the total rate for the current page
//     const totalRateForPage = calculateTotalRateForPage(currentItems5);

//     const totalNiptPackages = calculateNiptNop(currentItems5);

//     setNiptpackages2(totalNiptPackages);
//     // Update the total rate state
//     setTotalRate2(totalRateForPage);
//   }, [currentItems5]);




//   // Function to get the modal header based on modalType
//   const getModalHeader = (modalType) => {
//     switch (modalType) {
//       case 'export':
//         return 'Export Heavy Weight';
//       case 'import':
//         return 'Import Heavy Weight';
//       case 'importsc':
//         return 'Import Special Carting';
//       case 'exportsc':
//         return 'Export Special Carting';
//       case 'importpc':
//         return 'Import Personal Carriage';
//       case 'exportpc':
//         return 'Export Personal Carriage';
//       case 'holiday':
//         return 'Holiday';
//       default:
//         return 'Default Header';
//     }
//   };

//   // Function to get the input label based on modalType
//   const getInputLabel = (modalType) => {
//     switch (modalType) {
//       case 'export':
//         return 'Export Package Weight';
//       case 'import':
//         return 'Import Package Weight';
//       case 'importsc':
//         return 'Import Package';
//       case 'exportsc':
//         return 'Export Package';
//       case 'importpc':
//         return 'Import Package';
//       case 'exportpc':
//         return 'Export Package';
//       case 'holiday':
//         return 'Holiday';
//       default:
//         return 'Default Label';
//     }
//   };

//   // Function to get the input rate label based on modalType
//   const getInputRateLabel = (modalType) => {
//     switch (modalType) {
//       case 'export':
//         return 'Export Heavy Weight Rate';
//       case 'import':
//         return 'Import Heavy Weight Rate';
//       case 'importsc':
//         return 'Import Special Carting Rate';
//       case 'exportsc':
//         return 'Export Special Carting  Rate';
//       case 'importpc':
//         return 'Import Personal Carriage Rate';
//       case 'exportpc':
//         return 'Export Personal Carriage Rate';
//       case 'holiday':
//         return 'Holiday Rate';
//       default:
//         return 'Default Rate Label';
//     }
//   };

//   // Function to get the input value based on modalType and modalContent
//   const getInputValue = (modalType, modalContent) => {
//     switch (modalType) {
//       case 'export':
//         return modalContent.exportHpWeight;
//       case 'import':
//         return modalContent.importHpWeight;
//       case 'importsc':
//         return modalContent.nop;
//       case 'exportsc':
//         return modalContent.exportNoOfPackages;
//       case 'importpc':
//         return modalContent.nop;
//       case 'exportpc':
//         return modalContent.exportNoOfPackages;
//       case 'holiday':
//         return modalContent.totalPackages;
//       default:
//         return '';
//     }
//   };

//   // Function to get the input rate value based on modalType and modalContent
//   const getInputRateValue = (modalType, modalContent) => {
//     switch (modalType) {
//       case 'export':
//         return modalContent.exportHpStatus;
//       case 'import':
//         return modalContent.importHpStatus;
//       case 'importsc':
//         return modalContent.importScStatus;
//       case 'exportsc':
//         return modalContent.exportScStatus;
//       case 'importpc':
//         return modalContent.importPcStatus;
//       case 'exportpc':
//         return modalContent.exportPcStatus;
//       case 'holiday':
//         return modalContent.holidayStatus;
//       default:
//         return '';
//     }
//   };













//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     role,
//     companyname,
//     branchname,
//     logintype,
//     logintypeid,

//     login,
//     logout,
//   } = useContext(AuthContext);


//   useEffect(() => {
//     findParties();
//     findPartiesByInvoiceType();
//   }, []);




//   const SearchPartyAmount = (partyId) => {

//     alert("Party" + partyId)



//   };

//   const openAdvanceModel = () => {
//     setadvancemodel(true);
//   };


//   // Proforma History
//   const [partyName6, setpartyName6] = useState('');
//   const [partyId6, setPartyId6] = useState('');
//   const [ProformaDataHistory, setProformaDataHistory] = useState([]);

//   const handlePartyChange6 = selectedOption => {
//     setpartyName6(selectedOption ? selectedOption.label : '');
//     setPartyId6(selectedOption ? selectedOption.value : '');


//   };

//   const SearchProformaHistry = async (partyId) => {

//     if (!partyName6) {
//       return toast.error("Please Select Party!", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 600,
//       });

//     } else {
//       const response = await InviceService.getProformaByPartyId(companyid, branchId, partyId);
//       setProformaDataHistory(response.data);
//     }

//   };

//   // download Single Bill
//   const downloadSingleProforma = async (partyId, invoiceNo) => {
//     try {
//       const response = await InviceService.getSingleBillPDFromBillsTab(companyid, branchId, partyId, invoiceNo);

//       if (response.status === 200) {
//         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

//         // Create a Blob from the Base64 data
//         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

//         // Create a URL for the Blob
//         const blobUrl = URL.createObjectURL(pdfBlob);

//         // Create an anchor element for downloading
//         const downloadLink = document.createElement('a');
//         downloadLink.href = blobUrl;
//         downloadLink.download = 'bill_invoice.pdf'; // Set the filename for the downloaded PDF
//         downloadLink.style.display = 'none';
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
//         // Handle other status codes (e.g., error responses) as needed
//         console.error("Error downloading PDF:", response.statusText);
//         // Handle the error, show an error message, etc.
//       }
//     } catch (error) {
//       console.error("Error downloading PDF:", error);
//       // Handle the error, show an error message, etc.
//     }
//   };

//   // Download Single Invice 
//   const downloadSingleProformaFromTab = async (partyId, invoiceNo) => {
//     try {

//       const response = await InviceService.getSingleProformaPDFromBillsTab(companyid, branchId, partyId, invoiceNo);


//       if (response.status === 200) {
//         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

//         // Create a Blob from the Base64 data
//         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

//         // Create a URL for the Blob
//         const blobUrl = URL.createObjectURL(pdfBlob);

//         // Create an anchor element for downloading
//         const downloadLink = document.createElement('a');
//         downloadLink.href = blobUrl;
//         downloadLink.download = 'Proforma.pdf'; // Set the filename for the downloaded PDF
//         downloadLink.style.display = 'none';
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
//         // Handle other status codes (e.g., error responses) as needed
//         console.error("Error downloading PDF:", response.statusText);
//         // Handle the error, show an error message, etc.
//       }
//     } catch (error) {
//       console.error("Error downloading PDF:", error);
//       // Handle the error, show an error message, etc.
//     }

//   };






















//   const findPartiesByInvoiceType = async () => {
//     const partyResponse = await Rate_Chart_Service.getAllPartiesByInviceType(companyid, branchId, "Instant");
//     const partyOptions = partyResponse.data.map(party => ({
//       value: party.partyId,
//       label: party.partyName
//     }));
//     setpartiesByInviceType(partyOptions);

//   };


//   // Getall Parties
//   const findParties = async () => {
//     const partyResponse = await Rate_Chart_Service.getAllParties(companyid, branchId);
//     const partyOptions = partyResponse.data.map(party => ({
//       value: party.partyId,
//       label: party.partyName
//     }));
//     setParties(partyOptions);

//   };

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


//   const handlePartyChange = selectedOption => {
//     setparty_Name(selectedOption ? selectedOption.label : '');
//     setSearchCriteria({ ...searchCriteria, PartyId: selectedOption ? selectedOption.value : '' });
//   };


//   const handlePartyChangeBillingTransaction = selectedOption => {
//     setparty_Name(selectedOption ? selectedOption.label : '');
//     setSearchCriteria({ ...searchCriteria, PartyId: selectedOption ? selectedOption.value : '' });
//   };




//   const handlePartyChange2 = selectedOption => {
//     setparty_Name2(selectedOption ? selectedOption.label : '');
//     setPartyId2(selectedOption ? selectedOption.value : '');


//   };
//   const handlePartyChange3 = async (selectedOption, { action }) => {

//     if (action === 'clear') {
//       setparty_Name3('');
//       setPartyId3('');
//       setInvoicePayment([]);
//       setAdvAmt(0);
//       setBalAdvAmt(0);
//       setPaymentMode('');
//     }
//     else {
//       setparty_Name3(selectedOption ? selectedOption.label : '');
//       setPartyId3(selectedOption ? selectedOption.value : '');
//       // getTransByPartyId(selectedOption ? selectedOption.value : '');
//       getInvoiceDataByPartyId(selectedOption ? selectedOption.value : '');
//       getbyAdvancePartyId(selectedOption ? selectedOption.value : '')

//     }

//   };

//   const findCombinedResults = async (data) => {
//     // console.log(data);
//     const results = await InviceService.getCombinedImportsandxports(data);
//     // console.log(results.data);
//     return results.data;
//   };

//   // Download Pdf
//   const downLoadPdf = async (invoiceNo) => {
//     try {

//       console.log("Printing   ");
//       // console.log(invoiceList);
//       const response = await InviceService.downLoadProforma(companyid, branchId, invoiceNo);

//       if (response.status === 200) {
//         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

//         // Create a Blob from the Base64 data
//         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

//         // Create a URL for the Blob
//         const blobUrl = URL.createObjectURL(pdfBlob);

//         // Create an anchor element for downloading
//         const downloadLink = document.createElement('a');
//         downloadLink.href = blobUrl;
//         downloadLink.download = 'ProformaNoBill.pdf'; // Set the filename for the downloaded PDF
//         downloadLink.style.display = 'none';
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
//         // Handle other status codes (e.g., error responses) as needed
//         console.error("Error downloading PDF:", response.statusText);
//         // Handle the error, show an error message, etc.
//       }
//     } catch (error) {
//       console.error("Error downloading PDF:", error);
//       // Handle the error, show an error message, etc.
//     }
//   };


//   // DownLoad Bill

//   const downLoadBillPdf = async (invoiceNo, invoiceList) => {
//     try {
//       const response = await InviceService.downLoadBill(companyid, branchId, invoiceNo, invoiceList);

//       if (response.status === 200) {
//         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

//         // Create a Blob from the Base64 data
//         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

//         // Create a URL for the Blob
//         const blobUrl = URL.createObjectURL(pdfBlob);

//         // Create an anchor element for downloading
//         const downloadLink = document.createElement('a');
//         downloadLink.href = blobUrl;
//         downloadLink.download = 'Annexure.pdf'; // Set the filename for the downloaded PDF
//         downloadLink.style.display = 'none';
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
//         // Handle other status codes (e.g., error responses) as needed
//         console.error("Error downloading PDF:", response.statusText);
//         // Handle the error, show an error message, etc.
//       }
//     } catch (error) {
//       console.error("Error downloading PDF:", error);
//       // Handle the error, show an error message, etc.
//     }
//   };

















//   const findBillingTransaction = async () => {

//     if (!partyName) {
//       return toast.error("Please Select Party!", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 600,
//       });

//     } else {
//       const result = await findCombinedResults(searchCriteria);
//       setcombinewResults(result);

//       console.log("Combined Results ");
//       console.log(result.data);
//     }


//     // console.log(result);
//   };





//   const initialSearchCriteria = {
//     companyid: companyid,
//     branchId: branchId,
//     userId: userId,
//     PartyId: '',
//     startDate: new Date().toISOString(),
//     endDate: new Date().toISOString(),

//   };
//   const initialSearchCriteria2 =
//   {
//     companyid: companyid,
//     branchId: branchId,
//     PartyId: '',
//     startDate: new Date().toISOString(),
//     endDate: new Date().toISOString(),
//     invoiceNo: ''
//   };

//   const [InvoiceHistoryData, setInvoiceHistoryData] = useState([]);
//   const [currentPage1, setCurrentPage1] = useState(1);
//   const itemsPerPage1 = 30; // Number of items to display per page



//   // Calculate the start and end indices for the current page
//   const indexOfLastItem1 = currentPage1 * itemsPerPage1;
//   const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
//   const currentItems1 = InvoiceHistoryData.slice(indexOfFirstItem1, indexOfLastItem1);
//   const totalPages1 = Math.ceil(InvoiceHistoryData.length / itemsPerPage1);

//   // console.log("total Pages "+totalPages1);
//   const handlePageChange1 = (page) => {
//     setCurrentPage1(page);
//   };

//   const displayPages = () => {
//     const centerPageCount = 5;
//     const middlePage = Math.floor(centerPageCount / 2);
//     let startPage = currentPage1 - middlePage;
//     let endPage = currentPage1 + middlePage;

//     if (startPage < 1) {
//       startPage = 1;
//       endPage = Math.min(totalPages1, centerPageCount);
//     }

//     if (endPage > totalPages1) {
//       endPage = totalPages1;
//       startPage = Math.max(1, totalPages1 - centerPageCount + 1);
//     }

//     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//   };



//   const [searchCriteria2, setSearchCriteria2] = useState(initialSearchCriteria2);
//   const [partyName5, setparty_Name5] = useState('');
//   const [invoiceNumbers, setInvoiceNumbers] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await InviceService.SearchInvoiceNoList({ params: searchCriteria2 });
//       // console.log("Invoice List");
//       // console.log(response.data);
//       setInvoiceNumbers(response.data);
//       // Handle the response or set it in the state
//     };

//     if (partyName5) {
//       fetchData();
//     }
//   }, [searchCriteria2]); // This will trigger whenever searchCriteria2 changes


//   const handlePartyChange5 = async selectedOption => {
//     const partyId = selectedOption ? selectedOption.value : '';
//     setparty_Name5(selectedOption ? selectedOption.label : '');

//     // Update the state in the callback of setSearchCriteria2
//     setSearchCriteria2(prevSearchCriteria => ({
//       ...prevSearchCriteria,
//       PartyId: partyId
//     }));
//   };
//   const findHistory = async () => {
//     if (!partyName5) {
//       return toast.error("Please Select Party!", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 600,
//       });
//     }
//     const response = await InviceService.SearchInvoiceNoListByInvoiceHistoryNumber({ params: searchCriteria2 });
//     if (!response.data || response.data.length === 0) {
//       toast.error("No records found!", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 600,
//       });
//       setInvoiceHistoryData([]);
//     } else {
//       setInvoiceHistoryData(response.data);
//     }

//   };



//   const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria);
//   const resetSearchCriteria = () => {
//     setSearchCriteria(initialSearchCriteria);
//     setparty_Name('');
//     setcombinewResults([]);
//     setcombinewResults5([]);

//   };

//   const datesArray = combinewResults.map(item => item.date);

//   // Find the lowest and highest dates
//   const lowestDate = new Date(Math.min(...datesArray));
//   const highestDate = new Date(Math.max(...datesArray));


//   const GenerateInvoice = async () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       html: `Generating Proforma for <b>${partyName}</b> from  ${formatDateTime(lowestDate)} to ${formatDateTime(highestDate)}!`,
//       showCancelButton: true,
//       width: 'auto',
//       confirmButtonText: 'OK',
//       customClass: {
//         title: 'your-custom-title-class1', // Define a custom class for the title
//         cancelButton: 'your-custom-cancel-button-class', // Define a custom class for the cancel button
//         confirmButton: 'your-custom-confirm-button-class', // Define a custom class for the confirm button
//         content: 'your-custom-content-class', // Define a custom class for the content
//       },
//       buttonsStyling: false,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         handleGenerateInvoice();
//       }
//     });

//     const modal = document.querySelector('.swal2-popup');
//     if (modal) {
//       modal.style.bottom = '6vw'; // Adjust the top value as needed
//     }
//   };


//   // Getting Invoice Detail list By Invoice Number

//   const getInvoiceDetailByInvoiceNumber = async (partyId, invoiceno) => {

//     await InviceService.getInvoiceDetailByInvoiceNo(companyid, branchId, partyId, invoiceno).then((res) => {

//       setInvoiceData(res.data);
//       setInvoiceNo(invoiceno);

//     });
//   };




//   const handleGenerateInvoice = async () => {


//     try {
//       const response = await InviceService.generateInvoice(searchCriteria);

//       getInvoiceDetailByInvoiceNumber(response.data.partyId, response.data.proformaNo);

//       toast.success("Invoice Created Sccessfully", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 600,
//       });
//       findBillingTransaction();
//       // Handle the successful response here
//     } catch (error) {
//       // Handle the error here
//       toast.error("Something Went Wrong!", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 600,
//       });
//       findBillingTransaction();
//       console.error("An error occurred while generating the invoice:", error);
//       // You can also display an error message to the user if needed
//     }
//   };

//   // If the user is not authenticated, redirect to the login page
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate(
//         "/login?message=You need to be authenticated to access this page."
//       );
//     }
//   }, [isAuthenticated, navigate]);




//   // /////////////****************////////////////////////*******************/////********/*//////////////////// */ */ */


//   const [InvoiceDataHistory, setInvoiceDataHistory] = useState([]);
//   const SearchInvoiceHistry = async (partiId2) => {



//     if (!partyName2) {
//       return toast.error("Please Select Party!", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 600,
//       });

//     } else {
//       const response = await InviceService.getMainByPartyId(companyid, branchId, partiId2);
//       setInvoiceDataHistory(response.data);
//     }
//   };

//   // download Single Bill
//   const downloadSingleBill = async (partyId, invoiceNo) => {
//     try {
//       const response = await InviceService.getSingleBillPDFromBillsTab(companyid, branchId, partyId, invoiceNo);

//       if (response.status === 200) {
//         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

//         // Create a Blob from the Base64 data
//         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

//         // Create a URL for the Blob
//         const blobUrl = URL.createObjectURL(pdfBlob);

//         // Create an anchor element for downloading
//         const downloadLink = document.createElement('a');
//         downloadLink.href = blobUrl;
//         downloadLink.download = 'Annexure.pdf'; // Set the filename for the downloaded PDF
//         downloadLink.style.display = 'none';
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
//         // Handle other status codes (e.g., error responses) as needed
//         console.error("Error downloading PDF:", response.statusText);
//         // Handle the error, show an error message, etc.
//       }
//     } catch (error) {
//       console.error("Error downloading PDF:", error);
//       // Handle the error, show an error message, etc.
//     }
//   };

//   // Download Single Invice 
//   const downloadSingleInvice = async (partyId, invoiceNo) => {
//     try {

//       const response = await InviceService.getSingleInvicePDFromBillsTab(companyid, branchId, partyId, invoiceNo);


//       if (response.status === 200) {
//         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

//         // Create a Blob from the Base64 data
//         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

//         // Create a URL for the Blob
//         const blobUrl = URL.createObjectURL(pdfBlob);

//         // Create an anchor element for downloading
//         const downloadLink = document.createElement('a');
//         downloadLink.href = blobUrl;
//         downloadLink.download = 'Invoice.pdf'; // Set the filename for the downloaded PDF
//         downloadLink.style.display = 'none';
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
//         // Handle other status codes (e.g., error responses) as needed
//         console.error("Error downloading PDF:", response.statusText);
//         // Handle the error, show an error message, etc.
//       }
//     } catch (error) {
//       console.error("Error downloading PDF:", error);
//       // Handle the error, show an error message, etc.
//     }

//   };

//   // Download Single Demurages Report


//   // downloadSingleDemurages

//   const downloadSingleDemurages = async (partyId, invoiceNo) => {
//     try {

//       const response = await InviceService.getSingleDemuragesPDFromBillsTab(companyid, branchId, partyId, invoiceNo);


//       if (response.status === 200) {
//         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

//         // Create a Blob from the Base64 data
//         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

//         // Create a URL for the Blob
//         const blobUrl = URL.createObjectURL(pdfBlob);

//         // Create an anchor element for downloading
//         const downloadLink = document.createElement('a');
//         downloadLink.href = blobUrl;
//         downloadLink.download = 'Demurages Report.pdf'; // Set the filename for the downloaded PDF
//         downloadLink.style.display = 'none';
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
//         // Handle other status codes (e.g., error responses) as needed
//         console.error("Error downloading PDF:", response.statusText);
//         // Handle the error, show an error message, etc.
//       }
//     } catch (error) {
//       console.error("Error downloading PDF:", error);
//       // Handle the error, show an error message, etc.
//     }

//   };


//   //  make Advance tab Empty

//   const makeAdvanceTabEmpty = () => {
//     setTransId(''); setDocType(''); setTransDate(new Date()); setPartyId(''); setPaymentMode(''); setChequeNo(''); setChequeDate(null);
//     setBankName(''); setsrNo(0); setTransactionNo(''); setTransactionDate(null); setTransactionAmt(0); setTransbankName(''); setCurrency('');
//     setReceiptAmt(0); setNarration(''); setClearedAmt(0); setAdvTransId(''); setAdvTransDate(null); setAdvFlag(''); setBalAdvAmt(0); setAdvAmt(0);
//     setBankReconFlag(''); setBankReconDate(null); setBankReconAmt(0); setTdsPercentage(0); setTdsAmt(0); setTdsStatus(''); setCreatedBy(''); setCreatedDate(null);
//     setEditedBy(''); setEditedDate(null); setApprovedBy(''); setApprovedDate(null);


//   };
//   // **************************************************************************************************
//   // Payement Section 

//   const [transId, setTransId] = useState('');
//   const [docType, setDocType] = useState('');
//   const [transDate, setTransDate] = useState(new Date()); // Initialize with null for Date
//   const [partyId, setPartyId] = useState('');
//   const [paymentMode, setPaymentMode] = useState('');
//   const [chequeNo, setChequeNo] = useState('');
//   const [chequeDate, setChequeDate] = useState(null);
//   const [bankName, setBankName] = useState('');
//   const [srNo, setsrNo] = useState('');
//   const [transactionNo, setTransactionNo] = useState('');
//   const [transactionDate, setTransactionDate] = useState(null);
//   const [transactionAmt, setTransactionAmt] = useState(0); // Initialize with 0 for double
//   const [transbankName, setTransbankName] = useState('');
//   const [currency, setCurrency] = useState("INR");
//   const [receiptAmt, setReceiptAmt] = useState(0);
//   const [narration, setNarration] = useState('');
//   const [clearedAmt, setClearedAmt] = useState(0);
//   const [advTransId, setAdvTransId] = useState('');
//   const [advTransDate, setAdvTransDate] = useState(new Date);
//   const [advFlag, setAdvFlag] = useState('');
//   const [balAdvAmt, setBalAdvAmt] = useState(0);
//   const [advAmt, setAdvAmt] = useState(0);
//   const [bankReconFlag, setBankReconFlag] = useState('');
//   const [bankReconDate, setBankReconDate] = useState(null);
//   const [bankReconAmt, setBankReconAmt] = useState(0);
//   const [tdsPercentage, setTdsPercentage] = useState(0);
//   const [tdsAmt, setTdsAmt] = useState(0);
//   const [tdsStatus, setTdsStatus] = useState('');
//   const [createdBy, setCreatedBy] = useState('');
//   const [createdDate, setCreatedDate] = useState(null);
//   const [editedBy, setEditedBy] = useState('');
//   const [editedDate, setEditedDate] = useState(null);
//   const [approvedBy, setApprovedBy] = useState('');
//   const [approvedDate, setApprovedDate] = useState(null);
//   const [invoiceNo, setinvoiceNo] = useState('');
//   const [invoiceDate, setinvoiceDate] = useState(null);
//   const [invoiceAmt, setinvoiceAmt] = useState('');
//   const [advancemodel, setadvancemodel] = useState(false)


//   const [InvoicePayment, setInvoicePayment] = useState([]);


//   const getInvoiceDataByPartyId = (partyId) => {

//     InviceService.getMainByPartyId(companyid, branchId, partyId).then((res) => {

//       setInvoicePayment(res.data)

//     });

//   };


//   const addAdvance = async (partyId) => {

//     const newErrors = {};

//     if (!partyId3) {
//       newErrors['partyId3'] = 'party is required.';
//       return setErrors(newErrors);
//     }
//     if (!paymentMode) {
//       newErrors['paymentMode'] = 'paymentMode is required.';
//       return setErrors(newErrors);
//     }


//     if (paymentMode === 'NF' || paymentMode === 'UP') {
//       if (!transactionAmt) {
//         newErrors['transactionAmt'] = 'transactionAmt is required.';
//         return setErrors(newErrors);
//       }
//       if (!transactionNo) {
//         newErrors['transactionNo'] = 'paymentMode is required.';
//         return setErrors(newErrors);
//       }
//       if (!transactionDate) {
//         newErrors['transactionDate'] = 'transactionDate is required.';
//         return setErrors(newErrors);
//       }
//     };
//     if (paymentMode === 'CQ') {
//       if (!chequeNo) {
//         newErrors['chequeNo'] = 'chequeNo is required.';
//         return setErrors(newErrors);
//       }

//       if (!chequeDate) {
//         newErrors['chequeDate'] = 'chequeDate is required.';
//         return setErrors(newErrors);
//       }

//       if (!transbankName) {
//         newErrors['transbankName'] = 'TransbankName is required.';
//         return setErrors(newErrors);
//       }
//       if (!transactionAmt) {
//         newErrors['transactionAmt'] = 'transactionAmt is required.';
//         return setErrors(newErrors);
//       }

//     };


//     if (paymentMode === 'CA') {

//       if (!transactionAmt) {
//         newErrors['transactionAmt'] = 'transactionAmt is required.';
//         return setErrors(newErrors);
//       }


//     }






//     const response = await InviceService.addAdvamce(companyid, branchId, partyId, FinTranceData);
//     toast.success('Advance Amount Added Successfully !', {
//       position: toast.POSITION.TOP_CENTER,
//       autoClose: 600,
//     });
//     await getTransByReceiptId(response.data.partyId, response.data.transId);
//   };



//   const getTransByReceiptId = async (partyId, receiptId) => {
//     InviceService.getTransByReceiptId(companyid, branchId, receiptId, partyId).then((res) => {
//       setTransId(res.data.transId);
//       setDocType(res.data.docType);
//       setTransDate(res.data.transDate);
//       setPartyId(res.data.partyId);
//       setPaymentMode(res.data.paymentMode);
//       setChequeNo(res.data.chequeNo);
//       setChequeDate(res.data.chequeDate);
//       setBankName(res.data.bankName);
//       setsrNo(res.data.srNo);
//       setTransactionNo(res.data.transactionNo);
//       setTransactionDate(res.data.transactionDate);
//       setTransactionAmt(res.data.transactionAmt);
//       setTransbankName(res.data.transbankName);
//       setCurrency(res.data.currency);
//       setReceiptAmt(res.data.receiptAmt);
//       setNarration(res.data.narration);
//       setClearedAmt(res.data.clearedAmt);
//       setAdvTransId(res.data.advTransId);
//       setAdvTransDate(res.data.advTransDate);
//       setAdvFlag(res.data.advFlag);
//       setBalAdvAmt(res.data.balAdvAmt);
//       setAdvAmt(res.data.advAmt);
//       setBankReconFlag(res.data.bankReconFlag);
//       setBankReconDate(res.data.bankReconDate);
//       setBankReconAmt(res.data.bankReconDate);
//       setTdsPercentage(res.data.tdsPercentage);
//       setTdsAmt(res.data.tdsAmt);
//       setTdsStatus(res.data.tdsStatus);
//       setCreatedBy(res.data.createdBy);
//       setCreatedDate(res.data.createdDate);
//       setEditedBy(res.data.editedBy);
//       setEditedDate(res.data.editedDate);
//       setApprovedBy(res.data.approvedBy);
//       setApprovedDate(res.data.approvedDate);
//       setinvoiceNo(res.data.invoiceNo);
//       setinvoiceDate(res.data.inviceDate);
//       setinvoiceAmt(res.data.invoiceAmt);
//     });
//   };




//   const getbyAdvancePartyId = async (partyId) => {
//     const response = await InviceService.getPartyAdvAndClearedAmount(companyid, branchId, partyId);
//     const [advAndCleared] = response.data;
//     const [totalAdvAmt, totalClearedAmt] = advAndCleared.split(',').map(value => {
//       if (value.trim() === 'null') {
//         return 0; // Replace 'null' strings with 0
//       }
//       return parseFloat(value.trim()); // Parse other values to float
//     });
//     console.log("Advance Received ");
//     console.log(response.data);


//     // console.log("Advance Amount ", totalAdvAmt);
//     console.log("Cleared Amount ", totalClearedAmt);
//     console.log("Balance Amount ", totalAdvAmt - totalClearedAmt);
//     setAdvAmt(totalAdvAmt);
//     setBalAdvAmt(totalAdvAmt - totalClearedAmt);
//     // console.log(response.data);
//   };

//   const FinTranceData = {
//     transId, docType, transDate, partyId, paymentMode, chequeNo, chequeDate, bankName, transactionNo,
//     transactionDate, transactionAmt, currency, receiptAmt, narration, clearedAmt, advTransId, advTransDate, advFlag,
//     balAdvAmt, advAmt, bankReconFlag, bankReconDate, bankReconAmt, tdsPercentage, tdsAmt, tdsStatus, createdBy, createdDate, editedBy,
//     editedDate, approvedBy, approvedDate, transbankName
//   };

//   const FinTranceDTLData =
//   {
//     invoiceNo, transId, transDate, srNo, partyId, invoiceDate, invoiceAmt, receiptAmt, createdBy,
//     createdDate, editedBy, editedDate, approvedBy, approvedDate
//   };


//   const getTransByPartyId = async (partyId) => {
//     const response = await InviceService.getTransIdByPartyId(companyid, branchId, partyId);

//     // console.log(partyId);
//     // console.log(response.data);
//     setAdvAmt(response.data.advAmt);
//     setBalAdvAmt(response.data.balAdvAmt);


//   }



//   const addAdvanceAmount = () => {


//   };



//   //Party

//   const [InvoiceDataHistory1, setInvoiceDataHistory1] = useState([]);
//   const SearchInvoiceHistry1 = async () => {
//     if (logintype === 'Party') {

//       const response = await InviceService.getMainByPartyId(companyid, branchId, logintypeid);
//       setInvoiceDataHistory1(response.data);
//     }


//   };

//   useEffect(() => {
//     SearchInvoiceHistry1();
//   }, [])



//   return (

//     <>
//  {loading && (
//         <div style={styles.overlay}>
//           <ReactLoading type="spin" color="#0000FF" height={300} width={80} />
//         </div>
//       )}


//       {logintype === 'Party' ? (
//         <>

//           {InvoiceDataHistory1.length > 0 ? (
//             <div>
//               <h4 className='text-center'>{partyName}</h4>

//               <Table striped responsive bordered>
//                 <thead>
//                   <tr className='text-center'>
//                     <th style={{ background: '#BADDDA' }}>Sr No</th>
//                     <th style={{ background: '#BADDDA' }}>Bill No</th>
//                     <th style={{ background: '#BADDDA' }}>Date</th>
//                     <th style={{ background: '#BADDDA' }}>Amount</th>
//                     <th style={{ background: '#BADDDA' }}>Annexure</th>
//                     <th style={{ background: '#BADDDA' }}>Invice</th>
//                     {/* <th style={{ background: '#BADDDA' }}>Demurage</th> */}
//                     <th style={{ background: '#BADDDA' }}>Payment Status</th>

//                   </tr>
//                 </thead>
//                 <tbody>
//                   {InvoiceDataHistory1.map((invoice, index) =>
//                     <tr className="text-center dynamic-row-width">
//                       <td>{index + 1}</td>
//                       <td>{invoice.billNO}</td>
//                       <td>{formatDateTime(invoice.invoiceDate)}</td>
//                       <td>{invoice.totalInvoiceAmount}</td>
//                       <td>
//                         <Button
//                           variant="outline-success"
//                           onClick={(e) => downloadSingleBill(invoice.partyId, invoice.invoiceNO)}
//                         >
//                           <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
//                           {/* Download */}
//                         </Button>
//                       </td>
//                       <td>

//                         <Button
//                           variant="outline-success"
//                           onClick={(e) => downloadSingleInvice(invoice.partyId, invoice.invoiceNO)}
//                         >
//                           <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
//                           {/* Download */}
//                         </Button>


//                       </td>
//                       {/* <td>

//                         <Button
//                           variant="outline-success"
//                           onClick={(e) => downloadSingleDemurages(invoice.partyId, invoice.invoiceNO)}
//                         >
//                           <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
//                           Download
//                         </Button>


//                       </td> */}
//                       <td>{invoice.paymentStatus === 'P' ? "Pending" : invoice.paymentStatus === 'C' ? "Cleared" : ''}</td>

//                     </tr>
//                   )}
//                 </tbody>
//               </Table>

//             </div>



//           ) : null}

//         </>
//       )
//         :
//         (
//           <div className='' style={{ marginTop: 20 }}>
//             <ul className="nav nav-tabs" id="myTab" role="tablist">
//               <li className="nav-item tabspace" role="presentation">
//                 <button style={{ color: 'gray' }} className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true" onClick={resetSearchCriteria}><h6>Proforma Creation</h6></button>
//               </li>

//               <li className="nav-item tabspace" role="presentation">
//                 <button style={{ color: 'gray' }} className="nav-link" id="transaction-tab" data-bs-toggle="tab" data-bs-target="#transaction" type="button" role="tab" aria-controls="transaction" aria-selected="false" onClick={resetSearchCriteria}><h6>Billing Transaction</h6></button>
//               </li>

//               <li className="nav-item tabspace" role="presentation">
//                 <button style={{ color: 'gray' }} className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><h6>Bills</h6></button>
//               </li>

//               <li className="nav-item tabspace" role="presentation">
//                 <button style={{ color: 'gray' }} className="nav-link" id="Proforma-tab" data-bs-toggle="tab" data-bs-target="#Proforma" type="button" role="tab" aria-controls="Proforma" aria-selected="false"><h6>Proforma</h6></button>
//               </li>

//               <li className="nav-item tabspace" role="presentation">
//                 <button style={{ color: 'gray' }} className="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" aria-controls="history" aria-selected="false"><h6>History</h6></button>
//               </li>


//               <li className="nav-item tabspace" role="presentation">
//                 <button onClick={() => { makeFieldEmpty(); makeAdvanceTabEmpty(); }} style={{ color: 'gray' }} className="nav-link" id="payment-tab" data-bs-toggle="tab" data-bs-target="#payment" type="button" role="tab" aria-controls="payment" aria-selected="false"><h6>Payment Transaction</h6></button>
//               </li>

//               <li className="nav-item tabspace" role="presentation">
//                 <button onClick={() => { makeFieldEmpty(); makeAdvanceTabEmpty(); }} style={{ color: 'gray' }} className="nav-link" id="advance-tab" data-bs-toggle="tab" data-bs-target="#advance" type="button" role="tab" aria-controls="advance" aria-selected="false"><h6>Add Advance</h6></button>
//               </li>

//             </ul>
//             <div className="tab-content" id="myTabContent">
//               <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
//                 <Card>
//                   <CardBody>
//                     <Row>
//                       <Col md={4}>

//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Select Party</Label>
//                           <Select
//                             options={partiesByInviceType}
//                             value={{ value: partyName, label: partyName }}
//                             onChange={handlePartyChange}
//                             className={`${errors.partyname ? 'error-border' : ''
//                               } responsive-select`}
//                             isClearable
//                             styles={{
//                               control: (provided, state) => ({
//                                 ...provided,
//                                 border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                                 boxShadow: 'none',
//                                 '&:hover': {
//                                   border: '1px solid #ccc'
//                                 }
//                               }),
//                               indicatorSeparator: () => ({
//                                 display: 'none'
//                               }),
//                               dropdownIndicator: () => ({
//                                 display: 'none'
//                               })
//                             }}
//                           />



//                         </FormGroup>



//                       </Col>

//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">From Date</Label>
//                           <div>
//                             <DatePicker
//                               selected={searchCriteria.startDate ? new Date(searchCriteria.startDate) : null}
//                               wrapperClassName="custom-react-datepicker-wrapper"
//                               onChange={(date) => {
//                                 if (date) {
//                                   setSearchCriteria({ ...searchCriteria, startDate: date.toISOString() });
//                                 } else {
//                                   setSearchCriteria({ ...searchCriteria, startDate: null });
//                                 }
//                               }}
//                               dateFormat="dd/MM/yyyy" // Specify the combined format
//                               className="form-control"
//                               customInput={<input style={{ width: '100%' }} />}
//                             />
//                           </div>
//                         </FormGroup>

//                       </Col>
//                       <Col md={3}>


//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">To Date</Label>
//                           <div>
//                             <DatePicker
//                               selected={searchCriteria.endDate ? new Date(searchCriteria.endDate) : null}
//                               wrapperClassName="custom-react-datepicker-wrapper"
//                               onChange={(date) => {
//                                 if (date) {
//                                   setSearchCriteria({ ...searchCriteria, endDate: date.toISOString() });
//                                 } else {
//                                   setSearchCriteria({ ...searchCriteria, endDate: null });
//                                 }
//                               }}
//                               dateFormat="dd/MM/yyyy" // Specify the combined format
//                               className="form-control"
//                               customInput={<input style={{ width: '100%' }} />}

//                             />
//                           </div>
//                         </FormGroup>


//                       </Col>
//                       <Col md={2}>
//                         <Button
//                           variant="outline-primary"
//                           style={{ marginTop: '2vw' }}
//                           onClick={findBillingTransaction}

//                         >
//                           <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
//                           Search
//                         </Button>
//                       </Col>



//                     </Row>
//                   </CardBody>
//                 </Card>

//                 {combinewResults.length > 0 ? (

//                   <div className="mt-4">
//                     <Table responsive bordered className="">
//                       <thead>
//                         <tr className="text-center">
//                           <th rowSpan="2" style={{ width: '15%', background: '#BADDDA' }}>Party</th>
//                           <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>Date</th>
//                           <th colSpan="2" style={{ width: '10%', background: '#BADDDA' }}>IMP PKGS</th>
//                           <th colSpan="2" style={{ width: '10%', background: '#BADDDA' }}>EXP PKGS</th>
//                           <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>TOT PKGS</th>
//                           <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>IIND SAT</th>
//                           <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>DEMURAGES</th>
//                           <th colSpan="4" style={{ width: '25%', background: '#BADDDA' }}>EXPORT</th>
//                           <th colSpan="4" style={{ width: '25%', background: '#BADDDA' }}>IMPORT</th>
//                         </tr>
//                         <tr className='text-center'>
//                           <th style={{ width: '6%', background: '#BADDDA' }}>IMP</th>
//                           <th style={{ width: '6%', background: '#BADDDA' }}>SUB</th>

//                           <th style={{ width: '6%', background: '#BADDDA' }}>EXP</th>
//                           <th style={{ width: '6%', background: '#BADDDA' }}>SUB</th>

//                           <th style={{ width: '8%', background: '#BADDDA' }}>SC</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>HW Wt</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>PC</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>OC</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>SC</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>HW Wt</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>PC</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>OC</th>
//                         </tr>

//                       </thead>

//                       <tbody>

//                         {currentItems.map((import2, index) =>

//                           <tr className="text-center dynamic-row-width">
//                             <td>{import2.partyName}</td>
//                             <td>{formatDateTime(import2.date)}</td>
//                             <td>{import2.nop}</td>
//                             <td>{import2.importSubNop}</td>
//                             <td>{import2.exportNoOfPackages}</td>
//                             <td>{import2.exportSubNop}</td>
//                             <td>{import2.totalPackages}</td>

//                             <td onClick={() => openHeavModal(import2, 'holiday')}>{import2.holidayStatus}</td>
//                             <td onClick={() => openHeavModal(import2, 'demurage')}>{import2.demuragesRate}</td>
//                             <td onClick={() => openHeavModal(import2, 'exportsc')}>{import2.exportScStatus}</td>
//                             <td onClick={() => openHeavModal(import2, 'export')}>{import2.exportHpStatus}</td>
//                             <td onClick={() => openHeavModal(import2, 'exportpc')}>{import2.exportPcStatus}</td>
//                             <td onClick={() => openHeavModal(import2, 'exportoc')}>{import2.exportpenalty}</td>

//                             <td onClick={() => openHeavModal(import2, 'importsc')}>{import2.importScStatus}</td>
//                             <td onClick={() => openHeavModal(import2, 'import')}>{import2.importHpStatus}</td>
//                             <td onClick={() => openHeavModal(import2, 'importpc')}>{import2.importPcStatus}</td>
//                             {/* <td className="table-column">{import2.importHpStatus}</td> */}
//                             <td onClick={() => openHeavModal(import2, 'importoc')}>{import2.importpenalty}</td>
//                           </tr>
//                         )
//                         }
//                       </tbody>
//                     </Table>
//                     <div>
//                       <Row>

//                         <Col md={1}></Col>
//                         <Col md={4}>
//                           <Button
//                             variant="outline-success"
//                             style={{ marginTop: '2vw' }}
//                             onClick={GenerateInvoice}
//                           >
//                             <FontAwesomeIcon icon={faBolt} style={{ marginRight: '5px' }} />
//                             Generate Proforma
//                           </Button>
//                         </Col>
//                         <Col md={3}></Col>
//                         <Col md={2}>

//                           <FormGroup>
//                             <Label className="forlabel" for="branchId">Total NIPT Packages</Label>
//                             <Input type="text" name="passengerName"
//                               className="form-control"
//                               value={niptPackages}
//                               readOnly
//                               id='service'
//                             />
//                           </FormGroup>
//                         </Col>
//                         <Col md={2}>

//                           <FormGroup>
//                             <Label className="forlabel" for="branchId">Total Bill</Label>
//                             <Input type="text" name="passengerName"
//                               className="form-control"
//                               value={totalRate}
//                               readOnly
//                               id='service'
//                             />
//                           </FormGroup>
//                         </Col>
//                       </Row>

//                     </div>

//                     <div className="text-center">

//                       <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//                         <Pagination.First onClick={() => handlePageChange(1)} />
//                         <Pagination.Prev
//                           onClick={() => handlePageChange(currentPage - 1)}
//                           disabled={currentPage === 1}
//                         />
//                         <Pagination.Ellipsis />

//                         {displayPages2().map((pageNumber) => (
//                           <Pagination.Item
//                             key={pageNumber}
//                             active={pageNumber === currentPage}
//                             onClick={() => handlePageChange(pageNumber)}
//                           >
//                             {pageNumber}
//                           </Pagination.Item>
//                         ))}

//                         <Pagination.Ellipsis />
//                         <Pagination.Next
//                           onClick={() => handlePageChange(currentPage + 1)}
//                           disabled={currentPage === totalPages}
//                         />
//                         <Pagination.Last onClick={() => handlePageChange(totalPages)} />
//                       </Pagination>

//                     </div>



//                   </div>

//                 ) : null}

//                 {InvoiceData.length > 0 ? (
//                   <div>
//                     <h4 className='text-center'>{partyName}</h4>

//                     <Table striped responsive bordered>
//                       <thead>
//                         <tr className='text-center'>
//                           <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>Sr No</th>
//                           <th rowSpan="2" style={{ width: '8%', background: '#BADDDA' }}>Date</th>
//                           <th colSpan="2" style={{ width: '5%', background: '#BADDDA' }}>IMP PCKGS</th>
//                           <th colSpan="2" style={{ width: '5%', background: '#BADDDA' }}>EXP PKGS</th>
//                           <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>Total PKGS</th>
//                           <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>IIND SAT</th>
//                           <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>DEMURAGES</th>
//                           <th colSpan="4" style={{ width: '30%', background: '#BADDDA' }}>EXPORT</th>
//                           <th colSpan="4" style={{ width: '30%', background: '#BADDDA' }}>IMPORT</th>
//                         </tr>
//                         <tr className='text-center'>
//                           <th style={{ width: '6%', background: '#BADDDA' }}>IMP</th>
//                           <th style={{ width: '6%', background: '#BADDDA' }}>SUB</th>

//                           <th style={{ width: '6%', background: '#BADDDA' }}>EXP</th>
//                           <th style={{ width: '6%', background: '#BADDDA' }}>SUB</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>SC</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>HW Wt</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>PC</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>OC</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>SC</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>HW Wt</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>PC</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>OC</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {InvoiceData.map((invoice, index) =>
//                           <tr className="text-center dynamic-row-width">
//                             <td>{index + 1}</td>
//                             <td>{formatDateTime(invoice.proformaNoDate)}</td>
//                             <td>{invoice.importNoOfPackages}</td>
//                             <td>{invoice.importSubNop}</td>
//                             <td>{invoice.exportNoOfPackages}</td>
//                             <td>{invoice.exportSubNop}</td>
//                             <td>{invoice.totalPackages}</td>
//                             <td>{invoice.holidayRate}</td>
//                             <td>{invoice.demuragesRate}</td>
//                             <td>{invoice.exportScRate}</td>
//                             <td>{invoice.exportHpRate}</td>
//                             <td>{invoice.exportPcRate}</td>
//                             <td>{invoice.exportPenalty}</td>
//                             <td>{invoice.importScRate}</td>
//                             <td>{invoice.importHpRate}</td>
//                             <td>{invoice.importPcRate}</td>
//                             <td>{invoice.importPenalty}</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </Table>
//                     <Row>
//                       <Col md={3}>
//                         <Button
//                           variant="outline-success"
//                           style={{ marginTop: '1.7vw' }}
//                           onClick={() => downLoadPdf(InvoiceNo)}
//                         >
//                           <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
//                           Download Proforma
//                         </Button></Col>



//                     </Row>

//                   </div>



//                 ) : null}




//               </div>


//               <div className="tab-pane fade " id="Proforma" role="tabpanel" aria-labelledby="Proforma-tab">
//                 <Card>

//                   <CardBody>

//                     <Row>
//                       <Col md={5}>

//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Select Party</Label>


//                           <Select
//                             options={parties}
//                             value={{ value: partyName6, label: partyName6 }}
//                             onChange={handlePartyChange6}
//                             className={errors.partyName6 ? 'error-border' : ''}
//                             isClearable
//                             styles={{
//                               control: (provided, state) => ({
//                                 ...provided,
//                                 border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                                 boxShadow: 'none',
//                                 '&:hover': {
//                                   border: '1px solid #ccc'
//                                 }
//                               }),
//                               indicatorSeparator: () => ({
//                                 display: 'none'
//                               }),
//                               dropdownIndicator: () => ({
//                                 display: 'none'
//                               })
//                             }}
//                           />
//                         </FormGroup>

//                       </Col>

//                       <Col md={2}>
//                         <Button
//                           variant="outline-primary"
//                           style={{ marginTop: '2vw' }}

//                           onClick={(e) => SearchProformaHistry(partyId6)}
//                         >
//                           <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
//                           Search
//                         </Button>
//                       </Col>
//                     </Row>

//                     {/*  Invoice History  */}





//                     {ProformaDataHistory.length > 0 ? (
//                       <div>
//                         <h4 className='text-center'>{partyName}</h4>

//                         <Table striped responsive bordered>
//                           <thead>
//                             <tr className='text-center'>
//                               <th style={{ background: '#BADDDA' }}>Sr No</th>
//                               <th style={{ background: '#BADDDA' }}>Proforma No</th>
//                               <th style={{ background: '#BADDDA' }}>Date</th>
//                               <th style={{ background: '#BADDDA' }}>Amount</th>
//                               {/* <th style={{ background: '#BADDDA' }}>Annexure</th> */}
//                               <th style={{ background: '#BADDDA' }}>Download</th>
//                               {/* <th style={{ background: '#BADDDA' }}>Demurage</th> */}
//                               {/* <th style={{ background: '#BADDDA' }}>Payment Status</th> */}

//                             </tr>
//                           </thead>
//                           <tbody>
//                             {ProformaDataHistory.map((invoice, index) =>
//                               <tr className="text-center dynamic-row-width">
//                                 <td>{index + 1}</td>
//                                 <td>{invoice.proformaNo}</td>
//                                 <td>{formatDateTime(invoice.proformaDate)}</td>
//                                 <td>{invoice.totalInvoiceAmount}</td>
//                                 <td>
//                                   <Button
//                                     variant="outline-success"
//                                     onClick={(e) => downloadSingleProformaFromTab(invoice.partyId, invoice.proformaNo)}
//                                   >
//                                     <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
//                                     {/* Download */}
//                                   </Button>
//                                 </td>
//                                 {/* <td> */}

//                                 {/* <Button
//                                     variant="outline-success"
//                                     onClick={(e) => downloadSingleInvice(invoice.partyId, invoice.invoiceNO)}
//                                   >
//                                     <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
//                                     Download
//                                   </Button>


//                                 </td>
//                                 <td>

//                                   <Button
//                                     variant="outline-success"
//                                     onClick={(e) => downloadSingleDemurages(invoice.partyId, invoice.invoiceNO)}
//                                   >
//                                     <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
//                                     Download
//                                   </Button>


//                                 </td> */}
//                                 {/* <td>{invoice.paymentStatus === 'P' ? "Pending" : invoice.paymentStatus === 'C' ? "Cleared" : ''}</td> */}

//                               </tr>
//                             )}
//                           </tbody>
//                         </Table>

//                       </div>



//                     ) : null}










































//                   </CardBody>
//                 </Card>
//               </div>


//               <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">



//                 <Card>

//                   <CardBody>

//                     <Row>
//                       <Col md={5}>

//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Select Party</Label>


//                           <Select
//                             options={parties}
//                             value={{ value: partyName2, label: partyName2 }}
//                             onChange={handlePartyChange2}
//                             className={errors.partyName2 ? 'error-border' : ''}
//                             isClearable
//                             styles={{
//                               control: (provided, state) => ({
//                                 ...provided,
//                                 border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                                 boxShadow: 'none',
//                                 '&:hover': {
//                                   border: '1px solid #ccc'
//                                 }
//                               }),
//                               indicatorSeparator: () => ({
//                                 display: 'none'
//                               }),
//                               dropdownIndicator: () => ({
//                                 display: 'none'
//                               })
//                             }}
//                           />
//                         </FormGroup>

//                       </Col>

//                       <Col md={2}>
//                         <Button
//                           variant="outline-primary"
//                           style={{ marginTop: '2vw' }}

//                           onClick={(e) => SearchInvoiceHistry(partyId2)}
//                         >
//                           <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
//                           Search
//                         </Button>
//                       </Col>
//                     </Row>

//                     {/*  Invoice History  */}





//                     {InvoiceDataHistory.length > 0 ? (
//                       <div>
//                         <h4 className='text-center'>{partyName}</h4>

//                         <Table striped responsive bordered>
//                           <thead>
//                             <tr className='text-center'>
//                               <th style={{ background: '#BADDDA' }}>Sr No</th>
//                               <th style={{ background: '#BADDDA' }}>Bill No</th>
//                               <th style={{ background: '#BADDDA' }}>Date</th>
//                               <th style={{ background: '#BADDDA' }}>Amount</th>
//                               <th style={{ background: '#BADDDA' }}>Invoice</th>
//                               <th style={{ background: '#BADDDA' }}>Annexure</th>
//                               {/* <th style={{ background: '#BADDDA' }}>Demurage</th> */}
//                               <th style={{ background: '#BADDDA' }}>Payment Status</th>

//                             </tr>
//                           </thead>
//                           <tbody>
//                             {InvoiceDataHistory.map((invoice, index) =>
//                               <tr className="text-center dynamic-row-width">
//                                 <td>{index + 1}</td>
//                                 <td>{invoice.billNO}</td>
//                                 <td>{formatDateTime(invoice.invoiceDate)}</td>
//                                 <td>{invoice.totalInvoiceAmount}</td>

//                                 <td>

//                                   <Button
//                                     variant="outline-success"
//                                     onClick={(e) => downloadSingleInvice(invoice.partyId, invoice.invoiceNO)}
//                                   >
//                                     <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
//                                     Download
//                                   </Button>


//                                 </td>

//                                 <td>
//                                   <Button
//                                     variant="outline-success"
//                                     onClick={(e) => downloadSingleBill(invoice.partyId, invoice.invoiceNO)}
//                                   >
//                                     <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
//                                     Download
//                                   </Button>
//                                 </td>

//                                 {/* <td>

//                                   <Button
//                                     variant="outline-success"
//                                     onClick={(e) => downloadSingleDemurages(invoice.partyId, invoice.invoiceNO)}
//                                   >
//                                     <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
//                                     Download
//                                   </Button>


//                                 </td> */}
//                                 <td>{invoice.paymentStatus === 'P' ? "Pending" : invoice.paymentStatus === 'C' ? "Cleared" : ''}</td>

//                               </tr>
//                             )}
//                           </tbody>
//                         </Table>
//                       </div>
//                     ) : null}


//                   </CardBody>
//                 </Card>
//               </div>
//               {/* History Tab for Bill By SirNo and Hawb No And Master No */}
//               <div className="tab-pane fade " id="history" role="tabpanel" aria-labelledby="history-tab">
//                 <Card>
//                   <CardBody>
//                     <Row>
//                       <Col md={2}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">From Date</Label>
//                           <div>
//                             <DatePicker
//                               selected={searchCriteria2.startDate ? new Date(searchCriteria2.startDate) : null}
//                               wrapperClassName="custom-react-datepicker-wrapper"
//                               onChange={(date) => {
//                                 if (date) {
//                                   setSearchCriteria2({ ...searchCriteria2, startDate: date.toISOString() });
//                                 } else {
//                                   setSearchCriteria2({ ...searchCriteria2, startDate: null });
//                                 }
//                               }}
//                               dateFormat="dd/MM/yyyy" // Specify the combined format
//                               className="form-control"
//                               customInput={<input style={{ width: '100%' }} />}
//                             />
//                           </div>
//                         </FormGroup>

//                       </Col>
//                       <Col md={2}>


//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">To Date</Label>
//                           <div>
//                             <DatePicker
//                               selected={searchCriteria2.endDate ? new Date(searchCriteria2.endDate) : null}
//                               wrapperClassName="custom-react-datepicker-wrapper"
//                               onChange={(date) => {
//                                 if (date) {
//                                   setSearchCriteria2({ ...searchCriteria2, endDate: date.toISOString() });
//                                 } else {
//                                   setSearchCriteria2({ ...searchCriteria2, endDate: null });
//                                 }
//                               }}
//                               dateFormat="dd/MM/yyyy" // Specify the combined format
//                               className="form-control"
//                               customInput={<input style={{ width: '100%' }} />}
//                             />
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col md={4}>

//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Select Party</Label>
//                           <Select
//                             options={parties}
//                             value={{ value: partyName5, label: partyName5 }}
//                             onChange={handlePartyChange5}
//                             className={`${errors.partyName5 ? 'error-border' : ''
//                               } responsive-select`}
//                             isClearable
//                             styles={{
//                               control: (provided, state) => ({
//                                 ...provided,
//                                 border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                                 boxShadow: 'none',
//                                 '&:hover': {
//                                   border: '1px solid #ccc'
//                                 }
//                               }),
//                               indicatorSeparator: () => ({
//                                 display: 'none'
//                               }),
//                               dropdownIndicator: () => ({
//                                 display: 'none'
//                               })
//                             }}
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col md={2}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Invoice No</Label>
//                           <select
//                             className="form-select"
//                             aria-label="Invoice No"
//                             value={searchCriteria2.invoiceNo}
//                             onChange={(e) => setSearchCriteria2({ ...searchCriteria2, invoiceNo: e.target.value })}>
//                             <option value="">Select Invoice No</option>
//                             {invoiceNumbers.map((invoiceNo, index) => (
//                               <option key={index} value={invoiceNo}>
//                                 {invoiceNo}
//                               </option>
//                             ))}
//                           </select>
//                         </FormGroup>
//                       </Col>
//                       <Col md={2}>
//                         <Button
//                           variant="outline-primary"
//                           style={{ marginTop: '2vw' }}
//                           onClick={findHistory}
//                         >
//                           <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
//                           Search
//                         </Button>
//                       </Col>
//                     </Row>
//                   </CardBody>
//                 </Card>


//                 {/* Table For Showing History */}

//                 {InvoiceHistoryData.length > 0 ? (
//                   <div>
//                     <h4 className='text-center'>{partyName}</h4>

//                     <Table striped responsive bordered>
//                       <thead>
//                         <tr className='text-center'>
//                           <th style={{ background: '#BADDDA' }}>Sr No</th>
//                           <th style={{ background: '#BADDDA' }}>Invoice No </th>
//                           <th style={{ background: '#BADDDA' }}>Invoice Date </th>
//                           <th style={{ background: '#BADDDA' }}>HAWB/ReqId</th>
//                           <th style={{ background: '#BADDDA' }}>SIR/SER</th>
//                           <th style={{ background: '#BADDDA' }}>Packages</th>
//                           <th style={{ background: '#BADDDA' }}>In Date </th>
//                           <th style={{ background: '#BADDDA' }}>Out Date </th>
//                           <th style={{ background: '#BADDDA' }}>Charges</th>
//                           <th style={{ background: '#BADDDA' }}>Service Type</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {currentItems1.map((invoice, index) =>
//                           <tr className="text-center dynamic-row-width">
//                             <td>{((currentPage1 - 1) * itemsPerPage1) + index + 1}</td>
//                             <td>{invoice.inviceNo}</td>
//                             <td>{formatDateTime(invoice.inviceDate)}</td>
//                             <td>{invoice.masterNo.startsWith('000') ? '' : invoice.masterNo}</td>
//                             <td>{invoice.subMasterNo.startsWith('000') ? '' : invoice.subMasterNo}</td>
//                             <td>{invoice.packages}</td>
//                             <td>{formatDateTime(invoice.inDate)}</td>
//                             <td>{formatDateTime(invoice.outDate)}</td>
//                             <td>{invoice.demurageRate}</td>
//                             <td>{invoice.packageType}</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </Table>


//                     <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//                       <Pagination.First onClick={() => handlePageChange1(1)} />
//                       <Pagination.Prev
//                         onClick={() => handlePageChange1(currentPage1 - 1)}
//                         disabled={currentPage1 === 1}
//                       />
//                       <Pagination.Ellipsis />

//                       {displayPages().map((pageNumber) => (
//                         <Pagination.Item
//                           key={pageNumber}
//                           active={pageNumber === currentPage1}
//                           onClick={() => handlePageChange1(pageNumber)}
//                         >
//                           {pageNumber}
//                         </Pagination.Item>
//                       ))}

//                       <Pagination.Ellipsis />
//                       <Pagination.Next
//                         onClick={() => handlePageChange1(currentPage1 + 1)}
//                         disabled={currentPage1 === totalPages1}
//                       />
//                       <Pagination.Last onClick={() => handlePageChange1(totalPages1)} />
//                     </Pagination>
//                   </div>



//                 ) : null}
//               </div>


//               <div className="tab-pane fade" id="payment" role="tabpanel" aria-labelledby="payment-tab">

//                 <Card>
//                   <CardBody>


//                     <Row>

//                       <Col md={3}>

//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Receipt Id</Label>
//                           <Input
//                             type="text"
//                             name="approvedBy"
//                             id="service"
//                             readOnly
//                             value={transId}
//                             className="inputField"
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Receipt Date</Label>
//                           <div>
//                             <DatePicker
//                               selected={transDate}
//                               wrapperClassName="custom-react-datepicker-wrapper"
//                               onChange={(date) => {
//                                 if (date) {
//                                   setTransDate(date);
//                                 }
//                               }}
//                               value={transDate}
//                               dateFormat="dd/MM/yyyy"
//                               className="form-control"
//                               customInput={<input style={{ width: '100%' }} />}
//                             />

//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Receipt Amount</Label>
//                           <Input
//                             type="number"
//                             name="receiptAmt"
//                             value={receiptAmt}
//                             onChange={(e) => {
//                               let inputText = e.target.value;
//                               if (inputText.length > 10) { inputText = inputText.slice(0, 10); }
//                               setReceiptAmt(inputText);
//                             }}
//                           />
//                         </FormGroup>
//                       </Col>

//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Currency</Label>
//                           <Input
//                             type="text"
//                             name="currency"
//                             value={currency}
//                             onChange={(e) => setCurrency(e.target.value)}
//                             maxLength={8}
//                             defaultValue={currency}
//                           />
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Select Party</Label>
//                           <Select
//                             options={parties}
//                             value={{ value: partyName3, label: partyName3 }}
//                             onChange={handlePartyChange3}
//                             className={errors.partyname ? 'error-border' : ''}
//                             isClearable
//                             styles={{
//                               control: (provided, state) => ({
//                                 ...provided,
//                                 border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                                 boxShadow: 'none',
//                                 '&:hover': {
//                                   border: '1px solid #ccc'
//                                 }
//                               }),
//                               indicatorSeparator: () => ({
//                                 display: 'none'
//                               }),
//                               dropdownIndicator: () => ({
//                                 display: 'none'
//                               })
//                             }}
//                           />
//                         </FormGroup>
//                       </Col>

//                       <Col md={3}>

//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Advance Amount</Label>
//                           <Input
//                             type="text"
//                             name="approvedBy"
//                             value={advAmt}
//                             readOnly
//                             id='service'
//                             onChange={(e) => setAdvAmt(e.target.value)}
//                           />
//                         </FormGroup>


//                       </Col>
//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Balance Amount</Label>
//                           <Input
//                             type="text"
//                             name="balAdvAmt"
//                             value={balAdvAmt}
//                             onChange={(e) => setBalAdvAmt(e.target.value)}
//                             maxLength={8}
//                             readOnly
//                             id='service'
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Payment Type</Label>
//                           <select
//                             className="form-select"
//                             aria-label="SC Status"
//                             disabled={InvoicePayment.length === 0} // Disables if InvoicePayment is empty
//                             value={paymentMode}
//                             onChange={(e) => setPaymentMode(e.target.value)}
//                           >
//                             <option value="">Select Payment Type</option>
//                             <option value="CQ">CHEQUE</option>
//                             <option value="NF">NEFT</option>
//                             <option value="UP">UPI</option>
//                             <option value="CA">CASH</option>
//                           </select>
//                         </FormGroup>
//                       </Col>
//                     </Row>


//                     {/* Add Paymenr By Payment Type  */}


//                     {paymentMode === 'CQ' ? (
//                       <Row>

//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" htmlFor="branchId">
//                               Cheque Number
//                             </Label>
//                             <Input
//                               type="text"
//                               value={chequeNo}
//                               onChange={(e) => setChequeNo(e.target.value)}
//                             />
//                           </FormGroup>
//                         </Col>
//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" for="branchId">Cheque Date</Label>
//                             <div>
//                               <DatePicker
//                                 selected={chequeDate}
//                                 wrapperClassName="custom-react-datepicker-wrapper"
//                                 onChange={(date) => {
//                                   if (date) { setChequeDate(date); }
//                                 }}
//                                 value={chequeDate}
//                                 dateFormat="dd/MM/yyyy"
//                                 className="form-control"
//                                 customInput={<input style={{ width: '100%' }} />}
//                               />
//                             </div>
//                           </FormGroup>
//                         </Col>
//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" htmlFor="branchId">
//                               Bank Name
//                             </Label>
//                             <Input
//                               type="text"
//                               value={bankName}
//                               onChange={(e) => setBankName(e.target.value)}
//                             />
//                           </FormGroup>
//                         </Col>
//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" htmlFor="branchId">
//                               Transaction Amount
//                             </Label>
//                             <Input
//                               type="number"
//                               value={transactionAmt}
//                               onChange={(e) => setTransactionAmt(e.target.value)}
//                               className={errors.transactionAmt ? 'error-border' : ''}
//                             />
//                             {errors.transactionAmt && (
//                               <div className="error-message">
//                                 {errors.transactionAmt}
//                               </div>
//                             )}

//                           </FormGroup>
//                         </Col>

//                       </Row>

//                     ) : null}

//                     {paymentMode === 'NF' || paymentMode === 'UP' ? (
//                       <Row>
//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" htmlFor="branchId">
//                               Transaction Number
//                             </Label>
//                             <Input
//                               type="text"
//                               value={transactionNo}
//                               onChange={(e) => setTransactionNo(e.target.value)}
//                               className={errors.transactionNo ? 'error-border' : ''}
//                             />
//                             {errors.transactionNo && (
//                               <div className="error-message">
//                                 {errors.transactionNo}
//                               </div>
//                             )}

//                           </FormGroup>
//                         </Col>

//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" for="branchId">Transaction Date</Label>
//                             <div>
//                               <DatePicker
//                                 selected={transactionDate}
//                                 wrapperClassName="custom-react-datepicker-wrapper"
//                                 onChange={(date) => {
//                                   if (date) {
//                                     setTransactionDate(date);
//                                   }
//                                 }}
//                                 value={transactionDate}
//                                 dateFormat="dd/MM/yyyy"
//                                 className={`form-control ${errors.paymentMode ? 'error-border' : ''}`}
//                                 customInput={<input style={{ width: '100%' }} />}
//                               />
//                               {errors.transactionDate && (
//                                 <div className="error-message">
//                                   {errors.transactionDate}
//                                 </div>
//                               )}

//                             </div>
//                           </FormGroup>
//                         </Col>

//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" htmlFor="branchId">
//                               Transaction Amount
//                             </Label>
//                             <Input
//                               type="number"
//                               value={transactionAmt}
//                               onChange={(e) => setTransactionAmt(e.target.value)}
//                               className={errors.transactionDate ? 'error-border' : ''}
//                             />
//                             {errors.transactionDate && (
//                               <div className="error-message">
//                                 {errors.transactionDate}
//                               </div>
//                             )}

//                           </FormGroup>
//                         </Col>
//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" htmlFor="branchId">
//                               Bank Name
//                             </Label>
//                             <Input
//                               type="text"
//                               value={transbankName}
//                               onChange={(e) => setTransbankName(e.target.value)}
//                               className={errors.transbankName ? 'error-border' : ''}
//                             />
//                             {errors.transbankName && (
//                               <div className="error-message">
//                                 {errors.transbankName}
//                               </div>
//                             )}
//                           </FormGroup>
//                         </Col>
//                       </Row>

//                     ) : null}

//                     {paymentMode === 'CA' ? (
//                       <Row>

//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" htmlFor="branchId">
//                               Amount
//                             </Label>
//                             <Input
//                               type="number"
//                               value={transactionAmt}
//                               onChange={(e) => setTransactionAmt(e.target.value)}
//                               className={errors.transactionAmt ? 'error-border' : ''}
//                             />
//                             {errors.transactionAmt && (
//                               <div className="error-message">
//                                 {errors.transactionAmt}
//                               </div>
//                             )}
//                           </FormGroup>
//                         </Col>


//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" for="branchId">Received Date</Label>
//                             <div>
//                               <DatePicker
//                                 selected={transactionDate}
//                                 wrapperClassName="custom-react-datepicker-wrapper"
//                                 onChange={(date) => {
//                                   if (date) {
//                                     setTransactionDate(date);
//                                   }
//                                 }}
//                                 value={transactionDate}
//                                 dateFormat="dd/MM/yyyy"
//                                 className={`form-control ${errors.transactionDate ? 'error-border' : ''}`}
//                                 customInput={<input style={{ width: '100%' }} />}
//                               />
//                               {errors.transactionDate && (
//                                 <div className="error-message">
//                                   {errors.transactionDate}
//                                 </div>
//                               )}
//                             </div>
//                           </FormGroup>
//                         </Col>
//                       </Row>
//                     ) : null}

//                     <Row>
//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">TDS Percentage</Label>
//                           <Input
//                             type="number"
//                             name="tdsPercentage"
//                             onChange={(e) => {
//                               let inputText = e.target.value;
//                               // Check if the input has exceeded 10 digits
//                               if (inputText.length > 2) {
//                                 // Trim the input to the first 10 digits
//                                 inputText = inputText.slice(0, 2);
//                               }
//                               // Update the state with the sanitized input
//                               setTdsPercentage(inputText);
//                             }}
//                             value={tdsPercentage}
//                             className="inputField"
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">TDS Amount</Label>
//                           <Input
//                             type="number"
//                             name="approvedBy"
//                             onChange={(e) => {
//                               let inputText = e.target.value;
//                               // Check if the input has exceeded 10 digits
//                               if (inputText.length > 6) {
//                                 // Trim the input to the first 10 digits
//                                 inputText = inputText.slice(0, 6);
//                               }
//                               // Update the state with the sanitized input
//                               setTdsAmt(inputText);
//                             }}

//                             value={tdsAmt}
//                             className="inputField"
//                           />
//                         </FormGroup>
//                       </Col>

//                       <Col md={3}>

//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Remarks</Label>
//                           <Input
//                             type="text"
//                             name="approvedBy"
//                             value={narration}
//                             className="inputField"
//                             onChange={(e) => setNarration(e.target.value)}
//                             maxLength={50}
//                           />
//                         </FormGroup>
//                       </Col>
//                     </Row>

//                     <div className="text-center">
//                       <Button
//                         variant="outline-success"
//                         style={{ marginTop: '2vw' }}
//                         onClick={SearchPartyAmount}>
//                         <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
//                         SAVE
//                       </Button>
//                     </div>



//                     {/* Invice Data For Payment */}


//                     {InvoicePayment.length > 0 ? (
//                       <div>
//                         <h4 className='text-center'>{partyName}</h4>

//                         <Table striped responsive bordered>
//                           <thead>
//                             <tr className='text-center'>
//                               <th style={{ background: '#BADDDA' }}>Sr No</th>
//                               <th style={{ background: '#BADDDA' }}>Invice Number</th>
//                               <th style={{ background: '#BADDDA' }}>Invice Date</th>
//                               <th style={{ background: '#BADDDA' }}>Invice Amount</th>
//                               <th style={{ background: '#BADDDA' }}>Cleared Amount</th>
//                               <th style={{ background: '#BADDDA' }}>Received Amount</th>
//                             </tr>

//                           </thead>
//                           <tbody>
//                             {InvoicePayment.map((invoice, index) =>
//                               <tr className="text-center dynamic-row-width">
//                                 <td>{index + 1}</td>
//                                 <td>{invoice.invoiceNO}</td>
//                                 <td>{formatDateTime(invoice.invoiceDate)}</td>
//                                 <td>{invoice.totalInvoiceAmount}</td>
//                                 <td>{invoice.clearedAmt}
//                                 </td>
//                                 <td className="text-center" style={{ textAlign: 'center' }}>
//                                   <Input
//                                     text="number"
//                                     name="received amount"
//                                     style={{ display: 'inline-block', width: '40%' }}
//                                   />
//                                 </td>

//                               </tr>
//                             )}
//                           </tbody>
//                         </Table>

//                       </div>
//                     ) : null}
//                   </CardBody>
//                 </Card>
//               </div>







//               <div className="tab-pane fade" id="advance" role="tabpanel" aria-labelledby="advance-tab">
//                 <Card>
//                   <CardBody>
//                     <Row>
//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Select Party</Label>
//                           <Select
//                             options={parties}
//                             value={{ value: partyName3, label: partyName3 }}
//                             onChange={handlePartyChange3}
//                             className={errors.partyId3 ? 'error-border' : ''}
//                             isClearable
//                             styles={{
//                               control: (provided, state) => ({
//                                 ...provided,
//                                 border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                                 boxShadow: 'none',
//                                 '&:hover': {
//                                   border: '1px solid #ccc'
//                                 }
//                               }),
//                               indicatorSeparator: () => ({
//                                 display: 'none'
//                               }),
//                               dropdownIndicator: () => ({
//                                 display: 'none'
//                               })
//                             }}
//                           />
//                           {errors.partyId3 && (
//                             <div className="error-message">
//                               {errors.partyId3}
//                             </div>
//                           )}
//                         </FormGroup>
//                       </Col>

//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Payment Type</Label>

//                           <select
//                             className={`form-select ${errors.paymentMode ? 'error-border' : ''}`}
//                             aria-label="SC Status"
//                             value={paymentMode}
//                             onChange={(e) => setPaymentMode(e.target.value)}
//                           >
//                             <option value="">Select Payment Type</option>
//                             <option value="CQ">CHEQUE</option>
//                             <option value="NF">NEFT</option>
//                             <option value="UP">UPI</option>
//                             <option value="CA">CASH</option>
//                           </select>

//                           {errors.paymentMode && (
//                             <div className="error-message">
//                               {errors.paymentMode}
//                             </div>
//                           )}
//                         </FormGroup>
//                       </Col>
//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" htmlFor="branchId">
//                             Advance Receipt No
//                           </Label>
//                           <Input
//                             type="text"
//                             value={transId}
//                             onChange={(e) => setTransId(e.target.value)}
//                             readOnly
//                             id='service'
//                           />
//                         </FormGroup>
//                       </Col>

//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Advance Receipt Date</Label>
//                           <div>
//                             <DatePicker
//                               selected={transDate}
//                               wrapperClassName="custom-react-datepicker-wrapper"
//                               onChange={(date) => {
//                                 if (date) {
//                                   setTransDate(date);
//                                 }
//                               }}
//                               value={transDate}
//                               dateFormat="dd/MM/yyyy"
//                               className="form-control"
//                               customInput={<input style={{ width: '100%' }} />}
//                             />

//                           </div>
//                         </FormGroup>
//                       </Col>


//                     </Row>




//                     {paymentMode === 'CQ' ? (
//                       <Row>

//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" htmlFor="branchId">
//                               Cheque Number
//                             </Label>
//                             <Input
//                               type="text"
//                               value={chequeNo}
//                               onChange={(e) => setChequeNo(e.target.value)}
//                             />
//                           </FormGroup>
//                         </Col>
//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" for="branchId">Cheque Date</Label>
//                             <div>
//                               <DatePicker
//                                 selected={chequeDate}
//                                 wrapperClassName="custom-react-datepicker-wrapper"
//                                 onChange={(date) => {
//                                   if (date) { setChequeDate(date); }
//                                 }}
//                                 value={chequeDate}
//                                 dateFormat="dd/MM/yyyy"
//                                 className="form-control"
//                                 customInput={<input style={{ width: '100%' }} />}
//                               />

//                             </div>
//                           </FormGroup>
//                         </Col>
//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" htmlFor="branchId">
//                               Bank Name
//                             </Label>
//                             <Input
//                               type="text"
//                               value={bankName}
//                               onChange={(e) => setBankName(e.target.value)}
//                             />
//                           </FormGroup>
//                         </Col>
//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" htmlFor="branchId">
//                               Transaction Amount
//                             </Label>
//                             <Input
//                               type="number"
//                               value={transactionAmt}
//                               onChange={(e) => setTransactionAmt(e.target.value)}
//                               className={errors.transactionAmt ? 'error-border' : ''}
//                             />
//                             {errors.transactionAmt && (
//                               <div className="error-message">
//                                 {errors.transactionAmt}
//                               </div>
//                             )}

//                           </FormGroup>
//                         </Col>

//                       </Row>

//                     ) : null}


//                     {paymentMode === 'NF' || paymentMode === 'UP' ? (
//                       <Row>

//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" htmlFor="branchId">
//                               Transaction Number
//                             </Label>
//                             <Input
//                               type="text"
//                               value={transactionNo}
//                               onChange={(e) => setTransactionNo(e.target.value)}
//                               className={errors.transactionNo ? 'error-border' : ''}
//                             />
//                             {errors.transactionNo && (
//                               <div className="error-message">
//                                 {errors.transactionNo}
//                               </div>
//                             )}

//                           </FormGroup>
//                         </Col>


//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" for="branchId">Transaction Date</Label>
//                             <div>
//                               <DatePicker
//                                 selected={transactionDate}
//                                 wrapperClassName="custom-react-datepicker-wrapper"
//                                 onChange={(date) => {
//                                   if (date) {
//                                     setTransactionDate(date);
//                                   }
//                                 }}
//                                 value={transactionDate}
//                                 dateFormat="dd/MM/yyyy"
//                                 className={`form-control ${errors.paymentMode ? 'error-border' : ''}`}
//                                 customInput={<input style={{ width: '100%' }} />}
//                               />
//                               {errors.transactionDate && (
//                                 <div className="error-message">
//                                   {errors.transactionDate}
//                                 </div>
//                               )}

//                             </div>
//                           </FormGroup>
//                         </Col>


//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" htmlFor="branchId">
//                               Transaction Amount
//                             </Label>
//                             <Input
//                               type="number"
//                               value={transactionAmt}
//                               onChange={(e) => setTransactionAmt(e.target.value)}
//                               className={errors.transactionDate ? 'error-border' : ''}
//                             />
//                             {errors.transactionDate && (
//                               <div className="error-message">
//                                 {errors.transactionDate}
//                               </div>
//                             )}

//                           </FormGroup>
//                         </Col>
//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" htmlFor="branchId">
//                               Bank Name
//                             </Label>
//                             <Input
//                               type="text"
//                               value={transbankName}
//                               onChange={(e) => setTransbankName(e.target.value)}
//                               className={errors.transbankName ? 'error-border' : ''}
//                             />
//                             {errors.transbankName && (
//                               <div className="error-message">
//                                 {errors.transbankName}
//                               </div>
//                             )}
//                           </FormGroup>
//                         </Col>


//                       </Row>

//                     ) : null}



//                     {paymentMode === 'CA' ? (
//                       <Row>

//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" htmlFor="branchId">
//                               Amount
//                             </Label>
//                             <Input
//                               type="number"
//                               value={transactionAmt}
//                               onChange={(e) => setTransactionAmt(e.target.value)}
//                               className={errors.transactionAmt ? 'error-border' : ''}
//                             />

//                             {errors.transactionAmt && (
//                               <div className="error-message">
//                                 {errors.transactionAmt}
//                               </div>
//                             )}

//                           </FormGroup>
//                         </Col>


//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" for="branchId">Received Date</Label>
//                             <div>
//                               <DatePicker
//                                 selected={transactionDate}
//                                 wrapperClassName="custom-react-datepicker-wrapper"
//                                 onChange={(date) => {
//                                   if (date) {
//                                     setTransactionDate(date);
//                                   }
//                                 }}
//                                 value={transactionDate}
//                                 dateFormat="dd/MM/yyyy"
//                                 className={`form-control ${errors.transactionDate ? 'error-border' : ''}`}
//                                 customInput={<input style={{ width: '100%' }} />}
//                               />
//                               {errors.transactionDate && (
//                                 <div className="error-message">
//                                   {errors.transactionDate}
//                                 </div>
//                               )}
//                             </div>
//                           </FormGroup>
//                         </Col>
//                       </Row>

//                     ) : null}


//                     <div className="text-center">

//                       <Button
//                         variant="outline-success"
//                         style={{ marginTop: '1.5vw' }}
//                         onClick={() => addAdvance(partyId3)}>
//                         <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
//                         ADD
//                       </Button>
//                     </div>

//                   </CardBody>
//                 </Card>
//               </div>


//               {/* Billing Transaction */}

//               <div className="tab-pane fade" id="transaction" role="tabpanel" aria-labelledby="transaction-tab">
//                 <Card>
//                   <CardBody>
//                     <Row>
//                       <Col md={4}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Select Party</Label>
//                           <Select
//                             options={parties}
//                             value={{ value: partyName, label: partyName }}
//                             onChange={handlePartyChange}
//                             className={`${errors.partyname ? 'error-border' : ''
//                               } responsive-select`}
//                             isClearable
//                             styles={{
//                               control: (provided, state) => ({
//                                 ...provided,
//                                 border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                                 boxShadow: 'none',
//                                 '&:hover': {
//                                   border: '1px solid #ccc'
//                                 }
//                               }),
//                               indicatorSeparator: () => ({
//                                 display: 'none'
//                               }),
//                               dropdownIndicator: () => ({
//                                 display: 'none'
//                               })
//                             }}
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">From Date</Label>
//                           <div>
//                             <DatePicker
//                               selected={searchCriteria.startDate ? new Date(searchCriteria.startDate) : null}
//                               wrapperClassName="custom-react-datepicker-wrapper"
//                               onChange={(date) => {
//                                 if (date) {
//                                   setSearchCriteria({ ...searchCriteria, startDate: date.toISOString() });
//                                 } else {
//                                   setSearchCriteria({ ...searchCriteria, startDate: null });
//                                 }
//                               }}
//                               dateFormat="dd/MM/yyyy" // Specify the combined format
//                               className="form-control"
//                               customInput={<input style={{ width: '100%' }} />}
//                             />
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">To Date</Label>
//                           <div>
//                             <DatePicker
//                               selected={searchCriteria.endDate ? new Date(searchCriteria.endDate) : null}
//                               wrapperClassName="custom-react-datepicker-wrapper"
//                               onChange={(date) => {
//                                 if (date) {
//                                   setSearchCriteria({ ...searchCriteria, endDate: date.toISOString() });
//                                 } else {
//                                   setSearchCriteria({ ...searchCriteria, endDate: null });
//                                 }
//                               }}
//                               dateFormat="dd/MM/yyyy" // Specify the combined format
//                               className="form-control"
//                               customInput={<input style={{ width: '100%' }} />}
//                             />
//                           </div>
//                         </FormGroup>
//                       </Col>
//                       <Col md={2}>
//                         <Button
//                           variant="outline-primary"
//                           style={{ marginTop: '2vw' }}
//                           onClick={findBillingTransaction2222}

//                         >
//                           <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
//                           Search
//                         </Button>
//                       </Col>
//                     </Row>
//                   </CardBody>
//                 </Card>


//                 {combinewResults5.length > 0 ? (
//                   <div className='mt-4'>
//                     {/* <h4 className='text-center'>{partyName}</h4> */}

//                     <Table striped responsive bordered>
//                       <thead>
//                         <tr className='text-center'>
//                           <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>Party/Unit</th>
//                           <th rowSpan="2" style={{ width: '8%', background: '#BADDDA' }}>Date</th>
//                           <th colSpan="2" style={{ width: '5%', background: '#BADDDA' }}>IMP PCKGS</th>
//                           <th colSpan="2" style={{ width: '5%', background: '#BADDDA' }}>EXP PKGS</th>
//                           <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>Total PKGS</th>
//                           <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>IIND SAT</th>
//                           <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>DEMURAGES</th>
//                           <th colSpan="4" style={{ width: '30%', background: '#BADDDA' }}>EXPORT</th>
//                           <th colSpan="4" style={{ width: '30%', background: '#BADDDA' }}>IMPORT</th>
//                         </tr>
//                         <tr className='text-center'>
//                           <th style={{ width: '6%', background: '#BADDDA' }}>IMP</th>
//                           <th style={{ width: '6%', background: '#BADDDA' }}>SUB</th>
//                           <th style={{ width: '6%', background: '#BADDDA' }}>EXP</th>
//                           <th style={{ width: '6%', background: '#BADDDA' }}>SUB</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>SC</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>HW Wt</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>PC</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>OC</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>SC</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>HW Wt</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>PC</th>
//                           <th style={{ width: '8%', background: '#BADDDA' }}>OC</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {currentItems5.map((import2, index) =>
//                           <tr className="text-center dynamic-row-width">
//                             <td>{import2.partyName}</td>
//                             <td>{formatDateTime(import2.date)}</td>
//                             <td>{import2.nop}</td>
//                             <td>{import2.importSubNop}</td>
//                             <td>{import2.exportNoOfPackages}</td>
//                             <td>{import2.exportSubNop}</td>
//                             <td>{import2.totalPackages}</td>
//                             <td onClick={() => openHeavModal(import2, 'holiday')}>{import2.holidayStatus}</td>
//                             <td onClick={() => openHeavModal(import2, 'demurage')}>{import2.demuragesRate}</td>
//                             <td onClick={() => openHeavModal(import2, 'exportsc')}>{import2.exportScStatus}</td>
//                             <td onClick={() => openHeavModal(import2, 'export')}>{import2.exportHpStatus}</td>
//                             <td onClick={() => openHeavModal(import2, 'exportpc')}>{import2.exportPcStatus}</td>
//                             <td onClick={() => openHeavModal(import2, 'exportoc')}>{import2.exportpenalty}</td>
//                             <td onClick={() => openHeavModal(import2, 'importsc')}>{import2.importScStatus}</td>
//                             <td onClick={() => openHeavModal(import2, 'import')}>{import2.importHpStatus}</td>
//                             <td onClick={() => openHeavModal(import2, 'importpc')}>{import2.importPcStatus}</td>
//                             {/* <td className="table-column">{import2.importHpStatus}</td> */}
//                             <td onClick={() => openHeavModal(import2, 'importoc')}>{import2.importpenalty}</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </Table>
//                     <div>
//                       <Row>
//                         <Col md={8}></Col>
//                         {/* <Col md={3}></Col> */}
//                         <Col md={2}>

//                           <FormGroup>
//                             <Label className="forlabel" for="branchId">Total NIPT Packages</Label>
//                             <Input type="text" name="passengerName"
//                               className="form-control"
//                               value={niptPackages2}
//                               readOnly
//                               id='service'
//                             />
//                           </FormGroup>
//                         </Col>
//                         <Col md={2}>

//                           <FormGroup>
//                             <Label className="forlabel" for="branchId">Total Bill</Label>
//                             <Input type="text" name="passengerName"
//                               className="form-control"
//                               value={totalRate2}
//                               readOnly
//                               id='service'
//                             />
//                           </FormGroup>
//                         </Col>
//                       </Row>

//                     </div>

//                     <div className="text-center">

//                       <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//                         <Pagination.First onClick={() => handlePageChange5(1)} />
//                         <Pagination.Prev
//                           onClick={() => handlePageChange5(currentPage5 - 1)}
//                           disabled={currentPage5 === 1}
//                         />
//                         <Pagination.Ellipsis />

//                         {displayPages5().map((pageNumber) => (
//                           <Pagination.Item
//                             key={pageNumber}
//                             active={pageNumber === currentPage5}
//                             onClick={() => handlePageChange5(pageNumber)}
//                           >
//                             {pageNumber}
//                           </Pagination.Item>
//                         ))}

//                         <Pagination.Ellipsis />
//                         <Pagination.Next
//                           onClick={() => handlePageChange5(currentPage5 + 1)}
//                           disabled={currentPage5 === totalPages5}
//                         />
//                         <Pagination.Last onClick={() => handlePageChange5(totalPages5)} />
//                       </Pagination>
//                     </div>
//                   </div>
//                 ) : null}
//               </div>
















//             </div>
//           </div>

//         )

//       }



//       {/* Weight Showing Model */}

//       <Modal show={heavyModel} onHide={closeHeavyModel} size="lg">
//         <div className='modal-content'>

//           <div className="modal-header-bg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//             <div style={{ flex: '1' }}>
//               <h4 className="text-center mb-1">{getModalHeader(modalType)}</h4>
//             </div>
//             <FontAwesomeIcon icon={faMultiply} style={{ marginLeft: '5px', cursor: 'pointer', height: '1.5vw' }} onClick={closeHeavyModel} />
//           </div>
//           <hr style={{ marginTop: '0.5vw', marginBottom: '0.5vw' }} />
//           <Row style={{ marginLeft: '2vw', marginRight: '2vw' }}>
//             <Col>
//               <FormGroup>
//                 <Label className="forlabel" htmlFor="branchId">
//                   {getInputLabel(modalType)}
//                 </Label>
//                 <Input
//                   type="text"
//                   name="mobile"
//                   id="service"
//                   value={getInputValue(modalType, modalContent)}
//                 />
//               </FormGroup>
//             </Col>
//             <Col>
//               <FormGroup>
//                 <Label className="forlabel" htmlFor="branchId">
//                   {getInputRateLabel(modalType)}
//                 </Label>
//                 <Input
//                   type="text"
//                   name="mobile"
//                   id="service"
//                   value={getInputRateValue(modalType, modalContent)}
//                 />
//               </FormGroup>
//             </Col>
//           </Row>

//         </div>
//       </Modal>


//     </>
//   );
// };
// export default Payment_and_bill;




import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';

import Table from 'react-bootstrap/Table';
import { Modal } from 'react-bootstrap';
import { Button, Pagination } from 'react-bootstrap';
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import InviceService from '../services/InviceService';
import { Card, CardBody, Row, Col, FormGroup, Label, Input } from "reactstrap";
import Select from 'react-select';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSave, faServer, faAdd, faCross, faMultiply, faBolt, faDownLong, faDownload, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import '../Components/Style.css';
import ReactLoading from 'react-loading';
import moment from 'moment';
function Payment_and_bill() {

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
  const [parties, setParties] = useState([]);

  const [partiesByInviceType, setpartiesByInviceType] = useState([]);

  const [partyName, setparty_Name] = useState('');
  const [partyName2, setparty_Name2] = useState('');
  const [partyName3, setparty_Name3] = useState('');
  const [partyId2, setPartyId2] = useState('');
  const [partyId3, setPartyId3] = useState('');
  const [partyData, setPartyData] = useState([]);
  const [partyData2, setPartyData2] = useState([]);
  const [partyData3, setPartyData3] = useState([]);
  const [combinewResults, setcombinewResults] = useState([]);
  const [combinewResults5, setcombinewResults5] = useState([]);
  const [errors, setErrors] = useState({});
  const [modalContent, setModalContent] = useState({});
  const [modalType, setModalType] = useState('');
  const [heavyModel, setHeavyModel] = useState(false);
  const closeHeavyModel = () => { setHeavyModel(false); }
  const [InvoiceData, setInvoiceData] = useState([]);
  const [InvoiceNo, setInvoiceNo] = useState('');
  // const [InvoiceData2, setInvoiceData2] = useState([]);

  const [loading, setLoading] = useState(false);


  const findBillingTransaction2222 = async () => {

    console.log("Search");
    console.log(searchCriteria);

    setcombinewResults5([]);
    setLoading(true);
    try {
      // if (!partyName) {
      //   toast.error('Please Select Party', {
      //     position: toast.POSITION.TOP_CENTER,
      //     autoClose: 600,
      //   });
      // }

      const results = await InviceService.getBillingTransactionAfter(searchCriteria);
      if (!results.data || results.data.length === 0) {
        toast.info('No data found', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
        });
      } else {
        // setcombinewResults(results);
        setcombinewResults5(results.data);
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









  const makeFieldEmpty = () => {
    setparty_Name(''); setPartyId(''); setPartyId2(''); setPartyId3('');
    setparty_Name2(''); setparty_Name3(''); setPartyData([]); setPartyData2([]); setPartyData3([]);

    setcombinewResults([]); setErrors([]); setInvoiceData([]); setInvoiceNo('');
    setInvoicePayment([]);
    setInvoiceDataHistory([]);
  };



  // const [InvoiceDetail, setInvoiceDetail] = useState({});
  const openHeavModal = (data, type) => {

    // console.log(data);
    if ((type === 'export' && data.exportHpStatus !== 0) || (type === 'import' && data.importHpStatus !== 0) || (type === 'exportpc' && data.exportPcStatus !== 0) ||
      (type === 'exportsc' && data.exportScStatus !== 0) || (type === 'importsc' && data.importScStatus !== 0) || (type === 'importpc' && data.importPcStatus !== 0) ||
      (type === 'exportoc' && data.exportScStatus !== 0) || (type === 'importsc' && data.exportScStatus !== 0) || (type === 'holiday' && data.holidayStatus !== 0)) {
      setHeavyModel(true);
      setModalType(type);
      setModalContent(data);
    }

  };

  const [totalRate, setTotalRate] = useState(0);
  const [niptPackages, setNiptpackages] = useState(0);
  const [totalRate2, setTotalRate2] = useState(0);
  const [totalAllRate2, setTotalAllRate2] = useState(0);
  const [niptPackages2, setNiptpackages2] = useState(0);

  // Pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of items to display per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = combinewResults.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(combinewResults.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayPages2 = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage - middlePage;
    let endPage = currentPage + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages, centerPageCount);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };


  // Pagination 
  const [currentPage5, setCurrentPage5] = useState(1);
  const itemsPerPage5 = 31; // Number of items to display per page

  const indexOfLastItem5 = currentPage5 * itemsPerPage5;
  const indexOfFirstItem5 = indexOfLastItem5 - itemsPerPage5;
  const currentItems5 = combinewResults5.slice(indexOfFirstItem5, indexOfLastItem5);
  const totalPages5 = Math.ceil(combinewResults5.length / itemsPerPage5);

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















  function calculateTotalRateForPage(currentItems) {
    return currentItems.reduce((acc, record) => {
      const importRate = record.importRate || 0;
      const exportRate = record.exportRate || 0;
      const importScRate = record.importScStatus || 0;
      const importPcRate = record.importPcStatus || 0;
      const importHeavyRate = record.importHpStatus || 0;
      const exportScRate = record.exportScStatus || 0;
      const exportPcRate = record.exportPcStatus || 0;
      const exportHeavyRate = record.exportHpStatus || 0;
      const HolidayRate = record.holidayStatus || 0;
      const importpenalty = record.importpenalty || 0;
      const exportpenalty = record.exportpenalty || 0;
      const importSubRate = record.importSubRate || 0;
      const exportSubRate = record.exportSubRate || 0;
      const demuragesRate = record.demuragesRate || 0;
      return acc + importRate + demuragesRate + exportRate + importSubRate + exportSubRate + HolidayRate + importScRate + importPcRate + importHeavyRate + exportScRate + exportPcRate + exportHeavyRate + importpenalty + exportpenalty;
    }, 0);
  }


  function calculateNiptNop(current) {
    return current.reduce((acc, record) => {
      const niptPackages = record.niptPackages || 0;

      return acc + niptPackages;

    }, 0);
  };



  useEffect(() => {
    // Calculate the total rate for the current page
    const totalRateForPage = calculateTotalRateForPage(currentItems);

    const totalNiptPackages = calculateNiptNop(currentItems);

    setNiptpackages(totalNiptPackages);
    // Update the total rate state
    setTotalRate(totalRateForPage);
  }, [currentItems]);







  function calculateTotalRateForPageForPredefined(currentItems) {
    return currentItems.reduce((acc, record) => {
      const importRate = record.importRate || 0;
      const exportRate = record.exportRate || 0;
      const importScRate = record.importScRate || 0;
      const importPcRate = record.importPcRate || 0;
      const importHeavyRate = record.importHpRate || 0;
      const exportScRate = record.exportScRate || 0;
      const exportPcRate = record.exportPcRate || 0;
      const exportHeavyRate = record.exportHpRate || 0;
      const HolidayRate = record.holidayRate || 0;
      const importpenalty = record.importPenalty || 0;
      const exportpenalty = record.exportPenalty || 0;
      const importSubRate = record.importSubRate || 0;
      const exportSubRate = record.exportSubRate || 0;
      const demuragesRate = record.demuragesRate || 0;
      return acc + importRate + demuragesRate + exportRate + importSubRate + exportSubRate + HolidayRate + importScRate + importPcRate + importHeavyRate + exportScRate + exportPcRate + exportHeavyRate + importpenalty + exportpenalty;
    }, 0);
  }


  function calculateNiptNopPreDefined(current) {
    return current.reduce((acc, record) => {
      const niptPackages = record.niptPackages || 0;

      return acc + niptPackages;

    }, 0);
  };


  useEffect(() => {
    // Calculate the total rate for the current page
    const totalRateForPage = calculateTotalRateForPageForPredefined(currentItems5);

    const totalNiptPackages = calculateNiptNopPreDefined(currentItems5);

    setNiptpackages2(totalNiptPackages);
    // Update the total rate state
    setTotalRate2(totalRateForPage);
  }, [currentItems5]);


  useEffect(() => {
    // Calculate the total rate for the current page
    const totalRateForPage = calculateTotalRateForPageForPredefined(combinewResults5);
        
    // Update the total rate state
    setTotalAllRate2(totalRateForPage);
  }, [currentItems5]);




  // Function to get the modal header based on modalType
  const getModalHeader = (modalType) => {
    switch (modalType) {
      case 'export':
        return 'Export Heavy Weight';
      case 'import':
        return 'Import Heavy Weight';
      case 'importsc':
        return 'Import Special Carting';
      case 'exportsc':
        return 'Export Special Carting';
      case 'importpc':
        return 'Import Personal Carriage';
      case 'exportpc':
        return 'Export Personal Carriage';
      case 'holiday':
        return 'Holiday';
      default:
        return 'Default Header';
    }
  };

  // Function to get the input label based on modalType
  const getInputLabel = (modalType) => {
    switch (modalType) {
      case 'export':
        return 'Export Package Weight';
      case 'import':
        return 'Import Package Weight';
      case 'importsc':
        return 'Import Package';
      case 'exportsc':
        return 'Export Package';
      case 'importpc':
        return 'Import Package';
      case 'exportpc':
        return 'Export Package';
      case 'holiday':
        return 'Holiday';
      default:
        return 'Default Label';
    }
  };

  // Function to get the input rate label based on modalType
  const getInputRateLabel = (modalType) => {
    switch (modalType) {
      case 'export':
        return 'Export Heavy Weight Rate';
      case 'import':
        return 'Import Heavy Weight Rate';
      case 'importsc':
        return 'Import Special Carting Rate';
      case 'exportsc':
        return 'Export Special Carting  Rate';
      case 'importpc':
        return 'Import Personal Carriage Rate';
      case 'exportpc':
        return 'Export Personal Carriage Rate';
      case 'holiday':
        return 'Holiday Rate';
      default:
        return 'Default Rate Label';
    }
  };

  // Function to get the input value based on modalType and modalContent
  const getInputValue = (modalType, modalContent) => {
    switch (modalType) {
      case 'export':
        return modalContent.exportHpWeight;
      case 'import':
        return modalContent.importHpWeight;
      case 'importsc':
        return modalContent.nop;
      case 'exportsc':
        return modalContent.exportNoOfPackages;
      case 'importpc':
        return modalContent.nop;
      case 'exportpc':
        return modalContent.exportNoOfPackages;
      case 'holiday':
        return modalContent.totalPackages;
      default:
        return '';
    }
  };

  // Function to get the input rate value based on modalType and modalContent
  const getInputRateValue = (modalType, modalContent) => {
    switch (modalType) {
      case 'export':
        return modalContent.exportHpStatus;
      case 'import':
        return modalContent.importHpStatus;
      case 'importsc':
        return modalContent.importScStatus;
      case 'exportsc':
        return modalContent.exportScStatus;
      case 'importpc':
        return modalContent.importPcStatus;
      case 'exportpc':
        return modalContent.exportPcStatus;
      case 'holiday':
        return modalContent.holidayStatus;
      default:
        return '';
    }
  };













  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    logintype,
    logintypeid,

    login,
    logout,
  } = useContext(AuthContext);


  useEffect(() => {
    findParties();
    findPartiesByInvoiceType();
  }, []);




  const SearchPartyAmount = (partyId) => {

    alert("Party" + partyId)



  };

  const openAdvanceModel = () => {
    setadvancemodel(true);
  };


  // Proforma History
  const [partyName6, setpartyName6] = useState('');
  const [partyId6, setPartyId6] = useState('');
  const [ProformaDataHistory, setProformaDataHistory] = useState([]);

  const handlePartyChange6 = selectedOption => {
    setpartyName6(selectedOption ? selectedOption.label : '');
    setPartyId6(selectedOption ? selectedOption.value : '');


  };

  const SearchProformaHistry = async (partyId) => {

    if (!partyName6) {
      return toast.error("Please Select Party!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });

    } else {
      const response = await InviceService.getProformaByPartyId(companyid, branchId, partyId);
      setProformaDataHistory(response.data);
    }

  };

  // download Single Bill
  const downloadSingleProforma = async (partyId, invoiceNo) => {
    try {
      const response = await InviceService.getSingleBillPDFromBillsTab(companyid, branchId, partyId, invoiceNo);

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

        toast.success("Downloading Pdf!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 800,
        });
      } else {
        // Handle other status codes (e.g., error responses) as needed
        console.error("Error downloading PDF:", response.statusText);
        // Handle the error, show an error message, etc.
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle the error, show an error message, etc.
    }
  };

  // Download Single Invice 
  const downloadSingleProformaFromTab = async (partyId, invoiceNo) => {
    try {

      const response = await InviceService.getSingleProformaPDFromBillsTab(companyid, branchId, partyId, invoiceNo);


      if (response.status === 200) {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'Proforma.pdf'; // Set the filename for the downloaded PDF
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
      } else {
        // Handle other status codes (e.g., error responses) as needed
        console.error("Error downloading PDF:", response.statusText);
        // Handle the error, show an error message, etc.
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle the error, show an error message, etc.
    }

  };










  const formatDateTimeMonth = (value) => {
    if (!value) {
        return ""; // Return an empty string if value is empty or undefined
    }

    const date = new Date(value);
    const month = date.getMonth() + 1; // Adding 1 to get the current month (months are zero-indexed)
    const year = date.getFullYear();

    const monthInLetters = date.toLocaleString('default', { month: 'long' });

    return `${monthInLetters} ${year}`;
};










  const findPartiesByInvoiceType = async () => {
    const partyResponse = await Rate_Chart_Service.getAllPartiesByInviceType(companyid, branchId, "Instant");
    const partyOptions = partyResponse.data.map(party => ({
      value: party.partyId,
      label: party.partyName
    }));
    setpartiesByInviceType(partyOptions);

  };

  const [partyNames, setPartyNames] = useState({});
  // Getall Parties
  const findParties = async () => {
    const partyResponse = await Rate_Chart_Service.getAllParties(companyid, branchId);
    const namesMap = {};

    partyResponse.data.forEach(party => {
      namesMap[party.partyId] = party.partyName;
    });
    setPartyNames(namesMap);
    const partyOptions = partyResponse.data.map(party => ({
      value: party.partyId,
      label: party.partyName
    }));
    setParties(partyOptions);

  };

  const formatDateTime = (value) => {
    if (!value) {
      return ""; // Return an empty string if value is empty or undefined
    }

    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const handlePartyChange = selectedOption => {
    setparty_Name(selectedOption ? selectedOption.label : '');
    setSearchCriteria({ ...searchCriteria, PartyId: selectedOption ? selectedOption.value : '' });
  };


  const handlePartyChangeBillingTransaction = selectedOption => {
    setparty_Name(selectedOption ? selectedOption.label : '');
    setSearchCriteria({ ...searchCriteria, PartyId: selectedOption ? selectedOption.value : '' });
  };




  const handlePartyChange2 = selectedOption => {
    setparty_Name2(selectedOption ? selectedOption.label : '');
    setPartyId2(selectedOption ? selectedOption.value : '');


  };
  const handlePartyChange3 = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setparty_Name3('');
      setPartyId3('');
      setInvoicePayment([]);
      setAdvAmt(0);
      setBalAdvAmt(0);
      setPaymentMode('');
    }
    else {
      setparty_Name3(selectedOption ? selectedOption.label : '');
      setPartyId3(selectedOption ? selectedOption.value : '');
      // getTransByPartyId(selectedOption ? selectedOption.value : '');
      getInvoiceDataByPartyId(selectedOption ? selectedOption.value : '');
      getbyAdvancePartyId(selectedOption ? selectedOption.value : '')

    }

  };

  const findCombinedResults = async (data) => {
    // console.log(data);
    const results = await InviceService.getCombinedImportsandxports(data);
    // console.log(results.data);
    return results.data;
  };

  // Download Pdf
  const downLoadPdf = async (invoiceNo) => {
    try {

      console.log("Printing   ");
      // console.log(invoiceList);
      const response = await InviceService.downLoadProforma(companyid, branchId, invoiceNo);

      if (response.status === 200) {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'ProformaNoBill.pdf'; // Set the filename for the downloaded PDF
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
      } else {
        // Handle other status codes (e.g., error responses) as needed
        console.error("Error downloading PDF:", response.statusText);
        // Handle the error, show an error message, etc.
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle the error, show an error message, etc.
    }
  };


  // DownLoad Bill

  const downLoadBillPdf = async (invoiceNo, invoiceList) => {
    try {
      const response = await InviceService.downLoadBill(companyid, branchId, invoiceNo, invoiceList);

      if (response.status === 200) {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'Annexure.pdf'; // Set the filename for the downloaded PDF
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
      } else {
        // Handle other status codes (e.g., error responses) as needed
        console.error("Error downloading PDF:", response.statusText);
        // Handle the error, show an error message, etc.
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle the error, show an error message, etc.
    }
  };

















  const findBillingTransaction = async () => {

    if (!partyName) {
      return toast.error("Please Select Party!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });

    } else {
      const result = await findCombinedResults(searchCriteria);
      setcombinewResults(result);

      console.log("Combined Results ");
      console.log(result.data);
    }


    // console.log(result);
  };

  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
  };





  const currentDate = new Date();

  // Set startDate to the 1st day of the current month
  const startDate1 = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  // Set endDate to 1 day before the current date
  const endDate1 = new Date(currentDate);
  endDate1.setDate(endDate1.getDate() - 1);

  const initialSearchCriteria = {
    companyid: companyid,
    branchId: branchId,
    userId: userId,
    PartyId: '',
    startDate: formatDate(startDate1),
    endDate: formatDate(endDate1),

  };
  const initialSearchCriteria2 =
  {
    companyid: companyid,
    branchId: branchId,
    PartyId: '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    invoiceNo: ''
  };

  const [InvoiceHistoryData, setInvoiceHistoryData] = useState([]);
  const [currentPage1, setCurrentPage1] = useState(1);
  const itemsPerPage1 = 30; // Number of items to display per page



  // Calculate the start and end indices for the current page
  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems1 = InvoiceHistoryData.slice(indexOfFirstItem1, indexOfLastItem1);
  const totalPages1 = Math.ceil(InvoiceHistoryData.length / itemsPerPage1);

  // console.log("total Pages "+totalPages1);
  const handlePageChange1 = (page) => {
    setCurrentPage1(page);
  };

  const displayPages = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage1 - middlePage;
    let endPage = currentPage1 + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages1, centerPageCount);
    }

    if (endPage > totalPages1) {
      endPage = totalPages1;
      startPage = Math.max(1, totalPages1 - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };



  const [searchCriteria2, setSearchCriteria2] = useState(initialSearchCriteria2);
  const [partyName5, setparty_Name5] = useState('');
  const [invoiceNumbers, setInvoiceNumbers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await InviceService.SearchInvoiceNoList({ params: searchCriteria2 });
      // console.log("Invoice List");
      // console.log(response.data);
      setInvoiceNumbers(response.data);
      // Handle the response or set it in the state
    };

    if (partyName5) {
      fetchData();
    }
  }, [searchCriteria2]); // This will trigger whenever searchCriteria2 changes


  const handlePartyChange5 = async selectedOption => {
    const partyId = selectedOption ? selectedOption.value : '';
    setparty_Name5(selectedOption ? selectedOption.label : '');

    // Update the state in the callback of setSearchCriteria2
    setSearchCriteria2(prevSearchCriteria => ({
      ...prevSearchCriteria,
      PartyId: partyId
    }));
  };
  const findHistory = async () => {
    if (!partyName5) {
      return toast.error("Please Select Party!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    }
    const response = await InviceService.SearchInvoiceNoListByInvoiceHistoryNumber({ params: searchCriteria2 });
    if (!response.data || response.data.length === 0) {
      toast.error("No records found!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
      setInvoiceHistoryData([]);
    } else {
      setInvoiceHistoryData(response.data);
    }

  };



  const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria);
  const resetSearchCriteria = () => {
    setSearchCriteria(initialSearchCriteria);
    setparty_Name('');
    setcombinewResults([]);
    setcombinewResults5([]);

  };

  const datesArray = combinewResults.map(item => item.date);

  // Find the lowest and highest dates
  const lowestDate = new Date(Math.min(...datesArray));
  const highestDate = new Date(Math.max(...datesArray));


  const GenerateInvoice = async () => {
    Swal.fire({
      title: 'Are you sure?',
      html: `Generating Proforma for <b>${partyName}</b> from  ${formatDateTime(lowestDate)} to ${formatDateTime(highestDate)}!`,
      showCancelButton: true,
      width: 'auto',
      confirmButtonText: 'OK',
      customClass: {
        title: 'your-custom-title-class1', // Define a custom class for the title
        cancelButton: 'your-custom-cancel-button-class', // Define a custom class for the cancel button
        confirmButton: 'your-custom-confirm-button-class', // Define a custom class for the confirm button
        content: 'your-custom-content-class', // Define a custom class for the content
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        handleGenerateInvoice();
      }
    });

    const modal = document.querySelector('.swal2-popup');
    if (modal) {
      modal.style.bottom = '6vw'; // Adjust the top value as needed
    }
  };


  // Getting Invoice Detail list By Invoice Number

  const getInvoiceDetailByInvoiceNumber = async (partyId, invoiceno) => {

    await InviceService.getInvoiceDetailByInvoiceNo(companyid, branchId, partyId, invoiceno).then((res) => {

      setInvoiceData(res.data);
      setInvoiceNo(invoiceno);

    });
  };




  const handleGenerateInvoice = async () => {


    try {
      const response = await InviceService.generateInvoice(searchCriteria);

      getInvoiceDetailByInvoiceNumber(response.data.partyId, response.data.proformaNo);

      toast.success("Invoice Created Sccessfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
      findBillingTransaction();
      // Handle the successful response here
    } catch (error) {
      // Handle the error here
      toast.error("Something Went Wrong!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
      findBillingTransaction();
      console.error("An error occurred while generating the invoice:", error);
      // You can also display an error message to the user if needed
    }
  };

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);




  // /////////////****************////////////////////////*******************/////********/*//////////////////// */ */ */


  const [InvoiceDataHistory, setInvoiceDataHistory] = useState([]);
  const SearchInvoiceHistry = async (partiId2) => {



    if (!partyName2) {
      return toast.error("Please Select Party!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });

    } else {
      const response = await InviceService.getMainByPartyId(companyid, branchId, partiId2);
      setInvoiceDataHistory(response.data);
    }
  };

  // download Single Bill
  const downloadSingleBill = async (partyId, invoiceNo) => {
    try {
      const response = await InviceService.getSingleBillPDFromBillsTab(companyid, branchId, partyId, invoiceNo);

      if (response.status === 200) {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'Annexure.pdf'; // Set the filename for the downloaded PDF
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
      } else {
        // Handle other status codes (e.g., error responses) as needed
        console.error("Error downloading PDF:", response.statusText);
        // Handle the error, show an error message, etc.
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle the error, show an error message, etc.
    }
  };

  // Download Single Invice 
  const downloadSingleInvice = async (partyId, invoiceNo) => {
    try {

      const response = await InviceService.getSingleInvicePDFromBillsTab(companyid, branchId, partyId, invoiceNo);


      if (response.status === 200) {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'Invoice.pdf'; // Set the filename for the downloaded PDF
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
      } else {
        // Handle other status codes (e.g., error responses) as needed
        console.error("Error downloading PDF:", response.statusText);
        // Handle the error, show an error message, etc.
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle the error, show an error message, etc.
    }

  };

  // Download Single Demurages Report


  // downloadSingleDemurages

  const downloadSingleDemurages = async (partyId, invoiceNo) => {
    try {

      const response = await InviceService.getSingleDemuragesPDFromBillsTab(companyid, branchId, partyId, invoiceNo);


      if (response.status === 200) {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'Demurages Report.pdf'; // Set the filename for the downloaded PDF
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
      } else {
        // Handle other status codes (e.g., error responses) as needed
        console.error("Error downloading PDF:", response.statusText);
        // Handle the error, show an error message, etc.
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Handle the error, show an error message, etc.
    }

  };


  //  make Advance tab Empty

  const makeAdvanceTabEmpty = () => {
    setTransId(''); setDocType(''); setTransDate(new Date()); setPartyId(''); setPaymentMode(''); setChequeNo(''); setChequeDate(null);
    setBankName(''); setsrNo(0); setTransactionNo(''); setTransactionDate(null); setTransactionAmt(0); setTransbankName(''); setCurrency('');
    setReceiptAmt(0); setNarration(''); setClearedAmt(0); setAdvTransId(''); setAdvTransDate(null); setAdvFlag(''); setBalAdvAmt(0); setAdvAmt(0);
    setBankReconFlag(''); setBankReconDate(null); setBankReconAmt(0); setTdsPercentage(0); setTdsAmt(0); setTdsStatus(''); setCreatedBy(''); setCreatedDate(null);
    setEditedBy(''); setEditedDate(null); setApprovedBy(''); setApprovedDate(null);


  };
  // **************************************************************************************************
  // Payement Section 

  const [transId, setTransId] = useState('');
  const [docType, setDocType] = useState('');
  const [transDate, setTransDate] = useState(new Date()); // Initialize with null for Date
  const [partyId, setPartyId] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [chequeNo, setChequeNo] = useState('');
  const [chequeDate, setChequeDate] = useState(null);
  const [bankName, setBankName] = useState('');
  const [srNo, setsrNo] = useState('');
  const [transactionNo, setTransactionNo] = useState('');
  const [transactionDate, setTransactionDate] = useState(null);
  const [transactionAmt, setTransactionAmt] = useState(0); // Initialize with 0 for double
  const [transbankName, setTransbankName] = useState('');
  const [currency, setCurrency] = useState("INR");
  const [receiptAmt, setReceiptAmt] = useState(0);
  const [narration, setNarration] = useState('');
  const [clearedAmt, setClearedAmt] = useState(0);
  const [advTransId, setAdvTransId] = useState('');
  const [advTransDate, setAdvTransDate] = useState(new Date);
  const [advFlag, setAdvFlag] = useState('');
  const [balAdvAmt, setBalAdvAmt] = useState(0);
  const [advAmt, setAdvAmt] = useState(0);
  const [bankReconFlag, setBankReconFlag] = useState('');
  const [bankReconDate, setBankReconDate] = useState(null);
  const [bankReconAmt, setBankReconAmt] = useState(0);
  const [tdsPercentage, setTdsPercentage] = useState(0);
  const [tdsAmt, setTdsAmt] = useState(0);
  const [tdsStatus, setTdsStatus] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [createdDate, setCreatedDate] = useState(null);
  const [editedBy, setEditedBy] = useState('');
  const [editedDate, setEditedDate] = useState(null);
  const [approvedBy, setApprovedBy] = useState('');
  const [approvedDate, setApprovedDate] = useState(null);
  const [invoiceNo, setinvoiceNo] = useState('');
  const [invoiceDate, setinvoiceDate] = useState(null);
  const [invoiceAmt, setinvoiceAmt] = useState('');
  const [advancemodel, setadvancemodel] = useState(false)


  const [InvoicePayment, setInvoicePayment] = useState([]);


  const getInvoiceDataByPartyId = (partyId) => {

    InviceService.getMainByPartyId(companyid, branchId, partyId).then((res) => {

      setInvoicePayment(res.data)

    });

  };


  const addAdvance = async (partyId) => {

    const newErrors = {};

    if (!partyId3) {
      newErrors['partyId3'] = 'party is required.';
      return setErrors(newErrors);
    }
    if (!paymentMode) {
      newErrors['paymentMode'] = 'paymentMode is required.';
      return setErrors(newErrors);
    }


    if (paymentMode === 'NF' || paymentMode === 'UP') {
      if (!transactionAmt) {
        newErrors['transactionAmt'] = 'transactionAmt is required.';
        return setErrors(newErrors);
      }
      if (!transactionNo) {
        newErrors['transactionNo'] = 'paymentMode is required.';
        return setErrors(newErrors);
      }
      if (!transactionDate) {
        newErrors['transactionDate'] = 'transactionDate is required.';
        return setErrors(newErrors);
      }
    };
    if (paymentMode === 'CQ') {
      if (!chequeNo) {
        newErrors['chequeNo'] = 'chequeNo is required.';
        return setErrors(newErrors);
      }

      if (!chequeDate) {
        newErrors['chequeDate'] = 'chequeDate is required.';
        return setErrors(newErrors);
      }

      if (!transbankName) {
        newErrors['transbankName'] = 'TransbankName is required.';
        return setErrors(newErrors);
      }
      if (!transactionAmt) {
        newErrors['transactionAmt'] = 'transactionAmt is required.';
        return setErrors(newErrors);
      }

    };


    if (paymentMode === 'CA') {

      if (!transactionAmt) {
        newErrors['transactionAmt'] = 'transactionAmt is required.';
        return setErrors(newErrors);
      }


    }






    const response = await InviceService.addAdvamce(companyid, branchId, partyId, FinTranceData);
    toast.success('Advance Amount Added Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 600,
    });
    await getTransByReceiptId(response.data.partyId, response.data.transId);
  };



  const getTransByReceiptId = async (partyId, receiptId) => {
    InviceService.getTransByReceiptId(companyid, branchId, receiptId, partyId).then((res) => {
      setTransId(res.data.transId);
      setDocType(res.data.docType);
      setTransDate(res.data.transDate);
      setPartyId(res.data.partyId);
      setPaymentMode(res.data.paymentMode);
      setChequeNo(res.data.chequeNo);
      setChequeDate(res.data.chequeDate);
      setBankName(res.data.bankName);
      setsrNo(res.data.srNo);
      setTransactionNo(res.data.transactionNo);
      setTransactionDate(res.data.transactionDate);
      setTransactionAmt(res.data.transactionAmt);
      setTransbankName(res.data.transbankName);
      setCurrency(res.data.currency);
      setReceiptAmt(res.data.receiptAmt);
      setNarration(res.data.narration);
      setClearedAmt(res.data.clearedAmt);
      setAdvTransId(res.data.advTransId);
      setAdvTransDate(res.data.advTransDate);
      setAdvFlag(res.data.advFlag);
      setBalAdvAmt(res.data.balAdvAmt);
      setAdvAmt(res.data.advAmt);
      setBankReconFlag(res.data.bankReconFlag);
      setBankReconDate(res.data.bankReconDate);
      setBankReconAmt(res.data.bankReconDate);
      setTdsPercentage(res.data.tdsPercentage);
      setTdsAmt(res.data.tdsAmt);
      setTdsStatus(res.data.tdsStatus);
      setCreatedBy(res.data.createdBy);
      setCreatedDate(res.data.createdDate);
      setEditedBy(res.data.editedBy);
      setEditedDate(res.data.editedDate);
      setApprovedBy(res.data.approvedBy);
      setApprovedDate(res.data.approvedDate);
      setinvoiceNo(res.data.invoiceNo);
      setinvoiceDate(res.data.inviceDate);
      setinvoiceAmt(res.data.invoiceAmt);
    });
  };




  const getbyAdvancePartyId = async (partyId) => {
    const response = await InviceService.getPartyAdvAndClearedAmount(companyid, branchId, partyId);
    const [advAndCleared] = response.data;
    const [totalAdvAmt, totalClearedAmt] = advAndCleared.split(',').map(value => {
      if (value.trim() === 'null') {
        return 0; // Replace 'null' strings with 0
      }
      return parseFloat(value.trim()); // Parse other values to float
    });
    console.log("Advance Received ");
    console.log(response.data);


    // console.log("Advance Amount ", totalAdvAmt);
    console.log("Cleared Amount ", totalClearedAmt);
    console.log("Balance Amount ", totalAdvAmt - totalClearedAmt);
    setAdvAmt(totalAdvAmt);
    setBalAdvAmt(totalAdvAmt - totalClearedAmt);
    // console.log(response.data);
  };

  const FinTranceData = {
    transId, docType, transDate, partyId, paymentMode, chequeNo, chequeDate, bankName, transactionNo,
    transactionDate, transactionAmt, currency, receiptAmt, narration, clearedAmt, advTransId, advTransDate, advFlag,
    balAdvAmt, advAmt, bankReconFlag, bankReconDate, bankReconAmt, tdsPercentage, tdsAmt, tdsStatus, createdBy, createdDate, editedBy,
    editedDate, approvedBy, approvedDate, transbankName
  };

  const FinTranceDTLData =
  {
    invoiceNo, transId, transDate, srNo, partyId, invoiceDate, invoiceAmt, receiptAmt, createdBy,
    createdDate, editedBy, editedDate, approvedBy, approvedDate
  };


  const getTransByPartyId = async (partyId) => {
    const response = await InviceService.getTransIdByPartyId(companyid, branchId, partyId);

    // console.log(partyId);
    // console.log(response.data);
    setAdvAmt(response.data.advAmt);
    setBalAdvAmt(response.data.balAdvAmt);


  }



  const addAdvanceAmount = () => {


  };



  //Party

  const [InvoiceDataHistory1, setInvoiceDataHistory1] = useState([]);
  const SearchInvoiceHistry1 = async () => {
    if (logintype === 'Party') {

      const response = await InviceService.getMainByPartyId(companyid, branchId, logintypeid);
      setInvoiceDataHistory1(response.data);
    }


  };

  useEffect(() => {
    SearchInvoiceHistry1();
  }, [])



  return (

    <>
      {loading && (
        <div style={styles.overlay}>
          <ReactLoading type="spin" color="#0000FF" height={300} width={80} />
        </div>
      )}

      {logintype === 'Party' ? (
        <>

          {InvoiceDataHistory1.length > 0 ? (
            <div>
              <h4 className='text-center'>{partyName}</h4>

              <Table striped responsive bordered>
                <thead>
                  <tr className='text-center'>
                    <th style={{ background: '#BADDDA' }}>Sr No</th>
                    <th style={{ background: '#BADDDA' }}>Bill No</th>
                    <th style={{ background: '#BADDDA' }}>Month</th>
                    <th style={{ background: '#BADDDA' }}>Amount</th>
                    <th style={{ background: '#BADDDA' }}>Annexure</th>
                    <th style={{ background: '#BADDDA' }}>Invoice</th>
                    {/* <th style={{ background: '#BADDDA' }}>Demurage</th> */}
                    <th style={{ background: '#BADDDA' }}>Payment Status</th>

                  </tr>
                </thead>
                <tbody>
                  {InvoiceDataHistory1.map((invoice, index) =>
                    <tr className="text-center dynamic-row-width">
                      <td>{index + 1}</td>
                      <td>{invoice.billNO}</td>
                      <td>{formatDateTimeMonth(invoice.invoiceDate)}</td>
                      <td>{invoice.totalInvoiceAmount}</td>
                      <td>
                        <Button
                          variant="outline-success"
                          onClick={(e) => downloadSingleBill(invoice.partyId, invoice.invoiceNO)}
                        >
                          <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
                          {/* Download */}
                        </Button>
                      </td>
                      <td>

                        <Button
                          variant="outline-success"
                          onClick={(e) => downloadSingleInvice(invoice.partyId, invoice.invoiceNO)}
                        >
                          <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
                          {/* Download */}
                        </Button>


                      </td>
                      {/* <td>

                        <Button
                          variant="outline-success"
                          onClick={(e) => downloadSingleDemurages(invoice.partyId, invoice.invoiceNO)}
                        >
                          <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
                          Download
                        </Button>


                      </td> */}
                      <td>{invoice.paymentStatus === 'P' ? "Pending" : invoice.paymentStatus === 'C' ? "Cleared" : ''}</td>

                    </tr>
                  )}
                </tbody>
              </Table>

            </div>



          ) : null}

        </>
      )
        :
        (
          <div className='' style={{ marginTop: 20 }}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item tabspace" role="presentation">
                <button style={{ color: 'gray' }} className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true" onClick={resetSearchCriteria}><h6>Proforma Creation</h6></button>
              </li>

              <li className="nav-item tabspace" role="presentation">
                <button style={{ color: 'gray' }} className="nav-link" id="transaction-tab" data-bs-toggle="tab" data-bs-target="#transaction" type="button" role="tab" aria-controls="transaction" aria-selected="false" onClick={resetSearchCriteria}><h6>Billing Transaction</h6></button>
              </li>

              <li className="nav-item tabspace" role="presentation">
                <button style={{ color: 'gray' }} className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><h6>Bills</h6></button>
              </li>

              <li className="nav-item tabspace" role="presentation">
                <button style={{ color: 'gray' }} className="nav-link" id="Proforma-tab" data-bs-toggle="tab" data-bs-target="#Proforma" type="button" role="tab" aria-controls="Proforma" aria-selected="false"><h6>Proforma</h6></button>
              </li>

              <li className="nav-item tabspace" role="presentation">
                <button style={{ color: 'gray' }} className="nav-link" id="history-tab" data-bs-toggle="tab" data-bs-target="#history" type="button" role="tab" aria-controls="history" aria-selected="false"><h6>History</h6></button>
              </li>


              <li className="nav-item tabspace" role="presentation">
                <button onClick={() => { makeFieldEmpty(); makeAdvanceTabEmpty(); }} style={{ color: 'gray' }} className="nav-link" id="payment-tab" data-bs-toggle="tab" data-bs-target="#payment" type="button" role="tab" aria-controls="payment" aria-selected="false"><h6>Payment Transaction</h6></button>
              </li>

              <li className="nav-item tabspace" role="presentation">
                <button onClick={() => { makeFieldEmpty(); makeAdvanceTabEmpty(); }} style={{ color: 'gray' }} className="nav-link" id="advance-tab" data-bs-toggle="tab" data-bs-target="#advance" type="button" role="tab" aria-controls="advance" aria-selected="false"><h6>Add Advance</h6></button>
              </li>

            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={4}>

                        <FormGroup>
                          <Label className="forlabel" for="branchId">Select Party</Label>
                          <Select
                            options={partiesByInviceType}
                            value={{ value: partyName, label: partyName }}
                            onChange={handlePartyChange}
                            className={`${errors.partyname ? 'error-border' : ''
                              } responsive-select`}
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

                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">From Date</Label>
                          <div>
                            <DatePicker
                              selected={searchCriteria.startDate ? new Date(searchCriteria.startDate) : null}
                              wrapperClassName="custom-react-datepicker-wrapper"
                              onChange={(date) => {
                                if (date) {
                                  setSearchCriteria({ ...searchCriteria, startDate: date.toISOString() });
                                } else {
                                  setSearchCriteria({ ...searchCriteria, startDate: null });
                                }
                              }}
                              dateFormat="dd/MM/yyyy" // Specify the combined format
                              className="form-control"
                              customInput={<input style={{ width: '100%' }} />}
                            />
                          </div>
                        </FormGroup>

                      </Col>
                      <Col md={3}>


                        <FormGroup>
                          <Label className="forlabel" for="branchId">To Date</Label>
                          <div>
                            <DatePicker
                              selected={searchCriteria.endDate ? new Date(searchCriteria.endDate) : null}
                              wrapperClassName="custom-react-datepicker-wrapper"
                              onChange={(date) => {
                                if (date) {
                                  setSearchCriteria({ ...searchCriteria, endDate: date.toISOString() });
                                } else {
                                  setSearchCriteria({ ...searchCriteria, endDate: null });
                                }
                              }}
                              dateFormat="dd/MM/yyyy" // Specify the combined format
                              className="form-control"
                              customInput={<input style={{ width: '100%' }} />}

                            />
                          </div>
                        </FormGroup>


                      </Col>
                      <Col md={2}>
                        <Button
                          variant="outline-primary"
                          style={{ marginTop: '2vw' }}
                          onClick={findBillingTransaction}

                        >
                          <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                          Search
                        </Button>
                      </Col>



                    </Row>
                  </CardBody>
                </Card>

                {combinewResults.length > 0 ? (

                  <div className="mt-4">
                    <Table responsive bordered className="">
                      <thead>
                        <tr className="text-center">
                          <th rowSpan="2" style={{ width: '15%', background: '#BADDDA' }}>Party</th>
                          <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>Date</th>
                          <th colSpan="2" style={{ width: '10%', background: '#BADDDA' }}>IMP PKGS</th>
                          <th colSpan="2" style={{ width: '10%', background: '#BADDDA' }}>EXP PKGS</th>
                          <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>TOT PKGS</th>
                          <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>IIND SAT</th>
                          <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>DEMURAGES</th>
                          <th colSpan="4" style={{ width: '25%', background: '#BADDDA' }}>EXPORT</th>
                          <th colSpan="4" style={{ width: '25%', background: '#BADDDA' }}>IMPORT</th>
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

                        {currentItems.map((import2, index) =>

                          <tr className="text-center dynamic-row-width">
                            <td>{import2.partyName}</td>
                            <td>{formatDateTime(import2.date)}</td>
                            <td>{import2.nop}</td>
                            <td>{import2.importSubNop}</td>
                            <td>{import2.exportNoOfPackages}</td>
                            <td>{import2.exportSubNop}</td>
                            <td>{import2.totalPackages}</td>

                            <td onClick={() => openHeavModal(import2, 'holiday')}>{import2.holidayStatus}</td>
                            <td onClick={() => openHeavModal(import2, 'demurage')}>{import2.demuragesRate}</td>
                            <td onClick={() => openHeavModal(import2, 'exportsc')}>{import2.exportScStatus}</td>
                            <td onClick={() => openHeavModal(import2, 'export')}>{import2.exportHpStatus}</td>
                            <td onClick={() => openHeavModal(import2, 'exportpc')}>{import2.exportPcStatus}</td>
                            <td onClick={() => openHeavModal(import2, 'exportoc')}>{import2.exportpenalty}</td>

                            <td onClick={() => openHeavModal(import2, 'importsc')}>{import2.importScStatus}</td>
                            <td onClick={() => openHeavModal(import2, 'import')}>{import2.importHpStatus}</td>
                            <td onClick={() => openHeavModal(import2, 'importpc')}>{import2.importPcStatus}</td>
                            {/* <td className="table-column">{import2.importHpStatus}</td> */}
                            <td onClick={() => openHeavModal(import2, 'importoc')}>{import2.importpenalty}</td>
                          </tr>
                        )
                        }
                      </tbody>
                    </Table>
                    <div>
                      <Row>

                        <Col md={1}></Col>
                        <Col md={4}>
                          <Button
                            variant="outline-success"
                            style={{ marginTop: '2vw' }}
                            onClick={GenerateInvoice}
                          >
                            <FontAwesomeIcon icon={faBolt} style={{ marginRight: '5px' }} />
                            Generate Proforma
                          </Button>
                        </Col>
                        <Col md={3}></Col>
                        <Col md={2}>

                          <FormGroup>
                            <Label className="forlabel" for="branchId">Total NIPT Packages</Label>
                            <Input type="text" name="passengerName"
                              className="form-control"
                              value={niptPackages}
                              readOnly
                              id='service'
                            />
                          </FormGroup>
                        </Col>
                        <Col md={2}>

                          <FormGroup>
                            <Label className="forlabel" for="branchId">Total Bill</Label>
                            <Input type="text" name="passengerName"
                              className="form-control"
                              value={totalRate}
                              readOnly
                              id='service'
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                    </div>

                    <div className="text-center">

                      <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                        <Pagination.First onClick={() => handlePageChange(1)} />
                        <Pagination.Prev
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        />
                        <Pagination.Ellipsis />

                        {displayPages2().map((pageNumber) => (
                          <Pagination.Item
                            key={pageNumber}
                            active={pageNumber === currentPage}
                            onClick={() => handlePageChange(pageNumber)}
                          >
                            {pageNumber}
                          </Pagination.Item>
                        ))}

                        <Pagination.Ellipsis />
                        <Pagination.Next
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        />
                        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                      </Pagination>

                    </div>



                  </div>

                ) : null}

                {InvoiceData.length > 0 ? (
                  <div>
                    <h4 className='text-center'>{partyName}</h4>

                    <Table striped responsive bordered>
                      <thead>
                        <tr className='text-center'>
                          <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>Sr No</th>
                          <th rowSpan="2" style={{ width: '8%', background: '#BADDDA' }}>Date</th>
                          <th colSpan="2" style={{ width: '5%', background: '#BADDDA' }}>IMP PCKGS</th>
                          <th colSpan="2" style={{ width: '5%', background: '#BADDDA' }}>EXP PKGS</th>
                          <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>Total PKGS</th>
                          <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>IIND SAT</th>
                          <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>DEMURAGES</th>
                          <th colSpan="4" style={{ width: '30%', background: '#BADDDA' }}>EXPORT</th>
                          <th colSpan="4" style={{ width: '30%', background: '#BADDDA' }}>IMPORT</th>
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
                        {InvoiceData.map((invoice, index) =>
                          <tr className="text-center dynamic-row-width">
                            <td>{index + 1}</td>
                            <td>{formatDateTime(invoice.proformaNoDate)}</td>
                            <td>{invoice.importNoOfPackages}</td>
                            <td>{invoice.importSubNop}</td>
                            <td>{invoice.exportNoOfPackages}</td>
                            <td>{invoice.exportSubNop}</td>
                            <td>{invoice.totalPackages}</td>
                            <td>{invoice.holidayRate}</td>
                            <td>{invoice.demuragesRate}</td>
                            <td>{invoice.exportScRate}</td>
                            <td>{invoice.exportHpRate}</td>
                            <td>{invoice.exportPcRate}</td>
                            <td>{invoice.exportPenalty}</td>
                            <td>{invoice.importScRate}</td>
                            <td>{invoice.importHpRate}</td>
                            <td>{invoice.importPcRate}</td>
                            <td>{invoice.importPenalty}</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                    <Row>
                      <Col md={3}>
                        <Button
                          variant="outline-success"
                          style={{ marginTop: '1.7vw' }}
                          onClick={() => downLoadPdf(InvoiceNo)}
                        >
                          <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
                          Download Proforma
                        </Button></Col>



                    </Row>

                  </div>



                ) : null}




              </div>


              <div className="tab-pane fade " id="Proforma" role="tabpanel" aria-labelledby="Proforma-tab">
                <Card>

                  <CardBody>

                    <Row>
                      <Col md={5}>

                        <FormGroup>
                          <Label className="forlabel" for="branchId">Select Party</Label>


                          <Select
                            options={parties}
                            value={{ value: partyName6, label: partyName6 }}
                            onChange={handlePartyChange6}
                            className={errors.partyName6 ? 'error-border' : ''}
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

                      <Col md={2}>
                        <Button
                          variant="outline-primary"
                          style={{ marginTop: '2vw' }}

                          onClick={(e) => SearchProformaHistry(partyId6)}
                        >
                          <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                          Search
                        </Button>
                      </Col>
                    </Row>

                    {/*  Invoice History  */}





                    {ProformaDataHistory.length > 0 ? (
                      <div>
                        <h4 className='text-center'>{partyName}</h4>

                        <Table striped responsive bordered>
                          <thead>
                            <tr className='text-center'>
                              <th style={{ background: '#BADDDA' }}>Sr No</th>
                              <th style={{ background: '#BADDDA' }}>Proforma No</th>
                              <th style={{ background: '#BADDDA' }}>Date</th>
                              <th style={{ background: '#BADDDA' }}>Amount</th>
                              {/* <th style={{ background: '#BADDDA' }}>Annexure</th> */}
                              <th style={{ background: '#BADDDA' }}>Download</th>
                              {/* <th style={{ background: '#BADDDA' }}>Demurage</th> */}
                              {/* <th style={{ background: '#BADDDA' }}>Payment Status</th> */}

                            </tr>
                          </thead>
                          <tbody>
                            {ProformaDataHistory.map((invoice, index) =>
                              <tr className="text-center dynamic-row-width">
                                <td>{index + 1}</td>
                                <td>{invoice.proformaNo}</td>
                                <td>{formatDateTime(invoice.proformaDate)}</td>
                                <td>{invoice.totalInvoiceAmount}</td>
                                <td>
                                  <Button
                                    variant="outline-success"
                                    onClick={(e) => downloadSingleProformaFromTab(invoice.partyId, invoice.proformaNo)}
                                  >
                                    <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
                                    {/* Download */}
                                  </Button>
                                </td>
                                {/* <td> */}

                                {/* <Button
                                    variant="outline-success"
                                    onClick={(e) => downloadSingleInvice(invoice.partyId, invoice.invoiceNO)}
                                  >
                                    <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
                                    Download
                                  </Button>


                                </td>
                                <td>

                                  <Button
                                    variant="outline-success"
                                    onClick={(e) => downloadSingleDemurages(invoice.partyId, invoice.invoiceNO)}
                                  >
                                    <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
                                    Download
                                  </Button>


                                </td> */}
                                {/* <td>{invoice.paymentStatus === 'P' ? "Pending" : invoice.paymentStatus === 'C' ? "Cleared" : ''}</td> */}

                              </tr>
                            )}
                          </tbody>
                        </Table>

                      </div>



                    ) : null}










































                  </CardBody>
                </Card>
              </div>


              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">



                <Card>

                  <CardBody>

                    <Row>
                      <Col md={5}>

                        <FormGroup>
                          <Label className="forlabel" for="branchId">Select Party</Label>


                          <Select
                            options={parties}
                            value={{ value: partyName2, label: partyName2 }}
                            onChange={handlePartyChange2}
                            className={errors.partyName2 ? 'error-border' : ''}
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

                      <Col md={2}>
                        <Button
                          variant="outline-primary"
                          style={{ marginTop: '2vw' }}

                          onClick={(e) => SearchInvoiceHistry(partyId2)}
                        >
                          <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                          Search
                        </Button>
                      </Col>
                    </Row>

                    {/*  Invoice History  */}





                    {InvoiceDataHistory.length > 0 ? (
                      <div>
                        <h4 className='text-center'>{partyName}</h4>

                        <Table striped responsive bordered>
                          <thead>
                            <tr className='text-center'>
                              <th style={{ background: '#BADDDA' }}>Sr No</th>
                              <th style={{ background: '#BADDDA' }}>Bill No</th>
                              <th style={{ background: '#BADDDA' }}>Month</th>
                              <th style={{ background: '#BADDDA' }}>Amount</th>
                              <th style={{ background: '#BADDDA' }}>Invoice</th>
                              <th style={{ background: '#BADDDA' }}>Annexure</th>
                              {/* <th style={{ background: '#BADDDA' }}>Demurage</th> */}
                              <th style={{ background: '#BADDDA' }}>Payment Status</th>

                            </tr>
                          </thead>
                          <tbody>
                            {InvoiceDataHistory.map((invoice, index) =>
                              <tr className="text-center dynamic-row-width">
                                <td>{index + 1}</td>
                                <td>{invoice.billNO}</td>
                                <td>{formatDateTimeMonth(invoice.invoiceDate)}</td>
                                <td>{invoice.totalInvoiceAmount}</td>

                                <td>

                                  <Button
                                    variant="outline-success"
                                    onClick={(e) => downloadSingleInvice(invoice.partyId, invoice.invoiceNO)}
                                  >
                                    <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
                                    Download
                                  </Button>


                                </td>

                                <td>
                                  <Button
                                    variant="outline-success"
                                    onClick={(e) => downloadSingleBill(invoice.partyId, invoice.invoiceNO)}
                                  >
                                    <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
                                    Download
                                  </Button>
                                </td>

                                {/* <td>

                                  <Button
                                    variant="outline-success"
                                    onClick={(e) => downloadSingleDemurages(invoice.partyId, invoice.invoiceNO)}
                                  >
                                    <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
                                    Download
                                  </Button>


                                </td> */}
                                <td>{invoice.paymentStatus === 'P' ? "Pending" : invoice.paymentStatus === 'C' ? "Cleared" : ''}</td>

                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    ) : null}


                  </CardBody>
                </Card>
              </div>
              {/* History Tab for Bill By SirNo and Hawb No And Master No */}
              <div className="tab-pane fade " id="history" role="tabpanel" aria-labelledby="history-tab">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={2}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">From Date</Label>
                          <div>
                            <DatePicker
                              selected={searchCriteria2.startDate ? new Date(searchCriteria2.startDate) : null}
                              wrapperClassName="custom-react-datepicker-wrapper"
                              onChange={(date) => {
                                if (date) {
                                  setSearchCriteria2({ ...searchCriteria2, startDate: date.toISOString() });
                                } else {
                                  setSearchCriteria2({ ...searchCriteria2, startDate: null });
                                }
                              }}
                              dateFormat="dd/MM/yyyy" // Specify the combined format
                              className="form-control"
                              customInput={<input style={{ width: '100%' }} />}
                            />
                          </div>
                        </FormGroup>

                      </Col>
                      <Col md={2}>


                        <FormGroup>
                          <Label className="forlabel" for="branchId">To Date</Label>
                          <div>
                            <DatePicker
                              selected={searchCriteria2.endDate ? new Date(searchCriteria2.endDate) : null}
                              wrapperClassName="custom-react-datepicker-wrapper"
                              onChange={(date) => {
                                if (date) {
                                  setSearchCriteria2({ ...searchCriteria2, endDate: date.toISOString() });
                                } else {
                                  setSearchCriteria2({ ...searchCriteria2, endDate: null });
                                }
                              }}
                              dateFormat="dd/MM/yyyy" // Specify the combined format
                              className="form-control"
                              customInput={<input style={{ width: '100%' }} />}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md={4}>

                        <FormGroup>
                          <Label className="forlabel" for="branchId">Select Party</Label>
                          <Select
                            options={parties}
                            value={{ value: partyName5, label: partyName5 }}
                            onChange={handlePartyChange5}
                            className={`${errors.partyName5 ? 'error-border' : ''
                              } responsive-select`}
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
                      <Col md={2}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Invoice No</Label>
                          <select
                            className="form-select"
                            aria-label="Invoice No"
                            value={searchCriteria2.invoiceNo}
                            onChange={(e) => setSearchCriteria2({ ...searchCriteria2, invoiceNo: e.target.value })}>
                            <option value="">Select Invoice No</option>
                            {invoiceNumbers.map((invoiceNo, index) => (
                              <option key={index} value={invoiceNo}>
                                {invoiceNo}
                              </option>
                            ))}
                          </select>
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="outline-primary"
                          style={{ marginTop: '2vw' }}
                          onClick={findHistory}
                        >
                          <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                          Search
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>


                {/* Table For Showing History */}

                {InvoiceHistoryData.length > 0 ? (
                  <div>
                    <h4 className='text-center'>{partyName}</h4>

                    <Table striped responsive bordered>
                      <thead>
                        <tr className='text-center'>
                          <th style={{ background: '#BADDDA' }}>Sr No</th>
                          <th style={{ background: '#BADDDA' }}>Invoice No </th>
                          <th style={{ background: '#BADDDA' }}>Invoice Date </th>
                          <th style={{ background: '#BADDDA' }}>HAWB/ReqId</th>
                          <th style={{ background: '#BADDDA' }}>SIR/SER</th>
                          <th style={{ background: '#BADDDA' }}>Packages</th>
                          <th style={{ background: '#BADDDA' }}>In Date </th>
                          <th style={{ background: '#BADDDA' }}>Out Date </th>
                          <th style={{ background: '#BADDDA' }}>Charges</th>
                          <th style={{ background: '#BADDDA' }}>Service Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems1.map((invoice, index) =>
                          <tr className="text-center dynamic-row-width">
                            <td>{((currentPage1 - 1) * itemsPerPage1) + index + 1}</td>
                            <td>{invoice.inviceNo}</td>
                            <td>{formatDateTime(invoice.inviceDate)}</td>
                            <td>{invoice.masterNo.startsWith('000') ? '' : invoice.masterNo}</td>
                            <td>{invoice.subMasterNo.startsWith('000') ? '' : invoice.subMasterNo}</td>
                            <td>{invoice.packages}</td>
                            <td>{formatDateTime(invoice.inDate)}</td>
                            <td>{formatDateTime(invoice.outDate)}</td>
                            <td>{invoice.demurageRate}</td>
                            <td>{invoice.packageType}</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>


                    <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                      <Pagination.First onClick={() => handlePageChange1(1)} />
                      <Pagination.Prev
                        onClick={() => handlePageChange1(currentPage1 - 1)}
                        disabled={currentPage1 === 1}
                      />
                      <Pagination.Ellipsis />

                      {displayPages().map((pageNumber) => (
                        <Pagination.Item
                          key={pageNumber}
                          active={pageNumber === currentPage1}
                          onClick={() => handlePageChange1(pageNumber)}
                        >
                          {pageNumber}
                        </Pagination.Item>
                      ))}

                      <Pagination.Ellipsis />
                      <Pagination.Next
                        onClick={() => handlePageChange1(currentPage1 + 1)}
                        disabled={currentPage1 === totalPages1}
                      />
                      <Pagination.Last onClick={() => handlePageChange1(totalPages1)} />
                    </Pagination>
                  </div>



                ) : null}
              </div>


              <div className="tab-pane fade" id="payment" role="tabpanel" aria-labelledby="payment-tab">

                <Card>
                  <CardBody>


                    <Row>

                      <Col md={3}>

                        <FormGroup>
                          <Label className="forlabel" for="branchId">Receipt Id</Label>
                          <Input
                            type="text"
                            name="approvedBy"
                            id="service"
                            readOnly
                            value={transId}
                            className="inputField"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Receipt Date</Label>
                          <div>
                            <DatePicker
                              selected={transDate}
                              wrapperClassName="custom-react-datepicker-wrapper"
                              onChange={(date) => {
                                if (date) {
                                  setTransDate(date);
                                }
                              }}
                              value={transDate}
                              dateFormat="dd/MM/yyyy"
                              className="form-control"
                              customInput={<input style={{ width: '100%' }} />}
                            />

                          </div>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Receipt Amount</Label>
                          <Input
                            type="number"
                            name="receiptAmt"
                            value={receiptAmt}
                            onChange={(e) => {
                              let inputText = e.target.value;
                              if (inputText.length > 10) { inputText = inputText.slice(0, 10); }
                              setReceiptAmt(inputText);
                            }}
                          />
                        </FormGroup>
                      </Col>

                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Currency</Label>
                          <Input
                            type="text"
                            name="currency"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            maxLength={8}
                            defaultValue={currency}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Select Party</Label>
                          <Select
                            options={parties}
                            value={{ value: partyName3, label: partyName3 }}
                            onChange={handlePartyChange3}
                            className={errors.partyname ? 'error-border' : ''}
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

                      <Col md={3}>

                        <FormGroup>
                          <Label className="forlabel" for="branchId">Advance Amount</Label>
                          <Input
                            type="text"
                            name="approvedBy"
                            value={advAmt}
                            readOnly
                            id='service'
                            onChange={(e) => setAdvAmt(e.target.value)}
                          />
                        </FormGroup>


                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Balance Amount</Label>
                          <Input
                            type="text"
                            name="balAdvAmt"
                            value={balAdvAmt}
                            onChange={(e) => setBalAdvAmt(e.target.value)}
                            maxLength={8}
                            readOnly
                            id='service'
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Payment Type</Label>
                          <select
                            className="form-select"
                            aria-label="SC Status"
                            disabled={InvoicePayment.length === 0} // Disables if InvoicePayment is empty
                            value={paymentMode}
                            onChange={(e) => setPaymentMode(e.target.value)}
                          >
                            <option value="">Select Payment Type</option>
                            <option value="CQ">CHEQUE</option>
                            <option value="NF">NEFT</option>
                            <option value="UP">UPI</option>
                            <option value="CA">CASH</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>


                    {/* Add Paymenr By Payment Type  */}


                    {paymentMode === 'CQ' ? (
                      <Row>

                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" htmlFor="branchId">
                              Cheque Number
                            </Label>
                            <Input
                              type="text"
                              value={chequeNo}
                              onChange={(e) => setChequeNo(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Cheque Date</Label>
                            <div>
                              <DatePicker
                                selected={chequeDate}
                                wrapperClassName="custom-react-datepicker-wrapper"
                                onChange={(date) => {
                                  if (date) { setChequeDate(date); }
                                }}
                                value={chequeDate}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                                customInput={<input style={{ width: '100%' }} />}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" htmlFor="branchId">
                              Bank Name
                            </Label>
                            <Input
                              type="text"
                              value={bankName}
                              onChange={(e) => setBankName(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" htmlFor="branchId">
                              Transaction Amount
                            </Label>
                            <Input
                              type="number"
                              value={transactionAmt}
                              onChange={(e) => setTransactionAmt(e.target.value)}
                              className={errors.transactionAmt ? 'error-border' : ''}
                            />
                            {errors.transactionAmt && (
                              <div className="error-message">
                                {errors.transactionAmt}
                              </div>
                            )}

                          </FormGroup>
                        </Col>

                      </Row>

                    ) : null}

                    {paymentMode === 'NF' || paymentMode === 'UP' ? (
                      <Row>
                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" htmlFor="branchId">
                              Transaction Number
                            </Label>
                            <Input
                              type="text"
                              value={transactionNo}
                              onChange={(e) => setTransactionNo(e.target.value)}
                              className={errors.transactionNo ? 'error-border' : ''}
                            />
                            {errors.transactionNo && (
                              <div className="error-message">
                                {errors.transactionNo}
                              </div>
                            )}

                          </FormGroup>
                        </Col>

                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Transaction Date</Label>
                            <div>
                              <DatePicker
                                selected={transactionDate}
                                wrapperClassName="custom-react-datepicker-wrapper"
                                onChange={(date) => {
                                  if (date) {
                                    setTransactionDate(date);
                                  }
                                }}
                                value={transactionDate}
                                dateFormat="dd/MM/yyyy"
                                className={`form-control ${errors.paymentMode ? 'error-border' : ''}`}
                                customInput={<input style={{ width: '100%' }} />}
                              />
                              {errors.transactionDate && (
                                <div className="error-message">
                                  {errors.transactionDate}
                                </div>
                              )}

                            </div>
                          </FormGroup>
                        </Col>

                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" htmlFor="branchId">
                              Transaction Amount
                            </Label>
                            <Input
                              type="number"
                              value={transactionAmt}
                              onChange={(e) => setTransactionAmt(e.target.value)}
                              className={errors.transactionDate ? 'error-border' : ''}
                            />
                            {errors.transactionDate && (
                              <div className="error-message">
                                {errors.transactionDate}
                              </div>
                            )}

                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" htmlFor="branchId">
                              Bank Name
                            </Label>
                            <Input
                              type="text"
                              value={transbankName}
                              onChange={(e) => setTransbankName(e.target.value)}
                              className={errors.transbankName ? 'error-border' : ''}
                            />
                            {errors.transbankName && (
                              <div className="error-message">
                                {errors.transbankName}
                              </div>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>

                    ) : null}

                    {paymentMode === 'CA' ? (
                      <Row>

                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" htmlFor="branchId">
                              Amount
                            </Label>
                            <Input
                              type="number"
                              value={transactionAmt}
                              onChange={(e) => setTransactionAmt(e.target.value)}
                              className={errors.transactionAmt ? 'error-border' : ''}
                            />
                            {errors.transactionAmt && (
                              <div className="error-message">
                                {errors.transactionAmt}
                              </div>
                            )}
                          </FormGroup>
                        </Col>


                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Received Date</Label>
                            <div>
                              <DatePicker
                                selected={transactionDate}
                                wrapperClassName="custom-react-datepicker-wrapper"
                                onChange={(date) => {
                                  if (date) {
                                    setTransactionDate(date);
                                  }
                                }}
                                value={transactionDate}
                                dateFormat="dd/MM/yyyy"
                                className={`form-control ${errors.transactionDate ? 'error-border' : ''}`}
                                customInput={<input style={{ width: '100%' }} />}
                              />
                              {errors.transactionDate && (
                                <div className="error-message">
                                  {errors.transactionDate}
                                </div>
                              )}
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                    ) : null}

                    <Row>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">TDS Percentage</Label>
                          <Input
                            type="number"
                            name="tdsPercentage"
                            onChange={(e) => {
                              let inputText = e.target.value;
                              // Check if the input has exceeded 10 digits
                              if (inputText.length > 2) {
                                // Trim the input to the first 10 digits
                                inputText = inputText.slice(0, 2);
                              }
                              // Update the state with the sanitized input
                              setTdsPercentage(inputText);
                            }}
                            value={tdsPercentage}
                            className="inputField"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">TDS Amount</Label>
                          <Input
                            type="number"
                            name="approvedBy"
                            onChange={(e) => {
                              let inputText = e.target.value;
                              // Check if the input has exceeded 10 digits
                              if (inputText.length > 6) {
                                // Trim the input to the first 10 digits
                                inputText = inputText.slice(0, 6);
                              }
                              // Update the state with the sanitized input
                              setTdsAmt(inputText);
                            }}

                            value={tdsAmt}
                            className="inputField"
                          />
                        </FormGroup>
                      </Col>

                      <Col md={3}>

                        <FormGroup>
                          <Label className="forlabel" for="branchId">Remarks</Label>
                          <Input
                            type="text"
                            name="approvedBy"
                            value={narration}
                            className="inputField"
                            onChange={(e) => setNarration(e.target.value)}
                            maxLength={50}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <div className="text-center">
                      <Button
                        variant="outline-success"
                        style={{ marginTop: '2vw' }}
                        onClick={SearchPartyAmount}>
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                        SAVE
                      </Button>
                    </div>



                    {/* Invice Data For Payment */}


                    {InvoicePayment.length > 0 ? (
                      <div>
                        <h4 className='text-center'>{partyName}</h4>

                        <Table striped responsive bordered>
                          <thead>
                            <tr className='text-center'>
                              <th style={{ background: '#BADDDA' }}>Sr No</th>
                              <th style={{ background: '#BADDDA' }}>Invoice Number</th>
                              <th style={{ background: '#BADDDA' }}>Invoice Date</th>
                              <th style={{ background: '#BADDDA' }}>Invoice Amount</th>
                              <th style={{ background: '#BADDDA' }}>Cleared Amount</th>
                              <th style={{ background: '#BADDDA' }}>Received Amount</th>
                            </tr>

                          </thead>
                          <tbody>
                            {InvoicePayment.map((invoice, index) =>
                              <tr className="text-center dynamic-row-width">
                                <td>{index + 1}</td>
                                <td>{invoice.invoiceNO}</td>
                                <td>{formatDateTime(invoice.invoiceDate)}</td>
                                <td>{invoice.totalInvoiceAmount}</td>
                                <td>{invoice.clearedAmt}
                                </td>
                                <td className="text-center" style={{ textAlign: 'center' }}>
                                  <Input
                                    text="number"
                                    name="received amount"
                                    style={{ display: 'inline-block', width: '40%' }}
                                  />
                                </td>

                              </tr>
                            )}
                          </tbody>
                        </Table>

                      </div>
                    ) : null}
                  </CardBody>
                </Card>
              </div>







              <div className="tab-pane fade" id="advance" role="tabpanel" aria-labelledby="advance-tab">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Select Party</Label>
                          <Select
                            options={parties}
                            value={{ value: partyName3, label: partyName3 }}
                            onChange={handlePartyChange3}
                            className={errors.partyId3 ? 'error-border' : ''}
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
                          {errors.partyId3 && (
                            <div className="error-message">
                              {errors.partyId3}
                            </div>
                          )}
                        </FormGroup>
                      </Col>

                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Payment Type</Label>

                          <select
                            className={`form-select ${errors.paymentMode ? 'error-border' : ''}`}
                            aria-label="SC Status"
                            value={paymentMode}
                            onChange={(e) => setPaymentMode(e.target.value)}
                          >
                            <option value="">Select Payment Type</option>
                            <option value="CQ">CHEQUE</option>
                            <option value="NF">NEFT</option>
                            <option value="UP">UPI</option>
                            <option value="CA">CASH</option>
                          </select>

                          {errors.paymentMode && (
                            <div className="error-message">
                              {errors.paymentMode}
                            </div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" htmlFor="branchId">
                            Advance Receipt No
                          </Label>
                          <Input
                            type="text"
                            value={transId}
                            onChange={(e) => setTransId(e.target.value)}
                            readOnly
                            id='service'
                          />
                        </FormGroup>
                      </Col>

                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Advance Receipt Date</Label>
                          <div>
                            <DatePicker
                              selected={transDate}
                              wrapperClassName="custom-react-datepicker-wrapper"
                              onChange={(date) => {
                                if (date) {
                                  setTransDate(date);
                                }
                              }}
                              value={transDate}
                              dateFormat="dd/MM/yyyy"
                              className="form-control"
                              customInput={<input style={{ width: '100%' }} />}
                            />

                          </div>
                        </FormGroup>
                      </Col>


                    </Row>




                    {paymentMode === 'CQ' ? (
                      <Row>

                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" htmlFor="branchId">
                              Cheque Number
                            </Label>
                            <Input
                              type="text"
                              value={chequeNo}
                              onChange={(e) => setChequeNo(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Cheque Date</Label>
                            <div>
                              <DatePicker
                                selected={chequeDate}
                                wrapperClassName="custom-react-datepicker-wrapper"
                                onChange={(date) => {
                                  if (date) { setChequeDate(date); }
                                }}
                                value={chequeDate}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                                customInput={<input style={{ width: '100%' }} />}
                              />

                            </div>
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" htmlFor="branchId">
                              Bank Name
                            </Label>
                            <Input
                              type="text"
                              value={bankName}
                              onChange={(e) => setBankName(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" htmlFor="branchId">
                              Transaction Amount
                            </Label>
                            <Input
                              type="number"
                              value={transactionAmt}
                              onChange={(e) => setTransactionAmt(e.target.value)}
                              className={errors.transactionAmt ? 'error-border' : ''}
                            />
                            {errors.transactionAmt && (
                              <div className="error-message">
                                {errors.transactionAmt}
                              </div>
                            )}

                          </FormGroup>
                        </Col>

                      </Row>

                    ) : null}


                    {paymentMode === 'NF' || paymentMode === 'UP' ? (
                      <Row>

                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" htmlFor="branchId">
                              Transaction Number
                            </Label>
                            <Input
                              type="text"
                              value={transactionNo}
                              onChange={(e) => setTransactionNo(e.target.value)}
                              className={errors.transactionNo ? 'error-border' : ''}
                            />
                            {errors.transactionNo && (
                              <div className="error-message">
                                {errors.transactionNo}
                              </div>
                            )}

                          </FormGroup>
                        </Col>


                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Transaction Date</Label>
                            <div>
                              <DatePicker
                                selected={transactionDate}
                                wrapperClassName="custom-react-datepicker-wrapper"
                                onChange={(date) => {
                                  if (date) {
                                    setTransactionDate(date);
                                  }
                                }}
                                value={transactionDate}
                                dateFormat="dd/MM/yyyy"
                                className={`form-control ${errors.paymentMode ? 'error-border' : ''}`}
                                customInput={<input style={{ width: '100%' }} />}
                              />
                              {errors.transactionDate && (
                                <div className="error-message">
                                  {errors.transactionDate}
                                </div>
                              )}

                            </div>
                          </FormGroup>
                        </Col>


                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" htmlFor="branchId">
                              Transaction Amount
                            </Label>
                            <Input
                              type="number"
                              value={transactionAmt}
                              onChange={(e) => setTransactionAmt(e.target.value)}
                              className={errors.transactionDate ? 'error-border' : ''}
                            />
                            {errors.transactionDate && (
                              <div className="error-message">
                                {errors.transactionDate}
                              </div>
                            )}

                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" htmlFor="branchId">
                              Bank Name
                            </Label>
                            <Input
                              type="text"
                              value={transbankName}
                              onChange={(e) => setTransbankName(e.target.value)}
                              className={errors.transbankName ? 'error-border' : ''}
                            />
                            {errors.transbankName && (
                              <div className="error-message">
                                {errors.transbankName}
                              </div>
                            )}
                          </FormGroup>
                        </Col>


                      </Row>

                    ) : null}



                    {paymentMode === 'CA' ? (
                      <Row>

                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" htmlFor="branchId">
                              Amount
                            </Label>
                            <Input
                              type="number"
                              value={transactionAmt}
                              onChange={(e) => setTransactionAmt(e.target.value)}
                              className={errors.transactionAmt ? 'error-border' : ''}
                            />

                            {errors.transactionAmt && (
                              <div className="error-message">
                                {errors.transactionAmt}
                              </div>
                            )}

                          </FormGroup>
                        </Col>


                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Received Date</Label>
                            <div>
                              <DatePicker
                                selected={transactionDate}
                                wrapperClassName="custom-react-datepicker-wrapper"
                                onChange={(date) => {
                                  if (date) {
                                    setTransactionDate(date);
                                  }
                                }}
                                value={transactionDate}
                                dateFormat="dd/MM/yyyy"
                                className={`form-control ${errors.transactionDate ? 'error-border' : ''}`}
                                customInput={<input style={{ width: '100%' }} />}
                              />
                              {errors.transactionDate && (
                                <div className="error-message">
                                  {errors.transactionDate}
                                </div>
                              )}
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>

                    ) : null}


                    <div className="text-center">

                      <Button
                        variant="outline-success"
                        style={{ marginTop: '1.5vw' }}
                        onClick={() => addAdvance(partyId3)}>
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                        ADD
                      </Button>
                    </div>

                  </CardBody>
                </Card>
              </div>


              {/* Billing Transaction */}

              <div className="tab-pane fade" id="transaction" role="tabpanel" aria-labelledby="transaction-tab">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Select Party</Label>
                          <Select
                            options={parties}
                            value={{ value: partyName, label: partyName }}
                            onChange={handlePartyChange}
                            className={`${errors.partyname ? 'error-border' : ''
                              } responsive-select`}
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
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">From Date</Label>
                          <div>
                            <DatePicker
                              selected={searchCriteria.startDate ? new Date(searchCriteria.startDate) : null}
                              wrapperClassName="custom-react-datepicker-wrapper"
                              onChange={(date) => {
                                if (date) {
                                  setSearchCriteria({ ...searchCriteria, startDate: date.toISOString() });
                                } else {
                                  setSearchCriteria({ ...searchCriteria, startDate: null });
                                }
                              }}
                              dateFormat="dd/MM/yyyy" // Specify the combined format
                              className="form-control"
                              maxDate={endDate1}
                              customInput={<input style={{ width: '100%' }} />}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">To Date</Label>
                          <div>
                            <DatePicker
                              selected={searchCriteria.endDate ? new Date(searchCriteria.endDate) : null}
                              wrapperClassName="custom-react-datepicker-wrapper"
                              onChange={(date) => {
                                if (date) {
                                  setSearchCriteria({ ...searchCriteria, endDate: date.toISOString() });
                                } else {
                                  setSearchCriteria({ ...searchCriteria, endDate: null });
                                }
                              }}
                              dateFormat="dd/MM/yyyy" // Specify the combined format
                              className="form-control"
                              maxDate={endDate1}
                              customInput={<input style={{ width: '100%' }} />}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="outline-primary"
                          style={{ marginTop: '2vw' }}
                          onClick={findBillingTransaction2222}

                        >
                          <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                          Search
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>


                {combinewResults5.length > 0 ? (
                  <div className='mt-4'>
                    {/* <h4 className='text-center'>{partyName}</h4> */}

                    <Table striped responsive bordered>
                      <thead>
                        <tr className='text-center'>
                          <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>Party/Unit</th>
                          <th rowSpan="2" style={{ width: '8%', background: '#BADDDA' }}>Date</th>
                          <th colSpan="2" style={{ width: '5%', background: '#BADDDA' }}>IMP PCKGS</th>
                          <th colSpan="2" style={{ width: '5%', background: '#BADDDA' }}>EXP PKGS</th>
                          <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>Total PKGS</th>
                          <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>IIND SAT</th>
                          <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>DEMURAGES</th>
                          <th colSpan="4" style={{ width: '30%', background: '#BADDDA' }}>EXPORT</th>
                          <th colSpan="4" style={{ width: '30%', background: '#BADDDA' }}>IMPORT</th>
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
                          <tr className="text-center dynamic-row-width">
                            <td>{partyNames[import2.partyId]}</td>
                            <td>{formatDateTime(import2.invoiceDate)}</td>
                            <td>{import2.importNoOfPackages}</td>
                            <td>{import2.importSubNop}</td>
                            <td>{import2.exportNoOfPackages}</td>
                            <td>{import2.exportSubNop}</td>
                            <td>{import2.totalPackages}</td>
                            <td onClick={() => openHeavModal(import2, 'holiday')}>{import2.holidayRate}</td>
                            <td onClick={() => openHeavModal(import2, 'demurage')}>{import2.demuragesRate}</td>
                            <td onClick={() => openHeavModal(import2, 'exportsc')}>{import2.exportScRate}</td>
                            <td onClick={() => openHeavModal(import2, 'export')}>{import2.exportHpRate}</td>
                            <td onClick={() => openHeavModal(import2, 'exportpc')}>{import2.exportPcRate}</td>
                            <td onClick={() => openHeavModal(import2, 'exportoc')}>{import2.exportPenalty}</td>
                            <td onClick={() => openHeavModal(import2, 'importsc')}>{import2.importScRate}</td>
                            <td onClick={() => openHeavModal(import2, 'import')}>{import2.importHpRate}</td>
                            <td onClick={() => openHeavModal(import2, 'importpc')}>{import2.importPcRate}</td>
                            {/* <td className="table-column">{import2.importHpStatus}</td> */}
                            <td onClick={() => openHeavModal(import2, 'importoc')}>{import2.importPenalty}</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                    <div>
                      <Row>
                        <Col md={8}></Col>
                        {/* <Col md={3}></Col> */}
                        <Col md={2}>

                          <FormGroup>
                            <Label className="forlabel" for="branchId">NIPT Packages</Label>
                            <Input type="text" name="passengerName"
                              className="form-control"
                              value={niptPackages2}
                              readOnly
                              id='service'
                            />
                          </FormGroup>
                        </Col>
                        <Col md={2}>

                          <FormGroup>
                            <Label className="forlabel" for="branchId">Bill</Label>
                            <Input type="text" name="passengerName"
                              className="form-control"
                              value={totalRate2}
                              readOnly
                              id='service'
                            />
                          </FormGroup>
                        </Col>
                      </Row>


                      <Row>
                        <Col md={2}>                        
                        <FormGroup>
                            <Label className="forlabel" for="branchId">Total Bill</Label>
                            <Input type="text" name="passengerName"
                              className="form-control"
                              value={totalAllRate2}
                              readOnly
                              id='service'
                            />
                          </FormGroup>
                        </Col>


                      </Row>

                    </div>

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
                ) : null}
              </div>

            </div>
          </div>

        )

      }



      {/* Weight Showing Model */}

      <Modal show={heavyModel} onHide={closeHeavyModel} size="lg">
        <div className='modal-content'>

          <div className="modal-header-bg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1' }}>
              <h4 className="text-center mb-1">{getModalHeader(modalType)}</h4>
            </div>
            <FontAwesomeIcon icon={faMultiply} style={{ marginLeft: '5px', cursor: 'pointer', height: '1.5vw' }} onClick={closeHeavyModel} />
          </div>
          <hr style={{ marginTop: '0.5vw', marginBottom: '0.5vw' }} />
          <Row style={{ marginLeft: '2vw', marginRight: '2vw' }}>
            <Col>
              <FormGroup>
                <Label className="forlabel" htmlFor="branchId">
                  {getInputLabel(modalType)}
                </Label>
                <Input
                  type="text"
                  name="mobile"
                  id="service"
                  value={getInputValue(modalType, modalContent)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label className="forlabel" htmlFor="branchId">
                  {getInputRateLabel(modalType)}
                </Label>
                <Input
                  type="text"
                  name="mobile"
                  id="service"
                  value={getInputRateValue(modalType, modalContent)}
                />
              </FormGroup>
            </Col>
          </Row>

        </div>
      </Modal>


    </>
  );
};
export default Payment_and_bill;
