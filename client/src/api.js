let userId = 1

const userURL = `http://localhost:3000/users/${userId}`
const taskURL = `http://localhost:3000/tasks/`
const getCommentsURL = `http://localhost:3000/getcomments`
const commentsURL = `http://localhost:3000/comments/`


//! USER
const getUser = () => 
    fetch('http://localhost:3000/users/')
    .then(resp => resp.json())


//! TASK

const createTask = task =>
    fetch(taskURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: task.name,
            user_id: task.user_id,
            content: task.content,
            deadline: task.deadline,
            status: task.status,
            image_url: task.image_url,
            tag: task.tag,
            assigner_id: task.assigner_id
        })
    }).then(resp => resp.json())

const deleteTask = task =>
    fetch(taskURL + `${task.id}`, {
        method: 'DELETE'
    }).then(resp => resp.json())

const updateTask = task => 
fetch(taskURL + `${task.id}`, {
    method: 'PATCH',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: task.id,
        name: task.name,
        user_id: task.user_id,
        content: task.content,
        deadline: task.deadline,
        status: task.status,
        image_url: task.image_url,
        tag: task.tag,
        assigner_id: task.assigner_id
      })
    }).then(resp => resp.json())


//! COMMENTS
const getComments = task => 
    fetch(getCommentsURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task_id: task.id
        })
    }).then(resp => resp.json())

const createComment = comment => 
    fetch(commentsURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: comment.content,
            task_id: comment.task_id
        })
    }).then(resp => resp.json())