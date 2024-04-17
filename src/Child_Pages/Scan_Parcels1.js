import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext, useCallback, useRef } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import ipaddress from "../Components/IpAddress";
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
import { faBarcode, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from "react-toastify";
import "../Components/Style.css";

export default function Scan_Parcels1() {
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
                getalldataa();
                console.log('Post request successful:', response.data);
                setGetLink('');

                getalldataa();
            })
            .catch(error => {
                // Handle error
                console.error('Error sending post request:', error);
                getalldataa();
                // Check if the error status code is 401
                if (error.response && error.response.status === 401) {
                    // Show an error message for unauthorized access
                    toast.error("Data already exists.", {
                        autoClose: 700
                    });
                    getalldataa();
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

    useEffect(() => {
        // Check if the length of getlink matches len
        if (getlink.length >= 50) {
            // Delay the execution of handleSubmit by 10 milliseconds
            const timer = setTimeout(() => {
                handleSubmit();
            }, 60);

            // Cleanup the timer to avoid multiple calls
            return () => clearTimeout(timer);
        }
    }, [getlink, len]);



    const [exportincount,setExportinCount] = useState(0);
    const [importoutcount,setImportoutcount] = useState(0);
    const getalldataa = () => {
        axios
            .get(`http://${ipaddress}scan/cargodata/${companyid}/${branchId}`)
            .then((response) => {
                const exportInCount = response.data.filter(item => item.typeOfTransaction === 'Export-in').length;
                setExportinCount(exportInCount);
                const importOutCount = response.data.filter(item => item.typeOfTransaction === 'Import-out').length;
                setImportoutcount(importOutCount);
                setAlldata(response.data); // Store the list in the state
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


    const [scanalldata, setScalalldata] = useState('');
    const index1 = scanalldata.length - 4;
    const sir = scanalldata.substring(0, index1).toUpperCase();
    const packnum = scanalldata.substring(index1);
    const [exportsubdata, setExportsubdata] = useState([]);
    const [loading1, setLoading1] = useState(false);
    console.log('sir ', sir);
    


    const handleSubmit1 = () => {
        setLoading1(true);


        axios.post(`http://${ipaddress}scan/alldataforcargoout/${companyid}/${branchId}/${userId}/${sir}/${packnum}`)
            .then(response => {
                if (response.data === "wrong barcode") {
                    toast.error("Invalid qr or barcode format", {
                        autoClose: 700
                    });
                    setScalalldata('');
                    getalldataa();
                    setLoading1(false);
                    return;
                }
               
                if (response.data === "not found") {
                    toast.error("Data not found", {
                        autoClose: 700
                    });
                    setScalalldata('');
                    getalldataa();
                    setLoading1(false);
                    return;
                }
                if(response.data === 'NOP is not matched'){
                    toast.success("Data scanned successfully", {
                        autoClose: 700
                    })
                    setScalalldata('');
                    getalldataa();
                    setLoading1(false);
                    return;
                }
                if (response.data === "wrong status") {
                    toast.error("Data hasn't been handed over to carting agent", {
                        autoClose: 700
                    });
                    setScalalldata('');
                    getalldataa();
                    setLoading1(false);
                    return;
                }
                if (response.data === "Dgdc_seepz_out_scan is already 'Y'") {
                    toast.error("Data already scanned", {
                        autoClose: 700
                    })
                    getalldataa();
                    setScalalldata('');
                    setLoading1(false);
                    return;
                }
                if(response.data === "success"){
                    toast.success("Data scanned successfully", {
                        autoClose: 700
                    })
                    setLoading1(false);
                    setScalalldata('');
                    getalldataa();
                }
            
                setLoading1(false);
                setScalalldata('');
                getalldataa();
              
            })
            .catch(error => {
                if (error) {
                    toast.error("Data not found", {
                        autoClose: 700
                    })
                    getalldataa();
                    setLoading1(false);
                }
                getalldataa();
                setScalalldata('');
                setLoading1(false);
            });
    };

    // useEffect(() => {
    //     // Check if the length of getlink matches len
    //     if (scanalldata.length >= 10) {
    //         // Delay the execution of handleSubmit by 10 milliseconds
    //         const timer = setTimeout(() => {
    //             checkexportsubout();

    //         }, 60);

    //         // Cleanup the timer to avoid multiple calls
    //         return () => clearTimeout(timer);
    //     }
    // }, [scanalldata]);



   


    const [scanalldata1, setScalalldata1] = useState('');
    const index2 = scanalldata1.length - 4;
    const sir1 = scanalldata1.substring(0, index2).toUpperCase();
    const packnum1 = scanalldata1.substring(index2);
    const [exportsubdata1, setExportsubdata1] = useState([]);
    const [loading, setLoading] = useState(false);
 


    const handleSubmit2 = () => {
          setLoading(true);


        axios.post(`http://${ipaddress}scan/alldataforcargoin/${companyid}/${branchId}/${userId}/${sir1}/${packnum1}`)
            .then(response => {
                if (response.data === "wrong barcode") {
                    toast.error("Invalid qr or barcode format", {
                        autoClose: 700
                    });
                    setScalalldata1('');
                    getalldataa();
                    setLoading(false);
                    return;
                }
               
                if (response.data === "not found") {
                    toast.error("Data not found", {
                        autoClose: 700
                    });
                    setScalalldata1('');
                    getalldataa();
                    setLoading(false);
                    return;
                }
                if(response.data === 'NOP is not matched'){
                    toast.success("Data scanned successfully", {
                        autoClose: 700
                    })
                    setScalalldata1('');
                    getalldataa();
                    setLoading(false);
                    return;
                }
                if (response.data === "wrong status") {
                    toast.error("Data hasn't been exit from dgdc seepz gate", {
                        autoClose: 700
                    });
                    setScalalldata1('');
                    getalldataa();
                    setLoading(false);
                    return;
                }
                if (response.data === "Dgdc_seepz_out_scan is already 'Y'") {
                    toast.error("Data already scanned", {
                        autoClose: 700
                    })
                    getalldataa();
                    setScalalldata1('');
                    setLoading(false);
                    return;
                }
                if(response.data === "success"){
                    toast.success("Data scanned successfully", {
                        autoClose: 700
                    });
                    getalldataa();
                    setScalalldata1('');
                    setLoading(false);
                }
                getalldataa();
                setScalalldata1('');
                setLoading(false);
            })
            .catch(error => {
                if (error) {
                    toast.error("Data not found", {
                        autoClose: 700
                    })
                    getalldataa();
                    setLoading(false);
                }
                getalldataa();
                setScalalldata1('');
                setLoading(false);
            });
    };

    // useEffect(() => {
    //     // Check if the length of getlink matches len
    //     if (scanalldata1.length >= 10) {
    //         // Delay the execution of handleSubmit by 10 milliseconds
    //         const timer = setTimeout(() => {
    //             checkexportsubout1();

    //         }, 60);

    //         // Cleanup the timer to avoid multiple calls
    //         return () => clearTimeout(timer);
    //     }
    // }, [scanalldata1]);

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
      document.getElementById("submitButton1").click();
    }
  };
    return (
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
                                            placeholder='Scan SER'
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
                                    <Button id="submitButton1" variant="outline-primary" onClick={handleSubmit2} style={{ marginTop: 32 }}>
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
                                                <td>Total</td>
                                                <td>{exportincount}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>

                           
                        </Tab>
                        <Tab eventKey="profile" title="Outgoing">
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
                                            placeholder='Scan SIR'
                                            ref={inputRef}
                                            onKeyDown={handleKeyPress}
                                            value={scanalldata}
                                            onChange={(e) => setScalalldata(e.target.value)}
                                            className="inputField"
                                            autoFocus
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
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
                                                <td>Import</td>
                                                <td>{importoutcount}</td>
                                            </tr>
                                          
                                            <tr className="text-center">
                                                <td>Total</td>
                                                <td>{importoutcount}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
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

                                                <tr key={index} >
                                                    
                                                    <td style={item.status === 'Y' ? { backgroundColor: '#b0e8dc', textAlign: 'center', fontFamily: 'Your-Data-Font' } : { textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{index + 1}</td>
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



    )
}
