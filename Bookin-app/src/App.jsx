import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BookingList from "./pages/BookingList";
import BookingForm from "./pages/BookingForm";
import CancelBookingForm from "./pages/CancelBookingForm";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<BookingList />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/cancel" element={<CancelBookingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
