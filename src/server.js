require("dotenv").config();
// src/server.js
const express = require("express");
const Moralis = require("moralis").default;

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Moralis once at the server start
async function initMoralis() {
    try {
        await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
        console.log("✅ Moralis initialized");
    } catch (error) {
        console.error("❌ Moralis initialization error:", error);
    }
}

initMoralis(); // Only run once when the server starts

// Import routes after initializing Moralis
const walletRoutes = require("./routes/walletRoutes");
app.use("/api", walletRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
