const setBudgetForm = document.getElementById("setBudgetForm")
let setBudgetInput = document.getElementById("setBudgetInput")
let budgetTotal = document.getElementById("budgetTotal")
let budgetRemaining = document.getElementById("budgetRemaining")

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
        axios.post("/setbudget", body).then((result) => {
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
    axios.post("/calculateBudget", body).then((result) => {
        budgetRemaining.innerHTML = result.data
    }).catch((err) => {console.log(err)})
}

setBudgetForm.addEventListener("submit", setbudget)