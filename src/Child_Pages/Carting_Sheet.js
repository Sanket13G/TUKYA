import { redirect } from "react-router-dom";
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext, useRef } from "react";
import "../Components/Style.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ipaddress from "../Components/IpAddress";
import "../Components/Style.css";
import { CardBody, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dgdcImage from "../Images/report.jpeg";
import jsPDF from "jspdf";
import {
  faClipboard,
  faFileExcel,
  faFilePdf,
  faListAlt,
  faPrint,
  faRefresh,
  faSearch,
  faShoePrints,
  faUndo,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import axios from "axios";
export default function Carting_Sheet() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const pdfRef = useRef(null);

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
    return `${day}/${month}/${year} `;
  };
  const [ConsoleList, setConsoleList] = useState([]);
  const [FetchRecord, setFetchRecord] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedConsole, setSelectedConsole] = useState("");
  const [consoleError, setConsoleError] = useState("");
  const [formValid, setFormValid] = useState(false);

  const resetForm = () => {
    setSelectedDate(new Date());
    setSelectedConsole(""); // Reset the selectedConsole to an empty string
    setConsoleError("");
    setFormValid(false);
  };

  useEffect(() => {
    getlist(formatDateTime1(selectedDate));
  }, [selectedDate]);

  const getlist = (date) => {
    axios
      .get(
        `http://${ipaddress}export1/getCartingAgent/${companyid}/${branchId}/${date}`
      )
      .then((response) => {
        setConsoleList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };
  const handleConsoleChange = (e) => {
    const newConsole = e.target.value;
    setSelectedConsole(newConsole);
  };
  const handleShow = () => {
    if (!selectedConsole) {
      setConsoleError("Please select a Carting Agent.");
      return;
    }
    setConsoleError("");
    axios
      .get(
        `http://${ipaddress}export1/getExportTpList/${companyid}/${branchId}/${formatDateTime1(
          selectedDate
        )}/${selectedConsole}`
      )
      .then((response) => {
        setFetchRecord(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };
  const groupData = () => {
    const groupedData = {};

    FetchRecord.forEach((item) => {
      const flightNo = item.flightNo;
      const airlineName = item.airlineName;

      // Group by Flight No
      if (!groupedData[flightNo]) {
        groupedData[flightNo] = {};
      }

      // Group by airlineName No within Flight No
      if (!groupedData[flightNo][airlineName]) {
        groupedData[flightNo][airlineName] = [];
      }

      groupedData[flightNo][airlineName].push(item);
    });

    return groupedData;
  };
  const groupedData = groupData();
  // Define a function to group data by airwayBillNo
  const groupDataByAirwayBillNo = (data) => {
    return data.reduce((result, item) => {
      const airwayBillNo = item.airwayBillNo;

      // Find the group in the result array
      let group = result.find(
        (group) => group[0].airwayBillNo === airwayBillNo
      );

      if (!group) {
        // If the group doesn't exist, create a new one
        group = [];
        result.push(group);
      }

      // Add the item to the group
      group.push(item);

      return result;
    }, []);
  };
  const calculateTotalPackagesForFlightNo = (flightNo) => {
    const flightRecords = FetchRecord.filter(
      (record) => record.flightNo === flightNo
    );
    return flightRecords.reduce(
      (total, record) => total + record.noOfPackages,
      0
    );
  };
  const getAirlineNameByFlightNo = (flightNo) => {
    const record = FetchRecord.find((record) => record.flightNo === flightNo);
    return record ? record.airlineName : ""; // Return the airlineName if found, or an empty string if not found
  };
  const calculateTotalPackages = () => {
    let totalPackages = 0;
    for (const record of FetchRecord) {
      totalPackages += record.noOfPackages;
    }
    return totalPackages;
  };
  const countAirwayBillNumbersByFlightNo = (flightNo) => {
    const flightData = FetchRecord.filter(
      (record) => record.flightNo === flightNo
    );
    const allAWBNumbers = flightData.map((record) => record.airwayBillNo);
    const totalCount = allAWBNumbers.length;

    return totalCount;
  };

  const calculateTotalCountAirwayBillNumbers = () => {
    const allAirwayBillNumbers = FetchRecord.map(
      (record) => record.airwayBillNo
    );

    const totalCount = allAirwayBillNumbers.length;

    return totalCount;
  };

  const generateXLS = async () => {
    const filename = `CARTING SHEET_${formatDateTime2(new Date())}.xls`;

    try {
      // Make a GET request to the Spring Boot API endpoint
      const response = await fetch(
        `http://${ipaddress}export1/generateXlsCartingSheet/${companyid}/${branchId}/${formatDateTime1(
          selectedDate
        )}/${selectedConsole}`
      );
      const blob = await response.blob();

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
    } catch (error) {
      console.error("Error generating XLS:", error);
    }
  };
  const handlePDFDownload1 = () => {
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      margins: { top: 10, right: 10, bottom: 10, left: 10 },
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imageWidth = 90; // Adjust this value as needed
    const xCoordinate = (pageWidth - imageWidth) / 2;

    pdf.addImage(
      dgdcImage,
      "JPEG",
      xCoordinate,
      5, // y-coordinate
      90, // new width
      40 // new height
    );

    const startY = 40;

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text(
      "CARTING SHEET",
      pdf.internal.pageSize.getWidth() / 2,
      startY + 10,
      {
        align: "center",
      }
    );
    pdf.setFont("helvetica", "normal");

    const headers = [
      "Flight No",
      "Airway Bill No",
      "Ser No",
      "SB No",
      "Port of Destination",
      "No of SBS",
      "No of Packages",
    ];

    const rows = [];

    // Initialize variables to track current Flight and AWB
    let currentFlight = "";
    let currentAWB = "";
    let packageTotal = 0;

    // Function to add table headers
    const addHeaders = () => {
      rows.push(headers);
    };

    // Add headers before processing the data
    addHeaders();

    // Sort the data by Flight No and then by AWB No
    FetchRecord.sort((a, b) => {
      if (a.flightNo === b.flightNo) {
        return a.airwayBillNo.localeCompare(b.airwayBillNo);
      }
      return a.flightNo.localeCompare(b.flightNo);
    });

    // Add data rows to the table
    FetchRecord.forEach((record) => {
      // Check if the Flight has changed
      if (record.flightNo !== currentFlight) {
        // Add a row for the Flight Total
        if (currentFlight !== "") {
          rows.push([
            "",
            "Total",
            "",
            "",
            "", // Leave this cell empty for AWB count
            countAirwayBillNumbersByFlightNo(currentFlight),
            packageTotal, // Add the package total for the flight
          ]);
          packageTotal = 0;

          // Add headers for the next flight
          addHeaders();
        }
        currentFlight = record.flightNo;
      }

      if (record.airwayBillNo !== currentAWB) {
        // AWB number changed, increment packageTotal
        currentAWB = record.airwayBillNo;
        packageTotal += record.noOfPackages;

        // Add an additional row for the AWB Total
        rows.push([
          "",
          "AWB Total",
          "",
          "",
          "",
          "", // Leave this cell empty for AWB count
          packageTotal, // Add the package total for the AWB
        ]);
      }

      const rowData = [
        record.flightNo,
        record.airwayBillNo,
        record.serNo,
        record.sbNo,
        record.portOfDestination,
        "1", // You can change this to calculate the actual number of SBS
        record.noOfPackages,
      ];
      rows.push(rowData);
    });

    // Add a row for the last Flight Total
    if (currentFlight !== "") {
      rows.push([
        "",
        "GRAND TOTAL OF THE DAY :",
        "",
        "",
        "",
        calculateTotalCountAirwayBillNumbers(), // Leave this cell empty for AWB count
        calculateTotalPackages(),
      ]);
    }

    pdf.autoTable({
      body: rows,
      startY: startY + 20,
      theme: "plain",
      styles: {
        fontSize: 10,
        fontStyle: "normal",
        headStyles: {
          fillColor: [192, 192, 192], // Gray background color
          textColor: [0, 0, 0], // Black text color
          fontSize: 10,
          fontStyle: "bold", // Make headers bold
          cellPadding: 2,
          lineWidth: 0.1,
        },
        halign: "center", // Center-align header text
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 30 },
        6: { cellWidth: 25 },
      }, // Adjust column widths as needed
    });

    // Save the PDF
    pdf.save("Carting_Sheet.pdf");

    // Print the PDF
    pdf.autoPrint();
  };
  const handlePDFDownload = () => {
    const filename = `CARTING SHEET_${formatDateTime2(new Date())}.pdf`;

    // Make an HTTP request to the Spring Boot endpoint with authentication
    axios
      .get(
        `http://${ipaddress}export1/generatePdfCartingSheet/${companyid}/${branchId}/${formatDateTime1(
          selectedDate
        )}/${selectedConsole}`,
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        // Create a blob URL for the PDF and trigger the download
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  const handlePrint = () => {
    const dgdc1 = dgdcImage;
    // Create an Image object to preload the image
    const image = new Image();
    image.src = dgdc1;

    // Add an onload event handler to execute the print code when the image is loaded
    image.onload = () => {
      handlePrintcode(dgdc1);
    };
  };

  const handlePrintcode = (dgdc) => {
    const printWindow = window.open("", "_blank");
    printWindow.document.open();

    // Add a stylesheet to control spacing
    // printWindow.document.write(`
    //   <!DOCTYPE html>
    //   <html>
    //   <head>
    //     <title>CARTING SHEET</title>
    //     <style>
    //       @page {
    //         margin: 1cm;
    //       }

    //       .printable-area {
    //         font-family: Arial, sans-serif;
    //       }

    //       table {
    //         width: 100%;
    //         border-collapse: collapse;
    //       }

    //       th, td {
    //         border: 1px solid #dddddd;
    //         text-align: center;
    //         padding: 8px;
    //       }

    //       /* Add CSS to remove spacing around tables and images */
    //       table, img {
    //         margin: 0;
    //         padding: 0;
    //         border-spacing: 0;
    //         border-collapse: collapse;
    //       }

    //       /* Style for the additional row */
    //       .additional-row {
    //         background-color: lightgray;
    //         font-weight: bold;
    //       }

    //       #page-header {
    //         display: flex;
    //         justify-content: center; /* Center content horizontally */
    //         align-items: center; /* Center content vertically */
    //       }
    //     </style>
    //   </head>
    //   <body>
    // `);
    printWindow.document.write(`
    
    <!DOCTYPE html>
    <html>
    <head>
      <title>CARTING SHEET</title>
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
          border: 1px solid #000; /* Add a border to the table */
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

        /* Make the table responsive */
        @media screen and (max-width: 600px) {
          table, thead, tbody, th, td, tr {
            display: block;
          }

          thead {
            display: none;
          }

          tr {
            margin-bottom: 0.625em;
          }

          td {
            border: none;
            position: relative;
            padding-left: 50%;
            white-space: normal;
            text-align: left;
          }

          td:before {
            position: absolute;
            top: 0;
            left: 0;
            width: 45%;
            padding-right: 10px;
            white-space: nowrap;
          }
        }
      </style>
    </head>
    <body>
  `);
    printWindow.document.write(`
      <div id="page-header">
        <img src="${dgdc}" alt="Header Image" style="max-width: 306px; max-height: 306px;"> 
    </div>
      <h4 style="text-align: center;">CARTING SHEET</h4>
    `);
    printWindow.document.write(` 
    <table rules="all" class="table border border-primary table-striped table-hover centered-table table-responsive" style="width: 100%;">
      <thead>
        <tr>
          <th style="background: skyblue; align-items: center;" scope="col" colspan="6">AIRLINE DETAILS</th>
          <th style="background: skyblue; align-items: center;" scope="col" colspan="1">${formatDateTime2(
            selectedDate
          )}</th>
        </tr>
      </thead>
  `);

    // Group the FetchRecord data by flight numbers
    const flightNumbers = [
      ...new Set(FetchRecord.map((record) => record.flightNo)),
    ];

    flightNumbers.forEach((flightNo, index) => {
      // Filter data for the current flight number
      const flightData = FetchRecord.filter(
        (record) => record.flightNo === flightNo
      );

      // Create a table for the current flight number
      printWindow.document.write(`
        <tr>
          <th style="background: skyblue;" scope="col" colspan="4">${flightNo}</th>
          <th style="background: skyblue;" scope="col" colspan="3">AIRLINE NAME : ${getAirlineNameByFlightNo(
            flightNo
          )}</th>
        </tr>
        <tr>
          <th style="background: skyblue;" scope="col">FLIGHT NO</th>
          <th style="background: skyblue;" scope="col">AIRWAY BILL NO</th>
          <th style="background: skyblue;" scope="col">SER NO</th>
          <th style="background: skyblue;" scope="col">SB NO</th>
          <th style="background: skyblue;" scope="col">PORT OF DESTINATION</th>
          <th style="background: skyblue;" scope="col">NO OF SBS</th>
          <th style="background: skyblue;" scope="col">NO OF PACKAGES</th>
        </tr>
      `);

      // Group the flightData by airway bill number (awb)
      const awbNumbers = [
        ...new Set(flightData.map((record) => record.airwayBillNo)),
      ];

      let flightSubtotalPackages = 0;

      awbNumbers.forEach((awbNo, awbIndex) => {
        // Filter data for the current airway bill number
        const awbData = flightData.filter(
          (record) => record.airwayBillNo === awbNo
        );
        let sub = 0;
        // Add rows for awb-specific data
        awbData.forEach((record, index) => {
          sub = index;
          printWindow.document.write(`
            <tr>
              <td>${record.flightNo}</td>
              <td>${record.airwayBillNo}</td>
              <td>${record.serNo}</td>
              <td>${record.sbNo}</td>
              <td>${record.portOfDestination}</td>
              <td>1</td>
              <td>${record.noOfPackages}</td>
            </tr>
          `);
        });

        // Calculate the subtotal for the current awb group
        const awbSubtotalPackages = awbData.reduce(
          (total, record) => total + record.noOfPackages,
          0
        );

        // Add a subtotal row for the awb group
        printWindow.document.write(`
          <tr>
            <td></td>
            <td colspan="4" style="text-align: left; font-weight: bold;">SubTotal</td>
            <td style="text-align: center; font-weight: bold;">${sub + 1}</td>
            <td style="text-align: center; font-weight: bold;">${awbSubtotalPackages}</td>
          </tr>
        `);

        flightSubtotalPackages += awbSubtotalPackages;

        // Add an empty row to separate airway bill data, except for the last awb
        if (awbIndex < awbNumbers.length - 1) {
          printWindow.document.write(`<tr></tr>`);
        }
      });

      // Add the "Total" row for each flight
      printWindow.document.write(`
        <tr>
          <td></td>
          <td colspan="4" style="text-align: left; font-weight: bold;">Total</td>
          <td style="text-align: center; font-weight: bold;">${countAirwayBillNumbersByFlightNo(
            flightNo
          )}</td>
          <td style="text-align: center; font-weight: bold;">${flightSubtotalPackages}</td>
        </tr>
      `);

      // Add an empty row to separate flights, except for the last flight
      if (index < flightNumbers.length - 1) {
        printWindow.document.write(`<tr></tr>`);
      }
    });

    printWindow.document.write(`<tr></tr> `);
    printWindow.document.write(`
      <tr>
        <td></td>
        <td colspan="4" style="text-align: left; font-weight: bold;">GRAND TOTAL OF THE DAY :</td>
        <td style="text-align: center; font-weight: bold;">${calculateTotalCountAirwayBillNumbers()}</td>
        <td style="text-align: center; font-weight: bold;">${calculateTotalPackages()}</td>
      </tr>
    `);

    printWindow.document.write(`
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };
  return (
    <div className="Container">
      <h5
        className="pageHead"
        style={{
          fontFamily: "-moz-initial",
          paddingLeft: "4%",
          paddingRight: "-50px",
        }}
      >
        {" "}
        <FontAwesomeIcon
          icon={faListAlt}
          style={{
            marginRight: "8px",
            color: "black", // Set the color to golden
          }}
        />
        Carting Sheet Report
      </h5>
      <Card style={{ backgroundColor: "#F8F8F8" }}>
        <CardBody>
          <Form>
            <Row>
              <Col sm={4}>
                <Label className="inputhead">
                  Select Date found <span style={{ color: "red" }}> *</span>
                </Label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="form-control InputField"
                  customInput={<input style={{ width: "17.8vw" }} />}
                />
              </Col>
              <Col sm={4}>
                <Label className="inputhead">
                  Carting Agent<span style={{ color: "red" }}> *</span>
                </Label>
                <select
                  name="company"
                  id="dw"
                  className={`form-control ${consoleError ? "is-invalid" : ""}`}
                  value={selectedConsole}
                  onChange={handleConsoleChange}
                  style={{ width: "18vw", height: "45px" }}
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
              <Col sm={4}>
                <div style={{ marginTop: 40 }}>
                  <button
                    className="btn btn-outline-primary btn-margin"
                    type="button"
                    style={{ marginRight: 20, marginLeft: "10px" }}
                    onClick={handleShow}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ marginRight: "5px" }}
                    />
                    Search
                  </button>
                  <button
                    className="btn btn-outline-danger btn-margin"
                    type="button"
                    onClick={resetForm}
                  >
                    <FontAwesomeIcon icon={faRefresh} /> Reset
                  </button>{" "}
                </div>
              </Col>
            </Row>
          </Form>
        </CardBody>
        {FetchRecord.length !== 0 && (
          <CardBody>
            <div
              className="text-end"
              style={{ marginTop: 10, marginBottom: 5 }}
            >
              <button
                className="btn btn-outline-success btn-margin"
                type="button"
                onClick={handlePrint}
              >
                <FontAwesomeIcon icon={faPrint} /> Print
              </button>
              <button
                className="btn btn-outline-primary btn-margin"
                type="button"
                onClick={handlePDFDownload}
                style={{ marginLeft: "10px" }}
              >
                <FontAwesomeIcon icon={faFilePdf} /> PDF
              </button>
              <button
                className="btn btn-outline-success btn-margin"
                type="button"
                style={{ marginLeft: "10px" }}
                onClick={generateXLS}
              >
                <FontAwesomeIcon icon={faFileExcel} /> XLS
              </button>{" "}
            </div>
            <div>
              <table
                rules="all"
                className="table table-bordered table-striped table-hover centered-table table-responsive"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr className="text-center">
                    <th
                      style={{ background: "skyblue", textAlign: `center` }}
                      colSpan={6}
                      scope="col"
                    >
                      CARTING SHEET
                    </th>
                    <th
                      style={{ background: "skyblue" }}
                      scope="col"
                      colSpan={1}
                    >
                      {formatDateTime2(selectedDate)}
                    </th>
                  </tr>
                </thead>
                {Object.keys(groupedData).map((flightNo) => (
                  <React.Fragment key={flightNo}>
                    {Object.keys(groupedData[flightNo]).map((airlineName) => (
                      <React.Fragment key={airlineName}>
                        <thead>
                          <tr className="text-center">
                            <th
                              style={{ background: "skyblue" }}
                              colSpan={4}
                              scope="col"
                            >
                              {flightNo}
                            </th>
                            <th
                              style={{ background: "skyblue" }}
                              colSpan={3}
                              scope="col"
                            >
                              AIRLINE NAME: {airlineName}
                            </th>
                          </tr>
                        </thead>
                        <thead>
                          <tr className="text-center">
                            <th style={{ background: "skyblue" }} scope="col">
                              FLIGHT NO
                            </th>
                            <th style={{ background: "skyblue" }} scope="col">
                              AIRWAY BILL NO
                            </th>
                            <th style={{ background: "skyblue" }} scope="col">
                              SER NO
                            </th>
                            <th style={{ background: "skyblue" }} scope="col">
                              SB NO
                            </th>
                            <th style={{ background: "skyblue" }} scope="col">
                              PORT OF DESTINATION
                            </th>
                            <th style={{ background: "skyblue" }} scope="col">
                              NO OF SBS
                            </th>
                            <th style={{ background: "skyblue" }} scope="col">
                              NO OF PACKAGES
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {groupDataByAirwayBillNo(
                            groupedData[flightNo][airlineName]
                          ).map((awbGroup, awbIndex) => {
                            if (!Array.isArray(awbGroup)) {
                              return null; // Skip non-array groups
                            }

                            const subtotal = awbGroup.reduce(
                              (total, item) => total + item.noOfPackages,
                              0
                            );
                            const tempsubAwbcount = 0;
                            return (
                              <React.Fragment key={awbIndex}>
                                {awbGroup.map((awbItem, awbItemIndex) => (
                                  <tr key={awbItemIndex}>
                                    <td>{awbItem.flightNo}</td>
                                    <td>{awbItem.airwayBillNo}</td>
                                    <td>{awbItem.serNo}</td>
                                    <td>{awbItem.sbNo}</td>
                                    <td>{awbItem.portOfDestination}</td>
                                    <td>1</td>
                                    <td>{awbItem.noOfPackages}</td>
                                  </tr>
                                ))}
                                <tr>
                                  <td></td>
                                  <td
                                    colSpan={4}
                                    style={{
                                      textAlign: "left",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    SubTotal
                                  </td>
                                  <td style={{ fontWeight: "bold" }}>
                                    {awbGroup.length}
                                  </td>
                                  <td style={{ fontWeight: "bold" }}>
                                    {subtotal}
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          })}
                          <tr>
                            <td></td>
                            <td
                              colSpan={4}
                              style={{ fontWeight: "bold", textAlign: "left" }}
                            >
                              TOTAL:
                            </td>
                            <td style={{ fontWeight: "bold" }}>
                              {countAirwayBillNumbersByFlightNo(flightNo)}
                            </td>
                            <td style={{ fontWeight: "bold" }}>
                              {calculateTotalPackagesForFlightNo(flightNo)}
                            </td>
                          </tr>
                        </tbody>
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </table>
            </div>
          </CardBody>
        )}
      </Card>{" "}
    </div>
  );
}
