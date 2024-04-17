// // import AuthContext from '../Components/AuthProvider';
// // import { useNavigate } from 'react-router-dom';
// // import React, { useEffect, useState, useContext } from 'react';
// // import { Button } from 'react-bootstrap';
// // import '../Components/Style.css';
// // import DatePicker from "react-datepicker";
// // import { Pagination } from "react-bootstrap";
// // import {
// //   Card,
// //   CardBody,
// //   Container,
// //   Row,
// //   Col,
// //   Form,
// //   FormGroup,
// //   Label,
// //   Input,
// //   Table,
// // } from "reactstrap";
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faAngleRight, faAtom, faBolt, faBoxesPacking, faIdBadge, faHandHoldingHand, faHistory, faList, faList12, faListAlt, faPencil, faPlaneDeparture, faPlus, faPlusCircle, faSearch, faUserCircle, faUsersViewfinder, faFileAlt, faEye, faRefresh, faFilePdf, faFileExcel, faArrowsToEye, faStoreAlt } from '@fortawesome/free-solid-svg-icons';
// // import { faEdit } from '@fortawesome/free-solid-svg-icons';
// // import { faTrash } from '@fortawesome/free-solid-svg-icons';
// // import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
// // import InviceService from '../services/InviceService';



// // export default function Stock_at_vault() {

// //   const [stockData, setStockData] = useState([]);
// //   const [searchDate, setSearchDate] = useState('');

// // const [filteredStock,setFilteredStock] = useState([]);
  
// // const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 10; // Number of items to display per page
// //   const totalPages = Math.ceil(filteredStock.length / itemsPerPage);
// //   const handlePageChange = (page) => {
// //     setCurrentPage(page);
// //   };
// //   const startIndex = (currentPage - 1) * itemsPerPage;
// //   const endIndex = startIndex + itemsPerPage;

// // // Calculate the index of the first and last item of the current page
// // const indexOfLastItem = currentPage * itemsPerPage;
// // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   // Slice the array of services to display only the current page's items
// //   const currentfilteredStock = filteredStock.slice(indexOfFirstItem, indexOfLastItem);

// //   // console.warn(currentfilteredImports);
// //   // Pagination items
// //   const paginationItems = [];
// //   for (let number = 1; number <= Math.ceil(filteredStock.length / itemsPerPage); number++) {
// //     paginationItems.push(
// //       <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
// //         {number}
// //       </Pagination.Item>
// //     );
// //   };



// //   const handleSearch = async () => {
// //     if (searchDate) {
// //       const selectedDateJSON = searchDate.toISOString().split('T')[0];
// //       // console.log("Json Search Date" + selectedDateJSON);
// //       const filteredData = stockData.filter(item => {
// //       const itemDate = new Date(item[0]).toISOString().split('T')[0];
// //       return itemDate === selectedDateJSON;
// //       });
// //       setFilteredStock(filteredData);
// //     }
// //     else {
// //       setFilteredStock(stockData);
// //     }
// //   };

// // const resetSearch = async() =>
// // {
// //   setSearchDate('');
// //   getAllData();
// // };



// //   // const handleOptionChange = (event) => {
// //   //   setSelectedOption(event.target.value);
// //   // };
// //   const navigate = useNavigate();
// //   const { isAuthenticated } = useContext(AuthContext);



// //   const {
// //     userId,
// //     branchId,
// //     companyid,
// //   } = useContext(AuthContext);


// //   useEffect(() => {
// //     getAllData();
// //   }, []);

// //   const formatDate2 = (value) => {

// //     if (!value) {
// //       return "";
// //     }
// //     const date = new Date(value);
// //     const day = String(date.getDate()).padStart(2, "0");
// //     const month = String(date.getMonth() + 1).padStart(2, "0");
// //     const year = date.getFullYear();
// //     return `${day}/${month}/${year}`;
// //   };


// //   const getAllData = async () => {
// //     InviceService.getdataForStockAtVault(companyid, branchId).then((response) => {
// //       setFilteredStock(response.data);
// //       setStockData(response.data);     
// //     });


// //   };

// //   // If the user is not authenticated, redirect to the login page

// //   useEffect(() => {

// //     if (!isAuthenticated) {

// //       navigate('/login?message=You need to be authenticated to access this page.');
// //     }
// //   }, [isAuthenticated, navigate]);

// //   return (
// //     <div className='Container'>
// //       <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
// //         icon={faStoreAlt}
// //         style={{
// //           marginRight: '8px',
// //           color: 'black', // Set the color to golden
// //         }}
// //       /> Stock at Vault</h5>
// //       <Card>
// //         <CardBody>
// //           <Row>
// //             <Col md={5}>
// //               <FormGroup>
// //                 <Label className="forlabel" for="branchId">Stock Date</Label>
// //                 <div> {/* Wrap in an input group */}
// //                   <DatePicker
// //                     selected={searchDate}
// //                     onChange={(date) => setSearchDate(date)}
// //                     dateFormat="dd/MM/yyyy"
// //                     wrapperClassName="custom-react-datepicker-wrapper"
// //                     className="form-control"
// //                     customInput={<input style={{ width: '100%' }} />}
// //                   />
// //                 </div>
// //               </FormGroup>
// //             </Col>
// //             <Col style={{ marginTop: 22 }} md={4}>
// //               <Button type="button" className="" variant="outline-primary" style={{ marginTop: '10px', marginRight: 10 }}
// //                 onClick={handleSearch}
// //               >
// //                 <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
// //                 Search
// //               </Button>
// //               <Button type="button" className="" variant="outline-danger" style={{ marginTop: '10px' }}
// //               onClick={resetSearch}
// //               >
// //                 <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
// //                 Reset
// //               </Button>
// //             </Col>
// //           </Row>
// //           <hr />

// //           <div className="table-responsive">
// //             <Table className="table table-bordered custom-table mt-3">

// //               <thead>
// //                 <tr className='text-center'>
// //                   <th style={{ width: '10%', background: '#BADDDA' }} rowSpan="3">Date</th>
// //                   <th style={{ width: '30%', background: '#BADDDA' }} colspan="6">In</th>
// //                   <th style={{ width: '30%', background: '#BADDDA' }} colspan="6">Out</th>
// //                   <th style={{ width: '30%', background: '#BADDDA' }} colspan="6">Stock</th>
// //                   {/* <th style={{ background: '#BADDDA' }}>Edit</th> */}
// //                 </tr>
// //                 <tr className='text-center'>
// //                   <td style={{ background: '#BADDDA' }} colspan="3">Import</td>
// //                   <td style={{ background: '#BADDDA' }} colspan="3">Export</td>
// //                   <td style={{ background: '#BADDDA' }} colspan="3">Import</td>
// //                   <td style={{ background: '#BADDDA' }} colspan="3">Export</td>
// //                   <td style={{ background: '#BADDDA' }} colspan="3">Import</td>
// //                   <td style={{ background: '#BADDDA' }} colspan="3">Export</td>
// //                 </tr>
// //                 <tr className='text-center'>
// //                   <td style={{ background: '#BADDDA' }}>Reg</td>
// //                   <td style={{ background: '#BADDDA' }}>Sub</td>
// //                   <td style={{ background: '#BADDDA' }}>Detention</td>
// //                   <td style={{ background: '#BADDDA' }}>Reg</td>
// //                   <td style={{ background: '#BADDDA' }}>Sub</td>
// //                   <td style={{ background: '#BADDDA' }}>Detention</td>
// //                   <td style={{ background: '#BADDDA' }}>Reg</td>
// //                   <td style={{ background: '#BADDDA' }}>Sub</td>
// //                   <td style={{ background: '#BADDDA' }}>Detention</td>
// //                   <td style={{ background: '#BADDDA' }}>Reg</td>
// //                   <td style={{ background: '#BADDDA' }}>Sub</td>
// //                   <td style={{ background: '#BADDDA' }}>Detention</td>
// //                   <td style={{ background: '#BADDDA' }}>Reg</td>
// //                   <td style={{ background: '#BADDDA' }}>Sub</td>
// //                   <td style={{ background: '#BADDDA' }}>Detention</td>
// //                   <td style={{ background: '#BADDDA' }}>Reg</td>
// //                   <td style={{ background: '#BADDDA' }}>Sub</td>
// //                   <td style={{ background: '#BADDDA' }}>Detention</td>
// //                 </tr>

// //               </thead>
// //               <tbody>

// //                 {currentfilteredStock.map((import2, index) =>

// //                   <tr className={"text-center"}
// //                     key={index}>
// //                     <td className="table-column">{formatDate2(import2[0])}</td>
// //                     <td className="table-column">{import2[2]}</td>
// //                     <td className="table-column">{import2[6]}</td>
// //                     <td className="table-column">{import2[12]}</td>
// //                     <td className="table-column">{import2[4]}</td>
// //                     <td className="table-column">{import2[8]}</td>
// //                     <td className="table-column">{import2[10]}</td>
// //                     <td className="table-column">{import2[1]}</td>
// //                     <td className="table-column">{import2[5]}</td>
// //                     <td className="table-column">{import2[11]}</td>
// //                     <td className="table-column">{import2[3]}</td>
// //                     <td className="table-column">{import2[7]}</td>
// //                     <td className="table-column">{import2[9]}</td>
// //                     <td className="table-column">{import2[2]-import2[1]}</td>
// //                     <td className="table-column">{import2[6]-import2[5]}</td>
// //                     <td className="table-column">{import2[12]-import2[11]}</td>
// //                     <td className="table-column">{import2[4]-import2[3]}</td>
// //                     <td className="table-column">{import2[8]-import2[7]}</td>
// //                     <td className="table-column">{import2[10]-import2[9]}</td>
// //                   </tr>
// //                 )}

// //               </tbody>
// //             </Table>

// //             <Pagination style={{ display: 'flex', justifyContent: 'center' }}>
// //               <Pagination.First onClick={() => handlePageChange(1)} />
// //               <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
// //               {Array.from({ length: totalPages }, (_, i) => (
// //                 <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
// //                   {i + 1}
// //                 </Pagination.Item>
// //               ))}
// //               <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
// //               <Pagination.Last onClick={() => handlePageChange(totalPages)} />
// //             </Pagination>

// //           </div>
// //         </CardBody>
// //       </Card>
// //     </div>
// //   )
// // }


// import AuthContext from '../Components/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import React, { useEffect, useState, useContext } from 'react';
// import { Button } from 'react-bootstrap';
// import '../Components/Style.css';
// import DatePicker from "react-datepicker";
// import { Pagination } from "react-bootstrap";
// import {
//   Card,
//   CardBody,
//   Container,
//   Row,
//   Col,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Table,
// } from "reactstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleRight, faAtom, faBolt, faBoxesPacking, faIdBadge, faHandHoldingHand, faHistory, faList, faList12, faListAlt, faPencil, faPlaneDeparture, faPlus, faPlusCircle, faSearch, faUserCircle, faUsersViewfinder, faFileAlt, faEye, faRefresh, faFilePdf, faFileExcel, faArrowsToEye, faStoreAlt } from '@fortawesome/free-solid-svg-icons';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
// import InviceService from '../services/InviceService';



// export default function Stock_at_vault() {

//   const [stockData, setStockData] = useState([]);
//   const [stockDataDetention, setStockDataDetention] = useState([]);
//   const [searchDate, setSearchDate] = useState('');

//   const [filteredStock, setFilteredStock] = useState([]);
//   const [filteredStockdetention, setFilteredStockdetention] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // Number of items to display per page
//   const totalPages = Math.ceil(filteredStock.length / itemsPerPage);
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   // Calculate the index of the first and last item of the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   // Slice the array of services to display only the current page's items
//   const currentfilteredStock = filteredStock.slice(indexOfFirstItem, indexOfLastItem);

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






//   const [currentPage1, setCurrentPage1] = useState(1);
//   const itemsPerPage1 = 30; // Number of items to display per page

//   const indexOfLastItem1 = currentPage1 * itemsPerPage1;
//   const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
//   const currentItems1 = filteredStockdetention.slice(indexOfFirstItem1, indexOfLastItem1);
//   // const currentItems1 = InvoiceHistoryData.slice(indexOfFirstItem1, indexOfLastItem1);

//   const totalPages1 = Math.ceil(filteredStockdetention.length / itemsPerPage1);
//   const handlePageChange1 = (page) => {
//     setCurrentPage1(page);
//   };

//   const displayPages2 = () => {
//     const centerPageCount = 5;
//     const middlePage = Math.floor(centerPageCount / 2);
//     let startPage = currentPage - middlePage;
//     let endPage = currentPage + middlePage;

//     if (startPage < 1) {
//       startPage = 1;
//       endPage = Math.min(totalPages1, centerPageCount);
//     }
//     if (endPage > totalPages1) {
//       endPage = totalPages1;
//       startPage = Math.max(1, totalPages1 - centerPageCount + 1);
//     }
//     return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
//   };






//   // console.warn(currentfilteredImports);
//   // Pagination items
//   // const paginationItems = [];
//   // for (let number = 1; number <= Math.ceil(filteredStock.length / itemsPerPage); number++) {
//   //   paginationItems.push(
//   //     <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
//   //       {number}
//   //     </Pagination.Item>
//   //   );
//   // };



//   const handleSearch = async () => {
//     if (searchDate) {
//       const selectedDateJSON = searchDate.toISOString().split('T')[0];
//       // console.log("Json Search Date" + selectedDateJSON);
//       setCurrentPage(1);
//       const filteredData = stockData.filter(item => {
//         const itemDate = new Date(item[0]).toISOString().split('T')[0];
//         return itemDate === selectedDateJSON;
//       });
//       setFilteredStock(filteredData);
//     }
//     else {
//       setFilteredStock(stockData);
//     }
//   };

//   const resetSearch = async () => {
//     setCurrentPage(1);
//     setSearchDate('');
//     getAllData();
//   };



//   // const handleOptionChange = (event) => {
//   //   setSelectedOption(event.target.value);
//   // };
//   const navigate = useNavigate();
//   const { isAuthenticated } = useContext(AuthContext);



//   const {
//     userId,
//     branchId,
//     companyid,
//   } = useContext(AuthContext);


//   useEffect(() => {
//     getAllData();
//     getAllDataByDetention();
//   }, []);

//   const formatDate2 = (value) => {

//     if (!value) {
//       return "";
//     }
//     const date = new Date(value);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };


//   const getAllData = async () => {
//     InviceService.getdataForStockAtVault(companyid, branchId).then((response) => {
//       setFilteredStock(response.data);
//       setStockData(response.data);
//     });


//   };


//   const getAllDataByDetention = async () => {
//     InviceService.getdataForStockAtVaultDetention(companyid, branchId).then((response) => {
//       setFilteredStockdetention(response.data);
//       console.log("Detention ");
//       console.log(response.data);
//       setStockDataDetention(response.data);
//     });


//   };

//   // If the user is not authenticated, redirect to the login page

//   useEffect(() => {

//     if (!isAuthenticated) {

//       navigate('/login?message=You need to be authenticated to access this page.');
//     }
//   }, [isAuthenticated, navigate]);

//   return (
//     <div className='Container'>
//       <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
//         icon={faStoreAlt}
//         style={{
//           marginRight: '8px',
//           color: 'black', // Set the color to golden
//         }}
//       /> Stock at Vault</h5>
//       <Card>
//         <CardBody>
//           <Row>
//             <Col md={5}>
//               <FormGroup>
//                 <Label className="forlabel" for="branchId">Stock Date</Label>
//                 <div> {/* Wrap in an input group */}
//                   <DatePicker
//                     selected={searchDate}
//                     onChange={(date) => setSearchDate(date)}
//                     dateFormat="dd/MM/yyyy"
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     className="form-control"
//                     customInput={<input style={{ width: '100%' }} />}
//                   />
//                 </div>
//               </FormGroup>
//             </Col>
//             <Col style={{ marginTop: 22 }} md={4}>
//               <Button type="button" className="" variant="outline-primary" style={{ marginTop: '10px', marginRight: 10 }}
//                 onClick={handleSearch}
//               >
//                 <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
//                 Search
//               </Button>
//               <Button type="button" className="" variant="outline-danger" style={{ marginTop: '10px' }}
//                 onClick={resetSearch}
//               >
//                 <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
//                 Reset
//               </Button>
//             </Col>
//           </Row>
//           <hr />

//           <div className="table-responsive">
//             <Table className="table table-bordered custom-table mt-3">

//               <thead>
//                 <tr className='text-center'>
//                   <th style={{ width: '10%', background: '#BADDDA' }} rowSpan="3">Date</th>
//                   <th style={{ width: '30%', background: '#BADDDA' }} colspan="5">In</th>
//                   <th style={{ width: '30%', background: 'skyblue' }} colspan="5">Out</th>
//                   <th style={{ width: '30%', background: '#FFBF73' }} colspan="5">Stock</th>
//                   {/* <th style={{ background: '#BADDDA' }}>Edit</th> */}
//                 </tr>
//                 <tr className='text-center'>
//                   <td style={{ background: '#BADDDA' }} colspan="3">Import</td>
//                   <td style={{ background: '#BADDDA' }} colspan="2">Export</td>
//                   <td style={{ background: 'skyblue' }} colspan="3">Import</td>
//                   <td style={{ background: 'skyblue' }} colspan="2">Export</td>
//                   <td style={{ background: '#FFBF73' }} colspan="3">Import</td>
//                   <td style={{ background: '#FFBF73' }} colspan="2">Export</td>
//                 </tr>
//                 <tr className='text-center'>
//                   <td style={{ background: '#BADDDA' }}>Reg</td>
//                   <td style={{ background: '#BADDDA' }}>Sub</td>
//                   <td style={{ background: '#BADDDA' }}>Nipt</td>
//                   <td style={{ background: '#BADDDA' }}>Reg</td>
//                   <td style={{ background: '#BADDDA' }}>Sub</td>
//                   {/* <td style={{ background: '#BADDDA' }}>Detention</td> */}
//                   <td style={{ background: 'skyblue' }}>Reg</td>
//                   <td style={{ background: 'skyblue' }}>Sub</td>
//                   <td style={{ background: 'skyblue' }}>Nipt</td>
//                   <td style={{ background: 'skyblue' }}>Reg</td>
//                   <td style={{ background: 'skyblue' }}>Sub</td>
//                   {/* <td style={{ background: '#BADDDA' }}>Detention</td> */}
//                   <td style={{ background: '#FFBF73' }}>Reg</td>
//                   <td style={{ background: '#FFBF73' }}>Sub</td>
//                   <td style={{ background: '#FFBF73' }}>Nipt</td>
//                   <td style={{ background: '#FFBF73' }}>Reg</td>
//                   <td style={{ background: '#FFBF73' }}>Sub</td>
//                   {/* <td style={{ background: '#BADDDA' }}>Detention</td> */}
//                 </tr>

//               </thead>
//               <tbody>

//                 {currentfilteredStock.map((import2, index) =>

//                   <tr className={"text-center"}
//                     key={index}>
//                     <td className="table-column">{formatDate2(import2[0])}</td>
//                     <td className="table-column">{import2[2]}</td>
//                     <td className="table-column">{import2[6]}</td>
//                     <td className="table-column">{import2[10]}</td>
//                     <td className="table-column">{import2[4]}</td>
//                     <td className="table-column">{import2[8]}</td>
//                     {/* <td className="table-column">{import2[10]}</td> */}
//                     <td className="table-column">{import2[1]}</td>
//                     <td className="table-column">{import2[5]}</td>
//                     <td className="table-column">{import2[9]}</td>
//                     <td className="table-column">{import2[3]}</td>
//                     <td className="table-column">{import2[7]}</td>
//                     {/* <td className="table-column">{import2[9]}</td> */}
//                     <td className="table-column">{import2[2] - import2[1]}</td>
//                     <td className="table-column">{import2[6] - import2[5]}</td>
//                     <td className="table-column">{import2[10] - import2[9]}</td>
//                     <td className="table-column">{import2[4] - import2[3]}</td>
//                     <td className="table-column">{import2[8] - import2[7]}</td>
//                     {/* <td className="table-column">{import2[10]-import2[9]}</td> */}
//                   </tr>
//                 )}

//               </tbody>
//             </Table>

//             <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//               <Pagination.First onClick={() => handlePageChange(1)} />
//               <Pagination.Prev
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               />
//               <Pagination.Ellipsis />

//               {displayPages().map((pageNumber) => (
//                 <Pagination.Item
//                   key={pageNumber}
//                   active={pageNumber === currentPage}
//                   onClick={() => handlePageChange(pageNumber)}
//                 >
//                   {pageNumber}
//                 </Pagination.Item>
//               ))}

//               <Pagination.Ellipsis />
//               <Pagination.Next
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               />
//               <Pagination.Last onClick={() => handlePageChange(totalPages)} />
//             </Pagination>

//           </div>


//           {/* Detention Table  Seperate */}

//           <div className="text-center mt-3">

//           <h3>Detention History</h3>
//           </div>
//           <div className="table-responsive">
//             <Table className="table table-bordered custom-table mt-3">

//               <thead>
//                 <tr className='text-center'>
//                   <th style={{ width: '10%', background: '#BADDDA' }} rowSpan="3">Date</th>
//                   <th style={{ width: '30%', background: '#BADDDA' }} colspan="2">In</th>
//                   <th style={{ width: '30%', background: '#BADDDA' }} colspan="2">Out</th>
//                   <th style={{ width: '30%', background: '#BADDDA' }} colspan="2">Stock</th>
//                 </tr>
//                 <tr className='text-center'>

//                   <td style={{ background: '#BADDDA' }}>Imp Detention</td>

//                   <td style={{ background: '#BADDDA' }}>Exp Detention</td>

//                   <td style={{ background: '#BADDDA' }}>Imp Detention</td>

//                   <td style={{ background: '#BADDDA' }}>Exp Detention</td>

//                   <td style={{ background: '#BADDDA' }}>Imp Detention</td>

//                   <td style={{ background: '#BADDDA' }}>Exp Detention</td>
//                 </tr>

//               </thead>
//               <tbody>

//                 {currentItems1.map((import2, index) =>

//                   <tr className={"text-center"}
//                     key={index}>
//                     <td className="table-column">{formatDate2(import2[0])}</td>

//                     <td className="table-column">{import2[4]}</td>

//                     <td className="table-column">{import2[2]}</td>

//                     <td className="table-column">{import2[3]}</td>

//                     <td className="table-column">{import2[1]}</td>

//                     <td className="table-column">{import2[4] - import2[3]}</td>

//                     <td className="table-column">{import2[2] - import2[1]}</td>
//                   </tr>
//                 )}

//               </tbody>
//             </Table>

//             <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
//               <Pagination.First onClick={() => handlePageChange1(1)} />
//               <Pagination.Prev
//                 onClick={() => handlePageChange1(currentPage1 - 1)}
//                 disabled={currentPage1 === 1}
//               />
//               <Pagination.Ellipsis />

//               {displayPages2().map((pageNumber) => (
//                 <Pagination.Item
//                   key={pageNumber}
//                   active={pageNumber === currentPage1}
//                   onClick={() => handlePageChange1(pageNumber)}
//                 >
//                   {pageNumber}
//                 </Pagination.Item>
//               ))}

//               <Pagination.Ellipsis />
//               <Pagination.Next
//                 onClick={() => handlePageChange1(currentPage1 + 1)}
//                 disabled={currentPage1 === totalPages1}
//               />
//               <Pagination.Last onClick={() => handlePageChange1(totalPages1)} />
//             </Pagination>

//           </div>

//         </CardBody>
//       </Card>
//     </div>
//   )
// }


// import AuthContext from '../Components/AuthProvider';
// import { useNavigate } from 'react-router-dom';
// import React, { useEffect, useState, useContext } from 'react';
// import { Button } from 'react-bootstrap';
// import '../Components/Style.css';
// import DatePicker from "react-datepicker";
// import { Pagination } from "react-bootstrap";
// import {
//   Card,
//   CardBody,
//   Container,
//   Row,
//   Col,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Table,
// } from "reactstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleRight, faAtom, faBolt, faBoxesPacking, faIdBadge, faHandHoldingHand, faHistory, faList, faList12, faListAlt, faPencil, faPlaneDeparture, faPlus, faPlusCircle, faSearch, faUserCircle, faUsersViewfinder, faFileAlt, faEye, faRefresh, faFilePdf, faFileExcel, faArrowsToEye, faStoreAlt } from '@fortawesome/free-solid-svg-icons';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
// import InviceService from '../services/InviceService';



// export default function Stock_at_vault() {

//   const [stockData, setStockData] = useState([]);
//   const [searchDate, setSearchDate] = useState('');

// const [filteredStock,setFilteredStock] = useState([]);

// const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10; // Number of items to display per page
//   const totalPages = Math.ceil(filteredStock.length / itemsPerPage);
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

// // Calculate the index of the first and last item of the current page
// const indexOfLastItem = currentPage * itemsPerPage;
// const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   // Slice the array of services to display only the current page's items
//   const currentfilteredStock = filteredStock.slice(indexOfFirstItem, indexOfLastItem);

//   // console.warn(currentfilteredImports);
//   // Pagination items
//   const paginationItems = [];
//   for (let number = 1; number <= Math.ceil(filteredStock.length / itemsPerPage); number++) {
//     paginationItems.push(
//       <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
//         {number}
//       </Pagination.Item>
//     );
//   };



//   const handleSearch = async () => {
//     if (searchDate) {
//       const selectedDateJSON = searchDate.toISOString().split('T')[0];
//       // console.log("Json Search Date" + selectedDateJSON);
//       const filteredData = stockData.filter(item => {
//       const itemDate = new Date(item[0]).toISOString().split('T')[0];
//       return itemDate === selectedDateJSON;
//       });
//       setFilteredStock(filteredData);
//     }
//     else {
//       setFilteredStock(stockData);
//     }
//   };

// const resetSearch = async() =>
// {
//   setSearchDate('');
//   getAllData();
// };



//   // const handleOptionChange = (event) => {
//   //   setSelectedOption(event.target.value);
//   // };
//   const navigate = useNavigate();
//   const { isAuthenticated } = useContext(AuthContext);



//   const {
//     userId,
//     branchId,
//     companyid,
//   } = useContext(AuthContext);


//   useEffect(() => {
//     getAllData();
//   }, []);

//   const formatDate2 = (value) => {

//     if (!value) {
//       return "";
//     }
//     const date = new Date(value);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };


//   const getAllData = async () => {
//     InviceService.getdataForStockAtVault(companyid, branchId).then((response) => {
//       setFilteredStock(response.data);
//       setStockData(response.data);     
//     });


//   };

//   // If the user is not authenticated, redirect to the login page

//   useEffect(() => {

//     if (!isAuthenticated) {

//       navigate('/login?message=You need to be authenticated to access this page.');
//     }
//   }, [isAuthenticated, navigate]);

//   return (
//     <div className='Container'>
//       <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
//         icon={faStoreAlt}
//         style={{
//           marginRight: '8px',
//           color: 'black', // Set the color to golden
//         }}
//       /> Stock at Vault</h5>
//       <Card>
//         <CardBody>
//           <Row>
//             <Col md={5}>
//               <FormGroup>
//                 <Label className="forlabel" for="branchId">Stock Date</Label>
//                 <div> {/* Wrap in an input group */}
//                   <DatePicker
//                     selected={searchDate}
//                     onChange={(date) => setSearchDate(date)}
//                     dateFormat="dd/MM/yyyy"
//                     wrapperClassName="custom-react-datepicker-wrapper"
//                     className="form-control"
//                     customInput={<input style={{ width: '100%' }} />}
//                   />
//                 </div>
//               </FormGroup>
//             </Col>
//             <Col style={{ marginTop: 22 }} md={4}>
//               <Button type="button" className="" variant="outline-primary" style={{ marginTop: '10px', marginRight: 10 }}
//                 onClick={handleSearch}
//               >
//                 <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
//                 Search
//               </Button>
//               <Button type="button" className="" variant="outline-danger" style={{ marginTop: '10px' }}
//               onClick={resetSearch}
//               >
//                 <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
//                 Reset
//               </Button>
//             </Col>
//           </Row>
//           <hr />

//           <div className="table-responsive">
//             <Table className="table table-bordered custom-table mt-3">

//               <thead>
//                 <tr className='text-center'>
//                   <th style={{ width: '10%', background: '#BADDDA' }} rowSpan="3">Date</th>
//                   <th style={{ width: '30%', background: '#BADDDA' }} colspan="6">In</th>
//                   <th style={{ width: '30%', background: '#BADDDA' }} colspan="6">Out</th>
//                   <th style={{ width: '30%', background: '#BADDDA' }} colspan="6">Stock</th>
//                   {/* <th style={{ background: '#BADDDA' }}>Edit</th> */}
//                 </tr>
//                 <tr className='text-center'>
//                   <td style={{ background: '#BADDDA' }} colspan="3">Import</td>
//                   <td style={{ background: '#BADDDA' }} colspan="3">Export</td>
//                   <td style={{ background: '#BADDDA' }} colspan="3">Import</td>
//                   <td style={{ background: '#BADDDA' }} colspan="3">Export</td>
//                   <td style={{ background: '#BADDDA' }} colspan="3">Import</td>
//                   <td style={{ background: '#BADDDA' }} colspan="3">Export</td>
//                 </tr>
//                 <tr className='text-center'>
//                   <td style={{ background: '#BADDDA' }}>Reg</td>
//                   <td style={{ background: '#BADDDA' }}>Sub</td>
//                   <td style={{ background: '#BADDDA' }}>Detention</td>
//                   <td style={{ background: '#BADDDA' }}>Reg</td>
//                   <td style={{ background: '#BADDDA' }}>Sub</td>
//                   <td style={{ background: '#BADDDA' }}>Detention</td>
//                   <td style={{ background: '#BADDDA' }}>Reg</td>
//                   <td style={{ background: '#BADDDA' }}>Sub</td>
//                   <td style={{ background: '#BADDDA' }}>Detention</td>
//                   <td style={{ background: '#BADDDA' }}>Reg</td>
//                   <td style={{ background: '#BADDDA' }}>Sub</td>
//                   <td style={{ background: '#BADDDA' }}>Detention</td>
//                   <td style={{ background: '#BADDDA' }}>Reg</td>
//                   <td style={{ background: '#BADDDA' }}>Sub</td>
//                   <td style={{ background: '#BADDDA' }}>Detention</td>
//                   <td style={{ background: '#BADDDA' }}>Reg</td>
//                   <td style={{ background: '#BADDDA' }}>Sub</td>
//                   <td style={{ background: '#BADDDA' }}>Detention</td>
//                 </tr>

//               </thead>
//               <tbody>

//                 {currentfilteredStock.map((import2, index) =>

//                   <tr className={"text-center"}
//                     key={index}>
//                     <td className="table-column">{formatDate2(import2[0])}</td>
//                     <td className="table-column">{import2[2]}</td>
//                     <td className="table-column">{import2[6]}</td>
//                     <td className="table-column">{import2[12]}</td>
//                     <td className="table-column">{import2[4]}</td>
//                     <td className="table-column">{import2[8]}</td>
//                     <td className="table-column">{import2[10]}</td>
//                     <td className="table-column">{import2[1]}</td>
//                     <td className="table-column">{import2[5]}</td>
//                     <td className="table-column">{import2[11]}</td>
//                     <td className="table-column">{import2[3]}</td>
//                     <td className="table-column">{import2[7]}</td>
//                     <td className="table-column">{import2[9]}</td>
//                     <td className="table-column">{import2[2]-import2[1]}</td>
//                     <td className="table-column">{import2[6]-import2[5]}</td>
//                     <td className="table-column">{import2[12]-import2[11]}</td>
//                     <td className="table-column">{import2[4]-import2[3]}</td>
//                     <td className="table-column">{import2[8]-import2[7]}</td>
//                     <td className="table-column">{import2[10]-import2[9]}</td>
//                   </tr>
//                 )}

//               </tbody>
//             </Table>

//             <Pagination style={{ display: 'flex', justifyContent: 'center' }}>
//               <Pagination.First onClick={() => handlePageChange(1)} />
//               <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <Pagination.Item key={i} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
//                   {i + 1}
//                 </Pagination.Item>
//               ))}
//               <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
//               <Pagination.Last onClick={() => handlePageChange(totalPages)} />
//             </Pagination>

//           </div>
//         </CardBody>
//       </Card>
//     </div>
//   )
// }


import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import '../Components/Style.css';
import DatePicker from "react-datepicker";
import { Pagination } from "react-bootstrap";
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
  Table,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAtom, faBolt, faBoxesPacking, faIdBadge, faHandHoldingHand, faHistory, faList, faList12, faListAlt, faPencil, faPlaneDeparture, faPlus, faPlusCircle, faSearch, faUserCircle, faUsersViewfinder, faFileAlt, faEye, faRefresh, faFilePdf, faFileExcel, faArrowsToEye, faStoreAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
import InviceService from '../services/InviceService';



export default function Stock_at_vault() {

  const [stockData, setStockData] = useState([]);
  const [stockDataOld, setStockDataOld] = useState([]);

  const [stockDataDetention, setStockDataDetention] = useState([]);
  const [searchDate, setSearchDate] = useState('');

  const [filteredStock, setFilteredStock] = useState([]);
  const [filteredStockdetention, setFilteredStockdetention] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const totalPages = Math.ceil(filteredStock.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Calculate the index of the first and last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the array of services to display only the current page's items
  const currentfilteredStock = filteredStock.slice(indexOfFirstItem, indexOfLastItem);

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






  const [currentPage1, setCurrentPage1] = useState(1);
  const itemsPerPage1 = 30; // Number of items to display per page

  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems1 = filteredStockdetention.slice(indexOfFirstItem1, indexOfLastItem1);
  // const currentItems1 = InvoiceHistoryData.slice(indexOfFirstItem1, indexOfLastItem1);

  const totalPages1 = Math.ceil(filteredStockdetention.length / itemsPerPage1);
  const handlePageChange1 = (page) => {
    setCurrentPage1(page);
  };

  const displayPages2 = () => {
    const centerPageCount = 5;
    const middlePage = Math.floor(centerPageCount / 2);
    let startPage = currentPage - middlePage;
    let endPage = currentPage + middlePage;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(totalPages1, centerPageCount);
    }
    if (endPage > totalPages1) {
      endPage = totalPages1;
      startPage = Math.max(1, totalPages1 - centerPageCount + 1);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };






  



  const handleSearch = async () => {
    if (searchDate) {
      const selectedDateJSON = searchDate.toISOString().split('T')[0];
      // console.log("Json Search Date" + selectedDateJSON);
      setCurrentPage(1);
      const filteredData = stockData.filter(item => {
        const itemDate = new Date(item.stockDate).toISOString().split('T')[0];
        return itemDate === selectedDateJSON;
      });
      setFilteredStock(filteredData);
    }
    else {
      setFilteredStock(stockData);
    }
  };




  const resetSearch = async () => {
    setCurrentPage(1);
    setSearchDate('');
    setFilteredStock(stockData);
  };



  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);



  const {
    userId,
    branchId,
    companyid,
  } = useContext(AuthContext);


  useEffect(() => {
    getAllData();
    getAllDataByDetention();
  }, []);

  const formatDate2 = (value) => {

    if (!value) {
      return "";
    }
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  // const getAllData = async () => {
  //   InviceService.getdataForStockAtVault(companyid, branchId).then((response) => {
  //     setStockDataOld(response.data);
  //   });


  //   InviceService.getDataStockAtVaultNew(companyid, branchId).then((response) => {

  //     setFilteredStock(response.data);
  //     setStockData(response.data);

  //     console.log("Stocks new");
  //     console.log(response.data);
  //   });
  // };

  const getAllData = async () => {
    InviceService.getdataForStockAtVault(companyid, branchId).then((responseOld) => {
      setFilteredStock(responseOld.data);
      setStockData(responseOld.data);
    });

  };
  
  const getAllDataByDetention = async () => {
    InviceService.getdataForStockAtVaultDetention(companyid, branchId).then((response) => {
      setFilteredStockdetention(response.data);
      // console.log("Detention ");
      // console.log(response.data);
      setStockDataDetention(response.data);
    });


  };

  // If the user is not authenticated, redirect to the login page

  useEffect(() => {

    if (!isAuthenticated) {

      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='Container'>
      <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
        icon={faStoreAlt}
        style={{
          marginRight: '8px',
          color: 'black', // Set the color to golden
        }}
      /> Stock at Vault</h5>
      <Card>
        <CardBody>
          <Row>
            <Col md={5}>
              <FormGroup>
                <Label className="forlabel" for="branchId">Stock Date</Label>
                <div> {/* Wrap in an input group */}
                  <DatePicker
                    selected={searchDate}
                    onChange={(date) => setSearchDate(date)}
                    dateFormat="dd/MM/yyyy"
                    wrapperClassName="custom-react-datepicker-wrapper"
                    className="form-control"
                    customInput={<input style={{ width: '100%' }} />}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col style={{ marginTop: 22 }} md={4}>
              <Button type="button" className="" variant="outline-primary" style={{ marginTop: '10px', marginRight: 10 }}
                onClick={handleSearch}
              >
                <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
                Search
              </Button>
              <Button type="button" className="" variant="outline-danger" style={{ marginTop: '10px' }}
                onClick={resetSearch}
              >
                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                Reset
              </Button>
            </Col>
          </Row>
          <hr />

          <div className="table-responsive">
            <Table className="table table-bordered custom-table mt-3">

              <thead>
                <tr className='text-center'>
                  <th style={{ width: '10%', background: '#BADDDA' }} rowSpan="3">Date</th>
                  <th style={{ width: '30%', background: '#BADDDA' }} colspan="7">In</th>
                  <th style={{ width: '30%', background: 'skyblue' }} colspan="7">Out</th>
                  <th style={{ width: '30%', background: '#FFBF73' }} colspan="7">Stock</th>
                  {/* <th style={{ background: '#BADDDA' }}>Edit</th> */}
                </tr>
                <tr className='text-center'>
                  <td style={{ background: '#BADDDA' }} colspan="4">Import</td>
                  <td style={{ background: '#BADDDA' }} colspan="3">Export</td>
                  <td style={{ background: 'skyblue' }} colspan="4">Import</td>
                  <td style={{ background: 'skyblue' }} colspan="3">Export</td>
                  <td style={{ background: '#FFBF73' }} colspan="4">Import</td>
                  <td style={{ background: '#FFBF73' }} colspan="3">Export</td>
                </tr>
                <tr className='text-center'>
                  <td style={{ background: '#BADDDA' }}>Reg</td>
                  <td style={{ background: '#BADDDA' }}>Nipt</td>
                  <td style={{ background: '#BADDDA' }}>Pc</td>
                  <td style={{ background: '#BADDDA' }}>Sub</td>

                  <td style={{ background: '#BADDDA' }}>Reg</td>
                  <td style={{ background: '#BADDDA' }}>Pc</td>
                  <td style={{ background: '#BADDDA' }}>Sub</td>

                  <td style={{ background: 'skyblue' }}>Reg</td>
                  <td style={{ background: 'skyblue' }}>Nipt</td>
                  <td style={{ background: 'skyblue' }}>Pc</td>
                  <td style={{ background: 'skyblue' }}>Sub</td>

                  <td style={{ background: 'skyblue' }}>Reg</td>
                  <td style={{ background: 'skyblue' }}>Pc</td>
                  <td style={{ background: 'skyblue' }}>Sub</td>

                  <td style={{ background: '#FFBF73' }}>Reg</td>
                  <td style={{ background: '#FFBF73' }}>Nipt</td>
                  <td style={{ background: '#FFBF73' }}>Pc</td>
                  <td style={{ background: '#FFBF73' }}>Sub</td>

                  <td style={{ background: '#FFBF73' }}>Reg</td>
                  <td style={{ background: '#FFBF73' }}>Pc</td>
                  <td style={{ background: '#FFBF73' }}>Sub</td>
                </tr>

              </thead>
              <tbody>
                {currentfilteredStock.map((stockDataOld, index) =>

                  <tr className={"text-center"}
                    key={index}>
                    <td className="table-column">{formatDate2(stockDataOld.stockDate)}</td>
                    <td className="table-column">{stockDataOld.importIn}</td>
                    <td className="table-column">{stockDataOld.importNiptIn}</td>
                    <td className="table-column">{stockDataOld.importPcIn}</td>
                    <td className="table-column">{stockDataOld.importSubIn}</td>

                    <td className="table-column">{stockDataOld.exportIn}</td>
                    <td className="table-column">{stockDataOld.exportPcIn}</td>
                    <td className="table-column">{stockDataOld.exportSubIn}</td>

                    <td className="table-column">{stockDataOld.importOut}</td>
                    <td className="table-column">{stockDataOld.importNiptOut}</td>
                    <td className="table-column">{stockDataOld.importPcOut}</td>
                    <td className="table-column">{stockDataOld.importSubOut}</td>

                    <td className="table-column">{stockDataOld.exportOut}</td>
                    <td className="table-column">{stockDataOld.exportPcOut}</td>
                    <td className="table-column">{stockDataOld.exportSubOut}</td>

                    <td className="table-column">{stockDataOld.importStock}</td>
                    <td className="table-column">{stockDataOld.importNiptStock}</td>
                    <td className="table-column">{stockDataOld.importPcStock}</td>
                    <td className="table-column">{stockDataOld.importSubStock}</td>

                    <td className="table-column">{stockDataOld.exportStock}</td>
                    <td className="table-column">{stockDataOld.exportPcStock}</td>
                    <td className="table-column">{stockDataOld.exportSubStock}</td>

                  </tr>
                )}

              </tbody>
            </Table>

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

          </div>


          {/* Detention Table  Seperate */}

          <div className="text-center mt-3">

            <h3>Detention History</h3>
          </div>
          <div className="table-responsive">
            <Table className="table table-bordered custom-table mt-3">

              <thead>
                <tr className='text-center'>
                  <th style={{ width: '10%', background: '#BADDDA' }} rowSpan="3">Date</th>
                  <th style={{ width: '30%', background: '#BADDDA' }} colspan="2">In</th>
                  <th style={{ width: '30%', background: '#BADDDA' }} colspan="2">Out</th>
                  <th style={{ width: '30%', background: '#BADDDA' }} colspan="2">Stock</th>
                </tr>
                <tr className='text-center'>

                  <td style={{ background: '#BADDDA' }}>Imp Detention</td>

                  <td style={{ background: '#BADDDA' }}>Exp Detention</td>

                  <td style={{ background: '#BADDDA' }}>Imp Detention</td>

                  <td style={{ background: '#BADDDA' }}>Exp Detention</td>

                  <td style={{ background: '#BADDDA' }}>Imp Detention</td>

                  <td style={{ background: '#BADDDA' }}>Exp Detention</td>
                </tr>

              </thead>
              <tbody>

                {currentItems1.map((import2, index) =>

                  <tr className={"text-center"}
                    key={index}>
                    <td className="table-column">{formatDate2(import2.stockDate)}</td>

                    <td className="table-column">{import2.importDetentionIn}</td>

                    <td className="table-column">{import2.exportDetentionIn}</td>

                    <td className="table-column">{import2.importDetentionOut}</td>

                    <td className="table-column">{import2.exportDetentionOut}</td>

                    <td className="table-column">{import2.importDetentionStock}</td>

                    <td className="table-column">{import2.exportDetentionStock}</td>
                  </tr>
                )}

              </tbody>
            </Table>

            <Pagination style={{ display: 'flex', justifyContent: 'center', color: 'gray' }}>
              <Pagination.First onClick={() => handlePageChange1(1)} />
              <Pagination.Prev
                onClick={() => handlePageChange1(currentPage1 - 1)}
                disabled={currentPage1 === 1}
              />
              <Pagination.Ellipsis />

              {displayPages2().map((pageNumber) => (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === currentPage1}
                  onClick={() => handlePageChange1(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              ))}

              <Pagination.Ellipsis />
              <Pagination.Next
                onClick={() => handlePageChange1(currentPage1 + 1)}
                disabled={currentPage1 === totalPages1}
              />
              <Pagination.Last onClick={() => handlePageChange1(totalPages1)} />
            </Pagination>

          </div>

        </CardBody>
      </Card>
    </div>
  )
}