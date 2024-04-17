
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import { toast } from "react-toastify";
import axios from "axios";
import {
  faBold,
  faBolt,
  faFilePdf,
  faIdBadge,
  faPassport,
  faPrint,
  faRefresh,
  faSearch,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dgdcImage from "../Images/report.jpeg";
import ipaddress from "../Components/IpAddress";
import DatePicker from "react-datepicker";
import { Card, CardBody, Col, FormGroup, Input, Label, Row } from "reactstrap";
import jsPDF from "jspdf";

export default function Carting_Agent() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

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
    logout,
  } = useContext(AuthContext);

  const formatDateTime1 = (value) => {
    if (!value) {
      return "";
    }
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day} `;
  };

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
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const [ConsoleList, setConsoleList] = useState([]);
  const [FetchRecord, setFetchRecord] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedConsole, setSelectedConsole] = useState("");
  const [tpNumber, setTpNumber] = useState("");
  const [vanNumber, setVanNumber] = useState("");
  const [consoleError, setConsoleError] = useState("");
  const [tpNumberError, setTpNumberError] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    getlist(formatDateTime1(selectedDate));
  }, [selectedDate]);

  const resetForm = () => {
    setSelectedDate(new Date());
    setSelectedConsole("");
    setTpNumber("");
    setVanNumber("");
    setConsoleError("");
    setTpNumberError("");
    setFormValid(false);
  };

  const handleConsoleChange = (e) => {
    const newConsole = e.target.value;
    setSelectedConsole(newConsole);
    getTPlist();
  };

  const handleTpNumber = (e) => {
    setTpNumber(e.target.value);
  };

  const getlist = (date) => {
    axios
      .get(
        `http://${ipaddress}exportshb/getConsoleAgent/${companyid}/${branchId}/${date}`
      )
      .then((response) => {
        setConsoleList(response.data);
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getTPlist();
  }, [selectedDate, selectedConsole]);

  const getTPlist = () => {
    axios
      .get(
        `http://${ipaddress}exportshb/getExportTpList/${companyid}/${branchId}/${formatDateTime1(
          selectedDate
        )}/${selectedConsole}`
      )
      .then((response) => {
        setFetchRecord(response.data);
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };
  console.log(FetchRecord);
  const [externalPartys, setExternalPartys] = useState([]);

  useEffect(() => {
    const fetchExternalParty = async () => {
      try {
        const response = await fetch(
          `http://${ipaddress}import/getExternalPartys/${companyid}/${branchId}`
        );
        if (response.ok) {
          const data = await response.json();
          setExternalPartys(data);
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

  const validateForm = () => {
    let isValid = true;

    if (!selectedConsole) {
      setConsoleError("Please select a Carting Agent");
      isValid = false;
    } else {
      setConsoleError("");
    }

    if (!tpNumber) {
      setTpNumberError("Please select a TP Number");
      isValid = false;
    } else {
      setTpNumberError("");
    }

    setFormValid(isValid);
    return isValid;
  };

  const uniqueTpNumbers = new Set();

  // Filter and populate the uniqueTpNumbers Set with unique values from FetchRecord
  FetchRecord.forEach((item) => {
    if (item) {
      uniqueTpNumbers.add(item.tpNo);
    }
  });
  // Convert the Set back to an array (if needed)
  const uniqueTpNumbersArray = Array.from(uniqueTpNumbers);

  const handlePrint = () => {
    console.log(selectedDate + selectedConsole + tpNumber);

    const dgdc1 = dgdcImage;
    // Create an Image object to preload the image
    const image = new Image();
    image.src = dgdc1;
    // Add an onload event handler to execute the print code when the image is loaded
    image.onload = () => {
      handlePrintcode(dgdc1);
    };
  };

  const calculateSumOfNoOfPackages = (tpno) => {
    const sum = FetchRecord.reduce((accumulator, record) => {
      if (record.tpNo === tpno) {
        return accumulator + record.noOfPackages;
      }
      return accumulator;
    }, 0);

    return sum;
  };

  const handlePrintcode = (dgdc) => {
    if (validateForm()) {
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(`<!DOCTYPE html>
    <html>
    <head>
    <title>GATE PASS FOR Carting Agent
    </title>

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
        font-size:20px;
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

      printWindow.document.write(`
      <div id="page-header">
      
      <img src="${dgdc}" alt="Header Image" style="max-width: 306px; max-height: 306px;">

          <div style="text-align: center;">
            <p style="font-size: 16px;"> GEMS & JEWELLERY COMPLEX SEEPZ, MUMBAI - 400 096. TELE. : 28291018, 28291768 </p>
                <p style="font-size: 16px;">GATE PASS FOR CARTING AGENT</p>
          </div>
          <hr>
            <div style="display: flex; justify-content: space-between; align-items: left;">
                <p style="flex: 1; text-align: left;font-size: 16px;">The Superintendent of Customs<br>Customs Office(SEEPZ)<br>Mumbai</p>
                <p style="flex: 1; text-align: right; font-size: 16px;">Trip No. :${tpNumber}(${getUsernameByExternalPartyId(
        selectedConsole
      )}-2023-2024)<br><br>Date :${formatDateTime2(new Date())}</p>
            </div>
              <br>
            <div>
              <p  style="text-align: left;font-size: 20px;">Sir,</p>
            </div>
          <p style="text-align: center;font-size: 18px;">
            Please permit Van No.<strong>${vanNumber}</strong> with <strong>${calculateSumOfNoOfPackages(
        tpNumber
      )}</strong> Parcel precious cargo to be transported to Sahar Air Cargo Complex for Export under SEEPZ Transhipment
            Permit No <strong>${tpNumber}</strong>.
          </p>

            <div >
                  <div style="flex: 1; text-align: left;font-size: 18px;margin-bottom: 30px;">Thanking You, </div></br>
                  <div style="flex: 2; text-align: left; font-size: 18px;">Yours faithfully</div>
            </div>

            </div>
      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    }
  };

  const handlePDFDownload = () => {
    if (validateForm()) {
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
        margins: { top: 0, right: 10, bottom: 10, left: 10 },
      });
      pdf.addImage(dgdcImage, "JPEG", 60, 10, 80, 25);

      const startY = 35;

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);

      const text = `GEMS & JEWELLERY COMPLEX SEEPZ, MUMBAI - 400 096. TELE. : 28291018, 28291768 `;
      const textWidth =
        (pdf.getStringUnitWidth(text) * pdf.internal.getFontSize()) /
        pdf.internal.scaleFactor;
      const textX = (pdf.internal.pageSize.getWidth() - textWidth) / 2;
      pdf.text(text, textX, startY + 5);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      const text2 = `GATE PASS FOR Carting Agent`;
      const textWidth2 =
        (pdf.getStringUnitWidth(text2) * pdf.internal.getFontSize()) /
        pdf.internal.scaleFactor;
      const textX2 = (pdf.internal.pageSize.getWidth() - textWidth2) / 2;
      pdf.text(text2, textX2, startY + 10);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setLineWidth(0.2); // Set line width (1mm)
      pdf.setDrawColor(0); // Set line c
      const lineWidth = pdf.internal.pageSize.getWidth() - 10; // Total width of the page minus 10mm (5mm from each side)
      pdf.line(10, startY + 12, lineWidth, startY + 12); // Draw line
      pdf.text("The Superintendent of Customs", 10, startY + 20);
      // pdf.text(
      //   `Trip No. :${tpNumber}(${getUsernameByExternalPartyId(
      //     selectedConsole
      //   )}-2023-2024)`,
      //   lineWidth - 60,
      //   startY + 20
      // );
      const tripNoText = `Trip No. :${tpNumber}(${getUsernameByExternalPartyId(
        selectedConsole
      )}-2023-2024)`;
      const tripNoTextWidth =
        (pdf.getStringUnitWidth(tripNoText) * pdf.internal.getFontSize()) /
        pdf.internal.scaleFactor;
      const tripNoTextX =
        pdf.internal.pageSize.getWidth() - tripNoTextWidth - 10; // Adjust the right margin as needed
      pdf.text(tripNoText, tripNoTextX, startY + 20);

      pdf.text("Customs Office(SEEPZ)", 15, startY + 25);
      // pdf.text(" ", lineWidth - 50, startY + 20);
      pdf.text("Mumbai", 15, startY + 30);
      pdf.text(
        `Date :${formatDateTime2(new Date())}`,
        lineWidth - 45,
        startY + 30
      );

      pdf.text("Sir,", 10, startY + 40);

      const paragraphText = `Please permit Van No.${vanNumber} with ${calculateSumOfNoOfPackages(
        tpNumber
      )} Parcel precious cargo to be transported to Sahar Air Cargo Complex for Export under SEEPZ Transhipment Permit No ${tpNumber}.`;
      const fontSize = 10;
      const leftMargin = 20; // Left margin in mm
      const rightMargin = 20; // Right margin in mm
      const usableWidth =
        pdf.internal.pageSize.getWidth() - leftMargin - rightMargin; // Usable width with margins
      const lines = pdf.splitTextToSize(paragraphText, usableWidth);
      const lineHeight = fontSize * 0.8; // Adjust line height as needed (e.g., 80% of font size)
      const totalHeight = lines.length * lineHeight;
      const startY3 = startY + 50;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const textWidth3 =
          (pdf.getStringUnitWidth(line) * fontSize) / pdf.internal.scaleFactor;
        const textX3 = leftMargin + (usableWidth - textWidth3) / 2; // Centered within the usable width with left margin
        const textY3 = startY3 + i * lineHeight;
        pdf.setFontSize(fontSize);
        pdf.text(line, textX3, textY3);
      }
      pdf.text("Thanking You,", 10, startY + 70);
      pdf.text("Yours faithfully,",  10, startY + 85);

      pdf.save("Gate_Pass_Carting_Agent.pdf");
    }
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate;
  };

  const forwardPdf = async(date,console,tp,vehicle) =>{
    const formattedDate = formatDate(date);
   
  
    await axios.post(`http://${ipaddress}exportshb/exportConsoleGatePass?companyId=${companyid}&branchId=${branchId}&tpdate=${formattedDate}&tpno=${tp}&vehicle=${vehicle}&console=${console}`)
    .then((response)=>{
      const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF
        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);
        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'ConsoleAgent.pdf'; // Set the filename for the downloaded PDF
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


  const forwardPrint = async(date,console,tp,vehicle) =>{
    const formattedDate = formatDate(date);
    


  
    await axios.post(`http://${ipaddress}exportshb/exportConsoleGatePass?companyId=${companyid}&branchId=${branchId}&tpdate=${formattedDate}&tpno=${tp}&vehicle=${vehicle}&console=${console}`)
    .then((response)=>{
      const base64PDF = response.data;

      // Create a new window for displaying the PDF
      const newWindow = window.open("", "_blank");

      // Write the HTML content to the new window
      newWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Console Agent</title>
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
          icon={faPassport}
          style={{
            marginRight: "8px",
            color: "black", // Set the color to golden
          }}
        />{" "}
        Gate Pass for Carting Agent
      </h5>

      <Card className="cardcolor">
        <CardBody>
          <form>
            <Row>
              <Col md={3}>
                <Label className="inputhead">
                  Select Date found <span style={{ color: "red" }}> *</span>
                </Label>{" "}
                <DatePicker
                  selected={selectedDate}
                  wrapperClassName="custom-react-datepicker-wrapper"
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="form-control InputField"
                  customInput={<input style={{ width: "100%" }} />}
                />
              </Col>
              <Col md={3}>
                <Label className="inputhead">
                  Select Console Agent<span style={{ color: "red" }}> *</span>
                </Label>
                <select
                  name="company"
                  className={`form-control ${consoleError ? "is-invalid" : ""}`}
                  value={selectedConsole}
                  onChange={handleConsoleChange}
                  style={{ height: "39px" }}
                >
                  <option className="" value="">
                    Select
                  </option>
                  {ConsoleList.map(
                    (consoleItem, index) =>
                      consoleItem && (
                        <option key={index} value={consoleItem.externaluserId}>
                          {consoleItem.userName}
                        </option>
                      )
                  )}
                </select>
                {consoleError && (
                  <div className="invalid-feedback">{consoleError}</div>
                )}
              </Col>
              <Col md={3}>
                <Label className="inputhead">
                  Tp No<span style={{ color: "red" }}> *</span>
                </Label>{" "}
                <select
                  name="company"
                  className={`form-control ${
                    tpNumberError ? "is-invalid" : ""
                  }`}
                  value={tpNumber}
                  onChange={handleTpNumber}
                  style={{ height: "39px" }}
                >
                  <option className="" value="">
                    -Select -
                  </option>
                  {FetchRecord.map((tpNo, index) => (
                    <option key={index} value={tpNo}>
                      {tpNo}
                    </option>
                  ))}
                </select>
                {tpNumberError && (
                  <div className="invalid-feedback">{tpNumberError}</div>
                )}
              </Col>
              <Col md={3}>
                <Label className="inputhead">Van No</Label>
                <Input
                  style={{ height: "39px" }}
                  value={vanNumber}
                  onChange={(e) => setVanNumber(e.target.value)}
                />
              </Col>
            </Row>

            <div className="text-center" style={{ marginTop: 23 }}>
              <button
                className="btn btn-outline-success btn-margin"
                type="button"
                onClick={()=>forwardPrint(selectedDate,selectedConsole,tpNumber,vanNumber)}
              >
                <FontAwesomeIcon
                  icon={faPrint}
                  style={{ marginRight: "2px" }}
                />
                Print
              </button>
              <button
                className="btn btn-outline-primary btn-margin"
                type="button"
                onClick={()=>forwardPdf(selectedDate,selectedConsole,tpNumber,vanNumber)}
                style={{ marginLeft: "10px" }}
              >
                <FontAwesomeIcon
                  icon={faFilePdf}
                  style={{ marginRight: "2px" }}
                />
                Pdf
              </button>
              <button
                className="btn btn-outline-danger btn-margin"
                type="button"
                onClick={resetForm}
                style={{ marginLeft: "10px" }}
              >
                <FontAwesomeIcon
                  icon={faRefresh}
                  style={{ marginRight: "2px" }}
                />
                Reset
              </button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}