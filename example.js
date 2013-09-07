
var exists = require('./');
var level = require('level');

var db = level(__dirname + '/db');
exists.install(db);

db.del('foo', function(err) {
  if (err) throw err;

  db.exists('foo', function(err, yes) {
    if (err) throw err;
    console.log('foo exists? %s', yes);

    db.put('foo', 'bar', function(err) {
      if (err) throw err;

      exists(db, 'foo', function(err, yes) {
        if (err) throw err;
        console.log('foo exists? %s', yes);
      });
    });
  });
});


