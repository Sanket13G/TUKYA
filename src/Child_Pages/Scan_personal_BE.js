import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext, useRef } from 'react';
import '../Components/Style.css';
import { toast } from 'react-toastify';
import { Card, CardBody, Col, Form, FormGroup, Row } from 'reactstrap';
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';

export default function Scan_personal_BE()  {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);


  const {
    userId,
    branchId,
    companyid,

  } = useContext(AuthContext);



  const [url, setUrl] = useState('');


  const handleSubmit = async () => {
    if (!url) {
      return toast.error("Please provide Url", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 700,
      });
    }
  
    try {
      const res = await Rate_Chart_Service.updatePersonalCarraige(
        companyid,
        branchId,
        userId,
        url
      );
      console.log("Response:", res);
  
      if (res.data === "Data Not Found") {
        toast.error(res.data, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
          
        });
        setUrl('');
      } else if (res.data === "Error extracting data from the provided URL") {
        toast.error(res.data, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
          style: { width: `27vw` },
        });
        setUrl('');
      } else {
        // Success case
        toast.success(`Import Update Successfully`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
          style: { width: `23vw` },
        });
        setUrl('');
      }
    } catch (error) {
      // Handle other errors here
      console.error("Error:", error);
      toast.error("An error occurred", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 700,
      });
    }
  };


  // const [len, setLen] = useState(0);
  // useEffect(() => {
  //   // Check if the length of getlink matches len
  //   if (url.length >=50) {
  //     // Delay the execution of handleSubmit by 10 milliseconds
  //     const timer = setTimeout(() => {
  //       handleSubmit();
  //     }, 60);

  //     // Cleanup the timer to avoid multiple calls
  //     return () => clearTimeout(timer);
  //   }
  // }, [url, len]);

  const inputRef = useRef();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById("submitButton").click();
    }
  };









  const [search, setSearch] = useState("");
  

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="Container" >
    <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
        icon={faPencilAlt}
        style={{
          marginRight: '8px',
          color: 'black', // Set the color to golden
        }}
      /> Scan Personal BE QR Code</h5>
    
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4}>
              <FormGroup>
                <label className="forlabel" htmlFor="search">
                Scan Import QR/URL
                </label>
                <input
                placeholder="Scan Import QR/URL"
                  type="text"
                  id="search"
                  className="form-control"
                  ref={inputRef}
                  onKeyDown={handleKeyPress}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col style={{ marginTop: 25, marginRight: 90, paddingRight: 90 }} md={2}>
              
            <Button
            type="button"
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
  </div>



     
   
  )
}