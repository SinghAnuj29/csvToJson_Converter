const { Pool } = require("pg");
require("dotenv").config();

//setup the .env file according to your configuration to intialize the PostgreSQL database
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function uploadDataToDatabase(data) {
  try {
    const client = await pool.connect();
    for (const user of data) {
      await client.query(
        "INSERT INTO public.users (name, age, address, additional_info) VALUES ($1, $2, $3, $4)",
        [
          user.name,
          user.age,
          JSON.stringify(user.address),
          JSON.stringify(user.additional_info),
        ]
      );
    }
    console.log("Data inserted successfully!");
    client.release();
  } catch (err) {
    console.error("Error uploading data to database:", err);
  }
}

module.exports = { uploadDataToDatabase };
