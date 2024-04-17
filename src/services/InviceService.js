import axios from "axios";
import ipaddress from "../Components/IpAddress";

const import_url = `http://${ipaddress}importmain/`;
const party_url = `http://${ipaddress}parties`;
const invoice_url = `http://${ipaddress}Invoice/`;
const invoicetaxdetails_url = `http://${ipaddress}invoicetaxdetails/`;
const payment_url = `http://${ipaddress}payment/`;
const barcode_url = `http://${ipaddress}barcodeGenerater/`;
const default_party_Cha = `http://${ipaddress}defaultparty/`;
const user_url = `http://${ipaddress}user/`;
const auth_url = `http://${ipaddress}auth/`;
const import_url2 = `http://${ipaddress}import/`;

class InviceService {

    // PAYMENT TAB URL'S

    getReceiptDataOfParty(compId, branchId, partyId, invoiceNo) {
        return axios.get(`${payment_url}getReceiptData`,
            {
                params:
                {
                    companyId: compId,
                    branchId: branchId,
                    PartyId: partyId,
                    invoiceNo: invoiceNo
                }
            });
    };




    downloadReceipt(companyid, branchId, partyId, receiptId) {
        return axios.get(`${payment_url}downLoadReceipt`,
            {
                params:
                {
                    companyId: companyid,
                    branchId: branchId,
                    PartyId: partyId,
                    receiptId: receiptId
                },
                responseType: 'arraybuffer'
            });
    };

    addFintranceDTL(compId, branchId, partyId, user, dtl, trans) {
        const requestData = {
            finTransDtl: dtl,
            finTrans: trans
        };
        return axios.post(`${payment_url}addtransdtl`, requestData,
            {
                params:
                {
                    companyId: compId,
                    branchId: branchId,
                    PartyId: partyId,
                    userId: user
                }
            });
    };



    getAllAdvanceData(compId, branchId, partyId) {
        return axios.get(`${payment_url}getAllAdvanceData`,
            {
                params:
                {
                    companyId: compId,
                    branchId: branchId,
                    PartyId: partyId,
                }
            });
    };



    getPartyAdvAndClearedAmount(compId, branchId, partyId) {
        return axios.get(`${payment_url}getSumOfAdvAndCleared`,
            {
                params:
                {
                    companyId: compId,
                    branchId: branchId,
                    PartyId: partyId,
                }
            });
    };


    getTransIdByPartyId(compId, branchId, partyId) {
        return axios.get(`${payment_url}gettransByPartyId`,
            {
                params:
                {
                    companyId: compId,
                    branchId: branchId,
                    PartyId: partyId,
                }
            });
    };

    // Searching Invoice Numbers
    getTransByReceiptId(compId, branchId, receiptId, partyId) {
        return axios.get(`${payment_url}getTransReceiptId`,
            {
                params:
                {
                    companyId: compId,
                    branchId: branchId,
                    PartyId: partyId,
                    receiptId: receiptId
                }
            });
    };

    addAdvamce(compId, branchId, partyId, advance) {
        return axios.post(`${payment_url}addvance`, advance,
            {
                params:
                {
                    companyId: compId,
                    branchId: branchId,
                    PartyId: partyId  // Use 'PartyId' instead of 'partyId'
                }
            });
    };











    // Downloading Single Pdf Invice
    getSingleInvicePDFromBillsTab(compId, branchId, partyId, invoiceNo) {
        return axios.get(`${invoice_url}generateSingleinvice`,
            {
                params:
                {
                    companyId: compId,
                    branchId: branchId,
                    PartyId: partyId,
                    invoiceNo: invoiceNo
                },
                responseType: 'arraybuffer' // Tell Axios to treat the response as binary data
            });
    };



    // Get Todays Billing Data
    getMainByPartyId(compId, branchId, partyId) {
        return axios.get(`${invoice_url}getInviceByPartyId`, {
            params:
            {
                companyId: compId,
                branchId: branchId,
                PartyId: partyId
            }
        });
    };

// Get Todays Billing Data
getPendingInvoicesPartyId(compId, branchId, partyId) {
    return axios.get(`${invoice_url}getpendingInvoices`, {
        params:
        {
            companyId: compId,
            branchId: branchId,
            PartyId: partyId
        }
    });
};




    getCombinedImportsandxports(comapnyId, branchId, party) {
        return axios.get(`${invoice_url}searchBillinTransaction`, {
            params: {
                companyId: comapnyId,
                branchId: branchId,
                PartyId: party
            }
        });
    };







    getCommonPassPrint(companyId, BranchId, type, dataToSent) {
        // console.log("Data To BE Send ");
        // console.log(dataToSent);
        return axios.post(`${import_url}common/printgatepass/${companyId}/${BranchId}/${type}`, dataToSent);
    };

    getMopPassPrint1(dataToSent, cid, bid) {

        return axios.post(`${import_url}generateMopGetPass1/${cid}/${bid}`, dataToSent);
    };




    getCommonPassPrint(companyId, BranchId, type, dataToSent) {
        // console.log("Data To BE Send ");
        // console.log(dataToSent);
        return axios.post(`${import_url}common/printgatepass/${companyId}/${BranchId}/${type}`, dataToSent);
    };

    getCommonPassPrint1(companyId, BranchId, dataToSent) {
        // console.log("Data To BE Send ");
        // console.log(dataToSent);
        return axios.post(`${import_url}common/printgatepass1/${companyId}/${BranchId}`, dataToSent);
    };


    getProformaByPartyId(compId, branchId, partyId) {
        return axios.get(`${invoice_url}${compId}/${branchId}/${partyId}/getProformaByPartyId`);
    };

    getSingleProformaPDFromBillsTab(compId, branchId, partyId, invoiceNo) {
        return axios.get(`${invoice_url}${compId}/${branchId}/${partyId}/${invoiceNo}/getSingleProformaPDFromBillsTab`);
    };

    //getUserByUserId
    getUserByUserId(compId, branchId, userId) {
        // console.log("In service " + userId);
        return axios.get(`${user_url}${compId}/${branchId}/${userId}/findByUserId`)
    };


    // sendOtpForForgotPassword
    updatePassword(companyId, branchId, userId, password) {


        const requestData = {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                password: password,
            }
        };

        return axios.get(`${user_url}UpdatePassword`, requestData)
    };


    confirmOtp(companyId, branchId, userId, otp) {

        const requestData = {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                otp: otp,
            }
        };
        return axios.get(`${user_url}checkOtpForPasswordChange`, requestData)
    };




    // sendOtpForForgotPassword
    sendOtpForgotPassword(companyId, branchId, userId, mobileNo) {
        const requestData = {
            params: {
                companyId: companyId,
                branchId: branchId,
                userId: userId,
                mobileNo: mobileNo,
            }
        };
        return axios.get(`${auth_url}passwordChange`, requestData)
    };

    getAllCompanies(reactPageName) {
        return axios.get(`${user_url}company`, { headers: { 'React-Page-Name': reactPageName } });
    };

    getBranchesOfCompany(companyId, reactPageName) {
        return axios.get(`${user_url}${companyId}/branch`, { headers: { 'React-Page-Name': reactPageName } });
    };







    getMopPassPrint(type, dataToSent) {
        return axios.post(`${import_url}${type}/generateMopGetPass`, dataToSent);
    };

    getMOPSearchData(compId, branchId, searchValue) {
        return axios.get(`${import_url}${compId}/${branchId}/${searchValue}/getDataForMopGetPass`);
    };


    getDefaultPartyCha(companyId, BranchId, userId) {
        return axios.get(`${default_party_Cha}getdata/${companyId}/${BranchId}/${userId}`)
    }

    // Searching Invoice Numbers
    SearchInvoiceNoList(params) {
        return axios.get(`${invoice_url}getInvoiceNoListByParty`, params)
    }

    // Searching Invoice Numbers
    SearchInvoiceNoListByInvoiceHistoryNumber(params) {
        return axios.get(`${invoice_url}getInvoiceNoListByPartyAndInvoiceNumber`, params)
    }

    downLoadProforma(compId, branchId, invoiceNo) {
        return axios.get(`${invoice_url}${compId}/${branchId}/${invoiceNo}/generateProformapdf2`);
    };



    downLoad(compId, branchId, invoiceNo, invoicelist) {
        return axios.post(`${invoice_url}${compId}/${branchId}/${invoiceNo}/generatepdf`, invoicelist);
    };

    downLoadBill(compId, branchId, invoiceNo, invoicelist) {
        return axios.post(`${invoice_url}${compId}/${branchId}/${invoiceNo}/generatebillpdf`, invoicelist);
    };


    getPartyNameById(compId, branchId, PartyId) {
        return axios.get(`${party_url}${compId}/${branchId}/${PartyId}/findPartyName`)
    };

    generateInvoice(data) {
        return axios.get(`${invoice_url}InvoiceGeneration`, {
            params: data, // Pass the URL as a parameter
        });

    };

    getDetailByInvoiceNo(compId, branchId, invoiceNo) {
        return axios.get(`${invoice_url}${compId}/${branchId}/${invoiceNo}/getDetailByInvoiceNo`);
    };

    getInvoiceDetailByInvoiceNo(compId, branchId, partyId, invoiceNo) {
        return axios.get(`${invoicetaxdetails_url}${compId}/${branchId}/${partyId}/${invoiceNo}/byinvoicenumber`);
    };

    getbarcode(mawb, sir, noofpackages, sirdate, bedate, type, niptStatus, requestId, hawb, igm, subtype) {
        const requestData = {
            mawbno: mawb,
            sirno: sir,
            noOfPackages: noofpackages,
            sirDate: sirdate,
            reqDate: bedate,
            type: type,
            niptStatus: niptStatus,
            requestId: requestId,
            HAWB: hawb,
            IGM: igm,
            subType: subtype
        };

        return axios.post(`${barcode_url}generatePDFWithMultipleBarcodes`, requestData);
    };


    getbarcodeDetention(siNo, depositDate, noofpackages) {
        const requestData = {
            siNo: siNo,
            depositDate: depositDate,
            noOfPackages: noofpackages,

        };

        return axios.post(`${barcode_url}generatePDFWithMDetention`, requestData);
    };

    // Downloading Single Pdf Bill
    getSingleBillPDFromBillsTab(compId, branchId, partyId, invoiceNo) {
        return axios.get(`${invoice_url}${compId}/${branchId}/${partyId}/${invoiceNo}/generateSingleBill`);
    };





    // Print Sir Tags By Master Bill Number 
    printSirByMAWB(compid, bid, mawb) {
        return axios.get(`${barcode_url}${compid}/${bid}/${mawb}/printByMawb`);
    };




    // Downloading Single Pdf Demurages
    getSingleDemuragesPDFromBillsTab(compId, branchId, partyId, invoiceNo) {
        return axios.get(`${invoice_url}${compId}/${branchId}/${partyId}/${invoiceNo}/generateSingleDemurage`);
    };

    // GetData for Stock AT Vault
    // getdataForStockAtVault(compId,branch_id)
    // {
    //    return axios.get(`${barcode_url}${compId}/${branch_id}/getDataStockAtVault`)
    // };

    // GetData for Stock AT Vault
    // getdataForStockAtVault(compId, branch_id) {
    //     return axios.get(`${barcode_url}${compId}/${branch_id}/getDataStockAtVault`)
    // };

    // getdataForStockAtVaultDetention(compId, branch_id) {
    //     return axios.get(`${barcode_url}${compId}/${branch_id}/getDataStockAtVaultDetention`)
    // };


    getdataForStockAtVault(compId, branch_id) {
        return axios.get(`${barcode_url}${compId}/${branch_id}/getDataStockAtVault`)
    };

    getdataForStockAtVaultDetention(compId, branch_id) {
        return axios.get(`${barcode_url}${compId}/${branch_id}/getDataStockAtVaultDetention`)
    };



    getBillingTransactionAfter(data) {
        return axios.get(`${import_url}searchBillinTransactionAfter`, {
            params: data, // Pass the URL as a parameter
        });

    };

    // New Print

    getImportRegisterPrint(dataToSent) {
        return axios.get(`${import_url2}importRegiter`, {
            params: dataToSent,
        });
    };



}

export default new InviceService();