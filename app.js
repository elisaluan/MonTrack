// load app server using express
const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(morgan('combined'))

// request response
app.get("/", (req, res) => {
    console.log("Responding to route route")
    res.send("Hello from root")
})

app.get("/users", (req, res) => {
    var user1 ={username: "Me", age:19}
    const user2 ={username: "You", age:20}
    res.json({user1, user2})
    // res.send("nodemon should update")
})

// localhost: 5000
app.listen(5000, () => {
    console.log("Server is up and listening on 5000")
})