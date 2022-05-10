import React, { useState, useEffect } from 'react';
import { Context } from './../../context';

import './../../assets/styles/setting.scss';
import './../../assets/icon/style.css';
import './App.scss';

import Sidebar from './../Sidebar';
import Tasks from './../Tasks';

const App = () => {
    const [folders, setFolders] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeFolder, setActiveFolder] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/folders?_expand=color&_embed=tasks')
            .then(response => response.json())
            .then(result => {
                setFolders(result)
            })
    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/colors')
            .then(response => response.json())
            .then(result => {
                setColors(result)
            })
    }, [])

    const addFolder = (folder) => {
        const color = () => {
            return colors.find(color => color.id === folder.colorId)
        }
        const newArr = [
            ...folders,
            {
                ...folder,
                color: color(),
                tasks: []
            }
        ]
        setFolders(newArr);
        setActiveFolder(newArr[newArr.length - 1])
    }

    const addTask = (task) => {
        const newArr = folders.map(folder => {
            if (folder.id === task.folderId) {
                folder.tasks = [
                    ...folder.tasks,
                    task
                ]
            }
            return folder;
        })
        setFolders(newArr);
    }

    const removeFolder = (id) => {
        if (window.confirm('Удалить папку?')) {
            fetch('http://localhost:3001/folders/' + id, {
                method: 'DELETE'
            }).then(() => {
                setFolders(folders.filter(folder => folder.id !== id))
                setActiveFolder(null)
            })
        }
    }

    const removeTask = (id, folderId) => {
        fetch('http://localhost:3001/tasks/' + id, {
            method: 'DELETE'
        })
            .then(() => {
                const newArr = folders.map(folder => {
                    if (folder.id === folderId) {
                        folder.tasks = folder.tasks.filter(task => task.id !== id);
                    }
                    return folder;
                })
                setFolders(newArr)
            })
    }

    const selectActiveFolder = (id) => {
        if (id) {
            const folderActive = folders.find(folder => folder.id === id);
            setActiveFolder(folderActive);
        }
        else {
            setActiveFolder(null)
        }
    }

    const editTask = (newTask, folderId) => {
        const newArr = folders.map(folder => {
            if (folder.id === folderId) {
                const currentTask = folder.tasks.find(task => task.id === newTask.id)
                currentTask.task = newTask.task;
            }
            return folder;
        })
        setFolders(newArr)
    }

    const editFolderTitle = (value, id) => {
        fetch('http://localhost:3001/folders/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                title: value,
            })
        })
            .then(response => response.json())
            .then(result => {
                const newArr = folders.map(folder => {
                    if (folder.id === result.id) {
                        folder.title = result.title;
                    }
                    return folder;
                })
                setFolders(newArr);
            })
    }

    const completedToggle = (newValue, folderId) => {
        const newArr = folders.map(folder => {
            if (folder.id === folderId) {
                const currentTask = folder.tasks.find(task => task.id === newValue.id)
                currentTask.completed = newValue.completed;
            }
            return folder;
        })
        setFolders(newArr);
    }

    return (
        <div className="todo">
            <Context.Provider value={{
                folders,
                colors,
                addFolder,
                removeFolder,
                activeFolder,
                selectActiveFolder,
                addTask,
                removeTask,
                editTask,
                completedToggle,
                editFolderTitle
            }}>
                <Sidebar />
                <Tasks />
            </Context.Provider>
        </div>
    )
}

export default App;