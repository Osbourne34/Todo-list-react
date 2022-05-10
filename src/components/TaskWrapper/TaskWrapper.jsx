import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from './../../context';

import './TaskWrapper.scss';

import Task from './../Task';
import AddTask from './../AddTask';

const TaskWrapper = ({ title, hex, tasks, folderId }) => {
    const inputEl = useRef();
    const [titleValue, setTitleValue] = useState(title);
    const { removeTask, editTask, completedToggle, editFolderTitle } = useContext(Context);

    useEffect(() => {
        setTitleValue(title);
    }, [title])

    const handleRemoveTask = (id) => {
        if (window.confirm('Удалить задачу?')) {
            removeTask(id, folderId);
        }
    }

    const handleEditTask = (id, newTaskValue) => {
        fetch('http://localhost:3001/tasks/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                task: newTaskValue,
            })
        })
            .then(response => response.json())
            .then(result => {
                editTask(result, folderId);
            })
    }

    const handleEditFolderTitle = () => {
        if (titleValue.trim()) {
            inputEl.current.disabled = true;
            editFolderTitle(titleValue, folderId)
        } else {
            inputEl.current.focus();
        }
    }

    const handleCompletedToggle = (id, isCompleted) => {
        fetch('http://localhost:3001/tasks/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                completed: isCompleted,
            })
        })
            .then(response => response.json())
            .then(result => {
                completedToggle(result, folderId);
            })
    }

    return (
        <div className="task-wrapper">
            <div className="task-wrapper__title">
                <input
                    type="text"
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                    style={{ color: hex }}
                    ref={inputEl}
                    disabled={true}
                    onBlur={handleEditFolderTitle}
                />

                <button
                    className="icon-edit"
                    onClick={() => {
                        inputEl.current.disabled = false
                        inputEl.current.focus()
                    }}
                ></button>
            </div>

            {tasks.length > 0
                ?
                <ul className="tasks__list">
                    {tasks.map(task => {
                        return <Task
                            key={task.id}
                            task={task.task}
                            id={task.id}
                            completed={task.completed}
                            onCLick={() => handleRemoveTask(task.id)}
                            onEditTask={(newTaskValue) => handleEditTask(task.id, newTaskValue)}
                            onCompletedToggle={(isCompleted) => handleCompletedToggle(task.id, isCompleted)}
                        />
                    })}
                </ul>
                :
                <h3>Задачи отсутствуют</h3>
            }

            <AddTask key={folderId} id={folderId} />
        </div>
    )
}

export default TaskWrapper;