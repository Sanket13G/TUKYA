import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useContext, useState } from "react";
import { Card, CardBody, Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar, faSave, faServer, faAdd, faEdit, faTimes, faPeopleArrows, faPeopleLine, faUserFriends, faUserTie, faUserCircle, faUserTag, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faCog, faCheck } from '@fortawesome/free-solid-svg-icons';
import "../Components/Style.css";
import Swal from 'sweetalert2';
import axios from "axios";
import ipaddress from "../Components/IpAddress";
import Pagination from 'react-bootstrap/Pagination';
import { Button, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import { ToastContainer, toast } from 'react-toastify';
import { FaClosedCaptioning, FaEdit, FaLink } from "react-icons/fa";
export default function ManageExternalUser() {

  const [externaluserId, setexternaluserId] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [userstatus, setUserStatus] = useState('A');
  const [status, setStatus] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [createdDate, setCreatedDate] = useState(''); // Assuming it's a Date
  const [editedBy, setEditedBy] = useState('');
  const [editedDate, setEditedDate] = useState(''); // Assuming it's a Date
  const [approvedBy, setApprovedBy] = useState('');
  const [approvedDate, setApprovedDate] = useState(''); // Assuming it's a Date
  const [externalUserData, setExternalUserData] = useState([]);
  const [errors, setErrors] = useState({});

  const [AddNewModel, setAddNewModel] = useState(false);
  const [searchUsertytpe, setsearchUsertytpe] = useState('All');
  const closeAddNewModel = () => { setAddNewModel(false); makeFieldEmpty(); }
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);


  const [formErrors, setFormErrors] = useState({
    userType: "",
    loginUserName: "",
    email: "",
    userName:"",
    mobile:""

  });


  const handleValidation = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!userType) {
      formIsValid = false;
      newErrors['userType'] = 'userType is required.';

    }

    if (!loginUserName) {
      formIsValid = false;
      newErrors['loginUserName'] = 'cartingAgent is required.';

    }
    if (!email) {
      formIsValid = false;
      newErrors['email'] = 'email is required.';

    }
    if (!userName) {
      formIsValid = false;
      newErrors['userName'] = 'userName is required.';

    }
    if (!mobile) {
      formIsValid = false;
      newErrors['mobile'] = 'mobile is required.';

    }

    setErrors(newErrors);
    return formIsValid;
  };







  const {
    userId,
    username,
    branchId,
    companyid,

  } = useContext(AuthContext);
  // If the user is not authenticated, redirect to the login page

  const ExternalUser = {
    companyId, branchId, externaluserId, userType, userName, loginUserName, loginPassword,
    email, mobile, userstatus, status, createdBy, createdDate, editedBy, editedDate, approvedBy, approvedDate
  };

  const getAllExternalUser = () => {
    Rate_Chart_Service.getAllExternalUser(companyid, branchId).then((res) => {
      console.log(res.data);
      setExternalUserData(res.data);
    });

  };

  useEffect(() => {
    setCompanyId(companyid);
    getAllExternalUser();
  }, []);

  const getExternalUserById = (compaid, branchid, userid) => {
    Rate_Chart_Service.getSingleExternalUser(compaid, branchid, userid).then((res) => {

      setexternaluserId(res.data.externaluserId);
      setUserType(res.data.userType);
      setUserName(res.data.userName);
      setLoginUserName(res.data.loginUserName);
      setLoginPassword(res.data.loginPassword);
      setCreatedBy(res.data.createdBy);
      setEditedBy(res.data.editedBy);
      setApprovedBy(res.data.approvedBy);
      setCreatedDate(res.data.createdDate);
      setEditedDate(res.data.editedDate);
      setApprovedDate(res.data.approvedDate);
      setStatus(res.data.status);
      setUserStatus(res.data.userstatus);
      setMobile(res.data.mobile);
      setEmail(res.data.email);
    });

  };


  const openModel = () => {
    setAddNewModel(true);

  };
  const editUSer = (uid) => {
    openModel();
    getExternalUserById(companyid, branchId, uid);

  }




  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = externalUserData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(externalUserData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const displayPages = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage - middlePage;
    let endPage = currentPage + middlePage;
  
    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages, centerPageCount);
    }
  
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - centerPageCount + 1);
    }
  
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };





  const deleteUSer = async (Euserid) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Rate_Chart_Service.updateExternalUser(companyid, branchId, userId, Euserid, ExternalUser).then((res) => {
          getByUserType();
          toast.error('User Deleted Successfully !', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 600,
          });
          closeAddNewModel();
        });


      }
    })













    // await Rate_Chart_Service.updateExternalUser(companyid, branchId, userId, Euserid, ExternalUser).then((res) => {
    //   // console.warn(res.data);
    //   // getExternalUserById(companyid, branchId, Euserid);
    //   toast.success('User Deleted Successfully !', {
    //     position: toast.POSITION.TOP_CENTER,
    //     autoClose: 600,
    //   });
    //   closeAddNewModel();
    // });

  }

  const getByUserType = async () => {

    if (searchUsertytpe === 'All') {
      getAllExternalUser();
    }
    else {
      await Rate_Chart_Service.getExternalUserByType(companyid, branchId, searchUsertytpe).then((res) => {
        setExternalUserData(res.data);
      });

    }

  }



  





  const SubmitExternalParty = async (e) => {
    const isFormValid = handleValidation();
    console.log(ExternalUser);
    e.preventDefault();
    // try
    // {


    if (isFormValid) {
   // function which encode the code 
   const customEncode = (value) => {
    const characterMap = {
      'C': 'X',
      'B': 'Y',
      'M': 'Z',
    };
  
    const symbolMap = {
      '0': '*',
      '1': '@',
      '2': '#',
      '3': '&',
      '4': '$',
      '5': '%',
      '6': '^',
      '7': '!',
      '8': '(',
      '9': ')',
    };
  
    const encodedValue = value
      .replace(/[CBM0-9]/g, (match) => characterMap[match] || symbolMap[match]);
  
    return encodedValue;
  };
  
  
  // function which Decode the code 
  const customDecode = (encodedValue) => {
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
      '%': '5',
      '^': '6',
      '!': '7',
      '(': '8',
      ')': '9',
    };
  
    const decodedValue = encodedValue
      .replace(/[XYZ*@#&$%^!()]/g, (match) => reverseCharacterMap[match] || reverseSymbolMap[match]);
  
    return decodedValue;
  };


       // Encode each value separately
  const encodedCompanyId = customEncode(companyid);
  const encodedBranchId = customEncode(branchId);
  const encodedPartyId = customEncode(userId);
  
  const DecodedCompanyId1 = customDecode(encodedCompanyId);
  const DecodedBranchId1 = customDecode(encodedBranchId);
  const DecodedPartyId1 = customDecode(encodedPartyId);
  
  console.log(encodedCompanyId);
  console.log(encodedBranchId);
  console.log(encodedPartyId);
  console.log(DecodedCompanyId1);
  console.log(DecodedBranchId1);
  console.log(DecodedPartyId1);


  const errors = {};

  if (!userType) {
    errors.userType = "User type is required.";
  }

  if (!loginUserName) {
    errors.loginUserName = "Login username is required.";
  }
  if (!email) {
    errors.email = "Email is required.";
  }
  if (!mobile) {
    errors.mobile = "Mobile is required.";
  }
  if (!userName) {
    errors.userName = "Username is required.";
  }
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }

      // if (Euserid) {
      try {

        await Rate_Chart_Service.addExternalUser(companyid, branchId, userId,encodedCompanyId,encodedBranchId,ipaddress, ExternalUser).then((res) => {
          console.warn(res.data);
          getExternalUserById(companyid, branchId, res.data.externaluserId);
          getAllExternalUser();

          toast.success('User Added Successfully !', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 600,
          });

        });

      } catch (error) {
        if (error.response && error.response.status === 409) {
          // Conflict (HTTP 409) status code indicates validation errors
          toast.error(error.response.data, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 600,
          });
        } else {
          // Handle other types of errors (e.g., network issues)
          console.error(error);
        }
      };
    };
  };


  const makeFieldEmpty = () => {

    setexternaluserId('');
    setUserType('');
    setUserName('');
    setLoginUserName('');
    setLoginPassword('');
    setCreatedBy('');
    setEditedBy('');
    setApprovedBy('');
    setCreatedDate('');
    setEditedDate('');
    setApprovedDate('');
    setStatus('');
    setUserStatus('A');
    setMobile('');
    setEmail('');
    setFormErrors(
      {
        userType: "",
        loginUserName: "",
        email: "",
        userName:"",
        mobile:""
      }
    );
    setErrors('');
  }


//handle link functions here
const handlePwdReset =  (externaluserId) => {
  console.log(externaluserId);



  // Find the selected User Id from the External User array based on the UserId
  const party = externalUserData.find((import2) => import2.externaluserId === externaluserId);
  
  console.log(party);
  // function which encode the code 
  const customEncode = (value) => {
    const characterMap = {
      'C': 'X',
      'B': 'Y',
      'M': 'Z',
    };
  
    const symbolMap = {
      '0': '*',
      '1': '@',
      '2': '#',
      '3': '&',
      '4': '$',
      '5': '%',
      '6': '^',
      '7': '!',
      '8': '(',
      '9': ')',
    };
  
    const encodedValue = value
      .replace(/[CBM0-9]/g, (match) => characterMap[match] || symbolMap[match]);
  
    return encodedValue;
  };
  

  const customDecode = (encodedValue) => {
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
      '%': '5',
      '^': '6',
      '!': '7',
      '(': '8',
      ')': '9',
    };
  
    const decodedValue = encodedValue
      .replace(/[XYZ*@#&$%^!()]/g, (match) => reverseCharacterMap[match] || reverseSymbolMap[match]);
  
    return decodedValue;
  };
  
  const ipAddressBeforeColon = ipaddress.split(':')[0];
  // Encode each value separately
  const encodedCompanyId = customEncode(companyid);
  const encodedBranchId = customEncode(branchId);
  const encodedUserId = customEncode(externaluserId);
  
  const DecodedCompanyId1 = customDecode(encodedCompanyId);
  const DecodedBranchId1 = customDecode(encodedBranchId);
  const DecodedUserId1 = customDecode(encodedUserId);
  

  console.log(encodedCompanyId);
  console.log(encodedBranchId);
  console.log(encodedUserId);
  console.log(DecodedCompanyId1);
  console.log(DecodedBranchId1);
  console.log(DecodedUserId1);
  

  
  
      try {
          axios.post(`http://${ipaddress}externalParty/resetpassword/${ipAddressBeforeColon}/${encodedCompanyId}/${encodedBranchId}/${DecodedUserId1}`,party );
        toast.success('Password Reset Link sent on your email id Successfully !!!', {
          position: 'top-center',
          autoClose: 2700,
        });
            
      } catch (error) {   
        toast.error('Failed to send password resent link on your email !!!', {
          position: 'top-center',
          autoClose: 2700,
        });
      }
  
  
    };




  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="Container" >

<h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
          icon={faUserFriends}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        />Manage External User</h5>


     
      <Card style={{ backgroundColor: "#F8F8F8" }}>
        <CardBody>


          <Row>
            <Col md={1}></Col>
            <Col md={4}>
              <FormGroup>
                <Label className="forlabel" for="branchId">User Type</Label>
                <select
                  className="form-select"
                  name="userType"
                  value={searchUsertytpe}
                  onChange={(e) => setsearchUsertytpe(e.target.value)}
                >
                  <option selected value="All">Select User Type</option>
                  <option value="Carting Agent">Carting Agent</option>
                  <option value="CHA">CHA</option>
                  <option value="Console">Consolidator</option>
                </select>
              </FormGroup>
            </Col>

            <Col md={3}>
              <button
                type="button"
                className="btn gap-2  btn-outline-primary"
                onClick={getByUserType}
                style={{ marginTop: '2.1vw' }}
              > <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                Search
              </button>
            </Col>

            <Col md={2}></Col> 
            <Col md={2}>
              <button
                type="button"
                className="btn gap-2  btn-outline-success"
                onClick={openModel}
                style={{ marginTop: '2.1vw' }}
              > <FontAwesomeIcon icon={faUserTie} style={{ marginRight: '5px' }} />
                ADD NEW
              </button>
            </Col>


          </Row>


            {currentItems.length > 0 && (
              <div className="table-responsive mt-4">
              <Table className="table table-striped table-hover">
                  <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                    <tr className="text-center">
                      <th style={{ backgroundColor: '#BADDDA'}} scope="col">Sr</th>
                      <th style={{ backgroundColor: '#BADDDA'}} scope="col">User Type</th>
                      <th style={{ backgroundColor: '#BADDDA'}} scope="col">Username</th>
                      <th style={{ backgroundColor: '#BADDDA'}} scope="col">Name</th>
                      <th style={{ backgroundColor: '#BADDDA'}} scope="col">Email Id</th>
                      <th style={{ backgroundColor: '#BADDDA'}} scope="col">Mobile No</th>
                      <th style={{ backgroundColor: '#BADDDA'}} scope="col">Status</th>
                      <th style={{ backgroundColor: '#BADDDA'}} scope="col">Re-Send</th>
                      <th style={{ backgroundColor: '#BADDDA'}} scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {currentItems.map((import2, index) =>

                      <tr className="text-center"
                        key={index}
                      >
                        <td className="table-column">{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                        <td className="table-column">{import2.userType}</td>
                        <td className="table-column">{import2.loginUserName}</td>
                        <td className="table-column">{import2.userName}</td>
                        <td className="table-column">{import2.email}</td>
                        <td className="table-column">{import2.mobile}</td>
                        <td className="table-column">{import2.userstatus === "A" ? "Active" : import2.userstatus === "I" ? "Inactive" : " "}</td>
                        <td className="table-column"> <FaLink size={22} fill="orange"  onClick={() => handlePwdReset(import2.externaluserId)} style={{ marginRight: '10px' }} /></td>
                        <td className="table-column">
                          <div className="text-center">
                            <button
                              type="button"
                              className="btn me-md-2   btn-outline-primary"
                              onClick={(e) => editUSer(import2.externaluserId)}
                            ><FontAwesomeIcon icon={faEdit}  />
                              {/* EDIT */}
                            </button>

                            <button
                              type="button"
                              className="btn gap-2  btn-outline-danger"
                              onClick={(e) => deleteUSer(import2.externaluserId)}
                            > <FontAwesomeIcon icon={faTrash}  />
                              {/* DELETE */}
                            </button>
                          </div>
                        </td>

                      </tr>
                    )
                    }
                  </tbody>
                </Table>
                <div className="text-center">
                  {/* Pagination */}
                  <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Pagination.Ellipsis />

        {displayPages().map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}

        <Pagination.Ellipsis />
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
                </div>
              </div>)}












        </CardBody>
      </Card >

      <Modal show={AddNewModel} onHide={closeAddNewModel} size="xl">

        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
          icon={faUserTag}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        />Add New External User</h5>
           
              <FontAwesomeIcon
                icon={faTimes}
                style={{ width: '2vw', height: '1.5vw', cursor: 'pointer' }}
                onClick={closeAddNewModel}
              />
            </div>
            <hr />

            <Row>
              <Col  md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">User Type</Label>

                  <select
                    className="form-select"
                    aria-label="SC Status"
                    style={{ borderColor: errors.userType ? '#f52b2b' : '' }}
                    value={userType}
                  
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option selected value="">Select User Type</option>
                    <option value="Carting Agent">Carting Agent</option>
                    <option value="CHA">CHA</option>
                    <option value="Console">Consolidator</option>
                  </select>
                  <div style={{ color: 'red' }} className="error-message">{formErrors.userType}</div>
                </FormGroup>
              </Col>

              <Col  md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Name</Label>
                  <Input
                    type="text" name="userName"
                    className="form-control"
                    value={userName}
                    maxLength={35}
                    style={{ borderColor: errors.userName ? '#f52b2b' : '' }}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <div style={{ color: 'red' }} className="error-message">{formErrors.userName}</div>
                </FormGroup>
              </Col>

              <Col  md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Email Id</Label>
                  <Input
                    type="email" name="email"
                    className="form-control"
                    value={email}
                    maxLength={40}
                    style={{ borderColor: errors.email ? '#f52b2b' : '' }}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => {
                      const emailValue = e.target.value;
                      if (!loginUserName) {
                        // Only update loginUserName if it's empty
                        setLoginUserName(emailValue);
                      }
                    }}
                  />
                  <div style={{ color: 'red' }} className="error-message">{formErrors.email}</div>
                </FormGroup>
              </Col>
            </Row>



            <Row>

              <Col  md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Login User Name</Label>
                  <Input
                    type="text" name="loginUserName"
                    className="form-control"
                    value={loginUserName}
                    maxLength={40}
                    style={{ borderColor: errors.loginUserName ? '#f52b2b' : '' }}
                    onChange={(e) => setLoginUserName(e.target.value)}
                  />
                  <div style={{ color: 'red' }} className="error-message">{formErrors.loginUserName}</div>
                </FormGroup>
              </Col>

              <Col  md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Mobile No</Label>
                  <Input
                    type="number"
                    name="mobile"
                    className="form-control"
                    value={mobile}
                    style={{ borderColor: errors.mobile ? '#f52b2b' : '' }}
                    onChange={(e) => {
                      let inputText = e.target.value;

                      // Check if the input has exceeded 10 digits
                      if (inputText.length > 10) {
                        // Trim the input to the first 10 digits
                        inputText = inputText.slice(0, 10);
                      }

                      // Update the state with the sanitized input
                      setMobile(inputText);
                    }}
                  />
                  <div style={{ color: 'red' }} className="error-message">{formErrors.mobile}</div>
                </FormGroup>
              </Col>


            

                <Col md={4}>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">User Status</Label>
                    <select
                      className="form-select"
                      name="userStatus"
                      value={userstatus}
                      onChange={(e) => setUserStatus(e.target.value)}
                    >
                      {/* <option selected value=""></option> */}
                      <option selected value="A">Active</option>
                      <option value="I">Inactive</option>
                    </select>
                  </FormGroup>
                </Col>


            </Row>

            <div className="text-center" >


            <Button
                variant="outline-success"
              
                style={{ marginLeft: '10px' }}
                onClick={(e) => SubmitExternalParty(e)}
              > <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                Save 
              </Button>
              <Button
                variant="outline-danger"
                // className="btnwidth"
                style={{ marginLeft: '10px' }}
                onClick={makeFieldEmpty}
              ><FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                Clear
              </Button>

             
            </div>

          </CardBody>
        </Card>
      </Modal>
    </div>
  );
}