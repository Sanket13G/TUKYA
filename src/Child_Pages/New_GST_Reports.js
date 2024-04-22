import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import "../Components/Style.css";
import DatePicker from "react-datepicker";
import ipaddress from "../Components/IpAddress";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAtom,
  faBolt,
  faBoxesPacking,
  faIdBadge,
  faHandHoldingHand,
  faHistory,
  faList,
  faList12,
  faListAlt,
  faPencil,
  faPlaneDeparture,
  faPlus,
  faPlusCircle,
  faSearch,
  faUserCircle,
  faUsersViewfinder,
  faFileAlt,
  faEye,
  faRefresh,
  faFilePdf,
  faFileExcel,
  faArrowsToEye,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  faCheck,
  faSave,
  faTimes,
  faSyncAlt,
  faCancel,
  faCog,
  faPrint,
  faXmark,
  faFileLines,
  faChessKing,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

export default function New_GST_Reports() {
  const navigate = useNavigate();
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
  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  const [partyNameToIdMap, setPartyNameToIdMap] = useState({});
  const [selectedParty, setSelectedParty] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [partys, setPartys] = useState([]);
  const [getpartyId, setGetpartyId] = useState({});
  const [partyTypes, setPartyTypes] = useState([]);
  const [selectedPartyType, setSelectedPartyType] = useState("");
  const [invoiceDataParty, setInvoiceDataParty] = useState([]);
  const [invoicePartyDataTable, setInvoicePartyDataTable] = useState(false);
  const [invoiceAllData, setInvoiceAllData] = useState([]);
  const [invoiceAllDataTable, setInvoiceAllDataTable] = useState(false);
  const [getpartyEmail, setGetpartyEmail] = useState({});
  const [getpartyGstNo, setGetpartyGstNo] = useState({});
  const [gstRateMap, setGstRateMap] = useState({});
  const [invoiceDataPartyType, setInvoiceDataPartyType] = useState([]);
  const [invoicePartyTypeDataTable, setInvoicePartyTypeDataTable] =
    useState(false);
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

  const formatDate1 = (inputDate, setTimeTo) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = setTimeTo === "start" ? "00" : "23";
    const minutes = setTimeTo === "start" ? "00" : "59";
    return `${year}-${month}-${day}`;
  };

  const formattedStartDate = formatDate(startDate, "start");
  const formattedEndDate = formatDate(endDate, "end");

  const fetchPartyNames = async () => {
    try {
      const response = await fetch(
        `http://${ipaddress}parties/getAll/${companyid}/${branchId}`
      );
      const data = await response.json();
      const namesMap = {};
      const emailMap = {};
      const gstNoMap = {};
      const gstRateMap = {};
      data.forEach((party) => {
        namesMap[party.partyId] = party.partyName;
        emailMap[party.partyId] = party.email; // Store email
        gstNoMap[party.partyId] = party.gstNo;

        if (party.taxApplicable === "Y") {
          // 18% GST Rate for applicable parties
          gstRateMap[party.partyId] = "18";
        } else {
          // 0% GST Rate for non-applicable parties
          gstRateMap[party.partyId] = "0";
        }
      });

      setGetpartyId(namesMap);
      setPartys(data);
      setPartyNameToIdMap(namesMap);
      setGetpartyEmail(emailMap); // Set email map
      setGetpartyGstNo(gstNoMap); //
      setGstRateMap(gstRateMap);
    } catch (error) {
      console.error("Error fetching party names:", error);
    }
  };

  const fetchPartyTypes = async () => {
    try {
      const response = await fetch(
        `http://${ipaddress}parties/getAll/${companyid}/${branchId}`
      );
      const data = await response.json();

      // Extract party types from the data
      const partyTypes = Array.from(
        new Set(data.map((party) => party.unitType))
      );
      const namesMapT = {};
      const emailMapT = {};
      const gstNoMapT = {};
      const gstRateMapT = {};

      data.forEach((party) => {
        namesMapT[party.partyId] = party.partyName;
        emailMapT[party.partyId] = party.email; // Store email
        gstNoMapT[party.partyId] = party.gstNo;

        if (party.taxApplicable === "Y") {
          // 18% GST Rate for applicable parties
          gstRateMap[party.partyId] = "18";
        } else {
          // 0% GST Rate for non-applicable parties
          gstRateMap[party.partyId] = "0";
        }
      });

      // Set the party types and names in state
      setPartyTypes(partyTypes);
      setPartys(data);
    } catch (error) {
      console.error("Error fetching party names:", error);
    }
  };

  useEffect(() => {
    fetchPartyNames();
  }, []);

  useEffect(() => {
    fetchPartyTypes();
  }, []);


  const [selectedPartyGstNo, setSelectedPartyGstNo] = useState(""); // Add this line
  const [selectedPartyEmail, setSelectedPartyEmail] = useState(""); // Add this line
  const [gstRate, setGstRate] = useState(0);
  const [filteredPartyData, setFilteredPartyData] = useState([]);

  const handlePartyChange = (event) => {
    const selectedPartyName = event.target.value;
    setSelectedParty(selectedPartyName);

    if (selectedPartyName === "") {
      // Handle the case when "Select" is chosen, and no party is selected.
      // You can set default values or perform any other necessary actions here.
      // setInvoiceAllDataTable(true);
      setGstRate(0); // Set the GST rate to 0 or another default value.
      setSelectedPartyGstNo(""); // Set GST Number to an empty string or another default value.
      setSelectedPartyEmail(""); // Set Email to an empty string or another default value.
    } else {
      const selectedParty = partys.find(
        (party) => party.partyId === selectedPartyName
      );

      if (selectedParty) {
        // Access the properties of the selected party.
        const gstRate = selectedParty.taxApplicable === "Y" ? 18 : 0;
        setGstRate(gstRate);
        setSelectedPartyGstNo(selectedParty.gstNo);
        setSelectedPartyEmail(selectedParty.email);
        setInvoiceAllDataTable(false);
        setInvoicePartyTypeDataTable(false);
        setInvoicePartyDataTable(false);
        setInvoiceDataParty([]);
        setSelectedPartyType("");
      } else {
        setGstRate(0); // Set the GST rate to 0 or another default value.
        setSelectedPartyGstNo(""); // Set GST Number to an empty string or another default value.
        setSelectedPartyEmail(""); // Set Email to an empty string or another default value.
      }
    }
  };

  const handlePartyType = (event) => {
    const SelectedPartyType = event.target.value;

    const filteredData = invoiceDataPartyType.filter(
      (party) => party.unitType === SelectedPartyType
    );

    setFilteredPartyData(filteredData);
    setSelectedPartyType(SelectedPartyType);
    setInvoicePartyDataTable(false);
    setInvoiceAllDataTable(false);
    setSelectedParty("");
  };

  const handleReset = () => {
    setSelectedParty("");
    setSelectedParty("");
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedPartyType("");
    setInvoicePartyDataTable(false);
    setInvoicePartyTypeDataTable(false);
    // setInvoiceDataParty([]);
    setInvoiceAllDataTable(false);
    // setInvoiceAllData([]);
  };

  const fetchInvoiceDataOfParty = () => {
    if(!startDate){
      toast.error("Start date is required",{
        autoClose:800
      })
      return;
    }

    if(!endDate){
      toast.error("End date is required",{
        autoClose:800
      })
      return;
    }
    if (selectedParty) {
      // Make an API request here to fetch the list of airline names based on the provided criteria
      axios.get(
        `http://${ipaddress}Invoice/SHBNewGstInvoiceAllDataOfParty?companyId=${companyid}&branchId=${branchId}&startDate=${formatDateNew(startDate)}&endDate=${formatDateNew(endDate)}&partyId=${selectedParty}`
      )
       
        .then((response) => {
          const data = response.data;
          if (Array.isArray(data) && data.length > 0) {
           
            setInvoiceAllDataTable(true);
         
            setInvoiceAllData(data);
         
         
            toast.success("Data Found Successfully", {
              autoClose: 900,
              position: "top-center",
            });
          } else {

            toast.error("Data Not Found", {
              autoClose: 900,
              position: "top-center",
            });
            setInvoicePartyDataTable(false);
            setInvoiceAllData([]);
            setInvoiceAllDataTable(false);
            setInvoicePartyTypeDataTable(false);
            setInvoiceDataPartyType([]);
          }
        })
        .catch((error) => { });
    }
  };

  const formatDateNew = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchAllInvoiceData = () => {
    if(!startDate){
      toast.error("Start date is required",{
        autoClose:800
      })
      return;
    }

    if(!endDate){
      toast.error("End date is required",{
        autoClose:800
      })
      return;
    }
    axios.get(
      `http://${ipaddress}Invoice/SHBNewGstInvoiceAllDataOfParty?companyId=${companyid}&branchId=${branchId}&startDate=${formatDateNew(startDate)}&endDate=${formatDateNew(endDate)}`
    )
    .then((response) => {
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
       
        setInvoiceAllDataTable(true);
     
        setInvoiceAllData(data);
     
     
        toast.success("Data Found Successfully", {
          autoClose: 900,
          position: "top-center",
        });
      } else {

        toast.error("Data Not Found", {
          autoClose: 900,
          position: "top-center",
        });
        setInvoicePartyDataTable(false);
        setInvoiceAllData([]);
        setInvoiceAllDataTable(false);
        setInvoicePartyTypeDataTable(false);
        setInvoiceDataPartyType([]);
      }
    })
    .catch((error) => { });
  };
  const fetchInvoiceDataOfPartyType = () => {
    // if (selectedPartyType) {
    // Make an API request here to fetch the list of airline names based on the provided criteria
    console.log('sekskfj ', selectedPartyType);
    fetch(
      `http://${ipaddress}Invoice/invoiceDataOfPartyType?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&unitType=${selectedPartyType}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Update the 'airlines' state with the fetched data
          setInvoiceDataPartyType(data);
          console.log("Invoice Data Of Particular Party", data);
          setInvoicePartyTypeDataTable(true);
          setInvoicePartyDataTable(false);
          setInvoiceAllDataTable(false);
          setInvoiceAllData([]);
          setInvoiceDataParty([]);
          toast.success("Invoice Data Found", {
            autoClose: 900,
            position: "top-center",
          });
        } else {
          console.error("API response is not an array:", data);
          toast.error("Invoice Data Not Found", {
            autoClose: 900,
            position: "top-center",
          });
          setInvoicePartyDataTable(false);
          setInvoiceAllData([]);
          setInvoiceDataParty([]);
          setInvoiceAllDataTable(false);
          setInvoicePartyTypeDataTable(false);
        }
      })
      .catch((error) => { });
    // }
  };

  // useEffect(() => {
  //   if (selectedPartyType) {
  //     fetchInvoiceDataOfPartyType();
  //   }
  // }, [selectedPartyType]);

  const handleShow = () => {
   
    if (startDate && endDate && !selectedParty) {
      fetchAllInvoiceData();
    } else if (startDate && endDate && selectedParty) {
      fetchInvoiceDataOfParty();
    }
  };


 

  const totalAllInvoiceAmount = invoiceAllData.reduce(
    (total, item) => total + item[4],
    0
  );
  const totalAllTaxAmount = invoiceAllData.reduce(
    (total, item) => total + item[6],
    0
  );
  const totalAllTaxableAmount = invoiceAllData.reduce(
    (total, item) => total + item[7],
    0
  );

 

  const handlePdf = async () => {
    try {
      const response = await axios.post(
        `http://${ipaddress}Invoice/newGstPrint?companyId=${companyid}&branchId=${branchId}&startDate=${formatDateNew(startDate)}&endDate=${formatDateNew(endDate)}&partyId=${selectedParty}`
      );
      // toast.success("GST Summary PDF Created Successfully ", { position: "top-center" ,autoClose: 900});

      if (response.status === 200) {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob(
          [Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0))],
          { type: "application/pdf" }
        );

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = "new_gst_party_report.pdf"; // Set the filename for the downloaded PDF
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        // Trigger the download
        downloadLink.click();

        // Clean up
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(blobUrl);

        toast.success("Downloaded GST Summary PDF Successfully !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 900,
        });
      } else {
        throw new Error("Failed to generate PDF");
      }
    } catch (error) { }
  };

  const handlePrint = async () => {
    try {
      const response = await axios.post(
        `http://${ipaddress}Invoice/newGstPrint?companyId=${companyid}&branchId=${branchId}&startDate=${formatDateNew(startDate)}&endDate=${formatDateNew(endDate)}&partyId=${selectedParty}`
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
          <title>new_gst_party_report Viewer</title>
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

  const handlePrintAllInvoiceData = async () => {
    try {
      const response = await axios.post(
        `http://${ipaddress}Invoice/invoicPrintOfAllNewGstParty?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
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
          <title>new_gst_report Viewer</title>
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

  const handlePdfAllInvoiceData = async () => {
    try {
      const response = await axios.post(
        `http://${ipaddress}Invoice/invoicPrintOfAllNewGstParty?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
      // toast.success("GST Summary PDF Created Successfully ", { position: "top-center" ,autoClose: 900});

      if (response.status === 200) {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob(
          [Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0))],
          { type: "application/pdf" }
        );

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = "new_gst_all_report.pdf"; // Set the filename for the downloaded PDF
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        // Trigger the download
        downloadLink.click();

        // Clean up
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(blobUrl);

        toast.success("Downloaded GST Summary PDF Successfully !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 900,
        });
      } else {
        throw new Error("Failed to generate PDF");
      }
    } catch (error) { }
  };

  const handlePrintInvoiceDataByPartyType = async () => {
    try {
      const response = await axios.post(
        `http://${ipaddress}Invoice/invoicePrintOfNewGstReportPartyType?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&unitType=${selectedPartyType}`
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
          <title>new_gst_unityType_report Viewer</title>
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
  const handlePdfInvoiceDataByPartyType = async () => {
    try {
      const response = await axios.post(
        `http://${ipaddress}Invoice/invoicePrintOfNewGstReportPartyType?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&unitType=${selectedPartyType}`
      );
      // toast.success("GST Summary PDF Created Successfully ", { position: "top-center" ,autoClose: 900});

      if (response.status === 200) {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob(
          [Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0))],
          { type: "application/pdf" }
        );

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = "new_gst_unityType_report.pdf"; // Set the filename for the downloaded PDF
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        // Trigger the download
        downloadLink.click();

        // Clean up
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(blobUrl);

        toast.success("Downloaded GST Summary PDF Successfully !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 900,
        });
      } else {
        throw new Error("Failed to generate PDF");
      }
    } catch (error) { }
  };
  let totalIgst = 0;
  let totalCgst = 0;
  let totalSgst = 0;

  // Loop through your items
  for (const item of invoiceDataParty) {
    if (item.igst === "Y") {
      totalIgst += item.taxAmount;
    } else {
      totalCgst += item.taxAmount / 2;
      totalSgst += item.taxAmount / 2;
    }
  }

  // const getExcel = (id) => {
  //   const filename = `New_GST_Report.xlsx`;
  //   axios.post(`http://${ipaddress}Invoice/gstReport?start=${formatDate1(startDate)}&end=${formatDate1(endDate)}&companyid=${companyid}&branchId=${branchId}&party=${selectedParty}&partytype=${selectedPartyType}`, { responseType: 'blob' })
  //     .then(async (response) => {
  //       const blob = new Blob([response.data], { type: response.headers['content-type'] });
  
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = filename;
  //       document.body.appendChild(a);
  //       a.click();
  
  //       window.URL.revokeObjectURL(url);
  //       document.body.removeChild(a);
  //     })
  //     .catch((error) => {
  //       toast.error("Something went wrong", {
  //         autoClose: 700
  //       });
  //     });
  // };

  const getExcel = async() => {
  

      try {

        const filename = `New_GST_Report.xlsx`;
    
        const headers = {
          headers: {
            Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
          responseType: 'blob',
        };
    
        const response = await axios.post(`http://${ipaddress}Invoice/SHBGstReport?companyId=${companyid}&branchId=${branchId}&startDate=${formatDateNew(startDate)}&endDate=${formatDateNew(endDate)}&partyId=${selectedParty}`, null, headers);
    
        const url = window.URL.createObjectURL(new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        // Clean up
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading XLSX: ", error);
        toast.error("Something went wrong", {
          autoClose: 700,
        });
      }
  };
  
  

  return (
    <div className="Container">
      <h5
        className="pageHead"
        style={{
          fontFamily: "Your-Heading-Font",
          paddingLeft: "2%",
          paddingRight: "-20px",
        }}
      >
        {" "}
        <FontAwesomeIcon
          icon={faFileAlt}
          style={{
            marginRight: "8px",
            color: "black", // Set the color to golden
          }}
        />
        New GST Report
      </h5>

      <Card>
        <CardBody>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Label className="forlabel" for="branchId">
                  Bill Date From <span style={{ color: "red" }}>*</span>
                </Label>
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
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="forlabel" for="branchId">
                  Bill Date To<span style={{ color: "red" }}>*</span>
                </Label>
                <div className="input-group">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd/MM/yyyy" // You can customize the date format
                    name="endDate"
                    required
                    className="form-control border-right-0 inputField"
                    customInput={<input style={{ width: "18vw" }} />}
                  />
                </div>{" "}
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <label htmlFor="company" className="inputhead">
                  Select Party
                </label>
                <select
                  name="company"
                  id="dw1"
                  className=""
                  onChange={handlePartyChange}
                  value={selectedParty}
                >
                  <option value="">Select</option>
                  {partys.map((party) => (
                    <option key={party.partyId} value={party.partyId}>
                      {party.partyName}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>
            {/* <Col md={3}>
              <FormGroup>
                <label htmlFor="company" className="inputhead">
                  Select Party Type
                </label>
                <select
                  name="company"
                  id="dw1"
                  required
                  onChange={handlePartyType}
                  value={selectedPartyType}
                >
                  <option value="">Select Party Type</option>
                  {partyTypes.map((partyType) => (
                    <option key={partyType} value={partyType}>
                      {partyType}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col> */}
          </Row>
          <Row>
            <Col md={4}>
              <Button
                type="button"
                className=""
                variant="outline-success"
                style={{ marginTop: "10px", marginRight: 10 }}
                onClick={handleShow}
              >
                <FontAwesomeIcon
                  icon={faArrowsToEye}
                  style={{ marginRight: "5px" }}
                />
                Show
              </Button>
              <Button
                type="button"
                className=""
                variant="outline-danger"
                style={{ marginTop: "10px" }}
                onClick={handleReset}
              >
                <FontAwesomeIcon
                  icon={faRefresh}
                  style={{ marginRight: "5px" }}
                />
                Reset
              </Button>


            </Col>
          </Row>
        </CardBody>
      </Card>
      {invoiceAllDataTable ? (
        <Card style={{ marginTop: 30 }}>
          <CardBody>
            <div>
              <Row>
                <Col className="text-end">
                  <Button
                    type="button"
                    className="outline-success" // Add a class for styling
                    style={{ marginRight: 10 }}
                    variant="outline-success"
                    onClick={handlePrint}
                  >
                    <FontAwesomeIcon
                      icon={faPrint}
                      style={{ marginRight: "5px" }}
                    />
                    Print
                  </Button>

                  <Button
                    type="button"
                    style={{ marginRight: 10 }}
                    variant="outline-primary"
                    className="outline-primary" // Add a class for styling
                    onClick={handlePdf}
                  >
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      style={{ marginRight: "5px" }}
                    />
                    PDF
                  </Button>
                  <Button
                    type="button"
                    className=""
                    variant="outline-success"
                    
                    onClick={()=>getExcel()}
                  >
                    <FontAwesomeIcon
                      icon={faFileExcel}
                      style={{ marginRight: "5px" }}
                    />
                    XLS
                  </Button>
                </Col>
              </Row>
            </div>
            <div className="table-responsive">
              <Table
                style={{ marginTop: 9 }}
                className="table table-striped table-hover"
              >
                <thead>
                  <tr>
                    <th style={{ background: "#BADDDA", textAlign: 'center' }}>Sr. No</th>
                    <th style={{ background: "#BADDDA", textAlign: 'center' }}>Party Name</th>
                    <th style={{ background: "#BADDDA", textAlign: 'center' }}>GSTIN Of Party</th>
                    <th style={{ background: "#BADDDA", textAlign: 'center' }}>Invoice No</th>
                    <th style={{ background: "#BADDDA", textAlign: 'center' }}>Invoice Date</th>
                    <th style={{ background: "#BADDDA", textAlign: 'center' }}>
                      Total Invoice Value
                    </th>
                    <th style={{ background: "#BADDDA", textAlign: 'center' }}>GST Rate</th>
                    <th style={{ background: "#BADDDA", textAlign: 'center' }}>GST Amount </th>
                    <th style={{ background: "#BADDDA", textAlign: 'center' }}>Taxable Value</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceAllData.map((item, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>
                      <td style={{ fontWeight: "bold", textAlign: 'center' }}>
                        {item[0]}
                      </td>
                      <td style={{ textAlign: 'center' }}> {item[1]}</td>
                      <td style={{ textAlign: 'center' }}>{item[2]}</td>
                      <td>{formatedDate(item[3])}</td>
                      <td style={{ textAlign: 'center' }}>{item[4]}</td>
                      <td style={{ textAlign: 'center' }}>{item[5]}</td>
                      <td style={{ textAlign: 'center' }}>{item[6]}</td>
                      <td style={{ textAlign: 'center' }}>{item[7]}</td>
                    </tr>
                  ))}
                </tbody>
                <tr style={{ height: 9 }}></tr>
                <tr>
                  <td style={{ fontWeight: "bold", textAlign: 'center' }}>Total</td>
                  <td></td>
                  <td></td>
                  <td style={{ fontWeight: "bold" }}></td>
                  <td></td>
                  <td style={{ fontWeight: "bold", textAlign: 'center' }}>
                    {totalAllInvoiceAmount}
                  </td>
                  <td style={{ fontWeight: "bold" }}></td>
                  <td style={{ fontWeight: "bold", textAlign: 'center' }}>
                    {totalAllTaxAmount}
                  </td>
                  <td style={{ fontWeight: "bold", textAlign: 'center' }}>
                    {totalAllTaxableAmount}
                  </td>
                </tr>
              </Table>
            </div>
          </CardBody>
        </Card>
      ) : null}

     
    </div>
  );

}
