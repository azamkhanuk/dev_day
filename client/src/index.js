//************************************************************
//! Global Variables 
const state = {
    user: [],
    assigners: [],
    selected: null,
    comments: []
}

const page_u = document.querySelector('#page-container')
const tableBody = document.querySelector('#table-body')
const view_u = document.querySelector('#view-task')
const tableDiv = document.querySelector('#task-table')
const formDiv = document.querySelector('#new-task')
const viewComments = document.querySelector(".list-group")
let counter = 1




//************************************************************
//? New Form

const formToggle = () => {
     const newTask = document.querySelector('#new-task-btn')
     newTask.addEventListener('click', () => {
        if (formDiv.style.display === "none") {
            formDiv.style.display = "block"
            view_u.style.display = "none"
            tableDiv.style.display = "none"
        } else {
            formDiv.style.display = "none"
            view_u.style.display = "none"
            tableDiv.style.display = "block"          
        }
     })
}


const createForm = () => {
    submitBtn = document.querySelector('#new-form-submit')
    form = document.querySelector('#form-task')

    getAssigners()
    .then((data) => {
        state.assigners = data
        renderAssigners()
    })

    submitBtn.addEventListener('click', event => {
        event.preventDefault()
        const task = {
            user_id: 1,
            assigner_id: optionsValue(),
            name: document.querySelector('#input-name').value,
            content: document.querySelector('#input-content').value,
            image_url: document.querySelector('#input-image').value,
            deadline: formatDate(document.querySelector('#input-deadline').value),
            status: true,
            tag: document.querySelector('.btn-secondary.active').innerText
        }

        createTask(task)
        .then((data) => {
            state.user.tasks.push(data)
            render_task(data)
        })

        form.reset()
        formDiv.style.display = "none"
        tableDiv.style.display = "block"
    })
}

const optionsValue = () => {
    const sel = document.getElementById('assigner-select')
    const opt = sel.options[sel.selectedIndex]
    const value = parseInt(opt.value)
    return value
}

const renderAssigner = assigner => {
    const assignerSelect = document.getElementById('assigner-select')
    assignerSelect.innerHTML += `
    <option value=${assigner.id}>${assigner.name}</option>
    `
}

const renderAssigners = () => {
    const assignerSelect = document.getElementById('assigner-select')
    assignerSelect.innerHTML = ''
    state.assigners.forEach(renderAssigner)
}

const formatDate = date => {
    date = date.match(/\d+/g).map(Number)
    return `${date[4]}-${date[2]}-${date[3]}T${date[0]}:${date[1]}:00.000Z`
}

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


        viewTaskName.innerHTML = `${state.selected.name}`
        viewTaskImage.setAttribute("src", `${state.selected.image_url}`)
        viewTaskDesc.innerHTML = `${state.selected.content}`
        viewTaskDl.innerHTML = `${moment(state.selected.deadline).format("DD/MM/YY - hh:mm A")}`
        viewTaskCreated.innerHTML = `${moment(state.selected.created_at).format("DD/MM/YY - hh:mm A")}`
        viewTaskUpdated.innerHTML = `${moment(state.selected.updated_at).format("DD/MM/YY - hh:mm A")}`

    //! Status function
    if (state.selected.status === true) {
        viewTaskstatus.setAttribute("class", "btn btn-secondary")
        viewTaskstatus.innerHTML = "Pending"
    } else {
        viewTaskstatus.setAttribute("class", "btn btn-success")
        viewTaskstatus.innerHTML = "Resolved"
    }
    //! Priority Function
    if (state.selected.tag === "Low") {
        viewTaskPriority.setAttribute("class", "btn btn-info")
        viewTaskPriority.innerHTML = "Low"
    } else if (state.selected.tag === "Medium") {
        viewTaskPriority.setAttribute("class", "btn btn-warning")
        viewTaskPriority.innerHTML = "Medium"
    } else {
        viewTaskPriority.setAttribute("class", "btn btn-danger")
        viewTaskPriority.innerHTML = "High"
    }
    getAssigner()
    newComment()
    updateTaskStatus()
}

const updateTaskStatus = () => {
    const viewTaskstatus = document.querySelector("#vt-task-status")
    viewTaskstatus.addEventListener('click', () => {
        if (state.selected.status === true) {
            viewTaskstatus.setAttribute("class", "btn btn-success")
            viewTaskstatus.innerHTML = "Resolved"
            state.selected.status = false
            updateTask(state.selected)
            getUser()
                .then((user) => {
                    state.user = user
                    render_tasks()
            })
        } else {
            viewTaskstatus.setAttribute("class", "btn btn-secondary")
            viewTaskstatus.innerHTML = "Pending"
            state.selected.status = true
            updateTask(state.selected)
            getUser()
                .then((user) => {
                    state.user = user
                    render_tasks()
            })
        }
    })
}

const newComment = () => {
    const commentBtn = document.querySelector('#add-comment-btn')
    const commentDiv = document.querySelector('#comment-box')
    const commentText = document.querySelector('#add-comment-box')
    const submitBtn = document.querySelector('#new-comment-submit')

    commentBtn.addEventListener('click', () => {
        if (commentDiv.style.display === "none") {
            commentDiv.style.display = "block"
        } else {
            commentDiv.style.display = "none"        
        }
        submitBtn.addEventListener('click', () => {
            const comment = {
                content: commentText.value,
                task_id: state.selected.id
            }

            createComment(comment)
                .then((data) =>{
                    state.comments.push(data)
                    renderAllComments(state.comments)
                    commentText.value = ''
                    commentDiv.style.display = "none" 
                })
        })
    })
}

const renderCommentList = comment => {
    const li = document.createElement('li')
    
    li.innerHTML = `<strong>${comment.content}</strong> <br><br> <figcaption class="figure-caption">${moment(comment.created_at).format("DD/MM/YY - hh:mm A")}</figcaption>`
    li.setAttribute("class", "list-group-item")

    viewComments.append(li)
}


const renderAllComments = (state) => {
    viewComments.innerHTML = '' 
    state.forEach(renderCommentList)
}

const getAssigner = () => {
    getAssigners()
    .then((data) => {
        state.assigners = data
        const assignerTitle = document.querySelector('#vt-user-title')
        const assignerName = document.querySelector('#vt-user-name')
        const assignerImg = document.querySelector('#vt-user-img') 

        const assigner = state.assigners.find(user => user.id === state.selected.assigner_id)
        
        assignerTitle.innerHTML = ` &ensp; ${assigner.title}`
        assignerName.innerHTML = ` &ensp; ${assigner.name}`
        assignerImg.setAttribute("src",`${assigner.image_url}`)
    })
}

//************************************************************
//? Table
const render_tasks = () => {
    counter = 1
    tableBody.innerHTML = ''
    state.user.tasks.forEach(render_task)
}

const render_task = (task) => {
    const tr = document.createElement('tr')
    tr.innerHTML = `
    <th scope="row">${counter}</th>
    <td>${task.name}</td>
    <td>${task.content}</td>
    <td>${moment(task.deadline).format("DD/MM/YY - hh:mm A")}</td>
    <td>${task.tag}</td>
    `

    if (task.status){
        tr.innerHTML += `<td>Pending</td>`
    } else{
        tr.innerHTML += `<td>Resolved</td>`
    }

    tr.innerHTML += `
    <td>
        <input class="btn btn-default" id="view-button" type="button" value="V">
        <input class="btn btn-default" id="edit-button" type="button" value="E">
        <input class="btn btn-default" id="delete-button" type="button" value="D">
    </td>
    `

    counter++

    tableBody.appendChild(tr)

    const viewBtn = tr.querySelector('#view-button')
    viewBtn.addEventListener('click', () => {
        if (view_u.style.display === "none") {
            view_u.style.display = "block"
            state.selected = task
            view_details()
            getComments(state.selected)
            .then((data) => {
                state.comments = data
                if (viewComments.childElementCount === state.comments.length){
                    state.comments = []

                } else {
                    renderAllComments(state.comments)
                }
            })
          } else {
            view_u.style.display = "none"
            state.selected = null
            state.comments = []
          }
    })

    const delBtn = tr.querySelector('#delete-button')
    delBtn.addEventListener('click', () => {
        deleteTask(task)
        tr.remove()
        counter --
    })

    // const edit = tr.querySelector('#edit-button')
    // edit.addEventListener('click', () => {
    //     state.selected = task

    //     const editForm = document.querySelector('#edit-task')
    //     tableDiv.style.display = 'none'
    //     editForm.style.display = 'block'

    //     document.querySelector('#edit-name').value = state.selected.name
    //     document.querySelector('#edit-content').value = state.selected.content
    //     document.querySelector('#edit-image').value = state.selected.image_url

    //     const 'edit-form-submit'
    //     const newTask = {
    //         user_id: 1,
    //         name: document.querySelector('#edit-name').value,
    //         content: document.querySelector('#edit-content').value,
    //         image_url: document.querySelector('#edit-image').value,
    //         deadline: formatDate(document.querySelector('#edit-deadline').value),
    //         status: true,
    //         tag: document.querySelector('.btn-secondary.active').innerText
    //     }
    //     tr.remove()
    //     updateTask(newTask)
    //         .then(render_task(newTask))
    // })
}

const homepage = () => {
    const devDay = document.querySelector('#nav-brand')
    devDay.addEventListener('click', () => {
        if (formDiv.style.display === "block" || view_u.style.display === "block") {
            formDiv.style.display = "none"
            view_u.style.display = "none"
            tableDiv.style.display = "block"
        }
    })
}

//************************************************************
//? User Summary
const summary_tab = () => {
    const welcome = document.querySelector('#user-welcome')
    const tasksLeft = document.querySelector('#tasks-summary')
    const timeLeft = document.querySelector('#timeLeft-summary')

    dl = state.user.tasks[0].deadline
    dl = moment(dl)
    ct = moment()
    diff = moment.duration(dl.diff(ct))

    welcome.innerText = `${state.user.name} - ${state.user.title}`
    tasksLeft.innerHTML = `You have <strong>${state.user.tasks.length}</strong> tasks`
    timeLeft.innerHTML = `${state.user.tasks[0].name} is due in <strong>${diff._data.hours} hrs ${diff._data.minutes} mins</strong>`
}
//************************************************************
//? View Team

const render_team = member => {
    const viewTeamBtn = document.querySelector('#view-team-btn')
    const employees = document.querySelector('#employee-cards')

    employeeCard = document.createElement('div')

    employeeCard.innerHTML = 
    `
    <div class="row">
        <div class="col-md-4">
            <div class="single-team">
                <img src="${member.image_url}" alt="">
                <div class="team-hover">
                    <h4>${member.name} <span>${member.title}</span><span>${member.location}</span></h4>
                </div>
            </div>
        </div>
    </div>
    `
    employeeCard.append(employees)
}

const render_employees = () => {
	state.assigners.forEach(render_team)
}



//************************************************************
//? Init

const init = () => {
    getUser()
    .then((user) => {
        state.user = user

        summary_tab()
        render_tasks()
        formToggle()
        render_employees()
    })
    createForm()
    homepage()
    
    
}

init()

//************************************************************



// moment(taskdeadline).toObject()

// dl = state.user.tasks[0].deadline
// cr = state.user.tasks[0].created_at
// dl = moment(dl)
// cr = moment(cr)
// dl < cr => false
// diff = moment.duration(dl.diff(cr))
// diff._data.hours

