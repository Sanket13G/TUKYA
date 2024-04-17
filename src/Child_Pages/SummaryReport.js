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
import { Pagination } from "react-bootstrap";

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
    faBook,
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

export default function SummaryReport() {
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

    const [parties, setParties] = useState([]);
    const [partyName, setparty_Name] = useState('');
    const [partyId, setparty_Id] = useState('');

    const findParties = async () => {
        const partyResponse = await Rate_Chart_Service.getAllParties1(companyid, branchId);
        const partyOptions = partyResponse.data.map(party => ({
            value: party.partyId,
            label: party.partyName,
            iec: party.iecNo,
            entity: party.entityId,
        }));
        setParties(partyOptions);

    };

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

    const [portData, setExportData] = useState([]);
    const getPortData = () => {
        axios.get(`http://${ipaddress}jardetail/port/${companyid}`)
            .then((response) => {
                const partyOptions = response.data.map(party => ({
                    value: party.jarDtlId,
                    label: party.jarDtlId,

                }));
                setExportData(partyOptions);
            })
            .catch((error) => {

            })
    }


    useEffect(() => {
        findParties();
        fetchConsoleNames();
        getPortData();
    }, [])

    const [selectedParty, setSelectedParty] = useState("");
    const handleConsoleChange = (event) => {
        const selectedPartyName = event.target.value;
        setSelectedParty(selectedPartyName);
    };

    const handlePartyChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setparty_Name('');
            setparty_Id('');

        }
        else {
            setparty_Name(selectedOption ? selectedOption.label : '');
            setparty_Id(selectedOption ? selectedOption.value : '');


        }
    };

    const [selectPort, setSelectPort] = useState('');
    const handlePortChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setSelectPort('');
            setSelectPort('');

        }
        else {
            setSelectPort(selectedOption ? selectedOption.label : '');
            setSelectPort(selectedOption ? selectedOption.value : '');


        }
    };

    const [exportSummaryData, setexportSummaryData] = useState([]);
    const [importSummaryData, setimportSummaryData] = useState([]);
    const handleClear = () => {
        setStartDate(new Date());
        setEndDate(new Date());
        setparty_Id('');
        setparty_Name('');
        setSelectPort('');
        setSelectedParty('');
        setexportSummaryData([])
        setimportSummaryData([]);
    }


    const handleSearch = async () => {
        const start = formatDate(startDate) + " 00:00:00";
        const end = formatDate(endDate) + " 23:59:59";
        await axios.get(`http://${ipaddress}exportshb/getAllSummaryData?companyId=${companyid}&branchId=${branchId}&start=${start}&end=${end}&destination=${selectPort}&party=${partyId}&console=${selectedParty}`)
            .then((response) => {
                const data = response.data;

                console.log("data data ", data);
                if (data.export !== undefined || data.import !== undefined) {
                    if (data.export !== undefined) {
                        setexportSummaryData(data.export);
                        setCurrentPage1(1);
                    }
                    if (data.import !== undefined) {
                        setimportSummaryData(data.import);
                        setCurrentPage(1);
                    }
                    if (data.export !== undefined && data.import !== undefined) {
                        if (data.export.length > 0 || data.import.length > 0) {
                            toast.success("Data found successfully.", {
                                autoClose: 800
                            })
                        }
                        else {
                            toast.error("Data not found.", {
                                autoClose: 800
                            })
                        }
                    }
                    else {
                        toast.error("Data not found.", {
                            autoClose: 800
                        })
                    }
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


    const handlePrint = async (status) => {
        const start = formatDate(startDate) + " 00:00:00";
        const end = formatDate(endDate) + " 23:59:59";
        try {
            const response = await axios.post(`http://${ipaddress}exportshb/printGetAllSummaryData?companyId=${companyid}&branchId=${branchId}&start=${start}&end=${end}&destination=${selectPort}&party=${partyId}&console=${selectedParty}`);
          if(status === 'PRINT'){
            if (response.status === 200) {
                const base64PDF = response.data;

                // Create a new window for displaying the PDF
                const newWindow = window.open("", "_blank");

                // Write the HTML content to the new window
                newWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>Summary Report</title>
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
          }

          if(status === 'PDF'){
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
                downloadLink.download = "Surrary_Report.pdf"; // Set the filename for the downloaded PDF
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
          }
        } catch (error) {
            // Handle errors if any
        }
    };


    const getExcel = async () => {
        try {
            const start = formatDate(startDate) + " 00:00:00";
            const end = formatDate(endDate) + " 23:59:59";
          const filename = `Summary.xlsx`;
    
          const headers = {
            headers: {
              Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
            responseType: 'blob',
          };
    
          const response = await axios.post(`http://${ipaddress}exportshb/getAllSummaryExcel?companyId=${companyid}&branchId=${branchId}&start=${start}&end=${end}&destination=${selectPort}&party=${partyId}&console=${selectedParty}`, null, headers);
    
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


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = importSummaryData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(importSummaryData.length / itemsPerPage);

    // Function to handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
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



    const [currentPage1, setCurrentPage1] = useState(1);
    const [itemsPerPage1] = useState(10);

    const indexOfLastItem1 = currentPage1 * itemsPerPage1;
    const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
    const currentItems1 = exportSummaryData.slice(indexOfFirstItem1, indexOfLastItem1);
    const totalPages1 = Math.ceil(exportSummaryData.length / itemsPerPage1);

    // Function to handle page change
    const handlePageChange1 = (page) => {
        if (page >= 1 && page <= totalPages1) {
            setCurrentPage1(page);
        }
    };
    const displayPages1 = () => {
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
                        icon={faBook}
                        style={{
                            marginRight: "8px",
                            color: "black", // Set the color to golden
                        }}
                    />
                    Summary Report
                </h5>
                <Card style={{ backgroundColor: "#F8F8F8" }}>
                    <CardBody>
                        <Row>
                            <Col md={2}>
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
                            <Col md={2}>
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
                            <Col md={2}>
                                <Form.Label className="forlabel">
                                    Select Destination
                                </Form.Label>

                                <Select
                                    options={portData}
                                    placeholder="Select a Port Code"
                                    isClearable
                                    value={{ value: selectPort, label: selectPort }}
                                    id="nameOfExporter"
                                    onChange={handlePortChange}


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
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Form.Label className="forlabel bold-label" htmlFor="sbRequestId">
                                        Select Party
                                    </Form.Label>
                                    <Select
                                        options={parties}
                                        placeholder="Select a party"
                                        isClearable
                                        value={{ value: partyId, label: partyName }}
                                        id="nameOfExporter"
                                        onChange={handlePartyChange}


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
                            <Col md={3}>
                                <label htmlFor="company" className="inputhead">Select Console</label>
                                <select
                                    name="console"
                                    className="form-select form-control"
                                    onChange={handleConsoleChange}
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
                        </Row>
                        <Row>
                            <Col className="text-center">
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
                            </Col>
                        </Row>
                        <hr />
                        {(importSummaryData.length > 0 || exportSummaryData.length > 0) && (
                            <Row>
                                <Col>
                                    <Button
                                        type="button"
                                        variant="outline-primary"
                                        onClick={()=>handlePrint("PRINT")}
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
                                        onClick={()=>handlePrint("PDF")}
                                        style={{ marginBottom: "15px" }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faFilePdf}
                                            style={{ marginRight: "5px" }}
                                        />
                                        PDF
                                    </Button>
                                </Col>
                            </Row>
                        )}
                        {importSummaryData.length > 0 && (
                            <div className=" mt-1 table-responsive">
                                <Table className="table table-bordered text-center custom-table mt-3">
                                    <thead>
                                        <tr>
                                            <th className="text-center" colSpan={12} style={{ backgroundColor: "#BADDDA" }}>IMPORT</th>
                                        </tr>
                                        <tr>
                                            <th style={{ backgroundColor: "#BADDDA" }}>SR No</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>IR No</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>IR Date</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>IGM No</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>MAWB</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>HAWB</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>Importer</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>No. of Pkg</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>Description</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>Weight (CTS)</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>Value in Rs.</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>Origin Airport</th>
                                        </tr>
                                        <tr>
                                            <th style={{ backgroundColor: "#BADDDA" }}>Total</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>{importSummaryData.length}</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>{importSummaryData.reduce((total, item) => total + item[6], 0)}</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((item, index) => (
                                            <tr key={index}>
                                                 <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                                                <td>{item[0]}</td>
                                                <td>{item[1]}</td>
                                                <td>{item[2]}</td>
                                                <td>{item[3]}</td>
                                                <td>{item[4]}</td>
                                                <td>{item[5]}</td>
                                                <td>{item[6]}</td>
                                                <td>{item[7]}</td>
                                                <td>{item[8]}</td>
                                                <td>{item[9]}</td>
                                                <td>{item[10]}</td>
                                            </tr>
                                        ))

                                        }
                                    </tbody>
                                    <tbody>

                                    </tbody>
                                </Table>
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
                        )

                        }
                        {exportSummaryData.length > 0 && (
                            <div className=" mt-1 table-responsive">
                                <Table className="table table-bordered text-center custom-table mt-3">
                                    <thead>
                                        <tr>
                                            <th className="text-center" colSpan={12} style={{ backgroundColor: "#BADDDA" }}>EXPORT</th>
                                        </tr>
                                        <tr>
                                            <th style={{ backgroundColor: "#BADDDA" }}>SR No</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>ER No</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>ER Date</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>SB No</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>MAWB</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>HAWB</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>Importer</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>No. of Pkg</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>Description</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>Weight (CTS)</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>Value in Rs.</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>Origin Airport</th>
                                        </tr>
                                        <tr>
                                            <th style={{ backgroundColor: "#BADDDA" }}>Total</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>{exportSummaryData.length}</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}>{exportSummaryData.reduce((total, item) => total + item[6], 0)}</th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                            <th style={{ backgroundColor: "#BADDDA" }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems1.map((item, index) => (
                                            <tr key={index}>
                                                <td>{((currentPage1 - 1) * itemsPerPage1) + index + 1}</td>
                                                <td>{item[0]}</td>
                                                <td>{item[1]}</td>
                                                <td>{item[2]}</td>
                                                <td>{item[3]}</td>
                                                <td>{item[4]}</td>
                                                <td>{item[5]}</td>
                                                <td>{item[6]}</td>
                                                <td>{item[7]}</td>
                                                <td>{item[8]}</td>
                                                <td>{item[9]}</td>
                                                <td>{item[10]}</td>
                                            </tr>
                                        ))

                                        }
                                    </tbody>
                                </Table>
                                <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                <Pagination.First onClick={() => handlePageChange1(1)} />
                <Pagination.Prev
                  onClick={() => handlePageChange1(currentPage1 - 1)}
                  disabled={currentPage1 === 1}
                />
                <Pagination.Ellipsis />

                {displayPages1().map((pageNumber) => (
                  <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage1}
                    onClick={() => handlePageChange1(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                ))}

                <Pagination.Ellipsis />
                <Pagination.Next
                  onClick={() => handlePageChange1(currentPage1 + 1)}
                  disabled={currentPage1 === totalPages1}
                />
                <Pagination.Last onClick={() => handlePageChange1(totalPages1)} />
              </Pagination>

                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>

        </div>
    )
}
