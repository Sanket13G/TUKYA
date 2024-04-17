import { redirect } from "react-router-dom";
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Pagination } from 'react-bootstrap';
import {
  ButtonToggle,
  CardBody,
  Container,
  Table,
  ToastHeader,
} from "reactstrap";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import ipaddress from "../Components/IpAddress";
import axios from "axios";

import {
  faFileExcel,
  faFilePdf,
  faPrint,
  faSearch, faRefresh, faRegistered, faBook
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { FaFilePdf } from "react-icons/fa";
import ReactLoading from 'react-loading';
export default function Subcontract_report() {

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


  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedParty, setSelectedParty] = useState("");

  const [importData, setImportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalNop, setTotalNop] = useState(0);
  const [totalSirNo, setTotalSirNo] = useState(0);
  const [errors, setErrors] = useState({});


  const {
    branchId,
    companyid,

  } = useContext(AuthContext);


  const newFormatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const formatedDate = (inputDate) => {
    if (!inputDate) {
      return ""; // Return an empty string for undefined or null input
    }

    const date = new Date(inputDate);

    if (isNaN(date.getTime())) {
      return ""; // Return an empty string for invalid dates
    }
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
    fetchimportData(new Date(), new Date());
    fetchConsoleNames();
  }, []);


  const handlePartyChange = (event) => {
    const selectedPartyName = event.target.value;
    setSelectedParty(selectedPartyName);
  };


  const fetchimportData = async (startDate, endDate, selectedParty) => {

    const newErrors = {};

    if (!startDate) {
      newErrors['startDate'] = 'Please Select startDate';
    }

    if (!endDate) {
      newErrors['endDate'] = 'Please Select endDate';
    }

    setErrors(newErrors);
    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      console.log("ERRORS");
      console.log(newErrors);
      return;
    }
    console.log("ERRORS");
    console.log(newErrors);
    setCurrentPage(1);
    setLoading(true);
    setImportData([]);
    try {
      const params = {
        companyId: companyid,
        branchId: branchId,
        startDate: newFormatDate(startDate),
        endDate: newFormatDate(endDate),
        console: selectedParty
      };

      const response = await axios.get(`http://${ipaddress}import/findImportData`, { params });
      setImportData(response.data);
      let totalNop = 0;

      // Calculate unique MasterNo values and total nop
      response.data.forEach(importItem => {
        totalNop += importItem[3];
      });

      setTotalNop(totalNop);
      setTotalSirNo(response.data.length);

    } catch (error) {
      console.error("Error fetching import data:", error.message);
      // Handle the error or show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  // const handleSearch = async (startDate, endDate, selectedParty) => {
  //   fetchimportData(startDate, endDate, selectedParty);
  // };


  const handleReset = () => {
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedParty('');
    fetchimportData(new Date(), new Date());

  };



  // Pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30; // Number of items to display per page

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = importData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(importData.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayPages = () => {
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


  const formatDate = (value) => {
    if (value === null || value === undefined || (typeof value !== 'string' && typeof value !== 'number') || value.toString().trim() === "") {
      return "";
    }
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handlePrint = async (type) => {
    setLoading(true);
    const params = {
      companyId: companyid,
      branchId: branchId,
      startDate: newFormatDate(startDate),
      endDate: newFormatDate(endDate),
      console: selectedParty,
      totalNoOfPackages: totalNop,
      totalNoSIR: totalSirNo
    };


    try {
      const response = await axios.get(`http://${ipaddress}import/importRegisterPrint`, { params });

      if (type === 'PDF') {
        if (response.data === 'not generated') {
          toast.error("Gate pass already generated", { position: "top-center", autoClose: 2000 });

        } else {
          const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF
          // Create a Blob from the Base64 data
          const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
          // Create a URL for the Blob
          const blobUrl = URL.createObjectURL(pdfBlob);
          // Create an anchor element for downloading
          const downloadLink = document.createElement('a');
          downloadLink.href = blobUrl;
          downloadLink.download = 'Import_Register.pdf'; // Set the filename for the downloaded PDF
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

        }
      } else if (type === 'PRINT') {
        if (response.data === 'not generated') {
          toast.error("Gate pass already generated", { position: "top-center", autoClose: 2000 });

        } else {
          const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF
          // Create a Blob from the Base64 data
          const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
          // Create an object URL for the Blob
          const blobUrl = URL.createObjectURL(pdfBlob);
          // Open a new window and set the PDF content as the source
          window.open(blobUrl, '_blank');

        }
      } else {
        throw new Error('Invalid print type');
      }

      // handleSearch();
    } catch (error) {
      console.error(error);
      toast.error("Gate pass already generated", { position: "top-center", autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };



  const handleXLSDownload = async () => {
    setLoading(true);
    const params = {
      companyId: companyid,
      branchId: branchId,
      startDate: newFormatDate(startDate),
      endDate: newFormatDate(endDate),
      console: selectedParty,
      totalNoOfPackages: totalNop,
      totalNoSIR: totalSirNo,
    };

    try {
      const response = await axios.get(`http://${ipaddress}import/importRegisterXLSDownload`, {
        params,
        responseType: 'arraybuffer', // Ensure response is treated as binary data
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = 'IMPORT REGISTER';
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
      toast.error('Something Went Wrong', { position: 'top-center', autoClose: 2000 });
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

      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }}>
        <FontAwesomeIcon icon={faBook} style={{ marginRight: '8px', color: 'black' }} />
        New Import Register
      </h5>
      <Card>
        <CardBody>
          <Container>
            <Form>
              <Row>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="inputhead">From Date</Form.Label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        if (date) {
                          setStartDate(date);
                        } else {
                          setStartDate(null);
                        }
                      }}
                      dateFormat="dd/MM/yyyy"
                      name="startDate"
                      wrapperClassName="custom-react-datepicker-wrapper"
                      className="form-control border-right-0"
                      customInput={<input style={{ width: '100%', borderColor: errors.startDate ? '#f52b2b' : '' }} />}


                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="inputhead">To Date</Form.Label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => {
                        if (date) {
                          setEndDate(date);
                        } else {
                          setEndDate(null);
                        }
                      }}
                      dateFormat="dd/MM/yyyy"
                      name="endDate"
                      wrapperClassName="custom-react-datepicker-wrapper"
                      className="form-control border-right-0"
                      customInput={<input style={{ width: '100%', borderColor: errors.endDate ? '#f52b2b' : '' }} />}
                      isClearable={false}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <label htmlFor="company" className="inputhead">Console</label>
                  <select
                    name="console"
                    className="form-select form-control"
                    onChange={handlePartyChange}
                    value={selectedParty}
                    style={{ marginTop: 9 }}
                  >
                    <option value="">Select</option>
                    {consoles.map((party) => (
                      <option key={party.externaluserId} value={party.externaluserId}>
                        {party.userName}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col md={3}>
                  <div style={{ marginTop: 30 }}>
                    <button
                      type="button"
                      className="btn me-md-2 btn-outline-primary"
                      onClick={() => fetchimportData(startDate, endDate, selectedParty)}
                      style={{ marginRight: '10px' }}
                    >
                      <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                      Search
                    </button>
                    <button
                      type="button"
                      className="btn gap-2 btn-outline-danger"
                      onClick={handleReset}
                    >
                      <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                      Clear
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Container>


          {importData.length > 0 ? (
            <>
              <hr className="mt-3" />
              <Row >

                <Col md={8}>
                </Col>
                <Col md={4} className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handlePrint("PRINT")}
                    style={{ marginRight: '10px' }}
                  >
                    <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                    PRINT
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handlePrint("PDF")}
                    style={{ marginRight: '10px' }}
                  >
                    <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />
                    PDF
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleXLSDownload}
                  >
                    <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '5px' }} />
                    XLS
                  </button>


                </Col>

              </Row>

              <div className="table-responsive">
                <Table className="table table-striped table-hover" style={{ marginTop: 9 }}>
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#BADDDA", height: '30px' }}>Sr.No</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>SIR No</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>SIR Date</th>
                      <th style={{ backgroundColor: "#BADDDA" }}> Importer </th>
                      <th style={{ backgroundColor: "#BADDDA" }}>No of Pkgs</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>DESC</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>DGDC Status</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>BE No</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>BE DATE</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>GROSS WEIGHT</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>ASSESSABLE VALUE</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>IGM NUMBER</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>MAWB NO</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>HAWB NO</th>
                      <th style={{ backgroundColor: "#BADDDA" }}>Console Is</th>
                    </tr>
                  </thead>


                  <tbody>

                    <tr className="text-center">
                      <td style={{ backgroundColor: '#BADDDA' }}><b>Total</b> </td>
                      <td style={{ backgroundColor: '#BADDDA' }}> <b>{totalSirNo}</b></td>
                      <td style={{ backgroundColor: '#BADDDA' }}></td>
                      <td style={{ backgroundColor: '#BADDDA' }}></td>
                      <td style={{ backgroundColor: '#BADDDA' }}> <b> {totalNop}</b> </td>
                      <td style={{ backgroundColor: '#BADDDA' }}></td>
                      <td style={{ backgroundColor: '#BADDDA' }}></td>
                      <td style={{ backgroundColor: '#BADDDA' }}></td>
                      <td style={{ backgroundColor: '#BADDDA' }}></td>
                      <td style={{ backgroundColor: '#BADDDA' }}></td>
                      <td style={{ backgroundColor: '#BADDDA' }}></td>
                      <td style={{ backgroundColor: '#BADDDA' }}></td>
                      <td style={{ backgroundColor: '#BADDDA' }}></td>
                      <td style={{ backgroundColor: '#BADDDA' }}></td>
                      <td style={{ backgroundColor: '#BADDDA' }}></td>

                    </tr>
                    {currentItems.map((currentItems, index) =>

                      <tr className="text-center dynamic-row-width">
                        <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                        <td>{currentItems[0]}</td>
                        <td>{formatDate(currentItems[1])}</td>
                        <td>{currentItems[2]}</td>
                        <td>{currentItems[3]}</td>
                        <td>{currentItems[4]}</td>
                        <td>{currentItems[5]}</td>
                        <td>{currentItems[6]}</td>

                        <td>{formatDate(currentItems[7])}</td>
                        <td >{currentItems[8]}</td>
                        <td >{currentItems[9]}</td>
                        <td >{currentItems[10]}</td>
                        <td >{currentItems[11]}</td>
                        <td >{currentItems[12]}</td>
                        <td >{currentItems[13]}</td>

                      </tr>
                    )
                    }


                  </tbody>
                </Table>

                <div className="text-center">

                  <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                    <Pagination.First onClick={() => handlePageChange(1)} />
                    <Pagination.Prev
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    <Pagination.Ellipsis />

                    {displayPages().map((pageNumber) => (
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
            </>
          ) : null}
        </CardBody>
      </Card>
    </>


  );
}



