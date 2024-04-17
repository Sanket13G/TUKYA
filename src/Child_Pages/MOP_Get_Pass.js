// import { redirect } from 'react-router-dom';
// import AuthContext from '../Components/AuthProvider';
// import axios from 'axios';
// import ipaddress from '../Components/IpAddress';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React, { useEffect, useState, useContext, useRef } from 'react';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import '../Components/Style.css';
// import { toast } from "react-toastify";
// import { Button, Modal } from 'react-bootstrap';
// import { faBarcode, faFilePdf, faForward, faPrint, faRefresh, faRemove, faSave, faSearch, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import Select from 'react-select';
// import {
//     Card,
//     CardBody,
//     Container,
//     Row,
//     Col,
//     Form,
//     FormGroup,
//     Label,


//     Input,
//     Table,
// } from "reactstrap";
// import InviceService from '../services/InviceService';
// import Rate_Chart_Service from '../services/Rate_Chart_Service';

// export default function MOP_Get_Pass() {
//     const navigate = useNavigate();
//     const {
//         jwtToken,
//         userId,
//         username,
//         branchId,
//         companyid,
//         role,
//         companyname,
//         branchname,
//         login,
//         logout,
//     } = useContext(AuthContext);
//     const { isAuthenticated } = useContext(AuthContext);
//     const [getSir, setGetSir] = useState('');
//     const [errors, setErrors] = useState({});

//     const [detailModel, setDetailModel] = useState(false);
//     const closeDetailModel = () => { setDetailModel(false); }
//     const [party, setParty] = useState([]);
//     const [PrintReady, setPrintReady] = useState(false);

//     // const [discordPackages, setdiscordPackages] = useState(0);
//     const [from, setfrom] = useState('DGDC');
//     const [to, setTo] = useState('');
//     const [chaName, setchaName] = useState('');
//     const [rePresentativeName, setrePresentativeName] = useState('');

//     const [reprentativeArray, setReprentativeArray] = useState([]);
//     const [ChaParties, setChaParties] = useState([]);
//     const [Printable, setPrintable] = useState(false);

//     const inputRef1 = useRef();

//     const handleKeyPress1 = (event) => {
//         if (event.key === 'Enter') {
//             event.preventDefault();
//             document.getElementById("submitButton10").click();
//         }
//     };

//     const handleShowPartyOrCHA = async () => {

//         const partyResponse = await Rate_Chart_Service.getExternalUserByTypeForImport(companyid, branchId, "CHA");
//         const partyOptions = partyResponse.data.map(externalUser => ({
//             value: externalUser.externaluserId,
//             label: externalUser.userName
//         }));

//         setChaParties(partyOptions);
//         setDetailModel(true);

//     };

//     const handleExternalPartyChange = async (selectedOption, { action }) => {
//         if (action === 'clear') {
//             setchaName('');
//         }
//         else {
//             setchaName(selectedOption ? selectedOption.label : '');
//             getReprentativeByUserId(companyid, branchId, selectedOption ? selectedOption.value : '');
//         }
//     };

//     const getReprentativeByUserId = async (companyid, branchId, userID) => {
//         const result = await Rate_Chart_Service.getReprentativeByCompIdBranchIdUserId(companyid, branchId, userID);
//         const cartingsRepresentative = result.data.map(res => ({
//             value: res.representativeId,
//             label: `${res.firstName} ${res.middleName ? res.middleName.charAt(0) + ' ' : ''}${res.lastName}`
//         }));
//         setReprentativeArray(cartingsRepresentative);
//     };


//     const handleSelectionReprentative = async (selectedOption, { action }) => {
//         if (action === 'clear') {
//             setrePresentativeName('');
//         }
//         else {
//             setrePresentativeName(selectedOption ? selectedOption.label : '');

//         }

//     };



//     // const [getSir, setGetSir] = useState('');
//     // const [getSir, setGetSir] = useState('');
//     const [Printed, setPrinted] = useState(false);










//     // makefieldEmpty();


//     useEffect(() => {
//         Rate_Chart_Service.getAllParties(companyid, branchId).then((res) => {
//             const namesMap = {};
//             res.data.forEach(party => {
//                 namesMap[party.partyId] = party.partyName;
//             });
//             setParty(namesMap);
//         });
//     }, [])


//     const [MopData, setMopData] = useState([]);
//     const [searchValue, setSearchValue] = useState('');

//     const OkCloseModel = () => {
//         const newErrors = {};
//         if (!chaName) {
//             newErrors['chaName'] = 'Please Select CHA';
//             setErrors(newErrors);
//             return;
//         };

//         if (!rePresentativeName) {
//             newErrors['chaName'] = 'Please Select CHA';
//             setErrors(newErrors);
//             return;
//         };
//         if (!to) {
//             newErrors['to'] = 'Please Enter Destination';
//             setErrors(newErrors);
//             return;
//         };

//         // console.log("chaName  " + chaName + " representative Name " + rePresentativeName + "From " + from + "To " + to);


//         // console.log("       Data To be Send ");
//         // console.log(MopData);

//         closeDetailModel();
//         setPrintReady(true);





//     };




//     const generateGatepassPDF = async () => {





//     };


//     const handleInputChange = (e) => {
//         if (Printed) {
//             toast.error("Please First Clear the Previous Get Pass Data", {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 700,
//                 style: { width: '450px' }
//             });
//         } else {
//             const value = e.target.value;
//             // You can perform any other logic needed here
//             // setSearchValue(value);
//             setSearchValue(value.replace(/[\\/]/g, ''));
//         }
//     };





//     const handleRemove = (sirNo) => {


//         if (Printed) {
//             toast.error("Get Pass already Created, You Cant Remove It!", {
//                 position: toast.POSITION.TOP_CENTER,
//                 autoClose: 800,
//                 style: { width: '450px' }
//             });


//         }
//         else {
//             const updatedMopData = MopData.filter(item => item.sirNo !== sirNo);
//             if (updatedMopData.length === 0) {

//                 setPrintReady(false);
//                 setPrintable(false);
//                 setPrinted(true);
//                 console.log('MopData is empty');
//             }


//             setMopData(updatedMopData);

//         }

//     };


//     const handleGenerateGetPass = async () => {
//         setDetailModel(true);
//         handleShowPartyOrCHA();
//     };

//     const printGetPass = async (type) => {


//         setPrinted(true);
//         setPrintable(false);

//         const nopSum = MopData.reduce((accumulator, currentValue) => {
//             // Check if currentValue.nop is a number before adding
//             const nopValue = parseFloat(currentValue.nop);
//             if (!isNaN(nopValue)) {
//                 return accumulator + nopValue;
//             }
//             return accumulator;
//         }, 0);


//         // console.log("Total Nop " + nopSum);


//         const dataToSend = {
//             MopData,
//             from,
//             to,
//             chaName,
//             rePresentativeName,
//             nopSum
//         };
//         try {

//             const response = await InviceService.getMopPassPrint(type, dataToSend);

//             console.log("Response Data");
//             console.log(response.data);

//             if (type === 'PDF') {
//                 const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

//                 // Create a Blob from the Base64 data
//                 const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

//                 // Create a URL for the Blob
//                 const blobUrl = URL.createObjectURL(pdfBlob);

//                 // Create an anchor element for downloading
//                 const downloadLink = document.createElement('a');
//                 downloadLink.href = blobUrl;
//                 downloadLink.download = 'MopGetPass.pdf'; // Set the filename for the downloaded PDF
//                 downloadLink.style.display = 'none';
//                 document.body.appendChild(downloadLink);
//                 // Trigger the download
//                 downloadLink.click();
//                 // Clean up
//                 document.body.removeChild(downloadLink);
//                 window.URL.revokeObjectURL(blobUrl);

//                 toast.success("Downloading Pdf!", {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 800,
//                 });

//             } if (type === 'PRINT') {
//                 // If the response is HTML, open a new window to display the HTML content
//                 const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

//                 // Create a Blob from the Base64 data
//                 const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

//                 // Create an object URL for the Blob
//                 const blobUrl = URL.createObjectURL(pdfBlob);

//                 // Open a new window and set the PDF content as the source
//                 window.open(blobUrl, '_blank');
//             }
//         } catch (error) {
//             // Handle errors
//             console.error('Error handling response:', error);
//         };



//     };



//     const handleReset = () => {
//         setfrom('DGDC');
//         setTo('');
//         setchaName('');
//         setrePresentativeName('');
//         setMopData([]);
//         setPrintReady(false);
//         setPrintable(false);
//         setPrinted(false);
//     };




//     const handleSubmit = async () => {
//         try {
//             const response = await InviceService.getMOPSearchData(companyid, branchId, searchValue);


//             // console.log(response.data);
//             if (!response.data || Object.keys(response.data).length === 0) {
//                 // Show toaster that data was not found
//                 toast.error('Data Not Found! Or Get Pass Already Created!', {
//                     position: toast.POSITION.TOP_CENTER,
//                     autoClose: 700,
//                     style: { width: '450px' }

//                 });
//             } else {
//                 const sirNoExists = MopData.some(item => item.sirNo === response.data.sirNo);

//                 if (sirNoExists) {
//                     // Show modal for duplicate entry
//                     toast.error('Duplicate Entry!', {
//                         position: toast.POSITION.TOP_CENTER,
//                         autoClose: 600,
//                     });
//                 } else {
//                     // Add response.data to MopData
//                     setPrintable(true);
//                     setMopData(prevData => [...prevData, response.data]);
//                 }
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//         setSearchValue('');
//     };






//     // If the user is not authenticated, redirect to the login page
//     useEffect(() => {
//         if (!isAuthenticated) {

//             navigate('/login?message=You need to be authenticated to access this page.');
//         }
//     }, [isAuthenticated, navigate]);





//     // In

//     const [parcelin,setParcelIn] = useState('');

//     const inputRef = useRef();

//     const handleKeyPress = (event) => {
//         if (event.key === 'Enter') {
//             event.preventDefault();
//             document.getElementById("submitButton").click();
//         }
//     };


//     const handlecheckMOPOUT = (id) => {
//         axios.get(`http://${ipaddress}importmain/checkMOPStatus/${companyid}/${branchId}/${id}`)
//         .then((response) => {
//             if(response.data === 'barcode not found'){
//                 toast.error("Please check the barcode format",{
//                     autoClose:900
//                 });
//                 setParcelIn("");
//                 return;
//             }
//             else if(response.data === 'not found'){
//                 toast.error("Parcel not found",{
//                     autoClose:900
//                 });
//                 setParcelIn("");
//                 return;
//             }
//             else if(response.data === 'status not match'){
//                 toast.error("The parcel for MOP has not been dispatched.",{
//                     autoClose:900
//                 });
//                 setParcelIn("");
//                 return;
//             }
//             else if(response.data === 'already scan'){
//                 toast.error("The MOP parcel has already entered the gate at DGDC SEEPZ.",{
//                     autoClose:900
//                 });
//                 setParcelIn("");
//                 return;
//             }
//             else if(response.data === 'R'){
//                 toast.success("The MOP parcel has successfully entered the gate at DGDC SEEPZ.",{
//                     autoClose:900
//                 });
//                 setParcelIn("");
//                 return;
//             }

//         })
//         .catch((error) => {

//         })
//     }

//     const handleMOPSubmit = () => {

//         if(parcelin.startsWith("IM") || parcelin.startsWith("EX") || parcelin.startsWith("D-IM") || parcelin.startsWith("EX"))
//         {
//             handlecheckMOPOUT(parcelin);

//         }
//         else{
//             toast.error("Please check the barcode format",{
//                 autoClose:900
//             });
//             setParcelIn("");
//             return;
//         }

//     }

//     return (

//         <Container>

//             <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
//                 icon={faForward}
//                 style={{
//                     marginRight: '8px',
//                     color: 'black', // Set the color to golden
//                 }}
//             />MOP Get Pass</h5>
//             <Card  >
//                 <CardBody>
//                     <Tabs
//                         defaultActiveKey="home"
//                         transition={false}
//                         id="noanim-tab-example"
//                         className="mb-3"
//                     >

//                         <Tab eventKey="home" title="OUT">
//                             <Row noGutters>
//                                 <Col md={4}>
//                                     <FormGroup>
//                                         <Label className="forlabel" for="branchId">Enter SIR/SER</Label>
//                                         <Input
//                                             type="text"
//                                             name="remarks"
//                                             autoFocus
//                                             placeholder='Enter SIR/SER'
//                                             onChange={handleInputChange}
//                                             value={searchValue}
//                                             ref={inputRef1}
//                                             onKeyDown={handleKeyPress1}
//                                             // readOnly={Printable}
//                                             className="inputField"
//                                         />
//                                     </FormGroup>
//                                 </Col>

//                                 <Col md={2} style={{ marginLeft: '15px' }}>
//                                     <Button id="submitButton10" variant="outline-primary" onClick={handleSubmit} style={{ marginTop: 32 }}>
//                                         <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
//                                         Submit
//                                     </Button>
//                                 </Col>
//                                 <Col md={2} style={{ marginLeft: '-80px' }}>
//                                     <Button id="submitButton" variant="outline-danger" onClick={handleReset} style={{ marginTop: 32 }}>
//                                         <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
//                                         Reset
//                                     </Button>
//                                 </Col>

//                                 {Printable && (
//                                     <Col>
//                                         <Button
//                                             type="button"
//                                             variant="outline-primary"
//                                             onClick={() => handleGenerateGetPass()}
//                                             style={{ marginTop: 32 }}
//                                         >
//                                             Generate Get Pass
//                                         </Button>
//                                     </Col>
//                                 )}
//                             </Row>


//                             {PrintReady && (
//                                 <div style={{ textAlign: 'right' }}> {/* Applying inline style */}
//                                     <Button
//                                         type="button"
//                                         variant="outline-primary"
//                                         onClick={() => printGetPass("PRINT")}
//                                         style={{ marginLeft: '10px' }}
//                                     >
//                                         <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
//                                         Print
//                                     </Button>
//                                     {' '}
//                                     <Button
//                                         type="button"
//                                         variant="outline-primary"
//                                         onClick={() => printGetPass("PDF")}
//                                         style={{ marginLeft: '10px' }}
//                                     // style={{ marginTop: 32 }}
//                                     >
//                                         <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />
//                                         PDF
//                                     </Button>
//                                 </div>
//                             )}



//                             {MopData.length > 0 && (
//                                 <div className="table-responsive">
//                                     <Table className="table table-bordered custom-table mt-3">
//                                         <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
//                                             <tr className="text-center">
//                                                 <th>Sr No</th>
//                                                 <th>SIR/SER No</th>
//                                                 <th>HAWB/SBNo/ReqID</th>
//                                                 <th>PKGS</th>
//                                                 <th>Name of Unit</th>
//                                                 <th>Action</th>
//                                             </tr>
//                                         </thead>

//                                         <tbody>
//                                             {MopData.map((item, index) =>
//                                                 <tr className={"text-center"} key={index}>
//                                                     <td>{index + 1}</td>
//                                                     <td>{item.sirNo}</td>
//                                                     <td>{item.hawb.startsWith('000') ? '' : item.hawb}</td>
//                                                     <td>{item.nop}</td>
//                                                     <td className="table-column">{item.importerId}</td>
//                                                     <td>
//                                                         <Button
//                                                             type="button"
//                                                             variant="outline-primary"
//                                                             onClick={() => handleRemove(item.sirNo)}
//                                                             // disabled={isGenerateGatePassClicked}
//                                                             style={{ marginRight: '5px', marginBottom: '12px' }}
//                                                         >
//                                                             <FontAwesomeIcon icon={faRemove} style={{ marginRight: 'px' }} />

//                                                         </Button>
//                                                     </td>
//                                                 </tr>
//                                             )}
//                                         </tbody>
//                                     </Table>
//                                 </div>
//                             )}


//                             {/* Mop Get Pass Detail Model */}
//                             <Modal show={detailModel} onHide={closeDetailModel} size="lg">

//                                 <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
//                                     <CardBody>
//                                         <h4 className="text-center mb-1">MOP Get Pass</h4>
//                                         <button
//                                             className="close-button"
//                                             onClick={closeDetailModel}
//                                         >
//                                             <FontAwesomeIcon
//                                                 icon={faTimes}
//                                             />
//                                         </button>
//                                         <hr />

//                                         <>
//                                             <Row>

//                                                 <Col md={6}>

//                                                     <FormGroup>
//                                                         <Label className="forlabel" htmlFor="search">
//                                                             Select CHA
//                                                         </Label>
//                                                         <Select
//                                                             options={ChaParties}
//                                                             value={{ value: chaName, label: chaName }}
//                                                             onChange={handleExternalPartyChange}
//                                                             className={errors.chaName ? 'error-border' : ''}
//                                                             isClearable
//                                                             styles={{
//                                                                 control: (provided, state) => ({
//                                                                     ...provided,
//                                                                     border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                                                                     boxShadow: 'none',
//                                                                     '&:hover': {
//                                                                         border: '1px solid #ccc',
//                                                                     },
//                                                                 }),
//                                                                 indicatorSeparator: () => ({
//                                                                     display: 'none',
//                                                                 }),
//                                                                 dropdownIndicator: () => ({
//                                                                     display: 'none',
//                                                                 }),
//                                                             }}
//                                                         />
//                                                         {errors.chaName && (
//                                                             <div className="error-message">
//                                                                 {errors.chaName}
//                                                             </div>
//                                                         )}
//                                                     </FormGroup>
//                                                 </Col>
//                                                 <Col md={6}>
//                                                     <FormGroup>
//                                                         <Label className="forlabel" for="branchId">Select Representative </Label>

//                                                         <Select
//                                                             options={reprentativeArray}
//                                                             value={{ value: rePresentativeName, label: rePresentativeName }}
//                                                             onChange={handleSelectionReprentative}
//                                                             className={errors.rePresentativeName ? 'error-border' : ''}
//                                                             isClearable
//                                                             styles={{
//                                                                 control: (provided, state) => ({
//                                                                     ...provided,
//                                                                     borderColor: errors.rePresentativeName ? '#f52b2b' : '',
//                                                                     border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
//                                                                     boxShadow: 'none',
//                                                                     '&:hover': {
//                                                                         border: '1px solid #ccc'
//                                                                     }
//                                                                 }),
//                                                                 indicatorSeparator: () => ({
//                                                                     display: 'none'
//                                                                 }),
//                                                                 dropdownIndicator: () => ({
//                                                                     display: 'none'
//                                                                 })
//                                                             }}
//                                                         />
//                                                         {errors.rePresentativeName && (
//                                                             <div className="error-message">
//                                                                 {errors.rePresentativeName}
//                                                             </div>
//                                                         )}
//                                                     </FormGroup>
//                                                 </Col>
//                                             </Row>
//                                             <Row>
//                                                 <Col md={6}>

//                                                     <FormGroup>
//                                                         <Label className="forlabel" htmlFor="search">
//                                                             From
//                                                         </Label>
//                                                         <Input type="text" name="fileWrongDeposit"
//                                                             className="form-control"
//                                                             onChange={(e) => setfrom(e.target.value)}
//                                                             value={from}
//                                                         />
//                                                     </FormGroup>
//                                                 </Col>
//                                                 <Col md={6}>
//                                                     <FormGroup>
//                                                         <Label className="forlabel" htmlFor="search">
//                                                             To
//                                                         </Label>
//                                                         <Input type="text" name="fileWrongDeposit"
//                                                             className="form-control"
//                                                             onChange={(e) => setTo(e.target.value)}
//                                                             value={to}
//                                                         />
//                                                         {errors.to && (
//                                                             <div className="error-message">
//                                                                 {errors.to}
//                                                             </div>
//                                                         )}
//                                                     </FormGroup>
//                                                 </Col>
//                                             </Row>
//                                             <div className="text-center">
//                                                 <Button variant="primary"
//                                                     onClick={OkCloseModel}
//                                                     style={{ marginTop: '1vw' }}
//                                                 > <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
//                                                     Submit
//                                                 </Button>
//                                             </div>
//                                         </>

//                                     </CardBody>
//                                 </Card>
//                             </Modal>
//                         </Tab>
//                         <Tab eventKey="profile" title="IN">
//                             <Row noGutters>
//                                 <Col md={4}>
//                                     <FormGroup>
//                                         <Label className="forlabel" for="branchId">Enter SIR/SER</Label>
//                                         <Input
//                                             type="text"
//                                             name="remarks"
//                                             autoFocus
//                                             style={{ textTransform: 'uppercase' }}
//                                             placeholder='Enter SIR/SER'
//                                             onChange={(e) => setParcelIn(e.target.value)}
//                                             value={parcelin}
//                                             ref={inputRef}
//                                             onKeyDown={handleKeyPress}
//                                             // readOnly={Printable}
//                                             className="inputField"
//                                         />
//                                     </FormGroup>
//                                 </Col>

//                                 <Col md={2} style={{ marginLeft: '15px' }}>
//                                     <Button id="submitButton" variant="outline-primary" onClick={handleMOPSubmit} style={{ marginTop: 32 }}>
//                                         <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
//                                         Submit
//                                     </Button>
//                                 </Col>

//                             </Row>
//                         </Tab>
//                     </Tabs>





//                 </CardBody>
//             </Card  >
//         </Container>

//     )
// }



import { redirect } from 'react-router-dom';
import AuthContext from '../Components/AuthProvider';
import axios from 'axios';
import ipaddress from '../Components/IpAddress';
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useContext, useRef } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../Components/Style.css';
import { toast } from "react-toastify";
import { Button, Modal } from 'react-bootstrap';
import { faBarcode, faDownload, faFilePdf, faForward, faPrint, faRefresh, faRemove, faSave, faSearch, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
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
import InviceService from '../services/InviceService';
import Rate_Chart_Service from '../services/Rate_Chart_Service';

export default function MOP_Get_Pass() {
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
        login,
        logout,
    } = useContext(AuthContext);
    const { isAuthenticated } = useContext(AuthContext);
    const [getSir, setGetSir] = useState('');
    const [errors, setErrors] = useState({});

    const [detailModel, setDetailModel] = useState(false);
    const closeDetailModel = (status) => {
        setDetailModel(false);  setSelectedOption1("option1");
        if(status  == 'N'){
            setchaName('');
        setrePresentativeName(''); setrepresentativeId('');
        setfrom('');
        setTo('');
        }
    }
    const [party, setParty] = useState([]);
    const [PrintReady, setPrintReady] = useState(false);

    // const [discordPackages, setdiscordPackages] = useState(0);
    const [from, setfrom] = useState('DGDC');
    const [to, setTo] = useState('');
    const [chaName, setchaName] = useState('');
    const [rePresentativeName, setrePresentativeName] = useState('');

    const [reprentativeArray, setReprentativeArray] = useState([]);
    const [ChaParties, setChaParties] = useState([]);
    const [Printable, setPrintable] = useState(false);

    const inputRef1 = useRef();

    const handleKeyPress1 = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById("submitButton10").click();
        }
    };
    const [partys, setPartys] = useState([]);
    const fetchPartyNames = async () => {
        try {
            const response = await fetch(`http://${ipaddress}parties/getAll/${companyid}/${branchId}`);
            const data = await response.json();
            const namesMap = {};
            data.forEach(party => {
                namesMap[party.partyId] = party.partyName;
            });
            //   setGetpartyId(namesMap);

            const partyOptions = data.map(externalUser => ({
                value: externalUser.partyId,
                label: externalUser.partyName
            }));
            setPartys(partyOptions);
        } catch (error) {
            console.error("Error fetching party names:", error);
        }
    };

    const handleShowPartyOrCHA = async () => {

        const partyResponse = await Rate_Chart_Service.getExternalUserByTypeForImport(companyid, branchId, "CHA");
        const partyOptions = partyResponse.data.map(externalUser => ({
            value: externalUser.externaluserId,
            label: externalUser.userName
        }));

        setChaParties(partyOptions);
        setDetailModel(true);

    };

    const handleExternalPartyChange = async (selectedOption, { action }) => {
        if (action === 'clear') {
            setchaName('');
        }
        else {
            setchaName(selectedOption ? selectedOption.label : '');
            getReprentativeByUserId(companyid, branchId, selectedOption ? selectedOption.value : '');
        }
    };

    const handleExternalPartyChange1 = async (selectedOption, { action }) => {
        if (action === 'clear') {
            setchaName('');
        }
        else {
            setchaName(selectedOption ? selectedOption.label : '');
            getReprentativeByUserId(companyid, branchId, selectedOption ? selectedOption.value : '');
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

    const [rePresentativeId, setrepresentativeId] = useState('');
    const handleSelectionReprentative = async (selectedOption, { action }) => {
        if (action === 'clear') {
            setrePresentativeName('');
            setrepresentativeId('');
        }
        else {
            console.log('selectedOption.valu ',selectedOption.value);
            setrePresentativeName(selectedOption ? selectedOption.label : '');
            setrepresentativeId(selectedOption ? selectedOption.value : '');
        }

    };



    // const [getSir, setGetSir] = useState('');
    // const [getSir, setGetSir] = useState('');
    const [Printed, setPrinted] = useState(false);










    // makefieldEmpty();


    useEffect(() => {
        Rate_Chart_Service.getAllParties(companyid, branchId).then((res) => {
            const namesMap = {};
            res.data.forEach(party => {
                namesMap[party.partyId] = party.partyName;
            });
            setParty(namesMap);
        });
    }, [])


    const [MopData, setMopData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const OkCloseModel = () => {
        const newErrors = {};
        if (!chaName) {
            newErrors['chaName'] = 'Please Select CHA';
            setErrors(newErrors);
            return;
        };

        if (!rePresentativeName) {
            newErrors['chaName'] = 'Please Select CHA';
            setErrors(newErrors);
            return;
        };
        if (!to) {
            newErrors['to'] = 'Please Enter Destination';
            setErrors(newErrors);
            return;
        };

        // console.log("chaName  " + chaName + " representative Name " + rePresentativeName + "From " + from + "To " + to);


        // console.log("       Data To be Send ");
        // console.log(MopData);

        closeDetailModel('Y');
        setPrintReady(true);





    };




    const generateGatepassPDF = async () => {





    };


    const handleInputChange = (e) => {
        if (Printed) {
            toast.error("Please First Clear the Previous Get Pass Data", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 700,
                style: { width: '450px' }
            });
        } else {
            const value = e.target.value;
            // You can perform any other logic needed here
            // setSearchValue(value);
            setSearchValue(value.replace(/[\\/]/g, ''));
        }
    };





    const handleRemove = (sirNo) => {


        if (Printed) {
            toast.error("Get Pass already Created, You Cant Remove It!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 800,
                style: { width: '450px' }
            });


        }
        else {
            const updatedMopData = MopData.filter(item => item.sirNo !== sirNo);
            if (updatedMopData.length === 0) {

                setPrintReady(false);
                setPrintable(false);
                setPrinted(true);
                console.log('MopData is empty');
            }


            setMopData(updatedMopData);

        }

    };


    const handleGenerateGetPass = async () => {
        setDetailModel(true);
        handleShowPartyOrCHA();
        fetchPartyNames();
    };

    const printGetPass = async (type) => {


        setPrinted(true);
        setPrintable(false);

        const nopSum = MopData.reduce((accumulator, currentValue) => {
            // Check if currentValue.nop is a number before adding
            const nopValue = parseFloat(currentValue.nop);
            if (!isNaN(nopValue)) {
                return accumulator + nopValue;
            }
            return accumulator;
        }, 0);


        // console.log("Total Nop " + nopSum);


        const dataToSend = {
            MopData,
            from,
            to,
            chaName,
            rePresentativeName,
            rePresentativeId,
            nopSum,
            companyid,
            branchId
        };
        try {

            const response = await InviceService.getMopPassPrint(type, dataToSend);

            console.log("Response Data");
            console.log(response.data);

            if (type === 'PDF') {
                const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

                // Create a Blob from the Base64 data
                const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

                // Create a URL for the Blob
                const blobUrl = URL.createObjectURL(pdfBlob);

                // Create an anchor element for downloading
                const downloadLink = document.createElement('a');
                downloadLink.href = blobUrl;
                downloadLink.download = 'MopGetPass.pdf'; // Set the filename for the downloaded PDF
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
            handleReset();
        } catch (error) {
            // Handle errors
            console.error('Error handling response:', error);
        };



    };



    const handleReset = () => {
        setfrom('DGDC');
        setTo('');
        setchaName('');
        setrePresentativeName('');
        setrepresentativeId('');
        setMopData([]);
        setPrintReady(false);
        setPrintable(false);
        setPrinted(false);
    };




    const handleSubmit = async () => {
        try {
            const response = await InviceService.getMOPSearchData(companyid, branchId, searchValue);


            // console.log(response.data);
            if (!response.data || Object.keys(response.data).length === 0) {
                // Show toaster that data was not found
                toast.error('Data Not Found! Or Get Pass Already Created!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 700,
                    style: { width: '450px' }

                });
            } else {
                const sirNoExists = MopData.some(item => item.sirNo === response.data.sirNo);

                if (sirNoExists) {
                    // Show modal for duplicate entry
                    toast.error('Duplicate Entry!', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 600,
                    });
                } else {
                    // Add response.data to MopData
                    setPrintable(true);
                    setMopData(prevData => [...prevData, response.data]);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setSearchValue('');
    };






    // If the user is not authenticated, redirect to the login page
    useEffect(() => {
        if (!isAuthenticated) {

            navigate('/login?message=You need to be authenticated to access this page.');
        }
    }, [isAuthenticated, navigate]);





    // In

    const [parcelin, setParcelIn] = useState('');

    const inputRef = useRef();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById("submitButton").click();
        }
    };


    const handlecheckMOPOUT = (id) => {
        axios.get(`http://${ipaddress}importmain/checkMOPStatus/${companyid}/${branchId}/${id}`)
            .then((response) => {
                if (response.data === 'barcode not found') {
                    toast.error("Please check the barcode format", {
                        autoClose: 900
                    });
                    setParcelIn("");
                    return;
                }
                else if (response.data === 'not found') {
                    toast.error("Parcel not found", {
                        autoClose: 900
                    });
                    setParcelIn("");
                    return;
                }
                else if (response.data === 'status not match') {
                    toast.error("The parcel for MOP has not been dispatched.", {
                        autoClose: 900
                    });
                    setParcelIn("");
                    return;
                }
                else if (response.data === 'already scan') {
                    toast.error("The MOP parcel has already entered the gate at DGDC SEEPZ.", {
                        autoClose: 900
                    });
                    setParcelIn("");
                    return;
                }
                else if (response.data === 'R') {
                    toast.success("The MOP parcel has successfully entered the gate at DGDC SEEPZ.", {
                        autoClose: 900
                    });
                    setParcelIn("");
                    return;
                }

            })
            .catch((error) => {

            })
    }

    const handleMOPSubmit = () => {

        if (parcelin.startsWith("IM") || parcelin.startsWith("EX") || parcelin.startsWith("D-IM") || parcelin.startsWith("EX")) {
            handlecheckMOPOUT(parcelin);

        }
        else {
            toast.error("Please check the barcode format", {
                autoClose: 900
            });
            setParcelIn("");
            return;
        }

    }





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

    const searchData = () => {
        axios.get(`http://${ipaddress}importmain/searchbymopdate/${convertToFormattedDate(searchbydate.searchDate)}`)
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



    const printGetPass1 = async (type, mopdata) => {


        setPrinted(true);
        setPrintable(false);


        try {

            const response = await InviceService.getMopPassPrint1(mopdata,companyid,branchId);

            console.log("Response Data");
            console.log(response.data);

            if (type === 'PDF') {
                const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

                // Create a Blob from the Base64 data
                const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

                // Create a URL for the Blob
                const blobUrl = URL.createObjectURL(pdfBlob);

                // Create an anchor element for downloading
                const downloadLink = document.createElement('a');
                downloadLink.href = blobUrl;
                downloadLink.download = 'MopGetPass.pdf'; // Set the filename for the downloaded PDF
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
        } catch (error) {
            // Handle errors
            console.error('Error handling response:', error);
        };



    };

    const [selectedOption1, setSelectedOption1] = useState('option1');

    const handleRadioChange1 = (event) => {
        setSelectedOption1(event.target.value);
        setchaName('');
        setrePresentativeName('');
        setrepresentativeId('');
        setfrom('');
        setTo('');
    }

    return (

        <Container>

            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
                icon={faForward}
                style={{
                    marginRight: '8px',
                    color: 'black', // Set the color to golden
                }}
            />MOP Get Pass</h5>
            <Card  >
                <CardBody>
                    <Tabs
                        defaultActiveKey="home"
                        transition={false}
                        id="noanim-tab-example"
                        className="mb-3"
                    >

                        <Tab eventKey="home" title="OUT">
                            <Row noGutters>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">Enter SIR/SER</Label>
                                        <Input
                                            type="text"
                                            name="remarks"
                                            autoFocus
                                            placeholder='Enter SIR/SER'
                                            onChange={handleInputChange}
                                            value={searchValue}
                                            ref={inputRef1}
                                            onKeyDown={handleKeyPress1}
                                            // readOnly={Printable}
                                            className="inputField"
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={2} style={{ marginLeft: '15px' }}>
                                    <Button id="submitButton10" variant="outline-primary" onClick={handleSubmit} style={{ marginTop: 32 }}>
                                        <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                                        Submit
                                    </Button>
                                </Col>
                                <Col md={2} style={{ marginLeft: '-80px' }}>
                                    <Button id="submitButton" variant="outline-danger" onClick={handleReset} style={{ marginTop: 32 }}>
                                        <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                                        Reset
                                    </Button>
                                </Col>

                                {Printable && (
                                    <Col>
                                        <Button
                                            type="button"
                                            variant="outline-primary"
                                            onClick={() => handleGenerateGetPass()}
                                            style={{ marginTop: 32 }}
                                        >
                                            Generate Get Pass
                                        </Button>
                                    </Col>
                                )}
                            </Row>


                            {PrintReady && (
                                <div style={{ textAlign: 'right' }}> {/* Applying inline style */}
                                    <Button
                                        type="button"
                                        variant="outline-primary"
                                        onClick={() => printGetPass("PRINT")}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                                        Print
                                    </Button>
                                    {' '}
                                    <Button
                                        type="button"
                                        variant="outline-primary"
                                        onClick={() => printGetPass("PDF")}
                                        style={{ marginLeft: '10px' }}
                                    // style={{ marginTop: 32 }}
                                    >
                                        <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />
                                        PDF
                                    </Button>
                                </div>
                            )}



                            {MopData.length > 0 && (
                                <div className="table-responsive">
                                    <Table className="table table-bordered custom-table mt-3">
                                        <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                                            <tr className="text-center">
                                                <th>Sr No</th>
                                                <th>SIR/SER No</th>
                                                <th>HAWB/SBNo/ReqID</th>
                                                <th>PKGS</th>
                                                <th>Name of Unit</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {MopData.map((item, index) =>
                                                <tr className={"text-center"} key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.sirNo}</td>
                                                    <td>{item.hawb.startsWith('000') ? '' : item.hawb}</td>
                                                    <td>{item.nop}</td>
                                                    <td className="table-column">{item.importerId}</td>
                                                    <td>
                                                        <Button
                                                            type="button"
                                                            variant="outline-primary"
                                                            onClick={() => handleRemove(item.sirNo)}
                                                            // disabled={isGenerateGatePassClicked}
                                                            style={{ marginRight: '5px', marginBottom: '12px' }}
                                                        >
                                                            <FontAwesomeIcon icon={faRemove} style={{ marginRight: 'px' }} />

                                                        </Button>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            )}


                            {/* Mop Get Pass Detail Model */}
                            <Modal show={detailModel} onHide={()=>closeDetailModel('N')} size="lg">

                                <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
                                    <CardBody>
                                        <h4 className="text-center mb-1">MOP Get Pass</h4>
                                        <button
                                            className="close-button"
                                            onClick={()=>closeDetailModel('N')}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTimes}
                                            />
                                        </button>
                                        <hr />

                                        <>
                                            <Row>
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
                                                </div>
                                            </Row>

                                            {selectedOption1 === 'option1' && (
                                                <>
                                                    <Row>

                                                        <Col md={6}>

                                                            <FormGroup>
                                                                <Label className="forlabel" htmlFor="search">
                                                                    Select Party
                                                                </Label>
                                                                <Select
                                                                    options={partys}
                                                                    value={{ value: chaName, label: chaName }}
                                                                    onChange={handleExternalPartyChange1}
                                                                    className={errors.chaName ? 'error-border' : ''}
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
                                                                {errors.chaName && (
                                                                    <div className="error-message">
                                                                        {errors.chaName}
                                                                    </div>
                                                                )}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label className="forlabel" for="branchId">Select Representative </Label>

                                                                <Select
                                                                    options={reprentativeArray}
                                                                    value={{ value: rePresentativeName, label: rePresentativeName }}
                                                                    onChange={handleSelectionReprentative}
                                                                    className={errors.rePresentativeName ? 'error-border' : ''}
                                                                    isClearable
                                                                    styles={{
                                                                        control: (provided, state) => ({
                                                                            ...provided,
                                                                            borderColor: errors.rePresentativeName ? '#f52b2b' : '',
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
                                                                {errors.rePresentativeName && (
                                                                    <div className="error-message">
                                                                        {errors.rePresentativeName}
                                                                    </div>
                                                                )}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>

                                                            <FormGroup>
                                                                <Label className="forlabel" htmlFor="search">
                                                                    From
                                                                </Label>
                                                                <Input type="text" name="fileWrongDeposit"
                                                                    className="form-control"
                                                                    onChange={(e) => setfrom(e.target.value)}
                                                                    value={from}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label className="forlabel" htmlFor="search">
                                                                    To
                                                                </Label>
                                                                <Input type="text" name="fileWrongDeposit"
                                                                    className="form-control"
                                                                    onChange={(e) => setTo(e.target.value)}
                                                                    value={to}
                                                                />
                                                                {errors.to && (
                                                                    <div className="error-message">
                                                                        {errors.to}
                                                                    </div>
                                                                )}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <div className="text-center">
                                                        <Button variant="primary"
                                                            onClick={OkCloseModel}
                                                            style={{ marginTop: '1vw' }}
                                                        > <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                                                            Submit
                                                        </Button>
                                                    </div>
                                                </>

                                            )}

                                            {selectedOption1 === 'option2' && (
                                                <>
                                                    <Row>

                                                        <Col md={6}>

                                                            <FormGroup>
                                                                <Label className="forlabel" htmlFor="search">
                                                                    Select CHA
                                                                </Label>
                                                                <Select
                                                                    options={ChaParties}
                                                                    value={{ value: chaName, label: chaName }}
                                                                    onChange={handleExternalPartyChange}
                                                                    className={errors.chaName ? 'error-border' : ''}
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
                                                                {errors.chaName && (
                                                                    <div className="error-message">
                                                                        {errors.chaName}
                                                                    </div>
                                                                )}
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label className="forlabel" for="branchId">Select Representative </Label>

                                                                <Select
                                                                    options={reprentativeArray}
                                                                    value={{ value: rePresentativeName, label: rePresentativeName }}
                                                                    onChange={handleSelectionReprentative}
                                                                    className={errors.rePresentativeName ? 'error-border' : ''}
                                                                    isClearable
                                                                    styles={{
                                                                        control: (provided, state) => ({
                                                                            ...provided,
                                                                            borderColor: errors.rePresentativeName ? '#f52b2b' : '',
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
                                                                {errors.rePresentativeName && (
                                                                    <div className="error-message">
                                                                        {errors.rePresentativeName}
                                                                    </div>
                                                                )}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>

                                                            <FormGroup>
                                                                <Label className="forlabel" htmlFor="search">
                                                                    From
                                                                </Label>
                                                                <Input type="text" name="fileWrongDeposit"
                                                                    className="form-control"
                                                                    onChange={(e) => setfrom(e.target.value)}
                                                                    value={from}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label className="forlabel" htmlFor="search">
                                                                    To
                                                                </Label>
                                                                <Input type="text" name="fileWrongDeposit"
                                                                    className="form-control"
                                                                    onChange={(e) => setTo(e.target.value)}
                                                                    value={to}
                                                                />
                                                                {errors.to && (
                                                                    <div className="error-message">
                                                                        {errors.to}
                                                                    </div>
                                                                )}
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <div className="text-center">
                                                        <Button variant="primary"
                                                            onClick={OkCloseModel}
                                                            style={{ marginTop: '1vw' }}
                                                        > <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                                                            Submit
                                                        </Button>
                                                    </div>
                                                </>

                                            )}

                                        </>

                                    </CardBody>
                                </Card>
                            </Modal>
                        </Tab>
                        <Tab eventKey="profile" title="IN">
                            <Row noGutters>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">Enter SIR/SER</Label>
                                        <Input
                                            type="text"
                                            name="remarks"
                                            autoFocus
                                            style={{ textTransform: 'uppercase' }}
                                            placeholder='Enter SIR/SER'
                                            onChange={(e) => setParcelIn(e.target.value)}
                                            value={parcelin}
                                            ref={inputRef}
                                            onKeyDown={handleKeyPress}
                                            // readOnly={Printable}
                                            className="inputField"
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={2} style={{ marginLeft: '15px' }}>
                                    <Button id="submitButton" variant="outline-primary" onClick={handleMOPSubmit} style={{ marginTop: 32 }}>
                                        <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                                        Submit
                                    </Button>
                                </Col>

                            </Row>
                        </Tab>
                        <Tab eventKey="profile1" title="Print">
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
                                    <Button type="button" className="" onClick={searchData} variant="outline-success" style={{ marginTop: '10px', marginRight: '5px' }}>
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
                                            <th style={{ background: '#BADDDA' }}>CHA Name</th>
                                            <th style={{ background: '#BADDDA' }}>Receiver Name</th>
                                            <th style={{ background: '#BADDDA' }}>From</th>
                                            <th style={{ background: '#BADDDA' }}>To</th>
                                            <th style={{ background: '#BADDDA' }}>Action</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gatepassdata.map((item, index) => (
                                            <tr key={index} className="text-center">
                                                <td>{index + 1}</td>
                                                <td>{item.mopId}</td>
                                                <td>{item.nameOfCHA}</td>
                                                <td>{item.reciverName}</td>
                                                <td>{item.fromDgdc}</td>
                                                <td>{item.toDgdc}</td>

                                                <td className="text-center d-grid gap-2 d-md-block ">
                                                    <Button
                                                        type="button"
                                                        variant="outline-success"
                                                        onClick={() => printGetPass1('PRINT', item)}

                                                        style={{ marginRight: '5px', marginBottom: '12px' }}
                                                    >
                                                        <FontAwesomeIcon icon={faPrint} style={{ marginRight: 'px' }} />
                                                        Print
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline-primary"
                                                        onClick={() => printGetPass1('PDF', item)}

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





                </CardBody>
            </Card  >
        </Container>

    )
}