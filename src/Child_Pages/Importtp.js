
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext, useRef } from "react";
import "../Components/Style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import { CardBody, Input } from "reactstrap";
import DGDCimage from "../Images/DGDC.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsToEye,
  faBorderAll,
  faExchange,
  faExchangeAlt,
  faEye,
  faIdCardClip,
  faSearch,
  faUserCircle,
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
import { Line, PDFDownloadLink } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { BlobProvider } from "@react-pdf/renderer";
import { data } from "jquery";
import ipaddress from "../Components/IpAddress";
import { TextBox } from "@react-pdf-viewer/core";
import axios from "axios";
import { toast } from "react-toastify";

const styles = StyleSheet.create({
  page: {
    paddingTop: 18,
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
  header: {
    marginBottom: 2,
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
  viewheadingwithbox: {
    border: "1px solid black",
    // padding: 5,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 5,
  },
  headingwithborder: {
    fontSize: 9,
    fontWeight: "bold",
    alignItems: "center",
    borderBottom: "1px solid black",
    // Add padding for space between text and border
  },

  image: {
    width: 306,
    height: 72,
    marginLeft: 108,
    justifyContent: "center",
  },

  dateSize: {
    fontSize: 7,
  },
  normaltext: {
    fontSize: 9,
    marginTop: 18,
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
    borderBottomColor: "#000",
    fontSize: 9,
    borderRightWidth: 0.4,
    borderLeftWidth: 0.4,
    borderLeftColor: "#000",
    borderRightColor: "#000",
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
  underline: {
    position: "absolute",
    top: "58%", // Adjust the position as needed
    left: 0,
    width: "36%", // Makes a line across the entire width
    borderBottom: 1, // Adjust the line thickness
    borderColor: "black", // Adjust the color
  },
  squareBox: {
    border: 1, // Adjust the border thickness
    borderColor: "black", // Adjust the color
    padding: 5, // Adjust the padding to control the size of the box
    display: "inline-block", // Ensure inline display
  },
});
export default function Importtp() {
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

  const today = new Date().toISOString().split("T")[0];

  // State to store selected date
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];
  // const defaultDate = new Date();
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

  const formatedDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const formattedStartDate = formatedDate(selectedDate);
  // const formattedEndDate = formatDate(endDate, "end");

  const totalRows = tpdata.length;
  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  // Function to format the selected date
  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  // Function to handle the date change
  const handleDateChange = async (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);
    console.log("formattedDate " + formattedDate);
    // Replace this with your actual API call logic
    await fetch(
      `http://${ipaddress}import/tpdate?date=${formattedDate}&cid=${companyid}&bid=${branchId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("tp data ", data);
        // Assuming data is an array containing Transhipment Permit No
        if (data && data.length > 0) {
          setResponseData(data); // Update responseData with fetched data
          console.log("tp data ", data); // Log the updated data
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
        console.log("dataaa ", data);
        console.log(tpdata);
      } else {
        setTpdata([]);
      }

      setError(null); // Clear the error if data is successfully fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error); // Set the error state if there's an error
    }
  };

  const handleImportPrint = async () => {
   
    try {
      const response = await axios.post(
        `http://${ipaddress}import/importTpPrint?cid=${companyid}&bid=${branchId}&date=${formattedStartDate}&tpno=${transhipmentPermitNo}&vehicle=${vehicleNo}`
      );
      if (response.status === 200) {
        const base64PDF = response.data;

        // Create a new window for displaying the PDF
        const newWindow = window.open("", "_blank");

        // Write the HTML content to the new window
        newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>import_tp_report_Viewer</title>
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
        throw new Error("Failed to generate PDF");
      }
    } catch (error) {
      // Handle errors if any
    }
  };

  const handlePdfImportTpData = async () => {
    try {
      const response = await axios.post(
        `http://${ipaddress}import/importTpPrint?cid=${companyid}&bid=${branchId}&date=${formattedStartDate}&tpno=${transhipmentPermitNo}&vehicle=${vehicleNo}`
      );
      // toast.success("GST Summary PDF Created Successfully ", { position: "top-center" ,autoClose: 900});

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
        downloadLink.download = "import_tp_report.pdf"; // Set the filename for the downloaded PDF
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        // Trigger the download
        downloadLink.click();

        // Clean up
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(blobUrl);

        toast.success("Downloaded Import_Tp PDF Successfully !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 900,
        });
      } else {
        throw new Error("Failed to generate PDF");
      }
    } catch (error) {}
  };
  const handleTranshipmentPermitNoChange = (value) => {
    setTranshipmentPermitNo(value);
   setTpdata([]);
   
    
  };

  const [vehicleNo, setVehicleNo] = useState("");

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

  // console.log("date ", currentDateTime);

  const handleExcelDownload = () => {
    // Create a subset of tpdata containing only the fields you want to export
    const excelData = tpdata.map((item) => ({
      SIRNo: item.sirNo,
      Parcel_Type: item.parcelType,
      Pctm_No: formatPctmNo(item.pctmNo),
      No_Of_Packages: item.nop,
      Description_Of_Goods: item.descriptionOfGoods,
      Gross_Weight: item.grossWeight,
      Value: item.assessableValue,
      Port_of_Origin: item.portOrigin,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set custom column widths (change the numbers to adjust the widths)
    ws["!cols"] = [
      { wch: 10 }, // Column A width
      { wch: 15 }, // Column B width
      { wch: 15 }, // Column C width
      { wch: 10 }, // Column D width
      { wch: 20 }, // Column E width
      { wch: 12 }, // Column F width
      { wch: 20 }, // Column G width
    ];

    XLSX.utils.book_append_sheet(wb, ws, "TranshipmentData");

    const excelFileName = "Import_transhipment_data.xlsx";

    // Use the writeFile function to create and download the Excel file
    XLSX.writeFile(wb, excelFileName);
  };

  const handlePDFDownload = () => {
    // Generate the PDF Blob using MyPDFDocument
    const pdfBlob = MyPDFDocument({ tpdata });

    // Create a URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Create a download link and trigger the download
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "transhipment_data.pdf"; // Set the desired file name
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Revoke the URL to free up resources
    URL.revokeObjectURL(pdfUrl);
  };

  const formatPctmNo = (pctmNo) => {
    // Remove leading zeros using a regular expression
    return pctmNo.replace(/^0+/, "");
  };

  const formatTpNo = (tpNo) => {
    // Remove leading zeros using a regular expression
    return tpNo.replace(/^0+/, "");
  };

  useEffect(() => {
    // Fetch Transhipment Permit No data for the default date
    handleTPDateChange(new Date());
    handleDateChange(selectedDate);
  }, []);

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

  const renderTable = () => (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 9, width: 54, fontWeight: "bold" },
          ]}
        >
          Sr.No
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 9, width: 100 },
          ]}
        >
          Sir No
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 9, width: 120 },
          ]}
        >
          PCTM No.
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 9, width: 100 },
          ]}
        >
          No. Of Packages
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 9, width: 140 },
          ]}
        >
          Desc
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 9, width: 140 },
          ]}
        >
          Weight
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 9, width: 54 },
          ]}
        >
          Value
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 9, width: 72 },
          ]}
        >
          Origin Airport
        </Text>
        <Text style={[styles.tableCell, styles.tableCellHeader, { width: 72 }]}>
          Console Name
        </Text>
      </View>
      {tpdata.map((item, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={{ ...styles.tableCell, width: 54 }}>{index + 1}</Text>
          <Text style={{ ...styles.tableCell, width: 100 }}>{item.sirNo}</Text>
          <Text style={{ ...styles.tableCell, width: 120 }}>
            {formatPctmNo(item.pctmNo) || ""}
          </Text>
          <Text style={{ ...styles.tableCell, width: 100 }}>{item.nop}</Text>
          <Text style={{ ...styles.tableCell, width: 140 }}>
            {item.descriptionOfGoods}
          </Text>
          <Text style={{ ...styles.tableCell, width: 140 }}>
            {item.grossWeight}
          </Text>
          <Text style={{ ...styles.tableCell, width: 54 }}>
            {item.assessableValue}
          </Text>
          <Text style={{ ...styles.tableCell, width: 72 }}>
            {item.portOrigin}
          </Text>
          <Text style={{ ...styles.tableCell, width: 72 }}>
            {getConsoleId[item.consoleName] || ""}
          </Text>
        </View>
      ))}
    </View>
  );

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

    const formattedDateTime = `${day}/${month}/${year}`;

    return formattedDateTime;
  }

  const totalNoOfPackages = tpdata.reduce((total, item) => total + item.nop, 0);
  const MyPDFDocument = ({ formattedTpNo }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.dateSize}>{getCurrentDateTimeFormatted()}</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.image} src={DGDCimage} />
        </View>
        <View style={styles.heading}>
          <Text style={styles.heading}>IMPORT TP</Text>
          <Text style={styles.heading}>DGDC SEEPZ SEZ STRONG ROOM</Text>
          <Text style={styles.heading}>
            MIAL LTD - CSI AIRPORT , AIR CARGO COMPLEX, SAHAR MUMBAI - 400099
          </Text>
          <View style={styles.viewheadingwithbox}>
            <Text style={styles.headingwithbox}>
              TRANSHIPMENT PERMIT FOR IMPORT
            </Text>
          </View>
          <Text style={styles.headingwithborder}>
            CONSOLIDATED IMPORT PRECIOUS CARGO TRANSFER MANIFEST
          </Text>
        </View>
        <View>
          <Text style={styles.normaltext}>
            For Date :{getCurrentDateTimeFormatted(selectedDate)} to{" "}
            {getCurrentDateTimeFormatted(selectedDate)} Transhipment Permit No &
            Dt. {formatTpNo(transhipmentPermitNo)}
          </Text>
        </View>
        <Line style={styles.line} />
        <Text style={{ fontSize: 9 }}>To,</Text>
        <Text style={{ fontSize: 9 }}>
          The Commissioner, of Custom ACC, Mumbai.
        </Text>
        <Text style={{ fontSize: 9 }}>
          Please Permit the Transhipment of Precious Cargo as detailed below
          from DGDC SEEPZ SEZ STRONG ROOM, SAHARACC to SEEPZ SEZ ANDHERI (E).
        </Text>
        <Line style={styles.line} />

        {renderTable()}

        <Text style={{ fontSize: 9 }}>
          {" "}
          Total No. Of Packages: {totalNoOfPackages}
        </Text>

        <View style={{ marginLeft: 270 }}>
          <Text style={{ fontWeight: "bold", fontSize: 9 }}>
            We declare the contents of the application to be truly stated
            {"\n"} {"\n"} {"\n"} {"\n"}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 9 }}>
            Signature Of Custodian _____________ {"\n"} {"\n"} {"\n"}{" "}
          </Text>
        </View>

        <View>
          <Text style={{ fontSize: 9 }}>
            Date & time _____________ {"\n"} {"\n"} {"\n"}{" "}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginRight: 9 }}>
          <View style={{ width: "50%" }}>
            <Text style={{ fontSize: 9 }}>
              Forwarded(....{totalNoOfPackages}
              ............)(............... {numberToWords(
                totalNoOfPackages
              )}{" "}
              ONLY.................................) Pkgs from DGDC SEEPZ
              SEZSTRONG ROOM AT AIR CARGO COMPLEX, SAHAR TODGDC SEEPZ SEZ STRONG
              ROOM AT GEM & JEWELLERYCOMPLEX, SEEPZ MAROL ANDHERI(E), MUMBAI -
              96 WITHM/s BVC BRINKS (CARTING AGENT) IN VEHICLE N0 :
              <Text style={styles.underlinedText}>{vehicleNo}</Text> AT
              ......HRS ON DATE ........ FOR FURTHER CLEARANCE THROUGH CUSTOMS.
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              Forwarders Signature _____________
            </Text>{" "}
            {/* Add the underline */}
          </View>{" "}
          {/* Add the underline */}
          <View style={styles.underline} />
          <View style={{ width: "50%", marginLeft: "9px" }}>
            <Text style={{ fontSize: 9 }}>
              Received(.....{totalNoOfPackages}
              ...........)(....................{" "}
              {numberToWords(totalNoOfPackages)} ONLY.........................)
              Pkgs from FROM DY/ ASST CUSTODIAN ,DGDC SEEPZ SEZ STRONG ROOM AT
              AIR , CARGOCOMPLEX, SAHAR AT .........ON DATE
              ...................FORTRANSHIPMENT TO DGDC SEEPZ SEZ STRONG ROOM
              AT,SEEPZ GEMS & JWELLERY CUSTOMS CLEARANCE CENTREVIDE CUSTOMS P.N.
              NO 5190 DTD 30/8/90. For BVC Security Transportion P. Ltd.
              {"\n"}
              {"\n"}
              {"\n"}
              {"\n"}
              Receivers Signature _____________
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", paddingTop: 27 }}>
          <View style={{ width: "50%" }}>
            <Text style={{ fontSize: 9 }}>
              Name _____________ {"\n"}
              {"\n"}
            </Text>
            <Text style={{ fontSize: 9, maxWidth: 180 }}>
              Dy/Asst Custodian DGDC SEEPZ SEZ Strong Room, Sahar, Mumbai - 99.
              {"\n"}
              {"\n"}
            </Text>
            <Text style={{ fontSize: 9 }}>
              Date _____________
              {"\n"}
              {"\n"}
            </Text>
          </View>

          <View style={{ width: "50%" }}>
            <Text style={{ fontSize: 9 }}>
              Name _____________ {"\n"}
              {"\n"}
            </Text>
            <Text style={{ fontSize: 9 }}>
              For M/s _____________ (Carting Agent)
              {"\n"}
              {"\n"}
            </Text>
            <Text style={{ fontSize: 9 }}>
              Date _____________
              {"\n"}
              {"\n"}
            </Text>
          </View>
        </View>

        <View style={{ textAlign: "center" }}>
          <View style={styles.viewheadingwithbox}>
            <Text style={styles.headingwithbox}>
              Total No. of Packages Forwarded & Received :{totalNoOfPackages}{" "}
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              {numberToWords(totalRows)} ONLY {"\n"}
              {"\n"}{" "}
            </Text>
            <Text style={styles.headingwithbox}>
              For Date :{getCurrentDateTimeFormatted(selectedDate)} to{" "}
              {getCurrentDateTimeFormatted(selectedDate)} {"\n"}
              {"\n"}{" "}
            </Text>

            <Text style={styles.headingwithbox}>
              Dir No : {"\n"}
              {"\n"}
              {"\n"}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );



  //ImportTp 
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
const getExcel = async (date) => {
  try {
    const formattedDate = formatDate(date);
    const filename = `ImportTP.xlsx`;

    const headers = {
      headers: {
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      responseType: 'blob',
    };

    const response = await axios.post(`http://${ipaddress}import/tpexcel?cid=${companyid}&bid=${branchId}&date=${formattedDate}&tpno=${transhipmentPermitNo}`, null, headers);

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
          icon={faIdCardClip}
          style={{
            marginRight: "8px",
            color: "black", // Set the color to golden
          }}
        />
        Import Transhipment Permit
      </h5>
      <Card style={{ backgroundColor: "#F8F8F8" }}>
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

                  {/* <Form.Control
                    type="date"
                    
                    max={today}
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    placeholder=" "
                  /> */}
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Label className="forlabel">
                  Transhipment Permit No
                </Form.Label>

                {/* <label className="forlabel">Transhipment Permit No</label> */}
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
              </Col>

              <Col md={3} style={{ paddingTop: 7 }}>
                <label className="forlabel">Vehicle No</label>
                <Input
                  type="text"
                  name="vehicleNo"
                  id="vehicleNo"
                  className=""
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                />
              </Col>

              <Col md={3}>
                <div style={{ marginTop: 30 }}>
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
            <div className="text-center">
              <Button
                type="button"
                variant="outline-primary"
                onClick={handleImportPrint}
                style={{
                  marginRight: "10px",
                  marginBottom: "15px",
                  textDecoration: "none",
                }}
              >
                <FontAwesomeIcon
                  icon={faPrint}
                  style={{ marginRight: "5px" }}
                />
                Print
              </Button>
              
              <Button
                type="button"
                variant="outline-success"
                style={{ marginRight: "10px", marginBottom: "15px" }}
                onClick={()=>getExcel(selectedDate)}
              >
                <FontAwesomeIcon
                  icon={faFileExcel}
                  style={{ marginRight: "5px" }}
                />
                XLS
              </Button>
             

              <Button
                type="button"
                variant="outline-primary"
                className="buttton"
                onClick={handlePdfImportTpData}
                style={{ marginBottom: "15px" }}
              >
                <FontAwesomeIcon
                  icon={faFilePdf}
                  style={{ marginRight: "5px" }}
                />
                PDF
              </Button>
            </div>
            <div className="table-responsive">
              <Table
                striped
                bordered
                hover
                className="table table-striped table-hover "
              >
                <thead>
                  <tr>
                  <th style={{ backgroundColor: "#BADDDA" }}>SR No</th>
                    <th style={{ backgroundColor: "#BADDDA" }}>SIR No</th>
                    <th style={{ backgroundColor: "#BADDDA" }}>Importer</th>
                    <th style={{ backgroundColor: "#BADDDA" }}>Pctm No</th>
                    <th style={{ backgroundColor: "#BADDDA" }}>No. of Pkg</th>
                    <th style={{ backgroundColor: "#BADDDA" }}>Description</th>
                    <th style={{ backgroundColor: "#BADDDA" }}>Weight</th>
                    <th style={{ backgroundColor: "#BADDDA" }}>Value</th>
                    <th style={{ backgroundColor: "#BADDDA" }}>
                      Origin Airport
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tpdata.map((item, index) => (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{item.sirNo}</td>
                      <td>{item.importerId}</td>
                      <td>{formatPctmNo(item.pctmNo)}</td>
                      <td>{item.nop}</td>
                      <td>{item.descriptionOfGoods}</td>
                      <td>{item.grossWeight}</td>
                      <td>{item.assessableValue}</td>
                      <td>{item.portOrigin}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
