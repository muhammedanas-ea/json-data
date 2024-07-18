const jsonServer = require('json-server');
const cron = require('node-cron');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('JSON Server is running on port', port);
});

// Schedule a cron job to run every minute
cron.schedule('* * * * *', () => {
  console.log('Cron job running every minute');
  // Add your cron job task here
  // For example, you could read/write to the database, make an API call, etc.
});
