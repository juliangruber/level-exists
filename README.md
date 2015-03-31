
# level-exists

Check if a datum exists without reading its value.

[![build status](https://secure.travis-ci.org/juliangruber/level-exists.png)](http://travis-ci.org/juliangruber/level-exists)

## Example

```js
var exists = require('level-exists');
var level = require('level');

var db = level(__dirname + '/db');
exists.install(db);

db.del('foo', function(err) {
  if (err) throw err;

  db.exists('foo', function(err, yes, value) {
    if (err) throw err;
    console.log('foo exists? %s', yes);
    // foo exists? false

    db.put('foo', 'bar', function(err) {
      if (err) throw err;

      exists(db, 'foo', function(err, yes, value) {
        if (err) throw err;
        console.log('foo exists? %s', yes);
        // foo exists? true
      });
    });
  });
});
```

## API

### exists(db, key, cb)

Check if there's a datum in `db` with `key` and call `cb` with `(err, exists, value)`.

### exists.install(db)
### db#exists(key, cb)

Install `level-exists` onto the `db`.

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install level-exists
```

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
