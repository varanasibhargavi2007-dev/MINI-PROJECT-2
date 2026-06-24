const express = require("express");
const mongoose = require("mongoose");

const collegeRoutes = require("./routes/collegeroutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/colleges", collegeRoutes);

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/collegeDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});