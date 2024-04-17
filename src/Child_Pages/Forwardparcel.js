import { redirect } from 'react-router-dom';
import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useContext,useRef } from 'react';
import '../Components/Style.css';
import axios from 'axios';
import { toast } from "react-toastify";
import Dashboard from '../Components/Dashboard';
import ipaddress from '../Components/IpAddress';
import { Button } from 'react-bootstrap';
import { faBarcode, faForward, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
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
export default function Forwardparcel() {
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
        login,
        logout,
    } = useContext(AuthContext);
    const { isAuthenticated } = useContext(AuthContext);
    const [getSir, setGetSir] = useState('');
 
 

    const [getSir1, setGetSir1] = useState('');
  
    // If the user is not authenticated, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated) {

            navigate('/login?message=You need to be authenticated to access this page.');
        }
    }, [isAuthenticated, navigate]);
    const [importlist, setImportlist] = useState([]);
    const [importsublist, setImportsublist] = useState([]);



    const getImportlist = (sir,packnum) => {
        if(!(sir.startsWith("IM") || sir.startsWith("D-IM") || sir.startsWith("D-EX"))){
           toast.error("Invalid Barcode Format",{
            autoClose:700
           })
           setGetSir('');
           return;
        }
        if(sir.startsWith("IM")){
            axios
            .get(`http://${ipaddress}import/single/${companyid}/${branchId}/${sir}`)
            .then((response) => {
                // console.log("GET list response:", response.data);
                setImportlist(response.data); // Store the list in the state
                if (!(response.data.dgdcStatus === 'Handed over to DGDC SEEPZ')) {
                    toast.error("Parcel should be enter in DGDC SEEPZ", {
                        autoClose: 700
                    })
                    setGetSir('');
                    return;
                }
                getForwardOutdata1(sir,packnum);
       
            })
            .catch((error) => {
                console.error("GET list error:", error);
                toast.error("Data not found", {
                    autoClose: 700
                })
                setGetSir('');
                return;
                setGetSir('');
                return;
            });
        }
        if(sir.startsWith("D-IM")){
            axios
            .get(`http://${ipaddress}importsub/single/${companyid}/${branchId}/${sir}`)
            .then((response) => {
                // console.log("GET list response:", response.data);
                setImportlist(response.data); // Store the list in the state
                if (!(response.data.dgdcStatus === 'Handed over to DGDC SEEPZ')) {
                    toast.error("Parcel should be enter in DGDC SEEPZ", {
                        autoClose: 700
                    })
                    setGetSir('');
                    return;
                }
                getForwardOutdata1(sir,packnum);
       
            })
            .catch((error) => {
                console.error("GET list error:", error);
                toast.error("Data not found", {
                    autoClose: 700
                })
                setGetSir('');
                return;
                setGetSir('');
                return;
            });
        }
        if(sir.startsWith("D-EX")){
            axios
            .get(`http://${ipaddress}exportsub/byser/${companyid}/${branchId}/${sir}`)
            .then((response) => {
                // console.log("GET list response:", response.data);
                setImportlist(response.data); // Store the list in the state
                if (!(response.data.dgdcStatus === 'Handed over to DGDC SEEPZ')) {
                    toast.error("Parcel should be enter in DGDC SEEPZ", {
                        autoClose: 700
                    })
                    setGetSir('');
                    return;
                }
                getForwardOutdata1(sir,packnum);
       
            })
            .catch((error) => {
                console.error("GET list error:", error);
                toast.error("Data not found", {
                    autoClose: 700
                })
                setGetSir('');
                return;
                setGetSir('');
                return;
            });
        }
      
    };

    // const getImportSublist = () => {
    //     axios
    //         .get(`http://${ipaddress}importsub/single/${companyid}/${branchId}/${sir}`)
    //         .then((response) => {
    //             // console.log("GET list response:", response.data);
    //             setImportsublist(response.data); // Store the list in the state

    //         })
    //         .catch((error) => {
    //             console.error("GET list error:", error);
    //         });
    // };

    const [forwardoutDate1, setForwardOutData1] = useState([]);
    const getForwardOutdata1 = (sir,packnum) => {
        axios
            .get(`http://${ipaddress}forwardout/getsingledata/${companyid}/${branchId}/${sir}/${packnum}`)
            .then((response) => {
                // console.log("GET list response:", response.data);
                setForwardOutData1(response.data); // Store the list in the state
                console.log('forwardoutDate ',forwardoutDate);
              if(response.data.length === 0){
              
      
                handleSubmit(sir,packnum);
                return;
              }
              toast.error("Data already scan", {
                autoClose: 700
             })
              setGetSir('');
              return;
            })
            .catch((error) => {
                console.error("GET list error:", error);
                handleSubmit(sir,packnum);
            });
           
    };
   
    const handlesub = () =>{
        const index1 = getSir.length - 4;
        const sir = getSir.substring(0, index1).toUpperCase();
        const packnum = getSir.substring(index1);
        getImportlist(sir,packnum);
    }


    const handleSubmit = (sir,packnum) => {
   
        axios.post(`http://${ipaddress}forwardout/save/${companyid}/${branchId}/${sir}/${packnum}`)
            .then(response => {
                toast.success("Data scanned successfully", {
                    autoClose: 700
                })
                setGetSir('');
                getForwardlist();
                getImportlist();
              
            })
            .catch(error => {
                console.error('Error sending post request:', error);
                setGetSir('');
                if (error.response && error.response.status === 401) {
                    toast.error("Data already exists.", {
                        autoClose: 700
                    });
                }

            });
    };




    const [forwardlist, setForwardlist] = useState([]);

    const getForwardlist = () => {
        axios
            .get(`http://${ipaddress}forwardout/getdata/${companyid}/${branchId}`)
            .then((response) => {
                // console.log("GET list response:", response.data);
                setForwardlist(response.data); // Store the list in the state

            })
            .catch((error) => {
                console.error("GET list error:", error);
            });
    };


    useEffect(() => {
        getForwardlist();

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

    const formatDateTime = (value) => {
        if (!value) {
            return ""; // Return an empty string if value is empty or undefined
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

    const [forwardoutDate, setForwardOutData] = useState([]);
    const handlesub1 = () =>{
        const index2 = getSir1.length - 4;
        const sir1 = getSir1.substring(0, index2).toUpperCase();
        const packnum1 = getSir1.substring(index2);

        if(!(sir1.startsWith("IM") || sir1.startsWith("D-IM") || sir1.startsWith("D-EX"))){
            toast.error("Invalid Barcode Format",{
             autoClose:700
            })
            setGetSir1('');
            return;
         }
        getForwardOutdata(sir1,packnum1);
    }
    const getForwardOutdata = (sir1,packnum1) => {
        axios
            .get(`http://${ipaddress}forwardout/getsingledata/${companyid}/${branchId}/${sir1}/${packnum1}`)
            .then((response) => {
                // console.log("GET list response:", response.data);
                setForwardOutData(response.data); // Store the list in the state
                if(response.data){
              
                     setGetSir1('');
                     getForwardIndata(sir1,packnum1);
                    return;
                  }
                  if(response.data.length===0){
              
                    toast.error("Data not found in forward out", {
                        autoClose: 700
                     })
                     setGetSir1('');
          
                    return;
                  }
                  setGetSir1('');
                    console.log('forwardoutDate ',forwardoutDate);
                  return;
              
            })
            .catch((error) => {
                console.error("GET list error:", error);
            });
    };

    const getForwardIndata = (sir1,packnum1) => {
        axios
            .get(`http://${ipaddress}forwardin/getsingledata/${companyid}/${branchId}/${sir1}/${packnum1}`)
            .then((response) => {
              
                if(response.data.length === 0){
              
      
                    handleSubmit1(sir1,packnum1);
                    return;
                  }
                  toast.error("Data already scan", {
                    autoClose: 700
                 })
                  setGetSir1('');
                  return;
                console.log('forwardoutDate ',forwardoutDate);
            })
            .catch((error) => {
                console.error("GET list error:", error);
            });
    };



    const handleSubmit1 = (sir1,packnum1) => {
     
        axios.post(`http://${ipaddress}forwardin/save/${companyid}/${branchId}/${sir1}/${packnum1}`)
            .then(response => {
                toast.success("Data scanned successfully", {
                    autoClose: 700
                })
                getForwardlist1();
                setGetSir1('');
                getForwardlist();
                getImportlist();
           
              
                getForwardOutdata();
            })
            .catch(error => {
                console.error('Error sending post request:', error);
                setGetSir1('');
                if (error.response && error.response.status === 401) {
                    toast.error("Data already exists.", {
                        autoClose: 700
                    });
                }

            });
    };


    const [forwardlist1, setForwardlist1] = useState([]);

    const getForwardlist1 = () => {
        axios
            .get(`http://${ipaddress}forwardin/getdata/${companyid}/${branchId}`)
            .then((response) => {
                // console.log("GET list response:", response.data);
                setForwardlist1(response.data); // Store the list in the state

            })
            .catch((error) => {
                console.error("GET list error:", error);
            });
    };


    useEffect(() => {
        getForwardlist1();

    }, [companyid, branchId])


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
                icon={faForward}
                style={{
                    marginRight: '8px',
                    color: 'black', // Set the color to golden
                }}
            />Forward Parcel</h5>

            <Card  >
                <CardBody>


                    <Tabs
                        defaultActiveKey="home"
                        transition={false}
                        id="noanim-tab-example"
                        className="mb-3"
                    >

                        <Tab eventKey="home" title="Forward Out">
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">Scan URL</Label>
                                        <Input
                                            type="text"
                                            name="remarks"
                                            id="branchname"
                                            autoFocus
                                            ref={inputRef}
                                            onKeyDown={handleKeyPress}
                                            placeholder='Scan SIR'
                                            onChange={(e) => setGetSir(e.target.value)}
                                            value={getSir}
                                            className="inputField"

                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <Button id="submitButton"  variant="outline-primary" onClick={handlesub} style={{ marginTop: 32 }}>
                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                                        Scan
                                    </Button>
                                </Col>
                                <Col></Col>
                            </Row>

                            <Row style={{ marginTop: 30 }}>

                                <div className="table-responsive">
                                    <Table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ backgroundColor: '#BADDDA' }}>Sr No.</th>

                                                <th style={{ backgroundColor: '#BADDDA' }}>Type of Transaction</th>
                                                <th style={{ backgroundColor: '#BADDDA' }}>SIR Number</th>
                                                <th style={{ backgroundColor: '#BADDDA' }}>SIR Date</th>
                                                <th style={{ backgroundColor: '#BADDDA' }}>BE Number</th>
                                                <th style={{ backgroundColor: '#BADDDA' }}>Importer Name</th>
                                                <th style={{ backgroundColor: '#BADDDA' }}>NOP</th>
                                                <th style={{ backgroundColor: '#BADDDA' }}>Package Number</th>
                                                <th style={{ backgroundColor: '#BADDDA' }}>Date & Time</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {forwardlist.map((item, index) => (

                                                <tr key={index} >
                                                    <td>{index + 1}</td>
                                                    <td>{item.typeOfTransaction}</td>
                                                    <td>{item.sirNo}</td>
                                                    <td>{formatDateTime(item.sirDate)}</td>
                                                    <td>{item.beNumber}</td>
                                                    <td>{getpartyId[item.party]}</td>
                                                    <td>{item.nop}</td>
                                                    <td>{item.packageNo}</td>
                                                    <td>{convertTimestampToDateTime(item.forwardoutDate)}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>

                            </Row>
                        </Tab>
                        <Tab eventKey="profile" title="Forward In">
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">Scan URL</Label>
                                        <Input
                                            type="text"
                                            name="remarks"
                                            id="branchname"
                                            ref={inputRef1}
                                            onKeyDown={handleKeyPress1}
                                            placeholder='Scan SIR'
                                            onChange={(e) => setGetSir1(e.target.value)}
                                            value={getSir1}
                                            className="inputField"

                                        />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <Button id="submitButton1"  onClick={handlesub1} variant="outline-primary" style={{ marginTop: 32 }}>
                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                                        Scan
                                    </Button>
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row style={{ marginTop: 30 }}>

                                <div className="table-responsive">
                                    <Table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ backgroundColor: '#BADDDA' }}>Sr No.</th>

                                                <th style={{ backgroundColor: '#BADDDA' }}>Type of Transaction</th>
                                                <th style={{ backgroundColor: '#BADDDA' }}>SIR Number</th>
                                                <th style={{ backgroundColor: '#BADDDA' }}>SIR Date</th>
                                                <th style={{ backgroundColor: '#BADDDA' }}>BE Number</th>
                                                <th style={{ backgroundColor: '#BADDDA' }}>Importer Name</th>
                                                <th style={{ backgroundColor: '#BADDDA' }}>NOP</th>
                                                <th style={{ backgroundColor: '#BADDDA' }}>Package Number</th>
                                                <th style={{ backgroundColor: '#BADDDA' }}>Date & Time</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {forwardlist1.map((item, index) => (

                                                <tr key={index} >
                                                    <td>{index + 1}</td>
                                                    <td>{item.typeOfTransaction}</td>
                                                    <td>{item.sirNo}</td>
                                                    <td>{formatDateTime(item.sirDate)}</td>
                                                    <td>{item.beNumber}</td>
                                                    <td>{getpartyId[item.party]}</td>
                                                    <td>{item.nop}</td>
                                                    <td>{item.packageNo}</td>
                                                    <td>{convertTimestampToDateTime(item.forwardinDate)}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>

                            </Row>
                        </Tab>

                    </Tabs>
                </CardBody>
            </Card  >
        </Container>

    )
}
