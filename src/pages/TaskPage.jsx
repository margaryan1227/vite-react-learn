import {useEffect, useState} from "react";
import tasksAPI from "../api/tasksAPI.js";

const TaskPage = ({
    params,
}) => {
    const taskId = params.id;

    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        tasksAPI
            .getById(taskId)
            .then((data) => {
                setTask(data);
                setHasError(false);
            })
            .catch(() => {
                setHasError(true);
            })
            .finally(() => {
                setIsLoading(false)
            });
    }, [taskId]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (hasError) {
        return <div>Task not found!</div>;
    }

    return (
        <div>
            <h1>{task.title}</h1>
            <p>{task.isDone ? 'Task is completed!' : 'Task is not completed'}</p>
        </div>
    );
};

export default TaskPage;