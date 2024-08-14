import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Booking App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bookings">Bookings</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book">Book a Slot</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cancel">Cancel Booking</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
