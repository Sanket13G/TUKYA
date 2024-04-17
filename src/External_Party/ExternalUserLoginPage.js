// import React, { useContext, useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import ipaddress from "../Components/IpAddress";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import "../Components/Style.css";
// import AuthContext from "../Components/AuthProvider";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import CssBaseline from '@mui/material/CssBaseline';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Alert from "react-bootstrap/Alert";
// import { toast } from "react-toastify";
// import Swal from "sweetalert2";
// import Grid from '@mui/material/Grid';
// import { useParams } from 'react-router-dom';
// import { FormControl } from '@mui/material';
// import { param } from "jquery";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { faKey, faUserCircle } from "@fortawesome/free-solid-svg-icons";
// const defaultTheme = createTheme();
// const logoUrl = 'https://www.dgdcseepz.com/sites/all/themes/mmtcec/img/logo.png'; // Your logo URL

// export default function ExternalUserLoginPage() {
//     const { login } = useContext(AuthContext);
//     const location = useLocation();
//     const message = new URLSearchParams(location.search).get("message");
//     const message2 = new URLSearchParams(location.search).get("message2");
//     const [companyName, setCompanyName] = useState([]);
//     const [branchNames, setBranchNames] = useState([]);
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [branchid, setBranchId] = useState("");
//     const [companyId, setCompanyId] = useState("");
//     const [UserId1, setUserId1] = useState("");
//     const navigate = useNavigate();
//     const reactPageName = 'Login';
//     const [passwordMatch, setPasswordMatch] = useState(true);

//     //import fields 
//     const { encodedCompanyId, encodedBranchId, encodedUserId } = useParams();




//     // function which Decode the code 
//     const customDecode = (encodedValue) => {
//         const reverseCharacterMap = {
//             'X': 'C',
//             'Y': 'B',
//             'Z': 'M',
//         };

//         const reverseSymbolMap = {
//             '*': '0',
//             '@': '1',
//             '#': '2',
//             '&': '3',
//             '$': '4',
//             '%': '5',
//             '^': '6',
//             '!': '7',
//             '(': '8',
//             ')': '9',
//         };

//         const decodedValue = encodedValue
//             .replace(/[XYZ*@#&$%^!()]/g, (match) => reverseCharacterMap[match] || reverseSymbolMap[match]);

//         return decodedValue;
//     };

//     const DecodedCompanyId1 = customDecode(encodedCompanyId);
//     const DecodedBranchId1 = customDecode(encodedBranchId);
//     const DecodedPartyId1 = customDecode(encodedUserId);


//     //Decode incoming code here and then set it to url
//     useEffect(() => {
//         const DecodedCompanyId1 = customDecode(encodedCompanyId);
//         const DecodedBranchId1 = customDecode(encodedBranchId);
//         const DecodedPartyId1 = customDecode(encodedUserId);
//     }, []);




//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };




//     const handleSubmit = async (e) => {
//         e.preventDefault();


//         try {
//             const response = await axios.post(`http://${ipaddress}UserCreation/Update/${DecodedCompanyId1}/${DecodedBranchId1}/${encodedUserId}/${password}/update-password`

//                 , {
//                     username,
//                     password,
//                     branchid,
//                 }, {
//                 headers: {
//                     'React-Page-Name': 'Login'
//                 }
//             });

//             if (response.status === 200) {
//                 toast.success("Password Reset successful ", {
//                     position: "top-center",
//                 });
//                 // navigate(`/ExternalParty/Confirmation_Page/?DecodedCompanyId1=${DecodedCompanyId1}/?DecodedBranchId1=${DecodedBranchId1}/?encodedPartyId=${encodedPartyId}`);
//                 navigate(`/`);
//             } else {
//                 alert("Login unsuccessful");
//                 console.log("Login failed");
//                 toast.error("Login Unsuccessful 1!!!!", {
//                     position: "top-center",
//                 });
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             console.log("Login failed");
//             toast.error("Login Unsuccessful 2 !!!!", {
//                 position: "top-center",
//             });
//         }
//     };






//     document.addEventListener("DOMContentLoaded", function () {
//         const selectElement = document.getElementById("company");
//         if (selectElement) {
//             selectElement.addEventListener("change", handleCompanyIdChange);
//         }
//         function handleCompanyIdChange(event) {
//             const selectedCompanyId = event.target.value;
//             console.log('selectedCompanyId ', selectedCompanyId);
//         }
//     });


//     const [confirmPassword, setConfirmPassword] = useState('');
//     const doPasswordsMatch = () => {
//         return password === confirmPassword;
//     };

//     const isAnyInputEmpty = () => {
//         return password.trim() === '' || confirmPassword.trim() === '';
//     };
//     return (

//         <ThemeProvider theme={defaultTheme}>
//             <Grid container component="main" sx={{ height: '80vh' }}>
//                 <CssBaseline />
//                 <Grid
//                     item
//                     xs={false}
//                     sm={4}
//                     md={7}
//                     sx={{
//                         backgroundImage: 'url(https://wallpaperaccess.com/full/878615.jpg)',
//                         backgroundRepeat: 'no-repeat',
//                         backgroundColor: (t) =>
//                             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                         display: { xs: 'none', sm: 'block' }, // Show on small screens and above
//                     }}
//                 />


//                 <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/12/03/20/31/background-2995826_1280.png)', backgroundSize: 'cover' }}>
//                     <Box
//                         sx={{
//                             my: 8,
//                             mx: 4,
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'center',
//                         }}
//                     >
//                         {/* Add your logo image here */}
//                         <img
//                             src={logoUrl}
//                             alt="Logo"
//                             style={{
//                                 marginBottom: '18px',
//                                 maxWidth: '60%', // Set maximum width to 100% for responsiveness
//                                 height: 'auto',  // Allow the height to adjust proportionally
//                             }}
//                         />

//                         <FormControl sx={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '80%' }}>




//                             <div className="  card-body">
//                                 <div className="row">




//                                     <div className="col padright">
//                                         <div className="container mt">
//                                             {message && (
//                                                 <Alert className="alertwidth" key="danger" variant="danger">
//                                                     {message}
//                                                 </Alert>
//                                             )}

//                                             {message2 && (
//                                                 <Alert className="alertwidth" key="success" variant="success">
//                                                     {message2}
//                                                 </Alert>
//                                             )}

//                                             <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font' }} >Set Your Password Below</h5>



//                                             <form onSubmit={handleSubmit}>
//                                                 <Form.Group className="mb-1" controlId="password">
//                                                     <Form.Label className="fs1">Password</Form.Label>
//                                                     <Form.Control

//                                                         type="password"
//                                                         value={password}
//                                                         onChange={(e) => setPassword(e.target.value)}
//                                                         required
//                                                         placeholder="Enter Password"
//                                                     />
//                                                 </Form.Group>



                                                // <Form.Group className="mb-3" controlId="formBasicPassword">
                                                //     <Form.Label className="fs1">Confirm Password</Form.Label>
                                                //     <Form.Control

                                                //         value={confirmPassword}
                                                //         type="password"
                                                //         onChange={(e) => setConfirmPassword(e.target.value)}
                                                //         required
                                                //         placeholder="Confirm Password"
                                                //         style={{
                                                //             border: doPasswordsMatch() ? '2px solid green' : '2px solid red',
                                                //         }}
                                                //     />
                                                // </Form.Group>
//                                                 <br />
//                                                 <div className="mb-10 text-center " >
//                                                     <Button

//                                                         variant="primary"
//                                                         type="submit"
//                                                         disabled={!doPasswordsMatch() || isAnyInputEmpty()}
//                                                     > <FontAwesomeIcon icon={faKey} style={{ marginRight: "5px" }} />
//                                                         Reset Password
//                                                     </Button>
//                                                 </div>
//                                                 <br />
//                                                 <br />
//                                                 <br />


//                                             </form>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                         </FormControl>
//                     </Box>
//                 </Grid>
//             </Grid>
//         </ThemeProvider>


//     );
// }














import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ipaddress from "../Components/IpAddress";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Components/Style.css";
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Alert from "react-bootstrap/Alert";
import { toast } from "react-toastify";
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { faKey, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const defaultTheme = createTheme();
const logoUrl = 'https://www.dgdcseepz.com/sites/all/themes/mmtcec/img/logo.png'; // Your logo URL

export default function ExternalUserLoginPage() {
    const { login } = useContext(AuthContext);
    const location = useLocation();
    const [branchid, setBranchId] = useState("");
    const message = new URLSearchParams(location.search).get("message");
    const message2 = new URLSearchParams(location.search).get("message2");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

 //import fields 
 const { encodedCompanyId, encodedBranchId, encodedUserId } = useParams();




 // function which Decode the code 
 const customDecode = (encodedValue) => {
     const reverseCharacterMap = {
         'X': 'C',
         'Y': 'B',
         'Z': 'M',
     };

     const reverseSymbolMap = {
         '*': '0',
         '@': '1',
         '#': '2',
         '&': '3',
         '$': '4',
         '5': '5',
         '^': '6',
         '!': '7',
         '(': '8',
         ')': '9',
     };

     const decodedValue = encodedValue
         .replace(/[XYZ*@#&$%^!()]/g, (match) => reverseCharacterMap[match] || reverseSymbolMap[match]);

     return decodedValue;
 };

 const DecodedCompanyId1 = customDecode(encodedCompanyId);
 const DecodedBranchId1 = customDecode(encodedBranchId);
 const DecodedPartyId1 = customDecode(encodedUserId);


 //Decode incoming code here and then set it to url
 useEffect(() => {
     const DecodedCompanyId1 = customDecode(encodedCompanyId);
     const DecodedBranchId1 = customDecode(encodedBranchId);
     const DecodedPartyId1 = customDecode(encodedUserId);
 }, []);


    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Password validation logic
        const isValidPassword = validatePassword(newPassword);

        // Update state to indicate whether the password is valid
        setPasswordMatch(isValidPassword);

        // Update the password error message
        setPasswordError(isValidPassword ? '' : 'Password must have at least 8 characters, including uppercase, lowercase, and special characters.');
    };

    const validatePassword = (password) => {
        // Password validation rules
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return (
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasSpecialChar
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Other existing code...

        try {
            const response = await axios.post(`http://${ipaddress}UserCreation/Update/${DecodedCompanyId1}/${DecodedBranchId1}/${encodedUserId}/${password}/update-password`,
                {
                    username,
                    password,
                    branchid,
                }, {
                    headers: {
                        'React-Page-Name': 'Login'
                    }
                });

                if (response.status === 200) {
                    toast.success("Password Reset successful ", {
                        position: "top-center",
                    });
                    // navigate(`/ExternalParty/Confirmation_Page/?DecodedCompanyId1=${DecodedCompanyId1}/?DecodedBranchId1=${DecodedBranchId1}/?encodedPartyId=${encodedPartyId}`);
                    navigate(`/`);
                } else {
                    alert("Login unsuccessful");
                    console.log("Login failed");
                    toast.error("Login Unsuccessful 1!!!!", {
                        position: "top-center",
                    });
                }

        } catch (error) {
            console.error("Login error:", error);
            console.log("Login failed");
            toast.error("Login Unsuccessful 2 !!!!", {
                position: "top-center",
            });
        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        const selectElement = document.getElementById("company");
        if (selectElement) {
            selectElement.addEventListener("change", handleCompanyIdChange);
        }
        function handleCompanyIdChange(event) {
            const selectedCompanyId = event.target.value;
            console.log('selectedCompanyId ', selectedCompanyId);
        }
    });


    const [confirmPassword, setConfirmPassword] = useState('');
    const doPasswordsMatch = () => {
        return password === confirmPassword;
    };

    const isAnyInputEmpty = () => {
        return password.trim() === '' || confirmPassword.trim() === '';
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
                        <img
                            src={logoUrl}
                            alt="Logo"
                            style={{
                                marginBottom: '18px',
                                maxWidth: '60%',
                                height: 'auto',
                            }}
                        />

                        <FormControl sx={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '80%' }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col padright">
                                        <div className="container mt">
                                            {message && (
                                                <Alert className="alertwidth" key="danger" variant="danger">
                                                    {message}
                                                </Alert>
                                            )}
                                            {message2 && (
                                                <Alert className="alertwidth" key="success" variant="success">
                                                    {message2}
                                                </Alert>
                                            )}
                                            <h5 className="pageHead text-center" style={{ fontFamily: 'Your-Heading-Font' }} >Set Your Password Below</h5>
                                            <form onSubmit={handleSubmit}>
                                                <Form.Group className="mb-1" controlId="password">
                                                    <Form.Label className="fs1">Password</Form.Label>
                                                    <Form.Control
                                                        type="password"
                                                        value={password}
                                                        onChange={handlePasswordChange}
                                                        required
                                                        placeholder="Enter Password"
                                                    />
                                                    {passwordError && <div className="text-danger">{passwordError}</div>}
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                    <Form.Label className="fs1">Confirm Password</Form.Label>
                                                    <Form.Control

                                                        value={confirmPassword}
                                                        type="password"
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        required
                                                        placeholder="Confirm Password"
                                                        style={{
                                                            border: doPasswordsMatch() ? '2px solid green' : '2px solid red',
                                                        }}
                                                    />
                                                </Form.Group>

                                                <br />
                                                <div className="mb-10 text-center " >
                                                    <Button

                                                        variant="primary"
                                                        type="submit"
                                                        disabled={!doPasswordsMatch() || isAnyInputEmpty()}
                                                    > <FontAwesomeIcon icon={faKey} style={{ marginRight: "5px" }} />
                                                        Reset Password
                                                    </Button>
                                                </div>
                                                <br />
                                                <br />
                                                <br />
                                            </form>
                                            {/* ... (other existing code) */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
