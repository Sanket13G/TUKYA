import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { Button, Pagination } from 'react-bootstrap';
import "../Components/Style.css";
import dgdcImage from "../Images/report.jpeg";
import DatePicker from "react-datepicker";
import ipaddress from "../Components/IpAddress";
import {
    Card,
    CardBody,
    Row,
    Col,
    FormGroup,
    Label,
    Table,
} from "reactstrap";
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRefresh, faFilePdf, faUserCircle, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import ReactLoading from 'react-loading';
import Select from 'react-select';
import InviceService from "../services/InviceService";
import moment from 'moment';

export default function TDS_Reports() {

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


    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    useEffect(() => {
        if (!isAuthenticated) {
            navigate(
                "/login?message=You need to be authenticated to access this page."
            );
        }
    }, [isAuthenticated, navigate]);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectedParty, setSelectedParty] = useState(null);
    const [Invoices, setInvoices] = useState([]);
    const [noRecordsFound, setNoRecordsFound] = useState(false);

    const [startDate2, setStartDate2] = useState(new Date());
    const [endDate2, setEndDate2] = useState(new Date());
    const [selectedParty2, setSelectedParty2] = useState(null);
    const [selectedPartyId, setSelectedPartyId] = useState('');


    const [Invoices2, setInvoices2] = useState([]);
    const [loading, setLoading] = useState(false);

    const formatDateTime2 = (value) => {
        if (!value) {
            return ""; // Return an empty string if value is empty or undefined
        }

        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    //   // Function to calculate the total for a specific column
    //   const calculateTotal = (data, columnIndex) => {
    //     const total = data.reduce((sum, row) => sum + (row[columnIndex] || 0), 0);
    //     return total !== 0 ? total : '';
    //   };

    function calculateTotal(invoicesArray, propertyName) {
        // Check if the invoicesArray is valid and not empty
        if (!invoicesArray || invoicesArray.length === 0) {
            return 0;
        }

        // Use reduce method to sum the specified property
        const total = invoicesArray.reduce((accumulator, currentValue) => {
            // Check if the property exists in the current object
            if (currentValue.hasOwnProperty(propertyName)) {
                // Parse the property value to a float and add it to the accumulator
                accumulator += parseFloat(currentValue[propertyName]) || 0;
            }
            return accumulator;
        }, 0);

        return total;
    }




    const { branchId, companyid } = useContext(AuthContext);

    const handleReset = () => {
        setSearchCriteria({ ...searchCriteria, startDate: new Date().toISOString() });
        setSearchCriteria({ ...searchCriteria, endDate: new Date().toISOString() });
        setInvoices([]);
    };



    const handlePrint = async (type) => {
        try {
            const response = await InviceService.generatePartyTDSPrint(searchCriteria);

            if (response.status === 200) {
                const pdfData = response.data;
                const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
                const blobUrl = URL.createObjectURL(pdfBlob);

                if (type === "PDF") {
                    // Create an anchor element for downloading
                    const downloadLink = document.createElement('a');
                    downloadLink.href = blobUrl;
                    downloadLink.download = 'PartyBillSummary.pdf'; // Set the filename for the downloaded PDF
                    downloadLink.style.display = 'none';
                    document.body.appendChild(downloadLink);
                    // Trigger the download
                    downloadLink.click();
                    // Clean up
                    document.body.removeChild(downloadLink);
                    window.URL.revokeObjectURL(blobUrl);
                }
                if (type === 'PRINT') {
                    window.open(blobUrl, '_blank');
                }
                toast.success("Downloading Pdf!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 800,
                });
            } else {
                toast.error("error downLoading file!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 800,
                });
            }
        } catch (error) {
            console.error("Error downloading PDF:", error);
            // Handle the error, show an error message, etc.
        }
    };

    const handleXLSdownLoad = async () => {
        setLoading(true);
        try {
            const response = await InviceService.downLoadTDSXLS(searchCriteria);

            if (response.status === 200) {
                const blob = new Blob([response.data], { type: response.headers['content-type'] });

                // Create a temporary URL for the blob
                const url = window.URL.createObjectURL(blob);

                // Create a link element to trigger the download
                const a = document.createElement("a");
                a.href = url;
                a.download = 'Party_TDS_Report.xlsx';
                document.body.appendChild(a);
                a.click();

                // Clean up
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        }
        catch {
            toast.error("error downLoading file!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 800,
            });
        }
        finally {
            setLoading(false);
        }
    };



    // SHB
    const customFilterOption = (candidate, input) => {
        const inputLower = input.toLowerCase();
        const labelLower = candidate.label.toLowerCase();
        return candidate.data.__isNew__ || labelLower.startsWith(inputLower);
    };

    useEffect(() => {
        findPartiesAll();
    }, [])

    const [partiesAll, setPartiesAll] = useState([]);
    const [selectedPartyTransaction, setSelectedPartyTransaction] = useState(null);

    const findPartiesAll = async () => {
        const partyResponse = await Rate_Chart_Service.getAllActiveParties(companyid, branchId);
        const partyOptions = partyResponse.data.map(party => ({
            value: party[0],
            label: party[1]
        }));
        setPartiesAll(partyOptions);

    };

    const formatDate = (date) => {
        return moment(date).format('YYYY-MM-DD');
    };
    const currentDate = new Date();
    const endDate1 = new Date(currentDate);
    endDate1.setDate(endDate1.getDate() - 1);
    const startDate1 = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const initialSearchCriteria = {
        companyid: companyid,
        branchId: branchId,
        PartyId: '',
        startDate: formatDate(startDate1),
        endDate: formatDate(endDate1),
    };
    const [searchCriteria, setSearchCriteria] = useState(initialSearchCriteria);

    const handlePartyTransaction = async (selectedOption) => {
        setSelectedPartyTransaction(selectedOption ? selectedOption : null);
        setSearchCriteria({ ...searchCriteria, PartyId: selectedOption ? selectedOption.value : null });
        if (!selectedOption) {
            setInvoices([]);
        }
    };


    const handleSearch = async () => {
        setInvoices([]);
        setLoading(true);
        try {
            const results = await InviceService.getPartyTDSData(searchCriteria);
            if (!results.data || results.data.length === 0) {
                toast.info('No data found', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 600,
                });
            } else {
                console.log(results.data);
                setInvoices(results.data);
            }
        } catch (error) {
            toast.error('Something went wrong', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 600,
            });
        }
        finally {
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

            <div className='' style={{ marginTop: 20 }}>
                <div className="Container">
                    <h5
                        className="pageHead"
                        style={{
                            fontFamily: "Your-Heading-Font",
                            paddingLeft: "2%",
                            paddingRight: "-50px",
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            style={{
                                marginRight: "8px",
                                color: "black", // Set the color to golden
                            }}
                        />
                        Party TDS Report
                    </h5>

                    <Card>
                        <CardBody>
                            <Row>


                                <Col md={3}>
                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">Select Party</Label>
                                        <Select
                                            options={partiesAll}
                                            value={selectedPartyTransaction}
                                            onChange={handlePartyTransaction}
                                            isClearable
                                            filterOption={customFilterOption}
                                            placeholder="Select a Party"
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
                                                })
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">From Date</Label>
                                        <div>
                                            <DatePicker
                                                selected={searchCriteria.startDate ? new Date(searchCriteria.startDate) : null}
                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                onChange={(date) => {
                                                    if (date) {
                                                        setSearchCriteria({ ...searchCriteria, startDate: date.toISOString() });
                                                    } else {
                                                        setSearchCriteria({ ...searchCriteria, startDate: null });
                                                    }
                                                }}
                                                dateFormat="dd/MM/yyyy" // Specify the combined format
                                                className="form-control"
                                                maxDate={endDate1}
                                                customInput={<input style={{ width: '100%' }} />}
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">To Date</Label>
                                        <div>
                                            <DatePicker
                                                selected={searchCriteria.endDate ? new Date(searchCriteria.endDate) : null}
                                                wrapperClassName="custom-react-datepicker-wrapper"
                                                onChange={(date) => {
                                                    if (date) {
                                                        setSearchCriteria({ ...searchCriteria, endDate: date.toISOString() });
                                                    } else {
                                                        setSearchCriteria({ ...searchCriteria, endDate: null });
                                                    }
                                                }}
                                                dateFormat="dd/MM/yyyy" // Specify the combined format
                                                className="form-control"
                                                maxDate={endDate1}
                                                customInput={<input style={{ width: '100%' }} />}
                                            />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col md={3} style={{ marginTop: 22 }}>
                                    <Button
                                        type="button"
                                        className=""
                                        variant="outline-primary"
                                        style={{ marginTop: "10px", marginRight: 10 }}
                                        onClick={handleSearch}
                                    >
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            style={{ marginRight: "5px" }}
                                        />
                                        Search
                                    </Button>
                                    <Button
                                        type="button"
                                        className=""
                                        variant="outline-danger"
                                        style={{ marginTop: "10px" }}
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


                            {Invoices.length > 0 ? (
                                <div className='mt-4'>
                                    <Row>
                                        <Col className="text-end">
                                            <Button
                                                type="submit"
                                                className=""
                                                style={{ marginRight: 10, marginLeft: 5, fontWeight: 'bold' }}
                                                variant="outline-success"
                                                onClick={() => handlePrint("PRINT")}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPrint}
                                                    style={{ marginRight: "5px" }}
                                                />
                                                Print
                                            </Button>

                                            <Button
                                                type="button"
                                                className=""
                                                style={{ marginRight: 10, marginLeft: 5, fontWeight: 'bold' }}
                                                variant="outline-primary"
                                                onClick={() => handlePrint("PDF")}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faFilePdf}
                                                    style={{ marginRight: "5px" }}
                                                />
                                                PDF
                                            </Button>

                                            <Button
                                                type="button"
                                                className=""
                                                style={{ marginLeft: 5, fontWeight: 'bold' }}
                                                variant="outline-primary"
                                                onClick={handleXLSdownLoad}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faFileExcel}
                                                    style={{ marginRight: "5px" }}
                                                />
                                                XLS
                                            </Button>
                                        </Col>

                                    </Row>
                                    <Table striped responsive bordered>
                                        <thead>
                                            <tr className="text-center">
                                                <th rowSpan="2" style={{ width: '3%', background: '#BADDDA' }}>Sr No.</th>
                                                <th rowSpan="2" style={{ width: '10%', background: '#BADDDA' }}>Party</th>
                                                <th rowSpan="2" style={{ width: '10%', background: '#BADDDA' }}>GST No</th>
                                                <th rowSpan="2" style={{ width: '8%', background: '#BADDDA' }}>Invoice No</th>
                                                <th rowSpan="2" style={{ width: '5%', background: '#BADDDA' }}>Invoice date</th>
                                                <th rowSpan="2" style={{ width: '15%', background: '#BADDDA' }}>Bill Amount</th>
                                                <th rowSpan="2" style={{ width: '15%', background: '#BADDDA' }}>Tax Amount</th>
                                                <th rowSpan="2" style={{ width: '15%', background: '#BADDDA' }}>Total Amount</th>
                                                <th rowSpan="2" style={{ width: '15%', background: '#BADDDA' }}>TDS %</th>
                                                <th rowSpan="2" style={{ width: '8%', background: '#BADDDA' }}>TDS amount</th>
                                                <th rowSpan="2" style={{ width: '15%', background: '#BADDDA' }}>Amount Cleared</th>
                                                <th rowSpan="2" style={{ width: '10%', background: '#BADDDA' }}>Balance Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Invoices.map((import2, index) =>
                                                <tr className="text-center">
                                                    <td>{index + 1}</td>
                                                    <td>{import2.partyId}</td>
                                                    <td>{import2.companyId}</td>
                                                    <td>{import2.invoiceNO}</td>
                                                    <td>{import2.invoiceDate}</td>
                                                    <td>{import2.billAmount}</td>
                                                    <td>{import2.taxAmount}</td>
                                                    <td>{import2.totalInvoiceAmount}</td>
                                                    <td>{import2.tdsPercentage}</td>
                                                    <td>{import2.tdsAmt}</td>
                                                    <td>{import2.clearedAmt}</td>
                                                    <td>{import2.totalInvoiceAmount -(import2.clearedAmt + import2.tdsAmt)}</td>
                                                </tr>
                                            )}
                                            <tr className="text-center dynamic-row-width total-row">
                                                <td>Total</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>                                               
                                                <td>{calculateTotal(Invoices, 'billAmount')}</td>
                                                <td>{calculateTotal(Invoices, 'taxAmount')}</td>
                                                <td>{calculateTotal(Invoices, 'totalInvoiceAmount')}</td>
                                                <td></td>
                                                <td>{calculateTotal(Invoices, 'tdsAmt')}</td>
                                                <td>{calculateTotal(Invoices, 'clearedAmt')}</td> 
                                                <td>{calculateTotal(Invoices, 'totalInvoiceAmount') - (calculateTotal(Invoices, 'clearedAmt') +calculateTotal(Invoices, 'tdsAmt'))}</td>                                               
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            ) : null}

                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}


