const express = require("express");
const choresRouter = require("./routes/chores");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Index endpoint
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Chores API" });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ message: "OK" });
});

// Chores routes
app.use("/chores", choresRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Chores API listening on http://localhost:${PORT}`);
});
