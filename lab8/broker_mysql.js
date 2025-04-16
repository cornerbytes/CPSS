const aedes = require("aedes")();
const net = require("net");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "",
  database: "mqttJS",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
  } else {
    console.log("Database connected!");
  }
});

const server = net.createServer(aedes.handle);

server.listen(1883, () => {
  console.log("Broker is ready!");
});

aedes.on("publish", (packet, client) => {
  const message = packet.payload.toString();
  console.log("Received message:", message);

  if (message.slice(0, 1) !== "{" && message.slice(0, 4) !== "mqtt") {
    const dbStat = "INSERT INTO mqttjs SET ?";
    const data = {
      message: message,
    };

    db.query(dbStat, data, (error, results) => {
      if (error) {
        console.log("Error saving data to database:", error);
      } else {
        console.log("Data saved to database!");
      }
    });
  }
});
