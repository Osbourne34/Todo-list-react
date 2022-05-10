import { useState, useContext } from 'react';
import { Context } from './../../context';

import './AddTask.scss';

const AddTask = ({ id }) => {
    const { addTask } = useContext(Context);
    const [isShowForm, setIsShowForm] = useState(false);
    const [taskText, setTaskText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (taskText.trim()) {
            setIsLoading(true);
            fetch('http://localhost:3001/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    task: taskText,
                    completed: false,
                    folderId: id
                })
            })
                .then(response => response.json())
                .then(result => {
                    addTask(result)
                    setTaskText('');
                })
                .finally(() => {
                    setIsLoading(false);
                })
        } else {
            alert('Введите текст задачи');
        }
    }

    return (
        <div className="add-task">
            {isShowForm
                ?
                <form
                    className="add-task__form"
                    onSubmit={handleAddTask}
                >
                    <input
                        className="field"
                        type="text"
                        placeholder="Текст задачи"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                    />
                    <div className="add-task__form-btns">
                        <button
                            className="button"
                            disabled={isLoading}
                        >
                            {isLoading ?
                                'Добавляется...'
                                :
                                'Добавить задачу'
                            }
                        </button>
                        <button
                            className="button add-task__close-btn"
                            type="button"
                            onClick={() => {
                                setIsShowForm(false)
                                setTaskText('')
                            }}
                            disabled={isLoading}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
                :
                <button
                    className="add-task__add-btn"
                    onClick={() => setIsShowForm(true)}
                >
                    <span className="icon-plus1"></span>
                    Новая задача
                </button>
            }
        </div>
    )
}

export default AddTask;