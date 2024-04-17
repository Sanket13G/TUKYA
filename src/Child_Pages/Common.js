
import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import '../Components/Style.css';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import axios from "axios";
import ipaddress from "../Components/IpAddress";
import { toast } from "react-toastify";
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { format } from 'date-fns';
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
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAtom, faBolt, faBoxesPacking, faIdBadge, faHandHoldingHand, faHistory, faList, faList12, faListAlt, faPencil, faPlaneDeparture, faPlus, faPlusCircle, faSearch, faUserCircle, faUsersViewfinder, faRefresh, faFilePdf, faRemove, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
import InviceService from '../services/InviceService';
export default function Common() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState('cha');
  const [parties, setParties] = useState([]);
  const [partyNames, setPartyNames] = useState({});
  const [partyName, setpartyName] = useState('');
  const [importerId, setImporterId] = useState('');
  const [reprentativeId, setreprentativeId] = useState('')
  const [reprentativeArray, setReprentativeArray] = useState([]);
  const [errors, setErrors] = useState({});
  const [ChaParties, setChaParties] = useState('');
  const [externalPartyName, setexternalPartyName] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [printRecordArray, setPrintRecordArray] = useState([]);
  const [removedRecordArray, setRemovedRecordArray] = useState([]);
  const [selectedRepresentativename, setSelectedRepresentativename] = useState('');
  const [representativeList, setRepresentativeList] = useState([]);
  const [representativeId, setRepresentativeID] = useState([]);
  const [paryCHAId, setparyCHAId] = useState([]);
  const [typeName, setTypeName] = useState('');

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {

      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  const {
    userId,
    username,
    branchId,
    companyid,

  } = useContext(AuthContext);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);

  };




  const findExternalPartyByType = async (compid, branchid, Type) => {

    const partyResponse = await Rate_Chart_Service.getExternalUserByTypeForImport(compid, branchid, Type);
    const partyOptions = partyResponse.data.map(externalUser => ({
      value: externalUser.externaluserId,
      label: externalUser.userName
    }));
    return partyOptions;

  };




  useEffect(() => {
    // Extract only the values of serNo or sirNo
    const newPrintRecordArray = searchData.map((item) => item.serNo ? item.serNo : item.sirNo);
    // console.log(newPrintRecordArray);
    setPrintRecordArray(newPrintRecordArray);
  }, [searchData]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const chaparties = await findExternalPartyByType(companyid, branchId, "CHA");
        setChaParties(chaparties);
      } catch (error) {
        console.error('Error fetching external parties:', error);
        // Handle errors as needed
      }
    };

    fetchData(); // Call the fetchData function when the component mounts


  }, []);

  const handleExternalPartyChange = async (selectedOption, { action }) => {
    setpartyName('');
    if (action === 'clear') {
      setpartyName('');
      setexternalPartyName('');
      setImporterId('');

    }
    else {
      setpartyName('');
      handleFilter(selectedOption);
      setTypeName("CHA");
      setparyCHAId(selectedOption.value);
      console.log(selectedOption.value);
      setexternalPartyName(selectedOption ? selectedOption.label : '');
      setImporterId(selectedOption ? selectedOption.value : '')
      getReprentativeByUserId(companyid, branchId, selectedOption ? selectedOption.value : '');
      // await getReprentativeImage(companyid, branchId, importerId, selectedOption ? selectedOption.value : '');
    }
  };

  // handOver to Party or CHA
  const handlePartyChange = async (selectedOption, { action }) => {

    if (action === 'clear') {
      setpartyName('');
      setImporterId('');
      setreprentativeId('');
      setRepresentativeList([]);
    }
    else {
      setpartyName(selectedOption ? selectedOption.label : '')
      handleFilter(selectedOption);
      setparyCHAId(selectedOption.value);
      setRepresentativeID('');

      setTypeName("Party");
      // console.log(paryCHAId);
      setImporterId(selectedOption ? selectedOption.value : '');
      getReprentativeByUserId(companyid, branchId, selectedOption ? selectedOption.value : '');
      // await getReprentativeImage(companyid, branchId, importerId, selectedOption ? selectedOption.value : '');

    }
  };




  const handleFilter = async (selectedOption) => {
    try {
      const response = await axios.get(`http://${ipaddress}represent/representative1/${companyid}/${branchId}/${selectedOption.value}`);
      const userData = response.data;
      setRepresentativeList(userData);

      console.log('userData:', userData);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const nopSum = selectedItems.reduce((accumulator, currentValue) => {
    // Check if currentValue.nop is a number before adding
    const nopValue = parseFloat(currentValue.nop);
    if (!isNaN(nopValue)) {
      return accumulator + nopValue;
    }
    return accumulator;
  }, 0);


  const handleReset1 = () => {
    setSelectedOption("cha");
    handleSearch();
    setSelectedItems([]);
    setRepresentativeID([]);
    setpartyName('');
    setparyCHAId('');
    setRepresentativeID([]);
    setexternalPartyName('');
    handleFilter('hii');
  }


  // const handlePrint = async (type) => {


  //   if (!paryCHAId) {
  //     toast.error("Please Select Party / CHA !!! ", { position: "top-center", autoClose: 2000 });
  //     return;
  //   }

  //   if (!representativeId) {
  //     toast.error("Please Select Representative !!! ", { position: "top-center", autoClose: 2000 });
  //     return;
  //   }

  //   if (selectedItems.length === 0) {
  //     toast.error("Please Select the data !!! ", { position: "top-center", autoClose: 2000 });
  //     return;
  //   }



  //   const dataToSend = {
  //     selectedItems,
  //     paryCHAId,
  //     representativeId,
  //     nopSum

  //   };

  //   try {
  //     const response = await InviceService.getCommonPassPrint(companyid, branchId, type, dataToSend);

  //     // axios.post(`http://${ipaddress}export/common/printgatepass/${companyid}/${branchId}/${type}`, dataToSend)
  //     // toast.success("GatePass PDF Created Successfully ", { position: "top-center", autoClose: 2000 });

  //     // console.log("Response Data");
  //     // console.log(response.data);

  //     if (type === 'PDF') {
  //       const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

  //       // Create a Blob from the Base64 data
  //       const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

  //       // Create a URL for the Blob
  //       const blobUrl = URL.createObjectURL(pdfBlob);

  //       // Create an anchor element for downloading
  //       const downloadLink = document.createElement('a');
  //       downloadLink.href = blobUrl;
  //       downloadLink.download = 'CommonGetPass.pdf'; // Set the filename for the downloaded PDF
  //       downloadLink.style.display = 'none';
  //       document.body.appendChild(downloadLink);
  //       // Trigger the download
  //       downloadLink.click();
  //       // Clean up
  //       document.body.removeChild(downloadLink);
  //       window.URL.revokeObjectURL(blobUrl);

  //       toast.success("Downloading Pdf!", {
  //         position: toast.POSITION.TOP_CENTER,
  //         autoClose: 800,
  //       });
  //       handleReset1();

  //     } if (type === 'PRINT') {
  //       // If the response is HTML, open a new window to display the HTML content
  //       const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

  //       // Create a Blob from the Base64 data
  //       const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

  //       // Create an object URL for the Blob
  //       const blobUrl = URL.createObjectURL(pdfBlob);

  //       // Open a new window and set the PDF content as the source
  //       window.open(blobUrl, '_blank');
  //       handleReset1();
  //     }
  //     else {
  //       throw new Error('Failed to generate PDF');
  //     }

  //     handleSearch();
  //   } catch (error) {
  //   }
  // };



  const handlePrint = async (type) => {
    if (!paryCHAId) {
        toast.error("Please Select Party / CHA !!! ", { position: "top-center", autoClose: 2000 });
        return;
    }

    if (!representativeId) {
        toast.error("Please Select Representative !!! ", { position: "top-center", autoClose: 2000 });
        return;
    }

    if (selectedItems.length === 0) {
        toast.error("Please Select the data !!! ", { position: "top-center", autoClose: 2000 });
        return;
    }

    const dataToSend = {
        selectedItems,
        paryCHAId,
        representativeId,
        nopSum
    };

    try {
        const response = await InviceService.getCommonPassPrint(companyid, branchId, type, dataToSend);
        console.log('typeof(response.data) ',typeof(response.data));
        if (type === 'PDF') {
            if (response.data === 'not generated') {
              toast.error("Gate pass already generated", { position: "top-center", autoClose: 2000 });
              handleReset1();
            } else {
                const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF
                // Create a Blob from the Base64 data
                const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
                // Create a URL for the Blob
                const blobUrl = URL.createObjectURL(pdfBlob);
                // Create an anchor element for downloading
                const downloadLink = document.createElement('a');
                downloadLink.href = blobUrl;
                downloadLink.download = 'CommonGetPass.pdf'; // Set the filename for the downloaded PDF
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
                handleReset1();
            }
        } else if (type === 'PRINT') {
            if (response.data === 'not generated') {
              toast.error("Gate pass already generated", { position: "top-center", autoClose: 2000 });
              handleReset1();
            } else {
                const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF
                // Create a Blob from the Base64 data
                const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
                // Create an object URL for the Blob
                const blobUrl = URL.createObjectURL(pdfBlob);
                // Open a new window and set the PDF content as the source
                window.open(blobUrl, '_blank');
                handleReset1();
            }
        } else {
            throw new Error('Invalid print type');
        }

       // handleSearch();
    } catch (error) {
        console.error(error);
        toast.error("Gate pass already generated", { position: "top-center", autoClose: 2000 });
        handleReset1();
    }
};




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

    } catch (error) {
    }
  };


  useEffect(() => {
    fetchPartyNames();
  }, [companyid, branchId])

  const formatedDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const formatDate = (inputDate, setTimeTo) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = setTimeTo === "start" ? "00" : "23";
    const minutes = setTimeTo === "start" ? "00" : "59";
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const formattedStartDate = formatDate(startDate, "start");



  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDateToSend = (date) => {
    return format(date, 'yyyy-MM-dd');
  };

  // const handleSearch = async () => {


  //   if(!startDate)
  //   {
  //     toast.error("Please Select Date !!! ", { position: "top-center", autoClose: 2000 });
  //     return;
  //   }

  //   setSearchData([]);
  //   setIsLoading(true);
  //   setError(null);
  //   setRemovedRecordArray([]);
  //   const requestData = new FormData();
  //   console.log(representativeId);
  //   console.log(paryCHAId);


  //   if (paryCHAId.length !== 0 && representativeId.length !== 0 && formattedStartDate) {
  //     requestData.append('formattedStartDate', formatDateToSend(startDate));
  //     requestData.append('representativeId', representativeId);
  //     requestData.append('paryCHAId', paryCHAId);

  //     // console.log("Party Id"+paryCHAId);
  //     try {
  //       const response = await axios.post(`http://${ipaddress}importmain/commongatepass/search/${companyid}/${branchId}`, requestData)

  //       console.log("Data Received ");

  //       console.log(response.data);

  //       if (Array.isArray(response.data)) {
  //         setSearchData(response.data);
  //       } else {
  //         // setSearchData([]); // Wrap non-array data in an array
  //         toast.error("GatePass PDF Created Successfully ", { position: "top-center", autoClose: 2000 });
  //       }
  //     }

  //     catch (error) {
  //       setError(error.message || 'An error occurred');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   else {
  //     toast.error("Please select Date , Party / CHA & Representative !!", { position: "top-center", autoClose: 2000 });
  //   }


  // };


  const handleSearch = async () => {


    if (!startDate) {
      toast.error("Please Select Date !!! ", { position: "top-center", autoClose: 2000 });
      return;
    }



    setSearchData([]);
    setIsLoading(true);
    setError(null);
    setRemovedRecordArray([]);
    const requestData = new FormData();


    requestData.append('formattedStartDate', formatDateToSend(startDate));

    try {
      const response = await axios.post(`http://${ipaddress}importmain/commongatepass/search/${companyid}/${branchId}`, requestData)

      console.log("Searched with " + startDate);
      console.log("Data Received ");
      console.log("requestData  ");
      console.log(requestData);

      console.log(response.data);

      if (Array.isArray(response.data)) {
        setSearchData(response.data);
      } else {
        // setSearchData([]); // Wrap non-array data in an array
        toast.error("GatePass PDF Created Successfully ", { position: "top-center", autoClose: 2000 });
      }
    }

    catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }



  };

  useEffect(() => {
    handleSearch();
  }, [])


  const handleReset = async () => {
    // setSearchData([]);
    setRemovedRecordArray([]);
    setpartyName(null);
    setexternalPartyName(''); // Clear the input field for CHA
    //  setStartDate(new Date());
    setRepresentativeList([]);
    setSelectedOption('cha');
  };


  const handleRemove = (item) => {
    console.log(searchData);

    const updatedArray = searchData.filter((searchItem) => searchItem !== item);
    const removedNumber = item.requestId || item.hawb;
    setRemovedRecordArray(prevArray => [...prevArray, removedNumber]);
    setSearchData(updatedArray);
    if (item.serNo) {
      toast.success("SER Number " + item.serNo + " Removed Successfully.", { position: "top-center", autoClose: 2000 });
    }
    else if (item.sirNo) {
      toast.success("SIR Number  " + item.sirNo + " Removed Successfully.", { position: "top-center", autoClose: 2000 });
    }

    if (updatedArray.length === 0 || updatedArray === null) {
      setSearchData([]);
    }
    console.log(removedRecordArray);
  };


  const handlePDF = async () => {

    const requestData = new FormData();

    requestData.append('printRecordArray', printRecordArray);
    requestData.append('removedRecordArray', removedRecordArray);
    requestData.append('formattedStartDate', formattedStartDate);
    requestData.append('representativeId', representativeId);
    requestData.append('paryCHAId', paryCHAId);
    requestData.append('typeName', typeName);
    try {
      const response = await axios.post(`http://${ipaddress}importmain/common/printgatepass/${companyid}/${branchId}`, requestData)


      if (response.status === 200) {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'common_gatepass.pdf'; // Set the filename for the downloaded PDF
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

      } else {
        throw new Error('Failed to generate PDF');
      }
    } catch (error) {
    }
  };
  const areAllItemsSelected = () => {
    // Check if all items in `searchData` are present in `selectedItems`
    return searchData.every(item => selectedItems.some(selected => selected.sirNo === item.sirNo));
  };


  useEffect(() => {
    setSelectAll(selectedItems.length === searchData.length);
  }, [selectedItems, searchData]);

  const handleSelectAllToggle = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...searchData]);
    }
    setSelectAll(!selectAll);
  };


  // console.log("SELECTED ITEMS ");
  // console.log("SELECTED ITEMS "+selectedItems);
  const handleRowCheckboxChange = (index) => {
    const selectedItem = searchData[index];

    if (selectedItem) {
      const selectedIndex = selectedItems.findIndex(item => item.sirNo === selectedItem.sirNo);

      if (selectedIndex !== -1) {
        const updatedSelectedItems = [...selectedItems];
        updatedSelectedItems.splice(selectedIndex, 1);
        setSelectedItems(updatedSelectedItems);
      } else {
        setSelectedItems([...selectedItems, selectedItem]);
      }
    }

    // Update selectAll based on all items being selected
    setSelectAll(areAllItemsSelected());
  };




















  const getReprentativeByUserId = async (companyid, branchId, userID) => {
    const result = await Rate_Chart_Service.getReprentativeByCompIdBranchIdUserId(companyid, branchId, userID);
    const cartingsRepresentative = result.data.map(res => ({

      value: res.representativeId,
      label: `${res.firstName} ${res.middleName ? res.middleName.charAt(0) + ' ' : ''}${res.lastName}`
    }));
    setReprentativeArray(cartingsRepresentative);
  };


  const [isModalOpenforupdate, setIsModalOpenforupdate] = useState(false);











  //print

  const [searchbydate, setSearchBydate] = useState(
    {
      searchDate: new Date()
    }
  )

  const handleDateChange = (date) => {
    setSearchBydate({
      ...searchbydate,
      searchDate: date,
    });
  };
  const convertToFormattedDate = (inputDate) => {
    const dateObject = new Date(inputDate);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };


  const [gatepassdata, setGatepassdata] = useState([]);

  const searchData1 = () => {
    console.log("*******Searching **********");

    axios.get(`http://${ipaddress}importmain/getallcommondata/${convertToFormattedDate(searchbydate.searchDate)}/${companyid}/${branchId}`)
      .then((response) => {
        setGatepassdata(response.data);
        console.log('MOP data ', response.data);
        if (response.data.length > 0) {
          toast.success("Data found successfully", {
            autoClose: 700
          })
        }
        else {
          toast.error("Data not found", {
            autoClose: 700
          })
        }
      }

      )
      .catch((error) => {
        if (error) {
          toast.error("Data not found", {
            autoClose: 700
          })
        }
      }

      )
  }


  const handleClear = () => {
    setSearchBydate(
      {
        searchDate: new Date()
      }
    )
    setGatepassdata([]);
  }



  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (selectedTab) => {
    // Check if the selected tab is the second tab, then call searchData1
    if (selectedTab === "home1") {
      searchData1();
    }

    // Update the active tab
    setActiveTab(selectedTab);
  };


  const printGetPass1 = async (type, mopdata) => {


    try {
      const response = await InviceService.getCommonPassPrint1(companyid, branchId, mopdata);

      // axios.post(`http://${ipaddress}export/common/printgatepass/${companyid}/${branchId}/${type}`, dataToSend)
      // toast.success("GatePass PDF Created Successfully ", { position: "top-center", autoClose: 2000 });

      // console.log("Response Data");
      // console.log(response.data);

      if (type === 'PDF') {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'CommonGetPass.pdf'; // Set the filename for the downloaded PDF
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

      } if (type === 'PRINT') {
        // If the response is HTML, open a new window to display the HTML content
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        // Create an object URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Open a new window and set the PDF content as the source
        window.open(blobUrl, '_blank');
      }
      else {
        throw new Error('Failed to generate PDF');
      }


    } catch (error) {
    }



  };
  return (
    <div className='Container'>
      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
        icon={faIdBadge}
        style={{
          marginRight: '8px',
          color: 'black', // Set the color to golden
        }}
      />Gate Pass Common</h5>
      <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
        activeKey={activeTab} onSelect={handleTabChange}
      >

        <Tab eventKey="home" title="Generate">
          <Card style={{ backgroundColor: "#F8F8F8" }}>
            <CardBody>
              <Row>
                {/* <Col md={3}>
                  <FormGroup>
                    <Label className="forlabel" for="branchId">Date <span style={{ color: 'red' }}>*</span></Label>
                    <div className="input-group">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy" // You can customize the date format
                        name="startDate"
                        required
                        className="form-control border-right-0 inputField"
                        customInput={<input style={{ width: "18vw" }} />}
                      />
                    </div>
                  </FormGroup>
                </Col> */}
                <Col md={3} style={{ marginTop: 30 }}>
                  <div className="mt-2 text-center">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input radios"
                        type="radio"
                        name="partyChaOption"
                        id="partyRadio"
                        value="party"
                        checked={selectedOption === 'party'}
                        onChange={handleOptionChange}
                      />
                      <label className="forlabel" htmlFor="partyRadio">
                        Party
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input radios"
                        type="radio"
                        name="partyChaOption"
                        id="chaRadio"
                        value="cha"
                        checked={selectedOption === 'cha'}
                        onChange={handleOptionChange}
                      />
                      <label className="forlabel" htmlFor="chaRadio">
                        CHA
                      </label>
                    </div>
                  </div>
                </Col>




                <Col md={3} style={{ marginTop: 15 }}>

                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className={`tab-pane fade ${selectedOption === 'party' ? 'show active' : ''}`}
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <Row className="mt-3">
                        <Col md={12}>
                          <FormGroup>
                            <Select
                              options={parties}
                              value={{ value: partyName, label: partyName }}
                              onChange={handlePartyChange}
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
                          </FormGroup>
                        </Col>

                      </Row>


                    </div>
                    <div
                      className={`tab-pane fade ${selectedOption === 'cha' ? 'show active' : ''}`}
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >

                      <Row className="mt-3">
                        <Col md={12}>
                          <FormGroup>
                            <Select
                              options={ChaParties}
                              value={{ value: externalPartyName, label: externalPartyName }}
                              onChange={handleExternalPartyChange}
                              className={errors.externalPartyName ? 'error-border' : ''}
                              isClearable
                              styles={{
                                control: (provided, state) => ({
                                  ...provided,
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
                          </FormGroup>
                        </Col>

                      </Row>
                    </div>
                  </div>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label className="forlabel" for="representative"> Select Representative </Label>

                    <Input
                      type="select"
                      name="representative"
                      id="representative"
                      onChange={(e) => setRepresentativeID(e.target.value)}
                    >
                      <option value="">Select Representative</option>
                      {representativeList.map((cm, index) => (
                        <option value={cm.representativeId} key={index}>
                          {cm.firstName + " " + cm.lastName}
                        </option>
                      ))}
                    </Input>

                  </FormGroup>
                </Col>

                {/* onClick={(e) => handleSubmitExternalPartySearch(importerId)} */}
                <Col style={{ marginTop: 21 }} md={3}>

                  <Button type="button" onClick={handleReset} className="" variant="outline-danger" style={{ marginTop: '10px' }}>
                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                    Reset
                  </Button>

                  <Button type="button" onClick={() => { handleSearch(); handleReset(); }} className="" variant="outline-primary" style={{ marginTop: '10px', marginLeft: '5px' }}>
                    <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                    Refresh
                  </Button>

                </Col>
              </Row>


            </CardBody>
          </Card>
          <Card style={{ marginTop: 25 }}>
            <CardBody>
              <Row>
                <Col md={3}>


                </Col>
                <Col md={3}>

                </Col>
                <Col md={3} className='text-center ' style={{ marginTop: '30px' }}  >
                  {/* <Button type="button"  className="" style={{ marginRight: 10 }} variant="outline-primary"  >
                  <FontAwesomeIcon icon={faBolt} style={{ marginRight: '5px' }} />
                  Generate GatePass
                </Button> */}

                </Col>
                <Col md={3} className='text-center' style={{ marginTop: '10px' }} >

                  <Button type="button" onClick={() => handlePrint("PRINT")} disabled={paryCHAId.length === 0 || searchData.length == 0 || representativeId.length === 0 || !formattedStartDate} className="" style={{ marginRight: 10 }} variant="outline-success" >
                    <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                    Print
                  </Button>

                  <Button type="button" onClick={() => handlePrint("PDF")} disabled={paryCHAId.length === 0 || searchData.length == 0 || representativeId.length === 0 || !formattedStartDate} className="" variant="outline-primary" >
                    <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />
                    PDF
                  </Button>
                </Col>
              </Row>
              <Table style={{ marginTop: '20px' }} striped responsive bordered>

                <thead>
                  <tr className="text-center">
                    <th style={{ background: '#BADDDA' }}>Sr.No</th>
                    <th style={{ background: '#BADDDA' }}>SIR No. / SER No.</th>
                    <th style={{ background: '#BADDDA' }}>HAWB No. / Request Id No.</th>
                    <th style={{ background: '#BADDDA' }}>Packages</th>
                    <th style={{ background: '#BADDDA' }}>Name of Unit</th>
                    <th style={{ background: '#BADDDA' }}><Input
                      className="form-check-input radios"
                      type="checkbox"
                      style={{ width: '1.2vw', height: '1.2vw' }}
                      name="taxApplicable"
                      checked={selectAll}
                      onChange={() => handleSelectAllToggle()}
                    /></th>

                  </tr>
                </thead>

                <tbody>
                  {searchData.map((data, index) => (
                    <tr key={index} className="text-center">
                      <td>{index + 1}</td>
                      <td>{data.sirNo}</td>
                      <td>{data.hawb.startsWith('000') ? '' : data.hawb}</td>
                      <td>{data.nop}</td>
                      <td>{data.importerId}</td>
                      <td className="text-center d-grid gap-2 d-md-block ">
                        <td className="text-center d-grid gap-2 d-md-block">
                          <Input
                            className="form-check-input radios"
                            type="checkbox"
                            style={{ width: '1.2vw', height: '1.2vw' }}
                            name="taxApplicable"
                            checked={selectedItems.some((item) => item.sirNo === data.sirNo)}
                            onChange={() => handleRowCheckboxChange(index)}
                          />
                        </td>

                      </td>
                    </tr>
                  ))}
                </tbody>

              </Table>
            </CardBody>
          </Card>
        </Tab>
        <Tab eventKey="home1" title="Print">
          <Row>
            <Col md={4}>
              <FormGroup>
                <label className="forlabel" htmlFor="startDate">
                  Select Date
                </label>
                <DatePicker
                  selected={searchbydate.searchDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control border-right-0 inputField"
                  customInput={<input style={{ width: '100%' }} />}
                  wrapperClassName="custom-react-datepicker-wrapper"
                />
              </FormGroup>
            </Col>
            <Col style={{ marginTop: 14 }}>
              <Button type="button" className="" onClick={searchData1} variant="outline-success" style={{ marginTop: '10px', marginRight: '5px' }}>
                <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                Search
              </Button>
              <Button type="button" className="" onClick={handleClear} variant="outline-primary" style={{ marginTop: '10px' }}>
                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                Reset
              </Button>
            </Col>
          </Row>

          {gatepassdata.length > 0 && (
            <Table style={{ marginTop: '20px' }} striped responsive bordered>

              <thead>
                <tr className="text-center">
                  <th style={{ background: '#BADDDA' }}>Sr.No</th>
                  <th style={{ background: '#BADDDA' }}>Gate Pass Id</th>
                  <th style={{ background: '#BADDDA' }}>Party / CHA Name</th>
                  <th style={{ background: '#BADDDA' }}>Receiver Name</th>

                  <th style={{ background: '#BADDDA' }}>Action</th>


                </tr>
              </thead>
              <tbody>
                {gatepassdata.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td>{index + 1}</td>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>


                    <td className="text-center d-grid gap-2 d-md-block ">
                      <Button
                        type="button"
                        variant="outline-success"
                        onClick={() => printGetPass1('PRINT', item[0])}

                        style={{ marginRight: '5px', marginBottom: '12px' }}
                      >
                        <FontAwesomeIcon icon={faPrint} style={{ marginRight: 'px' }} />
                        Print
                      </Button>
                      <Button
                        type="button"
                        variant="outline-primary"
                        onClick={() => printGetPass1('PDF', item[0])}

                        style={{ marginRight: '5px', marginBottom: '12px' }}
                      >
                        <FontAwesomeIcon icon={faDownload} style={{ marginRight: 'px' }} />
                        Download
                      </Button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )

          }
        </Tab>


      </Tabs>


    </div>
  )
}



