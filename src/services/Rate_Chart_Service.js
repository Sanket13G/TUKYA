import axios from "axios";
import ipaddress from "../Components/IpAddress";


const service_url = `http://${ipaddress}service/`
const party_url = `http://${ipaddress}parties`
const cfsservice_url = `http://${ipaddress}cfstarrif`
const tarrif_url = `http://${ipaddress}tarrif/`
const range_url = `http://${ipaddress}range/`
const user_url = `http://${ipaddress}user/`
const import_url = `http://${ipaddress}importmain/`
const airline_url = `http://${ipaddress}Airline/`
const jardetail_url = `http://${ipaddress}jardetail/`
const ImportHistory_url = `http://${ipaddress}history/`
const importPc_url = `http://${ipaddress}importpc/`
const ExternalUser_url = `http://${ipaddress}externalParty/`
const importHeavy_url = `http://${ipaddress}importHeavy/`
const newreprentative_url = `http://${ipaddress}NewReprentative/`
const importnew_url = `http://${ipaddress}import/`

class Rate_Chart_Service {


















  getAllPartiesByInviceType(cid, bid,inviceType) {
    return axios.get(`${party_url}/getAllInviceType/${cid}/${bid}/${inviceType}`);
  };




  getAirlineNameByShortName(companyid, branchId, shortname) {
    return axios.get(`${airline_url}findByShortName/${companyid}/${branchId}/${shortname}`)
  };


  // Get username  by external userId
  getUsernameByexternalUserId(compId, branchId, externalUserId) {
    return axios.get(`${ExternalUser_url}${compId}/${branchId}/${externalUserId}/getByUsernameByID`)
  };




  getServices(compid, branchid) {
    return axios.get(`${service_url}${compid}/${branchid}`);
  }
  getExcludedServices(compid, branchid, excludedserviceIds) {
    return axios.get(`${service_url}${compid}/${branchid}/diffservice?excludedserviceIds=${excludedserviceIds}`);
  }

  getByServiceId(compid, branchid, sid) {
    return axios.get(`${service_url}${compid}/${branchid}/${sid}`)
  }

  getAllParties(cid, bid) {
    return axios.get(`${party_url}/getAll/${cid}/${bid}`);
  }

  getAllParties1(cid, bid) {
    return axios.get(`${party_url}/getAll1/${cid}/${bid}`);
  }
  getParties(cid, bid, excludedPartyIds) {
    const excludedPartyIdsStr = excludedPartyIds.join(','); // Convert array to comma-separated string
    return axios.get(`${party_url}/${cid}/${bid}/diffparty?excludedPartyIds=${excludedPartyIdsStr}`);
  }
 









  addCFSserviceOnlyService(companyId, branchId, currentUser, service_Id, cfsService) {
    return axios.post(`${cfsservice_url}/${companyId}/${branchId}/${currentUser}/${service_Id}/service`, cfsService)
  }

  addCFSservice(companyId, branchId, currentUser, cfsService) {
    return axios.post(`${cfsservice_url}/${companyId}/${branchId}/${currentUser}`, cfsService)
  }

  getCFSServiceById(cfsTarrifNo) {
    return axios.get(`${cfsservice_url}/${cfsTarrifNo}/cfstservices`);
  }
  getCFSService(compId, BranchId) {
    return axios.get(`${cfsservice_url}/${compId}/${BranchId}`);
  }

  getCombinedServicesTarrifNo(cid, bid, cfsTarrifNo,amdno) {
    return axios.get(`${range_url}ById/${cid}/${bid}/${cfsTarrifNo}/${amdno}`);
  }

  updateCFSservice(companyId, branchId, currentUser, cfstarrifno, cfsService) {
    return axios.put(`${cfsservice_url}/${companyId}/${branchId}/${currentUser}/${cfstarrifno}`, cfsService)
  }

  updateCFSservicestatus(companyId, branchId, currentUser, cfstarrifno, cfsService) {
    return axios.put(`${cfsservice_url}/${companyId}/${branchId}/${currentUser}/${cfstarrifno}/status`, cfsService)
  }

  findByTarrifNoAndServiceID(compid, branchid, tarrifNo, amndno, ServiceId) {
    return axios.get(`${cfsservice_url}/${compid}/${branchid}/${tarrifNo}/${amndno}/${ServiceId}/Single`)
  }
  // All Tarifs Functions

  getAllTarrifs(compId, branchId) {
    return axios.get(`${tarrif_url}${compId}/${branchId}`)
  }

  addTarrif(compId, BranchId, currentUser, tarrif) {
    return axios.post(`${tarrif_url}${compId}/${BranchId}/${currentUser}`, tarrif);
  }

  updateTarrif(compId, BranchId, currentUser, cfstarrifno, tarrif) {
    return axios.put(`${tarrif_url}${compId}/${BranchId}/${currentUser}/${cfstarrifno}/update`, tarrif);
  }

  updateTarrifStatus(compId, BranchId, currentUser, cfstarrifno, tarrif) {
    return axios.put(`${tarrif_url}${compId}/${BranchId}/${currentUser}/${cfstarrifno}/status`, tarrif);
  }

  getCFSTarrifById(compId, BranchId, cfsTarrifNo) {
    return axios.get(`${tarrif_url}${compId}/${BranchId}/${cfsTarrifNo}/cfstarrif`);
  }


  getRangeByTarrifNoAndServiceId(compId, branchId, tarrifno, amondno, serlno) {
    return axios.get(`${range_url}${compId}/${branchId}/${tarrifno}/${amondno}/${serlno}/ser`)
  }


  addTarrifRange(compId, BranchId, currentUser, range) {
    return axios.post(`${range_url}${compId}/${BranchId}/${currentUser}/add`, range);
  }

  updateTarrifRange(compId, BranchId, currentUser, cfstarrifno, range) {
    return axios.put(`${range_url}${compId}/${BranchId}/${currentUser}/${cfstarrifno}/update`, range);
  }

  updateTarrifRangeStatus(compId, BranchId, currentUser, cfstarrifno, range) {
    return axios.put(`${range_url}${compId}/${BranchId}/${currentUser}/${cfstarrifno}/status`, range);
  }


  getCombinedServicesSingleTarrifNo(cid, bid, cfsTarrifNo) {
    return axios.get(`${range_url}${cid}/${bid}/${cfsTarrifNo}/join`);
  }

  saveAllTarrifRanges(TarrifRanges, user) {
    return axios.post(`${range_url}tariffRanges/saveAll/${user}`, TarrifRanges)
  }




  deletecfssrvTarrif(cid, bid, TarrifNo, amndno, ServiceId) {
    return axios.delete(`${cfsservice_url}/${cid}/${bid}/${TarrifNo}/${amndno}/${ServiceId}/delete`);
  }

  deletecfsrangeTarrif(cid, bid, TarrifNo, amndno, ServiceId) {
    return axios.delete(`${range_url}${cid}/${bid}/${TarrifNo}/${amndno}/${ServiceId}/delete`);
  }





  getUserbyUserId(userId, cid, bid) {
    return axios.get(`${user_url}get-user/${userId}/${cid}/${bid}`);
  }





  // Import Urls









  updateNSDLStatus(compid, branchid, transid, mawb, hawb, sir, userId) {
    return axios.post(`${import_url}${compid}/${branchid}/${transid}/${mawb}/${hawb}/${sir}/${userId}/updateNIPT`)
  }



  addNIPTImport(compid, bid, username, url) {
    return axios.get(`${import_url}${compid}/${bid}/${username}/addNIPT`, {
      params: { url }, // Pass the URL as a parameter
    });
  };


  getAllImports(compId, branchId) {
    return axios.get(`${import_url}${compId}/${branchId}/All`);
  }


  getByMAWBNo(compId, branchId, mawbno) {
    return axios.get(`${import_url}getImportsOfMawb`,{
      params:
      {
        compId:compId,
        branchId:branchId,
        mawbno:mawbno
      }
    });
  }

  // getByMAWBNo(compId, branchId, mawbno) {
  //   return axios.get(`${import_url}${compId}/${branchId}/${mawbno}`);
  // }
  addImport(compid, bid, username, import2) {
    return axios.post(`${import_url}${compid}/${bid}/${username}/add`, import2);
  }
  updateImport(compid, bid, username, import2) {
    return axios.put(`${import_url}${compid}/${bid}/${username}/update`, import2);
  }

  ModifyupdateImport(compid, bid, username, import2) {
    return axios.put(`${import_url}${compid}/${bid}/${username}/modifyupdate`, import2);
  }
  
 
  


  getAllTarrifByParty(compId, branchId,party) {
    return axios.get(`${tarrif_url}${compId}/${branchId}/${party}/tarrifByParty`)
  }
  // GetByMAWBandHAWBImage(compid, bid, transId, MAWb, HAWB, sirNo) {
  //   return axios.get(`${import_url}${compid}/${bid}/${transId}/${MAWb}/${HAWB}/${sirNo}/getImage`);
  // };

  // GetByMAWBandHAWBWrongDepositImage(compid, bid, transId, MAWb, HAWB, sirNo) {
  //   return axios.get(`${import_url}${compid}/${bid}/${transId}/${MAWb}/${HAWB}/${sirNo}/getImageWrongDeposit`);
  // }

  // GetByMAWBandHAWB(compid, bid, transId, MAWb, HAWB, sirNo) {
  //   return axios.get(`${import_url}${compid}/${bid}/${transId}/${MAWb}/${HAWB}/${sirNo}/getSingle`);
  // }
  // deleteimportofmawb(compid, bid, transId, MAWb, HAWB, sirNo) {
  //   return axios.delete(`${import_url}${compid}/${bid}/${transId}/${MAWb}/${HAWB}/${sirNo}/delete`);
  // }



  GetByMAWBandHAWBImage(compid, bid, transId, MAWb, HAWB, sirNo) {



    return axios.get(`${import_url}getImage`,{
      params:{
        compid:compid,
        bid:bid,
        transId:transId,
        MAWb:MAWb,
        HAWB:HAWB,
        sirNo:sirNo
      }
    });
  };

  GetByMAWBandHAWBWrongDepositImage(compid, bid, transId, MAWb, HAWB, sirNo) {
    return axios.get(`${import_url}getImageWrongDeposit`,{
      params:{
        compid:compid,
        bid:bid,
        transId:transId,
        MAWb:MAWb,
        HAWB:HAWB,
        sirNo:sirNo
      }
    });
  }

  GetByMAWBandHAWB(compid, bid, transId, MAWB, HAWB, sirNo) {
    // return axios.get(`${import_url}${compid}/${bid}/${transId}/${MAWb}/${HAWB}/${sirNo}/getSingleImportByNew`);

    return axios.get(`${import_url}getSingleImportByNew`, {
      params: {
        compid: compid,
        branchId: bid,
        transId: transId,
        MAWB: MAWB,
        HAWB: HAWB,
        sirNo: sirNo
      }
    });
  }
  deleteimportofmawb(compid, bid, transId, MAWb, HAWB, sirNo) {
    return axios.delete(`${import_url}delete`,
    {
      params:
      {
        compid:compid,
        bid:bid,
        transId:transId,
        MAWb:MAWb,
        HAWB:HAWB,
        sirNo:sirNo
      }
    });
  }





  // getByCompIdBranchIdDgdcStatus(cid, bid,console) {
  //   return axios.get(`${import_url}${cid}/${bid}/carting`);
  // };

 
  // updateImportStatusCondition(companyid, branchId, transId, mawb, hawb, sir, user, buttonType, import3) {
  //   return axios.put(`${import_url}${companyid}/${branchId}/${transId}/${mawb}/${hawb}/${sir}/${user}/${buttonType}/ChangeStatus`, import3)
  // }


  updateImportStatusCondition(companyid, branchId, transId, mawb, hawb, sir, user, buttonType, import3) {

    return axios.put(`${import_url}ChangeStatus`, import3,{
      params:
      {
        companyid:companyid,
        branchId:branchId,
        transId:transId,
        mawb:mawb,
        hawb:hawb,
        sir:sir,
        user:user,
        buttonType:buttonType

      }
    });
  }


  SearchImports(params) {
    return axios.get(`${import_url}search`, params)
  }


  SearchImportsforparty(params,id,type) {
    return axios.get(`${import_url}searchbylogintype/${id}/${type}`, params)
  }

  SearchImportsforcartingagent(params,id,type) {
    return axios.get(`${import_url}searchbylogintype/${id}/${type}`, params)
  }

  SearchImportsforCHA(params,id,type) {
    return axios.get(`${import_url}searchbylogintype/${id}/${type}`, params)
  }

  SearchImportsforConsole(params,id,type) {
    return axios.get(`${import_url}searchbylogintype/${id}/${type}`, params)
  }
  // New Imports for hand over to party or Cha 

  
  getReprentativeByCompIdBranchIdUserId(cid, bid, userId) {
    return axios.get(`${newreprentative_url}${cid}/${bid}/${userId}/ByUserID`);
  };

 

  // // Import History

  // getHistoryBySIRNo(cid, bid, mawb, hawb, sirno) {
  //   return axios.get(`${ImportHistory_url}${cid}/${bid}/${mawb}/${hawb}/${sirno}`);
  // };



  // getImportPCbyIds(cid, bid, mawb, hawb, sirno) {
  //   return axios.get(`${importPc_url}${cid}/${bid}/${mawb}/${hawb}/${sirno}/getSingle`)
  // };

  // addImportPCOBJECTS(cid, bid, user, mawb, hawb, sirno, importPCObject) {
  //   return axios.post(`${importPc_url}${cid}/${bid}/${user}/${mawb}/${hawb}/${sirno}/addimportpc`, importPCObject)
  // };
  // updateImportPCOBJECTS(cid, bid, user, mawb, hawb, sirno, importPCObject) {
  //   return axios.post(`${importPc_url}${cid}/${bid}/${user}/${mawb}/${hawb}/${sirno}/updateimportpc`, importPCObject)
  // };



   // Import History

   getHistoryBySIRNo(cid, bid, mawb, hawb, sirno) {    
    return axios.get(`${ImportHistory_url}getHistoryOfMaster`,{
      params:
      {
        cid:cid,
        bid:bid,
        mawb:mawb,
        hawb:hawb,
        sirno:sirno
      }
    });
  };



  getImportPCbyIds(cid, bid, mawb, hawb, sirno) {
    return axios.get(`${importPc_url}getSingle`,{
      params:
      {
        cid:cid,
        bid:bid,
        mawb:mawb,
        hawb:hawb,
        sirno:sirno
      }
    });
  };

  addImportPCOBJECTS(cid, bid, user, mawb, hawb, sirno, importPCObject) {
    return axios.post(`${importPc_url}addimportpc`, importPCObject,{
      params:
      {
        cid:cid,
        bid:bid,
        mawb:mawb,
        hawb:hawb,
        sirno:sirno,
        user:user
      }
    });
  };
  updateImportPCOBJECTS(cid, bid, user, mawb, hawb, sirno, importPCObject) {
    return axios.post(`${importPc_url}updateimportpc`, importPCObject
    ,{
      params:
      {
        cid:cid,
        bid:bid,
        mawb:mawb,
        hawb:hawb,
        sirno:sirno,
        user:user
      }
    })
  };





  // Airline 
  getAllairline(cid, bid) {
    return axios.get(`${airline_url}list/${cid}/${bid}`);
  };



  findByFlightNo(flightno, cid, bid) {
    return axios.get(`${airline_url}find/${cid}/${bid}/${flightno}`);
  };

  getjarsByJarId(jarId, company_Id) {
    return axios.get(`${jardetail_url}jarIdList/${jarId}/${company_Id}`);
  };


  // External Party  Url

  getAllExternalUser(compid, branchId) {
    return axios.get(`${ExternalUser_url}${compid}/${branchId}/getAll`);
  };

  getSingleExternalUser(compid, branchId, userId) {
    return axios.get(`${ExternalUser_url}${compid}/${branchId}/${userId}/get`);
  };


  addExternalUser(compid, branchId, user, encodedCompanyId, encodedBranchId, ipaddress, externalUser) {
    const ipAddressBeforeColon = ipaddress.split(':')[0];

    return axios.post(`${ExternalUser_url}${compid}/${branchId}/${user}/${encodedCompanyId}/${encodedBranchId}/${ipAddressBeforeColon}/add`, externalUser);
  };

  updateExternalUser(compid, branchId, EUSERID, user, externalUser) {
    return axios.put(`${ExternalUser_url}${compid}/${branchId}/${EUSERID}/${user}/delete`, externalUser);
  };

  getExternalUserByType(compid, branchId, type) {
    return axios.get(`${ExternalUser_url}${compid}/${branchId}/${type}/getByUsertype`);
  };
  getExternalUserByTypeForImport(compid, branchId, type) {
    return axios.get(`${ExternalUser_url}${compid}/${branchId}/${type}/GetForImport`);
  };


  // Representative Party 

  getAllReprentative(compid, branchId, type) {
    return axios.get(`${newreprentative_url}${compid}/${branchId}/${type}/Bytype`)
  };

  getReprentativeById(compid, branchId, userId, id) {
    return axios.get(`${newreprentative_url}${compid}/${branchId}/${userId}/${id}/Byid`)
  };
  getReprentativeByIdImage(compid, branchId, userId, id) {
    return axios.get(`${newreprentative_url}${compid}/${branchId}/${userId}/${id}/getImage`)
  };



  // getAllHeavyParcels(compId, branchId, mawb, hawb, transId, sir) {
  //   return axios.get(`${importHeavy_url}${compId}/${branchId}/${transId}/${mawb}/${hawb}/${sir}/getAllHeavy`)
  // };

  // getHeavyParcelsByPackageNumber(compId, branchId, mawb, hawb, transId, sir, packageno) {
  //   return axios.get(`${importHeavy_url}${compId}/${branchId}/${transId}/${mawb}/${hawb}/${sir}/${packageno}/getByPakageNo`)
  // };

  // addIMportHeavy(compId, branchId, user, importheavy) {
  //   return axios.post(`${importHeavy_url}${compId}/${branchId}/${user}/addHeavy`, importheavy)
  // };

  // DeleteByPackageNumber(compId, branchId, mawb, hawb, transId, sir, packageno) {
  //   return axios.delete(`${importHeavy_url}${compId}/${branchId}/${transId}/${mawb}/${hawb}/${sir}/${packageno}/delete`)
  // };

  // updateByPackageNumber(compId, branchId, mawb, hawb, transId, sir, packageno, importheavy) {
  //   return axios.put(`${importHeavy_url}${compId}/${branchId}/${transId}/${mawb}/${hawb}/${sir}/${packageno}/update`, importheavy)
  // };


  getAllHeavyParcels(compId, branchId, mawb, hawb, transId, sir) {
    return axios.get(`${importHeavy_url}getAllHeavy`,
    {
      params:
      {
        compId:compId,
        branchId:branchId,
        mawb:mawb,
        hawb:hawb,
        transId:transId,
        sir:sir
      }
    });
  };

  getHeavyParcelsByPackageNumber(compId, branchId, mawb, hawb, transId, sir, packageno) {
    return axios.get(`${importHeavy_url}getByPakageNo`,{
      params:
      {
        compId:compId,
        branchId:branchId,
        mawb:mawb,
        hawb:hawb,
        transId:transId,
        sir:sir,
        packageno:packageno

      }
    });
  };

  addIMportHeavy(compId, branchId, user, importheavy) {
    return axios.post(`${importHeavy_url}${compId}/${branchId}/${user}/addHeavy`, importheavy)
  };

  DeleteByPackageNumber(compId, branchId, mawb, hawb, transId, sir, packageno) {
    return axios.delete(`${importHeavy_url}delete`,
    {
      params:
      {
        compId:compId,
        branchId:branchId,
        mawb:mawb,
        hawb:hawb,
        transId:transId,
        sir:sir,
        packageno:packageno

      }
    })
  };

  updateByPackageNumber(compId, branchId, mawb, hawb, transId, sir, packageno, importheavy) {
    return axios.put(`${importHeavy_url}update`, importheavy,
    {
      params:
      {
        compId:compId,
        branchId:branchId,
        mawb:mawb,
        hawb:hawb,
        transId:transId,
        sir:sir,
        packageno:packageno

      }
    })
  };



  // Update Bill Number

  updateBillNumber(compid, bid, username, url) {
    return axios.get(`${import_url}${compid}/${bid}/${username}/updateBillNumber`, {
      params: { url }, // Pass the URL as a parameter
    });
  };


  updatePersonalCarraige(compid, bid, username, url) {
    return axios.get(`${import_url}${compid}/${bid}/${username}/updatePersonalCarraige`, {
      params: { url }, // Pass the URL as a parameter
    });
  };





  // getAirline Name by airline Code
  getAirlineNameByCode(companyid, branchId, airlineCode) {
    return axios.get(`${airline_url}findAirlineNameByCode/${companyid}/${branchId}/${airlineCode}`)
  };



  // Personal Carriage Import

  // searchdetentionReceiptNo(companyid, branchId, detentionNo) {
  //   return axios.get(`${import_url}${companyid}/${branchId}/${detentionNo}/SearchDetention`)
  // };

  searchdetentionReceiptNo(companyid, branchId, detentionNo) {

    return axios.get(`${import_url}SearchDetention`,
    {
      params: {
        companyid: companyid,
        branchId: branchId,
        detentionNo: detentionNo       
      }
    });
  };


  addPersonalImport(compid, bid, username, import2) {
    return axios.post(`${import_url}${compid}/${bid}/${username}/addPersonal`, import2);
  }
  updatePctmNumber(compid, bid,importList)
  {
    return axios.put(`${importnew_url}${compid}/${bid}/importDataAndUpdatePCTM`,importList);
  };





  //New


  getAllActiveParties(companyId, branchId) {
    const requestData = {
      params: {
        companyId: companyId,
        branchId: branchId
      }
    }
    return axios.get(`${party_url}/getAllParties`, requestData);
  };

  getAllNonBilledParties(companyId, branchId) {
    const requestData = {
      params: {
        companyId: companyId,
        branchId: branchId
      }
    }
    return axios.get(`${party_url}/getNonBilledAllParties`, requestData);
  };


  // update customs PCTM number
  updateCustomPctmNumber(cid, bid, customNumber, customDate, console, country,user, ImportList) {
    return axios.put(`${import_url}updateCustomPctmNumber`, ImportList, {
      params: {
        companyId: cid,
        branchId: bid,
        customNumber: customNumber,
        customDate: customDate,
        console: console,
        user: user,
        country:country
      }
    });
  };

// find Imports for Custom pctm pdate
  findCustomPctmNumberImports(comapnyId, branchId, consoleName,country) {
    return axios.get(`${import_url}getImportsforCustomPctmUpdate`,
      {
        params: {
          companyId: comapnyId,
          branchId: branchId,
          consoleName: consoleName,
          country:country
        }
      });
  };


  // get Distict destinations
  getDistinctPorts(comapnyId, branchId, consoleName) {
    return axios.get(`${import_url}getDistinctPorts`,
      {
        params: {
          companyId: comapnyId,
          branchId: branchId,
          consoleName: consoleName
        }
      });
  };



// update customs tp number
  updateCustomTpNumber(cid, bid, customNumber, customDate, console, user, ImportList) {
    return axios.put(`${import_url}updateCustomTpNumber`, ImportList, {
      params: {
        companyId: cid,
        branchId: bid,
        customNumber: customNumber,
        customDate: customDate,
        console: console,
        user: user
      }
    });
  };



  findCustomTpNumberImports(comapnyId, branchId, consoleName) {
    return axios.get(`${import_url}getImportsforCustomTpUpdate`,
      {
        params: {
          companyId: comapnyId,
          branchId: branchId,
          consoleName: consoleName
        }
      });
  };


  updatePartyOrCHAStatusSingle(companyId, branchId, user, otp, cartingAgent, reprentativeId, Import) {
    return axios.put(`${import_url}PartyOrCHAupdateSingle`, Import,
      {
        params: {
          companyId: companyId,
          branchId: branchId,
          user: user,
          cartingAgent: cartingAgent,
          reprentativeId: reprentativeId,
          otp: otp
        }
      });
  };

  updateSingleCartingAgentStatus(companyId, branchId, user, otp, cartingAgent, reprentativeId, Import, tpNo) {

    return axios.put(`${import_url}SingleCartingAgent`, Import,
      {
        params: {
          companyId: companyId,
          branchId: branchId,
          user: user,
          cartingAgent: cartingAgent,
          reprentativeId: reprentativeId,
          tpNo: tpNo,
          otp: otp
        }
      });
  };


  getNameByIdExternalParty(companyId, branchId, externalId) {
    return axios.get(`${ExternalUser_url}getNameById`,
      {
        params: {
          companyId: companyId,
          branchId: branchId,
          externalId: externalId
        }
      });
  }

  getLatestCurrencyrate(companyId, branchId) {
    return axios.get(`${import_url}getLatestCurrencyrate`,
      {
        params: {
          companyId: companyId,
          branchId: branchId
        }
      });
  };

  getPartyById(companyId, branchId, partyId) {
    return axios.get(`${party_url}/getByPartyId`,

      {
        params: {
          companyId: companyId,
          branchId: branchId,
          importerId: partyId
        }

      });
  };






  updatePartyOrCHAStatus(cid, bid, user, otp, carting, reprentativeId, ImportList) {

    return axios.put(`${import_url}PartyOrCHAupdate`, ImportList, {
      params: {
        companyId: cid,
        branchId: bid,
        user: user,
        otp: otp,
        carting: carting,
        representativeId: reprentativeId
      }
    });
  };





  getImportsofPartyORCha(cid, bid, importer) {
    return axios.get(`${import_url}ForPartyorCha`, {
      params: {
        companyId: cid,
        branchId: bid,
        importerId: importer
      }
    });
  };
  getImportsofPartyORExpiredCha(cid, bid, importer, date) {
    return axios.get(`${import_url}ForPartyorExpiredCha`, {
      params: {
        companyId: cid,
        branchId: bid,
        importerId: importer,
        date: date
      }
    });
  };






  // Receiced from Carting Agents

  getImportsforReceivedCarting(cid, bid, cartingId, representativeId) {
    return axios.get(`${import_url}Receivedcarting`, {
      params: {
        companyId: cid,
        branchId: bid,
        carting: cartingId,
        representative: representativeId
      }
    });
  };

  updateReceivedCartingAgents(cid, bid, user, otp, carting, reprentativeId, ImportList) {
    return axios.put(`${import_url}ReceivedFromCarting`, ImportList, {
      params: {
        companyId: cid,
        branchId: bid,
        user: user,
        otp: otp,
        carting: carting,
        representativeId: reprentativeId
      }
    });
  }



  //  getImportsforReceivedCarting(cid, bid, cartingId, representativeId) {
  //   return axios.get(${import_url}${cid}/${bid}/${cartingId}/${representativeId}/Receivedcarting);
  // };

  // updateReceivedCartingAgents(cid, bid, user, otp, userId, reprentativeId, ImportList) {
  //   return axios.put(${import_url}ReceivedFromCarting, ImportList)
  // }















  updateCartingAgentStatus(cid, bid, user, otp, agent, reprentativeId, ImportList, tp) {
    const queryParams = new URLSearchParams({
      compid: cid,
      branchId: bid,
      user: user,
      otp: otp,
      userId: agent,
      ReprentativeId: reprentativeId,
      tp: tp
    });

    return axios.put(`${import_url}CartingAgentupdate?${queryParams.toString()}`, ImportList);
  }



  getRepresentative(cid, bid, representative) {
    return axios.get(`${newreprentative_url}getRepresentativeDetails`, {
      params: {
        companyId: cid,
        branchId: bid,
        representative: representative
      }
    });
  };

  getRepresentativeByUser(cid, bid, user) {
    return axios.get(`${newreprentative_url}getRepresentative`, {
      params: {
        companyId: cid,
        branchId: bid,
        user: user
      }
    });
  };

  getByCompIdBranchIdDgdcStatus(cid, bid, console) {
    return axios.get(`${import_url}carting`, {
      params: {
        companyId: cid,
        branchId: bid,
        console: console
      }
    });
  };


  getimportPctmXLS(companyId, branchId, startDate, endDate, airlineCode, console, pctmNo) {
    const requestData = {
      params: {
        companyId: companyId,
        branchId: branchId,
        startDate: startDate,
        endDate: endDate,
        airlineCode: airlineCode,
        console: console,
        pctmNo: pctmNo
      }
    };

    return axios.get(`${importnew_url}printOfImportPctm`, requestData);

  };

  getimportPctmPrint(companyId, branchId, startDate, endDate, airlineCode, console, pctmNo) {
    const requestData = {
      params: {
        companyId: companyId,
        branchId: branchId,
        startDate: startDate,
        endDate: endDate,
        airlineCode: airlineCode,
        console: console,
        pctmNo: pctmNo
      }
    };

    return axios.get(`${importnew_url}printOfImportPctm`, requestData);

  };



  getDataforPctmPrint(companyId, branchId, startDate, endDate, airlineCode, console, pctmNo) {
    const requestData = {
      params: {
        companyId: companyId,
        branchId: branchId,
        startDate: startDate,
        endDate: endDate,
        airlineCode: airlineCode,
        console: console,
        pctmNo: pctmNo
      }
    };
    const url = `${importnew_url}getDataforPctmPrint`;
    return axios.get(url, requestData);
  };





  getPctmNumbers(companyId, branchId, startDate, endDate, airlineCode, console) {
    const requestData = {
      params: {
        companyId: companyId,
        branchId: branchId,
        startDate: startDate,
        endDate: endDate,
        airlineCode: airlineCode,
        console: console
      }
    };
    const url = `${import_url}getpctmNumbers`;

    return axios.get(url, requestData);
  };




  getDistinctConsolesBySirDatePCTMgenerated(companyId, branchId, startDate, endDate) {
    const requestData = {
      params: {
        companyId: companyId,
        branchId: branchId,
        startDate: startDate,
        endDate: endDate
      }
    };
    return axios.get(`${import_url}getdistinctConsolesPCTMgenerated`, requestData);
  };


  getdistinctAirLinesByConsolesPCTMgenerated(companyId, branchId, startDate, endDate, console) {
    const requestData = {
      params: {
        companyId: companyId,
        branchId: branchId,
        startDate: startDate,
        endDate: endDate,
        console: console
      }
    };
    return axios.get(`${import_url}getdistinctAirLinesPCTMgenerated`, requestData);
  };





  getDataforPctm(companyId, branchId, startDate, endDate, airlineCode, console) {
    const requestData = {
      params: {
        companyId: companyId,
        branchId: branchId,
        startDate: startDate,
        endDate: endDate,
        airlineCode: airlineCode,
        console: console
      }
    };
    const url = `${importnew_url}allimportData`;

    return axios.get(url, requestData);
  };



  getDistinctConsolesBySirDate(companyId, branchId, startDate, endDate) {
    const requestData = {
      params: {
        companyId: companyId,
        branchId: branchId,
        startDate: startDate,
        endDate: endDate
      }
    };
    return axios.get(`${import_url}getdistinctConsoles`, requestData);
  };


  getdistinctAirLinesByConsoles(companyId, branchId, startDate, endDate, console) {
    const requestData = {
      params: {
        companyId: companyId,
        branchId: branchId,
        startDate: startDate,
        endDate: endDate,
        console: console
      }
    };
    return axios.get(`${import_url}getdistinctAirLines`, requestData);
  };


  // DGDC SHB
  getAllExternalPartiesByType(companyId, branchId, Type) {
    const requestData = {
      params: {
        companyId: companyId,
        branchId: branchId,
        userType: Type
      }
    };
    return axios.get(`${ExternalUser_url}getAllExternalParties`, requestData);
  };

}
export default new Rate_Chart_Service();  