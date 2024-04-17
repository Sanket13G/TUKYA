import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../Components/AuthProvider";
import ipaddress from "../Components/IpAddress";
import { Card, Col, Form, Row } from "react-bootstrap";
import { CardBody, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLightbulb,
    faSave,
} from "@fortawesome/free-solid-svg-icons";

export default function SetDefault() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

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
        logintype,
        logintypeid,
        userType,
        login,
        logout,
    } = useContext(AuthContext);

    const [Partylist, setPartyList] = useState([]);
    const [CHAlist, setCHAList] = useState([]);
    const [Consolelist, setConsoleList] = useState([]);

    const [selectedValues, setSelectedValues] = useState({
        companyId: companyid,
        branchId: branchId,
        useId: "",
        impCHA: "",
        impConsole: "",
        expCHA: "",
        expConsole: "",
    });

    useEffect(() => {
        if (isAuthenticated) {
            axios
                .get(`http://${ipaddress}parties/getAll/${companyid}/${branchId}`)
                .then((response) => {
                    setPartyList(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching party list:", error);
                });

            axios
                .get(`http://${ipaddress}externalparty/alldata/${companyid}/${branchId}`)
                .then((response) => {
                    setCHAList(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching CHA list:", error);
                });

            axios
                .get(`http://${ipaddress}externalparty/consoledata/${companyid}/${branchId}`)
                .then((response) => {
                    setConsoleList(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching console list:", error);
                });
        }
    }, [isAuthenticated, companyid, branchId]);
    // Define error state variables for all input fields
    const [useIdError, setUseIdError] = useState(false);
    const [impCHAError, setImpCHAError] = useState(false);
    const [impConsoleError, setImpConsoleError] = useState(false);
    const [expCHAError, setExpCHAError] = useState(false);
    const [expConsoleError, setExpConsoleError] = useState(false);
    // const handleFormSubmit = () => {
    //     const postData = {
    //     companyId: selectedValues.companyId,
    //     branchId: selectedValues.branchId,
    //     useId: selectedValues.useId,
    //     impCHA: selectedValues.impCHA,
    //     impConsole: selectedValues.impConsole,
    //     expCHA: selectedValues.expCHA,
    //     expConsole: selectedValues.expConsole,
    //     status: "A",
    //     createdBy: username,
    //     editedBy: username,
    //     approvedBy: username,
    //     };

    //     axios
    //     .post(`http://${ipaddress}defaultparty/SaveRecord`, postData)
    //     .then((response) => {
    //         toast.success("Record saved successfully", response.data);
    //     })
    //     .catch((error) => {
    //         toast.error(error.message);
    //     });
    // };
    const handleFormSubmit = () => {
        // Check if useId is empty
     if(logintype != 'Party'){
        if (!selectedValues.useId) {
            setUseIdError(true);
            return; // Don't submit the form if useId is empty
        } else {
            setUseIdError(false); // Reset the useId error state
        }
     }

   
      if(logintype === 'Party'){
        const postData = {
            companyId: selectedValues.companyId,
            branchId: selectedValues.branchId,
            useId: logintypeid,
            impCHA: selectedValues.impCHA,
            impConsole: selectedValues.impConsole,
            expCHA: selectedValues.expCHA,
            expConsole: selectedValues.expConsole,
            status: "A",
            createdBy: userId,
            editedBy: userId,
            approvedBy: userId,
        };
        axios
        .post(`http://${ipaddress}defaultparty/SaveRecord`, postData)
        .then((response) => {
            toast.success("Record saved successfully", response.data);
        })
        .catch((error) => {
            toast.error(error.message);
        });
      }
      else{
        const postData = {
            companyId: selectedValues.companyId,
            branchId: selectedValues.branchId,
            useId: selectedValues.useId,
            impCHA: selectedValues.impCHA,
            impConsole: selectedValues.impConsole,
            expCHA: selectedValues.expCHA,
            expConsole: selectedValues.expConsole,
            status: "A",
            createdBy: userId,
            editedBy: userId,
            approvedBy: userId,
        };
        axios
        .post(`http://${ipaddress}defaultparty/SaveRecord`, postData)
        .then((response) => {
            toast.success("Record saved successfully", response.data);
        })
        .catch((error) => {
            toast.error(error.message);
        });
      }

      
    };

    const fetchDefaultParty = (partyId) => {
     if(logintype === 'Party'){
        axios
        .get(`http://${ipaddress}defaultparty/getdata/${companyid}/${branchId}/${logintypeid}`)
        .then((response) => {
            setSelectedValues((prevValues) => ({
                ...prevValues,
                impCHA: response.data.impCHA || "",
                impConsole: response.data.impConsole || "",
                expCHA: response.data.expCHA || "",
                expConsole: response.data.expConsole || "",
            }));
        })
        .catch((error) => {
            console.error("Error retrieving default party:", error);
        });
     }
     else{
        axios
        .get(`http://${ipaddress}defaultparty/getdata/${companyid}/${branchId}/${partyId}`)
        .then((response) => {
            setSelectedValues((prevValues) => ({
                ...prevValues,
                impCHA: response.data.impCHA || "",
                impConsole: response.data.impConsole || "",
                expCHA: response.data.expCHA || "",
                expConsole: response.data.expConsole || "",
            }));
        })
        .catch((error) => {
            console.error("Error retrieving default party:", error);
        });
     }
    };

    useEffect(()=>{
       if(logintype === 'Party'){
        fetchDefaultParty()
       } 
    },[companyid,branchId,logintypeid])

    function findNameByCHAId(idToFind) {
        const chaItem = CHAlist.find((item) => item.externaluserId === idToFind);
        return chaItem ? chaItem.userName : "";
    }

    function findNameByConsoleId(idToFind) {
        const consoleItem = Consolelist.find((item) => item.externaluserId === idToFind);
        return consoleItem ? consoleItem.userName : "";
    }

    return (
        <>
            <h5 className="pageHead">
                <FontAwesomeIcon
                    icon={faLightbulb}
                    style={{ marginRight: "8px", color: "black" }}
                />
                Set Default
            </h5>

            {logintype === 'Party' ?(
                <Card className="cardcolor">
                <CardBody>
                    
                    <br />
                    <Label className="inputhead" style={{ marginLeft: 200 }}>
                        Import
                    </Label>
                    <br />
                    <Row>
                        <Col md={2}></Col>
                        <Col md={4}>
                            <Label className="inputhead">Select Default CHA</Label>

                            <Form.Group controlId="impCHA" className={impCHAError ? 'error' : ''}>
                                <Form.Control
                                    as="select"
                                    className={`in ${impCHAError ? 'error' : ''}`}
                                    style={{
                                        height: "39px",
                                        borderColor: impCHAError ? 'red' : '',
                                    }}
                                    value={selectedValues.impCHA}
                                    onChange={(e) => {
                                        const newImpCHA = e.target.value;
                                        setSelectedValues((prevValues) => ({
                                            ...prevValues,
                                            impCHA: newImpCHA,
                                        }));
                                    }}
                                >
                                    <option value="N">Select</option>
                                    {CHAlist.map((chaItem, index) =>
                                        chaItem ? (
                                            <option key={index} value={chaItem.externaluserId}>
                                                {chaItem.userName}
                                            </option>
                                        ) : null
                                    )}
                                </Form.Control>
                                {impCHAError && (
                                    <div className="error-message">Please select a CHA</div>
                                )}
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Label className="inputhead">Select Default Console</Label>

                            <Form.Group controlId="impConsole" className={impConsoleError ? 'error' : ''}>
                                <Form.Control
                                    as="select"
                                    className={`in ${impConsoleError ? 'error' : ''}`}
                                    style={{
                                        height: "39px",
                                        borderColor: impConsoleError ? 'red' : '',
                                    }}
                                    value={selectedValues.impConsole}
                                    onChange={(e) => {
                                        const newImpConsole = e.target.value;
                                        setSelectedValues((prevValues) => ({
                                            ...prevValues,
                                            impConsole: newImpConsole,
                                        }));
                                    }}
                                >
                                    <option value="No">Select</option>
                                    {Consolelist.map((consoleItem, index) =>
                                        consoleItem ? (
                                            <option key={index} value={consoleItem.externaluserId}>
                                                {consoleItem.userName}
                                            </option>
                                        ) : null
                                    )}
                                </Form.Control>
                                {impConsoleError && (
                                    <div className="error-message">Please select a Console</div>
                                )}
                            </Form.Group>      </Col>
                        <Col></Col>
                    </Row>
                    <br />
                    <Row>
                        <Label className="inputhead" style={{ marginLeft: 200 }}>
                            Export
                        </Label>
                        <Col md={2}></Col>
                        <Col md={4}>
                            <Label className="inputhead">Select Default CHA</Label>

                            <Form.Group controlId="expCHA" className={expCHAError ? 'error' : ''}>
                                <Form.Control
                                    as="select"
                                    className={`in ${expCHAError ? 'error' : ''}`}
                                    style={{
                                        height: "39px",
                                        borderColor: expCHAError ? 'red' : '',
                                    }}
                                    value={selectedValues.expCHA}
                                    onChange={(e) => {
                                        const newExpCHA = e.target.value;
                                        setSelectedValues((prevValues) => ({
                                            ...prevValues,
                                            expCHA: newExpCHA,
                                        }));
                                    }}
                                >
                                    <option value="N">Select</option>
                                    {CHAlist.map((chaItem, index) =>
                                        chaItem ? (
                                            <option key={index} value={chaItem.externaluserId}>
                                                {chaItem.userName}
                                            </option>
                                        ) : null
                                    )}
                                </Form.Control>
                                {expCHAError && (
                                    <div className="error-message">Please select an Export CHA</div>
                                )}
                            </Form.Group>            </Col>

                        <Col md={4}>
                            <Label className="inputhead">Select Default Console</Label>
                            <Form.Group controlId="expConsole" className={expConsoleError ? 'error' : ''}>
                                <Form.Control
                                    as="select"
                                    className={`in ${expConsoleError ? 'error' : ''}`}
                                    style={{
                                        height: "39px",
                                        borderColor: expConsoleError ? 'red' : '',
                                    }}
                                    value={selectedValues.expConsole}
                                    onChange={(e) => {
                                        const newExpConsole = e.target.value;
                                        setSelectedValues((prevValues) => ({
                                            ...prevValues,
                                            expConsole: newExpConsole,
                                        }));
                                    }}
                                >
                                    <option value="N">Select</option>
                                    {Consolelist.map((consoleItem, index) =>
                                        consoleItem ? (
                                            <option key={index} value={consoleItem.externaluserId}>
                                                {consoleItem.userName}
                                            </option>
                                        ) : null
                                    )}
                                </Form.Control>
                                {expConsoleError && (
                                    <div className="error-message">Please select an Export Console</div>
                                )}
                            </Form.Group></Col>
                        <Col></Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={2}></Col>
                        <Col md={4}></Col>
                        <Col md={4}>
                            <div style={{ marginTop: "10px" }} className="text-end">
                                <button
                                    style={{}}
                                    className="btn btn-outline-success btn-margin"
                                    type="button"
                                    onClick={handleFormSubmit}
                                >
                                    <FontAwesomeIcon
                                        icon={faSave}
                                        style={{ marginRight: "2px" }}
                                    />
                                    Submit
                                </button>
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>
                </CardBody>
            </Card>
            )
            :
            (
                <Card className="cardcolor">
                <CardBody>
                    <Row>
                        <Col md={3}></Col>
                        <Col md={6}>
                            <Label className="inputhead">Select Default Party</Label>
                            <Form.Group controlId="company" className={useIdError ? 'error' : ''}>
                                <Form.Control
                                    as="select"
                                    className={`in ${useIdError ? 'error' : ''}`}
                                    style={{
                                        height: "39px",
                                        borderColor: useIdError ? 'red' : '', // Set border color to red when there is an error
                                    }}
                                    value={selectedValues.useId}
                                    onChange={(e) => {
                                        const newSelectedPartyId = e.target.value;
                                        setSelectedValues((prevValues) => ({
                                            ...prevValues,
                                            useId: newSelectedPartyId,
                                        }));
                                        fetchDefaultParty(newSelectedPartyId);
                                    }}
                                >
                                    <option value="">Select</option>
                                    {Partylist.map((Item, index) =>
                                        Item ? (
                                            <option key={index} value={Item.partyId}>
                                                {Item.partyName}
                                            </option>
                                        ) : null
                                    )}
                                </Form.Control>
                                {useIdError && (
                                    <div className="error-message">Please select a party</div>
                                )}
                            </Form.Group>

                        </Col>
                    </Row>
                    <br />
                    <Label className="inputhead" style={{ marginLeft: 200 }}>
                        Import
                    </Label>
                    <br />
                    <Row>
                        <Col md={2}></Col>
                        <Col md={4}>
                            <Label className="inputhead">Select Default CHA</Label>

                            <Form.Group controlId="impCHA" className={impCHAError ? 'error' : ''}>
                                <Form.Control
                                    as="select"
                                    className={`in ${impCHAError ? 'error' : ''}`}
                                    style={{
                                        height: "39px",
                                        borderColor: impCHAError ? 'red' : '',
                                    }}
                                    value={selectedValues.impCHA}
                                    onChange={(e) => {
                                        const newImpCHA = e.target.value;
                                        setSelectedValues((prevValues) => ({
                                            ...prevValues,
                                            impCHA: newImpCHA,
                                        }));
                                    }}
                                >
                                    <option value="N">Select</option>
                                    {CHAlist.map((chaItem, index) =>
                                        chaItem ? (
                                            <option key={index} value={chaItem.externaluserId}>
                                                {chaItem.userName}
                                            </option>
                                        ) : null
                                    )}
                                </Form.Control>
                                {impCHAError && (
                                    <div className="error-message">Please select a CHA</div>
                                )}
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Label className="inputhead">Select Default Console</Label>

                            <Form.Group controlId="impConsole" className={impConsoleError ? 'error' : ''}>
                                <Form.Control
                                    as="select"
                                    className={`in ${impConsoleError ? 'error' : ''}`}
                                    style={{
                                        height: "39px",
                                        borderColor: impConsoleError ? 'red' : '',
                                    }}
                                    value={selectedValues.impConsole}
                                    onChange={(e) => {
                                        const newImpConsole = e.target.value;
                                        setSelectedValues((prevValues) => ({
                                            ...prevValues,
                                            impConsole: newImpConsole,
                                        }));
                                    }}
                                >
                                    <option value="No">Select</option>
                                    {Consolelist.map((consoleItem, index) =>
                                        consoleItem ? (
                                            <option key={index} value={consoleItem.externaluserId}>
                                                {consoleItem.userName}
                                            </option>
                                        ) : null
                                    )}
                                </Form.Control>
                                {impConsoleError && (
                                    <div className="error-message">Please select a Console</div>
                                )}
                            </Form.Group>      </Col>
                        <Col></Col>
                    </Row>
                    <br />
                    <Row>
                        <Label className="inputhead" style={{ marginLeft: 200 }}>
                            Export
                        </Label>
                        <Col md={2}></Col>
                        <Col md={4}>
                            <Label className="inputhead">Select Default CHA</Label>

                            <Form.Group controlId="expCHA" className={expCHAError ? 'error' : ''}>
                                <Form.Control
                                    as="select"
                                    className={`in ${expCHAError ? 'error' : ''}`}
                                    style={{
                                        height: "39px",
                                        borderColor: expCHAError ? 'red' : '',
                                    }}
                                    value={selectedValues.expCHA}
                                    onChange={(e) => {
                                        const newExpCHA = e.target.value;
                                        setSelectedValues((prevValues) => ({
                                            ...prevValues,
                                            expCHA: newExpCHA,
                                        }));
                                    }}
                                >
                                    <option value="N">Select</option>
                                    {CHAlist.map((chaItem, index) =>
                                        chaItem ? (
                                            <option key={index} value={chaItem.externaluserId}>
                                                {chaItem.userName}
                                            </option>
                                        ) : null
                                    )}
                                </Form.Control>
                                {expCHAError && (
                                    <div className="error-message">Please select an Export CHA</div>
                                )}
                            </Form.Group>            </Col>

                        <Col md={4}>
                            <Label className="inputhead">Select Default Console</Label>
                            <Form.Group controlId="expConsole" className={expConsoleError ? 'error' : ''}>
                                <Form.Control
                                    as="select"
                                    className={`in ${expConsoleError ? 'error' : ''}`}
                                    style={{
                                        height: "39px",
                                        borderColor: expConsoleError ? 'red' : '',
                                    }}
                                    value={selectedValues.expConsole}
                                    onChange={(e) => {
                                        const newExpConsole = e.target.value;
                                        setSelectedValues((prevValues) => ({
                                            ...prevValues,
                                            expConsole: newExpConsole,
                                        }));
                                    }}
                                >
                                    <option value="N">Select</option>
                                    {Consolelist.map((consoleItem, index) =>
                                        consoleItem ? (
                                            <option key={index} value={consoleItem.externaluserId}>
                                                {consoleItem.userName}
                                            </option>
                                        ) : null
                                    )}
                                </Form.Control>
                                {expConsoleError && (
                                    <div className="error-message">Please select an Export Console</div>
                                )}
                            </Form.Group></Col>
                        <Col></Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={2}></Col>
                        <Col md={4}></Col>
                        <Col md={4}>
                            <div style={{ marginTop: "10px" }} className="text-end">
                                <button
                                    style={{}}
                                    className="btn btn-outline-success btn-margin"
                                    type="button"
                                    onClick={handleFormSubmit}
                                >
                                    <FontAwesomeIcon
                                        icon={faSave}
                                        style={{ marginRight: "2px" }}
                                    />
                                    Submit
                                </button>
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>
                </CardBody>
            </Card>
            )

            }
        </>
    );
}