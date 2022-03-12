import React, { useEffect, useState } from 'react'
import TaskForm from './TaskForm'

const App = () => {

    const nullTask = { _id: '', title: '', description: '' }
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState(nullTask)

    const saveTask = (e) => {
        e.preventDefault()
        fetch('/api/tasks', {
            method: task._id ? 'UPDATE' : 'POST',
            body: JSON.stringify(task),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            M.toast({html: 'Task saved!'})
            setTask(nullTask)
            fetchTasks()
        })
        .catch(err => console.error(err))
    }

    const editTask = (id) => {
        const task = tasks.find(t => t._id == id)
        setTask(task)
    }
    const deleteTask = (id) => {
        if (!confirm('¿Estás seguro de eliminar esta tarea?'))
            return false
        fetch('/api/tasks/'+id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            M.toast({html: 'Task deleted!'})
            fetchTasks()
        })
        .catch(err => console.error(err))
    }

    useEffect(()=> {
        fetchTasks()
    }, [])

    const fetchTasks = () => {
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            M.toast({html: 'Tasks fetched!'})
            setTasks(data)
        })
        .catch(err => console.error(err))
    }

    return (
        <div>
            <nav className="light-blue darken-4">
                <div className="container">
                    <a className='brand-logo' href='/'>MERN Tasks</a>
                </div>
            </nav>

            <div className="container">
                <div className='row'>
                    <div className='col s5'>
                        <TaskForm />
                    </div>
                    <div className='col s7'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th><th>Description</th>
                                </tr>
                            </thead>
                            <tbody>{
                                tasks.map(task=>(
                                    <tr key={task._id}>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td>
                                            <button onClick={() => editTask(task._id)} className='btn light-blue darken-4'>
                                                <i className='material-icons'>Edit</i>
                                            </button>
                                            <button onClick={() => deleteTask(task._id)} className='btn red darken-4'>
                                                <i className='material-icons'>Delete</i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App