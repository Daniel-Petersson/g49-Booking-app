import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import BookingList from './components/BookingList';
import BookingForm from './components/BookingForm';
import CancelBookingForm from './components/CancelBookingForm';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<BookingList />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/book" element={<BookingForm />} />
          <Route path="/cancel" element={<CancelBookingForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
