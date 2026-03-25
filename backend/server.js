const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const { generateAIResponse } = require("./sarvam");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_FILE = "./db.json";

// Save data
function saveData(entry) {
  let data = [];

  if (fs.existsSync(DB_FILE)) {
    data = JSON.parse(fs.readFileSync(DB_FILE));
  }

  data.push(entry);
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Submit route
app.post("/submit", async (req, res) => {
  try {
    const userData = req.body;

    const aiResult = await generateAIResponse(userData);

    const entry = {
      ...userData,
      aiResponse: aiResult.response,
      petition: aiResult.petition,
      createdAt: new Date()
    };

    saveData(entry);

    res.json(aiResult);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// Admin login
app.post("/admin-login", (req, res) => {
  if (req.body.password === "Slac2026") {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Get data
app.get("/admin-data", (req, res) => {
  if (fs.existsSync(DB_FILE)) {
    res.json(JSON.parse(fs.readFileSync(DB_FILE)));
  } else {
    res.json([]);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
