import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import {  Card, CardBody, Col, FormGroup, Row,Label } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt, faSave } from '@fortawesome/free-solid-svg-icons';


export default function Update_Nsdl_status() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const [search, setSearch] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting and page refreshing
    console.log(search);
  }

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="Container" >

<h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
          icon={faPenAlt}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        /> Update NSDL status</h5>
   
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" htmlFor="search">
                    Scan URL
                  </Label>
                  <input
                    placeholder='Scan QR URl'
                    type="text"
                    id="search"
                    className="form-control"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col style={{ marginTop: 30, marginRight: 90, paddingRight: 90 }} md={2}>

              <Button
              type="button"
              className="allbutton"
              variant="outline-success"
              // onClick={handleSubmit}
              style={{ marginRight: 5 }}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
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