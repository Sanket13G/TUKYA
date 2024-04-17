import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Button, CardBody, Modal, Table } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";

export default function ShowExport() {
  const location = useLocation();
  const ExList = location.state.selectedItem;

  const isExListNotEmpty = ExList && ExList.length > 0;

  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate(); // Get access to the navigate function
  const { state } = useLocation();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);

    // If the modal is being closed, navigate back to the previous page
    if (!isModalOpen) {
      if (state && state.from) {
        navigate(state.from);
      } else {
        navigate(-1); // Navigate back one step if 'state.from' is not available
      }
    }
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        contentLabel="Selected Items Modal"
        ariaHideApp={false}
        // onHide={handleClose}
        size="lg"
        style={{
          marginTop: "10%",
          marginRight: "12%",
          marginLeft: "15%",
          maxWidth: "90%", //% Adjust this value to your desired width
        }}
      >
        <Card>
          <CardBody>
            <h4 className="text-left">History</h4>
            <hr />
            <div className="table-responsive">
              <Table className="table table-bordered custom-table table table-striped table-hover">
                <thead style={{ backgroundColor: "rgb(226 232 240)" }}>
                  <tr className="text-center">
                    <th scope="col">#</th>
                    <th scope="col">Request ID</th>
                    <th scope="col">SB No.</th>
                    <th scope="col">SER No</th>
                    <th scope="col">New Status</th>
                    <th scope="col">Old Status</th>
                    <th scope="col">Transport Date</th>

                    <th scope="col">remark</th>
                  </tr>
                </thead>

                <tbody>
                  {ExList.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td>{index + 1}</td>
                      <td>{item.sbRequestId}</td>
                      <td>{item.sbNo}</td>
                      <td>{item.serNo}</td>
                      <td>{item.newStatus}</td>
                      <td>{item.oldStatus}</td>
                      <td>
                        {new Date(item.transport_Date).toLocaleDateString(
                          "en-US",
                          { day: "2-digit", month: "2-digit", year: "numeric" }
                        )}
                      </td>

                      <td>{item.remark}</td>
                    </tr>
                  ))}
                </tbody>

                {/* "Select All" checkbox in the table header */}
              </Table>
            </div>
          </CardBody>
        </Card>
        <div className="text-center">
          <Button
            outline
            type="button"
            color="danger"
            style={{
              marginRight: "20px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
            onClick={() => navigate("/parent/export")}
          >
            <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: "5px" }} />
            CLEAR
          </Button>
        </div>{" "}
      </Modal>{" "}
    </div>
  );
}