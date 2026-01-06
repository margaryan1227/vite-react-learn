import {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import ToDoList from "./ToDoList.jsx";
import ToDoInfo from "./ToDoInfo.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import AddTaskForm from "./AddTaskForm.jsx";
import Button from "./Button.jsx";

const ToDo = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');

        if (savedTasks) {
            return JSON.parse(savedTasks);
        }

        return [
            { id: 1, title: 'eat', isDone: true },
            { id: 2, title: 'drink', isDone: false },
            { id: 3, title: 'sleep', isDone: false },
        ];
    });
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const newTaskInputRef = useRef(null);
    const firstUncompletedTaskRef = useRef(null);

    const firstUncompletedTaskId = tasks.find(({ isDone }) => !isDone)?.id;


    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm(`Are you sure you want to delete all} tasks?`);

        if (isConfirmed) {
            setTasks([]);
        }
    }, []);

    const deleteTask = useCallback((taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    }, [tasks]);

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        setTasks(tasks.map((task) => {
            if (task.id === taskId) {
                task.isDone = isDone;
            }

            return task;
        }));
    },[tasks]);

    const addTask = useCallback(() => {
        if (newTaskTitle?.trim()?.length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            }

            setTasks((tasks) => {
                return [...tasks, newTask];
            });
            setNewTaskTitle('');
            setSearchQuery('');
            newTaskInputRef.current?.focus();
        }
    }, [newTaskTitle]);

    useEffect(() => {
        tasks && localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        newTaskInputRef.current.focus();
    }, []);

    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLowerCase();

        return clearSearchQuery.length > 0
            ? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchQuery))
            : null;
    }, [searchQuery, tasks]);

    const doneTasks = useMemo(() => {
        return tasks?.filter(({isDone}) => isDone).length
    }, [tasks]);

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskInputRef={newTaskInputRef}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
            />
            <SearchTaskForm
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <ToDoInfo
                countAll={tasks?.length}
                countCompleted={doneTasks}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <Button
                onClick={() => firstUncompletedTaskRef.current?.scrollIntoView({smooth: true})}
            >
                Show first uncompleted task
            </Button>
            <ToDoList
                tasks={tasks}
                filteredTasks={filteredTasks}
                firstUncompletedTaskRef={firstUncompletedTaskRef}
                firstUncompletedTaskId={firstUncompletedTaskId}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
            />
        </div>
    )
}

export default ToDo;