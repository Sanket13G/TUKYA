import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../Components/AuthProvider";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
import Select from 'react-select';
import { Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faClose, faKey, faPlaneCircleCheck, faPlaneUp, faRefresh, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import InviceService from "../services/InviceService";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import { FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const defaultTheme = createTheme();

// const defaultTheme = createTheme();
const logoUrl = 'https://www.dgdcseepz.com/sites/all/themes/mmtcec/img/logo.png';

function ForgotPassword() {

    const [companies, setCompanies] = useState([]);
    const [branches, setBranches] = useState([]);
    const [companyName, setCompanyName] = useState([]);
    const [branchNames, setBranchNames] = useState([]);
    const location = useLocation();
    const RecriveCompanyId = location.state?.companyId;
    const RecriveBranchId = location.state?.branchid;
    const reactPageName = 'Forgot-Password';
    const [branchid, setBranchId] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [userId, setUserId] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [enterOtp, setEnterOtp] = useState(false);



    const [password, setPassword] = useState('');
    const [confirmPassword2, setConfirmPassword2] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [backToLogin, setBackToLogin] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (confirmPassword2 !== '' && e.target.value !== confirmPassword2) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword2(e.target.value);
        if (password !== e.target.value) {
            setPasswordsMatch(false);
        } else {
            setPasswordsMatch(true);
        }
    };


    const handleSubmitPassword = () => {


        if (confirmPassword2.trim() === '' || password.trim() === '') {
            toast.error('Please Enter Password!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 800,
            });
            return;
        }





        if (passwordsMatch) {
            InviceService.updatePassword(companyId, branchid, userId, password)
                .then((res) => {
                    if (res.data === true) {

                        toast.success('Password updated successfully!', {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 800,
                        });
                        setBackToLogin(true);
                        // toast.success('Password updated successfully!');
                    } else {
                        // toast.error('Error updating password.');
                        toast.error('Error updating password!', {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 800,
                        });
                    }
                })
                .catch((error) => {
                    // Handle any API request error
                    toast.error('Error updating password!', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 800,
                    });
                    console.error('Error updating password:', error);
                });
        } else {
            toast.error('Entered Password and Confirm Password Should Be Same!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 800,
                toastId: 'customErrorToast', // Give a custom ID to refer to this toast
                style: {
                    width: 'auto', // Set width to 'auto' to allow the message to fit in one line
                    whiteSpace: 'nowrap', // Prevent the message from wrapping
                    maxWidth: '80%', // Set a maximum width to prevent it from getting too wide
                },
            });

            // toast.error('Enterd PAssword and Confirm Password Should BE Same.');
        }



    };


    const navigate = useNavigate();

    const handleBackToLogin = () => {
        navigate("/login");
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const companiesResponse = await InviceService.getAllCompanies(reactPageName);
                setCompanies(companiesResponse.data);

                if (RecriveCompanyId) {
                    const branchesResponse = await InviceService.getBranchesOfCompany(reactPageName);
                    setBranches(branchesResponse.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [reactPageName, RecriveCompanyId]);


    useEffect(() => {
        const handleDefaultCompany = async () => {
            if (companies.length === 1) {
                const selectedCompanyId = companies[0].company_Id;
                setCompanyId(selectedCompanyId);
                try {
                    const branchesResponse = await InviceService.getBranchesOfCompany(selectedCompanyId, reactPageName);
                    setBranches(branchesResponse.data);
                } catch (error) {
                    console.error('Error fetching branches:', error);
                }
            }
        };

        handleDefaultCompany(); // Call the function to set default company and fetch branches
    }, [companies]); // Run this effect when companies array changes


    useEffect(() => {
        if (branchid) {
            setErrors([]);
        }
    }, [branchid]);


    const handleChangeCompany = async (event) => {
        const selectedCompanyId = event.target.value;

        // console.log("selectedCompanyId " + event.target.value);
        setCompanyId(selectedCompanyId);

        if (selectedCompanyId) {
            try {
                const branchesResponse = await InviceService.getBranchesOfCompany(selectedCompanyId, reactPageName);
                setBranches(branchesResponse.data);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        } else {
            setBranches([]);
        }
    };


    const [errors, setErrors] = useState({});



    const handleChangeBranch = async (event) => {
        const selectedBranchId = event.target.value;

        // console.log("selected Branch " + event.target.value);
        setBranchId(selectedBranchId);
    };

    const handleChangeuserId = (event) => {

        const newErrors = {};

        if (!companyId) {
            newErrors['company'] = 'Please Select Company';
            setErrors(newErrors);
            return;
        }
        if (!branchid) {
            newErrors['branch'] = 'Please Select Branch';
            setErrors(newErrors);
            return;
        };

        setUserId(event.target.value);


        // console.log("USerId " + event.target.value);

        if (event.target.value.trim() !== '') {
            InviceService.getUserByUserId(companyId, branchid, event.target.value)
                .then((res) => {


                    if (res.data === null || res.data === '') {
                        setMobileNo('');
                    } else {
                        setMobileNo(res.data.mobile);
                    }
                })
                .catch((error) => {

                    console.error('Error fetching user data:', error);
                });
        } else {
            setMobileNo('');
        }

    };
    const HandleSendOtp = () => {
        const newErrors = {};
        if (!branchid) {
            newErrors['branch'] = 'Please Select Branch';
            setErrors(newErrors);
            return;
        };


        if (mobileNo !== null || mobileNo !== '')
            InviceService.sendOtpForgotPassword(companyId, branchid, userId, mobileNo)
                .then((res) => {
                    if (res.data === true) {
                        toast.success('Otp Sent Successfully', {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 800,
                        });
                        setEnterOtp(true);
                    } else {
                        toast.error('Error sending OTP. Please try again.', {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 800,
                        });
                    }
                })
                .catch((error) => {
                    // Handle errors from the API call
                    console.error('Error sending OTP:', error);
                    // Show an error toast message or perform error handling
                    toast.error('Error sending OTP. Please try again.', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 800,
                    });
                });
    };


    const [otp, setOtp] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(false);




    const HandleSubmitOtp = async () => {
        try {
            const response = await InviceService.confirmOtp(companyId, branchid, userId, otp);
            if (response.data === true) {
                setConfirmPassword(true);
            }
            else {
                toast.error('Please Enter Correct OTP!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 800,
                });
            }
        } catch (error) {
            // Handle any errors from the API call
            console.error('Error confirming OTP:', error);
            // You might want to set confirmPassword to false in case of an error
            setConfirmPassword(false);
        }
    };



    return (

        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
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
                        display: { xs: 'none', sm: 'block' },
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



                            <Form.Group className="mb-1 mt-1" controlId="company">
                                <Form.Label className="fs1">Company Name</Form.Label>
                                <Form.Select
                                    required
                                    value={companies.length === 1 ? companies[0].company_Id : companyId}
                                    onChange={handleChangeCompany}
                                    className="dw"
                                    style={{ height: '40px', borderColor: errors.company ? '#f52b2b' : '' }}
                                    disabled={enterOtp}
                                >
                                    {companies.map(company => (
                                        <option key={company.company_Id} value={company.company_Id}>
                                            {company.company_name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-1 mt-1" controlId="company">
                                <Form.Label className="fs1">Branch Name </Form.Label>
                                <Form.Select
                                    required
                                    value={branchid}
                                    onChange={handleChangeBranch}
                                    className="dw"
                                    style={{ height: '40px', borderColor: errors.branch ? '#f52b2b' : '' }}
                                    disabled={enterOtp}
                                >
                                    <option value="">Select a branch</option>
                                    {branches.map(branch => (
                                        <option key={branch.id.branchId} value={branch.id.branchId}>
                                            {branch.branchName}
                                        </option>
                                    ))}

                                </Form.Select>

                                {errors.branch && (
                                    <div className="error-message">
                                        {errors.branch}
                                    </div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-1 mt-1" controlId="company">
                                <Form.Label className="fs1">Enter Your User Id</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={userId}
                                    onChange={handleChangeuserId}
                                    className="dw"
                                    style={{ height: '40px' }}
                                    placeholder="Enter you user Id "
                                    readOnly={enterOtp}

                                    id={enterOtp ? 'service' : ''}
                                />
                            </Form.Group>


                            {!confirmPassword && (
                                <Row noGutters>
                                    <Col xs={7}>
                                        <Form.Group className="mb-1 mt-1" controlId="company">
                                            <Form.Label className="fs1">Mobile No</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                value={mobileNo}
                                                onChange={(e) => setMobileNo(e.target.value)}
                                                className="dw"
                                                style={{ height: '40px' }}
                                                id={'service'}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={5}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            style={{ marginTop: '2.1vw', marginLeft: '0.3vw' }}
                                            variant="outline-primary"
                                            onClick={HandleSendOtp}
                                        ><FontAwesomeIcon icon={faKey} style={{ marginRight: '2px' }} />
                                            Generate OTP
                                        </Button>
                                    </Col>
                                </Row>
                            )}



                            {enterOtp && !confirmPassword && (
                                <Row noGutters>
                                    <Col xs={7}> {/* Adjust the column size according to your layout */}
                                        <Form.Group className="mb-1 mt-1" controlId="company">
                                            <Form.Label className="fs1">Enter Otp</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                className="dw"
                                                style={{ height: '40px' }}
                                                placeholder="Enter Otp"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={5}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            style={{ marginTop: '2.2vw', marginLeft: '0.3vw' }}
                                            variant="outline-primary"
                                            onClick={HandleSubmitOtp}
                                        ><FontAwesomeIcon icon={faKey} style={{ marginRight: '2px' }} />
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            )}

                            {confirmPassword && (

                                <>{confirmPassword && !backToLogin && (
                                    <Row noGutters>
                                        <Col xs={7}>
                                            <Form.Group className="mb-1 mt-1" controlId="password">
                                                <Form.Label className="fs1">Enter Password</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    value={password}
                                                    onChange={handlePasswordChange}
                                                    className="dw"
                                                    style={{ height: '40px' }}
                                                    placeholder="Enter Password"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={5}>
                                            <Form.Group className="mb-1 mt-1" controlId="confirmPassword">
                                                <Form.Label className="fs1">Confirm Password</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="password"
                                                    value={confirmPassword2}
                                                    onChange={handleConfirmPasswordChange}
                                                    className="dw"
                                                    style={{ height: '40px', borderColor: !passwordsMatch ? 'red' : null }}
                                                    placeholder="Confirm Password"
                                                />
                                                {!passwordsMatch && <Form.Text className="text-danger">Passwords do not match</Form.Text>}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                )}
                                    <div className="text-center mt-3" >
                                        {!backToLogin && (
                                            <Button
                                                type="submit"
                                                fullWidth
                                                style={{ marginRight: '10px' }}
                                                variant="outline-primary"
                                                onClick={handleSubmitPassword}
                                            >
                                                <span>Change Password</span>
                                                {/* <LockOpenIcon sx={{ paddingLeft: '5px' }} /> */}
                                            </Button>

                                        )}
                                        {backToLogin && (
                                            <Button
                                                type="submit"
                                                fullWidth
                                                style={{ marginRight: '10px' }}
                                                variant="outline-primary"
                                                onClick={handleBackToLogin}
                                            ><FontAwesomeIcon icon={faBackward} style={{ marginRight: '2px' }} />
                                                <span>Back to Login</span>
                                                {/* <LockOpenIcon sx={{ paddingLeft: '5px' }} /> */}
                                            </Button>

                                        )}



                                    </div>

                                </>

                            )}



                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider >
    );
}

export default ForgotPassword;