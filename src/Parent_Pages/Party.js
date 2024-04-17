import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ipaddress from "../Components/IpAddress";
import DatePicker from "react-datepicker";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React, { useEffect, useState, useContext } from "react";
import "../Components/Style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackward,

  faFileExcel,

  faHistory,
  faSearch,
  faSyncAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  FormControl,
  FormLabel,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Pagination,
} from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { Button, Card, CardBody, Row, Col, Form, FormGroup, Label, Input, } from "reactstrap";
import Table from 'react-bootstrap/Table';
import { faBox, faBoxesPacking, faEdit, faFileText, faHandHoldingHand, faPeopleArrows, faPeopleGroup, faPeopleRoof, faPlus, faSave, faTrash, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FaLink } from "react-icons/fa";
export default function Party() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);






  const ipAddressBeforeColon = ipaddress.split(':')[0];





  //add party
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpenforAddParty, setIsModalOpenforAddParty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalstatus, setModalstatus] = useState('');
  const openAddModal = () => {
    setIsModalOpenforAddParty(true);
    setModalstatus('add');
  }


  const openEditModal = (data) => {
    setIsModalOpenforAddParty(true);
    setModalstatus('edit');
    setFormData(data);
  }


  const closeAddModal = () => {
    setModalstatus('');
    setIsModalOpenforAddParty(false);
    setFormData('');
    setFormErrors({
      partyName: "",
      address1: "",
      email: "",
      mobileNo: "",
      iecNo: "",
      entityId: "",
      unitAdminName: "",
      unitType: "",

      partyCode: "",
      creditLimit: "",
      loaNumber: "",
      loaIssueDate: "",
    })
    document.getElementById('partyName').classList.remove('error-border');
    document.getElementById('address1').classList.remove('error-border');
    document.getElementById('email').classList.remove('error-border');
    document.getElementById('mobileNo').classList.remove('error-border');
    document.getElementById('iecNo').classList.remove('error-border');
    document.getElementById('entityId').classList.remove('error-border');
    document.getElementById('unitAdminName').classList.remove('error-border');
    document.getElementById('unitType').classList.remove('error-border');
    document.getElementById('partyCode').classList.remove('error-border');
    document.getElementById('creditLimit').classList.remove('error-border');
    document.getElementById('loaNumber').classList.remove('error-border');
    document.getElementById('loaIssueDate').classList.remove('error-border');
  }

  // const [formData,setPartyData] = useState([]);


  const [formData, setFormData] = useState({
    companyId: companyid,
    branchId: branchId,
    partyId: '',
    partyName: '',
    address1: '',
    address2: '',
    address3: '',
    city: '',
    pin: '',
    state: '',
    country: '',
    unitAdminName: '',
    unitType: '',
    email: '',
    phoneNo: '',
    mobileNo: '',
    partyCode: '',
    erpCode: '',
    creditLimit: '',
    iecNo: '',
    entityId: '',
    panNo: '',
    gstNo: '',
    loaNumber: '',
    loaIssueDate: '',
    loaExpiryDate: '',
    createdBy: '',
    createdDate: '',
    editedBy: '',
    editedDate: '',
    approvedBy: '',
    approvedDate: '',
    status: '',
    invoiceType: "Periodic",
    partyStatus: "A"
  });

  const handleAddPartyData = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleloaexpirydate = (date) => {
    setFormData({
      ...formData,
      loaExpiryDate: date,
    })
  }

  const handleloaissuedate = (date) => {
    setFormData({
      ...formData,
      loaIssueDate: date,
    })
  }

  const [formErrors, setFormErrors] = useState({
    partyName: "",
    address1: "",
    email: "",
    mobileNo: "",
    iecNo: "",
    entityId: "",
    unitAdminName: "",
    unitType: "",

    partyCode: "",
    creditLimit: "",
    loaNumber: "",
    loaIssueDate: "",
  });


  const handleSubmit = async (event) => {
    event.preventDefault();
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


    const errors = {};

    if (!formData.partyName) {
      errors.partyName = "Party name is required.";
    }

    if (!formData.address1) {
      errors.address1 = "Address1 is required.";
    }
    if (!formData.email) {
      errors.email = "Email is required.";
    }

    if (!formData.mobileNo) {
      errors.mobileNo = "Mobile no is required.";
    }

    if (!formData.iecNo) {
      errors.iecNo = "IEC no is required.";
    }
    if (!formData.entityId) {
      errors.entityId = "Entity Id is required.";
    }
    if (!formData.unitAdminName) {
      errors.unitAdminName = "Unit Admin Name is required.";
    }
    if (!formData.unitType) {
      errors.unitType = "Unit Type is required.";
    }
    if (!formData.partyCode) {
      errors.partyCode = "Party Code is required.";
    }
    if (!formData.creditLimit) {
      errors.creditLimit = "Credit Limit is required.";
    }
    if (!formData.loaNumber) {
      errors.loaNumber = "Loa Number is required.";
    }
    if (!formData.loaIssueDate) {
      errors.loaIssueDate = "Loa Issue Date is required.";
    }

    if (!formData.partyName) {
      document.getElementById('partyName').classList.add('error-border');
    }

    if (!formData.address1) {
      document.getElementById('address1').classList.add('error-border');
    }
    if (!formData.email) {
      document.getElementById('email').classList.add('error-border');
    }

    if (!formData.mobileNo) {
      document.getElementById('mobileNo').classList.add('error-border');
    }

    if (!formData.iecNo) {
      document.getElementById('iecNo').classList.add('error-border');
    }
    if (!formData.entityId) {
      document.getElementById('entityId').classList.add('error-border');
    }
    if (!formData.unitAdminName) {
      document.getElementById('unitAdminName').classList.add('error-border');
    }
    if (!formData.unitType) {
      document.getElementById('unitType').classList.add('error-border');
    }
    if (!formData.partyCode) {
      document.getElementById('partyCode').classList.add('error-border');
    }
    if (!formData.creditLimit) {
      document.getElementById('creditLimit').classList.add('error-border');
    }
    if (!formData.loaNumber) {
      document.getElementById('loaNumber').classList.add('error-border');
    }
    if (!formData.loaIssueDate) {
      document.getElementById('loaIssueDate').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    //const isMobileNoPresent = parties.some((item) => item.mobileNo === formData.mobileNo);
    // const isEmailPresent = parties.some((item) => item.email === formData.email);
    const isEntityPresent = parties.some((item) => item.entityId === formData.entityId);

    // if (isMobileNoPresent) {
    //   toast.error("Mobile no. already exist", {
    //     autoClose: 700
    //   })
    //   return;
    // }

    // if (isEmailPresent) {
    //   toast.error("Email id already exist", {
    //     autoClose: 700
    //   })
    //   return;
    // }

    if (isEntityPresent) {
      toast.error("Entity id already exist", {
        autoClose: 700
      })
      return;
    }

    try {


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
      console.log("formData.invoiceType ", formData.invoiceType);

      if (formData.invoiceType === null || formData.invoiceType === "" || formData.invoiceType === undefined) {
        formData.invoiceType = "Periodic";
      }
      if (formData.partyStatus === null || formData.partyStatus === "" || formData.partyStatus === undefined) {
        formData.partyStatus = "A";
      }
      const response = await axios.post(`http://${ipaddress}parties/add/${userId}/${companyid}/${branchId}/${ipAddressBeforeColon}/${encodedCompanyId}/${encodedBranchId}/${encodedPartyId}`, formData);
      console.log('Response:', response.data);

      // const response = await axios.post(`http://${ipaddress}parties/add/${userId}`, formData);
      // console.log('Response:', response.data);

      // Assuming the response structure includes a 'message' field indicating success
      if (response.data == response.data) {
        toast.success('Party Added Successfully !!!', {
          position: 'top-center',
          autoClose: 700
        });
        fetchParties();
        closeAddModal();
      } else {
        toast.error('Failed to add party. Please try again.', {
          position: 'top-center',
        });

      }
    } catch (error) {
      console.error('Error Adding party:', error);
      toast.error('An error occurred. Please try again.', {
        position: 'top-center',
      });

    } finally {
      // Reset loading state after the process is completed
      setLoading(false);
    }

  };


  const commonhandlesubmit = () => {
    if (modalstatus === 'add') {
      handleSubmit();
    }
    else if (modalstatus === 'edit') {
      editpartydata();
    }
  }

  //partylisttable
  const [parties, setParties] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);
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
      const response = await axios.get(`http://${ipaddress}parties/getAlldata/${companyid}/${branchId}`);
      setParties(response.data);
    } catch (error) {
      console.error('Error fetching parties:', error);
      // Handle error and display an error message if necessary.
    }
  };

  useEffect(() => {
    fetchParties();
  }, [companyid, branchId])


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
  const handlePwdReset = (partyId) => {
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
    console.log(party.companyId, party.branchId, party.partyId);
    const DecodedCompanyId1 = customDecode(encodedCompanyId);
    const DecodedBranchId1 = customDecode(encodedBranchId);
    const DecodedPartyId1 = customDecode(encodedPartyId);

    console.log(encodedCompanyId);
    console.log(encodedBranchId);
    console.log(encodedPartyId);


    console.log(DecodedCompanyId1);
    console.log(DecodedBranchId1);
    console.log(DecodedPartyId1);


// console.log(`http://${ipaddress}parties/resetpassword/${ipAddressBeforeColon}/${encodedCompanyId}/${encodedBranchId}/${encodedPartyId}`);

    try {
      axios.post(`http://${ipaddress}parties/resetpassword/${ipAddressBeforeColon}/${encodedCompanyId}/${encodedBranchId}/${encodedPartyId}`, party);
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


  const editpartydata = (event) => {
    event.preventDefault();
    const errors = {};

    if (!formData.partyName) {
      errors.partyName = "Party name is required.";
    }

    if (!formData.address1) {
      errors.address1 = "Address1 is required.";
    }
    if (!formData.email) {
      errors.email = "Email is required.";
    }

    if (!formData.mobileNo) {
      errors.mobileNo = "Mobile no is required.";
    }

    if (!formData.iecNo) {
      errors.iecNo = "IEC no is required.";
    }
    if (!formData.entityId) {
      errors.entityId = "Entity Id is required.";
    }
    if (!formData.unitAdminName) {
      errors.unitAdminName = "Unit Admin Name is required.";
    }
    if (!formData.unitType) {
      errors.unitType = "Unit Type is required.";
    }
    if (!formData.partyCode) {
      errors.partyCode = "Party Code is required.";
    }
    if (!formData.creditLimit) {
      errors.creditLimit = "Credit Limit is required.";
    }
    if (!formData.loaNumber) {
      errors.loaNumber = "Loa Number is required.";
    }
    if (!formData.loaIssueDate) {
      errors.loaIssueDate = "Loa Issue Date is required.";
    }

    if (!formData.partyName) {
      document.getElementById('partyName').classList.add('error-border');
    }

    if (!formData.address1) {
      document.getElementById('address1').classList.add('error-border');
    }
    if (!formData.email) {
      document.getElementById('email').classList.add('error-border');
    }

    if (!formData.mobileNo) {
      document.getElementById('mobileNo').classList.add('error-border');
    }

    if (!formData.iecNo) {
      document.getElementById('iecNo').classList.add('error-border');
    }
    if (!formData.entityId) {
      document.getElementById('entityId').classList.add('error-border');
    }
    if (!formData.unitAdminName) {
      document.getElementById('unitAdminName').classList.add('error-border');
    }
    if (!formData.unitType) {
      document.getElementById('unitType').classList.add('error-border');
    }
    if (!formData.partyCode) {
      document.getElementById('partyCode').classList.add('error-border');
    }
    if (!formData.creditLimit) {
      document.getElementById('creditLimit').classList.add('error-border');
    }
    if (!formData.loaNumber) {
      document.getElementById('loaNumber').classList.add('error-border');
    }
    if (!formData.loaIssueDate) {
      document.getElementById('loaIssueDate').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // const isMobileNoPresent = parties.some((item) => item.mobileNo === formData.mobileNo && formData.partyId !== item.partyId);
    // const isEmailPresent = parties.some((item) => item.email === formData.email && formData.partyId !== item.partyId);
    const isEntityPresent = parties.some((item) => item.entityId === formData.entityId && formData.partyId !== item.partyId);

    // if (isMobileNoPresent) {
    //   toast.error("Mobile no. already exist", {
    //     autoClose: 700
    //   })
    //   return;
    // }

    // if (isEmailPresent) {
    //   toast.error("Email id already exist", {
    //     autoClose: 700
    //   })
    //   return;
    // }

    if (isEntityPresent) {
      toast.error("Entity id already exist", {
        autoClose: 700
      })
      return;
    }
    console.log('formData formData ', formData);
    console.log('formData formDatainvoiceType ', formData.invoiceType);
    if (formData.invoiceType === null) {
      formData.invoiceType = "Periodic";
    }
    if (formData.partyStatus === null) {
      formData.partyStatus = "A";
    }
    axios.post(`http://${ipaddress}parties/editdata`, formData)
      .then((response) => {
        toast.success("Party edited successfully..", {
          autoClose: 700
        })
        fetchParties();
        closeAddModal();
      }
      )
      .catch((error) => {
        if (error) {
          toast.error("Something went wrong..", {
            autoClose: 700
          })
        }
      }

      )
  }

  const toggleEditModal = () => {
    setEditModalOpen((prevState) => !prevState);
  };
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

  const handleSubmit1 = async () => {
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
      if (filepath === "") {
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
  //partylisttable



  const handleButton2Click = async () => {
    try {
      // Fetch all parties data from the server
      const response = await axios.get(`http://${ipaddress}parties/getAlldata/${companyid}/${branchId}`);
      const partiesData = response.data;

      // Create a new workbookzss
      const workbook = XLSX.utils.book_new();

      // Add a worksheet
      const worksheet = XLSX.utils.json_to_sheet(partiesData);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Parties");

      // Generate the XLS file
      const xlsFile = XLSX.write(workbook, { type: "binary", bookType: "xls" });

      // Convert XLS file to a Blob
      const blob = new Blob([s2ab(xlsFile)], { type: "application/vnd.ms-excel" });

      // Save the file with a specific filename
      saveAs(blob, "parties.xls");
    } catch (error) {
      console.error("Error fetching parties data:", error);
      // Handle error and display an error message if necessary.
      alert("Failed to fetch parties data. Please try again.");
    }
  };

  const getExcel = (parties) => {
    const filename = `Parties.xlsx`; // Note: Changed file extension to xlsx
    axios.post(`http://${ipaddress}parties/allPartyExcel`, parties,{ responseType: 'blob' }) // Added responseType: 'blob'
      .then(async (response) => {
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
  
        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(blob);
  
        // Create a link element to trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
  
        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch((error) => {
        toast.error("Something went wrong", {
          autoClose: 700
        });
      });
  };

  // Helper function to convert s2ab
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
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
    const filteredResults = parties.filter((data) => {
      const searchByMatches = searchFilters.searchBy === '' || data.partyName.toLowerCase().includes((searchFilters.searchBy.toLowerCase()).trim()) || data.partyId.includes((searchFilters.searchBy).trim()) || data.entityId.includes((searchFilters.searchBy).trim());


      return searchByMatches;
    });

    setFilteredData(filteredResults);
  }

  useEffect(() => {
    handleSearch();

  }, [parties])

  const handleReset = () => {
    setSearchFilters(
      {
        searchBy: ""
      }
    )
    fetchParties();
    handleSearch();
  }

  return (
    <div className='Container'>
      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }}>
        <FontAwesomeIcon
          icon={faPeopleRoof}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        />
        Manage Party User
      </h5>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <Button
                color="success"
                outline
                style={{ float: 'right' }}
                onClick={openAddModal}
              >
                <FontAwesomeIcon icon={faPeopleArrows} style={{ marginRight: '5px' }} />
                Add Party
              </Button>
            </Col>

          </Row>


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
                  placeholder="Search by Party name / Party ID / Entity ID"

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
                <Button
                  color="success"
                  outline
                  onClick={()=>getExcel(parties)}
                  style={{ marginRight: '5px' }}
                >
                  <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '5px' }} />
                  XLS
                </Button>
              </div>
            </Col>
          </Row>

          <hr />
          {/* Add party */}

          <Modal size="lg" show={isModalOpenforAddParty} onHide={closeAddModal} >
            <Modal.Header closeButton style={{ backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a', boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)', border: '1px solid rgba(0, 0, 0, 0.3)', borderRadius: '0', backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>

              {modalstatus === 'add' ? (
                <Modal.Title>
                  <FontAwesomeIcon
                    icon={faPeopleGroup}
                    style={{
                      marginRight: '8px',
                      color: 'black',
                    }}
                  />
                  Add Party
                </Modal.Title>
              ) : (
                <Modal.Title>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{
                      marginRight: '8px',
                      color: 'black',
                    }}
                  />
                  Edit Party
                </Modal.Title>
              )}

            </Modal.Header>
            <Modal.Body style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
              <div>
                <Row>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="partyName">Name <span style={{ color: 'red' }}>*</span></Label>
                      <Input
                        type="text"
                        name="partyName"
                        id="partyName"
                        className="inputField"
                        onChange={handleAddPartyData}
                        value={formData.partyName}
                        maxLength={60}

                      />
                    </FormGroup>
                    <div style={{ color: 'red' }} className="error-message">{formErrors.partyName}</div>
                  </Col>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="email">Email Id <span style={{ color: 'red' }}>*</span></Label>
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        maxLength={60}
                        className="inputField"
                        onChange={handleAddPartyData}
                        value={formData.email}


                      />
                      <div style={{ color: 'red' }} className="error-message">{formErrors.email}</div>
                    </FormGroup>
                  </Col>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="mobileNo">Mobile <span style={{ color: 'red' }}>*</span></Label>
                      <Input
                        type="number"
                        name="mobileNo"
                        id="mobileNo"
                        className="inputField"
                        onChange={handleAddPartyData}
                        value={formData.mobileNo}
                        maxLength={15}

                      />
                      <div style={{ color: 'red' }} className="error-message">{formErrors.mobileNo}</div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="address1">Address 1 <span style={{ color: 'red' }}>*</span></Label>
                      <Input
                        type="text"
                        name="address1"
                        id="address1"
                        maxLength={35}
                        className="inputField"
                        onChange={handleAddPartyData}
                        value={formData.address1}


                      />
                      <div style={{ color: 'red' }} className="error-message">{formErrors.address1}</div>
                    </FormGroup>
                  </Col>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="address2">Address 2</Label>
                      <Input
                        type="text"
                        name="address2"
                        id="address2"
                        onChange={handleAddPartyData}
                        value={formData.address2}
                        className="inputField"
                        maxLength={35}


                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="city">City</Label>
                      <Input
                        type="text"
                        name="city"
                        id="city"
                        maxLength={15}
                        className="inputField"
                        onChange={handleAddPartyData}
                        value={formData.city}

                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="pin">Pin</Label>
                      <Input
                        type="text"
                        name="pin"
                        id="pin"
                        maxLength={15}
                        className="inputField"
                        onChange={handleAddPartyData}
                        value={formData.pin}


                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="unitAdminName">Unit Admin Name <span style={{ color: 'red' }}>*</span></Label>
                      <Input
                        type="text"
                        name="unitAdminName"
                        id="unitAdminName"
                        maxLength={60}
                        className="inputField"
                        onChange={handleAddPartyData}
                        value={formData.unitAdminName}


                      />
                      <div style={{ color: 'red' }} className="error-message">{formErrors.unitAdminName}</div>
                    </FormGroup>
                  </Col>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Unit Type <span style={{ color: 'red' }}>*</span></Label>
                      <select name='unitType' id="unitType" className="form-control form-select" value={formData.unitType} onChange={handleAddPartyData}>
                        <option value=''>Select Unit Type</option>
                        <option value='SEEPZ Unit'>SEEPZ Unit</option>
                        <option value='DGDC Unit'>DGDC Unit</option>
                        <option value='Non-SEEPZ Unit'>Non-SEEPZ Unit</option>
                        {/* Add more options as needed */}
                      </select>
                      <div style={{ color: 'red' }} className="error-message">{formErrors.unitType}</div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="branchId">IEC Number <span style={{ color: 'red' }}>*</span></Label>
                      <Input
                        type="text"
                        name="iecNo"
                        id="iecNo"
                        maxLength={20}
                        className="inputField"
                        onChange={handleAddPartyData}
                        value={formData.iecNo}

                      />
                      <div style={{ color: 'red' }} className="error-message">{formErrors.iecNo}</div>
                    </FormGroup>
                  </Col>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Entity Id <span style={{ color: 'red' }}>*</span></Label>
                      <Input
                        type="text"
                        name="entityId"
                        id="entityId"
                        maxLength={20}
                        className="inputField"
                        onChange={handleAddPartyData}
                        value={formData.entityId}

                      />
                      <div style={{ color: 'red' }} className="error-message">{formErrors.entityId}</div>
                    </FormGroup>


                  </Col>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Party Code <span style={{ color: 'red' }}>*</span></Label>
                      <Input
                        type="text"
                        name="partyCode"
                        id="partyCode"
                        onChange={handleAddPartyData}
                        className="inputField"
                        value={formData.partyCode}
                        maxLength={15}

                      />
                      <div style={{ color: 'red' }} className="error-message">{formErrors.partycode}</div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Credit Limit <span style={{ color: 'red' }}>*</span></Label>
                      <Input
                        type="number"
                        name="creditLimit"
                        id="creditLimit"
                        maxLength={20}
                        className="inputField"
                        value={formData.creditLimit}
                        onChange={handleAddPartyData}

                      />
                      <div style={{ color: 'red' }} className="error-message">{formErrors.creditlimit}</div>
                    </FormGroup>
                  </Col>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="branchId">ERP Code</Label>

                      <Input
                        type="text"
                        name="erpCode"
                        id="erpCode"
                        value={formData.erpCode}
                        className="inputField"
                        onChange={handleAddPartyData}
                        maxLength={15}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="branchId">GST No</Label>
                      <Input
                        type="text"
                        name="gstNo"
                        id="gstNo"

                        className="inputField"
                        value={formData.gstNo}
                        onChange={handleAddPartyData}
                        maxLength={30}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="branchId">LOA Number <span style={{ color: 'red' }}>*</span></Label>
                      <Input
                        type="text"
                        name="loaNumber"
                        id="loaNumber"
                        maxLength={80}
                        className="inputField"
                        value={formData.loaNumber}
                        onChange={handleAddPartyData}

                      />
                      <div style={{ color: 'red' }} className="error-message">{formErrors.loaNumber}</div>
                    </FormGroup>
                  </Col>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="branchId">LOA Expiry Date</Label>
                      <DatePicker
                        selected={formData.loaExpiryDate}
                        value={formData.loaExpiryDate}
                        name="loaExpiryDate"
                        onChange={handleloaexpirydate}
                        id="loaExpiryDate"
                        dateFormat="dd/MM/yyyy"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: '100%' }} />}
                        wrapperClassName="custom-react-datepicker-wrapper"
                      />

                    </FormGroup>
                  </Col>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="branchId">LOA Issue Date <span style={{ color: 'red' }}>*</span></Label>
                      <DatePicker
                        selected={formData.loaIssueDate}
                        onChange={handleloaissuedate}
                        value={formData.loaIssueDate}
                        name="loaIssueDate"
                        id="loaIssueDate"
                        dateFormat="dd/MM/yyyy"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: '100%' }} />}
                        wrapperClassName="custom-react-datepicker-wrapper"
                      />

                      <div style={{ color: 'red' }} className="error-message">{formErrors.loaIssueDate}</div>

                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="branchId">PAN</Label>
                      <Input
                        type="text"
                        name="panNo"
                        id="panNo"
                        value={formData.panNo}
                        className="inputField"
                        maxLength={25}
                        onChange={handleAddPartyData}

                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Invoice Type</Label>
                      <select
                        id="invoiceType"
                        className="form-control form-select"
                        onChange={handleAddPartyData}
                        required
                        name="invoiceType"
                        value={formData.invoiceType}
                      >
                        <option value="Periodic">Periodic</option>
                        <option value="Instant">Instant</option>
                      </select>
                    </FormGroup>
                  </Col>
                  <Col md={4} >
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Status</Label>
                      <select
                        id="partyStatus"
                        className="form-control form-select"
                        onChange={handleAddPartyData}
                        required
                        name="partyStatus"
                        value={formData.partyStatus}
                      >
                        <option value="A">Active</option>
                        <option value="I">Inactive</option>
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="text-center">
                  {modalstatus === 'add' ? (
                    <Col >
                      <Button color="success"
                        outline onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                        Submit
                      </Button>
                    </Col>
                  )
                    :
                    (
                      <Col >
                        <Button color="success"
                          outline onClick={editpartydata}>
                          <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                          Submit
                        </Button>
                      </Col>
                    )

                  }

                </Row>

              </div>
            </Modal.Body>
          </Modal>

          <div className="table-responsive">
            <Table className="table table-striped table-hover">
              <thead>
                <tr>

                  <th style={{ background: '#BADDDA' }}>Party ID</th>
                  <th style={{ background: '#BADDDA', width: '200px' }}>Party Name</th>
                  <th style={{ background: '#BADDDA' }}>Email</th>
                  <th style={{ background: '#BADDDA' }}>Mobile No</th>

                  <th style={{ background: '#BADDDA' }}>Entity ID</th>
                  <th style={{ background: '#BADDDA' }}>Credit Limit</th>
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">Re-Send</th>
                  <th style={{ background: "#BADDDA" }}>Renew <br /> LOA</th>
                  <th style={{ background: '#BADDDA' }}>Action</th>
                  {/* <th style={{ background: '#BADDDA' }}>Delete</th> */}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((party) => (
                  <tr key={party.partyId}>
                    <td>{party.partyId}</td>
                    <td>{party.partyName}</td>
                    <td>{party.email}</td>
                    <td>{party.mobileNo}</td>

                    <td>{party.entityId}</td>
                    <td>{party.creditLimit}</td>
                    {/* Add other table data for displaying party data */}
                    <td className="table-column"> <FaLink size={22} fill="orange" onClick={() => handlePwdReset(party.partyId)} style={{ marginRight: '10px' }} /></td>
                    <td>
                      <Button
                        color="success"
                        outline
                        // style={{ marginRight: "5px" }}
                        onClick={() => openLoaModal(party.partyId)} // Call openLoaModal with the partyId
                      >
                        <FontAwesomeIcon icon={faFileText} />
                      </Button>
                    </td>
                    <td >
                      <Button
                        color="primary"
                        outline style={{ marginRight: '5px' }} onClick={() => openEditModal(party)}>
                        <FontAwesomeIcon icon={faEdit} />

                      </Button>

                      <Button color="danger"
                        outline
                        onClick={() => handleDelete(party.partyId)} >
                        <FontAwesomeIcon icon={faTrash} />

                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-center">
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
                            className={`form-control InputField ${letterdateError ? "error-input" : ""
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
                          className={`form-control InputField ${newLocDateError ? "error-input" : ""
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
                        handleSubmit1(); // Call it the second time
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

        </CardBody>
      </Card>



    </div>
  );
}