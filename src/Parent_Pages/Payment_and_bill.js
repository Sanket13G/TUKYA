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










  useEffect(() => {
    findPartiesAll();
    findPartiesNew();
  }, []);



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
      const totalInvoiceAmount = record.totalInvoiceAmount || 0;
      return acc + totalInvoiceAmount;
    }, 0);
  }

  useEffect(() => {
    // Calculate the total rate for the current page
    const totalRateForPage = calculateTotalRateForPageForPredefined(currentItems5);
    // Update the total rate state
    setTotalRate2(totalRateForPage);
    const totalRateForPageTotal = calculateTotalRateForPageForPredefined(combinewResults5);
    // Update the total rate state
    setTotalAllRate2(totalRateForPageTotal);
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
    userId,    
    branchId,
    companyid,   
    logintype,
    logintypeid
  } = useContext(AuthContext);


  useEffect(() => {
    if (logintype === 'Party') {
      SearchInvoiceHistry1();
    } else {
      findParties();
      findPartiesByInvoiceType();
    }
  }, []);



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
    const day = date.getDate(); // Get the day of the month
    const monthInLetters = date.toLocaleString('default', { month: 'short' }); // Get the month in short letters (e.g., 'Aug')
    const year = date.getFullYear(); // Get the year
    const hour = date.getHours(); // Get the hour (in 24-hour format)
    const minute = date.getMinutes(); // Get the minute

    // Convert hour to 12-hour format and determine if it's AM or PM
    const hourIn12HourFormat = hour % 12 || 12; // If hour is 0, use 12 instead
    const amOrPm = hour < 12 ? 'AM' : 'PM';

    // Format the time string (e.g., "1:20 PM")
    const time = `${hourIn12HourFormat}:${minute.toString().padStart(2, '0')} ${amOrPm}`;

    // Construct the final formatted date and time string
    const formattedDateTime = `${day} ${monthInLetters} ${year} Time: ${time}`;

    return formattedDateTime;
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

  const formatDateTimeNEW = (value) => {
    if (!value) {
      return ""; // Return an empty string if value is empty or undefined
    }

    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
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

    setLoading(true);
    try {
      const response = await InviceService.getMainByPartyId(companyid, branchId, partiId2);
      if (!response.data || !response.data.length > 0) {
        toast.error("No data found!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
        });
      } else {
        setInvoiceDataHistory(response.data);
      }
    } catch {
      toast.error("Something Went Wrong!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    } finally {
      setLoading(false);
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
  const downloadSingleInvice = async (partyId, invoiceNo, type) => {
    try {

      const response = await InviceService.getSingleInvicePDFromBillsTab(companyid, branchId, partyId, invoiceNo);


      if (response.status === 200) {

        const pdfData = response.data;
        const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(pdfBlob);

        if (type === "PDF") {
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
        }
        if (type === 'PRINT') {
          window.open(blobUrl, '_blank');
        }
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
  // const [paymentMode, setPaymentMode] = useState('');


  const [paymentMode, setPaymentMode] = useState({
    NEFT: '',
    UPI: '',
    Cheque: '',
    Cash: '',
    Advance: '',
  });


  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const newValue = checked ? getPaymentModeValue(name) : '';
    if (!checked) {
      clearPaymentFields(name);
    }
    setPaymentMode(prevModes => ({
      ...prevModes,
      [name]: newValue,
    }));
  };


  const getPaymentModeValue = (name) => {
    switch (name) {
      case 'NEFT':
        return 'NF';
      case 'UPI':
        return 'UP';
      case 'Cheque':
        return 'CQ';
      case 'Cash':
        return 'CA';
      case 'Advance':
        return 'AD';
      default:
        return '';
    }
  };


  const clearPaymentFields = (name) => {
    switch (name) {
      case 'NEFT':
        setNeftTransactionNo('');
        setNeftTransactionDate(null);
        setNeftTransactionAmt(0);
        setNeftTransbankName('');
        clearError('NEFT');
        break;
      case 'UPI':
        setUpiTransactionNo('');
        setUpiTransactionDate(null);
        setUpiTransactionAmt(0);
        setUpiTransbankName('');
        clearError('UPI');
        break;
      case 'Cheque':
        setChequeNo('');
        setCheckAmount('');
        setChequeDate(null);
        setcheckbankName('');
        clearError('Cheque');
        break;
      case 'Cash':
        setTransactionAmt(0);
        setTransactionDate(null);
        clearError('Cash');
        break;
      case 'Advance':
        setAdvanceAmt(0);
        clearError('Advance');
        break;
      default:
        break;
    }
  };

  const clearError = (name) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'NEFT':
        delete newErrors.neftTransactionNo;
        delete newErrors.neftTransactionDate;
        delete newErrors.neftTransactionAmt;
        delete newErrors.neftTransbankName;
        break;
      case 'UPI':
        delete newErrors.upiTransactionNo;
        delete newErrors.upiTransactionDate;
        delete newErrors.upiTransactionAmt;
        delete newErrors.upiTransbankName;
        break;
      case 'Cheque':
        delete newErrors.chequeNo;
        delete newErrors.checkAmount;
        delete newErrors.chequeDate;
        delete newErrors.checkbankName;
        break;
      case 'Cash':
        delete newErrors.transactionAmt;
        delete newErrors.transactionDate;
        break;
      case 'Advance':
        delete newErrors.advanceAmt;
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const [CheckbankName, setcheckbankName] = useState('');
  const [checkAmount, setCheckAmount] = useState('');
  const [upiTransactionNo, setUpiTransactionNo] = useState('');
  const [upiTransactionDate, setUpiTransactionDate] = useState('');
  const [upiTransactionAmt, setUpiTransactionAmt] = useState('');
  const [upiTransbankName, setUpiTransbankName] = useState('');
  const [neftTransactionNo, setNeftTransactionNo] = useState('');
  const [neftTransactionDate, setNeftTransactionDate] = useState('');
  const [neftTransactionAmt, setNeftTransactionAmt] = useState('');
  const [neftTransbankName, setNeftTransbankName] = useState('');


  const [chequeNo, setChequeNo] = useState('');
  const [chequeDate, setChequeDate] = useState(null);
  const [Checkamount, setCheckamount] = useState('');


  const [bankName, setBankName] = useState('');
  const [srNo, setsrNo] = useState('');
  const [transactionNo, setTransactionNo] = useState('');
  const [transactionDate, setTransactionDate] = useState(null);
  const [transactionAmt, setTransactionAmt] = useState(0); // Initialize with 0 for double
  const [transbankName, setTransbankName] = useState('');
  const [currency, setCurrency] = useState('INR');
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
  const [advancemodel, setadvancemodel] = useState(false);
  const [advanceAmt, setAdvanceAmt] = useState(0);

  const [InvoicePayment, setInvoicePayment] = useState([]);



  const getInvoiceDataByPartyId = async (partyId) => {
    setLoading(true);
    try {
      await InviceService.getPendingInvoicesPartyId(companyid, branchId, partyId).then((res) => {
        setInvoicePayment(res.data);
      });
    }
    catch {
      console.log("Error");
    } finally {
      setLoading(false);
    }
  };





  const getTransByReceiptId = async (partyId, receiptId) => {
    InviceService.getTransByReceiptId(companyid, branchId, receiptId, partyId).then((res) => {
      setTransId(res.data.transId);
      setDocType(res.data.docType);
      setTransDate(res.data.transDate);
      setPartyId(res.data.partyId);
      // setPaymentMode(res.data.paymentMode);
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

  const selectedModes = Object.values(paymentMode).filter(mode => mode !== '');
  const [selectedPartyPayment, setSelectedPartyPayment] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [invoiceNoList, setInvoiceNoList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedInvoiceAmount, setSelectedInvoiceAmount] = useState(0);

  const FinTranceData = {
    transId, docType, transDate, partyId: selectedPartyPayment ? selectedPartyPayment.value : '', invoiceAmt: selectedInvoiceAmount,
    currency, receiptAmt, narration, tdsPercentage, tdsAmt, tdsStatus, createdBy, createdDate, editedBy,
    editedDate, approvedBy, approvedDate, tdsPercentage, tdsAmt, tdsStatus
  };


  const FinTranceDTLData =
  {
    transId, transDate, partyId: selectedPartyPayment ? selectedPartyPayment.value : '', invoiceAmt: selectedInvoiceAmount, receiptAmt, createdBy,
    createdDate, editedBy, editedDate, approvedBy, approvedDate, paymentMode: selectedModes, invoiceNo: invoiceNoList, chequeNo, chequeDate,
    checkAmount, CheckbankName, tdsPercentage, tdsAmt, tdsStatus, neftTransbankName, neftTransactionAmt, neftTransactionDate, neftTransactionNo,
    upiTransactionAmt, upiTransactionDate, upiTransactionNo, upiTransbankName, transactionDate, transactionAmt, advanceAmt
  };


  // Function to handle individual checkbox change
  const handleRowCheckboxChange = (index, invoiceNO) => {
    const isChecked = selectedItems.some((item) => item.invoiceNO === invoiceNO);

    if (isChecked) {
      // Remove the invoice from selectedItems and invoiceNoList
      const updatedSelectedItems = selectedItems.filter((item) => item.invoiceNO !== invoiceNO);
      const updatedInvoiceNoList = invoiceNoList.filter((no) => no !== invoiceNO);

      setSelectedItems(updatedSelectedItems);
      setInvoiceNoList(updatedInvoiceNoList);
    } else {
      // Add the invoice to selectedItems and invoiceNoList
      setSelectedItems([...selectedItems, { invoiceNO }]);
      setInvoiceNoList([...invoiceNoList, invoiceNO]);
    }
  };


  useEffect(() => {
    setSelectAll(selectedItems.length === InvoicePayment.length);
  }, [selectedItems, InvoicePayment]);

  const handleSelectAllChange = () => {
    if (selectAll) {
      setInvoiceNoList([]);
      setSelectedItems([]);
    } else {
      const allInvoiceNos = InvoicePayment.map((invoice) => invoice.invoiceNO);
      setInvoiceNoList(allInvoiceNos);
      setSelectedItems(InvoicePayment.map((invoice) => ({ invoiceNO: invoice.invoiceNO })));
    }
    setSelectAll(!selectAll);
  };


  const getTransByPartyId = async (partyId) => {
    const response = await InviceService.getTransIdByPartyId(companyid, branchId, partyId);
    setAdvAmt(response.data.advAmt);
    setBalAdvAmt(response.data.balAdvAmt);


  }


  // Save Advance Amount
  const addAdvance = async (partyId) => {
    if (
      !paymentMode.NEFT &&
      !paymentMode.UPI &&
      !paymentMode.Cheque &&
      !paymentMode.Cash &&
      !paymentMode.Advance
    ) {
      toast.error('Please Select Payment Mode!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 700,
      });
      return;
    }

    const isValid = validateForm();

    if (!isValid) {
      toast.error('Oops something went wrong!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 900,
      });
      return;
    }
    setLoading(true);
    try {
      const response = await InviceService.addAdvamce(companyid, branchId, partyId, userId, FinTranceDTLData, FinTranceData);
      toast.success('Advance Amount Added Successfully !', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
      getAllAdvanceReceipts(response.data.partyId);
      await getTransByReceiptId(response.data.partyId, response.data.transId);
    }
    catch {
      console.log("error");
    }
    finally {
      setLoading(false);
    }
  };



  //Party

  const [InvoiceDataHistory1, setInvoiceDataHistory1] = useState([]);
  const SearchInvoiceHistry1 = async () => {
    if (logintype === 'Party') {

      const response = await InviceService.getMainByPartyId(companyid, branchId, logintypeid);
      setInvoiceDataHistory1(response.data);
    }
  };



  const getbyAdvancePartyId = async (partyId) => {
    const response = await InviceService.getPartyAdvAndClearedAmount(companyid, branchId, partyId);
    // setAdvAmt(totalAdvAmt);
    setBalAdvAmt(response.data);
  };





  // SHB
  const customFilterOption = (candidate, input) => {
    const inputLower = input.toLowerCase();
    const labelLower = candidate.label.toLowerCase();
    return candidate.data.__isNew__ || labelLower.startsWith(inputLower);
  };

  const findPartiesNew = async () => {
    const partyResponse = await Rate_Chart_Service.getAllNonBilledParties(companyid, branchId);
    const partyOptions = partyResponse.data.map(party => ({
      value: party[0],
      label: party[1]
    }));
    setPartiesNew(partyOptions);

  };


  const findPartiesAll = async () => {
    const partyResponse = await Rate_Chart_Service.getAllActiveParties(companyid, branchId);
    const partyOptions = partyResponse.data.map(party => ({
      value: party[0],
      label: party[1]
    }));
    setPartiesAll(partyOptions);

  };

  const [partiesNew, setPartiesNew] = useState([]);
  const [selectedPartyNew, setSelectedPartyNew] = useState(null);

  const [partiesAll, setPartiesAll] = useState([]);
  const [selectedPartyAll, setSelectedPartyAll] = useState(null);
  const [selectedPartyAdvance, setSelectedPartyAdvance] = useState(null);
  const [selectedPartyTransaction, setSelectedPartyTransaction] = useState(null);

  const clearAdvance = () => {
    makeAdvanceTabEmpty();
    setAdvanceData([]);
    setSelectedPartyAdvance(null);
    setErrors([]);
    clearReceipt();
  };


  const clearReceipt = () => {
    makeAdvanceTabEmpty();
    setInvoicePayment([]);
    setSelectedPartyPayment(null);
    setErrors([]);
    clearAdvance();
  };


  const handlePartyAdvance = async (selectedOption) => {
    setErrors(prevErrors => selectedOption ? { ...prevErrors, selectedPartyAdvance: '' } : { ...prevErrors, selectedPartyAdvance: 'Please Select Party' });
    setSelectedPartyAdvance(selectedOption ? selectedOption : null);
    if (selectedOption) {
      getAllAdvanceReceipts(selectedOption.value);
    } else {
      setAdvanceData([]);
    }
  };









  // Billing Transaction
  const handlePartyTransaction = async (selectedOption) => {
    setSelectedPartyTransaction(selectedOption ? selectedOption : null);
    setSearchCriteria({ ...searchCriteria, PartyId: selectedOption ? selectedOption.value : null });

    if (!selectedOption) {
      setcombinewResults5([]);
    }
  };


  const BillingTransaction = async () => {
    setCurrentPage5(1);
    setcombinewResults5([]);
    setLoading(true);
    try {
      const results = await InviceService.getBillingTransactionAfter(searchCriteria);
      if (!results.data || results.data.length === 0) {
        toast.info('No data found', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
        });
      } else {
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







































  const handlePartyPayment = async (selectedOption) => {
    setErrors(prevErrors => selectedOption ? { ...prevErrors, selectedPartyPayment: '' } : { ...prevErrors, selectedPartyPayment: 'Please Select Party' });
    setSelectedPartyPayment(selectedOption ? selectedOption : null);
    if (selectedOption) {
      getInvoiceDataByPartyId(selectedOption ? selectedOption.value : '');
      getbyAdvancePartyId(selectedOption ? selectedOption.value : '')
    } else {
      setInvoicePayment([]);
      setAdvAmt(0);
      setBalAdvAmt(0);
    }

  };



  const [advanceData, setAdvanceData] = useState([]);

  const getAllAdvanceReceipts = async (partyId) => {
    const advanceData = await InviceService.getAllAdvanceData(companyid, branchId, partyId);
    setAdvanceData(advanceData.data);
  };


  const handlePartyChangeNew = async (selectedOption) => {
    setErrors(prevErrors => selectedOption ? { ...prevErrors, selectedPartyNew: '' } : { ...prevErrors, selectedPartyNew: 'Please Select Party' });
    setSelectedPartyNew(selectedOption);
  };

  const handlePartyChangeAll = async (selectedOption) => {
    setErrors(prevErrors => selectedOption ? { ...prevErrors, selectedPartyAll: '' } : { ...prevErrors, selectedPartyAll: 'Please Select Party' });
    if (selectedOption) {
      setSelectedPartyAll(selectedOption);
    }
    else {
      setInvoiceDataHistory([]);
    }
  };



  const [totalBill, setTotalBill] = useState('');


  const findBillingTransaction = async (selectedPartyNew) => {
    setLoading(true);
    try {
      const response = await InviceService.getCombinedImportsandxports(companyid, branchId, selectedPartyNew);

      const invoices = response.data;
      if (!invoices || !invoices > 0) {
        toast.error("No Data found", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 900,
        });
      }
      else {
        let totalAmount = 0;
        invoices.forEach(invoice => {
          totalAmount += invoice.billAmount;
        });

        // Set total bill amount to state
        setTotalBill(totalAmount);
        setcombinewResults(invoices);
      };
    }
    catch {
      toast.error("something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 900,
      });
    }
    finally {
      setLoading(false);
    }
  };

  // Save Payment Receipt
  const validateForm = () => {
    const newErrors = {};

    // Validate NEFT fields
    if (paymentMode.NEFT === 'NF') {
      if (!neftTransactionNo.trim()) {
        newErrors.neftTransactionNo = 'Transaction Number is required.';
      }
      if (!neftTransactionDate) {
        newErrors.neftTransactionDate = 'Transaction Date is required.';
      }
      if (neftTransactionAmt <= 0) {
        newErrors.neftTransactionAmt = 'Transaction Amount must be greater than 0.';
      }
      if (!neftTransbankName.trim()) {
        newErrors.neftTransbankName = 'Bank Name is required.';
      }
    }

    // Validate UPI fields
    if (paymentMode.UPI === 'UP') {
      if (!upiTransactionNo.trim()) {
        newErrors.upiTransactionNo = 'Transaction Number is required.';
      }
      if (!upiTransactionDate) {
        newErrors.upiTransactionDate = 'Transaction Date is required.';
      }
      if (upiTransactionAmt <= 0) {
        newErrors.upiTransactionAmt = 'Transaction Amount must be greater than 0.';
      }
      if (!upiTransbankName.trim()) {
        newErrors.upiTransbankName = 'Bank Name is required.';
      }
    }

    // Validate Cheque fields
    if (paymentMode.Cheque === 'CQ') {
      if (!chequeNo.trim()) {
        newErrors.chequeNo = 'Cheque Number is required.';
      }
      if (!checkAmount) {
        newErrors.checkAmount = 'Amount is required.';
      }
      if (!chequeDate) {
        newErrors.chequeDate = 'Cheque Date is required.';
      }
    }

    // Validate Cash fields
    if (paymentMode.Cash === 'CA') {
      if (transactionAmt <= 0) {
        newErrors.transactionAmt = 'Amount must be greater than 0.';
      }
      if (!transactionDate) {
        newErrors.transactionDate = 'Transaction Date is required.';
      }
    }

    // Validate Advance fields
    if (paymentMode.Advance === 'AD') {
      if (advanceAmt <= 0) {
        newErrors.advanceAmt = 'Advance Amount must be greater than 0.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const SearchPartyAmount = async (partyId) => {
    if (
      !paymentMode.NEFT &&
      !paymentMode.UPI &&
      !paymentMode.Cheque &&
      !paymentMode.Cash &&
      !paymentMode.Advance
    ) {
      toast.error('Please Select Payment Mode!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 700,
      });
      return;
    }

    const isValid = validateForm();

    if (!isValid) {
      toast.error('Oops something went wrong!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 900,
      });
      return;
    }
    if (!invoiceNoList.length > 0) {
      toast.error('Please Select Invoice To be Clear!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 900,
        style: { width: '25vw', },
      });
      return;
    }


    if (paymentMode.Advance === 'AD') {
      if (advanceAmt > balAdvAmt) {
        toast.error('please check balance advance amount!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 900,
          style: { width: '26vw', },
        });
        return;
      }
    }
    if (tdsPercentage > 0 || tdsAmt > 0) {
      if (!tdsPercentage || !tdsAmt) {
        toast.error('Please check tds % and amount', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 900,
          style: { width: '25vw', },
        });
        const newErrors = {};
        if (tdsPercentage <= 0) {
          newErrors.tdsPercentage = 'Tds % must be greater than 0.';
        }
        if (!tdsAmt) {
          newErrors.tdsAmt = 'Tds Amount  is required.';
        }
        setErrors(newErrors);
        return;
      }

      if (!(receiptAmt === (selectedInvoiceAmount - tdsAmt))) {
        toast.error('Please check Receipt and amount to be paid', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 900,
          style: { width: '27vw', },
        });
        return;
      }
    }

    if (!(tdsPercentage > 0 || tdsAmt > 0)) {
      if (!(receiptAmt === selectedInvoiceAmount)) {
        toast.error('Please check Receipt and amount to be paid', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 900,
          style: { width: '27vw', },
        });
        return;
      }
    }
    setLoading(true);
    try {
      const response = await InviceService.addFintranceDTL(companyid, branchId, partyId, userId, FinTranceDTLData, FinTranceData);
      setTransId(response.data.transId);
      getbyAdvancePartyId(response.data.partyId);
    }
    catch {
      toast.error('Oops something went wrong!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 900,
      });
    }
    finally {
      setLoading(false);
    }
  };
  // DOWNLOAD RECEIPT 

  const downLoadReceipt = async (partyId, receiptId, type) => {
    setLoading(true);
    try {
      const response = await InviceService.downloadReceipt(companyid, branchId, partyId, receiptId);


      if (response.status === 200) {
        const pdfData = response.data;
        const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(pdfBlob);

        if (type === "PDF") {
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
        }
        if (type === 'PRINT') {
          window.open(blobUrl, '_blank');
        }
        toast.success("Downloading Pdf!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 800,
        });
      } else {
        console.error("Error downloading PDF:", response.statusText);
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let totalAmount = 0;

    if (paymentMode.NEFT === 'NF' && neftTransactionAmt > 0) {
      totalAmount += parseFloat(neftTransactionAmt);
    }

    if (paymentMode.UPI === 'UP' && upiTransactionAmt > 0) {
      totalAmount += parseFloat(upiTransactionAmt);
    }

    if (paymentMode.Cheque === 'CQ' && checkAmount > 0) {
      totalAmount += parseFloat(checkAmount);
    }

    if (paymentMode.Cash === 'CA' && transactionAmt > 0) {
      totalAmount += parseFloat(transactionAmt);
    }

    if (paymentMode.Advance === 'AD' && advanceAmt > 0) {
      totalAmount += parseFloat(advanceAmt);
    }

    setReceiptAmt(totalAmount);
  }, [paymentMode, neftTransactionAmt, upiTransactionAmt, checkAmount, transactionAmt, advanceAmt]);


  useEffect(() => {
    const calculateSelectedTotalAmount = () => {
      let totalAmount = 0;
      selectedItems.forEach((item) => {

        const selectedInvoice = InvoicePayment.find((invoice) => invoice.invoiceNO === item.invoiceNO);
        if (selectedInvoice) {
          totalAmount += selectedInvoice.totalInvoiceAmount;
        }
      });
      return totalAmount;
    };
    setSelectedInvoiceAmount(calculateSelectedTotalAmount());
  }, [InvoicePayment, selectedItems]);


  // Receipts 
  const [ReceiptsDataHistory, setReceiptsDataHistory] = useState([]);
  const [selectedPartyReceipt, setselectedPartyReceipt] = useState(null);

  const handlePartyChangeReceipt = async (selectedOption) => {
    setErrors(prevErrors => selectedOption ? { ...prevErrors, selectedPartyReceipt: '' } : { ...prevErrors, selectedPartyReceipt: 'Please Select Party' });
    if (selectedOption) {
      setselectedPartyReceipt(selectedOption);
    }
    else {
      setselectedPartyReceipt(null);
      setReceiptsDataHistory([]);
    }
  };






  const SearchReceiptsHistry = async (partiId2) => {

    setLoading(true);
    try {
      const response = await InviceService.getReceiptDataOfParty(companyid, branchId, partiId2);
      if (!response.data || !response.data.length > 0) {
        toast.error("No data found!!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
        });
      } else {
        setReceiptsDataHistory(response.data);
      }
    } catch {
      toast.error("Something Went Wrong!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    } finally {
      setLoading(false);
    }
  };
















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
                          onClick={(e) => downloadSingleInvice(invoice.partyId, invoice.invoiceNO, "PRINT")}
                        >
                          <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
                          {/* Download */}
                        </Button>


                      </td>

                      <td>{invoice.paymentStatus === 'P' ? "Pending" : invoice.paymentStatus === 'Y' ? "Paid" : ''}</td>

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
                <button style={{ color: 'gray' }} className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true" onClick={resetSearchCriteria}><h6>Bill Generation</h6></button>
              </li>

              <li className="nav-item tabspace" role="presentation">
                <button style={{ color: 'gray' }} className="nav-link" id="transaction-tab" data-bs-toggle="tab" data-bs-target="#transaction" type="button" role="tab" aria-controls="transaction" aria-selected="false" onClick={resetSearchCriteria}><h6>Billing Transaction</h6></button>
              </li>

              <li className="nav-item tabspace" role="presentation">
                <button style={{ color: 'gray' }} className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><h6>Bills</h6></button>
              </li>

              <li className="nav-item tabspace" role="presentation">
                <button onClick={() => { makeFieldEmpty(); makeAdvanceTabEmpty(); }} style={{ color: 'gray' }} className="nav-link" id="payment-tab" data-bs-toggle="tab" data-bs-target="#payment" type="button" role="tab" aria-controls="payment" aria-selected="false"><h6>Payment Transaction</h6></button>
              </li>

              <li className="nav-item tabspace" role="presentation">
                <button onClick={() => { makeFieldEmpty(); makeAdvanceTabEmpty(); }} style={{ color: 'gray' }} className="nav-link" id="advance-tab" data-bs-toggle="tab" data-bs-target="#advance" type="button" role="tab" aria-controls="advance" aria-selected="false"><h6>Add Advance</h6></button>
              </li>

              <li className="nav-item tabspace" role="presentation">
                <button onClick={() => { makeFieldEmpty(); makeAdvanceTabEmpty(); }} style={{ color: 'gray' }} className="nav-link" id="Receipts-tab" data-bs-toggle="tab" data-bs-target="#Receipts" type="button" role="tab" aria-controls="Receipts" aria-selected="false"><h6>Receipts</h6></button>
              </li>

            </ul>
            <div className="tab-content" id="myTabContent">

              {/* Bill Generation */}
              <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={4}>

                        <FormGroup>
                          <Label className="forlabel" for="branchId">Select Party</Label><span className={errors.selectedPartyNew ? 'error-message' : ''}>*</span>
                          <Select
                            options={partiesNew}
                            placeholder="Select a party"
                            isClearable
                            value={selectedPartyNew}
                            onChange={handlePartyChangeNew}
                            filterOption={customFilterOption}
                            // className={errors.selectedPartyNew ? 'error-border' : ''}
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
                              }),
                              placeholder: (provided) => ({
                                ...provided,
                                display: 'flex',
                                color: 'gray',
                              }),
                            }}
                          />
                        </FormGroup>
                      </Col>

                      <Col md={2}>
                        <Button
                          variant="outline-primary"
                          style={{ marginTop: '2vw' }}
                          // disabled={!selectedPartyNew}
                          onClick={(e) => findBillingTransaction(selectedPartyNew ? selectedPartyNew.value : '')}
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
                    <Table responsive bordered >
                      <thead>
                        <tr className="text-center">
                          <th rowSpan="2" style={{ width: '15%', background: '#BADDDA' }}>Sr No.</th>
                          <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>Party</th>
                          <th rowSpan="2" style={{ width: '10%', background: '#BADDDA' }}>Packets</th>
                          <th rowSpan="2" style={{ width: '10%', background: '#BADDDA' }}>IR/ER No.</th>
                          <th rowSpan="2" style={{ width: '10%', background: '#BADDDA' }}>Mawb</th>
                          <th rowSpan="2" style={{ width: '10%', background: '#BADDDA' }}>Hawb</th>
                          <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>In Date</th>
                          <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>Out Date</th>
                          <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>CHA</th>
                          <th rowSpan="2" style={{ width: '25%', background: '#BADDDA' }}>Console</th>
                          <th rowSpan="2" style={{ width: '25%', background: '#BADDDA' }}>Doc Charges</th>
                          <th colSpan="2" style={{ width: '25%', background: '#BADDDA' }}>AS Per Value</th>
                          <th colSpan="2" style={{ width: '25%', background: '#BADDDA' }}>AS Per Weight</th>
                          <th colSpan="2" style={{ width: '25%', background: '#BADDDA' }}>Demurages Charges</th>
                          <th rowSpan="2" style={{ width: '25%', background: '#BADDDA' }}>Total Amount</th>
                        </tr>
                        <tr>
                          <th style={{ width: '6%', background: '#BADDDA' }}>Value(INR)</th>
                          <th style={{ width: '6%', background: '#BADDDA' }}>Charges(INR)</th>
                          <th style={{ width: '6%', background: '#BADDDA' }}>Weight(CTS)</th>
                          <th style={{ width: '6%', background: '#BADDDA' }}>Charges(INR)</th>
                          <th style={{ width: '6%', background: '#BADDDA' }}>Days</th>
                          <th style={{ width: '6%', background: '#BADDDA' }}>charges(INR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map((import2, index) =>
                          <tr className="text-center dynamic-row-width">
                            <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                            <td>{import2.importerName}</td>
                            <td>{import2.noPackates}</td>
                            <td>{import2.sirNo}</td>
                            <td>{import2.mawb}</td>
                            <td>{import2.hawb}</td>
                            <td>{formatDateTimeNEW(import2.inDate)}</td>
                            <td>{formatDateTimeNEW(import2.outDate)}</td>
                            <td>{import2.chaName}</td>
                            <td>{import2.consoleName}</td>
                            <td>{import2.documentCharges}</td>
                            <td>{import2.price}</td>
                            <td>{import2.rateByPrice}</td>
                            <td>{import2.weight}</td>
                            <td>{import2.rateByWeight}</td>
                            <td>{import2.stockDays}</td>
                            <td>{import2.demurageCharges}</td>
                            <td>{import2.billAmount}</td>
                          </tr>
                        )
                        }
                        <tr className='text-center' style={{ marginTop: '10px' }}>
                          <td><b>Total</b></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td><b>{totalBill}</b></td>

                        </tr>
                      </tbody>
                    </Table>
                    <>
                      {/* <div>
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

                    </div> */}
                    </>
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


              </div>

              {/* Bills */}
              <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">



                <Card>

                  <CardBody>

                    <Row>
                      <Col md={5}>

                        <FormGroup>
                          <Label className="forlabel" for="branchId">Select Party</Label>


                          <Select
                            options={partiesAll}
                            value={selectedPartyAll}
                            onChange={handlePartyChangeAll}
                            className={errors.selectedPartyAll ? 'error-border' : ''}
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
                          disabled={!selectedPartyAll}
                          onClick={(e) => SearchInvoiceHistry(selectedPartyAll ? selectedPartyAll.value : '')}
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
                              <th rowSpan="2" style={{ background: '#BADDDA' }}>Sr No</th>
                              <th rowSpan="2" style={{ background: '#BADDDA' }}>Bill No</th>
                              <th rowSpan="2" style={{ background: '#BADDDA' }}>Date & Time</th>
                              <th rowSpan="2" style={{ background: '#BADDDA' }}>Amount</th>
                              <th colSpan="2" style={{ background: '#BADDDA' }}>Invoice</th>
                              <th rowSpan="2" style={{ background: '#BADDDA' }}>Payment Status</th>

                            </tr>
                            <tr className='text-center'>
                              <td style={{ background: '#BADDDA' }}><b> Print</b></td>
                              <td style={{ background: '#BADDDA' }}><b>Download</b></td>
                            </tr>
                          </thead>
                          <tbody>
                            {InvoiceDataHistory.map((invoice, index) =>
                              <tr className="text-center dynamic-row-width">
                                <td>{index + 1}</td>
                                <td>{invoice.invoiceNO}</td>
                                <td>{formatDateTimeMonth(invoice.invoiceDate)}</td>
                                <td>{invoice.totalInvoiceAmount}</td>

                                <td>
                                  <Button
                                    variant="outline-primary"
                                    onClick={(e) => downloadSingleInvice(invoice.partyId, invoice.invoiceNO, "PRINT")}
                                  >
                                    <FontAwesomeIcon icon={faDownload} />
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    variant="outline-success"
                                    onClick={(e) => downloadSingleInvice(invoice.partyId, invoice.invoiceNO, "PDF")}
                                  >
                                    <FontAwesomeIcon icon={faDownload} />
                                  </Button>
                                </td>
                                {/* 
                                <td>
                                  <Button
                                    variant="outline-success"
                                    onClick={(e) => downloadSingleBill(invoice.partyId, invoice.invoiceNO)}
                                  >
                                    <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
                                    Download
                                  </Button>
                                </td> */}

                                {/* <td>

                                  <Button
                                    variant="outline-success"
                                    onClick={(e) => downloadSingleDemurages(invoice.partyId, invoice.invoiceNO)}
                                  >
                                    <FontAwesomeIcon icon={faDownload} style={{ marginRight: '5px' }} />
                                    Download
                                  </Button>


                                </td> */}
                                <td>{invoice.paymentStatus === 'P' ? "Pending" : invoice.paymentStatus === 'Y' ? "Paid" : ''}</td>

                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    ) : null}


                  </CardBody>
                </Card>
              </div>

              {/* Payment */}
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
                              disabled
                              id='service'
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
                            readOnly
                            id='service'
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Selected Invoice Amount</Label>
                          <Input
                            type="number"
                            name="receiptAmt"
                            value={selectedInvoiceAmount}
                            readOnly
                            id='service'
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Select Party</Label>
                          <Select
                            options={partiesAll}
                            value={selectedPartyPayment}
                            onChange={handlePartyPayment}
                            className={errors.selectedPartyPayment ? 'error-border' : ''}
                            isClearable
                            disabled={transId}
                            id={transId ? 'service' : ''}
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
                          <Label className="forlabel" for="branchId">Balance advance amount</Label>
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
                          <Label className="forlabel" for="branchId">Amount To be Paid</Label>
                          <Input
                            type="text"
                            name="approvedBy"
                            value={selectedInvoiceAmount - tdsAmt}
                            readOnly
                            id='service'
                          // onChange={(e) => setAdvAmt(e.target.value)}
                          />
                        </FormGroup>


                      </Col>

                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Currency</Label>
                          <Input
                            type="text"
                            name="INR"
                            placeholder='INR'
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            maxLength={8}
                            readOnly
                            id='service'
                          />
                        </FormGroup>
                      </Col>
                    </Row>


                    {/* Add Paymenr By Payment Type  */}


                    <Row>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">TDS Percentage</Label>
                          <Input
                            type="number"
                            name="tdsPercentage"
                            onChange={(e) => {
                              let inputText = e.target.value;
                              if (inputText.length > 2) {
                                inputText = inputText.slice(0, 2);
                              }
                              setTdsPercentage(inputText);
                            }}
                            value={tdsPercentage}
                            maxLength={2}
                            className={errors.tdsPercentage ? 'error-border' : ''}
                          />
                          {errors.tdsPercentage && (
                            <div className="error-message">
                              {errors.tdsPercentage}
                            </div>
                          )}
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
                              if (inputText.length > 6) {
                                inputText = inputText.slice(0, 6);
                              }
                              if (inputText < selectedInvoiceAmount) {
                                setTdsAmt(inputText);
                              }
                            }}
                            value={tdsAmt}
                            className={errors.tdsAmt ? 'error-border' : ''}
                          />
                          {errors.tdsAmt && (
                            <div className="error-message">
                              {errors.tdsAmt}
                            </div>
                          )}
                        </FormGroup>
                      </Col>

                      <Col md={6}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Remarks</Label>
                          <Input
                            type="text"
                            name="approvedBy"
                            value={narration}
                            className="inputField"
                            onChange={(e) => setNarration(e.target.value)}
                            maxLength={100}
                          />
                        </FormGroup>
                      </Col>
                    </Row>


                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Select Payment Method</Label>
                          <Row>
                            <Col md={2}>
                              <Input
                                className="form-check-input radios"
                                type="checkbox"
                                style={{ width: '1.2vw', height: '1.2vw', marginRight: '5px' }}
                                name="NEFT"
                                checked={paymentMode.NEFT === 'NF'}
                                onChange={handleCheckboxChange}
                              />
                              <label className="form-check-label ml-2" style={{ fontWeight: 'bold' }}>NEFT</label>
                            </Col>
                            <Col md={2}>
                              <Input
                                className="form-check-input radios"
                                type="checkbox"
                                style={{ width: '1.2vw', height: '1.2vw', marginRight: '5px' }}
                                name="UPI"
                                checked={paymentMode.UPI === 'UP'}
                                onChange={handleCheckboxChange}
                              />
                              <label className="form-check-label ml-2" style={{ fontWeight: 'bold' }}>UPI</label>
                            </Col>
                            <Col md={2}>
                              <Input
                                className="form-check-input radios"
                                type="checkbox"
                                style={{ width: '1.2vw', height: '1.2vw', marginRight: '5px' }}
                                name="Cheque"
                                checked={paymentMode.Cheque === 'CQ'}
                                onChange={handleCheckboxChange}
                              />
                              <label className="form-check-label ml-2" style={{ fontWeight: 'bold' }}>Cheque</label>
                            </Col>
                            <Col md={2}>
                              <Input
                                className="form-check-input radios"
                                type="checkbox"
                                style={{ width: '1.2vw', height: '1.2vw', marginRight: '5px' }}
                                name="Cash"
                                checked={paymentMode.Cash === 'CA'}
                                onChange={handleCheckboxChange}
                              />
                              <label className="form-check-label ml-2" style={{ fontWeight: 'bold' }}>Cash</label>
                            </Col>
                            <Col md={3}>
                              <Input
                                className="form-check-input radios"
                                type="checkbox"
                                style={{ width: '1.2vw', height: '1.2vw', marginRight: '5px' }}
                                name="Advance"
                                checked={paymentMode.Advance === 'AD'}
                                onChange={handleCheckboxChange}
                              />
                              <label className="form-check-label ml-2" style={{ fontWeight: 'bold' }}>Advance</label>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>

                    </Row>


                    {paymentMode.Cheque === 'CQ' ? (
                      <>
                        <h5 className="mt-3 mb-3">Enter Check Details Below</h5>
                        <Row>
                          <Col md={3}>
                            <FormGroup>
                              <Label className="forlabel" htmlFor="branchId">
                                Cheque Number
                              </Label>
                              <Input
                                type="text"
                                value={chequeNo}
                                maxLength={15}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setChequeNo(value);
                                  const newErrors = value
                                    ? { ...errors, chequeNo: undefined }
                                    : { ...errors, chequeNo: 'chequeNo is required.' };
                                  setErrors(newErrors);
                                }}
                              />
                              {errors.chequeNo && (
                                <div className="error-message">
                                  {errors.chequeNo}
                                </div>
                              )}
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
                                    const newErrors = { ...errors };
                                    if (date) {
                                      setChequeDate(date);
                                      delete newErrors['chequeDate'];
                                    } else {
                                      newErrors['chequeDate'] = 'chequeDate is required.';
                                    }
                                    setErrors(newErrors);
                                  }}
                                  value={chequeDate}
                                  dateFormat="dd/MM/yyyy"
                                  className="form-control"
                                  customInput={<input style={{ width: '100%' }} />}
                                />
                                {errors.chequeDate && (
                                  <div className="error-message">
                                    {errors.chequeDate}
                                  </div>
                                )}
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
                                value={CheckbankName}
                                onChange={(e) => { setcheckbankName(e.target.value); }}
                                maxLength={40}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={3}>
                            <FormGroup>
                              <Label className="forlabel" htmlFor="branchId">
                                Check Amount
                              </Label>
                              <Input
                                type="number"
                                value={checkAmount}
                                className={errors.checkAmount ? 'error-border' : ''}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setCheckAmount(value);
                                  const newErrors = value
                                    ? { ...errors, checkAmount: undefined }
                                    : { ...errors, checkAmount: 'checkAmount is required.' };
                                  setErrors(newErrors);
                                }}
                                maxLength={40}
                              />
                              {errors.checkAmount && (
                                <div className="error-message">
                                  {errors.checkAmount}
                                </div>
                              )}

                            </FormGroup>
                          </Col>

                        </Row>
                      </>
                    ) : null}

                    {paymentMode.NEFT === 'NF' ? (
                      <>
                        <h5 className="mt-3 mb-3">Enter NEFT Details Below</h5>

                        <Row>
                          <Col md={3}>
                            <FormGroup>
                              <Label className="forlabel" htmlFor="branchId">
                                Transaction Number
                              </Label>
                              <Input
                                type="text"
                                value={neftTransactionNo}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setNeftTransactionNo(value);
                                  const newErrors = value
                                    ? { ...errors, neftTransactionNo: undefined }
                                    : { ...errors, neftTransactionNo: 'neftTransactionNo is required.' };
                                  setErrors(newErrors);
                                }}
                                className={errors.neftTransactionNo ? 'error-border' : ''}
                              />
                              {errors.neftTransactionNo && (
                                <div className="error-message">
                                  {errors.neftTransactionNo}
                                </div>
                              )}

                            </FormGroup>
                          </Col>

                          <Col md={3}>
                            <FormGroup>
                              <Label className="forlabel" for="branchId">Transaction Date</Label>
                              <div>
                                <DatePicker
                                  selected={neftTransactionDate}
                                  wrapperClassName="custom-react-datepicker-wrapper"
                                  onChange={(date) => {
                                    const newErrors = { ...errors };
                                    if (date) {
                                      setNeftTransactionDate(date);
                                      delete newErrors['neftTransactionDate'];
                                    } else {
                                      newErrors['neftTransactionDate'] = 'neftTransactionDate is required.';
                                    }
                                    setErrors(newErrors);
                                  }}
                                  value={neftTransactionDate}
                                  dateFormat="dd/MM/yyyy"
                                  className={`form-control ${errors.neftTransactionDate ? 'error-border' : ''}`}
                                  customInput={<input style={{ width: '100%' }} />}
                                />
                                {errors.neftTransactionDate && (
                                  <div className="error-message">
                                    {errors.neftTransactionDate}
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
                                value={neftTransactionAmt}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setNeftTransactionAmt(value);
                                  const newErrors = value
                                    ? { ...errors, neftTransactionAmt: undefined }
                                    : { ...errors, neftTransactionAmt: 'neftTransactionAmt is required.' };
                                  setErrors(newErrors);
                                }}
                                className={errors.neftTransactionAmt ? 'error-border' : ''}
                                maxLength={15}
                              />
                              {errors.neftTransactionAmt && (
                                <div className="error-message">
                                  {errors.neftTransactionAmt}
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
                                value={neftTransbankName}
                                onChange={(e) => setNeftTransbankName(e.target.value)}
                                className={errors.neftTransbankName ? 'error-border' : ''}
                                maxLength={40}
                              />
                              {errors.neftTransbankName && (
                                <div className="error-message">
                                  {errors.neftTransbankName}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    ) : null}

                    {paymentMode.UPI === 'UP' ? (
                      <>
                        <h5 className="mt-3 mb-3">Enter UPI Details Below</h5>
                        <Row>
                          <Col md={3}>
                            <FormGroup>
                              <Label className="forlabel" htmlFor="branchId">
                                Transaction Number
                              </Label>
                              <Input
                                type="text"
                                value={upiTransactionNo}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setUpiTransactionNo(value);
                                  const newErrors = value
                                    ? { ...errors, upiTransactionNo: undefined }
                                    : { ...errors, upiTransactionNo: 'upiTransactionNo is required.' };
                                  setErrors(newErrors);
                                }}
                                className={errors.upiTransactionNo ? 'error-border' : ''}
                              />
                              {errors.upiTransactionNo && (
                                <div className="error-message">
                                  {errors.upiTransactionNo}
                                </div>
                              )}

                            </FormGroup>
                          </Col>

                          <Col md={3}>
                            <FormGroup>
                              <Label className="forlabel" for="branchId">Transaction Date</Label>
                              <div>
                                <DatePicker
                                  selected={upiTransactionDate}
                                  wrapperClassName="custom-react-datepicker-wrapper"
                                  onChange={(date) => {
                                    const newErrors = { ...errors };
                                    if (date) {
                                      setUpiTransactionDate(date);
                                      delete newErrors['upiTransactionDate'];
                                    } else {
                                      newErrors['upiTransactionDate'] = 'upiTransactionDate is required.';
                                    }
                                    setErrors(newErrors);
                                  }}
                                  value={upiTransactionDate}
                                  dateFormat="dd/MM/yyyy"
                                  className={`form-control ${errors.upiTransactionDate ? 'error-border' : ''}`}
                                  customInput={<input style={{ width: '100%' }} />}
                                />
                                {errors.upiTransactionDate && (
                                  <div className="error-message">
                                    {errors.upiTransactionDate}
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
                                value={upiTransactionAmt}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setUpiTransactionAmt(value);
                                  const newErrors = value
                                    ? { ...errors, upiTransactionAmt: undefined }
                                    : { ...errors, upiTransactionAmt: 'upiTransactionAmt is required.' };
                                  setErrors(newErrors);
                                }}
                                className={errors.upiTransactionAmt ? 'error-border' : ''}
                                maxLength={15}
                              />
                              {errors.upiTransactionAmt && (
                                <div className="error-message">
                                  {errors.upiTransactionAmt}
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
                                value={upiTransbankName}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setUpiTransbankName(value);
                                  const newErrors = value
                                    ? { ...errors, upiTransbankName: undefined }
                                    : { ...errors, upiTransbankName: 'upiTransbankName is required.' };
                                  setErrors(newErrors);
                                }}
                                className={errors.upiTransbankName ? 'error-border' : ''}
                                maxLength={40}
                              />
                              {errors.upiTransbankName && (
                                <div className="error-message">
                                  {errors.upiTransbankName}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    ) : null}

                    {paymentMode.Cash === 'CA' ? (
                      <>
                        <h5 className="mt-3 mb-3">Enter CASH Details Below</h5>
                        <Row>
                          <Col md={3}>
                            <FormGroup>
                              <Label className="forlabel" htmlFor="branchId">
                                Amount
                              </Label>
                              <Input
                                type="number"
                                value={transactionAmt}
                                // onChange={(e) => setTransactionAmt(e.target.value)}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setTransactionAmt(value);
                                  const newErrors = value
                                    ? { ...errors, transactionAmt: undefined }
                                    : { ...errors, transactionAmt: 'transactionAmt is required.' };
                                  setErrors(newErrors);
                                }}
                                className={errors.transactionAmt ? 'error-border' : ''}
                                maxLength={15}
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
                                    const newErrors = { ...errors };
                                    if (date) {
                                      setTransactionDate(date);
                                      delete newErrors['transactionDate'];
                                    } else {
                                      newErrors['transactionDate'] = 'transactionDate is required.';
                                    }
                                    setErrors(newErrors);
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
                      </>
                    ) : null}

                    {paymentMode.Advance === 'AD' ? (
                      <>
                        <h5 className="mt-3 mb-3">Enter Advance Details Below</h5>
                        <Row>
                          <Col md={3}>
                            <FormGroup>
                              <Label className="forlabel" htmlFor="branchId">
                                Advance Amount
                              </Label>
                              <Input
                                type="number"
                                value={advanceAmt}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (balAdvAmt >= e.target.value) {
                                    setAdvanceAmt(value);
                                  }
                                  const newErrors = value
                                    ? { ...errors, advanceAmt: undefined }
                                    : { ...errors, advanceAmt: 'advanceAmt is required.' };
                                  setErrors(newErrors);
                                }}
                                className={errors.advanceAmt ? 'error-border' : ''}
                              />
                              {errors.advanceAmt && (
                                <div className="error-message">
                                  {errors.advanceAmt}
                                </div>
                              )}

                            </FormGroup>
                          </Col>

                        </Row>
                      </>
                    ) : null}

                    <div className="text-center">
                      <Button
                        variant="outline-success"
                        style={{ marginTop: '2vw' }}
                        disabled={!selectedPartyPayment || transId}
                        onClick={() => SearchPartyAmount(selectedPartyPayment ? selectedPartyPayment.value : '')}>
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                        SAVE
                      </Button>

                      <Button
                        variant="outline-primary"
                        style={{ marginTop: '2vw', marginLeft: '10px' }}
                        disabled={!selectedPartyPayment || transId}
                        onClick={() => downLoadReceipt(selectedPartyPayment ? selectedPartyPayment.value : '', transId, 'PDF')}>
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                        Download
                      </Button>


                      <Button
                        variant="outline-success"
                        style={{ marginTop: '2vw', marginLeft: '1.5vw' }}
                        onClick={clearReceipt}>
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                        Clear
                      </Button>

                    </div>

                    {/* Invice Data For Payment */}

                    {InvoicePayment.length > 0 ? (
                      <div>
                        <h4 className='text-center'>{partyName}</h4>

                        <Table striped responsive bordered>
                          <thead>
                            <tr className='text-center'>
                              <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                                <Input
                                  className="form-check-input radios"
                                  type="checkbox"
                                  style={{ width: '1.2vw', height: '1.2vw' }}
                                  checked={selectAll}
                                  onChange={() => handleSelectAllChange()}
                                /></th>
                              <th style={{ background: '#BADDDA' }}>Invoice Number</th>
                              <th style={{ background: '#BADDDA' }}>Invoice Date</th>
                              <th style={{ background: '#BADDDA' }}>Invoice Amount</th>
                              <th style={{ background: '#BADDDA' }}>Cleared Amount</th>
                              {/* <th style={{ background: '#BADDDA' }}>Received Amount</th> */}
                            </tr>

                          </thead>
                          <tbody>
                            {InvoicePayment.map((invoice, index) =>
                              <tr className="text-center dynamic-row-width">
                                <td>
                                  <Input
                                    className="form-check-input radios"
                                    type="checkbox"
                                    style={{ width: '1.2vw', height: '1.2vw' }}
                                    name="taxApplicable"
                                    checked={selectedItems.some((item) => item.invoiceNO === invoice.invoiceNO)}
                                    onChange={() => handleRowCheckboxChange(index, invoice.invoiceNO)}
                                  />
                                </td>
                                <td>{invoice.invoiceNO}</td>
                                <td>{formatDateTime(invoice.invoiceDate)}</td>
                                <td>{invoice.totalInvoiceAmount}</td>
                                <td>{invoice.clearedAmt}
                                </td>
                                {/* <td className="text-center" style={{ textAlign: 'center' }}>
                                  <Input
                                    text="number"
                                    name="received amount"
                                    style={{ display: 'inline-block', width: '40%' }}
                                  />
                                </td> */}

                              </tr>
                            )}
                          </tbody>
                        </Table>

                      </div>
                    ) : null}
                  </CardBody>
                </Card>
              </div>


              {/* Advamce Tab  */}
              <div className="tab-pane fade" id="advance" role="tabpanel" aria-labelledby="advance-tab">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={5}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Select Party</Label>
                          <Select
                            options={partiesAll}
                            value={selectedPartyAdvance}
                            onChange={handlePartyAdvance}
                            className={errors.selectedPartyAdvance ? 'error-border' : ''}
                            isClearable
                            filterOption={customFilterOption}
                            placeholder="Select a Party"
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

                      <Col md={2}>
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
                      <Col md={2}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Receipt Amount</Label>
                          <Input
                            type="number"
                            name="receiptAmt"
                            value={receiptAmt}
                            readOnly
                            id='service'
                          />
                        </FormGroup>
                      </Col>

                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Select Payment Method</Label>
                          <Row>
                            <Col md={2}>
                              <Input
                                className="form-check-input radios"
                                type="checkbox"
                                style={{ width: '1.2vw', height: '1.2vw', marginRight: '5px' }}
                                name="NEFT"
                                checked={paymentMode.NEFT === 'NF'}
                                onChange={handleCheckboxChange}
                              />
                              <label className="form-check-label ml-2" style={{ fontWeight: 'bold' }}>NEFT</label>
                            </Col>
                            <Col md={2}>
                              <Input
                                className="form-check-input radios"
                                type="checkbox"
                                style={{ width: '1.2vw', height: '1.2vw', marginRight: '5px' }}
                                name="UPI"
                                checked={paymentMode.UPI === 'UP'}
                                onChange={handleCheckboxChange}
                              />
                              <label className="form-check-label ml-2" style={{ fontWeight: 'bold' }}>UPI</label>
                            </Col>
                            <Col md={2}>
                              <Input
                                className="form-check-input radios"
                                type="checkbox"
                                style={{ width: '1.2vw', height: '1.2vw', marginRight: '5px' }}
                                name="Cheque"
                                checked={paymentMode.Cheque === 'CQ'}
                                onChange={handleCheckboxChange}
                              />
                              <label className="form-check-label ml-2" style={{ fontWeight: 'bold' }}>Cheque</label>
                            </Col>
                            <Col md={2}>
                              <Input
                                className="form-check-input radios"
                                type="checkbox"
                                style={{ width: '1.2vw', height: '1.2vw', marginRight: '5px' }}
                                name="Cash"
                                checked={paymentMode.Cash === 'CA'}
                                onChange={handleCheckboxChange}
                              />
                              <label className="form-check-label ml-2" style={{ fontWeight: 'bold' }}>Cash</label>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>

                    </Row>




                    {paymentMode.Cheque === 'CQ' ? (
                      <>
                        <h5 className="mt-3 mb-3">Enter Check Details Below</h5>
                        <Row>
                          <Col md={3}>
                            <FormGroup>
                              <Label className="forlabel" htmlFor="branchId">
                                Cheque Number
                              </Label>
                              <Input
                                type="text"
                                value={chequeNo}
                                maxLength={15}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setChequeNo(value);
                                  const newErrors = value
                                    ? { ...errors, chequeNo: undefined }
                                    : { ...errors, chequeNo: 'chequeNo is required.' };
                                  setErrors(newErrors);
                                }}
                              />
                              {errors.chequeNo && (
                                <div className="error-message">
                                  {errors.chequeNo}
                                </div>
                              )}
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
                                    const newErrors = { ...errors };
                                    if (date) {
                                      setChequeDate(date);
                                      delete newErrors['chequeDate'];
                                    } else {
                                      newErrors['chequeDate'] = 'chequeDate is required.';
                                    }
                                    setErrors(newErrors);
                                  }}
                                  value={chequeDate}
                                  dateFormat="dd/MM/yyyy"
                                  className="form-control"
                                  customInput={<input style={{ width: '100%' }} />}
                                />
                                {errors.chequeDate && (
                                  <div className="error-message">
                                    {errors.chequeDate}
                                  </div>
                                )}
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
                                value={CheckbankName}
                                onChange={(e) => { setcheckbankName(e.target.value); }}
                                maxLength={40}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={3}>
                            <FormGroup>
                              <Label className="forlabel" htmlFor="branchId">
                                Check Amount
                              </Label>
                              <Input
                                type="number"
                                value={checkAmount}
                                className={errors.checkAmount ? 'error-border' : ''}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setCheckAmount(value);
                                  const newErrors = value
                                    ? { ...errors, checkAmount: undefined }
                                    : { ...errors, checkAmount: 'checkAmount is required.' };
                                  setErrors(newErrors);
                                }}
                                maxLength={40}
                              />
                              {errors.checkAmount && (
                                <div className="error-message">
                                  {errors.checkAmount}
                                </div>
                              )}

                            </FormGroup>
                          </Col>

                        </Row>
                      </>
                    ) : null}

                    {paymentMode.NEFT === 'NF' ? (
                      <>
                        <h5 className="mt-3 mb-3">Enter NEFT Details Below</h5>

                        <Row>
                          <Col md={3}>
                            <FormGroup>
                              <Label className="forlabel" htmlFor="branchId">
                                Transaction Number
                              </Label>
                              <Input
                                type="text"
                                value={neftTransactionNo}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setNeftTransactionNo(value);
                                  const newErrors = value
                                    ? { ...errors, neftTransactionNo: undefined }
                                    : { ...errors, neftTransactionNo: 'neftTransactionNo is required.' };
                                  setErrors(newErrors);
                                }}
                                className={errors.neftTransactionNo ? 'error-border' : ''}
                              />
                              {errors.neftTransactionNo && (
                                <div className="error-message">
                                  {errors.neftTransactionNo}
                                </div>
                              )}

                            </FormGroup>
                          </Col>

                          <Col md={3}>
                            <FormGroup>
                              <Label className="forlabel" for="branchId">Transaction Date</Label>
                              <div>
                                <DatePicker
                                  selected={neftTransactionDate}
                                  wrapperClassName="custom-react-datepicker-wrapper"
                                  onChange={(date) => {
                                    const newErrors = { ...errors };
                                    if (date) {
                                      setNeftTransactionDate(date);
                                      delete newErrors['neftTransactionDate'];
                                    } else {
                                      newErrors['neftTransactionDate'] = 'neftTransactionDate is required.';
                                    }
                                    setErrors(newErrors);
                                  }}
                                  value={neftTransactionDate}
                                  dateFormat="dd/MM/yyyy"
                                  className={`form-control ${errors.neftTransactionDate ? 'error-border' : ''}`}
                                  customInput={<input style={{ width: '100%' }} />}
                                />
                                {errors.neftTransactionDate && (
                                  <div className="error-message">
                                    {errors.neftTransactionDate}
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
                                value={neftTransactionAmt}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setNeftTransactionAmt(value);
                                  const newErrors = value
                                    ? { ...errors, neftTransactionAmt: undefined }
                                    : { ...errors, neftTransactionAmt: 'neftTransactionAmt is required.' };
                                  setErrors(newErrors);
                                }}
                                className={errors.neftTransactionAmt ? 'error-border' : ''}
                                maxLength={15}
                              />
                              {errors.neftTransactionAmt && (
                                <div className="error-message">
                                  {errors.neftTransactionAmt}
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
                                value={neftTransbankName}
                                onChange={(e) => setNeftTransbankName(e.target.value)}
                                className={errors.neftTransbankName ? 'error-border' : ''}
                                maxLength={40}
                              />
                              {errors.neftTransbankName && (
                                <div className="error-message">
                                  {errors.neftTransbankName}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    ) : null}

                    {paymentMode.UPI === 'UP' ? (
                      <>
                        <h5 className="mt-3 mb-3">Enter UPI Details Below</h5>
                        <Row>
                          <Col md={3}>
                            <FormGroup>
                              <Label className="forlabel" htmlFor="branchId">
                                Transaction Number
                              </Label>
                              <Input
                                type="text"
                                value={upiTransactionNo}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setUpiTransactionNo(value);
                                  const newErrors = value
                                    ? { ...errors, upiTransactionNo: undefined }
                                    : { ...errors, upiTransactionNo: 'upiTransactionNo is required.' };
                                  setErrors(newErrors);
                                }}
                                className={errors.upiTransactionNo ? 'error-border' : ''}
                              />
                              {errors.upiTransactionNo && (
                                <div className="error-message">
                                  {errors.upiTransactionNo}
                                </div>
                              )}

                            </FormGroup>
                          </Col>

                          <Col md={3}>
                            <FormGroup>
                              <Label className="forlabel" for="branchId">Transaction Date</Label>
                              <div>
                                <DatePicker
                                  selected={upiTransactionDate}
                                  wrapperClassName="custom-react-datepicker-wrapper"
                                  onChange={(date) => {
                                    const newErrors = { ...errors };
                                    if (date) {
                                      setUpiTransactionDate(date);
                                      delete newErrors['upiTransactionDate'];
                                    } else {
                                      newErrors['upiTransactionDate'] = 'upiTransactionDate is required.';
                                    }
                                    setErrors(newErrors);
                                  }}
                                  value={upiTransactionDate}
                                  dateFormat="dd/MM/yyyy"
                                  className={`form-control ${errors.upiTransactionDate ? 'error-border' : ''}`}
                                  customInput={<input style={{ width: '100%' }} />}
                                />
                                {errors.upiTransactionDate && (
                                  <div className="error-message">
                                    {errors.upiTransactionDate}
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
                                value={upiTransactionAmt}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setUpiTransactionAmt(value);
                                  const newErrors = value
                                    ? { ...errors, upiTransactionAmt: undefined }
                                    : { ...errors, upiTransactionAmt: 'upiTransactionAmt is required.' };
                                  setErrors(newErrors);
                                }}
                                className={errors.upiTransactionAmt ? 'error-border' : ''}
                                maxLength={15}
                              />
                              {errors.upiTransactionAmt && (
                                <div className="error-message">
                                  {errors.upiTransactionAmt}
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
                                value={upiTransbankName}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setUpiTransbankName(value);
                                  const newErrors = value
                                    ? { ...errors, upiTransbankName: undefined }
                                    : { ...errors, upiTransbankName: 'upiTransbankName is required.' };
                                  setErrors(newErrors);
                                }}
                                className={errors.upiTransbankName ? 'error-border' : ''}
                                maxLength={40}
                              />
                              {errors.upiTransbankName && (
                                <div className="error-message">
                                  {errors.upiTransbankName}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                      </>
                    ) : null}

                    {paymentMode.Cash === 'CA' ? (
                      <>
                        <h5 className="mt-3 mb-3">Enter CASH Details Below</h5>
                        <Row>
                          <Col md={3}>
                            <FormGroup>
                              <Label className="forlabel" htmlFor="branchId">
                                Amount
                              </Label>
                              <Input
                                type="number"
                                value={transactionAmt}
                                // onChange={(e) => setTransactionAmt(e.target.value)}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setTransactionAmt(value);
                                  const newErrors = value
                                    ? { ...errors, transactionAmt: undefined }
                                    : { ...errors, transactionAmt: 'transactionAmt is required.' };
                                  setErrors(newErrors);
                                }}
                                className={errors.transactionAmt ? 'error-border' : ''}
                                maxLength={15}
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
                                    const newErrors = { ...errors };
                                    if (date) {
                                      setTransactionDate(date);
                                      delete newErrors['transactionDate'];
                                    } else {
                                      newErrors['transactionDate'] = 'transactionDate is required.';
                                    }
                                    setErrors(newErrors);
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
                      </>
                    ) : null}

                    <div className="text-center">
                      <Button
                        variant="outline-success"
                        style={{ marginTop: '1.5vw' }}
                        disabled={!selectedPartyAdvance || transId}
                        onClick={() => addAdvance(selectedPartyAdvance ? selectedPartyAdvance.value : '')}>
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                        Add Advance
                      </Button>

                      <Button
                        variant="outline-success"
                        style={{ marginTop: '1.5vw', marginLeft: '1.5vw' }}
                        onClick={clearAdvance}>
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                        Clear
                      </Button>


                    </div>



                    {advanceData.length > 0 && (
                      <div className="modal-contents">
                        <div className="table table-bordered custom-table mt-3">
                          <Table className="table table-striped table-hover">
                            <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                              <tr className="text-center">
                                <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                                  Sr No.
                                </th>
                                <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                                  Receipt Id
                                </th>
                                <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                                  Transaction Date
                                </th>
                                <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                                  Advance Amount
                                </th><th style={{ backgroundColor: '#BADDDA' }} scope="col">
                                  Balance amount
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {advanceData.map((history, index) =>

                                <tr className="text-center" key={history.transId}>
                                  <td className="table-column">{index + 1}</td>
                                  <td className="table-column">{history.transId}</td>
                                  <td className="table-column">{formatDateTime(history.transDate)}</td>
                                  <td className="table-column">{history.advAmt}</td>
                                  <td className="table-column">{history.balAdvAmt}</td>
                                </tr>

                              )}




                            </tbody>
                          </Table>
                        </div>
                      </div>

                    )}




                  </CardBody>
                </Card>
              </div>


              {/* Billing Transactions */}
              <div className="tab-pane fade" id="transaction" role="tabpanel" aria-labelledby="transaction-tab">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Select Party</Label>
                          <Select
                            options={partiesAll}
                            value={selectedPartyTransaction}
                            onChange={handlePartyTransaction}
                            className={errors.selectedPartyAdvance ? 'error-border' : ''}
                            isClearable
                            filterOption={customFilterOption}
                            placeholder="Select a Party"
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
                          onClick={BillingTransaction}
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
                        <tr className="text-center">
                          <th rowSpan="2" style={{ width: '15%', background: '#BADDDA' }}>Party</th>
                          <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>Packets</th>
                          <th rowSpan="2" style={{ width: '10%', background: '#BADDDA' }}>IR/ER No.</th>
                          <th rowSpan="2" style={{ width: '10%', background: '#BADDDA' }}>Mawb</th>
                          <th rowSpan="2" style={{ width: '10%', background: '#BADDDA' }}>Hawb</th>
                          <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>In Date</th>
                          <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>Out Date</th>
                          <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>CHA</th>
                          <th rowSpan="2" style={{ width: '25%', background: '#BADDDA' }}>Doc Charges</th>
                          <th colSpan="2" style={{ width: '25%', background: '#BADDDA' }}>AS Per Value</th>
                          <th colSpan="2" style={{ width: '25%', background: '#BADDDA' }}>AS Per Weight</th>
                          <th colSpan="2" style={{ width: '25%', background: '#BADDDA' }}>Demurages Charges</th>
                          <th rowSpan="2" style={{ width: '25%', background: '#BADDDA' }}>Total Amount</th>
                        </tr>
                        <tr>
                          <th style={{ width: '6%', background: '#BADDDA' }}>Value(INR)</th>
                          <th style={{ width: '6%', background: '#BADDDA' }}>Charges(INR)</th>
                          <th style={{ width: '6%', background: '#BADDDA' }}>Weight(CTS)</th>
                          <th style={{ width: '6%', background: '#BADDDA' }}>Charges(INR)</th>
                          <th style={{ width: '6%', background: '#BADDDA' }}>Days</th>
                          <th style={{ width: '6%', background: '#BADDDA' }}>charges(INR)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems5.map((import2, index) =>
                          <tr className="text-center dynamic-row-width">
                            <td>{import2.partyId}</td>
                            <td>{import2.noPackates}</td>
                            <td>{import2.sirNo}</td>
                            <td>{import2.mawb}</td>
                            <td>{import2.hawb}</td>
                            <td>{formatDateTimeNEW(import2.inDate)}</td>
                            <td>{formatDateTimeNEW(import2.outDate)}</td>
                            <td>{import2.chaName}</td>
                            <td>{import2.documentCharges}</td>
                            <td>{import2.price}</td>
                            <td>{import2.rateByPrice}</td>
                            <td>{import2.weight}</td>
                            <td>{import2.rateByWeight}</td>
                            <td>{import2.stockDays}</td>
                            <td>{import2.demurageCharges}</td>
                            <td>{import2.totalInvoiceAmount}</td>
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
                            <Label className="forlabel" for="branchId">Total Bill</Label>
                            <Input type="text" name="passengerName"
                              className="form-control"
                              value={totalAllRate2}
                              readOnly
                              id='service'
                            />
                          </FormGroup>
                        </Col>
                        <Col md={2}>

                          <FormGroup>
                            <Label className="forlabel" for="branchId">Page Bill</Label>
                            <Input type="text" name="passengerName"
                              className="form-control"
                              value={(totalRate2)}
                              readOnly
                              id='service'
                            />
                          </FormGroup>
                        </Col>
                      </Row>


                      <Row>



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

              {/* Receipts */}
              <div className="tab-pane fade" id="Receipts" role="tabpanel" aria-labelledby="Receipts-tab">
                <Card>
                  <CardBody>
                    <Row>
                      <Col md={5}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Select Party</Label>
                          <Select
                            options={partiesAll}
                            value={selectedPartyReceipt}
                            onChange={handlePartyChangeReceipt}
                            className={errors.selectedPartyReceipt ? 'error-border' : ''}
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
                          disabled={!selectedPartyReceipt}
                          onClick={(e) => SearchReceiptsHistry(selectedPartyReceipt ? selectedPartyReceipt.value : '')}
                        >
                          <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                          Search
                        </Button>
                      </Col>
                    </Row>

                    {/*  Invoice History  */}

                    {ReceiptsDataHistory.length > 0 ? (
                      <div>
                        <h4 className='text-center'>{partyName}</h4>

                        <Table striped responsive bordered>
                          <thead>
                            <tr className='text-center'>
                              <th rowSpan="2" style={{ background: '#BADDDA' }}>Sr No</th>
                              <th rowSpan="2" style={{ background: '#BADDDA' }}>Receipt No</th>
                              <th rowSpan="2" style={{ background: '#BADDDA' }}>Date & Time</th>
                              <th rowSpan="2" style={{ background: '#BADDDA' }}>Invoice Amount</th>
                              <th rowSpan="2" style={{ background: '#BADDDA' }}>Tds Amount</th>
                              <th rowSpan="2" style={{ background: '#BADDDA' }}>Receipt Amount</th>
                              <th colSpan="2" style={{ background: '#BADDDA' }}>Download</th>
                            </tr>
                            <tr className='text-center'>
                              <td style={{ background: '#BADDDA' }}><b> Print</b></td>
                              <td style={{ background: '#BADDDA' }}><b>Download</b></td>
                            </tr>
                          </thead>
                          <tbody>
                            {ReceiptsDataHistory.map((invoice, index) =>
                              <tr className="text-center dynamic-row-width">
                                <td>{index + 1}</td>
                                <td>{invoice.transId}</td>
                                <td>{formatDateTimeMonth(invoice.transDate)}</td>
                                <td>{invoice.invoiceAmt}</td>
                                <td>{invoice.tdsAmt}</td>
                                <td>{invoice.receiptAmt}</td>
                                <td>
                                  <Button
                                    variant="outline-primary"
                                    onClick={(e) => downLoadReceipt(invoice.partyId, invoice.transId, "PRINT")}
                                  >
                                    <FontAwesomeIcon icon={faDownload} />
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    variant="outline-success"
                                    onClick={(e) => downLoadReceipt(invoice.partyId, invoice.transId, "PDF")}
                                  >
                                    <FontAwesomeIcon icon={faDownload} />
                                  </Button>
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
