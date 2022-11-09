const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { body, check } = require('express-validator');

const connection = initDB(mysql);

const jsonParser = bodyParser.json();

const app = express();

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
        if (isNumeric(artist_id)) {//Santization
            connection.query('SELECT artist_name, artist_members, artist_active_year_begin, artist_active_year_end, artist_images, artist_wikipedia_page FROM artists WHERE artist_id = ?',[artist_id], function(error, results, fields) {
                if (error) throw error;
            res.send(JSON.stringify(results));
            });
        } else {
            res.status(400).send("Invalid Input. Artist Id must be a number.");
        }
    });

    //Get track details by id enpoint. Backend requirement #3. Sanitized through SQL param input.
    app.get('/api/tracks/:id', (req, res) => {
        let track_id = req.params.id;
        if (isNumeric(track_id)) {//Santization
            connection.query('SELECT album_id, track_id, album_title, artist_id, artist_name, tags, track_date_created, track_date_recorded, track_duration, track_genres, track_number, track_title FROM tracks WHERE track_id = ?', [track_id], function(error, results, fields) {
                if (error) throw error;
            res.send(JSON.stringify(results));
            });
        } else {
            res.status(400).send("Invalid Input. Track Id must be a number.");
        }
    });

    //Get track id by search enpoint. Backend requirement #4. Sanitized through SQL param input.
    app.get('/api/tracks', (req, res) => {
        let search = req.query.track_title;
    
        connection.query('SELECT track_id FROM tracks WHERE track_title LIKE ? OR album_title LIKE ? LIMIT 10;',['%' + search + '%', '%' + search + '%'], function(error, results, fields) {
            if (error) throw error;
        res.send(JSON.stringify(results));
        });
    });

    //Get artist id by search enpoint. Backend requirement #5. Sanitized through SQL param input.
    app.get('/api/artists', (req, res) => {
        let search = req.query.artist_name;
        console.log(search);

        connection.query('SELECT artist_id FROM artists WHERE artist_name LIKE ? LIMIT 10;',['%' + search + '%'], function(error, results, fields) {
            if (error) throw error;
        res.send(JSON.stringify(results));
        });
    });

    //Create list. Backend requirement #6. Sanitized in header.
    app.post('/api/lists', body('list_name').not().isEmpty().trim().escape(), jsonParser, (req, res) => {
    let list_name = req.body.list_name;
        console.log(req.body);
    
        connection.query('INSERT INTO lists (list_name) VALUES (?)',[list_name], function(error, results, fields) {
            if (error) {
                res.status(400).send(error.sqlMessage);
            } else {
                res.status(201).send("Successfully created new list");
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

        //Step 1, clear all old tracks saved to this list.
        connection.query('DELETE FROM saved_tracks WHERE list_name = ?',[list_name], function(error, results, fields) {
            if (error) throw error;
            //Step 2, Check if list exists.            
            connection.query('SELECT * FROM lists WHERE list_name = ?',[list_name], function(error, results, fields) {
                if (error) throw error;
            
                if (results.length > 0) {
                    //Step 3, insert new tracks 
                    track_ids.forEach(id => {
                        if (isNumeric(id.track_id)) {//Performing sanitization
                            connection.query('INSERT INTO saved_tracks VALUES (?, ?);', [list_name, id.track_id], function(error, results, fields) {
                                if (error) throw error;
                                
                            });
                        }
                    });

                    res.status(201).send("Successfully created populated list " + list_name + " with tracks.");
                } else {
                    res.status(400).send("A list with that name does not exist.");
                }
            });
        });
    });

    //Get list of track ids in a list. Backend requirement #8. Sanitized through SQL param input.
    app.get('/api/lists/tracks/:list', jsonParser, (req, res) => {
        let list_name = req.params.list;

        console.log(list_name);
        
        connection.query('SELECT * FROM saved_tracks WHERE list_name = ?',[decodeURIComponent(list_name)], function(error, results, fields) {
            if (error) throw error;
            
            res.send(JSON.stringify(results));
        });
    });

    //Deletes a list. Backend requirement #9. Sanitized through SQL param input.
    app.delete('/api/lists/:list', jsonParser, (req, res) => {
        let list_name = req.params.list;
    
        connection.query('SELECT * FROM lists WHERE list_name = ?',[list_name], function(error, results, fields) {
            if (error) throw error;
            if (results.length === 0)
                res.status(400).send("List does not exist.");
            else {
                connection.query('DELETE FROM lists WHERE list_name = ?',[list_name], function(error, results, fields) {
                    if (error) throw error;
                    connection.query('DELETE FROM saved_tracks WHERE list_name = ?',[list_name], function(error, results, fields) {
                        if (error) throw error;

                        res.status(204).send("Success Deleting");
                    });
                });
            }
        });
    });

    //Get list details. Backend requirement #10
    app.get('/api/lists', jsonParser, (req, res) => {
        //Step 1, select all list names and number of tracks for that list
        connection.query('SELECT count(t.track_id) AS track_count, t.list_name FROM saved_tracks t INNER JOIN lists l ON t.list_name = l.list_name GROUP BY t.list_name;', function(error, results, fields) {
            if (error) throw error;
        
            let trackCountName = results;
            //Querying all lists to make sure we are not missing empty lists.
            connection.query('SELECT * FROM lists;', function(error, results, fields) {
                if (error) throw error;
                //Adding 0 track count for these missing lists.
                results.forEach(res => {
                    res.track_count = 0;
                });
                //Concating with prior count list, removing duplicates.
                trackCountName = trackCountName.concat(results).unique();
            });



            //Step 2, select the track duration for every saved track
            connection.query('SELECT t.track_duration, l.list_name FROM saved_tracks l INNER JOIN tracks t ON l.track_id = t.track_id;', function(error, results, fields) {
                if (error) throw error;

                let trackDurationName = results;

                //For every list.
                for (let i = 0; i < trackCountName.length; i++) {
                    let tcn = trackCountName[i];
                    tcn.total_duration = 0;
                    //For every saved track.
                    for (let j = 0; j < trackDurationName.length; j++) {
                        let tdn = trackDurationName[j];
                        //Change track duration string into seconds.
                        let a = tdn.track_duration.split(':');
                        let totalSec = parseInt(a[0])*60 + parseInt(a[1]);
                        let track_duration = totalSec;
                        console.log(totalSec);
                        //If track is in list, add to toal list duration.
                        if (tcn.list_name === tdn.list_name) {
                            tcn.total_duration += track_duration;
                        }
                    }
                    //Change total second duration into HH:MM:SS.
                    let date = new Date(null);
                    date.setSeconds(tcn.total_duration);
                    tcn.total_duration = date.toISOString().substring(11, 19);
    
                }

                res.send(trackCountName);
            });
        });
    });

    //Function used for santization.
    function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }
    //Modification of the array prototype to make arrays unique.
    Array.prototype.unique = function() {
        var a = this.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i].list_name === a[j].list_name)
                    a.splice(j--, 1);
            }
        }

        return a;
    };

//Initialize the DB connection.
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

module.exports = app;