// import AuthContext from '../Components/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import React, { useEffect, useState, useContext } from 'react';
// import { Button } from 'react-bootstrap';
// import '../Components/Style.css';
// import ipaddress from "../Components/IpAddress";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import {
//   Card,
//   CardBody,
//   Container,
//   Row,
//   Col,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Table,
// } from "reactstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleRight, faAtom, faBolt, faBoxesPacking, faIdBadge, faHandHoldingHand, faHistory, faList, faList12, faListAlt, faPencil, faPlaneDeparture, faPlus, faPlusCircle, faSearch, faUserCircle, faUsersViewfinder, faFilePdf, faRefresh, faRemove } from '@fortawesome/free-solid-svg-icons';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
// export default function Carting_Agent() {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useContext(AuthContext);

//   // If the user is not authenticated, redirect to the login page
//   useEffect(() => {
//     if (!isAuthenticated) {

//       navigate('/login?message=You need to be authenticated to access this page.');
//     }
//   }, [isAuthenticated, navigate]);

//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     role,
//     companyname,
//     branchname,
//     login,
//     logout,
//   } = useContext(AuthContext);

//   const [searchFilters, setSearchFilters] = useState({
//     serNo: '',
//     dgdcStatus: '',
//   });

   
//   const [serNo, setSerNo] = useState('');
//   const [vehNo, setVehicleNo] = useState('');
//   const [OfficerName, setPreventiveOfficerName] = useState('');
//   const [handoverdata, sethandoverdata] = useState([]);
//   const [serNoArray, setSerNoArray] = useState([]);
  


//   const handleRefresh = () => {
//     setSerNoArray([]);
//     console.log(serNoArray);
//     setIsGenerateGatePassClicked(false);
//     sethandoverdata([]);
//     setSerNo(''); // Reset the serNo state
//     setVehicleNo('');
//     setPreventiveOfficerName('');
//   };

   
//   const [partys, setPartys] = useState([]);
//   const [isGenerateGatePassClicked, setIsGenerateGatePassClicked] = useState(false);
//   const [getpartyId, setGetpartyId] = useState({});

//   const fetchPartyNames = async () => {
//     try {
//       const response = await fetch(`http://${ipaddress}parties/getAll/${companyid}/${branchId}`);
//       const data = await response.json();
//       const namesMap = {};
//       data.forEach(party => {
//         namesMap[party.partyId] = party.partyName;
//       });
//       setGetpartyId(namesMap);
//       setPartys(data);
//     } catch (error) {
//     }
//   };


//   useEffect(() => {
//     fetchPartyNames();
//   }, [companyid, branchId])

//   const handlePrint = async () => {

//     const requestData = new FormData();
    
//     requestData.append('serNoArray', serNoArray);
//     console.log(handoverdata);
//     try {
//       const response = await axios.post(`http://${ipaddress}export/printgatepass/${companyid}/${branchId}`, requestData)
// toast.success("GatePass PDF Created Successfully ", { position: "top-center" ,autoClose: 2000});
      
//       if (response.status === 200) {
       
//         const base64PDF = response.data;

//         // Create a new window for displaying the PDF
//         const newWindow = window.open('', '_blank');

//         // Write the HTML content to the new window
//         newWindow.document.write(`
//         <!DOCTYPE html>
//         <html>
//         <head>
//           <title>PDF Viewer</title>
//           <style>
//             body {
//               margin: 0;
//               padding: 0;
//               overflow: hidden;
//             }
//             embed {
//               width: 100vw;
//               height: 100vh;
//             }
//           </style>
//         </head>
//         <body>
//           <embed src="data:application/pdf;base64,${base64PDF}" type="application/pdf" width="100%" height="100%">
//         </body>
//         </html>
//       `);
//       } else {
//         throw new Error('Failed to generate PDF');
//       }
//     } catch (error) {
//     }
//   };


//   // const handlePDF = () => {
    
//   //   console.log(serNoArray);
//   //   toast.success("Handle Print", { position: "top-center" ,autoClose: 2000});
    
//   // };

  
//   const handlePDF = async () => {

//     const requestData = new FormData();
    
//     requestData.append('serNoArray', serNoArray);
//     console.log(handoverdata);
//     try {
//       const response = await axios.post(`http://${ipaddress}export/printgatepass/${companyid}/${branchId}`, requestData)
// toast.success("GatePass PDF Created Successfully ", { position: "top-center" ,autoClose: 2000});
      
//       if (response.status === 200) {
//         const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

//         // Create a Blob from the Base64 data
//         const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

//         // Create a URL for the Blob
//         const blobUrl = URL.createObjectURL(pdfBlob);

//         // Create an anchor element for downloading
//         const downloadLink = document.createElement('a');
//         downloadLink.href = blobUrl;
//         downloadLink.download = 'bill_invoice.pdf'; // Set the filename for the downloaded PDF
//         downloadLink.style.display = 'none';
//         document.body.appendChild(downloadLink);

//         // Trigger the download
//         downloadLink.click();

//         // Clean up
//         document.body.removeChild(downloadLink);
//         window.URL.revokeObjectURL(blobUrl);

//         toast.success("Downloading Pdf!", {
//           position: toast.POSITION.TOP_CENTER,
//           autoClose: 800,
//         });
       
//       } else {
//         throw new Error('Failed to generate PDF');
//       }
//     } catch (error) {
//     }
//   };
















//   const handleRemove = (item) => {
//     console.log(serNoArray);
  
//     if (serNoArray.includes(item.serNo)) {
//       // Remove the item if it's present
//       const updatedArray = serNoArray.filter((serNo) => serNo !== item.serNo);
//       setSerNoArray(updatedArray);
  
//       if (updatedArray.length === 0 || updatedArray === null) {
//         sethandoverdata([]);
//       }
  
//       toast.success("SER Number " + item.serNo + " Removed Successfully", { position: "top-center", autoClose: 2000 });
//     } else {
//       // Add the item if it's not present
//       setSerNoArray([...serNoArray, item.serNo]);
  
//       // Check if the array is empty and set sethandoverdata to null
//       if (serNoArray.length === 0 || serNoArray === null) {
//         sethandoverdata(null);
//       }
//     }
//   };
  

//   const handleGenerateGatePass = async () => {
//     setIsGenerateGatePassClicked(true);
//     console.log(serNoArray);
  
//     const requestData = new FormData();
//     requestData.append('serNoArray', serNoArray);
//     requestData.append('vehNo', vehNo);
//     requestData.append('OfficerName', OfficerName);
  
//     try {
//       const response = await axios.post(`http://${ipaddress}export/generateGatePass/${companyid}/${branchId}`, requestData);
  
//       if (response && response.status >= 200 && response.status < 300) {
//         toast.success("Gatepass Generated Successfully, Download Now", { position: "top-center", autoClose: 2000 });

//         fetchDataBySerNos();
//       } else {
//         console.error("Unexpected response", response);
//         toast.error("GatePass Generation Failed", { position: "top-center", autoClose: 2000 });       
//         fetchDataBySerNos();
//       }
//     } catch (error) {
//       console.error("GatePass Generation Failed", error);
//       toast.error("GatePass Generation Failed", { position: "top-center", autoClose: 2000 });
//     }
//   };
  


//   // useEffect to fetch data when serNoArray length increases
//   useEffect(() => {
//     if (serNoArray.length > 0) {
//       axios
//         .all(
//           serNoArray.map((serNo) =>
//             axios.get(`http://${ipaddress}export/getdatabyserNo/${companyid}/${branchId}/${serNo}`)
//           )
//         )
//         .then((responses) => {
//           const data = responses.map((response) => response.data);
//           sethandoverdata(data.flat()); // Flatten the array of arrays and set the data
//         })
//         .catch((error) => {
//           // Handle errors
//         });
//     }
//   }, [serNoArray]); // Run this effect when serNoArray changes

  
//   const fetchDataBySerNos = () => {
//     // Check if the serNoArray is not empty
//     if (!serNoArray.includes(serNo)) {


//       // axios.get(`http://${ipaddress}export/getdatabyserNo/${companyid}/${branchId}/${serNo}`)
//       axios.get(`http://${ipaddress}export/getdatabyserNoandDGDCStatus/${companyid}/${branchId}/${serNo}`)
//       .then((response) => {
//         const data = response.data;
    
// console.log(data);



//         if (data && Object.keys(data).length > 0) {
//           sethandoverdata([data]); // Wrap the single data item in an array
//           // Show congratulatory message
//           console.log("Congratulations! Data is not empty.");

//            // Update the array with the new serNo
//           setSerNoArray([...serNoArray, serNo]);
//           setSerNo(''); // Reset the serNo state
//         } else {

//           // Handle the case where data is empty
//           console.log("The response is empty.");

//           toast.error("Record for SER No- "+ serNo +" is not found", { position: "top-center" ,autoClose: 2000 });
//         }
//       })
//       .catch((error) => {
//         // Handle errors
//         console.error("An error occurred:", error);
//       });


//       }

//       if (serNoArray.includes(serNo)) {
        
//         toast.success("SER Number "+serNo+" is already added", { position: "top-center" ,autoClose: 2000});
//         console.log(serNoArray);
//         setSerNo(''); // Reset the serNo state
//         }
//     if (serNoArray.length > 0) {
//       // Use axios.all to make multiple requests simultaneously
//       axios.all(
//         serNoArray.map((serNo) =>
//           axios.get(`http://${ipaddress}export/getdatabyserNo/${companyid}/${branchId}/${serNo}`)
//         )
//       )
//       .then((responses) => {
//         const data = responses.map((response) => response.data);
//         sethandoverdata(data.flat()); // Flatten the array of arrays and set the data
//         setSerNo(''); // Reset the serNo state
//       })
//       .catch((error) => {
//         // Handle errors
//       });

//     }
//   };


//   return (
//     <>
//       <div className='Container'>
//         <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
//           icon={faIdBadge}
//           style={{
//             marginRight: '8px',
//             color: 'black', // Set the color to golden
//           }}
//         />Gate Pass Personal</h5>
//         <Card style={{ backgroundColor: "#F8F8F8" }}>
//           <CardBody>
//             <Row>
//               <Col md={4}>
//                 <FormGroup>
//                   <Label className="forlabel" for="serNo">Enter SER No.</Label>
//                   <Input
//                     type="text"
//                     name="serNo"
//                     id="serNo"
//                     className="inputField"
//                     value={serNo}
//                     onChange={(e) => setSerNo(e.target.value)}
//                     placeholder='Enter SER No.'
//                   />
//                 </FormGroup>
//               </Col>
//               <Col style={{ marginTop: 22 }}>
//                 <Button type="button" className=""   onClick= {fetchDataBySerNos} variant="outline-success" style={{ marginTop: '10px',  marginRight: '5px' }}>
//                   <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
//                   Add
//                 </Button>
//                 <Button type="button" className=""   onClick= {handleRefresh} variant="outline-primary" style={{ marginTop: '10px' }}>
//                   <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
//                   Reset
//                 </Button>
//               </Col>
//             </Row>
//           </CardBody>
//         </Card>

//         <Card style={{ marginTop: 25 }}>
//           <CardBody>
//             <Row>
//               <Col md={3}>
//               <FormGroup>
//                   <Label className="forlabel" for="vehNo"> Vehicle No.</Label>
//                   <Input
//                     type="text"
//                     name="vehNo"
//                     id="vehNo"
//                     className="inputField"
//                     value={vehNo}
//                     onChange={(e) => setVehicleNo(e.target.value)}
//                     placeholder='Enter Vehicle Number'
//                   />
//                 </FormGroup>
               
//               </Col>
//               <Col md={3}>


//               <FormGroup>
//                   <Label className="forlabel" for="OfficerName">Preventive Officer Name </Label>
//                   <Input
//                     type="text"
//                     name="OfficerName"
//                     id="OfficerName"
//                     className="inputField"
//                     value={OfficerName}
//                     onChange={(e) => setPreventiveOfficerName(e.target.value)}
//                     placeholder='Enter Preventive Officer'
//                   />
//                 </FormGroup>
                
//               </Col>
//               <Col md={3} className='text-center 'style={{ marginTop: '30px' }}  >
//               <Button type="button" onClick= {handleGenerateGatePass} className="" style={{ marginRight: 10 }} variant="outline-primary" disabled={!vehNo || !OfficerName  || handoverdata.some(item => item.gatePassVehicleNo || item.pOName) }  >
//                   <FontAwesomeIcon icon={faBolt} style={{ marginRight: '5px' }} />
//                   Generate GatePass
//                 </Button>

//               </Col>
//               <Col md={3} className='text-center' style={{ marginTop: '30px' }} >
            
//                 <Button type="button" onClick= {handlePrint} className="" style={{ marginRight: 10 }} variant="outline-success" >
//                   <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
//                   Print
//                 </Button>
//                 <Button type="button" onClick= {handlePDF} className="" variant="outline-primary" >
//                   <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />
//                   PDF
//                 </Button>
//               </Col>
//             </Row>
//             <Table style={{ marginTop: '20px' }}  striped responsive bordered>

//               <thead>
//                 <tr className="text-center">
//                 <th style={{ background: '#BADDDA' }}>Sr.No</th>    
//                   <th style={{ background: '#BADDDA' }}>Sl. No</th>                 
//                   <th style={{ background: '#BADDDA' }}>SER No</th>
//                   <th style={{ background: '#BADDDA' }}>Parcel Type</th>
//                   <th style={{ background: '#BADDDA' }}>SB No</th>
//                   <th style={{ background: '#BADDDA' }}>No. of Package</th>
//                   <th style={{ background: '#BADDDA' }}>Party</th>
//                   <th style={{ background: '#BADDDA' }}>Vehicle No.</th>
//                   <th style={{ background: '#BADDDA' }}>PO Name</th>
//                   <th style={{ background: '#BADDDA' }}>Action</th>
                  
//                 </tr>
//               </thead>
//               <tbody>
//                 {handoverdata.map((item, index) => (
//                   <tr key={index} className="text-center">     
//                   <td>{index + 1}</td>    
//                   <td>{index + 1}</td>  
//                   <td>{item.serNo}</td>       
//                     <td>{item.sbRequestId}</td>
//                     <td>{item.sbNo}</td>
//                     <td>{item.noOfPackages}</td>
                
//                     <td>{getpartyId[item.nameOfExporter]}</td>
//                     <td>{item.gatePassVehicleNo}</td>
//                     <td>{item.pOName}</td>
//                     <td className="text-center d-grid gap-2 d-md-block ">
//                         <Button
//                           type="button"
//                           variant="outline-primary"
//                            onClick={() => handleRemove(item)}
//                            disabled={isGenerateGatePassClicked}
//                           style={{ marginRight: '5px', marginBottom: '12px' }}
//                         >
//                           <FontAwesomeIcon icon={faRemove} style={{ marginRight: 'px' }} />
//                         </Button>
//                         {/* <Button
//                           type="button"
//                           variant="outline-danger"
//                           // onClick={() => handleDelete(user)}
//                           style={{ marginRight: '5px', marginBottom: '12px' }}
//                         >
//                           <FontAwesomeIcon icon={faTrash} style={{ marginRight: 'px' }} />
//                         </Button> */}
//                       </td>                  
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </CardBody>
//         </Card>

//       </div>
//     </>
//   )
// }





import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DatePicker from "react-datepicker";
import { Button } from 'react-bootstrap';
import '../Components/Style.css';
import ipaddress from "../Components/IpAddress";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
import { faAngleRight, faAtom, faBolt, faBoxesPacking, faIdBadge, faHandHoldingHand, faHistory, faList, faList12, faListAlt, faPencil, faPlaneDeparture, faPlus, faPlusCircle, faSearch, faUserCircle, faUsersViewfinder, faFilePdf, faRefresh, faRemove, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
export default function Carting_Agent() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {

      navigate('/login?message=You need to be authenticated to access this page.');
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

  const [searchFilters, setSearchFilters] = useState({
    serNo: '',
    dgdcStatus: '',
  });


  const [serNo, setSerNo] = useState('');
  const [vehNo, setVehicleNo] = useState('');
  const [OfficerName, setPreventiveOfficerName] = useState('');
  const [handoverdata, sethandoverdata] = useState([]);
  const [serNoArray, setSerNoArray] = useState([]);



  const handleRefresh = () => {
    setSerNoArray([]);
    console.log(serNoArray);
    setIsGenerateGatePassClicked(false);
    sethandoverdata([]);
    setSerNo(''); // Reset the serNo state
    setVehicleNo('');
    setPreventiveOfficerName('');
  };


  const [partys, setPartys] = useState([]);
  const [isGenerateGatePassClicked, setIsGenerateGatePassClicked] = useState(false);
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

  const handlePrint = async () => {

    const requestData = new FormData();

    requestData.append('serNoArray', serNoArray);
    console.log(handoverdata);
    try {
      const response = await axios.post(`http://${ipaddress}export/printgatepass/${companyid}/${branchId}`, requestData)
      toast.success("GatePass PDF Created Successfully ", { position: "top-center", autoClose: 2000 });

      if (response.status === 200) {

        const base64PDF = response.data;

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
        throw new Error('Failed to generate PDF');
      }
    } catch (error) {
    }
  };


  // const handlePDF = () => {

  //   console.log(serNoArray);
  //   toast.success("Handle Print", { position: "top-center" ,autoClose: 2000});

  // };


  const handlePDF = async () => {

    const requestData = new FormData();

    requestData.append('serNoArray', serNoArray);
    console.log(handoverdata);
    try {
      const response = await axios.post(`http://${ipaddress}export/printgatepass/${companyid}/${branchId}`, requestData)
      toast.success("GatePass PDF Created Successfully ", { position: "top-center", autoClose: 2000 });

      if (response.status === 200) {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'bill_invoice.pdf'; // Set the filename for the downloaded PDF
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
















  const handleRemove = (item) => {
    console.log(serNoArray);

    if (serNoArray.includes(item.serNo)) {
      // Remove the item if it's present
      const updatedArray = serNoArray.filter((serNo) => serNo !== item.serNo);
      setSerNoArray(updatedArray);

      if (updatedArray.length === 0 || updatedArray === null) {
        sethandoverdata([]);
      }

      toast.success("SER Number " + item.serNo + " Removed Successfully", { position: "top-center", autoClose: 2000 });
    } else {
      // Add the item if it's not present
      setSerNoArray([...serNoArray, item.serNo]);

      // Check if the array is empty and set sethandoverdata to null
      if (serNoArray.length === 0 || serNoArray === null) {
        sethandoverdata(null);
      }
    }
  };


  const handleGenerateGatePass = async () => {
    setIsGenerateGatePassClicked(true);
    console.log(serNoArray);

    const requestData = new FormData();
    requestData.append('serNoArray', serNoArray);
    requestData.append('vehNo', vehNo);
    requestData.append('OfficerName', OfficerName);

    try {
      const response = await axios.post(`http://${ipaddress}export/generateGatePass/${companyid}/${branchId}`, requestData);

      if (response && response.status >= 200 && response.status < 300) {
        toast.success("Gatepass Generated Successfully, Download Now", { position: "top-center", autoClose: 2000 });

        fetchDataBySerNos();
      } else {
        console.error("Unexpected response", response);
        toast.error("GatePass Generation Failed", { position: "top-center", autoClose: 2000 });
        fetchDataBySerNos();
      }
    } catch (error) {
      console.error("GatePass Generation Failed", error);
      toast.error("GatePass Generation Failed", { position: "top-center", autoClose: 2000 });
    }
  };



  // useEffect to fetch data when serNoArray length increases
  useEffect(() => {
    if (serNoArray.length > 0) {
      axios
        .all(
          serNoArray.map((serNo) =>
            axios.get(`http://${ipaddress}export/getdatabyserNo/${companyid}/${branchId}/${serNo}`)
          )
        )
        .then((responses) => {
          const data = responses.map((response) => response.data);
          sethandoverdata(data.flat()); // Flatten the array of arrays and set the data
        })
        .catch((error) => {
          // Handle errors
        });
    }
  }, [serNoArray]); // Run this effect when serNoArray changes


  const fetchDataBySerNos = () => {
    // Check if the serNoArray is not empty
    if (!serNoArray.includes(serNo)) {


      // axios.get(`http://${ipaddress}export/getdatabyserNo/${companyid}/${branchId}/${serNo}`)
      axios.get(`http://${ipaddress}export/getdatabyserNoandDGDCStatus/${companyid}/${branchId}/${serNo}`)
        .then((response) => {
          const data = response.data;

          console.log(data);



          if (data && Object.keys(data).length > 0) {
            sethandoverdata([data]); // Wrap the single data item in an array
            // Show congratulatory message
            console.log("Congratulations! Data is not empty.");

            // Update the array with the new serNo
            setSerNoArray([...serNoArray, serNo]);
            setSerNo(''); // Reset the serNo state
          } else {

            // Handle the case where data is empty
            console.log("The response is empty.");

            toast.error("Record for SER No- " + serNo + " is not found", { position: "top-center", autoClose: 2000 });
          }
        })
        .catch((error) => {
          // Handle errors
          console.error("An error occurred:", error);
        });


    }

    if (serNoArray.includes(serNo)) {

      toast.success("SER Number " + serNo + " is already added", { position: "top-center", autoClose: 2000 });
      console.log(serNoArray);
      setSerNo(''); // Reset the serNo state
    }
    if (serNoArray.length > 0) {
      // Use axios.all to make multiple requests simultaneously
      axios.all(
        serNoArray.map((serNo) =>
          axios.get(`http://${ipaddress}export/getdatabyserNo/${companyid}/${branchId}/${serNo}`)
        )
      )
        .then((responses) => {
          const data = responses.map((response) => response.data);
          sethandoverdata(data.flat()); // Flatten the array of arrays and set the data
          setSerNo(''); // Reset the serNo state
        })
        .catch((error) => {
          // Handle errors
        });

    }
  };


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
    axios.get(`http://${ipaddress}export/searchbypcdte/${companyid}/${branchId}/${convertToFormattedDate(searchbydate.searchDate)}`)
      .then((response) => {
        setGatepassdata(response.data);
        if(response.data.length>0){
          toast.success("Data found successfully", {
            autoClose: 700
          })
         }
         else{
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



  const handlePrint1 =  async (requestData) => {

  
    try {
      const response =  await axios.post(`http://${ipaddress}export/printgatepass1/${companyid}/${branchId}`,requestData)

      if (response.status === 200) {

        const base64PDF = response.data;

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
        throw new Error('Failed to generate PDF');
      }
    } catch (error) {
    }
  };


  const handlePDF1 = async (requestData) => {

   
    try {
      const response = await axios.post(`http://${ipaddress}export/printgatepass1/${companyid}/${branchId}`, requestData)

      if (response.status === 200) {
        const pdfBase64 = response.data; // Assuming response.data contains the Base64-encoded PDF

        // Create a Blob from the Base64 data
        const pdfBlob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });

        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Create an anchor element for downloading
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = 'Gate_Pass.pdf'; // Set the filename for the downloaded PDF
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);

        // Trigger the download
        downloadLink.click();

        // Clean up
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(blobUrl);

       

      } else {
        throw new Error('Failed to generate PDF');
      }
    } catch (error) {
    }
  };
  return (
    <>
      <div className='Container'>
        <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
          icon={faIdBadge}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        />Gate Pass Personal</h5>
        <Card style={{ backgroundColor: "#F8F8F8" }}>
          <CardBody>
            <Tabs
              defaultActiveKey="home"
              transition={false}
              id="noanim-tab-example"
              className="mb-3"
            >

              <Tab eventKey="home" title="Generate">
                <Card style={{ backgroundColor: "#F8F8F8" }}>
                  <CardBody>

                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label className="forlabel" for="serNo">Enter SER No.</Label>
                          <Input
                            type="text"
                            name="serNo"
                            id="serNo"
                            className="inputField"
                            value={serNo}
                            onChange={(e) => setSerNo(e.target.value)}
                            placeholder='Enter SER No.'
                          />
                        </FormGroup>
                      </Col>
                      <Col style={{ marginTop: 22 }}>
                        <Button type="button" className="" onClick={fetchDataBySerNos} variant="outline-success" style={{ marginTop: '10px', marginRight: '5px' }}>
                          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '5px' }} />
                          Add
                        </Button>
                        <Button type="button" className="" onClick={handleRefresh} variant="outline-primary" style={{ marginTop: '10px' }}>
                          <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                <Card style={{ marginTop: 25 }}>
                  <CardBody>
                    <Row>
                      <Col md={3}>
                        <FormGroup>
                          <Label className="forlabel" for="vehNo"> Vehicle No.</Label>
                          <Input
                            type="text"
                            name="vehNo"
                            id="vehNo"
                            className="inputField"
                            value={vehNo}
                            onChange={(e) => setVehicleNo(e.target.value)}
                            placeholder='Enter Vehicle Number'
                          />
                        </FormGroup>

                      </Col>
                      <Col md={3}>


                        <FormGroup>
                          <Label className="forlabel" for="OfficerName">Preventive Officer Name </Label>
                          <Input
                            type="text"
                            name="OfficerName"
                            id="OfficerName"
                            className="inputField"
                            value={OfficerName}
                            onChange={(e) => setPreventiveOfficerName(e.target.value)}
                            placeholder='Enter Preventive Officer'
                          />
                        </FormGroup>

                      </Col>
                      <Col md={3} className='text-center ' style={{ marginTop: '30px' }}  >
                        <Button type="button" onClick={handleGenerateGatePass} className="" style={{ marginRight: 10 }} variant="outline-primary" disabled={!vehNo || !OfficerName || handoverdata.some(item => item.gatePassVehicleNo || item.pOName)}  >
                          <FontAwesomeIcon icon={faBolt} style={{ marginRight: '5px' }} />
                          Generate GatePass
                        </Button>

                      </Col>
                      <Col md={3} className='text-center' style={{ marginTop: '30px' }} >

                        <Button type="button" onClick={handlePrint} className="" style={{ marginRight: 10 }} variant="outline-success" >
                          <FontAwesomeIcon icon={faPrint} style={{ marginRight: '5px' }} />
                          Print
                        </Button>
                        <Button type="button" onClick={handlePDF} className="" variant="outline-primary" >
                          <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px' }} />
                          PDF
                        </Button>
                      </Col>
                    </Row>
                    <Table style={{ marginTop: '20px' }} striped responsive bordered>

                      <thead>
                        <tr className="text-center">
                          <th style={{ background: '#BADDDA' }}>Sr.No</th>
                          <th style={{ background: '#BADDDA' }}>Sl. No</th>
                          <th style={{ background: '#BADDDA' }}>SER No</th>
                          <th style={{ background: '#BADDDA' }}>Parcel Type</th>
                          <th style={{ background: '#BADDDA' }}>SB No</th>
                          <th style={{ background: '#BADDDA' }}>No. of Package</th>
                          <th style={{ background: '#BADDDA' }}>Party</th>
                          <th style={{ background: '#BADDDA' }}>Vehicle No.</th>
                          <th style={{ background: '#BADDDA' }}>PO Name</th>
                          <th style={{ background: '#BADDDA' }}>Action</th>

                        </tr>
                      </thead>
                      <tbody>
                        {handoverdata.map((item, index) => (
                          <tr key={index} className="text-center">
                            <td>{index + 1}</td>
                            <td>{index + 1}</td>
                            <td>{item.serNo}</td>
                            <td>{item.sbRequestId}</td>
                            <td>{item.sbNo}</td>
                            <td>{item.noOfPackages}</td>

                            <td>{getpartyId[item.nameOfExporter]}</td>
                            <td>{item.gatePassVehicleNo}</td>
                            <td>{item.pOName}</td>
                            <td className="text-center d-grid gap-2 d-md-block ">
                              <Button
                                type="button"
                                variant="outline-primary"
                                onClick={() => handleRemove(item)}
                                disabled={isGenerateGatePassClicked}
                                style={{ marginRight: '5px', marginBottom: '12px' }}
                              >
                                <FontAwesomeIcon icon={faRemove} style={{ marginRight: 'px' }} />
                              </Button>
                              {/* <Button
                          type="button"
                          variant="outline-danger"
                          // onClick={() => handleDelete(user)}
                          style={{ marginRight: '5px', marginBottom: '12px' }}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ marginRight: 'px' }} />
                        </Button> */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Tab>
              <Tab eventKey="print" title="Print">
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
                {gatepassdata.length>0 && (
                  <Table style={{ marginTop: '20px' }} striped responsive bordered>

                  <thead>
                    <tr className="text-center">
                      <th style={{ background: '#BADDDA' }}>Sr.No</th>
                      <th style={{ background: '#BADDDA' }}>Gate Pass Id</th>
                      <th style={{ background: '#BADDDA' }}>PO Name</th>
                      <th style={{ background: '#BADDDA' }}>Action</th>


                    </tr>
                  </thead>
                  <tbody>
                    {gatepassdata.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td>{index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.officername}</td>


                        <td className="text-center d-grid gap-2 d-md-block ">
                          <Button
                            type="button"
                            variant="outline-success"
                            onClick={() => handlePrint1(item)}
                            
                            style={{ marginRight: '5px', marginBottom: '12px' }}
                          >
                            <FontAwesomeIcon icon={faPrint} style={{ marginRight: 'px' }} />
                            Print
                          </Button>
                          <Button
                            type="button"
                            variant="outline-primary"
                            onClick={() => handlePDF1(item)}
                            
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
        </Card>

      </div>
    </>
  )
}

