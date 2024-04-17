import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import { Button, Card, CardBody, Col, Form, FormGroup, Row } from 'reactstrap';
import DatePicker from "react-datepicker";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faPager } from '@fortawesome/free-solid-svg-icons';
import { FaCreativeCommons } from 'react-icons/fa';



export default function Generate_Bill() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const currentDate = new Date().toISOString().substr(0, 10); // Get current date in YYYY-MM-DD format
  const [BillGDate, setBillGDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(BillGDate);
  }

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
        />Manual Bill Generation</h5>
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
          <Row>
  <Col md={4}>
    <FormGroup>
      <h6> Select Date *</h6>
      <div className="input-group mr-2"> {/* Apply mr-0 class to remove margin-right */}
        <DatePicker
          selected={BillGDate}
          onChange={(date) => setBillGDate(date)}
          dateFormat="dd/MM/yyyy"
          value={BillGDate}
          className="form-control border-right-0 inputField"
          customInput={<input style={{ width: '25vw' }} />}
        />
      </div>
    </FormGroup>
  </Col>
  <Col style={{ marginTop: 26, paddingLeft:'20px' }} md={2}>
    <Button outline color="success" type="submit">
      <FontAwesomeIcon icon={faBolt} style={{ marginRight: '5px', paddingLeft:'10px' }} />
      Generate
    </Button>
  </Col>
</Row>

          </form>
        </CardBody>
      </Card>
    </div>
  )
}