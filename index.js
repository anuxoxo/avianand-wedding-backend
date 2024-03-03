const express = require("express");
const fs = require("fs/promises");
const bodyParser = require("body-parser");
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
const filePath = "data.json";

// Check if the file exists, if not create an empty array
const initializeFile = async () => {
  try {
    await fs.access(filePath);
  } catch (error) {
    await fs.writeFile(filePath, "[]");
  }
};

initializeFile();

// API endpoint to handle form submissions
app.post("/submit", async (req, res) => {
  try {
    // Read existing data from the file
    const data = JSON.parse(await fs.readFile(filePath));

    // Append the new form data to the array
    data.push(req.body);

    // Write the updated data back to the file
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
