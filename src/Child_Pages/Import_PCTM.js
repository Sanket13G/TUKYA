import { Link, redirect } from "react-router-dom";
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import DatePicker from "react-datepicker";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Select from "react-select"; // Import Select component for dropdown
import { CardBody, Container, Table, FormGroup, Label } from "reactstrap";
import PDFReport from "./PDFReport";
import { saveAs } from "file-saver"; // Import file-saver for triggering the download
import * as XLSX from "xlsx"; // Import XLSX library for creating XLS files
import "@react-pdf-viewer/core/lib/styles/index.css";
import ipaddress from "../Components/IpAddress";
import { toast } from "react-toastify";
import dgdcimage from "../Images/DGDC.png";
import moment from 'moment';


import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  BlobProvider,
  pdf,
} from "@react-pdf/renderer";
import {
  faArrowsToEye,
  faBolt,
  faFileAlt,
  faFileExcel,
  faFilePdf,
  faPlane,
  faPrint,
  faSave,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import ReactLoading from 'react-loading';


export default function Import_PCTM() {


  const styles2 = {
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
  const [pctmNumbers, setPctmNumbers] = useState([]);

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const reactPageName = "Import PCTM Data Party";
  const [airlines, setAirlines] = useState([]);
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [airlineNames, setAirlineNames] = useState([]);
  const [selectedAllAirline, setSelectedAllAirline] = useState("");
  const [selectedAirlinePCTM, setSelectedAirlinePCTM] = useState("");
  const [importPCTMData, setImportedPCTMData] = useState([]);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [getOneParty, setOneParty] = useState([]);
  const [loading, setLoading] = useState(false);




  const [importData, setImportData] = useState([]);
  const [importAllData, setImportAllData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showImportDataTable, setShowImportDataTable] = useState(false);
  const [pdfReportData, setPDFReportData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [ConsoleNameById, setConsoleNameById] = useState();
  const [showPDFReport, setShowPDFReport] = useState(false);
  const [consoleName, setconsoleName] = useState('');
  const [showImportPDFReport, setShowImportPDFReport] = useState(false); // State for PDF report visibility

  const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
  const formattedEndDate = moment(endDate).format('YYYY-MM-DD');
  const [errors, setErrors] = useState({});

  const makeFieldEmpty = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    setAirlines([]);
    setAirlineNames([]);
    setImportedPCTMData([]);
    setImportData([]);
    setImportAllData([]);
    setPDFReportData([]);
    setSelectedAllAirline("");
    setSelectedAirlinePCTM("");
    setSelectedAirline(null);
    // setExportTpData([]);
    // setExportData([]);
    // setSummaryDataForTPData([]);
  };

  const {
    jwtToken,
    user_Id,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    login,
    logout,
  } = useContext(AuthContext);

  const importFields = [
    "MAWB",
    "HAWB",
    "SIR_No",
    "Imp_Trans_Date",
    "IGM_No",
    "IGM_Date",
    "PCTM_No",
    "TP_No",
    "TP_Date",
    "Airline_Name",
    "Flight_No",
    "Flight_Date",
    "Country_Origin",
    "Port_Origin",
    "Importer_Id",
    "IEC",
    "SEZ_Entity_Id",
    "Console",
    "Package_Content_Type",
    "Parcel_Type",
    "UOM_Packages",
    "Nop",
    "Import_Remarks",
    "Description_Of_Goods",
    "CHA_CDE",
    "Assessable_Value",
    "Gross_Weight",
    "BE_Request_ID",
    "BE_No",
    "BE_Date",
    "Import_Address",
    "Status",
    "Sir_Date",
    "Created_By",
    "Created_Date",
    "Edited_By",
    "Edited_Date",
    "Approved_By",
    "Approved_Date",
  ];

  // const formatPctmNo = (pctmNumbers) => {
  //   // Remove leading zeros using a regular expression
  //   return pctmNumbers.replace(/^0+/, "");
  // };



  const formatPctmNo = (pctmNumbers) => {
    if (pctmNumbers === null || pctmNumbers === undefined) {
      return pctmNumbers; // Return null or undefined as it is
    }
    // Remove leading zeros using a regular expression
    return pctmNumbers.replace(/^0+/, "");
  };

  const CustomHeader = () => {
    return (
      <View style={styles.header}>
        <Image src={dgdcimage} style={styles.image} />
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

  const commonTextStyle = {
    fontSize: 9,
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      height: "100%",
      paddingTop: 9,
      paddingLeft: 27,
      paddingRight: 27,
      paddingTop: 27,
    },
    header: {
      marginBottom: 1,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: 5,
    },
    tableHeaderRow: {
      flexDirection: "row",
    },
    tableHeaderCell: {
      border: "0.5px solid #000",
      padding: 1,
      backgroundColor: "#f2f2f2",
      textAlign: "center",
      fontSize: 9,
    },
    tableRow: {
      flexDirection: "row",
      fontWeight: "bold",
    },
    tableCell: {
      border: "0.4px solid #000",
      padding: 1,
      textAlign: "center",
      fontSize: 7,
    },
    tableCellHeader: {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 9,
    },
    image: {
      width: 306,
      height: 72,
      // marginLeft: 18,
      justifyContent: "center",
    },

    text: {
      marginLeft: 18,
      ...commonTextStyle,
    },
    hr: {
      width: "100%",
      borderBottom: 1,
      marginTop: 5,
    },
    leftColumn: {
      width: "100%",
      paddingTop: 5,
    },
    underline: {
      textDecoration: "underline",
    },
  });

  const hrStyle = {
    borderTop: "5px solid black", // Adjust the thickness and color as needed
  };

  // Create a form state object with initial values for each field
  const initialFormState = {};
  importFields.forEach((field) => {
    initialFormState[field] = "";
  });

  const [formData, setFormData] = useState(initialFormState);
  // Function to handle the "SEARCH" button click

  const handleSearch = async () => {
    setImportData([]);
    setShowTable(false);
    setselectedAirLineNew(null);
    setConsoleNameById(null);

    setLoading(true);
    try {
      const partyResponse = await Rate_Chart_Service.getDistinctConsolesBySirDate(companyid, branchId, formattedStartDate, formattedEndDate);
      const partyOptions = partyResponse.data.map(externalUser => ({
        value: externalUser[0],
        label: externalUser[1]
      }));

      setConsoles(partyOptions);
    }
    catch (error) {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    }
    finally {
      setLoading(false);
    }
  };

  const getAirlinesByConsoles = async (ConsoleNameById) => {
    const partyResponse = await Rate_Chart_Service.getdistinctAirLinesByConsoles(companyid, branchId, formattedStartDate, formattedEndDate, ConsoleNameById);
    const partyOptions = partyResponse.data.map(externalUser => ({
      value: externalUser[0],
      label: externalUser[1]
    }));

    setAirLines(partyOptions);
  };


  const [consoles, setConsoles] = useState([]);
  const [airLines, setAirLines] = useState([]);
  const [PctmNumbersNew, setPctmNumbersNew] = useState([]);
  const [selectedPCTMNew, setselectedPCTMNew] = useState(null);
  const [selectedAirLineNew, setselectedAirLineNew] = useState(null);


  const handleConsoleChange = selectedOption => {
    setImportData([]);
    setShowTable(false);
    setselectedAirLineNew(null);
    setErrors(prevErrors => selectedOption ? { ...prevErrors, ConsoleNameById: '' } : { ...prevErrors, ConsoleNameById: 'Console is required' });
    setConsoleNameById(selectedOption);
    const console = selectedOption ? selectedOption.value : '';
    getAirlinesByConsoles(console);
  };

  const handleAirlineChangeNew = selectedOption => {
    setImportData([]);
    setShowTable(false);
    setErrors(prevErrors => selectedOption ? { ...prevErrors, selectedAirLine: '' } : { ...prevErrors, selectedAirLine: 'Airline is required' });
    setselectedAirLineNew(selectedOption);
  };



  const handleShow = () => {

    const newErrors = {};

    if (!ConsoleNameById) {
      newErrors['ConsoleNameById'] = 'Please Select Console';
    }

    if (!selectedAirLineNew) {
      newErrors['selectedAirLine'] = 'Please Enter Airline';
    }


    setErrors(newErrors);
    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);
    try {
      Rate_Chart_Service.getDataforPctm(companyid, branchId, formattedStartDate, formattedEndDate, selectedAirLineNew.value, ConsoleNameById.value)

        .then((response) => {
          const importData = response.data; // Data for the selected airline
          setImportData(importData);
          setShowTable(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

    }
    catch (error) {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    }
    finally {
      setLoading(false);
    }
  };



  const generateAllPDFReport = async () => {
    if (selectedItems.length === 0) {
      // Show an error message if no rows are selected
      toast.error("No rows selected. Please select rows to generate PCTM.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return; // Don't proceed with the API call
    }
    else {
      setLoading(true);
    }
    try {

      const response = await Rate_Chart_Service.updatePctmNumber(companyid, branchId, selectedItems);
      // const reportData = response.data; // Data for the selected airline
      setShowPDFReport(true);
      setPDFReportData(pdfReportData); // Update with the correct data
      setImportAllData(importAllData); // Update with the correct data
      setTotalEntries(importData.length);
      handleShow();

      // Display a toast notification when pctmNo is updated successfully
      toast.success("pctmNo generated successfully", {
        position: "top-center",
        autoClose: 3000, // Close the notification after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Refresh the page
      // window.location.reload();
    } catch (error) {
      console.error("Error fetching data:", error);

      // Display an error toast notification if there's an error
      toast.error("Error fetching data", {
        position: "bottom-right",
        autoClose: 5000, // Close the notification after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };


  // /PRINT PAGE

  const handleAllSearch = async () => {

    // Make an API request here to fetch the list of airline names based on the provided criteria
    setImportedPCTMData([]);
    setConsoles([]);
    setConsoleNameById(null);
    setselectedPCTMNew(null);
    setAirLines([]);
    setselectedAirLineNew(null);
    setPctmNumbers([]);
    setLoading(true);
    try {
      const partyResponse = await Rate_Chart_Service.getDistinctConsolesBySirDatePCTMgenerated(companyid, branchId, formattedStartDate, formattedEndDate);
      const partyOptions = partyResponse.data.map(externalUser => ({
        value: externalUser[0],
        label: externalUser[1]
      }));

      setConsoles(partyOptions);
    }
    catch (error) {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    }
    finally {
      setLoading(false);
    };
  };


  const handleConsoleChangePCTMgenerated = selectedOption => {
    setImportedPCTMData([]);
    setPctmNumbers([]);
    setselectedPCTMNew(null);
    setselectedAirLineNew(null);
    setAirLines([]);
    setErrors(prevErrors => selectedOption ? { ...prevErrors, ConsoleNameById: '' } : { ...prevErrors, ConsoleNameById: 'Console is required' });
    setConsoleNameById(selectedOption);
    const console = selectedOption ? selectedOption.value : '';
    getAirlinesByConsolesPCTMgenerated(console);
  };


  const getAirlinesByConsolesPCTMgenerated = async (ConsoleNameById) => {
    setImportedPCTMData([]);
    setPctmNumbersNew([]);
    setImportedPCTMData([]);
    setAirLines([]);
    setselectedAirLineNew(null);
    setPctmNumbersNew(null);
    const partyResponse = await Rate_Chart_Service.getdistinctAirLinesByConsolesPCTMgenerated(companyid, branchId, formattedStartDate, formattedEndDate, ConsoleNameById);
    const partyOptions = partyResponse.data.map(externalUser => ({
      value: externalUser[0],
      label: externalUser[1]
    }));
    setAirLines(partyOptions);
  };


  const handleAirlineChangeNewPCTMgenerated = selectedOption => {
    setImportedPCTMData([]);
    setPctmNumbersNew([]);
    setImportedPCTMData([]);
    setErrors(prevErrors => selectedOption ? { ...prevErrors, selectedAirLine: '' } : { ...prevErrors, selectedAirLine: 'Airline is required' });
    setselectedAirLineNew(selectedOption);
    const airline = selectedOption ? selectedOption.value : '';
    getpctmnumbers(airline);
  };


  const getpctmnumbers = async (airline) => {
    setImportedPCTMData([]);
    setPctmNumbersNew([]);

    const partyResponse = await Rate_Chart_Service.getPctmNumbers(companyid, branchId, formattedStartDate, formattedEndDate, airline, ConsoleNameById.value);
    const partyOptions = partyResponse.data.map(externalUser => ({
      value: externalUser,
      label: externalUser
    }));
    setPctmNumbersNew(partyOptions);
  };


  const handlePCTMChangeNewPCTM = selectedOption => {
    setImportedPCTMData([]);
    setErrors(prevErrors => selectedOption ? { ...prevErrors, selectedPCTMNew: '' } : { ...prevErrors, selectedPCTMNew: 'Select pctm Number' });
    setselectedPCTMNew(selectedOption);
  };


  const [airlineStaff,setAirlineStaff] = useState('');

  const handleShowPctmData = async () => {
    const newErrors = {};

    if (!ConsoleNameById) {
      newErrors['ConsoleNameById'] = 'Please Select Console';
    }

    if (!selectedAirLineNew) {
      newErrors['selectedAirLine'] = 'Please Enter Airline';
    }

    if (!selectedPCTMNew) {
      newErrors['selectedPCTMNew'] = 'Please Select PCTM No';
    }


    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }


    setImportedPCTMData([]);

    setLoading(true);
    try {
      const response = await Rate_Chart_Service.getDataforPctmPrint(companyid, branchId, formattedStartDate, formattedEndDate, selectedAirLineNew.value, ConsoleNameById.value, selectedPCTMNew.value)
      const importPCTMData = response.data;
      setImportedPCTMData(importPCTMData);
      setTotalEntries(importPCTMData.length);

    }
    catch (error) {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    }
    finally {
      setLoading(false);
    };
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


  const [getAirlineNameByAirCode, setAirlineNameByAirCode] = useState({});

  // const fetchAirlinesNames = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://${ipaddress}Airline/list/${companyid}/${branchId}`
  //     );
  //     const data = await response.json();
  //     const namesAirMap = {};
  //     data.forEach((air) => {
  //       namesAirMap[air.airlineCode] = air.airlineName;
  //     });
  //     // setNamesMap(namesAirMap);
  //     // setAirlineNameByAirCode(namesAirMap);
  //     console.log("Airlines  Print", namesAirMap);
  //     // setAirlineNanmes(data);
  //   } catch (error) {
  //     console.error("Error fetching party names:", error);
  //   }
  // };

  // useEffect(() => {
  //   // fetchAirlinesNames();
  //   findConsoles();
  // }, []);

  const findExternalPartyByType = async (compid, branchId, Type) => {
    const partyResponse = await Rate_Chart_Service.getAllExternalPartiesByType(compid, branchId, Type);
    const partyOptions = partyResponse.data.map(externalUser => ({
      value: externalUser[0],
      label: externalUser[1]
    }));
    return partyOptions;

  };


  const calculateDistinctMAWB = (importPCTMData) => {
    const distinctMAWBCounts = {};

    importPCTMData.forEach((item) => {
      const mawb = item.mawb;
      if (mawb) {
        if (distinctMAWBCounts[mawb]) {
          distinctMAWBCounts[mawb] += 1;
        } else {
          distinctMAWBCounts[mawb] = 1;
        }
      }
    });

    return distinctMAWBCounts;
  };


  const calculateDistinctIGM = (importPCTMData) => {
    const distinctIGMCounts = {};

    importPCTMData.forEach((item) => {
      const igmNo = item.igmNo;
      if (igmNo) {
        if (distinctIGMCounts[igmNo]) {
          distinctIGMCounts[igmNo] += 1;
        } else {
          distinctIGMCounts[igmNo] = 1;
        }
      }
    });

    return distinctIGMCounts;
  };




  const handlePrint = async (type) => {
    try {
      console.log("formattedStartDate ", formattedStartDate);
      const response = await axios.post(`http://${ipaddress}import/printOfImportPctm?companyId=${companyid}&branchId=${branchId}&pctmNo=${selectedPCTMNew.value}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&console=${ConsoleNameById.value}&airlineCode=${selectedAirLineNew.value}&airlineStaff=${airlineStaff}`);
      if (type === 'PDF') {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'Import_Pctm.pdf'; // Set the filename for the downloaded PDF
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
        console.log("type type ", type);
        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        // Create an object URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Open a new window and set the PDF content as the source
        window.open(blobUrl, '_blank');
      } else {
        throw new Error("Failed to generate PDF");
      }
    } catch (error) { }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);


  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };



  const totalPackages = importPCTMData.reduce(
    (total, item) => total + item.nop,
    0
  );



  const totaleNoOfPackages = importData.reduce(
    (total, item) => total + item.nop,
    0
  );



  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    setSelectAll(selectedItems.length === importData.length);
  }, [selectedItems, importData]);

  const handleSelectAllToggle = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(importData);
    }
    setSelectAll(!selectAll);
  };

  const handleRowCheckboxChange = (index) => {
    const selectedItem = importData[index];
    if (selectedItem) {
      const selectedIndex = selectedItems.findIndex((item) => item.sirNo === selectedItem.sirNo);

      if (selectedIndex !== -1) {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems.splice(selectedIndex, 1);
        setSelectedItems(updatedSelectedItems);
      } else {
        setSelectedItems([...selectedItems, selectedItem]);
      }
    }
  };


  // Example function to generate a pctmNo based on row data (customize this according to your needs)
  const generatePctmNoBasedOnRowData = (row) => {
    // Replace this with your logic to generate a unique pctmNo for the row
    return `${row.sirNo}_PCTM`;
  };



  //Import PCTM

  const formatDateTime2 = (value) => {
    if (!value) {
      return "";
    }
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year} `;
  };
  const getExcel = async () => {
   
    try {
     
      const filename = `ImportPCTM.xlsx`;
  
      const headers = {
        headers: {
          Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        responseType: 'blob',
      };
  
      const response = await axios.post(`http://${ipaddress}import/pctmexcel?companyId=${companyid}&branchId=${branchId}&pctmNo=${selectedPCTMNew.value}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&console=${ConsoleNameById.value}&airlineCode=${selectedAirLineNew.value}&airlineStaff=${airlineStaff}`, null, headers);
  
      const url = window.URL.createObjectURL(new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading XLSX: ", error);
      toast.error("Something went wrong", {
        autoClose: 700,
      });
    }
  };




  const handleAirlineChange = (e) => {
    setSelectedAirlinePCTM('');
    setPctmNumbers([]);
    setSelectedAllAirline(e.value);
    // console.log("selected Airline : "+ e.value);
    try {
      axios
        .get(
          `http://${ipaddress}import/getPctmNo?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&flightNo=${e.value}`
        )
        .then((response) => {

          setPctmNumbers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching PCTM numbers:", error);
        });
    } catch (error) {
      console.error("Error occurred during API request:", error);
    }
  };












  return (

    <>


      {loading && (
        <div style={styles2.overlay}>
          <ReactLoading type="spin" color="#0000FF" height={300} width={80} />
        </div>
      )}






      <div className="Container">
        <h5
          className="pageHead"
          style={{
            fontFamily: "Your-Heading-Font",
            paddingLeft: "2%",
            paddingRight: "-0px",
          }}
        >
          {" "}
          <FontAwesomeIcon
            icon={faPlane}
            style={{
              marginRight: "8px",
              color: "black", // Set the color to golden
            }}
          />
          Import PCTM
        </h5>
        <Card>
          <Container>
            <div className="Container" style={{ marginTop: 20 }}>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item tabspace" role="presentation">
                  <button
                    style={{ color: "gray" }}
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                    onClick={(e) => makeFieldEmpty()}
                  >
                    <h6>Generate</h6>
                  </button>
                </li>

                <li className="nav-item tabspace" role="presentation">
                  <button
                    style={{ color: "gray" }}
                    className="nav-link"
                    id="contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#contact"
                    type="button"
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                    onClick={(e) => makeFieldEmpty()}
                  >
                    <h6>Print</h6>
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">

                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <hr className="mt-3" />

                  <h5
                    className="pageHead"
                    style={{
                      fontFamily: "Your-Heading-Font",
                      paddingLeft: "3%",
                      marginTop: '10px'
                    }}
                  >
                    {" "}
                    <FontAwesomeIcon
                      icon={faBolt}
                      style={{
                        marginRight: "8px",
                        color: "black", // Set the color to golden
                      }}
                    />{" "}
                    Generate{" "}
                  </h5>
                  <Container>
                    <Form style={{ marginBottom: 20 }}>
                      <Row>
                        <Col md={2}>
                          <Form.Group>
                            <Form.Label className="forlabel">
                              SIR Date From
                            </Form.Label>
                            <DatePicker
                              selected={startDate}
                              wrapperClassName="custom-react-datepicker-wrapper"
                              onChange={(date) => {
                                if (date) {
                                  setStartDate(date);
                                }
                              }}
                              value={startDate}
                              dateFormat="dd/MM/yyyy"
                              className="form-control"
                              customInput={<input style={{ width: "100%" }} />}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={2}>
                          <Form.Group>
                            <Form.Label className="forlabel">
                              SIR Date To
                            </Form.Label>
                            <DatePicker
                              selected={endDate}
                              wrapperClassName="custom-react-datepicker-wrapper"
                              onChange={(date) => {
                                if (date) {
                                  setEndDate(date);
                                }
                              }}
                              value={endDate}
                              dateFormat="dd/MM/yyyy"
                              className="form-control"
                              customInput={<input style={{ width: "100%" }} />}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={2}>
                          <Button
                            type="button"
                            style={{
                              marginTop: 32,
                            }}
                            // className="allbutton"
                            variant="outline-primary"
                            onClick={handleSearch}
                          >
                            <FontAwesomeIcon
                              icon={faSearch}
                              style={{ marginRight: "5px" }}
                            />
                            Search
                          </Button>
                        </Col>

                        <Col md={2} >
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Select Console</Label>
                            <Select
                              options={consoles}
                              value={ConsoleNameById}
                              onChange={handleConsoleChange}
                              placeholder="Select Console"
                              isClearable
                              className={`${errors.ConsoleNameById ? 'error-border' : ''}`}
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
                            {errors.ConsoleNameById && (
                              <div className="error-message">
                                {errors.ConsoleNameById}
                              </div>
                            )}

                          </FormGroup>
                        </Col>


                        <Col md={2}>
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Select Air Lines</Label>
                            <Select
                              options={airLines}
                              value={selectedAirLineNew}
                              onChange={handleAirlineChangeNew}
                              placeholder="Select Airline"
                              isClearable
                              className={errors.selectedAirLine ? 'error-border' : ''}
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
                            {errors.selectedAirLine && (
                              <div className="error-message">
                                {errors.selectedAirLine}
                              </div>
                            )}

                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <Button
                            type="button"
                            style={{
                              marginTop: 32,
                              marginLeft: 5,
                            }}
                            // className="allbutton"
                            variant="outline-primary"
                            onClick={handleShow}
                          >
                            <FontAwesomeIcon
                              icon={faArrowsToEye}
                              style={{ marginRight: "5px" }}
                            />
                            Show
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Container>
                  {/* </Card> */}
                </div>

                {importData.length > 0 && (
                  <div>
                    <hr />
                    <h5
                      className="pageHead"
                      style={{
                        fontFamily: "Your-Heading-Font",
                        paddingLeft: "4%",
                        marginTop: "30px",
                      }}
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faFileAlt}
                        style={{
                          marginRight: "8px",
                          color: "black", // Set the color to golden
                        }}
                      />{" "}
                      Imported Data
                    </h5>

                    <div className="table-responsive">
                      <Table className="table table-bordered custom-table">
                        <thead>
                          <tr className="text-center">
                            {" "}
                            <th
                              style={{ backgroundColor: "#BADDDA" }}
                              scope="col"
                            >

                              <input
                                className="form-check-input radios"
                                type="checkbox"
                                style={{ width: '1.2vw', height: '1.2vw' }}
                                checked={selectAll}
                                onChange={() => handleSelectAllToggle()}
                              />
                            </th>
                            <th style={{ backgroundColor: "#BADDDA" }}>Sr.No</th>
                            <th style={{ backgroundColor: "#BADDDA" }}>
                              Airline Name
                            </th>
                            <th style={{ backgroundColor: "#BADDDA" }}>MAWB</th>
                            <th style={{ backgroundColor: "#BADDDA" }}>Sir No</th>
                            <th style={{ backgroundColor: "#BADDDA" }}>
                              Sir Date
                            </th>
                            <th style={{ backgroundColor: "#BADDDA" }}>
                              Parcle Type
                            </th>
                            <th style={{ backgroundColor: "#BADDDA" }}>HAWB</th>
                            <th style={{ backgroundColor: "#BADDDA" }}>NOP</th>
                            {/* Add more column headers as needed */}
                          </tr>
                        </thead>
                        <tbody>
                          {importData.map((item, index) => (
                            <tr key={index} className="text-center">
                              <td>
                                {/* <input
                                type="checkbox"
                                checked={selectedRows.includes(item)}
                                onChange={(e) => handleRowSelection(e, index)}
                              /> */}

                                <input
                                  className="form-check-input radios"
                                  type="checkbox"
                                  style={{ width: '1.2vw', height: '1.2vw' }}
                                  name="checkimport"
                                  checked={selectedItems.some((item) => item.sirNo === importData[index].sirNo)}
                                  onChange={() => handleRowCheckboxChange(index)}
                                />
                              </td>
                              <td>{index + 1}</td>
                              <td>{item.airlineName}</td>
                              <td>{item.mawb}</td>
                              <td>{item.sirNo}</td>
                              <td>{formatDate(item.sirDate)}</td>
                              <td>{item.parcelType}</td>
                              <td>{item.hawb.startsWith('000') ? '' : item.hawb}</td>
                              <td>{item.nop}</td>
                              {/* Add more table cells as needed */}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>

                    <CardBody>
                      <p>Total Packages Received - {totaleNoOfPackages}</p>
                      <Button
                        variant="outline-primary"
                        style={{ float: "right" }}
                        onClick={generateAllPDFReport}
                      >
                        {" "}
                        <FontAwesomeIcon
                          icon={faBolt}
                          style={{ marginRight: "5px" }}
                        />
                        Generate PCTM
                      </Button>
                    </CardBody>
                  </div>
                )}

                <div
                  className="tab-pane fade"
                  id="contact"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                >
                  <hr className="mt-3" />
                  <h5
                    className="pageHead"
                    style={{
                      fontFamily: "Your-Heading-Font",
                      paddingLeft: "3%",
                      paddingRight: "-50px",
                    }}
                  >
                    {" "}
                    <FontAwesomeIcon
                      icon={faPrint}
                      style={{
                        marginRight: "8px",
                        color: "black",
                      }}
                    />{" "}
                    Print
                  </h5>



                  <Container>
                    <Form style={{ marginBottom: 20 }}>
                      <Row>
                        <Col md={2}>
                          <Form.Group>
                            <Form.Label className="forlabel">
                              PCTM Date From
                            </Form.Label>
                            <DatePicker
                              selected={startDate}
                              wrapperClassName="custom-react-datepicker-wrapper"
                              onChange={(date) => {
                                if (date) {
                                  setStartDate(date);
                                }
                              }}
                              value={startDate}
                              dateFormat="dd/MM/yyyy"
                              className="form-control"
                              customInput={<input style={{ width: "100%" }} />}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={2}>
                          <Form.Group>
                            <Form.Label className="forlabel">
                              PCTM Date To
                            </Form.Label>
                            <DatePicker
                              selected={endDate}
                              wrapperClassName="custom-react-datepicker-wrapper"
                              onChange={(date) => {
                                if (date) {
                                  setEndDate(date);
                                }
                              }}
                              value={endDate}
                              dateFormat="dd/MM/yyyy"
                              className="form-control"
                              customInput={<input style={{ width: "100%" }} />}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={1}>
                          <Button
                            type="button"
                            style={{
                              marginTop: 32,
                            }}
                            // className="allbutton"
                            variant="outline-primary"
                            onClick={handleAllSearch}
                          >
                            <FontAwesomeIcon
                              icon={faSearch}
                            // style={{ marginRight: "5px" }}
                            />
                            {/* Search */}
                          </Button>
                        </Col>

                        <Col md={2} >
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Select Console</Label>
                            <Select
                              options={consoles}
                              value={ConsoleNameById}
                              onChange={handleConsoleChangePCTMgenerated}
                              placeholder="Select Console"
                              isClearable
                              className={`${errors.ConsoleNameById ? 'error-border' : ''}`}
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
                            {errors.ConsoleNameById && (
                              <div className="error-message">
                                {errors.ConsoleNameById}
                              </div>
                            )}

                          </FormGroup>
                        </Col>


                        <Col md={2}>
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Select Air Lines</Label>
                            <Select
                              options={airLines}
                              value={selectedAirLineNew}
                              onChange={handleAirlineChangeNewPCTMgenerated}
                              placeholder="Select Airline"
                              isClearable
                              className={errors.selectedAirLine ? 'error-border' : ''}
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
                            {errors.selectedAirLine && (
                              <div className="error-message">
                                {errors.selectedAirLine}
                              </div>
                            )}

                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <FormGroup>
                            <Label className="forlabel" for="branchId">select pctm no</Label>
                            <Select
                              options={PctmNumbersNew}
                              value={selectedPCTMNew}
                              onChange={handlePCTMChangeNewPCTM}
                              placeholder="Select Pctm Number"
                              isClearable
                              className={errors.selectedPCTMNew ? 'error-border' : ''}
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
                            {errors.selectedPCTMNew && (
                              <div className="error-message">
                                {errors.selectedPCTMNew}
                              </div>
                            )}

                          </FormGroup>
                        </Col>
                       
                      </Row>
                      <Row>
                        <Col md={5}></Col>
                        <Col md={3}>
                          <FormGroup>
                            <Form.Label className="forlabel" htmlFor="search">
                              Airline Staff
                            </Form.Label>
                            <input
                              type="text"
                              id="search"
                              className="form-control"
                              name="serNo"
                              value={airlineStaff}
                              onChange={(e)=>setAirlineStaff(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={1}>
                          <Form.Label className="forlabel">
                            PCTM
                          </Form.Label>
                          <Button
                            type="button"
                            // className="allbutton"
                            variant="outline-primary"
                            onClick={handleShowPctmData}
                          >
                            <FontAwesomeIcon
                              icon={faSearch}
                            // style={{ marginRight: "5px" }}
                            />
                            {/* PCTM */}
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Container>
                  {/* </Card> */}

                  {/* <Card style={{ marginTop: 18, marginBottom: 18 }}> */}
                  <Container>
                    {importPCTMData.length > 0 && (
                      <div>
                        {importPCTMData.length > 0 && (
                          <div>
                            {/* ... Existing JSX ... */}
                            <div>
                              <Button
                                type="button"
                                color="danger"
                                outline
                                style={{
                                  float: "right",
                                  marginLeft: '5x',
                                  textDecoration: "none",
                                }}
                                onClick={(e) => handlePrint("PRINT")}
                              >
                                <FontAwesomeIcon
                                  icon={faPrint}
                                  style={{ marginRight: "5px" }}
                                />
                                Print
                              </Button>
                              <Button
                                type="button"
                                className="allbutton"
                                variant="outline-success"
                                onClick={() => getExcel()}
                                // style={{ float: "right" }}
                                style={{ marginRight: "5px", float: "right" }}
                              >
                                <FontAwesomeIcon
                                  icon={faFileExcel}
                                  style={{ marginRight: "5px" }}
                                />
                                XLS
                              </Button>

                              <Button
                                outline
                                id="pdfButton"
                                color="danger"
                                style={{ marginRight: "5px", float: "right" }}
                                onClick={(e) => handlePrint("PDF")}
                              >
                                <FontAwesomeIcon
                                  icon={faFilePdf}
                                  style={{ marginLeft: "5px" }}
                                />
                                PDF
                              </Button>
                            </div>
                          </div>
                        )}

                        <h5
                          style={{
                            marginTop: 9,
                            marginRight: 9,
                            marginBottom: 27,
                          }}
                        >
                          Imported PCTM Data
                        </h5>

                        <div className="table-responsive">
                          <Table className="table table-striped table-hover">
                            <thead>
                              <tr>
                                <th style={{ backgroundColor: "#BADDDA" }}>
                                  Sr.No
                                </th>
                                <th style={{ backgroundColor: "#BADDDA" }}>
                                  M.A.W.B. No
                                </th>
                                <th style={{ backgroundColor: "#BADDDA" }}>
                                  Sir Date
                                </th>
                                <th style={{ backgroundColor: "#BADDDA" }}>
                                  Sir No
                                </th>


                                <th style={{ backgroundColor: "#BADDDA" }}>
                                  H.A.W.B. No
                                </th>

                                <th style={{ backgroundColor: "#BADDDA" }}>
                                  No Of Pkgs
                                </th>
                                <th style={{ backgroundColor: "#BADDDA" }}>
                                  Importer Name
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {importPCTMData.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.mawb}</td>
                                  <td>{formatDate(item.sirDate)}</td>
                                  <td>{item.sirNo}</td>

                                  <td>{item.hawb.startsWith('000') ? '' : item.hawb}</td>
                                  <td>{item.nop}</td>
                                  <td>{item.importerId}</td>
                                  {/* Add more table cells as needed */}
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                        <p>Total Packages: {totalPackages}</p>

                        {showImportPDFReport && (
                          <PDFReport
                            data={importPCTMData}
                            startDate={startDate}
                            endDate={endDate}
                            selectedAirline={selectedAllAirline}
                          //selectedAirlineFlightdate={selectedAirlineFlightdate}
                          />
                        )}
                      </div>
                    )}
                  </Container>
                  {/* </Card> */}
                </div>
              </div>
            </div>
          </Container>
        </Card>
      </div>

    </>
  );
}