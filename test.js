

var exists = require('./');
var level = require('level');
var test = require('tape');

test('exists', function(t) {
  t.plan(6);

  var db = level(__dirname + '/db');
  exists.install(db);

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

