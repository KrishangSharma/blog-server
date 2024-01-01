require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// Routes
const blogRoutes = require("./routes/blogRoutes");

const port = process.env.PORT || 3000;

// Create instance of express
const app = express();

app.use(
  cors({
    origin: "*",
    // origin: ["https://blog-application-ufvo.onrender.com", "http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE",
    allowedHeaders:
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers, api-key ",
    credentials: true,
  })
);

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
