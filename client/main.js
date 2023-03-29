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
            console.log(result.data[0].budget_id)
            let dbTotal = result.data[0].total_budget
            budgetTotal.innerHTML = dbTotal

        }).catch((err) => console.log(err))
    }

}

function updateBudgetRemaining() {

}

setBudgetForm.addEventListener("submit", setbudget)