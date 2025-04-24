const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "mysql", 
  user: "root",
  password: "",
  database: "mqttJS",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/template.html");
});

app.get("/messages", (req, res) => {
  db.query("SELECT * FROM mqttjs ORDER BY time DESC", (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send("Database error");
    }

    let tableRows = "";
    results.forEach((row) => {
      tableRows += `<tr>
                      <td>${row.message}</td>
                      <td>${row.time}</td>
                    </tr>`;
    });

    res.send(tableRows);
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at ${port} port`);
});

