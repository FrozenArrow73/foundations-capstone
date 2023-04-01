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
        sequelize.query(`
            SELECT  total_budget
            FROM budgets
            WHERE budget_id = 1;
        `).then((dbRes) => {
            let dbTotal = dbRes[0][0].total_budget
            sequelize.query(`
                SELECT cost
                FROM plans;
            `).then((dbRes2) => {
                costArr = dbRes2[0]
                if(costArr.length === 0) {
                    sequelize.query(`
                    UPDATE budgets 
                    SET budget_remaining = ${dbTotal}
                    WHERE budget_id = 1;
                    `)
                    res.sendStatus(200)
                    return
                }
                let totalCost = 0
                costArr.forEach(element => {
                    totalCost += element.cost
                })
                let totalRemaining = dbTotal - totalCost
                sequelize.query(`
                    UPDATE budgets 
                    SET budget_remaining = ${totalRemaining}
                    WHERE budget_id = 1;
                `)
                res.sendStatus(200)
            })
        })
    },

    addPlan: (req, res) => {
        const {name, cost, details} = req.body
        sequelize.query(`
            INSERT INTO plans (title, cost, details)
            VALUES ('${name}', ${cost}, '${details}')
        `).then((dbRes) => {
            res.sendStatus(200)
        })
    },

    refresh: (req, res) => {
        sequelize.query(`
            SELECT  * 
            FROM budgets
        `).then((dbRes) => {
            console.log(dbRes[0][0])
            let budgetTotal = dbRes[0][0].total_budget
            let budgetRemaining = dbRes[0][0].budget_remaining
            sequelize.query(`
                SELECT *
                FROM plans
            `).then((dbRes2) => {
                if(dbRes2[0].length === 0) {
                    let body = {
                        budgetTotal,
                        budgetRemaining
                    }
                    res.status(200).send(body)
                }else{
                    let body = {
                        budgetTotal,
                        budgetRemaining,
                        plans: dbRes2[0]
                    }
                    res.status(200).send(body)
                }
            })
        })
    }
}