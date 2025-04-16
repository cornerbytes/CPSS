const Aedes = require('aedes');
const net = require('net');

const aedes = Aedes();
const server = net.createServer(aedes.handle);
const port = 1883;

server.listen(port, () => {
  console.log(`Broker is ready and listening on port ${port}`);
});

aedes.on('publish', (packet, client) => {
  const message = packet.payload.toString();
  if (client) {
    console.log(`Client ${client.id} Published message: ${message}`);
  } else {
    console.log(`Broker published message: ${message}`);
  }
});
aedes.on('client', (client) => {
  console.log(`Client connected: ${client.id}`);
});

