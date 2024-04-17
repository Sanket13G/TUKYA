// import AuthContext from "../Components/AuthProvider";
// import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState, useContext, useCallback, useRef } from "react";
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Button from 'react-bootstrap/Button';
// import "../Components/Style.css";
// import ipaddress from "../Components/IpAddress";
// import Dropdown from 'react-bootstrap/Dropdown';
// import { FaClosedCaptioning, FaTruck, FaHandPaper, FaPersonBooth, FaTruckLoading, FaArrowRight, FaArrowLeft, FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
// import ReactLoading from 'react-loading';
// import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import DatePicker from "react-datepicker";
// import { Line, PDFDownloadLink } from '@react-pdf/renderer';
// import DGDCimage from '../Images/DGDC.png'
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import contachimage from "../services/contacts.png"
// import InviceService from "../services/InviceService"
// import {
//   Card,
//   CardBody,
//   Container,
//   Row,
//   Col,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Table,
// } from "reactstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRight, faArrowTurnRight, faAtom, faFileClipboard, faGavel, faHandHolding, faHandHoldingHand, faHistory, faListAlt, faListCheck, faPencilSquare, faPlaneDeparture, faPlus, faSearch, faUserCircle, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faXmark, faPrint, faFileLines, faCog } from '@fortawesome/free-solid-svg-icons';
// import axios from "axios";
// import { toast } from "react-toastify";
// import "../Components/Style.css";
// import { Pagination } from "react-bootstrap";
// import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer'; import { BlobProvider } from '@react-pdf/renderer';
// import { render } from "react-dom";

// const styles = StyleSheet.create({
//   page: {
//     paddingTop: 30,
//     paddingBottom: 60,
//     paddingHorizontal: 30,
//   },
//   header: {
//     marginBottom: 20,
//   },
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity and color as needed
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 9999, // Ensure the overlay is above other elements
//   },
//   heading: {
//     fontSize: 10,
//     marginBottom: 3,
//     fontWeight: "bold",
//     alignItems: "center",
//   },
//   mainheading: {
//     fontSize: 20,
//     marginTop: 5,
//     marginBottom: 3,
//     fontWeight: "bold",
//     alignItems: "center",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: 10,
//   },

//   leftColumn: {
//     width: "100%",
//     paddingTop: 18,
//   },
//   headingwithbox: {
//     fontSize: 10,
//     marginBottom: 0,
//     fontWeight: "bold",
//     alignItems: "center",

//     // Add padding for space between text and border
//   },
//   viewheadingwithbox: {
//     border: "1px solid black",
//     padding: 5,
//   },
//   paragraph: {
//     fontSize: 12,
//     marginBottom: 5,
//   },
//   headingwithborder: {
//     fontSize: 10,
//     marginBottom: 0,
//     fontWeight: "bold",
//     alignItems: "center",
//     borderBottom: "1px solid black",
//     // Add padding for space between text and border
//   },
//   image: {
//     width: 400,
//     height: 80,
//     marginBottom: 0,
//     marginLeft: 55,
//   },
//   dateSize: {
//     fontSize: 8,
//   },
//   normaltext: {
//     fontSize: 10,
//     marginTop: 25,
//     fontWeight: "bold",
//   },
//   normaltext2: {
//     fontSize: 12,
//     marginTop: 25,
//     fontWeight: "bold",
//   },
//   normaltext3: {
//     fontSize: 12,
//     marginTop: 3,
//     marginBottom: 20,
//     fontWeight: "bold",
//   },
//   line: {
//     width: "100%", // Adjust the width of the line
//     marginTop: 10, // Adjust the space above the line
//     marginBottom: 10, // Adjust the space below the line
//     borderTop: "1pt solid black", // Style the line
//   },

//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#000",
//     fontSize: 10,
//     textAlign: 'center',
//     borderRightWidth: 1,
//     borderLeftWidth: 1,
//     borderLeftColor: "#000",
//     borderRightColor: "#000",
//   },
//   tableCell: {
//     border: "1px solid #000",
//     padding: 5,
//   },
//   tableCellHeader: {
//     fontWeight: "bold",
//   },
// });
// export default function Subcontract_LGD_Import() {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useContext(AuthContext);
//   const [reqid, setRequestId] = useState('');
//   const [JarListDtl, setJarListDtl] = useState([]);
//   const [getOneParty, setOneParty] = useState([]);
//   const [partys, setPartys] = useState([]);
//   const [isDivVisible, setIsDivVisible] = useState(false);
//   const [lowerInputReqId, setLowerInputReqId] = useState('');
//   const [getsubimportdata, setGetsubimportdata] = useState([]);
//   const [getdatabyid, setGetdatabyid] = useState([]);
//   const [impsubhistory, setImpHistory] = useState([]);
//   const [viewall, setViewAll] = useState([]);
//   const [deliverydata, setDeliverydata] = useState([]);
//   const [validateChallandate, setValidateChallandate] = useState('');
//   const [validateInvoicedate, setValidateInvoicedate] = useState('');
//   const [party, setParty] = useState(null);
//   const [forpartyName, setforPartyName] = useState('');
//   const today = new Date().toISOString().split('T')[0];
//   const [JarNSDLExpDtl, setJarNSDLExpDtl] = useState([]);
//   const [handoverdata, setHandOverdata] = useState([]);
//   const [nsdldata, setNSDLdata] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [expsubhistory, setExpHistory] = useState([]);
//   const [penaltydetail, setPenaltydetail] = useState([]);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];

//     if (selectedFile) {
//       // Get the file extension
//       const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

//       // Define the allowed file extensions
//       const allowedExtensions = ['pdf', 'jpeg', 'jpg', 'png'];

//       // Check if the selected file's extension is in the allowedExtensions array
//       if (allowedExtensions.includes(fileExtension)) {
//         // The selected file is of the correct type, you can proceed with it
//         setSelectedFile(event.target.files[0]);
//         console.log('Selected file:', selectedFile);
//       } else {
//         // The selected file is not allowed
//         toast.error('Please choose a PDF, JPEG, JPG, or PNG file.', {
//           autoClose: 1000, // 1 second timeout
//         });
//         // Clear the file input
//         event.target.value = null;
//       }
//     }
//   };

//   // const handleNSDLData = (event) => {
//   //   const selectedValue = event.target.value;
//   //   console.log("Selected Value:", selectedValue); // Add this line to debug
//   //   setDeliverydata({
//   //     ...deliverydata,
//   //     nsdlStatus: selectedValue,
//   //   });
//   //   setNSDLdata(selectedValue);
//   // }

//   const handleNSDLData = (event) => {
//     const { name, value } = event.target;
//     setDeliverydata((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };

//   const handlereqid = (e) => {
//     setRequestId(e.target.value);

//   }

//   // If the user is not authenticated, redirect to the login page
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate(
//         "/login?message=You need to be authenticated to access this page."
//       );
//     }
//   }, [isAuthenticated, navigate]);

//   const toggleDivVisibility = () => {

//     if (!isDivVisible) {
//       setLowerInputReqId(reqid); // Set the value of lower input box when search button is clicked
//     }

//     setIsDivVisible(true);
//     setLowerInputReqId(reqid);// Always keep the div open after the first click
//   };

//   const closeModalforReqid = () => {
//     setIsModalOpen(false);
//     setRequestId('');
//     setData(
//       {
//         companyId: "",
//         branchId: "",
//         impSubId: "",
//         requestId: '',
//         sirNo: "",
//         sirDate: "",
//         importType: "LGD",
//         exporter: "",
//         challanNo: "",
//         challanDate: new Date(),
//         invoiceNo: "",
//         invoiceDate: new Date(),
//         exporterName: "",
//         exporterDate: new Date(),
//         nop: "",
//         netWeight: "",
//         netWeightUnit: "",
//         passedInWt: "",
//         passedInWtUnit: "",
//         productValue: "",
//         currency: "",
//         remarks: "",
//         reentryDate: new Date(),
//         nsdlStatus: "",
//         dgdcStatus: "",
//         status: "",
//         lgdStatus: "",
//         handover_Party_CHA: "",
//         handover_Party_Name: "",
//         handover_Represntative_id: "",
//         imposePenaltyAmount: "",
//         imposePenaltyRemarks: "",
//         status_document: "",
//         createdBy: "",
//         createdDate: "",
//         editedBy: "",
//         editedDate: "",
//         approvedBy: "",
//         approvedDate: ""
//       }
//     );
//     setLowerInputReqId('')
//     setImportdataforexport([]);
//     setExportdata([]);
//     setIsDivVisible(false);
//     setFormErrors(
//       {
//         requestId: "",
//         exporter: "",
//         challanNo: "",
//         invoiceNo: "",
//         nop: "",
//         exporterName: "",
//         gwWeight: "",
//         netWeight: ""
//       }
//     )
//     // Clear the reqid value when the modal is closed
//   };

//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     role,
//     companyname,
//     branchname,
//     logintype,
//     logintypeid,

//     login,
//     logout,
//   } = useContext(AuthContext);

//   useEffect(() => {
//     if (isDivVisible && lowerInputReqId) {
//       setData((prevData) => ({
//         ...prevData,
//         requestId: lowerInputReqId,
//       }));
//     }
//   }, [isDivVisible, lowerInputReqId]);
//   const [getreqidd, setReqidd] = useState('');
//   const [data, setData] = useState({
//     companyId: "",
//     branchId: "",
//     impSubId: "",
//     requestId: '',
//     sirNo: "",
//     sirDate: "",
//     importType: "LGD",
//     exporter: "",
//     challanNo: "",
//     challanDate: new Date(),
//     invoiceNo: "",
//     invoiceDate: new Date(),
//     exporterName: "",
//     exporterDate: new Date(),
//     nop: "",
//     netWeight: "",
//     netWeightUnit: "",
//     passedInWt: "",
//     passedInWtUnit: "",
//     productValue: "",
//     currency: "",
//     remarks: "",
//     reentryDate: new Date(),
//     nsdlStatus: "",
//     dgdcStatus: "",
//     status: "",
//     lgdStatus: "",
//     handover_Party_CHA: "",
//     handover_Party_Name: "",
//     handover_Represntative_id: "",
//     imposePenaltyAmount: "",
//     imposePenaltyRemarks: "",
//     status_document: "",
//     createdBy: "",
//     createdDate: "",
//     editedBy: "",
//     editedDate: "",
//     approvedBy: "",
//     approvedDate: ""
//   });

//   const handleInputChange = (event) => {

//     const { name, value } = event.target;
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const [formErrors, setFormErrors] = useState({
//     requestId: "",
//     exporter: "",
//     exporterName: "",
//     invoiceNo: "",
//     nop: "",
//     gwWeight: "",
//     netWeight: ""
//   });

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data1 = getsubimportdata.some((item) => item.requestId === data.requestId);

//     const submitBtn = document.getElementById('submitBtn');
//     submitBtn.disabled = true;
//     if (data1) {
//       toast.error("Data already exist.", {
//         autoClose: 700
//       })
//       return;
//     }
//     const errors = {};


//     if (!data.exporter) {
//       errors.exporter = "Exporter is required.";
//     }

//     if (!data.exporterName) {
//       errors.exporterName = "Exporter name is required.";
//     }

//     if (!data.invoiceNo) {
//       errors.invoiceNo = "Invoice no is required.";
//     }

//     if (!data.nop) {
//       errors.nop = "No. of packages is required.";
//     }


//     if (!data.netWeight) {
//       errors.netWeight = "Net weight is required.";
//     }


//     if (!data.exporter) {
//       document.getElementById('exporter').classList.add('error-border');
//     }
//     if (!data.exporterName) {
//       document.getElementById('exporterName').classList.add('error-border');
//     }

//     if (!data.invoiceNo) {
//       document.getElementById('invoiceNo').classList.add('error-border');
//     }
//     if (!data.nop) {
//       document.getElementById('nop').classList.add('error-border');
//     }


//     if (!data.netWeight) {
//       document.getElementById('netWeight').classList.add('error-border');
//     }
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       submitBtn.disabled = false;
//       return;
//     }

//     try {
//       // Send a POST request to the server with the data object
//       const response = await axios.post(`http://${ipaddress}importsub/insertdata/${userId}/${companyid}/${branchId}`, data);
//       console.log("Saved data:", response.data);
//       toast.success(`New SER ${response.data.sirNo} is generated successfully`, {
//         autoClose: 700
//       });


//       fetchData();
//       closeModalforReqid();
//     } catch (error) {
//       console.error("Error saving data:", error);
//       toast.error('error', {
//         autoClose: 700
//       })
//     }
//     finally {
//       // Enable the submit button regardless of success or failure
//       submitBtn.disabled = false;
//     }
//   };


//   const handleExportSubmit = async (event) => {
//     event.preventDefault();

//     const errors = {};
//     if (!data.requestId) {
//       errors.requestId = "Request Id is required.";
//     }

//     if (!data.invoiceNo) {
//       errors.invoiceNo = "Invoice no is required.";
//     }

//     if (!data.nop) {
//       errors.nop = "No. of packages is required.";
//     }

//     if (!data.netWeight) {
//       errors.netWeight = "Passed-In weight is required.";
//     }
//     if (!data.requestId) {
//       document.getElementById('requestId').classList.add('error-border');
//     }
//     if (!data.invoiceNo) {
//       document.getElementById('invoiceNo').classList.add('error-border');
//     }
//     if (!data.nop) {
//       document.getElementById('nop').classList.add('error-border');
//     }


//     if (!data.netWeight) {
//       document.getElementById('netWeight').classList.add('error-border');
//     }
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

//     if (data.netWeight > (getexportdata.passoutWeight - sumOfNetWeightsforex)) {
//       toast.error('Please enter right Passe-In wt.', {
//         autoClose: 700
//       });
//       return;
//     }

//     try {
//       data.exporter = getexportdata.exporter;
//       data.challanNo = getexportdata.challanNo;
//       data.challanDate = getexportdata.challanDate;
//       data.productValue = getexportdata.productValue;
//       data.currency = getexportdata.currency;


//       // Send a POST request to the server with the data object
//       const response = await axios.post(`http://${ipaddress}importsub/insertexportdata/${userId}/${companyid}/${branchId}/${getexportdata.expSubId}`, data);
//       console.log("Saved data:", response.data);
//       toast.success(`New SER ${response.data.sirNo} is generated successfully`, {
//         autoClose: 700
//       });
//       fetchData();
//       getImportlistfortableInexportEntry();
//     } catch (error) {
//       console.error("Error saving data:", error);
//       toast.error('error', {
//         autoClose: 700
//       })
//     }
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalOpenforupdate, setIsModalOpenforupdate] = useState(false);
//   const [isModalOpenforhistory, setIsModelOpenforhistory] = useState(false);
//   const [isModalOpenforViewall, setIsModalOpenforViewall] = useState(false);
//   const [isModelOpenforHandOver, setIsModelOpenforHndOver] = useState(false);
//   const [isModalOpenforDelieveryUpdate, setIsModalOpenforDeliveryUpdate] = useState(false);
//   const [isModalopenforpenalty, setIsmodalopenforpenalty] = useState(false);
//   const [forimpsubid, setForimpsubid] = useState('');
//   const [forreqid, setForreqid] = useState('');

//   const openModalforreqid = () => {
//     setIsModalOpen(true);
//   };



//   const closeModalforReqidforupdate = () => {
//     setIsModalOpenforupdate(false);
//     setFormErrors(
//       {
//         requestId: "",
//         exporter: "",
//         challanNo: "",
//         invoiceNo: "",
//         nop: "",
//         gwWeight: "",
//         netWeight: ""
//       }
//     )
//   };

//   const openModalforHandover = (req, sir) => {
//     setIsModelOpenforHndOver(true);
//     commonImportSub(req, sir, 'handover');
//     //setHandOverdata(data);
//     getCHAlist();
//   }

//   const closeModelforHistory = () => {
//     setIsModelOpenforhistory(false);
//   }

//   const closeModalforViewall = () => {
//     setIsModalOpenforViewall(false);
//   }

//   const closeModalforpenalty = () => {
//     setIsmodalopenforpenalty(false);
//     setPenaltydetail([]);
//   }

//   const closeModalforDelievery = () => {
//     setIsModalOpenforDeliveryUpdate(false);
//     setType1('');
//     setFileData(null);
//     setSelectedFile(null);
//   }

//   const closeModalforHandOver = () => {
//     setIsModelOpenforHndOver(false);
//     setCHAdata([]);
//     setCHARepresentData([]);
//     setCHARepresentative([]);
//     setAllCHARepresentative([]);
//     setSinglecha('');
//     setHandOverdata([]);
//     setSelectedOption('option1');
//     setRepresentData([]);
//     //setRepresentsingledata([]);
//     setIm1('');
//     setIm2('');
//     setIm3('');
//     setDeaultpartydata([]);
//   }

//   console.log('dgrtyhu', forimpsubid);

//   const getlist = () => {
//     axios
//       .get(`http://${ipaddress}jardetail/dgdcStatus/${companyid}`)
//       .then((response) => {
//         console.log("GET list response:", response.data);
//         setJarListDtl(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   const getNSDLExplist = () => {
//     axios
//       .get(`http://${ipaddress}jardetail/nsdlimpstatus/${companyid}`)
//       .then((response) => {
//         console.log("GET list response:", response.data);
//         setJarNSDLExpDtl(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   const [getpartyId, setGetpartyId] = useState({});




//   const fetchParty = async () => {
//     try {
//       const response = await axios.get(``);
//       setParty(response.data);
//       setGetpartyId(party.map((item) => item.partyName))
//     } catch (error) {
//       console.error("Error fetching party:", error);
//     }
//   }
//   useEffect(() => {
//     fetchParty();
//   }, [companyid, branchId, data.exporter]);

//   console.log('exporter ', getsubimportdata.exporter);


//   const fetchPartyNames = async () => {
//     try {
//       const response = await fetch(`http://${ipaddress}parties/getAll/${companyid}/${branchId}`);
//       const data = await response.json();
//       const namesMap = {};
//       data.forEach(party => {
//         namesMap[party.partyId] = party.partyName;
//       });
//       setGetpartyId(namesMap);
//       setPartys(data);
//     } catch (error) {
//       console.error("Error fetching party names:", error);
//     }
//   };


//   const fetchData = () => {
//     search1(searchFilters);
//     // axios
//     //   .get(`http://${ipaddress}importsub/alllgd/${companyid}/${branchId}`)
//     //   .then((response) => {
//     //     console.log("GET list response:", response.data);
//     //     setGetsubimportdata(response.data); // Store the list in the state
//     //   })
//     //   .catch((error) => {
//     //     console.error("GET list error:", error);
//     //   });
//   };

//   // useEffect(() => {
//   //   fetchData();
//   // }, [fetchData]);


//   useEffect(() => {
//     getlist();
//     getNSDLExplist();
//     fetchPartyNames();
//   }, []);




//   const formatDateTime = (value) => {
//     if (!value) {
//       return ""; // Return an empty string if value is empty or undefined
//     }

//     const date = new Date(value);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");

//     return `${day}/${month}/${year} `;
//   };

//   const unixTimestampToDate = (timestamp) => {
//     const date = new Date(timestamp);
//     const year = date.getFullYear();
//     const month = date.getMonth() + 1;
//     const day = date.getDate();
//     return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
//   };



//   const [updatedata, setUpdateData] = useState({
//     companyId: '',
//     branchId: '',
//     impSubId: '',
//     requestId: '',
//     sirNo: '',
//     sirDate: '',
//     importType: '',
//     exporter: '',
//     challanNo: '',
//     challanDate: '',
//     invoiceNo: '',
//     invoiceDate: '',
//     exporterName: '',
//     exporterDate: new Date(),
//     nop: '',
//     netWeight: '',
//     netWeightUnit: '',
//     passedInWt: "",
//     passedInWtUnit: "",
//     productValue: '',
//     currency: '',
//     remarks: '',
//     reentryDate: '',
//     nsdlStatus: '',
//     dgdcStatus: '',
//     status: '',
//     lgdStatus: "",
//     handover_Party_CHA: "",
//     handover_Party_Name: "",
//     handover_Represntative_id: "",
//     imposePenaltyAmount: "",
//     imposePenaltyRemarks: "",
//     status_document: '',
//     createdBy: '',
//     createdDate: '',
//     editedBy: '',
//     editedDate: '',
//     approvedBy: '',
//     approvedDate: ''
//   });


//   const openModalforreqidUpdate = (req, sir) => {
//     setIsModalOpenforupdate(true);
//     commonImportSub(req, sir, 'edit');
//     // setUpdateData(data);
//     fetchExportData();
//   };

//   const openModalforHistory = (req, sir) => {
//     setIsModelOpenforhistory(true);
//     commonImportSub(req, sir, 'history');
//     // setImpHistory(data);
//   }

//   const openModalforViewall = (req, sir) => {
//     setIsModalOpenforViewall(true);
//     commonImportSub(req, sir, 'view');
//     // setViewAll(data);
//   }

//   const openModalforpenalty = (req, sir) => {
//     setIsmodalopenforpenalty(true);
//     commonImportSub(req, sir, 'penalty');
//     // setPenaltydetail(data);
//   }


//   const openModalfordeliveryupdate = (req, sir) => {
//     setIsModalOpenforDeliveryUpdate(true);
//     commonImportSub(req, sir, 'delivery');
//     // setDeliverydata(data);
//   }

//   console.log('impsubhistory', impsubhistory);

//   useEffect(() => {
//     const getDataById = async () => {
//       try {
//         const response = await axios.get(`http://${ipaddress}importsub/byid/${companyid}/${branchId}/${forimpsubid}/${forreqid}`);
//         console.log("GET list response:", response.data);
//         setGetdatabyid(response.data);

//       } catch (error) {
//         console.error("GET list error:", error);
//       }
//     };

//     if (forimpsubid !== '' && forreqid !== '') {
//       getDataById();
//     }
//   }, [companyid, branchId, forimpsubid, forreqid]);

//   const formattedChallanDate = unixTimestampToDate(updatedata.challanDate);

//   const formattedInvoiceDate = unixTimestampToDate(updatedata.invoiceDate);

//   const handleChallanDateChange = (event) => {
//     const newDate = event.target.value;
//     setUpdateData((prevData) => ({
//       ...prevData,
//       challanDate: new Date(newDate),
//     }));
//   };

//   const handleUpdateInputChange = (event) => {
//     const { name, value } = event.target;
//     setUpdateData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleUpdateSubmit = async (event) => {
//     event.preventDefault();
//     const errors = {};
//     if (!updatedata.requestId) {
//       errors.requestId = "Request Id is required.";
//     }

//     if (!updatedata.exporter) {
//       errors.exporter = "Exporter is required.";
//     }

//     if (!updatedata.exporterName) {
//       errors.challanNo = "Exporter name is required.";
//     }

//     if (!updatedata.invoiceNo) {
//       errors.invoiceNo = "Invoice no is required.";
//     }

//     if (!updatedata.nop) {
//       errors.nop = "No. of packages is required.";
//     }


//     if (!updatedata.netWeight) {
//       errors.netWeight = "Net weight is required.";
//     }
//     if (!updatedata.requestId) {
//       document.getElementById('requestId').classList.add('error-border');
//     }

//     if (!updatedata.exporter) {
//       document.getElementById('exporter').classList.add('error-border');
//     }
//     if (!updatedata.exporterName) {
//       document.getElementById('exporterName').classList.add('error-border');
//     }

//     if (!updatedata.invoiceNo) {
//       document.getElementById('invoiceNo').classList.add('error-border');
//     }
//     if (!updatedata.nop) {
//       document.getElementById('nop').classList.add('error-border');
//     }


//     if (!updatedata.netWeight) {
//       document.getElementById('netWeight').classList.add('error-border');
//     }
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }
//     try {
//       // Send a POST request to the server with the data object
//       const response = await axios.post(`http://${ipaddress}importsub/updateData/${userId}`, updatedata);
//       console.log("Saved data:", response.data);
//       toast.success('Subcontract import updated successfully', {
//         autoClose: 700
//       });
//       setUpdateData(response.data);
//       fetchData();
//     } catch (error) {
//       console.error("Error saving data:", error);
//       toast.error('error', {
//         autoClose: 700
//       });
//     }
//   };


//   const handleUpdateforexportSubmit = async (event) => {
//     event.preventDefault();
//     const errors = {};
//     if (!updatedata.requestId) {
//       errors.requestId = "Request Id is required.";
//     }
//     if (!updatedata.invoiceNo) {
//       errors.invoiceNo = "Invoice no is required.";
//     }

//     if (!updatedata.nop) {
//       errors.nop = "No. of packages is required.";
//     }
//     if (!updatedata.netWeight) {
//       errors.netWeight = "Passed-In weight is required.";
//     }
//     if (!updatedata.requestId) {
//       document.getElementById('requestId').classList.add('error-border');
//     }

//     if (!updatedata.invoiceNo) {
//       document.getElementById('invoiceNo').classList.add('error-border');
//     }
//     if (!updatedata.nop) {
//       document.getElementById('nop').classList.add('error-border');
//     }

//     if (!updatedata.netWeight) {
//       document.getElementById('netWeight').classList.add('error-border');
//     }
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }
//     try {
//       // Send a POST request to the server with the data object
//       const response = await axios.post(`http://${ipaddress}importsub/updateData/${userId}`, updatedata);
//       console.log("Saved data:", response.data);
//       toast.success('Subcontract import updated successfully', {
//         autoClose: 700
//       });
//       setUpdateData(response.data);
//       fetchData();
//     } catch (error) {
//       console.error("Error saving data:", error);
//       toast.error('error', {
//         autoClose: 700
//       });
//     }
//   };

//   const oneparty = () => {
//     axios
//       .get(`http://${ipaddress}parties/${companyid}/${branchId}/${impsubhistory.exporter}`)
//       .then((response) => {
//         console.log("GET list response:", response.data);
//         setOneParty(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   }
//   useEffect(() => {
//     oneparty();
//   }, [companyid, branchId, impsubhistory.exporter]);


//   const handleInviceDateChange = (date) => {
//     setUpdateData((prevData) => ({
//       ...prevData,
//       invoiceDate: date, // Update the date directly without event.target
//     }));
//   };
//   const [searchFilters, setSearchFilters] = useState({
//     sirNo: '',
//     startDate: new Date(), // Initialize to null
//     endDate: new Date(), // Initialize to null
//     dgdcStatus: '',
//   });
//   const [filteredData, setFilteredData] = useState([]);



//   const handleStartDateChange = (date) => {
//     setSearchFilters({
//       ...searchFilters,
//       startDate: date,
//     });
//   };

//   const handleEndDateChange = (date) => {
//     setSearchFilters({
//       ...searchFilters,
//       endDate: date,
//     });
//   };

//   const handleFilterChange = (event) => {
//     const { name, value } = event.target;
//     setSearchFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };


//   const convertToDateWithoutTime = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         throw new Error('Invalid date');
//       }

//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');

//       return new Date(`${year}-${month}-${day}`);
//     } catch (error) {
//       console.error('Error converting date:', error);
//       return null;
//     }
//   };
//   const convertUnixTimestampToDate = (timestamp) => {
//     try {
//       const date = new Date(timestamp);

//       // Check if the Date object is valid
//       if (isNaN(date.getTime())) {
//         throw new Error('Invalid date');
//       }

//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');

//       return new Date(`${year}-${month}-${day}`);
//     } catch (error) {
//       console.error('Error converting date:', error);
//       return null;
//     }
//   };

//   const handleSearch = () => {
//     const filteredResults = getsubimportdata.filter((data) => {
//       const serNoMatches = searchFilters.sirNo === '' || (data.sirNo ?? '').includes(searchFilters.sirNo) || (data.requestId ?? '').includes(searchFilters.sirNo);

//       // Convert searchFilters.startDate and data.serDate to Date objects with "yyyy-MM-dd" format
//       const startDate = convertToDateWithoutTime(searchFilters.startDate);
//       const endDate = convertToDateWithoutTime(searchFilters.endDate);
//       const dataDate = convertUnixTimestampToDate(data.sirDate);
//       // Check if the Date objects are valid before comparing
//       if (!startDate || !endDate || !dataDate) {
//         return false; // Skip invalid dates
//       }

//       // Check if the values are valid Date objects before comparing
//       const startDateMatches = dataDate.getTime() >= startDate.getTime();
//       const endDateMatches = dataDate <= endDate;

//       const dgdcStatusMatches = searchFilters.dgdcStatus === '' || data.dgdcStatus === searchFilters.dgdcStatus;

//       return serNoMatches && startDateMatches && endDateMatches && dgdcStatusMatches;
//     });
//     if (filteredData.length > 0) {
//       setCurrentPage5(1); // Reset the current page to 1

//     }
//     // setFilteredData(filteredResults);
//   };


//   const convertToFormattedDate = (inputDate) => {
//     const dateObject = new Date(inputDate);
//     const year = dateObject.getFullYear();
//     const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
//     const day = dateObject.getDate().toString().padStart(2, '0');

//     return `${year}-${month}-${day}`;
//   };

//   useEffect(() => {
//     search1(searchFilters);
//   }, [0]);

//   const [loading,setloading] = useState(false);
//   const search1 = (searchFilters) => {
//     setloading(true);

//     axios
//       .get(`http://${ipaddress}importsub/search1?searchValue=${searchFilters.sirNo}&companyid=${companyid}&branchId=${branchId}&dgdcStatus=${searchFilters.dgdcStatus}&startDate=${convertToFormattedDate(searchFilters.startDate)}&endDate=${convertToFormattedDate(searchFilters.endDate)}`)
//       .then((response) => {
//         setFilteredData(response.data);
//         setloading(false);
//         // if (filteredData.length > 0) {
//         //   setCurrentPage5(1); // Reset the current page to 1

//         // }
//         // console.log('formData13453453 ', response.data);
//       })
//       .catch((error) => {
//         setloading(false);
//         console.error("Error in search1 request:", error);
//         // Handle the error, e.g., display an error message to the user
//       });
//   };
//   // console.log('filterdata ', searchFilters);

//   // useEffect(() => {
//   //   //  handleSearch();
//   //   //search1();
//   // }, [getsubimportdata])





//   // const handleClear = () => {
//   //   setSearchFilters({
//   //     sirNo: '',
//   //     startDate: new Date(),
//   //     endDate: new Date(),
//   //     dgdcStatus: '',
//   //   });
//   //   // setFilteredData([]);

//   //   // handleSearch();
//   //   fetchData();

//   //   if (filteredData.length > 0) {
//   //     setCurrentPage5(1); // Reset the current page to 1

//   //   }
//   // };



  
//   const resetSearch = {
//     sirNo: '',
//     startDate: new Date(),
//     endDate: new Date(),
//     dgdcStatus: '',
//   };

//   const setCurrentPageFun = () => 
//   {
//     setCurrentPage5(1);
// };

//   const handleClear = () => {
//     setSearchFilters({
//       sirNo: '',
//       startDate: new Date(),
//       endDate: new Date(),
//       dgdcStatus: '',
//     });
//     // setFilteredData([]);

//     // handleSearch();
//     search1(resetSearch);
//     setCurrentPageFun();

//     // if (filteredData.length > 0) {
//     //   setCurrentPage5(1); // Reset the current page to 1

//     // }
//   };



//   const [selectedDate, setSelectedDate] = useState(null);
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       setSelectedDate(new Date()); // Set the selected date to the current date
//     }
//   };

//   const handleDeliverySubmit = async (event) => {
//     event.preventDefault();
//     // closeModalforDelievery();
//     if (!selectedFile) {
//       // Display an error message or perform any other actions you want
//       toast.error('Please select a file before submitting', {
//         autoClose: 700
//       });
//       return; // Prevent further execution of the function
//     }

//     // if (!nsdldata) {
//     //   // Display an error message or perform any other actions you want
//     //   toast.error('Please select a nsdl status before submitting');
//     //   return; // Prevent further execution of the function
//     // }

//     // const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
//     // if (!allowedFileTypes.includes(selectedFile.type)) {
//     //   // Display an error message for unsupported file types
//     //   toast.error('Unsupported file type. Please select a PDF, JPEG, JPG, or PNG file.');
//     //   return; // Prevent further execution of the function
//     // }

//     try {
//       const formData = new FormData();
//       formData.append('file', selectedFile);

//       const response = await axios.post(
//         `http://${ipaddress}importsub/changedata/${deliverydata.nsdlStatus}/${companyid}/${branchId}/${deliverydata.impSubId}/${deliverydata.requestId}`,
//         formData, // Use formData as the request body
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
//           },
//           // Assuming updatedImportSub is a JSON object
//         },

//       );

//       console.log('Saved data:', response.data);
//       fetchData();
//       closeModalforDelievery();
//       toast.success('Upload Successfully', {
//         autoClose: 700
//       });
//       // Fetch data or perform other actions after successful submission
//     } catch (error) {
//       console.error('Error saving data:', error);
//       toast.error('Error uploading', {
//         autoClose: 700
//       });
//     }
//   };

//   const [selectedOption, setSelectedOption] = useState('option1');

//   const handleRadioChange = (event) => {
//     setSelectedOption(event.target.value);
//     getCHAlist();
//     setCHARepresentative([]);
//     getRepresentlistforCHA();
//     setRepresentdata([]);
//     getRepresentlist();
//     setIm1('');
//     setIm2('');
//     setIm3('');
//     setGetotpapprove([]);
//     setGetapprove([]);
//     getRepresentlistforALLCHA();
//     setAllCHARepresentative([]);
//   };


//   const renderTable = () => (
//     <View style={styles.table}>
//       <View style={styles.tableRow}>
//         <Text
//           style={[
//             styles.tableCell,
//             styles.tableCellHeader,
//             { fontSize: 10, width: 70 },
//           ]}
//         >
//           Type
//         </Text>
//         <Text
//           style={[
//             styles.tableCell,
//             styles.tableCellHeader,
//             { fontSize: 10, width: 100 },
//           ]}
//         >
//           SIR No
//         </Text>
//         <Text
//           style={[
//             styles.tableCell,
//             styles.tableCellHeader,
//             { fontSize: 10, width: 120 },
//           ]}
//         >
//           SIR Date
//         </Text>
//         <Text
//           style={[
//             styles.tableCell,
//             styles.tableCellHeader,
//             { fontSize: 10, width: 100 },
//           ]}
//         >
//           No. Of Packages
//         </Text>

//         <Text
//           style={[
//             styles.tableCell,
//             styles.tableCellHeader,
//             { fontSize: 10, width: 150 },
//           ]}
//         >
//           Passed-In Weight
//         </Text>

//       </View>
//       {impallhistory.map((item, index) => (
//         <View key={index} style={styles.tableRow} >
//           <Text style={{ ...styles.tableCell, fontSize: 10, width: 70 }}>
//             Import
//           </Text>
//           <Text style={{ ...styles.tableCell, fontSize: 10, width: 100 }}>
//             {item.sirNo}
//           </Text>
//           <Text style={{ ...styles.tableCell, fontSize: 10, width: 120 }}>
//             {formatDateTime(item.sirDate)}
//           </Text>
//           <Text style={{ ...styles.tableCell, fontSize: 10, width: 100 }}>
//             {item.nop}
//           </Text>

//           <Text style={{ ...styles.tableCell, fontSize: 10, width: 150 }}>
//             {item.netWeight}({item.netWeightUnit})
//           </Text>

//         </View>
//       ))}
//     </View>
//   );


//   const renderTable1 = () => (
//     <View style={styles.table}>
//       <View style={styles.tableRow}>
//         <Text
//           style={[
//             styles.tableCell,
//             styles.tableCellHeader,
//             { fontSize: 10, width: 70 },
//           ]}
//         >
//           Type
//         </Text>
//         <Text
//           style={[
//             styles.tableCell,
//             styles.tableCellHeader,
//             { fontSize: 10, width: 100 },
//           ]}
//         >
//           SER No
//         </Text>
//         <Text
//           style={[
//             styles.tableCell,
//             styles.tableCellHeader,
//             { fontSize: 10, width: 120 },
//           ]}
//         >
//           SER Date
//         </Text>
//         <Text
//           style={[
//             styles.tableCell,
//             styles.tableCellHeader,
//             { fontSize: 10, width: 100 },
//           ]}
//         >
//           No. Of Packages
//         </Text>
//         <Text
//           style={[
//             styles.tableCell,
//             styles.tableCellHeader,
//             { fontSize: 10, width: 150 },
//           ]}
//         >
//           Gross Weight
//         </Text>

//         <Text
//           style={[
//             styles.tableCell,
//             styles.tableCellHeader,
//             { fontSize: 10, width: 150 },
//           ]}
//         >
//           PassedOut Weight
//         </Text>

//       </View>

//       <View style={styles.tableRow} >
//         <Text style={{ ...styles.tableCell, fontSize: 10, width: 70 }}>
//           Export
//         </Text>
//         <Text style={{ ...styles.tableCell, fontSize: 10, width: 100 }}>
//           {expsubhistory.serNo}
//         </Text>
//         <Text style={{ ...styles.tableCell, fontSize: 10, width: 120 }}>
//           {formatDateTime(expsubhistory.serDate)}
//         </Text>
//         <Text style={{ ...styles.tableCell, fontSize: 10, width: 100 }}>
//           {expsubhistory.nop}
//         </Text>
//         <Text style={{ ...styles.tableCell, fontSize: 10, width: 150 }}>
//           {expsubhistory.gwWeight}
//         </Text>
//         <Text style={{ ...styles.tableCell, fontSize: 10, width: 150 }}>
//           {expsubhistory.passoutWeight}({expsubhistory.passoutWeightUnit})
//         </Text>

//       </View>

//     </View>
//   );

//   function getCurrentDateTimeFormatted() {
//     const currentDate = new Date();

//     const day = currentDate.getDate();
//     const month = currentDate.getMonth() + 1;
//     const year = currentDate.getFullYear() % 100; // Get the last two digits of the year
//     const hours = currentDate.getHours();
//     const minutes = currentDate.getMinutes();

//     const period = hours >= 12 ? "PM" : "AM";
//     const formattedHours = hours % 12 || 12; // Convert to 12-hour format
//     const formattedMinutes = String(minutes).padStart(2, "0");

//     const formattedDateTime = `${month}/${day}/${year}, ${formattedHours}:${formattedMinutes} ${period}`;

//     return formattedDateTime;
//   }

//   const MyPDFDocument = () => (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View>
//           <Text style={styles.dateSize}>{getCurrentDateTimeFormatted()}</Text>
//         </View>
//         <View style={styles.header}>
//           <Image style={styles.image} src={DGDCimage} />
//         </View>
//         <View style={styles.heading}>
//           <Text style={styles.heading}>SEEPZ-SEZ Address:</Text>
//           <Text style={styles.heading}>Unit-50, Plot-F1, SDF, Gem & Jewellery Complex-1, SEEPZ-SEZ, Andheri (E),Mumbai-400096</Text>
//           <Text style={styles.heading}>
//             GST NO. :  {getOneParty.gstNo}
//           </Text>

//           <Text style={styles.mainheading}>
//             Subcontract History
//           </Text>
//         </View>
//         <View>
//           <Text style={styles.normaltext2}>
//             Request ID:  {impsubhistory.requestId}
//           </Text>
//           <Text style={styles.normaltext3}>
//             Unit Name:  {getpartyId[impsubhistory.exporter]}
//           </Text>
//         </View>


//         {renderTable()}



//         <Text style={styles.normaltext2}>
//           Net Pending Quantity:  {-impsubhistory.netWeight}
//         </Text>


//       </Page>
//     </Document>
//   );

//   const [getexportdata, setExportdata] = useState([]);

//   const getsearchreqid = (e) => {
//     setReqidd(e.target.value);


//   }

//   const fetchDataforcrosscheck = (itemm3) => {
//     if (itemm3.length !== 12) {
//       toast.error("Request Id must be 12 digit", {
//         autoClose: 700
//       })
//       return;
//     }
//     axios
//       .get(`http://${ipaddress}importsub/alllgd/${companyid}/${branchId}`)
//       .then((response) => {
//         console.log("GET list response:", response.data);
//         const exportData = response.data;
//         const isRequestIdPresent = exportData.some((item) => item.requestId === itemm3);

//         if (isRequestIdPresent) {
//           // Display an error message and set isDivVisible to false

//           toast.error("Duplicate Request Id not allowed.", {
//             autoClose: 700
//           })
//           setIsDivVisible(false);
//           setData(
//             {
//               companyId: "",
//               branchId: "",
//               impSubId: "",
//               requestId: '',
//               sirNo: "",
//               sirDate: "",
//               importType: "LGD",
//               exporter: "",
//               challanNo: "",
//               challanDate: new Date(),
//               invoiceNo: "",
//               invoiceDate: new Date(),
//               nop: "",
//               netWeight: "",
//               netWeightUnit: "",
//               passedInWt: "",
//               passedInWtUnit: "",
//               productValue: "",
//               currency: "",
//               remarks: "",
//               reentryDate: new Date(),
//               nsdlStatus: "",
//               dgdcStatus: "",
//               status: "",
//               lgdStatus: "",
//               handover_Party_CHA: "",
//               handover_Party_Name: "",
//               handover_Represntative_id: "",
//               imposePenaltyAmount: "",
//               imposePenaltyRemarks: "",
//               status_document: "",
//               createdBy: "",
//               createdDate: "",
//               editedBy: "",
//               editedDate: "",
//               approvedBy: "",
//               approvedDate: ""
//             }
//           );
//         } else {
//           // Set isDivVisible to true and store the list in the state
//           setIsDivVisible(true);
//           setLowerInputReqId(getreqidd);
//         }
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);

//       });
//   };

//   const getExportlist = () => {
//     if (!isDivVisible) {
//       setLowerInputReqId(getreqidd); // Set the value of lower input box when search button is clicked
//     }

//     setIsDivVisible(true);
//     setLowerInputReqId(getreqidd);
//     axios
//       .get(`http://${ipaddress}importsub/getexpdata/${companyid}/${branchId}/${getreqidd}`)
//       .then((response) => {
//         console.log("GET list response:", response.data);
//         setExportdata(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   const [getexportforcheckdata, setExportdataforcheck] = useState([]);
//   const [datalist1, setDatalist1] = useState('');

//   const fetchExportData = useCallback(() => {
//     axios
//       .get(`http://${ipaddress}exportsub/checkdata/${companyid}/${branchId}`)
//       .then((response) => {
//         console.log("fetchExportData: ", response.data);
//         setExportdataforcheck(response.data);
//         const dataexist = response.data.some(item => item.requestId === updatedata.requestId); // Store the list in the state
//         setDatalist1(dataexist);
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   }, [companyid, branchId]);

//   useEffect(() => {
//     fetchExportData();
//   }, [companyid, branchId]);


//   console.log("exportdata ", getexportdata);

//   const dataexist = getexportforcheckdata.some(item => item.requestId === updatedata.requestId);

//   const getExportlistfortable = () => {

//     axios
//       .get(`http://${ipaddress}importsub/getexpdata/${companyid}/${branchId}/${impsubhistory.requestId}`)
//       .then((response) => {
//         console.log("GET list response:", response.data);
//         setExpHistory(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   useEffect(() => {
//     getExportlistfortable();
//   }, [companyid, branchId, impsubhistory.requestId]);

//   const [impallhistory, setImpallhistory] = useState([]);

//   const getImportlistfortable = () => {

//     axios
//       .get(`http://${ipaddress}importsub/getimpdata/${companyid}/${branchId}/${impsubhistory.requestId}`)
//       .then((response) => {
//         console.log("GET list response:", response.data);
//         setImpallhistory(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   useEffect(() => {
//     getImportlistfortable();
//   }, [companyid, branchId, impsubhistory.requestId]);

//   const [importsubhistory, setImportsubhistory] = useState([]);
//   const importsubhistorydata = () => {

//     axios
//       .get(`http://${ipaddress}importsub/history/${companyid}/${branchId}/${impsubhistory.requestId}/${impsubhistory.sirNo}`)
//       .then((response) => {

//         setImportsubhistory(response.data);
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   useEffect(() => {
//     importsubhistorydata();
//   }, [companyid, branchId, impsubhistory.requestId, impsubhistory.sirNo]
//   )


//   const sumOfNetWeights = impallhistory.reduce((accumulator, item) => accumulator + item.netWeight, 0);

//   const [importdataforexport, setImportdataforexport] = useState([]);

//   const getImportlistfortableInexportEntry = () => {

//     axios
//       .get(`http://${ipaddress}importsub/getimpdata/${companyid}/${branchId}/${getexportdata.requestId}`)
//       .then((response) => {
//         console.log("GET list response:", response.data);
//         setImportdataforexport(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   useEffect(() => {
//     getImportlistfortableInexportEntry();
//   }, [companyid, branchId, getexportdata.requestId]);

//   const sumOfNetWeightsforex = importdataforexport.reduce((accumulator, item) => accumulator + item.netWeight, 0);






//   const [CHAdata, setCHAdata] = useState([]);
//   const [representdata, setRepresentdata] = useState([]);

//   const getCHAlist = () => {
//     axios
//       .get(`http://${ipaddress}externalparty/alldata/${companyid}/${branchId}`)
//       .then((response) => {
//         console.log("GET list response:", response.data);
//         setCHAdata(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   useEffect(() => {
//     getCHAlist();
//   }, [companyid, branchId])


//   const getRepresentlist = () => {
//     axios
//       .get(`http://${ipaddress}represent/byuiddata/${companyid}/${branchId}/${handoverdata.exporter}`)
//       .then((response) => {
//         console.log("Representttt ", response.data);
//         setRepresentdata(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   useEffect(() => {
//     getRepresentlist();
//   }, [companyid, branchId, handoverdata.exporter])

//   const [representData, setRepresentData] = useState([]);
//   const [selectRepresentdata, setSelectrepresentdata] = useState('');
//   const [getotp, setGetOtp] = useState('');

//   const handleOTP = (e) => {
//     setGetOtp(e.target.value);
//   }

//   console.log('Otpppp ', getotp);


//   const handlerepresent = (e) => {

//     setSelectrepresentdata(e.target.value);
//   }

//   console.log('selectRepresentdata ' + selectRepresentdata);

//   const [imageData1, setImageData1] = useState(null);
//   const [im1, setIm1] = useState('');

//   const imageFile1 = async () => {
//     try {
//       const response = await axios.get(`http://${ipaddress}represent/getImage/${companyid}/${branchId}/${selectRepresentdata}`, {
//         responseType: 'arraybuffer', // Tell Axios to treat the response as binary data
//       });

//       // Extract the content type from the response headers
//       const contentType = response.headers['content-type'];

//       // Create a Blob from the binary data
//       const blob = new Blob([response.data], { type: contentType });

//       // Create a URL for the Blob
//       const url = window.URL.createObjectURL(blob);

//       // Set the file data in the state
//       setImageData1({ url, contentType });
//       setIm1('Y');
//     } catch (error) {
//       setError('Error downloading file');
//       setIm1('N')
//     }
//   };

//   useEffect(() => {
//     imageFile1();
//   }, [companyid, branchId, selectRepresentdata])

//   const getRepresentData = () => {
//     axios
//       .get(`http://${ipaddress}represent/byrepresentid/${companyid}/${branchId}/${selectRepresentdata}`)
//       .then((response) => {

//         setRepresentData(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   useEffect(() => {
//     getRepresentData();
//   }, [companyid, branchId, selectRepresentdata])

//   const [getotpapprove, setGetotpapprove] = useState('');
//   const approvedByOTPSpanRef = useRef('');
//   useEffect(() => {
//     if (approvedByOTPSpanRef.current) {
//       const approvedByValue = approvedByOTPSpanRef.current.textContent;
//       setGetotpapprove(approvedByValue);
//       // Now you can use the 'approvedByValue' variable to store or manipulate the value
//       console.log('Approved By Value:', approvedByValue);
//     }
//   }, [representData.mobile]);


//   const checkotp1 = () => {
//     if (!selectRepresentdata) {
//       toast.error("Please select representative", {
//         autoClose: 700
//       })
//       return;
//     }

//     if (!getotpapprove) {
//       toast.error("Please select mobile no.", {
//         autoClose: 700
//       })
//       return;
//     }
//     axios
//       .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectRepresentdata}/${getotpapprove}/${handoverdata.nop}`)
//       .then(() => {
//         toast.success("OTP sent successfully", {
//           autoClose: 700
//         })

//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   const handleVerifyOTP = async () => {
//     if (!selectRepresentdata) {
//       toast.error("Please select representative", {
//         autoClose: 700
//       })
//       return;
//     }
//     if (!getotpapprove) {
//       toast.error("Please select mobile no.", {
//         autoClose: 700
//       })
//       return;
//     }
//     if (!getotp) {
//       toast.error("OTP not available", {
//         autoClose: 700
//       })
//       return;
//     }
//     try {
//       const response = await axios.get(`http://${ipaddress}represent/checkimpotp/${companyid}/${branchId}/${selectRepresentdata}/${getotpapprove}/${getotp}/${handoverdata.impSubId}/${handoverdata.requestId}/${handoverdata.exporter}/${userId}`);
//       if (response.status === 200) {
//         toast.success("Successful...", {
//           autoClose: 700
//         })
//         closeModalforHandOver();
//         importsubhistorydata();
//         fetchData();
//       }
//     } catch (error) {
//       toast.error('Something went wrong', {
//         autoClose: 700
//       });
//     }
//   };

//   console.log('Handoverdataaaa ', handoverdata.sirNo);

//   const [getdefaultpartyata, setDeaultpartydata] = useState([]);
//   const getDefaultData = () => {
//     axios
//       .get(`http://${ipaddress}defaultparty/getdata/${companyid}/${branchId}/${handoverdata.exporter}`)
//       .then((response) => {

//         setDeaultpartydata(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   useEffect(() => {
//     getDefaultData();
//   }, [companyid, branchId, handoverdata.exporter])

//   const [getrepresentSingledata, setRepresentsingledata] = useState([]);
//   const getSinglerepresent = () => {
//     axios
//       .get(`http://${ipaddress}externalparty/singledata/${companyid}/${branchId}/${getdefaultpartyata.impCHA}`)
//       .then((response) => {

//         setRepresentsingledata(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   useEffect(() => {
//     getSinglerepresent();
//   }, [companyid, branchId, getdefaultpartyata.expCHA])

//   const [CHARepresentavive, setCHARepresentative] = useState([]);

//   const getRepresentlistforCHA = () => {
//     axios
//       .get(`http://${ipaddress}represent/byuiddata/${companyid}/${branchId}/${getrepresentSingledata.externaluserId}`)
//       .then((response) => {
//         console.log("Representttt ", response.data);
//         setCHARepresentative(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   useEffect(() => {
//     getRepresentlistforCHA();
//   }, [companyid, branchId, getrepresentSingledata.externaluserId])

//   const [CHArepresentData, setCHARepresentData] = useState([]);

//   const getCHARepresentData = () => {
//     axios
//       .get(`http://${ipaddress}represent/byrepresentid/${companyid}/${branchId}/${selectRepresentdata}`)
//       .then((response) => {

//         setCHARepresentData(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   useEffect(() => {
//     getCHARepresentData();
//   }, [companyid, branchId, selectRepresentdata])

//   const [getapprove, setGetapprove] = useState('');
//   const approvedBySpanRef = useRef('');
//   useEffect(() => {
//     if (approvedBySpanRef.current) {
//       const approvedByValue = approvedBySpanRef.current.textContent;
//       setGetapprove(approvedByValue);
//       // Now you can use the 'approvedByValue' variable to store or manipulate the value
//       console.log('Approved By Value:', approvedByValue);
//     }
//   }, [CHArepresentData.mobile]);

//   const [imageData2, setImageData2] = useState(null);
//   const [im2, setIm2] = useState('');
//   const imageFile2 = async () => {
//     try {
//       const response = await axios.get(`http://${ipaddress}represent/getImage/${companyid}/${branchId}/${selectRepresentdata}`, {
//         responseType: 'arraybuffer', // Tell Axios to treat the response as binary data
//       });

//       // Extract the content type from the response headers
//       const contentType = response.headers['content-type'];

//       // Create a Blob from the binary data
//       const blob = new Blob([response.data], { type: contentType });

//       // Create a URL for the Blob
//       const url = window.URL.createObjectURL(blob);

//       // Set the file data in the state
//       setImageData2({ url, contentType });
//       setIm2('Y');

//     } catch (error) {
//       setError('Error downloading file');
//       setIm2("N");
//     }
//   };

//   useEffect(() => {
//     imageFile2();
//   }, [companyid, branchId, selectRepresentdata])


//   const checkotp2 = () => {
//     if (!selectRepresentdata) {
//       toast.error("Please select representative", {
//         autoClose: 700
//       })
//       return;
//     }

//     if (!CHArepresentData.mobile) {
//       toast.error("Please select mobile no.", {
//         autoClose: 700
//       })
//       return;
//     }
//     axios
//       .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectRepresentdata}/${CHArepresentData.mobile}/${handoverdata.nop}`)
//       .then(() => {
//         toast.success("OTP sent successfully", {
//           autoClose: 700
//         })

//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   const handleVerifCHAyOTP = async () => {
//     if (!selectRepresentdata) {
//       toast.error("Please select representative", {
//         autoClose: 700
//       })
//       return;
//     }
//     if (!CHArepresentData.mobile) {
//       toast.error("Please select mobile no.", {
//         autoClose: 700
//       })
//       return;
//     }
//     if (!getotp) {
//       toast.error("OTP not available", {
//         autoClose: 700
//       })
//       return;
//     }
//     try {
//       const response = await axios.get(`http://${ipaddress}represent/checkimpCHAotp/${companyid}/${branchId}/${selectRepresentdata}/${CHArepresentData.mobile}/${getotp}/${handoverdata.impSubId}/${handoverdata.requestId}/${getrepresentSingledata.externaluserId}/${userId}`);
//       if (response.status === 200) {
//         toast.success("Successful...", {
//           autoClose: 700
//         })
//         closeModalforHandOver();
//         fetchData();
//         importsubhistorydata();
//       }
//     } catch (error) {
//       toast.error('Something went wrong', {
//         autoClose: 700
//       });
//     }
//   };


//   const [AllCHARepresentavive, setAllCHARepresentative] = useState([]);
//   const [getsinglecha, setSinglecha] = useState('');

//   const handlegetsinglecha = (e) => {
//     setSinglecha(e.target.value);
//     setCHARepresentData('No');
//     setIm1('');
//     setIm2('');
//     setIm3('');
//   }

//   const getRepresentlistforALLCHA = () => {
//     setAllCHARepresentative([]);
//     axios
//       .get(`http://${ipaddress}represent/byuiddata/${companyid}/${branchId}/${getsinglecha}`)
//       .then((response) => {
//         console.log("Representttt ", response.data);
//         setAllCHARepresentative(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   useEffect(() => {
//     getRepresentlistforALLCHA();
//   }, [companyid, branchId, getsinglecha])


//   const [imageData3, setImageData3] = useState(null);
//   const [im3, setIm3] = useState('');
//   const imageFile3 = async () => {
//     try {
//       const response = await axios.get(`http://${ipaddress}represent/getImage/${companyid}/${branchId}/${selectRepresentdata}`, {
//         responseType: 'arraybuffer', // Tell Axios to treat the response as binary data
//       });

//       // Extract the content type from the response headers
//       const contentType = response.headers['content-type'];

//       // Create a Blob from the binary data
//       const blob = new Blob([response.data], { type: contentType });

//       // Create a URL for the Blob
//       const url = window.URL.createObjectURL(blob);
//       setIm3('Y');
//       // Set the file data in the state
//       setImageData3({ url, contentType });

//     } catch (error) {
//       setError('Error downloading file');
//       setIm3('N');
//     }
//   };

//   useEffect(() => {
//     imageFile3();
//   }, [companyid, branchId, selectRepresentdata])

//   const checkotp3 = () => {
//     if (!selectRepresentdata) {
//       toast.error("Please select representative", {
//         autoClose: 700
//       })
//       return;
//     }

//     if (!getapprove) {
//       toast.error("Please select mobile no.", {
//         autoClose: 700
//       })
//       return;
//     }
//     axios
//       .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectRepresentdata}/${getapprove}/${handoverdata.nop}`)
//       .then(() => {
//         toast.success("OTP sent successfully", {
//           autoClose: 700
//         })

//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };


//   const handleVerifAllCHAyOTP = async () => {
//     if (!selectRepresentdata) {
//       toast.error("Please select representative", {
//         autoClose: 700
//       })
//       return;
//     }
//     if (!getapprove) {
//       toast.error("Please select mobile no.", {
//         autoClose: 700
//       })
//       return;
//     }
//     if (!getotp) {
//       toast.error("OTP not available", {
//         autoClose: 700
//       })
//       return;
//     }
//     try {
//       const response = await axios.get(`http://${ipaddress}represent/checkimpCHAotp/${companyid}/${branchId}/${selectRepresentdata}/${getapprove}/${getotp}/${handoverdata.impSubId}/${handoverdata.requestId}/${getsinglecha}/${userId}`);
//       if (response.status === 200) {
//         toast.success("Successful...", {
//           autoClose: 700
//         })
//         closeModalforHandOver();
//         importsubhistorydata();
//         fetchData();
//       }
//     } catch (error) {
//       toast.error('Something went wrong', {
//         autoClose: 700
//       });
//     }
//   };
//   console.log("iushuierhteriut ", nsdldata, companyid, branchId, deliverydata.impSubId, deliverydata.requestId);


//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // Number of items to display per page
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   const itemsToDisplay = filteredData.slice(startIndex, endIndex);

//   const handlepenaltychange = (event) => {
//     const { name, value } = event.target;
//     setPenaltydetail((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };


//   const getpenaltystatus = () => {
//     if (!penaltydetail.imposePenaltyAmount) {
//       toast.error("Please enter the penalty amount..", {
//         autoClose: 700
//       })
//       return;
//     }
//     axios
//       .post(`http://${ipaddress}importsub/penalty`, penaltydetail)
//       .then((response) => {
//         toast.success('Penalty Isseued Successfully..', {
//           autoClose: 700
//         });
//         setPenaltydetail(response.data);
//         fetchData();
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//         toast.error("Please check the data before submitting..", {
//           autoClose: 700
//         })
//       });
//   };
//   const savegateinout = (req, ser) => {

//     axios
//       .post(`http://${ipaddress}gateinout/saveimpsub/${companyid}/${branchId}/${req}/${ser}`)
//       .then(() => {

//         fetchData();
//       })
//       .catch((error) => {

//       });
//   };

//   const printBarcode = async (mawb, seino, nop, sirdate, reqdate, niptStatus, requestId, subtype) => {
//     try {
//       // console.log(mawb, seino, nop);
//       const response = await InviceService.getbarcode(mawb, seino, nop, sirdate, reqdate, "SUBIMPORT", niptStatus, requestId, "HAWB", "IGM", subtype);

//       // Check if the response status is OK (200)
//       if (response.status === 200) {
//         // Get the raw response data as base64-encoded string
//         const newWindow = window.open('', '_blank');
//         newWindow.document.write(response.data);
//         setTimeout(() => {
//           newWindow.print(); // Open the print dialog
//         }, 100);
//       } else {
//         throw new Error('Failed to generate PDF');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const [fileData, setFileData] = useState(null);
//   const [type1, setType1] = useState('');
//   const [error, setError] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   console.log('deliverydata ', deliverydata);
//   const downloadFile = async () => {
//     try {
//       const response = await axios.get(`http://${ipaddress}importsub/download/${companyid}/${branchId}/${deliverydata.impSubId}/${deliverydata.requestId}`, {
//         responseType: 'arraybuffer', // Tell Axios to treat the response as binary data
//       });

//       // Extract the content type from the response headers
//       const contentType = response.headers['content-type'];

//       // Create a Blob from the binary data
//       const blob = new Blob([response.data], { type: contentType });

//       // Create a URL for the Blob
//       const url = window.URL.createObjectURL(blob);

//       // Set the file data in the state
//       setFileData({ url, contentType });

//       if (contentType === 'application/pdf') {
//         setType1('app');
//         openPdfInNewTab();
//       }
//       else {
//         setModalIsOpen(true);
//       }

//     } catch (error) {
//       setError('Error downloading file');
//     }
//   };
//   console.log('fileData', type1);
//   const closeModal = () => {
//     setFileData(null); // Clear the image URL
//     setModalIsOpen(false); // Close the modal
//   };


//   // Model Open Const 
//   // Model Open Show 
//   const [modalDocumentShow, setModalDocumentShow] = useState(false);
//   const closeModalDocumentShow = () => {
//     setModalDocumentShow(false);
//   };

//   const openDocument = () => {
//     setModalDocumentShow(true);
//   };



















//   const extractFileName = (filePath) => {
//     if (typeof filePath === 'string') {
//       const parts = filePath.split('/');
//       const fileName = parts[parts.length - 1];
//       return fileName;
//     } else {
//       // Handle cases where filePath is not a string (or is undefined/null)
//       return 'Invalid File Path';
//     }
//   }
//   const openPdfInNewTab = () => {
//     if (fileData) {
//       window.open(fileData.url, '_blank'); // Open the PDF in a new tab
//     }
//   };
//   console.log('getexportforcheckdata ', getexportforcheckdata);
//   console.log('updatedata ', updatedata);

//   const convertTimestampToDateTime = (timestamp) => {
//     const date = new Date(timestamp);

//     // Get the individual components (day, month, year, hours, minutes, seconds)
//     const day = date.getDate();
//     const month = date.getMonth() + 1; // Note: Months are zero-based, so we add 1
//     const year = date.getFullYear();
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const seconds = date.getSeconds();

//     // Create a formatted date and time string
//     const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

//     return formattedDateTime;
//   }



//   // Multiple record handed over to Party/CHA
//   const [getrepresentData, setGetrepresentData] = useState([]);
//   const [selectRepresentdataa, setSelectrepresentdataa] = useState('');
//   const [getrepresentData1, setGetrepresentData1] = useState([]);
//   const [selectRepresentdataa1, setSelectrepresentdataa1] = useState('');
//   const [getOtp5, setGetotp5] = useState('');
//   const [selectCHA, setSelectedCHA] = useState('');
//   const [isModalOpenforhandedover, setIsModalOpenforhandedover] = useState(false);
//   const [multiplehandoverdata, setMultiplehandoverdata] = useState([]);

//   const openModalforMultiplehandover = () => {
//     setIsModalOpenforhandedover(true);
//     getCHAData();
//   }

//   const closeModalforMultiplehandover = () => {
//     setIsModalOpenforhandedover(false);
//     setGetparty('');
//     setPartydata1([]);
//     setSelectedOption1('option1');
//     setSelectAll2(false);
//     setGetrepresentData([]);
//     setGetOTPapprove('');
//     setallCHARepresentative([]);
//     setSelectrepresentdataa('');
//     setSelectedCHA([]);
//     setList2([]);
//     setSelectAll3(false);
//     setGetrepresentData1([]);
//     setGetOTPapprove1('');
//     setallCHARepresentative1([]);
//     setSelectrepresentdataa1('');

//     setGetalldatabyCHA([]);
//   }

//   const [selectedOption1, setSelectedOption1] = useState('option1');

//   const handleRadioChange1 = (event) => {
//     setSelectedOption1(event.target.value);
//   }

//   const [getparty, setGetparty] = useState('');
//   const [partydata1, setPartydata1] = useState([]);
//   console.log('getparty ', getparty);
//   const checkpartytohandover = () => {
//     axios
//       .get(`http://${ipaddress}importsub/checkimportpartydata1/${companyid}/${branchId}/${getparty}`)
//       .then((response) => {
//         console.log('partydata1 ', response.data);
//         if (response.data.length == 0) {
//           toast.error("Data not found", {
//             autoClose: 700
//           })
//           setGetparty('');
//           setPartydata1([]);
//           return;
//         }
//         setPartydata1(response.data);

//       })
//       .catch((error) => {
//         if (error) {
//           toast.error("Data not found", {
//             autoClose: 700
//           })
//           setGetparty('');
//           setPartydata1([]);
//           return;
//         }
//         console.error("GET list error:", error);
//       });
//   }

//   const [selectedRows2, setSelectedRows2] = useState([]);
//   const [selectAll2, setSelectAll2] = useState(false);


//   const handleCheckboxChange3 = (item) => {
//     // Toggle the selection state for the clicked row
//     if (selectedRows2.includes(item)) {
//       setSelectedRows2(selectedRows2.filter((row) => row !== item));
//     } else {
//       setSelectedRows2([...selectedRows2, item]);
//     }
//   };

//   const handleSelectAll2 = () => {
//     if (selectAll2) {
//       setSelectedRows2([]);
//     } else {
//       setSelectedRows2([...partydata1]); // Clone the array
//     }
//     setSelectAll2(!selectAll2);
//   };


//   const [selectedRows3, setSelectedRows3] = useState([]);
//   const [selectAll3, setSelectAll3] = useState(false);


//   const handleCheckboxChange4 = (item) => {
//     // Toggle the selection state for the clicked row
//     if (selectedRows3.includes(item)) {
//       setSelectedRows3(selectedRows3.filter((row) => row !== item));
//     } else {
//       setSelectedRows3([...selectedRows3, item]);
//     }
//   };

//   const handleSelectAll4 = () => {
//     if (selectAll3) {
//       setSelectedRows3([]);
//     } else {
//       setSelectedRows3([...getalldatabyCHA]); // Clone the array
//     }
//     setSelectAll3(!selectAll3);
//   };


//   const [imageData5, setImageData5] = useState(null);
//   const [im5, setIm5] = useState('');

//   const imageFile5 = async () => {
//     try {
//       const response = await axios.get(`http://${ipaddress}represent/getImage/${companyid}/${branchId}/${selectRepresentdataa}`, {
//         responseType: 'arraybuffer', // Tell Axios to treat the response as binary data
//       });

//       // Extract the content type from the response headers
//       const contentType = response.headers['content-type'];

//       // Create a Blob from the binary data
//       const blob = new Blob([response.data], { type: contentType });

//       // Create a URL for the Blob
//       const url = window.URL.createObjectURL(blob);

//       // Set the file data in the state
//       setImageData5({ url, contentType });
//       setIm5('Y');
//     } catch (error) {

//       setIm5('N')
//     }
//   };

//   useEffect(() => {
//     imageFile5();
//   }, [companyid, branchId, selectRepresentdataa])


//   // CHA
//   const [imageData6, setImageData6] = useState(null);
//   const [im6, setIm6] = useState('');

//   const imageFile6 = async () => {
//     try {
//       const response = await axios.get(`http://${ipaddress}represent/getImage/${companyid}/${branchId}/${selectRepresentdataa1}`, {
//         responseType: 'arraybuffer', // Tell Axios to treat the response as binary data
//       });

//       // Extract the content type from the response headers
//       const contentType = response.headers['content-type'];

//       // Create a Blob from the binary data
//       const blob = new Blob([response.data], { type: contentType });

//       // Create a URL for the Blob
//       const url = window.URL.createObjectURL(blob);

//       // Set the file data in the state
//       setImageData6({ url, contentType });
//       setIm6('Y');
//     } catch (error) {

//       setIm6('N')
//     }
//   };

//   useEffect(() => {
//     imageFile6();
//   }, [companyid, branchId, selectRepresentdataa1])

//   const handlepartyrepresent1 = (e) => {

//     setSelectrepresentdataa1(e.target.value);
//   }

//   const [allCHARepresentavive1, setallCHARepresentative1] = useState([]);
//   const [getRepresentName1, setGetrepresentName1] = useState('');
//   const getRepresentlistforALLCarting1 = () => {

//     axios
//       .get(`http://${ipaddress}represent/byuiddata/${companyid}/${branchId}/${selectCHA}`)
//       .then((response) => {
//         setallCHARepresentative1(response.data);
//         const namesMap = {};
//         response.data.forEach(party => {
//           namesMap[party.representativeId] = party.firstName + " " + party.lastName;
//         });
//         setGetrepresentName1(namesMap);// Store the list in the state
//       })
//       .catch((error) => {
//       });
//   };

//   useEffect(() => {
//     getRepresentlistforALLCarting1();
//   }, [companyid, branchId, selectCHA])

//   const getCartingRepresentData1 = () => {
//     axios
//       .get(`http://${ipaddress}represent/byrepresentid/${companyid}/${branchId}/${selectRepresentdataa1}`)
//       .then((response) => {

//         setGetrepresentData1(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//       });
//   };

//   useEffect(() => {
//     getCartingRepresentData1();
//   }, [companyid, branchId, selectRepresentdataa1])

//   const [getOTPapprove1, setGetOTPapprove1] = useState('');
//   const approvedByotpSpanRef1 = useRef('');
//   useEffect(() => {
//     if (approvedByotpSpanRef1.current) {
//       const approvedByValue = approvedByotpSpanRef1.current.textContent;
//       setGetOTPapprove1(approvedByValue);
//       // Now you can use the 'approvedByValue' variable to store or manipulate the value
//     }
//   }, [getrepresentData1.mobile]);

//   const [getotp6, setGetOtp6] = useState('');

//   const handleOTP6 = (e) => {
//     setGetOtp6(e.target.value);
//   }

//   const checkotp6 = () => {
//     if (!selectRepresentdataa1) {
//       toast.error("Please select representative", {
//         autoClose: 700
//       })
//       return;
//     }

//     if (!getOTPapprove1) {
//       toast.error("Please select mobile no.", {
//         autoClose: 700
//       })
//       return;
//     }
//     const nop1 = selectedRows3.reduce((total, item) => total + item.nop, 0);
//     axios
//       .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectRepresentdataa1}/${getrepresentData1.mobile}/${nop1}`)
//       .then(() => {
//         toast.success("OTP sent successfully", {
//           autoClose: 700
//         })

//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   const handleSubmit4 = () => {
//     if (selectedRows3.length === 0) {
//       toast.error("Please select atleast one checkbox", {
//         autoClose: 700
//       })
//       return;
//     }
//     if (!getotp6) {
//       toast.error("Invalid OTP", {
//         autoClose: 700
//       })
//       return;
//     }
//     axios
//       .post(`http://${ipaddress}represent/checkhandoverimpjobsubcartotp1/${companyid}/${branchId}/${selectRepresentdataa1}/${getrepresentData1.mobile}/${getotp6}/${selectCHA}/${userId}`, selectedRows3)

//       .then(() => {


//         closeModalforMultiplehandover();
//         toast.success("Handed over to Party/CHA successfully", {
//           autoClose: 700
//         })
//         fetchData();

//       })
//       .catch((error) => {
//         toast.error("Invalid OTP", {
//           autoClose: 700
//         })
//       });
//   };

//   // CHA
//   const handleOtp5 = (e) => {
//     setGetotp5(e.target.value);
//   }



//   const handlepartyrepresent = (e) => {

//     setSelectrepresentdataa(e.target.value);
//   }
//   const [allCHARepresentavive, setallCHARepresentative] = useState([]);
//   const [getRepresentName, setGetrepresentName] = useState('');
//   const getRepresentlistforALLCarting = () => {

//     axios
//       .get(`http://${ipaddress}represent/byuiddata/${companyid}/${branchId}/${getparty}`)
//       .then((response) => {
//         setallCHARepresentative(response.data);
//         const namesMap = {};
//         response.data.forEach(party => {
//           namesMap[party.representativeId] = party.firstName + " " + party.lastName;
//         });
//         setGetrepresentName(namesMap);// Store the list in the state
//       })
//       .catch((error) => {
//       });
//   };

//   useEffect(() => {
//     getRepresentlistforALLCarting();
//   }, [companyid, branchId, getparty])


//   const getCartingRepresentData = () => {
//     axios
//       .get(`http://${ipaddress}represent/byrepresentid/${companyid}/${branchId}/${selectRepresentdataa}`)
//       .then((response) => {

//         setGetrepresentData(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//       });
//   };

//   useEffect(() => {
//     getCartingRepresentData();
//   }, [companyid, branchId, selectRepresentdataa])

//   const [getOTPapprove, setGetOTPapprove] = useState('');
//   const approvedByotpSpanRef = useRef('');
//   useEffect(() => {
//     if (approvedByotpSpanRef.current) {
//       const approvedByValue = approvedByotpSpanRef.current.textContent;
//       setGetOTPapprove(approvedByValue);
//       // Now you can use the 'approvedByValue' variable to store or manipulate the value
//     }
//   }, [getrepresentData.mobile]);

//   const [getotp5, setGetOtp5] = useState('');

//   const handleOTP5 = (e) => {
//     setGetOtp5(e.target.value);
//   }

//   const checkotp5 = () => {
//     if (!selectRepresentdataa) {
//       toast.error("Please select representative", {
//         autoClose: 700
//       })
//       return;
//     }

//     if (!getOTPapprove) {
//       toast.error("Please select mobile no.", {
//         autoClose: 700
//       })
//       return;
//     }
//     const nop1 = selectedRows2.reduce((total, item) => total + item.nop, 0);
//     console.log('nop112 ', nop1);
//     axios
//       .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectRepresentdataa}/${getrepresentData.mobile}/${nop1}`)
//       .then(() => {
//         toast.success("OTP sent successfully", {
//           autoClose: 700
//         })

//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   };

//   const handleSubmit3 = () => {
//     if (selectedRows2.length === 0) {
//       toast.error("Please select atleast one checkbox", {
//         autoClose: 700
//       })
//       return;
//     }
//     if (!getotp5) {
//       toast.error("Invalid OTP", {
//         autoClose: 700
//       })
//       return;
//     }
//     axios
//       .post(`http://${ipaddress}represent/checkhandoverimpjobsubcartotp/${companyid}/${branchId}/${selectRepresentdataa}/${getrepresentData.mobile}/${getotp5}/${getparty}/${userId}`, selectedRows2)

//       .then(() => {


//         closeModalforMultiplehandover();
//         toast.success("Handed over to Party/CHA successfully", {
//           autoClose: 700
//         })
//         fetchData();

//       })
//       .catch((error) => {
//         toast.error("Invalid OTP", {
//           autoClose: 700
//         })
//       });
//   };
//   const [allCHA, setAllCHA] = useState([]);
//   const [getrepresentname1, setGetrepresentname1] = useState('');
//   const getCHAData = () => {

//     axios
//       .get(`http://${ipaddress}externalparty/chadata/${companyid}/${branchId}`)
//       .then((response) => {
//         setAllCHA(response.data);
//         const namesMap = {};
//         response.data.forEach(party => {
//           namesMap[party.externaluserId] = party.userName;
//         });
//         setGetrepresentname1(namesMap);// Store the list in the state
//       })
//       .catch((error) => {
//       });
//   };

//   useEffect(() => {
//     getCHAData();
//   }, [companyid, branchId])

//   console.log('selectCHA ', selectCHA);

//   const [list2, setList2] = useState([]);
//   const [getalldatabyCHA, setGetalldatabyCHA] = useState([]);
//   const getdatabyallCHA = () => {
//     getdatabyallCHA1();
//     const date = formatDate1(new Date());
//     axios
//       .get(`http://${ipaddress}defaultparty/findimpcha1/${companyid}/${branchId}/${selectCHA}/${date}`)
//       .then((response) => {
//         if (response.data === 0 && list2.length === 0) {
//           toast.error("Data not found", {
//             autoClose: 700
//           })

//           return;
//         }
//         setGetalldatabyCHA(response.data);

//       })
//       .catch((error) => {
//       });
//   };

//   const getdatabyallCHA1 = () => {
//     const date = formatDate1(new Date());
//     axios
//       .get(`http://${ipaddress}defaultparty/findExpiredimpcha1/${companyid}/${branchId}/${selectCHA}/${date}`)
//       .then((response) => {


//         setList2(response.data);
//       })
//       .catch((error) => {
//         // Handle error
//       });
//   };




//   //party

//   const [searchbyparty, setSearchByparty] = useState([]);
//   const fetchData1 = useCallback(() => {
//     axios
//       .get(`http://${ipaddress}importsub/alllgddatabyparty/${companyid}/${branchId}/${logintypeid}`)
//       .then((response) => {
//         console.log("searchbyparty ", response.data);
//         setSearchByparty(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   }, [companyid, branchId]);

//   useEffect(() => {
//     fetchData1();
//   }, [fetchData1]);

//   const [searchFilters1, setSearchFilters1] = useState({
//     sirNo: '',
//     startDate: new Date(), // Initialize to null
//     endDate: new Date(), // Initialize to null
//     dgdcStatus: '',
//   });
//   const [filteredData1, setFilteredData1] = useState([]);



//   const handleStartDateChange1 = (date) => {
//     setSearchFilters1({
//       ...searchFilters1,
//       startDate: date,
//     });
//   };

//   const handleEndDateChange1 = (date) => {
//     setSearchFilters1({
//       ...searchFilters1,
//       endDate: date,
//     });
//   };

//   const handleFilterChange1 = (event) => {
//     const { name, value } = event.target;
//     setSearchFilters1((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };
//   console.log('searchbyparty ', filteredData1);

//   const handleSearch1 = () =>{
//     axios
//     .get(`http://${ipaddress}importsub/searchlgd?searchValue=${searchFilters1.sirNo}&companyid=${companyid}&branchId=${branchId}&dgdcStatus=${searchFilters1.dgdcStatus}&startDate=${convertToFormattedDate(searchFilters1.startDate)}&endDate=${convertToFormattedDate(searchFilters1.endDate)}&loginid=${logintypeid}&logintype=${logintype}`)
//     .then((response) => {
//       setFilteredData1(response.data);
//       if (filteredData1.length > 0) {
//         setCurrentPage1(1); // Reset the current page to 1

//       }
     
//       console.log('formData13453453 ', response.data);
//     })
//     .catch((error) => {
      
//       console.error("Error in search1 request:", error);
//       // Handle the error, e.g., display an error message to the user
//     });
//   }

//   const handleClear1 = () => {
//     setSearchFilters1({
//       sirNo: '',
//       startDate: new Date(),
//       endDate: new Date(),
//       dgdcStatus: '',
//     });
//   //  setFilteredData1([]);

//     handleSearch1();
//     fetchData1();
//   };


//   const [currentPage1, setCurrentPage1] = useState(1);
//   const [itemsPerPage1] = useState(10);

//   const indexOfLastItem1 = currentPage1 * itemsPerPage1;
//   const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
//   const currentItems1 = filteredData1.slice(indexOfFirstItem1, indexOfLastItem1);
//   const totalPages1 = Math.ceil(filteredData1.length / itemsPerPage1);

//   // Function to handle page change
//   const handlePageChange1 = (page) => {
//     if (page >= 1 && page <= totalPages1) {
//       setCurrentPage1(page);
//     }
//   };
//   const displayPages1 = () => {
//     const centerPageCount = 5;
//     const middlePage = Math.floor(centerPageCount / 2);
//     let startPage = currentPage1 - middlePage;
//     let endPage = currentPage1 + middlePage;

//     if (startPage < 1) {
//       startPage = 1;
//       endPage = Math.min(totalPages1, centerPageCount);
//     }

//     if (endPage > totalPages) {
//       endPage = totalPages;
//       startPage = Math.max(1, totalPages1 - centerPageCount + 1);
//     }

//     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//   };

//   useEffect(() => {
//     handleSearch1();

//   }, [searchbyparty])




//   // CHA


//   const [searchbyparty1, setSearchByparty1] = useState([]);
//   const fetchData2 = useCallback(() => {
//     axios
//       .get(`http://${ipaddress}importsub/alllgddatabycha/${companyid}/${branchId}/${logintypeid}`)
//       .then((response) => {
//         console.log("searchbyparty1 ", response.data);
//         setSearchByparty1(response.data); // Store the list in the state
//       })
//       .catch((error) => {
//         console.error("GET list error:", error);
//       });
//   }, [companyid, branchId, logintypeid]);


//   console.log("searchbyparty1 ", searchbyparty1);


//   useEffect(() => {
//     fetchData2();
//   }, [fetchData2]);

//   const [searchFilters2, setSearchFilters2] = useState({
//     sirNo: '',
//     startDate: new Date(), // Initialize to null
//     endDate: new Date(), // Initialize to null
//     dgdcStatus: '',
//   });


//   const [filteredData2, setFilteredData2] = useState([]);



//   const handleStartDateChange2 = (date) => {
//     setSearchFilters2({
//       ...searchFilters2,
//       startDate: date,
//     });
//   };

//   const handleEndDateChange2 = (date) => {
//     setSearchFilters2({
//       ...searchFilters2,
//       endDate: date,
//     });
//   };

//   const handleFilterChange2 = (event) => {
//     const { name, value } = event.target;
//     setSearchFilters2((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };


//   const handleSearch2 = () =>{
//     axios
//     .get(`http://${ipaddress}importsub/searchlgd?searchValue=${searchFilters2.sirNo}&companyid=${companyid}&branchId=${branchId}&dgdcStatus=${searchFilters2.dgdcStatus}&startDate=${convertToFormattedDate(searchFilters2.startDate)}&endDate=${convertToFormattedDate(searchFilters2.endDate)}&loginid=${logintypeid}&logintype=${logintype}`)
//     .then((response) => {
//       setFilteredData2(response.data);
//       if (filteredData2.length > 0) {
//         setCurrentPage2(1); // Reset the current page to 1

//       }
     
//       console.log('formData13453453 ', response.data);
//     })
//     .catch((error) => {
      
//       console.error("Error in search1 request:", error);
//       // Handle the error, e.g., display an error message to the user
//     });
//   }


//   console.log('filteredData2 ', filteredData2);

//   const handleClear2 = () => {
//     //setFilteredData2([]);
//     setSearchFilters2({
//       sirNo: '',
//       startDate: new Date(),
//       endDate: new Date(),
//       dgdcStatus: '',
//     });


//     handleSearch2();
//     fetchData2();
//   };
//   const [currentPage2, setCurrentPage2] = useState(1);

//   const [itemsPerPage2] = useState(10);

//   const indexOfLastItem2 = currentPage2 * itemsPerPage2;
//   const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
//   const currentItems2 = filteredData2.slice(indexOfFirstItem2, indexOfLastItem2);
//   const totalPages2 = Math.ceil(filteredData2.length / itemsPerPage2);

//   // Function to handle page change
//   const handlePageChange2 = (page) => {
//     if (page >= 1 && page <= totalPages2) {
//       setCurrentPage2(page);
//     }
//   };
//   const displayPages2 = () => {
//     const centerPageCount = 5;
//     const middlePage = Math.floor(centerPageCount / 2);
//     let startPage = currentPage2 - middlePage;
//     let endPage = currentPage2 + middlePage;

//     if (startPage < 1) {
//       startPage = 1;
//       endPage = Math.min(totalPages2, centerPageCount);
//     }

//     if (endPage > totalPages2) {
//       endPage = totalPages2;
//       startPage = Math.max(1, totalPages2 - centerPageCount + 1);
//     }

//     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//   };

//   useEffect(() => {
//     handleSearch2();

//   }, [searchbyparty1])



//   function formatDate1(date) {
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
//     const year = date.getFullYear().toString();

//     return `${year}-${month}-${day} 00:00:00`;
//   }
//   const checkloa = () => {
//     const date = formatDate1(new Date());
//     axios
//       .get(`http://${ipaddress}parties/checkloa/${companyid}/${branchId}/${getparty}/${date}`)
//       .then((response) => {
//         console.log('loa data ', response.data);
//         if (response.data === 'Y') {
//           toast.error("The LOA for the party has expired.", {
//             autoClose: 700
//           })
//           return;
//         }
//         else {
//           checkpartytohandover();
//         }
//       })
//       .catch((error) => {
//       });
//   }

//   const checkloa1 = (req, sir, importer) => {
//     const date = formatDate1(new Date());
//     axios
//       .get(`http://${ipaddress}parties/checkloa/${companyid}/${branchId}/${importer}/${date}`)
//       .then((response) => {
//         console.log('loa data ', response.data);
//         if (response.data === 'Y') {
//           // toast.error("The LOA for the party has expired.", {
//           //   autoClose: 700
//           // })
//           openModalforHandover("Y");
//           return;
//         }
//         else {
//           openModalforHandover(req, sir);
//         }
//       })
//       .catch((error) => {
//       });
//   }



//   const [currentPage5, setCurrentPage5] = useState(1);
//   const [itemsPerPage5] = useState(10);

//   const indexOfLastItem5 = currentPage5 * itemsPerPage5;
//   const indexOfFirstItem5 = indexOfLastItem5 - itemsPerPage5;
//   const currentItems5 = filteredData.slice(indexOfFirstItem5, indexOfLastItem5);
//   const totalPages5 = Math.ceil(filteredData.length / itemsPerPage5);

//   // Function to handle page change
//   const handlePageChange5 = (page) => {
//     if (page >= 1 && page <= totalPages5) {
//       setCurrentPage5(page);
//     }
//   };
//   const displayPages5 = () => {
//     const centerPageCount = 5;
//     const middlePage = Math.floor(centerPageCount / 2);
//     let startPage = currentPage5 - middlePage;
//     let endPage = currentPage5 + middlePage;

//     if (startPage < 1) {
//       startPage = 1;
//       endPage = Math.min(totalPages5, centerPageCount);
//     }

//     if (endPage > totalPages5) {
//       endPage = totalPages5;
//       startPage = Math.max(1, totalPages5 - centerPageCount + 1);
//     }

//     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//   };


//   const commonImportSub = (req, sir, flag) => {
//     axios.get(`http://${ipaddress}importsub/findBySeAndReq/${companyid}/${branchId}/${req}/${sir}`)
//       .then((response) => {
//         if (flag === 'view') {
//           setViewAll(response.data);
//         }
//         if (flag === 'history') {
//           setImpHistory(response.data);
//         }
//         if (flag === 'handover') {
//           setHandOverdata(response.data);
//         }
//         if (flag === 'edit') {
//           setUpdateData(response.data);
//         }
//         if (flag === 'penalty') {
//           setPenaltydetail(response.data);
//         }
//         if (flag === 'delivery') {
//           setDeliverydata(response.data);
//         }
//       })
//       .catch((error) => {
//         console.log("Something went wrong");
//       })
//   }

//   return (
//     <div>
//         {logintype === 'Party' ? (
//         <div className="container">
//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-50px' }} > <FontAwesomeIcon
//             icon={faListAlt}
//             style={{
//               marginRight: '8px',
//               color: 'black', // Set the color to golden
//             }}
//           /> Subcontract LGD Import List</h5>

//           <Card style={{ backgroundColor: "#F8F8F8" }}>
//             <CardBody>

//               <Form>

//                 <Row>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label className="forlabel" for="branchId">Search By</Label>
//                       <Input
//                         type="text"
//                         name="sirNo"
//                         id="branchname"
//                         value={searchFilters1.sirNo}
//                         onChange={handleFilterChange1}
//                         className="inputField"
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label for="status" className="forlabel">Date</Label>
//                       <DatePicker
//                         selected={searchFilters1.startDate}
//                         onChange={handleStartDateChange1}
//                         dateFormat="dd/MM/yyyy"
//                         className="form-control border-right-0 inputField"
//                         customInput={<input style={{ width: '100%' }} />}
//                         wrapperClassName="custom-react-datepicker-wrapper"
//                       />

//                     </FormGroup>
//                   </Col>
//                   < Col md={3}>
//                     <FormGroup>
//                       <Label for="status" className="forlabel">&nbsp;</Label>


//                       <DatePicker
//                         selected={searchFilters1.endDate}
//                         onChange={handleEndDateChange1}
//                         dateFormat="dd/MM/yyyy"
//                         className="form-control border-right-0 inputField"
//                         customInput={<input style={{ width: '100%' }} />}
//                         wrapperClassName="custom-react-datepicker-wrapper"
//                       />


//                     </FormGroup>
//                   </Col>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label for="status" className="forlabel">DGDC Status</Label>
//                       <select
//                         id="hold"
//                         className="form-control form-select"
//                         required
//                         name="dgdcStatus"
//                         value={searchFilters1.dgdcStatus}
//                         onChange={handleFilterChange1}
//                       >
//                         <option value="">Select DGDC status</option>
//                         {JarListDtl.map((data, index) => (

//                           <option key={index} >{data.jarDtlDesc}</option>
//                         ))}
//                       </select>
//                     </FormGroup>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col className="text-center">
//                     <Button onClick={handleSearch1} type="button" className="" variant="outline-primary" style={{ marginTop: '10px' }}>
//                       <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
//                       Search
//                     </Button>
//                     <Button onClick={handleClear1} type="button" variant="outline-danger" style={{ marginLeft: '10px', marginTop: '10px' }} >
//                       <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
//                       Reset
//                     </Button>
//                   </Col>
//                 </Row>
//               </Form>


//               <div className="table-responsive mt-4">
//                 <Table className="table table-striped table-hover">
//                   <thead>
//                     <tr>
//                       <th style={{ backgroundColor: '#BADDDA' }} >Sr.No.</th>
//                       <th style={{ backgroundColor: '#BADDDA' }} >SIR No</th>
//                       <th style={{ backgroundColor: '#BADDDA' }} >SIR Date</th>
//                       <th style={{ backgroundColor: '#BADDDA' }} >Request Id</th>
//                       <th style={{ backgroundColor: '#BADDDA' }} >Importer</th>
//                       <th style={{ backgroundColor: '#BADDDA' }} >NOP</th>
//                       <th style={{ backgroundColor: '#BADDDA' }} >Re-Entry Date</th>
//                       <th style={{ backgroundColor: '#BADDDA' }} >Passed-In Net Wt</th>
//                       <th style={{ backgroundColor: '#BADDDA' }} >NSDL Status</th>
//                       <th style={{ backgroundColor: '#BADDDA' }} >DGDC Status</th>
//                       <th style={{ backgroundColor: '#BADDDA' }} >Action</th>
//                     </tr>
//                     <tr>
//                       <th style={{ backgroundColor: '#BADDDA' }} className="text-center">Total</th>
//                       <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                       <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                       <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData1.map((item) => item[0]).length}</th>
//                       <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                       <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData1.reduce((total, item) => total + item[4], 0)}</th>
//                       <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                       <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                       <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                       <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                       <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>

//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentItems1.map((data, index) => (
//                       <tr key={index}>
//                         <td>{((currentPage1 - 1) * itemsPerPage1) + index + 1}</td>
//                         <td>{data[0]}</td>
//                               <td>{formatDateTime(data[1])}</td>
//                               <td>{data[2]}</td>
//                               <td >{getpartyId[data[3]]}</td>
//                               <td>{data[4]}</td>
//                               <td>{formatDateTime(data[5])}</td>
//                               <td>{data[6]}({data[7]})</td>
//                               <td>{data[8]}</td>
//                               <td className="table-column" style={{ flexDirection: 'column', alignItems: 'center' }}>
//                                 <span>{data[9]}</span>
//                                 <div style={{ display: 'flex', flexDirection: 'row' }}>
//                                   {data[11] === "Y" ? (
//                                     <p className="orangeText" title="MOP OUT">MOP OUT</p>
//                                   ) : null}

//                                   {data[10] === "FWD_OUT" ? (
//                                     <FaArrowAltCircleRight size={22} fill="orange" style={{ marginRight: '10px' }} />
//                                   ) : null}
//                                   {data[10] === "FWD_IN" ? (
//                                     <FaArrowAltCircleLeft size={22} fill="orange" style={{ marginRight: '10px' }} />
//                                   ) : null}

//                                 </div>

//                               </td>
//                         <td className="table-column" style={{ marginRight: '5px' }} >
//                           <div className="">
//                             <button
//                               type="button"
//                               className="btn btn-primary dropdown-toggle"
//                               data-bs-toggle="dropdown"
//                               aria-expanded="false"
//                             >
//                               <FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
//                               Action
//                             </button>
//                             <ul className="dropdown-menu">
//                               <li>
//                                 <button className="dropdown-item" onClick={() => openModalforViewall(data[2], data[0])}>
//                                   <FontAwesomeIcon icon={faUsersViewfinder} style={{ marginRight: '5px' }} />View All Details
//                                 </button>
//                               </li>
//                               <li>
//                                 <button className="dropdown-item" onClick={() => openModalforHistory(data[2], data[0])}>
//                                   <FontAwesomeIcon icon={faHistory} style={{ marginRight: '5px' }} />View Import History
//                                 </button>
//                               </li>

//                             </ul>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}

//                   </tbody>

//                 </Table>
//               </div>
//               <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//                 <Pagination.First onClick={() => handlePageChange1(1)} />
//                 <Pagination.Prev
//                   onClick={() => handlePageChange1(currentPage1 - 1)}
//                   disabled={currentPage1 === 1}
//                 />
//                 <Pagination.Ellipsis />

//                 {displayPages1().map((pageNumber) => (
//                   <Pagination.Item
//                     key={pageNumber}
//                     active={pageNumber === currentPage1}
//                     onClick={() => handlePageChange1(pageNumber)}
//                   >
//                     {pageNumber}
//                   </Pagination.Item>
//                 ))}

//                 <Pagination.Ellipsis />
//                 <Pagination.Next
//                   onClick={() => handlePageChange1(currentPage1 + 1)}
//                   disabled={currentPage1 === totalPages1}
//                 />
//                 <Pagination.Last onClick={() => handlePageChange1(totalPages1)} />
//               </Pagination>
//             </CardBody>
//           </Card>
//         </div >
//       )
//         :
//         (

//           logintype === 'CHA' ? (
//             <div className="container">
//               <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-50px' }} > <FontAwesomeIcon
//                 icon={faListAlt}
//                 style={{
//                   marginRight: '8px',
//                   color: 'black', // Set the color to golden
//                 }}
//               /> Subcontract LGD Import List</h5>

//               <Card style={{ backgroundColor: "#F8F8F8" }}>
//                 <CardBody>

//                   <Form>

//                     <Row>
//                       <Col md={3}>
//                         <FormGroup>
//                           <Label className="forlabel" for="branchId">Search By</Label>
//                           <Input
//                             type="text"
//                             name="sirNo"
//                             id="branchname"
//                             value={searchFilters2.sirNo}
//                             onChange={handleFilterChange2}
//                             className="inputField"
//                           />
//                         </FormGroup>
//                       </Col>
//                       <Col md={3}>
//                         <FormGroup>
//                           <Label for="status" className="forlabel">Date</Label>
//                           <DatePicker
//                             selected={searchFilters2.startDate}
//                             onChange={handleStartDateChange2}
//                             dateFormat="dd/MM/yyyy"
//                             className="form-control border-right-0 inputField"
//                             customInput={<input style={{ width: '100%' }} />}
//                             wrapperClassName="custom-react-datepicker-wrapper"
//                           />

//                         </FormGroup>
//                       </Col>
//                       < Col md={3}>
//                         <FormGroup>
//                           <Label for="status" className="forlabel">&nbsp;</Label>


//                           <DatePicker
//                             selected={searchFilters2.endDate}
//                             onChange={handleEndDateChange2}
//                             dateFormat="dd/MM/yyyy"
//                             className="form-control border-right-0 inputField"
//                             customInput={<input style={{ width: '100%' }} />}
//                             wrapperClassName="custom-react-datepicker-wrapper"
//                           />


//                         </FormGroup>
//                       </Col>
//                       <Col md={3}>
//                         <FormGroup>
//                           <Label for="status" className="forlabel">DGDC Status</Label>
//                           <select
//                             id="hold"
//                             className="form-control form-select"
//                             required
//                             name="dgdcStatus"
//                             value={searchFilters2.dgdcStatus}
//                             onChange={handleFilterChange2}
//                           >
//                             <option value="">Select DGDC status</option>
//                             {JarListDtl.map((data, index) => (

//                               <option key={index} >{data.jarDtlDesc}</option>
//                             ))}
//                           </select>
//                         </FormGroup>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col className="text-center">
//                         <Button onClick={handleSearch2} type="button" className="" variant="outline-primary" style={{ marginTop: '10px' }}>
//                           <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
//                           Search
//                         </Button>
//                         <Button onClick={handleClear2} type="button" variant="outline-danger" style={{ marginLeft: '10px', marginTop: '10px' }} >
//                           <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
//                           Reset
//                         </Button>
//                       </Col>
//                     </Row>
//                   </Form>


//                   <div className="table-responsive mt-4">
//                     <Table className="table table-striped table-hover">
//                       <thead>
//                         <tr>
//                           <th style={{ backgroundColor: '#BADDDA' }} >Sr.No.</th>
//                           <th style={{ backgroundColor: '#BADDDA' }} >SIR No</th>
//                           <th style={{ backgroundColor: '#BADDDA' }} >SIR Date</th>
//                           <th style={{ backgroundColor: '#BADDDA' }} >Request Id</th>
//                           <th style={{ backgroundColor: '#BADDDA' }} >Importer</th>
//                           <th style={{ backgroundColor: '#BADDDA' }} >NOP</th>
//                           <th style={{ backgroundColor: '#BADDDA' }} >Re-Entry Date</th>
//                           <th style={{ backgroundColor: '#BADDDA' }} >Passed-In Net Wt</th>
//                           <th style={{ backgroundColor: '#BADDDA' }} >NSDL Status</th>
//                           <th style={{ backgroundColor: '#BADDDA' }} >DGDC Status</th>
//                           <th style={{ backgroundColor: '#BADDDA' }} >Action</th>
//                         </tr>
//                         <tr>
//                           <th style={{ backgroundColor: '#BADDDA' }} className="text-center">Total</th>
//                           <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                           <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                           <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData2.map((item) => item[0]).length}</th>
//                           <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                           <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData2.reduce((total, item) => total + item[4], 0)}</th>
//                           <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                           <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                           <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                           <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                           <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>

//                         </tr>
//                       </thead>
//                       <tbody>
//                         {currentItems2.map((data, index) => (
//                           <tr key={index}>
//                             <td>{((currentPage2 - 1) * itemsPerPage2) + index + 1}</td>
//                             <td>{data[0]}</td>
//                               <td>{formatDateTime(data[1])}</td>
//                               <td>{data[2]}</td>
//                               <td >{getpartyId[data[3]]}</td>
//                               <td>{data[4]}</td>
//                               <td>{formatDateTime(data[5])}</td>
//                               <td>{data[6]}({data[7]})</td>
//                               <td>{data[8]}</td>
//                               <td className="table-column" style={{ flexDirection: 'column', alignItems: 'center' }}>
//                                 <span>{data[9]}</span>
//                                 <div style={{ display: 'flex', flexDirection: 'row' }}>
//                                   {data[11] === "Y" ? (
//                                     <p className="orangeText" title="MOP OUT">MOP OUT</p>
//                                   ) : null}

//                                   {data[10] === "FWD_OUT" ? (
//                                     <FaArrowAltCircleRight size={22} fill="orange" style={{ marginRight: '10px' }} />
//                                   ) : null}
//                                   {data[10] === "FWD_IN" ? (
//                                     <FaArrowAltCircleLeft size={22} fill="orange" style={{ marginRight: '10px' }} />
//                                   ) : null}

//                                 </div>

//                               </td>
//                             <td className="table-column" style={{ marginRight: '5px' }} >
//                               <div className="">
//                                 <button
//                                   type="button"
//                                   className="btn btn-primary dropdown-toggle"
//                                   data-bs-toggle="dropdown"
//                                   aria-expanded="false"
//                                 >
//                                   <FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
//                                   Action
//                                 </button>
//                                 <ul className="dropdown-menu">
//                                   <li>
//                                     <button className="dropdown-item" onClick={() => openModalforViewall(data[2], data[0])}>
//                                       <FontAwesomeIcon icon={faUsersViewfinder} style={{ marginRight: '5px' }} />View All Details
//                                     </button>
//                                   </li>
//                                   <li>
//                                     <button className="dropdown-item" onClick={() => openModalforHistory(data[2], data[0])}>
//                                       <FontAwesomeIcon icon={faHistory} style={{ marginRight: '5px' }} />View Import History
//                                     </button>
//                                   </li>

//                                 </ul>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}

//                       </tbody>

//                     </Table>
//                   </div>
//                   <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//                     <Pagination.First onClick={() => handlePageChange2(1)} />
//                     <Pagination.Prev
//                       onClick={() => handlePageChange2(currentPage2 - 1)}
//                       disabled={currentPage2 === 1}
//                     />
//                     <Pagination.Ellipsis />

//                     {displayPages2().map((pageNumber) => (
//                       <Pagination.Item
//                         key={pageNumber}
//                         active={pageNumber === currentPage2}
//                         onClick={() => handlePageChange2(pageNumber)}
//                       >
//                         {pageNumber}
//                       </Pagination.Item>
//                     ))}

//                     <Pagination.Ellipsis />
//                     <Pagination.Next
//                       onClick={() => handlePageChange2(currentPage2 + 1)}
//                       disabled={currentPage2 === totalPages2}
//                     />
//                     <Pagination.Last onClick={() => handlePageChange2(totalPages2)} />
//                   </Pagination>
//                 </CardBody>
//               </Card>
//             </div >
//           )
//             :
//             (

//               <div className="container">
//                 <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-50px' }} > <FontAwesomeIcon
//                   icon={faListAlt}
//                   style={{
//                     marginRight: '8px',
//                     color: 'black', // Set the color to golden
//                   }}
//                 /> Subcontract LGD Import List</h5>
//                 {loading && (
//                   <div style={styles.overlay}>
//                     <ReactLoading type="spin" color="#0000FF" height={300} width={80} />
//                   </div>
//                 )}
//                 <Card style={{ backgroundColor: "#F8F8F8" }}>
//                   <CardBody>

//                     <Form>
//                       <Row>

//                         <Col>

//                           <DropdownButton
//                             title={
//                               <span>
//                                 <FontAwesomeIcon icon={faAtom} /> Action
//                               </span>
//                             }
//                             style={{ float: 'right' }}
//                             variant="outline-success"
//                           >
//                             <Dropdown.Item onClick={openModalforreqid}> <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />Add New Import</Dropdown.Item>
//                             <Dropdown.Item onClick={openModalforMultiplehandover}> <FontAwesomeIcon icon={faArrowTurnRight} style={{ marginRight: "5px" }} />Handover to Party/CHA</Dropdown.Item>

//                           </DropdownButton>
//                         </Col>
//                         {/* <Col>
//                   <DropdownButton
//                     title='Action'
//                     style={{ float: 'right' }}
//                     variant="danger"
//                   >
//                     <Dropdown.Item onClick={openModalforreqid}>Add New</Dropdown.Item>
//                   </DropdownButton>
//                 </Col> */}
//                       </Row>
//                       <hr />
//                       <Row>
//                         <Col md={3}>
//                           <FormGroup>
//                             <Label className="forlabel" for="branchId">Search By</Label>
//                             <Input
//                               type="text"
//                               name="sirNo"
//                               id="branchname"
//                               value={searchFilters.sirNo}
//                               onChange={handleFilterChange}
//                               className="inputField"
//                             />
//                           </FormGroup>
//                         </Col>
//                         <Col md={3}>
//                           <FormGroup>
//                             <Label for="status" className="forlabel">Date</Label>
//                             <DatePicker
//                               selected={searchFilters.startDate}
//                               onChange={handleStartDateChange}
//                               dateFormat="dd/MM/yyyy"
//                               className="form-control border-right-0 inputField"
//                               customInput={<input style={{ width: '100%' }} />}
//                               wrapperClassName="custom-react-datepicker-wrapper"
//                             />








//                             {/* 
//                     <Input
//                       type="date"
//                       name="startDate"
//                       id="status"
//                       className="inputField"
//                       // defaultValue={today}
//                       value={searchFilters.startDate}
//                       onChange={handleFilterChange}
//                     /> */}
//                           </FormGroup>
//                         </Col>
//                         < Col md={3}>
//                           <FormGroup>
//                             <Label for="status" className="forlabel">&nbsp;</Label>


//                             <DatePicker
//                               selected={searchFilters.endDate}
//                               onChange={handleEndDateChange}
//                               dateFormat="dd/MM/yyyy"
//                               className="form-control border-right-0 inputField"
//                               customInput={<input style={{ width: '100%' }} />}
//                               wrapperClassName="custom-react-datepicker-wrapper"
//                             />










//                             {/* 
//                     <Input
//                       type="date"
//                       name="endDate"
//                       id="status"
//                       className="inputField"
//                       // defaultValue={today}
//                       value={searchFilters.endDate}
//                       onChange={handleFilterChange}
//                     /> */}
//                           </FormGroup>
//                         </Col>
//                         <Col md={3}>
//                           <FormGroup>
//                             <Label for="status" className="forlabel">DGDC Status</Label>
//                             <select
//                               id="hold"
//                               className="form-control form-select"
//                               required
//                               name="dgdcStatus"
//                               value={searchFilters.dgdcStatus}
//                               onChange={handleFilterChange}
//                             >
//                               <option value="">Select DGDC status</option>
//                               {JarListDtl.map((data, index) => (

//                                 <option key={index} >{data.jarDtlDesc}</option>
//                               ))}
//                             </select>
//                           </FormGroup>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col className="text-center">
//                           {/* <Button onClick={search1} type="button" className="" variant="outline-primary" style={{ marginTop: '10px' }}>
//                             <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
//                             Search
//                           </Button>
//                           <Button onClick={handleClear} type="button" variant="outline-danger" style={{ marginLeft: '10px', marginTop: '10px' }} >
//                             <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
//                             Reset
//                           </Button> */}

//                        <Button onClick={(e) => {search1(searchFilters);setCurrentPageFun();}} type="button" className="" variant="outline-primary" style={{ marginTop: '10px' }}>
//                             <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
//                             Search
//                           </Button>
//                           <Button onClick={handleClear} type="button" variant="outline-danger" style={{ marginLeft: '10px', marginTop: '10px' }} >
//                             <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
//                             Reset
//                           </Button>


                          
//                         </Col>
//                       </Row>
//                     </Form>


//                     <div className="table-responsive mt-4">
//                       <Table className="table table-striped table-hover">
//                         <thead>
//                           <tr>
//                             <th style={{ backgroundColor: '#BADDDA' }} >Sr.No.</th>
//                             <th style={{ backgroundColor: '#BADDDA' }} >SIR No</th>
//                             <th style={{ backgroundColor: '#BADDDA' }} >SIR Date</th>
//                             <th style={{ backgroundColor: '#BADDDA' }} >Request Id</th>
//                             <th style={{ backgroundColor: '#BADDDA' }} >Importer</th>
//                             <th style={{ backgroundColor: '#BADDDA' }} >NOP</th>
//                             <th style={{ backgroundColor: '#BADDDA' }} >Re-Entry Date</th>
//                             <th style={{ backgroundColor: '#BADDDA' }} >Passed-In Net Wt</th>
//                             <th style={{ backgroundColor: '#BADDDA' }} >NSDL Status</th>
//                             <th style={{ backgroundColor: '#BADDDA' }} >DGDC Status</th>
//                             <th style={{ backgroundColor: '#BADDDA' }} >Action</th>
//                           </tr>
//                           <tr>
//                             <th style={{ backgroundColor: '#BADDDA' }} className="text-center">Total</th>
//                             <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                             <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                             <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData.map((item) => item[2]).length}</th>
//                             <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                             <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData.reduce((total, item) => total + item[4], 0)}</th>
//                             <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                             <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                             <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                             <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
//                             <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>

//                           </tr>
//                         </thead>
//                         <tbody>
//                           {currentItems5.map((data, index) => (
//                             <tr key={index}>
//                               <td>{((currentPage5 - 1) * itemsPerPage5) + index + 1}</td>
//                               <td>{data[0]}</td>
//                               <td>{formatDateTime(data[1])}</td>
//                               <td>{data[2]}</td>
//                               <td >{getpartyId[data[3]]}</td>
//                               <td>{data[4]}</td>
//                               <td>{formatDateTime(data[5])}</td>
//                               <td>{data[6]}({data[7]})</td>
//                               <td>{data[8]}</td>
//                               <td className="table-column" style={{ flexDirection: 'column', alignItems: 'center' }}>
//                                 <span>{data[9]}</span>
//                                 <div style={{ display: 'flex', flexDirection: 'row' }}>
//                                   {data[11] === "Y" ? (
//                                     <p className="orangeText" title="MOP OUT">MOP OUT</p>
//                                   ) : null}

//                                   {data[10] === "FWD_OUT" ? (
//                                     <FaArrowAltCircleRight size={22} fill="orange" style={{ marginRight: '10px' }} />
//                                   ) : null}
//                                   {data[10] === "FWD_IN" ? (
//                                     <FaArrowAltCircleLeft size={22} fill="orange" style={{ marginRight: '10px' }} />
//                                   ) : null}

//                                 </div>

//                               </td>
//                               <td className="table-column" style={{ marginRight: '5px' }} >
//                                 <div className="">
//                                   <button
//                                     type="button"
//                                     className="btn btn-primary dropdown-toggle"
//                                     data-bs-toggle="dropdown"
//                                     aria-expanded="false"
//                                   >
//                                     <FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
//                                     Action
//                                   </button>
//                                   <ul className="dropdown-menu">
//                                     <li>
//                                       <button className="dropdown-item" onClick={() => openModalforViewall(data[2], data[0])}>
//                                         <FontAwesomeIcon icon={faUsersViewfinder} style={{ marginRight: '5px' }} />View All Details
//                                       </button>
//                                     </li>
//                                     <li>
//                                       <button className="dropdown-item" onClick={() => openModalforHistory(data[2], data[0])}>
//                                         <FontAwesomeIcon icon={faHistory} style={{ marginRight: '5px' }} />View Import History
//                                       </button>
//                                     </li>
//                                     {data[9] === 'Handed over to DGDC SEEPZ' && (data[8] === 'Passed In Full' || data[8] === 'Passed In Partial') && data[10] !== 'FWD_OUT' && (
//                                       <li>
//                                         <button className="dropdown-item" hidden={data[9] === 'Handed over to Party/CHA'} onClick={() => checkloa1(data[2], data[0], data[3])}>
//                                           <FontAwesomeIcon icon={faHandHoldingHand} style={{ marginRight: '5px' }} />Handover to Party / CHA
//                                         </button>
//                                       </li>
//                                     )}
//                                     <li>
//                                       <button className="dropdown-item" onClick={() => openModalforreqidUpdate(data[2], data[0])}>
//                                         <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />Modify
//                                       </button>
//                                     </li>
//                                     <li>
//                                       <button className="dropdown-item" onClick={() => { printBarcode(data[2], data[0], data[4], data[1], data[12], "N", "1232", data[13]) }}>
//                                         <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />Print SIR Tag
//                                       </button>
//                                     </li>
//                                     {data[9] === 'Handed over to DGDC SEEPZ' && (
//                                       <li>
//                                         <button className="dropdown-item" onClick={() => openModalforpenalty(data[2], data[0])}>
//                                           <FontAwesomeIcon icon={faGavel} style={{ marginRight: '5px' }} />Impose Penalty
//                                         </button>
//                                       </li>
//                                     )}
//                                     <li>
//                                       <button className="dropdown-item" onClick={() => openModalfordeliveryupdate(data[2], data[0])}>
//                                         <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />Delivery Update
//                                       </button>
//                                     </li>
//                                   </ul>
//                                 </div>
//                               </td>
//                             </tr>
//                           ))}

//                         </tbody>

//                       </Table>
//                     </div>
//                     <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//                       <Pagination.First onClick={() => handlePageChange5(1)} />
//                       <Pagination.Prev
//                         onClick={() => handlePageChange5(currentPage5 - 1)}
//                         disabled={currentPage5 === 1}
//                       />
//                       <Pagination.Ellipsis />

//                       {displayPages5().map((pageNumber) => (
//                         <Pagination.Item
//                           key={pageNumber}
//                           active={pageNumber === currentPage5}
//                           onClick={() => handlePageChange5(pageNumber)}
//                         >
//                           {pageNumber}
//                         </Pagination.Item>
//                       ))}

//                       <Pagination.Ellipsis />
//                       <Pagination.Next
//                         onClick={() => handlePageChange5(currentPage5 + 1)}
//                         disabled={currentPage5 === totalPages5}
//                       />
//                       <Pagination.Last onClick={() => handlePageChange5(totalPages5)} />
//                     </Pagination>
//                   </CardBody>
//                 </Card>
//               </div >
//             )
//         )
//       }






//       {/* For Add requestId model */}
//       <Modal Modal isOpen={isModalOpen} onClose={closeModalforReqid} toggle={closeModalforReqid} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
//       } >
//         <ModalHeader toggle={closeModalforReqid} style={{
//           backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//           boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//           border: '1px solid rgba(0, 0, 0, 0.3)',
//           borderRadius: '0',
//           backgroundColor: '#85144b',
//           backgroundColor: 'rgba(0, 0, 0, 0.3)',
//           backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           //backgroundPosition: 'center',
//           backgroundPosition: 'center',
//         }} >
//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
//             icon={faFileClipboard}
//             style={{
//               marginRight: '8px',
//               color: 'black', // Set the color to golden
//             }}
//           /> Subcontract LGD Import Entry</h5>

//         </ModalHeader>
//         <ModalBody>
//           <Row>
//             <Col sm={9}>
//               <FormGroup>
//                 <Label className="forlabel" for="branchId">Request Id</Label>
//                 <Input
//                   type="text"
//                   name="branchname"
//                   id="branchname"
//                   onChange={getsearchreqid}
//                   maxLength={30}
//                   className="inputField"
//                 />
//               </FormGroup>
//             </Col>
//             <Col style={{ marginTop: '30px' }}>
//               <Button variant="outline-primary" onClick={() => fetchDataforcrosscheck(getreqidd)}>
//                 <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
//                 Search
//               </Button>
//             </Col>
//           </Row>

//           {isDivVisible && (
//             <div style={{ backgroundColor: "#F8F8F8" }}>
//               <hr />
//               <form >
//                 <Row>
//                   <Col>
//                     <FormGroup>
//                       <Label className="forlabel" for="branchId">Request Id</Label>
//                       <Input
//                         type="text"
//                         name="requestId"
//                         id="requestId"
//                         className="inputField"
//                         onChange={handleInputChange}
//                         maxLength={30}
//                         required
//                         readOnly
//                         value={data.requestId}
//                       />

//                     </FormGroup>
//                   </Col>
//                   <Col>
//                     <FormGroup>
//                       <Label className="forlabel" for="branchId">Import Type</Label>
//                       {/* <Input
//                         type="text"
//                         name="importType"
//                         id="branchname"
//                         className="inputField"
//                         onChange={handleInputChange}
//                         maxLength={20}
//                         required
//                         readOnly
//                         value={data.importType}
//                       /> */}
//                       <select
//                         id="importType"
//                         className="form-control form-select"
//                         onChange={handleInputChange}
//                         required
//                         name="importType"
//                         value={data.importType}
//                       >
//                         <option value="LGD">LGD</option>
//                         <option value="Zone to Zone">Zone to Zone</option>
//                       </select>
//                     </FormGroup>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col >
//                     <FormGroup>
//                       <Label for="search" className="forlabel">Select Importer</Label>
//                       <select
//                         id="exporter"
//                         className="form-control form-select"
//                         onChange={handleInputChange}
//                         required
//                         name="exporter"
//                         value={data.exporter}
//                       >
//                         <option value="">Select importer</option>
//                         {partys.map((data, index) => (
//                           <option key={index} value={data.partyId}>{data.partyName}</option>
//                         ))}
//                       </select>
//                       <div style={{ color: 'red' }} className="error-message">{formErrors.exporter}</div>

//                     </FormGroup>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label className="forlabel" for="branchId">Exporter Name</Label>
//                       <Input
//                         type="text"
//                         name="exporterName"
//                         id="exporterName"
//                         maxLength={100}
//                         required
//                         onChange={handleInputChange}
//                         className="inputField"
//                         value={data.exporterName}
//                       />
//                       <div style={{ color: 'red' }} className="error-message">{formErrors.exporterName}</div>

//                     </FormGroup>
//                   </Col>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label className="forlabel" for="branchId">Import Date</Label>

//                       <DatePicker
//                         selected={data.exporterDate} // Set the selected date to BillGDate
//                         onChange={(date) => {
//                           if (date) {
//                             setData({ ...data, exporterDate: date });
//                           } else {
//                             setData({ ...data, exporterDate: null });
//                           }
//                         }}
//                         dateFormat="dd/MM/yyyy"
//                         value={data.exporterDate}
//                         className="form-control border-right-0 inputField"
//                         customInput={<input style={{ width: '100%' }} />}
//                         wrapperClassName="custom-react-datepicker-wrapper"
//                         maxDate={today}

//                       />



//                       {/* <Input
//                         type="date"
//                         name="challanDate"
//                         id="status"
//                         required
//                         max={today}
//                         onKeyDown={handleKeyDown}
//                         onChange={handleInputChange}
//                         className="inputField"
//                         value={data.challanDate}
//                       /> */}
//                     </FormGroup>
//                   </Col>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label className="forlabel" for="branchId">Invoice No</Label>
//                       <Input
//                         type="text"
//                         name="invoiceNo"
//                         id="invoiceNo"
//                         required
//                         onChange={handleInputChange}
//                         maxLength={30}
//                         className="inputField"
//                         value={data.invoiceNo}
//                       />
//                       <div style={{ color: 'red' }} className="error-message">{formErrors.invoiceNo}</div>

//                     </FormGroup>
//                   </Col>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label className="forlabel" for="branchId">Invoice Date</Label>

//                       <DatePicker
//                         selected={data.invoiceDate} // Set the selected date to BillGDate
//                         onChange={(date) => {
//                           if (date) {
//                             setData({ ...data, invoiceDate: date });
//                           } else {
//                             setData({ ...data, invoiceDate: null });
//                           }
//                         }}
//                         dateFormat="dd/MM/yyyy"
//                         value={data.invoiceDate}
//                         className="form-control border-right-0 inputField"
//                         customInput={<input style={{ width: '100%' }} />}
//                         wrapperClassName="custom-react-datepicker-wrapper"
//                         maxDate={today}

//                       />








//                       {/* <Input
//                         type="date"
//                         name="invoiceDate"
//                         id="status"
//                         required
//                         max={today}
//                         onKeyDown={handleKeyDown}
//                         onChange={handleInputChange}
//                         className="inputField"
//                         value={data.invoiceDate}
//                       /> */}
//                     </FormGroup>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label className="forlabel" for="branchId">No of packages</Label>
//                       <Input
//                         type="text"
//                         name="nop"
//                         required
//                         onChange={handleInputChange}
//                         id="nop"
//                         className="inputField"
//                         value={data.nop}
//                       />
//                       <div style={{ color: 'red' }} className="error-message">{formErrors.nop}</div>

//                     </FormGroup>
//                   </Col>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label className="forlabel" for="branchId">Net weight</Label>
//                       <Input
//                         type="text"
//                         name="netWeight"
//                         id="netWeight"
//                         required
//                         onChange={handleInputChange}
//                         className="inputField"
//                         maxLength={15}
//                         value={data.netWeight}
//                       />
//                       <div style={{ color: 'red' }} className="error-message">{formErrors.netWeight}</div>

//                     </FormGroup>
//                   </Col>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label className="forlabel" for="branchId">Net weight unit</Label>
//                       <Input
//                         type="text"
//                         name="netWeightUnit"
//                         id="branchname"
//                         required
//                         onChange={handleInputChange}
//                         maxLength={20}
//                         className="inputField"
//                         value={data.netWeightUnit}
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label className="forlabel" for="branchId">Product value</Label>
//                       <Input
//                         type="text"
//                         name="productValue"
//                         id="branchname"
//                         onChange={handleInputChange}
//                         maxLength={15}
//                         required
//                         className="inputField"
//                         value={data.productValue}
//                       />
//                     </FormGroup>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col md={3}>
//                     <FormGroup>
//                       <Label className="forlabel" for="branchId">Currency</Label>
//                       <Input
//                         type="text"
//                         name="currency"
//                         id="branchname"
//                         required
//                         onChange={handleInputChange}
//                         className="inputField"
//                         maxLength={15}
//                         value={data.currency}
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col md={9}>
//                     <FormGroup>
//                       <Label className="forlabel" for="branchId">Remarks</Label>
//                       <Input
//                         type="textarea"
//                         name="remarks"
//                         id="branchname"
//                         onChange={handleInputChange}
//                         maxLength={255}
//                         className="inputField"
//                         value={data.remarks}
//                       />
//                     </FormGroup>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col className="text-center" >




//                     <Button
//                       type="button"
//                       id="submitBtn"
//                       className="allbutton"
//                       variant="outline-success"
//                       onClick={handleSubmit}
//                       style={{ marginRight: 5 }}
//                     >
//                       <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
//                       Submit
//                     </Button>
//                     {/* <Button onClick={handleSubmit} variant="danger">
//                       <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
//                       SUBMIT
//                     </Button> */}
//                   </Col>
//                 </Row>
//               </form>
//             </div>
//           )}
//         </ModalBody>
//       </Modal >




//       {/* For Update requestId model */}
//       <Modal Modal isOpen={isModalOpenforupdate} onClose={closeModalforReqidforupdate} toggle={closeModalforReqidforupdate} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
//       } >
//         <ModalHeader toggle={closeModalforReqidforupdate} style={{
//           backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//           boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//           border: '1px solid rgba(0, 0, 0, 0.3)',
//           borderRadius: '0',
//           backgroundColor: '#85144b',
//           backgroundColor: 'rgba(0, 0, 0, 0.3)',
//           backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           //backgroundPosition: 'center',
//           backgroundPosition: 'center',
//         }}   >
//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
//             icon={faListCheck}
//             style={{
//               marginRight: '8px',
//               color: 'black', // Set the color to golden
//             }}
//           />Modify Subcontract Import Details</h5>

//         </ModalHeader>


//         <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>


//           <form >
//             <Row>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Request Id</Label>
//                   <Input
//                     type="text"
//                     name="requestId"
//                     id="requestId"
//                     readOnly
//                     className="inputField"
//                     onChange={handleUpdateInputChange}
//                     maxLength={30}
//                     value={updatedata.requestId}
//                   />
//                   <div style={{ color: 'red' }} className="error-message">{formErrors.requestId}</div>

//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Import Type</Label>
//                   {/* <Input
//                     type="text"
//                     name="importType"
//                     id="branchname"
//                     className="inputField"
//                     required
//                     maxLength={20}
//                     onChange={handleUpdateInputChange}
//                     value={updatedata.importType}
//                     readOnly
//                   /> */}

//                   <select
//                     id="importType"
//                     className="form-control form-select"
//                     onChange={handleUpdateInputChange}
//                     required
//                     name="importType"
//                     value={updatedata.importType}
//                   >
//                     <option value="LGD">LGD</option>
//                     <option value="Zone to Zone">Zone to Zone</option>
//                   </select>
//                 </FormGroup>
//               </Col>
//             </Row>
//             <Row>
//               <Col >

//                 <FormGroup>
//                   <Label for="search" className="forlabel">Select Exporter</Label>
//                   <select
//                     id="exporter"
//                     className="form-control form-select"
//                     onChange={handleUpdateInputChange}
//                     required
//                     name="exporter"

//                     value={updatedata.exporter}
//                   >

//                     {partys.map((data, index) => (
//                       <option value="">Select exporter</option>,
//                       <option key={index} value={data.partyId} >{data.partyName}</option>
//                     ))}
//                   </select>
//                   <div style={{ color: 'red' }} className="error-message">{formErrors.exporter}</div>

//                 </FormGroup>
//               </Col>
//             </Row>
//             <Row>
//               <Col md={3}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Exporter Name</Label>
//                   <Input
//                     type="text"
//                     name="exporterName"
//                     id="exporterName"
//                     required
//                     onChange={handleUpdateInputChange}
//                     className="inputField"
//                     maxLength={100}
//                     value={updatedata.exporterName}
//                   />
//                   <div style={{ color: 'red' }} className="error-message">{formErrors.exporterName}</div>

//                 </FormGroup>
//               </Col>
//               <Col md={3}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Import Date</Label>
//                   <DatePicker
//                     selected={updatedata.exporterDate} // Set the selected date to BillGDate
//                     onChange={(date) => {
//                       if (date) {
//                         setUpdateData({ ...updatedata, exporterDate: date });
//                       } else {
//                         setUpdateData({ ...updatedata, exporterDate: null });
//                       }
//                     }}
//                     dateFormat="dd/MM/yyyy"
//                     value={updatedata.exporterDate}
//                     className="form-control border-right-0 inputField"
//                     customInput={<input style={{ width: '100%' }} />}
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     maxDate={today}

//                   />

//                 </FormGroup>
//               </Col>
//               <Col md={3}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Invoice No</Label>
//                   <Input
//                     type="text"
//                     name="invoiceNo"
//                     maxLength={30}
//                     required
//                     id="invoiceNo"
//                     onChange={handleUpdateInputChange}
//                     className="inputField"
//                     value={updatedata.invoiceNo}

//                   />
//                   <div style={{ color: 'red' }} className="error-message">{formErrors.invoiceNo}</div>

//                 </FormGroup>
//               </Col>
//               <Col md={3}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Invoice Date</Label>
//                   <DatePicker
//                     selected={updatedata.invoiceDate} // Set the selected date to BillGDate
//                     onChange={(date) => {
//                       if (date) {
//                         setUpdateData({ ...updatedata, invoiceDate: date });
//                       } else {
//                         setUpdateData({ ...updatedata, invoiceDate: null });
//                       }
//                     }}
//                     dateFormat="dd/MM/yyyy"
//                     value={updatedata.invoiceDate}
//                     className="form-control border-right-0 inputField"
//                     customInput={<input style={{ width: '100%' }} />}
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     maxDate={today}

//                   />


//                 </FormGroup>
//               </Col>
//             </Row>
//             <Row>
//               <Col md={3}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">No of packages</Label>
//                   <Input
//                     type="text"
//                     name="nop"
//                     onChange={handleUpdateInputChange}
//                     id="nop"
//                     className="inputField"
//                     required
//                     value={updatedata.nop}
//                   />
//                   <div style={{ color: 'red' }} className="error-message">{formErrors.nop}</div>

//                 </FormGroup>
//               </Col>
//               <Col md={3}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Net weight</Label>
//                   <Input
//                     type="text"
//                     name="netWeight"
//                     id="netWeight"
//                     onChange={handleUpdateInputChange}
//                     maxLength={15}
//                     required
//                     className="inputField"
//                     value={updatedata.netWeight}
//                   />
//                   <div style={{ color: 'red' }} className="error-message">{formErrors.netWeight}</div>

//                 </FormGroup>
//               </Col>
//               <Col md={3}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Net weight unit</Label>
//                   <Input
//                     type="text"
//                     name="netWeightUnit"
//                     id="branchname"
//                     maxLength={20}
//                     required
//                     onChange={handleUpdateInputChange}
//                     className="inputField"
//                     value={updatedata.netWeightUnit}
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={3}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Product value</Label>
//                   <Input
//                     type="text"
//                     name="productValue"
//                     id="branchname"
//                     onChange={handleUpdateInputChange}
//                     maxLength={15}
//                     required
//                     className="inputField"
//                     value={updatedata.productValue}
//                   />
//                 </FormGroup>
//               </Col>
//             </Row>
//             <Row>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Currency</Label>
//                   <Input
//                     type="text"
//                     name="currency"
//                     id="branchname"
//                     required
//                     onChange={handleUpdateInputChange}
//                     maxLength={15}
//                     className="inputField"
//                     value={updatedata.currency}
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Remarks</Label>
//                   <Input
//                     type="textarea"
//                     name="remarks"
//                     id="branchname"
//                     onChange={handleUpdateInputChange}
//                     className="inputField"
//                     maxLength={255}
//                     value={updatedata.remarks}
//                   />
//                 </FormGroup>
//               </Col>
//             </Row>
//             <Row>
//               <Col className="text-center" >
//                 <Button onClick={handleUpdateSubmit} variant="outline-success">
//                   <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
//                   Submit
//                 </Button>
//               </Col>
//             </Row>
//           </form>

//         </ModalBody>


//       </Modal >




//       {/* For Update requestId model */}
//       <Modal Modal isOpen={isModalOpenforhistory} onClose={closeModelforHistory} toggle={closeModelforHistory} style={{ maxWidth: '1300px', wioverflow: '-moz-hidden-unscrollable' }
//       } >
//         <ModalHeader toggle={closeModelforHistory} style={{
//           backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//           boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//           border: '1px solid rgba(0, 0, 0, 0.3)',
//           borderRadius: '0',
//           backgroundColor: '#85144b',
//           backgroundColor: 'rgba(0, 0, 0, 0.3)',
//           backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           //backgroundPosition: 'center',
//           backgroundPosition: 'center',
//         }}>
//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
//             icon={faHistory}
//             style={{
//               marginRight: '8px',
//               color: 'black', // Set the color to golden
//             }}
//           />View Subcontract History</h5>

//         </ModalHeader>
//         <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>


//           <form >
//             <Row>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Request Id</Label>
//                   <Input
//                     type="text"
//                     name="requestId"
//                     id="branchname"
//                     readOnly
//                     className="inputField"
//                     value={impsubhistory.requestId}

//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Unit Name</Label>
//                   <Input
//                     type="text"
//                     name="importType"
//                     id="branchname"
//                     className="inputField"
//                     value={getpartyId[impsubhistory.exporter]}
//                     readOnly
//                   />
//                 </FormGroup>
//               </Col>
//             </Row>

//             <Row>
//               <Col>
//                 <div className="table-responsive">
//                   <Table className="table table-striped table-hover">
//                     <thead>
//                       <tr>
//                         <th style={{ backgroundColor: '#BADDDA' }}>#</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>Type</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>SIR No.</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>SIR Date</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>Updated By</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>New Status</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>Old Status</th>

//                         <th style={{ backgroundColor: '#BADDDA' }}>No. of Packages</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>Passed-In Weight</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>Transport Date</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>Remark</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {importsubhistory.map((data, index) => (
//                         <tr key={index}>

//                           <td>{index + 1}</td>
//                           <td>Import</td>
//                           <td>{impsubhistory.sirNo}</td>
//                           <td>{formatDateTime(impsubhistory.sirDate)}</td>
//                           <td>{data.updatedBy}</td>
//                           <td>{data.newStatus}</td>
//                           <td>{data.oldStatus}</td>
//                           <td>{impsubhistory.nop}</td>
//                           <td>{impsubhistory.netWeight}({impsubhistory.netWeightUnit})</td>
//                           <td>{convertTimestampToDateTime(data.transport_Date)}</td>
//                           <td>{data.remark}</td>
//                         </tr>
//                       ))

//                       }



//                     </tbody>

//                   </Table>
//                 </div>
//               </Col>
//             </Row>
//             <Row>


//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Net Pending Quantity</Label>
//                   <Input
//                     type="text"
//                     name="importType"
//                     id="branchname"
//                     className="inputField"
//                     value={-impsubhistory.netWeight}
//                     readOnly
//                   />
//                 </FormGroup>
//               </Col>





//               <Col></Col>
//               <Col></Col>
//             </Row>
//             <Row>
//               <BlobProvider document={<MyPDFDocument />}>
//                 {({ blob, url, loading, error }) => (
//                   <a
//                     href={url}
//                     style={{ textDecoration: "none" }}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <Button
//                       type="button"
//                       variant="outline-primary"
//                       style={{
//                         marginRight: "10px",
//                         marginBottom: "15px",
//                         textDecoration: "none",
//                       }}
//                     >
//                       <FontAwesomeIcon
//                         icon={faPrint}
//                         style={{ marginRight: "5px" }}
//                       />
//                       Print History
//                     </Button>
//                   </a>
//                 )}
//               </BlobProvider>
//             </Row>

//             <Row>

//               <Col className="text-center">
//                 <Button onClick={closeModelforHistory} variant="danger">
//                   <FontAwesomeIcon icon={faArrowRight} style={{ marginRight: '5px' }} />
//                   Back
//                 </Button>
//               </Col>
//             </Row>
//           </form>


//           {/* <PDFViewer width="100%" height="500px">
//              <MyPDFDocument/>
//           </PDFViewer> */}
//         </ModalBody>
//       </Modal >

//       <Modal Modal isOpen={isModalOpenforViewall} onClose={closeModalforViewall} toggle={closeModalforViewall} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
//       } >
//         <ModalHeader toggle={closeModalforViewall} style={{
//           backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//           boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//           border: '1px solid rgba(0, 0, 0, 0.3)',
//           borderRadius: '0',
//           backgroundColor: '#85144b',
//           backgroundColor: 'rgba(0, 0, 0, 0.3)',
//           backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           //backgroundPosition: 'center',
//           backgroundPosition: 'center',
//         }} >
//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
//             icon={faListCheck}
//             style={{
//               marginRight: '8px',
//               color: 'black', // Set the color to golden
//             }}
//           />Subcontract Import Details</h5>
//         </ModalHeader>
//         <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>


//           <form >
//             <Row>
//               <Col md={4}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">SB Request ID</Label>
//                   <Input
//                     type="text"
//                     name="requestId"
//                     id="branchname"
//                     readOnly
//                     className="inputField"

//                     maxLength={30}
//                     value={viewall.requestId}
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={4}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Name Of Importer</Label>
//                   <Input
//                     type="text"
//                     name="importType"
//                     id="branchname"
//                     className="inputField"
//                     readOnly
//                     maxLength={20}

//                     value={getpartyId[viewall.exporter]}
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={4}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Exporter Name</Label>
//                   <Input
//                     type="text"
//                     name="importType"
//                     id="branchname"
//                     className="inputField"
//                     readOnly
//                     maxLength={20}

//                     value={viewall.exporterName}
//                   />
//                 </FormGroup>
//               </Col>
//             </Row>
//             <Row>
//               <Col md={4}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Import Date</Label>
//                   <Input
//                     type="text"
//                     name="requestId"
//                     id="branchname"
//                     readOnly
//                     className="inputField"

//                     maxLength={30}
//                     value={formatDateTime(viewall.exporterDate)}
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={4}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Invoice No</Label>
//                   <Input
//                     type="text"
//                     name="importType"
//                     id="branchname"
//                     className="inputField"
//                     readOnly
//                     maxLength={20}

//                     value={viewall.invoiceNo}
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={4}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Invoice Date</Label>
//                   <Input
//                     type="text"
//                     name="importType"
//                     id="branchname"
//                     className="inputField"
//                     readOnly
//                     maxLength={20}

//                     value={formatDateTime(viewall.invoiceDate)}
//                   />
//                 </FormGroup>
//               </Col>
//             </Row>
//             <Row>
//               <Col md={4}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">SER NO.</Label>
//                   <Input
//                     type="text"
//                     name="requestId"
//                     id="branchname"
//                     readOnly
//                     className="inputField"

//                     maxLength={30}
//                     value={viewall.sirNo}
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={4}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">SIR Date</Label>
//                   <Input
//                     type="text"
//                     name="importType"
//                     id="branchname"
//                     className="inputField"
//                     readOnly
//                     maxLength={20}

//                     value={formatDateTime(viewall.sirDate)}
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={4}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">NSDL Status</Label>
//                   <Input
//                     type="text"
//                     name="importType"
//                     id="branchname"
//                     className="inputField"
//                     readOnly
//                     maxLength={20}

//                     value={viewall.nsdlStatus}
//                   />
//                 </FormGroup>
//               </Col>

//             </Row>
//             <Row>
//               <Col md={4}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">No. Of Packages</Label>
//                   <Input
//                     type="text"
//                     name="requestId"
//                     id="branchname"
//                     readOnly
//                     className="inputField"

//                     maxLength={30}
//                     value={viewall.nop}
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={4}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Passed-In Weight</Label>
//                   <Input
//                     type="text"
//                     name="requestId"
//                     id="branchname"
//                     readOnly
//                     className="inputField"

//                     maxLength={30}
//                     value={viewall.netWeight}
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={4}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Passed-In Weight Unit</Label>
//                   <Input
//                     type="text"
//                     name="importType"
//                     id="branchname"
//                     className="inputField"
//                     readOnly
//                     maxLength={20}

//                     value={viewall.netWeightUnit}
//                   />
//                 </FormGroup>
//               </Col>

//             </Row>
//             <Row>

//               <Col md={4}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Amount</Label>
//                   <Input
//                     type="text"
//                     name="importType"
//                     id="branchname"
//                     className="inputField"
//                     readOnly
//                     maxLength={20}

//                     value={viewall.productValue}
//                   />
//                 </FormGroup>
//               </Col>


//               <Col md={4}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Currency</Label>
//                   <Input
//                     type="text"
//                     name="requestId"
//                     id="branchname"
//                     readOnly
//                     className="inputField"

//                     maxLength={30}
//                     value={viewall.currency}
//                   />
//                 </FormGroup>
//               </Col>

//             </Row>
//           </form>

//         </ModalBody>
//       </Modal >



//       {/* For Update requestId model */}
//       <Modal Modal isOpen={isModalOpenforDelieveryUpdate} onClose={closeModalforDelievery} toggle={closeModalforDelievery} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
//       } >
//         <ModalHeader toggle={closeModalforDelievery} style={{
//           backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//           boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//           border: '1px solid rgba(0, 0, 0, 0.3)',
//           borderRadius: '0',
//           backgroundColor: '#85144b',
//           backgroundColor: 'rgba(0, 0, 0, 0.3)',
//           backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           //backgroundPosition: 'center',
//           backgroundPosition: 'center',
//         }}  >
//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
//             icon={faPencilSquare}
//             style={{
//               marginRight: '8px',
//               color: 'black', // Set the color to golden
//             }}
//           />Update Delivery Status</h5>

//         </ModalHeader>
//         <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>



//           <Row>
//             <Col md={6} >

//               <FormGroup>
//                 <Label for="search" className="forlabel">NSDL Status</Label>
//                 <select
//                   id="hold"
//                   className="form-control form-select"
//                   onChange={handleNSDLData}
//                   required
//                   name="nsdlStatus"
//                   value={deliverydata.nsdlStatus}

//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Passed In Full">Passed In Full</option>
//                 </select>
//               </FormGroup>
//             </Col>


//             <Col md={6}>
//               <FormGroup>
//                 <Label className="forlabel" for="branchId">Status Document</Label>
//                 <Input
//                   type="file"
//                   name="importType"
//                   id="branchname"
//                   onChange={handleFileChange}
//                   className="inputField"
//                   accept=".jpg, .jpeg, .png, .pdf"
//                 />

//               </FormGroup>
//             </Col>
//             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//               {selectedFile && (
//                 <button
//                   type="button"
//                   className="btn me-md-2 btn-outline-primary"
//                   onClick={openDocument}
//                   style={{ marginRight: '10px' }}
//                 >
//                   Show Document
//                 </button>
//               )}
//             </div>
//             <Col>
//             </Col>

//           </Row>
//           <Row>
//             <Col>

//               {deliverydata.status_document && (
//                 type1 === 'app' ? (
//                   <button style={{ borderStyle: 'none', background: 'none', color: 'red', padding: '0px' }} onClick={openPdfInNewTab}>{extractFileName(deliverydata.status_document)}</button>

//                 )
//                   : (
//                     <button style={{ borderStyle: 'none', background: 'none', color: 'red', padding: '0px' }} onClick={downloadFile}>{extractFileName(deliverydata.status_document)}</button>

//                   )

//               )}
//               <Modal isOpen={modalIsOpen} onClose={closeModal} toggle={closeModal} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

//                 {fileData && (
//                   <div>
//                     <img src={fileData.url} style={{ width: '800px', height: '500px' }} alt="Image" />

//                   </div>
//                 )}
//               </Modal>
//             </Col>
//           </Row>

//           <Row>
//             <Col className="text-center">

//               <Button onClick={handleDeliverySubmit} variant="outline-success">
//                 <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
//                 Submit
//               </Button>
//             </Col>
//           </Row>



//           {/* <PDFViewer width="100%" height="500px">
//              <MyPDFDocument/>
//           </PDFViewer> */}
//         </ModalBody>
//       </Modal >

//       {/* Dpcument Show Selected */}

//       <Modal isOpen={modalDocumentShow} onClose={closeModalDocumentShow} toggle={closeModalDocumentShow} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>
//         <ModalHeader toggle={closeModalDocumentShow} style={{
//           backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//           boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//           border: '1px solid rgba(0, 0, 0, 0.3)',
//           borderRadius: '0',
//           backgroundColor: '#85144b',
//           backgroundColor: 'rgba(0, 0, 0, 0.3)',
//           backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           backgroundPosition: 'center',
//         }}>
//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
//             icon={faHandHoldingHand}
//             style={{
//               marginRight: '8px',
//               color: 'black',
//             }}
//           /> Document Show</h5>
//         </ModalHeader>
//         <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
//           {selectedFile && selectedFile.type.includes('image') ? (
//             <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
//           ) : selectedFile && selectedFile.type === 'application/pdf' ? (
//             <embed src={URL.createObjectURL(selectedFile)} type="application/pdf" width="100%" height="500px" />
//           ) : (
//             <p>No file selected</p>
//           )}
//         </ModalBody>
//       </Modal>






//       <Modal Modal isOpen={isModelOpenforHandOver} onClose={closeModalforHandOver} toggle={closeModalforHandOver} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
//       } >
//         <ModalHeader toggle={closeModalforHandOver} style={{
//           backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//           boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//           border: '1px solid rgba(0, 0, 0, 0.3)',
//           borderRadius: '0',
//           backgroundColor: '#85144b',
//           backgroundColor: 'rgba(0, 0, 0, 0.3)',
//           backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           //backgroundPosition: 'center',
//           backgroundPosition: 'center',
//         }}>
//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
//             icon={faHandHoldingHand}
//             style={{
//               marginRight: '8px',
//               color: 'black', // Set the color to golden
//             }}
//           /> Handover To Party / CHA</h5>
//         </ModalHeader>
//         <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
//           <div style={{ backgroundColor: "#F8F8F8" }}>
//             <hr />
//             <form encType="multipart/form-data">
//               <Row className="">
//                 <Col className="d-flex justify-content-end">
//                   <div class="form-check">
//                     <input class="form-check-input"
//                       onChange={handleRadioChange} type="radio" value="option1" checked={selectedOption === 'option1'} name="flexRadioDefault" id="flexRadioDefault1" />
//                     <label class="form-check-label" for="flexRadioDefault1">
//                       <h6>Party</h6>
//                     </label>
//                   </div>

//                 </Col>
//                 <Col className="d-flex justify-content-start">
//                   <div class="form-check">
//                     <input class="form-check-input" value="option2"
//                       onChange={handleRadioChange} type="radio" checked={selectedOption === 'option2'} name="flexRadioDefault" id="flexRadioDefault2" />
//                     <label class="form-check-label" for="flexRadioDefault2">
//                       <h6>CHA</h6>
//                     </label>
//                   </div>
//                 </Col>
//               </Row>

//               {selectedOption === 'option1' ? (
//                 <div className="container">

//                   <Card style={{ backgroundColor: "#F8F8F8" }}>
//                     <CardBody>

//                       <Row>
//                         <Col md="3">
//                           {/* Left side image */}
//                           {im1 === 'Y' ? (
//                             <img src={imageData1.url} className="image-column1 rounded-image1" />
//                           )
//                             :
//                             (
//                               <img src={contachimage} style={{ height: '90%', width: '90%' }} />
//                             )
//                           }
//                         </Col>
//                         <Col md="9">
//                           {/* Right side input fields */}
//                           <Row>
//                             <Col>
//                               <FormGroup>
//                                 <Label className="forlabel" for="branchId">Name</Label>
//                                 <Input
//                                   type="text"
//                                   name="importType"
//                                   id="branchname"
//                                   value={getpartyId[handoverdata.exporter]}
//                                   className="inputField"
//                                   readOnly

//                                 />

//                               </FormGroup>
//                             </Col>
//                             <Col>
//                               <FormGroup>
//                                 <Label for="search" className="forlabel">Select Representative</Label>
//                                 <select
//                                   id="hold"
//                                   className="form-control form-select"
//                                   onChange={handlerepresent}
//                                   required
//                                   name="exporter"

//                                 >
//                                   <option value="No">Select Representative</option>

//                                   {representdata.map((data, index) => (

//                                     <option value={data.representativeId}>{data.firstName + " " + data.lastName}</option>
//                                   ))}

//                                 </select>
//                               </FormGroup>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col>
//                               <FormGroup >
//                                 <Label className="forlabel" for="branchId">
//                                   Mobile No
//                                 </Label>
//                                 <span className="d-flex align-items-center">
//                                   <Input
//                                     type="text"
//                                     name="importType"
//                                     id="branchname"
//                                     className="inputField"
//                                     value={getotpapprove}
//                                   />
//                                   <span hidden ref={approvedByOTPSpanRef}>{representData.mobile}</span>

//                                   <Button
//                                     style={{ borderRadius: '0' }}
//                                     onClick={checkotp1}
//                                     variant="outline-primary"
//                                   >
//                                     OTP
//                                   </Button>
//                                 </span>
//                               </FormGroup>
//                             </Col>

//                             <Col>
//                               <FormGroup>
//                                 <Label className="forlabel" for="branchId">Enter OTP</Label>
//                                 <Input
//                                   type="text"
//                                   name="importType"
//                                   id="branchname"
//                                   onChange={handleOTP}
//                                   className="inputField"


//                                 />

//                               </FormGroup>
//                             </Col>
//                           </Row>
//                         </Col>
//                       </Row>
//                     </CardBody>
//                   </Card>
//                   <Row style={{ marginTop: "4%" }}>
//                     <Col className="text-center">
//                       <Button onClick={handleVerifyOTP} variant="outline-success">
//                         <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
//                         SUBMIT
//                       </Button>
//                     </Col>
//                   </Row>
//                 </div>
//               ) : (

//                 getrepresentSingledata ? (
//                   <div className="container">
//                     <Card style={{ backgroundColor: "#F8F8F8" }}>

//                       <CardBody>
//                         <Row>
//                           <Col md="3">
//                             {/* Left side image */}
//                             {im2 === 'Y' ? (
//                               <img src={imageData2.url} className="image-column1 rounded-image1" />
//                             )
//                               :
//                               (
//                                 <img src={contachimage} style={{ height: '90%', width: '90%' }} />
//                               )
//                             }
//                           </Col>
//                           <Col md="9">
//                             {/* Right side input fields */}
//                             <Row>
//                               <Col>
//                                 <FormGroup>
//                                   <Label for="status" className="forlabel">Name</Label>
//                                   <Input
//                                     type="text"
//                                     name="importType"
//                                     id="branchname"
//                                     value={getrepresentSingledata.userName}
//                                     className="inputField"
//                                     readOnly

//                                   />
//                                 </FormGroup>


//                               </Col>
//                               <Col>
//                                 <FormGroup>
//                                   <Label for="search" className="forlabel">Select Representative</Label>
//                                   <select
//                                     id="hold"
//                                     className="form-control form-select"
//                                     onChange={handlerepresent}
//                                     required
//                                     name="exporter"

//                                   >
//                                     <option value="No">Select Representative</option>

//                                     {CHARepresentavive.map((data, index) => (

//                                       <option value={data.representativeId}>{data.firstName + " " + data.lastName}</option>
//                                     ))}

//                                   </select>
//                                 </FormGroup>
//                               </Col>
//                             </Row>
//                             <Row>
//                               <Col>
//                                 <FormGroup >
//                                   <Label className="forlabel" for="branchId">
//                                     Mobile No
//                                   </Label>
//                                   <span className="d-flex align-items-center">
//                                     <Input
//                                       type="text"
//                                       name="importType"
//                                       id="branchname"
//                                       className="inputField"
//                                       value={getapprove}
//                                     />
//                                     <span hidden ref={approvedBySpanRef}>{CHArepresentData.mobile}</span>

//                                     <Button
//                                       style={{ borderRadius: '0' }}
//                                       onClick={checkotp2}
//                                       variant="outline-primary"
//                                     >
//                                       OTP
//                                     </Button>
//                                   </span>
//                                 </FormGroup>
//                               </Col>

//                               <Col>
//                                 <FormGroup>
//                                   <Label className="forlabel" for="branchId">Enter OTP</Label>
//                                   <Input
//                                     type="text"
//                                     name="importType"
//                                     id="branchname"
//                                     onChange={handleOTP}
//                                     className="inputField"


//                                   />

//                                 </FormGroup>
//                               </Col>
//                             </Row>
//                           </Col>
//                         </Row>
//                       </CardBody>
//                     </Card>
//                     <Row style={{ marginTop: "4%" }}>
//                       <Col className="text-center">
//                         <Button onClick={handleVerifCHAyOTP} variant="outline-success">
//                           <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
//                           SUBMIT
//                         </Button>
//                       </Col>
//                     </Row>
//                   </div>
//                 )
//                   :
//                   (
//                     <div className="container">
//                       <Card style={{ backgroundColor: "#F8F8F8" }}>

//                         <CardBody>
//                           <Row>
//                             <Col md="3">
//                               {/* Left side image */}
//                               {im3 === 'Y' ? (
//                                 <img src={imageData3.url} className="image-column1 rounded-image1" />
//                               )
//                                 :
//                                 (
//                                   <img src={contachimage} style={{ height: '90%', width: '90%' }} />
//                                 )
//                               }
//                             </Col>
//                             <Col md="9">
//                               {/* Right side input fields */}
//                               <Row>
//                                 <Col>
//                                   <FormGroup>
//                                     <Label for="status" className="forlabel">Name</Label>
//                                     <select
//                                       id="hold"
//                                       className="form-control form-select"
//                                       onChange={handlegetsinglecha}
//                                       required
//                                       name="exporter"

//                                     >
//                                       <option value="No">Select CHA</option>

//                                       {CHAdata.map((data, index) => (

//                                         <option value={data.externaluserId}>{data.userName}</option>
//                                       ))}

//                                     </select>
//                                   </FormGroup>


//                                 </Col>
//                                 <Col>
//                                   <FormGroup>
//                                     <Label for="search" className="forlabel">Select Representative</Label>
//                                     <select
//                                       id="hold"
//                                       className="form-control form-select"
//                                       onChange={handlerepresent}
//                                       required
//                                       name="exporter"

//                                     >
//                                       <option value="No" >Select Representative</option>

//                                       {AllCHARepresentavive.map((data, index) => (

//                                         <option value={data.representativeId}>{data.firstName + " " + data.lastName}</option>
//                                       ))}

//                                     </select>
//                                   </FormGroup>
//                                 </Col>
//                               </Row>
//                               <Row>
//                                 <Col>
//                                   <FormGroup >
//                                     <Label className="forlabel" for="branchId">
//                                       Mobile No
//                                     </Label>
//                                     <span className="d-flex align-items-center">
//                                       <Input
//                                         type="text"
//                                         name="importType"
//                                         id="branchname"
//                                         className="inputField"
//                                         value={getapprove}
//                                       />
//                                       <span hidden ref={approvedBySpanRef}>{CHArepresentData.mobile}</span>
//                                       <Button
//                                         style={{ borderRadius: '0' }}
//                                         onClick={checkotp3}
//                                         variant="outline-primary"
//                                       >
//                                         OTP
//                                       </Button>
//                                     </span>
//                                   </FormGroup>
//                                 </Col>

//                                 <Col>
//                                   <FormGroup>
//                                     <Label className="forlabel" for="branchId">Enter OTP</Label>
//                                     <Input
//                                       type="text"
//                                       name="importType"
//                                       id="branchname"
//                                       onChange={handleOTP}
//                                       className="inputField"


//                                     />

//                                   </FormGroup>
//                                 </Col>
//                               </Row>
//                             </Col>
//                           </Row>
//                         </CardBody>
//                       </Card>
//                       <Row style={{ marginTop: "4%" }}>
//                         <Col className="text-center">
//                           <Button onClick={handleVerifAllCHAyOTP} variant="outline-success">
//                             <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
//                             SUBMIT
//                           </Button>
//                         </Col>
//                       </Row>
//                     </div>
//                   )

//               )}
//             </form>
//           </div>

//         </ModalBody >
//       </Modal >


//       {/* For Update requestId model */}
//       <Modal Modal isOpen={isModalopenforpenalty} onClose={closeModalforpenalty} toggle={closeModalforpenalty} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
//       } >
//         <ModalHeader toggle={closeModalforpenalty} style={{
//           backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//           boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//           border: '1px solid rgba(0, 0, 0, 0.3)',
//           borderRadius: '0',
//           backgroundColor: '#85144b',
//           backgroundColor: 'rgba(0, 0, 0, 0.3)',
//           backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           //backgroundPosition: 'center',
//           backgroundPosition: 'center',
//         }} >
//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
//             icon={faGavel}
//             style={{
//               marginRight: '8px',
//               color: 'black', // Set the color to golden
//             }}
//           />Impose Penalty</h5>

//         </ModalHeader>
//         <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>


//           <form >
//             <Row>
//               <Col md={6} >
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Penalty Amount</Label>
//                   <Input
//                     type="text"
//                     name="imposePenaltyAmount"
//                     id="branchname"
//                     onChange={handlepenaltychange}
//                     value={penaltydetail.imposePenaltyAmount}
//                     className="inputField"


//                   />

//                 </FormGroup>
//               </Col>

//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="forlabel" for="branchId">Reason</Label>
//                   <Input
//                     type="textarea"
//                     name="imposePenaltyRemarks"
//                     id="branchname"
//                     onChange={handlepenaltychange}
//                     value={penaltydetail.imposePenaltyRemarks}
//                     className="inputField"


//                   />

//                 </FormGroup>
//               </Col>



//             </Row>


//             <Row>
//               <Col className="text-center">

//                 <Button onClick={getpenaltystatus} variant="outline-success">
//                   <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
//                   Submit
//                 </Button>
//               </Col>
//             </Row>
//           </form>


//           {/* <PDFViewer width="100%" height="500px">
//              <MyPDFDocument/>
//           </PDFViewer> */}
//         </ModalBody>
//       </Modal >




//       <Modal Modal isOpen={isModalOpenforhandedover} onClose={closeModalforMultiplehandover} toggle={closeModalforMultiplehandover} style={{ maxWidth: '1200px', wioverflow: '-moz-hidden-unscrollable' }
//       } >
//         <ModalHeader toggle={closeModalforMultiplehandover} style={{
//           backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//           boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//           border: '1px solid rgba(0, 0, 0, 0.3)',
//           borderRadius: '0',
//           backgroundColor: '#85144b',
//           backgroundColor: 'rgba(0, 0, 0, 0.3)',
//           backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
//           backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           //backgroundPosition: 'center',
//           backgroundPosition: 'center',
//         }} >
//           <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
//             icon={faHandHoldingHand}
//             style={{
//               marginRight: '8px',
//               color: 'black', // Set the color to golden
//             }}
//           />Handover to Party / CHA</h5>

//         </ModalHeader>
//         <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
//           {!(partydata1.length > 0 || getalldatabyCHA.length > 0) && (
//             <div >
//               <Row className="">
//                 <Col className="d-flex justify-content-end" >
//                   <div class="form-check">
//                     <input class="form-check-input"
//                       onChange={handleRadioChange1} type="radio" value="option1" checked={selectedOption1 === 'option1'} name="flexRadioDefault" id="flexRadioDefault1" />
//                     <label class="form-check-label" for="flexRadioDefault1">
//                       <h6>Party</h6>
//                     </label>
//                   </div>

//                 </Col>
//                 <Col className="d-flex justify-content-start">
//                   <div class="form-check">
//                     <input class="form-check-input" value="option2"
//                       onChange={handleRadioChange1} type="radio" checked={selectedOption1 === 'option2'} name="flexRadioDefault" id="flexRadioDefault2" />
//                     <label class="form-check-label" for="flexRadioDefault2">
//                       <h6>CHA</h6>
//                     </label>
//                   </div>
//                 </Col>
//               </Row>
//               {selectedOption1 === 'option1' && (
//                 <Row>
//                   <Col md={6}  >
//                     <FormGroup>
//                       <Label for="search" className="forlabel">Select Party</Label>
//                       <select
//                         id="exporter"
//                         className="form-control form-select"
//                         value={getparty}
//                         onChange={(e) => setGetparty(e.target.value)}
//                         required
//                         name="exporter"

//                       >
//                         <option value="">Select Party</option>
//                         {partys.map((data, index) => (
//                           <option key={index} value={data.partyId}>{data.partyName}</option>
//                         ))}
//                       </select>

//                     </FormGroup>
//                   </Col>
//                   <Col md={3}>
//                     <FormGroup>

//                       <Button onClick={checkloa} style={{ marginTop: 32 }} variant="outline-primary">
//                         <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
//                         Search
//                       </Button>
//                     </FormGroup>
//                   </Col>
//                 </Row>
//               )

//               }
//               {selectedOption1 === 'option2' && (
//                 <Row>
//                   <Col md={6}  >
//                     <FormGroup>
//                       <Label for="search" className="forlabel">Select CHA</Label>
//                       <select
//                         id="exporter"
//                         className="form-control form-select"
//                         value={selectCHA}
//                         onChange={(e) => setSelectedCHA(e.target.value)}
//                         required
//                         name="exporter"

//                       >
//                         <option value="">Select CHA</option>
//                         {allCHA.map((data, index) => (
//                           <option key={index} value={data.externaluserId}>{data.userName}</option>
//                         ))}
//                       </select>

//                     </FormGroup>
//                   </Col>
//                   <Col md={3}>
//                     <FormGroup>

//                       <Button onClick={getdatabyallCHA} style={{ marginTop: 32 }} variant="outline-primary">
//                         <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
//                         Search
//                       </Button>
//                     </FormGroup>
//                   </Col>
//                 </Row>
//               )

//               }
//             </div>
//           )

//           }



//           {partydata1.length > 0 && (
//             <div>
//               <Row>
//                 <div className="table-responsive custom-table-container table-section">

//                   <Table className="table table-striped table-hover">
//                     <thead>
//                       <tr>
//                         <th style={{ backgroundColor: '#BADDDA' }}><input type="checkbox" onChange={handleSelectAll2}
//                           checked={selectAll2} style={{ width: 15, height: 15, marginTop: 5 }} /></th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>Request ID</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>SER No.</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>Exporter</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>No. of Packages</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>Passed-Out Weight</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>DGDC Status</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>NSDL Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {partydata1.map((item, index) => (
//                         <tr key={index}>
//                           <td><input type="checkbox" onChange={() => handleCheckboxChange3(item)}
//                             checked={selectedRows2.includes(item)} style={{ width: 15, height: 15, marginTop: 5 }} /></td>
//                           <td>{item.requestId}</td>
//                           <td>{item.sirNo}</td>
//                           <td>{getpartyId[item.exporter]}</td>
//                           <td>{item.nop}</td>
//                           <td>{item.netWeight}</td>
//                           <td>{item.dgdcStatus}</td>
//                           <td>{item.nsdlStatus}</td>
//                         </tr>
//                       ))

//                       }

//                     </tbody>
//                   </Table>

//                 </div>
//               </Row>
//               <hr />
//               <div >
//                 <span style={{ marginLeft: 20 }}><b>Total Request Id : {partydata1.map((item) => item.requestId).length}</b></span>
//                 <span style={{ float: 'inline-end', marginRight: 20 }} className="text-end"><b>Total No. Of Packages : {partydata1.reduce((total, item) => total + item.nop, 0)}</b></span>
//               </div>
//               <hr />
//               <Card >
//                 <CardBody>
//                   <Row>
//                     <Col md="3" className="d-flex justify-content-center align-items-center">
//                       {/* Centered image */}
//                       {im5 === 'Y' ? (
//                         <img src={imageData5.url} className="image-column1 rounded-image2" />
//                       )
//                         :
//                         (
//                           <img src={contachimage} style={{ height: '90%', width: '90%' }} />
//                         )
//                       }
//                     </Col>

//                     <Col md="9">
//                       {/* Right side input fields */}
//                       <Row>
//                         <Col md={6} >
//                           <FormGroup>
//                             <Label for="search" className="forlabel">
//                               Party Name
//                             </Label>
//                             <Input
//                               type="text"
//                               name="importType"
//                               id="branchname"
//                               value={getpartyId[getparty]}
//                               className="inputField"
//                             />
//                           </FormGroup>
//                         </Col>
//                         <Col md={6}>
//                           <FormGroup>
//                             <Label for="search" className="forlabel">
//                               Select Representative
//                             </Label>
//                             <select
//                               id="hold"
//                               className="form-control form-select"
//                               onChange={handlepartyrepresent}
//                               required
//                               name="exporter"
//                             >
//                               <option value="No">Select Representative</option>
//                               {allCHARepresentavive.map((data, index) => (
//                                 <option value={data.representativeId}>
//                                   {data.firstName + " " + data.lastName}
//                                 </option>
//                               ))}
//                             </select>
//                           </FormGroup>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col md={6}>
//                           <FormGroup>
//                             <Label className="forlabel" for="branchId">Mobile No</Label>
//                             <span className="d-flex align-items-center">
//                               <Input
//                                 type="text"
//                                 name="importType"
//                                 id="branchname"
//                                 className="inputField"
//                                 value={getOTPapprove}
//                                 style={{ backgroundColor: '#E0E0E0' }}
//                                 readOnly
//                               />
//                               <span hidden ref={approvedByotpSpanRef}>{getrepresentData.mobile}</span>
//                               <Button
//                                 style={{ borderRadius: '0' }}
//                                 variant="outline-success"
//                                 onClick={checkotp5}
//                               >
//                                 OTP
//                               </Button>
//                             </span>
//                           </FormGroup>
//                         </Col>
//                         <Col md={6}>
//                           <FormGroup>
//                             <Label className="forlabel" for="branchId">Enter OTP</Label>
//                             <Input
//                               type="text"
//                               name="importType"
//                               id="branchname"
//                               onChange={handleOTP5}
//                               className="inputField"
//                             />
//                           </FormGroup>
//                         </Col>
//                       </Row>
//                     </Col>
//                   </Row>
//                   <Row style={{ marginTop: "4%" }}>
//                     <Col className="text-center">
//                       <Button onClick={handleSubmit3} variant="outline-success">
//                         <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
//                         Submit
//                       </Button>
//                     </Col>
//                   </Row>
//                 </CardBody>
//               </Card>
//             </div>

//           )

//           }

//           {(getalldatabyCHA.length > 0 || list2.length > 0) && (
//             <div>
//               <Row>
//                 <div className="table-responsive custom-table-container table-section">
//                   {list2.length > 0 && (
//                     <Table style={{ marginBottom: 20 }} className="table table-striped table-hover">
//                       <thead>
//                         <tr>

//                           <th style={{ backgroundColor: '#BADDDA' }}>Request ID</th>
//                           <th style={{ backgroundColor: '#BADDDA' }}>SER No.</th>
//                           <th style={{ backgroundColor: '#BADDDA' }}>Exporter</th>
//                           <th style={{ backgroundColor: '#BADDDA' }}>Status</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {list2.map((item, index) => (
//                           <tr key={index}>

//                             <td>{item.requestId}</td>
//                             <td>{item.sirNo}</td>
//                             <td>{getpartyId[item.exporter]}</td>
//                             <td><h5 style={{ color: 'red' }}>LOA Expired</h5></td>
//                           </tr>
//                         ))

//                         }

//                       </tbody>
//                     </Table>
//                   )

//                   }

//                   <Table className="table table-striped table-hover">
//                     <thead>
//                       <tr>
//                         <th style={{ backgroundColor: '#BADDDA' }}><input type="checkbox" onChange={handleSelectAll4}
//                           checked={selectAll3} style={{ width: 15, height: 15, marginTop: 5 }} /></th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>Request ID</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>SER No.</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>Exporter</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>No. of Packages</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>Passed-Out Weight</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>DGDC Status</th>
//                         <th style={{ backgroundColor: '#BADDDA' }}>NSDL Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {getalldatabyCHA.map((item, index) => (
//                         <tr key={index}>
//                           <td><input type="checkbox" onChange={() => handleCheckboxChange4(item)}
//                             checked={selectedRows3.includes(item)} style={{ width: 15, height: 15, marginTop: 5 }} /></td>
//                           <td>{item.requestId}</td>
//                           <td>{item.sirNo}</td>
//                           <td>{getpartyId[item.exporter]}</td>
//                           <td>{item.nop}</td>
//                           <td>{item.netWeight}</td>
//                           <td>{item.dgdcStatus}</td>
//                           <td>{item.nsdlStatus}</td>
//                         </tr>
//                       ))

//                       }

//                     </tbody>
//                   </Table>

//                 </div>
//               </Row>
//               <hr />
//               <div >
//                 <span style={{ marginLeft: 20 }}><b>Total Request Id : {getalldatabyCHA.map((item) => item.requestId).length}</b></span>
//                 <span style={{ float: 'inline-end', marginRight: 20 }} className="text-end"><b>Total No. Of Packages : {getalldatabyCHA.reduce((total, item) => total + item.nop, 0)}</b></span>
//               </div>
//               <hr />
//               <Card >
//                 <CardBody>
//                   <Row>
//                     <Col md="3" className="d-flex justify-content-center align-items-center">
//                       {/* Centered image */}
//                       {im6 === 'Y' ? (
//                         <img src={imageData6.url} className="image-column1 rounded-image2" />
//                       )
//                         :
//                         (
//                           <img src={contachimage} style={{ height: '90%', width: '90%' }} />
//                         )
//                       }
//                     </Col>

//                     <Col md="9">
//                       {/* Right side input fields */}
//                       <Row>
//                         <Col md={6} >
//                           <FormGroup>
//                             <Label for="search" className="forlabel">
//                               CHA Name
//                             </Label>
//                             <Input
//                               type="text"
//                               name="importType"
//                               id="branchname"
//                               value={getrepresentname1[selectCHA]}
//                               className="inputField"
//                             />
//                           </FormGroup>
//                         </Col>
//                         <Col md={6}>
//                           <FormGroup>
//                             <Label for="search" className="forlabel">
//                               Select Representative
//                             </Label>
//                             <select
//                               id="hold"
//                               className="form-control form-select"
//                               onChange={handlepartyrepresent1}
//                               required
//                               name="exporter"
//                             >
//                               <option value="No">Select Representative</option>
//                               {allCHARepresentavive1.map((data, index) => (
//                                 <option value={data.representativeId}>
//                                   {data.firstName + " " + data.lastName}
//                                 </option>
//                               ))}
//                             </select>
//                           </FormGroup>
//                         </Col>
//                       </Row>
//                       <Row>
//                         <Col md={6}>
//                           <FormGroup>
//                             <Label className="forlabel" for="branchId">Mobile No</Label>
//                             <span className="d-flex align-items-center">
//                               <Input
//                                 type="text"
//                                 name="importType"
//                                 id="branchname"
//                                 className="inputField"
//                                 value={getOTPapprove1}
//                                 style={{ backgroundColor: '#E0E0E0' }}
//                                 readOnly
//                               />
//                               <span hidden ref={approvedByotpSpanRef1}>{getrepresentData1.mobile}</span>
//                               <Button
//                                 style={{ borderRadius: '0' }}
//                                 variant="outline-success"
//                                 onClick={checkotp6}
//                               >
//                                 OTP
//                               </Button>
//                             </span>
//                           </FormGroup>
//                         </Col>
//                         <Col md={6}>
//                           <FormGroup>
//                             <Label className="forlabel" for="branchId">Enter OTP</Label>
//                             <Input
//                               type="text"
//                               name="importType"
//                               id="branchname"
//                               onChange={handleOTP6}
//                               className="inputField"
//                             />
//                           </FormGroup>
//                         </Col>
//                       </Row>
//                     </Col>
//                   </Row>
//                   <Row style={{ marginTop: "4%" }}>
//                     <Col className="text-center">
//                       <Button onClick={handleSubmit4} variant="outline-success">
//                         <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
//                         Submit
//                       </Button>
//                     </Col>
//                   </Row>
//                 </CardBody>
//               </Card>
//             </div>

//           )

//           }


//         </ModalBody>
//       </Modal>
//     </div>
//   );
// }


import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext, useCallback, useRef } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import "../Components/Style.css";
import ipaddress from "../Components/IpAddress";
import Dropdown from 'react-bootstrap/Dropdown';
import { FaClosedCaptioning, FaTruck, FaHandPaper, FaPersonBooth, FaTruckLoading, FaArrowRight, FaArrowLeft, FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";
import { Line, PDFDownloadLink } from '@react-pdf/renderer';
import DGDCimage from '../Images/DGDC.png'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import contachimage from "../services/contacts.png"
import InviceService from "../services/InviceService"
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
import { faArrowRight, faArrowTurnRight, faAtom, faFileClipboard, faGavel, faHandHolding, faHandHoldingHand, faHistory, faListAlt, faListCheck, faPencilSquare, faPlaneDeparture, faPlus, faRefresh, faSearch, faUserCircle, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faXmark, faPrint, faFileLines, faCog } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from "react-toastify";
import "../Components/Style.css";
import { Pagination } from "react-bootstrap";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer'; import { BlobProvider } from '@react-pdf/renderer';
import { render } from "react-dom";

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
  header: {
    marginBottom: 20,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust the opacity and color as needed
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // Ensure the overlay is above other elements
  },
  heading: {
    fontSize: 10,
    marginBottom: 3,
    fontWeight: "bold",
    alignItems: "center",
  },
  mainheading: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 3,
    fontWeight: "bold",
    alignItems: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 10,
  },

  leftColumn: {
    width: "100%",
    paddingTop: 18,
  },
  headingwithbox: {
    fontSize: 10,
    marginBottom: 0,
    fontWeight: "bold",
    alignItems: "center",

    // Add padding for space between text and border
  },
  viewheadingwithbox: {
    border: "1px solid black",
    padding: 5,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 5,
  },
  headingwithborder: {
    fontSize: 10,
    marginBottom: 0,
    fontWeight: "bold",
    alignItems: "center",
    borderBottom: "1px solid black",
    // Add padding for space between text and border
  },
  image: {
    width: 400,
    height: 80,
    marginBottom: 0,
    marginLeft: 55,
  },
  dateSize: {
    fontSize: 8,
  },
  normaltext: {
    fontSize: 10,
    marginTop: 25,
    fontWeight: "bold",
  },
  normaltext2: {
    fontSize: 12,
    marginTop: 25,
    fontWeight: "bold",
  },
  normaltext3: {
    fontSize: 12,
    marginTop: 3,
    marginBottom: 20,
    fontWeight: "bold",
  },
  line: {
    width: "100%", // Adjust the width of the line
    marginTop: 10, // Adjust the space above the line
    marginBottom: 10, // Adjust the space below the line
    borderTop: "1pt solid black", // Style the line
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    fontSize: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderLeftColor: "#000",
    borderRightColor: "#000",
  },
  tableCell: {
    border: "1px solid #000",
    padding: 5,
  },
  tableCellHeader: {
    fontWeight: "bold",
  },
});
export default function Subcontract_LGD_Import() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [reqid, setRequestId] = useState('');
  const [JarListDtl, setJarListDtl] = useState([]);
  const [getOneParty, setOneParty] = useState([]);
  const [partys, setPartys] = useState([]);
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [lowerInputReqId, setLowerInputReqId] = useState('');
  const [getsubimportdata, setGetsubimportdata] = useState([]);
  const [getdatabyid, setGetdatabyid] = useState([]);
  const [impsubhistory, setImpHistory] = useState([]);
  const [viewall, setViewAll] = useState([]);
  const [deliverydata, setDeliverydata] = useState([]);
  const [validateChallandate, setValidateChallandate] = useState('');
  const [validateInvoicedate, setValidateInvoicedate] = useState('');
  const [party, setParty] = useState(null);
  const [forpartyName, setforPartyName] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [JarNSDLExpDtl, setJarNSDLExpDtl] = useState([]);
  const [handoverdata, setHandOverdata] = useState([]);
  const [nsdldata, setNSDLdata] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [expsubhistory, setExpHistory] = useState([]);
  const [penaltydetail, setPenaltydetail] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Get the file extension
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

      // Define the allowed file extensions
      const allowedExtensions = ['pdf', 'jpeg', 'jpg', 'png'];

      // Check if the selected file's extension is in the allowedExtensions array
      if (allowedExtensions.includes(fileExtension)) {
        // The selected file is of the correct type, you can proceed with it
        setSelectedFile(event.target.files[0]);
        console.log('Selected file:', selectedFile);
      } else {
        // The selected file is not allowed
        toast.error('Please choose a PDF, JPEG, JPG, or PNG file.', {
          autoClose: 1000, // 1 second timeout
        });
        // Clear the file input
        event.target.value = null;
      }
    }
  };

  // const handleNSDLData = (event) => {
  //   const selectedValue = event.target.value;
  //   console.log("Selected Value:", selectedValue); // Add this line to debug
  //   setDeliverydata({
  //     ...deliverydata,
  //     nsdlStatus: selectedValue,
  //   });
  //   setNSDLdata(selectedValue);
  // }

  const handleNSDLData = (event) => {
    const { name, value } = event.target;
    setDeliverydata((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlereqid = (e) => {
    setRequestId(e.target.value);

  }

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  const toggleDivVisibility = () => {

    if (!isDivVisible) {
      setLowerInputReqId(reqid); // Set the value of lower input box when search button is clicked
    }

    setIsDivVisible(true);
    setLowerInputReqId(reqid);// Always keep the div open after the first click
  };

  const closeModalforReqid = () => {
    setIsModalOpen(false);
    setRequestId('');
    setData(
      {
        companyId: "",
        branchId: "",
        impSubId: "",
        requestId: '',
        sirNo: "",
        sirDate: "",
        importType: "LGD",
        exporter: "",
        challanNo: "",
        challanDate: new Date(),
        invoiceNo: "",
        invoiceDate: new Date(),
        exporterName: "",
        exporterDate: new Date(),
        nop: "",
        netWeight: "",
        netWeightUnit: "",
        passedInWt: "",
        passedInWtUnit: "",
        productValue: "",
        currency: "",
        remarks: "",
        reentryDate: new Date(),
        nsdlStatus: "",
        dgdcStatus: "",
        status: "",
        lgdStatus: "",
        handover_Party_CHA: "",
        handover_Party_Name: "",
        handover_Represntative_id: "",
        imposePenaltyAmount: "",
        imposePenaltyRemarks: "",
        status_document: "",
        createdBy: "",
        createdDate: "",
        editedBy: "",
        editedDate: "",
        approvedBy: "",
        approvedDate: ""
      }
    );
    setLowerInputReqId('')
    setImportdataforexport([]);
    setExportdata([]);
    setIsDivVisible(false);
    setFormErrors(
      {
        requestId: "",
        exporter: "",
        challanNo: "",
        invoiceNo: "",
        nop: "",
        exporterName: "",
        gwWeight: "",
        netWeight: ""
      }
    )
    // Clear the reqid value when the modal is closed
  };

  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    logintype,
    logintypeid,

    login,
    logout,
  } = useContext(AuthContext);

  useEffect(() => {
    if (isDivVisible && lowerInputReqId) {
      setData((prevData) => ({
        ...prevData,
        requestId: lowerInputReqId,
      }));
    }
  }, [isDivVisible, lowerInputReqId]);
  const [getreqidd, setReqidd] = useState('');
  const [data, setData] = useState({
    companyId: "",
    branchId: "",
    impSubId: "",
    requestId: '',
    sirNo: "",
    sirDate: "",
    importType: "LGD",
    exporter: "",
    challanNo: "",
    challanDate: new Date(),
    invoiceNo: "",
    invoiceDate: new Date(),
    exporterName: "",
    exporterDate: new Date(),
    nop: "",
    netWeight: "",
    netWeightUnit: "",
    passedInWt: "",
    passedInWtUnit: "",
    productValue: "",
    currency: "",
    remarks: "",
    reentryDate: new Date(),
    nsdlStatus: "",
    dgdcStatus: "",
    status: "",
    lgdStatus: "",
    handover_Party_CHA: "",
    handover_Party_Name: "",
    handover_Represntative_id: "",
    imposePenaltyAmount: "",
    imposePenaltyRemarks: "",
    status_document: "",
    createdBy: "",
    createdDate: "",
    editedBy: "",
    editedDate: "",
    approvedBy: "",
    approvedDate: ""
  });

  const handleInputChange = (event) => {

    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [formErrors, setFormErrors] = useState({
    requestId: "",
    exporter: "",
    exporterName: "",
    invoiceNo: "",
    nop: "",
    gwWeight: "",
    netWeight: ""
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data1 = getsubimportdata.some((item) => item.requestId === data.requestId);

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    if (data1) {
      toast.error("Data already exist.", {
        autoClose: 700
      })
      return;
    }
    const errors = {};


    if (!data.exporter) {
      errors.exporter = "Exporter is required.";
    }

    if (!data.exporterName) {
      errors.exporterName = "Exporter name is required.";
    }

    if (!data.invoiceNo) {
      errors.invoiceNo = "Invoice no is required.";
    }

    if (!data.nop) {
      errors.nop = "No. of packages is required.";
    }


    if (!data.netWeight) {
      errors.netWeight = "Net weight is required.";
    }


    if (!data.exporter) {
      document.getElementById('exporter').classList.add('error-border');
    }
    if (!data.exporterName) {
      document.getElementById('exporterName').classList.add('error-border');
    }

    if (!data.invoiceNo) {
      document.getElementById('invoiceNo').classList.add('error-border');
    }
    if (!data.nop) {
      document.getElementById('nop').classList.add('error-border');
    }


    if (!data.netWeight) {
      document.getElementById('netWeight').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      submitBtn.disabled = false;
      return;
    }

    try {
      // Send a POST request to the server with the data object
      const response = await axios.post(`http://${ipaddress}importsub/insertdata/${userId}/${companyid}/${branchId}`, data);
      console.log("Saved data:", response.data);
      toast.success(`New SER ${response.data.sirNo} is generated successfully`, {
        autoClose: 700
      });


      fetchData();
      closeModalforReqid();
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error('error', {
        autoClose: 700
      })
    }
    finally {
      // Enable the submit button regardless of success or failure
      submitBtn.disabled = false;
    }
  };


  const handleExportSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!data.requestId) {
      errors.requestId = "Request Id is required.";
    }

    if (!data.invoiceNo) {
      errors.invoiceNo = "Invoice no is required.";
    }

    if (!data.nop) {
      errors.nop = "No. of packages is required.";
    }

    if (!data.netWeight) {
      errors.netWeight = "Passed-In weight is required.";
    }
    if (!data.requestId) {
      document.getElementById('requestId').classList.add('error-border');
    }
    if (!data.invoiceNo) {
      document.getElementById('invoiceNo').classList.add('error-border');
    }
    if (!data.nop) {
      document.getElementById('nop').classList.add('error-border');
    }


    if (!data.netWeight) {
      document.getElementById('netWeight').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (data.netWeight > (getexportdata.passoutWeight - sumOfNetWeightsforex)) {
      toast.error('Please enter right Passe-In wt.', {
        autoClose: 700
      });
      return;
    }

    try {
      data.exporter = getexportdata.exporter;
      data.challanNo = getexportdata.challanNo;
      data.challanDate = getexportdata.challanDate;
      data.productValue = getexportdata.productValue;
      data.currency = getexportdata.currency;


      // Send a POST request to the server with the data object
      const response = await axios.post(`http://${ipaddress}importsub/insertexportdata/${userId}/${companyid}/${branchId}/${getexportdata.expSubId}`, data);
      console.log("Saved data:", response.data);
      toast.success(`New SER ${response.data.sirNo} is generated successfully`, {
        autoClose: 700
      });
      fetchData();
      getImportlistfortableInexportEntry();
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error('error', {
        autoClose: 700
      })
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenforupdate, setIsModalOpenforupdate] = useState(false);
  const [isModalOpenforhistory, setIsModelOpenforhistory] = useState(false);
  const [isModalOpenforViewall, setIsModalOpenforViewall] = useState(false);
  const [isModelOpenforHandOver, setIsModelOpenforHndOver] = useState(false);
  const [isModalOpenforDelieveryUpdate, setIsModalOpenforDeliveryUpdate] = useState(false);
  const [isModalopenforpenalty, setIsmodalopenforpenalty] = useState(false);
  const [forimpsubid, setForimpsubid] = useState('');
  const [forreqid, setForreqid] = useState('');

  const openModalforreqid = () => {
    setIsModalOpen(true);
  };



  const closeModalforReqidforupdate = () => {
    setIsModalOpenforupdate(false);
    setFormErrors(
      {
        requestId: "",
        exporter: "",
        challanNo: "",
        invoiceNo: "",
        nop: "",
        gwWeight: "",
        netWeight: ""
      }
    )
  };

  const openModalforHandover = (req, sir) => {
    setIsModelOpenforHndOver(true);
    commonImportSub(req, sir, 'handover');
    //setHandOverdata(data);
    getCHAlist();
  }

  const closeModelforHistory = () => {
    setIsModelOpenforhistory(false);
  }

  const closeModalforViewall = () => {
    setIsModalOpenforViewall(false);
  }

  const closeModalforpenalty = () => {
    setIsmodalopenforpenalty(false);
    setPenaltydetail([]);
  }

  const closeModalforDelievery = () => {
    setIsModalOpenforDeliveryUpdate(false);
    setType1('');
    setFileData(null);
    setSelectedFile(null);
  }

  const closeModalforHandOver = () => {
    setIsModelOpenforHndOver(false);
    setCHAdata([]);
    setCHARepresentData([]);
    setCHARepresentative([]);
    setAllCHARepresentative([]);
    setSinglecha('');
    setHandOverdata([]);
    setSelectedOption('option1');
    setRepresentData([]);
    //setRepresentsingledata([]);
    setIm1('');
    setIm2('');
    setIm3('');
    setDeaultpartydata([]);
  }

  console.log('dgrtyhu', forimpsubid);

  const getlist = () => {
    axios
      .get(`http://${ipaddress}jardetail/dgdcStatus/${companyid}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setJarListDtl(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  const getNSDLExplist = () => {
    axios
      .get(`http://${ipaddress}jardetail/nsdlimpstatus/${companyid}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setJarNSDLExpDtl(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  const [getpartyId, setGetpartyId] = useState({});




  const fetchParty = async () => {
    try {
      const response = await axios.get(``);
      setParty(response.data);
      setGetpartyId(party.map((item) => item.partyName))
    } catch (error) {
      console.error("Error fetching party:", error);
    }
  }
  useEffect(() => {
    fetchParty();
  }, [companyid, branchId, data.exporter]);

  console.log('exporter ', getsubimportdata.exporter);


  const fetchPartyNames = async () => {
    try {
      const response = await fetch(`http://${ipaddress}parties/getAll/${companyid}/${branchId}`);
      const data = await response.json();
      const namesMap = {};
      data.forEach(party => {
        namesMap[party.partyId] = party.partyName;
      });
      setGetpartyId(namesMap);
      setPartys(data);
    } catch (error) {
      console.error("Error fetching party names:", error);
    }
  };


  const fetchData = () => {
    search1(searchFilters);
    // axios
    //   .get(`http://${ipaddress}importsub/alllgd/${companyid}/${branchId}`)
    //   .then((response) => {
    //     console.log("GET list response:", response.data);
    //     setGetsubimportdata(response.data); // Store the list in the state
    //   })
    //   .catch((error) => {
    //     console.error("GET list error:", error);
    //   });
  };

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);


  useEffect(() => {
    getlist();
    getNSDLExplist();
    fetchPartyNames();
  }, []);




  const formatDateTime = (value) => {
    if (!value) {
      return ""; // Return an empty string if value is empty or undefined
    }

    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} `;
  };

  const unixTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  };



  const [updatedata, setUpdateData] = useState({
    companyId: '',
    branchId: '',
    impSubId: '',
    requestId: '',
    sirNo: '',
    sirDate: '',
    importType: '',
    exporter: '',
    challanNo: '',
    challanDate: '',
    invoiceNo: '',
    invoiceDate: '',
    exporterName: '',
    exporterDate: new Date(),
    nop: '',
    netWeight: '',
    netWeightUnit: '',
    passedInWt: "",
    passedInWtUnit: "",
    productValue: '',
    currency: '',
    remarks: '',
    reentryDate: '',
    nsdlStatus: '',
    dgdcStatus: '',
    status: '',
    lgdStatus: "",
    handover_Party_CHA: "",
    handover_Party_Name: "",
    handover_Represntative_id: "",
    imposePenaltyAmount: "",
    imposePenaltyRemarks: "",
    status_document: '',
    createdBy: '',
    createdDate: '',
    editedBy: '',
    editedDate: '',
    approvedBy: '',
    approvedDate: ''
  });


  const openModalforreqidUpdate = (req, sir) => {
    setIsModalOpenforupdate(true);
    commonImportSub(req, sir, 'edit');
    // setUpdateData(data);
    fetchExportData();
  };

  const openModalforHistory = (req, sir) => {
    setIsModelOpenforhistory(true);
    commonImportSub(req, sir, 'history');
    // setImpHistory(data);
  }

  const openModalforViewall = (req, sir) => {
    setIsModalOpenforViewall(true);
    commonImportSub(req, sir, 'view');
    // setViewAll(data);
  }

  const openModalforpenalty = (req, sir) => {
    setIsmodalopenforpenalty(true);
    commonImportSub(req, sir, 'penalty');
    // setPenaltydetail(data);
  }


  const openModalfordeliveryupdate = (req, sir) => {
    setIsModalOpenforDeliveryUpdate(true);
    commonImportSub(req, sir, 'delivery');
    // setDeliverydata(data);
  }

  console.log('impsubhistory', impsubhistory);

  useEffect(() => {
    const getDataById = async () => {
      try {
        const response = await axios.get(`http://${ipaddress}importsub/byid/${companyid}/${branchId}/${forimpsubid}/${forreqid}`);
        console.log("GET list response:", response.data);
        setGetdatabyid(response.data);

      } catch (error) {
        console.error("GET list error:", error);
      }
    };

    if (forimpsubid !== '' && forreqid !== '') {
      getDataById();
    }
  }, [companyid, branchId, forimpsubid, forreqid]);

  const formattedChallanDate = unixTimestampToDate(updatedata.challanDate);

  const formattedInvoiceDate = unixTimestampToDate(updatedata.invoiceDate);

  const handleChallanDateChange = (event) => {
    const newDate = event.target.value;
    setUpdateData((prevData) => ({
      ...prevData,
      challanDate: new Date(newDate),
    }));
  };

  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!updatedata.requestId) {
      errors.requestId = "Request Id is required.";
    }

    if (!updatedata.exporter) {
      errors.exporter = "Exporter is required.";
    }

    if (!updatedata.exporterName) {
      errors.challanNo = "Exporter name is required.";
    }

    if (!updatedata.invoiceNo) {
      errors.invoiceNo = "Invoice no is required.";
    }

    if (!updatedata.nop) {
      errors.nop = "No. of packages is required.";
    }


    if (!updatedata.netWeight) {
      errors.netWeight = "Net weight is required.";
    }
    if (!updatedata.requestId) {
      document.getElementById('requestId').classList.add('error-border');
    }

    if (!updatedata.exporter) {
      document.getElementById('exporter').classList.add('error-border');
    }
    if (!updatedata.exporterName) {
      document.getElementById('exporterName').classList.add('error-border');
    }

    if (!updatedata.invoiceNo) {
      document.getElementById('invoiceNo').classList.add('error-border');
    }
    if (!updatedata.nop) {
      document.getElementById('nop').classList.add('error-border');
    }


    if (!updatedata.netWeight) {
      document.getElementById('netWeight').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      // Send a POST request to the server with the data object
      const response = await axios.post(`http://${ipaddress}importsub/updateData/${userId}`, updatedata);
      console.log("Saved data:", response.data);
      toast.success('Subcontract import updated successfully', {
        autoClose: 700
      });
      setUpdateData(response.data);
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error('error', {
        autoClose: 700
      });
    }
  };


  const handleUpdateforexportSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!updatedata.requestId) {
      errors.requestId = "Request Id is required.";
    }
    if (!updatedata.invoiceNo) {
      errors.invoiceNo = "Invoice no is required.";
    }

    if (!updatedata.nop) {
      errors.nop = "No. of packages is required.";
    }
    if (!updatedata.netWeight) {
      errors.netWeight = "Passed-In weight is required.";
    }
    if (!updatedata.requestId) {
      document.getElementById('requestId').classList.add('error-border');
    }

    if (!updatedata.invoiceNo) {
      document.getElementById('invoiceNo').classList.add('error-border');
    }
    if (!updatedata.nop) {
      document.getElementById('nop').classList.add('error-border');
    }

    if (!updatedata.netWeight) {
      document.getElementById('netWeight').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      // Send a POST request to the server with the data object
      const response = await axios.post(`http://${ipaddress}importsub/updateData/${userId}`, updatedata);
      console.log("Saved data:", response.data);
      toast.success('Subcontract import updated successfully', {
        autoClose: 700
      });
      setUpdateData(response.data);
      fetchData();
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error('error', {
        autoClose: 700
      });
    }
  };

  const oneparty = () => {
    axios
      .get(`http://${ipaddress}parties/${companyid}/${branchId}/${impsubhistory.exporter}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setOneParty(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  }
  useEffect(() => {
    oneparty();
  }, [companyid, branchId, impsubhistory.exporter]);


  const handleInviceDateChange = (date) => {
    setUpdateData((prevData) => ({
      ...prevData,
      invoiceDate: date, // Update the date directly without event.target
    }));
  };
  const [searchFilters, setSearchFilters] = useState({
    sirNo: '',
    startDate: new Date(), // Initialize to null
    endDate: new Date(), // Initialize to null
    dgdcStatus: '',
  });
  const [filteredData, setFilteredData] = useState([]);



  const handleStartDateChange = (date) => {
    setSearchFilters({
      ...searchFilters,
      startDate: date,
    });
  };

  const handleEndDateChange = (date) => {
    setSearchFilters({
      ...searchFilters,
      endDate: date,
    });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };


  const convertToDateWithoutTime = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return new Date(`${year}-${month}-${day}`);
    } catch (error) {
      console.error('Error converting date:', error);
      return null;
    }
  };
  const convertUnixTimestampToDate = (timestamp) => {
    try {
      const date = new Date(timestamp);

      // Check if the Date object is valid
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return new Date(`${year}-${month}-${day}`);
    } catch (error) {
      console.error('Error converting date:', error);
      return null;
    }
  };

  const handleSearch = () => {
    const filteredResults = getsubimportdata.filter((data) => {
      const serNoMatches = searchFilters.sirNo === '' || (data.sirNo ?? '').includes(searchFilters.sirNo) || (data.requestId ?? '').includes(searchFilters.sirNo);

      // Convert searchFilters.startDate and data.serDate to Date objects with "yyyy-MM-dd" format
      const startDate = convertToDateWithoutTime(searchFilters.startDate);
      const endDate = convertToDateWithoutTime(searchFilters.endDate);
      const dataDate = convertUnixTimestampToDate(data.sirDate);
      // Check if the Date objects are valid before comparing
      if (!startDate || !endDate || !dataDate) {
        return false; // Skip invalid dates
      }

      // Check if the values are valid Date objects before comparing
      const startDateMatches = dataDate.getTime() >= startDate.getTime();
      const endDateMatches = dataDate <= endDate;

      const dgdcStatusMatches = searchFilters.dgdcStatus === '' || data.dgdcStatus === searchFilters.dgdcStatus;

      return serNoMatches && startDateMatches && endDateMatches && dgdcStatusMatches;
    });
    if (filteredData.length > 0) {
      setCurrentPage5(1); // Reset the current page to 1

    }
    // setFilteredData(filteredResults);
  };


  const convertToFormattedDate = (inputDate) => {
    const dateObject = new Date(inputDate);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    search1(searchFilters);
  }, [0]);

  const [loading, setloading] = useState(false);
  const search1 = (searchFilters) => {
    setloading(true);

    axios
      .get(`http://${ipaddress}importsub/search1?searchValue=${searchFilters.sirNo}&companyid=${companyid}&branchId=${branchId}&dgdcStatus=${searchFilters.dgdcStatus}&startDate=${convertToFormattedDate(searchFilters.startDate)}&endDate=${convertToFormattedDate(searchFilters.endDate)}`)
      .then((response) => {
        setFilteredData(response.data);
        setloading(false);
        // if (filteredData.length > 0) {
        //   setCurrentPage5(1); // Reset the current page to 1

        // }
        // console.log('formData13453453 ', response.data);
      })
      .catch((error) => {
        setloading(false);
        console.error("Error in search1 request:", error);
        // Handle the error, e.g., display an error message to the user
      });
  };
  // console.log('filterdata ', searchFilters);

  // useEffect(() => {
  //   //  handleSearch();
  //   //search1();
  // }, [getsubimportdata])





  // const handleClear = () => {
  //   setSearchFilters({
  //     sirNo: '',
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     dgdcStatus: '',
  //   });
  //   // setFilteredData([]);

  //   // handleSearch();
  //   fetchData();

  //   if (filteredData.length > 0) {
  //     setCurrentPage5(1); // Reset the current page to 1

  //   }
  // };




  const resetSearch = {
    sirNo: '',
    startDate: new Date(),
    endDate: new Date(),
    dgdcStatus: '',
  };

  const setCurrentPageFun = () => {
    setCurrentPage5(1);
  };

  const handleClear = () => {
    setSearchFilters({
      sirNo: '',
      startDate: new Date(),
      endDate: new Date(),
      dgdcStatus: '',
    });
    // setFilteredData([]);

    // handleSearch();
    search1(resetSearch);
    setCurrentPageFun();

    // if (filteredData.length > 0) {
    //   setCurrentPage5(1); // Reset the current page to 1

    // }
  };



  const [selectedDate, setSelectedDate] = useState(null);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSelectedDate(new Date()); // Set the selected date to the current date
    }
  };

  const handleDeliverySubmit = async (event) => {
    event.preventDefault();
    // closeModalforDelievery();
    if (!selectedFile) {
      // Display an error message or perform any other actions you want
      toast.error('Please select a file before submitting', {
        autoClose: 700
      });
      return; // Prevent further execution of the function
    }

    // if (!nsdldata) {
    //   // Display an error message or perform any other actions you want
    //   toast.error('Please select a nsdl status before submitting');
    //   return; // Prevent further execution of the function
    // }

    // const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    // if (!allowedFileTypes.includes(selectedFile.type)) {
    //   // Display an error message for unsupported file types
    //   toast.error('Unsupported file type. Please select a PDF, JPEG, JPG, or PNG file.');
    //   return; // Prevent further execution of the function
    // }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(
        `http://${ipaddress}importsub/changedata/${deliverydata.nsdlStatus}/${companyid}/${branchId}/${deliverydata.impSubId}/${deliverydata.requestId}`,
        formData, // Use formData as the request body
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
          },
          // Assuming updatedImportSub is a JSON object
        },

      );

      console.log('Saved data:', response.data);
      fetchData();
      closeModalforDelievery();
      toast.success('Upload Successfully', {
        autoClose: 700
      });
      // Fetch data or perform other actions after successful submission
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Error uploading', {
        autoClose: 700
      });
    }
  };

  const [selectedOption, setSelectedOption] = useState('option1');

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
    getCHAlist();
    setCHARepresentative([]);
    getRepresentlistforCHA();
    setRepresentdata([]);
    getRepresentlist();
    setIm1('');
    setIm2('');
    setIm3('');
    setGetotpapprove([]);
    setGetapprove([]);
    getRepresentlistforALLCHA();
    setAllCHARepresentative([]);
  };


  const renderTable = () => (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 70 },
          ]}
        >
          Type
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 100 },
          ]}
        >
          SIR No
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 120 },
          ]}
        >
          SIR Date
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 100 },
          ]}
        >
          No. Of Packages
        </Text>

        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 150 },
          ]}
        >
          Passed-In Weight
        </Text>

      </View>
      {impallhistory.map((item, index) => (
        <View key={index} style={styles.tableRow} >
          <Text style={{ ...styles.tableCell, fontSize: 10, width: 70 }}>
            Import
          </Text>
          <Text style={{ ...styles.tableCell, fontSize: 10, width: 100 }}>
            {item.sirNo}
          </Text>
          <Text style={{ ...styles.tableCell, fontSize: 10, width: 120 }}>
            {formatDateTime(item.sirDate)}
          </Text>
          <Text style={{ ...styles.tableCell, fontSize: 10, width: 100 }}>
            {item.nop}
          </Text>

          <Text style={{ ...styles.tableCell, fontSize: 10, width: 150 }}>
            {item.netWeight}({item.netWeightUnit})
          </Text>

        </View>
      ))}
    </View>
  );


  const renderTable1 = () => (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 70 },
          ]}
        >
          Type
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 100 },
          ]}
        >
          SER No
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 120 },
          ]}
        >
          SER Date
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 100 },
          ]}
        >
          No. Of Packages
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 150 },
          ]}
        >
          Gross Weight
        </Text>

        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 150 },
          ]}
        >
          PassedOut Weight
        </Text>

      </View>

      <View style={styles.tableRow} >
        <Text style={{ ...styles.tableCell, fontSize: 10, width: 70 }}>
          Export
        </Text>
        <Text style={{ ...styles.tableCell, fontSize: 10, width: 100 }}>
          {expsubhistory.serNo}
        </Text>
        <Text style={{ ...styles.tableCell, fontSize: 10, width: 120 }}>
          {formatDateTime(expsubhistory.serDate)}
        </Text>
        <Text style={{ ...styles.tableCell, fontSize: 10, width: 100 }}>
          {expsubhistory.nop}
        </Text>
        <Text style={{ ...styles.tableCell, fontSize: 10, width: 150 }}>
          {expsubhistory.gwWeight}
        </Text>
        <Text style={{ ...styles.tableCell, fontSize: 10, width: 150 }}>
          {expsubhistory.passoutWeight}({expsubhistory.passoutWeightUnit})
        </Text>

      </View>

    </View>
  );

  function getCurrentDateTimeFormatted() {
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear() % 100; // Get the last two digits of the year
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = String(minutes).padStart(2, "0");

    const formattedDateTime = `${month}/${day}/${year}, ${formattedHours}:${formattedMinutes} ${period}`;

    return formattedDateTime;
  }

  const MyPDFDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.dateSize}>{getCurrentDateTimeFormatted()}</Text>
        </View>
        <View style={styles.header}>
          <Image style={styles.image} src={DGDCimage} />
        </View>
        <View style={styles.heading}>
          <Text style={styles.heading}>SEEPZ-SEZ Address:</Text>
          <Text style={styles.heading}>Unit-50, Plot-F1, SDF, Gem & Jewellery Complex-1, SEEPZ-SEZ, Andheri (E),Mumbai-400096</Text>
          <Text style={styles.heading}>
            GST NO. :  {getOneParty.gstNo}
          </Text>

          <Text style={styles.mainheading}>
            Subcontract History
          </Text>
        </View>
        <View>
          <Text style={styles.normaltext2}>
            Request ID:  {impsubhistory.requestId}
          </Text>
          <Text style={styles.normaltext3}>
            Unit Name:  {getpartyId[impsubhistory.exporter]}
          </Text>
        </View>


        {renderTable()}



        <Text style={styles.normaltext2}>
          Net Pending Quantity:  {-impsubhistory.netWeight}
        </Text>


      </Page>
    </Document>
  );

  const [getexportdata, setExportdata] = useState([]);

  const getsearchreqid = (e) => {
    setReqidd(e.target.value);


  }

  const fetchDataforcrosscheck = (itemm3) => {
    if (itemm3.length !== 12) {
      toast.error("Request Id must be 12 digit", {
        autoClose: 700
      })
      return;
    }
    axios
      .get(`http://${ipaddress}importsub/alllgd/${companyid}/${branchId}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        const exportData = response.data;
        const isRequestIdPresent = exportData.some((item) => item.requestId === itemm3);

        if (isRequestIdPresent) {
          // Display an error message and set isDivVisible to false

          toast.error("Duplicate Request Id not allowed.", {
            autoClose: 700
          })
          setIsDivVisible(false);
          setData(
            {
              companyId: "",
              branchId: "",
              impSubId: "",
              requestId: '',
              sirNo: "",
              sirDate: "",
              importType: "LGD",
              exporter: "",
              challanNo: "",
              challanDate: new Date(),
              invoiceNo: "",
              invoiceDate: new Date(),
              nop: "",
              netWeight: "",
              netWeightUnit: "",
              passedInWt: "",
              passedInWtUnit: "",
              productValue: "",
              currency: "",
              remarks: "",
              reentryDate: new Date(),
              nsdlStatus: "",
              dgdcStatus: "",
              status: "",
              lgdStatus: "",
              handover_Party_CHA: "",
              handover_Party_Name: "",
              handover_Represntative_id: "",
              imposePenaltyAmount: "",
              imposePenaltyRemarks: "",
              status_document: "",
              createdBy: "",
              createdDate: "",
              editedBy: "",
              editedDate: "",
              approvedBy: "",
              approvedDate: ""
            }
          );
        } else {
          // Set isDivVisible to true and store the list in the state
          setIsDivVisible(true);
          setLowerInputReqId(getreqidd);
        }
      })
      .catch((error) => {
        console.error("GET list error:", error);

      });
  };

  const getExportlist = () => {
    if (!isDivVisible) {
      setLowerInputReqId(getreqidd); // Set the value of lower input box when search button is clicked
    }

    setIsDivVisible(true);
    setLowerInputReqId(getreqidd);
    axios
      .get(`http://${ipaddress}importsub/getexpdata/${companyid}/${branchId}/${getreqidd}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setExportdata(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  const [getexportforcheckdata, setExportdataforcheck] = useState([]);
  const [datalist1, setDatalist1] = useState('');

  const fetchExportData = useCallback(() => {
    axios
      .get(`http://${ipaddress}exportsub/checkdata/${companyid}/${branchId}`)
      .then((response) => {
        console.log("fetchExportData: ", response.data);
        setExportdataforcheck(response.data);
        const dataexist = response.data.some(item => item.requestId === updatedata.requestId); // Store the list in the state
        setDatalist1(dataexist);
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  }, [companyid, branchId]);

  useEffect(() => {
    fetchExportData();
  }, [companyid, branchId]);


  console.log("exportdata ", getexportdata);

  const dataexist = getexportforcheckdata.some(item => item.requestId === updatedata.requestId);

  const getExportlistfortable = () => {

    axios
      .get(`http://${ipaddress}importsub/getexpdata/${companyid}/${branchId}/${impsubhistory.requestId}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setExpHistory(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getExportlistfortable();
  }, [companyid, branchId, impsubhistory.requestId]);

  const [impallhistory, setImpallhistory] = useState([]);

  const getImportlistfortable = () => {

    axios
      .get(`http://${ipaddress}importsub/getimpdata/${companyid}/${branchId}/${impsubhistory.requestId}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setImpallhistory(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getImportlistfortable();
  }, [companyid, branchId, impsubhistory.requestId]);

  const [importsubhistory, setImportsubhistory] = useState([]);
  const importsubhistorydata = () => {

    axios
      .get(`http://${ipaddress}importsub/history/${companyid}/${branchId}/${impsubhistory.requestId}/${impsubhistory.sirNo}`)
      .then((response) => {

        setImportsubhistory(response.data);
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    importsubhistorydata();
  }, [companyid, branchId, impsubhistory.requestId, impsubhistory.sirNo]
  )


  const sumOfNetWeights = impallhistory.reduce((accumulator, item) => accumulator + item.netWeight, 0);

  const [importdataforexport, setImportdataforexport] = useState([]);

  const getImportlistfortableInexportEntry = () => {

    axios
      .get(`http://${ipaddress}importsub/getimpdata/${companyid}/${branchId}/${getexportdata.requestId}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setImportdataforexport(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getImportlistfortableInexportEntry();
  }, [companyid, branchId, getexportdata.requestId]);

  const sumOfNetWeightsforex = importdataforexport.reduce((accumulator, item) => accumulator + item.netWeight, 0);






  const [CHAdata, setCHAdata] = useState([]);
  const [representdata, setRepresentdata] = useState([]);

  const getCHAlist = () => {
    axios
      .get(`http://${ipaddress}externalparty/alldata/${companyid}/${branchId}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setCHAdata(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getCHAlist();
  }, [companyid, branchId])


  const getRepresentlist = () => {
    axios
      .get(`http://${ipaddress}represent/byuiddata/${companyid}/${branchId}/${handoverdata.exporter}`)
      .then((response) => {
        console.log("Representttt ", response.data);
        setRepresentdata(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getRepresentlist();
  }, [companyid, branchId, handoverdata.exporter])

  const [representData, setRepresentData] = useState([]);
  const [selectRepresentdata, setSelectrepresentdata] = useState('');
  const [getotp, setGetOtp] = useState('');

  const handleOTP = (e) => {
    setGetOtp(e.target.value);
  }

  console.log('Otpppp ', getotp);


  const handlerepresent = (e) => {

    setSelectrepresentdata(e.target.value);
  }

  console.log('selectRepresentdata ' + selectRepresentdata);

  const [imageData1, setImageData1] = useState(null);
  const [im1, setIm1] = useState('');

  const imageFile1 = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}represent/getImage/${companyid}/${branchId}/${selectRepresentdata}`, {
        responseType: 'arraybuffer', // Tell Axios to treat the response as binary data
      });

      // Extract the content type from the response headers
      const contentType = response.headers['content-type'];

      // Create a Blob from the binary data
      const blob = new Blob([response.data], { type: contentType });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Set the file data in the state
      setImageData1({ url, contentType });
      setIm1('Y');
    } catch (error) {
      setError('Error downloading file');
      setIm1('N')
    }
  };

  useEffect(() => {
    imageFile1();
  }, [companyid, branchId, selectRepresentdata])

  const getRepresentData = () => {
    axios
      .get(`http://${ipaddress}represent/byrepresentid/${companyid}/${branchId}/${selectRepresentdata}`)
      .then((response) => {

        setRepresentData(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getRepresentData();
  }, [companyid, branchId, selectRepresentdata])

  const [getotpapprove, setGetotpapprove] = useState('');
  const approvedByOTPSpanRef = useRef('');
  useEffect(() => {
    if (approvedByOTPSpanRef.current) {
      const approvedByValue = approvedByOTPSpanRef.current.textContent;
      setGetotpapprove(approvedByValue);
      // Now you can use the 'approvedByValue' variable to store or manipulate the value
      console.log('Approved By Value:', approvedByValue);
    }
  }, [representData.mobile]);


  const checkotp1 = () => {
    if (!selectRepresentdata) {
      toast.error("Please select representative", {
        autoClose: 700
      })
      return;
    }

    if (!getotpapprove) {
      toast.error("Please select mobile no.", {
        autoClose: 700
      })
      return;
    }
    axios
      .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectRepresentdata}/${getotpapprove}/${handoverdata.nop}`)
      .then(() => {
        toast.success("OTP sent successfully", {
          autoClose: 700
        })

      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  const handleVerifyOTP = async () => {
    if (!selectRepresentdata) {
      toast.error("Please select representative", {
        autoClose: 700
      })
      return;
    }
    if (!getotpapprove) {
      toast.error("Please select mobile no.", {
        autoClose: 700
      })
      return;
    }
    if (!getotp) {
      toast.error("OTP not available", {
        autoClose: 700
      })
      return;
    }
    try {
      const response = await axios.get(`http://${ipaddress}represent/checkimpotp/${companyid}/${branchId}/${selectRepresentdata}/${getotpapprove}/${getotp}/${handoverdata.impSubId}/${handoverdata.requestId}/${handoverdata.exporter}/${userId}`);
      if (response.status === 200) {
        toast.success("Successful...", {
          autoClose: 700
        })
        closeModalforHandOver();
        importsubhistorydata();
        fetchData();
      }
    } catch (error) {
      toast.error('Something went wrong', {
        autoClose: 700
      });
    }
  };

  console.log('Handoverdataaaa ', handoverdata.sirNo);

  const [getdefaultpartyata, setDeaultpartydata] = useState([]);
  const getDefaultData = () => {
    axios
      .get(`http://${ipaddress}defaultparty/getdata/${companyid}/${branchId}/${handoverdata.exporter}`)
      .then((response) => {

        setDeaultpartydata(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getDefaultData();
  }, [companyid, branchId, handoverdata.exporter])

  const [getrepresentSingledata, setRepresentsingledata] = useState([]);
  const getSinglerepresent = () => {
    axios
      .get(`http://${ipaddress}externalparty/singledata/${companyid}/${branchId}/${getdefaultpartyata.impCHA}`)
      .then((response) => {

        setRepresentsingledata(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getSinglerepresent();
  }, [companyid, branchId, getdefaultpartyata.expCHA])

  const [CHARepresentavive, setCHARepresentative] = useState([]);

  const getRepresentlistforCHA = () => {
    axios
      .get(`http://${ipaddress}represent/byuiddata/${companyid}/${branchId}/${getrepresentSingledata.externaluserId}`)
      .then((response) => {
        console.log("Representttt ", response.data);
        setCHARepresentative(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getRepresentlistforCHA();
  }, [companyid, branchId, getrepresentSingledata.externaluserId])

  const [CHArepresentData, setCHARepresentData] = useState([]);

  const getCHARepresentData = () => {
    axios
      .get(`http://${ipaddress}represent/byrepresentid/${companyid}/${branchId}/${selectRepresentdata}`)
      .then((response) => {

        setCHARepresentData(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getCHARepresentData();
  }, [companyid, branchId, selectRepresentdata])

  const [getapprove, setGetapprove] = useState('');
  const approvedBySpanRef = useRef('');
  useEffect(() => {
    if (approvedBySpanRef.current) {
      const approvedByValue = approvedBySpanRef.current.textContent;
      setGetapprove(approvedByValue);
      // Now you can use the 'approvedByValue' variable to store or manipulate the value
      console.log('Approved By Value:', approvedByValue);
    }
  }, [CHArepresentData.mobile]);

  const [imageData2, setImageData2] = useState(null);
  const [im2, setIm2] = useState('');
  const imageFile2 = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}represent/getImage/${companyid}/${branchId}/${selectRepresentdata}`, {
        responseType: 'arraybuffer', // Tell Axios to treat the response as binary data
      });

      // Extract the content type from the response headers
      const contentType = response.headers['content-type'];

      // Create a Blob from the binary data
      const blob = new Blob([response.data], { type: contentType });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Set the file data in the state
      setImageData2({ url, contentType });
      setIm2('Y');

    } catch (error) {
      setError('Error downloading file');
      setIm2("N");
    }
  };

  useEffect(() => {
    imageFile2();
  }, [companyid, branchId, selectRepresentdata])


  const checkotp2 = () => {
    if (!selectRepresentdata) {
      toast.error("Please select representative", {
        autoClose: 700
      })
      return;
    }

    if (!CHArepresentData.mobile) {
      toast.error("Please select mobile no.", {
        autoClose: 700
      })
      return;
    }
    axios
      .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectRepresentdata}/${CHArepresentData.mobile}/${handoverdata.nop}`)
      .then(() => {
        toast.success("OTP sent successfully", {
          autoClose: 700
        })

      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  const handleVerifCHAyOTP = async () => {
    if (!selectRepresentdata) {
      toast.error("Please select representative", {
        autoClose: 700
      })
      return;
    }
    if (!CHArepresentData.mobile) {
      toast.error("Please select mobile no.", {
        autoClose: 700
      })
      return;
    }
    if (!getotp) {
      toast.error("OTP not available", {
        autoClose: 700
      })
      return;
    }
    try {
      const response = await axios.get(`http://${ipaddress}represent/checkimpCHAotp/${companyid}/${branchId}/${selectRepresentdata}/${CHArepresentData.mobile}/${getotp}/${handoverdata.impSubId}/${handoverdata.requestId}/${getrepresentSingledata.externaluserId}/${userId}`);
      if (response.status === 200) {
        toast.success("Successful...", {
          autoClose: 700
        })
        closeModalforHandOver();
        fetchData();
        importsubhistorydata();
      }
    } catch (error) {
      toast.error('Something went wrong', {
        autoClose: 700
      });
    }
  };


  const [AllCHARepresentavive, setAllCHARepresentative] = useState([]);
  const [getsinglecha, setSinglecha] = useState('');

  const handlegetsinglecha = (e) => {
    setSinglecha(e.target.value);
    setCHARepresentData('No');
    setIm1('');
    setIm2('');
    setIm3('');
  }

  const getRepresentlistforALLCHA = () => {
    setAllCHARepresentative([]);
    axios
      .get(`http://${ipaddress}represent/byuiddata/${companyid}/${branchId}/${getsinglecha}`)
      .then((response) => {
        console.log("Representttt ", response.data);
        setAllCHARepresentative(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getRepresentlistforALLCHA();
  }, [companyid, branchId, getsinglecha])


  const [imageData3, setImageData3] = useState(null);
  const [im3, setIm3] = useState('');
  const imageFile3 = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}represent/getImage/${companyid}/${branchId}/${selectRepresentdata}`, {
        responseType: 'arraybuffer', // Tell Axios to treat the response as binary data
      });

      // Extract the content type from the response headers
      const contentType = response.headers['content-type'];

      // Create a Blob from the binary data
      const blob = new Blob([response.data], { type: contentType });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);
      setIm3('Y');
      // Set the file data in the state
      setImageData3({ url, contentType });

    } catch (error) {
      setError('Error downloading file');
      setIm3('N');
    }
  };

  useEffect(() => {
    imageFile3();
  }, [companyid, branchId, selectRepresentdata])

  const checkotp3 = () => {
    if (!selectRepresentdata) {
      toast.error("Please select representative", {
        autoClose: 700
      })
      return;
    }

    if (!getapprove) {
      toast.error("Please select mobile no.", {
        autoClose: 700
      })
      return;
    }
    axios
      .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectRepresentdata}/${getapprove}/${handoverdata.nop}`)
      .then(() => {
        toast.success("OTP sent successfully", {
          autoClose: 700
        })

      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };


  const handleVerifAllCHAyOTP = async () => {
    if (!selectRepresentdata) {
      toast.error("Please select representative", {
        autoClose: 700
      })
      return;
    }
    if (!getapprove) {
      toast.error("Please select mobile no.", {
        autoClose: 700
      })
      return;
    }
    if (!getotp) {
      toast.error("OTP not available", {
        autoClose: 700
      })
      return;
    }
    try {
      const response = await axios.get(`http://${ipaddress}represent/checkimpCHAotp/${companyid}/${branchId}/${selectRepresentdata}/${getapprove}/${getotp}/${handoverdata.impSubId}/${handoverdata.requestId}/${getsinglecha}/${userId}`);
      if (response.status === 200) {
        toast.success("Successful...", {
          autoClose: 700
        })
        closeModalforHandOver();
        importsubhistorydata();
        fetchData();
      }
    } catch (error) {
      toast.error('Something went wrong', {
        autoClose: 700
      });
    }
  };
  console.log("iushuierhteriut ", nsdldata, companyid, branchId, deliverydata.impSubId, deliverydata.requestId);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const itemsToDisplay = filteredData.slice(startIndex, endIndex);

  const handlepenaltychange = (event) => {
    const { name, value } = event.target;
    setPenaltydetail((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const getpenaltystatus = () => {
    if (!penaltydetail.imposePenaltyAmount) {
      toast.error("Please enter the penalty amount..", {
        autoClose: 700
      })
      return;
    }
    axios
      .post(`http://${ipaddress}importsub/penalty`, penaltydetail)
      .then((response) => {
        toast.success('Penalty Isseued Successfully..', {
          autoClose: 700
        });
        setPenaltydetail(response.data);
        fetchData();
      })
      .catch((error) => {
        console.error("GET list error:", error);
        toast.error("Please check the data before submitting..", {
          autoClose: 700
        })
      });
  };
  const savegateinout = (req, ser) => {

    axios
      .post(`http://${ipaddress}gateinout/saveimpsub/${companyid}/${branchId}/${req}/${ser}`)
      .then(() => {

        fetchData();
      })
      .catch((error) => {

      });
  };

  const printBarcode = async (mawb, seino, nop, sirdate, reqdate, niptStatus, requestId, subtype) => {
    try {
      // console.log(mawb, seino, nop);
      const response = await InviceService.getbarcode(mawb, seino, nop, sirdate, reqdate, "SUBIMPORT", niptStatus, requestId, "HAWB", "IGM", subtype);

      // Check if the response status is OK (200)
      if (response.status === 200) {
        // Get the raw response data as base64-encoded string
        const newWindow = window.open('', '_blank');
        newWindow.document.write(response.data);
        setTimeout(() => {
          newWindow.print(); // Open the print dialog
        }, 100);
      } else {
        throw new Error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [fileData, setFileData] = useState(null);
  const [type1, setType1] = useState('');
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  console.log('deliverydata ', deliverydata);
  const downloadFile = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}importsub/download/${companyid}/${branchId}/${deliverydata.impSubId}/${deliverydata.requestId}`, {
        responseType: 'arraybuffer', // Tell Axios to treat the response as binary data
      });

      // Extract the content type from the response headers
      const contentType = response.headers['content-type'];

      // Create a Blob from the binary data
      const blob = new Blob([response.data], { type: contentType });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Set the file data in the state
      setFileData({ url, contentType });

      if (contentType === 'application/pdf') {
        setType1('app');
        openPdfInNewTab();
      }
      else {
        setModalIsOpen(true);
      }

    } catch (error) {
      setError('Error downloading file');
    }
  };
  console.log('fileData', type1);
  const closeModal = () => {
    setFileData(null); // Clear the image URL
    setModalIsOpen(false); // Close the modal
  };


  // Model Open Const 
  // Model Open Show 
  const [modalDocumentShow, setModalDocumentShow] = useState(false);
  const closeModalDocumentShow = () => {
    setModalDocumentShow(false);
  };

  const openDocument = () => {
    setModalDocumentShow(true);
  };



















  const extractFileName = (filePath) => {
    if (typeof filePath === 'string') {
      const parts = filePath.split('/');
      const fileName = parts[parts.length - 1];
      return fileName;
    } else {
      // Handle cases where filePath is not a string (or is undefined/null)
      return 'Invalid File Path';
    }
  }
  const openPdfInNewTab = () => {
    if (fileData) {
      window.open(fileData.url, '_blank'); // Open the PDF in a new tab
    }
  };
  console.log('getexportforcheckdata ', getexportforcheckdata);
  console.log('updatedata ', updatedata);

  const convertTimestampToDateTime = (timestamp) => {
    const date = new Date(timestamp);

    // Get the individual components (day, month, year, hours, minutes, seconds)
    const day = date.getDate();
    const month = date.getMonth() + 1; // Note: Months are zero-based, so we add 1
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Create a formatted date and time string
    const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
  }



  // Multiple record handed over to Party/CHA
  const [getrepresentData, setGetrepresentData] = useState([]);
  const [selectRepresentdataa, setSelectrepresentdataa] = useState('');
  const [getrepresentData1, setGetrepresentData1] = useState([]);
  const [selectRepresentdataa1, setSelectrepresentdataa1] = useState('');
  const [getOtp5, setGetotp5] = useState('');
  const [selectCHA, setSelectedCHA] = useState('');
  const [isModalOpenforhandedover, setIsModalOpenforhandedover] = useState(false);
  const [multiplehandoverdata, setMultiplehandoverdata] = useState([]);

  const openModalforMultiplehandover = () => {
    setIsModalOpenforhandedover(true);
    getCHAData();
  }

  const closeModalforMultiplehandover = () => {
    setIsModalOpenforhandedover(false);
    setGetparty('');
    setPartydata1([]);
    setSelectedOption1('option1');
    setSelectAll2(false);
    setGetrepresentData([]);
    setGetOTPapprove('');
    setallCHARepresentative([]);
    setSelectrepresentdataa('');
    setSelectedCHA([]);
    setList2([]);
    setSelectAll3(false);
    setGetrepresentData1([]);
    setGetOTPapprove1('');
    setallCHARepresentative1([]);
    setSelectrepresentdataa1('');

    setGetalldatabyCHA([]);
  }

  const [selectedOption1, setSelectedOption1] = useState('option1');

  const handleRadioChange1 = (event) => {
    setSelectedOption1(event.target.value);
  }

  const [getparty, setGetparty] = useState('');
  const [partydata1, setPartydata1] = useState([]);
  console.log('getparty ', getparty);
  const checkpartytohandover = () => {
    axios
      .get(`http://${ipaddress}importsub/checkimportpartydata1/${companyid}/${branchId}/${getparty}`)
      .then((response) => {
        console.log('partydata1 ', response.data);
        if (response.data.length == 0) {
          toast.error("Data not found", {
            autoClose: 700
          })
          setGetparty('');
          setPartydata1([]);
          return;
        }
        setPartydata1(response.data);

      })
      .catch((error) => {
        if (error) {
          toast.error("Data not found", {
            autoClose: 700
          })
          setGetparty('');
          setPartydata1([]);
          return;
        }
        console.error("GET list error:", error);
      });
  }

  const [selectedRows2, setSelectedRows2] = useState([]);
  const [selectAll2, setSelectAll2] = useState(false);


  const handleCheckboxChange3 = (item) => {
    // Toggle the selection state for the clicked row
    if (selectedRows2.includes(item)) {
      setSelectedRows2(selectedRows2.filter((row) => row !== item));
    } else {
      setSelectedRows2([...selectedRows2, item]);
    }
  };

  const handleSelectAll2 = () => {
    if (selectAll2) {
      setSelectedRows2([]);
    } else {
      setSelectedRows2([...partydata1]); // Clone the array
    }
    setSelectAll2(!selectAll2);
  };


  const [selectedRows3, setSelectedRows3] = useState([]);
  const [selectAll3, setSelectAll3] = useState(false);


  const handleCheckboxChange4 = (item) => {
    // Toggle the selection state for the clicked row
    if (selectedRows3.includes(item)) {
      setSelectedRows3(selectedRows3.filter((row) => row !== item));
    } else {
      setSelectedRows3([...selectedRows3, item]);
    }
  };

  const handleSelectAll4 = () => {
    if (selectAll3) {
      setSelectedRows3([]);
    } else {
      setSelectedRows3([...getalldatabyCHA]); // Clone the array
    }
    setSelectAll3(!selectAll3);
  };


  const [imageData5, setImageData5] = useState(null);
  const [im5, setIm5] = useState('');

  const imageFile5 = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}represent/getImage/${companyid}/${branchId}/${selectRepresentdataa}`, {
        responseType: 'arraybuffer', // Tell Axios to treat the response as binary data
      });

      // Extract the content type from the response headers
      const contentType = response.headers['content-type'];

      // Create a Blob from the binary data
      const blob = new Blob([response.data], { type: contentType });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Set the file data in the state
      setImageData5({ url, contentType });
      setIm5('Y');
    } catch (error) {

      setIm5('N')
    }
  };

  useEffect(() => {
    imageFile5();
  }, [companyid, branchId, selectRepresentdataa])


  // CHA
  const [imageData6, setImageData6] = useState(null);
  const [im6, setIm6] = useState('');

  const imageFile6 = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}represent/getImage/${companyid}/${branchId}/${selectRepresentdataa1}`, {
        responseType: 'arraybuffer', // Tell Axios to treat the response as binary data
      });

      // Extract the content type from the response headers
      const contentType = response.headers['content-type'];

      // Create a Blob from the binary data
      const blob = new Blob([response.data], { type: contentType });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Set the file data in the state
      setImageData6({ url, contentType });
      setIm6('Y');
    } catch (error) {

      setIm6('N')
    }
  };

  useEffect(() => {
    imageFile6();
  }, [companyid, branchId, selectRepresentdataa1])

  const handlepartyrepresent1 = (e) => {

    setSelectrepresentdataa1(e.target.value);
  }

  const [allCHARepresentavive1, setallCHARepresentative1] = useState([]);
  const [getRepresentName1, setGetrepresentName1] = useState('');
  const getRepresentlistforALLCarting1 = () => {

    axios
      .get(`http://${ipaddress}represent/byuiddata/${companyid}/${branchId}/${selectCHA}`)
      .then((response) => {
        setallCHARepresentative1(response.data);
        const namesMap = {};
        response.data.forEach(party => {
          namesMap[party.representativeId] = party.firstName + " " + party.lastName;
        });
        setGetrepresentName1(namesMap);// Store the list in the state
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    getRepresentlistforALLCarting1();
  }, [companyid, branchId, selectCHA])

  const getCartingRepresentData1 = () => {
    axios
      .get(`http://${ipaddress}represent/byrepresentid/${companyid}/${branchId}/${selectRepresentdataa1}`)
      .then((response) => {

        setGetrepresentData1(response.data); // Store the list in the state
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    getCartingRepresentData1();
  }, [companyid, branchId, selectRepresentdataa1])

  const [getOTPapprove1, setGetOTPapprove1] = useState('');
  const approvedByotpSpanRef1 = useRef('');
  useEffect(() => {
    if (approvedByotpSpanRef1.current) {
      const approvedByValue = approvedByotpSpanRef1.current.textContent;
      setGetOTPapprove1(approvedByValue);
      // Now you can use the 'approvedByValue' variable to store or manipulate the value
    }
  }, [getrepresentData1.mobile]);

  const [getotp6, setGetOtp6] = useState('');

  const handleOTP6 = (e) => {
    setGetOtp6(e.target.value);
  }

  const checkotp6 = () => {
    if (!selectRepresentdataa1) {
      toast.error("Please select representative", {
        autoClose: 700
      })
      return;
    }

    if (!getOTPapprove1) {
      toast.error("Please select mobile no.", {
        autoClose: 700
      })
      return;
    }
    const nop1 = selectedRows3.reduce((total, item) => total + item.nop, 0);
    axios
      .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectRepresentdataa1}/${getrepresentData1.mobile}/${nop1}`)
      .then(() => {
        toast.success("OTP sent successfully", {
          autoClose: 700
        })

      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  // const handleSubmit4 = () => {
  //   if (selectedRows3.length === 0) {
  //     toast.error("Please select atleast one checkbox", {
  //       autoClose: 700
  //     })
  //     return;
  //   }
  //   if (!getotp6) {
  //     toast.error("Invalid OTP", {
  //       autoClose: 700
  //     })
  //     return;
  //   }
  //   axios
  //     .post(`http://${ipaddress}represent/checkhandoverimpjobsubcartotp1/${companyid}/${branchId}/${selectRepresentdataa1}/${getrepresentData1.mobile}/${getotp6}/${selectCHA}/${userId}`, selectedRows3)

  //     .then(() => {


  //       closeModalforMultiplehandover();
  //       toast.success("Handed over to Party/CHA successfully", {
  //         autoClose: 700
  //       })
  //       fetchData();

  //     })
  //     .catch((error) => {
  //       toast.error("Invalid OTP", {
  //         autoClose: 700
  //       })
  //     });
  // };

  // CHA
  const handleOtp5 = (e) => {
    setGetotp5(e.target.value);
  }



  const handleSubmit4 = () => {
    if (selectedRows3.length === 0) {
      toast.error("Please select atleast one checkbox", {
        autoClose: 700
      })
      return;
    }
    if (!getotp6) {
      toast.error("Invalid OTP", {
        autoClose: 700
      })
      return;
    }
    axios
      .post(`http://${ipaddress}represent/checkhandoverimpjobsubcartotp1/${companyid}/${branchId}/${selectRepresentdataa1}/${getrepresentData1.mobile}/${getotp6}/${selectCHA}/${userId}`, selectedRows3)
      .then((response) => {
        const responseData = response.data;
      if (responseData === "OTP verification successful!") {
        closeModalforMultiplehandover();
        toast.success("Handed over to Party/CHA successfully", {
          autoClose: 700
        });
        fetchData();
      } else {
        // Handle other response messages

        console.log("Error Messege : "+responseData);
        toast.error(responseData, {
          autoClose: 700
        });
      }
    })
    .catch((error) => {
      let errorMessage = 'An unexpected error occurred. Please try again later.';

      if (error.response && error.response.status === 400 && error.response.data) {
        // Check if the server provided a specific error message
        errorMessage = error.response.data || errorMessage;
      }
      console.log("Error Messege : "+errorMessage);
      // Calculate the width based on the length of the error message
      const contentWidth = errorMessage.length * 15;
      
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1200,
        style: { width: `${contentWidth}px` },
      });
      
    });
};



  const handlepartyrepresent = (e) => {

    setSelectrepresentdataa(e.target.value);
  }
  const [allCHARepresentavive, setallCHARepresentative] = useState([]);
  const [getRepresentName, setGetrepresentName] = useState('');
  const getRepresentlistforALLCarting = () => {

    axios
      .get(`http://${ipaddress}represent/byuiddata/${companyid}/${branchId}/${getparty}`)
      .then((response) => {
        setallCHARepresentative(response.data);
        const namesMap = {};
        response.data.forEach(party => {
          namesMap[party.representativeId] = party.firstName + " " + party.lastName;
        });
        setGetrepresentName(namesMap);// Store the list in the state
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    getRepresentlistforALLCarting();
  }, [companyid, branchId, getparty])


  const getCartingRepresentData = () => {
    axios
      .get(`http://${ipaddress}represent/byrepresentid/${companyid}/${branchId}/${selectRepresentdataa}`)
      .then((response) => {

        setGetrepresentData(response.data); // Store the list in the state
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    getCartingRepresentData();
  }, [companyid, branchId, selectRepresentdataa])

  const [getOTPapprove, setGetOTPapprove] = useState('');
  const approvedByotpSpanRef = useRef('');
  useEffect(() => {
    if (approvedByotpSpanRef.current) {
      const approvedByValue = approvedByotpSpanRef.current.textContent;
      setGetOTPapprove(approvedByValue);
      // Now you can use the 'approvedByValue' variable to store or manipulate the value
    }
  }, [getrepresentData.mobile]);

  const [getotp5, setGetOtp5] = useState('');

  const handleOTP5 = (e) => {
    setGetOtp5(e.target.value);
  }

  const checkotp5 = () => {
    if (!selectRepresentdataa) {
      toast.error("Please select representative", {
        autoClose: 700
      })
      return;
    }

    if (!getOTPapprove) {
      toast.error("Please select mobile no.", {
        autoClose: 700
      })
      return;
    }
    const nop1 = selectedRows2.reduce((total, item) => total + item.nop, 0);
    console.log('nop112 ', nop1);
    axios
      .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectRepresentdataa}/${getrepresentData.mobile}/${nop1}`)
      .then(() => {
        toast.success("OTP sent successfully", {
          autoClose: 700
        })

      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  // const handleSubmit3 = () => {
  //   if (selectedRows2.length === 0) {
  //     toast.error("Please select atleast one checkbox", {
  //       autoClose: 700
  //     })
  //     return;
  //   }
  //   if (!getotp5) {
  //     toast.error("Invalid OTP", {
  //       autoClose: 700
  //     })
  //     return;
  //   }
  //   axios
  //     .post(`http://${ipaddress}represent/checkhandoverimpjobsubcartotp/${companyid}/${branchId}/${selectRepresentdataa}/${getrepresentData.mobile}/${getotp5}/${getparty}/${userId}`, selectedRows2)

  //     .then(() => {


  //       closeModalforMultiplehandover();
  //       toast.success("Handed over to Party/CHA successfully", {
  //         autoClose: 700
  //       })
  //       fetchData();

  //     })
  //     .catch((error) => {
  //       toast.error("Invalid OTP", {
  //         autoClose: 700
  //       })
  //     });
  // };



  const handleSubmit3 = () => {
    if (selectedRows2.length === 0) {
      toast.error("Please select at least one checkbox", {
        autoClose: 700
      });
      return;
    }
  
    if (!getotp5) {
      toast.error("Invalid OTP", {
        autoClose: 700
      });
      return;
    }
  
    axios
      .post(`http://${ipaddress}represent/checkhandoverimpjobsubcartotp/${companyid}/${branchId}/${selectRepresentdataa}/${getrepresentData.mobile}/${getotp5}/${getparty}/${userId}`, selectedRows2)
      .then((response) => {
        const responseData = response.data;
  
        if (responseData === "OTP verification successful!") {
          closeModalforMultiplehandover();
          toast.success("Handed over to Party/CHA successfully", {
            autoClose: 700
          });
          fetchData();
        } else {
          // Handle other response messages
          toast.error(responseData, {
            autoClose: 700
          });
        }
      })
      .catch((error) => {
        let errorMessage = 'An unexpected error occurred. Please try again later.';

        if (error.response && error.response.status === 400 && error.response.data) {
          // Check if the server provided a specific error message
          errorMessage = error.response.data || errorMessage;
        }
        
        // Calculate the width based on the length of the error message
        const contentWidth = errorMessage.length * 15;
        
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1200,
          style: { width: `${contentWidth}px` },
        });
        
      });
  };




  const [allCHA, setAllCHA] = useState([]);
  const [getrepresentname1, setGetrepresentname1] = useState('');
  const getCHAData = () => {

    axios
      .get(`http://${ipaddress}externalparty/chadata/${companyid}/${branchId}`)
      .then((response) => {
        setAllCHA(response.data);
        const namesMap = {};
        response.data.forEach(party => {
          namesMap[party.externaluserId] = party.userName;
        });
        setGetrepresentname1(namesMap);// Store the list in the state
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    getCHAData();
  }, [companyid, branchId])

  console.log('selectCHA ', selectCHA);

  const [list2, setList2] = useState([]);
  const [getalldatabyCHA, setGetalldatabyCHA] = useState([]);
  const getdatabyallCHA = () => {
    getdatabyallCHA1();
    const date = formatDate1(new Date());
    axios
      .get(`http://${ipaddress}defaultparty/findimpcha1/${companyid}/${branchId}/${selectCHA}/${date}`)
      .then((response) => {
        if (response.data === 0 && list2.length === 0) {
          toast.error("Data not found", {
            autoClose: 700
          })

          return;
        }
        setGetalldatabyCHA(response.data);

      })
      .catch((error) => {
      });
  };

  const getdatabyallCHA1 = () => {
    const date = formatDate1(new Date());
    axios
      .get(`http://${ipaddress}defaultparty/findExpiredimpcha1/${companyid}/${branchId}/${selectCHA}/${date}`)
      .then((response) => {


        setList2(response.data);
      })
      .catch((error) => {
        // Handle error
      });
  };




  //party

  const [searchbyparty, setSearchByparty] = useState([]);
  const fetchData1 = useCallback(() => {
    axios
      .get(`http://${ipaddress}importsub/alllgddatabyparty/${companyid}/${branchId}/${logintypeid}`)
      .then((response) => {
        console.log("searchbyparty ", response.data);
        setSearchByparty(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  }, [companyid, branchId]);

  useEffect(() => {
    fetchData1();
  }, [fetchData1]);

  const [searchFilters1, setSearchFilters1] = useState({
    sirNo: '',
    startDate: new Date(), // Initialize to null
    endDate: new Date(), // Initialize to null
    dgdcStatus: '',
  });
  const [filteredData1, setFilteredData1] = useState([]);



  const handleStartDateChange1 = (date) => {
    setSearchFilters1({
      ...searchFilters1,
      startDate: date,
    });
  };

  const handleEndDateChange1 = (date) => {
    setSearchFilters1({
      ...searchFilters1,
      endDate: date,
    });
  };

  const handleFilterChange1 = (event) => {
    const { name, value } = event.target;
    setSearchFilters1((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  console.log('searchbyparty ', filteredData1);

  const handleSearch1 = () => {
    axios
      .get(`http://${ipaddress}importsub/searchlgd?searchValue=${searchFilters1.sirNo}&companyid=${companyid}&branchId=${branchId}&dgdcStatus=${searchFilters1.dgdcStatus}&startDate=${convertToFormattedDate(searchFilters1.startDate)}&endDate=${convertToFormattedDate(searchFilters1.endDate)}&loginid=${logintypeid}&logintype=${logintype}`)
      .then((response) => {
        setFilteredData1(response.data);
        if (filteredData1.length > 0) {
          setCurrentPage1(1); // Reset the current page to 1

        }

        console.log('formData13453453 ', response.data);
      })
      .catch((error) => {

        console.error("Error in search1 request:", error);
        // Handle the error, e.g., display an error message to the user
      });
  }

  const handleClear1 = () => {
    setSearchFilters1({
      sirNo: '',
      startDate: new Date(),
      endDate: new Date(),
      dgdcStatus: '',
    });
    //  setFilteredData1([]);

    handleSearch1();
    fetchData1();
  };


  const [currentPage1, setCurrentPage1] = useState(1);
  const [itemsPerPage1] = useState(10);

  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems1 = filteredData1.slice(indexOfFirstItem1, indexOfLastItem1);
  const totalPages1 = Math.ceil(filteredData1.length / itemsPerPage1);

  // Function to handle page change
  const handlePageChange1 = (page) => {
    if (page >= 1 && page <= totalPages1) {
      setCurrentPage1(page);
    }
  };
  const displayPages1 = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage1 - middlePage;
    let endPage = currentPage1 + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages1, centerPageCount);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages1 - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  useEffect(() => {
    handleSearch1();

  }, [searchbyparty])




  // CHA


  const [searchbyparty1, setSearchByparty1] = useState([]);
  const fetchData2 = useCallback(() => {
    axios
      .get(`http://${ipaddress}importsub/alllgddatabycha/${companyid}/${branchId}/${logintypeid}`)
      .then((response) => {
        console.log("searchbyparty1 ", response.data);
        setSearchByparty1(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  }, [companyid, branchId, logintypeid]);


  console.log("searchbyparty1 ", searchbyparty1);


  useEffect(() => {
    fetchData2();
  }, [fetchData2]);

  const [searchFilters2, setSearchFilters2] = useState({
    sirNo: '',
    startDate: new Date(), // Initialize to null
    endDate: new Date(), // Initialize to null
    dgdcStatus: '',
  });


  const [filteredData2, setFilteredData2] = useState([]);



  const handleStartDateChange2 = (date) => {
    setSearchFilters2({
      ...searchFilters2,
      startDate: date,
    });
  };

  const handleEndDateChange2 = (date) => {
    setSearchFilters2({
      ...searchFilters2,
      endDate: date,
    });
  };

  const handleFilterChange2 = (event) => {
    const { name, value } = event.target;
    setSearchFilters2((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };


  const handleSearch2 = () => {
    axios
      .get(`http://${ipaddress}importsub/searchlgd?searchValue=${searchFilters2.sirNo}&companyid=${companyid}&branchId=${branchId}&dgdcStatus=${searchFilters2.dgdcStatus}&startDate=${convertToFormattedDate(searchFilters2.startDate)}&endDate=${convertToFormattedDate(searchFilters2.endDate)}&loginid=${logintypeid}&logintype=${logintype}`)
      .then((response) => {
        setFilteredData2(response.data);
        if (filteredData2.length > 0) {
          setCurrentPage2(1); // Reset the current page to 1

        }

        console.log('formData13453453 ', response.data);
      })
      .catch((error) => {

        console.error("Error in search1 request:", error);
        // Handle the error, e.g., display an error message to the user
      });
  }


  // console.log('filteredData2 ', filteredData2);

  const handleClear2 = () => {
    //setFilteredData2([]);
    setSearchFilters2({
      sirNo: '',
      startDate: new Date(),
      endDate: new Date(),
      dgdcStatus: '',
    });


    handleSearch2();
    fetchData2();
  };
  const [currentPage2, setCurrentPage2] = useState(1);

  const [itemsPerPage2] = useState(10);

  const indexOfLastItem2 = currentPage2 * itemsPerPage2;
  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
  const currentItems2 = filteredData2.slice(indexOfFirstItem2, indexOfLastItem2);
  const totalPages2 = Math.ceil(filteredData2.length / itemsPerPage2);

  // Function to handle page change
  const handlePageChange2 = (page) => {
    if (page >= 1 && page <= totalPages2) {
      setCurrentPage2(page);
    }
  };
  const displayPages2 = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage2 - middlePage;
    let endPage = currentPage2 + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages2, centerPageCount);
    }

    if (endPage > totalPages2) {
      endPage = totalPages2;
      startPage = Math.max(1, totalPages2 - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  useEffect(() => {
    handleSearch2();

  }, [searchbyparty1])



  function formatDate1(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear().toString();

    return `${year}-${month}-${day} 00:00:00`;
  }
  const checkloa = () => {
    const date = formatDate1(new Date());
    axios
      .get(`http://${ipaddress}parties/checkloa/${companyid}/${branchId}/${getparty}/${date}`)
      .then((response) => {
        console.log('loa data ', response.data);
        if (response.data === 'Y') {
          toast.error("The LOA for the party has expired.", {
            autoClose: 700
          })
          return;
        }
        else {
          checkpartytohandover();
        }
      })
      .catch((error) => {
      });
  }

  const checkloa1 = (req, sir, importer) => {
    const date = formatDate1(new Date());
    axios
      .get(`http://${ipaddress}parties/checkloa/${companyid}/${branchId}/${importer}/${date}`)
      .then((response) => {
        console.log('loa data ', response.data);
        if (response.data === 'Y') {
          // toast.error("The LOA for the party has expired.", {
          //   autoClose: 700
          // })
          openModalforHandover("Y");
          return;
        }
        else {
          openModalforHandover(req, sir);
        }
      })
      .catch((error) => {
      });
  }



  const [currentPage5, setCurrentPage5] = useState(1);
  const [itemsPerPage5] = useState(10);

  const indexOfLastItem5 = currentPage5 * itemsPerPage5;
  const indexOfFirstItem5 = indexOfLastItem5 - itemsPerPage5;
  const currentItems5 = filteredData.slice(indexOfFirstItem5, indexOfLastItem5);
  const totalPages5 = Math.ceil(filteredData.length / itemsPerPage5);

  // Function to handle page change
  const handlePageChange5 = (page) => {
    if (page >= 1 && page <= totalPages5) {
      setCurrentPage5(page);
    }
  };
  const displayPages5 = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage5 - middlePage;
    let endPage = currentPage5 + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages5, centerPageCount);
    }

    if (endPage > totalPages5) {
      endPage = totalPages5;
      startPage = Math.max(1, totalPages5 - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };


  const commonImportSub = (req, sir, flag) => {
    axios.get(`http://${ipaddress}importsub/findBySeAndReq/${companyid}/${branchId}/${req}/${sir}`)
      .then((response) => {
        if (flag === 'view') {
          setViewAll(response.data);
        }
        if (flag === 'history') {
          setImpHistory(response.data);
        }
        if (flag === 'handover') {
          setHandOverdata(response.data);
        }
        if (flag === 'edit') {
          setUpdateData(response.data);
        }
        if (flag === 'penalty') {
          setPenaltydetail(response.data);
        }
        if (flag === 'delivery') {
          setDeliverydata(response.data);
        }
      })
      .catch((error) => {
        console.log("Something went wrong");
      })
  };




  const fetPartyImports = () => {
    if (selectCHA) {

      console.log("Calling CHA : ");
      getdatabyallCHA();
    }
    if (getparty) {
      console.log("Calling PARTY : ");
      checkloa();
    }
  };

  const checkDGDCStatus = (req,ser,party) =>{
    axios.get(`http://${ipaddress}importsub/getDGDCStatus/${companyid}/${branchId}/${req}/${ser}`)
    .then((response)=>{
      if(response.data === 'Handed over to DGDC SEEPZ'){
         checkloa1(req,ser,party);
      }
      else{
        toast.error("Parcel already handed over to Party/CHA",{
          autoClose:1800
        })
      }
    })
   
    .catch((error)=>{
       if(error){
        checkloa1(req,ser,party);
       }
    })
  }

  return (
    <div>
      {logintype === 'Party' ? (
        <div className="container">
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-50px' }} > <FontAwesomeIcon
            icon={faListAlt}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Subcontract LGD Import List</h5>

          <Card style={{ backgroundColor: "#F8F8F8" }}>
            <CardBody>

              <Form>

                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Search By</Label>
                      <Input
                        type="text"
                        name="sirNo"
                        id="branchname"
                        value={searchFilters1.sirNo}
                        onChange={handleFilterChange1}
                        className="inputField"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="status" className="forlabel">Date</Label>
                      <DatePicker
                        selected={searchFilters1.startDate}
                        onChange={handleStartDateChange1}
                        dateFormat="dd/MM/yyyy"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: '100%' }} />}
                        wrapperClassName="custom-react-datepicker-wrapper"
                      />

                    </FormGroup>
                  </Col>
                  < Col md={3}>
                    <FormGroup>
                      <Label for="status" className="forlabel">&nbsp;</Label>


                      <DatePicker
                        selected={searchFilters1.endDate}
                        onChange={handleEndDateChange1}
                        dateFormat="dd/MM/yyyy"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: '100%' }} />}
                        wrapperClassName="custom-react-datepicker-wrapper"
                      />


                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="status" className="forlabel">DGDC Status</Label>
                      <select
                        id="hold"
                        className="form-control form-select"
                        required
                        name="dgdcStatus"
                        value={searchFilters1.dgdcStatus}
                        onChange={handleFilterChange1}
                      >
                        <option value="">Select DGDC status</option>
                        {JarListDtl.map((data, index) => (

                          <option key={index} >{data.jarDtlDesc}</option>
                        ))}
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <Button onClick={handleSearch1} type="button" className="" variant="outline-primary" style={{ marginTop: '10px' }}>
                      <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                      Search
                    </Button>
                    <Button onClick={handleClear1} type="button" variant="outline-danger" style={{ marginLeft: '10px', marginTop: '10px' }} >
                      <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>


              <div className="table-responsive mt-4">
                <Table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: '#BADDDA' }} >Sr.No.</th>
                      <th style={{ backgroundColor: '#BADDDA' }} >SIR No</th>
                      <th style={{ backgroundColor: '#BADDDA' }} >SIR Date</th>
                      <th style={{ backgroundColor: '#BADDDA' }} >Request Id</th>
                      <th style={{ backgroundColor: '#BADDDA' }} >Importer</th>
                      <th style={{ backgroundColor: '#BADDDA' }} >NOP</th>
                      <th style={{ backgroundColor: '#BADDDA' }} >Re-Entry Date</th>
                      <th style={{ backgroundColor: '#BADDDA' }} >Passed-In Net Wt</th>
                      <th style={{ backgroundColor: '#BADDDA' }} >NSDL Status</th>
                      <th style={{ backgroundColor: '#BADDDA' }} >DGDC Status</th>
                      <th style={{ backgroundColor: '#BADDDA' }} >Action</th>
                    </tr>
                    <tr>
                      <th style={{ backgroundColor: '#BADDDA' }} className="text-center">Total</th>
                      <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                      <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                      <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData1.map((item) => item[0]).length}</th>
                      <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                      <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData1.reduce((total, item) => total + item[4], 0)}</th>
                      <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                      <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                      <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                      <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                      <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>

                    </tr>
                  </thead>
                  <tbody>
                    {currentItems1.map((data, index) => (
                      <tr key={index}>
                        <td>{((currentPage1 - 1) * itemsPerPage1) + index + 1}</td>
                        <td>{data[0]}</td>
                        <td>{formatDateTime(data[1])}</td>
                        <td>{data[2]}</td>
                        <td >{getpartyId[data[3]]}</td>
                        <td>{data[4]}</td>
                        <td>{formatDateTime(data[5])}</td>
                        <td>{data[6]}({data[7]})</td>
                        <td>{data[8]}</td>
                        <td className="table-column" style={{ flexDirection: 'column', alignItems: 'center' }}>
                          <span>{data[9]}</span>
                          <div style={{ display: 'flex', flexDirection: 'row' }}>
                            {data[11] === "Y" ? (
                              <p className="orangeText" title="MOP OUT">MOP OUT</p>
                            ) : null}

                            {data[10] === "FWD_OUT" ? (
                              <FaArrowAltCircleRight size={22} fill="orange" style={{ marginRight: '10px' }} />
                            ) : null}
                           

                          </div>

                        </td>
                        <td className="table-column" style={{ marginRight: '5px' }} >
                          <div className="">
                            <button
                              type="button"
                              className="btn btn-primary dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
                              Action
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button className="dropdown-item" onClick={() => openModalforViewall(data[2], data[0])}>
                                  <FontAwesomeIcon icon={faUsersViewfinder} style={{ marginRight: '5px' }} />View All Details
                                </button>
                              </li>
                              <li>
                                <button className="dropdown-item" onClick={() => openModalforHistory(data[2], data[0])}>
                                  <FontAwesomeIcon icon={faHistory} style={{ marginRight: '5px' }} />View Import History
                                </button>
                              </li>

                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}

                  </tbody>

                </Table>
              </div>
              <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                <Pagination.First onClick={() => handlePageChange1(1)} />
                <Pagination.Prev
                  onClick={() => handlePageChange1(currentPage1 - 1)}
                  disabled={currentPage1 === 1}
                />
                <Pagination.Ellipsis />

                {displayPages1().map((pageNumber) => (
                  <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage1}
                    onClick={() => handlePageChange1(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                ))}

                <Pagination.Ellipsis />
                <Pagination.Next
                  onClick={() => handlePageChange1(currentPage1 + 1)}
                  disabled={currentPage1 === totalPages1}
                />
                <Pagination.Last onClick={() => handlePageChange1(totalPages1)} />
              </Pagination>
            </CardBody>
          </Card>
        </div >
      )
        :
        (

          logintype === 'CHA' ? (
            <div className="container">
              <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-50px' }} > <FontAwesomeIcon
                icon={faListAlt}
                style={{
                  marginRight: '8px',
                  color: 'black', // Set the color to golden
                }}
              /> Subcontract LGD Import List</h5>

              <Card style={{ backgroundColor: "#F8F8F8" }}>
                <CardBody>

                  <Form>

                    <Row>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Search By</Label>
                          <Input
                            type="text"
                            name="sirNo"
                            id="branchname"
                            value={searchFilters2.sirNo}
                            onChange={handleFilterChange2}
                            className="inputField"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="status" className="forlabel">Date</Label>
                          <DatePicker
                            selected={searchFilters2.startDate}
                            onChange={handleStartDateChange2}
                            dateFormat="dd/MM/yyyy"
                            className="form-control border-right-0 inputField"
                            customInput={<input style={{ width: '100%' }} />}
                            wrapperClassName="custom-react-datepicker-wrapper"
                          />

                        </FormGroup>
                      </Col>
                      < Col md={3}>
                        <FormGroup>
                          <Label for="status" className="forlabel">&nbsp;</Label>


                          <DatePicker
                            selected={searchFilters2.endDate}
                            onChange={handleEndDateChange2}
                            dateFormat="dd/MM/yyyy"
                            className="form-control border-right-0 inputField"
                            customInput={<input style={{ width: '100%' }} />}
                            wrapperClassName="custom-react-datepicker-wrapper"
                          />


                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="status" className="forlabel">DGDC Status</Label>
                          <select
                            id="hold"
                            className="form-control form-select"
                            required
                            name="dgdcStatus"
                            value={searchFilters2.dgdcStatus}
                            onChange={handleFilterChange2}
                          >
                            <option value="">Select DGDC status</option>
                            {JarListDtl.map((data, index) => (

                              <option key={index} >{data.jarDtlDesc}</option>
                            ))}
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">
                        <Button onClick={handleSearch2} type="button" className="" variant="outline-primary" style={{ marginTop: '10px' }}>
                          <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                          Search
                        </Button>
                        <Button onClick={handleClear2} type="button" variant="outline-danger" style={{ marginLeft: '10px', marginTop: '10px' }} >
                          <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form>


                  <div className="table-responsive mt-4">
                    <Table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th style={{ backgroundColor: '#BADDDA' }} >Sr.No.</th>
                          <th style={{ backgroundColor: '#BADDDA' }} >SIR No</th>
                          <th style={{ backgroundColor: '#BADDDA' }} >SIR Date</th>
                          <th style={{ backgroundColor: '#BADDDA' }} >Request Id</th>
                          <th style={{ backgroundColor: '#BADDDA' }} >Importer</th>
                          <th style={{ backgroundColor: '#BADDDA' }} >NOP</th>
                          <th style={{ backgroundColor: '#BADDDA' }} >Re-Entry Date</th>
                          <th style={{ backgroundColor: '#BADDDA' }} >Passed-In Net Wt</th>
                          <th style={{ backgroundColor: '#BADDDA' }} >NSDL Status</th>
                          <th style={{ backgroundColor: '#BADDDA' }} >DGDC Status</th>
                          <th style={{ backgroundColor: '#BADDDA' }} >Action</th>
                        </tr>
                        <tr>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center">Total</th>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData2.map((item) => item[0]).length}</th>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData2.reduce((total, item) => total + item[4], 0)}</th>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>

                        </tr>
                      </thead>
                      <tbody>
                        {currentItems2.map((data, index) => (
                          <tr key={index}>
                            <td>{((currentPage2 - 1) * itemsPerPage2) + index + 1}</td>
                            <td>{data[0]}</td>
                            <td>{formatDateTime(data[1])}</td>
                            <td>{data[2]}</td>
                            <td >{getpartyId[data[3]]}</td>
                            <td>{data[4]}</td>
                            <td>{formatDateTime(data[5])}</td>
                            <td>{data[6]}({data[7]})</td>
                            <td>{data[8]}</td>
                            <td className="table-column" style={{ flexDirection: 'column', alignItems: 'center' }}>
                              <span>{data[9]}</span>
                              <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {data[11] === "Y" ? (
                                  <p className="orangeText" title="MOP OUT">MOP OUT</p>
                                ) : null}

                                {data[10] === "FWD_OUT" ? (
                                  <FaArrowAltCircleRight size={22} fill="orange" style={{ marginRight: '10px' }} />
                                ) : null}
                               

                              </div>

                            </td>
                            <td className="table-column" style={{ marginRight: '5px' }} >
                              <div className="">
                                <button
                                  type="button"
                                  className="btn btn-primary dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
                                  Action
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <button className="dropdown-item" onClick={() => openModalforViewall(data[2], data[0])}>
                                      <FontAwesomeIcon icon={faUsersViewfinder} style={{ marginRight: '5px' }} />View All Details
                                    </button>
                                  </li>
                                  <li>
                                    <button className="dropdown-item" onClick={() => openModalforHistory(data[2], data[0])}>
                                      <FontAwesomeIcon icon={faHistory} style={{ marginRight: '5px' }} />View Import History
                                    </button>
                                  </li>

                                </ul>
                              </div>
                            </td>
                          </tr>
                        ))}

                      </tbody>

                    </Table>
                  </div>
                  <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                    <Pagination.First onClick={() => handlePageChange2(1)} />
                    <Pagination.Prev
                      onClick={() => handlePageChange2(currentPage2 - 1)}
                      disabled={currentPage2 === 1}
                    />
                    <Pagination.Ellipsis />

                    {displayPages2().map((pageNumber) => (
                      <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPage2}
                        onClick={() => handlePageChange2(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    ))}

                    <Pagination.Ellipsis />
                    <Pagination.Next
                      onClick={() => handlePageChange2(currentPage2 + 1)}
                      disabled={currentPage2 === totalPages2}
                    />
                    <Pagination.Last onClick={() => handlePageChange2(totalPages2)} />
                  </Pagination>
                </CardBody>
              </Card>
            </div >
          )
            :
            (

              <div className="container">
                <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-50px' }} > <FontAwesomeIcon
                  icon={faListAlt}
                  style={{
                    marginRight: '8px',
                    color: 'black', // Set the color to golden
                  }}
                /> Subcontract LGD Import List</h5>
                {loading && (
                  <div style={styles.overlay}>
                    <ReactLoading type="spin" color="#0000FF" height={300} width={80} />
                  </div>
                )}
                <Card style={{ backgroundColor: "#F8F8F8" }}>
                  <CardBody>

                    <Form>
                      <Row>

                        <Col>

                          <DropdownButton
                            title={
                              <span>
                                <FontAwesomeIcon icon={faAtom} /> Action
                              </span>
                            }
                            style={{ float: 'right' }}
                            variant="outline-success"
                          >
                            <Dropdown.Item onClick={openModalforreqid}> <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />Add New Import</Dropdown.Item>
                            <Dropdown.Item onClick={openModalforMultiplehandover}> <FontAwesomeIcon icon={faArrowTurnRight} style={{ marginRight: "5px" }} />Handover to Party/CHA</Dropdown.Item>

                          </DropdownButton>
                        </Col>
                        {/* <Col>
                  <DropdownButton
                    title='Action'
                    style={{ float: 'right' }}
                    variant="danger"
                  >
                    <Dropdown.Item onClick={openModalforreqid}>Add New</Dropdown.Item>
                  </DropdownButton>
                </Col> */}
                      </Row>
                      <hr />
                      <Row>
                        <Col md={3}>
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Search By</Label>
                            <Input
                              type="text"
                              name="sirNo"
                              id="branchname"
                              value={searchFilters.sirNo}
                              onChange={handleFilterChange}
                              className="inputField"
                            />
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <Label for="status" className="forlabel">Date</Label>
                            <DatePicker
                              selected={searchFilters.startDate}
                              onChange={handleStartDateChange}
                              dateFormat="dd/MM/yyyy"
                              className="form-control border-right-0 inputField"
                              customInput={<input style={{ width: '100%' }} />}
                              wrapperClassName="custom-react-datepicker-wrapper"
                            />








                            {/* 
                    <Input
                      type="date"
                      name="startDate"
                      id="status"
                      className="inputField"
                      // defaultValue={today}
                      value={searchFilters.startDate}
                      onChange={handleFilterChange}
                    /> */}
                          </FormGroup>
                        </Col>
                        < Col md={3}>
                          <FormGroup>
                            <Label for="status" className="forlabel">&nbsp;</Label>


                            <DatePicker
                              selected={searchFilters.endDate}
                              onChange={handleEndDateChange}
                              dateFormat="dd/MM/yyyy"
                              className="form-control border-right-0 inputField"
                              customInput={<input style={{ width: '100%' }} />}
                              wrapperClassName="custom-react-datepicker-wrapper"
                            />










                            {/* 
                    <Input
                      type="date"
                      name="endDate"
                      id="status"
                      className="inputField"
                      // defaultValue={today}
                      value={searchFilters.endDate}
                      onChange={handleFilterChange}
                    /> */}
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup>
                            <Label for="status" className="forlabel">DGDC Status</Label>
                            <select
                              id="hold"
                              className="form-control form-select"
                              required
                              name="dgdcStatus"
                              value={searchFilters.dgdcStatus}
                              onChange={handleFilterChange}
                            >
                              <option value="">Select DGDC status</option>
                              {JarListDtl.map((data, index) => (

                                <option key={index} >{data.jarDtlDesc}</option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="text-center">
                          {/* <Button onClick={search1} type="button" className="" variant="outline-primary" style={{ marginTop: '10px' }}>
                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                            Search
                          </Button>
                          <Button onClick={handleClear} type="button" variant="outline-danger" style={{ marginLeft: '10px', marginTop: '10px' }} >
                            <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                            Reset
                          </Button> */}

                          <Button onClick={(e) => { search1(searchFilters); setCurrentPageFun(); }} type="button" className="" variant="outline-primary" style={{ marginTop: '10px' }}>
                            <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                            Search
                          </Button>
                          <Button onClick={handleClear} type="button" variant="outline-danger" style={{ marginLeft: '10px', marginTop: '10px' }} >
                            <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
                            Reset
                          </Button>



                        </Col>
                      </Row>
                    </Form>


                    <div className="table-responsive mt-4">
                      <Table className="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th style={{ backgroundColor: '#BADDDA' }} >Sr.No.</th>
                            <th style={{ backgroundColor: '#BADDDA' }} >SIR No</th>
                            <th style={{ backgroundColor: '#BADDDA' }} >SIR Date</th>
                            <th style={{ backgroundColor: '#BADDDA' }} >Request Id</th>
                            <th style={{ backgroundColor: '#BADDDA' }} >Importer</th>
                            <th style={{ backgroundColor: '#BADDDA' }} >NOP</th>
                            <th style={{ backgroundColor: '#BADDDA' }} >Re-Entry Date</th>
                            <th style={{ backgroundColor: '#BADDDA' }} >Passed-In Net Wt</th>
                            <th style={{ backgroundColor: '#BADDDA' }} >NSDL Status</th>
                            <th style={{ backgroundColor: '#BADDDA' }} >DGDC Status</th>
                            <th style={{ backgroundColor: '#BADDDA' }} >Action</th>
                          </tr>
                          <tr>
                            <th style={{ backgroundColor: '#BADDDA' }} className="text-center">Total</th>
                            <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                            <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                            <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData.map((item) => item[2]).length}</th>
                            <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                            <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData.reduce((total, item) => total + item[4], 0)}</th>
                            <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                            <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                            <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                            <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                            <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>

                          </tr>
                        </thead>
                        <tbody>
                          {currentItems5.map((data, index) => (
                            <tr key={index}>
                              <td>{((currentPage5 - 1) * itemsPerPage5) + index + 1}</td>
                              <td>{data[0]}</td>
                              <td>{formatDateTime(data[1])}</td>
                              <td>{data[2]}</td>
                              <td >{getpartyId[data[3]]}</td>
                              <td>{data[4]}</td>
                              <td>{formatDateTime(data[5])}</td>
                              <td>{data[6]}({data[7]})</td>
                              <td>{data[8]}</td>
                              <td className="table-column" style={{ flexDirection: 'column', alignItems: 'center' }}>
                                <span>{data[9]}</span>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                  {data[11] === "Y" ? (
                                    <p className="orangeText" title="MOP OUT">MOP OUT</p>
                                  ) : null}

                                  {data[10] === "FWD_OUT" ? (
                                    <FaArrowAltCircleRight size={22} fill="orange" style={{ marginRight: '10px' }} />
                                  ) : null}
                                 
                                </div>

                              </td>
                              <td className="table-column" style={{ marginRight: '5px' }} >
                                <div className="">
                                  <button
                                    type="button"
                                    className="btn btn-primary dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
                                    Action
                                  </button>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <button className="dropdown-item" onClick={() => openModalforViewall(data[2], data[0])}>
                                        <FontAwesomeIcon icon={faUsersViewfinder} style={{ marginRight: '5px' }} />View All Details
                                      </button>
                                    </li>
                                    <li>
                                      <button className="dropdown-item" onClick={() => openModalforHistory(data[2], data[0])}>
                                        <FontAwesomeIcon icon={faHistory} style={{ marginRight: '5px' }} />View Import History
                                      </button>
                                    </li>
                                    {data[9] === 'Handed over to DGDC SEEPZ' && (data[8] === 'Passed In Full' || data[8] === 'Passed In Partial') && data[10] !== 'FWD_OUT' && (
                                      <li>
                                        <button className="dropdown-item" hidden={data[9] === 'Handed over to Party/CHA'} onClick={() => checkDGDCStatus(data[2], data[0], data[3])}>
                                          <FontAwesomeIcon icon={faHandHoldingHand} style={{ marginRight: '5px' }} />Handover to Party / CHA
                                        </button>
                                      </li>
                                    )}
                                    <li>
                                      <button className="dropdown-item" onClick={() => openModalforreqidUpdate(data[2], data[0])}>
                                        <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />Modify
                                      </button>
                                    </li>
                                    <li>
                                      <button className="dropdown-item" onClick={() => { printBarcode(data[2], data[0], data[4], data[1], data[12], "N", "1232", data[13]) }}>
                                        <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />Print SIR Tag
                                      </button>
                                    </li>
                                    {data[9] === 'Handed over to DGDC SEEPZ' && (
                                      <li>
                                        <button className="dropdown-item" onClick={() => openModalforpenalty(data[2], data[0])}>
                                          <FontAwesomeIcon icon={faGavel} style={{ marginRight: '5px' }} />Impose Penalty
                                        </button>
                                      </li>
                                    )}
                                    <li>
                                      <button className="dropdown-item" onClick={() => openModalfordeliveryupdate(data[2], data[0])}>
                                        <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />Delivery Update
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          ))}

                        </tbody>

                      </Table>
                    </div>
                    <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                      <Pagination.First onClick={() => handlePageChange5(1)} />
                      <Pagination.Prev
                        onClick={() => handlePageChange5(currentPage5 - 1)}
                        disabled={currentPage5 === 1}
                      />
                      <Pagination.Ellipsis />

                      {displayPages5().map((pageNumber) => (
                        <Pagination.Item
                          key={pageNumber}
                          active={pageNumber === currentPage5}
                          onClick={() => handlePageChange5(pageNumber)}
                        >
                          {pageNumber}
                        </Pagination.Item>
                      ))}

                      <Pagination.Ellipsis />
                      <Pagination.Next
                        onClick={() => handlePageChange5(currentPage5 + 1)}
                        disabled={currentPage5 === totalPages5}
                      />
                      <Pagination.Last onClick={() => handlePageChange5(totalPages5)} />
                    </Pagination>
                  </CardBody>
                </Card>
              </div >
            )
        )
      }






      {/* For Add requestId model */}
      <Modal Modal isOpen={isModalOpen} onClose={closeModalforReqid} toggle={closeModalforReqid} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
      } >
        <ModalHeader toggle={closeModalforReqid} style={{
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
        }} >
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
            icon={faFileClipboard}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Subcontract LGD Import Entry</h5>

        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={9}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Request Id</Label>
                <Input
                  type="text"
                  name="branchname"
                  id="branchname"
                  onChange={getsearchreqid}
                  maxLength={30}
                  className="inputField"
                />
              </FormGroup>
            </Col>
            <Col style={{ marginTop: '30px' }}>
              <Button variant="outline-primary" onClick={() => fetchDataforcrosscheck(getreqidd)}>
                <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                Search
              </Button>
            </Col>
          </Row>

          {isDivVisible && (
            <div style={{ backgroundColor: "#F8F8F8" }}>
              <hr />
              <form >
                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Request Id</Label>
                      <Input
                        type="text"
                        name="requestId"
                        id="requestId"
                        className="inputField"
                        onChange={handleInputChange}
                        maxLength={30}
                        required
                        readOnly
                        value={data.requestId}
                      />

                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Import Type</Label>
                      {/* <Input
                        type="text"
                        name="importType"
                        id="branchname"
                        className="inputField"
                        onChange={handleInputChange}
                        maxLength={20}
                        required
                        readOnly
                        value={data.importType}
                      /> */}
                      <select
                        id="importType"
                        className="form-control form-select"
                        onChange={handleInputChange}
                        required
                        name="importType"
                        value={data.importType}
                      >
                        <option value="LGD">LGD</option>
                        <option value="Zone to Zone">Zone to Zone</option>
                      </select>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col >
                    <FormGroup>
                      <Label for="search" className="forlabel">Select Importer</Label>
                      <select
                        id="exporter"
                        className="form-control form-select"
                        onChange={handleInputChange}
                        required
                        name="exporter"
                        value={data.exporter}
                      >
                        <option value="">Select importer</option>
                        {partys.map((data, index) => (
                          <option key={index} value={data.partyId}>{data.partyName}</option>
                        ))}
                      </select>
                      <div style={{ color: 'red' }} className="error-message">{formErrors.exporter}</div>

                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Exporter Name</Label>
                      <Input
                        type="text"
                        name="exporterName"
                        id="exporterName"
                        maxLength={100}
                        required
                        onChange={handleInputChange}
                        className="inputField"
                        value={data.exporterName}
                      />
                      <div style={{ color: 'red' }} className="error-message">{formErrors.exporterName}</div>

                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Import Date</Label>

                      <DatePicker
                        selected={data.exporterDate} // Set the selected date to BillGDate
                        onChange={(date) => {
                          if (date) {
                            setData({ ...data, exporterDate: date });
                          } else {
                            setData({ ...data, exporterDate: null });
                          }
                        }}
                        dateFormat="dd/MM/yyyy"
                        value={data.exporterDate}
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: '100%' }} />}
                        wrapperClassName="custom-react-datepicker-wrapper"
                        maxDate={today}

                      />



                      {/* <Input
                        type="date"
                        name="challanDate"
                        id="status"
                        required
                        max={today}
                        onKeyDown={handleKeyDown}
                        onChange={handleInputChange}
                        className="inputField"
                        value={data.challanDate}
                      /> */}
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Invoice No</Label>
                      <Input
                        type="text"
                        name="invoiceNo"
                        id="invoiceNo"
                        required
                        onChange={handleInputChange}
                        maxLength={30}
                        className="inputField"
                        value={data.invoiceNo}
                      />
                      <div style={{ color: 'red' }} className="error-message">{formErrors.invoiceNo}</div>

                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Invoice Date</Label>

                      <DatePicker
                        selected={data.invoiceDate} // Set the selected date to BillGDate
                        onChange={(date) => {
                          if (date) {
                            setData({ ...data, invoiceDate: date });
                          } else {
                            setData({ ...data, invoiceDate: null });
                          }
                        }}
                        dateFormat="dd/MM/yyyy"
                        value={data.invoiceDate}
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: '100%' }} />}
                        wrapperClassName="custom-react-datepicker-wrapper"
                        maxDate={today}

                      />








                      {/* <Input
                        type="date"
                        name="invoiceDate"
                        id="status"
                        required
                        max={today}
                        onKeyDown={handleKeyDown}
                        onChange={handleInputChange}
                        className="inputField"
                        value={data.invoiceDate}
                      /> */}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">No of packages</Label>
                      <Input
                        type="text"
                        name="nop"
                        required
                        onChange={handleInputChange}
                        id="nop"
                        className="inputField"
                        value={data.nop}
                      />
                      <div style={{ color: 'red' }} className="error-message">{formErrors.nop}</div>

                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Net weight</Label>
                      <Input
                        type="text"
                        name="netWeight"
                        id="netWeight"
                        required
                        onChange={handleInputChange}
                        className="inputField"
                        maxLength={15}
                        value={data.netWeight}
                      />
                      <div style={{ color: 'red' }} className="error-message">{formErrors.netWeight}</div>

                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Net weight unit</Label>
                      <Input
                        type="text"
                        name="netWeightUnit"
                        id="branchname"
                        required
                        onChange={handleInputChange}
                        maxLength={20}
                        className="inputField"
                        value={data.netWeightUnit}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Product value</Label>
                      <Input
                        type="text"
                        name="productValue"
                        id="branchname"
                        onChange={handleInputChange}
                        maxLength={15}
                        required
                        className="inputField"
                        value={data.productValue}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Currency</Label>
                      <Input
                        type="text"
                        name="currency"
                        id="branchname"
                        required
                        onChange={handleInputChange}
                        className="inputField"
                        maxLength={15}
                        value={data.currency}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={9}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Remarks</Label>
                      <Input
                        type="textarea"
                        name="remarks"
                        id="branchname"
                        onChange={handleInputChange}
                        maxLength={255}
                        className="inputField"
                        value={data.remarks}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center" >




                    <Button
                      type="button"
                      id="submitBtn"
                      className="allbutton"
                      variant="outline-success"
                      onClick={handleSubmit}
                      style={{ marginRight: 5 }}
                    >
                      <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                      Submit
                    </Button>
                    {/* <Button onClick={handleSubmit} variant="danger">
                      <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                      SUBMIT
                    </Button> */}
                  </Col>
                </Row>
              </form>
            </div>
          )}
        </ModalBody>
      </Modal >




      {/* For Update requestId model */}
      <Modal Modal isOpen={isModalOpenforupdate} onClose={closeModalforReqidforupdate} toggle={closeModalforReqidforupdate} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
      } >
        <ModalHeader toggle={closeModalforReqidforupdate} style={{
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
        }}   >
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
            icon={faListCheck}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          />Modify Subcontract Import Details</h5>

        </ModalHeader>


        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>


          <form >
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Request Id</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="requestId"
                    readOnly
                    className="inputField"
                    onChange={handleUpdateInputChange}
                    maxLength={30}
                    value={updatedata.requestId}
                  />
                  <div style={{ color: 'red' }} className="error-message">{formErrors.requestId}</div>

                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Import Type</Label>
                  {/* <Input
                    type="text"
                    name="importType"
                    id="branchname"
                    className="inputField"
                    required
                    maxLength={20}
                    onChange={handleUpdateInputChange}
                    value={updatedata.importType}
                    readOnly
                  /> */}

                  <select
                    id="importType"
                    className="form-control form-select"
                    onChange={handleUpdateInputChange}
                    required
                    name="importType"
                    value={updatedata.importType}
                  >
                    <option value="LGD">LGD</option>
                    <option value="Zone to Zone">Zone to Zone</option>
                  </select>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col >

                <FormGroup>
                  <Label for="search" className="forlabel">Select Exporter</Label>
                  <select
                    id="exporter"
                    className="form-control form-select"
                    onChange={handleUpdateInputChange}
                    required
                    name="exporter"

                    value={updatedata.exporter}
                  >

                    {partys.map((data, index) => (
                      <option value="">Select exporter</option>,
                      <option key={index} value={data.partyId} >{data.partyName}</option>
                    ))}
                  </select>
                  <div style={{ color: 'red' }} className="error-message">{formErrors.exporter}</div>

                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Exporter Name</Label>
                  <Input
                    type="text"
                    name="exporterName"
                    id="exporterName"
                    required
                    onChange={handleUpdateInputChange}
                    className="inputField"
                    maxLength={100}
                    value={updatedata.exporterName}
                  />
                  <div style={{ color: 'red' }} className="error-message">{formErrors.exporterName}</div>

                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Import Date</Label>
                  <DatePicker
                    selected={updatedata.exporterDate} // Set the selected date to BillGDate
                    onChange={(date) => {
                      if (date) {
                        setUpdateData({ ...updatedata, exporterDate: date });
                      } else {
                        setUpdateData({ ...updatedata, exporterDate: null });
                      }
                    }}
                    dateFormat="dd/MM/yyyy"
                    value={updatedata.exporterDate}
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: '100%' }} />}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    maxDate={today}

                  />

                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Invoice No</Label>
                  <Input
                    type="text"
                    name="invoiceNo"
                    maxLength={30}
                    required
                    id="invoiceNo"
                    onChange={handleUpdateInputChange}
                    className="inputField"
                    value={updatedata.invoiceNo}

                  />
                  <div style={{ color: 'red' }} className="error-message">{formErrors.invoiceNo}</div>

                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Invoice Date</Label>
                  <DatePicker
                    selected={updatedata.invoiceDate} // Set the selected date to BillGDate
                    onChange={(date) => {
                      if (date) {
                        setUpdateData({ ...updatedata, invoiceDate: date });
                      } else {
                        setUpdateData({ ...updatedata, invoiceDate: null });
                      }
                    }}
                    dateFormat="dd/MM/yyyy"
                    value={updatedata.invoiceDate}
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: '100%' }} />}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    maxDate={today}

                  />


                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">No of packages</Label>
                  <Input
                    type="text"
                    name="nop"
                    onChange={handleUpdateInputChange}
                    id="nop"
                    className="inputField"
                    required
                    value={updatedata.nop}
                  />
                  <div style={{ color: 'red' }} className="error-message">{formErrors.nop}</div>

                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Net weight</Label>
                  <Input
                    type="text"
                    name="netWeight"
                    id="netWeight"
                    onChange={handleUpdateInputChange}
                    maxLength={15}
                    required
                    className="inputField"
                    value={updatedata.netWeight}
                  />
                  <div style={{ color: 'red' }} className="error-message">{formErrors.netWeight}</div>

                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Net weight unit</Label>
                  <Input
                    type="text"
                    name="netWeightUnit"
                    id="branchname"
                    maxLength={20}
                    required
                    onChange={handleUpdateInputChange}
                    className="inputField"
                    value={updatedata.netWeightUnit}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Product value</Label>
                  <Input
                    type="text"
                    name="productValue"
                    id="branchname"
                    onChange={handleUpdateInputChange}
                    maxLength={15}
                    required
                    className="inputField"
                    value={updatedata.productValue}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Currency</Label>
                  <Input
                    type="text"
                    name="currency"
                    id="branchname"
                    required
                    onChange={handleUpdateInputChange}
                    maxLength={15}
                    className="inputField"
                    value={updatedata.currency}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Remarks</Label>
                  <Input
                    type="textarea"
                    name="remarks"
                    id="branchname"
                    onChange={handleUpdateInputChange}
                    className="inputField"
                    maxLength={255}
                    value={updatedata.remarks}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="text-center" >
                <Button onClick={handleUpdateSubmit} variant="outline-success">
                  <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                  Submit
                </Button>
              </Col>
            </Row>
          </form>

        </ModalBody>


      </Modal >




      {/* For Update requestId model */}
      <Modal Modal isOpen={isModalOpenforhistory} onClose={closeModelforHistory} toggle={closeModelforHistory} style={{ maxWidth: '1300px', wioverflow: '-moz-hidden-unscrollable' }
      } >
        <ModalHeader toggle={closeModelforHistory} style={{
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
        }}>
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
            icon={faHistory}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          />View Subcontract History</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>


          <form >
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Request Id</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"
                    value={impsubhistory.requestId}

                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Unit Name</Label>
                  <Input
                    type="text"
                    name="importType"
                    id="branchname"
                    className="inputField"
                    value={getpartyId[impsubhistory.exporter]}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="table-responsive">
                  <Table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: '#BADDDA' }}>#</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>Type</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>SIR No.</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>SIR Date</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>Updated By</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>New Status</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>Old Status</th>

                        <th style={{ backgroundColor: '#BADDDA' }}>No. of Packages</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>Passed-In Weight</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>Transport Date</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {importsubhistory.map((data, index) => (
                        <tr key={index}>

                          <td>{index + 1}</td>
                          <td>Import</td>
                          <td>{impsubhistory.sirNo}</td>
                          <td>{formatDateTime(impsubhistory.sirDate)}</td>
                          <td>{data.updatedBy}</td>
                          <td>{data.newStatus}</td>
                          <td>{data.oldStatus}</td>
                          <td>{impsubhistory.nop}</td>
                          <td>{impsubhistory.netWeight}({impsubhistory.netWeightUnit})</td>
                          <td>{convertTimestampToDateTime(data.transport_Date)}</td>
                          <td>{data.remark}</td>
                        </tr>
                      ))

                      }



                    </tbody>

                  </Table>
                </div>
              </Col>
            </Row>
            <Row>


              <Col md={6}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Net Pending Quantity</Label>
                  <Input
                    type="text"
                    name="importType"
                    id="branchname"
                    className="inputField"
                    value={-impsubhistory.netWeight}
                    readOnly
                  />
                </FormGroup>
              </Col>





              <Col></Col>
              <Col></Col>
            </Row>
            <Row>
              <BlobProvider document={<MyPDFDocument />}>
                {({ blob, url, loading, error }) => (
                  <a
                    href={url}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      type="button"
                      variant="outline-primary"
                      style={{
                        marginRight: "10px",
                        marginBottom: "15px",
                        textDecoration: "none",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPrint}
                        style={{ marginRight: "5px" }}
                      />
                      Print History
                    </Button>
                  </a>
                )}
              </BlobProvider>
            </Row>

            <Row>

              <Col className="text-center">
                <Button onClick={closeModelforHistory} variant="danger">
                  <FontAwesomeIcon icon={faArrowRight} style={{ marginRight: '5px' }} />
                  Back
                </Button>
              </Col>
            </Row>
          </form>


          {/* <PDFViewer width="100%" height="500px">
             <MyPDFDocument/>
          </PDFViewer> */}
        </ModalBody>
      </Modal >

      <Modal Modal isOpen={isModalOpenforViewall} onClose={closeModalforViewall} toggle={closeModalforViewall} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
      } >
        <ModalHeader toggle={closeModalforViewall} style={{
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
        }} >
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
            icon={faListCheck}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          />Subcontract Import Details</h5>
        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>


          <form >
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">SB Request ID</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewall.requestId}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Name Of Importer</Label>
                  <Input
                    type="text"
                    name="importType"
                    id="branchname"
                    className="inputField"
                    readOnly
                    maxLength={20}

                    value={getpartyId[viewall.exporter]}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Exporter Name</Label>
                  <Input
                    type="text"
                    name="importType"
                    id="branchname"
                    className="inputField"
                    readOnly
                    maxLength={20}

                    value={viewall.exporterName}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Import Date</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={formatDateTime(viewall.exporterDate)}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Invoice No</Label>
                  <Input
                    type="text"
                    name="importType"
                    id="branchname"
                    className="inputField"
                    readOnly
                    maxLength={20}

                    value={viewall.invoiceNo}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Invoice Date</Label>
                  <Input
                    type="text"
                    name="importType"
                    id="branchname"
                    className="inputField"
                    readOnly
                    maxLength={20}

                    value={formatDateTime(viewall.invoiceDate)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">SER NO.</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewall.sirNo}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">SIR Date</Label>
                  <Input
                    type="text"
                    name="importType"
                    id="branchname"
                    className="inputField"
                    readOnly
                    maxLength={20}

                    value={formatDateTime(viewall.sirDate)}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">NSDL Status</Label>
                  <Input
                    type="text"
                    name="importType"
                    id="branchname"
                    className="inputField"
                    readOnly
                    maxLength={20}

                    value={viewall.nsdlStatus}
                  />
                </FormGroup>
              </Col>

            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">No. Of Packages</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewall.nop}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Passed-In Weight</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewall.netWeight}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Passed-In Weight Unit</Label>
                  <Input
                    type="text"
                    name="importType"
                    id="branchname"
                    className="inputField"
                    readOnly
                    maxLength={20}

                    value={viewall.netWeightUnit}
                  />
                </FormGroup>
              </Col>

            </Row>
            <Row>

              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Amount</Label>
                  <Input
                    type="text"
                    name="importType"
                    id="branchname"
                    className="inputField"
                    readOnly
                    maxLength={20}

                    value={viewall.productValue}
                  />
                </FormGroup>
              </Col>


              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Currency</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewall.currency}
                  />
                </FormGroup>
              </Col>

            </Row>
          </form>

        </ModalBody>
      </Modal >



      {/* For Update requestId model */}
      <Modal Modal isOpen={isModalOpenforDelieveryUpdate} onClose={closeModalforDelievery} toggle={closeModalforDelievery} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
      } >
        <ModalHeader toggle={closeModalforDelievery} style={{
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
        }}  >
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
            icon={faPencilSquare}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          />Update Delivery Status</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>



          <Row>
            <Col md={6} >

              <FormGroup>
                <Label for="search" className="forlabel">NSDL Status</Label>
                <select
                  id="hold"
                  className="form-control form-select"
                  onChange={handleNSDLData}
                  required
                  name="nsdlStatus"
                  value={deliverydata.nsdlStatus}

                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Passed In Full">Passed In Full</option>
                </select>
              </FormGroup>
            </Col>


            <Col md={6}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Status Document</Label>
                <Input
                  type="file"
                  name="importType"
                  id="branchname"
                  onChange={handleFileChange}
                  className="inputField"
                  accept=".jpg, .jpeg, .png, .pdf"
                />

              </FormGroup>
            </Col>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {selectedFile && (
                <button
                  type="button"
                  className="btn me-md-2 btn-outline-primary"
                  onClick={openDocument}
                  style={{ marginRight: '10px' }}
                >
                  Show Document
                </button>
              )}
            </div>
            <Col>
            </Col>

          </Row>
          <Row>
            <Col>

              {deliverydata.status_document && (
                type1 === 'app' ? (
                  <button style={{ borderStyle: 'none', background: 'none', color: 'red', padding: '0px' }} onClick={openPdfInNewTab}>{extractFileName(deliverydata.status_document)}</button>

                )
                  : (
                    <button style={{ borderStyle: 'none', background: 'none', color: 'red', padding: '0px' }} onClick={downloadFile}>{extractFileName(deliverydata.status_document)}</button>

                  )

              )}
              <Modal isOpen={modalIsOpen} onClose={closeModal} toggle={closeModal} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

                {fileData && (
                  <div>
                    <img src={fileData.url} style={{ width: '800px', height: '500px' }} alt="Image" />

                  </div>
                )}
              </Modal>
            </Col>
          </Row>

          <Row>
            <Col className="text-center">

              <Button onClick={handleDeliverySubmit} variant="outline-success">
                <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                Submit
              </Button>
            </Col>
          </Row>



          {/* <PDFViewer width="100%" height="500px">
             <MyPDFDocument/>
          </PDFViewer> */}
        </ModalBody>
      </Modal >

      {/* Dpcument Show Selected */}

      <Modal isOpen={modalDocumentShow} onClose={closeModalDocumentShow} toggle={closeModalDocumentShow} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>
        <ModalHeader toggle={closeModalDocumentShow} style={{
          backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
          boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
          border: '1px solid rgba(0, 0, 0, 0.3)',
          borderRadius: '0',
          backgroundColor: '#85144b',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}>
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
            icon={faHandHoldingHand}
            style={{
              marginRight: '8px',
              color: 'black',
            }}
          /> Document Show</h5>
        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          {selectedFile && selectedFile.type.includes('image') ? (
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
          ) : selectedFile && selectedFile.type === 'application/pdf' ? (
            <embed src={URL.createObjectURL(selectedFile)} type="application/pdf" width="100%" height="500px" />
          ) : (
            <p>No file selected</p>
          )}
        </ModalBody>
      </Modal>






      <Modal Modal isOpen={isModelOpenforHandOver} onClose={closeModalforHandOver} toggle={closeModalforHandOver} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
      } >
        <ModalHeader toggle={closeModalforHandOver} style={{
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
        }}>
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
            icon={faHandHoldingHand}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Handover To Party / CHA</h5>
        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <div style={{ backgroundColor: "#F8F8F8" }}>
            <hr />
            <form encType="multipart/form-data">
              <Row className="">
                <Col className="d-flex justify-content-end">
                  <div class="form-check">
                    <input class="form-check-input"
                      onChange={handleRadioChange} type="radio" value="option1" checked={selectedOption === 'option1'} name="flexRadioDefault" id="flexRadioDefault1" />
                    <label class="form-check-label" for="flexRadioDefault1">
                      <h6>Party</h6>
                    </label>
                  </div>

                </Col>
                <Col className="d-flex justify-content-start">
                  <div class="form-check">
                    <input class="form-check-input" value="option2"
                      onChange={handleRadioChange} type="radio" checked={selectedOption === 'option2'} name="flexRadioDefault" id="flexRadioDefault2" />
                    <label class="form-check-label" for="flexRadioDefault2">
                      <h6>CHA</h6>
                    </label>
                  </div>
                </Col>
              </Row>

              {selectedOption === 'option1' ? (
                <div className="container">

                  <Card style={{ backgroundColor: "#F8F8F8" }}>
                    <CardBody>

                      <Row>
                        <Col md="3">
                          {/* Left side image */}
                          {im1 === 'Y' ? (
                            <img src={imageData1.url} className="image-column1 rounded-image1" />
                          )
                            :
                            (
                              <img src={contachimage} style={{ height: '90%', width: '90%' }} />
                            )
                          }
                        </Col>
                        <Col md="9">
                          {/* Right side input fields */}
                          <Row>
                            <Col>
                              <FormGroup>
                                <Label className="forlabel" for="branchId">Name</Label>
                                <Input
                                  type="text"
                                  name="importType"
                                  id="branchname"
                                  value={getpartyId[handoverdata.exporter]}
                                  className="inputField"
                                  readOnly

                                />

                              </FormGroup>
                            </Col>
                            <Col>
                              <FormGroup>
                                <Label for="search" className="forlabel">Select Representative</Label>
                                <select
                                  id="hold"
                                  className="form-control form-select"
                                  onChange={handlerepresent}
                                  required
                                  name="exporter"

                                >
                                  <option value="No">Select Representative</option>

                                  {representdata.map((data, index) => (

                                    <option value={data.representativeId}>{data.firstName + " " + data.lastName}</option>
                                  ))}

                                </select>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <FormGroup >
                                <Label className="forlabel" for="branchId">
                                  Mobile No
                                </Label>
                                <span className="d-flex align-items-center">
                                  <Input
                                    type="text"
                                    name="importType"
                                    id="branchname"
                                    className="inputField"
                                    value={getotpapprove}
                                  />
                                  <span hidden ref={approvedByOTPSpanRef}>{representData.mobile}</span>

                                  <Button
                                    style={{ borderRadius: '0' }}
                                    onClick={checkotp1}
                                    variant="outline-primary"
                                  >
                                    OTP
                                  </Button>
                                </span>
                              </FormGroup>
                            </Col>

                            <Col>
                              <FormGroup>
                                <Label className="forlabel" for="branchId">Enter OTP</Label>
                                <Input
                                  type="text"
                                  name="importType"
                                  id="branchname"
                                  onChange={handleOTP}
                                  className="inputField"


                                />

                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <Row style={{ marginTop: "4%" }}>
                    <Col className="text-center">
                      <Button onClick={handleVerifyOTP} variant="outline-success">
                        <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                        SUBMIT
                      </Button>
                    </Col>
                  </Row>
                </div>
              ) : (

                getrepresentSingledata ? (
                  <div className="container">
                    <Card style={{ backgroundColor: "#F8F8F8" }}>

                      <CardBody>
                        <Row>
                          <Col md="3">
                            {/* Left side image */}
                            {im2 === 'Y' ? (
                              <img src={imageData2.url} className="image-column1 rounded-image1" />
                            )
                              :
                              (
                                <img src={contachimage} style={{ height: '90%', width: '90%' }} />
                              )
                            }
                          </Col>
                          <Col md="9">
                            {/* Right side input fields */}
                            <Row>
                              <Col>
                                <FormGroup>
                                  <Label for="status" className="forlabel">Name</Label>
                                  <Input
                                    type="text"
                                    name="importType"
                                    id="branchname"
                                    value={getrepresentSingledata.userName}
                                    className="inputField"
                                    readOnly

                                  />
                                </FormGroup>


                              </Col>
                              <Col>
                                <FormGroup>
                                  <Label for="search" className="forlabel">Select Representative</Label>
                                  <select
                                    id="hold"
                                    className="form-control form-select"
                                    onChange={handlerepresent}
                                    required
                                    name="exporter"

                                  >
                                    <option value="No">Select Representative</option>

                                    {CHARepresentavive.map((data, index) => (

                                      <option value={data.representativeId}>{data.firstName + " " + data.lastName}</option>
                                    ))}

                                  </select>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <FormGroup >
                                  <Label className="forlabel" for="branchId">
                                    Mobile No
                                  </Label>
                                  <span className="d-flex align-items-center">
                                    <Input
                                      type="text"
                                      name="importType"
                                      id="branchname"
                                      className="inputField"
                                      value={getapprove}
                                    />
                                    <span hidden ref={approvedBySpanRef}>{CHArepresentData.mobile}</span>

                                    <Button
                                      style={{ borderRadius: '0' }}
                                      onClick={checkotp2}
                                      variant="outline-primary"
                                    >
                                      OTP
                                    </Button>
                                  </span>
                                </FormGroup>
                              </Col>

                              <Col>
                                <FormGroup>
                                  <Label className="forlabel" for="branchId">Enter OTP</Label>
                                  <Input
                                    type="text"
                                    name="importType"
                                    id="branchname"
                                    onChange={handleOTP}
                                    className="inputField"


                                  />

                                </FormGroup>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    <Row style={{ marginTop: "4%" }}>
                      <Col className="text-center">
                        <Button onClick={handleVerifCHAyOTP} variant="outline-success">
                          <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                          SUBMIT
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )
                  :
                  (
                    <div className="container">
                      <Card style={{ backgroundColor: "#F8F8F8" }}>

                        <CardBody>
                          <Row>
                            <Col md="3">
                              {/* Left side image */}
                              {im3 === 'Y' ? (
                                <img src={imageData3.url} className="image-column1 rounded-image1" />
                              )
                                :
                                (
                                  <img src={contachimage} style={{ height: '90%', width: '90%' }} />
                                )
                              }
                            </Col>
                            <Col md="9">
                              {/* Right side input fields */}
                              <Row>
                                <Col>
                                  <FormGroup>
                                    <Label for="status" className="forlabel">Name</Label>
                                    <select
                                      id="hold"
                                      className="form-control form-select"
                                      onChange={handlegetsinglecha}
                                      required
                                      name="exporter"

                                    >
                                      <option value="No">Select CHA</option>

                                      {CHAdata.map((data, index) => (

                                        <option value={data.externaluserId}>{data.userName}</option>
                                      ))}

                                    </select>
                                  </FormGroup>


                                </Col>
                                <Col>
                                  <FormGroup>
                                    <Label for="search" className="forlabel">Select Representative</Label>
                                    <select
                                      id="hold"
                                      className="form-control form-select"
                                      onChange={handlerepresent}
                                      required
                                      name="exporter"

                                    >
                                      <option value="No" >Select Representative</option>

                                      {AllCHARepresentavive.map((data, index) => (

                                        <option value={data.representativeId}>{data.firstName + " " + data.lastName}</option>
                                      ))}

                                    </select>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <FormGroup >
                                    <Label className="forlabel" for="branchId">
                                      Mobile No
                                    </Label>
                                    <span className="d-flex align-items-center">
                                      <Input
                                        type="text"
                                        name="importType"
                                        id="branchname"
                                        className="inputField"
                                        value={getapprove}
                                      />
                                      <span hidden ref={approvedBySpanRef}>{CHArepresentData.mobile}</span>
                                      <Button
                                        style={{ borderRadius: '0' }}
                                        onClick={checkotp3}
                                        variant="outline-primary"
                                      >
                                        OTP
                                      </Button>
                                    </span>
                                  </FormGroup>
                                </Col>

                                <Col>
                                  <FormGroup>
                                    <Label className="forlabel" for="branchId">Enter OTP</Label>
                                    <Input
                                      type="text"
                                      name="importType"
                                      id="branchname"
                                      onChange={handleOTP}
                                      className="inputField"


                                    />

                                  </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                      <Row style={{ marginTop: "4%" }}>
                        <Col className="text-center">
                          <Button onClick={handleVerifAllCHAyOTP} variant="outline-success">
                            <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                            SUBMIT
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  )

              )}
            </form>
          </div>

        </ModalBody >
      </Modal >


      {/* For Update requestId model */}
      <Modal Modal isOpen={isModalopenforpenalty} onClose={closeModalforpenalty} toggle={closeModalforpenalty} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
      } >
        <ModalHeader toggle={closeModalforpenalty} style={{
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
        }} >
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
            icon={faGavel}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          />Impose Penalty</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>


          <form >
            <Row>
              <Col md={6} >
                <FormGroup>
                  <Label className="forlabel" for="branchId">Penalty Amount</Label>
                  <Input
                    type="text"
                    name="imposePenaltyAmount"
                    id="branchname"
                    onChange={handlepenaltychange}
                    value={penaltydetail.imposePenaltyAmount}
                    className="inputField"


                  />

                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Reason</Label>
                  <Input
                    type="textarea"
                    name="imposePenaltyRemarks"
                    id="branchname"
                    onChange={handlepenaltychange}
                    value={penaltydetail.imposePenaltyRemarks}
                    className="inputField"


                  />

                </FormGroup>
              </Col>



            </Row>


            <Row>
              <Col className="text-center">

                <Button onClick={getpenaltystatus} variant="outline-success">
                  <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                  Submit
                </Button>
              </Col>
            </Row>
          </form>


          {/* <PDFViewer width="100%" height="500px">
             <MyPDFDocument/>
          </PDFViewer> */}
        </ModalBody>
      </Modal >




      <Modal Modal isOpen={isModalOpenforhandedover} onClose={closeModalforMultiplehandover} toggle={closeModalforMultiplehandover} style={{ maxWidth: '1200px', wioverflow: '-moz-hidden-unscrollable' }
      } >
        <ModalHeader toggle={closeModalforMultiplehandover} style={{
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
        }} >
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
            icon={faHandHoldingHand}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          />Handover to Party / CHA</h5>

          {(getalldatabyCHA.length > 0 || list2.length > 0 || partydata1.length > 0) && (
            <Button
              variant="outline-primary"
              onClick={fetPartyImports}
              className="refresh-button"
            >
              <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
              Search
            </Button>
          )}

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          {!(partydata1.length > 0 || getalldatabyCHA.length > 0) && (
            <div >
              <Row className="">
                <Col className="d-flex justify-content-end" >
                  <div class="form-check">
                    <input class="form-check-input"
                      onChange={handleRadioChange1} type="radio" value="option1" checked={selectedOption1 === 'option1'} name="flexRadioDefault" id="flexRadioDefault1" />
                    <label class="form-check-label" for="flexRadioDefault1">
                      <h6>Party</h6>
                    </label>
                  </div>

                </Col>
                <Col className="d-flex justify-content-start">
                  <div class="form-check">
                    <input class="form-check-input" value="option2"
                      onChange={handleRadioChange1} type="radio" checked={selectedOption1 === 'option2'} name="flexRadioDefault" id="flexRadioDefault2" />
                    <label class="form-check-label" for="flexRadioDefault2">
                      <h6>CHA</h6>
                    </label>
                  </div>
                </Col>
              </Row>
              {selectedOption1 === 'option1' && (
                <Row>
                  <Col md={6}  >
                    <FormGroup>
                      <Label for="search" className="forlabel">Select Party</Label>
                      <select
                        id="exporter"
                        className="form-control form-select"
                        value={getparty}
                        onChange={(e) => setGetparty(e.target.value)}
                        required
                        name="exporter"

                      >
                        <option value="">Select Party</option>
                        {partys.map((data, index) => (
                          <option key={index} value={data.partyId}>{data.partyName}</option>
                        ))}
                      </select>

                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>

                      <Button onClick={checkloa} style={{ marginTop: 32 }} variant="outline-primary">
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                        Search
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              )

              }
              {selectedOption1 === 'option2' && (
                <Row>
                  <Col md={6}  >
                    <FormGroup>
                      <Label for="search" className="forlabel">Select CHA</Label>
                      <select
                        id="exporter"
                        className="form-control form-select"
                        value={selectCHA}
                        onChange={(e) => setSelectedCHA(e.target.value)}
                        required
                        name="exporter"

                      >
                        <option value="">Select CHA</option>
                        {allCHA.map((data, index) => (
                          <option key={index} value={data.externaluserId}>{data.userName}</option>
                        ))}
                      </select>

                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>

                      <Button onClick={getdatabyallCHA} style={{ marginTop: 32 }} variant="outline-primary">
                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                        Search
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
              )

              }
            </div>
          )

          }



          {partydata1.length > 0 && (
            <div>
              <Row>
                <div className="table-responsive custom-table-container table-section">

                  <Table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: '#BADDDA' }}><input type="checkbox" onChange={handleSelectAll2}
                          checked={selectAll2} style={{ width: 15, height: 15, marginTop: 5 }} /></th>
                        <th style={{ backgroundColor: '#BADDDA' }}>Request ID</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>SER No.</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>Exporter</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>No. of Packages</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>Passed-Out Weight</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>DGDC Status</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>NSDL Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partydata1.map((item, index) => (
                        <tr key={index}>
                          <td><input type="checkbox" onChange={() => handleCheckboxChange3(item)}
                            checked={selectedRows2.includes(item)} style={{ width: 15, height: 15, marginTop: 5 }} /></td>
                          <td>{item.requestId}</td>
                          <td>{item.sirNo}</td>
                          <td>{getpartyId[item.exporter]}</td>
                          <td>{item.nop}</td>
                          <td>{item.netWeight}</td>
                          <td>{item.dgdcStatus}</td>
                          <td>{item.nsdlStatus}</td>
                        </tr>
                      ))

                      }

                    </tbody>
                  </Table>

                </div>
              </Row>
              <hr />
              <div >
                <span style={{ marginLeft: 20 }}><b>Total Request Id : {partydata1.map((item) => item.requestId).length}</b></span>
                <span style={{ float: 'inline-end', marginRight: 20 }} className="text-end"><b>Total No. Of Packages : {partydata1.reduce((total, item) => total + item.nop, 0)}</b></span>
              </div>
              <hr />
              <Card >
                <CardBody>
                  <Row>
                    <Col md="3" className="d-flex justify-content-center align-items-center">
                      {/* Centered image */}
                      {im5 === 'Y' ? (
                        <img src={imageData5.url} className="image-column1 rounded-image2" />
                      )
                        :
                        (
                          <img src={contachimage} style={{ height: '90%', width: '90%' }} />
                        )
                      }
                    </Col>

                    <Col md="9">
                      {/* Right side input fields */}
                      <Row>
                        <Col md={6} >
                          <FormGroup>
                            <Label for="search" className="forlabel">
                              Party Name
                            </Label>
                            <Input
                              type="text"
                              name="importType"
                              id="branchname"
                              value={getpartyId[getparty]}
                              className="inputField"
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="search" className="forlabel">
                              Select Representative
                            </Label>
                            <select
                              id="hold"
                              className="form-control form-select"
                              onChange={handlepartyrepresent}
                              required
                              name="exporter"
                            >
                              <option value="No">Select Representative</option>
                              {allCHARepresentavive.map((data, index) => (
                                <option value={data.representativeId}>
                                  {data.firstName + " " + data.lastName}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Mobile No</Label>
                            <span className="d-flex align-items-center">
                              <Input
                                type="text"
                                name="importType"
                                id="branchname"
                                className="inputField"
                                value={getOTPapprove}
                                style={{ backgroundColor: '#E0E0E0' }}
                                readOnly
                              />
                              <span hidden ref={approvedByotpSpanRef}>{getrepresentData.mobile}</span>
                              <Button
                                style={{ borderRadius: '0' }}
                                variant="outline-success"
                                onClick={checkotp5}
                              >
                                OTP
                              </Button>
                            </span>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Enter OTP</Label>
                            <Input
                              type="text"
                              name="importType"
                              id="branchname"
                              onChange={handleOTP5}
                              className="inputField"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "4%" }}>
                    <Col className="text-center">
                      <Button onClick={handleSubmit3} variant="outline-success">
                        <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>

          )

          }

          {(getalldatabyCHA.length > 0 || list2.length > 0) && (
            <div>
              <Row>
                <div className="table-responsive custom-table-container table-section">
                  {list2.length > 0 && (
                    <Table style={{ marginBottom: 20 }} className="table table-striped table-hover">
                      <thead>
                        <tr>

                          <th style={{ backgroundColor: '#BADDDA' }}>Request ID</th>
                          <th style={{ backgroundColor: '#BADDDA' }}>SER No.</th>
                          <th style={{ backgroundColor: '#BADDDA' }}>Exporter</th>
                          <th style={{ backgroundColor: '#BADDDA' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list2.map((item, index) => (
                          <tr key={index}>

                            <td>{item.requestId}</td>
                            <td>{item.sirNo}</td>
                            <td>{getpartyId[item.exporter]}</td>
                            <td><h5 style={{ color: 'red' }}>LOA Expired</h5></td>
                          </tr>
                        ))

                        }

                      </tbody>
                    </Table>
                  )

                  }

                  <Table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: '#BADDDA' }}><input type="checkbox" onChange={handleSelectAll4}
                          checked={selectAll3} style={{ width: 15, height: 15, marginTop: 5 }} /></th>
                        <th style={{ backgroundColor: '#BADDDA' }}>Request ID</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>SER No.</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>Exporter</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>No. of Packages</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>Passed-Out Weight</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>DGDC Status</th>
                        <th style={{ backgroundColor: '#BADDDA' }}>NSDL Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getalldatabyCHA.map((item, index) => (
                        <tr key={index}>
                          <td><input type="checkbox" onChange={() => handleCheckboxChange4(item)}
                            checked={selectedRows3.includes(item)} style={{ width: 15, height: 15, marginTop: 5 }} /></td>
                          <td>{item.requestId}</td>
                          <td>{item.sirNo}</td>
                          <td>{getpartyId[item.exporter]}</td>
                          <td>{item.nop}</td>
                          <td>{item.netWeight}</td>
                          <td>{item.dgdcStatus}</td>
                          <td>{item.nsdlStatus}</td>
                        </tr>
                      ))

                      }

                    </tbody>
                  </Table>

                </div>
              </Row>
              <hr />
              <div >
                <span style={{ marginLeft: 20 }}><b>Total Request Id : {getalldatabyCHA.map((item) => item.requestId).length}</b></span>
                <span style={{ float: 'inline-end', marginRight: 20 }} className="text-end"><b>Total No. Of Packages : {getalldatabyCHA.reduce((total, item) => total + item.nop, 0)}</b></span>
              </div>
              <hr />
              <Card >
                <CardBody>
                  <Row>
                    <Col md="3" className="d-flex justify-content-center align-items-center">
                      {/* Centered image */}
                      {im6 === 'Y' ? (
                        <img src={imageData6.url} className="image-column1 rounded-image2" />
                      )
                        :
                        (
                          <img src={contachimage} style={{ height: '90%', width: '90%' }} />
                        )
                      }
                    </Col>

                    <Col md="9">
                      {/* Right side input fields */}
                      <Row>
                        <Col md={6} >
                          <FormGroup>
                            <Label for="search" className="forlabel">
                              CHA Name
                            </Label>
                            <Input
                              type="text"
                              name="importType"
                              id="branchname"
                              value={getrepresentname1[selectCHA]}
                              className="inputField"
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="search" className="forlabel">
                              Select Representative
                            </Label>
                            <select
                              id="hold"
                              className="form-control form-select"
                              onChange={handlepartyrepresent1}
                              required
                              name="exporter"
                            >
                              <option value="No">Select Representative</option>
                              {allCHARepresentavive1.map((data, index) => (
                                <option value={data.representativeId}>
                                  {data.firstName + " " + data.lastName}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Mobile No</Label>
                            <span className="d-flex align-items-center">
                              <Input
                                type="text"
                                name="importType"
                                id="branchname"
                                className="inputField"
                                value={getOTPapprove1}
                                style={{ backgroundColor: '#E0E0E0' }}
                                readOnly
                              />
                              <span hidden ref={approvedByotpSpanRef1}>{getrepresentData1.mobile}</span>
                              <Button
                                style={{ borderRadius: '0' }}
                                variant="outline-success"
                                onClick={checkotp6}
                              >
                                OTP
                              </Button>
                            </span>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Enter OTP</Label>
                            <Input
                              type="text"
                              name="importType"
                              id="branchname"
                              onChange={handleOTP6}
                              className="inputField"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "4%" }}>
                    <Col className="text-center">
                      <Button onClick={handleSubmit4} variant="outline-success">
                        <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>

          )

          }


        </ModalBody>
      </Modal>
    </div>
  );
}