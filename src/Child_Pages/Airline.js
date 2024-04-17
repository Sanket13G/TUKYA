import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Components/AuthProvider";
import AddModal from "./AddModal";
import EditModal from "./EditModel";
import { Pagination } from "react-bootstrap";

import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from "reactstrap";
import { toast } from "react-toastify";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines, faPlane, faPlaneArrival, faPlaneCircleCheck, faPlaneDeparture, faPlaneUp, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft, faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons'; // Import circular icon

import ipaddress from "../Components/IpAddress";
import { FaPlane } from "react-icons/fa";

export default function Airline(props) {
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

  const reactPageName = "Airline";
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setFormData({
      ...formData,
      companyId: props.companyId || "",
      branchId: props.branchId || "",
      airlineName: props.airlineName || "",
      flightNo: props.flightNo || "",
      airlineShortName: props.airlineShortName || "",
      airlineDesc: props.airlineDesc || "",
      airlineCode: props.airlineCode || "",
      status: props.status || "",
      createdBy: props.createdBy || "",
      createdDate: props.createdDate || "",
      editedBy: props.editedBy || "",
      editedDate: props.editedDate || "",
      approvedBy: props.approvedBy || "",
      approvedDate: props.approvedDate || "",
    });
  }, [props]);

  const [formData, setFormData] = useState({
    companyId: "",
    branchId: "",
    airlineName: "",
    flightNo: "",
    airlineShortName: "",
    airlineDesc: "",
    airlineCode: "",
    status: "",
    createdBy: "",
    createdDate: "",
    editedBy: "",
    editedDate: "",
    approvedBy: "",
    approvedDate: "",
  });

  const [formErrors, setFormErrors] = useState({
    airlineName: "",
    airlineCode: "",
    flightNo: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Also update the editItemData state if in edit mode
    if (editItemData) {
      setEditItemData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [checkedAirline, setCheckedAirline] = useState([]);
  const checkAirline = () => {

    axios.get(`http://${ipaddress}Airline/findByCode1/${companyid}/${branchId}/${formData.airlineCode}`)
      .then((response) => {
        console.log('response.data 212 ', response.data);
        if (response.data === 'no') {
          console.log('response.data ga');
          handleSubmit();
        }
        else {

          toast.error("Please do not enter duplicate airline code.", {
            autoClose: 900
          })
          return;
        }
      })
      .catch((error) => {
        if (error) {
          // toast.error("Please do not enter duplicate airline code.", {
          //   autoClose: 900
          // })
         // return;
        }
      })
  };


  const checkAirline1 = () => {

    axios.get(`http://${ipaddress}Airline/findByCode2/${companyid}/${branchId}/${formData.airlineCode}/${formData.flightNo}`)
      .then((response) => {
        console.log('response.data 212 ', response.data);
        if (response.data === 'no') {
          console.log('response.data ga');
          handleSubmit();
        }
        else if(response.data === 'nochange'){
          handleSubmit();
        }
        else {

          toast.error("Please do not enter duplicate airline code.", {
            autoClose: 900
          })
          return;
        }
      })
      .catch((error) => {
        if (error) {
          // toast.error("Please do not enter duplicate airline code.", {
          //   autoClose: 900
          // })
         // return;
        }
      })
  };

  const handleSubmit = () => {


    const errors = {};

    if (!formData.airlineName) {
      errors.airlineName = "Airline name is required.";
    }

    if (!formData.airlineCode) {
      errors.airlineCode = "Airline Code is required.";
    }

    if (!formData.flightNo) {
      errors.flightNo = "Flight No is required.";
    }

    if (!formData.airlineName) {
      document.getElementById('airlineName').classList.add('error-border');
    }

    if (!formData.airlineCode) {
      document.getElementById('airlineCode').classList.add('error-border');
    }

    if (!formData.flightNo) {
      document.getElementById('flightNo').classList.add('error-border');
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }



    formData.createdBy = userId;
    formData.approvedBy = userId;
    formData.editedBy = userId;
    formData.branchId = branchId;
    formData.companyId = companyid;
    formData.status = "N";



    console.log(formData);
    axios
      .post(`http://${ipaddress}Airline/add`, formData)
      .then((response) => {
        console.log("Data saved successfully:", response.data);
        toast.success("Data saved successfully", {
          autoClose: 700
        });
        fetchData();
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        toast.error("Error saving data", "error");
      });
  };

  const [dataList, setDataList] = useState([]);

  const fetchData = () => {
    axios
      .get(`http://${ipaddress}Airline/list/${companyid}/${branchId}`)
      .then((response) => {
        console.log("Response data received:", response.data);
        if (Array.isArray(response.data)) {
          setDataList(response.data);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteButtonClick = (itemData) => {
    console.log(itemData);

    // Make a DELETE request to delete the item
    axios
      .post(
        `http://${ipaddress}Airline/delete`, itemData
      )
      .then((response) => {
        // Check if the delete request was successful (HTTP status code 200)
        if (response.status === 200) {
          // Item deleted successfully
          console.log("Item deleted successfully!");
          toast.error("Airline deleted successfully!", {
            autoClose: 700
          });
          // You can add additional actions here if needed, such as refreshing the data
          fetchData();
        } else {
          // Handle other status codes if needed
          console.error("Error deleting item. Status code:", response.status);
        }
      })
      .catch((error) => {
        // Handle error here
        console.error("Error deleting item:", error);
      });
  };

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editItemData, setEditItemData] = useState(null);

  const handleAdd = () => {
    setFormData({
      airlineName: "",
      airlineShortName: "",
      airlineCode: "",
      flightNo: "",
      airlineDesc: "",
    });
    setEditItemData(null);
    setAddModalOpen(true);
  };

  const handleEditButtonClick = (itemData) => {
    setFormData(itemData);
    setEditModalOpen(true);
  };



  const toggle = () => {
    setAddModalOpen(!isAddModalOpen);
    setFormErrors(
      {
        airlineName: "",
        airlineCode: "",
        flightNo: "",
      }
    )
  }

  const toggle1 = () => {
    setEditModalOpen(!isEditModalOpen);
    setFormErrors(
      {
        airlineName: "",
        airlineCode: "",
        flightNo: "",
      }
    )
  }

  const [filteredData, setFilteredData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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


  const [searchFilters, setSearchFilters] = useState({
    searchBy: '',

  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
 
  const handleSearch = () => {
    const filteredResults = dataList.filter((data) => {
      const searchByMatches = searchFilters.searchBy === '' || data.airlineCode.toLowerCase().includes((searchFilters.searchBy.toLowerCase()).trim()) || data.airlineName.toLowerCase().includes((searchFilters.searchBy.toLowerCase()).trim()) || data.airlineShortName.toLowerCase().includes((searchFilters.searchBy.toLowerCase()).trim()) ||  data.flightNo.toLowerCase().includes((searchFilters.searchBy.toLowerCase()).trim());


      return searchByMatches;
    });

    setFilteredData(filteredResults);
  }

  useEffect(() => {
    handleSearch();

  }, [dataList])


  const handleReset = () => {
    setSearchFilters(
      {
        searchBy: ""
      }
    )
    fetchData();
    handleSearch();
  }



  return (

    <div className="Container">
      {/* <Container > */}
      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }}><FontAwesomeIcon
        icon={faPlaneDeparture}
        style={{
          marginRight: '8px',
          color: 'black', // Set the color to golden
        }}
      />Airline </h5>
      <Card style={{

        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'auto',
        overflowX: "hidden",

      }} >
        <CardBody style={{ paddingBottom: '-5px' }} className="text-end">
          <button
            className="btn btn-outline-success"
            onClick={handleAdd}
            style={{
              marginRight: 5,
            }}
          >
            <FontAwesomeIcon icon={faPlane} style={{ marginRight: '5px' }} />
            Add New
          </button>
          <hr />
          <AddModal
            isOpen={isAddModalOpen}
            toggleModal={toggle}
            handleSubmit={checkAirline}
            handleChange={handleChange}
            formData={formData}
            formErrors={formErrors}
          />
          <EditModal
            isOpen={isEditModalOpen}
            toggleModal={toggle1}
            handleSubmit={checkAirline1}
            handleChange={handleChange}
            formData={formData}
            formErrors={formErrors}
          />

<Row className="align-items-center">
            <Col sm={7} className="pt-3 ">
              <FormGroup>

                <Input
                  type="text"
                  name="searchBy"
                  id="searchBy"
                  className="inputField"
                  value={searchFilters.searchBy}
                  onChange={handleFilterChange}
                  placeholder="Search by Airline name / Airline short name / Airline code / Flight no"

                />
              </FormGroup>
            </Col>
            <Col sm={5}>
              <div className="d-flex justify-content-">
                <Button
                  color="primary"
                  outline
                  onClick={handleSearch}
                  className="mr-2" // Add margin to the right
                  style={{ marginRight: '25px' }}
                >
                  <FontAwesomeIcon icon={faSearch} style={{ marginRight: 'px' }} />

                </Button>
                <Button
                  color="danger"
                  outline
                  onClick={handleReset}
                  className="mr-2" // Add margin to the right
                  style={{ marginRight: '5px' }}
                >
                  <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                  RESET
                </Button>
                
              </div>
            </Col>
          </Row>
        </CardBody>

        <CardBody style={{ paddingTop: '2px', }}>
          <div className="table-responsive">
            <table className="table  table-striped table-hover">
              <thead className="thead-dark bg-dark"  >
                <tr>
                  <th scope="col" className="text-center" style={{ backgroundColor: '#BADDDA', color: 'black', fontFamily: 'Your-Heading-Font', }}>Airline Name</th>
                  <th scope="col" className="text-center" style={{ backgroundColor: '#BADDDA', color: 'black', fontFamily: 'Your-Heading-Font' }}>Airline Short Name</th>
                  <th scope="col" className="text-center" style={{ backgroundColor: '#BADDDA', color: 'black', fontFamily: 'Your-Heading-Font' }}>Airline Desc</th>
                  <th scope="col" className="text-center" style={{ backgroundColor: '#BADDDA', color: 'black', fontFamily: 'Your-Heading-Font' }}>Airline Code</th>
                  <th scope="col" className="text-center" style={{ backgroundColor: '#BADDDA', color: 'black', fontFamily: 'Your-Heading-Font' }}>Flight No</th>
                  <th scope="col" className="text-center" style={{ backgroundColor: '#BADDDA', color: 'black', fontFamily: 'Your-Heading-Font' }}>Action</th>


                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item.airlineName}</td>
                    <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item.airlineShortName}</td>
                    <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item.airlineDesc}</td>
                    <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item.airlineCode}</td>
                    <td style={{ textAlign: 'center', fontFamily: 'Your-Data-Font' }}>{item.flightNo}</td>

                    <td className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn  btn-outline-primary"
                        onClick={() => handleEditButtonClick(item)}
                        style={{ marginRight: '5px' }}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                        />
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteButtonClick(item)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}

                        />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
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
      {/* </Container> */}
    </div>

  );
}