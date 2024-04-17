import React, { useContext, useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import AuthContext from "../Components/AuthProvider";
import { useNavigate } from "react-router-dom";
import dgdcimage from "../Images/DGDC.png";
import axios from "axios";
import Import_PCTM from "./Import_PCTM";
import { Col } from "react-bootstrap";
import { Row } from "reactstrap";
import { format } from "date-fns";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ipaddress from "../Components/IpAddress";

const commonTextStyle = {
  fontSize: 10,
};
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    marginBottom: 10,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 10,
  },
  tableHeaderRow: {
    flexDirection: "row",
  },
  tableHeaderCell: {
    border: "1px solid #000",
    padding: 5,
    backgroundColor: "#f2f2f2",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    border: "1px solid #000",
    padding: 5,
  },
  tableCellHeader: {
    fontWeight: "bold",
  },
  image: {
    width: 700,
    height: 140,
  },
  text: {
    marginLeft: 18,
    ...commonTextStyle,
  },
  hr: {
    width: "100%",
    borderBottom: 1,
    marginTop: 5,
  },
  leftColumn: {
    width: "100%",
    paddingTop: 18,
  },
  underline: {
    textDecoration: "underline",
  },
});

const hrStyle = {
  borderTop: "5px solid black", // Adjust the thickness and color as needed
};

const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

const PDFReport = ({ data, startDate, endDate, selectedAirline }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [importAllDatalist, setImportAllDatalist] = useState([]);
  const [importData, setImportData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const totalRows = data.length;
  const {
    jwtToken,
    user_Id,
    username,
    branchId,
    companyid,
    role,
    companyname,
    branchname,
    login,
    logout,
  } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        "/login?message=You need to be authenticated to access this page."
      );
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Fetch data from your backend API
    axios
      .get(`http://${ipaddress}import/all/${companyid}/${branchId}`)
      .then((response) => {
        // Assuming your API response is an array of Import objects
        const importDataForSelectedAirline = response.data.find(
          (item) => item.airlineName === selectedAirline
        );
  
        if (importDataForSelectedAirline) {
          // Assuming flightDate, flightNo, and pctmNo are properties of your data
          const { flightDate, flightNo, pctmNo, igmNo } = importDataForSelectedAirline;
          setImportData({ flightDate, flightNo, pctmNo, igmNo });
          console.log(importDataForSelectedAirline);
        } else {
          console.error("No data found for the selected airline.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedAirline]);
  // Calculate distinct MAWB numbers and their counts
  const calculateDistinctMAWB = (data) => {
    const distinctMAWBCounts = {};

    data.forEach((item) => {
      const mawb = item.mawb;
      if (mawb) {
        if (distinctMAWBCounts[mawb]) {
          distinctMAWBCounts[mawb] += 1;
        } else {
          distinctMAWBCounts[mawb] = 1;
        }
      }
    });

    return distinctMAWBCounts;
  };

  // Use the calculateDistinctMAWB function to get distinct MAWB numbers and counts
  const distinctMAWBCounts = calculateDistinctMAWB(data);

  // Calculate the total number of distinct MAWBs
  const totalDistinctMAWBs = Object.keys(distinctMAWBCounts).length;

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Document>
        <Page size="A4">
          <View>
            <Text>No data available for the selected criteria.</Text>
          </View>
        </Page>
      </Document>
    );
  }
  const renderTable = () => (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 54 },
          ]}
        >
          Sr.No
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 100 },
          ]}
        >
          Sir No
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 120 },
          ]}
        >
          Importer Name
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 100 },
          ]}
        >
          Origin Airport
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 140 },
          ]}
        >
          MAWB
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 140 },
          ]}
        >
          HAWB
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 54 },
          ]}
        >
          NOP
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 72 },
          ]}
        >
          Weight
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 100 },
          ]}
        >
          Desc
        </Text>
        <Text
          style={[
            styles.tableCell,
            styles.tableCellHeader,
            { fontSize: 10, width: 100 },
          ]}
        >
          Remark Delivered
        </Text>
      </View>
      {data.map((item, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={{ ...styles.tableCell, fontSize: 10, width: 54 }}>
            {index + 1}
          </Text>
          <Text style={{ ...styles.tableCell, fontSize: 10, width: 100 }}>
            {item.sir_No}
          </Text>
          <Text style={{ ...styles.tableCell, fontSize: 10, width: 120 }}>
            {item.importerId}
          </Text>
          <Text style={{ ...styles.tableCell, fontSize: 10, width: 100 }}>
            {item.portOrigin}
          </Text>
          <Text style={{ ...styles.tableCell, fontSize: 10, width: 140 }}>
            {item.mawb}
          </Text>
          <Text style={{ ...styles.tableCell, fontSize: 10, width: 140 }}>
            {item.hawb}
          </Text>
          <Text style={{ ...styles.tableCell, fontSize: 10, width: 54 }}>
            {item.nop}
          </Text>
          <Text style={{ ...styles.tableCell, fontSize: 10, width: 72 }}>
            {item.grossWeight}
          </Text>
          <Text style={{ ...styles.tableCell, fontSize: 10, width: 100 }}>
            {item.descriptionOfGoods}
          </Text>
          <Text style={{ ...styles.tableCell, fontSize: 10, width: 100 }}>
            {item.importRemarks}
          </Text>
        </View>
      ))}
    </View>
  );


  const PDFReport = ({ data, startDate, endDate, selectedAirline }) => {
    return (
      <Document>
            <Page size="A4" style={styles.page}>

              <View></View>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="text-center">
                  {/* Add an image with styles to center and adjust size */}
                  <Image
                    src={dgdcimage}
                    alt="Image Description"
                    style={styles.image}
                  />
                </div>
                <Text
                  className="text-center"
                  style={{ fontSize: 10, fontWeight: "bold" }}
                >
                  PCTM REPORT{" "}
                </Text>
                <Text className="text-center" style={{ fontSize: 10 }}>
                  DGDC SEEPZ SEZ STRONG ROOM
                </Text>
                <Text className="text-center" style={{ fontSize: 10 }}>
                  MAIL LTD-CSI AIRPORT ,AIR CARGO COMPLEX,SAHAR MUMBAI-400099
                </Text>
                <Text
                  className="text-center"
                  style={{ ...styles.underline, fontSize: 10 }}
                >
                  IMPORT - PRECIOUS CARGO TRANSFER MANIFEST
                </Text>
                <Text className="text-center" style={{ fontSize: 10 }}>
                  From Date : {formatDate(startDate)} To Date :
                  {formatDate(endDate)}
                </Text>
                <br />
                <br />
              </div>

              <View style={styles.leftColumn}>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                  REPORT DATE: {format(new Date(), "dd/MM/yyyy HH:mm")}
                </Text>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                  PCTM NO: {importData.pctmNo}
                </Text>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                  IGM NO: {importData.igmNo}
                </Text>
              </View>
              <View style={styles.hr}></View>
              <Text style={{ fontSize: 10, marginBottom: 18, marginTop: 9 }}>
                Received from{" "}
                <Text style={{ fontWeight: "bold" }}>Flight -</Text>{" "}
                {selectedAirline} on{" "}
                <Text style={{ fontWeight: "bold" }}>Flight Date & Time -</Text>{" "}
                {importData.flightNo} {formatDate(importData.flightDate)} at
                DGDC SEEPZ SEZ STRONG ROOM SAHAR in escort of
              </Text>

              {renderTable()}

              <View style={{ paddingTop: 18 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 54 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Total No. Of Packages Received: {totalRows}
                    </Text>
                  </View>
                  <View style={{ marginLeft: 27 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      By Flight No.: {importData.flightNo}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ paddingTop: 18 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 54 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Total Distinct MAWB No: {totalDistinctMAWBs}
                    </Text>
                  </View>
                  <View style={{ marginLeft: 27 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Total No. Of IGM No.:
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ paddingTop: 18 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 54 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      ESCORT AND DEPOSITED :&nbsp;&nbsp;&nbsp; {totalRows}
                    </Text>
                  </View>

                  <View style={{ marginRight: 54 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      PKGS BY FLIGHT :&nbsp;&nbsp;&nbsp; {selectedAirline}
                    </Text>
                  </View>
                  <View style={{ marginLeft: 27 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      ON.:&nbsp;&nbsp;&nbsp; {formatDate(importData.flightDate)}
                    </Text>
                  </View>
                </View>
              </View>

              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 10,
                  marginTop: 18,
                  paddingBottom: 18,
                }}
              >
                TO DGDC SEEPZ SEZ STRONG ROOM UNDER CUSTOMS PREVENTIVE
                SUPERVISION
              </Text>

              <View style={{ paddingLeft: 27 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Airline Staff Signature:{"\n"}
                      {"\n"}
                    </Text>
                  </View>

                  <View style={{ marginRight: 54, width: "50%" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      I.F.O. Signature :{"\n"}
                      {"\n"}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ paddingLeft: 27 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Name :{"\n"}
                      {"\n"}
                    </Text>
                  </View>

                  <View style={{ marginRight: 54, width: "50%" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Name :{"\n"}
                      {"\n"}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ paddingLeft: 27 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Date & time:{"\n"}
                      {"\n"}
                    </Text>
                  </View>

                  <View style={{ marginRight: 54, width: "50%" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Date & time :{"\n"}
                      {"\n"}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={{ fontWeight: "bold", fontSize: 10, paddingTop: 9 }}>
                Received above consignment in full in apparent good order and
                condition except as noted in the Remarks Column
              </Text>

              <View style={{ paddingTop: 18 }}>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{ width: "33%", borderRight: "1px solid black" }}
                  >
                    <Text style={{ fontSize: 10 }}>
                      Total No. Of Packages:{" "}
                      <Text style={{ fontWeight: "bold" }}>{totalRows}</Text>
                      {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Receiver's Signature: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Name: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Asstt Custodian DGDC Seepz Sez, Strong room sahar
                      Mumbai-99: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Date: {"\n"}
                      {"\n"}
                    </Text>
                  </View>

                  <View
                    style={{ width: "33%", borderRight: "1px solid black" }}
                  >
                    <Text style={{ fontSize: 10 }}>
                      Total No. Of Packages:{" "}
                      <Text style={{ fontWeight: "bold" }}>{totalRows}</Text>
                      {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Receiver's Signature: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Name: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Asstt Custodian DGDC Seepz Sez, Strong room sahar
                      Mumbai-99: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Date: {"\n"}
                      {"\n"}
                    </Text>
                  </View>

                  <View style={{ width: "33%" }}>
                    <Text style={{ fontSize: 10 }}>
                      Total No. Of Packages:{" "}
                      <Text style={{ fontWeight: "bold" }}>{totalRows}</Text>
                      {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Receiver's Signature: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Name: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Asstt Custodian DGDC Seepz Sez, Strong room sahar
                      Mumbai-99: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Date: {"\n"}
                      {"\n"}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.hr}></View>
            </Page>
          </Document>
    );
  };
  return (
    <div>
      <PDFDownloadLink
        document={
          <Document>
            <Page size="A4" style={styles.page}>

              <View></View>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="text-center">
                  {/* Add an image with styles to center and adjust size */}
                  <Image
                    src={dgdcimage}
                    alt="Image Description"
                    style={styles.image}
                  />
                </div>
                <Text
                  className="text-center"
                  style={{ fontSize: 10, fontWeight: "bold" }}
                >
                  PCTM REPORT{" "}
                </Text>
                <Text className="text-center" style={{ fontSize: 10 }}>
                  DGDC SEEPZ SEZ STRONG ROOM
                </Text>
                <Text className="text-center" style={{ fontSize: 10 }}>
                  MAIL LTD-CSI AIRPORT ,AIR CARGO COMPLEX,SAHAR MUMBAI-400099
                </Text>
                <Text
                  className="text-center"
                  style={{ ...styles.underline, fontSize: 10 }}
                >
                  IMPORT - PRECIOUS CARGO TRANSFER MANIFEST
                </Text>
                <Text className="text-center" style={{ fontSize: 10 }}>
                  From Date : {formatDate(startDate)} To Date :
                  {formatDate(endDate)}
                </Text>
                <br />
                <br />
              </div>

              <View style={styles.leftColumn}>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                  REPORT DATE: {format(new Date(), "dd/MM/yyyy HH:mm")}
                </Text>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                  PCTM NO: {importData.pctmNo}
                </Text>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                  IGM NO: {importData.igmNo}
                </Text>
              </View>
              <View style={styles.hr}></View>
              <Text style={{ fontSize: 10, marginBottom: 18, marginTop: 9 }}>
                Received from{" "}
                <Text style={{ fontWeight: "bold" }}>Flight -</Text>{" "}
                {selectedAirline} on{" "}
                <Text style={{ fontWeight: "bold" }}>Flight Date & Time -</Text>{" "}
                {importData.flightNo} {formatDate(importData.flightDate)} at
                DGDC SEEPZ SEZ STRONG ROOM SAHAR in escort of
              </Text>

              {renderTable()}

              <View style={{ paddingTop: 18 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 54 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Total No. Of Packages Received: {totalRows}
                    </Text>
                  </View>
                  <View style={{ marginLeft: 27 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      By Flight No.: {importData.flightNo}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ paddingTop: 18 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 54 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Total Distinct MAWB No: {totalDistinctMAWBs}
                    </Text>
                  </View>
                  <View style={{ marginLeft: 27 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Total No. Of IGM No.:
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ paddingTop: 18 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 54 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      ESCORT AND DEPOSITED :&nbsp;&nbsp;&nbsp; {totalRows}
                    </Text>
                  </View>

                  <View style={{ marginRight: 54 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      PKGS BY FLIGHT :&nbsp;&nbsp;&nbsp; {selectedAirline}
                    </Text>
                  </View>
                  <View style={{ marginLeft: 27 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      ON.:&nbsp;&nbsp;&nbsp; {formatDate(importData.flightDate)}
                    </Text>
                  </View>
                </View>
              </View>

              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 10,
                  marginTop: 18,
                  paddingBottom: 18,
                }}
              >
                TO DGDC SEEPZ SEZ STRONG ROOM UNDER CUSTOMS PREVENTIVE
                SUPERVISION
              </Text>

              <View style={{ paddingLeft: 27 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Airline Staff Signature:{"\n"}
                      {"\n"}
                    </Text>
                  </View>

                  <View style={{ marginRight: 54, width: "50%" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      I.F.O. Signature :{"\n"}
                      {"\n"}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ paddingLeft: 27 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Name :{"\n"}
                      {"\n"}
                    </Text>
                  </View>

                  <View style={{ marginRight: 54, width: "50%" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Name :{"\n"}
                      {"\n"}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ paddingLeft: 27 }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Date & time:{"\n"}
                      {"\n"}
                    </Text>
                  </View>

                  <View style={{ marginRight: 54, width: "50%" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      Date & time :{"\n"}
                      {"\n"}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={{ fontWeight: "bold", fontSize: 10, paddingTop: 9 }}>
                Received above consignment in full in apparent good order and
                condition except as noted in the Remarks Column
              </Text>

              <View style={{ paddingTop: 18 }}>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{ width: "33%", borderRight: "1px solid black" }}
                  >
                    <Text style={{ fontSize: 10 }}>
                      Total No. Of Packages:{" "}
                      <Text style={{ fontWeight: "bold" }}>{totalRows}</Text>
                      {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Receiver's Signature: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Name: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Asstt Custodian DGDC Seepz Sez, Strong room sahar
                      Mumbai-99: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Date: {"\n"}
                      {"\n"}
                    </Text>
                  </View>

                  <View
                    style={{ width: "33%", borderRight: "1px solid black" }}
                  >
                    <Text style={{ fontSize: 10 }}>
                      Total No. Of Packages:{" "}
                      <Text style={{ fontWeight: "bold" }}>{totalRows}</Text>
                      {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Receiver's Signature: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Name: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Asstt Custodian DGDC Seepz Sez, Strong room sahar
                      Mumbai-99: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Date: {"\n"}
                      {"\n"}
                    </Text>
                  </View>

                  <View style={{ width: "33%" }}>
                    <Text style={{ fontSize: 10 }}>
                      Total No. Of Packages:{" "}
                      <Text style={{ fontWeight: "bold" }}>{totalRows}</Text>
                      {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Receiver's Signature: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Name: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Asstt Custodian DGDC Seepz Sez, Strong room sahar
                      Mumbai-99: {"\n"}
                      {"\n"}
                    </Text>
                    <Text style={{ fontSize: 10 }}>
                      Date: {"\n"}
                      {"\n"}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.hr}></View>
            </Page>
          </Document>
        }
        fileName="PCTM_Report.pdf" // Specify the file name
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..." // Display loading message
          ) : (
            <button
              style={{ margin: "10px", padding: "10px" }}
              className="btn btn-primary"
              disabled={loading}
            >
              Download PDF
            </button>
          )
        }
        </PDFDownloadLink>

      {/* {/* <Document>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="text-center">
            {/* Add an image with styles to center and adjust size */}
            {/* <img
              src={dgdcimage}
              alt="Image Description"
              style={{
                width: "990px", // Adjust the width as needed
                height: "auto", // Maintain aspect ratio
                display: "block", // Center horizontally
                margin: "0 auto",
              }}
            />
          </div> */}
          {/* <h4 className="text-center">PCTM REPORT</h4>
          <p className="text-center" style={{ fontWeight: "bold" }}>
            DGDC SEEPZ SEZ STRONG ROOM
          </p>
          <p className="text-center" style={{ fontWeight: "bold" }}>
            MAIL LTD-CSI AIRPORT ,AIR CARGO COMPLEX,SAHAR MUMBAI-400099
          </p>
          <p className="text-center" style={{ fontWeight: "bold" }}>
            <u>IMPORT - PRECIOUS CARGO TRANSFER MANIFEST</u>
          </p>
          <p className="text-center" style={{ fontWeight: "bold" }}>
            From Date : {formatDate(startDate)} To Date :{formatDate(endDate)}
          </p>
        </div>

        <Page size="A4" style={styles.page}> */}
          {/* <View style={styles.header}>
            <p>
              <Text>REPORT DATE: {format(new Date(), "dd/MM/yyyy HH:mm")}</Text>
              <br />
              <Text>PCTM NO: {importData.pctmNo}</Text>
              <br />
              <Text>IGM NO: {importData.igmNo}</Text>
              <br />
            </p>
            <hr style={hrStyle} />
            <p>
              Received from <span style={{ fontWeight: "bold" }}>Flight -</span>{" "}
              {selectedAirline} on
              <span style={{ fontWeight: "bold" }}>
                {" "}
                Flight Date & Time -
              </span>{" "}
              {importData.flightNo} {formatDate(importData.flightDate)} at DGDC
              SEEPZ SEZ STRONG ROOM SAHAR in escort of
            </p>
          </View>
          <View>
            <View>
              <table style={styles.table}>
                <thead style={styles.tableHeader}>
                  <tr>
                    <th style={styles.tableCell}>Sr.No</th>

                    <th style={styles.tableCell}>Sir No</th>
                    <th style={styles.tableCell}>Importer Name</th>
                    <th style={styles.tableCell}>Origin Airport</th>
                    <th style={styles.tableCell}>MAWB</th>
                    <th style={styles.tableCell}>HAWB</th>
                    <th style={styles.tableCell}>NOP</th>
                    <th style={styles.tableCell}>Weight</th>
                    <th style={styles.tableCell}>Desc</th>
                    <th style={styles.tableCell}>Remark Delivered</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td style={styles.tableCell}>{index + 1}</td>
                      <td style={styles.tableCell}>{item.sir_No}</td>
                      <td style={styles.tableCell}>{item.importerId}</td>
                      <td style={styles.tableCell}>{item.portOrigin}</td>
                      <td style={styles.tableCell}>{item.mawb}</td>
                      <td style={styles.tableCell}>{item.hawb}</td>
                      <td style={styles.tableCell}>{item.nop}</td>
                      <td style={styles.tableCell}>{item.grossWeight}</td>

                      <td style={styles.tableCell}>
                        {item.descriptionOfGoods}
                      </td>

                      <td style={styles.tableCell}>{item.importRemarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </View>
            <Row style={{ paddingTop: 18 }}>
              <Col md={2}></Col>
              <Col>
                <p style={{ fontWeight: "bold" }}>
                  Total No. Of Packages Received:&nbsp;&nbsp;&nbsp; {totalRows}
                </p>
              </Col>
              <Col>
                <p style={{ fontWeight: "bold" }}>
                  By Flight No.:&nbsp;&nbsp;&nbsp; {importData.flightNo}
                </p>
              </Col>
            </Row>

            <Row style={{ paddingTop: 18 }}>
              <Col md={2}></Col>
              <Col>
                <p style={{ fontWeight: "bold" }}>
                  Total Distinct MAWB No:&nbsp;&nbsp;&nbsp; {totalDistinctMAWBs}
                </p>
              </Col>
              <Col>
                <p style={{ fontWeight: "bold" }}>
                  Total No. Of IGM No.:&nbsp;&nbsp;&nbsp; {}
                </p>
              </Col>
            </Row> */}

            {/* <Row style={{ paddingTop: 18 }}>
              <Col md={4}>
                <p style={{ fontWeight: "bold" }}>
                  ESCORT AND DEPOSITED :&nbsp;&nbsp;&nbsp; {totalRows}
                </p>
              </Col>
              <Col md={4}>
                <p style={{ fontWeight: "bold" }}>
                  PKGS BY FLIGHT :&nbsp;&nbsp;&nbsp; {selectedAirline}
                </p>
              </Col>
              <Col md={4}>
                <p style={{ fontWeight: "bold" }}>
                  ON.:&nbsp;&nbsp;&nbsp; {formatDate(importData.flightDate)}
                </p>
              </Col>
            </Row>
            <p style={{ fontWeight: "bold" }}>
              TO DGDC SEEPZ SEZ STRONG ROOM UNDER CUSTOMS PREVENTIVE SUPERVISION
            </p>

            <Row style={{ paddingTop: 18 }}>
              <Col md={6}>
                <p>Airline Staff Signature:&nbsp;&nbsp;&nbsp;</p>
              </Col>
              <Col md={6}>
                <p>I.F.O. Signature :&nbsp;&nbsp;&nbsp;</p>
              </Col>
            </Row>
            <Row style={{ paddingTop: 18 }}>
              <Col md={6}>
                <p>Name:&nbsp;&nbsp;&nbsp;</p>
              </Col>
              <Col md={6}>
                <p>Name :&nbsp;&nbsp;&nbsp;</p>
              </Col>
            </Row>
            <Row style={{ paddingTop: 18 }}>
              <Col md={6}>
                <p>Date & time:&nbsp;&nbsp;&nbsp;</p>
              </Col>
              <Col md={6}>
                <p>Date & time :&nbsp;&nbsp;&nbsp;</p>
              </Col>
            </Row>

            <p style={{ fontWeight: "bold" }}>
              Received above consignment in full in apparent good order and
              condition except as noted in the Remarks Column
            </p>

            <Row style={{ paddingTop: 18 }}>
              <Col md={4} style={{ borderRight: "1px solid black" }}>
                <p>
                  Total No. Of Packages:{" "}
                  <span style={{ fontWeight: "bold" }}>{totalRows}</span>
                </p>
                <p>Receivers Signature</p>
                <p>Name:</p>
                <p>
                  Asstt Custodian DGDC Seepz Sez,Strong room sahar Mumbai-99:
                </p>
                <p>Date:</p>
              </Col>

              <Col md={4} style={{ borderRight: "1px solid black" }}>
                <p>
                  Total No. Of Packages:{" "}
                  <span style={{ fontWeight: "bold" }}>{totalRows}</span>
                </p>
                <p>Receivers Signature</p>
                <p>Name:</p>
                <p>
                  Asstt Custodian DGDC Seepz Sez,Strong room sahar Mumbai-99:
                </p>
                <p>Date:</p>
              </Col>
              <Col md={4}>
                <p>
                  Total No. Of Packages:{" "}
                  <span style={{ fontWeight: "bold" }}>{totalRows}</span>
                </p>
                <p>Receivers Signature</p>
                <p>Name:</p>
                <p>
                  Asstt Custodian DGDC Seepz Sez,Strong room sahar Mumbai-99:
                </p>
                <p>Date:</p>
              </Col>
            </Row>
            <hr style={hrStyle} />
          </View>
        </Page>
      </Document> */} 
    </div>
  );
};

export default PDFReport;