
import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Row, Col, Form } from "reactstrap";
import "../Parent_Pages/parent.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faSave, faSyncAlt, faWrench } from "@fortawesome/free-solid-svg-icons";

const EditModal = ({ isOpen, toggleModal, handleSubmit, handleChange, formData, formErrors }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      className="modal-dialog-centered"
      // Make the modal responsive for small screens
      size="lg"
    >
      <ModalHeader toggle={toggleModal} style={{
        backgroundColor: '#80cbc4',
        color: 'black',
        fontFamily: 'Your-Heading-Font',
        textAlign: 'center',
        background: '#26a69a',
        boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
        border: '1px solid rgba(0, 0, 0, 0.3)',
        borderRadius: '0',
        // backgroundImage: 'linear-gradient(15deg, #000000 3%,    #00796b 30%,  #00897b 10%,   #00695c 80%  )',
        backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        //backgroundPosition: 'center',
        backgroundPosition: 'center',
      }}>Editing {formData.airlineName}   <FontAwesomeIcon icon={faPencil} style={{ marginLeft: "10px", color: 'orange' }} /> </ModalHeader>

      <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/gray-abstract-wireframe-technology-background_53876-101941.jpg?t=st=1694859932~exp=1694860532~hmac=c704ef93c8530b989dccebbdde9c9b8e125a8fee9bee69658b6a940969620270)', backgroundSize: 'cover' }}>
        <Form>
          <Row>
            <Col md={6}>
              <div className="form-group">
                <label className="forlabel" style={{ textAlign: 'center', fontFamily: 'Your-Data-Font', marginTop: '5px', marginBottom: '5px', paddingLeft: '7px' }}>Airline Name<span style={{color: 'red'}}>*</span> </label>
                <input
                  type="text"
                  name="airlineName"
                  id="airlineName"
                  className="form-control"
                  value={formData.airlineName}
                  onChange={handleChange}
                />
                <div style={{ color: 'red' }} className="error-message">{formErrors.airlineName}</div>

              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label className="forlabel" style={{ textAlign: 'center', fontFamily: 'Your-Data-Font', marginTop: '5px', marginBottom: '5px', paddingLeft: '7px' }}>Airline Short Name</label>
                <input
                  type="text"
                  name="airlineShortName"
                  className="form-control"
                  value={formData.airlineShortName}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label className="forlabel" style={{ textAlign: 'center', fontFamily: 'Your-Data-Font', marginTop: '5px', marginBottom: '5px', paddingLeft: '7px' }}>Airline Code<span style={{color: 'red'}}>*</span> </label>
                <input
                  type="text"
                  name="airlineCode"
                  id="airlineCode"
                  className="form-control"
                  value={formData.airlineCode}
                  onChange={handleChange}
                />
                <div style={{ color: 'red' }} className="error-message">{formErrors.airlineCode}</div>

              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label className="forlabel" style={{ textAlign: 'center', fontFamily: 'Your-Data-Font', marginTop: '5px', marginBottom: '5px', paddingLeft: '7px' }}>Flight No<span style={{color: 'red'}}>*</span></label>
                <input
                  type="text"
                  name="flightNo"
                  readOnly
                  id="flightNo"
                  className="form-control"
                  value={formData.flightNo}
                  onChange={handleChange}
                />
                <div style={{ color: 'red' }} className="error-message">{formErrors.flightNo}</div>

              </div>
            </Col>
            <Col md={12}>
              <div className="form-group">
                <label className="forlabel" style={{ textAlign: 'center', fontFamily: 'Your-Data-Font', marginTop: '5px', marginBottom: '5px', paddingLeft: '7px' }}>Airline Description</label>
                <input
                  type="text"
                  name="airlineDesc"
                  className="form-control"
                  value={formData.airlineDesc}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
        <button
          className="btn btn-outline-success btn-margin"
          onClick={handleSubmit}
        >
          <FontAwesomeIcon icon={faSave} style={{ marginRight: "15px" }} />
          UPDATE
        </button>
        <button
          className="btn btn-outline-danger btn-margin"
          onClick={toggleModal}
        ><i class="bi bi-arrow-right-circle-fill" style={{ marginRight: "10px" }}></i>
          CANCLE
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default EditModal;
