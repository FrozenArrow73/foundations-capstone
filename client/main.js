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
        axios.post("http://localhost:4000/setbudget", body).then((result) => {
            let dbTotal = result.data[0].total_budget
            budgetTotal.innerHTML = dbTotal
            updateBudgetRemaining()

        }).catch((err) => console.log(err))
    }
    
}

function updateBudgetRemaining() {
    body = {
        budgetTotal
    }
    axios.post("http://localhost:4000/calculateBudget", body).then(
        //------------------------------------------------------------------------needs to be completed
    ).catch((err) => {console.log(err)})
}

setBudgetForm.addEventListener("submit", setbudget)