
/**
 * Module dependencies.
 */

var once = require('once');

/**
 * Expose `exists` and `install`.
 */

module.exports = exists;
exists.install = install;

/**
 * Check if there is a value stored under `key`.
 *
 * @param {LevelUp} db
 * @param {Object} key
 * @param {Function} cb
 */

function exists(db, key, cb) {
  if (typeof db == 'undefined') throw new Error('database required');
  if (typeof key == 'undefined') throw new Error('key required');
  if (typeof cb == 'undefined') throw new Error('callback required');

  cb = once(cb);

  db.createKeyStream({
    gte: key,
    lte: key
  })
  .on('data', function() {
    cb(null, true);
  })
  .on('error', function(err) {
    cb(err);
  })
  .on('end', function() {
    cb(null, false);
  });
}

/**
 * Install `exists` on a `db`.
 *
 * @param {LevelUp} db
 * @return {LevelUp}
 */

function install(db) {
  db.exists = function(key, cb) {
    exists(db, key, cb);
  };
}

