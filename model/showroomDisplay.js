const db = require('./databaseConfig.js');
var Showrooms = require('./showroom.js');

const showroomDB = {
    // Function to get showroom data by name
    getShowRoomByName: function (showroomName) {
        return new Promise((resolve, reject) => {
            const conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.error("Database connection error:", err);
                    conn.end();
                    return reject(err);
                }

                const sql = 'SELECT id, name, description, image_url FROM showrooms WHERE name = ?';
                conn.query(sql, [showroomName], function (err, result) {
                    if (err) {
                        console.error("Error in query:", err);
                        conn.end();
                        return reject(err);
                    }

                    if (result.length > 0) {
                        const showroom = new Showrooms();
                        showroom.id = result[0].id;
                        showroom.name = result[0].name;
                        showroom.description = result[0].description;
                        showroom.image_url = result[0].image_url;
                        conn.end();
                        return resolve(showroom);
                    } else {
                        conn.end();
                        return resolve(null); // Showroom not found
                    }
                });
            });
        });
    },

    // Function to get hotspots (with item details, price, and dimensions) by showroom name
    getHotspotsByShowroomName: function (showroomName) {
        return new Promise((resolve, reject) => {
            const conn = db.getConnection();
            conn.connect(function (err) {
                if (err) {
                    console.error("Database connection error:", err);
                    conn.end();
                    return reject(err);
                }

                const query = `
                    SELECT 
                        itementity.HOTSPOT_X, 
                        itementity.HOTSPOT_Y, 
                        itementity.HOTSPOT_TITLE, 
                        itementity.HOTSPOT_LINK,
                        itementity.ID as ITEM_ID, 
                        itementity.SKU, 
                        itementity.CATEGORY, 
                        itementity.DESCRIPTION as ITEM_DESCRIPTION, 
                        itementity.NAME as ITEM_NAME, 
                        itementity.TYPE, 
                        itementity.HEIGHT, 
                        itementity.WIDTH, 
                        itementity._LENGTH,
                        ic.RETAILPRICE as PRICE
                    FROM itementity
                    INNER JOIN showrooms ON itementity.SHOWROOM_ID = showrooms.id
                    LEFT JOIN item_countryentity ic ON itementity.ID = ic.ITEM_ID
                    WHERE showrooms.name = ? AND ic.COUNTRY_ID = 25
                `;

                conn.query(query, [showroomName], (error, results) => {
                    if (error) {
                        console.error("Error fetching data:", error);
                        conn.end();
                        return reject(error);
                    }

                    conn.end();
                    return resolve(results.length > 0 ? results : []); // Return empty array if no results
                });
            });
        });
    }
};

module.exports = showroomDB;
