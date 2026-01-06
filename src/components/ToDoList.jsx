import ToDoItem from "./ToDoItem.jsx";
import {memo} from "react";

const ToDoList = ({
    tasks = [],
    filteredTasks,
    firstUncompletedTaskRef,
    firstUncompletedTaskId,
    onDeleteTaskButtonClick,
    onTaskCompleteChange
}) => {
    const hasTasks = tasks.length > 0;

    if (!hasTasks) {
        return <div className="todo__empty-message">There are no tasks yet</div>
    }

    const isEmptyFilteredTasks = filteredTasks?.length === 0;

    if (hasTasks && isEmptyFilteredTasks) {
        return <div className="todo__empty-message">Tasks not found</div>
    }

    return (
        <ul className="todo__list">
            {(filteredTasks ?? tasks).map((task) =>
                <ToDoItem
                    className="todo__item"
                    key={task.id}
                    ref={task.id === firstUncompletedTaskId ? firstUncompletedTaskRef : null}
                    onDeleteTaskButtonClick={onDeleteTaskButtonClick}
                    onTaskCompleteChange={onTaskCompleteChange}
                    {...task}
                />
            )}
        </ul>
    )
}

export default memo(ToDoList);