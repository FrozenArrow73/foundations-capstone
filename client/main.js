const setBudgetForm = document.getElementById("setBudgetForm")
let setBudgetInput = document.getElementById("setBudgetInput")
let budgetTotal = document.getElementById("budgetTotal")
let budgetRemaining = document.getElementById("budgetRemaining")
let planName = document.getElementById("name")
let planCost = document.getElementById("cost")
let planDetails = document.getElementById("details")
let planForm = document.getElementById("planForm")


function setbudget (event) {
    event.preventDefault()
    let budgetInput = +(setBudgetInput.value)
    setBudgetInput.value = ""
    if (isNaN(budgetInput)) {
        alert("please enter a number")
    } else {
        let body = {
            input: budgetInput
        }
        axios.put("/setbudget", body).then((result) => {
            let dbTotal = result.data[0].total_budget
            budgetTotal.innerHTML = dbTotal
            updateBudgetRemaining()

        }).catch((err) => console.log(err))
    }
    
}

function updateBudgetRemaining() {
    let total = budgetTotal.innerHTML
    
    body = {
        total
    }
    axios.put("/calculateBudget", body).then((result) => {
        budgetRemaining.innerHTML = result.data
    }).catch((err) => {console.log(err)})
}

function addPlan (event) {
    event.preventDefault()

    let name = planName.value
    let cost = planCost.value
    let details = planDetails.value

    body = {
        name,
        cost,
        details
    }

    axios.post("/addPlan", body).then((result) => {
        refreshPage()
    })
}

function refreshPage () {
    //write a function that updates all the information on the page
}

refreshPage()
setBudgetForm.addEventListener("submit", setbudget)
planForm.addEventListener("submit", addPlan)