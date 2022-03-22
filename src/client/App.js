import React, { useEffect, useState } from 'react'
import TaskForm from './TaskForm'
import TaskList from './TaskList'

const App = () => {

    const jsonHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    const nullTask = { _id: '', title: '', description: '' }
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState(nullTask)

    const cancelEdition = () => {
        setTask(nullTask)
    }
    const saveTask = (e) => {
        e.preventDefault()
        fetch('/api/tasks' + (task._id ? '/'+task._id : ''), {
            method: task._id ? 'PUT' : 'POST',
            body: JSON.stringify(task),
            headers: jsonHeaders
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
            headers: jsonHeaders
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
                        <TaskForm task={task} setTask={setTask} saveTask={saveTask} cancelEdition={cancelEdition} />
                    </div>
                    <div className='col s7'>
                        <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App