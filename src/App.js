import './App.css';
import Header from './component/Header';
import Button from './component/Button';
import Tasks from './component/Tasks';
import AddTask from './component/AddTask';
import About from './component/About';
import Footer from './component/Footer';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'



function App() {

  const [displayAddTask, setDisplayAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const taksFromServer = await fetchTask();
      setTasks(taksFromServer);
    }

    getTasks();
  }, [])

  const fetchTask = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    });

    const taksFromServer = await fetchTask();
    setTasks(taksFromServer);
    //setTasks(tasks.filter((task) => task.id === id));
  }

  const fetchTaskById = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  const toggleTask = async (id) => {
    let taksFromServer = await fetchTaskById(id);
    taksFromServer = { ...taksFromServer, reminder: !taksFromServer.reminder }

    //console.log(taksFromServer);
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(taksFromServer)
    });

    setTasks(await fetchTask());

    /* setTasks(tasks.map((task) =>
       task.id === id ? { ...task, reminder: !task.reminder }
         : task
     ))*/
  }

  const addTask = async (task) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    let newTask = { id, ...task };
    await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });

    const taksFromServer = await fetchTask();
    setTasks(taksFromServer);
    //console.log(newTask);
    // setTasks([...tasks, newTask]);
  }

  return (
    <Router>
      <div className="container">
      <Routes>
          <Route path='/'  element={
            <>
                <Header title={"Task Tracker"}
                  toggleAdd={() => setDisplayAddTask(!displayAddTask)}
                  displayAdd={displayAddTask} />

                {displayAddTask &&
                  <AddTask addTask={addTask} />
                }
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  toggleTask={toggleTask} />
            </>
         } />
        
            <Route path='/about'  element={<About />}  />
          </Routes>
          
          <Footer />
      </div>
     
    </Router>
  );
}

export default App;
