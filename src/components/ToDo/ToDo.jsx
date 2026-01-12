import ToDoList from "../ToDoList/ToDoList.jsx";
import ToDoInfo from "../ToDoInfo/ToDoInfo.jsx";
import SearchTaskForm from "../SearchTaskForm/SearchTaskForm.jsx";
import AddTaskForm from "../AddTaskForm/AddTaskForm.jsx";
import Button from "../Button/Button.jsx";
import {useContext} from "react";
import {TasksContext} from "../../context/TasksContext.jsx";

import styles from "./Todo.module.scss";

const ToDo = () => {
    const { firstUncompletedTaskRef } = useContext(TasksContext);

 return (
    <div className={styles.todo}>
        <h1 className={styles.title}>To Do List</h1>
        <AddTaskForm styles={styles}/>
        <SearchTaskForm styles={styles}/>
        <ToDoInfo styles={styles}/>
        <Button
            onClick={() => firstUncompletedTaskRef.current?.scrollIntoView({smooth: true})}
        >
            Show first uncompleted task
        </Button>
        <ToDoList styles={styles}/>
    </div>
    )
}

export default ToDo;