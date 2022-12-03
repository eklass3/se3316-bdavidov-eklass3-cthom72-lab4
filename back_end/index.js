const express = require('express');
var axios = require("axios");
const bodyParser = require('body-parser');
const { body } = require('express-validator');
var oAuth = require("./middleware/oAuth");
var port = process.env.PORT || 3001;
const app = express();
const cors = require('cors');
const {checkJwt, checkAdmin} = require("./api/api.js");
app.use("/auth", oAuth);

const mysql = require('mysql');

const connection = initDB(mysql);

//parser for JSON
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
    /*
    {
        "list_name": "",
        "decription":"",
        "public":0,
        "creator_id":""
    }
    */
    app.post('/api/lists', jsonParser, (req, res) => {
    const body = req.body;
        console.log(body);
    
        connection.query('INSERT INTO lists (list_name, date_edited, description, public, creator_id) VALUES (?, CURRENT_TIMESTAMP(), ?, ?, ?)',[body.list_name, body.description, body.public, body.creator_id], function(error, results, fields) {
            if (error) {
                res.status(400).send(error.sqlMessage);
            } else {
                res.status(201).send("Successfully created new list " + JSON.stringify(body));
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
    app.get('/api/lists/:public', jsonParser, (req, res) => {
        let public = req.params.public;

        if (public === "")
            public = 1;

        //Step 1, select all list names and number of tracks for that list
        connection.query('SELECT count(t.track_id) AS track_count, t.list_name, l.date_edited, l.description, l.public, l.creator_id FROM saved_tracks t INNER JOIN lists l ON t.list_name = l.list_name WHERE public = ? GROUP BY t.list_name;',[public], function(error, results, fields) {
            if (error) throw error;
        
            let trackCountName = results;
            //Querying all lists to make sure we are not missing empty lists.
            connection.query('SELECT * FROM lists WHERE public = ?;',[public], function(error, results, fields) {
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

    //Update lists
    /*
    {
        "list_name": ""
        "description": ""
        "public": 0
    }
    */
    app.put('/api/lists', jsonParser, (req, res) => {
        const body = req.body;
        console.log(body);
    
        connection.query('UPDATE lists SET date_edited = CURRENT_TIMESTAMP(), description = ?, public = ? WHERE list_name = ?',[body.description, body.public, body.list_name], function(error, results, fields) {
            if (error) {
                res.status(400).send(error.sqlMessage);
            } else {
                res.status(201).send("Successfully updated the list! " + JSON.stringify(body));
            }
        });
    });

    //Create an account
    /*
    Example input
    {
      "account_id": "",
      "account_name":"",
      "admin": 0,
      "active": 1
    }
    */
    app.post('/api/accounts', jsonParser, (req, res) => {
        const body = req.body;
        console.log(body);
    
        connection.query('INSERT INTO accounts (account_id, account_name, admin, active) VALUES (?, ?, ?, ?)',[body.account_id, body.account_name, body.admin, body.active], function(error, results, fields) {
            if (error) {
                res.status(400).send(error.sqlMessage);
            } else {
                res.status(201).send("Successfully created new account! " + JSON.stringify(body));
            }
        });
    });

    //Update an account
    /*
    Example input
    {
      "account_id": "",
      "account_name":"",
      "admin": 0,
      "active": 1
    }
    */
    app.put('/api/accounts', jsonParser, (req, res) => {
      const body = req.body;
      console.log(body);
  
      connection.query('UPDATE accounts SET account_name = ?, admin = ?, active = ? WHERE account_id = ?',[body.account_name, body.admin, body.active, body.account_id], function(error, results, fields) {
          if (error) {
              res.status(400).send(error.sqlMessage);
          } else {
              res.status(201).send("Successfully updated the account " + JSON.stringify(body));
          }
      });
  });

    //Get account by account id!
    app.get('/api/accounts/:account_id', jsonParser, (req, res) => {
        let account_id = req.params.account_id;

        connection.query('SELECT * FROM accounts WHERE account_id = ?',[decodeURIComponent(account_id)], function(error, results, fields) {
            if (error) throw error;
            
            res.send(JSON.stringify(results));
        });
    });

    //Get review from list name
    app.get('/api/reviews/:list_name', jsonParser, (req, res) => {
        let list_name = req.params.list_name;

        connection.query('SELECT * FROM reviews WHERE list_name = ?',[decodeURIComponent(list_name)], function(error, results, fields) {
            if (error) throw error;
            
            res.send(JSON.stringify(results));
        });
    });


    //Insert new review
    /*
    {
      "rating":5,
      "comment":"",
      "hidden": 0,
      "list_name": "",
      "account_id": ""
    }
    */
    app.post('/api/reviews', jsonParser, (req, res) => {
        const body = req.body;
        console.log(body);
    
        connection.query('INSERT INTO reviews (rating, comment, hidden, list_name, account_id) VALUES (?, ?, ?, ?, ?)',[body.rating, body.comment, body.hidden, body.list_name, body.account_id], function(error, results, fields) {
            if (error) {
                res.status(400).send(error.sqlMessage);
            } else {
                res.status(201).send("Successfully created new review! " + JSON.stringify(body));
            }
        });
    });

    //Update review
    /*
    {
      "review_id": 1,
      "rating":5,
      "comment":"",
      "hidden": 0
    }
    */
    app.put('/api/reviews', jsonParser, (req, res) => {
        const body = req.body;
        console.log(body);
    
        connection.query('UPDATE reviews SET rating = ?, comment = ?, hidden = ? WHERE review_id = ?',[body.rating, body.comment, body.hidden, body.review_id], function(error, results, fields) {
            if (error) {
                res.status(400).send(error.sqlMessage);
            } else {
                res.status(201).send("Successfully updated the account " + JSON.stringify(body));
            }
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
        user: 'testing',
        password: '',//DB Password
        database: 'music',
    });
    
    connection.connect();

    console.log("DB Connected");

    return connection;
}

app.get("/auth", async (req, res) => {

  var {access_token} = req.oauth;
  /*const response = await axios({
    method:"get",
    url:'http://localhost:3000/protected',
    headers: { Authorization: `Bearer ${access_token}` },
  });*/
  console.log("Token: " + req.oauth.access_token);
  res.json(access_token);
});
  app.get('/protected',checkJwt,(req,res)=>{
    res.json('You are in a protected path! See console for token.')
  })
  app.get('/admin',checkJwt,checkAdmin,(req,res)=>{
    res.json('You are in an administrative path! ... Fancy!')
  })
  app.listen(port, () => console.log("Started"));

  module.exports = app;