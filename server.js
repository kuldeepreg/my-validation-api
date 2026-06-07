const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const ALL_VALID_KEYS = [
    "KULDEEP123", 
    "VIPACCESS", 
    "PREMIUM999", 
    "TESTKEY55",
    "hello"
];

const LOCKED_DEVICES = {}; 

app.get('/validate', (req, res) => {
    const { key, dev_id } = req.query;
    const current_dev_id = dev_id || 'No Device ID';

    if (key === 'UPTIMEPING99') {
        console.log(`[UPTIME DONE] Server is alive and ticking!`);
        return res.status(200).json({ "status": "success", "message": "Uptime OK" });
    }

    if (!key) {
        console.log(`[FAILED LOGIN ATTEMPT] Blank Key, Device ID: ${current_dev_id}`);
        return res.status(400).json({ "status": "error", "message": "Key is required" });
    }

    if (ALL_VALID_KEYS.includes(key)) {
        if (!LOCKED_DEVICES[key]) {
            LOCKED_DEVICES[key] = current_dev_id;
            console.log(`[DEVICE LOCKED] Key: ${key} is now locked to Device ID: ${current_dev_id}`);
        }

        if (LOCKED_DEVICES[key] === current_dev_id) {
            console.log(`[SUCCESSFUL LOGIN] Key: ${key}, Device ID: ${current_dev_id}`);
            return res.status(200).json({
                "status": "success",
                "message": "Access Granted! Enjoy.",
                "time_left_seconds": 86400
            });
        } else {
            console.log(`[BLOCKED - DEVICE MISMATCH] Key: ${key} tried from multiple devices! First Lock: ${LOCKED_DEVICES[key]}, Current Try: ${current_dev_id}`);
            return res.status(400).json({
                "status": "error",
                "message": "This key is already used on another device!"
            });
        }
    } else {
        console.log(`[FAILED LOGIN ATTEMPT] Invalid Key: ${key}, Device ID: ${current_dev_id}`);
        return res.status(400).json({
            "status": "error",
            "message": "License expired or suspended"
        });
    }
});

app.listen(PORT, () => console.log(`Server running`));
      
