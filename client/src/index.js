console.log("test")

//************************************************************
//! Global Variables 
const state = {
    user: [],
    selected: null
}



//************************************************************
//? Form




//************************************************************
//? View Details
const view_details = () => {

    const viewTaskName = document.querySelector("#vt-task-name")

    const viewTaskImage = document.querySelector("#vt-task-img")
    const viewTaskDesc = document.querySelector("#vt-task-content")
    const viewTaskDl = document.querySelector("#vt-task-deadline")
    const viewTaskstatus = document.querySelector("#vt-task-status")
    const viewTaskCreated = document.querySelector("#vt-task-created")
    const viewTaskUpdated = document.querySelector("#vt-task-updated")
    const viewTaskPriority = document.querySelector("#vt-task-tag")


        viewTaskName.innerHTML = `${state.user.tasks[0].name}`
        viewTaskImage.setAttribute("src", `${state.user.tasks[0].image_url}`)
        viewTaskDesc.innerHTML = `${state.user.tasks[0].content}`
        viewTaskDl.innerHTML = `${state.user.tasks[0].deadline}`
        viewTaskCreated.innerHTML = `${state.user.tasks[0].created_at}`
        viewTaskUpdated.innerHTML = `${state.user.tasks[0].updated_at}`
    //! Status function
    if (state.user.tasks[0].status === true) {
        viewTaskstatus.setAttribute("class", "btn btn-secondary")
        viewTaskstatus.innerHTML = "Not Fixed"
    } else {
        viewTaskstatus.setAttribute("class", "btn btn-success")
        viewTaskstatus.innerHTML = "Resolved"
    }
    //! Priority Function
    if (state.user.tasks[0].tag === "Low") {
        viewTaskPriority.setAttribute("class", "btn btn-info")
        viewTaskPriority.innerHTML = "Low"
    } else if (state.user.tasks[0].tag === "Medium") {
        viewTaskPriority.setAttribute("class", "btn btn-warning")
        viewTaskPriority.innerHTML = "Medium"
    } else {
        viewTaskPriority.setAttribute("class", "btn btn-danger")
        viewTaskPriority.innerHTML = "High"
    }


}

const view_comment = () => { 
    const viewComments = document.querySelector(".list-group")
    



}
const renderCommentList = api => {
    const viewComments = document.querySelector(".list-group")
    const li = document.createElement('li')
    
    li.innerText = api.tasks.comments.content
    li.setAttribute("class", "list-group-item")

    viewComments.append(li)
}


const renderAllComments = () => {
    state.user.tasks.forEach(renderCommentList)
}


//************************************************************
//? Table




//************************************************************
//? User Summary



//************************************************************
//? Init

const init = () => {
    getUser()
    .then((user) => {
        state.user = user
        view_details()
    })
}

init()
//************************************************************


