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
  faBoxesPacking,
  faFileAlt,
  faFileExcel,
  faFilePdf,
  faIdCardClip,
  faPlane,
  faPrint,
  faRefresh,
  faSave,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import ReactLoading from 'react-loading';


export default function PacketReceivedSummary() {
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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [exportSummaryData, setexportSummaryData] = useState([]);
  const [importSummaryData, setimportSummaryData] = useState([]);

  const handleClear = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    setexportSummaryData([])
    setimportSummaryData([]);
  }


  const handleSearch = () => {
    axios.get(`http://${ipaddress}exportshb/getSummaryData?companyId=${companyid}&branchId=${branchId}&start=${formatDate(startDate)}&end=${formatDate(endDate)}`)
      .then((response) => {
        const data = response.data;

        console.log("data data ", data);
        if (data.export !== undefined || data.import !== undefined) {
          if (data.export !== undefined) {
            setexportSummaryData(data.export);
          }
          if (data.import !== undefined) {
            setimportSummaryData(data.import);
          }
          toast.success("Data found successfully.", {
            autoClose: 800
          })
        }
        else {
          toast.error("Data not found.", {
            autoClose: 800
          })
        }
      })
      .catch((error) => {
        if (error) {
          toast.error("Data not found.", {
            autoClose: 800
          })
        }
      })
  }


  const handleImportPrint = async () => {

    try {
      const response = await axios.post(
        `http://${ipaddress}exportshb/packetSummaryReport?companyId=${companyid}&branchId=${branchId}&start=${formatDate(startDate)}&end=${formatDate(endDate)}`
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
          <title>packet_received_summary_report</title>
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

  const handlePdfImport = async () => {
    try {
      const response = await axios.post(
        `http://${ipaddress}exportshb/packetSummaryReport?companyId=${companyid}&branchId=${branchId}&start=${formatDate(startDate)}&end=${formatDate(endDate)}`
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
        downloadLink.download = "Packet_Surrary_Report.pdf"; // Set the filename for the downloaded PDF
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
    } catch (error) { }
  };

  const getExcel = async () => {
    try {

      const filename = `Summary.xlsx`;

      const headers = {
        headers: {
          Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        responseType: 'blob',
      };

      const response = await axios.post(`http://${ipaddress}exportshb/summaryExcel?companyId=${companyid}&branchId=${branchId}&start=${formatDate(startDate)}&end=${formatDate(endDate)}`, null, headers);

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
    <div>
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
            icon={faBoxesPacking}
            style={{
              marginRight: "8px",
              color: "black", // Set the color to golden
            }}
          />
          Packet Received Summary
        </h5>
        <Card style={{ backgroundColor: "#F8F8F8" }}>
          <CardBody>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="forlabel">
                    Start Date
                  </Form.Label>

                  <DatePicker
                    selected={startDate}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    onChange={(date) => {
                      if (date) {
                        setStartDate(date);
                      } else {
                        setStartDate(null);
                      }
                    }}
                    value={startDate}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    customInput={<input style={{ width: "100%" }} />}
                  />

                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="forlabel">
                    End Date
                  </Form.Label>

                  <DatePicker
                    selected={endDate}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    onChange={(date) => {
                      if (date) {
                        setEndDate(date);
                      } else {
                        setEndDate(null);
                      }
                    }}
                    value={endDate}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    customInput={<input style={{ width: "100%" }} />}
                  />

                </Form.Group>
              </Col>
              <Col md={4}>
                <div style={{ marginTop: 30 }}>
                  <button
                    type="button"
                    className="btn me-md-2 btn-outline-primary"
                    style={{ marginRight: '10px' }}
                    onClick={handleSearch}
                  >
                    <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                    Search
                  </button>
                  <button
                    type="button"
                    className="btn gap-2 btn-outline-danger"
                    onClick={handleClear}
                  >
                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                    Clear
                  </button>
                </div>
              </Col>
            </Row>
            <hr />
            {(importSummaryData.length > 0 || exportSummaryData.length > 0) && (
              <>
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
                  onClick={getExcel}
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
                  onClick={handlePdfImport}
                  style={{ marginBottom: "15px" }}
                >
                  <FontAwesomeIcon
                    icon={faFilePdf}
                    style={{ marginRight: "5px" }}
                  />
                  PDF
                </Button>
              </>
            )}
            {importSummaryData.length > 0 && (

              <Row>
                <div className=" mt-1 table-responsive">
                  <Table className="table table-bordered text-center custom-table mt-3">
                    <thead>
                      <tr className="text-center">
                        <th style={{ backgroundColor: "#BADDDA" }}></th>
                        <th style={{ backgroundColor: "#BADDDA" }}></th>
                        <th style={{ backgroundColor: "#BADDDA" }}></th>
                        <th style={{ backgroundColor: "#BADDDA" }}> <b>IMPORT</b> </th>
                        <th style={{ backgroundColor: "#BADDDA" }}> </th>
                        <th style={{ backgroundColor: "#BADDDA" }}></th>
                        <th style={{ backgroundColor: "#BADDDA" }}></th>
                      </tr>
                      <tr>
                        <th style={{ backgroundColor: "#BADDDA" }}>Sr No.</th>
                        <th style={{ backgroundColor: "#BADDDA" }}>Month</th>
                        <th style={{ backgroundColor: "#BADDDA" }}>No. of Parcels</th>
                        <th style={{ backgroundColor: "#BADDDA" }}>Weight (CTS)</th>
                        <th style={{ backgroundColor: "#BADDDA" }}> Value US $ </th>
                        <th style={{ backgroundColor: "#BADDDA" }}>Value Rs.</th>
                        <th style={{ backgroundColor: "#BADDDA" }}>Value In Rs.(Crores)</th>

                      </tr>

                    </thead>


                    <tbody>

                      {importSummaryData
                        .sort((a, b) => {
                          // Splitting the strings into month and year
                          const [monthA, yearA] = a[0].split('/');
                          const [monthB, yearB] = b[0].split('/');

                          // Converting month names to numerical values
                          const monthNames = [
                            "January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                          ];
                          const monthIndexA = monthNames.indexOf(monthA);
                          const monthIndexB = monthNames.indexOf(monthB);

                          // Sorting based on year first, then month
                          if (yearA !== yearB) {
                            return parseInt(yearA) - parseInt(yearB);
                          } else {
                            return monthIndexA - monthIndexB;
                          }
                        })
                        .map((currentItems, index) => (
                          <tr className="text-center dynamic-row-width" key={index}>
                            <td>{index + 1}</td>
                            <td>{currentItems[0]}</td>
                            <td>{currentItems[1]}</td>
                            <td>{currentItems[2]}</td>
                            <td>{currentItems[3]}</td>
                            <td>{currentItems[4]}</td>
                            <td>{currentItems[5]}</td>
                          </tr>
                        ))
                      }

                      <tr>
                        <td></td>
                        <td><b>TOTAL</b></td>
                        <td><b>{importSummaryData.reduce((total, item) => total + item[1], 0)}</b></td>
                        <td><b>{importSummaryData.reduce((total, item) => total + item[2], 0)}</b></td>
                        <td><b>{importSummaryData.reduce((total, item) => total + item[3], 0)}</b></td>
                        <td><b>{importSummaryData.reduce((total, item) => total + item[4], 0)}</b></td>
                        <td><b>{importSummaryData.reduce((total, item) => total + item[5], 0)}</b></td>
                      </tr>

                    </tbody>
                  </Table>
                </div>
              </Row>
            )}
            {exportSummaryData.length > 0 && (
              <Row>
                <div className=" mt-1 table-responsive">
                  <Table className="table table-bordered text-center custom-table mt-3">
                    <thead>
                      <tr className="text-center">
                        <th style={{ backgroundColor: "#BADDDA" }}></th>
                        <th style={{ backgroundColor: "#BADDDA" }}></th>
                        <th style={{ backgroundColor: "#BADDDA" }}></th>
                        <th style={{ backgroundColor: "#BADDDA" }}> <b>EXPORT</b> </th>
                        <th style={{ backgroundColor: "#BADDDA" }}> </th>
                        <th style={{ backgroundColor: "#BADDDA" }}></th>
                        <th style={{ backgroundColor: "#BADDDA" }}></th>
                      </tr>
                      <tr>
                        <th style={{ backgroundColor: "#BADDDA" }}>Sr No.</th>
                        <th style={{ backgroundColor: "#BADDDA" }}>Month</th>
                        <th style={{ backgroundColor: "#BADDDA" }}>No. of Parcels</th>
                        <th style={{ backgroundColor: "#BADDDA" }}>Weight (CTS)</th>
                        <th style={{ backgroundColor: "#BADDDA" }}> Value US $ </th>
                        <th style={{ backgroundColor: "#BADDDA" }}>Value Rs.</th>
                        <th style={{ backgroundColor: "#BADDDA" }}>Value In Rs.(Crores)</th>

                      </tr>

                    </thead>


                    <tbody>


                      {exportSummaryData
                        .sort((a, b) => {
                          // Splitting the strings into month and year
                          const [monthA, yearA] = a[0].split('/');
                          const [monthB, yearB] = b[0].split('/');

                          // Converting month names to numerical values
                          const monthNames = [
                            "January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                          ];
                          const monthIndexA = monthNames.indexOf(monthA);
                          const monthIndexB = monthNames.indexOf(monthB);

                          // Sorting based on year first, then month
                          if (yearA !== yearB) {
                            return parseInt(yearA) - parseInt(yearB);
                          } else {
                            return monthIndexA - monthIndexB;
                          }
                        })
                        .map((currentItems, index) =>

                          <tr className="text-center  dynamic-row-width">
                            <td>{index + 1}</td>
                            <td>{currentItems[0]}</td>
                            <td>{currentItems[1]}</td>
                            <td>{currentItems[2]}</td>
                            <td>{currentItems[3]}</td>
                            <td>{currentItems[4]}</td>
                            <td>{currentItems[5]}</td>

                          </tr>
                        )
                      }
                      <tr>
                        <td></td>
                        <td><b>TOTAL</b></td>
                        <td><b>{exportSummaryData.reduce((total, item) => total + item[1], 0)}</b></td>
                        <td><b>{exportSummaryData.reduce((total, item) => total + item[2], 0)}</b></td>
                        <td><b>{exportSummaryData.reduce((total, item) => total + item[3], 0)}</b></td>
                        <td><b>{exportSummaryData.reduce((total, item) => total + item[4], 0)}</b></td>
                        <td><b>{exportSummaryData.reduce((total, item) => total + item[5], 0)}</b></td>
                      </tr>

                    </tbody>
                  </Table>
                </div>
              </Row>

            )}

          </CardBody>
        </Card>
      </div>
    </div>
  )
}
