import { useState } from "react";
import Task from "./Task";
import Button from "./Button"

type task = {
    name: string,
    status: boolean
};

type tasks = any[]

function TaskList() {

    const [task, setTask] = useState<task>({
        name: "",
        status: false
    });
    const [tasks, setTasks] = useState<tasks>([]);
    const [doneTasks, setDoneTasks] = useState<tasks>([])
    const [display, setDisplay] = useState(false)

    function handleChange(event: any) {
        const tname = event.target.value;
        setTask({
            name: tname,
            status: false
        })
    }

    function handleClick(event: any) {
        event.preventDefault();
        let newTasks: any = [...tasks]
        if (task.name.trim().length > 0) {
            newTasks.push(task);
            setTasks(newTasks)
            const myTask = { name: "", status: false }
            setTask(myTask)
            setDisplay(false)
        }
    }

    function handleCancel() {
        // console.log('cancel button clicked.')
        const myTask = { name: "", status: false }
        setTask(myTask)
        setDisplay(false);
    }

    function handleCheck(event: any, tid: string) {
        const isChecked = event.target.checked;
        // console.log(`'${tid} checked: `, isChecked)
        if (isChecked === true) {
            const myDoneTasks = [...doneTasks]
            for (let i = 0; i < tasks.length; i++) {
                let t = tasks[i];
                if (t.name === tid) {
                    const myTask = { ...t, status: true };
                    // console.log('task done is ', myTask)
                    myDoneTasks.push(myTask)
                    setDoneTasks(myDoneTasks)
                    const myTasks = [...tasks]
                    myTasks.splice(i, 1)
                    setTasks(myTasks)
                }
            }
        }
        if (isChecked === false) {
            const myTasks = [...tasks]
            for (let i = 0; i < doneTasks.length; i++) {
                const t = doneTasks[i];
                if (t.name === tid) {
                    const myTask = { ...t, status: false }
                    myTasks.push(myTask);
                    setTasks(myTasks);
                    const myDoneTasks = [...doneTasks]
                    myDoneTasks.splice(i, 1)
                    setDoneTasks(myDoneTasks)
                }
            }
        }
    }

    function handleAdd() {
        setDisplay(true)
    }

    function handleDelete(tid: string) {
        // console.log('handle delete clicked with id ',tid)
        const myDoneTasks = [...doneTasks]
        for (let i = 0; i < doneTasks.length; i++) {
            const element = doneTasks[i];
            // console.log(element)
            if (element.name === tid) {
                myDoneTasks.splice(i, 1)
                setDoneTasks(myDoneTasks)
            }
        }
    }

    // console.log('tasks are:', tasks);
    // console.log('tasks done are: ', doneTasks)

    const tasksElement: any = tasks.map((t: task) => {
        return <Task
            key={t.name}
            id={t.name}
            isChecked={t.status}
            name={t.name}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
        />
    })
    const tasksDoneElement: any = doneTasks.map((t: task) => {
        return <Task
            key={t.name}
            id={t.name}
            isChecked={t.status}
            name={t.name}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
        />
    })

    return <>
        <form>

            {tasks.length ? <div>{tasksElement}</div> : <div>No task's added yet.</div>}

            <div>
                {display === true ?
                    <>
                        <input
                            type="text"
                            value={task.name}
                            onChange={handleChange}
                            className="border-2 border-yellow-500 rounded py-2"
                        />
                        <Button
                            theme="secondary"
                            className="border rounded px-2 py-1"
                            onClick={handleClick}
                        >
                            SUBMIT
                        </Button>
                        <Button
                            theme="secondary"
                            type="button"
                            className="border rounded px-2 py-1"
                            onClick={handleCancel}
                        >
                            CANCEL
                        </Button>
                    </> :
                    <Button
                        theme="primary"
                        onClick={handleAdd}
                        className="border rounded px-2 py-1">
                        ADD
                    </Button>
                }
            </div>
        </form>
        {doneTasks.length ? <div>{tasksDoneElement}</div> : <div>No task's completed yet.</div>}
    </>
}
export default TaskList