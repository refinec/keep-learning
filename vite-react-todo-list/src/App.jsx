import React, { useState } from 'react'
import './App.css'
import ToDoItem from "./components/ToDoItem"
import ToDoContainer from "./components/ToDoContainer"



function App() {
  const [todos, setTodos] = useState([])

  const handleSubmit = (todoItem) => {
    setTodos([...todos, todoItem])
  }

  const handleOperate = (todoItem) => {
    const newTodos = todos.filter(todo => todo.id !== todoItem.id);
    newTodos.push(todoItem);
    setTodos(newTodos);
  }

  return (
    <div className='todo-app' >
      <h2 className='todo-title'>待办清单</h2>
      <ToDoItem onSubmit={handleSubmit} />
      <ToDoContainer todos={todos} onOperate={handleOperate} />
    </div>
  )
}

export default App
