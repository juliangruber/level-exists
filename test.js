var exists = require('./');
var level = require('level');
var test = require('tape');
var noop = function(){};
var sublevel = require('level-sublevel');

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

test('#2 Wrong results when using UUIDs as keys', function(t) {
  t.plan(3);

  db.put('e1477610-2e38-11e3-b9c6-a5956e82b950', 'foo', function(err) {
    t.error(err);

    db.exists('e1481250-2e38-11e3-b9c6-a5956e82b950', function(err, yes) {
      t.error(err);
      t.notOk(yes);
    });
  });
});

test('sublevel', function(t) {
  t.plan(6);

  db = sublevel(db).sublevel('sub');
  exists.install(db);

  db.del('foo', function(err) {
    t.error(err);

    db.exists('foo', function(err, yes) {
      t.error(err);
      t.notOk(yes);

      db.put('foo', 'bar', function(err) {
        t.error(err);

        db.exists('another', function(err, yes) {
          t.error(err);
          t.notOk(yes);
        });
      });
    });
  });
});

