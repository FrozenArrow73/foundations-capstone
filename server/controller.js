require("dotenv").config()
const {CONNECTION_STRING} = process.env
let Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  })

module.exports = {
    setBudget: (req, res) => {
        if(!isNaN(req.body.input)) {
            sequelize.query(`
            UPDATE budgets 
            SET total_budget = ${req.body.input}
            WHERE budget_id = 1;
            `).then(() => {
                sequelize.query(`
                SELECT *
                FROM budgets
                WHERE budget_id = 1;
                `).then((dbRes) => {
                    console.log(dbRes[0])
                    res.status(200).send(dbRes[0])
                })
            })
        } else {
            res.sendStatus(400)
            return
        }
        console.log(req.body.input)
    },
    
    
    calculateBudget: (req, res) => {
        let reqTotal = req.body.total
        sequelize.query(`
            SELECT  budget_remaining
            FROM budgets
            WHERE budget_id = 1;
        `).then((dbRes) => {
            let dbRemaining = dbRes[0][0].budget_remaining
            sequelize.query(`
                SELECT cost
                FROM plans;
            `).then((dbRes2) => {
                costArr = dbRes2[0]
                console.log(costArr)
                if(costArr.length === 0) {
                    res.status(200).send(reqTotal)
                }
                let totalCost = 0
                costArr.forEach(element => {
                    totalCost += element
                })
                let totalRemaining = reqTotal - totalCost
                res.status(200).send(totalRemaining)
            })
        })
    }
}