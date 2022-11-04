const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = initDB(mysql);

//Get genres enpoint. Backend requirement #1
app.get('/api/genres', (req, res) => {
    connection.query('SELECT genre_id, title, parent FROM genres', function(error, results, fields) {
        if (error) throw error;
      res.send(JSON.stringify(results));
    });
});

//Get artists details enpoint. Backend requirement #2
app.get('/api/artists/:id', (req, res) => {
    let artist_id = req.params.id;
    //TODO PERFORM SANITIZATION
    connection.query('SELECT artist_name, artist_members, artist_active_year_begin, artist_active_year_end, artist_images, artist_wikipedia_page FROM artists WHERE artist_id = ' + artist_id, function(error, results, fields) {
        if (error) throw error;
      res.send(JSON.stringify(results));
    });
});

//Get track details by id enpoint. Backend requirement #3
app.get('/api/tracks/:id', (req, res) => {
    let track_id = req.params.id;
    //TODO PERFORM SANITIZATION
    connection.query('SELECT album_id, album_title, artist_id, artist_name, tags, track_date_created, track_date_recorded, track_duration, track_genres, track_number, track_title FROM tracks WHERE track_id = ' + track_id, function(error, results, fields) {
        if (error) throw error;
      res.send(JSON.stringify(results));
    });
});

//Get track id by search enpoint. Backend requirement #4
app.get('/api/tracks/search/:search', (req, res) => {
    let search = req.params.search;
    //TODO PERFORM SANITIZATION
    connection.query('SELECT track_id FROM tracks WHERE track_title LIKE \'%' + search + '%\' OR album_title LIKE \'%' + search + '%\' LIMIT 10;', function(error, results, fields) {
        if (error) throw error;
      res.send(JSON.stringify(results));
    });
});

//Get artist id by search enpoint. Backend requirement #5
app.get('/api/artists/search/:search', (req, res) => {
    let search = req.params.search;
    //TODO PERFORM SANITIZATION
    connection.query('SELECT artist_id FROM tracks WHERE artist_name LIKE \'%' + search + '%\' LIMIT 10;', function(error, results, fields) {
        if (error) throw error;
      res.send(JSON.stringify(results));
    });
});


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));

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