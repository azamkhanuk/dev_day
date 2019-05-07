let userId = 1

const userURL = `http://localhost:3000/users/${userId}`

const getUser = () => 
    fetch(userURL)
    .then(resp => resp.json())

