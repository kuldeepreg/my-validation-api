const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Aapki keys ki list
const ALL_VALID_KEYS = [
    "KULDEEP123", 
    "VIPACCESS", 
    "PREMIUM999", 
    "TESTKEY55",
    "HELLO" //
];

app.get('/validate', (req, res) => {
    const { key, dev_id } = req.query;

    // 🔥 YEH LINE LOGS ME USER KI KEY AUR DEVICE ID DIKHAYEGI 🔥
    console.log(`[LOGIN ATTEMPT] Key: ${key || 'No Key'}, Device ID: ${dev_id || 'No Device ID'}`);

    if (key && ALL_VALID_KEYS.includes(key)) {
        return res.status(200).json({
            "status": "success",
            "message": "Access Granted! Enjoy.",
            "time_left_seconds": 86400
        });
    } else {
        return res.status(400).json({
            "status": "error",
            "message": "License expired or suspended"
        });
    }
});

app.listen(PORT, () => console.log(`Server running`));
