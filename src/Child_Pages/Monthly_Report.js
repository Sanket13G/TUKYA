import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import "../Components/Style.css";
import DatePicker from "react-datepicker";
import ipaddress from "../Components/IpAddress";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Pagination } from "react-bootstrap";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faAtom,
    faBolt,
    faBoxesPacking,
    faIdBadge,
    faHandHoldingHand,
    faHistory,
    faList,
    faList12,
    faListAlt,
    faPencil,
    faPlaneDeparture,
    faPlus,
    faPlusCircle,
    faSearch,
    faUserCircle,
    faUsersViewfinder,
    faFileAlt,
    faEye,
    faRefresh,
    faFilePdf,
    faFileExcel,
    faArrowsToEye,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    faCheck,
    faSave,
    faTimes,
    faSyncAlt,
    faCancel,
    faCog,
    faPrint,
    faXmark,
    faFileLines,
    faChessKing,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

export default function Monthly_Report() {

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
    // If the user is not authenticated, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated) {
            navigate(
                "/login?message=You need to be authenticated to access this page."
            );
        }
    }, [isAuthenticated, navigate]);

    const [startDate, setStartDate] = useState(new Date());


    const [invoiceData, setInvoiceData] = useState([]);

    const getData = () => {
        let month = 0;
        let year = 0;

        if (startDate != null) {
           
            month = startDate.getMonth() + 1;
           
            year = startDate.getFullYear();
        }

        console.log(month, " ", year);

        axios.get(`http://${ipaddress}Invoice/getMonthly/${companyid}/${branchId}/${month}/${year}`)
            .then((response) => {
                if (response.data != null && response.data != []) {
                    toast.success("Data found successfully.", {
                        autoClose: 700
                    })
                    setInvoiceData(response.data);
                    console.log('invoice ', response.data);
                    setCurrentPage(1);
                }
                else {
                    toast.error("Data not found.", {
                        autoClose: 700
                    })
                    setInvoiceData([]);
                }
            })
            .catch((error) => {
                if (error) {
                    toast.error("Data not found.", {
                        autoClose: 700
                    })
                    setInvoiceData([]);
                }
            })
    }

    const handleReset = () => {
        setStartDate(new Date());
        setInvoiceData([]);
    }

    const formatedDate = (inputDate) => {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${day}/${month}/${year}`;
    };

    const [getpartyId, setGetpartyId] = useState({});
    const [geterpId, setGeterpId] = useState({});
    const [partys, setPartys] = useState([]);

    const fetchPartyNames = async () => {
        try {
            const response = await fetch(
                `http://${ipaddress}parties/getAll/${companyid}/${branchId}`
            );
            const data = await response.json();
            const namesMap = {};
            const erpMp = {};
            console.log(data);
            data.forEach((party) => {
                namesMap[party.partyId] = party.partyName;
                erpMp[party.partyId] = party.erpCode;



            });

            setGetpartyId(namesMap);
            setPartys(data);
            setGeterpId(erpMp)

        } catch (error) {
            console.error("Error fetching party names:", error);
        }
    };

    useEffect(() => {
        fetchPartyNames();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);



    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = invoiceData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(invoiceData.length / itemsPerPage);

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


    const getExcel = (data) => {
        const filename = `Monthly_Report.xlsx`;
        axios.post(`http://${ipaddress}Invoice/monthlyexcel`, data, { responseType: 'blob' })
            .then(async (response) => {
                const blob = new Blob([response.data], { type: response.headers['content-type'] });

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();

                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch((error) => {
                toast.error("Something went wrong", {
                    autoClose: 700
                });
            });
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
                    icon={faFileAlt}
                    style={{
                        marginRight: "8px",
                        color: "black", // Set the color to golden
                    }}
                />
                Monthly Invoice Reports
            </h5>

            <Card>
                <CardBody>
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">
                                    Select Month <span style={{ color: "red" }}>*</span>
                                </Label>
                                <div className="input-group">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="MMM-yyyy" // You can customize the date format
                                        name="startDate"
                                        showMonthYearPicker
                                        required
                                        className="form-control border-right-0 inputField"
                                        customInput={<input style={{ width: "18vw" }} />}
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <Button
                                type="button"
                                className=""
                                variant="outline-success"
                                style={{ marginTop: "32px", marginRight: 10 }}
                                onClick={getData}
                            >
                                <FontAwesomeIcon
                                    icon={faArrowsToEye}
                                    style={{ marginRight: "5px" }}
                                />
                                Show
                            </Button>
                            <Button
                                type="button"
                                className=""
                                variant="outline-danger"
                                style={{ marginTop: "32px" }}
                                onClick={handleReset}
                            >
                                <FontAwesomeIcon
                                    icon={faRefresh}
                                    style={{ marginRight: "5px" }}
                                />
                                Reset
                            </Button>


                        </Col>
                    </Row>

                    <hr />

                    {(invoiceData.length > 0 && invoiceData != null) && (
                        <>
                            <Row>
                                <Col className="text-end">

                                    <Button
                                        type="button"
                                        className=""
                                        variant="outline-success"

                                        onClick={() => getExcel(invoiceData)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faFileExcel}
                                            style={{ marginRight: "5px" }}
                                        />
                                        XLS
                                    </Button>
                                </Col>
                            </Row>
                            <Row >
                                <div className="table-responsive text-center" >
                                    <Table
                                        style={{ marginTop: 9 }}
                                        className="table table-bordered text-center custom-table mt-3"
                                    >
                                        <thead>
                                            <tr>
                                                <th style={{ background: "#BADDDA", textAlign: 'center' }}>Sr. No</th>
                                                <th style={{ background: "#BADDDA", textAlign: 'center' }}>Invoice No</th>
                                                <th style={{ background: "#BADDDA", textAlign: 'center' }}>D/O</th>
                                                <th style={{ background: "#BADDDA", textAlign: 'center' }}>D/O Date</th>
                                                <th style={{ background: "#BADDDA", textAlign: 'center' }}>Invoice Date</th>
                                                <th style={{ background: "#BADDDA", textAlign: 'center' }}>
                                                    Customer Code
                                                </th>
                                                <th style={{ background: "#BADDDA", textAlign: 'center' }}>Customer</th>
                                                <th style={{ background: "#BADDDA", textAlign: 'center' }}>Due Date </th>
                                                <th style={{ background: "#BADDDA", textAlign: 'center' }}>Serial</th>
                                                <th style={{ background: "#BADDDA", textAlign: 'center' }}>Challan No</th>
                                                <th style={{ background: "#BADDDA", textAlign: 'center' }}>Product</th>
                                                <th style={{ background: "#BADDDA", textAlign: 'center' }}>Total Invoice Value</th>
                                                <th style={{ background: "#BADDDA", textAlign: 'center' }}>Rate</th>
                                                <th style={{ background: "#BADDDA", textAlign: 'center' }}>IGST</th>
                                                <th style={{ background: "#BADDDA", textAlign: 'center' }}>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                                                    <td>{item.invoiceNO}</td>
                                                    <td>{item.invoiceNO}</td>
                                                    <td>{formatedDate(item.invoiceDate)}</td>
                                                    <td>{formatedDate(item.invoiceDate)}</td>
                                                    <td>{geterpId[item.partyId]}</td>
                                                    <td>{getpartyId[item.partyId]}</td>
                                                    <td>{formatedDate(item.invoiceDate)}</td>
                                                    <td></td>
                                                    <td>{item.invoiceNO}</td>
                                                    <td></td>
                                                    <td>{item.totalInvoiceAmount}</td>
                                                    <td>{(item.igst === 'Y' || item.cgst === 'Y' || item.sgst === 'Y') ? '18.0' : '0.0'}</td>                                           
                                                    <td>{(item.igst === 'Y' || item.cgst === 'Y' || item.sgst === 'Y') ? item.taxAmount : 0}</td>
                                                    <td>{item.billAmount}</td>
                                                </tr>
                                            ))

                                            }
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
                            </Row>
                        </>
                    )

                    }
                </CardBody>
            </Card>


        </div>
    )
}
