import { FaClosedCaptioning, FaEdit, FaLink } from "react-icons/fa";
import React, { useState, useEffect, useContext } from "react";

import {
  Table,
  Card,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import AuthContext from "../Components/AuthProvider";
import UpdatePartyForm from "./updatePartyForm";
import ipaddress from "../Components/IpAddress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faFileText,
  faHistory,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../Components/Style.css";
import {
  faCheck,
  faSave,
  faTimes,
  faSyncAlt,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import {
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
} from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useRef } from "react";
import { Link } from "react-scroll";
const PartyListTable = () => {
  const [parties, setParties] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);
  const reactPageName = 'PartyListTable';
  useEffect(() => {
    fetchParties();
  }, []);

  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    isAuthenticated,
    login,
    logout,
  } = useContext(AuthContext);
  const [loaModalOpen, setLoaModalOpen] = useState(false); // State to control LOA modal
  const [selectedPartyForLoa, setSelectedPartyForLoa] = useState(null);
  const [secondModalOpen, setSecondModalOpen] = useState(false); // State to control the second modal
  const [partyId, setpartyId] = useState(null);
  const formatDateTime1 = (value) => {
    if (!value) {
      return "";
    }
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const fetchParties = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}parties/getAll/${companyid}/${branchId}`);
      setParties(response.data);
    } catch (error) {
      console.error('Error fetching parties:', error);
      // Handle error and display an error message if necessary.
    }
  };

  const handleDelete = async (partyId) => {
    try {
      await axios.delete(`http://${ipaddress}parties/delete/${partyId}`);
      toast.success('Party Deleted Successfully !!!', {
        position: 'top-center',
        autoClose: 2700,
      });
      // Fetch the updated party list after deletion
      fetchParties();
    } catch (error) {
      console.error('Error deleting party:', error);
      // Handle error and display an error message if necessary.
      toast.error('Failed to delete party !!!', {
        position: 'top-center',
        autoClose: 2700,
      });
    }
  };



 //handle link functions here
 const handlePwdReset =  (partyId) => {
  console.log(partyId);
  // Find the selected party from the parties array based on the partyId
  const party = parties.find((party) => party.partyId === partyId);
  
  
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
      '5': '5',
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
      '5': '5',
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
  const encodedCompanyId = customEncode(party.companyId);
  const encodedBranchId = customEncode(party.branchId);
  const encodedPartyId = customEncode(party.partyId);
  console.log(party.companyId,party.branchId,party.partyId);
  const DecodedCompanyId1 = customDecode(encodedCompanyId);
  const DecodedBranchId1 = customDecode(encodedBranchId);
  const DecodedPartyId1 = customDecode(encodedPartyId);
  
  console.log(encodedCompanyId);
  console.log(encodedBranchId);
  console.log(encodedPartyId);
  
  
  console.log(DecodedCompanyId1);
  console.log(DecodedBranchId1);
  console.log(DecodedPartyId1);
  
  
      try {
          axios.post(`http://${ipaddress}parties/resetpassword/${ipaddress}/${encodedCompanyId}/${encodedBranchId}/${encodedPartyId}`,party );
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


  const handleEdit = (partyId) => {
    // Find the selected party from the parties array based on the partyId
    const party = parties.find((party) => party.partyId === partyId);
    setSelectedParty(party);
    setEditModalOpen(true);
  };

  const toggleEditModal = () => {
    setEditModalOpen((prevState) => !prevState);
  };

  const itemsPerPage = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the parties to display on the current page
  const partiesToShow = parties.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(parties.length / itemsPerPage);
  const maxVisiblePages = 10;
  const visiblePages = Math.min(
    totalPages,
    Math.max(maxVisiblePages, currentPage)
  );

  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(maxVisiblePages / 2),
      totalPages - maxVisiblePages + 1
    )
  );
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);


  const openLoaModal = (partyId) => {
    // Find the selected party from the parties array based on the partyId
    const party = parties.find((party) => party.partyId === partyId);
    setSelectedPartyForLoa(party);
    setpartyId(party.partyId);
    // console.log("Selected party", party);
    setLoaModalOpen(true);
  };
  const [letterNumber1, setLetterNumber1] = useState("");
  const [letterdate, setletterdate] = useState("");
  const [newLocDate, setnewLocDate] = useState("");
  const [filepath, setfilepath] = useState("");
  const [pdfData, setPdfData] = useState("");
  const [documentModel, setdocumentModel] = useState(false);
  const [ImagensdlStatusDocs, setImagensdlStatusDocs] = useState("");
  const [closedocumentModel, setclosedocumentModel] = useState(false);

  const showDocumentModel = () => {
    // Check if the response status is OK (200)
    if (pdfData) {
      // Get the raw response data as base64-encoded string
      const base64PDF = pdfData;

      // Create a new window for displaying the PDF
      const newWindow = window.open("", "_blank");

      // Write the HTML content to the new window
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>PDF Viewer</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              overflow: hidden;
            }
            embed {
              width: 100vw;
              height: 100vh;
            }
          </style>
        </head>
        <body>
          <embed src="data:application/pdf;base64,${base64PDF}" type="application/pdf" width="100%" height="100%">
        </body>
        </html>
      `);
    } else {
      setdocumentModel(true);
    }
  };

  const updatePartyForm = () => {
    // Update prorties for selectedPartyForLoa
    if (letterNumber1 !== "" && newLocDate !== "" && letterdate !== "") {
      setSelectedPartyForLoa((prevSelectedPartyForLoa) => ({
        ...prevSelectedPartyForLoa,
        loaNumber: letterNumber1,
        loaExpiryDate: newLocDate,
        loaIssueDate: letterdate,
      }));

      console.log(selectedPartyForLoa);

      axios
        .post(
          `http://${ipaddress}parties/updatepartyloa`,
          selectedPartyForLoa,
          {
            headers: {
              Authorization: jwtToken,
              "Content-Type": "application/json", // Set the content type to JSON
            },
          }
        )
        .then((response) => {
          // console.log("Response from server:", response.data);
          // toast.success(`LOA Updated for this party ${response.data}`);
        })
        .catch((error) => {
          console.error("Error sending data:", error);
          // toast.error("Error sending data:", error);
        });
    } else {
      console.log(
        "Some of the values are null, not updating selectedPartyForLoa."
      );
    }

    // Print updated selectedPartyForLoa to console
    // console.log("Updated selectedPartyForLoa:", selectedPartyForLoa);
  };

  const handleSubmit = async () => {
    setLetterNumber1Error("");
    setLetterdateError("");
    setNewLocDateError("");

    // Validation logic for required fields
    let isValid = true;
    if (!letterNumber1) {
      setLetterNumber1Error("Letter Number is required.");
      isValid = false;
    }
    if (!letterdate) {
      setLetterdateError("Letter Date is required.");
      isValid = false;
    }
    if (!newLocDate) {
      setNewLocDateError("New LOA Expiry Date is required.");
      isValid = false;
    }

    if (isValid) {
      if (filepath === "") 
      {
        const formData = new FormData();
        console.log("file here ------------------------------------------");

        formData.append("loaNumber", letterNumber1);
        formData.append("loaIssueDate", letterdate);
        formData.append("oldLoaExpiryDate", selectedPartyForLoa.loaExpiryDate);
        formData.append("newLoaExpiryDate", newLocDate);
        formData.append("createdBy", username);
        formData.append("status", "A");
        formData.append("partyId", selectedPartyForLoa.partyId);

        try {
          const response = await axios.post(
            `http://${ipaddress}partyLoa/addRepresentativewithoutfile/${companyid}/${branchId}/${selectedPartyForLoa.partyId}`,
            formData
          );

          console.log("Form data sent successfully!");
          console.log(response.data);
          // Assuming response.data is the updated form data, update formData state
          // setFormData(response.data);
          toast.success("Form data sent successfully!", "success");
          // fetchPartiesData();
          // setsingleRepresentativeModel(false);
        } catch (error) {
          console.error("Error while sending form data:", error);
          toast.error("Error while sending form data!", "error");
        }
      } else {
        const formData = new FormData();
        console.log("file here -----------------------------not -------------");
        formData.append("loaNumber", letterNumber1);
        formData.append("loaIssueDate", letterdate);
        formData.append("oldLoaExpiryDate", selectedPartyForLoa.loaExpiryDate);
        formData.append("newLoaExpiryDate", newLocDate);
        formData.append("createdBy", username);
        formData.append("status", "A");
        formData.append("partyId", selectedPartyForLoa.partyId);

        formData.append("file", filepath);
        console.log(filepath.get);

        try {
          const response = await axios.post(
            `http://${ipaddress}partyLoa/addRepresentative/${companyid}/${branchId}/${selectedPartyForLoa.partyId}`,
            formData
          );

          console.log("Form data sent successfully!");
          console.log(response.data);
          // Assuming response.data is the updated form data, update formData state
          // setFormData(response.data);
          toast.success("Form data sent successfully!", "success");
          // fetchPartiesData();
          // setsingleRepresentativeModel(false);
        } catch (error) {
          console.error("Error while sending form data:", error);
          toast.error("Error while sending form data!", "error");
        }
      }
    }
  };

  const getByMAWBnoAndHAwbIMAGE = (sirNo) => {
    try {
      axios
        .get(
          `http://${ipaddress}partyLoa/getfile/${companyid}/${branchId}/${selectedPartyForLoa.partyId}/${sirNo}`
        )
        .then((response) => {
          // console.log(response.status);

          if (response.status === 200) {
            const contentType = response.headers["content-type"];

            if (contentType === "application/pdf") {
              const base64PDF = response.data;

              // Create a new window for displaying the PDF
              const newWindow = window.open("", "_blank");

              // Write the HTML content to the new window
              newWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>PDF Viewer</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        embed {
          width: 100vw;
          height: 100vh;
        }
      </style>
    </head>
    <body>
      <embed src="data:application/pdf;base64,${base64PDF}" type="application/pdf" width="100%" height="100%">
    </body>
    </html>
  `);

              // If the response is a PDF, set it to pdfData
              // setPdfData(response.data);
              setImagensdlStatusDocs(null); // Clear imageData
            } else {
              // If the response is an image, set it to imageData
              setImagensdlStatusDocs(response.data);
              setPdfData(null); // Clear pdfData

              setShowModal(true);
            }
          } else {
            throw new Error("Network response was not ok");
          }
        });
    } catch (error) {
      console.error("Error fetching image or PDF:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Check if a file is selected
    if (!selectedFile) {
      return;
    }
    // Check file size (in bytes)
    const maxSizeInBytes = 8 * 1024 * 1024; // 8MB
    if (selectedFile.size > maxSizeInBytes) {
      toast.error("File size must be less than 8MB");
      return;
    }
    // Check file type
    const allowedFileTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    if (!allowedFileTypes.includes(selectedFile.type)) {
      toast.error("File type must be jpg, jpeg, png, or pdf");
      return;
    }
    // If all checks pass, set the selected file
    setfilepath(selectedFile);
  };

  const [fileError, setFileError] = useState("");

  const [loaHistory, setloaHistory] = useState([]);

  const fetchLoaHistory = () => {
    axios
      .get(
        `http://${ipaddress}partyLoa/historyLoa/${companyid}/${branchId}/${selectedPartyForLoa.partyId}`
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        setloaHistory(data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handlerClear = () => {
    setLetterNumber1("");
    setFileError("");
    setletterdate("");
    setnewLocDate("");
    setfilepath("");
    setLetterNumber1Error("");
    setLetterdateError("");
    setNewLocDateError("");
  };

  const [showFirstBody, setShowFirstBody] = useState(true); // Initialize showFirstBody as true
  const [letterNumber1Error, setLetterNumber1Error] = useState("");
  const [letterdateError, setLetterdateError] = useState("");
  const [newLocDateError, setNewLocDateError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalImagePath, setModalImagePath] = useState("");
  const [documentMModel, setDocumentMModel] = useState(false); // State to control the modal
  const [selectedDocument, setSelectedDocument] = useState(""); // State to store the selected document path
  const [selectedDocumentData, setSelectedDocumentData] = useState(null);
  const openDocumentModel = (item) => {
    setSelectedDocument(item.imagePath);
    setDocumentMModel(true);
  };

  const closeDocumentModel = () => {
    setSelectedDocument("");
    setDocumentMModel(false);
  };
 
  return (
    <>

     
      <div className="table-responsive">
  <Table className="table table-striped table-hover">
        <thead>
          <tr>

          <th style={{ background: '#BADDDA' }}>Party ID</th>
            <th style={{ background: '#BADDDA',width: '200px' }}>Party Name</th>
            <th style={{ background: '#BADDDA' }}>Email</th>
            <th style={{ background: '#BADDDA' }}>Mobile No</th>
      
            <th style={{ background: '#BADDDA' }}>Entity ID</th>
            <th style={{ background: '#BADDDA' }}>Credit Limit</th>
            <th style={{ background: '#BADDDA' }}>Status</th>
            <th style={{ backgroundColor: '#BADDDA'}} scope="col">Re-Send</th>
            <th style={{ background: "#BADDDA" }}></th>
            <th style={{ background: '#BADDDA' }}>Action</th>
            {/* <th style={{ background: '#BADDDA' }}>Delete</th> */}
          </tr>
        </thead>
        <tbody>
          {partiesToShow.map((party) => (
            <tr key={party.partyId}>
              <td>{party.partyId}</td>
              <td>{party.partyName}</td>
              <td>{party.email}</td>
              <td>{party.mobileNo}</td>
         
              <td>{party.entityId}</td>
              <td>{party.creditLimit}</td>
              {/* Add other table data for displaying party data */}
              <td>{party.status === 'E' ? 'Edit' : party.status === 'N' ? 'New' : party.status === 'A' ? 'Approved' : party.status}</td>
              <td className="table-column"> <FaLink size={22} fill="orange"  onClick={() => handlePwdReset(party.partyId)} style={{ marginRight: '10px' }} /></td>
              <td>
                  <Button
                    type="button"
                    variant="outline-primary"
                    style={{ marginRight: "5px" }}
                    onClick={() => openLoaModal(party.partyId)} // Call openLoaModal with the partyId
                  >
                    <FontAwesomeIcon icon={faFileText} />
                  </Button>
                </td>
              <td >
              <Button 
                type="button"
                  variant="outline-primary"  style={{ marginRight: '5px' }}onClick={() => handleEdit(party.partyId)}>
                     <FontAwesomeIcon icon={faEdit}  />
             
                </Button>
              
                <Button 
                type="button"
                  variant="outline-danger" onClick={() => handleDelete(party.partyId)} >
                     <FontAwesomeIcon icon={faTrash}  />
                
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      <div className="d-flex justify-content-center">
      <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + startPage === currentPage}
              onClick={() => handlePageChange(index + startPage)}
            >
              {index + startPage}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>


      {selectedParty && (
        <UpdatePartyForm
          party={selectedParty}
          isOpen={editModalOpen}
          toggleModal={toggleEditModal}
          fetchParties={fetchParties}
        />
      )}

<Modal
        show={loaModalOpen}
        onHide={() => {
          setLoaModalOpen(false);
          setShowFirstBody(true);
          handlerClear(); // Call handlerClear when the modal is hidden
        }}
        // style={{
        //   maxWidth: "1200px", // Set maximum width
        //   margin: "auto", // Center horizontally
        //   display: "flex",
        //   alignItems: "center", // Center vertically
        //   justifyContent: "center", // Center horizontally
        // }}
        size="lg" // Set the modal size to "lg" (large)
      >
        <Modal.Body
          style={{
            backgroundImage:
              "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
            backgroundSize: "cover",
          }}
        >
          {showFirstBody ? ( // Use a state variable to determine which body to display
            <>
              <Modal.Header
                style={{
                  height: "10%",
                  backgroundColor: "#80cbc4",
                  color: "black",
                  fontFamily: "Your-Heading-Font",
                  textAlign: "center",
                  background: "#26a69a",
                  boxShadow: "0px 5px 10px rgba(0, 77, 64, 0.3)",
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                  borderRadius: "0",
                  backgroundColor: "#85144b",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  backgroundImage:
                    'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                closeButton
              >
                <Modal.Title className="w-100 h-80 text-left">
                  Renew LOA by DGDC Admin
                </Modal.Title>
              </Modal.Header>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <FormLabel
                      className="forlabel "
                      style={{ fontWeight: "bolder" }}
                    >
                      Letter Number<span style={{ color: "red" }}>*</span>
                    </FormLabel>
                    <FormControl
                      type="text"
                      value={letterNumber1}
                      onChange={(e) => setLetterNumber1(e.target.value)}
                      className={letterNumber1Error ? "error-input" : ""}
                    />
                    {letterNumber1Error && (
                      <div style={{ color: "red" }} className="error-message">
                        {letterNumber1Error}
                      </div>
                    )}
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <FormLabel className="forlabel ">
                      Letter Date<span style={{ color: "red" }}>*</span>
                    </FormLabel>
                    <div>
                    <ReactDatePicker
                      selected={letterdate}
                      onChange={(date) => setletterdate(date)}
                      dateFormat="dd/MM/yyyy"
                      className={`form-control InputField ${
                        letterdateError ? "error-input" : ""
                      }`}
                      customInput={<input />}
                    />
                    </div>
                    {letterdateError && (
                      <div style={{ color: "red" }} className="error-message">
                        {letterdateError}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              {selectedPartyForLoa && (
                <div className="forlabel">
                  Current LOA Expiry Date:{" "}
                  {formatDateTime1(selectedPartyForLoa.loaExpiryDate)}
                </div>
              )}
              <br />
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <FormLabel className="forlabel ">
                      New LOA Expiry Date
                      <span style={{ color: "red" }}>*</span>
                    </FormLabel>
                    <ReactDatePicker
                      selected={newLocDate}
                      onChange={(date) => setnewLocDate(date)}
                      dateFormat="dd/MM/yyyy"
                      className={`form-control InputField ${
                        newLocDateError ? "error-input" : ""
                      }`}
                      customInput={<input />}
                    />
                    {newLocDateError && (
                      <div style={{ color: "red" }} className="error-message">
                        {newLocDateError}
                      </div>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <br />

              <Row>
                <Col md={6}>
                  <FormLabel className="forlabel ">
                    Upload Letter Scans (gif, png, jpeg, jpg, pdf are allowed)
                  </FormLabel>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Input
                      type="file"
                      name="filepath"
                      id="file"
                      className="form-control "
                      onChange={handleFileChange}
                      accept=".jpg, .jpeg, .png, .pdf"
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Modal.Footer>
                <Button
                  type="button"
                  variant="outline-primary"
                  style={{ marginRight: "5px" }}
                  onClick={() => {
                    setShowFirstBody(false);
                    fetchLoaHistory();
                  }}
                >
                  <FontAwesomeIcon icon={faHistory} />
                  &nbsp;View Previous Versions
                </Button>

                <Button
                  type="submit"
                  variant="outline-danger"
                  onClick={() => {
                    handleSubmit(); // Call it the second time
                    updatePartyForm();
                  }}
                >
                  <FontAwesomeIcon icon={faSave} />
                  &nbsp;Submit
                </Button>
              </Modal.Footer>
              {/* Rest of your modal content */}
            </>
          ) : (
            <>
              <Modal.Header
                style={{
                  backgroundColor: "#80cbc4",
                  color: "black",
                  fontFamily: "Your-Heading-Font",
                  textAlign: "center",
                  background: "#26a69a",
                  boxShadow: "0px 5px 10px rgba(0, 77, 64, 0.3)",
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                  borderRadius: "0",
                  backgroundColor: "#85144b",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  backgroundImage:
                    'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                closeButton
              >
                <Modal.Title>Change details history</Modal.Title>
              </Modal.Header>
              <div
                className="table-responsive"
                style={{ height: "100%", overflow: "auto" }}
              >
               <Table
                  className="table table-striped table-hover"
                  style={{ width: "100%", height: "100%" }}
                >
                  <thead>
                    <tr>
                      <th style={{ background: "#BADDDA" }}>#</th>
                      <th style={{ background: "#BADDDA" }}>Letter No</th>
                      <th style={{ background: "#BADDDA", width: "200px" }}>
                        Letter Date
                      </th>
                      <th style={{ background: "#BADDDA" }}>LOA expiry date</th>
                      <th style={{ background: "#BADDDA" }}>
                        Upload letter scan
                      </th>

                      <th style={{ background: "#BADDDA" }}>Added date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loaHistory.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No LOA history available
                        </td>
                      </tr>
                    ) : (
                      loaHistory.map((item, index) => (
                        <tr key={item.loaSerId}>
                          <td>{index + 1}</td>
                          <td>{item.loaNumber}</td>
                          <td>{formatDateTime1(item.loaIssueDate)}</td>
                          <td>{formatDateTime1(item.newLoaExpiryDate)}</td>
                          <td>
                            {item.imagePath ? (
                              <button
                                className="btn btn-outline-primary"
                                onClick={() =>
                                  getByMAWBnoAndHAwbIMAGE(item.loaSerId)
                                }
                              >
                                {item.imagePath}
                              </button>
                            ) : (
                              <span style={{ alignItems: "center" }}>
                                File Not Uploaded
                              </span>
                            )}
                          </td>
                          <td>{formatDateTime1(item.createdDate)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
                {selectedDocumentData && (
                  <div>
                    <p>Fetched Document Data:</p>
                    <pre>{selectedDocumentData}</pre>
                  </div>
                )}
                <Modal
                  isOpen={documentMModel}
                  toggle={closeDocumentModel}
                  size="lg"
                >
                  <Card>
                    <CardBody>
                      <button
                        className="close-button"
                        onClick={closeDocumentModel}
                      >
                        Close
                      </button>
                      {selectedDocument && (
                        <img
                          src={selectedDocument} // Use the selected document path here
                          alt="Document"
                          className="img-fluid"
                        />
                      )}
                    </CardBody>
                  </Card>
                </Modal>
              </div>
              <Modal.Footer>
                <Button
                  type="button"
                  variant="outline-primary"
                  style={{ marginRight: "5px" }}
                  onClick={() => {
                    setShowFirstBody(true);
                  }}
                >
                  <FontAwesomeIcon icon={faBackward} />
                  {/* Back To Renewal From */}
                  &nbsp;Back
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal.Body>
      </Modal>

      {showModal && (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Card>
            <CardBody>
              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <img
                src={ImagensdlStatusDocs}
                alt="Image"
                onError={(e) => console.error("Error loading image:", e)}
                className="img-fluid"
              />
            </CardBody>
          </Card>
        </Modal>
      )}
    </>
  );
};

export default PartyListTable;