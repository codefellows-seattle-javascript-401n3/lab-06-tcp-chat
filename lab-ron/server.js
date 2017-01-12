'use strict';

const net = require('net');
const EE = require('events');
const Client = require('./model/client.js');

const PORT = process.env.PORT || 3000;
const pool = [];
const server = net.createServer();
const ee = new EE();

ee.on('\\nick', function(client, string) {
  client.socket.write('Your nickname is now: ' + `${string.trim()}\n`);
  client.nickname = string.trim();
});

ee.on('\\dm', function(client, string) {
  let nickname = string.split(' ').shift().trim();
  let message = string.split(' ').slice(1).join(' ').trim();

  pool.forEach( c => {
    if(c.nickname === nickname) {
      client.socket.write(`Message sent to  ${c.nickname}\n`);
      c.socket.write(`${client.nickname}: ${message}\n`);
    }
  });
});

ee.on('\\all', function(client, string) {
  pool.forEach( c => {
    c.socket.write(`${client.nickname}: ${string}`);
    //This line was removed because it broke everything.
  });
});

ee.on('default', function(client) {
  client.socket.write('Add a backslash before your command. \n');
});

ee.on('error', function(error) {
  console.error(error);
});

server.on('connection', function(socket) {
  var client = new Client(socket);
  pool.push(client);
  ee.emit('\\all', client, 'has arrived.\n');

  socket.on('data', function(data) {
    const command = data.toString().split(' ').shift().trim();

    if (command.startsWith('\\')) {
      ee.emit(command, client, data.toString().split(' ').slice(1).join(' '));
      return;
    }
    ee.emit('default', client, data.toString());
  });

  socket.on('close', function() {
    pool.forEach(c => {
      if(client.id === c.id) {
        pool.splice(pool.indexOf(c), 1);
        console.log('connection closed by user: ' + client.nickname);
        socket.end();
      }
    });

    ee.emit('\\all', client, 'has left the room.\n');
    console.log('Thanks for visiting.');
  });

  socket.on('error', function(error) {
    ee.emit('You have a problem', error);
  });

});

server.listen(PORT, function() {
  console.log('server running on port', PORT);
});
