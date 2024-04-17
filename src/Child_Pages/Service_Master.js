import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import Swal from 'sweetalert2';
import serviceMaster from '../services/serviceMaster';
import { animateScroll as scroll } from "react-scroll";
import AuthContext from '../Components/AuthProvider';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';
import '../Components/Style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import { Card, CardBody, Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHoldingCircle, faPlus, faRefresh, faSearch, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
export default function Service_Master() {
    const [company_Id, setcompanyId] = useState('');
    const [branch_Id, setbranch_Id] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [serviceShortDescription, setServiceShortDescription] = useState('');
    const [serviceLongDescription, setServiceLongDescription] = useState('');
    const [serviceUnit, setServiceUnit] = useState('');
    const [serviceUnit1, setServiceUnit1] = useState('');
    const [serviceType, setServiceType] = useState('Rec');
    const [taxApplicable, setTaxApplicable] = useState('N');
    const [taxPercentage, setTaxPercentage] = useState('');
    const [sacCode, setSacCode] = useState('');
    const [rateCalculation, setRateCalculation] = useState('');
    const [status, setStatus] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [approvedBy, setApprovedBy] = useState('');
    const [service, setService] = useState([]);
    const [createdDate, setCreatedDate] = useState('');
    const [editedBy, setEditedBy] = useState('');
    const [editedDate, setEditedDate] = useState('');
    const [approvedDate, setApprovedDate] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [discountDays, setDiscountDays] = useState('');
    const [discountAmount, setDiscountAmount] = useState('');
    const [serviceNewDescription, setServiceNewDescription] = useState('');
    const [serviceChangeDate, setServiceChangeDate] = useState('');
    const [serviceGroup, setServiceGroup] = useState('');
    const [typeOfCharges, setTypeOfCharges] = useState('N');
    const [errors, setErrors] = useState({});
    const [CreatedUser, setCreatedUser] = useState('');
    const [approvedUser, setApprovedUser] = useState('');


    const getCreatedUser = async(id3,companyid,branchId) => {
        if(id3)
        {
       await Rate_Chart_Service.getUserbyUserId(id3,companyid,branchId).then((res) => {
            setCreatedUser(res.data.user_Name);
            // alert(CreatedUser);
        });
    }
    };

    const getApprovedUser = async(id2,companyid,branchId) => {
        if (id2) {
          await  Rate_Chart_Service.getUserbyUserId(id2,companyid,branchId).then((res) => {
                setApprovedUser(res.data.user_Name);
                // alert(approvedUser);
            })
        };
    };

    function scrollToSection() {
        scroll.scrollTo("target", {
            smooth: true,
            duration: 0,
            offset: -50,
        });
    };

    const handleTaxPercentageChange = (e) => {
        const selectedTaxPercentage = e.target.value;
        setTaxPercentage(selectedTaxPercentage);

        // Set taxApplicable based on selectedTaxPercentage
        if (selectedTaxPercentage !== '') {
            setTaxApplicable('Y');
        } else {
            setTaxApplicable('N');
        }
    };


  










    const {

        userId,
        username,
        branchId,
        companyid,

    } = useContext(AuthContext);


    useEffect(() => {
        getAllServices(companyid, branchId);
        setcompanyId(companyid);
        setbranch_Id(branchId);
    }, [])



    //  take the values of approvedBy, editedBy ,Cid

    const handleValidation = () => {
        let formIsValid = true;
        const newErrors = {};

        // Validate serviceShortDescription
        if (!serviceShortDescription) {
            formIsValid = false;
            newErrors['serviceShortDescription'] = 'Short description is required.';
        }

        // Validate serviceUnit
        if (!serviceUnit) {
            formIsValid = false;
            newErrors['serviceUnit'] = 'Service unit is required.';
        }

        // Validate serviceType
        if (!serviceType) {
            formIsValid = false;
            newErrors['serviceType'] = 'Service type is required.';
        }

        // Validate sacCode
        if (!sacCode) {
            formIsValid = false;
            newErrors['sacCode'] = 'SAC code is required.';
        }

        // Validate rateCalculation
        if (!typeOfCharges) {
            formIsValid = false;
            newErrors['typeOfCharges'] = 'Please select Type of Charges';
        }

        // Validate rateCalculation
        if (!rateCalculation) {
            formIsValid = false;
            newErrors['rateCalculation'] = 'Please select Rate calculation';
        }



        setErrors(newErrors);
        return formIsValid;
    };




    const getAllServices = async (companyid, branchId) => {
        serviceMaster.getServices(companyid, branchId).then((res) => {
            // console.log(res.data);
            setService(res.data);
        })



    }

    const DeleteService = (compaId, branchId, sid) => {
        {


            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    serviceMaster.deleteService(compaId, branchId, sid).then((res) => {
                        // Swal.fire('Service Deleted Successfully', 'You clicked the button', 'success');

                        getAllServices(compaId, branchId);
                        // console.log(res.data)
                        makeFieldEmpty();
                       
                    }
                    )

                    toast.error('Service Deleted Successfully !', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 700,
                    });
                }
            })




        }
    }


    const makeFieldEmpty = () => {
        setServiceId('');
        setServiceShortDescription('')
        setServiceLongDescription('')
        setServiceUnit('')
        setServiceUnit1('')
        setServiceType('')
        setTaxApplicable('N')
        setTaxPercentage('')
        setSacCode('')
        setRateCalculation('')
        setStatus('')
        setCreatedBy('')
        setApprovedBy('')
        setCreatedDate('')
        setEditedDate('')
        setApprovedDate('')
        setServiceNewDescription('')
        setServiceChangeDate('')
        setServiceGroup('')
        setTypeOfCharges('N');
        setErrors('');
        setServiceType('Rec');
        setDiscountPercentage('');
        setDiscountDays('');
        setDiscountAmount('');
        setcompanyId('');
        setCreatedUser('');
        setApprovedUser('');
        setFormErrors(
          {
            serviceShortDescription:'',
            serviceUnit:'',
            sacCode:''
          }
        )
    }

    const updatdStatus = async () => {
        if (serviceId) {
            serviceMaster.updateServiceStatus(companyid, branchId, serviceId, userId, services).then((res) => {
                toast.success('Service Approved Successfully !', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 600,
                });
                // makeFieldEmpty();
                getServiceById(res.data.company_Id, res.data.branch_Id, res.data.service_Id);
                getAllServices(res.data.company_Id, res.data.branch_Id);

            })
        }
        else {
            toast.warning('First Save the Service !', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 700,
            });
        }


    }
    const services = {

        serviceId, serviceShortDescription, serviceLongDescription, serviceUnit, serviceUnit1,
        serviceType, taxApplicable, taxPercentage, sacCode, status,
        createdBy, approvedBy, rateCalculation, createdDate, editedDate,
        serviceGroup, serviceChangeDate, serviceNewDescription, typeOfCharges,
        editedBy, editedDate, discountPercentage, setDiscountDays, discountAmount, company_Id, branch_Id
    };



    const getServiceById = (compId, branchId, serviceId) => {
        
        serviceMaster.getByServiceId(compId, branchId, serviceId).then((res) => {
            setServiceId(res.data.service_Id);
            setServiceShortDescription(res.data.serviceShortDescription)
            setServiceLongDescription(res.data.serviceLongDescription)
            setServiceUnit(res.data.serviceUnit)
            setServiceUnit1(res.data.serviceUnit1)
            setServiceType(res.data.serviceType)
            setTaxApplicable(res.data.taxApplicable)
            setTaxPercentage(res.data.taxPercentage)
            setSacCode(res.data.sacCode)
            setRateCalculation(res.data.rateCalculation);
            setStatus(res.data.status);
            setCreatedBy(res.data.createdBy);
            getCreatedUser(res.data.createdBy,companyid,branchId);
            setcompanyId(res.data.company_Id);
            setbranch_Id(res.data.branch_Id);
            setApprovedBy(res.data.approvedBy);
            // alert("Created by" + res.data.createdBy)
            getApprovedUser(res.data.approvedBy,companyid,branchId);
            setCreatedDate(res.data.createdDate)
            setEditedDate(res.data.editedDate)
            setApprovedDate(res.data.approvedDate)
            setServiceNewDescription(res.serviceNewDescription)
            setServiceChangeDate(res.serviceChangeDate)
            setServiceGroup(res.data.serviceGroup)
            setTypeOfCharges(res.data.typeOfCharges)
            setEditedBy(res.data.setEditedBy);
            setDiscountPercentage(res.data.discountPercentage);
            setDiscountDays(res.data.setDiscountDays);
            setDiscountAmount(res.data.discountAmount);

        })
    }

    const [formErrors, setFormErrors] = useState({
      serviceShortDescription:'',
      serviceUnit:'',
      sacCode:''
    });

    const saveorUpdateService = async (e) => {

        const isFormValid = handleValidation();

        e.preventDefault();
        const errors = {};

        if (!serviceShortDescription) {
          errors.serviceShortDescription = "Service short desc is required.";
        }
    
        if (!serviceUnit) {
          errors.serviceUnit = "Service unit is required.";
        }
    
        
        if (!sacCode) {
          errors.sacCode = "Service unit is required.";
        }

        if (Object.keys(errors).length > 0) {
          setFormErrors(errors);
          return;
        }

        // if (sid) {
        //     scrollToSection();

        //     getServiceById(compId, branchId, sid);
        //     setErrors('');

        // }

        // else {

            if (isFormValid) {


                if (serviceId) {

                    serviceMaster.updateService(companyid, branchId, serviceId, userId, services).then((res) => {
                        toast.success('Service Updated Successfully !', {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 700,
                        });

                        getServiceById(res.data.company_Id, res.data.branch_Id, res.data.service_Id);

                        getAllServices(res.data.company_Id, res.data.branch_Id);
                    })
                }
                else {
                    // console.log(services);


                    serviceMaster.addServices(companyid, branchId, userId, services).then((res) => {
                        toast.success('Service Saved Successfully !', {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 700,
                        });
                        getServiceById(res.data.company_Id, res.data.branch_Id, res.data.service_Id);

                        getAllServices(res.data.company_Id, res.data.branch_Id);
                    }).catch(error => {
                        console.warn(error);
                    })
                }



            }
            else {


                toast.error('Oops something went wrong !', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 700,
                });



            }


        


    }

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = service.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(service.length / itemsPerPage);
  
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
       
        <div className='container'>
  <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }}>
    <FontAwesomeIcon
      icon={faHandsHoldingCircle}
      style={{
        marginRight: '8px',
        color: 'black', // Set the color to golden
      }}
    />
    Service Master
  </h5>
            
            <Card style={{ backgroundColor: "#F8F8F8" }}>
                <CardBody>


        
                    {/* 1st */}

                   


                    <Card style={{ backgroundColor: "#F8F8F8" }}>
    <CardBody>
      {/* 1st */}
      <div className="row">
        <div className="col-md-4">
          <FormGroup>
            <Label className="forlabel" for="branchId" id='target'>Service Id</Label>
            <Input
              type="text"
              name="serviceId"
              id='service'
              readOnly
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="form-control mb-3 read-only"
            />
          </FormGroup>
        </div>

        <div className="col-md-4">
          <FormGroup>
            <Label className="forlabel" for="branchId">Service Short Desc</Label>
            <Input
              type="text"
              name="serviceShortDescription"
              className="form-control"
              style={{
                borderColor: errors.serviceShortDescription ? '#f52b2b' : '',
              }}
              placeholder="Service Short Desc"
              onChange={(e) => setServiceShortDescription(e.target.value)}
              value={serviceShortDescription}
            />
              <div style={{ color: 'red' }} className="error-message">{formErrors.serviceShortDescription}</div>
          </FormGroup>
        </div>



        <Col>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Service Type</Label>
                                <select className="form-select" name="serviceType" value={serviceType} onChange={(e) => setServiceType(e.target.value)}
                                    style={{
                                        borderColor: errors.serviceType ? '#f52b2b' : '',
                                    }}
                                >
                                    <option value="">Select Service Type</option>
                                    <option value="Rec">Receivable</option>
                                    <option value="All">All</option>
                                </select>
                            </FormGroup>
                        </Col>
      </div>

      {/* 2nd */}
      <div className="row">
        <div className="col-md-4">
          <FormGroup>
            <Label className="forlabel" for="branchId">Service Long Desc</Label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="2"
              name="serviceLongDescription"
              onChange={(e) => setServiceLongDescription(e.target.value)}
              value={serviceLongDescription}
            />
          </FormGroup>
        </div>

        <div className="col-md-4">
          <FormGroup>
            <Label className="forlabel" for="branchId">Service Unit</Label>
            <select
              className="form-select"
              name="serviceUnit"
              value={serviceUnit}
              onChange={(e) => setServiceUnit(e.target.value)}
              style={{
                borderColor: errors.rateCalculation ? '#f52b2b' : '',
              }}
            >
               <option value="">Select Service Unit</option>
                                    <option value="ACT">Actual</option>
                                    <option value="per BI">Per Bl</option>
                                    <option value="Per Cheque">Per Cheque</option>
                                    <option value="Parcel">Per Parcel</option>
                                    <option value="Quantity">Per Quantity</option>
                                    <option value="Per Container">Per Container</option>
                                    <option value="Per TEU">Per TEU</option>
                                    <option value="Per FEU">Per FEU</option>
                                    <option value="Per Shift">Per Shift</option>
                                    <option value="Per Man">Per Man</option>
                                    <option value="Per Day">Per Day</option>
                                    <option value="Per Month">Per Month</option>
                                    <option value="Per Week">Per Week</option>
                                    <option value="Per Kg">Per Kg</option>
              {/* Add more options here */}
            </select>
            <div style={{ color: 'red' }} className="error-message">{formErrors.serviceUnit}</div>
          </FormGroup>
        </div>

        <div className="col-md-4">
          <FormGroup>
            <Label className="forlabel" for="branchId">Service Unit 1</Label>
            <select
              className="form-select"
              name="serviceUnit1"
              value={serviceUnit1}
              onChange={(e) => setServiceUnit1(e.target.value)}
            >
              <option value="">Select Service Unit 1</option>
                                    <option value="ACT">Actual</option>
                                    <option value="Per BI">Per Bl</option>
                                    <option value="Per Cheque">Per Cheque</option>
                                    <option value="Per Parcel">Per Parcel</option>
                                    <option value="Per Quantity">Per Quantity</option>
                                    <option value="Per Container">Per Container</option>
                                    <option value="Per TEU">Per TEU</option>
                                    <option value="Per FEU">Per FEU</option>
                                    <option value="Per Shift">Per Shift</option>
                                    <option value="Per Man">Per Man</option>
                                    <option value="Per Day">Per Day</option>
                                    <option value="Per Month">Per Month</option>
                                    <option value="Per Week">Per Week</option>
                                    <option value="Per Kg">Per Kg</option>
              {/* Add more options here */}
            </select>
          </FormGroup>
        </div>
      </div>

      {/* 3rd */}
      <div className="row">
        <div className="col-md-4">
          <FormGroup>
            <Label className="forlabel" for="branchId">Rate Calculation</Label>
            <div className="row">
            <Col>
                            <FormGroup>
                               
                                <div className="row">
                                    <div className="col-4 d-flex align-items-center ">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input radios"
                                                type="radio" name="rateCalculation" value="Range"
                                                onChange={(e) => setRateCalculation(e.target.value)}
                                                checked={rateCalculation === "Range"}
                                                style={{
                                                    borderColor: errors.rateCalculation ? '#f52b2b' : '',
                                                }}
                                            />

                                            <label className="form-check-label">Range</label>
                                        </div>
                                    </div>

                                    <div className="col-4 d-flex align-items-center">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input radios"
                                                type="radio" name="rateCalculation" value="Slab"
                                                onChange={(e) => setRateCalculation(e.target.value)}
                                                checked={rateCalculation === "Slab"}
                                                style={{
                                                    borderColor: errors.rateCalculation ? '#f52b2b' : '',
                                                }}
                                            />
                                            <label className="form-check-label">Slab</label>
                                        </div>
                                    </div>

                                    <div className="col-4 d-flex align-items-center">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input radios"
                                                type="radio" name="rateCalculation" value="Plain"
                                                onChange={(e) => setRateCalculation(e.target.value)}
                                                checked={rateCalculation === "Plain"}
                                                style={{
                                                    borderColor: errors.rateCalculation ? '#f52b2b' : '',
                                                }}
                                            />
                                            <label className="form-check-label">Plain</label>
                                        </div>
                                    </div>
                                </div>
                            </FormGroup>
                        </Col>
            </div>
          </FormGroup>
        </div>

        <div className="col-md-4">
          <FormGroup>
            <Label className="forlabel" for="branchId">Type of Charges</Label>
            <select
              className="form-select"
              name="TypeOfCharges"
              value={typeOfCharges}
              onChange={(e) => setTypeOfCharges(e.target.value)}
            >
              <option value="">Select Type of Charges</option>
              <option value="N">Not Applicable</option>
              {/* Add more options here */}
            </select>
          </FormGroup>
        </div>

        <div className="col-md-4">
          <FormGroup>
            <Label className="forlabel" for="branchId">Sac Code</Label>
            <Input
              type="text"
              name="sacCode"
              id='Sac Code'
              className="form-control"
              onChange={(e) => setSacCode(e.target.value)}
              placeholder="Sac Code"
              value={sacCode}
              maxLength={7}
              style={{
                borderColor: errors.sacCode ? '#f52b2b' : '',
              }}
            />
            <div style={{ color: 'red' }} className="error-message">{formErrors.sacCode}</div>
          </FormGroup>
        </div>
      </div>

      {/* 4th */}
      {/* Add elements for the 4th section here */}

      {/* 5th */}
      <div className="row">
        <div className="col-md-4">
          <FormGroup>
            <Label className="forlabel" for="branchId">Applicable GST</Label>
            <select
              className="form-select"
              name="taxPercentage"
              value={taxPercentage}
              onChange={handleTaxPercentageChange}
            >
              <option value="">Select GST</option>
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="20">20%</option>
              {/* Add more options here */}
            </select>
          </FormGroup>
        </div>

        <div className="col-md-4">
          <FormGroup>
            <Label className="forlabel" for="branchId">Tax Applicable</Label>
            <Row>
              <Col md={3}>
                <input
                  className="form-check-input radios"
                  type="checkbox"
                  disabled
                  style={{ width: 30, height: 30 }}
                  name="taxApplicable"
                  checked={taxApplicable === "Y"}
                  onChange={(e) => setTaxApplicable(e.target.checked ? "Y" : "N")}
                />
              </Col>
            </Row>
          </FormGroup>
        </div>
        <Col md={4}>
          <div
            style={{
              marginTop: 30,
              marginBottom:10,
              display: "flex",
              justifyContent: "center", // Center buttons horizontally
            }}
          >
            
            <Button
              type="button"
              className="allbutton"
              variant="outline-success"
              onClick={(e) => saveorUpdateService(e)}
              style={{ marginRight: 5 }}
            >
              <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
              SUBMIT
            </Button>
            <Button
              type="button"
              className="allbutton"
              variant="outline-danger"
              onClick={(e) => makeFieldEmpty()}
            >
              <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: "5px" }} />
              CLEAR
            </Button>
          </div>
        </Col>


      
      </div>
    </CardBody>
  </Card>



                    <div className="text-center mt-">

                
                    </div>
                    <hr />
                 
                    <div className="table-responsive">
                 <Table className="table table-striped table-hover">
                        <thead style={{ backgroundColor: '#BADDDA' }}>
                            <tr className="text-center">
                                <th scope="col" style={{ backgroundColor: '#BADDDA' }}>Service Id</th>
                                <th scope="col" style={{ backgroundColor: '#BADDDA' }}>Service Name</th>
                                <th scope="col" style={{ backgroundColor: '#BADDDA' }}>Rate Type</th>
                                <th scope="col" style={{ backgroundColor: '#BADDDA' }}>Service Type</th>
                                <th scope="col" style={{ backgroundColor: '#BADDDA' }}>Created By</th>
                                <th scope="col" style={{ backgroundColor: '#BADDDA' }}>Status</th>
                                <th scope="col" style={{ backgroundColor: '#BADDDA' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentItems.map((servicemaster, index) =>

                                    <tr key={index} className="text-center">
                                        <td className="table-column">{servicemaster.service_Id}</td>
                                        <td className="table-column">{servicemaster.serviceShortDescription}</td>
                                        <td className="table-column">{servicemaster.rateCalculation}</td>
                                        <td className="table-column">{servicemaster.serviceType === "Rec" ? "Receivable" : servicemaster.serviceType === "Imp" ? "Import" : servicemaster.serviceType === "Exp" ? "Export" : servicemaster.serviceType === "All" ? "All" : ""}</td>
                                        <td className="table-column">{servicemaster.createdBy}</td>
                                        <td className="table-column">{servicemaster.status === "A" ? "Approved" : servicemaster.status === "U" ? "Edit" : servicemaster.status === "N" ? "New" : servicemaster.status === "D" ? "Deleted" : ""}</td>
                                        <td className="table-column">
                                            
                <Button
                  type="button"
                  variant="outline-primary"
                  onClick={() => getServiceById(servicemaster.company_Id, servicemaster.branch_Id, servicemaster.service_Id)}
                  style={{ marginRight: '5px' }}
                >
                  <FontAwesomeIcon icon={faEdit} style={{ marginRight: 'px' }} />
                </Button>
                <Button
                  type="button"
                  variant="outline-danger"
                  onClick={() => DeleteService(servicemaster.company_Id, servicemaster.branch_Id,servicemaster.service_Id)}
                  style={{ marginRight: '5px' }}
                >
                  <FontAwesomeIcon icon={faTrash} style={{ marginRight: 'px' }} />
                </Button>
              </td>
                                       
                                    </tr>

                                )
                            }

                        </tbody>
                    </Table>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }} className=" text-center">
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
                </CardBody>
            </Card>


            </div>
    );

}