require('dotenv').config()
var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'mydb'
// });

//for test
const connection = mysql.createConnection(process.env.DATABASE_URL);

var app = express()
app.use(cors())
app.use(express.json())

app.get('/users', function (req, res, next) {
    connection.query(
        'SELECT * FROM `users`',
        function(err, results, fields) {
            res.json(results);
        }
    );
})

app.get('/users/:id', function (req, res, next) {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM `users` WHERE `id` = ? LIMIT 1',
        [id],
        function(err, results) {
            // if (error) throw error;
                return res.send( {status: "ok", user: results[0]});
                // return res.send( results[0] );
        }
    );
})

//for test
// Retrieve user with id 
// app.get('/users/:id', function (req, res) {
//     let user_id = req.params.id;
//     if (!user_id) {
//     return res.status(400).send({ error: true, message: 'Please provide user_id' });
//     }
//     connection.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
//     if (error) throw error;
//     return res.send({ error: false, user: results[0], message: 'users list.' });
//     });
//     });

// app.get('/users/:id', function(req, res, next) {
//     const id = parseInt(req.params.id);
//     connection.query(
//         'SELECT * FROM `users` WHERE `id` = ?',
//         [id],
//         function(err, results) {
//             res.json(results);
//         }
//     );
//   })


// app.get('/users/:id', async(req, res) => {
//     const id = parseInt(req.params.id);
//     const user = connection.query(
//         'SELECT * FROM `users` WHERE `id` = ?',
//         [id],
//         function(err, results) {
//             res.json(results);
//         }
//     )
//   })

//for test
// app.get("/users/:id", async(req, res) => {
//     const id = req.params.id;
//     try {
//         connection.query( "SELECT * from `users` WHERE id = ?", [id], (err, results, fields) => {
//             if(err) {
//                 console.log(err);
//                 return res.status(400).send();
//             }
//             res.json(results)
//         }
//         )
//     } catch(err) {
//         console.log(err);
//         return res.status(500).send();
//     }
// })


app.post('/users', function (req, res, next) {
    connection.query(
        'INSERT INTO `users`(`fname`, `lname`, `username`, `password`, `avatar`) VALUES (?, ?, ?, ?, ?)',
        [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar],
        function(err, results) {
            res.json(results);
        }
    );
})

app.put('/users', function (req, res, next) {
    connection.query(
        'UPDATE `users` SET `fname`=?, `lname`=?, `username`=?, `password`=?, `avatar`=? WHERE id = ?',
        [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar, req.body.id],
        function(err, results) {
            res.json(results);
        }
    );
})

app.delete('/users', function (req, res, next) {
    connection.query(
        'DELETE FROM `users` WHERE id = ?',
        [req.body.id],
        function(err, results) {
            res.json(results);
        }
    );
})

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})