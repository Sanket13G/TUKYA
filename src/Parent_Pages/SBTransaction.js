import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext,useRef } from "react";
import axios from "axios";
import "./parent.css";

import {
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Toast,
} from "reactstrap";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlaneDeparture,
  faSave,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import ipaddress from "../Components/IpAddress";
export default function SBTransaction() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
 const [getAllFlight,setGetAllFlight] = useState([]);
 const[getAirlineName,setGetAirlineName]=useState([]);
  const location = useLocation();
  const selectedItem = location.state.selectedItem;

  console.log(selectedItem);

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
    login,
    logout,
  } = useContext(AuthContext);
  const [allpartydata,setAllpartydata] = useState([]);
  const initialFormData = {
    companyId: companyid,
    branchId: branchId,
    sbNo: "",
    sbRequestId: "",
    sbDate: new Date(),
    iecCode: '',
    entityId: " ",
    nameOfExporter: "",
    serNo: "",
    serDate: "",
    grossWeight: "",
    uomGrossWeight: "",
    countryOfDestination: "",
    portOfDestination: "",
    airwayBillNo: "",
    descriptionOfGoods: "",
    nsdlStatus: "",
    dgdcStatus: "",
    chaNo: "",
    chaName: "",
    consoleAgent: "",
    fobValueInINR: "",
    noOfPackages: "",
    uomOfPackages: "",
    airlineName: "",
    flightNo: "",
    flightDate: "",
    status: "",
    createdBy: "",
    editedBy: "",
    approvedBy: "",
  };

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        ...selectedItem,
      });
    }
  }, [selectedItem]);

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
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    const updatedFormData = {
      ...formData,
      editedBy: userId, // You can replace this with the actual value from context
      createdBy: userId, // You can replace this with the actual value from context
    };

    const errors = {};

if (!updatedFormData.sbRequestId) {
  errors.sbRequestId = "SB Request Id is required.";
}

if (!updatedFormData.sbNo) {
  errors.sbNo = "SB No is required.";
}

if (!updatedFormData.sbDate) {
  errors.sbDate = "SB Date is required.";
}

if (!updatedFormData.airlineCode) {
  errors.airlineCode = "Flight No is required.";
}

if (!updatedFormData.flightDate) {
  errors.flightDate = "Flight Date is required.";
}

if (!updatedFormData.nameOfExporter) {
  errors.nameOfExporter = "Name of exporter is required.";
}




if (!updatedFormData.sbNo) {
  document.getElementById('sbNo').classList.add('error-border');
}
if (!updatedFormData.sbDate) {
  document.getElementById('sbDate').classList.add('error-border');
}
if (!updatedFormData.sbRequestId) {
  document.getElementById('sbRequestId').classList.add('error-border');
}
if (!updatedFormData.flightDate) {
  document.getElementById('flightDate').classList.add('error-border');
}
if (!updatedFormData.airlineCode) {
  document.getElementById('airlineCode').classList.add('error-border');
}
if (!updatedFormData.nameOfExporter) {
  document.getElementById('nameOfExporter').classList.add('error-border');
}
if (Object.keys(errors).length > 0) {
  setFormErrors(errors);
  return;
}
    updatedFormData.flightNo = getAirlineName.flightNo;
     updatedFormData.airlineName = getSingleairlinename;
     updatedFormData.iecCode = allpartydata.iecNo;
     updatedFormData.entityId = allpartydata.entityId;
    // Clear error messages
    setFormErrors({ sbRequestId: "", sbNo: "" });

    axios
      .post(`http://${ipaddress}export/save1`, updatedFormData)
      .then((response) => {
        // console.log(response.data); // Print the form data to the console
        toast.success("New entry add successfully",{
          autoClose:700
        });
        setFormData(response.data);
      })
      .catch((error) => {
         toast.error("Data already present",{
          autoClose:700
         })
      });
    // console.log(updatedFormData); // Print the form data to the console
  };

  const handleSave = (e) => {
    const updatedFormData = {
      ...formData,
      approvedBy: userId, // You can replace this with the actual value from context
      editedBy: userId, // You can replace this with the actual value from context
      createdBy: userId, // You can replace this with the actual value from context
    };

    axios
      .post(`http://${ipaddress}export/submit`, updatedFormData)
      .then((response) => {
        // console.log(response.data); // Print the form data to the console

        setFormData(response.data);
        toast.success("Shipping Bill Details Added Successfully", "success");
      });

    setFormData(updatedFormData);

    // console.log(updatedFormData); // Print the form data to the console
  };
  const [selectedDate, setSelectedDate] = useState('');

  const [errors, setErrors] = useState({});

  const resetFormData = () => {
    setIsReadOnly(false); // Enable editing when "Clear" is clicked
    setGetcreated('');
    setFormData(initialFormData);
    setAllpartydata([]);
    getFlightlist();
    setSingleieccode('');
    setGetAllFlight([]);
    setFormErrors({
      sbRequestId: "",
      sbNo: "",
      sbDate: "",
      airlineCode: "",
      flightDate: "",
      nameOfExporter: "",
      dgdcStatus: "",
    })
    document.getElementById('sbRequestId').classList.remove('error-border');
    document.getElementById('sbNo').classList.remove('error-border');
    document.getElementById('sbDate').classList.remove('error-border');
    document.getElementById('airlineCode').classList.remove('error-border');
    document.getElementById('flightDate').classList.remove('error-border');
    document.getElementById('nameOfExporter').classList.remove('error-border');
    document.getElementById('dgdcStatus').classList.remove('error-border');
    document.getElementById('nsdlStatus').classList.remove('error-border');
  };

  const handleDateChange = (date) => {
      setSelectedDate(date);

      setFormData({
        ...formData,
        sbDate: date,
      })

      // const updatedFormData = {
      //   ...formData, // Copy all properties from initialFormData
      //   sbDate: date, // Update the sbDate property with the new value
      // };
      // setFormData(updatedFormData);
    }


    
  const handleFlightDateChange = (date) => {
    setSelectedDate(date);

    setFormData({
      ...formData,
      flightDate: date,
    })

  
  }

  const [isReadOnly, setIsReadOnly] = useState(true);
  const today = new Date(); // Today's date

  const [JarListDtlDGDC, setJarListDtlDGDC] = useState([]);

  useEffect(() => {
    getlist();
  }, []);

  const getlist = () => {
    axios
      .get(`http://${ipaddress}jardetail/jarIdList/${"J00009"}/${companyid}`)
      .then((response) => {
        // console.log("GET list response:", response.data);
        setJarListDtlDGDC(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  const [JarListDtlConsole, setJarListDtlConsole] = useState([]);

  useEffect(() => {
    getlistConsole();
  }, []);

  const getlistConsole = () => {
    axios
      .get(`http://${ipaddress}jardetail/jarIdList/${"J00007"}/${companyid}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setJarListDtlConsole(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
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
      console.error("Error fetching party names:", error);
    }
  };


  useEffect(()=>{
   fetchPartyNames();
},[companyid,branchId])

const [getpid,setPid]=useState('');

const handlePartyId = (e) =>{
   setPid(e.target.value);
}

const getpartyid = () => {
  
  axios
    .get(`http://${ipaddress}parties/getpartybyid/${companyid}/${branchId}/${formData.nameOfExporter}`)
    .then((response) => {
      // console.log("GET list response:", response.data);
      setAllpartydata(response.data); // Store the list in the state
      
    })
    .catch((error) => {
      console.error("GET list error:", error);
    });
};

useEffect(() =>{
  getpartyid();
},[companyid,branchId,formData.nameOfExporter])

const getFlightlist = () => {
  getSingleFlightlist();
  axios
    .get(`http://${ipaddress}Airline/list/${companyid}/${branchId}`)
    .then((response) => {
      // console.log("GET list response:", response.data);
      setGetAllFlight(response.data); // Store the list in the state
      
    })
    .catch((error) => {
      console.error("GET list error:", error);
    });
};

useEffect(() =>{
  getFlightlist();
},[companyid,branchId])


// console.log("floghtNo ",formData.flightNo);


const getSingleFlightlist = () => {
  axios
    .get(`http://${ipaddress}Airline/find1/${companyid}/${branchId}/${formData.airlineCode}`)
    .then((response) => {
      // console.log("GET list response:", response.data);
      setGetAirlineName(response.data); // Store the list in the state
      //formData.airlineName(response.data((data) => data.airlineName) )
      // console.log("single ",getAirlineName);
    })
    .catch((error) => {
      console.error("GET list error:", error);
    });
};

useEffect(() =>{
  getSingleFlightlist();
},[companyid,branchId,formData.airlineCode])

const [getSingleairlinename, setGetcreated] = useState('');
const createBySpanRef = useRef('');
useEffect(() => {
  if (createBySpanRef.current) {
    const createdByValue = createBySpanRef.current.textContent;
    setGetcreated(createdByValue);
    // Now you can use the 'approvedByValue' variable to store or manipulate the value
    console.log('Approved By Value:', createdByValue);
  }
}, [getAirlineName.airlineName]);

const [getSingleentity, setSingleentity] = useState('');
const createEntityBySpanRef = useRef('');
useEffect(() => {
  if (createEntityBySpanRef.current) {
    const createdByValue = createEntityBySpanRef.current.textContent;
    setSingleentity(createdByValue);
    // Now you can use the 'approvedByValue' variable to store or manipulate the value
    console.log('Approved By Value:', createdByValue);
  }
}, [allpartydata.entityId]);


const [getSingleieccode, setSingleieccode] = useState('');
const createIECBySpanRef = useRef('');
useEffect(() => {
  if (createIECBySpanRef.current) {
    const createdByValue = createIECBySpanRef.current.textContent;
    setSingleieccode(createdByValue);
    // Now you can use the 'approvedByValue' variable to store or manipulate the value
    console.log('Approved By Value:', createdByValue);
  }
}, [allpartydata.iecNo]);

const[getConsoleData,setGetConsoleData] = useState([]);
const getALLConsoledata = () => {
  axios
    .get(`http://${ipaddress}externalparty/consoledata/${companyid}/${branchId}`)
    .then((response) => {
      // console.log("GET list response:", response.data);
      setGetConsoleData(response.data); // Store the list in the state
      //formData.airlineName(response.data((data) => data.airlineName) )
      console.log("single ",getAirlineName);
    })
    .catch((error) => {
      console.error("GET list error:", error);
    });
};

useEffect(() =>{
  getALLConsoledata();
},[companyid,branchId])

console.log('allpartydata.iecNo ',allpartydata.iecNo);



  return (
    <>
      <div className="row">
        <div className="col-md-6">
        <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
          icon={faPlaneDeparture}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        />Add New Export</h5>
      
        </div>
      </div>

      <Card>
        <CardBody>
          <Form onSubmit={handleSave}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbRequestId">
                    SB Request Id<span style={{color: 'red'}}>*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="sbRequestId"
                    name="sbRequestId"
                    value={formData.sbRequestId}
                    onChange={(e) =>
                      setFormData({ ...formData, sbRequestId: e.target.value })
                    }               
                    
                  />
                 
                  <div style={{color: 'red'}} className="error-message">{formErrors.sbRequestId}</div>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="sbNo">
                    SB No <span style={{color: 'red'}}>*</span>
                  </label>
                  <input
                    type="text"
                    id="sbNo"
                    className="form-control"
                    name="sbNo"
                    value={formData.sbNo}
                    onChange={(e) =>
                      setFormData({ ...formData, sbNo: e.target.value })
                    }
             
                    required
                  />
                  <div style={{color:'red'}} className="error-message">{formErrors.sbNo}</div>
                </FormGroup>
              </Col>
              <Col md={4}>
                <label className="forlabel bold-label" htmlFor="sbDate">
                  SB Date<span style={{color: 'red'}}>*</span>
                </label>
           
                
                    <DatePicker
                      selected={formData.sbDate}
                      onChange={handleDateChange}
                      minDate={today}
                      id="sbDate"
                      dateFormat="dd/MM/yyyy"
                      value={formData.sbDate} // Set the value from the database
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
                     <div style={{color: 'red'}} className="error-message">{formErrors.sbDate}</div>
             
              </Col>
            </Row>
            <Row>
            <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="entityId">
                    Airline Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="airlineName"
                    name="airlineName"
                    readOnly
                    style={{backgroundColor:'#E0E0E0'}}
                    value={getSingleairlinename}
                    onChange={(e) =>
                      setFormData({ ...formData, airlineName: e.target.value })
                    }
                  
                  />
                    <span hidden ref={createBySpanRef}>{getAirlineName.airlineName}</span>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="entityId">
                    Flight No.<span style={{color: 'red'}}>*</span>
                  </label>
                  <select
                      id="airlineCode"
                      className="form-control form-select"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          airlineCode: e.target.value,
                        })
                      }
                      required
                      name="airlineCode"
                      value={formData.airlineCode}
                    >
                      <option value="">Select Flight No</option>
                      {getAllFlight.map((data, index) => (
                        <option key={index} value={data.airlineCode}>{data.flightNo}</option>
                      ))}
                    </select>
                    <div style={{color: 'red'}} className="error-message">{formErrors.airlineCode}</div>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="entityId">
                    Flight Date<span style={{color: 'red'}}>*</span>
                  </label>
                  <DatePicker
                      selected={formData.flightDate}
                      onChange={handleFlightDateChange}
                      minDate={today}
                      id="flightDate"
                      dateFormat="dd/MM/yyyy"
                      value={formData.flightDate} // Set the value from the database
                      className="form-control"
              
                      wrapperClassName="custom-react-datepicker-wrapper"
                      customInput={
                        <input
                          style={{
                            height: "38px",
                            width: "100%",
                            borderColor: errors.cfsValidateDate
                              ? "#f52b2b"
                              : "",
                          }}
                        />
                        }
                        />
                         <div style={{color: 'red'}} className="error-message">{formErrors.flightDate}</div>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="iecCode">
                    IEC Code
                  </label>
                  <input
                    type="text"
                    id="iecCode"
                    className="form-control"
                    name="iecCode"
                    value={getSingleieccode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        iecCode: e.target.value,
                      })
                    }
                    readOnly
                    style={{backgroundColor:'#E0E0E0'}}
                  />
                  <span hidden ref={createIECBySpanRef}>{allpartydata.iecNo}</span>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="entityId">
                    Entity Id
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="entityId"
                    name="entityId"
                    value={getSingleentity}
                    onChange={(e) =>
                      setFormData({ ...formData, entityId: e.target.value })
                    }
                    readOnly
                    style={{backgroundColor:'#E0E0E0'}}
                  />
                  <span hidden ref={createEntityBySpanRef}>{allpartydata.entityId}</span>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label
                    className="forlabel bold-label"
                    htmlFor="nameOfExporter"
                  >
                    Name Of Exporter<span style={{color: 'red'}}>*</span>
                  </label>
                  {/* <input
                    type="text"
                    id="nameOfExporter"
                    className="form-control"
                    name="nameOfExporter"
                    value={formData.nameOfExporter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nameOfExporter: e.target.value,
                      })
                    }
                  /> */}
                        <select
                      id="nameOfExporter"
                      className="form-control form-select"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nameOfExporter: e.target.value,
                        })
                      }
                      required
                      name="nameOfExporter"
                      value={formData.nameOfExporter}
                    >
                      <option value="">Select exporter</option>
                      {partys.map((data, index) => (
                        <option key={index} value={data.partyId}>{data.partyName}</option>
                      ))}
                    </select>
                    <div style={{color: 'red'}} className="error-message">{formErrors.nameOfExporter}</div>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="serNo">
                    SER No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="serNo"
                    name="serNo"
                    value={formData.serNo}
                    onChange={(e) =>
                      setFormData({ ...formData, serNo: e.target.value })
                    }
                    readOnly
                    style={{backgroundColor:'#E0E0E0'}}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="grossWeight">
                    Gross Weight
                  </label>
                  <input
                    type="text"
                    id="grossWeight"
                    name="grossWeight"
                    className="form-control"
                    value={formData.grossWeight}
                    onChange={(e) =>
                      setFormData({ ...formData, grossWeight: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label
                    className="forlabel bold-label"
                    htmlFor="uomGrossWeight"
                  >
                    UOM Gross Weight
                  </label>
                  <input
                    type="text"
                    id="uomGrossWeight"
                    className="form-control"
                    name="uomGrossWeight"
                    value={formData.uomGrossWeight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        uomGrossWeight: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label
                    className="forlabel bold-label"
                    htmlFor="countryOfDestination"
                  >
                    Country Of Destination
                  </label>
                  <input
                    type="text"
                    id="countryOfDestination"
                    name="countryOfDestination"
                    className="form-control"
                    value={formData.countryOfDestination}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        countryOfDestination: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label
                    className="forlabel bold-label"
                    htmlFor="portOfDestination"
                  >
                    Port Of Destination
                  </label>
                  <input
                    type="text"
                    id="portOfDestination"
                    name="portOfDestination"
                    className="form-control"
                    value={formData.portOfDestination}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        portOfDestination: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="airwayBillNo">
                    Airway Bill No
                  </label>
                  <input
                    type="text"
                    id="airwayBillNo"
                    name="airwayBillNo"
                    className="form-control"
                    value={formData.airwayBillNo}
                    onChange={(e) =>
                      setFormData({ ...formData, airwayBillNo: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label
                    className="forlabel bold-label"
                    htmlFor="descriptionOfGoods"
                  >
                    Description Of Goods
                  </label>
                  <input
                    type="text"
                    id="descriptionOfGoods"
                    className="form-control"
                    name="descriptionOfGoods"
                    value={formData.descriptionOfGoods}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descriptionOfGoods: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="nsdlStatus">
                    NSDL Status<span style={{color: 'red'}}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nsdlStatus"
                    name="nsdlStatus"
                    value="Pending"
                    onChange={(e) =>
                      setFormData({ ...formData, nsdlStatus: e.target.value })
                    }
                    readOnly
                    style={{backgroundColor:'#E0E0E0'}}
                  />
                  <div style={{color: 'red'}} className="error-message">{formErrors.nsdlStatus}</div>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="dgdcStatus">
                    DGDC Status<span style={{color: 'red'}}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dgdcStatus"
                    name="dgdcStatus"
                    value="Handed over to DGDC SEEPZ"
                    onChange={(e) =>
                      setFormData({ ...formData, dgdcStatus: e.target.value })
                    }
                    readOnly
                    style={{backgroundColor:'#E0E0E0'}}
                  />
                  <div style={{color: 'red'}} className="error-message">{formErrors.dgdcStatus}</div>
                </FormGroup>
              </Col>
            </Row>{" "}
            <Row>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="chaNo">
                    CHA No
                  </label>
                  <input
                    type="text"
                    id="chaNo"
                    className="form-control"
                    name="chaNo"
                    value={formData.chaNo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        chaNo: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="chaName">
                    CHA Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="chaName"
                    name="chaName"
                    value={formData.chaName}
                    onChange={(e) =>
                      setFormData({ ...formData, chaName: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="consoleAgent">
                    Console Agent
                  </label>
                  <select
                    id="consoleAgent"
                    className="form-control"
                    name="consoleAgent"
                    value={formData.consoleAgent}
                    onChange={(e) =>
                      setFormData({ ...formData, consoleAgent: e.target.value })
                    }
                  >
                    
                  
                    <option value="">Select Console</option>
                    {getConsoleData.map((item) => (
                      <option  value={item.externaluserId}>
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
                  {" "}
                  <label
                    className="forlabel bold-label"
                    htmlFor="fobValueInINR"
                  >
                    FOB Value In INR
                  </label>
                  <input
                    type="text"
                    id="fobValueInINR"
                    className="form-control"
                    name="fobValueInINR"
                    value={formData.fobValueInINR}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fobValueInINR: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="noOfPackages">
                    No Of Packages
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="noOfPackages"
                    name="noOfPackages"
                    value={formData.noOfPackages}
                    onChange={(e) =>
                      setFormData({ ...formData, noOfPackages: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label
                    htmlFor="uomOfPackages"
                    className="forlabel bold-label"
                  >
                    UOM Of Packages
                  </label>
                  <input
                    type="text"
                    id="uomOfPackages"
                    className="form-control"
                    name="uomOfPackages"
                    value={formData.uomOfPackages}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        uomOfPackages: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            {/* <Row>
              <Col md={4}>
                <FormGroup>
                  <label className="forlabel bold-label" htmlFor="status">
                    Status
                  </label>
                  <input
                    readOnly
                    type="text"
                    id="status"
                    className="form-control"
                    style={{
                      backgroundColor: "#E0E0E0",
                    }}
                    name="status"
                    value={
                      formData.status === "N"
                        ? "New"
                        : formData.status === "E"
                        ? "Edit"
                        : formData.status === "A"
                        ? "Approved"
                        : ""
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label className="forlabel bold-label" htmlFor="editedBy">
                    Edited By
                  </label>
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    id="editedBy"
                    name="editedBy"
                    value={formData.editedBy}
                    style={{
                      backgroundColor: "#E0E0E0",
                    }}
                    onChange={(e) =>
                      setFormData({ ...formData, editedBy: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  {" "}
                  <label htmlFor="createdBy" className="forlabel bold-label">
                    Create By
                  </label>
                  <input
                    readOnly
                    type="text"
                    id="editedBy"
                    className="form-control"
                    style={{
                      backgroundColor: "#E0E0E0",
                    }}
                    name="editedBy"
                    value={formData.editedBy}
                    onChange={(e) =>
                      setFormData({ ...formData, editedBy: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row> */}
          </Form>
        </CardBody>

        <CardFooter>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-success btn-margin"
              onClick={handleSubmit}
              style={{marginRight:10}}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              Submit
            </button>
            <button
              className="btn btn-outline-danger btn-margin"
              onClick={resetFormData}
              style={{marginRight:10}}
            >
              <FontAwesomeIcon
                icon={faSyncAlt}
                style={{ marginRight: "5px" }}
              />
              Clear
            </button>
            <button
              className="btn btn-outline-primary btn-margin"
              onClick={() => navigate("/parent/export")}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ marginRight: "5px" }}
              />
              Back
            </button>
          </div>
        </CardFooter>
      </Card>

      {/* <h2>Form Data Preview:</h2>
      <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </>
  );
}