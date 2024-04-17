// // import React, { useContext, useEffect, useRef, useState } from "react";
// // import ipaddress from "./IpAddress";
// // import "../Components/Style.css";
// // import air from "../Images/plane2.jpg";
// // import AuthContext from "./AuthProvider";
// // import { useNavigate } from "react-router-dom";
// // import Avatar from '@mui/material/Avatar';
// // import { Button, Modal } from 'react-bootstrap';
// // import CssBaseline from '@mui/material/CssBaseline';
// // import Paper from '@mui/material/Paper';
// // import { Card, CardBody, Row, Col } from "reactstrap";
// // import Box from '@mui/material/Box';
// // import Grid from '@mui/material/Grid';
// // import { toast } from 'react-toastify';
// // import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// // import Typography from '@mui/material/Typography';
// // import LockOpenIcon from '@mui/icons-material/LockOpen';
// // import IconButton from '@mui/material/IconButton';
// // import { createTheme, ThemeProvider } from '@mui/material/styles';
// // import { Alert, Form } from "react-bootstrap"; // Assuming you're using react-bootstrap
// // import axios from "axios";
// // import Swal from "sweetalert2";
// // import { useLocation } from "react-router-dom";
// // import { FormControl } from '@mui/material';
// // import SendIcon from '@mui/icons-material/Send';

// // const defaultTheme = createTheme();
// // const logoUrl = 'https://www.dgdcseepz.com/sites/all/themes/mmtcec/img/logo.png'; // Your logo URL

// // export default function Login2() {
// //   const { login } = useContext(AuthContext);
// //   const location = useLocation();
// //   const message = new URLSearchParams(location.search).get("message");
// //   const message2 = new URLSearchParams(location.search).get("message2");
// //   const [companyName, setCompanyName] = useState([]);
// //   const [branchNames, setBranchNames] = useState([]);
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [branchid, setBranchId] = useState("");
// //   const [companyId, setCompanyId] = useState("");
// //   const navigate = useNavigate();
// //   const reactPageName = 'Login';


// //   const [errors, setErrors] = useState({});


// //   useEffect(() => {
// //     axios
// //       .get(`http://${ipaddress}user/company`, {
// //         headers: {
// //           'React-Page-Name': reactPageName
// //         }
// //       })
// //       .then((response) => {
// //         setCompanyName(response.data);
// //         // console.log(response);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching parent menus:", error);
// //       });
// //   }, []);

// //   useEffect(() => {
// //     axios
// //       .get(`http://${ipaddress}user/branch`, {
// //         headers: {
// //           'React-Page-Name': 'Login'
// //         }
// //       })
// //       .then((response) => {
// //         setBranchNames(response.data);
// //         // console.log(response);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching branch names:", error);
// //       });
// //   }, []);

// //   const handleUsernameChange = (e) => {
// //     setUsername(e.target.value);
// //   };

// //   const handlePasswordChange = (e) => {
// //     setPassword(e.target.value);
// //   };

// //   const [otp, setOTP] = useState('');

// //   const handleOTPChange = (event) => {

// //     setErrors((prevErrors) => {
// //       // Remove the 'otp' error when OTP is entered
// //       const newErrors = { ...prevErrors };
// //       delete newErrors['otp'];
// //       return newErrors;
// //   });

// //     setOTP(event.target.value);
// //   };





// //   const handleCompanyIdChange = (e) => {
// //     setCompanyId(e.target.value);
// //   };

// //   const handleBranchChange = (e) => {

// //     setErrors((prevErrors) => {
// //       // Remove the 'branch' error when the branch is selected
// //       const newErrors = { ...prevErrors };
// //       delete newErrors['branch'];
// //       return newErrors;
// //   });


// //     setBranchId(e.target.value);
// //   };


// //   const handleResetPassword = () =>
// //   {
// //     // alert("Going to Forgot Password !!!!");
// //     navigate(`/forgot-password`, { state: { compId: companyId, branchId: branchid} });
  
// //   } ;




// //   const handleSubmit = async (e) => {

// //     const newErrors = {};

// //     if (!branchid) {
// //       newErrors['branch'] = 'Please Select Branch';
// //   }
  
// //   if (!otp) {
// //       newErrors['otp'] = 'Please Enter OTP';
// //   }
  
// //   setErrors(newErrors);  
// //   // Check if there are any errors
// //   if (Object.keys(newErrors).length > 0) {
// //       return;
// //   }
// //     e.preventDefault();
    

// //     try {
// //       const response = await axios.post(`http://${ipaddress}auth/login/${otp}`, {
// //         username,
// //         password,
// //         branchid,
// //       }, {
// //         headers: {
// //           'React-Page-Name': 'Login'
// //         }
// //       });

// //       if (response.status === 400) {
// //         toast.error("Please enter correct otp", {
// //           autoClose: 700
// //         })
// //       }

// //       if (response.status === 200) {
// //         const { jwtToken, userId, username, branchId, companyid, role, companyname, branchname, logintype, logintypeid, userType } = response.data;

// //         // Store all fields in sessionStorage using the AuthProvider
// //         login(jwtToken, userId, username, branchId, companyid, role, companyname, branchname,logintype, logintypeid, userType);
// //         // alert('Login successful');
// //         toast.success(`Login successful`, {
// //           position: toast.POSITION.TOP_CENTER,
// //           autoClose: 600,
// //         });
// //         if (response.data.logintype === 'Carting Agent' || response.data.logintype === 'Party' || response.data.logintype === 'CHA' || response.data.logintype === 'Console') {
// //           navigate("/parent/export");
// //         } else {
// //           navigate("/parent/dashboard");
// //         }
// //       } else {
// //         alert("Login unsuccessful");
// //         console.log("Login failed");
// //         toast.error("Login Unsuccessful !!!!", {
// //           position: "top-center",
// //         });
// //       }
// //     } catch (error) {
// //       //  alert("Login unsuccessful");
// //       console.error("Login error:", error);
// //       console.log("Login failed");
// //       toast.error("Login Unsuccessful !!!!", {
// //         position: "top-center",
// //       });
// //     }
// //   };

// //   // const handleCompanyIdChange = (e) => {
// //   //   setCompanyId(e.target.value);
// //   // };

// //   // console.log('handleCompanyIdChange ',companyId);

// //   document.addEventListener("DOMContentLoaded", function () {
// //     const selectElement = document.getElementById("company");

// //     if (selectElement) {
// //       selectElement.addEventListener("change", handleCompanyIdChange);
// //     }
// //     function handleCompanyIdChange(event) {
// //       const selectedCompanyId = event.target.value;
// //       // Do something with the selectedCompanyId
// //       console.log('selectedCompanyId ', selectedCompanyId);
// //     }
// //   });


// //   const getOneParty = () => {
// //     axios
// //       .get(`http://${ipaddress}auth/number/${branchid}/${username}`)
// //       .then((response) => {
// //         console.log("Representttt ", response.data);
// //         //  setAllCHARepresentative(response.data); // Store the list in the state
// //       })
// //       .catch((error) => {
// //         console.error("GET list error:", error);
// //       });
// //   };

// //   return (
// //     <ThemeProvider theme={defaultTheme}>
// //       <Grid container component="main" sx={{ height: '80vh' }}>
// //         <CssBaseline />
// //         <Grid
// //           item
// //           xs={false}
// //           sm={4}
// //           md={7}
// //           sx={{
// //             backgroundImage: 'url(https://wallpaperaccess.com/full/878615.jpg)',
// //             backgroundRepeat: 'no-repeat',
// //             backgroundColor: (t) =>
// //               t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
// //             backgroundSize: 'cover',
// //             backgroundPosition: 'center',
// //             display: { xs: 'none', sm: 'block' }, // Show on small screens and above
// //           }}
// //         />


// //         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/12/03/20/31/background-2995826_1280.png)', backgroundSize: 'cover' }}>
// //           <Box
// //             sx={{
// //               my: 8,
// //               mx: 4,
// //               display: 'flex',
// //               flexDirection: 'column',
// //               alignItems: 'center',
// //             }}
// //           >
// //             {/* Add your logo image here */}
// //             <img
// //               src={logoUrl}
// //               alt="Logo"
// //               style={{
// //                 marginBottom: '18px',
// //                 maxWidth: '60%', // Set maximum width to 100% for responsiveness
// //                 height: 'auto',  // Allow the height to adjust proportionally
// //               }}
// //             />

// //             <FormControl sx={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '80%' }}>

              
// //                 <Form.Group className="mb-1 mt-1" controlId="company">
// //                   <Form.Label className="fs1">Company Name  </Form.Label>
// //                   <Form.Select
// //                     required
// //                     value={companyId}
// //                     onChange={handleCompanyIdChange}
// //                     className="dw"
// //                   >
// //                     {/* <option value="">Select Company</option> */}
// //                     {companyName.map((cm) => (
// //                       <option key={cm.company_Id} value={cm.company_Id}>
// //                         {cm.company_name}
// //                       </option>
// //                     ))}
// //                   </Form.Select>

// //                 </Form.Group>

// //                 <Form.Group className="mb-1" controlId="branch">
// //                   <Form.Label className="fs1">Branch Name</Form.Label>
// //                   <Form.Select
// //                     required
// //                     value={branchid}
// //                     onChange={handleBranchChange}
// //                     className="dw"
// //                     style={{ height: '40px', borderColor: errors.branch ? '#f52b2b' : '' }}
// //                   >
// //                     <option value="">Select Branch</option>
// //                     {branchNames.map((branch) => (
// //                       <option key={branch.id.branchId} value={branch.id.branchId}>
// //                         {branch.branchName}
// //                       </option>
// //                     ))}
// //                   </Form.Select>
// //                   {/* {errors.branch && (
// //                                     <div className="error-message">
// //                                         {errors.branch}
// //                                     </div>
// //                   )} */}
// //                 </Form.Group>

// //                 <Form.Group className="mb-1" controlId="user">
// //                   <Form.Label className="fs1">Username</Form.Label>
// //                   <Form.Control
// //                     type="text"
// //                     margin="normal"

// //                     id="user"
// //                     label="User"
// //                     value={username}
// //                     onChange={handleUsernameChange}
// //                     required
// //                     placeholder="Enter username"
// //                     name="user"
// //                     autoComplete="user"
// //                     autoFocus
// //                   />
// //                 </Form.Group>

// //                 <Form.Group className="mb-1" controlId="password">
// //                   <Form.Label className="fs1">Password</Form.Label>
// //                   <Form.Control

// //                     value={password}
// //                     type="password"
// //                     onChange={handlePasswordChange}
// //                     required
// //                     placeholder="Enter Password"
// //                   />
// //                 </Form.Group>





// //                 <Row noGutters>
// //                   <Col xs={8}> {/* Adjust the column size according to your layout */}
// //                     <Form.Group className="mb-1" controlId="otp">
// //                       <Form.Label className="fs1">OTP</Form.Label>
// //                       <Form.Control
// //                         value={otp}
// //                         type="otp"
// //                         onChange={handleOTPChange}
// //                         required
// //                         placeholder="Enter OTP"
// //                         style={{ height: '40px', borderColor: errors.otp ? '#f52b2b' : '' }}
// //                       />
// //                       {/* {errors.otp && (
// //                                     <div className="error-message">
// //                                         {errors.otp}
// //                                     </div>
// //                                 )} */}
// //                     </Form.Group>
// //                   </Col>
// //                   <Col xs={4}> {/* Adjust the column size according to your layout */}
// //                     <Button
// //                       type="submit"
// //                       fullWidth
// //                       style={{ marginTop: '1.7vw' ,marginLeft:'0.3vw'}}
// //                       variant="outline-primary"
// //                       startIcon={<SendIcon />}
// //                       onClick={getOneParty}
// //                       tabIndex={2}
// //                     >
// //                       Generate OTP
// //                     </Button>
// //                   </Col>
// //                 </Row>


// //                 <div className="text-center mt-3" >

// //                   <Button
// //                     type="submit"
// //                     fullWidth
// //                     style={{ marginRight: '10px' }}
// //                     variant="outline-primary"
// //                     onClick={handleSubmit}
                    
// //                   >
// //                     <span>Login</span>
// //                     <LockOpenIcon sx={{ paddingLeft: '5px' }} />
// //                   </Button>

// //                   <Button
// //                   type="submit"
// //                   fullWidth
// //                   style={{ marginRight: '10px' }}
// //                   variant="outline-primary"
// //                   onClick={handleResetPassword}
// //                 >
// //                   <span>Forgot Password</span>
// //                   <LockOpenIcon sx={{ paddingLeft: '5px' }} />
// //                 </Button>


// //                 </div>
              
// //             </FormControl>
// //           </Box>
// //         </Grid>
// //       </Grid>
// //     </ThemeProvider>
// //   );
// // }



// import React, { useContext, useEffect, useRef, useState } from "react";
// import ipaddress from "./IpAddress";
// import "../Components/Style.css";
// import air from "../Images/plane2.jpg";
// import AuthContext from "./AuthProvider";
// import { useNavigate } from "react-router-dom";
// import Avatar from '@mui/material/Avatar';
// import { Button, Modal } from 'react-bootstrap';
// import CssBaseline from '@mui/material/CssBaseline';
// import Paper from '@mui/material/Paper';
// import { Card, CardBody, Row, Col } from "reactstrap";
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import { toast } from 'react-toastify';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import IconButton from '@mui/material/IconButton';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Alert, Form } from "react-bootstrap"; // Assuming you're using react-bootstrap
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useLocation } from "react-router-dom";
// import { FormControl } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';

// const defaultTheme = createTheme();
// const logoUrl = 'https://www.dgdcseepz.com/sites/all/themes/mmtcec/img/logo.png'; // Your logo URL

// export default function Login2() {
//   const { login } = useContext(AuthContext);
//   const location = useLocation();
//   const message = new URLSearchParams(location.search).get("message");
//   const message2 = new URLSearchParams(location.search).get("message2");
//   const [companyName, setCompanyName] = useState([]);
//   const [branchNames, setBranchNames] = useState([]);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [branchid, setBranchId] = useState("");
//   const [companyId, setCompanyId] = useState("");
//   const navigate = useNavigate();
//   const reactPageName = 'Login';


//   const [errors, setErrors] = useState({});


//   useEffect(() => {
//     axios
//       .get(`http://${ipaddress}user/company`, {
//         headers: {
//           'React-Page-Name': reactPageName
//         }
//       })
//       .then((response) => {
//         setCompanyName(response.data);
//         // console.log(response);
//       })
//       .catch((error) => {
//         console.error("Error fetching parent menus:", error);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get(`http://${ipaddress}user/branch`, {
//         headers: {
//           'React-Page-Name': 'Login'
//         }
//       })
//       .then((response) => {
//         setBranchNames(response.data);
//         // console.log(response);
//       })
//       .catch((error) => {
//         console.error("Error fetching branch names:", error);
//       });
//   }, []);

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const [otp, setOTP] = useState('');

//   const handleOTPChange = (event) => {

//     setErrors((prevErrors) => {
//       // Remove the 'otp' error when OTP is entered
//       const newErrors = { ...prevErrors };
//       delete newErrors['otp'];
//       return newErrors;
//     });

//     setOTP(event.target.value);
//   };





//   const handleCompanyIdChange = (e) => {
//     setCompanyId(e.target.value);
//   };

//   const handleBranchChange = (e) => {

//     setErrors((prevErrors) => {
//       // Remove the 'branch' error when the branch is selected
//       const newErrors = { ...prevErrors };
//       delete newErrors['branch'];
//       return newErrors;
//     });


//     setBranchId(e.target.value);
//   };


//   const handleResetPassword = () => {
//     // alert("Going to Forgot Password !!!!");
//     navigate(`/forgot-password`, { state: { compId: companyId, branchId: branchid } });

//   };




//   const handleSubmit = async (e) => {

//     const newErrors = {};

//     if (!branchid) {
//       newErrors['branch'] = 'Please Select Branch';
//     }

//     if (!otp) {
//       newErrors['otp'] = 'Please Enter OTP';
//     }

//     setErrors(newErrors);
//     // Check if there are any errors
//     if (Object.keys(newErrors).length > 0) {
//       return;
//     }
//     e.preventDefault();


//     try {
//       const response = await axios.post(`http://${ipaddress}auth/login/${otp}`, {
//         username,
//         password,
//         branchid,
//       }, {
//         headers: {
//           'React-Page-Name': 'Login'
//         }
//       });

//       if (response.status === 400) {
//         toast.error("Please enter correct otp", {
//           autoClose: 700
//         })
//       }

//       if (response.status === 200) {
//         const { jwtToken, userId, username, branchId, companyid, role, companyname, branchname, logintype, logintypeid, userType } = response.data;

//         // Store all fields in sessionStorage using the AuthProvider
//         login(jwtToken, userId, username, branchId, companyid, role, companyname, branchname, logintype, logintypeid, userType);
//         // alert('Login successful');
//         toast.success(`Login successful`, {
//           position: toast.POSITION.TOP_CENTER,
//           autoClose: 600,
//         });
//         if (response.data.logintype === 'Carting Agent' || response.data.logintype === 'Party' || response.data.logintype === 'CHA' || response.data.logintype === 'Console') {
//           navigate("/parent/export");
//         } else {
//           navigate("/parent/dashboard");
//         }
//       } else {
//         alert("Login unsuccessful");
//         console.log("Login failed");
//         toast.error("Login Unsuccessful !!!!", {
//           position: "top-center",
//         });
//       }
//     } catch (error) {
//       //  alert("Login unsuccessful");
//       console.error("Login error:", error);
//       console.log("Login failed");
//       toast.error("Login Unsuccessful !!!!", {
//         position: "top-center",
//       });
//     }
//   };

//   // const handleCompanyIdChange = (e) => {
//   //   setCompanyId(e.target.value);
//   // };

//   // console.log('handleCompanyIdChange ',companyId);

//   document.addEventListener("DOMContentLoaded", function () {
//     const selectElement = document.getElementById("company");

//     if (selectElement) {
//       selectElement.addEventListener("change", handleCompanyIdChange);
//     }
//     function handleCompanyIdChange(event) {
//       const selectedCompanyId = event.target.value;
//       // Do something with the selectedCompanyId
//       console.log('selectedCompanyId ', selectedCompanyId);
//     }
//   });


//   const getOneParty = async () => {
//     try {
//       const res = await axios.get(`http://${ipaddress}auth/number/${branchid}/${username}`);
//       // Check if server response indicates OTP sent successfully
//       if (res.data === "OTP sent successfully") {
//         toast.success("OTP sent successfully", {
//           position: toast.POSITION.TOP_CENTER,
//           autoClose: 2000,
//           style: { width: `28vw` },
//         });
//       } else {
//         toast.error(res.data, {
//           position: toast.POSITION.TOP_CENTER,
//           autoClose: 2000,
//           style: { width: `28vw` },
//         });
//       }
//     } catch (error) {
//       toast.error("An error occurred sending the OTP", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 2000,
//         style: { width: `28vw` },
//       });
//     }
//   };
//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid container component="main" sx={{ height: '80vh' }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundImage: 'url(https://wallpaperaccess.com/full/878615.jpg)',
//             backgroundRepeat: 'no-repeat',
//             backgroundColor: (t) =>
//               t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             display: { xs: 'none', sm: 'block' }, // Show on small screens and above
//           }}
//         />


//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/12/03/20/31/background-2995826_1280.png)', backgroundSize: 'cover' }}>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             {/* Add your logo image here */}
//             <img
//               src={logoUrl}
//               alt="Logo"
//               style={{
//                 marginBottom: '18px',
//                 maxWidth: '60%', // Set maximum width to 100% for responsiveness
//                 height: 'auto',  // Allow the height to adjust proportionally
//               }}
//             />

//             <FormControl sx={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '80%' }}>


//               <Form.Group className="mb-1 mt-1" controlId="company">
//                 <Form.Label className="fs1">Company Name  </Form.Label>
//                 <Form.Select
//                   required
//                   value={companyId}
//                   onChange={handleCompanyIdChange}
//                   className="dw"
//                 >
//                   {/* <option value="">Select Company</option> */}
//                   {companyName.map((cm) => (
//                     <option key={cm.company_Id} value={cm.company_Id}>
//                       {cm.company_name}
//                     </option>
//                   ))}
//                 </Form.Select>

//               </Form.Group>

//               <Form.Group className="mb-1" controlId="branch">
//                 <Form.Label className="fs1">Branch Name</Form.Label>
//                 <Form.Select
//                   required
//                   value={branchid}
//                   onChange={handleBranchChange}
//                   className="dw"
//                   style={{ height: '40px', borderColor: errors.branch ? '#f52b2b' : '' }}
//                 >
//                   <option value="">Select Branch</option>
//                   {branchNames.map((branch) => (
//                     <option key={branch.id.branchId} value={branch.id.branchId}>
//                       {branch.branchName}
//                     </option>
//                   ))}
//                 </Form.Select>
//                 {/* {errors.branch && (
//                                     <div className="error-message">
//                                         {errors.branch}
//                                     </div>
//                   )} */}
//               </Form.Group>

//               <Form.Group className="mb-1" controlId="user">
//                 <Form.Label className="fs1">Username</Form.Label>
//                 <Form.Control
//                   type="text"
//                   margin="normal"

//                   id="user"
//                   label="User"
//                   value={username}
//                   onChange={handleUsernameChange}
//                   required
//                   placeholder="Enter username"
//                   name="user"
//                   autoComplete="user"
//                   autoFocus
//                 />
//               </Form.Group>

//               <Form.Group className="mb-1" controlId="password">
//                 <Form.Label className="fs1">Password</Form.Label>
//                 <Form.Control

//                   value={password}
//                   type="password"
//                   onChange={handlePasswordChange}
//                   required
//                   placeholder="Enter Password"
//                 />
//               </Form.Group>





//               <Row noGutters>
//                 <Col xs={8}> {/* Adjust the column size according to your layout */}
//                   <Form.Group className="mb-1" controlId="otp">
//                     <Form.Label className="fs1">OTP</Form.Label>
//                     <Form.Control
//                       value={otp}
//                       type="otp"
//                       onChange={handleOTPChange}
//                       required
//                       placeholder="Enter OTP"
//                       style={{ height: '40px', borderColor: errors.otp ? '#f52b2b' : '' }}
//                     />
//                     {/* {errors.otp && (
//                                     <div className="error-message">
//                                         {errors.otp}
//                                     </div>
//                                 )} */}
//                   </Form.Group>
//                 </Col>
//                 <Col xs={4}> {/* Adjust the column size according to your layout */}
//                   <Button
//                     type="submit"
//                     fullWidth
//                     style={{ marginTop: '1.7vw', marginLeft: '0.3vw' }}
//                     variant="outline-primary"
//                     startIcon={<SendIcon />}
//                     onClick={getOneParty}
//                     tabIndex={2}
//                   >
//                     Generate OTP
//                   </Button>
//                 </Col>
//               </Row>


//               <div className="text-center mt-3" >

//                 <Button
//                   type="submit"
//                   fullWidth
//                   style={{ marginRight: '10px' }}
//                   variant="outline-primary"
//                   onClick={handleSubmit}

//                 >
//                   <span>Login</span>
//                   <LockOpenIcon sx={{ paddingLeft: '5px' }} />
//                 </Button>

//                 <Button
//                   type="submit"
//                   fullWidth
//                   style={{ marginRight: '10px' }}
//                   variant="outline-primary"
//                   onClick={handleResetPassword}
//                 >
//                   <span>Forgot Password</span>
//                   <LockOpenIcon sx={{ paddingLeft: '5px' }} />
//                 </Button>


//               </div>

//             </FormControl>
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// }

import React, { useContext, useEffect, useRef, useState } from "react";
import ipaddress from "./IpAddress";
import "../Components/Style.css";
import air from "../Images/plane2.jpg";
import AuthContext from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { Button, Modal } from 'react-bootstrap';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { Card, CardBody, Row, Col } from "reactstrap";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { toast } from 'react-toastify';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Form } from "react-bootstrap"; // Assuming you're using react-bootstrap
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { FormControl } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const defaultTheme = createTheme();
const logoUrl = 'https://www.dgdcseepz.com/sites/all/themes/mmtcec/img/logo.png'; // Your logo URL

export default function Login2() {
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const [companyName, setCompanyName] = useState([]);
  const [branchNames, setBranchNames] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [branchid, setBranchId] = useState("B00001");
  const [companyId, setCompanyId] = useState("");
  const navigate = useNavigate();
  const reactPageName = 'Login';


  const [errors, setErrors] = useState({});


  useEffect(() => {
    axios
      .get(`http://${ipaddress}user/company`, {
        headers: {
          'React-Page-Name': reactPageName
        }
      })
      .then((response) => {
        setCompanyName(response.data);
        // console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching parent menus:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://${ipaddress}user/branch`, {
        headers: {
          'React-Page-Name': 'Login'
        }
      })
      .then((response) => {
        setBranchNames(response.data);
        // console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching branch names:", error);
      });
  }, []);

  const handleUsernameChange = (e) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors['username'];
      return newErrors;
    });
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors['password'];
      return newErrors;
    });
    setPassword(e.target.value);
  };

  const [otp, setOTP] = useState('');

  const handleOTPChange = (event) => {

    setErrors((prevErrors) => {
      // Remove the 'otp' error when OTP is entered
      const newErrors = { ...prevErrors };
      delete newErrors['otp'];
      return newErrors;
    });

    setOTP(event.target.value);
  };





  const handleCompanyIdChange = (e) => {
    setCompanyId(e.target.value);
  };

  const handleBranchChange = (e) => {

    setErrors((prevErrors) => {
      // Remove the 'branch' error when the branch is selected
      const newErrors = { ...prevErrors };
      delete newErrors['branch'];
      return newErrors;
    });


    setBranchId(e.target.value);
  };


  const handleResetPassword = () => {
    // alert("Going to Forgot Password !!!!");
    navigate(`/forgot-password`, { state: { compId: companyId, branchId: branchid } });

  };




  const handleSubmit = async (e) => {

    const newErrors = {};

    if (!branchid) {
      newErrors['branch'] = 'Please Select Branch';
    }

    if (!otp) {
      newErrors['otp'] = 'Please Enter OTP';
    }
    if (!username) {
      newErrors['username'] = 'Please Enter Branch';
    }

    if (!password) {
      newErrors['password'] = 'Please Enter password';
    }

    setErrors(newErrors);
    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    e.preventDefault();


    try {
      const response = await axios.post(`http://${ipaddress}auth/login/${otp}`, {
        username,
        password,
        branchid,
      }, {
        headers: {
          'React-Page-Name': 'Login'
        }
      });

      if (response.status === 400) {
        toast.error("Please enter correct otp", {
          autoClose: 700
        })
      }

      if (response.status === 200) {
        const { jwtToken, userId, username, branchId, companyid, role, companyname, branchname, logintype, logintypeid, userType } = response.data;

        // Store all fields in sessionStorage using the AuthProvider
        login(jwtToken, userId, username, branchId, companyid, role, companyname, branchname, logintype, logintypeid, userType);
        // alert('Login successful');
        toast.success(`Login successful`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 600,
        });
        if (response.data.logintype === 'Carting Agent' || response.data.logintype === 'Party' || response.data.logintype === 'CHA' || response.data.logintype === 'Console') {
          navigate("/parent/export");
        } else {
          navigate("/parent/dashboard");
        }
      } else {
        alert("Login unsuccessful");
        console.log("Login failed");
        toast.error("Login Unsuccessful !!!!", {
          position: "top-center",
        });
      }
    } catch (error) {
      //  alert("Login unsuccessful");
      console.error("Login error:", error);
      console.log("Login failed");
      toast.error("Login Unsuccessful !!!!", {
        position: "top-center",
      });
    }
  };

  // const handleCompanyIdChange = (e) => {
  //   setCompanyId(e.target.value);
  // };

  // console.log('handleCompanyIdChange ',companyId);

  document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.getElementById("company");

    if (selectElement) {
      selectElement.addEventListener("change", handleCompanyIdChange);
    }
    function handleCompanyIdChange(event) {
      const selectedCompanyId = event.target.value;
      // Do something with the selectedCompanyId
      console.log('selectedCompanyId ', selectedCompanyId);
    }
  });


  const getOneParty = async () => {
    
    const newErrors = {};

    if (!branchid) {
      newErrors['branch'] = 'Please Select Branch';
    }

    if (!username) {
      newErrors['username'] = 'Please Enter Branch';
    }


    setErrors(newErrors);
    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const res = await axios.get(`http://${ipaddress}auth/number/${branchid}/${username}`);
      // Check if server response indicates OTP sent successfully
      if (res.data === "OTP sent successfully") {
        toast.success("OTP sent successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          style: { width: `28vw` },
        });
      } else {
        toast.error(res.data, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
          style: { width: `28vw` },
        });
      }
    } catch (error) {
      toast.error("An error occurred sending the OTP", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        style: { width: `28vw` },
      });
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '80vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://wallpaperaccess.com/full/878615.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', sm: 'block' }, // Show on small screens and above
          }}
        />


        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/12/03/20/31/background-2995826_1280.png)', backgroundSize: 'cover' }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Add your logo image here */}
            <img
              src={logoUrl}
              alt="Logo"
              style={{
                marginBottom: '18px',
                maxWidth: '60%', // Set maximum width to 100% for responsiveness
                height: 'auto',  // Allow the height to adjust proportionally
              }}
            />

            <FormControl sx={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '80%' }}>


              <Form.Group className="mb-1 mt-1" controlId="company">
                <Form.Label className="fs1">Company Name  </Form.Label>
                <Form.Select
                  required
                  value={companyId}
                  onChange={handleCompanyIdChange}
                  className="dw"
                >
                  {/* <option value="">Select Company</option> */}
                  {companyName.map((cm) => (
                    <option key={cm.company_Id} value={cm.company_Id}>
                      {cm.company_name}
                    </option>
                  ))}
                </Form.Select>

              </Form.Group>

              <Form.Group className="mb-1" controlId="branch">
                <Form.Label className="fs1">Branch Name</Form.Label>
                <Form.Select
                  required
                  value={branchid}
                  onChange={handleBranchChange}
                  className="dw"
                  style={{ height: '40px', borderColor: errors.branch ? '#f52b2b' : '' }}
                >
                  <option value="">Select Branch</option>
                  {branchNames.map((branch) => (
                    <option key={branch.id.branchId} value={branch.id.branchId}>
                      {branch.branchName}
                    </option>
                  ))}
                </Form.Select>
                {/* {errors.branch && (
                                    <div className="error-message">
                                        {errors.branch}
                                    </div>
                  )} */}
              </Form.Group>

              <Form.Group className="mb-1" controlId="user">
                <Form.Label className="fs1">Username</Form.Label>
                <Form.Control
                  type="text"
                  margin="normal"

                  id="user"
                  label="User"
                  value={username}
                  onChange={handleUsernameChange}
                  style={{ height: '40px', borderColor: errors.username ? '#f52b2b' : '' }}
                  required
                  placeholder="Enter username"
                  name="user"
                  autoComplete="user"
                  autoFocus
                />
              </Form.Group>

              <Form.Group className="mb-1" controlId="password">
                <Form.Label className="fs1">Password</Form.Label>
                <Form.Control

                  value={password}
                  type="password"
                  onChange={handlePasswordChange}
                  style={{ height: '40px', borderColor: errors.password ? '#f52b2b' : '' }}
                  required
                  placeholder="Enter Password"
                />
              </Form.Group>





              <Row noGutters>
                <Col xs={8}> {/* Adjust the column size according to your layout */}
                  <Form.Group className="mb-1" controlId="otp">
                    <Form.Label className="fs1">OTP</Form.Label>
                    <Form.Control
                      value={otp}
                      type="otp"
                      onChange={handleOTPChange}
                      required
                      placeholder="Enter OTP"
                      style={{ height: '40px', borderColor: errors.otp ? '#f52b2b' : '' }}
                    />
                    {/* {errors.otp && (
                                    <div className="error-message">
                                        {errors.otp}
                                    </div>
                                )} */}
                  </Form.Group>
                </Col>
                <Col xs={4}> {/* Adjust the column size according to your layout */}
                  <Button
                    type="submit"
                    fullWidth
                    style={{ marginTop: '1.7vw', marginLeft: '0.3vw' }}
                    variant="outline-primary"
                    startIcon={<SendIcon />}
                    onClick={getOneParty}
                    tabIndex={2}
                  >
                    Generate OTP
                  </Button>
                </Col>
              </Row>


              <div className="text-center mt-3" >

                <Button
                  type="submit"
                  fullWidth
                  style={{ marginRight: '10px' }}
                  variant="outline-primary"
                  onClick={handleSubmit}

                >
                  <span>Login</span>
                  <LockOpenIcon sx={{ paddingLeft: '5px' }} />
                </Button>

                <Button
                  type="submit"
                  fullWidth
                  style={{ marginRight: '10px' }}
                  variant="outline-primary"
                  onClick={handleResetPassword}
                >
                  <span>Forgot Password</span>
                  <LockOpenIcon sx={{ paddingLeft: '5px' }} />
                </Button>


              </div>

            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

