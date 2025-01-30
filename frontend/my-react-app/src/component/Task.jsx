import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Tasks = () => {
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      // Fetch tasks from backend
      axios.get('http://localhost:6333/tasks/tasks')
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the tasks!", error);
        });
    }, []);
  
    return (
      <div>
        <h1>Task List</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Tasks;