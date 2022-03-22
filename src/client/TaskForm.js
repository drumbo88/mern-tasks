import React from 'react'

const TaskForm = ({task, setTask, saveTask, cancelEdition}) => {

    return (
        <div className='card'>
            <div className='card-content'>
                <form onSubmit={saveTask}>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <input name="taskTitle" value={task.title} type="text" 
                                onChange={(e)=>setTask({ ...task, title: e.target.value })} 
                                placeholder="Task Title" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <textarea name="taskDescription" value={task.description} type="text" 
                                onChange={(e)=>setTask({ ...task, description: e.target.value })} 
                                placeholder="Task Description" className='materialize-textarea'>
                            </textarea>
                        </div>
                    </div>
                    <button className='btn light-blue darken-4'>
                        Send
                    </button>
                    { task._id && 
                        <button onClick={(e) => { e.preventDefault(); cancelEdition() }} 
                            className='btn light-gray darken-4'>
                            Cancel
                        </button>
                    }  
                </form>
            </div>
        </div>
    )
}

export default TaskForm
