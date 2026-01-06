import {createContext, useCallback, useEffect, useMemo, useRef, useState} from "react";

export const TasksContext = createContext({});

export const TasksProvider = ({ children }) => {
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

    return (
        <TasksContext.Provider
            value={{
                tasks,
                filteredTasks,
                firstUncompletedTaskRef,
                firstUncompletedTaskId,
                deleteAllTasks,
                deleteTask,
                toggleTaskComplete,

                newTaskTitle,
                setNewTaskTitle,
                newTaskInputRef,
                searchQuery,
                setSearchQuery,
                addTask,
            }}
        >
            {children}
        </TasksContext.Provider>
    );
};