import React from 'react'

const TaskList = ({editTask, deleteTask}) => {
    return (
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
            }
            </tbody>
        </table>
    )
}

export default TaskList