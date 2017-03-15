'use strict';

const assert = require('assert');
const mocha = require('mocha');
const server = require('../server.js');
const net = require('net');
const client = new net.Socket();


describe('Testing the Connection to Server', function(done) {
  it('should connect to localhost server', function() {
    client.connect( { host: 'localhost', port: 3000 }, function() {
      assert.equal(client);
      done();
    });
  });
});

describe('testing if new user was created', function() {
  it('should be equal', function(done) {
    client.once('data', function(data) {
      assert.equal(data, client, 'should be equal');
    });
    done();
  });
});

describe('\\nick', function(){
  it('should change nickname', function(done) {
    client.once('data', function(data) {
      assert.equal(data.toString(), '\n your name was changed to: Ron');
    });
    client.write('\\nick Ron');
    done();
  });
});
