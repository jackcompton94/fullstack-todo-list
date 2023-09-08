export const getTodos = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/todos', {
            method: 'GET'
        })
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}

export const addTodo = async (task, username) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({task, username})
        })
        const data = await response.json()
        return data        
    } catch (error) {
        console.error(error)
    }
}

export const deleteTodo = async (todo) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/todos', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({todo})
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

export const completeTodo = async (todo) => {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/todos/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({todo})
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}
