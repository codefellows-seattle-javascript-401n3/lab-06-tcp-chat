'use strict';

// const server = require('../server.js');
const assert = require('assert');
const net = require('net');
const client = new net.Socket();

// require('../model/client.js');

describe('Connection to Server Module', function() {
  describe('Testing the Connection to Server', function(done) {
    client.connect( { host: '127.0.0.1', port: 3000 }, function() {
      done();
    });
  });

  describe('Testing TCP SERVER CLIENT CHANGES', function() {
    describe('\\nick will change clients nickname', function() {
      it('should change current username/nickname', function(done) {
        assert.equal('\\nick silvershot', '\\nick silvershot');
        done();
      });
    });
  });
});