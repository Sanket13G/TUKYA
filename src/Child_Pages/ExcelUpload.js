import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Button, Row, Col, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { toast } from "react-toastify";
import { Card, CardBody, Container, Form, FormGroup, Label, Input, Table } from "reactstrap";
import ipaddress from '../Components/IpAddress';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSave, faTimes, faDownload, faCloudUploadAlt, faSyncAlt, faUpload } from '@fortawesome/free-solid-svg-icons';

export default function ExcelUpload() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [PartyList, setPartyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);
  const [PartyErrorList, setPartyErrorList] = useState([]);
  const [totalRecords1, setTotalRecords1] = useState(0);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [itemsPerPage1] = useState(20);

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

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

  };

  const handleUploadClick = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      console.log(userId + "======================================");
      fetch(`http://${ipaddress}excelupload/party/${companyid}/${branchId}/${userId}`, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {

          toast.success("Excel Sheet Uploaded successfully!", "success");
          console.log('Upload successful', data);
          setPartyList(data.savedParties);
          setTotalRecords(data.savedParties.length);
          setCurrentPage(1);

          setPartyErrorList(data.errorParties);
          setTotalRecords1(data.errorParties.length);
          setCurrentPage1(1);
          setSelectedFile(null);

          const fileInput = document.getElementById('fileInput'); // Add an id="fileInput" to your file input element
          if (fileInput) {
            fileInput.value = ""; // Set the value to an empty string
          }
        })
        .catch(error => {
          // Handle any errors
          toast.error("Error uploading Excel File!", "error");
          console.error('Error uploading file', error);
        });
    } else {
      toast.error("Error uploading Excel File!", "error");
      console.log('No file selected for upload');
    }
  };

  const handleClearTableData = () => {
    setPartyList([]);
    setTotalRecords(0);
    setCurrentPage(1);
    setSelectedFile(null);
    const fileInput = document.getElementById('fileInput'); // Add an id="fileInput" to your file input element
    if (fileInput) {
      fileInput.value = ""; // Set the value to an empty string
    }
    setPartyErrorList([]);
    setTotalRecords1(0);
    setCurrentPage1(1);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the indexes for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = PartyList.slice(indexOfFirstItem, indexOfLastItem);

  // Render the current page of items
  const renderItems = currentItems.map((party, index) => (
    <tr key={party.partyId}>
      <td>{index + 1}</td>
      <td>{party.partyId}</td>
      <td>{party.partyName}</td>
      <td>{party.iecNo}</td>
      <td>{party.email}</td>
      <td>{party.entityId}</td>
      <td>{party.gstNo}</td>
      <td>
        {party.status === "N"
          ? "New"
          : party.status === "U"
            ? "Edit"
            : party.status === "A"
              ? "Approved"
              : party.status}
      </td>
    </tr>
  ));

  // Function to handle page change
  const handlePageChange1 = (page) => {
    setCurrentPage1(page);
  };

  // Calculate the indexes for the current page
  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems1 = PartyErrorList.slice(indexOfFirstItem1, indexOfLastItem1);

  // Render the current page of items
  const renderItems1 = currentItems1.map((party, index) => (
    <tr key={party.partyId}>
      <td>{index + 1}</td>


      <td>{party.partyName}</td>

      <td>
        {"Unsaved"}
      </td>
    </tr>
  ));



  // Define the URL for the CSV template download
  const csvTemplateUrl =
    'https://drive.google.com/uc?export=download&id=1HIfA3NAeMb_pqBZqKMeWQQVOhnDM25Rp';

  // Function to handle the download click
  const handleDownloadClick = () => {
    // Redirect to the CSV template URL, triggering the download
    window.location.href = csvTemplateUrl;
  };


  const handleSubmit = () => {

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post(`http://${ipaddress}excelupload/subexp/${companyid}/${branchId}/${userId}`,formData)
        .then(response => {
          if(response.data === 'success'){
            toast.success("Data scanned successfully", {
              autoClose: 700
          })
          setSelectedFile(null);
          }

        })
        .catch(error => {
            // Handle error
            console.error('Error sending post request:', error);

            // Check if the error status code is 401
            if (error.response && error.response.status === 401) {
                // Show an error message for unauthorized access
                toast.error("Data already exists.", {
                    autoClose: 700
                });
            }
            
        });
};


const handleSubmit1 = () => {

  const formData = new FormData();
  formData.append('file', selectedFile);

  axios.post(`http://${ipaddress}excelupload/subimp/${companyid}/${branchId}/${userId}`,formData)
      .then(response => {
        if(response.data === 'success'){
          toast.success("Data scanned successfully", {
            autoClose: 700
        })
        setSelectedFile(null);
        }

      })
      .catch(error => {
          // Handle error
          console.error('Error sending post request:', error);

          // Check if the error status code is 401
          if (error.response && error.response.status === 401) {
              // Show an error message for unauthorized access
              toast.error("Data already exists.", {
                  autoClose: 700
              });
          }
          
      });
};



const handleSubmit2 = () => {

  const formData = new FormData();
  formData.append('file', selectedFile);

  axios.post(`http://${ipaddress}excelupload/export/${companyid}/${branchId}/${userId}`,formData)
      .then(response => {
        if(response.data === 'success'){
          toast.success("Data scanned successfully", {
            autoClose: 700
        })
        setSelectedFile(null);
        }

      })
      .catch(error => {
          // Handle error
          console.error('Error sending post request:', error);

          // Check if the error status code is 401
          if (error.response && error.response.status === 401) {
              // Show an error message for unauthorized access
              toast.error("Data already exists.", {
                  autoClose: 700
              });
          }
          
      });
};

const handleSubmit3 = () => {

  const formData = new FormData();
  formData.append('file', selectedFile);

  axios.post(`http://${ipaddress}excelupload/import/${companyid}/${branchId}/${userId}`,formData)
      .then(response => {
        if(response.data === 'success'){
          toast.success("Data scanned successfully", {
            autoClose: 700
        })
        setSelectedFile(null);
        }

      })
      .catch(error => {
          // Handle error
          console.error('Error sending post request:', error);

          // Check if the error status code is 401
          if (error.response && error.response.status === 401) {
              // Show an error message for unauthorized access
              toast.error("Data already exists.", {
                  autoClose: 700
              });
          }
          
      });
};

  return (
    <div className="Container">
      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }}>
        <FontAwesomeIcon
          icon={faUpload}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        />
        Excel Upload
      </h5>
      <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >

        <Tab eventKey="home" title="Party">
          <Card>
            <CardBody className="text-end" style={{ paddingBottom: '-5px' }} >
              <Row className="text-center mt-4 mb-3">
                <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                  <label htmlFor="add" className='font'>Upload Party</label>
                </Col>

                <Col xs={12} sm={6} md={6} lg={6} xl={6}>

                  <input
                    type="file"
                    accept=".xlsx, .csv"
                    onChange={handleFileChange}
                    className="form-control"
                    name="file"
                    style={{ marginTop: '5px' }}
                  />
                </Col>

              </Row>
              <Row className="text-center mt-1 mb-2">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="text-center d-flex justify-content-center">
                  <Button
                    type="button"
                    className="allbutton m-1"
                    variant="outline-success"
                    onClick={handleUploadClick}
                    disabled={!selectedFile}
                  >
                    <FontAwesomeIcon icon={faCloudUploadAlt} style={{ marginRight: '5px' }} />
                    Upload
                  </Button>
                  <Button
                    type="button"
                    className="allbutton m-1"
                    variant="outline-danger"
                    onClick={handleClearTableData}
                  >
                    <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                    CLEAR
                  </Button>
                  <Button
                    type="button"
                    className="allbutton m-1"
                    variant="outline-primary"
                    onClick={handleDownloadClick}
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </Button>
                </Col>
              </Row>



            </CardBody>
          </Card>


          {totalRecords > 0 && (
            <div className="card-body">
              <Col className="text-center">
                <label htmlFor="add" className='font'>Uploaded Party Records</label>
              </Col>
              <div className="card">
                <div className="card-body">
                  <Label className="forlabel" for="search">Total Uploaded Records:  {totalRecords}</Label>
                  <Table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th style={{ background: "skyblue" }}>Sr.No</th>
                        <th style={{ background: "skyblue" }}>Party ID</th>
                        <th style={{ background: "skyblue" }}>Party Name</th>
                        <th style={{ background: "skyblue" }}>IEC Number</th>
                        <th style={{ background: "skyblue" }}>Email</th>
                        <th style={{ background: "skyblue" }}>Entity Id</th>
                        <th style={{ background: "skyblue" }}>Gst Number</th>
                        <th style={{ background: "skyblue" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderItems}
                    </tbody>
                  </Table>
                  <Pagination className="justify-content-center">
                    <Pagination.Prev
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    {Array.from({ length: Math.ceil(PartyList.length / itemsPerPage) }).map((_, index) => (
                      <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === Math.ceil(PartyList.length / itemsPerPage)}
                    />
                  </Pagination>
                </div>
              </div>
            </div>

          )}

          {totalRecords1 > 0 && (
            <div className="card-body">
              <Col className="text-center" >
                <label htmlFor="add" className='font'>Not Uploaded Party Records</label>
              </Col>
              <div className="card">

                <div className="card-body">
                  <Label className="forlabel" for="search">Not Uploaded Records: {totalRecords1}</Label>


                  <Table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th style={{ background: "BADDDA" }}>Sr.No</th>

                        <th style={{ background: "BADDDA" }}>Party Name</th>

                        <th style={{ background: "BADDDA" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderItems1}
                    </tbody>
                  </Table>
                  <Pagination className="justify-content-center">
                    <Pagination.Prev
                      onClick={() => handlePageChange1(currentPage1 - 1)}
                      disabled={currentPage1 === 1}
                    />
                    {Array.from({ length: Math.ceil(PartyErrorList.length / itemsPerPage1) }).map((_, index) => (
                      <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage1}
                        onClick={() => handlePageChange1(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => handlePageChange1(currentPage1 + 1)}
                      disabled={currentPage1 === Math.ceil(PartyErrorList.length / itemsPerPage1)}
                    />
                  </Pagination>
                </div>
              </div>
            </div>

          )}
        </Tab>

        <Tab eventKey="profile" title="Sub-EXP">
        
          <Card>
            <CardBody className="text-end" style={{ paddingBottom: '-5px' }} >
              <Row className="text-center mt-4 mb-3">
                <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                  <label htmlFor="add" className='font'>Upload Subcontract Export</label>
                </Col>

                <Col xs={12} sm={6} md={6} lg={6} xl={6}>

                  <input
                    type="file"
                    accept=".xlsx, .csv"
                    onChange={handleFileChange}
                    className="form-control"
                    name="file"
                    style={{ marginTop: '5px' }}
                  />
                </Col>

              </Row>
              <Row className="text-center mt-1 mb-2">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className="text-center d-flex justify-content-center">
                  <Button
                    type="button"
                    className="allbutton m-1"
                    variant="outline-success"
                    onClick={handleSubmit}
                    disabled={!selectedFile}
                  >
                    <FontAwesomeIcon icon={faCloudUploadAlt} style={{ marginRight: '5px' }} />
                    Upload
                  </Button>
                  <Button
                    type="button"
                    className="allbutton m-1"
                    variant="outline-danger"
                    onClick={handleClearTableData}
                  >
                    <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                    CLEAR
                  </Button>
                 
                </Col>
              </Row>



            </CardBody>
          </Card>


          {totalRecords > 0 && (
            <div className="card-body">
              <Col className="text-center">
                <label htmlFor="add" className='font'>Uploaded Party Records</label>
              </Col>
              <div className="card">
                <div className="card-body">
                  <Label className="forlabel" for="search">Total Uploaded Records:  {totalRecords}</Label>
                  <Table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th style={{ background: "skyblue" }}>Sr.No</th>
                        <th style={{ background: "skyblue" }}>Party ID</th>
                        <th style={{ background: "skyblue" }}>Party Name</th>
                        <th style={{ background: "skyblue" }}>IEC Number</th>
                        <th style={{ background: "skyblue" }}>Email</th>
                        <th style={{ background: "skyblue" }}>Entity Id</th>
                        <th style={{ background: "skyblue" }}>Gst Number</th>
                        <th style={{ background: "skyblue" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderItems}
                    </tbody>
                  </Table>
                  <Pagination className="justify-content-center">
                    <Pagination.Prev
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    {Array.from({ length: Math.ceil(PartyList.length / itemsPerPage) }).map((_, index) => (
                      <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === Math.ceil(PartyList.length / itemsPerPage)}
                    />
                  </Pagination>
                </div>
              </div>
            </div>

          )}

          {totalRecords1 > 0 && (
            <div className="card-body">
              <Col className="text-center" >
                <label htmlFor="add" className='font'>Not Uploaded Party Records</label>
              </Col>
              <div className="card">

                <div className="card-body">
                  <Label className="forlabel" for="search">Not Uploaded Records: {totalRecords1}</Label>


                  <Table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th style={{ background: "BADDDA" }}>Sr.No</th>

                        <th style={{ background: "BADDDA" }}>Party Name</th>

                        <th style={{ background: "BADDDA" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderItems1}
                    </tbody>
                  </Table>
                  <Pagination className="justify-content-center">
                    <Pagination.Prev
                      onClick={() => handlePageChange1(currentPage1 - 1)}
                      disabled={currentPage1 === 1}
                    />
                    {Array.from({ length: Math.ceil(PartyErrorList.length / itemsPerPage1) }).map((_, index) => (
                      <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage1}
                        onClick={() => handlePageChange1(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => handlePageChange1(currentPage1 + 1)}
                      disabled={currentPage1 === Math.ceil(PartyErrorList.length / itemsPerPage1)}
                    />
                  </Pagination>
                </div>
              </div>
            </div>

          )}
        
        </Tab>

        <Tab eventKey="profile1" title="Sub-IMP">
        
        <Card>
          <CardBody className="text-end" style={{ paddingBottom: '-5px' }} >
            <Row className="text-center mt-4 mb-3">
              <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                <label htmlFor="add" className='font'>Upload Subcontract Import</label>
              </Col>

              <Col xs={12} sm={6} md={6} lg={6} xl={6}>

                <input
                  type="file"
                  accept=".xlsx, .csv"
                  onChange={handleFileChange}
                  className="form-control"
                  name="file"
                  style={{ marginTop: '5px' }}
                />
              </Col>

            </Row>
            <Row className="text-center mt-1 mb-2">
              <Col xs={12} sm={12} md={12} lg={12} xl={12} className="text-center d-flex justify-content-center">
                <Button
                  type="button"
                  className="allbutton m-1"
                  variant="outline-success"
                  onClick={handleSubmit1}
                  disabled={!selectedFile}
                >
                  <FontAwesomeIcon icon={faCloudUploadAlt} style={{ marginRight: '5px' }} />
                  Upload
                </Button>
                <Button
                  type="button"
                  className="allbutton m-1"
                  variant="outline-danger"
                  onClick={handleClearTableData}
                >
                  <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                  CLEAR
                </Button>
               
              </Col>
            </Row>



          </CardBody>
        </Card>


        {totalRecords > 0 && (
          <div className="card-body">
            <Col className="text-center">
              <label htmlFor="add" className='font'>Uploaded Party Records</label>
            </Col>
            <div className="card">
              <div className="card-body">
                <Label className="forlabel" for="search">Total Uploaded Records:  {totalRecords}</Label>
                <Table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th style={{ background: "skyblue" }}>Sr.No</th>
                      <th style={{ background: "skyblue" }}>Party ID</th>
                      <th style={{ background: "skyblue" }}>Party Name</th>
                      <th style={{ background: "skyblue" }}>IEC Number</th>
                      <th style={{ background: "skyblue" }}>Email</th>
                      <th style={{ background: "skyblue" }}>Entity Id</th>
                      <th style={{ background: "skyblue" }}>Gst Number</th>
                      <th style={{ background: "skyblue" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderItems}
                  </tbody>
                </Table>
                <Pagination className="justify-content-center">
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: Math.ceil(PartyList.length / itemsPerPage) }).map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(PartyList.length / itemsPerPage)}
                  />
                </Pagination>
              </div>
            </div>
          </div>

        )}

        {totalRecords1 > 0 && (
          <div className="card-body">
            <Col className="text-center" >
              <label htmlFor="add" className='font'>Not Uploaded Party Records</label>
            </Col>
            <div className="card">

              <div className="card-body">
                <Label className="forlabel" for="search">Not Uploaded Records: {totalRecords1}</Label>


                <Table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th style={{ background: "BADDDA" }}>Sr.No</th>

                      <th style={{ background: "BADDDA" }}>Party Name</th>

                      <th style={{ background: "BADDDA" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderItems1}
                  </tbody>
                </Table>
                <Pagination className="justify-content-center">
                  <Pagination.Prev
                    onClick={() => handlePageChange1(currentPage1 - 1)}
                    disabled={currentPage1 === 1}
                  />
                  {Array.from({ length: Math.ceil(PartyErrorList.length / itemsPerPage1) }).map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage1}
                      onClick={() => handlePageChange1(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange1(currentPage1 + 1)}
                    disabled={currentPage1 === Math.ceil(PartyErrorList.length / itemsPerPage1)}
                  />
                </Pagination>
              </div>
            </div>
          </div>

        )}
      
      </Tab>


      <Tab eventKey="profile2" title="Export">
        
        <Card>
          <CardBody className="text-end" style={{ paddingBottom: '-5px' }} >
            <Row className="text-center mt-4 mb-3">
              <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                <label htmlFor="add" className='font'>Upload Export</label>
              </Col>

              <Col xs={12} sm={6} md={6} lg={6} xl={6}>

                <input
                  type="file"
                  accept=".xlsx, .csv"
                  onChange={handleFileChange}
                  className="form-control"
                  name="file"
                  style={{ marginTop: '5px' }}
                />
              </Col>

            </Row>
            <Row className="text-center mt-1 mb-2">
              <Col xs={12} sm={12} md={12} lg={12} xl={12} className="text-center d-flex justify-content-center">
                <Button
                  type="button"
                  className="allbutton m-1"
                  variant="outline-success"
                  onClick={handleSubmit2}
                  disabled={!selectedFile}
                >
                  <FontAwesomeIcon icon={faCloudUploadAlt} style={{ marginRight: '5px' }} />
                  Upload
                </Button>
                <Button
                  type="button"
                  className="allbutton m-1"
                  variant="outline-danger"
                  onClick={handleClearTableData}
                >
                  <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                  CLEAR
                </Button>
               
              </Col>
            </Row>



          </CardBody>
        </Card>


        {totalRecords > 0 && (
          <div className="card-body">
            <Col className="text-center">
              <label htmlFor="add" className='font'>Uploaded Party Records</label>
            </Col>
            <div className="card">
              <div className="card-body">
                <Label className="forlabel" for="search">Total Uploaded Records:  {totalRecords}</Label>
                <Table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th style={{ background: "skyblue" }}>Sr.No</th>
                      <th style={{ background: "skyblue" }}>Party ID</th>
                      <th style={{ background: "skyblue" }}>Party Name</th>
                      <th style={{ background: "skyblue" }}>IEC Number</th>
                      <th style={{ background: "skyblue" }}>Email</th>
                      <th style={{ background: "skyblue" }}>Entity Id</th>
                      <th style={{ background: "skyblue" }}>Gst Number</th>
                      <th style={{ background: "skyblue" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderItems}
                  </tbody>
                </Table>
                <Pagination className="justify-content-center">
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: Math.ceil(PartyList.length / itemsPerPage) }).map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(PartyList.length / itemsPerPage)}
                  />
                </Pagination>
              </div>
            </div>
          </div>

        )}

        {totalRecords1 > 0 && (
          <div className="card-body">
            <Col className="text-center" >
              <label htmlFor="add" className='font'>Not Uploaded Party Records</label>
            </Col>
            <div className="card">

              <div className="card-body">
                <Label className="forlabel" for="search">Not Uploaded Records: {totalRecords1}</Label>


                <Table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th style={{ background: "BADDDA" }}>Sr.No</th>

                      <th style={{ background: "BADDDA" }}>Party Name</th>

                      <th style={{ background: "BADDDA" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderItems1}
                  </tbody>
                </Table>
                <Pagination className="justify-content-center">
                  <Pagination.Prev
                    onClick={() => handlePageChange1(currentPage1 - 1)}
                    disabled={currentPage1 === 1}
                  />
                  {Array.from({ length: Math.ceil(PartyErrorList.length / itemsPerPage1) }).map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage1}
                      onClick={() => handlePageChange1(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange1(currentPage1 + 1)}
                    disabled={currentPage1 === Math.ceil(PartyErrorList.length / itemsPerPage1)}
                  />
                </Pagination>
              </div>
            </div>
          </div>

        )}
      
      </Tab>



      <Tab eventKey="profile3" title="Import">
        
        <Card>
          <CardBody className="text-end" style={{ paddingBottom: '-5px' }} >
            <Row className="text-center mt-4 mb-3">
              <Col xs={12} sm={2} md={2} lg={2} xl={2}>
                <label htmlFor="add" className='font'>Upload Import</label>
              </Col>

              <Col xs={12} sm={6} md={6} lg={6} xl={6}>

                <input
                  type="file"
                  accept=".xlsx, .csv"
                  onChange={handleFileChange}
                  className="form-control"
                  name="file"
                  style={{ marginTop: '5px' }}
                />
              </Col>

            </Row>
            <Row className="text-center mt-1 mb-2">
              <Col xs={12} sm={12} md={12} lg={12} xl={12} className="text-center d-flex justify-content-center">
                <Button
                  type="button"
                  className="allbutton m-1"
                  variant="outline-success"
                  onClick={handleSubmit3}
                  disabled={!selectedFile}
                >
                  <FontAwesomeIcon icon={faCloudUploadAlt} style={{ marginRight: '5px' }} />
                  Upload
                </Button>
                <Button
                  type="button"
                  className="allbutton m-1"
                  variant="outline-danger"
                  onClick={handleClearTableData}
                >
                  <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                  CLEAR
                </Button>
               
              </Col>
            </Row>



          </CardBody>
        </Card>


        {totalRecords > 0 && (
          <div className="card-body">
            <Col className="text-center">
              <label htmlFor="add" className='font'>Uploaded Party Records</label>
            </Col>
            <div className="card">
              <div className="card-body">
                <Label className="forlabel" for="search">Total Uploaded Records:  {totalRecords}</Label>
                <Table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th style={{ background: "skyblue" }}>Sr.No</th>
                      <th style={{ background: "skyblue" }}>Party ID</th>
                      <th style={{ background: "skyblue" }}>Party Name</th>
                      <th style={{ background: "skyblue" }}>IEC Number</th>
                      <th style={{ background: "skyblue" }}>Email</th>
                      <th style={{ background: "skyblue" }}>Entity Id</th>
                      <th style={{ background: "skyblue" }}>Gst Number</th>
                      <th style={{ background: "skyblue" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderItems}
                  </tbody>
                </Table>
                <Pagination className="justify-content-center">
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: Math.ceil(PartyList.length / itemsPerPage) }).map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(PartyList.length / itemsPerPage)}
                  />
                </Pagination>
              </div>
            </div>
          </div>

        )}

        {totalRecords1 > 0 && (
          <div className="card-body">
            <Col className="text-center" >
              <label htmlFor="add" className='font'>Not Uploaded Party Records</label>
            </Col>
            <div className="card">

              <div className="card-body">
                <Label className="forlabel" for="search">Not Uploaded Records: {totalRecords1}</Label>


                <Table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th style={{ background: "BADDDA" }}>Sr.No</th>

                      <th style={{ background: "BADDDA" }}>Party Name</th>

                      <th style={{ background: "BADDDA" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderItems1}
                  </tbody>
                </Table>
                <Pagination className="justify-content-center">
                  <Pagination.Prev
                    onClick={() => handlePageChange1(currentPage1 - 1)}
                    disabled={currentPage1 === 1}
                  />
                  {Array.from({ length: Math.ceil(PartyErrorList.length / itemsPerPage1) }).map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage1}
                      onClick={() => handlePageChange1(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange1(currentPage1 + 1)}
                    disabled={currentPage1 === Math.ceil(PartyErrorList.length / itemsPerPage1)}
                  />
                </Pagination>
              </div>
            </div>
          </div>

        )}``
      
      </Tab>
      </Tabs>

    </div>

  );
}

