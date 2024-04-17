import { redirect } from 'react-router-dom';
import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import Dashboard from '../Components/Dashboard';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import '../Components/Style.css';
import { Button, Card, CardBody, Col, Form, Input, FormGroup, Row } from 'reactstrap';
import DatePicker from "react-datepicker";


import { faBolt, faCheck, faPager } from '@fortawesome/free-solid-svg-icons';
import { FaCreativeCommons } from 'react-icons/fa';

export default function Heavy_parcel() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {

      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);
  return (



    



      <div className='Container'>
        <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
          icon={faPager}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        /> Heavy Parcel</h5>
        <Card>
          <CardBody>
            <form >
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <h6> Enter Package Weight (min: 34 KG)*</h6>
                    <Input
                      type="text"
                      name="p1"
                      id="p1"
                      placeholder='Enter SIR or Scan SIR NO.'
                    // value={branchname}
                    // onChange={handleChange}
                    // readOnly
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <h6> Enter SER/SIR No. *</h6>
                    <Input
                      type="text"
                      name="p2"
                      id="p2"
                      placeholder='Enter SIR or Scan SIR NO.'
                    // value={branchname}
                    // onChange={handleChange}
                    // readOnly
                    />

                  </FormGroup>
                </Col>
                <Col style={{ marginTop: 26, paddingLeft: '20px' }} md={2}>
                  <Button outline color="success" type="submit">
                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px', paddingLeft: '10px' }} />
                    Submit
                  </Button>
                </Col>
              </Row>

            </form>
          </CardBody>
        </Card>
      </div>
    
  )
}
