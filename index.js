const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const e = require('express');
const app = express();

const connection = initDB(mysql);

const jsonParser = bodyParser.json();

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

//Create list. Backend requirement #6
app.post('/api/lists', jsonParser, (req, res) => {
   let list_name = req.body.list_name;
    console.log(req.body);
   // TODO PERFORM SANITIZATION
    connection.query('INSERT INTO lists (list_name) VALUES (\'' + list_name + '\')', function(error, results, fields) {
        if (error) {
            res.status(400).send(error.sqlMessage);
        } else {
            res.status(200).send("Successfully created new list");
        }
    });
});

//Add tracks to list. Backend requirement #7
/*
Example input:
{"track_ids": [{"track_id": 1},
{"track_id": 2},
{"track_id": 21}]}
*/
app.post('/api/lists/:list', jsonParser, (req, res) => {
    let list_name = req.params.list;
    let track_ids = req.body.track_ids;
     console.log(req.body);
    // TODO PERFORM SANITIZATION

    //Step 1, clear all old tracks saved to this list.
     connection.query('DELETE FROM saved_tracks WHERE list_name = \'' + list_name + '\'', function(error, results, fields) {
         if (error) throw error;
        //Step 2, Check if list exists.            
         connection.query('SELECT * FROM lists WHERE list_name = \'' + list_name + '\'', function(error, results, fields) {
            if (error) throw error;
        
            if (results.length > 0) {
                //Step 3, insert new tracks
                track_ids.forEach(id => {
                    connection.query('INSERT INTO saved_tracks VALUES (\'' + list_name + '\', ' + id.track_id + ');', function(error, results, fields) {
                        if (error) throw error;
                        
                    });
                });

                res.send("Successfully created populated list " + list_name + " with tracks.");
            } else {
                res.status(400).send("A list with that name does not exist.");
            }
         });
     });
 });

 //Get list of track ids list. Backend requirement #8
app.get('/api/lists/tracks/:list', jsonParser, (req, res) => {
    let list_name = req.params.list;
    // TODO PERFORM SANITIZATION
     connection.query('SELECT * FROM saved_tracks WHERE list_name = \'' + list_name + '\'', function(error, results, fields) {
        if (error) throw error;
        
        res.send(JSON.stringify(results));
     });
 });

  //Get list of track ids list. Backend requirement #9
app.delete('/api/lists/:list', jsonParser, (req, res) => {
    let list_name = req.params.list;
    // TODO PERFORM SANITIZATION
    connection.query('SELECT * FROM lists WHERE list_name = \'' + list_name + '\'', function(error, results, fields) {
        if (error) throw error;
        if (results.length === 0)
            res.status(400).send("List does not exist.");
        else {
            connection.query('DELETE FROM lists WHERE list_name = \'' + list_name + '\'', function(error, results, fields) {
                if (error) throw error;
                connection.query('DELETE FROM saved_tracks WHERE list_name = \'' + list_name + '\'', function(error, results, fields) {
                    if (error) throw error;

                    res.status(200).send("Successfully deleted " + list_name);
                });
            });
        }
    });
});

 //Get list details. Backend requirement #10
app.get('/api/lists', jsonParser, (req, res) => {
    // TODO PERFORM SANITIZATION
    //Step 1, select all list names
     connection.query('SELECT count(t.track_id), t.list_name FROM saved_tracks t INNER JOIN lists l ON t.list_name = l.list_name GROUP BY t.list_name;', function(error, results, fields) {
        if (error) throw error;
    

        let trackCountName = results;

        connection.query('SELECT t.track_duration, l.list_name FROM saved_tracks l INNER JOIN tracks t ON l.track_id = t.track_id;', function(error, results, fields) {
            if (error) throw error;

            let trackDurationName = results;

            for (let i = 0; i < trackCountName.length; i++) {
                let tcn = trackCountName[i];
                tcn.total_duration = 0;
                for (let j = 0; j < trackDurationName.length; j++) {
                    let tdn = trackDurationName[j];

                    console.log(tdn.track_duration);

                    let a = tdn.track_duration.split(':');
                    let totalSec = parseInt(a[0])*60 + parseInt(a[1]);
                    let track_duration = totalSec;
                    console.log(totalSec);

                     if (tcn.list_name === tdn.list_name) {
                         tcn.total_duration += track_duration;
                     }
                }
                let date = new Date(null);
                date.setSeconds(tcn.total_duration);
                tcn.total_duration = date.toISOString().substring(11, 19);
            }

            res.send(trackCountName);

        });

        
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