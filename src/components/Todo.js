import React from 'react'

const Todo = ({ item, onDeleteMode, editMode,onToggle }) => {
   
    return (
        <li >
            <input type="checkbox" defaultChecked={item.completed} onChange={() => onToggle(item.id)} />
            <div>
                <p>{item.text}</p>
                <p>{item.date}</p>
            </div>
            <i className="fa fa-trash" onClick={() => onDeleteMode(item.id)} />
            <i className="fa fa-pen" onClick={() => editMode(item.id)} />
        </li>

    )
}

export default Todo
