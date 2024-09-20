import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { getAppointments, bookAppointment } from "utils/services";
import "./ExpandableCard.css";

function ExpandableCard({ title, icon, serviceId, serviceDuration }) {
  const [selectedApptID, setSelectedApptID] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    email: "",
    name: "",
    make: "",
    model: "",
    modelYear: "",
  });

  const [activeKey, setActiveKey] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const optionsDate = { weekday: "long", month: "short", day: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };

  const handleTimeChange = (event) => {
    setSelectedApptID(event.target.value);
  };

  const fetchAppointments = async () => {
    const appts = await getAppointments(serviceId);
    const sortedAppointments = appts.sort(
      (a, b) => new Date(a.apptStartTime) - new Date(b.apptStartTime)
    );
    setAppointments(sortedAppointments);
  };

  const handleBooking = async () => {
    if (!selectedApptID) return;

    try {
      const postData = {
        email: bookingDetails.email,
        name: bookingDetails.name,
        make: bookingDetails.make,
        model: bookingDetails.model,
        modelYear: bookingDetails.modelYear,
      };

      const response = await bookAppointment(selectedApptID, postData);
      console.log("Booking confirmed:", response);
      alert("Booking confirmed!");

      // Resetta lo stato per chiudere tutte le card e deselezionare il radio button
      setSelectedApptID(null);
      setActiveKey(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAccordionToggle = (eventKey) => {
    // verifica se la card è gia aperta ed in caso la chiude se viene cliccato l'accordion, o viceversa
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  return (
    <>
      <Accordion
        className="expandable-card"
        activeKey={activeKey}
        onSelect={fetchAppointments}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={() => handleAccordionToggle("0")}>
            <div className="card-header">
              {icon}
              <span className="card-title">{title}</span>
            </div>
          </Accordion.Header>
          <Accordion.Body className="card-body">
            <p className="appointments-title">Available Appointments:</p>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <div key={index} className="appointments-list">
                  <label>
                    <input
                      type="radio"
                      name="appointment"
                      value={appointment.id}
                      checked={selectedApptID === appointment.id}
                      onChange={handleTimeChange}
                      style={{ marginRight: "8px" }}
                    />
                    {new Date(appointment.apptStartTime).toLocaleDateString(
                      "en-US",
                      optionsDate
                    )}{" "}
                    -{" "}
                    {new Date(appointment.apptStartTime).toLocaleTimeString(
                      "en-US",
                      optionsTime
                    )}{" "}
                    - {serviceDuration / 60} mins
                  </label>
                </div>
              ))
            ) : (
              <p>No available appointments</p>
            )}
            <Button
              className="book-now-button"
              variant="primary"
              disabled={!selectedApptID}
              onClick={() => setShowModal(true)}
            >
              Book Now
            </Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail" className="formGroup">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={bookingDetails.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group controlId="formName" className="formGroup">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={bookingDetails.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group controlId="formMake" className="formGroup">
              <Form.Label>Vehicle Make</Form.Label>
              <Form.Control
                type="text"
                name="make"
                value={bookingDetails.make}
                onChange={handleInputChange}
                placeholder="Enter vehicle make"
              />
            </Form.Group>

            <Form.Group controlId="formModel" className="formGroup">
              <Form.Label>Vehicle Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={bookingDetails.model}
                onChange={handleInputChange}
                placeholder="Enter vehicle model"
              />
            </Form.Group>

            <Form.Group controlId="formModelYear" className="formGroup">
              <Form.Label>Vehicle Model Year</Form.Label>
              <Form.Control
                type="text"
                name="modelYear"
                value={bookingDetails.modelYear}
                onChange={handleInputChange}
                placeholder="Enter vehicle model year"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBooking}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ExpandableCard;
