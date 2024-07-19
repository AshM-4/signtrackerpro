import React, { useState } from 'react';
import './Sidebar.css';
import UploadImage from './UploadImage';

const Sidebar = ({ isOpen, close, event }) => {
    const [showUpload, setShowUpload] = useState({ type: '', documentType: '', visible: false });
    console.log("Event: ", event)

    const handleShowUpload = (type, documentType) => {
        setShowUpload({ type, documentType, visible: !showUpload.visible });
    };

    if (!event) return null;

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={close}>X</button>
            <h2>{event.eventNumber}</h2>
            <p>{event.description}</p>

            <button onClick={() => handleShowUpload('maps', 'mapImages')}>
                {showUpload.type === 'maps' && showUpload.visible ? 'Hide Upload' : 'Upload Map Image'}
            </button>

            <button onClick={() => handleShowUpload('signs', 'signImages')}>
                {showUpload.type === 'signs' && showUpload.visible ? 'Hide Upload' : 'Upload Sign Image'}
            </button>

            {showUpload.visible && <UploadImage lotId={`lot${event.lotNumber}`} docId={event.lotId} eventNumber={event.eventNumber} imageType={showUpload.type} docType={showUpload.documentType} />}

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
