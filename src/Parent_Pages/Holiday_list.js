// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import ipaddress from "../Components/IpAddress";
// import { faCalendarCheck, faCalendarDay, faCalendarDays, faCalendarPlus, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
// import Button from 'react-bootstrap/Button';
// import { Pagination } from "react-bootstrap";
// import {
//   Row,
//   Col,
//   Input,
//   Form,

//   FormGroup,
//   Label,
//   Card,
//   CardBody,
//   Modal,
//   Table,
//   Container,
//   ModalBody,
//   ModalFooter,
//   ModalHeader,
// } from "reactstrap";
// import { toast } from "react-toastify";
// import AuthContext from "../Components/AuthProvider";
// import DatePicker from "react-datepicker";
// export default function Holiday_list() {

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

//     login,
//     logout,
//   } = useContext(AuthContext);
  
//   const [holidays, setHolidays] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);

//   const [editHoliday, setEditHoliday] = useState({});
//   const [newHoliday, setNewHoliday] = useState({
//     companyId: companyid,
//     branchId: branchId,
//     holidayId: "",
//     holidayName: "",
//     holidayDate: "",
//     holidayDay: "",
//     createdBy: userId,
//     createdDate: "",
//     editedBy: userId,
//     editedDate: "",
//     approvedBy: userId,
//     approvedDate: "",
//     status: "",
//   });
//   const reactPageName = 'Holiday List';
//   const resetForm = () => {
//     setNewHoliday({
//       companyId: "",
//       branchId: "",
//       holidayId: "",
//       holidayName: "",
//       holidayDate: "",
//       holidayDay: "",
//       createdBy: "",
//       createdDate: "",
//       editedBy: "",
//       editedDate: "",
//       approvedBy: "",
//       approvedDate: "",
//       status: "",
//     });
//   };

//   useEffect(() => {
//     fetchHolidays();
//   }, []);

//   const fetchHolidays = async () => {
//     try {
//       const response = await axios.get(
//         `http://${ipaddress}holiday/allHoliday/${companyid}/${branchId}`
//       );
//       setHolidays(response.data);
//     } catch (error) {
//       console.error("Error fetching holidays:", error);
//     }
//   };

//   const toggleModal = () => {
//     setModalOpen(!modalOpen);
//     setFormErrors(
//       {
//         holidayName: "",
//         holidayDay: "",
//         holidayDate: ""
//       }
//     )
//     setNewHoliday(
//       {
//         companyId: companyid,
//         branchId: branchId,
//         holidayId: "",
//         holidayName: "",
//         holidayDate: "",
//         holidayDay: "",
//         createdBy: userId,
//         createdDate: "",
//         editedBy: userId,
//         editedDate: "",
//         approvedBy: userId,
//         approvedDate: "",
//         status: "",
//       }
//     );
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNewHoliday({
//       ...newHoliday,
//       [name]: value,
//     });
//     if (name === "holidayDate") {
//       const formattedDate = new Date(value).toISOString().split("T")[0];
//       setNewHoliday({
//         ...newHoliday,
//         [name]: formattedDate,
//       });
//     } else {
//       setNewHoliday({
//         ...newHoliday,
//         [name]: value,
//       });
//     }
//   };

//   const [formErrors, setFormErrors] = useState({
//     holidayName: "",
//     holidayDay: "",
//     holidayDate: ""

//   });

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const errors = {};

//     if (!newHoliday.holidayName) {
//       errors.holidayName = "Holiday name is required.";
//     }

//     if (!newHoliday.holidayDay) {
//       errors.holidayDay = "Holiday day is required.";
//     }
//     if (!newHoliday.holidayDate) {
//       errors.holidayDate = "Holiday date is required.";
//     }

//     if (!newHoliday.holidayName) {
//       document.getElementById('holidayName').classList.add('error-border');
//     }

//     if (!newHoliday.holidayDay) {
//       document.getElementById('holidayDay').classList.add('error-border');
//     }
//     if (!newHoliday.holidayDate) {
//       document.getElementById('holidayDate').classList.add('error-border');
//     }
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }
//     try {
//       await axios.post(`http://${ipaddress}holiday/addHoliday`, newHoliday, {
//         headers: {
//           'React-Page-Name': reactPageName
//         }
//       });
//       fetchHolidays();
//       toggleModal();
//       resetForm();
//       toast.success("Data saved successfully!", {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     } catch (error) {
//       toast.error("Error Adding  data!", {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
//   };
//   // const handleEdit = (holiday) => {

//   //   };
//   // const handleEdit = (holiday) => {
//   //   setEditHoliday(holiday);
//   //   toggleEditModal();
//   // };

//   const formatDate = (inputDate) => {
//     const date = new Date(inputDate);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${day}/${month}/${year}`;

//   };

//   const handleEdit = (holiday) => {

//     console.log("Received holiday date:", holiday.holidayDate);
//     const formattedDate = formatDate(holiday.holidayDate);
//     console.log("Formatted date:", formattedDate);

//     setEditHoliday({
//       companyId: holiday.companyId,
//       branchId: holiday.branchId,
//       holidayId: holiday.holidayId,
//       holidayName: holiday.holidayName,
//       holidayDate: new Date(holiday.holidayDate),
//       holidayDay: holiday.holidayDay,
//       createdBy: holiday.createdBy,
//       createdDate: holiday.createdDate,
//       editedBy: holiday.editedBy,
//       editedDate: holiday.editedDate,
//       approvedBy: holiday.approvedBy,
//       approvedDate: holiday.approvedDate,
//       status: holiday.status,
//     });
//     toggleEditModal();
//   };

//   const toggleEditModal = () => {
//     setEditModalOpen(!editModalOpen);
//     setFormErrors(
//       {
//         holidayName: "",
//         holidayDay: "",
//         holidayDate: ""
//       }
//     )
//   };

//   const handleEditInputChange = (event) => {
//     const { name, value } = event.target;
//     setEditHoliday({
//       ...editHoliday,
//       [name]: value,
//     });
//   };

//   const handleEditSubmit = async (event) => {
//     event.preventDefault();
//     const errors = {};

//     if (!editHoliday.holidayName) {
//       errors.holidayName = "Holiday name is required.";
//     }

//     if (!editHoliday.holidayDay) {
//       errors.holidayDay = "Holiday day is required.";
//     }
//     if (!editHoliday.holidayDate) {
//       errors.holidayDate = "Holiday date is required.";
//     }

//     if (!editHoliday.holidayName) {
//       document.getElementById('holidayName').classList.add('error-border');
//     }

//     if (!editHoliday.holidayDay) {
//       document.getElementById('holidayDay').classList.add('error-border');
//     }
//     if (!editHoliday.holidayDate) {
//       document.getElementById('holidayDate').classList.add('error-border');
//     }
//     if (Object.keys(errors).length > 0) {
//       setFormErrors(errors);
//       return;
//     }
//     try {
//       await axios.put(
//         `http://${ipaddress}holiday/update/${editHoliday.holidayId}`,
//         editHoliday, {
//         headers: {
//           'React-Page-Name': reactPageName
//         }
//       }

//       );
//       fetchHolidays();
//       toggleEditModal();
//       // Optionally, reset the editHoliday state here
//       toast.success("Data Updated successfully!", {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     } catch (error) {
//       toast.error("Error updating data!", {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
//   };

//   const handleDelete = async (holidayId) => {
//     try {
//       await axios.put(`http://${ipaddress}holiday/delete/${companyid}/${branchId}/${holidayId}`);
//       fetchHolidays();
//       toast.error("Data Deleted successfully!", {
//         position: "top-center",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     } catch (error) {
//       toast.error("Error deleting  data!", {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     }
//   };


//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = holidays.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(holidays.length / itemsPerPage);

//   // Function to handle page change
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };
//   const displayPages = () => {
//     const centerPageCount = 5;
//     const middlePage = Math.floor(centerPageCount / 2);
//     let startPage = currentPage - middlePage;
//     let endPage = currentPage + middlePage;
  
//     if (startPage < 1) {
//       startPage = 1;
//       endPage = Math.min(totalPages, centerPageCount);
//     }
  
//     if (endPage > totalPages) {
//       endPage = totalPages;
//       startPage = Math.max(1, totalPages - centerPageCount + 1);
//     }
  
//     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//   };


//   return (
//     <div>
//       {(logintype === 'Party' || logintype === 'Carting Agent' || logintype === 'CHA' || logintype === 'Console') ?(
//         <div className="Container" style={{ backgroundColor: "#f7f7f7" }}>
//       {/* <Container style={{ backgroundColor: "#f7f7f7" }}> */}

//       <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
//         icon={faCalendarDays}
//         style={{
//           marginRight: '8px',
//           color: 'black', // Set the color to golden
//         }}
//       />Holiday List</h5>



//       <Card>
        

//         <CardBody>

//           <div className="table-responsive">
//             <Table className="table table-striped table-hover">
//               <thead style={{ backgroundColor: "#ff9900" }}>
//                 <tr>
//                   <th style={{ backgroundColor: '#BADDDA' }}>Holiday Name</th>
//                   <th style={{ backgroundColor: '#BADDDA' }}>Holiday Date</th>
//                   <th style={{ backgroundColor: '#BADDDA' }}>Holiday Day</th>

                

//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((holiday) => (
//                   <tr key={holiday.holidayId}>
//                     <td>{holiday.holidayName}</td>
//                     <td>{formatDate(holiday.holidayDate)}</td>
//                     <td>{holiday.holidayDay}</td>
                    

//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//           <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//         <Pagination.First onClick={() => handlePageChange(1)} />
//         <Pagination.Prev
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         />
//         <Pagination.Ellipsis />

//         {displayPages().map((pageNumber) => (
//           <Pagination.Item
//             key={pageNumber}
//             active={pageNumber === currentPage}
//             onClick={() => handlePageChange(pageNumber)}
//           >
//             {pageNumber}
//           </Pagination.Item>
//         ))}

//         <Pagination.Ellipsis />
//         <Pagination.Next
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         />
//         <Pagination.Last onClick={() => handlePageChange(totalPages)} />
//       </Pagination>
//         </CardBody>
//       </Card>
  
//     </div>
//       )
//       :
//       (
// <div className="Container" style={{ backgroundColor: "#f7f7f7" }}>
//       {/* <Container style={{ backgroundColor: "#f7f7f7" }}> */}

//       <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
//         icon={faCalendarDays}
//         style={{
//           marginRight: '8px',
//           color: 'black', // Set the color to golden
//         }}
//       />Holiday List</h5>



//       <Card>
//         <div>
//           <Button
//             style={{ float: "right", marginRight: 20, marginTop: '10px' }}
//             type="button"
//             variant="outline-success"
//             onClick={toggleModal}
//           >
//             <FontAwesomeIcon icon={faCalendarDay} style={{ marginRight: '5px' }} />
//             Add Holiday
//           </Button>

//         </div>

//         <CardBody>

//           <div className="table-responsive">
//             <Table className="table table-striped table-hover">
//               <thead style={{ backgroundColor: "#ff9900" }}>
//                 <tr>
//                   <th style={{ backgroundColor: '#BADDDA' }}>Holiday Name</th>
//                   <th style={{ backgroundColor: '#BADDDA' }}>Holiday Date</th>
//                   <th style={{ backgroundColor: '#BADDDA' }}>Holiday Day</th>

//                   <th style={{ backgroundColor: '#BADDDA' }} className="text-center">Action</th>

//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((holiday) => (
//                   <tr key={holiday.holidayId}>
//                     <td>{holiday.holidayName}</td>
//                     <td>{formatDate(holiday.holidayDate)}</td>
//                     <td>{holiday.holidayDay}</td>
//                     {/* Add more table data */}
//                     <td className="text-center">
//                       <Button
//                         onClick={() => handleEdit(holiday)}

//                         variant="outline-primary"
//                         style={{ marginRight: 5 }}
//                       >
//                         <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />

//                       </Button>
//                       <Button
//                         onClick={() => handleDelete(holiday.holidayId)}
//                         variant="outline-danger"
//                       >
//                         <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />

//                       </Button>
//                     </td>

//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//           <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//         <Pagination.First onClick={() => handlePageChange(1)} />
//         <Pagination.Prev
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         />
//         <Pagination.Ellipsis />

//         {displayPages().map((pageNumber) => (
//           <Pagination.Item
//             key={pageNumber}
//             active={pageNumber === currentPage}
//             onClick={() => handlePageChange(pageNumber)}
//           >
//             {pageNumber}
//           </Pagination.Item>
//         ))}

//         <Pagination.Ellipsis />
//         <Pagination.Next
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         />
//         <Pagination.Last onClick={() => handlePageChange(totalPages)} />
//       </Pagination>
//         </CardBody>
//       </Card>
//       {/* </Container> */}
//       <Modal isOpen={modalOpen} toggle={toggleModal} style={{ maxWidth: 900 }}>
//         <ModalHeader
//           toggle={toggleModal}
//           style={{
//             backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//             boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//             border: '1px solid rgba(0, 0, 0, 0.3)',
//             borderRadius: '0',
//             backgroundColor: '#85144b',
//             backgroundColor: 'rgba(0, 0, 0, 0.3)',
//             backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
//             backgroundSize: 'cover',
//             backgroundRepeat: 'no-repeat',
//             //backgroundPosition: 'center',
//             backgroundPosition: 'center',
//           }}
//         >
//           Add Holiday <FontAwesomeIcon icon={faCalendarPlus} style={{ marginLeft: '9px', color: '' }} />
//         </ModalHeader>
//         <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/gray-abstract-wireframe-technology-background_53876-101941.jpg?t=st=1694859932~exp=1694860532~hmac=c704ef93c8530b989dccebbdde9c9b8e125a8fee9bee69658b6a940969620270)', backgroundSize: 'cover' }}>
//           <Form onSubmit={handleSubmit} style={{}} id="myfrom">

//             {/* <div style={{paddingLeft:18,paddingRight:9,paddingTop:9}}>
//              <h5 style={{float:"left"}}>Add Holiday</h5>
//              </div> */}
//             <CardBody>
//               <Row>
//                 <Col md={4}>
//                   <FormGroup>
//                     <div style={{ float: "left" }}>
//                       <Label
//                         htmlFor="holidayName"
//                         style={{ fontWeight: "bold" }}
//                       >
//                         Holiday Name
//                       </Label>
//                     </div>
//                     <Input
//                       type="text"
//                       id="holidayName"
//                       name="holidayName"
//                       placeholder="Holiday Name"
//                       value={newHoliday.holidayName}
//                       onChange={handleInputChange}
//                       required
//                     />
//                     <div style={{ color: 'red' }} className="error-message">{formErrors.holidayName}</div>
//                   </FormGroup>
//                 </Col>
//                 <Col md={4}>
//                   <FormGroup>
//                     <div div style={{ float: "left", marginRight: '10px' }}>
//                       <Label
//                         htmlFor="holidayDate"
//                         style={{ fontWeight: "bold" }}
//                       >
//                         Holiday Date
//                       </Label>
//                     </div>
//                     <DatePicker
//                       showIcon
//                       selected={newHoliday.holidayDate} // Set the selected date to BillGDate
//                       onChange={(date) => {
//                         if (date) {
//                           setNewHoliday({ ...newHoliday, holidayDate: date });
//                         } else {
//                           setNewHoliday({ ...newHoliday, holidayDate: null });
//                         }
//                       }}
//                       dateFormat="dd/MM/yyyy"
//                       wrapperClassName="custom-react-datepicker-wrapper"
//                       value={newHoliday.holidayDate}
//                       placeholder="Select Date"
//                       id="holidayDate"
//                       className="form-control border-right-0 inputField"
//                       customInput={<input style={{ width: '100%' }} />}
//                       required
//                     />
//                     <div style={{ color: 'red' }} className="error-message">{formErrors.holidayDate}</div>
//                     {/* <FontAwesomeIcon icon={faCalendarDays} style={{  marginLeft:'10px' }} /> */}
//                   </FormGroup>
//                 </Col>
//                 <Col md={4}>
//                   <FormGroup>
//                     <div style={{ float: "left" }}>
//                       <Label
//                         htmlFor="holidayDay"
//                         style={{ fontWeight: "bold" }}
//                       >
//                         Holiday Day
//                       </Label>
//                     </div>
//                     <Input
//                       type="text"
//                       id="holidayDay"
//                       name="holidayDay"
//                       placeholder="Holiday Day"
//                       value={newHoliday.holidayDay}
//                       onChange={handleInputChange}
//                       required
//                     />
//                     <div style={{ color: 'red' }} className="error-message">{formErrors.holidayDay}</div>
//                   </FormGroup>
//                 </Col>
//               </Row>
//             </CardBody>

//           </Form>
//         </ModalBody>
//         <ModalFooter style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
//           <Button variant="outline-success" onClick={handleSubmit} >
//             <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
//             Save
//           </Button>
//           <Button variant="outline-danger" onClick={toggleModal} >
//             <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>

//       {/* #ffebcc // orange
//       #f7f7f7 // grey
//       #ebf2f9// light blue */}

//       <Modal
//         isOpen={editModalOpen}
//         toggle={toggleEditModal}
//         style={{ maxWidth: 900 }}
//       >
//         <ModalHeader
//           toggle={toggleEditModal}
//           style={{
//             backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
//             boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
//             border: '1px solid rgba(0, 0, 0, 0.3)',
//             borderRadius: '0',
//             backgroundColor: '#85144b',
//             backgroundColor: 'rgba(0, 0, 0, 0.3)',
//             backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
//             backgroundSize: 'cover',
//             backgroundRepeat: 'no-repeat',
//             //backgroundPosition: 'center',
//             backgroundPosition: 'center',
//           }}
//         >
//           Edit Holiday  <FontAwesomeIcon icon={faCalendarCheck} style={{ marginRight: "10px" }} />
//         </ModalHeader>
//         <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/gray-abstract-wireframe-technology-background_53876-101941.jpg?t=st=1694859932~exp=1694860532~hmac=c704ef93c8530b989dccebbdde9c9b8e125a8fee9bee69658b6a940969620270)', backgroundSize: 'cover' }}>
//           <Form onSubmit={handleEditSubmit} id="myfrom">
//             {/* <Row>
//   <Col>
//   <FormGroup>
//         <Label htmlFor="holidayId">Holiday ID:</Label>
//         <Input
//           type="text"
//           id="holidayId"
//           name="holidayId"
//           placeholder="Holiday ID"
//           value={editHoliday.holidayId}
//           onChange={handleEditInputChange}
//           required
//           disabled
//         />
//       </FormGroup>
    
//       </Col>
//       <Col>
//       <FormGroup>
//         <Label htmlFor="companyId">Company ID:</Label>
//         <Input
//           type="text"
//           id="companyId"
//           name="companyId"
//           placeholder="Company ID"
//           value={editHoliday.companyId}
//           onChange={handleEditInputChange}
//           required
//         />
//       </FormGroup>
//       </Col>
//       <Col>
//       <FormGroup>
//         <Label htmlFor="branchId">Branch ID:</Label>
//         <Input
//           type="text"
//           id="branchId"
//           name="branchId"
//           placeholder="Branch ID"
//           value={editHoliday.branchId}
//           onChange={handleEditInputChange}
        
//         />
//       </FormGroup>
//       </Col>
//       </Row> */}
//             <Row>
//               <Col md={4}>
//                 <FormGroup>
//                   <Label htmlFor="holidayName">Holiday Name</Label>
//                   <Input
//                     type="text"
//                     id="holidayName"
//                     name="holidayName"
//                     placeholder="Holiday Name"
//                     value={editHoliday.holidayName}
//                     onChange={handleEditInputChange} // Keep this line if you need to update input value
//                     required
//                   />
//                   <div style={{ color: 'red' }} className="error-message">{formErrors.holidayName}</div>

//                 </FormGroup>
//               </Col>
//               <Col md={4}>
//                 <FormGroup style={{ marginRight: 10 }}>
//                   <div div style={{ float: "left", marginRight: '10px' }}>
//                     <Label
//                       htmlFor="holidayDate"

//                     >
//                       Holiday Date
//                     </Label>
//                   </div>

//                   <DatePicker
//                     selected={editHoliday.holidayDate} // Set the selected date to BillGDate
//                     onChange={(date) => {
//                       if (date) {
//                         // const formattedDate = date.toISOString();
//                         setEditHoliday({ ...editHoliday, holidayDate: date });
//                       } else {
//                         setEditHoliday({ ...editHoliday, holidayDate: null });
//                       }
//                     }}
//                     dateFormat="dd/MM/yyyy"
//                     value={editHoliday.holidayDate}
//                     id="holidayDate"
//                     className="form-control border-right-0 inputField"
//                     customInput={<input />}
//                     required
//                   />
//                   <div style={{ color: 'red' }} className="error-message">{formErrors.holidayDate}</div>


//                 </FormGroup>
//               </Col>
//               <Col md={4}>
//                 <FormGroup>
//                   <Label htmlFor="holidayDay">Holiday Day</Label>
//                   <Input
//                     type="text"
//                     id="holidayDay"
//                     name="holidayDay"
//                     placeholder="Holiday Day"
//                     value={editHoliday.holidayDay}
//                     onChange={handleEditInputChange}
//                     required
//                   />
//                   <div style={{ color: 'red' }} className="error-message">{formErrors.holidayDay}</div>

//                 </FormGroup>
//               </Col>
//             </Row>
//             {/* Add more fields */}
//             {/* <Row>
//       <Col>
//       <FormGroup>
//         <Label htmlFor="createdBy">Created By:</Label>
//         <Input
//           type="text"
//           id="createdBy"
//           name="createdBy"
//           placeholder="Created By"
//           value={editHoliday.createdBy}
//           onChange={handleEditInputChange}
//         />
//       </FormGroup>
//       </Col> */}
//             {/* <Col>
//       <FormGroup>
//         <Label htmlFor="createdDate">Created Date:</Label>
//         <Input
//           type="date"
//           id="createdDate"
//           name="createdDate"
//           placeholder="Created Date"
//           value={editHoliday.createdDate}
//           onChange={handleEditInputChange}
//         />
//       </FormGroup>
//       </Col> */}
//             {/* Add more fields */}
//             {/* <Col>
//       <FormGroup>
//         <Label htmlFor="editedBy">Created Date:</Label>
//         <Input
//           type="text"
//           id="editedBy"
//           name="editedBy"
//           placeholder="edited By"
//           value={editHoliday.editedBy}
//           onChange={handleEditInputChange}
//         />
//       </FormGroup>
//       </Col>
//       </Row> */}
//             {/* <Row>
//       <Col>
//       <FormGroup>
//         <Label htmlFor="editedDate">Created Date:</Label>
//         <Input
//           type="date"
//           id="editedDate"
//           name="editedDate"
//           placeholder="Edited Date"
//           value={editHoliday.editedDate}
//           onChange={handleEditInputChange}
//         />
//       </FormGroup>
//       </Col> */}
//             {/* <Col>
//       <FormGroup>
//         <Label htmlFor="approvedBy">Created Date:</Label>
//         <Input
//           type="text"
//           id="approvedBy"
//           name="approvedBy"
//           placeholder="Approved By"
//           value={editHoliday.approvedBy}
//           onChange={handleEditInputChange}
//         />
//       </FormGroup>
//       </Col>
//       <Col>
//       <FormGroup>
//         <Label htmlFor="approvedDate">Created Date:</Label>
//         <Input
//           type="date"
//           id="approvedDate"
//           name="approvedDate"
//           placeholder="Approved Date"
//           value={editHoliday.approvedDate}
//           onChange={handleEditInputChange}
//         />
//       </FormGroup>
//       </Col>
//       </Row>
//       <Col>
//       <FormGroup>
//         <Label htmlFor="status">Created Date:</Label>
//         <Input
//           type="text"
//           id="status"
//           name="status"
//           placeholder="Status"
//           value={editHoliday.status}
//           onChange={handleEditInputChange}
//         />
//       </FormGroup>
//       </Col> */}
//           </Form>
//         </ModalBody>
//         <ModalFooter style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>




//           <button
//             className="btn btn-outline-success btn-margin"
//             onClick={handleEditSubmit}
//           >
//             <FontAwesomeIcon icon={faSave} style={{ marginRight: "10px" }} />
//             Save
//           </button>

//           <button
//             className="btn btn-outline-danger btn-margin"
//             onClick={toggleEditModal}
//           ><i class="bi bi-arrow-right-circle-fill" style={{ marginRight: "10px" }}></i>
//             Cancel
//           </button>
//         </ModalFooter>
//       </Modal>
//     </div>
//       )

//       }
//     </div>
    
//   );
// };



import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ipaddress from "../Components/IpAddress";
import { faCalendarCheck, faCalendarDay, faCalendarDays, faCalendarPlus, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { Pagination } from "react-bootstrap";
import {
  Row,
  Col,
  Input,
  Form,

  FormGroup,
  Label,
  Card,
  CardBody,
  Modal,
  Table,
  Container,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { toast } from "react-toastify";
import AuthContext from "../Components/AuthProvider";
import DatePicker from "react-datepicker";
export default function Holiday_list() {

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

    login,
    logout,
  } = useContext(AuthContext);
  
  const [holidays, setHolidays] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [editHoliday, setEditHoliday] = useState({});
  const [newHoliday, setNewHoliday] = useState({
    companyId: companyid,
    branchId: branchId,
    holidayId: "",
    holidayName: "",
    holidayDate: "",
    holidayDay: "",
    createdBy: userId,
    createdDate: "",
    editedBy: userId,
    editedDate: "",
    approvedBy: userId,
    approvedDate: "",
    status: "",
  });
  const reactPageName = 'Holiday List';
  const resetForm = () => {
    setNewHoliday({
      companyId: "",
      branchId: "",
      holidayId: "",
      holidayName: "",
      holidayDate: "",
      holidayDay: "",
      createdBy: "",
      createdDate: "",
      editedBy: "",
      editedDate: "",
      approvedBy: "",
      approvedDate: "",
      status: "",
    });
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get(
        `http://${ipaddress}holiday/allHoliday/${companyid}/${branchId}`
      );
      setHolidays(response.data);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setFormErrors(
      {
        holidayName: "",
        holidayDay: "",
        holidayDate: ""
      }
    )
    setNewHoliday(
      {
        companyId: companyid,
        branchId: branchId,
        holidayId: "",
        holidayName: "",
        holidayDate: "",
        holidayDay: "",
        createdBy: userId,
        createdDate: "",
        editedBy: userId,
        editedDate: "",
        approvedBy: userId,
        approvedDate: "",
        status: "",
      }
    );
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewHoliday({
      ...newHoliday,
      [name]: value,
    });
    if (name === "holidayDate") {
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setNewHoliday({
        ...newHoliday,
        [name]: formattedDate,
      });
    } else {
      setNewHoliday({
        ...newHoliday,
        [name]: value,
      });
    }
  };

  const [formErrors, setFormErrors] = useState({
    holidayName: "",
    holidayDay: "",
    holidayDate: ""

  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    if (!newHoliday.holidayName) {
      errors.holidayName = "Holiday name is required.";
    }

    if (!newHoliday.holidayDay) {
      errors.holidayDay = "Holiday day is required.";
    }
    if (!newHoliday.holidayDate) {
      errors.holidayDate = "Holiday date is required.";
    }

    if (!newHoliday.holidayName) {
      document.getElementById('holidayName').classList.add('error-border');
    }

    if (!newHoliday.holidayDay) {
      document.getElementById('holidayDay').classList.add('error-border');
    }
    if (!newHoliday.holidayDate) {
      document.getElementById('holidayDate').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      await axios.post(`http://${ipaddress}holiday/addHoliday`, newHoliday, {
        headers: {
          'React-Page-Name': reactPageName
        }
      });
      fetchHolidays();
      toggleModal();
      resetForm();
      toast.success("Data saved successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error Adding  data!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  // const handleEdit = (holiday) => {

  //   };
  // const handleEdit = (holiday) => {
  //   setEditHoliday(holiday);
  //   toggleEditModal();
  // };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;

  };

  const handleEdit = (holiday) => {

    console.log("Received holiday date:", holiday.holidayDate);
    const formattedDate = formatDate(holiday.holidayDate);
    console.log("Formatted date:", formattedDate);

    setEditHoliday({
      companyId: holiday.companyId,
      branchId: holiday.branchId,
      holidayId: holiday.holidayId,
      holidayName: holiday.holidayName,
      holidayDate: new Date(holiday.holidayDate),
      holidayDay: holiday.holidayDay,
      createdBy: holiday.createdBy,
      createdDate: holiday.createdDate,
      editedBy: holiday.editedBy,
      editedDate: holiday.editedDate,
      approvedBy: holiday.approvedBy,
      approvedDate: holiday.approvedDate,
      status: holiday.status,
    });
    toggleEditModal();
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
    setFormErrors(
      {
        holidayName: "",
        holidayDay: "",
        holidayDate: ""
      }
    )
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditHoliday({
      ...editHoliday,
      [name]: value,
    });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const errors = {};

    if (!editHoliday.holidayName) {
      errors.holidayName = "Holiday name is required.";
    }

    if (!editHoliday.holidayDay) {
      errors.holidayDay = "Holiday day is required.";
    }
    if (!editHoliday.holidayDate) {
      errors.holidayDate = "Holiday date is required.";
    }

    if (!editHoliday.holidayName) {
      document.getElementById('holidayName').classList.add('error-border');
    }

    if (!editHoliday.holidayDay) {
      document.getElementById('holidayDay').classList.add('error-border');
    }
    if (!editHoliday.holidayDate) {
      document.getElementById('holidayDate').classList.add('error-border');
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      await axios.put(
        `http://${ipaddress}holiday/update/${editHoliday.holidayId}`,
        editHoliday, {
        headers: {
          'React-Page-Name': reactPageName
        }
      }

      );
      fetchHolidays();
      toggleEditModal();
      // Optionally, reset the editHoliday state here
      toast.success("Data Updated successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error updating data!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleDelete = async (holidayId) => {
    try {
      await axios.put(`http://${ipaddress}holiday/delete/${companyid}/${branchId}/${holidayId}`);
      fetchHolidays();
      toast.error("Data Deleted successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Error deleting  data!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = holidays.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(holidays.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const displayPages = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage - middlePage;
    let endPage = currentPage + middlePage;
  
    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages, centerPageCount);
    }
  
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - centerPageCount + 1);
    }
  
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };


  return (
    <div>
      {(logintype === 'Party' || logintype === 'Carting Agent' || logintype === 'CHA' || logintype === 'Console') ?(
        <div className="Container" style={{ backgroundColor: "#f7f7f7" }}>
      {/* <Container style={{ backgroundColor: "#f7f7f7" }}> */}

      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
        icon={faCalendarDays}
        style={{
          marginRight: '8px',
          color: 'black', // Set the color to golden
        }}
      />Holiday List</h5>



      <Card>
        

        <CardBody>

          <div className="table-responsive">
            <Table className="table table-striped table-hover">
              <thead style={{ backgroundColor: "#ff9900" }}>
                <tr>
                  <th style={{ backgroundColor: '#BADDDA' }}>Holiday Name</th>
                  <th style={{ backgroundColor: '#BADDDA' }}>Holiday Date</th>
                  <th style={{ backgroundColor: '#BADDDA' }}>Holiday Day</th>

                

                </tr>
              </thead>
              <tbody>
                {currentItems.map((holiday) => (
                  <tr key={holiday.holidayId}>
                    <td>{holiday.holidayName}</td>
                    <td>{formatDate(holiday.holidayDate)}</td>
                    <td>{holiday.holidayDay}</td>
                    

                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Pagination.Ellipsis />

        {displayPages().map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}

        <Pagination.Ellipsis />
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
        </CardBody>
      </Card>
  
    </div>
      )
      :
      (
<div className="Container" style={{ backgroundColor: "#f7f7f7" }}>
      {/* <Container style={{ backgroundColor: "#f7f7f7" }}> */}

      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
        icon={faCalendarDays}
        style={{
          marginRight: '8px',
          color: 'black', // Set the color to golden
        }}
      />Holiday List</h5>



      <Card>
        <div>
          <Button
            style={{ float: "right", marginRight: 20, marginTop: '10px' }}
            type="button"
            variant="outline-success"
            onClick={toggleModal}
          >
            <FontAwesomeIcon icon={faCalendarDay} style={{ marginRight: '5px' }} />
            Add Holiday
          </Button>

        </div>

        <CardBody>

          <div className="table-responsive">
            <Table className="table table-striped table-hover">
              <thead style={{ backgroundColor: "#ff9900" }}>
                <tr>
                  <th style={{ backgroundColor: '#BADDDA' }}>Holiday Name</th>
                  <th style={{ backgroundColor: '#BADDDA' }}>Holiday Date</th>
                  <th style={{ backgroundColor: '#BADDDA' }}>Holiday Day</th>

                  <th style={{ backgroundColor: '#BADDDA' }} className="text-center">Action</th>

                </tr>
              </thead>
              <tbody>
                {currentItems.map((holiday) => (
                  <tr key={holiday.holidayId}>
                    <td>{holiday.holidayName}</td>
                    <td>{formatDate(holiday.holidayDate)}</td>
                    <td>{holiday.holidayDay}</td>
                    {/* Add more table data */}
                    <td className="text-center">
                      <Button
                        onClick={() => handleEdit(holiday)}

                        variant="outline-primary"
                        style={{ marginRight: 5 }}
                      >
                        <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />

                      </Button>
                      <Button
                        onClick={() => handleDelete(holiday.holidayId)}
                        variant="outline-danger"
                      >
                        <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />

                      </Button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <Pagination.Ellipsis />

        {displayPages().map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}

        <Pagination.Ellipsis />
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
        </CardBody>
      </Card>
      {/* </Container> */}
      <Modal isOpen={modalOpen} toggle={toggleModal} style={{ maxWidth: 900 }}>
        <ModalHeader
          toggle={toggleModal}
          style={{
            backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
            boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
            border: '1px solid rgba(0, 0, 0, 0.3)',
            borderRadius: '0',
            backgroundColor: '#85144b',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            //backgroundPosition: 'center',
            backgroundPosition: 'center',
          }}
        >
          Add Holiday <FontAwesomeIcon icon={faCalendarPlus} style={{ marginLeft: '9px', color: '' }} />
        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/gray-abstract-wireframe-technology-background_53876-101941.jpg?t=st=1694859932~exp=1694860532~hmac=c704ef93c8530b989dccebbdde9c9b8e125a8fee9bee69658b6a940969620270)', backgroundSize: 'cover' }}>
          <Form onSubmit={handleSubmit} style={{}} id="myfrom">

            {/* <div style={{paddingLeft:18,paddingRight:9,paddingTop:9}}>
             <h5 style={{float:"left"}}>Add Holiday</h5>
             </div> */}
            <CardBody>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <div style={{ float: "left" }}>
                      <Label
                        htmlFor="holidayName"
                        style={{ fontWeight: "bold" }}
                      >
                        Holiday Name
                      </Label>
                    </div>
                    <Input
                      type="text"
                      id="holidayName"
                      name="holidayName"
                      placeholder="Holiday Name"
                      value={newHoliday.holidayName}
                      onChange={handleInputChange}
                      required
                    />
                    <div style={{ color: 'red' }} className="error-message">{formErrors.holidayName}</div>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <div div style={{ float: "left", marginRight: '10px' }}>
                      <Label
                        htmlFor="holidayDate"
                        style={{ fontWeight: "bold" }}
                      >
                        Holiday Date
                      </Label>
                    </div>
                    <DatePicker
                      showIcon
                      selected={newHoliday.holidayDate} // Set the selected date to BillGDate
                      onChange={(date) => {
                        if (date) {
                          setNewHoliday({ ...newHoliday, holidayDate: date });
                        } else {
                          setNewHoliday({ ...newHoliday, holidayDate: null });
                        }
                      }}
                      dateFormat="dd/MM/yyyy"
                      wrapperClassName="custom-react-datepicker-wrapper"
                      value={newHoliday.holidayDate}
                      placeholder="Select Date"
                      id="holidayDate"
                      className="form-control border-right-0 inputField"
                      customInput={<input style={{ width: '100%' }} />}
                      required
                    />
                    <div style={{ color: 'red' }} className="error-message">{formErrors.holidayDate}</div>
                    {/* <FontAwesomeIcon icon={faCalendarDays} style={{  marginLeft:'10px' }} /> */}
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <div style={{ float: "left" }}>
                      <Label
                        htmlFor="holidayDay"
                        style={{ fontWeight: "bold" }}
                      >
                        Holiday Day
                      </Label>
                    </div>
                    <Input
                      type="text"
                      id="holidayDay"
                      name="holidayDay"
                      placeholder="Holiday Day"
                      value={newHoliday.holidayDay}
                      onChange={handleInputChange}
                      required
                    />
                    <div style={{ color: 'red' }} className="error-message">{formErrors.holidayDay}</div>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>

          </Form>
        </ModalBody>
        <ModalFooter style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>
          <Button variant="outline-success" onClick={handleSubmit} >
            <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
            Save
          </Button>
          <Button variant="outline-danger" onClick={toggleModal} >
            <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '5px' }} />
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

    <Modal
        isOpen={editModalOpen}
        toggle={toggleEditModal}
        style={{ maxWidth: 900 }}
      >
        <ModalHeader
          toggle={toggleEditModal}
          style={{
            backgroundColor: '#80cbc4', color: 'black', fontFamily: 'Your-Heading-Font', textAlign: 'center', background: '#26a69a',
            boxShadow: '0px 5px 10px rgba(0, 77, 64, 0.3)',
            border: '1px solid rgba(0, 0, 0, 0.3)',
            borderRadius: '0',
            backgroundColor: '#85144b',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            //backgroundPosition: 'center',
            backgroundPosition: 'center',
          }}
        >
          Edit Holiday  <FontAwesomeIcon icon={faCalendarCheck} style={{ marginRight: "10px" }} />
        </ModalHeader>
        <ModalBody style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/gray-abstract-wireframe-technology-background_53876-101941.jpg?t=st=1694859932~exp=1694860532~hmac=c704ef93c8530b989dccebbdde9c9b8e125a8fee9bee69658b6a940969620270)', backgroundSize: 'cover' }}>
          <Form onSubmit={handleEditSubmit} id="myfrom">

            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label htmlFor="holidayName">Holiday Name</Label>
                  <Input
                    type="text"
                    id="holidayName"
                    name="holidayName"
                    placeholder="Holiday Name"
                    value={editHoliday.holidayName}
                    onChange={handleEditInputChange} // Keep this line if you need to update input value
                    required
                  />
                  <div style={{ color: 'red' }} className="error-message">{formErrors.holidayName}</div>

                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup style={{ marginRight: 10 }}>
                  <div div style={{ float: "left", marginRight: '10px' }}>
                    <Label
                      htmlFor="holidayDate"

                    >
                      Holiday Date
                    </Label>
                  </div>

                  <DatePicker
                    selected={editHoliday.holidayDate} // Set the selected date to BillGDate
                    onChange={(date) => {
                      if (date) {
                        // const formattedDate = date.toISOString();
                        setEditHoliday({ ...editHoliday, holidayDate: date });
                      } else {
                        setEditHoliday({ ...editHoliday, holidayDate: null });
                      }
                    }}
                    dateFormat="dd/MM/yyyy"
                    value={editHoliday.holidayDate}
                    id="holidayDate"
                    className="form-control border-right-0 inputField"
                    customInput={<input />}
                    required
                  />
                  <div style={{ color: 'red' }} className="error-message">{formErrors.holidayDate}</div>


                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label htmlFor="holidayDay">Holiday Day</Label>
                  <Input
                    type="text"
                    id="holidayDay"
                    name="holidayDay"
                    placeholder="Holiday Day"
                    value={editHoliday.holidayDay}
                    onChange={handleEditInputChange}
                    required
                  />
                  <div style={{ color: 'red' }} className="error-message">{formErrors.holidayDay}</div>

                </FormGroup>
              </Col>
            </Row>
            
          </Form>
        </ModalBody>
        <ModalFooter style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/gradient-wavy-background_23-2149123392.jpg?t=st=1694859409~exp=1694860009~hmac=b397945a9c2d45405ac64956165f76bd10a0eff99334c52cd4c88d4162aad58e)', backgroundSize: 'cover' }}>

          <button
            className="btn btn-outline-success btn-margin"
            onClick={handleEditSubmit}
          >
            <FontAwesomeIcon icon={faSave} style={{ marginRight: "10px" }} />
            Save
          </button>

          <button
            className="btn btn-outline-danger btn-margin"
            onClick={toggleEditModal}
          ><i class="bi bi-arrow-right-circle-fill" style={{ marginRight: "10px" }}></i>
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
      )

      }
    </div>
    
  );
};