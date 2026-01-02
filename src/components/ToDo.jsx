import { useState, useEffect } from 'react';
import ToDoList from "./ToDoList.jsx";
import ToDoInfo from "./ToDoInfo.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import AddTaskForm from "./AddTaskForm.jsx";

const ToDo = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'eat', isDone: true },
        { id: 2, title: 'drink', isDone: false },
        { id: 3, title: 'sleep', isDone: false },
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState('');

    const deleteAllTasks = () => {
        const isConfirmed = confirm(`Are you sure you want to delete all} tasks?`);

        if (isConfirmed) {
            setTasks([]);
        }
    }

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    }

    const toggleTaskComplete = (taskId, isDone) => {
        setTasks(tasks.map((task) => {
            if (task.id === taskId) {
                task.isDone = isDone;
            }

            return task;
        }));
    }

    const filterTasks = (query) => {
        console.log(`Search tasks for ${query}`);
    }

    const addTask = () => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            }

            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
        }
    }

    useEffect(() => {
        console.log(`Component ToDo is mounted, loading data from storage`);
        const savedTasks = localStorage.getItem('tasks');

        savedTasks && setTasks(JSON.parse(savedTasks))
    }, []);

    useEffect(() => {
        console.log(`Saving data to storage cause tasks are updated`);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTasktitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
            />
            <SearchTaskForm onSearchInput={filterTasks} />
            <ToDoInfo
                countAll={tasks.length}
                countCompleted={tasks.filter(({isDone}) => isDone).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <ToDoList
                tasks={tasks}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
            />
        </div>
    )
}

export default ToDo;;