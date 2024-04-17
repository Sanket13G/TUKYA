import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext, useCallback, useRef } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import ipaddress from "../Components/IpAddress";
import * as XLSX from "xlsx";
import ReactLoading from 'react-loading';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faFileExcel, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from "react-toastify";
import "../Components/Style.css";

export default function Scan_Parcels() {
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
    const [getlink, setGetLink] = useState("");
    const [getalldata, setAlldata] = useState([]);
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
    const { isAuthenticated } = useContext(AuthContext);
    useEffect(() => {
        if (!isAuthenticated) {
            navigate(
                "/login?message=You need to be authenticated to access this page."
            );
        }
    }, [isAuthenticated, navigate]);


    const getScan = {
        companyId: companyid,
        branchId: branchId,
        createdBy: userId,
        editedBy: userId,
        approvedBy: userId,
        link: getlink,
        status: "A",


    }

    const handleSubmit = () => {
        getScan.companyId = companyid;
        getScan.branchId = branchId;
        getScan.createdBy = userId;
        getScan.editedBy = userId;
        getScan.approvedBy = userId;


        axios.post(`http://${ipaddress}export/readgateinurl`, getScan)
            .then(response => {
                toast.success("Data scanned successfully", {
                    autoClose: 700
                })

                console.log('Post request successful:', response.data);
                setGetLink('');

                getalldataa();
            })
            .catch(error => {
                // Handle error
                console.error('Error sending post request:', error);

                // Check if the error status code is 401
                if (error.response && error.response.status === 401) {
                    // Show an error message for unauthorized access
                    toast.error("Data already exists.", {
                        autoClose: 700
                    });
                }
                setGetLink('');
            });
    };
    const [len, setLen] = useState(0); // Initialize len with 0
    //     if(handleSubmit){
    //         setTimeout(() => {

    //     const linkLength = getlink.length;
    //     setLen(linkLength);
    // }, 10);

    // }

    // useEffect(() => {
    //     // Check if the length of getlink matches len
    //     if (getlink.length >= 50) {
    //         // Delay the execution of handleSubmit by 10 milliseconds
    //         const timer = setTimeout(() => {
    //             handleSubmit();
    //         }, 60);

    //         // Cleanup the timer to avoid multiple calls
    //         return () => clearTimeout(timer);
    //     }
    // }, [getlink, len]);



    const [exportincount, setExportinCount] = useState(0);
    const [importincount, setImportincount] = useState(0);

    const [exportoutcount, setExportoutCount] = useState(0);
    const [importoutcount, setImportoutcount] = useState(0);
    const [subexportoutcount, setSubexportoutCount] = useState(0);
    const [subimportoutcount, setSubimportoutcount] = useState(0);
    const getalldataa = () => {
        axios
            .get(`http://${ipaddress}scan/seepzdata/${companyid}/${branchId}`)
            .then((response) => {
                const exportInCount = response.data.filter(item => item.typeOfTransaction === 'Export-in').length;
                setExportinCount(exportInCount);
                const importInCount = response.data.filter(item => item.typeOfTransaction === 'Import-in').length;
                setImportincount(importInCount);
                const exportOutCount = response.data.filter(item => item.typeOfTransaction === 'Export-out').length;
                setExportoutCount(exportOutCount);
                const importOutCount = response.data.filter(item => item.typeOfTransaction === 'Import-out').length;
                setImportoutcount(importOutCount);
                const subexportOutCount = response.data.filter(item => item.typeOfTransaction === 'DTA-Export-Out').length;
                setSubexportoutCount(subexportOutCount);
                const subimportOutCount = response.data.filter(item => item.typeOfTransaction === 'DTA-Import-out').length;
                setSubimportoutcount(subimportOutCount);
                setAlldata(response.data);
                // Store the list in the state
            })
            .catch((error) => {
                console.error("GET list error:", error);
            });
    };

    useEffect(() => {
        getalldataa();
    }, [companyid, branchId])


    const convertTimestampToDateTime = (timestamp) => {
        const date = new Date(timestamp);

        // Get the individual components (day, month, year, hours, minutes, seconds)
        const day = date.getDate();
        const month = date.getMonth() + 1; // Note: Months are zero-based, so we add 1
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        // Create a formatted date and time string
        const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

        return formattedDateTime;
    }

    const [partys, setPartys] = useState([]);
    const [getpartyId, setGetpartyId] = useState({});

    const fetchPartyNames = async () => {
        try {
            const response = await fetch(`http://${ipaddress}parties/getAll/${companyid}/${branchId}`);
            const data = await response.json();
            const namesMap = {};
            data.forEach(party => {
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
    }, [companyid, branchId])

    const [loading, setLoading] = useState(false);
    const [scanalldata, setScalalldata] = useState('');
    const index1 = scanalldata.length - 4;
    const sir = scanalldata.substring(0, index1).toUpperCase();
    const packnum = scanalldata.substring(index1);
    const [exportsubdata, setExportsubdata] = useState([]);

   

    const handleSubmit1 = () => {
        setLoading(true);
        axios.post(`http://${ipaddress}scan/alldataforseepzgateout/${companyid}/${branchId}/${userId}/${sir}/${packnum}`)
            .then(response => {
                if (response.data === "wrong barcode") {
                    toast.error("Invalid qr or barcode format", {
                        autoClose: 700
                    });
                    setScalalldata('');
                    getalldataa();
                    setLoading(false);
                    return;
                }
               
                if (response.data === "not found") {
                    toast.error("Data not found", {
                        autoClose: 700
                    });
                    setScalalldata('');
                    getalldataa();
                    setLoading(false);
                    return;
                }
                if(response.data === 'NOP is not matched'){
                    toast.success("Data scanned successfully", {
                        autoClose: 700
                    })
                    setScalalldata('');
                    getalldataa();
                    setLoading(false);
                    return;
                }
                if (response.data === "wrong status") {
                    toast.error("Data hasn't been handed over to Party/CHA or carting agent", {
                        autoClose: 700
                    });
                    setScalalldata('');
                    getalldataa();
                    setLoading(false);
                    return;
                }
                if (response.data === "Dgdc_seepz_out_scan is already 'Y'") {
                    toast.error("Data already scanned", {
                        autoClose: 700
                    });
                    setScalalldata('');
                    getalldataa();
                    setLoading(false);
                    return;
                }

               if(response.data === "success"){
                toast.success("Data scanned successfully", {
                    autoClose: 700
                });

                console.log('Post request successful:', response.data);
                setScalalldata('');
                getalldataa();
   
                setLoading(false);
               }
               setLoading(false);
               getimportdata();
               getexportdata();
               getexportsubdata();
               getimportsubdata();
            })
            .catch(error => {
                if (error) {
                    toast.error("Data not found", {
                        autoClose: 700
                    });
                }
                setScalalldata('');
                getalldataa();
                setLoading(false);
            })

    };




    const [scanalldata1, setScalalldata1] = useState('');




    const [sir1, setSir1] = useState('');
    const [pack1, setPack1] = useState('');
    const [exportsubdata1, setExportsubdata1] = useState([]);

    const handleSuccess = (message) => {
        toast.success(message, {
            autoClose: 700,
        });
        resetInputs();
    };

    const handleError = (message) => {
        toast.error(message, {
            autoClose: 700,
        });
        resetInputs();
    };

    const handleError1 = (message) => {
        toast.error(message, {
            autoClose: 1800,
            style: {
                width: '500px'
            }
        });
        resetInputs();
    };

    const resetInputs = () => {
        setScalalldata1('');
        // setSir1('');
        // setPack1('');
        getalldataa();
    };

    function formatDate1(date) {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
        const year = date.getFullYear().toString();

        return `${year}-${month}-${day} 00:00:00`;
    }
    const [loading1,setLoading1] = useState(false);
    const checkexportsubout1 = () => {
        setLoading1(true);
        const date = formatDate1(new Date());
        const index2 = scanalldata1.length - 4;
        const sir1 = scanalldata1.substring(0, index2).toUpperCase();
        const pack1 = scanalldata1.substring(index2);
        if (scanalldata1.startsWith("https")) {
            const getScan = {
                companyId: companyid,
                branchId: branchId,
                createdBy: userId,
                editedBy: userId,
                approvedBy: userId,
                link: scanalldata1,
            };
            axios.post(`http://${ipaddress}export/readgateinurl/${date}`, getScan)
                .then((response) => {
                    if (!response.data) {
                        handleError("Data not found");
                        getalldataa();
                        setLoading1(false);
                    } else if (response.data === "found") {
                        handleError("Data already scan");
                        getalldataa();
                        setLoading1(false);
                    }
                    if(response.data === 'NOP is not matched'){
                        handleSuccess("Data scanned successfully");
                        getalldataa();
                        setLoading1(false);
                    }
    
                    else if (response.data.startsWith("The LOA for the")) {
                        handleError1(response.data);
                        getalldataa();
                        setLoading1(false);
                    }
                    else if (response.data === "success") {
                        handleSuccess("Data scanned successfully");
                        getalldataa();
                        setLoading1(false);
                    } else {
                        console.log('Post request successful:', response.data);
                        handleSuccess("Data scanned successfully");
                        getalldataa();
                        setLoading1(false);
                    }
                    setLoading1(false);
                })
                .catch((error) => {
                    console.error('Error sending post request:', error);
                    if (error.response && error.response.status === 401) {
                        handleError("Data not found.");
                        getalldataa();
                        setLoading1(false);
                    }
                    setLoading1(false);
                    getalldataa();
                });
        } else {
               
                axios.post(`http://${ipaddress}scan/alldataforseepzgatein/${companyid}/${branchId}/${userId}/${sir1}/${pack1}`)
                .then((response) => {
                   if(response.data === "wrong barcode"){
                    handleError("Invalid qr or barcode format");
                    getalldataa();
                    setLoading1(false);
                   }
                   if(response.data === "not found"){
                    handleError("Data not found");
                    getalldataa();
                    setLoading1(false);
                   }
                 

                   
                   if (response.data === "wrong status") {
                  
                        handleError("Data hasn't been exit from cargo gate");
                        getalldataa();
                        setLoading1(false);
                    }
                    if(response.data === "Dgdc_seepz_out_scan is already 'Y'"){
                        handleError("Data already scanned");
                        getalldataa();
                        setLoading1(false);
                       }
                    if (response.data === "success") {
                  
                        handleSuccess("Data scanned successfully");
                        getalldataa();
                        setLoading1(false);
                    } 
                       
                       
                    setLoading1(false);
                })
                .catch((error) => {
                    if (error) {
                        handleError("Data not found");
                        getalldataa();
                        setLoading1(false);
                    }
                    setLoading1(false);
                });
            
        }
      
    };

   


    const inputRef = useRef();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById("submitButton").click();
        }
    };


    const inputRef1 = useRef();

    const handleKeyPress1 = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById("submitButton10").click();
        }
    };
    const [importdata, setImportdata] = useState([]);
    const [exportdata, setExportdata] = useState([]);
    const [importsubdata, setImportsubdata] = useState([]);
    const [exportSubdata, setExportSubdata] = useState([]);



    const getimportdata = () => {
        axios.get(`http://${ipaddress}scan/importoutdata/${companyid}/${branchId}`)
            .then((response) => {

                setImportdata(response.data);
                console.log('importdata', importdata);
            })
            .catch((error) => {

            })
    }

    const getexportdata = () => {
        axios.get(`http://${ipaddress}scan/exportoutdata/${companyid}/${branchId}`)
            .then((response) => {

                setExportdata(response.data);
            })
            .catch((error) => {

            })
    }


    const getexportsubdata = () => {
        axios.get(`http://${ipaddress}scan/exportsuboutdata/${companyid}/${branchId}`)
            .then((response) => {

                setExportSubdata(response.data);
            })
            .catch((error) => {

            })
    }


    const getimportsubdata = () => {
        axios.get(`http://${ipaddress}scan/importsuboutdata/${companyid}/${branchId}`)
            .then((response) => {

                setImportsubdata(response.data);
            })
            .catch((error) => {

            })
    }

    useEffect(() => {
        getimportdata();
        getexportdata();
        getexportsubdata();
        getimportsubdata();
    }, [companyid, branchId])




    const handleExcelDownload = () => {
        getimportdata();

        // Create a subset of tpdata containing only the fields you want to export
        const excelData = importdata.map((item, index) => ({
            Sr_No: index + 1,
            SIR_No: item.sirNo,
            MAWB: item.mawb,
            HAWB: item.hawb,
            Party_Name: getpartyId[item.importerId],
            Parcel_Qty: item.nop,
        }));

        const excelData1 = exportdata.map((item, index) => ({
            Sr_No: index + 1,
            SER_No: item.serNo,
            Request_Id: item.sbRequestId,
            SB_No: item.sbNo,
            Party_Name: getpartyId[item.nameOfExporter],
            Parcel_Qty: item.noOfPackages,
        }));


        const excelData2 = importsubdata.map((item, index) => ({
            Sr_No: index + 1,
            SER_No: item.sirNo,
            Request_Id: item.requestId,
            SB_No: '',
            Party_Name: getpartyId[item.exporter],
            Parcel_Qty: item.nop,
        }));


        const excelData3 = exportSubdata.map((item, index) => ({
            Sr_No: index + 1,
            SER_No: item.serNo,
            Request_Id: item.requestId,
            SB_No: '',
            Party_Name: getpartyId[item.exporter],
            Parcel_Qty: item.nop,
        }));

        // Define headers for both sets of data
        const headers = [
            "Sr No",
            "SIR No/SER No",
            "MAWB/Request Id",
            "HAWB/SB No",
            "Party Name",
            "Parcel Qty",
        ];

        // Concatenate data from excelData and excelData1 with headers and empty rows
        const combinedData = [
            [`Delivery Import Register`],
            headers,
            ...excelData.map((data) => Object.values(data)),
            [`Total: ${importdata.length}`],
            [], // Empty row
            [], // Empty row
            ['Delivery Export Register'],
            headers,
            ...excelData1.map((data) => Object.values(data)),
            [`Total: ${exportdata.length}`],
            [], // Empty row
            [], // Empty row
            ['Delivery Subcontract Import Register'],
            headers,
            ...excelData2.map((data) => Object.values(data)),
            [`Total: ${importsubdata.length}`],
            [], // Empty row
            [], // Empty row
            ['Delivery Subcontract Export Register'],
            headers,
            ...excelData3.map((data) => Object.values(data)),
            [`Total: ${exportSubdata.length}`],
        ];

        const ws = XLSX.utils.aoa_to_sheet(combinedData);

        const wb = XLSX.utils.book_new();

        // Set custom column widths (change the numbers to adjust the widths)
        ws["!cols"] = [
            { wch: 10 }, // Column A width
            { wch: 15 }, // Column B width
            { wch: 25 }, // Column C width
            { wch: 20 }, // Column D width
            { wch: 40 }, // Column E width
            { wch: 12 }, // Column F width
        ];
        // Make the headers bold
        ws["!rows"] = [{ hpt: 16, hpx: 16 }];
        XLSX.utils.book_append_sheet(wb, ws, "TranshipmentData");

        const excelFileName = "Delivery_Register.xlsx";

        // Use the writeFile function to create and download the Excel file
        XLSX.writeFile(wb, excelFileName);
    };



    return (
        <>

            <Container>

                <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
                    icon={faBarcode}
                    style={{
                        marginRight: '8px',
                        color: 'black', // Set the color to golden
                    }}
                />Scan Parcel</h5>

                <Card  >
                    <CardBody>


                        <Tabs
                            defaultActiveKey="home"
                            transition={false}
                            id="noanim-tab-example"
                            className="mb-3"
                        >

                            <Tab eventKey="home" title="Incoming">
                            {loading1 && (
                                    <div style={styles.overlay}>
                                        <ReactLoading type="spin" color="#0000FF" height={300} width={80} />
                                    </div>
                                )}
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label className="forlabel" for="branchId">Scan URL</Label>
                                            <Input
                                                type="text"
                                                name="remarks"
                                                id="branchname"
                                                placeholder='Scan QR/SIR'
                                                value={scanalldata1}
                                                ref={inputRef1}
                                                onKeyDown={handleKeyPress1}
                                                autoFocus
                                                onChange={(e) => setScalalldata1(e.target.value)}
                                                className="inputField"

                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <Button id="submitButton10" variant="outline-primary" onClick={checkexportsubout1} style={{ marginTop: 32 }}>
                                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                                            Scan
                                        </Button>
                                    </Col>
                                    <Col md={4}>
                                        <Table className="table table-striped table-hover">
                                            <thead className="thead-dark bg-dark">
                                                <tr>
                                                    <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Type</th>
                                                    <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>IN</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="text-center">
                                                    <td>Export</td>
                                                    <td>{exportincount}</td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td>Import</td>
                                                    <td>{importincount}</td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td>Total</td>
                                                    <td>{exportincount + importincount}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>


                            </Tab>

                            <Tab eventKey="profile" title="Outgoing">
                                {loading && (
                                    <div style={styles.overlay}>
                                        <ReactLoading type="spin" color="#0000FF" height={300} width={80} />
                                    </div>
                                )}
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label className="forlabel" for="branchId">Scan URL</Label>
                                            <Input
                                                type="text"
                                                name="remarks"
                                                id="branchname"
                                                placeholder='Scan SIR/SER'
                                                value={scanalldata}
                                                onChange={(e) => setScalalldata(e.target.value)}
                                                ref={inputRef}
                                                onKeyDown={handleKeyPress}
                                                className="inputField"
                                                autoFocus
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <Button id="submitButton" variant="outline-primary" onClick={handleSubmit1} style={{ marginTop: 32 }}>
                                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                                            Scan
                                        </Button>
                                    </Col>

                                    <Col md={4}>
                                        <Table className="table table-striped table-hover">
                                            <thead className="thead-dark bg-dark">
                                                <tr>
                                                    <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Type</th>
                                                    <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>OUT</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="text-center">
                                                    <td>Export</td>
                                                    <td>{exportoutcount}</td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td>Import</td>
                                                    <td>{importoutcount}</td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td>Sub-Export</td>
                                                    <td>{subexportoutcount}</td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td>Sub-Import</td>
                                                    <td>{subimportoutcount}</td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td>Total</td>
                                                    <td>{exportoutcount + importoutcount + subexportoutcount + subimportoutcount}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                <Button
                                    type="button"
                                    variant="outline-success"
                                    style={{ marginRight: "10px", marginBottom: "15px" }}
                                    onClick={() => { handleExcelDownload(); getimportdata(); getexportdata(); getimportsubdata(); getexportsubdata() }}
                                >
                                    <FontAwesomeIcon
                                        icon={faFileExcel}
                                        style={{ marginRight: "5px" }}
                                    />
                                    XLS
                                </Button>
                                <Row>


                                </Row>
                            </Tab>


                        </Tabs>
                        <Row style={{ marginTop: 30 }}>
                            <div className="table-responsive">
                                <Table className="table table-striped table-hover">
                                    <thead className="thead-dark bg-dark">
                                        <tr>
                                            <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Sr No.</th>
                                            <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Type of Transaction</th>

                                            <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>SER / SIR NO</th>
                                            <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Parcel Type</th>
                                            <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>SB/BE No.</th>
                                            <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Exporter/Importer Name</th>
                                            <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>No. of packages</th>
                                            <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Package Number</th>
                                            <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Date & Time</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getalldata.map((item, index) => (

                                            <tr key={index} className={item.status === 'Y' ? 'status-Y' : 'status-N'} style={item.status === 'Y' ? { backgroundColor: 'red' } : {}}>

                                                <td style={item.status === 'Y' ? { backgroundColor: '#b0e8dc', textAlign: 'center', fontFamily: 'Your-Data-Font' } : { textAlign: 'center', fontFamily: 'Your-Data-Font' }} >{index + 1}</td>
                                                <td style={item.status === 'Y' ? { backgroundColor: '#b0e8dc', textAlign: 'center', fontFamily: 'Your-Data-Font' } : { textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item.typeOfTransaction}</td>

                                                <td style={item.status === 'Y' ? { backgroundColor: '#b0e8dc', textAlign: 'center', fontFamily: 'Your-Data-Font' } : { textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item.srNo}</td>
                                                <td style={item.status === 'Y' ? { backgroundColor: '#b0e8dc', textAlign: 'center', fontFamily: 'Your-Data-Font' } : { textAlign: 'center', fontFamily: 'Your-Data-Font' }}></td>
                                                <td style={item.status === 'Y' ? { backgroundColor: '#b0e8dc', textAlign: 'center', fontFamily: 'Your-Data-Font' } : { textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item.doc_Ref_No}</td>
                                                <td style={item.status === 'Y' ? { backgroundColor: '#b0e8dc', textAlign: 'center', fontFamily: 'Your-Data-Font' } : { textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{getpartyId[item.party]}</td>
                                                <td style={item.status === 'Y' ? { backgroundColor: '#b0e8dc', textAlign: 'center', fontFamily: 'Your-Data-Font' } : { textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item.nop}</td>
                                                <td style={item.status === 'Y' ? { backgroundColor: '#b0e8dc', textAlign: 'center', fontFamily: 'Your-Data-Font' } : { textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item.packnum}</td>
                                                <td style={item.status === 'Y' ? { backgroundColor: '#b0e8dc', textAlign: 'center', fontFamily: 'Your-Data-Font' } : { textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{convertTimestampToDateTime(item.gateiout)}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>

                        </Row>
                    </CardBody>
                </Card  >
            </Container>




        </>

    )
}
