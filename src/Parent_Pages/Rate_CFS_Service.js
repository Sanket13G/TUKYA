// import { useParams } from 'react-router-dom';
// import AuthContext from "../Components/AuthProvider";
// import { Form, useNavigate } from "react-router-dom";
// import React, { useState, useEffect, useContext } from "react";
// import "../Components/Style.css";
// import { Button } from "react-bootstrap";
// import { ToastContainer, toast } from 'react-toastify';
// import Select from 'react-select';
// import Rate_Chart_Service from "../services/Rate_Chart_Service";
// import Table from 'react-bootstrap/Table';
// import { Link, useLocation } from "react-router-dom";
// import { Card, CardBody, Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAdd, faArrowLeft, faArrowRight, faArrowUpRightDots, faBalanceScale, faBullhorn, faClose, faFile, faMoneyBill1, faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';


// function Rate_CFS_Service(props) {
//     const location = useLocation();
//     const cfsTarrifNo = location.state?.cfsTariffNo;
//     const sirid = location.state?.sirid;
//     const range = location.state?.range;
//     const amnd = location.state?.amnd;

//     const [cfsTariffNo, setCfsTariffNo] = useState('');
//     const [serviceId, setServiceId] = useState('');
//     const [cfsDocRefNo, setcfsDocRefNo] = useState('');
//     const [partyId, setpartyId] = useState('');
//     const [payParty, setpayParty] = useState('');
//     const [cfsValidateDate, setcfsValidateDate] = useState('');
//     const [cfsTariffDate, setcfsTariffDate] = useState('');
//     const [status, setstatus] = useState('');
//     const [createdBy, setCreatedBy] = useState('');
//     const [approvedBy, setApprovedBy] = useState('');
//     const [serviceUnit, setServiceUnit] = useState('');
//     const [serviceUnit1, setServiceUnit1] = useState('');
//     const [typeOfCharges, setTypeOfCharges] = useState('N');
//     const [createdDate, setCreatedDate] = useState('');
//     const [cargoMovement, setcargoMovement] = useState('');
//     const [taxApplicable, seTtaxApplicable] = useState('');
//     const [discountPercentage, setDiscountPercentage] = useState('');
//     const [rangeType, setRangeType] = useState('');
//     const [movementCodeTo, setMovementCodeTo] = useState('');
//     const [movementCodeFrom, setMovementCodeFrom] = useState('');
//     const [criteria, setCriteria] = useState('');
//     const [billingParty, setbillingParty] = useState('');
//     const [forwarderId, setforwarderId] = useState('');
//     const [importerId, setimporterId] = useState('');
//     const [containerStatus, setcontainerStatus] = useState('');
//     const [party_Name, setparty_Name] = useState('');
//     const [containerSize, setcontainerSize] = useState('');
//     const [cargoType, setcargoType] = useState('');
//     const [pol, setpol] = useState('');
//     const [negotiable, setNegotiable] = useState('N');
//     const [service, setService] = useState('');
//     const [cfsAmndNo, setcfsAmndNo] = useState('');
//     const [rateCalculation, setRateCalculation] = useState('');
//     const [rate, setRate] = useState('');
//     const [allServices, setAllServices] = useState([]);
//     const [selectedService, setSelectedService] = useState(null);
//     const [taxPercentage, setTaxPercentage] = useState('');
//     const [editedDate, setEditedDate] = useState('');
//     const [approvedDate, setApprovedDate] = useState('');
//     // const [editedDate, setEditedDate] = useState('');
//     const [editedBy, setEditedBy] = useState('');
//     const [currencyId, setCurrencyID] = useState('INR');
//     const [finYear, setfinYear] = useState('');
//     const [companyId, setcompanyId] = useState('');
//     const [errors, setErrors] = useState('');
//     const [cfstarrifServices, setcfstarrifServices] = useState([]);
//     const [rangeFrom, setrangeFrom] = useState('');
//     const [rangeTo, setrangeTo] = useState('');
//     const [rangeRate, setrangeRate] = useState('');
//     const [srlNo, setsrlNo] = useState(1);
//     const [serviceranges, setserviceranges] = useState([]);
//     const [editableData, setEditableData] = useState([]);
//     const [showDetailRow, setShowDetailRow] = useState(true);
//     const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
//     const [CreatedUser, setCreatedUser] = useState('');

//     const navigate = useNavigate();
//     const handleRateChart = () => {
//         navigate(`/parent/rate-chart`, { state: { cfsTariffNo } });
//     };


//     const {
//         jwtToken,
//         userId,
//         username,
//         branchId,
//         companyid,
//         role,
//         companyname,
//         branchname,
//         logintype,
//         logintypeid,

//         login,
//         logout,
//     } = useContext(AuthContext);

//     useEffect(() => {

//         if (amnd !== undefined) {
//             setcfsAmndNo(amnd);
//         }

//         if (cfsTarrifNo && sirid) {
//             if (range === 'Plain') {

//                 findByTarrifNoAndServiceID(companyid, branchId, cfsTarrifNo, amnd, sirid);
//             } else {
//                 // alert(range);
//                 findByTarrifnoAndServiceIdRange(companyid, branchId, cfsTarrifNo, amnd, sirid);
//             }
//         } else if (cfsTarrifNo) {
//             getCFSTarrifById(companyid, branchId, cfsTarrifNo);
//             findByTarrifNoServices(companyid, branchId, cfsTarrifNo);
//         }
//     }, []); // Inc








//     const getCreatedUser = (id3) => {
//         Rate_Chart_Service.getUserbyUserId(id3, companyid, branchId).then((res) => {
//             setCreatedUser(res.data.user_Name);
//             // alert(CreatedUser);
//         })
//     };

//     useEffect(() => {
//         setcompanyId(companyid);

//     }, []);

//     useEffect(() => {

//         setEditableData([...serviceranges]);
//     }, [serviceranges]);

//     const getStatusLabel = (status) => {
//         if (status === 'N') {
//             return 'New';
//         } else if (status === 'U') {
//             return 'Edit';
//         } else if (status === 'A') {
//             return 'Approved';
//         } else {
//             return ''; // Handle other cases if needed
//         }
//     };








//     const handleEditableChange = (index, key, value) => {
//         setEditableData((prevEditableData) => {
//             const updatedData = [...prevEditableData];
//             updatedData[index] = {
//                 ...updatedData[index],
//                 [key]: value,
//             };
//             return updatedData;
//         });
//     };

//     const saveAllChanges = () => {

//         if (editableData.some(item => !item.rangeRate)) {
//             // Display an error message using toast or another notification library
//             toast.error('Please Enter Rate !', {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 700,
//             });
//             return; // Exit the function without saving
//         }



//         Rate_Chart_Service.saveAllTarrifRanges(editableData, userId).then((res) => {
//             setserviceranges(res.data);

//             toast.success('Record added successfully !', {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 700,
//             });
//             // setstatus(res.data.status);
//             setEditableData([]); // Reset editableData after saving
//         });
//     };

//     const handleAddMore = () => {

//         const newSrNo = serviceranges.length + 1; // Increment the Sr No

//         // Clone the properties of the previous rows
//         const previousRow = serviceranges[serviceranges.length - 1];
//         const newServiceRange = {
//             ...previousRow,
//             srlNo: newSrNo,
//             rangeFrom: '',
//             rangeTo: '',
//             rangeRate: '',
//             status: ''

//         };

//         setserviceranges([...serviceranges, newServiceRange]);
//         setEditableData([...editableData, newServiceRange]);
//     };

//     const findByTarrifnoAndServiceIdRange = (comid, branchId, cfsTariffNo, amndno, serviceId) => {
//         Rate_Chart_Service.getRangeByTarrifNoAndServiceId(comid, branchId, cfsTariffNo, amndno, serviceId).then((res) => {
//             console.log(res.data);

//             // Iterate through the list of objects
//             res.data.forEach((item) => {
//                 // Set state values for each object
//                 setServiceId(item.serviceId);
//                 setCreatedBy(item.createdBy);
//                 getCreatedUser(item.createdBy);
//                 setCreatedDate(item.setCreatedDate);
//                 setEditedDate(item.setEditedDate);
//                 setcfsDocRefNo(item.cfsDocRefNo);
//                 setcfsAmndNo(item.cfsAmndNo);
//                 setcfsValidateDate(item.cfsValidateDate);
//                 setpartyId(item.partyId);
//                 setparty_Name(item.party_Name);
//                 setServiceId(item.serviceId);
//                 setRate(item.rate);
//                 setstatus(item.status);
//                 setApprovedBy(item.editedBy);
//                 setCreatedDate(item.createdDate);
//                 setApprovedDate(item.approvedDate);
//                 setRangeType(item.rangeType)
//                 seTtaxApplicable(item.taxApplicable);
//             });

//             // Calling getServiceByID with serviceId
//             getServiceByID(companyid, branchId, serviceId);

//             // Setting serviceranges state (you might want to set this outside the loop)
//             setserviceranges(res.data);
//         });
//     };



//     const findByTarrifNoServices = async (companyid, branchId, tarrifno) => {
//         try {
//             const response = await Rate_Chart_Service.getCombinedServicesSingleTarrifNo(companyid, branchId, tarrifno);
//             const allcfssrvData = response.data;
//             // alert("2566");

//             // console.warn(allcfssrvData);
//             setcfstarrifServices(allcfssrvData);

//             // if (allcfssrvData.length > 0) {
//             findUpdatedServices(allcfssrvData);
//             // }

//         }
//         catch (error) {
//             console.error("Error loading tariff data:", error);
//         }

//     };

//     const findUpdatedServices = async (serviceData) => {

//         const serviceIds = serviceData.map(service => service[1]);

//         try {
//             const response = await Rate_Chart_Service.getExcludedServices(companyid, branchId, serviceIds);
//             const serviceOptions = response.data.map(service => ({
//                 value: service.service_Id,
//                 label: service.serviceShortDescription
//             }));



//             setAllServices(serviceOptions);
//         } catch (error) {
//             console.error('Error fetching serviceIds:', error);
//         }
//     };




//     useEffect(() => {
//         setcompanyId(companyid);
//         setCfsTariffNo(cfsTarrifNo);
//         getCFSTarrifById(companyid, branchId, cfsTarrifNo);

//     }, [])

//     const handleValidation = () => {
//         let formIsValid = true;
//         const newErrors = {};


//         if (!service) {
//             formIsValid = false;
//             newErrors['service'] = 'service is required.';
//         }
//         setErrors(newErrors);
//         return formIsValid;
//     };

//     const closeRange = () => {
//         setShowDetailRow(false);
//         setIsAddButtonDisabled(true);
//     }




//     const getCFSTarrifById = async (compId, branchId, cfsTariff) => {

//         Rate_Chart_Service.getCFSTarrifById(compId, branchId, cfsTariff).then((res) => {

//             setcfsDocRefNo(res.data.cfsDocRefNo);
//             setcfsAmndNo(res.data.cfsAmndNo);
//             setcfsValidateDate(res.data.cfsValidateDate);
//             setpartyId(res.data.partyId);
//             setcfsTariffDate(res.data.cfsTariffDate);
//             setparty_Name(res.data.party_Name);


//         })
//     }
//     const cfsRange =
//     {
//         cfsTariffNo, serviceId, cfsDocRefNo, partyId, party_Name, rangeFrom, rangeTo, rangeRate, cfsAmndNo, cfsDocRefNo,
//         srlNo, createdBy, createdDate, approvedBy, cfsAmndNo, editedDate, approvedDate, currencyId, branchId, companyId, createdBy, taxApplicable,
//         rangeType, editedBy
//     }


//     const cfstarrifservice =
//     {
//         cfsTariffNo, cfsDocRefNo, serviceId, partyId, payParty, cfsValidateDate, cfsTariffDate, status, createdBy, approvedBy, editedBy, editedDate,
//         serviceUnit, serviceUnit1, typeOfCharges, cargoMovement, taxApplicable, rangeType, approvedBy, approvedDate, createdDate,
//         cfsAmndNo, rateCalculation, service, rate, cfsValidateDate, cfsAmndNo, currencyId,
//         taxPercentage, party_Name, status
//     }



//     const makefieldsEmpty = () => {
//         setsrlNo(srlNo + 1);
//         setrangeFrom('');
//         setrangeTo('');
//         setrangeRate('');
//         setstatus('');
//     }

//     const addCfstarrifServiceRange = async (e) => {


//         if (!rangeRate) {
//             return toast.error('Please Enter Rate !', {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 700,
//             });
//         }
//         try {
//             Rate_Chart_Service.addTarrifRange(
//                 companyid,
//                 branchId,
//                 userId,
//                 cfsRange
//             ).then((res) => {
//                 findByTarrifNoServices(res.data.companyId, res.data.branchId, res.data.cfsTariffNo);
//                 findByTarrifnoAndServiceIdRange(res.data.companyId, res.data.branchId, res.data.cfsTariffNo, res.data.cfsAmndNo, res.data.serviceId);
//                 makefieldsEmpty();

//                 toast.success('Record added successfully !', {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 700,
//                 });
//                 // saveAllChanges();
//             })

//         } catch (error) {
//             console.error('Error while adding data:', error);
//         }
//     };


//     // const updateCfsServiceRangeStatus = (e) => {
//     //     Rate_Chart_Service.getRangeByTarrifNoAndSerNo(companyid, branchId, username, cfsRange).then((res) => {
//     //         findByTarrifNoServices(res.data.cfsTariffNo);
//     //         findByTarrifnoAndServiceIdRange(res.data.cfsTariffNo, res.data.serviceId);
//     //         makefieldsEmpty();
//     //     });
//     // }

//     const addCfstarrifService = () => {


//         Rate_Chart_Service.addCFSservice(companyid, branchId, userId, cfstarrifservice).then((res) => {
//             findByTarrifNoAndServiceID(res.data.companyId, res.data.branchId, res.data.cfsTariffNo, res.data.cfsAmndNo, res.data.serviceId);
//             toast.success('Record added successfully !', {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 700,
//             });

//             findByTarrifNoServices(res.data.companyId, res.data.branchId, res.data.cfsTariffNo);

//         });
//     }

//     const updateCfstarrifService = (e) => {


//         // console.log("Sending");
//         // console.log(cfstarrifservice);
//         Rate_Chart_Service.updateCFSservice(companyid, branchId, userId, cfsTariffNo, cfstarrifservice).then((res) => {
//             // getServiceByID(res.data.cfsTariffNo);
//             toast.success('Record updated successfully !', {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 700,
//             });
//             // setServiceId(res.data.serviceId);
//             findByTarrifNoAndServiceID(res.data.companyId, res.data.branchId, res.data.cfsTariffNo, res.data.cfsAmndNo, res.data.serviceId);
//             // findByTarrifNoServices(res.data.cfsTariffNo);
//         });
//     }



//     const SaveOrUpdate = async (e) => {
//         const isFormValid = handleValidation();
//         if (isFormValid) {

//             // console.log(Tarrifs);
//             if (serviceId === 'N' || status === 'E') {
//                 // Update
//                 updateCfstarrifService();
//             }
//             // if (status === 'A') {
//             //     UpdateTarrifServiceStatus();
//             // }
//             else {
//                 // Add
//                 addCfstarrifService();
//             }
//         }
//         else {
//             toast.error('Oops something went wrong !', {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 700,
//             });
//         }
//     }

//     const makefieldEmpty = (e) => {
//         setServiceUnit('');
//         setServiceUnit('');
//         setServiceUnit1('');
//         seTtaxApplicable('')
//         setTaxPercentage('');
//         setRateCalculation('');
//         setTypeOfCharges('');
//         setTypeOfCharges('')
//         setCreatedBy('')
//         setApprovedBy('')
//         setCreatedDate('')
//         setEditedDate('')
//         setApprovedDate('')
//         setService('');
//         setServiceId('');
//         setRate('');
//         setRangeType('');
//         setfinYear('');
//         setErrors('');
//         setstatus('');
//         setShowDetailRow(true);
//         setIsAddButtonDisabled(false)
//     }

//     const findByTarrifNoAndServiceID = async (compid, branchId, tarrifno, amndno, serid) => {
//         // alert("In Method");



//         // alert(compid);
//         // alert(branchId);
//         // alert(tarrifno);
//         // alert(amndno);
//         // alert(serid);
//         // alert(compid);

//         await Rate_Chart_Service.findByTarrifNoAndServiceID(compid, branchId, tarrifno, amndno, serid).then((res) => {
//             console.log("Data Below");
//             console.warn(res.data);
//             setServiceId(res.data.serviceId);
//             setCfsTariffNo(res.data.cfsTariffNo);
//             setServiceUnit(res.data.serviceUnit);
//             setServiceUnit(res.data.serviceUnit);
//             setServiceUnit1(res.data.serviceUnit1);
//             seTtaxApplicable(res.data.taxApplicable);
//             setTaxPercentage(res.data.taxPercentage);
//             setRateCalculation(res.data.rateCalculation);
//             setTypeOfCharges(res.data.typeOfCharges);
//             setTypeOfCharges(res.data.typeOfCharges)
//             setCreatedBy(res.data.createdBy);
//             getCreatedUser(res.data.createdBy);
//             setApprovedBy(res.data.approvedBy);
//             setCreatedDate(res.data.createdDate);
//             setEditedDate(res.data.editedDate);
//             setApprovedDate(res.data.approvedDate);
//             setService(res.data.service);
//             setstatus(res.data.status);
//             setRangeType(res.data.rangeType);
//             setRate(res.data.rate);
//             setRangeType(res.data.rangeType);
//             setCurrencyID(res.data.currencyId);
//             setcfsDocRefNo(res.data.cfsDocRefNo);
//             setpartyId(res.data.partyId);
//             setparty_Name(res.data.party_Name);

//         });
//     };



//     const getServiceByID = (companyId, branchId, serviceId) => {
//         Rate_Chart_Service.getByServiceId(companyId, branchId, serviceId).then((res) => {
//             setServiceId(serviceId);
//             setService(res.data.serviceShortDescription);
//             setServiceUnit(res.data.serviceUnit);
//             setServiceUnit(res.data.serviceUnit);
//             setServiceUnit1(res.data.serviceUnit1);
//             seTtaxApplicable(res.data.taxApplicable)
//             setTaxPercentage(res.data.taxPercentage);
//             setRateCalculation(res.data.rateCalculation);
//             setTypeOfCharges(res.data.typeOfCharges);
//             setRangeType(res.data.rateCalculation);
//         })
//     }

//     const handleServiceChange = async (selectedOption, { action }) => {

//         if (action === 'clear') {
//             setSelectedService('');
//             setsrlNo(1);
//             setService('');
//             setServiceId('');
//         }
//         else {
//             setSelectedService(selectedOption);
//             setsrlNo(1);
//             setService(selectedOption ? selectedOption.label : '');
//             setServiceId(selectedOption ? selectedOption.value : '');
//             getServiceByID(companyId, branchId, selectedOption ? selectedOption.value : '');
//             findByTarrifnoAndServiceIdRange(companyId, branchId, cfsTariffNo, amnd, selectedOption.value);
//         }
//     };



//     const { isAuthenticated } = useContext(AuthContext);
//     useEffect(() => {
//         if (!isAuthenticated) {
//             navigate(
//                 "/login?message=You need to be authenticated to access this page."
//             );
//         }
//     }, [isAuthenticated, navigate]);
//     return (
//         <>
//             {logintype === 'Party' ? (
//                 <div className="Container" >
//                     <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
//                         icon={faMoneyBill1}
//                         style={{
//                             marginRight: '8px',
//                             color: 'black', // Set the color to golden
//                         }}
//                     />Tarrif Services</h5>
//                     <hr />
//                     {rateCalculation !== 'Plain' && rateCalculation != null && rateCalculation !== '' && (
//                         <div className="table-responsive text-center mt-3">
//                             <table className="table">

//                                 <thead>
//                                     <tr className="text-center">
//                                         <th>Sr No</th>
//                                         <th>Range From</th>
//                                         <th>Range To</th>
//                                         <th>Range Rate</th>

//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {serviceranges.map((serviceRange, index) => (
//                                         <tr className="text-center" key={index}>

//                                             <td className="text-center" >
//                                                 <input
//                                                     type="text"
//                                                     readOnly
//                                                     id="service"
//                                                     className="text-center enhanceinput"
//                                                     tabIndex="-1"

//                                                     style={{
//                                                         width: '10vw',
//                                                         height: '40px',
//                                                         border: 'none',
//                                                         background: 'none',
//                                                         boxShadow: 'none',
//                                                         padding: 0,
//                                                         cursor: 'default',
//                                                         pointerEvents: 'none'
//                                                     }}
//                                                     value={editableData[index]?.srlNo || 0}
//                                                     onChange={(e) => handleEditableChange(index, 'srlNo', e.target.value)}
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input
//                                                     type="text"
//                                                     style={{ width: '10vw', height: '40px' }}
//                                                     className="text-center enhanceinput"
//                                                     value={editableData[index]?.rangeFrom !== undefined ? editableData[index]?.rangeFrom : ''}
//                                                     onChange={(e) => handleEditableChange(index, 'rangeFrom', e.target.value)}
//                                                     readOnly
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input
//                                                     readOnly
//                                                     type="text"
//                                                     style={{ width: '10vw', height: '40px' }}
//                                                     className="text-center enhanceinput"
//                                                     value={editableData[index]?.rangeTo || ''}
//                                                     onChange={(e) => handleEditableChange(index, 'rangeTo', e.target.value)}
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input
//                                                     readOnly
//                                                     type="number"
//                                                     style={{ width: '10vw', height: '40px' }}
//                                                     className="text-center enhanceinput"
//                                                     value={editableData[index]?.rangeRate !== undefined ? editableData[index]?.rangeRate : ''}
//                                                     onChange={(e) => handleEditableChange(index, 'rangeRate', e.target.value)}
//                                                 />
//                                             </td>

//                                         </tr>
//                                     ))}




//                                     {(!sirid && !range && rateCalculation !== 'Plain' && rateCalculation != null && rateCalculation !== '') && showDetailRow && (


//                                         <tr className="text-center">
//                                             <td className="text-center">
//                                                 <input
//                                                     type="text"
//                                                     name="srlNo"
//                                                     className="text-center enhanceinput form-input"
//                                                     tabIndex="-1"
//                                                     style={{
//                                                         width: '10vw',
//                                                         height: '40px',
//                                                         border: 'none',
//                                                         background: 'none',
//                                                         boxShadow: 'none',
//                                                         padding: 0,
//                                                         cursor: 'default',
//                                                         pointerEvents: 'none'
//                                                     }}
//                                                     value={srlNo}
//                                                     id='service'
//                                                     readOnly
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input
//                                                     type="text"
//                                                     name="rangeFrom"
//                                                     className="text-center enhanceinput form-input"
//                                                     style={{ width: '10vw', height: '40px' }}
//                                                     value={rangeFrom}
//                                                     readOnly
//                                                     onChange={(e) => setrangeFrom(e.target.value)}
//                                                 />
//                                             </td>
//                                             <td>
//                                                 <input
//                                                     type="text"
//                                                     name="rangeTo"
//                                                     className="text-center enhanceinput form-input"
//                                                     style={{ width: '10vw', height: '40px' }}
//                                                     value={rangeTo}
//                                                     readOnly
//                                                     onChange={(e) => setrangeTo(e.target.value)}
//                                                 />
//                                             </td>
//                                             <td>


//                                                 <input
//                                                     type="number"
//                                                     name="rangeRate"
//                                                     className="text-center enhanceinput form-input"
//                                                     value={rangeRate}
//                                                     readOnly
//                                                     onChange={(e) => setrangeRate(e.target.value)}
//                                                 />
//                                             </td>

//                                         </tr>)}







//                                 </tbody>
//                             </table>
//                         </div>)}
//                     <Row>
//                         <Col className="text-center">
//                             <Button
//                                 variant="outline-danger"
//                                 style={{ marginLeft: 10 }}
//                                 onClick={handleRateChart}
//                             ><FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} />
//                                 Back
//                             </Button>

//                         </Col>
//                     </Row>
//                 </div>
//             )
//                 :
//                 (
//                     <>
//                         <div className="Container" >
//                             <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
//                                 icon={faMoneyBill1}
//                                 style={{
//                                     marginRight: '8px',
//                                     color: 'black', // Set the color to golden
//                                 }}
//                             />Tarrif Services</h5>

//                             <Card style={{ backgroundColor: "#F8F8F8" }}>


//                                 <CardBody>

//                                     {/* 1st  */}
//                                     <Row>
//                                         <Col md={4}>
//                                             <Row>
//                                                 <Col md={8}>

//                                                     <FormGroup>
//                                                         <Label className="forlabel" for="branchId">Tarrif Id</Label>
//                                                         <Input
//                                                             type="text" name="cfsTariffNo"
//                                                             className="form-control"
//                                                             id='service' readOnly
//                                                             value={cfsTariffNo}
//                                                             onChange={(e) => setCfsTariffNo(e.target.value)}
//                                                         />
//                                                     </FormGroup>


//                                                 </Col>

//                                                 <Col md={4}>

//                                                     <FormGroup>
//                                                         {/* <Label className="forlabel" for="branchId">Tarrif Id</Label> */}
//                                                         <Input
//                                                             type="text" name="cfsAmndNo"
//                                                             className="form-control"
//                                                             style={{ marginTop: '32px' }}
//                                                             id='service' readOnly
//                                                             value={cfsAmndNo}
//                                                             onChange={(e) => setcfsAmndNo(e.target.value)}
//                                                         />
//                                                     </FormGroup>

//                                                 </Col>

//                                             </Row>

//                                         </Col>

//                                         <Col md={4}>
//                                             <FormGroup>
//                                                 <Label className="forlabel" for="branchId">Service</Label>
//                                                 <Select
//                                                     options={allServices}
//                                                     value={{ value: service, label: service }}
//                                                     onChange={handleServiceChange}
//                                                     isDisabled={service}
//                                                     isClearable
//                                                     styles={{
//                                                         control: (provided, state) => ({
//                                                             ...provided,
//                                                             border: state.isFocused ? '1px solid #ccc' : `1px solid ${errors.service ? '#f52b2b' : '#ccc'}`,
//                                                             boxShadow: 'none',
//                                                             '&:hover': {
//                                                                 border: '1px solid #ccc'
//                                                             }
//                                                         }),
//                                                         indicatorSeparator: () => ({
//                                                             display: 'none'
//                                                         }),
//                                                         dropdownIndicator: () => ({
//                                                             display: 'none'
//                                                         })
//                                                     }}
//                                                 />
//                                             </FormGroup>
//                                         </Col>



//                                         <Col md={4}>
//                                             <FormGroup>
//                                                 <Label className="forlabel" for="branchId">Status</Label>
//                                                 <Input
//                                                     type="text" name="status"
//                                                     id='service' readOnly
//                                                     className="form-control"
//                                                     value={status === "A" ? "Approved" : status === "U" ? "Edit" : status === "N" ? "New" : " "}
//                                                     onChange={(e) => setstatus(e.target.value)}
//                                                 />
//                                             </FormGroup>
//                                         </Col>


//                                     </Row>


//                                     {/* 2nd */}


//                                     <Row>
//                                         <Col md={4}>
//                                             <FormGroup>
//                                                 <Label className="forlabel" for="branchId">Service Unit</Label>
//                                                 <Input
//                                                     type="text" name="serviceUnit"
//                                                     className="form-control"
//                                                     value={serviceUnit}
//                                                     id='service' readOnly
//                                                     onChange={(e) => setServiceUnit(e.target.value)}
//                                                     style={{ height: '45px' }}
//                                                 />
//                                             </FormGroup>
//                                         </Col>

//                                         <Col md={4}>
//                                             <FormGroup>
//                                                 <Label className="forlabel" for="branchId">Currency</Label>
//                                                 <Input
//                                                     type="text" name="Currency"
//                                                     className="form-control"
//                                                     id='service'
//                                                     readonly
//                                                     style={{ height: '45px' }}
//                                                     value={currencyId}
//                                                 // onChange={(e) => setCurrencyID(e.target.value)}
//                                                 />
//                                             </FormGroup>
//                                         </Col>



//                                         <Col md={4}>
//                                             <FormGroup>
//                                                 <Label className="forlabel" for="branchId">Created By</Label>
//                                                 <Input type="text" name="serviceUnit"
//                                                     className="form-control"
//                                                     value={CreatedUser}
//                                                     id='service' readOnly
//                                                 // onChange={(e) => (e.target.value)}

//                                                 />

//                                             </FormGroup>
//                                         </Col>

//                                     </Row>

//                                     {/* 3rd */}
//                                     <Row>
//                                         <Col md={4}>
//                                             <FormGroup>
//                                                 <Label className="forlabel" for="branchId">Rate Calculation</Label>
//                                                 <div className="row mt-2">
//                                                     <div className="col-4 d-flex align-items-center ">
//                                                         <div className="form-check form-check-inline">
//                                                             <input className="form-check-input radios custom-radio"
//                                                                 type="radio" name="rateCalculation" value="Range"
//                                                                 onChange={(e) => setRateCalculation(e.target.value)}
//                                                                 checked={rateCalculation === "Range"}
//                                                                 disabled={true}
//                                                             />

//                                                             <label>Range</label>
//                                                         </div>
//                                                     </div>

//                                                     <div className="col-4 d-flex align-items-center">
//                                                         <div className="form-check form-check-inline">
//                                                             <input className="form-check-input radios custom-radio"
//                                                                 type="radio" name="rateCalculation" value="Slab"
//                                                                 onChange={(e) => setRateCalculation(e.target.value)}
//                                                                 checked={rateCalculation === "Slab"}
//                                                                 disabled={true}

//                                                             />
//                                                             <label>Slab</label>
//                                                         </div>
//                                                     </div>

//                                                     <div className="col-4 d-flex align-items-center">
//                                                         <div className="form-check form-check-inline">
//                                                             <input className="form-check-input radios custom-radio"
//                                                                 type="radio" name="rateCalculation" value="Plain"
//                                                                 onChange={(e) => setRateCalculation(e.target.value)}
//                                                                 checked={rateCalculation === "Plain"}
//                                                                 disabled={true}

//                                                             />
//                                                             <label>Plain</label>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </FormGroup>
//                                         </Col>


//                                         <div className="col-md-4">
//                                             <FormGroup>
//                                                 <Label className="forlabel" for="branchId">Tax Applicable</Label>
//                                                 <Row>
//                                                     <Col md={3}>
//                                                         <input
//                                                             className="form-check-input radios"
//                                                             type="checkbox"
//                                                             disabled
//                                                             style={{ width: 30, height: 30 }}
//                                                             name="taxApplicable"
//                                                             checked={taxApplicable === "Y"}
//                                                             onChange={(e) => seTtaxApplicable(e.target.checked ? "Y" : "N")}
//                                                         />
//                                                     </Col>
//                                                 </Row>
//                                             </FormGroup>
//                                         </div>

//                                         {/* <Col md={4}>
//                             <FormGroup>
//                                 <Label className="forlabel" for="branchId">Tax Applicable</Label>
//                                 <Row>
//                                     <Col md={3}>
//                                         <input
//                                             className="form-check-input radios"
//                                             type="checkbox"
//                                             disabled
//                                             name="taxApplicable"
//                                             checked={taxApplicable === "Y"}
//                                             onChange={(e) => seTtaxApplicable(e.target.checked ? "Y" : "N")}
//                                         />
//                                     </Col>
//                                 </Row>
//                             </FormGroup>
//                         </Col> */}



//                                         <Col>
//                                             <FormGroup>
//                                                 <Label className="forlabel" for="branchId">Rate</Label>
//                                                 <Input type="text" name="rate"
//                                                     className="form-control"
//                                                     value={rate}
//                                                     onChange={(e) => setRate(e.target.value)}
//                                                     id={rateCalculation !== 'Plain' ? 'service' : undefined}
//                                                     readOnly={rateCalculation !== 'Plain'}

//                                                 />

//                                             </FormGroup>
//                                         </Col>

//                                     </Row>

//                                     <Row>
//                                         <Col md={4} style={{

//                                             display: "flex",
//                                             justifyContent: "center", // Center buttons horizontally
//                                         }}>


//                                         </Col>


//                                         <Col md={4}>
//                                             <div
//                                                 style={{
//                                                     marginTop: '5px',
//                                                     marginBottom: '5px',
//                                                     display: "flex",
//                                                     justifyContent: "center", // Center buttons horizontally
//                                                 }}
//                                             >



//                                                 <button
//                                                     type="button"
//                                                     className="btn gap-2  btn-outline-success"
//                                                     disabled={cfsTarrifNo && sirid && range !== 'Plain' || rateCalculation !== 'Plain'}
//                                                     style={{ marginRight: 10 }}
//                                                     onClick={(e) => SaveOrUpdate(e)}
//                                                 > <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
//                                                     Save
//                                                 </button>



//                                                 {sirid !== undefined ? null : (
//                                                     <button
//                                                         type="button"
//                                                         className="btn gap-2 btn-outline-danger"
//                                                         style={{ marginRight: 10 }}
//                                                         onClick={(e) => makefieldEmpty(e)}
//                                                     >
//                                                         <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
//                                                         Clear
//                                                     </button>
//                                                 )}

//                                                 {/* <Button variant="outline-primary" onClick={(e) => makefieldEmpty(e)}
//                             disabled={cfsTarrifNo && sirid && range}
//                         >Clear</Button> */}



//                                                 <Button
//                                                     variant="outline-danger"
//                                                     style={{ marginLeft: 10 }}
//                                                     onClick={handleRateChart}
//                                                 ><FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} />
//                                                     Back
//                                                 </Button>



//                                             </div>
//                                         </Col>
//                                         <Col md={4} style={{
//                                             marginTop: '5px',
//                                             marginBottom: '5px',
//                                             display: "flex",

//                                         }}>




//                                         </Col>
//                                     </Row>




//                                     {rateCalculation !== 'Plain' && rateCalculation != null && rateCalculation !== '' && (
//                                         <div className="table-responsive text-center mt-3">
//                                             <table className="table">

//                                                 <thead>
//                                                     <tr className="text-center">
//                                                         <th>Sr No</th>
//                                                         <th>Range From</th>
//                                                         <th>Range To</th>
//                                                         <th>Range Rate</th>
//                                                         <th>Status</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {serviceranges.map((serviceRange, index) => (
//                                                         <tr className="text-center" key={index}>

//                                                             <td className="text-center" >
//                                                                 <input
//                                                                     type="text"
//                                                                     readOnly
//                                                                     id="service"
//                                                                     className="text-center enhanceinput"
//                                                                     tabIndex="-1"
//                                                                     style={{
//                                                                         width: '10vw',
//                                                                         height: '40px',
//                                                                         border: 'none',
//                                                                         background: 'none',
//                                                                         boxShadow: 'none',
//                                                                         padding: 0,
//                                                                         cursor: 'default',
//                                                                         pointerEvents: 'none'
//                                                                     }}
//                                                                     value={editableData[index]?.srlNo || 0}
//                                                                     onChange={(e) => handleEditableChange(index, 'srlNo', e.target.value)}
//                                                                 />
//                                                             </td>
//                                                             <td>
//                                                                 <input
//                                                                     type="text"
//                                                                     style={{ width: '10vw', height: '40px' }}
//                                                                     className="text-center enhanceinput"
//                                                                     value={editableData[index]?.rangeFrom !== undefined ? editableData[index]?.rangeFrom : ''}
//                                                                     onChange={(e) => handleEditableChange(index, 'rangeFrom', e.target.value)}
//                                                                     readOnly={!cfsTarrifNo || !sirid || !range}
//                                                                 />
//                                                             </td>
//                                                             <td>
//                                                                 <input
//                                                                     type="text"
//                                                                     style={{ width: '10vw', height: '40px' }}
//                                                                     className="text-center enhanceinput"
//                                                                     value={editableData[index]?.rangeTo || ''}
//                                                                     onChange={(e) => handleEditableChange(index, 'rangeTo', e.target.value)}
//                                                                 />
//                                                             </td>
//                                                             <td>
//                                                                 <input
//                                                                     type="number"
//                                                                     style={{ width: '10vw', height: '40px' }}
//                                                                     className="text-center enhanceinput"
//                                                                     value={editableData[index]?.rangeRate !== undefined ? editableData[index]?.rangeRate : ''}
//                                                                     onChange={(e) => handleEditableChange(index, 'rangeRate', e.target.value)}
//                                                                 />
//                                                             </td>
//                                                             <td style={{ marginLeft: '300px' }}>
//                                                                 <input
//                                                                     type="text"
//                                                                     className="text-center enhanceinput label-like-input"
//                                                                     id='service'
//                                                                     tabIndex="-1"   // Prevent focus using the "Tab" key
//                                                                     readOnly
//                                                                     style={{
//                                                                         width: '10vw',
//                                                                         height: '40px',
//                                                                         border: 'none',
//                                                                         background: 'none',
//                                                                         boxShadow: 'none',
//                                                                         padding: 0,
//                                                                         cursor: 'default',
//                                                                         pointerEvents: 'none'  // Disable interaction with the input
//                                                                     }}
//                                                                     value={getStatusLabel(serviceRange.status)}
//                                                                     onChange={(e) => handleEditableChange(index, 'status', e.target.value)}
//                                                                 />
//                                                             </td>
//                                                         </tr>
//                                                     ))}




//                                                     {(!sirid && !range && rateCalculation !== 'Plain' && rateCalculation != null && rateCalculation !== '') && showDetailRow && (


//                                                         <tr className="text-center">
//                                                             <td className="text-center">
//                                                                 <input
//                                                                     type="text"
//                                                                     name="srlNo"
//                                                                     className="text-center enhanceinput form-input"
//                                                                     tabIndex="-1"
//                                                                     style={{
//                                                                         width: '10vw',
//                                                                         height: '40px',
//                                                                         border: 'none',
//                                                                         background: 'none',
//                                                                         boxShadow: 'none',
//                                                                         padding: 0,
//                                                                         cursor: 'default',
//                                                                         pointerEvents: 'none'
//                                                                     }}
//                                                                     value={srlNo}
//                                                                     id='service'
//                                                                     readOnly
//                                                                 />
//                                                             </td>
//                                                             <td>
//                                                                 <input
//                                                                     type="text"
//                                                                     name="rangeFrom"
//                                                                     className="text-center enhanceinput form-input"
//                                                                     style={{ width: '10vw', height: '40px' }}
//                                                                     value={rangeFrom}
//                                                                     onChange={(e) => setrangeFrom(e.target.value)}
//                                                                 />
//                                                             </td>
//                                                             <td>
//                                                                 <input
//                                                                     type="text"
//                                                                     name="rangeTo"
//                                                                     className="text-center enhanceinput form-input"
//                                                                     style={{ width: '10vw', height: '40px' }}
//                                                                     value={rangeTo}
//                                                                     onChange={(e) => setrangeTo(e.target.value)}
//                                                                 />
//                                                             </td>
//                                                             <td>


//                                                                 <input
//                                                                     type="number"
//                                                                     name="rangeRate"
//                                                                     className="text-center enhanceinput form-input"
//                                                                     value={rangeRate}
//                                                                     onChange={(e) => setrangeRate(e.target.value)}
//                                                                 />
//                                                             </td>
//                                                             <td>
//                                                                 <input
//                                                                     type="text"
//                                                                     name="status"
//                                                                     className="text-center enhanceinput form-input"
//                                                                     tabIndex='-1'
//                                                                     style={{
//                                                                         width: '10vw',
//                                                                         width: '10vw',
//                                                                         height: '40px',
//                                                                         border: 'none',         // Remove the border
//                                                                         background: 'none',     // Remove the background color
//                                                                         boxShadow: 'none',      // Remove any box shadow
//                                                                         padding: 0,             // Remove padding
//                                                                         cursor: 'default',
//                                                                         height: '40px'
//                                                                     }}
//                                                                     id='service'
//                                                                     readOnly
//                                                                     onChange={(e) => setstatus(e.target.value)}
//                                                                 />
//                                                             </td>
//                                                         </tr>)}







//                                                 </tbody>
//                                             </table>
//                                         </div>)}
//                                     {!sirid && !range && rateCalculation !== 'Plain' && rateCalculation != null && rateCalculation !== '' && (
//                                         <div className="text-center">
//                                             {/* <Button variant="outline-primary" onClick={addCfstarrifServiceRange} style={{ marginLeft: 15 }} disabled={isAddButtonDisabled}>
//                                 Add Detail
//                             </Button>
//                             <Button variant="outline-primary" onClick={closeRange} style={{ marginLeft: 15 }}>
//                                 CLose
//                             </Button> */}
//                                             <button
//                                                 type="button"
//                                                 className="btn gap-2  btn-outline-danger"
//                                                 onClick={addCfstarrifServiceRange}
//                                                 disabled={isAddButtonDisabled}
//                                                 style={{ marginRight: '10px' }}
//                                             > <FontAwesomeIcon icon={faAdd} style={{ marginRight: '5px' }} />
//                                                 ADD DETAIL
//                                             </button>


//                                             <button
//                                                 type="button"
//                                                 className="btn gap-2  btn-outline-danger"
//                                                 onClick={closeRange}
//                                             > <FontAwesomeIcon icon={faClose} style={{ marginRight: '5px' }} />
//                                                 CLOSE
//                                             </button>

//                                         </div>)}


//                                     {cfsTarrifNo && sirid && range !== 'Plain' && (
//                                         <div className="text-center">

//                                             <button
//                                                 type="button"
//                                                 className="btn gap-2 btn-outline-danger"
//                                                 onClick={handleAddMore}
//                                             > <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
//                                                 ADD MORE
//                                             </button>

//                                             <button
//                                                 type="button"
//                                                 className="btn gap-2 btn-outline-danger"
//                                                 style={{ marginLeft: 15 }}
//                                                 onClick={saveAllChanges}
//                                             > <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
//                                                 SAVE ALL
//                                             </button>


//                                             {/* <Button variant="outline-primary" onClick={handleAddMore}>
//                                 Add More
//                             </Button> */}
//                                             {/* <Button variant="outline-primary" onClick={saveAllChanges} style={{ marginLeft: 15 }}>
//                                 Save All Changes
//                             </Button> */}
//                                         </div>)}







//                                     {cfstarrifServices.length > 0 && (
//                                         <div className="mt-3">
//                                             <hr />

//                                             <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
//                                                 icon={faMoneyBill1}
//                                                 style={{
//                                                     marginRight: '8px',
//                                                     color: 'black', // Set the color to golden
//                                                 }}
//                                             />Warehouse Standard Services</h5>

//                                             <hr />
//                                             <div className="table-responsive">
//                                                 <Table className="table table-striped table-hover">
//                                                     <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
//                                                         <tr className="text-center">
//                                                             <th style={{ backgroundColor: '#BADDDA' }} scope="col">Service Id</th>
//                                                             <th style={{ backgroundColor: '#BADDDA' }} scope="col">Service</th>
//                                                             <th style={{ backgroundColor: '#BADDDA' }} scope="col">Tax Applicable</th>
//                                                             <th style={{ backgroundColor: '#BADDDA' }} scope="col">Range</th>
//                                                             <th style={{ backgroundColor: '#BADDDA' }} scope="col">Rate</th>
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody>
//                                                         {
//                                                             cfstarrifServices.map((servicemaster, index) =>

//                                                                 <tr key={index} className="text-center">
//                                                                     <td className="table-column">{servicemaster[1]}</td>
//                                                                     <td className="table-column">{servicemaster[3]}</td>
//                                                                     <td className="table-column">{servicemaster[2] === 'Y' ? "Yes" : "No"}</td>
//                                                                     <td className="table-column">{servicemaster[4]}</td>
//                                                                     <td className="table-column">{servicemaster[5] || "00.00"}</td>

//                                                                 </tr>

//                                                             )
//                                                         }

//                                                     </tbody>
//                                                 </Table>
//                                             </div>
//                                         </div>


//                                     )}



//                                 </CardBody >
//                             </Card >

//                         </div>
//                     </>
//                 )

//             }




//         </>
//     );
// }

// export default Rate_CFS_Service;



// import { useParams } from 'react-router-dom';
// import AuthContext from "../Components/AuthProvider";
// import { Form, useNavigate } from "react-router-dom";
// import React, { useState, useEffect, useContext } from "react";
// import "../Components/Style.css";
// import { Button } from "react-bootstrap";
// import { ToastContainer, toast } from 'react-toastify';
// import Select from 'react-select';
// import Rate_Chart_Service from "../services/Rate_Chart_Service";
// import Table from 'react-bootstrap/Table';
// import { Link, useLocation } from "react-router-dom";
// import { Card, CardBody, Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAdd, faArrowLeft, faArrowRight, faArrowUpRightDots, faBalanceScale, faBullhorn, faClose, faFile, faMoneyBill1, faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';


// function Rate_CFS_Service(props) {
//     const location = useLocation();
//     const cfsTarrifNo = location.state?.cfsTariffNo;
//     const sirid = location.state?.sirid;
//     const range = location.state?.range;
//     const amnd = location.state?.amnd;

//     const [cfsTariffNo, setCfsTariffNo] = useState('');
//     const [serviceId, setServiceId] = useState('');
//     const [cfsDocRefNo, setcfsDocRefNo] = useState('');
//     const [partyId, setpartyId] = useState('');
//     const [payParty, setpayParty] = useState('');
//     const [cfsValidateDate, setcfsValidateDate] = useState('');
//     const [cfsTariffDate, setcfsTariffDate] = useState('');
//     const [status, setstatus] = useState('');
//     const [createdBy, setCreatedBy] = useState('');
//     const [approvedBy, setApprovedBy] = useState('');
//     const [serviceUnit, setServiceUnit] = useState('');
//     const [serviceUnit1, setServiceUnit1] = useState('');
//     const [typeOfCharges, setTypeOfCharges] = useState('N');
//     const [createdDate, setCreatedDate] = useState('');
//     const [cargoMovement, setcargoMovement] = useState('');
//     const [taxApplicable, seTtaxApplicable] = useState('');
//     const [discountPercentage, setDiscountPercentage] = useState('');
//     const [rangeType, setRangeType] = useState('');
//     const [movementCodeTo, setMovementCodeTo] = useState('');
//     const [movementCodeFrom, setMovementCodeFrom] = useState('');
//     const [criteria, setCriteria] = useState('');
//     const [billingParty, setbillingParty] = useState('');
//     const [forwarderId, setforwarderId] = useState('');
//     const [importerId, setimporterId] = useState('');
//     const [containerStatus, setcontainerStatus] = useState('');
//     const [party_Name, setparty_Name] = useState('');
//     const [containerSize, setcontainerSize] = useState('');
//     const [cargoType, setcargoType] = useState('');
//     const [pol, setpol] = useState('');
//     const [negotiable, setNegotiable] = useState('N');
//     const [service, setService] = useState('');
//     const [cfsAmndNo, setcfsAmndNo] = useState('');
//     const [rateCalculation, setRateCalculation] = useState('');
//     const [rate, setRate] = useState('');
//     const [allServices, setAllServices] = useState([]);
//     const [selectedService, setSelectedService] = useState(null);
//     const [taxPercentage, setTaxPercentage] = useState('');
//     const [editedDate, setEditedDate] = useState('');
//     const [approvedDate, setApprovedDate] = useState('');
//     // const [editedDate, setEditedDate] = useState('');
//     const [editedBy, setEditedBy] = useState('');
//     const [currencyId, setCurrencyID] = useState('INR');
//     const [finYear, setfinYear] = useState('');
//     const [companyId, setcompanyId] = useState('');
//     const [errors, setErrors] = useState('');
//     const [cfstarrifServices, setcfstarrifServices] = useState([]);
//     const [rangeFrom, setrangeFrom] = useState('');
//     const [rangeTo, setrangeTo] = useState('');
//     const [rangeRate, setrangeRate] = useState('');
//     const [srlNo, setsrlNo] = useState(1);
//     const [serviceranges, setserviceranges] = useState([]);
//     const [editableData, setEditableData] = useState([]);
//     const [showDetailRow, setShowDetailRow] = useState(true);
//     const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
//     const [CreatedUser, setCreatedUser] = useState('');

//     const navigate = useNavigate();
//     const handleRateChart = () => {
//         navigate(`/parent/rate-chart`, { state: { cfsTariffNo } });
//     };


//     const {
//         userId,
//         username,
//         branchId,
//         companyid,

//     } = useContext(AuthContext);

//     useEffect(() => {

//         if (amnd !== undefined) {
//             setcfsAmndNo(amnd);
//         }

//         if (cfsTarrifNo && sirid) {
//             if (range === 'Plain') {

//                 findByTarrifNoAndServiceID(companyid, branchId, cfsTarrifNo, amnd, sirid);
//             } else {
//                 // alert(range);
//                 findByTarrifnoAndServiceIdRange(companyid, branchId, cfsTarrifNo, amnd, sirid);
//             }
//         } else if (cfsTarrifNo) {
//             getCFSTarrifById(companyid, branchId, cfsTarrifNo);
//             findByTarrifNoServices(companyid, branchId, cfsTarrifNo);
//         }
//     }, []); // Inc








//     const getCreatedUser = (id3) => {
//         Rate_Chart_Service.getUserbyUserId(id3, companyid, branchId).then((res) => {
//             setCreatedUser(res.data.user_Name);
//             // alert(CreatedUser);
//         })
//     };

//     useEffect(() => {
//         setcompanyId(companyid);

//     }, []);

//     useEffect(() => {

//         setEditableData([...serviceranges]);
//     }, [serviceranges]);

//     const getStatusLabel = (status) => {
//         if (status === 'N') {
//             return 'New';
//         } else if (status === 'U') {
//             return 'Edit';
//         } else if (status === 'A') {
//             return 'Approved';
//         } else {
//             return ''; // Handle other cases if needed
//         }
//     };








//     const handleEditableChange = (index, key, value) => {
//         setEditableData((prevEditableData) => {
//             const updatedData = [...prevEditableData];
//             updatedData[index] = {
//                 ...updatedData[index],
//                 [key]: value,
//             };
//             return updatedData;
//         });
//     };

//     const saveAllChanges = () => {

//         if (editableData.some(item => !item.rangeRate)) {
//             // Display an error message using toast or another notification library
//             toast.error('Please Enter Rate !', {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 700,
//             });
//             return; // Exit the function without saving
//         }



//         Rate_Chart_Service.saveAllTarrifRanges(editableData, userId).then((res) => {
//             setserviceranges(res.data);

//             toast.success('Record added successfully !', {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 700,
//             });
//             // setstatus(res.data.status);
//             setEditableData([]); // Reset editableData after saving
//         });
//     };

//     const handleAddMore = () => {

//         const newSrNo = serviceranges.length + 1; // Increment the Sr No

//         // Clone the properties of the previous rows
//         const previousRow = serviceranges[serviceranges.length - 1];
//         const newServiceRange = {
//             ...previousRow,
//             srlNo: newSrNo,
//             rangeFrom: '',
//             rangeTo: '',
//             rangeRate: '',
//             status: ''

//         };

//         setserviceranges([...serviceranges, newServiceRange]);
//         setEditableData([...editableData, newServiceRange]);
//     };

//     const findByTarrifnoAndServiceIdRange = (comid, branchId, cfsTariffNo, amndno, serviceId) => {
//         Rate_Chart_Service.getRangeByTarrifNoAndServiceId(comid, branchId, cfsTariffNo, amndno, serviceId).then((res) => {
//             console.log(res.data);

//             // Iterate through the list of objects
//             res.data.forEach((item) => {
//                 // Set state values for each object
//                 setServiceId(item.serviceId);
//                 setCreatedBy(item.createdBy);
//                 getCreatedUser(item.createdBy);
//                 setCreatedDate(item.setCreatedDate);
//                 setEditedDate(item.setEditedDate);
//                 setcfsDocRefNo(item.cfsDocRefNo);
//                 setcfsAmndNo(item.cfsAmndNo);
//                 setcfsValidateDate(item.cfsValidateDate);
//                 setpartyId(item.partyId);
//                 setparty_Name(item.party_Name);
//                 setServiceId(item.serviceId);
//                 setRate(item.rate);
//                 setstatus(item.status);
//                 setApprovedBy(item.editedBy);
//                 setCreatedDate(item.createdDate);
//                 setApprovedDate(item.approvedDate);
//                 setRangeType(item.rangeType)
//                 seTtaxApplicable(item.taxApplicable);
//             });

//             // Calling getServiceByID with serviceId
//             getServiceByID(companyid, branchId, serviceId);

//             // Setting serviceranges state (you might want to set this outside the loop)
//             setserviceranges(res.data);
//         });
//     };



//     const findByTarrifNoServices = async (companyid, branchId, tarrifno) => {
//         try {
//             const response = await Rate_Chart_Service.getCombinedServicesSingleTarrifNo(companyid, branchId, tarrifno);
//             const allcfssrvData = response.data;
//             // alert("2566");

//             // console.warn(allcfssrvData);
//             setcfstarrifServices(allcfssrvData);

//             // if (allcfssrvData.length > 0) {
//             findUpdatedServices(allcfssrvData);
//             // }

//         }
//         catch (error) {
//             console.error("Error loading tariff data:", error);
//         }

//     };

//     const findUpdatedServices = async (serviceData) => {

//         const serviceIds = serviceData.map(service => service[1]);

//         try {
//             const response = await Rate_Chart_Service.getExcludedServices(companyid, branchId, serviceIds);
//             const serviceOptions = response.data.map(service => ({
//                 value: service.service_Id,
//                 label: service.serviceShortDescription
//             }));



//             setAllServices(serviceOptions);
//         } catch (error) {
//             console.error('Error fetching serviceIds:', error);
//         }
//     };




//     useEffect(() => {
//         setcompanyId(companyid);
//         setCfsTariffNo(cfsTarrifNo);
//         getCFSTarrifById(companyid, branchId, cfsTarrifNo);

//     }, [])

//     const handleValidation = () => {
//         let formIsValid = true;
//         const newErrors = {};


//         if (!service) {
//             formIsValid = false;
//             newErrors['service'] = 'service is required.';
//         }
//         setErrors(newErrors);
//         return formIsValid;
//     };

//     const closeRange = () => {
//         setShowDetailRow(false);
//         setIsAddButtonDisabled(true);
//     }




//     const getCFSTarrifById = async (compId, branchId, cfsTariff) => {

//         Rate_Chart_Service.getCFSTarrifById(compId, branchId, cfsTariff).then((res) => {

//             setcfsDocRefNo(res.data.cfsDocRefNo);
//             setcfsAmndNo(res.data.cfsAmndNo);
//             setcfsValidateDate(res.data.cfsValidateDate);
//             setpartyId(res.data.partyId);
//             setcfsTariffDate(res.data.cfsTariffDate);
//             setparty_Name(res.data.party_Name);


//         })
//     }
//     const cfsRange =
//     {
//         cfsTariffNo, serviceId, cfsDocRefNo, partyId, party_Name, rangeFrom, rangeTo, rangeRate, cfsAmndNo, cfsDocRefNo,
//         srlNo, createdBy, createdDate, approvedBy, cfsAmndNo, editedDate, approvedDate, currencyId, branchId, companyId, createdBy, taxApplicable,
//         rangeType, editedBy
//     }


//     const cfstarrifservice =
//     {
//         cfsTariffNo, cfsDocRefNo, serviceId, partyId, payParty, cfsValidateDate, cfsTariffDate, status, createdBy, approvedBy, editedBy, editedDate,
//         serviceUnit, serviceUnit1, typeOfCharges, cargoMovement, taxApplicable, rangeType, approvedBy, approvedDate, createdDate,
//         cfsAmndNo, rateCalculation, service, rate, cfsValidateDate, cfsAmndNo, currencyId,
//         taxPercentage, party_Name, status
//     }



//     const makefieldsEmpty = () => {
//         setsrlNo(srlNo + 1);
//         setrangeFrom('');
//         setrangeTo('');
//         setrangeRate('');
//         setstatus('');
//     }

//     const addCfstarrifServiceRange = async (e) => {


//         if (!rangeRate) {
//             return toast.error('Please Enter Rate !', {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 700,
//             });
//         }
//         try {
//             Rate_Chart_Service.addTarrifRange(
//                 companyid,
//                 branchId,
//                 userId,
//                 cfsRange
//             ).then((res) => {
//                 findByTarrifNoServices(res.data.companyId, res.data.branchId, res.data.cfsTariffNo);
//                 findByTarrifnoAndServiceIdRange(res.data.companyId, res.data.branchId, res.data.cfsTariffNo, res.data.cfsAmndNo, res.data.serviceId);
//                 makefieldsEmpty();

//                 toast.success('Record added successfully !', {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 700,
//                 });
//                 // saveAllChanges();
//             })

//         } catch (error) {
//             console.error('Error while adding data:', error);
//         }
//     };


//     // const updateCfsServiceRangeStatus = (e) => {
//     //     Rate_Chart_Service.getRangeByTarrifNoAndSerNo(companyid, branchId, username, cfsRange).then((res) => {
//     //         findByTarrifNoServices(res.data.cfsTariffNo);
//     //         findByTarrifnoAndServiceIdRange(res.data.cfsTariffNo, res.data.serviceId);
//     //         makefieldsEmpty();
//     //     });
//     // }

//     const addCfstarrifService = () => {


//         Rate_Chart_Service.addCFSservice(companyid, branchId, userId, cfstarrifservice).then((res) => {
//             findByTarrifNoAndServiceID(res.data.companyId, res.data.branchId, res.data.cfsTariffNo, res.data.cfsAmndNo, res.data.serviceId);
//             toast.success('Record added successfully !', {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 700,
//             });

//             findByTarrifNoServices(res.data.companyId, res.data.branchId, res.data.cfsTariffNo);

//         });
//     }

//     const updateCfstarrifService = (e) => {


//         // console.log("Sending");
//         // console.log(cfstarrifservice);
//         Rate_Chart_Service.updateCFSservice(companyid, branchId, userId, cfsTariffNo, cfstarrifservice).then((res) => {
//             // getServiceByID(res.data.cfsTariffNo);
//             toast.success('Record updated successfully !', {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 700,
//             });
//             // setServiceId(res.data.serviceId);
//             findByTarrifNoAndServiceID(res.data.companyId, res.data.branchId, res.data.cfsTariffNo, res.data.cfsAmndNo, res.data.serviceId);
//             // findByTarrifNoServices(res.data.cfsTariffNo);
//         });
//     }



//     const SaveOrUpdate = async (e) => {
//         const isFormValid = handleValidation();
//         if (isFormValid) {

//             // console.log(Tarrifs);
//             if (serviceId === 'N' || status === 'E') {
//                 // Update
//                 updateCfstarrifService();
//             }
//             // if (status === 'A') {
//             //     UpdateTarrifServiceStatus();
//             // }
//             else {
//                 // Add
//                 addCfstarrifService();
//             }
//         }
//         else {
//             toast.error('Oops something went wrong !', {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 700,
//             });
//         }
//     }

//     const makefieldEmpty = (e) => {
//         setServiceUnit('');
//         setServiceUnit('');
//         setServiceUnit1('');
//         seTtaxApplicable('')
//         setTaxPercentage('');
//         setRateCalculation('');
//         setTypeOfCharges('');
//         setTypeOfCharges('')
//         setCreatedBy('')
//         setApprovedBy('')
//         setCreatedDate('')
//         setEditedDate('')
//         setApprovedDate('')
//         setService('');
//         setServiceId('');
//         setRate('');
//         setRangeType('');
//         setfinYear('');
//         setErrors('');
//         setstatus('');
//         setShowDetailRow(true);
//         setIsAddButtonDisabled(false)
//     }

//     const findByTarrifNoAndServiceID = async (compid, branchId, tarrifno, amndno, serid) => {
//         // alert("In Method");



//         // alert(compid);
//         // alert(branchId);
//         // alert(tarrifno);
//         // alert(amndno);
//         // alert(serid);
//         // alert(compid);

//         await Rate_Chart_Service.findByTarrifNoAndServiceID(compid, branchId, tarrifno, amndno, serid).then((res) => {
//             console.log("Data Below");
//             console.warn(res.data);
//             setServiceId(res.data.serviceId);
//             setCfsTariffNo(res.data.cfsTariffNo);
//             setServiceUnit(res.data.serviceUnit);
//             setServiceUnit(res.data.serviceUnit);
//             setServiceUnit1(res.data.serviceUnit1);
//             seTtaxApplicable(res.data.taxApplicable);
//             setTaxPercentage(res.data.taxPercentage);
//             setRateCalculation(res.data.rateCalculation);
//             setTypeOfCharges(res.data.typeOfCharges);
//             setTypeOfCharges(res.data.typeOfCharges)
//             setCreatedBy(res.data.createdBy);
//             getCreatedUser(res.data.createdBy);
//             setApprovedBy(res.data.approvedBy);
//             setCreatedDate(res.data.createdDate);
//             setEditedDate(res.data.editedDate);
//             setApprovedDate(res.data.approvedDate);
//             setService(res.data.service);
//             setstatus(res.data.status);
//             setRangeType(res.data.rangeType);
//             setRate(res.data.rate);
//             setRangeType(res.data.rangeType);
//             setCurrencyID(res.data.currencyId);
//             setcfsDocRefNo(res.data.cfsDocRefNo);
//             setpartyId(res.data.partyId);
//             setparty_Name(res.data.party_Name);

//         });
//     };



//     const getServiceByID = (companyId, branchId, serviceId) => {
//         Rate_Chart_Service.getByServiceId(companyId, branchId, serviceId).then((res) => {
//             setServiceId(serviceId);
//             setService(res.data.serviceShortDescription);
//             setServiceUnit(res.data.serviceUnit);
//             setServiceUnit(res.data.serviceUnit);
//             setServiceUnit1(res.data.serviceUnit1);
//             seTtaxApplicable(res.data.taxApplicable)
//             setTaxPercentage(res.data.taxPercentage);
//             setRateCalculation(res.data.rateCalculation);
//             setTypeOfCharges(res.data.typeOfCharges);
//             setRangeType(res.data.rateCalculation);
//         })
//     }

//     const handleServiceChange = async (selectedOption, { action }) => {

//         if (action === 'clear') {
//             setSelectedService('');
//             setsrlNo(1);
//             setService('');
//             setServiceId('');
//         }
//         else {
//             setSelectedService(selectedOption);
//             setsrlNo(1);
//             setService(selectedOption ? selectedOption.label : '');
//             setServiceId(selectedOption ? selectedOption.value : '');
//             getServiceByID(companyId, branchId, selectedOption ? selectedOption.value : '');
//             findByTarrifnoAndServiceIdRange(companyId, branchId, cfsTariffNo, amnd, selectedOption.value);
//         }
//     };



//     const { isAuthenticated } = useContext(AuthContext);
//     useEffect(() => {
//         if (!isAuthenticated) {
//             navigate(
//                 "/login?message=You need to be authenticated to access this page."
//             );
//         }
//     }, [isAuthenticated, navigate]);
//     return (
//         <>

//             <div className="Container" >
//                 <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
//                     icon={faMoneyBill1}
//                     style={{
//                         marginRight: '8px',
//                         color: 'black', // Set the color to golden
//                     }}
//                 />Tarrif Services</h5>

//                 <Card style={{ backgroundColor: "#F8F8F8" }}>


//                     <CardBody>

//                         {/* 1st  */}
//                         <Row>
//                             <Col md={4}>
//                                 <Row>
//                                     <Col md={8}>

//                                         <FormGroup>
//                                             <Label className="forlabel" for="branchId">Tarrif Id</Label>
//                                             <Input
//                                                 type="text" name="cfsTariffNo"
//                                                 className="form-control"
//                                                 id='service' readOnly
//                                                 value={cfsTariffNo}
//                                                 onChange={(e) => setCfsTariffNo(e.target.value)}
//                                             />
//                                         </FormGroup>


//                                     </Col>

//                                     <Col md={4}>

//                                         <FormGroup>
//                                             {/* <Label className="forlabel" for="branchId">Tarrif Id</Label> */}
//                                             <Input
//                                                 type="text" name="cfsAmndNo"
//                                                 className="form-control"
//                                                 style={{ marginTop: '32px' }}
//                                                 id='service' readOnly
//                                                 value={cfsAmndNo}
//                                                 onChange={(e) => setcfsAmndNo(e.target.value)}
//                                             />
//                                         </FormGroup>

//                                     </Col>

//                                 </Row>

//                             </Col>

//                             <Col md={4}>
//                                 <FormGroup>
//                                     <Label className="forlabel" for="branchId">Service</Label>
//                                     <Select
//                                         options={allServices}
//                                         value={{ value: service, label: service }}
//                                         onChange={handleServiceChange}
//                                         isDisabled={service}
//                                         isClearable
//                                         styles={{
//                                             control: (provided, state) => ({
//                                                 ...provided,
//                                                 border: state.isFocused ? '1px solid #ccc' : `1px solid ${errors.service ? '#f52b2b' : '#ccc'}`,
//                                                 boxShadow: 'none',
//                                                 '&:hover': {
//                                                     border: '1px solid #ccc'
//                                                 }
//                                             }),
//                                             indicatorSeparator: () => ({
//                                                 display: 'none'
//                                             }),
//                                             dropdownIndicator: () => ({
//                                                 display: 'none'
//                                             })
//                                         }}
//                                     />
//                                 </FormGroup>
//                             </Col>



//                             <Col md={4}>
//                                 <FormGroup>
//                                     <Label className="forlabel" for="branchId">Status</Label>
//                                     <Input
//                                         type="text" name="status"
//                                         id='service' readOnly
//                                         className="form-control"
//                                         value={status === "A" ? "Approved" : status === "U" ? "Edit" : status === "N" ? "New" : " "}
//                                         onChange={(e) => setstatus(e.target.value)}
//                                     />
//                                 </FormGroup>
//                             </Col>


//                         </Row>


//                         {/* 2nd */}


//                         <Row>
//                             <Col md={4}>
//                                 <FormGroup>
//                                     <Label className="forlabel" for="branchId">Service Unit</Label>
//                                     <Input
//                                         type="text" name="serviceUnit"
//                                         className="form-control"
//                                         value={serviceUnit}
//                                         id='service' readOnly
//                                         onChange={(e) => setServiceUnit(e.target.value)}
//                                         style={{ height: '45px' }}
//                                     />
//                                 </FormGroup>
//                             </Col>

//                             <Col md={4}>
//                                 <FormGroup>
//                                     <Label className="forlabel" for="branchId">Currency</Label>
//                                     <Input
//                                         type="text" name="Currency"
//                                         className="form-control"
//                                         id='service'
//                                         readonly
//                                         style={{ height: '45px' }}
//                                         value={currencyId}
//                                         // onChange={(e) => setCurrencyID(e.target.value)}
//                                     />
//                                 </FormGroup>
//                             </Col>



//                             <Col md={4}>
//                                 <FormGroup>
//                                     <Label className="forlabel" for="branchId">Created By</Label>
//                                     <Input type="text" name="serviceUnit"
//                                         className="form-control"
//                                         value={CreatedUser}
//                                         id='service' readOnly
//                                     // onChange={(e) => (e.target.value)}

//                                     />

//                                 </FormGroup>
//                             </Col>

//                         </Row>

//                         {/* 3rd */}
//                         <Row>
//                             <Col md={4}>
//                                 <FormGroup>
//                                     <Label className="forlabel" for="branchId">Rate Calculation</Label>
//                                     <div className="row mt-2">
//                                         <div className="col-4 d-flex align-items-center ">
//                                             <div className="form-check form-check-inline">
//                                                 <input className="form-check-input radios custom-radio"
//                                                     type="radio" name="rateCalculation" value="Range"
//                                                     onChange={(e) => setRateCalculation(e.target.value)}
//                                                     checked={rateCalculation === "Range"}
//                                                     disabled={true}
//                                                 />

//                                                 <label>Range</label>
//                                             </div>
//                                         </div>

//                                         <div className="col-4 d-flex align-items-center">
//                                             <div className="form-check form-check-inline">
//                                                 <input className="form-check-input radios custom-radio"
//                                                     type="radio" name="rateCalculation" value="Slab"
//                                                     onChange={(e) => setRateCalculation(e.target.value)}
//                                                     checked={rateCalculation === "Slab"}
//                                                     disabled={true}

//                                                 />
//                                                 <label>Slab</label>
//                                             </div>
//                                         </div>

//                                         <div className="col-4 d-flex align-items-center">
//                                             <div className="form-check form-check-inline">
//                                                 <input className="form-check-input radios custom-radio"
//                                                     type="radio" name="rateCalculation" value="Plain"
//                                                     onChange={(e) => setRateCalculation(e.target.value)}
//                                                     checked={rateCalculation === "Plain"}
//                                                     disabled={true}

//                                                 />
//                                                 <label>Plain</label>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </FormGroup>
//                             </Col>


//                             <div className="col-md-4">
//                                 <FormGroup>
//                                     <Label className="forlabel" for="branchId">Tax Applicable</Label>
//                                     <Row>
//                                         <Col md={3}>
//                                             <input
//                                                 className="form-check-input radios"
//                                                 type="checkbox"
//                                                 disabled
//                                                 style={{ width: 30, height: 30 }}
//                                                 name="taxApplicable"
//                                                 checked={taxApplicable === "Y"}
//                                                 onChange={(e) => seTtaxApplicable(e.target.checked ? "Y" : "N")}
//                                             />
//                                         </Col>
//                                     </Row>
//                                 </FormGroup>
//                             </div>

//                             {/* <Col md={4}>
//                             <FormGroup>
//                                 <Label className="forlabel" for="branchId">Tax Applicable</Label>
//                                 <Row>
//                                     <Col md={3}>
//                                         <input
//                                             className="form-check-input radios"
//                                             type="checkbox"
//                                             disabled
//                                             name="taxApplicable"
//                                             checked={taxApplicable === "Y"}
//                                             onChange={(e) => seTtaxApplicable(e.target.checked ? "Y" : "N")}
//                                         />
//                                     </Col>
//                                 </Row>
//                             </FormGroup>
//                         </Col> */}



//                             <Col>
//                                 <FormGroup>
//                                     <Label className="forlabel" for="branchId">Rate</Label>
//                                     <Input type="text" name="rate"
//                                         className="form-control"
//                                         value={rate}
//                                         onChange={(e) => setRate(e.target.value)}
//                                         id={rateCalculation !== 'Plain' ? 'service' : undefined}
//                                         readOnly={rateCalculation !== 'Plain'}

//                                     />

//                                 </FormGroup>
//                             </Col>

//                         </Row>

//                         <Row>
//                             <Col md={4} style={{

//                                 display: "flex",
//                                 justifyContent: "center", // Center buttons horizontally
//                             }}>


//                             </Col>


//                             <Col md={4}>
//                                 <div
//                                     style={{
//                                         marginTop: '5px',
//                                         marginBottom: '5px',
//                                         display: "flex",
//                                         justifyContent: "center", // Center buttons horizontally
//                                     }}
//                                 >



//                                     <button
//                                         type="button"
//                                         className="btn gap-2  btn-outline-success"
//                                         disabled={cfsTarrifNo && sirid && range !== 'Plain' || rateCalculation !== 'Plain'}
//                                         style={{ marginRight: 10 }}
//                                         onClick={(e) => SaveOrUpdate(e)}
//                                     > <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
//                                         Save
//                                     </button>



//                                     {sirid !== undefined  ? null :(
//                                         <button
//                                             type="button"
//                                             className="btn gap-2 btn-outline-danger"
//                                             style={{ marginRight: 10 }}
//                                             onClick={(e) => makefieldEmpty(e)}
//                                         >
//                                             <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
//                                             Clear
//                                         </button>
//                                     )}

//                                     {/* <Button variant="outline-primary" onClick={(e) => makefieldEmpty(e)}
//                             disabled={cfsTarrifNo && sirid && range}
//                         >Clear</Button> */}



//                                     <Button
//                                         variant="outline-danger"
//                                         style={{ marginLeft: 10 }}
//                                         onClick={handleRateChart}
//                                     ><FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} />
//                                         Back
//                                     </Button>



//                                 </div>
//                             </Col>
//                             <Col md={4} style={{
//                                 marginTop: '5px',
//                                 marginBottom: '5px',
//                                 display: "flex",

//                             }}>




//                             </Col>
//                         </Row>




//                         {rateCalculation !== 'Plain' && rateCalculation != null && rateCalculation !== '' && (
//                             <div className="table-responsive text-center mt-3">
//                                 <table className="table">

//                                     <thead>
//                                         <tr className="text-center">
//                                             <th>Sr No</th>
//                                             <th>Range From</th>
//                                             <th>Range To</th>
//                                             <th>Range Rate</th>
//                                             <th>Status</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {serviceranges.map((serviceRange, index) => (
//                                             <tr className="text-center" key={index}>

//                                                 <td className="text-center" >
//                                                     <input
//                                                         type="text"
//                                                         readOnly
//                                                         id="service"
//                                                         className="text-center enhanceinput"
//                                                         tabIndex="-1"
//                                                         style={{
//                                                             width: '10vw',
//                                                             height: '40px',
//                                                             border: 'none',
//                                                             background: 'none',
//                                                             boxShadow: 'none',
//                                                             padding: 0,
//                                                             cursor: 'default',
//                                                             pointerEvents: 'none'
//                                                         }}
//                                                         value={editableData[index]?.srlNo || 0}
//                                                         onChange={(e) => handleEditableChange(index, 'srlNo', e.target.value)}
//                                                     />
//                                                 </td>
//                                                 <td>
//                                                     <input
//                                                         type="text"
//                                                         style={{ width: '10vw', height: '40px' }}
//                                                         className="text-center enhanceinput"
//                                                         value={editableData[index]?.rangeFrom !== undefined ? editableData[index]?.rangeFrom : ''}
//                                                         onChange={(e) => handleEditableChange(index, 'rangeFrom', e.target.value)}
//                                                         readOnly={!cfsTarrifNo || !sirid || !range}
//                                                     />
//                                                 </td>
//                                                 <td>
//                                                     <input
//                                                         type="text"
//                                                         style={{ width: '10vw', height: '40px' }}
//                                                         className="text-center enhanceinput"
//                                                         value={editableData[index]?.rangeTo || ''}
//                                                         onChange={(e) => handleEditableChange(index, 'rangeTo', e.target.value)}
//                                                     />
//                                                 </td>
//                                                 <td>
//                                                     <input
//                                                         type="number"
//                                                         style={{ width: '10vw', height: '40px' }}
//                                                         className="text-center enhanceinput"
//                                                         value={editableData[index]?.rangeRate !== undefined ? editableData[index]?.rangeRate : ''}
//                                                         onChange={(e) => handleEditableChange(index, 'rangeRate', e.target.value)}
//                                                     />
//                                                 </td>
//                                                 <td style={{ marginLeft: '300px' }}>
//                                                     <input
//                                                         type="text"
//                                                         className="text-center enhanceinput label-like-input"
//                                                         id='service'
//                                                         tabIndex="-1"   // Prevent focus using the "Tab" key
//                                                         readOnly
//                                                         style={{
//                                                             width: '10vw',
//                                                             height: '40px',
//                                                             border: 'none',
//                                                             background: 'none',
//                                                             boxShadow: 'none',
//                                                             padding: 0,
//                                                             cursor: 'default',
//                                                             pointerEvents: 'none'  // Disable interaction with the input
//                                                         }}
//                                                         value={getStatusLabel(serviceRange.status)}
//                                                         onChange={(e) => handleEditableChange(index, 'status', e.target.value)}
//                                                     />
//                                                 </td>
//                                             </tr>
//                                         ))}




//                                         {(!sirid && !range && rateCalculation !== 'Plain' && rateCalculation != null && rateCalculation !== '') && showDetailRow && (


//                                             <tr className="text-center">
//                                                 <td className="text-center">
//                                                     <input
//                                                         type="text"
//                                                         name="srlNo"
//                                                         className="text-center enhanceinput form-input"
//                                                         tabIndex="-1"
//                                                         style={{
//                                                             width: '10vw',
//                                                             height: '40px',
//                                                             border: 'none',
//                                                             background: 'none',
//                                                             boxShadow: 'none',
//                                                             padding: 0,
//                                                             cursor: 'default',
//                                                             pointerEvents: 'none'
//                                                         }}
//                                                         value={srlNo}
//                                                         id='service'
//                                                         readOnly
//                                                     />
//                                                 </td>
//                                                 <td>
//                                                     <input
//                                                         type="text"
//                                                         name="rangeFrom"
//                                                         className="text-center enhanceinput form-input"
//                                                         style={{ width: '10vw', height: '40px' }}
//                                                         value={rangeFrom}
//                                                         onChange={(e) => setrangeFrom(e.target.value)}
//                                                     />
//                                                 </td>
//                                                 <td>
//                                                     <input
//                                                         type="text"
//                                                         name="rangeTo"
//                                                         className="text-center enhanceinput form-input"
//                                                         style={{ width: '10vw', height: '40px' }}
//                                                         value={rangeTo}
//                                                         onChange={(e) => setrangeTo(e.target.value)}
//                                                     />
//                                                 </td>
//                                                 <td>


//                                                     <input
//                                                         type="number"
//                                                         name="rangeRate"
//                                                         className="text-center enhanceinput form-input"
//                                                         value={rangeRate}
//                                                         onChange={(e) => setrangeRate(e.target.value)}
//                                                     />
//                                                 </td>
//                                                 <td>
//                                                     <input
//                                                         type="text"
//                                                         name="status"
//                                                         className="text-center enhanceinput form-input"
//                                                         tabIndex='-1'
//                                                         style={{
//                                                             width: '10vw',
//                                                             width: '10vw',
//                                                             height: '40px',
//                                                             border: 'none',         // Remove the border
//                                                             background: 'none',     // Remove the background color
//                                                             boxShadow: 'none',      // Remove any box shadow
//                                                             padding: 0,             // Remove padding
//                                                             cursor: 'default',
//                                                             height: '40px'
//                                                         }}
//                                                         id='service'
//                                                         readOnly
//                                                         onChange={(e) => setstatus(e.target.value)}
//                                                     />
//                                                 </td>
//                                             </tr>)}







//                                     </tbody>
//                                 </table>
//                             </div>)}
//                         {!sirid && !range && rateCalculation !== 'Plain' && rateCalculation != null && rateCalculation !== '' && (
//                             <div className="text-center">
//                                 {/* <Button variant="outline-primary" onClick={addCfstarrifServiceRange} style={{ marginLeft: 15 }} disabled={isAddButtonDisabled}>
//                                 Add Detail
//                             </Button>
//                             <Button variant="outline-primary" onClick={closeRange} style={{ marginLeft: 15 }}>
//                                 CLose
//                             </Button> */}
//                                 <button
//                                     type="button"
//                                     className="btn gap-2  btn-outline-danger"
//                                     onClick={addCfstarrifServiceRange}
//                                     disabled={isAddButtonDisabled}
//                                     style={{ marginRight: '10px' }}
//                                 > <FontAwesomeIcon icon={faAdd} style={{ marginRight: '5px' }} />
//                                     ADD DETAIL
//                                 </button>


//                                 <button
//                                     type="button"
//                                     className="btn gap-2  btn-outline-danger"
//                                     onClick={closeRange}
//                                 > <FontAwesomeIcon icon={faClose} style={{ marginRight: '5px' }} />
//                                     CLOSE
//                                 </button>

//                             </div>)}


//                         {cfsTarrifNo && sirid && range !== 'Plain' && (
//                             <div className="text-center">

//                                 <button
//                                     type="button"
//                                     className="btn gap-2 btn-outline-danger"
//                                     onClick={handleAddMore}
//                                 > <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
//                                     ADD MORE
//                                 </button>

//                                 <button
//                                     type="button"
//                                     className="btn gap-2 btn-outline-danger"
//                                     style={{ marginLeft: 15 }}
//                                     onClick={saveAllChanges}
//                                 > <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
//                                     SAVE ALL
//                                 </button>


//                                 {/* <Button variant="outline-primary" onClick={handleAddMore}>
//                                 Add More
//                             </Button> */}
//                                 {/* <Button variant="outline-primary" onClick={saveAllChanges} style={{ marginLeft: 15 }}>
//                                 Save All Changes
//                             </Button> */}
//                             </div>)}







//                         {cfstarrifServices.length > 0 && (
//                             <div className="mt-3">
//                                 <hr />

//                                 <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
//                                     icon={faMoneyBill1}
//                                     style={{
//                                         marginRight: '8px',
//                                         color: 'black', // Set the color to golden
//                                     }}
//                                 />Warehouse Standard Services</h5>

//                                 <hr />
//                                 <div className="table-responsive">
//                                     <Table className="table table-striped table-hover">
//                                         <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
//                                             <tr className="text-center">
//                                                 <th style={{ backgroundColor: '#BADDDA' }} scope="col">Service Id</th>
//                                                 <th style={{ backgroundColor: '#BADDDA' }} scope="col">Service</th>
//                                                 <th style={{ backgroundColor: '#BADDDA' }} scope="col">Tax Applicable</th>
//                                                 <th style={{ backgroundColor: '#BADDDA' }} scope="col">Range</th>
//                                                 <th style={{ backgroundColor: '#BADDDA' }} scope="col">Rate</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {
//                                                 cfstarrifServices.map((servicemaster, index) =>

//                                                     <tr key={index} className="text-center">
//                                                         <td className="table-column">{servicemaster[1]}</td>
//                                                         <td className="table-column">{servicemaster[3]}</td>
//                                                         <td className="table-column">{servicemaster[2] === 'Y' ? "Yes" : "No"}</td>
//                                                         <td className="table-column">{servicemaster[4]}</td>
//                                                         <td className="table-column">{servicemaster[5] || "00.00"}</td>

//                                                     </tr>

//                                                 )
//                                             }

//                                         </tbody>
//                                     </Table>
//                                 </div>
//                             </div>


//                         )}



//                     </CardBody >
//                 </Card >

//             </div>


//         </>
//     );
// }

// export default Rate_CFS_Service;



import { useParams } from 'react-router-dom';
import AuthContext from "../Components/AuthProvider";
import { Form, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import "../Components/Style.css";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import Table from 'react-bootstrap/Table';
import { Link, useLocation } from "react-router-dom";
import { Card, CardBody, Container, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faArrowLeft, faArrowRight, faArrowUpRightDots, faBalanceScale, faBullhorn, faClose, faFile, faMoneyBill1, faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';


function Rate_CFS_Service(props) {
    const location = useLocation();
    const cfsTarrifNo = location.state?.cfsTariffNo;
    const sirid = location.state?.sirid;
    const range = location.state?.range;
    const amnd = location.state?.amnd;

    const [cfsTariffNo, setCfsTariffNo] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [cfsDocRefNo, setcfsDocRefNo] = useState('');
    const [partyId, setpartyId] = useState('');
    const [payParty, setpayParty] = useState('');
    const [cfsValidateDate, setcfsValidateDate] = useState('');
    const [cfsTariffDate, setcfsTariffDate] = useState('');
    const [status, setstatus] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [serviceUnit, setServiceUnit] = useState('');
    const [serviceUnit1, setServiceUnit1] = useState('');
    const [typeOfCharges, setTypeOfCharges] = useState('N');
    const [createdDate, setCreatedDate] = useState('');
    const [cargoMovement, setcargoMovement] = useState('');
    const [taxApplicable, seTtaxApplicable] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [rangeType, setRangeType] = useState('');
    const [movementCodeTo, setMovementCodeTo] = useState('');
    const [movementCodeFrom, setMovementCodeFrom] = useState('');
    const [criteria, setCriteria] = useState('');
    const [billingParty, setbillingParty] = useState('');
    const [forwarderId, setforwarderId] = useState('');
    const [importerId, setimporterId] = useState('');
    const [containerStatus, setcontainerStatus] = useState('');
    const [party_Name, setparty_Name] = useState('');
    const [containerSize, setcontainerSize] = useState('');
    const [cargoType, setcargoType] = useState('');
    const [pol, setpol] = useState('');
    const [negotiable, setNegotiable] = useState('N');
    const [service, setService] = useState('');
    const [cfsAmndNo, setcfsAmndNo] = useState('');
    const [rateCalculation, setRateCalculation] = useState('');
    const [rate, setRate] = useState('');
    const [allServices, setAllServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [taxPercentage, setTaxPercentage] = useState('');
    const [editedDate, setEditedDate] = useState('');
    const [approvedDate, setApprovedDate] = useState('');
    // const [editedDate, setEditedDate] = useState('');
    const [editedBy, setEditedBy] = useState('');
    const [currencyId, setCurrencyID] = useState('INR');
    const [finYear, setfinYear] = useState('');
    const [companyId, setcompanyId] = useState('');
    const [errors, setErrors] = useState('');
    const [cfstarrifServices, setcfstarrifServices] = useState([]);
    const [rangeFrom, setrangeFrom] = useState('');
    const [rangeTo, setrangeTo] = useState('');
    const [rangeRate, setrangeRate] = useState('');
    const [srlNo, setsrlNo] = useState(1);
    const [serviceranges, setserviceranges] = useState([]);
    const [editableData, setEditableData] = useState([]);
    const [showDetailRow, setShowDetailRow] = useState(true);
    const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
    const [CreatedUser, setCreatedUser] = useState('');

    const navigate = useNavigate();
    const handleRateChart = () => {
        navigate(`/parent/rate-chart`, { state: { cfsTariffNo } });
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

        if (amnd !== undefined) {
            setcfsAmndNo(amnd);
        }

        if (cfsTarrifNo && sirid) {
            if (range === 'Plain') {

                findByTarrifNoAndServiceID(companyid, branchId, cfsTarrifNo, amnd, sirid);
            } else {
                // alert(range);
                findByTarrifnoAndServiceIdRange(companyid, branchId, cfsTarrifNo, amnd, sirid);
            }
        } else if (cfsTarrifNo) {
            getCFSTarrifById(companyid, branchId, cfsTarrifNo);
            findByTarrifNoServices(companyid, branchId, cfsTarrifNo);
        }
    }, []); // Inc








    const getCreatedUser = (id3) => {
        Rate_Chart_Service.getUserbyUserId(id3, companyid, branchId).then((res) => {
            setCreatedUser(res.data.user_Name);
            // alert(CreatedUser);
        })
    };

    useEffect(() => {
        setcompanyId(companyid);

    }, []);

    useEffect(() => {

        setEditableData([...serviceranges]);
    }, [serviceranges]);

    const getStatusLabel = (status) => {
        if (status === 'N') {
            return 'New';
        } else if (status === 'U') {
            return 'Edit';
        } else if (status === 'A') {
            return 'Approved';
        } else {
            return ''; // Handle other cases if needed
        }
    };








    const handleEditableChange = (index, key, value) => {
        setEditableData((prevEditableData) => {
            const updatedData = [...prevEditableData];
            updatedData[index] = {
                ...updatedData[index],
                [key]: value,
            };
            return updatedData;
        });
    };

    const saveAllChanges = () => {

        if (editableData.some(item => !item.rangeRate)) {
            // Display an error message using toast or another notification library
            toast.error('Please Enter Rate !', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 700,
            });
            return; // Exit the function without saving
        }



        Rate_Chart_Service.saveAllTarrifRanges(editableData, userId).then((res) => {
            setserviceranges(res.data);

            toast.success('Record added successfully !', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 700,
            });
            // setstatus(res.data.status);
            setEditableData([]); // Reset editableData after saving
        });
    };

    const handleAddMore = () => {

        const newSrNo = serviceranges.length + 1; // Increment the Sr No

        // Clone the properties of the previous rows
        const previousRow = serviceranges[serviceranges.length - 1];
        const newServiceRange = {
            ...previousRow,
            srlNo: newSrNo,
            rangeFrom: '',
            rangeTo: '',
            rangeRate: '',
            status: ''

        };

        setserviceranges([...serviceranges, newServiceRange]);
        setEditableData([...editableData, newServiceRange]);
    };

    const findByTarrifnoAndServiceIdRange = (comid, branchId, cfsTariffNo, amndno, serviceId) => {
        Rate_Chart_Service.getRangeByTarrifNoAndServiceId(comid, branchId, cfsTariffNo, amndno, serviceId).then((res) => {
            console.log(res.data);

            // Iterate through the list of objects
            res.data.forEach((item) => {
                // Set state values for each object
                setServiceId(item.serviceId);
                setCreatedBy(item.createdBy);
                getCreatedUser(item.createdBy);
                setCreatedDate(item.setCreatedDate);
                setEditedDate(item.setEditedDate);
                setcfsDocRefNo(item.cfsDocRefNo);
                setcfsAmndNo(item.cfsAmndNo);
                setcfsValidateDate(item.cfsValidateDate);
                setpartyId(item.partyId);
                setparty_Name(item.party_Name);
                setServiceId(item.serviceId);
                setRate(item.rate);
                setstatus(item.status);
                setApprovedBy(item.editedBy);
                setCreatedDate(item.createdDate);
                setApprovedDate(item.approvedDate);
                setRangeType(item.rangeType)
                seTtaxApplicable(item.taxApplicable);
            });

            // Calling getServiceByID with serviceId
            getServiceByID(companyid, branchId, serviceId);

            // Setting serviceranges state (you might want to set this outside the loop)
            setserviceranges(res.data);
        });
    };



    const findByTarrifNoServices = async (companyid, branchId, tarrifno) => {
        try {
            const response = await Rate_Chart_Service.getCombinedServicesSingleTarrifNo(companyid, branchId, tarrifno);
            const allcfssrvData = response.data;
            // alert("2566");

            // console.warn(allcfssrvData);
            setcfstarrifServices(allcfssrvData);

            // if (allcfssrvData.length > 0) {
            findUpdatedServices(allcfssrvData);
            // }

        }
        catch (error) {
            console.error("Error loading tariff data:", error);
        }

    };

    const findUpdatedServices = async (serviceData) => {

        const serviceIds = serviceData.map(service => service[1]);

        try {
            const response = await Rate_Chart_Service.getExcludedServices(companyid, branchId, serviceIds);
            const serviceOptions = response.data.map(service => ({
                value: service.service_Id,
                label: service.serviceShortDescription
            }));



            setAllServices(serviceOptions);
        } catch (error) {
            console.error('Error fetching serviceIds:', error);
        }
    };




    useEffect(() => {
        setcompanyId(companyid);
        setCfsTariffNo(cfsTarrifNo);
        getCFSTarrifById(companyid, branchId, cfsTarrifNo);

    }, [])

    const handleValidation = () => {
        let formIsValid = true;
        const newErrors = {};


        if (!service) {
            formIsValid = false;
            newErrors['service'] = 'service is required.';
        }
        setErrors(newErrors);
        return formIsValid;
    };

    const closeRange = () => {
        setShowDetailRow(false);
        setIsAddButtonDisabled(true);
    }




    const getCFSTarrifById = async (compId, branchId, cfsTariff) => {

        Rate_Chart_Service.getCFSTarrifById(compId, branchId, cfsTariff).then((res) => {

            setcfsDocRefNo(res.data.cfsDocRefNo);
            setcfsAmndNo(res.data.cfsAmndNo);
            setcfsValidateDate(res.data.cfsValidateDate);
            setpartyId(res.data.partyId);
            setcfsTariffDate(res.data.cfsTariffDate);
            setparty_Name(res.data.party_Name);


        })
    }
    const cfsRange =
    {
        cfsTariffNo, serviceId, cfsDocRefNo, partyId, party_Name, rangeFrom, rangeTo, rangeRate, cfsAmndNo, cfsDocRefNo,
        srlNo, createdBy, createdDate, approvedBy, cfsAmndNo, editedDate, approvedDate, currencyId, branchId, companyId, createdBy, taxApplicable,
        rangeType, editedBy
    }


    const cfstarrifservice =
    {
        cfsTariffNo, cfsDocRefNo, serviceId, partyId, payParty, cfsValidateDate, cfsTariffDate, status, createdBy, approvedBy, editedBy, editedDate,
        serviceUnit, serviceUnit1, typeOfCharges, cargoMovement, taxApplicable, rangeType, approvedBy, approvedDate, createdDate,
        cfsAmndNo, rateCalculation, service, rate, cfsValidateDate, cfsAmndNo, currencyId,
        taxPercentage, party_Name, status
    }



    const makefieldsEmpty = () => {
        setsrlNo(srlNo + 1);
        setrangeFrom('');
        setrangeTo('');
        setrangeRate('');
        setstatus('');
    }

    const addCfstarrifServiceRange = async (e) => {


        if (!rangeRate) {
            return toast.error('Please Enter Rate !', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 700,
            });
        }
        try {
            Rate_Chart_Service.addTarrifRange(
                companyid,
                branchId,
                userId,
                cfsRange
            ).then((res) => {
                findByTarrifNoServices(res.data.companyId, res.data.branchId, res.data.cfsTariffNo);
                findByTarrifnoAndServiceIdRange(res.data.companyId, res.data.branchId, res.data.cfsTariffNo, res.data.cfsAmndNo, res.data.serviceId);
                makefieldsEmpty();

                toast.success('Record added successfully !', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 700,
                });
                // saveAllChanges();
            })

        } catch (error) {
            console.error('Error while adding data:', error);
        }
    };


    // const updateCfsServiceRangeStatus = (e) => {
    //     Rate_Chart_Service.getRangeByTarrifNoAndSerNo(companyid, branchId, username, cfsRange).then((res) => {
    //         findByTarrifNoServices(res.data.cfsTariffNo);
    //         findByTarrifnoAndServiceIdRange(res.data.cfsTariffNo, res.data.serviceId);
    //         makefieldsEmpty();
    //     });
    // }

    const addCfstarrifService = () => {


        Rate_Chart_Service.addCFSservice(companyid, branchId, userId, cfstarrifservice).then((res) => {
            findByTarrifNoAndServiceID(res.data.companyId, res.data.branchId, res.data.cfsTariffNo, res.data.cfsAmndNo, res.data.serviceId);
            toast.success('Record added successfully !', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 700,
            });

            findByTarrifNoServices(res.data.companyId, res.data.branchId, res.data.cfsTariffNo);

        });
    }

    const updateCfstarrifService = (e) => {


        // console.log("Sending");
        // console.log(cfstarrifservice);
        Rate_Chart_Service.updateCFSservice(companyid, branchId, userId, cfsTariffNo, cfstarrifservice).then((res) => {
            // getServiceByID(res.data.cfsTariffNo);
            toast.success('Record updated successfully !', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 700,
            });
            // setServiceId(res.data.serviceId);
            findByTarrifNoAndServiceID(res.data.companyId, res.data.branchId, res.data.cfsTariffNo, res.data.cfsAmndNo, res.data.serviceId);
            // findByTarrifNoServices(res.data.cfsTariffNo);
        });
    }



    const SaveOrUpdate = async (e) => {
        const isFormValid = handleValidation();
        if (isFormValid) {

            // console.log(Tarrifs);
            if (serviceId === 'N' || status === 'E') {
                // Update
                updateCfstarrifService();
            }
            // if (status === 'A') {
            //     UpdateTarrifServiceStatus();
            // }
            else {
                // Add
                addCfstarrifService();
            }
        }
        else {
            toast.error('Oops something went wrong !', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 700,
            });
        }
    }

    const makefieldEmpty = (e) => {
        setServiceUnit('');
        setServiceUnit('');
        setServiceUnit1('');
        seTtaxApplicable('')
        setTaxPercentage('');
        setRateCalculation('');
        setTypeOfCharges('');
        setTypeOfCharges('')
        setCreatedBy('')
        setApprovedBy('')
        setCreatedDate('')
        setEditedDate('')
        setApprovedDate('')
        setService('');
        setServiceId('');
        setRate('');
        setRangeType('');
        setfinYear('');
        setErrors('');
        setstatus('');
        setShowDetailRow(true);
        setIsAddButtonDisabled(false)
    }

    const findByTarrifNoAndServiceID = async (compid, branchId, tarrifno, amndno, serid) => {
        // alert("In Method");



        // alert(compid);
        // alert(branchId);
        // alert(tarrifno);
        // alert(amndno);
        // alert(serid);
        // alert(compid);

        await Rate_Chart_Service.findByTarrifNoAndServiceID(compid, branchId, tarrifno, amndno, serid).then((res) => {
            console.log("Data Below");
            console.warn(res.data);
            setServiceId(res.data.serviceId);
            setCfsTariffNo(res.data.cfsTariffNo);
            setServiceUnit(res.data.serviceUnit);
            setServiceUnit(res.data.serviceUnit);
            setServiceUnit1(res.data.serviceUnit1);
            seTtaxApplicable(res.data.taxApplicable);
            setTaxPercentage(res.data.taxPercentage);
            setRateCalculation(res.data.rateCalculation);
            setTypeOfCharges(res.data.typeOfCharges);
            setTypeOfCharges(res.data.typeOfCharges)
            setCreatedBy(res.data.createdBy);
            getCreatedUser(res.data.createdBy);
            setApprovedBy(res.data.approvedBy);
            setCreatedDate(res.data.createdDate);
            setEditedDate(res.data.editedDate);
            setApprovedDate(res.data.approvedDate);
            setService(res.data.service);
            setstatus(res.data.status);
            setRangeType(res.data.rangeType);
            setRate(res.data.rate);
            setRangeType(res.data.rangeType);
            setCurrencyID(res.data.currencyId);
            setcfsDocRefNo(res.data.cfsDocRefNo);
            setpartyId(res.data.partyId);
            setparty_Name(res.data.party_Name);

        });
    };



    const getServiceByID = (companyId, branchId, serviceId) => {
        Rate_Chart_Service.getByServiceId(companyId, branchId, serviceId).then((res) => {
            setServiceId(serviceId);
            setService(res.data.serviceShortDescription);
            setServiceUnit(res.data.serviceUnit);
            setServiceUnit(res.data.serviceUnit);
            setServiceUnit1(res.data.serviceUnit1);
            seTtaxApplicable(res.data.taxApplicable)
            setTaxPercentage(res.data.taxPercentage);
            setRateCalculation(res.data.rateCalculation);
            setTypeOfCharges(res.data.typeOfCharges);
            setRangeType(res.data.rateCalculation);
        })
    }

    const handleServiceChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setSelectedService('');
            setsrlNo(1);
            setService('');
            setServiceId('');
        }
        else {
            setSelectedService(selectedOption);
            setsrlNo(1);
            setService(selectedOption ? selectedOption.label : '');
            setServiceId(selectedOption ? selectedOption.value : '');
            getServiceByID(companyId, branchId, selectedOption ? selectedOption.value : '');
            findByTarrifnoAndServiceIdRange(companyId, branchId, cfsTariffNo, amnd, selectedOption.value);
        }
    };



    const { isAuthenticated } = useContext(AuthContext);
    useEffect(() => {
        if (!isAuthenticated) {
            navigate(
                "/login?message=You need to be authenticated to access this page."
            );
        }
    }, [isAuthenticated, navigate]);
    return (
        <>
            {logintype === 'Party' ? (
                <div className="Container" >
                    <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
                        icon={faMoneyBill1}
                        style={{
                            marginRight: '8px',
                            color: 'black', // Set the color to golden
                        }}
                    />Tarrif Services</h5>
                    <hr />
                    {rateCalculation !== 'Plain' && rateCalculation != null && rateCalculation !== '' && (
                        <div className="table-responsive text-center mt-3">
                            <table className="table">

                                <thead>
                                    <tr className="text-center">
                                        <th>Sr No</th>
                                        <th>Range From</th>
                                        <th>Range To</th>
                                        <th>Range Rate</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {serviceranges.map((serviceRange, index) => (
                                        <tr className="text-center" key={index}>

                                            <td className="text-center" >
                                                <input
                                                    type="text"
                                                    readOnly
                                                    id="service"
                                                    className="text-center enhanceinput"
                                                    tabIndex="-1"

                                                    style={{
                                                        width: '10vw',
                                                        height: '40px',
                                                        border: 'none',
                                                        background: 'none',
                                                        boxShadow: 'none',
                                                        padding: 0,
                                                        cursor: 'default',
                                                        pointerEvents: 'none'
                                                    }}
                                                    value={editableData[index]?.srlNo || 0}
                                                    onChange={(e) => handleEditableChange(index, 'srlNo', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    style={{ width: '10vw', height: '40px' }}
                                                    className="text-center enhanceinput"
                                                    value={editableData[index]?.rangeFrom !== undefined ? editableData[index]?.rangeFrom : ''}
                                                    onChange={(e) => handleEditableChange(index, 'rangeFrom', e.target.value)}
                                                    readOnly
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    readOnly
                                                    type="text"
                                                    style={{ width: '10vw', height: '40px' }}
                                                    className="text-center enhanceinput"
                                                    value={editableData[index]?.rangeTo || ''}
                                                    onChange={(e) => handleEditableChange(index, 'rangeTo', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    readOnly
                                                    type="number"
                                                    style={{ width: '10vw', height: '40px' }}
                                                    className="text-center enhanceinput"
                                                    value={editableData[index]?.rangeRate !== undefined ? editableData[index]?.rangeRate : ''}
                                                    onChange={(e) => handleEditableChange(index, 'rangeRate', e.target.value)}
                                                />
                                            </td>

                                        </tr>
                                    ))}




                                    {(!sirid && !range && rateCalculation !== 'Plain' && rateCalculation != null && rateCalculation !== '') && showDetailRow && (


                                        <tr className="text-center">
                                            <td className="text-center">
                                                <input
                                                    type="text"
                                                    name="srlNo"
                                                    className="text-center enhanceinput form-input"
                                                    tabIndex="-1"
                                                    style={{
                                                        width: '10vw',
                                                        height: '40px',
                                                        border: 'none',
                                                        background: 'none',
                                                        boxShadow: 'none',
                                                        padding: 0,
                                                        cursor: 'default',
                                                        pointerEvents: 'none'
                                                    }}
                                                    value={srlNo}
                                                    id='service'
                                                    readOnly
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="rangeFrom"
                                                    className="text-center enhanceinput form-input"
                                                    style={{ width: '10vw', height: '40px' }}
                                                    value={rangeFrom}
                                                    readOnly
                                                    onChange={(e) => setrangeFrom(e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="rangeTo"
                                                    className="text-center enhanceinput form-input"
                                                    style={{ width: '10vw', height: '40px' }}
                                                    value={rangeTo}
                                                    readOnly
                                                    onChange={(e) => setrangeTo(e.target.value)}
                                                />
                                            </td>
                                            <td>


                                                <input
                                                    type="number"
                                                    name="rangeRate"
                                                    className="text-center enhanceinput form-input"
                                                    value={rangeRate}
                                                    readOnly
                                                    onChange={(e) => setrangeRate(e.target.value)}
                                                />
                                            </td>

                                        </tr>)}







                                </tbody>
                            </table>
                        </div>)}
                    <Row>
                        <Col className="text-center">
                            <Button
                                variant="outline-danger"
                                style={{ marginLeft: 10 }}
                                onClick={handleRateChart}
                            ><FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} />
                                Back
                            </Button>

                        </Col>
                    </Row>
                </div>
            )

           :logintype === 'Console' ? (
                <div className="Container" >
                    <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
                        icon={faMoneyBill1}
                        style={{
                            marginRight: '8px',
                            color: 'black', // Set the color to golden
                        }}
                    />Tarrif Services</h5>
                    <hr />
                    {rateCalculation !== 'Plain' && rateCalculation != null && rateCalculation !== '' && (
                        <div className="table-responsive text-center mt-3">
                            <table className="table">

                                <thead>
                                    <tr className="text-center">
                                        <th>Sr No</th>
                                        <th>Range From</th>
                                        <th>Range To</th>
                                        <th>Range Rate</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {serviceranges.map((serviceRange, index) => (
                                        <tr className="text-center" key={index}>

                                            <td className="text-center" >
                                                <input
                                                    type="text"
                                                    readOnly
                                                    id="service"
                                                    className="text-center enhanceinput"
                                                    tabIndex="-1"

                                                    style={{
                                                        width: '10vw',
                                                        height: '40px',
                                                        border: 'none',
                                                        background: 'none',
                                                        boxShadow: 'none',
                                                        padding: 0,
                                                        cursor: 'default',
                                                        pointerEvents: 'none'
                                                    }}
                                                    value={editableData[index]?.srlNo || 0}
                                                    onChange={(e) => handleEditableChange(index, 'srlNo', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    style={{ width: '10vw', height: '40px' }}
                                                    className="text-center enhanceinput"
                                                    value={editableData[index]?.rangeFrom !== undefined ? editableData[index]?.rangeFrom : ''}
                                                    onChange={(e) => handleEditableChange(index, 'rangeFrom', e.target.value)}
                                                    readOnly
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    readOnly
                                                    type="text"
                                                    style={{ width: '10vw', height: '40px' }}
                                                    className="text-center enhanceinput"
                                                    value={editableData[index]?.rangeTo || ''}
                                                    onChange={(e) => handleEditableChange(index, 'rangeTo', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    readOnly
                                                    type="number"
                                                    style={{ width: '10vw', height: '40px' }}
                                                    className="text-center enhanceinput"
                                                    value={editableData[index]?.rangeRate !== undefined ? editableData[index]?.rangeRate : ''}
                                                    onChange={(e) => handleEditableChange(index, 'rangeRate', e.target.value)}
                                                />
                                            </td>

                                        </tr>
                                    ))}




                                    {(!sirid && !range && rateCalculation !== 'Plain' && rateCalculation != null && rateCalculation !== '') && showDetailRow && (


                                        <tr className="text-center">
                                            <td className="text-center">
                                                <input
                                                    type="text"
                                                    name="srlNo"
                                                    className="text-center enhanceinput form-input"
                                                    tabIndex="-1"
                                                    style={{
                                                        width: '10vw',
                                                        height: '40px',
                                                        border: 'none',
                                                        background: 'none',
                                                        boxShadow: 'none',
                                                        padding: 0,
                                                        cursor: 'default',
                                                        pointerEvents: 'none'
                                                    }}
                                                    value={srlNo}
                                                    id='service'
                                                    readOnly
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="rangeFrom"
                                                    className="text-center enhanceinput form-input"
                                                    style={{ width: '10vw', height: '40px' }}
                                                    value={rangeFrom}
                                                    readOnly
                                                    onChange={(e) => setrangeFrom(e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="rangeTo"
                                                    className="text-center enhanceinput form-input"
                                                    style={{ width: '10vw', height: '40px' }}
                                                    value={rangeTo}
                                                    readOnly
                                                    onChange={(e) => setrangeTo(e.target.value)}
                                                />
                                            </td>
                                            <td>


                                                <input
                                                    type="number"
                                                    name="rangeRate"
                                                    className="text-center enhanceinput form-input"
                                                    value={rangeRate}
                                                    readOnly
                                                    onChange={(e) => setrangeRate(e.target.value)}
                                                />
                                            </td>

                                        </tr>)}







                                </tbody>
                            </table>
                        </div>)}
                    <Row>
                        <Col className="text-center">
                            <Button
                                variant="outline-danger"
                                style={{ marginLeft: 10 }}
                                onClick={handleRateChart}
                            ><FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} />
                                Back
                            </Button>

                        </Col>
                    </Row>
                </div>
            )


















                :
                (
                    <>
                        <div className="Container" >
                            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
                                icon={faMoneyBill1}
                                style={{
                                    marginRight: '8px',
                                    color: 'black', // Set the color to golden
                                }}
                            />Tarrif Services</h5>

                            <Card style={{ backgroundColor: "#F8F8F8" }}>


                                <CardBody>

                                    {/* 1st  */}
                                    <Row>
                                        <Col md={4}>
                                            <Row>
                                                <Col md={8}>

                                                    <FormGroup>
                                                        <Label className="forlabel" for="branchId">Tarrif Id</Label>
                                                        <Input
                                                            type="text" name="cfsTariffNo"
                                                            className="form-control"
                                                            id='service' readOnly
                                                            value={cfsTariffNo}
                                                            onChange={(e) => setCfsTariffNo(e.target.value)}
                                                        />
                                                    </FormGroup>


                                                </Col>

                                                <Col md={4}>

                                                    <FormGroup>
                                                        {/* <Label className="forlabel" for="branchId">Tarrif Id</Label> */}
                                                        <Input
                                                            type="text" name="cfsAmndNo"
                                                            className="form-control"
                                                            style={{ marginTop: '32px' }}
                                                            id='service' readOnly
                                                            value={cfsAmndNo}
                                                            onChange={(e) => setcfsAmndNo(e.target.value)}
                                                        />
                                                    </FormGroup>

                                                </Col>

                                            </Row>

                                        </Col>

                                        <Col md={4}>
                                            <FormGroup>
                                                <Label className="forlabel" for="branchId">Service</Label>
                                                <Select
                                                    options={allServices}
                                                    value={{ value: service, label: service }}
                                                    onChange={handleServiceChange}
                                                    isDisabled={service}
                                                    isClearable
                                                    styles={{
                                                        control: (provided, state) => ({
                                                            ...provided,
                                                            border: state.isFocused ? '1px solid #ccc' : `1px solid ${errors.service ? '#f52b2b' : '#ccc'}`,
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



                                        <Col md={4}>
                                            <FormGroup>
                                                <Label className="forlabel" for="branchId">Status</Label>
                                                <Input
                                                    type="text" name="status"
                                                    id='service' readOnly
                                                    className="form-control"
                                                    value={status === "A" ? "Approved" : status === "U" ? "Edit" : status === "N" ? "New" : " "}
                                                    onChange={(e) => setstatus(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>


                                    </Row>


                                    {/* 2nd */}


                                    <Row>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label className="forlabel" for="branchId">Service Unit</Label>
                                                <Input
                                                    type="text" name="serviceUnit"
                                                    className="form-control"
                                                    value={serviceUnit}
                                                    id='service' readOnly
                                                    onChange={(e) => setServiceUnit(e.target.value)}
                                                    style={{ height: '45px' }}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={4}>
                                            <FormGroup>
                                                <Label className="forlabel" for="branchId">Currency</Label>
                                                <Input
                                                    type="text" name="Currency"
                                                    className="form-control"
                                                    id='service'
                                                    readonly
                                                    style={{ height: '45px' }}
                                                    value={currencyId}
                                                // onChange={(e) => setCurrencyID(e.target.value)}
                                                />
                                            </FormGroup>
                                        </Col>



                                        <Col md={4}>
                                            <FormGroup>
                                                <Label className="forlabel" for="branchId">Created By</Label>
                                                <Input type="text" name="serviceUnit"
                                                    className="form-control"
                                                    value={CreatedUser}
                                                    id='service' readOnly
                                                // onChange={(e) => (e.target.value)}

                                                />

                                            </FormGroup>
                                        </Col>

                                    </Row>

                                    {/* 3rd */}
                                    <Row>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label className="forlabel" for="branchId">Rate Calculation</Label>
                                                <div className="row mt-2">
                                                    <div className="col-4 d-flex align-items-center ">
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input radios custom-radio"
                                                                type="radio" name="rateCalculation" value="Range"
                                                                onChange={(e) => setRateCalculation(e.target.value)}
                                                                checked={rateCalculation === "Range"}
                                                                disabled={true}
                                                            />

                                                            <label>Range</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-4 d-flex align-items-center">
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input radios custom-radio"
                                                                type="radio" name="rateCalculation" value="Slab"
                                                                onChange={(e) => setRateCalculation(e.target.value)}
                                                                checked={rateCalculation === "Slab"}
                                                                disabled={true}

                                                            />
                                                            <label>Slab</label>
                                                        </div>
                                                    </div>

                                                    <div className="col-4 d-flex align-items-center">
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input radios custom-radio"
                                                                type="radio" name="rateCalculation" value="Plain"
                                                                onChange={(e) => setRateCalculation(e.target.value)}
                                                                checked={rateCalculation === "Plain"}
                                                                disabled={true}

                                                            />
                                                            <label>Plain</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </FormGroup>
                                        </Col>


                                        <div className="col-md-4">
                                            <FormGroup>
                                                <Label className="forlabel" for="branchId">Tax Applicable</Label>
                                                <Row>
                                                    <Col md={3}>
                                                        <input
                                                            className="form-check-input radios"
                                                            type="checkbox"
                                                            disabled
                                                            style={{ width: 30, height: 30 }}
                                                            name="taxApplicable"
                                                            checked={taxApplicable === "Y"}
                                                            onChange={(e) => seTtaxApplicable(e.target.checked ? "Y" : "N")}
                                                        />
                                                    </Col>
                                                </Row>
                                            </FormGroup>
                                        </div>

                                        {/* <Col md={4}>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Tax Applicable</Label>
                                <Row>
                                    <Col md={3}>
                                        <input
                                            className="form-check-input radios"
                                            type="checkbox"
                                            disabled
                                            name="taxApplicable"
                                            checked={taxApplicable === "Y"}
                                            onChange={(e) => seTtaxApplicable(e.target.checked ? "Y" : "N")}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col> */}



                                        <Col>
                                            <FormGroup>
                                                <Label className="forlabel" for="branchId">Rate</Label>
                                                <Input type="text" name="rate"
                                                    className="form-control"
                                                    value={rate}
                                                    onChange={(e) => setRate(e.target.value)}
                                                    id={rateCalculation !== 'Plain' ? 'service' : undefined}
                                                    readOnly={rateCalculation !== 'Plain'}

                                                />

                                            </FormGroup>
                                        </Col>

                                    </Row>

                                    <Row>
                                        <Col md={4} style={{

                                            display: "flex",
                                            justifyContent: "center", // Center buttons horizontally
                                        }}>


                                        </Col>


                                        <Col md={4}>
                                            <div
                                                style={{
                                                    marginTop: '5px',
                                                    marginBottom: '5px',
                                                    display: "flex",
                                                    justifyContent: "center", // Center buttons horizontally
                                                }}
                                            >



                                                <button
                                                    type="button"
                                                    className="btn gap-2  btn-outline-success"
                                                    disabled={cfsTarrifNo && sirid && range !== 'Plain' || rateCalculation !== 'Plain'}
                                                    style={{ marginRight: 10 }}
                                                    onClick={(e) => SaveOrUpdate(e)}
                                                > <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                                                    Save
                                                </button>



                                                {sirid !== undefined ? null : (
                                                    <button
                                                        type="button"
                                                        className="btn gap-2 btn-outline-danger"
                                                        style={{ marginRight: 10 }}
                                                        onClick={(e) => makefieldEmpty(e)}
                                                    >
                                                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                                                        Clear
                                                    </button>
                                                )}

                                                {/* <Button variant="outline-primary" onClick={(e) => makefieldEmpty(e)}
                            disabled={cfsTarrifNo && sirid && range}
                        >Clear</Button> */}



                                                <Button
                                                    variant="outline-danger"
                                                    style={{ marginLeft: 10 }}
                                                    onClick={handleRateChart}
                                                ><FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} />
                                                    Back
                                                </Button>



                                            </div>
                                        </Col>
                                        <Col md={4} style={{
                                            marginTop: '5px',
                                            marginBottom: '5px',
                                            display: "flex",

                                        }}>




                                        </Col>
                                    </Row>




                                    {rateCalculation !== 'Plain' && rateCalculation != null && rateCalculation !== '' && (
                                        <div className="table-responsive text-center mt-3">
                                            <table className="table">

                                                <thead>
                                                    <tr className="text-center">
                                                        <th>Sr No</th>
                                                        <th>Range From</th>
                                                        <th>Range To</th>
                                                        <th>Range Rate</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {serviceranges.map((serviceRange, index) => (
                                                        <tr className="text-center" key={index}>

                                                            <td className="text-center" >
                                                                <input
                                                                    type="text"
                                                                    readOnly
                                                                    id="service"
                                                                    className="text-center enhanceinput"
                                                                    tabIndex="-1"
                                                                    style={{
                                                                        width: '10vw',
                                                                        height: '40px',
                                                                        border: 'none',
                                                                        background: 'none',
                                                                        boxShadow: 'none',
                                                                        padding: 0,
                                                                        cursor: 'default',
                                                                        pointerEvents: 'none'
                                                                    }}
                                                                    value={editableData[index]?.srlNo || 0}
                                                                    onChange={(e) => handleEditableChange(index, 'srlNo', e.target.value)}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    style={{ width: '10vw', height: '40px' }}
                                                                    className="text-center enhanceinput"
                                                                    value={editableData[index]?.rangeFrom !== undefined ? editableData[index]?.rangeFrom : ''}
                                                                    onChange={(e) => handleEditableChange(index, 'rangeFrom', e.target.value)}
                                                                    readOnly={!cfsTarrifNo || !sirid || !range}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    style={{ width: '10vw', height: '40px' }}
                                                                    className="text-center enhanceinput"
                                                                    value={editableData[index]?.rangeTo || ''}
                                                                    onChange={(e) => handleEditableChange(index, 'rangeTo', e.target.value)}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="number"
                                                                    style={{ width: '10vw', height: '40px' }}
                                                                    className="text-center enhanceinput"
                                                                    value={editableData[index]?.rangeRate !== undefined ? editableData[index]?.rangeRate : ''}
                                                                    onChange={(e) => handleEditableChange(index, 'rangeRate', e.target.value)}
                                                                />
                                                            </td>
                                                            <td style={{ marginLeft: '300px' }}>
                                                                <input
                                                                    type="text"
                                                                    className="text-center enhanceinput label-like-input"
                                                                    id='service'
                                                                    tabIndex="-1"   // Prevent focus using the "Tab" key
                                                                    readOnly
                                                                    style={{
                                                                        width: '10vw',
                                                                        height: '40px',
                                                                        border: 'none',
                                                                        background: 'none',
                                                                        boxShadow: 'none',
                                                                        padding: 0,
                                                                        cursor: 'default',
                                                                        pointerEvents: 'none'  // Disable interaction with the input
                                                                    }}
                                                                    value={getStatusLabel(serviceRange.status)}
                                                                    onChange={(e) => handleEditableChange(index, 'status', e.target.value)}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}




                                                    {(!sirid && !range && rateCalculation !== 'Plain' && rateCalculation != null && rateCalculation !== '') && showDetailRow && (


                                                        <tr className="text-center">
                                                            <td className="text-center">
                                                                <input
                                                                    type="text"
                                                                    name="srlNo"
                                                                    className="text-center enhanceinput form-input"
                                                                    tabIndex="-1"
                                                                    style={{
                                                                        width: '10vw',
                                                                        height: '40px',
                                                                        border: 'none',
                                                                        background: 'none',
                                                                        boxShadow: 'none',
                                                                        padding: 0,
                                                                        cursor: 'default',
                                                                        pointerEvents: 'none'
                                                                    }}
                                                                    value={srlNo}
                                                                    id='service'
                                                                    readOnly
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="rangeFrom"
                                                                    className="text-center enhanceinput form-input"
                                                                    style={{ width: '10vw', height: '40px' }}
                                                                    value={rangeFrom}
                                                                    onChange={(e) => setrangeFrom(e.target.value)}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="rangeTo"
                                                                    className="text-center enhanceinput form-input"
                                                                    style={{ width: '10vw', height: '40px' }}
                                                                    value={rangeTo}
                                                                    onChange={(e) => setrangeTo(e.target.value)}
                                                                />
                                                            </td>
                                                            <td>


                                                                <input
                                                                    type="number"
                                                                    name="rangeRate"
                                                                    className="text-center enhanceinput form-input"
                                                                    value={rangeRate}
                                                                    onChange={(e) => setrangeRate(e.target.value)}
                                                                />
                                                            </td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    name="status"
                                                                    className="text-center enhanceinput form-input"
                                                                    tabIndex='-1'
                                                                    style={{
                                                                        width: '10vw',
                                                                        width: '10vw',
                                                                        height: '40px',
                                                                        border: 'none',         // Remove the border
                                                                        background: 'none',     // Remove the background color
                                                                        boxShadow: 'none',      // Remove any box shadow
                                                                        padding: 0,             // Remove padding
                                                                        cursor: 'default',
                                                                        height: '40px'
                                                                    }}
                                                                    id='service'
                                                                    readOnly
                                                                    onChange={(e) => setstatus(e.target.value)}
                                                                />
                                                            </td>
                                                        </tr>)}







                                                </tbody>
                                            </table>
                                        </div>)}
                                    {!sirid && !range && rateCalculation !== 'Plain' && rateCalculation != null && rateCalculation !== '' && (
                                        <div className="text-center">
                                            {/* <Button variant="outline-primary" onClick={addCfstarrifServiceRange} style={{ marginLeft: 15 }} disabled={isAddButtonDisabled}>
                                Add Detail
                            </Button>
                            <Button variant="outline-primary" onClick={closeRange} style={{ marginLeft: 15 }}>
                                CLose
                            </Button> */}
                                            <button
                                                type="button"
                                                className="btn gap-2  btn-outline-danger"
                                                onClick={addCfstarrifServiceRange}
                                                disabled={isAddButtonDisabled}
                                                style={{ marginRight: '10px' }}
                                            > <FontAwesomeIcon icon={faAdd} style={{ marginRight: '5px' }} />
                                                ADD DETAIL
                                            </button>


                                            <button
                                                type="button"
                                                className="btn gap-2  btn-outline-danger"
                                                onClick={closeRange}
                                            > <FontAwesomeIcon icon={faClose} style={{ marginRight: '5px' }} />
                                                CLOSE
                                            </button>

                                        </div>)}


                                    {cfsTarrifNo && sirid && range !== 'Plain' && (
                                        <div className="text-center">

                                            <button
                                                type="button"
                                                className="btn gap-2 btn-outline-danger"
                                                onClick={handleAddMore}
                                            > <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                                                ADD MORE
                                            </button>

                                            <button
                                                type="button"
                                                className="btn gap-2 btn-outline-danger"
                                                style={{ marginLeft: 15 }}
                                                onClick={saveAllChanges}
                                            > <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                                                SAVE ALL
                                            </button>


                                            {/* <Button variant="outline-primary" onClick={handleAddMore}>
                                Add More
                            </Button> */}
                                            {/* <Button variant="outline-primary" onClick={saveAllChanges} style={{ marginLeft: 15 }}>
                                Save All Changes
                            </Button> */}
                                        </div>)}







                                    {cfstarrifServices.length > 0 && (
                                        <div className="mt-3">
                                            <hr />

                                            <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
                                                icon={faMoneyBill1}
                                                style={{
                                                    marginRight: '8px',
                                                    color: 'black', // Set the color to golden
                                                }}
                                            />Warehouse Standard Services</h5>

                                            <hr />
                                            <div className="table-responsive">
                                                <Table className="table table-striped table-hover">
                                                    <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                                                        <tr className="text-center">
                                                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">Service Id</th>
                                                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">Service</th>
                                                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">Tax Applicable</th>
                                                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">Range</th>
                                                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">Rate</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            cfstarrifServices.map((servicemaster, index) =>

                                                                <tr key={index} className="text-center">
                                                                    <td className="table-column">{servicemaster[1]}</td>
                                                                    <td className="table-column">{servicemaster[3]}</td>
                                                                    <td className="table-column">{servicemaster[2] === 'Y' ? "Yes" : "No"}</td>
                                                                    <td className="table-column">{servicemaster[4]}</td>
                                                                    <td className="table-column">{servicemaster[5] || "00.00"}</td>

                                                                </tr>

                                                            )
                                                        }

                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>


                                    )}



                                </CardBody >
                            </Card >

                        </div>
                    </>
                )

            }




        </>
    );
}

export default Rate_CFS_Service;