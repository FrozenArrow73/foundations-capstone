const setBudgetForm = document.getElementById(setBudgetForm)
let setBudgetInput = document.getElementById(setBudgetInput)



function setbudget (event) {
    event.preventDefault()

    updateBudgetRemaining()
}

function updateBudgetRemaining() {

}

setBudgetForm.addEventListener("submit", setbudget)