import { createContext } from "react";
import useTasks from "../hooks/useTasks.js";
import useUncompletedTaskFocus from "../hooks/useUncompletedTaskFocus.js";

export const TasksContext = createContext({});

export const TasksProvider = ({ children }) => {
    const {
        tasks,
        filteredTasks,
        deleteAllTasks,
        deleteTask,
        toggleTaskComplete,

        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef,
        searchQuery,
        setSearchQuery,
        addTask,
    } = useTasks();

    const {
        firstUncompletedTaskRef,
        firstUncompletedTaskId
    } = useUncompletedTaskFocus(tasks);

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