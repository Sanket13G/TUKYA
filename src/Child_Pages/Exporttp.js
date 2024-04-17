
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext, useRef } from "react";
import "../Components/Style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import ipaddress from "../Components/IpAddress";
import Card from "react-bootstrap/Card";
import { CardBody, Input } from "reactstrap";
import DGDCimage from "../Images/DGDC.png";
import { saveAs } from "file-saver";
import axios from "axios";
import dgdcImage from "../Images/report.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import { faArrowsToEye, faBorderAll, faEye, faFileArrowUp, faSearch } from "@fortawesome/free-solid-svg-icons";
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
  Image,
} from "@react-pdf/renderer";
import { BlobProvider } from "@react-pdf/renderer";
import { data } from "jquery";
const styles = StyleSheet.create({
  page: {
    paddingTop: 18,
    paddingBottom: 54,
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
    paddingTop:5,
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
    fontSize:7,
    flexWrap: "wrap",
    width: 73,
    textAlign:'center'
  },
  tableCellHeader: {
    fontWeight: "bold",
    flexWrap: "wrap",
    width: 73,
    textAlign:'center',
    border: "0.4px solid black",
  },
});

export default function ExportTp() {
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

  const formatTpNo = (tpNo) => {
    // Remove leading zeros using a regular expression
    return tpNo.replace(/^0+/, '');
  };

  const CustomHeader = () => {
    return (
      <View style={styles.header}>
        <Image src={dgdcImage} style={styles.image} />
      </View>
    );
  };
  const today = new Date().toISOString().split("T")[0];

  // State to store selected date
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(new Date());

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
  const [Custodian, setCustodian] = useState("Sunil Patil");

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);

    // Replace this with your actual API call logic
    axios.get(`http://${ipaddress}exportshb/tpno?date=${formattedDate}&cid=${companyid}&bid=${branchId}`)
      
      .then((response) => {
        const data = response.data;
        console.log("dataaa ", data); 
        // Assuming data is an array containing Transhipment Permit No
        if (data && data.length > 0) {
          setResponseData(data); // Update responseData with fetched data
          // Log the updated data
        } else {
          setResponseData([]); // Update responseData to an empty array if no data available
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(()=>{
    handleDateChange(new Date())
  },[companyid,branchId])

  const handleTPDateChange = async (date) => {
    setSelectedDate(date);
    const formattedDate = formatDate(date);

    try {
      const response = await fetch(
        `http://${ipaddress}exportshb/getalldata?cid=${companyid}&bid=${branchId}&date=${formattedDate}&tpno=${transhipmentPermitNo}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setTpdata(data);
     
     
      } else {
        setTpdata([]);
      }

      setError(null); // Clear the error if data is successfully fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error); // Set the error state if there's an error
    }
  };
  
const [consoleName,setConsoleName] = useState('');
  const handleTranshipmentPermitNoChange = (value) => {
    setTranshipmentPermitNo(value);
    const console = responseData.find(data =>data.tpNo === value);
    setConsoleName(console.consoleAgent);
    handleTPDateChange(selectedDate);
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
    setVehicleNo('');
    setCustodian("Sunil Patil")
    handleDateChange(new Date());
    setConsoleName('');
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
  function fetchPartyName(companyId, branchId, partyId) {
    // Make an Axios GET request to retrieve the company name based on companyId
    return axios
      .get(
        `http://${ipaddress}export/findPartyName/${companyId}/${branchId}/${partyId}`
      )
      .then(function (response) {
        return response.data; // Return the retrieved company name
      })
      .catch(function (error) {
        console.error("Error fetching company name:", error);
        return ""; // Return an empty string or handle the error as needed
      });
  }
  const handleXLSDownload = async () => {
    const modifiedRecordList = await Promise.all(
      tpdata.map(async (item, index) => {
        // const companyname = await fetchCompanyName(item.companyId);
        // const branchname = await fetchBranchName(item.companyId, item.branchId);
        const partyName = await fetchPartyName(
          item.companyId,
          item.branchId,
          item.nameOfExporter
        );
        return {
          "Sr.No": index + 1,
          // "Company Name": companyname,
          // "Branch Name": branchname,
          "SER No": item.serNo,
          "SER Date": formatedDate(item.serDate),
          "Parcle Type": " ", 
          "NAME OF THE Exporter ": getpartyId[item.nameOfExporter],
          "NO OF PKGS": item.noOfPackages,
          "DESC": item.descriptionOfGoods,
          "VALUE IN RS": item.fobValueInINR,
          "PORT OF DESTINATION": item.portOfDestination,
        };
      })
    );
  
    const distanceRow = {
      "Sr.No": "",
      // "Company Name": "",
      // "Branch Name": "",
      "SER NO": "",
      "SER DATE": "",
      "PARCEL TYPE": "",
      "NAME OF THE Exporter ": "",
      "NO OF PKGS": "",
      "DESC": "",
      "VALUE IN RS": "",
      "PORT OF DESTINATION": "",
    };
   
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([
      ...modifiedRecordList,
    
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
  
    XLSX.utils.book_append_sheet(workbook, worksheet, "Export_Tp");
    const xlsFile = XLSX.write(workbook, { type: "binary", bookType: "xls" });
    const blob = new Blob([s2ab(xlsFile)], {
      type: "application/vnd.ms-excel",
    });
  
    saveAs(blob, "Export_Tp.xls");
  };
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };
  const PAGE_BREAK_ROWS = 30; // Adjust this based on how many rows fit on one page

  const PAGE_BREAK_ROWS_PDF = 18;
 
  
  const [totalFobValueInINR, setTotalFobValueInINR] = useState(0);


  


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
  
    const scales = ["", "Thousand", "Lakh", "Crore"];
  
    if (number === 0) return "Zero";
    if (number < 0) return "Minus " + numberToWords(-number);
  
    let wordsString = '';
  
    for (let i = 0; number > 0; i++) {
      if (number % 1000 !== 0) {
        const word = numberToWordsLessThanThousand(number % 1000);
        wordsString = word + ' ' + scales[i] + ' ' + wordsString;
      }
      number = Math.floor(number / 1000);
    }
  
    return wordsString.trim();
  }
  
  function numberToWordsLessThanThousand(number) {
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
  
    let wordsString = '';
  
    if (number > 99) {
      wordsString += words[Math.floor(number / 100)] + " Hundred ";
      number %= 100;
    }
  
    if (number > 19) {
      wordsString += tensWords[Math.floor(number / 10)];
      number %= 10;
    }
  
    if (number > 0) {
      wordsString += words[number];
    }
  
    return wordsString;
  }
  

  // Example usage:


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

  const [pdfBlob, setPdfBlob] = useState(null);
  


  const [totalNoOfPackages, setTotalNoOfPackages] = useState(0);
  // const [totalFobValueInINR, setTotalFobValueInINR] = useState(0);

  // Calculate totals when the tpdata changes
  useEffect(() => {
    let packagesTotal = 0;
    let fobValueTotal = 0;

    tpdata.forEach((item) => {
      packagesTotal += item.noOfPackages;
      fobValueTotal += item.fobValueInINR;
    });

    setTotalNoOfPackages(packagesTotal);
    setTotalFobValueInINR(fobValueTotal);
  }, [tpdata]);



  //Export TP

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
    const filename = `ExportTP.xlsx`;

    const headers = {
      headers: {
        Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      responseType: 'blob',
    };

    const response = await axios.post(`http://${ipaddress}exportshb/tpexcel?cid=${companyid}&bid=${branchId}&date=${formattedDate}&tpno=${transhipmentPermitNo}`, null, headers);

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


  const tpPdf = async(date,tp,vehicle) =>{
    const formattedDate = formatDate(date);
    const params = {
      companyId: companyid,
      branchId: branchId,
      tpdate: formattedDate,
      tpno: tp,
      vehicle: vehicle,
      custodian: Custodian    
    };
  
    await axios.post(`http://${ipaddress}exportshb/exportTPReport?companyId=${companyid}&branchId=${branchId}&tpdate=${formattedDate}&tpno=${tp}&vehicle=${vehicle}&custodian=${Custodian}&console=${consoleName}`)
    .then((response)=>{
      const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF
        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);
        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'ExportTP.pdf'; // Set the filename for the downloaded PDF
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
      .catch((error)=>{
        if(error){
          toast.error("Something went wrong",{
            autoClose:1000
          })
        }
      })      
  }


  const tpPrint = async(date,tp,vehicle) =>{
    const formattedDate = formatDate(date);
    


    const params = {
      companyId: companyid,
      branchId: branchId,
      tpdate: formattedDate,
      tpno: tp,
      vehicle: vehicle,
      custodian: Custodian    
    };
  
    await axios.post(`http://${ipaddress}exportshb/exportTPReport?companyId=${companyid}&branchId=${branchId}&tpdate=${formattedDate}&tpno=${tp}&vehicle=${vehicle}&custodian=${Custodian}&console=${consoleName}`)
    .then((response)=>{
      const base64PDF = response.data;

      // Create a new window for displaying the PDF
      const newWindow = window.open("", "_blank");

      // Write the HTML content to the new window
      newWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Export TP</title>
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
    .catch((error)=>{
      if(error){
        toast.error("Something went wrong",{
          autoClose:1000
        })
      }
    })      
  }



  const forwardPdf = async(date,tp,vehicle) =>{
    const formattedDate = formatDate(date);
   
  
    await axios.post(`http://${ipaddress}exportshb/exportForwardingReport?companyId=${companyid}&branchId=${branchId}&tpdate=${formattedDate}&tpno=${tp}&vehicle=${vehicle}&custodian=${Custodian}&console=${consoleName}`)
    .then((response)=>{
      const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF
        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);
        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'ForwardingLetter.pdf'; // Set the filename for the downloaded PDF
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
      .catch((error)=>{
        if(error){
          toast.error("Something went wrong",{
            autoClose:1000
          })
        }
      })      
  }


  const forwardPrint = async(date,tp,vehicle) =>{
    const formattedDate = formatDate(date);
    


  
    await axios.post(`http://${ipaddress}exportshb/exportForwardingReport?companyId=${companyid}&branchId=${branchId}&tpdate=${formattedDate}&tpno=${tp}&vehicle=${vehicle}&custodian=${Custodian}&console=${consoleName}`)
    .then((response)=>{
      const base64PDF = response.data;

      // Create a new window for displaying the PDF
      const newWindow = window.open("", "_blank");

      // Write the HTML content to the new window
      newWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Forwarding Letter</title>
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
    .catch((error)=>{
      if(error){
        toast.error("Something went wrong",{
          autoClose:1000
        })
      }
    })      
  }



  return (
    <div className="Container" >
      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
        icon={faFileArrowUp}
        style={{
          marginRight: '8px',
          color: 'black', // Set the color to golden
        }}
      />Export TP Reports</h5>
      <Card >
        <CardBody>
          <Form>
            <Row>
              <Col md={3} >
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
                    customInput={<input style={{ width: '100%' }} />}
                  />

                




                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label className="forlabel">Transhipment Permit No</Form.Label>
                  <select
                    name="company"
                    className="form-select"
                    value={transhipmentPermitNo}
                    onChange={(e) => handleTranshipmentPermitNoChange(e.target.value)}
                  >
                    {responseData.length > 0 && <option>Select</option>}
                    {responseData.length > 0 &&
                      responseData.map((item) => {
                        // Remove leading zeros and display the number
                        const formattedTpNo = item.tpNo.replace(/^0+/, ''); // Removes leading zeros
                        return (
                          <option key={item.tpNo} value={item.tpNo}>
                            {formattedTpNo}
                          </option>
                        );
                      })}
                  </select>
                </Form.Group>
              </Col>

              <Col md={3} >
                <Form.Group>
                  <Form.Label className="forlabel">
                    Vehicle No
                  </Form.Label>

                  {/* <label className="forlabel">Vehicle No</label> */}
                  <Input
                    type="text"
                    name="vehicleNo"
                    placeholder="Enter Vehicle Number"
                    className=""
                    value={vehicleNo}
                    onChange={(e) => setVehicleNo(e.target.value)}
                  />
                </Form.Group>
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
              </div>


          </Form>
          <hr />
          <handlePDFDownload2 tpdata={tpdata} />

          <div hidden={!tpdata.length > 0}>
            <Row>
             
              <Col md={4}>
              <span>Download and print TP report</span>
              <div style={{  marginBottom: 9 }}>
                <button
                  style={{ marginLeft: 9 }}
                  className="btn btn-outline-primary btn-margin"
                  type="button"
                  onClick={()=>tpPrint(selectedDate,transhipmentPermitNo,vehicleNo)}
                >
                  <FontAwesomeIcon
                    icon={faPrint}
                    style={{ marginRight: "5px" }}
                  />
                  Print
                </button>
                <button
                  className="btn btn-outline-primary btn-margin"
                  type="button"
                  onClick={()=>tpPdf(selectedDate,transhipmentPermitNo,vehicleNo)}
                  style={{ marginLeft: "10px" }}
                >
                  <FontAwesomeIcon
                    icon={faFilePdf}
                    style={{ marginRight: "5px" }}
                  />
                  PDF
                </button>
                <button
                  className="btn btn-outline-success btn-margin"
                  type="button"
                  style={{ marginLeft: "10px", marginRight: 9 }}
                  onClick={()=>getExcel(selectedDate)}
                >
                  <FontAwesomeIcon
                    icon={faFileExcel}
                    style={{ marginRight: "5px" }}
                  />
                  XLS
                </button>
              </div>
              </Col>
              <Col md={4}></Col>
              <Col md={4}>
                <span>Download and Print forwarding letter</span>
                <br />
              <button
                  style={{ marginLeft: 9 }}
                  className="btn btn-outline-primary btn-margin"
                  type="button"
                  onClick={()=>forwardPrint(selectedDate,transhipmentPermitNo,vehicleNo)}
                >
                  <FontAwesomeIcon
                    icon={faPrint}
                    style={{ marginRight: "5px" }}
                  />
                  Print
                </button>
                <button
                  className="btn btn-outline-primary btn-margin"
                  type="button"
                  onClick={()=>forwardPdf(selectedDate,transhipmentPermitNo,vehicleNo)}
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

            <CardBody >
              <div className="table-responsive" >
                <Table className="table table-bordered text-center custom-table mt-3">
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#BADDDA" }}>SR No</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>ER No</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>ER Date</th>
                  
                      <th style={{ backgroundColor: "#BADDDA" }}>Exporter Name</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>No of Pkg</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>Description</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>Value Rs.</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>Destination</th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#BADDDA" }}>Total</th>
                      <th style={{ backgroundColor: "#BADDDA" }}> </th>
                      <th style={{ backgroundColor: "#BADDDA" }}> </th>
              
                      <th style={{ backgroundColor: "#BADDDA" }}> </th>
                      <th style={{ backgroundColor: "#BADDDA" }}>{totalNoOfPackages}</th>
                      <th style={{ backgroundColor: "#BADDDA" }}></th>
                      <th style={{ backgroundColor: "#BADDDA" }}>{totalFobValueInINR}</th>
                      <th style={{ backgroundColor: "#BADDDA" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tpdata.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.erNo}</td>
                        <td>{formatedDate(item.erDate)}</td>
                        
                        <td>{item.nameOfExporter}</td>
                        <td>{item.noOfPackages}</td>
                        <td>{item.descriptionOfGoods}</td>
                        <td>{item.fobValueInINR}</td>
                        <td>{item.portOfDestination}</td>
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

