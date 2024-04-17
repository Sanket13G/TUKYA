import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "../Components/Style.css";
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import InviceService from "../services/InviceService";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import ipaddress from "../Components/IpAddress";
import snzLoge from "../Images/Snz_Parcels.jpg"
import { Pagination } from "react-bootstrap";
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { Card, CardBody, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendar, faSave, faServer, faUserCircle, faRefresh, faGlobe, faPlaneArrival, faSolarPanel, faStar, faAtom, faPlaneUp, faHandsHoldingCircle, faShare, faShareAlt, faExchange, faExchangeAlt, faTentArrowTurnLeft, faTentArrowLeftRight, faLeftLong, faPlus, faArrowTurnRight, faAngleDoubleLeft, faHandHolding, faHandHoldingWater, faHandHoldingHand, faBolt, faArchive, faBoxesPacking, faWeight, faWeightHanging, faGavel, faPlane, faHistory, faUser, faCircleInfo, faPrint, faHand, faUsersViewfinder, faTruck, faTruckFieldUn, faTimes, faPerson, faPersonBooth, faIcons, faUndo, faUndoAlt, faEdit, faIdBadge, faHandBackFist, faHandFist, faSync, faIdCardClip, faCross, faBox, faArrowsToEye, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash, faCog, faCheck } from '@fortawesome/free-solid-svg-icons';
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Components/AuthProvider";
import SantoshImage from "../services/contacts.png"
import { FaClosedCaptioning, FaTruck, FaHandPaper, FaPersonBooth, FaTruckLoading, FaArrowRight, FaArrowLeft, FaArrowAltCircleRight, FaArrowAltCircleLeft, FaTimesCircle, FaSave } from 'react-icons/fa';
import PdfViewer from "../Components/PdfViewer";
import ReactLoading from 'react-loading';
import moment from 'moment';

// import { ReactComponent as PersonalCarriageIcon } from '../Components/Icons/personal carriage.svg';
function Import(props) {
  const styles2 = {
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





  const [HandOverToCartingAgent, setHandOverToCartingAgent] = useState([]);








  const [DgdcStatusArray, setDgdcStatusArray] = useState([]);
  const [DGDC_Status, setDGDC_Status] = useState(null);
  const [hold, setHold] = useState('');
  const [Personal_Carriage, setPersonal_Carriage] = useState('');
  const [Special_Carting, setSpecial_Carting] = useState('');
  const [Forwarded, setForwarded] = useState('');
  const [Heavy, setHeavy] = useState('');
  const [ImportsHistory, setImportsHistory] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredImports, setFilteredImports] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [showModalCartingAgent, setShowModaCartingAgent] = useState(false);
  const handleClose = () => { setShowModal(false); makefieldEmpty(); };
  const [partyNames, setPartyNames] = useState({});
  const [cartingAgent, setCartingAgent] = useState('');
  const [representative, setRepresentative] = useState('');
  const [otp, setOTP] = useState('');
  const [mobile, setmobileNo] = useState('');
  const [reprentativeArray, setReprentativeArray] = useState([]);
  const [cartingAgentArray, setcartingAgentArray] = useState([]);


  const [errors, setErrors] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [reprentativeId, setreprentativeId] = useState('')

  // Import Object
  const [companyId, setcompanyId] = useState('');
  const [impTransId, setImpTransId] = useState('');
  const [impTransDate, setImpTransDate] = useState(); // Use appropriate initial value
  const [mawb, setMawb] = useState('');
  const [hawb, setHawb] = useState('');
  const [igmNo, setIgmNo] = useState('');
  const [igmDate, setIgmDate] = useState(); // Use appropriate initial value
  const [sirNo, setSirNo] = useState('');
  const [sirDate, setSirDate] = useState(); // Use appropriate initial value
  const [pctmNo, setPctmNo] = useState('');
  const [tpNo, setTpNo] = useState('');
  const [tpDate, setTpDate] = useState(null); // Use appropriate initial value
  const [airlineName, setAirlineName] = useState('');
  const [flightNo, setFlightNo] = useState('');
  const [flightDate, setFlightDate] = useState(); // Use appropriate initial value
  const [countryOrigin, setCountryOrigin] = useState('');
  const [portOrigin, setPortOrigin] = useState('');
  const [importerId, setImporterId] = useState('');
  const [iec, setIec] = useState('');
  const [sezEntityId, setSezEntityId] = useState('');
  const [consoleName, setconsoleName] = useState('BVC');
  const [packageContentType, setPackageContentType] = useState('LAB GROWN DIAMONDS(LGD)');
  const [parcelType, setParcelType] = useState('');
  const [uomPackages, setUomPackages] = useState();
  const [nop, setNop] = useState(1); // Use appropriate initial value
  const [importRemarks, setImportRemarks] = useState('');
  const [descriptionOfGoods, setDescriptionOfGoods] = useState('');
  const [chaCde, setChaCde] = useState('');
  const [assessableValue, setAssessableValue] = useState('');
  const [grossWeight, setGrossWeight] = useState(''); // Use appropriate initial value
  const [beRequestId, setBeRequestId] = useState('');
  const [beNo, setBeNo] = useState('');
  const [beDate, setBeDate] = useState(); // Use appropriate initial value
  const [importAddress, setImportAddress] = useState('');
  const [status, setStatus] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [createdDate, setCreatedDate] = useState(); // Use appropriate initial value
  const [editedBy, setEditedBy] = useState('');
  const [editedDate, setEditedDate] = useState(null); // Use appropriate initial value
  const [approvedBy, setApprovedBy] = useState('');
  const [approvedDate, setApprovedDate] = useState(null); // Use appropriate initial value
  const [uomWeight, setuomWeight] = useState('KGS');
  const [passengerName, setPassengerName] = useState(''); // Initialize with the desired value
  const [address, setAddress] = useState('');
  const [nationality, setNationality] = useState(''); // Initialize with the desired value
  const [deputedCoName, setDeputedCoName] = useState(''); // Initialize with the desired value
  const [deputedCoDesignation, setDeputedCoDesignation] = useState(''); // Initialize with the desired value
  const [deputedFromDestination, setDeputedFromDestination] = useState(''); // Initialize with the desired value
  const [deputedToDestination, setDeputedToDestination] = useState(''); // Initialize with the desired value
  const [escortDate, setEscortDate] = useState(''); // Initialize with the desired Date object
  const [approverName, setApproverName] = useState(''); // Initialize with the desired value
  const [approverDesignation, setApproverDesignation] = useState(''); // Initialize with the desired value
  const [approverDate, setApproverDate] = useState(''); // Initialize with the desired Date object
  const [confirmation, setConfirmation] = useState('N');
  const [nsdlStatus, setNSDL_Status] = useState('');
  const [dgdcStatus, seTDGDC_Status] = useState('');
  const [CreatedUser, setCreatedUser] = useState('');
  const [approvedUser, setApprovedUser] = useState('');
  const [closeStatus, setcloseStatus] = useState('N');
  const [holdStatus, setHoldStatus] = useState('N');
  const [holdDate, setHoldDate] = useState('0000-00-00'); // You can initialize with the appropriate default date
  const [holdBy, setHoldBy] = useState('');
  const [hpStatus, setHpStatus] = useState('N');
  const [hpWeight, setHpWeight] = useState('');
  const [pcStatus, setPcStatus] = useState('N');
  const [scStatus, setScStatus] = useState('N');
  const [cancelStatus, setCancelStatus] = useState('N');
  const [cancelRemarks, setCancelRemarks] = useState('');
  const [imposePenaltyAmount, setImposePenaltyAmount] = useState('');
  const [handedOverRepresentativeId, sethandedOverRepresentativeId] = useState('');
  const [handedOverPartyId, sethandedOverPartyId] = useState('');
  const [handedOverToType, sethandedOverToType] = useState('');
  const [niptStatus, setniptStatus] = useState("N");
  const [importernameOnParcel, setimporternameOnParcel] = useState('');
  const [qrcodeUrl, setqrcodeUrl] = useState('');
  const [doNumber, setdoNumber] = useState('');
  const [doDate, setdoDate] = useState('');




  const [imposePenaltyRemarks, setImposePenaltyRemarks] = useState('');
  const [heavyModel, setHeavyModel] = useState(false);
  const closeHeavyModel = () => { setHeavyModel(false); makefieldEmpty(); }
  const closeCancelModel = () => { setCancelModel(false); makefieldEmpty(); }
  const [CancelModel, setCancelModel] = useState(false);
  const [personalModel, setpersonalModel] = useState(false);
  const closepersonalModel = () => { setpersonalModel(false); makefieldEmpty(); }
  const [penaltyModel, setpenaltyModel] = useState(false);
  const closepenaltyModel = () => { setpenaltyModel(false); makefieldEmpty(); }
  const [singleCartingModel, setsingleCartingModel] = useState(false);
  const closesingleCartingModel = () => { setsingleCartingModel(false); makefieldEmpty(); }
  const [hppackageno, sethppackageno] = useState('');
  const [showError, setShowError] = useState(false);
  const [passportNo, setpassportNo] = useState('');
  const [overrideModel, setoverrideModel] = useState(false);
  const closeoverrideModel = () => { setoverrideModel(false); makefieldEmpty(); setFile(null); }
  const [reasonforOverride, setReasonforOverride] = useState('');
  const [nsdlStatusDocs, setnsdlStatusDocs] = useState('');
  const [nsdlStatusArray, setnsdlStatusArray] = useState([]);
  const [OldnsdlStatus, setOldnsdlStatus] = useState('');
  const [file, setFile] = useState(null);
  const [ImagensdlStatusDocs, setImagensdlStatusDocs] = useState(null);

  const [PertyORChamodel, setsetPertyORChamodel] = useState(false);

  const [selectedOption, setSelectedOption] = useState('party');
  const [parties, setParties] = useState([]);
  const [partyName, setpartyName] = useState('');
  const [ChaParties, setChaParties] = useState('');
  const [externalPartyName, setexternalPartyName] = useState('');
  const [ImportsOfPartyorCha, setImportsOfPartyorCha] = useState([]);
  const [ImportsOfPartyorChaModel, setImportsOfPartyorChaModel] = useState(false);
  const closeImportsOfPartyorChaModel = () => { setImportsOfPartyorChaModel(false); makefieldEmpty(); }
  const [newnsdlStatus, setnewnsdlStatus] = useState('');
  const [documentModel, setdocumentModel] = useState(false);
  const closedocumentModel = () => { setdocumentModel(false); }
  const [documentModel2, setdocumentModel2] = useState(false);
  const closedocumentModel2 = () => { setdocumentModel2(false); }
  const [cratingAgentId, setCartingAgentId] = useState('');
  const [selectPartyOrCHAAll, setselectPartyOrCHAAll] = useState(false);
  const [selectedItemsPartyOrCHA, setSelectedItemsPartyOrCHA] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const [receivedCartingmodel, setreceivedCartingmodel] = useState(false);


  const [niptModel, setniptModel] = useState(false);
  const closeniptModel = () => { setniptModel(false); makefieldEmpty(); }

  const [wrongDepositmodel, setwrongDepositmodel] = useState(false);
  const closewrongDepositmodel = () => { setwrongDepositmodel(false); makefieldEmpty(); }

  const [receivedCartingImportsmodel, setreceivedCartingImportsmodel] = useState(false);
  const closereceivedCartingImportsmodel = () => { setreceivedCartingImportsmodel(false); setreceivedCartingmodel(false); makefieldEmpty(); };
  const [ReceivedCartingImports, setReceivedCartingImports] = useState([]);
  const [selectAllReceived, setselectAllReceived] = useState(false);
  const [selectedreceivedCarting, setselectedreceivedCarting] = useState([]);
  const [representativeImage, setrepresentativeImage] = useState(null);
  const [chaName, setchaName] = useState('');
  const [airlineCode, setAirlineCode] = useState('');
  const [printtagmodel, setprinttagmodel] = useState(false);
  const [printmawb, setprintmawb] = useState('');
  const closeprinttagmodel = () => { setprinttagmodel(false); setprintmawb(''); };
  const [noptobeSent, setNoptobeSent] = useState('');
  const [outDate, setoutDate] = useState('');


  const [forwardedStatus, setForwardedStatus] = useState('N');
  const [noc, setNoc] = useState(0);
  const [dgdcSeepzInScan, setDgdcSeepzInScan] = useState(0);
  const [dgdcSeepzOutScan, setDgdcSeepzOutScan] = useState(0);
  const [dgdcCargoInScan, setDgdcCargoInScan] = useState(0);
  const [dgdcCargoOutScan, setDgdcCargoOutScan] = useState(0);


  const [niptCustomOfficerName, setniptCustomOfficerName] = useState('');
  const [niptCustomsOfficerDesignation, setniptCustomsOfficerDesignation] = useState('');
  const [niptDeputedFromDestination, setniptDeputedFromDestination] = useState('');
  const [niptDeputedToDestination, setniptDeputedToDestination] = useState('DGDC SEEPZ');
  const [niptDateOfEscort, setniptDateOfEscort] = useState('');
  const [niptApproverName, setniptApproverName] = useState('');
  const [niptApproverDesignation, setniptApproverDesignation] = useState('');
  const [niptApproverDate, setniptApproverDate] = useState('');

  const [wrongDepositFilePath, setwrongDepositFilePath] = useState('');
  const [wrongDepositwrongDepositRemarks, setwrongDepositwrongDepositRemarks] = useState('');
  const [wrongDepositStatus, setwrongDepositStatus] = useState('');
  const [detentionReceiptNo, setdetentionReceiptNo] = useState('');
  const [mopStatus, setMopStatus] = useState('N');
  const [consoleobeSent, setConsoleobeSent] = useState('');






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


  const [currentPage, setCurrentPage] = useState(1);


  const [singlechaModel, setsinglechaModel] = useState(false);
  const closesinglechaModel = () => { setsinglechaModel(false); makefieldEmpty(); }

  const [singlecha, setSingleCha] = useState('');
  const [singlechaName, setsinglechaName] = useState('');

  const [singleParty, setSingleParty] = useState('');
  const [singlePartyName, setsinglePartyName] = useState('');

  const [ChareprentativeArray, setChareprentativeArray] = useState([]);

  const [Charepresentative, setCharepresentative] = useState('');
  const [CHAreprentativeId, setCHAreprentativeId] = useState('');

  const getReprentativeByUserIdCHA = async (companyid, branchId, userID) => {
    const result = await Rate_Chart_Service.getReprentativeByCompIdBranchIdUserId(companyid, branchId, userID);
    const cartingsRepresentative = result.data.map(res => ({

      value: res.representativeId,
      label: `${res.firstName} ${res.middleName ? res.middleName.charAt(0) + ' ' : ''}${res.lastName}`
    }));
    setChareprentativeArray(cartingsRepresentative);
  };

  // Single Party or Cha 
  const getDefaultChaofParty = async (userId) => {


    // const chaparties = await findExternalPartyByType(companyid, branchId, "CHA");
    // setChaParties(chaparties);
    await InviceService.getDefaultPartyCha(companyid, branchId, userId).then(async (res) => {

      console.log("Default Pa");
      const response = await Rate_Chart_Service.getSingleExternalUser(companyid, branchId, res.data.impCHA);
      setsinglechaName(response.data.userName);
      setSingleCha(res.data.impCHA);
      await getReprentativeByUserIdCHA(companyid, branchId, res.data.impCHA);
      // console.log("Cha Id " + res.data.impCHA);
      // console.log("Cha Name " + response.data.userName);
    });
  };




  const handleSelectionReprentativeCHA = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setmobileNo('');
      setCharepresentative('');
      setOTP('');
      setCHAreprentativeId('')
      setrepresentativeImage(null);
    }
    else {
      setCharepresentative(selectedOption ? selectedOption.label : '');
      setCHAreprentativeId(selectedOption ? selectedOption.value : '');

      console.log("CHA Representative ID " + selectedOption ? selectedOption.value : '');
      await getReprentativeByUserIdRepresentativeId(companyid, branchId, singlecha, selectedOption ? selectedOption.value : '');
      await getReprentativeImage(companyid, branchId, singlecha, selectedOption ? selectedOption.value : '');
    }

  };


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setmobileNo('');
    setCharepresentative('');
    setCHAreprentativeId('');
    setreprentativeId('');
    setRepresentative('');
    setrepresentativeImage(null);
    setOTP('');
  };


  const updatePartyOrCHAStatusSingle = async (cid, bid, user, otp, agent, reprentativeId) => {

    await Rate_Chart_Service.updatePartyOrCHAStatusSingle(cid, bid, user, otp, agent, reprentativeId, importData).then((res) => {

      if (res.data) {
        closeImportsOfPartyorChaModel();
        toast.success('Import Updated successfully!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
        });

        closesinglechaModel();
        handleSearch(searchCriteria);
      }
      else {
        toast.error('Please Enter Correct OTP!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
        });

      }

    });






  };


  const checkotp4CHA = (noptobeSent) => {
    if (!CHAreprentativeId) {
      toast.error("Please select representative", {
        autoClose: 700
      })
      return;
    }

    if (!mobile) {
      toast.error("Please select mobile no.", {
        autoClose: 700
      })
      return;
    }
    axios
      .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${CHAreprentativeId}/${mobile}/${noptobeSent}`)
      .then(() => {
        toast.success("OTP sent successfully", {
          autoClose: 700
        })

      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };






  const initialSearchCriteria = {
    companyid: companyid,
    branchId: branchId,
    holdStatus: '',
    niptStatus: '',
    forwardedStatus: '',
    dgdcStatus: '',
    startDate: moment(new Date()).format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD'),
    searchValue: ''
  };





  const opernPrintTagModel = () => {
    setprinttagmodel(true);
  };

  const submitSirTags = async (printmawb) => {
    try {
      // console.log(mawb, seino, nop);
      const response = await InviceService.printSirByMAWB(companyid, branchId, printmawb);

      // Check if the response status is OK (200)
      if (response.status === 200) {
        // Get the raw response data as base64-encoded string
        const newWindow = window.open('', '_blank');
        newWindow.document.write(response.data);
        setTimeout(() => {
          newWindow.print(); // Open the print dialog
        }, 100);

      }
    } catch (error) {

      toast.error("No Data Found for Entered Master Bill Number", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
        style: { width: `29vw` },
      });
    }

  };



  const [searchCriteria, setSearchCriteria] = useState([]);



  const navigate = useNavigate();
  const location = useLocation();
  const updatedSerchcriteria = location.state?.searchCriteria;
  const updatedCurrentPage = location.state?.currentPage
  // console.warn("Updated updatedSerchcriteria");
  // console.log(updatedSerchcriteria);


  useEffect(() => {
    const fetchData = async () => {
      const criteriaToSet = updatedSerchcriteria || initialSearchCriteria;

      const updatedPage = updatedCurrentPage || currentPage;
      setCurrentPage(updatedPage);

      setSearchCriteria(criteriaToSet);
      await handleSearch(criteriaToSet);
      await handleSearch3(criteriaToSet); // Pass criteriaToSet to the handleSearch method
    };

    fetchData();
  }, []);


  useEffect(() => {
    const removeParamsOnRefresh = () => {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('searchCriteria');
      newUrl.searchParams.delete('currentPage');

      window.history.replaceState(null, '', newUrl.toString());
    };

    // Check if the page is refreshed
    if (performance.navigation.type === 1) {
      // Page is refreshed
      removeParamsOnRefresh();
    }
  }, []);








  const [uniqueMasterNumberCount, setUniqueMasterNumberCount] = useState(0);
  const [totalNop, setTotalNop] = useState(0);
  const handleSearch = async (searchCriteria) => {

    console.log("Searcjojvsnvan");
    console.log(searchCriteria);

    setLoading(true);
    try {
      await Rate_Chart_Service.SearchImports({ params: searchCriteria }).then((response) => {

        setFilteredImports(response.data);
        const uniqueMasterNumbers = new Set();
        let totalNop = 0;
        // Calculate unique MasterNo values and total nop
        response.data.forEach(importItem => {
          uniqueMasterNumbers.add(importItem.mawb);
          totalNop += importItem.nop;
        });
        setUniqueMasterNumberCount(uniqueMasterNumbers.size);
        setTotalNop(totalNop);
      });
    }
    catch {
      console.log("error");
    }
    finally {
      setLoading(false);
    }
  };


  const setCurrentPageFun = () => {
    setCurrentPage(1);
  };



  const resetSearchCriteria = async () => {
    setSearchCriteria(initialSearchCriteria);
    setDGDC_Status(null);
    setSearchValue('');
    setSearchValue('');
    setCurrentPageFun();
    // Add these to importmap
    handleSearch(initialSearchCriteria);
    handleSearch3(initialSearchCriteria);
  };

  const handleViewClick = (transId3, mawb3, hawb3, sir3) => {
    navigate(`/parent/import/add-new`, { state: { transId3: transId3, mawb3: mawb3, hawb3: hawb3, sir3: sir3, searchCriteria: searchCriteria, currentPage: currentPage } });
  };

  const handleModifyClick = (transId2, mawb2, hawb2, sir2) => {
    navigate(`/parent/import/add-new`, { state: { transId2: transId2, mawb2: mawb2, hawb2: hawb2, sir2: sir2, searchCriteria: searchCriteria, currentPage: currentPage } });
  };




  // Personal Carriage



  const [NextPersonalCarriage, setNextPersonalCarriage] = useState(true);
  const [PersonalSIRModel, setPersonalSIRModel] = useState(false);
  const closePersonalSIRModel = () => { setPersonalSIRModel(false); makefieldEmpty(); }

  const SearchDetention = () => {
    const newErrors = {};

    if (!detentionReceiptNo) {
      newErrors['detentionReceiptNo'] = 'cartingAgent is required.';
      return setErrors(newErrors);
    }

    Rate_Chart_Service.searchdetentionReceiptNo(companyid, branchId, detentionReceiptNo).then(async (res) => {
      setNextPersonalCarriage(res.data);

      const cartingAgents = await findExternalPartyByType(companyid, branchId, "Carting Agent");
      setcartingAgentArray(cartingAgents);

      if (res.data === true) {
        newErrors['duplicate'] = 'cartingAgent is required.';
        return setErrors(newErrors);
      }


    });




  };


  const handlePartyChange33 = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setpartyName('');
      setImporterId('');

    }
    else {
      setpartyName(selectedOption ? selectedOption.label : '')
      setImporterId(selectedOption ? selectedOption.value : '');
    }
  };


  const handleSelectionCartingAgent33 = (selectedOption, { action }) => {

    if (action === 'clear') {
      setCartingAgent('');

      setCartingAgentId('');

    }
    else {
      setCartingAgent(selectedOption ? selectedOption.label : '');
      setCartingAgentId(selectedOption ? selectedOption.value : '');
    }


  };


  const handlePersonalCarriage = () => {
    const newErrors = {};
    if (!importerId) {
      newErrors['importerId'] = 'importerId is required.';
      return setErrors(newErrors);
    }

    if (!nop) {
      newErrors['nop'] = 'cartingAgent is required.';
      return setErrors(newErrors);
    }

    Rate_Chart_Service.addPersonalImport(companyid, branchId, userId, importData).then((res) => {

      const toastContent = `Import with SIR No ${res.data.sirNo} Added Successfully !`;
      const contentWidth = toastContent.length * 10;
      toast.success(toastContent, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        style: { width: `${contentWidth}px` },
      });

      closePersonalSIRModel();
      handleSearch(searchCriteria);
    })




  }



  // const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const totalPages = Math.ceil(filteredImports.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
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


  const showDocumentModel = () => {
    setdocumentModel(true);
  };


  const [fileWrongDeposit, setfileWrongDeposit] = useState(null);

  const handleFileChangeWrongDeposit = (e) => {
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

    // If all checks pass, set the selected file
    setfileWrongDeposit(selectedFile);
  };


  const handleSubmitWrongDeposit = async (e) => {
    e.preventDefault();



    if (!fileWrongDeposit) {
      toast.error("Please select Document", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
        style: { width: `23vw` },
      });
      return;
    }
    if (!wrongDepositwrongDepositRemarks) {
      toast.error("Please Mention Reason", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
        style: { width: `23vw` },
      });
      return;
    }

    const formData = new FormData();
    formData.append('sirNo', sirNo);
    formData.append('reasonwrongDeposit', wrongDepositwrongDepositRemarks);
    formData.append('mawb', mawb);
    formData.append('hawb', hawb);
    formData.append('companyid', companyid);
    formData.append('branchId', branchId);
    formData.append('transId', impTransId); // 'file' should match your backend's parameter name
    formData.append('file', fileWrongDeposit);

    try {
      // Send the FormData object to your backend using Axios or any other HTTP library
      const response = await axios.post(`http://${ipaddress}importmain/wrongDeposit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });


      // Handle the response from the backend
      // console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }


    toast.success("NSDL Status Updated Successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 600,
      style: { width: `23vw` },
    });
    closewrongDepositmodel();
    handleSearch(searchCriteria);
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
      toast.error('File size must be less than 8MB');
      return;
    }

    // Check file type
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedFileTypes.includes(selectedFile.type)) {
      toast.error('File type must be jpg, jpeg, png, or pdf');
      return;
    }

    // If all checks pass, set the selected file
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!newnsdlStatus) {
      toast.error("Please select Override Status", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
        style: { width: `23vw` },
      });
      return;
    }
    if (!nsdlStatusDocs && !file) {
      toast.error("Please select Document", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
        style: { width: `23vw` },
      });
      return;
    }

    const formData = new FormData();
    formData.append('sirNo', sirNo);
    formData.append('reasonforOverride', reasonforOverride);
    formData.append('newnsdlStatus', newnsdlStatus);
    formData.append('mawb', mawb);
    formData.append('hawb', hawb);
    formData.append('companyid', companyid);
    formData.append('branchId', branchId);
    formData.append('transId', impTransId); // 'file' should match your backend's parameter name
    formData.append('file', file);

    try {
      // Send the FormData object to your backend using Axios or any other HTTP library
      const response = await axios.post(`http://${ipaddress}importmain/override`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });


      // Handle the response from the backend
      // console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }


    toast.success("NSDL Status Updated Successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 600,
      style: { width: `23vw` },
    });
    closeoverrideModel();
    handleSearch(searchCriteria);
  };




  const handleUpdateNIPTStatus = async (compid, branchId, transis, mawb, hawb, sir) => {
    try {
      const res = await Rate_Chart_Service.updateNSDLStatus(compid, branchId, transis, mawb, hawb, sir, userId);

      // Check if the response is ok
      if (res.status === 200) {
        toast.success('NSDL Status updated Successfully', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
          style: { width: `23vw` },
        });
      } else {
        toast.error('Error: Something went wrong', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
          style: { width: `23vw` },
        });
      }

      // Handle other logic or trigger a re-render as needed
      handleSearch(searchCriteria);
    } catch (error) {
      // console.error(error);
      toast.error('Error: Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    }
  };

  // handleUpdateCustomOfficer


  const handleUpdateCustomOfficer = async (companyid, branchId, transId, mawb, hawb, sir) => {
    try {

      const newErrors = {};



      if (!niptDateOfEscort) {
        newErrors['niptDateOfEscort'] = 'cartingAgent is required.';
        return setErrors(newErrors);
      }

      if (!niptApproverName) {
        newErrors['niptApproverName'] = 'cartingAgent is required.';
        return setErrors(newErrors);
      }


      if (!niptApproverDesignation) {
        newErrors['niptApproverDesignation'] = 'cartingAgent is required.';
        return setErrors(newErrors);
      }

      // companyid, branchId, transId, mawb, hawb, sir, buttonType
      const res = await updateimportConditions(companyid, branchId, transId, mawb, hawb, sir, "NIPT");

      closeniptModel();
      toast.success('Import updated Successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
        style: { width: `23vw` },
      });


    } catch (error) {
      // console.error(error);
      toast.error('Error: Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    }
  };


  // WRONG DEPOSIT PARCEL handleWrongDeposit

  const handleWrongDeposit = async (companyid, branchId, transId, mawb, hawb, sir) => {
    try {

      const newErrors = {};



      if (!niptDateOfEscort) {
        newErrors['niptDateOfEscort'] = 'cartingAgent is required.';
        return setErrors(newErrors);
      }

      if (!niptApproverName) {
        newErrors['niptApproverName'] = 'cartingAgent is required.';
        return setErrors(newErrors);
      }


      if (!niptApproverDesignation) {
        newErrors['niptApproverDesignation'] = 'cartingAgent is required.';
        return setErrors(newErrors);
      }

      // companyid, branchId, transId, mawb, hawb, sir, buttonType
      const res = await updateimportConditions(companyid, branchId, transId, mawb, hawb, sir, "NIPT");

      closeniptModel();
      toast.success('Import updated Successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
        style: { width: `23vw` },
      });


    } catch (error) {
      // console.error(error);
      toast.error('Error: Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    }
  };

















  // handOver to Party or CHA
  const handlePartyChange = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setpartyName('');
      setImporterId('');
      setreprentativeId('');
    }
    else {
      setpartyName(selectedOption ? selectedOption.label : '')

      setImporterId(selectedOption ? selectedOption.value : '');
      getReprentativeByUserId(companyid, branchId, selectedOption ? selectedOption.value : '');
      // await getReprentativeImage(companyid, branchId, importerId, selectedOption ? selectedOption.value : '');

    }
  };
  const handleExternalPartyChange = async (selectedOption, { action }) => {
    setpartyName('');
    if (action === 'clear') {
      setpartyName('');
      setexternalPartyName('');
      setImporterId('');

    }
    else {
      setpartyName('');
      setexternalPartyName(selectedOption ? selectedOption.label : '');
      setImporterId(selectedOption ? selectedOption.value : '')
      getReprentativeByUserId(companyid, branchId, selectedOption ? selectedOption.value : '');
      // await getReprentativeImage(companyid, branchId, importerId, selectedOption ? selectedOption.value : '');
    }
  };

  function formatDate1(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear().toString();

    return `${year}-${month}-${day} 00:00:00`;
  }

  // Refresh DeliveriesImports

  const fetPartyImports = () => {
    console.log("Calling For Party : " + importerId);
    if (importerId.startsWith('E')) {
      handleSubmitExternalPartySearch(importerId, "cha");
    }
    if (importerId.startsWith('M')) {
      checkloa(importerId, "party");
    }
  };

  // Call the function with an importerId




















  const checkloa = (id, type) => {
    const date = formatDate1(new Date());
    console.log('date data ', date);
    axios
      .get(`http://${ipaddress}parties/checkloa/${companyid}/${branchId}/${id}/${date}`)
      .then((response) => {
        console.log('Loa data ', response.data);
        if (response.data === 'Y') {
          toast.error("The LOA for the party has expired.", {
            autoClose: 700
          })
          return;
        }
        else if (response.data === 'N') {
          handleSubmitExternalPartySearch(id, type);
        }
      })
      .catch((error) => {
      });
  }



  const [expiredPartyList, setexpiredPartyList] = useState([]);





  const findExternalPartyByType = async (compid, branchid, Type) => {

    const partyResponse = await Rate_Chart_Service.getExternalUserByTypeForImport(compid, branchid, Type);
    const partyOptions = partyResponse.data.map(externalUser => ({
      value: externalUser.externaluserId,
      label: externalUser.userName
    }));
    return partyOptions;

  };

  const handleNIPTStatusChange = (event) => {
    const selectedValue = event.target.value;
    setSearchCriteria({ ...searchCriteria, niptStatus: selectedValue });
  };

  const handleholdStatusChange = (event) => {
    const selectedValue = event.target.value;
    setSearchCriteria({ ...searchCriteria, holdStatus: selectedValue });
  };

  const handleSearchChange = (event) => {
    const selectedValue = event.target.value;
    setSearchCriteria({ ...searchCriteria, searchValue: selectedValue });
  };



  const openOverrideModel = async (data) => {

    await getByMAWBnoAndHAwb(data.companyid, data.branchId, data.transId, data.mawb, data.hawb, data.sir);
    await findNsdlStatus();
    setModalData(data);
    setoverrideModel(true);
  }


  const findNsdlStatus = async () => {
    const PCKTYPEResponse = await Rate_Chart_Service.getjarsByJarId('J00010	', companyid, branchId);
    const partyOptions = PCKTYPEResponse.data.map(jar => ({
      value: jar.jarId,
      label: jar.jarDtlDesc
    }));
    setnsdlStatusArray(partyOptions);
  };
  const handleNSDLStatusChange = (selectedOption, { action }) => {
    if (action === 'clear') {
      setSearchCriteria({ ...searchCriteria, dgdcStatus: '' });
      setNSDL_Status('')
    } else {
      setNSDL_Status(selectedOption ? selectedOption.label : '');
      setnewnsdlStatus(selectedOption ? selectedOption.label : '');
    }
  };







  //  Tag Heavy Model

  const handleDateChangeFlight = (date2) => {
    setFlightDate(date2);
  };

  const handleDateChangeEscort = (date) => {
    setEscortDate(date);
  };

  const handleDateChangeApprover = (date) => {
    setApproverDate(date);
  }


  const openHeavModal = (data) => {
    setModalData(data);
    getByMAWBnoAndHAwb(data.companyid, data.branchId, data.transId, data.mawb, data.hawb, data.sir);
    getAllHeavyParcels(data.mawb, data.hawb, data.transId, data.sir);
    setHeavyModel(true);
  };






  // Cancel Model
  const openCancelModal = (data) => {
    setModalData(data);
    getByMAWBnoAndHAwb(data.companyid, data.branchId, data.transId, data.mawb, data.hawb, data.sir);
    setCancelModel(true);
  };

  const SubmitCancelModel = (companyid, branchId, transId, mawb, hawb, sir, buttonType, button) => {
    // console.log(companyid, branchId, transId, mawb, hawb, sir, buttonType, button);
    if (button === 'submit' || button === 'update') {
      updateimportConditions(companyid, branchId, transId, mawb, hawb, sir, buttonType);
      toast.success('Import Cancelled Successfully !', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    };

    if (button === 'remove') {
      updateimportConditions(companyid, branchId, transId, mawb, hawb, sir, 'Uncancel');
      toast.success('Import UnCancelled Successfully !', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    }

    setCancelModel(false);

  };


  const openPersonalModel = (data) => {
    setModalData(data);
    getImportPcObject(data.companyid, data.branchId, data.mawb, data.hawb, data.sir);
    setpersonalModel(true);
  };

  const openPenaltyModal = (data) => {
    setModalData(data);
    getByMAWBnoAndHAwb(data.companyid, data.branchId, data.transId, data.mawb, data.hawb, data.sir);
    setpenaltyModel(true);
  };


  const openCustomOfficerNIPT = (data) => {
    setModalData(data);
    getByMAWBnoAndHAwb(data.companyid, data.branchId, data.transId, data.mawb, data.hawb, data.sir);
    // setniptDeputedToDestination('DGDC SEEPZ');
    setniptModel(true);
  };


  const openWrongDepositmodel = (data) => {
    setModalData(data);
    getByMAWBnoAndHAwb(data.companyid, data.branchId, data.transId, data.mawb, data.hawb, data.sir);
    // setniptDeputedToDestination('DGDC SEEPZ');
    setwrongDepositmodel(true);
  };












  const checkotp1 = (noptobeSent) => {
    axios
      .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectedRepresentative.value}/${representativeNew.mobile}/${noptobeSent}`)
      .then(() => {
        toast.success("OTP sent successfully", {
          autoClose: 700
        });

      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  const submitSingleCartingAgent = async (companyid, branchId, userId, otp, agent, reprentativeId) => {

    await Rate_Chart_Service.updateSingleCartingAgentStatus(companyid, branchId, userId, otp, agent, reprentativeId, importData, tpstatus).then((res) => {
      if (res.data) {
        handleCloseCartingAgent();
        toast.success('Import Updated successfully!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
        });
        handleSearch(searchCriteria);
        closesingleCartingModel();
      }
      else {
        toast.error('Please Enter Correct OTP!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
        });
      }
    });
  };
  const SubmitopenPenaltyModal = (companyid, branchId, transId, mawb, hawb, sir, buttonType) => {


    updateimportConditions(companyid, branchId, transId, mawb, hawb, sir, buttonType);
    toast.success('Impose Penalty  Added  Successfully !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 600,
      style: { width: 'auto' }
    });

    closepenaltyModel();


  };




  const [modalData, setModalData] = useState({
    companyid: "",
    branchId: "",
    impTransId: "",
    mawb: "",
    hawb: "",
    sirNo: "",
    buttonType: "",
  });




  const importData = {
    companyId, branchId,
    uomWeight, impTransId, impTransDate, mawb, hawb, igmNo, igmDate, sirNo, sirDate, pctmNo, tpNo, tpDate, airlineName, airlineCode,
    flightNo, flightDate, countryOrigin, portOrigin, importerId, iec, sezEntityId, consoleName, packageContentType, parcelType, niptStatus, importernameOnParcel, qrcodeUrl,
    uomPackages, nop, importRemarks, descriptionOfGoods, chaCde, assessableValue, grossWeight, beRequestId, beNo, beDate, reasonforOverride, nsdlStatusDocs,
    importAddress, status, createdBy, createdDate, editedBy, editedDate, approvedBy, approvedDate, dgdcStatus, nsdlStatus, closeStatus, handedOverToType, handedOverPartyId, handedOverRepresentativeId, mopStatus,
    holdStatus, holdDate, holdBy, hpStatus, pcStatus, scStatus, cancelStatus, cancelRemarks, imposePenaltyAmount, imposePenaltyRemarks, doNumber, doDate, chaName, outDate, airlineCode, niptCustomOfficerName, niptCustomsOfficerDesignation, niptDeputedFromDestination,
    niptDeputedToDestination, niptDateOfEscort, niptApproverName, niptApproverDesignation, niptApproverDate, wrongDepositFilePath, wrongDepositwrongDepositRemarks, wrongDepositStatus, detentionReceiptNo, forwardedStatus, noc, dgdcSeepzInScan, dgdcSeepzOutScan, dgdcCargoInScan, dgdcCargoOutScan
  };


  const importPCObject = {
    companyId, branchId, mawb, hawb, sirNo, passengerName, address, flightNo, flightDate, nationality, deputedCoName,
    deputedCoDesignation, deputedFromDestination, deputedToDestination, escortDate, approverName, approverDesignation,
    approverDate, confirmation, status, createdBy, createdDate, editedBy, editedDate, approvedBy, approvedDate, passportNo
  };
  const importHeavy =
  {
    companyId, branchId, mawb, hawb, sirNo, impTransId, hppackageno, hpWeight
  };

  const [HeavyParcelArray, setHeavyParcelArray] = useState([]);

  const getAllHeavyParcels = async (mawb, hawb, transid, sir) => {
    Rate_Chart_Service.getAllHeavyParcels(companyid, branchId, mawb, hawb, transid, sir).then((res) => {
      setHeavyParcelArray(res.data)
      handleSearch(searchCriteria);
    });
  };

  const getHeavyParcelsByPackageNumber = async (mawb, hawb, transid, sir, packageNo) => {
    Rate_Chart_Service.getHeavyParcelsByPackageNumber(companyid, branchId, mawb, hawb, transid, sir, packageNo).then((res) => {
      setMawb(res.data.mawb);
      setHawb(res.data.hawb);
      setImpTransId(res.data.impTransId);
      setSirNo(res.data.sirNo);
      sethppackageno(res.data.hppackageno);
      setHpWeight(res.data.hpWeight);
    });
  };

  const addHeavyParcel = async (mawb, hawb, transid, sir, packageNo) => {
    Rate_Chart_Service.updateByPackageNumber(companyid, branchId, mawb, hawb, transid, sir, packageNo, importHeavy).then((res) => {

      toast.success('Heavy Weight Added Successfully !', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,

      });
      handleSearch(searchCriteria);
      getHeavyParcelsByPackageNumber(res.data.mawb, res.data.hawb, res.data.impTransId, res.data.sirNo, res.data.hppackageno);
      getAllHeavyParcels(res.data.mawb, res.data.hawb, res.data.impTransId, res.data.sirNo);
    })

  };

  const deleteImportHeavy = async (mawb, hawb, transid, sir, packageNo) => {
    Rate_Chart_Service.DeleteByPackageNumber(companyid, branchId, mawb, hawb, transid, sir, packageNo).then((res) => {
      toast.success('Heavy Weight Deleted Successfully !', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,

      });

      handleSearch(searchCriteria);
      setMawb(res.data.mawb);
      setHawb(res.data.hawb);
      setImpTransId(res.data.impTransId);
      setSirNo(res.data.sirNo);
      getAllHeavyParcels(res.data.mawb, res.data.hawb, res.data.impTransId, res.data.sirNo);
      setHpWeight('');
      sethppackageno(res.data.hppackageno);
    });

  };


  const handleAddClick = (companyid, branchId, transId, mawb, hawb, sir, buttonType, button) => {
    // Check if the weight is less than 34 kg
    if (parseFloat(hpWeight) < 34) {
      // Show a toast error message
      toast.error("Weight should be greater than or equal to 34 kg", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShowError(true); // Set showError to true to display the error message
    } else {


      if (button === 'submit' || button === 'update') {

        addHeavyParcel(mawb, hawb, transId, sir, hppackageno);
        handleSearch(searchCriteria);
      }
      if (button === 'remove') {

        deleteImportHeavy(mawb, hawb, transId, sir, hppackageno);
      }
      setShowError(false);
      // closeHeavyModel();
      // setModalData('');

    }
  };



  useEffect(() => {
    const foundParty = DgdcStatusArray.find(party => party.label === DGDC_Status ? DGDC_Status.label : '');
    if (foundParty) {
      setDGDC_Status(foundParty);
    }
  }, [DgdcStatusArray, DGDC_Status]);




  const getImportPcObject = async (companyid, branchId, mawb, hawb, sir) => {
    await Rate_Chart_Service.getImportPCbyIds(companyid, branchId, mawb, hawb, sir).then((res) => {
      setNationality(res.data.nationality);
      setDeputedCoName(res.data.deputedCoName);
      setDeputedCoDesignation(res.data.deputedCoDesignation);
      setDeputedFromDestination(res.data.deputedFromDestination);
      setDeputedToDestination(res.data.deputedToDestination);
      setFlightNo(res.data.flightNo);
      // Assuming escortDate is in a compatible format
      setApproverName(res.data.approverName);
      setApproverDesignation(res.data.approverDesignation);
      let approverDateValue = res.data.approverDate ? new Date(res.data.approverDate) : null;
      let escortDateDateValue = res.data.escortDate ? new Date(res.data.escortDate) : null;
      let flightDateDateValue = res.data.flightDate ? new Date(res.data.flightDate) : null;
      setApproverDate(approverDateValue); // Assuming approverDate is in a compatible format
      setConfirmation(res.data.confirmation);
      setpassportNo(res.data.passportNo)
      setFlightDate(flightDateDateValue);
      setEscortDate(escortDateDateValue);
      setPassengerName(res.data.passengerName);
      setAddress(res.data.address);
    })
  };


  const SubmitPersonalModel = (cid, bid, transId, mawb, hawb, sirno) => {

    const formvalid = handleValidationPersonal();
    if (formvalid) {
      Rate_Chart_Service.addImportPCOBJECTS(cid, bid, userId, mawb, hawb, sirno, importPCObject).then((res) => {
        // getImportPcObject(cid,bid,mawb,hawb,sirno);
        closepersonalModel();
        toast.success('Personal Imformation added Successfully !', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
          style: { width: `28vw` },
        });
      });


    }
    else {
      toast.error('Please fill required fields !', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    }

  };




  const handleValidationPersonal = () => {
    let formIsValid = true;
    const newErrors = {};

    // Validate serviceShortDescription
    if (!flightNo) {
      formIsValid = false;
      newErrors['flightNo'] = 'flightNo is required.';

    }

    if (!passportNo) {
      formIsValid = false;
      newErrors['passportNo'] = 'passportNo is required.';

    }
    if (!passengerName) {
      formIsValid = false;
      newErrors['passengerName'] = 'passengerName is required.';

    }
    if (!deputedCoName) {
      formIsValid = false;
      newErrors['deputedCoName'] = 'deputedCoName is required.';

    }


    setErrors(newErrors);
    return formIsValid;
  };







  // for Heavy Model ackage options
  const options = [];
  for (let i = 1; i <= parseInt(nop); i++) {
    options.push(
      <option key={i} value={`${i}`}>
        {`${i}/${nop}`}
      </option>
    );
  }



  //Sanket

  const [selectedOption1, setSelectedOption1] = useState('N');  // Default value for the radio buttons
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
      .get(`http://${ipaddress}importmain/alltp/${companyid}/${branchId}/${date}`)
      .then((response) => {
        setTodaytp(response.data); // Store the list in the state
      })
      .catch((error) => {
      });
  }


  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedOption1(value);
    setTpstatus('N');
    if (value === 'Y') {
      alltp();

    } else {
      // Clear the dropdown options if the first radio button is selected
      setDropdownOptions([]);
      setSelectedDropdownOption('');
    }
  };

  const getByMAWBnoAndHAwbIMAGE = async (compId, branchID, transId, mawb, hawb, sirNo) => {
    try {
      Rate_Chart_Service.GetByMAWBandHAWBImage(compId, branchID, transId, mawb, hawb, sirNo).then((response) => {
        // console.log(response.status);

        if (response.status === 200) {
          const contentType = response.headers['content-type'];
          const blob = new Blob([response.data], { type: contentType });
          const url = window.URL.createObjectURL(blob);
          if (contentType === 'application/pdf') {
            setPdfData({ url, contentType });
            setImagensdlStatusDocs(null);
          } else {
            setImagensdlStatusDocs(url);
            setPdfData(null);
          }
        } else {
          throw new Error('Network response was not ok');
        }
      });
    } catch (error) {
      console.error('Error fetching image or PDF:', error);
    }
  };
  const [PdfData2, setPdfData2] = useState(null);
  const [ImagewrongDepositDocs, setImagewrongDepositDocs] = useState(null);

  // Wrong deposit 
  const getByMAWBnoAndHAwbWrongDepositIMAGE = async (compId, branchID, transId, mawb, hawb, sirNo) => {
    try {
      Rate_Chart_Service.GetByMAWBandHAWBWrongDepositImage(compId, branchID, transId, mawb, hawb, sirNo).then((response) => {
        console.log(response.status);

        if (response.status === 200) {
          const contentType = response.headers['content-type'];

          if (contentType === 'application/pdf') {
            // If the response is a PDF, set it to pdfData
            setPdfData2(response.data);
            setImagewrongDepositDocs(null); // Clear imageData
          } else {
            // If the response is an image, set it to imageData
            setImagewrongDepositDocs(response.data);
            setPdfData2(null); // Clear pdfData
          }
        } else {
          throw new Error('Network response was not ok');
        }
      });
    } catch (error) {
      console.error('Error fetching image or PDF:', error);
    }
  };


  const showDocumentModel22 = () => {

    // Check if the response status is OK (200)
    if (PdfData2) {
      // Get the raw response data as base64-encoded string
      const base64PDF = PdfData2;

      // Create a new window for displaying the PDF
      const newWindow = window.open('', '_blank');

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

      setdocumentModel2(true);

    }
  };


  async function getNameByIdExternalParty(externalId) {
    const res = await Rate_Chart_Service.getNameByIdExternalParty(companyid, branchId, externalId);
    return res.data;
  };


  const getByMAWBnoAndHAwb = async (compId, branchID, transId, mawb, hawb, sirNo) => {

    Rate_Chart_Service.GetByMAWBandHAWB(compId, branchID, transId, mawb, hawb, sirNo).then((res) => {
      // console.log(res.data);
      setMawb(res.data.mawb);
      setHawb(res.data.hawb);
      setIgmNo(res.data.igmNo);
      setSirNo(res.data.sirNo);



      setSirDate(res.data.sirDate);
      setAirlineName(res.data.airlineName);
      setFlightNo(res.data.flightNo);

      setIgmDate(new Date(res.data.igmDate));
      setBeDate(new Date(res.data.beDate));
      setFlightDate(new Date(res.data.flightDate));

      setCountryOrigin(res.data.countryOrigin);
      setPortOrigin(res.data.portOrigin);
      setImporterId(res.data.importerId);
      setcloseStatus(res.data.closeStatus);

      // getPartyByID(companyid, branchId, res.data.importerId);

      setIec(res.data.iec);
      setSezEntityId(res.data.sezEntityId);
      setconsoleName(res.data.consoleName);
      setPackageContentType(res.data.packageContentType);
      setNop(res.data.nop);
      setParcelType(res.data.parcelType);
      setImportRemarks(res.data.importRemarks);
      setDescriptionOfGoods(res.data.descriptionOfGoods);
      setChaCde(res.data.chaCde);
      setAssessableValue(res.data.assessableValue);
      setGrossWeight(res.data.grossWeight);
      setBeRequestId(res.data.beRequestId);
      setBeNo(res.data.beNo);
      sethppackageno(res.data.nop);
      setStatus(res.data.status);
      setTpNo(res.data.tpNo);
      setPctmNo(res.data.pctmNo);

      setHoldStatus(res.data.holdStatus);
      setHoldDate(res.data.holdDate);
      setHoldBy(res.data.holdBy);
      setHpStatus(res.data.hpStatus);
      // setHpWeight(res.data.hpWeight);
      setPcStatus(res.data.pcStatus);
      setScStatus(res.data.scStatus);
      setCancelStatus(res.data.cancelStatus);
      setCancelRemarks(res.data.cancelRemarks);
      setImposePenaltyAmount(res.data.imposePenaltyAmount);
      setImposePenaltyRemarks(res.data.imposePenaltyRemarks);
      setnsdlStatusDocs(res.data.nsdlStatusDocs);
      setchaName(res.data.chaName);
      setOldnsdlStatus(res.data.nsdl_Status);
      if (res.data.nsdlStatusDocs) {
        getByMAWBnoAndHAwbIMAGE(compId, branchID, transId, mawb, hawb, sirNo);
      }
      setReasonforOverride(res.data.reasonforOverride);
      // setImagensdlStatusDocs(res.data.nsdlStatusDocs);
      // getApprovedUser(res.data.approvedBy, companyid, branchID);

      // setOldnsdlStatus(res.data.nsdlStatus)
      setApprovedBy(res.data.approvedBy);
      setAirlineCode(res.data.airlineCode);


      // getCreatedUser(res.data.createdBy, companyid, branchID);



      setHpStatus(res.data.hpStatus);
      // setHpWeight(res.data.hpWeight)
      setTpDate(res.data.tpDate);
      setEditedBy(res.data.editedBy);
      setEditedDate(res.data.editedDate);
      setCreatedDate(res.data.createdDate);
      setApprovedDate(res.data.approvedDate);
      setCreatedBy(res.data.createdBy);
      setuomWeight(res.data.uomWeight);
      setImportAddress(res.data.importAddress);
      setUomPackages(res.data.uomPackages);
      setcompanyId(res.data.companyId);
      // setBranchId(res.data.DatebranchId);
      setImpTransId(res.data.impTransId);
      setImpTransDate(res.data.impTransDate);
      setNSDL_Status(res.data.nsdl_Status);
      seTDGDC_Status(res.data.dgdc_Status);
      // setnsdlStatusDocs(res.data.nsdlStatusDocs)
      setoutDate(res.data.outDate);
      sethandedOverRepresentativeId(res.data.handedOverRepresentativeId);
      sethandedOverPartyId(res.data.handedOverPartyId);
      sethandedOverToType(res.data.handedOverToType);
      setniptStatus(res.data.niptStatus);
      setimporternameOnParcel(res.data.importernameOnParcel);
      setqrcodeUrl(res.data.qrcodeUrl);
      setdoNumber(res.data.doNumber);
      setdoDate(res.data.doDate);
      setniptApproverDate(res.data.niptApproverDate);
      setniptApproverDesignation(res.data.niptApproverDesignation);
      setniptApproverName(res.data.niptApproverName);
      setniptCustomOfficerName(res.data.niptCustomOfficerName);
      setniptCustomsOfficerDesignation(res.data.niptCustomsOfficerDesignation);
      setniptDateOfEscort(res.data.niptDateOfEscort);
      setniptDeputedToDestination(res.data.niptDeputedToDestination);
      setniptDeputedFromDestination(res.data.niptDeputedFromDestination);
      setwrongDepositFilePath(res.data.wrongDepositFilePath);
      if (res.data.wrongDepositFilePath) {
        getByMAWBnoAndHAwbWrongDepositIMAGE(compId, branchID, transId, mawb, hawb, sirNo);
      }


      setwrongDepositwrongDepositRemarks(res.data.wrongDepositwrongDepositRemarks);
      setwrongDepositStatus(res.data.wrongDepositStatus);

      setdetentionReceiptNo(res.data.detentionReceiptNo);
      setForwardedStatus(res.data.forwardedStatus);
      setNoc(res.data.noc);
      setDgdcSeepzInScan(res.data.dgdcSeepzInScan);
      setDgdcSeepzOutScan(res.data.dgdcSeepzOutScan);
      setDgdcCargoInScan(res.data.dgdcCargoInScan)
      setDgdcCargoOutScan(res.data.dgdcCargoOutScan);
      setMopStatus(res.data.mopStatus);
    })
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



  const handleSendOTP = (number) => {
    checkotp1(number);
  };


  function calculateTotalPackages(importsList) {
    return importsList.reduce((acc, item) => {
      const packagesValue = parseInt(item.nop, 10) || 0; // Convert to number, handle NaN with fallback
      return acc + packagesValue;
    }, 0);
  };

  // Calculate the index of the first and last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;


  useEffect(() => {
    setSelectAll(selectedItems.length === HandOverToCartingAgent.length);
  }, [selectedItems, HandOverToCartingAgent]);

  const handleSelectAllToggle = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(HandOverToCartingAgent);
    }
    setSelectAll(!selectAll);
  };

  const handleRowCheckboxChange = (index) => {
    const selectedItem = HandOverToCartingAgent[index];

    if (selectedItem) {
      const selectedIndex = selectedItems.findIndex((item) => item.sirNo === selectedItem.sirNo);

      if (selectedIndex !== -1) {
        // Remove the item from the selected items
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems.splice(selectedIndex, 1);
        setSelectedItems(updatedSelectedItems);
      } else {
        // Add the item to the selected items
        setSelectedItems([...selectedItems, selectedItem]);
      }
    }
  };


  const getReprentativeByUserId = async (companyid, branchId, userID) => {
    const result = await Rate_Chart_Service.getReprentativeByCompIdBranchIdUserId(companyid, branchId, userID);
    const cartingsRepresentative = result.data.map(res => ({

      value: res.representativeId,
      label: `${res.firstName} ${res.middleName ? res.middleName.charAt(0) + ' ' : ''}${res.lastName}`
    }));
    setReprentativeArray(cartingsRepresentative);
  };

  const handleSelectionReprentative = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setmobileNo('');
      setRepresentative('');
      setOTP('');
      setreprentativeId('')
      setrepresentativeImage(null);
    }
    else {



      setRepresentative(selectedOption ? selectedOption.label : '');
      setreprentativeId(selectedOption ? selectedOption.value : '');
      await getReprentativeByUserIdRepresentativeId(companyid, branchId, importerId, selectedOption ? selectedOption.value : '');
      await getReprentativeImage(companyid, branchId, importerId, selectedOption ? selectedOption.value : '');
    }

  };

  const getReprentativeByUserIdRepresentativeId = (compId, branchId, userID, ReprentativeId) => {

    Rate_Chart_Service.getReprentativeById(compId, branchId, userID, ReprentativeId).then((res) => {
      setmobileNo(res.data.mobile);
      // console.log(res.data);
    })
  };
  const getReprentativeImage = async (compId, branchId, userID, ReprentativeId) => {
    // alert("in method");
    await Rate_Chart_Service.getReprentativeByIdImage(compId, branchId, userID, ReprentativeId).then((res) => {
      setrepresentativeImage(res.data);
      // console.log(res.data);
      // alert("in image");
    });
  };

  // Slice the array of services to display only the current page's items
  const currentfilteredImports = filteredImports.slice(indexOfFirstItem, indexOfLastItem);

  // console.warn(currentfilteredImports);
  // Pagination items
  const paginationItems = [];
  for (let number = 1; number <= Math.ceil(filteredImports.length / itemsPerPage); number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>
    );
  }





  const handleSelectionCartingAgentReprentative = async (selectedOption, { action }) => {
    if (action === 'clear') {
      setmobileNo('');
      setRepresentative('');
      setOTP('');
      setreprentativeId('')
      setrepresentativeImage(null);
    }
    else {
      setRepresentative(selectedOption ? selectedOption.label : '');
      setreprentativeId(selectedOption ? selectedOption.value : '');

      await getReprentativeByUserIdRepresentativeId(companyid, branchId, cratingAgentId, selectedOption ? selectedOption.value : '');
      await getReprentativeImage(companyid, branchId, cratingAgentId, selectedOption ? selectedOption.value : '');



      // getReprentativeByCartingandRepresentativeId(companyid, branchId, cartingAgent, selectedOption ? selectedOption.value : '');
    }

  };


  const handleSelectionCartingAgent = (selectedOption, { action }) => {

    if (action === 'clear') {
      setCartingAgent('');
      setReprentativeArray([]);
      setRepresentative('');
      setmobileNo('');
      setCartingAgentId('');
      setOTP('');
      setreprentativeId('');
      setrepresentativeImage(null);
    }
    else {
      setCartingAgent(selectedOption ? selectedOption.label : '');
      setCartingAgentId(selectedOption ? selectedOption.value : '');

      getReprentativeByUserId(companyid, branchId, selectedOption ? selectedOption.value : '');
      setOTP('');
      setRepresentative('');
      setmobileNo('');
      setreprentativeId('');
      setrepresentativeImage(null);
      // getCartingAgentsReprentative(companyid, branchId, selectedOption ? selectedOption.label : '');
    }
  };


  useEffect(() => {

    Rate_Chart_Service.getAllParties(companyid, branchId).then((res) => {
      const namesMap = {};
      res.data.forEach(party => {
        namesMap[party.partyId] = party.partyName;
      });
      setPartyNames(namesMap);

      const partyOptions = res.data.map(party => ({
        value: party.partyId,
        label: party.partyName
      }));
      setParties(partyOptions);

    });
  }, [])


  const handleShow = (comp, branch, mawb, hawb, sir) => {

    getHistoryBySIRNo(comp, branch, mawb, hawb, sir);
    setShowModal(true);
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

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };


  const getHistoryBySIRNo = (comp, branch, mawb, hawb, sir) => {
    Rate_Chart_Service.getHistoryBySIRNo(comp, branch, mawb, hawb, sir).then((res) => {
      setImportsHistory(res.data);

    });
  };




  const handleRowClick = (index) => {
    setHighlightedIndex(index);
  };



  const handleValidation = () => {
    let formIsValid = true;
    const newErrors = {};


    if (!cartingAgent) {
      formIsValid = false;
      newErrors['cartingAgent'] = 'cartingAgent is required.';

    }
    if (!representative) {
      formIsValid = false;
      newErrors['representative'] = 'representative is required.';

    }
    if (!otp) {
      formIsValid = false;
      newErrors['otp'] = 'otp is required.';

    }
    if (!mobile) {
      formIsValid = false;
      newErrors['mobile'] = 'mobileNo is required.';

    }

    setErrors(newErrors);
    return formIsValid;
  };

  // PartyOrChaValidation
  const handleValidationPartyOrCha = () => {
    let formIsValid = true;
    const newErrors = {};



    if (!representative) {
      formIsValid = false;
      newErrors['representative'] = 'representative is required.';

    }
    if (!otp) {
      formIsValid = false;
      newErrors['otp'] = 'otp is required.';

    }
    if (!mobile) {
      formIsValid = false;
      newErrors['mobile'] = 'mobileNo is required.';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const staticOptions = [
    { label: 'No', value: 'Option 1' },
    { label: 'Yes', value: 'Option 2' },
  ];



  const handleForwarded = (event) => {
    const selectedValue = event.target.value;
    setSearchCriteria({ ...searchCriteria, forwardedStatus: selectedValue });
  };





  const findDgdcStatus = async () => {
    const PCKTYPEResponse = await Rate_Chart_Service.getjarsByJarId('J00009', companyid, branchId);
    const partyOptions = PCKTYPEResponse.data.map(jar => ({
      value: jar.jarDtlId,
      label: jar.jarDtlDesc
    }));
    setDgdcStatusArray(partyOptions);
  };
  const handleStatusChange = (selectedOption, { action }) => {
    if (action === 'clear') {
      setSearchCriteria({ ...searchCriteria, dgdcStatus: '' });
      setDGDC_Status(null)
    } else {
      setDGDC_Status(selectedOption);
      setSearchCriteria({ ...searchCriteria, dgdcStatus: selectedOption ? selectedOption.label : '' });
    }
  };






  const formatDate2 = (value) => {
    if (!value) {
      return "";
    }
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {

    // getAllImports(companyid, branchId);
    findDgdcStatus();
  }, []);



  const handleOptionButtonClick = (click) => {
    if (click == 'carting-agent') {
      handleShowCatingAgent();
    }
  };


  const updateimportConditions = async (companyid, branchId, transId, mawb, hawb, sir, buttonType) => {


    // console.log(importData);
    await Rate_Chart_Service.updateImportStatusCondition(companyid, branchId, transId, mawb, hawb, sir, userId, buttonType, importData).then((res) => {
      handleSearch(searchCriteria);
      makefieldEmpty();

    })
  }

  const [loastatus, setloastatus] = useState('N');
  const checkloa1 = (companyid, branchId, transId, mawb, hawb, sir, buttonType, noptobeSent) => {
    console.log('noptobeSent noptobeSent ', noptobeSent);
    const date = formatDate1(new Date());
    axios
      .get(`http://${ipaddress}parties/checkloa/${companyid}/${branchId}/${noptobeSent}/${date}`)
      .then((response) => {
        console.log('loa data ', response.data);
        if (response.data === 'Y') {
          // toast.error("The LOA for the party has expired.", {
          //   autoClose: 700
          // })
          setloastatus("Y");
          return;
        }
        else {
          setloastatus('N')

        }
      })
      .catch((error) => {
      });
  }


  const handleButtonClick = (companyid, branchId, transId, mawb, hawb, sir, buttonType, noptobeSent) => {
    // getByMAWBnoAndHAwb(companyid, branchId, transId, mawb, hawb, sir);
    // Check which button was pressed based on the buttonType parameter


    const data = {
      companyid,
      branchId,
      transId,
      mawb,
      hawb,
      sir,
      buttonType,
      noptobeSent
    };

    switch (buttonType) {



      case "party/cha":
        openSinglePartyChamodel(data);
        // alert("impose-Penalty button pressed");
        break;

      case "wrong":
        openWrongDepositmodel(data);
        // alert("impose-Penalty button pressed");
        break;


      case "NIPT":
        openCustomOfficerNIPT(data);
        // alert("impose-Penalty button pressed");
        break;


      case "impose-Penalty":
        openPenaltyModal(data);
        // alert("impose-Penalty button pressed");
        break;


      case "cancel":
        openCancelModal(data);
        break;
      case "Personal Infornation":
        openPersonalModel(data);
        // Execute the operation for Request for Special Carting
        // alert("Update Personal Infrmation button pressed");
        break;
      case "hold":
        Swal.fire({
          title: 'Are you sure to request for hold for this parcel?',
          width: 'auto',
          position: 'top', // Set the position to 'top'
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          // reverseButtons: true,
          customClass: {
            title: 'your-custom-title-class', // Define a custom class for the title
            cancelButton: 'your-custom-cancel-button-class', // Define a custom class for the cancel button
            confirmButton: 'your-custom-confirm-button-class', // Define a custom class for the confirm button
            content: 'your-custom-content-class', // Define a custom class for the content
          },
          buttonsStyling: false,
          // background: 'transparent', // This will switch the positions of the buttons
        }).then((result) => {
          if (result.isConfirmed) {
            updateimportConditions(companyid, branchId, transId, mawb, hawb, sir, buttonType);
          } else {

          }
        });

        break;
      case "unhold":
        Swal.fire({
          title: 'Are you sure to request for Unhold for this parcel?',
          position: 'top',
          width: 'auto', // Set the position to 'top'
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          // reverseButtons: true,
          customClass: {
            title: 'your-custom-title-class', // Define a custom class for the title
            cancelButton: 'your-custom-cancel-button-class', // Define a custom class for the cancel button
            confirmButton: 'your-custom-confirm-button-class', // Define a custom class for the confirm button
            content: 'your-custom-content-class', // Define a custom class for the content
          },
          buttonsStyling: false, // This will switch the positions of the buttons
        }).then((result) => {
          if (result.isConfirmed) {
            updateimportConditions(companyid, branchId, transId, mawb, hawb, sir, buttonType);
          } else {

          }
        });
        break;
      case "personal-carriage":
        Swal.fire({
          title: 'Are you sure to request for Personal Carriage for this parcel?',
          width: 'auto',
          position: 'top', // Set the position to 'top'
          cancelButtonText: 'No',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          customClass: {
            title: 'your-custom-title-class', // Define a custom class for the title
            cancelButton: 'your-custom-cancel-button-class', // Define a custom class for the cancel button
            confirmButton: 'your-custom-confirm-button-class', // Define a custom class for the confirm button
            content: 'your-custom-content-class', // Define a custom class for the content
          },
          buttonsStyling: false, // This will switch the positions of the buttons
        }).then((result) => {
          if (result.isConfirmed) {
            updateimportConditions(companyid, branchId, transId, mawb, hawb, sir, buttonType);
          } else {

          }
        });
        break;
      case "unpersonal-carriage":
        Swal.fire({
          title: 'Are you sure to request for Cancel Personal Carriage for this parcel?',
          width: 'auto',
          position: 'top', // Set the position to 'top'
          cancelButtonText: 'No',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          customClass: {
            title: 'your-custom-title-class', // Define a custom class for the title
            cancelButton: 'your-custom-cancel-button-class', // Define a custom class for the cancel button
            confirmButton: 'your-custom-confirm-button-class', // Define a custom class for the confirm button
            content: 'your-custom-content-class', // Define a custom class for the content
          },
          buttonsStyling: false, // This will switch the positions of the buttons
        }).then((result) => {
          if (result.isConfirmed) {
            updateimportConditions(companyid, branchId, transId, mawb, hawb, sir, buttonType);
          } else {

          }
        });
        break;

      case "carting":
        OpenSingleCartingMode(data);
        // alert("Handover to Carting Agent button pressed");
        break;
      case "special-carting":
        Swal.fire({
          title: 'Are you sure to request for Special Carting for this parcel?',
          width: 'auto',
          position: 'top', // Set the position to 'top'
          cancelButtonText: 'No',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          customClass: {
            title: 'your-custom-title-class', // Define a custom class for the title
            cancelButton: 'your-custom-cancel-button-class', // Define a custom class for the cancel button
            confirmButton: 'your-custom-confirm-button-class', // Define a custom class for the confirm button
            content: 'your-custom-content-class', // Define a custom class for the content
          },
          buttonsStyling: false, // This will switch the positions of the buttons
        }).then((result) => {
          if (result.isConfirmed) {
            updateimportConditions(companyid, branchId, transId, mawb, hawb, sir, buttonType);
          } else {

          }
        });
        break;

      case "unspecial-carting":
        Swal.fire({
          title: 'Are you sure to request for Cancel Special Carting for this parcel?',
          width: 'auto',
          position: 'top', // Set the position to 'top'
          cancelButtonText: 'No',
          confirmButtonText: 'Yes',
          showCancelButton: true,
          customClass: {
            title: 'your-custom-title-class', // Define a custom class for the title
            cancelButton: 'your-custom-cancel-button-class', // Define a custom class for the cancel button
            confirmButton: 'your-custom-confirm-button-class', // Define a custom class for the confirm button
            content: 'your-custom-content-class', // Define a custom class for the content
          },
          buttonsStyling: false, // This will switch the positions of the buttons
        }).then((result) => {
          if (result.isConfirmed) {
            updateimportConditions(companyid, branchId, transId, mawb, hawb, sir, buttonType);
          } else {

          }
        });
        break;

      case "heavy":
        openHeavModal(data);
        // alert("Heavy Package button pressed");
        break;


      case "override":
        openOverrideModel(data);
        // alert("Heavy Package button pressed");
        break;






      case "heavy-Report":
        // Execute the operation for Handover to Carting Agent
        alert("Heavy Package Report button pressed");
        break;

      default:
        alert("Unknown button pressed");
    }
  };


  const printBarcode = async (mawb, seino, nop, sirdate, reqdate, niptStatus, requestId, hawb, igm) => {
    try {
      // console.log(mawb, seino, nop);
      const response = await InviceService.getbarcode(mawb, seino, nop, sirdate, reqdate, "IMPORT", niptStatus, requestId, hawb, igm, "imp");

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


  const [filterdata3, setFilteredImports3] = useState([]);
  const [uniqueMasterNumberCount3, setUniqueMasterNumberCount3] = useState(0);
  const [totalNop3, setTotalNop3] = useState(0);
  const handleSearch3 = async (searchCriteria) => {
    // console.log("IN Search");
    console.log(searchCriteria);
    if (logintype === 'CHA') {
      await Rate_Chart_Service.SearchImportsforCHA({ params: searchCriteria }, logintypeid, logintype).then((response) => {
        console.log('filterdata2 ', response.data);
        setFilteredImports3(response.data);
        setCurrentPage3(1);
        const uniqueMasterNumbers = new Set();
        let totalNop = 0;

        // Calculate unique MasterNo values and total nop
        response.data.forEach(importItem => {
          uniqueMasterNumbers.add(importItem[5]);
          totalNop += importItem[4];
        });

        setUniqueMasterNumberCount3(uniqueMasterNumbers.size);
        setTotalNop3(totalNop);


      })
        .catch((error) => {
          console.error('Error searching for imports:', error);
        });
    }

    if (logintype === 'Console') {
      await Rate_Chart_Service.SearchImportsforConsole({ params: searchCriteria }, logintypeid, logintype).then((response) => {
        console.log('filterdata2 ', response.data);
        setFilteredImports3(response.data);
        setCurrentPage3(1);
        const uniqueMasterNumbers = new Set();
        let totalNop = 0;

        // Calculate unique MasterNo values and total nop
        response.data.forEach(importItem => {
          uniqueMasterNumbers.add(importItem[5]);
          totalNop += importItem[4];
        });

        setUniqueMasterNumberCount3(uniqueMasterNumbers.size);
        setTotalNop3(totalNop);


      })
        .catch((error) => {
          console.error('Error searching for imports:', error);
        });
    }

    if (logintype === 'Carting Agent') {
      await Rate_Chart_Service.SearchImportsforcartingagent({ params: searchCriteria }, logintypeid, logintype).then((response) => {
        console.log('filterdata2 ', response.data);
        setFilteredImports3(response.data);
        setCurrentPage3(1);
        const uniqueMasterNumbers = new Set();
        let totalNop = 0;

        // Calculate unique MasterNo values and total nop
        response.data.forEach(importItem => {
          uniqueMasterNumbers.add(importItem[5]);
          totalNop += importItem[4];
        });

        setUniqueMasterNumberCount3(uniqueMasterNumbers.size);
        setTotalNop3(totalNop);


      })
        .catch((error) => {
          console.error('Error searching for imports:', error);
        });
    }


    if (logintype === 'Party') {
      await Rate_Chart_Service.SearchImportsforparty({ params: searchCriteria }, logintypeid, logintype).then((response) => {
        console.log('filterdata2 ', response.data);
        setFilteredImports3(response.data);
        setCurrentPage3(1);
        const uniqueMasterNumbers = new Set();
        let totalNop = 0;

        // Calculate unique MasterNo values and total nop
        response.data.forEach(importItem => {
          uniqueMasterNumbers.add(importItem[5]);
          totalNop += importItem[4];
        });

        setUniqueMasterNumberCount3(uniqueMasterNumbers.size);
        setTotalNop3(totalNop);


      })
        .catch((error) => {
          console.error('Error searching for imports:', error);
        });
    }


  };



  const [currentPage3, setCurrentPage3] = useState(1);
  const [itemsPerPage3] = useState(10);

  const indexOfLastItem3 = currentPage3 * itemsPerPage3;
  const indexOfFirstItem3 = indexOfLastItem3 - itemsPerPage3;
  const currentItems3 = filterdata3.slice(indexOfFirstItem3, indexOfLastItem3);
  const totalPages3 = Math.ceil(filterdata3.length / itemsPerPage3);

  // Function to handle page change
  const handlePageChange3 = (page) => {
    if (page >= 1 && page <= totalPages3) {
      setCurrentPage3(page);
    }
  };
  const displayPages3 = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage3 - middlePage;
    let endPage = currentPage3 + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages3, centerPageCount);
    }

    if (endPage > totalPages3) {
      endPage = totalPages3;
      startPage = Math.max(1, totalPages3 - centerPageCount + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };


  // const checkDGDCStatus = (companyid, branchId, transId, mawb, hawb, sir, buttonType, noptobeSent) => {
  // };








  const [selectedConsole, setSelectedConsole] = useState('');
  const [ConsoleNameById, setConsoleNameById] = useState(null);
  const [consoles, setConsoles] = useState([]);
  const [chas, setChas] = useState([]);
  const [selectedCha, setSelectedCha] = useState(null);
  const [representatives, setRepresentatives] = useState([]);
  const [selectedRepresentative, setSelectedRepresentative] = useState(null);
  const [representativeNew, setRepresentativeNew] = useState({
    companyId: '',
    branchId: '',
    userId: '',
    representativeId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobile: '',
    otp: '',
    imagePath: ''
  });

  const handleShowCatingAgent = async () => {
    findConsoles();
    setShowModaCartingAgent(true);
  };

  const findExternalPartyByTypeNew = async (compid, branchId, Type) => {
    const partyResponse = await Rate_Chart_Service.getAllExternalPartiesByType(compid, branchId, Type);
    const partyOptions = partyResponse.data.map(externalUser => ({
      value: externalUser[0],
      label: externalUser[1]
    }));
    return partyOptions;

  };


  const findConsoles = async () => {
    const partyOptions = await findExternalPartyByTypeNew(companyid, branchId, 'console')
    setConsoles(partyOptions);
  };

  const findCHAs = async () => {
    const partyOptions = await findExternalPartyByTypeNew(companyid, branchId, 'CHA')
    setChas(partyOptions);
  };


  const handleConsoleChange = selectedOption => {
    setErrors(prevErrors => selectedOption ? { ...prevErrors, ConsoleNameById: '' } : { ...prevErrors, ConsoleNameById: 'Console is required' });
    setConsoleNameById(selectedOption);
    if (selectedOption) {
      getRepresentativeByUser(selectedOption.value);
    }
  };


  const handleSearchConsoledata = async (console) => {

    const newErrors = {};

    if (!ConsoleNameById) {
      newErrors['ConsoleNameById'] = 'Please Select Console';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    };

    setLoading(true);
    try {
      Rate_Chart_Service.getByCompIdBranchIdDgdcStatus(companyid, branchId, console).then((res) => {
        if (res.data.length === 0) {
          toast.error('No records found', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        } else {
          setHandOverToCartingAgent(res.data);

          // getRepresentativeByUser(ConsoleNameById.value);
        }
      });
    }
    catch (error) {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    }
    finally {
      setLoading(false);
    }
  };

  const getRepresentativeByUser = async (console) => {
    const response = await Rate_Chart_Service.getRepresentativeByUser(companyid, branchId, console);
    const partyOptions = response.data.map(externalUser => ({
      value: externalUser[0],
      label: externalUser[1]
    }));
    setRepresentatives(partyOptions);
  };


  const handleCloseCartingAgent = () => {
    setShowModaCartingAgent(false);
    setSelectedItems([]);
    setSelectAll([]);
    setConsoleNameById(null);
    setHandOverToCartingAgent([]);
    makefieldEmpty();
    setSelectedRepresentative(null);
  }

  const handleselectedRepresentative = selectedOption => {
    setErrors(prevErrors => selectedOption ? { ...prevErrors, selectedRepresentative: '' } : { ...prevErrors, selectedRepresentative: 'please select representative' });
    setSelectedRepresentative(selectedOption);
    if (selectedOption) {
      getReprentative(selectedOption ? selectedOption.value : '');
    } else {
      setRepresentativeNew({
        companyId: '',
        branchId: '',
        userId: '',
        representativeId: '',
        firstName: '',
        middleName: '',
        lastName: '',
        mobile: '',
        otp: '',
        imagePath: ''
      });
      setOTP('');
      setTpstatus('');
    }
  };


  const getReprentative = async (represenatative) => {
    const res = await Rate_Chart_Service.getRepresentative(companyid, branchId, represenatative);
    setRepresentativeNew({
      companyId: res.data.companyId,
      branchId: res.data.branchId,
      userId: res.data.userId,
      representativeId: res.data.representativeId,
      firstName: res.data.firstName,
      middleName: res.data.middleName,
      lastName: res.data.lastName,
      mobile: res.data.mobile,
      otp: res.data.otp,
      imagePath: res.data.imagePath
    });
  };


  const checkotp4 = (noptobeSent) => {
    if (!selectedRepresentative) {
      toast.error("Please select representative", {
        autoClose: 700
      })
      return;
    }

    axios
      .get(`http://${ipaddress}represent/generateotp/${companyid}/${branchId}/${selectedRepresentative.value}/${representativeNew.mobile}/${noptobeSent}`)
      .then(() => {
        toast.success("OTP sent successfully", {
          autoClose: 700
        })

      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };


  const makefieldEmpty = () => {
    setDestinations([]);
    setSelectedDestination(null);
    setpctmNumberImports([]);
    setCustomPCTMDate(new Date());
    setCustomPCTMNumber('');
    setSelectedItemsCustomsPctm([]);
    setSelectCustomAllPctm(false);
    setSelectedItemsCustoms([]);
    setSelectCustomAll(false);
    setCustomDate(new Date());
    setCustomNumber('');
    setTpNumberImports([]);
    setConsoleNameById(null);
    setConsoleobeSent('');
    setSelectedConsole('');
    setloastatus('N');
    setHawb('');
    setSirNo('');
    setImporterId('');
    setIec('');
    setSezEntityId('');
    setPackageContentType('');
    setNop(1);
    setParcelType('');
    setImportRemarks('');
    setDescriptionOfGoods('');
    setChaCde('');
    setAssessableValue('');
    setGrossWeight('');
    setBeRequestId('');
    setBeNo('');
    setFlightNo('');
    setFlightDate('');
    setIgmDate('');
    setBeDate('');
    setTpDate('');
    setoutDate('');
    setStatus('');
    setApprovedBy('');
    setCreatedBy('');
    setuomWeight('');
    setImportAddress('');
    setUomPackages('');
    setTpNo('');
    setPctmNo('');
    setErrors('');
    setAssessableValue('');
    setnewnsdlStatus('');
    setGrossWeight('');
    setBeRequestId('');
    setImpTransId('');
    setImpTransDate('');
    setApprovedBy('');
    setEditedBy('');
    setEditedDate('');
    setCreatedDate('');
    setApprovedDate('');
    setCreatedBy('');
    setuomWeight('KGS');
    setImportAddress('');
    setNSDL_Status('');
    seTDGDC_Status('');
    setcompanyId('');
    setCreatedUser('');
    setApprovedUser('');
    setHoldStatus('');
    setHoldDate('');
    setHoldBy('');
    setHpStatus('');
    sethppackageno('');
    setHpWeight('');
    setPcStatus('');
    setScStatus('');
    setCancelStatus('');
    setCancelRemarks('');
    setImposePenaltyAmount('');
    setImposePenaltyRemarks('');
    setNationality('');
    setDeputedCoName('');
    setDeputedCoDesignation('');
    setDeputedFromDestination('');
    setDeputedToDestination('');
    setEscortDate(''); // Assuming escortDate is in a compatible format
    setApproverName('');
    setApproverDesignation('');
    setApproverDate(''); // Assuming approverDate is in a compatible format
    setConfirmation('');
    setpassportNo('');
    // Setting values for passengerName and address
    setPassengerName('');
    setAddress('');
    setReasonforOverride('');
    setnsdlStatusDocs('');
    setreprentativeId('');
    setReprentativeArray([]);
    setRepresentative('');
    setpartyName('');
    setmobileNo('');
    setOTP('');
    setcartingAgentArray([]);
    setCartingAgent('');
    sethandedOverPartyId('');
    sethandedOverRepresentativeId('');
    sethandedOverToType('');
    setSelectedOption('party');
    setexternalPartyName('');
    setReceivedCartingImports([]);
    setrepresentativeImage(null);
    setniptStatus('');
    setqrcodeUrl('');
    setimporternameOnParcel('');
    setHeavyParcelArray([]);
    setdoNumber('');
    setdoDate('');
    setchaName('');
    setNoptobeSent('');
    setniptApproverDate('');
    setniptApproverDesignation('');
    setniptApproverName('');
    setniptCustomOfficerName('');
    setniptCustomsOfficerDesignation('');
    setniptDateOfEscort('');
    setniptDeputedToDestination('');
    setniptDeputedFromDestination('');
    setwrongDepositFilePath('');
    setwrongDepositwrongDepositRemarks('');
    setwrongDepositStatus('');
    setdetentionReceiptNo('');
    setNextPersonalCarriage(true);
    setPersonalSIRModel(false);

    setForwardedStatus("N");
    setNoc(0);
    setDgdcSeepzInScan(0);
    setDgdcSeepzOutScan(0);
    setDgdcCargoInScan(0)
    setDgdcCargoOutScan(0);
    setMopStatus('N');
    setImportsHistory([]);
    setselectedreceivedCarting([]);
    setRepresentatives([]);
    setSelectedRepresentative(null);
    setRepresentativeNew({
      companyId: '',
      branchId: '',
      userId: '',
      representativeId: '',
      firstName: '',
      middleName: '',
      lastName: '',
      mobile: '',
      otp: '',
      imagePath: ''
    });
    setOTP('');
    setTpstatus('');

  };



  const updateCartingAgentStatus = async (cid, bid, user, otp, agent, reprentativeId) => {
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

      if (!selectedItems || selectedItems.length === 0) {
        toast.warning('Please Select Items Before Submitting!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
          style: { width: '25vw' }
        });

      }
      else {

        setLoading(true);


        try {
          await Rate_Chart_Service.updateCartingAgentStatus(cid, bid, user, otp, agent, reprentativeId, selectedItems, tpstatus).then((res) => {

            if (res.data) {
              setHandOverToCartingAgent([]);

              toast.success('Import Updated successfully!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 600,
              });
              handleSearch(searchCriteria);

              setRepresentativeNew({
                companyId: '',
                branchId: '',
                userId: '',
                representativeId: '',
                firstName: '',
                middleName: '',
                lastName: '',
                mobile: '',
                otp: '',
                imagePath: ''
              });
              setOTP('');
            }
            else {
              toast.error('Please Enter Correct OTP!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 600,
              });
            }
          });
        }
        catch {
          console.log("error");
        }
        finally {
          setLoading(false);
        }
      }
    }
  };

  const openreceivedCartingmodel = async () => {
    findConsoles();
    setreceivedCartingmodel(true);
  };


  const SearchCartingAgentsImports = async (compid, branchid, cartingagent, representative) => {

    setLoading(true);
    try {
      const response = await Rate_Chart_Service.getImportsforReceivedCarting(compid, branchid, cartingagent, representative);
      setReceivedCartingImports(response.data);
      if (!response.data.length > 0) {
        toast.error("No Records found", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
        });
      }
    }
    catch {
      console.log("error");
    }
    finally {
      setLoading(false);
    }
  };

  // Received From Carting agents

  useEffect(() => {
    setselectAllReceived(selectedreceivedCarting.length === ReceivedCartingImports.length);
  }, [selectedreceivedCarting, ReceivedCartingImports]);

  const handleSelectAllToggleReceivedCarting = async () => {
    if (selectAllReceived) {
      setselectAllReceived(false); // Deselect all
      setselectedreceivedCarting([]); // Clear the selected items
    } else {
      setselectAllReceived(true); // Select all
      setselectedreceivedCarting([...ReceivedCartingImports]); // Select all items
    }

  };

  const handleRowCheckboxChangeReceived = async (index) => {
    const selectedreceivedCartingAgents = ReceivedCartingImports[index];

    if (selectedreceivedCartingAgents) {
      const selectedIndex = selectedreceivedCarting.findIndex((item) => item.sirNo === selectedreceivedCartingAgents.sirNo);

      if (selectedIndex !== -1) {
        // Remove the item from the selected items
        const updatedSelectedItems = [...selectedreceivedCarting];
        updatedSelectedItems.splice(selectedIndex, 1);
        setselectedreceivedCarting(updatedSelectedItems);
      } else {
        // Add the item to the selected items
        setselectedreceivedCarting([...selectedreceivedCarting, selectedreceivedCartingAgents]);
      }
    }
  };

  const closereceivedCartingmodel = () => { setreceivedCartingmodel(false); makefieldEmpty(); };


  // Received From Carting agents

  const updateReceivedCartingAget = async (cid, bid, user, otp, agent, reprentativeId) => {

    if (!selectedreceivedCarting || selectedreceivedCarting.length === 0) {
      toast.warning('Please Select Items Before Submitting!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
        style: { width: '25vw' }
      });

    }
    else {
      setLoading(true);
      try {

        await Rate_Chart_Service.updateReceivedCartingAgents(cid, bid, user, otp, agent, reprentativeId, selectedreceivedCarting).then((res) => {
          if (res.data) {
            setReceivedCartingImports([]);
            setConsoleNameById(null);
            setSelectedRepresentative(null);
            toast.success('Import Updated successfully!', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 600,
            });
            handleSearch(searchCriteria);
            setRepresentativeNew({
              companyId: '',
              branchId: '',
              userId: '',
              representativeId: '',
              firstName: '',
              middleName: '',
              lastName: '',
              mobile: '',
              otp: '',
              imagePath: ''
            });
            setOTP('');

          }
          else {
            toast.error('Please Enter Correct OTP!', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 600,
            });
          }
        });

      } catch {
        toast.error('something went wrong!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
        });
      }
      finally {
        setLoading(false);
      }
    }
  };


  const handleShowPartyOrCHA = async () => {
    findCHAs();
    setsetPertyORChamodel(true);
  };


  const handleCHAChange = selectedOption => {
    setErrors(prevErrors => selectedOption ? { ...prevErrors, cha: '' } : { ...prevErrors, cha: 'Please Select CHA' });
    setSelectedCha(selectedOption);
    if (selectedOption) {
      getRepresentativeByUser(selectedOption.value);
    }
  };

  const closePartyORChamodel = () => {
    setsetPertyORChamodel(false); makefieldEmpty();
    setSelectedCha(null);
    setSelectedItemsPartyOrCHA([]);
    setselectPartyOrCHAAll(false);
    setImportsOfPartyorCha([]);

  }

  // HandOVer to Party or Cha


  useEffect(() => {
    setselectPartyOrCHAAll(selectedItemsPartyOrCHA.length === ImportsOfPartyorCha.length);
  }, [selectedItemsPartyOrCHA, ImportsOfPartyorCha]);

  const handleSelectAllTogglePartyOrCha = () => {
    if (selectPartyOrCHAAll) {
      setSelectedItemsPartyOrCHA([]);
    } else {
      setSelectedItemsPartyOrCHA(ImportsOfPartyorCha);
    }
    setselectPartyOrCHAAll(!selectPartyOrCHAAll);
  };

  const handleRowCheckboxChangePartyOrCHA = (index) => {
    const selectedItemPartyOrCHA = ImportsOfPartyorCha[index];

    if (selectedItemPartyOrCHA) {
      const selectedIndex = selectedItemsPartyOrCHA.findIndex((item) => item.sirNo === selectedItemPartyOrCHA.sirNo);

      if (selectedIndex !== -1) {
        // Remove the item from the selected items
        const updatedSelectedItems = [...selectedItemsPartyOrCHA];
        updatedSelectedItems.splice(selectedIndex, 1);
        setSelectedItemsPartyOrCHA(updatedSelectedItems);
      } else {
        // Add the item to the selected items
        setSelectedItemsPartyOrCHA([...selectedItemsPartyOrCHA, selectedItemPartyOrCHA]);
      }
    }
  };



  const handleSearchCHAdata = async (cha) => {

    setLoading(true);
    try {
      const response = await getImportsofPartyORCha(companyid, branchId, cha);
      if (response.length === 0) {
        toast.error("No Data found for this Party", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 900,
        });
      }
      setImportsOfPartyorCha(response);
    }
    catch (error) {
      toast.error("something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 900,
      });
    }
    finally {
      setLoading(false);
    }
  };



  const handleSubmitExternalPartySearch = async (importerId, type) => {

    if (importerId) {
      if (type === 'cha') {
        handleSubmitExpiredExternalPartySearch(importerId, type);
      }
      const gotimportsofParty = await getImportsofPartyORCha(companyid, branchId, importerId, type);
      if (gotimportsofParty.length === 0 && expiredPartyList.length === 0) {
        toast.error("No Data found for this Party", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
        });
      }
      else {
        setImportsOfPartyorChaModel(true);
        setsetPertyORChamodel(false);
        setImportsOfPartyorCha(gotimportsofParty);
      }
    }
    else {
      toast.error("Select Party First", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    }

  };

  // GetImportsofPartorCha
  const getImportsofPartyORCha = async (compid, branchid, importerId) => {
    const date = formatDate1(new Date());
    console.log("Searhing1111");
    const Importsofpatry = await Rate_Chart_Service.getImportsofPartyORCha(compid, branchid, importerId, date);
    return Importsofpatry.data;
  };



  const handleSubmitExpiredExternalPartySearch = async (importerId, type) => {

    if (importerId) {


      // if (gotimportsofParty.length === 0) {

      // }
      // else {

      //   setexpiredPartyList(gotimportsofParty);
      // }
    }
    else {
      toast.error("Select Party First", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
      });
    }

  };



  const updatePartyOrCHAStatus = async (cid, bid, userId, otp, agent, reprentativeId) => {

    // Check if there are selected items
    if (!selectedItemsPartyOrCHA || selectedItemsPartyOrCHA.length === 0) {
      toast.warning('Please Select Items Before Submitting!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 600,
        style: { width: '25vw' }
      });
    } else {

      setLoading(true);

      try {
        const res = await Rate_Chart_Service.updatePartyOrCHAStatus(cid, bid, userId, otp, agent, reprentativeId, selectedItemsPartyOrCHA);

        // Check the response from the server
        if (res.data === 'OK') {

          toast.success('Import Updated successfully!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });

          setImportsOfPartyorCha([]);
          setexpiredPartyList([]);
          setSelectedCha(null);
          setSelectedRepresentative(null);
          setSelectedItemsPartyOrCHA([]);
          setselectPartyOrCHAAll(false);



          handleSearch(searchCriteria);
        } else {
          toast.error('Please Enter Correct OTP!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        }
      }
      catch (error) {

        let errorMessage = 'An unexpected error occurred. Please try again later.';

        if (error.response && error.response.status === 400 && error.response.data) {
          // Check if the server provided a specific error message
          errorMessage = error.response.data || errorMessage;
        }

        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1200,
          style: { width: '520px' },
        });
      }
      finally {
        setLoading(false);
      }
    }
  };



  const getconsoleName = async (consoleName) => {
    const data = await getNameByIdExternalParty(consoleName);
    setConsoleobeSent(data);
    if (consoleName) {
      setSelectedConsole(consoleName);
      getRepresentativeByUser(consoleName);
    }
  };



  const OpenSingleCartingMode = async (data) => {
    setModalData(data);
    setNoptobeSent(data.noptobeSent);
    getByMAWBnoAndHAwb(data.companyid, data.branchId, data.transId, data.mawb, data.hawb, data.sir);
    setsingleCartingModel(true);
  };


  const openSinglePartyChamodel = async (data) => {
    setModalData(data);
    await getByMAWBnoAndHAwb(data.companyid, data.branchId, data.transId, data.mawb, data.hawb, data.sir);
    setsinglechaModel(true);
  };


  const [tpNumberImports, setTpNumberImports] = useState([]);
  const [customTPNumbermodel, setCustomTPNumbermodel] = useState(false);
  const [customNumber, setCustomNumber] = useState('');
  const [customDate, setCustomDate] = useState(new Date());

  const openCustomTPModel = async () => {
    findConsoles();
    setCustomTPNumbermodel(true);
  };

  const closeCustomTPNumbermodel = () => {
    setCustomTPNumbermodel(false);
    makefieldEmpty();
  };

  const SearchCustomTpNumberUpdateImports = async (cid, bid, consoleName) => {
    setLoading(true);
    try {
      const response = await Rate_Chart_Service.findCustomTpNumberImports(cid, bid, consoleName);

      if (!response.data || !response.data.length > 0) {
        toast.error("No Data found for this Console", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 900,
        });
      }
      else {
        setTpNumberImports(response.data);
      }
    }
    catch {
      console.log("erorr");
    } finally {
      setLoading(false);
    }
  };

  // Update Custom Tp Number
  const [selectCustomAll, setSelectCustomAll] = useState(false);
  const [selectedItemsCustoms, setSelectedItemsCustoms] = useState([]);

  useEffect(() => {
    setSelectCustomAll(selectedItemsCustoms.length === tpNumberImports.length);
  }, [selectedItemsCustoms, tpNumberImports]);

  const handleSelectAllToggleCustoms = () => {
    if (selectCustomAll) {
      setSelectedItemsCustoms([]);
    } else {
      setSelectedItemsCustoms(tpNumberImports);
    }
    setSelectCustomAll(!selectCustomAll);
  };

  const handleRowCheckboxChangeCustoms = (index) => {
    const selectedItems = tpNumberImports[index];

    if (selectedItems) {
      const selectedIndex = selectedItemsCustoms.findIndex((item) => item.sirNo === selectedItems.sirNo);

      if (selectedIndex !== -1) {
        // Remove the item from the selected items
        const updatedSelectedItems = [...selectedItemsCustoms];
        updatedSelectedItems.splice(selectedIndex, 1);
        setSelectedItemsCustoms(updatedSelectedItems);
      } else {
        // Add the item to the selected items
        setSelectedItemsCustoms([...selectedItemsCustoms, selectedItems]);
      }
    }
  };

  const submitCustomsTpNumber = async (companyId, branchId, customTPNo, CustomTpDate) => {
    setLoading(true);
    try {
      const response = await Rate_Chart_Service.updateCustomTpNumber(companyId, branchId, customTPNo, CustomTpDate, ConsoleNameById.value, userId, selectedItemsCustoms);

      if (response.data === 'Imports Updated Successfully') {
        toast.success("Imports Updated Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 900,
        });
        setConsoleNameById(null);
        setTpNumberImports([]);
        setCustomDate(new Date());
        setCustomNumber('');
        setSelectedItemsCustoms([]);
        setSelectCustomAll(false);
      }
      else {
        toast.error("something went wrong", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 900,
        });
      }

    }
    catch {
      toast.error("something went wrong", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 900,
      });
    }
    finally {
      setLoading(false);
    }
  };

  // Custom PCTM NUMBER update
  const [pctmNumberImports, setpctmNumberImports] = useState([]);
  const [customPCTMNumbermodel, setCustomPCTMNumbermodel] = useState(false);
  const [customPCTMNumber, setCustomPCTMNumber] = useState('');
  const [customPCTMDate, setCustomPCTMDate] = useState(new Date());
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);


  const openCustomPCTMNumbermodel = async () => {
    findConsoles();
    setCustomPCTMNumbermodel(true);
  };

  const closeCustomPCTMNumbermodel = () => {
    setCustomPCTMNumbermodel(false);
    makefieldEmpty();
  };


  const getDistinctPorts = async (consoleName) => {
    const response = await Rate_Chart_Service.getDistinctPorts(companyid, branchId, consoleName);
    const destinationsOptions = response.data.map(destination => ({
      value: destination[0],
      label: destination[0]
    }));
    setDestinations(destinationsOptions);
  };

  // Update Custom Tp Number
  const [selectCustomAllPctm, setSelectCustomAllPctm] = useState(false);
  const [selectedItemsCustomsPctm, setSelectedItemsCustomsPctm] = useState([]);

  useEffect(() => {
    setSelectCustomAllPctm(selectedItemsCustomsPctm.length === pctmNumberImports.length);
  }, [selectedItemsCustomsPctm, pctmNumberImports]);

  const handleSelectAllToggleCustomsPctm = () => {
    if (selectCustomAllPctm) {
      setSelectedItemsCustomsPctm([]);
    } else {
      setSelectedItemsCustomsPctm(pctmNumberImports);
    }
    setSelectCustomAllPctm(!selectCustomAllPctm);
  };

  const handleRowCheckboxChangeCustomsPctm = (index) => {
    const selectedItems = pctmNumberImports[index];

    if (selectedItems) {
      const selectedIndex = selectedItemsCustomsPctm.findIndex((item) => item.sirNo === selectedItems.sirNo);

      if (selectedIndex !== -1) {
        // Remove the item from the selected items
        const updatedSelectedItems = [...selectedItemsCustoms];
        updatedSelectedItems.splice(selectedIndex, 1);
        setSelectedItemsCustomsPctm(updatedSelectedItems);
      } else {
        // Add the item to the selected items
        setSelectedItemsCustomsPctm([...selectedItemsCustomsPctm, selectedItems]);
      }
    }
  };


  const handleConsoleChangePctmImports = selectedOption => {
    setErrors(prevErrors => selectedOption ? { ...prevErrors, ConsoleNameById: '' } : { ...prevErrors, ConsoleNameById: 'Console is required' });
    setConsoleNameById(selectedOption);
    if (selectedOption) {
      getDistinctPorts(selectedOption.value);
    }
    else {
      setDestinations([]);
      setErrors(prevErrors => ({ ...prevErrors, port: 'Select port of destination' }));
      setSelectedDestination(null);
    }
  };



  const handleDestinationChange = selectedOption => {
    setErrors(prevErrors => selectedOption ? { ...prevErrors, port: '' } : { ...prevErrors, port: 'Select port of destination' });
    if (selectedOption) {
      setSelectedDestination(selectedOption);
    } else {
      setSelectedDestination(null);
    }


  };

  const findCustomPctmNumberImports = async (consoleName, country) => {
    setLoading(true);
    try {
      const response = await Rate_Chart_Service.findCustomPctmNumberImports(companyid, branchId, consoleName, country, selectedItemsCustomsPctm);
      if (!response.data || !response.data.length > 0) {
        toast.error("No Data found for this Console", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 900,
        });
      }
      else {
        setpctmNumberImports(response.data)
      }
    }
    catch {
      toast.error("something went wrong!!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 900,
      });
    }
    finally {
      setLoading(false);
    }
  };




  const submitCustomsPCTMNumber = async (pctmNumber, pctmdate, consoleName, destination) => {
    try {
      setLoading(true);
      const response = await Rate_Chart_Service.updateCustomPctmNumber(companyid, branchId, pctmNumber, pctmdate, consoleName, destination, userId, selectedItemsCustomsPctm);
      if (response.data) {
        toast.success("Imports updated successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 900,
        });

        setConsoleNameById(null);
        setpctmNumberImports([]);
        setCustomPCTMDate(new Date());
        setCustomPCTMNumber('');
        setSelectedItemsCustomsPctm([]);
        setSelectCustomAllPctm(false);
        setDestinations([]);
        setSelectedDestination(null);
      }

    } catch {
      toast.error("something went wrong!!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 900,
      });
    } finally {
      setLoading(false);
    }
  };





  const [loading, setLoading] = useState(false);






  return (





    <div>

      {loading && (
        <div style={styles2.overlay}>
          <ReactLoading type="spin" color="#0000FF" height={300} width={80} />
        </div>
      )}





      {(logintype === 'Party' || logintype === 'CHA' || logintype === 'Carting Agent' || logintype === 'Console') ? (
        <div className="Container" >

          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
            icon={faPlaneArrival}
            style={{
              marginRight: '8px',
              color: 'black',
            }}
          />Import</h5>
          <Card>

            <CardBody>

              <Row>

                <Col md={4}>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Search By</Label>
                    <Input
                      type="text" name="SearchBy"
                      className="form-control inputField"
                      value={searchCriteria.searchValue}
                      onChange={handleSearchChange}




                    />
                  </FormGroup>

                </Col>

                <Col md={4}>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Date From</Label>
                    <div> {/* Wrap in an input group */}

                      <DatePicker
                        selected={searchCriteria.startDate ? new Date(searchCriteria.startDate) : null}
                        wrapperClassName="custom-react-datepicker-wrapper"
                        onChange={(date) => {
                          if (date) {
                            // Set the time to 12:00 AM in UTC time
                            date.setHours(12, 0, 0, 0);
                            // Convert the selected date and time to ISO format
                            const formattedDate = date.toISOString();
                            setSearchCriteria({ ...searchCriteria, startDate: formattedDate });
                          } else {
                            setSearchCriteria({ ...searchCriteria, startDate: null });
                          }
                        }}
                        dateFormat="dd/MM/yyyy" // Specify the combined format
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: '100%' }} />}

                      />
                    </div>
                  </FormGroup>
                </Col>


                <Col md={4}>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Date To</Label>
                    <div> {/* Wrap in an input group */}
                      <DatePicker
                        selected={searchCriteria.endDate ? new Date(searchCriteria.endDate) : null} // Use endDate from searchCriteria if it's defined
                        wrapperClassName="custom-react-datepicker-wrapper"
                        onChange={(date) => {
                          if (date) {
                            // Set the time to 12:00 PM (noon)
                            date.setHours(12, 0, 0, 0);
                            const formattedDate = date.toISOString(); // Convert to ISO format
                            setSearchCriteria({ ...searchCriteria, endDate: formattedDate });
                          } else {
                            setSearchCriteria({ ...searchCriteria, endDate: null });
                          }
                        }}
                        dateFormat="dd/MM/yyyy"
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: '100%' }} />}
                      />
                    </div>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col md={4}>

                  <FormGroup>
                    <Label className="forlabel" for="branchId">Hold</Label>

                    <select
                      className="form-select"
                      aria-label="SC Status"
                      value={searchCriteria.holdStatus}
                      onChange={handleholdStatusChange}
                    >
                      <option value="">Select Hold Status</option>
                      <option value="Y">Yes</option>
                      <option value="N">No</option>
                    </select>


                  </FormGroup>


                </Col>



              </Row>


              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Forwarded</Label>

                    <select
                      className="form-select"
                      aria-label="forwardedStatus Status"
                      value={searchCriteria.forwardedStatus}
                      onChange={handleForwarded} >
                      <option value="">Select Forwarded Status</option>
                      <option value="FWD_OUT">Yes</option>
                      <option value="FWD_IN">No</option>
                    </select>
                  </FormGroup></Col>





                <Col md={4}>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">DGDC Status</Label>

                    <Select
                      options={DgdcStatusArray}
                      value={DGDC_Status}
                      onChange={handleStatusChange}
                      isClearable
                      placeholder="Select a DGDC status"
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                          // borderColor: errors.consoleName ? '#f52b2b' : '',
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


                  </FormGroup></Col>


              </Row>

              <div className="text-center mt-1 mb-1">
                <button
                  type="button"
                  className="btn me-md-2   btn-outline-primary"
                  onClick={(e) => handleSearch3(searchCriteria)}
                  style={{ marginRight: '10px' }}
                ><FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                  Search
                </button>

                <button
                  type="button"
                  className="btn gap-2  btn-outline-danger"
                  onClick={resetSearchCriteria}
                > <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                  Clear
                </button>
              </div>


              {filterdata3.length > 0 && (
                <div className="table-responsive">
                  <Table className="table table-bordered custom-table mt-3">
                    <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                      <tr className="text-center">
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Sr</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">SIR Date</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">SIR No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Flight No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Importer</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">PCKGS</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">MAWB No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">HAWB No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">BE No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Parcel Status</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">DGDC Status</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center">
                        <td style={{ backgroundColor: '#BADDDA' }}><b>Total</b> </td>
                        <td style={{ backgroundColor: '#BADDDA' }}></td>
                        <td style={{ backgroundColor: '#BADDDA' }}> <b>{filterdata3.length}</b></td>
                        <td style={{ backgroundColor: '#BADDDA' }}></td>
                        <td style={{ backgroundColor: '#BADDDA' }}></td>
                        <td style={{ backgroundColor: '#BADDDA' }}> <b> {totalNop3}</b> </td>
                        <td style={{ backgroundColor: '#BADDDA' }}><b> {uniqueMasterNumberCount3} </b></td>
                        <td style={{ backgroundColor: '#BADDDA' }}></td>
                        <td style={{ backgroundColor: '#BADDDA' }}></td>
                        <td style={{ backgroundColor: '#BADDDA' }}></td>
                        <td style={{ backgroundColor: '#BADDDA' }}></td>
                        <td style={{ backgroundColor: '#BADDDA' }}></td>

                      </tr>

                      {currentItems3.map((import2, index) =>

                        <tr className={"text-center"}
                          key={index}
                          onClick={() => handleRowClick(index)}>
                          <td className="table-column">{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                          <td className="table-column">{formatDate2(import2.sirDate)}</td>
                          <td className="table-column">{import2.sirNo}</td>
                          <td className="table-column">{import2.flightNo}</td>
                          <td className="table-column"> {import2.importernameOnParcel}</td>
                          <td className="table-column">{import2.nop}</td>
                          <td className="table-column">{import2.mawb}</td>
                          <td className="table-column">{import2.hawb.startsWith('000') ? '' : import2.hawb}</td>
                          <td className="table-column">{import2.beNo}</td>
                          <td className="table-column">{import2.nsdlStatus}</td>



                          <td className="table-column" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span>{import2.dgdcStatus}</span>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>



                              {import2.closeStatus !== "Y" ? (
                                <p className="redText" title="Master Not Closed">Master Not Closed</p>
                              ) : null}

                              {import2.holdStatus === "Y" ? (
                                <FaHandPaper size={22} color="orange" style={{ marginRight: '10px' }} title="On Hold" />
                              ) : null}


                              {import2.cancelStatus === "Y" ? (
                                <FaClosedCaptioning size={22} fill="orange" style={{ marginRight: '10px' }} title="Cancelled" />
                              ) : null}

                              {import2.forwardedStatus === "FWD_OUT" ? (
                                <FaArrowAltCircleRight size={22} fill="orange" style={{ marginRight: '10px' }} title="Forwarded Out" />
                              ) : null}

                              {import2.snzStatus === "Y" ? (

                                <img src={snzLoge} className="img-fluid" alt="SNZ" width={25} height={25} title="SNZ Parcel" />

                              ) : null

                              }

                            </div>
                          </td>
                          <td className="table-column">

                            <Button
                              type="button"
                              className="btn btn-primary dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            ><FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
                              Action
                            </Button>
                            <ul className="dropdown-menu">
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => handleViewClick(import2.impTransId, import2.mawb, import2.hawb, import2.sirNo)}
                                // to={`/parent/import/add-new/${import2.impTransId}/${import2.mawb}/${import2.hawb}/${import2.sirNo}/view`}
                                ><FontAwesomeIcon icon={faUsersViewfinder} style={{ marginRight: '5px' }} />
                                  View All Details
                                </button>
                              </li>



                              <li className="mt-1">
                                <button
                                  onClick={(e) => handleShow(companyid, branchId, import2.mawb, import2.hawb, import2.sirNo)}
                                  className="dropdown-item link"

                                ><FontAwesomeIcon icon={faHistory} style={{ marginRight: '5px' }} />
                                  View transaction History
                                </button >
                              </li>



                            </ul>





                          </td>
                        </tr>
                      )
                      }
                    </tbody>
                  </Table>
                  <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
                    <Pagination.First onClick={() => handlePageChange3(1)} />
                    <Pagination.Prev
                      onClick={() => handlePageChange3(currentPage3 - 1)}
                      disabled={currentPage3 === 1}
                    />
                    <Pagination.Ellipsis />

                    {displayPages3().map((pageNumber) => (
                      <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPage3}
                        onClick={() => handlePageChange3(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    ))}

                    <Pagination.Ellipsis />
                    <Pagination.Next
                      onClick={() => handlePageChange3(currentPage3 + 1)}
                      disabled={currentPage3 === totalPages3}
                    />
                    <Pagination.Last onClick={() => handlePageChange3(totalPages3)} />
                  </Pagination>
                </div>)}
            </CardBody>
          </Card>
        </div>
      )
        :
        (
          <div className="Container" >

            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
              icon={faPlaneArrival}
              style={{
                marginRight: '8px',
                color: 'black',
              }}
            />Import</h5>
            <Card>

              <CardBody className="text-end">
                <div >

                  <Button
                    type="button"

                    className="allbutton dropdown-toggle"
                    variant="outline-success"

                    data-bs-toggle="dropdown"
                    aria-expanded="false"

                  >  <FontAwesomeIcon icon={faAtom} style={{ marginRight: "5px" }} />
                    Action
                  </Button>

                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item link"
                        onClick={() => handleOptionButtonClick("view-all")}
                        to={`/parent/import/add-new/`}
                      > <FontAwesomeIcon icon={faPlus} style={{ marginRight: "5px" }} />
                        Add New Import
                      </Link>
                    </li>

                    <li>
                      <button
                        className="dropdown-item link"
                        onClick={opernPrintTagModel}

                      > <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                        Print SIR Tags
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={openCustomTPModel}
                      ><FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: "5px" }} />
                        Update Custom TP Number
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={openCustomPCTMNumbermodel}
                      ><FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: "5px" }} />
                        Update Custom PCTM Number
                      </button>
                    </li>


                    <li>
                      <button
                        className="dropdown-item"
                        onClick={(e) => handleShowCatingAgent()}
                      ><FontAwesomeIcon icon={faArrowTurnRight} style={{ marginRight: "5px" }} />
                        Handover to Console
                      </button>
                    </li>



                    <li>
                      <button
                        className="dropdown-item"
                        onClick={(e) => openreceivedCartingmodel()}
                      ><FontAwesomeIcon icon={faAngleDoubleLeft} style={{ marginRight: "5px" }} />
                        Received from Console
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={(e) => handleShowPartyOrCHA()}
                      ><FontAwesomeIcon icon={faArrowTurnRight} style={{ marginRight: "5px" }} />
                        Handover to CHA
                      </button>
                    </li>

                  </ul>
                </div>

              </CardBody>

              <hr style={{ margin: '0' }} />
              <CardBody>

                <Row>

                  <Col md={4}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Search By</Label>
                      <Input
                        type="text" name="SearchBy"
                        className="form-control inputField"
                        value={searchCriteria.searchValue}
                        onChange={handleSearchChange}
                      />
                    </FormGroup>

                  </Col>

                  <Col md={2}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Date From</Label>
                      <div> {/* Wrap in an input group */}

                        <DatePicker
                          selected={searchCriteria.startDate ? new Date(searchCriteria.startDate) : null}
                          wrapperClassName="custom-react-datepicker-wrapper"
                          onChange={(date) => {
                            if (date) {
                              // Set the time to 12:00 AM in UTC time
                              date.setHours(12, 0, 0, 0);
                              // Convert the selected date and time to ISO format
                              const formattedDate = date.toISOString();
                              setSearchCriteria({ ...searchCriteria, startDate: formattedDate });
                            } else {
                              setSearchCriteria({ ...searchCriteria, startDate: null });
                            }
                          }}
                          dateFormat="dd/MM/yyyy" // Specify the combined format
                          className="form-control border-right-0 inputField"
                          customInput={<input style={{ width: '100%' }} />}

                        />
                      </div>
                    </FormGroup>
                  </Col>


                  <Col md={2}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Date To</Label>
                      <div> {/* Wrap in an input group */}
                        <DatePicker
                          selected={searchCriteria.endDate ? new Date(searchCriteria.endDate) : null} // Use endDate from searchCriteria if it's defined
                          wrapperClassName="custom-react-datepicker-wrapper"
                          onChange={(date) => {
                            if (date) {
                              // Set the time to 12:00 PM (noon)
                              date.setHours(12, 0, 0, 0);
                              const formattedDate = date.toISOString(); // Convert to ISO format
                              setSearchCriteria({ ...searchCriteria, endDate: formattedDate });
                            } else {
                              setSearchCriteria({ ...searchCriteria, endDate: null });
                            }
                          }}
                          dateFormat="dd/MM/yyyy"
                          className="form-control border-right-0 inputField"
                          customInput={<input style={{ width: '100%' }} />}
                        />
                      </div>
                    </FormGroup>
                  </Col>


                  <Col md={4}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">SNZ Parcel</Label>

                      <select
                        className="form-select"
                        aria-label="SC Status"
                        value={searchCriteria.niptStatus}
                        onChange={handleNIPTStatusChange}
                      >
                        <option selected value="">Select SNZ Parcel</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                      </select>


                    </FormGroup></Col>


                </Row>

                <Row>
                  <Col md={4}>

                    <FormGroup>
                      <Label className="forlabel" for="branchId">Hold</Label>

                      <select
                        className="form-select"
                        aria-label="SC Status"
                        value={searchCriteria.holdStatus}
                        onChange={handleholdStatusChange}
                      >
                        <option value="">Select Hold Status</option>
                        <option value="Y">Yes</option>
                        <option value="N">No</option>
                      </select>


                    </FormGroup>
                  </Col>


                  <Col md={4}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Forwarded</Label>

                      <select
                        className="form-select"
                        aria-label="forwardedStatus Status"
                        value={searchCriteria.forwardedStatus}
                        onChange={handleForwarded} >
                        <option value="">Select Forwarded Status</option>
                        <option value="FWD_OUT">Yes</option>
                        <option value="FWD_IN">No</option>
                      </select>
                    </FormGroup></Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">DGDC Status</Label>

                      <Select
                        options={DgdcStatusArray}
                        value={DGDC_Status}
                        onChange={handleStatusChange}
                        isClearable
                        placeholder="Select a DGDC status"
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                            // borderColor: errors.consoleName ? '#f52b2b' : '',
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


                    </FormGroup></Col>


                </Row>

                <div className="text-center mt-1 mb-1">
                  <button
                    type="button"
                    className="btn me-md-2   btn-outline-primary"
                    onClick={(e) => { handleSearch(searchCriteria); setCurrentPageFun(); }}
                    style={{ marginRight: '10px' }}
                  ><FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                    Search
                  </button>

                  <button
                    type="button"
                    className="btn gap-2  btn-outline-danger"
                    onClick={resetSearchCriteria}
                  > <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                    Clear
                  </button>
                </div>


                {filteredImports.length > 0 && (
                  <div className="table-responsive">
                    <Table className="table table-bordered custom-table mt-3">
                      <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                        <tr className="text-center">
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Sr</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">SIR Date</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">SIR No</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Flight No</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Importer</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">PCKGS</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">MAWB No</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">HAWB No</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">BE No</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Parcel Status</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">DGDC Status</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-center">
                          <td style={{ backgroundColor: '#BADDDA' }}><b>Total</b> </td>
                          <td style={{ backgroundColor: '#BADDDA' }}></td>
                          <td style={{ backgroundColor: '#BADDDA' }}> <b>{filteredImports.length}</b></td>
                          <td style={{ backgroundColor: '#BADDDA' }}></td>
                          <td style={{ backgroundColor: '#BADDDA' }}></td>
                          <td style={{ backgroundColor: '#BADDDA' }}> <b> {totalNop}</b> </td>
                          <td style={{ backgroundColor: '#BADDDA' }}><b> {uniqueMasterNumberCount} </b></td>
                          <td style={{ backgroundColor: '#BADDDA' }}></td>
                          <td style={{ backgroundColor: '#BADDDA' }}></td>
                          <td style={{ backgroundColor: '#BADDDA' }}></td>
                          <td style={{ backgroundColor: '#BADDDA' }}></td>
                          <td style={{ backgroundColor: '#BADDDA' }}></td>

                        </tr>

                        {currentfilteredImports.map((import2, index) =>

                          <tr className={"text-center"}
                            key={index}
                            onClick={() => handleRowClick(index)}>
                            <td className="table-column">{((currentPage - 1) * itemsPerPage) + index + 1}</td>
                            <td className="table-column">{formatDate2(import2.sirDate)}</td>
                            <td className="table-column">{import2.sirNo}</td>
                            <td className="table-column">{import2.flightNo}</td>
                            <td className="table-column">{import2.importernameOnParcel}</td>
                            <td className="table-column">{import2.nop}</td>
                            <td className="table-column">{import2.mawb}</td>
                            <td className="table-column">{import2.hawb.startsWith('000') ? '' : import2.hawb}</td>
                            <td className="table-column">{import2.beNo}</td>
                            <td className="table-column">{import2.nsdlStatus}</td>



                            <td className="table-column" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <span>{import2.dgdcStatus}</span>
                              <div style={{ display: 'flex', flexDirection: 'row' }}>

                                {import2.closeStatus !== "Y" ? (
                                  <p className="redText" title="Master Not Closed">Master Not Closed</p>
                                ) : null}

                                {import2.holdStatus === "Y" ? (
                                  <FaHandPaper size={22} color="orange" style={{ marginRight: '10px' }} title="On Hold" />
                                ) : null}

                                {import2.cancelStatus === "Y" ? (
                                  <FaClosedCaptioning size={22} fill="orange" style={{ marginRight: '10px' }} title="Cancelled" />
                                ) : null}


                                {import2.snzStatus === "Y" ? (
                                  <img src={snzLoge} className="img-fluid" alt="SNZ" width={30} height={30} title="SNZ Parcel" />
                                ) : null
                                }



                              </div>
                            </td>
                            <td className="table-column">

                              <Button
                                type="button"
                                className="btn btn-primary dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              ><FontAwesomeIcon icon={faAtom} style={{ marginRight: '5px' }} />
                                Action
                              </Button>
                              <ul className="dropdown-menu">
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleViewClick(import2.impTransId, import2.mawb, import2.hawb, import2.sirNo)}
                                  // to={`/parent/import/add-new/${import2.impTransId}/${import2.mawb}/${import2.hawb}/${import2.sirNo}/view`}
                                  ><FontAwesomeIcon icon={faUsersViewfinder} style={{ marginRight: '5px' }} />
                                    View All Details
                                  </button>
                                </li>
                                <li className="mt-1">
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleModifyClick(import2.impTransId, import2.mawb, import2.hawb, import2.sirNo)}
                                  // to={`/parent/import/add-new/${import2.impTransId}/${import2.mawb}/${import2.hawb}/${import2.sirNo}/modify`}
                                  ><FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                                    Modify Import Details
                                  </button>
                                </li>

                                {/* && import2.holdStatus === "H" */}
                                {import2.dgdcStatus === "Handed over to DGDC SHB" && import2.beNo && import2.nsdlStatusDocs && import2.forwardedStatus !== "FWD_OUT" && (import2.nsdlStatus === 'Out Of Charge' || import2.nsdlStatus === 'Approved' || import2.nsdlStatus === 'Approve And Out Of Charge Without Duty') ? (
                                  <li className="mt-1">
                                    <button
                                      onClick={() => { handleButtonClick(companyid, branchId, import2.impTransId, import2.mawb, import2.hawb, import2.sirNo, "party/cha", import2.nop); getconsoleName(import2.chaName); }}
                                      className="dropdown-item link"
                                    ><FontAwesomeIcon icon={faPerson} style={{ marginRight: '5px' }} />
                                      Handover to CHA
                                    </button >
                                  </li>
                                ) : null}


                                {import2.holdStatus === "N" || import2.holdStatus === "R" ? (
                                  <li className="mt-1">
                                    <button
                                      className="dropdown-item"
                                      onClick={() => handleButtonClick(companyid, branchId, import2.impTransId, import2.mawb, import2.hawb, import2.sirNo, "hold", import2.nop)}
                                    >   <FontAwesomeIcon icon={faHand} style={{ marginRight: '5px' }} />
                                      Hold Parcel
                                    </button>
                                  </li>

                                ) : null}

                                {import2.holdStatus === "Y" ? (
                                  <li className="mt-1">
                                    <button
                                      onClick={() => handleButtonClick(companyid, branchId, import2.impTransId, import2.mawb, import2.hawb, import2.sirNo, "unhold", import2.nop)}
                                      className="dropdown-item link"

                                    ><FontAwesomeIcon icon={faHandFist} style={{ marginRight: '5px' }} />
                                      Unhold Parcel
                                    </button >
                                  </li>
                                ) : null}


                                <li className="mt-1">
                                  <button
                                    onClick={() => handleButtonClick(companyid, branchId, import2.impTransId, import2.mawb, import2.hawb, import2.sirNo, "override")}
                                    className="dropdown-item link"

                                  ><FontAwesomeIcon icon={faUndoAlt} style={{ marginRight: '5px' }} />
                                    Update Delivery Status
                                  </button >
                                </li>


                                {/* && import2.holdStatus === "H" */}
                                {import2.dgdcStatus === "Handed over to DGDC Cargo" && import2.closeStatus === "Y" ? (
                                  <li className="mt-1">
                                    <button
                                      onClick={() => { handleButtonClick(companyid, branchId, import2.impTransId, import2.mawb, import2.hawb, import2.sirNo, "carting", import2.nop); getconsoleName(import2.consoleName); }}
                                      className="dropdown-item link"
                                    ><FontAwesomeIcon icon={faPerson} style={{ marginRight: '5px' }} />
                                      Handover to Console
                                    </button >
                                  </li>
                                ) : null}



                                <li className="mt-1">
                                  <Link
                                    onClick={(e) => { printBarcode(import2.mawb, import2.sirNo, import2.nop, import2.sirDate, import2.beDate, import2.niptStatus, import2.beNo, import2.hawb, import2.igmNo) }}
                                    className="dropdown-item link"

                                  >
                                    <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                                    Print SIR
                                  </Link>
                                </li  >

                                <li className="mt-1">
                                  <button
                                    onClick={(e) => handleShow(companyid, branchId, import2.mawb, import2.hawb, import2.sirNo)}
                                    className="dropdown-item link"

                                  ><FontAwesomeIcon icon={faHistory} style={{ marginRight: '5px' }} />
                                    View transaction History
                                  </button >
                                </li>


                                <li className="mt-1">
                                  <button
                                    className="dropdown-item link"
                                    onClick={() => handleButtonClick(companyid, branchId, import2.impTransId, import2.mawb, import2.hawb, import2.sirNo, "cancel", import2.nop)}
                                  ><FontAwesomeIcon icon={faTimes} style={{ marginRight: '5px' }} />
                                    Cancel Parcel
                                  </button>
                                </li>
                                <li className="mt-1">
                                  <button
                                    className="dropdown-item link"
                                    onClick={() => handleButtonClick(companyid, branchId, import2.impTransId, import2.mawb, import2.hawb, import2.sirNo, "wrong", import2.nop)}
                                  ><FontAwesomeIcon icon={faBox} style={{ marginRight: '5px', color: 'red' }} />
                                    Wrong Deposit
                                  </button>
                                </li>

                              </ul>

                            </td>
                          </tr>
                        )
                        }
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
                  </div>)}
              </CardBody>
            </Card>

          </div>
        )

      }



      <Modal show={showModal} onHide={handleClose} size="lg">

        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
              icon={faHistory}
              style={{
                marginRight: '8px',
                color: 'black', // Set the color to golden
              }}
            />Import History</h5>
            <button
              className="close-button"
              onClick={handleClose}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
            <hr />
            <div className="table-responsive">
              <Table className="table table-striped table-hover">
                <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                  <tr className="text-center">
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">Sr No.</th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">Transaction Date</th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">DGDC Old Status</th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">DGDC New Status</th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">Updated By</th>
                    <th style={{ backgroundColor: '#BADDDA' }} scope="col">Remarks</th>

                  </tr>
                </thead>
                <tbody>

                  {ImportsHistory.map((history, index) =>

                    <tr className="text-center" key={history.sirNo}>
                      <td className="table-column">{index + 1}</td>
                      <td className="table-column">{formatDateTime(history.transport_Date)}</td>
                      <td className="table-column">{history.oldStatus}</td>
                      <td className="table-column">{history.newStatus}</td>
                      <td className="table-column">{history.updatedBy}</td>
                      <td className="table-column">{history.remark}</td>
                    </tr>
                  )
                  }
                </tbody>
              </Table>
            </div>
            <hr />
            <div className="text-center">
              <button
                type="button"
                className="btn me-md-2  btn-outline-primary"
                onClick={handleClose}
              >
                <FontAwesomeIcon icon={faArrowTurnRight} style={{ marginRight: '5px' }} />
                Back
              </button>
            </div>
          </CardBody>
        </Card>
      </Modal>













      {/* Heavy Model */}

      <Modal show={heavyModel} onHide={closeHeavyModel} size="lg">

        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
              icon={faWeightHanging}
              style={{
                marginRight: '8px',
                color: 'black', // Set the color to golden
              }}
            /> Tag a Heavy Label</h5>
            <button
              className="close-button"
              onClick={closeHeavyModel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
            {/* <h4 className="text-center mb-1">Tag a Heavy Label</h4> */}

            <hr />
            <Row className="mt-1">
              <Col md={6} >
                <FormGroup>
                  <Label className="forlabel" for="branchId">
                    Package No.
                  </Label>
                  <Input
                    type="select"
                    name="hppackageno"
                    value={hppackageno} // Set the value to the state variable
                    onChange={(e) => sethppackageno(e.target.value)}
                  >
                    {options}
                  </Input>
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Enter Weight (Min: 34 KG)</Label>
                  <Input
                    type="text" name="hpweight"
                    className="form-control "
                    style={{ borderColor: parseFloat(hpWeight) < 34 ? '#f52b2b' : '' }}
                    value={hpWeight}
                    onChange={(e) => setHpWeight(e.target.value)}
                  />
                </FormGroup>
              </Col>


            </Row>
            <div className="text-center">

              <button
                type="button"
                className="btn me-md-2  btn-outline-success"
                // onClick={closeHeavyModel}
                style={{ marginTop: '2.0vw' }}
                onClick={() => handleAddClick(modalData.companyid, modalData.branchId, modalData.transId, modalData.mawb, modalData.hawb, modalData.sir, modalData.buttonType, 'submit')}
                disabled={!hpWeight > 34}
              >
                <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                Save
              </button>
            </div>

            {HeavyParcelArray.length > 0 ? (
              <div className="table-responsive">
                <Table className="table table-bordered custom-table mt-2">
                  <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                    <tr className="text-center">
                      <th style={{ backgroundColor: '#BADDDA' }} scope="col">Package No</th>
                      <th style={{ backgroundColor: '#BADDDA' }} scope="col">Weight</th>
                      <th style={{ backgroundColor: '#BADDDA' }} scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {HeavyParcelArray.map((heavy, index) =>

                      <tr className="text-center" key={index}>
                        <td className="table-column">{heavy.hppackageno}</td>
                        <td className="table-column">{heavy.hpWeight}</td>
                        <td className="table-column">

                          <FontAwesomeIcon onClick={() => deleteImportHeavy(heavy.mawb, heavy.hawb, heavy.impTransId, heavy.sirNo, heavy.hppackageno)}
                            icon={faTrash} style={{ marginRight: '5px', color: 'red' }} />


                        </td>

                      </tr>
                    )
                    }
                  </tbody>
                </Table>
              </div>
            ) : null}


          </CardBody>
        </Card>
      </Modal>


      {/* Cancel Model */}
      <Modal show={CancelModel} onHide={closeCancelModel} size="lg">

        <Card>
          <CardBody>
            <h4 className="text-center mb-1">Cancel Parcel</h4>
            <button
              className="close-button"
              onClick={closeCancelModel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
            <hr />
            <Row>
              <Col md={12}>
                <div class="form-group">
                  <label for="cancel" style={{ fontSize: "1vw" }}>Reason For Cancel</label>
                  <textarea class="form-control" rows="5" id="comment"
                    name="cancelRemarks"
                    value={cancelRemarks}
                    onChange={(e) => setCancelRemarks(e.target.value)}


                  />
                </div>
              </Col>
            </Row>

            <div className="text-center mt-2">

              {cancelStatus === "N" ? (
                <Button variant="danger"
                  onClick={() => SubmitCancelModel(modalData.companyid, modalData.branchId, modalData.transId, modalData.mawb, modalData.hawb, modalData.sir, modalData.buttonType, 'submit')}
                  disabled={!cancelRemarks}
                >
                  Submit
                </Button>

              ) : null}
              {cancelStatus === "Y" ? (

                <Button variant="danger"
                  onClick={() => SubmitCancelModel(modalData.companyid, modalData.branchId, modalData.transId, modalData.mawb, modalData.hawb, modalData.sir, modalData.buttonType, 'remove')}
                  disabled={!cancelRemarks}
                >
                  Remove
                </Button>

              ) : null}


              {cancelStatus === "Y" ? (
                <Button variant="danger"
                  style={{ marginLeft: '10px' }}
                  onClick={() => SubmitCancelModel(modalData.companyid, modalData.branchId, modalData.transId, modalData.mawb, modalData.hawb, modalData.sir, modalData.buttonType, 'update')}
                  disabled={!cancelRemarks}
                >
                  Update
                </Button>


              ) : null}
            </div>

          </CardBody>
        </Card>
      </Modal >


      {/* Cancel Model */}
      <Modal show={CancelModel} onHide={closeCancelModel} size="lg">

        <Card>
          <CardBody>
            <h4 className="text-center mb-1">Cancel Parcel</h4>
            <button
              className="close-button"
              onClick={closeCancelModel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
            <hr />
            <Row>
              <Col md={12}>
                <div class="form-group">
                  <label for="cancel" style={{ fontSize: "1vw" }}>Reason For Cancel</label>
                  <textarea class="form-control" rows="5" id="comment"
                    name="cancelRemarks"
                    value={cancelRemarks}
                    onChange={(e) => setCancelRemarks(e.target.value)}


                  />
                </div>
              </Col>
            </Row>

            <div className="text-center mt-2">

              {cancelStatus === "N" ? (
                <Button variant="danger"
                  onClick={() => SubmitCancelModel(modalData.companyid, modalData.branchId, modalData.transId, modalData.mawb, modalData.hawb, modalData.sir, modalData.buttonType, 'submit')}
                  disabled={!cancelRemarks}
                >
                  Submit
                </Button>

              ) : null}
              {cancelStatus === "Y" ? (

                <Button variant="danger"
                  onClick={() => SubmitCancelModel(modalData.companyid, modalData.branchId, modalData.transId, modalData.mawb, modalData.hawb, modalData.sir, modalData.buttonType, 'remove')}
                  disabled={!cancelRemarks}
                >
                  Remove
                </Button>

              ) : null}


              {cancelStatus === "Y" ? (
                <Button variant="danger"
                  style={{ marginLeft: '10px' }}
                  onClick={() => SubmitCancelModel(modalData.companyid, modalData.branchId, modalData.transId, modalData.mawb, modalData.hawb, modalData.sir, modalData.buttonType, 'update')}
                  disabled={!cancelRemarks}
                >
                  Update
                </Button>


              ) : null}
            </div>
            {/* <div>
              {modalData.companyid},{modalData.branchId},{modalData.transId},{modalData.mawb},{modalData.hawb},{modalData.sir},{modalData.buttonType}


            </div> */}
          </CardBody>
        </Card>
      </Modal >


      {/* Personal Model */}

      <Modal show={personalModel} onHide={closepersonalModel} size="xl">

        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
              icon={faCircleInfo}
              style={{
                marginRight: '8px',
                color: 'black', // Set the color to golden
              }}
            />Personal Details</h5>

            <button
              className="close-button"
              onClick={closepersonalModel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>



            <Row>

              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Passenger Name</Label>

                  <Input type="text" name="passengerName"
                    className="form-control"
                    value={passengerName}
                    style={{ borderColor: errors.passengerName ? '#f52b2b' : '', }}
                    maxLength={25}
                    onChange={(e) => setPassengerName(e.target.value)}

                  />
                  {errors.passengerName && (
                    <div className="error-message">
                      {errors.passengerName}
                    </div>
                  )}
                </FormGroup>
              </Col>


              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Address</Label>

                  <Input type="text" name="address"
                    className="form-control"
                    value={address}
                    maxLength={100}
                    onChange={(e) => setAddress(e.target.value)}

                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Passport No</Label>

                  <Input type="text" name="nop"
                    className="form-control"
                    value={passportNo}
                    style={{ borderColor: errors.passportNo ? '#f52b2b' : '', }}
                    maxLength={15}
                    onChange={(e) => setpassportNo(e.target.value)}
                  />
                  {errors.passportNo && (
                    <div className="error-message">
                      {errors.passportNo}
                    </div>
                  )}
                </FormGroup>
              </Col>

            </Row>


            {/* 2nd row  */}

            <Row>

              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Flight No</Label>

                  <Input type="text" name="passengerName"
                    className="form-control"
                    value={flightNo}
                    maxLength={10}
                    style={{ borderColor: errors.flightNo ? '#f52b2b' : '', }}
                    onChange={(e) => setFlightNo(e.target.value)}

                  />
                  {errors.flightNo && (
                    <div className="error-message">
                      {errors.flightNo}
                    </div>
                  )}
                </FormGroup>
              </Col>


              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Flight Date</Label>

                  <div> {/* Wrap in an input group */}
                    <DatePicker
                      selected={flightDate}
                      wrapperClassName="custom-react-datepicker-wrapper"
                      onChange={handleDateChangeFlight}
                      // minDate={today}
                      dateFormat="dd/MM/yyyy"
                      value={flightDate} // Set the value from the database
                      className="form-control"
                      customInput={<input style={{ width: '100%' }} />}

                    />

                  </div>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Nationality</Label>

                  <Input type="text" name="nop"
                    className="form-control"
                    value={nationality}
                    maxLength={10}
                    onChange={(e) => setNationality(e.target.value)}
                  />
                </FormGroup>
              </Col>

            </Row>



            {/* 3rd row  */}


            <Row>

              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Deputed Customs Officer Name</Label>

                  <Input type="text" name="deputedCoName"
                    className="form-control"
                    value={deputedCoName}
                    style={{ borderColor: errors.deputedCoName ? '#f52b2b' : '', }}
                    maxLength={25}
                    onChange={(e) => setDeputedCoName(e.target.value)}

                  />
                  {errors.deputedCoName && (
                    <div className="error-message">
                      {errors.deputedCoName}
                    </div>
                  )}
                </FormGroup>
              </Col>


              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Deputed Customs Officer Designation</Label>

                  <Input type="text" name="deputedCoDesignation"
                    className="form-control"
                    value={deputedCoDesignation}
                    maxLength={100}
                    onChange={(e) => setDeputedCoDesignation(e.target.value)}

                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Deputed From Destination</Label>

                  <Input type="text" name="deputedFromDestination"
                    className="form-control"
                    value={deputedFromDestination}
                    maxLength={15}
                    onChange={(e) => setDeputedFromDestination(e.target.value)}
                  />
                </FormGroup>
              </Col>

            </Row>


            {/* 4th row */}

            <Row>

              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Deputed To Destination</Label>

                  <Input type="text" name="deputedCoName"
                    className="form-control"
                    value={deputedToDestination}
                    maxLength={25}
                    onChange={(e) => setDeputedToDestination(e.target.value)}

                  />
                </FormGroup>
              </Col>


              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Date Of Escort</Label>

                  <div> {/* Wrap in an input group */}
                    <DatePicker
                      selected={escortDate}
                      wrapperClassName="custom-react-datepicker-wrapper"
                      onChange={handleDateChangeEscort}
                      // minDate={today}
                      dateFormat="dd/MM/yyyy"
                      value={escortDate} // Set the value from the database
                      className="form-control"
                      customInput={<input style={{ width: '100%' }} />}

                    />

                  </div>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Approver Name</Label>

                  <Input type="text" name="approverName"
                    className="form-control"
                    value={approverName}
                    maxLength={15}
                    onChange={(e) => setApproverName(e.target.value)}
                  />
                </FormGroup>
              </Col>

            </Row>



            {/* 5th row  */}


            <Row>

              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Approver Designation</Label>

                  <Input type="text" name="approverDesignation"
                    className="form-control"
                    value={approverDesignation}
                    maxLength={25}
                    onChange={(e) => setApproverDesignation(e.target.value)}

                  />
                </FormGroup>
              </Col>


              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Approver Date</Label>

                  <div> {/* Wrap in an input group */}
                    <DatePicker
                      selected={approverDate}
                      wrapperClassName="custom-react-datepicker-wrapper"
                      onChange={handleDateChangeApprover}
                      // minDate={today}
                      dateFormat="dd/MM/yyyy"
                      value={approverDate} // Set the value from the database
                      className="form-control"
                      customInput={<input style={{ width: '100%' }} />}

                    />

                  </div>
                </FormGroup>
              </Col>
              <Col md={4}>

                <div className="text-center" style={{ marginTop: "30px" }}>
                  <input className="form-check-input mt-2" type="checkbox"
                    value={confirmation}
                    checked={confirmation === 'Y'}
                    onChange={(e) => setConfirmation(e.target.checked ? 'Y' : 'N')}
                    id="flexCheckDefault"
                    style={{ marginRight: '10px', width: '20px', height: '20px' }} />
                  <label className="form-check-label forlabel" htmlFor="flexCheckDefault">
                    Confirmation
                  </label>
                  <Button
                    variant="outline-success"

                    style={{ marginLeft: '10px' }}
                    onClick={() => SubmitPersonalModel(modalData.companyid, modalData.branchId, modalData.transId, modalData.mawb, modalData.hawb, modalData.sir, modalData.buttonType)}
                  ><FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                    Submit
                  </Button>
                  <Button
                    variant="outline-danger"
                    style={{ marginLeft: '10px' }}
                  // onClick={() => SubmitCancelModel(modalData.companyid, modalData.branchId, modalData.transId, modalData.mawb, modalData.hawb, modalData.sir, modalData.buttonType, 'print')}

                  >  <FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                    Print
                  </Button>
                </div>


              </Col>

            </Row>
          </CardBody>
        </Card>

      </Modal >



      {/* Penalty Model */}


      <Modal show={penaltyModel} onHide={closepenaltyModel} size="lg">

        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
              icon={faGavel}
              style={{
                marginRight: '8px',
                color: 'black', // Set the color to golden
              }}
            /> Impose Penalty</h5>

            <button
              className="close-button"
              onClick={closepenaltyModel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>

            <hr />
            <Row>


              <Col md={6}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Penalty Amount</Label>

                  <Input type="number" name="imposePenaltyAmount"
                    className="form-control"
                    value={imposePenaltyAmount}
                    maxLength={20}
                    onChange={(e) => setImposePenaltyAmount(e.target.value)}

                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <div class="form-group">
                  <label className="forlabel">Reason</label>
                  <textarea class="form-control" rows="2" id="comment"
                    name="imposePenaltyRemarks"
                    value={imposePenaltyRemarks}
                    onChange={(e) => setImposePenaltyRemarks(e.target.value)}


                  />
                </div>
              </Col>
            </Row>

            <div className="text-center mt-2">
              <Button
                type="button"
                className="allbutton"
                variant="outline-success"
                onClick={() => SubmitopenPenaltyModal(modalData.companyid, modalData.branchId, modalData.transId, modalData.mawb, modalData.hawb, modalData.sir, modalData.buttonType, 'submit')}
              ><FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                Submit
              </Button>



              {/* <Button variant="success"
                onClick={() => SubmitopenPenaltyModal(modalData.companyid, modalData.branchId, modalData.transId, modalData.mawb, modalData.hawb, modalData.sir, modalData.buttonType, 'submit')}
              ><FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                Submit
              </Button> */}



            </div>
            {/* <div>
              {modalData.companyid},{modalData.branchId},{modalData.transId},{modalData.mawb},{modalData.hawb},{modalData.sir},{modalData.buttonType}


            </div> */}
          </CardBody>
        </Card>
      </Modal >



      {/* Override Model */}

      <Modal show={overrideModel} onHide={closeoverrideModel} size="lg">

        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h5 className="pageHead text-center " style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
              icon={faUserCircle}
              style={{
                marginRight: '8px',
                color: 'black', // Set the color to golden
              }}
            />Override NSDL Status</h5>


            <button
              className="close-button"
              onClick={closeoverrideModel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
            <hr />
            <Row>


              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">SIR No</Label>

                  <Input type="text" name="sirNo"
                    className="form-control"
                    value={sirNo}
                    readOnly
                    id="service"
                  // onChange={(e) => setSirNo(e.target.value)}

                  />
                </FormGroup>
              </Col>

              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel">Reason</Label>
                  <Input type="text" name="reasonforOverride"
                    className="form-control"
                    value={reasonforOverride}
                    onChange={(e) => setReasonforOverride(e.target.value)}
                  />
                </FormGroup>
              </Col>


              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">Current NSDL Status</Label>
                  <Input type="text" name="OldnsdlStatus"
                    className="form-control"
                    value={OldnsdlStatus}
                    readOnly
                    id="service"
                  // onChange={(e) => setOldnsdlStatus(e.target.value)}

                  />
                </FormGroup>
              </Col>
            </Row>
            {/* 2nd */}
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label className="forlabel" for="branchId">New NSDL Status</Label>
                  <Select
                    options={nsdlStatusArray}
                    value={{ value: newnsdlStatus, label: newnsdlStatus }}
                    onChange={handleNSDLStatusChange}
                    className={errors.nsdlStatus ? 'error-border' : ''}
                    isClearable
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        borderColor: errors.representative ? '#f52b2b' : '',
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

              <Col md={8}>
                <FormGroup>
                  <Label className="forlabel">Select File</Label>

                  <Input type="file" name="filepath"
                    className="form-control"
                    onChange={handleFileChange}
                    accept=".jpg, .jpeg, .png, .pdf"
                  />
                </FormGroup>
              </Col>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {file && (
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
            {nsdlStatusDocs ? (
              <div>
                <Row>

                  <Col >
                    <div
                      style={{
                        marginTop: 5,
                        marginBottom: 5,
                        display: "flex",
                        justifyContent: "center", // Center buttons horizontally
                      }}
                    >

                      <Button
                        type="button"
                        className="allbutton"
                        variant="outline-primary"
                        onClick={showDocumentModel}

                      >

                        Show Doc
                      </Button>

                    </div>
                  </Col>

                </Row>

              </div>
            ) : null}
            <div className="text-center">
              <Button
                type="button"
                className="allbutton"
                variant="outline-success"
                onClick={(e) => handleSubmit(e)}

              ><FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />

                Submit
              </Button>
              {/* <Button variant="success"
                onClick={(e) => handleSubmit(e)}
              ><FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                Submit
              </Button> */}

            </div>
          </CardBody>
        </Card>
      </Modal >


      {/* Print Sir Tags Model */}
      <Modal show={printtagmodel} onHide={closeprinttagmodel} size="lg">

        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h4 className="text-center mb-1">Print Sir Tags By MAWB</h4>
            <button
              className="close-button"
              onClick={closeprinttagmodel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
            <hr />
            <Row>
              <Col md={9}>

                <FormGroup>
                  <label className="forlabel" htmlFor="search">
                    Enter Mawb Number
                  </label>
                  <input
                    placeholder="Enter Master Bill Number"
                    type="text"
                    id="search"
                    className="form-control"
                    value={printmawb}
                    onChange={(e) => setprintmawb(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <Button variant="primary"
                  onClick={() => submitSirTags(printmawb)}
                  disabled={!printmawb}
                  style={{ marginTop: '1.6vw' }}
                > <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                  Print SIR
                </Button>

              </Col>
            </Row>

          </CardBody>
        </Card>
      </Modal>




      {/* Print Sir Tags Model */}
      <Modal show={niptModel} onHide={closeniptModel} size="lg">

        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h4 className="text-center mb-1">Custom Officer Details</h4>
            <button
              className="close-button"
              onClick={closeniptModel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
            <hr />
            <Row>
              <Col md={6}>

                <FormGroup>
                  <Label className="forlabel" htmlFor="search">
                    Deputed Customs Officer Name:
                  </Label>
                  <Input
                    type="text"
                    id="search"
                    className="form-control"
                    value={niptCustomOfficerName}
                    onChange={(e) => setniptCustomOfficerName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>

                <FormGroup>
                  <Label className="forlabel" htmlFor="search">
                    Deputed Customs Officer Designation:
                  </Label>
                  <Input
                    type="text"
                    id="search"
                    className="form-control"
                    value={niptCustomsOfficerDesignation}
                    onChange={(e) => setniptCustomsOfficerDesignation(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>


            <Row>
              <Col md={6}>

                <FormGroup>
                  <Label className="forlabel" htmlFor="search">
                    Deputed From Destination:
                  </Label>
                  <Input
                    type="text"
                    id="search"
                    className="form-control"
                    value={niptDeputedFromDestination}
                    onChange={(e) => setniptDeputedFromDestination(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>

                <FormGroup>
                  <Label className="forlabel" htmlFor="search">
                    Deputed To Destination:
                  </Label>
                  <Input
                    type="text"
                    id="search"
                    className="form-control"
                    value={niptDeputedToDestination}
                    onChange={(e) => setniptDeputedToDestination(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>






            <Row>
              <Col md={6}>

                <FormGroup>
                  <Label className="forlabel" htmlFor="search">
                    Date Of Escort:
                  </Label>
                  <DatePicker
                    selected={niptDateOfEscort}
                    onChange={(date) => setniptDateOfEscort(date)}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    // minDate={today}
                    dateFormat="dd/MM/yyyy"
                    value={niptDateOfEscort} // Set the value from the database
                    className="form-control"
                    customInput={<input style={{ width: '100%' }} />}
                  />
                  {errors.niptDateOfEscort && (
                    <div className="error-message">
                      Date of Escort is Required
                    </div>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>

                <FormGroup>
                  <Label className="forlabel" htmlFor="search">
                    Approver Name:
                  </Label>
                  <Input
                    type="text"
                    id="search"
                    className="form-control"
                    value={niptApproverName}
                    onChange={(e) => setniptApproverName(e.target.value)}
                  />
                  {errors.niptApproverName && (
                    <div className="error-message">
                      Approver Name is Required
                    </div>
                  )}
                </FormGroup>
              </Col>
            </Row>





            <Row>
              <Col md={6}>

                <FormGroup>
                  <Label className="forlabel" htmlFor="search">
                    Approver Designation
                  </Label>
                  <Input
                    type="text"
                    id="search"
                    className="form-control"
                    value={niptApproverDesignation}
                    onChange={(e) => setniptApproverDesignation(e.target.value)}
                  />
                  {errors.niptApproverDesignation && (
                    <div className="error-message">
                      Approver Designation is Required
                    </div>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>

                <FormGroup>
                  <Label className="forlabel" htmlFor="search">
                    Approver Date:
                  </Label>
                  <DatePicker
                    selected={niptApproverDate}
                    onChange={(date) => setniptApproverDate(date)}
                    wrapperClassName="custom-react-datepicker-wrapper"
                    // minDate={today}
                    dateFormat="dd/MM/yyyy"
                    value={niptApproverDate} // Set the value from the database
                    className="form-control"
                    customInput={<input style={{ width: '100%' }} />}


                  />
                </FormGroup>
              </Col>
            </Row>











            <div className="text-center">

              <Button variant="primary"
                onClick={() => handleUpdateCustomOfficer(companyid, branchId, modalData.transId, modalData.mawb, modalData.hawb, modalData.sir)}
                style={{ marginTop: '1vw' }}
              > <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                Submit
              </Button>


            </div>

          </CardBody>
        </Card>
      </Modal >

      {/* Wrong Deposit Model */}
      <Modal show={wrongDepositmodel} onHide={closewrongDepositmodel} size="lg">

        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h4 className="text-center mb-1">Wrong Deposit</h4>
            <button
              className="close-button"
              onClick={closewrongDepositmodel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
            <hr />
            <Row>
              <Col md={6}>

                <FormGroup>
                  <Label className="forlabel" htmlFor="search">
                    Choose a File
                  </Label>
                  <Input type="file" name="fileWrongDeposit"
                    className="form-control"
                    onChange={handleFileChangeWrongDeposit}
                    accept=".jpg, .jpeg, .png, .pdf"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="forlabel" htmlFor="search">
                    Remarks
                  </Label>
                  <Input
                    placeholder="Remarks Any"
                    type="text"
                    id="search"
                    className="form-control"
                    value={wrongDepositwrongDepositRemarks}
                    onChange={(e) => setwrongDepositwrongDepositRemarks(e.target.value)}
                  />
                </FormGroup>

              </Col>


            </Row>

            {wrongDepositFilePath ? (
              <div>
                <Row>

                  <Col >
                    <div
                      style={{
                        marginTop: 5,
                        marginBottom: 5,
                        display: "flex",
                        justifyContent: "center", // Center buttons horizontally
                      }}
                    >

                      <Button
                        type="button"
                        className="allbutton"
                        variant="outline-primary"
                        onClick={showDocumentModel22}

                      >

                        Show Doc
                      </Button>

                    </div>
                  </Col>

                </Row>

              </div>
            ) : null}


            <div className="text-center">
              <Button variant="primary"
                onClick={handleSubmitWrongDeposit}
                style={{ marginTop: '1vw' }}
              > <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                Submit
              </Button>
            </div>
          </CardBody>
        </Card>
      </Modal>





      {/* Peronal SIR Model */}
      <Modal show={PersonalSIRModel} onHide={closePersonalSIRModel} size="lg">

        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h4 className="text-center mb-1">Create Personal SIR</h4>
            <button
              className="close-button"
              onClick={closePersonalSIRModel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
            <hr />
            {NextPersonalCarriage === true ? (
              <Row>
                <Col md={6}>

                  <FormGroup>
                    <Label className="forlabel" htmlFor="search">
                      Detention Receipt No
                    </Label>
                    <Input type="text" name="fileWrongDeposit"
                      className="form-control"
                      onChange={(e) => setdetentionReceiptNo(e.target.value)}
                      value={detentionReceiptNo}
                    />
                    {errors.detentionReceiptNo && (
                      <div className="error-message">
                        Please Enter detentionReceiptNo
                      </div>
                    )}
                    {errors.duplicate && (
                      <div className="error-message">
                        Dulicate Detention Receipt Number
                      </div>
                    )}


                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Button variant="primary"
                      onClick={SearchDetention}
                      style={{ marginTop: '2.5vw' }}
                    > <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                      Search
                    </Button>
                  </FormGroup>

                </Col>
              </Row>

            ) : null}


            {NextPersonalCarriage === false ? (
              <>
                <Row>

                  <Col md={6}>

                    <FormGroup>
                      <Label className="forlabel" htmlFor="search">
                        Detention Receipt No
                      </Label>
                      <Input type="text" name="fileWrongDeposit"
                        className="form-control"
                        onChange={(e) => setdetentionReceiptNo(e.target.value)}
                        value={detentionReceiptNo}
                        readOnly
                        id="service"
                      />
                    </FormGroup>
                  </Col>
                </Row>


                <Row>
                  <Col md={6}>

                    <FormGroup>
                      <Label className="forlabel" htmlFor="search">
                        Select Party
                      </Label>
                      <Select
                        options={parties}
                        value={{ value: partyName, label: partyName }}
                        onChange={handlePartyChange33}
                        className={errors.partyName ? 'error-border' : ''}
                        isClearable
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            borderColor: errors.representative ? '#f52b2b' : '',
                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                            boxShadow: 'none',
                            '&:hover': {
                              border: '1px solid #ccc',
                            },
                          }),
                          indicatorSeparator: () => ({
                            display: 'none',
                          }),
                          dropdownIndicator: () => ({
                            display: 'none',
                          }),
                        }}
                      />

                      {errors.importerId && (
                        <div className="error-message">
                          Please Select Party
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>

                    <FormGroup>
                      <Label className="forlabel" htmlFor="search">
                        Value of Goods
                      </Label>
                      <Input type="text" name="fileWrongDeposit"
                        className="form-control"
                        onChange={(e) => setAssessableValue(e.target.value)}
                        value={assessableValue}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>

                    <FormGroup>
                      <Label className="forlabel" htmlFor="search">
                        No of Packages*
                      </Label>
                      <Input type="text" name="fileWrongDeposit"
                        className="form-control"
                        onChange={(e) => setNop(e.target.value)}
                        value={nop}
                      />
                      {errors.nop && (
                        <div className="error-message">
                          Please Enter No of Packages
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>

                    <FormGroup>
                      <Label className="forlabel" htmlFor="search">
                        Select Carting Agents *
                      </Label>
                      <Select
                        options={cartingAgentArray}
                        value={{ value: cartingAgent, label: cartingAgent }}
                        onChange={handleSelectionCartingAgent33}
                        className={errors.cartingAgent ? 'error-border' : ''}
                        isClearable
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



                </Row>


                <div className="text-center">
                  <Button variant="primary"
                    onClick={handlePersonalCarriage}
                    style={{ marginTop: '1vw' }}
                  > <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                    Submit
                  </Button>
                </div>

              </>
            ) : null}





          </CardBody>
        </Card>
      </Modal>

      {/* Wrong Deposit Docum */}

      {/* Show Documents Model */}


      <Modal show={documentModel2} onHide={closedocumentModel2} size="lg">
        <Card>
          <CardBody>
            <button
              className="close-button"
              onClick={closedocumentModel2}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
            {
              !pdfData ? (
                <img
                  src={ImagewrongDepositDocs}
                  alt="Saved Image"
                  onError={(e) => console.error('Error loading image:', e)}
                  className="img-fluid"
                />
              ) : null

            }


          </CardBody>
        </Card>
      </Modal>





      {/* Hand Over To Console */}


      <Modal show={showModalCartingAgent} onHide={handleCloseCartingAgent} size="xl">

        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>

            <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
              icon={faHandHoldingHand}
              style={{
                marginRight: '8px',
                color: 'black', // Set the color to golden
              }}
            />Handover To Console</h5>
            <button
              className="close-button"
              onClick={handleCloseCartingAgent}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
            <hr />
            {HandOverToCartingAgent.length === 0 && (
              <Row className="modal-contents">
                <Col md={2}></Col>
                <Col md={4} >
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Select Console</Label>
                    <Select
                      options={consoles}
                      value={ConsoleNameById}
                      onChange={handleConsoleChange}
                      placeholder="Select Console"
                      isClearable
                      className={`${errors.ConsoleNameById ? 'error-border' : ''}`}
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
                    {errors.ConsoleNameById && (
                      <div className="error-message">
                        {errors.ConsoleNameById}
                      </div>
                    )}

                  </FormGroup>
                </Col>
                <Col md={3}>
                  <Button
                    type="button"
                    style={{
                      marginTop: 32,
                      marginLeft: 5,
                    }}
                    variant="outline-primary"
                    onClick={(e) => handleSearchConsoledata(ConsoleNameById ? ConsoleNameById.value : '')}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ marginRight: "5px" }}
                    />
                    Search
                  </Button>
                </Col>

              </Row>

            )}

            {HandOverToCartingAgent.length > 0 && (
              <div className="modal-contents">
                <div className="table-responsive custom-table-container table-section">
                  <Table className="table table-striped table-hover">
                    <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                      <tr className="text-center">
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          <Input
                            className="form-check-input radios"
                            type="checkbox"
                            style={{ width: '1.2vw', height: '1.2vw' }}
                            name="taxApplicable"
                            checked={selectAll}
                            onChange={() => handleSelectAllToggle()}
                          /></th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">MAWB No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">HAWB No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Importer</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">SIR No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">PCKGS</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Gross Wt</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">DGDC Status</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">NSDL Status</th>

                      </tr>
                    </thead>
                    <tbody>

                      {HandOverToCartingAgent.map((imports, index) =>

                        <tr className="text-center" key={imports.sirNo}>
                          <td className="table-column">

                            <Input
                              className="form-check-input radios"
                              type="checkbox"
                              style={{ width: '1.2vw', height: '1.2vw' }}
                              name="taxApplicable"
                              checked={selectedItems.some((item) => item.sirNo === imports.sirNo)}
                              onChange={() => handleRowCheckboxChange(index)}
                            />
                          </td>
                          <td className="table-column">{imports.mawb}</td>
                          <td className="table-column">{imports.hawb.startsWith('000') ? '' : imports.hawb}</td>
                          <td className="table-column">{imports.importerId}</td>
                          <td className="table-column">{imports.sirNo}</td>
                          <td className="table-column">{imports.nop}</td>
                          <td className="table-column">{imports.grossWeight}</td>
                          <td className="table-column">{imports.dgdc_Status}</td>
                          <td className="table-column">{imports.nsdl_Status}</td>

                        </tr>
                      )
                      }
                    </tbody>
                  </Table>

                </div>
                <div className="other-content-section">
                  <div>
                    <Row>

                      <Col>
                        <b> Total of BE - {HandOverToCartingAgent.length}</b>
                      </Col>
                      <Col > <b> No of Packages - {calculateTotalPackages(HandOverToCartingAgent)} </b></Col>
                      <Col>
                        <b> Selected Packages - {calculateTotalPackages(selectedItems)}</b></Col>
                    </Row>
                    <hr />

                  </div>

                  <div className="flex-grow-1 ">


                    <Row className="mt-3" style={{ marginLeft: '2vw' }}>

                      {/* <Col md={1}></Col> */}
                      <Col md={3}>
                        {representativeNew.imagePath ? (
                          <img
                            src={representativeNew.imagePath}
                            alt="Santosh"
                            className="image-column rounded-image"
                            width="200" // Adjust the width to your desired size
                            height="200"
                          />
                        ) : (
                          <img src={SantoshImage} alt="Santosh" className="image-column rounded-image"
                            width="200" // Adjust the width to your desired size
                            height="200" />
                        )}
                      </Col>
                      <Col md={8}>

                        <Row>
                          <Col md={5}>
                            <FormGroup>
                              <Label className="forlabel" for="branchId">Select Representative </Label>
                              <Select
                                options={representatives}
                                value={selectedRepresentative}
                                onChange={handleselectedRepresentative}
                                className={errors.selectedRepresentative ? 'error-border' : ''}
                                isClearable
                                styles={{
                                  control: (provided, state) => ({
                                    ...provided,
                                    borderColor: errors.representative ? '#f52b2b' : '',
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


                          <Col md={7}>

                            <Row>
                              <Col md={6}>
                                <FormGroup>
                                  <Label className="forlabel" for="branchId">Mobile Number </Label>

                                  <Input
                                    type="text"
                                    name="mobile"
                                    id="service"
                                    value={representativeNew.mobile}
                                    style={{ borderColor: errors.mobile ? '#f52b2b' : '' }}
                                  />
                                </FormGroup>
                              </Col>

                              <Col md={5}>
                                <Button
                                  type="button"
                                  style={{ marginTop: '2.2vw', height: 'auto', minHeight: '2.3rem', marginLeft: '1.3vw' }}
                                  onClick={() => checkotp4(calculateTotalPackages(selectedItems))}
                                  variant="outline-primary"
                                >
                                  <FontAwesomeIcon icon={faBolt} />
                                  Send OTP
                                </Button>
                              </Col>



                            </Row>
                          </Col>
                        </Row>

                        <Row>


                          <Col md={5}>
                            <FormGroup>
                              <Label className="forlabel" for="branchId">Enter OTP</Label>

                              <Input type="text" name="otp"
                                placeholder="Enter OTP"
                                className="form-control"
                                style={{ borderColor: errors.otp ? '#f52b2b' : '' }}
                                value={otp}
                                onChange={(e) => setOTP(e.target.value)}

                              />
                            </FormGroup>

                          </Col>




                          <Col md={7}>


                            <Row style={{ marginTop: 30 }}>
                              <Col md={1}>

                                <input
                                  type="radio"
                                  name="options"
                                  value="N"
                                  className="radios2"
                                  checked={selectedOption1 === 'N'}
                                  onChange={handleRadioChange}
                                />

                              </Col>

                              <Col md={3}>
                                <label><b>New Trip</b></label>
                              </Col>

                              <Col md={1}>

                                <input
                                  type="radio"
                                  name="options"
                                  value="Y"
                                  className="radios2"
                                  checked={selectedOption1 === 'Y'}
                                  onChange={handleRadioChange}
                                />

                              </Col>

                              <Col md={3}>
                                <label><b>Existing Trip</b></label>


                              </Col>

                              <Col md={4}>

                                {selectedOption1 === 'Y' && (
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

                              </Col>


                            </Row>

                          </Col>

                        </Row>




                        <Col md={1}></Col>
                      </Col>
                    </Row >

                    <div className="text-center mt-1 mb-2">
                      <Button
                        type="button"

                        variant="outline-success"
                        disabled={!otp || !ConsoleNameById || !selectedRepresentative}
                        onClick={() => updateCartingAgentStatus(companyid, branchId, userId, otp, ConsoleNameById.value, selectedRepresentative.value)}
                      ><FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

            )}

          </CardBody>
        </Card>

      </Modal>




      {/* Received from Carting Agent */}


      <Modal show={receivedCartingmodel} onHide={closereceivedCartingmodel} size="xl">

        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h4 className="text-center mb-1">Receive From Console</h4>
            <button
              className="close-button"
              onClick={closereceivedCartingmodel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>




            <hr />
            {ReceivedCartingImports.length === 0 && (
              <Row className="modal-contents">
                <Col md={5} >
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Select Console</Label>
                    <Select
                      options={consoles}
                      value={ConsoleNameById}
                      onChange={handleConsoleChange}
                      placeholder="Select Console"
                      isClearable
                      className={`${errors.ConsoleNameById ? 'error-border' : ''}`}
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
                    {errors.ConsoleNameById && (
                      <div className="error-message">
                        {errors.ConsoleNameById}
                      </div>
                    )}

                  </FormGroup>
                </Col>


                <Col md={5}>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Select Representative </Label>
                    <Select
                      options={representatives}
                      value={selectedRepresentative}
                      onChange={handleselectedRepresentative}
                      className={errors.selectedRepresentative ? 'error-border' : ''}
                      isClearable
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          borderColor: errors.representative ? '#f52b2b' : '',
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



                <Col md={2}>
                  <Button
                    type="button"
                    style={{
                      marginTop: 32,
                      marginLeft: 5,
                    }}
                    variant="outline-primary"
                    disabled={!ConsoleNameById || !selectedRepresentative}
                    onClick={() => SearchCartingAgentsImports(companyid, branchId, ConsoleNameById.value, selectedRepresentative.value)}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ marginRight: "5px" }}
                    />
                    Search
                  </Button>
                </Col>

              </Row>

            )}

            {ReceivedCartingImports.length > 0 && (
              <div className="modal-contents">
                <div className="table-responsive custom-table-container table-section">
                  <Table className="table table-bordered custom-table">
                    <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                      <tr className="text-center">
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          <Input
                            className="form-check-input radios"
                            type="checkbox"
                            style={{ width: '1.2vw', height: '1.2vw' }}
                            name="taxApplicable"
                            checked={selectAllReceived}
                            onChange={() => handleSelectAllToggleReceivedCarting()}
                          /></th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">MAWB No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">HAWB No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Importer</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">SIR No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">PCKGS</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Gross Wt</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">DGDC Status</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">NSDL Status</th>

                      </tr>
                    </thead>
                    <tbody>

                      {ReceivedCartingImports.map((imports, index) =>

                        <tr className="text-center" key={imports.sirNo}>
                          <td className="table-column">

                            <Input
                              className="form-check-input radios"
                              type="checkbox"
                              style={{ width: '1.2vw', height: '1.2vw' }}
                              name="mmmm"
                              checked={selectedreceivedCarting.some((item) => item.sirNo === imports.sirNo)}
                              onChange={() => handleRowCheckboxChangeReceived(index)}
                            />
                          </td>
                          <td className="table-column">{imports.mawb}</td>
                          <td className="table-column">{imports.hawb.startsWith('000') ? '' : imports.hawb}</td>
                          <td className="table-column">{imports.importerId}</td>
                          <td className="table-column">{imports.sirNo}</td>
                          <td className="table-column">{imports.nop}</td>
                          <td className="table-column">{imports.grossWeight}</td>
                          <td className="table-column">{imports.dgdc_Status}</td>
                          <td className="table-column">{imports.nsdl_Status}</td>

                        </tr>
                      )
                      }
                    </tbody>
                  </Table>

                </div>
                <div className="other-content-section">
                  <div>
                    <Row>

                      <Col md={2}>
                        <b> Total of BE: {ReceivedCartingImports.length}</b>
                      </Col>
                      <Col md={2}></Col>
                      <Col md={4}> <b> No of Packages:  {calculateTotalPackages(ReceivedCartingImports)} </b></Col>
                      <Col md={4}>
                        <b> Selected Packages: {calculateTotalPackages(selectedreceivedCarting)}</b></Col>

                    </Row>

                  </div>

                  <div className="flex-grow-1 ">


                    <Row className="mt-3" style={{ marginLeft: '2vw' }}>

                      {/* <Col md={1}></Col> */}
                      <Col md={3}>
                        {representativeNew.imagePath ? (
                          <img
                            src={representativeNew.imagePath}
                            alt="Santosh"
                            className="image-column rounded-image"
                          />
                        ) : (
                          <img src={SantoshImage} alt="Santosh" className="image-column rounded-image" />
                        )}
                      </Col>
                      <Col md={8}>

                        <Row>
                          <Col>
                            <FormGroup>
                              <Label className="forlabel" for="branchId">Console</Label>


                              <Input
                                type="text"
                                name="mobile"
                                id="service"
                                value={ConsoleNameById.label}
                              // style={{ borderColor: errors.cartingAgent ? '#f52b2b' : '' }}
                              />


                            </FormGroup>
                          </Col>


                          <Col>

                            <FormGroup>
                              <Label className="forlabel" for="branchId">Representative </Label>

                              <Input
                                type="text"
                                name="mobile"
                                id="service"
                                value={selectedRepresentative.label}
                              // style={{ borderColor: errors.representative ? '#f52b2b' : '' }}
                              />
                            </FormGroup>


                          </Col>

                        </Row>

                        <Row>
                          <Col md={6}>


                            <Row noGutters>
                              <Col md={7}>
                                <FormGroup>
                                  <Label className="forlabel" for="branchId">Mobile Number </Label>

                                  <Input
                                    type="text"
                                    name="mobile"
                                    id="service"
                                    value={representativeNew.mobile}
                                  // style={{ borderColor: errors.mobile ? '#f52b2b' : '' }}
                                  />


                                </FormGroup>

                              </Col>

                              <Col md={5}>
                                <Button
                                  type="button"
                                  style={{ marginTop: '2.2vw', height: 'auto', minHeight: '2.3rem', marginLeft: '1vw' }}
                                  onClick={() => checkotp4(calculateTotalPackages(selectedreceivedCarting))}
                                  variant="outline-primary"
                                >
                                  <FontAwesomeIcon icon={faBolt} />
                                  Send OTP
                                </Button>

                              </Col>

                            </Row>

                          </Col>




                          <Col md={6}>
                            <FormGroup>
                              <Label className="forlabel" for="branchId">Enter OTP</Label>

                              <Input type="text" name="otp"
                                placeholder="Enter OTP"
                                className="form-control"
                                style={{ borderColor: errors.otp ? '#f52b2b' : '' }}
                                value={otp}
                                onChange={(e) => setOTP(e.target.value)}

                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      <Col md={1}></Col>
                    </Row >

                    <div className="text-center mt-1 mb-2">
                      <Button
                        type="button"
                        className="widthbtn"
                        variant="outline-primary"
                        disabled={!otp}
                        onClick={() => updateReceivedCartingAget(companyid, branchId, userId, otp, ConsoleNameById.value, selectedRepresentative.value)}
                      ><FontAwesomeIcon icon={faSave} style={{ marginRight: '2px' }} />
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

            )}

          </CardBody>
        </Card>

      </Modal>


      {/* Handing Overto Party Or Cha Model  Main*/}





      <Modal show={PertyORChamodel} onHide={closePartyORChamodel} size="xl">

        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h4 className="text-center mb-1">To CHA</h4>

            <button
              className="close-button"
              onClick={closePartyORChamodel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>

            <hr />
            {ImportsOfPartyorCha.length === 0 && expiredPartyList.length === 0 && (
              <Row className="modal-contents">
                <Col md={2}></Col>
                <Col md={4} >
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Select CHA</Label>
                    <Select
                      options={chas}
                      value={selectedCha}
                      onChange={handleCHAChange}
                      placeholder="Select CHA"
                      isClearable
                      className={`${errors.cha ? 'error-border' : ''}`}
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
                    {errors.cha && (
                      <div className="error-message">
                        {errors.cha}
                      </div>
                    )}

                  </FormGroup>
                </Col>
                <Col md={3}>
                  <Button
                    type="button"
                    style={{
                      marginTop: 32,
                      marginLeft: 5,
                    }}
                    variant="outline-primary"
                    disabled={!selectedCha}
                    onClick={(e) => handleSearchCHAdata(selectedCha ? selectedCha.value : '')}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ marginRight: "5px" }}
                    />
                    Search
                  </Button>
                </Col>

              </Row>

            )}

            {(ImportsOfPartyorCha.length > 0) && (

              <div className="modal-contents">
                <div className="table-responsive custom-table-container table-section">
                  <Table className="table table-bordered custom-table">
                    <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                      <tr className="text-center">
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                          <Input
                            className="form-check-input radios"
                            type="checkbox"
                            style={{ width: '1.2vw', height: '1.2vw' }}
                            name="taxApplicable"
                            checked={selectPartyOrCHAAll}
                            onChange={() => handleSelectAllTogglePartyOrCha()}
                          /></th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">MAWB No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">HAWB No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Importer</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">SIR No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">PCKGS</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Gross Wt</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">DGDC Status</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">NSDL Status</th>

                      </tr>
                    </thead>
                    <tbody>

                      {ImportsOfPartyorCha.map((imports, index) =>

                        <tr className="text-center" key={imports.sirNo}>
                          <td className="table-column">

                            <Input
                              className="form-check-input radios"
                              type="checkbox"
                              style={{ width: '1.2vw', height: '1.2vw' }}
                              name="taxApplicable"
                              checked={selectedItemsPartyOrCHA.some((item) => item.sirNo === imports.sirNo)}
                              onChange={() => handleRowCheckboxChangePartyOrCHA(index)}
                            />
                          </td>
                          <td className="table-column">{imports.mawb}</td>
                          <td className="table-column">{imports.hawb.startsWith('000') ? '' : imports.hawb}</td>
                          <td className="table-column">{imports.importerId}</td>
                          <td className="table-column">{imports.sirNo}</td>
                          <td className="table-column">{imports.nop}</td>
                          <td className="table-column">{imports.grossWeight}</td>
                          <td className="table-column">{imports.dgdc_Status}</td>
                          <td className="table-column">{imports.nsdl_Status}</td>

                        </tr>
                      )
                      }
                    </tbody>
                  </Table>

                </div>




                <div className="other-content-section">
                  <div>
                    <Row>

                      <Col md={2}>
                        <b> Total of BE: {ImportsOfPartyorCha.length}</b>
                      </Col>
                      <Col md={2}></Col>
                      <Col md={4}> <b> No of Packages:  {calculateTotalPackages(ImportsOfPartyorCha)} </b></Col>
                      <Col md={4}>
                        <b> Selected Packages: {calculateTotalPackages(selectedItemsPartyOrCHA)}</b>
                      </Col>
                    </Row>

                  </div>

                  <div className="flex-grow-1 ">


                    <Row className="mt-3 mb-2" style={{ marginLeft: '2vw' }}>


                      <Col md={3}>
                        {representativeNew.imagePath ? (
                          <img
                            src={representativeNew.imagePath}
                            alt="Santosh"
                            className="image-column rounded-image"
                          />
                        ) : (
                          <img src={SantoshImage} alt="Santosh" className="image-column rounded-image" />
                        )}
                      </Col>
                      <Col md={8}>

                        <Row>
                          <Col>
                            <FormGroup>
                              <Label className="forlabel" for="branchId">Name</Label>
                              <Input
                                type="text"
                                name="name"
                                id="service"
                                readOnly
                                value={selectedCha ? selectedCha.label : ''}
                              />
                            </FormGroup>
                          </Col>


                          <Col>

                            <FormGroup>
                              <Label className="forlabel" for="branchId">Select Representative </Label>

                              <Select
                                options={representatives}
                                value={selectedRepresentative}
                                onChange={handleselectedRepresentative}
                                className={errors.selectedRepresentative ? 'error-border' : ''}
                                isClearable
                                styles={{
                                  control: (provided, state) => ({
                                    ...provided,
                                    borderColor: errors.representative ? '#f52b2b' : '',
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

                        </Row>

                        <Row>
                          <Col md={6}>


                            <Row noGutters>
                              <Col md={7}>
                                <FormGroup>
                                  <Label className="forlabel" for="branchId">Mobile Number </Label>

                                  <Input
                                    type="text"
                                    name="mobile"
                                    id="service"
                                    value={representativeNew.mobile}
                                  />
                                </FormGroup>

                              </Col>

                              <Col md={5}>
                                <Button
                                  type="button"
                                  style={{ marginTop: '2.2vw', height: 'auto', minHeight: '2.3rem', marginLeft: '1vw' }}
                                  onClick={() => checkotp4(calculateTotalPackages(selectedItemsPartyOrCHA))}
                                  variant="outline-primary"
                                >
                                  <FontAwesomeIcon icon={faBolt} />
                                  Send OTP
                                </Button>

                              </Col>

                            </Row>

                          </Col>




                          <Col md={6}>
                            <FormGroup>
                              <Label className="forlabel" for="branchId">Enter OTP</Label>

                              <Input type="text" name="otp"
                                placeholder="Enter OTP"
                                className="form-control"
                                style={{ borderColor: errors.otp ? '#f52b2b' : '' }}
                                value={otp}
                                onChange={(e) => setOTP(e.target.value)}

                              />
                            </FormGroup>
                          </Col>
                        </Row>


                      </Col>



                      <Col md={1}></Col>
                    </Row >


                    <div className="text-center mt-1 mb-2">
                      <Button
                        type="button"
                        className="widthbtn"
                        variant="outline-success"
                        disabled={!selectedCha || !selectedRepresentative || !otp}
                        onClick={() => updatePartyOrCHAStatus(companyid, branchId, userId, otp, selectedCha.value, selectedRepresentative.value)}
                      ><FontAwesomeIcon icon={faSave} style={{ marginRight: '2px' }} />
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

            )}
          </CardBody>
        </Card>

      </Modal>

      {/* Show Documents Model */}


      <Modal show={documentModel} onHide={closedocumentModel} size="lg">
        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} >
              <FontAwesomeIcon icon={faHandHoldingHand} style={{ marginRight: '8px', color: 'black' }} />
              Document Show
            </h5>
            <button className="close-button" onClick={closedocumentModel}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <hr />
            {pdfData ? (
              <embed src={pdfData.url} type="application/pdf" width="100%" height="500px" />
            ) : ImagensdlStatusDocs ? (
              <img src={ImagensdlStatusDocs} alt="Saved Image" onError={(e) => console.error('Error loading image:', e)} className="img-fluid" style={{ maxWidth: '100%', height: '500px' }} />
            ) : (
              <p>No document available</p>
            )}
          </CardBody>
        </Card>
      </Modal>

      <Modal show={modalDocumentShow} onHide={closeModalDocumentShow} size="lg">
        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
              icon={faHandHoldingHand}
              style={{
                marginRight: '8px',
                color: 'black', // Set the color to golden
              }}
            />Document Show</h5>
            <button
              className="close-button"
              onClick={closeModalDocumentShow}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
            <hr />
            {file && file.type.includes('image') ? (
              <img src={URL.createObjectURL(file)} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
            ) : file && file.type === 'application/pdf' ? (
              <embed src={URL.createObjectURL(file)} type="application/pdf" width="100%" height="500px" />
            ) : (
              <p>No file selected</p>
            )}

            {/* {pdfData && (
        <embed src={data:application/pdf;base64,${pdfData}} type="application/pdf" width="100%" height="500px" />
      )} */}

          </CardBody>
        </Card>
      </Modal>

      {/* Single Carting Agent */}
      <Modal show={singleCartingModel} onHide={closesingleCartingModel} size="xl">

        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
              icon={faHandHoldingHand}
              style={{
                marginRight: '8px',
                color: 'black', // Set the color to golden
              }}
            />Handover to Console</h5>

            <button
              className="close-button"
              onClick={closesingleCartingModel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
            <hr />
            <Row className="mt-3" style={{ marginLeft: '2vw' }}>

              {/* <Col md={1}></Col> */}
              <Col md={3}>
                {representativeNew.imagePath ? (
                  <img
                    src={representativeNew.imagePath}
                    alt="Santosh"
                    className="image-column rounded-image"
                    width="200" // Adjust the width to your desired size
                    height="200"
                  />
                ) : (
                  <img src={SantoshImage} alt="Santosh" className="image-column rounded-image"
                    width="200" // Adjust the width to your desired size
                    height="200" />
                )}
              </Col>
              <Col md={8}>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Console</Label>
                      <Input type="text" name="consoleobeSent"
                        placeholder="Console"
                        className="form-control"
                        style={{ borderColor: errors.otp ? '#f52b2b' : '' }}
                        value={consoleobeSent}
                        readonly
                        id="service"
                        onChange={(e) => setConsoleobeSent(e.target.value)}
                      />
                    </FormGroup>
                  </Col>


                  <Col>

                    <FormGroup>
                      <Label className="forlabel" for="branchId">Select Representative </Label>
                      <Select
                        options={representatives}
                        value={selectedRepresentative}
                        onChange={handleselectedRepresentative}
                        className={errors.selectedRepresentative ? 'error-border' : ''}
                        placeholder="Select Representative"
                        isClearable
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            borderColor: errors.representative ? '#f52b2b' : '',
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

                </Row>

                <Row>
                  <Col md={6}>
                    <Row noGutters>
                      <Col md={7}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Mobile Number </Label>
                          <Input
                            type="text"
                            name="mobile"
                            id="service"
                            value={representativeNew.mobile}
                            style={{ borderColor: errors.mobile ? '#f52b2b' : '' }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={1}> </Col>
                      <Col md={4}>

                        <Button
                          type="button"
                          style={{ marginTop: '2.2vw', height: 'auto', minHeight: '2.3rem' }}
                          onClick={() => handleSendOTP(nop)}
                          variant="outline-primary"
                          disabled={!consoleobeSent || !selectedConsole || !selectedRepresentative}
                        >
                          <FontAwesomeIcon icon={faBolt} />
                          Send OTP
                        </Button>
                      </Col>

                    </Row>

                  </Col>




                  <Col md={6}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Enter OTP</Label>

                      <Input type="text" name="otp"
                        placeholder="Enter OTP"
                        className="form-control"
                        style={{ borderColor: errors.otp ? '#f52b2b' : '' }}
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}

                      />
                    </FormGroup>

                  </Col>

                </Row>


              </Col>



              <Col md={1}></Col>
            </Row >


            <Row className="text-center" style={{ marginBottom: 20 }}>
              <div>
                <span style={{ marginRight: 25 }}>
                  <input
                    type="radio"
                    name="options"
                    value="N"

                    checked={selectedOption1 === 'N'}
                    onChange={handleRadioChange}
                  />
                  <label style={{ marginBottom: 15 }}><b>New Trip</b></label>
                </span>
                <span style={{ marginRight: 20 }}>
                  <input
                    type="radio"
                    name="options"
                    value="Y"

                    checked={selectedOption1 === 'Y'}
                    onChange={handleRadioChange}
                  />
                  <label><b>Existing Trip</b></label>
                </span >
                {selectedOption1 === 'Y' && (
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
            <div className="text-center mt-2">
              <Button
                type="button"
                className="allbutton"
                variant="outline-success"

                style={{ marginRight: 5 }}
                disabled={!otp || !consoleobeSent || !selectedConsole || !selectedRepresentative}
                onClick={() => submitSingleCartingAgent(modalData.companyid, modalData.branchId, userId, otp, selectedConsole, selectedRepresentative.value)}
              >  <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                Submit
              </Button>
            </div>
          </CardBody>
        </Card>
      </Modal >




      {/* Single Party or Cha HandOver */}


      <Modal show={singlechaModel} onHide={closesinglechaModel} size="xl">

        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
              icon={faHandHoldingHand}
              style={{
                marginRight: '8px',
                color: 'black', // Set the color to golden
              }}
            />Handover to CHA</h5>

            <button
              className="close-button"
              onClick={closesinglechaModel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>
            <hr />
            <Row className="mt-3" style={{ marginLeft: '2vw' }}>

              {/* <Col md={1}></Col> */}
              <Col md={3}>
                {representativeNew.imagePath ? (
                  <img
                    src={representativeNew.imagePath}
                    alt="Santosh"
                    className="image-column rounded-image"
                    width="200" // Adjust the width to your desired size
                    height="200"
                  />
                ) : (
                  <img src={SantoshImage} alt="Santosh" className="image-column rounded-image"
                    width="200" // Adjust the width to your desired size
                    height="200" />
                )}
              </Col>
              <Col md={8}>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">CHA</Label>
                      <Input type="text" name="consoleobeSent"
                        placeholder="CHA"
                        className="form-control"
                        style={{ borderColor: errors.otp ? '#f52b2b' : '' }}
                        value={consoleobeSent}
                        readonly
                        id="service"
                      // onChange={(e) => setConsoleobeSent(e.target.value)}
                      />
                    </FormGroup>
                  </Col>


                  <Col>

                    <FormGroup>
                      <Label className="forlabel" for="branchId">Select Representative </Label>
                      <Select
                        options={representatives}
                        value={selectedRepresentative}
                        onChange={handleselectedRepresentative}
                        className={errors.selectedRepresentative ? 'error-border' : ''}
                        placeholder="Select Representative"
                        isClearable
                        styles={{
                          control: (provided, state) => ({
                            ...provided,
                            borderColor: errors.representative ? '#f52b2b' : '',
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

                </Row>

                <Row>
                  <Col md={6}>
                    <Row noGutters>
                      <Col md={7}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">Mobile Number </Label>
                          <Input
                            type="text"
                            name="mobile"
                            id="service"
                            value={representativeNew.mobile}
                            style={{ borderColor: errors.mobile ? '#f52b2b' : '' }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={1}> </Col>
                      <Col md={4}>

                        <Button
                          type="button"
                          style={{ marginTop: '2.2vw', height: 'auto', minHeight: '2.3rem' }}
                          onClick={() => handleSendOTP(nop)}
                          variant="outline-primary"
                          disabled={!consoleobeSent || !selectedConsole || !selectedRepresentative}
                        >
                          <FontAwesomeIcon icon={faBolt} />
                          Send OTP
                        </Button>
                      </Col>

                    </Row>

                  </Col>




                  <Col md={6}>
                    <FormGroup>
                      <Label className="forlabel" for="branchId">Enter OTP</Label>

                      <Input type="text" name="otp"
                        placeholder="Enter OTP"
                        className="form-control"
                        style={{ borderColor: errors.otp ? '#f52b2b' : '' }}
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}

                      />
                    </FormGroup>

                  </Col>

                </Row>


              </Col>



              <Col md={1}></Col>
            </Row >

            <div className="text-center mt-2">
              <Button
                type="button"
                className="allbutton"
                variant="outline-success"
                style={{ marginRight: 5 }}
                disabled={!otp || !consoleobeSent || !selectedConsole || !selectedRepresentative}
                onClick={() => updatePartyOrCHAStatusSingle(companyid, branchId, userId, otp, selectedConsole, selectedRepresentative.value)}
              >  <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                Submit
              </Button>
            </div>
          </CardBody>
        </Card>
      </Modal >



      {/* UPDATE IMPORTS CUSTOM TP NUMBER */}


      <Modal show={customTPNumbermodel} onHide={closeCustomTPNumbermodel} size="xl">
        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h4 className="text-center mb-1">Update Custom TP Number {tpNumberImports.length > 0 && `(${ConsoleNameById.label})`}</h4>
            <button
              className="close-button"
              onClick={closeCustomTPNumbermodel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>

            <hr />
            {tpNumberImports.length === 0 && (
              <Row className="modal-contents">
                <Col md={5} >
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Select Console</Label>
                    <Select
                      options={consoles}
                      value={ConsoleNameById}
                      onChange={handleConsoleChange}
                      placeholder="Select Console"
                      isClearable
                      className={`${errors.ConsoleNameById ? 'error-border' : ''}`}
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
                    {errors.ConsoleNameById && (
                      <div className="error-message">
                        {errors.ConsoleNameById}
                      </div>
                    )}

                  </FormGroup>
                </Col>

                <Col md={2}>
                  <Button
                    type="button"
                    style={{
                      marginTop: 32,
                      marginLeft: 5,
                    }}
                    variant="outline-primary"
                    disabled={!ConsoleNameById}
                    onClick={() => SearchCustomTpNumberUpdateImports(companyid, branchId, ConsoleNameById.value)}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ marginRight: "5px" }}
                    />
                    Search
                  </Button>
                </Col>

              </Row>

            )}

            {tpNumberImports.length > 0 && (
              <>

                <Row>
                  <Col md={3}>

                    <FormGroup>
                      <Label className="forlabel" for="branchId">Custom's Tp Number</Label>
                      <Input type="text" name="consoleobeSent"
                        placeholder="enter customs tp number"
                        className="form-control"
                        value={customNumber}
                        onChange={(e) => setCustomNumber(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>

                    <FormGroup>
                      <Label className="forlabel" for="branchId">Custom's TP Date</Label>
                      <DatePicker
                        selected={customDate}
                        placeholder="Enter Igm Date"
                        onChange={(date) => setCustomDate(date)}
                        wrapperClassName="custom-react-datepicker-wrapper"
                        dateFormat="dd/MM/yyyy"
                        value={customDate}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <Button
                      type="button"
                      style={{
                        marginTop: 32,
                        marginLeft: 5,
                      }}
                      variant="outline-primary"
                      disabled={!customDate || !customNumber || !selectedItemsCustoms.length > 0}
                      onClick={() => submitCustomsTpNumber(companyid, branchId, customNumber, customDate)}
                    >
                      <FontAwesomeIcon
                        icon={FaSave}
                        style={{ marginRight: "5px" }}
                      />
                      update
                    </Button>
                  </Col>

                </Row>

                <div className="modal-contents">
                  <div className="table-responsive custom-table-container table-section">
                    <Table className="table table-bordered custom-table">
                      <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                        <tr className="text-center">
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                            <Input
                              className="form-check-input radios"
                              type="checkbox"
                              style={{ width: '1.2vw', height: '1.2vw' }}
                              name="taxApplicable"
                              checked={selectCustomAll}
                              onChange={() => handleSelectAllToggleCustoms()}
                            /></th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">MAWB No</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">HAWB No</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Importer</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">SIR No</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">PCKGS</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Gross Wt</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">DGDC Status</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Parcel Status</th>

                        </tr>
                      </thead>
                      <tbody>

                        {tpNumberImports.map((imports, index) =>

                          <tr className="text-center" key={imports.sirNo}>
                            <td className="table-column">

                              <Input
                                className="form-check-input radios"
                                type="checkbox"
                                style={{ width: '1.2vw', height: '1.2vw' }}
                                name="mmmm"
                                checked={selectedItemsCustoms.some((item) => item.sirNo === imports.sirNo)}
                                onChange={() => handleRowCheckboxChangeCustoms(index)}
                              />
                            </td>
                            <td className="table-column">{imports.mawb}</td>
                            <td className="table-column">{imports.hawb.startsWith('000') ? '' : imports.hawb}</td>
                            <td className="table-column">{imports.importerId}</td>
                            <td className="table-column">{imports.sirNo}</td>
                            <td className="table-column">{imports.nop}</td>
                            <td className="table-column">{imports.grossWeight}</td>
                            <td className="table-column">{imports.dgdc_Status}</td>
                            <td className="table-column">{imports.nsdl_Status}</td>
                          </tr>
                        )
                        }
                      </tbody>
                    </Table>

                  </div>

                </div>

              </>

            )}

          </CardBody>
        </Card>

      </Modal>




      {/* UPDATE IMPORTS CUSTOM PCTM NUMBER */}
      <Modal show={customPCTMNumbermodel} onHide={closeCustomPCTMNumbermodel} size="xl">
        <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <CardBody>
            <h4 className="text-center mb-1">Update Custom PCTM Number {pctmNumberImports.length > 0 && `(${ConsoleNameById.label}) (${selectedDestination.label})`}</h4>
            <button
              className="close-button"
              onClick={closeCustomPCTMNumbermodel}
            >
              <FontAwesomeIcon
                icon={faTimes}
              />
            </button>

            <hr />
            {pctmNumberImports.length === 0 && (
              <Row className="modal-contents">
                <Col md={4} >
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Select Console</Label>
                    <Select
                      options={consoles}
                      value={ConsoleNameById}
                      onChange={handleConsoleChangePctmImports}
                      placeholder="Select Console"
                      isClearable
                      className={`${errors.ConsoleNameById ? 'error-border' : ''}`}
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
                    {errors.ConsoleNameById && (
                      <div className="error-message">
                        {errors.ConsoleNameById}
                      </div>
                    )}

                  </FormGroup>
                </Col>

                <Col md={4}>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">select Port of destination</Label>
                    <Select
                      options={destinations}
                      value={selectedDestination}
                      onChange={handleDestinationChange}
                      placeholder="Select port of destination"
                      isClearable
                      className={`${errors.port ? 'error-border' : ''}`}
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
                    {errors.port && (
                      <div className="error-message">
                        {errors.port}
                      </div>
                    )}
                  </FormGroup>
                </Col>


                <Col md={2}>
                  <Button
                    type="button"
                    style={{
                      marginTop: 32,
                      marginLeft: 5,
                    }}
                    variant="outline-primary"
                    disabled={!ConsoleNameById || !selectedDestination}
                    onClick={() => findCustomPctmNumberImports(ConsoleNameById.value, selectedDestination.value)}
                  >
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ marginRight: "5px" }}
                    />
                    Search
                  </Button>
                </Col>

              </Row>

            )}

            {pctmNumberImports.length > 0 && (
              <>

                <Row>
                  <Col md={3}>

                    <FormGroup>
                      <Label className="forlabel" for="branchId">Custom's Pctm Number</Label>
                      <Input type="text" name="consoleobeSent"
                        placeholder="enter customs pctm number"
                        className="form-control"
                        value={customPCTMNumber}
                        onChange={(e) => setCustomPCTMNumber(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={3}>

                    <FormGroup>
                      <Label className="forlabel" for="branchId">Custom's Pctm Date</Label>
                      <DatePicker
                        selected={customPCTMDate}
                        onChange={(date) => setCustomPCTMDate(date)}
                        wrapperClassName="custom-react-datepicker-wrapper"
                        dateFormat="dd/MM/yyyy"
                        value={customPCTMDate}
                        className="form-control"
                      />
                    </FormGroup>
                  </Col>

                  <Col md={2}>
                    <Button
                      type="button"
                      style={{
                        marginTop: 32,
                        marginLeft: 5,
                      }}
                      variant="outline-primary"
                      disabled={!customPCTMDate || !customPCTMNumber || !selectedItemsCustomsPctm.length > 0 || !selectedDestination || !ConsoleNameById}
                      onClick={() => submitCustomsPCTMNumber(customPCTMNumber, customPCTMDate, ConsoleNameById.value, selectedDestination.value)}
                    >
                      <FontAwesomeIcon
                        icon={FaSave}
                        style={{ marginRight: "5px" }}
                      />
                      update
                    </Button>
                  </Col>

                </Row>

                <div className="modal-contents">
                  <div className="table-responsive custom-table-container table-section">
                    <Table className="table table-bordered custom-table">
                      <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                        <tr className="text-center">
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                            <Input
                              className="form-check-input radios"
                              type="checkbox"
                              style={{ width: '1.2vw', height: '1.2vw' }}
                              name="taxApplicable"
                              checked={selectCustomAllPctm}
                              onChange={() => handleSelectAllToggleCustomsPctm()}
                            /></th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">MAWB No</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">HAWB No</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Importer</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">SIR No</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">PCKGS</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Gross Wt</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">DGDC Status</th>
                          <th style={{ backgroundColor: '#BADDDA' }} scope="col">Parcel Status</th>

                        </tr>
                      </thead>
                      <tbody>

                        {pctmNumberImports.map((imports, index) =>

                          <tr className="text-center" key={imports.sirNo}>
                            <td className="table-column">

                              <Input
                                className="form-check-input radios"
                                type="checkbox"
                                style={{ width: '1.2vw', height: '1.2vw' }}
                                name="mmmm"
                                checked={selectedItemsCustomsPctm.some((item) => item.sirNo === imports.sirNo)}
                                onChange={() => handleRowCheckboxChangeCustomsPctm(index)}
                              />
                            </td>
                            <td className="table-column">{imports.mawb}</td>
                            <td className="table-column">{imports.hawb.startsWith('000') ? '' : imports.hawb}</td>
                            <td className="table-column">{imports.importerId}</td>
                            <td className="table-column">{imports.sirNo}</td>
                            <td className="table-column">{imports.nop}</td>
                            <td className="table-column">{imports.grossWeight}</td>
                            <td className="table-column">{imports.dgdc_Status}</td>
                            <td className="table-column">{imports.nsdl_Status}</td>
                          </tr>
                        )
                        }
                      </tbody>
                    </Table>

                  </div>

                </div>

              </>

            )}

          </CardBody>
        </Card>

      </Modal>


    </div>
  );
}

export default Import;