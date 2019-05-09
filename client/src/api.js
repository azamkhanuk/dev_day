let userId = 1

const userURL = `http://localhost:3000/users/${userId}`
const taskURL = `http://localhost:3000/tasks/`
const commentsURL = `http://localhost:3000/getcomments`

const getUser = () => 
    fetch(userURL)
    .then(resp => resp.json())

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
            tag: task.tag
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
      body: JSON.stringify(task)
    }).then(resp => resp.json())

const getComments = task => 
    fetch(commentsURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task_id: task.id
        })
    }).then(resp => resp.json())