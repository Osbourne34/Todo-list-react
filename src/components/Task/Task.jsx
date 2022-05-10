import { useRef, useState } from 'react';
import './Task.scss'

const Task = ({ task, id, completed, onCLick, onEditTask, onCompletedToggle }) => {
    const inputEl = useRef();
    const [taskValue, setTaskValue] = useState(task);

    const handleOnBlur = () => {
        if (taskValue.trim()) {
            inputEl.current.disabled = true;
            onEditTask(taskValue);
        } else {
            inputEl.current.focus()
        }
    }

    return (
        <li className="task">
            <div className="task__left">
                <div className="task__toggler">
                    <input
                        className="task__checkbox"
                        id={`label-${id}`}
                        type="checkbox"
                        checked={completed}
                        onChange={() => {
                            onCompletedToggle(!completed)
                        }}
                    />
                    <label className="task__label" htmlFor={`label-${id}`}>
                        <div className="task__toggler-btn">
                            <div className="icon-check"></div>
                        </div>
                    </label>
                </div>
                <input
                    className={`task__text ${completed ? 'task__text_completed' : ''}`}
                    type="text"
                    value={taskValue}
                    onChange={(e) => setTaskValue(e.target.value)}
                    ref={inputEl}
                    onBlur={handleOnBlur}
                    disabled={true}
                />
            </div>
            <div className="task__right">
                <button
                    className="task__edit-btn icon-edit"
                    onClick={() => {
                        inputEl.current.disabled = false
                        inputEl.current.focus()
                    }}
                ></button>
                <button
                    className="task__remove-btn icon-close"
                    onClick={onCLick}
                ></button>
            </div>
        </li>
    )
}

export default Task;