import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "../Components/Style.css";
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import InviceService from "../services/InviceService";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import ipaddress from "../Components/IpAddress";
import snzLoge from "../Images/Snz_Parcels.jpg"
import { Pagination } from "react-bootstrap";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { Card, CardBody, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar, faSave, faServer, faUserCircle, faRefresh, faGlobe, faPlaneArrival, faSolarPanel, faStar, faAtom, faPlaneUp, faHandsHoldingCircle, faShare, faShareAlt, faExchange, faExchangeAlt, faTentArrowTurnLeft, faTentArrowLeftRight, faLeftLong, faPlus, faArrowTurnRight, faAngleDoubleLeft, faHandHolding, faHandHoldingWater, faHandHoldingHand, faBolt, faArchive, faBoxesPacking, faWeight, faWeightHanging, faGavel, faPlane, faHistory, faUser, faCircleInfo, faPrint, faHand, faUsersViewfinder, faTruck, faTruckFieldUn, faTimes, faPerson, faPersonBooth, faIcons, faUndo, faUndoAlt, faEdit, faIdBadge, faHandBackFist, faHandFist, faSync, faIdCardClip, faCross, faBox, faArrowsToEye, faSyncAlt, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faCog, faCheck } from '@fortawesome/free-solid-svg-icons';
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Components/AuthProvider";
import SantoshImage from "../services/contacts.png"
import { FaClosedCaptioning, FaTruck, FaHandPaper, FaPersonBooth, FaTruckLoading, FaArrowRight, FaArrowLeft, FaArrowAltCircleRight, FaArrowAltCircleLeft, FaTimesCircle, FaSave } from 'react-icons/fa';
import PdfViewer from "../Components/PdfViewer";
import ReactLoading from 'react-loading';
import moment from 'moment';

function PreImport(props) {


    const [loading, setLoading] = useState(false);

    const {
        jwtToken,
        userId,
        username,
        branchId,
        companyid,
        role,
        companyname,
        branchname,
        logintype,
        logintypeid,

        login,
        logout,
    } = useContext(AuthContext);


    const [currentPage, setCurrentPage] = useState(1);


    const styles2 = {
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
    const initialSearchCriteria = {
        companyid: companyid,
        branchId: branchId,
        niptStatus: '',
        startDate: moment(new Date()).format('YYYY-MM-DD'),
        endDate: moment(new Date()).format('YYYY-MM-DD'),
        searchValue: ''
    };



    const [filteredImports, setFilteredImports] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const updatedSerchcriteria = location.state?.searchCriteria;
    const updatedCurrentPage = location.state?.currentPage


    useEffect(() => {
        const fetchData = async () => {
            const criteriaToSet = updatedSerchcriteria || initialSearchCriteria;

            const updatedPage = updatedCurrentPage || currentPage;
            setCurrentPage(updatedPage);

            setSearchCriteria(criteriaToSet);
            await handleSearch(criteriaToSet);
            await handleSearch3(criteriaToSet); // Pass criteriaToSet to the handleSearch method
        };

        fetchData();
    }, []);

    const formatDate2 = (value) => {
        if (!value) {
            return "";
        }
        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


    const [filterdata3, setFilteredImports3] = useState([]);
    const [uniqueMasterNumberCount3, setUniqueMasterNumberCount3] = useState(0);
    const [totalNop3, setTotalNop3] = useState(0);
    const [uniqueMasterNumberCount, setUniqueMasterNumberCount] = useState(0);
    const [totalNop, setTotalNop] = useState(0);
    const handleSearch = async (searchCriteria) => {
        setLoading(true);
        try {
            await Rate_Chart_Service.SearchPreImports({ params: searchCriteria }).then((response) => {
                setFilteredImports(response.data);
                const uniqueMasterNumbers = new Set();
                let totalNop = 0;
                // Calculate unique MasterNo values and total nop
                response.data.forEach(importItem => {
                    uniqueMasterNumbers.add(importItem.mawb);
                    totalNop += importItem.nop;
                });
                setUniqueMasterNumberCount(uniqueMasterNumbers.size);
                setTotalNop(totalNop);
            });
        }
        catch {
            console.log("error");
        }
        finally {
            setLoading(false);
        }
    };


    const setCurrentPageFun = () => {
        setCurrentPage(1);
    };

    const handleNIPTStatusChange = (event) => {
        const selectedValue = event.target.value;
        setSearchCriteria({ ...searchCriteria, niptStatus: selectedValue });
    };


    const resetSearchCriteria = async () => {
        setSearchCriteria(initialSearchCriteria);
        setCurrentPageFun();
        handleSearch(initialSearchCriteria);
        handleSearch3(initialSearchCriteria);
    };

    const handleViewClick = (transId3, mawb3, hawb3, sir3) => {
        navigate(`/parent/pre-import/add-new`, { state: { transId3: transId3, mawb3: mawb3, hawb3: hawb3, sir3: sir3, searchCriteria: searchCriteria, currentPage: currentPage } });
    };

    const handleModifyClick = (transId2, mawb2, hawb2, sir2) => {
        navigate(`/parent/pre-import/add-new`, { state: { transId2: transId2, mawb2: mawb2, hawb2: hawb2, sir2: sir2, searchCriteria: searchCriteria, currentPage: currentPage } });
    };

    const handleAddToImports = async (transId2, mawb2, hawb2, sir2) => {
        setLoading(true);
        try {
            const res = await Rate_Chart_Service.addPreImportToImport(companyid,branchId,userId,transId2, mawb2, hawb2, sir2);

        const toastContent = `Import with SIR No  ${res.data}  Added Successfully!`;
            const contentWidth = toastContent.length * 10;
            toast.success(toastContent, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                style: { width: `${contentWidth}px` },
            });
        } catch (error) {
            // Handle the error response, e.g., show an error toast
            const errorMessage = error.response ? error.response.data : "An error occurred during import.";
            const contentWidth = errorMessage.length * 12;
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                style: { width: `${contentWidth}px` },
            });
        } finally {
            // This block will be executed regardless of success or failure
            setLoading(false);
        }
    };







    const [currentPage3, setCurrentPage3] = useState(1);
    const [itemsPerPage3] = useState(10);

    const indexOfLastItem3 = currentPage3 * itemsPerPage3;
    const indexOfFirstItem3 = indexOfLastItem3 - itemsPerPage3;
    const currentItems3 = filterdata3.slice(indexOfFirstItem3, indexOfLastItem3);
    const totalPages3 = Math.ceil(filterdata3.length / itemsPerPage3);

    // Function to handle page change
    const handlePageChange3 = (page) => {
        if (page >= 1 && page <= totalPages3) {
            setCurrentPage3(page);
        }
    };
    const displayPages3 = () => {
        const centerPageCount = 5;
        const middlePage = Math.floor(centerPageCount / 2);
        let startPage = currentPage3 - middlePage;
        let endPage = currentPage3 + middlePage;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPages3, centerPageCount);
        }

        if (endPage > totalPages3) {
            endPage = totalPages3;
            startPage = Math.max(1, totalPages3 - centerPageCount + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };






    // const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items to display per page
    const totalPages = Math.ceil(filteredImports.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentfilteredImports = filteredImports.slice(indexOfFirstItem, indexOfLastItem);


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



































    const handleSearch3 = async (searchCriteria) => {
        // console.log("IN Search");
        console.log(searchCriteria);
        if (logintype === 'CHA') {
            await Rate_Chart_Service.SearchPreImportsforCHA({ params: searchCriteria }, logintypeid, logintype).then((response) => {
                console.log('filterdata2 ', response.data);
                setFilteredImports3(response.data);
                setCurrentPage3(1);
                const uniqueMasterNumbers = new Set();
                let totalNop = 0;

                // Calculate unique MasterNo values and total nop
                response.data.forEach(importItem => {
                    uniqueMasterNumbers.add(importItem[5]);
                    totalNop += importItem[4];
                });

                setUniqueMasterNumberCount3(uniqueMasterNumbers.size);
                setTotalNop3(totalNop);


            })
                .catch((error) => {
                    console.error('Error searching for imports:', error);
                });
        }

        if (logintype === 'Console') {
            await Rate_Chart_Service.SearchPreImportsforConsole({ params: searchCriteria }, logintypeid, logintype).then((response) => {
                console.log('filterdata2 ', response.data);
                setFilteredImports3(response.data);
                setCurrentPage3(1);
                const uniqueMasterNumbers = new Set();
                let totalNop = 0;

                // Calculate unique MasterNo values and total nop
                response.data.forEach(importItem => {
                    uniqueMasterNumbers.add(importItem[5]);
                    totalNop += importItem[4];
                });

                setUniqueMasterNumberCount3(uniqueMasterNumbers.size);
                setTotalNop3(totalNop);


            })
                .catch((error) => {
                    console.error('Error searching for imports:', error);
                });
        }
        if (logintype === 'Party') {
            await Rate_Chart_Service.SearchPreImportsforparty({ params: searchCriteria }, logintypeid, logintype).then((response) => {
                console.log('filterdata2 ', response.data);
                setFilteredImports3(response.data);
                setCurrentPage3(1);
                const uniqueMasterNumbers = new Set();
                let totalNop = 0;

                // Calculate unique MasterNo values and total nop
                response.data.forEach(importItem => {
                    uniqueMasterNumbers.add(importItem[5]);
                    totalNop += importItem[4];
                });

                setUniqueMasterNumberCount3(uniqueMasterNumbers.size);
                setTotalNop3(totalNop);


            })
                .catch((error) => {
                    console.error('Error searching for imports:', error);
                });
        }


    };






    const handleSearchChange = (event) => {
        const selectedValue = event.target.value;
        setSearchCriteria({ ...searchCriteria, searchValue: selectedValue });
    };























    return (
        <>

            {loading && (
                <div style={styles2.overlay}>
                    <ReactLoading type="spin" color="#0000FF" height={300} width={80} />
                </div>
            )}



            {(logintype === 'Party' || logintype === 'CHA' || logintype === 'Carting Agent' || logintype === 'Console') ? (
                <div className="Container" >

                    <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
                        icon={faPlaneArrival}
                        style={{
                            marginRight: '8px',
                            color: 'black',
                        }}
                    />Pre Import</h5>
                    <Card>

                        <CardBody>
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">Search By</Label>
                                        <Input
                                            type="text" name="SearchBy"
                                            className="form-control inputField"
                                            value={searchCriteria.searchValue}
                                            onChange={handleSearchChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">Date From</Label>
                                        <div> {/* Wrap in an input group */}

                                            <DatePicker
                                                selected={searchCriteria.startDate ? new Date(searchCriteria.startDate) : null}
                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                onChange={(date) => {
                                                    if (date) {
                                                        // Set the time to 12:00 AM in UTC time
                                                        date.setHours(12, 0, 0, 0);
                                                        // Convert the selected date and time to ISO format
                                                        const formattedDate = date.toISOString();
                                                        setSearchCriteria({ ...searchCriteria, startDate: formattedDate });
                                                    } else {
                                                        setSearchCriteria({ ...searchCriteria, startDate: null });
                                                    }
                                                }}
                                                dateFormat="dd/MM/yyyy" // Specify the combined format
                                                className="form-control border-right-0 inputField"
                                                customInput={<input style={{ width: '100%' }} />}
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">Date To</Label>
                                        <div> {/* Wrap in an input group */}
                                            <DatePicker
                                                selected={searchCriteria.endDate ? new Date(searchCriteria.endDate) : null} // Use endDate from searchCriteria if it's defined
                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                onChange={(date) => {
                                                    if (date) {
                                                        // Set the time to 12:00 PM (noon)
                                                        date.setHours(12, 0, 0, 0);
                                                        const formattedDate = date.toISOString(); // Convert to ISO format
                                                        setSearchCriteria({ ...searchCriteria, endDate: formattedDate });
                                                    } else {
                                                        setSearchCriteria({ ...searchCriteria, endDate: null });
                                                    }
                                                }}
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control border-right-0 inputField"
                                                customInput={<input style={{ width: '100%' }} />}
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>


                                <Col md={4}>

                                    <button
                                        type="button"
                                        className="btn me-md-2   btn-outline-primary"
                                        onClick={(e) => handleSearch3(searchCriteria)}
                                        style={{ marginRight: '10px' }}
                                    ><FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                                        Search
                                    </button>

                                    <button
                                        type="button"
                                        className="btn gap-2  btn-outline-danger"
                                        onClick={resetSearchCriteria}
                                    > <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                                        Clear
                                    </button>

                                </Col>

                            </Row>



                            {filterdata3.length > 0 && (
                                <div className="table-responsive">
                                    <Table className="table table-bordered custom-table mt-3">
                                        <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                                            <tr className="text-center">
                                                <th style={{ backgroundColor: '#BADDDA' }} scope="col">Sr</th>
                                                <th style={{ backgroundColor: '#BADDDA' }} scope="col">SIR Date</th>
                                                <th style={{ backgroundColor: '#BADDDA' }} scope="col">SIR No</th>
                                                <th style={{ backgroundColor: '#BADDDA' }} scope="col">Flight No</th>
                                                <th style={{ backgroundColor: '#BADDDA' }} scope="col">Importer</th>
                                                <th style={{ backgroundColor: '#BADDDA' }} scope="col">PCKGS</th>
                                                <th style={{ backgroundColor: '#BADDDA' }} scope="col">MAWB No</th>
                                                <th style={{ backgroundColor: '#BADDDA' }} scope="col">HAWB No</th>
                                                <th style={{ backgroundColor: '#BADDDA' }} scope="col">DGDC Status</th>
                                                <th style={{ backgroundColor: '#BADDDA' }} scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="text-center">
                                                <td style={{ backgroundColor: '#BADDDA' }}><b>Total</b> </td>
                                                <td style={{ backgroundColor: '#BADDDA' }}></td>
                                                <td style={{ backgroundColor: '#BADDDA' }}> <b>{filterdata3.length}</b></td>
                                                <td style={{ backgroundColor: '#BADDDA' }}></td>
                                                <td style={{ backgroundColor: '#BADDDA' }}></td>
                                                <td style={{ backgroundColor: '#BADDDA' }}> <b> {totalNop3}</b> </td>
                                                <td style={{ backgroundColor: '#BADDDA' }}><b> {uniqueMasterNumberCount3} </b></td>
                                                <td style={{ backgroundColor: '#BADDDA' }}></td>
                                                <td style={{ backgroundColor: '#BADDDA' }}></td>
                                                <td style={{ backgroundColor: '#BADDDA' }}></td>

                                            </tr>

                                            {currentItems3.map((import2, index) =>

                                                <tr className={"text-center"}
                                                    key={index} >
                                                    <td className="table-column">{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                                                    <td className="table-column">{formatDate2(import2.sirDate)}</td>
                                                    <td className="table-column">{import2.sirNo}</td>
                                                    <td className="table-column">{import2.flightNo}</td>
                                                    <td className="table-column"> {import2.importernameOnParcel}</td>
                                                    <td className="table-column">{import2.nop}</td>
                                                    <td className="table-column">{import2.mawb}</td>
                                                    <td className="table-column">{import2.hawb.startsWith('000') ? '' : import2.hawb}</td>
                                                    <td className="table-column" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <span>{import2.dgdcStatus}</span>
                                                        <div style={{ display: 'flex', flexDirection: 'row' }}>

                                                            {import2.snzStatus === "Y" ? (

                                                                <img src={snzLoge} className="img-fluid" alt="SNZ" width={25} height={25} title="SNZ Parcel" />

                                                            ) : null

                                                            }

                                                        </div>
                                                    </td>
                                                    <td className="table-column">

                                                        <Button
                                                            type="button"
                                                            className="btn btn-primary dropdown-toggle"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        ><FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
                                                            Action
                                                        </Button>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <button
                                                                    className="dropdown-item"
                                                                    onClick={() => handleViewClick(import2.impTransId, import2.mawb, import2.hawb, import2.sirNo)}
                                                                // to={`/parent/import/add-new/${import2.impTransId}/${import2.mawb}/${import2.hawb}/${import2.sirNo}/view`}
                                                                ><FontAwesomeIcon icon={faUsersViewfinder} style={{ marginRight: '5px' }} />
                                                                    View All Details
                                                                </button>
                                                            </li>

                                                        </ul>


                                                    </td>
                                                </tr>
                                            )
                                            }
                                        </tbody>
                                    </Table>
                                    <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                                        <Pagination.First onClick={() => handlePageChange3(1)} />
                                        <Pagination.Prev
                                            onClick={() => handlePageChange3(currentPage3 - 1)}
                                            disabled={currentPage3 === 1}
                                        />
                                        <Pagination.Ellipsis />

                                        {displayPages3().map((pageNumber) => (
                                            <Pagination.Item
                                                key={pageNumber}
                                                active={pageNumber === currentPage3}
                                                onClick={() => handlePageChange3(pageNumber)}
                                            >
                                                {pageNumber}
                                            </Pagination.Item>
                                        ))}

                                        <Pagination.Ellipsis />
                                        <Pagination.Next
                                            onClick={() => handlePageChange3(currentPage3 + 1)}
                                            disabled={currentPage3 === totalPages3}
                                        />
                                        <Pagination.Last onClick={() => handlePageChange3(totalPages3)} />
                                    </Pagination>
                                </div>)}
                        </CardBody>
                    </Card>
                </div>
            )
                :
                (
                    <div className="Container" >

                        <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
                            icon={faPlaneArrival}
                            style={{
                                marginRight: '8px',
                                color: 'black',
                            }}
                        />Pre Import</h5>
                        <Card>

                            <CardBody className="text-end">
                                <div >

                                    <Button
                                        type="button"

                                        className="allbutton dropdown-toggle"
                                        variant="outline-success"

                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"

                                    >  <FontAwesomeIcon icon={faAtom} style={{ marginRight: "5px" }} />
                                        Action
                                    </Button>

                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link
                                                className="dropdown-item link"
                                                // onClick={() => handleOptionButtonClick("view-all")}
                                                to={`/parent/pre-import/add-new/`}
                                            > <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                                                Add New Pre-Import
                                            </Link>
                                        </li>

                                    </ul>
                                </div>

                            </CardBody>

                            <hr style={{ margin: '0' }} />
                            <CardBody>

                                <Row>

                                    <Col md={4}>
                                        <FormGroup>
                                            <Label className="forlabel" for="branchId">Search By</Label>
                                            <Input
                                                type="text" name="SearchBy"
                                                className="form-control inputField"
                                                value={searchCriteria.searchValue}
                                                onChange={handleSearchChange}
                                            />
                                        </FormGroup>

                                    </Col>

                                    <Col md={2}>
                                        <FormGroup>
                                            <Label className="forlabel" for="branchId">Date From</Label>
                                            <div> {/* Wrap in an input group */}

                                                <DatePicker
                                                    selected={searchCriteria.startDate ? new Date(searchCriteria.startDate) : null}
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                    onChange={(date) => {
                                                        if (date) {
                                                            // Set the time to 12:00 AM in UTC time
                                                            date.setHours(12, 0, 0, 0);
                                                            // Convert the selected date and time to ISO format
                                                            const formattedDate = date.toISOString();
                                                            setSearchCriteria({ ...searchCriteria, startDate: formattedDate });
                                                        } else {
                                                            setSearchCriteria({ ...searchCriteria, startDate: null });
                                                        }
                                                    }}
                                                    dateFormat="dd/MM/yyyy" // Specify the combined format
                                                    className="form-control border-right-0 inputField"
                                                    customInput={<input style={{ width: '100%' }} />}

                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>


                                    <Col md={2}>
                                        <FormGroup>
                                            <Label className="forlabel" for="branchId">Date To</Label>
                                            <div> {/* Wrap in an input group */}
                                                <DatePicker
                                                    selected={searchCriteria.endDate ? new Date(searchCriteria.endDate) : null} // Use endDate from searchCriteria if it's defined
                                                    wrapperClassName="custom-react-datepicker-wrapper"
                                                    onChange={(date) => {
                                                        if (date) {
                                                            // Set the time to 12:00 PM (noon)
                                                            date.setHours(12, 0, 0, 0);
                                                            const formattedDate = date.toISOString(); // Convert to ISO format
                                                            setSearchCriteria({ ...searchCriteria, endDate: formattedDate });
                                                        } else {
                                                            setSearchCriteria({ ...searchCriteria, endDate: null });
                                                        }
                                                    }}
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control border-right-0 inputField"
                                                    customInput={<input style={{ width: '100%' }} />}
                                                />
                                            </div>
                                        </FormGroup>
                                    </Col>


                                    <Col md={4}>
                                        <FormGroup>
                                            <Label className="forlabel" for="branchId">SNZ Parcel</Label>

                                            <select
                                                className="form-select"
                                                aria-label="SC Status"
                                                value={searchCriteria.niptStatus}
                                                onChange={handleNIPTStatusChange}
                                            >
                                                <option selected value="">Select SNZ Parcel</option>
                                                <option value="Y">Yes</option>
                                                <option value="N">No</option>
                                            </select>


                                        </FormGroup></Col>


                                </Row>


                                <div className="text-center mt-1 mb-1">
                                    <button
                                        type="button"
                                        className="btn me-md-2   btn-outline-primary"
                                        onClick={(e) => { handleSearch(searchCriteria); setCurrentPageFun(); }}
                                        style={{ marginRight: '10px' }}
                                    ><FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                                        Search
                                    </button>

                                    <button
                                        type="button"
                                        className="btn gap-2  btn-outline-danger"
                                        onClick={resetSearchCriteria}
                                    > <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                                        Clear
                                    </button>
                                </div>


                                {filteredImports.length > 0 && (
                                    <div className="table-responsive">
                                        <Table className="table table-bordered custom-table mt-3">
                                            <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                                                <tr className="text-center">
                                                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">Sr</th>
                                                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">P-IR Date</th>
                                                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">P-IR No</th>
                                                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">Flight No</th>
                                                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">Importer</th>
                                                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">PCKGS</th>
                                                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">MAWB No</th>
                                                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">HAWB No</th>
                                                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">DGDC Status</th>
                                                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="text-center">
                                                    <td style={{ backgroundColor: '#BADDDA' }}><b>Total</b> </td>
                                                    <td style={{ backgroundColor: '#BADDDA' }}></td>
                                                    <td style={{ backgroundColor: '#BADDDA' }}> <b>{filteredImports.length}</b></td>
                                                    <td style={{ backgroundColor: '#BADDDA' }}></td>
                                                    <td style={{ backgroundColor: '#BADDDA' }}></td>
                                                    <td style={{ backgroundColor: '#BADDDA' }}> <b> {totalNop}</b> </td>
                                                    <td style={{ backgroundColor: '#BADDDA' }}><b> {uniqueMasterNumberCount} </b></td>
                                                    <td style={{ backgroundColor: '#BADDDA' }}></td>
                                                    <td style={{ backgroundColor: '#BADDDA' }}></td>
                                                    <td style={{ backgroundColor: '#BADDDA' }}></td>

                                                </tr>

                                                {currentfilteredImports.map((import2, index) =>

                                                    <tr className={"text-center"}
                                                        key={index}>
                                                        <td className="table-column">{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                                                        <td className="table-column">{formatDate2(import2.sirDate)}</td>
                                                        <td className="table-column">{import2.sirNo}</td>
                                                        <td className="table-column">{import2.flightNo}</td>
                                                        <td className="table-column">{import2.importernameOnParcel}</td>
                                                        <td className="table-column">{import2.nop}</td>
                                                        <td className="table-column">{import2.mawb}</td>
                                                        <td className="table-column">{import2.hawb.startsWith('000') ? '' : import2.hawb}</td>                                         <td className="table-column" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                            <span>{import2.dgdcStatus}</span>
                                                            <div style={{ display: 'flex', flexDirection: 'row' }}>


                                                                {import2.snzStatus === "Y" ? (
                                                                    <img src={snzLoge} className="img-fluid" alt="SNZ" width={30} height={30} title="SNZ Parcel" />
                                                                ) : null
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="table-column">

                                                            <Button
                                                                type="button"
                                                                className="btn btn-primary dropdown-toggle"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                            ><FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
                                                                Action
                                                            </Button>
                                                            <ul className="dropdown-menu">
                                                                <li>
                                                                    <button
                                                                        className="dropdown-item"
                                                                        onClick={() => handleViewClick(import2.impTransId, import2.mawb, import2.hawb, import2.sirNo)}
                                                                    // to={`/parent/import/add-new/${import2.impTransId}/${import2.mawb}/${import2.hawb}/${import2.sirNo}/view`}
                                                                    ><FontAwesomeIcon icon={faUsersViewfinder} style={{ marginRight: '5px' }} />
                                                                        View All Details
                                                                    </button>
                                                                </li>
                                                                <li className="mt-1">
                                                                    <button
                                                                        className="dropdown-item"
                                                                        onClick={() => handleModifyClick(import2.impTransId, import2.mawb, import2.hawb, import2.sirNo)}
                                                                    ><FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                                                                        Modify Pre-Import Details
                                                                    </button>
                                                                </li>


                                                                <li className="mt-1">
                                                                    <button
                                                                        className="dropdown-item"
                                                                        onClick={() => handleAddToImports(import2.impTransId, import2.mawb, import2.hawb, import2.sirNo)}
                                                                    ><FontAwesomeIcon icon={faArrowsAlt} style={{ marginRight: '5px' }} />
                                                                        Add to Import
                                                                    </button>
                                                                </li>


                                                            </ul>

                                                        </td>
                                                    </tr>
                                                )
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
                                    </div>)}
                            </CardBody>
                        </Card>

                    </div>
                )

            }


        </>
    );
}

export default PreImport;