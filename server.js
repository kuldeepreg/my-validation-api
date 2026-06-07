const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Aapki regular valid keys
const ALL_VALID_KEYS = [
    "KULDEEP123", 
    "VIPACCESS", 
    "PREMIUM999", 
    "TESTKEY55",
    "HELLO"
];

// 2. Ek jagah jahan automatic Device IDs lock hongi
const LOCKED_DEVICES = {}; 

app.get('/validate', (req, res) => {
    const { key, dev_id } = req.query;
    const current_dev_id = dev_id || 'No Device ID';

    // ✨ PING SYSTEM: Agar UptimeRobot ne ping kiya
    if (key === 'UPTIMEPING99') {
        console.log(`[UPTIME DONE] Server is alive and ticking!`);
        return res.status(200).json({ "status": "success", "message": "Uptime OK" });
    }

    // ❌ ERROR: Agar user ne key hi nahi daali
    if (!key) {
        console.log(`[FAILED LOGIN ATTEMPT] Blank Key, Device ID: ${current_dev_id}`);
        return res.status(400).json({ "status": "error", "message": "Key is required" });
    }

    // 🛠️ DEVICE LOCK & VALIDATION SYSTEM
    if (ALL_VALID_KEYS.includes(key)) {
        
        // Agar is key par pehle se koi device lock nahi hai, toh abhi waale ko lock kar do
        if (!LOCKED_DEVICES[key]) {
            LOCKED_DEVICES[key] = current_dev_id;
            console.log(`[DEVICE LOCKED] Key: ${key} is now locked to Device ID: ${current_dev_id}`);
        }

        // Agar device ID match kar gayi (ya pehle se locked waali hi hai)
        if (LOCKED_DEVICES[key] === current_dev_id) {
            console.log(`[SUCCESSFUL LOGIN] Key: ${key}, Device ID: ${current_dev_id}`);
            return res.status(200).json({
                "status": "success",
                "message": "Access Granted! Enjoy.",
                "time_left_seconds": 86400
            });
        } else {
            // ❌ DEVICE MISMATCH: Key sahi hai par phone dusra hai
            console.log(`[BLOCKED - DEVICE MISMATCH] Key: ${key} tried from multiple devices! First Lock: ${LOCKED_DEVICES[key]}, Current Try: ${current_dev_id}`);
            return res.status(400).json({
                "status": "error",
                "message": "This key is already used on another device!"
            });
        }

    } else {
        // ❌ INVALID KEY: Key hi galat hai
        console.log(`[FAILED LOGIN ATTEMPT] Invalid Key: ${key}, Device ID: ${current_dev_id}`);
        return res.status(400).json({
            "status": "error",
            "message": "License expired or suspended"
        });
    }
});

app.listen(PORT, () => console.log(`Server running`));
            "message": "License expired or suspended"
        });
    }
});

app.listen(PORT, () => console.log(`Server running`));
