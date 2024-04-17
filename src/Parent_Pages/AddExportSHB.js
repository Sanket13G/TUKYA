import AuthContext from "../Components/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState, useContext, useCallback, useRef, useId } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import "../Components/Style.css";
import ipaddress from "../Components/IpAddress";
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
import DownloadImage from "./DownloadImage";
import contachimage from "../services/contacts.png"
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import DGDCimage from "../Images/DGDC.png";
import InviceService from "../services/InviceService"
import ReactLoading from 'react-loading';
import { FaClosedCaptioning, FaTruck, FaHandPaper, FaPersonBooth, FaTruckLoading } from 'react-icons/fa';
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
import { faArrowCircleLeft, faArrowCircleRight, faArrowLeft, faArrowTurnRight, faAtom, faBolt, faCity, faCross, faExternalLink, faExternalLinkAlt, faGavel, faGear, faHand, faHandFist, faHandHoldingHand, faHandsHolding, faHistory, faIdBadge, faIdCardAlt, faIdCardClip, faPenClip, faPenFancy, faPencil, faPerson, faPersonBooth, faPlaneDeparture, faPlus, faSearch, faSquarePen, faTentArrowTurnLeft, faTruckArrowRight, faUpload, faUserCircle, faWeightHanging, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faAd, faBan, faSyncAlt, faCancel, faCog, faPrint, faXmark, faFileLines, faChessKing } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast } from "react-toastify";
import "../Components/Style.css";
import { Pagination } from "react-bootstrap";
import Select from 'react-select';

export default function AddExportSHB() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const today = new Date().toISOString().split('T')[0];
    // If the user is not authenticated, redirect to the login page
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
        logintype,
        logintypeid,
        userType,
        login,
        logout,
    } = useContext(AuthContext);

    const location = useLocation();
    const sr = location.state?.sbno;
    const er = location.state?.erno;
    const status = location.state?.flag;
    const searchcriteria1 = location.state?.search;

    const Handleback = () => {
        navigate(`/parent/exportshb`, { state: { searchCriteria: searchcriteria1 } })
    };


    const [flag, setFlag] = useState("add");
    const [exportData, setExportData] = useState({
        companyId: '',
        branchId: '',
        sbNo: '',
        erNo: '',
        erDate: null,
        sbDate: new Date(),
        iecCode: '',
        entityId: '',
        nameOfExporter: '',
        grossWeight: '',
        uomGrossWeight: 'KGS',
        countryOfDestination: '',
        portOfDestination: '',
        airwayBillNo: '',
        descriptionOfGoods: '',
        parcelStatus: 'Pending',
        dgdcStatus: 'Handed over to DGDC SHB',
        chaName: '',
        consoleAgent: '',
        fobValueInINR: '',
        noOfPackages: '',
        noOfPackates: '',
        uomOfPackages: '',
        status: '',
        createdBy: '',
        createdDate: null,
        editedBy: '',
        editedDate: null,
        approvedBy: '',
        approvedDate: null,
        consolePartyRepresentativeId: '',
        customPctmNo: '',
        customTpNo: '',
        customTpDate: null,
        customPctmDate: null,
        pctmNo: '',
        tpNo: '',
        tpDate: null,
        pctmDate: null,
        hawb: '',
        airlineName: '',
        flightNo: '',
        airlineCode: '',
        flightDate: null,
        holdStatus: '',
        holdBy: '',
        hpStatus: '',
        imposePenaltyAmount: 0,
        imposePenaltyRemarks: '',
        reasonforOverride: '',
        overrideDocument: '',
        cancelStatus: '',
        cancelRemarks: '',
        gatePassVehicleNo: '',
        pOName: '',
        gatePassStatus: '',
        imagePath: '',
        redepositeRemark: '',
        backtotownRemark: '',
        backtotownFilePath: '',
        epCopyDocument: '',
        dgdc_shb_in_scan: 0,
        dgdc_shb_out_scan: 0,
        dgdc_cargo_in_scan: 0,
        dgdc_cargo_out_scan: 0,
        outDate: null,
        airLineDate: null,
        fobValueInDollar: '',
        cts: '',
        ctsUnit: 'Carats',
        dollarRate: '',
        kpcNo: '',
        snzStatus: ''
    });

    const [parties, setParties] = useState([]);
    const [partyName, setparty_Name] = useState('');
    const [partyId, setparty_Id] = useState('');

    const findParties = async () => {
        const partyResponse = await Rate_Chart_Service.getAllParties1(companyid, branchId);
        const partyOptions = partyResponse.data.map(party => ({
            value: party.partyId,
            label: party.partyName,
            iec: party.iecNo,
            entity: party.entityId,
        }));
        setParties(partyOptions);

    };

    const [portData, setPortData] = useState([]);
    const [portName, setportName] = useState('');

    const findPortOfDest = async () => {
        const response = await axios.get(`http://${ipaddress}jardetail/port/${companyid}`)
        const portOption = response.data.map(port => ({
            value: port.jarDtlDesc,
            label: port.jarDtlId
        }))
        setPortData(portOption);
    }

    const [chaData, setChadata] = useState([]);
    const [consoleData, setConsoleData] = useState([]);
    const [airlineData, setAirlineData] = useState([]);

    const getCHAData = () => {
        const type = "CHA";
        axios.get(`http://${ipaddress}externalparty/getSpecificData/${companyid}/${branchId}/${type}`)
            .then((response) => {
                setChadata(response.data);
            })
            .catch((error) => {
                if (error) {

                }
            })
    }

    const [singleParty, setSingleParty] = useState({});
    const getSinglePartyData = (id) => {
        axios.get(`http://${ipaddress}parties/getpartybyid/${companyid}/${branchId}/${id}`)
            .then((response) => {
                setparty_Name(response.data.partyName);
                setparty_Id(response.data.partyId);
            })
            .catch((error) => {
                if (error) {

                }
            })
    }

    const getConsoleData = () => {
        const type = "Console";
        axios.get(`http://${ipaddress}externalparty/getSpecificData/${companyid}/${branchId}/${type}`)
            .then((response) => {
                setConsoleData(response.data);
            })
            .catch((error) => {
                if (error) {

                }
            })
    }
    const getAirlineData = () => {
        axios.get(`http://${ipaddress}Airline/list/${companyid}/${branchId}`)
            .then((response) => {
                setAirlineData(response.data);
            })
            .catch((error) => {
                if (error) {

                }
            })
    }

    useEffect(() => {
        getCHAData();
        findParties();
        getConsoleData();
        getAirlineData();
        findPortOfDest();
    }, []);

    const [dollarRate, setDollarRate] = useState('');

    const handleDollarRate = (e) => {
        const val = e.target.value;
        setExportData((prevData) => ({
            ...prevData,
            ['fobValueInINR']: exportData.fobValueInDollar * val,
        }));
        // exportData.fobValueInINR = exportData.fobValueInDollar * val;
        setDollarRate(val)
    }

    const handlExportChange = (event) => {
        const { name, value } = event.target;
        setExportData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        document.getElementById(name).classList.remove('error-border');
        setFormErrors(
            {
                name: ""
            }
        )
        if (name === 'airwayBillNo') {
            document.getElementById('airlineName').classList.remove('error-border');
            setFormErrors(
                {
                    'airlinename': ""
                }
            )
        }

        if (name === 'fobValueInDollar') {
            console.log("INR Val ", value);
            setExportData((prevData) => ({
                ...prevData,
                ['fobValueInINR']: dollarRate * value,
            }));
            exportData.fobValueInINR = dollarRate * value;
        }


    };

    const handleSBDateChange = (date) => {
        setExportData({
            ...exportData,
            sbDate: date,
        });

        document.getElementById('sbDate').classList.remove('error-border');
        setFormErrors(
            {
                'sbDate': ""
            }
        )
    };

    const handleTpDateChange = (date) => {
        setExportData({
            ...exportData,
            customTpDate: date,
        });
    };

    const handlePctmDateChange = (date) => {
        setExportData({
            ...exportData,
            customPctmDate: date,
        });
    };

    const handlePartyChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setparty_Name('');
            setparty_Id('');
            setExportData({
                ...exportData,
                iecCode: '',
                entityId: ''
            });

            setGetKpcData([]);
        }
        else {
            setparty_Name(selectedOption ? selectedOption.label : '');
            setparty_Id(selectedOption ? selectedOption.value : '');

            setExportData({
                ...exportData,
                iecCode: selectedOption ? selectedOption.iec : '',
                entityId: selectedOption ? selectedOption.entity : '',
            });

            if (selectedOption.value === 'SNZPARTY') {
                console.log("1234");
                fetchKPCData();

            }
            else {
                setGetKpcData([]);
            }

        }
    };

    const handlePortChange = async (selectedOption, { action }) => {

        if (action === 'clear') {
            setportName('');
            setExportData({
                ...exportData,
                portOfDestination: '',
                countryOfDestination: ''
            });
        }
        else {
            setportName(selectedOption ? selectedOption.label : '');

            setExportData({
                ...exportData,
                portOfDestination: selectedOption ? selectedOption.label : '',
                countryOfDestination: selectedOption ? selectedOption.value : '',
            });

        }
    };

    const findAirlineName = (id) => {
        const code = id.substring(0, 3);
        const data = airlineData.find(item => item.airlineCode === code);
        if (data) {
            setExportData((prevData) => ({
                ...prevData,
                airlineName: data ? data.airlineName : '',
                airlineCode: data ? data.airlineCode : '',
                flightNo: data ? data.flightNo : ''
            }));
        }
        else {
            setExportData((prevData) => ({
                ...prevData,
                airlineName: '',
                airlineCode: '',
                flightNo: ''
            }));
        }

    }


    const [formErrors, setFormErrors] = useState({
        sbNo: '',
        sbDate: '',
        hawb: '',
        exporter: '',
        airway: '',
        country: '',
        port: '',
        gross: '',
        uomgross: '',
        cha: '',
        console: '',
        fob: '',
        nop: '',
        packats: '',
        cts: '',
        ctsunit: '',
        fobdollar: '',
        airlinename: ''
    })

    const [oldSb, setOldSb] = useState('');
    const handleSubmit = () => {




        const submitBtn = document.getElementById("submitBtn1");
        submitBtn.disabled = true;

        let errors = {};
        if (!exportData.sbNo) {
            errors.sbNo = "SB No. is required.";
            document.getElementById('sbNo').classList.add('error-border');
        }


        if (!exportData.sbDate) {
            errors.sbDate = "SB Date is required.";
            document.getElementById('sbDate').classList.add('error-border');
        }

        if (!exportData.hawb) {
            errors.hawb = "HAWB is required.";
            document.getElementById('hawb').classList.add('error-border');
        }

        if (!partyId) {
            errors.exporter = "Exporter is required.";
            document.getElementById('nameOfExporter').classList.add('error-border');
        }

        // if (!exportData.airwayBillNo) {
        //     errors.airway = "Airway Bill No. is required.";
        //     document.getElementById('airwayBillNo').classList.add('error-border');
        // }
        // else {
        //     if (exportData.airwayBillNo.length != 11) {
        //         errors.airway = "Airway bill number must consist of 11 digits.";
        //         document.getElementById('airwayBillNo').classList.add('error-border');
        //     }
        // }

        // if (!exportData.airlineName) {
        //     errors.airlinename = "Please enter the corrected airway bill no.";
        //     document.getElementById('airlineName').classList.add('error-border');
        // }

        if (!exportData.countryOfDestination) {
            errors.country = "Country Of Destination is required.";
            document.getElementById('countryOfDestination').classList.add('error-border');
        }

        if (!exportData.portOfDestination) {
            errors.port = "Port Of Destination is required.";
            document.getElementById('portOfDestination').classList.add('error-border');
        }

        if (!exportData.grossWeight) {
            errors.gross = "Gross wt. is required.";
            document.getElementById('grossWeight').classList.add('error-border');
        }

        if (!exportData.uomGrossWeight) {
            errors.uomgross = "UOM Gross Weight is required.";
            document.getElementById('uomGrossWeight').classList.add('error-border');
        }

        if (!exportData.cts) {
            errors.cts = "CTS is required.";
            document.getElementById('cts').classList.add('error-border');
        }

        if (!exportData.ctsUnit) {
            errors.ctsunit = "CTS Unit is required.";
            document.getElementById('ctsUnit').classList.add('error-border');
        }

        if (!exportData.chaName) {
            errors.cha = "CHA is required.";
            document.getElementById('chaName').classList.add('error-border');
        }

        if (!exportData.consoleAgent) {
            errors.console = "Console is required.";
            document.getElementById('consoleAgent').classList.add('error-border');
        }

        if (!exportData.fobValueInINR) {
            errors.fob = "FOB Value is required.";
            document.getElementById('fobValueInINR').classList.add('error-border');
        }

        if (!exportData.noOfPackages) {
            errors.nop = "No of Packages is required.";
            document.getElementById('noOfPackages').classList.add('error-border');
        }

        if (!exportData.noOfPackates) {
            errors.packats = "No of Packats is required.";
            document.getElementById('noOfPackates').classList.add('error-border');
        }
        if (!exportData.fobValueInDollar) {
            errors.fobdollar = "Fob value in Dollar is required.";
            document.getElementById('fobValueInDollar').classList.add('error-border');
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            submitBtn.disabled = false;
            return;
        }


        if (sbData === 'found') {
            toast.error("SB No. already exist.", {
                autoClose: 800
            })
            submitBtn.disabled = false;
            return;
        }
        exportData.nameOfExporter = partyId;

        if (partyId === 'SNZPARTY') {
            if (selectedRows2.length === 0) {
                toast.error("Please select atleast one checkbox", {
                    autoClose: 700
                })
                submitBtn.disabled = false;
                return;
            }
            const kpcids = selectedRows2.map(row => row.kpcNo);
            const kpcidString = kpcids.join(',');
            exportData.kpcNo = kpcidString;

            const totalSNZCTS = selectedRows2.reduce((total, item) => total + item.grossWeightInCarats, 0);

            if (exportData.cts != totalSNZCTS) {
                toast.error('The Export CTS value is not equal to the total CTS of the selected records.', {
                    autoClose: 1000
                })
                submitBtn.disabled = false;
                return;
            }
            submitBtn.disabled = false;
        }

        axios.post(`http://${ipaddress}exportshb/saveData/${companyid}/${branchId}/${userId}`, exportData)
            .then((response) => {
                const data = response.data;
                if (data != null) {
                    setExportData(data);
                    toast.success("New export data added successfully", {
                        autoClose: 800
                    })
                    submitBtn.disabled = false;
                    setFlag("edit");
                    setOldSb(data.sbNo)
                    handleErrorsClear();
                }
                else {
                    toast.error("Something went wrong!", {
                        autoClose: 800
                    })
                    submitBtn.disabled = false;
                }
            })
            .catch((error) => {
                if (error) {
                    toast.error("Something went wrong!", {
                        autoClose: 800
                    })

                    submitBtn.disabled = false;
                }
            })
    }



    const handleEditSubmit = () => {
        const submitBtn = document.getElementById("submitbtn2");
        submitBtn.disabled = true;
        let errors = {};
        if (!exportData.sbNo) {
            errors.sbNo = "SB No. is required.";
            document.getElementById('sbNo').classList.add('error-border');
        }


        if (!exportData.sbDate) {
            errors.sbDate = "SB Date is required.";
            document.getElementById('sbDate').classList.add('error-border');
        }

        if (!exportData.hawb) {
            errors.hawb = "HAWB is required.";
            document.getElementById('hawb').classList.add('error-border');
        }

        if (!partyId) {
            errors.exporter = "Exporter is required.";
            document.getElementById('nameOfExporter').classList.add('error-border');
        }

        // if (!exportData.airwayBillNo) {
        //     errors.airway = "Airway Bill No. is required.";
        //     document.getElementById('airwayBillNo').classList.add('error-border');
        // }
        // else {
        //     if (exportData.airwayBillNo.length != 11) {
        //         errors.airway = "Airway bill number must consist of 11 digits.";
        //         document.getElementById('airwayBillNo').classList.add('error-border');
        //     }
        // }

        // if (!exportData.airlineName) {
        //     errors.airlinename = "Please enter the corrected airway bill no.";
        //     document.getElementById('airlineName').classList.add('error-border');
        // }

        if (!exportData.countryOfDestination) {
            errors.country = "Country Of Destination is required.";
            document.getElementById('countryOfDestination').classList.add('error-border');
        }

        if (!exportData.portOfDestination) {
            errors.port = "Port Of Destination is required.";
            document.getElementById('portOfDestination').classList.add('error-border');
        }

        if (!exportData.grossWeight) {
            errors.gross = "Gross wt. is required.";
            document.getElementById('grossWeight').classList.add('error-border');
        }

        if (!exportData.uomGrossWeight) {
            errors.uomgross = "UOM Gross Weight is required.";
            document.getElementById('uomGrossWeight').classList.add('error-border');
        }

        if (!exportData.cts) {
            errors.cts = "CTS is required.";
            document.getElementById('cts').classList.add('error-border');
        }

        if (!exportData.ctsUnit) {
            errors.ctsunit = "CTS Unit is required.";
            document.getElementById('ctsUnit').classList.add('error-border');
        }

        if (!exportData.chaName) {
            errors.cha = "CHA is required.";
            document.getElementById('chaName').classList.add('error-border');
        }

        if (!exportData.consoleAgent) {
            errors.console = "Console is required.";
            document.getElementById('consoleAgent').classList.add('error-border');
        }

        if (!exportData.fobValueInINR) {
            errors.fob = "FOB Value is required.";
            document.getElementById('fobValueInINR').classList.add('error-border');
        }

        if (!exportData.noOfPackages) {
            errors.nop = "No of Packages is required.";
            document.getElementById('noOfPackages').classList.add('error-border');
        }

        if (!exportData.noOfPackates && exportData.noOfPackates !== 0) {
            errors.packats = "No of Packats is required.";
            document.getElementById('noOfPackates').classList.add('error-border');
        }
        if (!exportData.fobValueInDollar) {
            errors.fobdollar = "Fob value in Dollar is required.";
            document.getElementById('fobValueInDollar').classList.add('error-border');
        }
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            submitBtn.disabled = false;
            return;
        }


        if (sbData === 'found' && oldSb != exportData.sbNo) {
            toast.error("SB No. already exist.", {
                autoClose: 800
            })
            submitBtn.disabled = false;
            return;
        }


        if (partyId === 'SNZPARTY') {
            if (selectedRows2.length === 0) {
                toast.error("Please select atleast one checkbox", {
                    autoClose: 700
                })
                submitBtn.disabled = false;
                return;
            }
            console.log('selectedRows2 ',selectedRows2);
            const kpcids = selectedRows2.map(row => row.kpcNo);
            const kpcidString = kpcids.join(',');
            exportData.kpcNo = kpcidString;

            const totalSNZCTS = selectedRows2.reduce((total, item) => total + item.grossWeightInCarats, 0);
console.log("totalSNZCTS ",totalSNZCTS);

            if (exportData.cts != totalSNZCTS) {
                toast.error('The Export CTS value is not equal to the total CTS of the selected records.', {
                    autoClose: 1000
                })
                submitBtn.disabled = false;
                return;
            }
            submitBtn.disabled = false;
        }
        else{
            setSelectedRows2([]);
        }

        exportData.nameOfExporter = partyId;
        axios.post(`http://${ipaddress}exportshb/editData/${companyid}/${branchId}/${userId}`, exportData)
            .then((response) => {
                const data = response.data;
                if (data != null) {
                    setExportData(data);
                    toast.success("New export data added successfully", {
                        autoClose: 800
                    })
                    setFlag("edit");
                    handleErrorsClear();
                    submitBtn.disabled = false;
                }
                else {
                    toast.error("Something went wrong!", {
                        autoClose: 800
                    })
                    submitBtn.disabled = false;
                }
            })
            .catch((error) => {
                if (error) {
                    toast.error("Something went wrong!", {
                        autoClose: 800
                    })
                    submitBtn.disabled = false;
                }
            })
    }

    const [sbData, setSbdata] = useState('');
    const checkSbNo = (sb) => {
        axios.get(`http://${ipaddress}exportshb/getSbNo/${companyid}/${branchId}/${sb}`)
            .then((response) => {
                const data = response.data;
                setSbdata(data);
                if (flag === 'add') {
                    if (data === 'found') {
                        document.getElementById('sbNo').classList.add('error-border');
                        setFormErrors(
                            {
                                'sbNo': "SB No. already exist"
                            }
                        )
                    }
                }
                if (flag === 'edit') {
                    if (data === 'found' && sb != oldSb) {
                        document.getElementById('sbNo').classList.add('error-border');
                        setFormErrors(
                            {
                                'sbNo': "SB No. already exist"
                            }
                        )
                    }
                }
            })
            .catch((error) => {
                if (error) {


                }
            })
    }



    const handleErrorsClear = () => {
        setFormErrors({
            sbNo: '',
            sbDate: '',
            hawb: '',
            exporter: '',
            airway: '',
            country: '',
            port: '',
            gross: '',
            uomgross: '',
            cha: '',
            console: '',
            fob: '',
            nop: '',
            airlinename: ''
        })
        document.getElementById('sbNo').classList.remove('error-border');
        document.getElementById('sbDate').classList.remove('error-border');
        document.getElementById('hawb').classList.remove('error-border');
        document.getElementById('nameOfExporter').classList.remove('error-border');
        document.getElementById('airwayBillNo').classList.remove('error-border');
        document.getElementById('countryOfDestination').classList.remove('error-border');
        document.getElementById('portOfDestination').classList.remove('error-border');
        document.getElementById('grossWeight').classList.remove('error-border');
        document.getElementById('uomGrossWeight').classList.remove('error-border');
        document.getElementById('chaName').classList.remove('error-border');
        document.getElementById('consoleAgent').classList.remove('error-border');
        document.getElementById('fobValueInINR').classList.remove('error-border');
        document.getElementById('noOfPackages').classList.remove('error-border');
        document.getElementById('airlineName').classList.remove('error-border');
    }


    const handleClear = () => {
        setSelectedRows2([]);
        setSelectAll2(false);
        setGetKpcData([]);
        setExportData({
            companyId: '',
            branchId: '',
            sbNo: '',
            erNo: '',
            erDate: null,
            sbDate: new Date(),
            iecCode: '',
            entityId: '',
            nameOfExporter: '',
            grossWeight: '',
            uomGrossWeight: 'KGS',
            countryOfDestination: '',
            portOfDestination: '',
            airwayBillNo: '',
            descriptionOfGoods: '',
            parcelStatus: 'Pending',
            dgdcStatus: 'Handed over to DGDC SHB',
            chaName: '',
            consoleAgent: '',
            fobValueInINR: '',
            noOfPackages: '',
            noOfPackates: '',
            uomOfPackages: '',
            status: '',
            createdBy: '',
            createdDate: null,
            editedBy: '',
            editedDate: null,
            approvedBy: '',
            approvedDate: null,
            consolePartyRepresentativeId: '',
            customPctmNo: '',
            customTpNo: '',
            customTpDate: null,
            customPctmDate: null,
            pctmNo: '',
            tpNo: '',
            tpDate: null,
            pctmDate: null,
            hawb: '',
            airlineName: '',
            flightNo: '',
            airlineCode: '',
            flightDate: null,
            holdStatus: '',
            holdBy: '',
            hpStatus: '',
            imposePenaltyAmount: 0,
            imposePenaltyRemarks: '',
            reasonforOverride: '',
            overrideDocument: '',
            cancelStatus: '',
            cancelRemarks: '',
            gatePassVehicleNo: '',
            pOName: '',
            gatePassStatus: '',
            imagePath: '',
            redepositeRemark: '',
            backtotownRemark: '',
            backtotownFilePath: '',
            epCopyDocument: '',
            dgdc_shb_in_scan: 0,
            dgdc_shb_out_scan: 0,
            dgdc_cargo_in_scan: 0,
            dgdc_cargo_out_scan: 0,
            outDate: null,
            airLineDate: null,
            fobValueInDollar: '',
            cts: '',
            ctsUnit: 'Carats',
            dollarRate: '',
            kpcNo: '',
            snzStatus: ''
        })
        setparty_Name('');
        setparty_Id('');
        setFlag("add");
        setportName('');
        setFormErrors({
            sbNo: '',
            sbDate: '',
            hawb: '',
            exporter: '',
            airway: '',
            country: '',
            port: '',
            gross: '',
            uomgross: '',
            cha: '',
            console: '',
            fob: '',
            packats: '',
            cts: '',
            ctsunit: '',
            fobdollar: '',
            nop: '',
            airlinename: ''
        })
        document.getElementById('sbNo').classList.remove('error-border');
        document.getElementById('sbDate').classList.remove('error-border');
        document.getElementById('hawb').classList.remove('error-border');
        document.getElementById('nameOfExporter').classList.remove('error-border');
        document.getElementById('airwayBillNo').classList.remove('error-border');
        document.getElementById('countryOfDestination').classList.remove('error-border');
        document.getElementById('portOfDestination').classList.remove('error-border');
        document.getElementById('grossWeight').classList.remove('error-border');
        document.getElementById('uomGrossWeight').classList.remove('error-border');
        document.getElementById('cts').classList.remove('error-border');
        document.getElementById('ctsUnit').classList.remove('error-border');
        document.getElementById('noOfPackates').classList.remove('error-border');
        document.getElementById('fobValueInDollar').classList.remove('error-border');
        document.getElementById('chaName').classList.remove('error-border');
        document.getElementById('consoleAgent').classList.remove('error-border');
        document.getElementById('fobValueInINR').classList.remove('error-border');
        document.getElementById('noOfPackages').classList.remove('error-border');
        document.getElementById('airlineName').classList.remove('error-border');
    }

    const getExistingExpData = () => {
        if (status === 'edit' || status === 'view') {
            axios.get(`http://${ipaddress}exportshb/getBySbNoAndErNo/${companyid}/${branchId}/${sr}/${er}`)
                .then(async (response) => { // Define the callback function as async
                    const data = response.data;
                    if (data != null) {
                        if (data.nameOfExporter === 'SNZPARTY') {
                            fetchKPCData(data);
                        }
                        await getSinglePartyData(data.nameOfExporter);
                        setExportData(data);
                        setportName(data.portOfDestination);
                        setDollarRate(data.fobValueInINR / data.fobValueInDollar);
                    }
                })
                .catch((error) => {
                    if (error) {
                        // Handle error
                    }
                })
        }
    }


    useState(() => {
        getExistingExpData();
    }, [])


    const printBarcode = async (mawb, seino, nop, sirdate, reqdate, niptStatus, requestId) => {
        try {
            const response = await InviceService.getbarcode(mawb, seino, nop, sirdate, reqdate, "EXPORT", niptStatus, requestId, "HAWB", "IGM", "exp");

            // Check if the response status is OK (200)
            if (response.status === 200) {
                // Get the raw response data as base64-encoded string
                const newWindow = window.open('', '_blank');
                newWindow.document.write(response.data);
                setTimeout(() => {
                    newWindow.print(); // Open the print dialog
                }, 100);
            } else {
                throw new Error('Failed to generate PDF');
            }
        } catch (error) {
        }
    };

    const formatDateTime = (value) => {
        if (!value) {
            return ""; // Return an empty string if value is empty or undefined
        }

        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        return `${day}/${month}/${year} `;
    };

    const [getKpcData, setGetKpcData] = useState([]);
    const fetchKPCData = (exp) => {
        let ip = '';
    
        if (status === 'edit' || status === 'view') {
            ip = `http://${ipaddress}exportshb/getExistingKpcData/${companyid}/${branchId}/${sr}/${er}`;
        } else {
            ip = `http://${ipaddress}import/getKpcData/${companyid}/${branchId}`;
        }
    
        axios.get(ip)
            .then((response) => {
                const data = response.data;
                console.log("KPCdata ", data);
                if (data.length > 0) {
                    setGetKpcData(data);
                }
    
                if (status === 'edit' || status === 'view') {
                    let snzData = exp.kpcNo.split(",");
                    console.log("snzData ",exp.kpcNo);
                    const rowsToAdd = data.filter(row => snzData.includes(row.kpcNo));
                    console.log("rowsToAdd ",rowsToAdd);
                    handleCheckboxChange3(rowsToAdd);
                }
            })
            .catch((error) => {
                // Handle error
            });
    };
    
    const [selectedRows2, setSelectedRows2] = useState([]);
    const [selectAll2, setSelectAll2] = useState(false);
    
    const handleCheckboxChange3 = (items) => {
        console.log('items', items);
        // Toggle the selection state for the clicked rows
        const updatedRows = [...selectedRows2];
    
        if (Array.isArray(items)) {
            // If items is an array, toggle each item
            items.forEach(item => {
                const index = updatedRows.findIndex(row => row === item);
                if (index !== -1) {
                    updatedRows.splice(index, 1); // Remove item if already selected
                } else {
                    updatedRows.push(item); // Add item if not selected
                }
            });
        } else {
            // If items is not an array (single item), toggle it
            const index = updatedRows.findIndex(row => row === items);
            if (index !== -1) {
                updatedRows.splice(index, 1); // Remove item if already selected
            } else {
                updatedRows.push(items); // Add item if not selected
            }
        }
    
        setSelectedRows2(updatedRows);
    
        // Check if all rows are selected
        if (updatedRows.length === getKpcData.length) {
            setSelectAll2(true);
        } else {
            setSelectAll2(false);
        }
    };
    
    const handleSelectAll2 = () => {
        if (selectAll2) {
            setSelectedRows2([]);
        } else {
            setSelectedRows2([...getKpcData]);
        }
        setSelectAll2(!selectAll2);
    };
    
    return (
        <div className="container">
            <div className="col-md-6">
                <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
                    icon={faPlaneDeparture}
                    style={{
                        marginRight: '8px',
                        color: 'black', // Set the color to golden
                    }}
                />Add New Export</h5>

            </div>

            <Card>
                <CardBody>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    SB No<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="sbNo"
                                    name="sbNo"
                                    value={exportData.sbNo}
                                    onChange={(e) => { handlExportChange(e); checkSbNo(e.target.value) }}
                                    maxLength={15}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                />

                                <div style={{ color: 'red' }} className="error-message">{formErrors.sbNo}</div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    SB Date<span style={{ color: 'red' }}>*</span>
                                </label>
                                <DatePicker
                                    selected={exportData.sbDate}

                                    id="sbDate"
                                    dateFormat="dd/MM/yyyy"
                                    value={exportData.sbDate} // Set the value from the database
                                    className="form-control"
                                    onChange={handleSBDateChange}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                    customInput={
                                        <input
                                            style={{
                                                height: "38px",
                                                width: "100%",
                                                backgroundColor: status === 'view' ? '#E0E0E0' : ''
                                            }}
                                        />

                                    }

                                />
                                <div style={{ color: 'red' }} className="error-message">{formErrors.sbDate}</div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    ER No
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="erNo"
                                    name="erNo"
                                    value={exportData.erNo}
                                    readOnly
                                    style={{ backgroundColor: '#E0E0E0' }}
                                    onChange={handlExportChange}


                                />

                                {/* <div style={{ color: 'red' }} className="error-message">{formErrors.sbRequestId}</div> */}
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    HAWB No<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="hawb"
                                    name="hawb"
                                    value={exportData.hawb}
                                    onChange={handlExportChange}
                                    maxLength={15}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}

                                />

                                <div style={{ color: 'red' }} className="error-message">{formErrors.hawb}</div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Airline Name
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="airlineName"
                                    name="airlineName"
                                    value={exportData.airlineName}
                                    readOnly
                                    style={{ backgroundColor: '#E0E0E0' }}
                                    onChange={handlExportChange}

                                />

                                <div style={{ color: 'red' }} className="error-message">{formErrors.airlinename}</div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Airway Bill No<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="airwayBillNo"
                                    name="airwayBillNo"
                                    value={exportData.airwayBillNo}
                                    onChange={(e) => { handlExportChange(e); findAirlineName(e.target.value) }}
                                    maxLength={11}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                />

                                <div style={{ color: 'red' }} className="error-message">{formErrors.airway}</div>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>

                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    IEC Code
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="iecCode"
                                    name="iecCode"
                                    value={exportData.iecCode}
                                    readOnly
                                    style={{ backgroundColor: '#E0E0E0' }}
                                //  onChange={handlExportChange}

                                />

                                {/* <div style={{ color: 'red' }} className="error-message">{formErrors.sbRequestId}</div> */}
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Name Of Exporter<span style={{ color: 'red' }}>*</span>
                                </label>
                                <Select
                                    options={parties}
                                    placeholder="Select a party"
                                    isClearable
                                    value={{ value: partyId, label: partyName }}
                                    id="nameOfExporter"
                                    onChange={handlePartyChange}
                                    isDisabled={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}

                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                border: '1px solid #ccc'
                                            }
                                        }),
                                        indicatorSeparator: () => ({
                                            display: 'none'
                                        }),
                                        dropdownIndicator: () => ({
                                            display: 'none'
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            display: 'flex',
                                            color: 'gray',
                                        }),
                                    }}
                                />

                                <div style={{ color: 'red' }} className="error-message">{formErrors.exporter}</div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Port Of Destination<span style={{ color: 'red' }}>*</span>
                                </label>
                                <Select
                                    options={portData}
                                    isClearable
                                    value={{ value: portName, label: portName }}
                                    id="portOfDestination"
                                    onChange={handlePortChange}
                                    isDisabled={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}

                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            border: state.isFocused ? '1px solid #ccc' : '1px solid #ccc',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                border: '1px solid #ccc'
                                            }
                                        }),
                                        indicatorSeparator: () => ({
                                            display: 'none'
                                        }),
                                        dropdownIndicator: () => ({
                                            display: 'none'
                                        }),
                                        placeholder: (provided) => ({
                                            ...provided,
                                            display: 'flex',
                                            color: 'gray',
                                        }),
                                    }}
                                />
                                {/* <input
                                    className="form-control"
                                    type="text"
                                    id="portOfDestination"
                                    name="portOfDestination"
                                    value={exportData.portOfDestination}
                                    onChange={handlExportChange}
                                    maxLength={40}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                /> */}

                                <div style={{ color: 'red' }} className="error-message">{formErrors.port}</div>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Country Of Destination<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="countryOfDestination"
                                    name="countryOfDestination"
                                    value={exportData.countryOfDestination}
                                    onChange={handlExportChange}
                                    maxLength={40}
                                    readOnly
                                    style={{ backgroundColor: '#E0E0E0' }}
                                />

                                <div style={{ color: 'red' }} className="error-message">{formErrors.country}</div>
                            </FormGroup>
                        </Col>

                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Gross Weight<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="grossWeight"
                                    name="grossWeight"
                                    value={exportData.grossWeight}
                                    onChange={handlExportChange}
                                    maxLength={12}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                />

                                <div style={{ color: 'red' }} className="error-message">{formErrors.gross}</div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    UOM Gross Weight<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="uomGrossWeight"
                                    name="uomGrossWeight"
                                    value={exportData.uomGrossWeight}
                                    onChange={handlExportChange}
                                    maxLength={10}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                />

                                <div style={{ color: 'red' }} className="error-message">{formErrors.uomgross}</div>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    CTS<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="cts"
                                    name="cts"
                                    value={exportData.cts}
                                    onChange={handlExportChange}
                                    maxLength={12}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                />

                                <div style={{ color: 'red' }} className="error-message">{formErrors.cts}</div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    CTS Unit<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="ctsUnit"
                                    name="ctsUnit"
                                    value={exportData.ctsUnit}
                                    onChange={handlExportChange}
                                    maxLength={10}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                />

                                <div style={{ color: 'red' }} className="error-message">{formErrors.ctsunit}</div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Description Of Goods
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="descriptionOfGoods"
                                    name="descriptionOfGoods"
                                    value={exportData.descriptionOfGoods}
                                    onChange={handlExportChange}
                                    maxLength={100}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                />

                                {/* <div style={{ color: 'red' }} className="error-message">{formErrors.sbRequestId}</div> */}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>

                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Parcel Status
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="parcelStatus"
                                    name="parcelStatus"
                                    value={exportData.parcelStatus}
                                    readOnly
                                    style={{ backgroundColor: '#E0E0E0' }}
                                    onChange={handlExportChange}

                                />

                                {/* <div style={{ color: 'red' }} className="error-message">{formErrors.sbRequestId}</div> */}
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    DGDC Status
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="dgdcStatus"
                                    name="dgdcStatus"
                                    value={exportData.dgdcStatus}
                                    readOnly
                                    style={{ backgroundColor: '#E0E0E0' }}
                                    onChange={handlExportChange}

                                />

                                {/* <div style={{ color: 'red' }} className="error-message">{formErrors.sbRequestId}</div> */}
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    CHA<span style={{ color: 'red' }}>*</span>
                                </label>

                                <select

                                    className="form-control form-select"
                                    id="chaName"
                                    name="chaName"
                                    value={exportData.chaName}
                                    onChange={handlExportChange}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}

                                >
                                    <option value="">Select CHA</option>
                                    {chaData.map((item, index) => (
                                        <option key={index} value={item[0]}>{item[1]}</option>
                                    ))

                                    }
                                </select>

                                <div style={{ color: 'red' }} className="error-message">{formErrors.cha}</div>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>

                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Console<span style={{ color: 'red' }}>*</span>
                                </label>

                                <select

                                    className="form-control form-select"
                                    id="consoleAgent"
                                    name="consoleAgent"
                                    value={exportData.consoleAgent}
                                    onChange={handlExportChange}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}

                                >
                                    <option value="">Select Console</option>
                                    {consoleData.map((item, index) => (
                                        <option key={index} value={item[0]}>{item[1]}</option>
                                    ))

                                    }
                                </select>

                                <div style={{ color: 'red' }} className="error-message">{formErrors.console}</div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    No Of Packages<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="noOfPackages"
                                    name="noOfPackages"
                                    value={exportData.noOfPackages}
                                    onChange={handlExportChange}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                    maxLength={10}
                                />

                                <div style={{ color: 'red' }} className="error-message">{formErrors.nop}</div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    No Of Packats<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="noOfPackates"
                                    name="noOfPackates"
                                    value={exportData.noOfPackates}
                                    onChange={handlExportChange}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                    maxLength={10}
                                />

                                <div style={{ color: 'red' }} className="error-message">{formErrors.packats}</div>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    FOB Value In DOLLAR<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="fobValueInDollar"
                                    name="fobValueInDollar"
                                    value={exportData.fobValueInDollar}
                                    onChange={handlExportChange}
                                    maxLength={15}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                />

                                <div style={{ color: 'red' }} className="error-message">{formErrors.fobdollar}</div>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    DOLLAR Rate<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"

                                    value={dollarRate}
                                    onChange={handleDollarRate}
                                    maxLength={15}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                />


                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    FOB Value In INR<span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="fobValueInINR"
                                    name="fobValueInINR"
                                    value={exportData.fobValueInINR}
                                    onChange={handlExportChange}
                                    maxLength={15}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                />

                                <div style={{ color: 'red' }} className="error-message">{formErrors.fob}</div>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>


                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Custom TP No
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="customTpNo"
                                    tabIndex="-1"
                                    name="customTpNo"
                                    value={exportData.customTpNo}
                                    onChange={handlExportChange}
                                    maxLength={10}
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                />

                                {/* <div style={{ color: 'red' }} className="error-message">{formErrors.sbRequestId}</div> */}
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Custom TP Date
                                </label>
                                <DatePicker
                                    selected={exportData.customTpDate}

                                    id="customTpDate"
                                    onChange={handleTpDateChange}
                                    tabIndex="-1"
                                    dateFormat="dd/MM/yyyy"
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                    className="form-control"
                                    name="customTpDate"
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                    customInput={
                                        <input
                                            style={{
                                                height: "38px",
                                                width: "100%",
                                                backgroundColor: status === 'view' ? '#E0E0E0' : ''
                                            }}
                                        />

                                    }

                                />

                                {/* <div style={{ color: 'red' }} className="error-message">{formErrors.sbRequestId}</div> */}
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Custom PCTM No
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="customPctmNo"
                                    name="customPctmNo"
                                    value={exportData.customPctmNo}
                                    onChange={handlExportChange}
                                    maxLength={10}
                                    tabIndex="-1"
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                />

                                {/* <div style={{ color: 'red' }} className="error-message">{formErrors.sbRequestId}</div> */}
                            </FormGroup>
                        </Col>

                    </Row>
                    <Row>

                        <Col md={4}>
                            <FormGroup>
                                <label className="forlabel bold-label" htmlFor="sbRequestId">
                                    Custom PCTM Date
                                </label>
                                <DatePicker
                                    selected={exportData.customPctmDate}

                                    id="customPctmDate"
                                    onChange={handlePctmDateChange}
                                    tabIndex="-1"
                                    dateFormat="dd/MM/yyyy"
                                    readOnly={status === 'view'}
                                    style={{ backgroundColor: status === 'view' ? '#E0E0E0' : '' }}
                                    className="form-control"
                                    name="customPctmDate"
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                    customInput={
                                        <input
                                            style={{
                                                height: "38px",
                                                width: "100%",
                                                backgroundColor: status === 'view' ? '#E0E0E0' : ''
                                            }}
                                        />

                                    }

                                />

                                {/* <div style={{ color: 'red' }} className="error-message">{formErrors.sbRequestId}</div> */}
                            </FormGroup>
                        </Col>
                    </Row>

                    <hr />
                    {getKpcData.length > 0 && (
                        <Row>
                            <div className=" mt-1 table-responsive">
                                <Table className="table table-bordered text-center custom-table mt-3">
                                    <thead>
                                        <tr>
                                            <th style={{ backgroundColor: '#BADDDA', paddingBottom: 3 }} scope="col">
                                                <input style={{ width: 17, height: 22, marginTop: 3, paddingBottom: 0 }} type="checkbox" onChange={handleSelectAll2}
                                                    checked={selectAll2} />
                                            </th>
                                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                                                IR No.
                                            </th>
                                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                                                IR Date
                                            </th>
                                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                                                MAWB
                                            </th>
                                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                                                HAWB
                                            </th>
                                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                                                KPC No.
                                            </th>
                                            <th style={{ backgroundColor: '#BADDDA' }} scope="col">
                                                CTS
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getKpcData.map((item, index) => (
                                            <tr key={index + 1}>
                                                <td><input style={{ width: 17, height: 22 }} onChange={() => handleCheckboxChange3(item)}
                                                    checked={selectedRows2.includes(item)} type="checkbox" /></td>
                                                <td>{item.sirNo}</td>
                                                <td>{formatDateTime(item.sirDate)}</td>
                                                <td>{item.mawb}</td>
                                                <td>{item.hawb}</td>
                                                <td>{item.kpcNo}</td>
                                                <td>{item.grossWeightInCarats}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Row>
                    )}
                    <Row style={{ marginTop: 15 }}>
                        <Col md={2}></Col>
                        <Col md={8}>

                            <div className="d-flex justify-content-center">
                                {(flag === 'edit' || status === 'edit') && (
                                    <button
                                        className="btn btn-outline-primary btn-margin"
                                        onClick={() => { printBarcode(exportData.sbNo, exportData.erNo, exportData.noOfPackages, exportData.erDate, exportData.sbDate, "N", "1232") }}
                                        style={{ marginRight: 10 }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPrint}
                                            style={{ marginRight: "5px" }}
                                        />
                                        Print ER
                                    </button>
                                )}
                                {(flag === 'add' && status != 'edit' && status != 'view') && (
                                    <button
                                        className="btn btn-outline-success btn-margin"
                                        onClick={handleSubmit}
                                        style={{ marginRight: 10 }}
                                        id="submitBtn1"

                                    >
                                        <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                        Submit
                                    </button>
                                )

                                }

                                {(flag === 'edit' || status === 'edit') && (
                                    <button
                                        className="btn btn-outline-success btn-margin"
                                        onClick={handleEditSubmit}

                                        style={{ marginRight: 10 }}
                                        id="submitbtn2"
                                    >
                                        <FontAwesomeIcon icon={faSave} style={{ marginRight: "5px" }} />
                                        Submit
                                    </button>
                                )

                                }
                                {(status != 'edit' && status != 'view') && (
                                    <button
                                        className="btn btn-outline-danger btn-margin"
                                        onClick={handleClear}
                                        style={{ marginRight: 10 }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faSyncAlt}
                                            style={{ marginRight: "5px" }}
                                        />
                                        Clear
                                    </button>
                                )}
                                <button
                                    className="btn btn-outline-primary btn-margin"
                                    onClick={Handleback}
                                >
                                    <FontAwesomeIcon
                                        icon={faArrowLeft}
                                        style={{ marginRight: "5px" }}
                                    />
                                    Back
                                </button>
                            </div>
                        </Col>
                        <Col md={2}></Col>
                    </Row>

                </CardBody>
            </Card>

        </div>
    )
}
