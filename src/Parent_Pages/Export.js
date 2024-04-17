import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
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
import { faArrowCircleLeft, faArrowCircleRight, faArrowTurnRight, faAtom, faBolt, faCity, faCross, faExternalLink, faExternalLinkAlt, faGavel, faGear, faHand, faHandFist, faHandHoldingHand, faHandsHolding, faHistory, faIdBadge, faIdCardAlt, faIdCardClip, faPenClip, faPenFancy, faPencil, faPerson, faPersonBooth, faPlaneDeparture, faPlus, faSearch, faSquarePen, faTentArrowTurnLeft, faTruckArrowRight, faUpload, faUserCircle, faWeightHanging, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faAd,faBan, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from "react-toastify";
import "../Components/Style.css";
import { Pagination } from "react-bootstrap";
import Select from 'react-select';
export default function Export() {
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


  const commonSingleExport = (req, sb, flag) => {
    axios.get(`http://${ipaddress}export/bysbsbreq/${companyid}/${branchId}/${req}/${sb}`)
      .then((response) => {
        if (flag === 'view') {
          setViewAlldata(response.data);
        }
        if (flag === 'carting') {
          setCartingdata(response.data);
        }
        if (flag === 'updatensdl') {
          setOverideNSDl(response.data);
        }
        if (flag === 'updateairway') {
          setUpdateAirline(response.data);
        }
        if (flag === 'epcopy') {
          setEPdata(response.data);
        }
        if (flag === 'heavy') {
          setHeavyParcelData(response.data);
        }
        if (flag === 'edit') {
          setEditsavedata(response.data);
        }
        if (flag === 'personalinfo') {
          setexportpcdata(response.data);
        }
        if (flag === 'impose') {
          setImposePenaltydata(response.data);
        }
        if (flag === 'backtotown') {
          setBacktotowndata(response.data);
        }
        if (flag === 'cancelremarks') {
          setcancelParceldata(response.data);
        }
        if (flag === 'history') {
          setHistorydata(response.data);
        }
      })


  }




  // Existing TP and PCTM






  const reverseToStock = async (sbRequestId, sbNo, serNo, exporter, dgdcStatus) => {

    const result = await Swal.fire({
      title: 'Are you sure to request for cancelling todays Trip?',
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

        const params =
        {
          cid: companyid,
          bid: branchId,
          user: userId,
          serNo: serNo,
          request_id: sbRequestId,
          sbNo: sbNo,
          exporter: exporter,
          dgdcStatus: dgdcStatus

        }


        const response = await axios.get(`http://${ipaddress}export/reverseToStock`, { params });


        if (response.data === "Parcel is not applicable for Reverse to Stock") {
          toast.error(response.data, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            style: { width: `30vw` },
          });

        } else {
          // Success case
          toast.success(`${response.data}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            style: { width: `28vw` },
          });

        }
        fetchItemList();

      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 800,
        });
      }
    }
  };





  const closeExistingModel = () => {
    setExistingModel(false);
    setexistingpctmNo('');
    setexistingtp('');
    setExistingPCTMs([]);
    setExistingTPs([]);
    setModalData({
      sbRequestId: "",
      sbNo: "",
      serNo: "",
      exporter: "",
      dgdcStatus: "",
      airlineCode: ""
    });
    setErrors({});
    fetchItemList();

  };

  const [ExistingPCTMs, setExistingPCTMs] = useState([]);
  const [existingpctmNo, setexistingpctmNo] = useState('');
  const [ExistingTPs, setExistingTPs] = useState([]);
  const [existingtp, setexistingtp] = useState('');


  const [modalData, setModalData] = useState({
    sbRequestId: "",
    sbNo: "",
    serNo: "",
    exporter: "",
    dgdcStatus: "",
    airlineCode: ""
  });
  const [errors, setErrors] = useState({});
  const [existingModel, setExistingModel] = useState(false);
  const addToExistingTrip = async (sbRequestId, sbNo, serNo, exporter, dgdcStatus, airlineCode) => {


    const data = {
      sbRequestId,
      sbNo,
      serNo,
      exporter,
      dgdcStatus,
      airlineCode
    };
    setModalData(data);
    setExistingModel(true);

    const params =
    {
      cid: companyid,
      bid: branchId
    }

    const response = await axios.get(`http://${ipaddress}export/addToExistingTpGetTpNo`, { params });

    const options = response.data.map(value => ({ label: value, value: value }));
    setExistingTPs(options);


  };


  const handleExistingPCTMChange = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setexistingpctmNo('');
    } else {
      setexistingpctmNo(selectedOption);
    }

  };

  const handleExistingtpChange = async (selectedOption, { action }) => {
    try {
      if (action === 'clear') {
        setexistingtp('');
        setexistingpctmNo('');
        setExistingPCTMs([]);
      } else {
        setexistingtp(selectedOption);
        const params = {
          cid: companyid,
          bid: branchId,
          tpNo: selectedOption.value,
          airlineCode: modalData.airlineCode
        };

        const response = await axios.get(`http://${ipaddress}export/addToExistingPCTMGet`, { params });
        const options = response.data.map(value => ({ label: value, value: value }));

        setExistingPCTMs(options);
      }
    } catch (error) {
      toast.error("Error fetching existing PCTMs", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        style: { width: `28vw` },
      });
    }
  };



  const upadateAddtoExistingTp = async () => {

    const newErrors = {};

    if (!existingtp) {
      newErrors['existingtp'] = 'Please Select existingtp';
    }

    if (!existingpctmNo) {
      newErrors['existingpctmNo'] = 'Please Select existingpctmNo';
    }

    setErrors(newErrors);
    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      console.log("Errors ");
      console.log(newErrors);
      return;
    }

    try {
      // alert("Updated");
      const params = {
        cid: companyid,
        bid: branchId,
        tpNo: existingtp.value,
        pctmNo: existingpctmNo.value,
        serNo: modalData.serNo,
        sbNo: modalData.sbNo,
        request_id: modalData.sbRequestId,
        user: userId,
        exporter: modalData.exporter
      };
      const response = await axios.get(`http://${ipaddress}export/updateFinalPctmAndTpNoExport`, { params });

      if (response.data === 1) {
        toast.success(`Parcel Added to the Trip : ${existingtp.value} and pctm No : ${existingpctmNo.value}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          style: { width: `38vw` },
        });

        closeExistingModel();
      } else {
        toast.error("Error adding parcel to the trip", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          style: { width: `28vw` },
        });
      }

      console.log("Response : " + response.data);
    } catch (error) {
      console.error("Error:", error);
      // Handle any network or other errors here
      toast.error("Error adding parcel to the trip", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        style: { width: `28vw` },
      });
    }
  };










































  const [showModal, setShowModal] = useState(false);

  const [id, setID] = useState("");

  const [search, setSearch] = useState("");

  const currentDate = new Date();
  const [items2, setItems2] = useState([]);
  // Function to format the date as "dd-mm-yyyy"
  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear().toString();

    return `${year}-${month}-${day}`;
  }

  const formattedDate = formatDate(currentDate);

  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);
  const [hold, setHold] = useState("");

  const [personalCarriage, setPersonalCarriage] = useState("");
  const [Heavy, setHeavy] = useState("");
  const [specialCarting, setSpecialCarting] = useState("");

  const [provisional, setProvisional] = useState("");
  const [dgdcStatus, setDgdcStatus] = useState("");

  const [selectedData, setSelectedData] = useState(null);
  const reactPageName = "Export";

  const [representative_Id, setRepresentative_Id] = useState("");

  const [items, setItems] = useState([]);

  const fetchItemList = () => {
    search1(searchFilters1);
    // axios
    //   .get(`http://${ipaddress}export/listSBTransaction1/${companyid}/${branchId}`)
    //   .then((response) => {
    //     setItems(response.data);

    //   })
    //   .catch((error) => {
    //   });
  };




  useEffect(() => {
    search1(searchFilters1);
  }, [0]);

  // Fetch the list of items when the component mounts
  // useEffect(() => {
  //   fetchItemList();
  // }, [fetchItemList]);



  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // setSearch("A");
  const handleSearch = () => {

  };
  // const [filteredItems, setFilteredItems] = useState([]);

  const handleClear = () => {
    setSearch("new export");
    // setFilteredItems([]); // Clear the filteredItems
  };



  const filteredItems = items.filter((item) =>
    item.sbRequestId.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (item) => {
    navigate("/parent/SBTransaction", { state: { selectedItem: item } });
  };

  const [exHistoryList, setExHistoryList] = useState([]);



  const handleDelete = (item) => {
    axios
      .post(`http://${ipaddress}export/delete`, item, {
        headers: {
          "React-Page-Name": reactPageName,
        },
      })
      .then((response) => {
        toast.success("Item deleted successfully", { position: "top-center" });

        fetchItemList();
      })
      .catch((error) => {

        toast.error("error", { position: "top-center" });
        // Handle any errors that occurred during the request
      });
  };

  // Input fields for the modal

  const handleOptionButtonClick = (option) => {
    if (option === "add") {
      navigate("/parent/SBTransaction", { state: { selectedItem: null } });
    }
  };

  const [fetchedData, setFetchedData] = useState([]); // Step 1: State variable for fetched data

  const handleShow = (comp, branch) => {
    setShowModal(true);
    getHandoverdata();
    getHandoverdata1();
    CartingDataa();
    const url = `http://${ipaddress}export/filtered/${comp}/${branch}`;

    // Make a GET request using fetch
    fetch(url)
      .then((response) => {
        // Check if the response status is OK (status code 200)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Parse the response JSON and store it in a constant
        return response.json();
      })
      .then((data) => {
        setFetchedData(data); // Step 2: Update state with fetched data

      })
      .catch((error) => {
        // Handle errors, e.g., print the error in the console
      });


  };

  const sbCount = fetchedData.filter(
    (item) => item.sbNo !== null && item.sbNo !== ""
  ).length;

  const noOfPackages = fetchedData.reduce((total, item) => {
    if (item.noOfPackages !== null && !isNaN(item.noOfPackages)) {
      return total + parseInt(item.noOfPackages, 10);
    }
    return total;
  }, 0);



  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (event, item) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item)
      );
    }
  };
  const noOfSelected = selectedItems.length;

  const [otp, setOTP] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [reprentativeArray, setRepresentativeArray] = useState([]);
  const [cartingAgentArray, setCartingAgentArray] = useState([]);
  const [selectedCartingAgent, setSelectedCartingAgent] = useState("");
  const [selectedRepresentative, setSelectedRepresentative] = useState("");

  useEffect(() => {
    // Define the URL
    const url = `http://${ipaddress}representive/${companyid}/${branchId}/getAllCarting`;
    // Fetch the data and update the state
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCartingAgentArray(data); // Update state with fetched data

      })
      .catch((error) => {
      });

    // Optionally, setShowModal(true) if you want to show the modal immediately
  }, [companyid, branchId]);
  // Add comp and branch as dependencies

  const handleGetRepresentative = () => {
    // Define the URL
    const url = `http://${ipaddress}representive/${companyid}/${branchId}/${selectedCartingAgent}/getAllRepresentive`;

    // Fetch the data and update the state
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRepresentativeArray(data);
      })
      .catch((error) => {
      });
  };

  // This useEffect will be triggered whenever companyid, branchId, or selectedCartingAgent changes
  useEffect(() => {
    handleGetRepresentative();
  }, [companyid, branchId, selectedCartingAgent]);

  const handleRepresentativeChange = (e) => {
    const selectedValue = e.target.value;

    setSelectedRepresentative(selectedValue);
    const selectedRepresentativeObj = reprentativeArray.find(
      (representative) => representative.representativeName === selectedValue
    );

    // Set the mobileNo to the selected representative's name
    if (selectedRepresentativeObj) {
      setMobileNo(selectedRepresentativeObj.mobileNo);
      setRepresentative_Id(selectedRepresentativeObj.partyRepresentativeId);
    } else {
      setMobileNo(""); // Handle the case when no representative is selected
    }
  };
  const handleOtpChange = (e) => {
    setOTP(e.target.value);
  };

  const handleUpadateAll = () => {
    if (selectedCartingAgent === "" && selectedRepresentative === "") {
      toast.error("Please select a Carting Agent and a Representative.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (selectedRepresentative === "") {
      // Display a toast notification for Representative selection error
      toast.error("Please select a Representative.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (otp === "1000") {
        axios
          .post(
            `http://${ipaddress}export/updateExportC_A/${selectedCartingAgent}/${representative_Id}`,
            selectedItems
          )
          .then((response) => {
            toast.success("Carting Agent & RespectiveId successful! ", {
              position: toast.POSITION.TOP_CENTER,
            });
          })
          .catch((error) => {
            toast.error("An error occurred while making the API call.", {
              position: toast.POSITION.TOP_CENTER,
            });
            setShowModal(false);
          });
      } else {
        toast.error("OTP does not match!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };
  const [JarListDtlDGDC, setJarListDtlDGDC] = useState([]);

  useEffect(() => {
    getlist();
  }, []);

  const getlist = () => {
    axios
      .get(`http://${ipaddress}jardetail/dgdcstatus/${companyid}`)
      .then((response) => {
        setJarListDtlDGDC(response.data); // Store the list in the state
      })
      .catch((error) => {
      });
  };

  const handleDgdcStatusChange = (e) => {
    setDgdcStatus(e.target.value);
  };


  const [searchFilters, setSearchFilters] = useState({
    serNo: '',
    startDate: new Date(),
    endDate: new Date(),
    dgdcStatus: '',
  });
  const [filteredData, setFilteredData] = useState([]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };


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


  const [isModalOpenViewall, setIsModalOpenViewall] = useState(false);
  const [viewAlldata, setViewAlldata] = useState([]);
  const openModalforViewall = (req, sb) => {
    setIsModalOpenViewall(true);
    commonSingleExport(req, sb, 'view');
  };

  const closeMoalforviewall = () => {
    setIsModalOpenViewall(false);
    setViewAlldata([]);
  }

  const [holddata, setHolddata] = useState([]);

  const fetchHoldData = async (cid, bid, sbRequestId, sbNo) => {


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
        const response = await axios.get(`http://${ipaddress}export/holdStatus/${cid}/${bid}/${sbRequestId}/${sbNo}`);
        fetchItemList();

      } catch (error) {
      }
    }
  };


  const fetchUnHoldData = async (cid, bid, sbRequestId, sbNo) => {


    const result = await Swal.fire({
      title: 'Are you sure to request for Un-hold for this parcel?',
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
        const response = await axios.get(`http://${ipaddress}export/unholdStatus/${cid}/${bid}/${sbRequestId}/${sbNo}`);
        fetchItemList();
      } catch (error) {
      }
    }
  };



  const fetchSpecialData = async (cid, bid, sbRequestId, sbNo) => {


    const result = await Swal.fire({
      title: 'Are you sure to request for special carting for this parcel?',
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
        const response = await axios.get(`http://${ipaddress}export/specialStatus/${cid}/${bid}/${sbRequestId}/${sbNo}`);
        fetchItemList();
      } catch (error) {
      }
    }
  };


  const fetchCancelSpecialData = async (cid, bid, sbRequestId, sbNo) => {


    const result = await Swal.fire({
      title: 'Are you sure to request for cancel special carting for this parcel?',
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
        const response = await axios.get(`http://${ipaddress}export/cancelSpecialStatus/${cid}/${bid}/${sbRequestId}/${sbNo}`);
        fetchItemList();
      } catch (error) {
      }
    }
  };



  const fetchPCData = async (cid, bid, sbRequestId, sbNo) => {


    const result = await Swal.fire({
      title: 'Are you sure to request for personal carriage for this parcel?',
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
        const response = await axios.get(`http://${ipaddress}export/pcStatus/${cid}/${bid}/${sbRequestId}/${sbNo}`);
        fetchItemList();
      } catch (error) {
      }
    }
  };

  const fetchProvisionalSER = async (cid, bid, sbRequestId, sbNo, id) => {


    const result = await Swal.fire({
      title: 'Are you want to generate provisional ser?',
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
        const response = await axios.get(`http://${ipaddress}export/provisional/${cid}/${bid}/${sbRequestId}/${sbNo}/${id}`);
        fetchItemList();
      } catch (error) {
      }
    }
  };


  const fetchCancelPCData = async (cid, bid, sbRequestId, sbNo) => {


    const result = await Swal.fire({
      title: 'Are you sure to request for cancel personal carriage for this parcel?',
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
        const response = await axios.get(`http://${ipaddress}export/cancelPCStatus/${cid}/${bid}/${sbRequestId}/${sbNo}`);
        fetchItemList();
      } catch (error) {
      }
    }
  };



  const [isModalOpenHeavy, setIsModalOpenHeavy] = useState(false);
  const [heavyParceldata, setHeavyParcelData] = useState([]);
  const openModalforHeavyParcel = (req, sb) => {
    setIsModalOpenHeavy(true);
    commonSingleExport(req, sb, 'heavy')
    //   setHeavyParcelData(data);
  };

  const closeMoalforHeavyParcel = () => {
    setIsModalOpenHeavy(false);
    setHeavyParcelData([]);
    setHeavyParcel([]);
    setListofheavydata([]);
  }


  const [isModalOpenforImposePenalty, setIsModalOpenforImposePenalty] = useState(false);
  const [ImposePenaltydata, setImposePenaltydata] = useState([]);
  const openModalforImposePenalty = (req, sb) => {
    setIsModalOpenforImposePenalty(true);
    // setImposePenaltydata(data);
    commonSingleExport(req, sb, 'impose');
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
      .post(`http://${ipaddress}export/penalty`, ImposePenaltydata)
      .then((response) => {
        toast.success('Penalty Isseued Successfully..', {
          autoClose: 700
        });
        setImposePenaltydata(response.data);
        fetchItemList();
        closeMoalforImposePenalty();
      })
      .catch((error) => {
        toast.error("Please check the data before submitting..", {
          autoClose: 700
        })
      });
  };


  const updateNSDlStatus = async (req, sb) => {


    const result = await Swal.fire({
      title: 'Are you sure to update NSDL Status?',
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
        const response = await axios.post(`http://${ipaddress}export/getNSDLStatus/${companyid}/${branchId}/${req}/${sb}`);
        fetchItemList();
      } catch (error) {
      }
    }
  };

  const [isModalOpenforOverideNSDl, setIsModalOpenforOverideNSDl] = useState(false);
  const [OverideNSDl, setOverideNSDl] = useState([]);
  const [getNSDLStatus, setGETNSDlStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const handleOVERIDEStatus = (e) => {
    setGETNSDlStatus(e.target.value);
  }
  const openModalforsetOverideNSDl = (req, sb, nsdl) => {
    setIsModalOpenforOverideNSDl(true);
    commonSingleExport(req, sb, 'updatensdl');
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
    if (!OverideNSDl.reasonforOverride) {
      toast.error("Reason for override is required", {
        autoClose: 700
      })
      fetchItemList();
      return;
    }

    if (!OverideNSDl.nsdlStatus) {
      toast.error("Please Select the new status before submitting", {
        autoClose: 700
      })
      fetchItemList();
      return;
    }
    if (selectedFile === undefined) {
      // Display an error message or perform any other actions you want
      toast.error('Please select a file before submitting', {
        autoClose: 700
      });
      fetchItemList();
      return; // Prevent further execution of the function
    }


    fetchItemList();
    const formData = new FormData();
    formData.append('file', selectedFile);
    axios
      .post(`http://${ipaddress}export/override/${OverideNSDl.nsdlStatus}/${OverideNSDl.reasonforOverride}/${companyid}/${branchId}/${OverideNSDl.sbRequestId}/${OverideNSDl.sbNo}`, formData, // Use formData as the request body
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

        fetchItemList();
        closeMoalforOverrideNSDL();
      })
      .catch((error) => {
        toast.error("Please check the data before submitting..", {
          autoClose: 700
        })
      });
  };

  const [selectedPackage, setSelectedPackage] = useState('');
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

  const handlePackageChange = (event) => {
    setSelectedPackage(event.target.value);
  };


  const [heavyParcel, setHeavyParcel] = useState(
    {
      companyId: "",
      branchId: "",
      sbNo: "",
      sbRequestId: "",
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
    heavyParcel.sbRequestId = heavyParceldata.sbRequestId;
    heavyParcel.totalPackages = heavyParceldata.noOfPackages;


    axios
      .post(
        `http://${ipaddress}export/saveheavydata`, heavyParcel
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          toast.success("Heavy Parcel Added Successfully", {
            autoClose: 700
          });
          getHEAVYlist();
          fetchItemList(); // Only call if the request was successful
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

  const getHEAVYlist = () => {
    axios
      .get(`http://${ipaddress}export/allheavydata/${companyid}/${branchId}/${heavyParceldata.sbRequestId}/${heavyParceldata.sbNo}`)
      .then((response) => {
        setListofheavydata(response.data); // Store the list in the state
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    getHEAVYlist();
  }, [companyid, branchId, heavyParceldata.sbRequestId, heavyParceldata.sbNo]);


  const [deleteHeavydata, setDeleteHeavydata] = useState([]);

  const deletedata = (data) => {
    axios
      .post(`http://${ipaddress}export/deletedata`, data)
      .then((response) => {
        toast.error("Data delete successfully", {
          autoClose: 700
        })
        fetchItemList();
        getHEAVYlist();
      })
      .catch((error) => {
      });
  };




  const [isModalOpenforCartingAgent, setIsModalOpenforCartingAgent] = useState(false);
  const [cartingdata, setCartingdata] = useState([]);
  const openModalforCartingAgent = (req, sb) => {
    setIsModalOpenforCartingAgent(true);
    commonSingleExport(req, sb, 'carting');
    //  setCartingdata(data);
    CartingData();
  };

  const closeMoalforCartingAgent = () => {
    setIsModalOpenforCartingAgent(false);
    setCartingdata([]);
    setAllCHARepresentative([]);
    setSinglecha('');
    setAllCartingAgent([]);
    setRepresentData([]);
    setSelectrepresentdata('');
    setGetOtp('');
    setSelectedOption('N');
    setTpstatus('N');
  }


  const [allcartingagent, setAllCartingAgent] = useState([]);

  const CartingData = (data) => {
    axios
      .get(`http://${ipaddress}externalparty/cartingdata/${companyid}/${branchId}`)
      .then((response) => {
        setAllCartingAgent(response.data);

      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    CartingData();
  }, [companyid, branchId])



  const [AllCHARepresentavive, setAllCHARepresentative] = useState([]);
  const [getsinglecha, setSinglecha] = useState('');

  const handlegetsinglecha = (e) => {
    setSinglecha(e.target.value);
    setAllCHARepresentative([]);
    setSelectrepresentdata('No');
  }

  const getRepresentlistforALLCHA = () => {
    axios
      .get(`http://${ipaddress}represent/byuiddata/${companyid}/${branchId}/${getsinglecha}`)
      .then((response) => {
        setAllCHARepresentative(response.data); // Store the list in the state
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    getRepresentlistforALLCHA();
  }, [companyid, branchId, getsinglecha])



  const [representData, setRepresentData] = useState([]);
  const [selectRepresentdata, setSelectrepresentdata] = useState('');
  const [getotp, setGetOtp] = useState('');

  const handleOTP = (e) => {
    setGetOtp(e.target.value);
  }



  const handlerepresent = (e) => {

    setSelectrepresentdata(e.target.value);
  }


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

      setIm2("N");
    }
  };

  useEffect(() => {
    imageFile2();
  }, [companyid, branchId, selectRepresentdata])

  const getRepresentData = () => {
    axios
      .get(`http://${ipaddress}represent/byrepresentid/${companyid}/${branchId}/${selectRepresentdata}`)
      .then((response) => {

        setRepresentData(response.data); // Store the list in the state
      })
      .catch((error) => {
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
    }
  }, [representData.mobile]);

  const checkotp2 = () => {
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
      .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectRepresentdata}/${getotpapprove}/${cartingdata.noOfPackages}`)
      .then(() => {
        toast.success("OTP sent successfully", {
          autoClose: 700
        })

      })
      .catch((error) => {
      });
  };

  const handleVerifCHAyOTP = async () => {
    const tpdataa = tpstatus.replace(/\//g, '@');
    try {
      const response = await axios.get(`http://${ipaddress}represent/checkexpcartotp/${companyid}/${branchId}/${selectRepresentdata}/${getotpapprove}/${getotp}/${cartingdata.sbNo}/${cartingdata.sbRequestId}/${getsinglecha}/${userId}/${tpdataa}`);
      if (response.status === 200) {
        toast.success("Successful...", {
          autoClose: 700
        })
        fetchItemList();
        closeMoalforCartingAgent();

      } else {
        toast.error('Invalid OTP', {
          autoClose: 700
        });
      }
    } catch (error) {
      toast.error('Representative not found', {
        autoClose: 700
      });
    }
  };



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
    axios
      .post(`http://${ipaddress}export/cancelparcel`, cancelParceldata)
      .then((response) => {
        toast.success("Parcel cancel successfully", {
          autoClose: 700
        })
        fetchItemList();
        closeMoalforCancelParcel();
      })
      .catch((error) => {
        toast.error("Oops! something went wrong", {
          autoClose: 700
        })
      });
  };


  const removecancelParceldemo = () => {
    axios
      .post(`http://${ipaddress}export/removecancelparcel`, cancelParceldata)
      .then((response) => {
        toast.success("Parcel cancel successfully", {
          autoClose: 700
        })
        fetchItemList();
        closeMoalforCancelParcel();
      })
      .catch((error) => {
        toast.error("Oops! something went wrong", {
          autoClose: 700
        })
      });
  };


  const UpdatecancelParceldemo = () => {
    axios
      .post(`http://${ipaddress}export/updatecancelparcel`, cancelParceldata)
      .then((response) => {
        toast.success("Update successfully", {
          autoClose: 700
        })
        fetchItemList();
        closeMoalforCancelParcel();
      })
      .catch((error) => {
        toast.error("Oops! something went wrong", {
          autoClose: 700
        })
      });
  };


  const [isModalOpenforreceivefromcartingagent, setIsModalOpenforreceivefromcartingagent] = useState(false);
  const [receivecartingdata, setreceivecartingdata] = useState([]);
  const openModalforreceivefromcartingagent = (data) => {
    setIsModalOpenforreceivefromcartingagent(true);
    setreceivecartingdata(data);
    CartingDataa();
  };

  const closeMoalforreceivefromcartingagent = () => {
    setIsModalOpenforreceivefromcartingagent(false);
    setreceivecartingdata([]);
    setSelectrepresentdataa('');
    setSinglecarting('');
    // setAllcartingAgent([]);
    // setallCHARepresentative([]);
    // setSelectrepresentdataa('');
    // setGetotp('');
    setReceivealldata([]);
    setSelectAll(false);
    setSelectedRows([]);
  }



  const [allCartingagent, setAllcartingAgent] = useState([]);
  const [getCartingName, setCartingName] = useState('');
  const CartingDataa = (data) => {
    getRepresentlistforALLCarting();
    axios
      .get(`http://${ipaddress}externalparty/cartingdata/${companyid}/${branchId}`)
      .then((response) => {
        setAllcartingAgent(response.data);
        const namesMap = {};
        response.data.forEach(party => {
          namesMap[party.externaluserId] = party.userName;
        });
        setCartingName(namesMap);
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    CartingDataa();
  }, [companyid, branchId])



  const [allCHARepresentavive, setallCHARepresentative] = useState([]);
  const [getsinglecarting, setSinglecarting] = useState('');
  const [getRepresentName, setGetrepresentName] = useState('');
  const handlegetsinglecarting = (e) => {
    setSinglecarting(e.target.value);
    setSelectrepresentdataa('No');
    setallCHARepresentative([]);
  }

  const getRepresentlistforALLCarting = () => {
    getCartingRepresentData();
    axios
      .get(`http://${ipaddress}represent/byuiddata/${companyid}/${branchId}/${getsinglecarting}`)
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
  }, [companyid, branchId, getsinglecarting])



  const [getrepresentData, setGetrepresentData] = useState([]);
  const [selectRepresentdataa, setSelectrepresentdataa] = useState('');
  const [getOtp, setGetotp] = useState('');

  const handleOtp = (e) => {
    setGetotp(e.target.value);
  }



  const handlecartingrepresent = (e) => {

    setSelectrepresentdataa(e.target.value);
  }

  const [imageData3, setImageData3] = useState(null);
  const [im3, setIm3] = useState('');
  const imageFile3 = async () => {
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
      setIm3('Y');
      // Set the file data in the state
      setImageData3({ url, contentType });

    } catch (error) {

      setIm3('N');
    }
  };

  useEffect(() => {
    imageFile3();
  }, [companyid, branchId, selectRepresentdataa])


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

  const [receivealldata, setReceivealldata] = useState([]);

  const getReceiveData = () => {
    axios
      .get(`http://${ipaddress}export/receivecarting/${companyid}/${branchId}/${getsinglecarting}/${selectRepresentdataa}`)
      .then((response) => {
        getCartingRepresentData();
        setReceivealldata(response.data);
        if (response.data.length === 0) {
          toast.error("No Result Found", {
            autoClose: 700
          })
        }
      })
      .catch((error) => {

      });
  };

  // useEffect(() => {
  //   getReceiveData();
  // }, [companyid, branchId, getsinglecarting, selectRepresentdataa])


  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);


  const handleCheckboxChange1 = (item) => {
    // Toggle the selection state for the clicked row
    if (selectedRows.includes(item)) {
      setSelectedRows(selectedRows.filter((row) => row !== item));
    } else {
      setSelectedRows([...selectedRows, item]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...receivealldata]); // Clone the array
    }
    setSelectAll(!selectAll);
  };

  const handleSubmit1 = () => {
    if (selectedRows.length === 0) {
      toast.error("Please select atleast one checkbox", {
        autoClose: 700
      })
      return;
    }
    axios
      .post(`http://${ipaddress}represent/checkreceivecartotp/${companyid}/${branchId}/${selectRepresentdataa}/${getrepresentData.mobile}/${getOtp}/${userId}`, selectedRows)

      .then(() => {


        closeMoalforreceivefromcartingagent();
        toast.success("Data receives successfully", {
          autoClose: 700
        })
        fetchItemList();

      })
      .catch((error) => {
        toast.error("Invalid OTP", {
          autoClose: 700
        })
      });
  };

  const [isModalOpenforhandoverairline, setIsModalOpenforhandoverairline] = useState(false);
  const [handoverairlinedata, sethandoverairlinedata] = useState([]);
  const openModalforhandoverairline = (data) => {
    setIsModalOpenforhandoverairline(true);
    sethandoverairlinedata(data);
    getFlightlist();
  };

  const closeMoalforhandoverairline = () => {
    setIsModalOpenforhandoverairline(false);
    sethandoverairlinedata([]);
    setgetexportdatabyairline([]);
    setSumofpkg('');
    setSumofSb('');
    setSelectAll1(false);
    setSelectedRows1([]);
    setGetAllFlight([]);

  }

  const [getAllFlight, setGetAllFlight] = useState([]);
  const getFlightlist = () => {
    axios
      .get(`http://${ipaddress}Airline/list/${companyid}/${branchId}`)
      .then((response) => {
        setGetAllFlight(response.data); // Store the list in the state

      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    getFlightlist();
  }, [companyid, branchId])

  const [airname, setAirName] = useState('');
  const handleairname = (e) => {
    setAirName(e.target.value);
  }


  const [selectedRows1, setSelectedRows1] = useState([]);
  const [selectAll1, setSelectAll1] = useState(false);


  const handleCheckboxChange2 = (item) => {
    // Toggle the selection state for the clicked row
    if (selectedRows1.includes(item)) {
      setSelectedRows1(selectedRows1.filter((row) => row !== item));
    } else {
      setSelectedRows1([...selectedRows1, item]);
    }
  };

  const handleSelectAll1 = () => {
    if (selectAll1) {
      setSelectedRows1([]);
    } else {
      setSelectedRows1([...getexportdatabyairline]); // Clone the array
    }
    setSelectAll1(!selectAll1);
  };



  const [sumofpkg, setSumofpkg] = useState('');
  const [sumofSb, setSumofSb] = useState('');

  const [getexportdatabyairline, setgetexportdatabyairline] = useState([]);
  const getExportAirlinewiselist = () => {
    getFlightlist();
    axios
      .get(`http://${ipaddress}export/byairline/${companyid}/${branchId}/${airname}`)
      .then((response) => {
        if (response.data.length === 0) {
          toast.error("No Result Found", {
            autoClose: 700
          })
        }
        setgetexportdatabyairline(response.data); // Store the list in the state
        const sumOfPackages = response.data.reduce((total, item) => total + (item.noOfPackages || 0), 0);

        setSumofpkg(sumOfPackages);
        const sumofSb = response.data.filter(item => item.sbNo !== undefined && item.sbNo !== null).length;


        setSumofSb(sumofSb);
      })
      .catch((error) => {
      });
  };


  const handleSubmit2 = () => {
    if (selectedRows1.length === 0) {
      toast.error("Please select atleast one checkbox", {
        autoClose: 700
      })
      return;
    }
    axios
      .post(`http://${ipaddress}export/handoverairline/${userId}`, selectedRows1)

      .then(() => {


        closeMoalforhandoverairline();
        toast.success("Packages handed over to airline successfully", {
          autoClose: 700
        })
        fetchItemList();

      })
      .catch((error) => {

      });
  };

  // useEffect(() => {
  //   getExportAirlinewiselist();
  // }, [companyid, branchId,airname])



  const [isModalOpenforexportpc, setIsModalOpenforforexportpc] = useState(false);
  const [exportpcdata, setexportpcdata] = useState([]);
  const openModalforexportpc = (req, sb) => {
    setIsModalOpenforforexportpc(true);
    commonSingleExport(req, sb, 'personalinfo');

    // setexportpcdata(data);
  };

  const closeMoalforexportpc = () => {
    setIsModalOpenforforexportpc(false);
    setexportpcdata([]);
    setpcdata([]);
    setIsConfirmed(false);
  }
  const [pcdata, setpcdata] = useState({
    flightDate: new Date(),
    dateOfEscort: new Date(),
    approverDate: new Date()
  });
  const getPCdata = () => {
    axios
      .get(`http://${ipaddress}exportpc/byid/${companyid}/${branchId}/${exportpcdata.sbRequestId}/${exportpcdata.sbNo}/${exportpcdata.serNo}`)
      .then((response) => {
        setpcdata(response.data); // Store the list in the state

      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    getPCdata();
  }, [companyid, branchId, exportpcdata.sbRequestId, exportpcdata.sbNo, exportpcdata.serNo])

  const handlePCChange = (event) => {

    const { name, value } = event.target;
    setpcdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleCheckboxChangee = (event) => {
    setIsConfirmed(event.target.checked);
  };

  const handlePCSubmit = () => {
    if (!isConfirmed) {
      toast.error("Please confirm", {
        autoClose: 700
      })
      return;
    }
    pcdata.sbNo = exportpcdata.sbNo;
    pcdata.sbRequestId = exportpcdata.sbRequestId;
    pcdata.serNo = exportpcdata.serNo;
    axios
      .post(`http://${ipaddress}exportpc/savedata/${companyid}/${branchId}/${userId}`, pcdata)
      .then((response) => {
        setpcdata(response.data);
        fetchItemList();
        toast.success("Personal details add successfully", {
          autoClose: 700
        })
      })
      .catch((error) => {

        toast.error("Oops! something wrong here", {
          autoClose: 700
        })
      });
  };


  const [handoverdata, sethandoverdata] = useState([]);

  const getHandoverdata = () => {
    axios
      .get(`http://${ipaddress}export/getdataforhandover/${companyid}/${branchId}`)
      .then((response) => {
        sethandoverdata(response.data); // Store the list in the state

      })
      .catch((error) => {
      });
  };

  const [handedOverdata1, setandedOverdata1] = useState([]);
  const getHandoverdata1 = () => {
    axios
      .get(`http://${ipaddress}export/getdataforhandover1/${companyid}/${branchId}`)
      .then((response) => {
        setandedOverdata1(response.data); // Store the list in the state

      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    getHandoverdata();
  }, [companyid, branchId])


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
      setSelectedRows2([...handoverdata]); // Clone the array
    }
    setSelectAll2(!selectAll2);
  };

  const [imageData1, setImageData1] = useState(null);
  const [im1, setIm1] = useState('');

  const imageFile1 = async () => {
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
      setImageData1({ url, contentType });
      setIm1('Y');
    } catch (error) {

      setIm1('N')
    }
  };

  useEffect(() => {
    imageFile1();
  }, [companyid, branchId, selectRepresentdataa])

  const checkotp1 = () => {
    if (!selectRepresentdataa) {
      toast.error("Please select representative", {
        autoClose: 700
      })
      return;
    }

    if (!getrepresentData.mobile) {
      toast.error("Please select mobile no.", {
        autoClose: 700
      })
      return;
    }
    const dataa = selectedRows2.reduce((total, item) => total + item.noOfPackages, 0);
    axios
      .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectRepresentdataa}/${getrepresentData.mobile}/${dataa}`)
      .then(() => {
        toast.success("OTP sent successfully", {
          autoClose: 700
        })

      })
      .catch((error) => {
      });
  };




  const checkotp5 = () => {
    if (!selectRepresentdataa) {
      toast.error("Please select representative", {
        autoClose: 700
      })
      return;
    }

    if (!getrepresentData.mobile) {
      toast.error("Please select mobile no.", {
        autoClose: 700
      })
      return;
    }
    axios
      .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectRepresentdataa}/${getrepresentData.mobile}/${selectedRows.reduce((total, item) => total + item.noOfPackages, 0)}`)
      .then(() => {
        toast.success("OTP sent successfully", {
          autoClose: 700
        })

      })
      .catch((error) => {
      });
  };



  const handleSubmit3 = async () => {
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
      if (selectedRows2.length === 0) {
        toast.error("Please select atleast one checkbox", {
          autoClose: 700
        })
        return;
      }
      const tpdataa = tpstatus.replace(/\//g, '@');
      axios
        .post(`http://${ipaddress}represent/checkhandovercartotp/${companyid}/${branchId}/${selectRepresentdataa}/${getrepresentData.mobile}/${getOtp}/${getsinglecarting}/${userId}/${tpdataa}`, selectedRows2)

        .then(() => {


          handleClose();
          toast.success("Handed over to carting agent successfully", {
            autoClose: 700
          })
          fetchItemList();
          getHandoverdata();
        })
        .catch((error) => {
          toast.error("Invalid OTP", {
            autoClose: 700
          })
        });

    }



  };
  const handleClose = () => {
    setShowModal(false);
    setSelectedRows2([]);
    setSelectAll2(false);
    setGetrepresentData([]);
    setallCHARepresentative([]);
    setSelectrepresentdataa('');
    setSinglecarting('');
    setAllcartingAgent([]);
    setSelectedOption('N');
    setTpstatus('N');
  }


  const [searchFilters1, setSearchFilters1] = useState({
    serNo: '',
    startDate: new Date(), // Initialize to null
    endDate: new Date(), // Initialize to null
    dgdcStatus: '',
    hold: '',
    personal: '',
    heavy: '',
    special: ''
  });

  const [searchFilters2, setSearchFilters2] = useState({
    serNo: '',
    startDate: new Date(), // Initialize to null
    endDate: new Date(), // Initialize to null
    dgdcStatus: '',
    hold: '',
    personal: '',
    heavy: '',
    special: ''
  });
  const [filteredData1, setFilteredData1] = useState([]);



  const handleStartDateChange = (date) => {
    setSearchFilters1({
      ...searchFilters1,
      startDate: date,
    });
  };

  const handleEndDateChange = (date) => {
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
      return null;
    }
  };

  const handleSearch2 = () => {

    const filteredResults = items.filter((data) => {
      const serNoMatches =
        (searchFilters1.serNo === null || searchFilters1.serNo === undefined) ||
        (data.serNo ?? '').includes(searchFilters1.serNo) ||
        (data.sbRequestId ?? '').includes(searchFilters1.serNo) ||
        (data.sbNo ?? '').includes(searchFilters1.serNo);
      // Convert searchFilters.startDate to Date object with "yyyy-MM-dd" format
      const startDate = convertToDateWithoutTime(searchFilters1.startDate);
      const endDate = convertToDateWithoutTime(searchFilters1.endDate);

      // If serDate is null, use today's date
      const dataDate = data.serDate ? convertUnixTimestampToDate(data.serDate) : convertUnixTimestampToDate(new Date());

      // Check if the values are valid Date objects before comparing
      const startDateMatches = dataDate.getTime() >= startDate.getTime();
      const endDateMatches = dataDate <= endDate;

      const dgdcStatusMatches = searchFilters1.dgdcStatus === '' || data.dgdcStatus === searchFilters1.dgdcStatus;
      const holdStatus = searchFilters1.hold === '' || data.holdStatus === searchFilters1.hold;
      const personalStatus = searchFilters1.personal === '' || data.pcStatus === searchFilters1.personal;
      const specialStatus = searchFilters1.special === '' || data.scStatus === searchFilters1.special;
      const heavyStatus = searchFilters1.heavy === '' || data.hpStatus === searchFilters1.heavy;

      return serNoMatches && startDateMatches && endDateMatches && dgdcStatusMatches && holdStatus && personalStatus && specialStatus && heavyStatus;
    });
    if (filteredData1.length > 0) {
      setCurrentPage(1); // Reset the current page to 1

    }

    // setFilteredData1(filteredResults);


  };

  const convertToFormattedDate = (inputDate) => {
    const dateObject = new Date(inputDate);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };


  const [loading, setloading] = useState(false);
  const [holdPrintStatus, setHoldPrintStatus] = useState(false);
  const search1 = (searchFilters1) => {
    setloading(true);

    axios
      .get(`http://${ipaddress}export/search?pcStatus=${searchFilters1.personal}&scStatus=${searchFilters1.special}&searchValue=${searchFilters1.serNo}&companyid=${companyid}&branchId=${branchId}&holdStatus=${searchFilters1.hold}&hpStatus=${searchFilters1.heavy}&dgdcStatus=${searchFilters1.dgdcStatus}&startDate=${convertToFormattedDate(searchFilters1.startDate)}&endDate=${convertToFormattedDate(searchFilters1.endDate)}`)
      .then((response) => {
        setloading(false);
        setFilteredData1(response.data);
        if (searchFilters1.hold === 'Y') {
          setHoldPrintStatus(true);
        }
        else {
          setHoldPrintStatus(false);
        }
        // console.log('formData13453453 ', response.data);
        // if (filteredData1.length > 0) {
        //   setCurrentPage(1); // Reset the current page to 1

        // }
      })
      .catch((error) => {
        setloading(false);
        setHoldPrintStatus(false);
        console.error("Error in search1 request:", error);
        // Handle the error, e.g., display an error message to the user
      });
  };





  const fetchItemList2 = () => {
    // search1();

    axios
      .get(`http://${ipaddress}export/listSBTransaction/${companyid}/${branchId}`)
      .then((response) => {
        setItems2(response.data);
      })
      .catch((error) => {
      });
  };

  // Fetch the list of items when the component mounts
  useEffect(() => {
    fetchItemList2();
  }, [companyid, branchId]);

  useEffect(() => {
    handleSearch2();
    // search1();
  }, [items])

  // const handleClear2 = () => {
  //   setSearchFilters1(
  //     {
  //       serNo: '',
  //       startDate: new Date(), // Initialize to null
  //       endDate: new Date(), // Initialize to null
  //       dgdcStatus: '',
  //       hold: '',
  //       personal: '',
  //       heavy: '',
  //       special: ''
  //     }
  //   );

  //   fetchItemList();
  //   //fetchItemList2();
  //   // search1();
  //   //handleSearch2();
  //   // setFilteredData1([]);


  // }

  const resetSearch = {
    serNo: '',
    startDate: new Date(), // Initialize to null
    endDate: new Date(), // Initialize to null
    dgdcStatus: '',
    hold: '',
    personal: '',
    heavy: '',
    special: ''
  };

  const handleClear2 = () => {
    setSearchFilters1(
      {
        serNo: '',
        startDate: new Date(), // Initialize to null
        endDate: new Date(), // Initialize to null
        dgdcStatus: '',
        hold: '',
        personal: '',
        heavy: '',
        special: ''
      }
    );

    setCurrentPageFun();
    search1(resetSearch);



  }










  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData1.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData1.length / itemsPerPage);

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

  const [historydata, setHistorydata] = useState([]);
  const [isModalOpenforviewhistory, setIsModalOpenforforviewhistory] = useState(false);

  const openModalforviewhistory = (req, sb) => {
    setIsModalOpenforforviewhistory(true);
    commonSingleExport(req, sb, 'history');
    //  setHistorydata(data);
  };

  const closeMoalforviewhistory = () => {
    setIsModalOpenforforviewhistory(false);
    setHistorydata([]);
    setExHistoryList([]);
  }

  const handleHistory = () => {
    axios
      .get(
        `http://${ipaddress}export/getExportHistoryList/${companyid}/${branchId}/${historydata.sbNo}/${historydata.sbRequestId}/${historydata.serNo}`
      )
      .then((response) => {
        setExHistoryList(response.data);


      })
      .catch((error) => {
      });
  };
  useEffect(() => {
    handleHistory();
  }, [companyid, branchId, historydata.sbNo, historydata.sbRequestId, historydata.serNo]);


  const [isModalOpenforEditexport, setIsModalOpenforEditexport] = useState(false);
  const [editsavedata, setEditsavedata] = useState([]);
  const [editdata, seteditdata] = useState([]);
  const openModalforEditexport = (req, sb) => {
    setIsModalOpenforEditexport(true);
    commonSingleExport(req, sb, 'edit');
    // setEditsavedata(data);
    getFlightlist();
    getALLConsoledata();
  };

  const closeMoalforEditexport = () => {
    setIsModalOpenforEditexport(false);
    setEditsavedata([]);
    seteditdata([]);
    setSelectedDate('');
    setGetAirlineName([]);
    setGetcreated('');
    setAllpartydata([]);
    setSingleieccode('');
    setGetConsoleData([]);
    setFormErrors({
      sbRequestId: "",
      sbNo: "",
      sbDate: "",
      flightNo: "",
      flightDate: "",
      nameOfExporter: "",
      dgdcStatus: "",
    })

  }

  const [formErrors, setFormErrors] = useState({
    sbRequestId: "",
    sbNo: "",
    sbDate: "",
    airlineCode: "",
    flightDate: "",
    nameOfExporter: "",
    nsdlStatus: "",
    dgdcStatus: "",
  });


  const handleGetEdit = () => {
    axios
      .get(
        `http://${ipaddress}export/getdataforedit/${companyid}/${branchId}/${editsavedata.sbRequestId}/${editsavedata.sbNo}`
      )
      .then((response) => {
        seteditdata(response.data);
      })
      .catch((error) => {
      });
  };




  const setCurrentPageFun = () => {
    setCurrentPage(1);
  };






  useEffect(() => {
    handleGetEdit();
  }, [companyid, branchId, editsavedata.sbRequestId, editsavedata.sbNo]);

  const handleEditSubmit = () => {


    const errors = {};

    if (!editdata.sbRequestId) {
      errors.sbRequestId = "SB Request Id is required.";
    }

    if (!editdata.sbNo) {
      errors.sbNo = "SB No is required.";
    }

    if (!editdata.sbDate) {
      errors.sbDate = "SB Date is required.";
    }

    if (!editdata.airlineCode) {
      errors.airlineCode = "Flight No is required.";
    }

    if (!editdata.flightDate) {
      errors.flightDate = "Flight Date is required.";
    }

    if (!editdata.nameOfExporter) {
      errors.nameOfExporter = "Name of exporter is required.";
    }




    if (!editdata.sbNo) {
      document.getElementById('sbNo').classList.add('error-border');
    }
    if (!editdata.sbDate) {
      document.getElementById('sbDate').classList.add('error-border');
    }
    if (!editdata.sbRequestId) {
      document.getElementById('sbRequestId').classList.add('error-border');
    }
    if (!editdata.flightDate) {
      document.getElementById('flightDate').classList.add('error-border');
    }
    if (!editdata.airlineCode) {
      document.getElementById('airlineCode').classList.add('error-border');
    }
    if (!editdata.nameOfExporter) {
      document.getElementById('nameOfExporter').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    editdata.airlineName = getSingleairlinename;
    editdata.iecCode = getSingleieccode;
    editdata.entityId = getSingleentity;
    editdata.flightNo = getAirlineName.flightNo;
    axios
      .post(`http://${ipaddress}export/editexport`, editdata)
      .then((response) => {
        fetchItemList();
        toast.success("Data edit successfully", {
          autoClose: 700
        })
      })
      .catch((error) => {
        toast.error("Oops! something wrong here", {
          autoClose: 700
        })
      });
  };
  const [selectedDate, setSelectedDate] = useState('');
  const handleFlightDateChange = (date) => {
    setSelectedDate(date);

    seteditdata({
      ...editdata,
      flightDate: date,
    })
  }
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    seteditdata((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const [getAirlineName, setGetAirlineName] = useState([]);
  const getSingleFlightlist = () => {
    axios
      .get(`http://${ipaddress}Airline/find1/${companyid}/${branchId}/${editdata.airlineCode}`)
      .then((response) => {
        setGetAirlineName(response.data); // Store the list in the state
        //formData.airlineName(response.data((data) => data.airlineName) )
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    getSingleFlightlist();
  }, [companyid, branchId, editdata.airlineCode])

  const [getSingleairlinename, setGetcreated] = useState('');
  const createBySpanRef = useRef('');
  useEffect(() => {
    if (createBySpanRef.current) {
      const createdByValue = createBySpanRef.current.textContent;
      setGetcreated(createdByValue);
      // Now you can use the 'approvedByValue' variable to store or manipulate the value
    }
  }, [getAirlineName.airlineName]);
  const [allpartydata, setAllpartydata] = useState([]);
  const getpartyid = () => {

    axios
      .get(`http://${ipaddress}parties/getpartybyid/${companyid}/${branchId}/${editdata.nameOfExporter}`)
      .then((response) => {
        setAllpartydata(response.data); // Store the list in the state

      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    getpartyid();
  }, [companyid, branchId, editdata.nameOfExporter])



  const [getSingleieccode, setSingleieccode] = useState('');
  const createIECBySpanRef = useRef('');
  useEffect(() => {
    if (createIECBySpanRef.current) {
      const createdByValue = createIECBySpanRef.current.textContent;
      setSingleieccode(createdByValue);
      // Now you can use the 'approvedByValue' variable to store or manipulate the value
    }
  }, [allpartydata.iecNo]);

  const [getSingleentity, setSingleentity] = useState('');
  const createEntityBySpanRef = useRef('');
  useEffect(() => {
    if (createEntityBySpanRef.current) {
      const createdByValue = createEntityBySpanRef.current.textContent;
      setSingleentity(createdByValue);
      // Now you can use the 'approvedByValue' variable to store or manipulate the value
    }
  }, [allpartydata.entityId]);

  const [consoles, setConsoles] = useState([]);
  const [getConsoleId, setGetConsoleId] = useState({});
  const fetchConsoleNames = async () => {
    try {
      const response = await fetch(
        `http://${ipaddress}externalParty/console/${companyid}/${branchId}`
      );
      const data = await response.json();
      const consoleMap = {};
      data.forEach((console) => {
        consoleMap[console.externaluserId] = console.userName;
      });
      setGetConsoleId(consoleMap);
      setConsoles(data);
    } catch (error) {
      console.error("Error fetching party names:", error);
    }
  };

  useEffect(() => {
    fetchConsoleNames();
  }, [companyid, branchId]);
  const [getConsoleData, setGetConsoleData] = useState([]);
  const getALLConsoledata = () => {
    axios
      .get(`http://${ipaddress}externalparty/consoledata/${companyid}/${branchId}`)
      .then((response) => {
        setGetConsoleData(response.data); // Store the list in the state
        //formData.airlineName(response.data((data) => data.airlineName) )

      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    getALLConsoledata();
  }, [companyid, branchId])

  const savegateinout = (req, sb, ser) => {

    axios
      .post(`http://${ipaddress}gateinout/saveexp/${companyid}/${branchId}/${req}/${sb}/${ser}`)
      .then(() => {

        fetchItemList();
      })
      .catch((error) => {

      });
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


  const [fileData, setFileData] = useState(null);
  const [type1, setType1] = useState('');
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const downloadFile = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}export/download/${companyid}/${branchId}/${OverideNSDl.sbRequestId}/${OverideNSDl.sbNo}`, {
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

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [updateAirline, setUpdateAirline] = useState([]);
  const [getAirway, setAirway] = useState('');
  const index1 = 3;
  const firstPart = getAirway.slice(0, index1).replace(/[^0-9]/g, '');
  const secondPart = getAirway.slice(index1).replace(/[^0-9]/g, '');



  const [saveairname, setSaveairname] = useState([]);
  const getSingleAirlineName = () => {
    axios
      .get(`http://${ipaddress}Airline/find1/${companyid}/${branchId}/${updateAirline.airlineCode}`)
      .then((response) => {
        // console.log("GET list response:", response.data);
        setSaveairname(response.data); // Store the list in the state

      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {
    getSingleAirlineName();
  }, [companyid, branchId, updateAirline.airlineName])

  const [saveaircodename, setSaveaircodename] = useState([]);
  const getSingleAirlineCode = () => {
    axios
      .get(`http://${ipaddress}Airline/findByCode/${companyid}/${branchId}/${saveairname.airlineCode}`)
      .then((response) => {
        // console.log("GET list response:", response.data);
        setSaveaircodename(response.data); // Store the list in the state

      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };



  useEffect(() => {
    getSingleAirlineCode();
  }, [companyid, branchId, saveairname.airlineCode])



  useEffect(() => {
    if (getAirway.length >= 11) {
      const timer = setTimeout(() => {
        console.log('Hii');
        updateAirline.airlineCode = firstPart.replace(/[^0-9]/g, '');
        const airway = firstPart + secondPart.replace(/[^0-9]/g, '');
        updateAirline.airwayBillNo = airway.slice(0, 11);;
        setAirway('');
        getSingleAirlineName();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [getAirway]);
  const inputRef1 = useRef();

  const hoverScanAWB = () => {
    setTimeout(() => {
      inputRef1.current.focus();
    }, 100
    );
  }
  const openModal1 = (req, sb) => {
    setIsModalOpen1(true);
    commonSingleExport(req, sb, 'updateairway');
    // setUpdateAirline(data);
    hoverScanAWB();
  }



  const handleAirwayChange = (event) => {
    const { name, value } = event.target;
    setUpdateAirline((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const handleAirlineSubmit = () => {
    if (saveairname.airlineName === '' || saveairname.airlineName === undefined || saveairname.airlineName === null) {
      toast.error("Please enter correct airway bill number.", {
        autoClose: 700
      });
      return;
    }
    updateAirline.airlineName = saveairname.airlineName;
    updateAirline.flightNo = saveairname.flightNo;

    axios.post(`http://${ipaddress}export/saveairway/${userId}`, updateAirline)
      .then(response => {
        toast.success("Data save successfully", {
          autoClose: 700
        })
        closeModal1();
        fetchItemList();
        console.log('Post request successful:', response.data);


      })
      .catch(error => {
        console.error('Error sending post request:', error);



      });
  };


  const closeModal1 = () => {
    setIsModalOpen1(false);
    setUpdateAirline([]);
    setAirway('');
  }

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

  const [selectedSerDate, setSelectedSerDate] = useState(new Date());
  const [serDateData, setSerDateData] = useState([]);

  const [exportSerDateData, setExportSerDateData] = useState([]);
  const [exportSerDateAndAirlineCodeData, setExportSerDateAndAirlineCodeData] =
    useState([]);
  const [showExportSerAndAirlineDataTable, setExportSerAndAirlineDataTable] =
    useState(false);
  const [isModalOpenforRedeposite, setIsModalOpenforRedeposite] =
    useState(false);

  const [redeposite, setRedeposite] = useState([]);

  const handleDateChange = async (date) => {
    setSelectedSerDate(date);
    const formattedDate = formatDate(date);
    console.log("formattedDate " + formattedDate);
    // Replace this with your actual API call logic
    await fetch(
      `http://${ipaddress}export/serDate?date=${formattedDate}&cid=${companyid}&bid=${branchId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Ser DAte data  ", data);
        // Assuming data is an array containing Transhipment Permit No
        if (data && data.length > 0) {
          setSerDateData(data); // Update responseData with fetched data
          console.log("ser data  ", data); // Log the updated data
        } else {
          setSerDateData([]); // Update responseData to an empty array if no data available
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const exportdataBySerDateAndAirlneCode = async (selectedSerDate, airname) => {
    // Ensure you pass the selected date and airline name when calling the function
    const formattedDate = formatDate(selectedSerDate);
    try {
      const response = await fetch(
        `http://${ipaddress}export/exportDataBySerDateAndAirlineCode?companyId=${companyid}&branchId=${branchId}&serDate=${formattedDate}&airlineCode=${airname}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setExportSerDateAndAirlineCodeData(data);
        setExportSerAndAirlineDataTable(true);
        console.log("dataaa ", data);
        console.log(exportSerDateAndAirlineCodeData);
        toast.success("Data Found For Seleted Date !", {
          position: "top-center",
          autoClose: 540, // Duration in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Data Not Selected Found For Seleted Date !", {
          position: "top-center",
          autoClose: 540, // Duration in milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setExportSerDateAndAirlineCodeData([]);
        setExportSerAndAirlineDataTable(false);
      }

      setError(null); // Clear the error if data is successfully fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error); // Set the error state if there's an error
    }
  };

  const handleSearchForSerDataData = () => {
    exportdataBySerDateAndAirlneCode(selectedSerDate, airname); // Pass the selected date and airline name here
  };

  const openModalforRedeposite = (data) => {
    console.log("GFHFHFDFDJDFDJHJDFJDJDJDJDJDJD");
    setIsModalOpenforRedeposite(true);
    setRedeposite(data);
    getFlightlist();
  };

  const closeMoalforRedeposite = () => {
    setIsModalOpenforRedeposite(false);
    setRedeposite([]);
    setExportSerAndAirlineDataTable(false);
    setExportSerDateAndAirlineCodeData([]);

    setSumofpkg("");
    setSumofSb("");
    setSelectAll1(false);
    setSelectedRows1([]);
    setGetAllFlight([]);
    setSelectedSerDate(new Date()); // Replace initialDate with your default date value
    setAirName(''); // Set to a
    setSelectAllRedeposite(false);
    setSelectedRowsRedeposite([]);
  };
  const [remarks, setRemarks] = useState([]);

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

  const [selectAllRedeposite, setSelectAllRedeposite] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedRowsRedeposite, setSelectedRowsRedeposite] = useState([]);


  const [RemovedRecordArray, setRemovedRecordArray] = useState([]);

  const handleCheckboxChangeForRedeposite = (item) => {
    console.log(item.serNo);

    const removedNumber = item.serNo;
    setRemovedRecordArray(prevArray => {
      // Check if removedNumber is already in the array
      const index = prevArray.indexOf(removedNumber);
      console.log("gdgd", item);
      if (index !== -1) {
        // If it exists, remove it
        return prevArray.slice(0, index).concat(prevArray.slice(index + 1));
      } else {
        // If it doesn't exist, add it
        return [...prevArray, removedNumber];
      }
    })

    // Toggle the selection state for the clicked row
    if (selectedRowsRedeposite.includes(item)) {
      setSelectedRowsRedeposite(selectedRowsRedeposite.filter((row) => row !== item));
    } else {
      setSelectedRowsRedeposite([...selectedRowsRedeposite, item]);
    }
  };

  const handleSelectAllForRedeposite = () => {
    const serNoList = exportSerDateAndAirlineCodeData.map(item => item.serNo);
    setRemovedRecordArray(serNoList);
    console.log(serNoList);
    if (selectAllRedeposite) {
      setSelectedRowsRedeposite([]);
    } else {
      setSelectedRowsRedeposite([...exportSerDateAndAirlineCodeData]);
    }
    setSelectAllRedeposite(!selectAllRedeposite);
  };


  const redepositedToDgdcCargo = () => {
    const errors = {};
    if (!file) {
      errors.file = "Upload Document is required.";
    }

    if (selectedRowsRedeposite.length === 0) {
      toast.error("Please select at least one checkbox", {
        autoClose: 900,
      });
      return;
    }

    if (file) {
     
      const formData = new FormData();
      formData.append('remarks', remarks);
      formData.append('file', file);
      formData.append('RemovedRecordArray', RemovedRecordArray); // Serialize to JSON

      axios
        .post(
          `http://${ipaddress}export/redeposite/${userId}/${companyid}/${branchId}`,
          formData,
        )
        .then(() => {
          closeMoalforRedeposite();
          toast.success("Packages Redeposited And Handed over to DGDC Cargo successfully", {
            autoClose: 900,
          });
          fetchItemList();
          setRemarks("");
        })
        .catch((error) => {
          // Handle errors
        });
    }
  };
  const [items1, setItems1] = useState([]);
  const fetchItemList1 = useCallback(() => {
    if (logintype === 'Party') {
      axios
        .get(`http://${ipaddress}export/alldatabyparty/${companyid}/${branchId}/${logintypeid}`)
        .then((response) => {
          setItems1(response.data);
          console.log('items1 ', response.data);
        })
        .catch((error) => {
        });
    }

    if (logintype === 'CHA') {
      axios
        .get(`http://${ipaddress}export/alldatabycha/${companyid}/${branchId}/${logintypeid}`)
        .then((response) => {
          setItems1(response.data);
          console.log('items1 ', response.data);
        })
        .catch((error) => {
        });
    }

    if (logintype === 'Carting Agent') {
      axios
        .get(`http://${ipaddress}export/alldatabycartingagent/${companyid}/${branchId}/${logintypeid}`)
        .then((response) => {
          setItems1(response.data);
          console.log('items1 ', response.data);
        })
        .catch((error) => {
        });
    }

    if (logintype === 'Console') {
      axios
        .get(`http://${ipaddress}export/alldatabyconsole/${companyid}/${branchId}/${logintypeid}`)
        .then((response) => {
          setItems1(response.data);
          console.log('items1 ', response.data);
        })
        .catch((error) => {
        });
    }



  }, [companyid, branchId, logintypeid]);

  // Fetch the list of items when the component mounts
  useEffect(() => {
    fetchItemList1();
  }, [fetchItemList1]);


  const handleSearch3 = () => {


    axios
      .get(`http://${ipaddress}export/searchbylogintype?pcStatus=${searchFilters2.personal}&scStatus=${searchFilters2.special}&searchValue=${searchFilters2.serNo}&companyid=${companyid}&branchId=${branchId}&holdStatus=${searchFilters2.hold}&hpStatus=${searchFilters2.heavy}&dgdcStatus=${searchFilters2.dgdcStatus}&startDate=${convertToFormattedDate(searchFilters2.startDate)}&endDate=${convertToFormattedDate(searchFilters2.endDate)}&loginid=${logintypeid}&logintype=${logintype}`)
      .then((response) => {
        setFilteredData2(response.data);
        // console.log('formData13453453 ', response.data);
        if (filteredData2.length > 0) {
          setCurrentPage1(1);
          //  console.log("hiwehhewhh");
        }

      })
      .catch((error) => {

        console.error("Error in search1 request:", error);
        // Handle the error, e.g., display an error message to the user
      });
  }



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
      .get(`http://${ipaddress}export/alltp/${companyid}/${branchId}/${date}`)
      .then((response) => {
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




  //Alll logintype



  const [filteredData2, setFilteredData2] = useState([]);


  const handleStartDateChange1 = (date) => {
    setSearchFilters2({
      ...searchFilters2,
      startDate: date,
    });
  };

  const handleEndDateChange1 = (date) => {
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





  const [currentPage1, setCurrentPage1] = useState(1);
  const [itemsPerPage1] = useState(10);

  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems1 = filteredData2.slice(indexOfFirstItem1, indexOfLastItem1);
  const totalPages1 = Math.ceil(filteredData2.length / itemsPerPage1);

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

    if (endPage > totalPages1) {
      endPage = totalPages1;
      startPage = Math.max(1, totalPages1 - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };



  // const handleSearch3 = () => {

  //   axios
  //   .get(`http://${ipaddress}export/search?pcStatus=${searchFilters1.personal}&scStatus=${searchFilters1.special}&searchValue=${searchFilters1.serNo}&companyid=${companyid}&branchId=${branchId}&holdStatus=${searchFilters1.hold}&hpStatus=${searchFilters1.heavy}&dgdcStatus=${searchFilters1.dgdcStatus}&startDate=${convertToFormattedDate(searchFilters1.startDate)}&endDate=${convertToFormattedDate(searchFilters1.endDate)}`)
  //   .then((response) => {
  //     setFilteredData2(response.data);
  //     console.log('formData13453453 ', response.data);
  //     if (filteredData2.length > 0) {
  //       setCurrentPage1(1); // Reset the current page to 1

  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error in search1 request:", error);
  //     // Handle the error, e.g., display an error message to the user
  //   });
  // };

  const fetchItemList3 = useCallback(() => {
    handleSearch3();
  }, [companyid, branchId]);


  const handleClear3 = () => {
    setSearchFilters2(
      {
        serNo: '',
        startDate: new Date(), // Initialize to null
        endDate: new Date(), // Initialize to null
        dgdcStatus: '',
        hold: '',
        personal: '',
        heavy: '',
        special: ''
      }
    );
    fetchItemList3();


  }

  useEffect(() => {
    handleSearch3();

  }, [])




  // Back to town

  const [isModalOpenforbacktotown, setIsModalOpenforbacktotown] = useState(false);
  const [backtotown_remark, setBacktotownremark] = useState('');
  const [backtotowndata, setBacktotowndata] = useState([]);
  const [file1, setFile1] = useState(null);

  const openModalforbacktotown = (req, sb) => {
    commonSingleExport(req, sb, 'backtotown');
    //setBacktotowndata(data);
    setIsModalOpenforbacktotown(true);

  }


  const handleBacktotownRemark = (event) => {
    const { name, value } = event.target;
    setBacktotowndata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


  const closebacktotownmodal = () => {
    setBacktotowndata([]);
    setIsModalOpenforbacktotown(false);
    setFile1([]);
    setBacktotownremark('');
    setType2('');
    setFileData1(null);
  }


  const handleFileChangeBacktotown = (e) => {
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
    setFile1(selectedFile);
  };


  const Savebacktotown = () => {
    console.log('backtotowndata.backtotownRemark ', backtotowndata.backtotownRemark);
    if (!file1 || file1 == [] || file1.length == 0) {
      toast.error("Upload Document is required.", {
        autoClose: 700
      })
      return;
    }

    if (backtotowndata.backtotownRemark === '' || backtotowndata.backtotownRemark === null) {
      toast.error("Remark is required", {
        autoClose: 700,
      });
      return;
    }

    if (file1) {

      const formData = new FormData();

      formData.append('file', file1);


      axios
        .post(
          `http://${ipaddress}export/backtotown/${companyid}/${branchId}/${userId}/${backtotowndata.dgdcStatus}/${backtotowndata.sbNo}/${backtotowndata.sbRequestId}/${backtotowndata.backtotownRemark}`,
          formData,
        )
        .then(() => {
          closeMoalforRedeposite();
          toast.success("Package Back To Town successfully", {
            autoClose: 700,
          });
          fetchItemList();
          closebacktotownmodal();
        })
        .catch((error) => {
          toast.error("Something went wrong", {
            autoClose: 700,
          });
        });
    }
  };


  const [fileData1, setFileData1] = useState(null);
  const [type2, setType2] = useState('');

  const [modalIsOpen1, setModalIsOpen1] = useState(false);

  const downloadFile1 = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}export/download1/${companyid}/${branchId}/${backtotowndata.sbRequestId}/${backtotowndata.sbNo}`, {
        responseType: 'arraybuffer', // Tell Axios to treat the response as binary data
      });

      // Extract the content type from the response headers
      const contentType = response.headers['content-type'];

      // Create a Blob from the binary data
      const blob = new Blob([response.data], { type: contentType });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Set the file data in the state
      setFileData1({ url, contentType });

      if (contentType === 'application/pdf') {
        setType2('app');
        openPdfInNewTab1();
      }
      else {
        setModalIsOpen1(true);
      }

    } catch (error) {
      setError('Error downloading file');
    }
  };

  const closeModal2 = () => {
    setFileData1(null); // Clear the image URL
    setModalIsOpen1(false); // Close the modal
  };

  const openPdfInNewTab1 = () => {
    if (fileData1) {
      window.open(fileData1.url, '_blank'); // Open the PDF in a new tab
    }
  };


  //EP Copy

  const [isModalOpenforEPCopy, setIsModalOpenforepcopy] = useState(false);
  const [epdata, setEPdata] = useState([]);

  const openEPCopy = (req, sb) => {
    commonSingleExport(req, sb, 'epcopy');
    //  setEPdata(data);
    setIsModalOpenforepcopy(true);
  }


  const closeEpCopymodal = () => {
    setEPdata([]);
    setIsModalOpenforepcopy(false);
    setFile1([]);
    setFileData1(null);
    setType2('');
  }


  const SaveEPCopy = () => {

    if (!file1 || file1 == [] || file1.length == 0) {
      toast.error("Upload Document is required.", {
        autoClose: 700
      })
      return;
    }



    if (file1) {

      const formData = new FormData();

      formData.append('file', file1);


      axios
        .post(
          `http://${ipaddress}export/uploadepcopy/${companyid}/${branchId}/${epdata.sbNo}/${epdata.sbRequestId}`,
          formData,
        )
        .then(() => {

          toast.success("EP copy uploaded successfully", {
            autoClose: 700,
          });
          fetchItemList();
          closeEpCopymodal();
        })
        .catch((error) => {
          toast.error("Something went wrong", {
            autoClose: 700,
          });
        });
    }
  };

  const downloadFile2 = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}export/download2/${companyid}/${branchId}/${epdata.sbRequestId}/${epdata.sbNo}`, {
        responseType: 'arraybuffer', // Tell Axios to treat the response as binary data
      });

      // Extract the content type from the response headers
      const contentType = response.headers['content-type'];

      // Create a Blob from the binary data
      const blob = new Blob([response.data], { type: contentType });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Set the file data in the state
      setFileData1({ url, contentType });

      if (contentType === 'application/pdf') {
        setType2('app');
        openPdfInNewTab1();
      }
      else {
        setModalIsOpen1(true);
      }

    } catch (error) {
      setError('Error downloading file');
    }
  };


  const holdPrint = async (data) => {
    await axios.post(`http://${ipaddress}export/holdReport/${companyid}/${branchId}`, data)
      .then((response) => {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF
        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);
        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'HoldReport.pdf'; // Set the filename for the downloaded PDF
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        // Trigger the download
        downloadLink.click();
        // Clean up
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(blobUrl);
        toast.success("Downloading Pdf!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 800,
        });
      })
      .catch((error) => {
        if (error) {
          toast.error("Something went wrong", {
            autoClose: 1000
          })
        }
      })
  }

  return (
    <div className="Container" >

      {(logintype === 'Party' || logintype === 'CHA' || logintype === 'Carting Agent' || logintype === 'Console') ? (
        <>
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-50px' }} > <FontAwesomeIcon
            icon={faPlaneDeparture}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Export </h5>




          <Card>
            <CardBody>


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
                        value={searchFilters2.serNo}
                        onChange={handleFilterChange2}
                      />
                    </FormGroup>
                  </Col>{" "}
                  <Col md={8}>



                    <Row md={6}>
                      <Col md={6}>
                        <label className="forlabel" htmlFor="startDate">
                          Date From
                        </label>
                        <DatePicker
                          selected={searchFilters2.startDate}
                          onChange={handleStartDateChange1}
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
                          selected={searchFilters2.endDate}
                          onChange={handleEndDateChange1}
                          dateFormat="dd/MM/yyyy"
                          className="form-control border-right-0 inputField"
                          customInput={<input style={{ width: '100%' }} />}
                          wrapperClassName="custom-react-datepicker-wrapper"
                        />
                      </Col>

                    </Row>

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
                        value={searchFilters2.hold}
                        onChange={handleFilterChange2}

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
                        className="forlabel"
                        htmlFor="personalCarriage"
                      >
                        Personal Carriage
                      </label>
                      <select
                        id="personalCarriage"
                        name="personal"
                        className="form-control  form-select"
                        value={searchFilters2.personal}
                        onChange={handleFilterChange2}
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
                        value={searchFilters2.heavy}
                        onChange={handleFilterChange2}
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
                      <label className="forlabel" htmlFor="specialCarting">
                        Special Carting
                      </label>
                      <select
                        id="specialCarting"
                        name="special"
                        className="form-control  form-select"
                        value={searchFilters2.special}
                        onChange={handleFilterChange2}

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
                        value={searchFilters2.dgdcStatus}
                        onChange={handleFilterChange2}
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
                      onClick={handleSearch3} >
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{ marginRight: "5px" }}
                      />

                      Search
                    </Button>

                    <Button

                      variant="outline-danger"
                      style={{ marginLeft: "10px", marginTop: "10px" }}
                      onClick={handleClear3}
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
                          Request Id
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          SB.No
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          SER No
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          SER Date
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
                          NSDL Status
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
                        <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData2.map((item) => item[0]).length}</th>
                        <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                        <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                        <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                        <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                        <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData2.reduce((total, item) => total + item[5], 0)}</th>
                        <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                        <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                        <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                        <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems1.map((item, index) => (
                        <tr key={index}>
                          <td>{((currentPage1 - 1) * itemsPerPage1) + index + 1}</td>
                          <td>{item[0]}</td>
                          <td>{item[1]}</td>
                          <td>{item[2]}</td>
                          <td>{formatDateTime(item[3])}</td>
                          <td>{getpartyId[item[4]]}</td>
                          <td>{item[5]}</td>
                          <td>{item[6]}</td>
                          <td >{item[7]}</td>



                          <td className="table-column" style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <span>{item[8]}</span>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>

                              {item[9] === "Y" ? (
                                <p className="orangeText" title="MOP OUT">MOP OUT</p>
                              ) : null}

                              {item[10] === "Y" ? (
                                <FaHandPaper size={22} color="orange" style={{ marginRight: '10px' }} title="On Hold" />
                              ) : null}
                              {item[11] === "Y" ? (
                                <FaPersonBooth size={22} fill="orange" style={{ marginRight: '10px' }} title="Personal Carriage" />
                              ) : null}
                              {item[12] === "Y" ? (
                                <FaTruck size={22} fill="orange" style={{ marginRight: '10px' }} title="Special Carting" />
                              ) : null}
                              {item[13] === "Y" ? (
                                <FaTruckLoading size={22} fill="orange" style={{ marginRight: '10px' }} title="Heavy Carriage" />
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
                                  <button className="dropdown-item" onClick={() => openModalforViewall(item[0], item[1])}>
                                    <FontAwesomeIcon icon={faExternalLinkAlt} style={{ marginRight: "5px" }} />View Export Details
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

                </div>


              </div>
            </CardBody>
          </Card>
        </>
      )
        :
        (
          <>
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
                        <Dropdown.Item onClick={(e) => handleShow(companyid, branchId)}> <FontAwesomeIcon icon={faArrowTurnRight} style={{ marginRight: '5px' }} />Handover to Carting Agent</Dropdown.Item>
                        <Dropdown.Item onClick={() => openModalforreceivefromcartingagent()}><FontAwesomeIcon icon={faArrowCircleLeft} style={{ marginRight: '5px' }} />Receive from Carting Agent</Dropdown.Item>
                        <Dropdown.Item onClick={() => openModalforhandoverairline()}> <FontAwesomeIcon icon={faArrowTurnRight} style={{ marginRight: '5px' }} />Handover to Airline</Dropdown.Item>
                        <Dropdown.Item onClick={() => openModalforRedeposite()}>
                          {" "}
                          <FontAwesomeIcon
                            icon={faArrowCircleLeft}
                            style={{ marginRight: "5px" }}
                          />
                          Redeposit
                        </Dropdown.Item>
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
                          value={searchFilters1.serNo}
                          onChange={handleFilterChange1}
                        />
                      </FormGroup>
                    </Col>{" "}
                    <Col md={8}>



                      <Row md={6}>
                        <Col md={6}>
                          <label className="forlabel" htmlFor="startDate">
                            Date From
                          </label>
                          <DatePicker
                            selected={searchFilters1.startDate}
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
                            selected={searchFilters1.endDate}
                            onChange={handleEndDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="form-control border-right-0 inputField"
                            customInput={<input style={{ width: '100%' }} />}
                            wrapperClassName="custom-react-datepicker-wrapper"
                          />
                        </Col>

                      </Row>

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
                          value={searchFilters1.hold}
                          onChange={handleFilterChange1}

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
                          className="forlabel"
                          htmlFor="personalCarriage"
                        >
                          Personal Carriage
                        </label>
                        <select
                          id="personalCarriage"
                          name="personal"
                          className="form-control  form-select"
                          value={searchFilters1.personal}
                          onChange={handleFilterChange1}
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
                          value={searchFilters1.heavy}
                          onChange={handleFilterChange1}
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
                        <label className="forlabel" htmlFor="specialCarting">
                          Special Carting
                        </label>
                        <select
                          id="specialCarting"
                          name="special"
                          className="form-control  form-select"
                          value={searchFilters1.special}
                          onChange={handleFilterChange1}

                        >
                          <option value="">-Any-</option>
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label className="forlabel" htmlFor="provisional">
                          Provisional
                        </label>
                        <select
                          id="provisional"
                          className="form-control  form-select"
                          value={provisional}
                          placeholder="-any-"
                          onChange={(e) => setProvisional(e.target.value)}

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
                          value={searchFilters1.dgdcStatus}
                          onChange={handleFilterChange1}
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
                        onClick={(e) => { search1(searchFilters1); setCurrentPageFun(); }}

                      // onClick={search1} 
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
                        onClick={handleClear2}
                      >
                        <FontAwesomeIcon
                          icon={faSyncAlt}
                          style={{ marginRight: "5px" }}
                        />
                        Reset
                      </Button>
                      {holdPrintStatus && (
                        <Button

                          variant="outline-success"
                          style={{ marginLeft: "10px", marginTop: "10px" }}
                          onClick={() => holdPrint(currentItems)}
                        >
                          <FontAwesomeIcon
                            icon={faSyncAlt}
                            style={{ marginRight: "5px" }}
                          />
                          Hold Print
                        </Button>
                      )

                      }
                    </Col>



                    {/* <Col className="text-center">
                      <Button
                        variant="outline-primary"


                        style={{ marginLeft: "10px", marginTop: "10px" }}
                        onClick={search1} >
                        <FontAwesomeIcon
                          icon={faSearch}
                          style={{ marginRight: "5px" }}
                        />

                        Search
                      </Button>

                      <Button

                        variant="outline-danger"
                        style={{ marginLeft: "10px", marginTop: "10px" }}
                        onClick={handleClear2}
                      >
                        <FontAwesomeIcon
                          icon={faSyncAlt}
                          style={{ marginRight: "5px" }}
                        />
                        Reset
                      </Button>
                    </Col> */}

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
                            Request Id
                          </th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                            SB.No
                          </th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                            SER No
                          </th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                            SER Date
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
                            NSDL Status
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
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData1.map((item) => item[0]).length}</th>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center"></th>
                          <th style={{ backgroundColor: '#BADDDA' }} className="text-center">{filteredData1.reduce((total, item) => total + item[5], 0)}</th>
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
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            <td>{formatDateTime(item[3])}</td>
                            <td>{getpartyId[item[4]]}</td>
                            <td>{item[5]}</td>
                            <td>{item[6]}</td>
                            <td >{item[7]}</td>



                            <td className="table-column" style={{ flexDirection: 'column', alignItems: 'center' }}>
                              <span>{item[8]}</span>
                              <div style={{ display: 'flex', flexDirection: 'row' }}>

                                {item[9] === "Y" ? (
                                  <p className="orangeText" title="MOP OUT">MOP OUT</p>
                                ) : null}

                                {item[10] === "Y" ? (
                                  <FaHandPaper size={22} color="orange" style={{ marginRight: '10px' }} title="On Hold" />
                                ) : null}
                                {item[11] === "Y" ? (
                                  <FaPersonBooth size={22} fill="orange" style={{ marginRight: '10px' }} title="Personal Carriage" />
                                ) : null}
                                {item[12] === "Y" ? (
                                  <FaTruck size={22} fill="orange" style={{ marginRight: '10px' }} title="Special Carting" />
                                ) : null}
                                {item[13] === "Y" ? (
                                  <FaTruckLoading size={22} fill="orange" style={{ marginRight: '10px' }} title="Heavy Carriage" />
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
                                    <button className="dropdown-item" onClick={() => { printBarcode(item[1], item[2], item[5], item[3], item[14], "N", "1232") }}>
                                      <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />Print SER
                                    </button>
                                  </li>


                                  {/* Reverse Parcel */}


                                  {(item[8] === 'Handed over to Carting Agent' || item[8] === 'Exit from DGDC SEEPZ Gate' || item[8] === 'Entry at DGDC Cargo GATE' || item[8] === 'Handed over to DGDC Cargo') && (userType === 'SEEPZ Custodian' || userType === 'ROLE_ADMIN') && (

                                    <li>
                                      <button className="dropdown-item" onClick={() => { reverseToStock(item[0], item[1], item[2], item[4], item[8]) }}>
                                        <FontAwesomeIcon icon={faBan} style={{ marginRight: '5px', color: 'red' }} />Reverse Parcel to Stock
                                      </button>
                                    </li>
                                  )}

                                  {/* Add  to existing Tp and Pctm */}
                                  {(item[8] === 'Handed over to DGDC SEEPZ' && (userType === 'SEEPZ Custodian' || userType === 'ROLE_ADMIN') && item[10] !== 'Y') && (<li>
                                    <button className="dropdown-item" onClick={() => { addToExistingTrip(item[0], item[1], item[2], item[4], item[8], item[15]) }}>
                                      <FontAwesomeIcon icon={faAd} style={{ marginRight: '5px' }} />Add  to existing Tp and Pctm
                                    </button>
                                  </li>
                                  )}






                                  <li>
                                    <button className="dropdown-item" onClick={() => openModalforViewall(item[0], item[1])}>
                                      <FontAwesomeIcon icon={faExternalLinkAlt} style={{ marginRight: "5px" }} />View Export Details
                                    </button>
                                  </li>
                                  {item[10] === 'N' && (
                                    <li>
                                      <button className="dropdown-item" onClick={() => fetchHoldData(companyid, branchId, item[0], item[1])}>
                                        <FontAwesomeIcon icon={faHand} style={{ marginRight: "5px" }} />Hold Parcel
                                      </button>
                                    </li>
                                  )}
                                  {item[10] === 'Y' && (
                                    <li>
                                      <button className="dropdown-item" onClick={() => fetchUnHoldData(companyid, branchId, item[0], item[1])}>
                                        <FontAwesomeIcon icon={faHandFist} style={{ marginRight: "5px" }} />Unhold Parcel
                                      </button>
                                    </li>
                                  )}
                                  {(item[8] === 'Handed over to DGDC SEEPZ' && item[7] === 'Allow Export' && item[10] !== 'Y') && (
                                    <li>
                                      <button className="dropdown-item" hidden={item[8] === 'Handed over to Carting Agent'} onClick={() => openModalforCartingAgent(item[0], item[1])}>
                                        <FontAwesomeIcon icon={faArrowTurnRight} style={{ marginRight: "5px" }} />Handover to Carting Agent
                                      </button>
                                    </li>
                                  )}
                                  <li>
                                    <button className="dropdown-item" onClick={() => openModalforsetOverideNSDl(item[0], item[1], item[7])}>
                                      <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />Override NSDL Status
                                    </button>
                                  </li>
                                  <li>
                                    <button className="dropdown-item" onClick={() => openModal1(item[0], item[1])}>
                                      <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />Update Airway Bill Number
                                    </button>
                                  </li>
                                  <li>
                                    <button className="dropdown-item" onClick={() => openEPCopy(item[0], item[1])}>
                                      <FontAwesomeIcon icon={faUpload} style={{ marginRight: "5px" }} />Upload EP Copy
                                    </button>
                                  </li>
                                  <li>
                                    <button className="dropdown-item" onClick={() => openModalforHeavyParcel(item[0], item[1])}>
                                      <FontAwesomeIcon icon={faWeightHanging} style={{ marginRight: "5px" }} />Tag Heavy Parcel
                                    </button>
                                  </li>
                                  <li>
                                    <button className="dropdown-item" onClick={() => openModalforEditexport(item[0], item[1])}>
                                      <FontAwesomeIcon icon={faPenClip} style={{ marginRight: "5px" }} />Update Export Details
                                    </button>
                                  </li>
                                  {item[12] === 'N' && (
                                    <li>
                                      <button className="dropdown-item" onClick={() => fetchSpecialData(companyid, branchId, item[0], item[1])}>
                                        <FontAwesomeIcon icon={faTruckArrowRight} style={{ marginRight: "5px" }} />Request Special Carting
                                      </button>
                                    </li>
                                  )}
                                  {item[12] === 'Y' && (
                                    <li>
                                      <button className="dropdown-item" onClick={() => fetchCancelSpecialData(companyid, branchId, item[0], item[1])}>
                                        <FontAwesomeIcon icon={faXmark} style={{ marginRight: "5px" }} />Cancel Special Carting
                                      </button>
                                    </li>
                                  )}
                                  {item[11] === 'N' && (
                                    <li>
                                      <button className="dropdown-item" onClick={() => fetchPCData(companyid, branchId, item[0], item[1])}>
                                        <FontAwesomeIcon icon={faPersonBooth} style={{ marginRight: "5px" }} />Request Personal Carriage
                                      </button>
                                    </li>
                                  )}
                                  {item[11] === 'Y' && (
                                    <li>
                                      <button className="dropdown-item" onClick={() => openModalforexportpc(item[0], item[1])}>
                                        <FontAwesomeIcon icon={faIdCardClip} style={{ marginRight: "5px" }} />Personal Information
                                      </button>
                                    </li>
                                  )}
                                  {item[11] === 'Y' && (
                                    <li>
                                      <button className="dropdown-item" onClick={() => fetchCancelPCData(companyid, branchId, item[0], item[1])}>
                                        <FontAwesomeIcon icon={faXmark} style={{ marginRight: "5px" }} />Cancel Personal Carriage
                                      </button>
                                    </li>
                                  )}
                                  {item[8] === 'Entry at DGDC SEEPZ Gate' && (
                                    <li>
                                      <button className="dropdown-item" onClick={() => fetchProvisionalSER(companyid, branchId, item[0], item[1], userId)}>
                                        <FontAwesomeIcon icon={faGear} style={{ marginRight: "5px" }} />Generate Provisional SER                  </button>
                                    </li>
                                  )}
                                  <li>
                                    <button className="dropdown-item" onClick={() => openModalforImposePenalty(item[0], item[1])}>
                                      <FontAwesomeIcon icon={faGavel} style={{ marginRight: "5px" }} />Impose Penalty
                                    </button>
                                  </li>
                                  <li>
                                    <button className="dropdown-item" onClick={() => openModalforEditexport(item[0], item[1])}>
                                      <FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />Edit
                                    </button>
                                  </li>
                                  <li>
                                    <button className="dropdown-item" onClick={() => openModalforbacktotown(item[0], item[1])}>
                                      <FontAwesomeIcon icon={faCity} style={{ marginRight: "5px" }} />Back To Town
                                    </button>
                                  </li>
                                  <li>
                                    <button className="dropdown-item" onClick={() => updateNSDlStatus(item[0], item[1])}>
                                      <FontAwesomeIcon icon={faPenFancy} style={{ marginRight: "5px" }} />Update NSDL Status
                                    </button>
                                  </li>
                                  {item[8] === 'Handed over to DGDC SEEPZ' && (
                                    <li>
                                      <button className="dropdown-item" onClick={() => openModalforCancelParcel(item[0], item[1])}>
                                        <FontAwesomeIcon icon={faXmarkCircle} style={{ marginRight: "5px" }} />Cancel Parcel
                                      </button>
                                    </li>
                                  )

                                  }
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
          </>
        )

      }




      <Modal
        Modal isOpen={showModal} onClose={handleClose} toggle={handleClose}

        style={{ maxWidth: '1150px', overflow: '-moz-hidden-unscrollable' }}
      >
        <ModalHeader toggle={handleClose} style={{
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
          />Handover to Carting Agent</h5>

        </ModalHeader>

        <div style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>

          {handedOverdata1.length > 0 && (
            <div className="table-responsive custom-table-container table-section mt-4">
              <Table className="table table-striped table-hover">
                <thead>
                  <tr>

                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      Request ID
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      SB No.
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      SB Date
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      SER No.
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      Exporter
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      Packages
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      Gross Weight
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      DGDC Status
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      NSDL Status
                    </th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {handedOverdata1.map((item, index) => (
                    <tr key={index}>

                      <td>{item.sbRequestId}</td>
                      <td>{item.sbNo}</td>
                      <td>{formatDateTime(item.sbDate)}</td>
                      <td>{item.serNo}</td>
                      <td>{getpartyId[item.nameOfExporter]}</td>
                      <td>{item.noOfPackages}</td>
                      <td>{item.grossWeight}</td>
                      <td>{item.dgdcStatus}</td>
                      <td>{item.nsdlStatus}</td>
                      <td><h6 style={{ color: 'red' }}>AWB Not Scanned</h6></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )

          }

          <div className="table-responsive custom-table-container table-section mt-4">
            <Table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                    <input type="checkbox" onChange={handleSelectAll2}
                      checked={selectAll2} />
                  </th>
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                    Request ID
                  </th>
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                    SB No.
                  </th>
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                    SB Date
                  </th>
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                    SER No.
                  </th>
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                    Exporter
                  </th>
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                    Packages
                  </th>
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                    Gross Weight
                  </th>
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                    DGDC Status
                  </th>
                  <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                    NSDL Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {handoverdata.map((item, index) => (
                  <tr key={index}>
                    <td><input onChange={() => handleCheckboxChange3(item)}
                      checked={selectedRows2.includes(item)} type="checkbox" /></td>
                    <td>{item.sbRequestId}</td>
                    <td>{item.sbNo}</td>
                    <td>{formatDateTime(item.sbDate)}</td>
                    <td>{item.serNo}</td>
                    <td>{getpartyId[item.nameOfExporter]}</td>
                    <td>{item.noOfPackages}</td>
                    <td>{item.grossWeight}</td>
                    <td>{item.dgdcStatus}</td>
                    <td>{item.nsdlStatus}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <hr />
          <div >
            <Row>
              <Col md={4}>

                <span style={{ marginLeft: 20 }}><b>Total SB No : {handoverdata.map((item) => item.sbNo).length}</b></span>

              </Col>
              <Col className="text-center" md={4}>
                <span style={{ marginLeft: 20 }}><b>Selected SB No : {selectedRows2.length}</b></span>

              </Col>
              <Col md={4}>
                <span style={{ float: 'inline-end', marginRight: 20 }} className="text-end"><b>Total No. Of Packages : {handoverdata.reduce((total, item) => total + item.noOfPackages, 0)}</b></span>

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
                          Select Carting Agent
                        </Label>
                        <select
                          id="hold"
                          className="form-control form-select"
                          required
                          name="packageNumber"
                          onChange={handlegetsinglecarting}
                        >
                          <option value="No">Select Carting Agent</option>
                          {allCartingagent.map((data, index) => (
                            <option value={data.externaluserId}>{data.userName}</option>
                          ))}
                        </select>
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
                          onChange={handlecartingrepresent}
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
                            onClick={checkotp1}
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

      </Modal>





      <Modal Modal isOpen={isModalOpenViewall} onClose={closeMoalforviewall} toggle={closeMoalforviewall} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeMoalforviewall} style={{
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
            icon={faIdCardClip}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Export Details</h5>

        </ModalHeader>
        <ModalBody>
          <div >
            <Row>
              <Col md={4} >
                <FormGroup>
                  <Label className="forlabel" for="branchId">SB Request ID</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.sbRequestId}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">SB No.</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.sbNo}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">SB Date</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={formatDateTime(viewAlldata.sbDate)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">IEC</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.iecCode}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Entity ID</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.entityId}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Name Of Exporter</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={getpartyId[viewAlldata.nameOfExporter]}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">SER No.</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.serNo}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Gross Weight</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.grossWeight}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">UOM Gross Weight</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.uomGrossWeight}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Country Of Destination</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.countryOfDestination}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Port Of Destination</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.portOfDestination}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Airway Bill No.</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.airwayBillNo}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Description Of Goods</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.descriptionOfGoods}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">NSDL Status</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.nsdlStatus}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">DGDC Status</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.dgdcStatus}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">CHA No.</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.chaNo}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">CHA Name</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.chaName}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Console Agent</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={getConsoleId[viewAlldata.consoleAgent]}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">FOB Value in INR</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.fobValueInINR}
                  />
                </FormGroup>
              </Col>
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
                    value={viewAlldata.noOfPackages}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">UOM Of Packages</Label>
                  <Input
                    type="text"
                    name="requestId"
                    id="branchname"
                    readOnly
                    className="inputField"

                    maxLength={30}
                    value={viewAlldata.uomOfPackages}
                  />
                </FormGroup>
              </Col>
            </Row>

          </div>
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
          /> Override NSDL Status</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >

          <Row>
            <Col md={6} >
              <FormGroup>
                <Label className="forlabel" for="branchId">Current NSDL Status</Label>
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
                <Label className="forlabel" for="branchId">New NSDL Status </Label>
                <select
                  id="representative"
                  name="nsdlStatus"
                  className="form-control form-select"
                  onChange={handleOverrideChange}
                  value={OverideNSDl.nsdlStatus}
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
              >
                <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                Submit
              </Button>
            </Col>
          </Row>

        </ModalBody>
      </Modal>



      {/* Document Show  */}

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




      <Modal Modal isOpen={isModalOpenforCartingAgent} onClose={closeMoalforCartingAgent} toggle={closeMoalforCartingAgent} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeMoalforCartingAgent} style={{
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
          /> Handover to Carting Agent</h5>

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
                        <Label className="forlabel" for="branchId">Select Carting Agent</Label>
                        <select
                          id="hold"
                          className="form-control form-select"
                          required
                          name="packageNumber"
                          onChange={handlegetsinglecha}
                        >
                          <option value="No">Select Carting Agent</option>
                          {allcartingagent.map((data, index) => (
                            <option value={data.externaluserId}>{data.userName}</option>
                          ))}
                        </select>

                      </FormGroup>
                    </Col>
                    <Col md={6}>
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
                            value={getotpapprove}
                          />
                          <span hidden ref={approvedByOTPSpanRef}>{representData.mobile}</span>

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

                    <Col md={6}>
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
              <Button onClick={handleVerifCHAyOTP} variant="outline-primary">
                <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                SUBMIT
              </Button>
            </Col>
          </Row>

        </ModalBody>
      </Modal>


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
                    <Button onClick={CancelParceldemo} variant="outline-success">
                      <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                      Submit
                    </Button>
                  </Col>
                )}

                {cancelParceldata.cancelStatus === 'Y' && (
                  <Col className="text-center">
                    <Button style={{ marginRight: 10 }} onClick={removecancelParceldemo} variant="danger">
                      <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                      REMOVE
                    </Button>
                    <Button onClick={UpdatecancelParceldemo} variant="danger">
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


      <Modal
        isOpen={isModalOpenforreceivefromcartingagent}
        onClose={closeMoalforreceivefromcartingagent}
        toggle={closeMoalforreceivefromcartingagent}
        style={{ maxWidth: '1150px', overflow: '-moz-hidden-unscrollable' }}
      >
        <ModalHeader toggle={closeMoalforreceivefromcartingagent} style={{
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
            icon={faArrowCircleRight}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Receive from carting agent</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>

          {receivealldata.length === 0 && (
            <Row>
              <Col md={4} >
                <FormGroup>
                  <Label for="search" className="forlabel">
                    Select Carting Agent
                  </Label>
                  <select
                    id="hold"
                    className="form-control form-select"
                    required
                    name="packageNumber"
                    onChange={handlegetsinglecarting}
                  >
                    <option value="No">Select Carting Agent</option>
                    {allCartingagent.map((data, index) => (
                      <option value={data.externaluserId}>{data.userName}</option>
                    ))}
                  </select>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="search" className="forlabel">
                    Select Representative
                  </Label>
                  <select
                    id="hold"
                    className="form-control form-select"
                    onChange={handlecartingrepresent}
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
              <Col md={4} style={{ marginTop: 32 }}>
                <Button onClick={getReceiveData} variant="outline-primary">
                  <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                  Search
                </Button>
              </Col>
            </Row>
          )}

          {receivealldata.length > 0 && (
            <span>

              <Row>
                <div className="table-responsive custom-table-container table-section">
                  <Table rules="all" responsive className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          <input type="checkbox" onChange={handleSelectAll}
                            checked={selectAll} />
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          Request ID
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          SB No.
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          SB Date
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          SER No.
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          Exporter
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          Packages
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          Gross Weight
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          DGDC Status
                        </th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          NSDL Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {receivealldata.map((item, index) => (
                        <tr key={index}>
                          <td><input onChange={() => handleCheckboxChange1(item)}
                            checked={selectedRows.includes(item)} type="checkbox" /></td>
                          <td>{item.sbRequestId}</td>
                          <td>{item.sbNo}</td>
                          <td>{item.sbDate}</td>
                          <td>{item.serNo}</td>
                          <td>{getpartyId[item.nameOfExporter]}</td>
                          <td>{item.noOfPackages}</td>
                          <td>{item.grossWeight}</td>
                          <td>{item.dgdcStatus}</td>
                          <td>{item.nsdlStatus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Row>
              <div >
                <span style={{ marginLeft: 20 }}><b>Total SB No : {receivealldata.map((item) => item.sbNo).length}</b></span>
                <span style={{ float: 'inline-end', marginRight: 20 }} className="text-end"><b>Total No. Of Packages : {receivealldata.reduce((total, item) => total + item.noOfPackages, 0)}</b></span>
              </div>
              <Card style={{ backgroundColor: "#F8F8F8" }}>
                <CardBody>
                  <Row>
                    <Col md="3">
                      {/* Left side image */}
                      {im3 === 'Y' ? (
                        <img src={imageData3.url} className="image-column1 rounded-image2" />
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
                            <Label className="forlabel" for="branchId">Select Carting Agent</Label>
                            <Input
                              type="text"
                              name="importType"
                              id="branchname"
                              readOnly
                              className="inputField"
                              value={getCartingName[getsinglecarting]}
                              style={{ backgroundColor: '#E0E0E0' }}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6} >
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Select Representative</Label>
                            <Input
                              type="text"
                              name="importType"
                              id="branchname"
                              readOnly
                              className="inputField"
                              value={getRepresentName[selectRepresentdataa]}
                              style={{ backgroundColor: '#E0E0E0' }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} >
                          <FormGroup>
                            <Label className="forlabel" for="branchId">Mobile No</Label>
                            <span className="d-flex align-items-center">
                              <Input
                                type="text"
                                name="importType"
                                id="branchname"
                                className="inputField"
                                value={getrepresentData.mobile}
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
                              onChange={handleOtp}
                              className="inputField"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "4%" }}>
                    <Col className="text-center">
                      <Button onClick={handleSubmit1} variant="outline-success">
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </span>
          )}

        </ModalBody>
      </Modal>




      <Modal Modal isOpen={isModalOpenforhandoverairline} onClose={closeMoalforhandoverairline} toggle={closeMoalforhandoverairline} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeMoalforhandoverairline} style={{
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
            icon={faArrowTurnRight}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          />  Handover to Airline</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>

          <Row>
            <Col md={6} >
              <FormGroup>
                {/* <Label for="search" className="forlabel">
                    Select Representative
                  </Label> */}
                <select
                  id="hold"
                  className="form-control form-select"

                  required
                  name="exporter"
                  onChange={handleairname}
                  value={airname}
                >

                  <option value="No">Select Airline</option>
                  {getAllFlight.map((item, index) => (
                    <option value={item.airlineCode}>{item.airlineName}</option>
                  ))}
                </select>
              </FormGroup>
            </Col>
            <Col md={6}>
              <Button onClick={getExportAirlinewiselist} variant="outline-primary">
                <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                Search
              </Button>
            </Col>
          </Row>
          {getexportdatabyairline.length > 0 && (


            <span>
              <Row>
                <Table rules="all" responsive className="table table-bordered custom-table">
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                        <input type="checkbox" onChange={handleSelectAll1}
                          checked={selectAll1} />
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
                        <td><input type="checkbox" onChange={() => handleCheckboxChange2(item)}
                          checked={selectedRows1.includes(item)} /></td>
                        <td>{index + 1}</td>
                        <td>{item.serNo}</td>
                        <td>{item.airwayBillNo}</td>
                        <td>{item.sbNo}</td>
                        <td>{item.portOfDestination}</td>
                        <td>{getpartyId[item.nameOfExporter]}</td>
                        <td>{item.noOfPackages}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="text-end" colSpan={7}>Selected Packages : </td>
                      <td>{selectedRows1.reduce((total, item) => total + item.noOfPackages, 0)}</td>
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
              </Row>
              <Row>
                <Col className="text-center">
                  <Button onClick={handleSubmit2} variant="outline-success">
                    <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                    Submit
                  </Button>
                </Col>
              </Row>
            </span>
          )}

        </ModalBody>
      </Modal>

      <Modal Modal isOpen={isModalOpenforexportpc} onClose={closeMoalforexportpc} toggle={closeMoalforexportpc} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeMoalforexportpc} style={{
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
          Personal Details
        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <div style={{ backgroundColor: "#F8F8F8" }}>
            <Row className="text-start">
              <h4>Passenger Details:</h4>
            </Row>
            <hr />
            <Row>
              <Col>
                {/* Passenger Name Input */}
                <FormGroup>
                  <Label className="forlabel" for="passengerName">Passenger Name</Label>
                  <Input
                    type="text"
                    onChange={handlePCChange}
                    value={pcdata.passengerName}
                    name="passengerName"
                    id="passengerName"
                    className="inputField"
                  />
                </FormGroup>
              </Col>
              <Col>
                {/* Address Input */}
                <FormGroup>
                  <Label className="forlabel" for="address">Address</Label>
                  <Input
                    type="textarea"
                    onChange={handlePCChange}
                    value={pcdata.address}
                    name="address"
                    id="address"
                    className="inputField"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* Passport No Input */}
                <FormGroup>
                  <Label className="forlabel" for="passportNo">Passport No</Label>
                  <Input
                    type="text"
                    onChange={handlePCChange}
                    value={pcdata.passportNo}
                    name="passportNo"
                    id="passportNo"
                    className="inputField"
                  />
                </FormGroup>
              </Col>
              <Col>
                {/* Flight No Input */}
                <FormGroup>
                  <Label className="forlabel" for="flightNo">Flight No</Label>
                  <Input
                    type="text"
                    name="flightNo"
                    onChange={handlePCChange}
                    value={pcdata.flightNo}
                    id="flightNo"
                    className="inputField"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* Flight Date Input */}
                <FormGroup>
                  <Label className="forlabel" for="flightDate">Flight Date</Label>
                  <DatePicker
                    selected={pcdata.flightDate} // Set the selected date to BillGDate
                    onChange={(date) => {
                      if (date) {
                        setpcdata({ ...pcdata, flightDate: date });
                      } else {
                        setpcdata({ ...pcdata, flightDate: null });
                      }
                    }}
                    dateFormat="dd/MM/yyyy"
                    value={pcdata.flightDate}
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: '100%' }} />}
                    wrapperClassName="custom-react-datepicker-wrapper"


                  />
                </FormGroup>
              </Col>
              <Col>
                {/* Nationality Input */}
                <FormGroup>
                  <Label className="forlabel" for="nationality">Nationality</Label>
                  <Input
                    type="text"
                    name="nationality"
                    onChange={handlePCChange}
                    value={pcdata.nationality}
                    id="nationality"
                    className="inputField"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="text-start">
              <h4>Custom Officer Details:</h4>
            </Row>
            <hr />
            <Row>
              <Col>
                {/* Deputed Customs Officer Name Input */}
                <FormGroup>
                  <Label className="forlabel" for="customsOfficerName">Deputed Customs Officer Name</Label>
                  <Input
                    type="text"
                    name="deputedCustomsOfficerName"
                    id="customsOfficerName"
                    className="inputField"
                    onChange={handlePCChange}
                    value={pcdata.deputedCustomsOfficerName}
                  />
                </FormGroup>
              </Col>
              <Col>
                {/* Deputed Customs Officer Designation Input */}
                <FormGroup>
                  <Label className="forlabel" for="customsOfficerDesignation">Deputed Customs Officer Designation</Label>
                  <Input
                    type="text"
                    name="deputedCustomsOfficerDesignation"
                    id="customsOfficerDesignation"
                    onChange={handlePCChange}
                    value={pcdata.deputedCustomsOfficerDesignation}
                    className="inputField"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* Deputed From Destination Input */}
                <FormGroup>
                  <Label className="forlabel" for="deputedFromDestination">Deputed From Destination</Label>
                  <Input
                    type="text"
                    name="deputedFromDestination"
                    id="deputedFromDestination"
                    className="inputField"
                    onChange={handlePCChange}
                    value={pcdata.deputedFromDestination}
                  />
                </FormGroup>
              </Col>
              <Col>
                {/* Deputed To Destination Input */}
                <FormGroup>
                  <Label className="forlabel" for="deputedToDestination">Deputed To Destination</Label>
                  <Input
                    type="text"
                    name="deputedToDestination"
                    id="deputedToDestination"
                    onChange={handlePCChange}
                    value={pcdata.deputedToDestination}
                    className="inputField"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* Date Of Escort Input */}
                <FormGroup>
                  <Label className="forlabel" for="dateOfEscort">Date Of Escort</Label>
                  <DatePicker
                    selected={pcdata.dateOfEscort} // Set the selected date to BillGDate
                    onChange={(date) => {
                      if (date) {
                        setpcdata({ ...pcdata, dateOfEscort: date });
                      } else {
                        setpcdata({ ...pcdata, dateOfEscort: null });
                      }
                    }}
                    dateFormat="dd/MM/yyyy"
                    value={pcdata.dateOfEscort}
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: '100%' }} />}
                    wrapperClassName="custom-react-datepicker-wrapper"


                  />
                </FormGroup>
              </Col>
              <Col>
                {/* Approver Name Input */}
                <FormGroup>
                  <Label className="forlabel" for="approverName">Approver Name</Label>
                  <Input
                    type="text"
                    name="approverName"
                    id="approverName"
                    className="inputField"
                    onChange={handlePCChange}
                    value={pcdata.approverName}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* Approver Designation Input */}
                <FormGroup>
                  <Label className="forlabel" for="approverDesignation">Approver Designation</Label>
                  <Input
                    type="text"
                    name="approverDesignation"
                    id="approverDesignation"
                    className="inputField"
                    onChange={handlePCChange}
                    value={pcdata.approverDesignation}
                  />
                </FormGroup>
              </Col>
              <Col>
                {/* Approver Date Input */}
                <FormGroup>
                  <Label className="forlabel" for="approverDate">Approver Date</Label>
                  <DatePicker
                    selected={pcdata.approverDate} // Set the selected date to BillGDate
                    onChange={(date) => {
                      if (date) {
                        setpcdata({ ...pcdata, approverDate: date });
                      } else {
                        setpcdata({ ...pcdata, approverDate: null });
                      }
                    }}
                    dateFormat="dd/MM/yyyy"
                    value={pcdata.approverDate}
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: '100%' }} />}
                    wrapperClassName="custom-react-datepicker-wrapper"


                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="text-end" style={{ marginTop: 5 }}>
                {/* Confirmation Checkbox */}
                <Input
                  style={{ height: 20, width: 20, marginRight: 5 }}
                  type="checkbox"
                  name="confirmation"
                  checked={isConfirmed}
                  onChange={handleCheckboxChangee}
                  id="confirmation"

                  className="inputField"
                />
                <Label className="forlabel" for="confirmation">Confirmation</Label>
                <Button onClick={handlePCSubmit} style={{ marginRight: 10, marginLeft: 10 }} variant="outline-success">
                  <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                  Submit
                </Button>
                <Button variant="outline-primary">
                  <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                  Print
                </Button>
              </Col>
            </Row>
          </div>

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
                {exHistoryList.map((item, index) => (
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

      <Modal Modal isOpen={isModalOpenforEditexport} onClose={closeMoalforEditexport} toggle={closeMoalforEditexport} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeMoalforEditexport} style={{
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
            icon={faPencil}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          />Update Export Details</h5>

        </ModalHeader>
        <ModalBody>
          <div style={{ backgroundColor: "#F8F8F8" }}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="sbRequestId">SB Request Id<span style={{ color: 'red' }}>*</span></Label>
                  <Input
                    type="text"
                    name="sbRequestId"
                    id="sbRequestId"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.sbRequestId}
                    readOnly
                    style={{ backgroundColor: '#E0E0E0' }}
                  />
                </FormGroup>
                <div style={{ color: 'red' }} className="error-message">{formErrors.sbRequestId}</div>

              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="sbNo">SB No<span style={{ color: 'red' }}>*</span></Label>
                  <Input
                    type="text"
                    name="sbNo"
                    id="sbNo"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.sbNo}
                    readOnly
                    style={{ backgroundColor: '#E0E0E0' }}
                  />
                </FormGroup>
                <div style={{ color: 'red' }} className="error-message">{formErrors.sbNo}</div>

              </Col>
              <Col md={4}>
                <Label className="forlabel bold-label" htmlFor="sbDate">
                  SB Date<span style={{ color: 'red' }}>*</span>
                </Label>


                <DatePicker
                  selected={editdata.sbDate}
                  onChange={handleEditChange}
                  minDate={today}
                  id="sbDate"
                  readOnly

                  dateFormat="dd/MM/yyyy"
                  name="sbDate"
                  className="form-control"

                  wrapperClassName="custom-react-datepicker-wrapper"
                  customInput={
                    <input
                      style={{
                        height: "38px",
                        width: "100%",
                        backgroundColor: '#E0E0E0'
                      }}
                    />

                  }

                />
                <div style={{ color: 'red' }} className="error-message">{formErrors.sbDate}</div>


              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="airlineName">Airline Name</Label>
                  <Input
                    type="text"
                    name="airlineName"
                    id="airlineName"
                    className="inputField"
                    readOnly
                    style={{ backgroundColor: '#E0E0E0' }}

                    value={getSingleairlinename}
                  />
                </FormGroup>
                <span hidden ref={createBySpanRef}>{getAirlineName.airlineName}</span>
              </Col>
              <Col md={4}>
                <FormGroup>

                  <Label className="forlabel bold-label" htmlFor="entityId">
                    Flight No.<span style={{ color: 'red' }}>*</span>
                  </Label>
                  <select
                    id="airlineCode"
                    className="form-control form-select"
                    onChange={handleEditChange}
                    value={editdata.airlineCode}

                    name="airlineCode"

                  >
                    <option value="No">Select Flight No</option>
                    {getAllFlight.map((item, index) => (
                      <option value={item.airlineCode}>{item.flightNo}</option>
                    ))}

                  </select>
                  <div style={{ color: 'red' }} className="error-message">{formErrors.airlineCode}</div>

                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel bold-label" htmlFor="flightDate">
                    Flight Date<span style={{ color: 'red' }}>*</span>
                  </Label>


                  <DatePicker
                    selected={editdata.flightDate}

                    minDate={today}
                    id="flightDate"
                    name="flightDate"
                    dateFormat="dd/MM/yyyy"
                    onChange={handleFlightDateChange}
                    value={editdata.flightDate}
                    className="form-control"
                    wrapperClassName="custom-react-datepicker-wrapper"
                    customInput={
                      <input
                        style={{
                          height: "38px",
                          width: "100%",

                        }}
                      />

                    }

                  />
                  <div style={{ color: 'red' }} className="error-message">{formErrors.flightDate}</div>

                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="iecCode">IEC Code</Label>
                  <Input
                    type="text"
                    name="iecCode"
                    id="iecCode"
                    className="inputField"
                    onChange={handleEditChange}
                    value={getSingleieccode}
                    readOnly
                    style={{ backgroundColor: '#E0E0E0' }}
                  />
                </FormGroup>
                <span hidden ref={createIECBySpanRef}>{allpartydata.iecNo}</span>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="entityId">Entity Id</Label>
                  <Input
                    type="text"
                    name="entityId"
                    id="entityId"
                    className="inputField"
                    onChange={handleEditChange}
                    value={getSingleentity}
                    readOnly
                    style={{ backgroundColor: '#E0E0E0' }}
                  />
                  <span hidden ref={createEntityBySpanRef}>{allpartydata.entityId}</span>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>

                  <Label className="forlabel bold-label" htmlFor="entityId">
                    Name Of Exporter.<span style={{ color: 'red' }}>*</span>
                  </Label>
                  <select
                    id="flightNo"
                    className="form-control form-select"

                    onChange={handleEditChange}
                    value={editdata.nameOfExporter}
                    name="nameOfExporter"

                  >
                    <option value="">Select Exporter</option>
                    {partys.map((data, index) => (
                      <option key={index} value={data.partyId}>{data.partyName}</option>
                    ))}
                  </select>
                  <div style={{ color: 'red' }} className="error-message">{formErrors.nameOfExporter}</div>

                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="serNo">SER No</Label>
                  <Input
                    type="text"
                    name="serNo"
                    id="serNo"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.serNo}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="grossWeight">Gross Weight</Label>
                  <Input
                    type="text"
                    name="grossWeight"
                    id="grossWeight"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.grossWeight}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="uomGrossWeight">UOM Gross Weight</Label>
                  <Input
                    type="text"
                    name="uomGrossWeight"
                    id="uomGrossWeight"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.uomGrossWeight}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="approverDesignation">Country Of Destination</Label>
                  <Input
                    type="text"
                    name="countryOfDestination"
                    id="countryOfDestination"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.countryOfDestination}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="portOfDestination">Port Of Destination</Label>
                  <Input
                    type="text"
                    name="portOfDestination"
                    id="portOfDestination"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.portOfDestination}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="airwayBillNo">Airway Bill No</Label>
                  <Input
                    type="text"
                    name="airwayBillNo"
                    id="airwayBillNo"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.airwayBillNo}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="descriptionOfGoods">Description Of Goods</Label>
                  <Input
                    type="text"
                    name="descriptionOfGoods"
                    id="descriptionOfGoods"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.descriptionOfGoods}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="nsdlStatus">NSDL Status<span style={{ color: 'red' }}>*</span></Label>
                  <Input
                    type="text"
                    name="nsdlStatus"
                    id="nsdlStatus"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.nsdlStatus}
                    readOnly
                    style={{ backgroundColor: '#E0E0E0' }}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="dgdcStatus">DGDC Status<span style={{ color: 'red' }}>*</span></Label>
                  <Input
                    type="text"
                    name="dgdcStatus"
                    id="dgdcStatus"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.dgdcStatus}
                    readOnly
                    style={{ backgroundColor: '#E0E0E0' }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="chaNo">CHA No</Label>
                  <Input
                    type="text"
                    name="chaNo"
                    id="chaNo"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.chaNo}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="chaName">CHA Name</Label>
                  <Input
                    type="text"
                    name="chaName"
                    id="approverDesignation"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.chaName}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="consoleAgent">Console Agent</Label>
                  <select
                    id="flightNo"
                    className="form-control form-select"

                    onChange={handleEditChange}
                    value={editdata.consoleAgent}
                    name="consoleAgent"

                  >

                    <option value="">Select Console</option>
                    {getConsoleData.map((item) => (
                      <option value={item.externaluserId}>
                        {item.userName}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="fobValueInINR">FOB Value In INR</Label>
                  <Input
                    type="text"
                    name="fobValueInINR"
                    id="approverDesignation"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.fobValueInINR}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="noOfPackages">No Of Packages</Label>
                  <Input
                    type="number"
                    name="noOfPackages"
                    id="approverDesignation"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.noOfPackages}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="uomOfPackages">UOM Of Packages</Label>
                  <Input
                    type="text"
                    name="uomOfPackages"
                    id="approverDesignation"
                    className="inputField"
                    onChange={handleEditChange}
                    value={editdata.uomOfPackages}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button onClick={handleEditSubmit} variant="outline-success">
                  <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                  Submit
                </Button>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>


      <Modal Modal isOpen={isModalOpen1} onClose={closeModal1} toggle={closeModal1} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }
      } >
        <ModalHeader toggle={closeModal1} style={{
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
            icon={faEdit}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Update Airway Bill Number</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>

          <Row>
            <Col md={8}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Airline</Label>
                <select
                  id="airlineCode"
                  className="form-control"
                  name="airlineCode"
                  onChange={handleAirwayChange}
                  value={updateAirline.airlineCode}
                >
                  <option value="">Select Airline</option>
                  {getAllFlight.map((data, index) => (
                    <option key={index} value={data.airlineCode}>{data.airlineName}</option>
                  ))}
                </select>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Number</Label>
                <Input
                  type="text"
                  name="airlineCode"
                  id="airlineCode"
                  maxLength={30}
                  required
                  value={updateAirline.airlineCode}
                  className="inputField"

                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Airway Bill Number</Label>
                <Input
                  type="text"
                  name="airwayBillNo"
                  id="airwayBillNo"
                  maxLength={30}
                  required
                  onChange={handleAirwayChange}
                  value={updateAirline.airwayBillNo}
                  className="inputField"

                />
              </FormGroup>
            </Col>
            <Col className="text-center" style={{ marginTop: 34 }} >
              <h4>OR</h4>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Scan Airway Bill Number</Label>
                <input
                  type="text"
                  onChange={(e) => setAirway(e.target.value)}
                  value={getAirway}
                  ref={inputRef1}
                  style={{ height: '38px', borderRadius: 4 }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Button onClick={handleAirlineSubmit} variant="outline-success">
                Submit
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>

      {/* Redeposit Model */}

      <Modal
        isOpen={isModalOpenforRedeposite}
        toggle={closeMoalforRedeposite}
        style={{ maxWidth: "800px", wioverflow: "-moz-hidden-unscrollable" }}
      >
        <ModalHeader
          toggle={closeMoalforRedeposite}
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
            //backgroundPosition: 'center',
            backgroundPosition: "center",
          }}
        >
          <h5 className="pageHead" style={{ fontFamily: "Your-Heading-Font" }}>
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              style={{ marginRight: "5px" }}
            />
            Redeposit
          </h5>
        </ModalHeader>
        <ModalBody
          style={{
            backgroundImage:
              "url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)",
            backgroundSize: "cover",
          }}
        >
          <Row>
            <Col md={4}>
              <FormGroup>
                <label className="forlabel" htmlFor="Heavy">
                  Date
                </label>
                <DatePicker
                  selected={selectedSerDate}
                  wrapperClassName="custom-react-datepicker-wrapper"
                  onChange={handleDateChange}
                  value={selectedSerDate}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  customInput={<input style={{ width: "100%" }} />}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <label className="forlabel" htmlFor="Heavy">
                  Select Airline
                </label>
                <select
                  id="hold"
                  className="form-control form-select"
                  required
                  name="exporter"
                  onChange={handleairname}
                  value={airname}
                >
                  <option value="No">Select Airline</option>
                  {getAllFlight.map((item, index) => (
                    <option value={item.airlineCode}>{item.airlineName}</option>
                  ))}
                </select>
              </FormGroup>
            </Col>
            <Col md={4} style={{ paddingTop: 27 }}>
              <Button
                color="success"
                outline
                variant="outline-primary"
                onClick={handleSearchForSerDataData}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ marginRight: "5px" }}
                />
                SEARCH
              </Button>
            </Col>
          </Row>
          <div>
            {showExportSerAndAirlineDataTable ? (

              <div className="table-responsive">
                <Table
                  className="table table-striped table-hover"
                  style={{ marginTop: 9 }}
                >
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#BADDDA" }} scope="col">
                        <input
                          type="checkbox"
                          onChange={handleSelectAllForRedeposite}
                          checked={selectAllRedeposite}
                        />
                      </th>
                      <th style={{ backgroundColor: "#BADDDA" }} scope="col">
                        Sr No.
                      </th>
                      <th style={{ backgroundColor: "#BADDDA" }} scope="col">
                        SER No.
                      </th>
                      <th style={{ backgroundColor: "#BADDDA" }} scope="col">
                        Airway Bill No.
                      </th>

                      <th style={{ backgroundColor: "#BADDDA" }} scope="col">
                        SB No.
                      </th>
                      <th style={{ backgroundColor: "#BADDDA" }} scope="col">
                        Port Of Destination
                      </th>
                      <th style={{ backgroundColor: "#BADDDA" }} scope="col">
                        Exporter
                      </th>
                      <th style={{ backgroundColor: "#BADDDA" }} scope="col">
                        NOP
                      </th>
                      <th style={{ backgroundColor: "#BADDDA" }} scope="col">
                        Remark
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {exportSerDateAndAirlineCodeData.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChangeForRedeposite(item)}
                            checked={selectedRowsRedeposite.includes(item)}
                          />
                        </td>
                        <td>{index + 1}</td>
                        <td>{item.serNo}</td>
                        <td>{item.airwayBillNo}</td>
                        <td>{item.sbNo}</td>
                        <td>{item.portOfDestination}</td>
                        <td>{getpartyId[item.nameOfExporter]}</td>
                        <td>{item.noOfPackages}</td>
                        <td>{item.redepositeRemark}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
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
                    <Button onClick={redepositedToDgdcCargo} variant="outline-success">
                      <FontAwesomeIcon
                        icon={faArrowCircleLeft}
                        style={{ marginRight: "5px" }}
                      />
                      Redeposite
                    </Button>
                  </Col>
                </Row>
              </div>
            ) : null}
          </div>
        </ModalBody>
      </Modal>


      <Modal Modal isOpen={isModalOpenforbacktotown} onClose={closebacktotownmodal} toggle={closebacktotownmodal} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closebacktotownmodal} style={{
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
            icon={faCity}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Back To Town</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >

          <Card >
            <CardBody>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Back To Town Remark</Label>
                    <Input
                      type="textarea"
                      name="backtotownRemark"
                      id="backtotownRemark"
                      maxLength={200}
                      className="inputField"
                      onChange={handleBacktotownRemark}

                      value={backtotowndata.backtotownRemark}
                    />
                  </FormGroup>

                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Select File</Label>
                    <Input
                      type="file"
                      name="cancelRemarks"
                      id="branchname"

                      className="inputField"
                      onChange={handleFileChangeBacktotown}
                      accept=".jpg, .jpeg, .png, .pdf"

                    />
                  </FormGroup>

                </Col>
              </Row>

              <Row>
                <Col>
                  {backtotowndata.backtotownFilePath && (
                    type2 === 'app' ? (
                      <button style={{ borderStyle: 'none', background: 'none', color: 'red', padding: '0px' }} onClick={openPdfInNewTab1}>
                        {extractFileName(backtotowndata.backtotownFilePath)}
                      </button>
                    ) : (
                      <button style={{ borderStyle: 'none', background: 'none', color: 'red', padding: '0px' }} onClick={downloadFile1}>
                        {extractFileName(backtotowndata.backtotownFilePath)}
                      </button>
                    )
                  )}

                  <Modal isOpen={modalIsOpen1} onClose={closeModal2} toggle={closeModal2} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

                    {fileData1 && (
                      <div>
                        <img src={fileData1.url} style={{ width: '800px', height: '500px' }} alt="Image" />

                      </div>
                    )}
                  </Modal>
                </Col>
              </Row>

              <Row style={{ marginTop: "4%" }}>

                <Col className="text-center">
                  <Button onClick={Savebacktotown} variant="outline-success">
                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                    Submit
                  </Button>
                </Col>


              </Row>
            </CardBody>
          </Card>

        </ModalBody>
      </Modal>



      <Modal Modal isOpen={isModalOpenforEPCopy} onClose={closeEpCopymodal} toggle={closeEpCopymodal} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeEpCopymodal} style={{
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
            icon={faUpload}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Upload EP Copy</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >

          <Card >
            <CardBody>
              <Row>


                <Col md={6}>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Select File</Label>
                    <Input
                      type="file"
                      name="cancelRemarks"
                      id="branchname"

                      className="inputField"
                      onChange={handleFileChangeBacktotown}
                      accept=".jpg, .jpeg, .png, .pdf"

                    />
                  </FormGroup>

                </Col>
              </Row>

              <Row>
                <Col>
                  {epdata.epCopyDocument && (
                    type2 === 'app' ? (
                      <button style={{ borderStyle: 'none', background: 'none', color: 'red', padding: '0px' }} onClick={openPdfInNewTab1}>
                        {extractFileName(epdata.epCopyDocument)}
                      </button>
                    ) : (
                      <button style={{ borderStyle: 'none', background: 'none', color: 'red', padding: '0px' }} onClick={downloadFile2}>
                        {extractFileName(epdata.epCopyDocument)}
                      </button>
                    )
                  )}

                  <Modal isOpen={modalIsOpen1} onClose={closeModal2} toggle={closeModal2} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

                    {fileData1 && (
                      <div>
                        <img src={fileData1.url} style={{ width: '800px', height: '500px' }} alt="Image" />

                      </div>
                    )}
                  </Modal>
                </Col>
              </Row>

              <Row style={{ marginTop: "4%" }}>

                <Col className="text-center">
                  <Button onClick={SaveEPCopy} variant="outline-success">
                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                    Submit
                  </Button>
                </Col>


              </Row>
            </CardBody>
          </Card>

        </ModalBody>
      </Modal>







      {/* Add to Existing PCTM and TP */}



      <Modal Modal isOpen={existingModel} onClose={closeExistingModel} toggle={closeExistingModel} style={{ maxWidth: '800px', wioverflow: '-moz-hidden-unscrollable' }}>

        <ModalHeader toggle={closeExistingModel} style={{
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
            icon={faUpload}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Add to existing TP and PCTM</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >

          <Row>
            <Col md={5}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Select Tp No</Label>
                <Select
                  options={ExistingTPs}
                  value={existingtp}
                  onChange={handleExistingtpChange}
                  isClearable
                  className={errors.existingtp ? 'error-border' : ''}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                      boxShadow: 'none',
                      '&:hover': {
                        border: '1px solid #ccc'
                      }
                    }),
                    indicatorSeparator: () => ({
                      display: 'none'
                    }),
                    dropdownIndicator: () => ({
                      display: 'none'
                    })
                  }}
                />

              </FormGroup>

            </Col>


            <Col md={5}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Select PCTM No</Label>
                <Select
                  options={ExistingPCTMs}
                  value={existingpctmNo}
                  onChange={handleExistingPCTMChange}
                  isClearable
                  className={errors.existingpctmNo ? 'error-border' : ''}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                      boxShadow: 'none',
                      '&:hover': {
                        border: '1px solid #ccc'
                      }
                    }),
                    indicatorSeparator: () => ({
                      display: 'none'
                    }),
                    dropdownIndicator: () => ({
                      display: 'none'
                    })
                  }}
                />
              </FormGroup>
            </Col>
            <Col md={2} className="text-center" >
              <Button style={{ marginTop: '30px' }} onClick={upadateAddtoExistingTp} variant="outline-primary">
                <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                Save
              </Button>
            </Col>
          </Row>


        </ModalBody>
      </Modal>













    </div>
  );
}