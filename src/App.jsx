import React from 'react';
import "./App.css"
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MapComponent from './components/MapComponent';
// import SurveyForm from './components/SurveyForm';
import { MapContainer, TileLayer } from 'react-leaflet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SurveyingPage from './components/SurveyingPage';
import 'leaflet/dist/leaflet.css';
import SurveyForm from './components/SurveyForm';
import Card from "./components/Card.jsx"

const App = () => {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];

  const SurveyPage = () => (
    <div>
      <h1>Schedule</h1>
      {colors.map(color => (
        <Card key={color} color={color} />
      ))}
    </div>
  );

  return (
      <Router>
          <Routes>
              <Route path="/" element={<MapComponent />} />
              <Route path="/surveying" element={<SurveyPage />} />
              <Route path="/surveyingform" element={<SurveyForm />} />
          </Routes>
      </Router>
  );
};

export default App;