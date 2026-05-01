const connection = require('./db');

connection.query('SELECT * FROM users', (err, results) => {
  if (err) throw err;
  console.log('Query Results:', results);
});

// Remember to close the connection when done
connection.end();
