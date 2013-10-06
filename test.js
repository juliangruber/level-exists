var exists = require('./');
var level = require('level');
var test = require('tape');
var noop = function(){};

var db = level(__dirname + '/db');
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

