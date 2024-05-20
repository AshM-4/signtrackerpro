// SurveyForm.jsx

// import React, { useState } from 'react';

// const SurveyForm = () => {
//   const [selectedParkingLot, setSelectedParkingLot] = useState(null);
//   const [numberOfCars, setNumberOfCars] = useState('');

//   const handleParkingLotSelect = (parkingLot) => {
//     setSelectedParkingLot(parkingLot);
//   };

//   const handleNumberOfCarsChange = (event) => {
//     setNumberOfCars(event.target.value);
//   };

//   const handleSubmit = () => {
//     // Submit survey data (e.g., selectedParkingLot, numberOfCars) to backend
//     // You can use Axios or Fetch API to make a POST request to your backend endpoint
//     console.log('Survey data submitted:', { selectedParkingLot, numberOfCars });
//     // Reset form after submission
//     setSelectedParkingLot(null);
//     setNumberOfCars('');
//   };

//   return (
//     <div>
//       <h2>Survey Form</h2>
//       <select value={selectedParkingLot} onChange={(e) => handleParkingLotSelect(e.target.value)}>
//         <option value="">Select Parking Lot</option>
//         {/* Render options dynamically based on parking lots */}
//         {/* Example: <option value="parkingLot1">Parking Lot 1</option> */}
//       </select>
//       <input
//         type="number"
//         placeholder="Number of cars"
//         value={numberOfCars}
//         onChange={handleNumberOfCarsChange}
//       />
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default SurveyForm;

import React, { useState } from 'react';
import Modal from './Modal'; // Make sure this import path is correct
import "./SurveyForm.css"
import { useNavigate } from 'react-router-dom';

function SurveyForm() {
    const navigate = useNavigate();
    function handleClick() {
      navigate('/');
    }

    const parkingLots = [101, 102, 103, 104, 105, 128];
    const [carCounts, setCarCounts] = useState(() => {
        const initialCounts = {};
        parkingLots.forEach(lot => {
            initialCounts[lot] = ''; // Initialize with empty strings
        });
        return initialCounts;
    });
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (lotNumber, value) => {
        setCarCounts(prevCounts => ({
            ...prevCounts,
            [lotNumber]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
      <div className='survey-background'>
        <div className="form-container">
          <button onClick={handleClick} style={{ display: 'block', marginLeft: '10px', marginBottom: '10px', textAlign: 'center', height: '30px', lineHeight: '10px' }}>Home</button>
            <form onSubmit={handleSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Parking Lot Number</th>
                            <th>Number of Cars Parked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parkingLots.map(lot => (
                            <tr key={lot}>
                                <td>{lot}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={carCounts[lot]}
                                        onChange={(e) => handleInputChange(lot, e.target.value)}
                                        min="0"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="submit">Submit</button>
            </form>
            <Modal isOpen={showModal} onClose={handleCloseModal} data={carCounts} />
        </div>
      </div>
    );
}

export default SurveyForm;