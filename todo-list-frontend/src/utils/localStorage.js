export const storeTodosInLocalStorage = (todos) => {
    const todosJSON = JSON.stringify(todos)
    localStorage.setItem('todos', todosJSON)
}

export const getTodosFromLocalStorage = () => {
    const todosJSON = localStorage.getItem('todos')
    return todosJSON ? JSON.parse(todosJSON) : []
}
