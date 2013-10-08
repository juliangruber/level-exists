var exists = require('./');
var level = require('level');
var sublevel = require('level-sublevel');
var test = require('tape');
var uuid = require('node-uuid');

var noop = function(){};

// comment out one of the next lines to see the problem described at:
// https://github.com/juliangruber/level-exists/issues/2

// if we use the normal level db nstance, then test no 14 will pass
// var db = level(__dirname + '/db');

// if we use this sublevel instance, then test no 14 will fail
var db = sublevel(level(__dirname + '/db')).sublevel('testdata');

exists.install(db);

test('exists', function(t) {
  t.plan(6);

  db.del('foo', function(err) {
    t.error(err);

    db.exists('foo', function(err, yes) {
      t.error(err);
      t.notOk(yes);

      db.put('foo', 'bar', function(err) {
        t.error(err);

        exists(db, 'foo', function(err, yes) {
          t.error(err);
          t.ok(yes);
        });
      });
    });
  });
});

test('args defined', function(t) {
  t.throws(exists.bind(null, undefined, 'key', noop), 'no database');
  t.throws(exists.bind(null, db, undefined, noop), 'no key');
  t.throws(exists.bind(null, db, 'key'), 'no callback');
  t.end();
});

test('#2 Wrong results when using UUIDs as keys', function(t) {
  t.plan(5);

  var key1 = uuid.v1();

  db.put(key1, 'foo', function(err) {
    t.error(err);

    db.exists(key1, function(err, yes) {

      t.error(err);
      t.ok(yes);

      var key2 = uuid.v1();

      db.exists(key2, function(err2, yes2) {

        t.error(err2);
        t.notOk(yes2);

      });
    });
  });
});

