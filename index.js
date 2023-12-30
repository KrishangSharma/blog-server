require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
// Routes
const blogRoutes = require("./routes/blogRoutes");

const port = process.env.PORT || 3000;

// Create instance of express
const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://blog-application-kr0s.onrender.com"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Enable routes
app.use(blogRoutes);

// Start the Server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error connecting to database! Message:", err.message);
  });
