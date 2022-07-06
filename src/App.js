import { useState, useEffect } from "react"
import React from 'react'
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"



function App() {

    const [showAddTask, setShowAddTask] = useState (false)

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
          }
      
          getTasks()
    }, [])

    //

    //Add Task
    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(task)
        })
        const data = await res.json()

        setTasks([...tasks, data])
    }

    //Delete Task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`,
            {method: 'DELETE'})

        setTasks(tasks.filter((task) => task.id !== id))
    }

    //Toggle Reminder
    const toggleReminder = async (id) => {
        const toggleTask = await fetchTask(id)
        const updTask = {...toggleTask, reminder: !toggleTask.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updTask)
        })
        const data = await res.json()

        setTasks(tasks.map((task) => task.id === id ?
        {...task, reminder: data.reminder} : task))
    }

    //Fetch Task
    const fetchTask = async (id) => {
        try{
            const res = await fetch(`http://localhost:5000/tasks/${id}`)
            const data = await res.json()
            return(data)
        }   catch(e){
            console.error(e)
        }     
    }

    //Fetch Taskes
    const fetchTasks = async () => {
        try{
            const res = await fetch('http://localhost:5000/tasks')
            const data = await res.json()

            return(data)
        }catch(e){
            console.error(e)
        }
    }

    return(
        <div className='container'>
            <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
                :'No Tasks to Show'}
        </div>
    )
}

export default App