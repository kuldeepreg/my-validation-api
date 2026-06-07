const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Aapki keys ki list
const ALL_VALID_KEYS = [
    "KULDEEP123", 
    "VIPACCESS", 
    "PREMIUM999", 
    "TESTKEY55",
    "HELLO"
];

app.get('/validate', (req, res) => {
    const { key, dev_id } = req.query;
    const current_dev_id = dev_id || 'No Device ID';

    // Check karega ki key sahi hai ya nahi
    if (key && ALL_VALID_KEYS.includes(key)) {
        
        // 🔥 SAHI KEY DALNE PAR YEH LINE LOGS ME CHHAPEGI 🔥
        console.log(`[SUCCESSFUL LOGIN] Key: ${key}, Device ID: ${current_dev_id}`);

        return res.status(200).json({
            "status": "success",
            "message": "Access Granted! Enjoy.",
            "time_left_seconds": 86400
        });

    } else {
        
        // ❌ GALAT KEY DALNE PAR YEH LINE LOGS ME CHHAPEGI ❌
        console.log(`[FAILED LOGIN ATTEMPT] Key: ${key || 'Blank Key'}, Device ID: ${current_dev_id}`);

        return res.status(400).json({
            "status": "error",
            "message": "License expired or suspended"
        });
    }
});

app.listen(PORT, () => console.log(`Server running`));
