import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/booking';

export const createBooking = async (bookingData) => {
  return await axios.post(API_BASE_URL + '/book', bookingData);
};

export const cancelBooking = async (bookingData) => {
  return await axios.put(API_BASE_URL + '/cancel', bookingData);
};

export const getBookingsBetweenDates = async (from, to) => {
  return await axios.get(API_BASE_URL + `/from/${from}/to/${to}`);
};

export const getBookingDetails = async (id) => {
  return await axios.get(API_BASE_URL + '/details/' + id);
};
