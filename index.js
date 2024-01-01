require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// Routes
const blogRoutes = require("./routes/blogRoutes");

const port = process.env.PORT || 3000;

// Create instance of express
const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://blog-application-ufvo.onrender.com/"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);

  next();
});

app.use(cors());

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
