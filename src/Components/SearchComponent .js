import React, { useState, useEffect,useContext } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { Table, Card, CardBody } from "reactstrap";
import { saveAs } from "file-saver";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import UpdatePartyForm from "../Parent_Pages/updatePartyForm";
import PartyForm from "../Parent_Pages/PartyForm";
import ipaddress from "./IpAddress";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleArrows, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt,faFileExcel } from '@fortawesome/free-solid-svg-icons';
import AuthContext from "./AuthProvider";
import {

 
  Container,



  FormGroup,
  Label,
  Input,

} from "reactstrap";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [parties, setParties] = useState([]);
  const [filteredParties, setFilteredParties] = useState([]);
  const reactPageName = 'SearchComponent';
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    isAuthenticated,
    login,
    logout,
  } = useContext(AuthContext);

  useEffect(() => {
    // Fetch all parties data from the server on component mount
    fetchPartiesData();
  }, []);

  const toggleAddModal = () => {
    setAddModalOpen((prevState) => !prevState);
  };

  const fetchPartiesData = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}parties/getAll/${companyid}/${branchId}`);
      setParties(response.data);
    } catch (error) {
      console.error("Error fetching parties data:", error);
      // Handle error and display an error message if necessary.

      alert("Failed to fetch parties data. Please try again.");

      
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredData = parties.filter((party) =>
      party.partyName.toLowerCase().includes(query)
    );
    setFilteredParties(filteredData);
  };

  const handleSearchClick = () => {
    const query = searchQuery.toLowerCase();
    const filteredData = parties.filter((party) =>
      party.partyName.toLowerCase().includes(query)
    );
    setFilteredParties(filteredData);
  };

  const handleResetClick = () => {
    setSearchQuery('');
    setFilteredParties([]);
  };

  const handleButton2Click = async () => {
    try {
      // Fetch all parties data from the server
      const response = await axios.get(`http://${ipaddress}parties/getAll`);
      const partiesData = response.data;

      // Create a new workbookzss
      const workbook = XLSX.utils.book_new();

      // Add a worksheet
      const worksheet = XLSX.utils.json_to_sheet(partiesData);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Parties");

      // Generate the XLS file
      const xlsFile = XLSX.write(workbook, { type: "binary", bookType: "xls" });

      // Convert XLS file to a Blob
      const blob = new Blob([s2ab(xlsFile)], { type: "application/vnd.ms-excel" });

      // Save the file with a specific filename
      saveAs(blob, "parties.xls");
    } catch (error) {
      console.error("Error fetching parties data:", error);
      // Handle error and display an error message if necessary.
      alert("Failed to fetch parties data. Please try again.");
    }
  };

  // Helper function to convert s2ab
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  const handleAddNewClick = () => {
    // Implement the logic for the "Add New" button here
    console.log("Add New clicked");
  };

  const handleDelete = async (partyId) => {
    try {
      await axios.delete(`http://${ipaddress}parties/delete/${partyId}`);
      toast.success('Party Deleted Successfully !!!', {
        position: 'top-center',
        autoClose: 2700,
      });
      // Fetch the updated party list after deletion
      fetchParties();
    } catch (error) {
      console.error('Error deleting party:', error);
      // Handle error and display an error message if necessary.
      toast.error('Failed to delete party !!!', {
        position: 'top-center',
        autoClose: 2700,
      });
    }
  };

  const handleEdit = (partyId) => {
    // Find the selected party from the parties array based on the partyId
    const party = parties.find((party) => party.partyId === partyId);
    setSelectedParty(party);
    setEditModalOpen(true);
  };

  const toggleEditModal = () => {
    setEditModalOpen((prevState) => !prevState);
  };

  const fetchParties = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}parties/getAll`);
      setParties(response.data);
    } catch (error) {
      console.error('Error fetching parties:', error);
      // Handle error and display an error message if necessary.
    }
  };



  return (
    <div className="Container" >
      <Row className="align-items-center">
         <CardBody  className="text-end">
         <Button
           type="button"
           variant="outline-success"
            onClick={toggleAddModal}
           
            style={{float: 'right'}}
          >
            <FontAwesomeIcon icon={faPeopleArrows} style={{ marginRight: '5px' }} />
            Add Party
          </Button>
          
          </CardBody>
          </Row>

          
          <Form>
      <Row className="align-items-center">
        <Col sm={7} className="pt-3 ">
          <Form.Group controlId="searchInput">
            <Form.Control
              type="text"
              placeholder="Search By Party Name"
              className="bt"
              autoComplete="off"
            />
          </Form.Group>
        </Col>
        <Col sm={5}>
          <div className="d-flex justify-content-">
            <Button
              type="button"
              variant="outline-primary"
              className="mr-2" // Add margin to the right
              onClick={handleSearchClick}
              style={{ marginRight: '25px' }}
            >
              <FontAwesomeIcon icon={faSearch} style={{ marginRight: 'px' }} />
             
            </Button>
            <Button
              type="button"
              variant="outline-danger"
              className="mr-2" // Add margin to the right
              onClick={handleResetClick}
              style={{ marginRight: '5px' }}
            >
              <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
              RESET
            </Button>
            <Button
              type="button"
              variant="outline-success"
              onClick={handleButton2Click}
              style={{ marginRight: '5px' }}
            >
              <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '5px' }} />
              XLS
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
    

      {filteredParties.length > 0 ? (
        <div className="table-responsive">
        <Table className="table table-striped table-hover">
          <thead>
            <tr>
              <th style={{ backgroundColor: '#BADDDA'}} >Party ID</th>
              <th style={{ backgroundColor: '#BADDDA'}} >Party Name</th>
              <th style={{ backgroundColor: '#BADDDA'}} >Email</th>
              <th style={{ backgroundColor: '#BADDDA'}} >Mobile No</th>
              <th style={{ backgroundColor: '#BADDDA'}} >IEC No</th>
              <th style={{ backgroundColor: '#BADDDA'}} >Entity ID</th>
              <th style={{ backgroundColor: '#BADDDA'}} >Credit Limit</th>
              <th style={{ backgroundColor: '#BADDDA'}} >Status</th>
              <th style={{ backgroundColor: '#BADDDA'}} >Edit</th>
              <th style={{ backgroundColor: '#BADDDA'}} >Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredParties.map((party) => (
              <tr key={party.partyId}>
                <td>{party.partyId}</td>
                <td>{party.partyName}</td>
                <td>{party.email}</td>
                <td>{party.mobileNo}</td>
                <td>{party.iecNo}</td>
                <td>{party.entityId}</td>
                <td>{party.creditLimit}</td>
                <td>{party.status === 'A' ? 'Approved' : party.status}</td>
                <td>
                  <Button  
                  type="button"
                  variant="outline-primary"
                  onClick={() => handleEdit(party.partyId)}>
                  <FontAwesomeIcon
                              icon={faEdit}
                              style={{ marginRight: "px" }}
                            />
                  </Button>
                </td>
                <td>
                  <Button
                   type="button"
                  variant="outline-danger" onClick={() => handleDelete(party.partyId)}>
                 <FontAwesomeIcon icon={faTrash} style={{ marginRight: 'px' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        </div>
      ) : (
        <p></p>
      )}

      {/* Edit Party Modal */}
      {selectedParty && (
        <UpdatePartyForm
          party={selectedParty}
          isOpen={editModalOpen}
          toggleModal={toggleEditModal}
          fetchParties={fetchParties}
        />
      )}
      {addModalOpen && (
        <PartyForm
          isOpen={addModalOpen}
          toggleModal={toggleAddModal}
          fetchParties={fetchParties}
        />
      )}
    </div>
  );
};

export default SearchComponent;