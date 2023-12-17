const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Mock data (we can replace this with actual API calls)
const alerts = [
    {
        "id": "6049dbd2-45bc-4e34-9ea2-c82ced0279f1",
        "alert_type": "Unsafe driving",
        "vehicle_id": "cc70a7e5-8397-4914-bbbb-4d6bb521ec67",
        "driver_friendly_name": "Ramesh",
        "vehicle_friendly_name": "KA12A3456",
        "timestamp": "2023-03-01T04:25:45.424Z"
    },
    {
        "id": "5149dbd2-45bc-4e34-9ea2-c82ced0279f1",
        "alert_type": "Distracted driver",
        "vehicle_id": "dd70a7e5-8397-4914-bbbb-4d6bb521ec67",
        "driver_friendly_name": "Suresh",
        "vehicle_friendly_name": "MH12A3456",
        "timestamp": "2023-03-01T04:24:45.424Z"
    },
];




const searchByDateRange = () => {
    const startDate = document.getElementById('startDateInput').value;
    const endDate = document.getElementById('endDateInput').value;

    const filtered = alerts.filter(alert =>
        isDateInRange(alert.timestamp, startDate, endDate) &&
        (alert.driver_friendly_name.toLowerCase().includes(searchTerm) ||
        alert.vehicle_id.toLowerCase().includes(searchTerm) ||
        alert.alert_type.toLowerCase().includes(searchTerm))
    );

    setFilteredAlerts(filtered);
};

const isDateInRange = (date, startDate, endDate) => {
   
    const alertDate = new Date(date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (!start || alertDate >= start) && (!end || alertDate <= end);
};


app.get('/', (req, res) => {
    res.render('index', { alerts });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
