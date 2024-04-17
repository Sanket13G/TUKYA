import AuthContext from "../Components/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState, useContext, useCallback, useRef, useId } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import "../Components/Style.css";
import ipaddress from "../Components/IpAddress";
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
import DownloadImage from "./DownloadImage";
import contachimage from "../services/contacts.png"
import DGDCimage from "../Images/DGDC.png";
import InviceService from "../services/InviceService"
import ReactLoading from 'react-loading';
import { FaClosedCaptioning, FaTruck, FaHandPaper, FaPersonBooth, FaTruckLoading } from 'react-icons/fa';
import snzLoge from "../Images/Snz_Parcels.jpg"
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
import { faArrowCircleLeft, faArrowCircleRight, faArrowTurnRight, faAtom, faBolt, faCity, faCross, faExternalLink, faExternalLinkAlt, faEye, faEyeDropper, faEyeSlash, faGavel, faGear, faHand, faHandFist, faHandHoldingHand, faHandsHolding, faHistory, faIdBadge, faIdCardAlt, faIdCardClip, faPenClip, faPenFancy, faPencil, faPerson, faPersonBooth, faPlaneDeparture, faPlus, faReceipt, faRefresh, faSearch, faSquarePen, faTentArrowTurnLeft, faTruckArrowRight, faUpload, faUserCircle, faWeightHanging, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faAd, faBan, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from "react-toastify";
import "../Components/Style.css";
import { Pagination } from "react-bootstrap";
import Select from 'react-select';

export default function ExportSHB() {
  const styles = {
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
  };
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const today = new Date().toISOString().split('T')[0];
  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

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
    userType,
    login,
    logout,
  } = useContext(AuthContext);

  const location = useLocation();
  const updatedSerchcriteria = location.state?.searchCriteria;


  const [searchFilters, setSearchFilters] = useState({
    serNo: '',
    startDate: new Date(), // Initialize to null
    endDate: new Date(), // Initialize to null
    dgdcStatus: '',
    hold: '',
    heavy: '',
    snzParcel: ''
  });
  useEffect(() => {
    const fetchData = async () => {
      const criteriaToSet = updatedSerchcriteria || searchFilters;
      setSearchFilters(criteriaToSet);
      await search(criteriaToSet);
    };
    fetchData();
  }, []);





  const [loading, setloading] = useState(false);
  const handleOptionButtonClick = (option) => {
    if (option === "add") {
      navigate("/parent/addexportshb", { state: { selectedItem: null } });
    }
  };

  const [JarListDtlDGDC, setJarListDtlDGDC] = useState([]);



  const getlist = () => {
    axios
      .get(`http://${ipaddress}jardetail/dgdcstatus/${companyid}`)
      .then((response) => {
        setJarListDtlDGDC(response.data); // Store the list in the state
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    getlist();
  }, []);



  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

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

  const convertToFormattedDate = (inputDate) => {
    const dateObject = new Date(inputDate);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const [filteredData, setFilteredData] = useState([]);

  const search = (searchFilters1) => {
    setloading(true);
    const start = convertToFormattedDate(searchFilters1.startDate) + " 00:00:00";
    const end = convertToFormattedDate(searchFilters1.endDate) + " 23:59:59";
    axios
      .get(`http://${ipaddress}exportshb/search?searchValue=${searchFilters1.serNo}&companyid=${companyid}&branchId=${branchId}&holdStatus=${searchFilters1.hold}&snzStatus=${searchFilters1.snzParcel}&hpStatus=${searchFilters1.heavy}&dgdcStatus=${searchFilters1.dgdcStatus}&startDate=${start}&endDate=${end}`)
      .then((response) => {
        setloading(false);
        setFilteredData(response.data);

      })
      .catch((error) => {
        setloading(false);

      });
  };

  // useEffect(() => {
  //   search(searchFilters);
  // }, []);

  const resetSearch = {
    serNo: '',
    startDate: new Date(), // Initialize to null
    endDate: new Date(), // Initialize to null
    dgdcStatus: '',
    hold: '',
    heavy: '',
    snzParcel: ''
  };

  const handleClear = () => {
    setSearchFilters(
      {
        serNo: '',
        startDate: new Date(), // Initialize to null
        endDate: new Date(), // Initialize to null
        dgdcStatus: '',
        hold: '',
        heavy: '',
        snzParcel: ''
      }
    );

    setCurrentPageFun();
    search(resetSearch);



  }


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

  const setCurrentPageFun = () => {
    setCurrentPage(1);
  };

  const printBarcode = async (mawb, seino, nop, sirdate, reqdate, niptStatus, requestId) => {
    try {
      const response = await InviceService.getbarcode(mawb, seino, nop, sirdate, reqdate, "EXPORT", niptStatus, requestId, "HAWB", "IGM", "exp");

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
    }
  };

  const [partys, setPartys] = useState([]);
  const [getpartyId, setGetpartyId] = useState({});

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
    }
  };


  useEffect(() => {
    fetchPartyNames();
  }, [companyid, branchId])

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


  const handleViewClick = (sb, er) => {
    navigate(`/parent/addexportshb`, { state: { sbno: sb, erno: er, flag: "view", search: searchFilters } });
  };

  const handleEditClick = (sb, er) => {
    navigate(`/parent/addexportshb`, { state: { sbno: sb, erno: er, flag: "edit", search: searchFilters } });
  };


  const fetchHoldData = async (cid, bid, sbNo, erNo) => {


    const result = await Swal.fire({
      title: 'Are you sure to request for hold for this parcel?',
      width: 'auto',
      position: 'top', // Set the position to 'top'
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        title: 'your-custom-title-class', // Define a custom class for the title
        cancelButton: 'your-custom-cancel-button-class', // Define a custom class for the cancel button
        confirmButton: 'your-custom-confirm-button-class', // Define a custom class for the confirm button
        content: 'your-custom-content-class', // Define a custom class for the content
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.get(`http://${ipaddress}exportshb/holdStatus/${cid}/${bid}/${sbNo}/${erNo}/${userId}`);
        search(searchFilters);

      } catch (error) {
      }
    }
  };

  const fetchUnHoldData = async (cid, bid, sbNo, erNo) => {


    const result = await Swal.fire({
      title: 'Are you sure to request for hold for this parcel?',
      width: 'auto',
      position: 'top', // Set the position to 'top'
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        title: 'your-custom-title-class', // Define a custom class for the title
        cancelButton: 'your-custom-cancel-button-class', // Define a custom class for the cancel button
        confirmButton: 'your-custom-confirm-button-class', // Define a custom class for the confirm button
        content: 'your-custom-content-class', // Define a custom class for the content
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.get(`http://${ipaddress}exportshb/unholdStatus/${cid}/${bid}/${sbNo}/${erNo}/${userId}`);
        search(searchFilters);

      } catch (error) {
      }
    }
  };

  const commonSingleExport = (sb, er, flag) => {
    axios.get(`http://${ipaddress}exportshb/getBySbNoAndErNo/${companyid}/${branchId}/${sb}/${er}`)
      .then((response) => {
        if (flag === 'cancelremarks') {
          setcancelParceldata(response.data);
        }
        if (flag === 'heavy') {
          setHeavyParcelData(response.data);
          getHEAVYlist(response.data);
        }
        if (flag === 'impose') {
          setImposePenaltydata(response.data);
        }
        if (flag === 'updatensdl') {
          setOverideNSDl(response.data);
        }
        if (flag === 'history') {
          console.log("history ", response.data);
          handleHistory(response.data);
        }
        if (flag === 'handoverconsole') {

          setgetHandoverConsoleData(response.data);
          getConsoleRepresentData(response.data.consoleAgent);
        }
      })
      .catch((error) => {
        if (error) {

        }

      });

  }

  const [isModalOpenforCancelParcel, setIsModalOpenforCancelParcel] = useState(false);
  const [cancelParceldata, setcancelParceldata] = useState([]);
  const openModalforCancelParcel = (req, sb) => {

    setIsModalOpenforCancelParcel(true);
    commonSingleExport(req, sb, 'cancelremarks');
    // setcancelParceldata(data);
  };

  const closeMoalforCancelParcel = () => {
    setIsModalOpenforCancelParcel(false);
    setcancelParceldata([]);

  }

  const handelCanceldata = (event) => {
    const { name, value } = event.target;
    setcancelParceldata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const CancelParceldemo = () => {
    const submitBtn = document.getElementById("cancel1");
    submitBtn.disabled = true;
    axios
      .post(`http://${ipaddress}exportshb/cancelparcel/${userId}`, cancelParceldata)
      .then((response) => {
        toast.success("Parcel cancel successfully", {
          autoClose: 700
        })
        search(searchFilters);
        submitBtn.disabled = false;
        closeMoalforCancelParcel();
      })
      .catch((error) => {
        toast.error("Oops! something went wrong", {
          autoClose: 700
        })
        submitBtn.disabled = false;
      });
  };


  const removecancelParceldemo = () => {
    const submitBtn = document.getElementById("cancel2");
    submitBtn.disabled = true;
    axios
      .post(`http://${ipaddress}exportshb/removecancelparcel/${userId}`, cancelParceldata)
      .then((response) => {
        toast.success("Parcel cancel successfully", {
          autoClose: 700
        })
        submitBtn.disabled = false;
        search(searchFilters);
        closeMoalforCancelParcel();
      })
      .catch((error) => {
        toast.error("Oops! something went wrong", {
          autoClose: 700
        })
        submitBtn.disabled = false;
      });
  };


  const UpdatecancelParceldemo = () => {
    axios
      .post(`http://${ipaddress}exportshb/updatecancelparcel/${userId}`, cancelParceldata)
      .then((response) => {
        toast.success("Update successfully", {
          autoClose: 700
        })
        search(searchFilters);
        closeMoalforCancelParcel();
      })
      .catch((error) => {
        toast.error("Oops! something went wrong", {
          autoClose: 700
        })
      });
  };


  const [isModalOpenHeavy, setIsModalOpenHeavy] = useState(false);
  const [heavyParceldata, setHeavyParcelData] = useState([]);
  const openModalforHeavyParcel = async (sb, er) => {
    setIsModalOpenHeavy(true);
    await commonSingleExport(sb, er, 'heavy')
    //   setHeavyParcelData(data);

  };

  const closeMoalforHeavyParcel = () => {
    setIsModalOpenHeavy(false);
    setHeavyParcelData([]);
    setHeavyParcel([]);
    setListofheavydata([]);
  }

  const [heavyParcel, setHeavyParcel] = useState(
    {
      companyId: "",
      branchId: "",
      sbNo: "",
      erNo: "",
      totalPackages: "",
      packageNumber: "",
      weight: ""
    }
  )

  const handleHeavyParcel = (event) => {
    const { name, value } = event.target;
    setHeavyParcel((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveHeavydata = () => {
    if (heavyParcel.weight < 34) {
      toast.error("Weight should be greater than or equal to 34KG", {
        autoClose: 700
      });
      return;
    }
    heavyParcel.companyId = companyid;
    heavyParcel.branchId = branchId;
    heavyParcel.sbNo = heavyParceldata.sbNo;
    heavyParcel.erNo = heavyParceldata.erNo;
    heavyParcel.totalPackages = heavyParceldata.noOfPackages;


    axios
      .post(
        `http://${ipaddress}exportshb/saveheavydata`, heavyParcel
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          toast.success("Heavy Parcel Added Successfully", {
            autoClose: 700
          });
          getHEAVYlist(heavyParceldata);
          search(searchFilters) // Only call if the request was successful
        } else {
          toast.error("Failed to Add Heavy Parcel", {
            autoClose: 700
          });
        }
      })
      .catch((error) => {
        toast.error("Something went wrong while adding the heavy parcel", {
          autoClose: 700
        });
      });
  };


  const [listofheavydata, setListofheavydata] = useState('');

  const getHEAVYlist = (heavyParceldata1) => {
    axios
      .get(`http://${ipaddress}exportshb/allheavydata/${companyid}/${branchId}/${heavyParceldata1.erNo}/${heavyParceldata1.sbNo}`)
      .then((response) => {
        setListofheavydata(response.data); // Store the list in the state
      })
      .catch((error) => {
      });
  };

  const numberOfPackages = heavyParceldata.noOfPackages; // Change this to the actual number of packages

  const renderOptions = () => {
    const options = [];
    for (let i = 1; i <= numberOfPackages; i++) {
      options.push(
        <option key={i} value={i}>
          {i}/{numberOfPackages}
        </option>
      );
    }
    return options;
  };


  const deletedata = (data) => {
    axios
      .post(`http://${ipaddress}exportshb/deletedata`, data)
      .then((response) => {
        toast.error("Data delete successfully", {
          autoClose: 700
        })
        search(searchFilters);
        getHEAVYlist(heavyParceldata);
      })
      .catch((error) => {
      });
  };

  const [isModalOpenforImposePenalty, setIsModalOpenforImposePenalty] = useState(false);
  const [ImposePenaltydata, setImposePenaltydata] = useState([]);
  const openModalforImposePenalty = (sb, er) => {
    setIsModalOpenforImposePenalty(true);
    // setImposePenaltydata(data);
    commonSingleExport(sb, er, 'impose');
  };

  const closeMoalforImposePenalty = () => {
    setIsModalOpenforImposePenalty(false);
    setImposePenaltydata([]);
  }

  const handlepenaltychange = (event) => {
    const { name, value } = event.target;
    setImposePenaltydata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const getpenaltystatus = () => {
    if (!ImposePenaltydata.imposePenaltyAmount) {
      toast.error("Please enter the penalty amount..", {
        autoClose: 700
      })
      return;
    }
    axios
      .post(`http://${ipaddress}exportshb/penalty`, ImposePenaltydata)
      .then((response) => {
        toast.success('Penalty Isseued Successfully..', {
          autoClose: 700
        });
        setImposePenaltydata(response.data);
        search(searchFilters);
        closeMoalforImposePenalty();
      })
      .catch((error) => {
        toast.error("Please check the data before submitting..", {
          autoClose: 700
        })
      });
  };


  const [isModalOpenforOverideNSDl, setIsModalOpenforOverideNSDl] = useState(false);
  const [OverideNSDl, setOverideNSDl] = useState([]);
  const [getNSDLStatus, setGETNSDlStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const handleOVERIDEStatus = (e) => {
    setGETNSDlStatus(e.target.value);
  }
  const openModalforsetOverideNSDl = (sb, er, nsdl) => {
    setIsModalOpenforOverideNSDl(true);
    commonSingleExport(sb, er, 'updatensdl');
    // setOverideNSDl(data);
    setGETNSDlStatus(nsdl);
  };

  const closeMoalforOverrideNSDL = () => {
    setIsModalOpenforOverideNSDl(false);
    setOverideNSDl([]);
    setGETNSDlStatus('');
    setSelectedFile([]);
    setType1('');
    setFileData(null);
    setSelectedFile(null);
  }


  // Model Open Const 
  // Model Open Show 
  const [modalDocumentShow, setModalDocumentShow] = useState(false);
  const closeModalDocumentShow = () => {
    setModalDocumentShow(false);
  };

  const openDocument = () => {
    setModalDocumentShow(true);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleOverrideChange = (event) => {
    const { name, value } = event.target;
    setOverideNSDl((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  console.log('selectedFile ', selectedFile);
  const getOverideStatus = () => {
    const submitBtn = document.getElementById("override");
    submitBtn.disabled = true;
    if (!OverideNSDl.reasonforOverride) {
      toast.error("Reason for override is required", {
        autoClose: 700
      })
      search(searchFilters);
      submitBtn.disabled = false;
      return;
    }

    if (!OverideNSDl.parcelStatus) {
      toast.error("Please Select the new status before submitting", {
        autoClose: 700
      })
      search(searchFilters);
      submitBtn.disabled = false;
      return;
    }
    if (selectedFile === undefined) {
      // Display an error message or perform any other actions you want
      toast.error('Please select a file before submitting', {
        autoClose: 700
      });
      search(searchFilters);
      submitBtn.disabled = false;
      return; // Prevent further execution of the function
    }


    search(searchFilters);
    const formData = new FormData();
    formData.append('file', selectedFile);
    axios
      .post(`http://${ipaddress}exportshb/override/${OverideNSDl.parcelStatus}/${OverideNSDl.reasonforOverride}/${companyid}/${branchId}/${OverideNSDl.erNo}/${OverideNSDl.sbNo}`, formData, // Use formData as the request body
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
          },

          // Assuming updatedImportSub is a JSON object
        },)
      .then((response) => {
        toast.success('NSDL Status Override  Successfully..', {
          autoClose: 700
        });
        submitBtn.disabled = false;
        search(searchFilters);
        closeMoalforOverrideNSDL();
      })
      .catch((error) => {
        toast.error("Please check the data before submitting..", {
          autoClose: 700
        })
        submitBtn.disabled = false;
      });
  };

  const [fileData, setFileData] = useState(null);
  const [type1, setType1] = useState('');
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const downloadFile = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}exportshb/download/${companyid}/${branchId}/${OverideNSDl.erNo}/${OverideNSDl.sbNo}`, {
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

  const closeModal = () => {
    setFileData(null); // Clear the image URL
    setModalIsOpen(false); // Close the modal
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



  const [historydata, setHistorydata] = useState({});
  const [isModalOpenforviewhistory, setIsModalOpenforforviewhistory] = useState(false);
  const [ExHistoryList, setExHistoryList] = useState([]);

  const openModalforviewhistory = (sb, er) => {
    commonSingleExport(sb, er, 'history');
    setIsModalOpenforforviewhistory(true);

    console.log("sb sb er er ", sb, " ", er, " ", historydata);

    //  setHistorydata(data);
  };

  const closeMoalforviewhistory = () => {
    setIsModalOpenforforviewhistory(false);
    setHistorydata([]);
    setExHistoryList([]);
  }

  const handleHistory = (historydata1) => {
    axios
      .get(
        `http://${ipaddress}exportshb/getExportHistoryList/${companyid}/${branchId}/${historydata1.erNo}/${historydata1.sbNo}`
      )
      .then((response) => {
        setExHistoryList(response.data);


      })
      .catch((error) => {
      });
  };

  const [consoleData, setConsoleData] = useState([]);
  const [consoleId, setConsoleId] = useState('');
  const getConsoleData = () => {
    const type = "Console";
    axios.get(`http://${ipaddress}externalparty/getSpecificData/${companyid}/${branchId}/${type}`)
      .then((response) => {
        setConsoleData(response.data);
        const data = response.data;
        const namesMap = {};
        data.forEach(party => {
          namesMap[party[0]] = party[1];
        });
        setConsoleId(namesMap);
      })
      .catch((error) => {
        if (error) {

        }
      })
  }

  const [isModelOpenForConsoleAgent, setIsModelOpenForConsoleAgent] = useState(false);
  const [singleConsole, setSingleConsole] = useState('');

  const handleSingleConsole = (e) => {
    setSingleConsole(e.target.value);

    if (consoleStatus === 'Receive') {
      setGetrepresentData([]);
      getConsoleRepresentData(e.target.value)
    }
  }

  const [selectedConsoleData, setselectedConsoleData] = useState([]);
  const [consoleStatus, setconsoleStatus] = useState('');
  const handleOpenConsoleModel = (status) => {
    setIsModelOpenForConsoleAgent(true);
    getConsoleData();
    setconsoleStatus(status);
    console.log('selectedConsoleData ', selectedConsoleData);
  }

  const closeConsoleModel = () => {
    setconsoleStatus('');
    setConsoleData([]);
    setIsModelOpenForConsoleAgent(false);
    setSingleConsole('');
    setselectedConsoleData([]);
    search(searchFilters);
    setSelectedRows2([]);
    setSelectedOption('N')
    setSelectAll2(false);
    setImageData1(null);
    setIm1('');
    setSelectedConsole('');
    setGetrepresentData([]);
    setTodaytp([]);
    setTpstatus('N');
    setgetSingleConsole({});
    setselectRepresentdata('');
    setgetSingleConsole({
      mobile: '',
    });
  }

  const [selectedConsole, setSelectedConsole] = useState('');
  const checkConsoleData = (id) => {

    if (id === '') {
      toast.error("Please select console", {
        autoClose: 800
      })
      return;
    }
    if (consoleStatus === 'Receive') {
      if (selectRepresentdata === '') {
        toast.error("Please select the representative", {
          autoClose: 800
        })
        return;
      }
    }
    let ip = ``;
    if (consoleStatus === 'Handover') {
      ip = `http://${ipaddress}exportshb/getConsoleData/${companyid}/${branchId}/${id}`;
    }
    if (consoleStatus === 'Receive') {
      ip = `http://${ipaddress}exportshb/getConsoleData1/${companyid}/${branchId}/${id}/${selectRepresentdata}`;
    }

    axios.get(ip)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          setselectedConsoleData(data);
          console.log('data data ', data);
          toast.success("Data found successfully", {
            autoClose: 800
          })
          setSelectedConsole(id);
          // imageFile1(id);
          getConsoleRepresentData(id);
        }
        else {
          setselectedConsoleData([]);
          toast.error("Data not found", {
            autoClose: 800
          })
        }
      })
      .catch((error) => {
        setselectedConsoleData([]);
      })
  }

  const [selectedRows2, setSelectedRows2] = useState([]);
  const [selectAll2, setSelectAll2] = useState(false);


  const handleCheckboxChange3 = (item) => {
    // Toggle the selection state for the clicked row
    if (selectedRows2.includes(item)) {
      setSelectedRows2(selectedRows2.filter((row) => row !== item));
      setSelectAll2(false); // Uncheck header checkbox if a row is unchecked
    } else {
      setSelectedRows2([...selectedRows2, item]);
      // Check if all rows are selected
      if (selectedRows2.length + 1 === selectedConsoleData.length) {
        setSelectAll2(true); // Check header checkbox if all rows are selected
      }
    }
  };


  const handleSelectAll2 = () => {
    if (selectAll2) {
      setSelectedRows2([]);
    } else {
      setSelectedRows2([...selectedConsoleData]); // Clone the array
    }
    setSelectAll2(!selectAll2);
  };

  const [imageData1, setImageData1] = useState(null);
  const [im1, setIm1] = useState('');
  const [getrepresentData, setGetrepresentData] = useState([]);
  const imageFile1 = async (id) => {
    try {
      const response = await axios.get(`http://${ipaddress}represent/getImage/${companyid}/${branchId}/${id}`, {
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

      setIm1('N')
    }
  };

  const getConsoleRepresentData = (id) => {
    axios
      .get(`http://${ipaddress}represent/getAllConsoleReprsent/${companyid}/${branchId}/${id}`)
      .then((response) => {
        console.log('setGetrepresentData ', response.data);
        setGetrepresentData(response.data); // Store the list in the state
      })
      .catch((error) => {
      });
  };

  const [getSingleConsole, setgetSingleConsole] = useState({});
  const [selectRepresentdata, setselectRepresentdata] = useState('');
  const getSingleConsoleRepresentData = (id1) => {
    imageFile1(id1);
    setselectRepresentdata(id1);
    setgetSingleConsole({
      mobile: '',
    });
    axios
      .get(`http://${ipaddress}represent/byrepresentid/${companyid}/${branchId}/${id1}`)
      .then((response) => {

        setgetSingleConsole(response.data); // Store the list in the state
      })
      .catch((error) => {
      });
  };


  const checkotp = () => {
    if (!selectRepresentdata) {
      toast.error("Please select representative", {
        autoClose: 700
      })
      return;
    }

    if (!getSingleConsole.mobile) {
      toast.error("Please select mobile no.", {
        autoClose: 700
      })
      return;
    }
    const data = selectedRows2.reduce((total, item) => total + item.noOfPackages, 0);
    axios
      .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectRepresentdata}/${getSingleConsole.mobile}/${data}`)
      .then(() => {
        toast.success("OTP sent successfully", {
          autoClose: 700
        })

      })
      .catch((error) => {
      });
  };


  const [selectedOption, setSelectedOption] = useState('N');  // Default value for the radio buttons
  const [dropdownOptions, setDropdownOptions] = useState([]);  // Options for the dropdown
  const [selectedDropdownOption, setSelectedDropdownOption] = useState('');  // Selected value from the dropdown
  const [todaytp, setTodaytp] = useState([]);
  const [tpstatus, setTpstatus] = useState('N');

  const formatDateToYYYYMMDD = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month because it's zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  console.log('tpstatus ', tpstatus);
  const alltp = () => {
    const date = formatDateToYYYYMMDD();
    console.log('today date ', date);

    axios
      .get(`http://${ipaddress}exportshb/alltp/${companyid}/${branchId}/${date}/${selectedConsole}`)
      .then((response) => {
        console.log('existintp ', response.data);
        setTodaytp(response.data); // Store the list in the state
      })
      .catch((error) => {
      });
  }


  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setTpstatus('N');
    if (value === 'Y') {
      alltp();

    } else {
      // Clear the dropdown options if the first radio button is selected
      setDropdownOptions([]);
      setSelectedDropdownOption('');
    }
  }

  const [getOtp, setGetotp] = useState('');

  const handleOtp = (e) => {
    setGetotp(e.target.value);
  }

  const handleConsoleSubmit = async () => {
    if (consoleStatus === 'Handover') {
      const result = await Swal.fire({
        title: 'Please check the trip before you submit it.',
        width: 'auto',
        position: 'top', // Set the position to 'top'
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
          title: 'your-custom-title-class', // Define a custom class for the title
          cancelButton: 'your-custom-cancel-button-class', // Define a custom class for the cancel button
          confirmButton: 'your-custom-confirm-button-class', // Define a custom class for the confirm button
          content: 'your-custom-content-class', // Define a custom class for the content
        },
        buttonsStyling: false,
      });

      if (result.isConfirmed) {
        const btn = document.getElementById("consoleSubmit");
        btn.disabled = true;
        if (!selectRepresentdata) {
          toast.error("Please select representative", {
            autoClose: 700
          })
          btn.disabled = false;
          return;
        }

        if (!getSingleConsole.mobile) {
          toast.error("Please select mobile no.", {
            autoClose: 700
          })
          btn.disabled = false;
          return;
        }
        if (selectedRows2.length === 0) {
          toast.error("Please select atleast one checkbox", {
            autoClose: 700
          })
          btn.disabled = false;
          return;
        }
        const tpdataa = tpstatus.replace(/\//g, '@');
        let ip = ``;

        ip = `http://${ipaddress}exportshb/checkhandovercartotp/${companyid}/${branchId}/${selectRepresentdata}/${getSingleConsole.mobile}/${getOtp}/${singleConsole}/${userId}/${tpdataa}`;



        axios
          .post(ip, selectedRows2)

          .then(() => {

            btn.disabled = false;
            closeConsoleModel();
            toast.success("Handed over to console successfully", {
              autoClose: 700
            })
            search(searchFilters);
            // getHandoverdata();
          })
          .catch((error) => {
            toast.error("Invalid OTP", {
              autoClose: 700
            })
            btn.disabled = false;
          });

      }

    }
    else {

      const btn = document.getElementById("consoleSubmit");
      btn.disabled = true;
      if (!selectRepresentdata) {
        toast.error("Please select representative", {
          autoClose: 700
        })
        btn.disabled = false;
        return;
      }

      if (!getSingleConsole.mobile) {
        toast.error("Please select mobile no.", {
          autoClose: 700
        })
        btn.disabled = false;
        return;
      }
      if (selectedRows2.length === 0) {
        toast.error("Please select atleast one checkbox", {
          autoClose: 700
        })
        btn.disabled = false;
        return;
      }
      const tpdataa = tpstatus.replace(/\//g, '@');
      let ip = ``;

      ip = `http://${ipaddress}exportshb/checkreceivecartotp/${companyid}/${branchId}/${selectRepresentdata}/${getSingleConsole.mobile}/${getOtp}/${userId}`;

      axios
        .post(ip, selectedRows2)

        .then(() => {

          btn.disabled = false;
          closeConsoleModel();
          toast.success("Handed over to console successfully", {
            autoClose: 700
          })
          search(searchFilters);
          // getHandoverdata();
        })
        .catch((error) => {
          toast.error("Invalid OTP", {
            autoClose: 700
          })
          btn.disabled = false;
        });


    }
  }


  const [isModelOpenForAirline, setisModelOpenForAirline] = useState(false);
  const [selectAirline, setSelectAirline] = useState('');

  const openModelforAirline = () => {
    setisModelOpenForAirline(true);
    getFlightlist();
  }

  const closeModelforAirline = () => {
    setisModelOpenForAirline(false);
    setSumofpkg('');
    setSumofSb('');
    setgetexportdatabyairline([]);
    setSelectedRows([]);
    setSelectAll(false);
    setSelectAirline('N');
  }

  const [getAllFlight, setGetAllFlight] = useState([]);
  const getFlightlist = () => {
    axios
      .get(`http://${ipaddress}Airline/list1/${companyid}/${branchId}`)
      .then((response) => {
        setGetAllFlight(response.data); // Store the list in the state

      })
      .catch((error) => {
      });
  };

  const [sumofpkg, setSumofpkg] = useState('');
  const [sumofSb, setSumofSb] = useState('');

  const [getexportdatabyairline, setgetexportdatabyairline] = useState([]);
  const getExportAirlinewiselist = (airname1) => {
    if (airname1 === 'N' || airname1 === '') {
      toast.error("Please select the airline", {
        autoClose: 800
      })
      return;
    }
    axios
      .get(`http://${ipaddress}exportshb/byairline/${companyid}/${branchId}/${airname1}`)
      .then((response) => {
        if (response.data.length === 0) {
          toast.error("No Result Found", {
            autoClose: 700
          })
        }
        setgetexportdatabyairline(response.data); // Store the list in the state
        const sumOfPackages = response.data.reduce((total, item) => total + (item[5] || 0), 0);

        setSumofpkg(sumOfPackages);
        const sumofSb = response.data.filter(item => item[2] !== undefined && item[2] !== null).length;


        setSumofSb(sumofSb);
      })
      .catch((error) => {
      });
  };


  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);




  const handleCheckboxChange = (item) => {
    // Toggle the selection state for the clicked row
    if (selectedRows.includes(item)) {
      setSelectedRows(selectedRows.filter((row) => row !== item));
      setSelectAll(false); // Uncheck header checkbox if a row is unchecked
    } else {
      setSelectedRows([...selectedRows, item]);
      // Check if all rows are selected
      if (selectedRows.length + 1 === getexportdatabyairline.length) {
        setSelectAll(true); // Check header checkbox if all rows are selected
      }
    }
  };


  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...getexportdatabyairline]); // Clone the array
    }
    setSelectAll(!selectAll);
  };

  const handleAirline = () => {
    const btn = document.getElementById("airlineSubmit");
    btn.disabled = true;
    if (selectedRows == []) {
      toast.error("Please select atleast one checkbox", {
        autoClose: 700
      })
      btn.disabled = false;
      return;
    }

    axios.post(`http://${ipaddress}exportshb/saveAirlineData/${companyid}/${branchId}/${userId}`, selectedRows)
      .then((response) => {
        if (response.data == 'success') {
          toast.success("Packages handed over to airline successfully", {
            autoClose: 800
          })
          btn.disabled = false;
          closeModelforAirline();
          search(searchFilters);
        }
      })
      .catch((error) => {
        if (error) {
          btn.disabled = false;
        }
      })
  }


  //Redeposit


  const [isModelOpenForRedeposit, setisModelOpenForRedeposit] = useState(false);
  const [selectAirlineDate, setselectAirlineDate] = useState(new Date());

  const handleAirlineDateChange = (date) => {
    setselectAirlineDate(date);
  };

  const openModelforRedeposit = () => {
    setisModelOpenForRedeposit(true);
    getFlightlist();
  }

  const [remarks, setRemarks] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChangeRedeposite = (e) => {
    const selectedFile = e.target.files[0];


    // Check if a file is selected
    if (!selectedFile) {
      return;
    }

    // Check file size (in bytes)
    const maxSizeInBytes = 8 * 1024 * 1024; // 8MB
    if (selectedFile.size > maxSizeInBytes) {
      toast.error('File size must be less than 8MB');
      return;
    }

    // Check file type
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedFileTypes.includes(selectedFile.type)) {
      toast.error('File type must be jpg, jpeg, png, or pdf');
      return;
    }
    setFile(selectedFile);
  };

  const closeModelforRedeposit = () => {
    setisModelOpenForRedeposit(false);
    setSumofpkg('');
    setSumofSb('');
    setgetexportdatabyairline([]);
    setSelectedRows([]);
    setSelectAll(false);
    setSelectAirline('N');
    setselectAirlineDate(new Date());
    setRemarks('');
    setFile(null);
  }



  const getExportAirlinewiselistForRedeposit = (airlinedate, airname1) => {
    if (airname1 === 'N' || airname1 === '') {
      toast.error("Please select the airline", {
        autoClose: 800
      })
      return;
    }
    if (!airlinedate) {
      toast.error("Please select the airline date", {
        autoClose: 800
      })
      return;
    }


    axios
      .get(`http://${ipaddress}exportshb/byairlineAndDate/${companyid}/${branchId}/${airname1}/${convertToFormattedDate(airlinedate)}`)
      .then((response) => {
        if (response.data.length === 0) {
          toast.error("No Result Found", {
            autoClose: 700
          })
        }
        setgetexportdatabyairline(response.data); // Store the list in the state
        const sumOfPackages = response.data.reduce((total, item) => total + (item[5] || 0), 0);

        setSumofpkg(sumOfPackages);
        const sumofSb = response.data.filter(item => item[2] !== undefined && item[2] !== null).length;


        setSumofSb(sumofSb);
      })
      .catch((error) => {
      });
  };



  const handleRedeposit = () => {
    const btn = document.getElementById("redepositSubmit");
    btn.disabled = true;
    if (selectedRows == []) {
      toast.error("Please select atleast one checkbox", {
        autoClose: 700
      })
      btn.disabled = false;
      return;
    }

    if (!remarks) {
      toast.error("Pease enter the remarks.", {
        autoClose: 800
      })
      btn.disabled = false;
      return
    }

    if (!file) {
      toast.error("Upload Document is required.", {
        autoClose: 800
      })
      btn.disabled = false;
      return
    }

    const formData = new FormData();
    formData.append('remarks', remarks);
    formData.append('file', file);
    formData.append('selectedRows', selectedRows);

    console.log('formData formData ', formData);

    axios.post(`http://${ipaddress}exportshb/saveRedepositData/${companyid}/${branchId}/${userId}`, formData)
      .then((response) => {
        if (response.data == 'success') {
          toast.success("Packages handed over to cargo successfully", {
            autoClose: 800
          })
          btn.disabled = false;
          closeModelforRedeposit();
          search(searchFilters);
        }
      })
      .catch((error) => {
        if (error) {
          btn.disabled = false;
        }
      })
  }



  const [isModalOpenForSingleCartingAgent, setisModalOpenForSingleCartingAgent] = useState(false);
  const [selectconsole, setSelectconsole] = useState('');
  const [getHandoverConsoleData, setgetHandoverConsoleData] = useState({});

  const openModelForSingleCartingAgent = (sb, er, console) => {
    setisModalOpenForSingleCartingAgent(true);
    getConsoleData();
    commonSingleExport(sb, er, 'handoverconsole');
    setSelectedConsole(console);
  }

  const closeModelForSingleCartingAgent = () => {
    setisModalOpenForSingleCartingAgent(false);
    setImageData2(null);
    setIm2('');
    setTodaytp([]);
    setTpstatus('N');
    setSelectedOption('N')
    setSelectconsole('');
    setSelectedConsole('');
    setGetrepresentData([]);
    setrepresentData('');
    setgetSingleConsole1({
      mobile: '',
    });
    setGetotp('');
    setgetHandoverConsoleData({});
  }

  const setConsole = (e) => {
    setGetrepresentData([]);
    setgetSingleConsole1({
      mobile: '',
    });
    setIm2('');
    setSelectconsole(e.target.value);
    getConsoleRepresentData(e.target.value);

  }

  const [representData, setrepresentData] = useState('');
  const [getSingleConsole1, setgetSingleConsole1] = useState({});
  const getSingleConsoleRepresentData1 = (id1) => {
    imageFile2(id1);
    setrepresentData(id1);
    setgetSingleConsole1({
      mobile: '',
    });
    axios
      .get(`http://${ipaddress}represent/byrepresentid/${companyid}/${branchId}/${id1}`)
      .then((response) => {

        setgetSingleConsole1(response.data); // Store the list in the state
      })
      .catch((error) => {
      });
  };

  const [imageData2, setImageData2] = useState(null);
  const [im2, setIm2] = useState('');
  const imageFile2 = async (id) => {
    try {
      const response = await axios.get(`http://${ipaddress}represent/getImage/${companyid}/${branchId}/${id}`, {
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

      setIm2("N");
    }
  };

  const checkotp1 = () => {
    if (!representData) {
      toast.error("Please select representative", {
        autoClose: 700
      })
      return;
    }

    if (!getSingleConsole1.mobile) {
      toast.error("Please select mobile no.", {
        autoClose: 700
      })
      return;
    }

    console.log('selectconsole ', representData, ' ', 'getSingleConsole1.mobile ', getSingleConsole1.mobile, ' ', 'getHandoverConsoleData.noOfPackages ', getHandoverConsoleData.noOfPackages);

    axios
      .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${representData}/${getSingleConsole1.mobile}/${getHandoverConsoleData.noOfPackages}`)
      .then(() => {
        toast.success("OTP sent successfully", {
          autoClose: 700
        })

      })
      .catch((error) => {
      });
  };

  const saveSingleCartingAgentData = async () => {
    const result = await Swal.fire({
      title: 'Please check the trip before you submit it.',
      width: 'auto',
      position: 'top', // Set the position to 'top'
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      customClass: {
        title: 'your-custom-title-class', // Define a custom class for the title
        cancelButton: 'your-custom-cancel-button-class', // Define a custom class for the cancel button
        confirmButton: 'your-custom-confirm-button-class', // Define a custom class for the confirm button
        content: 'your-custom-content-class', // Define a custom class for the content
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      const btn = document.getElementById("singleConsoleSubmit");
      btn.disabled = true;
      if (!representData) {
        toast.error("Please select representative", {
          autoClose: 700
        })
        btn.disabled = false;
        return;
      }

      if (!getSingleConsole1.mobile) {
        toast.error("Please select mobile no.", {
          autoClose: 700
        })
        btn.disabled = false;
        return;
      }

      if (!getOtp) {
        toast.error("Please enter the otp", {
          autoClose: 700
        })
        btn.disabled = false;
        return;
      }
      const tpdataa = tpstatus.replace(/\//g, '@');
      axios.get(`http://${ipaddress}exportshb/checkexpcartotp/${companyid}/${branchId}/${representData}/${getSingleConsole1.mobile}/${getOtp}/${getHandoverConsoleData.erNo}/${getHandoverConsoleData.sbNo}/${userId}/${tpdataa}`)
        .then(() => {

          btn.disabled = false;
          closeConsoleModel();
          toast.success("Handed over to console successfully", {
            autoClose: 700
          })

          search(searchFilters);
          closeModelForSingleCartingAgent();
          // getHandoverdata();
        })
        .catch((error) => {
          toast.error("Invalid OTP", {
            autoClose: 700
          })
          btn.disabled = false;
        });
    }
  }



  const handleERSlipPrint = async (sb, er) => {

    try {
      const response = await axios.post(
        `http://${ipaddress}exportshb/erPrint?cid=${companyid}&bid=${branchId}&sb=${sb}&er=${er}`
      );
      if (response.status === 200) {
        const base64PDF = response.data;

        // Create a new window for displaying the PDF
        const newWindow = window.open("", "_blank");

        // Write the HTML content to the new window
        newWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>ER_SLIP</title>
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
        throw new Error("Failed to generate PDF");
      }
    } catch (error) {
      // Handle errors if any
    }
  };

  const [isModalOpenforCustomTp, setIsModalOpenforCustomTp] = useState(false);
  const [selectConsoleforCustomTP, setselectConsoleforCustomTP] = useState('');
  const [getExportdataForCTP, setgetExportdataForCTP] = useState([]);
  const openModalforCustomTp = () => {
    setIsModalOpenforCustomTp(true);
    getConsoleData();
  };

  //TP  and PCTM
  const closeModalforcustomtp = () => {
    setIsModalOpenforCustomTp(false);
    setgetExportdataForCTP([]);
    setselectConsoleforCustomTP('');
    setSelectAll1(false);
    setSelectedRows1([]);
    setcustomTPDate(new Date());
    setcustomTP('');
  }


  const getCustomTPData = (id) => {
    axios.get(`http://${ipaddress}exportshb/getCustomTpData/${companyid}/${branchId}/${id}`)
      .then((response) => {
        const data = response.data;
        if(data.length>0){
          setgetExportdataForCTP(data);

          toast.success("Data found successfully",{
            autoClose:800
          })
        }
        else{
          toast.error("Data not found",{
            autoClose:800
          })
        }
      })
      .catch((error) => {
        toast.error("Data not found",{
          autoClose:800
        })
      })
  }

  const [selectedRows1, setSelectedRows1] = useState([]);
  const [selectAll1, setSelectAll1] = useState(false);




  const handleCheckboxChange1 = (item) => {
    // Toggle the selection state for the clicked row
    if (selectedRows1.includes(item)) {
      setSelectedRows1(selectedRows1.filter((row) => row !== item));
      setSelectAll1(false); // Uncheck header checkbox if a row is unchecked
    } else {
      setSelectedRows1([...selectedRows1, item]);
      // Check if all rows are selected
      if (selectedRows1.length + 1 === getExportdataForCTP.length) {
        setSelectAll1(true); // Check header checkbox if all rows are selected
      }
    }
  };


  const handleSelectAll1 = () => {
    if (selectAll1) {
      setSelectedRows1([]);
    } else {
      setSelectedRows1([...getExportdataForCTP]); // Clone the array
    }
    setSelectAll1(!selectAll1);
  };

  const [customTP,setcustomTP] = useState('');
  const [customTPDate,setcustomTPDate] = useState(new Date());

  const handleCustomTPDateChange = (date) => {
    setcustomTPDate(date);
  };

  const formatDateToYYYYMMDDHHMMSS=(dateString)=> {
    const date = new Date(dateString);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  

  const saveCustomTP = () =>{
    if(selectedRows1.length === 0){
      toast.error("Please select atleast one checkbox",{
        autoClose:800
      })
      return;
    }

    if(!customTP){
      toast.error("Custom TP is required",{
        autoClose:800
      })
      return;
    }

    if(!customTPDate){
      toast.error("Custom TP date is required",{
        autoClose:800
      })
      return;
    }


    axios.post(`http://${ipaddress}exportshb/saveCustomTP?companyId=${companyid}&branchId=${branchId}&customTP=${customTP}&customTPDate=${formatDateToYYYYMMDDHHMMSS(customTPDate)}`,selectedRows1)
    .then((response)=>{
       const data = response.data;
       if(data === 'success'){
        toast.success("Exports update successfully",{
          autoClose:800
        })
        closeModalforcustomtp();
        search(searchFilters);
       }
       else{
        toast.error("Something went wrong",{
          autoClose:800
        })
       }
    })
    .catch((error)=>{
      toast.error("Something went wrong",{
        autoClose:800
      })
    })
  }


  const [isModalOpenforCustomPctm, setIsModalOpenforCustomPctm] = useState(false);
  const [selectConsoleforCustomPctm, setselectConsoleforCustomPctm] = useState('');
  const [getExportdataForCPctm, setgetExportdataForCPctm] = useState([]);
  const openModalforCustomPctm = () => {
    setIsModalOpenforCustomPctm(true);
    getConsoleData();
  };

  const closeModalforCustomPctm = () =>{
    setgetExportdataForCPctm([]);
    setselectConsoleforCustomPctm('');
    setIsModalOpenforCustomPctm(false);
  }

  return (
    <div className="container">
      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-50px' }} > <FontAwesomeIcon
        icon={faPlaneDeparture}
        style={{
          marginRight: '8px',
          color: 'black', // Set the color to golden
        }}
      /> Export </h5>

      {loading && (
        <div style={styles.overlay}>
          <ReactLoading type="spin" color="#0000FF" height={300} width={80} />
        </div>
      )}


      <Card>
        <CardBody>
          <div className="row">
            <div className="col-md-6">

            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <div className="btn-group">
                <DropdownButton
                  title={<span>

                    <span>  <FontAwesomeIcon icon={faAtom} style={{ marginRight: "5px" }} />Action</span>
                  </span>}
                  style={{ float: 'right', background: 'none' }}
                  variant="outline-success"
                >
                  <Dropdown.Item onClick={() => handleOptionButtonClick("add")}>   <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />Add New Export</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOpenConsoleModel('Handover')} > <FontAwesomeIcon icon={faArrowTurnRight} style={{ marginRight: '5px' }} />Handover to Console</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleOpenConsoleModel('Receive')} > <FontAwesomeIcon icon={faArrowCircleLeft} style={{ marginRight: '5px' }} />Receive from Console</Dropdown.Item>
                  <Dropdown.Item onClick={() => openModalforCustomTp()} > <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />Update Custom TP Number</Dropdown.Item>
                  <Dropdown.Item onClick={() => openModalforCustomPctm()} > <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />Update Custom PCTM Number</Dropdown.Item>
                  <Dropdown.Item onClick={() => openModelforAirline()}> <FontAwesomeIcon icon={faArrowTurnRight} style={{ marginRight: '5px' }} />Handover to Airline</Dropdown.Item>
                  <Dropdown.Item onClick={() => openModelforRedeposit()}>
                    {" "}
                    <FontAwesomeIcon
                      icon={faArrowCircleLeft}
                      style={{ marginRight: "5px" }}
                    />
                    Redeposit
                  </Dropdown.Item>
                  {/*  <Dropdown.Item onClick={() => openModalforreceivefromcartingagent()}><FontAwesomeIcon icon={faArrowCircleLeft} style={{ marginRight: '5px' }} />Receive from Carting Agent</Dropdown.Item>
                        <Dropdown.Item onClick={() => openModalforhandoverairline()}> <FontAwesomeIcon icon={faArrowTurnRight} style={{ marginRight: '5px' }} />Handover to Airline</Dropdown.Item>
                        <Dropdown.Item onClick={() => openModalforRedeposite()}>
                          {" "}
                          <FontAwesomeIcon
                            icon={faArrowCircleLeft}
                            style={{ marginRight: "5px" }}
                          />
                          Redeposit
                        </Dropdown.Item> */}
                </DropdownButton>


              </div>
            </div>
          </div>


          <hr />
          <form>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel" htmlFor="search">
                    Search By
                  </label>
                  <input
                    type="text"
                    id="search"
                    className="form-control"
                    name="serNo"
                    value={searchFilters.serNo}
                    onChange={handleFilterChange}
                  />
                </FormGroup>
              </Col>{" "}
              <Col md={4}>



                <Row md={6}>
                  <Col md={6}>
                    <label className="forlabel" htmlFor="startDate">
                      Date From
                    </label>
                    <DatePicker
                      selected={searchFilters.startDate}
                      onChange={handleStartDateChange}
                      dateFormat="dd/MM/yyyy"
                      className="form-control border-right-0 inputField"
                      customInput={<input style={{ width: '100%' }} />}
                      wrapperClassName="custom-react-datepicker-wrapper"
                    />
                  </Col>

                  <Col md={6}>
                    <label className="forlabel" htmlFor="startDate">
                      Date To
                    </label>
                    <DatePicker
                      selected={searchFilters.endDate}
                      onChange={handleEndDateChange}
                      dateFormat="dd/MM/yyyy"
                      className="form-control border-right-0 inputField"
                      customInput={<input style={{ width: '100%' }} />}
                      wrapperClassName="custom-react-datepicker-wrapper"
                    />
                  </Col>

                </Row>

              </Col>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel" htmlFor="snzParcel">
                    SNZ Parcel
                  </label>
                  <select
                    id="snzParcel"
                    name="snzParcel"
                    className="form-control form-select"
                    value={searchFilters.snzParcel}
                    onChange={handleFilterChange}

                  >
                    <option value="">-Any-</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>
                </FormGroup>
              </Col>

            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel" htmlFor="hold">
                    Hold
                  </label>
                  <select
                    id="hold"
                    name="hold"
                    className="form-control form-select"
                    value={searchFilters.hold}
                    onChange={handleFilterChange}

                  >
                    <option value="">-Any-</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <label className="forlabel" htmlFor="Heavy">
                    Heavy
                  </label>
                  <select
                    id="Heavy"
                    name="heavy"
                    className="form-control  form-select"
                    value={searchFilters.heavy}
                    onChange={handleFilterChange}
                  >
                    <option value="">-Any-</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <label
                    className="forlabel bold-label"
                    htmlFor="dgdcStatus"
                  >
                    DGDC Status
                  </label>
                  <select
                    id="dgdcStatus"
                    className="form-control"
                    name="dgdcStatus"
                    value={searchFilters.dgdcStatus}
                    onChange={handleFilterChange}
                  >
                    <option value="">Select DGDC Status</option>
                    {JarListDtlDGDC.map((item) => (
                      <option key={item.id} value={item.jarDtlDesc}>
                        {item.jarDtlDesc}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </Col>
            </Row>


            <Row>



              <Col className="text-center">
                <Button
                  variant="outline-primary"
                  style={{ marginLeft: "10px", marginTop: "10px" }}
                  onClick={(e) => { search(searchFilters); setCurrentPageFun(); }}
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{ marginRight: "5px" }}
                  />

                  Search
                </Button>

                <Button

                  variant="outline-danger"
                  style={{ marginLeft: "10px", marginTop: "10px" }}
                  onClick={handleClear}
                >
                  <FontAwesomeIcon
                    icon={faSyncAlt}
                    style={{ marginRight: "5px" }}
                  />
                  Reset
                </Button>

              </Col>





            </Row>
          </form>
        </CardBody>
      </Card>
      <Card>
        <CardBody>


          <div

          >

            <div className=" mt-1 table-responsive">
              <Table className="table table-bordered text-center custom-table mt-3">
                <thead>
                  <tr>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      Sr.No
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      SB.No
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      SB.Date
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      ER No
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      ER Date
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      Exporter
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      Pkgs
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      Gross Wt
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      Parcel Status
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      DGDC Status
                    </th>
                    <th
                      style={{ backgroundColor: '#BADDDA' }}
                      className="text-center"
                    >
                      Action
                    </th>
                  </tr>
                  <tr>
                    <th style={{ backgroundColor: '#BADDDA' }} className="text-center">Total</th>
                    <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData.map((item) => item[0]).length}</th>
                    <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                    <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                    <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                    <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                    <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData.reduce((total, item) => total + item[4], 0)}</th>
                    <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                    <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                    <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                    <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <td>{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                      <td>{item[0]}</td>
                      <td>{formatDateTime(item[10])}</td>
                      <td>{item[1]}</td>
                      <td>{formatDateTime(item[2])}</td>
                      <td>{getpartyId[item[3]]}</td>
                      <td>{item[4]}</td>
                      <td>{item[5]}</td>
                      <td >{item[6]}</td>



                      <td className="table-column" style={{ flexDirection: 'column', alignItems: 'center' }}>
                        <span>{item[7]}</span>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>


                          {item[8] === "Y" ? (
                            <FaHandPaper size={22} color="orange" style={{ marginRight: '10px' }} title="On Hold" />
                          ) : null}

                          {item[9] === "Y" ? (
                            <FaTruckLoading size={22} fill="orange" style={{ marginRight: '10px' }} title="Heavy Carriage" />
                          ) : null}

                          {item[13] === "Y" ? (

                            <img src={snzLoge} className="img-fluid" alt="SNZ" width={25} height={25} title="SNZ Parcel" />

                          ) : null}
                        </div>

                      </td>


                      <td className="table-column">
                        <div className="">
                          <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
                            Action
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <button className="dropdown-item" onClick={() => { printBarcode(item[0], item[1], item[4], item[2], item[10], "N", "1232") }}>
                                <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />Print SER
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" onClick={() => { handleViewClick(item[0], item[1]) }}>
                                <FontAwesomeIcon icon={faEye} style={{ marginRight: '5px' }} />View All
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" onClick={() => { handleEditClick(item[0], item[1]) }}>
                                <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />Edit
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" onClick={() => { handleERSlipPrint(item[0], item[1]) }}>
                                <FontAwesomeIcon icon={faReceipt} style={{ marginRight: '5px' }} />ER Slip
                              </button>
                            </li>
                            {(item[8] === 'N' || item[8] === 'R') && (
                              <li>
                                <button className="dropdown-item" onClick={() => fetchHoldData(companyid, branchId, item[0], item[1])}>
                                  <FontAwesomeIcon icon={faHand} style={{ marginRight: "5px" }} />Hold Parcel
                                </button>
                              </li>
                            )}

                            {item[8] === 'Y' && (
                              <li>
                                <button className="dropdown-item" onClick={() => fetchUnHoldData(companyid, branchId, item[0], item[1])}>
                                  <FontAwesomeIcon icon={faHandFist} style={{ marginRight: "5px" }} />UnHold Parcel
                                </button>
                              </li>
                            )}
                            <li>
                              <button className="dropdown-item" onClick={() => openModalforHeavyParcel(item[0], item[1])}>
                                <FontAwesomeIcon icon={faWeightHanging} style={{ marginRight: "5px" }} />Tag Heavy Parcel
                              </button>
                            </li>
                            {(item[7] === 'Handed over to DGDC SHB' && (item[6] === 'Allow Export' || item[6] === 'Let Export') && item[8] !== 'Y') && (
                              <li>
                                <button className="dropdown-item" hidden={item[8] === 'Handed over to Console'} onClick={() => openModelForSingleCartingAgent(item[0], item[1], item[12])}>
                                  <FontAwesomeIcon icon={faArrowTurnRight} style={{ marginRight: "5px" }} />Handover over to Console
                                </button>
                              </li>
                            )}
                            <li>
                              <button className="dropdown-item" onClick={() => openModalforsetOverideNSDl(item[0], item[1], item[6])}>
                                <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />Override Parcel Status
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" onClick={() => openModalforImposePenalty(item[0], item[1])}>
                                <FontAwesomeIcon icon={faGavel} style={{ marginRight: "5px" }} />Impose Penalty
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" onClick={() => openModalforCancelParcel(item[0], item[1])}>
                                <FontAwesomeIcon icon={faXmarkCircle} style={{ marginRight: "5px" }} />Cancel Parcel
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item" onClick={() => openModalforviewhistory(item[0], item[1])}>
                                <FontAwesomeIcon icon={faHistory} style={{ marginRight: "5px" }} />View Transaction History
                              </button>
                            </li>
                          </ul>
                        </div>

                      </td>
                    </tr>
                  ))}
                </tbody>

              </Table>
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


          </div>
        </CardBody>
      </Card>



      <Modal Modal isOpen={isModalOpenforCancelParcel} onClose={closeMoalforCancelParcel} toggle={closeMoalforCancelParcel} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeMoalforCancelParcel} style={{
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
            icon={faUserCircle}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Cancel Parcel</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >

          <Card >
            <CardBody>
              <Row>
                <Col>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Reason for Cancel</Label>
                    <Input
                      type="textarea"
                      name="cancelRemarks"
                      id="branchname"

                      className="inputField"
                      onChange={handelCanceldata}

                      value={cancelParceldata.cancelRemarks}
                    />
                  </FormGroup>

                </Col>
              </Row>


              <Row style={{ marginTop: "4%" }}>
                {cancelParceldata.cancelStatus === 'N' && (
                  <Col className="text-center">
                    <Button id="cancel1" onClick={CancelParceldemo} variant="outline-success">
                      <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                      Submit
                    </Button>
                  </Col>
                )}

                {cancelParceldata.cancelStatus === 'Y' && (
                  <Col className="text-center">
                    <Button id="cancel2" style={{ marginRight: 10 }} onClick={removecancelParceldemo} variant="danger">
                      <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                      REMOVE
                    </Button>
                    <Button id="cancel3" onClick={UpdatecancelParceldemo} variant="danger">
                      <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                      UPDATE
                    </Button>
                  </Col>

                )}

              </Row>
            </CardBody>
          </Card>

        </ModalBody>
      </Modal>


      <Modal Modal isOpen={isModalOpenHeavy} onClose={closeMoalforHeavyParcel} toggle={closeMoalforHeavyParcel} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeMoalforHeavyParcel} style={{
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
            icon={faWeightHanging}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Tag Heavy Parcel</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >

          <Row>
            <Col md={4} >
              <FormGroup>
                <Label className="forlabel" for="branchId">Package No*</Label>
                <select
                  id="hold"
                  className="form-control form-select"
                  required
                  name="packageNumber"
                  onChange={handleHeavyParcel}
                >
                  <option value="">Select Package</option>
                  {renderOptions()}
                </select>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Enter Weight(Min: 34 KG)</Label>
                <Input
                  type="text"
                  name="weight"
                  id="branchname"

                  className="inputField"
                  maxLength={30}
                  value={heavyParcel.weight}
                  onChange={handleHeavyParcel}
                />
              </FormGroup>
            </Col>
            <Col md={4} className="text-start" style={{ marginTop: 32 }}>
              <Button
                variant="outline-success"
                onClick={saveHeavydata}
              >
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                Add
              </Button>
            </Col>
          </Row>
          <Row>
            {listofheavydata.length > 0 && (

              <Table rules="all" className="table table-bordered custom-table">
                <thead>
                  <tr className="text-center">
                    <th style={{ background: "skyblue" }} scope="col">
                      Package No
                    </th>
                    <th style={{ background: "skyblue" }} scope="col">
                      Weight (KG)
                    </th>
                    <th style={{ background: "skyblue" }} scope="col">
                      Action
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {listofheavydata.map((data, index) => (
                    <tr key={index} className="text-center">
                      <td>{data.packageNumber}</td>
                      <td>{data.weight}</td>
                      <td >

                        <Button onClick={() => deletedata(data)} variant="outline-danger">
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </Table>
            )}

          </Row>

        </ModalBody>
      </Modal>


      <Modal Modal isOpen={isModalOpenforImposePenalty} onClose={closeMoalforImposePenalty} toggle={closeMoalforImposePenalty} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeMoalforImposePenalty} style={{
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
          /> Impose Penalty</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >

          <Row>
            <Col md={6} >
              <FormGroup>
                <Label className="forlabel" for="branchId">Penalty Amount</Label>
                <Input
                  type="text"
                  name="imposePenaltyAmount"
                  id="branchname"

                  className="inputField"
                  onChange={handlepenaltychange}

                  value={ImposePenaltydata.imposePenaltyAmount}
                />
              </FormGroup>
            </Col>


            <Col md={6} >
              <FormGroup>
                <Label className="forlabel" for="branchId">Reason</Label>
                <Input
                  type="textarea"
                  name="imposePenaltyRemarks"
                  id="branchname"

                  className="inputField"
                  onChange={handlepenaltychange}

                  value={ImposePenaltydata.imposePenaltyRemarks}
                />
              </FormGroup>

            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col className="text-end">
              <Button
                variant="outline-success"
                onClick={getpenaltystatus}
              >
                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                Submit
              </Button>
            </Col>
          </Row>

        </ModalBody>
      </Modal>



      <Modal Modal isOpen={isModalOpenforOverideNSDl} onClose={closeMoalforOverrideNSDL} toggle={closeMoalforOverrideNSDL} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeMoalforOverrideNSDL} style={{
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
            icon={faSquarePen}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Override Parcel Status</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >

          <Row>
            <Col md={6} >
              <FormGroup>
                <Label className="forlabel" for="branchId">Current Parcel Status</Label>
                <Input
                  type="text"
                  name="nsdlStatus"
                  id="branchname"
                  className="inputField"
                  style={{ backgroundColor: '#E0E0E0' }}
                  value={getNSDLStatus}
                />
              </FormGroup>
            </Col>
            <Col md={6} >
              <FormGroup>
                <Label className="forlabel" for="branchId">Reason For Override</Label>
                <Input
                  type="text"
                  name="reasonforOverride"
                  id="branchname"
                  onChange={handleOverrideChange}
                  className="inputField"
                  value={OverideNSDl.reasonforOverride}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>

            <Col md={6} >
              <FormGroup>
                <Label className="forlabel" for="branchId">New Parcel Status </Label>
                <select
                  id="representative"
                  name="parcelStatus"
                  className="form-control form-select"
                  onChange={handleOverrideChange}
                  value={OverideNSDl.parcelStatus}
                >
                  <option value="">Select Status</option>
                  <option value="Allow Export">Allow Export</option>
                  <option value="Let Export">Let Export</option>
                </select>
              </FormGroup>

            </Col>
            <Col md={6} >
              <FormGroup>
                <Label className="forlabel" for="branchId">New File Upload</Label>
                <Input
                  type="file"
                  name="imposePenaltyAmount"
                  id="branchname"
                  className="inputField"
                  onChange={handleFileChange}
                  accept=".jpg, .jpeg, .png, .pdf"
                  required
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


          </Row>
          <Row>
            <Col>
              {OverideNSDl.overrideDocument && (
                type1 === 'app' ? (
                  <button style={{ borderStyle: 'none', background: 'none', color: 'red', padding: '0px' }} onClick={openPdfInNewTab}>
                    {extractFileName(OverideNSDl.overrideDocument)}
                  </button>
                ) : (
                  <button style={{ borderStyle: 'none', background: 'none', color: 'red', padding: '0px' }} onClick={downloadFile}>
                    {extractFileName(OverideNSDl.overrideDocument)}
                  </button>
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
              <Button
                variant="outline-success"
                onClick={getOverideStatus}
                id="override"
              >
                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                Submit
              </Button>
            </Col>
          </Row>

        </ModalBody>
      </Modal>



      <Modal Modal isOpen={isModalOpenforviewhistory} onClose={closeMoalforviewhistory} toggle={closeMoalforviewhistory} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeMoalforviewhistory} style={{
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
            icon={faHistory}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          />Export Transaction History</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <div className="table-responsive">
            <Table className="table table-striped table-hover">
              <thead style={{ backgroundColor: "rgb(226 232 240)" }}>
                <tr className="text-center">
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">#</th>
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">Updated By</th>
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">New Status</th>
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">Old Status</th>
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">Transport Date</th>

                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">remark</th>
                </tr>
              </thead>

              <tbody>
                {ExHistoryList.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td>{index + 1}</td>
                    <td>{item.updatedBy}</td>
                    <td>{item.newStatus}</td>
                    <td>{item.oldStatus}</td>
                    <td>{convertTimestampToDateTime(item.transport_Date)}</td>


                    <td>{item.remark}</td>
                  </tr>
                ))}
              </tbody>


            </Table>

          </div>
        </ModalBody>
      </Modal>


      <Modal Modal isOpen={isModelOpenForConsoleAgent} onClose={closeConsoleModel} toggle={closeConsoleModel} style={{ maxWidth: '1200px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeConsoleModel} style={{
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
          {consoleStatus === 'Handover' && (
            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
              icon={faHandHoldingHand}
              style={{
                marginRight: '8px',
                color: 'black', // Set the color to golden
              }}
            />Handed over to console</h5>
          )

          }


          {consoleStatus === 'Receive' && (
            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
              icon={faHandHoldingHand}
              style={{
                marginRight: '8px',
                color: 'black', // Set the color to golden
              }}
            />Receive from console</h5>
          )

          }

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <div className="container">
            <Row>
              <Col>
                <select

                  className="form-control form-select"
                  id="consoleAgent"
                  name="consoleAgent"
                  value={singleConsole}
                  onChange={handleSingleConsole}

                >
                  <option value="">Select Console</option>
                  {consoleData.map((item, index) => (
                    <option key={index} value={item[0]}>{item[1]}</option>
                  ))

                  }
                </select>

              </Col>
              {consoleStatus === 'Receive' && (
                <Col >
                  <FormGroup>

                    <select
                      id="hold"
                      className="form-control form-select"
                      onChange={(e) => getSingleConsoleRepresentData(e.target.value)}
                      required
                      name="exporter"
                    >
                      <option value="">Select Representative</option>
                      {getrepresentData.map((data, index) => (
                        <option key={index} value={data.representativeId}>
                          {data.firstName + " " + data.lastName}
                        </option>
                      ))}

                    </select>
                  </FormGroup>
                </Col>
              )

              }
              <Col>
                <Col >
                  <Button
                    variant="outline-success"
                    onClick={() => checkConsoleData(singleConsole)}
                    id="override"
                  >
                    <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                    Submit
                  </Button>
                </Col>
              </Col>
            </Row>
            {selectedConsoleData.length > 0 && (
              <>
                <Row style={{ marginTop: 30 }}>

                  <div className="table-responsive custom-table-container table-section">
                    <Table className="table table-striped table-hover">
                      <thead style={{ backgroundColor: "rgb(226 232 240)" }}>
                        <tr className="text-center">
                          <th style={{ backgroundColor: '#BADDDA', paddingBottom: 3 }} scope="col">
                            <input style={{ width: 17, height: 22, marginTop: 3, paddingBottom: 0 }} type="checkbox" onChange={handleSelectAll2}
                              checked={selectAll2} />
                          </th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Sr No.</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">SB NO.</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">SB Date</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">ER No</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Exporter</th>

                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Packages</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Gross Weight</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">DGDC Status</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Parcel Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {selectedConsoleData.map((item, index) => (
                          <tr key={index} className="text-center">
                            <td><input style={{ width: 17, height: 22 }} onChange={() => handleCheckboxChange3(item)}
                              checked={selectedRows2.includes(item)} type="checkbox" /></td>
                            <td>{index + 1}</td>
                            <td>{item.sbNo}</td>
                            <td>{formatDateTime(item.sbDate)}</td>
                            <td>{item.erNo}</td>
                            <td>{getpartyId[item.nameOfExporter]}</td>
                            <td>{item.noOfPackages}</td>
                            <td>{item.grossWeight}</td>
                            <td>{item.dgdcStatus}</td>
                            <td>{item.parcelStatus}</td>
                          </tr>
                        ))}
                      </tbody>


                    </Table>

                  </div>


                </Row>
                <hr />
                <div >
                  <Row>
                    <Col md={3}>

                      <span style={{ marginLeft: 20 }}><b>Total SB No : {selectedConsoleData.map((item) => item.sbNo).length}</b></span>

                    </Col>
                    <Col className="text-center" md={3}>
                      <span style={{ marginLeft: 20 }}><b>Selected SB No : {selectedRows2.length}</b></span>

                    </Col>
                    <Col className="text-center" md={3}>
                      <span style={{ marginLeft: 20 }}><b>Selected Packages : {selectedRows2.reduce((total, item) => total + item.noOfPackages, 0)}</b></span>

                    </Col>
                    <Col md={3}>
                      <span style={{ float: 'inline-end', marginRight: 20 }} className="text-end"><b>Total No. Of Packages : {selectedConsoleData.reduce((total, item) => total + item.noOfPackages, 0)}</b></span>

                    </Col>
                  </Row>

                </div>
                <hr />

                <Card >
                  <CardBody>
                    <Row>
                      <Col md="3" className="d-flex justify-content-center align-items-center">
                        {/* Centered image */}
                        {im1 === 'Y' ? (
                          <img src={imageData1.url} className="image-column1 rounded-image2" />
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
                                Select Console
                              </Label>
                              <Input
                                type="text"
                                name="imposePenaltyAmount"
                                id="branchname"
                                className="inputField"
                                value={consoleId[singleConsole]}
                                readOnly
                                style={{ backgroundColor: '#E0E0E0' }}
                                required
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
                                value={selectRepresentdata}
                                onChange={(e) => getSingleConsoleRepresentData(e.target.value)}
                                required
                                disabled={consoleStatus === 'Receive'}
                                name="exporter"
                              >
                                <option value="">Select Representative</option>
                                {getrepresentData.map((data, index) => (
                                  <option key={index} value={data.representativeId}>
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
                                  value={getSingleConsole.mobile}
                                  style={{ backgroundColor: '#E0E0E0' }}
                                  readOnly
                                />

                                <Button
                                  style={{ borderRadius: '0' }}
                                  variant="outline-success"
                                  onClick={checkotp}
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
                                onChange={handleOtp}
                                className="inputField"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {consoleStatus === 'Handover' && (
                      <Row className="text-center">
                        <div>
                          <span style={{ marginRight: 25 }}>
                            <input
                              type="radio"
                              name="options"
                              value="N"

                              checked={selectedOption === 'N'}
                              onChange={handleRadioChange}
                            />
                            <label style={{ marginBottom: 15 }}><b>New Trip</b></label>
                          </span>
                          <span style={{ marginRight: 20 }}>
                            <input
                              type="radio"
                              name="options"
                              value="Y"

                              checked={selectedOption === 'Y'}
                              onChange={handleRadioChange}
                            />
                            <label><b>Existing Trip</b></label>
                          </span >
                          {selectedOption === 'Y' && (
                            <span>
                              <select onChange={(e) => setTpstatus(e.target.value)} value={tpstatus}>
                                <option value="N">Select an option</option>
                                {todaytp.map((option, index) => (
                                  <option key={index} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </span>
                          )}
                        </div>
                      </Row>
                    )

                    }
                    <Row style={{ marginTop: "4%" }}>
                      <Col className="text-center">
                        <Button id="consoleSubmit" onClick={handleConsoleSubmit} variant="outline-success">
                          <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

              </>
            )}
          </div>
        </ModalBody >
      </Modal >

      <Modal Modal isOpen={isModelOpenForAirline} onClose={closeModelforAirline} toggle={closeModelforAirline} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeModelforAirline} style={{
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
            icon={faArrowTurnRight}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Handover to Airline</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>

          <Row>
            <Col>
              <select

                className="form-control form-select"
                id="consoleAgent"
                name="consoleAgent"
                value={selectAirline}
                onChange={(e) => setSelectAirline(e.target.value)}

              >
                <option value="N">Select Airline</option>
                {getAllFlight.map((item, index) => (
                  <option key={index} value={item[0]}>{item[1]}</option>
                ))

                }
              </select>

            </Col>
            <Col>
              <Col >
                <Button
                  variant="outline-success"
                  onClick={() => getExportAirlinewiselist(selectAirline)}
                  id="override"
                >
                  <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                  Submit
                </Button>
              </Col>
            </Col>
          </Row>
          {getexportdatabyairline.length > 0 && (


            <span>
              <Row>
                <div className="table-responsive custom-table-container table-section mt-4">
                  <Table rules="all" responsive className="table table-bordered custom-table">
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          <input type="checkbox" style={{ width: 17, height: 22, paddingBottom: 0 }} onChange={handleSelectAll}
                            checked={selectAll} />
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          Sr No.
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          SER No.
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          Airway Bill No.
                        </th>

                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          SB No.
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          Port Of Destination
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          Exporter
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          NOP
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getexportdatabyairline.map((item, index) => (

                        <tr key={index}>
                          <td><input type="checkbox" style={{ width: 17, height: 22, }} onChange={() => handleCheckboxChange(item)}
                            checked={selectedRows.includes(item)} /></td>
                          <td>{index + 1}</td>
                          <td>{item[0]}</td>
                          <td>{item[1]}</td>
                          <td>{item[2]}</td>
                          <td>{item[3]}</td>
                          <td>{getpartyId[item[4]]}</td>
                          <td>{item[5]}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="text-end" colSpan={7}>Selected Packages : </td>
                        <td>{selectedRows.reduce((total, item) => total + item[5], 0)}</td>
                      </tr>
                      <tr>

                        <td className="text-end" colSpan={7}>Total No of packages (Summary):</td>
                        <td>{sumofpkg}</td>
                      </tr>
                      <tr>

                        <td className="text-end" colSpan={7}>Total No of SB (Summary):</td>
                        <td>{sumofSb}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Row>
              <Row>
                <Col className="text-center">
                  <Button id="airlineSubmit" onClick={handleAirline} variant="outline-success">
                    <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                    Submit
                  </Button>
                </Col>
              </Row>
            </span>
          )}

        </ModalBody>
      </Modal>



      <Modal Modal isOpen={isModelOpenForRedeposit} onClose={closeModelforRedeposit} toggle={closeModelforRedeposit} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeModelforRedeposit} style={{
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
            icon={faArrowCircleLeft}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Redeposit</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>

          <Row>
            <Col>
              <label className="forlabel" htmlFor="startDate">
                Select Airline Date
              </label>
              <DatePicker
                selected={selectAirlineDate}
                onChange={handleAirlineDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control border-right-0 inputField"
                customInput={<input style={{ width: '100%' }} />}
                wrapperClassName="custom-react-datepicker-wrapper"
              />
            </Col>

            <Col>
              <label className="forlabel" htmlFor="startDate">
                Select Airline
              </label>
              <select

                className="form-control form-select"
                id="consoleAgent"
                name="consoleAgent"
                value={selectAirline}
                onChange={(e) => setSelectAirline(e.target.value)}

              >
                <option value="N">Select Airline</option>
                {getAllFlight.map((item, index) => (
                  <option key={index} value={item[0]}>{item[1]}</option>
                ))

                }
              </select>

            </Col>
            <Col>
              <Col >

                <Button
                  variant="outline-success"
                  style={{ marginTop: 23 }}
                  onClick={() => getExportAirlinewiselistForRedeposit(selectAirlineDate, selectAirline)}
                  id="override"
                >
                  <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                  Submit
                </Button>
              </Col>
            </Col>
          </Row>
          {getexportdatabyairline.length > 0 && (


            <span>
              <Row>
                <div className="table-responsive custom-table-container table-section mt-4">
                  <Table rules="all" responsive className="table table-bordered custom-table">
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          <input type="checkbox" style={{ width: 17, height: 22, paddingBottom: 0 }} onChange={handleSelectAll}
                            checked={selectAll} />
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          Sr No.
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          SER No.
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          Airway Bill No.
                        </th>

                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          SB No.
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          Port Of Destination
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          Exporter
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          NOP
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getexportdatabyairline.map((item, index) => (

                        <tr key={index}>
                          <td><input type="checkbox" style={{ width: 17, height: 22, }} onChange={() => handleCheckboxChange(item)}
                            checked={selectedRows.includes(item)} /></td>
                          <td>{index + 1}</td>
                          <td>{item[0]}</td>
                          <td>{item[1]}</td>
                          <td>{item[2]}</td>
                          <td>{item[3]}</td>
                          <td>{getpartyId[item[4]]}</td>
                          <td>{item[5]}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="text-end" colSpan={7}>Selected Packages : </td>
                        <td>{selectedRows.reduce((total, item) => total + item[5], 0)}</td>
                      </tr>
                      <tr>

                        <td className="text-end" colSpan={7}>Total No of packages (Summary):</td>
                        <td>{sumofpkg}</td>
                      </tr>
                      <tr>

                        <td className="text-end" colSpan={7}>Total No of SB (Summary):</td>
                        <td>{sumofSb}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <label className="forlabel" htmlFor="Heavy">
                      Remark
                    </label>
                    <input
                      type="textarea"
                      className="form-control"
                      id="remarks"
                      placeholder="Enter remarks"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>




                  <FormGroup>
                    <Label className="forlabel">Select File</Label>

                    <Input type="file" name="filepath"
                      id='file'
                      className="form-control"
                      onChange={handleFileChangeRedeposite}
                      accept=".jpg, .jpeg, .png, .pdf"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <Button id="redepositSubmit" onClick={handleRedeposit} variant="outline-success">
                    <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                    Submit
                  </Button>
                </Col>
              </Row>
            </span>
          )}

        </ModalBody>
      </Modal>

      <Modal Modal isOpen={isModalOpenForSingleCartingAgent} onClose={closeModelForSingleCartingAgent} toggle={closeModelForSingleCartingAgent} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeModelForSingleCartingAgent} style={{
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
          /> Handover to Console</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>

          <Card>
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
                    <Col md={6} >
                      <FormGroup>
                        <Label className="forlabel" for="branchId">Select Console</Label>
                        <input
                          type="textarea"
                          className="form-control"
                          id="remarks"
                          readOnly
                          style={{ backgroundColor: '#E0E0E0' }}
                          placeholder="Enter remarks"
                          value={consoleId[getHandoverConsoleData.consoleAgent]}

                        />

                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="search" className="forlabel">Select Representative</Label>
                        <select
                          id="hold"
                          className="form-control form-select"
                          onChange={(e) => getSingleConsoleRepresentData1(e.target.value)}
                          required
                          name="exporter"

                        >
                          <option value="" >Select Representative</option>
                          {getrepresentData.map((data, index) => (
                            <option key={index} value={data.representativeId}>
                              {data.firstName + " " + data.lastName}
                            </option>
                          ))}

                        </select>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
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
                            value={getSingleConsole1.mobile}
                          />


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

                    <Col md={6}>
                      <FormGroup>
                        <Label className="forlabel" for="branchId">Enter OTP</Label>
                        <Input
                          type="text"
                          name="importType"
                          id="branchname"
                          onChange={handleOtp}
                          className="inputField"


                        />

                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="text-center">
                <div>
                  <span style={{ marginRight: 25 }}>
                    <input
                      type="radio"
                      name="options"
                      value="N"

                      checked={selectedOption === 'N'}
                      onChange={handleRadioChange}
                    />
                    <label style={{ marginBottom: 15 }}><b>New Trip</b></label>
                  </span>
                  <span style={{ marginRight: 20 }}>
                    <input
                      type="radio"
                      name="options"
                      value="Y"

                      checked={selectedOption === 'Y'}
                      onChange={handleRadioChange}
                    />
                    <label><b>Existing Trip</b></label>
                  </span >
                  {selectedOption === 'Y' && (
                    <span>
                      <select onChange={(e) => setTpstatus(e.target.value)} value={tpstatus}>
                        <option value="N">Select an option</option>
                        {todaytp.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </span>
                  )}
                </div>
              </Row>

            </CardBody>
          </Card>
          <Row style={{ marginTop: "4%" }}>
            <Col className="text-center">
              <Button id="singleConsoleSubmit" onClick={saveSingleCartingAgentData} variant="outline-primary">
                <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                SUBMIT
              </Button>
            </Col>
          </Row>

        </ModalBody>
      </Modal>



      <Modal Modal isOpen={isModalOpenforCustomTp} onClose={closeModalforcustomtp} toggle={closeModalforcustomtp} style={{ maxWidth: '1200px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeModalforcustomtp} style={{
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
            icon={faRefresh}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Update Custom TP Number</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>

          <Card>
            <CardBody>

              <Row>
                <Col>
                  <select

                    className="form-control form-select"
                    id="selectConsoleforCustomTP"
                    name="selectConsoleforCustomTP"
                    value={selectConsoleforCustomTP}
                    onChange={(e) => setselectConsoleforCustomTP(e.target.value)}

                  >
                    <option value="">Select Console</option>
                    {consoleData.map((item, index) => (
                      <option key={index} value={item[0]}>{item[1]}</option>
                    ))

                    }
                  </select>

                </Col>

                <Col>
                  <Col >
                    <Button
                      variant="outline-success"
                      onClick={() => getCustomTPData(selectConsoleforCustomTP)}
                      id="override"
                    >
                      <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                      Submit
                    </Button>
                  </Col>
                </Col>
              </Row>
              {getExportdataForCTP.length > 0 && (
                <>
                  <hr />
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                      <label className="forlabel" htmlFor="startDate">
                       Custom TP No.
                      </label>
                        <Input
                          type="text"
                          name="importType"
                          id="branchname"
                          value={customTP}
                          onChange={(e)=>setcustomTP(e.target.value)}
                          className="inputField"


                        />

                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <label className="forlabel" htmlFor="startDate">
                       Custom TP Date
                      </label>
                      <DatePicker
                        selected={customTPDate}
                        onChange={handleCustomTPDateChange}
                        dateFormat="dd/MM/yyyy"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: '100%' }} />}
                        wrapperClassName="custom-react-datepicker-wrapper"
                      />
                    </Col>
                    <Col md={4}>
                  
                      <Button id="singleConsoleSubmit" onClick={saveCustomTP} style={{marginTop:22}} variant="outline-primary">
                        <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                        SUBMIT
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <div className=" mt-1 table-responsive">
                      <Table className="table table-bordered text-center custom-table mt-3">
                        <thead>
                          <tr>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              <input type="checkbox" style={{ width: 17, height: 22, paddingBottom: 0 }} onChange={handleSelectAll1}
                                checked={selectAll1} />
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              SB No.
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              MAWB
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              HAWB
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              ER No
                            </th>

                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              Exporter
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              Pkgs
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              Gross Wt
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              Parcel Status
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              DGDC Status
                            </th>

                          </tr>
                        </thead>
                        <tbody>
                          {getExportdataForCTP.map((item, index) => (
                            <tr key={index}>
                              <td><input type="checkbox" style={{ width: 17, height: 22, }} onChange={() => handleCheckboxChange1(item)}
                                checked={selectedRows1.includes(item)} /></td>
                              <td>{item.sbNo}</td>
                              <td>{item.airwayBillNo}</td>
                              <td>{item.hawb}</td>
                              <td>{item.erNo}</td>
                              <td>{item.nameOfExporter}</td>
                              <td>{item.noOfPackages}</td>
                              <td>{item.grossWeight}</td>
                              <td>{item.dgdcStatus}</td>
                              <td>{item.parcelStatus}</td>
                            </tr>
                          ))

                          }
                        </tbody>
                      </Table>
                    </div>
                  </Row>
                </>
              )}

            </CardBody>
          </Card>
        </ModalBody>
      </Modal>








      <Modal Modal isOpen={isModalOpenforCustomPctm} onClose={closeModalforCustomPctm} toggle={closeModalforCustomPctm} style={{ maxWidth: '1200px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeModalforCustomPctm} style={{
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
            icon={faRefresh}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Update Custom PCTM Number</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>

          <Card>
            <CardBody>

              <Row>
                <Col>
                  <select

                    className="form-control form-select"
                    id="selectConsoleforCustomTP"
                    name="selectConsoleforCustomTP"
                    value={selectConsoleforCustomTP}
                    onChange={(e) => setselectConsoleforCustomTP(e.target.value)}

                  >
                    <option value="">Select Console</option>
                    {consoleData.map((item, index) => (
                      <option key={index} value={item[0]}>{item[1]}</option>
                    ))

                    }
                  </select>

                </Col>

                <Col>
                  <Col >
                    <Button
                      variant="outline-success"
                      onClick={() => getCustomTPData(selectConsoleforCustomTP)}
                      id="override"
                    >
                      <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                      Submit
                    </Button>
                  </Col>
                </Col>
              </Row>
              {getExportdataForCTP.length > 0 && (
                <>
                  <hr />
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                      <label className="forlabel" htmlFor="startDate">
                       Custom PCTM No.
                      </label>
                        <Input
                          type="text"
                          name="importType"
                          id="branchname"
                          value={customTP}
                          onChange={(e)=>setcustomTP(e.target.value)}
                          className="inputField"


                        />

                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <label className="forlabel" htmlFor="startDate">
                       Custom PCTM Date
                      </label>
                      <DatePicker
                        selected={customTPDate}
                        onChange={handleCustomTPDateChange}
                        dateFormat="dd/MM/yyyy"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: '100%' }} />}
                        wrapperClassName="custom-react-datepicker-wrapper"
                      />
                    </Col>
                    <Col md={4}>
                  
                      <Button id="singleConsoleSubmit" onClick={saveCustomTP} style={{marginTop:22}} variant="outline-primary">
                        <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                        SUBMIT
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <div className=" mt-1 table-responsive">
                      <Table className="table table-bordered text-center custom-table mt-3">
                        <thead>
                          <tr>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              <input type="checkbox" style={{ width: 17, height: 22, paddingBottom: 0 }} onChange={handleSelectAll1}
                                checked={selectAll1} />
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              SB No.
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              MAWB
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              HAWB
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              ER No
                            </th>

                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              Exporter
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              Pkgs
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              Gross Wt
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              Parcel Status
                            </th>
                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                              DGDC Status
                            </th>

                          </tr>
                        </thead>
                        <tbody>
                          {getExportdataForCTP.map((item, index) => (
                            <tr key={index}>
                              <td><input type="checkbox" style={{ width: 17, height: 22, }} onChange={() => handleCheckboxChange1(item)}
                                checked={selectedRows1.includes(item)} /></td>
                              <td>{item.sbNo}</td>
                              <td>{item.airwayBillNo}</td>
                              <td>{item.hawb}</td>
                              <td>{item.erNo}</td>
                              <td>{item.nameOfExporter}</td>
                              <td>{item.noOfPackages}</td>
                              <td>{item.grossWeight}</td>
                              <td>{item.dgdcStatus}</td>
                              <td>{item.parcelStatus}</td>
                            </tr>
                          ))

                          }
                        </tbody>
                      </Table>
                    </div>
                  </Row>
                </>
              )}

            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </div >
  )
}

