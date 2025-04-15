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
  console.log('Received message:', message);
});

