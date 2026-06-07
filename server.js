const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Yahaan aap apni marzi ki jitni chahein utni keys rakh sakte hain
// Jab aapko kisi ka access band karna ho, bas yahaan se uski key delete kar dena!
const ALL_VALID_KEYS = [
    "KULDEEP123", 
    "VIPACCESS", 
    "PREMIUM999", "HELLO",
    "TESTKEY55"
];

app.get('/validate', (req, res) => {
    const { key, dev_id } = req.query;

    // Check karega ki user ne jo key daali hai wo list me hai ya nahi
    if (key && ALL_VALID_KEYS.includes(key)) {
        // SUCCESS RESPONSE (Jo developer ne image me maanga hai)
        return res.status(200).json({
            "status": "success",
            "message": "Access Granted! Enjoy.",
            "time_left_seconds": 86400  // Ye dummy seconds hain, isse farq nahi padega
        });
    } else {
        // ERROR RESPONSE
        return res.status(400).json({
            "status": "error",
            "message": "License expired or suspended"
        });
    }
});

app.listen(PORT, () => console.log(`Server running`));
