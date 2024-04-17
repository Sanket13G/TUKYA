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

export default function GST_Reports() {
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

  const [grandTotalInvoiceAmount, setGrandTotalInvoiceAmount] = useState(0);
  const [grandTotalBillAmount, setGrandTotalBillAmount] = useState(0);
  const [grandTotalIgst, setGrandTotalIgst] = useState(0);
  const [grandTotalCgst, setGrandTotalCgst] = useState(0);
  const [grandTotalSgst, setGrandTotalSgst] = useState(0);

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
  const [invoicePartyTypeDataTable, setInvoicePartyTypeDataTable] = useState(false);
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

  const [groupIndex, setGroupIndex] = useState(1);
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
        setInvoicePartyDataTable(false);
        setInvoicePartyTypeDataTable(false);
        setSelectedPartyType("");
        setInvoiceDataParty([]);
      } else {
        setGstRate(0); // Set the GST rate to 0 or another default value.
        setSelectedPartyGstNo(""); // Set GST Number to an empty string or another default value.
        setSelectedPartyEmail(""); // Set Email to an empty string or another default value.
      }
    }
  };
  
  const handlePartyType = (event) => {
    const SelectedPartyType = event.target.value;

    const filteredData = invoiceDataPartyType.filter((party) => party.unitType === SelectedPartyType);

    setFilteredPartyData(filteredData);
    setSelectedPartyType(SelectedPartyType);
    setInvoiceAllDataTable(false);
    setInvoicePartyDataTable(false);
     setSelectedParty("");
  };

  const handleReset = () => {
     setSelectedParty("");
     setSelectedParty("");
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedPartyType([]);
    setInvoicePartyDataTable(false);
    setInvoicePartyTypeDataTable(false);
    // setInvoiceDataParty([]);
    setInvoiceAllDataTable(false);
    // setInvoiceAllData([]);
  };

  const fetchInvoiceDataOfParty = () => {
    if (selectedParty) {
      // Make an API request here to fetch the list of airline names based on the provided criteria
      fetch(
        `http://${ipaddress}Invoice/invoiceDataOfParty?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&partyId=${selectedParty}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            // Update the 'airlines' state with the fetched data
            setInvoiceDataParty(data);
            console.log("Invoice Data Of Particular Party", data);
            setInvoicePartyDataTable(true);
            setInvoiceAllDataTable(false);
            setInvoiceAllData([]);
            setInvoicePartyTypeDataTable(false);
            setInvoiceDataPartyType([]);
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
            setInvoiceAllDataTable(false);
            setInvoicePartyTypeDataTable(false);
            setInvoiceDataPartyType([]);
          }
        })
        .catch((error) => {});
    }
  };
 
  const fetchAllInvoiceData = () => {
    fetch(
      `http://${ipaddress}Invoice/invoiceAllDataOfParty?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Update the 'airlines' state with the fetched data
          setInvoiceAllData(data);
          console.log("Invoice Data Of Particular Party", data);
          setInvoiceAllDataTable(true);
          setInvoicePartyDataTable(false);
          setInvoiceDataParty([]);
          setInvoicePartyTypeDataTable(false);
          setInvoiceDataPartyType([]);
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
          setInvoiceAllDataTable(false);
          setInvoicePartyDataTable(false);
          setInvoiceDataParty([]);
          setInvoicePartyTypeDataTable(false);
          setInvoiceDataPartyType([]);
        }
      })
      .catch((error) => {});
  };
  const fetchInvoiceDataOfPartyType = () => {
    // if (selectedPartyType) {
      // Make an API request here to fetch the list of airline names based on the provided criteria
      fetch(
        `http://${ipaddress}Invoice/invoiceDataOfPartyType?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&unitType=${selectedPartyType}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            // Update the 'airlines' state with the fetched data
            setInvoiceDataPartyType(data);
            console.log("Invoice Data Of Particular Party", data);
            setInvoicePartyTypeDataTable(true)
            setInvoicePartyDataTable(false);
            setInvoiceAllDataTable(false);
            setInvoiceAllData([]);
            setInvoiceDataParty([])
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
            setInvoiceDataParty([])
            setInvoiceAllDataTable(false);
            setInvoicePartyTypeDataTable(false);
          }
        })
        .catch((error) => {});
    // }
  };


  useEffect(() => {
    if (selectedPartyType) {
      fetchInvoiceDataOfPartyType();
    }
  }, [selectedPartyType]);

  
  
  const handleShow = () => {
    if (startDate && endDate && !selectedParty) {
      fetchAllInvoiceData();
    } else if (startDate && endDate && selectedParty) {
      fetchInvoiceDataOfParty();
    }
    else if(startDate && endDate && selectedPartyType && !selectedParty)
    {
      fetchInvoiceDataOfPartyType();
    }
  };

  const totalInvoiceAmount = invoiceDataParty.reduce(
    (total, item) => total + item.totalInvoiceAmount,
    0
  );
  const totalBillAmount = invoiceDataParty.reduce(
    (total, item) => total + item.billAmount,
    0
  );
  const totalTaxAmount = invoiceDataParty.reduce(
    (total, item) => total + item.taxAmount,
    0
  );

 

  const groupedData = invoiceAllData.reduce((acc, item) => {
    if (!acc[item.partyId]) {
      acc[item.partyId] = [];
    }
    acc[item.partyId].push(item);
    return acc;
  }, {});

  const groupedDataPartyType = invoiceDataPartyType.reduce((acc, item) => {
    if (!acc[item.partyId]) {
      acc[item.partyId] = [];
    }
    acc[item.partyId].push(item);
    return acc;
  }, {});

  const [displayedPartyNames, setDisplayedPartyNames] = useState({});
  const togglePartyNameDisplay = (partyId) => {
    setDisplayedPartyNames((prevState) => {
      return { ...prevState, [partyId]: !prevState[partyId] };
    });
  };
 const totalAllInvoiceAmount = invoiceAllData.reduce(
    (total, itemAll) => total + itemAll.totalInvoiceAmount,
    0
  );
  const totalAllBillAmount = invoiceAllData.reduce(
    (total, itemAll) => total + itemAll.billAmount,
    0
  );
  const totalAllTaxAmount = invoiceAllData.reduce(
    (total, itemAll) => total + itemAll.taxAmount,
    0
  );
  const totalAllCGST = Object.keys(groupedData).reduce((total, partyId) => {
    return (
      total +
      groupedData[partyId].reduce((partyTotal, itemAll) => {
        if (itemAll.cgst === "Y") {
          return partyTotal;
        } else {
          return partyTotal + itemAll.taxAmount / 2;
        }
      }, 0)
    );
  }, 0);

  const totalAllSGST = Object.keys(groupedData).reduce((total, partyId) => {
    return (
      total +
      groupedData[partyId].reduce((partyTotal, itemAll) => {
        if (itemAll.sgst === "Y") {
          return partyTotal;
        } else {
          return partyTotal + itemAll.taxAmount / 2;
        }
      }, 0)
    );
  }, 0);

  const totalAllIGST = Object.keys(groupedData).reduce((total, partyId) => {
    return (
      total +
      groupedData[partyId].reduce((partyTotal, itemAll) => {
        if (itemAll.cgst === "Y") {
          return partyTotal;
        } else {
          return partyTotal + itemAll.taxAmount / 2;
        }
      }, 0)
    );
  }, 0);








  let count = 1;


  const totalAllInvoiceAmountType = invoiceDataPartyType.reduce(
    (total, itemAll) => total + itemAll.totalInvoiceAmount,
    0
  );
  const totalAllBillAmountType = invoiceDataPartyType.reduce(
    (total, itemAll) => total + itemAll.billAmount,
    0
  );
  const totalAllTaxAmountType = invoiceDataPartyType.reduce(
    (total, itemAll) => total + itemAll.taxAmount,
    0
  );
  const totalAllCGSTType = Object.keys(groupedDataPartyType).reduce((total, partyId) => {
    return (
      total +
      groupedDataPartyType[partyId].reduce((partyTotal, itemAll) => {
        if (itemAll.cgst === "Y") {
          return partyTotal;
        } else {
          return partyTotal + itemAll.taxAmount / 2;
        }
      }, 0)
    );
  }, 0);

  const totalAllSGSTType = Object.keys(groupedDataPartyType).reduce((total, partyId) => {
    return (
      total +
      groupedDataPartyType[partyId].reduce((partyTotal, itemAll) => {
        if (itemAll.sgst === "Y") {
          return partyTotal;
        } else {
          return partyTotal + itemAll.taxAmount / 2;
        }
      }, 0)
    );
  }, 0);

  const totalAllIGSTType = Object.keys(groupedDataPartyType).reduce((total, partyId) => {
    return (
      total +
      groupedDataPartyType[partyId].reduce((partyTotal, itemAll) => {
        if (itemAll.cgst === "Y") {
          return partyTotal;
        } else {
          return partyTotal + itemAll.taxAmount / 2;
        }
      }, 0)
    );
  }, 0);

  const handlePdf = async () => {
    try {
      const response = await axios.post(
        `http://${ipaddress}Invoice/invoicPrintOfParty?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&partyId=${selectedParty}`
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
        downloadLink.download = "gst_summary_report.pdf"; // Set the filename for the downloaded PDF
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
    } catch (error) {}
  };

  const handlePrint = async () => {
    try {
      const response = await axios.post(
        `http://${ipaddress}Invoice/invoicPrintOfParty?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&partyId=${selectedParty}`
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
          <title>gst_summary_party_report Viewer</title>
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
        `http://${ipaddress}Invoice/invoicPrintOfAllParty?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
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
          <title>gst_summary_all_report Viewer</title>
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
        `http://${ipaddress}Invoice/invoicPrintOfAllParty?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
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
        downloadLink.download = "gst_All_summary_report.pdf"; // Set the filename for the downloaded PDF
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
    } catch (error) {}
  };

  const handlePrintInvoiceDataByPartyType = async () => {
    try {
      const response = await axios.post(
        `http://${ipaddress}Invoice/invoicePrintOfPartyType?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&unitType=${selectedPartyType}`
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
          <title>gst_summary_unityType_report Viewer</title>
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
        `http://${ipaddress}Invoice/invoicePrintOfPartyType?companyId=${companyid}&branchId=${branchId}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&unitType=${selectedPartyType}`
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
        downloadLink.download = "gst_All_summary_report.pdf"; // Set the filename for the downloaded PDF
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
    } catch (error) {}
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
        Party GST Report
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
            <Col md={3}>
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
            </Col>
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
      {invoicePartyDataTable ? (
        <Card style={{ marginTop: 30 }}>
          <CardBody>
            <div>
              <Row>
                <Col className="text-end">
                  <Button
                    type="button"
                    className="btn btn-success" // Add a class for styling
                    style={{ marginRight: 10 }}
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
                    className="btn btn-primary" // Add a class for styling
                    onClick={handlePdf}
                  >
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      style={{ marginRight: "5px" }}
                    />
                    PDF
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
                    <th style={{ background: "#BADDDA" }}>Sr. No</th>
                    <th style={{ background: "#BADDDA" }}>Bill No.</th>
                    <th style={{ background: "#BADDDA" }}>Bill Date</th>
                    <th style={{ background: "#BADDDA" }}>Bill Amount</th>
                    <th style={{ background: "#BADDDA" }}>GST Rate</th>
                    <th style={{ background: "#BADDDA" }}>Taxable Amount</th>
                    <th style={{ background: "#BADDDA" }}>IGST</th>
                    <th style={{ background: "#BADDDA" }}>CGST</th>
                    <th style={{ background: "#BADDDA" }}>SGST</th>
                    <th style={{ background: "#BADDDA" }}>GST Total</th>
                  </tr>
                </thead>
                <tbody>
                  <React.Fragment>
                    <tr>
                      <td>{1}</td>
                      <td colSpan={3} style={{ fontWeight: "bold" }}>
                        {getpartyId[selectedParty]}
                      </td>
                      <td colSpan={3}>{selectedPartyEmail}</td>
                      <td colSpan={3}>{selectedPartyGstNo}</td>
                    </tr>
                  </React.Fragment>
                  {invoiceDataParty.map((item, index) => {
                    // Calculate and display values based on your logic
                    let igst, cgst, sgst;

                    if (item.igst === "Y") {
                      igst = item.taxAmount;
                      cgst = 0;
                      sgst = 0;
                    } else {
                      igst = 0;
                      cgst = item.taxAmount / 2;
                      sgst = item.taxAmount / 2;
                    }

                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td></td>
                          <td>{item.billNO}</td>
                          <td>{formatedDate(item.invoiceDate)}</td>
                          <td>{item.totalInvoiceAmount}</td>
                          <td>{gstRate || "0"}</td>
                          <td>{item.billAmount}</td>
                          <td>{igst}</td>
                          <td>{cgst}</td>
                          <td>{sgst}</td>
                          <td>{item.taxAmount}</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Total</td>
                    <td></td>
                    <td></td>
                    <td  style={{ fontWeight: "bold" }}>{totalInvoiceAmount}</td>
                    <td></td>
                    <td  style={{ fontWeight: "bold" }}>{totalBillAmount}</td>
                    <td  style={{ fontWeight: "bold" }}>{totalIgst}</td>
                    <td  style={{ fontWeight: "bold" }}>{totalCgst}</td>
                    <td  style={{ fontWeight: "bold" }}>{totalSgst}</td>
                    <td  style={{ fontWeight: "bold" }}>{totalTaxAmount}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      ) : null}
  
      {invoiceAllDataTable ? (
        <Card style={{ marginTop: 30 }}>
          <CardBody>
            <div>
              <Row>
                <Col className="text-end">
                  <Button
                    type="button"
                    className="btn btn-success"
                    style={{ marginRight: 10 }}
                    onClick={handlePrintAllInvoiceData}
                  >
                    <FontAwesomeIcon
                      icon={faPrint}
                      style={{ marginRight: "5px" }}
                    />
                    Print
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-primary"
                    onClick={handlePdfAllInvoiceData}
                  >
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      style={{ marginRight: "5px" }}
                    />
                    PDF
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
                    <th style={{ background: "#BADDDA" }}>Sr. No</th>
                    <th style={{ background: "#BADDDA" }}>Bill No.</th>
                    <th style={{ background: "#BADDDA" }}>Bill Date</th>
                    <th style={{ background: "#BADDDA" }}>Bill Amount</th>
                    <th style={{ background: "#BADDDA" }}>GST Rate</th>
                    <th style={{ background: "#BADDDA" }}>Taxable Amount</th>
                    <th style={{ background: "#BADDDA" }}>IGST</th>
                    <th style={{ background: "#BADDDA" }}>CGST</th>
                    <th style={{ background: "#BADDDA" }}>SGST</th>
                    <th style={{ background: "#BADDDA" }}>GST Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(groupedData).map((partyId) => {
                    // Initialize party-wise totals
                    let partyTotalInvoiceAmount = 0;
                    let partyTotalBillAmount = 0;
                    let partyTotalTaxAmount = 0;
                    let partyTotalIGST = 0;
                    let partyTotalCGST = 0;
                    let partyTotalSGST = 0;

                    return (
                      <React.Fragment key={partyId}>
                        {groupedData[partyId].map((itemAll, index) => {
                          let igst, cgst, sgst;

                          if (itemAll.igst === "Y") {
                            igst = itemAll.taxAmount;
                            cgst = 0;
                            sgst = 0;
                          } else {
                            igst = 0;
                            cgst = itemAll.taxAmount / 2;
                            sgst = itemAll.taxAmount / 2;
                          }

                          // Update party-wise totals
                          partyTotalInvoiceAmount += itemAll.totalInvoiceAmount;
                          partyTotalBillAmount += itemAll.billAmount;
                          partyTotalTaxAmount += itemAll.taxAmount;
                          partyTotalIGST += igst;
                          partyTotalCGST += cgst;
                          partyTotalSGST += sgst;
                          
                          return (
                            <React.Fragment key={index}>
                              {index === 0 && !displayedPartyNames[partyId] && (
                                <tr>
                                  <td>{count++}</td>
                                  <td
                                    colSpan={3}
                                    style={{ fontWeight: "bold" }}
                                  >
                                    {getpartyId[itemAll.partyId]}
                                  </td>
                                  <td colSpan={3}>
                                    {getpartyEmail[itemAll.partyId]}
                                  </td>
                                  <td colSpan={3}>
                                    {getpartyGstNo[itemAll.partyId]}
                                  </td>
                                </tr>
                              )}
                              <tr>
                                <td></td>
                                <td>{itemAll.billNO}</td>
                                <td>{formatedDate(itemAll.invoiceDate)}</td>
                                <td>{itemAll.totalInvoiceAmount}</td>
                                <td>{gstRateMap[itemAll.partyId]}</td>
                                <td>{itemAll.billAmount}</td>
                                <td>{igst}</td>
                                <td>{cgst}</td>
                                <td>{sgst}</td>
                                <td>{itemAll.taxAmount}</td>
                              </tr>
                            </React.Fragment>
                          );
                        })}
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Party Total</td>
                          <td></td>
                          <td></td>
                          <td style={{ fontWeight: "bold" }}>
                            {partyTotalInvoiceAmount}
                          </td>
                          <td></td>
                          <td style={{ fontWeight: "bold" }}>
                            {partyTotalBillAmount}
                          </td>
                          <td style={{ fontWeight: "bold" }}>
                            {partyTotalIGST}
                          </td>
                          <td style={{ fontWeight: "bold" }}>
                            {partyTotalCGST}
                          </td>
                          <td style={{ fontWeight: "bold" }}>
                            {partyTotalSGST}
                          </td>
                          <td style={{ fontWeight: "bold" }}>
                            {partyTotalTaxAmount}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>

                <tr>
                  <td style={{ fontWeight: "bold" }}>Grand Total</td>
                  <td></td>
                  <td></td>
                  <td style={{ fontWeight: "bold" }}>
                    {totalAllInvoiceAmount}
                  </td>
                  <td></td>
                  <td style={{ fontWeight: "bold" }}>{totalAllBillAmount}</td>
                  <td style={{ fontWeight: "bold" }}>{totalAllIGST}</td>
                  <td style={{ fontWeight: "bold" }}>{totalAllCGST}</td>
                  <td style={{ fontWeight: "bold" }}>{totalAllSGST}</td>
                  <td style={{ fontWeight: "bold" }}>{totalAllTaxAmount}</td>
                </tr>
              </Table>
            </div>
          </CardBody>
        </Card>
      ) : null}






{/* this is for invoiceDataOfAllPartyType */}
      
 {invoicePartyTypeDataTable ? (
        <Card style={{ marginTop: 30 }}>
          <CardBody>
            <div>
              <Row>
                <Col className="text-end">
                  <Button
                    type="button"
                    className="btn btn-success"
                    style={{ marginRight: 10 }}
                    onClick={handlePrintInvoiceDataByPartyType}
                  >
                    <FontAwesomeIcon
                      icon={faPrint}
                      style={{ marginRight: "5px" }}
                    />
                    Print
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-primary"
                    onClick={handlePdfInvoiceDataByPartyType}
                  >
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      style={{ marginRight: "5px" }}
                    />
                    PDF
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
                    <th style={{ background: "#BADDDA" }}>Sr. No</th>
                    <th style={{ background: "#BADDDA" }}>Bill No.</th>
                    <th style={{ background: "#BADDDA" }}>Bill Date</th>
                    <th style={{ background: "#BADDDA" }}>Bill Amount</th>
                    <th style={{ background: "#BADDDA" }}>GST Rate</th>
                    <th style={{ background: "#BADDDA" }}>Taxable Amount</th>
                    <th style={{ background: "#BADDDA" }}>IGST</th>
                    <th style={{ background: "#BADDDA" }}>CGST</th>
                    <th style={{ background: "#BADDDA" }}>SGST</th>
                    <th style={{ background: "#BADDDA" }}>GST Total</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(groupedDataPartyType).map((partyId) => {
                    // Initialize party-wise totals
                    let partyTotalInvoiceAmount = 0;
                    let partyTotalBillAmount = 0;
                    let partyTotalTaxAmount = 0;
                    let partyTotalIGST = 0;
                    let partyTotalCGST = 0;
                    let partyTotalSGST = 0;

                    return (
                      <React.Fragment key={partyId}>
                        {groupedDataPartyType[partyId].map((itemAll, index) => {
                          let igst, cgst, sgst;

                          if (itemAll.igst === "Y") {
                            igst = itemAll.taxAmount;
                            cgst = 0;
                            sgst = 0;
                          } else {
                            igst = 0;
                            cgst = itemAll.taxAmount / 2;
                            sgst = itemAll.taxAmount / 2;
                          }

                          // Update party-wise totals
                          partyTotalInvoiceAmount += itemAll.totalInvoiceAmount;
                          partyTotalBillAmount += itemAll.billAmount;
                          partyTotalTaxAmount += itemAll.taxAmount;
                          partyTotalIGST += igst;
                          partyTotalCGST += cgst;
                          partyTotalSGST += sgst;

                          return (
                            <React.Fragment key={index}>
                              {index === 0 && !displayedPartyNames[partyId] && (
                                <tr>
                                  <td>{count++}</td>
                                  <td
                                    colSpan={3}
                                    style={{ fontWeight: "bold" }}
                                  >
                                    {getpartyId[itemAll.partyId]}
                                  </td>
                                  <td colSpan={3}>
                                    {getpartyEmail[itemAll.partyId]}
                                  </td>
                                  <td colSpan={3}>
                                    {getpartyGstNo[itemAll.partyId]}
                                  </td>
                                </tr>
                              )}
                              <tr>
                                <td></td>
                                <td>{itemAll.billNO}</td>
                                <td>{formatedDate(itemAll.invoiceDate)}</td>
                                <td>{itemAll.totalInvoiceAmount}</td>
                                <td>{gstRateMap[itemAll.partyId]}</td>
                                <td>{itemAll.billAmount}</td>
                                <td>{igst}</td>
                                <td>{cgst}</td>
                                <td>{sgst}</td>
                                <td>{itemAll.taxAmount}</td>
                              </tr>
                            </React.Fragment>
                          );
                        })}
                        <tr>
                          <td style={{ fontWeight: "bold" }}>Party Total</td>
                          <td></td>
                          <td></td>
                          <td style={{ fontWeight: "bold" }}>
                            {partyTotalInvoiceAmount}
                          </td>
                          <td></td>
                          <td style={{ fontWeight: "bold" }}>
                            {partyTotalBillAmount}
                          </td>
                          <td style={{ fontWeight: "bold" }}>
                            {partyTotalIGST}
                          </td>
                          <td style={{ fontWeight: "bold" }}>
                            {partyTotalCGST}
                          </td>
                          <td style={{ fontWeight: "bold" }}>
                            {partyTotalSGST}
                          </td>
                          <td style={{ fontWeight: "bold" }}>
                            {partyTotalTaxAmount}
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>

                <tr>
                  <td style={{ fontWeight: "bold" }}>Grand Total</td>
                  <td></td>
                  <td></td>
                  <td style={{ fontWeight: "bold" }}>
                    {totalAllInvoiceAmountType}
                  </td>
                  <td></td>
                  <td style={{ fontWeight: "bold" }}>{totalAllBillAmountType}</td>
                  <td style={{ fontWeight: "bold" }}>{totalAllIGSTType}</td>
                  <td style={{ fontWeight: "bold" }}>{totalAllCGSTType}</td>
                  <td style={{ fontWeight: "bold" }}>{totalAllSGSTType}</td>
                  <td style={{ fontWeight: "bold" }}>{totalAllTaxAmountType}</td>
                </tr>
              </Table>
            </div>
          </CardBody>
        </Card>
      ) : null} 
    </div>
  );
}
