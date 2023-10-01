const express = require("express");
const mysql = require("mysql2");

const PORT = String(process.env.PORT);
const HOST = String(process.env.HOST);
const MYSQLHOST = String(process.env.MYSQLHOST);
const MYSQLUSER = String(process.env.MYSQLUSER);
const MYSQLPASS = String(process.env.MYSQLPASS);


const app = express();
app.use(express.json());


let db = mysql.createConnection({
  host: MYSQLHOST,
  user: MYSQLUSER,
  password: MYSQLPASS,
  database: "box1"
});


app.use("/", express.static("frontend"));

app.get('/api/tables', (req, res) => {
  db.query('SHOW TABLES', (err, result) => {
      if (err) {
          console.error('Error fetching table names:', err);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          const tables = result.map((row) => row[`Tables_in_${db.config.database}`]);
          res.json({ tables });
      }
  });
});

app.get('/api/data', (req, res) => {
  const selectedTable = req.query.table;
  const sql = `SELECT * FROM ${selectedTable}`;
  db.query(sql, (err, result) => {
      if (err) {
          console.error('Error querying the database:', err);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          res.json(result);
      }
  });
});

// API endpoint to add new data to an existing or new table
app.post('/addData', (req, res) => {
  var data = req.body
  console.log(req.body['auto'])
  if(req.body['auto'] == "True" || req.body['auto'] == "1" || req.body['auto'] == "true"){
    req.body['auto'] = Boolean(req.body['auto'])
  }else{
    req.body['auto'] = Boolean(req.body[''])
  }
  const {pop, number, price, auto, table, newTable} = req.body;
  // Check if a new table is being created
  console.log(newTable)
  if (newTable) {
    console.log("here1")
      // Create a new table in the database with the specified name
      const createTableSQL = `CREATE TABLE IF NOT EXISTS ${newTable} (
        pop VARCHAR(255) NOT NULL,
        number int NOT NULL,
        price VARCHAR(255) NOT NULL,
        auto BOOLEAN,
        PRIMARY KEY (pop, number)
      )`;

      db.query(createTableSQL, (err) => {
          if (err) {
              console.error('Error creating a new table:', err);
              res.json({ success: false });
          } else {
              console.log(`Created a new table: ${newTable}`);
              // Insert the new data into the newly created table
              const insertSQL = `INSERT INTO ${newTable} (pop, number, price, auto) VALUES (?, ?, ?, ?)`;
              db.query(insertSQL, [pop, number, price, auto], (insertErr) => {
                  if (insertErr) {
                      console.error('Error inserting data into the new table:', insertErr);
                      res.json({ success: false });
                  } else {
                      console.log('Data added successfully to the new table');
                      res.json({ success: true });
                  }
              });
          }
      });
  } else {
      // Insert data into the existing table
      const insertSQL = `INSERT INTO ${table} (pop, number, price, auto) VALUES (?, ?, ?, ?)`;
      db.query(insertSQL, [pop, number, price, auto], (err) => {
          if (err) {
              console.error('Error inserting data into the existing table:', err);
              res.json({ success: false });
          } else {
              console.log('Data added successfully to the existing table');
              res.json({ success: true });
          }
      });
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
