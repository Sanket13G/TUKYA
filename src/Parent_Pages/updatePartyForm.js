import React, { useState,useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import ipaddress from '../Components/IpAddress';
import { faPencil, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UpdatePartyForm = ({ party, isOpen, toggleModal, fetchParties }) => {
  const [editedParty, setEditedParty] = useState({
    partyId:party.partyId,
    unitAdminName: party.unitAdminName,
    branchId:party.branchId,
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
  const [formErrors, setFormErrors] = useState({
    partyName: "",
    address1: "",
    email: "",
    mobileNo: "",
    iecNo: "",
    entityId: ""
    

  });
  const reactPageName = 'Update Party Form';


  const handleReset = () =>{
    setEditedParty('');
    setFormErrors({
      partyName: "",
    address1: "",
    email: "",
    mobileNo: "",
    iecNo: "",
    entityId: ""
    })
    document.getElementById('partyName').classList.remove('error-border');
    document.getElementById('address1').classList.remove('error-border');
    document.getElementById('email').classList.remove('error-border');
    document.getElementById('mobileNo').classList.remove('error-border');
    document.getElementById('iecNo').classList.remove('error-border');
    document.getElementById('entityId').classList.remove('error-border');
  }

  useEffect(() => {
    setEditedParty({ ...party });
  }, [party]);

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
    if (name === 'mobileNo') 
    {
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
    const errors = {};

    if (!editedParty.partyName) {
      errors.partyName = "Party name is required.";
    }

    if (!editedParty.address1) {
      errors.address1 = "Address1 is required.";
    }
    if (!editedParty.email) {
      errors.email = "Email is required.";
    }

    if (!editedParty.mobileNo) {
      errors.mobileNo = "Mobile no is required.";
    }

    if (!editedParty.iecNo) {
      errors.iecNo = "IEC no is required.";
    }
    if (!editedParty.entityId) {
      errors.entityId = "Entity Id is required.";
    }

    if (!editedParty.partyName) {
      document.getElementById('partyName').classList.add('error-border');
    }

    if (!editedParty.address1) {
      document.getElementById('address1').classList.add('error-border');
    }
    if (!editedParty.email) {
      document.getElementById('email').classList.add('error-border');
    }

    if (!editedParty.mobileNo) {
      document.getElementById('mobileNo').classList.add('error-border');
    }

    if (!editedParty.iecNo) {
      document.getElementById('iecNo').classList.add('error-border');
    }
    if (!editedParty.entityId) {
      document.getElementById('entityId').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      // Send a PUT request to update the party data with the formData
      await axios.put(`http://${ipaddress}parties/update/${party.partyId}`, editedParty);
      toast.success('Party Updated Successfully !!!', {
        position: 'top-center',
        autoClose: 2700,
      });
      // Close the update modal
      toggleModal();
      // Fetch the updated party list after updating
      fetchParties();
    } catch (error) {
      console.error('Error updating party:', error);
      // Handle error and display an error message if necessary.
      toast.error('Failed to update party !!!', {
        position: 'top-center',
        autoClose: 2700,
      });
    }
  };

 
   return (

    <div className='Container'>
     <Modal isOpen={isOpen} toggle={toggleModal} style={{maxHeight:800,maxWidth:1000,wioverflow:'-moz-hidden-unscrollable'}}>
    <ModalHeader toggle={toggleModal} style={{
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
      }} >Edit Party Details  <FontAwesomeIcon icon={faPencil} style={{ marginLeft: "10px" }} /></ModalHeader>
    <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/gray-abstract-wireframe-technology-background_53876-101941.jpg?t=st=1694859932~exp=1694860532~hmac=c704ef93c8530b989dccebbdde9c9b8e125a8fee9bee69658b6a940969620270)', backgroundSize: 'cover' }}>
      <Form>
        <Row>
          <Col  md={4}>
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
        
        <Col  md={4}>
        <FormGroup>
          <Label for="partyName">Party Name</Label>
          <Input
            type="text"
            name="partyName"
            id='partyName'
            value={editedParty.partyName}
            onChange={handleChange}
          />
          <div style={{ color: 'red' }} className="error-message">{formErrors.partyName}</div>
        </FormGroup>
        </Col>
        <Col  md={4}>
        <FormGroup>
          <Label for="address1">Address 1</Label>
          <Input
            type="text"
            name="address1"
            id='address1'
            value={editedParty.address1}
            onChange={handleChange}
          />
          <div style={{ color: 'red' }} className="error-message">{formErrors.address1}</div>
        </FormGroup>
        </Col>
        </Row>
       <Row>
<Col  md={4}>
<FormGroup>
          <Label for="address2">Address 2</Label>
          <Input
            type="text"
            name="address2"
            value={editedParty.address2}
            onChange={handleChange}
          />
        </FormGroup>
</Col>
<Col  md={4}> <FormGroup>
          <Label for="address3">Address 3</Label>
          <Input
            type="text"
            name="address3"
            value={editedParty.address3}
            onChange={handleChange}
          />
        </FormGroup></Col>
        <Col  md={4}> <FormGroup>
          <Label for="city">City</Label>
          <Input
            type="text"
            name="city"
            value={editedParty.city}
            onChange={handleChange}
          />
        </FormGroup></Col>
       </Row>
       <Row>
       
        <Col  md={4}> <FormGroup>
          <Label for="state">State</Label>
          <Input
            type="text"
            name="state"
            value={editedParty.state}
            onChange={handleChange}
          />
        </FormGroup></Col>
        <Col  md={4}><FormGroup>
          <Label for="country">Country</Label>
          <Input
            type="text"
            name="country"
            value={editedParty.country}
            onChange={handleChange}
          />
        </FormGroup></Col>
       <Col  md={4}> <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="text"
            name="email"
            id='email'
            value={editedParty.email}
            onChange={handleChange}
          />
        </FormGroup>
        <div style={{ color: 'red' }} className="error-message">{formErrors.email}</div>
        </Col>
       </Row>
       <Row>
      
       <Col  md={4}> <FormGroup>
          <Label for="phoneNo">Phone No</Label>
          <Input
            type="text"
            name="phoneNo"
            value={editedParty.phoneNo}
            onChange={handleChange}
          />
        </FormGroup></Col>
        <Col  md={4}> 
       <FormGroup>
            <Label for="mobileNo">Mobile No</Label>
            <Input
              type="text"
              name="mobileNo"
              id='mobileNo'
              value={editedParty.mobileNo}
              onChange={handleChange}
            />
             <div style={{ color: 'red' }} className="error-message">{formErrors.mobileNo}</div>
          </FormGroup></Col>
       <Col  md={4}> <FormGroup>
          <Label for="partyCode">Party Code</Label>
          <Input
            type="text"
            name="partyCode"
            value={editedParty.partyCode}
            onChange={handleChange}
          />
        </FormGroup></Col>
       </Row>
       <Row>
      
       <Col  md={4}><FormGroup>
          <Label for="erpCode">ERP Code</Label>
          <Input
            type="text"
            name="erpCode"
            value={editedParty.erpCode}
            onChange={handleChange}
          />
        </FormGroup></Col>
        <Col  md={4} ><FormGroup>
          <Label for="creditLimit">Credit Limit</Label>
          <Input
            type="text"
            name="creditLimit"
            value={editedParty.creditLimit}
            onChange={handleChange}
          />
        </FormGroup></Col>
       <Col  md={4}> <FormGroup>
          <Label for="iecNo">IEC No</Label>
          <Input
            type="text"
            name="iecNo"
            id='iecNo'
            value={editedParty.iecNo}
            onChange={handleChange}
          />
            <div style={{ color: 'red' }} className="error-message">{formErrors.iecNo}</div>
        </FormGroup></Col>
       </Row>
       <Row >
      
       <Col  md={4}> <FormGroup>
          <Label for="entityId">Entity ID</Label>
          <Input
            type="text"
            name="entityId"
            id='entityId'
            value={editedParty.entityId}
            onChange={handleChange}
          />
           <div style={{ color: 'red' }} className="error-message">{formErrors.entityId}</div>
        </FormGroup></Col>
        <Col  md={4}>
       <FormGroup>
            <Label for="panNo">PAN No</Label>
            <Input
              type="text"
              name="panNo"
              value={editedParty.panNo}
              onChange={handleChange}
            />
          </FormGroup>
          </Col>
        <Col  md={4}> <FormGroup>
          <Label for="gstNo">GST No</Label>
          <Input
            type="text"
            name="gstNo"
            value={editedParty.gstNo}
            onChange={handleChange}
          />
        </FormGroup></Col>
       </Row>
       <Row>
      
        <Col  md={4}> <FormGroup>
          <Label for="loaNumber">LOA Number</Label>
          <Input
            type="text"
            name="loaNumber"
            value={editedParty.loaNumber}
            onChange={handleChange}
          />
        </FormGroup></Col>
        <Col  md={4}> <FormGroup>
          <Label for="loaIssueDate">LOA Issue Date</Label>
          <Input
            type="datetime"
            name="loaIssueDate"
            value={editedParty.loaIssueDate}
            onChange={handleChange}
          />
        </FormGroup></Col>
        <Col> <FormGroup>
          <Label for="loaExpiryDate">LOA Expiry Date</Label>
          <Input
            type="datetime"
            name="loaExpiryDate"
            value={editedParty.loaExpiryDate}
            onChange={handleChange}
          />
        </FormGroup></Col>
       </Row>
      
      
      
       <Row>
       <Col  md={4}>
              <FormGroup>
                 <Label for="approvedDate">Unit Admin Name</Label>
                <Input
                  type="text"
                  name="unitAdminName"
                  value={editedParty.unitAdminName}
                  onChange={handleChange}
                />
              </FormGroup>
              </Col>
              <Col  md={4}>
              <FormGroup>
                 <Label for="unitType">Unit Type</Label>
                <Input
                  type="text"
                  name="unitType"
                  value={editedParty.unitType}
                  onChange={handleChange}
                />
              </FormGroup>
              </Col>
       </Row>
       </Form>
    </ModalBody>
    <ModalFooter style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
  
  
  {/* <Button color="primary" onClick={handleUpdate}>
    Save
  </Button>
  <Button color="secondary" onClick={toggleModal}>
    Cancel
  </Button> */}




  <button
          className="btn btn-outline-success btn-margin"
          onClick={handleUpdate}
        >
          <FontAwesomeIcon icon={faSave} style={{ marginRight: "10px" }} />
          SUBMIT
        </button>

      
</ModalFooter>
  </Modal>
  </div>
  );
};

export default UpdatePartyForm;