import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext, useCallback, useRef, useId } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import "../Components/Style.css";
import ipaddress from "../Components/IpAddress";
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";

import contachimage from "../services/contacts.png"
import DGDCimage from "../Images/DGDC.png";
import InviceService from "../services/InviceService"
import Swal from 'sweetalert2';
import { FaClosedCaptioning, FaTruck, FaHandPaper, FaPersonBooth, FaTruckLoading } from 'react-icons/fa';
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
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight, faArrowTurnRight, faAtom, faBolt, faCity, faCross, faExternalLink, faExternalLinkAlt, faGavel, faGear, faHand, faHandFist, faHandHoldingHand, faHandsHolding, faHistory, faIdBadge, faIdCardAlt, faIdCardClip, faPenClip, faPenFancy, faPencil, faPerson, faPersonBooth, faPlaneDeparture, faPlus, faRemove, faSearch, faSquarePen, faTentArrowTurnLeft, faTruckArrowRight, faUpload, faUserCircle, faWeightHanging, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faHandshake, faEye, faRefresh, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
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
import { tr } from "date-fns/locale";


export default function CombinedRepresentative() {
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

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  const [partys, setPartys] = useState([]);
  const [getpartyId, setGetpartyId] = useState({});
  const [selectedParty, setSelectedPartyId] = useState('');

  console.log('selectedParty ', selectedParty);

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
    }
  };


  useEffect(() => {
    fetchPartyNames();
  }, [companyid, branchId])

  const [getexistingdata, setgetexistingdata] = useState([]);

  const getData = () => {
    axios.get(`http://${ipaddress}combineRepresentative/getall/${companyid}/${branchId}`)
      .then((response) => {
        setgetexistingdata(response.data);
      }

      )
      .catch((error) => {

      }

      )
  }


  useEffect(() => {
    getData();
  }, [companyid, branchId])

  const [flag, setFlag] = useState('');
  const [selectId, setSelectId] = useState('');
  const [selectGroup, setSelectGroup] = useState('');
  const [isModalOpenforViewAll, setisModalOpenforViewAll] = useState(false);

  const openModalForViewAll = (data, status, group) => {
    setSelectId(data);
    setisModalOpenforViewAll(true);
    getDataByERP(data);
    setSelectGroup(group);
    setFlag(status);
  }

  const closeModalForViewAll = () => {
    setSelectId('');
    setisModalOpenforViewAll(false);
    setErpdata([]);
    setSelectGroup('');
    setFlag('');
    setSelectedPartyId('');
  }

  const [erpData, setErpdata] = useState([]);
  const getDataByERP = (erpid) => {
    axios.get(`http://${ipaddress}combineRepresentative/getbyerp/${companyid}/${branchId}/${erpid}`)
      .then((response) => {
        setErpdata(response.data);
      }

      )
      .catch((error) => {

      }

      )
  }

  const deleteAll = (erpid) => {
    
    Swal.fire({
      title: 'Are you sure?',
      html: `Are you sure you want to delete this data?`,
      icon: 'warning',
      showCancelButton: true,
      customClass: {
          icon: 'icon-smaller' 
      },
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!'
  }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://${ipaddress}combineRepresentative/deleteAll/${companyid}/${branchId}/${erpid}`)
        .then((response) => {
          toast.error("Data delete successfully",{
            autoClose: 700
          })
          getData();
        }
  
        )
        .catch((error) => {
           if(error){
            toast.error("Something went wrong",{
              autoClose: 700
            })
            getData();
           }
        }
  
        )
      }})
      
   
  }

  const saveAddParty = () => {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    if (selectedParty === 'N' || selectedParty === '') {
      toast.error("Please select the party", {
        autoClose: 700
      })
      submitBtn.disabled = false;
      return;
    }

    axios.post(`http://${ipaddress}combineRepresentative/save/${companyid}/${branchId}/${selectId}/${selectGroup}/${selectedParty}`)
      .then((response) => {
        toast.success("Data save successfully", {
          autoClose: 700
        })
        setSelectedPartyId('');
        getDataByERP(selectId);
        submitBtn.disabled = false;
      }

      )
      .catch((error) => {
        if (error) {
          toast.error("Something went wrong", {
            autoClose: 700
          })
          setSelectedPartyId('');
          getDataByERP(selectId);
          submitBtn.disabled = false;
        }
      }

      )
  }


  const deleteParty = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      html: `Are you sure you want to delete this data?`,
      icon: 'warning',
      showCancelButton: true,
      customClass: {
          icon: 'icon-smaller' 
      },
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!'
  }).then((result) => {
      if (result.isConfirmed) {
    axios.delete(`http://${ipaddress}combineRepresentative/delete/${companyid}/${branchId}/${selectId}/${id}`)
      .then((response) => {
        toast.error("Data delete successfully", {
          autoClose: 700
        })
        getDataByERP(selectId);
      }

      )
      .catch((error) => {
        if (error) {
          toast.error("Something went wrong", {
            autoClose: 700
          })
          getDataByERP(selectId);
        }
      }

      )
    }})
  }

  const handleClear = () => {
    setSelectedPartyId('');
    setPartys([]);
    fetchPartyNames();

  }



  //Add

  const [groupName, setGroupName] = useState('');
  const [addPartyName, setaddPartyName] = useState('');

  const [combineData, setcombineData] = useState([]);

  const addDataincombine = (id) => {
    if (id === '' || id === 'N') {
      toast.error('Please select party', {
        autoClose: 700
      });
      setaddPartyName('');
      return;
    }
    if (combineData.some(item => item.partyId === id)) {
      toast.error('Party already selected', {
        autoClose: 700
      });
      setaddPartyName('');
      return;
    }
    setcombineData(prevData => [
      ...prevData,
      {
        companyId: '',
        branchId: '',
        erpDocRefId: '',
        partyId: id,
        groupName: '',
        status: ''
      }
    ]);
    setaddPartyName('');
  };
  const removeParty = (id) => {
    // Remove the item with the specified partyId from combineData
    setcombineData(prevData => prevData.filter(item => item.partyId !== id));

  };


  const handleClear1 = () => {
    setcombineData([]);
    setGroupName('');
    setPartys([]);
    fetchPartyNames();
    setaddPartyName('');
    setreadonlyflag('N');
  }

  const [readonlyflag, setreadonlyflag] = useState('')

  const AddCombinedParty = () => {
    const submitBtn = document.getElementById('submit1Btn');
    submitBtn.disabled = true;
    if (groupName === '') {
      toast.error("Group name is required.", {
        autoClose: 700
      })
      submitBtn.disabled = false;
      return;
    }


    if (combineData.length === 0) {
      toast.error("Please select at least one party.", {
        autoClose: 700
      })
      submitBtn.disabled = false;
      return;
    }

    axios.post(`http://${ipaddress}combineRepresentative/addData/${companyid}/${branchId}/${groupName}`, combineData)
      .then((response) => {
        toast.success("Data save successfully", {
          autoClose: 700
        })
        getDataByERP(selectId);
        setaddPartyName('');
        setreadonlyflag('Y');
      }

      )
      .catch((error) => {
        if (error) {
          toast.error("Something went wrong", {
            autoClose: 700
          })
          getDataByERP(selectId);
          submitBtn.disabled = false;
        }
      }

      )
  }

  const changeTab1 = () => {
    getData();
    handleClear1();
  }

  const changeTab2 = () => {
    handleClear1();
  }

  return (
    <div>
      <div className="Container">
        {/* <Container > */}
        <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }}><FontAwesomeIcon
          icon={faHandshake}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        />Combined Representatives </h5>
        <Card style={{

          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'auto',
          overflowX: "hidden",

        }} >
          <CardBody style={{ paddingBottom: '-5px' }} >
            <Tabs
              defaultActiveKey="home"
              transition={false}
              id="noanim-tab-example"
              className="mb-3"
              onSelect={changeTab1}
            >

              <Tab eventKey="home" title="Existing">

                <Row style={{ marginTop: 30 }}>
                  <div className="table-responsive">
                    <Table className="table table-bordered text-center custom-table mt-3">
                      <thead className="thead-dark bg-dark">
                        <tr>
                          <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Sr No.</th>
                          <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Combine ID</th>

                          <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Group Name</th>
                          <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Action</th>


                        </tr>
                      </thead>
                      <tbody>
                        {getexistingdata.map((item, index) => (
                          <tr key={index}>
                            <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{index + 1}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item[0]}</td>
                            <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item[1]}</td>
                            <td className="table-column">
                              <div className="">
                                <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                  <FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
                                  Action
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <button onClick={() => openModalForViewAll(item[0], 'view')} className="dropdown-item">
                                      <FontAwesomeIcon icon={faExternalLinkAlt} style={{ marginRight: '5px' }} />View All
                                    </button>
                                  </li>
                                  <li>
                                    <button onClick={() => openModalForViewAll(item[0], 'edit', item[1])} className="dropdown-item">
                                      <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />Edit
                                    </button>
                                  </li>
                                  <li>
                                    <button onClick={() => deleteAll(item[0])} className="dropdown-item">
                                      <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />Delete
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </td>

                          </tr>
                        ))

                        }

                      </tbody>
                    </Table>
                  </div>

                </Row>


                <Modal
                  Modal isOpen={isModalOpenforViewAll} onClose={closeModalForViewAll} toggle={closeModalForViewAll}

                  style={{ maxWidth: '800px', overflow: '-moz-hidden-unscrollable' }}
                >
                  <ModalHeader toggle={closeModalForViewAll} style={{
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
                    {flag === 'view' ? (
                      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
                        icon={faEye}
                        style={{
                          marginRight: '8px',
                          color: 'black', // Set the color to golden
                        }}
                      />View All</h5>
                    )
                      :
                      (
                        <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
                          icon={faEdit}
                          style={{
                            marginRight: '8px',
                            color: 'black', // Set the color to golden
                          }}
                        />Edit</h5>
                      )

                    }

                  </ModalHeader>

                  <div style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>

                    {flag === 'edit' && (
                      <Row style={{ marginTop: 30, marginLeft: 7 }}>
                        <Col md={8}>
                          <select
                            className="form-control form-select"
                            onChange={(e) => setSelectedPartyId(e.target.value)} value={selectedParty}>
                            <option value="N">Select Party</option>
                            {partys.map((option, index) => (
                              <option key={index} value={option.partyId}>
                                {option.partyName}
                              </option>
                            ))}
                          </select>
                        </Col>
                        <Col md={4}>
                          <button onClick={saveAddParty} style={{ marginRight: 10 }} type="button" id="submitBtn" className="btn btn-outline-primary" aria-expanded="false">
                            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
                            Add
                          </button>
                          <button onClick={handleClear} type="button" className="btn btn-outline-danger" aria-expanded="false">
                            <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                            Clear
                          </button>
                        </Col>
                      </Row>
                    )

                    }

                    <div className="table-responsive">
                      <Table className="table table-bordered text-center custom-table mt-3">
                        <thead className="thead-dark bg-dark">
                          <tr>
                            <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Sr No.</th>

                            <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Group Name</th>
                            {flag === 'edit' && (<th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Action</th>)}


                          </tr>
                        </thead>
                        <tbody>
                          {erpData !== null && erpData.map((item, index) => (
                            <tr key={index}>
                              <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{index + 1}</td>

                              <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{getpartyId[item.partyId]}</td>
                              {flag === 'edit' && (
                                <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>

                                  <button type="button" onClick={() => deleteParty(item.partyId)} className="btn btn-outline-danger" aria-expanded="false">
                                    <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />

                                  </button>


                                </td>
                              )

                              }

                            </tr>
                          ))

                          }

                        </tbody>
                      </Table>
                    </div>
                  </div>
                </Modal>


              </Tab>





              <Tab eventKey="home12" title="Add">
                <div>
                  <Row >
                    <Col md={4}>
                      <FormGroup>
                        <Label className="forlabel" for="branchId">Group Name  <span style={{ color: 'red' }}>*</span></Label>
                        <Input
                          type="text"
                          className="form-control"
                          name="inputField"
                          readOnly={readonlyflag === 'Y'}
                          value={groupName}
                          maxLength={50}
                          onChange={(e) => setGroupName(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <Label className="forlabel" for="branchId">Select Party  <span style={{ color: 'red' }}>*</span></Label>
                      <FormGroup>
                        <select
                          className="form-control form-select"
                          onChange={(e) => setaddPartyName(e.target.value)}
                          disabled={readonlyflag === 'Y'}
                          value={addPartyName}>
                          <option value="N">Select Party</option>
                          {partys.map((option, index) => (
                            <option key={index} value={option.partyId}>
                              {option.partyName}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <Label className="forlabel" for="branchId">&nbsp;</Label>
                      <FormGroup>
                        <button disabled={readonlyflag === 'Y'} onClick={() => addDataincombine(addPartyName)} style={{ marginRight: 10 }} type="button" id="submitBtn" className="btn btn-outline-primary" aria-expanded="false">
                          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
                          Add
                        </button>

                      </FormGroup>

                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <Label className="forlabel" for="branchId">&nbsp;</Label>
                      <FormGroup>
                        <button disabled={readonlyflag === 'Y'} onClick={AddCombinedParty} style={{ marginRight: 10 }} type="button" id="submit1Btn" className="btn btn-outline-success" aria-expanded="false">
                          <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                          Save
                        </button>
                        <button onClick={handleClear1} style={{ marginRight: 10 }} type="button" id="clearBtn" className="btn btn-outline-danger" aria-expanded="false">
                          <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                          Clear
                        </button>

                      </FormGroup>

                    </Col>
                  </Row>
                  <Row>
                    <div className="table-responsive">
                      <Table className="table table-bordered text-center custom-table mt-3">
                        <thead className="thead-dark bg-dark">
                          <tr>
                            <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Sr No.</th>

                            <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Party Name</th>
                            <th scope="col" className="text-center" style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font' }}>Action</th>


                          </tr>
                        </thead>
                        <tbody>
                          {combineData !== null && combineData.map((item, index) => (
                            <tr key={index}>
                              <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{index + 1}</td>

                              <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{getpartyId[item.partyId]}</td>

                              <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>

                                <button disabled={readonlyflag === 'Y'} type="button" onClick={() => removeParty(item.partyId)} className="btn btn btn-outline" aria-expanded="false">
                                  <FontAwesomeIcon icon={faRemove} style={{ marginRight: '5px' }} />

                                </button>


                              </td>


                            </tr>
                          ))

                          }

                        </tbody>
                      </Table>
                    </div>
                  </Row>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>

    </div>
  )
}
