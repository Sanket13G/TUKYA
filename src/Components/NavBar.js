
import React, { useState, useContext, useEffect } from 'react';
import AuthContext from './AuthProvider';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import image from '../Images/RapportSoftlogo.png';
import './Style.css';
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi/";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUser, faSignOutAlt, faUserCheck, faUserCircle, faUserGear, faUserPlus, faUserShield, faUsersRays, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FaUserShield } from 'react-icons/fa';


export default function Head() {

  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    isAuthenticated,
    role,
    companyname,
    branchname,
    login,
    logout,
  } = useContext(AuthContext);



  const [parentMenus, setParentMenus] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [allowedProcessIds, setAllowedProcessIds] = useState([]);
  const navigate = useNavigate();




  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login?message2=You have successfully logged out.');
  };


  const myStyle = {
    height: '40px',
  };

  const handleAddClick = () => {
    navigate(`/parent/changepassword`);
  };
  return (
    <div>

<Navbar  


    
// rushi helped a lot
style={{
  background: '#26a69a',
  boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
  border: '1px solid rgba(0, 0, 0, 0.3)', 
  borderRadius: '0',
  backgroundColor: '#85144b',
  backgroundImage: 'linear-gradient(15deg, #000000 3%,    #00796b 30%,  #00897b 10%,   #00695c 80%  )', 
  backgroundColor: 'rgba(0, 0, 0, 0.3)', 
  backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}}


    
    
    >
  <Container>
  <Navbar.Brand href="#home" className="ml-auto" style={{ marginLeft: '-46px', }} >
  <img
     src="https://raw.githubusercontent.com/ShubhamDeshmukh18/AshteLogistics/main/assets/img/logo%20(1).png"
    alt="DGDC Logo"
    height="30"
  />
</Navbar.Brand>

<SplitButton
  key='start'
  id={`dropdown-button-drop-start`}
  drop='start'
  variant="tertiary"
  // style={{ position: 'absolute', top: '50px', left: '20px', fontSize: '10px', borderRadius: '20px' }}
  title={
    <div style={{ fontSize: '16px', fontFamily: 'Your-Heading-Font', marginRight: '-15px', fontWeight: 'bold' ,color: '#fff'  }}>
      <FontAwesomeIcon icon={faUserGear} style={{ color: 'orange' }} /> {userId}
    </div>
  }
  className='custom-dropdown'
  style={{ fontSize: '10px', borderRadius: '20px', top: '10px', left: '52px' ,color: '#fff'}}
>


      <Dropdown.Item eventKey="1">
        <a className="dropdown-item" href="#" style={{fontSize: '12px', border: '1px solid #ccc', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
          <FontAwesomeIcon icon={faBuilding} style={{ color: 'blue' }} /> <span className='fontwt'>Company &nbsp;</span> {companyname}
        </a>
      </Dropdown.Item>
      <Dropdown.Item eventKey="2">
        <a className="dropdown-item" href="#" style={{ fontSize: '12px', border: '1px solid #ccc', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
          <FontAwesomeIcon icon={faBuilding} style={{ color: 'green' }} /> <span className='fontwt'>Branch &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> {branchname}
        </a>
      </Dropdown.Item>
      <Dropdown.Item eventKey="3">
        <a className="dropdown-item" href="#" style={{ fontSize: '12px', border: '1px solid #ccc', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
          <FontAwesomeIcon icon={faUser} style={{ color: 'purple' }} /> <span className='fontwt'>User </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{username}
        </a>
      </Dropdown.Item>

      <Dropdown.Item eventKey="4">
      <button className="btn btn-success" onClick={handleAddClick} style={{ fontSize: '12px',marginRight:20 }}>
          <FontAwesomeIcon icon={faRefresh} /> Change Password
        </button>
        <button className="btn btn-danger" onClick={handleLogout} style={{ fontSize: '12px' }}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </Dropdown.Item>
    </SplitButton>


  </Container>
</Navbar>


    </div>
  )
}