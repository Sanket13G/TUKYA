import AuthContext from "../Components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import '../Components/Style.css'
import ipaddress from "../Components/IpAddress";
import { faEdit, faTrash, faCheck, faSave, faTimes, faSyncAlt, faCancel, faPrint, faXmark, faFileLines, faChessKing, faPlus, faHandsHoldingCircle, faHandsHolding, faRefresh, faJarWheat, faJar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Table,
  Container,
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
export default function Jar() {

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

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [jarList, setJarList] = useState([]);

  const [formData, setFormData] = useState({
    companyId: "",
    jarId: "",
    jarDesc: "",
    soundexDesc: " ",
    jarType: " ",
    detailAutoFlag: "",
    importAppl: " ",
    reference1: " ",
    reference2: " ",
    workflowId: " ",
    processId: " ",
    comments: " ",
    createdDate: "",
    createdBy: " ",
    editedBy: " ",
    approvedBy: " ",
    editedDate: " ",
    approvedDate: " ",
    status: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setFormData([]);
    setFormErrors(
      {
        jarType: "",
        jarDesc: "",
       
      }
    )
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditButtonClick = (item) => {
    console.log(item);

    return <addJarDetail item={item} />;
  };

  const [formErrors, setFormErrors] = useState({
    jarType: "",
    jarDesc: "",


  });

  const handleSubmit = () => {

    const errors = {};

    if (!formData.jarType) {
      errors.jarType = "Jar Type is required.";
    }

    if (!formData.jarDesc) {
      errors.jarDesc = "Jar Desc is required.";
    }

    if (!formData.jarType) {
      document.getElementById('jarType').classList.add('error-border');
    }

    if (!formData.jarDesc) {
      document.getElementById('jarDesc').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    formData.approvedBy = userId;
    formData.editedBy = userId;
    formData.createdBy = userId;
    console.log("Form Data:", formData);

    axios
      .post(`http://${ipaddress}jar/addJar/${companyid}`, formData) // Replace with your API endpoint
      .then((response) => {
        console.log("POST response:", response.data);
        getlist();
        toast.success("New jar Added Successfully", "success");
      })
      .catch((error) => {
        console.error("POST error:", error);
      });
    // Reload the page
    toggleModal();
  };
  const getlist = () => {
    axios
      .get(`http://${ipaddress}jar/list/${companyid}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setJarList(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getlist();
  }, []); // Fetch the list when the component mounts

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jarList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(jarList.length / itemsPerPage);

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
  


  return (
    <div className='Container'>

      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }}>
        <FontAwesomeIcon
          icon={faHandsHolding}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        />
        Common Master
      </h5>


      <Card>
        <CardBody className="text-end" style={{ paddingBottom: '-5px' }} >

          <button
            className="btn btn-outline-success"
            onClick={toggleModal}
            style={{ marginBottom: "10px" }}
          >
            <FontAwesomeIcon
              icon={faJar}
              style={{ marginRight: "5px" }}
            />
            Add Jar Type
          </button>

          <div className="table-responsive">
            <table className="table  table-striped table-hover">
              <thead className=" text-center"   >
                <tr>
                  <th style={{ background: "#BADDDA" }} scope="col">
                    Jar Id
                  </th>
                  <th style={{ background: "#BADDDA" }} scope="col">
                    Jar Type
                  </th>
                  <th style={{ background: "#BADDDA" }} scope="col">
                    Jar Desc
                  </th>
                  <th style={{ background: "#BADDDA" }} scope="col">
                    Jar Status
                  </th>
                  <th style={{ background: "#BADDDA" }} scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className=" text-center">
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.jarId}</td>
                    <td>{item.jarType}</td>
                    <td>{item.jarDesc}</td>
                    <td>
                      {item.status === "N"
                        ? "New"
                        : item.status === "U"
                          ? "Edit"
                          : item.status === "A"
                            ? "Approved"
                            : item.status}
                    </td>
                    <td className="text-center">
                      <Link to={`/Parent_Pages/AddJarDetails/${item.jarId}/${item.jarType}`}>
                        <button type="button" className="btn btn-outline-primary">

                          <FontAwesomeIcon
                            icon={faEdit}
                            style={{ marginRight: "px" }}
                          />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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


          {/* Modal for adding data */}
          {/* Modal for adding data */}
          <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader style={{
              backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
              boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
              border: '1px solid rgba(0, 0, 0, 0.3)',
              borderRadius: '0',
              backgroundColor: '#85144b',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              //backgroundPosition: 'center',
              backgroundPosition: 'center',
            }} toggle={toggleModal}>Add Jar Type  <FontAwesomeIcon
                icon={faJarWheat}
                style={{ marginRight: "5px" }}
              /></ModalHeader>
            <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
              <FormGroup>
                <Label for="jarType">Jar Type<span style={{color: 'red'}}>*</span></Label>
                <Input
                  type="text"
                  name="jarType"
                  id="jarType"
                  value={formData.jarType}
                  onChange={handleInputChange}
                  required
                />
                <div style={{ color: 'red' }} className="error-message">{formErrors.jarType}</div>

              </FormGroup>
              <FormGroup>
                <Label for="jarDesc">Jar Description<span style={{color: 'red'}}>*</span></Label>
                <Input
                  type="text"
                  name="jarDesc"
                  id="jarDesc"
                  value={formData.jarDesc}
                  onChange={handleInputChange}
                  required
                />
                <div style={{ color: 'red' }} className="error-message">{formErrors.jarDesc}</div>

              </FormGroup>
              <FormGroup>
                <Label for="comments">Jar Comment</Label>
                <Input
                  type="text"
                  name="comments"
                  id="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
              <button
                type="button"
                className="btn btn-outline-success me-md-2"
                onClick={handleSubmit}
              >
                <FontAwesomeIcon
                  icon={faSave}
                  style={{ marginRight: "5px" }}
                />
                Save
              </button>

              <button
                type="button"
                className="btn btn-outline-danger me-md-2"
                onClick={toggleModal}
              >
                <FontAwesomeIcon
                  icon={faRefresh}
                  style={{ marginRight: "5px" }}
                />
                Clear
              </button>
            </ModalFooter>
          </Modal>
        </CardBody>
      </Card>

    </div>
  );
}