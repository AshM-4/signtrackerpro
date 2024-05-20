import React from 'react';
import './Sidebar.css'

const Sidebar = ({ isOpen, close, event }) => {
    if (!isOpen) return null;

    return (
        <div className="sidebar" style={{ width: isOpen ? '250px' : '0', padding: isOpen ? '20px' : '0' }}>
            <h2>Event Details</h2>
            <button onClick={close}>Close</button>
            <p><strong>Event Number:</strong> {event.eventNumber}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Signs Count:</strong> {event.signsCount}</p>
            <p><strong>Posted Date:</strong> {event.postedDate}</p>
            <p><strong>Pickup Date:</strong> {event.pickupDate}</p>
        </div>
    );
};

export default Sidebar;
