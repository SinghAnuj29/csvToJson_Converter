const fs = require("fs");
const readline = require("readline");

async function parseCSV(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let header = [];
  let jsonData = [];

  for await (const line of rl) {
    const data = line.split(",");
    if (header.length === 0) {
      header = data.map((field) => field.trim());
      continue;
    }

    //initalization process for every user
    let user = {
      name: {
        firstName: "",
        lastName: "",
      },
      age: 0,
      address: {},
      additional_info: {},
    };

    for (let i = 0; i < header.length; i++) {
      const [property, subProperty] = header[i]
        .split(".")
        .map((field) => field.trim());
      if (property === "name") {
        if (subProperty === "firstName") {
          user.name.firstName = data[i].trim();
        } else if (subProperty === "lastName") {
          user.name.lastName = data[i].trim();
        }
      } else if (property === "age") {
        user.age = parseInt(data[i].trim());
      } else if (property === "address") {
        // If property is 'address', further split the subProperty and store in address object
        const [addressProperty, addressSubProperty] = subProperty.split(".");
        if (!user.address[addressProperty]) {
          user.address[addressProperty] = {};
        }
        user.address[addressProperty][addressSubProperty] = data[i].trim();
      } else {
        // Store other properties in additional_info object i.e gender etc
        if (!user.additional_info[property]) {
          user.additional_info[property] = {};
        }
        user.additional_info[property][subProperty] = data[i].trim();
      }
    }

    jsonData.push(user);
  }

  return jsonData;
}

module.exports = { parseCSV };
