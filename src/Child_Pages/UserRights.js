import AuthContext from '../Components/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useContext, useState, useRef } from 'react';
import '../Components/Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import Dashboard from '../Components/Dashboard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ipaddress from '../Components/IpAddress';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { error, isEmptyObject } from 'jquery';
import {
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,

} from "reactstrap";

export default function UserRights() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [childMenus, setChildMenus] = useState([]);
  const [parentMenus, setParentMenus] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [branchName, setBranchnames] = useState([]);
  const [selectbranch, setselectedbranch] = useState('');
  const [userId2, setUserId] = useState('');
  const [userNameDropdownValue, setUserNameDropdownValue] = useState('');
  const [selectedUsername, setSelectedUsername] = useState('');
  const [createdby, setCreatedBy] = useState('');
  const [approvedby, setApprovedby] = useState('');
  const [statuslist, setStatuslist] = useState('');
  const [userid, setuId] = useState('');
  const [targetUser, setTargetUser] = useState('');
  const [user_name, setUser_name] = useState(null);
  const [getuser_name, setGetUser_name] = useState({});

  const handletargetuser = (e) => {
    setTargetUser(e.target.value);
  }

  const notify = () => toast.success('Data Insert Successfully', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  const [getuser, setGetUser] = useState('');
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

  console.log(userId);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?message=You need to be authenticated to access this page.');
    }
  }, [isAuthenticated, navigate]);

  const handlegetUser = (e) => {
    setGetUser(e.target.value);
    console.log(getuser);
  };

  const handleuserid = (e) => {
    setuId(e.target.value)
  }

  useEffect(() => {
    axios
      .get(`http://${ipaddress}api/parent-menus/${companyid}/${branchId}`)
      .then((response) => {
        setParentMenus(
          response.data.map((pm) => ({
            ...pm,
            approve: 'N',
            update: 'N',
            read: 'N',
            deleteRight: 'N',
            create: 'N',
          }))
        );
        console.log(response);
      })
      .catch((error) => {
        console.error('Error fetching parent menus:', error);
      });
  }, []);


  useEffect(() => {
    axios
      .get(`http://${ipaddress}api/child-menus/${companyid}/${branchId}`)
      .then((response) => {
        setChildMenus(
          response.data.map((cm) => ({
            ...cm,
            approve: 'N',
            update: 'N',
            read: 'N',
            deleteRight: 'N',
            create: 'N',
          }))
        );
      })
      .catch((error) => {
        console.error('Error fetching child menus:', error);
      });
  }, []);
  const fetchUserRights = async () => {
    if (userId && userNameDropdownValue) {
      try {
        const response = await axios.get(`http://${ipaddress}user/getuser/${userNameDropdownValue}/${companyid}/${branchId}`);
        const userData = response.data;

        setParentMenus((prevParentMenus) => {
          const updatedParentMenus = prevParentMenus.map((pm) => {
            const userRights = userData.find((user) => user.process_Id === pm.processId);
            return {
              ...pm,
              read: userRights?.allow_Read === 'Y' ? 'Y' : 'N',
              create: userRights?.allow_Create === 'Y' ? 'Y' : 'N',
              update: userRights?.allow_Update === 'Y' ? 'Y' : 'N',
              deleteRight: userRights?.allow_Delete === 'Y' ? 'Y' : 'N',
              approve: userRights?.allow_Approve === 'Y' ? 'Y' : 'N',
            };
          });
          return updatedParentMenus;
        });

        setChildMenus((prevChildMenus) => {
          const updatedChildMenus = prevChildMenus.map((cm) => {
            const userRights = userData.find((user) => user.process_Id === cm.processId);
            return {
              ...cm,
              read: userRights?.allow_Read === 'Y' ? 'Y' : 'N',
              create: userRights?.allow_Create === 'Y' ? 'Y' : 'N',
              update: userRights?.allow_Update === 'Y' ? 'Y' : 'N',
              deleteRight: userRights?.allow_Delete === 'Y' ? 'Y' : 'N',
              approve: userRights?.allow_Approve === 'Y' ? 'Y' : 'N',
            };
          });
          return updatedChildMenus;
        });
      } catch (error) {
        console.error('Error fetching user rights:', error);
      }
    }
  };

  // UseEffect to call the handler when userId or userNameDropdownValue changes
  useEffect(() => {
    fetchUserRights();
  }, [userId, userNameDropdownValue]);



  const handleUserId = (e) => {
    setUserId(e.target.value);

  };

  useEffect(() => {
    if (branchId) {
      setselectedbranch(branchId);
    }
  }, [branchId]);


  const handleApproveChange = (e, processId) => {
    const { checked } = e.target;
    setParentMenus((prevParentMenus) =>
      prevParentMenus.map((pm) =>
        pm.processId === processId ? { ...pm, approve: checked ? 'Y' : 'N' } : pm
      )
    );
  };

  const handleUpdateChange = (e, processId) => {
    const { checked } = e.target;
    setParentMenus((prevParentMenus) =>
      prevParentMenus.map((pm) =>
        pm.processId === processId ? { ...pm, update: checked ? 'Y' : 'N' } : pm
      )
    );
  };

  const handleReadChange = (e, processId) => {
    const { checked } = e.target;
    setParentMenus((prevParentMenus) =>
      prevParentMenus.map((pm) =>
        pm.processId === processId ? { ...pm, read: checked ? 'Y' : 'N' } : pm
      )
    );
  };

  const handleDeleteChange = (e, processId) => {
    const { checked } = e.target;
    setParentMenus((prevParentMenus) =>
      prevParentMenus.map((pm) =>
        pm.processId === processId ? { ...pm, deleteRight: checked ? 'Y' : 'N' } : pm
      )
    );
  };

  const handleCreateChange = (e, processId) => {
    const { checked } = e.target;
    setParentMenus((prevParentMenus) =>
      prevParentMenus.map((pm) =>
        pm.processId === processId ? { ...pm, create: checked ? 'Y' : 'N' } : pm
      )
    );
  };


  const handleChildApproveChange = (e, processId) => {
    const { checked } = e.target;
    setChildMenus((prevParentMenus) =>
      prevParentMenus.map((cm) =>
        cm.processId === processId ? { ...cm, approve: checked ? 'Y' : 'N' } : cm
      )
    );
  };

  const handleChildUpdateChange = (e, processId) => {
    const { checked } = e.target;
    setChildMenus((prevParentMenus) =>
      prevParentMenus.map((cm) =>
        cm.processId === processId ? { ...cm, update: checked ? 'Y' : 'N' } : cm
      )
    );
  };


  const handleChildReadChange = (e, processId) => {
    const { checked } = e.target;
    setChildMenus((prevChildMenus) =>
      prevChildMenus.map((cm) =>
        cm.processId === processId ? { ...cm, read: checked ? 'Y' : 'N' } : cm
      )
    );
  };

  const handleChildDeleteChange = (e, processId) => {
    const { checked } = e.target;
    setChildMenus((prevChildMenus) =>
      prevChildMenus.map((cm) =>
        cm.processId === processId ? { ...cm, deleteRight: checked ? 'Y' : 'N' } : cm
      )
    );
  };

  const handleChildCreateChange = (e, processId) => {
    const { checked } = e.target;
    setChildMenus((prevChildMenus) =>
      prevChildMenus.map((cm) =>
        cm.processId === processId ? { ...cm, create: checked ? 'Y' : 'N' } : cm
      )
    );
  };

  const dateTimeString = '2000-12-13T08:59:23.000+00:00';
  const dateObject = new Date(dateTimeString);



  const handleSaveUserRights = () => {
    if (!userId2 || userId2 === 'No') {
      // Handle the scenario where userId is null or falsy
      console.error('userId is null or falsy. Cannot make the POST request.');
      // You can display an error message or take appropriate action here.
      toast.error("Please Select User")
      fetchUserRights();
      fetchStatus();
      return error;
    }

    const newUserRights = [
      ...parentMenus.map((pm) => ({
        company_Id: companyid,
        user_Id: userId2,
        process_Id: pm.processId,
        branch_Id: branchId,
        allow_Read: pm.read,
        allow_Create: pm.create,
        allow_Update: pm.update,
        allow_Delete: pm.deleteRight,
        allow_Approve: pm.approve,
        created_By: '',
        created_Date: '',
        approved_By: '',
        status: ''
      })),
      ...childMenus.map((cm) => ({
        company_Id: companyid,
        user_Id: userId2,
        process_Id: cm.processId,
        branch_Id: branchId,
        allow_Read: cm.read,
        allow_Create: cm.create,
        allow_Update: cm.update,
        allow_Delete: cm.deleteRight,
        allow_Approve: cm.approve,
        created_By: '',
        created_Date: '',
        approved_By: '',
        status: ''
      })),
    ];

    axios
      .post(`http://${ipaddress}user/insert/${userId}`, newUserRights)
      .then(() => {

        fetchUserRights();
        fetchStatus();
        toast.success("User Rights Saved successfully!", "success");

      })
      .catch((error) => {
        console.error('Error inserting user rights:', error);
      });
  };


  const handleSubmitUserRights = () => {
    if (!userId2 || userId2 === 'No') {
      // Handle the scenario where userId is null or falsy
      console.error('userId is null or falsy. Cannot make the POST request.');
      // You can display an error message or take appropriate action here.
      toast.error("Please Select User")
      fetchUserRights();
      fetchStatus();
      return error;
    }
    const updatedUserRights = [
      ...parentMenus.map((pm) => ({
        company_Id: companyid,
        user_Id: userId2,
        process_Id: pm.processId,
        branch_Id: branchId,
        allow_Read: pm.read,
        allow_Create: pm.create,
        allow_Update: pm.update,
        allow_Delete: pm.deleteRight,
        allow_Approve: pm.approve,
        created_By: '',
        created_Date: '',
        approved_By: '',
        status: ''
      })),
      ...childMenus.map((cm) => ({
        company_Id: companyid,
        user_Id: userId2,
        process_Id: cm.processId,
        branch_Id: branchId,
        allow_Read: cm.read,
        allow_Create: cm.create,
        allow_Update: cm.update,
        allow_Delete: cm.deleteRight,
        allow_Approve: cm.approve,
        created_By: '',
        created_Date: '',
        approved_By: '',
        status: ''
      })),
    ];

    axios
      .put(`http://${ipaddress}user/update/${userId}`, updatedUserRights)
      .then(() => {
        console.log('User rights updated successfully!');
        fetchUserRights();
        fetchStatus();
        toast.success("User Rights Saved successfully!", "success");
      })
      .catch((error) => {
        console.error('Error updating user rights:', error);
      });
  };



  useEffect(() => {
    if (selectbranch !== '') {
      axios
        .get(`http://${ipaddress}user/u/${selectbranch}/${companyid}/${branchId}`)
        .then((response) => {
          const data = response.data;
          setBranchnames(response.data);
        })
        .catch((error) => {
          console.error('Error fetching branch names:', error);
        });
    }
  }, [selectbranch]);






  useEffect(() => {
    console.log(users); // Print the updated 'users' state
  }, [users]);





  const fetchStatus = async () => {
    try {
      const response = await axios.get(`http://${ipaddress}user/status/${targetUser}`);
      setStatuslist(response.data);
      // Update Approved By and Created By states here



    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };


  useEffect(() => {
    fetchStatus();
  }, [targetUser]);







  console.log('id', userid);


  const [getapprove, setGetapprove] = useState('');
  const approvedBySpanRef = useRef('');
  useEffect(() => {
    if (approvedBySpanRef.current) {
      const approvedByValue = approvedBySpanRef.current.textContent;
      setGetapprove(approvedByValue);
      // Now you can use the 'approvedByValue' variable to store or manipulate the value
      console.log('Approved By Value:', approvedByValue);
    }
  }, [statuslist.approved_By]);


  const [getcreated, setGetcreated] = useState('');
  const createBySpanRef = useRef('');
  useEffect(() => {
    if (createBySpanRef.current) {
      const createdByValue = createBySpanRef.current.textContent;
      setGetcreated(createdByValue);
      // Now you can use the 'approvedByValue' variable to store or manipulate the value
      console.log('Approved By Value:', createdByValue);
    }
  }, [statuslist.created_By]);


  const [getstatus, setStatuscreated] = useState('');
  const statusBySpanRef = useRef('');
  useEffect(() => {
    if (statusBySpanRef.current) {
      const statusbyValue = statusBySpanRef.current.textContent;
      setStatuscreated(statusbyValue);
      // Now you can use the 'approvedByValue' variable to store or manipulate the value
      console.log('Approved By Value:', statusbyValue);
    }
  }, [statuslist.status]);

  console.log('stasfhsghg ' + statuslist.status);




  const [getapproveby, setGetapproveby] = useState('');
  const [getcreatedby, setGetcreatedby] = useState('');

  useEffect(() => {
    // Fetch user data based on the value of `getapprove`
    axios
      .get(`http://${ipaddress}user/get-user/${getapprove}/${companyid}/${branchId}`)
      .then((response) => {
        // Update the `getapproveby` state with an array of usernames
        const namesMap = {};
        response.data(user => {
          namesMap[user.user_Id] = user.user_Name;
        });
        setGetUser_name(namesMap);
        // Update the `users` state with the fetched user data
        setUsers(response.data);
        setGetapproveby(users.map((menu) => menu.user_Name));
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [getapprove]);

  // Log the `getapproveby` state to the console
  console.log('appi ' + getapproveby);


  const [usernameforcreatedby, setUsernameforcreatedby] = useState('');

  useEffect(() => {
    axios.get(`http://${ipaddress}user/get-user/${getcreated}/${companyid}/${branchId}`)
      .then((response) => {

        console.log('user', response.data);
        setUsers(response.data)

        setUsernameforcreatedby(response.data.user_Name);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [getcreated, usernameforcreatedby]);

  console.log('username ', usernameforcreatedby);

  const [getcreate2, setCreate2] = useState(null);
  const createdBySpanRef2 = useRef('');
  useEffect(() => {
    if (createdBySpanRef2.current) {
      const approvedByValue = createdBySpanRef2.current.textContent;
      setCreate2(approvedByValue);

    }
  }, [usernameforcreatedby]);


  const [usernameforapprovedby, setUsernameforapprovedby] = useState('');
  const [users2, setUsers2] = useState([]);
  useEffect(() => {
    axios.get(`http://${ipaddress}user/get-user/${getapprove}/${companyid}/${branchId}`)
      .then((response) => {

        console.log('user', response.data);
        setUsers2(response.data)

        setUsernameforapprovedby(response.data.user_Name);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [getapprove, usernameforapprovedby]);

  console.log('username ', usernameforcreatedby);



  const ITEMS_PER_PAGE = 5;
  const [activePageParent, setActivePageParent] = useState(1);
  const [activePageChild, setActivePageChild] = useState(1);

  const handleParentPageChange = (pageNumber) => {
    setActivePageParent(pageNumber);

  };

  const handleChildPageChange = (pageNumber) => {
    setActivePageChild(pageNumber);
  };

  const indexOfLastItemParent = activePageParent * ITEMS_PER_PAGE;
  const indexOfFirstItemParent = indexOfLastItemParent - ITEMS_PER_PAGE;
  const currentParentMenus = parentMenus.slice(indexOfFirstItemParent, indexOfLastItemParent);

  const indexOfLastItemChild = activePageChild * ITEMS_PER_PAGE;
  const indexOfFirstItemChild = indexOfLastItemChild - ITEMS_PER_PAGE;
  const currentChildMenus = childMenus.slice(indexOfFirstItemChild, indexOfLastItemChild);

  console.log('usernameeeee ', getuser_name['Ajit']);

  const [JarListDtl, setJarListDtl] = useState([]);

  const getlist = () => {
    axios
      .get(`http://${ipaddress}jardetail/internaluser/${companyid}`)
      .then((response) => {
        console.log("GET list response:", response.data);
        setJarListDtl(response.data); // Store the list in the state
      })
      .catch((error) => {
        console.error("GET list error:", error);
      });
  };

  useEffect(() => {

    getlist();
  }, []);

  return (
    <div className='Container'>
       <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '2%', paddingRight: '-20px' }} > <FontAwesomeIcon
          icon={faUserCheck}
          style={{
            marginRight: '8px',
            color: 'black', // Set the color to golden
          }}
        />User Rights</h5>

      <Card style={{ backgroundColor: "#F8F8F8" }}>
        <CardBody>
          <Row>
            <Col sm={4}>

              <FormGroup>
                <Label className="forlabel" for="branchId">Branch Name</Label>
                <Input
                  type="text"
                  name="branchname"
                  id="branchname"
                  value={branchname}

                  readOnly
                />
              </FormGroup>

            </Col>
            <Col sm={4}>


              <FormGroup>
                <Label className="forlabel" for="user_Type">User Name</Label>
                <Input
                  type="select"
                  name="user_Type"
                  id="user_Type"

                  onChange={(e) => { setSelectedUsername(e.target.value); handleUserId(e); handlegetUser(e); setUserNameDropdownValue(e.target.value); handleuserid(e); handletargetuser(e) }}
                >
                  <option value="">select user</option>
                  {JarListDtl.map((data, index) => (
                    <option key={index} value={data.jarDtlDesc}>
                      {data.jarDtlDesc}
                    </option>
                  ))}
                </Input>

                
              </FormGroup>
            </Col>

            <Col sm={4} style={{ marginTop: '30px' }}>
            
              <Button
                variant="outline-success"
                onClick={() => {
                  handleSaveUserRights();
                }
                }
disabled={!userNameDropdownValue.length>0}
              >
                <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                Submit
              </Button>
            </Col>
            
        <hr/>
            {/* <Col sm={4}>


              {Array.isArray(statuslist) && statuslist.length > 0 ? (
                <FormGroup>
                  <Label className="forlabel" for="branchId">Status</Label>
                  <Input
                    type="text"
                    name="branchname"
                    id="branchname"
                    value={getstatus === 'A' ? 'Approved' : getstatus === 'N' ? 'New' : getstatus === 'E' ? 'Edit' : getstatus}
                    readOnly
                  />
                  <span hidden ref={statusBySpanRef}>{statuslist.status}</span>
                </FormGroup>


              ) : (
                <FormGroup>
                  <Label className="forlabel" for="branchId">Status</Label>
                  <Input
                    type="text"
                    name="branchname"
                    id="branchname"
                    value={getstatus === 'A' ? 'Approved' : getstatus === 'N' ? 'New' : getstatus === 'E' ? 'Edit' : getstatus}
                    readOnly
                  />
                  <span hidden ref={statusBySpanRef}>{statuslist.status}</span>
                </FormGroup>

              )}
            </Col> */}

          </Row>
          <Row>

            {/* <Col sm={4}>


              {Array.isArray(statuslist && usernameforcreatedby) && statuslist.length > 0 && usernameforcreatedby.length > 0 ? (


                <FormGroup>
                  <Label className="forlabel" for="branchId">Created By</Label>
                  <Input
                    type="text"
                    name="branchname"
                    id="branchname"
                    value={getcreated}

                    readOnly
                  />
                  <span hidden ref={createBySpanRef}>{statuslist.created_By}</span>
                  <span hidden ref={createdBySpanRef2}>{usernameforcreatedby}</span>
                </FormGroup>
              ) : (

                <FormGroup>
                  <Label className="forlabel" for="branchId">Created By</Label>
                  <Input
                    type="text"
                    name="branchname"
                    id="branchname"
                    value={getcreated}

                    readOnly
                  />
                  <span hidden ref={createBySpanRef}>{statuslist.created_By}</span>
                  <span hidden ref={createdBySpanRef2}>{usernameforcreatedby}</span>
                </FormGroup>

              )}

            </Col> */}
          </Row>
          <Row>
            {/* <Col sm={4} style={{ marginTop: '30px' }}>
              <Button disabled={statuslist.status === 'A' || selectedUsername === 'No' || statuslist.status === undefined} variant="outline-danger" onClick={() => { handleSaveUserRights(); }} style={{ marginRight: 20 }}> <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />Save</Button>
              <Button
                variant="outline-danger"
                onClick={() => {
                  handleSubmitUserRights();
                }
                }

                disabled={statuslist.status === undefined}
              >
                <FontAwesomeIcon icon={faCheck} style={{ marginRight: '5px' }} />
                Submit
              </Button>
            </Col> */}
            {/* <Col sm={4}>
              {Array.isArray(statuslist) && statuslist.length > 0 ? (



                <FormGroup>
                  <Label className="forlabel" for="branchId">Approved By</Label>
                  <Input
                    type="text"
                    name="branchname"
                    id="branchname"
                    value={getapprove}

                    readOnly
                  />
                  <span hidden ref={approvedBySpanRef}>{statuslist.approved_By}</span>
                </FormGroup>
              ) : (
                <FormGroup>
                  <Label className="forlabel" for="branchId">Approved By</Label>
                  <Input
                    type="text"
                    name="branchname"
                    id="branchname"
                    value={getapprove}

                    readOnly
                  />
                  <span hidden ref={approvedBySpanRef}>{statuslist.approved_By}</span>
                </FormGroup>


              )}

            </Col> */}
          </Row>
          <Row>
            <Col sm={8}>
            <div className="table-responsive">
  <Table className="table table-striped table-hover">
                <thead className='success'>
                  <tr>
                    <th style={{backgroundColor: '#BADDDA'}}>Parent Menu Process</th>
                    <th className="colsize tablehead" style={{ backgroundColor: '#BADDDA'}}>Read</th>
                    <th className="colsize tablehead" style={{ backgroundColor: '#BADDDA' }}>Add</th>
                    <th className="colsize tablehead" style={{ backgroundColor: '#BADDDA' }}>Edit</th>
                    <th className="colsize tablehead" style={{ backgroundColor: '#BADDDA' }}>Remove</th>
                    <th className="colsize tablehead" style={{ backgroundColor: '#BADDDA' }}>Approve</th>
                  </tr>
                </thead>
                <tbody>
                  {currentParentMenus.map((pm, index1) => (
                    <tr key={index1}>
                      <td>{pm.pmenu_Name}</td>
                      <td className="text-center">
                        <div className="mb-3">
                          <Form.Check
                            type="checkbox"
                            checked={pm.read === 'Y'}
                            onChange={(e) => handleReadChange(e, pm.processId)}
                          />
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="mb-3">
                          <Form.Check
                            type="checkbox"
                            checked={pm.create === 'Y'}
                            onChange={(e) => handleCreateChange(e, pm.processId)}
                          />
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="mb-3">
                          <Form.Check
                            type="checkbox"
                            checked={pm.update === 'Y'}
                            onChange={(e) => handleUpdateChange(e, pm.processId)}
                          />
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="mb-3">
                          <Form.Check
                            type="checkbox"
                            checked={pm.deleteRight === 'Y'}
                            onChange={(e) => handleDeleteChange(e, pm.processId)}
                          />
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="mb-3">
                          <Form.Check
                            type="checkbox"
                            checked={pm.approve === 'Y'}
                            onChange={(e) => handleApproveChange(e, pm.processId)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </Table>

              </div>
              <div className="d-flex justify-content-center">

                <Pagination>
                  {Array.from({ length: Math.ceil(parentMenus.length / ITEMS_PER_PAGE) }).map(
                    (item, index1) => (
                      <Pagination.Item
                        key={index1}
                        active={index1 + 1 === activePageParent}
                        onClick={() => handleParentPageChange(index1 + 1)}
                      >
                        {index1 + 1}
                      </Pagination.Item>
                    )
                  )}
                </Pagination>
              </div>
            </Col>
          </Row>





          <Row>
            <Col sm={8}>
            <div className="table-responsive">
  <Table className="table table-striped table-hover">
                <thead className='success' >
                  <tr>
                    {/* <th className="colsize1">#</th> */}
                    <th style={{ backgroundColor: '#BADDDA' }}>Child Menu Process</th>
                    <th className="colsize tablehead " style={{ backgroundColor: '#BADDDA'}}>Read</th>
                    <th className="colsize tablehead" style={{ backgroundColor: '#BADDDA' }}>Add</th>
                    <th className="colsize tablehead" style={{ backgroundColor: '#BADDDA' }}>Edit</th>
                    <th className="colsize tablehead" style={{backgroundColor: '#BADDDA'}}>Remove</th>
                    <th className="colsize tablehead" style={{ backgroundColor: '#BADDDA'}}>Approve</th>
                  </tr>
                </thead>
                <tbody>

                  {currentChildMenus.map((cm, index) => (
                    <tr key={index}>
                      {/* <td>{currentParentMenus.length + index + 1}</td> */}
                      <td>{cm.child_Menu_Name}</td>
                      <td className="text-center">
                        <div className="mb-3">
                          <Form.Check
                            type="checkbox"
                            checked={cm.read === 'Y'}
                            onChange={(e) => handleChildReadChange(e, cm.processId)}
                          />
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="mb-3">
                          <Form.Check
                            type="checkbox"
                            checked={cm.create === 'Y'}
                            onChange={(e) => handleChildCreateChange(e, cm.processId)}
                          />
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="mb-3">
                          <Form.Check
                            type="checkbox"
                            checked={cm.update === 'Y'}
                            onChange={(e) => handleChildUpdateChange(e, cm.processId)}
                          />
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="mb-3">
                          <Form.Check
                            type="checkbox"
                            checked={cm.deleteRight === 'Y'}
                            onChange={(e) => handleChildDeleteChange(e, cm.processId)}
                          />
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="mb-3">
                          <Form.Check
                            type="checkbox"
                            checked={cm.approve === 'Y'}
                            onChange={(e) => handleChildApproveChange(e, cm.processId)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              </div>
              <div className="d-flex justify-content-center">
                {/* <Pagination>
            {Array.from({ length: Math.ceil(childMenus.length / ITEMS_PER_PAGE) }).map(
              (item, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === activePage}
                  onClick={() => handleChildPageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
          </Pagination> */}
                <Pagination>
                  {Array.from({ length: Math.ceil(childMenus.length / ITEMS_PER_PAGE) }).map(
                    (item, index) => (
                      <Pagination.Item
                        key={index}
                        active={index + 1 === activePageChild}
                        onClick={() => handleChildPageChange(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    )
                  )}
                </Pagination>
              </div>
            </Col>
          </Row>

        </CardBody>
      </Card>

    </div >
  );
}