require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// Routes
const blogRoutes = require("./routes/blogRoutes");

const port = process.env.PORT || 3000;

// Create instance of express
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

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

// Enable routes
app.use(blogRoutes);
