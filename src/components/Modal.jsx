import React from 'react';
import './Modal.css'; // Make sure to create this CSS file for styling

function Modal({ isOpen, onClose, data }) {
    if (!isOpen) return null;

    // Create formatted text from the data
    const formattedText = Object.entries(data).map(([lot, count]) =>
        `Lot ${lot}: ${count} cars parked`).join('\n');

    // Function to copy text to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(formattedText).then(() => {
            alert('Copied to clipboard!');
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <p>Please copy the following information:</p>
                <textarea value={formattedText} readOnly rows="5" cols="33" />
                <button onClick={copyToClipboard}>Copy to Clipboard</button>
            </div>
        </div>
    );
}

export default Modal;
