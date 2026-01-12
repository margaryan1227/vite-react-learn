import Field from "../Field/Field.jsx";
import Button from "../Button/Button.jsx";
import {useContext, useState} from "react";
import {TasksContext} from "../../context/TasksContext.jsx";

const AddTaskForm = ({
    styles,
}) => {
    const {
        addTask,
        newTaskInputRef,
        newTaskTitle,
        setNewTaskTitle,
    } = useContext(TasksContext);

    const [error, setError] = useState('');

    const clearNewTaskTitle = newTaskTitle.trim();
    const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;

    const onSubmit = (e) => {
        e.preventDefault();
        !isNewTaskTitleEmpty && addTask(clearNewTaskTitle);
    }

    const onInput = (e) => {
        const { value } = e.target;

        const cleatValue = value.trim();
        const hasOnlySpaces = value.length > 0 && cleatValue.length === 0;

        setNewTaskTitle(value);
        setError(hasOnlySpaces ? 'The task cannot be empty' : '');
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Field
                className={styles.field}
                label="New task title"
                id="new-task"
                ref={newTaskInputRef}
                value={newTaskTitle}
                error={error}
                onInput={onInput}
            />
            <Button
                type="submit"
                isDisabled={isNewTaskTitleEmpty}
            >
                Add
            </Button>
        </form>
    )
}

export default AddTaskForm;