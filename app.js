// load app server using express
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')

app.use(express.static('./public'))

app.use(morgan('combined'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

function getConnection () {
    return connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'UserPurchases'
    })
}

// POST REQUESTS HERE
app.post('/create-user', (req, res) => {
    console.log("trying to create a new user" + req.body.username + ' ' + req.body.password)
    const username = req.body.username
    const password = req.body.password

    const queryString = "INSERT INTO users (username, password) VALUES (?,?)"
    getConnection().query(queryString, [username, password], (err, results, fields) => {
        if (err) {
            console.log("failed to create new user: " + err)
            res.sendStatus(500);
            return
        } 

        res.sendStatus(200);
        console.log("inserted new user with id: " + results.insertedID)
    })
})

app.post("/user-login", (req,res) => {
    console.log("compare creds");

    const connection = getConnection();

    const username = req.body.username;
    const password = req.body.password;
    const querystring = "SELECT * FROM users WHERE username = ? AND password = ?"
    connection.query(querystring, [username, password], (err, rows, fields) => {
        if (err) {
            console.log("failed to query for users: " + err)
            res.sendStatus(500);
            return
        }
        if(!rows.length) {
            res.sendStatus(400); 
            return
        }
        console.log("logged in properly")
        res.json(rows)
    })
})

app.post('/add-purchase', (req, res) => {
    console.log("trying to create a new user")
    const username = req.body.username
    const item_name = req.body.item_name
    const quantity = req.body.quantity
    const price_per_unit = req.body.price_per_unit
    const date = req.body.date

    const queryString = "INSERT INTO purchases (username, item_name, quantity, price_per_unit, date) VALUES (?,?,?,?,?)"
    getConnection().query(queryString, [username, item_name, quantity, price_per_unit, date], (err, results, fields) => {
        if (err) {
            console.log("failed to add purchase: " + err)
            res.sendStatus(500);
            res.end();
            return
        } 

        res.sendStatus(200);
        console.log("inserted new purchase for user with id: " + results.insertedID)
    })
})

// GET REQUESTS HERE
// (request, response)
app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from root")
})

app.get("/user/:user_id", (req,res) => {
    console.log("Fetch user with id: "+req.params.user_id)

    const connection = getConnection();

    const userID = req.params.user_id
    const querystring = "SELECT * FROM users WHERE user_id = ?"
    connection.query(querystring, [userID], (err, rows, fields) => {
        if (err) {
            console.log("failed to query for users: " + err)
            res.sendStatus(500);
            res.end()
            return
        }

        console.log("fetched users properly")
        res.json(rows)
    })
})

app.get("/users", (req, res) => {
    console.log("fetching all users")
    
    const connection = getConnection();

    connection.query( "SELECT * FROM users", (err, rows, fields) => {
        if (err) {
            console.log("failed to query for users: " + err)
            res.sendStatus(500);
            res.end();
            return;
        }
        
        console.log("fetched users properly")
        res.json(rows)
    })
    // res.send("nodemon should update")
})

app.get("/purchases/:username", (req,res) => {
    console.log("fetching all purposes for user with id: " + req.param.username)

    const connection = getConnection();

    const username = req.params.username
    const querystring = "SELECT purchase_id, item_name, quantity, price_per_unit, date FROM purchases WHERE username = ?"
    connection.query(querystring, [username], (err, rows, fields) => {
        if (err) {
            console.log("failed to query for users: " + err)
            res.sendStatus(500);
            res.end()
            return
        }
        res.json(rows)
    })
})

app.get("/purchases", (req,res) => {
    console.log("fetching all purchases")

    const connection = getConnection();

    connection.query( "SELECT * FROM purchases", (err, rows, fields) => {
        if (err) {
            console.log("failed to query for purchases: " + err)
            res.sendStatus(500);
            res.end();
            return;
        }
        
        console.log("fetched purchases properly")
        res.json(rows)
    })
})

// localhost: 5000
app.listen(5000, () => {
    console.log("Server is up and listening on 5000")
})