const setBudgetForm = document.getElementById("setBudgetForm")
let setBudgetInput = document.getElementById("setBudgetInput")
let budgetTotal = document.getElementById("budgetTotal")
let budgetRemaining = document.getElementById("budgetRemaining")
let planName = document.getElementById("name")
let planCost = document.getElementById("cost")
let planDetails = document.getElementById("details")
let planForm = document.getElementById("planForm")
let list = document.querySelector("ul")
let modal = document.querySelector("dialog")


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

        }).catch((err) => {console.log(err)})
    }
    
}

function updateBudgetRemaining() {
    axios.get("/calculateBudget").then((result) => {
        refreshPage()
    }).catch((err) => {console.log(err)})
}

function addPlan (event) {
    event.preventDefault()

    let name = planName.value
    let cost = planCost.value
    let details = planDetails.value
    planName.value = ""
    planCost.value = ""
    planDetails.value = ""

    body = {
        name,
        cost,
        details
    }

    axios.post("/addPlan", body).then((result) => {  
        updateBudgetRemaining()
    }).catch((err) => {console.log(err)})
}

function refreshPage () {
    //write a function that updates all the information on the page
    axios.get("/refresh").then((result) => {
        //if there are no costs then update only the budget total and remaining
        if(result.data.plans === undefined) {
            budgetTotal.innerHTML = result.data.budgetTotal
            budgetRemaining.innerHTML = result.data.budgetRemaining
            list.innerHTML = ""
        } else {
            //if there are costs then update the whole page
            
            budgetTotal.innerHTML = result.data.budgetTotal
            budgetRemaining.innerHTML = result.data.budgetRemaining
            list.innerHTML = ""
            result.data.plans.forEach(plan => {
                let li = document.createElement("li")
                let pName = document.createElement("p")
                let pCost = document.createElement("p")
                let pDetails = document.createElement("p")
                let deleteBtn = document.createElement("button")
                let editBtn = document.createElement("button")
                let pSection = document.createElement("section")
                let btnSecton = document.createElement("section")

                pSection.classList.add("pSection")
                btnSecton.classList.add("btnSection")

                deleteBtn.setAttribute("plan_id", plan.plan_id)
                deleteBtn.innerHTML = "Delete"
                deleteBtn.addEventListener("click", deleteItem)

                editBtn.innerHTML = "Edit"
                

                pName.innerHTML = plan.title
                pCost.innerHTML = plan.cost
                pDetails.innerHTML = plan.details

                pSection.appendChild(pName)
                pSection.appendChild(pCost)
                pSection.appendChild(pDetails)
                btnSecton.appendChild(deleteBtn)
                btnSecton.appendChild(editBtn)

                li.appendChild(pSection)
                li.appendChild(btnSecton)

                list.appendChild(li)
                
            });

            
        }
    }).catch((err) => {
        console.log(err)

    })
}

function deleteItem (event) {
    let deleteBtn = event.srcElement
    let planId = deleteBtn.getAttribute("plan_id")
    deleteBtn.parentNode.remove()

    
    axios.delete(`/deletePlan/${planId}`).then((result) => {
        updateBudgetRemaining()
    }).catch((err) => {
        console.log(err)
    })
}
let showDialog = document.querySelector("#show")
showDialog.addEventListener("click", (event) => {
    modal.show()
})

refreshPage()
setBudgetForm.addEventListener("submit", setbudget)
planForm.addEventListener("submit", addPlan)

