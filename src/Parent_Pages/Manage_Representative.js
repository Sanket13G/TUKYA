// import { redirect } from 'react-router-dom';
// import AuthContext from '../Components/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import Pagination from 'react-bootstrap/Pagination';
// import React, { useEffect, useState, useContext } from 'react';
// import '../Components/Style.css';
// import { Button, Modal } from 'react-bootstrap';
// import Dashboard from '../Components/Dashboard';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import '../Components/Style.css';
// import { Card, CardBody, Col, Form, Input, FormGroup, Row, Table, Label } from 'reactstrap';
// import DatePicker from "react-datepicker";
// import { faArrowAltCircleRight, faBolt, faCheck, faEdit, faPager, faPlus, faRefresh, faSave, faSearch, faTrash, faUserAlt, faUserFriends, faUserPen } from '@fortawesome/free-solid-svg-icons';
// import { FaCreativeCommons } from 'react-icons/fa';
// import SantoshImage from "../services/contacts.png"
// import ipaddress from "../Components/IpAddress";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function Manage_Representative() {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useContext(AuthContext);
//   const [singleRepresentativeModel, setsingleRepresentativeModel] = useState(false);
//   const closesingleRepresentativeModel = () => { setsingleRepresentativeModel(false);handleClear(); handleSearch();}
//   const [singleRepresentativeEditModel, setsingleRepresentativeEditModel] = useState(false);
//   const closesingleRepresentativeEditModel = () => { setsingleRepresentativeEditModel(false);handleClear(); handleSearch();}
//   const [representativeImage, setrepresentativeImage] = useState(null);
//   const [representativeImage1, setrepresentativeImage1] = useState(null);
//   const [s1, sets1] = useState('');
//   const [s2, sets2] = useState('');
//   const [mobile, setmobileNo] = useState('');
//   const [firstName, setfirstName] = useState('');
//   const [middleName, setmiddleName] = useState('');
//   const [lastName, setlastName] = useState('');
//   const [representativeID, setRepresentativeID] = useState('');
//   const [status, setStatus] = useState('A');
//   const [file, setFile] = useState(null);
//   const [file1, setFile1] = useState(null);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
//   const [userList, setUserList] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);


//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     role,
//     companyname,
//     branchname,
//     logintype,
//     logintypeid,

//     login,
//     logout,
//   } = useContext(AuthContext);

//   console.log('logintypeid ', logintypeid);
//   // If the user is not authenticated, redirect to the login page
//   useEffect(() => {
//     if (!isAuthenticated) {

//       navigate('/login?message=You need to be authenticated to access this page.');
//     }
//   }, [isAuthenticated, navigate]);


//   const initialState = {
//     firstName: "",
//     middleName: "",
//     mobile: "",
//     lastName: "",
//     status: "",
//     file: "",
//   };

//   const [formData, setFormData] = useState(initialState);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleAddRepresentativeClick = (click) => {
//     setFormData(initialState);
//     setfirstName("");
//     setlastName("");
//     setmiddleName("");
//     setmobileNo("");
//     setStatus("");
//     setFormErrors({
//       sbRequestId: "",
//       sbNo: "",
//       sbDate: "",
//       flightNo: "",
//       flightDate: "",
//       nameOfExporter: "",
//       dgdcStatus: "",
//     })
//     setsingleRepresentativeModel(true);

//   };

//   const handleBack = (click) => {
//     setFormData(initialState);
//     setfirstName("");
//     setlastName("");
//     setmiddleName("");
//     setmobileNo("");
//     setStatus("");
//     setsingleRepresentativeEditModel(false);

//   };

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`http://${ipaddress}represent/getAllRepresentParty/${companyid}/${branchId}/${logintypeid}`);
//       const userList = response.data;


//       // Fetch party images concurrently
//       const imagePromises = userList.map(user => fetchPartyRepresentativeImage(user));
//       const partyImages = await Promise.all(imagePromises);

//       // Combine party data and images
//       const combinedData = userList.map((user, index) => ({
//         ...user,
//         imageURL: partyImages[index], // Add imageURL to user object
//       }));


//       const filteredResults = combinedData.filter(user => {

//         // const filteredResults = userList.filter(user => {
//         const nameMatch =
//           user.firstName.toLowerCase().includes(s1.toLowerCase()) ||
//           user.middleName.toLowerCase().includes(s1.toLowerCase()) ||
//           user.lastName.toLowerCase().includes(s1.toLowerCase());

//         const mobileMatch = user.mobile.includes(s2);

//         // Include user if there's a match in either name or mobile
//         if (s1 && s2) {
//           return nameMatch && mobileMatch; // Search by both name and mobile
//         } else if (s1) {
//           return nameMatch; // Search by name only
//         } else if (s2) {
//           return mobileMatch; // Search by mobile only
//         }

//         return true; // No search criteria, include all users
//       });

//       setSearchResults(filteredResults);
//       setShowSearchResults(true);
//     } catch (error) {
//       console.error("Error while searching:", error);
//       toast.error("Error while searching!", "error");
//     }
//   };


//   const handleRefresh = async () => {
//     sets1("");
//     sets2("");
//     fetchPartiesData();
//     try {
//       const response = await axios.get(`http://${ipaddress}represent/getAllRepresentParty/${companyid}/${branchId}/${logintypeid}`);
//       const userList = response.data;

//       // Fetch party images concurrently
//       const imagePromises = userList.map(user => fetchPartyRepresentativeImage(user));
//       const partyImages = await Promise.all(imagePromises);

//       // Combine party data and images
//       const combinedData = userList.map((user, index) => ({
//         ...user,
//         imageURL: partyImages[index], // Add imageURL to user object
//       }));









//       setSearchResults(combinedData);
//       setShowSearchResults(true);
//     } catch (error) {
//       console.error("Error while searching:", error);
//       toast.error("Error while searching!", "error");
//     }
//   }

//   const handleClear = () => {
//     setFormData(initialState);
//     setfirstName("");
//     setlastName("");
//     setmiddleName("");
//     setmobileNo("");
//     setStatus("");


//     // Clear the file input by resetting its value
    
//     // Also clear the state
//     setFile(null);
//     setFile1(null);

//      setFormErrors({
//       firstName: "",
//       middleName: "",
//       lastName: "",
//       file: "",
//       file1: "",
//       mobile: "",
//     })
//     document.getElementById('firstName').classList.remove('error-border');
//     document.getElementById('middleName').classList.remove('error-border');
//     document.getElementById('lastName').classList.remove('error-border');
//     document.getElementById('file').classList.remove('error-border');
//     document.getElementById('file1').classList.remove('error-border');
//     document.getElementById('mobile').classList.remove('error-border');

//   }

//   const fetchPartyRepresentativeImage = async (user) => {
//     try {
//       const response = await axios.get(`http://${ipaddress}represent/getImage1/${user.companyId}/${user.branchId}/${logintypeid}/${user.representativeId}`);

//       console.log(response.data);
//       // setrepresentativeImage(response.data);
//       // setrepresentativeImage1(response.data);

//       // Return the image URL or the whole response based on your API structure
//       return response.data;
//     } catch (error) {
//       console.error("Failed to fetch party image. Please try again.", error);
//       throw error; // Rethrow the error for handling in the calling function
//     }
//   };

//   const fetchPartiesData = async () => {
//     try {
//       const response = await axios.get(`http://${ipaddress}represent/getAllRepresentParty/${companyid}/${branchId}/${logintypeid}`);
//       const userList = response.data;

//       // Fetch party images concurrently
//       const imagePromises = userList.map(user => fetchPartyRepresentativeImage(user));
//       const partyImages = await Promise.all(imagePromises);

//       // Combine party data and images
//       const combinedData = userList.map((user, index) => ({
//         ...user,
//         imageURL: partyImages[index], // Add imageURL to user object
//       }));
//       // setrepresentativeImage1(response.data);
//       setUserList(combinedData);
//       setSearchResults(combinedData);

//     } catch (error) {
//       console.error("Failed to fetch parties data. Please try again.", error);
//     //  alert("Failed to fetch parties data. Please try again.");
//     }
//   };


//   useEffect(() => {
//     fetchPartiesData(); // Call the function when the component mounts
//   }, [companyid, branchId,logintypeid]); // Add dependencies here

// console.log('searchResults ',searchResults);
//   // change function for update date
//   const handleUpdate = () => {
//     let fileSizeInBytes = 0;
//     if(file){
//       fileSizeInBytes = file.size;
//     }
//     const maxSizeInBytes = 500 * 1024;

//     let fileSizeInBytes1 = 0;
//     if(file1){
//       fileSizeInBytes1 = file1.size;
//     }
 

//     setFormErrors({
//       firstName: "",
//       middleName: "",
//       lastName: "",
//       file: "",
//       file1: "",
//       mobile: "",
//     })
//     document.getElementById('firstName').classList.remove('error-border');
//     document.getElementById('middleName').classList.remove('error-border');
//     document.getElementById('lastName').classList.remove('error-border');
//     document.getElementById('file').classList.remove('error-border');
//     document.getElementById('file1').classList.remove('error-border');
//     document.getElementById('mobile').classList.remove('error-border');

//     const errors = {};

  

//     if (!firstName) {
//       errors.firstName = "First Name is required.";
//     }

//     if (!middleName) {
//       errors.middleName = "Middle Name is required.";
//     }

//     if (!lastName) {
//       errors.lastName = "Last Name is required.";
//     }

//     if (!mobile) {
//       errors.mobile = "Mobile No is required.";
//     }
//     if(file){
//       if(fileSizeInBytes>maxSizeInBytes){
//         errors.file = "File size exceeds 500kb limit.";
//       }
//     }
//    if(file1){
//     if(fileSizeInBytes1>maxSizeInBytes1){
//       errors.file1 = "File size exceeds 300kb limit.";
//     }
//    }
   


//     if (!firstName) {
//       document.getElementById('firstName').classList.add('error-border');
//     }
//     if (!middleName) {
//       document.getElementById('middleName').classList.add('error-border');
//     }
//     if (!lastName) {
//       document.getElementById('lastName').classList.add('error-border');
//     }
//     if (!mobile) {
//       document.getElementById('mobile').classList.add('error-border');
//     }
//    if(file){
//     if(fileSizeInBytes>maxSizeInBytes){
//       document.getElementById('file').classList.add('error-border');
//     }
//    }
//    if(file1){
//     if(fileSizeInBytes1>maxSizeInBytes1){
//       document.getElementById('file1').classList.add('error-border');
//     }
//    }
   
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }

   
   

//     const maxSizeInBytes1 = 300 * 1024;


//     if (file) {
//       const formData = new FormData();
//       formData.append('firstName', firstName);
//       formData.append('middleName', middleName);
//       formData.append('lastName', lastName);
//       formData.append('mobile', mobile);
//       // formData.append('partyid', partyid);  
//       formData.append('status', status);

//       formData.append('file', file);
//       if (file1) {
//         formData.append('file1', file1);
//       }

//       try {
//         axios
//           .post(`http://${ipaddress}represent/updateRepresentative/${companyid}/${branchId}/${logintypeid}/${representativeID}`, formData)

//           .then((response) => {
//             console.log("Party Representative data Updated successfully!");
//             console.log(response.data);

//             // Assuming response.data is the updated form data, update formData state
//             // setFormData(response.data);
//             setsingleRepresentativeEditModel(false);
//             toast.success("Form data sent successfully!", "success");
//             fetchPartiesData();
//             handleRefresh();
//             setFile(null);
//             setFile1(null);

//           })
//           .catch((error) => {
//             console.error("Error while updating form data:", error);
//             toast.error("Error while updating form data!", "error");
//           });
//       }
//       catch (error) {
//         // Handle errors
//         console.error('Error:', error);
//       }
//     }

//     else {
//       const formData = new FormData();
//       formData.append('firstName', firstName);
//       formData.append('middleName', middleName);
//       formData.append('lastName', lastName);
//       formData.append('mobile', mobile);
//       // formData.append('partyid', partyid);  
//       formData.append('status', status);

//       if (file1) {
//         formData.append('file1', file1);
//       }

//       try {
//         axios
//           .post(`http://${ipaddress}represent/updateRepresentativewithoutFile/${companyid}/${branchId}/${logintypeid}/${representativeID}`, formData)

//           .then((response) => {
//             setFile(null);
//             setFile1(null);
//             console.log("Party Representative data Updated successfully!");
//             console.log(response.data);

//             // Assuming response.data is the updated form data, update formData state
//             setFormData(response.data);

//             toast.success("Form data sent successfully!", "success");
//             fetchPartiesData();

//           })
//           .catch((error) => {
//             console.error("Error while updating form data:", error);
//             toast.error("Error while updating form data!", "error");
//           });
//       }
//       catch (error) {
//         // Handle errors
//         console.error('Error:', error);
//       }



//     }


//     fetchPartiesData(); // Call the function when the component mounts
//   };


//   const handleSubmit = () => {

//     setFormErrors({
//       firstName: "",
//       middleName: "",
//       lastName: "",
//       file: "",
//       file1: "",
//       mobile: "",
//     })
//     document.getElementById('firstName').classList.remove('error-border');
//     document.getElementById('middleName').classList.remove('error-border');
//     document.getElementById('lastName').classList.remove('error-border');
//     document.getElementById('file').classList.remove('error-border');
//     document.getElementById('file1').classList.remove('error-border');
//     document.getElementById('mobile').classList.remove('error-border');

//     const errors = {};

//     let fileSizeInBytes = 0;
//     if(file){
//       fileSizeInBytes = file.size;
//     }
//     const maxSizeInBytes = 500 * 1024;

//     let fileSizeInBytes1 = 0;
//     if(file1){
//       fileSizeInBytes1 = file1.size;
//     }

//     const maxSizeInBytes1 = 300 * 1024;

//     if (!firstName) {
//       errors.firstName = "First Name is required.";
//     }

//     if (!middleName) {
//       errors.middleName = "Middle Name is required.";
//     }

//     if (!lastName) {
//       errors.lastName = "Last Name is required.";
//     }

//     if (!mobile) {
//       errors.mobile = "Mobile No is required.";
//     }

//     if (!file) {
//       errors.file = "Image file is required.";
//     }
//     else{
//       if(fileSizeInBytes>maxSizeInBytes){
//         errors.file = "File size exceeds 500kb limit.";
//       }
//     }

//     if (!file1) {
//       errors.file1 = "Signature is required.";
//     }
//     else{
//       if(fileSizeInBytes1>maxSizeInBytes1){
//         errors.file1 = "File size exceeds 300kb limit.";
//       }
//     }


//     if (!firstName) {
//       document.getElementById('firstName').classList.add('error-border');
//     }
//     if (!middleName) {
//       document.getElementById('middleName').classList.add('error-border');
//     }
//     if (!lastName) {
//       document.getElementById('lastName').classList.add('error-border');
//     }
//     if (!mobile) {
//       document.getElementById('mobile').classList.add('error-border');
//     }
//     if (!file) {
//       document.getElementById('file').classList.add('error-border');
//     }
//     else{
//       if(fileSizeInBytes>maxSizeInBytes){
//         document.getElementById('file').classList.add('error-border');
//       }
//     }
//     if (!file1) {
//       document.getElementById('file1').classList.add('error-border');
//     }
//     else{
//       if(fileSizeInBytes1>maxSizeInBytes1){
//         document.getElementById('file1').classList.add('error-border');
//       }
//     }
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }


//     const formData = new FormData();
//     formData.append('firstName', firstName);
//     formData.append('middleName', middleName);
//     formData.append('lastName', lastName);
//     formData.append('mobile', mobile);
//     // formData.append('partyid', partyid);
//     formData.append('companyid', companyid);
//     formData.append('branchId', branchId);
//     formData.append('status', status);
//     // 'file' should match your backend's parameter name
//     formData.append('file', file);
//     formData.append('file1', file1);

//     try {
//       axios
//         .post(`http://${ipaddress}represent/addRepresentative/${companyid}/${branchId}/${logintypeid}`, formData)


//         .then((response) => {

//           setFile(null);
//           setFile1(null);
//           console.log("Form data sent successfully!");
//           console.log(response.data);

//           // Assuming response.data is the updated form data, update formData state
//           setFormData(response.data);

//           toast.success("Form data sent successfully!", "success");
//           fetchPartiesData();
//           setsingleRepresentativeModel(false);
//         })
//         .catch((error) => {
//           console.error("Error while sending form data:", error);
//           toast.error("Error while sending form data!", "error");
//         });
//     }
//     catch (error) {
//       // Handle errors
//       console.error('Error:', error);
//     }

//     // fetchPartiesData();
//   };



//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];


//     // Check if a file is selected
//     if (!selectedFile) {
//       return;
//     }

//     // Check file size (in bytes)
//     const maxSizeInBytes = 8 * 1024 * 1024; // 8MB
//     if (selectedFile.size > maxSizeInBytes) {
//       toast.error('File size must be less than 8MB');
//       return;
//     }

//     // Check file type
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
//     if (!allowedFileTypes.includes(selectedFile.type)) {
//       toast.error('File type must be jpg, jpeg, png, or pdf');
//       return;
//     }

//     // If all checks pass, set the selected file
//     setFile(selectedFile);


//   };

//   const handleFileChange1 = (e) => {
//     const selectedFile = e.target.files[0];


//     // Check if a file is selected
//     if (!selectedFile) {
//       return;
//     }

//     // Check file size (in bytes)
//     const maxSizeInBytes = 8 * 1024 * 1024; // 8MB
//     if (selectedFile.size > maxSizeInBytes) {
//       toast.error('File size must be less than 8MB');
//       return;
//     }

//     // Check file type
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
//     if (!allowedFileTypes.includes(selectedFile.type)) {
//       toast.error('File type must be jpg, jpeg, png, or pdf');
//       return;
//     }

//     // If all checks pass, set the selected file
//     setFile1(selectedFile);


//   };













//   const handleEdit = async (user) => {
//     setSelectedUser(user);
//     setsingleRepresentativeEditModel(true);
//     setmobileNo(user.mobile);
//     setfirstName(user.firstName);
//     setmiddleName(user.middleName);
//     setlastName(user.lastName);
//     setStatus(user.userStatus);
//     setRepresentativeID(user.representativeId);
//     //setFile(user.file);
//     console.log(user);


//     try {
//       const response = await axios.get(`http://${ipaddress}represent/getImage1/${user.companyId}/${user.branchId}/${logintypeid}/${user.representativeId}`);
//       // Return the image URL or the whole response based on your API structure
//       // return response.data.imageURL;
//       console.log(response.data);
//       setrepresentativeImage(response.data);

//     } catch (error) {
//       console.error("Party Representative have no image. Please try again.", error);

//     }

//     try {
//       const response = await axios.get(`http://${ipaddress}represent/getImage2/${user.companyId}/${user.branchId}/${logintypeid}/${user.representativeId}`);
//       // Return the image URL or the whole response based on your API structure
//       // return response.data.imageURL;
//       console.log(response.data);
//       setrepresentativeImage1(response.data);

//     } catch (error) {
//       console.error("Party Representative have no image. Please try again.", error);

//     }



//   };



//   const handleDelete = async (user) => {
//     console.log(user.representativeId);

//     axios
//       .delete(`http://${ipaddress}represent/deleteRepresentative/${user.companyId}/${user.branchId}/${user.userId}/${user.representativeId}`)
//       .then((response) => {

//         toast.error(`Party Representative deleted successfully!`, "success");

//         // fetchPartiesData();
//         // After successful deletion, update the userList state
//         // setUserList((prevList) =>
//         //   prevList.filter((user) => user.user_Id !== user_Id)
//         // );

//         // handleRefresh();
//         fetchPartiesData();
//       })
//       .catch((error) => {
//         console.error("Error while deleting user:", error);
//         toast.error("Error while deleting user!", "error");
//       });


//     try {
//       const response = await axios.get(`http://${ipaddress}represent/getAllRepresentParty/${companyid}/${branchId}/${logintypeid}`);
//       const userList = response.data;

//       // Fetch party images concurrently
//       const imagePromises = userList.map(user => fetchPartyRepresentativeImage(user));
//       const partyImages = await Promise.all(imagePromises);

//       // Combine party data and images
//       const combinedData = userList.map((user, index) => ({
//         ...user,
//         imageURL: partyImages[index], // Add imageURL to user object
//       }));
//       // setrepresentativeImage1(response.data);
//       setUserList(combinedData);

//     } catch (error) {
//       console.error("Failed to fetch parties data. Please try again.", error);
     
//     }


//   };


//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // You can adjust this as needed
//   const totalPages = Math.ceil(userList.length / itemsPerPage);
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const displayedUsers = userList.slice(startIndex, endIndex);

//   const [formErrors, setFormErrors] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     file: "",
//     file1: "",
//     mobile: "",

//   });

//   return (

//     <div className='container'>
//       <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
//         icon={faPager}
//         style={{
//           marginRight: '8px',
//           color: 'black', // Set the color to golden
//         }}
//       />  Manage Representative</h5>
//       <Card>
//         <CardBody>
//           <Row className="justify-content-end">
//             <Col md={10}></Col>
//             <Col className="justify-content-end">
//               <Button
//                 // outline color="success"
//                 variant="outline-success"
//                 onClick={(e) => handleAddRepresentativeClick()}
//               > <FontAwesomeIcon icon={faUserAlt} style={{ marginRight: '5px' }} />
//                 Representative
//               </Button>

//             </Col>

//           </Row>
//           <Row>
//             <Col md={4}>
//               <FormGroup>
//                 <h6>Name</h6>
//                 <Input
//                   type="text"
//                   name="s1"
//                   id="s1"
//                   placeholder='Enter Name / Middle Name / Last Name for Search'
//                   value={s1}
//                   onChange={(e) => sets1(e.target.value)}

//                 />
//               </FormGroup>
//             </Col>
//             <Col md={4}>
//               <FormGroup>
//                 <h6> Mobile Number </h6>
//                 <Input
//                   type="int"
//                   name="s2"
//                   id="s2"
//                   placeholder='Enter Mobile Number to search'
//                   value={s2}
//                   onChange={(e) => sets2(e.target.value)}
//                   maxLength={10}
//                 />

//               </FormGroup>
//             </Col >
//             <Col style={{ marginTop: 26 }} md={4} >
//               <Button variant="outline-primary" onClick={() => handleSearch()} style={{ marginRight: 5 }}>
//                 <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px', }} />
//                 Search
//               </Button>
//               <Button variant="outline-success" onClick={() => handleRefresh()}>
//                 <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px', }} />
//                 Refresh
//               </Button>
//             </Col>


//           </Row>

//           <hr />

//           <div className="table-responsive">
//             <Table className="table table-striped table-hover">
//               <thead>
//                 <tr>
//                   <th style={{ backgroundColor: '#BADDDA' }} >First Name</th>
//                   <th style={{ backgroundColor: '#BADDDA' }}>Middle Name</th>
//                   <th style={{ backgroundColor: '#BADDDA' }}>Last Name</th>
//                   <th style={{ backgroundColor: '#BADDDA' }}>Mobile Number</th>
//                   <th style={{ backgroundColor: '#BADDDA' }}>Image</th>
//                   <th style={{ backgroundColor: '#BADDDA' }}> Status</th>
//                   <th style={{ backgroundColor: '#BADDDA' }} className="text-center">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>

//                 {showSearchResults
//                   ? searchResults.map((user) => (
//                     <tr key={user.representativeId}>
//                       <td>{user.firstName}</td>
//                       <td>{user.middleName}</td>
//                       <td>{user.lastName}</td>
//                       <td>{user.mobile}</td>



//                       <td>
//                         {user.imageURL ? (
//                           <img
//                             src={user.imageURL}
//                             alt={`Representative ${user.name}`}
//                             style={{ width: '50px', height: '50px' }}
//                           />
//                         ) : (
//                           "No Image Available"
//                         )}
//                       </td>
//                       {/* <td>{user.status}</td> */}

//                       <td>
//                         {user.status === 'A' ? 'Active' : user.status === 'I' ? 'Inactive' : 'Unknown'}
//                       </td>
//                       <td className="text-center d-grid gap-2 d-md-block ">
//                         <Button
//                           type="button"
//                           variant="outline-primary"
//                           onClick={() => handleEdit(user)}
//                           style={{ marginRight: '5px', marginBottom: '12px' }}
//                         >
//                           <FontAwesomeIcon icon={faEdit} style={{ marginRight: 'px' }} />
//                         </Button>
//                         <Button
//                           type="button"
//                           variant="outline-danger"
//                           onClick={() => handleDelete(user)}
//                           style={{ marginRight: '5px', marginBottom: '12px' }}
//                         >
//                           <FontAwesomeIcon icon={faTrash} style={{ marginRight: 'px' }} />
//                         </Button>
//                       </td>
//                     </tr>
//                   ))
//                   : displayedUsers.map((user) => (
//                     <tr key={user.representativeId}>
//                       <td>{user.firstName}</td>
//                       <td>{user.middleName}</td>
//                       <td>{user.lastName}</td>
//                       <td>{user.mobile}</td>


//                       <td>
//                         {user.imageURL ? (
//                           <img
//                             src={user.imageURL}
//                             alt={`Representative ${user.name}`}
//                             style={{ width: '50px', height: '50px' }}
//                           />
//                         ) : (
//                           "No Image Available"
//                         )}
//                       </td>
//                       {/* <td>{user.status}</td> */}
//                       <td>
//                         {user.status === 'A' ? 'Active' : user.status === 'I' ? 'Inactive' : 'Unknown'}
//                       </td>
//                       <td className="text-center d-grid gap-2 d-md-block ">
//                         <Button
//                           type="button"
//                           variant="outline-primary"
//                           onClick={() => handleEdit(user)}
//                           style={{ marginRight: '5px', marginBottom: '12px' }}
//                         >
//                           <FontAwesomeIcon icon={faEdit} style={{ marginRight: 'px' }} />
//                         </Button>
//                         <Button
//                           type="button"
//                           variant="outline-danger"
//                           onClick={() => handleDelete(user)}
//                           style={{ marginRight: '5px', marginBottom: '12px' }}
//                         >
//                           <FontAwesomeIcon icon={faTrash} style={{ marginRight: 'px' }} />
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </Table>
//           </div>
//           <Pagination style={{ display: 'flex', justifyContent: 'center' }}>
//             <Pagination.Prev
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             />
//             {Array.from({ length: totalPages }).map((_, index) => (
//               <Pagination.Item
//                 key={index}
//                 active={index + 1 === currentPage}
//                 onClick={() => handlePageChange(index + 1)}
//               >
//                 {index + 1}
//               </Pagination.Item>
//             ))}
//             <Pagination.Next
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             />
//           </Pagination>


//           <Modal show={singleRepresentativeModel} onHide={closesingleRepresentativeModel} size="xl">


//             <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
//               <CardBody>
//                 <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
//                   icon={faUserFriends}
//                   style={{
//                     marginRight: '8px',
//                     color: 'black', // Set the color to golden
//                   }}
//                 />Add Party Representative</h5>


//                 <hr />
//                 <Row className="mt-3" style={{ marginLeft: '2vw' }}>

//                   <Row>
//                     <Col md={4} >
//                       <FormGroup>
//                         <Label className="forlabel" for="firstName">First Name</Label>

//                         <Input
//                           type="text"
//                           name="firstName"
//                           id="firstName"
//                           value={firstName}

//                           onChange={(e) => setfirstName(e.target.value)}
//                           maxLength={15}
//                           required

//                         />
//                         <div style={{ color: 'red' }} className="error-message">{formErrors.firstName}</div>


//                       </FormGroup>
//                     </Col>

//                     <Col md={4}>
//                       <FormGroup>
//                         <Label className="forlabel" for="middleName">Middle Name</Label>

//                         <Input
//                           type="text"
//                           name="middleName"
//                           id="middleName"
//                           value={middleName}
//                           maxLength={15}
//                           //  onChange={handleChange}
//                           onChange={(e) => setmiddleName(e.target.value)}
//                           required
//                         // style={{ borderColor: errors.mobile ? '#f52b2b' : '' }}
//                         />
//                         <div style={{ color: 'red' }} className="error-message">{formErrors.middleName}</div>
//                       </FormGroup>
//                     </Col>
//                     <Col md={4}>

//                       <FormGroup>
//                         <Label className="forlabel" for="lastName">Last Name </Label>

//                         <Input
//                           type="text"
//                           name="lastName"
//                           id="lastName"
//                           value={lastName}
//                           maxLength={15}
//                           // onChange={handleChange}
//                           onChange={(e) => setlastName(e.target.value)}
//                           required
//                         // style={{ borderColor: errors.mobile ? '#f52b2b' : '' }}
//                         />
//                         <div style={{ color: 'red' }} className="error-message">{formErrors.lastName}</div>
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                   <Row>

//                     <Col md={4}>
//                       <FormGroup>
//                         <Label className="forlabel">Select Representative Image</Label>

//                         <Input type="file" name="filepath"
//                           id='file'
//                           className="form-control"
//                           onChange={handleFileChange}
//                           accept=".jpg, .jpeg, .png, "
//                         />
//                       </FormGroup>
//                       <div style={{ color: 'red' }} className="error-message">{formErrors.file}</div>
//                       <div style={{ color: 'red' }} className="error-message">Upload images only (.jpg, .jpeg, .png) and ensure they are under 500 KB.</div>
                      
//                     </Col>
//                     <Col md={4}>

//                       <FormGroup>
//                         <Label className="forlabel" for="mobile">Mobile Number </Label>

//                         {/* <Input
//                           type="number"
//                           name="mobile"
//                           id="mobile"
//                           value={mobile}
//                           maxLength={10}
                      
//                           onChange={(e) => setmobileNo(e.target.value)}
//                           required
                        
//                         /> */}
//                         <Input
//                           type="tel"
//                           name="mobile"
//                           id="mobile"
//                           value={mobile}
//                           onChange={(e) => {
//                             const formattedMobile = e.target.value.replace(/\D/g, '').slice(0, 10); // Remove non-numeric characters and limit to 10 digits
//                             setmobileNo(formattedMobile);
//                           }}
//                           required
//                         />
//                         <div style={{ color: 'red' }} className="error-message">{formErrors.mobile}</div>
//                       </FormGroup>
//                     </Col>
//                     <Col md={4}>
//                       <FormGroup>
//                         <Label className="forlabel" for="status">
//                           Status
//                         </Label>
//                         <Input
//                           type="select"
//                           name="status"
//                           id="status"
//                           value={status}
//                           required
//                           //  onChange={handleChange}
//                           onChange={(e) => setStatus(e.target.value)}
//                         >
//                           <option value="A">Active</option>
//                           <option value="I">Inactive</option>
//                         </Input>
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                   <Row>

//                     <Col md={4}>
//                       <FormGroup>
//                         <Label className="forlabel">Select Signature Image</Label>

//                         <Input type="file" name="filepath"
//                           id='file1'
//                           className="form-control"
//                           onChange={handleFileChange1}
//                           accept=".jpg, .jpeg, .png, "
//                         />
//                       </FormGroup>
//                       <div style={{ color: 'red' }} className="error-message">Upload images only (.jpg, .jpeg, .png) and ensure they are under 300 KB.</div>
//                       <div style={{ color: 'red' }} className="error-message">{formErrors.file1}</div>
//                     </Col>
//                   </Row>
//                 </Row >
//                 <div className="text-center mt-2">

//                   <Button
//                     type="button"
//                     className="allbutton"
//                     variant="outline-success"

//                     style={{ marginRight: 5 }}
//                     onClick={handleSubmit}
//                   // onClick={() => submitSingleCartingAgent(modalData.companyid, modalData.branchId, userId, otp, cratingAgentId, reprentativeId)}
//                   >  <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
//                     Submit
//                   </Button>



//                   <Button
//                     type="button"
//                     className="allbutton"
//                     variant="outline-danger"

//                     style={{ marginRight: 5 }}
//                     onClick={() => handleClear()}
//                   >  <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
//                     Refresh
//                   </Button>

//                 </div>

//               </CardBody>
//             </Card>
//           </Modal >


//           <Modal show={singleRepresentativeEditModel} onHide={closesingleRepresentativeEditModel} size="xl">


//             <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
//               <CardBody>
//                 <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
//                   icon={faUserPen}
//                   style={{
//                     marginRight: '8px',
//                     color: 'black', // Set the color to golden
//                   }}
//                 />Edit Party Representative</h5>


//                 <hr />
//                 <Row className="mt-3" style={{ marginLeft: '2vw' }}>

//                   <Row>
//                     <Col md={4} >
//                       <FormGroup>
//                         <Label className="forlabel" for="firstName">First Name</Label>

//                         <Input
//                           type="text"
//                           name="firstName"
//                           id="firstName"
//                           value={firstName}
//                           maxLength={15}
//                           //  onChange={handleChange}
//                           onChange={(e) => setfirstName(e.target.value)}
//                           required
//                         //  style={{ borderColor: errors.mobile ? '#f52b2b' : '' }}
//                         />



//                       </FormGroup>
//                       <div style={{ color: 'red' }} className="error-message">{formErrors.firstName}</div>
//                     </Col>

//                     <Col md={4}>
//                       <FormGroup>
//                         <Label className="forlabel" for="middleName">Middle Name</Label>

//                         <Input
//                           type="text"
//                           name="middleName"
//                           id="middleName"
//                           value={middleName}
//                           maxLength={15}
//                           //  onChange={handleChange}
//                           onChange={(e) => setmiddleName(e.target.value)}
//                           required
//                         // style={{ borderColor: errors.mobile ? '#f52b2b' : '' }}
//                         />

//                       </FormGroup>
//                       <div style={{ color: 'red' }} className="error-message">{formErrors.middleName}</div>
//                     </Col>
//                     <Col md={4}>

//                       <FormGroup>
//                         <Label className="forlabel" for="lastName">Last Name </Label>

//                         <Input
//                           type="text"
//                           name="lastName"
//                           id="lastName"
//                           value={lastName}
//                           maxLength={15}
//                           // onChange={handleChange}
//                           onChange={(e) => setlastName(e.target.value)}
//                           required
//                         // style={{ borderColor: errors.mobile ? '#f52b2b' : '' }}
//                         />

//                       </FormGroup>
//                       <div style={{ color: 'red' }} className="error-message">{formErrors.lastName}</div>
//                     </Col>
//                   </Row>
//                   <Row>

//                     <Col md={4}>
//                       <FormGroup>
//                         <Label className="forlabel">Select Representative Image</Label>

//                         <Input type="file" name="file"
//                         id='file'
//                           className="form-control"
//                           onChange={handleFileChange}
//                           accept=".jpg, .jpeg, .png, "
//                         />
//                       </FormGroup>
//                       <div style={{ color: 'red' }} className="error-message">{formErrors.file}</div>
//                       <div style={{ color: 'red' }} className="error-message">Upload images only (.jpg, .jpeg, .png) and ensure they are under 500 KB.</div>
                      
//                     </Col>
//                     <Col md={4}>

//                       <FormGroup>
//                         <Label className="forlabel" for="mobile">Mobile Number </Label>

//                         <Input
//                           type="text"
//                           name="mobile"
//                           id="mobile"
//                           value={mobile}
//                           maxLength={10}

//                           onChange={(e) => setmobileNo(e.target.value)}
//                           required

//                         />

//                       </FormGroup>
//                       <div style={{ color: 'red' }} className="error-message">{formErrors.mobile}</div>
//                     </Col>
//                     <Col md={4}>
//                       <FormGroup>
//                         <Label className="forlabel" for="status">
//                           Status
//                         </Label>
//                         <Input
//                           type="select"
//                           name="status"
//                           id="status"
//                           value={status}
//                           required
//                           //  onChange={handleChange}
//                           onChange={(e) => setStatus(e.target.value)}
//                         >
//                           <option value="A">Active</option>
//                           <option value="I">Inactive</option>
//                         </Input>
//                       </FormGroup>
//                     </Col>
//                   </Row>


//                   <Row>
//                   <Col md={4}>
//                       <FormGroup>
//                         <Label className="forlabel">Select Signature Image</Label>

//                         <Input type="file" name="file1"
//                           id='file1'
//                           className="form-control"
//                           onChange={handleFileChange1}
//                           accept=".jpg, .jpeg, .png, "
//                         />
//                       </FormGroup>
//                       <div style={{ color: 'red' }} className="error-message">{formErrors.file1}</div>
//                       <div style={{ color: 'red' }} className="error-message">Upload images only (.jpg, .jpeg, .png) and ensure they are under 300 KB.</div>
                     
//                     </Col>
//                     </Row>
//                 </Row >

//                 <Row className="mt-3" style={{ marginLeft: '2vw' }}>

//                   <Col md={3} >
//                     {representativeImage ? (
//                       <img
//                         src={representativeImage}
//                         alt="Santosh"
//                         className="image-column rounded-image"
//                       />
//                     ) : (
//                       <img src={SantoshImage} alt="Santosh" className="image-column rounded-image" />
//                     )}
//                   </Col>

//                   <Col md={3} >
//                     {representativeImage1 ? (
//                       <img
//                         src={representativeImage1}
//                         alt="Santosh"
//                         className="image-column rounded-image"
//                       />
//                     ) : (
//                       <img src={SantoshImage} alt="Santosh" className="image-column rounded-image" />
//                     )}
//                   </Col>
//                 </Row >
//                 <div className="text-center mt-2">

//                   <Button
//                     type="button"
//                     className="allbutton"
//                     variant="outline-success"

//                     style={{ marginRight: 5 }}
//                     onClick={handleUpdate}


//                   >  <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
//                     Update
//                   </Button>



//                   <Button
//                     type="button"
//                     className="allbutton"
//                     variant="outline-danger"

//                     style={{ marginRight: 5 }}
//                     onClick={() => handleBack()}
//                   >  <FontAwesomeIcon icon={faArrowAltCircleRight} style={{ marginRight: "5px" }} />
//                     Back
//                   </Button>

//                 </div>

//               </CardBody>
//             </Card>
//           </Modal >

//         </CardBody>
//       </Card>
//     </div>

//   )
// }



import { redirect } from 'react-router-dom';
import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import React, { useEffect, useState, useContext } from 'react';
import '../Components/Style.css';
import { Button, Modal } from 'react-bootstrap';
import Dashboard from '../Components/Dashboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Components/Style.css';
import { Card, CardBody, Col, Form, Input, FormGroup, Row, Table, Label } from 'reactstrap';
import DatePicker from "react-datepicker";
import { faArrowAltCircleRight, faBolt, faCheck, faEdit, faPager, faPlus, faRefresh, faSave, faSearch, faTrash, faUserAlt, faUserFriends, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FaCreativeCommons } from 'react-icons/fa';
import SantoshImage from "../services/contacts.png"
import ipaddress from "../Components/IpAddress";
import axios from "axios";
import { toast } from "react-toastify";

export default function Manage_Representative() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [singleRepresentativeModel, setsingleRepresentativeModel] = useState(false);
  const closesingleRepresentativeModel = () => { setsingleRepresentativeModel(false);handleClear(); handleSearch();}
  const [singleRepresentativeEditModel, setsingleRepresentativeEditModel] = useState(false);
  const closesingleRepresentativeEditModel = () => { setsingleRepresentativeEditModel(false);handleClear(); handleSearch();}
  const [representativeImage, setrepresentativeImage] = useState(null);
  const [representativeImage1, setrepresentativeImage1] = useState(null);
  const [s1, sets1] = useState('');
  const [s2, sets2] = useState('');
  const [mobile, setmobileNo] = useState('');
  const [firstName, setfirstName] = useState('');
  const [middleName, setmiddleName] = useState('');
  const [lastName, setlastName] = useState('');
  const [representativeID, setRepresentativeID] = useState('');
  const [status, setStatus] = useState("A");
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);


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

  console.log('logintypeid ', logintypeid);
  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {

      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);


  const initialState = {
    firstName: "",
    middleName: "",
    mobile: "",
    lastName: "",
    status: "",
    file: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddRepresentativeClick = (click) => {
    setFormData(initialState);
    setfirstName("");
    setlastName("");
    setmiddleName("");
    setmobileNo("");
    setStatus("");
    setFormErrors({
      sbRequestId: "",
      sbNo: "",
      sbDate: "",
      flightNo: "",
      flightDate: "",
      nameOfExporter: "",
      dgdcStatus: "",
    })
    setsingleRepresentativeModel(true);

  };

  const handleBack = (click) => {
    setFormData(initialState);
    setfirstName("");
    setlastName("");
    setmiddleName("");
    setmobileNo("");
    setStatus("");
    setsingleRepresentativeEditModel(false);

  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}represent/getAllRepresentParty/${companyid}/${branchId}/${logintypeid}`);
      const userList = response.data;


      // Fetch party images concurrently
      const imagePromises = userList.map(user => fetchPartyRepresentativeImage(user));
      const partyImages = await Promise.all(imagePromises);

      // Combine party data and images
      const combinedData = userList.map((user, index) => ({
        ...user,
        imageURL: partyImages[index], // Add imageURL to user object
      }));


      const filteredResults = combinedData.filter(user => {

        // const filteredResults = userList.filter(user => {
        const nameMatch =
          user.firstName.toLowerCase().includes(s1.toLowerCase()) ||
          user.middleName.toLowerCase().includes(s1.toLowerCase()) ||
          user.lastName.toLowerCase().includes(s1.toLowerCase());

        const mobileMatch = user.mobile.includes(s2);

        // Include user if there's a match in either name or mobile
        if (s1 && s2) {
          return nameMatch && mobileMatch; // Search by both name and mobile
        } else if (s1) {
          return nameMatch; // Search by name only
        } else if (s2) {
          return mobileMatch; // Search by mobile only
        }

        return true; // No search criteria, include all users
      });

      setSearchResults(filteredResults);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Error while searching:", error);
      toast.error("Error while searching!", "error");
    }
  };


  const handleRefresh = async () => {
    sets1("");
    sets2("");
    fetchPartiesData();
    try {
      const response = await axios.get(`http://${ipaddress}represent/getAllRepresentParty/${companyid}/${branchId}/${logintypeid}`);
      const userList = response.data;

      // Fetch party images concurrently
      const imagePromises = userList.map(user => fetchPartyRepresentativeImage(user));
      const partyImages = await Promise.all(imagePromises);

      // Combine party data and images
      const combinedData = userList.map((user, index) => ({
        ...user,
        imageURL: partyImages[index], // Add imageURL to user object
      }));









      setSearchResults(combinedData);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Error while searching:", error);
      toast.error("Error while searching!", "error");
    }
  }


  const maxSizeInBytes1 = 300 * 1024;
  
  const handleClear = () => {
    setFormData(initialState);
    setfirstName("");
    setlastName("");
    setmiddleName("");
    setmobileNo("");
    setStatus("");


    // Clear the file input by resetting its value
    
    // Also clear the state
    setFile(null);
    setFile1(null);

     setFormErrors({
      firstName: "",
      middleName: "",
      lastName: "",
      file: "",
      file1: "",
      mobile: "",
    })
    document.getElementById('firstName').classList.remove('error-border');
    document.getElementById('middleName').classList.remove('error-border');
    document.getElementById('lastName').classList.remove('error-border');
    document.getElementById('file').classList.remove('error-border');
    document.getElementById('file1').classList.remove('error-border');
    document.getElementById('mobile').classList.remove('error-border');

  }

  const fetchPartyRepresentativeImage = async (user) => {
    try {
      const response = await axios.get(`http://${ipaddress}represent/getImage1/${user.companyId}/${user.branchId}/${logintypeid}/${user.representativeId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch party image. Please try again.", error);
      throw error; // Rethrow the error for handling in the calling function
    }
  };

  const fetchPartiesData = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}represent/getAllRepresentParty/${companyid}/${branchId}/${logintypeid}`);
      const userList = response.data;

      // Fetch party images concurrently
      const imagePromises = userList.map(user => fetchPartyRepresentativeImage(user));
      const partyImages = await Promise.all(imagePromises);

      // Combine party data and images
      const combinedData = userList.map((user, index) => ({
        ...user,
        imageURL: partyImages[index], // Add imageURL to user object
      }));
      // setrepresentativeImage1(response.data);
      setUserList(combinedData);
      setSearchResults(combinedData);

    } catch (error) {
      console.error("Failed to fetch parties data. Please try again.", error);
    //  alert("Failed to fetch parties data. Please try again.");
    }
  };


  useEffect(() => {
    fetchPartiesData(); // Call the function when the component mounts
  }, [companyid, branchId,logintypeid]); // Add dependencies here

console.log('searchResults ',searchResults);
  // change function for update date
  const handleUpdate = () => {
    let fileSizeInBytes = 0;
    if(file){
      fileSizeInBytes = file.size;
    }
    const maxSizeInBytes = 500 * 1024;

    let fileSizeInBytes1 = 0;
    if(file1){
      fileSizeInBytes1 = file1.size;
    }
 

    setFormErrors({
      firstName: "",
      middleName: "",
      lastName: "",
      file: "",
      file1: "",
      mobile: "",
    })
    document.getElementById('firstName').classList.remove('error-border');
    document.getElementById('middleName').classList.remove('error-border');
    document.getElementById('lastName').classList.remove('error-border');
    document.getElementById('file').classList.remove('error-border');
    document.getElementById('file1').classList.remove('error-border');
    document.getElementById('mobile').classList.remove('error-border');

    const errors = {};

  

    if (!firstName) {
      errors.firstName = "First Name is required.";
    }

    if (!middleName) {
      errors.middleName = "Middle Name is required.";
    }

    if (!lastName) {
      errors.lastName = "Last Name is required.";
    }

    if (!mobile) {
      errors.mobile = "Mobile No is required.";
    }
    if(file){
      if(fileSizeInBytes>maxSizeInBytes){
        errors.file = "File size exceeds 500kb limit.";
      }
    }
   if(file1){
    if(fileSizeInBytes1>maxSizeInBytes1){
      errors.file1 = "File size exceeds 300kb limit.";
    }
   }
   


    if (!firstName) {
      document.getElementById('firstName').classList.add('error-border');
    }
    if (!middleName) {
      document.getElementById('middleName').classList.add('error-border');
    }
    if (!lastName) {
      document.getElementById('lastName').classList.add('error-border');
    }
    if (!mobile) {
      document.getElementById('mobile').classList.add('error-border');
    }
   if(file){
    if(fileSizeInBytes>maxSizeInBytes){
      document.getElementById('file').classList.add('error-border');
    }
   }
   if(file1){
    if(fileSizeInBytes1>maxSizeInBytes1){
      document.getElementById('file1').classList.add('error-border');
    }
   }
   
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

   
   

   


    if (file) {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('middleName', middleName);
      formData.append('lastName', lastName);
      formData.append('mobile', mobile);
      // formData.append('partyid', partyid);  
      formData.append('status', status);

      formData.append('file', file);
      if (file1) {
        formData.append('file1', file1);
      }

      try {
        axios
          .post(`http://${ipaddress}represent/updateRepresentative/${companyid}/${branchId}/${logintypeid}/${representativeID}`, formData)

          .then((response) => {
            // console.log("Party Representative data Updated successfully!");
            // console.log(response.data);

            // Assuming response.data is the updated form data, update formData state
            // setFormData(response.data);
            setsingleRepresentativeEditModel(false);
            toast.success("Form data sent successfully!", "success");
            fetchPartiesData();
            handleRefresh();
            setFile(null);
            setFile1(null);

          })
          .catch((error) => {
            console.error("Error while updating form data:", error);
            toast.error("Error while updating form data!", "error");
          });
      }
      catch (error) {
        // Handle errors
        console.error('Error:', error);
      }
    }

    else {
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('middleName', middleName);
      formData.append('lastName', lastName);
      formData.append('mobile', mobile);
      // formData.append('partyid', partyid);  
      formData.append('status', status);

      if (file1) {
        formData.append('file1', file1);
      }

      try {
        axios
          .post(`http://${ipaddress}represent/updateRepresentativewithoutFile/${companyid}/${branchId}/${logintypeid}/${representativeID}`, formData)

          .then((response) => {
            setFile(null);
            setFile1(null);
            console.log("Party Representative data Updated successfully!");
            console.log(response.data);

            // Assuming response.data is the updated form data, update formData state
            setFormData(response.data);

            toast.success("Form data sent successfully!", "success");
            fetchPartiesData();

          })
          .catch((error) => {
            console.error("Error while updating form data:", error);
            toast.error("Error while updating form data!", "error");
          });
      }
      catch (error) {
        // Handle errors
        console.error('Error:', error);
      }



    }


    fetchPartiesData(); // Call the function when the component mounts
  };


  const handleSubmit = () => {

    setFormErrors({
      firstName: "",
      middleName: "",
      lastName: "",
      file: "",
      file1: "",
      mobile: "",
    })
    document.getElementById('firstName').classList.remove('error-border');
    document.getElementById('middleName').classList.remove('error-border');
    document.getElementById('lastName').classList.remove('error-border');
    document.getElementById('file').classList.remove('error-border');
    document.getElementById('file1').classList.remove('error-border');
    document.getElementById('mobile').classList.remove('error-border');

    const errors = {};

    let fileSizeInBytes = 0;
    if(file){
      fileSizeInBytes = file.size;
    }
    const maxSizeInBytes = 500 * 1024;

    let fileSizeInBytes1 = 0;
    if(file1){
      fileSizeInBytes1 = file1.size;
    }

    const maxSizeInBytes1 = 300 * 1024;

    if (!firstName) {
      errors.firstName = "First Name is required.";
    }

    if (!middleName) {
      errors.middleName = "Middle Name is required.";
    }

    if (!lastName) {
      errors.lastName = "Last Name is required.";
    }

    if (!mobile) {
      errors.mobile = "Mobile No is required.";
    }

    if (!file) {
      errors.file = "Image file is required.";
    }
    else{
      if(fileSizeInBytes>maxSizeInBytes){
        errors.file = "File size exceeds 500kb limit.";
      }
    }

    if (!file1) {
      errors.file1 = "Signature is required.";
    }
    else{
      if(fileSizeInBytes1>maxSizeInBytes1){
        errors.file1 = "File size exceeds 300kb limit.";
      }
    }


    if (!firstName) {
      document.getElementById('firstName').classList.add('error-border');
    }
    if (!middleName) {
      document.getElementById('middleName').classList.add('error-border');
    }
    if (!lastName) {
      document.getElementById('lastName').classList.add('error-border');
    }
    if (!mobile) {
      document.getElementById('mobile').classList.add('error-border');
    }
    if (!file) {
      document.getElementById('file').classList.add('error-border');
    }
    else{
      if(fileSizeInBytes>maxSizeInBytes){
        document.getElementById('file').classList.add('error-border');
      }
    }
    if (!file1) {
      document.getElementById('file1').classList.add('error-border');
    }
    else{
      if(fileSizeInBytes1>maxSizeInBytes1){
        document.getElementById('file1').classList.add('error-border');
      }
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }


    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('middleName', middleName);
    formData.append('lastName', lastName);
    formData.append('mobile', mobile);
    // formData.append('partyid', partyid);
    formData.append('companyid', companyid);
    formData.append('branchId', branchId);
    formData.append('status', status);
    // 'file' should match your backend's parameter name
    formData.append('file', file);
    formData.append('file1', file1);


    console.log("Adding ");
    console.log(formData);

    try {
      axios
        .post(`http://${ipaddress}represent/addRepresentative/${companyid}/${branchId}/${logintypeid}`, formData)


        .then((response) => {

          setFile(null);
          setFile1(null);
          // console.log("Form data sent successfully!");
          // console.log(response.data);

          // Assuming response.data is the updated form data, update formData state
          setFormData(response.data);

          toast.success("Form data sent successfully!", "success");
          fetchPartiesData();
          setsingleRepresentativeModel(false);
        })
        .catch((error) => {
          console.error("Error while sending form data:", error);
          toast.error("Error while sending form data!", "error");
        });
    }
    catch (error) {
      // Handle errors
      console.error('Error:', error);
    }

    // fetchPartiesData();
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

  const handleFileChange1 = (e) => {
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
    setFile1(selectedFile);


  };













  const handleEdit = async (user) => {
    setSelectedUser(user);
    setsingleRepresentativeEditModel(true);
    setmobileNo(user.mobile);
    setfirstName(user.firstName);
    setmiddleName(user.middleName);
    setlastName(user.lastName);
    setStatus(user.userStatus);
    setRepresentativeID(user.representativeId);
    //setFile(user.file);
    console.log(user);


    try {
      const response = await axios.get(`http://${ipaddress}represent/getImage1/${user.companyId}/${user.branchId}/${logintypeid}/${user.representativeId}`);
      setrepresentativeImage(response.data);

    } catch (error) {
      console.error("Party Representative have no image. Please try again.", error);
    }

    try {
      const response = await axios.get(`http://${ipaddress}represent/getImage2/${user.companyId}/${user.branchId}/${logintypeid}/${user.representativeId}`);
      // Return the image URL or the whole response based on your API structure
      // return response.data.imageURL;
      console.log(response.data);
      setrepresentativeImage1(response.data);

    } catch (error) {
      console.error("Party Representative have no image. Please try again.", error);

    }



  };



  const handleDelete = async (user) => {
    console.log(user.representativeId);

    axios
      .delete(`http://${ipaddress}represent/deleteRepresentative/${user.companyId}/${user.branchId}/${user.userId}/${user.representativeId}`)
      .then((response) => {

        toast.error(`Party Representative deleted successfully!`, "success");
        fetchPartiesData();
      })
      .catch((error) => {
        console.error("Error while deleting user:", error);
        toast.error("Error while deleting user!", "error");
      });


    try {
      const response = await axios.get(`http://${ipaddress}represent/getAllRepresentParty/${companyid}/${branchId}/${logintypeid}`);
      const userList = response.data;

      // Fetch party images concurrently
      const imagePromises = userList.map(user => fetchPartyRepresentativeImage(user));
      const partyImages = await Promise.all(imagePromises);

      // Combine party data and images
      const combinedData = userList.map((user, index) => ({
        ...user,
        imageURL: partyImages[index], // Add imageURL to user object
      }));
      // setrepresentativeImage1(response.data);
      setUserList(combinedData);

    } catch (error) {
      console.error("Failed to fetch parties data. Please try again.", error);
     
    }


  };


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can adjust this as needed
  const totalPages = Math.ceil(userList.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedUsers = userList.slice(startIndex, endIndex);

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    file: "",
    file1: "",
    mobile: "",

  });

  return (

    <div className='container'>
      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
        icon={faPager}
        style={{
          marginRight: '8px',
          color: 'black', // Set the color to golden
        }}
      />  Manage Representative</h5>
      <Card>
        <CardBody>
          <Row className="justify-content-end">
            <Col md={10}></Col>
            <Col className="justify-content-end">
              <Button
                // outline color="success"
                variant="outline-success"
                onClick={(e) => handleAddRepresentativeClick()}
              > <FontAwesomeIcon icon={faUserAlt} style={{ marginRight: '5px' }} />
                Representative
              </Button>

            </Col>

          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <h6>Name</h6>
                <Input
                  type="text"
                  name="s1"
                  id="s1"
                  placeholder='Enter Name / Middle Name / Last Name for Search'
                  value={s1}
                  onChange={(e) => sets1(e.target.value)}

                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <h6> Mobile Number </h6>
                <Input
                  type="int"
                  name="s2"
                  id="s2"
                  placeholder='Enter Mobile Number to search'
                  value={s2}
                  onChange={(e) => sets2(e.target.value)}
                  maxLength={10}
                />

              </FormGroup>
            </Col >
            <Col style={{ marginTop: 26 }} md={4} >
              <Button variant="outline-primary" onClick={() => handleSearch()} style={{ marginRight: 5 }}>
                <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px', }} />
                Search
              </Button>
              <Button variant="outline-success" onClick={() => handleRefresh()}>
                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px', }} />
                Refresh
              </Button>
            </Col>


          </Row>

          <hr />

          <div className="table-responsive">
            <Table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#BADDDA' }} >First Name</th>
                  <th style={{ backgroundColor: '#BADDDA' }}>Middle Name</th>
                  <th style={{ backgroundColor: '#BADDDA' }}>Last Name</th>
                  <th style={{ backgroundColor: '#BADDDA' }}>Mobile Number</th>
                  <th style={{ backgroundColor: '#BADDDA' }}>Image</th>
                  <th style={{ backgroundColor: '#BADDDA' }}> Status</th>
                  <th style={{ backgroundColor: '#BADDDA' }} className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>

                {showSearchResults
                  ? searchResults.map((user) => (
                    <tr key={user.representativeId}>
                      <td>{user.firstName}</td>
                      <td>{user.middleName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.mobile}</td>



                      <td>
                        {user.imageURL ? (
                          <img
                            src={user.imageURL}
                            alt={`Representative ${user.name}`}
                            style={{ width: '50px', height: '50px' }}
                          />
                        ) : (
                          "No Image Available"
                        )}
                      </td>
                      {/* <td>{user.status}</td> */}

                      <td>
                        {user.userStatus === 'A' ? 'Active' : user.userStatus === 'I' ? 'Inactive' : 'Unknown'}
                      </td>
                      <td className="text-center d-grid gap-2 d-md-block ">
                        <Button
                          type="button"
                          variant="outline-primary"
                          onClick={() => handleEdit(user)}
                          style={{ marginRight: '5px', marginBottom: '12px' }}
                        >
                          <FontAwesomeIcon icon={faEdit} style={{ marginRight: 'px' }} />
                        </Button>
                        <Button
                          type="button"
                          variant="outline-danger"
                          onClick={() => handleDelete(user)}
                          style={{ marginRight: '5px', marginBottom: '12px' }}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ marginRight: 'px' }} />
                        </Button>
                      </td>
                    </tr>
                  ))
                  : displayedUsers.map((user) => (
                    <tr key={user.representativeId}>
                      <td>{user.firstName}</td>
                      <td>{user.middleName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.mobile}</td>


                      <td>
                        {user.imageURL ? (
                          <img
                            src={user.imageURL}
                            alt={`Representative ${user.name}`}
                            style={{ width: '50px', height: '50px' }}
                          />
                        ) : (
                          "No Image Available"
                        )}
                      </td>
                      {/* <td>{user.status}</td> */}
                      <td>
                        {user.userStatus === 'A' ? 'Active' : user.userStatus === 'I' ? 'Inactive' : 'Unknown'}
                      </td>
                      <td className="text-center d-grid gap-2 d-md-block ">
                        <Button
                          type="button"
                          variant="outline-primary"
                          onClick={() => handleEdit(user)}
                          style={{ marginRight: '5px', marginBottom: '12px' }}
                        >
                          <FontAwesomeIcon icon={faEdit} style={{ marginRight: 'px' }} />
                        </Button>
                        <Button
                          type="button"
                          variant="outline-danger"
                          onClick={() => handleDelete(user)}
                          style={{ marginRight: '5px', marginBottom: '12px' }}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ marginRight: 'px' }} />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <Pagination style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }).map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>


          <Modal show={singleRepresentativeModel} onHide={closesingleRepresentativeModel} size="xl">


            <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
              <CardBody>
                <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
                  icon={faUserFriends}
                  style={{
                    marginRight: '8px',
                    color: 'black', // Set the color to golden
                  }}
                />Add Party Representative</h5>


                <hr />
                <Row className="mt-3" style={{ marginLeft: '2vw' }}>

                  <Row>
                    <Col md={4} >
                      <FormGroup>
                        <Label className="forlabel" for="firstName">First Name</Label>

                        <Input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={firstName}

                          onChange={(e) => setfirstName(e.target.value)}
                          maxLength={15}
                          required

                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.firstName}</div>


                      </FormGroup>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label className="forlabel" for="middleName">Middle Name</Label>

                        <Input
                          type="text"
                          name="middleName"
                          id="middleName"
                          value={middleName}
                          maxLength={15}
                          //  onChange={handleChange}
                          onChange={(e) => setmiddleName(e.target.value)}
                          required
                        // style={{ borderColor: errors.mobile ? '#f52b2b' : '' }}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.middleName}</div>
                      </FormGroup>
                    </Col>
                    <Col md={4}>

                      <FormGroup>
                        <Label className="forlabel" for="lastName">Last Name </Label>

                        <Input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={lastName}
                          maxLength={15}
                          // onChange={handleChange}
                          onChange={(e) => setlastName(e.target.value)}
                          required
                        // style={{ borderColor: errors.mobile ? '#f52b2b' : '' }}
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.lastName}</div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>

                    <Col md={4}>
                      <FormGroup>
                        <Label className="forlabel">Select Representative Image</Label>

                        <Input type="file" name="filepath"
                          id='file'
                          className="form-control"
                          onChange={handleFileChange}
                          accept=".jpg, .jpeg, .png, "
                        />
                      </FormGroup>
                      <div style={{ color: 'red' }} className="error-message">{formErrors.file}</div>
                      <div style={{ color: 'red' }} className="error-message">Upload images only (.jpg, .jpeg, .png) and ensure they are under 500 KB.</div>
                      
                    </Col>
                    <Col md={4}>

                      <FormGroup>
                        <Label className="forlabel" for="mobile">Mobile Number </Label>

                        {/* <Input
                          type="number"
                          name="mobile"
                          id="mobile"
                          value={mobile}
                          maxLength={10}
                      
                          onChange={(e) => setmobileNo(e.target.value)}
                          required
                        
                        /> */}
                        <Input
                          type="tel"
                          name="mobile"
                          id="mobile"
                          value={mobile}
                          onChange={(e) => {
                            const formattedMobile = e.target.value.replace(/\D/g, '').slice(0, 10); // Remove non-numeric characters and limit to 10 digits
                            setmobileNo(formattedMobile);
                          }}
                          required
                        />
                        <div style={{ color: 'red' }} className="error-message">{formErrors.mobile}</div>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label className="forlabel" for="status">
                          Status
                        </Label>
                        <Input
                          type="select"
                          name="status"
                          id="status"
                          value={status}
                          required
                          //  onChange={handleChange}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="A">Active</option>
                          <option value="I">Inactive</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>

                    <Col md={4}>
                      <FormGroup>
                        <Label className="forlabel">Select Signature Image</Label>

                        <Input type="file" name="filepath"
                          id='file1'
                          className="form-control"
                          onChange={handleFileChange1}
                          accept=".jpg, .jpeg, .png, "
                        />
                      </FormGroup>
                      <div style={{ color: 'red' }} className="error-message">Upload images only (.jpg, .jpeg, .png) and ensure they are under 300 KB.</div>
                      <div style={{ color: 'red' }} className="error-message">{formErrors.file1}</div>
                    </Col>
                  </Row>
                </Row >
                <div className="text-center mt-2">

                  <Button
                    type="button"
                    className="allbutton"
                    variant="outline-success"

                    style={{ marginRight: 5 }}
                    onClick={handleSubmit}
                  // onClick={() => submitSingleCartingAgent(modalData.companyid, modalData.branchId, userId, otp, cratingAgentId, reprentativeId)}
                  >  <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                    Submit
                  </Button>



                  <Button
                    type="button"
                    className="allbutton"
                    variant="outline-danger"

                    style={{ marginRight: 5 }}
                    onClick={() => handleClear()}
                  >  <FontAwesomeIcon icon={faRefresh} style={{ marginRight: "5px" }} />
                    Refresh
                  </Button>

                </div>

              </CardBody>
            </Card>
          </Modal >


          <Modal show={singleRepresentativeEditModel} onHide={closesingleRepresentativeEditModel} size="xl">


            <Card style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
              <CardBody>
                <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
                  icon={faUserPen}
                  style={{
                    marginRight: '8px',
                    color: 'black', // Set the color to golden
                  }}
                />Edit Party Representative</h5>


                <hr />
                <Row className="mt-3" style={{ marginLeft: '2vw' }}>

                  <Row>
                    <Col md={4} >
                      <FormGroup>
                        <Label className="forlabel" for="firstName">First Name</Label>

                        <Input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={firstName}
                          maxLength={15}
                          //  onChange={handleChange}
                          onChange={(e) => setfirstName(e.target.value)}
                          required
                        //  style={{ borderColor: errors.mobile ? '#f52b2b' : '' }}
                        />



                      </FormGroup>
                      <div style={{ color: 'red' }} className="error-message">{formErrors.firstName}</div>
                    </Col>

                    <Col md={4}>
                      <FormGroup>
                        <Label className="forlabel" for="middleName">Middle Name</Label>

                        <Input
                          type="text"
                          name="middleName"
                          id="middleName"
                          value={middleName}
                          maxLength={15}
                          //  onChange={handleChange}
                          onChange={(e) => setmiddleName(e.target.value)}
                          required
                        // style={{ borderColor: errors.mobile ? '#f52b2b' : '' }}
                        />

                      </FormGroup>
                      <div style={{ color: 'red' }} className="error-message">{formErrors.middleName}</div>
                    </Col>
                    <Col md={4}>

                      <FormGroup>
                        <Label className="forlabel" for="lastName">Last Name </Label>

                        <Input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={lastName}
                          maxLength={15}
                          // onChange={handleChange}
                          onChange={(e) => setlastName(e.target.value)}
                          required
                        // style={{ borderColor: errors.mobile ? '#f52b2b' : '' }}
                        />

                      </FormGroup>
                      <div style={{ color: 'red' }} className="error-message">{formErrors.lastName}</div>
                    </Col>
                  </Row>
                  <Row>

                    <Col md={4}>
                      <FormGroup>
                        <Label className="forlabel">Select Representative Image</Label>

                        <Input type="file" name="file"
                        id='file'
                          className="form-control"
                          onChange={handleFileChange}
                          accept=".jpg, .jpeg, .png, "
                        />
                      </FormGroup>
                      <div style={{ color: 'red' }} className="error-message">{formErrors.file}</div>
                      <div style={{ color: 'red' }} className="error-message">Upload images only (.jpg, .jpeg, .png) and ensure they are under 500 KB.</div>
                      
                    </Col>
                    <Col md={4}>

                      <FormGroup>
                        <Label className="forlabel" for="mobile">Mobile Number </Label>

                        <Input
                          type="text"
                          name="mobile"
                          id="mobile"
                          value={mobile}
                          maxLength={10}

                          onChange={(e) => setmobileNo(e.target.value)}
                          required

                        />

                      </FormGroup>
                      <div style={{ color: 'red' }} className="error-message">{formErrors.mobile}</div>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label className="forlabel" for="status">
                          Status
                        </Label>
                        <Input
                          type="select"
                          name="status"
                          id="status"
                          value={status}
                          required
                          //  onChange={handleChange}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="A">Active</option>
                          <option value="I">Inactive</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>


                  <Row>
                  <Col md={4}>
                      <FormGroup>
                        <Label className="forlabel">Select Signature Image</Label>

                        <Input type="file" name="file1"
                          id='file1'
                          className="form-control"
                          onChange={handleFileChange1}
                          accept=".jpg, .jpeg, .png, "
                        />
                      </FormGroup>
                      <div style={{ color: 'red' }} className="error-message">{formErrors.file1}</div>
                      <div style={{ color: 'red' }} className="error-message">Upload images only (.jpg, .jpeg, .png) and ensure they are under 300 KB.</div>
                     
                    </Col>
                    </Row>
                </Row >

                <Row className="mt-3" style={{ marginLeft: '2vw' }}>

                  <Col md={3} >
                    {representativeImage ? (
                      <img
                        src={representativeImage}
                        alt="Santosh"
                        className="image-column rounded-image"
                      />
                    ) : (
                      <img src={SantoshImage} alt="Santosh" className="image-column rounded-image" />
                    )}
                  </Col>

                  <Col md={3} >
                    {representativeImage1 ? (
                      <img
                        src={representativeImage1}
                        alt="Santosh"
                        className="image-column rounded-image"
                      />
                    ) : (
                      <img src={SantoshImage} alt="Santosh" className="image-column rounded-image" />
                    )}
                  </Col>
                </Row >
                <div className="text-center mt-2">

                  <Button
                    type="button"
                    className="allbutton"
                    variant="outline-success"

                    style={{ marginRight: 5 }}
                    onClick={handleUpdate}


                  >  <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                    Update
                  </Button>



                  <Button
                    type="button"
                    className="allbutton"
                    variant="outline-danger"

                    style={{ marginRight: 5 }}
                    onClick={() => handleBack()}
                  >  <FontAwesomeIcon icon={faArrowAltCircleRight} style={{ marginRight: "5px" }} />
                    Back
                  </Button>

                </div>

              </CardBody>
            </Card>
          </Modal >

        </CardBody>
      </Card>
    </div>

  )
}
