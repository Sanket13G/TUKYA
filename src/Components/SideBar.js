// import React, { useState, useContext, useEffect } from 'react';
// import AuthContext from './AuthProvider';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import axios from 'axios';
// import image from '../Images/RapportSoftlogo.png';
// import './Style.css';
// import ipaddress from './IpAddress';
// import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
// import { AiOutlineMenu } from 'react-icons/ai';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { Sidebar, SubMenu, Menu, MenuItem } from 'react-pro-sidebar';

// export default function SideBar({ toggleSidebarWidth, width }) {


//     const {
//       jwtToken,
//       userId,
//       username,
//       branchId,
//       companyid,
//       role,
//       companyname,
//       branchname,
//       logintype,
//       logintypeid,
//       userType,
//       isAuthenticated,
//       login,
//       logout,
//     } = useContext(AuthContext);

//   const [parentMenus, setParentMenus] = useState([]);
//   const [collapsed, setCollapsed] = useState(false);
//   const [toggled, setToggled] = useState(false);
//   const navigate = useNavigate();
//   const [allowedProcessIds, setAllowedProcessIds] = useState([]);
//   const [menu, setMenu] = useState([]);
//   const [parent, setParent] = useState([]);
//   const reactPageName = 'Sidebar';
//   const [processId, setProcessId] = useState(null);
//   const [pprocessId, setPprocessId] = useState('');
//   const [pid, setPid] = useState([]);
//   const [pid2, setPid2] = useState('');
//   const [menudata, setMenudata] = useState([]);
//   const [urights, setUrights] = useState([]);

//   const [ToggleKey, SetToggleKey] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const [parent1, setParent1] = useState([]);
//   const [allowedProcessIds1, setAllowedProcessIds1] = useState([]);
//   const [urights1, setUrights1] = useState([]);
//   const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(true);


//   const toggleChildMenu = () => {

//     if (collapsed) {
//       setIsAnyDropdownOpen(false);

//     }
//     setTimeout(() => {
//       setIsAnyDropdownOpen(true);
//     }, 100);

//   };
//   // Define a functional component to handle the hover effect

//   const [isHovered, setIsHovered] = useState(false);

//   // If the user is not authenticated, redirect to the login page
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login?message=You need to be authenticated to access this page.');
//     }
//   }, [isAuthenticated, navigate]);

//   const handleLogout = () => {
//     logout();
//     navigate('/login?message2=You have successful logout.');
//   };


//   const handleMenu = (e) => {
//     setMenu(e.target.value);
//   }


//   const handleCollapsedChange = async () => {


//     setCollapsed(!collapsed);
//     SetToggleKey(!collapsed);
//     toggleSidebarWidth();

//   };

//   const handleToggleSidebar = (value) => {
//     setToggled(value);
//   };

//   const myStyle = {
//     height: '40px',
//   };

//   const logo = null;

//   useEffect(() => {
//     axios
//       .get(`http://${ipaddress}api/parent-menus/${companyid}/${branchId}`)
//       .then((response) => {
//         setParentMenus(response.data);
//         console.log(response);
//       })
//       .catch((error) => {
//         console.error('Error fetching parent menus:', error);
//       });
//   }, [companyid,branchId]);

//   useEffect(() => {
//     axios
//       .get(`http://${ipaddress}user/getallmenu/${userType}/${companyid}/${branchId}`)
//       .then(response => {
//         setAllowedProcessIds(response.data.map(pm => pm.process_Id));
//         console.log(response);
//       })
//       .catch(error => {
//         console.error('Error fetching allowed process IDs:', error);
//       });
//   }, [userType,companyid,branchId]);


//   useEffect(() => {

//     axios
//       .get(`http://${ipaddress}user/get-User/${userType}/${companyid}/${branchId}`)
//       .then((response) => {

//         setUrights(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching branch names:', error);
//       });

//   }, [userType,companyid,branchId]);

//   // console.log('rights ' + urights);

//   useEffect(() => {
//     const fetchParentMenus = async () => {
//       try {
//         // Create an array of promises for each API call
//         const apiRequests = allowedProcessIds.map(processId =>
//           axios.get(`http://${ipaddress}api/parent/${processId}/${companyid}/${branchId}`)
//         );
  
//         // Use Promise.all to wait for all promises to resolve
//         const responses = await Promise.all(apiRequests);
  
//         // Extract data from each response
//         const parentMenus = responses.map(response => response.data);
  
//         // Set parentMenus array to the parent state
//         setParent(parentMenus);
//       } catch (error) {
//         console.error('Error fetching parent menus:', error);
//       }
//     };
  
//     // Check if there are allowed process ids before making the requests
//     if (allowedProcessIds.length > 0) {
//       fetchParentMenus();
//     }
//   }, [allowedProcessIds, companyid, branchId]);

//   useEffect(() => {
//     const fetchParentMenus = async () => {
//       const parentMenus = [];

//       // Loop through each processId in allowedProcessIds
//       for (const processId of pprocessId) {
//         try {
//           const response = await axios.get(`http://${ipaddress}api/parent/${processId}/${companyid}/${branchId}`);
//           parentMenus.push(response.data);
//           // console.log(processId);
//         } catch (error) {
//           console.error(`Error fetching parent menus for processId ${processId}:`, error);
//         }
//       }

//       // console.log(parentMenus);
//       // Filter out empty data from childMenus array (assuming the data is an array)
//       const nonEmptyChildMenus = parentMenus.filter(data => data);

//       const id = nonEmptyChildMenus.map((p) => p.pmenu_Name);
//       setPid2(id);
//       // console.log(nonEmptyChildMenus);
//       setPid(nonEmptyChildMenus);         // Now setting parentMenus array to the parent state
//     };

//     if (pprocessId.length > 0) {
//       fetchParentMenus();
//     }
//   }, [pprocessId]);

//   function isProcessAllowed(processId) {
//     const allowedProcess = urights.find((uright) => uright.process_Id === processId && uright.status === 'A');
//     return !!allowedProcess; // Returns true if an allowed process is found, otherwise false
//   }

//   useEffect(() => {
//     axios
//       .get(`http://${ipaddress}externaluserrights/get-User/${logintype}/${companyid}/${branchId}`)
//       .then(response => {
//         setAllowedProcessIds1(response.data.map(pm => pm.process_Id));
//         setUrights1(response.data);
//         console.log(response);
//       })
//       .catch(error => {
//         console.error('Error fetching allowed process IDs:', error);
//       });
//   }, [userId, companyid, branchId]);

//   useEffect(() => {
//     const fetchParentMenus = async () => {
//       const parentMenus = [];

//       // Loop through each processId in allowedProcessIds
//       for (const processId of allowedProcessIds1) {
//         try {
//           const response = await axios.get(`http://${ipaddress}api/parent/${processId}/${companyid}/${branchId}`);
//           parentMenus.push(response.data);
//           console.log(processId);
//         } catch (error) {
//           console.error(`Error fetching parent menus for processId ${processId}:`, error);
//         }
//       }

//       setParent1(parentMenus); // Now setting parentMenus array to the parent state
//     };

//     if (allowedProcessIds1.length > 0) {
//       fetchParentMenus();
//     }
//   }, [allowedProcessIds1]);


//   function isProcessAllowed1(processId) {
//     const allowedProcess = urights1.find((uright) => uright.process_Id === processId && uright.status === 'A');
//     return !!allowedProcess; // Returns true if an allowed process is found, otherwise false
//   }

//   console.log('logintype ', logintype);

//   return (
//     <>
//       {role === 'ROLE_ADMIN' && (

//         <Sidebar
//           className={`app ${toggled ? 'toggled' : ''} ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
//           style={{
//             height: "100%",
//             position: 'absolute',
//             width: width,
//             // 1 Teal color shade
//             // background: 'linear-gradient(to bottom, #80cbc4, #4db6ac, #26a69a, #009688, #00897b, #00796b, #00695c, #004d40)',

//             // 2 Indigo color shade
//             // background:' linear-gradient(to bottom, #9fa8da, #7986cb, #5c6bc0, #3f51b5, #3949ab, #303f9f, #283593, #1a237e)'

//             //3 Orange color shade 
//             //   background: 'linear-gradient(to bottom, #ffcc80, #ffb74d, #ffa726, #ff9800, #fb8c00, #f57c00, #ef6c00, #e65100)'

//             //  4 Sanguine
//             //  background: 'linear-gradient(to bottom, #D4145A, #FBB03B)'

//             //  Eternal Constance
//             // background: 'linear-gradient(to right, #4E65FF, #92EFFD)',

//             // Navy Blue and Electric Blue
//             background: 'linear-gradient(to right, #4E65FF, #92EFFD)',

//           }}
//           collapsed={collapsed}
//           toggled={toggled}
//           handleToggleSidebar={handleToggleSidebar}
//           handleCollapsedChange={handleCollapsedChange}

//         >
//           <main className='bc2'>
//             <Menu>
//               {collapsed ? (
//                 <MenuItem
//                   icon={<AiOutlineMenu />}
//                   onClick={handleCollapsedChange}
//                   style={{ color: 'orange', }}
//                 ></MenuItem>
//               ) : (
//                 <MenuItem
//                   suffix={<AiOutlineMenu />}
//                   onClick={handleCollapsedChange}
//                   style={{ color: 'orange' }}
//                 >
//                   <div
//                     style={{
//                       padding: "5px",
//                       fontWeight: "bold",
//                       fontSize: 14,
//                       letterSpacing: "1px",

//                     }}
//                   >
//                   </div>
//                 </MenuItem>
//               )}
//             </Menu>
//             <Menu>

//               {parentMenus.map((pm, index) => (
//                 (pm.child_Menu_Status === 'N' && (
//                   <Link className='removestyle' to={`${pm.parent_page_links}?process_id=${pm.processId}`}
//                   >
//                     <MenuItem className="menu-item" style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} key={index} onMouseEnter={() => {
//                       setIsHovered(true);


//                     }}

//                       onMouseLeave={() => {
//                         setIsHovered(false);

//                       }}  >

//                       {pm.pmenu_Name}
//                     </MenuItem>
//                   </Link>
//                 )) || (
//                   pm.child_Menu_Status === 'Y' && (
//                     <div className="submenu" style={{

//                     }}


//                     >


//                       <SubMenu style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' label={pm.pmenu_Name} key={index}

//                       >
//                         {isAnyDropdownOpen ? (
//                           <Dropdown

//                             toggleChildMenu={toggleChildMenu}
//                             parentMenuId={pm.processId} />
//                         ) : null}
//                       </SubMenu>

//                     </div>

//                   )
//                 )
//               ))}
//             </Menu>

//           </main>

//         </Sidebar>

//       )}


// {(userType === 'Cargo Custodian' || userType === 'Cargo Gate' || userType === 'Cargo Official' || userType === 'SEEPZ Custodian' || userType === 'SEEPZ Gate' || userType === 'SEEPZ Official' || userType === 'SEEPZ Vault' || userType === 'Unit/Party') && (
//         <Sidebar
//           className={`app ${toggled ? "toggled" : ""}`}
//           style={{
//             height: "100%",
//             position: 'absolute',
//             width: width,
//             // 1 Teal color shade
//             // background: 'linear-gradient(to bottom, #80cbc4, #4db6ac, #26a69a, #009688, #00897b, #00796b, #00695c, #004d40)',

//             // 2 Indigo color shade
//             // background:' linear-gradient(to bottom, #9fa8da, #7986cb, #5c6bc0, #3f51b5, #3949ab, #303f9f, #283593, #1a237e)'

//             //3 Orange color shade 
//             //   background: 'linear-gradient(to bottom, #ffcc80, #ffb74d, #ffa726, #ff9800, #fb8c00, #f57c00, #ef6c00, #e65100)'

//             //  4 Sanguine
//             //  background: 'linear-gradient(to bottom, #D4145A, #FBB03B)'

//             //  Eternal Constance
//             // background: 'linear-gradient(to right, #4E65FF, #92EFFD)',

//             // Navy Blue and Electric Blue
//             background: 'linear-gradient(to right, #4E65FF, #92EFFD)',

//           }}
//           collapsed={collapsed}
//           toggled={toggled}
//           handleToggleSidebar={handleToggleSidebar}
//           handleCollapsedChange={handleCollapsedChange}
//         >
//           <main className='bc2'>
//             <Menu>
//               {collapsed ? (
//                 <MenuItem
//                   icon={<AiOutlineMenu />}
//                   style={{ color: 'orange', }}
//                   onClick={handleCollapsedChange}
//                 ></MenuItem>
//               ) : (
//                 <MenuItem
//                   suffix={<AiOutlineMenu />}
//                   style={{ color: 'orange', }}
//                   onClick={handleCollapsedChange}
//                 >
//                   <div
//                     style={{
//                       padding: "5px",
//                       fontWeight: "bold",
//                       fontSize: 14,
//                       letterSpacing: "1px"
//                     }}
//                   >
//                   </div>
//                 </MenuItem>
//               )}




//               {parent.map((pm, index) =>
//                 (pm.child_Menu_Status === 'N' && isProcessAllowed(pm.processId)) && (
//                   <Link className='removestyle ' to={`${pm.parent_page_links}?process_id=${pm.processId}`} key={index}>
//                     <MenuItem className="menu-item" style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} key={index} onMouseEnter={() => {
//                       setIsHovered(true);


//                     }}

//                       onMouseLeave={() => {
//                         setIsHovered(false);

//                       }}  >

//                       {pm.pmenu_Name}

//                     </MenuItem>
//                   </Link>
//                 )
//                 ||
//                 (pm.child_Menu_Status === 'Y' && isProcessAllowed(pm.processId)) && (
//                   <div className="submenu">


//                     {isAnyDropdownOpen ? (
//                       <Dropdown2 parentMenuId1={pm.processId}>
//                         {(matchingChildMenus) => matchingChildMenus.length > 0 && (
//                           <SubMenu style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' label={pm.pmenu_Name} key={index}>
//                             {matchingChildMenus}
//                           </SubMenu>
//                         )}
//                       </Dropdown2>
//                     ) : null}

//                   </div>
//                 )
//               )}
//             </Menu>
//           </main>
//         </Sidebar>
//       )}


//       {(logintype === 'Party' || logintype === 'CHA' || logintype === 'Carting Agent' || logintype === 'Console') && (
//         <Sidebar
//           className={`app ${toggled ? "toggled" : ""}`}
//           style={{ height: "100%", position: "absolute",background: 'linear-gradient(to right, #4E65FF, #92EFFD)', }}
//           collapsed={collapsed}
//           toggled={toggled}
//           handleToggleSidebar={handleToggleSidebar}
//           handleCollapsedChange={handleCollapsedChange}
//         >
//           <main className='bc2'>
//             <Menu>
//               {collapsed ? (
//                 <MenuItem
//                   icon={<AiOutlineMenu />}
//                   style={{ color: 'orange', }}
//                   onClick={handleCollapsedChange}
//                 ></MenuItem>
//               ) : (
//                 <MenuItem
//                   suffix={<AiOutlineMenu />}
//                   style={{ color: 'orange', }}
//                   onClick={handleCollapsedChange}
//                 >
//                   <div
//                     style={{
//                       padding: "5px",
//                       fontWeight: "bold",
//                       fontSize: 14,
//                       letterSpacing: "1px"
//                     }}
//                   >
//                   </div>
//                 </MenuItem>
//               )}




//               {parent1.map((pm, index) =>
//                 (pm.child_Menu_Status === 'N' && isProcessAllowed1(pm.processId)) && (
//                   <Link className='removestyle ' to={`${pm.parent_page_links}?process_id=${pm.processId}`} key={index}>
//                     <MenuItem style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' key={index}>

//                       {pm.pmenu_Name}

//                     </MenuItem>
//                   </Link>
//                 )
//                 ||
//                 (pm.child_Menu_Status === 'Y' && isProcessAllowed1(pm.processId)) && (
//                   <div className="submenu">
//                     <Dropdown3 parentMenuId2={pm.processId}>
//                       {(matchingChildMenus1) => matchingChildMenus1.length > 0 && (
//                         <SubMenu style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' label={pm.pmenu_Name} key={index}>
//                           {matchingChildMenus1}
//                         </SubMenu>
//                       )}
//                     </Dropdown3>
//                   </div>
//                 )
//               )}
//             </Menu>
//           </main>
//         </Sidebar>
//       )}

//     </>
//   );
// }







// function Dropdown({ parentMenuId, toggleChildMenu }) {


//   const [childMenus, setChildMenus] = useState([]);
//   const reactPageName = 'Sidebar';
//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     isAuthenticated,
//     role,
//     login,
//     logout,
//   } = useContext(AuthContext);

//   useEffect(() => {
//     axios
//       .get(`http://${ipaddress}api/cm/${parentMenuId}/${companyid}/${branchId}`)
//       .then((response) => {
//         setChildMenus(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching child menus:', error);
//       });
//   }, [parentMenuId, companyid, branchId]);

//   return (
//     <>
//       {childMenus.map((childMenu, index) => (

//         <Link
//           className="removestyle"
//           to={`${childMenu.child_page_links}?process_Id=${childMenu.processId}`}
//           onClick={() => {
//             toggleChildMenu(); // Call toggleChildMenu when a child menu item is clicked
//           }}
//         >
//           <MenuItem style={{ height: 40, background: '#80cbc4' }} className="" key={index}>
//             {childMenu.child_Menu_Name}
//           </MenuItem>
//         </Link>

//       ))}
//     </>
//   );
// }


// function Dropdown2({ parentMenuId1, children, toggleChildMenu }) {

//   const [child, setChild] = useState([]);
//   const reactPageName = 'Sidebar';


//   const [allowedProcessIds, setAllowedProcessIds] = useState([]);
//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     role,
//     companyname,
//     branchname,
//     logintype,
//     logintypeid,
//     userType,
//     isAuthenticated,
//     login,
//     logout,
//   } = useContext(AuthContext);
//   const [urights, setUrights] = useState([]);



//   useEffect(() => {

//     axios
//       .get(`http://${ipaddress}user/get-User/${userType}/${companyid}/${branchId}`)
//       .then((response) => {

//         setUrights(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching branch names:', error);
//       });

//   }, [userType,companyid,branchId]);


//   function isProcessAllowed(processId) {


//     const allowedProcess = urights.find((uright) => uright.process_Id === processId && uright.status === 'A');
//     return !!allowedProcess; // Returns true if an allowed process is found, otherwise false
//   }


//   useEffect(() => {
//     axios
//       .get(`http://${ipaddress}user/getallmenu/${userType}/${companyid}/${branchId}`)
//       .then(response => {
//         setAllowedProcessIds(response.data.map(pm => pm.process_Id));
//       })
//       .catch(error => {
//         console.error('Error fetching allowed process IDs:', error);
//       });
//   }, [userType,companyid,branchId]);






//   useEffect(() => {
//     const fetchChildMenus = async () => {
//       const childMenus = [];

//       // Loop through each processId in allowedProcessIds
//       for (const processId of allowedProcessIds) {
//         try {
//           const response = await axios.get(`http://${ipaddress}api/child/${processId}/${companyid}/${branchId}`);
//           childMenus.push(response.data);
//         } catch (error) {
//           console.error(`Error fetching child menus for processId ${processId}:`, error);
//         }
//       }


//       const matchingChildMenus = childMenus
//         .flat() // Flatten the array of arrays
//         .filter(cm => cm.pprocess_Id === parentMenuId1 && isProcessAllowed(cm.processId)) // Check if parent process is allowed
//         .map((cm, index) => (
//           <Link
//             className='removestyle'
//             value={cm.pprocess_Id}
//             to={`${cm.child_page_links}?process_id=${cm.processId}`}
//             key={index}
//           // onClick={() => {
//           //   toggleChildMenu(); // Call toggleChildMenu when a child menu item is clicked
//           // }}
//           >
//             <MenuItem
//               style={{ height: 40 }}
//               icon={<i id='fs' style={{ color: 'orange' }} className={cm.picons}></i>}
//               className=''
//               key={index}

//             >
//               {cm.child_Menu_Name}
//             </MenuItem>
//           </Link>
//         ));

//       setChild(matchingChildMenus);
//     };

//     if (allowedProcessIds.length > 0) {
//       fetchChildMenus();
//     }
//   }, [allowedProcessIds, parentMenuId1]);

//   return (
//     <>
//       {children(child)}
//     </>
//   );


// }

// function Dropdown3({ parentMenuId2, children }) {

//   const [child, setChild] = useState([]);
//   const reactPageName = 'Sidebar';


//   const [allowedProcessIds, setAllowedProcessIds] = useState([]);
//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     role,
//     companyname,
//     branchname,
//     logintype,
//     logintypeid,
//     isAuthenticated,
//     login,
//     logout,
//   } = useContext(AuthContext);
//   const [urights, setUrights] = useState([]);





//   function isProcessAllowed(processId) {


//     const allowedProcess = urights.find((uright) => uright.process_Id === processId && uright.status === 'A');
//     return !!allowedProcess; // Returns true if an allowed process is found, otherwise false
//   }


//   useEffect(() => {
//     axios
//       .get(`http://${ipaddress}externaluserrights/get-User/${logintype}/${companyid}/${branchId}`)
//       .then(response => {
//         setAllowedProcessIds(response.data.map(pm => pm.process_Id));
//         setUrights(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching allowed process IDs:', error);
//       });
//   }, [logintype, companyid, branchId]);

//   useEffect(() => {
//     const fetchChildMenus = async () => {
//       const childMenus = [];

//       // Loop through each processId in allowedProcessIds
//       for (const processId of allowedProcessIds) {
//         try {
//           const response = await axios.get(`http://${ipaddress}api/child/${processId}/${companyid}/${branchId}`);
//           childMenus.push(response.data);
//         } catch (error) {
//           console.error(`Error fetching child menus for processId ${processId}:`, error);
//         }
//       }

//       const matchingChildMenus1 = childMenus
//         .flat() // Flatten the array of arrays
//         .filter(cm => cm.pprocess_Id === parentMenuId2 && isProcessAllowed(cm.processId)) // Check if parent process is allowed
//         .map((cm, index) => (
//           <Link
//             className='removestyle'
//             value={cm.pprocess_Id}
//             to={`${cm.child_page_links}?process_id=${cm.processId}`}
//             key={index}
//           >
//             <MenuItem
//               style={{ height: 40 }}
//               icon={<i id='fs' style={{ color: 'orange' }} className={cm.picons}></i>}
//               className=''
//               key={index}
//             >
//               {cm.child_Menu_Name}
//             </MenuItem>
//           </Link>
//         ));

//       setChild(matchingChildMenus1);
//     };

//     if (allowedProcessIds.length > 0) {
//       fetchChildMenus();
//     }
//   }, [allowedProcessIds, parentMenuId2]);

//   return (
//     <>
//       {children(child)}
//     </>
//   );
// }

import React, { useState, useContext, useEffect } from 'react';
import AuthContext from './AuthProvider';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import image from '../Images/RapportSoftlogo.png';
import './Style.css';
import ipaddress from './IpAddress';
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom';
import { Sidebar, SubMenu, Menu, MenuItem } from 'react-pro-sidebar';

export default function SideBar({ toggleSidebarWidth, width }) {


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
    isAuthenticated,
    login,
    logout,
  } = useContext(AuthContext);


  console.log("*********User Type *********" + userType);


  const [parentMenus, setParentMenus] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const navigate = useNavigate();
  const [allowedProcessIds, setAllowedProcessIds] = useState([]);
  const [menu, setMenu] = useState([]);
  const [parent, setParent] = useState([]);
  const reactPageName = 'Sidebar';
  const [processId, setProcessId] = useState(null);
  const [pprocessId, setPprocessId] = useState('');
  const [pid, setPid] = useState([]);
  const [pid2, setPid2] = useState('');
  const [menudata, setMenudata] = useState([]);
  const [urights, setUrights] = useState([]);

  const [ToggleKey, SetToggleKey] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [parent1, setParent1] = useState([]);
  const [allowedProcessIds1, setAllowedProcessIds1] = useState([]);
  const [urights1, setUrights1] = useState([]);
  const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(true);


  const toggleChildMenu = () => {

    if (collapsed) {
      setIsAnyDropdownOpen(false);

    }
    setTimeout(() => {
      setIsAnyDropdownOpen(true);
    }, 100);

  };
  // Define a functional component to handle the hover effect

  const [isHovered, setIsHovered] = useState(false);


  // If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  // const handleLogout = () => {
  //   logout();
  //   navigate('/login?message2=You have successful logout.');
  // };




  // useEffect(() => {
  //   axios
  //     .get(`http://${ipaddress}user/getallmenu/${userType}/${companyid}/${branchId}`)
  //     .then(response => {
  //       setAllowedProcessIds(response.data.map(pm => pm.process_Id));
  //       // console.log(response);

  //       console.log("User type s all menus ");
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching allowed process IDs:', error);
  //     });
  // }, [userType,companyid,branchId]);


  // useEffect(() => {

  //   axios
  //     .get(`http://${ipaddress}user/get-User/${userType}/${companyid}/${branchId}`)
  //     .then((response) => {

  //       setUrights(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching branch names:', error);
  //     });

  // }, [userType,companyid,branchId]);





  // const handleMenu = (e) => {
  //   setMenu(e.target.value);
  // }


  const handleCollapsedChange = async () => {


    setCollapsed(!collapsed);
    SetToggleKey(!collapsed);
    toggleSidebarWidth();

  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  // const myStyle = {
  //   height: '40px',
  // };

  useEffect(() => {

    if (role === 'ROLE_ADMIN') {
      axios
        .get(`http://${ipaddress}api/parent-menus/${companyid}/${branchId}`)
        .then((response) => {
          setParentMenus(response.data);
          // console.log(response);
        })
        .catch((error) => {
          console.error('Error fetching parent menus:', error);
        });
    }

    if (logintype === 'Party' || logintype === 'CHA' || logintype === 'Carting Agent' || logintype === 'Console') {
      axios
        .get(`http://${ipaddress}api/parent-menus/${companyid}/${branchId}/${logintype}/loginType`)
        .then((response) => {
          setParentMenus(response.data);
          // console.log(response);
        })
        .catch((error) => {
          console.error('Error fetching parent menus:', error);
        });
    }



    // (userType === 'Cargo Custodian' || userType === 'Cargo Gate' || userType === 'Cargo Official' || userType === 'SEEPZ Custodian' || userType === 'SEEPZ Gate' || userType === 'SEEPZ Official' || userType === 'SEEPZ Vault' || userType === 'Unit/Party'
    console.log("Calling API 11");
    if (userType && userType.trim() !== '' && userType === 'Cargo Custodian' || userType === 'Cargo Gate' || userType === 'Cargo Official' || userType === 'SEEPZ Custodian' || userType === 'SEEPZ Gate' || userType === 'SEEPZ Official' || userType === 'SEEPZ Vault' || userType === 'Unit/Party' || userType === 'Accounts User') {
      // console.log("User Ids ParentMenus");
      console.log("Calling API 22");

      axios.get(`http://${ipaddress}api/parent-menus/${companyid}/${branchId}/${userType}/byUserType`,)
        .then((response) => {
          setParentMenus(response.data);
          // console.log("User Ids ParentMenus");

          // console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching parent menus:', error);
        });

      console.log("API Called");
    }

  }, [companyid, branchId]);

  // useEffect(() => {  
  //   // if(userType != null)
  //   // { 
  //   axios
  //     .get(`http://${ipaddress}api/parent-menus/${companyid}/${branchId}/byUserType`,{params:userType})
  //     .then((response) => {
  //       setParentMenus(response.data);
  //       console.log("User Ids ParentMenus");

  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching parent menus:', error);
  //     });
  //   // }
  // }, [companyid,branchId,userType]);





  // // console.log('rights ' + urights);

  // useEffect(() => {
  //   const fetchParentMenus = async () => {
  //     try {
  //       // Create an array of promises for each API call
  //       // const apiRequests = allowedProcessIds.map(processId =>
  //       //   axios.get(`http://${ipaddress}api/parent/${processId}/${companyid}/${branchId}`)
  //       // );

  //       // const parentMenus = [];

  //       try {
  //         const response = await axios.post(`http://${ipaddress}api/parentTest/${companyid}/${branchId}`, allowedProcessIds);
  //         parentMenus.push(response.data);

  //         setParent(response.data);

  //       } catch (error) {
  //         console.error(`Error fetching child menus for processId ${allowedProcessIds}:`, error);
  //       };


  //       // console.log("****** received Parent ****");

  //       // console.log(parentMenus);
  //       // Use Promise.all to wait for all promises to resolve
  //       // const responses = await Promise.all(apiRequests);

  //       // Extract data from each response
  //       // const parentMenus = responses.map(response => response.data);

  //       // Set parentMenus array to the parent state
  //       // setParent(parentMenus);
  //     } catch (error) {
  //       console.error('Error fetching parent menus:', error);
  //     }
  //   };

  //   // Check if there are allowed process ids before making the requests
  //   if (allowedProcessIds.length > 0) {
  //     fetchParentMenus();
  //   }
  // }, [allowedProcessIds, companyid, branchId]);

  // useEffect(() => {
  //   const fetchParentMenus = async () => {
  //     const parentMenus = [];
  //     // Loop through each processId in allowedProcessIds
  //     // for (const processId of pprocessId) {
  //     //   try {
  //     //     const response = await axios.get(`http://${ipaddress}api/parent/${processId}/${companyid}/${branchId}`);
  //     //     parentMenus.push(response.data);
  //     //     // console.log(processId);
  //     //   } catch (error) {
  //     //     console.error(`Error fetching parent menus for processId ${processId}:`, error);
  //     //   }
  //     // }


  //     try {
  //       const response = await axios.post(`http://${ipaddress}api/parentTest/${companyid}/${branchId}`, pprocessId);
  //       parentMenus.push(response.data);

  //     } catch (error) {
  //       console.error(`Error fetching child menus for processId ${pprocessId}:`, error);
  //     };


  //     // console.log(parentMenus);
  //     // Filter out empty data from childMenus array (assuming the data is an array)
  //     const nonEmptyChildMenus = parentMenus.filter(data => data);

  //     const id = nonEmptyChildMenus.map((p) => p.pmenu_Name);
  //     setPid2(id);
  //     // console.log(nonEmptyChildMenus);
  //     setPid(nonEmptyChildMenus);         // Now setting parentMenus array to the parent state
  //   };

  //   if (pprocessId.length > 0) {
  //     fetchParentMenus();
  //   }
  // }, [pprocessId]);

  // function isProcessAllowed(processId) {
  //   const allowedProcess = urights.find((uright) => uright.process_Id === processId && uright.status === 'A');
  //   return !!allowedProcess; // Returns true if an allowed process is found, otherwise false
  // }

  // useEffect(() => {
  //   axios
  //     .get(`http://${ipaddress}externaluserrights/get-User/${logintype}/${companyid}/${branchId}`)
  //     .then(response => {
  //       setAllowedProcessIds1(response.data.map(pm => pm.process_Id));
  //       setUrights1(response.data);
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching allowed process IDs:', error);
  //     });
  // }, [userId, companyid, branchId]);

  // useEffect(() => {
  //   const fetchParentMenus = async () => {
  //     const parentMenus = [];


  //     try {
  //       const response = await axios.post(`http://${ipaddress}api/parentTest/${companyid}/${branchId}`, allowedProcessIds);
  //       parentMenus.push(response.data);

  //     } catch (error) {
  //       console.error(`Error fetching child menus for processId ${allowedProcessIds}:`, error);
  //     };



  // //     // Loop through each processId in allowedProcessIds
  // //     // for (const processId of allowedProcessIds1) {
  // //     //   try {
  // //     //     const response = await axios.get(`http://${ipaddress}api/parent/${processId}/${companyid}/${branchId}`);
  // //     //     parentMenus.push(response.data);
  // //     //     console.log(processId);
  // //     //   } catch (error) {
  // //     //     console.error(`Error fetching parent menus for processId ${processId}:`, error);
  // //     //   }
  // //     // }

  //     setParent1(parentMenus); // Now setting parentMenus array to the parent state
  //   };

  //   if (allowedProcessIds1.length > 0) {
  //     fetchParentMenus();
  //   }
  // }, [allowedProcessIds1]);


  // function isProcessAllowed1(processId) {
  //   const allowedProcess = urights1.find((uright) => uright.process_Id === processId && uright.status === 'A');
  //   return !!allowedProcess; // Returns true if an allowed process is found, otherwise false
  // }

  // console.log('logintype ', logintype);

  return (
    <>


      {/* {(userType === 'Cargo Custodian' || userType === 'Cargo Gate' || userType === 'Cargo Official' || userType === 'SEEPZ Custodian' || userType === 'SEEPZ Gate' || userType === 'SEEPZ Official' || userType === 'SEEPZ Vault' || userType === 'Unit/Party') && (
        <Sidebar
          className={`app ${toggled ? "toggled" : ""}`}
          style={{
            height: "100%",
            position: 'absolute',
            width: width,
            background: 'linear-gradient(to right, #4E65FF, #92EFFD)',

          }}
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
        >
          <main className='bc2'>
            <Menu>
              {collapsed ? (
                <MenuItem
                  icon={<AiOutlineMenu />}
                  style={{ color: 'orange', }}
                  onClick={handleCollapsedChange}
                ></MenuItem>
              ) : (
                <MenuItem
                  suffix={<AiOutlineMenu />}
                  style={{ color: 'orange', }}
                  onClick={handleCollapsedChange}
                >
                  <div
                    style={{
                      padding: "5px",
                      fontWeight: "bold",
                      fontSize: 14,
                      letterSpacing: "1px"
                    }}
                  >
                  </div>
                </MenuItem>
              )}
              {parent.map((pm, index) =>
                (pm.child_Menu_Status === 'N' && isProcessAllowed(pm.processId)) && (
                  <Link className='removestyle ' to={`${pm.parent_page_links}?process_id=${pm.processId}`} key={index}>
                    <MenuItem className="menu-item" style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} key={index} onMouseEnter={() => {
                      setIsHovered(true);
                    }}
                      onMouseLeave={() => {
                        setIsHovered(false);
                      }}  >

                      {pm.pmenu_Name}

                    </MenuItem>
                  </Link>
                )
                ||
                (pm.child_Menu_Status === 'Y' && isProcessAllowed(pm.processId)) && (
                  <div className="submenu">


                    {isAnyDropdownOpen ? (
                      <Dropdown2 parentMenuId1={pm.processId}>
                        {(matchingChildMenus) => matchingChildMenus.length > 0 && (
                          <SubMenu style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' label={pm.pmenu_Name} key={index}>
                            {matchingChildMenus}
                          </SubMenu>
                        )}
                      </Dropdown2>
                    ) : null}

                  </div>
                )
              )}
            </Menu>
          </main>
        </Sidebar>
      )} */}



      {(userType === 'Cargo Custodian' || userType === 'Cargo Gate' || userType === 'Cargo Official' || userType === 'SEEPZ Custodian' || userType === 'SEEPZ Gate' || userType === 'SEEPZ Official' || userType === 'SEEPZ Vault' || userType === 'Unit/Party' || userType === 'Accounts User') && (

        <Sidebar
          className={`app ${toggled ? 'toggled' : ''} ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
          style={{
            height: "100%",
            position: 'absolute',
            width: width,
            background: 'linear-gradient(to right, #4E65FF, #92EFFD)',

          }}
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}

        >
          <main className='bc2'>
            <Menu>
              {collapsed ? (
                <MenuItem
                  icon={<AiOutlineMenu />}
                  onClick={handleCollapsedChange}
                  style={{ color: 'orange', }}
                ></MenuItem>
              ) : (
                <MenuItem
                  suffix={<AiOutlineMenu />}
                  onClick={handleCollapsedChange}
                  style={{ color: 'orange' }}
                >
                  <div
                    style={{
                      padding: "5px",
                      fontWeight: "bold",
                      fontSize: 14,
                      letterSpacing: "1px",

                    }}
                  >
                  </div>
                </MenuItem>
              )}
            </Menu>
            <Menu>

              {parentMenus.map((pm, index) => (
                (pm.child_Menu_Status === 'N' && (
                  <Link className='removestyle' to={`${pm.parent_page_links}?process_id=${pm.processId}`}
                  >
                    <MenuItem className="menu-item" style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} key={index} onMouseEnter={() => {
                      setIsHovered(true);
                    }}
                      onMouseLeave={() => {
                        setIsHovered(false);
                      }}  >

                      {pm.pmenu_Name}
                    </MenuItem>
                  </Link>
                )) || (
                  pm.child_Menu_Status === 'Y' && (
                    <div className="submenu" style={{

                    }}
                    >
                      <SubMenu style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' label={pm.pmenu_Name} key={index}

                      >
                        {isAnyDropdownOpen ? (
                          <DropdownUserType
                            toggleChildMenu={toggleChildMenu}
                            parentMenuId={pm.processId} />
                        ) : null}
                      </SubMenu>

                    </div>

                  )
                )
              ))}
            </Menu>

          </main>

        </Sidebar>

      )}



















      {role === 'ROLE_ADMIN' && (

        <Sidebar
          className={`app ${toggled ? 'toggled' : ''} ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
          style={{
            height: "100%",
            position: 'absolute',
            width: width,
            background: 'linear-gradient(to right, #4E65FF, #92EFFD)',

          }}
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}

        >
          <main className='bc2'>
            <Menu>
              {collapsed ? (
                <MenuItem
                  icon={<AiOutlineMenu />}
                  onClick={handleCollapsedChange}
                  style={{ color: 'orange', }}
                ></MenuItem>
              ) : (
                <MenuItem
                  suffix={<AiOutlineMenu />}
                  onClick={handleCollapsedChange}
                  style={{ color: 'orange' }}
                >
                  <div
                    style={{
                      padding: "5px",
                      fontWeight: "bold",
                      fontSize: 14,
                      letterSpacing: "1px",

                    }}
                  >
                  </div>
                </MenuItem>
              )}
            </Menu>
            <Menu>

              {parentMenus.map((pm, index) => (
                (pm.child_Menu_Status === 'N' && (
                  <Link className='removestyle' to={`${pm.parent_page_links}?process_id=${pm.processId}`}
                  >
                    <MenuItem className="menu-item" style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} key={index} onMouseEnter={() => {
                      setIsHovered(true);


                    }}

                      onMouseLeave={() => {
                        setIsHovered(false);

                      }}  >

                      {pm.pmenu_Name}
                    </MenuItem>
                  </Link>
                )) || (
                  pm.child_Menu_Status === 'Y' && (
                    <div className="submenu" style={{

                    }}


                    >


                      <SubMenu style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' label={pm.pmenu_Name} key={index}

                      >
                        {isAnyDropdownOpen ? (
                          <Dropdown
                            toggleChildMenu={toggleChildMenu}
                            parentMenuId={pm.processId} />
                        ) : null}
                      </SubMenu>

                    </div>

                  )
                )
              ))}
            </Menu>

          </main>

        </Sidebar>

      )}





{(logintype === 'Party' || logintype === 'CHA' || logintype === 'Carting Agent' || logintype === 'Console') && (

<Sidebar
  className={`app ${toggled ? 'toggled' : ''} ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
  style={{
    height: "100%",
    position: 'absolute',
    width: width,
    background: 'linear-gradient(to right, #4E65FF, #92EFFD)',

  }}
  collapsed={collapsed}
  toggled={toggled}
  handleToggleSidebar={handleToggleSidebar}
  handleCollapsedChange={handleCollapsedChange}

>
  <main className='bc2'>
    <Menu>
      {collapsed ? (
        <MenuItem
          icon={<AiOutlineMenu />}
          onClick={handleCollapsedChange}
          style={{ color: 'orange', }}
        ></MenuItem>
      ) : (
        <MenuItem
          suffix={<AiOutlineMenu />}
          onClick={handleCollapsedChange}
          style={{ color: 'orange' }}
        >
          <div
            style={{
              padding: "5px",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",

            }}
          >
          </div>
        </MenuItem>
      )}
    </Menu>
    <Menu>

      {parentMenus.map((pm, index) => (
        (pm.child_Menu_Status === 'N' && (
          <Link className='removestyle' to={`${pm.parent_page_links}?process_id=${pm.processId}`}
          >
            <MenuItem className="menu-item" style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} key={index} onMouseEnter={() => {
              setIsHovered(true);
            }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}  >

              {pm.pmenu_Name}
            </MenuItem>
          </Link>
        )) || (
          pm.child_Menu_Status === 'Y' && (
            <div className="submenu" style={{

            }}
            >
              <SubMenu style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' label={pm.pmenu_Name} key={index}

              >
                {isAnyDropdownOpen ? (
                  <DropdownLoginType
                    toggleChildMenu={toggleChildMenu}
                    parentMenuId={pm.processId} />
                ) : null}
              </SubMenu>

            </div>

          )
        )
      ))}
    </Menu>

  </main>

</Sidebar>

)}

















{/* 

      {(logintype === 'Party' || logintype === 'CHA' || logintype === 'Carting Agent' || logintype === 'Console') && (
        <Sidebar
          className={`app ${toggled ? "toggled" : ""}`}
          style={{ height: "100%", position: "absolute", background: 'linear-gradient(to right, #4E65FF, #92EFFD)', }}
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
        >
          <main className='bc2'>
            <Menu>
              {collapsed ? (
                <MenuItem
                  icon={<AiOutlineMenu />}
                  style={{ color: 'orange', }}
                  onClick={handleCollapsedChange}
                ></MenuItem>
              ) : (
                <MenuItem
                  suffix={<AiOutlineMenu />}
                  style={{ color: 'orange', }}
                  onClick={handleCollapsedChange}
                >
                  <div
                    style={{
                      padding: "5px",
                      fontWeight: "bold",
                      fontSize: 14,
                      letterSpacing: "1px"
                    }}
                  >
                  </div>
                </MenuItem>
              )}




              {parent1.map((pm, index) =>
                (pm.child_Menu_Status === 'N' && isProcessAllowed1(pm.processId)) && (
                  <Link className='removestyle ' to={`${pm.parent_page_links}?process_id=${pm.processId}`} key={index}>
                    <MenuItem style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' key={index}>

                      {pm.pmenu_Name}

                    </MenuItem>
                  </Link>
                )
                ||
                (pm.child_Menu_Status === 'Y' && isProcessAllowed1(pm.processId)) && (
                  <div className="submenu">
                    <Dropdown3 parentMenuId2={pm.processId}>
                      {(matchingChildMenus1) => matchingChildMenus1.length > 0 && (
                        <SubMenu style={{ height: 40, color: 'orange' }} icon={<i id='fs' style={{ color: 'orange' }} class={pm.picons}></i>} className='' label={pm.pmenu_Name} key={index}>
                          {matchingChildMenus1}
                        </SubMenu>
                      )}
                    </Dropdown3>
                  </div>
                )
              )}
            </Menu>
          </main>
        </Sidebar>
      )} */}

    </>
  );
}




function DropdownLoginType({ parentMenuId, toggleChildMenu }) {


  const [childMenus, setChildMenus] = useState([]);
  const reactPageName = 'Sidebar';
  const {
    branchId,
    companyid,
    userType,
    logintype
  } = useContext(AuthContext);

  console.log("Calling Child Menu API");


  useEffect(() => {
    axios
      .get(`http://${ipaddress}api/childMenus/${parentMenuId}/${companyid}/${branchId}/${logintype}/byLoginTypeType`)
      .then((response) => {
        setChildMenus(response.data);
        console.log(response.data);
        console.log("IN Child Menu API");
      })
      .catch((error) => {
        console.error('Error fetching child menus:', error);
      });
  }, [parentMenuId, companyid, branchId]);



  return (
    <>
      {childMenus.map((childMenu, index) => (

        <Link
          className="removestyle"
          to={`${childMenu.child_page_links}?process_Id=${childMenu.processId}`}
          onClick={() => {
            toggleChildMenu(); // Call toggleChildMenu when a child menu item is clicked
          }}
        >
          <MenuItem style={{ height: 40, background: '#80cbc4' }} className="" key={index}>
            {childMenu.child_Menu_Name}
          </MenuItem>
        </Link>

      ))}
    </>
  );
}










function DropdownUserType({ parentMenuId, toggleChildMenu }) {


  const [childMenus, setChildMenus] = useState([]);
  const reactPageName = 'Sidebar';
  const {
    branchId,
    companyid,
    userType,
  } = useContext(AuthContext);

  console.log("Calling Child Menu API");


  useEffect(() => {
    axios
      .get(`http://${ipaddress}api/childMenus/${parentMenuId}/${companyid}/${branchId}/${userType}/byUserType`)
      .then((response) => {
        setChildMenus(response.data);
        console.log(response.data);
        console.log("IN Child Menu API");
      })
      .catch((error) => {
        console.error('Error fetching child menus:', error);
      });
  }, [parentMenuId, companyid, branchId]);



  return (
    <>
      {childMenus.map((childMenu, index) => (

        <Link
          className="removestyle"
          to={`${childMenu.child_page_links}?process_Id=${childMenu.processId}`}
          onClick={() => {
            toggleChildMenu(); // Call toggleChildMenu when a child menu item is clicked
          }}
        >
          <MenuItem style={{ height: 40, background: '#80cbc4' }} className="" key={index}>
            {childMenu.child_Menu_Name}
          </MenuItem>
        </Link>

      ))}
    </>
  );
}












function Dropdown({ parentMenuId, toggleChildMenu }) {


  const [childMenus, setChildMenus] = useState([]);
  const reactPageName = 'Sidebar';
  const {
    jwtToken,
    userId,
    username,
    branchId,
    companyid,
    isAuthenticated,
    role,
    login,
    logout,
  } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://${ipaddress}api/cm/${parentMenuId}/${companyid}/${branchId}`)
      .then((response) => {
        setChildMenus(response.data);
      })
      .catch((error) => {
        console.error('Error fetching child menus:', error);
      });
  }, [parentMenuId, companyid, branchId]);

  return (
    <>
      {childMenus.map((childMenu, index) => (

        <Link
          className="removestyle"
          to={`${childMenu.child_page_links}?process_Id=${childMenu.processId}`}
          onClick={() => {
            toggleChildMenu(); // Call toggleChildMenu when a child menu item is clicked
          }}
        >
          <MenuItem style={{ height: 40, background: '#80cbc4' }} className="" key={index}>
            {childMenu.child_Menu_Name}
          </MenuItem>
        </Link>

      ))}
    </>
  );
}


// function Dropdown2({ parentMenuId1, children, toggleChildMenu }) {

//   const [child, setChild] = useState([]);
//   const reactPageName = 'Sidebar';


//   const [allowedProcessIds, setAllowedProcessIds] = useState([]);
//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     role,
//     companyname,
//     branchname,
//     logintype,
//     logintypeid,
//     userType,
//     isAuthenticated,
//     login,
//     logout,
//   } = useContext(AuthContext);
//   const [urights, setUrights] = useState([]);



//   // useEffect(() => {

//   //   axios
//   //     .get(`http://${ipaddress}user/get-User/${userType}/${companyid}/${branchId}`)
//   //     .then((response) => {

//   //       setUrights(response.data);
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error fetching branch names:', error);
//   //     });

//   // }, [userType, companyid, branchId]);


//   function isProcessAllowed(processId) {
//     const allowedProcess = urights.find((uright) => uright.process_Id === processId && uright.status === 'A');
//     return !!allowedProcess; // Returns true if an allowed process is found, otherwise false
//   }


//   // useEffect(() => {
//   //   axios
//   //     .get(`http://${ipaddress}user/getallmenu/${userType}/${companyid}/${branchId}`)
//   //     .then(response => {
//   //       setAllowedProcessIds(response.data.map(pm => pm.process_Id));
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching allowed process IDs:', error);
//   //     });
//   // }, [userType, companyid, branchId]);




//   // const [childMenus ,setchildMenus ] = useState([]);

//   useEffect(() => {
//     const fetchChildMenus = async () => {

//       const childMenus = [];

//       // console.log("********** Allowed Process Ids ************ ");
//       // console.log(allowedProcessIds);

//       // Loop through each processId in allowedProcessIds
//       // for (const processId of allowedProcessIds) {
//       //   try {
//       //     const response = await axios.get(`http://${ipaddress}api/child/${processId}/${companyid}/${branchId}`);
//       //     childMenus.push(response.data);
//       //   } catch (error) {
//       //     console.error(`Error fetching child menus for processId ${processId}:`, error);
//       //   }


//       // }
//       try {
//         const response = await axios.post(`http://${ipaddress}api/childs/${companyid}/${branchId}/${userType}`);
//         childMenus.push(response.data);


//         console.log();
//       } catch (error) {
//         console.error(`Error fetching child menus for processId ${allowedProcessIds}:`, error);
//       };



//       const matchingChildMenus = childMenus
//         .flat() // Flatten the array of arrays
//         .filter(cm => cm.pprocess_Id === parentMenuId1 && isProcessAllowed(cm.processId)) // Check if parent process is allowed
//         .map((cm, index) => (
//           <Link
//             className='removestyle'
//             value={cm.pprocess_Id}
//             to={`${cm.child_page_links}?process_id=${cm.processId}`}
//             key={index}
//           // onClick={() => {
//           //   toggleChildMenu(); // Call toggleChildMenu when a child menu item is clicked
//           // }}
//           >
//             <MenuItem
//               style={{ height: 40 }}
//               icon={<i id='fs' style={{ color: 'orange' }} className={cm.picons}></i>}
//               className=''
//               key={index}

//             >
//               {cm.child_Menu_Name}
//             </MenuItem>
//           </Link>
//         ));

//       setChild(matchingChildMenus);
//     };

//     if (allowedProcessIds.length > 0) {
//       fetchChildMenus();
//     }
//   }, [allowedProcessIds, parentMenuId1]);

//   return (
//     <>
//       {children(child)}
//     </>
//   );


// }

// function Dropdown3({ parentMenuId2, children }) {

//   const [child, setChild] = useState([]);
//   const reactPageName = 'Sidebar';


//   const [allowedProcessIds, setAllowedProcessIds] = useState([]);
//   const {
//     jwtToken,
//     userId,
//     username,
//     branchId,
//     companyid,
//     role,
//     companyname,
//     branchname,
//     logintype,
//     logintypeid,
//     isAuthenticated,
//     login,
//     logout,
//   } = useContext(AuthContext);
//   const [urights, setUrights] = useState([]);





//   function isProcessAllowed(processId) {


//     const allowedProcess = urights.find((uright) => uright.process_Id === processId && uright.status === 'A');
//     return !!allowedProcess; // Returns true if an allowed process is found, otherwise false
//   }


//   useEffect(() => {
//     axios
//       .get(`http://${ipaddress}externaluserrights/get-User/${logintype}/${companyid}/${branchId}`)
//       .then(response => {
//         setAllowedProcessIds(response.data.map(pm => pm.process_Id));
//         setUrights(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching allowed process IDs:', error);
//       });
//   }, [logintype, companyid, branchId]);

//   useEffect(() => {
//     const fetchChildMenus = async () => {
//       const childMenus = [];

//       // Loop through each processId in allowedProcessIds
//       // for (const processId of allowedProcessIds) {
//       //   try {
//       //     const response = await axios.get(`http://${ipaddress}api/child/${processId}/${companyid}/${branchId}`);
//       //     childMenus.push(response.data);
//       //   } catch (error) {
//       //     console.error(`Error fetching child menus for processId ${processId}:`, error);
//       //   }
//       // }

//       try {
//         const response = await axios.post(`http://${ipaddress}api/childTest/${companyid}/${branchId}`, allowedProcessIds);
//         childMenus.push(response.data);

//       } catch (error) {
//         console.error(`Error fetching child menus for processId ${allowedProcessIds}:`, error);
//       };




//       const matchingChildMenus1 = childMenus
//         .flat() // Flatten the array of arrays
//         .filter(cm => cm.pprocess_Id === parentMenuId2 && isProcessAllowed(cm.processId)) // Check if parent process is allowed
//         .map((cm, index) => (
//           <Link
//             className='removestyle'
//             value={cm.pprocess_Id}
//             to={`${cm.child_page_links}?process_id=${cm.processId}`}
//             key={index}
//           >
//             <MenuItem
//               style={{ height: 40 }}
//               icon={<i id='fs' style={{ color: 'orange' }} className={cm.picons}></i>}
//               className=''
//               key={index}
//             >
//               {cm.child_Menu_Name}
//             </MenuItem>
//           </Link>
//         ));

//       setChild(matchingChildMenus1);
//     };

//     if (allowedProcessIds.length > 0) {
//       fetchChildMenus();
//     }
//   }, [allowedProcessIds, parentMenuId2]);

//   return (
//     <>
//       {children(child)}
//     </>
//   );
// }

