import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure this CSS is correctly imported
import './MapComponent.css'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { db } from './firebaseConfig.js'
import { collection, getDocs } from 'firebase/firestore';
import { format, isToday, isWithinInterval, parseISO } from 'date-fns';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Sidebar from './Sidebar';

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetina,
    iconUrl: icon,
    shadowUrl: iconShadow
});

const createCustomIcon = (content) => {
    return L.divIcon({
        html: `<div style="background-color: white; color: black; font-size: 12px; padding: 4px 6px; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border: 1px solid black;">${content}</div>`,
        className: '', // Avoid default Leaflet class for styles
        iconAnchor: [10, 10], // Center the icon over the position
        iconSize: [20, 20]  // Smaller icon size to avoid overlapping if close
    });
};

const MapComponent = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/surveying'); // Use navigate instead of history.push
    };

    const [lots, setLots] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchLots = async () => {
            const querySnapshot = await getDocs(collection(db, "lots"));
            const fetchedLots = [];
            querySnapshot.forEach((doc) => {
                const lotData = doc.data();
                const lotNumber = lotData.number;
                const eventsWithLotNumber = lotData.events.map(event => ({ ...event, lotNumber }));
                fetchedLots.push({ id: doc.id, ...lotData, events: eventsWithLotNumber });
                // console.log('Document ID:', doc.id);
            });
            setLots(fetchedLots);
        };

        fetchLots();
    }, []);

    const renderEventsForDate = (events, filterFn) => (
        events.filter(filterFn).map((event, index) => (
            <div key={index}>
                <h4>Event #{event.eventNumber}</h4>
                <p>Number of Signs: {event.signsCount}</p>
                <p>Posted Date: {event.postedDate}</p>
                <p>Pickup Date: {event.pickupDate}</p>
            </div>
        ))
    );

    const filterEvents = (events, filterFn) => {
        return events.filter(filterFn);
    };

    const openSidebar = (event) => {
        setSelectedEvent(event);
        // const selected = { event };
        // console.log('Selected Event:', selected);
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
        setSelectedEvent(null);
    };

    const markers = [
        { id: 1, lat: 36.991, lng: -122.053, text: "Marker 1", number: 104 },
        { id: 2, lat: 36.99523900591509, lng: -122.05726689840037, text: "Marker 2", number: 101 },
        // Add more markers as needed
    ];

    return (
        <div style={{ height: '100vh' }}>
            <MapContainer center={[36.98934388200421, -122.05906427090882]} zoom={15} style={{ height: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {lots.map(lot => (
                    <Marker
                        key={lot.id}
                        position={[lot.lat, lot.lng]}
                        icon={createCustomIcon(lot.number)}
                    >
                        <Popup>
                            <Tabs>
                                <TabList>
                                    <Tab>Posting ({lot.events.filter(event => isToday(parseISO(event.postedDate))).length})</Tab>
                                    <Tab>Pickup ({lot.events.filter(event => isToday(parseISO(event.pickupDate))).length})</Tab>
                                    <Tab>Ongoing ({lot.events.filter(event => isWithinInterval(new Date(), { start: parseISO(event.postedDate), end: parseISO(event.pickupDate) })).length})</Tab>
                                </TabList>

                                <TabPanel>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Event Number</th>
                                                <th>Signs Count</th>
                                                <th>Posted Date</th>
                                                <th>Pickup Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {lot.events.filter(event => isToday(parseISO(event.postedDate))).map((event, index) => (
                                                <tr key={index}>
                                                    <td>{event.eventNumber}</td>
                                                    <td>{event.signsCount}</td>
                                                    <td>{event.postedDate}</td>
                                                    <td>{event.pickupDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </TabPanel>
                                <TabPanel>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Event Number</th>
                                                <th>Signs Count</th>
                                                <th>Posted Date</th>
                                                <th>Pickup Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {lot.events.filter(event => isToday(parseISO(event.pickupDate))).map((event, index) => (
                                                <tr key={index} onClick={() => openSidebar({ ...event, lotId: lot.id })}>
                                                    <td>{event.eventNumber}</td>
                                                    <td>{event.signsCount}</td>
                                                    <td>{event.postedDate}</td>
                                                    <td>{event.pickupDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </TabPanel>
                                <TabPanel>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Event Number</th>
                                                <th>Signs Count</th>
                                                <th>Posted Date</th>
                                                <th>Pickup Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {lot.events.filter(event => isWithinInterval(new Date(), { start: parseISO(event.postedDate), end: parseISO(event.pickupDate) })).map((event, index) => (
                                                <tr key={index}>
                                                    <td>{event.eventNumber}</td>
                                                    <td>{event.signsCount}</td>
                                                    <td>{event.postedDate}</td>
                                                    <td>{event.pickupDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </TabPanel>
                            </Tabs>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <Sidebar isOpen={sidebarOpen} close={closeSidebar} event={selectedEvent} />
            <button onClick={handleButtonClick} style={{ position: 'absolute', top: '70px', left: '10px', zIndex: 1000, }}>
                Surveying
            </button>
        </div>
    );
};

export default MapComponent;

