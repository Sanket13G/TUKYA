import { faEye, faSearch, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import Rate_Chart_Service from '../services/Rate_Chart_Service';
import AuthContext from "../Components/AuthProvider";
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';

function OTPViewer() {
    const [selectedOption, setSelectedOption] = useState('party');
    const [parties, setParties] = useState([]);
    const [partyName, setpartyName] = useState('');
    const [ChaParties, setChaParties] = useState([]);
    const [errors, setErrors] = useState({});
    const [importerId, setImporterId] = useState('');
    const [reprentativeArray, setReprentativeArray] = useState([]);
    const [representative, setRepresentative] = useState('');
    const [reprentativeId, setreprentativeId] = useState('')
    const [partyNames, setPartyNames] = useState({});
    const [otp, setOTP] = useState('');
    const [mobile, setmobileNo] = useState('');
    const [isSearched, setisSearched] = useState(false);
    const [cartingAgentArray, setcartingAgentArray] = useState([]);

    const {
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



    const validateField = (fieldName, value) => {
        let error = '';
        // Apply validation logic for each field

        if (!value) {
            error = `${fieldName} is required.`;
        }
        setErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: error,
        }));
    };



    useEffect(() => {
        // Run the effect only if isSearched is true
        if (isSearched) {
            validateField('partyName', partyName);
            // validateField('Cha', partyName);
            validateField('representative', representative);
        }
    }, [isSearched, partyName, representative]);













    const handleClear = () => {
        setImporterId('');
        setpartyName('');
        setOTP('');
        setmobileNo('');
        setRepresentative('');
        setReprentativeArray([]);
        setreprentativeId('');
        setisSearched(false);
        setErrors({});
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch parties
                const partiesResponse = await Rate_Chart_Service.getAllParties(companyid, branchId);

                const partyOptions = partiesResponse.data.map(party => ({
                    value: party.partyId,
                    label: party.partyName
                }));
                setParties(partyOptions);

                // Fetch CHA parties
                const chaParties = await findExternalPartyByType(companyid, branchId, "CHA");
                setChaParties(chaParties);

                // Fetch Carting Agents
                const cartingAgents = await findExternalPartyByType(companyid, branchId, "Carting Agent");
                setcartingAgentArray(cartingAgents);

            } catch (error) {
                // Handle errors if needed
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call the async function

    }, [companyid, branchId]); // Ensure to include any dependencies in the dependency array


    //   const handleShowPartyOrCHA = async () => {
    //     // setsetPertyORChamodel(true);
    //     const chaparties = await findExternalPartyByType(companyid, branchId, "CHA");
    //     setChaParties(chaparties);

    //   };



    const findExternalPartyByType = async (compid, branchid, Type) => {

        const partyResponse = await Rate_Chart_Service.getExternalUserByTypeForImport(compid, branchid, Type);
        const partyOptions = partyResponse.data.map(externalUser => ({
            value: externalUser.externaluserId,
            label: externalUser.userName
        }));
        // setChaParties(partyOptions);
        return partyOptions;
    };

    const handlePartyChange = async (selectedOption, { action }) => {
        if (action === 'clear') {
            // setpartyName('');
            // setImporterId('');
            // setreprentativeId('');
            handleClear();
        }
        else {
            setRepresentative('');
            setpartyName(selectedOption ? selectedOption.label : '')
            setImporterId(selectedOption ? selectedOption.value : '');
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

        // console.log("Representative " + cartingsRepresentative);

    };



    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        handleClear();
    };



    // const handleSubmitExternalPartySearch = async () => {
    //     Rate_Chart_Service.getReprentativeById(companyid, branchId, importerId, reprentativeId).then((res) => {
    //         setmobileNo(res.data.mobile);
    //         setOTP(res.data.otp);

    //         console.log("Mobile No :" + res.data.mobile);
    //         console.log("OTP :" + res.data.otp);
    //     });

    // };



    const handleSubmitExternalPartySearch = async () => {
        setisSearched(true);

        // Check if there are no errors
        if (Object.values(errors).every(error => error === '')) {
            // If there are no errors, proceed with the API call
            try {
                const res = await Rate_Chart_Service.getReprentativeById(companyid, branchId, importerId, reprentativeId);

                // Update state based on the API response
                setmobileNo(res.data.mobile);
                setOTP(res.data.otp);

                console.log("Mobile No: " + res.data.mobile);
                console.log("OTP: " + res.data.otp);
            } catch (error) {
                // Handle any API call errors here
                console.error("Error fetching data:", error);
            }
        } else {
            // If there are errors, you may want to handle them or display a message
            console.log("Errors");
            console.log(errors);
            toast.error('Oops something went wrong !', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 600,
            });
        }
    };








    const handleSelectionCartingAgentReprentative = async (selectedOption, { action }) => {
        if (action === 'clear') {
            setmobileNo('');
            setRepresentative('');
            setOTP('');
            setreprentativeId('')
            //   setrepresentativeImage(null);
        }
        else {
            setmobileNo('');
            setRepresentative(selectedOption ? selectedOption.label : '');
            setreprentativeId(selectedOption ? selectedOption.value : '');

        }

    };





    return (

        <div className="Container" >
            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
                icon={faEye}
                style={{
                    marginRight: '8px',
                    color: 'black',
                }}
            />OTP Viewer</h5>
            <Card>

                <CardBody>


                    <div className="mt-2 text-center">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input radios"
                                type="radio"
                                name="partyChaOption"
                                id="partyRadio"
                                value="party"
                                checked={selectedOption === 'party'}
                                onChange={handleOptionChange}
                            />
                            <label className="forlabel" htmlFor="partyRadio">
                                Party
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input radios"
                                type="radio"
                                name="partyChaOption"
                                id="chaRadio"
                                value="cha"
                                checked={selectedOption === 'cha'}
                                onChange={handleOptionChange}
                            />
                            <label className="forlabel" htmlFor="chaRadio">
                                CHA
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input radios"
                                type="radio"
                                name="partyChaOption"
                                id="cartingRadio"
                                value="carting"
                                checked={selectedOption === 'carting'}
                                onChange={handleOptionChange}
                            />
                            <label className="forlabel" htmlFor="cartingRadio">
                                Carting Agent
                            </label>
                        </div>

                    </div>
                    <hr />

                    <div className="tab-content" id="nav-tabContent">
                        <div
                            className={`tab-pane fade ${selectedOption === 'party' ? 'show active' : ''}`}
                            id="nav-home"
                            role="tabpanel"
                            aria-labelledby="nav-home-tab"
                        >
                            <Row className="mt-3">
                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">Select Party</Label>
                                        <Select
                                            options={parties}
                                            value={{ value: partyName, label: partyName }}
                                            onChange={handlePartyChange}
                                            className={errors.partyName ? 'error-border' : ''}
                                            isClearable
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    borderColor: errors.partyName ? '#f52b2b' : '',
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
                                        {errors.partyName && (
                                            <div className="error-message">
                                                Please select Party
                                            </div>
                                        )}

                                    </FormGroup>
                                </Col>

                                <Col md={4}>

                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">Select Representative </Label>

                                        <Select
                                            options={reprentativeArray}
                                            value={{ value: representative, label: representative }}
                                            onChange={handleSelectionCartingAgentReprentative}
                                            className={errors.representative ? 'error-border' : ''}
                                            isClearable
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
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
                                        {errors.representative && (
                                            <div className="error-message">
                                                Please select Representative
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <Button
                                        variant="outline-primary"
                                        style={{ marginTop: '30px' }}
                                        // onClick={(e) => handleSubmit(e)}
                                        onClick={handleSubmitExternalPartySearch}
                                    >
                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                                        Search
                                    </Button>
                                </Col>
                            </Row>

                        </div>
                        <div
                            className={`tab-pane fade ${selectedOption === 'cha' ? 'show active' : ''}`}
                            id="nav-profile"
                            role="tabpanel"
                            aria-labelledby="nav-profile-tab"
                        >
                            <Row className="mt-3">
                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">Select Cha</Label>
                                        <Select
                                            options={ChaParties}
                                            value={{ value: partyName, label: partyName }}
                                            onChange={handlePartyChange}
                                            className={errors.partyName ? 'error-border' : ''}
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
                                        {errors.partyName && (
                                            <div className="error-message">
                                                Please select Representative
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>


                                <Col md={4}>

                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">Select Representative </Label>

                                        <Select
                                            options={reprentativeArray}
                                            value={{ value: representative, label: representative }}
                                            onChange={handleSelectionCartingAgentReprentative}
                                            className={errors.representative ? 'error-border' : ''}
                                            isClearable
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
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
                                        {errors.representative && (
                                            <div className="error-message">
                                                Please select Representative
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>


                                <Col md={2}>
                                    <Button
                                        variant="outline-primary"
                                        onClick={handleSubmitExternalPartySearch}
                                        style={{ marginTop: '30px' }}
                                    >
                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                                        Search
                                    </Button>
                                </Col>
                            </Row>
                        </div>

                        <div
                            className={`tab-pane fade ${selectedOption === 'carting' ? 'show active' : ''}`}
                        // id="nav-profile"
                        // role="tabpanel"
                        // aria-labelledby="nav-home-tab"
                        >
                            <Row className="mt-3">
                                <Col md={4}>
                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">Select Carting Agent</Label>
                                        <Select
                                            options={cartingAgentArray}
                                            value={{ value: partyName, label: partyName }}
                                            onChange={handlePartyChange}
                                            className={errors.partyName ? 'error-border' : ''}
                                            isClearable
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
                                                    borderColor: errors.partyName ? '#f52b2b' : '',
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
                                        {errors.partyName && (
                                            <div className="error-message">
                                                Please select Carting Agent
                                            </div>
                                        )}

                                    </FormGroup>
                                </Col>

                                <Col md={4}>

                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">Select Representative </Label>

                                        <Select
                                            options={reprentativeArray}
                                            value={{ value: representative, label: representative }}
                                            onChange={handleSelectionCartingAgentReprentative}
                                            className={errors.representative ? 'error-border' : ''}
                                            isClearable
                                            styles={{
                                                control: (provided, state) => ({
                                                    ...provided,
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
                                        {errors.representative && (
                                            <div className="error-message">
                                                Please select Representative
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <Button
                                        variant="outline-primary"
                                        style={{ marginTop: '30px' }}
                                        // onClick={(e) => handleSubmit(e)}
                                        onClick={handleSubmitExternalPartySearch}
                                    >
                                        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                                        Search
                                    </Button>
                                </Col>
                            </Row>

                        </div>
                    </div>

                    <hr />

                    {mobile && (
                        <div className="table-responsive">
                            <Table className="table table-bordered custom-table mt-3">
                                <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                                    <tr className="text-center">
                                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Representative</th>
                                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Mobile No</th>
                                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Otp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-center">
                                        <td>{representative}</td>
                                        <td>{mobile}</td>
                                        <td>{otp}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>

    );
}

export default OTPViewer;