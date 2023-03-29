require("dotenv").config()
const express = require('express')
const app = express()
app.use(express.json())

app.use(express.static(`${__dirname}/../client`))

const {setBudget, calculateBudget} = require("./controller.js")
const {SERVER_PORT, CONNECTION_STRING} = process.env

app.post("/setBudget", setBudget)
app.post("/calculateBudget", calculateBudget)



app.listen(SERVER_PORT, () => {
    console.log(`server is running on ${SERVER_PORT}`)
})