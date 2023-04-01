require("dotenv").config()
const express = require('express')
const app = express()
app.use(express.json())

app.use(express.static(`${__dirname}/../client`))

const {setBudget, calculateBudget, addPlan, refresh} = require("./controller.js")
const {SERVER_PORT, CONNECTION_STRING} = process.env

app.put("/setBudget", setBudget)
app.get("/calculateBudget", calculateBudget)
app.post("/addPlan", addPlan)
app.get("/refresh", refresh)



app.listen(SERVER_PORT, () => {
    console.log(`server is running on ${SERVER_PORT}`)
})