import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, close, event }) => {
    if (!event) return null;

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={close}>X</button>
            <h2>{event.eventNumber}</h2>
            <p>{event.description}</p>
            
            <h3>Map Images</h3>
            <div className="image-grid">
                {event.mapImages && event.mapImages.map((url, index) => (
                    <img key={index} src={url} alt={`Map ${index + 1}`} />
                ))}
            </div>

            <h3>Sign Images</h3>
            <div className="image-grid">
                {event.signImages && event.signImages.map((url, index) => (
                    <img key={index} src={url} alt={`Sign ${index + 1}`} />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

