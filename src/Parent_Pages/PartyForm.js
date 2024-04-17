import React, { useState,useContext, useEffect } from 'react';
import { Form, Row, Col, Button ,Card,Table} from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import AuthContext from '../Components/AuthProvider';
import ipaddress from '../Components/IpAddress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faPeopleRoof, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt,faFileExcel } from '@fortawesome/free-solid-svg-icons';

const PartyForm = () => {
  const reactPageName = 'Party form';
  const [parties, setParties] = useState([]);
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
  const [formErrors, setFormErrors] = useState({
    partyName: "",
    address1: "",
    email: "",
    mobileNo: "",
    iecNo: "",
    entityId: ""

  });
  const [formData, setFormData] = useState({
 companyId:companyid,
 branchId:branchId,
 partyId:'',
 partyName:'',
 address1:'',
 address2:'',
 address3:'',
 city:'',
 pin:'',
 state:'',
     country:'',
     unitAdminName:'',
     unitType:'',
     email:'',
     phoneNo:'',
     mobileNo:'',
     partyCode:'',
     erpCode:'',
     creditLimit:'',
     iecNo:'',
     entityId:'',
     panNo:'',
     gstNo:'',
     loaNumber:'',
     loaIssueDate:'',
     loaExpiryDate:'',
     createdBy:'',
     createdDate:'',
     editedBy:'',
     editedDate:'',
     approvedBy:'',
     approvedDate:'',
     status:'',
    
   
  });

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Holy See",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ];
  const stateMapping = {
    India: ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu'],
    USA: ['California', 'New York', 'Texas', 'Florida'],
    // Add more countries and their respective states as needed...
  };

  const cityMapping = {
    Delhi: ['New Delhi', 'Old Delhi'],
    Maharashtra: ['Mumbai', 'Pune'],
    Karnataka: ['Bangalore', 'Mysore'],
    'Tamil Nadu': ['Chennai', 'Coimbatore'],
    California: ['Los Angeles', 'San Francisco'],
    'New York': ['New York City', 'Buffalo'],
    Texas: ['Houston', 'Austin'],
    Florida: ['Miami', 'Orlando'],
    // Add more states and their respective cities as needed...
  };

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const countryStates = stateMapping[selectedCountry] || [];
    setFormData((prevData) => ({ ...prevData, state: '', city: '' }));
    setStates(countryStates);
    setCities([]);
  };
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    const stateCities = cityMapping[selectedState] || [];
    setFormData((prevData) => ({ ...prevData, city: '' }));
    setCities(stateCities);
  };
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Helper function to validate phone and mobile numbers using regex
  const validateNumber = (number) => {
    const regex = /^\d{10}$/;
    return regex.test(number);
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validatePAN = (panNumber) => {
    const panPattern = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/;
    return panPattern.test(panNumber);
  };

  // Helper function to validate mobile number (10 digits only)
  const validateMobile = (mobileNumber) => {
    const mobilePattern = /^\d{10}$/;
    return mobilePattern.test(mobileNumber);
  };

  const [loading, setLoading] = useState(false);

  // const errors = {};

  // if (!formData.partyName) {
  //   errors.partyName = "Party name is required.";
  // }

  // if (!formData.address1) {
  //   errors.address1 = "Address1 is required.";
  // }
  // if (!formData.email) {
  //   errors.email = "Email is required.";
  // }

  // if (!formData.mobileNo) {
  //   errors.mobileNo = "Mobile no is required.";
  // }

  // if (!formData.iecNo) {
  //   errors.iecNo = "IEC no is required.";
  // }
  // if (!formData.entityId) {
  //   errors.entityId = "Entity Id is required.";
  // }

  // if (!formData.partyName) {
  //   document.getElementById('partyName').classList.add('error-border');
  // }

  // if (!formData.address1) {
  //   document.getElementById('address1').classList.add('error-border');
  // }
  // if (!formData.email) {
  //   document.getElementById('email').classList.add('error-border');
  // }

  // if (!formData.mobileNo) {
  //   document.getElementById('mobileNo').classList.add('error-border');
  // }

  // if (!formData.iecNo) {
  //   document.getElementById('iecNo').classList.add('error-border');
  // }
  // if (!formData.entityId) {
  //   document.getElementById('entityId').classList.add('error-border');
  // }
  // if (Object.keys(errors).length > 0) {
  //   setFormErrors(errors);
  //   return;
  // }


  const handleSubmit = async (e) => {
    e.preventDefault();

   


     // function which encode the code 
  const customEncode = (value) => {
    const characterMap = {
      'C': 'X',
      'B': 'Y',
      'M': 'Z',
    };
  
    const symbolMap = {
      '0': '*',
      '1': '@',
      '2': '#',
      '3': '&',
      '4': '$',
      '5': '%',
      '6': '^',
      '7': '!',
      '8': '(',
      '9': ')',
    };
  
    const encodedValue = value
      .replace(/[CBM0-9]/g, (match) => characterMap[match] || symbolMap[match]);
  
    return encodedValue;
  };
  
  
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
      '%': '5',
      '^': '6',
      '!': '7',
      '(': '8',
      ')': '9',
    };
  
    const decodedValue = encodedValue
      .replace(/[XYZ*@#&$%^!()]/g, (match) => reverseCharacterMap[match] || reverseSymbolMap[match]);
  
    return decodedValue;
  };


  const errors = {};

  if (!formData.partyName) {
    errors.partyName = "Party name is required.";
  }

  if (!formData.address1) {
    errors.address1 = "Address1 is required.";
  }
  if (!formData.email) {
    errors.email = "Email is required.";
  }

  if (!formData.mobileNo) {
    errors.mobileNo = "Mobile no is required.";
  }

  if (!formData.iecNo) {
    errors.iecNo = "IEC no is required.";
  }
  if (!formData.entityId) {
    errors.entityId = "Entity Id is required.";
  }

  if (!formData.partyName) {
    document.getElementById('partyName').classList.add('error-border');
  }

  if (!formData.address1) {
    document.getElementById('address1').classList.add('error-border');
  }
  if (!formData.email) {
    document.getElementById('email').classList.add('error-border');
  }

  if (!formData.mobileNo) {
    document.getElementById('mobileNo').classList.add('error-border');
  }

  if (!formData.iecNo) {
    document.getElementById('iecNo').classList.add('error-border');
  }
  if (!formData.entityId) {
    document.getElementById('entityId').classList.add('error-border');
  }
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }
    
    try {


       // Encode each value separately
  const encodedCompanyId = customEncode(companyid);
  const encodedBranchId = customEncode(branchId);
  const encodedPartyId = customEncode(userId);
  
  const DecodedCompanyId1 = customDecode(encodedCompanyId);
  const DecodedBranchId1 = customDecode(encodedBranchId);
  const DecodedPartyId1 = customDecode(encodedPartyId);
  
  console.log(encodedCompanyId);
  console.log(encodedBranchId);
  console.log(encodedPartyId);
  console.log(DecodedCompanyId1);
  console.log(DecodedBranchId1);
  console.log(DecodedPartyId1);

      const response = await axios.post(`http://${ipaddress}parties/add/${userId}/${companyid}/${branchId}/${ipaddress}/${encodedCompanyId}/${encodedBranchId}/${encodedPartyId}`, formData);
      console.log('Response:', response.data);
      
      // const response = await axios.post(`http://${ipaddress}parties/add/${userId}`, formData);
      // console.log('Response:', response.data);
  
      // Assuming the response structure includes a 'message' field indicating success
      if (response.data==response.data) {
        toast.success('Party Added Successfully !!!', {
          position: 'top-center',
        });
      
      } else {
        toast.error('Failed to add party. Please try again.', {
          position: 'top-center',
        });
       
      }
    } catch (error) {
      console.error('Error Adding party:', error);
      toast.error('An error occurred. Please try again.', {
        position: 'top-center',
      });
    
    } finally {
      // Reset loading state after the process is completed
      setLoading(false);
    }
    
  };




  const handleRest=()=>{

    setFormData('');
    setFormErrors({
      partyName: "",
    address1: "",
    email: "",
    mobileNo: "",
    iecNo: "",
    entityId: ""
    })
    document.getElementById('partyName').classList.remove('error-border');
    document.getElementById('address1').classList.remove('error-border');
    document.getElementById('email').classList.remove('error-border');
    document.getElementById('mobileNo').classList.remove('error-border');
    document.getElementById('iecNo').classList.remove('error-border');
    document.getElementById('entityId').classList.remove('error-border');

  }

  return (
    <div className='container' style={{ backgroundColor: "#F8F8F8" }}>
        <Card className='MyCard' >
        <h6 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '1%', paddingRight: '-50px' }}>
    <FontAwesomeIcon
      icon={faPeopleGroup}
      style={{
        marginRight: '8px',
        color: 'black', // Set the color to golden
      }}
    />
Add New Party
  </h6>
            
      <Form onSubmit={handleSubmit} >
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Party Name</Form.Label>*
              <Form.Control id='partyName' type="text" name="partyName" value={formData.partyName} onChange={handleChange} />
              <div style={{ color: 'red' }} className="error-message">{formErrors.partyName}</div>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Address 1</Form.Label>
              <Form.Control type="text" id='address1' name="address1" value={formData.address1} onChange={handleChange} />
              <div style={{ color: 'red' }} className="error-message">{formErrors.address1}</div>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group md={4}>
              <Form.Label>Address 2</Form.Label>
              <Form.Control type="text" name="address2" value={formData.address2} onChange={handleChange} />

            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col md={4}>
            <Form.Group>
              <Form.Label>Address 3</Form.Label>
              <Form.Control type="text" name="address3" value={formData.address3} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={4}>


<Form.Group>
                <Form.Label>Country</Form.Label>*
                <Form.Control
                  as="select"
                  name="country"
                  value={formData.country}
                  onChange={(e) => {
                    handleChange(e);
                    handleCountryChange(e);
                  }}
                >
                  <option value="">Select Country</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
          </Col>

<Col md={4}>
        <Form.Group>
                <Form.Label>State</Form.Label>*
                <Form.Control
                  as="select"
                  name="state"
                  value={formData.state}
                  onChange={(e) => {
                    handleChange(e);
                    handleStateChange(e);
                  }}
                >
                  <option value="">Select State</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
          </Col>
         
        </Row>
        <Row>

        <Col md={4}>
          <Form.Group>
                <Form.Label>City</Form.Label>*
                <Form.Control
                  as="select"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                >
                  <option value="">Select City</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
          </Col>
         <Col md={4}>
            <Form.Group>
              <Form.Label>PIN</Form.Label>
              <Form.Control type="text" name="pin" value={formData.pin} onChange={handleChange} />
            </Form.Group>
          </Col>
          
          <Col md={4}>
            <Form.Group>
              <Form.Label>Unit Admin Name</Form.Label>*
              <Form.Control type="text" name="unitAdminName" value={formData.unitAdminName} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col md={4}>
            <Form.Group>
              <Form.Label>Unit Type</Form.Label>*
              <Form.Control as='select' name='unitType' value={formData.unitType} onChange={handleChange}>
                  <option value=''>Select Unit Type</option>
                  <option value='SEEPZ Unit'>SEEPZ Unit</option>
                  <option value='DGDC Unit'>DGDC Unit</option>
                  <option value='Non-SEEPZ Unit'>Non-SEEPZ Unit</option>
                  {/* Add more options as needed */}
                </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
          <Form.Group>
            <Form.Label>Email</Form.Label>*
            <Form.Control
              type="text"
              name="email"
              id='email'
              value={formData.email}
              onChange={handleChange}
              onBlur={() => validateEmail(formData.email)}
            />
            {/* Display error message if email is invalid */}
          
            <div style={{ color: 'red' }} className="error-message">{formErrors.email}</div>
          </Form.Group>

          </Col>
          <Col md={4}>
          <Form.Group>
            <Form.Label>Phone No</Form.Label>
            <Form.Control
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              onBlur={() => validateNumber(formData.phoneNo)}
            />
            {/* Display error message if phone number is invalid */}
           
          </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col md={4}>
            
          <Form.Group>
            <Form.Label>Mobile No</Form.Label>*
            <Form.Control
              type="text"
              name="mobileNo"
              id='mobileNo'
              value={formData.mobileNo}
              onChange={handleChange}
              onBlur={() => validateNumber(formData.mobileNo)}
            />
            {/* Display error message if mobile number is invalid */}
            <div style={{ color: 'red' }} className="error-message">{formErrors.mobileNo}</div>
          </Form.Group>

          </Col>
        <Col md={4}>
            <Form.Group>
              <Form.Label>Party Code</Form.Label>*
              <Form.Control type="text" name="partyCode" value={formData.partyCode} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>ERP Code</Form.Label>*
              <Form.Control type="text" name="erpCode" value={formData.erpCode} onChange={handleChange} />
            </Form.Group>
          </Col>
         
        </Row>
        <Row> 
        <Col md={4}>
            <Form.Group>
              <Form.Label>Credit Limit</Form.Label>*
              <Form.Control type="number" name="creditLimit" value={formData.creditLimit} onChange={handleChange} />
            </Form.Group>
          </Col>
        <Col md={4}>
            <Form.Group>
              <Form.Label>IEC No</Form.Label>*
              <Form.Control type="text" name="iecNo" id='iecNo' value={formData.iecNo} onChange={handleChange} />
              <div style={{ color: 'red' }} className="error-message">{formErrors.iecNo}</div>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Entity ID</Form.Label>*
              <Form.Control type="text" name="entityId" id='entityId' value={formData.entityId} onChange={handleChange} />
              <div style={{ color: 'red' }} className="error-message">{formErrors.entityId}</div>
            </Form.Group>
          </Col>
         
        </Row>
        <Row>
        <Col md={4}>
            <Form.Group>
              <Form.Label>PAN No</Form.Label>*
              <Form.Control type="text" name="panNo" value={formData.panNo} onChange={handleChange} />
            </Form.Group>
          </Col>
        <Col md={4}>
            <Form.Group>
              <Form.Label>GST No</Form.Label>*
              <Form.Control type="text" name="gstNo" value={formData.gstNo} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>LOA Number</Form.Label>*
              <Form.Control type="text" name="loaNumber" value={formData.loaNumber} onChange={handleChange} />
            </Form.Group>
          </Col>
         
        </Row>
     
        <Row>
        <Col md={4}> </Col>
        <Col md={4}>
          <div
            style={{
             
              display: "flex",
              justifyContent: "center", // Center buttons horizontally
            }}
          >
            
       <Button type="submit" variant="outline-success" className='b1'  onClick={handleSubmit}     disabled={loading}>
    <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
    {loading ? 'Submitting...' : 'Submit'}
  </Button>
  <Button type="reset" variant="outline-danger" className='b1' disabled={loading} onClick={handleRest}>
    <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
    Clear
  </Button>
          </div>
        </Col>
             
        </Row>
        
        

      </Form>
      </Card>
    </div>
  );
};
export default PartyForm;