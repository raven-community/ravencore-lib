'use strict';

var should = require('chai').should();
var ravencore = require('../');

describe('#versionGuard', function() {
  it('global._ravencore should be defined', function() {
    should.equal(global._ravencore, ravencore.version);
  });

  it('throw an error if version is already defined', function() {
    (function() {
      ravencore.versionGuard('version');
    }).should.throw('More than one instance of ravencore');
  });
});
