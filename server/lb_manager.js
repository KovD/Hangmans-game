const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'leaderboard.db');

const db = new sqlite3.Database(dbPath, (err) => {
    console.log('Connected to database');
    db.run(`
      CREATE TABLE IF NOT EXISTS leaderboard (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        score INTEGER NOT NULL
      )
    `);
});


const readLeaderboard = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM leaderboard ORDER BY score DESC', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const updateLeaderboard = (data) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('DELETE FROM leaderboard', (err) => {
        if (err) {
          console.error('Failed to clear leaderboard:', err);
          reject(err);
          return;
        }

        const stmt = db.prepare('INSERT INTO leaderboard (id, name, score) VALUES (?, ?, ?)');
        data.forEach((entry) => {
          stmt.run(entry.id, entry.name, entry.score);
        });
        stmt.finalize();

        resolve(true);
      });
    });
  });
};

readLeaderboard((lb) => {
  console.log('Current leaderboard:', lb);
});

updateLeaderboard([
  { id: 'Ultra-master', name: 'Kovács Dániel', score: 20000000000 }
], (success) => {
  if (success) {
    console.log('Leaderboard updated successfully!');
    readLeaderboard((lb) => {
      console.log('Updated leaderboard:', lb);
    });
  } else {
    console.log('Failed to update leaderboard.');
  }
});

module.exports = {
  readLeaderboard,
  updateLeaderboard
};