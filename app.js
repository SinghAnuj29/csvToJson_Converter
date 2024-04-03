const express = require("express");
const { parseCSV } = require("./src/controller/csvToJson");
const { uploadDataToDatabase } = require("./src/controller/database");
const {
  generateAgeDistributionReport,
} = require("./src/controller/reportGenerator");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const CSV_FILE_PATH =
  process.env.CSV_FILE_PATH || "E:/csvToJson/resources/client_data.csv";

//defining the age group for the result calculation
const AGE_GROUPS = [
  { range: "< 20", count: 0 },
  { range: "20 to 40", count: 0 },
  { range: "40 to 60", count: 0 },
  { range: "> 60", count: 0 },
];

app.get("/", (req, res) => {
  res.send("Welcome to CSV to JSON Converter!");
});

app.get("/parse", async (req, res) => {
  try {
    const jsonData = await parseCSV(CSV_FILE_PATH);
    await uploadDataToDatabase(jsonData);

    // Calculate age distribution for every category
    jsonData.forEach((user) => {
      if (user.age < 20) AGE_GROUPS[0].count++;
      else if (user.age >= 20 && user.age <= 40) AGE_GROUPS[1].count++;
      else if (user.age > 40 && user.age <= 60) AGE_GROUPS[2].count++;
      else AGE_GROUPS[3].count++;
    });

    generateAgeDistributionReport(AGE_GROUPS);

    res.json(jsonData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
