
import { Link, redirect } from "react-router-dom";
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import dgdcImage from "../Images/report.jpeg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Select from "react-select"; // Import Select component for dropdown
import {
  Button, ButtonToggle, CardBody, Container, Label,
  Table, Input
} from "reactstrap";
import PDFReport from "./PDFReport";
import { saveAs } from "file-saver"; // Import file-saver for triggering the download
import * as XLSX from "xlsx"; // Import XLSX library for creating XLS files
import "@react-pdf-viewer/core/lib/styles/index.css";
import ipaddress from "../Components/IpAddress";
import { toast } from "react-toastify";
import PartyListTable from "../Parent_Pages/PartyListTable";
import {
  faArrowsToEye,
  faBolt,
  faDatabase,
  faFile,
  faFileExcel,
  faFilePdf,
  faPrint,
  faSave,
  faSearch,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  pdf,
  Line,
  BlobProvider,
} from "@react-pdf/renderer";

export default function ExportPCTM() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const reactPageName = "Export PCTM Data Party";
  const [cartingAgents, setCartingAgents] = useState([]);
  const [tpNumbers, setTpNumbers] = useState([]);
  const [selectedCartingAgent, setSelectedCartingAgent] = useState("");
  const [serDate, setSerDate] = useState(new Date());
  const [selectedCartingAgentTpNo, setSelectedCartingAgentTpNo] = useState("");
  const [exportTpData, setExportTpData] = useState([]);
  const [exportData, setExportData] = useState([]);
  const [importAllData, setImportAllData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showImportDataTable, setShowImportDataTable] = useState(false);
  const [pdfReportData, setPDFReportData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [summaryDataForTPData, setSummaryDataForTPData] = useState([]); // Define the state variable
  const [ReordList, setReordList] = useState([]);
  const [filteredExportData, setfilteredExportData] = useState([]);
  const [distinctMawbCount, setDistinctMawbCount] = useState(0); // Define the state variable
  const formattedStartDate = startDate.toISOString().split('T')[0]; // Extract yyyy-MM-dd
  const formattedEndDate = endDate.toISOString().split('T')[0];
  const formattedSerDate = serDate.toISOString().split('T')[0];
  const [Custodian, setCustodian] = useState("Sunil Patil");




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


  const CustomHeader = () => {
    return (
      <View style={styles.header}>
        <Image src={dgdcImage} style={styles.image} />
      </View>
    );
  };

  const makeFieldEmpty = () => {
    setSerDate(new Date());
    setExportTpData([]);
    setExportData([]);
    setSummaryDataForTPData([]);
    setAllTpDataSummery([]);
    setAllTpData([]);
    setCustodian("Sunil Patil");
  };


  const styles = StyleSheet.create({
    centeredTextContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 9,
    },
    rightText: {
      fontSize: 12,
      textAlign: "right", // Center text horizontally
    },
    centeredText: {
      fontSize: 12,
      textAlign: "center", // Center text horizontally
    },
    headerText: {
      fontSize: 12,
      fontWeight: "bold",
    },
    page: {
      paddingTop: 18,
      paddingBottom: 60,
      paddingHorizontal: 30,
    },
    header: {
      marginBottom: 5,
    },
    heading: {
      fontSize: 9,
      marginBottom: 0,
      fontWeight: "bold",
      alignItems: "center",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: 5,
    },
    addressContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      paddingBottom: 4,
      flexDirection: "row",
      textAlign: "center",
    },
    addressColumn: {
      flex: 1,
      width: "50%",
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
    },
    viewheadingwithbox: {
      border: "1px solid black",
      padding: 5,
    },
    paragraph: {
      fontSize: 9,
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
      marginTop: 9,
      fontWeight: "bold",
    },
    line: {
      width: "100%", // Adjust the width of the line
      marginTop: 5, // Adjust the space above the line
      marginBottom: 4, // Adjust the space below the line
      borderTop: "1pt solid black", // Style the line
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
      padding: 1,
      flexWrap: "wrap",
      width: 52,
      textAlign: "center",
      fontSize: 7,
    },
    tableCellHeader: {
      fontWeight: "bold",
      flexWrap: "wrap",
      width: 52,
      border: "0.4px solid black",
      textAlign: "center",
      fontSize: 9,
    },
    tableCellHeade: {
      flexWrap: "wrap",
      fontWeight: "bold",
      flexDirection: "row",
      width: 66,
      fontWeight: "bold",
      fontSize: 9,
      border: "0.4px solid black",
      textAlign: "center",
    },
    tableCel: {
      border: "0.4px solid black",
      padding: 1,
      flexWrap: "wrap",
      flexDirection: "row",
      width: 66,
      textAlign: "center",
      fontSize: 7,
    },
  });


  const formatPctmNo = (pctmNo) => {
    // Remove leading zeros using a regular expression
    return pctmNo.replace(/^0+/, "");
  };

  const formatTpNo = (tpNo) => {
    // Remove leading zeros using a regular expression
    return tpNo.replace(/^0+/, "");
  };






  const formatedDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };
  const sbCount = ReordList.filter(
    (item) => item.sbNo !== null && item.sbNo !== ""
  ).length;

  const noOfPackages = ReordList.reduce((total, item) => {
    if (item.noOfPackages !== null && !isNaN(item.noOfPackages)) {
      return total + parseInt(item.noOfPackages, 10);
    }
    return total;
  }, 0);

  const handleShow = async () => {
    // You can use this function to display the fetched data in a table or perform other actions


    // console.log("dd", formattedStartDate);
    // console.log("dd", formattedEndDate);

    await axios
      .get(
        `http://${ipaddress}export/exportData?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      )
      .then((response) => {
        const exportData = response.data;

        setExportData(exportData);
        console.log("EXport data ", exportData);
        setShowTable(true);
        setTotalEntries(exportData.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const generateExportPCTM = () => {
    axios
      .post(
        `http://${ipaddress}export/updatePCTMAndTPNo?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      )
      .then((response) => {
        const reportData = response.data; // Data for the selected airline
        // Pass the data to the PDFReport component
        setPDFReportData(pdfReportData);
        setImportAllData(importAllData);

        setTotalEntries(exportData.length);
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
        window.location.reload();
      })
      .catch((error) => {
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
      });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  const [importAllDatalist, setImportAllDatalist] = useState([]);

  useEffect(() => {
    // Fetch data from your backend API
    axios
      .get(`http://${ipaddress}export/all/${companyid}/${branchId}`)
      .then((response) => {
        // Assuming your API response is an array of Import objects
        setImportAllDatalist(importAllDatalist);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };


  const [allTpData, setAllTpData] = useState([]);
  const [sumOfNop, setSumOfNop] = useState(0);
  const [sumOfSB, setSumOfSB] = useState(0);
  const [sumOfMAWB, setSumOfMAWB] = useState(0);

  const [allTpDataSummery, setAllTpDataSummery] = useState([]);
  const handleShowTPData = () => {
    console.log('selectedCartingAgentTpNo ',selectedCartingAgentTpNo+" yyy");
    if(selectedCartingAgentTpNo === 'Select'){
      toast.error("Please select the TP No",{
        autoClose:800
      })
      return;
    }
    axios
      .get(
        `http://${ipaddress}exportshb/getExportTpData?companyId=${companyid}&branchId=${branchId}&serDate=${formattedSerDate}&cartingAgent=${selectedCartingAgent}&tpNo=${selectedCartingAgentTpNo}`
      )
      .then((response) => {
        setAllTpData(response.data.tpData);
        setAllTpDataSummery(response.data.tpSummary);
        const calculatedSumOfNop = response.data.tpSummary.reduce((acc, curr) => acc + curr[2], 0);
        const calculatedSumOfSB = response.data.tpSummary.reduce((acc, curr) => acc + curr[3], 0);
        const calculatedSumOfMAWB = response.data.tpSummary.reduce((acc, curr) => acc + curr[4], 0);
        setSumOfNop(calculatedSumOfNop);
        setSumOfSB(calculatedSumOfSB);
        setSumOfMAWB(calculatedSumOfMAWB);
      })
      .catch((error) => {
        console.error("Error fetching PCTM data:", error);
      });

  };

  
  useEffect(() => {

    if (serDate) {
      fetch(
        `http://${ipaddress}exportshb/getConsoleForPctm?companyId=${companyid}&branchId=${branchId}&serDate=${formattedSerDate}`
      )
        .then((response) => response.json())
        .then((data) => {
          setCartingAgents(data);

          console.log("Carting Agents");
          console.log(data);
          setSelectedCartingAgent("Select"); // Reset the selected value when serDate changes
        })
        .catch((error) => {
          console.error("Error fetching carting agents:", error);
        });
    }
  }, [serDate]);

  useEffect(() => {
    if (selectedCartingAgent) {
      axios
        .get(
          `http://${ipaddress}exportshb/tpNumbers?companyId=${companyid}&branchId=${branchId}&serDate=${formattedSerDate}&cartingAgent=${selectedCartingAgent}`
        )
        .then((response) => {
          // Handle the response here, set the tpNumbers state
          const data = response.data;
          setTpNumbers(data);
          setSelectedCartingAgentTpNo("Select");
        })
        .catch((error) => {
          console.error("Error fetching tpNumbers:", error);
        });
    }
  }, [selectedCartingAgent]);

  function fetchCompanyName(companyId) {
    // Make an Axios GET request to retrieve the company name based on companyId
    return axios
      .get(`http://${ipaddress}export/findCompanyname/${companyId}`)
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
        `http://${ipaddress}export/findBranchName/${companyId}/${branchId}`
      )
      .then(function (response) {
        return response.data; // Return the retrieved branch name
      })
      .catch(function (error) {
        console.error("Error fetching branch name:", error);
        return ""; // Return an empty string or handle the error as needed
      });
  }

  const handleXLSDownload = async () => {
    const modifiedRecordList = await Promise.all(
      ReordList.map(async (item, index) => {
        // const companyname = await fetchCompanyName(item.companyId);
        // const branchname = await fetchBranchName(item.companyId, item.branchId);

        return {
          "Sr.No": index + 1,
          // "Company Name": companyname,
          // "Branch Name": branchname,
          "SER No": item.serNo || "",
          "SER Date": formatedDate(item.serDate) || "",
          "PARCEL TYPE": item.parcelType || "",
          DESTINATION:
            item.countryOfDestination && item.portOfDestination
              ? `${item.countryOfDestination} | ${item.portOfDestination}`
              : "", // Modify this to the actual field name
          "NO OF PKGS": item.noOfPackages || "",

          "SHIPPING BILL NO": item.sbNo || "",
          "SB DATE ": formatedDate(item.sbDate) || "",
          "NEIGHT WEIGHT": item.grossWeight || "",
          "AIRWAY BILL NO": item.airwayBillNo || "",
        };
      })
    );

    const distanceRow = {
      "Sr.No": "",
      // "Company Name": "",
      // "Branch Name": "",
      "SER No": "",
      "SER Date": "",
      "PARCEL TYPE": "",
      DESTINATION: "",
      "NO OF PKGS": "",
      "SHIPPING BILL NO": "",
      "SB DATE ": "",
      "NEIGHT WEIGHT": "",
      "AIRWAY BILL NO": "",
    };
    // Add a total row

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([
      distanceRow,
      ...modifiedRecordList,
      distanceRow, // Insert the distance row
    ]);

    // Add headers for all fields
    const headers = Object.keys(modifiedRecordList[0]);
    headers.forEach((header, index) => {
      worksheet[XLSX.utils.encode_cell({ r: 0, c: index })] = {
        t: "s",
        v: header,
        s: { font: { bold: true } },
      };
    });

    // Set column widths based on data
    const colWidths = headers.map((header) => ({
      wch: header.length + 2, // You can adjust the width as needed
    }));

    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Import_Register");
    const xlsFile = XLSX.write(workbook, { type: "binary", bookType: "xls" });
    const blob = new Blob([s2ab(xlsFile)], {
      type: "application/vnd.ms-excel",
    });
    saveAs(blob, "Export_pctm_report.xls");
  };
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  const [pctmRecords, setPctmRecords] = useState({});
  const [uniquePCTMs, setUniquePCTMs] = useState(new Set());

  useEffect(() => {
    const uniquePCTMSet = new Set(); // Create a new Set
    const pctmGroupedRecords = {};

    ReordList.forEach((item) => {
      const { pctmNo } = item;
      uniquePCTMSet.add(pctmNo);

      // Add the record to the corresponding MAWB group in the object
      if (!pctmGroupedRecords[pctmNo]) {
        pctmGroupedRecords[pctmNo] = [];
      }
      pctmGroupedRecords[pctmNo].push(item);
    });
    setUniquePCTMs(uniquePCTMs); // Update the state with unique MAWB values
    setPctmRecords(pctmRecords); // Update the state with grouped records
  }, [ReordList]);

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

    return "Number is too large to convert";
  }

  const [external_party, SetExternal_party] = useState([]);
  const [getexternaluserId, setGetexternaluserId] = useState({});
  const [namesMap, setNamesMap] = useState({});
  const [isCartingDataPresent, setIsCartingDataPresent] = useState(false);

  const fetchCartingAgent = async () => {
    try {

      const response = await axios.get(
        `http://${ipaddress}externalparty/consoledata/${companyid}/${branchId}`
      );
      const data = await response.data;
      const namesMap = {};
      data.forEach((externalParty) => {
        namesMap[externalParty.externaluserId] = externalParty.userName;
      });
      setNamesMap(namesMap);

      setIsCartingDataPresent(data.length > 0); // Set based on data presence
      setGetexternaluserId(namesMap);

      SetExternal_party(data);

    } catch (error) {
      console.error("Error fetching party names:", error);
    }


  };

  useEffect(() => {
    fetchCartingAgent();
  }, []);


  const cartingAgentsOptions = external_party.map((externalParty) => ({
    label: externalParty.userName, // Display user name in the dropdown
    value: externalParty.externaluserId, // Use externaluserId as the value
  }));




  const handlePrint = () => {
    const isoDate = new Date().toISOString();
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based, so we add 1.
    const year = date.getFullYear().toString();
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    const recordsPerPage = 22;
    // const filteredExportData = ReordList.filter((data) => data.pctmNo === desiredPctmNo);
    const uniquePctmNos = [...new Set(ReordList.map((item) => item.pctmNo))];

    // const uniquePctmNos = [...new Set(filteredExportData.map((item) => item.pctmNo))];
    let currentPageNumber = 1;
    for (let pctmNo of uniquePctmNos) {
      const filteredExportData = ReordList.filter(
        (item) => item.pctmNo === pctmNo
      );
      const totalRecords = filteredExportData.length;

      const totalNoOfPackages = filteredExportData.reduce(
        (total, item) => total + item.noOfPackages,
        0
      );

      const distinctAirwayBillCounts = {}; // Object to store distinct airwayBillNo counts for each pctmNo

      // Iterate through ReordList to count distinct airwayBillNo values for each pctmNo
      ReordList.forEach((item) => {
        if (!distinctAirwayBillCounts[item.pctmNo]) {
          distinctAirwayBillCounts[item.pctmNo] = new Set(); // Use Set to store distinct airwayBillNo values
        }
        distinctAirwayBillCounts[item.pctmNo].add(item.airwayBillNo);
      });
      // Count of distinct airwayBillNo values for the current pctmNo
      const airwayBillCountForPctmNo = distinctAirwayBillCounts[pctmNo]
        ? distinctAirwayBillCounts[pctmNo].size
        : 0;

      for (
        let pageIndex = 0;
        pageIndex < Math.ceil(totalRecords / recordsPerPage);
        pageIndex++
      ) {
        const currentPageRecords = filteredExportData.slice(
          pageIndex * recordsPerPage,
          (pageIndex + 1) * recordsPerPage
        );

        printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>    
    <title>Export PCTM Report</title>
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

      
      td {
        border: 1px solid #dddddd;
        text-align: center;
        padding: 1px;
        font-size: 10px;
    }

    th {
      border: 1px solid #dddddd;
        background-color: #f2f2f2;
        text-align: center;
        font-size: 12px;
    }

      .header img {
          max-width: auto; /* Ensure the image doesn't exceed the page width */
          max-height: auto; /* Adjust the maximum image height as needed */
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
    <img src="${dgdcImage}" alt="Header Image" style="max-width: 306px; display: block; margin: 0 auto;"> </br>
    <div  style="padding-bottom: 5px; font-weight: bold; font-size: 12px;text-align:'center';">
        <div style="font-size:12px; font-weight:bold">EXPORT</br>
        PRECIOUS CARGO TRANSFER MANIFEST</div>
    </div>
</div>
    <div class="content">

    <div class="container">
    <div class="left-column">
    <p style="font-size: 12px;">PCTM No:${formatPctmNo(currentPageRecords[0].pctmNo)}</br>
    Airport Name</p>
    </div>
    <div class="right-column">
    
    <p style="font-size: 12px;">TRIP No:${formatTpNo(currentPageRecords[0].tpNo)}</br>
    Date: ${formatedDate(currentPageRecords[0].tpDate)}</br>
    Transferred to ${currentPageRecords[0].airlineName}</br>
    Page No:${currentPageNumber}</p>
    </div>
</div>
        <table>
            <thead>
                <tr>
                <th style={{ backgroundColor: "skyblue" }}>
                Sr.No
              </th>
              <th style={{ backgroundColor: "skyblue" }}>
                SER No
              </th>
              <th style={{ backgroundColor: "skyblue" }}>
                Parcel Type
              </th>
              <th style={{ backgroundColor: "skyblue" }}>
                Destination
              </th>
              <th style={{ backgroundColor: "skyblue" }}>
               NOP
              </th>
              <th style={{ backgroundColor: "skyblue" }}>
                Shipping Bill No
              </th>
              <th style={{ backgroundColor: "skyblue" }}>
              SB Date 
            </th>
              <th style={{ backgroundColor: "skyblue" }}>
                Neight Weight
              </th>
              <th style={{ backgroundColor: "skyblue" }}>
                Airway Bill No
              </th>
                </tr>
            </thead>
            <tbody>
              ${currentPageRecords
            .map(
              (item, index) => `
                      <td>${index + 1}</td>
                      <td>${item.serNo || ""}</td>
                      <td>${item.serNo || ""}</td>
                      <td>${item.countryOfDestination || ""}</td>
                      <td>${item.noOfPackages || ""}</td>
                      <td>${item.sbNo || ""}</td>
                      <td>${formatDate(item.sbDate) || ""}</td>
                      <td>${item.grossWeight || ""}</td>
                      <td>${item.airwayBillNo || ""}</td>
                      </tr>
                  `
            )
            .join("")}
                
                <tr>
                    <td class="bold-text">Total</td>
                    <td></td>
                    <td class="bold-text"></td>
                    <td></td>
                    <td>${totalNoOfPackages} &nbsp;(${numberToWords(
              totalNoOfPackages
            )})</td>
                    <td>${totalRecords} &nbsp;(${numberToWords(
              totalRecords
            )})</td>
                    <td class="bold-text"></td>
                    <td></td>
                    <td>${airwayBillCountForPctmNo} &nbsp;(${numberToWords(
              airwayBillCountForPctmNo
            )})</td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div>
               <hr>
            </div>
            <p style="font-size: 12px;"">Copy for: A.C. SEEPZ/DGDC Sahar/Copy for Airline/Transport Agent/Custodian</p>

            <div class="container" style="font-size: 12px;">
            <div class="left-column" style="font-size: 12px;">
           Transferred by</br></br>
            _________________________</br>
            (Name of Transferring Carrier)</br>
            </div>

            <div class="right-column" style="font-size: 12px;">
            
            Above consignment(s) received in full and apparent good condition except as noted in the "remarks" column.</br>
            Receiver's Signature __________________</br>
            Name __________________</br>
          
            </div>
        </div>

   
      <div class="page-break"></div>
     
        <!DOCTYPE html>
        <html>
        <head>    
        <title>Cover Page</title>
        <style>
          /* Your cover page CSS styles here */
          @page {
            margin: 1cm;
          }
          .printable-area {
            font-family: Arial, sans-serif;
            page-break-before: always;
          }
          .header img {
            max-width: auto;
            max-height: auto;
          }
          .container {
            display: flex;
            justify-content: space-between;
          }
          .left-column {
            width: 70%;
          }
          .right-column {
            width: 30%;
            text-align: right;
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
          <img src="${dgdcImage}" alt="Header Image" style="max-width: 306px; display: block; margin: 0 auto;"> 
            <div style="text-align: center;font-size: 12px;font-weight: bold;">
                <p  style="font-size:12px;font-weight:'bold';">DGDC LIMITED</p>
            </div>
          </div>
          <div class="content" style="font-size: 12px;">
            <div class="container">
              <div class="left-column">
                <p style="font-size: 12px;">BRITISH AIRWAYS CARGO SECTION<br>
           SAHAR MUMBAI - 400 099</p>
              </div>
              <div class="right-column">
                <p style="font-size: 12px;">Date: ${formatedDate(currentPageRecords[0].tpDate)}</p>
              </div>
            </div>
            <div style="text-align: center;">
              <p style="font-size: 12px;">SUB : PCTM NO &nbsp ${formatPctmNo(
              currentPageRecords[0].pctmNo
            )}</p>
            </div>
            <p style="font-size: 12px;">Sir,</p>
            <p style="font-size: 12px;">PLEASE ACKNOWLEDGE RECEIPT OF THE FOLLOWING DOCUMENTS BY SIGNING AND RETURNED THE DUPLICATE OF THE LETTER</p>
            <div class="container" style="font-size: 12px;">
              <div class="left-column">
                <p style="font-size: 12px;">1. A.W. BILL : ${airwayBillCountForPctmNo}</br>
               2. SHIPPING BILL BOTH DUPLICATE </br>
                & EP COPY : &nbsp ${totalRecords}</br>
                3. TOTAL NUMBER OF PACKAGES: &nbsp ${totalNoOfPackages} </p>
              </div>
            </div>
            <p style="font-size: 12px;">THE PARCEL PERTAINING TO THE ABOVE DOCUMENTS HAS BEEN DEPOSITED AT OUR SAHAR STRONG ROOM KINDLY ARRANGE TO COLLECT THE SAME</p>
            <div style="text-align: right;padding-top:4px;">
              <p style="font-size: 12px;">YOURS FAITHFULLY</p>
             <p style="padding-top:9px;">FOR CUSTODIAN</p>
            </div>
            <p style="font-size: 12px;"><u>FOR AIRLINE USE</u></p>
            <p style="font-size: 12px;">RECEIVED THE ABOVE MENTIONED AS DETAILED IN THE PCTM NO</p>
            <div class="container" style="font-size: 12px;">
              <div class="left-column" style="padding-top:5px;">
                <p style="font-size: 12px;">DATE :</br>
                SIGNATURE :</br>
                NAME :</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      
        </body>
        </html>
    `);

        printWindow.document.write('<div class="printable-area"></div>');

        if (pageIndex < Math.ceil(totalRecords / recordsPerPage) - 1) {
        }

        currentPageNumber++;
      }
    }
    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

  const handlePrintAcknoledge = () => {
    const isoDate = new Date().toISOString();
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based, so we add 1.
    const year = date.getFullYear().toString();
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    const recordsPerPage = 7;
    // const filteredExportData = ReordList.filter((data) => data.pctmNo === desiredPctmNo);
    const uniquePctmNos = [...new Set(ReordList.map((item) => item.pctmNo))];

    // const uniquePctmNos = [...new Set(filteredExportData.map((item) => item.pctmNo))];
    let currentPageNumber = 1;
    for (let pctmNo of uniquePctmNos) {
      const filteredExportData = ReordList.filter(
        (item) => item.pctmNo === pctmNo
      );
      const totalRecords = filteredExportData.length;

      const totalNoOfPackages = filteredExportData.reduce(
        (total, item) => total + item.noOfPackages,
        0
      );

      const distinctAirwayBillCounts = {}; // Object to store distinct airwayBillNo counts for each pctmNo

      // Iterate through ReordList to count distinct airwayBillNo values for each pctmNo
      ReordList.forEach((item) => {
        if (!distinctAirwayBillCounts[item.pctmNo]) {
          distinctAirwayBillCounts[item.pctmNo] = new Set(); // Use Set to store distinct airwayBillNo values
        }
        distinctAirwayBillCounts[item.pctmNo].add(item.airwayBillNo);
      });
      // Count of distinct airwayBillNo values for the current pctmNo
      const airwayBillCountForPctmNo = distinctAirwayBillCounts[pctmNo]
        ? distinctAirwayBillCounts[pctmNo].size
        : 0;

      for (
        let pageIndex = 0;
        pageIndex < Math.ceil(totalRecords / recordsPerPage);
        pageIndex++
      ) {
        const currentPageRecords = filteredExportData.slice(
          pageIndex * recordsPerPage,
          (pageIndex + 1) * recordsPerPage
        );

        printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>    
    <title>Export PCTM Report</title>
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

      td {
        border: 1px solid #dddddd;
        text-align: center;
        padding:1px;
        font-size: 10px;
    }

    th {
      border: 1px solid #dddddd;
        background-color: #f2f2f2;
        text-align: center;
        font-size: 12px;
    }
      .header img {
          max-width: auto; /* Ensure the image doesn't exceed the page width */
          max-height: auto; /* Adjust the maximum image height as needed */
      }.container {
        display: flex;
        justify-content: space-between;
    }
    .left-column {
        width: 70%; /* Adjust the width as needed */
    }
    .page-break {
      page-break-before: always; /* This will force a page break before the element */
    }
    .custom-td {
      height: 45px; /* You can adjust the height value as needed */
    }

    .right-column {
        width: 30%; /* Adjust the width as needed */
        text-align: right; /* Align text to the right */
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

    <div style="display: flex; flex-wrap: wrap; justify-content: center; padding-bottom: 18px;">
  <div style="flex: 1; width: 50%; font-weight: bold;font-size: 13px;">
    Airport MUMBAI<br>
     CUSTODIAN'S OFFICE
  </div>

  <div style="flex: 1; width: 50%; font-weight: bold;font-size: 13px;">
  D.G.D.C. LIMITED<br>
  DGDC SEEPZ SEZ STRONG ROOM<br>
  MIAL - CSI AIRPORT, AIR CARGO, SAHAR MUMBAI - 99 
</div>

  <div style="flex: 1;  width: 50%; font-weight: bold;font-size: 12px;">
   
    TRIP NO. ${formatTpNo(
          currentPageRecords[0].tpNo
        )}	TRIP DATE :  ${formatedDate(currentPageRecords[0].tpDate)}
        <br>
     FLIGHT : ${currentPageRecords[0].airlineName}
  </div>

  <div style="flex: 1; width: 50%; font-weight: bold;font-size: 12px;">
  PCTM No:${formatPctmNo(currentPageRecords[0].pctmNo)}<br>
  Page No: ${currentPageNumber}
  </div>
</div>
<div style="text-align: center; font-weight: bold; padding-bottom: 5px; font-size: 12px;">
  EXPORT REGISTER
</div>

        <table>
            <thead>
                <tr>
                <th style="font-size: 12px;">
                Sr.No
              </th>
              <th style="font-size: 12px;">
                SER No
              </th>
              <th style="font-size: 12px;">
              Airway Bill No
            </th>
            <th style="font-size: 12px;">
            Destination
          </th>
          <th style="font-size: 12px;">
          SB No
        </th>
        <th style="font-size: 12px;">
        Weight
       </th>
       <th style="font-size: 12px;">
       No Of PKG
     </th>
      
              <th style="font-size: 12px;">
              Shpmnt Removal
              </th>
              <th style="width:6%;font-size: 12px; ">
              <strong>  Shipped on Flight No</strong>
              </th>
            
              <th style="width:14%;font-size: 12px;" colspan="2">
             <strong> Removing the PKG for shipmnt Airline Staff</strong>
               </th>
               <th style="width:14%;font-size: 12px;" colspan="2">
               <strong> Custom-Escort</strong>
                </th>
                
                <th style="width:14%;font-size: 12px;" colspan="2">
                <strong> DGDC Sign Name official Delivering the pkg</strong>
                 </th>
                </tr>
                <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th style="font-size: 12px;">Dt Of</th>
                  <th style="font-size: 12px;">& Dt</th>
                  <th style="font-size: 12px;">Name</th>
                  <th style="font-size: 12px;">Sign</th>
                  <th style="font-size: 12px;">Name</th>
                  <th style="font-size: 12px;">Sign</th>
                  <th style="font-size: 12px;">Name</th>
                  <th style="font-size: 12px;">Sign</th>
                </tr>
              </thead>
            </thead>
            <tbody>
              ${currentPageRecords
            .map(
              (item, index) => `
                      <td  class="custom-td">${index + 1}</td>
                      <td class="custom-td">${item.serNo}</td>
                      <td class="custom-td">${item.airwayBillNo}</td>
                      <td class="custom-td">${item.countryOfDestination} | ${item.portOfDestination}</td>
                      <td class="custom-td">${item.sbNo}</td>
                      <td class="custom-td">${item.grossWeight}</td>
                      <td class="custom-td">${item.noOfPackages}</td>
                      <td class="custom-td"></td>
                      <td class="custom-td"></td>
                      <td class="custom-td"></td>
                      <td class="custom-td"></td>
                      <td class="custom-td"></td>
                      <td class="custom-td"></td>
                      <td class="custom-td"></td>
                      <td class="custom-td"></td>
                      </tr>
                      <tr>
                      <td colspan="15" style="font-weight: bold; font-size: 12px; text-align: left;">Remarks:</td>

                    </tr>
                  `
            )
            .join("")}
                </tbody>
                </table>
     
            </div>  
        </div>
              </body>
        </html>
        <div style="display: flex; flex-wrap: wrap;padding-top: 9px;padding-bottom: 9px;">
      
    `);

        if (pageIndex < Math.ceil(totalRecords / recordsPerPage) - 1) {
          printWindow.document.write('<div class="page-break"></div>'); // Add a page break
        }

        currentPageNumber++;
      }

      // Display "Total AWB" and "TOTAL PKGS" at the end of each pctmNo data section
      printWindow.document.write(`
  <div style=" width: 25%;font-size: 12px;">
  Total AWB :&nbsp;&nbsp;${airwayBillCountForPctmNo} &nbsp;&nbsp;(${numberToWords(
        airwayBillCountForPctmNo
      )}) 
  </div>
  <div style=" width: 25%;font-size: 12px;">
  TOTAL PKGS :  &nbsp;&nbsp; ${totalNoOfPackages} &nbsp;&nbsp;(${numberToWords(totalNoOfPackages)})
  </div>
</div>
  `);
      printWindow.document.write('<div class="page-break"></div>'); // Add a page break
    }

    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

 




  //Export PCTM

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
  const getExcel = async() => {
    try {
     
      const filename = `ExportPCTM.xlsx`;
  
      const headers = {
        headers: {
          Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        responseType: 'blob',
      };
  
      const response = await axios.post(`http://${ipaddress}exportshb/pctmexcel?companyId=${companyid}&branchId=${branchId}&serDate=${formattedSerDate}&cartingAgent=${selectedCartingAgent}&tpNo=${selectedCartingAgentTpNo}`, null, headers);
  
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
  }



  const pctmPrint = async () => {
  




    await axios.post(`http://${ipaddress}exportshb/exportPctmReport?companyId=${companyid}&branchId=${branchId}&tpdate=${formattedSerDate}&tpno=${selectedCartingAgentTpNo}&custodian=${Custodian}&console=${selectedCartingAgent}&consoleName=${namesMap[selectedCartingAgent]}`)
      .then((response) => {
        const base64PDF = response.data;

        // Create a new window for displaying the PDF
        const newWindow = window.open("", "_blank");

        // Write the HTML content to the new window
        newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Export PCTM</title>
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
      })
      .catch((error) => {
        if (error) {
          toast.error("Something went wrong", {
            autoClose: 1000
          })
        }
      })
  }


  const pctmPdf = async () => {
   



    await axios.post(`http://${ipaddress}exportshb/exportPctmReport?companyId=${companyid}&branchId=${branchId}&tpdate=${formattedSerDate}&tpno=${selectedCartingAgentTpNo}&custodian=${Custodian}&console=${selectedCartingAgent}&consoleName=${namesMap[selectedCartingAgent]}`)
      .then((response) => {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF
        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);
        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'ExportPctm.pdf'; // Set the filename for the downloaded PDF
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
      })
      .catch((error) => {
        if (error) {
          toast.error("Something went wrong", {
            autoClose: 1000
          })
        }
      })
  }



  const airlineIntimationPrint = async () => {
  




    await axios.post(`http://${ipaddress}exportshb/exportAirlineIntimationReport?companyId=${companyid}&branchId=${branchId}&tpdate=${formattedSerDate}&tpno=${selectedCartingAgentTpNo}&custodian=${Custodian}&console=${selectedCartingAgent}&consoleName=${namesMap[selectedCartingAgent]}`)
      .then((response) => {
        const base64PDF = response.data;

        // Create a new window for displaying the PDF
        const newWindow = window.open("", "_blank");

        // Write the HTML content to the new window
        newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Export PCTM</title>
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
      })
      .catch((error) => {
        if (error) {
          toast.error("Something went wrong", {
            autoClose: 1000
          })
        }
      })
  }


  const airlineIntimationPdf = async () => {
   



    await axios.post(`http://${ipaddress}exportshb/exportAirlineIntimationReport?companyId=${companyid}&branchId=${branchId}&tpdate=${formattedSerDate}&tpno=${selectedCartingAgentTpNo}&custodian=${Custodian}&console=${selectedCartingAgent}&consoleName=${namesMap[selectedCartingAgent]}`)
      .then((response) => {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF
        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);
        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'ExportPctm.pdf'; // Set the filename for the downloaded PDF
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
      })
      .catch((error) => {
        if (error) {
          toast.error("Something went wrong", {
            autoClose: 1000
          })
        }
      })
  }



  const ackPrint = async (data, data1) => {
    console.log("pctmdata ", data)
    const combineData = {
      tpData: data,
      tpSummery: data1
    }
    await axios.post(`http://${ipaddress}export/exportAckReport?companyId=${companyid}&branchId=${branchId}&tpNo=${selectedCartingAgentTpNo}&serDate=${formattedSerDate}`, combineData)
      .then((response) => {
        const base64PDF = response.data;

        // Create a new window for displaying the PDF
        const newWindow = window.open("", "_blank");

        // Write the HTML content to the new window
        newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Export Acknowlegement</title>
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
      })
      .catch((error) => {
        if (error) {
          toast.error("Something went wrong", {
            autoClose: 1000
          })
        }
      })
  }

  const ackPdf = async (data, data1) => {
    console.log("pctmdata ", data)
    const combineData = {
      tpData: data,
      tpSummery: data1
    }
    await axios.post(`http://${ipaddress}export/exportAckReport?companyId=${companyid}&branchId=${branchId}&tpNo=${selectedCartingAgentTpNo}&serDate=${formattedSerDate}`, combineData)
      .then((response) => {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF
        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);
        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'ExportAcknowledgement.pdf'; // Set the filename for the downloaded PDF
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
      })
      .catch((error) => {
        if (error) {
          toast.error("Something went wrong", {
            autoClose: 1000
          })
        }
      })
  }


  return (

    <div className="Container" >
      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
        icon={faFile}
        style={{
          marginRight: '8px',
          color: 'black', // Set the color to golden
        }}
      />Export PCTM</h5>



   
        <Card
          style={{
            marginTop: 25,

            padding: 8,
          }}
        >

          <Container>
            <Form>
              <Row>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="inputhead">Date</Form.Label>
                    <div>
                      <DatePicker
                        selected={serDate}
                        wrapperClassName="custom-react-datepicker-wrapper"
                        onChange={(date) => {
                          if (date) {
                            setSerDate(date);
                          }
                        }}
                        value={serDate}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                        customInput={<input style={{ width: '100%' }} />}
                      />

                    </div>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="inputhead">
                      Console
                    </Form.Label>
                    {/* Use the Select component for the dropdown */}



                    <Select
                      name="cartingAgent"
                      options={cartingAgents.map((cartingAgent) => ({
                        label: cartingAgent[1], // Map the value to the userName
                        value: cartingAgent[0],
                      }))}
                      value={{
                        label: namesMap[selectedCartingAgent], // Map the selected value to the userName
                        value: selectedCartingAgent,
                      }}
                      onChange={(option) => setSelectedCartingAgent(option.value)}
                    />


                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Label className="inputhead">
                    Transhipment Permit No
                  </Form.Label>
                  <Select
                    name="tpNumbers"
                    options={tpNumbers.map((tpNumber) => ({
                      label: formatTpNo(tpNumber),
                      value: tpNumber,
                    }))}
                    value={{
                      label: formatTpNo(selectedCartingAgentTpNo),
                      value: selectedCartingAgentTpNo,
                    }}
                    onChange={(option) =>
                      setSelectedCartingAgentTpNo(option.value)
                    }
                  />
                </Col>

                <Col md={3} >
                  <Form.Group>
                    <Form.Label className="forlabel">
                      Custodian
                    </Form.Label>

                    {/* <label className="forlabel">Vehicle No</label> */}
                    <Input
                      type="text"
                      name="Custodian"
                      placeholder="Enter Custodian Name"
                      className=""
                      value={Custodian}
                      onChange={(e) => setCustodian(e.target.value)}
                    />
                  </Form.Group>
                </Col>




              </Row>



              <div className="d-flex justify-content-center align-items-center">
                <div style={{ marginTop: 18 }}>
                  <Button
                    color="success"
                    outline
                    style={{ marginTop: 32, marginRight: 9 }}
                    onClick={handleShowTPData}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ marginRight: "5px" }}
                    />
                    Show
                  </Button>

                  <Button
                    outline
                    color="danger"
                    style={{ marginTop: 32 }}
                    onClick={(e) => makeFieldEmpty()}
                  >
                    <FontAwesomeIcon
                      icon={faUndo}
                      style={{ marginRight: "5px" }}
                    // onClick={handleResetForm}
                    />
                    Reset
                  </Button>
                </div>
              </div>


            </Form>
          </Container>
        </Card>

        <Card style={{ marginTop: 18, marginBottom: 18 }}>
          <Container>
            {allTpData.length > 0 && (
              <div>
                {allTpData.length > 0 && (
                  <div style={{ marginTop: 23 }}>
                    <Row>
                      <Col md={2} > <Label className="forlabel" for="search">Download PCTM </Label></Col>
                      <Col md={4} >





                        <button
                          style={{ marginLeft: 9, marginTop: 5 }}
                          className="btn btn-outline-primary btn-margin"
                          type="button"
                          onClick={() => pctmPrint()}
                        > <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                          Print
                        </button>
                        <button
                          className="btn btn-outline-success btn-margin"
                          type="button"
                          onClick={() => pctmPdf()}
                          style={{ marginLeft: "10px", marginTop: 5 }}
                        ><FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />
                          PDF
                        </button>
                        <button
                          className="btn btn-outline-primary btn-margin"
                          type="button"
                          style={{ marginLeft: "10px", marginRight: 9, marginTop: 5 }}
                          onClick={() => getExcel()}
                        ><FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '5px' }} />
                          XLS
                        </button>
                      </Col>

                      <Col md={2} > <Label className="forlabel" for="search">Download Airline Intimaton </Label></Col>
                      <Col md={4} >





                        <button
                          style={{ marginLeft: 9, marginTop: 5 }}
                          className="btn btn-outline-primary btn-margin"
                          type="button"
                          onClick={() => airlineIntimationPrint()}
                        > <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                          Print
                        </button>
                        <button
                          className="btn btn-outline-success btn-margin"
                          type="button"
                          onClick={() => airlineIntimationPdf()}
                          style={{ marginLeft: "10px", marginTop: 5 }}
                        ><FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />
                          PDF
                        </button>
                       
                      </Col>

                    

                    </Row>
                  </div>
                )}

                <Table
                  striped
                  responsive
                  bordered
                  style={{ marginTop: 9 }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: '#BADDDA' }}>
                        Sr.No
                      </th>
                      <th style={{ backgroundColor: '#BADDDA' }}>
                        ER No
                      </th>
                     
                      <th style={{ backgroundColor: '#BADDDA' }}>
                        Destination
                      </th>
                      <th style={{ backgroundColor: '#BADDDA' }}>
                        No Of Packages
                      </th>
                      <th style={{ backgroundColor: '#BADDDA' }}>
                        Shipping Bill No
                      </th>
                      <th style={{ backgroundColor: '#BADDDA' }}>
                        NET Weight
                      </th>
                      <th style={{ backgroundColor: '#BADDDA' }}>
                        Airway Bill No
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTpData.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.erNo}</td>
                        
                        <td>{item.portOfDestination}</td>
                        <td>{item.noOfPackages}</td>
                        <td>{item.sbNo}</td>
                        <td style={{ textAlign: 'right' }}>{item.grossWeight}</td>
                        <td>{item.airwayBillNo}</td>
                        {/* Add more table cells as needed */}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
            {allTpDataSummery.length > 0 && (
              <div>
                <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
                  icon={faDatabase}
                  style={{
                    marginRight: '8px',
                    color: 'black', // Set the color to golden
                  }}
                /> Summary Data</h5>

                <div className="table-responsive">
                  <Table className="table table-striped table-hover">


                    <thead>
                      <tr>
                        <th
                          style={{ backgroundColor: '#BADDDA' }}
                        >
                          Airline Name
                        </th>
                        <th
                          style={{ backgroundColor: '#BADDDA' }}
                        >
                          No Of Packages
                        </th>
                        <th
                          style={{ backgroundColor: '#BADDDA' }}
                        >
                          SB Count
                        </th>
                        <th
                          style={{ backgroundColor: '#BADDDA' }}
                        >
                          MAWB Count
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTpDataSummery.map((item, index) => (
                        <tr key={index}>
                          <td style={{ width: "20%" }}>
                            {item[1]}
                          </td>
                          <td style={{ width: "20%" }}>
                            {item[2]}
                          </td>
                          <td style={{ width: "20%" }}>{item[3]}</td>
                          <td style={{ width: "20%" }}>
                            {item[4]}
                          </td>{" "}
                          {/* Display distinct MAWB count */}
                        </tr>
                      ))}
                      <tr >
                        <th
                          style={{ backgroundColor: '#BADDDA' }}
                        >
                          Total {allTpDataSummery.length} Airlines
                        </th>
                        <th
                          style={{ backgroundColor: '#BADDDA' }}
                        >
                          {sumOfNop}
                        </th>
                        <th
                          style={{ backgroundColor: '#BADDDA' }}
                        >
                          {sumOfSB}
                        </th>
                        <th
                          style={{ backgroundColor: '#BADDDA' }}
                        >
                          {sumOfMAWB}
                        </th>
                      </tr>

                    </tbody>
                  </Table>
                </div>
              </div>
            )}
          </Container>
        </Card>
    
   
      
    </div >
  );
}






