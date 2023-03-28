const setBudgetForm = document.getElementById("setBudgetForm")
let setBudgetInput = document.getElementById("setBudgetInput")
let totalBudget = document.getElementById("totalBudget")
let budgetRemaining = document.getElementById("budgetRemaining")

function setbudget (event) {
    event.preventDefault()
    let budgetInput = setBudgetInput.value
    setBudgetInput.value = ""
    let body = {
        input: budgetInput
    }
    axios.post("http://localhost:4000/setbudget", body).then((result) => {
        //----------------------------------------------------------------------needs to be finished
    }).catch((err) => console.log(err))

}

function updateBudgetRemaining() {

}

setBudgetForm.addEventListener("submit", setbudget)