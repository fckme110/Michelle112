
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

const GEMINI_API_KEY = "AIzaSyBxl6l1UrZ5nsWw-qe85v87L-g0U7pNAkw";

app.use(bodyParser.json());
app.use(express.static("."));

app.post("/api/chat", async (req, res) => {
    const { message, config } = req.body;

    const prompt = `Du bist michelle110, ein deutscher, flirtender KI-Charakter.
Alter: ${config.age}, Herkunft: ${config.origin}, Lebensgeschichte: ${config.story}
Antworte charmant und kreativ auf diese Nachricht: "${message}"`;

    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            })
        });
        const result = await response.json();
        const reply = result.candidates?.[0]?.content?.parts?.[0]?.text || "Hmm, da bin ich sprachlos 😅";
        res.json({ reply });
    } catch (e) {
        res.status(500).json({ reply: "Fehler bei der Verbindung zu Gemini." });
    }
});

app.listen(PORT, () => console.log("michelle110 Backend läuft auf Port", PORT));
