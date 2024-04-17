
import jsPDF from "jspdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles

import html2canvas from "html2canvas";
import { redirect } from "react-router-dom";
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";

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
import axios from "axios";
import {
  faBold,
  faBolt,
  faFileExcel,
  faFilePdf,
  faPrint,
  faSearch,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";
import dgdcImage from "../Images/report.jpeg";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import ipaddress from "../Components/IpAddress";
import {
  Document,
  Page,
  Image as PdfImage,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { ViewWeek } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { toast } from "react-toastify";
import ReactLoading from 'react-loading';



export default function Delivery_order() {


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

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const today = new Date().toISOString().split("T")[0];
  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    login,
    logintype,
    logintypeid,
    logout,
  } = useContext(AuthContext);

  const formatDateTime1 = (value) => {
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
    return `${year}-${month}-${day} `;
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

  const [ConsoleList, setConsoleList] = useState([]);
  const [FetchRecord, setFetchRecord] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedConsole, setSelectedConsole] = useState("");
  const [flightNo, setflightNo] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e);
    // Update the selected date for datepikar
  };

  const handleConsoleChange = (e) => {
    const newConsole = e.target.value;
    setSelectedConsole(newConsole);
  };

  const getlist = () => {
    axios
      .get(
        `http://${ipaddress}import/getConsole/${companyid}/${branchId}/${formatDateTime1(
          selectedDate
        )}`
      )
      .then((response) => {
        setConsoleList(response.data);
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };
  useEffect(() => {
    getlist(); // Fetch the initial data with today's date
  }, [companyid, branchId, formatDateTime1(selectedDate)]);

  const handleShow = () => {
    axios
      .get(
        `http://${ipaddress}import/getImportList/${companyid}/${branchId}/${formatDateTime1(
          selectedDate
        )}/${selectedConsole}`
      )
      .then((response) => {
        setFetchRecord(response.data);
        
        if (response.data && response.data.length > 0) {
          // Extract the flightNo from the first record
          const firstRecordFlightNo = response.data[0].flightNo;
         // Update state or do whatever you need with the flightNo
          setflightNo(firstRecordFlightNo);
        } else {
          // Handle the case when there are no records in the response
          console.warn("No import records found");
        }
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };








  const formatDateTime = (value) => {
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

    return `${day}/${month}/${year} `;
  };

  const [mawbRecords, setMawbRecords] = useState({});

  const [uniqueMAWBs, setUniqueMAWBs] = useState(new Set());

  useEffect(() => {
    const uniqueMAWBSet = new Set(); // Create a new Set
    const mawbGroupedRecords = {};

    FetchRecord.forEach((item) => {
      const { mawb } = item;
      uniqueMAWBSet.add(mawb);

      // Add the record to the corresponding MAWB group in the object
      if (!mawbGroupedRecords[mawb]) {
        mawbGroupedRecords[mawb] = [];
      }
      mawbGroupedRecords[mawb].push(item);
    });
    setUniqueMAWBs(uniqueMAWBSet); // Update the state with unique MAWB values
    setMawbRecords(mawbGroupedRecords); // Update the state with grouped records
  }, [FetchRecord]);

  // console.log("format date ", formatDateTime1(selectedDate));

  const [externalPartys, setExternalPartys] = useState([]);

  useEffect(() => {
    const fetchExternalParty = async () => {
      try {
        const response = await fetch(
          `http://${ipaddress}import/getExternalPartys/${companyid}/${branchId}`
        );
        if (response.ok) {
          const data = await response.json();
          setExternalPartys(data); // Set the fetched data in state
        } else {
          console.error("Error fetching party names:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching party names:", error);
      }
    };

    fetchExternalParty();
  }, [companyid, branchId]);

  function getUsernameByExternalPartyId(externalPartyId) {
    const party = externalPartys.find(
      (party) => party.externaluserId === externalPartyId
    );
    return party ? party.userName : null;
  }

  const handlePrint = () => {
    const dgdc1 = dgdcImage;
    // Create an Image object to preload the image
    const image = new Image();
    image.src = dgdc1;

    // Add an onload event handler to execute the print code when the image is loaded
    image.onload = () => {
      handleDelayedPrint(dgdc1);
    };
  };

  const handleDelayedPrint = (dgdc) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`<!DOCTYPE html>
    <html>
    <head>    
    <title>Delivery Order Report</title>

        <style>
        @page {
          margin: 1cm;
     /* Adjust this value to position the header correctly */
      }

      .printable-area {
          font-family: Arial, sans-serif;
      }

      table {
          width: 100%;
          border-collapse: collapse;
      }

      th {
        border: 1px solid #dddddd;
        text-align: center;
       
        font-size: 12px; /* Set font size for td elements */
    }
    
    td {
      border: 1px solid #dddddd;
      text-align: center;
      padding: 2; /* Set padding for both th and td */
      font-size: 10px; /* Set font size for td elements */
  }
      .BText {
        font-weight: bold;
      }
      .BSize{
        font-size:14px;
      }
      th {
          background-color: #f2f2f2;
      }

      .header img {
          max-width: auto; /* Ensure the image doesn't exceed the page width */
          max-height: auto; /* Adjust the maximum image height as needed */
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
  `);

    const mawbs = Object.keys(mawbRecords);

    mawbs.forEach((mawb, index) => {
      let totalNOP = 0;
      const doNumber = mawbRecords[mawb][0].doNumber; // Assuming the doNumber is the same for all records in a Mawb
      const sirdate = mawbRecords[mawb][0].sirDate; // Assuming the doNumber is the same for all records in a Mawb
      const igmNo = mawbRecords[mawb][0].igmNo; // Assuming the doNumber is the same for all records in a Mawb

      printWindow.document.write(`
      <div id="page-header">
      <img src="${dgdc}" alt="Header Image" style="max-width: 306px; max-height: 306px;"> 
      </div>
        <h4>
          Delivery Order No:DGDC- ${doNumber}
        </h4>
        
        <div style="text-align: right;">
          <h4>Date:${formatDateTime(new Date())} </h4>
        </div>
          <div style="text-align: center;">  
          <p class="BText BSize">Please deliver to M/S.${getUsernameByExternalPartyId(
        selectedConsole
      )} or order the following packages which arrived Ex.Airport. No.Mientioned - below : ${flightNo} dated ${formatDateTime(
        sirdate
      )} Recd. on ${formatDateTime(selectedDate)} IGM No.${igmNo}</p>
        </div>
      </div>
      <h4 style="text-align: left;">Master AWB No: ${mawb} </h4>
      <table>
              <thead>
                  <tr>
                  <th>CONSIGNMENT NOTE NO.MAWB/HAWB NO</th>
                  <th>SIR NO </th>
                  <th>IMPORTER</th>
                  <th>PKG</th>
                  <th>CONTENTS</th>
                  </tr>
              </thead>              
      `);
      mawbRecords[mawb].forEach((record, recordIndex) => {
        const NOP = record.nop;
        totalNOP += NOP;
        printWindow.document.write(`
        <tbody>
                  <tr>
                      <td>${record.hawb.startsWith('000') ? '' : record.hawb}</td>
                      <td>${record.sirNo}</td>
                      <td>${getpartyId[record.importerId]}</td>
                      <td>${record.nop}</td>
                      <td>${record.packageContentType}</td>
                  </tr>
        `);
      });
      printWindow.document.write(`
                <tr>
                <td></td>
                <td></td>
                <td class="BText">Total No Of Packages</td>
                <td class="BText">${totalNOP}</td>
                <td></td>
            </tr>
          </tbody>
          </table>
          </div>
          <div >
          <p style="float: right; margin-right: 20px; margin-top: 10px; font-size:12px;">(For DGDC LIMITED)</p>
          </div>

      `);
      if (index < mawbs.length - 1) {
        printWindow.document.write(
          '<div style="page-break-after: always;"></div>'
        );
      }
    });
    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

  const generateXLS = async () => {
    const recordsForExcel = FetchRecord.map((item, index) => ({
      "Sr.No": index + 1,
      "Do Number": item.doNumber,
      "Do Date": formatDateTime(item.doDate),
      MAHB: item.mawb,
      HAMB: item.hawb.startsWith('000') ? '' : item.hawb,
      IGM: item.igmNo,
      "SIR No": item.sirNo,
      "SIR Date": formatDateTime(item.sirDate),
      "Parcel Type": item.parcelType,
      Importer: getpartyId[item.importerId],
      "NO Of Package": item.nop,
      Contents: item.packageContentType,
    }));

    const worksheet = XLSX.utils.json_to_sheet(recordsForExcel);

    // Add headers to the worksheet
    worksheet["A1"] = { t: "s", v: "SI.No" };
    worksheet["B1"] = { t: "s", v: "DO Number" };
    worksheet["C1"] = { t: "s", v: "DO Date" };
    worksheet["D1"] = { t: "s", v: "MAHB" };
    worksheet["E1"] = { t: "s", v: "HAMB" };
    worksheet["F1"] = { t: "s", v: "IGM No" };
    worksheet["G1"] = { t: "s", v: "SIR No" };
    worksheet["H1"] = { t: "s", v: "SIR Date" };
    worksheet["I1"] = { t: "s", v: "Parcel Type" };
    worksheet["J1"] = { t: "s", v: "Importer" };
    worksheet["K1"] = { t: "s", v: "NO Of Package" };
    worksheet["L1"] = { t: "s", v: "Contents" };

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Delivery_Order");

    const xlsFile = XLSX.write(workbook, { type: "binary", bookType: "xls" });
    const blob = new Blob([s2ab(xlsFile)], {
      type: "application/vnd.ms-excel",
    });
    saveAs(blob, "Delivery_Order.xls");
  };
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  function addPageNumbers(pdf, pageNumber, totalPageCount) {
    pdf.setPage(pageNumber); // Set the current page
    pdf.setFontSize(12);
    pdf.text(
      `Page ${pageNumber} of ${totalPageCount}`,
      pdf.internal.pageSize.getWidth() - 50,
      pdf.internal.pageSize.getHeight() - 10
    );
  }
  const handlePDFDownload = () => {
    const totalMawbRecords = Object.keys(mawbRecords).length;
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      margins: { top: 10, right: 10, bottom: 10, left: 10 },
    });

    const generateCoverPage = () => {
      // Ensure that dgdcImage2 contains a valid image source

      if (dgdcImage) {
        const imageWidth = 100; // Adjust as needed
        const imageHeight = 40; // Adjust as needed

        // Create a <div> element to center the image within the text
        pdf.html("<div id='image-container'></div>");

        // Calculate X and Y positions to center the image within the <div>
        const divWidth = pdf.internal.pageSize.getWidth();
        const x = (divWidth - imageWidth) / 2;

        // Add the image to the <div>
        pdf.addImage(
          dgdcImage,
          "JPEG",
          x,
          10,
          imageWidth,
          imageHeight,
          "image-container"
        );
      } else {
        console.error("Invalid or missing image source (dgdcImage).");
      }
      // Customize cover page content
      pdf.setFontSize(25);
      pdf.setFont("helvetica", "bold");
      pdf.text(
        `Delivery Order Report : ${formatDateTime(selectedDate)}`,
        35,
        85
      ); // Adjust text position
      pdf.text(`Generated By - ${username}`, 40, 100); // Adjust text position
      pdf.text(`Generated On -  ${formatDateTime(new Date())}`, 45 + 5, 115); // Adjust text position
      pdf.setFont("helvetica", "normal");
      pdf.addPage();
    };
    generateCoverPage(); // Add the cover page at the beginning

    Object.keys(mawbRecords).forEach((mawb, index) => {
      if (index > 0) {
        pdf.addPage();
      }
      const doNumber = mawbRecords[mawb][0].doNumber; // Assuming the doNumber is the same for all records in a Mawb
      const sirdate = mawbRecords[mawb][0].sirDate; // Assuming the doNumber is the same for all records in a Mawb
      const igmNo = mawbRecords[mawb][0].igmNo; // Assuming the doNumber is the same for all records in a Mawb

      // Increase the height of the image
      if (dgdcImage) {
        const imageWidth = 100; // Adjust as needed
        const imageHeight = 40; // Adjust as needed

        // Create a <div> element to center the image within the text
        pdf.html("<div id='image-container'></div>");

        // Calculate X and Y positions to center the image within the <div>
        const divWidth = pdf.internal.pageSize.getWidth();
        const x = (divWidth - imageWidth) / 2;

        // Add the image to the <div>
        pdf.addImage(
          dgdcImage,
          "JPEG",
          x,
          10,
          imageWidth,
          imageHeight,
          "image-container"
        );
      }
      const startY = 50;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(12);
      pdf.text(` Delivery Order No:DGDC-${doNumber}`, 65, startY + 10);

      pdf.text(
        `DATE :${formatDateTime(new Date())}`,
        pdf.internal.pageSize.getWidth() - 60,
        startY + 15
      );

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text(
        `Please deliver to M/S.${getUsernameByExternalPartyId(
          selectedConsole
        )} or order the following packages which arrived Ex.Airport.`,
        15,
        startY + 25
      );
      pdf.text(
        `No.Mentioned - below : ${flightNo} dated ${formatDateTime(
          sirdate
        )} Recd. on ${formatDateTime(selectedDate)} IGM No.${igmNo}`,
        15,
        startY + 30
      );
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text(`Master AWB No: ${mawb}`, 15, startY + 45);
      pdf.setFont("helvetica", "normal");

      const totalCountNop = mawbRecords[mawb].reduce(
        (total, record) => total + record.nop,
        0
      );
      const tableBody = mawbRecords[mawb].map((record) => [
        record.hawb.startsWith('000') ? '' : record.hawb,
        record.sirNo,
        getpartyId[record.importerId],
        record.nop,
        record.packageContentType,
      ]);
      // Add the total count to the table
      tableBody.push([
        "",
        "",
        {
          content: "Total No of Packages",
          styles: { fontStyle: "bold", fontSize: 12 },
        },
        { content: totalCountNop, styles: { fontStyle: "bold", fontSize: 12 } },
        "",
      ]);
      const tableStyles = {
        theme: "plain",
        styles: {
          cellPadding: 2,
          fontSize: 11,
          cellWidth: "auto",
          valign: "middle",
          halign: "center",
          lineWidth: 0.5,
          lineColor: [0, 0, 0],
        },
        headStyles: { textColor: [0, 0, 0] },
      };
      const availableWidth = pdf.internal.pageSize.getWidth() - 20; // Adjust as needed

      pdf.autoTable({
        head: [
          [
            "CONSIGNMENT NOTE NO.MAWB/HAWB NO",
            "SIR NO",
            "IMPORTER",
            "PKG",
            "CONTENTS",
          ],
        ],
        body: tableBody,
        startY: startY + 55,
        columnStyles: {
          0: { columnWidth: "auto" }, // Consignment Note No.MAWB/HAWB No
          1: { columnWidth: "auto" }, // SIR NO
          2: { columnWidth: "auto" }, // IMPORTER
          3: { columnWidth: "auto" }, // PKG
          4: { columnWidth: "auto" }, // CONTENTS
        },
        tableWidth: availableWidth, // Set the table width to the available width
        pageBreak: "auto", // Enable automatic page breaks if the table exceeds the page width
        addPageContent: function (data) {
          if (data.table.width > availableWidth) {
            pdf.addPage();
          }

          pdf.text(
            "( For DGDC LIMITED )",
            availableWidth - 40,
            data.cursor.y + 10
          );
        },
        ...tableStyles,
      });
    });

    pdf.save("Delivery_Order_Report.pdf");
  };

  const [getWithoutDoNumber, setWithoutDoNumber] = useState([]);

  useEffect(() => {
    // Make the API request when the component mounts
    fetch(
      `http://${ipaddress}import/getDoNumberForUpdate/${companyid}/${branchId}`
    )
      .then((response) => response.json())
      .then((responseData) => {
        // Update the state with the API data
        setWithoutDoNumber(responseData);
        // console.log(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // The empty dependency array ensures this effect runs only once

  // const handleGenrateDo = () => {
  //   fetch(
  //     `http://${ipaddress}import/getUpdateDoNumber/${companyid}/${branchId}`
  //   )
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       setWithoutDoNumber(responseData);
  //       toast.success(`Update Do Number successfully`);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       toast.error(`Update Do Number successfully`);
  //     });
  // };

  const handleGenrateDo = () => {
    // Set loading to true initially
    setLoading(true);

    fetch(`http://${ipaddress}import/getUpdateDoNumber/${companyid}/${branchId}`)
      .then((response) => response.json())
      .then((responseData) => {
        setWithoutDoNumber(responseData);
        toast.success(`Update Do Number successfully`);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error(`Error while updating the Do Number`);
      })
      .finally(() => {
        // Set loading to false after the fetch operation is complete
        setLoading(false);
      });
  };



  // Deleivery Order

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
    const filename = `Delivery_Order_${formatDateTime2(new Date())}.xlsx`; // Note: Changed file extension to xlsx
    axios.post(`http://${ipaddress}import/doexcel`, imp, { responseType: 'blob' }) // Added responseType: 'blob'
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


  useEffect(() => {
 if(logintype === 'Console')
  {
    setSelectedConsole(logintypeid);
    handleShowConsole();
  }
  }, []);

// Delivery Order By User Type 
const handleShowConsole = () => {
  axios
    .get(
      `http://${ipaddress}import/getImportList/${companyid}/${branchId}/${formatDateTime1(
        selectedDate
      )}/${logintypeid}`
    )
    .then((response) => {
      setFetchRecord(response.data);
      
      if (response.data && response.data.length > 0) {
        // Extract the flightNo from the first record
        const firstRecordFlightNo = response.data[0].flightNo;
       // Update state or do whatever you need with the flightNo
        setflightNo(firstRecordFlightNo);
      } else {
        // Handle the case when there are no records in the response
        console.warn("No import records found");
      }
    })
    .catch((error) => {
      console.error("GET list error:", error);
    });
};


const formatDate = (date) => {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  return formattedDate;
};



const doPdf = async(date,console) =>{
  const formattedDate = formatDate(date);
 

  await axios.post(`http://${ipaddress}import/importDoReport?companyId=${companyid}&branchId=${branchId}&doDate=${formattedDate}&console=${console}`)
  .then((response)=>{
    const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF
      // Create a Blob from the Base64 data
      const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
      // Create a URL for the Blob
      const blobUrl = URL.createObjectURL(pdfBlob);
      // Create an anchor element for downloading
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = 'DO.pdf'; // Set the filename for the downloaded PDF
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


const doPrint = async(date,console) =>{
  const formattedDate = formatDate(date);
  



  await axios.post(`http://${ipaddress}import/importDoReport?companyId=${companyid}&branchId=${branchId}&doDate=${formattedDate}&console=${console}`)
  .then((response)=>{
    const base64PDF = response.data;

    // Create a new window for displaying the PDF
    const newWindow = window.open("", "_blank");

    // Write the HTML content to the new window
    newWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>DO</title>
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
    <>
      {loading && (
        <div style={styles.overlay}>
          <ReactLoading type="spin" color="#0000FF" height={300} width={80} />
        </div>
      )}


      {(logintype === 'Console') ? (
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
              icon={faTruckFast}
              style={{
                marginRight: "8px",
                color: "black", // Set the color to golden
              }}
            />
            Delivery Order
          </h5>


          <Card
            style={{
              marginTop: 25,
              marginRight: 18,
              marginLeft: 18,
              padding: 8,
            }}
          >
            <div className="container">
              <Row>
                <Col sm={3}>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">
                      Select delivery order date
                      <span style={{ color: "red" }}>*</span>
                    </Label>
                    <div>
                      <DatePicker
                        selected={selectedDate}
                        wrapperClassName="custom-react-datepicker-wrapper"
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy" // Customize the date format if needed
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "100%" }} />} // You can add custom CSS classes
                      />
                    </div>
                  </FormGroup>
                </Col>
                
              <Col sm={4}>
                  <div style={{ marginTop: 31 }}>
                    <Button
                      outline
                      type="button"
                      color="primary"
                      style={{ marginRight: 20, marginLeft: "10px" }}
                      onClick={handleShowConsole}
                    >
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{ marginRight: "5px" }}
                      />
                      Show
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
            {FetchRecord.length !== 0 && (
              <CardBody>
                <div className="text-end" style={{ marginTop: 23 }}>
                  <button
                    className="btn btn-outline-primary btn-margin"
                    type="button"
                    onClick={()=>doPrint(selectedDate,selectedConsole)}
                  >
                    <FontAwesomeIcon
                      icon={faPrint}
                      style={{ marginRight: "5px" }}
                    />
                    Print
                  </button>
                  <button
                    className="btn btn-outline-success btn-margin"
                    type="button"
                    style={{ marginLeft: "10px" }}
                    onClick={() => getExcel(FetchRecord)}
                  >
                    <FontAwesomeIcon
                      icon={faFileExcel}
                      style={{ marginRight: "5px" }}
                    />
                    XLS
                  </button>
                  <button
                    className="btn btn-outline-primary btn-margin"
                    type="button"
                    onClick={()=>doPdf(selectedDate,selectedConsole)}
                    style={{ marginLeft: "10px" }}
                  >
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      style={{ marginRight: "5px" }}
                    />
                    Pdf
                  </button>
                </div>

                <hr />
                <Table style={{ marginTop: 10 }} striped responsive bordered>
                  <thead>
                    <tr>
                      <th style={{ background: "#BADDDA" }}>SR.NO</th>
                      <th style={{ background: "#BADDDA" }}>DO NUMBER</th>
                      <th style={{ background: "#BADDDA" }}>DO DATE</th>
                      <th style={{ background: "#BADDDA" }}>MAHB</th>
                      <th style={{ background: "#BADDDA" }}>HAMB</th>
                      <th style={{ background: "#BADDDA" }}>IGM</th>
                      <th style={{ background: "#BADDDA" }}>SIR NO</th>
                      <th style={{ background: "#BADDDA" }}>SIR DATE</th>
                      <th style={{ background: "#BADDDA" }}>PARCEL TYPE</th>
                      <th style={{ background: "#BADDDA" }}>IMPORTER</th>
                      <th style={{ background: "#BADDDA" }}>NO.OF PACKAGE</th>
                      <th style={{ background: "#BADDDA" }}>CONTENTS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FetchRecord.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.doNumber}</td>
                        <td>{formatDateTime(item.doDate)}</td>
                        <td>{item.mawb}</td>
                        <td>{item.hawb.startsWith('000') ? '' : item.hawb}</td>
                        <td>{item.igmNo}</td>
                        <td>{item.sirNo}</td>
                        <td>{formatDateTime(item.sirDate)}</td>
                        <td>{item.parcelType}</td>

                        <td>{getpartyId[item.importerId]}</td>
                        <td>{item.nop}</td>
                        <td>{item.packageContentType}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            )}
          </Card>

        </div>


      )
        :
        (

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
                icon={faTruckFast}
                style={{
                  marginRight: "8px",
                  color: "black", // Set the color to golden
                }}
              />
              Delivery Order
            </h5>
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
                  onClick={getlist}
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
                <CardBody>
                  <hr />
                  <Table style={{ marginTop: 10 }} striped responsive bordered>
                    <thead>
                      <tr>
                        <th style={{ background: "#BADDDA" }}>Sr No</th>
                        <th style={{ background: "#BADDDA" }}>MAWB</th>
                        <th style={{ background: "#BADDDA" }}>HAWB</th>
                        <th style={{ background: "#BADDDA" }}>IGM NO</th>
                        <th style={{ background: "#BADDDA" }}>SIR NO</th>
                        <th style={{ background: "#BADDDA" }}>SIR DATE</th>
                        <th style={{ background: "#BADDDA" }}>PARCEL TYPE</th>
                        <th style={{ background: "#BADDDA" }}>IMPORTER</th>
                        <th style={{ background: "#BADDDA" }}>NO.OF PACKAGE</th>
                        <th style={{ background: "#BADDDA" }}>CONTENTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getWithoutDoNumber.length === 0 ? (
                        <tr>
                          <td colSpan="9" style={{ textAlign: "center" }}>
                            No records found
                          </td>
                        </tr>
                      ) : (
                        getWithoutDoNumber.map((item, index) => (
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td>{item.mawb}</td>
                            <td>{item.hawb.startsWith('000') ? '' : item.hawb}</td>
                            <td>{item.igmNo}</td>
                            <td>{item.sirNo}</td>
                            <td>{formatDateTime(item.sirDate)}</td>
                            <td>{item.parcelType}</td>
                            <td>{getpartyId[item.importerId]}</td>
                            <td>{item.nop}</td>
                            <td>{item.packageContentType}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                  {getWithoutDoNumber.length > 0 && (
                    <div className="text-end" style={{ marginTop: 23 }}>
                      <button
                        type="button"
                        className="btn gap-2 btn-outline-success"
                        onClick={handleGenrateDo}
                      >
                        <FontAwesomeIcon
                          icon={faBolt}
                          style={{ marginRight: "5px" }}
                        />
                        Generate DO
                      </button>
                    </div>
                  )}
                </CardBody>
              </div>

              <div
                className="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <Card
                  style={{
                    marginTop: 25,
                    marginRight: 18,
                    marginLeft: 18,
                    padding: 8,
                  }}
                >
                  <div className="container">
                    <Row>
                      <Col sm={4}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">
                            Select delivery order date
                            <span style={{ color: "red" }}>*</span>
                          </Label>
                          <div>
                            <DatePicker
                              selected={selectedDate}
                              wrapperClassName="custom-react-datepicker-wrapper"
                              onChange={handleDateChange}
                              dateFormat="dd/MM/yyyy" // Customize the date format if needed
                              className="form-control border-right-0 inputField"
                              customInput={<input style={{ width: "100%" }} />} // You can add custom CSS classes
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      {/* <Col sm={4}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="inputhead">
                        Select delivery order date
                      </Form.Label>
                      <Form.Control
                        type="date"
                        placeholder=" "
                        value={selectedDate}
                        onChange={handleDateChange} // Handle date change
                      />
                    </Form.Group>
                  </Col> */}
                      <Col sm={4}>
                        <Label className="forlabel" for="branchId">
                          Select Console
                        </Label>
                        <select
                          name="company"
                          id="hold"
                          className="form-control form-select"
                          value={selectedConsole}
                          onChange={handleConsoleChange}
                        >
                          <option className="" value="">
                            Select
                          </option>
                          {ConsoleList.map(
                            (consoleItem, index) =>
                              consoleItem && (
                                <option
                                  key={index}
                                  value={consoleItem.externaluserId}
                                >
                                  {consoleItem.userName}
                                </option>
                              )
                          )}
                        </select>
                      </Col>
                      <Col sm={4}>
                        <div style={{ marginTop: 31 }}>
                          <Button
                            outline
                            type="button"
                            color="primary"
                            style={{ marginRight: 20, marginLeft: "10px" }}
                            onClick={handleShow}
                          >
                            <FontAwesomeIcon
                              icon={faSearch}
                              style={{ marginRight: "5px" }}
                            />
                            Show
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {FetchRecord.length !== 0 && (
                    <CardBody>
                      <div className="text-end" style={{ marginTop: 23 }}>
                        <button
                          className="btn btn-outline-primary btn-margin"
                          type="button"
                          onClick={()=>doPrint(selectedDate,selectedConsole)}
                        >
                          <FontAwesomeIcon
                            icon={faPrint}
                            style={{ marginRight: "5px" }}
                          />
                          Print
                        </button>
                        <button
                          className="btn btn-outline-success btn-margin"
                          type="button"
                          style={{ marginLeft: "10px" }}
                          onClick={() => getExcel(FetchRecord)}
                        >
                          <FontAwesomeIcon
                            icon={faFileExcel}
                            style={{ marginRight: "5px" }}
                          />
                          XLS
                        </button>
                        <button
                          className="btn btn-outline-primary btn-margin"
                          type="button"
                          onClick={()=>doPdf(selectedDate,selectedConsole)}
                          style={{ marginLeft: "10px" }}
                        >
                          <FontAwesomeIcon
                            icon={faFilePdf}
                            style={{ marginRight: "5px" }}
                          />
                          Pdf
                        </button>
                      </div>

                      <hr />
                      <Table style={{ marginTop: 10 }} striped responsive bordered>
                        <thead>
                          <tr>
                            <th style={{ background: "#BADDDA" }}>SR.NO</th>
                            <th style={{ background: "#BADDDA" }}>DO NUMBER</th>
                            <th style={{ background: "#BADDDA" }}>DO DATE</th>
                            <th style={{ background: "#BADDDA" }}>MAWB</th>
                            <th style={{ background: "#BADDDA" }}>HAMB</th>
                            <th style={{ background: "#BADDDA" }}>IGM</th>
                            <th style={{ background: "#BADDDA" }}>IR NO</th>
                            <th style={{ background: "#BADDDA" }}>IR DATE</th>
                        
                            <th style={{ background: "#BADDDA" }}>IMPORTER</th>
                            <th style={{ background: "#BADDDA" }}>NO.OF PACKAGE</th>
                            <th style={{ background: "#BADDDA" }}>CONTENTS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {FetchRecord.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.doNumber}</td>
                              <td>{formatDateTime(item.doDate)}</td>
                              <td>{item.mawb}</td>
                              <td>{item.hawb.startsWith('000') ? '' : item.hawb}</td>
                              <td>{item.igmNo}</td>
                              <td>{item.sirNo}</td>
                              <td>{formatDateTime(item.sirDate)}</td>
                              <td>{getpartyId[item.importerId]}</td>
                              <td>{item.nop}</td>
                              <td>{item.packageContentType}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                  )}
                </Card>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}
