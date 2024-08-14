import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/booking';

export const getBookings = async (from, to) => {
  try {
    const response = await axios.get(`${API_URL}/from/${from}/to/${to}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch bookings', error);
    throw error;
  }
};

export const bookSlot = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/book`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Failed to book slot', error);
    throw error;
  }
};

export const cancelBooking = async (bookingData) => {
  try {
    const response = await axios.put(`${API_URL}/cancel`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Failed to cancel booking', error);
    throw error;
  }
};
