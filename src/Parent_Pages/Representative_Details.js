import AuthContext from "../Components/AuthProvider";
    import { useNavigate } from "react-router-dom";
    import React, { useEffect, useState, useContext } from "react";
    import "../Components/Style.css";
    import { Button } from "react-bootstrap";
    import ipaddress from "../Components/IpAddress";

    import Table from "react-bootstrap/Table";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import {
    faIdCard,
    faPlaneDeparture,
    faRefresh,
    faSearch,
    faUser,
    faUserCheck,
    faUserCircle,
    } from "@fortawesome/free-solid-svg-icons";
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
    } from "reactstrap";
    import axios from "axios";

    export default function Representative_Details() {
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
        login,
        logout,
    } = useContext(AuthContext);

    const [representatives, setRepresentatives] = useState([]);
    // const [entityId, setEntityId] = useState('');
    const [PartyList, setPartyList] = useState([]);
    const [ExternalPartyList, setExternalPartyList] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredRepresentatives, setFilteredRepresentatives] = useState([]);

    const getNameByPartyId = (partyId) => {
        const foundParty = PartyList.find((party) => party.partyId === partyId);
        const exfoundParty = ExternalPartyList.find(
        (party) => party.externaluserId === partyId
        );

        if (foundParty) {
        return foundParty.partyName; // Assuming "partyName" is the property containing the name
        } else if (exfoundParty) {
        return exfoundParty.userName;
        } else {
        return `Party name ${partyId} not found.`;
        }
    };
    useEffect(() => {
        if (!isAuthenticated) {
        navigate(
            "/login?message=You need to be authenticated to access this page."
        );
        } else {
        // Make an API request to your Spring Boot backend
        axios
            .get(
            `http://${ipaddress}parties/alldata/${companyid}/${branchId}`,
            {
                headers: {
                Authorization: `Bearer ${jwtToken}`,
                },
            }
            )
            .then((response) => {
            setPartyList(response.data); // Assuming your data is an array
            })
            .catch((error) => {
            console.error("Error fetching data:", error);
            });

        axios
            .get(
            `http://${ipaddress}externalParty/${companyid}/${branchId}/getAll`,
            {
                headers: {
                Authorization: `Bearer ${jwtToken}`,
                },
            }
            )
            .then((response) => {
            setExternalPartyList(response.data); // Assuming your data is an array
            })
            .catch((error) => {
            console.error("Error fetching data:", error);
            });
        }
    }, [isAuthenticated, navigate, jwtToken]);

    // console.log(searchQuery);

    const fetchPartiesData = async () => {
        try {
        const response = await axios.get(
            `http://${ipaddress}NewReprentative/getPartyRepresentative/${companyid}/${branchId}`
        );
        const userList = response.data;
        //   setRepresentatives(userList);

        //   Fetch party images concurrently
        const imagePromises = userList.map((user) =>
            fetchPartyRepresentativeImage(user)
        );
        const partyImages = await Promise.all(imagePromises);

        // Combine party data and images
        const combinedData = userList.map((user, index) => ({
            ...user,
            imageURL: partyImages[index], // Add imageURL to user object
        }));
        // setrepresentativeImage1(response.data);
        setRepresentatives(combinedData);
        } catch (error) {
        console.error("Failed to fetch parties data. Please try again.", error);
        alert("Failed to fetch parties data. Please try again.");
        }
    };
    // const handleSearch = () => {
    //     const lowercaseQuery = searchQuery.toLowerCase(); // Convert search query to lowercase

    //     const filteredList = representatives.filter((rep) =>
    //     rep.firstName.toLowerCase().includes(lowercaseQuery)
    //     );
    // };

    const handleSearch = () => {
        const trimmedQuery = searchQuery.trim(); // Remove leading and trailing spaces
        const lowercaseQuery = trimmedQuery.toLowerCase(); // Convert search query to lowercase

        const filteredListFname = representatives.filter((rep) =>
        rep.firstName.toLowerCase().includes(lowercaseQuery)
        );
        const filteredListMname = representatives.filter((rep) =>
        rep.middleName.toLowerCase().includes(lowercaseQuery)
        );
        const filteredListLname = representatives.filter((rep) =>
        rep.lastName.toLowerCase().includes(lowercaseQuery)
        );

        if (filteredListFname.length > 0) {
        setFilteredRepresentatives(filteredListFname);
        } else if (filteredListMname > 0) {
        setFilteredRepresentatives(filteredListMname);
        } else if (filteredListLname.length > 0) {
        setFilteredRepresentatives(filteredListLname);
        } else {
        setFilteredRepresentatives([]);
        }
    };

    const handleReset = () => {
        setFilteredRepresentatives(representatives);
        setSearchQuery("");
    };

    useEffect(() => {
        fetchPartiesData();
    }, [companyid, branchId]);

    useEffect(() => {
        setFilteredRepresentatives(representatives);

        // console.log(representatives);
    }, [representatives]);

    const fetchPartyRepresentativeImage = async (user) => {
        try {
        const response = await axios.get(
            `http://${ipaddress}NewReprentative/getImage1/${user.companyId}/${user.branchId}/${user.userId}/${user.representativeId}`
        );
        // console.log(response.data);
        // setrepresentativeImage(response.data);
        // setrepresentativeImage1(response.data);
        // Return the image URL or the whole response based on your API structure
        return response.data;
        } catch (error) {
        console.error("Failed to fetch party image. Please try again.", error);
        throw error; // Rethrow the error for handling in the calling function
        }
    };
    return (
        <div className="Container">
        <h5
            className="pageHead"
            style={{
            fontFamily: "Your-Heading-Font",
            paddingLeft: "4%",
            paddingRight: "-50px",
            }}
        >
            {" "}
            <FontAwesomeIcon
            icon={faIdCard}
            style={{
                marginRight: "8px",
                color: "black", // Set the color to golden
            }}
            />
            Representative Details
        </h5>

        <div className="containerservices">
            <div className="card mt-2">
            <div className="card-body" >
                <Row>
                <Col md={4}>
                    <label htmlFor="Entity Id">Entity Id</label>
                    <input
                    type="text"
                    className="form-control"
                    style={{ height: "50px" }}
                    name="searchQuery"
                    placeholder="Entity Id"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        // handleSearch();
                    }}
                    />
                </Col>

                <Col md={4}>
                    <button
                    type="button"
                    className="btn gap-2  btn-outline-primary"
                    style={{ marginTop: "2.1vw", marginRight: "10px" }}
                    onClick={handleSearch}
                    >
                    {" "}
                    <FontAwesomeIcon
                        icon={faSearch}
                        style={{ marginRight: "5px" }}
                    />
                    Search
                    </button>
                    <button
                    type="button"
                    className="btn gap-2  btn-outline-danger"
                    style={{ marginTop: "2.1vw", marginRight: "10px" }}
                    onClick={handleReset}
                    >
                    {" "}
                    <FontAwesomeIcon
                        icon={faRefresh}
                        style={{ marginRight: "5px" }}
                    />
                    Clear
                    </button>
                </Col>

                <Col md={4}></Col>
                </Row>

                <div className="table-responsive" style={{ marginTop: "10px" }}>
                <Table className="table table-striped table-hover">
                    <thead style={{ backgroundColor: "rgb(226 232 240)" }}>
                    <tr className="text-left">
                        <th style={{ backgroundColor: "#BADDDA" }} scope="col">
                        Party/CHA/Console Name
                        </th>
                        <th style={{ backgroundColor: "#BADDDA" }} scope="col">
                        Name
                        </th>
                        <th style={{ backgroundColor: "#BADDDA" }} scope="col">
                        Image
                        </th>
                        <th style={{ backgroundColor: "#BADDDA" }} scope="col">
                        Mobile No
                        </th>
                        <th style={{ backgroundColor: "#BADDDA" }} scope="col">
                        Status
                        </th>
                        <th style={{ backgroundColor: "#BADDDA" }} scope="col">
                        Deleted
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRepresentatives.length > 0 ? (
                        filteredRepresentatives.map((rep, index) => (
                        <tr className="text-left" key={index}>
                            <td className="table-column">
                            {getNameByPartyId(rep.userId)}
                            </td>
                            <td className="table-column">
                            {rep.firstName +
                                " " +
                                rep.middleName +
                                " " +
                                rep.lastName}
                            </td>

                            <td>
                            {rep.imageURL ? (
                                <img
                                src={rep.imageURL}
                                alt={rep.imageURL} //${rep.imagePath}
                                style={{ width: "110px", height: "100px" }}
                                />
                            ) : (
                                "No Image Available"
                            )}
                            </td>

                            <td className="table-column">{rep.mobile}</td>
                            <td className="table-column">
                            {rep.status === "A" ? "Active" : rep.status}
                            </td>

                            <td className="table-column">{rep.deleted}</td>
                        </tr>
                        ))
                    ) : (
                        <React.Fragment>
                        <tr>
                            <td colSpan="6" className="text-center">
                            No results found !
                            </td>
                        </tr>
                        </React.Fragment>
                    )}
                    </tbody>
                </Table>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    }