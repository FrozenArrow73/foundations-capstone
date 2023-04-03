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
let modalSubmit = document.getElementById("modalSubmit")
let modalName = document.getElementById("modalName")
let modalCost = document.getElementById("modalCost")
let modalDetails = document.getElementById("modalDetails")
let modalClose = document.getElementById("modalClose")


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
    if (name === "" || cost === "" || details === "") {
        alert("all inputs are required.")
    } else {
        body = {
            name,
            cost,
            details
        }

        axios.post("/addPlan", body).then((result) => {  
            updateBudgetRemaining()
        }).catch((err) => {console.log(err)})
    }
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
                editBtn.setAttribute("plan_id", plan.plan_id)
                editBtn.addEventListener("click", openModal)
                

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

function openModal (event) {
    let editBtn = event.srcElement
    let planId = editBtn.getAttribute("plan_id")

    axios.get("/refresh").then((result) => {
        result.data.plans.forEach((plan)=>{
            if(plan.plan_id === +planId) {
                modalName.value = plan.title
                modalCost.value = plan.cost
                modalDetails.value = plan.details
                modalSubmit.setAttribute("plan_id", planId)

                modal.showModal()

            }
        })
    }).catch((err) => {console.log(err)})
}

function editPlan (event) {
    console.log("I ran")
    let submitBtn = event.srcElement
    let name = modalName.value
    let cost = modalCost.value
    let details = modalDetails.value

    if(name === "" || cost === "" || details === "") {
        event.preventDefault()
        alert("All inputs are required.")
    }else if (isNaN(+cost)) {
        event.preventDefault()
        alert("Cost must be a number")
    } else {
        let id = modalSubmit.getAttribute("plan_id")
        body = {
            id,
            name,
            cost,
            details
        }
        axios.put("/editPlan", body).then((result) => {
            updateBudgetRemaining()
        }).catch((err)=> {console.log(err)})
    }
}

function close () {
    modal.close()
}


refreshPage()
setBudgetForm.addEventListener("submit", setbudget)
planForm.addEventListener("submit", addPlan)
modal.addEventListener("submit", editPlan)
modalClose.addEventListener("click", close)

