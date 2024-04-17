import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import AuthContext from "../Components/AuthProvider";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
import Select from 'react-select';
import Rate_Chart_Service from "../services/Rate_Chart_Service";
import { Card, CardBody, Container, Row, Col, Form, FormGroup, Label, Input, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faClose, faPlaneCircleCheck, faPlaneUp, faRefresh, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faSave, faTimes, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


function Import_Model() {
    const [errors, setErrors] = useState({});
    const [companyId, setcompanyId] = useState('');
    const [kpcNo, setKpcNo] = useState('');
    const [branchId1, setBranchId] = useState('');
    const [impTransId, setImpTransId] = useState('');
    const [impTransDate, setImpTransDate] = useState(); // Use appropriate initial value
    const [mawb, setMawb] = useState('');
    const [hawb, setHawb] = useState('');
    const [igmNo, setIgmNo] = useState('');
    const [igmDate, setIgmDate] = useState(''); // Use appropriate initial value
    const [sirNo, setSirNo] = useState('');
    const [sirDate, setSirDate] = useState(''); // Use appropriate initial value
    const [pctmNo, setPctmNo] = useState('');
    const [tpNo, setTpNo] = useState('');
    const [tpDate, setTpDate] = useState(null); // Use appropriate initial value
    const [airlineName, setAirlineName] = useState('');
    const [flightNo, setFlightNo] = useState('');
    const [flightDate, setFlightDate] = useState(); // Use appropriate initial value
    const [countryOrigin, setCountryOrigin] = useState('');
    const [portOrigin, setPortOrigin] = useState('');
    const [importerId, setImporterId] = useState('');
    const [iec, setIec] = useState('');
    const [sezEntityId, setSezEntityId] = useState('');
    const [city, setCity] = useState('');
    const [consoleName, setconsoleName] = useState('');
    const [packageContentType, setPackageContentType] = useState('Rough Diamonds(RD)');
    const [parcelType, setParcelType] = useState('');
    const [uomPackages, setUomPackages] = useState('');
    const [nop, setNop] = useState(1); // Use appropriate initial value
    const [noOfParcel, setnoOfParcel] = useState(1);
    const [grossWeightInCarats, setgrossWeightInCarats] = useState('');
    const [assessableValueInDollar, setAssessableValueInDollar] = useState('');
    const [currencyRate, setCurrencyRate] = useState('');
    const [snzStatus, setSnzStatus] = useState('N');

    const [importRemarks, setImportRemarks] = useState('');
    const [descriptionOfGoods, setDescriptionOfGoods] = useState('RD');
    const [chaCde, setChaCde] = useState('');
    const [assessableValue, setAssessableValue] = useState('');
    const [grossWeight, setGrossWeight] = useState(''); // Use appropriate initial value
    const [beRequestId, setBeRequestId] = useState('');
    const [beNo, setBeNo] = useState('');
    const [beDate, setBeDate] = useState(null); // Use appropriate initial value
    const [importAddress, setImportAddress] = useState('');
    const [status, setStatus] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [createdDate, setCreatedDate] = useState(''); // Use appropriate initial value
    const [editedBy, setEditedBy] = useState('');
    const [editedDate, setEditedDate] = useState(null); // Use appropriate initial value
    const [approvedBy, setApprovedBy] = useState('');
    const [approvedDate, setApprovedDate] = useState(null); // Use appropriate initial value
    const [FlightS, setFlightS] = useState([]);
    const [uomWeight, setuomWeight] = useState('KG');
    const [parties, setParties] = useState([]);
    const [selectedParty, setSelectedParty] = useState(null);
    const [partyName, setparty_Name] = useState('');
    const [consoles, setConsoles] = useState([]);
    const [chas, setChas] = useState([]);

    const [pcktype, setPcktype] = useState([]);
    const [ImportsofMAWB, setImportsofMAWB] = useState([]);
    const [nsdl_Status, setNSDL_Status] = useState('');
    const [dgdc_Status, seTDGDC_Status] = useState('');
    const [CreatedUser, setCreatedUser] = useState('');
    const [approvedUser, setApprovedUser] = useState('');
    const [closeStatus, setcloseStatus] = useState('N');
    const [holdStatus, setHoldStatus] = useState('N');
    const [holdDate, setHoldDate] = useState('0000-00-00'); // You can initialize with the appropriate default date
    const [holdBy, setHoldBy] = useState('');
    const [hpStatus, setHpStatus] = useState('N');
    const [hpWeight, setHpWeight] = useState(0.000);
    const [pcStatus, setPcStatus] = useState('N');
    const [scStatus, setScStatus] = useState('N');
    const [cancelStatus, setCancelStatus] = useState('N');
    const [cancelRemarks, setCancelRemarks] = useState('');
    const [imposePenaltyAmount, setImposePenaltyAmount] = useState(0.000);
    const [imposePenaltyRemarks, setImposePenaltyRemarks] = useState('');
    const [handedOverRepresentativeId, sethandedOverRepresentativeId] = useState('');
    const [handedOverPartyId, sethandedOverPartyId] = useState('');
    const [handedOverToType, sethandedOverToType] = useState('');
    const [reasonforOverride, setReasonforOverride] = useState('');
    const [chaName, setchaName] = useState('');

    const [nsdlStatusDocs, setnsdlStatusDocs] = useState('');
    const [niptStatus, setniptStatus] = useState("N");
    const [importernameOnParcel, setimporternameOnParcel] = useState('');
    const [qrcodeUrl, setqrcodeUrl] = useState('');
    const [doNumber, setdoNumber] = useState('');
    const [doDate, setdoDate] = useState('');
    const [airlineCode, setAirlineCode] = useState('');
    const [outDate, setoutDate] = useState('');

    const [forwardedStatus, setForwardedStatus] = useState('N');
    const [noc, setNoc] = useState(0);
    const [dgdcSeepzInScan, setDgdcSeepzInScan] = useState(0);
    const [dgdcSeepzOutScan, setDgdcSeepzOutScan] = useState(0);
    const [dgdcCargoInScan, setDgdcCargoInScan] = useState(0);
    const [dgdcCargoOutScan, setDgdcCargoOutScan] = useState(0);



    const [niptCustomOfficerName, setniptCustomOfficerName] = useState('');
    const [niptCustomsOfficerDesignation, setniptCustomsOfficerDesignation] = useState('');
    const [niptDeputedFromDestination, setniptDeputedFromDestination] = useState('');
    const [niptDeputedToDestination, setniptDeputedToDestination] = useState('');
    const [niptDateOfEscort, setniptDateOfEscort] = useState('');
    const [niptApproverName, setniptApproverName] = useState('');
    const [niptApproverDesignation, setniptApproverDesignation] = useState('');
    const [niptApproverDate, setniptApproverDate] = useState('');
    const [wrongDepositFilePath, setwrongDepositFilePath] = useState('');
    const [wrongDepositwrongDepositRemarks, setwrongDepositwrongDepositRemarks] = useState('');
    const [wrongDepositStatus, setwrongDepositStatus] = useState('');
    const [detentionReceiptNo, setdetentionReceiptNo] = useState('');
    const [mopStatus, setMopStatus] = useState('N');


    const [cartingAgent, setcartingAgent] = useState('');
    const [partyRepresentativeId, setpartyRepresentativeId] = useState('');
    const [customTpNo, setCustomTpNo] = useState('');
    const [customTpDate, setCustomTpDate] = useState(null);
    const [customPctmNo, setCustomPctmNo] = useState('');
    const [customPctmDate, setCustomPctmDate] = useState(null);

    const [ConsoleNameById, setConsoleNameById] = useState();

    const {
        userId,
        username,
        branchId,
        companyid,
        logintype,
        logintypeid,
        userType

    } = useContext(AuthContext);

    const navigate = useNavigate();

    const location = useLocation();
    const transId2 = location.state?.transId2;
    const mawb2 = location.state?.mawb2;
    const hawb2 = location.state?.hawb2;
    const sir2 = location.state?.sir2;
    const transId3 = location.state?.transId3;
    const mawb3 = location.state?.mawb3;
    const hawb3 = location.state?.hawb3;
    const sir3 = location.state?.sir3;
    const searchCriteria = location.state?.searchCriteria;


    const currentPage = location.state?.currentPage;

    const findParties = async () => {
        const partyResponse = await Rate_Chart_Service.getAllActiveParties(companyid, branchId);
        const partyOptions = partyResponse.data.map(party => ({
            value: party[0],
            label: party[1]
        }));
        setParties(partyOptions);

    };

    useEffect(() => {
        findParties();
        findPCKTYPE();
        findConsoles();
        findCHAs();
        findAirlines();
    }, []);

    const Handleback = () => {
        navigate(`/parent/import`, { state: { searchCriteria: searchCriteria, currentPage: currentPage } })
    };

    useEffect(() => {
        if (mawb2 && hawb2) {
            getByMAWBnoAndHAwb(companyid, branchId, transId2, mawb2, hawb2, sir2);
            getImportsOfMAWB(companyid, branchId, mawb2);
        };
        if (mawb3 && hawb3) {
            getByMAWBnoAndHAwb(companyid, branchId, transId3, mawb3, hawb3, sir3);
        };
    }, [])

    const getImportsOfMAWB = (compId, branchId, MAWBNo) => {
        Rate_Chart_Service.getByMAWBNo(compId, branchId, MAWBNo).then((res) => {
            setImportsofMAWB(res.data);
        });
    };


    const handleFlightNumberChange = (event) => {
        const enteredFlightNumber = event.target.value;
        setErrors(prevErrors => enteredFlightNumber ? { ...prevErrors, flightNo: '' } : { ...prevErrors, flightNo: 'flightNo is required' });

        if (enteredFlightNumber.length >= 2) {
            // Extract the first two letters
            const firstTwoLetters = enteredFlightNumber.substring(0, 2).toUpperCase();
            //   console.log("firstTwoLetters "+ firstTwoLetters);
            // Filter airlines based on AirlineShortName
            const matchingAirline = FlightS.find(airline => airline.airlineShortName === firstTwoLetters);
            //  console.log("Matched "+ matchingAirline);
            // Set airline code and name if a match is found
            if (matchingAirline) {
                setAirlineCode(matchingAirline.airlineCode);
                setAirlineName(matchingAirline.airlineName);
            } else {
                // Handle the case where no matching airline is found
                // You can set default values or handle it according to your requirements
                setAirlineCode('');
                setAirlineName('');
            }
        }


        if (!enteredFlightNumber) {
            setAirlineCode('');
            setAirlineName('');
        }
        // Update the flight number in the state
        setFlightNo(enteredFlightNumber);

    };


    const handleValidation = () => {
        let formIsValid = true;
        const newErrors = {};



        if (mawb.length !== 11) {
            formIsValid = false;
            newErrors.mawb = 'mawb should be an 11-digit';
        }

        if (!flightNo) {
            formIsValid = false;
            newErrors['flightNo'] = 'FlightNo is required.';

        }

        if (!igmNo) {
            formIsValid = false;
            newErrors['igmNo'] = 'IgmNo is required.';

        }

        if (!ConsoleNameById) {
            formIsValid = false;
            newErrors['ConsoleNameById'] = 'Console is required.';

        }


        if (!grossWeight || grossWeight <= 0) {
            formIsValid = false;
            newErrors['grossWeight'] = 'Gross weight must be greater than 0.';
        }

        if (!selectedParty) {
            formIsValid = false;
            newErrors['selectedParty'] = 'importerId is required.';

        }



        if (!packageContentType) {
            formIsValid = false;
            newErrors['packageContentType'] = 'PackageContentType is required.';

        }

        setErrors(newErrors);
        return formIsValid;
    };


    const getConsoleNameById = async (id) => {

        Rate_Chart_Service.getUsernameByexternalUserId(companyid, branchId, id)
            .then((res) => {
                setConsoleNameById(res.data);


            });

    };

    const [chanameByCode, setchanameByCode] = useState(null);
    const getChaname = async (code) => {
        const name = await Rate_Chart_Service.getUsernameByexternalUserId(companyid, branchId, code);

        setchanameByCode(name.data);
    }








    const getByMAWBnoAndHAwb = async (compId, branchID, transId, mawb, hawb, sirNo) => {
        findParties();

        Rate_Chart_Service.GetByMAWBandHAWB(compId, branchID, transId, mawb, hawb, sirNo).then((res) => {
            setMawb(res.data.mawb);
            setHawb(res.data.hawb);
            setIgmNo(res.data.igmNo);
            setSirNo(res.data.sirNo);
            setSirDate(res.data.sirDate);
            setAirlineName(res.data.airlineName);
            setFlightNo(res.data.flightNo);

            setIgmDate(new Date(res.data.igmDate));
            setBeDate(new Date(res.data.beDate));
            setFlightDate(new Date(res.data.flightDate));

            setCountryOrigin(res.data.countryOrigin);
            setPortOrigin(res.data.portOrigin);
            setImporterId(res.data.importerId);
            setcloseStatus(res.data.closeStatus);
            getPartyByID(companyid, branchId, res.data.importerId);
            // setIec(res.data.iec);
            // setSezEntityId(res.data.sezEntityId);
            setconsoleName(res.data.consoleName);
            // setConsoleNameById(res.data.consoleName);
            setchaName(res.data.chaName);
            // if (res.data.consoleName !== null && res.data.consoleName !== '') {
            //     getConsoleNameById(res.data.consoleName);
            // }



            setPackageContentType(res.data.packageContentType);
            setNop(res.data.nop);
            setParcelType(res.data.parcelType);
            setImportRemarks(res.data.importRemarks);
            setDescriptionOfGoods(res.data.descriptionOfGoods);
            setChaCde(res.data.chaCde);
            setCustomPctmDate(res.data.customPctmDate);
            setCustomPctmNo(res.data.customPctmNo);
            setCustomTpDate(res.data.customTpDate);
            setCustomTpNo(res.data.customTpNo);
            setCurrencyRate(res.data.currencyRate);
            setnoOfParcel(res.data.noOfParcel);
            setAssessableValueInDollar(res.data.assessableValueInDollar);
            setSnzStatus(res.data.snzStatus);
            setgrossWeightInCarats(res.data.grossWeightInCarats);
            setKpcNo(res.data.kpcNo);
            setAssessableValue(res.data.assessableValue);
            setGrossWeight(res.data.grossWeight);
            setBeRequestId(res.data.beRequestId);
            setBeNo(res.data.beNo);
            // sethppackageno(res.data.hppackageno);
            setStatus(res.data.status);
            setTpNo(res.data.tpNo);
            setPctmNo(res.data.pctmNo);

            setHoldStatus(res.data.holdStatus);
            setHoldDate(res.data.holdDate);
            setHoldBy(res.data.holdBy);
            setHpStatus(res.data.hpStatus);
            // setHpWeight(res.data.hpWeight);
            setPcStatus(res.data.pcStatus);
            setScStatus(res.data.scStatus);
            setCancelStatus(res.data.cancelStatus);
            setCancelRemarks(res.data.cancelRemarks);
            setImposePenaltyAmount(res.data.imposePenaltyAmount);
            setImposePenaltyRemarks(res.data.imposePenaltyRemarks);


            setnsdlStatusDocs(res.data.nsdlStatusDocs);
            setReasonforOverride(res.data.reasonforOverride);

            setApprovedBy(res.data.approvedBy);

            setTpDate(res.data.tpDate);
            setEditedBy(res.data.editedBy);
            setEditedDate(res.data.editedDate);
            setCreatedDate(res.data.createdDate);
            setApprovedDate(res.data.approvedDate);
            setCreatedBy(res.data.createdBy);
            setuomWeight(res.data.uomWeight);
            setImportAddress(res.data.importAddress);
            setUomPackages(res.data.uomPackages);
            setcompanyId(res.data.companyId);
            setBranchId(res.data.DatebranchId);
            setImpTransId(res.data.impTransId);
            setImpTransDate(res.data.impTransDate);
            setNSDL_Status(res.data.nsdl_Status);
            seTDGDC_Status(res.data.dgdc_Status);
            setoutDate(res.data.outDate);


            sethandedOverRepresentativeId(res.data.handedOverRepresentativeId);
            sethandedOverPartyId(res.data.handedOverPartyId);
            sethandedOverToType(res.data.handedOverToType);
            setniptStatus(res.data.niptStatus);
            setimporternameOnParcel(res.data.importernameOnParcel);
            setqrcodeUrl(res.data.qrcodeUrl);
            setdoNumber(res.data.doNumber);
            setdoDate(res.data.doDate);
            setchaName(res.data.chaName);
            // setchanameByCode(res.data.chaName);
            // if (res.data.chaName !== null && res.data.chaName !== '') {
            //     getChaname(res.data.chaName);
            // }
            setAirlineCode(res.data.airlineCode);
            setniptApproverDate(res.data.niptApproverDate);
            setniptApproverDesignation(res.data.niptApproverDesignation);
            setniptApproverName(res.data.niptApproverName);
            setniptCustomOfficerName(res.data.niptCustomOfficerName);
            setniptCustomsOfficerDesignation(res.data.niptCustomsOfficerDesignation);
            setniptDateOfEscort(res.data.niptDateOfEscort);
            setniptDeputedToDestination(res.data.niptDeputedToDestination);
            setniptDeputedFromDestination(res.data.niptDeputedFromDestination);
            setwrongDepositFilePath(res.data.wrongDepositFilePath);
            setwrongDepositwrongDepositRemarks(res.data.wrongDepositwrongDepositRemarks);
            setwrongDepositStatus(res.data.wrongDepositStatus);
            setdetentionReceiptNo(res.data.detentionReceiptNo);
            setForwardedStatus(res.data.forwardedStatus);
            setNoc(res.data.noc);
            setDgdcSeepzInScan(res.data.dgdcSeepzInScan);
            setDgdcSeepzOutScan(res.data.dgdcSeepzOutScan);
            setDgdcCargoInScan(res.data.dgdcCargoInScan)
            setDgdcCargoOutScan(res.data.dgdcCargoOutScan);
            setMopStatus(res.data.mopStatus);
            setcartingAgent(res.data.cartingAgent);
            setpartyRepresentativeId(res.data.partyRepresentativeId);
            if (!res.data.currencyRate) {
                getLatestCurrencyrate(companyid, branchId);
            }
        });
    };


    const makefieldEmpty = () => {
        setnoOfParcel(1);
        setAssessableValueInDollar('');
        setgrossWeightInCarats('');
        setSnzStatus('N');
        setCity('');
        setSelectedParty(null);
        setchanameByCode(null);
        setCustomPctmDate(null);
        setCustomPctmNo('');
        setCustomTpDate(null);
        setCustomTpNo('');
        setHawb('');
        setSirNo('');
        setPackageContentType('Rough Diamonds(RD)');
        setNop(1);
        setKpcNo('');
        setParcelType('');
        setImportRemarks('');
        setDescriptionOfGoods('RD');
        setChaCde('');
        setAssessableValue('');
        setBeRequestId('');
        setBeNo('');
        setBeDate('');
        setTpDate('');
        setStatus('');
        setApprovedBy('');
        setCreatedBy('');
        setuomWeight('');
        setImportAddress('');
        setUomPackages('');
        setTpNo('');
        setPctmNo('');
        setErrors('');
        setAssessableValue('');
        setGrossWeight('');
        setBeRequestId('');
        setImpTransId('');
        setImpTransDate('');
        setApprovedBy('');
        setEditedBy('');
        setEditedDate('');
        setCreatedDate('');
        setApprovedDate('');
        setCreatedBy('');
        setuomWeight('KGS');
        setoutDate('');
        setImportAddress('');
        setNSDL_Status('');
        seTDGDC_Status('');
        setcompanyId('');
        setCreatedUser('');
        setApprovedUser('');
        sethandedOverPartyId('');
        sethandedOverRepresentativeId('');
        sethandedOverToType('');
        setniptStatus('');
        setqrcodeUrl('');
        setimporternameOnParcel('');
        setdoNumber('');
        setdoDate('');
        setImporterId('');
        setparty_Name('');
        setSezEntityId('');
        setIec('');
        setchaName('');
        setniptApproverDate('');
        setniptApproverDesignation('');
        setniptApproverName('');
        setniptCustomOfficerName('');
        setniptCustomsOfficerDesignation('');
        setniptDateOfEscort('');
        setniptDeputedToDestination('');
        setniptDeputedFromDestination('');
        setwrongDepositFilePath('');
        setwrongDepositwrongDepositRemarks('');
        setwrongDepositStatus('');
        setdetentionReceiptNo('');
        setForwardedStatus("N");
        setNoc(0);
        setDgdcSeepzInScan(0);
        setDgdcSeepzOutScan(0);
        setDgdcCargoInScan(0)
        setDgdcCargoOutScan(0);
        setMopStatus('N');
        setcartingAgent('');
        setpartyRepresentativeId('');
    };




    const findExternalPartyByType = async (compid, branchId, Type) => {
        const partyResponse = await Rate_Chart_Service.getAllExternalPartiesByType(compid, branchId, Type);
        const partyOptions = partyResponse.data.map(externalUser => ({
            value: externalUser[0],
            label: externalUser[1]
        }));
        return partyOptions;

    };
    const findConsoles = async () => {
        const partyOptions = await findExternalPartyByType(companyid, branchId, 'console')
        setConsoles(partyOptions);
    };

    const findCHAs = async () => {
        const partyOptions = await findExternalPartyByType(companyid, branchId, 'CHA')
        setChas(partyOptions);

    };

    const findPCKTYPE = async () => {
        const PCKTYPEResponse = await Rate_Chart_Service.getjarsByJarId('J00008', companyid, branchId);
        const partyOptions = PCKTYPEResponse.data.map(jar => ({
            value: jar.jarId,
            label: jar.jarDtlDesc
        }));
        setPcktype(partyOptions);
    };


    const handleCHAChange = selectedOption => {
        setchanameByCode(selectedOption);
        setchaName(selectedOption ? selectedOption.value : '');
    };


    const handleConsoleChange = selectedOption => {

        setErrors(prevErrors => selectedOption ? { ...prevErrors, ConsoleNameById: '' } : { ...prevErrors, ConsoleNameById: 'Console is required' });
        setConsoleNameById(selectedOption);
        setconsoleName(selectedOption ? selectedOption.value : '');
    };

    const handlepckgtype = selectedOption => {
        setErrors(prevErrors => selectedOption ? { ...prevErrors, packageContentType: '' } : { ...prevErrors, packageContentType: 'packageContentType is required' });
        setPackageContentType(selectedOption ? selectedOption.label : '');
        if (selectedOption) {
            setPackageContentType(selectedOption ? selectedOption.label : '');
            const extractedValue = extractValueWithinParentheses(selectedOption ? selectedOption.label : '');
            setDescriptionOfGoods(extractedValue);
        } else {
            setPackageContentType('');
            setDescriptionOfGoods('');
        }


    };
    // Function to extract text within parentheses from package content type
    const extractValueWithinParentheses = (text) => {
        const match = text.match(/\(([^)]+)\)/); // Using regex to find text within parentheses
        return match ? match[1] : ''; // Extracted text or empty string if not found
    };





    const findAirlines = async () => {
        const AirResponse = await Rate_Chart_Service.getAllairline(companyid, branchId);
        setFlightS(AirResponse.data);
    };



    const handlePartyChange = async (selectedOption, { action }) => {
        setErrors(prevErrors => selectedOption ? { ...prevErrors, selectedParty: '' } : { ...prevErrors, selectedParty: 'Party is required' });

        if (action === 'clear') {
            setparty_Name('');
            setIec('');
            setSezEntityId('');
            setImporterId('');
            setimporternameOnParcel('');
            setSelectedParty(null);
            setCity('');
            setSnzStatus('N');
        }
        else {
            setSelectedParty(selectedOption);
            setimporternameOnParcel(selectedOption ? selectedOption.label : '');
            // setparty_Name(selectedOption ? selectedOption.label : '');
            setImporterId(selectedOption ? selectedOption.value : '');

            if (selectedOption.value === 'SNZPARTY') {
                setSnzStatus('Y');
            } else {
                setSnzStatus('N');
            }

            getPartyByID(companyid, branchId, selectedOption ? selectedOption.value : '')
        }
    };




    useEffect(() => {
        const foundParty = parties.find(party => party.value === importerId);
        if (foundParty) {
            setSelectedParty(foundParty);
        }
    }, [parties, importerId]);

    useEffect(() => {
        const foundParty = consoles.find(consoles => consoles.value === consoleName);
        if (foundParty) {
            setConsoleNameById(foundParty);
        }
    }, [consoles, consoleName]);

    useEffect(() => {
        const foundParty = chas.find(chas => chas.value === chaName);
        if (foundParty) {
            setchanameByCode(foundParty);
        }
    }, [chas, chaName]);



    const customFilterOption = (candidate, input) => {
        const inputLower = input.toLowerCase();
        const labelLower = candidate.label.toLowerCase();
        return candidate.data.__isNew__ || labelLower.startsWith(inputLower);
    };

    // const handleFlightChange = (selectedOption, { action }) => {

    //     if (action === 'clear') {
    //         setFlightNo('');
    //         setAirlineCode('')
    //         setAirlineName('');
    //     }
    //     else {
    //         setFlightNo(selectedOption ? selectedOption.label : '');
    //         setAirlineCode(selectedOption ? selectedOption.value : '')
    //         getSingleFlightlist(selectedOption ? selectedOption.value : '');
    //     }
    // };


    // const getSingleFlightlist = async (airlineCode) => {

    //     Rate_Chart_Service.getAirlineNameByCode(companyid, branchId, airlineCode)
    //         .then((response) => {

    //             setAirlineName(response.data);

    //         })
    //         .catch((error) => {
    //             console.error("GET list error:", error);
    //         });
    // };





    const addImport = async () => {
        setIsSubmitting(true);

        try {
            const res = await Rate_Chart_Service.addImport(companyid, branchId, userId, importData);

            // Continue with the import processing
            getImportsOfMAWB(res.data.companyId, res.data.branchId, res.data.mawb);
            getByMAWBnoAndHAwb(res.data.companyId, res.data.branchId, res.data.impTransId, res.data.mawb, res.data.hawb, res.data.sirNo);

            const toastContent = `Import with SIR No  ${res.data.sirNo}  Added Successfully!`;
            const contentWidth = toastContent.length * 10;
            toast.success(toastContent, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
                style: { width: `${contentWidth}px` },
            });
        } catch (error) {
            // Handle the error response, e.g., show an error toast
            const errorMessage = error.response ? error.response.data : "An error occurred during import.";
            const contentWidth = errorMessage.length * 12;
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                style: { width: `${contentWidth}px` },
            });
        } finally {
            // This block will be executed regardless of success or failure
            setIsSubmitting(false);
        }
    };


    const updateModify = () => {

        Rate_Chart_Service.ModifyupdateImport(companyid, branchId, userId, importData).then((res) => {
            if (res.status === 200) {
                console.log(res.data);
                getImportsOfMAWB(res.data.companyId, res.data.branchId, res.data.mawb);
                getByMAWBnoAndHAwb(res.data.companyId, res.data.branchId, res.data.impTransId, res.data.mawb, res.data.hawb, res.data.sirNo);
                toast.success('Import Updated Successfully !', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 600,
                });
            } else {

            }
        }).catch((error) => {
            const errorMessage = error.response ? error.response.data : "An error occurred during import.";
            const contentWidth = errorMessage.length * 12;
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                style: { width: `${contentWidth}px` },
            });

        });
    };


    const getLatestCurrencyrate = async (companyId, branchId) => {
        try {
            const res = await Rate_Chart_Service.getLatestCurrencyrate(companyId, branchId);
            if (res.data) {
                setCurrencyRate(res.data)
            } else {
                console.log("No data received from getLatestCurrencyrate API");
            }
        } catch (error) {
            console.error("Error fetching getLatestCurrencyrate:", error);
        }
    };




    const getPartyByID = async (companyId, branchId, id3) => {
        try {
            const res = await Rate_Chart_Service.getPartyById(companyId, branchId, id3);
            if (res.data) {

                setIec(res.data.iecNo);
                // setSezEntityId(res.data.entityId);
                setCity(res.data.city)
            } else {
                console.log("No data received from getPartyById API");
            }
        } catch (error) {
            console.error("Error fetching party data:", error);
        }
    };


    const DeleteImport = (compaId, branchId, transId, mawbno, hawbno, sir) => {
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
                    Rate_Chart_Service.deleteimportofmawb(compaId, branchId, transId, mawbno, hawbno, sir).then((res) => {
                        // Swal.fire('Service Deleted Successfully', 'You clicked the button', 'success');

                        getImportsOfMAWB(compaId, branchId, mawbno);

                        // console.log(res.data)
                        makefieldEmpty();

                    }
                    )

                    toast.error('Service Deleted Successfully !', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 700,
                    });
                }
            })




        }
    };
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateImportAll = () => {


        let totalNops = 0;
        let totalWeight = 0;

        // Iterate over the importData to calculate totals
        ImportsofMAWB.forEach((importItem) => {
            totalNops += importItem.nop;
            totalWeight += importItem.grossWeight;
        });


        Swal.fire({
            title: 'Are you sure?',
            html: `<b>Total Packages:  ${totalNops} </b> ,<b>Total Master Weight: ${totalWeight.toFixed(3)} KGS</b> </br> You won't be able to add more imports!`,
            icon: 'warning',
            showCancelButton: true,
            customClass: {
                icon: 'icon-smaller' // Apply the custom class to the icon
            },
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, close it!'
        }).then((result) => {
            if (result.isConfirmed) {

                Rate_Chart_Service.updateImport(companyid, branchId, userId, importData).then((resList) => {
                    // Iterate over the list of Import objects returned by the updateImport method
                    resList.data.forEach((importItem) => {
                        // Perform actions for each Import item

                        // Call the getImportsOfMAWB method
                        getImportsOfMAWB(importItem.companyId, importItem.branchId, importItem.mawb);

                        // Call the getByMAWBnoAndHAwb method
                        getByMAWBnoAndHAwb(importItem.companyId, importItem.branchId, importItem.impTransId, importItem.mawb, importItem.hawb, importItem.sirNo);


                    });
                    toast.error('Master Closed Successfully !', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 700,
                    });
                });

            }
        })




    };



    const SaveorSubmit = () => {
        // alert("On the Way")
        const isFormValid = handleValidation();
        if (isFormValid) {
            if (!(pcStatus === 'Y' || niptStatus === 'Y')) {
                // Continue with the condition related to airlineCode only if pcStatus and niptStatus are not 'Y'
                if (airlineCode) {
                    // alert("in")
                    if (status) {
                        if (mawb2 && hawb2) {
                            updateModify();
                        }
                        if (!mawb2 && !hawb2) {
                            updateModify();
                        }
                    } else {
                        addImport();
                    }
                } else {
                    const errorMessage = "Your Entered Flight Number's Airline is not Present In Airline Master! Please add Airline in Airline Master!!!";
                    const contentWidth = errorMessage.length * 5;

                    toast.error(errorMessage, {
                        position: toast.POSITION.CENTER,
                        autoClose: 6000,
                        style: { width: `${contentWidth}px` },
                    });
                }
            } else {
                if (status) {
                    if (mawb2 && hawb2) {
                        updateModify();
                    }
                    if (!mawb2 && !hawb2) {
                        updateModify();
                    }
                }

                else {

                    addImport();
                }

            }
        } else {
            toast.error('Oops something went wrong!', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 700,
            });
        }
    };


    const importData = {
        companyId, branchId,
        uomWeight, impTransId, impTransDate, mawb, hawb, igmNo, igmDate, sirNo, sirDate, pctmNo, tpNo, tpDate, airlineName,
        flightNo, flightDate, countryOrigin, portOrigin, importerId, iec, sezEntityId, consoleName, packageContentType, parcelType, niptStatus, importernameOnParcel, qrcodeUrl,
        uomPackages, nop, importRemarks, descriptionOfGoods, chaCde, assessableValue, grossWeight, beRequestId, beNo, beDate, handedOverToType, handedOverPartyId, handedOverRepresentativeId,
        importAddress, status, createdBy, createdDate, editedBy, editedDate, approvedBy, approvedDate, dgdc_Status, nsdl_Status, closeStatus, reasonforOverride, nsdlStatusDocs,
        holdStatus, holdDate, holdBy, hpStatus, pcStatus, scStatus, cancelStatus, cancelRemarks, imposePenaltyAmount, imposePenaltyRemarks, doNumber, doDate, chaName, airlineCode, outDate,
        niptCustomOfficerName, niptCustomsOfficerDesignation, niptDeputedFromDestination, mopStatus, customPctmDate, customPctmNo, customTpDate, customTpNo,
        niptDeputedToDestination, niptDateOfEscort, niptApproverName, niptApproverDesignation, niptApproverDate, wrongDepositFilePath, wrongDepositwrongDepositRemarks, wrongDepositStatus, detentionReceiptNo,
        forwardedStatus, noc, dgdcSeepzInScan, dgdcSeepzOutScan, dgdcCargoInScan, dgdcCargoOutScan, cartingAgent, partyRepresentativeId, snzStatus, currencyRate, assessableValueInDollar, noOfParcel, grossWeightInCarats, kpcNo
    };


    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleDateChange(new Date());
        }
    };




    const handleDateChange = (date1) => {
        setIgmDate(date1);
        setFlightDate(date1);
    };

    const handleDateChangeFlight = (date2) => {
        setFlightDate(date2);
    };
    const handleDateChangeBE = (date) => {
        setBeDate(date);
    };

    function handleInputChange(e) {
        const inputValue = e.target.value;
        const numericInput = inputValue.replace(/[^0-9.]/g, '');
        const parts = numericInput.split('.');
        const integerPart = parts[0];
        let decimalPart = parts[1];

        // Limit decimal places if needed
        if (decimalPart !== undefined) {
            decimalPart = `.${decimalPart.slice(0, 3)}`;
        }

        const sanitizedInput = decimalPart !== undefined ? `${integerPart}${decimalPart}` : integerPart;
        return sanitizedInput;
    };


    function handleNopChange(e) {
        const inputValue = e.target.value;
        const numericInput = inputValue.replace(/[^0-9]/g, '');
        setNop(numericInput);
    };


    const handleMawbChange = (e) => {
        const value = e.target.value;
        // Set error if mawb is empty, otherwise clear the error
        setErrors(prevErrors => ({
            ...prevErrors,
            mawb: value.length !== 11 ? 'mawb should be an 11-digit' : ''
        }));
        // Clear the error for mawb if it has 11 characters
        if (value.length === 11) {
            setErrors(prevErrors => ({ ...prevErrors, mawb: '' }));
        }
        setMawb(value);
    };



    const convertDollarToINR = () => {
        console.log("In convertDollarToINR******");
        if (currencyRate && assessableValueInDollar) {
            const convertedValue = currencyRate * assessableValueInDollar;
            console.log("currencyRate :  " + currencyRate + "assessableValueInDollar : " + assessableValueInDollar + "convertedValue : " + convertedValue);
            setAssessableValue(convertedValue);
        }
    };



    // // Runs at last
    // useLayoutEffect(() => {
    //     if (!currencyRate) {
    //         alert("Calling");
    //         getLatestCurrencyrate(companyid, branchId);
    //     }
    // }, []);


    return (
        <div className="Container" >
            <h5 className="pageHead" style={{ fontFamily: 'Your-Heading-Font', paddingLeft: '4%', paddingRight: '-50px' }} > <FontAwesomeIcon
                icon={faPlaneUp}
                style={{
                    marginRight: '8px',
                    color: 'black', // Set the color to golden
                }}
            />Add New Import</h5>


            <Card style={{ backgroundColor: "#F8F8F8" }}>
                <CardBody>
                    <Row>
                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">MAWB No.</Label>*
                                <Input
                                    type="text"
                                    name="mawb"
                                    className="form-control inputField"
                                    placeholder="Enter master number"
                                    id={(mawb3 && hawb3) ? 'service' : 'mawb'}
                                    readOnly={(mawb3 && hawb3)}
                                    value={mawb}
                                    maxLength={16} // Add this line to set the maximum length
                                    style={{ height: '40px', borderColor: errors.mawb ? '#f52b2b' : '' }}
                                    onChange={handleMawbChange}

                                />
                                {errors.mawb && (
                                    <div className="error-message">
                                        {errors.mawb}
                                    </div>
                                )}
                            </FormGroup>


                        </Col>

                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">IGM No.</Label> <i style={{ borderColor: errors.igmNo ? '#f52b2b' : '' }}>*</i>
                                <Input
                                    type="text" name="igmNo"
                                    className="form-control"
                                    placeholder="Enter a Igm number"
                                    value={igmNo}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                    maxLength={20}
                                    style={{ borderColor: errors.igmNo ? '#f52b2b' : '' }}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setErrors(prevErrors => ({ ...prevErrors, igmNo: value.trim() === '' ? 'IGM No is required' : '' }));
                                        setIgmNo(value);
                                    }}
                                />
                                {errors.igmNo && (
                                    <div className="error-message">
                                        {errors.igmNo}
                                    </div>
                                )}
                            </FormGroup>

                        </Col>



                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">IGM Date</Label>
                                <div>
                                    <DatePicker
                                        selected={igmDate}
                                        onKeyDown={handleKeyPress}
                                        placeholder="Enter Igm Date"
                                        onChange={handleDateChange}
                                        wrapperClassName="custom-react-datepicker-wrapper"
                                        dateFormat="dd/MM/yyyy"
                                        id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                        readOnly={mawb3 && hawb3}
                                        value={igmDate}
                                        className="form-control border-right-0 inputField"
                                        customInput={<input style={{ width: '100%' }} />}
                                    />

                                </div>
                            </FormGroup>
                        </Col>

                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">SIR No</Label>*
                                <Input
                                    type="text" name="airlineName"
                                    placeholder="Sir No"
                                    className="form-control inputField"
                                    value={sirNo}
                                    id='service' readOnly
                                    onChange={(e) => setSirNo(e.target.value)}
                                    tabIndex="-1"
                                />
                            </FormGroup>
                        </Col>


                    </Row>

                    {/* 2nd */}

                    <Row>


                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Flight No.</Label>
                                <Input
                                    type="text" name="flightNo"
                                    placeholder="Enter a Flight Number"
                                    className={errors.flightNo ? 'error-border' : ''}
                                    value={flightNo}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={(mawb3 && hawb3)}
                                    onChange={handleFlightNumberChange}
                                />

                                {errors.flightNo && (
                                    <div className="error-message">
                                        {errors.flightNo}
                                    </div>
                                )}
                            </FormGroup>

                        </Col>
                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Flight Date</Label>
                                <div> {/* Wrap in an input group */}
                                    <DatePicker
                                        selected={flightDate}
                                        onChange={handleDateChangeFlight}
                                        placeholder="Enter Flight Date"
                                        wrapperClassName="custom-react-datepicker-wrapper"
                                        id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                        readOnly={mawb3 && hawb3}
                                        // minDate={today}
                                        dateFormat="dd/MM/yyyy"
                                        value={flightDate} // Set the value from the database
                                        className="form-control InputField"
                                        customInput={<input style={{ width: '100%' }} />}
                                    />

                                </div>
                            </FormGroup>
                        </Col>

                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Airline Name</Label>*
                                <Input
                                    type="text" name="airlineName"
                                    placeholder="Airline"
                                    className="form-control inputField"
                                    value={airlineName}
                                    id='service' readOnly
                                    onChange={(e) => setAirlineName(e.target.value)}
                                    tabIndex="-1"
                                />
                            </FormGroup>
                        </Col>

                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Country of Origin</Label>
                                <Input
                                    type="text" name="countryOrigin"
                                    className="form-control"
                                    placeholder="Enter a country of origin"
                                    value={countryOrigin}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    maxLength={30}
                                    readOnly={mawb3 && hawb3}
                                    onChange={(e) => setCountryOrigin(e.target.value)}
                                    onBlur={(e) => {
                                        const country = e.target.value;
                                        if (!portOrigin) {
                                            // Only update loginUserName if it's empty
                                            setPortOrigin(country);
                                        }
                                    }}

                                />
                            </FormGroup>
                        </Col>


                    </Row>



                    {/* 3rd */}

                    <Row>


                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Port of Origin</Label>
                                <Input
                                    type="text" name="portOrigin"
                                    className="form-control"
                                    placeholder="Enter Port"
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                    maxLength={30}
                                    value={portOrigin}
                                    onChange={(e) => setPortOrigin(e.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Select Console</Label>

                                <Select
                                    options={consoles}
                                    value={ConsoleNameById}
                                    onChange={handleConsoleChange}
                                    placeholder="Select Console"
                                    isClearable
                                    className={errors.ConsoleNameById ? 'error-border' : ''}
                                    isDisabled={mawb3 && hawb3}
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
                                        })
                                    }}
                                />
                                {errors.ConsoleNameById && (
                                    <div className="error-message">
                                        {errors.ConsoleNameById}
                                    </div>
                                )}

                            </FormGroup>
                        </Col>



                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Select Importer</Label>*
                                <Select
                                    options={parties}
                                    placeholder="Select a party"
                                    isClearable
                                    value={selectedParty}
                                    onChange={handlePartyChange}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                    filterOption={customFilterOption}
                                    className={errors.selectedParty ? 'error-border' : ''}
                                    isDisabled={mawb3 && hawb3}
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
                                {errors.selectedParty && (
                                    <div className="error-message">
                                        {errors.selectedParty}
                                    </div>
                                )}

                            </FormGroup>
                        </Col>

                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">City</Label>

                                <Input type="text" name="sezEntityId"
                                    className="form-control"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    id="service"
                                    readOnly
                                    tabIndex="-1"
                                />
                            </FormGroup>
                        </Col>
                    </Row>


                    {/* 4th */}


                    <Row>


                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">IEC No.</Label>
                                <Input
                                    type="text" name="iec"
                                    className="form-control"
                                    value={iec}
                                    onChange={(e) => setIec(e.target.value)}
                                    id="service"
                                    readOnly
                                    tabIndex="-1"
                                />
                            </FormGroup>
                        </Col>



                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Import Remarks</Label>
                                <Input
                                    type="text" name="importRemarks"
                                    className="form-control"
                                    value={importRemarks}
                                    maxLength={150}
                                    onChange={(e) => setImportRemarks(e.target.value)}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Importer Name On Parcel</Label>

                                <Input type="text" name="sezEntityId"
                                    className="form-control"
                                    value={importernameOnParcel}
                                    onChange={(e) => setimporternameOnParcel(e.target.value)}
                                    id="service"
                                    readOnly={importerId !== 'NONE'}
                                    tabIndex="-1"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">HAWB No.</Label>*
                                <Input
                                    type="text" name="hawb"
                                    className="form-control"
                                    value={hawb.startsWith('000') ? '' : hawb}
                                    maxLength={30}
                                    style={{ borderColor: errors.hawb ? '#f52b2b' : '', }}
                                    onChange={(e) => setHawb(e.target.value)}
                                    id={(mawb3 && hawb3) ? 'service' : 'mawb'}
                                    readOnly={(mawb3 && hawb3)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    {/* 5th row  */}


                    <Row>
                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Package Content Type</Label>
                                <Select
                                    options={pcktype}
                                    value={{ value: packageContentType, label: packageContentType }}
                                    onChange={handlepckgtype}
                                    isClearable
                                    className={errors.packageContentType ? 'error-border' : ''}
                                    isDisabled={mawb3 && hawb3}
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
                                        })
                                    }}
                                />
                                {errors.packageContentType && (
                                    <div className="error-message">
                                        {errors.packageContentType}
                                    </div>
                                )}
                            </FormGroup>
                        </Col>
                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Desc of Goods </Label>
                                <Input type="text" name="descriptionOfGoods"
                                    className="form-control"
                                    value={descriptionOfGoods}
                                    maxLength={50}
                                    onChange={(e) => setDescriptionOfGoods(e.target.value)}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3} >
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">No. of Parcel </Label>
                                        <Input type="text" name="nop"
                                            className="form-control"
                                            placeholder="Enter number of packages"
                                            value={noOfParcel}
                                            maxLength={3}
                                            id={'service'}
                                            readOnly
                                        />
                                    </FormGroup>

                                </Col>

                                <Col md={6}>

                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">No. of Packets </Label>
                                        <Input type="text" name="nop"
                                            className="form-control"
                                            placeholder="Enter number of packages"
                                            onChange={handleNopChange}
                                            value={nop}
                                            maxLength={3}
                                            id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                            readOnly={mawb3 && hawb3}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={3} >

                            <Row noGutters>


                                <Col md={8} >
                                    <FormGroup>
                                        <Label className="forlabel" for="branchId">Gross Weight </Label>
                                        <Input
                                            type="text"
                                            name="grossWeight"
                                            placeholder="Gross weight in kg or grams"
                                            className={`${errors.grossWeight ? 'error-border' : ''}`}
                                            value={grossWeight}
                                            maxLength={10}
                                            onChange={(e) => { setGrossWeight(handleInputChange(e)); }}
                                            id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                            readOnly={mawb3 && hawb3}
                                        />
                                        {errors.grossWeight && (
                                            <div className="error-message">
                                                {errors.grossWeight}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>


                                <Col md={4}>
                                    <FormGroup style={{ marginLeft: '10px' }}>
                                        <Label className="forlabel" for="branchId">UOM</Label>
                                        <Input
                                            type="text" name="uomWeight"
                                            className="form-control"
                                            onChange={(e) => setuomWeight(e.target.value)}
                                            value={uomWeight}
                                            maxLength={10}
                                            id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                            readOnly={mawb3 && hawb3}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {/* 6th */}

                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Weight In Carats</Label>
                                <Input type="text" name="grossWeightInCarats"
                                    className="form-control"
                                    placeholder="Enter Parcel weight in carats"
                                    value={grossWeightInCarats} setgrossWeightInCarats
                                    maxLength={50}
                                    onChange={(e) => { setgrossWeightInCarats(handleInputChange(e)); }}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Assesable In Foreign Currency</Label>
                                <Input
                                    type="text" name="assessableValueInDollar"
                                    placeholder="Enter value In foreign currency"
                                    className="form-control"
                                    value={assessableValueInDollar}
                                    maxLength={15}
                                    onChange={(e) => { setAssessableValueInDollar(handleInputChange(e)); }}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                    onBlur={convertDollarToINR}
                                />
                            </FormGroup>
                        </Col>

                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Currency rate</Label>
                                <Input
                                    type="text" name="currencyRate"
                                    placeholder="Enter value of package"
                                    className="form-control"
                                    value={currencyRate}
                                    maxLength={15}
                                    onChange={(e) => { setCurrencyRate(handleInputChange(e)); }}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                    onBlur={convertDollarToINR}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Assesable In INR</Label>
                                <Input
                                    type="text" name="assessableValue"
                                    placeholder="Enter value of package"
                                    className="form-control"
                                    value={assessableValue}
                                    maxLength={15}
                                    onChange={(e) => { setAssessableValue(handleInputChange(e)); }}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Custom PCTM No</Label>

                                <Input type="text" name="customTpNo"
                                    placeholder="Enter custom's pctm number"
                                    className="form-control"
                                    value={customPctmNo}
                                    onChange={(e) => setCustomPctmNo(e.target.value)}
                                    maxLength={20}
                                    tabIndex="-1"
                                />
                            </FormGroup>
                        </Col>


                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Custom PCTM Date</Label>*
                                <DatePicker
                                    selected={customPctmDate}
                                    onChange={(selectedDate) => setCustomPctmDate(selectedDate)}
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                    minDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    value={customPctmDate}
                                    className="form-control InputField"
                                    tabIndex="-1"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Custom TP No</Label>
                                <Input type="text" name="customTpNo"
                                    placeholder="Enter custom's tp number"
                                    className="form-control"
                                    value={customTpNo}
                                    onChange={(e) => setCustomTpNo(e.target.value)}
                                    maxLength={20}
                                    tabIndex="-1"
                                />
                            </FormGroup>
                        </Col>


                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Custom TP Date</Label>*
                                <DatePicker
                                    selected={customTpDate}
                                    onChange={(selectedDate) => setCustomTpDate(selectedDate)}
                                    wrapperClassName="custom-react-datepicker-wrapper"
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                    minDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    value={customTpDate}
                                    className="form-control InputField"
                                    tabIndex="-1"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    {/* {(userType !== "Cargo Official" && userType !== "Cargo Gate" && userType !== "Cargo Custodian") ? ( */}

                    <Row>
                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">CHA</Label>
                                <Select
                                    options={chas}
                                    placeholder="Select cha"
                                    isClearable
                                    value={chanameByCode}
                                    onChange={handleCHAChange}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                    filterOption={customFilterOption}
                                    // className={errors.chaName ? 'error-border' : ''}
                                    isDisabled={mawb3 && hawb3}
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
                            </FormGroup>
                        </Col>
                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">BE Number </Label>

                                <Input type="text" name="beNo"
                                    className="form-control"
                                    placeholder="Enter bill of entry number"
                                    value={beNo}
                                    maxLength={10}
                                    onChange={(e) => setBeNo(e.target.value)}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                />
                            </FormGroup>
                        </Col>

                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">BE Date</Label>
                                <div> {/* Wrap in an input group */}
                                    <DatePicker
                                        selected={beDate}
                                        onChange={handleDateChangeBE}
                                        wrapperClassName="custom-react-datepicker-wrapper"
                                        // minDate={today}
                                        dateFormat="dd/MM/yyyy"
                                        value={beDate} // Set the value from the database
                                        className="form-control"
                                        customInput={<input style={{ width: '100%' }} />}
                                        id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                        readOnly={mawb3 && hawb3}
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                        <Col md={3} >
                            <FormGroup>
                                <Label className="forlabel" for="branchId">Importer Address</Label>
                                <textarea
                                    name="importAddress"
                                    rows="2"
                                    className="form-control"
                                    style={{ width: '100%' }}
                                    placeholder="Enter importer address"
                                    maxLength={50}
                                    value={importAddress}
                                    onChange={(e) => setImportAddress(e.target.value)}
                                    id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                    readOnly={mawb3 && hawb3}
                                ></textarea>
                            </FormGroup>
                        </Col>
                    </Row>
                    {/* ) : null} */}
                    {snzStatus === 'Y' && (
                        <Row>
                            <Col md={3}>
                                <FormGroup>
                                    <Label className="forlabel" for="branchId">KPC Number </Label>
                                    <Input type="text" name="beNo"
                                        className="form-control"
                                        placeholder="Enter bill of entry number"
                                        value={kpcNo}
                                        maxLength={15}
                                        onChange={(e) => setKpcNo(e.target.value)}
                                        id={mawb3 && hawb3 ? 'service' : 'mawb'}
                                        readOnly={mawb3 && hawb3}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    )}

                    <div className="text-center mb-3 mt-2">

                        {!mawb3 && !hawb3 && (  // Show the "SUBMIT" button if mawb3 and hawb3 are NOT present
                            <Button
                                type="button"

                                variant="outline-success"
                                style={{ marginLeft: '10px', marginTop: '5px' }}
                                onClick={SaveorSubmit}
                                disabled={isSubmitting}
                            >
                                <FontAwesomeIcon icon={faSave} style={{ marginRight: '5px' }} />
                                Submit
                            </Button>
                        )}

                        {!mawb3 && !hawb3 && closeStatus !== 'Y' && (  // Show the "ADD NEW" button if mawb3 and hawb3 are NOT present
                            <Button
                                type="button"

                                variant="outline-danger"
                                style={{ marginLeft: '10px', marginTop: '5px' }}
                                onClick={makefieldEmpty}
                            >
                                <FontAwesomeIcon icon={faRefresh} style={{ marginRight: '5px' }} />
                                Clear
                            </Button>
                        )}


                        {closeStatus !== 'Y' && ImportsofMAWB.length > 0 && (
                            <Button
                                type="button"
                                variant="outline-danger"
                                style={{ marginLeft: '10px', marginTop: '5px' }}
                                onClick={updateImportAll}
                            >
                                <FontAwesomeIcon icon={faClose} style={{ marginRight: '5px' }} />
                                Close
                            </Button>
                        )}


                        <Button
                            type="button"
                            className="widthbtn"
                            variant="outline-danger"
                            style={{ marginLeft: '10px' }}
                            onClick={Handleback}
                        >
                            <FontAwesomeIcon icon={faBackward} style={{ marginRight: '5px' }} />
                            BACK
                        </Button>

                    </div>





                    {!(mawb3 && hawb3) && ImportsofMAWB.length > 0 && (
                        <div className="table-responsive">
                            <Table className="table table-striped table-hover">
                                <thead style={{ backgroundColor: 'rgb(226 232 240)' }}>
                                    <tr className="text-center">
                                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Sr</th>
                                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">MAWB No</th>
                                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">HAWB No</th>
                                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">SIR No</th>
                                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Wt</th>
                                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Content Type</th>
                                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">No of Packages</th>
                                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Remark</th>
                                        <th style={{ backgroundColor: '#BADDDA' }} scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {ImportsofMAWB.map((import2, index) =>

                                        <tr className="text-center">
                                            <td className="table-column">{index + 1}</td>
                                            <td className="table-column">{import2.mawb}</td>
                                            <td className="table-column">{import2.hawb.startsWith('000') ? '' : import2.hawb}</td>
                                            <td className="table-column">{import2.sirNo}</td>
                                            <td className="table-column">{import2.grossWeight}</td>
                                            <td className="table-column">{import2.packageContentType}</td>
                                            <td className="table-column">{import2.nop}</td>
                                            <td className="table-column">{import2.importRemarks}</td>
                                            <td className="table-column">
                                                <button
                                                    type="button"
                                                    className="btn me-md-2  btn-outline-primary"
                                                    onClick={(e) => getByMAWBnoAndHAwb(import2.companyId, import2.branchId, import2.impTransId, import2.mawb, import2.hawb, import2.sirNo)}
                                                ><FontAwesomeIcon icon={faEdit} />

                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn gap-2  btn-outline-danger"
                                                    onClick={(e) => DeleteImport(import2.companyId, import2.branchId, import2.impTransId, import2.mawb, import2.hawb, import2.sirNo)}
                                                > <FontAwesomeIcon icon={faTrash} />

                                                </button>



                                            </td>
                                        </tr>
                                    )
                                    }
                                </tbody>
                            </Table>
                        </div>
                    )}
                </CardBody>
            </Card >


        </div>
    );
}

export default Import_Model;