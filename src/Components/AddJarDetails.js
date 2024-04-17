import AuthContext from "../Components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Components/Style.css";
import ipaddress from "./IpAddress";
import { Pagination } from "react-bootstrap";
import { faEdit, faTrash, faCheck, faSave, faJarWheat,faTimes, faSyncAlt, faCancel, faPrint, faXmark, faFileLines, faChessKing, faBackspace, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
import { toast } from "react-toastify";

const AddJarDetails = ({ item }) => {
  const { jarid, jartype } = useParams();
  console.log('jariddddd ', jarid);

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setJarDetail([]);
    setFormErrors(
      {
        jarDtlDesc: "",
        comments: "",
      }
    )
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editedJarDetail, setEditedJarDetail] = useState({
    jarDtlDesc: "",
    comments: "",
  });
  const toggleEditModal = (item) => {
    setEditingItem(item);
    setEditedJarDetail({
      jarDtlId: item.jarDtlId,
      jarDtlDesc: item.jarDtlDesc,
      comments: item.comments,
    });
    setIsEditModalOpen(!isEditModalOpen);
    setFormErrors(
      {
        jarDtlDesc: "",
        comments: "",
      }
    )
  };
  const [JarListDtl, setJarListDtl] = useState([]);

  const [jarDetail, setJarDetail] = useState({
    companyId: "",
    jarId: jarid,
    jarDtlDesc: "",
    percentage: "",
    refAttribute: "",
    workflowId: "",
    processId: "",
    comments: "",
    createdBy: username,
    createdDate: "",
    editedBy: username,
    editedDate: "",
    approvedBy: username,
    approvedDate: "",
    status: "",
  });

  const getJar = () => {
    axios
      .get(`http://${ipaddress}jar/getJar/${jarid}/${companyid}`)
      .then((response) => {
        console.log("GET jar response:", response.data);
        setJar(response.data); // Store the jar element in the state
      })
      .catch((error) => {
        console.error("GET jar error:", error);
      });
  };
  const [jar, setJar] = useState(null);
  console.log(jar);
  useEffect(() => {
    getJar();
  }, []); // Run the effect only once when the component mounts

  const getlist = () => {
    axios
      .get(`http://${ipaddress}jardetail/jarIdList/${jarid}/${companyid}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setJarListDtl(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  console.log(JarListDtl);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJarDetail((prevJarDetail) => ({
      ...prevJarDetail,
      [name]: value,
    }));
  };

  useEffect(() => {
    getlist();
  }, []);

  const handleSubmit = () => {
   

  const errors = {};


    if (!jarDetail.jarDtlId) {
      errors.jarDtlId = "Jar DTL Id is required.";
    }

    if (!jarDetail.jarDtlDesc) {
      errors.jarDtlDesc = "Jar DTL Desc is required.";
    }

    if (!jarDetail.jarDtlId) {
      document.getElementById('jarDtlId').classList.add('error-border');
    }

    if (!jarDetail.jarDtlDesc) {
      document.getElementById('jarDtlDesc').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
  
    console.log("Submitted Jar Detail:", jarDetail);
    jarDetail.status = "N";
    axios
      .post(`http://${ipaddress}jardetail/add/${companyid}/${jarid}`, jarDetail)
      .then((response) => {
        console.log("Response:", response.data);
        toast.success("Jar Update Successfully", {
          autoClose: 700
        });
        handleApproveAll();
        getlist();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // Reload the page    getlist();
    setIsModalOpen(false);
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedJarDetail((prevEditedDetail) => ({
      ...prevEditedDetail,
      [name]: value,
    }));
  };

  const [formErrors, setFormErrors] = useState({
    jarDtlId: "",
    jarDtlDesc: "",
  });

  const handleEditSave = () => {
    const errors = {};


    if (!editedJarDetail.jarDtlId) {
      errors.jarDtlId = "Jar DTL Id is required.";
    }

    if (!editedJarDetail.jarDtlDesc) {
      errors.jarDtlDesc = "Jar DTL Desc is required.";
    }

    if (!editedJarDetail.jarDtlId) {
      document.getElementById('jarDtlId').classList.add('error-border');
    }

    if (!editedJarDetail.jarDtlDesc) {
      document.getElementById('jarDtlDesc').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const editedData = {
      ...editingItem,
      jarDtlId: editedJarDetail.jarDtlId,
      jarDtlDesc: editedJarDetail.jarDtlDesc, // Updated field
      comments: editedJarDetail.comments, // Updated field

      // Add other fields from editingItem or editedJarDetail as needed
    };
    axios
      .post(`http://${ipaddress}jardetail/addUpdateStatus`, editedData)
      .then((response) => {
        console.log("Response:", response.data);
        handleApproveAll();
        toast.success("Jar Update Successfully", {
          autoClose: 700
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.success(error, {
          autoClose: 700
        });
      });

    getlist();
  };

  const handleDelete = (item) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://${ipaddress}jardetail/delete/${item.jarDtlId}/${companyid}`)
        .then((response) => {

          toast.success('JarDtlId Deleted Successfully', {
            autoClose: 700
          });
          getlist(); // Update the list after deletion
        })
        .catch((error) => {
          console.error("Delete error:", error);
          toast.success(error, {
            autoClose: 700
          });

        });
    }
  };
  const buttonStyle = {
    marginRight: "8px", // Adjust the margin as needed for your desired spacing
  };
  const handleApproveAll = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}jardetail/jarIdListUStatus/${jarid}/${companyid}`);
      // console.log(response.data);
      setJarListDtl(response.data);

      const JarAppoved = await axios.get(`http://${ipaddress}jar/getJarForUpdate/${jarid}/${companyid}`);
      // 
      console.log("Jar Approved request successful!");
      setJar(JarAppoved.data);
      // console.log(JarAppoved.data);
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle the error as needed
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = JarListDtl.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(JarListDtl.length / itemsPerPage);

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
    <div>

      <h5 className="pageHead" >Common Master For</h5>
      <Card>
        <CardBody>
          {jar ? (
            <div className="table-responsive">          
              <table className="table  table-striped table-hover">
              <thead>
                <tr>
                  <th style={{ background: "#BADDDA" }} scope="col"> Jar ID </th>
                  <th style={{ background: "#BADDDA" }} scope="col"> Jar Type </th>
                  <th style={{ background: "#BADDDA" }} scope="col"> Jar Desc </th>
                  <th style={{ background: "#BADDDA" }} scope="col"> Jar Status </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{jar.jarId}</td>
                  <td>{jar.jarType}</td>
                  <td>{jar.jarDesc}</td>
                  <td>
                    {jar.status === "N"
                      ? "New"
                      : jar.status === "U"
                        ? "Edit"
                        : jar.status === "A"
                          ? "Approved"
                          : jar.status}
                  </td>
                </tr>
              </tbody>
            </table>
            </div>

          ) : (
            <p>Loading jar element...</p>
          )}
          <div>
            <button className="btn btn-outline-success me-md-2" color="danger" onClick={toggleModal} style={buttonStyle}>
              <FontAwesomeIcon
                icon={faPlus}
                style={{ marginRight: "5px" }}
              />
              Add {jartype}
            </button>
            <button

              className="btn btn-outline-primary me-md-2"
              style={buttonStyle}
              onClick={handleApproveAll}
            >
              <FontAwesomeIcon
                icon={faSave}
                style={{ marginRight: "5px" }}
              />
              Submit
            </button>
            <Link to="/child/Jar">
              <button className="btn btn-outline-danger me-md-2" >
                <FontAwesomeIcon
                  icon={faBackspace}
                  style={{ marginRight: "5px" }}
                />
                Back</button>
            </Link>
          </div>
        </CardBody>

        <CardBody>
        <div className="table-responsive">          
              <table className="table  table-striped table-hover">
              <thead>
                <tr>
                  <th style={{ background: "#BADDDA" }} scope="col">Jar Dtl Desc</th>
                  <th style={{ background: "#BADDDA" }} scope="col">Jar Dtl Id</th>
                  <th style={{ background: "#BADDDA" }} scope="col">Jar Dtl Comment</th>
                  <th style={{ background: "#BADDDA" }} scope="col">Jar Dtl Status</th>
                  <th style={{ background: "#BADDDA" }} scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.jarDtlId}</td>
                    <td>{item.jarDtlDesc}</td>
                    <td>{item.comments}</td>
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
                      <button
                        type="button"
                        className="btn btn-outline-primary me-md-2"
                        onClick={() => toggleEditModal(item)}
                      >
                        <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(item)}
                      >
                        <FontAwesomeIcon icon={faTrash} style={{ marginRight: "5px" }} />
                      </button>
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
        </CardBody>
      </Card>


      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader 
        style={{
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
        }}
        toggle={toggleModal}> Add New {jartype} </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <FormGroup>
            <Label for="jarDtlId">
              Jar Dtl ID<span style={{color: 'red'}}>*</span>
            </Label>
            <Input
              type="text"
              name="jarDtlId"
              id="jarDtlId"
              value={jarDetail.jarDtlId}
              onChange={handleInputChange}
            />
            <div style={{ color: 'red' }} className="error-message">{formErrors.jarDtlId}</div>

          </FormGroup>
          <FormGroup>
            <Label for="jarDtlDesc" >
              Jar Dtl Desc<span style={{color: 'red'}}>*</span>
            </Label>
            <Input
              type="text"
              name="jarDtlDesc"
              id="jarDtlDesc"
              value={jarDetail.jarDtlDesc}
              onChange={handleInputChange}
            />
                       <div style={{ color: 'red' }} className="error-message">{formErrors.jarDtlDesc}</div>


          </FormGroup>
          <FormGroup>
            <Label for="comments" >
              Jar Comments
            </Label>
            <Input
              type="text"
              name="comments"
              id="comments"
              value={jarDetail.comments}
              onChange={handleInputChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-outline-danger "
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
            SUBMIT
          </button>
          <button
            type="button"
            className="btn btn-outline-danger "
            onClick={toggleModal}
          >
            <FontAwesomeIcon icon={faCancel} style={{ marginRight: "5px" }} />
            CANCEL
          </button>
        </ModalFooter>
      </Modal>
      <></>
      <Modal isOpen={isEditModalOpen} toggle={toggleEditModal}>
        <ModalHeader 
        style={{
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
        }}
        toggle={toggleEditModal}>
          Edit {jartype} for {editedJarDetail.jarDtlId}
        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <FormGroup>
            <Label for="jarDtlId" >
              Jar Dtl ID<span style={{color: 'red'}}>*</span>
            </Label>
            <Input
              readOnly
              type="text"
              name="jarDtlId"
              id="jarDtlId"
              value={editedJarDetail.jarDtlId}
              onChange={handleEditInputChange}
              style={{ backgroundColor: "#f0e7e6" }} // Apply gray background color
            />
 
          </FormGroup>

          <FormGroup>
            <Label for="jarDtlDesc" >
              Jar Dtl Desc<span style={{color: 'red'}}>*</span>
            </Label>
            <Input
              type="text"
              name="jarDtlDesc"
              id="jarDtlDesc"
              value={editedJarDetail.jarDtlDesc}
              onChange={handleEditInputChange}
            />
             <div style={{ color: 'red' }} className="error-message">{formErrors.jarDtlDesc}</div>
          </FormGroup>
          <FormGroup>
            <Label for="comments" >
              Jar Comments
            </Label>
            <Input
              type="text"
              name="comments"
              id="comments"
              value={editedJarDetail.comments}
              onChange={handleEditInputChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button outline color="primary" onClick={handleEditSave}>
            <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
            UPDATE
          </Button>
          <Button outline color="danger" onClick={toggleEditModal}>
            <FontAwesomeIcon icon={faCancel} style={{ marginRight: "5px" }} />
            CANCEL
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default AddJarDetails;