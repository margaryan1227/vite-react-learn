import ToDoList from "./ToDoList.jsx";
import ToDoInfo from "./ToDoInfo.jsx";
import SearchTaskForm from "./SearchTaskForm.jsx";
import AddTaskForm from "./AddTaskForm.jsx";
import Button from "./Button.jsx";
import {useContext} from "react";
import {TasksContext} from "../context/TasksContext.jsx";

const ToDo = () => {
    const { firstUncompletedTaskRef } = useContext(TasksContext);

 return (
    <div className="todo">
        <h1 className="todo__title">To Do List</h1>
        <AddTaskForm/>
        <SearchTaskForm/>
        <ToDoInfo/>
        <Button
            onClick={() => firstUncompletedTaskRef.current?.scrollIntoView({smooth: true})}
        >
            Show first uncompleted task
        </Button>
        <ToDoList/>
    </div>
    )
}

export default ToDo;