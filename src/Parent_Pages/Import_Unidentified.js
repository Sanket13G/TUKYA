import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./parent.css";
import ipaddress from "../Components/IpAddress";
import DatePicker from "react-datepicker";
import "../Components/Style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import {
  Card,
  CardBody,
  Col,
  Label,
  Container,
  FormGroup,
  Table,
  Row,
  Toast,
} from "reactstrap";

// import {
//   Card,
//   CardBody,
//   Container,
//   Row,
//   Col,
//   Form,
//   FormGroup,

//   Input,
//   Table,
// } from "reactstrap";
import { toast } from "react-toastify";
import { faListCheck, faRefresh, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Import_Unidentified() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  const [id, setID] = useState("");
  const reactPageName = 'Import Unidentified';
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [hold, setHold] = useState("");

  const [personalCarriage, setPersonalCarriage] = useState("");
  const [Heavy, setHeavy] = useState("");
  const [specialCarting, setSpecialCarting] = useState("");


  const [Forwarded, setForwarded] = useState("");
  const [dgdcStatus, setDgdcStatus] = useState("");
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}api/export/list`, {
        headers: {
          'React-Page-Name': reactPageName
        }
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRegistration = {
      id,
      search,
      personalCarriage,
      hold,

      dgdcStatus,
      startDate,
      Heavy,

      endDate,
      specialCarting,
      Forwarded,
    };

    // axios
    //   .post("http://localhost:8080/api/export/newExport", newRegistration)
    //   .then((response) => {
    //     console.log(newRegistration);
    //     toast.success("record added successfully", {
    //       position: "top-center",
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     // Handle error
    //   });
  };

  const handleClear = () => {
    // Clear the form fields
    setID("");
    setPersonalCarriage("");
    setSpecialCarting("");
    setHold("");

    setDgdcStatus("");
    setForwarded("");
    setSearch("");

    setHeavy("");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const handleEdit = (item) => {
    setSelectedData(item);
    setID(item.id);

    setSearch(item.search);
    setPersonalCarriage(item.personalCarriage);
    setHold(item.hold);

    setDgdcStatus(item.dgdcStatus);
    setStartDate(item.startDate);
    setEndDate(item.endDate);

    setForwarded(item.Forwarded);
    setHeavy(item.Heavy);

    setSpecialCarting(item.specialCarting);

    console.log(item);
    // axios
    //   .post("http://localhost:8080/api/export/simple", item)
    //   .then((response) => {
    //     console.log(item);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     // Handle error
    //   });
  };

  const handleDelete = (item) => {
    console.log(item);
    // axios
    //   .delete(`http://localhost:8080/api/export/deleteItem/${item.id}`)
    //   .then((response) => {
    //     toast.success("Item deleted successfully", { position: "top-center" });
    //     console.log("Item deleted successfully");
    //     // Perform any additional actions or updates as needed
    //   })
    //   .catch((error) => {
    //     console.error("Error deleting item:", error);

    //     toast.error("error", { position: "top-center" });
    //     // Handle any errors that occurred during the request
    //   });
  };

  return (
    <div className="Container">
      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
        icon={faListCheck}
        style={{
          marginRight: '8px',
          color: 'black', // Set the color to golden
        }}
      /> Import Unidentified</h5>

      <Card>
        <form
          onSubmit={handleSubmit}
          action="/form"
          style={{
            paddingTop: 18,
            marginLeft:'10px',
            marginRight:'10px'
          }}
        >
          <div>
            {/* <Container> */}
            {/* <div className="Container"> */}
              {/* <Card>
                <CardBody> */}
                  <form>
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label className="forlabel" for="branchId">
                            Branch Name
                          </Label>
                          <input
                            type="text"
                            id="search"
                            className="form-control"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label className="forlabel" htmlFor="startDate">
                            Date
                          </Label>

                          <Row md={6}>
                            <Col md={6}>
                              <div > {/* Wrap in an input group */}
                                <DatePicker
                                  selected={startDate}
                                  onChange={(date) => setStartDate(date)}
                                  wrapperClassName="custom-react-datepicker-wrapper"
                                  dateFormat="dd/MM/yyyy"
                                  className="form-control border-right-0 "
                                  customInput={<input style={{ width: '100%' }} />}
                                />
                              </div>
                            </Col>

                            <Col md={6}>
                              <div >
                                <DatePicker
                                  selected={endDate}
                                  onChange={(date) => setEndDate(date)}
                                  wrapperClassName="custom-react-datepicker-wrapper"
                                  dateFormat="dd/MM/yyyy"
                                  className="form-control border-right-0 "
                                  customInput={<input style={{ width: '100%' }} />}
                                />
                              </div>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label className="forlabel" htmlFor="hold">
                            Hold
                          </Label>
                          <select
                            id="hold"
                            className="form-control form-select"
                            value={hold}
                            onChange={(e) => setHold(e.target.value)}
                            required
                          >
                            <option value="">-Any-</option>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                            <option value="Requested">Requested</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label className="forlabel" htmlFor="personalCarriage">
                            Personal Carriage
                          </Label>
                          <select
                            id="personalCarriage"
                            className="form-control  form-select"
                            value={personalCarriage}
                            onChange={(e) =>
                              setPersonalCarriage(e.target.value)
                            }
                          >
                            <option value="">-Any-</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        {" "}
                        <FormGroup>
                          <Label className="forlabel" htmlFor="specialCarting">
                            Special Carting
                          </Label>
                          <select
                            id="specialCarting"
                            className="form-control  form-select"
                            value={specialCarting}
                            onChange={(e) => setSpecialCarting(e.target.value)}
                            required
                          >
                            <option value="">-Any-</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label className="forlabel" htmlFor="Forwarded">
                            Forwarded
                          </Label>
                          <select
                            id="Forwarded"
                            className="form-control  form-select"
                            value={Forwarded}
                            placeholder="-any-"
                            onChange={(e) => setForwarded(e.target.value)}
                            required
                          >
                            <option value="">-Any-</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label className="forlabel" htmlFor="Heavy">
                            Heavy
                          </Label>
                          <select
                            id="Heavy"
                            className="form-control  form-select"
                            value={Heavy}
                            onChange={(e) => setHeavy(e.target.value)}
                          >
                            <option value="">-Any-</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <Label className="forlabel" htmlFor="dgdcStatus">
                          Dgdc Status
                        </Label>
                        <select
                          id="dgdcStatus"
                          className="form-control  form-select"
                          value={dgdcStatus}
                          onChange={(e) => setDgdcStatus(e.target.value)}
                          required
                        >
                          <option value="">-Any-</option>
                          <option value="Pending">Pending</option>
                          <option value="Handed over to Party/CHA">
                            Handed over to Party/CHA
                          </option>
                          <option value="Handed over to Dgdc Seep">
                            Handed over to DGDC SEEP{" "}
                          </option>
                          <option value="Exit from DGDC Cargo Gate">
                            Exit from DGDC Cargo Gate
                          </option>
                          <option value="Entry at DGDC SEEPZ Gate">
                            Entry at DGDC SEEPZ Gate
                          </option>
                          <option value="Entry at DGDC Cargo Gate">
                            Entry at DGDC Cargo Gate
                          </option>
                          <option value="Exit From DGDC SEEPZ Gate">
                            Exit From SEEPZ Gate
                          </option>
                          <option value="Handed Over to Airline">
                            Handed Over to Airline
                          </option>
                          <option value="Handed Over to DGDC Cargo">
                            Handed Over to DGDC Cargo
                          </option>
                          <option value="Handed Over to Carting Agent">
                            Handed Over to Carting Agent
                          </option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </Col>
                      <Col md={4}>
                        <FormGroup className="text-center">
                          <div
                            style={{
                              alignItems: "center",
                              marginTop: "30px",
                            }}
                          >
                            <Button
                              type="button"
                              variant="outline-primary"
                              style={{ marginRight: 10 }}
                            ><FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                              Search
                            </Button>

                            <Button
                              type="button"
                              variant="outline-danger"
                              onClick={handleClear}
                            ><FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                              Reset
                            </Button>
                          </div>{" "}
                        </FormGroup>
                      </Col>
                    </Row>
                  </form>
                {/* </CardBody>
              </Card> */}
            {/* </div> */}
            {/* </Container> */}
            {/* <Card
            // style={{
            //   marginTop: 30,
            //   marginRight: 12,
            //   marginLeft: 12,
            // }}
            >
              <CardBody> */}
                <div className="table-responsive">
                  <Table className="table table-striped table-hover">
                    <thead style={{
                      color: "#ff9900",
                    }}>
                      <tr>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Sr.No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">SIR Date</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">SER No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Flight No</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Importer Name(As on parcel)</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Packages</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">MAWB No.</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">HAWB.NO</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">BE Request ID</th>

                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">NSDL Status</th>
                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">DGDC Status</th>

                        <th style={{ backgroundColor: '#BADDDA' }} scope="col" className="fa fa-align-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{ }</td>
                          <td>{ }</td>
                          <td>{ }</td>
                          <td>{ }</td>
                          <td>{ }</td>
                          <td>{ }</td>
                          <td>{ }</td>
                          <td>{ }</td>
                          <td>{ }</td>
                          <td>
                            <button
                              className="btn btn-outline-primary"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => handleDelete(item)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              {/* </CardBody>
            </Card> */}

            <div></div>
          </div>
        </form>
      </Card>
    </div>
  );
}