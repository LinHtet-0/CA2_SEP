var express = require('express');
var showroomDB = require('../model/showroomDisplay');
var app = express();

app.get('/api/getShowroomWithHotspots', async function (req, res) {
    try {
        const name = req.query.name;

        if (!name) {
            return res.status(400).send({ message: "'name' parameter is required" });
        }

        // Fetch showroom details by name
        const showroomResult = await showroomDB.getShowRoomByName(name);

        if (showroomResult === null) {
            return res.status(404).send({ message: "Showroom not found" });
        }

        // Fetch hotspot data (including item details)
        const hotspotResult = await showroomDB.getHotspotsByShowroomName(name);

        // Check if hotspots are empty
        if (hotspotResult.length === 0) {
            return res.status(200).send({
                message: "No furniture available for this room type. Please select a different room.",
                showroom: showroomResult,
                hotspots: [] // Still return an empty array for hotspots
            });
        }

        // Combine showroom and hotspot data
        const responseData = {
            showroom: showroomResult,
            hotspots: hotspotResult
        };

        res.status(200).send(responseData);

    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send({ message: "Failed to fetch showroom and hotspot data" });
    }
});

module.exports = app;
