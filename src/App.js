import './App.scss';
import { useState, useEffect } from 'react'
import { Dialog } from '@mui/material';
import Todo from './components/Todo';

function App() {

  const [todos, setTodos] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [])
  const [input, setInput] = useState('')
  const [icon, setIcon] = useState('plus')
  const [id, setId] = useState('')
  const [deleteMode, setDeleteMode] = useState(false)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const onChange = e => {
    setInput(e.target.value)
  }
  const onClick = () => {
    if (icon === 'plus')
      onAdd()
    else onEdit()
  }
  const onAdd = () => {
    if(input.length>0){
    const newId = Math.floor(Math.random() * 5000)
    const newTodo = { text: input, date:new Date().toLocaleString(), id: newId,completed:false }
    setTodos(todos => [...todos, newTodo])
    setInput('')
    }
  }
  const onToggle = (id) => {
    setTodos(todos => todos.map(item => {
        if (item.id === id)
          item.completed = !(item.completed)
        return item
      }))
}
  const editMode = (id) => {
    setId(id)
    setIcon('pen')
    const todo = todos.find(item => item.id === id)
    setInput(todo.text)
  }
  const onEdit = () => {
    if (input.length > 0)
      setTodos(todos => todos.map(item => {
        if (item.id === id)
          item.text = input
        return item
      }))
    setIcon('plus')
    setInput('')
    setId('')
  }
  const onDeleteMode = (id) => {
    setId(id)
    setDeleteMode(true)
  }
  const onDelete = () => {
    setTodos(todos => todos.filter(item => item.id !== id))
    setId('')
    setDeleteMode(false)
  }
  const onCancel = () => {
    setDeleteMode(false)
  }
 
  return (
    <>
      <div className="background-circle top-right" />
      <div className="background-circle bottom-left" />

      <div className="main-container">
        <p className="intro">Good Evening</p>
        <h1 className="title">My ToDo</h1>
        <div className="todos-container">
          <div className="input-todo-container">
            <input type="text" placeholder="Type something ..." onChange={onChange} value={input} />
            <button className="btn-add" id="btn-add" onClick={onClick}>
              <i className={`fa fa-${icon}`} id="btn-add-icon" />
            </button>
          </div>
          <ul id="todos-list">
          {todos.map((item) =>
                <Todo 
                key={item.id}
                item= {item}
                onDeleteMode={onDeleteMode} 
                editMode={editMode}
                onToggle={onToggle}
                />
            )}
          </ul>
        </div>
      </div>

      <Dialog
        open={deleteMode}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <div className="modal-body">
          <div>{`Are you sure you want to delete "${id ? todos.find(item => item.id === id).text : ''}" task?`}</div>
          <div className="modal-buttons-container">
            <button onClick={onDelete}>
              Yes, Delete
            </button>
            <button onClick={onCancel}>
              No, Cancel
            </button>
          </div>
        </div>
      </Dialog>

      
    </>
  );
}

export default App;


