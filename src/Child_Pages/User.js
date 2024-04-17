import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import "../Components/Style.css";
import ipaddress from "../Components/IpAddress";
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
import { faPlaneDeparture, faSearch, faUser, faUserCheck, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from "react-toastify";

export default function User() {
  const {
    jwtToken,
    user_Id,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    login,
    logout,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const [JarListDtl, setJarListDtl] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);
  const [userList, setUserList] = useState([]);
  const initialState = {
    role: "ROLE_USER",
    enabled: true,
    company_Id: companyid,
    mobile: "",
    created_By: user_Id,
    mapped_User: null,
    user_Email: "",
    stop_Trans: "N",
    accountNonLocked: true,
    user_Id: "",
    branch_Id: branchId,
    user_Name: "",
    user_Type: "",
    status: "",
    comments: "",
    credentialsNonExpired: true,
    accountNonExpired: true,

    user_Password: "",
    authorities: null,

    approved_By: user_Id,
  };
  const [formErrors, setFormErrors] = useState({
    user_Id: "",
    user_Name: "",
    user_Password: "",
    user_Email: "",
    user_Type: "",
    mobile: "",

  });

  const [formData, setFormData] = useState(initialState);
  const [searchInput, setSearchInput] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDelete = (user_Id) => {
    axios
      .delete(`http://${ipaddress}UserCreation/delete/${user_Id}`)
      .then((response) => {
        //console.log(`User with ID ${user_Id} deleted successfully!`);
        toast.error(`User with ID ${user_Id} deleted successfully!`, "success");

        // After successful deletion, update the userList state
        setUserList((prevList) =>
          prevList.filter((user) => user.user_Id !== user_Id)
        );
      })
      .catch((error) => {
        console.error("Error while deleting user:", error);
        toast.error("Error while deleting user!", "error");
      });
  };

  const fetchDataFromServer = () => {
    axios
      .get(`http://${ipaddress}UserCreation/list/${companyid}/${branchId}`)
      .then((response) => {
        setUserList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching data:", error);
      });
  };

  const getlist = () => {
    axios
      .get(`http://${ipaddress}jardetail/internaluser/${companyid}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setJarListDtl(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    fetchDataFromServer();
    getlist();
  }, []);

  const handleClear = () => {
    setFormData(initialState);
    setFormErrors({
      user_Id: "",
      user_Name: "",
      user_Password: "",
      user_Email: "",
      user_Type: "",
      mobile: "",
    })
    document.getElementById('user_Id').classList.remove('error-border');
    document.getElementById('user_Name').classList.remove('error-border');
    document.getElementById('user_Password').classList.remove('error-border');
    document.getElementById('user_Email').classList.remove('error-border');
    document.getElementById('user_Type').classList.remove('error-border');
    document.getElementById('mobile').classList.remove('error-border');


  };



  const handleSubmit = () => {

    const errors = {};
    if (!formData.user_Id) {
      errors.user_Id = "User Id is required.";
    }

    if (!formData.user_Name) {
      errors.user_Name = "Username is required.";
    }
    if (!formData.user_Password) {
      errors.user_Password = "User password is required.";
    }
    if (!formData.user_Email) {
      errors.user_Email = "Email is required.";
    }


    if (!formData.mobile) {
      errors.mobile = "Mobile is required.";
    }

    if (!formData.user_Id) {
      document.getElementById('user_Id').classList.add('error-border');
    }

    if (!formData.user_Name) {
      document.getElementById('user_Name').classList.add('error-border');
    }
    if (!formData.user_Password) {
      document.getElementById('user_Password').classList.add('error-border');
    }
    if (!formData.user_Email) {
      document.getElementById('user_Email').classList.add('error-border');
    }


    if (!formData.mobile) {
      document.getElementById('mobile').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    axios
      .post(`http://${ipaddress}UserCreation/add`, formData)
      .then((response) => {
        console.log("Form data sent successfully!");
        console.log(response.data); // Print the response from the Spring controller if needed
        toast.success("Form data sent successfully!", "success");
        setFormData(response.data);
        fetchDataFromServer();

      })
      .catch((error) => {
        console.error("Error while sending form data:", error);
        toast.error("Error while sending form data!", "error");
      });
  };

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  const handleEdit = (user) => {
    setFormData(user);
  };

  const handleSearch = () => {
    // Filter the userList based on the searchInput
    const filteredUserList = userList.filter(
      (user) =>
        user.user_Name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.user_Id.toLowerCase().includes(searchInput.toLowerCase())
      // Add more fields to search as needed
    );
    setSearchResults(filteredUserList);
    setShowSearchResults(true);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };
  const saveHandle = () => {
    console.log(formData);



    if (!formData.user_Id || !formData.user_Password || !formData.user_Name) {
      // Add the error class to the input fields with empty values
      if (!formData.user_Id) {
        document.getElementById('user_Id').classList.add('error-border');
      }
      if (!formData.user_Password) {
        document.getElementById('user_Password').classList.add('error-border');
      }
      if (!formData.user_Name) {
        document.getElementById('user_Name').classList.add('error-border');
      }
      if (!formData.user_Email) {
        document.getElementById('user_Email').classList.add('error-border');
      }



      return; // Prevent saving if required fields are empty
    }
    axios
      .post(`http://${ipaddress}UserCreation/add`, formData)
      .then((response) => {
        console.log("Form data sent successfully!");
        console.log(response.data);

        // Update formData state with the response data
        setFormData(response.data);

        toast.success("Form data sent successfully!", "success");
        fetchDataFromServer(); // Optional: Update the user list after saving
      })
      .catch((error) => {
        console.error("Error while sending form data:", error);
        toast.error("Error while sending form data!", "error");
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userList.length / itemsPerPage);

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


  const handlesearchclear = () =>{
    setSearchResults([]);
    setShowSearchResults(false);
    fetchDataFromServer();
    setSearchInput('');
  }



  return (
    <div className="Container" >
      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
          icon={faUserCircle}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        />User Creation</h5>

      <Card  >
        <CardBody>


        <Form>
      <Row>
        <Col >
          <FormGroup>
            <Label className="forlabel" for="branchId">
              Branch Name
            </Label>
            <Input
              type="text"
              name="branchname"
              id="branchname"
              value={branchname}
              onChange={handleChange}
              readOnly
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label className="forlabel" for="user_Id">
              User ID *
            </Label>
            <Input
              type="text"
              name="user_Id"
              id="user_Id"
              value={formData.user_Id}
              onChange={handleChange}
              pattern="^[a-zA-Z0-9]+$" // Alphanumeric characters without spaces
              maxLength={100} // Maximum length of 30 characters
              required // Field must not be left blank
              title="User ID should consist of only letters and numbers"
            />
            <div style={{ color: 'red' }} className="error-message">{formErrors.user_Id}</div>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label className="forlabel" for="user_Password">
              User Password *
            </Label>
            <Input
              type="password"
              name="user_Password"
              id="user_Password"
              maxLength={15}
              value={formData.user_Password}
              onChange={handleChange}
              required
            />
            <div style={{ color: 'red' }} className="error-message">{formErrors.user_Password}</div>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label className="forlabel" for="user_Name">
              User Name *
            </Label>
            <Input
              type="text"
              name="user_Name"
              id="user_Name"
              maxLength={100}
              value={formData.user_Name}
              onChange={handleChange}
              required
            />
            <div style={{ color: 'red' }} className="error-message">{formErrors.user_Name}</div>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label className="forlabel" for="user_Email">
              User Email *
            </Label>
            <Input
              type="email"
              name="user_Email"
              id="user_Email"
              maxLength={50}
              value={formData.user_Email}
              onChange={handleChange}
              required
            />
            <div style={{ color: 'red' }} className="error-message">{formErrors.user_Email}</div>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label className="forlabel" for="user_Type">
              User Types
            </Label>
            <Input
              type="select"
              name="user_Type"
              id="user_Type"
              value={formData.user_Type}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {JarListDtl.map((data, index) => (
                <option key={index} value={data.jarDtlDesc}>
                  {data.jarDtlDesc}
                </option>
              ))}
             
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label className="forlabel" for="stop_Trans">
              Stop Transactions
            </Label>
            <Input
              type="select"
              name="stop_Trans"
              id="stop_Trans"
              value={formData.stop_Trans}
              onChange={handleChange}
            >
              <option value="N">No</option>
              <option value="Y">Yes</option>
            </Input>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label className="forlabel" for="mobile">
              Mobile No.
            </Label>
            <Input
              type="text"
              name="mobile"
              id="mobile"
              maxLength={10}
              value={formData.mobile}
              onChange={handleChange}
            />
            <div style={{ color: 'red' }} className="error-message">{formErrors.mobile}</div>
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label className="forlabel" for="comments">
              Comments
            </Label>
            <Input
              type="text"
              name="comments"
              maxLength={150}
              id="comments"
              value={formData.comments}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <div
            style={{
              marginTop: 10,
              marginBottom:10,
              display: "flex",
              justifyContent: "center", // Center buttons horizontally
            }}
          >
           
            <Button
              type="button"
              className="allbutton"
              variant="outline-success"
              onClick={handleSubmit}
              style={{ marginRight: 5 }}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              Submit
            </Button>

            
            <Button
              type="button"
              className="allbutton"
              variant="outline-danger"
              onClick={handleClear}
            >
              <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: "5px" }} />
              Reset
            </Button>
          </div>
        </Col>
        <Col md={4}></Col>
      </Row>
      
    </Form>

          <Card>
            <CardBody>
              <Form>
              <Row>
  <Col md={8}>
    <FormGroup>
      <Label className="forlabel" for="search">Search in List Data.</Label>
      <Input
        type="text"
        name="search"
        id="search"
        style={{ width: '100%' }} 
        value={searchInput}
        onChange={handleSearchChange}
      />
    </FormGroup>
  </Col>
  <Col md={4}>
    <FormGroup>

      <Button
        type="button"
        style={{
          marginTop: 30,
          marginLeft: 5
        }}
        className="allbutton"
        variant="outline-primary"
        onClick={handleSearch}
      >
        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
        Search
      </Button>

      <Button
              type="button"
              className="allbutton"
              style={{
                marginTop: 30,
                marginLeft: 5
              }}
              variant="outline-danger"
              onClick={handlesearchclear}
            >
              <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: "5px" }} />
              Reset
            </Button>

    </FormGroup>
  </Col>
</Row>

                
              </Form>
              <hr />

              <div className="table-responsive">
  <Table className="table table-striped table-hover">
    <thead>
      <tr>
        <th style={{ backgroundColor: '#BADDDA'}} >BranchName</th>
        <th style={{ backgroundColor: '#BADDDA' }}>User Id</th>
        <th style={{backgroundColor: '#BADDDA'}}>User Name</th>
        {/* <th>user_Email</th> */}
        <th style={{ backgroundColor: '#BADDDA'}}>User Type</th>
        <th style={{backgroundColor: '#BADDDA' }}>Stop Transaction</th>
        <th style={{backgroundColor: '#BADDDA' }}>Comments</th>
        <th style={{ backgroundColor: '#BADDDA' }}> Status</th>
        <th style={{ backgroundColor: '#BADDDA'}} className="text-center">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {/* Render either searchResults or all userList based on showSearchResults */}
      {showSearchResults
        ? searchResults.map((user) => (
            <tr key={user.user_Id}>
              <td>{branchname}</td>
              <td>{user.user_Id}</td>
              <td>{user.user_Name}</td>
              {/* <td>{user.user_Email}</td> */}
              <td>{user.user_Type}</td>
              <td>{user.stop_Trans}</td>
              <td>{user.comments}</td>
              <td>
                {user.status === "N"
                  ? "New"
                  : user.status === "U"
                  ? "Edit"
                  : user.status === "A"
                  ? "Approved"
                  : user.status}
              </td>
              <td className="text-center d-grid gap-2 d-md-block">
                <Button
                  type="button"
                  variant="outline-primary"
                  onClick={() => handleEdit(user)}
                  style={{ marginRight: 'px' }}
                >
                  <FontAwesomeIcon icon={faEdit} style={{ marginRight: 'px' }} />
                </Button>
                <Button
                  type="button"
                  variant="outline-danger"
                  onClick={() => handleDelete(user.user_Id)}
                >
                  <FontAwesomeIcon icon={faTrash} style={{ marginRight: 'px' }} />
                </Button>
              </td>
            </tr>
          ))
        : currentItems.map((user) => (
            <tr key={user.user_Id}>
              <td>{branchname}</td>
              <td>{user.user_Id}</td>
              <td>{user.user_Name}</td>
              {/* <td>{user.user_Email}</td> */}
              <td>{user.user_Type}</td>
              <td>
                {user.stop_Trans === "N"
                  ? "No"
                  : user.stop_Trans === "Y"
                  ? "Yes"
                  : user.stop_Trans}
              </td>
              <td>{user.comments}</td>
              <td>
                {user.status === "N"
                  ? "New"
                  : user.status === "E"
                  ? "Edit"
                  : user.status === "A"
                  ? "Approved"
                  : user.status}
              </td>
              <td className="text-center d-grid gap-2 d-md-block">
                <Button
                  type="button"
                  variant="outline-primary"
                  onClick={() => handleEdit(user)}
                  style={{ marginRight: '5px' }}
                >
                  <FontAwesomeIcon icon={faEdit} style={{ marginRight: 'px' }} />
                </Button>
                <Button
                  type="button"
                  variant="outline-danger"
                  onClick={() => handleDelete(user.user_Id)}
                >
                  <FontAwesomeIcon icon={faTrash} style={{ marginRight: 'px' }} />
                </Button>
              </td>
            </tr>
          ))}
    </tbody>
  </Table>
</div>
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

            </CardBody>
          </Card>

          <Row>
            <>
              <></>
            </>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}