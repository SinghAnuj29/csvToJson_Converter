# CSV to JSON Converter

This is a simple Node.js application that converts CSV files to JSON format.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)

Before running the application, ensure you have PostgreSQL and node.js set up on your system. You'll need to configure the following environment variables:

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SinghAnuj29/csv-to-json-converter.git

   ```

2. Install dependencies:
   npm install

## Environment Variables

3. Create a .env file in the root directory of the project and add the following environment variables:

CSV_FILE_PATH=/path/to/csv/file.csv  
DB_USER=my_database_user  
DB_HOST=localhost  
DB_NAME=my_database_name  
DB_PASSWORD=my_database_password  
DB_PORT=5432

Make sure to replace the placeholders (/path/to/csv/file.csv, my_database_user, etc.) with your actual file path and database configuration details.

## Endpoints

4. Start the server:  
   npm start

5. To convert a CSV file to JSON, send a GET request to the /parse endpoint.

   url: http://localhost:5000/parse

## Technologies Used

6. Technologies Used  
   Node.js  
   Express.js
