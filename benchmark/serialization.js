'use strict';

var benchmark = require('benchmark');
var ravencore = require('..');
var ravencoinjs = require('ravencoinjs-lib');
var rcoin = require('rcoin');
var async = require('async');
var fullnode = require('fullnode');
var blockData = require('./block-357238.json');

var maxTime = 20;

console.log('Benchmarking Block/Transaction Serialization');
console.log('---------------------------------------');

async.series([
  function(next) {

    var buffers = [];
    var hashBuffers = [];
    console.log('Generating Random Test Data...');
    for (var i = 0; i < 100; i++) {

      // uint64le
      var br = new ravencore.encoding.BufferWriter();
      var num = Math.round(Math.random() * 10000000000000);
      br.writeUInt64LEBN(new ravencore.crypto.BN(num));
      buffers.push(br.toBuffer());

      // hashes
      var data = ravencore.crypto.Hash.sha256sha256(new Buffer(32));
      hashBuffers.push(data);
    }

    var c = 0;
    var bn;

    function readUInt64LEBN() {
      if (c >= buffers.length) {
        c = 0;
      }
      var buf = buffers[c];
      var br = new ravencore.encoding.BufferReader(buf);
      bn = br.readUInt64LEBN();
      c++;
    }

    var reversed;

    function readReverse() {
      if (c >= hashBuffers.length) {
        c = 0;
      }
      var buf = hashBuffers[c];
      var br = new ravencore.encoding.BufferReader(buf);
      reversed = br.readReverse();
      c++;
    }

    console.log('Starting benchmark...');

    var suite = new benchmark.Suite();
    suite.add('bufferReader.readUInt64LEBN()', readUInt64LEBN, {maxTime: maxTime});
    suite.add('bufferReader.readReverse()', readReverse, {maxTime: maxTime});
    suite
      .on('cycle', function(event) {
        console.log(String(event.target));
      })
      .on('complete', function() {
        console.log('Done');
        console.log('----------------------------------------------------------------------');
        next();
      })
      .run();
  },
  function(next) {

    var block1;
    var block2;
    var block3;

    function ravencoreTest() {
      block1 = ravencore.Block.fromString(blockData);
    }

    function ravencoinJSTest() {
      block2 = ravencoinjs.Block.fromHex(blockData);
    }

    var parser = new rcoin.protocol.parser();

    function rcoinTest() {
      var raw = rcoin.utils.toArray(blockData, 'hex');
      var data = parser.parseBlock(raw);
      block3 = new rcoin.block(data, 'block');
    }

    var blockDataMessage = '0000000000000000' + blockData; // add mock leading magic and size

    function fullnodeTest() {
      fullnode.Block().fromHex(blockDataMessage);
    }

    var suite = new benchmark.Suite();
    suite.add('ravencore', ravencoreTest, {maxTime: maxTime});
    suite.add('ravencoinjs', ravencoinJSTest, {maxTime: maxTime});
    suite.add('rcoin', rcoinTest, {maxTime: maxTime});
    suite.add('fullnode', fullnodeTest, {maxTime: maxTime});
    suite
      .on('cycle', function(event) {
        console.log(String(event.target));
      })
      .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
        console.log('----------------------------------------------------------------------');
        next();
      })
      .run();
  }
], function(err) {
  console.log('Finished');
});
