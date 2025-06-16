const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post("/api/gemini", async (req, res) => {
  const { messages } = req.body;

  try {
    const result = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: messages.map((m) => ({ text: m.content })),
            role: "user"
          }
        ]
      })
    });

    const data = await result.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    res.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "API error" });
  }
});

// WICHTIG: Render-Port verwenden!
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`michelle110 Backend läuft auf Port ${PORT}`);
});
