import {memo} from "react";

const ToDoInfo = ({
    countAll,
    countCompleted,
    onDeleteAllButtonClick,
}) => {
    const hasTasks = countAll > 0;

    return (
        <div className="todo__info">
            <div className="todo__total-tasks">Done {countCompleted} from {countAll}</div>
            {hasTasks && (
                <button
                    className="todo__delete-all-button"
                    type="button"
                    onClick={onDeleteAllButtonClick}
                >
                    Delete all
                </button>
            )}
        </div>
    )
}

export default memo(ToDoInfo)