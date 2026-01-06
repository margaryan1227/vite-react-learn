import {useRef} from "react";

const useUncompletedTaskFocus = (tasks) => {
    const firstUncompletedTaskRef = useRef(null);
    const firstUncompletedTaskId = tasks.find(({ isDone }) => !isDone)?.id;

    return {
        firstUncompletedTaskRef,
        firstUncompletedTaskId,
    }
};

export default useUncompletedTaskFocus;