import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import '../Components/Style.css';
import DatePicker from "react-datepicker";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
import { faAngleRight, faAtom, faBolt, faBoxesPacking, faIdBadge, faHandHoldingHand, faHistory, faList, faList12, faListAlt, faPencil, faPlaneDeparture, faPlus, faPlusCircle, faSearch, faUserCircle, faUsersViewfinder, faFileAlt, faEye, faRefresh, faFilePdf, faFileExcel, faArrowsToEye } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';

export default function TDS_Reports() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
      if (!isAuthenticated) {

          navigate('/login?message=You need to be authenticated to access this page.');
      }
  }, [isAuthenticated, navigate]);
  return (
      <>
          <div className="container">
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
                    icon={faFileAlt}
                    style={{
                        marginRight: '8px',
                        color: 'black', // Set the color to golden
                    }}
                />Party TDS Report</h5>

                <Card>
                    <CardBody>
                    <Row>
                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="branchId">Bill Date From <span style={{color: 'red'}}>*</span></Label>
                                    <div className="input-group"> {/* Wrap in an input group */}
                                        <DatePicker
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control border-right-0 inputField"
                                            customInput={<input style={{ width: '278px' }} />}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="branchId">Bill Date To<span style={{color: 'red'}}>*</span></Label>
                                    <div className="input-group"> {/* Wrap in an input group */}
                                        <DatePicker
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control border-right-0 inputField"
                                            customInput={<input style={{ width: '278px' }} />}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="search" className="forlabel">Select Party</Label>
                                    <select
                                        id="hold"
                                        className="form-control form-select"

                                        required
                                        name="exporter"

                                    >
                                        <option value="">Select Console</option>

                                    </select>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="search" className="forlabel">Select Party Type</Label>
                                    <select
                                        id="hold"
                                        className="form-control form-select"

                                        required
                                        name="exporter"

                                    >
                                        <option value="">Select Console</option>

                                    </select>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Button type="button" className="" variant="outline-success" style={{ marginTop: '10px', marginRight: 10 }}>
                                    <FontAwesomeIcon icon={faArrowsToEye} style={{ marginRight: '5px' }} />
                                    Show
                                </Button>
                                <Button type="button" className="" variant="outline-danger" style={{ marginTop: '10px' }}>
                                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                                    Reset
                                </Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
          </div>
      </>
  )
}
