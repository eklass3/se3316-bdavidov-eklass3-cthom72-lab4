const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = initDB(mysql);

connection.query('SELECT * FROM genres WHERE genre_id = ' + 2, function(error, results, fields) {
    if (error) throw error;
  console.log('The solution is: ', results[0].title);
});

function initDB(sql) {
   
    let connection = sql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'K983pj*B',
        database: 'music'
    });
    
    connection.connect();

    console.log("DB Connected");

    return connection;
}