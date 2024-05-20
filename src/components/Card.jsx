import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';  // Make sure the path is correct

function Card({ color }) {
  const navigate = useNavigate();
  const navigateToForm = () => {
    navigate(`/surveyingform`);
  };

  // Convert color names to RGBA for low opacity
  const colorMap = {
    blue: 'rgba(41, 128, 185, 0.7)',
    green: 'rgba(39, 174, 96, 0.7)',
    red: 'rgba(231, 76, 60, 0.7)',
    purple: 'rgba(142, 68, 173, 0.7)',
    yellow: 'rgba(241, 196, 15, 0.7)'
  };

  return (
    <div className="card" style={{ backgroundColor: colorMap[color] }} onClick={navigateToForm}>
    </div>
  );
}

export default Card;
