
var exists = require('./');
var level = require('level');
var ben = require('ben');

var db = level(__dirname + '/db');

var big = '';
for (var i = 0; i < 400329; i++) {
  big += 'abcdefghijklmnopqrstuvwxyz';
}

db.del('foo', function() {

  console.log('empty');
  check(function() {
    console.log('small');
    db.put('foo', 'bar', function() {
      check(function() {
        console.log('big');
        db.put('foo', big, function() {
          check();
        });
      });
    });
  });

});

function check(fn) {
  ben.async(function(done) {
    db.get('foo', done);
  }, function(ms) {
    console.log('get: %s ms per iteration', ms);

    ben.async(function(done) {
      exists(db, 'foo', done);
    }, function(ms) {
      console.log('exists: %s ms per iteration', ms);
      if (fn) fn();
    });
  });
}
