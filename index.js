require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const FormData = require("./FormData"); // Import the FormData model
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// MongoDB connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// API endpoint to handle form submissions
app.post("/submit", async (req, res) => {
  try {
    // Create a new FormData document
    const formData = new FormData({
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      emailAddress: req.body.emailAddress,
      numberOfAdults: req.body.numberOfAdults,
      numberOfKids: req.body.numberOfKids,
      foodPreference: req.body.foodPreference,
      beveragePreference: req.body.beveragePreference,
    });

    // Save the formData to the database
    await formData.save();

    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
