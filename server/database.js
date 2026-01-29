const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.log("DB Error", err);
  } else {
    console.log("SQLite DB connected");
  }
});

db.run(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )
`,
  (err) => {
    if (err) console.log("DB create table error", err);
  }
);

module.exports = db;
