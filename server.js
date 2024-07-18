const jsonServer = require('json-server');
const cron = require('node-cron');
const https = require('https');

// Create the server
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Define the port
const port = process.env.PORT || 3000;

// Start the server
server.listen(port, () => {
  console.log('JSON Server is running on port', port);
});

// Schedule a cron job to run every 14 minutes
cron.schedule('*/14 * * * *', () => {
  console.log('Pinging server to keep it alive...');
  
  const options = {
    hostname: 'swoz.onrender.com',
    method: 'GET',
    timeout: 60000 // Timeout set to 60 seconds
  };

  const req = https.request(options, (res) => {
    console.log(`Ping response: ${res.statusCode}`);
  });
  
  req.on('timeout', () => {
    req.abort();
    console.error('Request timed out');
  });

  req.on('error', (err) => {
    console.error('Ping error:', err.message);
  });

  req.end();
});

module.exports = server;
