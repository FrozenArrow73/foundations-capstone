const setBudgetForm = document.getElementById("setBudgetForm")
let setBudgetInput = document.getElementById("setBudgetInput")
let budgetTotal = document.getElementById("budgetTotal")
let budgetRemaining = document.getElementById("budgetRemaining")
let planName = document.getElementById("name")
let planCost = document.getElementById("cost")
let planDetails = document.getElementById("details")
let planForm = document.getElementById("planForm")
let list = document.querySelector("ul")


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
    }).catch((err) => {console.log(err)})
}

function refreshPage () {
    //write a function that updates all the information on the page
    axios.get("/refresh").then((result) => {
        //take data from result.data and update the page
        if(result.data.plans === undefined) {
            budgetTotal.innerHTML = result.data.budgetTotal
            budgetRemaining.innerHTML = result.data.budgetRemaining
            list.innerHTML = ""
        } else {
            //make the rest of the function
            
            budgetTotal.innerHTML = result.data.budgetTotal
            budgetRemaining.innerHTML = result.data.budgetRemaining
            list.innerHTML = ""
            result.data.plans.forEach(plan => {
                li = document.createElement("li")
                pName = document.createElement("p")
                pCost = document.createElement("p")
                pDetails = document.createElement("p")

                pName.innerHTML = plan.title
                pCost.innerHTML = plan.cost
                pDetails.innerHTML = plan.details

                li.appendChild(pName)
                li.appendChild(pCost)
                li.appendChild(pDetails)

                list.appendChild(li)
                
            });

            
        }
    }).catch((err) => {
        console.log(err)

    })
}

refreshPage()
setBudgetForm.addEventListener("submit", setbudget)
planForm.addEventListener("submit", addPlan)