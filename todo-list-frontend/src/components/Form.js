import React, {useState, useEffect} from "react"
import '../styles/core.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { addTodo, completeTodo, deleteTodo } from '../services/api'
import { storeTodosInLocalStorage, getTodosFromLocalStorage } from "../utils/localStorage"

export default function Form({username}) {
    const [inputValue, setInputValue] = useState('')
    const [todos, setTodos] = useState([])
    const [tableClassName, setTableClassName] = useState('empty-table')
    const [deletedTodoIds, setDeletedTodoIds] = useState([])
    const filteredTodos = todos.filter(todo => !deletedTodoIds.includes(todo.id))

    useEffect(() => {
      const storedTodos = getTodosFromLocalStorage()
      if (storedTodos.length > 0) {
        setTodos(storedTodos)
      }
    }, [])
    
    useEffect(() => {
      storeTodosInLocalStorage(todos)
    }, [todos])

    useEffect(() => {
      const newTableClassName = (filteredTodos.length === 0) ? 'empty-table' : 'filled-table'

      setTableClassName(newTableClassName)
    }, [filteredTodos])

    const handleInputChange = e => {
        setInputValue(e.target.value)
    }
    
    const handleAdd = async e => {
        e.preventDefault()        

        // If text box is empty, return
        if (inputValue === '') {
            alert('task must not be empty')
            return
        }

        try {
            const todo = await addTodo(inputValue, username)
            console.log('returning...', todo)

            // Add text box to local storage
            setTodos((prevTodos) => [
              ...prevTodos,
              {username: username, id: todo['id'], task: inputValue, completed: false, created: todo['created'], updated: todo['updated'], deleted: false},
            ])
            
            // Reset text box
            setInputValue('')
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleComplete = async (e, todo) => {
        e.preventDefault();
      
        try {
          await completeTodo(todo)
      
          // Update the current item's completed attribute in local storage with True
          setTodos((prevTodos) => {
            const updatedTodos = prevTodos.map((prevTodo) => {
              if (prevTodo.id === todo.id) {
                return { ...prevTodo, completed: true }
              }
              return prevTodo
            })
            return updatedTodos
        })
        } catch (error) {
          console.error(error)
        }
      }

      const handleDelete = async (e, todo) => {
        e.preventDefault();
    
        try {
          await deleteTodo(todo)

          // Update the current item's deleted attribute in local storage with True
          setTodos(prevTodos => {
            return prevTodos.map(prevTodo =>
              prevTodo.id === todo.id ? { ...prevTodo, deleted: true } : prevTodo
            )
          })

          // Keep track of deleted items to filter out of UI
          setDeletedTodoIds(prevDeletedIds => [...prevDeletedIds, todo.id])
        } catch (error) {
          console.error(error)
        }
      }

    return (
    <div className="container">
      <h2>welcome {username}</h2>
        <form onSubmit={handleAdd}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
            />

            <button type="submit">
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </button>
        </form>

        <table className={tableClassName}>
            <tbody>
                {filteredTodos.map((todo) => (
                    <tr
                        key={todo.id}
                        className={`task ${todo.completed ? 'completed' : ''} 
                                         ${todo.deleted ? "deleted" : ''}`}
                        draggable={true}
                    >
                        <td>{todo.task}</td>
                        <td>
                        <button className="checkButton" 
                                onClick={e => handleComplete(e, todo)}>
                        <FontAwesomeIcon icon={faCheck} style={{ color: '#2dbe6c' }} />
                        </button>
                        </td>
                        <td>
                        <button className="deleteButton" 
                                onClick={e => handleDelete(e, todo)}>
                        <FontAwesomeIcon icon={faXmark} style={{color: 'red'}}/>
                        </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}
