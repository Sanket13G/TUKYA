import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import ipaddress from '../Components/IpAddress';
import { useParams } from 'react-router-dom';
import { faCheck, faPencil, faPencilAlt, faPlusCircle, faSave, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Rate_Chart_Service from '../services/Rate_Chart_Service';
import { data } from "jquery";
import {
  Card,
  CardBody

} from "reactstrap";

const ExternalUserConfirmationPage = () => {
  const [isDivVisible, setIsDivVisible] = useState(false);

  //import fields 
  const { encodedCompanyId, encodedBranchId, encodedPartyId } = useParams();

  // function which Decode the code 
  const customDecode = (encodedValue) => {

    if (!encodedValue) {
      console.log("Hello");
    }
    const reverseCharacterMap = {
      'X': 'C',
      'Y': 'B',
      'Z': 'M',
    };

    const reverseSymbolMap = {
      '*': '0',
      '@': '1',
      '#': '2',
      '&': '3',
      '$': '4',
      '5': '5',
      '^': '6',
      '!': '7',
      '(': '8',
      ')': '9',
    };

    const decodedValue = encodedValue.replace(/[XYZ*@#&$%^!()]/g, (match) => reverseCharacterMap[match] || reverseSymbolMap[match]);


    return decodedValue;  
  };

  const DecodedCompanyId1 = customDecode(encodedCompanyId);
  const DecodedBranchId1 = customDecode(encodedBranchId);
  const DecodedPartyId1 = customDecode(encodedPartyId);


  useEffect(() => {
    const DecodedCompanyId1 = customDecode(encodedCompanyId);
    const DecodedBranchId1 = customDecode(encodedBranchId);
    const DecodedPartyId1 = customDecode(encodedPartyId);
  }, [encodedCompanyId, encodedBranchId, encodedPartyId]);

  const [party, setParty] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Rate_Chart_Service.getPartyById(DecodedCompanyId1, DecodedBranchId1, encodedPartyId);
        setParty(response.data);
        setEditedParty(response.data);
        console.log(response.data);
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    };

    fetchData();  // Call the async function immediately

  }, []);

  const [editedParty, setEditedParty] = useState({
    partyId: party.partyId,
    unitAdminName: party.unitAdminName,
    branchId: party.branchId,
    partyName: party.partyName,
    address1: party.address1,
    address2: party.address2,
    address3: party.address3,
    unitType: party.unitType,
    city: party.city,
    state: party.state,
    country: party.country,
    email: party.email,
    phoneNo: party.phoneNo,
    mobileNo: party.mobileNo,
    partyCode: party.partyCode,
    erpCode: party.erpCode,
    creditLimit: party.creditLimit,
    iecNo: party.iecNo,
    entityId: party.entityId,
    panNo: party.panNo,
    gstNo: party.gstNo,
    correction:party.correction,
    loaNumber: party.loaNumber,
    loaIssueDate: party.loaIssueDate,
    loaExpiryDate: party.loaExpiryDate,
    createdBy: party.createdBy,
    createdDate: party.createdDate,
    editedBy: party.editedBy,
    editedDate: party.editedDate,
    approvedBy: party.approvedBy,
    approvedDate: party.approvedDate,
    status: party.status,
  });



  const reactPageName = 'Update Party Form';
  const navigate = useNavigate();
  console.log(encodedPartyId);
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validation for PAN card format (Alphanumeric with exactly 10 characters)
    if (name === 'panNo') {
      const panPattern = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/;
      if (!panPattern.test(value)) {
        toast.error('Invalid PAN Card number! Please enter a valid PAN number.', {
          position: 'top-center',
          autoClose: 2700,
        });
        return;
      }
    }

    // Validation for mobile number (10 digits only)
    if (name === 'mobileNo') {
      const mobilePattern = /^\d{10}$/;
      if (!mobilePattern.test(value)) {
        toast.error('Invalid mobile number! Please enter a 10-digit mobile number.', {
          position: 'top-center',
          autoClose: 2700,
        });
        return;
      }
    }
    if (name === 'loaIssueDate' || name === 'loaExpiryDate' /* Add other date fields if needed */) {
      setEditedParty((prevState) => ({
        ...prevState,
        [name]: formatDate(value),
      }));
    } else {
      setEditedParty((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }


    setEditedParty((prevState) => (
      {
        ...prevState,
        [name]: value,
      }));
  };



  const handleUpdate = async () => {
   

    navigate("/");
    
  };


  const [isModalOpen, setModalOpen] = useState(false);

 
  const toggleModal = () => {
    setModalOpen(true);
  };
  

  const handleInputChange = (e) => {
    // Handle input changes here if needed
  };

  const closeModalforReqid = () => {
    // Add any logic you need when closing the modal
    setModalOpen(false);
  };

  const [correctionDetails, setCorrectionDetails] = useState('');

 

  const handleUpdateDetails =  (event) => {

    


    Swal.fire("Great!!!!!", 'Details saved successfully You can Login', 'success');
    navigate("/");

    setCorrectionDetails(event.target.value);
  };



  const handleCorrectionChange = async () => {

    try {

      await axios.put(`http://${ipaddress}parties/update/${encodedPartyId}`, editedParty);    
      toast.success('Party Updated Successfully !!!', {
        position: 'top-center',
        autoClose: 2700,
      });

    } catch (error) {
      console.error('Error updating party:', error);

      toast.error('Failed to update party !!!', {
        position: 'top-center',
        autoClose: 2700,
      });
    }

    
    setModalOpen(false);
  };

  return (
    <div className="Container" style={{ marginTop: '10px', marginLeft: '10px', marginRight: '10px' }} >
      <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
        icon={faUserCircle}
        style={{
          marginRight: '8px',
          color: 'black', // Set the color to golden
        }}
      />Confirm Party Details  </h5>

      <Card style={{ marginTop: '10px', marginLeft: '10px', marginRight: '10px' }}>
        <CardBody>
          <>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="partyId">Party ID</Label>
                  <Input
                    type="text"
                    name="partyId"
                    value={editedParty.partyId}
                    onChange={handleChange}
                    disabled
                  />
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <Label for="partyName">Party Name</Label>
                  <Input
                    type="text"
                    name="partyName"
                    value={editedParty.partyName}
                    onChange={handleChange}
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="address1">Address 1</Label>
                  <Input
                    type="text"
                    name="address1"
                    value={editedParty.address1}
                    onChange={handleChange}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="address2">Address 2</Label>
                  <Input
                    type="text"
                    name="address2"
                    value={editedParty.address2}
                    onChange={handleChange}
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col md={4}> <FormGroup>
                <Label for="address3">Address 3</Label>
                <Input
                  type="text"
                  name="address3"
                  value={editedParty.address3}
                  onChange={handleChange}
                  readOnly
                />
              </FormGroup></Col>
              <Col md={4}> <FormGroup>
                <Label for="city">City</Label>
                <Input
                  type="text"
                  name="city"
                  value={editedParty.city}
                  onChange={handleChange}
                  readOnly
                />
              </FormGroup></Col>
            </Row>
            <Row>

              <Col md={4}> <FormGroup>
                <Label for="state">State</Label>
                <Input
                  type="text"
                  name="state"
                  value={editedParty.state}
                  onChange={handleChange}
                  readOnly
                />
              </FormGroup></Col>
              <Col md={4}><FormGroup>
                <Label for="country">Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={editedParty.country}
                  onChange={handleChange}
                  readOnly
                />
              </FormGroup></Col>
              <Col md={4}> <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  name="email"
                  value={editedParty.email}
                  onChange={handleChange}
                  readOnly
                />
              </FormGroup></Col>
            </Row>
            <Row>

              <Col md={4}> <FormGroup>
                <Label for="phoneNo">Phone No</Label>
                <Input
                  type="text"
                  name="phoneNo"
                  value={editedParty.phoneNo}
                  onChange={handleChange}
                  readOnly
                />
              </FormGroup></Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="mobileNo">Mobile No</Label>
                  <Input
                    type="text"
                    name="mobileNo"
                    value={editedParty.mobileNo}
                    onChange={handleChange}
                    readOnly
                  />
                </FormGroup></Col>
              <Col md={4}> <FormGroup>
                <Label for="partyCode">Party Code</Label>
                <Input
                  type="text"
                  name="partyCode"
                  value={editedParty.partyCode}
                  onChange={handleChange}
                  readOnly
                />
              </FormGroup></Col>
            </Row>
            <Row>

              <Col md={4}><FormGroup>
                <Label for="erpCode">ERP Code</Label>
                <Input
                  type="text"
                  name="erpCode"
                  value={editedParty.erpCode}
                  onChange={handleChange}
                  readOnly
                />
              </FormGroup></Col>
              <Col md={4} ><FormGroup>
                <Label for="creditLimit">Credit Limit</Label>
                <Input
                  type="text"
                  name="creditLimit"
                  value={editedParty.creditLimit}
                  onChange={handleChange}
                  readOnly
                />
              </FormGroup></Col>
              <Col md={4}> <FormGroup>
                <Label for="iecNo">IEC No</Label>
                <Input
                  type="text"
                  name="iecNo"
                  value={editedParty.iecNo}
                  onChange={handleChange}
                  readOnly
                />
              </FormGroup></Col>
            </Row>
            <Row >

              <Col md={4}> <FormGroup>
                <Label for="entityId">Entity ID</Label>
                <Input
                  type="text"
                  name="entityId"
                  value={editedParty.entityId}
                  onChange={handleChange}
                  readOnly
                />
              </FormGroup></Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="panNo">PAN No</Label>
                  <Input
                    type="text"
                    name="panNo"
                    value={editedParty.panNo}
                    onChange={handleChange}
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col md={4}> <FormGroup>
                <Label for="gstNo">GST No</Label>
                <Input
                  type="text"
                  name="gstNo"
                  value={editedParty.gstNo}
                  onChange={handleChange}
                  readOnly
                />
              </FormGroup></Col>
            </Row>
            <Row>

              <Col md={4}> <FormGroup>
                <Label for="loaNumber">LOA Number</Label>
                <Input
                  type="text"
                  name="loaNumber"
                  value={editedParty.loaNumber}
                  onChange={handleChange}
                  readOnly
                />
              </FormGroup></Col>
              <Col md={4}> <FormGroup>
                <Label for="loaIssueDate">LOA Issue Date</Label>
                <Input
                  type="datetime"
                  name="loaIssueDate"
                  value={editedParty.loaIssueDate}
                  onChange={handleChange}
                  readOnly
                />
              </FormGroup></Col>
              <Col> <FormGroup>
                <Label for="loaExpiryDate">LOA Expiry Date</Label>
                <Input
                  type="datetime"
                  name="loaExpiryDate"
                  value={editedParty.loaExpiryDate}
                  onChange={handleChange}
                  readOnly
                />
              </FormGroup></Col>
            </Row>

            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="approvedDate">Unit Admin Name</Label>
                  <Input
                    type="text"
                    name="unitAdminName"
                    value={editedParty.unitAdminName}
                    onChange={handleChange}
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="unitType">Unit Type</Label>
                  <Input
                    type="text"
                    name="unitType"
                    value={editedParty.unitType}
                    onChange={handleChange}
                    readOnly
                  />
                </FormGroup>
              </Col>

              <Col md={4} className="text-center">
                <button
                  className="btn btn-outline-success btn-margin"
                  onClick={handleUpdate}
                  style={{ marginRight: "10px", marginTop: "30px" }}
                >
                  <FontAwesomeIcon icon={faCheck} style={{ marginRight: "10px" }} />
                  Confirm
                </button>



                <button
                  className="btn btn-outline-primary btn-margin"
                  onClick={toggleModal}

                  style={{ marginRight: "10px", marginTop: "30px" }}
                >
                  <i className="bi bi-arrow-right-circle-fill" style={{ marginRight: "10px" }}></i>
                  Update Details
                </button>

                

              </Col>

            </Row>
          </>



          <Modal Modal isOpen={isModalOpen} onClose={closeModalforReqid} toggle={closeModalforReqid} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
          } >
            <ModalHeader toggle={closeModalforReqid} style={{
              backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              //backgroundPosition: 'center',
              backgroundPosition: 'center',
            }}>
              <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
                icon={faPencilAlt}
                style={{
                  marginRight: '5px',
                  color: 'black', // Set the color to golden
                }}
              />Update The Required Correction</h5>

            </ModalHeader>
            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>


              <div style={{ backgroundColor: "#F8F8F8" }}>

                <>
                  <Row>
                    <Col md={8}>
                      <FormGroup>
                        <Label className="forlabel" for="branchId">Enter Details</Label>
                        <Input
                          type="textarea"
                          name="correction"
                          id="correction"
                          className="inputField"
                         
                  onChange={handleChange}
                       
                          maxLength={30}
                          required
                          
                          value={editedParty.correction}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4} className="text-center mt-2" >
                      
                     
                      <button
                        className="btn btn-outline-success btn-margin"
                        // onClick={toggleModal}  
                        onClick={handleCorrectionChange}
                        style={{ marginRight: "10px", marginTop: "30px" }}
                      >
                        <i className="bi bi-arrow-right-circle-fill" style={{ marginRight: "10px" }}></i>
                        Send Correction
                      </button>
                    </Col>
                  </Row>
                </>
              </div>
            </ModalBody>
          </Modal >

        </CardBody>
      </Card>
    </div>

  );
};

export default ExternalUserConfirmationPage;