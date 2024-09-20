import axios from "axios";

const getServices = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/services`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

const getAppointments = async (serviceId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/appointments/${serviceId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

const bookAppointment = async (appointmentId, bookingDetails) => {
  console.log("POST", appointmentId, bookingDetails);
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/appointments/${appointmentId}`,
      bookingDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw new Error("Failed to book appointment");
  }
};

export { getServices, getAppointments, bookAppointment };
