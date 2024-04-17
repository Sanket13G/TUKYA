import React, { useState, useEffect, useContext } from "react";
import axios, { Axios } from "axios";
import ipaddress from "../Components/IpAddress";
import { saveAs } from "file-saver";
import Select from "react-select";
import "./parent.css";
import { Pagination } from "react-bootstrap";
import DGDCimage from "../Images/report.jpeg";
import { Line, PDFDownloadLink } from "@react-pdf/renderer";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Button from 'react-bootstrap/Button';
import InviceService from "../services/InviceService";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import {
  Row,
  Col,
  Input,
  Form,

  FormGroup,
  Label,
  Card,
  CardBody,
  Modal,
  Table,
  Container,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import AuthContext from "../Components/AuthProvider";
import { data } from "jquery";
import { faAdd, faArrowAltCircleRight, faArrowCircleDown, faArrowCircleRight, faArrowRightRotate, faAtom, faBox, faBoxArchive, faBoxTissue, faBoxesAlt, faBoxesStacked, faCog, faDonate, faEdit, faExclamationCircle, faExclamationTriangle, faFileCircleCheck, faFileCircleExclamation, faGift, faGifts, faHandsHelping, faHistory, faIdCardAlt, faListCheck, faMoneyBillWave, faPenClip, faPencil, faPeopleCarryBox, faPlus, faPrint, faRecordVinyl, faRedoAlt, faRightFromBracket, faSave, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { BlobProvider } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
  header: {
    marginBottom: 20,
  },
  table: {
    width: "100%",
    marginBottom: 10,
    flexWrap: "wrap",
  },

  viewheadingwithbox: {
    border: "1px solid black",
    padding: 5,
  },
  image: {
    width: 400,
    height: 126,
    marginBottom: 0,
    marginLeft: 63,
    textAlign: "center",
  },
  line: {
    width: "100%", // Adjust the width of the line
    marginTop: 10, // Adjust the space above the line
    marginBottom: 10, // Adjust the space below the line
    borderTop: "1pt solid black", // Style the line
  },

  tableRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tableCell: {
    border: "1px solid #000",
    padding: 5,
    flexWrap: "wrap",
  },
  tableCellHeader: {
    fontWeight: "bold",
    flexWrap: "wrap",
  },
});
export default function Detection_List() {
  const [detinations, setDetinations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [SelectedParty, setSelectedParty] = useState(null); // Changed here
  const [partyName, setparty_Name] = useState("");
  const [partyId, setpartyId] = useState("");
  const [partys, setPartys] = useState([]);

  const [viewHistoryModal, setHistoryModal] = useState(false);
  const [PrintModal, setPrintModal] = useState(false);

  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const [issueModalOpen, setIssueModalOpen] = useState(false);

  const [redepositeModalOpen, setRepositeModalOpen] = useState(false);

  const [printNumber,setPrintNumber] = useState('');


  const renderTable = () => (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <View
          style={[styles.tableCell, styles.tableCellHeader, { width: 126 }]}
        >
          <Text style={{ fontSize: 10 }}>Date</Text>
        </View>
        <View
          style={[styles.tableCell, styles.tableCellHeader, { width: 126 }]}
        >
          <Text style={{ fontSize: 10 }}>Transaction Status</Text>
        </View>
        <View
          style={[styles.tableCell, styles.tableCellHeader, { width: 126 }]}
        >
          <Text style={{ fontSize: 10 }}>Officer Name</Text>
        </View>
        <View
          style={[styles.tableCell, styles.tableCellHeader, { width: 144 }]}
        >
          <Text style={{ fontSize: 10, backgroundColor: "skyblue" }}>
            Remarks
          </Text>
        </View>
      </View>
      {historytable.map((data, index) => (
        <View style={styles.tableRow}>
          <View style={{ ...styles.tableCell, width: 126 }}>
            <Text style={{ fontSize: 10 }}>
              {formatedDate(data.date)}
            </Text>
          </View>
          <View style={{ ...styles.tableCell, width: 126 }}>
            <Text style={{ fontSize: 10 }}>{data.status}</Text>
          </View>
          <View style={{ ...styles.tableCell, width: 126 }}>
            <Text style={{ fontSize: 10 }}>{data.officerName}</Text>
          </View>
          <View style={{ ...styles.tableCell, width: 144 }}>
            <Text style={{ fontSize: 10, backgroundColor: "skyblue" }}>
              {data.remarks}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const MyPDFDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.image} src={DGDCimage} />
        </View>
        <View>
          <Text
            style={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
          >
            DETENTION HISTORY
          </Text>
        </View>

        <Line style={styles.line} />
        <View>
          <Text style={{ fontSize: 10 }}>
            Serial Number:{historydata.siNo}
            {"\n"}{" "}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 10 }}>
            File Number:{historydata.fileNo}
            {"\n"} {"\n"}{" "}
          </Text>
        </View>

        {renderTable()}
      </Page>
    </Document>
  );
  const {
    jwtToken,
    user_Id,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    login,
    logout,
  } = useContext(AuthContext);



  const [modalData, setModalData] = useState({
    detentionId: "",
    fileNo: "",
    nop: 0,
    depositDate: "",
    withdrawDate: "",
    partyId: "",
    siNo: "",
  });



  const formatedDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const [newDetention, setNewDetention] = useState({
    fileNo: "",
    depositDate: "",
    parcelDetainedBy: "",
    officerName: "",
    officerDesignation: "",
    dgdcOfficerName: "",
    dgdcOfficerDesignation: "",
    nop: "",
    parcelType: "",
    partyId: "",
    remarks: "",
    status: "",
    otherParty: "",
    withdrawDate: "",
    withdrawOfficerName: "",
    withdrawOfficerDesignation: "",
    withdrawDgdcOfficerName: "",
    withdrawDgdcOfficerDesignation: "",
    withdrawNop: "",
    withdrawPartyId: "",
    withdrawRemarks: "",
    issueDate: "",
    issueOfficerName: "",
    issueOfficerDesignation: "",
    issueDgdcOfficerName: "",
    issueDgdcOfficerDesignation: "",
    issueNop: "",
    issueType: "",
    issueReason: "",
    issueRemarks: "",
    redepositeDate: "",
    redepositeOfficerName: "",
    redepositeOfficerDesignation: "",
    redepositeDgdcOfficerName: "",
    redepositeDgdcOfficerDesignation: "",
    redepositeNop: "",
    redepositeType: "",
    redepositeRemarks: "",
  });

  const [issuedata, setIssueData] = useState({
    fileNo: newDetention.fileNo,
    siNo: newDetention.siNo,
    depositDate: newDetention.depositDate,
    parcelDetainedBy: newDetention.parcelDetainedBy,
    officerName: newDetention.officerName,
    officerDesignation: newDetention.officerDesignation,
    dgdcOfficerName: newDetention.dgdcOfficerName,
    dgdcOfficerDesignation: newDetention.dgdcOfficerDesignation,
    nop: newDetention.nop,
    parcelType: newDetention.parcelType,
    partyId: newDetention.partyId,
    remarks: newDetention.remarks,
    status: newDetention.status,
    otherParty: newDetention.otherParty,
    withdrawDate: newDetention.withdrawDate,
    withdrawOfficerName: newDetention.withdrawOfficerName,
    withdrawOfficerDesignation: newDetention.withdrawOfficerDesignation,
    withdrawDgdcOfficerName: newDetention.withdrawDgdcOfficerName,
    withdrawDgdcOfficerDesignation: newDetention.withdrawDgdcOfficerDesignation,
    withdrawNop: newDetention.withdrawNop,
    withdrawPartyId: newDetention.withdrawPartyId,
    withdrawRemarks: newDetention.withdrawRemarks,
    issueDate: newDetention.issueDate,
    issueOfficerName: newDetention.issueOfficerName,
    issueOfficerDesignation: newDetention.issueOfficerDesignation,
    issueDgdcOfficerName: newDetention.issueDgdcOfficerName,
    issueDgdcOfficerDesignation: newDetention.issueDgdcOfficerDesignation,
    issueNop: newDetention.issueNop,
    issueType: newDetention.issueType,
    issueReason: newDetention.issueReason,
    issueRemarks: newDetention.issueRemarks,
    detentionId: newDetention.detentionId,

    redepositeDate: newDetention.redepositeDate,
    redepositeOfficerName: newDetention.redepositeOfficerName,
    redepositeOfficerDesignation: newDetention.redepositeOfficerDesignation,
    redepositeDgdcOfficerName: newDetention.redepositeDgdcOfficerName,
    redepositeDgdcOfficerDesignation: newDetention,
    redepositeNop: newDetention.redepositeNop,
    redepositeType: newDetention.redepositeType,
    redepositeRemarks: newDetention.redepositeRemarks,
  });

  console.log(issuedata);

  const handleIssueChange = (e) => {
    const { name, value } = e.target;
    setIssueData((prevDetention) => ({
      ...prevDetention,
      [name]: value,
    }));
  };





// Barcode Code Start at 01/10/2023

const printBarcode = async (mawb, seino, nop, sirdate, reqdate, niptStatus, requestId) => {
  try {


    // console.log( nop, sirdate, requestId);
    const response = await InviceService.getbarcodeDetention(requestId, sirdate, nop);

    // Check if the response status is OK (200)
    if (response.status === 200) {
      // Get the raw response data as base64-encoded string
      const newWindow = window.open('', '_blank');
        newWindow.document.write(response.data);
    } else {
      throw new Error('Failed to generate PDF');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};



















  const handleIssueSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://${ipaddress}detention/issued/${issuedata.detentionId}`,
        issuedata
      );

      fetchDetentions();
      resetForm();
      closeModalforReqidforIssue();
      // Optionally, reset the editHoliday state here
      toast.success("Detention Issued successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data); // Log the response data for debugging
      }
      toast.error("Error updating data!", {
        // ...
      });
    }
  };

  const [redepositedata, setRedepositeData] = useState({
    fileNo: newDetention.fileNo,
    siNo: newDetention.siNo,
    depositDate: newDetention.depositDate,
    parcelDetainedBy: newDetention.parcelDetainedBy,
    officerName: newDetention.officerName,
    officerDesignation: newDetention.officerDesignation,
    dgdcOfficerName: newDetention.dgdcOfficerName,
    dgdcOfficerDesignation: newDetention.dgdcOfficerDesignation,
    nop: newDetention.nop,
    parcelType: newDetention.parcelType,
    partyId: newDetention.partyId,
    remarks: newDetention.remarks,
    status: newDetention.status,
    otherParty: newDetention.otherParty,
    withdrawDate: newDetention.withdrawDate,
    withdrawOfficerName: newDetention.withdrawOfficerName,
    withdrawOfficerDesignation: newDetention.withdrawOfficerDesignation,
    withdrawDgdcOfficerName: newDetention.withdrawDgdcOfficerName,
    withdrawDgdcOfficerDesignation: newDetention.withdrawDgdcOfficerDesignation,
    withdrawNop: newDetention.withdrawNop,
    withdrawPartyId: newDetention.withdrawPartyId,
    withdrawRemarks: newDetention.withdrawRemarks,
    issueDate: newDetention.issueDate,
    issueOfficerName: newDetention.issueOfficerName,
    issueOfficerDesignation: newDetention.issueOfficerDesignation,
    issueDgdcOfficerName: newDetention.issueDgdcOfficerName,
    issueDgdcOfficerDesignation: newDetention.issueDgdcOfficerDesignation,
    issueNop: newDetention.issueNop,
    issueType: newDetention.issueType,
    issueReason: newDetention.issueReason,
    issueRemarks: newDetention.issueRemarks,

    redepositeDate: newDetention.redepositeDate,
    redepositeOfficerName: newDetention.redepositeOfficerName,
    redepositeOfficerDesignation: newDetention.redepositeOfficerDesignation,
    redepositeDgdcOfficerName: newDetention.redepositeDgdcOfficerName,
    redepositeDgdcOfficerDesignation: newDetention,
    redepositeNop: newDetention.redepositeNop,
    redepositeType: newDetention.redepositeType,
    redepositeRemarks: newDetention.redepositeRemarks,
  });

  const handleRedepositeChange = (e) => {
    const { name, value } = e.target;
    setRedepositeData((prevDetention) => ({
      ...prevDetention,
      [name]: value,
    }));
  };

  const handleRedepositeSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://${ipaddress}detention/redeposite/${redepositedata.detentionId}`,
        redepositedata
      );

      fetchDetentions();
      resetForm();
      closeModalforReqidforRedeposite();
      // Optionally, reset the editHoliday state here
      toast.success("Data Redeposited successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error updating data!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const [withdrawdata, setWithdrawData] = useState({
    fileNo: newDetention.fileNo,
    siNo: newDetention.siNo,
    depositDate: newDetention.depositDate,
    parcelDetainedBy: newDetention.parcelDetainedBy,
    officerName: newDetention.officerName,
    officerDesignation: newDetention.officerDesignation,
    dgdcOfficerName: newDetention.dgdcOfficerName,
    dgdcOfficerDesignation: newDetention.dgdcOfficerDesignation,
    nop: newDetention.nop,
    parcelType: newDetention.parcelType,
    partyId: newDetention.partyId,
    remarks: newDetention.remarks,
    status: newDetention.status,
    otherParty: newDetention.otherParty,
    withdrawDate: newDetention.withdrawDate,
    withdrawOfficerName: newDetention.withdrawOfficerName,
    withdrawOfficerDesignation: newDetention.withdrawOfficerDesignation,
    withdrawDgdcOfficerName: newDetention.withdrawDgdcOfficerName,
    withdrawDgdcOfficerDesignation: newDetention.withdrawDgdcOfficerDesignation,
    withdrawNop: newDetention.withdrawNop,
    withdrawPartyId: newDetention.withdrawPartyId,
    withdrawRemarks: newDetention.withdrawRemarks,
  });

  const handleWithdrawChange = (e) => {
    const { name, value } = e.target;
    setWithdrawData((prevDetention) => ({
      ...prevDetention,
      [name]: value,
    }));
  };

  const handleWithdrawSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://${ipaddress}detention/withdraw/${withdrawdata.detentionId}`,
        withdrawdata
      );

      fetchDetentions();
      resetForm();
      closeModalforWithraw();
      // Optionally, reset the editHoliday state here
      toast.success("Data Withdraw successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error updating data!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const toggleRedepositeModal = (data) => {
    setRepositeModalOpen(true);
    setRedepositeData(data);
  };

  const closeModalforReqidforRedeposite = () => {
    setRepositeModalOpen(false);
  };

  const toggleissueModal = (data) => {
    setIssueModalOpen(true);
    setIssueData(data);
  };

  const closeModalforReqidforIssue = () => {
    setIssueModalOpen(false);
  };

  const toggleEditModal = (data) => {
    setEditModalOpen(true);
    setEditdata(data);
  };
  const closeModalforReqidforupdate = () => {
    setEditModalOpen(false);
    setFormErrors(
      {
        fileNo: "",
        officerName: "",
        dgdcOfficerName: "",
        nop: "",
        partyId: ""
      }
    )
  };

  const togalWithdrwa = (data) => {
    setWithdrawModalOpen(true);
    setWithdrawData(data);
  };
  // console.log("withdraw data ", withdrawdata);
  const closeModalforWithraw = () => {
    setWithdrawModalOpen(false);
  };

  const printTagModal = (detentionId, fileNo, nop, depositDate, withdrawDate, partyId, siNo) => {
    const model = {
      detentionId,
      fileNo,
      nop,
      depositDate,
      withdrawDate,
      partyId,
      siNo,
    };

    console.log(model);
    setModalData(model);
    // console.log(modalData);
    setPrintModal(true);
  };
  const closeModalforReqidPrint = () => {
    setPrintModal(false);
  };

  const historytoggleEditModal = (data) => {
    setHistoryModal(true);
    setHistoryData(data);
  };
  const closeModalforReqidforHistory = () => {
    setHistoryModal(false);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setFormErrors(
      {
        fileNo: "",
        officerName: "",
        dgdcOfficerName: "",
        nop: "",
        partyId: ""
      }
    )
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDetention({
      ...newDetention,
      [name]: value,
    });
  };

  const [newHistory, setNewHistory] = useState({
    fileNo: "",
    siNo: "",
    date: "",
    status: "",
    remarks: "",
  });

  const [historydata, setHistoryData] = useState([]);
  const [historytable, setHistorytable] = useState([]);

  const handleHistoryChange = (e) => {
    const { name, value } = e.target;
    setNewHistory({
      ...newHistory,
      [name]: value,
    });
  };

  const fetchHistoryData = async () => {
    try {
      const response = await axios.get(
        `http://${ipaddress}detention-history/history/${companyid}/${branchId}/${historydata.siNo}`
      );

      setHistorytable(response.data);
    } catch (error) {
      console.error("Error fetching history data", error);
    }
  };
  useEffect(() => {
    // Fetch history data when component mounts
    fetchHistoryData();
  }, [companyid, branchId, historydata.siNo]);

  // const handleHistorySubmit = async (event) => {
  //   event.preventDefault();
  //   console.log("New Detination Data:", newDetention);
  //   try {
  //     const queryParams = {
  //       fileNo: newHistory.fileNo,
  //       depositDate: formatedDate(newHistory.depositDate),
  //       officerName: newHistory.officerName,
  //       remarks: newHistory.remarks,
  //       status: newHistory.status,

  //     };

  //     const response = await axios.get(
  //       `http://${ipaddress}detention/history`, // Use your correct API endpoint here
  //       {
  //         params: {
  //           companyId: companyid,
  //           branchId: branchId,
  //           siNo: historydata.siNo,
  //           fileNo: historydata.fileNo,
  //           ...queryParams,
  //         },
  //       }
  //     );

  //     toast.success("Detention added successfully", {
  //       position: "top-center",
  //     });
  //     console.log("Detention added successfully", response.data);

  //     setHistory([...history, response.data]);
  //     fetchDetentions();
  //     resetForm();
  //     toggleModal();
  //   } catch (error) {
  //     console.error("Error adding detention", error);
  //   }
  // };

  const [formErrors, setFormErrors] = useState({
    fileNo: "",
    officerName: "",
    dgdcOfficerName: "",
    nop: "",
    partyId: ""

  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!newDetention.fileNo) {
      errors.fileNo = "File no is required.";
    }

    if (!newDetention.officerName) {
      errors.officerName = "Officer name is required.";
    }

    if (!newDetention.dgdcOfficerName) {
      errors.dgdcOfficerName = "DGDC officer name is required.";
    }
    if (!newDetention.nop) {
      errors.nop = "NOP is required.";
    }
    if (!newDetention.partyId) {
      errors.partyId = "Party is required.";
    }
    if (!newDetention.dgdcOfficerName) {
      document.getElementById('dgdcOfficerName').classList.add('error-border');
    }

    if (!newDetention.fileNo) {
      document.getElementById('fileNo').classList.add('error-border');
    }
    if (!newDetention.officerName) {
      document.getElementById('officerName').classList.add('error-border');
    }
    if (!newDetention.nop) {
      document.getElementById('nop').classList.add('error-border');
    }
    if (!newDetention.partyId) {
      document.getElementById('partyId').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const formData = {
        fileNo: newDetention.fileNo,
        depositDate: newDetention.depositDate,
        parcelDetainedBy: newDetention.parcelDetainedBy,
        officerName: newDetention.officerName,
        officerDesignation: newDetention.officerDesignation,
        dgdcOfficerName: newDetention.dgdcOfficerName,
        dgdcOfficerDesignation: newDetention.dgdcOfficerDesignation,
        nop: newDetention.nop,
        parcelType: newDetention.parcelType,
        partyId: newDetention.partyId,
        remarks: newDetention.remarks,
        otherParty: newDetention.otherParty,
        status: newDetention.status,
      };

      const response = await axios.post(
        `http://${ipaddress}detention/add/${companyid}/${branchId}`,
        formData
      );
      toast.success("Detention added successfully", {
        position: "top-center",
      });
      console.log("Detention added successfully", response.data);

      setDetinations([...detinations, response.data]);
      fetchDetentions();
      resetForm();
      toggleModal();
    } catch (error) {
      console.error("Error adding detention", error);
    }
  };

  const reactPageName = "Detention List";

  const resetForm = () => {
    setNewDetention({
      fileNo: "",
      depositDate: "",
      parcelDetainedBy: "",
      officerName: "",
      officerDesignation: "",
      dgdcOfficerName: "",
      dgdcOfficerDesignation: "",
      nop: "",
      parcelType: "",
      partyId: "",
      remarks: "",
      otherParty: "",
      status: "",

      withdrawDate: "",
      withdrawOfficerName: "",
      withdrawOfficerDesignation: "",
      withdrawDgdcOfficerName: "",
      withdrawDgdcOfficerDesignation: "",
      withdrawNop: "",
      withdrawPartyId: "",
      withdrawRemarks: "",

      issueDate: "",
      issueOfficerName: "",
      issueOfficerDesignation: "",
      issueDgdcOfficerName: "",
      issueDgdcOfficerDesignation: "",
      issueNop: "",
      issueType: "",
      issueReason: "",
      issueRemarks: "",

      redepositeDate: "",
      redepositeOfficerName: "",
      redepositeOfficerDesignation: "",
      redepositeDgdcOfficerName: "",
      redepositeDgdcOfficerDesignation: "",
      redepositeNop: "",
      redepositeType: "",
      redepositeRemarks: "",
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditdata((prevDetention) => ({
      ...prevDetention,
      [name]: value,
    }));
  };

  const handleTagSubmit = () => {
    console.log("Button cliked");
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!editdata.fileNo) {
      errors.fileNo = "File no is required.";
    }

    if (!editdata.officerName) {
      errors.officerName = "Officer name is required.";
    }

    if (!editdata.dgdcOfficerName) {
      errors.dgdcOfficerName = "DGDC officer name is required.";
    }
    if (!editdata.nop) {
      errors.nop = "NOP is required.";
    }
    if (!editdata.partyId) {
      errors.partyId = "Party is required.";
    }
    if (!editdata.dgdcOfficerName) {
      document.getElementById('dgdcOfficerName').classList.add('error-border');
    }

    if (!editdata.fileNo) {
      document.getElementById('fileNo').classList.add('error-border');
    }
    if (!editdata.officerName) {
      document.getElementById('officerName').classList.add('error-border');
    }
    if (!editdata.nop) {
      document.getElementById('nop').classList.add('error-border');
    }
    if (!editdata.partyId) {
      document.getElementById('partyId').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await axios.put(
        `http://${ipaddress}detention/update/${editdata.detentionId}`,
        editdata,
        {
          headers: {
            "React-Page-Name": reactPageName,
          },
        }
      );

      fetchDetentions();
      resetForm();
      closeModalforReqidforupdate();
      // Optionally, reset the editHoliday state here
      toast.success("Data Updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error updating data!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const fetchDetentions = async () => {
    try {
      const response = await axios.get(
        `http://${ipaddress}detention/all?companyId=${companyid}&branchId=${branchId}`
      );
      setDetinations(response.data);
    } catch (error) {
      console.error("Error fetching parties:", error);
      // Handle error and display an error message if necessary.
    }
  };

  useEffect(() => {
    fetchDetentions();
  }, []);

  const [getpartyId, setGetpartyId] = useState({});

  const fetchPartyNames = async () => {
    try {
      const response = await fetch(
        `http://${ipaddress}parties/getAll/${companyid}/${branchId}`
      );
      const data = await response.json();
      const namesMap = {};
      data.forEach((party) => {
        namesMap[party.partyId] = party.partyName;
      });
      setGetpartyId(namesMap);
      setPartys(data);
    } catch (error) {
      console.error("Error fetching party names:", error);
    }
  };

  useEffect(() => {
    fetchPartyNames();
  }, []);

  function fetchCompanyName(companyId) {
    // Make an Axios GET request to retrieve the company name based on companyId
    return axios
      .get(`http://${ipaddress}detention/findCompanyname/${companyId}`)
      .then(function (response) {
        return response.data; // Return the retrieved company name
      })
      .catch(function (error) {
        console.error("Error fetching company name:", error);
        return ""; // Return an empty string or handle the error as needed
      });
  }
  function fetchExporterName(companyId, branchId, partyId) {
    // Make an Axios GET request to retrieve the company name based on companyId
    return axios
      .get(
        `http://${ipaddress}detention/findPartyName/${companyId}/${branchId}/${partyId}`
      )
      .then(function (response) {
        return response.data; // Return the retrieved company name
      })
      .catch(function (error) {
        console.error("Error fetching company name:", error);
        return ""; // Return an empty string or handle the error as needed
      });
  }

  function fetchBranchName(companyId, branchId) {
    // Make an Axios GET request to retrieve the branch name based on branchId
    return axios
      .get(
        `http://${ipaddress}detention/findBranchName/${companyId}/${branchId}`
      )
      .then(function (response) {
        return response.data; // Return the retrieved branch name
      })
      .catch(function (error) {
        console.error("Error fetching branch name:", error);
        return ""; // Return an empty string or handle the error as needed
      });
  }

  const generateXLS = async () => {
    const modifiedRecordList = await Promise.all(
      detinations.map(async (item, index) => {
        const companyname = await fetchCompanyName(item.companyId);
        const branchname = await fetchBranchName(item.companyId, item.branchId);
        const importerId = await fetchExporterName(
          item.companyId,
          item.branchId,
          item.partyId
        );
        return {
          "Sr.No": index + 1,
          "Company Name": companyname,
          "Branch Name": branchname,
          "FILE No": item.fileNo || "",
          "DEPOSITE DATE": formatedDate(item.depositDate) || "",
          "PARTY NAME'S": getpartyId[item.partyId] || "",
          "OTHER PARTY NAME'S": item.otherParty || "",
          "REMARKS": item.remarks || "",
          "STATUS": item.status || "", // Modify this to the actual field name
          "NO OF PARCELS": item.nop || "",
          "TYPE OF PARCELS":item.parcelType || "",
          
        };
      })
    );

    // // Calculate the total "SIR No" and "No of Pkgs"
    // const totalSIRNo = modifiedRecordList.reduce(
    //   (total, item) => total + (item["SIR NO"] ? 1 : 0),
    //   0
    // );

    const totalNoOfPkgs = modifiedRecordList.reduce(
      (total, item) => total + (item["NO OF PARCELS"] || 0),
      0
    );
    const distanceRow = {
      "Sr.No":"",
      "Company Name": "",
      "Branch Name": "",
      "FILE No": "",
      "DEPOSITE DATE": "",
      "PARTY NAME'S": "",
      "OTHER PARTY NAME'S": "",
      "REMARKS": "",
      "STATUS": "",
      "NO OF PARCELS":"",
      "TYPE OF PARCELS":"",
    };
    // Add a total row
    const totalRow = {
      "Sr.No":"Total",
      "Company Name": "",
      "Branch Name": "",
      "FILE No": "",
      "DEPOSITE DATE": "",
      "PARTY NAME'S": "",
      "OTHER PARTY NAME'S": "",
      "REMARKS": "",
      "STATUS": "",
      "NO OF PARCELS":totalNoOfPkgs,
      "TYPE OF PARCELS":"",
    };

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([
      distanceRow,
      ...modifiedRecordList,
      distanceRow, // Insert the distance row
      totalRow, // Insert the total row
    ]);

    // Add headers for all fields
    const headers = Object.keys(modifiedRecordList[0]);
    headers.forEach((header, index) => {
      worksheet[XLSX.utils.encode_cell({ r: 0, c: index })] = {
        t: "s",
        v: header,
        s: { font: { bold: true } },
      };
    });

    // Set column widths based on data
    const colWidths = headers.map((header) => ({
      wch: header.length + 2, // You can adjust the width as needed
    }));

    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Detentions");
    const xlsFile = XLSX.write(workbook, { type: "binary", bookType: "xls" });
    const blob = new Blob([s2ab(xlsFile)], {
      type: "application/vnd.ms-excel",
    });
    saveAs(blob, "detentions.xls");
  };  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  const [editdata, setEditdata] = useState({
    fileNo: newDetention.fileNo,
    depositDate: formatedDate(newDetention.depositDate),
    parcelDetainedBy: newDetention.parcelDetainedBy,
    officerName: newDetention.officerName,
    officerDesignation: newDetention.officerDesignation,
    dgdcOfficerName: newDetention.dgdcOfficerName,
    dgdcOfficerDesignation: newDetention.dgdcOfficerDesignation,
    nop: newDetention.nop,
    parcelType: newDetention.parcelType,
    partyId: newDetention.partyId,
    remarks: newDetention.remarks,
    status: newDetention.status,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = detinations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(detinations.length / itemsPerPage);

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
    <div className="Container" style={{ backgroundColor: "#f7f7f7" }}>
      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
        icon={faListCheck}
        style={{
          marginRight: '8px',
          color: 'black', // Set the color to golden
        }}
      />Detention List</h5>
      <div style={{ backgroundColor: "#f7f7f7" }}>

        <Card >
          <CardBody>


            <Row style={{ float: "right" }}>

              <Col>
                <Button
                  type="button"
                  style={{ marginRight: "10px" }}
                  className="allbutton"
                  variant="outline-success"
                  onClick={generateXLS}
                >
                  <FontAwesomeIcon icon={faFileCircleCheck} style={{ marginRight: '5px' }} />
                  XLS
                </Button>

                {/* <Button
                  style={{marginRight: "10px" }}
                  color="success"
                  onClick={generateXLS}
                ><FontAwesomeIcon icon={faFileCircleCheck } style={{ marginRight: '5px' }} />
                  XLS
                </Button> */}

                {/* <Button
              type="button"
              style={{marginRight: "5px" }}
              className="allbutton"
              variant="outline-primary"
              onClick={toggleModal}
              > <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
                Add Record
            </Button> */}

                <Button

                  color="outline-primary"
                  onClick={toggleModal}
                > <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
                  Add Record
                </Button>

              </Col>




            </Row>

            {/* 
              <Row style={{ float: "right" }}>
                <Button
                  style={{ float: "right", marginRight: "10px" }}
                  color="success"
                  onClick={generateXLS}
                >
                  XLS
                </Button>{" "}
              </Row> */}
          </CardBody>


          <CardBody>
            <Table striped responsive bordered>
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#BADDDA' }}>Si No.</th>
                  <th style={{ backgroundColor: '#BADDDA' }}>File No.</th>
                  <th style={{ backgroundColor: '#BADDDA' }}>Deposit Date</th>
                  <th style={{ backgroundColor: '#BADDDA' }}>Party Name</th>
                  <th style={{ backgroundColor: '#BADDDA' }}>
                    Other Party Name
                  </th>
                  <th style={{ backgroundColor: '#BADDDA' }}>Remarks</th>
                  <th style={{ backgroundColor: '#BADDDA' }}>Status</th>
                  <th style={{ backgroundColor: '#BADDDA' }}>
                    Number Of Parcels
                  </th>
                  <th style={{ backgroundColor: '#BADDDA' }}>
                    Type Of Parcels
                  </th>
                  <th style={{ backgroundColor: '#BADDDA' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((detination, index) => (
                  <tr key={detination.detentionId}>
                    <td>{detination.siNo}</td> {/* Serial number */}
                    <td>{detination.fileNo}</td>
                    <td>{formatedDate(detination.depositDate)}</td>
                    <td>
                      {typeof detination.partyId === 'string' && detination.partyId.startsWith('M') ? getpartyId[detination.partyId] : detination.partyId}
                    </td>
                    <td>{detination.otherParty}</td>
                    <td>{detination.remarks}</td>
                    <td>{detination.status}</td>
                    {/* {detination.status === "Deposited" ? detination.nop : detination.withdrawNop}
</td> */}
                    <td>{detination.nop}</td>
                    <td>{detination.parcelType}</td>
















                    <td className="table-column">
                    <Button
                        type="button"
                        variant="primary"
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <FontAwesomeIcon
                          icon={faAtom}
                          style={{ marginRight: "5px" }}
                        />
                        Action
                      </Button>
                      <ul className="dropdown-menu">
                        {detination.status === "Deposited" && (
                          <>
                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() => toggleissueModal(detination)}
                              ><FontAwesomeIcon icon={faArrowCircleRight} style={{ marginRight: "5px" }} />
                                Issue
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() => togalWithdrwa(detination)}
                              ><FontAwesomeIcon icon={faArrowCircleDown} style={{ marginRight: "5px" }} />
                                Withdraw
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() =>
                                  historytoggleEditModal(detination)
                                }
                              ><FontAwesomeIcon icon={faHistory} style={{ marginRight: "5px" }} />
                                View History
                              </Link>
                            </li>

                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() => toggleEditModal(detination)}
                              ><FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
                                Edit
                              </Link>
                            </li>
                          </>
                        )}

                        {detination.status === "Redeposited" && (
                          <>
                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() =>
                                  historytoggleEditModal(detination)
                                }
                              ><FontAwesomeIcon icon={faHistory} style={{ marginRight: "5px" }} />
                                View History
                              </Link>
                            </li>
                            {/* <li>
                              <Link
                                className="dropdown-item link"
                                onClick={printTagModal}
                              >
                                Print Tag
                              </Link>
                            </li> */}
                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() => toggleEditModal(detination)}
                              ><FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
                                Edit
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() => toggleissueModal(detination)}
                              ><FontAwesomeIcon icon={faArrowCircleRight} style={{ marginRight: "5px" }} />
                                Issue
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() => togalWithdrwa(detination)}
                              ><FontAwesomeIcon icon={faArrowCircleDown} style={{ marginRight: "5px" }} />
                                Withdraw
                              </Link>
                            </li>
                          </>
                        )}


                        <li>
                          <Link
                            className="dropdown-item link"
                            onClick={() => printTagModal(detination.detentionId, detination.fileNo, detination.nop, detination.depositDate, detination.withdrawDate, detination.partyId, detination.siNo)}
                          ><FontAwesomeIcon icon={faPrint} style={{ marginRight: "5px" }} />
                            Print Tag
                          </Link>
                        </li>


                        {detination.status === "Withdrawn" && (
                          <>
                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() =>
                                  historytoggleEditModal(detination)
                                }
                              ><FontAwesomeIcon icon={faHistory} style={{ marginRight: "5px" }} />
                                View History
                              </Link>
                            </li>
                           
                          </>
                        )}

                        {detination.status === "Issued" && (
                          <>
                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() =>
                                  historytoggleEditModal(detination)
                                }
                              ><FontAwesomeIcon icon={faHistory} style={{ marginRight: "5px" }} />
                                View History
                              </Link>
                            </li>

                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() =>
                                  toggleRedepositeModal(detination)
                                }
                              >
                                Redeposite
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() => toggleEditModal(detination)}
                              ><FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
                                Edit
                              </Link>
                            </li>
                          </>
                        )}


                        {/* <li>
                          <Link
                            className="dropdown-item link"
                            onClick={printTagModal()}
                          >
                            Print Tag
                          </Link>
                        </li> */}


                        {detination.status === "Partly Issued" && (
                          <>
                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() => toggleissueModal(detination)}
                              ><FontAwesomeIcon icon={faArrowCircleRight} style={{ marginRight: "5px" }} />
                                Issue
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() =>
                                  toggleRedepositeModal(detination)
                                }
                              >
                                Redeposite
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() =>
                                  historytoggleEditModal(detination)
                                }
                              ><FontAwesomeIcon icon={faHistory} style={{ marginRight: "5px" }} />
                                View History
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item link"
                                onClick={() => toggleEditModal(detination)}
                              ><FontAwesomeIcon icon={faEdit} style={{ marginRight: "5px" }} />
                                Edit
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
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
          </CardBody>
        </Card>
      </div>
      <Modal isOpen={modalOpen} toggle={toggleModal} style={{ maxWidth: 900 }}>
        <ModalHeader
          toggle={toggleModal}
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
        ><FontAwesomeIcon icon={faRecordVinyl} style={{ marginRight: 'px' }} />
          Add Detention Record
        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }} >
          <Form onSubmit={handleSubmit} style={{}} id="myfrom">
            <Card >
              <CardBody>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayName"
                          style={{ fontWeight: "bold" }}
                        >
                          File Number
                        </Label>
                      </div>
                      <Input
                        type="text"
                        id="fileNo"
                        name="fileNo"
                        // placeholder="Holiday Name"
                        value={newDetention.fileNo}
                        onChange={handleInputChange}
                        required
                      />
                      <div style={{ color: 'red' }} className="error-message">{formErrors.fileNo}</div>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <div div style={{ float: "left" }}>
                        <Label
                          htmlFor="depositDate"
                          style={{ fontWeight: "bold" }}
                        >
                          Date Of Deposite
                        </Label>
                      </div>
                      <div className="input-group">
                        <DatePicker
                          selected={newDetention.depositDate} // Set the selected date to BillGDate
                          onChange={(date) => {
                            if (date) {
                              setNewDetention({ ...newDetention, depositDate: date });
                            } else {
                              setNewDetention({ ...newDetention, depositDate: null });
                            }
                          }}
                          dateFormat="dd/MM/yyyy"
                          value={newDetention.depositDate}
                          className="form-control border-right-0 inputField"
                          customInput={<input style={{ width: '200%' }} />}
                          maxDate={new Date()}

                        />
                      </div>
                      {/* <Input
                        type="date"
                        // id="holidayDate"
                        name="depositDate"
                        // placeholder="Holiday date "
                        value={newDetention.depositDate}
                        onChange={handleInputChange}
                        required
                      /> */}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <div style={{ float: "left" }}>
                        <Label
                          htmlFor="parcelDetainedBy"
                          style={{ fontWeight: "bold" }}
                        >
                          Parcel Detained By
                        </Label>
                      </div>
                      <Input
                        type="select"
                        // id="holidayDay"
                        name="parcelDetainedBy"
                        // placeholder="Holiday Day"
                        value={newDetention.parcelDetainedBy}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="Customs ">Customs </option>
                        <option value="DR">DR</option>
                        <option value="CBI">CBI</option>
                        <option value="Liquidator">Bank Liquidator</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <div style={{ paddingTop: 18 }}>
              <Card>
                <ModalHeader  >
                  Deposited by
                </ModalHeader>
                <CardBody >
                  <Row>
                    <Col md={6} >
                      <FormGroup>
                        <div div style={{ float: "left" }}>
                          <Label
                            htmlFor="officerName"
                            style={{ fontWeight: "bold" }}
                          >
                            Officer Name
                          </Label>
                        </div>
                        <Input
                          type="text"
                          id="officerName"
                          name="officerName"
                          // placeholder="Holiday date "
                          value={newDetention.officerName}
                          onChange={handleInputChange}
                          required
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.officerName}</div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="officerDesignation"
                            style={{ fontWeight: "bold" }}
                          >
                            Officer Designation
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDay"
                          name="officerDesignation"
                          // placeholder="Holiday Day"
                          value={newDetention.officerDesignation}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>

            <div style={{ paddingTop: 18 }}>
              <Card>
                <ModalHeader  >
                  Recevied by
                </ModalHeader>
                <CardBody >
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <div div style={{ float: "left" }}>
                          <Label
                            htmlFor="dgdcOfficerName"
                            style={{ fontWeight: "bold" }}
                          >
                            DGDC Officer Name
                          </Label>
                        </div>
                        <Input
                          type="text"
                          id="dgdcOfficerName"
                          name="dgdcOfficerName"
                          // placeholder="Holiday date "
                          value={newDetention.dgdcOfficerName}
                          onChange={handleInputChange}
                          required
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.dgdcOfficerName}</div>

                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="dgdcOfficerDesignation"
                            style={{ fontWeight: "bold" }}
                          >
                            DGDC Officer Designation
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDay"
                          name="dgdcOfficerDesignation"
                          // placeholder="Holiday Day"
                          value={newDetention.dgdcOfficerDesignation}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
            <div style={{ paddingTop: 8 }}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <div div style={{ float: "left" }}>
                          <Label htmlFor="nop" style={{ fontWeight: "bold" }}>
                            No. of Box
                          </Label>
                        </div>
                        <Input
                          type="text"
                           id="nop"
                          name="nop"
                          // placeholder="Holiday date "
                          value={newDetention.nop}
                          onChange={handleInputChange}
                          required
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.nop}</div>

                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="parcelType"
                            style={{ fontWeight: "bold" }}
                          >
                            Type of Parcel
                          </Label>
                        </div>
                        <Input
                          type="select"
                          // id="holidayDay"
                          name="parcelType"
                          // placeholder="Holiday Day"
                          value={newDetention.parcelType}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select an option</option>
                          <option value="Export">Export</option>
                          <option value="Import">Import</option>
                          <option value="gate parcel">Gate Parcel</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="search" className="forlabel">
                          Party Name
                        </Label>
                        <select
                          id="partyId"
                          className="form-control form-select"
                          onChange={handleInputChange}
                          required
                          name="partyId"
                          value={newDetention.partyId}
                        >
                          <option value="">Select Party Name</option>
                          {partys.map((data, index) => (
                            <option key={index} value={data.partyId}>
                              {data.partyName}
                            </option>
                          ))}
                          <option value="Other Party">Other Party</option>
                        </select>
                        <div style={{ color: 'red' }} className="error-message">{formErrors.partyId}</div>

                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            Other Party
                          </Label>
                        </div>
                        {newDetention.partyId === "Other Party" ? (
                          <Input
                            type="text"
                            id="otherParty"
                            name="otherParty"
                            value={newDetention.otherParty}
                            onChange={handleInputChange}
                            disabled={false}
                          />
                        ) : (
                          <Input
                            type="text"
                            id="otherParty"
                            name="otherParty"
                            value={newDetention.otherParty}
                            onChange={handleInputChange}
                            disabled
                          />
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            Remarks:
                          </Label>
                        </div>
                        <Input
                          type="textarea"
                          id="holidayDay"
                          rows={5}
                          name="remarks"
                          // placeholder="Holiday Day"
                          value={newDetention.remarks}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <div className="d-flex justify-content-center">
            <Button color="success" onClick={handleSubmit} outline>
              <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
              Submit
            </Button>
          </div>
        </ModalFooter>

      </Modal>

      {/* #ffebcc // orange
      #f7f7f7 // grey
      #ebf2f9// light blue */}
      <Modal
        Modal
        isOpen={editModalOpen}
        onClose={closeModalforReqidforupdate}
        toggle={closeModalforReqidforupdate}
        style={{ maxWidth: "800px", wioverflow: "-moz-hidden-unscrollable" }}
      >
        <ModalHeader
          toggle={closeModalforReqidforupdate}
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
        >

          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
            icon={faPenClip}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          />  Update Detention Record</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <Form onSubmit={handleEditSubmit} style={{}} id="editForm">
            <Card >
              {/* <div style={{paddingLeft:18,paddingRight:9,paddingTop:9}}>
             <h5 style={{float:"left"}}>Add Holiday</h5>
             </div> */}

              <CardBody>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayName"
                          style={{ fontWeight: "bold" }}
                        >
                          File Number
                        </Label>
                      </div>
                      <Input
                        type="text"
                        // id="holidayName"
                        name="fileNo"
                        // placeholder="Holiday Name"
                        value={editdata.fileNo}
                        onChange={handleEditInputChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <div div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayDate"
                          style={{ fontWeight: "bold" }}
                        >
                          Date Of Deposite
                        </Label>
                      </div>
                      <div className="input-group">
                        <DatePicker
                          selected={editdata.depositDate} // Set the selected date to BillGDate
                          onChange={(date) => {
                            if (date) {
                              setEditdata({ ...editdata, depositDate: date });
                            } else {
                              setNewDetention({ ...editdata, depositDate: null });
                            }
                          }}
                          dateFormat="dd/MM/yyyy"
                          value={editdata.depositDate}
                          className="form-control border-right-0 inputField"
                          customInput={<input style={{ width: '25vw' }} />}
                        />
                      </div>
                      {/* <Input
                        type="date"
                        // id="holidayDate"
                        name="depositDate"
                        // placeholder="Holiday date "
                        value={formatedDate(editdata.depositDate)}
                        onChange={handleEditInputChange}
                        required
                      /> */}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayDay"
                          style={{ fontWeight: "bold" }}
                        >
                          Parcle Detained By
                        </Label>
                      </div>
                      <Input
                        type="select"
                        // id="holidayDay"
                        name="parcelDetainedBy"
                        // placeholder="Holiday Day"
                        value={editdata.parcelDetainedBy}
                        onChange={handleEditInputChange}
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="Customs ">Customs </option>
                        <option value="DR">DR</option>
                        <option value="CBI">CBI</option>
                        <option value="Liquidator">Bank Liquidator</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <div style={{ paddingTop: 18 }}>
              <Card >
                <ModalHeader >
                  Depostited by
                </ModalHeader>
                <CardBody >
                  <Row>
                    <Col md={6} >
                      <FormGroup>
                        <div div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDate"
                            style={{ fontWeight: "bold" }}
                          >
                            Officer Name
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDate"
                          name="officerName"
                          // placeholder="Holiday date "
                          value={editdata.officerName}
                          onChange={handleEditInputChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6} >
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            Officer Designation
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDay"
                          name="officerDesignation"
                          // placeholder="Holiday Day"
                          value={editdata.officerDesignation}
                          onChange={handleEditInputChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>

            <div style={{ paddingTop: 18 }}>
              <Card>
                <ModalHeader  >
                  Recevied by
                </ModalHeader>
                <CardBody >
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <div div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDate"
                            style={{ fontWeight: "bold" }}
                          >
                            DGDC Officer Name
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDate"
                          name="dgdcOfficerName"
                          // placeholder="Holiday date "
                          value={editdata.dgdcOfficerName}
                          onChange={handleEditInputChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            DGDC Officer Designation
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDay"
                          name="dgdcOfficerDesignation"
                          // placeholder="Holiday Day"
                          value={editdata.dgdcOfficerDesignation}
                          onChange={handleEditInputChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
            <div style={{ paddingTop: 18 }}>
              <Card >
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <div div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDate"
                            style={{ fontWeight: "bold" }}
                          >
                            No. Of Box:
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDate"
                          name="nop"
                          // placeholder="Holiday date "
                          value={editdata.nop}
                          onChange={handleEditInputChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            Type Of Parcel:
                          </Label>
                        </div>
                        <Input
                          type="select"
                          // id="holidayDay"
                          name="parcelType"
                          // placeholder="Holiday Day"
                          value={editdata.parcelType}
                          onChange={handleEditInputChange}
                          required
                        >
                          <option value="">Select an option</option>
                          <option value="Export">Export</option>
                          <option value="Import">Import</option>
                          <option value="gate parcel">Gate Parcel</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="search" className="forlabel">
                          Party Name
                        </Label>
                        <select
                          id="hold"
                          className="form-control form-select"
                          onChange={handleEditInputChange}
                          required
                          name="partyId"
                          value={editdata.partyId}
                        >
                          <option value="">Select Party Name</option>
                          {partys.map((data, index) => (
                            <option key={index} value={data.partyId}>
                              {data.partyName}
                            </option>
                          ))}
                          <option value="Other Party">Other Party</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md={6} >
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            Other Party
                          </Label>
                        </div>
                        {editdata.partyId === "Other Party" ? (
                          <Input
                            type="text"
                            id="otherParty"
                            name="otherParty"
                            value={editdata.otherParty}
                            onChange={handleEditInputChange}
                            disabled={false}
                          />
                        ) : (
                          <Input
                            type="text"
                            id="otherParty"
                            name="otherParty"
                            value={editdata.otherParty}
                            onChange={handleEditInputChange}
                            disabled
                          />
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            Remarks
                          </Label>
                        </div>
                        <Input
                          type="textarea"
                          id="holidayDay"
                          rows={5}
                          name="remarks"
                          // placeholder="Holiday Day"
                          value={editdata.remarks}
                          onChange={handleEditInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <Button color="success" form="editForm" type="submit" outline>
            <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} /> Save
          </Button>
          <Button
            color="danger"
            onClick={closeModalforReqidforupdate}
            outline
          > <FontAwesomeIcon icon={faArrowAltCircleRight} style={{ marginRight: "5px" }} />
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        Modal
        isOpen={viewHistoryModal}
        onClose={closeModalforReqidforHistory}
        toggle={closeModalforReqidforHistory}
        style={{ maxWidth: "800px", wioverflow: "-moz-hidden-unscrollable" }}
      >
        <ModalHeader
          toggle={closeModalforReqidforHistory}
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
        ><h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
          icon={faHistory}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        /> History of Detention</h5>

        </ModalHeader>
        <ModalBody >
          <Form onSubmit={handleSubmit} style={{}} id="editForm">
            {/* <div style={{paddingLeft:18,paddingRight:9,paddingTop:9}}>
             <h5 style={{float:"left"}}>Add Holiday</h5>
             </div> */}

            <Row>
              <Col md={6}>
                <FormGroup>
                  <div style={{ float: "left" }}>
                    <Label htmlFor="holidayName" style={{ fontWeight: "bold" }}>
                      Serial Number
                    </Label>
                  </div>
                  <Input
                    type="text"
                    // id="holidayName"
                    name="siNo"
                    readOnly
                    disabled
                    // placeholder="Holiday Name"
                    value={historydata.siNo}
                    // onChange={handleHistoryChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <div style={{ float: "left" }}>
                    <Label htmlFor="holidayName" style={{ fontWeight: "bold" }}>
                      File Number
                    </Label>
                  </div>
                  <Input
                    type="text"
                    // id="holidayName"
                    name="fileNo"
                    readOnly
                    disabled
                    // placeholder="Holiday Name"
                    value={historydata.fileNo}
                    // onChange={handleEditInputChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <Table striped responsive bordered>
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#BADDDA' }} >Date</th>
                  <th style={{ backgroundColor: '#BADDDA' }} >
                    {" "}
                    Transaction Status
                  </th>
                  <th style={{ backgroundColor: '#BADDDA' }} >Officer Name</th>
                  <th style={{ backgroundColor: '#BADDDA' }} >Remarks</th>
                </tr>
              </thead>
              <tbody>
                {historytable.map((data, index) => (
                  <tr key={index}>
                    <td>{formatedDate(data.date)}</td>
                    <td>{data.status}</td>
                    <td>{data.officerName}</td>
                    <td>{data.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Form>
        </ModalBody>
        <ModalFooter style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
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
                  Print Detention History
                </Button>
              </a>
            )}
          </BlobProvider>
        </ModalFooter>
      </Modal>

      <Modal
        Modal
        isOpen={PrintModal}
        onClose={closeModalforReqidPrint}
        toggle={closeModalforReqidPrint}
        style={{ maxWidth: "800px", wioverflow: "-moz-hidden-unscrollable" }}
      >
        <ModalHeader
          toggle={closeModalforReqidPrint}
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
        > <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
          icon={faPrint}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        />Print Tag</h5>

        </ModalHeader>
        <ModalBody  >
          <Form onSubmit={handleTagSubmit} style={{}} id="editForm">
            {/* <div style={{paddingLeft:18,paddingRight:9,paddingTop:9}}>
             <h5 style={{float:"left"}}>Add Holiday</h5>
             </div> */}

            <Row>
              <Col md={6}>
                <FormGroup>
                  <div style={{ float: "left" }}>
                    <Label htmlFor="holidayName" style={{ fontWeight: "bold" }}>
                      How Many Tag You Want To Print
                    </Label>
                  </div>
                  <Input
                    type="number"                   
                    name="printNumber"
                    value={printNumber}
                    onChange={(e)=>setPrintNumber(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </ModalBody>
        <ModalFooter style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          {/* <Button color="success" form="editForm" type="submit" outline>
            <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
            Submit
          </Button> */}
          <Button color="primary"  outline  onClick={(e) => printBarcode(modalData.detentionId,modalData.fileNo,printNumber,modalData.depositDate,modalData.withdrawDate,"N",modalData.siNo,)}>
          <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
            Submit
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        Modal
        isOpen={withdrawModalOpen}
        onClose={closeModalforWithraw}
        toggle={closeModalforWithraw}
        style={{ maxWidth: "800px", wioverflow: "-moz-hidden-unscrollable" }}
      >
        <ModalHeader
          toggle={closeModalforWithraw}
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
        >
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
            icon={faBox}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Withdraw Detention Parcel</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <Form onSubmit={handleWithdrawSubmit} style={{}} id="editForm">
            <Card style={{ paddingBottom: 9 }}>
              {/* <div style={{paddingLeft:18,paddingRight:9,paddingTop:9}}>
             <h5 style={{float:"left"}}>Add Holiday</h5>
             </div> */}

              <CardBody>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayName"
                          style={{ fontWeight: "bold" }}
                        >
                          Serial Nomber
                        </Label>
                      </div>
                      <Input
                        type="text"
                        // id="holidayName"
                        name="siNo"
                        readOnly
                        disabled
                        // placeholder="Holiday Name"
                        value={withdrawdata.siNo}
                        onChange={handleWithdrawChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayName"
                          style={{ fontWeight: "bold" }}
                        >
                          File Number:
                        </Label>
                      </div>
                      <Input
                        type="text"
                        // id="holidayName"
                        name="fileNo"
                        disabled
                        readOnly
                        // placeholder="Holiday Name"
                        value={withdrawdata.fileNo}
                        onChange={handleWithdrawChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <div div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayDate"
                          style={{ fontWeight: "bold" }}
                        >
                          Date Of Withdraw
                        </Label>
                      </div>

                      <div className="input-group">
                        <DatePicker
                          selected={withdrawdata.withdrawDate} // Set the selected date to BillGDate
                          onChange={(date) => {
                            if (date) {
                              setWithdrawData({ ...withdrawdata, withdrawDate: date });
                            } else {
                              setWithdrawData({ ...withdrawdata, withdrawDate: null });
                            }
                          }}
                          dateFormat="dd/MM/yyyy"
                          value={withdrawdata.withdrawDate}
                          className="form-control border-right-0 inputField"
                          customInput={<input style={{ width: '25vw' }} />}
                          maxDate={new Date()}
                        />
                      </div>
                      {/* <Input
                        type="date"
                        // id="holidayDate"
                        name="withdrawDate"
                        // placeholder="Holiday date "
                        value={formatedDate(withdrawdata.withdrawDate)}
                        onChange={handleWithdrawChange}
                        required
                      /> */}
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <div style={{ paddingTop: 18 }}>
              <Card>
                <ModalHeader   >
                  Withdrawn by
                </ModalHeader>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <div div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDate"
                            style={{ fontWeight: "bold" }}
                          >
                            Officer Name
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDate"
                          name="withdrawOfficerName"
                          // placeholder="Holiday date "
                          value={withdrawdata.withdrawOfficerName}
                          onChange={handleWithdrawChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            Officer Designation:
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDay"
                          name="withdrawOfficerDesignation"
                          // placeholder="Holiday Day"
                          value={withdrawdata.withdrawOfficerDesignation}
                          onChange={handleWithdrawChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>

            <div style={{ paddingTop: 18 }}>
              <Card>
                <ModalHeader >
                  Withdrawn from
                </ModalHeader>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <div div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDate"
                            style={{ fontWeight: "bold" }}
                          >
                            DGDC Officer Name
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDate"
                          name="withdrawDgdcOfficerName"
                          // placeholder="Holiday date "
                          value={withdrawdata.withdrawDgdcOfficerName}
                          onChange={handleWithdrawChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            DGDC Officer Designation:
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDay"
                          name="withdrawDgdcOfficerDesignation"
                          // placeholder="Holiday Day"
                          value={withdrawdata.withdrawDgdcOfficerDesignation}
                          onChange={handleWithdrawChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
            <div style={{ paddingTop: 18 }}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <div div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDate"
                            style={{ fontWeight: "bold" }}
                          >
                            No. Of Box:
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDate"
                          name="withdrawNop"
                          // placeholder="Holiday date "
                          value={withdrawdata.withdrawNop}
                          onChange={handleWithdrawChange}
                          required
                        />
                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label for="search" className="forlabel">
                          Party Name
                        </Label>
                        <select
                          id="hold"
                          className="form-control form-select"
                          onChange={handleWithdrawChange}
                          required
                          name="partyId"
                          value={withdrawdata.partyId}
                        >
                          <option value="">Select Party Name</option>
                          {partys.map((data, index) => (
                            <option key={index} value={data.partyId}>
                              {data.partyName}
                            </option>
                          ))}
                          <option value="Other Party">Other Party</option>
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            Other Party
                          </Label>
                        </div>
                        {withdrawdata.partyId === "Other Party" ? (
                          <Input
                            type="text"
                            id="otherParty"
                            name="otherParty"
                            value={withdrawdata.otherParty}
                            onChange={handleWithdrawChange}
                            disabled={false}
                          />
                        ) : (
                          <Input
                            type="text"
                            id="otherParty"
                            name="otherParty"
                            value={withdrawdata.otherParty}
                            onChange={handleWithdrawChange}
                            disabled
                          />
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            Remarks:
                          </Label>
                        </div>
                        <Input
                          type="textarea"
                          id="holidayDay"
                          rows={5}
                          name="withdrawRemarks"
                          // placeholder="Holiday Day"
                          value={withdrawdata.withdrawRemarks}
                          onChange={handleWithdrawChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <Button color="success" form="editForm" type="submit" outline>
            Withdraw
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        Modal
        isOpen={issueModalOpen}
        onClose={closeModalforReqidforIssue}
        toggle={closeModalforReqidforIssue}
        style={{ maxWidth: "800px", wioverflow: "-moz-hidden-unscrollable" }}
      >
        <ModalHeader
          toggle={closeModalforReqidforIssue}
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
        > <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
          icon={faGifts}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        />Issue Detention Parcel</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <Form onSubmit={handleIssueSubmit} style={{}} id="editForm">
            <Card style={{ paddingBottom: 9 }}>
              {/* <div style={{paddingLeft:18,paddingRight:9,paddingTop:9}}>
             <h5 style={{float:"left"}}>Add Holiday</h5>
             </div> */}

              <CardBody>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayName"
                          style={{ fontWeight: "bold" }}
                        >
                          Serial Nomber
                        </Label>
                      </div>
                      <Input
                        type="text"
                        // id="holidayName"
                        name="siNo"
                        readOnly
                        disabled
                        // placeholder="Holiday Name"
                        value={issuedata.siNo}
                        onChange={handleIssueChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayName"
                          style={{ fontWeight: "bold" }}
                        >
                          File Number
                        </Label>
                      </div>
                      <Input
                        type="text"
                        // id="holidayName"
                        name="fileNo"
                        disabled
                        readOnly
                        // placeholder="Holiday Name"
                        value={issuedata.fileNo}
                        onChange={handleIssueChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <div div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayDate"
                          style={{ fontWeight: "bold" }}
                        >
                          Date Of Issue
                        </Label>
                      </div>

                      <div className="input-group">
                        <DatePicker
                          selected={issuedata.issueDate} // Set the selected date to BillGDate
                          onChange={(date) => {
                            if (date) {
                              setIssueData({ ...issuedata, issueDate: date });
                            } else {
                              setIssueData({ ...issuedata, issueDate: null });
                            }
                          }}
                          dateFormat="dd/MM/yyyy"
                          value={issuedata.issueDate}
                          className="form-control border-right-0 inputField"
                          customInput={<input style={{ width: '25vw' }} />}
                          maxDate={new Date()}
                        />
                      </div>
                      {/* <Input
                        type="date"
                        // id="holidayDate"
                        name="issueDate"
                        // placeholder="Holiday date "
                        value={formatedDate(issuedata.issueDate)}
                        onChange={handleIssueChange}
                        required
                      /> */}
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <div style={{ paddingTop: 18 }}>
              <Card>
                <ModalHeader >
                  Issued to
                </ModalHeader>
                <CardBody>
                  <Row>
                    <Col md={6} >
                      <FormGroup>
                        <div div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDate"
                            style={{ fontWeight: "bold" }}
                          >
                            Officer Name
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDate"
                          name="issueOfficerName"
                          // placeholder="Holiday date "
                          value={issuedata.issueOfficerName}
                          onChange={handleIssueChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            Officer Designation:
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDay"
                          name="issueOfficerDesignation"
                          // placeholder="Holiday Day"
                          value={issuedata.issueOfficerDesignation}
                          onChange={handleIssueChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>

            <div style={{ paddingTop: 18 }}>
              <Card>
                <ModalHeader >
                  Issued by
                </ModalHeader>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <div div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDate"
                            style={{ fontWeight: "bold" }}
                          >
                            DGDC Officer Name
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDate"
                          name="issueDgdcOfficerName"
                          // placeholder="Holiday date "
                          value={issuedata.issueDgdcOfficerName}
                          onChange={handleIssueChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            DGDC Officer Designation
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDay"
                          name="issueDgdcOfficerDesignation"
                          // placeholder="Holiday Day"
                          value={issuedata.issueDgdcOfficerDesignation}
                          onChange={handleIssueChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
            <div style={{ paddingTop: 18 }}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <div div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDate"
                            style={{ fontWeight: "bold" }}
                          >
                            No. Of Box
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDate"
                          name="issueNop"
                          // placeholder="Holiday date "
                          value={issuedata.issueNop}
                          onChange={handleIssueChange}
                          required
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="parcelType"
                            style={{ fontWeight: "bold" }}
                          >
                            Type Of Issue
                          </Label>
                        </div>
                        <Input
                          type="select"
                          // id="holidayDay"
                          name="issueType"
                          // placeholder="Holiday Day"
                          value={issuedata.issueType}
                          onChange={handleIssueChange}
                          required
                        >
                          <option value="">Select an option</option>
                          <option value="Full">Full</option>
                          <option value="Part">Part</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            Reason For Issue
                          </Label>
                        </div>
                        <Input
                          type="textarea"
                          id="holidayDay"
                          rows={5}
                          name="issueReason"
                          // placeholder="Holiday Day"
                          value={issuedata.issueReason}
                          onChange={handleIssueChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            Remarks
                          </Label>
                        </div>
                        <Input
                          type="textarea"
                          id="holidayDay"
                          rows={5}
                          name="issueRemarks"
                          // placeholder="Holiday Day"
                          value={issuedata.issueRemarks}
                          onChange={handleIssueChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <Button color="success" form="editForm" type="submit" outline>
            Issue
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        Modal
        isOpen={redepositeModalOpen}
        onClose={closeModalforReqidforRedeposite}
        toggle={closeModalforReqidforRedeposite}
        style={{ maxWidth: "800px", wioverflow: "-moz-hidden-unscrollable" }}
      >
        <ModalHeader
          toggle={closeModalforReqidforRedeposite}
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
        >
          <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font' }} > <FontAwesomeIcon
            icon={faGift}
            style={{
              marginRight: '8px',
              color: 'black', // Set the color to golden
            }}
          /> Redeposit Detention Parcel</h5>

        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <Form onSubmit={handleRedepositeSubmit} style={{}} id="editForm">
            <Card style={{ paddingBottom: 9 }}>


              <CardBody>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayName"
                          style={{ fontWeight: "bold" }}
                        >
                          Serial Nomber
                        </Label>
                      </div>
                      <Input
                        type="text"
                        // id="holidayName"
                        name="siNo"
                        readOnly
                        disabled
                        // placeholder="Holiday Name"
                        value={redepositedata.siNo}
                        onChange={handleRedepositeChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayName"
                          style={{ fontWeight: "bold" }}
                        >
                          File Number:
                        </Label>
                      </div>
                      <Input
                        type="text"
                        // id="holidayName"
                        name="fileNo"
                        disabled
                        readOnly
                        // placeholder="Holiday Name"
                        value={redepositedata.fileNo}
                        onChange={handleRedepositeChange}
                        required
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <div div style={{ float: "left" }}>
                        <Label
                          htmlFor="holidayDate"
                          style={{ fontWeight: "bold" }}
                        >
                          Date Of Redeposite
                        </Label>
                      </div>
                      <div className="input-group">
                        <DatePicker
                          selected={redepositedata.redepositeDate} // Set the selected date to BillGDate
                          onChange={(date) => {
                            if (date) {
                              setRedepositeData({ ...redepositedata, redepositeDate: date });
                            } else {
                              setRedepositeData({ ...redepositedata, redepositeDate: null });
                            }
                          }}
                          dateFormat="dd/MM/yyyy"
                          value={redepositedata.redepositeDate}
                          className="form-control border-right-0 inputField"
                          customInput={<input style={{ width: '25vw' }} />}
                          maxDate={new Date()}
                        />
                      </div>

                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <div style={{ paddingTop: 18 }}>
              <Card>
                <ModalHeader >
                  Redeposited by
                </ModalHeader>
                <CardBody>
                  <Row>
                    <Col md={6} >
                      <FormGroup>
                        <div div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDate"
                            style={{ fontWeight: "bold" }}
                          >
                            Officer Name
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDate"
                          name="redepositeOfficerName"
                          // placeholder="Holiday date "
                          value={redepositedata.redepositeOfficerName}
                          onChange={handleRedepositeChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            Officer Designation
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDay"
                          name="redepositeOfficerDesignation"
                          // placeholder="Holiday Day"
                          value={redepositedata.redepositeOfficerDesignation}
                          onChange={handleRedepositeChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>

            <div style={{ paddingTop: 18 }}>
              <Card>
                <ModalHeader >
                  Received by
                </ModalHeader>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <div div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDate"
                            style={{ fontWeight: "bold" }}
                          >
                            DGDC Officer Name
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDate"
                          name="redepositeDgdcOfficerName"
                          // placeholder="Holiday date "
                          value={redepositedata.redepositeDgdcOfficerName}
                          onChange={handleRedepositeChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            DGDC Officer Designation
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDay"
                          name="redepositeDgdcOfficerDesignation"
                          // placeholder="Holiday Day"
                          value={
                            redepositedata.redepositeDgdcOfficerDesignation
                          }
                          onChange={handleRedepositeChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
            <div style={{ paddingTop: 18 }}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <div div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDate"
                            style={{ fontWeight: "bold" }}
                          >
                            No. Of Box
                          </Label>
                        </div>
                        <Input
                          type="text"
                          // id="holidayDate"
                          name="redepositeNop"
                          // placeholder="Holiday date "
                          value={redepositedata.redepositeNop}
                          onChange={handleRedepositeChange}
                          required
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="parcelType"
                            style={{ fontWeight: "bold" }}
                          >
                            Type Of Issue
                          </Label>
                        </div>
                        <Input
                          type="select"
                          // id="holidayDay"
                          name="redepositeType"
                          // placeholder="Holiday Day"
                          value={redepositedata.redepositeType}
                          onChange={handleRedepositeChange}
                          required
                        >
                          <option value="">Select an option</option>
                          <option value="Full">Full</option>
                          <option value="Part">Part</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <div style={{ float: "left" }}>
                          <Label
                            htmlFor="holidayDay"
                            style={{ fontWeight: "bold" }}
                          >
                            Remarks
                          </Label>
                        </div>
                        <Input
                          type="textarea"
                          id="holidayDay"
                          rows={5}
                          name="redepositeRemarks"
                          // placeholder="Holiday Day"
                          value={redepositedata.redepositeRemarks}
                          onChange={handleRedepositeChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <Button color="success" form="editForm" type="submit" outline>
            Redeposite
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
