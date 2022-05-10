import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from './../../context';

import './AddFolder.scss';

import Badge from './../Badge';

const AddFolder = () => {
    const { colors, addFolder } = useContext(Context);

    const [activeColor, setActiveColor] = useState(1);
    const [titleFolder, setTitleFolder] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVisibleWindow, setIsVisibleWindow] = useState(false);
    const addFolderEl = useRef(null);

    const closeWindow = () => {
        setIsVisibleWindow(false)
        clearForm()
    }

    const clearForm = () => {
        setTitleFolder('')
        setActiveColor(1);
    }

    const onAddFolder = (e) => {
        e.preventDefault();
        if (titleFolder.trim()) {
            setIsLoading(true);
            fetch('http://localhost:3001/folders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    title: titleFolder,
                    colorId: activeColor
                })
            })
                .then(response => response.json())
                .then(result => {
                    addFolder(result);
                    setIsLoading(false);
                    closeWindow();
                })
        } else {
            alert('Введите название папки');
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!addFolderEl.current.contains(e.target)) {
                setIsVisibleWindow(false)
                clearForm()
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [])

    return (
        <div
            className="add-folder"
            ref={addFolderEl}
        >
            <button
                className={`add-folder__toggler ${isVisibleWindow ? 'add-folder__toggler_active' : ''}`}
                onClick={() => {
                    setIsVisibleWindow(!isVisibleWindow)
                    clearForm()
                }}
            >
                <span className="icon-plus1"></span>
                Добавить папку
            </button>
            {isVisibleWindow &&
                <div className="add-folder__window">
                    <button
                        className="add-folder__close-btn"
                        onClick={closeWindow}
                    >
                        <div className="icon-close"></div>
                    </button>
                    <form
                        className="add-folder__form"
                        onSubmit={onAddFolder}
                    >
                        <input
                            className="add-folder__field field"
                            placeholder="Название папки"
                            value={titleFolder}
                            onChange={(e) => setTitleFolder(e.target.value)}
                        />
                        <div className="add-folder__colors">
                            {colors ?
                                colors.map(color => {
                                    return <Badge
                                        key={color.id}
                                        size="large"
                                        hex={color.hex}
                                        active={activeColor && color.id === activeColor}
                                        onClick={() => setActiveColor(color.id)}
                                    />
                                })
                                :
                                <div>Загрузка...</div>
                            }
                        </div>
                        <button
                            type="submit"
                            className="add-folder__add-btn button"
                            disabled={isLoading}
                        >
                            {isLoading ?
                                'Добавлятся...'
                                :
                                'Добавить'
                            }
                        </button>
                    </form>
                </div>
            }
        </div>
    )
}

export default AddFolder;