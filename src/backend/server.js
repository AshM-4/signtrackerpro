// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());  // For parsing application/json

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/parkingLotEvents', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.log("MongoDB connection error:", err));

// Define Schemas and Models
const EventSchema = new mongoose.Schema({
    eventNumber: String,
    signsCount: Number,
    postedDate: String,
    pickupDate: String
});

const LotSchema = new mongoose.Schema({
    lat: Number,
    lng: Number,
    events: [EventSchema]
});

const Lot = mongoose.model('Lot', LotSchema);

// Define routes
app.get('/lots', async (req, res) => {
    try {
        const lots = await Lot.find();
        res.json(lots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/lots', async (req, res) => {
    const lot = new Lot({
        lat: req.body.lat,
        lng: req.body.lng,
        events: req.body.events
    });

    try {
        const newLot = await lot.save();
        res.status(201).json(newLot);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));