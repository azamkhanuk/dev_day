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
const editForm = document.querySelector('#edit-task')
const viewTeamDiv = document.querySelector('#view-team-div')


let counter = 1

const homepage = () => {
    const devDay = document.querySelector('#nav-brand')
    devDay.addEventListener('click', () => {
        if (formDiv.style.display === "block" || view_u.style.display === "block" || editForm.style.display === 'block' || viewTeamDiv.style.display === 'block') {
            formDiv.style.display = "none"
            view_u.style.display = "none"
            editForm.style.display = 'none'
            viewTeamDiv.style.display = 'none'
            tableDiv.style.display = "block"
          }
    })
}

//************************************************************
//? New Form

const formToggle = () => {
     const newTask = document.querySelector('#new-task-btn')
     newTask.addEventListener('click', () => {
        if (formDiv.style.display === "none") {
            formDiv.style.display = "block"
            view_u.style.display = "none"
            editForm.style.display = 'none'
            tableDiv.style.display = "none"
            viewTeamDiv.style.display = 'none'
        } else {
            formDiv.style.display = "none"
            view_u.style.display = "none"
            editForm.style.display = 'none'
            viewTeamDiv.style.display = 'none'
            tableDiv.style.display = "block"          
        }
     })
}


const createForm = () => {
    submitBtn = document.querySelector('#new-form-submit')
    form = document.querySelector('#form-task')

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
    viewTaskstatus.addEventListener('dblclick', () => {
        if (state.selected.status) {

            viewTaskstatus.setAttribute("class", "btn btn-success")
            viewTaskstatus.innerHTML = "Resolved"
            state.selected.status = false

            updateTask(state.selected)

            state.user.tasks = state.user.tasks.filter(test => test.id != state.selected.id)
            state.user.tasks.push(state.selected)

            render_tasks()

        } else {

            viewTaskstatus.setAttribute("class", "btn btn-secondary")
            viewTaskstatus.innerHTML = "Pending"
            state.selected.status = true

            updateTask(state.selected)

            state.user.tasks = state.user.tasks.filter(test => test.id != state.selected.id)
            state.user.tasks.push(state.selected)

            render_tasks()
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
        const assignerTitle = document.querySelector('#vt-user-title')
        const assignerName = document.querySelector('#vt-user-name')
        const assignerImg = document.querySelector('#vt-user-img') 

        const assigner = state.assigners.find(user => user.id === state.selected.assigner_id)
        
        assignerTitle.innerHTML = ` &ensp; ${assigner.title}`
        assignerName.innerHTML = ` &ensp; ${assigner.name}`
        assignerImg.setAttribute("src",`${assigner.image_url}`)
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

    const assigner = state.assigners.find(user => user.id === task.assigner_id)
    const user = state.assigners.find(user => user.id === task.user_id)

    tr.innerHTML = `
    <th scope="row">${counter}</th>
    <td>${task.name}</td>
    <td>${assigner.name}</td>
    <td>${user.name}</td>
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
        <input class="btn btn-dark" id="view-button" type="button" value="View">
        <input class="btn btn-dark" id="edit-button" type="button" value="Edit">
        <input class="btn btn-dark" id="delete-button" type="button" value="Delete">

    </td>
    `

    counter++

    tableBody.appendChild(tr)

    const viewBtn = tr.querySelector('#view-button')
    viewBtn.addEventListener('click', () => {
        if (view_u.style.display === "none") {
            view_u.style.display = "block"
            editForm.style.display = 'none'
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
        tr.remove()
        counter --

        deleteTask(task)
        state.user.tasks = state.user.tasks.filter(test => test.id != task.id)
        render_tasks()
    })

    const edit = tr.querySelector('#edit-button')
    edit.addEventListener('click', () => {
        if (editForm.style.display === 'none') {
            editForm.style.display = 'block'
            view_u.style.display = "none"
            document.querySelector('#edit-name').value = task.name
            document.querySelector('#edit-content').value = task.content
            document.querySelector('#edit-image').value = task.image_url
            document.querySelector('#edit-deadline').value = task.deadline
    
            const editSubmitBtn = document.querySelector('#edit-form-submit')
            
            editSubmitBtn.addEventListener('click', () => {
                const newTask = {
                    id: task.id,
                    user_id: 1,
                    assigner_id: optionsEditValue(),
                    name: document.querySelector('#edit-name').value,
                    content: document.querySelector('#edit-content').value,
                    image_url: document.querySelector('#edit-image').value,
                    deadline: formatDate(document.querySelector('#edit-deadline').value),
                    status: task.status,
                    tag: document.querySelector('.btn-secondary.active').innerText
                }
    
                tr.remove()
                updateTask(newTask)
                state.user.tasks = state.user.tasks.filter(test => test.id != task.id)
                state.user.tasks.push(newTask)

                render_tasks()
                editForm.style.display = 'none'
            })
        } else {
            editForm.style.display = 'none'
        }
    })
}

const optionsEditValue = () => {
    const sel = document.getElementById('assigner-edit-select')
    const opt = sel.options[sel.selectedIndex]
    const value = parseInt(opt.value)
    return value
}

const renderEditAssigners = () => {
    const assignerSelect = document.getElementById('assigner-edit-select')
    assignerSelect.innerHTML = ''
    state.assigners.forEach(renderEditAssigner)
}

const renderEditAssigner = assigner => {
    const assignerSelect = document.getElementById('assigner-edit-select')
    assignerSelect.innerHTML += `
    <option value=${assigner.id}>${assigner.name}</option>
    `
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
    const employees = document.querySelector('#employee-card-row')

    employeeCard = document.createElement('div')
    employeeCard.className = "col-md-4"
    employeeCard.innerHTML = 
    `
            <div class="single-team">
                <img src="${member.image_url}" alt="">
                <div class="team-hover">
                    <h4>${member.name} <span>${member.title}</span><span>${member.location}</span></h4>
                </div>
            </div>
    `
    employees.append(employeeCard)
}

const render_employees = () => {
	state.assigners.forEach(render_team)
}

const viewTeamToggle = () => {
    const viewTeamBtn = document.querySelector('#view-team-btn')
    viewTeamBtn.addEventListener('click', () => {
        if (viewTeamDiv.style.display === 'none') {
            viewTeamDiv.style.display = 'block'
            formDiv.style.display = "none"
            view_u.style.display = "none"
            editForm.style.display = 'none'
            tableDiv.style.display = "none"
        } else {
            formDiv.style.display = "none"
            view_u.style.display = "none"
            editForm.style.display = 'none'
            viewTeamDiv.style.display = 'none'
            tableDiv.style.display = "block"          
        }
    })
}



//************************************************************
//? Init

const init = () => {
    getUser()
    .then((user) => {
        state.user = user[0]
        state.assigners = user
        summary_tab()
        render_tasks()
        formToggle()
        render_employees()
        renderAssigners()
        renderEditAssigners()

    })
    createForm()
    homepage()
    viewTeamToggle()
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

