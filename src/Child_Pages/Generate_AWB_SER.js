import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext, useCallback, useRef } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import "../Components/Style.css";
import ipaddress from "../Components/IpAddress";
import Dropdown from 'react-bootstrap/Dropdown';
import InviceService from "../services/InviceService"
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";

import contachimage from "../services/contacts.png"
import DGDCimage from "../Images/DGDC.png";
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
import { faAngleRight, faAtom, faBolt, faBoxesPacking, faHandHoldingHand, faHistory, faList, faList12, faListAlt, faPencil, faPlaneDeparture, faPlus, faPlusCircle, faSearch, faUserCircle, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from "react-toastify";
import "../Components/Style.css";
import { Pagination } from "react-bootstrap";
import jsPDF from "jspdf";
import { Line, PDFDownloadLink } from "@react-pdf/renderer";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

import { BlobProvider } from "@react-pdf/renderer";
import { data } from "jquery";


export default function Generate_AWB_SER() {
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
  const [getAirway, setAirway] = useState('');
  const index1 = 3;
  const firstPart = getAirway.slice(0, index1).replace(/[^0-9]/g, '');
  const secondPart = getAirway.slice(index1).replace(/[^0-9]/g, '');
  const [flag,setFlag]= useState('N');
  const { isAuthenticated } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef1 = useRef();
 
  const hoverScanAWB = () =>{
    setTimeout(()=>{
      inputRef1.current.focus();
    },100
    );
  }
  
  const openModal = () => {
    setIsModalOpen(true);
    hoverScanAWB();
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setAirway('');
    setGetdata([]);
    setItems([]);
    setFlag('N');
  }


  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);
  const [getlink, setGetLink] = useState("");
  const getScan = {
    companyId: companyid,
    branchId: branchId,
    createdBy: userId,
    editedBy: userId,
    approvedBy: userId,
    link: '',
    status: "A",
  }
  const [items, setItems] = useState([]);
  const [getdata, setGetdata] = useState([]);
  const fetchItemList = useCallback(() => {

    axios
      .get(`http://${ipaddress}export/bysbsbreq/${companyid}/${branchId}/${getdata.sbRequestId}/${getdata.sbNo}`)
      .then((response) => {
        setItems(response.data);
       
        console.log('list ',response.data);
      })
      .catch((error) => {
      });
  }, [companyid, branchId,getdata.sbRequestId,getdata.sbNo]);




  const handleSubmit = () => {
  

    axios.get(`http://${ipaddress}exportshb/getdataforairline?cid=${companyid}&bid=${branchId}&link=${getlink}`)
      .then(response => {

        if (response.data.parcelStatus === "Allow Export" || response.data.parcelStatus === "Let Export") {
          toast.success("Data scanned successfully", {
            autoClose: 700
          })
          setGetdata(response.data);
          openModal();
         
          setGetLink('');
        }
        else {
          setGetLink('');
          toast.error("Data is not out of charge", {
            autoClose: 700
          })
        }


      })
      .catch(error => {
        console.error('Error sending post request:', error);

        if (error) {
          toast.error("Data Not Found.", {
            autoClose: 700
          });
        }
        setGetLink('');
      });
  };
  console.log('getlink ', getScan);


  // useEffect(() => {
  //   if (getlink.length >= 50) {
  //     const timer = setTimeout(() => {
  //       handleSubmit();
  //     }, 30);

  //     return () => clearTimeout(timer);
  //   }
  // }, [getlink]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGetdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const [getAllFlight, setGetAllFlight] = useState([]);
  const [airlineCodee, setAirlinecodee] = useState('');
  const getFlightlist = () => {
    axios
      .get(`http://${ipaddress}Airline/list/${companyid}/${branchId}`)
      .then((response) => {
        // console.log("GET list response:", response.data);
        setGetAllFlight(response.data); // Store the list in the state

      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getFlightlist();
  }, [companyid, branchId])
  const [saveairname, setSaveairname] = useState([]);
  const getSingleAirlineName = () => {
    axios
      .get(`http://${ipaddress}Airline/find1/${companyid}/${branchId}/${getdata.airlineCode}`)
      .then((response) => {
        // console.log("GET list response:", response.data);
        setSaveairname(response.data); // Store the list in the state

      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getSingleAirlineName();
  }, [companyid, branchId, getdata.airlineName])

  const [saveaircodename, setSaveaircodename] = useState([]);
  const getSingleAirlineCode = () => {
    axios
      .get(`http://${ipaddress}Airline/findByCode/${companyid}/${branchId}/${saveairname.airlineCode}`)
      .then((response) => {
        // console.log("GET list response:", response.data);
        setSaveaircodename(response.data); // Store the list in the state

      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };



  useEffect(() => {
    getSingleAirlineCode();
  }, [companyid, branchId, saveairname.airlineCode])

  const [getaircode, setGetaircode] = useState('');

  useEffect(() => {
    setGetaircode(getdata.airlineCode)

  }, [getdata.airlineCode])

  useEffect(() => {
    if (getAirway.length >= 11) {
      const timer = setTimeout(() => {

        getdata.airlineCode = firstPart.replace(/[^0-9]/g, '');
        const airway = firstPart+secondPart.replace(/[^0-9]/g, '');
        getdata.airwayBillNo = airway.slice(0,11);
        setAirway('');
        getSingleAirlineName();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [getAirway]);

  console.log('Saveairline ', getdata);
  
  const handleSubmit1 = () => {
    if(saveairname.airlineName === '' || saveairname.airlineName === undefined || saveairname.airlineName === null){
      toast.error("Please enter correct airway bill number.", {
        autoClose: 700
      });
      return;
    }
  const submitBtn = document.getElementById("submitBtnnn");
    getdata.airlineName = saveairname.airlineName;
    getdata.flightNo = saveairname.flightNo;
    submitBtn.disabled = true;
    axios.post(`http://${ipaddress}exportshb/saveairway/${userId}`, getdata)
      .then(response => {
        toast.success("Data save successfully", {
          autoClose: 700
        })
        submitBtn.disabled = false;
      
       closeModal();
        console.log('Post request successful:', response.data);


      })
      .catch(error => {
        submitBtn.disabled = false;
       

      });
  };

  useEffect(() => {
    fetchItemList();
  }, [fetchItemList]);

  const inputRef = useRef();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById("submitButton").click();
    }
  };
  const savegateinout = (req, sb, ser) => {

    axios
      .post(`http://${ipaddress}gateinout/saveexp/${companyid}/${branchId}/${req}/${sb}/${ser}`)
      .then(() => {

      })
      .catch((error) => {

      });
  };

 

  return (
    <div className="Container" >
      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
        icon={faBolt}
        style={{
          marginRight: '8px',
          color: 'black', // Set the color to golden
        }}
      /> Generate AWB</h5>

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel" htmlFor="search">
                    Scan URL
                  </label>
                  <Input
                    placeholder="Scan QR URl"
                    type="text"
                    id="getlink"
                    value={getlink}
                    autoFocus
                    ref={inputRef}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setGetLink(e.target.value)}
                    className="inputField"
                  />
                </FormGroup>
              </Col>
              <Col style={{ marginTop: 25, marginRight: 90, paddingRight: 90 }} md={2}>

                <Button
                  className="allbutton"
                  variant="outline-success"
                  onClick={handleSubmit}
                  id="submitButton"
                  style={{ marginRight: 5 }}
                >
                  <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Modal Modal isOpen={isModalOpen} onClose={closeModal} toggle={closeModal} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
      } >
        <ModalHeader toggle={closeModal} style={{
          backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
          boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
          border: '1px solid rgba(0, 0, 0, 0.3)',
          borderRadius: '0',
          backgroundColor: '#85144b',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          //backgroundPosition: 'center',
          backgroundPosition: 'center',
        }}>
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
            icon={faEdit}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Update Airway Bill Number</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label className="forlabel" for="branchId">ER No</Label>
                <Input
                  type="text"
                  name="challanNo"
                  id="challanNo"
                  maxLength={30}
                  required
                  tabIndex={-2}
                  value={getdata.erNo}
                  className="inputField"

                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="forlabel" for="branchId">SB Number</Label>
                <Input
                  type="text"
                  name="challanNo"
                  id="challanNo"
                  maxLength={30}
                  requiretabIndex={-3}
                  value={getdata.sbNo}
                  className="inputField"

                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="forlabel" for="branchId">No. of packages</Label>
                <Input
                  type="text"
                  name="challanNo"
                  id="challanNo"
                  maxLength={30}
                  tabIndex={-3}
                  required
                  value={getdata.noOfPackages}
                  className="inputField"

                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Parcel Status</Label>
                <Input
                  type="text"
                  name="challanNo"
                  id="challanNo"
                  tabIndex={-4}
                  maxLength={30}
                  required
                  value={getdata.parcelStatus}
                  className="inputField"

                />
              </FormGroup>
            </Col>
            <Col md={8}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Airline</Label>
                <select
                  id="airlineCode"
                  className="form-control"
                  name="airlineCode"
                  onChange={handleChange}
                  tabIndex={-5}
                  value={getdata.airlineCode}
                >
                  <option value="">Select Airline</option>
                  {getAllFlight.map((data, index) => (
                    <option key={index} value={data.airlineCode}>{data.airlineName}</option>
                  ))}
                </select>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Number</Label>
                <Input
                  type="text"
                  name="airlineCode"
                  id="airlineCode"
                  maxLength={30}
                  tabIndex={-6}
                  required
                  value={getdata.airlineCode}
                  className="inputField"

                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Airway Bill Number</Label>
                <Input
                  type="text"
                  name="airwayBillNo"
                  id="airwayBillNo"
                  tabIndex={-7}
                  maxLength={30}
                  required
                  onChange={handleChange}
                  value={getdata.airwayBillNo}
                  className="inputField"

                />
              </FormGroup>
            </Col>
            <Col className="text-center" style={{ marginTop: 34 }} >
              <h4>OR</h4>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Scan Airway Bill Number</Label>
                <input
                  type="text"
                  onChange={(e) => setAirway(e.target.value)}
                  value={getAirway}
                  ref={inputRef1}
                  style={{height:'38px',borderRadius:4}}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>

            <Col className="text-center">
             
              <Button onClick={handleSubmit1} id="submitBtnnn" variant="outline-success">
                Submit
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}